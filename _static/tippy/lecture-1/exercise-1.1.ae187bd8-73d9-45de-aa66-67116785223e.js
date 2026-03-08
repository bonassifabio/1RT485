selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Inductance\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/VFPt_Solenoid_correct2.svg/330px-VFPt_Solenoid_correct2.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Inductance</b> is the tendency of an electrical conductor to oppose a change in the electric current flowing through it. The electric current produces a magnetic field around the conductor. The magnetic field strength depends on the magnitude of the electric current, and therefore follows any changes in the magnitude of the current. From Faraday's law of induction, any change in magnetic field through a circuit induces an electromotive force (EMF) (voltage) in the conductors, a process known as electromagnetic induction. This induced voltage created by the changing current has the effect of opposing the change in current. This is stated by Lenz's law, and the voltage is called <i>back EMF</i>.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Inductance#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/VFPt_Solenoid_correct2.svg/330px-VFPt_Solenoid_correct2.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Inductance</b> is the tendency of an electrical conductor to oppose a change in the electric current flowing through it. The electric current produces a magnetic field around the conductor. The magnetic field strength depends on the magnitude of the electric current, and therefore follows any changes in the magnitude of the current. From Faraday's law of induction, any change in magnetic field through a circuit induces an electromotive force (EMF) (voltage) in the conductors, a process known as electromagnetic induction. This induced voltage created by the changing current has the effect of opposing the change in current. This is stated by Lenz's law, and the voltage is called <i>back EMF</i>.</p>", "a[href=\"#id1\"]": "<figure class=\"align-center\" id=\"id1\">\n<img alt=\"../_images/ex1.png\" src=\"../_images/ex1.png\"/>\n<figcaption>\n<p><span class=\"caption-number\">Fig. 1 </span><span class=\"caption-text\">Schematic of the motor (courtesy of <a class=\"reference external\" href=\"https://uppsala.instructure.com/courses/102131/files/7991063?module_item_id=1296223\"><em>Exercise Manual for Automatic Control</em></a>)</span><a class=\"headerlink\" href=\"#id1\" title=\"Link to this image\">#</a></p>\n</figcaption>\n</figure>", "a[href=\"#exercise-1-1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Exercise 1.1<a class=\"headerlink\" href=\"#exercise-1-1\" title=\"Link to this heading\">#</a></h1><p><a class=\"sd-badge sd-outline-primary sd-rounded-pill\" href=\"../search.html?q=%22Analysis%20%E2%88%99%20Linear%20dynamical%20systems%22\">Analysis \u2219 Linear dynamical systems</a></p>"}
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
