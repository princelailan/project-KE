document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // Initialize Tilt.js
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 25, speed: 400 });

    // GSAP Animations for cards
    gsap.from('.card', { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power2.out' });

    // Draggable Cards
    document.querySelectorAll('.draggable').forEach(card => {
        let isDragging = false, startX, startY, initialX, initialY;
        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = card.offsetLeft;
            initialY = card.offsetTop;
            card.style.zIndex = 1000;
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                card.style.left = `${initialX + dx}px`;
                card.style.top = `${initialY + dy}px`;
                card.style.position = 'absolute';
            }
        });
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                card.style.zIndex = '';
                gsap.to(card, { duration: 0.3, x: 0, y: 0, ease: 'power2.out', onComplete: () => {
                    card.style.position = '';
                    card.style.left = '';
                    card.style.top = '';
                } });
            }
        });
    });

    // Expandable Content Toggle
    let openCard = null;
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            const expandable = card.querySelector('.expandable');
            const href = button.getAttribute('href');

            if (openCard && openCard !== card) {
                const prevExpandable = openCard.querySelector('.expandable');
                gsap.to(prevExpandable, { duration: 0.3, height: 0, opacity: 0, onComplete: () => {
                    prevExpandable.style.display = 'none';
                } });
                openCard.querySelector('.easter-egg').classList.add('hidden');
            }

            if (expandable.style.display === 'block') {
                gsap.to(expandable, { duration: 0.3, height: 0, opacity: 0, onComplete: () => {
                    expandable.style.display = 'none';
                } });
                card.querySelector('.easter-egg').classList.add('hidden');
                openCard = null;
            } else {
                expandable.style.display = 'block';
                gsap.fromTo(expandable, { height: 0, opacity: 0 }, { duration: 0.3, height: 'auto', opacity: 1 });
                card.querySelector('.easter-egg').classList.remove('hidden');
                openCard = card;

                if (card.classList.contains('easter-egg-flag')) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#000000', '#FFFFFF', '#FF0000', '#008000']
                    });
                }

                setTimeout(() => {
                    if (openCard === card) {
                        window.open(href, '_blank');
                    }
                }, 5000);
            }
        });
    });

    // Button Pulse Animation
    document.querySelectorAll('.pulse').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { duration: 0.3, scale: 1.1, boxShadow: '0 0 10px rgba(245, 101, 101, 0.5)', ease: 'power2.out' });
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { duration: 0.3, scale: 1, boxShadow: 'none', ease: 'power2.out' });
        });
    });
});
