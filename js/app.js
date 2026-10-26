/**
 * ECOSWAP AFRICA - CORE APP JAVASCRIPT
 */

// Global State Manager
const ECOSWAP_APP = {
  // Default Collector Session
  defaultCollector: {
    name: 'Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 803 456 7890',
    collectorId: 'ECO-84920',
    tier: 'Diamond Pioneer',
    location: 'Yaba Eco District, Lagos',
    coins: 1450,
    diamonds: 86,
    totalKgRecycled: 142.8,
    joinedDate: 'January 2026',
    transactions: [
      {
        id: 'TXN-9021',
        date: '2026-09-18',
        material: 'PET Plastic Bottles',
        weight: '4,500 grams',
        reward: '+450 Coins',
        type: 'coins',
        status: 'Completed'
      },
      {
        id: 'TXN-8842',
        date: '2026-09-10',
        material: 'HDPE Heavy Plastics',
        weight: '16.0 kg',
        reward: '+48 Diamonds',
        type: 'diamonds',
        status: 'Completed'
      },
      {
        id: 'TXN-7910',
        date: '2026-08-28',
        material: 'Aluminium Beverage Cans',
        weight: '2,000 grams',
        reward: '+500 Coins',
        type: 'coins',
        status: 'Completed'
      },
      {
        id: 'TXN-6501',
        date: '2026-08-14',
        material: 'Reward Redemption: ₦1,000 Airtime',
        weight: '-',
        reward: '-400 Coins',
        type: 'redeem',
        status: 'Disbursed'
      }
    ]
  },

  // Get current user session
  getCollector() {
    const stored = localStorage.getItem('ecoswap_collector');
    if (!stored) {
      localStorage.setItem('ecoswap_collector', JSON.stringify(this.defaultCollector));
      return this.defaultCollector;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return this.defaultCollector;
    }
  },

  // Save current user session
  saveCollector(collector) {
    localStorage.setItem('ecoswap_collector', JSON.stringify(collector));
    this.updateDashboardUI();
  },

  // Auth Status
  isLoggedIn() {
    return localStorage.getItem('ecoswap_is_auth') === 'true';
  },

  setLoggedIn(status) {
    localStorage.setItem('ecoswap_is_auth', status ? 'true' : 'false');
  },

  // Toast System
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    toast.innerHTML = `
      <span>${iconSvg}</span>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // Initialize Common UI components
  init() {
    this.initMobileMenu();
    this.initActiveLinks();
    this.initModals();
    this.renderPageSpecifics();
  },

  initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const drawer = document.querySelector('.mobile-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  },

  initActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  },

  initModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });

      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  },

  // Page Specific Handlers
  renderPageSpecifics() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    if (path === '' || path === 'index.html') {
      this.renderHomeStats();
      this.renderHomeMaterials();
      this.renderHomeProducts();
    } else if (path === 'products.html') {
      this.renderProductsPage();
    } else if (path === 'blog.html') {
      this.renderBlogPage();
    } else if (path === 'contact.html') {
      this.renderContactPage();
    } else if (path === 'auth.html') {
      this.renderAuthPage();
    } else if (path === 'dashboard.html') {
      this.renderDashboardPage();
    }
  },

  // Homepage Renderers
  renderHomeStats() {
    const collector = this.getCollector();
    const wasteElem = document.getElementById('stat-waste');
    const collectorsElem = document.getElementById('stat-collectors');
    const coinsElem = document.getElementById('stat-coins');
    const diamondsElem = document.getElementById('stat-diamonds');

    if (wasteElem) wasteElem.innerText = '48,920 kg';
    if (collectorsElem) collectorsElem.innerText = '3,410+';
    if (coinsElem) coinsElem.innerText = '1,840,000';
    if (diamondsElem) diamondsElem.innerText = '97,840';
  },

  renderHomeMaterials() {
    const container = document.getElementById('home-materials-grid');
    if (!container || !window.ECOSWAP_DATA) return;

    container.innerHTML = window.ECOSWAP_DATA.materials.map(mat => `
      <div class="brutal p-4 transition-transform hover:-translate-y-1" style="border-left: 6px solid ${mat.color};">
        <div class="flex justify-between items-start">
          <span class="label-mono font-bold" style="background: ${mat.color}; padding: 2px 6px; border: 1.5px solid var(--border-color);">${mat.code}</span>
          <span class="label-mono text-xs text-muted-foreground">${mat.weighUnit.toUpperCase()}</span>
        </div>
        <h4 class="display-tight text-xl mt-3">${mat.name}</h4>
        <p class="text-xs text-muted-foreground mt-1">${mat.description}</p>
        <div class="mt-3 pt-2 border-t border-border/20 flex justify-between items-center text-xs font-bold">
          <span>Rate:</span>
          <span class="font-mono text-lime-foreground bg-lime px-2 py-0.5 border border-border">${mat.rateText}</span>
        </div>
      </div>
    `).join('');
  },

  renderHomeProducts() {
    const container = document.getElementById('home-featured-products');
    if (!container || !window.ECOSWAP_DATA) return;

    const featured = window.ECOSWAP_DATA.products.slice(0, 3);
    container.innerHTML = featured.map(prod => `
      <div class="brutal product-card">
        <img src="${prod.image}" alt="${prod.name}" class="product-thumb" loading="lazy">
        <div class="product-body">
          <div class="product-meta">
            <span class="product-badge">${prod.category}</span>
            <span class="label-mono text-xs">${prod.redeemCost}</span>
          </div>
          <h4 class="product-title display-tight">${prod.name}</h4>
          <p class="product-desc">${prod.description}</p>
          <div class="product-footer">
            <span class="product-price">${prod.price}</span>
            <a href="products.html" class="btn btn-lime brutal-press py-1.5 px-3 text-xs">View Catalogue</a>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Products Page Renderer
  renderProductsPage() {
    const container = document.getElementById('products-grid');
    const filterTabsContainer = document.getElementById('products-filter-tabs');
    if (!container || !window.ECOSWAP_DATA) return;

    const categories = ['All', 'Construction', 'Industrial', 'Household', 'Decorative'];
    
    if (filterTabsContainer) {
      filterTabsContainer.innerHTML = categories.map((cat, idx) => `
        <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>
      `).join('');

      filterTabsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          filterTabsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const selectedCat = btn.dataset.category;
          renderList(selectedCat);
        });
      });
    }

    const renderList = (category = 'All') => {
      const filtered = category === 'All' 
        ? window.ECOSWAP_DATA.products 
        : window.ECOSWAP_DATA.products.filter(p => p.category === category);

      container.innerHTML = filtered.map(prod => `
        <div class="brutal product-card">
          <img src="${prod.image}" alt="${prod.name}" class="product-thumb" loading="lazy">
          <div class="product-body">
            <div class="product-meta">
              <span class="product-badge">${prod.category}</span>
              <span class="label-mono text-xs" style="background: var(--coin); padding: 2px 6px; border: 1.5px solid var(--border-color);">${prod.redeemCost}</span>
            </div>
            <h3 class="product-title display-tight">${prod.name}</h3>
            <p class="product-desc">${prod.description}</p>
            <div class="p-2 mb-3 bg-secondary border border-border text-xs font-mono">
              ${prod.specs}
            </div>
            <div class="product-footer">
              <span class="product-price">${prod.price}</span>
              <button onclick="ECOSWAP_APP.openProductInquiry('${prod.id}')" class="btn btn-ink brutal-press text-xs py-2 px-3">
                Order / Enquire
              </button>
            </div>
          </div>
        </div>
      `).join('');
    };

    renderList('All');
  },

  openProductInquiry(productId) {
    const prod = window.ECOSWAP_DATA.products.find(p => p.id === productId);
    if (!prod) return;

    const modalTitle = document.getElementById('inquiry-modal-title');
    const modalDesc = document.getElementById('inquiry-modal-desc');
    const modalInput = document.getElementById('inquiry-product-name');

    if (modalTitle) modalTitle.innerText = `Enquire: ${prod.name}`;
    if (modalDesc) modalDesc.innerText = `Specify your target volume or redemption request for ${prod.name}.`;
    if (modalInput) modalInput.value = prod.name;

    this.openModal('product-inquiry-modal');
  },

  // Blog Page Renderer
  renderBlogPage() {
    const container = document.getElementById('blog-grid');
    if (!container || !window.ECOSWAP_DATA) return;

    container.innerHTML = window.ECOSWAP_DATA.blogPosts.map(post => `
      <article class="brutal blog-card">
        <img src="${post.image}" alt="${post.title}" class="blog-thumb" loading="lazy">
        <div class="blog-body">
          <div class="flex justify-between items-center mb-2">
            <span class="blog-tag">${post.category}</span>
            <span class="label-mono text-xs text-muted-foreground">${post.readTime}</span>
          </div>
          <h3 class="blog-title display-tight">${post.title}</h3>
          <p class="blog-snippet">${post.snippet}</p>
          <div class="pt-3 border-t border-border flex justify-between items-center mt-auto">
            <span class="label-mono text-xs text-muted-foreground">${post.date}</span>
            <button onclick="ECOSWAP_APP.readArticle('${post.id}')" class="btn btn-lime brutal-press text-xs py-1.5 px-3">
              Read Story →
            </button>
          </div>
        </div>
      </article>
    `).join('');
  },

  readArticle(articleId) {
    const article = window.ECOSWAP_DATA.blogPosts.find(a => a.id === articleId);
    if (!article) return;

    const titleElem = document.getElementById('article-modal-title');
    const metaElem = document.getElementById('article-modal-meta');
    const bodyElem = document.getElementById('article-modal-body');
    const imgElem = document.getElementById('article-modal-img');

    if (titleElem) titleElem.innerText = article.title;
    if (metaElem) metaElem.innerText = `${article.category} · ${article.date} · ${article.readTime}`;
    if (imgElem) {
      imgElem.src = article.image;
      imgElem.alt = article.title;
    }
    if (bodyElem) {
      bodyElem.innerHTML = article.content.split('\n\n').map(p => `<p class="mb-4 leading-relaxed">${p}</p>`).join('');
    }

    this.openModal('article-modal');
  },

  // Contact Page Renderer
  renderContactPage() {
    const msgForm = document.getElementById('contact-message-form');
    const enquiryForm = document.getElementById('waste-enquiry-form');
    const materialSelect = document.getElementById('enquiry-material-select');

    if (materialSelect && window.ECOSWAP_DATA) {
      materialSelect.innerHTML = `
        <option value="" disabled selected>Select Primary Recyclable Material</option>
        ${window.ECOSWAP_DATA.materials.map(m => `<option value="${m.name}">${m.name} (${m.code})</option>`).join('')}
        <option value="Mixed Scrap">Mixed Scrap / Other Recyclables</option>
      `;
    }

    if (msgForm) {
      msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast('Your message has been received! An ECOSWAP officer will follow up promptly.', 'success');
        msgForm.reset();
      });
    }

    if (enquiryForm) {
      enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast('Supply enquiry registered successfully. A regional logistics coordinator will connect with you.', 'success');
        enquiryForm.reset();
      });
    }
  },

  // Auth Page Handlers
  renderAuthPage() {
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const demoBtn = document.getElementById('btn-demo-login');

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    const setMode = (isRegister) => {
      if (isRegister) {
        loginTab?.classList.remove('active');
        registerTab?.classList.add('active');
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
      } else {
        loginTab?.classList.add('active');
        registerTab?.classList.remove('active');
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
      }
    };

    setMode(mode === 'register');

    loginTab?.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(false);
    });

    registerTab?.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(true);
    });

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        this.setLoggedIn(true);
        this.showToast('Logged in as Demo Collector Amina Bello!', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 600);
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.setLoggedIn(true);
        this.showToast('Welcome back, Collector!', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 700);
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name')?.value || 'New Collector';
        const collector = this.getCollector();
        collector.name = name;
        this.saveCollector(collector);
        this.setLoggedIn(true);
        this.showToast(`Account created for ${name}! 100 Welcome Coins granted.`, 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      });
    }
  },

  // Dashboard Page Controller
  renderDashboardPage() {
    this.updateDashboardUI();
    this.initWeighInSimulator();
    this.initRewardsStore();
  },

  updateDashboardUI() {
    const collector = this.getCollector();

    // Name & Stats
    const nameElem = document.getElementById('dash-collector-name');
    const idElem = document.getElementById('dash-collector-id');
    const tierElem = document.getElementById('dash-collector-tier');
    const coinsElem = document.getElementById('dash-coins-balance');
    const diamondsElem = document.getElementById('dash-diamonds-balance');
    const kgElem = document.getElementById('dash-total-kg');

    if (nameElem) nameElem.innerText = collector.name;
    if (idElem) idElem.innerText = collector.collectorId;
    if (tierElem) tierElem.innerText = collector.tier;
    if (coinsElem) coinsElem.innerText = Number(collector.coins).toLocaleString();
    if (diamondsElem) diamondsElem.innerText = Number(collector.diamonds).toLocaleString();
    if (kgElem) kgElem.innerText = `${collector.totalKgRecycled.toFixed(1)} kg`;

    // Transaction Ledger
    const ledgerTable = document.getElementById('ledger-table-body');
    if (ledgerTable && collector.transactions) {
      ledgerTable.innerHTML = collector.transactions.map(tx => `
        <tr>
          <td class="font-mono font-bold">${tx.id}</td>
          <td>${tx.date}</td>
          <td><strong>${tx.material}</strong></td>
          <td class="font-mono">${tx.weight}</td>
          <td>
            <span class="label-mono px-2 py-1 font-bold ${tx.type === 'coins' ? 'bg-lime text-lime-foreground' : tx.type === 'diamonds' ? 'bg-coin text-coin-foreground' : 'bg-secondary text-ink'}" style="border: 1.5px solid var(--border-color);">
              ${tx.reward}
            </span>
          </td>
          <td>
            <span class="text-xs px-2 py-0.5 font-bold" style="background: #e2e8f0; border: 1px solid #94a3b8;">
              ${tx.status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  },

  // Interactive Weigh-in Simulator
  initWeighInSimulator() {
    const select = document.getElementById('sim-material-select');
    const inputWeight = document.getElementById('sim-weight-input');
    const previewContainer = document.getElementById('sim-preview-box');
    const previewText = document.getElementById('sim-preview-text');
    const form = document.getElementById('sim-weighin-form');

    if (select && window.ECOSWAP_DATA) {
      select.innerHTML = `
        <option value="" disabled selected>Select Deposited Material</option>
        ${window.ECOSWAP_DATA.materials.map(m => `
          <option value="${m.id}" data-unit="${m.weighUnit}" data-mult="${m.multiplier}" data-reward="${m.rewardType}">
            ${m.name} [${m.code}] — ${m.rateText}
          </option>
        `).join('')}
      `;
    }

    const calculateReward = () => {
      const selectedOption = select?.options[select.selectedIndex];
      if (!selectedOption || !selectedOption.dataset.mult) return null;

      const weight = parseFloat(inputWeight?.value || 0);
      if (weight <= 0) return null;

      const mult = parseFloat(selectedOption.dataset.mult);
      const unit = selectedOption.dataset.unit;
      const rewardType = selectedOption.dataset.reward;

      let rewardAmount = 0;
      if (unit === 'grams') {
        rewardAmount = Math.round(weight * mult);
      } else {
        rewardAmount = parseFloat((weight * mult).toFixed(1));
      }

      return { weight, unit, rewardType, rewardAmount, materialName: selectedOption.text.split('[')[0].trim() };
    };

    const updatePreview = () => {
      const calc = calculateReward();
      if (!calc || !previewContainer || !previewText) {
        if (previewContainer) previewContainer.style.display = 'none';
        return;
      }

      previewContainer.style.display = 'block';
      if (calc.rewardType === 'coins') {
        previewText.innerHTML = `You will earn <strong class="text-xl font-display" style="background: var(--lime); padding: 0 4px; border: 1px solid var(--border-color);">+${calc.rewardAmount} Coins</strong> for ${calc.weight} ${calc.unit}`;
      } else {
        previewText.innerHTML = `You will earn <strong class="text-xl font-display" style="background: var(--coin); padding: 0 4px; border: 1px solid var(--border-color);">+${calc.rewardAmount} Diamonds</strong> for ${calc.weight} ${calc.unit}`;
      }
    };

    select?.addEventListener('change', updatePreview);
    inputWeight?.addEventListener('input', updatePreview);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const calc = calculateReward();
        if (!calc) {
          this.showToast('Please select material and enter valid weight.', 'error');
          return;
        }

        const collector = this.getCollector();
        const newTxnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
        const now = new Date().toISOString().split('T')[0];

        let rewardLabel = '';
        if (calc.rewardType === 'coins') {
          collector.coins += calc.rewardAmount;
          rewardLabel = `+${calc.rewardAmount} Coins`;
        } else {
          collector.diamonds += calc.rewardAmount;
          rewardLabel = `+${calc.rewardAmount} Diamonds`;
        }

        // Add to total weight
        const addedKg = calc.unit === 'grams' ? calc.weight / 1000 : calc.weight;
        collector.totalKgRecycled += addedKg;

        // Prepend transaction
        collector.transactions.unshift({
          id: newTxnId,
          date: now,
          material: calc.materialName,
          weight: `${calc.weight} ${calc.unit}`,
          reward: rewardLabel,
          type: calc.rewardType,
          status: 'Completed'
        });

        this.saveCollector(collector);
        this.closeModal('weighin-modal');
        this.showToast(`Drop-off recorded! ${rewardLabel} deposited into your collector wallet.`, 'success');
        form.reset();
        if (previewContainer) previewContainer.style.display = 'none';
      });
    }
  },

  // Rewards Store System
  initRewardsStore() {
    const container = document.getElementById('rewards-catalog-grid');
    if (!container || !window.ECOSWAP_DATA) return;

    container.innerHTML = window.ECOSWAP_DATA.rewards.map(rew => `
      <div class="brutal p-5 flex flex-col justify-between h-full bg-paper">
        <div>
          <div class="flex justify-between items-start mb-3">
            <span class="label-mono font-bold" style="background: ${rew.currency === 'coins' ? 'var(--lime)' : 'var(--coin)'}; padding: 2px 8px; border: 1.5px solid var(--border-color);">
              ${rew.category}
            </span>
            <span class="label-mono font-bold text-sm">${rew.cost}</span>
          </div>
          <h4 class="display-tight text-xl mb-2">${rew.title}</h4>
          <p class="text-xs text-muted-foreground mb-4">${rew.description}</p>
        </div>
        <button onclick="ECOSWAP_APP.redeemReward('${rew.id}')" class="btn btn-ink brutal-press w-full py-2.5 text-xs">
          Redeem Reward
        </button>
      </div>
    `).join('');
  },

  redeemReward(rewardId) {
    const rew = window.ECOSWAP_DATA.rewards.find(r => r.id === rewardId);
    if (!rew) return;

    const collector = this.getCollector();

    if (rew.currency === 'coins' && collector.coins < rew.costCoins) {
      this.showToast(`Insufficient Coin balance! You need ${rew.costCoins} Coins (current: ${collector.coins}).`, 'error');
      return;
    }

    if (rew.currency === 'diamonds' && collector.diamonds < rew.costDiamonds) {
      this.showToast(`Insufficient Diamond balance! You need ${rew.costDiamonds} Diamonds (current: ${collector.diamonds}).`, 'error');
      return;
    }

    // Deduct cost
    if (rew.currency === 'coins') {
      collector.coins -= rew.costCoins;
    } else {
      collector.diamonds -= rew.costDiamonds;
    }

    const newTxnId = `RED-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().split('T')[0];

    collector.transactions.unshift({
      id: newTxnId,
      date: now,
      material: `Redeemed: ${rew.title}`,
      weight: '-',
      reward: `-${rew.cost}`,
      type: 'redeem',
      status: 'Disbursed'
    });

    this.saveCollector(collector);
    this.showToast(`Success! You redeemed "${rew.title}". Your digital voucher has been generated.`, 'success');
  }
};

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    ECOSWAP_APP.init();
  });
}

// Global reference
if (typeof window !== 'undefined') {
  window.ECOSWAP_APP = ECOSWAP_APP;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ECOSWAP_APP;
}
