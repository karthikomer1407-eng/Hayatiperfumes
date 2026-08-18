/* ==========================================================================
   COLLECTORS & DESIGNER PERFUME VAULT MODULE
   Catalog data, filter engine, 3D mouse parallax cards, and modal detail
   ========================================================================== */

const PERFUME_COLLECTION = [
  {
    id: 'oud-malaki',
    category: 'arabic',
    arabicName: 'عود الملكي',
    title: 'Oud Al Malaki',
    subtitle: 'Royal Cambodian Aged Oud & Gold Amber',
    image: 'assets/images/oud_royal.png',
    tag: 'Arabic Private Reserve',
    price: '$680',
    volume: '100ml / 3.4 oz Extrait de Parfum',
    longevity: '24+ Hours Longevity',
    origin: 'Taif, Saudi Arabia & Kerala Teak',
    pyramid: {
      top: 'Wild Saffron, Golden Amber, Damask Rose',
      heart: '30-Year Aged Cambodian Oud, Incense Smoke',
      base: 'Royal Mysore Sandalwood, Black Musk, Vanilla Pods'
    },
    description: 'An regal masterpiece distilled from rare 30-year-aged Cambodian agarwood, infused with hand-picked Taif rose oil and Indian Mysore sandalwood.'
  },
  {
    id: 'kerala-jasmine',
    category: 'kerala',
    arabicName: 'فلة ياسمين كيرالا',
    title: 'Kerala Night Jasmine',
    subtitle: 'Fresh Monsoon Jasmine & Kasavu Gold',
    image: 'assets/images/jasmine_backwaters.png',
    tag: 'Kerala Botanical Fusion',
    price: '$450',
    volume: '100ml / 3.4 oz Eau de Parfum',
    longevity: '18+ Hours Longevity',
    origin: 'Malabar Coast, Kerala',
    pyramid: {
      top: 'Fresh Morning Dew Drops, Bergamot Zest, Pink Pepper',
      heart: 'Night-Blooming Star Jasmine (Mulla), Lotus Blossom',
      base: 'Teakwood Bark, Golden Kasavu Silk Accord, Ambergris'
    },
    description: 'Capturing the enchanting air of Malabar backwaters at twilight. Hand-harvested white jasmine flowers intertwined with rare teakwood notes.'
  },
  {
    id: 'spice-gold',
    category: 'designer',
    arabicName: 'ذهب التوابل المليبارية',
    title: 'Malabar Spice Gold',
    subtitle: 'Crushed Cardamom & Golden Bourbon Vanilla',
    image: 'assets/images/cardamom_gold.png',
    tag: 'Designer Masterpiece',
    price: '$520',
    volume: '100ml / 3.4 oz Parfum',
    longevity: '20+ Hours Longevity',
    origin: 'Wayanad Spice Highlands, India',
    pyramid: {
      top: 'Crushed Green Cardamom, Black Pepper, Cinnamon Leaf',
      heart: 'Golden Vanilla Orchid, Nutmeg, Cocoa Butter',
      base: 'Smoky Vetiver, Leather Accord, Cashmere Wood'
    },
    description: 'Inspired by ancient spice trade routes connecting Malabar port to Arabia. Warm, intoxicating cardamom seeds bathed in liquid bourbon vanilla.'
  },
  {
    id: 'sultan-rose',
    category: 'arabic',
    arabicName: 'ورد السلطان الدمشقي',
    title: "Sultan's Rose Damask",
    subtitle: 'Ruby Crimson Rose & Arabesque Amber',
    image: 'assets/images/rose_damask.png',
    tag: 'Arabic Private Reserve',
    price: '$790',
    volume: '100ml / 3.4 oz Pure Attar',
    longevity: '24+ Hours Longevity',
    origin: 'Damascus & Muscat, Oman',
    pyramid: {
      top: 'Bulgarian Rose, White Peach, Saffron Threads',
      heart: 'Damask Crimson Rose Petals, Patchouli Leaf',
      base: 'Ambergris Flakes, White Cedar, Pure Oud Dust'
    },
    description: 'A velvet crimson symphony crafted for royal palaces. Over 10,000 hand-picked damask rose petals concentrated into single bottle of pure golden oil.'
  },
  {
    id: 'teak-sandalwood',
    category: 'kerala',
    arabicName: 'صندل مالابار ونيرفانا',
    title: 'Malabar Teak & Sandalwood',
    subtitle: 'Sacred Sandalwood & Aged Teakwood',
    image: 'assets/images/sandalwood_nirvana.png',
    tag: 'Kerala Botanical Fusion',
    price: '$580',
    volume: '100ml / 3.4 oz Parfum',
    longevity: '22+ Hours Longevity',
    origin: 'Marayoor Forests, Kerala',
    pyramid: {
      top: 'Nutmeg Zest, Holy Tulsi, Green Tea Leaf',
      heart: 'Pure Marayoor Sandalwood, Coconut Milk Accord',
      base: 'Vintage Teakwood Bark, Dark Honey, Vetiver Grass'
    },
    description: 'Sourced from Marayoor protected sandalwood forests. Rich, creamy, holy sandalwood notes paired with deep Kerala teakwood shavings.'
  },
  {
    id: 'private-1974',
    category: 'collectors',
    arabicName: 'الاحتياطي الخاص ١٩٧٤',
    title: 'Hayati 1974 Reserve',
    subtitle: 'Diamond Crystal Flacon & 24K Gold Leaf',
    image: 'assets/images/private_reserve.png',
    tag: 'Collectors Gold Edition',
    price: '$1,450',
    volume: '50ml / 1.7 oz Ultra Extrait',
    longevity: '36+ Hours Longevity',
    origin: 'Royal Vault - Hand Crafted Batch #04',
    pyramid: {
      top: '24K Gold Particles, Rare Royal Frankincense',
      heart: '50-Year Vintage Royal Hindi Oud, Civet Accord',
      base: 'Imperial Tonka Bean, Black Ambergris, Golden Musk'
    },
    description: 'The pinnacle of Hayati luxury. Only 100 numbered crystal flacons exist worldwide, containing genuine 24k gold leaf flakes floating in aged Hindi oud.'
  },
  {
    id: 'sacred-lotus',
    category: 'collectors',
    arabicName: 'لوتس وجمال العنبر',
    title: 'Sacred Lotus & Amber',
    subtitle: 'Nilgiri Pink Lotus & Sapphire Crystal',
    image: 'assets/images/lotus_mist.png',
    tag: 'Collectors Gold Edition',
    price: '$890',
    volume: '100ml / 3.4 oz Extrait',
    longevity: '24+ Hours Longevity',
    origin: 'Nilgiri Mountain Lakes',
    pyramid: {
      top: 'Fresh Rainwater, Wild Lilac, Mandarin',
      heart: 'Sacred Pink Lotus Petals, White Lily of the Valley',
      base: 'Liquid Golden Amber, Soft Cashmere, White Oud'
    },
    description: 'A serene celestial aquatic nectar derived from lotus blossoms collected at midnight under full moon light in Nilgiri mountain waters.'
  },
  {
    id: 'hayati-signature',
    category: 'designer',
    arabicName: 'عطر حياتي التوقيع',
    title: 'Hayati Grand Signature',
    subtitle: 'The Ultimate Fusion of Arabia & Malabar',
    image: 'assets/images/hero_bottle.png',
    tag: 'Designer Masterpiece',
    price: '$920',
    volume: '100ml / 3.4 oz Parfum',
    longevity: '24+ Hours Longevity',
    origin: 'Dubai & Kochi Artisan Laboratory',
    pyramid: {
      top: 'Taif Rose, Saffron, Bergamot, Cardamom',
      heart: 'Kerala Night Jasmine, Oud Smoke, Lotus',
      base: 'Mysore Sandalwood, Aged Oud, Ambergris'
    },
    description: 'Our iconic master blend where the soul of Arabian desert oud merges harmoniously with the lush tropical flora and spices of Malabar.'
  }
];

