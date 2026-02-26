selector_to_html = {"a[href=\"#equation-eq-lec6-ex2-sol-state-space\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec6-ex2-sol-state-space\">\n\\[\\begin{split}\n\\begin{dcases}\n\\dot{x} = \\begin{bmatrix} 1 &amp; -1 \\\\ 2 &amp; 1 \\end{bmatrix} x + \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} u \\\\\ny = \\begin{bmatrix} 1 &amp; 1\\end{bmatrix} x\n\\end{dcases} \n\\end{split}\\]</div>", "a[href=\"#question-2\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 2<a class=\"headerlink\" href=\"#question-2\" title=\"Link to this heading\">#</a></h3><p>The transfer function can be computes as</p>", "a[href=\"#question-3\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 3<a class=\"headerlink\" href=\"#question-3\" title=\"Link to this heading\">#</a></h3><p>The poles of <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span> are still <span class=\"math notranslate nohighlight\">\\(s = 1 \\pm \\sqrt{2}\\)</span>. The system is therefore not input-output stable.</p><p>There is one zero in <span class=\"math notranslate nohighlight\">\\(s = -1\\)</span>.</p>", "a[href=\"#question-1\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3><p>The poles of  <a class=\"reference internal\" href=\"#equation-eq-lec6-ex2-sol-state-space\">(28)</a> are given by the roots of the characteristic polynomial of <span class=\"math notranslate nohighlight\">\\(A\\)</span>:</p>", "a[href=\"#solutions-of-exercise-6-2\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 6.2<a class=\"headerlink\" href=\"#solutions-of-exercise-6-2\" title=\"Link to this heading\">#</a></h1><p>Given the state-space model:</p>", "a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><h3>Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3><p>The poles of  <a class=\"reference internal\" href=\"#equation-eq-lec6-ex2-sol-state-space\">(28)</a> are given by the roots of the characteristic polynomial of <span class=\"math notranslate nohighlight\">\\(A\\)</span>:</p>"}
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
