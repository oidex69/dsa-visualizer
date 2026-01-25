// ==================== HOMEPAGE ANIMATIONS ====================
// Using objects and models for code reusability and organization

(function() {
    'use strict';

    // ==================== RIPPLE EFFECT MODEL ====================
    const RippleEffect = {
        /**
         * Creates a ripple effect on click
         * @param {HTMLElement} element - Element to attach ripple to
         * @param {Object} options - Configuration options
         */
        create: function(element, options = {}) {
            const config = {
                color: options.color || 'rgba(255, 255, 255, 0.5)',
                duration: options.duration || 600,
                scale: options.scale || 2,
                ...options
            };

            element.addEventListener('click', function(e) {
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
                    background: ${config.color};
                    transform: scale(0);
                    animation: ripple-animation ${config.duration}ms ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                // Ensure parent has position relative
                const position = window.getComputedStyle(this).position;
                if (position === 'static') {
                    this.style.position = 'relative';
                }
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), config.duration);
            });
        }
    };

    // ==================== ANIMATION CONTROLLER ====================
    const AnimationController = {
        /**
         * Intersection Observer for scroll animations
         */
        observer: null,
        
        /**
         * Initialize intersection observer
         */
        initObserver: function() {
            const options = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            this.observer = new IntersectionObserver(function(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        AnimationController.observer.unobserve(entry.target);
                    }
                });
            }, options);
        },

        /**
         * Observe elements for animation
         * @param {NodeList|Array} elements - Elements to observe
         */
        observe: function(elements) {
            if (!this.observer) {
                this.initObserver();
            }

            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                this.observer.observe(element);
            });
        }
    };

    // ==================== DEMO BARS ANIMATION ====================
    const DemoBarsAnimation = {
        /**
         * Initialize animated demo bars
         */
        init: function() {
            const demoBars = document.querySelectorAll('.demo-bar');
            if (demoBars.length === 0) return;

            // Animate bars on load
            demoBars.forEach((bar, index) => {
                const height = bar.getAttribute('data-height') || bar.style.height;
                bar.style.height = '0%';
                
                setTimeout(() => {
                    bar.style.height = height + '%';
                }, index * 100);
            });

            // Continuous animation
            this.startContinuousAnimation();
        },

        /**
         * Start continuous bar animation
         */
        startContinuousAnimation: function() {
            const demoBars = document.querySelectorAll('.demo-bar');
            if (demoBars.length === 0) return;

            setInterval(() => {
                demoBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const currentHeight = parseInt(bar.style.height) || 0;
                        const heights = [30, 40, 50, 60, 75, 85, 90];
                        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
                        
                        if (Math.random() > 0.7) {
                            bar.style.height = randomHeight + '%';
                        }
                    }, index * 50);
                });
            }, 3000);
        }
    };

    // ==================== BUTTON ANIMATIONS ====================
    const ButtonAnimations = {
        /**
         * Initialize all button animations
         */
        init: function() {
            const heroButtons = document.querySelectorAll('.hero-btn');
            heroButtons.forEach(button => {
                RippleEffect.create(button, {
                    color: 'rgba(255, 255, 255, 0.4)',
                    duration: 600,
                    scale: 2
                });
            });
        }
    };

    // ==================== FEATURE CARDS ANIMATIONS ====================
    const FeatureCardsAnimation = {
        /**
         * Initialize feature cards animations
         */
        init: function() {
            const featureCards = document.querySelectorAll('.feature-card');
            if (featureCards.length === 0) return;

            AnimationController.observe(featureCards);

            // Add hover glow effect
            featureCards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const glow = card.querySelector('.feature-card::before') || 
                                 document.createElement('div');
                    glow.className = 'card-glow-effect';
                    glow.style.cssText = `
                        position: absolute;
                        top: ${y}px;
                        left: ${x}px;
                        width: 200px;
                        height: 200px;
                        background: radial-gradient(
                            circle,
                            rgba(99, 102, 241, 0.15) 0%,
                            transparent 70%
                        );
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        z-index: 0;
                    `;
                    
                    if (!card.querySelector('.card-glow-effect')) {
                        card.appendChild(glow);
                    }
                });

                card.addEventListener('mouseleave', function() {
                    const glow = card.querySelector('.card-glow-effect');
                    if (glow) {
                        glow.remove();
                    }
                });
            });
        }
    };

    // ==================== PROCESS STEPS ANIMATIONS ====================
    const ProcessStepsAnimation = {
        /**
         * Initialize process steps animations
         */
        init: function() {
            const processSteps = document.querySelectorAll('.process-step');
            if (processSteps.length === 0) return;

            AnimationController.observe(processSteps);

            // Add ripple effect to process button
            const processButton = document.querySelector('.process-button');
            if (processButton) {
                RippleEffect.create(processButton, {
                    color: 'rgba(255, 255, 255, 0.4)',
                    duration: 600,
                    scale: 2
                });
            }
        }
    };

    // ==================== SMOOTH SCROLL ====================
    const SmoothScroll = {
        /**
         * Initialize smooth scroll for anchor links
         */
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '#!') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ==================== PARALLAX EFFECT ====================
    const ParallaxEffect = {
        /**
         * Initialize parallax effect for hero section
         */
        init: function() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            let ticking = false;

            function updateParallax() {
                const scrolled = window.pageYOffset;
                const heroContent = heroSection.querySelector('.hero-content');
                const heroVisualization = heroSection.querySelector('.hero-visualization');
                
                if (scrolled < window.innerHeight) {
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                    }
                    
                    if (heroVisualization) {
                        heroVisualization.style.transform = `translateY(${scrolled * 0.2}px)`;
                    }
                }
                
                ticking = false;
            }

            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });
        }
    };

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', function() {
        // Add ripple animation styles
        if (!document.querySelector('style[data-homepage-ripple]')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.setAttribute('data-homepage-ripple', 'true');
            rippleStyle.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }

        // Initialize all animations
        ButtonAnimations.init();
        FeatureCardsAnimation.init();
        ProcessStepsAnimation.init();
        DemoBarsAnimation.init();
        SmoothScroll.init();
        ParallaxEffect.init();

        console.log('Homepage animations initialized successfully!');
    });

    // ==================== EXPORT FOR REUSABILITY ====================
    // Make objects available globally for reuse in other pages
    window.HomeAnimations = {
        RippleEffect: RippleEffect,
        AnimationController: AnimationController,
        DemoBarsAnimation: DemoBarsAnimation,
        ButtonAnimations: ButtonAnimations,
        FeatureCardsAnimation: FeatureCardsAnimation,
        ProcessStepsAnimation: ProcessStepsAnimation,
        SmoothScroll: SmoothScroll,
        ParallaxEffect: ParallaxEffect
    };

})();

