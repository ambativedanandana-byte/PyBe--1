import React from 'react';
import { Terminal, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function RunOutput({
  beforeOutput = '105',
  afterOutput = '15',
  expectedOutput = '15',
  isSuccess = false
}) {
  return (
    <div className="ed-run-output-card">
      <div className="ed-output-header">
        <Terminal size={18} color="#38bdf8" />
        <span>Terminal Execution Comparison</span>
      </div>

      <div className="ed-output-comparison-grid">
        <div className="ed-output-box before">
          <span className="ed-output-label">Before Fix (Buggy)</span>
          <pre className="ed-output-pre">{beforeOutput}</pre>
        </div>

        <div className="ed-output-arrow">
          <ArrowRight size={20} color="#64748b" />
        </div>

        <div className={`ed-output-box after ${isSuccess ? 'success' : 'error'}`}>
          <span className="ed-output-label">After Fix (Current)</span>
          <pre className="ed-output-pre">{afterOutput || 'No output'}</pre>
        </div>
      </div>

      {isSuccess ? (
        <div className="ed-output-banner success">
          <CheckCircle2 size={18} />
          <span>🎉 Code Fix Verified! Output matches expected result: {expectedOutput}</span>
        </div>
      ) : (
        <div className="ed-output-banner error">
          <AlertTriangle size={18} />
          <span>⚠️ Anomaly remains in code execution. Expected output: {expectedOutput}</span>
        </div>
      )}
    </div>
  );
}
