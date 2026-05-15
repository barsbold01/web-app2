import { useEffect, useMemo, useState } from 'react';
import DashboardApp from './DashboardApp';
import UniSection from './UniSearchFilter';
import ScholarSection from './ScholarSearchFilter';
import ExamInfoApp from './ExamInfoApp';
import ApplicationPage from './ApplicationPage';

const pages = [
  {
    id: 'dashboard',
    label: 'Хянах самбар',
    mobile: 'Самбар',
    icon: 'dashboard',
  },
  {
    id: 'universities',
    label: 'Их Сургуулиуд',
    mobile: 'Сургууль',
    icon: 'search',
  },
  {
    id: 'scholarships',
    label: 'Тэтгэлэгүүд',
    mobile: 'Тэтгэлэг',
    icon: 'scholar',
  },
  {
    id: 'exams',
    label: 'Шалгалтууд',
    mobile: 'Шалгалт',
    icon: 'exam',
  },
  {
    id: 'application',
    label: 'Өргөдөл',
    mobile: 'Заавар',
    icon: 'application',
  },
];

const pageTitles = {
  dashboard: null,
  universities: ['Их Сургуулийн Хайлт', 'Дэлхий даяар 500 гаруй их сургуулиас хайх'],
  scholarships: ['Тэтгэлэг Хайгч', '200 гаруй тэтгэлгийг нээгээрэй'],
  exams: null,
  application: ['Өргөдлийн Замын Зураглал', 'Их сургуулийн өргөдлийн үйл явцыг амжилттай давахад алхам алхмаар гарын авлага.'],
};

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('ns_session'));
  } catch {
    return null;
  }
}

function Icon({ name, className = 'nav-icon' }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'dashboard') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }

  if (name === 'scholar') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  if (name === 'exam') {
    return (
      <svg {...common}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function PageHeader({ page }) {
  const title = pageTitles[page];
  if (!title) return null;

  return (
    <header className="page-header">
      <div>
        <h1 className="page-title">{title[0]}</h1>
        <p className="page-sub">{title[1]}</p>
      </div>
    </header>
  );
}

export default function App() {
  const initialPage = useMemo(() => {
    const hash = window.location.hash.replace('#', '');
    return pages.some((page) => page.id === hash) ? hash : 'dashboard';
  }, []);

  const [activePage, setActivePage] = useState(initialPage);
  const [user, setUser] = useState(getUser);

  const showPage = (page) => {
    if (!pages.some((item) => item.id === page)) return;
    setActivePage(page);
    history.replaceState(null, '', page === 'dashboard' ? '/' : `#${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.__REACT_SPA__ = true;
    window.showPage = showPage;

    const onHashChange = () => {
      const next = window.location.hash.replace('#', '');
      if (pages.some((page) => page.id === next)) setActivePage(next);
    };

    const onStorage = () => setUser(getUser());
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const routeMap = {
        'dashboard.html': 'dashboard',
        'uni.html': 'universities',
        'scholar.html': 'scholarships',
        'exam-info.html': 'exams',
        'guide.html': 'application',
      };

      const route = routeMap[href] || routeMap[href.replace('/html/', '')];
      if (!route) return;

      event.preventDefault();
      showPage(route);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const name = user?.name || 'Хэрэглэгч';
  const grade = user?.grade || '12-р ангийн сурагч';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="app-layout">
      <aside className="sidebar" id="app-sidebar">
        <button className="logo" type="button" aria-label="Нүүр хуудас руу очих" onClick={() => showPage('dashboard')}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A0E27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
              <path d="M6 12v5c3.33 1.67 6.67 1.67 12 0v-5" />
            </svg>
          </div>
          <span className="logo-brand">ДАРААГИЙН АЛХАМ</span>
        </button>

        <div className="nav-label">ЦЭС</div>

        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`nav-item${activePage === page.id ? ' active' : ''}`}
            onClick={() => showPage(page.id)}
          >
            <Icon name={page.icon} />
            {page.label}
          </button>
        ))}

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{initial}</div>
            <div>
              <div className="user-name">{name}</div>
              <div className="user-role">{grade}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span>Гадаадад Суралцах Төв 2026</span>
          </div>
          <div className="topbar-right">
            <div className="notif-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
              <span className="notif-dot" />
            </div>
          </div>
        </header>

        <div className={`page${activePage === 'dashboard' ? ' active' : ''}`}>
          {activePage === 'dashboard' && <DashboardApp />}
        </div>
        <div className={`page${activePage === 'universities' ? ' active' : ''}`}>
          {activePage === 'universities' && (
            <>
              <PageHeader page="universities" />
              <UniSection />
            </>
          )}
        </div>
        <div className={`page${activePage === 'scholarships' ? ' active' : ''}`}>
          {activePage === 'scholarships' && (
            <>
              <PageHeader page="scholarships" />
              <ScholarSection />
            </>
          )}
        </div>
        <div className={`page${activePage === 'exams' ? ' active' : ''}`}>
          {activePage === 'exams' && <ExamInfoApp />}
        </div>
        <div className={`page${activePage === 'application' ? ' active' : ''}`}>
          {activePage === 'application' && (
            <>
              <PageHeader page="application" />
              <ApplicationPage />
            </>
          )}
        </div>
      </main>

      <nav className="mobile-nav">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`mobile-nav__item${activePage === page.id ? ' active' : ''}`}
            onClick={() => showPage(page.id)}
          >
            <Icon name={page.icon} className="" />
            <span>{page.mobile}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
