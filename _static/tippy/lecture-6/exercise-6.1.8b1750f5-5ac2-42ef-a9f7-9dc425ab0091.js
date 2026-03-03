selector_to_html = {"a[href=\"#exercise-6-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 6.1<a class=\"headerlink\" href=\"#exercise-6-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Linear%20dynamical%20systems%22\">Analysis \u2219 Linear dynamical systems</a></p><p>A state-space representation of <span class=\"math notranslate nohighlight\">\\(G(s) = \\frac{1}{s+1}\\)</span> is given by</p>", "a[href=\"#equation-eq-lec6-ex1-state-space\"]": "<div class=\"math notranslate nohighlight\" id=\"equation-eq-lec6-ex1-state-space\">\n\\[\\begin{split}\n\\begin{dcases}\n    \\dot{x} = \\begin{bmatrix} -1 &amp; 0 \\\\ 0 &amp; 2  \\end{bmatrix} x + \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} u \\\\\n    y = \\begin{bmatrix} 1 &amp; 0 \\end{bmatrix} x\n\\end{dcases}\n\\end{split}\\]</div>"}
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
