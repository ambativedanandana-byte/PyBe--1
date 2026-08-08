import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function CaseHeader({
  levelName,
  caseNumber,
  title,
  difficulty,
  duration,
  statusBadge,
  backLabel = 'Back to Investigations',
  onBack,
}) {
  return (
    <header className="hero ed-hero ch-compact">
      <div className="ch-top">
        <button className="ed-back-btn" onClick={onBack}>
          <ChevronLeft size={16} /> {backLabel}
        </button>
      </div>
      <div className="ch-main">
        <div className="ch-info">
          <p className="ch-level">{levelName}</p>
          <h1 className="ch-title">Case #{caseNumber} — {title}</h1>
        </div>
        <div className="ch-meta">
          {difficulty && <span className="ch-badge ch-diff">{difficulty}</span>}
          {duration && <span className="ch-badge ch-dur">{duration}</span>}
          {statusBadge && <span className="ch-badge ch-status">{statusBadge}</span>}
        </div>
      </div>
    </header>
  );
}
