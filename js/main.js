/**
 * INFINITUM – Marketing Inmobiliario
 * Main JavaScript: Navbar, Particles, Reveal Animations, Counter, Form
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     NAVBAR – scroll + hamburger
  ============================================= */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });


  /* =============================================
     PARTICLES (Hero)
  ============================================= */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['rgba(122, 203, 234,', 'rgba(62, 198, 153,', 'rgba(169, 222, 255,'];
    const total  = 30;

    for (let i = 0; i < total; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const size     = Math.random() * 4 + 1;
      const x        = Math.random() * 100;
      const delay    = Math.random() * 12;
      const duration = 8 + Math.random() * 16;
      const opacity  = 0.15 + Math.random() * 0.4;
      const colorBase = colors[Math.floor(Math.random() * colors.length)];

      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${x}%;
        bottom:-10px;
        background:${colorBase}${opacity});
        animation-duration:${duration}s;
        animation-delay:${delay}s;
      `;
      particlesContainer.appendChild(p);
    }
  }


  /* =============================================
     REVEAL ON SCROLL
  ============================================= */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));





  /* =============================================
     SERVICE TABS (servicios.html)
  ============================================= */
  const tabs = document.querySelectorAll('.stab');

  if (tabs.length > 0) {
    const updateActiveTabs = () => {
      const sections = ['paquete-pro', 'marketing', 'web', 'ia', 'disenos'];
      const scrollY  = window.scrollY + 120;

      let current = sections[0];
      sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= scrollY) current = id;
      });

      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.target === current);
      });
    };

    window.addEventListener('scroll', updateActiveTabs);

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }


  /* =============================================
     CONTACT FORM
  ============================================= */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        e.target.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });
  }


  /* =============================================
     SMOOTH PARALLAX – hero elements subtle shift
  ============================================= */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  /* =============================================
     CUSTOM CURSOR (Desktop)
  ============================================= */
  if (window.innerWidth > 900) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      let dx = mouseX - cursorX;
      let dy = mouseY - cursorY;
      
      cursorX += dx * 0.5;
      cursorY += dy * 0.5;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .service-preview-card, .stab, .ci-item, .nav-logo');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

});
