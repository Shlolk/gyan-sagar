document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP and ScrollTrigger are required for ScrollFloat animations.');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    function splitTextElement(el) {
        const nodes = Array.from(el.childNodes);
        el.innerHTML = '';
        
        const wrapper = document.createElement('span');
        wrapper.className = 'scroll-float-text';
        
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const chars = text.split('');
                chars.forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    wrapper.appendChild(span);
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.nodeName === 'BR') {
                    wrapper.appendChild(document.createElement('br'));
                } else {
                    // For inline formatting nodes, split recursively
                    const clone = node.cloneNode(true);
                    splitTextElement(clone);
                    wrapper.appendChild(clone);
                }
            }
        });
        
        el.appendChild(wrapper);
    }
    
    const elements = document.querySelectorAll('.scroll-float');
    
    elements.forEach(el => {
        // Store configuration options from dataset attributes, or fallback to defaults
        const animationDuration = parseFloat(el.dataset.duration) || 1;
        const easeSetting = el.dataset.ease || 'back.inOut(2)';
        const scrollStart = el.dataset.start || 'top bottom-=10%';
        const scrollEnd = el.dataset.end || 'bottom center+=20%';
        const staggerAmount = parseFloat(el.dataset.stagger) || 0.03;
        
        // Prepare DOM for character-by-character animation
        splitTextElement(el);
        
        const charElements = el.querySelectorAll('.char');
        
        gsap.fromTo(
            charElements,
            {
                willChange: 'opacity, transform',
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: '50% 0%'
            },
            {
                duration: animationDuration,
                ease: easeSetting,
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: el,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true
                }
            }
        );
    });
});
