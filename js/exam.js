// ─────────────────────────────────────────────────────────────────────────────
//  exam.js  –  Шалгалтын мэдээллийн хуудасны бүх JavaScript
//  Өгөгдлийг data.js-ийн EXAMS, EXAM_ICONS, EXAM_DESCRIPTIONS-аас ачаална
// ─────────────────────────────────────────────────────────────────────────────

/* ── MOBILE SIDEBAR TOGGLE ── */
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('app-sidebar');
const overlay = document.getElementById('sidebar-overlay');

menuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('is-open');
  overlay.classList.toggle('is-visible');
});
overlay?.addEventListener('click', () => {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('is-visible');
});

/* ── SVG helper ── */
function svgIcon(path, size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round">${path}</svg>`;
}

const icons = {
  target:   svgIcon('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
  clock:    svgIcon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
  globe:    svgIcon('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
  bulb:     svgIcon('<line x1="9" y1="21" x2="15" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M12 3a6 6 0 0 1 6 6c0 3-2 5-3 6H9c-1-1-3-3-3-6a6 6 0 0 1 6-6z"/>'),
  book:     svgIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
  calendar: svgIcon('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
  file:     svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),
  star:     svgIcon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  check:    svgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),
  extLink:  svgIcon('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),
  chevron:  svgIcon('<polyline points="9 18 15 12 9 6"/>'),
  dollar:   svgIcon('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
};

let activeExam = 'IELTS';

/* ── Exam list ── */
function buildExamList() {
  document.getElementById('examList').innerHTML = EXAM_LIST_KEYS.map(key => {
    const active = key === activeExam;
    return `
      <button class="exam-btn${active ? ' active' : ''}" onclick="selectExam('${key}')">
        <div class="exam-icon-wrap">${EXAM_ICONS[key]}</div>
        <div class="exam-btn-text">
          <div class="exam-btn-name">${key}</div>
          <div class="exam-btn-desc">${EXAM_DESCRIPTIONS[key]}</div>
        </div>
        ${active ? `<span class="exam-chev">${icons.chevron}</span>` : ''}
      </button>`;
  }).join('');
}

/* ── Quick facts ── */
function buildQuickFacts() {
  const e = EXAMS[activeExam];
  document.getElementById('quickFacts').innerHTML = [
    { label: 'Нийт оноо',          value: e.totalScore,       icon: icons.target },
    { label: 'Бүртгэлийн хураамж', value: e.registrationFee,  icon: icons.dollar },
    { label: 'Хүчинтэй хугацаа',   value: e.validity,         icon: icons.clock }
  ].map(({ label, value, icon }) => `
    <div class="fact-item">
      <div class="fact-icon-wrap">${icon}</div>
      <div>
        <div class="fact-label">${label}</div>
        <div class="fact-value">${value}</div>
      </div>
    </div>`).join('');
}

/* ── Banner ── */
function buildBanner() {
  const e = EXAMS[activeExam];
  document.getElementById('bannerEmoji').textContent = EXAM_ICONS[activeExam];
  document.getElementById('bannerTitle').textContent = activeExam;
  document.getElementById('bannerSub').textContent   = e.fullName;
  document.getElementById('bannerTags').innerHTML = [
    e.totalScore,
    `Хугацаа: ${e.validity}`,
    `Хураамж: ${e.registrationFee}`
  ].map(t => `<span class="exam-tag">${t}</span>`).join('');
}

/* ── Score bar width ── */
function scoreWidth(score, key) {
  if (key === 'IELTS') return Math.min((parseFloat(score) / 9) * 100, 100);
  if (key === 'TOEFL') return Math.min((parseFloat(score) / 120) * 100, 100);
  if (key === 'SAT')   return Math.min((parseFloat(score.replace('+', '').split(' ')[0]) / 1600) * 100, 100);
  return 70;
}

/* ── Overview tab ── */
function buildOverview() {
  const e = EXAMS[activeExam];
  document.getElementById('pane-overview').innerHTML = `
    <div class="inner-card">
      <div class="inner-card-title">${icons.globe} ${activeExam} тухай</div>
      <p class="overview-text">${e.overview}</p>
    </div>
    <div class="inner-card">
      <div class="inner-card-title">${icons.target} Оноонд тавигдах шаардлага</div>
      ${Object.entries(e.commonRequirements).map(([lvl, sc]) => `
        <div class="score-row">
          <div class="score-meta">
            <span class="score-label">${lvl}</span>
            <span class="score-val">${sc}</span>
          </div>
          <div class="score-bar-bg"><div class="score-bar-fill" style="width:${scoreWidth(sc, activeExam)}%"></div></div>
        </div>`).join('')}
    </div>
    <div class="inner-card">
      <div class="inner-card-title">${icons.bulb} Суралцах зөвлөгөө</div>
      <ul class="tips-list">
        ${e.tips.map((tip, i) => `
          <li class="tip-item">
            <div class="tip-num">${i + 1}</div>
            <span class="tip-text">${tip}</span>
          </li>`).join('')}
      </ul>
    </div>`;
}

/* ── Format tab ── */
function buildFormat() {
  const e = EXAMS[activeExam];
  document.getElementById('pane-format').innerHTML = `
    <div class="inner-card">
      <div class="inner-card-title">${icons.file} Шалгалтын формат</div>
      ${e.format.map((s, i) => `
        <div class="format-row">
          <div class="format-num">${i + 1}</div>
          <div class="format-info">
            <div class="format-section-name">${s.section}</div>
            <div class="format-duration">${icons.clock} ${s.duration}</div>
          </div>
          <div class="format-score-badge">${s.score}</div>
        </div>`).join('')}
      <div class="total-score-banner">
        ${icons.star}
        <div>
          <div class="total-score-label">Нийт оноо</div>
          <div class="total-score-val">${e.totalScore}</div>
        </div>
      </div>
    </div>`;
}

/* ── Prep tab ── */
function buildPrep() {
  const e = EXAMS[activeExam];
  document.getElementById('pane-prep').innerHTML = `
    <div class="inner-card">
      <div class="inner-card-title">${icons.book} Бэлтгэлийн материалууд</div>
      ${e.prepResources.map(r => `
        <div class="resource-row">
          <div class="resource-icon-wrap">${icons.book}</div>
          <div class="resource-info">
            <div class="resource-name">${r.name}</div>
            <span class="resource-type-badge">${r.type}</span>
          </div>
          <a class="resource-link" href="${r.link}" target="_blank" rel="noopener">${icons.extLink} Нээх</a>
        </div>`).join('')}
    </div>
    <div class="inner-card">
      <div class="inner-card-title">${icons.bulb} Шилдэг зөвлөгөөнүүд</div>
      <div class="tips-grid">
        ${e.tips.map(tip => `
          <div class="tip-card">${icons.check}<p class="tip-card-text">${tip}</p></div>`).join('')}
      </div>
    </div>`;
}

/* ── Dates tab ── */
function buildDates() {
  const e = EXAMS[activeExam];
  document.getElementById('pane-dates').innerHTML = `
    <div class="inner-card">
      <div class="inner-card-title">${icons.calendar} ${activeExam} шалгалтын ойрын огноонууд</div>
      ${e.upcomingDates.map((date, i) => {
        const parts = date.split(',')[0].split(' ');
        return `
        <div class="date-row">
          <div class="date-box">
            <span class="date-day">${parts[1]}</span>
            <span class="date-month">${parts[0]}</span>
          </div>
          <div class="date-info">
            <div class="date-label">${date}</div>
            <div class="date-sub">${i === 0 ? 'Дараагийн боломжит огноо' : `Шалгалтын сесс ${i + 1}`}</div>
          </div>
          ${i === 0 ? '<span class="badge-upcoming">Ойрхон</span>' : ''}
        </div>`;
      }).join('')}
      <div class="reg-tip-box">
        ${icons.bulb}
        <div>
          <div class="reg-tip-title">Бүртгэлийн зөвлөгөө</div>
          <p class="reg-tip-text">Дуртай шалгалтын төвөө болон цагийн үүрийг баталгаажуулахын тулд шалгалтын өдрөөс дор хаяж 4–6 долоо хоногийн өмнө бүртгүүлнэ үү.</p>
        </div>
      </div>
    </div>`;
}

/* ── Tab switcher ── */
function setTab(tab) {
  document.querySelectorAll('.etab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.etab-pane').forEach(p =>
    p.classList.toggle('active', p.id === 'pane-' + tab));
}

/* ── Select exam (called from onclick) ── */
function selectExam(key) {
  activeExam = key;
  buildExamList();
  buildQuickFacts();
  buildBanner();
  buildOverview();
  buildFormat();
  buildPrep();
  buildDates();
  setTab('overview');
}

/* ── Tab button listeners ── */
document.querySelectorAll('.etab-btn').forEach(btn =>
  btn.addEventListener('click', () => setTab(btn.dataset.tab)));

/* ── Initial render ── */
buildExamList();
buildQuickFacts();
buildBanner();
buildOverview();
buildFormat();
buildPrep();
buildDates();
