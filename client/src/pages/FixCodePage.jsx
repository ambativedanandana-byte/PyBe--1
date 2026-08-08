import React, { useState, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Copy,
  RotateCcw,
  Undo2,
  Redo2,
  Trash2,
  FileText,
  Search,
  PenLine,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { getExpectedSolution } from '../data/expectedSolutions';

function normalizeCode(lines) {
  return lines
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => l.trim() !== '' || l === '')
    .join('\n');
}

export default function FixCodePage({
  investigation,
  story,
  levelName,
  analysisData,
  onBack,
  onContinue,
}) {
  const investigationId = analysisData?.investigationId || '';
  const expectedSolution = getExpectedSolution(investigationId);

  const originalCode = investigation?.code || [];
  const [codeLines, setCodeLines] = useState([...originalCode]);
  const [history, setHistory] = useState([[...originalCode]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [startTime] = useState(() => Date.now());
  const textareaRef = useRef(null);

  const pushHistory = useCallback(
    (newLines) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push([...newLines]);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const handleCodeChange = (e) => {
    const newLines = e.target.value.split('\n');
    setCodeLines(newLines);
    pushHistory(newLines);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCodeLines([...history[newIndex]]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCodeLines([...history[newIndex]]);
    }
  };

  const handleReset = () => {
    setCodeLines([...originalCode]);
    setHistory([[...originalCode]]);
    setHistoryIndex(0);
    setConsoleOutput([]);
    setIsSolved(false);
    setRunCount(0);
    setResetCount((c) => c + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeLines.join('\n'));
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  const validateSolution = useCallback(() => {
    if (!expectedSolution) return false;

    const learnerCode = normalizeCode(codeLines);
    const expectedCode = normalizeCode(expectedSolution.expectedCode);

    if (learnerCode === expectedCode) return true;

    if (expectedSolution.expectedOutput) {
      const normalizedLearner = learnerCode.replace(/\s+/g, ' ').trim();
      const normalizedExpected = expectedCode.replace(/\s+/g, ' ').trim();
      if (normalizedLearner === normalizedExpected) return true;
    }

    return false;
  }, [codeLines, expectedSolution]);

  const handleRunCode = () => {
    setRunCount((c) => c + 1);
    const code = codeLines.join('\n');

    const newOutput = [];

    if (expectedSolution) {
      const solved = validateSolution();

      if (solved) {
        setIsSolved(true);
        newOutput.push({
          type: 'success',
          text: expectedSolution.expectedOutput || 'Code runs successfully!',
        });
        newOutput.push({
          type: 'info',
          text: 'Investigation Successful! The code is now correct.',
        });
      } else {
        newOutput.push({
          type: 'error',
          text: 'The program still has an issue. Keep investigating.',
        });

        if (runCount >= 2) {
          newOutput.push({
            type: 'hint',
            text: `Expected behavior: ${expectedSolution.expectedBehavior}`,
          });
        }
      }
    } else {
      newOutput.push({
        type: 'info',
        text: 'Code executed. Check the output above.',
      });
    }

    setConsoleOutput((prev) => [...prev, { type: 'divider' }, ...newOutput]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = codeLines.join('\n');
      const newLines = newCode.substring(0, start) + '    ' + newCode.substring(end).split('\n');
      const lines = newCode.substring(0, start) + '    ' + newCode.substring(end);
      setCodeLines(lines.split('\n'));
      pushHistory(lines.split('\n'));
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      handleUndo();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      handleRedo();
    }
  };

  const lineCount = codeLines.length;

  return (
    <section className="workspace ed-page fc-page">
      <header className="hero ed-hero fc-hero">
        <div>
          <button className="ed-back-btn" onClick={onBack}>
            <ChevronLeft size={16} /> Back to Analysis
          </button>
          <p>Fix the Code</p>
          <h1>Case #{story.caseNumber} — {story.title}</h1>
        </div>
        <div className="hero-stats">
          <span>{story.difficulty}<small>Difficulty</small></span>
          <span className={`fc-status-badge ${isSolved ? 'solved' : ''}`}>
            {isSolved ? <><CheckCircle2 size={14} /> Solved</> : 'Debugging'}
          </span>
        </div>
      </header>

      <div className="fc-layout">
        {/* Left Panel */}
        <div className="fc-left">
          <div className="panel fc-summary-card">
            <div className="fc-card-header">
              <FileText size={18} />
              <h3>Investigation Summary</h3>
            </div>
            <div className="fc-summary-rows">
              <div className="fc-summary-row">
                <span className="fc-summary-label">Case</span>
                <span className="fc-summary-value">#{story.caseNumber}</span>
              </div>
              <div className="fc-summary-row">
                <span className="fc-summary-label">Title</span>
                <span className="fc-summary-value">{story.title}</span>
              </div>
              <div className="fc-summary-row">
                <span className="fc-summary-label">Difficulty</span>
                <span className="fc-summary-value">{story.difficulty}</span>
              </div>
              {analysisData?.selectedLine && (
                <div className="fc-summary-row">
                  <span className="fc-summary-label">Suspected Line</span>
                  <span className="fc-summary-value fc-highlight">Line {analysisData.selectedLine}</span>
                </div>
              )}
              {analysisData?.errorType && (
                <div className="fc-summary-row">
                  <span className="fc-summary-label">Error Category</span>
                  <span className="fc-summary-value">{analysisData.errorType}</span>
                </div>
              )}
              {analysisData?.errorIssue && (
                <div className="fc-summary-row">
                  <span className="fc-summary-label">Error Name</span>
                  <span className="fc-summary-value fc-highlight">{analysisData.errorIssue}</span>
                </div>
              )}
            </div>
          </div>

          <div className="panel fc-evidence-card">
            <div className="fc-card-header">
              <Search size={18} />
              <h3>Evidence</h3>
            </div>
            <ul className="fc-evidence-list">
              {investigation?.evidenceClues?.map((clue, idx) => (
                <li key={idx} className="fc-evidence-item">
                  <span className="fc-evidence-bullet">•</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel fc-behavior-card">
            <div className="fc-card-header">
              <Target size={18} />
              <h3>Expected Behavior</h3>
            </div>
            <p className="fc-behavior-text">
              {expectedSolution?.expectedBehavior || 'The program should run without errors and produce the correct output.'}
            </p>
          </div>

          <div className="panel fc-notes-card">
            <div className="fc-card-header">
              <PenLine size={18} />
              <h3>Notes</h3>
            </div>
            <textarea
              className="fc-notes-input"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Add observations while debugging..."
              rows={4}
            />
          </div>
        </div>

        {/* Center Panel */}
        <div className="fc-center">
          <div className="panel fc-editor-card">
            <div className="fc-editor-toolbar">
              <div className="fc-editor-dots">
                <span className="fc-dot red" />
                <span className="fc-dot yellow" />
                <span className="fc-dot green" />
              </div>
              <span className="fc-editor-filename">investigation.py</span>
              <div className="fc-editor-actions">
                <button className="fc-editor-btn" onClick={handleUndo} title="Undo (Ctrl+Z)" disabled={historyIndex === 0}>
                  <Undo2 size={14} />
                </button>
                <button className="fc-editor-btn" onClick={handleRedo} title="Redo (Ctrl+Y)" disabled={historyIndex === history.length - 1}>
                  <Redo2 size={14} />
                </button>
                <button className="fc-editor-btn" onClick={handleCopy} title="Copy code">
                  <Copy size={14} />
                </button>
                <button className="fc-editor-btn" onClick={handleReset} title="Reset code">
                  <RotateCcw size={14} />
                </button>
                <button className="fc-editor-btn fc-format-btn" title="Format code (placeholder)">
                  {'{ }'}
                </button>
                <button className="fc-editor-btn fc-run-btn" onClick={handleRunCode} title="Run code">
                  <Play size={14} /> Run Code
                </button>
              </div>
            </div>
            <div className="fc-code-area">
              <div className="fc-line-numbers">
                {codeLines.map((_, idx) => (
                  <span key={idx} className={analysisData?.selectedLine === idx + 1 ? 'fc-line-suspect' : ''}>
                    {idx + 1}
                  </span>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                className="fc-code-textarea"
                value={codeLines.join('\n')}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                wrap="off"
              />
            </div>
          </div>

          <div className="panel fc-console-card">
            <div className="fc-console-header">
              <div className="fc-console-title">
                <span className="fc-console-icon">&gt;_</span>
                <span>Console</span>
              </div>
              <div className="fc-console-actions">
                <button className="fc-console-btn" onClick={handleClearConsole} title="Clear console">
                  <Trash2 size={12} /> Clear
                </button>
              </div>
            </div>
            <div className="fc-console-body">
              {consoleOutput.length === 0 && (
                <span className="fc-console-idle">Click "Run Code" to test your solution...</span>
              )}
              {consoleOutput.map((entry, idx) => {
                if (entry.type === 'divider') {
                  return <div key={idx} className="fc-console-divider" />;
                }
                return (
                  <div key={idx} className={`fc-console-entry ${entry.type}`}>
                    <span className="fc-console-prefix">
                      {entry.type === 'error' ? '✗' : entry.type === 'success' ? '✓' : entry.type === 'hint' ? '💡' : '›'}
                    </span>
                    <pre className="fc-console-text">{entry.text}</pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="ir-nav-row">
        <button className="ir-nav-btn" onClick={onBack}>
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          className={`primary ir-nav-btn-primary ${!isSolved ? 'disabled' : ''}`}
          onClick={isSolved ? () => onContinue({
            runCount,
            resetCount,
            timeSpent: Math.round((Date.now() - startTime) / 1000),
            notes: additionalNotes,
          }) : undefined}
          disabled={!isSolved}
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
