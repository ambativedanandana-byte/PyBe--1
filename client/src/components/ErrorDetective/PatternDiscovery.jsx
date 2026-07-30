import React from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

const DEFAULT_PATTERNS = [
  {
    id: 'pat-1',
    title: 'The work never started.',
    description: 'System failed before initial action could begin.'
  },
  {
    id: 'pat-2',
    title: 'The work started but stopped.',
    description: 'An unexpected halt interrupted execution midway.'
  },
  {
    id: 'pat-3',
    title: 'The work finished but produced the wrong result.',
    description: 'All actions completed to the end, but the final outcome differed from physical expectation.'
  }
];

export default function PatternDiscovery({
  patterns = DEFAULT_PATTERNS,
  selectedPatternId = '',
  onSelectPattern
}) {
  return (
    <section className="ed-pattern-discovery-card">
      <div className="ed-pattern-header">
        <div className="ed-pattern-icon">
          <Eye size={20} color="#3b82f6" />
        </div>
        <div>
          <h3>🔍 Pattern Discovery</h3>
          <p className="ed-pattern-question">What pattern do you notice?</p>
        </div>
      </div>

      <div className="ed-pattern-grid">
        {patterns.map((pat) => {
          const isSelected = selectedPatternId === pat.id;
          return (
            <div
              key={pat.id}
              className={`ed-pattern-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPattern && onSelectPattern(pat.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectPattern && onSelectPattern(pat.id);
                }
              }}
            >
              <div className="ed-pattern-card-header">
                <h4>{pat.title}</h4>
                {isSelected && <CheckCircle2 size={18} color="#3b82f6" />}
              </div>
              <p>{pat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
