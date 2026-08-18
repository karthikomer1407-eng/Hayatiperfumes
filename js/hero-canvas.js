/* ==========================================================================
   CINEMATIC FOREST HERO CANVAS ENGINE & FLYING PARALLAX SPORES
   Renders lush misty Malabar rainforest, floating golden pollen spores,
   emerald leaves, white jasmine petals, and perfume bottle emergence.
   ========================================================================== */

class HeroCanvasEngine {
  constructor() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Forest Background & Bottle Assets
    this.forestBgImg = new Image();
    this.forestBgImg.src = 'assets/images/forest_bg.png';
    this.isBgLoaded = false;

    this.forestBottleImg = new Image();
    this.forestBottleImg.src = 'assets/images/forest_bottle.png';
    this.isBottleLoaded = false;

    // Dimensions
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Scroll Progress (0 to 1)
    this.scrollProgress = 0;

    // Mouse Depth Interp
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Forest Flying Elements (Gold Spores, Emerald Leaves, White Jasmine)
    this.particles = [];
    this.particleCount = 85;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    this.forestBgImg.onload = () => {
      this.isBgLoaded = true;
      this.render();
    };

    this.forestBottleImg.onload = () => {
      this.isBottleLoaded = true;
      this.render();
    };

    this.createParticles();
    requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    const types = ['gold_spore', 'emerald_leaf', 'jasmine_petal', 'mist_cloud'];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: Math.random() * 2.5 + 0.5,
        size: Math.random() * 8 + 2,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -Math.random() * 0.8 - 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.75 + 0.25,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
  }

  updateScrollProgress(progress) {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  animate() {
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.08;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.08;

    this.render();
    requestAnimationFrame(() => this.animate());
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Cinematic Forest Background with Dynamic Parallax & Scroll Scale
    if (this.isBgLoaded) {
      this.ctx.save();
      const bgScale = 1.05 + this.scrollProgress * 0.15;
      const bgOffsetX = (this.width * (1 - bgScale)) / 2 + (this.mouseX * 20);
      const bgOffsetY = (this.height * (1 - bgScale)) / 2 + (this.mouseY * 20);

      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.scale(bgScale, bgScale);
      this.ctx.translate(-this.width / 2 + bgOffsetX, -this.height / 2 + bgOffsetY);

      this.ctx.drawImage(this.forestBgImg, 0, 0, this.width, this.height);
      this.ctx.restore();
    }

    // 2. Draw Forest Sunbeams & Volumetric Light Beam
    this.ctx.save();
    const beamGradient = this.ctx.createLinearGradient(
      this.width * 0.3 + this.mouseX * 30, 0,
      this.width * 0.6, this.height
    );
    beamGradient.addColorStop(0, 'rgba(230, 202, 101, 0.22)');
    beamGradient.addColorStop(0.5, 'rgba(24, 83, 74, 0.12)');
    beamGradient.addColorStop(1, 'rgba(6, 7, 11, 0)');

    this.ctx.fillStyle = beamGradient;
    this.ctx.beginPath();
    this.ctx.moveTo(this.width * 0.2, 0);
    this.ctx.lineTo(this.width * 0.7, 0);
    this.ctx.lineTo(this.width * 0.9, this.height);
    this.ctx.lineTo(this.width * 0.4, this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    // 3. Draw Hero Forest Perfume Bottle Asset with Scroll-Driven Elevation
    if (this.isBottleLoaded) {
      this.ctx.save();

      const bottleWidth = Math.min(this.width * 0.32, 420);
      const aspect = this.forestBottleImg.height / this.forestBottleImg.width;
      const bottleHeight = bottleWidth * aspect;

      // Position shifts smoothly as you scroll
      const posX = this.width / 2 + (this.mouseX * 25);
      const posY = this.height / 2 + (this.scrollProgress * 80) + (this.mouseY * 25);
      const bottleScale = 1 - (this.scrollProgress * 0.2);

      this.ctx.translate(posX, posY);
      this.ctx.rotate(Math.sin(this.scrollProgress * Math.PI) * 0.04 + (this.mouseX * 0.02));
      this.ctx.scale(bottleScale, bottleScale);

      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      this.ctx.shadowBlur = 45;
      this.ctx.shadowOffsetY = 25;

      this.ctx.drawImage(
        this.forestBottleImg,
        -bottleWidth / 2,
        -bottleHeight / 2,
        bottleWidth,
        bottleHeight
      );

      this.ctx.restore();
    }

    // 4. Render Forest Spores & Petals
    this.particles.forEach((p) => {
      p.x += p.speedX + (this.mouseX * p.z * 0.4);
      p.y += p.speedY - (this.scrollProgress * 2.5 * p.z);
      p.rotation += p.rotSpeed;

      if (p.y < -40) {
        p.y = this.height + 40;
        p.x = Math.random() * this.width;
      }
      if (p.x < -40) p.x = this.width + 40;
      if (p.x > this.width + 40) p.x = -40;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;

      if (p.type === 'gold_spore') {
        // Glowing Gold Pollen Spore
        const pGlow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        pGlow.addColorStop(0, '#FFF9E6');
        pGlow.addColorStop(0.5, '#E6CA65');
        pGlow.addColorStop(1, 'rgba(230, 202, 101, 0)');
        this.ctx.fillStyle = pGlow;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'emerald_leaf') {
        // Emerald Teak Leaf Leaflet
        this.ctx.fillStyle = 'rgba(24, 83, 74, 0.8)';
        this.ctx.strokeStyle = 'rgba(230, 202, 101, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      } else if (p.type === 'jasmine_petal') {
        // White Jasmine Petal
        this.ctx.fillStyle = 'rgba(255, 253, 248, 0.9)';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.9, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'mist_cloud') {
        // Creeping Forest Mist Node
        const mistGlow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 4);
        mistGlow.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        mistGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.ctx.fillStyle = mistGlow;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 4, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    });
  }
}

window.HeroCanvasEngine = HeroCanvasEngine;
