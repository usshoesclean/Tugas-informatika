  // ==================== 1. MOBILE MENU ====================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    // Toggle menu saat tombol diklik
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Ubah icon burger jadi X (opsional)
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ==================== 2. ACTIVE NAVIGATION ON SCROLL ====================
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

  // ==================== 3. TESTIMONIAL SLIDER (Auto & Manual) ====================
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

    // Event listener tombol
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

    // Pause auto slide saat hover
    const slider = document.getElementById('testimoniSlider');
    slider.addEventListener('mouseenter', () => {
      isPlaying = false;
    });
    slider.addEventListener('mouseleave', () => {
      isPlaying = true;
    });

    // Start auto slide
    startAutoSlide();
  }

  // ==================== 4. CONTACT FORM (Validasi + Alert) ====================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validasi sederhana
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
      
      // Jika valid
      showNotification('✅ Terima kasih! Pesan Anda telah terkirim.', 'success');
      contactForm.reset();
    });
  }

  // ==================== 5. NOTIFICATION SYSTEM (Toast) ====================
  function showNotification(message, type = 'info') {
    // Hapus notifikasi lama jika ada
    const oldNotif = document.querySelector('.toast-notification');
    if (oldNotif) oldNotif.remove();
    
    // Buat elemen notifikasi
    const notif = document.createElement('div');
    notif.className = `toast-notification ${type}`;
    notif.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
        <span class="toast-message">${message}</span>
      </div>
    `;
    
    // Styling notifikasi
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
    
    // Auto hilang setelah 3 detik
    setTimeout(() => {
      notif.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
    
    // Klik untuk hilang
    notif.addEventListener('click', () => notif.remove());
  }

  // ==================== 6. SMOOTH SCROLL (Manual override untuk semua anchor) ====================
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
        
        // Update URL tanpa reload (opsional)
        history.pushState(null, null, targetId);
      }
    });
  });

  // ==================== 7. SCROLL TO TOP BUTTON (Fitur tambahan) ====================
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

  // ==================== 8. ADD CSS ANIMATIONS ====================
  const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      /* Fade in effect untuk section saat scroll */
      .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .section.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  };
  
  addAnimationStyles();

  // ==================== 9. SCROLL REVEAL ANIMATION ====================
  const revealSections = () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 100) {
        section.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', revealSections);
  window.addEventListener('load', revealSections);

  // ==================== 10. LOADING SCREEN (Opsional) ====================
  window.addEventListener('load', () => {
    console.log('✅ Museum UPI Website Loaded Successfully!');
  });

})();
