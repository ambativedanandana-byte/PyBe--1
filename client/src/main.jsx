import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Award,
  BookmarkCheck,
  BookmarkPlus,
  Brain,
  ChartNoAxesCombined,
  ChevronDown,
  Code2,
  Compass,
  Filter,
  Layers,
  Lightbulb,
  MessageSquareText,
  Moon,
  Play,
  Route,
  Search,
  Send,
  Sparkles,
  Sun,
  Tag,
  Zap,
  LayoutDashboard,
  BookOpen,
  Terminal,
  HelpCircle,
  Trophy,
  TrendingUp,
  User,
  Settings,
  RefreshCw
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

  // ── UI Enhancement State ──
  const [theme, setTheme] = useState(() => localStorage.getItem('pybe-theme') || 'dark');
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pybe-bookmarks') || '[]'); }
    catch { return []; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pybe-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const toggleBookmark = (scenarioId) => {
    setBookmarks(prev => {
      const next = prev.includes(scenarioId)
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId];
      localStorage.setItem('pybe-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

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
    // When a level is selected, show only that level's topics in the dropdown
    const source = errorFilters.level
      ? errorQuestions.filter((q) => q.level === errorFilters.level)
      : errorQuestions;
    return [...new Set(source.map((q) => q.topic))].sort();
  }, [errorQuestions, errorFilters.level]);

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

  // Computed display scenarios (after bookmark filter)
  const displayScenarios = useMemo(() =>
    showBookmarksOnly ? scenarios.filter(s => bookmarks.includes(s._id)) : scenarios,
    [scenarios, bookmarks, showBookmarksOnly]
  );

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

  const resetErrorDetectiveProgress = async () => {
    if (!window.confirm('Reset all debugging progress? This clears your score and statistics.')) return;
    try {
      const result = await api('/error-detective/reset', { method: 'POST' });
      setErrorStats(result.stats || {
        totalCompleted: 0,
        totalAttempts: 0,
        correctAttempts: 0,
        progressPercentage: 0,
        accuracyPercentage: 0,
        totalQuestionsCount: errorQuestions.length
      });
      setErrorSolvedIds(result.completedQuestions || []);
      setErrorSubmissions(result.submissions || []);
      setSelectedLevel(null);
      setSelectedTopic(null);
      setSelectedQuestionId(null);
      alert('Progress successfully reset!');
    } catch (error) {
      console.error('Error resetting progress:', error);
      alert('Failed to reset progress.');
    }
  };

  // Overall progress for dashboard panel
  const scenariosDone = sessions.length;
  const totalScenarios = scenarios.length || 1;
  const scenarioPct = Math.min(100, Math.round((scenariosDone / totalScenarios) * 100));
  const edTotal = errorQuestions.length || 1;
  const edDone = errorQuestions.filter(q => errorSolvedIds.includes(q.id)).length;
  const edPct = Math.round((edDone / edTotal) * 100);
  const currentLevel = edDone === 0 ? 'Beginner' : edPct < 35 ? 'Beginner' : edPct < 70 ? 'Explorer' : 'Builder';

  const renderContent = () => {
    switch (route) {
      case '/learn-python':
        return (
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
        );

      case '/error-detective':
        return (
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
        );

      case '/practice':
        return <PracticeView stats={errorStats} solvedCount={edDone} />;
      case '/quiz':
        return <QuizView stats={errorStats} solvedCount={edDone} />;
      case '/achievements':
        return <AchievementsView solvedCount={edDone} totalCount={edTotal} />;
      case '/progress':
        return <ProgressView stats={errorStats} scenarioCount={scenariosDone} totalScenarios={totalScenarios} edDone={edDone} edTotal={edTotal} analytics={analytics} roadmap={roadmap} sessions={sessions} />;
      case '/profile':
        return <ProfileView stats={errorStats} solvedCount={edDone} currentLevel={currentLevel} scenariosDone={scenariosDone} />;
      case '/settings':
        return <SettingsView theme={theme} toggleTheme={toggleTheme} handleReset={resetErrorDetectiveProgress} />;

      case '/':
      case '/dashboard':
      default:
        return (
          <section className="workspace">
            <header className="hero">
              <div>
                <p>Welcome Back, Python Developer</p>
                <h1>Explore your progress and continue learning.</h1>
              </div>
              <div className="hero-stats">
                <span>{scenariosDone} / {totalScenarios}<small>Scenarios</small></span>
                <span>{edDone} / {edTotal}<small>Errors Debugged</small></span>
                <span>{(edDone * 10) + (scenariosDone * 50)}<small>Total XP</small></span>
              </div>
            </header>

            <div className="dashboard-summary-cards">
              <div className="panel summary-card">
                <h3>Current Level</h3>
                <div className="level-badge-large">{currentLevel}</div>
                <p>Keep resolving scenarios and errors to rank up.</p>
              </div>
              <div className="panel summary-card">
                <h3>Overall Accuracy</h3>
                <div className="accuracy-value-large">{errorStats.accuracyPercentage || 0}%</div>
                <p>Based on your last {errorStats.totalAttempts || 0} debugging attempts.</p>
              </div>
              <div className="panel summary-card">
                <h3>Next Milestone</h3>
                <div className="milestone-badge-large">
                  {currentLevel === 'Beginner' ? 'Explorer' : currentLevel === 'Explorer' ? 'Builder' : 'Master'}
                </div>
                <p>Complete {currentLevel === 'Beginner' ? 'Beginner' : currentLevel === 'Explorer' ? 'Explorer' : 'Builder'} level to unlock.</p>
              </div>
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
        );
    }
  };

  return (
    <main className="app-shell" data-theme={theme}>
      {/* ── Theme Switcher Floating Icon on Dashboard ── */}
      <button className="workspace-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Switch Theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* ── Mobile menu overlay ── */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Mobile top bar ── */}
      <div className="mobile-topbar">
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <span className="mobile-brand">PyBe</span>
        <button className="theme-toggle-btn mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <aside className={`sidebar${sidebarOpen ? ' sidebar-mobile-open' : ''}`}>
        {/* ── Brand + Theme toggle ── */}
        <div className="brand">
          <div className="brand-icon-wrap">
            <Brain size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <strong>PyBe</strong>
            <span>Scenario-first Python</span>
          </div>
        </div>

        {/* ── Primary Nav Cards ── */}
        <nav className="main-nav">
          <button
            className={`nav-card ${route === '/' || route === '/dashboard' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/'); }}
          >
            <span className="nav-card-icon nav-icon-dashboard"><LayoutDashboard size={16} /></span>
            <span className="nav-card-label">Dashboard</span>
          </button>
          <button
            className={`nav-card ${route === '/learn-python' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/learn-python'); }}
          >
            <span className="nav-card-icon nav-icon-scenarios"><Compass size={16} /></span>
            <span className="nav-card-label">Learn Python</span>
            {scenarios.length > 0 && (
              <span className="nav-card-badge">{scenarios.length}</span>
            )}
          </button>
          <button
            className={`nav-card ${route === '/error-detective' ? 'active' : ''}`}
            onClick={() => {
              setSidebarOpen(false);
              setSelectedLevel(null);
              setSelectedTopic(null);
              setSelectedQuestionId(null);
              navigateTo('/error-detective');
            }}
          >
            <span className="nav-card-icon nav-icon-detective"><Code2 size={16} /></span>
            <span className="nav-card-label">Error Detective</span>
            {errorStats.totalCompleted > 0 && (
              <span className="nav-card-badge nav-badge-green">{errorStats.totalCompleted}</span>
            )}
          </button>
          <button
            className={`nav-card ${route === '/practice' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/practice'); }}
          >
            <span className="nav-card-icon nav-icon-practice"><Terminal size={16} /></span>
            <span className="nav-card-label">Practice</span>
          </button>
          <button
            className={`nav-card ${route === '/quiz' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/quiz'); }}
          >
            <span className="nav-card-icon nav-icon-quiz"><HelpCircle size={16} /></span>
            <span className="nav-card-label">Quiz</span>
          </button>
          <button
            className={`nav-card ${route === '/achievements' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/achievements'); }}
          >
            <span className="nav-card-icon nav-icon-achievements"><Trophy size={16} /></span>
            <span className="nav-card-label">Achievements</span>
          </button>
          <button
            className={`nav-card ${route === '/progress' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/progress'); }}
          >
            <span className="nav-card-icon nav-icon-progress"><TrendingUp size={16} /></span>
            <span className="nav-card-label">Progress</span>
          </button>
          <button
            className={`nav-card ${route === '/profile' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/profile'); }}
          >
            <span className="nav-card-icon nav-icon-profile"><User size={16} /></span>
            <span className="nav-card-label">Profile</span>
          </button>
          <button
            className={`nav-card ${route === '/settings' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/settings'); }}
          >
            <span className="nav-card-icon nav-icon-settings"><Settings size={16} /></span>
            <span className="nav-card-label">Settings</span>
          </button>
        </nav>

        {/* ── Divider ── */}
        <div className="sidebar-divider" />

        {/* ── Mini Progress Dashboard ── */}
        <div className="sb-dashboard">
          <div className="sb-dashboard-row">
            <Award size={11} className="sb-dashboard-icon" />
            <span className="sb-dashboard-label">Level</span>
            <span className="sb-dashboard-value sb-level-badge">{currentLevel}</span>
          </div>
          <div className="sb-dashboard-row">
            <span className="sb-dashboard-label">Scenarios</span>
            <span className="sb-dashboard-value">{scenarioPct}%</span>
          </div>
          <div className="sb-dashboard-bar-wrap">
            <div className="sb-dashboard-bar" style={{ width: `${scenarioPct}%`, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)' }} />
          </div>
          <div className="sb-dashboard-row" style={{ marginTop: 6 }}>
            <span className="sb-dashboard-label">Error Detective</span>
            <span className="sb-dashboard-value">{edPct}%</span>
          </div>
          <div className="sb-dashboard-bar-wrap">
            <div className="sb-dashboard-bar" style={{ width: `${edPct}%`, background: 'linear-gradient(90deg,#7b9f27,#d8f07c)' }} />
          </div>
        </div>

        <div className="sidebar-divider" />

        {route === '/error-detective' && (
          <>
            {/* ── Search ── */}
            <div className="sb-section-label">
              <Search size={12} /> Challenges
              <span className="sb-count-chip">{errorQuestions.length}</span>
            </div>
            <label className="search-modern">
              <Search size={15} className="search-icon" />
              <input
                value={errorFilters.q}
                onChange={(event) => {
                  setErrorFilters({ ...errorFilters, q: event.target.value });
                }}
                placeholder="Search challenges…"
              />
              {errorFilters.q && (
                <button className="search-clear" onClick={() => setErrorFilters({ ...errorFilters, q: '' })}>✕</button>
              )}
            </label>

            {/* ── Level Dropdown ── */}
            <div className="sb-filter-card">
              <div className="sb-filter-header">
                <span className="sb-filter-icon sb-icon-level"><Layers size={14} /></span>
                <span className="sb-filter-title">All Levels</span>
                {errorFilters.level && <span className="sb-active-pill">{errorFilters.level}</span>}
              </div>
              <div className="sb-select-wrap">
                <select
                  value={errorFilters.level}
                  onChange={(event) => {
                    // Reset topic when level changes so stale selections are cleared
                    setErrorFilters({ ...errorFilters, level: event.target.value, topic: '' });
                  }}
                  className="sb-select"
                >
                  <option value="">All Levels</option>
                  <option>Beginner</option>
                  <option>Explorer</option>
                  <option>Builder</option>
                </select>
                <ChevronDown size={14} className="sb-chevron" />
              </div>
            </div>

            {/* ── Topic Dropdown ── */}
            <div className="sb-filter-card">
              <div className="sb-filter-header">
                <span className="sb-filter-icon sb-icon-topic"><Tag size={14} /></span>
                <span className="sb-filter-title">All Topics</span>
                {errorFilters.topic && <span className="sb-active-pill">{errorFilters.topic}</span>}
              </div>
              <div className="sb-select-wrap">
                <select
                  value={errorFilters.topic}
                  onChange={(event) => {
                    setErrorFilters({ ...errorFilters, topic: event.target.value });
                  }}
                  className="sb-select"
                >
                  <option value="">All Topics</option>
                  {errorTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="sb-chevron" />
              </div>
            </div>

            {/* ── Error Detective topics section — shown when a level is chosen ── */}
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
                  <div className="sb-section-label" style={{ marginTop: '4px' }}>
                    <Zap size={12} /> {errorFilters.level} Topics
                  </div>
                  <div className="sb-topic-list">
                    {levelTopics.map(topic => {
                      const topicQs  = errorQuestions.filter(q => q.level === errorFilters.level && q.topic === topic);
                      const solved   = topicQs.filter(q => errorSolvedIds.includes(q.id)).length;
                      const isActive = selectedTopic === topic && selectedLevel === errorFilters.level;
                      const isLocked = !unlockedTopics.has(topic);
                      const mastered = solved === topicQs.length && topicQs.length > 0;
                      const pct = topicQs.length > 0 ? Math.round((solved / topicQs.length) * 100) : 0;
                      return (
                        <button
                          key={topic}
                          className={`sb-topic-btn${isActive ? ' active' : ''}${isLocked ? ' locked' : ''}${mastered ? ' mastered' : ''}`}
                          disabled={isLocked}
                          title={isLocked ? 'Complete the previous topic to unlock' : undefined}
                          onClick={() => {
                            if (isLocked) return;
                            const firstUnsolved = topicQs.find(q => !errorSolvedIds.includes(q.id));
                            setSelectedLevel(errorFilters.level);
                            setSelectedTopic(topic);
                            setSelectedQuestionId((firstUnsolved || topicQs[0])?.id || null);
                          }}
                        >
                          <div className="sb-topic-row">
                            <span className="sb-topic-status">
                              {isLocked ? '🔒' : mastered ? '✓' : '◉'}
                            </span>
                            <strong className="sb-topic-name">{topic}</strong>
                            {!isLocked && (
                              <span className="sb-topic-count">{solved}/{topicQs.length}</span>
                            )}
                          </div>
                          {!isLocked && (
                            <div className="sb-topic-bar">
                              <div className="sb-topic-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              );
            })()}

            {/* ── Questions list ── */}
            {filteredErrorQuestions.length > 0 && (
              <div className="sb-section-label" style={{ marginTop: '4px' }}>
                <Search size={12} /> Results
                <span className="sb-count-chip">{filteredErrorQuestions.length}</span>
              </div>
            )}
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
                <div className="sb-empty">
                  <Search size={20} opacity={0.4} />
                  <span>No challenges found</span>
                </div>
              )}
            </div>
          </>
        )}

        {route === '/learn-python' && (
          <>
            {/* ── Search ── */}
            <div className="sb-section-label">
              <Compass size={12} /> Scenarios
              <span className="sb-count-chip">{scenarios.length}</span>
            </div>
            <label className="search-modern">
              <Search size={15} className="search-icon" />
              <input
                value={filters.q}
                onChange={(event) => {
                  setFilters({ ...filters, q: event.target.value });
                }}
                placeholder="Search scenarios…"
              />
              {filters.q && (
                <button className="search-clear" onClick={() => setFilters({ ...filters, q: '' })}>✕</button>
              )}
            </label>

            {/* ── All Levels Dropdown ── */}
            <div className="sb-filter-card">
              <div className="sb-filter-header">
                <span className="sb-filter-icon sb-icon-level"><Layers size={14} /></span>
                <span className="sb-filter-title">All Levels</span>
                {filters.difficulty && <span className="sb-active-pill">{filters.difficulty}</span>}
              </div>
              <div className="sb-select-wrap">
                <select
                  value={filters.difficulty}
                  onChange={(event) => {
                    setFilters({ ...filters, difficulty: event.target.value });
                  }}
                  className="sb-select"
                >
                  <option value="">All Levels</option>
                  <option>Beginner</option>
                  <option>Explorer</option>
                  <option>Builder</option>
                </select>
                <ChevronDown size={14} className="sb-chevron" />
              </div>
            </div>

            {/* ── All Concepts Dropdown ── */}
            <div className="sb-filter-card">
              <div className="sb-filter-header">
                <span className="sb-filter-icon sb-icon-concept"><Filter size={14} /></span>
                <span className="sb-filter-title">All Concepts</span>
                {filters.concept && <span className="sb-active-pill">{filters.concept}</span>}
              </div>
              <div className="sb-select-wrap">
                <select
                  value={filters.concept}
                  onChange={(event) => {
                    setFilters({ ...filters, concept: event.target.value });
                  }}
                  className="sb-select"
                >
                  <option value="">All Concepts</option>
                  {concepts.map((concept) => <option key={concept}>{concept}</option>)}
                </select>
                <ChevronDown size={14} className="sb-chevron" />
              </div>
            </div>

            {/* ── Bookmark Filter Toggle ── */}
            <button
              className={`sb-bookmark-toggle${showBookmarksOnly ? ' active' : ''}`}
              onClick={() => setShowBookmarksOnly(v => !v)}
            >
              {showBookmarksOnly ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
              {showBookmarksOnly ? `Bookmarked (${bookmarks.length})` : 'All Scenarios'}
            </button>

            <div className="scenario-list">
              {displayScenarios.map((scenario) => (
                <div key={scenario._id} className="scenario-card-wrap">
                  <button
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
                  <button
                    className={`sb-bookmark-btn${bookmarks.includes(scenario._id) ? ' bookmarked' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(scenario._id); }}
                    aria-label={bookmarks.includes(scenario._id) ? 'Remove bookmark' : 'Bookmark'}
                    title={bookmarks.includes(scenario._id) ? 'Remove bookmark' : 'Bookmark this scenario'}
                  >
                    {bookmarks.includes(scenario._id) ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
                  </button>
                </div>
              ))}
              {displayScenarios.length === 0 && (
                <div className="sb-empty">
                  <Compass size={20} opacity={0.4} />
                  <span>{showBookmarksOnly ? 'No bookmarks yet' : 'No scenarios found'}</span>
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      {renderContent()}
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

function PracticeView({ stats, solvedCount }) {
  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Sharpen Your Skills</p>
          <h1>Interactive Practice Arena</h1>
        </div>
        <div className="hero-stats">
          <span>{solvedCount}<small>Resolved Errors</small></span>
          <span>{stats.accuracyPercentage || 0}%<small>Accuracy Rate</small></span>
        </div>
      </header>

      <div className="main-grid">
        <section className="panel practice-intro">
          <div className="section-title">
            <Terminal size={20} />
            <h2>Interactive Sandbox</h2>
          </div>
          <p>
            Welcome to the PyBe practice arena. Here, you can experiment with Python logic, review core concepts, and run simulation code snippets.
          </p>
          <div className="code-playground-info" style={{ marginTop: 20 }}>
            <h3>💡 Debugging Tips</h3>
            <ul style={{ paddingLeft: 20, lineHeight: '1.6rem' }}>
              <li>Always check for syntax errors before testing logic.</li>
              <li>Use variables to hold intermediate values for readability.</li>
              <li>Read exceptions carefully — they describe what failed.</li>
            </ul>
          </div>
        </section>
        <section className="panel practice-status">
          <div className="section-title">
            <Award size={20} />
            <h2>Current Standing</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <span style={{ fontSize: '3rem' }}>🎯</span>
            <h3 style={{ marginTop: 10 }}>Keep Practicing!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Complete more Error Detective challenges to test your concepts.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}

function QuizView({ stats, solvedCount }) {
  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Test Your Knowledge</p>
          <h1>Python Assessment Quiz</h1>
        </div>
        <div className="hero-stats">
          <span>{solvedCount}<small>Concepts Mastered</small></span>
          <span>{stats.accuracyPercentage || 0}%<small>Score</small></span>
        </div>
      </header>

      <div className="panel" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="section-title">
          <HelpCircle size={20} />
          <h2>Assessment Center</h2>
        </div>
        <p style={{ marginTop: 10, lineHeight: '1.6rem' }}>
          Take timed assessments to validate your Python proficiency. Check back regularly for new mock exams and quizzes.
        </p>
        <div style={{ padding: '30px 0', textAlign: 'center' }}>
          <span style={{ fontSize: '4rem' }}>📝</span>
          <h3 style={{ marginTop: 15 }}>No Active Assessments</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Finish the Builder level in Error Detective to unlock the comprehensive final exam.
          </p>
        </div>
      </div>
    </section>
  );
}

function AchievementsView({ solvedCount, totalCount }) {
  const achievements = [
    { title: 'First Debug', desc: 'Find and fix your first Python bug.', icon: '🌱', unlocked: solvedCount >= 1 },
    { title: 'Level 1 Graduate', desc: 'Solve all Beginner-level topics.', icon: '🎓', unlocked: solvedCount >= 9 },
    { title: 'Bug Squasher', desc: 'Resolve 15 error detective questions.', icon: '⚡', unlocked: solvedCount >= 15 },
    { title: 'Master Detective', desc: 'Unlock Explorer topics and keep a streak.', icon: '🔍', unlocked: solvedCount >= 20 },
    { title: 'Compiler Champion', desc: 'Complete 30 debugging challenges.', icon: '🏆', unlocked: solvedCount >= 30 }
  ];

  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Rewards &amp; Milestones</p>
          <h1>Your Achievements</h1>
        </div>
        <div className="hero-stats">
          <span>{achievements.filter(a => a.unlocked).length} / {achievements.length}<small>Unlocked</small></span>
        </div>
      </header>

      <div className="achievements-grid">
        {achievements.map((item, idx) => (
          <div key={idx} className={`panel achievement-card ${item.unlocked ? 'unlocked' : 'locked'}`}>
            <span className="achievement-icon">{item.icon}</span>
            <div className="achievement-details">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <span className="achievement-status-badge">
              {item.unlocked ? '🏆 Unlocked' : '🔒 Locked'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProgressView({ stats, scenarioCount, totalScenarios, edDone, edTotal, analytics, roadmap, sessions }) {
  const overallProgress = Math.round(((scenarioCount + edDone) / (totalScenarios + edTotal)) * 100);

  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Comprehensive History</p>
          <h1>Learning Progress</h1>
        </div>
        <div className="hero-stats">
          <span>{overallProgress}%<small>Overall Complete</small></span>
        </div>
      </header>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="progress-header">
          <h2>Total Completion Status</h2>
          <span>{overallProgress}%</span>
        </div>
        <div className="progress-bar-wrapper" style={{ height: 10, marginTop: 12 }}>
          <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      <section className="dashboard" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
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
  );
}

function ProfileView({ stats, solvedCount, currentLevel, scenariosDone }) {
  const totalXp = (solvedCount * 10) + (scenariosDone * 50);

  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>User Identity</p>
          <h1>Developer Profile</h1>
        </div>
        <div className="hero-stats">
          <span>{totalXp} XP<small>Total Experience</small></span>
        </div>
      </header>

      <div className="main-grid">
        <section className="panel profile-card">
          <div className="profile-header-main" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div className="profile-avatar" style={{ fontSize: '3rem', background: '#3b82f6', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              🐍
            </div>
            <div>
              <h2>Guest Learner</h2>
              <span className="level-badge" style={{ marginTop: 4, display: 'inline-block' }}>{currentLevel} Developer</span>
            </div>
          </div>

          <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <div className="panel" style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <h3>{scenariosDone}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Scenarios Completed</p>
            </div>
            <div className="panel" style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <h3>{solvedCount}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bugs Debugged</p>
            </div>
            <div className="panel" style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <h3>{stats.accuracyPercentage || 0}%</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Debugging Accuracy</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function SettingsView({ theme, toggleTheme, handleReset }) {
  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>System Preferences</p>
          <h1>App Settings</h1>
        </div>
      </header>

      <div className="panel" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 style={{ margin: 0 }}>Color Theme</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customize the application appearance.</p>
          </div>
          <button className="primary" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />} Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 style={{ margin: 0 }}>Reset Learning Progress</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Permanently delete all your solved challenges history.</p>
          </div>
          <button className="reset-progress-btn" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
            <RefreshCw size={15} /> Reset Progress
          </button>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
