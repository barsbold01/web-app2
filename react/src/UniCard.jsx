import { useState, useEffect } from 'react';

const HeartSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ScholarBadgeSVG = () => (
  <svg className="icon icon-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

function assetPath(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path;
  return `/${path.replace(/^(\.\.\/)+/, '')}`;
}

export default function UniCard({ uni, onCardClick }) {
  const isSavedFn = () =>
    typeof fav_isUniSaved === 'function' && fav_isUniSaved(uni.id);

  const [saved, setSaved] = useState(isSavedFn);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = assetPath(uni.image);

  // Keep in sync when modal save button or another card fires favoritesChanged
  useEffect(() => {
    const sync = () => setSaved(isSavedFn());
    window.addEventListener('favoritesChanged', sync);
    return () => window.removeEventListener('favoritesChanged', sync);
  }, [uni.id]);

  const toggleSave = (e) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    if (next) {
      typeof fav_saveUni === 'function' && fav_saveUni(uni);
    } else {
      typeof fav_removeUni === 'function' && fav_removeUni(uni.id);
    }
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  return (
    <div className="uni-card" onClick={() => onCardClick(uni)}>
      <div className="uni-card__img-wrap">
        {(!imageReady || imageFailed) && <div className="uni-card__img-fallback">{uni.logo}</div>}
        {!imageFailed && imageSrc && (
          <img
            src={imageSrc}
            alt={uni.nameEn || uni.name}
            loading="lazy"
            onLoad={() => setImageReady(true)}
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="uni-card__rank">{uni.rankLabel}</span>
        <button
          className={`heart-btn${saved ? ' is-active' : ''}`}
          aria-label="Хадгалах"
          onClick={toggleSave}
        >
          <HeartSVG />
        </button>
        <span className="uni-card__type">{uni.type}</span>
      </div>

      <div className="uni-card__body">
        <div className="uni-card__identity">
          <div className="uni-card__logo">{uni.logo}</div>
          <div className="uni-card__info">
            <div className="uni-card__name">{uni.name}</div>
            <div className="uni-card__location">{uni.location}</div>
          </div>
        </div>

        <div className="uni-card__tags">
          {uni.tags.map(tag => (
            <span key={tag} className="uni-tag">{tag}</span>
          ))}
          {uni.hasScholarship && (
            <span className="uni-tag uni-tag--scholar">
              <ScholarBadgeSVG /> Тэтгэлэгт
            </span>
          )}
        </div>

        <hr className="uni-card__divider" />

        <div className="uni-card__stats">
          <div>
            <div className="uni-card__stat-label">Төлбөр</div>
            <div className="uni-card__stat-value">{uni.tuition}</div>
          </div>
          <div>
            <div className="uni-card__stat-label">Хугацаа</div>
            <div className="uni-card__stat-value">{uni.deadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
