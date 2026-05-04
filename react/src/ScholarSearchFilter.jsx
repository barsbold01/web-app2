import { useState, useEffect, useCallback } from 'react';

const INITIAL = { query: '', region: 'all', activeTab: 'all' };

const TABS = [
  { key: 'all',     label: 'БҮХ ТЭТГЭЛЭГ' },
  { key: 'full',    label: 'БҮТЭН САНХҮҮЖИЛТ' },
  { key: 'partial', label: 'ХАГАС САНХҮҮЖИЛТ' },
];

export default function ScholarSearchFilter() {
  const [filters, setFilters] = useState(INITIAL);
  const [panelOpen, setPanelOpen] = useState(false);

  const dispatch = useCallback((f) => {
    window.dispatchEvent(new CustomEvent('scholarFiltersChanged', { detail: f }));
  }, []);

  useEffect(() => {
    dispatch(filters);
  }, [filters, dispatch]);

  const set = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const setTab = (key) => {
    setFilters((prev) => ({ ...prev, activeTab: key }));
  };

  const reset = () => {
    setFilters(INITIAL);
    setPanelOpen(false);
  };

  return (
    <>
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
          <button className="uni-filter-btn" onClick={() => setPanelOpen((o) => !o)}>
            ШҮҮЛТҮҮР
          </button>
        </div>
      </div>

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
          <button className="reset-btn" onClick={reset}>
            ✕ RESET
          </button>
        </div>
      </div>
    </>
  );
}
