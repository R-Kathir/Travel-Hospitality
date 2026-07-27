document.addEventListener('DOMContentLoaded', () => {
 
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

 
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
 
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

 
  const searchBar = document.querySelector('.search-bar-glass');
  const searchInputs = document.querySelectorAll('.search-input-group input');

  searchInputs.forEach(input => {
    input.addEventListener('focus', () => {
      searchBar.style.borderColor = 'rgba(255, 255, 255, 0.6)';
      searchBar.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    });

    input.addEventListener('blur', () => {
      searchBar.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      searchBar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
  });
  const menuOpenBtn = document.querySelector('.menu-open-btn');
  const menuCloseBtn = document.querySelector('.menu-close-btn');
  const navMenu = document.getElementById('navMenu');
 
  const navItems = document.querySelectorAll('.nav-link, .nav-cta');

 
  const mobileMenuTl = gsap.timeline({ paused: true });

 
  if (window.innerWidth <= 768) {
    mobileMenuTl.from(navItems, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }

 
  menuOpenBtn.addEventListener('click', () => {
    navMenu.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    if (window.innerWidth <= 768) {
      mobileMenuTl.restart();
    }
  });

 
  menuCloseBtn.addEventListener('click', () => {
    navMenu.classList.remove('is-active');
    document.body.style.overflow = '';
  });

 
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMsg = document.getElementById('newsletterMsg');
  const newsletterBtn = document.getElementById('newsletterBtn');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault(); 

      const emailValue = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
      newsletterMsg.className = 'newsletter-msg';

 
      if (!emailValue) {
        showNewsletterMessage('Please enter your email address.', 'error');
        return;
      }

 
      if (!emailRegex.test(emailValue)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
      }

 
 
      const originalBtnText = newsletterBtn.innerHTML;
      newsletterBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      newsletterBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        showNewsletterMessage('Thank you for subscribing!', 'success');
        newsletterForm.reset();
        window.location.href='404page.html'
 
        newsletterBtn.innerHTML = originalBtnText;
        newsletterBtn.style.pointerEvents = 'auto';

 
        setTimeout(() => {
          gsap.to(newsletterMsg, {
            opacity: 0, duration: 0.5, onComplete: () => {
              newsletterMsg.style.display = 'none';
              newsletterMsg.style.opacity = 1;
            }
          });
        }, 4000);
      }, 1500);
    });
  }

  function showNewsletterMessage(message, type) {
    newsletterMsg.textContent = message;
    newsletterMsg.classList.add(type);
    newsletterMsg.style.display = 'block';

 
    if (type === 'error' && typeof gsap !== 'undefined') {
      gsap.fromTo(newsletterMsg,
        { x: -4 },
        { x: 4, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(newsletterMsg, { x: 0 }) }
      );
    }
  }
});