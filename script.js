// =====================================================
// EASY PILLS - Caleb Raney Style Smooth Scroll
// With Lenis + GSAP + ScrollTrigger
// Complete Arabic Translation Support
// =====================================================

// Initialize Lucide Icons
lucide.createIcons();

// =====================================================
// LENIS SMOOTH SCROLL - Like Caleb Raney
// =====================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

// =====================================================
// SMOOTH SCROLL TO ANCHOR
// =====================================================
function smoothScrollTo(target, duration = 1.5) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const offset = 80;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    lenis.scrollTo(targetPosition, {
        duration: duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
}

// =====================================================
// PARALLAX EFFECTS - Caleb Raney Style
// =====================================================
function initParallax() {
    // Background circles parallax
    gsap.utils.toArray('.bg-circle').forEach((circle, i) => {
        const speed = (i + 1) * 0.1;
        gsap.to(circle, {
            yPercent: -20 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });
    });

    // Hero circles parallax
    gsap.utils.toArray('.hero-circle').forEach((circle, i) => {
        const speed = (i + 1) * 0.15;
        gsap.to(circle, {
            yPercent: 30 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// =====================================================
// LANGUAGE TOGGLE - Complete Arabic Translation
// =====================================================
let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const html = document.documentElement;

// Arabic translations for hero title
const heroTitleEn = `
    <span class="hero-title-line">
        <span class="hero-word" data-text="Easy Pills">Easy Pills</span>
        <span class="hero-word italic" data-text="is a">is a</span>
    </span>
    <span class="hero-title-line">
        <span class="hero-word italic" data-text="smart">smart</span>
        <span class="hero-word" data-text="medication">medication</span>
    </span>
    <span class="hero-title-line">
        <span class="hero-word" data-text="adherence system">adherence system</span>
    </span>
`;

const heroTitleAr = `
    <span class="hero-title-line">
        <span class="hero-word" data-text="إيزي بيلز">إيزي بيلز</span>
        <span class="hero-word italic" data-text="هو">هو</span>
    </span>
    <span class="hero-title-line">
        <span class="hero-word italic" data-text="نظام">نظام</span>
        <span class="hero-word" data-text="ذكي">ذكي</span>
    </span>
    <span class="hero-title-line">
        <span class="hero-word" data-text="للالتزام بالأدوية">للالتزام بالأدوية</span>
    </span>
`;

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', currentLang);
    
    if (langText) {
        langText.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    }
    
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            // Check if the element has HTML structure we need to preserve
            if (el.classList.contains('mission-title') || 
                el.classList.contains('section-title-large') || 
                el.classList.contains('contact-title')) {
                // Check for italic span
                const italicSpan = el.querySelector('.italic');
                if (italicSpan) {
                    const words = text.split(' ');
                    const lastWord = words.pop();
                    const firstPart = words.join(' ');
                    el.innerHTML = `${firstPart} <span class="italic">${lastWord}</span>`;
                } else {
                    el.textContent = text;
                }
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(el => {
        const placeholder = el.getAttribute(`data-placeholder-${currentLang}`);
        if (placeholder) {
            el.placeholder = placeholder;
        }
    });
    
    // Update hero title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = currentLang === 'ar' ? heroTitleAr : heroTitleEn;
        // Re-animate hero words
        gsap.fromTo('.hero-word', 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out'
            }
        );
    }
    
    // Refresh ScrollTrigger for RTL changes
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
}

if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
}

if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', toggleLanguage);
}

// =====================================================
// PRELOADER ANIMATION
// =====================================================
const preloader = document.getElementById('preloader');
const preloaderTexts = document.querySelectorAll('.preloader-text');
const preloaderLine = document.querySelector('.preloader-line');
const preloaderLineAfter = document.createElement('div');
preloaderLineAfter.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:var(--color-accent);transform:translateX(-100%)';
if (preloaderLine) preloaderLine.appendChild(preloaderLineAfter);

const preloaderTl = gsap.timeline({
    onComplete: () => {
        if (preloader) {
            preloader.style.display = 'none';
        }
        initPageAnimations();
        initTeamBarsAnimation();
        initParallax();
    }
});

preloaderTl
    .to(preloaderTexts, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    })
    .to(preloaderLineAfter, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut'
    }, '-=0.4')
    .to(preloaderTexts, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.in'
    }, '+=0.3')
    .to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
    }, '-=0.3');

// =====================================================
// CUSTOM CURSOR - Desktop Only
// =====================================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, [data-magnetic]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('is-hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('is-hovering');
        });
    });
}

