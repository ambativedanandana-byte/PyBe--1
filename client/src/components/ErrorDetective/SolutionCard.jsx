import React from 'react';
import { KeyRound } from 'lucide-react';

export default function SolutionCard({ solutionText = '' }) {
  if (!solutionText) return null;

  return (
    <div className="ed-solution-card">
      <div className="ed-solution-header">
        <KeyRound size={18} color="#2563eb" />
        <strong>Recommended Fix Solution</strong>
      </div>
      <p className="ed-solution-text">{solutionText}</p>
    </div>
  );
}
