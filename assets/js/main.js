// Basic UI helpers: nav toggle, smooth scroll, year
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.querySelector('.nav-list');
  var currentYearEl = document.getElementById('current-year');

  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show');
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      // If it's only '#', let it do default
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        var target = document.querySelector(href);
        var top = target.getBoundingClientRect().top + window.pageYOffset - 70; // offset for sticky header
        window.scrollTo({ top: top, behavior: 'smooth' });

        // Close nav on mobile after click
        if (navList.classList.contains('show')) {
          navList.classList.remove('show');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header-inner')) {
      if (navList && navList.classList.contains('show')) {
        navList.classList.remove('show');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
