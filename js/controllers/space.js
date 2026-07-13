// js/controllers/space.js
// Controller — Logo-to-NASA-iframe transition on the Space page

(function () {
  const logoWrap    = document.getElementById('logo-wrap');
  const nasaFrame   = document.getElementById('nasa-frame');
  const nasaIframe  = document.getElementById('nasa-iframe');
  const expandBtn   = document.getElementById('expand-nasa');
  const collapseBtn = document.getElementById('collapse-nasa');

  const BASE_URL = 'https://eyes.nasa.gov/apps/solar-system/#/';

  if (!logoWrap || !nasaFrame || !expandBtn) return;

  expandBtn.addEventListener('click', function () {
    logoWrap.classList.add('hidden');
    nasaFrame.classList.remove('hidden');
    nasaFrame.classList.add('reveal');
  });

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      nasaFrame.classList.remove('reveal');
      nasaFrame.classList.add('hidden');
      logoWrap.classList.remove('hidden');
    });
  }

  // All selectable buttons (planets + moon overlays)
  const allDestBtns = document.querySelectorAll('.dest-btn, .moon-overlay');

  allDestBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Clear active from every button
      allDestBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (nasaIframe) {
        nasaIframe.src = BASE_URL + btn.dataset.dest;
      }
    });
  });
})();
