document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect
    const hoverElements = document.querySelectorAll('a, button, .project, .interest-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Add click effect
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Add visible class to container
    document.querySelector('.container').classList.add('visible');
    
    // Add visible class to header after a short delay
    setTimeout(() => {
        document.querySelector('header').classList.add('visible');
    }, 100);
    
    // Add visible class to links after a short delay
    setTimeout(() => {
        document.querySelector('.links').classList.add('visible');
    }, 200);
    
    // Add visible class to projects with staggered delay
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('visible');
        }, 300 + (index * 200));
    });

    // Initialize page transition
    const container = document.querySelector('.container');
    const transitionOverlay = document.querySelector('.page-transition');
    
    // Handle link clicks
    document.querySelectorAll('a').forEach(link => {
        if (link.href && !link.href.includes('mailto:') && !link.href.includes('tel:')) {
            link.addEventListener('click', (e) => {
                // Don't handle external links
                if (link.hostname !== window.location.hostname) return;
                
                e.preventDefault();
                const href = link.href;
                
                // Show transition overlay
                transitionOverlay.classList.add('active');
                
                // Hide content
                container.classList.remove('visible');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });

    // Video hover functionality
    const projectCard = document.querySelector('.project-card');
    const video = projectCard.querySelector('.hover-video');

    // Function to handle video play
    async function playVideo() {
        try {
            video.currentTime = 0;
            await video.play();
            console.log('Video started playing');
        } catch (err) {
            console.error('Error playing video:', err);
        }
    }

    // Function to handle video pause
    function pauseVideo() {
        video.pause();
        video.currentTime = 0;
    }

    // Initial video setup
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
        // Try to play once to handle autoplay policy
        playVideo().then(() => pauseVideo());
    });

    projectCard.addEventListener('mouseenter', playVideo);
    projectCard.addEventListener('mouseleave', pauseVideo);
}); 