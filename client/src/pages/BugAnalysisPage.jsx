import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Copy,
  Search,
  Eye,
  Terminal,
  FileText,
  ClipboardList,
  Target,
  Crosshair,
  Tag,
  AlertTriangle,
  CheckCircle2,
  PenLine,
} from 'lucide-react';

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

  // Strings (with optional f/r/b prefix)
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

export default function BugAnalysisPage({
  investigation,
  story,
  levelName,
  onBack,
  onContinue,
  investigationId,
}) {
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
    const codeText = investigation.code.join('\n');
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineClick = (lineNum) => {
    setSelectedLine(lineNum);
    setLineInput(String(lineNum));
  };

  const handleLineInputChange = (val) => {
    setLineInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= investigation.code.length) {
      setSelectedLine(num);
    }
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

  return (
    <section className="workspace ed-page">
      <header className="hero ed-hero ba-hero">
        <div>
          <button className="ed-back-btn" onClick={onBack}>
            <ChevronLeft size={16} /> Back to Investigation Room
          </button>
          <p>Bug Analysis</p>
          <h1>Case #{story.caseNumber} — {story.title}</h1>
        </div>
        <div className="hero-stats">
          <span>{story.difficulty}<small>Difficulty</small></span>
          <span className="ba-status-badge">Analyze the Problem</span>
        </div>
      </header>

      <div className="ba-layout">
        <div className="ba-left">
          <div className="panel ba-evidence-card">
            <div className="ba-card-header">
              <Search size={18} />
              <h3>Evidence Summary</h3>
            </div>
            <ul className="ba-evidence-list">
              {investigation.evidenceClues.map((clue, idx) => (
                <li key={idx} className="ba-evidence-item">
                  <span className="ba-evidence-bullet">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
            {investigation.error && (
              <div className="ba-error-output">
                <div className="ba-error-label">
                  <AlertTriangle size={12} />
                  <span>Error Message</span>
                </div>
                <pre className="ba-error-text">{investigation.error}</pre>
              </div>
            )}
            {investigation.output && (
              <div className="ba-success-output">
                <div className="ba-error-label success">
                  <CheckCircle2 size={12} />
                  <span>Program Output</span>
                </div>
                <pre className="ba-success-text">{investigation.output}</pre>
              </div>
            )}
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

          <div className="panel ba-questions-card">
            <div className="ba-card-header">
              <ClipboardList size={18} />
              <h3>Investigation Questions</h3>
            </div>

            <div className="ba-question">
              <label className="ba-question-label">
                <span className="ba-step-badge">1</span>
                Observe
              </label>
              <p className="ba-question-text">What happened when you ran the program?</p>
              <textarea
                className="ba-textarea"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Describe what you observed..."
                rows={3}
              />
            </div>

            <div className="ba-question">
              <label className="ba-question-label">
                <span className="ba-step-badge">2</span>
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
                />
                {selectedLine && (
                  <span className="ba-line-selected">Line {selectedLine} selected</span>
                )}
              </div>
            </div>

            <div className="ba-question">
              <label className="ba-question-label">
                <span className="ba-step-badge">3</span>
                Classify
              </label>
              <p className="ba-question-text">What type of problem do you think this is?</p>
              <div className="ba-dropdown-wrap">
                <button
                  className="ba-dropdown-trigger"
                  onClick={() => { setShowTypeDropdown(!showTypeDropdown); setShowIssueDropdown(false); }}
                >
                  {errorType ? ERROR_TYPES.find((t) => t.id === errorType)?.label : 'Select error type...'}
                  <ChevronRight size={14} className={`ba-dropdown-arrow ${showTypeDropdown ? 'open' : ''}`} />
                </button>
                {showTypeDropdown && (
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
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ba-question">
              <label className="ba-question-label">
                <span className="ba-step-badge">4</span>
                Identify
              </label>
              <p className="ba-question-text">What is the exact problem?</p>
              <div className="ba-dropdown-wrap">
                <button
                  className="ba-dropdown-trigger"
                  onClick={() => {
                    if (!errorType) return;
                    setShowIssueDropdown(!showIssueDropdown);
                    setShowTypeDropdown(false);
                  }}
                  disabled={!errorType}
                >
                  {errorIssue || (errorType ? 'Select specific issue...' : 'Choose a type first')}
                  <ChevronRight size={14} className={`ba-dropdown-arrow ${showIssueDropdown ? 'open' : ''}`} />
                </button>
                {showIssueDropdown && selectedTypeError && (
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
                        }}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ba-question">
              <label className="ba-question-label">
                <span className="ba-step-badge">5</span>
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
            </div>
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
                <button
                  className="ir-editor-btn"
                  onClick={handleCopy}
                  title="Copy code"
                >
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

          <div className="panel ir-console-card">
            <div className="ir-console-header">
              <Terminal size={14} />
              <span>Output</span>
              <span className={`ir-console-status ${investigation.error ? 'error' : 'success'}`}>
                {investigation.error ? 'Exception' : 'Completed'}
              </span>
            </div>
            <div className="ir-console-body">
              {investigation.output && (
                <pre className="ir-console-output">{investigation.output}</pre>
              )}
              {investigation.error && (
                <pre className="ir-console-error">{investigation.error}</pre>
              )}
            </div>
          </div>

          <div className="panel ba-analysis-card">
            <div className="ba-card-header">
              <Target size={18} />
              <h3>Bug Analysis</h3>
            </div>
            <div className="ba-analysis-summary">
              <div className="ba-analysis-row">
                <span className="ba-analysis-label">
                  <Eye size={14} /> Observed:
                </span>
                <span className="ba-analysis-value">
                  {observation || <em className="ba-placeholder">Not yet answered</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label">
                  <Crosshair size={14} /> Suspected Line:
                </span>
                <span className="ba-analysis-value">
                  {selectedLine ? `Line ${selectedLine}` : <em className="ba-placeholder">Not yet selected</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label">
                  <Tag size={14} /> Error Type:
                </span>
                <span className="ba-analysis-value">
                  {selectedTypeError?.label || <em className="ba-placeholder">Not yet classified</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label">
                  <AlertTriangle size={14} /> Specific Issue:
                </span>
                <span className="ba-analysis-value">
                  {errorIssue || <em className="ba-placeholder">Not yet identified</em>}
                </span>
              </div>
              <div className="ba-analysis-row">
                <span className="ba-analysis-label">
                  <CheckCircle2 size={14} /> Confidence:
                </span>
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
          className="primary ir-nav-btn-primary"
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
