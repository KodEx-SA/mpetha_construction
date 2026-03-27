/* ===================================================
   MPETHA CONSTRUCTION — MAIN JS (Improved)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAVBAR ===== */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.remove('transparent');
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
      navbar.classList.add('transparent');
    }
  }
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive:true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold:0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ===== HERO SLIDER ===== */
  const slides     = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  let current = 0;
  let autoplay;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    indicators[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    indicators[current].classList.add('active');
  }

  function startAutoplay() {
    autoplay = setInterval(() => goToSlide(current + 1), 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  document.getElementById('nextSlide')?.addEventListener('click', () => { goToSlide(current + 1); resetAutoplay(); });
  document.getElementById('prevSlide')?.addEventListener('click', () => { goToSlide(current - 1); resetAutoplay(); });

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => { goToSlide(i); resetAutoplay(); });
  });

  startAutoplay();

  /* ===== SCROLL REVEAL ===== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== STAT COUNTER ===== */
  const counters = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target  = +el.dataset.target;
    const suffix  = el.dataset.suffix || '';
    const duration = 1600;
    const start   = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(ease * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ===== SCROLL TO TOP ===== */
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollBtn?.classList.add('active');
    else scrollBtn?.classList.remove('active');
  }, { passive:true });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ===== SMOOTH ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior:'smooth' });
      }
    });
  });

});
