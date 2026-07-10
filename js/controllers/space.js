// js/controllers/space.js
// Controller — Logo-to-NASA-iframe transition on the Space page

(function () {
  const logoWrap    = document.getElementById('logo-wrap');
  const nasaFrame   = document.getElementById('nasa-frame');
  const expandBtn   = document.getElementById('expand-nasa');
  const collapseBtn = document.getElementById('collapse-nasa');

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
})();
