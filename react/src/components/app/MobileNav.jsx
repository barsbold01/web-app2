import AppIcon from './AppIcon';
import { pages } from './appPages';

export default function MobileNav({ activePage, onNavigate }) {
  return (
    <nav className="mobile-nav">
      {pages.map((page) => (
        <button
          key={page.id}
          type="button"
          className={`mobile-nav__item${activePage === page.id ? ' active' : ''}`}
          onClick={() => onNavigate(page.id)}
        >
          <AppIcon name={page.icon} className="" />
          <span>{page.mobile}</span>
        </button>
      ))}
    </nav>
  );
}
