import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Bug,
  Lightbulb,
  Code2,
  Clock,
  Play,
  RotateCcw,
  Target,
  Award,
  BookOpen,
  ArrowRight,
  Home,
} from 'lucide-react';
import { getExpectedSolution } from '../data/expectedSolutions';

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function findChangedLines(original, fixed) {
  const changes = [];
  const maxLen = Math.max(original.length, fixed.length);
  for (let i = 0; i < maxLen; i++) {
    const orig = original[i] || '';
    const fix = fixed[i] || '';
    if (orig !== fix) {
      changes.push(i);
    }
  }
  return changes;
}

function getErrorCategoryName(errorType) {
  if (!errorType) return 'Unknown';
  const map = {
    'Syntax Error': 'Syntax Error',
    'Runtime Error': 'Runtime Error',
    'Logical Error': 'Logical Error',
  };
  return map[errorType] || errorType;
}

const INVESTIGATION_ORDER = [
  'b-syn-1', 'b-syn-2', 'b-syn-3', 'b-syn-4', 'b-syn-5', 'b-syn-6', 'b-syn-7',
  'b-run-1', 'b-run-2', 'b-run-3', 'b-run-4',
  'b-log-1', 'b-log-2', 'b-log-3', 'b-log-4',
  'e-syn-1', 'e-syn-2', 'e-syn-3', 'e-syn-4',
  'e-run-1', 'e-run-2', 'e-run-3', 'e-run-4', 'e-run-5', 'e-run-6',
  'e-log-1', 'e-log-2', 'e-log-3', 'e-log-4', 'e-log-5',
  'bu-syn-1',
  'bu-run-1', 'bu-run-2', 'bu-run-3',
  'bu-log-1', 'bu-log-2', 'bu-log-3', 'bu-log-4', 'bu-log-5', 'bu-log-6',
];

const TIPS = {
  'Syntax Error': [
    'Read error messages carefully — they tell you the exact line number.',
    'Check for missing colons, parentheses, and quotation marks before running code.',
    'Test small changes one at a time rather than rewriting everything at once.',
  ],
  'Runtime Error': [
    'Check variable names — typos cause NameError.',
    'Make sure list indexes exist before accessing them.',
    'Use try/except to handle cases where input might be invalid.',
  ],
  'Logical Error': [
    'Print intermediate values to see what your code is actually doing.',
    'Compare your output step-by-step with the expected result.',
    'Draw out the logic on paper to trace through each condition.',
  ],
};

