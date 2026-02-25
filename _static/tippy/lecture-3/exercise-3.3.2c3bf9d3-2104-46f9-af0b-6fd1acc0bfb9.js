selector_to_html = {"a[href=\"#exercise-3-3\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 3.3<a class=\"headerlink\" href=\"#exercise-3-3\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Feedback%20control%22\">Analysis \u2219 Feedback control</a></p>", "a[href=\"#fig-lec3-ex3-nyquist\"]": "<figure class=\"align-default\" id=\"fig-lec3-ex3-nyquist\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex3-nyq.png\"><img alt=\"../_images/ex3-nyq.png\" src=\"../_images/ex3-nyq.png\" style=\"width: 700px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 16 </span><span class=\"caption-text\">Nyquist plots of <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span></span><a class=\"headerlink\" href=\"#fig-lec3-ex3-nyquist\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#fig-lec3-ex3-block\"]": "<figure class=\"align-default\" id=\"fig-lec3-ex3-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex31.svg\"><img alt=\"../_images/ex31.svg\" src=\"../_images/ex31.svg\" style=\"height: 180px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 15 </span><span class=\"caption-text\">Block diagram of the closed loop</span><a class=\"headerlink\" href=\"#fig-lec3-ex3-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(`article.bd-article ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: false,
                placement: 'auto-start', maxWidth: 500, interactive: true, boundary: document.body, appendTo: document.body,
                onShow(instance) {MathJax.typesetPromise([instance.popper]).then(() => {var isFirefox=typeof InstallTrigger!=='undefined';if(isFirefox&&window.MathJax&&MathJax.startup&&MathJax.startup.output&&MathJax.startup.output.name==="SVG"){const svgs=instance.popper.querySelectorAll('svg');svgs.forEach(svg=>{let bbox=svg.getBBox(),x=bbox.x,y=bbox.y,width=bbox.width,height=bbox.height;svg.setAttribute('width',width);svg.setAttribute('height',height);svg.setAttribute('viewBox',`${x} ${y} ${width} ${height}`);});let rescale=0.015;svgs.forEach(svg=>{let bbox=svg.getBBox(),width=bbox.width,height=bbox.height;svg.setAttribute('width',width*rescale);svg.setAttribute('height',height*rescale);});}});},
            });
        };
    };
    console.log("tippy tips loaded!");
};
