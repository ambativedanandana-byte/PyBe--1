import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function EvidenceCard({
  evidence = {},
  selected = false,
  onToggle
}) {
  return (
    <div
      className={`ed-evidence-sticky-note ${selected ? 'selected' : ''}`}
      onClick={() => onToggle && onToggle(evidence.id)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggle && onToggle(evidence.id);
        }
      }}
    >
      <div className="ed-sticky-header">
        <span className="ed-sticky-tag">
          <FileText size={13} /> {evidence.label || 'CASE EVIDENCE'}
        </span>
        <div className="ed-sticky-check">
          {selected ? <CheckCircle2 size={16} color="#7b9f27" /> : <div className="ed-check-dot" />}
        </div>
      </div>
      <p className="ed-sticky-body">{evidence.details}</p>
    </div>
  );
}
