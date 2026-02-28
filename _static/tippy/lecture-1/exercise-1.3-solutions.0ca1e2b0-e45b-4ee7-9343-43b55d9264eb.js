selector_to_html = {"a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><h3>Key Parameters for Second-Order Systems<a class=\"headerlink\" href=\"#key-parameters-for-second-order-systems\" title=\"Link to this heading\">#</a></h3>", "a[href=\"#solutions-of-exercise-1-3\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 1.3<a class=\"headerlink\" href=\"#solutions-of-exercise-1-3\" title=\"Link to this heading\">#</a></h1><p>Pair each step response in the plot above with the correct transfer function from the list below:</p>", "a[href=\"useful-formulas.html#ref-lec1-useful-formulas\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Useful formulas<a class=\"headerlink\" href=\"#useful-formulas\" title=\"Link to this heading\">#</a></h1><p>Before continuing with the exercises, we deem it useful to summarize some useful formula to interpret how the parameters of the transfer function affect the \u201ccharacteristics\u201d of the systems.</p>", "a[href=\"#id1\"]": "<figure class=\"align-center\" id=\"id1\">\n<img alt=\"../_images/ex5.png\" src=\"../_images/ex5.png\"/>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 6 </span><span class=\"caption-text\">Step responses to consider (courtesy of <a class=\"reference external\" href=\"https://uppsala.instructure.com/courses/102131/files/7991063?module_item_id=1296223\"><em>Exercise Manual for Automatic Control</em></a>)</span><a class=\"headerlink\" href=\"#id1\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#key-parameters-for-second-order-systems\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Key Parameters for Second-Order Systems<a class=\"headerlink\" href=\"#key-parameters-for-second-order-systems\" title=\"Link to this heading\">#</a></h3>"}
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
