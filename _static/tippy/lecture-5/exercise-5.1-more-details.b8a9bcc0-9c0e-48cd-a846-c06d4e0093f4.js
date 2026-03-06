selector_to_html = {"a[href=\"#k-1\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\"><span class=\"math notranslate nohighlight\">\\(K = 1\\)</span><a class=\"headerlink\" href=\"#k-1\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#k-1-sqrt-5\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\"><span class=\"math notranslate nohighlight\">\\(K = 1 + \\sqrt{5}\\)</span><a class=\"headerlink\" href=\"#k-1-sqrt-5\" title=\"Link to this heading\">#</a></h2><p>Let\u2019s now plot the open-loop transfer function and the sensitivity function for <span class=\"math notranslate nohighlight\">\\(K= 1 + \\sqrt{161}\\)</span>, which was the analytical solution we got.</p>", "a[href=\"#plotting-the-exact-sensitivity-function\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Plotting the exact Sensitivity function<a class=\"headerlink\" href=\"#plotting-the-exact-sensitivity-function\" title=\"Link to this heading\">#</a></h1><p>In case you are curious, below you can find the code to plot the exact sensitivity transfer function.</p>"}
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
