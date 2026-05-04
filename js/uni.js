// uni.js — modal logic only.
// Cards, filtering, and the grid are now rendered by React (UniSearchFilter.jsx).

window.appData.then(() => {

  const modal    = document.getElementById('uniModal');
  const closeBtn = document.querySelector('.close-modal');
  const saveBtn  = document.querySelector('.save-btn');

  // Tracks the university currently shown in the modal so the save button can use it
  let _currentUni = null;

  // Called by React UniCard when a card is clicked
  window.openUniModal = (uni) => {
    _currentUni = uni;

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
      const isSaved = typeof fav_isUniSaved === 'function' && fav_isUniSaved(uni.id);
      saveBtn.classList.toggle('active', isSaved);
      const icon = saveBtn.querySelector('i');
      const text = saveBtn.querySelector('span');
      if (icon) icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      if (text) text.textContent = isSaved ? 'ХАДГАЛАГДСАН' : 'ХАДГАЛАХ';
    }

    modal.style.display = 'block';
  };

  // ── Modal save button ─────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn || !_currentUni) return;

    btn.classList.toggle('active');
    const isNowActive = btn.classList.contains('active');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    if (isNowActive) {
      icon?.classList.replace('fa-regular', 'fa-solid');
      if (text) text.textContent = 'ХАДГАЛАГДСАН';
      typeof fav_saveUni === 'function' && fav_saveUni(_currentUni);
    } else {
      icon?.classList.replace('fa-solid', 'fa-regular');
      if (text) text.textContent = 'ХАДГАЛАХ';
      typeof fav_removeUni === 'function' && fav_removeUni(_currentUni.id);
    }
    // Notify React cards to re-sync their heart state
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  });

  // ── Close modal ───────────────────────────────────────────────
  closeBtn?.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
