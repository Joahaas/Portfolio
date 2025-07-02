document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .movie-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'visible' class when card comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is done, we can stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Start animation when card is 10% in view
        threshold: 0.1,
        // Start animation slightly before card comes into view
        rootMargin: '0px 0px -50px 0px'
    });

    // Start observing each card
    cards.forEach(card => observer.observe(card));

    // Social dropdown functionality
    const socialToggle = document.querySelector('.social-toggle');
    const socialNavItem = document.querySelector('.social-nav-item');

    if (socialToggle && socialNavItem) {
        socialToggle.addEventListener('click', (e) => {
            e.preventDefault();
            socialNavItem.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!socialNavItem.contains(e.target)) {
                socialNavItem.classList.remove('active');
            }
        });
    }

    // Things I Love Dropdown
    const thingsNavItem = document.querySelector('.things-nav-item');
    const thingsToggle = document.querySelector('.things-toggle');

    document.addEventListener('click', function(e) {
        if (thingsToggle && thingsNavItem) {
            if (thingsToggle.contains(e.target)) {
                thingsNavItem.classList.toggle('active');
            } else if (!thingsNavItem.contains(e.target)) {
                thingsNavItem.classList.remove('active');
            }
        }
    });
});

function scrollSeries(direction) {
  const container = document.querySelector('.series-scroll');
  if (!container) return;
  const card = container.querySelector('.movie-card');
  const scrollAmount = card ? card.offsetWidth + 20 : 300;
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  setTimeout(updateSeriesArrows, 350); // update after scroll animation
}

function updateSeriesArrows() {
  const container = document.querySelector('.series-scroll');
  const leftArrow = document.querySelector('.scroll-arrow.left');
  const rightArrow = document.querySelector('.scroll-arrow.right');
  if (!container || !leftArrow || !rightArrow) return;
  // Allow for a small margin of error due to rounding
  const atStart = container.scrollLeft <= 2;
  const atEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth - 2;
  leftArrow.style.display = atStart ? 'none' : 'flex';
  rightArrow.style.display = atEnd ? 'none' : 'flex';
}

// Update arrows on scroll and on load
window.addEventListener('DOMContentLoaded', updateSeriesArrows);
window.addEventListener('resize', updateSeriesArrows);
const seriesScroll = document.querySelector('.series-scroll');
if (seriesScroll) {
  seriesScroll.addEventListener('scroll', updateSeriesArrows);
}

function scrollFavorites(direction) {
  const container = document.querySelectorAll('.series-scroll')[1];
  if (!container) return;
  const card = container.querySelector('.movie-card');
  const scrollAmount = card ? card.offsetWidth + 20 : 300;
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  setTimeout(updateFavoritesArrows, 350);
}

function updateFavoritesArrows() {
  const container = document.querySelectorAll('.series-scroll')[1];
  const leftArrow = document.querySelectorAll('.scroll-arrow.left')[1];
  const rightArrow = document.querySelectorAll('.scroll-arrow.right')[1];
  if (!container || !leftArrow || !rightArrow) return;
  const atStart = container.scrollLeft <= 2;
  const atEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth - 2;
  leftArrow.style.display = atStart ? 'none' : 'flex';
  rightArrow.style.display = atEnd ? 'none' : 'flex';
}

window.addEventListener('DOMContentLoaded', updateFavoritesArrows);
window.addEventListener('resize', updateFavoritesArrows);
const favoritesScroll = document.querySelectorAll('.series-scroll')[1];
if (favoritesScroll) {
  favoritesScroll.addEventListener('scroll', updateFavoritesArrows);
}

function scrollBooks(direction, sectionIndex) {
  const containers = document.querySelectorAll('.books-scroll');
  const container = containers[sectionIndex];
  if (!container) return;
  const bookItem = container.querySelector('.book-item');
  const scrollAmount = bookItem ? bookItem.offsetWidth + 20 : 250;
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  setTimeout(() => updateBooksArrows(sectionIndex), 350);
}

function updateBooksArrows(sectionIndex) {
  const containers = document.querySelectorAll('.books-scroll');
  const container = containers[sectionIndex];
  const arrows = document.querySelectorAll('.books-scroll-container .scroll-arrow');
  const leftArrow = arrows[sectionIndex * 2];
  const rightArrow = arrows[sectionIndex * 2 + 1];
  
  if (!container || !leftArrow || !rightArrow) return;
  
  const atStart = container.scrollLeft <= 2;
  const atEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth - 2;
  
  leftArrow.style.display = atStart ? 'none' : 'flex';
  rightArrow.style.display = atEnd ? 'none' : 'flex';
}

// Update books arrows on load and resize
window.addEventListener('DOMContentLoaded', () => {
  updateBooksArrows(0);
  updateBooksArrows(1);
  updateBooksArrows(2);
});

window.addEventListener('resize', () => {
  updateBooksArrows(0);
  updateBooksArrows(1);
  updateBooksArrows(2);
});

// Add scroll listeners for each books section
document.querySelectorAll('.books-scroll').forEach((container, index) => {
  container.addEventListener('scroll', () => updateBooksArrows(index));
}); 