// js/controllers/nav.js
// Controller — Navigation: mobile toggle + active link highlight

(function () {
  const toggle   = document.querySelector('.nav-toggle');
  const collapse = document.querySelector('.nav-collapse');
  const allLinks = document.querySelectorAll('.nav-links a');

  // Mobile hamburger toggle
  if (toggle && collapse) {
    toggle.addEventListener('click', function () {
      collapse.classList.toggle('open');
      const expanded = collapse.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Mark the current page link as active
  const page = window.location.pathname.split('/').pop() || 'index.html';
  allLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('nav-active');
    }
  });
})();
