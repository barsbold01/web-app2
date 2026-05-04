// University page — card rendering and modal logic.
// Filter state is owned by the React UniSearchFilter component (react/src/UniSearchFilter.jsx)
// and communicated via the custom 'filtersChanged' window event.

window.appData.then(() => {

  // ── DOM refs ──────────────────────────────────────────────────
  const grid          = document.getElementById('uniGrid');
  const resultsHeader = document.getElementById('uniResultsHeader');
  const modal         = document.getElementById('uniModal');
  const closeBtn      = document.querySelector('.close-modal');
  const saveBtn       = document.querySelector('.save-btn');

  // ── Filter state (driven by React component) ──────────────────
  let currentFilters = { query: '', region: 'all', program: 'all', sort: 'ranking', tuition: 'all', scholarOnly: false };

  // ── SVG templates ─────────────────────────────────────────────
  const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;

  const scholarSVG = `<svg class="icon icon-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>`;

  // ── Card HTML builder ─────────────────────────────────────────
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

  // ── Modal population ──────────────────────────────────────────
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
    if (saveBtn) {
      const cardEl = grid.querySelector(`.uni-card[data-id="${uni.id}"]`);
      const isSaved = cardEl?.querySelector('.heart-btn')?.classList.contains('is-active');

      saveBtn.classList.toggle('active', !!isSaved);
      const icon = saveBtn.querySelector('i');
      const text = saveBtn.querySelector('span');
      if (icon) icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      if (text) text.textContent = isSaved ? 'ХАДГАЛАГДСАН' : 'ХАДГАЛАХ';

      saveBtn.dataset.uniId = uni.id;
    }

    modal.style.display = 'block';
  };

  // ── Filter + sort ─────────────────────────────────────────────
  const getFiltered = () => {
    const { region, program, sort, tuition, scholarOnly } = currentFilters;
    const query = currentFilters.query.toLowerCase().trim();

    let result = UNIVERSITIES.filter(uni => {
      if (query && !uni.name.toLowerCase().includes(query)
                && !uni.nameEn.toLowerCase().includes(query)
                && !uni.location.toLowerCase().includes(query)) return false;
      if (region !== 'all' && uni.region !== region) return false;
      if (program !== 'all' && !uni.programs.includes(program)) return false;
      if (tuition !== 'all' && uni.tuitionCategory !== tuition) return false;
      if (scholarOnly && !uni.hasScholarship) return false;
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

  // ── Restore saved heart states ────────────────────────────────
  const restoreHeartStates = () => {
    if (typeof fav_isUniSaved !== 'function') return;
    grid.querySelectorAll('.uni-card').forEach(card => {
      if (fav_isUniSaved(card.dataset.id)) {
        card.querySelector('.heart-btn')?.classList.add('is-active');
      }
    });
  };

  // ── Grid render ───────────────────────────────────────────────
  const render = () => {
    const filtered = getFiltered();
    grid.innerHTML = filtered.map(buildCard).join('');
    resultsHeader.textContent = `Нийт ${filtered.length} сургууль олдлоо`;
    attachCardListeners();
    restoreHeartStates();
  };

  // ── Card event listeners ──────────────────────────────────────
  const attachCardListeners = () => {
    grid.querySelectorAll('.uni-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const heartBtn = e.target.closest('.heart-btn');
        if (heartBtn) {
          heartBtn.classList.toggle('is-active');
          const uni = UNIVERSITIES.find(u => u.id === card.dataset.id);
          if (uni && typeof fav_saveUni === 'function') {
            heartBtn.classList.contains('is-active')
              ? fav_saveUni(uni)
              : fav_removeUni(uni.id);
          }
          return;
        }
        const uni = UNIVERSITIES.find(u => u.id === card.dataset.id);
        if (uni) openModal(uni);
      });
    });
  };

  // ── React filter event ────────────────────────────────────────
  window.addEventListener('filtersChanged', (e) => {
    currentFilters = e.detail;
    render();
  });

  // ── Modal backdrop click ──────────────────────────────────────
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ── Modal close button ────────────────────────────────────────
  closeBtn?.addEventListener('click', () => { modal.style.display = 'none'; });

  // ── Modal save button ─────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn) return;
    btn.classList.toggle('active');
    const isNowActive = btn.classList.contains('active');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    if (isNowActive) {
      icon?.classList.replace('fa-regular', 'fa-solid');
      if (text) text.textContent = 'ХАДГАЛАГДСАН';
    } else {
      icon?.classList.replace('fa-solid', 'fa-regular');
      if (text) text.textContent = 'ХАДГАЛАХ';
    }

    const uniId = btn.dataset.uniId;
    if (uniId) {
      const cardHeart = grid.querySelector(`.uni-card[data-id="${uniId}"] .heart-btn`);
      if (cardHeart) cardHeart.classList.toggle('is-active', isNowActive);
      if (typeof fav_saveUni === 'function') {
        const uni = UNIVERSITIES.find(u => u.id === uniId);
        if (uni) { isNowActive ? fav_saveUni(uni) : fav_removeUni(uniId); }
      }
    }
  });

  // ── Initial render ────────────────────────────────────────────
  render();
});
