// ==================== ALGORITHM CARDS ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== INTERSECTION OBSERVER FOR CARDS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all algorithm cards
    const algorithmCards = document.querySelectorAll('.algorithm-card');
    algorithmCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // ==================== CARD GLOW EFFECT ON MOUSE MOVE ====================
    algorithmCards.forEach(card => {
        const cardGlow = card.querySelector('.card-glow');
        
        if (cardGlow) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                cardGlow.style.background = `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(99, 102, 241, 0.15) 0%,
                    transparent 50%
                )`;
            });

            card.addEventListener('mouseleave', function() {
                cardGlow.style.background = `radial-gradient(
                    circle,
                    rgba(99, 102, 241, 0.1) 0%,
                    transparent 70%
                )`;
            });
        }
    });

    // ==================== SMOOTH SCROLL TO CATEGORY ====================
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        
        header.addEventListener('click', function() {
            const categorySection = this.closest('.algorithm-category');
            if (categorySection) {
                categorySection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // ==================== CARD BUTTON RIPPLE EFFECT ====================
    const cardButtons = document.querySelectorAll('.card-button');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes buttonRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-button-ripple]')) {
        rippleStyle.setAttribute('data-button-ripple', 'true');
        document.head.appendChild(rippleStyle);
    }

    // ==================== CATEGORY ICON ANIMATION ON SCROLL ====================
    const categoryIcons = document.querySelectorAll('.category-icon');
    
    const iconObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'iconFloat 3s ease-in-out infinite, iconRotate 0.6s ease';
            }
        });
    }, { threshold: 0.5 });

    categoryIcons.forEach(icon => {
        iconObserver.observe(icon);
    });

    // Add icon rotation animation
    const iconRotateStyle = document.createElement('style');
    iconRotateStyle.textContent = `
        @keyframes iconRotate {
            0% {
                transform: rotate(0deg) scale(0.8);
                opacity: 0;
            }
            50% {
                transform: rotate(180deg) scale(1.1);
            }
            100% {
                transform: rotate(360deg) scale(1);
                opacity: 1;
            }
        }
    `;
    if (!document.querySelector('style[data-icon-rotate]')) {
        iconRotateStyle.setAttribute('data-icon-rotate', 'true');
        document.head.appendChild(iconRotateStyle);
    }

    // ==================== HERO SECTION PARALLAX EFFECT ====================
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroSection.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // ==================== CARD LOADING STATE (Optional) ====================
    // Simulate loading when clicking visualize button
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = this.closest('.algorithm-card');
            if (card) {
                card.classList.add('loading');
                
                // Remove loading state after a short delay (visual feedback)
                setTimeout(() => {
                    card.classList.remove('loading');
                }, 300);
            }
        });
    });

    // ==================== KEYBOARD NAVIGATION ====================
    // Allow keyboard navigation through cards
    algorithmCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const button = this.querySelector('.card-button');
                if (button) {
                    button.click();
                }
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = algorithmCards[index + 1];
                if (nextCard) nextCard.focus();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = algorithmCards[index - 1];
                if (prevCard) prevCard.focus();
            }
        });
    });

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Throttle scroll events for better performance
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

    // Apply throttling to scroll events
    const throttledScroll = throttle(function() {
        // Any scroll-based animations go here
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    // ==================== ACCESSIBILITY IMPROVEMENTS ====================
    // Add ARIA labels to cards
    algorithmCards.forEach(card => {
        const title = card.querySelector('.card-title');
        if (title) {
            card.setAttribute('aria-label', `${title.textContent} - Click to visualize`);
        }
    });

    // ==================== DYNAMIC CATEGORY COUNT ====================
    // Show number of algorithms in each category
    const categories = document.querySelectorAll('.algorithm-category');
    categories.forEach(category => {
        const cards = category.querySelectorAll('.algorithm-card');
        const title = category.querySelector('.category-title');
        
        if (title && cards.length > 0) {
            const count = document.createElement('span');
            count.textContent = ` (${cards.length})`;
            count.style.cssText = `
                font-size: 0.9em;
                color: var(--text-muted, #94a3b8);
                font-weight: 400;
            `;
            title.appendChild(count);
        }
    });

    console.log('Algorithm cards initialized successfully!');
});