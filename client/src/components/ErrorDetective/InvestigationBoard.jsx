import React from 'react';
import { Search, FolderCheck } from 'lucide-react';
import EvidenceCard from './EvidenceCard';

export default function InvestigationBoard({
  evidenceList = [],
  selectedIds = [],
  onToggleEvidence
}) {
  return (
    <section className="ed-investigation-board-card">
      <div className="ed-board-header">
        <div className="ed-board-icon" title="Investigation Board">
          🕵️
        </div>
        <div>
          <h2 className="ed-board-title">🕵 Investigation Board</h2>
          <p className="ed-board-subtitle">We have collected evidence from the case.</p>
        </div>
      </div>

      <div className="ed-board-notes-grid">
        {evidenceList.map((item) => (
          <EvidenceCard
            key={item.id}
            evidence={item}
            selected={selectedIds.includes(item.id)}
            onToggle={onToggleEvidence}
          />
        ))}
      </div>
    </section>
  );
}
