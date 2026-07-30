import React, { useState, useEffect, useRef } from 'react';
import ComicHeader from './ComicHeader';
import ComicPanel from './ComicPanel';
import ReplayButton from './ReplayButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import { getComicEngineStory } from '../../data/comicEngineStories';

export default function ComicViewer({
  story,
  caseId,
  onComplete
}) {
  // Load story from prop or JSON data module dynamically
  const activeStory = story || getComicEngineStory(caseId || 'case1');
  const panels = activeStory.panels || [];
  const totalPanels = panels.length || 4;

  const [currentPanel, setCurrentPanel] = useState(0);

  // Reset panel index when active story changes
  useEffect(() => {
    setCurrentPanel(0);
  }, [activeStory.id, caseId]);

  // Touch Swipe Support for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance && currentPanel < totalPanels - 1) {
      // Swiped Left → Next Panel
      setCurrentPanel((prev) => prev + 1);
    } else if (distance < -minSwipeDistance && currentPanel > 0) {
      // Swiped Right → Previous Panel
      setCurrentPanel((prev) => prev - 1);
    }
  };

  // Keyboard Navigation Support (ArrowLeft, ArrowRight, R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentPanel > 0) {
        setCurrentPanel((prev) => prev - 1);
      } else if (e.key === 'ArrowRight') {
        if (currentPanel < totalPanels - 1) {
          setCurrentPanel((prev) => prev + 1);
        } else if (onComplete) {
          onComplete();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        setCurrentPanel(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPanel, totalPanels, onComplete]);

  const handleNext = () => {
    if (currentPanel < totalPanels - 1) {
      setCurrentPanel((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPanel > 0) {
      setCurrentPanel((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    setCurrentPanel(0);
  };

  const currentPanelData = panels[currentPanel] || {};

  return (
    <div
      className="ed-comic-viewer-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Comic Story Engine Viewer"
    >
      <ComicHeader
        caseNumber={activeStory.caseNumber || 'Case #01'}
        title={activeStory.title || 'Scenario Story'}
        level={activeStory.level || 'Beginner'}
        currentPanel={currentPanel}
        totalPanels={totalPanels}
        onSelectPanel={(index) => setCurrentPanel(index)}
      />

      <div className="ed-comic-viewer-panel-wrapper">
        <ComicPanel
          panelData={currentPanelData}
          panelIndex={currentPanel}
          totalPanels={totalPanels}
        />
      </div>

      <div className="ed-comic-viewer-controls">
        <ReplayButton onClick={handleReplay} />

        <div className="ed-nav-buttons-group">
          <PreviousButton onClick={handlePrev} disabled={currentPanel === 0} />
          <NextButton onClick={handleNext} isLast={currentPanel === totalPanels - 1} />
        </div>
      </div>
    </div>
  );
}
