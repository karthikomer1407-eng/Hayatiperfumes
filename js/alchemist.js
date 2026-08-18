/* ==========================================================================
   INTERACTIVE SCENT ALCHEMIST MODULE
   Custom perfume notes blender, liquid color synthesizer, and custom name generator
   ========================================================================== */

class ScentAlchemist {
  constructor() {
    this.flaskLiquid = document.getElementById('alchemist-liquid');
    this.resultNameEl = document.getElementById('alchemist-result-name');
    this.blendCtaBtn = document.getElementById('alchemist-blend-btn');

    this.selectedBase = 'oud';
    this.selectedHeart = 'jasmine';
    this.selectedTop = 'saffron';

    this.baseColors = {
      oud: { color1: '#E6CA65', color2: '#99751C', name: 'Royal Oud Base' },
      sandalwood: { color1: '#D4A373', color2: '#8B5E34', name: 'Marayoor Sandalwood Base' },
      teak: { color1: '#582F0E', color2: '#331A04', name: 'Malabar Teak Base' },
      amber: { color1: '#E76F51', color2: '#9A031E', name: 'Warm Amber Resin' }
    };

    this.heartColors = {
      jasmine: { accent: '#FFFDF8', name: 'Night Jasmine' },
      rose: { accent: '#E63946', name: 'Crimson Damask Rose' },
      lotus: { accent: '#48CAE4', name: 'Sacred Nilgiri Lotus' },
      cardamom: { accent: '#2A9D8F', name: 'Wayanad Cardamom' }
    };

    this.topNames = {
      saffron: 'Golden Saffron',
      bergamot: 'Calabrian Bergamot',
      pepper: 'Black Pepper Zest',
      vanilla: 'Bourbon Vanilla Orchid'
    };

    this.init();
  }

  init() {
    this.setupPills('base', (val) => {
      this.selectedBase = val;
      this.updateBlend();
    });

    this.setupPills('heart', (val) => {
      this.selectedHeart = val;
      this.updateBlend();
    });

    this.setupPills('top', (val) => {
      this.selectedTop = val;
      this.updateBlend();
    });

    if (this.blendCtaBtn) {
      this.blendCtaBtn.addEventListener('click', () => this.triggerAlchemistCeremony());
    }

    this.updateBlend();
  }

  setupPills(type, callback) {
    const pills = document.querySelectorAll(`.option-pill[data-type="${type}"]`);
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('selected'));
        pill.classList.add('selected');
        callback(pill.dataset.value);
      });
    });
  }

  updateBlend() {
    const baseInfo = this.baseColors[this.selectedBase];
    const heartInfo = this.heartColors[this.selectedHeart];
    const topName = this.topNames[this.selectedTop];

    // Dynamic Gradient update for Liquid Flask
    if (this.flaskLiquid) {
      this.flaskLiquid.style.background = `linear-gradient(180deg, ${heartInfo.accent} 0%, ${baseInfo.color1} 50%, ${baseInfo.color2} 100%)`;
      this.flaskLiquid.style.boxShadow = `0 0 35px ${baseInfo.color1}`;
    }

    // Dynamic Formula Name
    const arabicPrefixes = ['إكسير', 'خلطة', 'نسيم', 'سر'];
    const englishPrefixes = ['Elixir of', 'Essence of', 'Nectar of', 'Alchemy of'];

    const rndIdx = (this.selectedBase.length + this.selectedHeart.length + this.selectedTop.length) % 4;
    const formulaName = `Hayati ${englishPrefixes[rndIdx]} ${heartInfo.name.split(' ')[0]} & ${baseInfo.name.split(' ')[0]}`;

    if (this.resultNameEl) {
      this.resultNameEl.textContent = formulaName;
    }
  }

  triggerAlchemistCeremony() {
    // Spawn Bubbles Effect inside Flask
    if (!this.flaskLiquid) return;

    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 80 + 10}%`;
      bubble.style.width = `${Math.random() * 12 + 6}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.animationDuration = `${Math.random() * 2 + 1.5}s`;

      this.flaskLiquid.appendChild(bubble);

      setTimeout(() => bubble.remove(), 3000);
    }

    alert(`✨ Custom Formula Blended Successfully!\n\nFormula Name: ${this.resultNameEl.textContent}\nBase: ${this.baseColors[this.selectedBase].name}\nHeart: ${this.heartColors[this.selectedHeart].name}\nTop: ${this.topNames[this.selectedTop]}\n\nOur Master Artisan Perfumer in Dubai will bottle your bespoke elixir.`);
  }
}

window.ScentAlchemist = ScentAlchemist;
