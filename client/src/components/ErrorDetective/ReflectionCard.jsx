import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

const DEFAULT_REFLECTIONS = [
  'The measurement values were combined as text rather than adding their quantities.',
  'The scale sensor sent data before the boxes settled on the platform.',
  'The calculation rule applied the wrong mathematical formula.'
];

export default function ReflectionCard({
  reflections = DEFAULT_REFLECTIONS,
  selectedReflection = '',
  onSelectReflection
}) {
  return (
    <section className="ed-reflection-card">
      <div className="ed-reflection-header">
        <div className="ed-reflection-icon">
          <HelpCircle size={20} color="#d97706" />
        </div>
        <div>
          <h3>💡 Case Reflection</h3>
          <p className="ed-reflection-question">Why do you think this happened?</p>
        </div>
      </div>

      <div className="ed-reflection-options">
        {reflections.map((refText, idx) => {
          const isSelected = selectedReflection === refText;
          return (
            <button
              key={idx}
              className={`ed-reflection-option ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectReflection && onSelectReflection(refText)}
              aria-pressed={isSelected}
            >
              <div className="ed-reflection-radio-ring">
                {isSelected && <div className="ed-reflection-radio-dot" />}
              </div>
              <span>{refText}</span>
            </button>
          );
        })}
      </div>

      <div className="ed-reflection-footer-note">
        <Sparkles size={14} color="#d97706" />
        <span>Reflective Discovery • All detective hypotheses help build critical thinking skills.</span>
      </div>
    </section>
  );
}