class PerfumeCollectionVault {
  constructor() {
    this.gridEl = document.getElementById('perfume-grid');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.modalEl = document.getElementById('perfume-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    if (!this.gridEl) return;

    this.currentCategory = 'all';
    this.init();
  }

  init() {
    this.renderGrid(this.currentCategory);
    this.setupFilterTabs();
    this.setupModalEvents();
  }

  setupFilterTabs() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.dataset.filter;
        this.currentCategory = filterVal;
        this.renderGrid(filterVal);
      });
    });
  }

  renderGrid(category) {
    this.gridEl.innerHTML = '';

    const filtered = category === 'all' 
      ? PERFUME_COLLECTION 
      : PERFUME_COLLECTION.filter((p) => p.category === category);

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'perfume-card';
      card.dataset.id = p.id;

      card.innerHTML = `
        <span class="perfume-badge-tag">${p.tag}</span>
        <div class="perfume-image-wrap">
          <img src="${p.image}" alt="${p.title}" class="perfume-img" loading="lazy" />
        </div>
        <div class="perfume-info">
          <div class="perfume-arabic-name">${p.arabicName}</div>
          <h3 class="perfume-title">${p.title}</h3>
          <p class="perfume-desc">${p.subtitle}</p>
          <div class="scent-notes-preview">
            <span class="note-chip">${p.pyramid.top.split(',')[0]}</span>
            <span class="note-chip">${p.pyramid.heart.split(',')[0]}</span>
            <span class="note-chip">${p.pyramid.base.split(',')[0]}</span>
          </div>
          <div class="perfume-footer">
            <span class="perfume-price">${p.price}</span>
            <button class="perfume-cta-btn">Experience Scent</button>
          </div>
        </div>
      `;

      // 3D Perspective Mouse Tilt Effect
      this.attach3DTilt(card);

      // Click event to trigger Modal Detail
      card.addEventListener('click', () => this.openModal(p));

      this.gridEl.appendChild(card);
    });
  }

  attach3DTilt(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  openModal(item) {
    if (!this.modalEl) return;

    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-arabic-title').textContent = item.arabicName;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-subtitle').textContent = item.subtitle;
    document.getElementById('modal-desc').textContent = item.description;

    document.getElementById('modal-note-top').textContent = item.pyramid.top;
    document.getElementById('modal-note-heart').textContent = item.pyramid.heart;
    document.getElementById('modal-note-base').textContent = item.pyramid.base;

    document.getElementById('modal-volume').textContent = item.volume;
    document.getElementById('modal-origin').textContent = item.origin;
    document.getElementById('modal-price').textContent = item.price;

    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  setupModalEvents() {
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

window.PerfumeCollectionVault = PerfumeCollectionVault;
