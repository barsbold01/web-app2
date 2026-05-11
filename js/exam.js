// Шалгалтын шинэчилсэн hub. Өгөгдөл нь data.js-ээр EXAMS global-д ачаалагдана.

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('app-sidebar');
const overlay = document.getElementById('sidebar-overlay');

menuBtn?.addEventListener('click', () => {
  sidebar?.classList.toggle('is-open');
  overlay?.classList.toggle('is-visible');
});

overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('is-open');
  overlay?.classList.remove('is-visible');
});
  
const examMeta = {
  IELTS: {
    org: 'British Council / IDP',
    category: 'english',
    tone: '#DC2626',
    soft: '#FEF2F2',
    description: 'Их Британи, Австрали болон дэлхий даяарх англи хэлний шаардлага',
    scale: 9,
    skills: ['Сонсгол', 'Унших', 'Бичих', 'Ярих'],
  },
  TOEFL: {
    org: 'ETS',    
    category: 'english',
    tone: '#0EA5E9',
    soft: '#EFF6FF',
    description: 'АНУ, Канадын их сургуулиудад түгээмэл хэрэглэгддэг англи хэлний шалгалт',
    scale: 120,
    skills: ['Reading', 'Listening', 'Speaking', 'Writing'],
  },
  SAT: {
    org: 'College Board',
    category: 'admission',
    tone: '#16A34A',
    soft: '#F0FDF4',
    description: 'АНУ-ын бакалаврын элсэлтийн академик шалгалт',
    scale: 1600,
    skills: ['Reading & Writing', 'Math'],
  },
  HSK: {
    org: 'Chinese Testing International',
    category: 'asian',
    tone: '#D97706',
    soft: '#FFFBEB',
    description: 'Хятад хэлний түвшин тогтоох стандарт шалгалт',
    scale: 300,
    skills: ['Сонсох', 'Унших', 'Бичих'],
  },
  TOPIK: {
    org: 'NIIED',
    category: 'asian',
    tone: '#2563EB',
    soft: '#EEF2FF',
    description: 'Солонгос хэлний түвшин тогтоох албан ёсны шалгалт',
    scale: 300,
    skills: ['Listening', 'Reading', 'Writing'],
  },
};

const ieltsSkills = [
  {
    name: 'Listening',
    label: 'Сонсгол',
    icon: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z"/><path d="M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2Z"/>',
    href: 'test.html?exam=IELTS&section=listening',
  },
  {
    name: 'Reading',
    label: 'Унших',
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    href: 'test.html?exam=IELTS&section=reading',
  },
  {
    name: 'Writing',
    label: 'Бичих',
    icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    href: 'test.html?exam=IELTS&section=writing',
  },
  {
    name: 'Speaking',
    label: 'Ярих',
    icon: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    href: 'test.html?exam=IELTS&section=speaking',
  },
];

