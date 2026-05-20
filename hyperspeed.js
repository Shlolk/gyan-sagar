// hyperspeed.js - High Performance Canvas Light Trails Background
document.addEventListener('DOMContentLoaded', () => {
    const lightsContainer = document.createElement('div');
    lightsContainer.id = 'lights';
    lightsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -999;
        overflow: hidden;
        background: #000000;
        pointer-events: none;
    `;
    
    const canvas = document.createElement('canvas');
    lightsContainer.appendChild(canvas);
    document.body.prepend(lightsContainer);
    
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let width, height, cx, cy;
    let stars = [];
    
    // Colors inspired by hyperspeedPresets.one
    const colors = ['#d856bf', '#6750a2', '#c247ac', '#03b3c3', '#0e5ea5', '#324555', '#ffffff'];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        cx = width / 2;
        cy = height / 2;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Star {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = (Math.random() - 0.5) * width * 3;
            this.y = (Math.random() - 0.5) * height * 3;
            this.z = Math.random() * width;
            this.pz = this.z;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = 1.5 + Math.random() * 4;
            this.size = 0.5 + Math.random() * 1.5;
        }
        
        update(speedMult) {
            this.pz = this.z;
            this.z -= this.speed * speedMult;
            if (this.z < 1) {
                this.reset();
                this.pz = this.z;
            }
        }
        
        draw() {
            const sx = (this.x / this.z) * cx + cx;
            const sy = (this.y / this.z) * cy + cy;
            const px = (this.x / this.pz) * cx + cx;
            const py = (this.y / this.pz) * cy + cy;
            
            const radius = Math.max(0.1, (1 - this.z / width) * this.size);
            
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.lineWidth = radius * 2;
            ctx.strokeStyle = this.color;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            // Core bright spot
            ctx.beginPath();
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
    }
    
    // Create stars
    const particleCount = window.innerWidth > 768 ? 400 : 150;
    for (let i = 0; i < particleCount; i++) {
        stars.push(new Star());
        // Randomize initial Z so they don't all start at the front
        stars[i].z = Math.random() * width;
        stars[i].pz = stars[i].z;
    }
    
    let speedMult = 1;
    let targetSpeedMult = 1;
    
    // Interactivity: Speed up on mouse down / touch
    window.addEventListener('mousedown', () => targetSpeedMult = 4);
    window.addEventListener('mouseup', () => targetSpeedMult = 1);
    window.addEventListener('touchstart', () => targetSpeedMult = 4, { passive: true });
    window.addEventListener('touchend', () => targetSpeedMult = 1, { passive: true });
    
    function animate() {
        // Trail effect with slightly opaque black background
        ctx.fillStyle = 'rgba(8, 8, 8, 0.25)';
        ctx.fillRect(0, 0, width, height);
        
        // Smoothly interpolate speed
        speedMult += (targetSpeedMult - speedMult) * 0.05;
        
        // Add perspective warping based on mouse position if desktop
        let warpX = 0, warpY = 0;
        
        stars.forEach(star => {
            star.update(speedMult);
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
