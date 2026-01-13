// Testimonials Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.querySelector('.slider-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  const totalSlides = testimonialCards.length;
  let autoPlayInterval;

  // Create dots
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoPlay();
      });
      
      dotsContainer.appendChild(dot);
    }
  }

  // Update dots
  function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  // Auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    sliderTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resetAutoPlay();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  }

  // Pause auto-play on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize
  if (testimonialCards.length > 0) {
    createDots();
    startAutoPlay();
  }

  // Animate rating bars on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratingFills = entry.target.querySelectorAll('.rating-fill');
        ratingFills.forEach(fill => {
          const width = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const ratingSummary = document.querySelector('.rating-summary');
  if (ratingSummary) {
    observer.observe(ratingSummary);
  }

  // Animate category cards on scroll
  const categoryCards = document.querySelectorAll('.category-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  categoryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
});
