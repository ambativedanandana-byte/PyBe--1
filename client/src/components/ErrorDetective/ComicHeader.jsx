import React from 'react';
import StoryProgress from './StoryProgress';

export default function ComicHeader({
  caseNumber = 'Case #01',
  title = 'Detective Scenario',
  level = 'Beginner',
  currentPanel = 0,
  totalPanels = 4,
  onSelectPanel
}) {
  return (
    <div className="ed-comic-header-card">
      <div className="ed-comic-header-left">
        <span className="ed-comic-case-badge">{caseNumber} • {level}</span>
        <h2 className="ed-comic-header-title">{title}</h2>
      </div>

      <div className="ed-comic-header-right">
        <StoryProgress
          currentPanel={currentPanel}
          totalPanels={totalPanels}
          onSelectPanel={onSelectPanel}
        />
      </div>
    </div>
  );
}
