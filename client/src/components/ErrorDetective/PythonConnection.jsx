import React from 'react';
import { Code2, ArrowDown, HelpCircle, ArrowRight } from 'lucide-react';
import PythonCodeViewer from './PythonCodeViewer';

export default function PythonConnection({
  storyComparison = {},
  codeSnippet = '',
  highlightLine = 3,
  onProceed
}) {
  return (
    <section className="ed-python-connection-card">
      <div className="ed-section-title-wrap">
        <div className="ed-section-icon-badge" style={{ background: '#3b82f6' }}>
          <Code2 size={22} color="#ffffff" />
        </div>
        <div>
          <h2>🐍 Python Investigation</h2>
          <p>Connect your real-life detective observation directly to Python code structure.</p>
        </div>
      </div>

      <div className="ed-connection-comparison-grid">
        {/* Story Side */}
        <div className="ed-comparison-box story">
          <span className="ed-box-label">📖 Real-Life Observation</span>
          <p>{storyComparison.storyText || 'The physical system behavior produced an unexpected readout.'}</p>
        </div>

        <div className="ed-comparison-arrow">
          <ArrowDown size={22} color="#3b82f6" />
        </div>

        {/* Python Code Side */}
        <div className="ed-comparison-box python">
          <span className="ed-box-label">💻 Python Equivalent</span>
          <PythonCodeViewer
            code={codeSnippet}
            highlightLine={highlightLine}
            fileName="investigation_target.py"
          />
        </div>
      </div>

      <div className="ed-notice-banner">
        <HelpCircle size={20} color="#3b82f6" />
        <div>
          <strong>What do you notice?</strong>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
            Compare the highlighted Python line above with what happened in the real-life story. Notice how the computer executes instructions literally.
          </p>
        </div>
      </div>

      {onProceed && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="ed-btn ed-btn-primary" onClick={onProceed}>
            Reveal Concept <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
