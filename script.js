/* ============================================================
   Mobile navigation toggle
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const overlay   = document.getElementById('overlay');
const header    = document.querySelector('.header');
const mainEl    = document.getElementById('main-content');
const footer    = document.querySelector('.footer');

if (hamburger && mobileNav && overlay) {
  let prevOverflow = '';

  function openNav() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    hamburger.classList.add('is-active');
    mobileNav.classList.add('is-active');
    mobileNav.removeAttribute('aria-hidden');
    overlay.classList.add('is-active');
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Make background content unreachable at the HTML level
    if (mainEl)  mainEl.inert  = true;
    if (footer)  footer.inert  = true;
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
    document.body.style.overflow = prevOverflow;
    // Restore background content
    if (mainEl)  mainEl.inert  = false;
    if (footer)  footer.inert  = false;
    // Return focus to the trigger
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });

  // Focus trap inside mobile nav
  mobileNav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(mobileNav.querySelectorAll('.mobile-nav__link'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close on mobile nav link click
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav when resizing to desktop (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) closeNav();
    }, 150);
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
