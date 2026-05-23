document.addEventListener('DOMContentLoaded', () => {
    const ease = 'power3.out';
    
    // Ensure GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is required for PillNav animations.');
        return;
    }

    const pills = document.querySelectorAll('.pill-nav .pill');
    const navItems = document.querySelector('.pill-nav-items');
    const mobileBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu-popover');
    
    const tlRefs = [];
    const activeTweenRefs = [];
    
    const layout = () => {
        pills.forEach((pill, i) => {
            const circle = pill.querySelector('.hover-circle');
            const label = pill.querySelector('.pill-label');
            const white = pill.querySelector('.pill-label-hover');
            
            if (!circle) return;

            const rect = pill.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;
            
            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;
            
            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`
            });
            
            if (label) gsap.set(label, { y: 0 });
            if (white) gsap.set(white, { y: h + 12, opacity: 0 });
            
            if (tlRefs[i]) tlRefs[i].kill();
            const tl = gsap.timeline({ paused: true });
            
            tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
            
            if (label) {
                tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
            }
            
            if (white) {
                gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
            }
            
            tlRefs[i] = tl;
        });
    };
    
    // Run layout initially and on resize
    if (document.fonts?.ready) {
        document.fonts.ready.then(layout).catch(() => {});
    } else {
        layout();
    }
    
    window.addEventListener('resize', layout);
    
    // Interactions
    pills.forEach((pill, i) => {
        pill.addEventListener('mouseenter', () => {
            const tl = tlRefs[i];
            if (!tl) return;
            if (activeTweenRefs[i]) activeTweenRefs[i].kill();
            activeTweenRefs[i] = tl.tweenTo(tl.duration(), {
                duration: 0.3,
                ease,
                overwrite: 'auto'
            });
        });
        
        pill.addEventListener('mouseleave', () => {
            const tl = tlRefs[i];
            if (!tl) return;
            if (activeTweenRefs[i]) activeTweenRefs[i].kill();
            activeTweenRefs[i] = tl.tweenTo(0, {
                duration: 0.2,
                ease,
                overwrite: 'auto'
            });
        });
        
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');
        });
    });
    
    // Initial Load Animation
    if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
    }
    
    // Mobile Menu
    let isMobileMenuOpen = false;
    if (mobileMenu) {
        gsap.set(mobileMenu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;
            const lines = mobileBtn.querySelectorAll('.hamburger-line');
            
            if (isMobileMenuOpen) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
                
                gsap.set(mobileMenu, { visibility: 'visible' });
                gsap.fromTo(
                    mobileMenu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease, transformOrigin: 'top center' }
                );
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
                
                gsap.to(mobileMenu, {
                    opacity: 0, y: 10, scaleY: 1, duration: 0.2, ease, transformOrigin: 'top center',
                    onComplete: () => gsap.set(mobileMenu, { visibility: 'hidden' })
                });
            }
        });
    }
    
    // Mobile Menu Links
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen && mobileMenu) {
                isMobileMenuOpen = false;
                const lines = mobileBtn.querySelectorAll('.hamburger-line');
                if (lines.length >= 2) {
                    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                    gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
                }
                
                gsap.to(mobileMenu, {
                    opacity: 0, y: 10, scaleY: 1, duration: 0.2, ease, transformOrigin: 'top center',
                    onComplete: () => gsap.set(mobileMenu, { visibility: 'hidden' })
                });
            }
            
            mobileLinks.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
        });
    });
});
