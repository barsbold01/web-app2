export default function AuthNavbar() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="/" className="nav__logo">
          <div className="nav__logo-box">
            <svg className="icon icon-24" viewBox="0 0 24 24">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
              <path d="M6 12v5c3.33 1.67 6.67 1.67 10 0v-5" />
            </svg>
          </div>
          <span className="nav__brand">NEXT STEPS</span>
        </a>
        <div className="nav__links">
          <a href="/app#universities" className="nav__link">Их Сургуулиуд</a>
          <a href="/app#scholarships" className="nav__link">Тэтгэлгүүд</a>
          <a href="/app#exams" className="nav__link">Шалгалтууд</a>
        </div>
        <a href="/" className="nav__link nav__link--back">← Буцах</a>
      </div>
    </nav>
  );
}
