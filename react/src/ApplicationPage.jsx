import { useState } from 'react';

const ROADMAP_STEPS = [
  {
    number: '01',
    title: 'Профайлаа Бүрдүүл',
    desc: 'Эрдмийн болон ангийн гадуурх үйл ажиллагааны профайлаа эрт эхлэн бүрдүүлэгтүн. Таны сонирхол, хүч чадалтай уялдах үйл ажиллагаанд анхаарал тавь.',
    tips: ['Сайн GPA байлга', 'Утга учиртай ангийн гадуурх үйл ажиллагаанд оролц', 'Өвөрмөц ур чадвар хөгжүүл'],
    resource: 'Профайл Бүрдүүлэх Гарын Авлага',
  },
  {
    number: '02',
    title: 'Их Сургуулиудыг Судлаарай',
    desc: 'Зорилготойгоо нийцэх их сургуулиудыг тодорхойл. Тэдгээрийн хөтөлбөр, элсэлтийн шаардлага, өргөдлийн эцсийн хугацааг нарийн судал.',
    tips: ['Тэнцвэртэй их сургуулийн жагсаалт гарга', 'Элсэлтийн шаардлагыг ойлго', 'Бүх чухал хугацааг тэмдэглэ'],
    resource: 'Их Сургуулийн Хайлтын Хэрэгсэл',
  },
  {
    number: '03',
    title: 'Баримт Бичгээ Бэлтгэ',
    desc: 'CV, хувийн мэдэгдэл, зөвлөмжийн захидал болон дүнгийн хуудсыг цуглуул. Баримт бичиг бүр тодорхой, мэргэжлийн түвшинд байх ёстой.',
    tips: ['CV боловсруулахыг эртхэн эхэл', 'Зөвлөмжийн захидлыг 2 сарын өмнө хүс', 'Холбогдох туршлагаа тодрол'],
    resource: 'Баримт Бичгийн Загварууд',
  },
  {
    number: '04',
    title: 'Эссэгээ Бич',
    desc: 'Жинхэнэ дуу хоолой, урам зоригийг харуулсан хүчтэй хувийн мэдэгдэл болон нэмэлт эссэ бич.',
    tips: ['Жинхэнэ түүхүүд дурьд', 'Харуул, бүү хэл', 'Менторуудаас санал хүс'],
    resource: 'Эссэ Бичих Гарын Авлага',
  },
  {
    number: '05',
    title: 'Өргөдлөө Илгээ',
    desc: 'Эцсийн хугацаанаас өмнө өргөдлийн бүх хэсгийг дүүргэж илгээ. Илгээхийн өмнө бүх зүйлийг давтан шалга.',
    tips: ['Хугацаанаас 1-2 долоо хоногийн өмнө илгээ', 'Бүх баримт бичиг байрлуулсан эсэхийг шалга', 'Баталгааны и-мэйлийг хадгал'],
    resource: 'Өргөдлийн Хяналтын Жагсаалт',
  },
  {
    number: '06',
    title: 'Хариуг Хүлээж, Саналд Хариулах',
    desc: 'Үр дүнгээ хянаж, саналуудыг харьцуулан цаг алдалгүй хариулна уу. Хүлээн авсан бол тэтгэлэг болон санхүүгийн тусламжийн нарийвчилсан мэдээллийг сайтар уншаарай.',
    tips: ['И-мэйлийг тогтмол шалга', 'Санхүүгийн тусламжийн саналуудыг харьцуул', 'Хүлээн авсан саналдаа цаг алдалгүй хариул'],
    resource: 'Шийдвэрийн Гарын Авлага',
  },
];

const PHASES = [
  {
    num: 1,
    title: 'Research & Plan',
    desc: 'Explore universities, compare programs, understand requirements, and build a balanced school list.',
    tags: ['Timeline', 'Country guides'],
  },
  {
    num: 2,
    title: 'Prepare Documents',
    desc: 'Gather CV, transcripts, recommendation letters, test scores, translations, and proof documents.',
    tags: ['Documents', 'Personal statement'],
  },
  {
    num: 3,
    title: 'Apply & Submit',
    desc: 'Complete forms, write essays, upload files, submit fees, and save all confirmation records.',
    tags: ['Scholarships', 'Portfolio'],
  },
  {
    num: 4,
    title: 'Interview & Visa',
    desc: 'Prepare for interviews, compare offers, accept your place, and start the student visa process.',
    tags: ['Interview', 'Visa'],
  },
];

const TIPS = [
  'Start applications 6-12 months before deadlines.',
  'Request recommendation letters 2-3 months early.',
  'Tailor each essay to the exact university and program.',
  'Track every deadline in one calendar.',
];

