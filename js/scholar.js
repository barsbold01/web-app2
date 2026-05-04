// scholar.js — modal logic only.
// Cards, filtering, and the grid are now rendered by React (ScholarSearchFilter.jsx).

window.appData.then(() => {

  const modal    = document.getElementById('scholModal');
  const closeBtn = document.querySelector('.schol-close-modal');
  const saveBtn  = document.querySelector('.schol-save-btn');
  const overlay  = document.querySelector('.schol-modal-overlay');

  let _currentScholar = null;

  // Called by React ScholarCard when a card is clicked
  window.openScholarModal = (sch) => {
    _currentScholar = sch;

    document.getElementById('sm-logo').textContent     = sch.logo;
    document.getElementById('sm-title').textContent    = sch.name;
    document.getElementById('sm-provider').innerHTML   = `<i class="fas fa-university"></i> ${sch.provider}`;
    document.getElementById('sm-funding').textContent  = sch.fundingType;
    document.getElementById('sm-amount').textContent   = sch.amount;
    document.getElementById('sm-deadline').textContent = sch.deadline;
    document.getElementById('sm-level').textContent    = sch.level;

    const descEl = document.getElementById('sm-description');
    if (descEl) descEl.textContent = sch.description;

    const reqEl = document.getElementById('sm-requirements');
    if (reqEl) reqEl.innerHTML = sch.requirements.map(r => `<li>${r}</li>`).join('');

    const covEl = document.getElementById('sm-covers');
    if (covEl) covEl.innerHTML = sch.covers.map(c => `<span>${c}</span>`).join('');

    const linkEl = document.getElementById('sm-apply-link');
    if (linkEl) linkEl.href = sch.applyLink;

    if (saveBtn) {
      const isSaved = typeof fav_isScholarSaved === 'function' && fav_isScholarSaved(sch.id);
      saveBtn.classList.toggle('active', isSaved);
      const icon = saveBtn.querySelector('i');
      if (icon) icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  // ── Modal save button ─────────────────────────────────────────
  saveBtn?.addEventListener('click', () => {
    if (!_currentScholar) return;
    saveBtn.classList.toggle('active');
    const isNowActive = saveBtn.classList.contains('active');
    const icon = saveBtn.querySelector('i');
    if (isNowActive) {
      icon?.classList.replace('fa-regular', 'fa-solid');
      typeof fav_saveScholar === 'function' && fav_saveScholar(_currentScholar);
    } else {
      icon?.classList.replace('fa-solid', 'fa-regular');
      typeof fav_removeScholar === 'function' && fav_removeScholar(_currentScholar.id);
    }
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  });

  // ── Close modal ───────────────────────────────────────────────
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
