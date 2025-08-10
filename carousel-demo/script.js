class ImageCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxClose = document.querySelector('.lightbox-close');
        
        // Touch/drag variables
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.initialTranslate = 0;
        this.translateX = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCarousel();
        this.updateIndicators();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Image click for lightbox
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            img.addEventListener('click', () => this.openLightbox(img.src));
        });
        
        // Lightbox close
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'Escape') this.closeLightbox();
        });
        
        // Touch/mouse events for dragging
        this.track.addEventListener('mousedown', (e) => this.dragStart(e));
        this.track.addEventListener('touchstart', (e) => this.dragStart(e));
        
        this.track.addEventListener('mousemove', (e) => this.dragMove(e));
        this.track.addEventListener('touchmove', (e) => this.dragMove(e));
        
        this.track.addEventListener('mouseup', () => this.dragEnd());
        this.track.addEventListener('touchend', () => this.dragEnd());
        
        this.track.addEventListener('mouseleave', () => this.dragEnd());
        
        // Prevent default drag behavior on images
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }
    
    dragStart(e) {
        this.isDragging = true;
        this.track.classList.add('dragging');
        
        this.startX = this.getPositionX(e);
        this.initialTranslate = this.translateX;
        
        // Add grabbing cursor
        this.slides.forEach(slide => {
            slide.querySelector('img').classList.add('dragging');
        });
    }
    
    dragMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        this.currentX = this.getPositionX(e);
        const deltaX = this.currentX - this.startX;
        
        this.translateX = this.initialTranslate + deltaX;
        this.track.style.transform = `translateX(${this.translateX}px)`;
    }
    
    dragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.track.classList.remove('dragging');
        
        // Remove grabbing cursor
        this.slides.forEach(slide => {
            slide.querySelector('img').classList.remove('dragging');
        });
        
        const deltaX = this.currentX - this.startX;
        const threshold = 50; // Minimum drag distance to change slide
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && this.currentSlide > 0) {
                this.prevSlide();
            } else if (deltaX < 0 && this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.updateCarousel();
            }
        } else {
            this.updateCarousel();
        }
    }
    
    getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
            this.updateIndicators();
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateCarousel();
            this.updateIndicators();
        }
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.updateIndicators();
    }
    
    updateCarousel() {
        this.translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${this.translateX}%)`;
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    openLightbox(imageSrc) {
        this.lightboxImage.src = imageSrc;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear image source after transition
        setTimeout(() => {
            this.lightboxImage.src = '';
        }, 300);
    }
}

// Auto-play functionality (optional)
class AutoPlay {
    constructor(carousel, interval = 5000) {
        this.carousel = carousel;
        this.interval = interval;
        this.autoPlayTimer = null;
        this.isPlaying = false;
        
        this.setupAutoPlay();
    }
    
    setupAutoPlay() {
        const container = document.querySelector('.carousel-container');
        
        // Pause on hover
        container.addEventListener('mouseenter', () => this.pause());
        container.addEventListener('mouseleave', () => this.play());
        
        // Pause on focus (accessibility)
        container.addEventListener('focusin', () => this.pause());
        container.addEventListener('focusout', () => this.play());
        
        // Start auto-play
        this.play();
    }
    
    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.autoPlayTimer = setInterval(() => {
            if (this.carousel.currentSlide === this.carousel.totalSlides - 1) {
                this.carousel.goToSlide(0);
            } else {
                this.carousel.nextSlide();
            }
        }, this.interval);
    }
    
    pause() {
        this.isPlaying = false;
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new ImageCarousel();
    
    // Optional: Enable auto-play (uncomment to activate)
    // const autoPlay = new AutoPlay(carousel, 4000);
});

// Utility functions for responsive image loading
function optimizeImages() {
    const images = document.querySelectorAll('.carousel-slide img');
    
    images.forEach(img => {
        // Lazy loading
        img.loading = 'lazy';
        
        // Error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1aDUwdjUwaC01MHYtNTB6bTI1IDEyLjVjNi45IDAgMTIuNSA1LjYgMTIuNSAxMi41cy01LjYgMTIuNS0xMi41IDEyLjUtMTIuNS01LjYtMTIuNS0xMi41IDUuNi0xMi41IDEyLjUtMTIuNXoiIGZpbGw9IiNkZGQiLz4KPHRleHQgeD0iMjAwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Image not found';
        });
    });
}

// Performance optimization
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

// Responsive handling
window.addEventListener('resize', debounce(() => {
    // Reinitialize carousel on significant resize
    const carousel = new ImageCarousel();
}, 250));

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);