const examSections = {
  IELTS: [
    {
      title: 'Listening',
      label: 'Сонсгол',
      detail: '40 асуулт, аудио ойлголт',
      icon: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z"/><path d="M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2Z"/>',
      href: 'test.html?exam=IELTS&section=listening',
    },
    {
      title: 'Reading',
      label: 'Унших',
      detail: '3 текст, 40 асуулт',
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      href: 'test.html?exam=IELTS&section=reading',
    },
    {
      title: 'Writing',
      label: 'Бичих',
      detail: 'Task 1, Task 2',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      href: 'test.html?exam=IELTS&section=writing',
    },
    {
      title: 'Speaking',
      label: 'Ярих',
      detail: '3 хэсэгтэй ярилцлага',
      icon: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
      href: 'test.html?exam=IELTS&section=speaking',
    },
  ],
  TOEFL: [
    {
      title: 'Reading',
      label: 'Унших',
      detail: 'Академик текст, үндсэн санаа',
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      href: 'test.html?exam=TOEFL&section=reading',
    },
    {
      title: 'Listening',
      label: 'Сонсгол',
      detail: 'Лекц, кампусын яриа',
      icon: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z"/><path d="M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2Z"/>',
      href: 'test.html?exam=TOEFL&section=listening',
    },
    {
      title: 'Speaking',
      label: 'Ярих',
      detail: 'Independent ба integrated',
      icon: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
      href: 'test.html?exam=TOEFL&section=speaking',
    },
    {
      title: 'Writing',
      label: 'Бичих',
      detail: 'Academic discussion, integrated',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      href: 'test.html?exam=TOEFL&section=writing',
    },
  ],
  SAT: [
    {
      title: 'Reading & Writing',
      label: 'Унших ба бичих',
      detail: 'Богино текст, хэл зүй, нотолгоо',
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
      href: 'test.html?exam=SAT&section=reading-writing',
    },
    {
      title: 'Math',
      label: 'Математик',
      detail: 'Алгебр, problem solving, geometry',
      icon: '<path d="M4 19h16"/><path d="M4 15 10 5l4 7 2-3 4 6"/><path d="M7 19v-4"/><path d="M17 19v-4"/>',
      href: 'test.html?exam=SAT&section=math',
    },
    {
      title: 'Module 1',
      label: 'Эхний модуль',
      detail: 'Суурь түвшний адаптив хэсэг',
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
      href: 'test.html?exam=SAT&section=module-1',
    },
    {
      title: 'Module 2',
      label: 'Хоёр дахь модуль',
      detail: 'Гүйцэтгэлээс хамаарах түвшин',
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/><path d="M16 16h2"/>',
      href: 'test.html?exam=SAT&section=module-2',
    },
  ],
  HSK: [
    {
      title: 'HSK 1-2',
      label: 'Суурь түвшин',
      detail: 'Өдөр тутмын үг хэллэг',
      icon: '<path d="M4 5h16"/><path d="M4 19h16"/><path d="M6 5v14"/><path d="M18 5v14"/><path d="M9 9h6"/><path d="M9 13h6"/>',
      href: 'test.html?exam=HSK&section=hsk-1-2',
    },
    {
      title: 'HSK 3-4',
      label: 'Дунд түвшин',
      detail: 'Их сургуулийн суурь шаардлага',
      icon: '<path d="M4 5h16"/><path d="M4 19h16"/><path d="M6 5v14"/><path d="M18 5v14"/><path d="M9 9h6"/><path d="M9 13h3"/>',
      href: 'test.html?exam=HSK&section=hsk-3-4',
    },
    {
      title: 'HSK 5-6',
      label: 'Ахисан түвшин',
      detail: 'Академик ба мэргэжлийн хэрэглээ',
      icon: '<path d="M4 5h16"/><path d="M4 19h16"/><path d="M6 5v14"/><path d="M18 5v14"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>',
      href: 'test.html?exam=HSK&section=hsk-5-6',
    },
  ],
  TOPIK: [
    {
      title: 'TOPIK I',
      label: 'Түвшин 1-2',
      detail: 'Сонсох, унших суурь хэсэг',
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      href: 'test.html?exam=TOPIK&section=topik-i',
    },
    {
      title: 'Listening',
      label: 'Сонсгол',
      detail: 'Өдөр тутмын ба академик яриа',
      icon: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z"/><path d="M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2Z"/>',
      href: 'test.html?exam=TOPIK&section=listening',
    },
    {
      title: 'Reading',
      label: 'Унших',
      detail: 'Урт текст, дүрмийн хэрэглээ',
      icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
      href: 'test.html?exam=TOPIK&section=reading',
    },
    {
      title: 'Writing',
      label: 'Бичих',
      detail: 'TOPIK II бичгийн даалгавар',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      href: 'test.html?exam=TOPIK&section=writing',
    },
  ],
};

let selectedFilter = 'all';
let searchTerm = '';

