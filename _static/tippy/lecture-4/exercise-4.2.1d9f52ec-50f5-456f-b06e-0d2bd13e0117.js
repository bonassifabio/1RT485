selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/DC-to-DC_converter\"]": "<p>A <b>DC-to-DC converter</b> is an electronic circuit or electromechanical device that converts a source of direct current (DC) from one voltage level to another. It is a type of electric power converter. Power levels range from very low to very high.</p>", "a[href^=\"https://en.wikipedia.org/wiki/DC-to-DC_converter#\"]": "<p>A <b>DC-to-DC converter</b> is an electronic circuit or electromechanical device that converts a source of direct current (DC) from one voltage level to another. It is a type of electric power converter. Power levels range from very low to very high.</p>", "a[href=\"#exercise-4-2\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 4.2<a class=\"headerlink\" href=\"#exercise-4-2\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Control%20design%20%E2%88%99%20Laplace/Frequency%20domain%22\">Control design \u2219 Laplace/Frequency domain</a></p>", "a[href=\"#fig-lec4-ex2\"]": "<figure class=\"align-default\" id=\"fig-lec4-ex2\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex2.svg\"><img alt=\"../_images/ex2.svg\" src=\"../_images/ex2.svg\" style=\"height: 170px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 25 </span><span class=\"caption-text\">Block diagram of the DC-servomotor.</span><a class=\"headerlink\" href=\"#fig-lec4-ex2\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#dc-dc\"]": "<aside class=\"footnote brackets\" id=\"dc-dc\" role=\"doc-footnote\">\n<span class=\"label\"><span class=\"fn-bracket\">[</span><a href=\"#id1\" role=\"doc-backlink\">1</a><span class=\"fn-bracket\">]</span></span>\n<p>A DC-DC isolated converter is an electronic device that applies the desired control signal  <span class=\"math notranslate nohighlight\">\\(u\\)</span>  to the motor while keeping the controller board electrically insulated from the high-current/high-voltage motor circuit.</p>\n</aside>"}
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
