selector_to_html = {"a[href=\"#useful-formulas\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Useful formulas<a class=\"headerlink\" href=\"#useful-formulas\" title=\"Link to this heading\">#</a></h1><p>Before continuing with the exercises, we deem it useful to summarize some useful formula to interpret how the parameters of the transfer function affect the \u201ccharacteristics\u201d of the systems.</p>", "a[href=\"#first-order-systems\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">First order systems<a class=\"headerlink\" href=\"#first-order-systems\" title=\"Link to this heading\">#</a></h2><p>Let\u2019s start by considering a first-order transfer function,</p>", "a[href=\"#numerical-example\"]": "<h4 class=\"tippy-header\" style=\"margin-top: 0;\">Numerical example<a class=\"headerlink\" href=\"#numerical-example\" title=\"Link to this heading\">#</a></h4><p>Let\u2019s plot the step response of a bunch of second-order systems having poles with the same real part (<span class=\"math notranslate nohighlight\">\\(-1\\)</span>) but different values of <span class=\"math notranslate nohighlight\">\\(\\xi\\)</span>. These systems will have equation</p>", "a[href=\"#mostunstablepole\"]": "<aside class=\"footnote brackets\" id=\"mostunstablepole\" role=\"doc-footnote\">\n<span class=\"label\"><span class=\"fn-bracket\">[</span><a href=\"#id2\" role=\"doc-backlink\">2</a><span class=\"fn-bracket\">]</span></span>\n<p>The pole farthest into the right-half plane (that is, with the largest <em>modulus</em> and positive real part) is the most unstable pole, that is, the one that is diverging faster.</p>\n</aside>", "a[href=\"#higher-order-systems\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Higher order systems<a class=\"headerlink\" href=\"#higher-order-systems\" title=\"Link to this heading\">#</a></h2><p>If the transfer function has multiple real poles, or has a degree higher than <span class=\"math notranslate nohighlight\">\\(2\\)</span>, its <em>dynamic response</em> is mostly determined by the <strong>dominant poles</strong>.</p>", "a[href=\"#second-order-systems-with-complex-conjugate-poles\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Second order systems with complex-conjugate poles<a class=\"headerlink\" href=\"#second-order-systems-with-complex-conjugate-poles\" title=\"Link to this heading\">#</a></h3><p>Suppose that <span class=\"math notranslate nohighlight\">\\(G(s)\\)</span> is a second order system with two complex-conjugate poles,</p>", "a[href=\"#slowestpole\"]": "<aside class=\"footnote brackets\" id=\"slowestpole\" role=\"doc-footnote\">\n<span class=\"label\"><span class=\"fn-bracket\">[</span><a href=\"#id1\" role=\"doc-backlink\">1</a><span class=\"fn-bracket\">]</span></span>\n<p>The pole closest to the origin (that is, with the smallest <em>modulus</em>) is the <em>slowest pole</em> of the system.</p>\n</aside>"}
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
