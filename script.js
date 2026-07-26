document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2, // Smoothness duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // 2. Sync Lenis with GSAP ScrollTrigger
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
    // If the page is scrolled down more than 50px, add the class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Existing Search Bar Highlight Effect ---
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
  // Select all links and the CTA to animate them smoothly
  const navItems = document.querySelectorAll('.nav-link, .nav-cta');

  // Create a GSAP timeline for the mobile menu elements (paused by default)
  const mobileMenuTl = gsap.timeline({ paused: true });

  // Only apply animations if the screen is mobile-sized
  if (window.innerWidth <= 768) {
    mobileMenuTl.from(navItems, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }

  // Open Menu
  menuOpenBtn.addEventListener('click', () => {
    navMenu.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling

    if (window.innerWidth <= 768) {
      mobileMenuTl.restart();
    }
  });

  // Close Menu
  menuCloseBtn.addEventListener('click', () => {
    navMenu.classList.remove('is-active');
    document.body.style.overflow = '';
  });

  // Close menu automatically if a link is clicked
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
      e.preventDefault(); // Prevent page reload

      const emailValue = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

      // Reset classes
      newsletterMsg.className = 'newsletter-msg';

      // 1. Check if empty
      if (!emailValue) {
        showNewsletterMessage('Please enter your email address.', 'error');
        return;
      }

      // 2. Check if valid email format
      if (!emailRegex.test(emailValue)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
      }

      // 3. Success State
      // Simulate network request loading state
      const originalBtnText = newsletterBtn.innerHTML;
      newsletterBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      newsletterBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        showNewsletterMessage('Thank you for subscribing!', 'success');
        newsletterForm.reset();
        window.location.href='404page.html'
        // Reset button
        newsletterBtn.innerHTML = originalBtnText;
        newsletterBtn.style.pointerEvents = 'auto';

        // Hide success message after 4 seconds
        setTimeout(() => {
          gsap.to(newsletterMsg, {
            opacity: 0, duration: 0.5, onComplete: () => {
              newsletterMsg.style.display = 'none';
              newsletterMsg.style.opacity = 1;
            }
          });
        }, 4000);
      }, 1500); // Simulated 1.5s delay
    });
  }

  function showNewsletterMessage(message, type) {
    newsletterMsg.textContent = message;
    newsletterMsg.classList.add(type);
    newsletterMsg.style.display = 'block';

    // Add a subtle GSAP shake animation if it's an error
    if (type === 'error' && typeof gsap !== 'undefined') {
      gsap.fromTo(newsletterMsg,
        { x: -4 },
        { x: 4, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(newsletterMsg, { x: 0 }) }
      );
    }
  }
});