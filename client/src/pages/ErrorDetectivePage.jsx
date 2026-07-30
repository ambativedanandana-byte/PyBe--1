import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert, Award, RefreshCw, ChevronRight } from 'lucide-react';
import InvestigationFlow from '../components/InvestigationFlow';

const LEVELS = {
  Beginner: [
    'arithmetic', 'comparisons', 'conditionals', 'counting', 'indexing', 'lists', 'strings', 'subtraction', 'variables'
  ],
  Explorer: [
    'averages', 'comparisons', 'conditionals', 'dictionaries', 'filtering', 'lists', 'loops', 'modulo', 'search', 'sets', 'strings'
  ],
  Builder: [
    'adaptive logic', 'comparisons', 'conditionals', 'dictionaries', 'formatting', 'functions', 'lists', 'mutation', 'search', 'strings', 'validation', 'while loops'
  ]
};

const LEVEL_DESCRIPTIONS = {
  Beginner: 'Core Python logic — syntax gotchas, variable declarations, arithmetic operators, and simple conditionals.',
  Explorer: 'Standard algorithms and collections — averages, dictionaries, modulo tricks, set operations, and loops.',
  Builder: 'Production-grade patterns — nested dictionaries, copy mutations, lambda functions, formatting, and complex logic.'
};

const LEVEL_ICONS = { Beginner: '🌱', Explorer: '🔍', Builder: '⚡' };

