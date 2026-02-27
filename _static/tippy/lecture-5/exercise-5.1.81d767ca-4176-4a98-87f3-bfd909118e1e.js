selector_to_html = {"a[href=\"#exercise-5-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 5.1<a class=\"headerlink\" href=\"#exercise-5-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Robustness%20of%20feedback%20controllers%22\">Analysis \u2219 Robustness of feedback controllers</a></p><p>Consider the control system in <a class=\"reference internal\" href=\"#fig-lec-ex1-block\"><span class=\"std std-numref\">Fig. 39</span></a>, where <span class=\"math notranslate nohighlight\">\\(v(t)\\)</span> is a sinusoidal disturbance <span class=\"math notranslate nohighlight\">\\(v(t) = \\sin(\\omega t)\\)</span>.</p>", "a[href=\"#attenuation\"]": "<aside class=\"footnote brackets\" id=\"attenuation\" role=\"doc-footnote\">\n<span class=\"label\"><span class=\"fn-bracket\">[</span><a href=\"#id1\" role=\"doc-backlink\">1</a><span class=\"fn-bracket\">]</span></span>\n<p>That is, the effect of <span class=\"math notranslate nohighlight\">\\(v(t)\\)</span> on the output <span class=\"math notranslate nohighlight\">\\(y(t)\\)</span> is <span class=\"math notranslate nohighlight\">\\(\\frac{1}{9}\\)</span> of the maximum amplitude of <span class=\"math notranslate nohighlight\">\\(v(t)\\)</span>, in this case <span class=\"math notranslate nohighlight\">\\(1\\)</span>. In this case, we say that the closed-loop achieves an attenuation factor of <span class=\"math notranslate nohighlight\">\\(9\\)</span> for disturbances at frequency <span class=\"math notranslate nohighlight\">\\(\\omega = 1\\)</span>.</p>\n</aside>", "a[href=\"#fig-lec-ex1-block\"]": "<figure class=\"align-default\" id=\"fig-lec-ex1-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex1-block.svg\"><img alt=\"../_images/ex1-block.svg\" src=\"../_images/ex1-block.svg\" style=\"width: 750px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 39 </span><span class=\"caption-text\">Block diagram of the control system</span><a class=\"headerlink\" href=\"#fig-lec-ex1-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#fig-lec5-ex1-bode\"]": "<figure class=\"align-default\" id=\"fig-lec5-ex1-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/0c0f1430e765a0ce9ec2d7fb1bfb319a47dda92628738b29e9afd566d5cdae27.png\"><img alt=\"../_images/0c0f1430e765a0ce9ec2d7fb1bfb319a47dda92628738b29e9afd566d5cdae27.png\" src=\"../_images/0c0f1430e765a0ce9ec2d7fb1bfb319a47dda92628738b29e9afd566d5cdae27.png\" style=\"width: 75%;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 40 </span><span class=\"caption-text\">Magnitude Bode plot of <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span></span><a class=\"headerlink\" href=\"#fig-lec5-ex1-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
