(function() {
  'use strict';

  // ==================== 1. MOBILE MENU ====================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ==================== 2. ACTIVE NAVIGATION ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // ==================== 3. TESTIMONIAL SLIDER ====================
  const track = document.getElementById('testimoniTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const items = document.querySelectorAll('.testimoni-item');
    const totalItems = items.length;
    let autoSlideInterval;
    let isPlaying = true;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateSlider();
    }

    function startAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (isPlaying) nextSlide();
      }, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      isPlaying = false;
      setTimeout(() => {
        startAutoSlide();
        isPlaying = true;
      }, 10000);
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      isPlaying = false;
      setTimeout(() => {
        startAutoSlide();
        isPlaying = true;
      }, 10000);
    });

    const slider = document.getElementById('testimoniSlider');
    slider.addEventListener('mouseenter', () => { isPlaying = false; });
    slider.addEventListener('mouseleave', () => { isPlaying = true; });

    startAutoSlide();
  }

  // ==================== 4. CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('input[placeholder="Nama Lengkap"]')?.value;
      const email = contactForm.querySelector('input[placeholder="Email"]')?.value;
      
      if (!name || name.trim() === '') {
        showNotification('❌ Mohon isi nama lengkap Anda', 'error');
        return;
      }
      
      if (!email || !email.includes('@')) {
        showNotification('❌ Mohon isi email yang valid', 'error');
        return;
      }
      
      showNotification('✅ Terima kasih! Pesan Anda telah terkirim.', 'success');
      contactForm.reset();
    });
  }

  // ==================== 5. NOTIFICATION ====================
  function showNotification(message, type = 'info') {
    const oldNotif = document.querySelector('.toast-notification');
    if (oldNotif) oldNotif.remove();
    
    const notif = document.createElement('div');
    notif.className = `toast-notification ${type}`;
    notif.innerHTML = `<div class="toast-content"><span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span><span class="toast-message">${message}</span></div>`;
    
    notif.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'success' ? '#C8242A' : '#ff4444'};
      color: white;
      padding: 12px 24px;
      border-radius: 10px;
      z-index: 9999;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation: slideInRight 0.3s ease;
      cursor: pointer;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
      notif.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
    
    notif.addEventListener('click', () => notif.remove());
  }

  // ==================== 6. SCROLL TO TOP ====================
  const createScrollTopButton = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.id = 'scrollTopBtn';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
      background: #C8242A;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-size: 1.2rem;
    `;
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
  };
  
  createScrollTopButton();

  // ==================== 7. SCROLL REVEAL ANIMATION (FADE IN, SLIDE, SCALE) ====================
  // Semua elemen yang akan dianimasi saat scroll
  const animateElements = document.querySelectorAll('.section, .koleksi-item, .fasilitas-card, .info-card, .kontak-item, .card, .testimoni-item');
  
  // Tambah class awal untuk animasi
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
  });
  
  function checkScroll() {
    animateElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight - 100; // Muncul saat 100px sebelum masuk viewport
      
      if (elementTop < triggerPoint) {
        el.classList.add('animated');
      } else {
        el.classList.remove('animated');
      }
    });
    
    // Efek parallax ringan pada hero
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('load', checkScroll);
  window.addEventListener('resize', checkScroll);

  // ==================== 8. SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, null, targetId);
      }
    });
  });

  // ==================== 9. ADD CSS ANIMATIONS ====================
  const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Animasi Keyframes */
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      /* Class untuk animasi scroll */
      .animate-on-scroll {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Efek berbeda untuk tiap elemen */
      .animate-on-scroll.animated {
        opacity: 1;
      }
      
      /* Section: fade in + slide up */
      .section.animate-on-scroll {
        transform: translateY(40px);
      }
      .section.animate-on-scroll.animated {
        transform: translateY(0);
      }
      
      /* Koleksi item: scale + fade */
      .koleksi-item.animate-on-scroll {
        transform: scale(0.9);
      }
      .koleksi-item.animate-on-scroll.animated {
        transform: scale(1);
      }
      
      /* Fasilitas card: fade in left dengan delay bertahap */
      .fasilitas-card.animate-on-scroll {
        transform: translateX(-30px);
      }
      .fasilitas-card.animate-on-scroll.animated {
        transform: translateX(0);
      }
      
      /* Info card: fade in right */
      .info-card.animate-on-scroll {
        transform: translateX(30px);
      }
      .info-card.animate-on-scroll.animated {
        transform: translateX(0);
      }
      
      /* Kontak item: zoom in */
      .kontak-item.animate-on-scroll {
        transform: scale(0.95);
      }
      .kontak-item.animate-on-scroll.animated {
        transform: scale(1);
      }
      
      /* Card tentang museum: fade in up */
      .card.animate-on-scroll {
        transform: translateY(30px);
      }
      .card.animate-on-scroll.animated {
        transform: translateY(0);
      }
      
      /* Testimoni: fade in dengan delay */
      .testimoni-item.animate-on-scroll {
        transform: scale(0.95);
      }
      .testimoni-item.animate-on-scroll.animated {
        transform: scale(1);
      }
      
      /* Delay berurutan untuk grid items */
      .fasilitas-card:nth-child(1) { transition-delay: 0.05s; }
      .fasilitas-card:nth-child(2) { transition-delay: 0.1s; }
      .fasilitas-card:nth-child(3) { transition-delay: 0.15s; }
      .fasilitas-card:nth-child(4) { transition-delay: 0.2s; }
      .fasilitas-card:nth-child(5) { transition-delay: 0.25s; }
      .fasilitas-card:nth-child(6) { transition-delay: 0.3s; }
      
      .koleksi-item:nth-child(1) { transition-delay: 0.05s; }
      .koleksi-item:nth-child(2) { transition-delay: 0.1s; }
      .koleksi-item:nth-child(3) { transition-delay: 0.15s; }
      .koleksi-item:nth-child(4) { transition-delay: 0.2s; }
      
      .info-card:nth-child(1) { transition-delay: 0.05s; }
      .info-card:nth-child(2) { transition-delay: 0.1s; }
      .info-card:nth-child(3) { transition-delay: 0.15s; }
      
      /* Hover effect tambahan */
      .koleksi-item:hover, .fasilitas-card:hover, .info-card:hover {
        transform: translateY(-10px) !important;
        transition: transform 0.3s ease !important;
      }
      
      /* Parallax effect untuk hero */
      .hero {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      
      @media (max-width: 768px) {
        .hero {
          background-attachment: scroll;
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  addAnimationStyles();

  // ==================== 10. HOVER PARALLAX UNTUK KARTU (Bonus) ====================
  const cards = document.querySelectorAll('.koleksi-item, .fasilitas-card, .info-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ==================== 11. LOADING COMPLETE ====================
  window.addEventListener('load', () => {
    console.log('✅ Museum UPI Website Loaded - Animations Active!');
    
    // Tambah class ke body untuk trigger animasi awal
    document.body.classList.add('loaded');
    
    // Trigger scroll reveal pertama
    setTimeout(checkScroll, 100);
  });

})();
