// ============================================
// AMBASSADOR BILINGUAL ACADEMY
// Complete Fixed Application JavaScript
// Version 2.0 - All Bugs Fixed
// ============================================

// Global State
let currentLang = 'en';
let translations = {};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
    // Load translations first
    await loadTranslations();

    // Initialize all modules
    initVanta();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initNavbarEffects();
    initLanguageToggle();
    initFormHandling();
    initStaggerAnimations();
    initKeyboardNav();

    console.log('%c🎓 Ambassador Bilingual Academy', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%c✓ All Systems Ready', 'color: #10b981; font-size: 14px;');
});

// ============================================
// LOAD TRANSLATIONS - FIXED
// ============================================

async function loadTranslations() {
    try {
        const response = await fetch('data/translations.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        translations = await response.json();
        console.log('✓ Translations loaded successfully');

        // Apply saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'th' || savedLang === 'en')) {
            currentLang = savedLang;
            updateLanguage();
            updateLanguageButtons();
        }

    } catch (error) {
        console.error('❌ Error loading translations:', error);
        // Fallback to English if translations fail to load
        currentLang = 'en';
    }
}

// ============================================
// VANTA.JS BACKGROUND
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
                skyColor: 0x87CEEB,
                cloudColor: 0xD4E8F7,
                cloudShadowColor: 0x4682B4,
                sunColor: 0xFFD700,
                sunGlareColor: 0xFFA500,
                sunlightColor: 0xFFE5B4,
                speed: 1.2
            });
            console.log('✓ Vanta.js clouds initialized');
        } catch (e) {
            console.error('⚠ Vanta.js error:', e);
        }
    } else {
        console.warn('⚠ Vanta.js not loaded - hero background will be static');
    }
}

// ============================================
// MOBILE MENU - FIXED
// ============================================

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        // Toggle menu
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });

        console.log('✓ Mobile menu initialized');
    } else {
        console.warn('⚠ Mobile menu elements not found');
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    console.log('✓ Scroll reveal initialized');
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✓ Smooth scroll initialized');
}

// ============================================
// NAVBAR EFFECTS
// ============================================

function initNavbarEffects() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });

    console.log('✓ Navbar effects initialized');
}

// ============================================
// LANGUAGE TOGGLE - COMPLETELY FIXED
// ============================================

function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.getAttribute('data-lang');

            if (newLang !== currentLang) {
                currentLang = newLang;
                updateLanguage();
                updateLanguageButtons();

                // Save preference
                try {
                    localStorage.setItem('preferredLanguage', currentLang);
                    console.log(`✓ Language changed to: ${currentLang.toUpperCase()}`);
                } catch (e) {
                    console.warn('⚠ Could not save language preference');
                }
            }
        });
    });

    console.log('✓ Language toggle initialized');
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateLanguage() {
    if (!translations || Object.keys(translations).length === 0) {
        console.warn('⚠ Translations not loaded yet');
        return;
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key, currentLang);

        if (value) {
            el.textContent = value;
        } else {
            console.warn(`⚠ Missing translation for key: ${key}`);
        }
    });

    // Update Thai names - FIXED LOGIC
    document.querySelectorAll('[data-i18n-name]').forEach(el => {
        const key = el.getAttribute('data-i18n-name');
        const value = getNestedValue(translations, key, currentLang);

        if (currentLang === 'th' && value) {
            // Show Thai name when language is Thai
            el.textContent = value;
            el.style.display = 'block';
        } else if (currentLang === 'en') {
            // Hide Thai name when language is English
            el.style.display = 'none';
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getNestedValue(translations, key, currentLang);

        if (value) {
            el.placeholder = value;
        }
    });

    console.log(`✓ Language updated to: ${currentLang.toUpperCase()}`);
}

// Helper function to get nested object value
function getNestedValue(obj, path, lang) {
    const keys = path.split('.');
    let result = obj;

    for (let key of keys) {
        if (result[key] === undefined) {
            return null;
        }
        result = result[key];
    }

    // If result is an object with language keys, return the appropriate language
    if (result && typeof result === 'object' && (result.en || result.th)) {
        return result[lang] || result.en || '';
    }

    return result;
}

// ============================================
// FORM HANDLING - ENHANCED
// ============================================

function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Get translated messages
            const sendingText = currentLang === 'en' ? 'Sending...' : 'กำลังส่ง...';
            const successText = currentLang === 'en' ? '✓ Message Sent!' : '✓ ส่งข้อความแล้ว!';

            // Show sending state
            btn.textContent = sendingText;
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate sending (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success
            btn.textContent = successText;
            btn.classList.remove('opacity-75', 'cursor-not-allowed');
            btn.classList.add('bg-green-600');

            // Reset after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
                form.reset();
            }, 3000);
        });
    });

    console.log('✓ Form handling initialized');
}

// ============================================
// STAGGER ANIMATIONS
// ============================================

function initStaggerAnimations() {
    const groups = [
        document.querySelectorAll('#governance .scroll-reveal'),
        document.querySelectorAll('#team .scroll-reveal'),
        document.querySelectorAll('#responsibilities .scroll-reveal'),
        document.querySelectorAll('#projects .scroll-reveal')
    ];

    groups.forEach(group => {
        group.forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
        });
    });

    console.log('✓ Stagger animations initialized');
}

// ============================================
// GALLERY MODAL - ENHANCED
// ============================================

let currentImageIndex = 0;
const galleryImages = [
    'https://via.placeholder.com/800x600/667eea/ffffff?text=Activity+1',
    'https://via.placeholder.com/800x600/2563eb/ffffff?text=Activity+2',
    'https://via.placeholder.com/800x600/7c3aed/ffffff?text=Activity+3',
    'https://via.placeholder.com/800x600/10b981/ffffff?text=Activity+4',
    'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Activity+5',
    'https://via.placeholder.com/800x600/ef4444/ffffff?text=Activity+6'
];

