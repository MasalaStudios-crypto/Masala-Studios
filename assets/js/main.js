/* ══════════════════════════════════════════════
   Masala Studios — Main JS
   ══════════════════════════════════════════════ */

// ── Scroll-aware header ──
(function () {
  const hdr = document.getElementById('header');
  window.addEventListener('scroll', () => {
    hdr?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Hero orbs fade-in ──
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.hero-canvas');
  if (canvas) setTimeout(() => canvas.classList.add('hero-orbs-ready'), 200);
});

// ── Mobile menu ──
(function () {
  const btn  = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const links = menu?.querySelectorAll('.mobile-link');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    const [s1, s2, s3] = btn.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'translateY(7px) rotate(45deg)';
      s2.style.opacity   = '0';
      s3.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  links?.forEach(l => l.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
})();

// ── Reveal on scroll ──
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 70);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ── Nav active section ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { threshold: 0.35, rootMargin: '-60px 0px 0px 0px' });
  sections.forEach(s => io.observe(s));
})();

// ── Counter animation ──
(function () {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.getAttribute('data-target') || el.textContent);
      const suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;
      let cur = 0;
      const step = target / 45;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.round(cur) + suffix;
        if (cur >= target) clearInterval(timer);
      }, 28);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => io.observe(c));
})();

// ── Subtle tilt on cards ──
(function () {
  const cards = document.querySelectorAll('.pf-card, .award-card, .svc-card, .vp-card');
  const matchMedia = window.matchMedia('(hover:hover)');
  if (!matchMedia.matches) return;
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ── Contact form ──
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;

    // Validate required
    let valid = true;
    form.querySelectorAll('[required]').forEach(inp => {
      inp.style.borderColor = inp.value.trim() ? '' : '#e53e3e';
      if (!inp.value.trim()) valid = false;
    });
    if (!valid) return;

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    const routing = {
      corporativo: 'booking@masalastudios.pro',
      publicidad:  'booking@masalastudios.pro',
      cinematografico: 'booking@masalastudios.pro',
      fotografia:  'booking@masalastudios.pro',
      postproduccion: 'studio@masalastudios.pro',
      directo:     'booking@masalastudios.pro',
      otro:        'info@masalastudios.pro',
      '':          'info@masalastudios.pro',
    };
    const to = routing[service] || 'info@masalastudios.pro';
    const subject = encodeURIComponent(`[Web] Proyecto de ${name}${service ? ' — ' + service : ''}`);
    const body    = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\n\n${message}\n\n---\nEnviado desde masalastudios.pro`);

    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Preparando...`;
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = `mailto:${to}?cc=info@masalastudios.pro&subject=${subject}&body=${body}`;
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Listo`;
      setTimeout(() => { btn.innerHTML = original; btn.disabled = false; form.reset(); }, 3000);
    }, 500);
  });
})();

// ── URL lang param support (for hreflang / sitemap links) ──
(function() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && window.masalaI18n) {
    // Wait for i18n to init then switch
    document.addEventListener('masala:langchange', function handler() {
      document.removeEventListener('masala:langchange', handler);
      if (window.masalaI18n.currentLang !== urlLang) {
        window.masalaI18n.switchLanguage(urlLang);
      }
    }, { once: true });
  }
})();

// ── Font load detection ──
(function() {
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    document.documentElement.classList.add('fonts-loaded');
  }
})();
