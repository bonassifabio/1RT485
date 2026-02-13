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

function nyquist_arrows(sys)
% NYQUIST_ARROWS Plots a custom Nyquist diagram with directional arrows and critical highlights.
%
% This function provides an enhanced visualization of the Nyquist plot for
% a given LTI system 'sys'. Key features include:
%   - Directional arrows indicating the frequency increase from 0 to infinity.
%   - Mirrored plot for negative frequencies with corresponding arrows.
%   - Automatic marking of real-axis and imaginary-axis intersections.
%   - Automatic marking of unit-circle crossings (omega_c).
%   - Prioritized tick pruning to prevent label overlap on both axes.
%   - Intelligent scaling to ensure all relevant features are visible.
%
% HIGHLIGHTS:
%   - Circles (o): Real-axis intersections.
%   - Squares (s): Imaginary-axis intersections.
%   - Pentagrams (p): Unit-circle crossings.
%   - Black X: The critical point (-1, 0).
%
% USAGE:
%   nyquist_arrows(sys)
%
% AUTHOR:
%   Fabio Bonassi

    if ~isa(sys, 'tf') && ~isa(sys, 'ss') && ~isa(sys, 'zpk')
        sys = tf(sys);
    end

    % --- 1. Identify relevant frequencies ---
    p = pole(sys);
    z = zero(sys);
    
    % Non-imaginary poles for arrow placement
    p_non_imag = p(abs(real(p)) > 1e-6);
    w_arrows = [];
    if ~isempty(p_non_imag)
        w_slow = min(abs(p_non_imag));
        w_arrows(end+1) = 0.1 * w_slow;
        p_other = p_non_imag(abs(abs(p_non_imag) - w_slow) > 1e-6);
        if ~isempty(p_other)
            w_fast = max(abs(p_non_imag));
            w_arrows(end+1) = 0.1 * w_fast;
        end
    end
    
    % Fallback for systems with only imaginary poles (e.g., pure integrators)
    if isempty(w_arrows)
        w_arrows = 0.5; % Default frequency for arrow
    end

    % Frequency vector for plotting
    w_crit = [abs(p); abs(z); 1; w_arrows(:)];
    w_crit = w_crit(w_crit > 1e-7 & w_crit < 1e7);
    if isempty(w_crit)
        w = logspace(-3, 3, 2500);
    else
        w = logspace(log10(min(w_crit)/100), log10(max(w_crit)*100), 3500);
    end
    w = sort(unique([w(:); w_crit(:)]));

    % Get Frequency Response
    [re, im] = nyquist(sys, w);
    re = squeeze(re);
    im = squeeze(im);
    G_resp = re + 1j*im;

    % --- 2. Scaling and Limits Calculation ---
    imag_poles = p(abs(real(p)) < 1e-6);
    if ~isempty(imag_poles)
        L = 4;
    else
        y_limit_val = max(abs(im));
        re_finite = re(isfinite(re));
        if isempty(re_finite)
            x_limit_val = 1.5;
        else
            x_limit_val = max(abs(re_finite));
        end
        L = max([x_limit_val, y_limit_val, 1.2]);
        L = L * 1.1;
    end

    % --- 3. Figure Setup ---
    fig = gcf;
    pos = get(fig, 'Position');
    side = 800; % Larger fixed size for better proportions
    set(fig, 'Position', [pos(1), pos(2), side, side], 'Color', 'w');
    clf;
    hold on; grid on; box on;
    
    pbaspect([1, 1, 1]);
    xlim([-L, L]);
    ylim([-L, L]);

    % Real and Imaginary Axes (0.75 width, continuous black)
    plot([-L L], [0 0], 'k', 'LineWidth', 0.75, 'HandleVisibility', 'off');
    plot([0 0], [-L L], 'k', 'LineWidth', 0.75, 'HandleVisibility', 'off');

    % Dotted unit circle
    theta = linspace(0, 2*pi, 200);
    plot(cos(theta), sin(theta), 'k:', 'LineWidth', 1, 'HandleVisibility', 'off');

    % Main and Mirrored Plots (Same color 'b' and style '-')
    plot(real(G_resp), imag(G_resp), 'b', 'LineWidth', 1.5, 'HandleVisibility', 'off');
    plot(real(G_resp), -imag(G_resp), 'b', 'LineWidth', 1.5, 'HandleVisibility', 'off');

    % --- 4. Intersections and Highlights ---
    colors = lines(20);
    color_idx = 1;
    tick_x = [-1];
    tick_y = [];

    % Starting point (omega = 0) as black dot if no imaginary poles
    if all(abs(real(p(abs(real(p)) < 1e-6))) > 1e-6) % Double check no poles on imag axis
        G0 = dcgain(sys);
        if isfinite(G0) && abs(G0) < L
            plot(real(G0), 0, 'ko', 'MarkerFaceColor', 'k', 'MarkerSize', 6, 'HandleVisibility', 'off');
        end
    end

    find_intersect = @(val, target) find(diff(sign(val - target)) ~= 0);

    % Real Axis Intersects (Both direct and mirrored)
    idx = find_intersect(im, 0);
    for i = 1:length(idx)
        w_i = w(idx(i)); Gi = G_resp(idx(i));
        if abs(real(Gi)) < L && abs(real(Gi)) > 1e-4
            c = colors(mod(color_idx-1,20)+1,:);
            % Direct
            plot(real(Gi), imag(Gi), 'o', 'Color', c, 'MarkerFaceColor', c, ...
                'DisplayName', sprintf('\\omega = %.2g', w_i));
            % Mirrored (if imag is not zero, but for real axis it should be)
            if abs(imag(Gi)) > 1e-6
                plot(real(Gi), -imag(Gi), 'o', 'Color', c, 'MarkerFaceColor', c, 'HandleVisibility', 'off');
            end
            tick_x(end+1) = real(Gi);
            color_idx = color_idx + 1;
        end
    end

    % Imaginary Axis Intersects (Both direct and mirrored)
    idx = find_intersect(re, 0);
    for i = 1:length(idx)
        w_i = w(idx(i)); Gi = G_resp(idx(i));
        if abs(imag(Gi)) < L && abs(imag(Gi)) > 1e-4
            c = colors(mod(color_idx-1,20)+1,:);
            % Direct
            plot(real(Gi), imag(Gi), 's', 'Color', c, 'MarkerFaceColor', c, ...
                'DisplayName', sprintf('\\omega = %.2g', w_i));
            % Mirrored
            plot(real(Gi), -imag(Gi), 's', 'Color', c, 'MarkerFaceColor', c, 'HandleVisibility', 'off');
            tick_y(end+1) = imag(Gi);
            tick_y(end+1) = -imag(Gi);
            color_idx = color_idx + 1;
        end
    end

    % Unit Circle Intersects (Direct ONLY)
    mag_G = abs(G_resp);
    idx = find_intersect(mag_G, 1);
    for i = 1:length(idx)
        w_i = w(idx(i)); Gi = G_resp(idx(i));
        c = colors(mod(color_idx-1,20)+1,:);
        plot(real(Gi), imag(Gi), 'p', 'Color', c, 'MarkerFaceColor', c, ...
            'DisplayName', sprintf('\\omega_c = %.2g', w_i));
        color_idx = color_idx + 1;
    end

    % |G(i0)| tick
    if all(abs(p) > 1e-7)
        G0 = dcgain(sys);
        if isfinite(G0) && abs(G0) < L
            tick_x(end+1) = G0;
            plot(G0, 0, 'k+', 'MarkerSize', 10, 'HandleVisibility', 'off');
        end
    end

    % Critical point (-1, 0)
    plot(-1, 0, 'kx', 'MarkerSize', 10, 'LineWidth', 2, 'HandleVisibility', 'off');

    % --- 5. Directional Arrows (">" style) ---
    for i = 1:length(w_arrows)
        draw_direction_symbol(sys, w_arrows(i), 'b', false);
        draw_direction_symbol(sys, w_arrows(i), 'b', true); % Mirrored direction
    end

    % --- 6. Final Ticks and Legend ---
    % Increase threshold and prioritize critical ticks (intersections, -1, dcgain)
    % A threshold of ~7% of the total axis width helps prevent label overlap.
    threshold = 0.07 * (2 * L); 
    
    % X-axis: Start with critical ticks, then add default grid ticks only if they fit.
    final_xticks = unique(round(tick_x * 100) / 100);
    final_xticks = final_xticks(abs(final_xticks) <= L);
    default_x = get(gca, 'XTick');
    for i = 1:length(default_x)
        dt = default_x(i);
        if abs(dt) <= L && all(abs(dt - final_xticks) > threshold)
            final_xticks = [final_xticks, dt];
        end
    end
    set(gca, 'XTick', sort(final_xticks));
    
    % Y-axis: Same logic for consistency.
    final_yticks = unique(round(tick_y * 100) / 100);
    final_yticks = final_yticks(abs(final_yticks) <= L);
    default_y = get(gca, 'YTick');
    for i = 1:length(default_y)
        dt = default_y(i);
        if abs(dt) <= L && all(abs(dt - final_yticks) > threshold)
            final_yticks = [final_yticks, dt];
        end
    end
    set(gca, 'YTick', sort(final_yticks));

    % Set formatting and use a slightly smaller font for labels.
    set(gca, 'FontSize', 9);
    if (exist('OCTAVE_VERSION', 'builtin') ~= 0)
        % Octave approach
        set(gca, 'xticklabel', num2str(get(gca, 'xtick')', '%.2f'));
        set(gca, 'yticklabel', num2str(get(gca, 'ytick')', '%.2f'));
    else
        % MATLAB approach
        xtickformat('%.2f');
        ytickformat('%.2f');
        xtickangle(30); % Angle helps prevent horizontal overlap
    end

    if color_idx > 1
        lgd = legend('Location', 'southoutside', 'Orientation', 'horizontal', 'FontSize', 8);
        set(lgd, 'Color', 'none', 'Box', 'on');
    end

    xlabel('Real Axis'); ylabel('Imaginary Axis');
    title('Nyquist Plot');
    hold off;
end

function G = freqs_at_w(sys, w)
    [re, im] = nyquist(sys, w);
    G = squeeze(re) + 1j*squeeze(im);
end

function draw_direction_symbol(sys, w, col, mirrored)
    G1 = freqs_at_w(sys, w);
    G2 = freqs_at_w(sys, w * 1.05);
    
    if mirrored
        G1 = conj(G1); 
        G2 = conj(G2);
        dp = G1 - G2; % Opposite direction for mirrored plot (frequency increases from -inf to 0)
    else
        dp = G2 - G1;
    end
    
    if abs(dp) < 1e-12, return; end
    angle_deg = atan2(imag(dp), real(dp)) * 180 / pi;
    
    % Bigger text-based ">" symbol
    if (exist('OCTAVE_VERSION', 'builtin') ~= 0)
        text(real(G1), imag(G1), '>', 'Rotation', angle_deg, ...
             'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
             'FontSize', 14, 'FontWeight', 'bold', 'Color', col);
    else
        text(real(G1), imag(G1), '$\mathbf{>}$', 'Rotation', angle_deg, ...
             'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
             'FontSize', 16, 'Interpreter', 'latex', 'Color', col);
    end
end
