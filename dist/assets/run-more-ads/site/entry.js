// Run in the head so the first paint is black, before language content is ready.
(() => {
  const root = document.documentElement;
  root.dataset.pageEntering = '';
  let fallback;
  const reveal = () => {
    clearTimeout(fallback);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.dataset.pageReady = '';
    }));
  };
  // A failed script or translation request must never leave the page covered.
  fallback = setTimeout(reveal, 3000);
  window.addEventListener('rma:page-ready', reveal, { once: true });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    delete root.dataset.pageReady;
    reveal();
  });
})();
