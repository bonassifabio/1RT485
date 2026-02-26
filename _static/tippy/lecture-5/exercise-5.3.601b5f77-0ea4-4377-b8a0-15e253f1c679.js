selector_to_html = {"a[href=\"#fig-lec5-ex3-bode\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex3-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/491082287e996f1637b93157843c8e72e85707a4339d6ef9abe1cb873a6ac9ab.png\"><img alt=\"../_images/491082287e996f1637b93157843c8e72e85707a4339d6ef9abe1cb873a6ac9ab.png\" src=\"../_images/491082287e996f1637b93157843c8e72e85707a4339d6ef9abe1cb873a6ac9ab.png\" style=\"width: 75%;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 52 </span><span class=\"caption-text\">Magnitude Bode plot of the nominal complementary sensitivity transfer function <span class=\"math notranslate nohighlight\">\\(T(s)\\)</span>.</span><a class=\"headerlink\" href=\"#fig-lec5-ex3-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#exercise-5-3\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 5.3<a class=\"headerlink\" href=\"#exercise-5-3\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Robustness%20of%20feedback%20controllers%22\">Analysis \u2219 Robustness of feedback controllers</a></p>", "a[href=\"#fig-lec5-ex3-block\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex3-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex2-block.svg\"><img alt=\"../_images/ex2-block.svg\" src=\"../_images/ex2-block.svg\" style=\"width: 600px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 51 </span><span class=\"caption-text\">Block diagram of the control system</span><a class=\"headerlink\" href=\"#fig-lec5-ex3-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
