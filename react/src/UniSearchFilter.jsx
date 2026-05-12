import { useState, useEffect } from 'react';
import UniCard from './UniCard';

const INITIAL = {
  query: '',
  region: 'all',
  program: 'all',
  sort: 'ranking',
  tuition: 'all',
  scholarOnly: false,
};

const FilterSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </svg>
);

export default function UniSection() {
  const [filters, setFilters] = useState(INITIAL);
  const [panelOpen, setPanelOpen] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams({
        search: filters.query,
        region: filters.region,
        program: filters.program,
        sort: filters.sort,
        tuition: filters.tuition,
        scholarOnly: String(filters.scholarOnly),
      });

      try {
        const response = await fetch(`${window.API_BASE_URL || ''}/api/universities?${params}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API error ${response.status}`);
        setUniversities(await response.json());
      } catch (error) {
        if (error.name !== 'AbortError') {
          await window.appData;
          setUniversities(window.UNIVERSITIES || []);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [filters]);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => { setFilters(INITIAL); setPanelOpen(false); };

  const openModal = (uni) => {
    if (typeof window.openUniModal === 'function') window.openUniModal(uni);
  };

  return (
    <>
      {/* ── Hero + Search ── */}
      <div className="uni-hero">
        <h1>Дэлхийн их дээд<br />сургуулиудыг судлаарай</h1>
        <div className="uni-search-row">
          <div className="uni-search-wrap">
            <svg className="icon icon-18" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="uni-search-input"
              type="text"
              placeholder="Сургууль, улс, хотын нэрээр хайх..."
              value={filters.query}
              onChange={set('query')}
            />
          </div>
          <button className="uni-filter-btn" onClick={() => setPanelOpen(o => !o)}>
            <FilterSVG /> ШҮҮЛТҮҮР
          </button>
        </div>
      </div>

      {/* ── Filter panel ── */}
      <div className={`filter-panel${panelOpen ? ' active' : ''}`}>
        <div className="filter-grid">
          <div className="filter-group">
            <label>БҮС НУТАГ</label>
            <select value={filters.region} onChange={set('region')}>
              <option value="all">Бүгд (All)</option>
              <option value="usa">АНУ (USA)</option>
              <option value="uk">Их Британи (UK)</option>
              <option value="japan">Япон (Japan)</option>
              <option value="korea">Өмнөд Солонгос</option>
              <option value="australia">Австрали</option>
              <option value="china">Хятад</option>
              <option value="europe">Европ</option>
              <option value="canada">Канада</option>
            </select>
          </div>
          <div className="filter-group">
            <label>ХӨТӨЛБӨРИЙН ТӨРӨЛ</label>
            <select value={filters.program} onChange={set('program')}>
              <option value="all">Бүгд (All)</option>
              <option value="engineering">Инженерчлэл</option>
              <option value="computer-science">Компьютерийн шинжлэх ухаан</option>
              <option value="business">Бизнес ба Удирдах ухаан</option>
              <option value="medicine">Анагаах ухаан</option>
              <option value="law">Хууль эрх зүй</option>
              <option value="natural-sciences">Байгалийн шинжлэх ухаан</option>
              <option value="mathematics">Математик</option>
              <option value="economics">Эдийн засаг</option>
              <option value="arts-humanities">Урлаг ба Хүмүүнлэг</option>
            </select>
          </div>
          <div className="filter-group">
            <label>ЭРЭМБЭЛЭХ</label>
            <select value={filters.sort} onChange={set('sort')}>
              <option value="ranking">Эрэмбээр (Ranking)</option>
              <option value="tuition-low">Төлбөр (Багаас их рүү)</option>
              <option value="tuition-high">Төлбөр (Ихээс бага руу)</option>
              <option value="name">Нэрээр (A-Z)</option>
            </select>
          </div>
          <div className="filter-group">
            <label>СУРГАЛТЫН ТӨЛБӨР</label>
            <select value={filters.tuition} onChange={set('tuition')}>
              <option value="all">Бүгд (All)</option>
              <option value="free">Үнэ төлбөргүй / Бүрэн тэтгэлэгт</option>
              <option value="low">Хямд ($0–$5,000)</option>
              <option value="mid">Дундаж ($5,000–$20,000)</option>
              <option value="high">Өндөр ($20,000–$40,000)</option>
              <option value="very-high">Маш өндөр ($40,000+)</option>
            </select>
          </div>
        </div>
        <div className="filter-footer">
          <label className="checkbox-container">
            <input type="checkbox" checked={filters.scholarOnly} onChange={set('scholarOnly')} />
            <span className="checkmark" />
            ЗӨВХӨН ТЭТГЭЛЭГТЭЙ СУРГУУЛИУД
          </label>
          <button className="reset-btn" onClick={reset}>✕ RESET</button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="uni-stats">
        <div className="uni-stat">
          <span className="uni-stat__num">500+</span>
          <span className="uni-stat__label">Сургууль</span>
        </div>
        <div className="uni-stat">
          <span className="uni-stat__num">40+</span>
          <span className="uni-stat__label">Улс орон</span>
        </div>
        <div className="uni-stat">
          <span className="uni-stat__num">100+</span>
          <span className="uni-stat__label">Хөтөлбөр</span>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="uni-results-area">
        <div className="uni-results-header">
          {loading ? 'Ачаалж байна...' : `Нийт ${universities.length} сургууль олдлоо`}
        </div>
        <div className="uni-grid">
          {universities.map(uni => (
            <UniCard key={uni.id} uni={uni} onCardClick={openModal} />
          ))}
        </div>
      </div>
    </>
  );
}
