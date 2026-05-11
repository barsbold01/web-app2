import { useEffect, useMemo, useState } from 'react';

const examMeta = {
  IELTS: {
    org: 'British Council / IDP',
    category: 'english',
    tone: '#DC2626',
    soft: '#FEF2F2',
    description: 'Их Британи, Австрали болон дэлхий даяарх англи хэлний шаардлага',
  },
  TOEFL: {
    org: 'ETS',
    category: 'english',
    tone: '#0EA5E9',
    soft: '#EFF6FF',
    description: 'АНУ, Канадын их сургуулиудад түгээмэл хэрэглэгддэг англи хэлний шалгалт',
  },
  SAT: {
    org: 'College Board',
    category: 'admission',
    tone: '#16A34A',
    soft: '#F0FDF4',
    description: 'АНУ-ын бакалаврын элсэлтийн академик шалгалт',
  },
  HSK: {
    org: 'Chinese Testing International',
    category: 'asian',
    tone: '#D97706',
    soft: '#FFFBEB',
    description: 'Хятад хэлний түвшин тогтоох стандарт шалгалт',
  },
  TOPIK: {
    org: 'NIIED',
    category: 'asian',
    tone: '#2563EB',
    soft: '#EEF2FF',
    description: 'Солонгос хэлний түвшин тогтоох албан ёсны шалгалт',
  },
};

const sectionIcon = {
  headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z"/><path d="M3 14a2 2 0 0 0 2 2h1v-4H5a2 2 0 0 0-2 2Z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  chat: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  math: '<path d="M4 19h16"/><path d="M4 15 10 5l4 7 2-3 4 6"/><path d="M7 19v-4"/><path d="M17 19v-4"/>',
  module: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  hanzi: '<path d="M4 5h16"/><path d="M4 19h16"/><path d="M6 5v14"/><path d="M18 5v14"/><path d="M9 9h6"/><path d="M9 13h6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.75V17h8v-2.25A7 7 0 0 0 12 2z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
};

const examSections = {
  IELTS: [
    { title: 'Listening', label: 'Сонсгол', detail: '40 асуулт, аудио ойлголт', icon: sectionIcon.headphones, href: 'test.html?exam=IELTS&section=listening' },
    { title: 'Reading', label: 'Унших', detail: '3 текст, 40 асуулт', icon: sectionIcon.book, href: 'test.html?exam=IELTS&section=reading' },
    { title: 'Writing', label: 'Бичих', detail: 'Task 1, Task 2', icon: sectionIcon.pen, href: 'test.html?exam=IELTS&section=writing' },
    { title: 'Speaking', label: 'Ярих', detail: '3 хэсэгтэй ярилцлага', icon: sectionIcon.chat, href: 'test.html?exam=IELTS&section=speaking' },
  ],
  TOEFL: [
    { title: 'Reading', label: 'Унших', detail: 'Академик текст, үндсэн санаа', icon: sectionIcon.book, href: 'test.html?exam=TOEFL&section=reading' },
    { title: 'Listening', label: 'Сонсгол', detail: 'Лекц, кампусын яриа', icon: sectionIcon.headphones, href: 'test.html?exam=TOEFL&section=listening' },
    { title: 'Speaking', label: 'Ярих', detail: 'Independent ба integrated', icon: sectionIcon.chat, href: 'test.html?exam=TOEFL&section=speaking' },
    { title: 'Writing', label: 'Бичих', detail: 'Academic discussion, integrated', icon: sectionIcon.pen, href: 'test.html?exam=TOEFL&section=writing' },
  ],
  SAT: [
    { title: 'Reading & Writing', label: 'Унших ба бичих', detail: 'Богино текст, хэл зүй, нотолгоо', icon: sectionIcon.book, href: 'test.html?exam=SAT&section=reading-writing' },
    { title: 'Math', label: 'Математик', detail: 'Алгебр, problem solving, geometry', icon: sectionIcon.math, href: 'test.html?exam=SAT&section=math' },
    { title: 'Module 1', label: 'Эхний модуль', detail: 'Суурь түвшний адаптив хэсэг', icon: sectionIcon.module, href: 'test.html?exam=SAT&section=module-1' },
    { title: 'Module 2', label: 'Хоёр дахь модуль', detail: 'Гүйцэтгэлээс хамаарах түвшин', icon: sectionIcon.module, href: 'test.html?exam=SAT&section=module-2' },
  ],
  HSK: [
    { title: 'HSK 1-2', label: 'Суурь түвшин', detail: 'Өдөр тутмын үг хэллэг', icon: sectionIcon.hanzi, href: 'test.html?exam=HSK&section=hsk-1-2' },
    { title: 'HSK 3-4', label: 'Дунд түвшин', detail: 'Их сургуулийн суурь шаардлага', icon: sectionIcon.hanzi, href: 'test.html?exam=HSK&section=hsk-3-4' },
    { title: 'HSK 5-6', label: 'Ахисан түвшин', detail: 'Академик ба мэргэжлийн хэрэглээ', icon: sectionIcon.hanzi, href: 'test.html?exam=HSK&section=hsk-5-6' },
  ],
  TOPIK: [
    { title: 'TOPIK I', label: 'Түвшин 1-2', detail: 'Сонсох, унших суурь хэсэг', icon: sectionIcon.book, href: 'test.html?exam=TOPIK&section=topik-i' },
    { title: 'Listening', label: 'Сонсгол', detail: 'Өдөр тутмын ба академик яриа', icon: sectionIcon.headphones, href: 'test.html?exam=TOPIK&section=listening' },
    { title: 'Reading', label: 'Унших', detail: 'Урт текст, дүрмийн хэрэглээ', icon: sectionIcon.book, href: 'test.html?exam=TOPIK&section=reading' },
    { title: 'Writing', label: 'Бичих', detail: 'TOPIK II бичгийн даалгавар', icon: sectionIcon.pen, href: 'test.html?exam=TOPIK&section=writing' },
  ],
};

