selector_to_html = {"a[href=\"#problem-1\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Problem 1<a class=\"headerlink\" href=\"#problem-1\" title=\"Link to this heading\">#</a></h2><p>Figure 1 (interactive). Bode plot of <script type=\"math/tex\">G(s)</script>. Note that this is also the plot of the open-loop transfer function for <script type=\"math/tex\">K=1</script>, that is, <script type=\"math/tex\">G_o(s) = 1 \\cdot G(s)</script>.</p>", "a[href=\"#extra-resources-for-home-assignment-2\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Extra resources for Home Assignment 2<a class=\"headerlink\" href=\"#extra-resources-for-home-assignment-2\" title=\"Link to this heading\">#</a></h1><h2>Problem 1<a class=\"headerlink\" href=\"#problem-1\" title=\"Link to this heading\">#</a></h2><p>Figure 1 (interactive). Bode plot of <script type=\"math/tex\">G(s)</script>. Note that this is also the plot of the open-loop transfer function for <script type=\"math/tex\">K=1</script>, that is, <script type=\"math/tex\">G_o(s) = 1 \\cdot G(s)</script>.</p>"}
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
