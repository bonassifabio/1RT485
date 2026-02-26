selector_to_html = {"a[href=\"#system-2\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">System 2<a class=\"headerlink\" href=\"#system-2\" title=\"Link to this heading\">#</a></h3><p>We start by computing the poles, zeros, and static gain of the system <span class=\"math notranslate nohighlight\">\\(G(s) = \\frac{0.4}{(s + 0.1)(s^2 + 0.4s + 4)(s + 0.5)}\\)</span></p><p><strong>Poles</strong></p>", "a[href=\"#solution-of-exercise-3-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solution of Exercise 3.1<a class=\"headerlink\" href=\"#solution-of-exercise-3-1\" title=\"Link to this heading\">#</a></h1><p>Sketch the Bode plot of the following systems:</p>", "a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><h3>System 1<a class=\"headerlink\" href=\"#system-1\" title=\"Link to this heading\">#</a></h3><p>We first need to compute the poles and zeros of the system:</p><p><strong>Poles</strong></p>", "a[href=\"#sketching-asymptotic-bode-plots-using-matlab\"]": "<h4 class=\"tippy-header\" style=\"margin-top: 0;\">Sketching asymptotic bode plots using MATLAB<a class=\"headerlink\" href=\"#sketching-asymptotic-bode-plots-using-matlab\" title=\"Link to this heading\">#</a></h4><p>Reported below is the solution, sketched with the script <a class=\"reference external\" href=\"https://raw.githubusercontent.com/bonassifabio/1RT485/refs/heads/main/\">asymptotic_bode</a>.</p>", "a[href=\"#system-1\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">System 1<a class=\"headerlink\" href=\"#system-1\" title=\"Link to this heading\">#</a></h3><p>We first need to compute the poles and zeros of the system:</p><p><strong>Poles</strong></p>"}
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
