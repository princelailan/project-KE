document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: 'none', random: true }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
        }
    });

    // Initialize Tilt.js
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });

    // GSAP Animations for Cards
    gsap.from('.card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Draggable Cards
    const cards = document.querySelectorAll('.draggable');
    cards.forEach(card => {
        let isDragging = false, startX, startY, initialX, initialY;
        card.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = card.offsetLeft;
            initialY = card.offsetTop;
            card.style.zIndex = 1000;
        });
        document.addEventListener('mousemove', e => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                card.style.left = initialX + dx + 'px';
                card.style.top = initialY + dy + 'px';
                card.style.position = 'absolute';
            }
        });
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                card.style.zIndex = 1;
                gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
                card.style.position = 'relative';
            }
        });
    });

    // Expand Button and Easter Egg Logic
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            const card = button.closest('.card');
            const expandable = card.querySelector('.expandable');
            const easterEgg = card.querySelector('.easter-egg');
            if (expandable) {
                if (!expandable.classList.contains('show')) {
                    gsap.to(expandable, {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.5,
                        onStart: () => expandable.classList.add('show')
                    });
                    if (easterEgg) {
                        gsap.to(easterEgg, { opacity: 1, duration: 0.5, delay: 0.5 });
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                    if (card.classList.contains('easter-egg-flag')) {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            colors: ['#000000', '#FFFFFF', '#FF0000', '#008000'],
                            origin: { y: 0.6 }
                        });
                    }
                } else {
                    gsap.to(expandable, {
                        height: 0,
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => expandable.classList.remove('show')
                    });
                    if (easterEgg) {
                        gsap.to(easterEgg, { opacity: 0, duration: 0.5 });
                    }
                }
            }
            setTimeout(() => {
                window.open(button.href, '_blank');
            }, expandable ? 1000 : 0);
        });
    });

    // Parallax Scrolling
    window.addEventListener('scroll', () => {
        const parallax = document.querySelector('.parallax-bg');
        let scrollPosition = window.pageYOffset;
        parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});
