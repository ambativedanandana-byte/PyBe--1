import React from 'react';
import { ShieldAlert, Award, RefreshCw, ChevronRight } from 'lucide-react';
import ErrorQuestionCard from '../components/ErrorQuestionCard';

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
  /* ─── API: submit answer ─── */
  const handleAnswerSubmit = async (questionId, selectedAnswer) => {
    const result = await api('/error-detective/submit', {
      method: 'POST',
      body: JSON.stringify({ questionId, answer: selectedAnswer })
    });
    if (result.stats)              setStats(result.stats);
    if (result.completedQuestions) setSolvedIds(result.completedQuestions);
    const progressData = await api('/error-detective/progress');
    setSubmissions(progressData.submissions || []);
    return { isCorrect: result.isCorrect, correctAnswer: result.correctAnswer, explanation: result.explanation };
  };

  /* ─── API: reset ─── */
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
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  /* ─── Topic click → directly into exam ─── */
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    const topicQs = questions.filter(q => q.level === selectedLevel && q.topic === topic);
    const firstUnsolved = topicQs.find(q => !solvedIds.includes(q.id));
    setSelectedQuestionId((firstUnsolved || topicQs[0])?.id || null);
  };

  /* ─── Unlock helpers (pure — derived from solvedIds, no extra storage needed) ─── */

  // Returns true when every question in every topic of `prereqLevel` is solved
  const isAllLevelDone = (prereqLevel) =>
    LEVELS[prereqLevel].every(topic => {
      const qs = questions.filter(q => q.level === prereqLevel && q.topic === topic);
      return qs.length > 0 && qs.every(q => solvedIds.includes(q.id));
    });

  // Level unlocking: Beginner always open; Explorer after all Beginner done;
  // Builder after all Explorer done.
  const isLevelUnlocked = (level) => {
    if (level === 'Beginner') return true;
    if (level === 'Explorer') return isAllLevelDone('Beginner');
    if (level === 'Builder')  return isAllLevelDone('Explorer');
    return false;
  };

  // Topic unlocking: Beginner topics unlock sequentially (first always open,
  // each subsequent topic unlocks only when the previous one is 100% complete).
  // Explorer/Builder topics are all available once the level itself is unlocked.
  const getUnlockedTopics = (level) => {
    if (!isLevelUnlocked(level)) return new Set();
    if (level !== 'Beginner') return new Set(LEVELS[level]);

    const topics = LEVELS['Beginner'];
    const unlocked = new Set();
    for (let i = 0; i < topics.length; i++) {
      unlocked.add(topics[i]);
      const qs = questions.filter(q => q.level === 'Beginner' && q.topic === topics[i]);
      const done = qs.length > 0 && qs.every(q => solvedIds.includes(q.id));
      if (!done) break; // next topic stays locked until this one is 100%
    }
    return unlocked;
  };


  const totalQuestions    = questions.length;
  const uniqueCompleted   = questions.filter(q => solvedIds.includes(q.id)).length;
  const overallPct        = totalQuestions > 0 ? Math.round((uniqueCompleted / totalQuestions) * 100) : 0;
  const allComplete       = uniqueCompleted === totalQuestions && totalQuestions > 0;

  /* ─── Breadcrumb strip ─── */
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

        {/* Overall progress panel */}
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

        {/* Level cards */}
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
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
                All topics cleared in the {selectedLevel} level.
              </p>
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
     VIEW 3 — Exam Mode (one question at a time)
  ════════════════════════════════════════ */
  if (selectedLevel && selectedTopic && selectedQuestionId) {
    const topicQs  = questions.filter(q => q.level === selectedLevel && q.topic === selectedTopic);
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

    return (
      <section className="workspace error-detective-workspace">
        <Breadcrumbs />

        {/* Exam wrapper — centered, max 900px */}
        <div className="exam-wrapper">

          {/* ── Exam header ── */}
          <div className="exam-header">
            <div className="exam-header-top">
              <span className="exam-topic-label" style={{ textTransform: 'capitalize' }}>
                📘 {selectedTopic}
              </span>
              <span className="exam-counter">
                Question {curIndex + 1} <span className="exam-counter-dim">of {topicQs.length}</span>
              </span>
            </div>
            {/* Progress bar */}
            <div className="exam-track">
              <div
                className="exam-fill"
                style={{ width: `${((curIndex) / topicQs.length) * 100}%` }}
              />
            </div>
            <div className="exam-header-bottom">
              <span className="exam-solved-label">{tDone} solved · {tPct}% complete</span>
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
            <ErrorQuestionCard
              key={activeQ.id}
              question={activeQ}
              onAnswerSubmit={handleAnswerSubmit}
              onNext={handleNext}
              onPrev={handlePrev}
              hasPrev={hasPrev}
              hasNext={hasNext}
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
