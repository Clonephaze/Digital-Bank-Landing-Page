/* ============================================================
   Mobile navigation toggle
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const overlay   = document.getElementById('overlay');

if (hamburger && mobileNav && overlay) {
  function openNav() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    hamburger.classList.add('is-active');
    mobileNav.classList.add('is-active');
    mobileNav.removeAttribute('aria-hidden');
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    // Move focus to the first nav link
    const firstLink = mobileNav.querySelector('.mobile-nav__link');
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.classList.remove('is-active');
    mobileNav.classList.remove('is-active');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    // Return focus to the trigger
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  // Close on mobile nav link click
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeNav();
  });
}

/* ============================================================
   Scroll-triggered fade-in animations
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach(el => observer.observe(el));
} else {
  // Fallback: show everything immediately
  fadeEls.forEach(el => el.classList.add('is-visible'));
}
