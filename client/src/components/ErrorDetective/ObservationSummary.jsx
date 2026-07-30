import React from 'react';
import { ClipboardList, Edit3, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ObservationSummary({
  selectedClues = [],
  notes = '',
  onChangeNotes,
  onContinue
}) {
  return (
    <section className="ed-summary-card">
      <div className="ed-summary-title">
        <ClipboardList size={22} color="#7b9f27" /> Detective Observation Summary
      </div>

      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Selected Clues &amp; Findings
        </div>

        {selectedClues.length > 0 ? (
          <div className="ed-clues-list">
            {selectedClues.map((clue, idx) => (
              <span key={idx} className="ed-clue-badge">
                <CheckCircle2 size={14} /> {clue}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem', margin: 0 }}>
            No clues selected yet. Click evidence cards above to add clues to your report.
          </p>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          <Edit3 size={14} /> Edit Learner Observations
        </div>
        <textarea
          className="ed-notes-textarea"
          value={notes}
          onChange={(e) => onChangeNotes && onChangeNotes(e.target.value)}
          placeholder="Record your detective reasoning and hypotheses here before opening the Python Investigation workspace..."
        />
      </div>

      {onContinue && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <button className="ed-btn ed-btn-primary" onClick={onContinue}>
            Proceed to Python Investigation <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
