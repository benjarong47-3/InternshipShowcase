// ============================================
// AMBASSADOR BILINGUAL ACADEMY - app.js
// Version: Final Fix
// ============================================

let currentLang = 'en';
let translations = {};

// ============================================
// INIT - single DOMContentLoaded listener
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
    await loadTranslations();
    initVanta();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initNavbarEffects();
    initLanguageToggle();
    initWorkGallery();
    initStaggerAnimations();
    initKeyboardNav();
    setupModalCloseOnOutsideClick();

    console.log('%c🎓 ABA Ready', 'color:#2563eb;font-size:16px;font-weight:bold;');
});

// ============================================
// TRANSLATIONS
// ============================================
async function loadTranslations() {
    try {
        const res = await fetch('data/translations.json');
        if (!res.ok) throw new Error(res.status);
        translations = await res.json();
        console.log('✓ Translations loaded');

        const saved = localStorage.getItem('preferredLanguage');
        if (saved === 'th' || saved === 'en') {
            currentLang = saved;
            updateLanguage();
            updateLanguageButtons();
        }
    } catch (e) {
        console.error('❌ Translations error:', e);
    }
}

// ============================================
// VANTA BACKGROUND
// ============================================
function initVanta() {
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
                skyColor: 0x68b8d7,
                cloudColor: 0xadc1de,
                cloudShadowColor: 0x183550,
                sunColor: 0xff9919,
                sunGlareColor: 0xff6633,
                sunlightColor: 0xff9933,
                speed: 0.8
            });
            console.log('✓ Vanta initialized');
        } catch (e) { console.warn('⚠ Vanta error:', e); }
    }
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.add('hidden');
    });
    console.log('✓ Mobile menu initialized');
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    console.log('✓ Scroll reveal initialized');
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href === '#') { e.preventDefault(); return; }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
    console.log('✓ Smooth scroll initialized');
}

// ============================================
// NAVBAR
// ============================================
function initNavbarEffects() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('shadow-lg', window.pageYOffset > 100));
    console.log('✓ Navbar initialized');
}

// ============================================
// LANGUAGE TOGGLE
// ============================================
function initLanguageToggle() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage();
                updateLanguageButtons();
                try { localStorage.setItem('preferredLanguage', currentLang); } catch (e) { }
                console.log('✓ Language →', currentLang.toUpperCase());
            }
        });
    });
    console.log('✓ Language toggle initialized');
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
}

function updateLanguage() {
    if (!translations || !Object.keys(translations).length) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const val = getNestedValue(translations, el.getAttribute('data-i18n'), currentLang);
        if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-name]').forEach(el => {
        const val = getNestedValue(translations, el.getAttribute('data-i18n-name'), currentLang);
        if (currentLang === 'th' && val) {
            el.textContent = val;
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const val = getNestedValue(translations, el.getAttribute('data-i18n-placeholder'), currentLang);
        if (val) el.placeholder = val;
    });
}

function getNestedValue(obj, path, lang) {
    const val = path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
    if (val && typeof val === 'object' && (val.en !== undefined || val.th !== undefined)) {
        return val[lang] || val.en || '';
    }
    return val;
}

// ============================================
// WORK GALLERY - FIXED
// CSS does the animation. JS only controls hover pause.
// DO NOT set animationPlayState to 'paused' on init!
// ============================================
function initWorkGallery() {
    const track = document.querySelector('.gallery-track-enhanced');
    if (!track) {
        console.warn('⚠ Gallery track not found');
        return;
    }

    // ✅ Make sure animation is RUNNING (never set paused here)
    track.style.animationPlayState = 'running';

    // Hover to pause
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    const count = document.querySelectorAll('.gallery-card').length;
    console.log(`✓ Gallery initialized — ${count} cards, auto-scrolling`);
}

// ============================================
// STAGGER ANIMATIONS
// ============================================
function initStaggerAnimations() {
    ['#governance', '#team', '#responsibilities', '#projects'].forEach(sel => {
        document.querySelectorAll(`${sel} .scroll-reveal`).forEach((el, i) => {
            el.style.transitionDelay = `${i * 100}ms`;
        });
    });
    console.log('✓ Stagger animations initialized');
}

