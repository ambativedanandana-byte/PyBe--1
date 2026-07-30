import React from 'react';
import { ClipboardCheck, FileCheck, ArrowRight } from 'lucide-react';

export default function InvestigationSummary({
  caseTitle = 'Robot Delivery',
  timelineItems = [],
  selectedEvidence = [],
  observation = '',
  patternTitle = '',
  reflection = '',
  onContinue
}) {
  return (
    <section className="ed-summary-report-card">
      <div className="ed-summary-report-header">
        <div className="ed-summary-report-icon">
          <ClipboardCheck size={24} color="#7b9f27" />
        </div>
        <div>
          <h3>📁 Detective Investigation Report</h3>
          <p>Review your compiled findings for {caseTitle} before completing the discovery phase.</p>
        </div>
      </div>

      <div className="ed-report-grid">
        {/* Timeline Summary */}
        <div className="ed-report-block">
          <span className="ed-report-label">1. Event Timeline Order</span>
          <ol className="ed-report-timeline-list">
            {timelineItems.map((item, idx) => (
              <li key={idx}>{item.text}</li>
            ))}
          </ol>
        </div>

        {/* Selected Evidence */}
        <div className="ed-report-block">
          <span className="ed-report-label">2. Gathered Evidence</span>
          <div className="ed-report-tags">
            {selectedEvidence.length > 0 ? (
              selectedEvidence.map((ev, idx) => (
                <span key={idx} className="ed-report-tag">
                  <FileCheck size={13} /> {ev.label || ev}
                </span>
              ))
            ) : (
              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>No specific evidence tagged</span>
            )}
          </div>
        </div>

        {/* Observation & Discovered Pattern */}
        <div className="ed-report-block">
          <span className="ed-report-label">3. Notebook Observation</span>
          <p className="ed-report-text">{observation || 'Not selected yet'}</p>
        </div>

        <div className="ed-report-block">
          <span className="ed-report-label">4. Discovered Behavior Pattern</span>
          <p className="ed-report-text" style={{ fontWeight: 700, color: '#3b82f6' }}>
            {patternTitle || 'Not selected yet'}
          </p>
        </div>

        {/* Reflection */}
        {reflection && (
          <div className="ed-report-block" style={{ gridColumn: '1 / -1' }}>
            <span className="ed-report-label">5. Detective Hypothesis</span>
            <p className="ed-report-text" style={{ fontStyle: 'italic', color: '#854d0e' }}>
              "{reflection}"
            </p>
          </div>
        )}
      </div>

      {onContinue && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="ed-btn ed-btn-primary" onClick={onContinue}>
            Complete Investigation &amp; Continue <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
