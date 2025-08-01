document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.scroll-container');
    let isScrolling = false;
    
    // Enhanced scroll handling for better UX
    container.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const sections = document.querySelectorAll('.full-section');
                const containerScroll = container.scrollTop;
                const containerHeight = container.clientHeight;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionMid = sectionTop + (section.offsetHeight / 2);
                    
                    // Check if section is in the middle of the viewport
                    if (containerScroll <= sectionMid && 
                        containerScroll + containerHeight > sectionMid) {
                        
                        // Smooth scroll to align the section perfectly
                        isScrolling = true;
                        container.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth'
                        });
                        
                        // Reset after scroll completes
                        setTimeout(() => {
                            isScrolling = false;
                        }, 1000);
                    }
                });
            });
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentScroll = container.scrollTop;
            const containerHeight = container.clientHeight;
            const direction = e.key === 'ArrowDown' ? 1 : -1;
            
            container.scrollBy({
                top: direction * containerHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Touch device support
    let startY;
    container.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            const containerHeight = container.clientHeight;
            const direction = diff > 0 ? 1 : -1; // Swipe up or down
            
            container.scrollBy({
                top: direction * containerHeight,
                behavior: 'smooth'
            });
        }
    }, { passive: true });
});
