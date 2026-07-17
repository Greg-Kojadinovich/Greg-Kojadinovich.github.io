// js/controllers/contact.js
// Controller — Contact form: validate + open pre-filled mailto link

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = document.getElementById('cf-name').value.trim();
    var company = document.getElementById('cf-company').value.trim();
    var email   = document.getElementById('cf-email').value.trim();
    var phone   = (document.getElementById('cf-phone') || {}).value || '';
    var service = document.getElementById('cf-service').value;
    var desc    = document.getElementById('cf-desc').value.trim();

    // Basic validation
    if (!name) { showStatus('Please enter your name.', 'error'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    var subject = 'Project Inquiry — ' + (service || 'General') + ' | ' + name;
    var body =
      'Name: '    + name                         + '\n' +
      'Company: ' + (company || 'N/A')           + '\n' +
      'Email: '   + email                        + '\n' +
      'Phone: '   + (phone.trim() || 'N/A')      + '\n' +
      'Service: ' + (service || 'Not specified') + '\n\n' +
      'Project Description:\n' + (desc || 'Not provided');

    window.location.href =
      'mailto:greg@europawaters.xyz' +
      '?subject=' + encodeURIComponent(subject) +
      '&body='    + encodeURIComponent(body);

    showStatus('Opening your email client…', 'success');
  });

  function showStatus(msg, type) {
    var el = document.getElementById('cf-status');
    if (!el) return;
    el.textContent    = msg;
    el.style.color    = type === 'error' ? '#f55' : 'var(--accent)';
    el.style.display  = 'block';
  }
})();
