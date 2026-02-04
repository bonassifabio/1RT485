function fig = bodeplot_universal(varargin)
    % BODEPLOT_UNIVERSAL Universal bode plot function for MATLAB and Octave
    % 
    % Usage: bodeplot_universal(sys1, style1, sys2, style2, ...)
    %
    % This function creates bode plots that work in both MATLAB and Octave.
    % In MATLAB, it calls the native bodeplot function.
    % In Octave, it creates custom magnitude and phase plots.
    %
    % Arguments:
    %   sys1, sys2, ... - Transfer function systems (tf, zpk, or ss objects)
    %   style1, style2, ... - Line styles (optional, e.g., 'r-', 'b--')
    %
    % Returns:
    %   fig - Figure handle
    
    % Check if running in Octave
    isOctave = (exist('OCTAVE_VERSION', 'builtin') ~= 0);
    
    if ~isOctave
        % MATLAB: Use native bodeplot function
        fig = bodeplot(varargin{:});
    else
        % Octave: Create custom bode plot
        
        % Parse input arguments (systems and styles)
        systems = {};
        styles = {};
        
        i = 1;
        while i <= length(varargin)
            % Add system
            systems{end+1} = varargin{i};
            
            % Check if next argument is a style string
            if i+1 <= length(varargin) && ischar(varargin{i+1})
                styles{end+1} = varargin{i+1};
                i = i + 2;
            else
                styles{end+1} = ''; % Default style
                i = i + 1;
            end
        end
        
        % Create frequency vector
        % Determine frequency range from all systems
        w_min = inf;
        w_max = -inf;
        
        for k = 1:length(systems)
            sys = systems{k};
            % Get poles and zeros to estimate frequency range
            p = pole(sys);
            z = zero(sys);
            
            if ~isempty(p)
                w_min = min(w_min, min(abs(p(abs(p) > 0))) / 10);
                w_max = max(w_max, max(abs(p)) * 10);
            end
            if ~isempty(z)
                w_min = min(w_min, min(abs(z(abs(z) > 0))) / 10);
                w_max = max(w_max, max(abs(z)) * 10);
            end
        end
        
        % Default frequency range if not determined
        if isinf(w_min) || w_min == 0
            w_min = 0.01;
        end
        if isinf(w_max) || w_max == 0
            w_max = 100;
        end
        
        % Create logarithmically spaced frequency vector
        w = logspace(log10(w_min), log10(w_max), 1000);
        
        % Create figure with two subplots
        fig = figure;
        
        % Magnitude subplot
        subplot(2, 1, 1);
        hold on;
        grid off;
        box on;
        
        for k = 1:length(systems)
            sys = systems{k};
            [mag, phase, wout] = bode(sys, w);
            mag = squeeze(mag);
            mag_db = 20 * log10(mag);
            
            if ~isempty(styles{k})
                semilogx(wout, mag_db, styles{k});
            else
                semilogx(wout, mag_db);
            end
        end
        
        ylabel('Magnitude (dB)');
        title('Bode Diagram');
        xlim([w_min, w_max]);
        hold off;
        
        % Phase subplot
        subplot(2, 1, 2);
        hold on;
        grid off;
        box on;
        
        for k = 1:length(systems)
            sys = systems{k};
            [mag, phase, wout] = bode(sys, w);
            phase = squeeze(phase);
            
            if ~isempty(styles{k})
                semilogx(wout, phase, styles{k});
            else
                semilogx(wout, phase);
            end
        end
        
        xlabel('Frequency (rad/s)');
        ylabel('Phase (deg)');
        xlim([w_min, w_max]);
        hold off;
    end
end