const GUIDE_CARDS = [
  {
    id: 'visa',
    title: 'Student Visa Guide',
    sub: 'Requirements, process, and common issues',
    cls: 'application-guide-icon--blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.62 1.19l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    id: 'ps',
    title: 'Personal Statement',
    sub: 'Structure, storytelling, and examples',
    cls: 'application-guide-icon--purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    id: 'scholarship',
    title: 'Scholarship Applications',
    sub: 'Search strategy, essays, and interviews',
    cls: 'application-guide-icon--green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    sub: 'Questions, STAR method, and practice',
    cls: 'application-guide-icon--orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function ApplicationPage() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggle = (num) => setExpandedStep((prev) => (prev === num ? null : num));

  return (
    <div className="application-wrap">

      {/* ── Redesign panel ─────────────────────────────────────────── */}
      <section className="application-redesign">

        {/* Hub hero */}
        <div className="application-hub-hero">
          <div className="application-hub-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A0E27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="38" height="38">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div className="application-hub-copy">
            <h2>Application Guides Hub</h2>
            <p>University application roadmap, document prep, essays, scholarships, interviews, and visa steps in one structured workspace.</p>
            <div className="application-hub-stats">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                8 detailed guides
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Step-by-step plan
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Expert tips
              </span>
            </div>
          </div>
        </div>

        {/* Quick tips */}
        <div className="application-hub-tips">
          <div className="application-heading">
            <div className="application-heading-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
              </svg>
            </div>
            <h2>Quick Success Tips</h2>
          </div>
          <div className="application-tip-grid">
            {TIPS.map((tip, i) => (
              <div key={i} className="application-tip">
                <span>{i + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey phases */}
        <div className="application-title-row">
          <div></div>
          <h2>Your Application Journey</h2>
        </div>
        <div className="application-phase-grid">
          {PHASES.map((phase) => (
            <article key={phase.num} className="application-phase-card">
              <div className="application-phase-number">{phase.num}</div>
              <h3>{phase.title}</h3>
              <p>{phase.desc}</p>
              <div>{phase.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>

        {/* Detailed guides */}
        <div className="application-guides-panel">
          <div className="application-heading application-heading--panel">
            <div className="application-heading-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h2>Detailed Guides</h2>
          </div>
          <p className="application-guides-sub">Pick the guide that matches your next application task.</p>
          <div className="application-guide-grid">
            {GUIDE_CARDS.map((g) => (
              <a key={g.id} className="application-guide-card" href="guide.html">
                <span className={`application-guide-icon ${g.cls}`}>{g.icon}</span>
                <span><strong>{g.title}</strong><small>{g.sub}</small></span>
              </a>
            ))}
          </div>
          <a className="application-guides-cta" href="guide.html">VIEW ALL GUIDES</a>
        </div>

        {/* Mentor CTA */}
        <div className="application-mentor-cta">
          <h3>Need Personalized Guidance?</h3>
          <p>Connect with mentors who can review essays, check documents, and help you prioritize your next application step.</p>
          <a href="auth.html">FIND A MENTOR</a>
        </div>
      </section>

      {/* ── Mongolian roadmap ───────────────────────────────────────── */}
      <div className="application-hero">
        <h2>Өргөдлийн Замын Зураглал</h2>
        <p>Их сургуулийн өргөдлийн үйл явцыг амжилттай давахад алхам алхмаар гарын авлага болно.</p>
      </div>

      <div className="application-roadmap">
        <div className="roadmap-line"></div>
        {ROADMAP_STEPS.map((step) => {
          const open = expandedStep === step.number;
          return (
            <article key={step.number} className="roadmap-item">
              <div className="roadmap-step">{step.number}</div>
              <div
                className="roadmap-card"
                style={{ cursor: 'pointer' }}
                onClick={() => toggle(step.number)}
              >
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {open && (
                  <div className="roadmap-tips">
                    <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                      {step.tips.map((tip, i) => (
                        <li key={i} style={{ marginBottom: '6px', fontSize: '0.9rem', color: '#4B5563' }}>{tip}</li>
                      ))}
                    </ul>
                    <button
                      style={{ marginTop: '12px', padding: '8px 16px', background: '#0A0E27', color: '#CCFF00', fontWeight: 700, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {step.resource} →
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="application-help">
        <h3>Тусламж Хэрэгтэй юу? Ментортойгоо Ярилцаарай</h3>
        <p>Өргөдлийн аяллын бүх алхамд таныг чиглүүлэх туршлагатай менторуудтай холбогдоорой.</p>
        <a className="btn btn-indigo" href="auth.html">Ментор Олох</a>
      </div>
    </div>
  );
}
