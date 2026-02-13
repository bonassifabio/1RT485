% MIT License
% Copyright (c) 2026 Fabio Bonassi
%
% Permission is hereby granted, free of charge, to any person obtaining a copy
% of this software and associated documentation files (the "Software"), to deal
% in the Software without restriction, including without limitation the rights
% to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
% copies of the Software, and to permit persons to whom the Software is
% furnished to do so, subject to the following conditions:
%
% The above copyright notice and this permission notice shall be included in all
% copies or substantial portions of the Software.
%
% THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
% IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
% FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
% AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
% LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
% OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
% SOFTWARE.

function rlocus_arrows(sys)
% RLOCUS_ARROWS Plots the root locus of an LTI system with directional arrows.
%
% This function provides an enhanced visualization of the root locus for
% a given LTI system 'sys'. Key features include:
%   - Directional arrows indicating the movement of poles as 'k' increases.
%   - Identification and marking of real-axis breakpoints.
%   - Identification and marking of imaginary-axis crossings.
%   - An interactive-style legend showing the 'k' values of interest.
%   - Intelligent axis scaling to ensure all relevant features are visible.
%
% SCATTER POINTS:
%   The colored scatter points on the plot represent the closed-loop poles 
%   at specific "critical" gain values 'k'. These include real-axis 
%   breakpoints (where branches split or merge) and imaginary-axis 
%   crossings (indicating the stability limit).
%
% USAGE:
%   rlocus_arrows(sys)
%
% AUTHOR:
%   Fabio Bonassi

  if (nargin < 1)
    error('Usage: rlocus_arrows(sys)');
  end

  % --- 1. Identify relevant k values (breakpoints and imaginary axis crossings) ---
  [num, den] = tfdata(sys, 'v');
  num = num(:).'; % Ensure row vector
  den = den(:).'; % Ensure row vector
  dnum = polyder(num);
  dden = polyder(den);

  % Identify real-axis breakpoints by solving d/ds (G(s)) = 0
  % This corresponds to num * dden - dnum * den = 0
  p1_bp = conv(num, dden);
  p2_bp = conv(dnum, den);
  L_bp = max(length(p1_bp), length(p2_bp));
  poly_bp = [zeros(1, L_bp - length(p1_bp)), p1_bp] - [zeros(1, L_bp - length(p2_bp)), p2_bp];
  roots_bp = roots(poly_bp);
  k_bp = [];
  for i = 1:length(roots_bp)
    si = roots_bp(i);
    ki = -polyval(den, si) / polyval(num, si);
    % Keep only real, positive gains
    if abs(imag(ki)) < 1e-6 && real(ki) > 0
      k_bp(end+1) = real(ki);
    end
  end

  % Identify imaginary axis crossings (s = jw)
  % We check where the characteristic equation 1 + k*G(s) = 0 has roots on the jw axis
  den_minus_s = den;
  den_minus_s(end-1:-2:1) = -den_minus_s(end-1:-2:1);
  poly_cross_s = conv(num, den_minus_s);
  n_p = length(poly_cross_s) - 1;
  odd_coeffs = zeros(1, n_p+1);
  for i = 0:n_p
    p = n_p - i;
    if mod(p, 2) == 1
      odd_coeffs(i+1) = poly_cross_s(i+1) * (-1)^((p-1)/2);
    end
  end
  w_roots = roots(odd_coeffs);
  k_cross = [];
  for i = 1:length(w_roots)
    wi = w_roots(i);
    if abs(imag(wi)) < 1e-6 && real(wi) > 0
      si = 1j * real(wi);
      ki = -1 / (polyval(num, si) / polyval(den, si));
      if abs(imag(ki)) < 1e-6 && real(ki) > 0
        k_cross(end+1) = real(ki);
      end
    end
  end

  % Define k_max for plotting to ensure all critical points and poles are shown
  all_event_k = [k_bp, k_cross];
  if isempty(all_event_k)
    k_max = 10;
  else
    k_max = 3.0 * max(all_event_k);
  end
  
  p_poles = pole(sys);
  if ~isempty(p_poles)
      k_max = max(k_max, 5 * max(abs(real(p_poles))) + 1);
  end

  % Initialize figure and set to square aspect ratio
  fig = gcf;
  pos = get(fig, 'Position');
  side = min(pos(3), pos(4));
  set(fig, 'Position', [pos(1), pos(2), side, side]);

  % --- 2. Generate and Plot Root Locus Data ---
  if (exist('OCTAVE_VERSION', 'builtin') ~= 0)
      % Octave's [r, k] = rlocus(sys) returns r as (n_poles x n_points) 
      % and k as a small vector of breakpoint gains.
      [r_branches, ~] = rlocus(sys);
      r_plot = r_branches.'; % Transpose to (n_points x n_poles)
  else
      % MATLAB: Use high-density gain vector for smooth branches
      k_vec = [0, logspace(-4, log10(k_max), 5000)];
      [r_branches, ~] = rlocus(sys, k_vec);
      % MATLAB roots are (n_poles x n_points), transpose to (n_points x n_poles)
      r_plot = r_branches.';
  end

  % Plot branches with solid lines for visibility
  % plot() with a matrix draws one line per column
  h_branches = plot(real(r_plot), imag(r_plot), 'b', 'LineWidth', 1.5);
  hold on;
  
  % Plot open-loop poles (X) and zeros (O)
  plot(real(p_poles), imag(p_poles), 'kx', 'MarkerSize', 10, 'LineWidth', 1.5);
  z_zeros = zero(sys);
  orange = [1, 0.5, 0];
  plot(real(z_zeros), imag(z_zeros), 'o', 'Color', orange, 'MarkerEdgeColor', orange, ...
       'MarkerSize', 8, 'LineWidth', 1.5);

  % --- 3. Intelligent Axis Scaling ---
  min_p_real = min(real(p_poles));
  max_p_real = max(real(p_poles));
  
  % Ensure we only consider finite values for axis limits
  finite_r = r_plot(isfinite(r_plot));
  if isempty(finite_r)
      min_locus_real = min_p_real;
      max_locus_real = max_p_real;
      y_max_locus = 1;
  else
      min_locus_real = min(real(finite_r));
      max_locus_real = max(real(finite_r));
      y_max_locus = max(abs(imag(finite_r)));
  end

  % Determine x-axis limits based on locus divergence and pole locations
  if min_locus_real < (min_p_real - 1)
      xl_1 = min_locus_real;
  else
      xl_1 = min_p_real - abs(min_p_real)*0.2 - 0.5;
  end

  if max_locus_real > (max_p_real + 1)
      xl_2 = max_locus_real;
  else
      xl_2 = max([max_p_real + 0.5, 0.5, max(real(z_zeros)) + 0.5]);
  end
  
  % Ensure the origin and a reasonable right-side margin are visible
  if xl_1 > -0.5, xl_1 = -0.5; end 
  if xl_2 < 0.5, xl_2 = 0.5; end
  xl_2 = max(xl_2, 0.1 * abs(xl_1));
  
  xlim([xl_1, xl_2]);
  xl = xlim();

  % Set y-axis limits to match the imaginary range of the locus
  if y_max_locus == 0, y_max_locus = 1; end
  ylim([-y_max_locus, y_max_locus]);
  yl = ylim();
  
  % Draw real and imaginary axes lines
  h_ax_x = plot(xl, [0 0], 'k', 'LineWidth', 0.5);
  h_ax_y = plot([0 0], yl, 'k', 'LineWidth', 0.5);
  
  xlabel('Real');
  ylabel('Imaginary');
  title('Root Locus with Directional Arrows');
  grid on;

  % Move axes lines to the background
  if (exist('uistack', 'file') || exist('uistack', 'builtin'))
    uistack(h_ax_x, 'bottom');
    uistack(h_ax_y, 'bottom');
  end

  % --- 4. Add Directional Arrows ---
  % We sample gain values at 10% and 50% of k_max to place arrows
  test_ks = [0.1*k_max, 0.50*k_max];
  
  for tk = test_ks
    p1 = pole(feedback(sys, tk));
    p2 = pole(feedback(sys, tk * 1.01));
    for i = 1:length(p1)
      % Associate current pole with the closest pole at tk*1.01 to find direction
      [~, idx] = min(abs(p2 - p1(i)));
      p_now = p1(i);
      p_next = p2(idx);
      dp = p_next - p_now;
      if (abs(dp) > 1e-6)
        angle_deg = atan2(imag(dp), real(dp)) * 180 / pi;
        arrow_color = [0 0 1];
        % Plot arrow only if it's within current axis view
        if (real(p_now) >= xl(1) && real(p_now) <= xl(2) && ...
            imag(p_now) >= yl(1) && imag(p_now) <= yl(2))
            if (exist('OCTAVE_VERSION', 'builtin') ~= 0)
                text(real(p_now), imag(p_now), '>', 'Rotation', angle_deg, ...
                     'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
                     'FontSize', 10, 'FontWeight', 'bold', 'Color', arrow_color);
            else
                text(real(p_now), imag(p_now), '$\mathbf{>}$', 'Rotation', angle_deg, ...
                     'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
                     'FontSize', 12, 'Interpreter', 'latex', 'Color', arrow_color);
            end
        end
      end
    end
  end

  % --- 5. Highlight Critical k Values in Legend ---
  % Identify unique critical gains (breakpoints and crossings)
  all_k = sort(unique(round([k_bp, k_cross] * 1e4) / 1e4));
  all_k = all_k(isfinite(all_k));
  colors = [0.85 0.325 0.098; 0.929 0.694 0.125; 0.494 0.184 0.556;
            0.466 0.674 0.188; 0.301 0.745 0.933; 0.635 0.078 0.184; 0 0.5 0;
            1 0 1; 0 0.75 0.75];

  h_scatters = [];
  legend_labels = {};

  for i = 1:length(all_k)
    ki = all_k(i);
    ci = colors(mod(i-1, 9) + 1, :);
    pi_roots = pole(feedback(sys, ki));
    % Mark closed-loop poles at this gain with a colored circle
    hs = scatter(real(pi_roots), imag(pi_roots), 60, ci, 'filled', 'MarkerEdgeColor', 'k');
    h_scatters(end+1) = hs;
    
    % Format gain value for legend
    if ki > 50, k_str = sprintf('k=%.0f', ki);
    elseif ki >= 1, k_str = sprintf('k=%.1f', ki);
    elseif ki >= 0.1, k_str = sprintf('k=%.2f', ki);
    else k_str = sprintf('k=%.1e', ki); end
    
    if (exist('OCTAVE_VERSION', 'builtin') == 0)
        legend_labels{end+1} = ['$', k_str, '$'];
    else
        legend_labels{end+1} = k_str;
    end
  end

  % Create legend at the bottom of the plot
  if ~isempty(h_scatters)
    lgd = legend(h_scatters, legend_labels, 'Location', 'southoutside', 'Orientation', 'horizontal');
    if (exist('OCTAVE_VERSION', 'builtin') == 0)
        set(lgd, 'Interpreter', 'latex');
    end
  end

  hold off;
end
