document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    
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
}); 