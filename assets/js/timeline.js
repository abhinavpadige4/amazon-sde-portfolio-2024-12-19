// Timeline JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animations and interactions
    initTimelineAnimations();
    initTimelineInteractions();
});

function initTimelineAnimations() {
    // Animate timeline items as they enter viewport
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                const index = parseInt(entry.target.style.getPropertyValue('--index') || '0');
                entry.target.style.transitionDelay = `${index * 0.1}s`;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger animation when 50% of item is visible
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

function initTimelineInteractions() {
    // Add hover effects to timeline items for better UX
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0) scale(1.02)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
        
        // Add click effect for accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.style.transform = 'translateY(0) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1.02)';
                }, 100);
            }
        });
        
        item.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Make timeline items keyboard accessible
    timelineItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'Timeline item');
    });
}

// Optional: Add smooth scrolling for timeline navigation
function initSmoothScroll() {
    // This would be used if we had timeline navigation links
    // For now, we rely on the natural scroll behavior
}

// Export functions for potential use in other modules
window.timeline = {
    initAnimations: initTimelineAnimations,
    initInteractions: initTimelineInteractions,
    initSmoothScroll: initSmoothScroll
};