% This script is an adaptation of https://github.com/GalBarkai/asymptotic_bode to make it work with Octave.
% All credits to the original author.

function asymptotic_bode(obj)
    % ASYMPTOTIC_BODE takes as an input a tf,zpk,ss or symbolic object and outputs an
    % asymptotic Bode plot of its frequency response. Poles and zeros at the
    % origin are accounted for, as well as time delays. The phase is
    % interpolated according to 0.1w=0, w=45[deg], 10w=90[deg] (adjusted for
    % multiplicity). At the moment purely imaginary poles and zeroes are not
    % supported.
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

    for ii=1:length(proots)
        w_p(1,ii)=abs(proots(ii));
        w_p(2,ii)=-1*abs(sign(real(proots(ii))));
        w_p(3,ii)=sign(real(proots(ii)));
    end
    for ii=1:length(zroots)
        w_z(1,ii)=abs(zroots(ii));
        w_z(2,ii)=abs(sign(real(zroots(ii))));
        w_z(3,ii)=-1*sign(real(zroots(ii)));
    end
    try
        w_t=[w_p,w_z];
    catch
        try
            w_t=[w_p]; 
        catch
            try
                w_t=[w_z];
            catch
                w_t=[];
            end
        end
    end

    if ~isempty(w_t)
        interval=sort([0.01*w_t(1,:), 0.05*w_t(1,:), 0.1*w_t(1,:), 0.2*w_t(1,:), w_t(1,:), 2*w_t(1,:), 5*w_t(1,:), 10*w_t(1,:),100*w_t(1,:)]);
        mag=zeros(size(w_t,2),length(interval));
        Phi=zeros(size(w_t,2),length(interval));

        % calculate magnitude of each pole and zero
        for ii=1:size(mag,1)
                m=20*w_t(2,ii);
                n=-m*log10(w_t(1,ii));
            for jj=1:size(mag,2)
                if jj < find(interval==w_t(1,ii))+1
                    mag(ii,jj)=0;
                else
                    mag(ii,jj)=m*log10(interval(jj))+n;
                end
            end
        end
        mag=sum(mag,1);
    else
        interval=sort([0.01, 0.05, 0.1, 0.2, 1, 2, 5, 10, 100]);
        mag=zeros(1,length(interval));
        Phi=zeros(1,length(interval));
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


    % Calculate phase
    if ~isempty(w_t)
        for ii=1:size(Phi,1)
                m=(pi/4)*w_t(3,ii);
                n=-m*log10(interval(find(interval==0.1*w_t(1,ii))));%m;
                n=n(1);
            for jj=1:size(Phi,2)
                if jj < find(interval==0.1*w_t(1,ii))+1
                    Phi(ii,jj)=0;
                elseif jj < find(interval==10*w_t(1,ii))+1
                    Phi(ii,jj)=m*log10(interval(jj))+n;
                else
                    Phi(ii,jj)=(pi/2)*w_t(3,ii);    
                end
            end
        end
        Phi = sum(Phi,1);
    else
        Phi = zeros(1, length(interval));
    end

    %integrators and differentiators (phase)
    if length(find(imag(im_p)==0))>0
        phase_imp=(-pi/2)*ones(length(find(imag(im_p)==0)),length(interval));
        Phi=Phi+sum(phase_imp,1);
    end

    if length(find(imag(im_z)==0))>0
        phase_imz=zeros(length(find(imag(im_z)==0)),length(interval));
        Phi=Phi+sum(phase_imz,1);
    end

    % linear term for deadtime\
    if isfield(obj, 'InputDelay')
        phase_dt=-obj.InputDelay*interval;
    else
        phase_dt= 0 * interval;
    end

    % real curves
    [gain_vec,phase_vec,w_vec]=bode(obj,{interval(1),interval(end)});
    gain_vec=squeeze(gain_vec); phase_vec=squeeze(phase_vec); w_vec=squeeze(w_vec);
    pp=phase_vec(1);

    % Adjust real plot to account for NMP
    phase_vec=phase_vec-pp+rad2deg(Phi(1));

    % plots
    figure
    % magnitude
    subplot(2,1,1)
    semilogx(interval,mag,'b','LineWidth',1.2);
    hold on
    % title
    % title('Asymptotic bode plots');
    % xlabel('Frequency [rad/s]','FontSize',14)
    ylabel('Magnitude [dB]','FontSize',14)
    xlim([interval(1), interval(end)]);
    % real plot
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
    
    % phase
    subplot(2,1,2)
    semilogx(interval,rad2deg(Phi+phase_dt),'b','LineWidth',1.2);

    % TBD - mark "break points"
    % y0=get(gca,'ylim');
    % y0=y0(1);
    % hold on;
    % tx = [w_t(1,:);w_t(1,:);nan(1,length(w_t(1,:)))];
    % ty = [y0*ones(1,length(w_t(1,:)));mag(mod(find(interval(:)==w_t(1,:)),length(interval)));nan(1,length(w_t(1,:)))];
    % plot(tx(:),ty(:),'--k','LineWidth',0.75);

    % title
    xlabel('Frequency [rad/s]','FontSize',14);
    ylabel('Phase [deg]','FontSize',14);
    xlim([interval(1), interval(end)]);


    grid on
    if exist('sgtitle')
        sgtitle('Asymptotic Bode plots');
    else
        axes( 'visible', 'off', 'title', 'Asymptotic Bode plots' );
    end 

end
