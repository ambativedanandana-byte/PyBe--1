import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function HintCard({ hintText = '' }) {
  if (!hintText) return null;

  return (
    <div className="ed-hint-card">
      <div className="ed-hint-header">
        <Lightbulb size={18} color="#d97706" />
        <strong>Detective Hint</strong>
      </div>
      <p className="ed-hint-text">{hintText}</p>
    </div>
  );
}
