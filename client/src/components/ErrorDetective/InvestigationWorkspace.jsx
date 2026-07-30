import React from 'react';
import { Search, StickyNote, FileSearch, ShieldCheck } from 'lucide-react';
import EvidenceCard from './EvidenceCard';

const DEFAULT_EVIDENCE_ITEMS = [
  {
    id: 'ev-1',
    tag: 'ANOMALY DETECTED',
    text: 'Output total showed 254 instead of 1000 when multiplying 250 by 4.'
  },
  {
    id: 'ev-2',
    tag: 'CODE OPERATOR',
    text: 'Addition operator (+) was used instead of multiplication (*).'
  },
  {
    id: 'ev-3',
    tag: 'VARIABLE TRACKING',
    text: 'Quantity variable was passed correctly but calculation formula has a bug.'
  }
];

export default function InvestigationWorkspace({
  evidences = DEFAULT_EVIDENCE_ITEMS,
  selectedIds = [],
  onToggleEvidence,
  stickyNote = 'Detective Note: Inspect operator signs carefully. Addition (+), Subtraction (-), and Multiplication (*) alter billing totals dramatically!'
}) {
  return (
    <section className="ed-workspace-card">
      <div className="ed-workspace-header">
        <div className="ed-mag-glass-icon" title="Detective Magnifying Glass">
          <Search size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main, #0f172a)' }}>
            Investigation Workspace
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Select verified case clues and evidence. No multiple choice — solve like a detective.
          </p>
        </div>
      </div>

      {stickyNote && (
        <div className="ed-sticky-note">
          <StickyNote size={20} color="#854d0e" style={{ flexShrink: 0 }} />
          <div>{stickyNote}</div>
        </div>
      )}

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 800, margin: '0 0 14px', color: 'var(--text-main, #0f172a)' }}>
          <FileSearch size={18} color="#7b9f27" /> Gathered Case Evidence
        </div>

        <div className="ed-evidence-grid">
          {evidences.map((item) => (
            <EvidenceCard
              key={item.id}
              evidence={item}
              selected={selectedIds.includes(item.id)}
              onToggle={onToggleEvidence}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
