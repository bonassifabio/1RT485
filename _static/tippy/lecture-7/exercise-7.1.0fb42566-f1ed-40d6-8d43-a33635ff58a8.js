selector_to_html = {"a[href=\"#exercise-7-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 7.1<a class=\"headerlink\" href=\"#exercise-7-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Control%20design%20%E2%88%99%20State%20feedback%22\">Control design \u2219 State feedback</a> <a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Linear%20dynamical%20systems%22\">Analysis \u2219 Linear dynamical systems</a></p>", "a[href=\"#fig-lec7-ex1-block\"]": "<figure class=\"align-default\" id=\"fig-lec7-ex1-block\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex1-block1.svg\"><img alt=\"../_images/ex1-block1.svg\" src=\"../_images/ex1-block1.svg\" style=\"width: 600px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 60 </span><span class=\"caption-text\">Block diagram of the system</span><a class=\"headerlink\" href=\"#fig-lec7-ex1-block\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>"}
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
