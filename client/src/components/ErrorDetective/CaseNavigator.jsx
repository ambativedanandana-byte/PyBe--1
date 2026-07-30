import React from 'react';
import { Lock, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { getAllCases } from '../../data/masterCases';

const LEVELS = [
  { id: 'Beginner', title: 'Beginner', subtitle: 'Basic scenarios & syntax' },
  { id: 'Explorer', title: 'Explorer', subtitle: 'Interactive loops & conditions' },
  { id: 'Builder', title: 'Builder', subtitle: 'Complex data structures & logic' }
];

export default function CaseNavigator({
  activeLevel = 'Beginner',
  onSelectLevel,
  lockedLevels = [],
  solvedCaseIds = []
}) {
  const allCases = getAllCases();

  return (
    <div className="ed-navigator-section">
      <div className="ed-section-label">
        <span>🗺️ Select Investigation Level</span>
      </div>

      <div className="ed-navigator-grid">
        {LEVELS.map((lvl) => {
          const isLocked = lockedLevels.includes(lvl.id);
          const isActive = activeLevel === lvl.id;
          const levelCases = allCases.filter((c) => c.difficulty === lvl.id);
          const solvedCount = levelCases.filter((c) => solvedCaseIds.includes(c.caseId)).length;

          return (
            <div
              key={lvl.id}
              className={`ed-case-card ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && onSelectLevel && onSelectLevel(lvl.id)}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              aria-disabled={isLocked}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="ed-comic-case-badge">{lvl.id} Level</span>
                  {isLocked ? (
                    <Lock size={16} color="#94a3b8" />
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: '#7b9f27', fontWeight: 800 }}>
                      {solvedCount}/{levelCases.length} Solved
                    </span>
                  )}
                </div>

                <h3 style={{ margin: '4px 0 6px', fontSize: '1.2rem', fontWeight: 800 }}>
                  {lvl.id} Case Files
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                  {lvl.subtitle}
                </p>

                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {levelCases.map((c) => (
                    <span
                      key={c.caseId}
                      style={{
                        background: 'rgba(123, 159, 39, 0.1)',
                        color: '#7b9f27',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {c.caseNumber}: {c.theme}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span className="ed-btn ed-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Open Cases <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
