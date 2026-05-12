import { useState, useEffect } from 'react';
import ScholarCard from './ScholarCard';

const INITIAL = { query: '', region: 'all', activeTab: 'all' };

const TABS = [
  { key: 'all',     label: 'БҮХ ТЭТГЭЛЭГ' },
  { key: 'full',    label: 'БҮТЭН САНХҮҮЖИЛТ' },
  { key: 'partial', label: 'ХАГАС САНХҮҮЖИЛТ' },
];

export default function ScholarSection() {
  const [filters, setFilters] = useState(INITIAL);
  const [panelOpen, setPanelOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams({
        search: filters.query,
        region: filters.region,
        funding: filters.activeTab,
      });

      try {
        const response = await fetch(`${window.API_BASE_URL || ''}/api/scholarships?${params}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API error ${response.status}`);
        setScholarships(await response.json());
      } catch (error) {
        if (error.name !== 'AbortError') {
          await window.appData;
          setScholarships(window.SCHOLARSHIPS || []);
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

  const set = (key) => (e) =>
    setFilters(prev => ({ ...prev, [key]: e.target.value }));

  const setTab = (key) =>
    setFilters(prev => ({ ...prev, activeTab: key }));

  const reset = () => { setFilters(INITIAL); setPanelOpen(false); };

  const openModal = (sch) => {
    if (typeof window.openScholarModal === 'function') window.openScholarModal(sch);
  };

  return (
    <>
      {/* ── Hero + Search ── */}
      <div className="uni-hero">
        <h1>Өөрт тохирсон тэтгэлгээ ол</h1>
        <div className="uni-search-row">
          <div className="uni-search-wrap">
            <svg className="icon icon-18" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="uni-search-input"
              type="text"
              placeholder="Тэтгэлэг, их сургуулиуд, улсаар хайх ..."
              value={filters.query}
              onChange={set('query')}
            />
          </div>
          <button className="uni-filter-btn" onClick={() => setPanelOpen(o => !o)}>
            ШҮҮЛТҮҮР
          </button>
        </div>
      </div>

      {/* ── Funding tabs ── */}
      <div className="scholarship-tabs">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`tab-btn${filters.activeTab === key ? ' active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Filter panel ── */}
      <div className={`filter-panel${panelOpen ? ' active' : ''}`}>
        <div className="filter-grid">
          <div className="filter-group">
            <label>УЛС</label>
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
        </div>
        <div className="filter-footer">
          <div />
          <button className="reset-btn" onClick={reset}>✕ RESET</button>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="uni-results-area">
        <div className="uni-results-header">
          {loading ? 'Ачаалж байна...' : `Нийт ${scholarships.length} тэтгэлэг олдлоо`}
        </div>
        <div className="uni-grid scholarship-grid">
          {scholarships.map(sch => (
            <ScholarCard key={sch.id} sch={sch} onCardClick={openModal} />
          ))}
        </div>
      </div>
    </>
  );
}
