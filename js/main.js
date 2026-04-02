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
          <p>Además, la generación de renders fotorrealistas mediante IA permite visualizar proyectos en etapas tempranas de desarrollo, acelerando la comercialización y reduciendo costos de marketing. Estas imágenes, que antes requerían semanas de trabajo de diseñadores especializados, ahora se producen en cuestión de horas.</p>
          <p>Las plataformas de CRM inteligentes aprenden del comportamiento de los clientes potenciales, identificando los leads con mayor probabilidad de conversión y sugiriendo el momento óptimo para contactarlos. Este enfoque data-driven está transformando los equipos de ventas tradicionales en verdaderas máquinas de eficiencia.</p>
        `
      },
      2: {
        tag: 'Marketing',
        title: 'Estrategias de Branding para Desarrolladoras',
        body: `
          <p>En un mercado inmobiliario cada vez más competitivo, la diferenciación ya no pasa solo por la calidad constructiva o la ubicación. El branding se ha convertido en el factor decisivo que inclina la balanza a favor de una desarrolladora sobre otra.</p>
          <p>Una marca sólida en el sector inmobiliario transmite confianza, profesionalismo y visión de futuro. Los compradores de hoy investigan exhaustivamente antes de invertir, y la presencia digital de una desarrolladora es, muchas veces, el primer punto de contacto con el cliente.</p>
          <p>El storytelling inmobiliario permite conectar emocionalmente con los compradores potenciales. No se trata solo de vender metros cuadrados, sino de vender un estilo de vida, una comunidad, un futuro. Las campañas más exitosas cuentan historias que resuenan con las aspiraciones de su público objetivo.</p>
          <p>La consistencia visual a través de todos los canales —sitio web, redes sociales, folletería, señalética en obra— refuerza el reconocimiento de marca y genera una percepción de solidez. Cada pieza de comunicación debe ser un embajador de los valores de la empresa.</p>
        `
      },
      3: {
        tag: 'Digital',
        title: 'SEO Inmobiliario: Guía para Principiantes',
        body: `
          <p>El posicionamiento en buscadores es una de las herramientas más poderosas para atraer tráfico calificado al sitio web de tu emprendimiento. Sin embargo, el SEO inmobiliario tiene particularidades que lo distinguen de otras industrias.</p>
          <p>Las búsquedas locales son fundamentales. Frases como "departamentos en [barrio]" o "casas en venta en [ciudad]" son las consultas más frecuentes. Optimizar tu contenido para estas keywords de cola larga puede posicionarte por encima de portales genéricos con presupuestos millonarios.</p>
          <p>El contenido de calidad sigue siendo el rey. Guías de barrios, análisis de mercado, consejos para compradores primerizos —este tipo de contenido no solo atrae visitantes, sino que establece tu autoridad en el sector y genera confianza con potenciales clientes.</p>
          <p>Los aspectos técnicos no pueden descuidarse: velocidad de carga, diseño responsive, datos estructurados para propiedades y una arquitectura de sitio clara son la base sobre la que se construye cualquier estrategia SEO exitosa en el rubro inmobiliario.</p>
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
        tag: 'Cultura',
        title: 'Arquitectura Sostenible: Un Nuevo Estándar',
        body: `
          <p>La sostenibilidad dejó de ser una tendencia para convertirse en una exigencia del mercado inmobiliario moderno. Los compradores de hoy no solo buscan un espacio habitable; buscan un compromiso con el medio ambiente y la eficiencia energética.</p>
          <p>Las certificaciones verdes como LEED, EDGE y BREEAM se han convertido en diferenciales competitivos reales. Los edificios certificados no solo reducen el impacto ambiental, sino que también ofrecen menores costos operativos para sus propietarios, lo que se traduce en mayor valor de reventa.</p>
          <p>El diseño bioclimático, que aprovecha la orientación solar, la ventilación natural y los materiales de bajo impacto, está ganando terreno en Uruguay. Desarrolladoras visionarias están incorporando techos verdes, paneles solares y sistemas de reciclaje de agua pluvial en sus proyectos.</p>
          <p>El futuro del real estate es verde, y las empresas que adopten este paradigma tempranamente serán las que lideren el mercado en la próxima década. No se trata solo de responsabilidad ambiental, sino de inteligencia comercial.</p>
        `
      },
      6: {
        tag: 'Redes',
        title: 'Maximizando Instagram para tu Inmobiliaria',
        body: `
          <p>Instagram se ha consolidado como la plataforma visual por excelencia para el marketing inmobiliario. Con más de mil millones de usuarios activos, ofrece una vitrina inigualable para mostrar propiedades y construir una marca reconocible en el sector.</p>
          <p>El contenido visual de alta calidad es innegociable. Fotografías profesionales, videos de recorridos virtuales y reels dinámicos son los formatos que mayor engagement generan. Las stories permiten mostrar el día a día de la empresa, humanizando la marca y generando cercanía con la audiencia.</p>
          <p>Los hashtags estratégicos y la geolocalización precisa multiplican el alcance de tus publicaciones. Combinar hashtags de nicho (#InmobiliariaUruguay, #DepartamentosEnPozo) con hashtags de mayor volumen maximiza la visibilidad ante audiencias relevantes.</p>
          <p>La interacción genuina con la comunidad es clave. Responder comentarios, participar en conversaciones del sector y colaborar con influencers locales construye una presencia orgánica que ninguna inversión publicitaria puede replicar completamente.</p>
        `
      },
      7: {
        tag: 'Tecnología',
        title: 'Tour Virtual vs. Realidad Aumentada',
        body: `
          <p>Las tecnologías inmersivas han transformado la manera en que los compradores experimentan las propiedades antes de visitarlas físicamente. Pero ¿cuál es la mejor opción para tu emprendimiento: el tour virtual 360° o la realidad aumentada?</p>
          <p>Los tours virtuales permiten recorrer un espacio ya terminado o un render 3D desde cualquier dispositivo. Son ideales para propiedades existentes y para compradores remotos. Su principal ventaja es la accesibilidad: no requieren hardware especial y pueden integrarse fácilmente en sitios web y portales inmobiliarios.</p>
          <p>La realidad aumentada, por otro lado, superpone elementos digitales sobre el mundo real. Permite a los compradores "ver" cómo quedaría un mueble en el salón o visualizar un edificio en un terreno vacío. Es una herramienta poderosa para emprendimientos en etapa de pozo.</p>
          <p>La elección depende del contexto: para propiedades terminadas, el tour virtual ofrece una experiencia inmersiva completa. Para proyectos en desarrollo, la realidad aumentada brinda la posibilidad de tangibilizar algo que aún no existe, generando confianza y entusiasmo en el comprador.</p>
        `
      },
      8: {
        tag: 'Ventas',
        title: 'Cierre de Ventas: Claves para el Éxito',
        body: `
          <p>El cierre de una venta inmobiliaria es el resultado de un proceso cuidadosamente cultivado. No se trata de técnicas agresivas de presión, sino de generar la confianza suficiente para que el comprador tome una decisión informada y se sienta seguro con su inversión.</p>
          <p>La escucha activa es la habilidad más subestimada en el proceso de ventas. Entender las necesidades reales del cliente —no las que asumimos— permite presentar la propiedad adecuada en el momento adecuado. Un vendedor que escucha más de lo que habla cierra más operaciones.</p>
          <p>El manejo de objeciones requiere preparación y empatía. Las objeciones de precio, ubicación o timing no son rechazos; son oportunidades para profundizar en la conversación y aportar valor. Datos de mercado, comparativas y proyecciones de revalorización son herramientas poderosas en estas instancias.</p>
          <p>El seguimiento post-visita es crítico. Un sistema de follow-up automatizado pero personalizado mantiene el interés del comprador sin resultar invasivo. El timing de cada contacto debe ser estratégico, aportando información relevante que acerque al cliente hacia la decisión final.</p>
        `
      },
      9: {
        tag: 'Agentes',
        title: 'Automatizaciones IA para Agentes de Venta',
        body: `
          <p>Los agentes de venta inmobiliarios dedican, en promedio, más del 60% de su tiempo a tareas administrativas y repetitivas. La automatización mediante inteligencia artificial permite liberar ese tiempo para lo que realmente importa: la relación con el cliente.</p>
          <p>Los chatbots inteligentes pueden atender consultas iniciales las 24 horas, filtrar leads por nivel de interés y agendar visitas automáticamente. Esto no reemplaza al agente humano, sino que lo potencia al entregarle leads precalificados y listos para una conversación de valor.</p>
          <p>Los sistemas de CRM con IA aprenden de los patrones de comportamiento de los clientes y sugieren las acciones con mayor probabilidad de éxito. Desde el mejor momento para enviar un email hasta el tipo de propiedad que podría interesarle a un lead específico.</p>
          <p>La generación automática de contenido para redes sociales, newsletters y fichas de propiedades permite mantener una presencia digital constante sin demandar horas de trabajo creativo. El agente del futuro combina la calidez humana con la eficiencia de la tecnología.</p>
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
        <span class="modal-article-tag">${post.tag}</span>
        <h2 class="modal-article-title">${post.title}</h2>
        <button class="modal-share-btn" data-post-id="${postId}" aria-label="Compartir artículo">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Compartir
        </button>
      `;

      // Set body content with image placeholder and text
      modalBody.innerHTML = `
        <div class="modal-article-placeholder"></div>
        <div class="modal-article-text">${post.body}</div>
      `;

      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Scroll to top of modal content
      setTimeout(() => {
        const modalContent = document.querySelector('.blog-modal-content');
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 50);

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
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
