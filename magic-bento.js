document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is required for MagicBento animations.');
        return;
    }

    const glowColor = '132, 0, 255';
    const spotlightRadius = 300;
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        // Global Spotlight logic
        const grids = document.querySelectorAll('.bento-section');
        grids.forEach(grid => {
            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
              position: fixed;
              width: 800px;
              height: 800px;
              border-radius: 50%;
              pointer-events: none;
              background: radial-gradient(circle,
                rgba(${glowColor}, 0.15) 0%,
                rgba(${glowColor}, 0.08) 15%,
                rgba(${glowColor}, 0.04) 25%,
                rgba(${glowColor}, 0.02) 40%,
                rgba(${glowColor}, 0.01) 65%,
                transparent 70%
              );
              z-index: 200;
              opacity: 0;
              transform: translate(-50%, -50%);
              mix-blend-mode: screen;
            `;
            document.body.appendChild(spotlight);
            
            let isInside = false;
            
            document.addEventListener('mousemove', (e) => {
                const rect = grid.getBoundingClientRect();
                isInside = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
                
                const cards = grid.querySelectorAll('.magic-bento-card');
                
                if (!isInside) {
                    gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                    cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
                    return;
                }
                
                const proximity = spotlightRadius * 0.5;
                const fadeDistance = spotlightRadius * 0.75;
                let minDistance = Infinity;
                
                cards.forEach(card => {
                    const cardRect = card.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);
                    
                    minDistance = Math.min(minDistance, effectiveDistance);
                    
                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }
                    
                    const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                    const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
                    
                    card.style.setProperty('--glow-x', `${relativeX}%`);
                    card.style.setProperty('--glow-y', `${relativeY}%`);
                    card.style.setProperty('--glow-intensity', glowIntensity.toString());
                    card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
                });
                
                gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
                
                const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
                gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
            });
            
            document.addEventListener('mouseleave', () => {
                isInside = false;
                gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                grid.querySelectorAll('.magic-bento-card').forEach(card => card.style.setProperty('--glow-intensity', '0'));
            });
        });
    }

    // Particle and Click Ripple logic for individual cards
    const cards = document.querySelectorAll('.magic-bento-card');
    cards.forEach(card => {
        let isHovered = false;
        let particles = [];
        let timeouts = [];
        
        const createParticle = (x, y) => {
            const el = document.createElement('div');
            el.className = 'bento-particle';
            el.style.cssText = `
                position: absolute; width: 4px; height: 4px; border-radius: 50%;
                background: rgba(${glowColor}, 1);
                box-shadow: 0 0 6px rgba(${glowColor}, 0.6);
                pointer-events: none; z-index: 100; left: ${x}px; top: ${y}px;
            `;
            return el;
        };
        
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                isHovered = true;
                const rect = card.getBoundingClientRect();
                
                for (let i = 0; i < 12; i++) {
                    const timeoutId = setTimeout(() => {
                        if (!isHovered) return;
                        const p = createParticle(Math.random() * rect.width, Math.random() * rect.height);
                        card.appendChild(p);
                        particles.push(p);
                        
                        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                        gsap.to(p, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
                        gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                    }, i * 100);
                    timeouts.push(timeoutId);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                isHovered = false;
                timeouts.forEach(clearTimeout);
                timeouts = [];
                particles.forEach(p => {
                    gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() });
                });
                particles = [];
            });
        }
        
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxDistance = Math.max(
                Math.hypot(x, y), Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
            );
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute; width: ${maxDistance * 2}px; height: ${maxDistance * 2}px; border-radius: 50%;
                background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                left: ${x - maxDistance}px; top: ${y - maxDistance}px; pointer-events: none; z-index: 1000;
            `;
            card.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
        });
    });
});
