// FAQ accordion and other functionality
document.addEventListener("DOMContentLoaded", function () {
  // Flag that JS is enabled (used for carousel layout)
  document.body.classList.add('js-enabled');

  // Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  if (cookieBanner && cookieAccept && cookieDecline) {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }

    // Accept cookies
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
      // You can add analytics or tracking code here
      console.log('Cookies accepted');
    });

    // Decline cookies
    cookieDecline.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('show');
      console.log('Cookies declined');
    });
  }
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navActions.classList.toggle('active');
      this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a, .nav-actions a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const nav = document.querySelector('nav');
      const isClickInside = nav.contains(event.target);
      
      if (!isClickInside && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
      }
    });
  }

  // FAQ accordion
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      // Close others
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
        }
      });

      // Toggle this one
      item.classList.toggle("open");
    });
  });

  // Dynamic year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Lazy-load all images except ones explicitly marked eager
  document.querySelectorAll('img:not([data-eager])').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission handler
  window.handleSubmit = function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    const form = event.target;
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
      background: #10b981;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
    `;
    successMessage.textContent = 'Thank you for your message! We will contact you soon.';
    
    form.appendChild(successMessage);
    form.reset();
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  };

  // Image rotators: fade/zoom through multiple shots for a property
  const rotators = document.querySelectorAll('.image-rotator');
  rotators.forEach((rotator) => {
    const imagesAttr = rotator.dataset.images;
    if (!imagesAttr) return;

    const urls = imagesAttr.split(',').map((u) => u.trim()).filter(Boolean);
    if (urls.length === 0) return;

    // Clear any inline background; frames will handle display
    rotator.style.backgroundImage = 'none';

    // Build frames
    urls.forEach((url, idx) => {
      const frame = document.createElement('div');
      frame.className = 'image-frame';
      frame.style.backgroundImage = `url('${url}')`;
      if (idx === 0) frame.classList.add('active');
      rotator.appendChild(frame);
    });

    let current = 0;
    const frames = rotator.querySelectorAll('.image-frame');
    if (frames.length < 2) return;

    setInterval(() => {
      frames[current].classList.remove('active');
      current = (current + 1) % frames.length;
      frames[current].classList.add('active');
    }, 4500);
  });
});
