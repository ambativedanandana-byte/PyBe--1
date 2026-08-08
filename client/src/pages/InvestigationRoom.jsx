import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Copy,
  RotateCcw,
  FileText,
  Search,
  Eye,
  Terminal,
} from 'lucide-react';

function highlightPython(line) {
  let result = line;

  // Comments
  if (/^\s*#/.test(result)) {
    return <span className="ir-code-comment">{result}</span>;
  }

  // Strings (single and double quoted, with optional f/r/b prefix)
  result = result.replace(/((?:f|r|b|fr|rf|br|rb)?)"[^"]*?"/g, '<span class="ir-code-string">$&</span>');
  result = result.replace(/((?:f|r|b|fr|rf|br|rb)?)'[^']*?'/g, '<span class="ir-code-string">$&</span>');

  // Keywords
  const keywords = ['def', 'return', 'if', 'elif', 'else', 'for', 'in', 'while', 'import', 'from', 'as', 'with', 'print', 'range', 'len', 'int', 'float', 'str', 'list', 'dict', 'True', 'False', 'None', 'and', 'or', 'not', 'try', 'except', 'finally', 'raise', 'class', 'lambda', 'pass', 'break', 'continue'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span class="ir-code-keyword">$1</span>');

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="ir-code-number">$1</span>');

  // Built-in functions
  const builtins = ['print', 'input', 'range', 'len', 'int', 'float', 'str', 'list', 'dict', 'set', 'tuple', 'sum', 'min', 'max', 'abs', 'round', 'open', 'type', 'isinstance'];
  const builtinPattern = new RegExp(`\\b(${builtins.join('|')})(?=\\()`, 'g');
  result = result.replace(builtinPattern, '<span class="ir-code-builtin">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export default function InvestigationRoom({
  investigation,
  story,
  levelName,
  onBack,
  onContinue,
}) {
  const [codeRan, setCodeRan] = useState(false);
  const [notebookText, setNotebookText] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleRunCode = () => {
    setCodeRan(true);
  };

  const handleCopy = () => {
    const codeText = investigation.code.join('\n');
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCodeRan(false);
  };

  return (
    <section className="workspace ed-page">
      {/* Header */}
      <header className="hero ed-hero ir-hero">
        <div>
          <button className="ed-back-btn" onClick={onBack}>
            <ChevronLeft size={16} /> Back to Story
          </button>
          <p>Investigation Room</p>
          <h1>Case #{story.caseNumber} — {story.title}</h1>
        </div>
        <div className="hero-stats">
          <span>{story.difficulty}<small>Difficulty</small></span>
          <span className="ir-status-badge">🔍 Evidence Collection</span>
        </div>
      </header>

      <div className="ir-layout">
        {/* Left Side */}
        <div className="ir-left">
          {/* Evidence Board */}
          <div className="panel ir-evidence-card">
            <div className="ir-card-header">
              <Search size={18} />
              <h3>Evidence Board</h3>
            </div>
            <ul className="ir-evidence-list">
              {investigation.evidenceClues.map((clue, idx) => (
                <li key={idx} className="ir-evidence-item">
                  <span className="ir-evidence-bullet">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detective Notebook */}
          <div className="panel ir-notebook-card">
            <div className="ir-card-header">
              <FileText size={18} />
              <h3>Detective Notebook</h3>
            </div>
            <p className="ir-notebook-placeholder">What did you notice while investigating?</p>
            <textarea
              className="ir-notebook-input"
              value={notebookText}
              onChange={(e) => setNotebookText(e.target.value)}
              placeholder="Type your observations here..."
              rows={5}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="ir-right">
          {/* Code Editor */}
          <div className="panel ir-editor-card">
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
                <button
                  className="ir-editor-btn"
                  onClick={handleReset}
                  title="Reset output"
                >
                  <RotateCcw size={14} /> Reset
                </button>
                <button
                  className="ir-editor-btn ir-run-btn"
                  onClick={handleRunCode}
                  title="Run code"
                >
                  <Play size={14} /> Run Code
                </button>
              </div>
            </div>
            <div className="ir-code-area">
              <div className="ir-line-numbers">
                {investigation.code.map((_, idx) => (
                  <span key={idx}>{idx + 1}</span>
                ))}
              </div>
              <pre className="ir-code-content">
                {investigation.code.map((line, idx) => (
                  <div key={idx} className="ir-code-line">
                    {highlightPython(line)}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Output Console */}
          <div className="panel ir-console-card">
            <div className="ir-console-header">
              <Terminal size={14} />
              <span>Output</span>
              {codeRan && (
                <span className={`ir-console-status ${investigation.error ? 'error' : 'success'}`}>
                  {investigation.error ? 'Exception' : 'Completed'}
                </span>
              )}
            </div>
            <div className="ir-console-body">
              {!codeRan && (
                <span className="ir-console-idle">Click "Run Code" to see the output...</span>
              )}
              {codeRan && investigation.output && (
                <pre className="ir-console-output">{investigation.output}</pre>
              )}
              {codeRan && investigation.error && (
                <pre className="ir-console-error">{investigation.error}</pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="ir-nav-row">
        <button className="ir-nav-btn" onClick={onBack}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="primary ir-nav-btn-primary" onClick={onContinue}>
          Continue Investigation <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
