selector_to_html = {"a[href=\"#solutions-of-exercise-1-2\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 1.2<a class=\"headerlink\" href=\"#solutions-of-exercise-1-2\" title=\"Link to this heading\">#</a></h1><p>Assume that the DC-motor in <a class=\"reference internal\" href=\"exercise-1.1.html#ref-lec1-ex1\"><span class=\"std std-ref\">Exercise 1.1</span></a> is running a load attached to an elastic axis, as in the figure above.\nLet <span class=\"math notranslate nohighlight\">\\(k\\)</span> be the axis\u2019 spring constant, and let <span class=\"math notranslate nohighlight\">\\(J_L\\)</span> be the moment of inertia of the load.</p>", "a[href=\"exercise-1.1.html#ref-lec1-ex1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 1.1<a class=\"headerlink\" href=\"#exercise-1-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Linear%20dynamical%20systems%22\">Analysis \u2219 Linear dynamical systems</a></p>", "a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><p>To solve the system\u2019s ODE in the Laplace domain, we replace the time derivative <span class=\"math notranslate nohighlight\">\\(\\frac{d}{dt}\\)</span> with the Laplace operator <span class=\"math notranslate nohighlight\">\\(s\\)</span>:</p>", "a[href=\"#id1\"]": "<figure class=\"align-center\" id=\"id1\">\n<img alt=\"../_images/ex2.png\" src=\"../_images/ex2.png\"/>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 4 </span><span class=\"caption-text\">Schematic of the motor with a load (courtesy of <a class=\"reference external\" href=\"https://uppsala.instructure.com/courses/102131/files/7991063?module_item_id=1296223\"><em>Exercise Manual for Automatic Control</em></a>)</span><a class=\"headerlink\" href=\"#id1\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
