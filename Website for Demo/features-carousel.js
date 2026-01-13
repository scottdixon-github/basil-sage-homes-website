// Features Slideshow Functionality
(function() {
  const carousel = document.querySelector('.features-carousel');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;
  
  const cards = document.querySelectorAll('.feature-card');
  const totalCards = cards.length;
  let currentSlide = 0;
  
  // Hide all cards except the first one
  cards.forEach((card, index) => {
    card.style.display = index === 0 ? 'flex' : 'none';
    card.style.opacity = index === 0 ? '1' : '0';
  });
  
  // Create dots
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  const dots = document.querySelectorAll('.carousel-dot');
  
  function updateSlideshow() {
    // Fade out current card with slow, dramatic timing
    cards[currentSlide].style.opacity = '0';
    
    setTimeout(() => {
      // Hide all cards
      cards.forEach(card => {
        card.style.display = 'none';
      });
      
      // Show and fade in new card with elegant delay
      cards[currentSlide].style.display = 'flex';
      setTimeout(() => {
        cards[currentSlide].style.opacity = '1';
      }, 150);
    }, 1400);
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    if (index === currentSlide) return;
    currentSlide = index;
    updateSlideshow();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalCards;
    updateSlideshow();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalCards) % totalCards;
    updateSlideshow();
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Auto-play
  let autoplayInterval;
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds for slower, more dramatic effect
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
})();
