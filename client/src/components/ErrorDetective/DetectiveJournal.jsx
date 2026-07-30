import React from 'react';
import { BookMarked, Calendar, Tag, CheckCircle2 } from 'lucide-react';

export default function DetectiveJournal({
  completedEntries = [
    {
      caseId: 'case1',
      caseName: 'Case #01: Robot Delivery',
      conceptName: 'Logical Error',
      behaviorPattern: 'The work finished but produced the wrong result.',
      summarySentence: 'Quotes around numbers caused text concatenation instead of numeric addition.',
      dateCompleted: '2026-07-30'
    }
  ]
}) {
  if (!completedEntries || completedEntries.length === 0) {
    return null;
  }

  return (
    <section className="ed-journal-container">
      <div className="ed-journal-header">
        <div className="ed-journal-icon">
          <BookMarked size={22} color="#854d0e" />
        </div>
        <div>
          <h2>📓 Detective Journal</h2>
          <p>Your log of solved cases and discovered programming patterns.</p>
        </div>
      </div>

      <div className="ed-journal-grid">
        {completedEntries.map((entry, idx) => (
          <div key={entry.caseId || idx} className="ed-journal-sticky-note">
            <div className="ed-journal-note-header">
              <span className="ed-journal-case-badge">{entry.caseName}</span>
              <span className="ed-journal-date">
                <Calendar size={12} /> {entry.dateCompleted || 'Today'}
              </span>
            </div>

            <div className="ed-journal-concept-tag">
              <Tag size={13} /> {entry.conceptName}
            </div>

            <p className="ed-journal-pattern">
              <strong>Observed Behavior:</strong> {entry.behaviorPattern}
            </p>

            <p className="ed-journal-summary">
              "{entry.summarySentence}"
            </p>

            <div className="ed-journal-verified">
              <CheckCircle2 size={14} color="#7b9f27" /> Case Closed &amp; Archived
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
