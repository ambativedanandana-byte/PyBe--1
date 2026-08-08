import React from 'react';
import { BookOpen, Bug, Wrench, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'analysis', label: 'Analysis', icon: Bug },
  { id: 'fix', label: 'Fix', icon: Wrench },
  { id: 'results', label: 'Results', icon: CheckCircle2 },
];

export default function InvestigationProgress({ currentStep = 'story' }) {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="ip-bar">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isDone = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <React.Fragment key={step.id}>
            {idx > 0 && <span className="ip-connector" />}
            <span className={`ip-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <span className="ip-dot">
                {isDone ? <CheckCircle2 size={12} /> : <Icon size={12} />}
              </span>
              <span className="ip-label">{step.label}</span>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
