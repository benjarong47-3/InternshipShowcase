// Ambassador Bilingual Academy - Enhanced Language Switching

// ============================================
// LANGUAGE MANAGEMENT
// ============================================
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function setLanguage(lang) {
    // Check if language is available in translations
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not available. Available languages: ${Object.keys(translations).join(', ')}`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    // Add transition class
    document.body.classList.add('language-transitioning');

    updatePageLanguage();
    updateLanguageButtons();

    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove('language-transitioning');
    }, 300);
}

function updatePageLanguage() {
    const t = translations[currentLanguage];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let text = t;

        // Navigate through nested object
        for (let k of keys) {
            text = text[k];
        }

        // Update element based on type
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            // Preserve line breaks for multi-line text
            if (text && text.includes('\n')) {
                el.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                el.textContent = text;
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // LANGUAGE SETUP
    // ============================================
    updatePageLanguage();
    updateLanguageButtons();

    // Add click handlers to all language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // ============================================
    // VANTA.JS CLOUDS BACKGROUND
    // ============================================
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
            console.log('Vanta.js error:', e);
        }
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL REVEAL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // FORM SUBMISSION
    // ============================================
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get button text based on current language
            const successText = currentLanguage === 'en' ? '✓ Message Sent!' : '✓ ส่งข้อความแล้ว!';
            const originalText = currentLanguage === 'en' ? 'Send Message' : 'ส่งข้อความ';

            // Show success message
            const btn = form.querySelector('button[type="submit"]');
            const btnOriginalText = btn.textContent;
            btn.textContent = successText;
            btn.classList.add('bg-green-600');

            // Reset after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-green-600');
                form.reset();
                updatePageLanguage(); // Refresh placeholders
            }, 3000);
        });
    }

    // ============================================
    // ADD STAGGER ANIMATION TO CARDS
    // ============================================
    const addStaggerAnimation = () => {
        const cardGroups = [
            document.querySelectorAll('#intro .scroll-reveal'),
            document.querySelectorAll('#contact .scroll-reveal')
        ];

        cardGroups.forEach(group => {
            group.forEach((card, index) => {
                card.style.transitionDelay = `${index * 100}ms`;
            });
        });
    };

    addStaggerAnimation();

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Alt + E for English
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            setLanguage('en');
        }
        // Alt + T for Thai
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            setLanguage('th');
        }
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================
    // Add aria-label to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        const label = lang === 'en' ? 'Switch to English' : 'สลับเป็นภาษาไทย';
        btn.setAttribute('aria-label', label);
    });

    // ============================================
    // CONSOLE GREETING
    // ============================================
    console.log('%c🎓 Ambassador Bilingual Academy', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%c✓ Enhanced Language Switching Loaded', 'color: #10b981; font-size: 14px;');
    console.log('%c💡 Tip: Press Alt+E for English, Alt+T for Thai', 'color: #6366f1; font-size: 12px;');
});

// ============================================
// PARALLAX EFFECT ON SCROLL (SUBTLE)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');

    parallaxElements.forEach(el => {
        const speed = 0.3;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});