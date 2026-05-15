import { pageTitles } from './appPages';

export default function PageHeader({ page }) {
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
