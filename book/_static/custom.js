// _static/custom.js

document.addEventListener("DOMContentLoaded", function() {
    
    const viewerCss = "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.css";
    const viewerJs = "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.js";

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

    // --- MAIN LOGIC ---
    loadCss(viewerCss);

    loadScript(viewerJs, function() {
        console.log("Viewer.js library loaded successfully with simplified toolbar.");

        document.body.addEventListener('click', function(e) {
            const target = e.target.closest('.bd-article img');

            if (target) {
                e.preventDefault();
                e.stopPropagation();

                const viewer = new Viewer(target, {
                    // --- CUSTOMIZED TOOLBAR ---
                    toolbar: {
                        zoomIn: 1,  // Keep
                        zoomOut: 1, // Keep
                        reset: 1,   // Keep (This is "Fit to View")
                        
                        // Hide everything else by setting to 0
                        oneToOne: 0,
                        prev: 0,
                        play: 0,
                        next: 0,
                        rotateLeft: 0,
                        rotateRight: 0,
                        flipHorizontal: 0,
                        flipVertical: 0,
                    },
                    navbar: false, // Hide the bottom thumbnail bar
                    title: true,  // Show image title/alt text at top
                    tooltip: false, // Hide zoom percentage tooltip on hover

                    // --- THE FIX: FORCE FIT-WIDTH ON OPEN ---
                    viewed() {
                        // Calculate ratio: Container Width / Image Natural Width
                        // This forces the image to touch the left and right edges
                        const widthRatio = 0.75 * viewer.containerData.width / viewer.imageData.naturalWidth;
                        
                        // Apply the zoom
                        viewer.zoomTo(widthRatio);
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