// =====================================================
// NAVIGATION
// =====================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
let isMenuOpen = false;
let lastScrollY = 0;

// Scroll effect on nav
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        const currentScrollY = self.scroll();
        
        if (self.direction === 1 && currentScrollY > 200) {
            nav.classList.add('is-hidden');
        } else {
            nav.classList.remove('is-hidden');
        }
        
        if (currentScrollY > 80) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
});

// Mobile menu toggle
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('is-active', isMenuOpen);
        mobileMenu.classList.toggle('is-open', isMenuOpen);
        
        if (isMenuOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });
}

// Close menu on link click
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        isMenuOpen = false;
        if (navToggle) navToggle.classList.remove('is-active');
        if (mobileMenu) mobileMenu.classList.remove('is-open');
        lenis.start();
        
        setTimeout(() => {
            smoothScrollTo(target, 1.5);
        }, 300);
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = anchor.getAttribute('href');
        if (target !== '#') {
            smoothScrollTo(target, 1.5);
        }
    });
});

// =====================================================
// MAGNETIC EFFECT - Desktop Only
// =====================================================
if (window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// =====================================================
// REVEAL ANIMATIONS - Caleb Raney Style
// =====================================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    revealElements.forEach((el, i) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: i % 3 * 0.1,
                    ease: 'power3.out'
                });
                el.classList.add('is-visible');
            }
        });
    });
}

// =====================================================
// TEAM BARS ANIMATION
// =====================================================
function initTeamBarsAnimation() {
    const teamBars = document.querySelectorAll('.team-bar');
    
    if (teamBars.length > 0) {
        ScrollTrigger.create({
            trigger: '.team-bars-container',
            start: 'top 75%',
            once: true,
            onEnter: () => {
                teamBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('is-visible');
                    }, index * 200);
                });
            }
        });
    }
}

// =====================================================
// PAGE ANIMATIONS
// =====================================================
function initPageAnimations() {
    // Hero animations
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    heroTl
        .to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.hero-word', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-scroll', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4');

    // Initialize reveal animations
    initRevealAnimations();
}

// =====================================================
// TECH CARD MODAL
// =====================================================
const techCards = document.querySelectorAll('[data-tech-card]');
const techModalOverlay = document.getElementById('tech-modal-overlay');
const techModal = document.getElementById('tech-modal');
const techModalClose = document.getElementById('tech-modal-close');
const techModalIcon = document.getElementById('tech-modal-icon');
const techModalTitle = document.getElementById('tech-modal-title');
const techModalText = document.getElementById('tech-modal-text');
const techModalDetail = document.getElementById('tech-modal-detail');

let activeCard = null;

function openTechModal(card) {
    activeCard = card;
    lenis.stop();
    
    const icon = card.querySelector('.tech-card-icon').innerHTML;
    const titleEl = card.querySelector('.tech-card-title');
    const textEl = card.querySelector('.tech-card-text');
    const detailEl = card.querySelector('.tech-card-detail');
    
    // Get text based on current language
    const title = titleEl.getAttribute(`data-${currentLang}`) || titleEl.textContent;
    const text = textEl.getAttribute(`data-${currentLang}`) || textEl.textContent;
    const detailText = detailEl ? (detailEl.getAttribute(`data-${currentLang}`) || detailEl.textContent) : '';
    
    techModalIcon.innerHTML = icon;
    techModalTitle.textContent = title;
    techModalText.textContent = text;
    techModalDetail.textContent = detailText;
    
    const cardRect = card.getBoundingClientRect();
    
    gsap.set(techModal, {
        top: cardRect.top,
        left: cardRect.left,
        width: cardRect.width,
        height: cardRect.height,
        borderRadius: '20px',
        opacity: 0
    });
    
    techModalOverlay.classList.add('is-open');
    
    gsap.to(techModal, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: 'min(600px, 90vw)',
        height: 'auto',
        borderRadius: '28px',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    gsap.fromTo('.tech-modal-content', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: 'power2.out' }
    );
    
    gsap.to(card, {
        scale: 0.95,
        opacity: 0.5,
        duration: 0.4,
        ease: 'power2.out'
    });
}

function closeTechModal() {
    if (!activeCard) return;
    
    const cardRect = activeCard.getBoundingClientRect();
    
    gsap.to('.tech-modal-content', {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in'
    });
    
    gsap.to(techModal, {
        top: cardRect.top,
        left: cardRect.left,
        xPercent: 0,
        yPercent: 0,
        width: cardRect.width,
        height: cardRect.height,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
            techModalOverlay.classList.remove('is-open');
            gsap.set(techModal, { clearProps: 'all' });
            lenis.start();
        }
    });
    
    gsap.to(activeCard, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
    });
    
    activeCard = null;
}

techCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openTechModal(card));
});

if (techModalClose) {
    techModalClose.addEventListener('click', closeTechModal);
}

if (techModalOverlay) {
    techModalOverlay.addEventListener('click', (e) => {
        if (e.target === techModalOverlay) {
            closeTechModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && techModalOverlay && techModalOverlay.classList.contains('is-open')) {
        closeTechModal();
    }
});

// =====================================================
// HOVER EFFECTS FOR CARDS - Desktop Only
// =====================================================
if (window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) {
    techCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
}

// =====================================================
// CONTACT FORM HANDLING
// =====================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('span[data-en]');
        const originalText = btnText ? btnText.textContent : 'Send Message';
        const successText = currentLang === 'ar' ? 'تم الإرسال! ✓' : 'Message Sent! ✓';
        
        if (btnText) {
            btnText.textContent = successText;
        }
        btn.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            if (btnText) {
                btnText.textContent = currentLang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
            }
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// =====================================================
// REFRESH SCROLL TRIGGER ON RESIZE
// =====================================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// =====================================================
// 3D MODEL VIEWER - Professional Grade Implementation
// Advanced Controls, Materials & Lighting System
// =====================================================

class EasyPills3DViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.loadingEl = document.getElementById('model-loading');
        this.resetBtn = document.getElementById('reset-view');
        this.autoRotateBtn = document.getElementById('auto-rotate-toggle');
        
        if (!this.container) return;
        
        // Core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.clock = new THREE.Clock();
        
        // Animation state
        this.isAutoRotating = false;
        this.targetRotationY = 0;
        this.currentRotationY = 0;
        this.rotationVelocity = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        
        // Camera animation state
        this.cameraAnimating = false;
        this.cameraStartPos = null;
        this.cameraEndPos = null;
        this.cameraProgress = 0;
        
        // Touch handling
        this.touchStartDistance = 0;
        this.initialPinchDistance = 0;
        this.lastTouchTime = 0;
        
        // Initial positions for reset
        this.initialCameraPosition = new THREE.Vector3(0, 12, 35);
        this.initialControlsTarget = new THREE.Vector3(0, 0, 0);
        
        // Material presets
        this.materialPresets = {
            metallic: {
                color: 0xE8DDD4,
                metalness: 0.85,
                roughness: 0.15,
                envMapIntensity: 1.2
            },
            matte: {
                color: 0xF5EDE6,
                metalness: 0.1,
                roughness: 0.8,
                envMapIntensity: 0.3
            },
            plastic: {
                color: 0xFAF7F2,
                metalness: 0.0,
                roughness: 0.4,
                envMapIntensity: 0.5
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupRenderer();  // Must be first for PMREMGenerator
        this.setupScene();
        this.setupCamera();
        this.setupLighting();
        this.setupControls();
        this.setupEventListeners();
        this.loadModel();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        
        // Subtle gradient background using fog
        this.scene.fog = new THREE.Fog(0xFAF7F2, 80, 150);
    }
    
    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 500);
        this.camera.position.copy(this.initialCameraPosition);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.physicallyCorrectLights = true;
        
        this.container.appendChild(this.renderer.domElement);
    }
    
    setupLighting() {
        // Ambient light - soft fill
        const ambientLight = new THREE.AmbientLight(0xFAF7F2, 0.4);
        this.scene.add(ambientLight);
        
        // Main key light - warm white from top-right
        const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
        keyLight.position.set(15, 25, 20);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 100;
        keyLight.shadow.camera.left = -30;
        keyLight.shadow.camera.right = 30;
        keyLight.shadow.camera.top = 30;
        keyLight.shadow.camera.bottom = -30;
        keyLight.shadow.bias = -0.0001;
        keyLight.shadow.radius = 4;
        this.scene.add(keyLight);
        
        // Fill light - cooler tone from left
        const fillLight = new THREE.DirectionalLight(0xB4C7E7, 0.6);
        fillLight.position.set(-20, 10, -10);
        this.scene.add(fillLight);
        
        // Accent light - terracotta warmth from back
        const accentLight = new THREE.DirectionalLight(0xC17F59, 0.5);
        accentLight.position.set(-5, 15, -25);
        this.scene.add(accentLight);
        
        // Rim light - subtle highlight from behind
        const rimLight = new THREE.DirectionalLight(0xFFE4D6, 0.4);
        rimLight.position.set(0, 5, -30);
        this.scene.add(rimLight);
        
        // Ground bounce light
        const bounceLight = new THREE.DirectionalLight(0xEDE8DE, 0.3);
        bounceLight.position.set(0, -20, 10);
        this.scene.add(bounceLight);
        
        // Hemisphere light for natural sky/ground gradient
        const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xC17F59, 0.3);
        hemiLight.position.set(0, 50, 0);
        this.scene.add(hemiLight);
        
        // Subtle point lights for sparkle
        const sparkleLight1 = new THREE.PointLight(0xFFFFFF, 0.3, 50);
        sparkleLight1.position.set(10, 20, 15);
        this.scene.add(sparkleLight1);
        
        const sparkleLight2 = new THREE.PointLight(0xC17F59, 0.2, 40);
        sparkleLight2.position.set(-15, 10, 10);
        this.scene.add(sparkleLight2);
    }
    
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
        // Professional damping for smooth movement
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        
        // Rotation settings
        this.controls.rotateSpeed = 0.5;
        this.controls.enableRotate = true;
        
        // Pan settings
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.5;
        this.controls.screenSpacePanning = true;
        
        // Zoom settings
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 0.8;
        this.controls.minDistance = 15;
        this.controls.maxDistance = 80;
        
        // No angle constraints - infinite 360° rotation in any direction
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minAzimuthAngle = -Infinity;
        this.controls.maxAzimuthAngle = Infinity;
        
        // Auto rotate (off by default)
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 1.5;
        
        // Set initial target
        this.controls.target.copy(this.initialControlsTarget);
        this.controls.update();
    }
    
    setupEventListeners() {
        // Reset button
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetView());
        }
        
        // Auto rotate toggle
        if (this.autoRotateBtn) {
            this.autoRotateBtn.addEventListener('click', () => this.toggleAutoRotate());
        }
        
        // Window resize
        window.addEventListener('resize', () => this.onResize());
        
        // Prevent scroll interference
        this.container.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: false });
        
        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.container.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: false });
        
        // Double-click to reset view
        this.container.addEventListener('dblclick', () => this.resetView());
        
        // Double-tap for mobile
        this.container.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTouchTime;
            if (tapLength < 300 && tapLength > 0) {
                this.resetView();
            }
            this.lastTouchTime = currentTime;
        });
        
        // Track interaction state
        this.controls.addEventListener('start', () => {
            this.isDragging = true;
            this.container.style.cursor = 'grabbing';
        });
        
        this.controls.addEventListener('end', () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        });
    }
    
    createMaterial() {
        // Premium material with subtle iridescence effect
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xF5EDE6,
            metalness: 0.15,
            roughness: 0.35,
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
            reflectivity: 0.5,
            envMapIntensity: 0.8,
            transparent: false,
            side: THREE.DoubleSide
        });
        
        return material;
    }
    
    createAccentMaterial() {
        // Terracotta accent material for highlights
        return new THREE.MeshPhysicalMaterial({
            color: 0xC17F59,
            metalness: 0.3,
            roughness: 0.4,
            clearcoat: 0.2,
            clearcoatRoughness: 0.3,
            envMapIntensity: 0.6
        });
    }
    
    loadModel() {
        const objLoader = new THREE.OBJLoader();
        const mtlLoader = new THREE.MTLLoader();
        
        // Set paths for both loaders
        const modelPath = './';
        mtlLoader.setPath(modelPath);
        objLoader.setPath(modelPath);
        
        // Try MTL first - the OBJ file references "3D_model.mtl"
        mtlLoader.load(
            '3D_model.mtl',
            (materials) => {
                // MTL loaded successfully
                materials.preload();
                objLoader.setMaterials(materials);
                this.loadOBJ(objLoader);
            },
            undefined,
            (error) => {
                // MTL not found, load OBJ with custom materials (this is expected)
                console.log('MTL file not found, using custom materials instead');
                this.loadOBJ(objLoader);
            }
        );
    }
    
    loadOBJ(loader) {
        // Load the OBJ file - try with and without leading ./
        const objPath = './3D_model.obj';
        
        loader.load(
            objPath,
            (object) => {
                // Successfully loaded
                this.onModelLoaded(object);
            },
            (xhr) => {
                // Progress callback
                this.onLoadProgress(xhr);
            },
            (error) => {
                // Error loading OBJ - try alternative path
                console.warn(`Failed to load ${objPath}, trying alternative path...`);
                loader.load(
                    '3D_model.obj',
                    (object) => this.onModelLoaded(object),
                    (xhr) => this.onLoadProgress(xhr),
                    (error) => {
                        // Both paths failed
                        console.error('Failed to load OBJ from both paths:', error);
                        this.onLoadError(error || new Error('Could not load 3D_model.obj'));
                    }
                );
            }
        );
    }
    
    onModelLoaded(object) {
        this.model = object;
        
        // Calculate bounding box and center
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the model
        object.position.sub(center);
        
        // Scale to fit view nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 18 / maxDim;
        object.scale.multiplyScalar(scale);
        
        // Create premium materials
        const mainMaterial = this.createMaterial();
        const accentMaterial = this.createAccentMaterial();
        
        // Apply materials with variety
        let meshIndex = 0;
        object.traverse((child) => {
            if (child.isMesh) {
                // Alternate materials for visual interest
                if (meshIndex % 3 === 0) {
                    child.material = accentMaterial.clone();
                } else {
                    child.material = mainMaterial.clone();
                }
                
                // Enable shadows
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Compute normals for proper lighting
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }
                
                meshIndex++;
            }
        });
        
        // Add to scene
        this.scene.add(object);
        
        // Add subtle ground plane for shadow reception
        this.addGroundPlane();
        
        // Hide loading indicator with fade
        if (this.loadingEl) {
            gsap.to(this.loadingEl, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    this.loadingEl.classList.add('hidden');
                }
            });
        }
        
        // Animate model entrance
        object.scale.set(0, 0, 0);
        gsap.to(object.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        });
        
        // Update controls
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    addGroundPlane() {
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.ShadowMaterial({
            opacity: 0.15
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -10;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    onLoadProgress(xhr) {
        if (xhr.total > 0) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            console.log(`Loading model: ${percent}%`);
            
            if (this.loadingEl) {
                const loadingText = this.loadingEl.querySelector('span');
                if (loadingText) {
                    loadingText.textContent = `Loading 3D Model... ${percent}%`;
                }
            }
        }
    }
    
    onLoadError(error) {
        console.error('Error loading model:', error);
        
        // Check if running from file:// protocol (common CORS issue)
        const isFileProtocol = window.location.protocol === 'file:';
        let errorMessage = 'Unable to load 3D model';
        
        if (isFileProtocol) {
            errorMessage += '<br><small style="opacity: 0.7; font-size: 0.85em;">Please use a local server (e.g., Live Server in VS Code)</small>';
            console.warn('Running from file:// protocol. CORS restrictions may prevent loading 3D files. Use a local server instead.');
        } else if (error && error.message) {
            errorMessage += `<br><small style="opacity: 0.7; font-size: 0.85em;">${error.message}</small>`;
        }
        
        if (this.loadingEl) {
            this.loadingEl.innerHTML = `
                <span style="color: var(--color-accent);">
                    ${errorMessage}
                </span>
            `;
        }
    }
    
    resetView() {
        if (this.cameraAnimating) return;
        this.cameraAnimating = true;
        
        // Smooth camera animation using GSAP
        const duration = 1.2;
        
        gsap.to(this.camera.position, {
            x: this.initialCameraPosition.x,
            y: this.initialCameraPosition.y,
            z: this.initialCameraPosition.z,
            duration: duration,
            ease: 'power3.inOut',
            onUpdate: () => this.controls.update(),
            onComplete: () => {
                this.cameraAnimating = false;
            }
        });
        
        gsap.to(this.controls.target, {
            x: this.initialControlsTarget.x,
            y: this.initialControlsTarget.y,
            z: this.initialControlsTarget.z,
            duration: duration,
            ease: 'power3.inOut'
        });
        
        // Reset model rotation if it exists
        if (this.model) {
            gsap.to(this.model.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: duration,
                ease: 'power3.inOut'
            });
        }
    }
    
    toggleAutoRotate() {
        this.controls.autoRotate = !this.controls.autoRotate;
        
        if (this.autoRotateBtn) {
            this.autoRotateBtn.classList.toggle('active', this.controls.autoRotate);
            
            // Visual feedback animation
            gsap.fromTo(this.autoRotateBtn, 
                { scale: 0.95 },
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );
        }
    }
    
    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        // Update controls with damping
        this.controls.update();
        
        // Subtle model hover animation when idle
        if (this.model && !this.isDragging && !this.controls.autoRotate) {
            const time = this.clock.getElapsedTime();
            this.model.position.y = Math.sin(time * 0.5) * 0.15;
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize viewer
function init3DModelViewer() {
    new EasyPills3DViewer('model-viewer');
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        init3DModelViewer();
        lucide.createIcons();
    }, 100);
});
