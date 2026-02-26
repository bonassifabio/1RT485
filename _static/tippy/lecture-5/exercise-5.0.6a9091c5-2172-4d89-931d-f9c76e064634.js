selector_to_html = {"a[href=\"#fig-lec5-ex0-bode\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex0-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/8f3312141ab70fd14e9dcbbe5adbaf9814254d5c3f3d5ec8d5f07a537ae6e200.png\"><img alt=\"../_images/8f3312141ab70fd14e9dcbbe5adbaf9814254d5c3f3d5ec8d5f07a537ae6e200.png\" src=\"../_images/8f3312141ab70fd14e9dcbbe5adbaf9814254d5c3f3d5ec8d5f07a537ae6e200.png\" style=\"width: 75%;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 31 </span><span class=\"caption-text\">Magnitude Bode plot of <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span></span><a class=\"headerlink\" href=\"#fig-lec5-ex0-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#exercise-5-0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 5.0<a class=\"headerlink\" href=\"#exercise-5-0\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Robustness%20of%20feedback%20controllers%22\">Analysis \u2219 Robustness of feedback controllers</a></p><p>Consider the control system in <a class=\"reference internal\" href=\"#fig-lec-ex0-block\"><span class=\"std std-numref\">Fig. 30</span></a>, where <span class=\"math notranslate nohighlight\">\\(n(t)\\)</span> is the sinusoidal measurement noise <span class=\"math notranslate nohighlight\">\\(n(t) = \\sin(50 t)\\)</span>.</p>", "a[href=\"#fig-lec-ex0-block\"]": "<figure class=\"align-default\" id=\"fig-lec-ex0-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex0-block.svg\"><img alt=\"../_images/ex0-block.svg\" src=\"../_images/ex0-block.svg\" style=\"width: 600px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 30 </span><span class=\"caption-text\">Block diagram of the control system</span><a class=\"headerlink\" href=\"#fig-lec-ex0-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