function svgIcon(path, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function examKeys() {
  return window.EXAM_LIST_KEYS || Object.keys(window.EXAMS || {});
}

function scorePercent(key) {
  const score = EXAMS[key].totalScore;
  if (key === 'IELTS') return 78;
  if (key === 'TOEFL') return 100;
  if (key === 'SAT') return 80;
  if (key === 'HSK') return 68;
  if (key === 'TOPIK') return 84;

  const number = parseFloat(String(score).replace(/[^\d.]/g, ''));
  const scale = examMeta[key]?.scale || 100;
  return Math.min(Math.round((number / scale) * 100), 100);
}

function filteredExamKeys() {
  const query = searchTerm.trim().toLowerCase();
  return examKeys().filter((key) => {
    const exam = EXAMS[key];
    const meta = examMeta[key] || {};
    const inFilter = selectedFilter === 'all' || meta.category === selectedFilter;
    const haystack = [
      key,
      exam.fullName,
      meta.org,
      meta.description,
      EXAM_DESCRIPTIONS?.[key],
      ...(meta.skills || []),
    ].join(' ').toLowerCase();

    return inFilter && (!query || haystack.includes(query));
  });
}

function renderExamCards() {
  const cards = document.getElementById('examCards');
  if (!cards) return;

  const keys = filteredExamKeys();
  cards.innerHTML = keys.length
    ? keys.map((key) => examCardTemplate(key)).join('')
    : `<div class="empty-state">Ийм шалгалт олдсонгүй. Хайлтаа өөрчлөөд дахин оролдоорой.</div>`;
}

function examCardTemplate(key) {
  const exam = EXAMS[key];
  const meta = examMeta[key] || {};
  const sections = exam.format.map((item) => item.section).slice(0, 4).join(', ');
  const firstDate = exam.upcomingDates?.[0] || 'Тун удахгүй';

  return `
    <article class="exam-card" style="--exam-tone:${meta.tone};--exam-soft:${meta.soft};">
      <button class="exam-card__main" type="button" data-open-exam="${escapeHtml(key)}">
        <span class="exam-logo">${escapeHtml(key)}</span>
        <span class="exam-org">${escapeHtml(meta.org || 'Official exam')}</span>
        <span class="exam-name-row">
          <strong>${escapeHtml(key)}</strong>
          <span>${escapeHtml(EXAM_ICONS[key] || '')}</span>
        </span>
        <span class="exam-full-name">${escapeHtml(exam.fullName)}</span>
        <span class="exam-description">${escapeHtml(meta.description || EXAM_DESCRIPTIONS?.[key] || '')}</span>
      </button>

      <dl class="exam-card__facts">
        <div>
          <dt>Формат</dt>
          <dd>${escapeHtml(sections)}</dd>
        </div>
        <div>
          <dt>Оноо</dt>
          <dd>${escapeHtml(exam.totalScore)}</dd>
        </div>
        <div>
          <dt>Ойрын өдөр</dt>
          <dd>${escapeHtml(firstDate)}</dd>
        </div>
      </dl>

      <div class="exam-card__actions">
        <button class="outline-button" type="button" data-open-exam="${escapeHtml(key)}">Дэлгэрэнгүй</button>
        <a class="solid-button${key !== 'IELTS' ? ' is-muted' : ''}" href="${key === 'IELTS' ? 'test.html?exam=IELTS&section=listening' : '#scoreComparison'}">
          ${key === 'IELTS' ? 'IELTS дасгал' : 'Харьцуулах'}
          ${svgIcon('<path d="M7 17 17 7"/><path d="M7 7h10v10"/>', 14)}
        </a>
      </div>
    </article>`;
}

function renderScoreComparison() {
  const target = document.getElementById('scoreComparison');
  if (!target) return;

  target.innerHTML = examKeys().map((key) => {
    const meta = examMeta[key] || {};
    return `
      <div class="score-line" style="--exam-tone:${meta.tone};">
        <div class="score-line__top">
          <span>${escapeHtml(EXAM_ICONS[key] || '')} ${escapeHtml(key)}</span>
          <strong>${escapeHtml(EXAMS[key].totalScore)}</strong>
        </div>
        <div class="score-track" aria-hidden="true">
          <span style="width:${scorePercent(key)}%"></span>
        </div>
      </div>`;
  }).join('');
}

function renderIeltsSkills() {
  const target = document.getElementById('ieltsSkills');
  if (!target) return;

  target.innerHTML = ieltsSkills.map((skill) => examSectionCardTemplate(skill)).join('');
}

function examSectionCardTemplate(section) {
  return `
    <a class="skill-card" href="${escapeHtml(section.href || '#')}">
      <span>${svgIcon(section.icon, 20)}</span>
      <strong>${escapeHtml(section.title || section.name)}</strong>
      <small>${escapeHtml(section.label)}</small>
      ${section.detail ? `<em>${escapeHtml(section.detail)}</em>` : ''}
    </a>`;
}

function renderExamSections(key) {
  const sections = examSections[key] || [];
  if (!sections.length) return '';

  return `
    <section class="modal-section exam-sections-bottom">
      <h3>${svgIcon('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', 16)} ${escapeHtml(key)} шалгалтын хэсгүүд</h3>
      <div class="skill-grid in-modal">
        ${sections.map((section) => examSectionCardTemplate(section)).join('')}
      </div>
    </section>`;
}

function openExamModal(key) {
  const exam = EXAMS[key];
  const modal = document.getElementById('examModal');
  const modalContent = document.getElementById('examModalContent');
  if (!exam || !modal || !modalContent) return;

  const meta = examMeta[key] || {};
  modalContent.innerHTML = modalTemplate(key, exam, meta);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}

function closeExamModal() {
  const modal = document.getElementById('examModal');
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function modalTemplate(key, exam, meta) {
  return `
    <header class="modal-hero" style="--exam-tone:${meta.tone};--exam-soft:${meta.soft};">
      <div class="exam-logo modal-logo">${escapeHtml(key)}</div>
      <div>
        <span class="exam-org">${escapeHtml(meta.org || 'Official exam')}</span>
        <h2 id="modalExamTitle">${escapeHtml(key)}</h2>
        <p>${escapeHtml(exam.fullName)}</p>
      </div>
    </header>

    <div class="modal-body">
      <div class="modal-facts">
        ${factTemplate('Нийт оноо', exam.totalScore)}
        ${factTemplate('Хураамж', exam.registrationFee)}
        ${factTemplate('Хүчинтэй хугацаа', exam.validity)}
      </div>

      <section class="modal-section">
        <h3>${svgIcon('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', 16)} Тухай</h3>
        <p>${escapeHtml(exam.overview)}</p>
      </section>

      <section class="modal-section">
        <h3>${svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>', 16)} Шалгалтын формат</h3>
        <div class="modal-list">
          ${exam.format.map((section, index) => `
            <div class="modal-list-row">
              <span class="row-number">${index + 1}</span>
              <div>
                <strong>${escapeHtml(section.section)}</strong>
                <small>${escapeHtml(section.duration)}</small>
              </div>
              <em>${escapeHtml(section.score)}</em>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="modal-section">
        <h3>${svgIcon('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', 16)} Онооны шаардлага</h3>
        <div class="requirement-grid">
          ${Object.entries(exam.commonRequirements).map(([label, value]) => `
            <div>
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="modal-section">
        <h3>${svgIcon('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.75V17h8v-2.25A7 7 0 0 0 12 2z"/>', 16)} Бэлтгэлийн зөвлөгөө</h3>
        <ol class="tip-list">
          ${exam.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
        </ol>
      </section>

      <section class="modal-section">
        <h3>${svgIcon('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>', 16)} Ойрын огноо</h3>
        <div class="date-strip">
          ${exam.upcomingDates.map((date, index) => `<span class="${index === 0 ? 'is-next' : ''}">${escapeHtml(date)}</span>`).join('')}
        </div>
      </section>

      <section class="modal-section">
        <h3>${svgIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', 16)} Материалууд</h3>
        <div class="resource-grid">
          ${exam.prepResources.map((resource) => `
            <a href="${escapeHtml(resource.link)}" target="_blank" rel="noopener">
              <strong>${escapeHtml(resource.name)}</strong>
              <span>${escapeHtml(resource.type)} ${svgIcon('<path d="M7 17 17 7"/><path d="M7 7h10v10"/>', 13)}</span>
            </a>
          `).join('')}
        </div>
      </section>

      ${renderExamSections(key)}
    </div>`;
}

function factTemplate(label, value) {
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>`;
}

function bindEvents() {
  document.getElementById('examSearch')?.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    renderExamCards();
  });

  document.getElementById('examFilters')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    selectedFilter = button.dataset.filter;
    document.querySelectorAll('.exam-filter').forEach((item) => {
      item.classList.toggle('active', item === button);
    });
    renderExamCards();
  });

  document.addEventListener('click', (event) => {
    const openButton = event.target.closest('[data-open-exam]');
    if (openButton) {
      openExamModal(openButton.dataset.openExam);
      return;
    }

    if (event.target.closest('[data-close-modal]')) {
      closeExamModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeExamModal();
  });
}

window.appData.then(() => {
  bindEvents();
  renderExamCards();
  renderScoreComparison();
  renderIeltsSkills();
});
