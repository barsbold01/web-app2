import { useState, useEffect, useMemo } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUser() {
  try { return JSON.parse(localStorage.getItem('ns_session')); }
  catch { return null; }
}

function getSavedUnis()     { return typeof fav_getSavedUnis     === 'function' ? fav_getSavedUnis()     : []; }
function getSavedScholars() { return typeof fav_getSavedScholars === 'function' ? fav_getSavedScholars() : []; }

function parseDeadline(dateStr) {
  if (!dateStr) return null;
  const numeric = dateStr.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
  if (numeric) return new Date(+numeric[1], +numeric[2] - 1, +numeric[3]);

  const mn = dateStr.match(/(\d{4})\s*оны\s*(\d{1,2})-р\s*сар\s*(\d{1,2})/);
  if (mn) return new Date(+mn[1], +mn[2] - 1, +mn[3]);

  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function urgency(dateStr) {
  const today    = new Date(); today.setHours(0, 0, 0, 0);
  const deadline = parseDeadline(dateStr);
  if (!deadline) return { label: 'Тодорхойгүй', cls: 'upcoming' };
  const diff     = Math.ceil((deadline - today) / 86400000);
  if (diff < 0)   return { label: 'Дууссан',     cls: 'urgent' };
  if (diff <= 30) return { label: 'Яаралтай',    cls: 'urgent' };
  if (diff <= 90) return { label: 'Тойлж байна', cls: 'upcoming' };
  return           { label: 'Хэвийн',            cls: 'safe' };
}

function sortByDeadline(a, b) {
  const da = parseDeadline(a.date);
  const db = parseDeadline(b.date);
  return (da?.getTime() ?? Infinity) - (db?.getTime() ?? Infinity);
}

function savedTimeLabel(savedAt) {
  if (!savedAt) return 'Саяхан хадгалсан';
  const saved = new Date(savedAt);
  if (Number.isNaN(saved.getTime())) return 'Саяхан хадгалсан';
  const diff = Math.max(0, Date.now() - saved.getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Дөнгөж сая';
  if (minutes < 60) return `${minutes} минутын өмнө`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} цагийн өмнө`;
  const days = Math.floor(hours / 24);
  return `${days} өдрийн өмнө`;
}

function planProgress(item) {
  let done = 1;
  if (item.requirements?.length) done += 1;
  if (item.website || item.applyLink) done += 1;
  if (item.deadline) done += 1;
  return Math.min(100, Math.round((done / 4) * 100));
}

// ── SVG atoms ─────────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRight = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const XIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UniIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
  </svg>
);

const ScholarIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UrgentIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const SafeIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <polyline points="9 11 12 14 22 4" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

// ── Quick actions ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    label: 'Их сургууль хайх', page: null, href: 'uni.html', cls: 'qi-indigo',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  },
  {
    label: 'Тэтгэлэг олох', page: null, href: 'scholar.html', cls: 'qi-purple',
    icon: <ScholarIcon />,
  },
  {
    label: 'Шалгалтын мэдээлэл', page: null, href: 'exam-info.html', cls: 'qi-sky',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
  {
    label: 'Өргөдөл', page: 'application', href: null, cls: 'qi-emerald',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
];

// Deadlines derived from saved unis (YYYY.MM.DD format) + static fallbacks
const STATIC_DEADLINES = [
  { name: 'Оксфордын Их Сургуулийн Өргөдөл', date: '2026.10.15' },
  { name: 'Gates Cambridge Тэтгэлэг',         date: '2026.10.12' },
  { name: 'MEXT Тэтгэлгийн Өргөдөл',          date: '2026.06.15' },
  { name: 'NUS ASEAN Тэтгэлэг',               date: '2026.11.30' },
];

const EXAM_PREP = [
  { name: 'IELTS',  target: 'Зорилт: 7.0',        pct: 65, fill: 'fill-indigo' },
  { name: 'SAT',    target: 'Зорилт: 1400',        pct: 40, fill: 'fill-red'   },
  { name: 'TOPIK',  target: 'Зорилт: 4-р түвшин',  pct: 80, fill: 'fill-purple'},
];

// ── Sub-components ────────────────────────────────────────────────────────────

function QuickActionsCard() {
  return (
    <div className="card">
      <div className="card-title">Шуурхай Үйлдлүүд</div>
      <div className="qa-grid">
        {QUICK_ACTIONS.map(({ label, page, href, cls, icon }) => {
          const handleClick = page
            ? () => typeof window.showPage === 'function' && window.showPage(page)
            : undefined;
          const Tag = href ? 'a' : 'button';
          return (
            <Tag key={label} className="qa-item" href={href || undefined} onClick={handleClick}>
              <div className={`qa-icon ${cls}`}>{icon}</div>
              <span className="qa-label">{label}</span>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}

function SavedUniCard({ unis, onRemove }) {
  return (
    <div className="card">
      <div className="card-title-row">
        <span className="card-title">Хадгалсан Их Сургуулиуд</span>
        <a href="uni.html" className="card-link">
          Бүгдийг харах <ChevronRight />
        </a>
      </div>

      {unis.length === 0 ? (
        <div className="saved-empty">
          Хадгалсан их сургууль байхгүй байна. <a href="uni.html">Хайж олох →</a>
        </div>
      ) : (
        unis.map(u => {
          const progress = planProgress(u);
          return (
            <div key={u.id} className="saved-item saved-item--rich">
              <div className="saved-icon si-indigo">{u.logo || <UniIcon />}</div>
              <div className="saved-info">
                <div className="saved-name">{u.name}</div>
                <div className="saved-meta">{u.location}</div>
                <div className="saved-detail-row">
                  <span>{u.rankLabel || (u.rank ? `#${u.rank}` : 'Эрэмбэ тодорхойгүй')}</span>
                  <span>{u.tuition || 'Төлбөр тодорхойгүй'}</span>
                  <span>{u.requirements?.length || 0} шалгуур</span>
                </div>
                <div className="saved-progress" aria-label={`Бэлтгэл ${progress}%`}>
                  <div className="saved-progress__bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="saved-actions">
                {u.hasScholarship
                  ? <span className="badge badge-green">Тэтгэлэгт</span>
                  : <span className="badge badge-amber">{u.tags?.[0] || u.type || 'Сургууль'}</span>}
                <div className="saved-due">Хугацаа: {u.deadlineLabel || u.deadline || 'Тодорхойгүй'}</div>
                <div className="saved-action-row">
                  {u.website && (
                    <a className="saved-open-btn" href={u.website} target="_blank" rel="noopener">Дэлгэрэнгүй</a>
                  )}
                  <button className="saved-remove-btn" aria-label="Устгах" onClick={() => onRemove('uni', u.id)}>
                    <XIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function SavedScholarCard({ scholars, onRemove }) {
  return (
    <div className="card">
      <div className="card-title-row">
        <span className="card-title">Хадгалсан Тэтгэлэгүүд</span>
        <a href="scholar.html" className="card-link">
          Бүгдийг харах <ChevronRight />
        </a>
      </div>

      {scholars.length === 0 ? (
        <div className="saved-empty">
          Хадгалсан тэтгэлэг байхгүй байна. <a href="scholar.html">Хайж олох →</a>
        </div>
      ) : (
        scholars.map(s => {
          const progress = planProgress(s);
          return (
            <div key={s.id} className="saved-item saved-item--rich">
              <div className="saved-icon si-purple">{s.logo || <ScholarIcon />}</div>
              <div className="saved-info">
                <div className="saved-name">{s.name}</div>
                <div className="saved-meta">{s.provider}{s.level ? ` · ${s.level}` : ''}</div>
                <div className="saved-detail-row">
                  <span>{s.amount || s.fundingType || 'Санхүүжилт'}</span>
                  <span>{s.covers?.length || 0} хамрах зүйл</span>
                  <span>{s.requirements?.length || 0} шаардлага</span>
                </div>
                <div className="saved-progress" aria-label={`Бэлтгэл ${progress}%`}>
                  <div className="saved-progress__bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="saved-actions">
                <span className={`badge ${s.funding === 'full' ? 'badge-green' : 'badge-amber'}`}>
                  {s.fundingLabel}
                </span>
                <div className="saved-due">{s.deadline || 'Тодорхойгүй'}</div>
                <div className="saved-action-row">
                  {s.applyLink && (
                    <a className="saved-open-btn" href={s.applyLink} target="_blank" rel="noopener">Бүртгүүлэх</a>
                  )}
                  <button className="saved-remove-btn" aria-label="Устгах" onClick={() => onRemove('scholar', s.id)}>
                    <XIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function DeadlinesCard({ savedUnis, savedScholars }) {
  // Prefer deadlines from saved items; fall back to static list
  const deadlines = useMemo(() => {
    const fromSaved = [
      ...savedUnis
        .filter(u => u.deadline)
        .map(u => ({ name: u.name, date: u.deadline, type: 'Сургууль' })),
      ...savedScholars
        .filter(s => s.deadline)
        .map(s => ({ name: s.name, date: s.deadline, type: 'Тэтгэлэг' })),
    ].sort(sortByDeadline).slice(0, 4);
    if (fromSaved.length > 0) return fromSaved;
    return STATIC_DEADLINES;
  }, [savedUnis, savedScholars]);

  return (
    <div className="card">
      <div className="card-title-icon icon-amber">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
        Ойртож буй хугацаанууд
      </div>

      {deadlines.map(({ name, date, type }) => {
        const { label, cls } = urgency(date);
        const isUrgent = cls === 'urgent';
        return (
          <div key={name} className="deadline-item">
            <div className={`dl-icon ${cls}`}>
              {isUrgent ? <UrgentIcon /> : <SafeIcon />}
            </div>
            <div>
              <div className="dl-name">{name}</div>
              <div className="dl-meta">
                <span className={`dl-badge ${cls}`}>{label}</span>
                {type && <span className="dl-type">{type}</span>}
                <span className="dl-date">{date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExamPrepCard() {
  return (
    <div className="card">
      <div className="card-title-icon icon-indigo">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        Шалгалтын Бэлтгэл
      </div>

      {EXAM_PREP.map(({ name, target, pct, fill }) => (
        <div key={name} className="prog-item">
          <div className="prog-header">
            <span className="prog-name">{name}</span>
            <span className="prog-target">{target}</span>
          </div>
          <div className="prog-bar">
            <div className={`prog-fill ${fill}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="prog-note">{pct}% бэлэн</div>
        </div>
      ))}

      <a href="exam-info.html" className="btn btn-outline btn-block">
        Шалгалтын гарын авлага харах <ArrowRight />
      </a>
    </div>
  );
}

function ActivityCard({ savedUnis, savedScholars }) {
  // Build activity feed from saved items
  const items = useMemo(() => {
    const uniActs = savedUnis.map(u => ({
      icon: 'uni',
      action: 'Их сургууль хадгаллаа',
      detail: `${u.name}${u.deadline ? ` · ${u.deadline}` : ''}`,
      time: savedTimeLabel(u.savedAt),
      stamp: u.savedAt || ''
    }));
    const scholActs = savedScholars.map(s => ({
      icon: 'schol',
      action: 'Тэтгэлэг хадгаллаа',
      detail: `${s.name}${s.deadline ? ` · ${s.deadline}` : ''}`,
      time: savedTimeLabel(s.savedAt),
      stamp: s.savedAt || ''
    }));
    const merged = [...uniActs, ...scholActs].sort((a, b) => b.stamp.localeCompare(a.stamp));
    return merged.length > 0 ? merged.slice(0, 5) : null;
  }, [savedUnis, savedScholars]);

  const staticItems = [
    { icon: 'uni',   action: 'Их сургууль хадгаллаа',        detail: 'MIT — Массачусетс',       time: '2 цагийн өмнө' },
    { icon: 'book',  action: 'Шалгалтын гарын авлага уншлаа', detail: 'IELTS бэлтгэл',           time: 'Өчигдөр' },
    { icon: 'schol', action: 'Тэтгэлэг хадгаллаа',           detail: 'MEXT Тэтгэлэг 2025',       time: '2 өдрийн өмнө' },
    { icon: 'doc',   action: 'Өргөдлийн гарын авлага уншлаа', detail: 'CV бичих зөвлөмж',        time: '3 өдрийн өмнө' },
  ];

  const display = items ?? staticItems;

  return (
    <div className="card">
      <div className="card-title">Сүүлийн Үйл Ажиллагаа</div>
      {display.map((item, i) => (
        <div key={i} className="activity-item">
          <div className="act-icon">
            {item.icon === 'uni'   && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
            {item.icon === 'schol' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944" /></svg>}
            {item.icon === 'book'  && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" /></svg>}
            {item.icon === 'doc'   && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5" /></svg>}
          </div>
          <div>
            <div className="act-action">{item.action}</div>
            <div className="act-detail">{item.detail}</div>
            {item.time && <div className="act-time">{item.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function DashboardApp() {
  const user = getUser();
  const name = user?.name || 'Хэрэглэгч';

  const [savedUnis,     setSavedUnis]     = useState(getSavedUnis);
  const [savedScholars, setSavedScholars] = useState(getSavedScholars);

  // Refresh when favorites change on this page or when navigating back from other pages
  useEffect(() => {
    const refresh = () => {
      setSavedUnis(getSavedUnis());
      setSavedScholars(getSavedScholars());
    };
    window.addEventListener('favoritesChanged', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('favoritesChanged', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const handleRemove = (type, id) => {
    if (type === 'uni') {
      typeof fav_removeUni     === 'function' && fav_removeUni(id);
      setSavedUnis(getSavedUnis());
    } else {
      typeof fav_removeScholar === 'function' && fav_removeScholar(id);
      setSavedScholars(getSavedScholars());
    }
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Тавтай морил, {name}! 👋</h1>
          <p className="page-sub">2026 оны 1-р сараас гишүүн · Таны гадаадад суралцах тойм</p>
        </div>
      </header>

      <div className="dash-grid">
        <div className="dash-col-main">
          <QuickActionsCard />
          <SavedUniCard     unis={savedUnis}         onRemove={handleRemove} />
          <SavedScholarCard scholars={savedScholars} onRemove={handleRemove} />
        </div>

        <div className="dash-col-side">
          <DeadlinesCard savedUnis={savedUnis} savedScholars={savedScholars} />
          <ExamPrepCard />
          <ActivityCard savedUnis={savedUnis} savedScholars={savedScholars} />
        </div>
      </div>
    </>
  );
}
