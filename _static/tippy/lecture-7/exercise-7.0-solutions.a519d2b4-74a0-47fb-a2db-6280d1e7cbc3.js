selector_to_html = {"a[href=\"#equation-eq-lec7-ex0-sol-ss\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec7-ex0-sol-ss\">\n\\[\\begin{split}\nA = \\begin{bmatrix} -3 &amp; 1 \\\\ -5 &amp; 0 \\end{bmatrix} \\quad B = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} \\quad C = \\begin{bmatrix} 1 &amp; 0 \\end{bmatrix} \\quad  D = 0\n\\end{split}\\]</div>", "a[href=\"#lecture\"]": "<aside class=\"footnote brackets\" id=\"lecture\" role=\"doc-footnote\">\n<span class=\"label\"><span class=\"fn-bracket\">[</span><a href=\"#id1\" role=\"doc-backlink\">1</a><span class=\"fn-bracket\">]</span></span>\n<p>See Lecture F8</p>\n</aside>", "a[href=\"#question-1\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3><p>First, let\u2019s recall that the observable canonical form of a second-order system characterized by the transfer function</p>", "a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><h3>Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3><p>First, let\u2019s recall that the observable canonical form of a second-order system characterized by the transfer function</p>", "a[href=\"#equation-eq-lec7-ex0-sol-system\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec7-ex0-sol-system\">\n\\[\n    Y(s) = \\frac{s+1}{s+3s+5} U(s)\n\\]</div>", "a[href=\"#question-2\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 2<a class=\"headerlink\" href=\"#question-2\" title=\"Link to this heading\">#</a></h3><p>The state observer structure used is</p>", "a[href=\"#solutions-of-exercise-7-0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 7.0<a class=\"headerlink\" href=\"#solutions-of-exercise-7-0\" title=\"Link to this heading\">#</a></h1><p>Given the system</p>"}
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
