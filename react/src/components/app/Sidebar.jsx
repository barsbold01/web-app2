import AppIcon from './AppIcon';
import { pages } from './appPages';

export default function Sidebar({ activePage, user, onNavigate }) {
  const name = user?.name || 'Хэрэглэгч';
  const grade = user?.grade || '12-р ангийн сурагч';
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside className="sidebar" id="app-sidebar">
      <button className="logo" type="button" aria-label="Нүүр хуудас руу очих" onClick={() => onNavigate('dashboard')}>
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
          onClick={() => onNavigate(page.id)}
        >
          <AppIcon name={page.icon} />
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
  );
}