// Fisher-Yates in-place shuffle
function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ErrorDetectivePage({
  questions,
  solvedIds,
  submissions,
  stats,
  setSolvedIds,
  setSubmissions,
  setStats,
  selectedLevel,
  setSelectedLevel,
  selectedTopic,
  setSelectedTopic,
  selectedQuestionId,
  setSelectedQuestionId,
  api
}) {
  /* ══════════════════════════════════════════════
     HOOKS — must precede ALL conditional returns
  ══════════════════════════════════════════════ */

  // Session-stable question ordering: one shuffle per topic per page-load
  const sessionOrder = useRef({});

  // Active question derived from ID
  const activeQ = selectedLevel && selectedTopic && selectedQuestionId
    ? (questions || []).find(q => q.id === selectedQuestionId)
    : null;

  // Streak: consecutive correct answers
  const [streak, setStreak] = useState(0);

  // Timer mode: fixed to 30s
  const timerMode = 30;
  const [timeLeft, setTimeLeft]   = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);

  // Check if current question has already been answered in this session
  const isAnswered = activeQ ? (solvedIds.includes(activeQ.id) || submissions.some(s => s.questionId === activeQ.id)) : false;

  // Countdown effect — resets whenever the question changes or is answered
  useEffect(() => {
    if (!selectedQuestionId || isAnswered) {
      setTimeLeft(30);
      setTimerExpired(false);
      return;
    }
    setTimeLeft(30);
    setTimerExpired(false);
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(id); setTimerExpired(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [selectedQuestionId, isAnswered]);

  /* ══════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════ */

  /**
   * Returns questions for a topic in a session-stable shuffled order.
   * The first call for a given level+topic shuffles and caches;
   * subsequent calls return the same cached order.
   */
  const getSessionTopicQs = (level, topic) => {
    const key = `${level}___${topic}`;
    const raw = (questions || []).filter(q => q.level === level && q.topic === topic);
    if (!sessionOrder.current[key]) {
      sessionOrder.current[key] = fisherYates(raw).map(q => q.id);
    }
    return sessionOrder.current[key]
      .map(id => raw.find(q => q.id === id))
      .filter(Boolean);
  };

  /* ══════════════════════════════════════════════
     API HANDLERS
  ══════════════════════════════════════════════ */

  const handleAnswerSubmit = async (questionId, selectedAnswer) => {
    const result = await api('/error-detective/submit', {
      method: 'POST',
      body: JSON.stringify({ questionId, answer: selectedAnswer })
    });
    if (result.stats)              setStats(result.stats);
    if (result.completedQuestions) setSolvedIds(result.completedQuestions);
    const progressData = await api('/error-detective/progress');
    setSubmissions(progressData.submissions || []);

    // Streak tracking
    if (result.isCorrect) setStreak(s => s + 1);
    else                  setStreak(0);

    return { isCorrect: result.isCorrect, correctAnswer: result.correctAnswer, explanation: result.explanation };
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all debugging progress? This clears your score and statistics.')) return;
    try {
      const result = await api('/error-detective/reset', { method: 'POST' });
      setStats(result.stats);
      setSolvedIds(result.completedQuestions || []);
      setSubmissions(result.submissions || []);
      setSelectedLevel(null);
      setSelectedTopic(null);
      setSelectedQuestionId(null);
      // Reset local session state
      sessionOrder.current = {};
      setStreak(0);
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  // Topic click → directly into exam using session-stable order
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    const topicQs = getSessionTopicQs(selectedLevel, topic);
    const firstUnsolved = topicQs.find(q => !solvedIds.includes(q.id));
    setSelectedQuestionId((firstUnsolved || topicQs[0])?.id || null);
  };

  /* ══════════════════════════════════════════════
     GUARD (after all hooks)
  ══════════════════════════════════════════════ */
  if (!questions || questions.length === 0) {
    return <div className="loading">Loading Error Detective…</div>;
  }

  /* ══════════════════════════════════════════════
     COMPUTED VALUES
  ══════════════════════════════════════════════ */
  const totalQuestions  = questions.length;
  const uniqueCompleted = questions.filter(q => solvedIds.includes(q.id)).length;
  const overallPct      = totalQuestions > 0 ? Math.round((uniqueCompleted / totalQuestions) * 100) : 0;
  const allComplete     = uniqueCompleted === totalQuestions && totalQuestions > 0;

  /* ══════════════════════════════════════════════
     UNLOCK HELPERS (derived from solvedIds)
  ══════════════════════════════════════════════ */
  const isAllLevelDone = (prereqLevel) =>
    LEVELS[prereqLevel].every(topic => {
      const qs = questions.filter(q => q.level === prereqLevel && q.topic === topic);
      return qs.length > 0 && qs.every(q => solvedIds.includes(q.id));
    });

  const isLevelUnlocked = (level) => {
    if (level === 'Beginner') return true;
    if (level === 'Explorer') return isAllLevelDone('Beginner');
    if (level === 'Builder')  return isAllLevelDone('Explorer');
    return false;
  };

  const getUnlockedTopics = (level) => {
    if (!isLevelUnlocked(level)) return new Set();
    if (level !== 'Beginner') return new Set(LEVELS[level]);
    const topics = LEVELS['Beginner'];
    const unlocked = new Set();
    for (let i = 0; i < topics.length; i++) {
      unlocked.add(topics[i]);
      const qs = questions.filter(q => q.level === 'Beginner' && q.topic === topics[i]);
      if (!(qs.length > 0 && qs.every(q => solvedIds.includes(q.id)))) break;
    }
    return unlocked;
  };

  /* ══════════════════════════════════════════════
     BREADCRUMB
  ══════════════════════════════════════════════ */
  const Breadcrumbs = () => (
    <nav className="ed-breadcrumbs">
      <span onClick={() => { setSelectedLevel(null); setSelectedTopic(null); setSelectedQuestionId(null); }}>
        Error Detective
      </span>
      {selectedLevel && (
        <>
          <ChevronRight size={13} />
          <span onClick={() => { setSelectedTopic(null); setSelectedQuestionId(null); }}>
            {selectedLevel}
          </span>
        </>
      )}
      {selectedTopic && (
        <>
          <ChevronRight size={13} />
          <span onClick={() => setSelectedQuestionId(null)} style={{ textTransform: 'capitalize' }}>
            {selectedTopic}
          </span>
        </>
      )}
      {selectedQuestionId && (
        <>
          <ChevronRight size={13} />
          <span className="ed-crumb-current">Exam</span>
        </>
      )}
    </nav>
  );

  /* ════════════════════════════════════════
     VIEW 1 — Level Selection
  ════════════════════════════════════════ */
  if (!selectedLevel) {
    return (
      <section className="workspace error-detective-workspace">
        <header className="hero error-detective-hero">
          <div>
            <p>Debug &amp; Analyse</p>
            <h1>Error Detective</h1>
            <p className="hero-subtext">Find code mistakes, learn Python error categories, and level up your debugging skills.</p>
          </div>
          <div className="hero-stats">
            <span>{uniqueCompleted} / {totalQuestions}<small>Unique Solved</small></span>
            <span>{stats.accuracyPercentage}%<small>Accuracy</small></span>
          </div>
        </header>

        <div className="error-detective-controls">
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17231f' }}>Choose a Level</div>
          <button onClick={handleReset} className="reset-progress-btn">
            <RefreshCw size={15} /> Reset Progress
          </button>
        </div>

        {allComplete && (
          <div className="banner-achievement champion">
            <span style={{ fontSize: '2rem' }}>🐍</span>
            <div>
              <h3 style={{ margin: 0, color: '#78350f' }}>Error Detective Champion</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.95rem' }}>
                You completed every challenge. Python debugging mastered!
              </p>
            </div>
          </div>
        )}

        <div className="stats-progress-container panel">
          <div className="stats-progress-header">
            <div className="stats-progress-title"><Award size={20} /><h2>Overall Debugging Mastery</h2></div>
            <span className="stats-progress-text">{overallPct}% Progress</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill" style={{ width: `${overallPct}%` }} />
          </div>
          <div className="stats-summary-grid">
            <div className="stats-summary-card"><strong>{uniqueCompleted}</strong><span>Completed</span></div>
            <div className="stats-summary-card"><strong>{Math.max(0, totalQuestions - uniqueCompleted)}</strong><span>Remaining</span></div>
            <div className="stats-summary-card"><strong>{overallPct}%</strong><span>Progress</span></div>
            <div className="stats-summary-card"><strong>{stats.accuracyPercentage || 0}%</strong><span>Accuracy</span></div>
          </div>
        </div>

        <div className="level-selection-grid">
          {Object.keys(LEVELS).map(lvl => {
            const lvlQs        = questions.filter(q => q.level === lvl);
            const lvlCompleted = lvlQs.filter(q => solvedIds.includes(q.id)).length;
            const lvlPct       = lvlQs.length > 0 ? Math.round((lvlCompleted / lvlQs.length) * 100) : 0;
            const lvlDone      = lvlPct === 100 && lvlQs.length > 0;
            const locked       = !isLevelUnlocked(lvl);
            return (
              <div
                key={lvl}
                className={`level-card ${locked ? 'level-card-locked' : ''}`}
                onClick={() => !locked && setSelectedLevel(lvl)}
                title={locked ? `Complete all ${lvl === 'Explorer' ? 'Beginner' : 'Explorer'} topics to unlock` : undefined}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.6rem' }}>{locked ? '🔒' : LEVEL_ICONS[lvl]}</span>
                      <h3 style={{ margin: 0 }}>{lvl}</h3>
                    </div>
                    {lvlDone && !locked && <span className="achievement-badge">🥇 Complete</span>}
                    {locked && <span className="locked-badge">Locked</span>}
                  </div>
                  <p style={{ color: '#53615c', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {locked
                      ? `Complete all ${lvl === 'Explorer' ? 'Beginner' : 'Explorer'} topics to unlock this level.`
                      : LEVEL_DESCRIPTIONS[lvl]}
                  </p>
                </div>
                <div className="level-card-footer">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#53615c', marginBottom: 4 }}>
                    <span>Progress</span><span>{locked ? '—' : `${lvlCompleted} / ${lvlQs.length} (${lvlPct}%)`}</span>
                  </div>
                  <div className="progress-bar-wrapper" style={{ height: 6 }}>
                    {!locked && <div className="progress-bar-fill" style={{ width: `${lvlPct}%` }} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════
     VIEW 2 — Topic Selection
  ════════════════════════════════════════ */
  if (selectedLevel && !selectedTopic) {
    const lvlQs   = questions.filter(q => q.level === selectedLevel);
    const lvlDone = lvlQs.filter(q => solvedIds.includes(q.id)).length === lvlQs.length && lvlQs.length > 0;

    return (
      <section className="workspace error-detective-workspace">
        <Breadcrumbs />
        <header className="hero error-detective-hero" style={{ padding: 24, minHeight: 'auto' }}>
          <div>
            <p style={{ margin: 0 }}>{LEVEL_ICONS[selectedLevel]} {selectedLevel} Level</p>
            <h1 style={{ fontSize: '2rem', margin: '4px 0 0' }}>{selectedLevel} Debugging</h1>
          </div>
        </header>

        {lvlDone && (
          <div className="banner-achievement level">
            <span style={{ fontSize: '1.5rem' }}>🥇</span>
            <div>
              <h3 style={{ margin: 0, color: '#1e3a8a' }}>Level Completed!</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>All topics cleared in the {selectedLevel} level.</p>
            </div>
          </div>
        )}

        <div className="error-detective-controls">
          <div style={{ fontWeight: 700, color: '#17231f' }}>Pick a Topic to Start</div>
        </div>

        <div className="topic-selection-grid">
          {LEVELS[selectedLevel].map(topic => {
            const tQs      = questions.filter(q => q.level === selectedLevel && q.topic === topic);
            const tDone    = tQs.filter(q => solvedIds.includes(q.id)).length;
            const tPct     = tQs.length > 0 ? Math.round((tDone / tQs.length) * 100) : 0;
            const mastered = tPct === 100 && tQs.length > 0;
            const locked   = !getUnlockedTopics(selectedLevel).has(topic);
            return (
              <div
                key={topic}
                className={`topic-card ${locked ? 'topic-card-locked' : ''}`}
                onClick={() => !locked && handleTopicSelect(topic)}
                title={locked ? 'Complete the previous topic to unlock this one' : undefined}
              >
                <div className="topic-card-header">
                  <h4 style={{ textTransform: 'capitalize', margin: 0 }}>
                    {locked && <span className="topic-lock-icon">🔒 </span>}
                    {topic}
                  </h4>
                  {mastered && !locked && (
                    <span className="achievement-badge mastered-badge" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                      🏆 Mastered
                    </span>
                  )}
                  {locked && <span className="locked-badge">Locked</span>}
                </div>
                <div style={{ marginTop: 12 }}>
                  {locked ? (
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#8a9690' }}>
                      Complete the previous topic first.
                    </p>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#53615c', marginBottom: 4 }}>
                        <span>{tDone} / {tQs.length} solved</span>
                        <span>{tPct}%</span>
                      </div>
                      <div className="progress-bar-wrapper" style={{ height: 4 }}>
                        <div className="progress-bar-fill" style={{ width: `${tPct}%` }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════
     VIEW 3 — Exam Mode
  ════════════════════════════════════════ */
  if (selectedLevel && selectedTopic && selectedQuestionId) {
    // Use session-stable shuffled order
    const topicQs  = getSessionTopicQs(selectedLevel, selectedTopic);
    const curIndex = topicQs.findIndex(q => q.id === selectedQuestionId);
    const activeQ  = topicQs[curIndex];
    const hasPrev  = curIndex > 0;
    const hasNext  = curIndex < topicQs.length - 1;
    const tDone    = topicQs.filter(q => solvedIds.includes(q.id)).length;
    const tPct     = topicQs.length > 0 ? Math.round((tDone / topicQs.length) * 100) : 0;

    const handleNext = () => {
      if (hasNext) setSelectedQuestionId(topicQs[curIndex + 1].id);
      else { setSelectedTopic(null); setSelectedQuestionId(null); }
    };
    const handlePrev = () => { if (hasPrev) setSelectedQuestionId(topicQs[curIndex - 1].id); };
    const handleBack = () => { setSelectedQuestionId(null); };

    // Timer display helpers
    const timerUrgent = timerMode && timeLeft > 0 && timeLeft <= 5;
    const xpReward    = selectedLevel === 'Beginner' ? 10 : selectedLevel === 'Explorer' ? 20 : 30;

    return (
      <section className="workspace error-detective-workspace">
        <Breadcrumbs />

        <div className="exam-wrapper">
          {/* Clear Progress Bar at the Top */}
          <div className="exam-progress-wrapper">
            <div className="exam-progress-bar-bg">
              <div className="exam-progress-bar-fill" style={{ width: `${tPct}%` }} />
            </div>
            <div className="exam-progress-bar-info">
              <span>{tDone} of {topicQs.length} Solved</span>
              <span>{tPct}% Topic Complete</span>
            </div>
          </div>

          {/* ══ Enhanced Exam Header ══ */}
          <div className="exam-header">
            {/* Row 1: Back + Topic + Fixed Timer */}
            <div className="exam-header-top">
              <button className="exam-back-btn" onClick={handleBack}>
                ← Back
              </button>
              <span className="exam-topic-label" style={{ textTransform: 'capitalize' }}>
                📘 {selectedTopic}
              </span>
              <span className={`exam-timer-display ${timerUrgent ? 'exam-timer-urgent' : ''} ${timerExpired ? 'exam-timer-expired' : ''}`}>
                ⏱ {timerExpired ? "Time's up!" : `${timeLeft}s`}
              </span>
            </div>

            {/* Row 2: Stats (Streak, XP) & Dot Trail */}
            <div className="exam-meta-row">
              <div className="exam-meta-left">
                {streak > 0 && (
                  <span className="exam-streak-badge">
                    🔥 {streak} Streak
                  </span>
                )}
                <span className="exam-xp-reward-badge">
                  ✨ +{xpReward} XP Reward
                </span>
              </div>
              <div className="exam-dot-trail">
                {topicQs.map((q, i) => {
                  const solved = solvedIds.includes(q.id);
                  const active = i === curIndex;
                  return (
                    <span
                      key={q.id}
                      className={`exam-dot ${active ? 'exam-dot-active' : solved ? 'exam-dot-done' : 'exam-dot-pending'}`}
                      onClick={() => setSelectedQuestionId(q.id)}
                      title={`Q${i + 1}: ${q.title}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Question card ── */}
          {activeQ ? (
            <InvestigationFlow
              key={activeQ.id}
              question={activeQ}
              onAnswerSubmit={handleAnswerSubmit}
              onNext={handleNext}
              onPrev={handlePrev}
              hasPrev={hasPrev}
              hasNext={hasNext}
              timerExpired={timerExpired}
            />
          ) : (
            <div className="panel empty-questions">
              <ShieldAlert size={48} />
              <p>Question not found.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return null;
}
