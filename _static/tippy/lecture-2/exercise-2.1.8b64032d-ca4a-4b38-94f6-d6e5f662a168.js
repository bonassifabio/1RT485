selector_to_html = {"a[href=\"#fig-lec2-ex1-resp\"]": "<figure class=\"align-default\" id=\"fig-lec2-ex1-resp\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex1b.png\"><img alt=\"../_images/ex1b.png\" src=\"../_images/ex1b.png\" style=\"height: 400px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 10 </span><span class=\"caption-text\">Closed-loop step responses</span><a class=\"headerlink\" href=\"#fig-lec2-ex1-resp\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#fig-lec2-ex1-rlocus\"]": "<figure class=\"align-default\" id=\"fig-lec2-ex1-rlocus\">\n<a class=\"reference internal image-reference\" href=\"../_images/ex1a.png\"><img alt=\"../_images/ex1a.png\" src=\"../_images/ex1a.png\" style=\"height: 400px;\"/>\n</a>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 9 </span><span class=\"caption-text\">Root Locus plot</span><a class=\"headerlink\" href=\"#fig-lec2-ex1-rlocus\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#exercise-2-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 2.1<a class=\"headerlink\" href=\"#exercise-2-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Feedback%20control%22\">Analysis \u2219 Feedback control</a></p>"}
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
