import { useState, useEffect } from 'react';

const HeartSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default function ScholarCard({ sch, onCardClick }) {
  const isSavedFn = () =>
    typeof fav_isScholarSaved === 'function' && fav_isScholarSaved(sch.id);

  const [saved, setSaved] = useState(isSavedFn);

  useEffect(() => {
    const sync = () => setSaved(isSavedFn());
    window.addEventListener('favoritesChanged', sync);
    return () => window.removeEventListener('favoritesChanged', sync);
  }, [sch.id]);

  const toggleSave = (e) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    if (next) {
      typeof fav_saveScholar === 'function' && fav_saveScholar(sch);
    } else {
      typeof fav_removeScholar === 'function' && fav_removeScholar(sch.id);
    }
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const handleApply = (e) => {
    e.stopPropagation();
    window.open(sch.applyLink, '_blank', 'noopener');
  };

  return (
    <div className="scholar-card" onClick={() => onCardClick(sch)}>
      <div className="scholar-card__header">
        <div className="scholar-card__logo">{sch.logo}</div>
        <div className="scholar-card__title-wrap">
          <h3 className="scholar-card__name">{sch.name}</h3>
          <p className="scholar-card__provider">{sch.provider}</p>
        </div>
        <button
          className={`heart-btn${saved ? ' is-active' : ''}`}
          aria-label="Хадгалах"
          onClick={toggleSave}
        >
          <HeartSVG />
        </button>
      </div>

      <div className="scholar-card__funding-box">
        <span className="funding-label">{sch.fundingLabel}</span>
        <div className="funding-type">{sch.fundingType}</div>
      </div>

      <div className="scholar-card__tags">
        {sch.tags.map(tag => (
          <span key={tag} className="uni-tag">{tag}</span>
        ))}
      </div>

      <div className="scholar-card__footer">
        <div className="scholar-card__deadline">
          <span className="deadline-label">ДУУСАХ ХУГАЦАА</span>
          <span className="deadline-date">{sch.deadline}</span>
        </div>
        <button className="apply-btn" onClick={handleApply}>БҮРТГҮҮЛЭХ</button>
      </div>
    </div>
  );
}
