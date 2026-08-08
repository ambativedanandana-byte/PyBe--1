import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Search,
  Eye,
  Terminal,
  ClipboardList,
  Target,
  Crosshair,
  Tag,
  AlertTriangle,
  CheckCircle2,
  PenLine,
  Lock,
  Unlock,
} from 'lucide-react';
import CaseHeader from '../components/CaseHeader';
import InvestigationProgress from '../components/InvestigationProgress';

const ERROR_TYPES = [
  {
    id: 'syntax',
    label: 'Syntax Error',
    issues: [
      'Missing Colon',
      'Indentation Error',
      'Missing Parentheses',
      'Unmatched Quotes',
      'Missing Comma',
      'Missing Closing Bracket',
    ],
  },
  {
    id: 'runtime',
    label: 'Runtime Error',
    issues: [
      'NameError',
      'ZeroDivisionError',
      'TypeError',
      'ValueError',
      'IndexError',
      'KeyError',
      'AttributeError',
      'FileNotFoundError',
    ],
  },
  {
    id: 'logical',
    label: 'Logical Error',
    issues: [
      'Wrong Formula',
      'Wrong Variable',
      'Wrong Comparison',
      'Incorrect Condition',
      'Wrong Algorithm',
      'Off-by-One Loop',
    ],
  },
];

