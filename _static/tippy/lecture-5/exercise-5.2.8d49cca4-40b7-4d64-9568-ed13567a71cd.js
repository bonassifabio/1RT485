selector_to_html = {"a[href=\"#fig-lec5-ex2-bode\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex2-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/0ac7018551a340897d2a0e0a127b057859cfaeed678eb658509f52d682a6e356.png\"><img alt=\"../_images/0ac7018551a340897d2a0e0a127b057859cfaeed678eb658509f52d682a6e356.png\" src=\"../_images/0ac7018551a340897d2a0e0a127b057859cfaeed678eb658509f52d682a6e356.png\" style=\"width: 75%;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 45 </span><span class=\"caption-text\">Magnitude Bode plot of the nominal open-loop transfer function <span class=\"math notranslate nohighlight\">\\(G_o(s)\\)</span>.</span><a class=\"headerlink\" href=\"#fig-lec5-ex2-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#fig-lec5-ex2-block\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex2-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex2-block.svg\"><img alt=\"../_images/ex2-block.svg\" src=\"../_images/ex2-block.svg\" style=\"width: 750px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 44 </span><span class=\"caption-text\">Block diagram of the control system</span><a class=\"headerlink\" href=\"#fig-lec5-ex2-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#equation-eq-lec5-ex2-uncertainty\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec5-ex2-uncertainty\">\n\\[\n\\lvert \\Delta(i \\omega) \\lvert \\leq \\frac{0.9}{\\sqrt{1 + \\omega^2}} = \\left\\lvert \\frac{0.9}{1 + i \\omega} \\right\\lvert\n\\]</div>", "a[href=\"#exercise-5-2\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 5.2<a class=\"headerlink\" href=\"#exercise-5-2\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Robustness%20of%20feedback%20controllers%22\">Analysis \u2219 Robustness of feedback controllers</a></p>"}
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
