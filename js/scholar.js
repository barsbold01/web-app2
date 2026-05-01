// ─────────────────────────────────────────────────────────────────────────────
//  scholar.js  –  Тэтгэлэгийн хуудасны бүх JavaScript
//  Өгөгдлийг data.js-ийн SCHOLARSHIPS массиваас ачаалж ES6 аргаар рендерлэнэ
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM ────────────────────────────────────────────────────────
  const grid          = document.getElementById('scholarGrid');
  const resultsHeader = document.getElementById('scholarResultsHeader');
  const searchInput   = document.querySelector('.uni-search-input');
  const filterBtn     = document.querySelector('.uni-filter-btn');
  const filterPanel   = document.getElementById('filterPanel');
  const regionSelect  = document.getElementById('regionSelect');
  const resetBtn      = document.querySelector('.reset-btn');
  const tabBtns       = document.querySelectorAll('.tab-btn');
  const catBtns       = document.querySelectorAll('.cat-btn');
  const modal         = document.getElementById('scholModal');
  const closeBtn      = document.querySelector('.schol-close-modal');
  const saveBtn       = document.querySelector('.schol-save-btn');
  const overlay       = document.querySelector('.schol-modal-overlay');

  // ── SVG template ──────────────────────────────────────────────────────────
  const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;

  // ── Идэвхтэй tab болон filter state ──────────────────────────────────────
  let activeTab = 'all';   // 'all' | 'full' | 'partial'

  // ── Картын HTML үүсгэх ──────────────────────────────────────────────────────
  const buildCard = (sch) => `
    <div class="scholar-card" data-id="${sch.id}">
      <div class="scholar-card__header">
        <div class="scholar-card__logo">${sch.logo}</div>
        <div class="scholar-card__title-wrap">
          <h3 class="scholar-card__name">${sch.name}</h3>
          <p class="scholar-card__provider">${sch.provider}</p>
        </div>
        <button class="heart-btn" aria-label="Хадгалах">${heartSVG}</button>
      </div>
      <div class="scholar-card__funding-box">
        <span class="funding-label">${sch.fundingLabel}</span>
        <div class="funding-type">${sch.fundingType}</div>
      </div>
      <div class="scholar-card__tags">
        ${sch.tags.map(t => `<span class="uni-tag">${t}</span>`).join('')}
      </div>
      <div class="scholar-card__footer">
        <div class="scholar-card__deadline">
          <span class="deadline-label">ДУУСАХ ХУГАЦАА</span>
          <span class="deadline-date">${sch.deadline}</span>
        </div>
        <button class="apply-btn">БҮРТГҮҮЛЭХ</button>
      </div>
    </div>`;

  // ── Шүүлт ─────────────────────────────────────────────────────────────────
  const getFiltered = () => {
    const query  = searchInput?.value.toLowerCase().trim() ?? '';
    const region = regionSelect?.value ?? 'all';

    return SCHOLARSHIPS.filter(sch => {
      if (activeTab === 'full'    && sch.funding !== 'full')    return false;
      if (activeTab === 'partial' && sch.funding !== 'partial') return false;
      if (region !== 'all' && sch.country !== region) return false;
      if (query && !sch.name.toLowerCase().includes(query)
               && !sch.provider.toLowerCase().includes(query)) return false;
      return true;
    });
  };

  // ── Хадгалсан төлвийг сэргээх ────────────────────────────────────────────
  const restoreHeartStates = () => {
    if (typeof fav_isScholarSaved !== 'function') return;
    grid.querySelectorAll('.scholar-card').forEach(card => {
      if (fav_isScholarSaved(card.dataset.id)) {
        card.querySelector('.heart-btn')?.classList.add('is-active');
      }
    });
  };

  // ── Гридийг дахин бүтээх ──────────────────────────────────────────────────
  const render = () => {
    const filtered = getFiltered();
    grid.innerHTML = filtered.map(buildCard).join('');
    resultsHeader.textContent = `Нийт ${filtered.length} тэтгэлэг олдлоо`;
    attachCardListeners();
    restoreHeartStates();
  };

  // ── Модалд өгөгдөл дүүргэх ─────────────────────────────────────────────────
  const openModal = (sch) => {
    document.getElementById('sm-logo').textContent    = sch.logo;
    document.getElementById('sm-title').textContent   = sch.name;
    document.getElementById('sm-provider').innerHTML  = `<i class="fas fa-university"></i> ${sch.provider}`;
    document.getElementById('sm-funding').textContent = sch.fundingType;
    document.getElementById('sm-amount').textContent  = sch.amount;
    document.getElementById('sm-deadline').textContent= sch.deadline;
    document.getElementById('sm-level').textContent   = sch.level;

    const descEl = document.getElementById('sm-description');
    if (descEl) descEl.textContent = sch.description;

    const reqEl = document.getElementById('sm-requirements');
    if (reqEl) reqEl.innerHTML = sch.requirements.map(r => `<li>${r}</li>`).join('');

    const covEl = document.getElementById('sm-covers');
    if (covEl) covEl.innerHTML = sch.covers.map(c => `<span>${c}</span>`).join('');

    const linkEl = document.getElementById('sm-apply-link');
    if (linkEl) linkEl.href = sch.applyLink;

    if (saveBtn) {
    const cardEl = grid.querySelector(`.scholar-card[data-id="${sch.id}"]`);
    const isSaved = cardEl?.querySelector('.heart-btn')?.classList.contains('is-active');
    saveBtn.classList.toggle('active', !!isSaved);
    const icon = saveBtn.querySelector('i');
    if (icon) icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    saveBtn.dataset.scholId = sch.id;
  }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  // ── Модал хаах ────────────────────────────────────────────────────────────
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  // ── Картын event listener-үүдийг холбох ──────────────────────────────────
  const attachCardListeners = () => {
    grid.querySelectorAll('.scholar-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.apply-btn') || e.target.closest('.heart-btn')) return;
        const sch = SCHOLARSHIPS.find(s => s.id === card.dataset.id);
        if (sch) openModal(sch);
      });

      const heartBtn = card.querySelector('.heart-btn');
      heartBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        heartBtn.classList.toggle('is-active');
        const sch = SCHOLARSHIPS.find(s => s.id === card.dataset.id);
        if (sch && typeof fav_saveScholar === 'function') {
          heartBtn.classList.contains('is-active')
            ? fav_saveScholar(sch)
            : fav_removeScholar(sch.id);
        }
      });

      const applyBtn = card.querySelector('.apply-btn');
      applyBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const sch = SCHOLARSHIPS.find(s => s.id === card.dataset.id);
        if (sch) window.open(sch.applyLink, '_blank', 'noopener');
      });
    });
  };

  // ── Tab товчлуурууд ───────────────────────────────────────────────────────
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = btn.textContent.trim();
      if (label.includes('БҮТЭН'))  activeTab = 'full';
      else if (label.includes('ХАГАС')) activeTab = 'partial';
      else activeTab = 'all';
      render();
    });
  });

  // ── Category товчлуурууд (UI тоглоом) ─────────────────────────────────────
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Шүүлтүүр нээх/хаах ───────────────────────────────────────────────────
  filterBtn?.addEventListener('click', () => {
    filterPanel?.classList.toggle('active');
  });

  window.addEventListener('click', (e) => {
    if (filterPanel && !filterPanel.contains(e.target) && e.target !== filterBtn) {
      filterPanel.classList.remove('active');
    }
  });

  // ── Хайлт + шүүлт өөрчлөлт ──────────────────────────────────────────────
  searchInput?.addEventListener('input', render);
  regionSelect?.addEventListener('change', render);

  // ── Reset товч ────────────────────────────────────────────────────────────
  resetBtn?.addEventListener('click', () => {
    if (searchInput)  searchInput.value  = '';
    if (regionSelect) regionSelect.value = 'all';
    activeTab = 'all';
    tabBtns.forEach((b, i) => b.classList.toggle('active', i === 0));
    render();
  });

  // ── Модал хаах үйлдлүүд ──────────────────────────────────────────────────
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── ХАДГАЛАХ toggle ────────────────────────────────────────────────────────
  saveBtn?.addEventListener('click', () => {
    saveBtn.classList.toggle('active');
    const isNowActive = saveBtn.classList.contains('active');
    const icon = saveBtn.querySelector('i');
    if (isNowActive) {
      icon?.classList.replace('fa-regular', 'fa-solid');
    } else {
      icon?.classList.replace('fa-solid', 'fa-regular');
    }
    // Card-ын heart-тай sync
    const scholId = saveBtn.dataset.scholId;
    if (scholId) {
      const cardHeart = grid.querySelector(`.scholar-card[data-id="${scholId}"] .heart-btn`);
      if (cardHeart) cardHeart.classList.toggle('is-active', isNowActive);
      if (typeof fav_saveScholar === 'function') {
        const sch = SCHOLARSHIPS.find(s => s.id === scholId);
        if (sch) { isNowActive ? fav_saveScholar(sch) : fav_removeScholar(scholId); }
      }
    }
  });

  // ── Эхний рендер ─────────────────────────────────────────────────────────
  render();
});
