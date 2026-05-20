document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is required for TiltedCard animations.');
        return;
    }

    const cards = document.querySelectorAll('.tilted-card-figure');
    
    cards.forEach(figure => {
        const inner = figure.querySelector('.tilted-card-inner');
        const caption = figure.querySelector('.tilted-card-caption');
        
        if (!inner) return;

        let lastY = 0;
        const rotateAmplitude = 14;
        const scaleOnHover = 1.05;
        
        // Setup GSAP QuickSetters for high performance animations
        const setRotX = gsap.quickTo(inner, "rotateX", { duration: 0.5, ease: "power3.out" });
        const setRotY = gsap.quickTo(inner, "rotateY", { duration: 0.5, ease: "power3.out" });
        const setScale = gsap.quickTo(inner, "scale", { duration: 0.5, ease: "power3.out" });
        
        let setCapX, setCapY, setCapOpacity, setCapRot;
        if (caption) {
            setCapX = gsap.quickTo(caption, "x", { duration: 0.1, ease: "none" });
            setCapY = gsap.quickTo(caption, "y", { duration: 0.1, ease: "none" });
            setCapOpacity = gsap.quickTo(caption, "opacity", { duration: 0.3, ease: "power2.out" });
            setCapRot = gsap.quickTo(caption, "rotate", { duration: 0.4, ease: "power3.out" });
            
            // Initial setup for caption
            gsap.set(caption, { x: 0, y: 0, opacity: 0, rotate: 0 });
        }
        
        figure.addEventListener('mousemove', (e) => {
            const rect = figure.getBoundingClientRect();
            
            const offsetX = e.clientX - rect.left - rect.width / 2;
            const offsetY = e.clientY - rect.top - rect.height / 2;
            
            const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
            const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
            
            setRotX(rotationX);
            setRotY(rotationY);
            
            if (caption) {
                // Offset caption slightly from mouse
                setCapX(e.clientX - rect.left + 15);
                setCapY(e.clientY - rect.top + 15);
                
                const velocityY = offsetY - lastY;
                setCapRot(-velocityY * 0.6);
                lastY = offsetY;
            }
        });
        
        figure.addEventListener('mouseenter', () => {
            setScale(scaleOnHover);
            if (caption) {
                setCapOpacity(1);
            }
        });
        
        figure.addEventListener('mouseleave', () => {
            setRotX(0);
            setRotY(0);
            setScale(1);
            
            if (caption) {
                setCapOpacity(0);
                setCapRot(0);
            }
        });
    });
});
