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
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';
      submitBtn.disabled = true;

      fetch('https://formsubmit.co/ajax/comercial@infinitum.uy', {
        method: 'POST',
        body: new FormData(contactForm)
      })
      .then(response => response.json())
      .then(data => {
        const successMsg = document.getElementById('form-success');
        if (successMsg) {
          successMsg.classList.add('show');
          contactForm.reset();
          setTimeout(() => successMsg.classList.remove('show'), 5000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
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


  /* =============================================
     BLOG MODAL – Open articles in popup
  ============================================= */
  const blogModal   = document.getElementById('blog-modal');
  const modalBody   = document.getElementById('modal-body');
  const modalClose  = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  if (blogModal && modalBody) {

    // Full article data for each post
    const blogPosts = {
      1: {
        tag: 'Tendencias',
        title: 'Innovación en el Real Estate: IA y el Futuro',
        body: `
          <p>La inteligencia artificial está revolucionando la industria inmobiliaria en formas que parecían ciencia ficción hace apenas unos años. Desde la valoración automática de propiedades hasta los chatbots de atención al cliente 24/7, las herramientas de IA se han convertido en aliados indispensables para desarrolladores y agentes.</p>
          <p>Los algoritmos de machine learning ahora pueden predecir tendencias de mercado con una precisión sin precedentes, analizando miles de variables simultáneamente: ubicación, conectividad, proyectos de infraestructura pública, demografía y hasta el sentimiento en redes sociales.</p>
          <p>Además, la generación de renders fotorrealistas mediante IA permite visualizar proyectos en etapas tempranas de desarrollo, acelerando la comercialización. Estas imágenes, que antes requerían mucho más tiempo de produccion, ahora se producen en cuestión de horas.</p>
          <p>Las plataformas de CRM inteligentes aprenden del comportamiento de los clientes potenciales, identificando los leads con mayor probabilidad de conversión y sugiriendo el momento óptimo para contactarlos. Este enfoque data-driven está transformando los equipos de ventas tradicionales en verdaderas máquinas de eficiencia.</p>
        `
      },
      2: {
        tag: 'Marketing',
        title: 'Estrategias de Branding de Alto Impacto',
        body: `
          <p>En el panorama digital actual, el branding ha evolucionado de ser una simple identidad visual a convertirse en la promesa de valor que una empresa hace a sus clientes. Ya no basta con tener un logo atractivo; es necesario construir un ecosistema de marca coherente y emocional.</p>
          <p>El primer paso para un branding de alto impacto es definir el propósito. Las marcas que comunican el "por qué" de su existencia, antes que el "qué" venden, logran una lealtad mucho más profunda. Este propósito debe permear cada punto de contacto, desde la atención al cliente hasta el diseño de la interfaz de usuario.</p>
          <p>La consistencia es el segundo pilar. En un mundo omnicanal, tu marca debe sentirse igual en Instagram, en tu sitio web y en un correo electrónico. Esta familiaridad genera confianza, y la confianza es la moneda más valiosa en los negocios modernos.</p>
          <p>Finalmente, el branding moderno es conversacional. Las marcas ya no hablan "a" su audiencia, sino "con" ella. Escuchar el feedback y adaptar la narrativa en tiempo real es lo que diferencia a las empresas líderes de las seguidoras.</p>
        `
      },
      3: {
        tag: 'Digital',
        title: 'El Futuro del SEO: Más allá de Google',
        body: `
          <p>El SEO ya no es lo que era hace dos años. Con la llegada de la Search Generative Experience (SGE) y los motores de respuesta basados en IA, la forma en que los usuarios consumen información ha cambiado drásticamente. El objetivo ya no es solo aparecer en los resultados, sino ser la fuente de la cual la IA extrae sus respuestas.</p>
          <p>La optimización ahora se centra en la autoridad y la experiencia (E-E-A-T). Google y otros buscadores priorizan el contenido que demuestra conocimiento real y humano sobre temas específicos. Ya no se trata de repetir palabras clave, sino de responder preguntas complejas de manera exhaustiva.</p>
          <p>Las búsquedas por voz y las consultas en lenguaje natural son cada vez más frecuentes. Esto significa que nuestra estrategia de contenidos debe ser más conversacional y directa. Estructurar la información mediante datos enriquecidos (schema markup) es ahora más crítico que nunca para ayudar a los algoritmos a entender el contexto de nuestro sitio.</p>
          <p>El SEO técnico también evoluciona. La velocidad de carga y la accesibilidad siguen siendo pilares, pero la capacidad de un sitio para ser "leído" por agentes de IA se está convirtiendo en un nuevo estándar de optimización.</p>
        `
      },
      4: {
        tag: 'Inversión',
        title: 'Oportunidades en el Mercado Uruguayo 2026',
        body: `
          <p>Uruguay continúa posicionándose como un destino atractivo para la inversión inmobiliaria en América Latina. La estabilidad institucional, la seguridad jurídica y un marco regulatorio favorable hacen del país una opción confiable para inversores locales e internacionales.</p>
          <p>Montevideo lidera el crecimiento con zonas como el Cordón, Pocitos Nuevo y la Ciudad Vieja experimentando una transformación urbana significativa. Nuevos emprendimientos de uso mixto están redefiniendo el paisaje urbano y creando oportunidades de revalorización interesantes.</p>
          <p>La costa este mantiene su atractivo tradicional, pero con un giro: la demanda de viviendas permanentes en ciudades como Punta del Este y Maldonado ha crecido sostenidamente, impulsada por nómades digitales y familias que buscan calidad de vida fuera de la capital.</p>
          <p>Las políticas de incentivo a la construcción y los beneficios fiscales para inversores extranjeros continúan impulsando el desarrollo. Es un momento estratégico para identificar oportunidades antes de que el mercado ajuste los precios al alza.</p>
        `
      },
      5: {
        tag: 'Desarrollo',
        title: 'UX: El Corazón del Desarrollo Web Moderno',
        body: `
          <p>El desarrollo web moderno ha dejado de ser una cuestión puramente técnica para convertirse en una disciplina centrada en el ser humano. Un sitio web exitoso no es aquel que tiene las últimas tecnologías, sino aquel que resuelve los problemas del usuario de la manera más fluida posible.</p>
          <p>La Experiencia de Usuario (UX) comienza mucho antes de escribir la primera línea de código. Se trata de entender el viaje del cliente, sus frustraciones y sus objetivos. Un diseño intuitivo reduce la carga cognitiva, permitiendo que el usuario encuentre lo que busca sin esfuerzo.</p>
          <p>El rendimiento es una parte intrínseca de la UX. Un sitio que tarda más de tres segundos en cargar pierde al 50% de sus visitantes. La optimización de recursos, el uso de frameworks eficientes y una arquitectura limpia son fundamentales para mantener el interés del usuario.</p>
          <p>Finalmente, la accesibilidad ya no es opcional. Diseñar para todos, incluyendo personas con diferentes capacidades, no solo es una responsabilidad ética, sino que también mejora el SEO y amplía el alcance de tu negocio a una audiencia global.</p>
        `
      },
      6: {
        tag: 'Marketing',
        title: 'Contenidos: El Toque Humano frente a la IA',
        body: `
          <p>La IA es un excelente copiloto para la creación de contenidos, pero la chispa de la creatividad sigue siendo humana. Las opiniones personales, la narrativa única y la empatía son las que realmente generan engagement.</p>
          <p>Utilizar la IA para el análisis de datos y la estructuración nos permite enfocarnos en el valor agregado: la historia detrás del dato. La curación de contenidos se vuelve el activo más importante para posicionar una marca como líder de pensamiento.</p>
          <p>El éxito hoy no reside en la cantidad, sino en la profundidad y relevancia. Un contenido de alta calidad multiplataforma es capaz de conectar con la audiencia en múltiples niveles si se mantiene la autenticidad como pilar fundamental.</p>
        `
      },
      7: {
        tag: 'IA',
        title: 'Automatización: Multiplicando la Productividad',
        body: `
          <p>La automatización de procesos ya no es exclusiva de las grandes corporaciones. Hoy en día, cualquier negocio puede implementar flujos de trabajo inteligentes que ahorren cientos de horas al año en tareas repetitivas y administrativas.</p>
          <p>Desde la calificación automática de leads hasta la sincronización de datos entre diferentes plataformas, las herramientas de automatización permiten que los equipos se enfoquen en tareas de alto valor. Un funnel de ventas automatizado, por ejemplo, puede nutrir a un cliente potencial desde el primer contacto hasta el cierre sin intervención humana constante.</p>
          <p>La integración de IA en estos flujos añade una capa de inteligencia. Ya no se trata solo de mover datos de un lugar a otro, sino de tomar decisiones basadas en esos datos. Clasificar correos electrónicos por sentimiento o sugerir respuestas automáticas personalizadas son ejemplos de cómo la IA potencia la productividad.</p>
          <p>Implementar automatizaciones requiere una mentalidad de mejora continua. Identificar los cuellos de botella en la operación diaria es el primer paso para construir una infraestructura digital escalable y eficiente.</p>
        `
      },
      8: {
        tag: 'Estrategia',
        title: 'CRO: El Arte de Vender Más sin Gastar Más',
        body: `
          <p>Muchos negocios cometen el error de centrarse únicamente en atraer tráfico, olvidando que el tráfico sin conversión es solo una métrica de vanidad. El Conversion Rate Optimization (CRO) es la disciplina que se encarga de que ese flujo de visitantes se transforme en resultados reales.</p>
          <p>El CRO se basa en el método científico: analizar datos, formular hipótesis, realizar tests A/B y medir resultados. Pequeños cambios en el color de un botón, la redacción de un titular o la disposición de un formulario pueden generar incrementos significativos en la tasa de conversión.</p>
          <p>Entender la psicología del consumidor es clave. Elementos como la prueba social, la escasez y la urgencia, cuando se usan de manera ética, guían al usuario hacia la acción deseada. Una página de aterrizaje optimizada debe eliminar cualquier fricción que impida al cliente completar su compra o registro.</p>
          <p>La optimización de la conversión es un proceso interminable. El comportamiento del usuario cambia, y lo que funcionaba ayer puede no funcionar mañana. Mantener un ciclo constante de análisis y mejora es lo que garantiza un crecimiento sostenible a largo plazo.</p>
        `
      },
      9: {
        tag: 'IA',
        title: 'Chatbots Inteligentes: Revolucionando la Atención al Cliente',
        body: `
          <p>La atención al cliente ha dejado de ser un centro de costos para convertirse en una ventaja competitiva gracias a la IA conversacional. Los chatbots inteligentes ya no son esos sistemas rígidos de opciones limitadas; hoy son capaces de entender el lenguaje natural y resolver consultas complejas de manera instantánea.</p>
          <p>La principal ventaja es la disponibilidad. Un asistente de IA puede atender a miles de usuarios simultáneamente, las 24 horas del día, los 365 días del año. Esto no solo mejora la satisfacción del cliente, sino que también libera al equipo humano para resolver casos que requieren empatía y juicio crítico.</p>
          <p>La personalización es el siguiente nivel. Estos sistemas pueden integrarse con tu CRM para reconocer al usuario, conocer su historial de compras y ofrecer recomendaciones a medida en tiempo real. La conversación se siente fluida y relevante, aumentando significativamente las probabilidades de conversión.</p>
          <p>Implementar un chatbot inteligente es ahora más accesible que nunca. Con el entrenamiento adecuado sobre la base de conocimientos de tu empresa, esta herramienta se convierte en el embajador de marca más eficiente y escalable de tu ecosistema digital.</p>
        `
      }
    };

    // Open modal
    const openModal = (postId) => {
      const post = blogPosts[postId];
      if (!post) return;

      // Set header content with tag, title and share button
      const modalHeader = document.getElementById('modal-header');
      modalHeader.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
          <span class="modal-article-tag">${post.tag}</span>
          <button id="modal-close-header" style="background: none; border: none; color: var(--clr-muted); font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1; transition: color 0.3s;">✕</button>
        </div>
        <h2 class="modal-article-title">${post.title}</h2>
        <button class="modal-share-btn" data-post-id="${postId}" aria-label="Compartir artículo">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Compartir
        </button>
      `;

      // Set body content with image placeholder, text and a close button
      modalBody.innerHTML = `
        <div class="modal-article-placeholder" style="background-image: url('assets/blog_${postId}.svg'); background-size: cover; background-position: center;"></div>
        <div class="modal-article-text">${post.body}</div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="modal-close-footer" style="margin-top: 30px;">Cerrar Artículo</button>
        </div>
      `;

      // Scroll to top before opening (ensure content is at top when modal appears)
      const modalContent = document.querySelector('.blog-modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
      
      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Ensure scroll is at top after modal animation completes
      setTimeout(() => {
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 100);

      // Close buttons
      const footerClose = document.getElementById('modal-close-footer');
      const headerClose = document.getElementById('modal-close-header');
      
      if (footerClose) footerClose.addEventListener('click', closeModal);
      if (headerClose) {
        headerClose.addEventListener('click', closeModal);
        headerClose.addEventListener('mouseenter', () => headerClose.style.color = 'var(--clr-gold-lt)');
        headerClose.addEventListener('mouseleave', () => headerClose.style.color = 'var(--clr-muted)');
      }

      // Share button functionality
      const shareBtn = document.querySelector('.modal-share-btn');
      if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const title = post.title;
          const url = `${window.location.origin}${window.location.pathname}#blog`;
          
          // Check if Share API is available
          if (navigator.share) {
            navigator.share({
              title: 'Infinitum Blog',
              text: title,
              url: url
            });
          } else {
            // Fallback: copy to clipboard
            const text = `${title} - Infinitum Blog: ${url}`;
            navigator.clipboard.writeText(text).then(() => {
              // Show toast or feedback
              const originalText = shareBtn.textContent;
              shareBtn.textContent = '¡Copiado!';
              setTimeout(() => {
                shareBtn.textContent = originalText;
              }, 2000);
            });
          }
        });
      }
    };

    // Close modal
    const closeModal = () => {
      blogModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Attach click events to all "Leer más" links
    document.querySelectorAll('.post-card .post-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.post-card');
        const postId = card?.dataset.postId;
        if (postId) openModal(postId);
      });
    });

    // Close handlers
    modalOverlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