const filters = [
  ['all', 'Бүгд'],
  ['english', 'Англи хэл'],
  ['admission', 'Элсэлт'],
  ['asian', 'Ази хэл'],
];

function SvgIcon({ path, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

function scorePercent(key) {
  if (key === 'IELTS') return 78;
  if (key === 'TOEFL') return 100;
  if (key === 'SAT') return 80;
  if (key === 'HSK') return 68;
  if (key === 'TOPIK') return 84;
  return 70;
}

function SectionCard({ section }) {
  return (
    <a className="skill-card" href={section.href}>
      <span><SvgIcon path={section.icon} size={20} /></span>
      <strong>{section.title}</strong>
      <small>{section.label}</small>
      {section.detail && <em>{section.detail}</em>}
    </a>
  );
}

function ExamCard({ examKey, exam, icons, descriptions, onOpen }) {
  const meta = examMeta[examKey] || {};
  const sections = exam.format.map((item) => item.section).slice(0, 4).join(', ');
  const firstDate = exam.upcomingDates?.[0] || 'Тун удахгүй';

  return (
    <article className="exam-card" style={{ '--exam-tone': meta.tone, '--exam-soft': meta.soft }}>
      <button className="exam-card__main" type="button" onClick={() => onOpen(examKey)}>
        <span className="exam-logo">{examKey}</span>
        <span className="exam-org">{meta.org || 'Official exam'}</span>
        <span className="exam-name-row">
          <strong>{examKey}</strong>
          <span>{icons[examKey] || ''}</span>
        </span>
        <span className="exam-full-name">{exam.fullName}</span>
        <span className="exam-description">{meta.description || descriptions[examKey] || ''}</span>
      </button>

      <dl className="exam-card__facts">
        <div><dt>Формат</dt><dd>{sections}</dd></div>
        <div><dt>Оноо</dt><dd>{exam.totalScore}</dd></div>
        <div><dt>Ойрын өдөр</dt><dd>{firstDate}</dd></div>
      </dl>

      <div className="exam-card__actions">
        <button className="outline-button" type="button" onClick={() => onOpen(examKey)}>Дэлгэрэнгүй</button>
        <a className={`solid-button${examKey !== 'IELTS' ? ' is-muted' : ''}`} href={examKey === 'IELTS' ? 'test.html?exam=IELTS&section=listening' : '#scoreComparison'}>
          {examKey === 'IELTS' ? 'IELTS дасгал' : 'Харьцуулах'}
          <SvgIcon path={sectionIcon.arrowUpRight} size={14} />
        </a>
      </div>
    </article>
  );
}

function ExamModal({ examKey, exam, onClose }) {
  const meta = examMeta[examKey] || {};
  const sections = examSections[examKey] || [];

  useEffect(() => {
    document.body.classList.add('modal-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="exam-modal is-open" aria-hidden="false">
      <div className="exam-modal__backdrop" onClick={onClose} />
      <section className="exam-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modalExamTitle">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Хаах">
          <SvgIcon path={sectionIcon.close} />
        </button>

        <header className="modal-hero" style={{ '--exam-tone': meta.tone, '--exam-soft': meta.soft }}>
          <div className="exam-logo modal-logo">{examKey}</div>
          <div>
            <span className="exam-org">{meta.org || 'Official exam'}</span>
            <h2 id="modalExamTitle">{examKey}</h2>
            <p>{exam.fullName}</p>
          </div>
        </header>

        <div className="modal-body">
          <div className="modal-facts">
            <div><span>Нийт оноо</span><strong>{exam.totalScore}</strong></div>
            <div><span>Хураамж</span><strong>{exam.registrationFee}</strong></div>
            <div><span>Хүчинтэй хугацаа</span><strong>{exam.validity}</strong></div>
          </div>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.globe} size={16} /> Тухай</h3>
            <p>{exam.overview}</p>
          </section>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.file} size={16} /> Шалгалтын формат</h3>
            <div className="modal-list">
              {exam.format.map((section, index) => (
                <div className="modal-list-row" key={`${section.section}-${index}`}>
                  <span className="row-number">{index + 1}</span>
                  <div>
                    <strong>{section.section}</strong>
                    <small>{section.duration}</small>
                  </div>
                  <em>{section.score}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.target} size={16} /> Онооны шаардлага</h3>
            <div className="requirement-grid">
              {Object.entries(exam.commonRequirements).map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </section>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.bulb} size={16} /> Бэлтгэлийн зөвлөгөө</h3>
            <ol className="tip-list">
              {exam.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ol>
          </section>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.calendar} size={16} /> Ойрын огноо</h3>
            <div className="date-strip">
              {exam.upcomingDates.map((date, index) => (
                <span key={date} className={index === 0 ? 'is-next' : ''}>{date}</span>
              ))}
            </div>
          </section>

          <section className="modal-section">
            <h3><SvgIcon path={sectionIcon.book} size={16} /> Материалууд</h3>
            <div className="resource-grid">
              {exam.prepResources.map((resource) => (
                <a href={resource.link} target="_blank" rel="noopener noreferrer" key={`${resource.name}-${resource.type}`}>
                  <strong>{resource.name}</strong>
                  <span>{resource.type} <SvgIcon path={sectionIcon.arrowUpRight} size={13} /></span>
                </a>
              ))}
            </div>
          </section>

          <section className="modal-section exam-sections-bottom">
            <h3><SvgIcon path={sectionIcon.target} size={16} /> {examKey} шалгалтын хэсгүүд</h3>
            <div className="skill-grid in-modal">
              {sections.map((section) => <SectionCard key={section.title} section={section} />)}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default function ExamInfoApp() {
  const [data, setData] = useState({ exams: {}, icons: {}, descriptions: {}, keys: [] });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    window.appData.then(() => {
      setData({
        exams: window.EXAMS || {},
        icons: window.EXAM_ICONS || {},
        descriptions: window.EXAM_DESCRIPTIONS || {},
        keys: window.EXAM_LIST_KEYS || Object.keys(window.EXAMS || {}),
      });
    });
  }, []);

  const filteredKeys = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.keys.filter((key) => {
      const exam = data.exams[key];
      const meta = examMeta[key] || {};
      if (!exam) return false;
      if (filter !== 'all' && meta.category !== filter) return false;
      if (!normalized) return true;
      return [key, exam.fullName, meta.org, meta.description, data.descriptions[key]]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
  }, [data, filter, query]);

  const selected = selectedExam ? data.exams[selectedExam] : null;

  return (
    <>
      <div className="content exam-hub">
        <section className="exam-hero" aria-labelledby="examHeroTitle">
          <div className="exam-hero__copy">
            <span className="eyebrow">Шалгалтын төв</span>
            <h1 id="examHeroTitle">Оноогоо төлөвлөж, шалгалтаа ухаалгаар сонго.</h1>
            <p>IELTS, TOEFL, SAT, HSK, TOPIK шалгалтын формат, онооны шаардлага, төлбөр, бэлтгэлийн материалыг нэг дороос харьцуул.</p>
          </div>
          <div className="exam-hero__metrics" aria-label="Шалгалтын товч үзүүлэлт">
            <div><strong>5</strong><span>шалгалт</span></div>
            <div><strong>4</strong><span>чадварын хэсэг</span></div>
            <div><strong>2026</strong><span>төлөвлөгөө</span></div>
          </div>
        </section>

        <section className="exam-toolbar" aria-label="Шалгалт хайх ба шүүх">
          <label className="exam-search">
            <SvgIcon path={sectionIcon.search} />
            <input
              type="search"
              placeholder="IELTS, SAT эсвэл хэлээр хайх"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="exam-filter-group" aria-label="Шалгалтын төрөл">
            {filters.map(([value, label]) => (
              <button
                className={`exam-filter${filter === value ? ' active' : ''}`}
                type="button"
                key={value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="exam-card-grid" aria-live="polite">
          {filteredKeys.length ? filteredKeys.map((key) => (
            <ExamCard
              key={key}
              examKey={key}
              exam={data.exams[key]}
              icons={data.icons}
              descriptions={data.descriptions}
              onOpen={setSelectedExam}
            />
          )) : (
            <div className="empty-state">Ийм шалгалт олдсонгүй. Хайлтаа өөрчлөөд дахин оролдоорой.</div>
          )}
        </section>

        <section className="exam-insights-grid">
          <article className="score-board">
            <div className="section-heading">
              <span className="eyebrow">Онооны зураглал</span>
              <h2>Нэг харцаар харьцуул.</h2>
            </div>
            <div className="score-comparison" id="scoreComparison">
              {data.keys.map((key) => (
                <div className="score-line" style={{ '--exam-tone': examMeta[key]?.tone }} key={key}>
                  <div className="score-line__top">
                    <span>{data.icons[key] || ''} {key}</span>
                    <strong>{data.exams[key]?.totalScore}</strong>
                  </div>
                  <div className="score-track" aria-hidden="true">
                    <span style={{ width: `${scorePercent(key)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="prep-route">
            <div className="section-heading">
              <span className="eyebrow">IELTS мастер төлөвлөгөө</span>
              <h2>Чадвар бүрээр нь бэлд.</h2>
            </div>
            <div className="skill-grid">
              {examSections.IELTS.map((section) => <SectionCard key={section.title} section={section} />)}
            </div>
          </article>
        </section>

        <section className="exam-cta">
          <div>
            <span className="eyebrow">Дараагийн алхам</span>
            <h2>3-6 сарын бэлтгэлийн хуанлигаа өнөөдөр эхлүүл.</h2>
          </div>
          <a className="cta-button" href="dashboard.html#application">
            Өргөдлийн төлөвлөгөө рүү
            <SvgIcon path="<path d='M5 12h14'/><path d='m12 5 7 7-7 7'/>" />
          </a>
        </section>
      </div>

      {selected && <ExamModal examKey={selectedExam} exam={selected} onClose={() => setSelectedExam(null)} />}
    </>
  );
}
