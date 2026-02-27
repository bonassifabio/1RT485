selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Modal_testing\"]": "<p><b>Modal testing</b> is the form of vibration testing of an object whereby the natural (modal) frequencies, modal masses, modal damping ratios and mode shapes of the object under test are determined.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Modal_testing#\"]": "<p><b>Modal testing</b> is the form of vibration testing of an object whereby the natural (modal) frequencies, modal masses, modal damping ratios and mode shapes of the object under test are determined.</p>", "a[href=\"#equation-eq-lec4-ex0-modulus\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec4-ex0-modulus\">\n\\[\n\\lvert G_o(i \\omega) \\lvert_{\\text{dB}} = \\lvert F(i \\omega) \\lvert_{\\text{dB}}  + \\lvert G(i \\omega) \\lvert_{\\text{dB}} \n\\]</div>", "a[href=\"#equation-eq-lec4-ex0-phase\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec4-ex0-phase\">\n\\[\n\\angle G_o(i \\omega) = \\angle F(i \\omega) + \\angle G(i \\omega)\n\\]</div>", "a[href=\"#exercise-4-0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 4.0<a class=\"headerlink\" href=\"#exercise-4-0\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Control%20design%20%E2%88%99%20Laplace/Frequency%20domain%22\">Control design \u2219 Laplace/Frequency domain</a></p><p>We are given a mechanical system represented by the transfer function <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span>. While an explicit expression for <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span> is not available, we have obtained its frequency response through a lot of <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Modal_testing\">hammer tests</a>. The resulting frequency response is depicted in <a class=\"reference internal\" href=\"#fig-lec4-ex0-bode\"><span class=\"std std-numref\">Fig. 19</span></a> below.</p>", "a[href=\"#fig-lec4-ex0-bode\"]": "<figure class=\"align-default\" id=\"fig-lec4-ex0-bode\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex0-bode.svg\"><img alt=\"../_images/ex0-bode.svg\" src=\"../_images/ex0-bode.svg\" style=\"width: 1000px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 19 </span><span class=\"caption-text\">Bode plot of the mechanical system <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span></span><a class=\"headerlink\" href=\"#fig-lec4-ex0-bode\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
