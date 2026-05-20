document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is required for DecayCard animations.');
        return;
    }
    
    const decayCards = document.querySelectorAll('.decay-card');
    
    decayCards.forEach(card => {
        const svg = card.querySelector('.decay-svg');
        const displacementMap = card.querySelector('.decay-displacement-map');
        
        if (!svg || !displacementMap) return;
        
        let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let cachedCursor = { ...cursor };
        
        const maxDisplacement = parseInt(card.dataset.maxDisplacement || '400', 10);
        const movementBound = parseInt(card.dataset.movementBound || '50', 10);
        
        const lerp = (a, b, n) => (1 - n) * a + n * b;
        const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
        const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);
        
        window.addEventListener('mousemove', ev => {
            cursor = { x: ev.clientX, y: ev.clientY };
        });
        
        const imgValues = {
            imgTransforms: { x: 0, y: 0, rz: 0 },
            displacementScale: 0
        };
        
        let rafId;
        
        const render = () => {
            let targetX = lerp(imgValues.imgTransforms.x, map(cursor.x, 0, window.innerWidth, -120, 120), 0.1);
            let targetY = lerp(imgValues.imgTransforms.y, map(cursor.y, 0, window.innerHeight, -120, 120), 0.1);
            let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.x, 0, window.innerWidth, -10, 10), 0.1);

            if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
            if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
            if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
            if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

            imgValues.imgTransforms.x = targetX;
            imgValues.imgTransforms.y = targetY;
            imgValues.imgTransforms.rz = targetRz;

            gsap.set(svg, {
                x: imgValues.imgTransforms.x,
                y: imgValues.imgTransforms.y,
                rotateZ: imgValues.imgTransforms.rz
            });

            const cursorTravelledDistance = distance(cachedCursor.x, cursor.x, cachedCursor.y, cursor.y);
            
            imgValues.displacementScale = lerp(
                imgValues.displacementScale,
                map(cursorTravelledDistance, 0, 200, 0, maxDisplacement),
                0.06
            );

            gsap.set(displacementMap, { attr: { scale: imgValues.displacementScale } });

            cachedCursor = { ...cursor };
            rafId = requestAnimationFrame(render);
        };
        
        rafId = requestAnimationFrame(render);
    });
});
