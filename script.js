// ========================================
// VIBE CODING LANDING PAGE - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initHeader();
    initMobileMenu();
    initFAQ();
    initTestimonialSlider();
    initScrollAnimations();
    initParticles();
    initSmoothScroll();
    initFormValidation();
});

// ========================================
// HEADER - Scroll Effect
// ========================================
function initHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================
function initTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonials__track');
    const cards = slider.querySelectorAll('.testimonials__card');
    const dots = slider.querySelectorAll('.testimonials__dot');
    const prevBtn = slider.querySelector('.testimonials__btn--prev');
    const nextBtn = slider.querySelector('.testimonials__btn--next');
    
    let currentIndex = 0;
    const totalSlides = cards.length;
    
    function updateSlider() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('testimonials__dot--active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateSlider();
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play
    let autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        }
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.problems__card, .solution__point, .features__card, ' +
        '.curriculum__item, .works__card, .instructors__card, ' +
        '.pricing__card, .faq__item'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// ========================================
// PARTICLE BACKGROUND
// ========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = [
        'rgba(255, 107, 107, 0.4)',   // Primary coral/red
        'rgba(255, 179, 71, 0.4)',    // Secondary orange
        'rgba(255, 154, 139, 0.4)',   // Accent peach
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 3}px;
        height: ${Math.random() * 8 + 3}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 15 + 10}s linear infinite;
        pointer-events: none;
        filter: blur(1px);
    `;
    container.appendChild(particle);
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ========================================
// FORM VALIDATION
// ========================================
function initFormValidation() {
    const form = document.getElementById('ctaForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showFormError(emailInput, '有効なメールアドレスを入力してください');
            return;
        }
        
        // Simulate form submission
        showFormSuccess(form);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(input, message) {
    // Remove existing error
    const existingError = input.parentNode.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Add error message
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    error.style.cssText = `
        display: block;
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    `;
    input.parentNode.appendChild(error);
    
    // Highlight input
    input.style.borderColor = '#EF4444';
    
    // Remove error on input
    input.addEventListener('input', () => {
        error.remove();
        input.style.borderColor = '';
    }, { once: true });
}

function showFormSuccess(form) {
    const formGroup = form.querySelector('.final-cta__form-group');
    
    formGroup.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 0.5rem;
            color: #22C55E;
            font-weight: 600;
        ">
            <span>✓</span>
            <span>お申し込みありがとうございます！確認メールをお送りしました。</span>
        </div>
    `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
