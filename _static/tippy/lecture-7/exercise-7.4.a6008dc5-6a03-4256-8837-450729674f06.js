selector_to_html = {"a[href=\"#exercise-7-4\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 7.4<a class=\"headerlink\" href=\"#exercise-7-4\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Discrete-time%20implementation%22\">Discrete-time implementation</a> <a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Robustness%20of%20feedback%20controllers%22\">Analysis \u2219 Robustness of feedback controllers</a></p><p>For the system <span class=\"math notranslate nohighlight\">\\(G(s) = 5 \\frac{s + 7}{(s + 2)^3}\\)</span> a colleague of yours has designed the following feedback controller:</p>", "a[href=\"#fig-lec7-ex4-bode\"]": "<figure class=\"align-default\" id=\"fig-lec7-ex4-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/c627910dbe0e6a0ac5a3a833cc9b8514850c853974a99dc17e94ddce03f008b6.png\"><img alt=\"../_images/c627910dbe0e6a0ac5a3a833cc9b8514850c853974a99dc17e94ddce03f008b6.png\" src=\"../_images/c627910dbe0e6a0ac5a3a833cc9b8514850c853974a99dc17e94ddce03f008b6.png\" style=\"width: 85%;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 63 </span><span class=\"caption-text\">Bode plot of the open-loop transfer function <span class=\"math notranslate nohighlight\">\\(G_o(s) = F(s) G(s)\\)</span>.</span><a class=\"headerlink\" href=\"#fig-lec7-ex4-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