// ============================================
// PROJECT MODAL
// ============================================
const projectData = {
    project1: {
        title: { en: "Facility Management System", th: "ระบบจัดการสิ่งอำนวยความสะดวก" },
        description: {
            en: "A comprehensive web-based platform for managing school facilities, room bookings, and resource allocation.",
            th: "แพลตฟอร์มเว็บสำหรับจัดการสิ่งอำนวยความสะดวกของโรงเรียน การจองห้อง และการจัดสรรทรัพยากร"
        },
        features: {
            en: ["Real-time room availability checking", "Online booking system with calendar", "Resource management dashboard", "Automated notifications", "Google Sheets integration"],
            th: ["ตรวจสอบห้องว่างแบบเรียลไทม์", "ระบบจองออนไลน์พร้อมปฏิทิน", "แดชบอร์ดจัดการทรัพยากร", "การแจ้งเตือนอัตโนมัติ", "เชื่อมต่อกับ Google Sheets"]
        },
        tech: ["HTML5", "CSS3", "JavaScript", "Google Sheets API"]
    },
    project2: {
        title: { en: "HR × IT Integration System", th: "ระบบเชื่อมโยง HR × IT" },
        description: {
            en: "Integrated system connecting HR with IT through LINE Official Account for streamlined communication.",
            th: "ระบบบูรณาการที่เชื่อมโยง HR กับ IT ผ่าน LINE Official Account เพื่อการสื่อสารที่คล่องตัว"
        },
        features: {
            en: ["LINE OA integration", "Automated request routing", "IT ticket system", "Real-time updates", "Database synchronization"],
            th: ["เชื่อมต่อกับ LINE OA", "ระบบจัดส่งคำขออัตโนมัติ", "ระบบตั๋วงาน IT", "อัปเดตแบบเรียลไทม์", "ซิงค์ข้อมูลฐานข้อมูล"]
        },
        tech: ["JavaScript", "LINE API", "Node.js", "Webhook"]
    },
    project3: {
        title: { en: "IT Department Contact Portal", th: "ช่องทางติดต่อฝ่าย IT" },
        description: {
            en: "Centralized web portal for IT support requests and department coordination.",
            th: "พอร์ทัลเว็บแบบรวมศูนย์สำหรับคำขอสนับสนุน IT และการประสานงานของแผนก"
        },
        features: {
            en: ["Online ticket system", "Knowledge base & FAQs", "Request tracking", "Document repository", "Contact directory"],
            th: ["ระบบตั๋วงานออนไลน์", "ฐานความรู้และคำถามที่พบบ่อย", "ติดตามสถานะคำขอ", "คลังเอกสาร", "รายชื่อติดต่อ"]
        },
        tech: ["HTML/CSS", "JavaScript", "PHP", "MySQL"]
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    if (!project || !modal || !content) return;

    const featuresLabel = currentLang === 'en' ? 'Key Features' : 'คุณสมบัติหลัก';
    const techLabel = currentLang === 'en' ? 'Technologies' : 'เทคโนโลยีที่ใช้';

    const featuresList = project.features[currentLang].map(f => `
        <li class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-600">${f}</span>
        </li>`).join('');

    const techBadges = project.tech.map(t =>
        `<span class="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">${t}</span>`
    ).join('');

    content.innerHTML = `
        <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">${project.title[currentLang]}</h2>
        <p class="text-gray-600 text-lg leading-relaxed mb-8">${project.description[currentLang]}</p>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">${featuresLabel}</h3>
        <ul class="space-y-3 mb-8">${featuresList}</ul>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">${techLabel}</h3>
        <div class="flex flex-wrap gap-2">${techBadges}</div>`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// ============================================
// KEYBOARD NAV
// ============================================
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
    console.log('✓ Keyboard nav initialized');
}

function setupModalCloseOnOutsideClick() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target.id === 'projectModal') closeProjectModal();
    });
}

// ============================================
// GLOBAL EXPORTS
// ============================================
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// Error handling
window.addEventListener('error', (e) => console.error('❌', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('❌', e.reason));