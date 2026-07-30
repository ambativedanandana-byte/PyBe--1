import React from 'react';
import { BookOpen, Check } from 'lucide-react';

const DEFAULT_OBSERVATIONS = [
  'The work started.',
  'The work stopped.',
  'The work finished.',
  'The result was different.'
];

export default function ObservationNotebook({
  observations = DEFAULT_OBSERVATIONS,
  selectedObservation = '',
  onSelectObservation
}) {
  return (
    <section className="ed-notebook-paper-card">
      <div className="ed-notebook-header">
        <div className="ed-notebook-icon">
          <BookOpen size={20} color="#854d0e" />
        </div>
        <div>
          <h3>📓 My Investigation Notes</h3>
          <p>Select what you observed during the case events.</p>
        </div>
      </div>

      <div className="ed-notebook-chips-grid">
        {observations.map((obs, idx) => {
          const isSelected = selectedObservation === obs;
          return (
            <button
              key={idx}
              className={`ed-notebook-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectObservation && onSelectObservation(obs)}
              aria-pressed={isSelected}
            >
              <div className="ed-chip-check">
                {isSelected ? <Check size={14} /> : <div className="ed-chip-dot" />}
              </div>
              <span>{obs}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
