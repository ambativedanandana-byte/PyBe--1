import React from 'react';

export default function StoryProgress({
  currentPanel = 0,
  totalPanels = 4,
  onSelectPanel
}) {
  const progressPercentage = Math.round(((currentPanel + 1) / totalPanels) * 100);

  return (
    <div className="ed-story-progress-container" aria-label={`Story Progress: Panel ${currentPanel + 1} of ${totalPanels}`}>
      <div className="ed-story-progress-bar-bg">
        <div
          className="ed-story-progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="ed-story-progress-dots">
        {Array.from({ length: totalPanels }).map((_, index) => (
          <button
            key={index}
            className={`ed-progress-dot ${index === currentPanel ? 'active' : index < currentPanel ? 'completed' : ''}`}
            onClick={() => onSelectPanel && onSelectPanel(index)}
            aria-label={`Go to panel ${index + 1}`}
            title={`Panel ${index + 1}`}
          />
        ))}
      </div>

      <span className="ed-panel-counter-text">
        Panel {currentPanel + 1} of {totalPanels}
      </span>
    </div>
  );
}
