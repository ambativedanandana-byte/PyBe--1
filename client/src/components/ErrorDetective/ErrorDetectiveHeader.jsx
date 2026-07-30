import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ErrorDetectiveHeader({
  xp = 150,
  currentCase = 'Case #01: Billing Bug',
  progress = 45,
  onBack
}) {
  return (
    <header className="ed-header-card">
      <div className="ed-header-main">
        <div className="ed-badge-icon" title="Detective Badge">
          🕵️
        </div>
        <div className="ed-header-titles">
          <h1>Error Detective</h1>
          <p className="ed-header-subtitle">Observe. Investigate. Discover.</p>
        </div>
      </div>

      <div className="ed-header-stats-group">
        <div className="ed-stat-pill">
          <span className="ed-stat-pill-label">XP Earned</span>
          <span className="ed-stat-pill-value">⚡ {xp} XP</span>
        </div>

        <div className="ed-stat-pill">
          <span className="ed-stat-pill-label">Active Case</span>
          <span className="ed-stat-pill-value" style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>
            {currentCase}
          </span>
        </div>

        <div className="ed-header-progress-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="ed-progress-bar-bg">
            <div className="ed-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {onBack && (
          <button className="ed-back-btn" onClick={onBack} aria-label="Go Back">
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>
    </header>
  );
}
