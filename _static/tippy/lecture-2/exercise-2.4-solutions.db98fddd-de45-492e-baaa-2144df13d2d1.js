selector_to_html = {"a[href=\"#solution\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Solution<a class=\"headerlink\" href=\"#solution\" title=\"Link to this heading\">#</a></h2><p>Let\u2019s start by writing the dynamical model of the astronaut. From the second Newton\u2019s law <span class=\"math notranslate nohighlight\">\\(F = m \\cdot a\\)</span>. The force <span class=\"math notranslate nohighlight\">\\(F\\)</span> here is the thrust force (<span class=\"math notranslate nohighlight\">\\(u\\)</span>), while the accelerations is the second derivative of the the position (<span class=\"math notranslate nohighlight\">\\(\\ddot{y}\\)</span>). Hence <span class=\"math notranslate nohighlight\">\\(m \\ddot{y} = u\\)</span>, or equivalently</p>", "a[href=\"#question-1\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 1<a class=\"headerlink\" href=\"#question-1\" title=\"Link to this heading\">#</a></h3><p>It can be verified that any <span class=\"math notranslate nohighlight\">\\(K_1 &gt; 0\\)</span>, <span class=\"math notranslate nohighlight\">\\(K_2 &gt; 0\\)</span> guarantees the stability of the closed-loop (Descartes\u2019 rule of signs).</p><p>We can therefore apply the Final Value Theorem, recalling that <span class=\"math notranslate nohighlight\">\\(E(s) = R(s) - Y(s)\\)</span>, where <span class=\"math notranslate nohighlight\">\\(R(s) = \\frac{1}{s^2}\\)</span>.</p>", "a[href=\"#solutions-of-exercise-2-4\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Solutions of Exercise 2.4<a class=\"headerlink\" href=\"#solutions-of-exercise-2-4\" title=\"Link to this heading\">#</a></h1><p>An astronaut working in space needs to control their position using thrusters, which generate force by expelling gas.\nA control system is designed to achieve this, based on the following control law:</p>", "a[href=\"#question-2\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Question 2<a class=\"headerlink\" href=\"#question-2\" title=\"Link to this heading\">#</a></h3><p>We have seen that the denominator of the closed-loop transfer function is <span class=\"math notranslate nohighlight\">\\(s^2 + 0.01 K_1 K_2 s + 0.01 K_1\\)</span>.</p><p>For two complex-conjugate poles, the damping <span class=\"math notranslate nohighlight\">\\(\\xi \\geq 0\\)</span> and the natural frequency <span class=\"math notranslate nohighlight\">\\(\\omega_n &gt; 0\\)</span> are defined as the values such that</p>"}
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