function highlightPython(line) {
  let result = line;
  if (/^\s*#/.test(result)) {
    return <span className="ir-code-comment">{result}</span>;
  }
  result = result.replace(/((?:f|r|b|fr|rf|br|rb)?)"[^"]*?"/g, '<span class="ir-code-string">$&</span>');
  result = result.replace(/((?:f|r|b|fr|rf|br|rb)?)'[^']*?'/g, '<span class="ir-code-string">$&</span>');
  const keywords = [
    'def', 'return', 'if', 'elif', 'else', 'for', 'in', 'while', 'import',
    'from', 'as', 'with', 'print', 'range', 'len', 'int', 'float', 'str',
    'list', 'dict', 'True', 'False', 'None', 'and', 'or', 'not', 'try',
    'except', 'finally', 'raise', 'class', 'lambda', 'pass', 'break', 'continue',
  ];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span class="ir-code-keyword">$1</span>');
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="ir-code-number">$1</span>');
  const builtins = [
    'print', 'input', 'range', 'len', 'int', 'float', 'str', 'list', 'dict',
    'set', 'tuple', 'sum', 'min', 'max', 'abs', 'round', 'open', 'type', 'isinstance',
  ];
  const builtinPattern = new RegExp(`\\b(${builtins.join('|')})(?=\\()`, 'g');
  result = result.replace(builtinPattern, '<span class="ir-code-builtin">$1</span>');
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

// Derive the expected line number from the error message
function getExpectedLine(errorStr, codeLength) {
  if (!errorStr) return null;
  const m = errorStr.match(/line\s+(\d+)/i);
  if (m) return parseInt(m[1], 10);
  return null;
}

// Derive expected error type from investigation
function getExpectedTypeError(investigation) {
  if (investigation.error) {
    if (/SyntaxError/i.test(investigation.error)) return 'syntax';
    if (/IndentationError/i.test(investigation.error)) return 'syntax';
    if (/NameError|ZeroDivision|TypeError|ValueError|IndexError|KeyError|AttributeError|FileNotFoundError|ImportError|ModuleNotFoundError/i.test(investigation.error)) return 'runtime';
  }
  if (investigation.output && !investigation.error) return 'logical';
  return null;
}

// Derive expected specific issue from investigation
function getExpectedIssue(investigation) {
  if (!investigation.error) return null;
  const e = investigation.error;
  if (/SyntaxError.*expected\s+':?'/i.test(e)) return 'Missing Colon';
  if (/IndentationError/i.test(e)) return 'Indentation Error';
  if (/SyntaxError.*invalid\s+syntax/i.test(e)) {
    if (investigation.code.some((l) => /['"]\s*['"]/.test(l) && l.includes(','))) return 'Missing Comma';
    if (investigation.code.some((l) => /\[.*[^,\]]\s*\n\s*["']/.test(l))) return 'Missing Comma';
    return 'Missing Closing Bracket';
  }
  if (/NameError/i.test(e)) return 'NameError';
  if (/ZeroDivision/i.test(e)) return 'ZeroDivisionError';
  if (/TypeError/i.test(e)) return 'TypeError';
  if (/ValueError/i.test(e)) return 'ValueError';
  if (/IndexError/i.test(e)) return 'IndexError';
  if (/KeyError/i.test(e)) return 'KeyError';
  if (/AttributeError/i.test(e)) return 'AttributeError';
  if (/FileNotFoundError/i.test(e)) return 'FileNotFoundError';
  if (/ModuleNotFoundError/i.test(e)) return 'FileNotFoundError';
  if (/ImportError/i.test(e)) return 'FileNotFoundError';
  return null;
}

export default function BugAnalysisPage({
  investigation,
  story,
  levelName,
  onBack,
  onContinue,
  investigationId,
}) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const [observation, setObservation] = useState('');
  const [selectedLine, setSelectedLine] = useState(null);
  const [lineInput, setLineInput] = useState('');
  const [errorType, setErrorType] = useState('');
  const [errorTypeSearch, setErrorTypeSearch] = useState('');
  const [errorIssue, setErrorIssue] = useState('');
  const [errorIssueSearch, setErrorIssueSearch] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [notebookText, setNotebookText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showIssueDropdown, setShowIssueDropdown] = useState(false);

  const [validationMsg, setValidationMsg] = useState('');
  const [validationOk, setValidationOk] = useState(false);

  const expectedLine = useMemo(() => getExpectedLine(investigation?.error, investigation?.code?.length), [investigation]);
  const expectedType = useMemo(() => getExpectedTypeError(investigation), [investigation]);
  const expectedIssue = useMemo(() => getExpectedIssue(investigation), [investigation]);

  if (!investigation || !story) {
    return (
      <section className="workspace ed-page">
        <header className="hero ed-hero">
          <div>
            <button className="ed-back-btn" onClick={onBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <p>{levelName}</p>
            <h1>Investigation Not Available</h1>
          </div>
        </header>
        <div className="panel ed-detail-placeholder">
          <h2>Investigation data not found</h2>
          <p>This investigation is still being prepared.</p>
        </div>
      </section>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(investigation.code.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineClick = (lineNum) => {
    if (activeStep !== 2 || completedSteps.has(2)) return;
    setSelectedLine(lineNum);
    setLineInput(String(lineNum));
    setValidationMsg('');
  };

  const handleLineInputChange = (val) => {
    if (activeStep !== 2 || completedSteps.has(2)) return;
    setLineInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= investigation.code.length) {
      setSelectedLine(num);
    }
    setValidationMsg('');
  };

  const validateStep = (step) => {
    setValidationMsg('');
    setValidationOk(false);

    switch (step) {
      case 1: {
        if (!observation.trim()) {
          setValidationMsg('Please describe what you observed.');
          return false;
        }
        if (observation.trim().length < 10) {
          setValidationMsg('Please write a bit more about what happened.');
          return false;
        }
        setValidationMsg('');
        setValidationOk(true);
        return true;
      }
      case 2: {
        if (!selectedLine) {
          setValidationMsg('Please select a line number.');
          return false;
        }
        if (expectedLine && selectedLine !== expectedLine) {
          setValidationMsg(`Not quite — try looking at line ${selectedLine} again. Which line actually has the problem?`);
          return false;
        }
        setValidationMsg('');
        setValidationOk(true);
        return true;
      }
      case 3: {
        if (!errorType) {
          setValidationMsg('Please select an error type.');
          return false;
        }
        if (expectedType && errorType !== expectedType) {
          setValidationMsg('That type does not match the error. Look at the error message again and try a different type.');
          return false;
        }
        setValidationMsg('');
        setValidationOk(true);
        return true;
      }
      case 4: {
        if (!errorIssue) {
          setValidationMsg('Please select a specific issue.');
          return false;
        }
        if (expectedIssue && errorIssue !== expectedIssue) {
          setValidationMsg('That issue does not match. Think about the error message and try a different option.');
          return false;
        }
        setValidationMsg('');
        setValidationOk(true);
        return true;
      }
      case 5: {
        setValidationMsg('');
        setValidationOk(true);
        return true;
      }
      default:
        return false;
    }
  };

  const handleConfirmStep = (step) => {
    if (!validateStep(step)) return;
    setCompletedSteps((prev) => new Set([...prev, step]));
    if (step < 5) {
      setActiveStep(step + 1);
    }
    setValidationMsg('');
  };

  const handleStepClick = (step) => {
    if (completedSteps.has(step) || step === activeStep) return;
    if (step > 1 && !completedSteps.has(step - 1)) return;
    setActiveStep(step);
    setValidationMsg('');
  };

  const selectedTypeError = ERROR_TYPES.find((t) => t.id === errorType);
  const filteredTypes = ERROR_TYPES.filter((t) =>
    t.label.toLowerCase().includes(errorTypeSearch.toLowerCase())
  );
  const filteredIssues = selectedTypeError
    ? selectedTypeError.issues.filter((i) =>
        i.toLowerCase().includes(errorIssueSearch.toLowerCase())
      )
    : [];

  const confidenceLabels = {
    0: 'Not Confident',
    25: 'Slightly Confident',
    50: 'Somewhat Confident',
    75: 'Very Confident',
    100: 'Extremely Confident',
  };

  const stepNames = ['Observe', 'Locate', 'Classify', 'Identify', 'Confidence'];

  const isStepLocked = (step) => {
    if (step === 1) return false;
    return !completedSteps.has(step - 1) && activeStep !== step;
  };

  const renderStepContent = (step) => {
    const locked = isStepLocked(step) && !completedSteps.has(step);
    const done = completedSteps.has(step);
    const isActive = activeStep === step;

    if (locked && !done) {
      return (
        <div className="ba-question ba-locked">
          <label className="ba-question-label">
            <span className="ba-step-badge locked"><Lock size={10} /></span>
            {stepNames[step - 1]}
          </label>
          <p className="ba-question-text ba-locked-text">Complete the previous step to unlock</p>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className={`ba-question ${done ? 'ba-done' : ''}`}>
          <label className="ba-question-label">
            <span className={`ba-step-badge ${done ? 'done' : ''}`}>{done ? <CheckCircle2 size={12} /> : '1'}</span>
            Observe
          </label>
          <p className="ba-question-text">What happened when you ran the program?</p>
          <textarea
            className="ba-textarea"
            value={observation}
            onChange={(e) => { setObservation(e.target.value); setValidationMsg(''); }}
            placeholder="Describe what you observed..."
            rows={3}
            disabled={done}
          />
          {!done && (
            <button className="ba-confirm-btn" onClick={() => handleConfirmStep(1)}>
              Confirm
            </button>
          )}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className={`ba-question ${done ? 'ba-done' : ''}`}>
          <label className="ba-question-label">
            <span className={`ba-step-badge ${done ? 'done' : ''}`}>{done ? <CheckCircle2 size={12} /> : '2'}</span>
            Locate
          </label>
          <p className="ba-question-text">Which line do you think is causing the problem?</p>
          <div className="ba-line-input-row">
            <input
              type="text"
              className="ba-line-input"
              value={lineInput}
              onChange={(e) => handleLineInputChange(e.target.value)}
              placeholder={`1-${investigation.code.length}`}
              disabled={done}
            />
            {selectedLine && !done && (
              <span className="ba-line-selected">Line {selectedLine} selected</span>
            )}
            {done && selectedLine && (
              <span className="ba-line-selected done">Line {selectedLine} ✓</span>
            )}
          </div>
          {!done && (
            <button className="ba-confirm-btn" onClick={() => handleConfirmStep(2)}>
              Confirm
            </button>
          )}
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className={`ba-question ${done ? 'ba-done' : ''}`}>
          <label className="ba-question-label">
            <span className={`ba-step-badge ${done ? 'done' : ''}`}>{done ? <CheckCircle2 size={12} /> : '3'}</span>
            Classify
          </label>
          <p className="ba-question-text">What type of problem do you think this is?</p>
          <div className="ba-dropdown-wrap">
            <button
              className="ba-dropdown-trigger"
              onClick={() => { if (!done) { setShowTypeDropdown(!showTypeDropdown); setShowIssueDropdown(false); } }}
              disabled={done}
            >
              {errorType ? ERROR_TYPES.find((t) => t.id === errorType)?.label : 'Select error type...'}
              {!done && <ChevronRight size={14} className={`ba-dropdown-arrow ${showTypeDropdown ? 'open' : ''}`} />}
              {done && <CheckCircle2 size={14} className="ba-check-icon" />}
            </button>
            {showTypeDropdown && !done && (
              <div className="ba-dropdown-menu">
                <input
                  type="text"
                  className="ba-dropdown-search"
                  placeholder="Search types..."
                  value={errorTypeSearch}
                  onChange={(e) => setErrorTypeSearch(e.target.value)}
                  autoFocus
                />
                {filteredTypes.map((t) => (
                  <button
                    key={t.id}
                    className={`ba-dropdown-item ${errorType === t.id ? 'selected' : ''}`}
                    onClick={() => {
                      setErrorType(t.id);
                      setErrorIssue('');
                      setShowTypeDropdown(false);
                      setErrorTypeSearch('');
                      setValidationMsg('');
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!done && (
            <button className="ba-confirm-btn" onClick={() => handleConfirmStep(3)}>
              Confirm
            </button>
          )}
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className={`ba-question ${done ? 'ba-done' : ''}`}>
          <label className="ba-question-label">
            <span className={`ba-step-badge ${done ? 'done' : ''}`}>{done ? <CheckCircle2 size={12} /> : '4'}</span>
            Identify
          </label>
          <p className="ba-question-text">What is the exact problem?</p>
          <div className="ba-dropdown-wrap">
            <button
              className="ba-dropdown-trigger"
              onClick={() => {
                if (done || !errorType) return;
                setShowIssueDropdown(!showIssueDropdown);
                setShowTypeDropdown(false);
              }}
              disabled={done || !errorType}
            >
              {errorIssue || (errorType ? 'Select specific issue...' : 'Choose a type first')}
              {!done && errorType && <ChevronRight size={14} className={`ba-dropdown-arrow ${showIssueDropdown ? 'open' : ''}`} />}
              {done && <CheckCircle2 size={14} className="ba-check-icon" />}
            </button>
            {showIssueDropdown && selectedTypeError && !done && (
              <div className="ba-dropdown-menu">
                <input
                  type="text"
                  className="ba-dropdown-search"
                  placeholder="Search issues..."
                  value={errorIssueSearch}
                  onChange={(e) => setErrorIssueSearch(e.target.value)}
                  autoFocus
                />
                {filteredIssues.map((issue) => (
                  <button
                    key={issue}
                    className={`ba-dropdown-item ${errorIssue === issue ? 'selected' : ''}`}
                    onClick={() => {
                      setErrorIssue(issue);
                      setShowIssueDropdown(false);
                      setErrorIssueSearch('');
                      setValidationMsg('');
                    }}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!done && (
            <button className="ba-confirm-btn" onClick={() => handleConfirmStep(4)}>
              Confirm
            </button>
          )}
        </div>
      );
    }

    if (step === 5) {
      return (
        <div className={`ba-question ${done ? 'ba-done' : ''}`}>
          <label className="ba-question-label">
            <span className={`ba-step-badge ${done ? 'done' : ''}`}>{done ? <CheckCircle2 size={12} /> : '5'}</span>
            Confidence
          </label>
          <p className="ba-question-text">How confident are you?</p>
          <div className="ba-confidence-wrap">
            <div className="ba-confidence-labels">
              <span>0%</span>
              <span className="ba-confidence-current">{confidenceLabels[confidence]}</span>
              <span>100%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={25}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="ba-confidence-slider"
            />
            <div className="ba-confidence-marks">
              {[0, 25, 50, 75, 100].map((val) => (
                <span
                  key={val}
                  className={`ba-confidence-mark ${confidence === val ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          {!done && (
            <button className="ba-confirm-btn" onClick={() => handleConfirmStep(5)}>
              Confirm
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="workspace ed-page">
      <CaseHeader
        levelName="Bug Analysis"
        caseNumber={story.caseNumber}
        title={story.title}
        difficulty={story.difficulty}
        statusBadge="Analyze the Problem"
        backLabel="Back to Investigation Room"
        onBack={onBack}
      />

      <InvestigationProgress currentStep="analysis" />

      <div className="ba-layout">
        <div className="ba-left">
          <div className="panel ba-questions-card">
            <div className="ba-card-header">
              <ClipboardList size={18} />
              <h3>Investigation Questions</h3>
            </div>

            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>{renderStepContent(step)}</React.Fragment>
            ))}

            {validationMsg && (
              <div className={`ba-validation ${validationOk ? 'ok' : 'error'}`}>
                {validationOk ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                <span>{validationMsg}</span>
              </div>
            )}
          </div>
        </div>

        <div className="ba-right">
          <div className="panel ba-editor-card">
            <div className="ir-editor-toolbar">
              <div className="ir-editor-dots">
                <span className="ir-dot red" />
                <span className="ir-dot yellow" />
                <span className="ir-dot green" />
              </div>
              <span className="ir-editor-filename">investigation.py</span>
              <div className="ir-editor-actions">
                <button className="ir-editor-btn" onClick={handleCopy} title="Copy code">
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="ir-code-area">
              <div className="ir-line-numbers">
                {investigation.code.map((_, idx) => {
                  const lineNum = idx + 1;
                  return (
                    <span
                      key={idx}
                      className={selectedLine === lineNum ? 'selected' : ''}
                      onClick={() => handleLineClick(lineNum)}
                    >
                      {lineNum}
                    </span>
                  );
                })}
              </div>
              <pre className="ir-code-content">
                {investigation.code.map((line, idx) => {
                  const lineNum = idx + 1;
                  return (
                    <div
                      key={idx}
                      className={`ir-code-line ${selectedLine === lineNum ? 'ba-line-highlight' : ''}`}
                      onClick={() => handleLineClick(lineNum)}
                    >
                      {highlightPython(line)}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>

          <div className="panel ba-notebook-card">
            <div className="ba-card-header">
              <PenLine size={18} />
              <h3>Detective Notebook</h3>
            </div>
            <p className="ba-notebook-hint">Record your reasoning as you analyze.</p>
            <textarea
              className="ba-notebook-input"
              value={notebookText}
              onChange={(e) => setNotebookText(e.target.value)}
              placeholder={`Why you chose that line...\nWhy you think the error occurred...\nWhat the correct behavior should be...`}
              rows={8}
            />
          </div>

          <div className="panel ba-analysis-card">
            <div className="ba-card-header">
              <Target size={18} />
              <h3>Bug Analysis</h3>
            </div>
            <div className="ba-analysis-summary">
              <div className="ba-analysis-row">
                <span className="ba-analysis-label"><Eye size={14} /> Observed:</span>
                <span className="ba-analysis-value">
                  {observation || <em className="ba-placeholder">Not yet answered</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label"><Crosshair size={14} /> Suspected Line:</span>
                <span className="ba-analysis-value">
                  {selectedLine ? `Line ${selectedLine}` : <em className="ba-placeholder">Not yet selected</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label"><Tag size={14} /> Error Type:</span>
                <span className="ba-analysis-value">
                  {selectedTypeError?.label || <em className="ba-placeholder">Not yet classified</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label"><AlertTriangle size={14} /> Specific Issue:</span>
                <span className="ba-analysis-value">
                  {errorIssue || <em className="ba-placeholder">Not yet identified</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label"><CheckCircle2 size={14} /> Confidence:</span>
                <span className="ba-analysis-value">
                  {confidence}% — {confidenceLabels[confidence]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ir-nav-row">
        <button className="ir-nav-btn" onClick={onBack}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          className={`primary ir-nav-btn-primary ${completedSteps.size < 5 ? 'disabled' : ''}`}
          disabled={completedSteps.size < 5}
          onClick={() => onContinue({
            investigationId,
            observation,
            selectedLine,
            errorType: errorType ? ERROR_TYPES.find((t) => t.id === errorType)?.label : null,
            errorIssue,
            confidence,
            notebookText,
          })}
        >
          Continue to Fix <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