export default function CaseClosedPage({
  investigation,
  story,
  levelName,
  analysisData,
  fixData,
  investigationId,
  onBack,
  onContinue,
}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const expectedSolution = getExpectedSolution(investigationId);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!investigation || !story || !expectedSolution) {
    return (
      <section className="workspace ed-page">
        <header className="hero ed-hero">
          <div>
            <button className="ed-back-btn" onClick={onBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <h1>Case Closed</h1>
          </div>
        </header>
        <div className="panel">
          <p>Investigation data not available.</p>
        </div>
      </section>
    );
  }

  const originalCode = investigation.code || [];
  const fixedCode = expectedSolution.expectedCode || [];
  const changedLines = findChangedLines(originalCode, fixedCode);

  const errorCategory = analysisData?.errorType || 'Unknown';
  const errorName = analysisData?.errorIssue || 'Unknown Issue';
  const confidence = analysisData?.confidence ?? 50;
  const runCount = fixData?.runCount ?? 0;
  const resetCount = fixData?.resetCount ?? 0;
  const timeSpent = fixData?.timeSpent ?? 0;

  const nextIndex = INVESTIGATION_ORDER.indexOf(investigationId) + 1;
  const hasNext = nextIndex < INVESTIGATION_ORDER.length;
  const nextId = hasNext ? INVESTIGATION_ORDER[nextIndex] : null;

  const tips = TIPS[getErrorCategoryName(errorCategory)] || TIPS['Syntax Error'];

  return (
    <section className="workspace ed-page cc-page">
      {showConfetti && (
        <div className="cc-confetti" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="cc-confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                background: ['#7b9f27', '#a3e635', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'][i % 6],
              }}
            />
          ))}
        </div>
      )}

      <header className="hero ed-hero cc-hero">
        <div>
          <p className="cc-eyebrow">Investigation Complete</p>
          <h1 className="cc-title">Case Successfully Solved</h1>
        </div>
        <div className="hero-stats">
          <span className="cc-case-badge">#{story.caseNumber}</span>
          <span>{story.difficulty}<small>Difficulty</small></span>
        </div>
      </header>

      <div className="cc-layout">
        {/* Success Banner */}
        <div className="panel cc-banner-card">
          <div className="cc-banner-icon">
            <Award size={48} />
          </div>
          <h2 className="cc-banner-title">Case #{story.caseNumber} — {story.title}</h2>
          <p className="cc-banner-subtitle">You successfully identified and fixed the bug!</p>
        </div>

        <div className="cc-two-col">
          {/* Left Column */}
          <div className="cc-left-col">
            {/* Investigation Summary */}
            <div className="panel cc-summary-card">
              <div className="cc-card-header">
                <CheckCircle2 size={18} />
                <h3>Investigation Summary</h3>
              </div>
              <div className="cc-steps">
                <div className="cc-step done">
                  <CheckCircle2 size={16} className="cc-step-icon" />
                  <span className="cc-step-label">Investigation Started</span>
                  <span className="cc-step-check">✓</span>
                </div>
                <div className="cc-step done">
                  <CheckCircle2 size={16} className="cc-step-icon" />
                  <span className="cc-step-label">Bug Found</span>
                  <span className="cc-step-check">✓</span>
                </div>
                <div className="cc-step done">
                  <CheckCircle2 size={16} className="cc-step-icon" />
                  <span className="cc-step-label">Code Fixed</span>
                  <span className="cc-step-check">✓</span>
                </div>
                <div className="cc-step done">
                  <CheckCircle2 size={16} className="cc-step-icon" />
                  <span className="cc-step-label">Solution Verified</span>
                  <span className="cc-step-check">✓</span>
                </div>
              </div>
            </div>

            {/* Bug Report */}
            <div className="panel cc-bugreport-card">
              <div className="cc-card-header">
                <Bug size={18} />
                <h3>Bug Report</h3>
              </div>
              <div className="cc-bugreport-rows">
                <div className="cc-bugreport-row">
                  <span className="cc-bugreport-label">Error Category</span>
                  <span className={`cc-bugreport-badge cc-badge-${errorCategory.toLowerCase().replace(/\s/g, '-')}`}>
                    {getErrorCategoryName(errorCategory)}
                  </span>
                </div>
                <div className="cc-bugreport-row">
                  <span className="cc-bugreport-label">Exact Error</span>
                  <span className="cc-bugreport-value">{errorName}</span>
                </div>
              </div>
            </div>

            {/* Root Cause */}
            <div className="panel cc-rootcause-card">
              <div className="cc-card-header">
                <Target size={18} />
                <h3>Root Cause</h3>
              </div>
              <p className="cc-rootcause-text">{expectedSolution.expectedBehavior}</p>
            </div>

            {/* Key Learning */}
            <div className="panel cc-learning-card">
              <div className="cc-card-header">
                <BookOpen size={18} />
                <h3>Key Learning</h3>
              </div>
              <div className="cc-learning-content">
                <p className="cc-learning-why">
                  <strong>Why it happened:</strong> {errorName} occurred because the code contained
                  {errorCategory === 'Syntax Error' ? ' invalid syntax that Python could not parse.' :
                   errorCategory === 'Runtime Error' ? ' an error that occurred during program execution.' :
                   ' a logical flaw that produced incorrect results.'}
                </p>
                <p className="cc-learning-recognize">
                  <strong>How to recognize it:</strong> {
                    errorCategory === 'Syntax Error' ? 'Python will show a SyntaxError with the exact line number and a caret (^) pointing to the problem.' :
                    errorCategory === 'Runtime Error' ? 'The program crashes with a traceback showing the error type, file, and line number.' :
                    'The program runs without crashing but produces the wrong output.'
                  }
                </p>
                <p className="cc-learning-avoid">
                  <strong>How to avoid it:</strong> {
                    errorCategory === 'Syntax Error' ? 'Double-check punctuation, colons, brackets, and indentation before running code.' :
                    errorCategory === 'Runtime Error' ? 'Validate inputs, handle edge cases, and use try/except for operations that might fail.' :
                    'Test your code with different inputs and compare output with expected results step by step.'
                  }
                </p>
              </div>
            </div>

            {/* Detective Tips */}
            <div className="panel cc-tips-card">
              <div className="cc-card-header">
                <Lightbulb size={18} />
                <h3>Detective Tips</h3>
              </div>
              <ul className="cc-tips-list">
                {tips.map((tip, idx) => (
                  <li key={idx} className="cc-tip-item">
                    <span className="cc-tip-check">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="cc-right-col">
            {/* Correct Solution */}
            <div className="panel cc-solution-card">
              <div className="cc-card-header">
                <Code2 size={18} />
                <h3>Correct Solution</h3>
              </div>
              <div className="cc-code-compare">
                <div className="cc-code-block">
                  <div className="cc-code-label buggy">Original (Buggy)</div>
                  <pre className="cc-code-content">
                    {originalCode.map((line, idx) => (
                      <div key={idx} className={`cc-code-line ${changedLines.includes(idx) ? 'cc-line-changed' : ''}`}>
                        <span className="cc-line-num">{idx + 1}</span>
                        <span className="cc-line-text">{line}</span>
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="cc-code-arrow">↓</div>
                <div className="cc-code-block">
                  <div className="cc-code-label fixed">Corrected</div>
                  <pre className="cc-code-content">
                    {fixedCode.map((line, idx) => (
                      <div key={idx} className={`cc-code-line ${changedLines.includes(idx) ? 'cc-line-fixed' : ''}`}>
                        <span className="cc-line-num">{idx + 1}</span>
                        <span className="cc-line-text">{line}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="panel cc-performance-card">
              <div className="cc-card-header">
                <Clock size={18} />
                <h3>Performance Summary</h3>
              </div>
              <div className="cc-stats-grid">
                <div className="cc-stat">
                  <Clock size={20} className="cc-stat-icon" />
                  <span className="cc-stat-value">{formatTime(timeSpent)}</span>
                  <span className="cc-stat-label">Total Time</span>
                </div>
                <div className="cc-stat">
                  <Play size={20} className="cc-stat-icon" />
                  <span className="cc-stat-value">{runCount}</span>
                  <span className="cc-stat-label">Code Runs</span>
                </div>
                <div className="cc-stat">
                  <RotateCcw size={20} className="cc-stat-icon" />
                  <span className="cc-stat-value">{resetCount}</span>
                  <span className="cc-stat-label">Resets</span>
                </div>
                <div className="cc-stat">
                  <Target size={20} className="cc-stat-icon" />
                  <span className="cc-stat-value">{confidence}%</span>
                  <span className="cc-stat-label">Confidence</span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="panel cc-rewards-card">
              <div className="cc-card-header">
                <Award size={18} />
                <h3>Rewards</h3>
              </div>
              <div className="cc-rewards-grid">
                <div className="cc-reward">
                  <span className="cc-reward-icon">⭐</span>
                  <div className="cc-reward-info">
                    <span className="cc-reward-title">+50 XP</span>
                    <span className="cc-reward-desc">Investigation Completed</span>
                  </div>
                </div>
                <div className="cc-reward">
                  <span className="cc-reward-icon">🔍</span>
                  <div className="cc-reward-info">
                    <span className="cc-reward-title">+25 XP</span>
                    <span className="cc-reward-desc">Concept Mastered</span>
                  </div>
                </div>
                <div className="cc-reward">
                  <span className="cc-reward-icon">🏆</span>
                  <div className="cc-reward-info">
                    <span className="cc-reward-title">Badge Unlocked</span>
                    <span className="cc-reward-desc">Case #{story.caseNumber} Solved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Investigation */}
        <div className="panel cc-next-card">
          <div className="cc-next-content">
            <div className="cc-next-info">
              <h3 className="cc-next-title">Ready for the next challenge?</h3>
              <p className="cc-next-subtitle">
                {hasNext
                  ? 'Continue your journey as a Detective.'
                  : 'You\'ve completed all investigations in this level!'}
              </p>
            </div>
            <div className="cc-next-actions">
              {hasNext && (
                <button className="primary cc-next-btn" onClick={onContinue}>
                  Continue to Next Investigation <ArrowRight size={16} />
                </button>
              )}
              <button className="cc-back-btn" onClick={onContinue}>
                <Home size={16} /> Return to Level Overview
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
