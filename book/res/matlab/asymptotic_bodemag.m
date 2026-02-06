% This script is an adaptation of https://github.com/GalBarkai/asymptotic_bode to make it work with Octave.
% All credits to the original author.

function varargout = asymptotic_bodemag(obj)
    % ASYMPTOTIC_BODEMAG takes as an input a tf,zpk,ss or symbolic object and outputs an
    % asymptotic Bode magnitude plot of its frequency response. Poles and zeros at the
    % origin are accounted for. At the moment purely imaginary poles and zeroes are not
    % supported.
    %
    % [w, mag] = ASYMPTOTIC_BODEMAG(obj) also returns the frequency vector w and
    % the asymptotic magnitude vector mag.
    if numel(tf(obj)) > 1
        error('The system must be single-input single-output');
    end 
    [Z, P, K] = zpkdata(zpk(obj));
    proots = P{:};
    zroots = Z{:};

    % Find and remove imaginary roots
    im_p=proots(find(real(proots)==0));
    proots(find(real(proots)==0))=[];
    im_z=zroots(find(real(zroots)==0));
    zroots(find(real(zroots)==0))=[];

    w_p = [];
    for ii=1:length(proots)
        w_p(1,ii)=abs(proots(ii));
        w_p(2,ii)=-1*abs(sign(real(proots(ii))));
    end
    
    w_z = [];
    for ii=1:length(zroots)
        w_z(1,ii)=abs(zroots(ii));
        w_z(2,ii)=abs(sign(real(zroots(ii))));
    end
    
    w_t = [w_p, w_z];

    if ~isempty(w_t)
        interval=sort([0.01*w_t(1,:), 0.05*w_t(1,:), 0.1*w_t(1,:), 0.2*w_t(1,:), w_t(1,:), 2*w_t(1,:), 5*w_t(1,:), 10*w_t(1,:),100*w_t(1,:)]);
    else
        interval=sort([0.01, 0.05, 0.1, 0.2, 1, 2, 5, 10, 100]);
    end

    % Initial magnitude calculation
    mag = compute_magnitude(interval, w_t, im_p, im_z, zroots, proots, K);

    % Find zero crossings (wc)
    wc_list = [];
    
    % Check internal crossings
    for i = 1:length(mag)-1
        if mag(i) == 0
            wc_list = [wc_list, interval(i)];
        elseif mag(i+1) == 0
            wc_list = [wc_list, interval(i+1)];
        elseif sign(mag(i)) ~= sign(mag(i+1))
            % Linear interpolation on log scale
            % mag = slope * log10(w) + c
            % 0 = slope * log10(wc) + c -> log10(wc) = -c/slope
            % slope = (m2 - m1) / (lw2 - lw1)
            % m - m1 = slope * (lw - lw1) -> 0 - m1 = slope * (lwc - lw1)
            % lwc = lw1 - m1 / slope
            
            lw1 = log10(interval(i));
            lw2 = log10(interval(i+1));
            slope = (mag(i+1) - mag(i)) / (lw2 - lw1);
            
            if slope ~= 0
                lwc = lw1 - mag(i) / slope;
                wc_list = [wc_list, 10^lwc];
            end
        end
    end
    
    % Check extrapolation (start)
    slope_start = (mag(2) - mag(1)) / (log10(interval(2)) - log10(interval(1)));
    if abs(slope_start) > 1e-10 && mag(1) ~= 0
        % if slope suggests crossing at lower frequency
        % mag(1) > 0 and slope > 0 -> going down to 0 at lower freq
        % mag(1) < 0 and slope < 0 -> going up to 0 at lower freq ? No
        % mag(w) = mag(1) + slope * (lw - lw1)
        % 0 = mag(1) + slope * (lwc - lw1)
        lwc = log10(interval(1)) - mag(1) / slope_start;
        wc = 10^lwc;
        if wc < interval(1)
            wc_list = [wc_list, wc];
        end
    end

    % Check extrapolation (end)
    slope_end = (mag(end) - mag(end-1)) / (log10(interval(end)) - log10(interval(end-1)));
    if abs(slope_end) > 1e-10 && mag(end) ~= 0
        lwc = log10(interval(end)) - mag(end) / slope_end;
        wc = 10^lwc;
        if wc > interval(end)
            wc_list = [wc_list, wc];
        end
    end

    if ~isempty(wc_list)
        wc_list = unique(wc_list);
        
        % Ensure padding if wc is at boundaries
        min_wc = min(wc_list);
        max_wc = max(wc_list);
        
        extra_points = [];
        if min_wc <= interval(1)
             extra_points = [extra_points, min_wc / 10];
        end
        if max_wc >= interval(end)
             extra_points = [extra_points, max_wc * 10];
        end
        
        interval = unique(sort([interval, wc_list, extra_points]));
        
        % Recalculate magnitude with new intervals
        mag = compute_magnitude(interval, w_t, im_p, im_z, zroots, proots, K);
    end

    % plots
    figure
    % magnitude
    semilogx(interval,mag,'b','LineWidth',1.2);
    hold on
    ylabel('Magnitude [dB]','FontSize',14)
    xlabel('Frequency [rad/s]','FontSize',14)
    xlim([interval(1), interval(end)]);
    grid on

    % mark frequencies
    if ~isempty(w_t)
        y0=get(gca,'ylim');
        y0=y0(1);
        Ind=unique(mod(find(interval(:)==w_t(1,:)),length(interval)),'stable');

        tx = [w_t(1,:);w_t(1,:);nan(1,length(w_t(1,:)))];
        ty = [y0*ones(1,length(w_t(1,:)));mag(Ind);nan(1,length(w_t(1,:)))];

        plot(tx(:),ty(:),'--k','LineWidth',0.75);
    end
    
    title('Asymptotic Bode magnitude plot');

    if nargout > 0
        varargout{1} = interval;
    end
    if nargout > 1
        varargout{2} = mag;
    end

end

function mag = compute_magnitude(interval, w_t, im_p, im_z, zroots, proots, K)
    if ~isempty(w_t)
        mag=zeros(size(w_t,2),length(interval));

        % calculate magnitude of each pole and zero
        for ii=1:size(mag,1)
                m=20*w_t(2,ii);
                n=-m*log10(w_t(1,ii));
            for jj=1:size(mag,2)
                if interval(jj) <= w_t(1,ii)
                    mag(ii,jj)=0;
                else
                    mag(ii,jj)=m*log10(interval(jj))+n;
                end
            end
        end
        mag=sum(mag,1);
    else
        mag=zeros(1,length(interval));
    end

    % Account for integrators and differentiators (mag)
    if length(find(imag(im_p)==0))>0
        mag_imp=zeros(length(find(imag(im_p)==0)),length(interval));
        m=-20;
        n=0;    
        for ii=1:size(mag_imp,1)
            for jj=1:size(mag_imp,2)
                mag_imp(ii,jj)=m*log10(interval(jj))+n;
            end
        end
        mag=mag+sum(mag_imp,1);
    end

    if length(find(imag(im_z)==0))>0
        mag_imz=zeros(length(find(imag(im_z)==0)),length(interval));
        m=20;
        n=0;    
        for ii=1:size(mag_imz,1)
            for jj=1:size(mag_imz,2)
                mag_imz(ii,jj)=m*log10(interval(jj))+n;
            end
        end
    mag=mag+sum(mag_imz,1);
    end

    % Account for static gain
    mag=mag+mag2db(prod(abs(zroots))/prod(abs(proots)))+mag2db(K);
end