// 1. Tells Plotly “use the page’s MathJax 3, don’t load anything”
window.PlotlyConfig = { MathJaxConfig: 'local' };

// v2 → v3 compatibility shim (runs immediately, before any Plotly script)
(function() {
  if (typeof MathJax === 'undefined') return;

  // Only install if the old Hub is missing (MathJax 3 case)
  if (!MathJax.Hub) {
    MathJax.Hub = {
      Config: function(cfg) {
        console.debug('[MathJax-Shim] Hub.Config called (ignored – use v3 config)');
        return this;
      },
      Queue: function() {
        console.debug('[MathJax-Shim] Hub.Queue called');
        // Forward to v3 promise chain (handles typesetting in plots)
        var args = Array.prototype.slice.call(arguments);
        return (MathJax.startup && MathJax.startup.promise || Promise.resolve())
          .then(function() {
            return Promise.all(args.map(function(item) {
              if (typeof item === 'function') return item();
              return Promise.resolve();
            }));
          });
      },
      Typeset: function(element) {
        console.debug('[MathJax-Shim] Hub.Typeset called on', element);
        if (typeof MathJax.typesetPromise === 'function') {
          return MathJax.typesetPromise(element ? [element] : [])
            .then(function() {
              // Plotly expects this class on the rendered math
              if (element && element.firstElementChild) {
                element.firstElementChild.classList.add('MathJax_SVG');
              }
            });
        }
        return Promise.resolve();
      }
    };
    console.log('✅ MathJax v2 Hub shim installed for Plotly compatibility');
  }
})();