function openGallery(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const img = document.getElementById('galleryImage');

    if (!modal || !img) return;

    img.src = galleryImages[index];
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Add fade in animation
    setTimeout(() => {
        img.style.opacity = '1';
    }, 50);
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    const img = document.getElementById('galleryImage');
    if (!img) return;

    // Fade out
    img.style.opacity = '0.3';
    img.style.transform = 'scale(0.95)';

    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        // Fade in
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 200);
}

// ============================================
// PROJECT MODAL - ENHANCED WITH ANIMATIONS
// ============================================

const projectData = {
    project1: {
        title: {
            en: "Facility Management System",
            th: "ระบบจัดการสิ่งอำนวยความสะดวก"
        },
        description: {
            en: "A comprehensive web-based platform for managing school facilities, room bookings, and resource allocation.",
            th: "แพลตฟอร์มเว็บที่ครอบคลุมสำหรับจัดการสิ่งอำนวยความสะดวกของโรงเรียน การจองห้อง และการจัดสรรทรัพยากร"
        },
        features: {
            en: [
                "Real-time room availability checking",
                "Online booking system with calendar",
                "Resource management dashboard",
                "Automated notifications",
                "Google Sheets integration"
            ],
            th: [
                "ตรวจสอบห้องว่างแบบเรียลไทม์",
                "ระบบจองออนไลน์พร้อมปฏิทิน",
                "แดชบอร์ดจัดการทรัพยากร",
                "การแจ้งเตือนอัตโนมัติ",
                "เชื่อมต่อกับ Google Sheets"
            ]
        },
        tech: ["HTML5", "CSS3", "JavaScript", "Google Sheets API"]
    },
    project2: {
        title: {
            en: "HR × IT Integration System",
            th: "ระบบเชื่อมโยง HR × IT"
        },
        description: {
            en: "Integrated system connecting HR with IT through LINE Official Account for streamlined communication.",
            th: "ระบบบูรณาการที่เชื่อมโยง HR กับ IT ผ่าน LINE Official Account เพื่อการสื่อสารที่คล่องตัว"
        },
        features: {
            en: [
                "LINE OA integration",
                "Automated request routing",
                "IT ticket system",
                "Real-time updates",
                "Database synchronization"
            ],
            th: [
                "เชื่อมต่อกับ LINE Official Account",
                "ระบบจัดส่งคำขออัตโนมัติ",
                "ระบบตั๋วงาน IT",
                "อัปเดตแบบเรียลไทม์",
                "ซิงค์ข้อมูลฐานข้อมูล"
            ]
        },
        tech: ["JavaScript", "LINE API", "Node.js", "Webhook"]
    },
    project3: {
        title: {
            en: "IT Department Contact Portal",
            th: "ช่องทางติดต่อฝ่าย IT"
        },
        description: {
            en: "Centralized web portal for IT support requests and department coordination.",
            th: "พอร์ทัลเว็บแบบรวมศูนย์สำหรับคำขอสนับสนุน IT และการประสานงานของแผนก"
        },
        features: {
            en: [
                "Online ticket system",
                "Knowledge base & FAQs",
                "Request tracking",
                "Document repository",
                "Contact directory"
            ],
            th: [
                "ระบบตั๋วงานออนไลน์",
                "ฐานความรู้และคำถามที่พบบ่อย",
                "ติดตามสถานะคำขอ",
                "คลังเอกสาร",
                "รายชื่อติดต่อ"
            ]
        },
        tech: ["HTML/CSS", "JavaScript", "PHP", "MySQL"]
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) {
        console.warn(`⚠ Project ${projectId} not found`);
        return;
    }

    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');

    if (!modal || !content) return;

    // Get current language text
    const title = project.title[currentLang];
    const description = project.description[currentLang];
    const features = project.features[currentLang];

    const keyFeaturesLabel = currentLang === 'en' ? 'Key Features' : 'คุณสมบัติหลัก';
    const technologiesLabel = currentLang === 'en' ? 'Technologies' : 'เทคโนโลยีที่ใช้';

    // Build features list
    const featuresList = features.map(f => `
        <li class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-gray-600">${f}</span>
        </li>
    `).join('');

    // Build tech badges
    const techBadges = project.tech.map(t => `
        <span class="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">${t}</span>
    `).join('');

    content.innerHTML = `
        <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">${title}</h2>
        <p class="text-gray-600 text-lg leading-relaxed mb-8">${description}</p>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">${keyFeaturesLabel}</h3>
        <ul class="space-y-3 mb-8">${featuresList}</ul>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-4">${technologiesLabel}</h3>
        <div class="flex flex-wrap gap-2">${techBadges}</div>
    `;

    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
        content.classList.add('show');
    }, 10);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');

    if (!modal || !content) return;

    // Fade out animation
    modal.classList.remove('show');
    content.classList.remove('show');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        const galleryModal = document.getElementById('galleryModal');
        const projectModal = document.getElementById('projectModal');

        // Gallery modal controls
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }

        // Project modal controls
        if (projectModal && !projectModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeProjectModal();
            }
        }
    });

    console.log('✓ Keyboard navigation initialized');
}

// ============================================
// CLICK OUTSIDE TO CLOSE MODALS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Gallery modal
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target.id === 'galleryModal') {
                closeGallery();
            }
        });
    }

    // Project modal
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') {
                closeProjectModal();
            }
        });
    }
});

// ============================================
// MAKE FUNCTIONS GLOBAL FOR ONCLICK HANDLERS
// ============================================

window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.changeImage = changeImage;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('❌ Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled promise rejection:', e.reason);
});

// ============================================
// PERFORMANCE MONITORING (Optional)
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

