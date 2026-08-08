import React from 'react';
import {
  ChevronLeft,
  Clock,
  BarChart3,
  Search,
  FileText,
} from 'lucide-react';
import { getIllustration } from '../data/illustrations';

const DIFFICULTY_COLORS = {
  Beginner: { bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: 'rgba(16, 185, 129, 0.25)' },
  Explorer: { bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.25)' },
  Builder: { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.25)' },
};

export default function StoryPage({ story, investigationId, levelName, onBack, onStartInvestigation }) {
  if (!story) {
    return (
      <section className="workspace ed-page">
        <header className="hero ed-hero">
          <div>
            <button className="ed-back-btn" onClick={onBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <p>{levelName}</p>
            <h1>Case Not Found</h1>
          </div>
        </header>
        <div className="panel ed-detail-placeholder">
          <h2>Story not available yet</h2>
          <p>This case file is still being prepared. Check back soon.</p>
        </div>
      </section>
    );
  }

  const diff = DIFFICULTY_COLORS[story.difficulty] || DIFFICULTY_COLORS.Beginner;
  const storyParagraphs = story.story.split('\n\n').filter((p) => p.trim());

  return (
    <section className="workspace ed-page sp-page">
      <header className="hero ed-hero sp-hero">
        <div>
          <button className="ed-back-btn" onClick={onBack}>
            <ChevronLeft size={16} /> Back to Investigations
          </button>
          <p>{levelName}</p>
          <h1>Case File</h1>
        </div>
      </header>

      <div className="sp-layout">
        {/* Case Header Card */}
        <div className="panel sp-case-header-card">
          <div className="sp-case-folder-tab">
            <span>CASE FILE</span>
          </div>
          <div className="sp-case-top-row">
            <span className="sp-case-number">Case #{story.caseNumber}</span>
            <span
              className="sp-case-difficulty"
              style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
            >
              {story.difficulty}
            </span>
          </div>
          <h2 className="sp-case-title">{story.title}</h2>
          <div className="sp-case-meta">
            <span className="sp-case-meta-item">
              <BarChart3 size={14} /> Difficulty: {story.difficulty}
            </span>
            <span className="sp-case-meta-item">
              <Clock size={14} /> {story.estimatedTime}
            </span>
          </div>
        </div>

        {/* Large Story Illustration */}
        <div className="panel sp-illustration-card">
          {(() => {
            const Illustration = getIllustration(investigationId);
            return Illustration ? <Illustration /> : null;
          })()}
        </div>

        {/* Story Section Label */}
        <div className="sp-section-label">
          <FileText size={14} />
          <span>Story</span>
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

        {/* Rules Card */}
        <div className="panel sp-rules-card">
          <div className="sp-rules-header">
            <span className="sp-rules-icon">📋</span>
            <h3>Investigation Rules</h3>
          </div>
          <ul className="sp-rules-list">
            {story.rules.map((rule, idx) => (
              <li key={idx} className="sp-rule-item">
                <span className="sp-rule-number">{idx + 1}</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
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
