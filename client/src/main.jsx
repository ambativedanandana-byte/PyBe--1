import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Award,
  Brain,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Lightbulb,
  MessageSquareText,
  Moon,
  Play,
  Route,
  Sun,
  LayoutDashboard,
  Terminal,
  HelpCircle,
  Trophy,
  TrendingUp,
  User,
  Settings,
  Menu
} from 'lucide-react';
import './styles.css';
import ScenariosPage from './pages/ScenariosPage';
import ErrorDetectivePage from './pages/ErrorDetectivePage';



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function api(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 30, background: '#1e293b', color: '#f8fafc', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ef4444' }}>⚠️ Runtime Rendering Error</h2>
          <pre style={{ background: '#0f172a', padding: 20, borderRadius: 12, overflow: 'auto' }}>
            {this.state.error?.toString()}
            {'\n'}
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#7b9f27', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
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
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

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
        roadmapData
      ] = await Promise.all([
        api(`/scenarios?${params}`).catch(() => []),
        api('/sessions').catch(() => []),
        api('/analytics').catch(() => ({ scenarioCount: 0, sessionCount: 0 })),
        api('/roadmap').catch(() => [])
      ]);
      setScenarios(scenarioData || []);
      setSessions(sessionData || []);
      setAnalytics(analyticsData || null);
      setRoadmap(roadmapData || []);
      setSelected((current) => current || (scenarioData && scenarioData[0]) || null);

      setError(null);
    } catch (err) {
      console.warn('Backend API notice:', err);
      setError(null);
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

  // Overall progress for dashboard panel
  const scenariosDone = sessions.length;
  const totalScenarios = scenarios.length || 1;
  const scenarioPct = Math.min(100, Math.round((scenariosDone / totalScenarios) * 100));

  const renderContent = () => {
    switch (route) {
      case '/learn-python':
        return <ScenariosPage scenarios={scenarios} />;

      case '/error-detective':
        return <ErrorDetectivePage />;

      case '/practice':
        return <PracticeView />;
      case '/quiz':
        return <QuizView />;
      case '/achievements':
        return <AchievementsView />;
      case '/progress':
        return <ProgressView scenarioCount={scenariosDone} totalScenarios={totalScenarios} analytics={analytics} roadmap={roadmap} sessions={sessions} />;
      case '/profile':
        return <ProfileView scenariosDone={scenariosDone} />;
      case '/settings':
        return <SettingsView theme={theme} toggleTheme={toggleTheme} />;

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
            </header>

            <div className="dashboard-summary-cards">
              <div className="panel summary-card">
                <h3>Scenarios</h3>
                <div className="level-badge-large">{scenarioPct}%</div>
                <p>Continue solving scenarios to improve.</p>
              </div>
              <div className="panel summary-card">
                <h3>Total Sessions</h3>
                <div className="accuracy-value-large">{sessions.length}</div>
                <p>Learning sessions completed.</p>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <main className={`app-shell${!sidebarVisible ? ' sidebar-collapsed' : ''}`} data-theme={theme}>
      {/* ── Menu Toggle Button (shown only when sidebar is closed) ── */}
      {!sidebarVisible && (
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          title="Open Navigation Menu"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* ── Theme Switcher Floating Icon on Dashboard ── */}
      <button className="workspace-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Switch Theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* ── Mobile menu overlay ── */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Mobile top bar ── */}
      <div className="mobile-topbar">
        <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <span className="mobile-brand">PyBe</span>
        <button className="theme-toggle-btn mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <aside className={`sidebar${sidebarOpen ? ' sidebar-mobile-open' : ''}${!sidebarVisible ? ' hidden' : ''}`}>
        {/* ── Brand ── */}
        <div className="brand">
          <div className="brand-icon-wrap" onClick={toggleSidebar} style={{ cursor: 'pointer' }} title="Click to collapse menu">
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
            <LayoutDashboard className="nav-card-svg" size={18} />
            <span className="nav-card-label">Dashboard</span>
          </button>
          <button
            className={`nav-card ${route === '/learn-python' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/learn-python'); }}
          >
            <Compass className="nav-card-svg" size={18} />
            <span className="nav-card-label">Learn Python</span>
          </button>
          <button
            className={`nav-card ${route === '/error-detective' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/error-detective'); }}
          >
            <Code2 className="nav-card-svg" size={18} />
            <span className="nav-card-label">Error Detective</span>
          </button>
          <button
            className={`nav-card ${route === '/practice' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/practice'); }}
          >
            <Terminal className="nav-card-svg" size={18} />
            <span className="nav-card-label">Practice</span>
          </button>
          <button
            className={`nav-card ${route === '/quiz' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/quiz'); }}
          >
            <HelpCircle className="nav-card-svg" size={18} />
            <span className="nav-card-label">Quiz</span>
          </button>
          <button
            className={`nav-card ${route === '/achievements' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/achievements'); }}
          >
            <Trophy className="nav-card-svg" size={18} />
            <span className="nav-card-label">Achievements</span>
          </button>
          <button
            className={`nav-card ${route === '/progress' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/progress'); }}
          >
            <TrendingUp className="nav-card-svg" size={18} />
            <span className="nav-card-label">Progress</span>
          </button>
          <button
            className={`nav-card ${route === '/profile' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/profile'); }}
          >
            <User className="nav-card-svg" size={18} />
            <span className="nav-card-label">Profile</span>
          </button>
          <button
            className={`nav-card ${route === '/settings' ? 'active' : ''}`}
            onClick={() => { setSidebarOpen(false); navigateTo('/settings'); }}
          >
            <Settings className="nav-card-svg" size={18} />
            <span className="nav-card-label">Settings</span>
          </button>
        </nav>

        {/* ── Static Non-Scrollable Progress Box ── */}
        <div className="sidebar-static-box">
          <div className="sb-static-header">
            <span className="sb-static-title"><Award size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} /> LEVEL</span>
          </div>
          <div className="sb-static-stat">
            <span className="sb-static-label">SCENARIOS</span>
            <span className="sb-static-value">{scenarioPct}%</span>
          </div>
        </div>

        <div className="sidebar-divider" />
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

function PracticeView() {
  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Sharpen Your Skills</p>
          <h1>Interactive Practice Arena</h1>
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
            <h3>Debugging Tips</h3>
            <ul style={{ paddingLeft: 20, lineHeight: '1.6rem' }}>
              <li>Always check for syntax errors before testing logic.</li>
              <li>Use variables to hold intermediate values for readability.</li>
              <li>Read exceptions carefully — they describe what failed.</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

function QuizView() {
  return (
    <section className="workspace">
      <header className="hero">
        <div>
          <p>Test Your Knowledge</p>
          <h1>Python Assessment Quiz</h1>
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
            Check back soon for new quizzes and assessments.
          </p>
        </div>
      </div>
    </section>
  );
}

function AchievementsView() {
  const achievements = [
    { title: 'First Steps', desc: 'Complete your first learning scenario.', icon: '🌱', unlocked: true },
    { title: 'Quick Learner', desc: 'Finish 5 learning scenarios.', icon: '🎓', unlocked: true },
    { title: 'Code Explorer', desc: 'Explore 10 different Python concepts.', icon: '⚡', unlocked: true },
    { title: 'Knowledge Seeker', desc: 'Complete 20 learning sessions.', icon: '🔍', unlocked: false },
    { title: 'Python Master', desc: 'Finish all available scenarios.', icon: '🏆', unlocked: false }
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

function ProgressView({ scenarioCount, totalScenarios, analytics, roadmap, sessions }) {
  const overallProgress = Math.round((scenarioCount / (totalScenarios || 1)) * 100);

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

function ProfileView({ scenariosDone }) {
  const totalXp = scenariosDone * 50;

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
              <span className="level-badge" style={{ marginTop: 4, display: 'inline-block' }}>Python Learner</span>
            </div>
          </div>

          <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <div className="panel" style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <h3>{scenariosDone}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Scenarios Completed</p>
            </div>
            <div className="panel" style={{ flex: '1 1 200px', textAlign: 'center' }}>
              <h3>{totalXp}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total XP</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function SettingsView({ theme, toggleTheme }) {
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
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
