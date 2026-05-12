// favorites.js – per-user saved universities and scholarships (localStorage).
// Keys are scoped to the logged-in user's email so favorites never bleed
// between accounts and persist across page refreshes.

function _favKey(base) {
  try {
    const u = JSON.parse(localStorage.getItem('ns_session'));
    return u?.email ? `${base}_${u.email}` : base;
  } catch {
    return base;
  }
}

function _favUserEmail() {
  try {
    const u = JSON.parse(localStorage.getItem('ns_session'));
    return u?.email || 'guest';
  } catch {
    return 'guest';
  }
}

function _favApiBase() {
  return window.API_BASE_URL || (window.location.port === '3000' ? '' : 'http://localhost:3000');
}

function _favSync(type, method, itemOrId) {
  const userEmail = _favUserEmail();
  const base = _favApiBase();
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  let url = `${base}/api/favorites`;

  if (method === 'POST') {
    options.body = JSON.stringify({ userEmail, type, item: itemOrId });
  } else {
    url += `/${type}/${encodeURIComponent(itemOrId)}?userEmail=${encodeURIComponent(userEmail)}`;
  }

  fetch(url, options).catch((error) => {
    console.warn('Favorite backend sync failed; localStorage is still updated.', error);
  });
}

/* ── Storage helpers ─────────────────────────────────────────────────────── */

function fav_getSavedUnis() {
  try { return JSON.parse(localStorage.getItem(_favKey('ns_saved_unis')) || '[]'); }
  catch { return []; }
}

function fav_getSavedScholars() {
  try { return JSON.parse(localStorage.getItem(_favKey('ns_saved_scholars')) || '[]'); }
  catch { return []; }
}

function fav_isUniSaved(id) {
  return fav_getSavedUnis().some(u => u.id === id);
}

function fav_isScholarSaved(id) {
  return fav_getSavedScholars().some(s => s.id === id);
}

function fav_saveUni(uni) {
  const saved = fav_getSavedUnis();
  const item = {
    id:             uni.id,
    name:           uni.name,
    nameEn:         uni.nameEn,
    logo:           uni.logo,
    location:       uni.location,
    rank:           uni.rank,
    rankLabel:      uni.rankLabel,
    type:           uni.type,
    tuition:        uni.tuition,
    deadline:       uni.deadline,
    deadlineLabel:  uni.deadlineLabel,
    acceptanceRate: uni.acceptanceRate,
    hasScholarship: uni.hasScholarship,
    tags:           uni.tags || [],
    programLabels:  uni.programLabels || [],
    requirements:   uni.requirements || [],
    website:        uni.website,
    savedAt:        new Date().toISOString()
  };
  const existing = saved.findIndex(u => u.id === uni.id);
  if (existing >= 0) saved[existing] = { ...saved[existing], ...item };
  else saved.push(item);
  localStorage.setItem(_favKey('ns_saved_unis'), JSON.stringify(saved));
  _favSync('university', 'POST', item);
}

function fav_removeUni(id) {
  localStorage.setItem(
    _favKey('ns_saved_unis'),
    JSON.stringify(fav_getSavedUnis().filter(u => u.id !== id))
  );
  _favSync('university', 'DELETE', id);
}

function fav_saveScholar(sch) {
  const saved = fav_getSavedScholars();
  const item = {
    id:           sch.id,
    logo:         sch.logo,
    name:         sch.name,
    provider:     sch.provider,
    deadline:     sch.deadline,
    funding:      sch.funding,
    fundingLabel: sch.fundingLabel || (sch.funding === 'full' ? 'Бүрэн' : 'Хагас'),
    fundingType:  sch.fundingType,
    amount:       sch.amount,
    level:        sch.level || '',
    description:  sch.description || '',
    requirements: sch.requirements || [],
    covers:       sch.covers || [],
    tags:         sch.tags || [],
    applyLink:    sch.applyLink,
    savedAt:      new Date().toISOString()
  };
  const existing = saved.findIndex(s => s.id === sch.id);
  if (existing >= 0) saved[existing] = { ...saved[existing], ...item };
  else saved.push(item);
  localStorage.setItem(_favKey('ns_saved_scholars'), JSON.stringify(saved));
  _favSync('scholarship', 'POST', item);
}

function fav_removeScholar(id) {
  localStorage.setItem(
    _favKey('ns_saved_scholars'),
    JSON.stringify(fav_getSavedScholars().filter(s => s.id !== id))
  );
  _favSync('scholarship', 'DELETE', id);
}

/* ── Dashboard rendering ─────────────────────────────────────────────────── */

function fav_renderDashboard() {
  _renderSavedUnis();
  _renderSavedScholars();
}

function _renderSavedUnis() {
  const list = document.getElementById('savedUniList');
  if (!list) return;
  const unis = fav_getSavedUnis();
  if (unis.length === 0) {
    list.innerHTML = '<div class="saved-empty">Хадгалсан их сургууль байхгүй байна. <a href="uni.html">Хайж олох →</a></div>';
    return;
  }
  list.innerHTML = unis.map(u => `
    <div class="saved-item">
      <div class="saved-icon si-indigo">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
        </svg>
      </div>
      <div class="saved-info">
        <div class="saved-name">${u.name}</div>
        <div class="saved-meta">${u.location}</div>
      </div>
      <div class="saved-actions">
        ${u.hasScholarship
          ? '<span class="badge badge-green">Тэтгэлэгт</span>'
          : `<span class="badge badge-amber">${u.tags[0] || ''}</span>`}
        <div class="saved-due">Хугацаа: ${u.deadline}</div>
        <button class="saved-remove-btn" aria-label="Устгах" data-uni-id="${u.id}">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" width="12" height="12">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.saved-remove-btn[data-uni-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      fav_removeUni(btn.dataset.uniId);
      fav_renderDashboard();
    });
  });
}

function _renderSavedScholars() {
  const list = document.getElementById('savedScholList');
  if (!list) return;
  const scholars = fav_getSavedScholars();
  if (scholars.length === 0) {
    list.innerHTML = '<div class="saved-empty">Хадгалсан тэтгэлэг байхгүй байна. <a href="scholar.html">Хайж олох →</a></div>';
    return;
  }
  list.innerHTML = scholars.map(s => `
    <div class="saved-item">
      <div class="saved-icon si-purple">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      </div>
      <div class="saved-info">
        <div class="saved-name">${s.name}</div>
        <div class="saved-meta">${s.provider}${s.level ? ' · ' + s.level : ''}</div>
      </div>
      <div class="saved-actions">
        <span class="badge ${s.funding === 'full' ? 'badge-green' : 'badge-amber'}">${s.fundingLabel}</span>
        <div class="saved-due">${s.deadline}</div>
        <button class="saved-remove-btn" aria-label="Устгах" data-schol-id="${s.id}">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" width="12" height="12">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.saved-remove-btn[data-schol-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      fav_removeScholar(btn.dataset.scholId);
      fav_renderDashboard();
    });
  });
}

/* ── Auto-render on dashboard load ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', fav_renderDashboard);
