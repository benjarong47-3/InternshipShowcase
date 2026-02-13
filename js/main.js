// Ambassador Bilingual Academy - Main JS

document.addEventListener("DOMContentLoaded", () => {

    // Vanta.js Clouds
    if (typeof VANTA !== 'undefined' && VANTA.CLOUDS) {
        try {
            VANTA.CLOUDS({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                backgroundColor: 0xffffff,
                skyColor: 0x87CEEB,
                cloudColor: 0xD4E8F7,
                cloudShadowColor: 0x4682B4,
                sunColor: 0xFFD700,
                sunGlareColor: 0xFFA500,
                sunlightColor: 0xFFE5B4,
                speed: 1.2
            });
        } catch (e) {
            console.log('Vanta error:', e);
        }
    }

    // Language Toggle
    let lang = 'en';
    const langOpts = document.querySelectorAll('.lang-opt');

    function switchLang(newLang) {
        lang = newLang;

        document.querySelectorAll('[data-en][data-th]').forEach(el => {
            const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-th');
            if (text) el.textContent = text;
        });

        langOpts.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        try {
            localStorage.setItem('lang', lang);
        } catch (e) { }
    }

    langOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            switchLang(opt.getAttribute('data-lang'));
        });
    });

    try {
        const saved = localStorage.getItem('lang');
        if (saved) switchLang(saved);
    } catch (e) { }

    // Nav Active State
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop;
            if (scrollY >= (top - 200)) {
                current = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.v-box').forEach(box => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.lead-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.proj-box').forEach(box => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    // Form Submit
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We will contact you soon.');
            form.reset();
        });
    }

    console.log('%c🎓 Ambassador Bilingual Academy', 'color: #2563eb; font-size: 20px; font-weight: bold;');
});