// ─────────────────────────────────────────────────────────────────────────────
//  uni.js  –  Их сургуулийн хуудасны бүх JavaScript
//  Өгөгдлийг data.js-ийн UNIVERSITIES массиваас ачаалж ES6 аргаар рендерлэнэ
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM лавлагаанууд ────────────────────────────────────────────────────────
  const grid          = document.getElementById('uniGrid');
  const resultsHeader = document.getElementById('uniResultsHeader');
  const searchInput   = document.querySelector('.uni-search-input');
  const filterBtn     = document.querySelector('.uni-filter-btn');
  const filterPanel   = document.getElementById('filterPanel');
  const regionSelect  = document.getElementById('regionSelect');
  const programSelect = document.getElementById('programSelect');
  const rankSelect    = document.getElementById('rankSelect');
  const tuitionSelect = document.getElementById('tuitionSelect');
  const scholarOnly   = document.getElementById('scholarOnly');
  const resetBtn      = document.querySelector('.reset-btn');
  const modal         = document.getElementById('uniModal');
  const closeBtn      = document.querySelector('.close-modal');
  const saveBtn       = document.querySelector('.save-btn');

  // ── SVG templates ──────────────────────────────────────────────────────────
  const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;

  const scholarSVG = `<svg class="icon icon-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>`;

  // ── Картын HTML үүсгэх ──────────────────────────────────────────────────────
  const buildCard = (uni) => {
    const scholarTag = uni.hasScholarship
      ? `<span class="uni-tag uni-tag--scholar">${scholarSVG} Тэтгэлэгт</span>`
      : '';

    const extraTags = uni.tags
      .map(tag => `<span class="uni-tag">${tag}</span>`)
      .join('');

    return `
      <div class="uni-card" data-id="${uni.id}">
        <div class="uni-card__img-wrap">
          <div class="uni-card__img-fallback">${uni.logo}</div>
          <img src="${uni.image}" alt="${uni.nameEn}" loading="lazy" onerror="this.style.display='none'"/>
          <span class="uni-card__rank">${uni.rankLabel}</span>
          <button class="heart-btn" aria-label="Хадгалах">${heartSVG}</button>
          <span class="uni-card__type">${uni.type}</span>
        </div>
        <div class="uni-card__body">
          <div class="uni-card__identity">
            <div class="uni-card__logo">${uni.logo}</div>
            <div class="uni-card__info">
              <div class="uni-card__name">${uni.name}</div>
              <div class="uni-card__location">${uni.location}</div>
            </div>
          </div>
          <div class="uni-card__tags">
            ${extraTags}
            ${scholarTag}
          </div>
          <hr class="uni-card__divider"/>
          <div class="uni-card__stats">
            <div>
              <div class="uni-card__stat-label">Төлбөр</div>
              <div class="uni-card__stat-value">${uni.tuition}</div>
            </div>
            <div>
              <div class="uni-card__stat-label">Хугацаа</div>
              <div class="uni-card__stat-value">${uni.deadline}</div>
            </div>
          </div>
        </div>
      </div>`;
  };

  // ── Модалд өгөгдөл дүүргэх ─────────────────────────────────────────────────
  const openModal = (uni) => {
    document.getElementById('uniModalImg').style.backgroundImage  = `url('${uni.image}')`;
    document.getElementById('uniModalName').textContent           = uni.nameEn;
    document.getElementById('uniModalLocation').textContent       = uni.location;
    document.getElementById('uniModalRank').textContent           = `#${uni.rank}`;
    document.getElementById('uniModalRate').textContent           = uni.acceptanceRate;
    document.getElementById('uniModalType').textContent           = uni.type;
    document.getElementById('uniModalTuition').textContent        = uni.tuition;
    document.getElementById('uniModalDeadline').textContent       = uni.deadlineLabel;
    document.getElementById('uniModalLink').href                  = uni.website;

    document.getElementById('uniModalPrograms').innerHTML =
      uni.programLabels.map(p => `<span>${p}</span>`).join('');

    document.getElementById('uniModalRequirements').innerHTML =
      uni.requirements.map(r => `<li>${r}</li>`).join('');

    if (saveBtn) {
      saveBtn.classList.remove('active');
      const icon = saveBtn.querySelector('i');
      const text = saveBtn.querySelector('span');
      if (icon) icon.className = 'fa-regular fa-heart';
      if (text) text.textContent = 'ХАДГАЛАХ';
    }

    modal.style.display = 'block';
  };

  // ── Шүүлт + эрэмбэлэлт ───────────────────────────────────────────────────
  const getFiltered = () => {
    const query    = searchInput?.value.toLowerCase().trim() ?? '';
    const region   = regionSelect?.value   ?? 'all';
    const program  = programSelect?.value  ?? 'all';
    const sort     = rankSelect?.value     ?? 'ranking';
    const tuition  = tuitionSelect?.value  ?? 'all';
    const onlyScholar = scholarOnly?.checked ?? false;

    let result = UNIVERSITIES.filter(uni => {
      if (query && !uni.name.toLowerCase().includes(query)
                && !uni.nameEn.toLowerCase().includes(query)
                && !uni.location.toLowerCase().includes(query)) return false;
      if (region !== 'all' && uni.region !== region) return false;
      if (program !== 'all' && !uni.programs.includes(program)) return false;
      if (tuition !== 'all' && uni.tuitionCategory !== tuition) return false;
      if (onlyScholar && !uni.hasScholarship) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'ranking')      return a.rank - b.rank;
      if (sort === 'tuition-low')  return a.tuitionUSD - b.tuitionUSD;
      if (sort === 'tuition-high') return b.tuitionUSD - a.tuitionUSD;
      if (sort === 'name')         return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  };

  // ── Гридийг дахин бүтээх ──────────────────────────────────────────────────
  const render = () => {
    const filtered = getFiltered();
    grid.innerHTML = filtered.map(buildCard).join('');
    resultsHeader.textContent = `Нийт ${filtered.length} сургууль олдлоо`;
    attachCardListeners();
  };

  // ── Картын event listener-үүдийг холбох ──────────────────────────────────
  const attachCardListeners = () => {
    grid.querySelectorAll('.uni-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.heart-btn')) {
          e.target.closest('.heart-btn').classList.toggle('saved');
          return;
        }
        const uni = UNIVERSITIES.find(u => u.id === card.dataset.id);
        if (uni) openModal(uni);
      });
    });
  };

  // ── Шүүлтийн хяналтуудыг холбох ──────────────────────────────────────────
  [searchInput, regionSelect, programSelect, rankSelect, tuitionSelect, scholarOnly]
    .forEach(el => el?.addEventListener('change', render));

  searchInput?.addEventListener('input', render);

  // ── Шүүлтүүр нээх/хаах ───────────────────────────────────────────────────
  filterBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    filterPanel?.classList.toggle('active');
  });

  window.addEventListener('click', (e) => {
    if (filterPanel && !filterPanel.contains(e.target) && e.target !== filterBtn) {
      filterPanel.classList.remove('active');
    }
    if (e.target === modal) modal.style.display = 'none';
  });

  // ── Reset товч ────────────────────────────────────────────────────────────
  resetBtn?.addEventListener('click', () => {
    if (searchInput)   searchInput.value  = '';
    if (regionSelect)  regionSelect.value  = 'all';
    if (programSelect) programSelect.value = 'all';
    if (rankSelect)    rankSelect.value    = 'ranking';
    if (tuitionSelect) tuitionSelect.value = 'all';
    if (scholarOnly)   scholarOnly.checked = false;
    render();
  });

  // ── Модал хаах ────────────────────────────────────────────────────────────
  closeBtn?.addEventListener('click', () => { modal.style.display = 'none'; });

  // ── ХАДГАЛАХ товч ─────────────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn) return;
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    if (btn.classList.contains('active')) {
      icon?.classList.replace('fa-regular', 'fa-solid');
      if (text) text.textContent = 'ХАДГАЛАГДСАН';
    } else {
      icon?.classList.replace('fa-solid', 'fa-regular');
      if (text) text.textContent = 'ХАДГАЛАХ';
    }
  });

  // ── Эхний рендер ─────────────────────────────────────────────────────────
  render();
});
