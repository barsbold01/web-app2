import { useEffect, useMemo, useState } from 'react';
import MobileNav from './components/app/MobileNav';
import PageRenderer from './components/app/PageRenderer';
import Sidebar from './components/app/Sidebar';
import Topbar from './components/app/Topbar';
import { isAppPage } from './components/app/appPages';
import { getSessionUser } from './utils/session';

function initialAppPage() {
  if (isAppPage(window.__INITIAL_APP_PAGE__)) return window.__INITIAL_APP_PAGE__;

  const hash = window.location.hash.replace('#', '');
  return isAppPage(hash) ? hash : 'dashboard';
}

export default function App() {
  const [activePage, setActivePage] = useState(useMemo(initialAppPage, []));
  const [user, setUser] = useState(getSessionUser);

  const showPage = (page) => {
    if (!isAppPage(page)) return;

    setActivePage(page);
    history.replaceState(null, '', page === 'dashboard' ? window.location.pathname : `${window.location.pathname}#${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.__REACT_SPA__ = true;
    window.showPage = showPage;

    const onHashChange = () => {
      const next = window.location.hash.replace('#', '');
      if (isAppPage(next)) setActivePage(next);
    };

    const onStorage = () => setUser(getSessionUser());
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const routeMap = {
      'dashboard.html': 'dashboard',
      'uni.html': 'universities',
      'scholar.html': 'scholarships',
      'exam-info.html': 'exams',
      'guide.html': 'application',
    };

    const onClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const route = routeMap[href] || routeMap[href.replace('/html/', '')];
      if (!route) return;

      event.preventDefault();
      showPage(route);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} user={user} onNavigate={showPage} />
      <main className="main">
        <Topbar />
        <PageRenderer activePage={activePage} />
      </main>
      <MobileNav activePage={activePage} onNavigate={showPage} />
    </div>
  );
}
