import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import ComicPanel from './ComicPanel';

export default function ComicContainer({
  story = {},
  caseNumber = 'Case #01',
  onComplete
}) {
  const [currentPanel, setCurrentPanel] = useState(0);

  const panels = story.panels || [
    { speech: "Observe the scenario carefully.", narration: "The detective steps into the investigation room to inspect the case details.", pose: 'happy' }
  ];
  const imagePanels = story.imagePanels || [];

  const totalPanels = panels.length;
  const isFirst = currentPanel === 0;
  const isLast = currentPanel === totalPanels - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentPanel((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentPanel((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    setCurrentPanel(0);
  };

  return (
    <div className="ed-comic-container">
      <div className="ed-comic-header">
        <div className="ed-comic-title-wrap">
          <span className="ed-comic-case-num">{caseNumber}</span>
          <h2>{story.title || 'Detective Scenario Investigation'}</h2>
        </div>

        <div className="ed-comic-progress-pill">
          Panel {currentPanel + 1} of {totalPanels}
        </div>
      </div>

      <div className="ed-comic-panel-view">
        <ComicPanel
          panelData={panels[currentPanel] || {}}
          imageSrc={imagePanels[currentPanel]}
          panelIndex={currentPanel}
          totalPanels={totalPanels}
        />
      </div>

      <div className="ed-comic-controls">
        <button
          className="ed-btn ed-btn-secondary"
          onClick={handleReplay}
          title="Replay Story"
        >
          <RotateCcw size={16} /> Replay Story
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="ed-btn ed-btn-secondary"
            onClick={handlePrev}
            disabled={isFirst}
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <button
            className="ed-btn ed-btn-primary"
            onClick={handleNext}
          >
            {isLast ? 'Examine Evidence →' : 'Next Panel'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
