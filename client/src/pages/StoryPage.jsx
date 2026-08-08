import React from 'react';
import {
  ChevronLeft,
  Search,
  FileText,
} from 'lucide-react';
import { getIllustration } from '../data/illustrations';
import NarrationPlayer from '../components/NarrationPlayer';
import CaseHeader from '../components/CaseHeader';
import InvestigationProgress from '../components/InvestigationProgress';

export default function StoryPage({ story, investigationId, levelName, onBack, onStartInvestigation }) {
  if (!story) {
    return (
      <section className="workspace ed-page">
        <CaseHeader
          levelName={levelName}
          backLabel="Back"
          onBack={onBack}
        />
        <div className="panel ed-detail-placeholder">
          <h2>Story not available yet</h2>
          <p>This case file is still being prepared. Check back soon.</p>
        </div>
      </section>
    );
  }

  const storyParagraphs = story.story.split('\n\n').filter((p) => p.trim());

  return (
    <section className="workspace ed-page sp-page">
      <CaseHeader
        levelName={levelName}
        caseNumber={story.caseNumber}
        title={story.title}
        difficulty={story.difficulty}
        duration={story.estimatedTime}
        backLabel="Back to Investigations"
        onBack={onBack}
      />

      <InvestigationProgress currentStep="story" />

      <div className="sp-layout">
        {/* Investigation Illustration */}
        <div className="sp-illustration-card">
          {(() => {
            const Illustration = getIllustration(investigationId);
            return Illustration ? <Illustration /> : null;
          })()}
        </div>

        {/* Story + Narrative row */}
        <div className="sp-story-row">
          <div className="sp-story-label">
            <FileText size={14} />
            <span>Story</span>
          </div>
          <NarrationPlayer text={story.story} />
        </div>

        {/* Story Text */}
        <div className="panel sp-story-card">
          {storyParagraphs.map((paragraph, idx) => (
            <p key={idx} className="sp-story-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Mission Card */}
        <div className="panel sp-mission-card">
          <div className="sp-mission-header">
            <span className="sp-mission-icon">🎯</span>
            <h3>Your Mission</h3>
          </div>
          <p className="sp-mission-text">{story.mission}</p>
        </div>

        {/* Start Button */}
        <div className="sp-story-actions">
          <button className="primary sp-start-btn" onClick={onStartInvestigation}>
            <Search size={16} /> Start Investigation
          </button>
        </div>
      </div>
    </section>
  );
}
