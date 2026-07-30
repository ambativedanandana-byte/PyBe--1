import React from 'react';
import { Trophy, Zap, Clock, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

export default function CaseClosed({
  caseName = 'Case #01: Robot Delivery',
  conceptName = 'Logical Error',
  xpEarned = 50,
  timeTaken = '2m 15s',
  onNextCase,
  onReturnHome
}) {
  return (
    <section className="ed-case-closed-final-card">
      <div className="ed-case-closed-header">
        <div className="ed-trophy-badge">
          <Trophy size={36} color="#d8f07c" />
        </div>
        <div>
          <h2>🏆 Case Solved!</h2>
          <p className="ed-closed-subtitle">Investigation Complete &amp; Verified</p>
        </div>
      </div>

      <div className="ed-closed-stats-grid">
        <div className="ed-closed-stat-card">
          <span className="ed-stat-label">Investigation Case</span>
          <strong>{caseName}</strong>
        </div>

        <div className="ed-closed-stat-card">
          <span className="ed-stat-label">Discovered Concept</span>
          <strong style={{ color: '#3b82f6' }}>{conceptName}</strong>
        </div>

        <div className="ed-closed-stat-card">
          <span className="ed-stat-label">XP Earned</span>
          <strong style={{ color: '#7b9f27', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Zap size={16} fill="currentColor" /> +{xpEarned} XP
          </strong>
        </div>

        <div className="ed-closed-stat-card">
          <span className="ed-stat-label">Time Taken</span>
          <strong style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={16} /> {timeTaken}
          </strong>
        </div>
      </div>

      <div className="ed-closed-actions">
        {onReturnHome && (
          <button className="ed-btn ed-btn-secondary" onClick={onReturnHome}>
            <Home size={16} /> Return Home
          </button>
        )}

        {onNextCase && (
          <button className="ed-btn ed-btn-primary" onClick={onNextCase} style={{ marginLeft: 'auto' }}>
            Next Case <ArrowRight size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
