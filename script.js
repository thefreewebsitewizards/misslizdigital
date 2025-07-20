// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Create overlay element for click-outside functionality
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
navOverlay.id = 'nav-overlay';
document.body.appendChild(navOverlay);

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
});

// Close mobile menu when clicking on overlay (outside menu)
navOverlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
    });
});
// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.service-card, .feature-item, .contact-item, .welcome-content, .classes-content, .values-content, .about-content, .team-content');

animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-apple, .floating-pencil, .floating-book');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add hover effects to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show/hide scroll to top button
let scrollToTopBtn;
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.addEventListener('click', scrollToTop);
            document.body.appendChild(scrollToTopBtn);
            
            // Add CSS for scroll to top button
            const scrollBtnStyle = document.createElement('style');
            scrollBtnStyle.textContent = `
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--primary-red);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(20px);
                }
                
                .scroll-to-top.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .scroll-to-top:hover {
                    background: #b91c1c;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
                }
            `;
            document.head.appendChild(scrollBtnStyle);
        }
        scrollToTopBtn.classList.add('visible');
    } else if (scrollToTopBtn) {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Add performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    // Navbar background change
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-apple, .floating-pencil, .floating-book');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

        class ServicesCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicatorsContainer = document.getElementById('indicators');
                
                if (!this.track || !this.prevBtn || !this.nextBtn || !this.indicatorsContainer) {
                    console.error('Carousel elements not found');
                    return;
                }
                
                this.cards = this.track.querySelectorAll('.service-card');
                this.currentIndex = 0;
                this.cardWidth = 0;
                this.gap = 32; // 2rem in pixels
                this.visibleCards = 1;
                this.maxIndex = 0;
                this.autoScroll = null;
                
                this.init();
            }
            
            init() {
                if (this.cards.length === 0) {
                    this.hideNavigation();
                    return;
                }
                
                this.calculateDimensions();
                this.createIndicators();
                this.updateCarousel();
                this.bindEvents();
                
                // Only start auto-scroll if there are multiple slides
                if (this.maxIndex > 0) {
                    this.startAutoScroll();
                    this.bindHoverEvents();
                } else {
                    this.hideNavigation();
                }
            }
            
            calculateDimensions() {
                if (this.cards.length === 0) return;
                
                // Get card width including gap
                this.cardWidth = this.cards[0].offsetWidth;
                
                // Calculate how many cards are visible
                const containerWidth = this.track.parentElement.offsetWidth - 120; // Account for navigation buttons
                this.visibleCards = Math.max(1, Math.floor(containerWidth / (this.cardWidth + this.gap)));
                
                // Calculate max index - only scroll if there are more cards than visible
                this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
                
                // Reset current index if it's out of bounds
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = 0;
                }
                
                // If all cards fit in view, don't show navigation
                if (this.maxIndex === 0) {
                    this.hideNavigation();
                } else {
                    this.showNavigation();
                }
            }
            
            hideNavigation() {
                this.prevBtn.classList.add('hidden');
                this.nextBtn.classList.add('hidden');
                this.indicatorsContainer.classList.add('hidden');
                this.stopAutoScroll();
            }
            
            showNavigation() {
                this.prevBtn.classList.remove('hidden');
                this.nextBtn.classList.remove('hidden');
                this.indicatorsContainer.classList.remove('hidden');
            }
            
            createIndicators() {
                this.indicatorsContainer.innerHTML = '';
                
                // Only create indicators if there are multiple slides
                if (this.maxIndex === 0) return;
                
                const totalSlides = this.maxIndex + 1;
                
                for (let i = 0; i < totalSlides; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = `indicator ${i === this.currentIndex ? 'active' : ''}`;
                    indicator.addEventListener('click', () => this.goToSlide(i));
                    this.indicatorsContainer.appendChild(indicator);
                }
            }
            
            updateCarousel() {
                // Don't update if no scrolling is needed
                if (this.maxIndex === 0) {
                    this.track.style.transform = 'translateX(0px)';
                    return;
                }
                
                const translateX = -(this.currentIndex * (this.cardWidth + this.gap));
                this.track.style.transform = `translateX(${translateX}px)`;
                
                // Update navigation buttons
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
                
                // Update indicators
                const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }
            
            prev() {
                if (this.maxIndex === 0) return; // Don't scroll if not needed
                
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarousel();
                }
            }
            
            next() {
                if (this.maxIndex === 0) return; // Don't scroll if not needed
                
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                } else {
                    // Loop back to the beginning
                    this.currentIndex = 0;
                }
                this.updateCarousel();
            }
            
            goToSlide(index) {
                if (this.maxIndex === 0) return; // Don't scroll if not needed
                
                this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
                this.updateCarousel();
            }
            
            startAutoScroll() {
                if (this.maxIndex === 0) return; // Don't auto-scroll if not needed
                
                this.autoScroll = setInterval(() => {
                    this.next();
                }, 5000);
            }
            
            stopAutoScroll() {
                if (this.autoScroll) {
                    clearInterval(this.autoScroll);
                    this.autoScroll = null;
                }
            }
            
            bindHoverEvents() {
                // Pause auto-scroll on hover
                this.track.addEventListener('mouseenter', () => {
                    this.stopAutoScroll();
                });
                
                this.track.addEventListener('mouseleave', () => {
                    if (this.maxIndex > 0) {
                        this.startAutoScroll();
                    }
                });
            }
            
            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
                
                // Handle window resize
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        this.calculateDimensions();
                        this.createIndicators();
                        this.updateCarousel();
                        
                        // Restart auto-scroll if needed
                        this.stopAutoScroll();
                        if (this.maxIndex > 0) {
                            this.startAutoScroll();
                            this.bindHoverEvents();
                        }
                    }, 250);
                });
                
                // Touch/swipe support - only if scrolling is needed
                if (this.maxIndex > 0) {
                    this.bindTouchEvents();
                }
            }
            
            bindTouchEvents() {
                let startX = 0;
                let isDragging = false;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                }, { passive: true });
                
                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    // Don't prevent default to allow normal scrolling
                }, { passive: true });
                
                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging || this.maxIndex === 0) return;
                    isDragging = false;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });
                
                // Mouse drag support
                let mouseStartX = 0;
                let isMouseDragging = false;
                
                this.track.addEventListener('mousedown', (e) => {
                    if (this.maxIndex === 0) return;
                    mouseStartX = e.clientX;
                    isMouseDragging = true;
                    this.track.style.cursor = 'grabbing';
                    e.preventDefault();
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (!isMouseDragging) return;
                    e.preventDefault();
                });
                
                document.addEventListener('mouseup', (e) => {
                    if (!isMouseDragging) return;
                    isMouseDragging = false;
                    this.track.style.cursor = 'grab';
                    
                    const diff = mouseStartX - e.clientX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });
            }
            
            destroy() {
                this.stopAutoScroll();
                
                // Remove event listeners
                const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach(indicator => {
                    indicator.removeEventListener('click', () => {});
                });
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ServicesCarousel();
        });

// Replace the existing scroll event listener with the optimized version
window.removeEventListener('scroll', updateScrollEffects);
window.addEventListener('scroll', requestScrollUpdate, { passive: true });