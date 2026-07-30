import React from 'react';
import ComicPanel from './ComicPanel';

export default function ComicGrid({ story }) {
  const panels = story?.panels || [];

  return (
    <div className="ed-comic-grid-container">
      <div className="ed-step-header">
        <span className="ed-step-badge">Step 2 • Scenario Comic</span>
        <h2 className="ed-step-title">{story?.caseNumber || 'Case #01'}: {story?.title || 'Story Scenario'}</h2>
        <p className="ed-step-subtitle">Observe what happens in each panel before investigating.</p>
      </div>

      <div className="ed-comic-4panel-grid">
        {panels.slice(0, 4).map((panel, index) => (
          <div key={index} className="ed-comic-grid-item">
            <div className="ed-panel-number-tag">Panel {index + 1}</div>
            <ComicPanel
              panelData={panel}
              panelIndex={index}
              totalPanels={panels.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
