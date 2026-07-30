import React, { useState, useEffect } from 'react';
import { Code2, Terminal, Play, RotateCcw, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

const DEFAULT_CODE = `# Python Investigation Target
def calculate_total(price, quantity):
    # Bug: Addition (+) used instead of multiplication (*)
    total = price + quantity
    return total

print(calculate_total(250, 4))`;

export default function PythonPlaceholder({
  isVisible = true,
  codeSnippet = DEFAULT_CODE,
  expectedOutput = "1000",
  onSolve
}) {
  const [code, setCode] = useState(codeSnippet);
  const [terminalOutput, setTerminalOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  // Update code when codeSnippet prop changes
  useEffect(() => {
    setCode(codeSnippet);
    setTerminalOutput(null);
    setStatus('idle');
  }, [codeSnippet]);

  // Reset code to original snippet
  const handleReset = () => {
    setCode(codeSnippet);
    setTerminalOutput(null);
    setStatus('idle');
  };

  // Run simulation & evaluate python code logic
  const handleRunSimulation = () => {
    setIsRunning(true);
    setStatus('running');

    setTimeout(() => {
      try {
        let outputStr = '';
        
        // Check for operator in `total = price <op> quantity` or similar expressions
        if (code.includes('price * quantity') || code.includes('price*quantity')) {
          outputStr = '1000';
        } else if (code.includes('price + quantity') || code.includes('price+quantity')) {
          outputStr = '254';
        } else if (code.includes('price - quantity') || code.includes('price-quantity')) {
          outputStr = '246';
        } else if (code.includes('price / quantity') || code.includes('price/quantity')) {
          outputStr = '62.5';
        } else {
          // Dynamic evaluation attempt for python return statement
          const returnMatch = code.match(/return\s+(.+)/);
          if (returnMatch) {
            const expr = returnMatch[1]
              .replace(/price/g, '250')
              .replace(/quantity/g, '4')
              .replace(/total/g, '');
            try {
              // eslint-disable-next-line no-eval
              const res = Function(`"use strict"; return (${expr})`)();
              outputStr = String(res);
            } catch {
              outputStr = 'Syntax/Execution error in formula';
            }
          } else {
            outputStr = 'No return statement found in function.';
          }
        }

        setTerminalOutput(`>>> Running python3 investigation_target.py\n${outputStr}`);

        if (outputStr.trim() === expectedOutput.trim()) {
          setStatus('success');
          if (onSolve) onSolve();
        } else {
          setStatus('error');
        }
      } catch (err) {
        setTerminalOutput(`>>> Execution Error:\n${err.message}`);
        setStatus('error');
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <section className="ed-placeholder-card" style={{ opacity: 1, borderStyle: 'solid' }}>
      <div className="ed-placeholder-header">
        <div className="ed-placeholder-title" style={{ color: '#3b82f6' }}>
          <Code2 size={22} /> Python Investigation Workspace
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="ed-placeholder-badge" style={{ background: '#dbeafe', color: '#1e40af' }}>
            Interactive Editor • Live Execution
          </span>
          <button
            className="ed-btn ed-btn-secondary"
            onClick={handleReset}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            title="Reset code to original"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
        Edit the Python code below to fix the anomaly observed during your detective investigation, then run the simulation!
      </p>

      {/* Code Editor */}
      <div className="ed-code-preview" style={{ padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#161b22', borderBottom: '1px solid #30363d', color: '#94a3b8', fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={14} /> investigation_target.py
          </span>
          <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 700 }}>
            ✏️ Editable Code
          </span>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '160px',
            background: '#0d1117',
            color: '#79c0ff',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.92rem',
            padding: '16px',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: 1.5
          }}
        />
      </div>

      {/* Execution Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.08)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(59, 130, 246, 0.2)', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1d4ed8', fontSize: '0.88rem', fontWeight: 700 }}>
          <Sparkles size={18} color="#3b82f6" /> Python Execution Sandbox Ready
        </div>

        <button
          className="ed-btn ed-btn-primary"
          onClick={handleRunSimulation}
          disabled={isRunning}
          style={{ background: '#2563eb', color: '#ffffff' }}
        >
          <Play size={15} fill="currentColor" /> {isRunning ? 'Running...' : 'Run Simulation'}
        </button>
      </div>

      {/* Terminal Output Banner */}
      {terminalOutput && (
        <div style={{ background: '#090d16', border: '2px solid #1e293b', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={14} color="#38bdf8" /> Terminal Execution Output
          </div>
          <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
            {terminalOutput}
          </pre>

          {status === 'success' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginTop: 4 }}>
              <CheckCircle2 size={18} /> 🎉 CASE SOLVED! The output is {expectedOutput}. The formula bug has been fixed successfully!
            </div>
          )}

          {status === 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginTop: 4 }}>
              <AlertTriangle size={18} /> ⚠️ Anomaly remains in output (Expected {expectedOutput}). Check your operator math!
            </div>
          )}
        </div>
      )}
    </section>
  );
}
