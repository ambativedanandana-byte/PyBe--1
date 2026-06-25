import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Brain,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Lightbulb,
  MessageSquareText,
  Play,
  Route,
  Search,
  Send,
  Sparkles
} from 'lucide-react';
import './styles.css';
import ErrorDetectivePage from './pages/ErrorDetectivePage';

// Topic lists per level — mirrors LEVELS in ErrorDetectivePage (kept here for sidebar use)
const LEVEL_TOPICS = {
  Beginner: ['arithmetic','comparisons','conditionals','counting','indexing','lists','strings','subtraction','variables'],
  Explorer: ['averages','comparisons','conditionals','dictionaries','filtering','lists','loops','modulo','search','sets','strings'],
  Builder:  ['adaptive logic','comparisons','conditionals','dictionaries','formatting','functions','lists','mutation','search','strings','validation','while loops']
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function api(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

function App() {
  const [scenarios, setScenarios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [filters, setFilters] = useState({ q: '', difficulty: '', concept: '' });
  const [form, setForm] = useState({ learnerName: 'Guest learner', reasoning: '', promptText: '', reflection: '' });
  const [activeResult, setActiveResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [route, setRoute] = useState(window.location.pathname);

  // Error Detective State
  const [errorQuestions, setErrorQuestions] = useState([]);
  const [errorSolvedIds, setErrorSolvedIds] = useState([]);
  const [errorSubmissions, setErrorSubmissions] = useState([]);
  const [errorStats, setErrorStats] = useState({
    totalCompleted: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    progressPercentage: 0,
    accuracyPercentage: 0,
    totalQuestionsCount: 0
  });
  const [errorFilters, setErrorFilters] = useState({ q: '', level: '', topic: '' });
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  const concepts = useMemo(() => [...new Set(scenarios.flatMap((scenario) => scenario.concepts || []))].sort(), [scenarios]);

  const errorTopics = useMemo(() => {
    return [...new Set(errorQuestions.map((q) => q.topic))].sort();
  }, [errorQuestions]);

  const filteredErrorQuestions = useMemo(() => {
    return errorQuestions.filter((q) => {
      const matchesQ = !errorFilters.q || 
        q.title.toLowerCase().includes(errorFilters.q.toLowerCase()) ||
        q.topic.toLowerCase().includes(errorFilters.q.toLowerCase()) ||
        q.errorType.toLowerCase().includes(errorFilters.q.toLowerCase());
      const matchesLevel = !errorFilters.level || q.level === errorFilters.level;
      const matchesTopic = !errorFilters.topic || q.topic === errorFilters.topic;
      return matchesQ && matchesLevel && matchesTopic;
    });
  }, [errorQuestions, errorFilters]);

  async function refresh() {
    try {
      const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value));
      const [
        scenarioData,
        sessionData,
        analyticsData,
        roadmapData,
        questionsData,
        progressData
      ] = await Promise.all([
        api(`/scenarios?${params}`),
        api('/sessions'),
        api('/analytics'),
        api('/roadmap'),
        api('/error-detective/questions'),
        api('/error-detective/progress')
      ]);
      setScenarios(scenarioData);
      setSessions(sessionData);
      setAnalytics(analyticsData);
      setRoadmap(roadmapData);
      setSelected((current) => current || scenarioData[0] || null);

      setErrorQuestions(questionsData);
      setErrorSolvedIds(progressData.completedQuestions || []);
      setErrorSubmissions(progressData.submissions || []);
      if (progressData.stats) {
        setErrorStats(progressData.stats);
      } else {
        setErrorStats((prev) => ({ ...prev, totalQuestionsCount: questionsData.length }));
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server. Please make sure the server is running on http://localhost:5000.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [filters.q, filters.difficulty, filters.concept]);

  async function submitSession(event) {
    event.preventDefault();
    if (!selected || !form.reasoning.trim()) return;
    setSubmitting(true);
    try {
      const result = await api('/sessions', {
        method: 'POST',
        body: JSON.stringify({ ...form, scenarioId: selected._id })
      });
      setActiveResult(result);
      setForm({ ...form, reasoning: '', promptText: '', reflection: '' });
      await refresh();
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <main className="loading">Loading PyBe...</main>;

  if (error) {
    return (
      <main className="loading" style={{ flexDirection: 'column', gap: '1rem', color: '#ff6b6b', textAlign: 'center', padding: '2rem' }}>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={() => { setLoading(true); refresh(); }} className="primary" style={{ marginTop: '1rem' }}>Retry</button>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Brain size={30} />
          <div>
            <strong>PyBe</strong>
            <span>Scenario-first Python</span>
          </div>
        </div>

        <nav className="main-nav">
          <button
            className={`nav-link ${route === '/' ? 'active' : ''}`}
            onClick={() => navigateTo('/')}
          >
            <Compass size={18} /> Scenarios
          </button>
          <button
            className={`nav-link ${route === '/error-detective' ? 'active' : ''}`}
            onClick={() => {
              setSelectedLevel(null);
              setSelectedTopic(null);
              setSelectedQuestionId(null);
              navigateTo('/error-detective');
            }}
          >
            <Code2 size={18} /> Error Detective
          </button>
        </nav>

        {route === '/error-detective' ? (
          <>
            <label className="search">
              <Search size={18} />
              <input
                value={errorFilters.q}
                onChange={(event) => {
                  setErrorFilters({ ...errorFilters, q: event.target.value });
                }}
                placeholder="Search challenges"
              />
            </label>

            <select
              value={errorFilters.level}
              onChange={(event) => {
                setErrorFilters({ ...errorFilters, level: event.target.value });
              }}
            >
              <option value="">All levels</option>
              <option>Beginner</option>
              <option>Explorer</option>
              <option>Builder</option>
            </select>

            <select
              value={errorFilters.topic}
              onChange={(event) => {
                setErrorFilters({ ...errorFilters, topic: event.target.value });
              }}
            >
              <option value="">All topics</option>
              {errorTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </option>
              ))}
            </select>

            {/* Error Detective topics section — shown when a level is chosen */}
            {errorFilters.level && (() => {
              const levelTopics = LEVEL_TOPICS[errorFilters.level] || [];
              const allDone = (lvl) =>
                (LEVEL_TOPICS[lvl] || []).every(t => {
                  const qs = errorQuestions.filter(q => q.level === lvl && q.topic === t);
                  return qs.length > 0 && qs.every(q => errorSolvedIds.includes(q.id));
                });
              const levelUnlocked =
                errorFilters.level === 'Beginner' ? true
                : errorFilters.level === 'Explorer' ? allDone('Beginner')
                : errorFilters.level === 'Builder'  ? allDone('Explorer')
                : false;
              const unlockedTopics = (() => {
                if (!levelUnlocked) return new Set();
                if (errorFilters.level !== 'Beginner') return new Set(levelTopics);
                const s = new Set();
                for (const t of levelTopics) {
                  s.add(t);
                  const qs = errorQuestions.filter(q => q.level === 'Beginner' && q.topic === t);
                  if (!(qs.length > 0 && qs.every(q => errorSolvedIds.includes(q.id)))) break;
                }
                return s;
              })();
              return (
                <>
                  <div style={{
                    fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: '#7b9f27',
                    padding: '6px 2px 2px', borderTop: '1px solid #2a3d38', flexShrink: 0,
                  }}>
                    Error Detective
                  </div>
                  {levelTopics.map(topic => {
                    const topicQs  = errorQuestions.filter(q => q.level === errorFilters.level && q.topic === topic);
                    const solved   = topicQs.filter(q => errorSolvedIds.includes(q.id)).length;
                    const isActive = selectedTopic === topic && selectedLevel === errorFilters.level;
                    const isLocked = !unlockedTopics.has(topic);
                    const mastered = solved === topicQs.length && topicQs.length > 0;
                    return (
                      <button
                        key={topic}
                        className={isActive ? 'scenario active' : 'scenario'}
                        disabled={isLocked}
                        title={isLocked ? 'Complete the previous topic to unlock' : undefined}
                        style={isLocked ? { opacity: 0.4, cursor: 'not-allowed', flexShrink: 0 } : { flexShrink: 0 }}
                        onClick={() => {
                          if (isLocked) return;
                          const firstUnsolved = topicQs.find(q => !errorSolvedIds.includes(q.id));
                          setSelectedLevel(errorFilters.level);
                          setSelectedTopic(topic);
                          setSelectedQuestionId((firstUnsolved || topicQs[0])?.id || null);
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {isLocked ? String.fromCodePoint(0x1F512) + ' Locked' : mastered ? String.fromCharCode(0x2713) + ' Mastered' : errorFilters.level}
                        </span>
                        <strong style={{ textTransform: 'capitalize' }}>{topic}</strong>
                        {!isLocked && <small>{solved} / {topicQs.length} solved</small>}
                      </button>
                    );
                  })}
                </>
              );
            })()}

            <div className="scenario-list">
              {filteredErrorQuestions.map((q) => (
                <button
                  key={q.id}
                  className={selectedQuestionId === q.id ? 'scenario active' : 'scenario'}
                  onClick={() => {
                    setSelectedLevel(q.level);
                    setSelectedTopic(q.topic);
                    setSelectedQuestionId(q.id);
                  }}
                >
                  <span>{q.level} • {q.errorType}</span>
                  <strong>{q.title}</strong>
                  <small>{q.topic}</small>
                </button>
              ))}
              {filteredErrorQuestions.length === 0 && (
                <div style={{ padding: '16px', color: '#b9c7bf', textAlign: 'center', fontSize: '0.9rem' }}>
                  No challenges found
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <label className="search">
              <Search size={18} />
              <input
                value={filters.q}
                onChange={(event) => {
                  setFilters({ ...filters, q: event.target.value });
                }}
                placeholder="Search scenarios"
              />
            </label>

            <select
              value={filters.difficulty}
              onChange={(event) => {
                setFilters({ ...filters, difficulty: event.target.value });
              }}
            >
              <option value="">All levels</option>
              <option>Beginner</option>
              <option>Explorer</option>
              <option>Builder</option>
            </select>

            <select
              value={filters.concept}
              onChange={(event) => {
                setFilters({ ...filters, concept: event.target.value });
              }}
            >
              <option value="">All concepts</option>
              {concepts.map((concept) => <option key={concept}>{concept}</option>)}
            </select>

            <div className="scenario-list">
              {scenarios.map((scenario) => (
                <button
                  key={scenario._id}
                  className={selected?._id === scenario._id ? 'scenario active' : 'scenario'}
                  onClick={() => {
                    setSelected(scenario);
                    setActiveResult(null);
                  }}
                >
                  <span>{scenario.difficulty}</span>
                  <strong>{scenario.title}</strong>
                  <small>{scenario.concepts.join(' / ')}</small>
                </button>
              ))}
              {scenarios.length === 0 && (
                <div style={{ padding: '16px', color: '#b9c7bf', textAlign: 'center', fontSize: '0.9rem' }}>
                  No scenarios found
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      {route === '/error-detective' ? (
        <ErrorDetectivePage
          questions={errorQuestions}
          solvedIds={errorSolvedIds}
          submissions={errorSubmissions}
          stats={errorStats}
          setSolvedIds={setErrorSolvedIds}
          setSubmissions={setErrorSubmissions}
          setStats={setErrorStats}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedQuestionId={selectedQuestionId}
          setSelectedQuestionId={setSelectedQuestionId}
          api={api}
        />
      ) : (
        <section className="workspace">
          <header className="hero">
            <div>
              <p>AI-native learning journey</p>
              <h1>Learn Python by reasoning through real situations first.</h1>
            </div>
            <div className="hero-stats">
              <span>{analytics?.scenarioCount || 0}<small>Scenarios</small></span>
              <span>{analytics?.sessionCount || 0}<small>Sessions</small></span>
              <span>{analytics?.averagePromptScore || 0}<small>Prompt score</small></span>
            </div>
          </header>

          <div className="main-grid">
            <section className="panel learning-panel">
              <div className="section-title">
                <Compass size={20} />
                <h2>{selected?.title}</h2>
              </div>
              <p className="context">{selected?.context}</p>
              <div className="objective-row">
                {selected?.objectives.map((item) => <span key={item}>{item}</span>)}
              </div>
              <form onSubmit={submitSession} className="learning-form">
                <label>
                  Your reasoning
                  <textarea
                    required
                    value={form.reasoning}
                    onChange={(event) => setForm({ ...form, reasoning: event.target.value })}
                    placeholder={selected?.prompt}
                  />
                </label>
                <label>
                  Prompt you would give an AI mentor
                  <textarea
                    value={form.promptText}
                    onChange={(event) => setForm({ ...form, promptText: event.target.value })}
                    placeholder="Explain my approach step by step, then show the Python concept and code..."
                  />
                </label>
                <label>
                  Reflection
                  <textarea
                    value={form.reflection}
                    onChange={(event) => setForm({ ...form, reflection: event.target.value })}
                    placeholder="What did you notice about your thinking?"
                  />
                </label>
                <button className="primary" disabled={submitting}>
                  <Send size={18} />{submitting ? 'Mapping...' : 'Map My Reasoning'}
                </button>
              </form>
            </section>

            <section className="panel result-panel">
              <div className="section-title">
                <Sparkles size={20} />
                <h2>AI Mentor Output</h2>
              </div>
              {!activeResult ? <EmptyResult /> : <Result result={activeResult} />}
            </section>
          </div>

          <section className="dashboard">
            <div className="panel">
              <div className="section-title"><ChartNoAxesCombined size={20} /><h2>Learner Analytics</h2></div>
              <Analytics analytics={analytics} />
            </div>
            <div className="panel">
              <div className="section-title"><Route size={20} /><h2>Roadmap</h2></div>
              <Roadmap roadmap={roadmap} />
            </div>
            <div className="panel">
              <div className="section-title"><MessageSquareText size={20} /><h2>Recent Sessions</h2></div>
              <SessionList sessions={sessions} />
            </div>
          </section>
        </section>
      )}
    </main>
  );
}

function EmptyResult() {
  return (
    <div className="empty">
      <Lightbulb size={38} />
      <p>Submit reasoning to see abstraction mapping, Python code, prompt feedback, and misconception signals.</p>
    </div>
  );
}

function Result({ result }) {
  return (
    <div className="result-stack">
      <div className="score"><span>{result.promptScore}</span><small>Prompt maturity</small></div>
      <div>
        {result.abstractionMap.map((item) => (
          <article className="mapping" key={item.pattern}>
            <strong>{item.pattern}</strong>
            <span>{item.pythonConcept}</span>
            <p>{item.explanation}</p>
          </article>
        ))}
      </div>
      <div className="code-block">
        <div><Code2 size={18} /> Generated Python</div>
        <pre>{result.generatedCode}</pre>
        <p>{result.codeExplanation}</p>
      </div>
      <ul className="feedback">
        {result.promptFeedback.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {result.misconceptions.length > 0 && (
        <div className="note">
          <strong>Misconception watch</strong>
          {result.misconceptions.map((item) => <p key={item}>{item}</p>)}
        </div>
      )}
    </div>
  );
}

function Analytics({ analytics }) {
  const concepts = Object.entries(analytics?.conceptCounts || {});
  return (
    <div className="analytics-list">
      {concepts.length ? concepts.map(([name, count]) => (
        <div key={name}>
          <span>{name}</span>
          <meter min="0" max="10" value={count}></meter>
          <strong>{count}</strong>
        </div>
      )) : <p>No learning sessions yet.</p>}
    </div>
  );
}

function Roadmap({ roadmap }) {
  return (
    <div className="roadmap">
      {roadmap.map((phase) => (
        <article key={phase.phase}>
          <strong>{phase.phase}</strong>
          <div>
            <h3>{phase.title}</h3>
            <p>{phase.summary}</p>
            <small>{phase.items.join(' / ')}</small>
          </div>
        </article>
      ))}
    </div>
  );
}

function SessionList({ sessions }) {
  return (
    <div className="sessions">
      {sessions.length ? sessions.slice(0, 6).map((session) => (
        <article key={session._id}>
          <Play size={16} />
          <div>
            <strong>{session.scenario?.title}</strong>
            <span>{session.masterySignals.join(' / ')}</span>
          </div>
        </article>
      )) : <p>No sessions yet.</p>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
