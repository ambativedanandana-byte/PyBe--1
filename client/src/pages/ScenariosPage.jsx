import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, X, Lightbulb, Target, BookOpen, ListFilter } from 'lucide-react';
import defaultScenarios from '../data/scenariosData.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function api(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`Failed to load (${response.status})`);
  return response.json();
}

function difficultyAccent(d) {
  if (d === 'Beginner') return 'verdant';
  if (d === 'Explorer') return 'azure';
  if (d === 'Builder') return 'golden';
  return 'rose';
}

export default function ScenariosPage({ scenarios: initialScenarios = [] }) {
  const [scenarios, setScenarios] = useState(
    initialScenarios && initialScenarios.length > 0 ? initialScenarios : defaultScenarios
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (Array.isArray(initialScenarios) && initialScenarios.length > 0) {
      setScenarios(initialScenarios);
      setLoading(false);
      setError(null);
    } else {
      let cancelled = false;
      api('/scenarios')
        .then((data) => {
          if (cancelled) return;
          if (Array.isArray(data) && data.length > 0) {
            setScenarios(data);
            setError(null);
          }
        })
        .catch((err) => {
          if (cancelled) return;
          // Keep defaultScenarios without displaying error
        })
        .finally(() => {
          if (cancelled) return;
          setLoading(false);
        });
      return () => { cancelled = true; };
    }
  }, [initialScenarios]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scenarios.filter((s) => {
      if (difficulty && s.difficulty !== difficulty) return false;
      if (q) {
        const inTitle = s.title.toLowerCase().includes(q);
        const inContext = (s.context || '').toLowerCase().includes(q);
        const inConcept = (s.concepts || []).some((c) => c.toLowerCase().includes(q));
        if (!inTitle && !inContext && !inConcept) return false;
      }
      return true;
    });
  }, [scenarios, search, difficulty]);

  const selected = filtered.find((s) => s._id === selectedId) || null;

  function clearFilters() {
    setSearch('');
    setDifficulty('');
  }

  const hasActiveFilter = Boolean(search || difficulty);

  return (
    <div className="scn-page">
      <header className="scn-page-head">
        <div className="scn-page-head-left">
          <p className="scn-page-eyebrow">Scenario library</p>
          <h1 className="scn-page-title">Scenarios</h1>
          <p className="scn-page-subtitle">
            Real-world situations that build your Python reasoning.
            Pick one to read the context, the challenge, and what you would learn.
          </p>
        </div>
        <div className="scn-page-head-stats" aria-live="polite">
          <div className="scn-stat">
            <span className="scn-stat-value">{filtered.length}</span>
            <span className="scn-stat-label">Showing</span>
          </div>
          <div className="scn-stat">
            <span className="scn-stat-value">{scenarios.length}</span>
            <span className="scn-stat-label">Total</span>
          </div>
        </div>
      </header>

      <section className="scn-filters" aria-label="Filter scenarios">
        <div className="scn-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, concept, or keyword…"
            aria-label="Search scenarios"
          />
          {search && (
            <button
              type="button"
              className="scn-search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="scn-difficulty-group" role="group" aria-label="Filter by difficulty">
          <button
            type="button"
            className={`scn-diff-btn ${difficulty === '' ? 'is-active' : ''}`}
            onClick={() => setDifficulty('')}
          >
            All
          </button>
          <button
            type="button"
            className={`scn-diff-btn scn-diff-btn--beginner ${difficulty === 'Beginner' ? 'is-active' : ''}`}
            onClick={() => setDifficulty('Beginner')}
          >
            Beginner
          </button>
          <button
            type="button"
            className={`scn-diff-btn scn-diff-btn--explorer ${difficulty === 'Explorer' ? 'is-active' : ''}`}
            onClick={() => setDifficulty('Explorer')}
          >
            Explorer
          </button>
          <button
            type="button"
            className={`scn-diff-btn scn-diff-btn--builder ${difficulty === 'Builder' ? 'is-active' : ''}`}
            onClick={() => setDifficulty('Builder')}
          >
            Builder
          </button>
        </div>
        {hasActiveFilter && (
          <button type="button" className="scn-clear-all" onClick={clearFilters}>
            <ListFilter size={14} aria-hidden="true" /> Clear filters
          </button>
        )}
      </section>

      <div className="scn-content">
        <section className="scn-list" aria-label="Scenario list">
          {loading && (
            <div className="scn-state" role="status">
              <div className="scn-state-spinner" aria-hidden="true" />
              <p>Loading scenarios…</p>
            </div>
          )}

          {!loading && error && (
            <div className="scn-state scn-state--error" role="alert">
              <p>Couldn't load scenarios.</p>
              <p className="scn-state-detail">{error}</p>
              <p className="scn-state-detail">Make sure the server is running, then refresh the page.</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="scn-state" role="status">
              <p>No scenarios match your filters.</p>
              {hasActiveFilter && (
                <button type="button" className="scn-state-action" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <ol className="scn-grid" role="list">
              {filtered.map((s) => {
                const accent = difficultyAccent(s.difficulty);
                const isSelected = s._id === selectedId;
                return (
                  <li key={s._id}>
                    <button
                      type="button"
                      className={`scn-card scn-card--${accent} ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedId(s._id)}
                      aria-pressed={isSelected}
                    >
                      <span className={`scn-card-badge scn-card-badge--${accent}`}>
                        {s.difficulty}
                      </span>
                      <h3 className="scn-card-title">{s.title}</h3>
                      <p className="scn-card-context">
                        {s.context?.length > 110
                          ? s.context.slice(0, 110).trim() + '…'
                          : s.context}
                      </p>
                      <div className="scn-card-concepts">
                        {(s.concepts || []).slice(0, 3).map((c) => (
                          <span key={c} className="scn-card-concept">{c}</span>
                        ))}
                        {(s.concepts || []).length > 3 && (
                          <span className="scn-card-concept scn-card-concept--more">
                            +{s.concepts.length - 3}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <aside className="scn-detail-pane" aria-label="Scenario detail">
          {selected ? (
            <article className="scn-detail" key={selected._id}>
              <header className="scn-detail-head">
                <span className={`scn-card-badge scn-card-badge--${difficultyAccent(selected.difficulty)}`}>
                  {selected.difficulty}
                </span>
                <h2 className="scn-detail-title">{selected.title}</h2>
                {selected.concepts?.length > 0 && (
                  <div className="scn-detail-concepts">
                    {selected.concepts.map((c) => (
                      <span key={c} className="scn-detail-concept">{c}</span>
                    ))}
                  </div>
                )}
              </header>

              <section className="scn-detail-section">
                <p className="scn-detail-label">
                  <BookOpen size={14} aria-hidden="true" /> The situation
                </p>
                <p className="scn-detail-text">{selected.context}</p>
              </section>

              <section className="scn-detail-section scn-detail-section--accent">
                <p className="scn-detail-label">
                  <Target size={14} aria-hidden="true" /> Your challenge
                </p>
                <p className="scn-detail-text scn-detail-text--prompt">
                  {selected.prompt}
                </p>
              </section>

              {selected.objectives?.length > 0 && (
                <section className="scn-detail-section">
                  <p className="scn-detail-label">
                    <Lightbulb size={14} aria-hidden="true" /> You'll be practicing
                  </p>
                  <ul className="scn-detail-objectives">
                    {selected.objectives.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </section>
              )}

              {selected.sampleReasoning && (
                <section className="scn-detail-section scn-detail-section--quote">
                  <p className="scn-detail-label">A sample reasoning</p>
                  <p className="scn-detail-text scn-detail-text--quote">
                    {selected.sampleReasoning}
                  </p>
                </section>
              )}

              <div className="scn-detail-foot">
                <button
                  type="button"
                  className="scn-detail-back"
                  onClick={() => setSelectedId(null)}
                >
                  Back to all scenarios
                </button>
              </div>
            </article>
          ) : (
            <div className="scn-detail-empty">
              <Sparkles size={28} aria-hidden="true" />
              <p className="scn-detail-empty-title">Pick a scenario</p>
              <p className="scn-detail-empty-text">
                Select a card on the left to read the context, challenge, and what you would learn.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
