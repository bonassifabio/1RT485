selector_to_html = {"a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><h3>Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#solutions-of-exercise-2-0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 2.0<a class=\"headerlink\" href=\"#solutions-of-exercise-2-0\" title=\"Link to this heading\">#</a></h1><p>Consider a second-order system <span class=\"math notranslate nohighlight\">\\(G(s) = \\frac{1}{s^2 + 3s + 2}\\)</span> and a proportional controller <span class=\"math notranslate nohighlight\">\\(F(s) = 4\\)</span>.</p>", "a[href=\"#question-4\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 4<a class=\"headerlink\" href=\"#question-4\" title=\"Link to this heading\">#</a></h3><p>To compute <span class=\"math notranslate nohighlight\">\\(u(t)\\)</span>, we first compute its Laplace function, <span class=\"math notranslate nohighlight\">\\(U(s)\\)</span>.</p>", "a[href=\"#question-3\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 3<a class=\"headerlink\" href=\"#question-3\" title=\"Link to this heading\">#</a></h3><p>To compute <span class=\"math notranslate nohighlight\">\\(y(\\infty)\\)</span> we use the Final Value Theorem which states that</p>", "a[href=\"#question-2\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 2<a class=\"headerlink\" href=\"#question-2\" title=\"Link to this heading\">#</a></h3><p>To check for asymptotic stability, we first find the closed-loop transfer function:</p>", "a[href=\"#question-1\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3>"}
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
