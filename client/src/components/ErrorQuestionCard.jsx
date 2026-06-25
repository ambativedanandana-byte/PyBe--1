import React, { useMemo, useState } from 'react';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const ERROR_TYPE_CLASS = {
  'Syntax Error': 'syntax',
  'Runtime Error': 'runtime',
  'Logical Error': 'logical'
};

const ERROR_TYPE_PROMPT = {
  'Syntax Error': 'Identify the syntax error in the code below.',
  'Runtime Error': 'What runtime error will occur when this code is executed?',
  'Logical Error': 'What logical error causes incorrect output in this code?'
};

// Fisher-Yates shuffle — returns a new array, never mutates original
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ErrorQuestionCard({ question, onAnswerSubmit, onNext, onPrev, hasPrev, hasNext }) {
  const [selected, setSelected] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Shuffle once per question — stable during interaction, fresh on each new question
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shuffledOptions = useMemo(() => shuffleArray(question.options), [question.id]);

  const handleSubmit = async () => {
    if (!selected || submitting || submissionResult) return;
    setSubmitting(true);
    try {
      const result = await onAnswerSubmit(question.id, selected);
      setSubmissionResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const isSolved = submissionResult?.isCorrect;
  const errorTypeClass = ERROR_TYPE_CLASS[question.errorType] || 'syntax';
  const questionPrompt = ERROR_TYPE_PROMPT[question.errorType] || 'What is the error in this code?';
  const learningTip = question.learningTip || '';
  const submitted = !!submissionResult;

  return (
    <div className="eq-card">

      {/* ── Badge row ── */}
      <div className="eq-badge-row">
        <span className={`eq-error-badge eq-badge-${errorTypeClass}`}>{question.errorType}</span>
        <span className="eq-title">{question.title}</span>
      </div>

      {/* ── Code snippet ── */}
      <div className="eq-code-block">
        <div className="eq-code-header">
          <span className="eq-code-dot" />
          <span className="eq-code-dot" />
          <span className="eq-code-dot" />
          <span className="eq-code-lang">Python</span>
        </div>
        <pre className="eq-code-pre"><code>{question.snippet}</code></pre>
      </div>

      {/* ── Question prompt ── */}
      <p className="eq-prompt">{questionPrompt}</p>

      {/* ── Answer options ── */}
      <div className="eq-options">
        {shuffledOptions.map((option, idx) => {
          const label = OPTION_LABELS[idx] || String(idx + 1);
          const isSelected = selected === option;
          const isCorrect = submitted && option === submissionResult.correctAnswer;
          const isWrong = submitted && selected === option && !submissionResult.isCorrect;

          let cls = 'eq-option';
          if (isCorrect)        cls += ' eq-option-correct';
          else if (isWrong)     cls += ' eq-option-wrong';
          else if (isSelected && !submitted) cls += ' eq-option-selected';
          else if (submitted)   cls += ' eq-option-dim';

          return (
            <button
              key={idx}
              type="button"
              className={cls}
              onClick={() => !submitted && setSelected(option)}
              disabled={submitted}
            >
              <span className="eq-option-letter">{label}</span>
              <span className="eq-option-text">{option}</span>
              {isCorrect && <span className="eq-option-tick">✓</span>}
              {isWrong   && <span className="eq-option-cross">✗</span>}
            </button>
          );
        })}
      </div>

      {/* ── Action row ── */}
      <div className="eq-action-row">
        <button
          type="button"
          className="eq-nav-btn"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          ← Previous
        </button>

        {!submitted ? (
          <button
            type="button"
            className="eq-submit-btn"
            onClick={handleSubmit}
            disabled={!selected || submitting}
          >
            {submitting ? 'Checking…' : 'Submit Answer'}
          </button>
        ) : (
          <button
            type="button"
            className="eq-next-btn"
            onClick={onNext}
          >
            {hasNext ? 'Next Question →' : 'Finish Topic'}
          </button>
        )}
      </div>

      {/* ── Feedback (only after submission) ── */}
      {submitted && (
        <div className={`eq-feedback ${isSolved ? 'eq-feedback-ok' : 'eq-feedback-err'}`}>
          <div className="eq-feedback-header">
            <span className={`eq-feedback-icon ${isSolved ? 'eq-icon-ok' : 'eq-icon-err'}`}>
              {isSolved ? '✓' : '✗'}
            </span>
            <strong className="eq-feedback-verdict">
              {isSolved ? 'Correct!' : 'Incorrect!'}
            </strong>
            {!isSolved && (
              <span className="eq-correct-hint">
                Correct answer: <em>{submissionResult.correctAnswer}</em>
              </span>
            )}
          </div>

          <div className="eq-feedback-body">
            <div className="eq-fb-section">
              <span className="eq-fb-label">Explanation</span>
              <p className="eq-fb-text">{submissionResult.explanation}</p>
            </div>
            {learningTip && (
              <div className="eq-fb-section eq-fb-tip">
                <span className="eq-fb-label">💡 Learning Tip</span>
                <p className="eq-fb-text">{learningTip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
