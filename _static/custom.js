document.addEventListener("DOMContentLoaded", function() {

    // --- 1. CONFIGURATION ---
    const config = window.ViewerConfig || {
        css: "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.css",
        js: "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.js"
    };

    // --- 2. HELPERS ---
    function loadCss(url) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
    }

    function loadScript(url, callback) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadCss(config.css);

    // --- 3. MAIN EXECUTION ---
    loadScript(config.js, function() {
        
        // Define the reusable logic here, inside the scope where Viewer is loaded
        function applyBestFit(viewerInstance) {
            if (!viewerInstance) return;

            const img = viewerInstance.imageData;
            const container = viewerInstance.containerData;

            if (img && container) {
                const naturalW = img.naturalWidth || img.width;
                const naturalH = img.naturalHeight || img.height;

                if (naturalW > 0 && naturalH > 0) {
                    // YOUR LOGIC: Scale to 70% of screen width OR height (whichever is smaller)
                    const widthRatio = (container.width * 0.7) / naturalW;
                    const heightRatio = (container.height * 0.7) / naturalH;
                    
                    // The "Best Fit" (Contain) logic
                    const fitRatio = Math.min(widthRatio, heightRatio); 
                    
                    viewerInstance.zoomTo(fitRatio);
                }
            }
        }

        document.body.addEventListener('click', function(e) {
            const target = e.target.closest('.bd-article img');

            if (target) {
                e.preventDefault();
                e.stopPropagation();

                const viewer = new Viewer(target, {
                    // --- CAPTION LOGIC ---
                    title: function (image) {
                        const figure = target.closest('figure');
                        if (figure) {
                            const numberEl = figure.querySelector('.caption-number');
                            const textEl = figure.querySelector('.caption-text');
                            const numberText = numberEl ? numberEl.innerText : "";
                            const bodyText = textEl ? textEl.innerText : "";
                            const fullCaption = (numberText + " " + bodyText).trim();
                            if (fullCaption.length > 0) return fullCaption;
                        }
                        return ""; 
                    },

                    // --- TOOLBAR ---
                    toolbar: {
                        zoomIn: 1, 
                        zoomOut: 1, 
                        oneToOne: 1, 
                        
                        // CUSTOM RESET BUTTON
                        reset: {
                            show: 1,
                            size: 'medium',
                            click: function() {
                                // Apply your 70% fit logic on click
                                applyBestFit(viewer);
                            }
                        },

                        prev: 0, play: 0, next: 0, 
                        rotateLeft: 0, rotateRight: 0, 
                        flipHorizontal: 0, flipVertical: 0,
                    },
                    
                    navbar: false,
                    tooltip: false,
                    backdrop: true,

                    // --- INITIAL OPEN ---
                    viewed() {
                        // Apply your 70% fit logic on open
                        applyBestFit(viewer);
                    },

                    hidden: function() {
                        viewer.destroy();
                    }
                });

                viewer.show();
            }
        }, true);
    });
});