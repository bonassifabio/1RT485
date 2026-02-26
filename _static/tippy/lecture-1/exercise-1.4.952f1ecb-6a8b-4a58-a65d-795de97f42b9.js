selector_to_html = {"a[href=\"#id1\"]": "<figure class=\"align-center\" id=\"id1\">\n<img alt=\"../_images/ex4.png\" src=\"../_images/ex4.png\"/>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 7 </span><span class=\"caption-text\">Step responses to consider (courtesy of <a class=\"reference external\" href=\"https://uppsala.instructure.com/courses/102131/files/7991063?module_item_id=1296223\"><em>Exercise Manual for Automatic Control</em></a>)</span><a class=\"headerlink\" href=\"#id1\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"useful-formulas.html#ref-lec1-useful-formulas\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Useful formulas<a class=\"headerlink\" href=\"#useful-formulas\" title=\"Link to this heading\">#</a></h1><p>Before continuing with the exercises, we deem it useful to summarize some useful formula to interpret how the parameters of the transfer function affect the \u201ccharacteristics\u201d of the systems.</p>", "a[href=\"#exercise-1-4\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 1.4<a class=\"headerlink\" href=\"#exercise-1-4\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Linear%20dynamical%20systems%22\">Analysis \u2219 Linear dynamical systems</a></p>"}
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
