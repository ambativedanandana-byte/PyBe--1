import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, Code2, Bug, Lightbulb, BookOpen } from 'lucide-react';
import StoryPage from './StoryPage';
import InvestigationRoom from './InvestigationRoom';
import BugAnalysisPage from './BugAnalysisPage';
import FixCodePage from './FixCodePage';
import CaseClosedPage from './CaseClosedPage';
import { getStory } from '../data/stories';
import { getInvestigation } from '../data/investigations';

const LEVELS = [
  {
    id: 'beginner',
    name: 'Beginner Detective',
    description: 'Recognizing common programming errors.',
    difficulty: 'Beginner',
    categories: {
      Syntax: [
        { id: 'b-syn-1', title: 'Missing Colon (:)' },
        { id: 'b-syn-2', title: 'Indentation Error' },
        { id: 'b-syn-3', title: 'Missing Parentheses' },
        { id: 'b-syn-4', title: 'Unmatched Quotes' },
        { id: 'b-syn-5', title: 'Misspelled Keywords' },
        { id: 'b-syn-6', title: 'Missing Comma' },
        { id: 'b-syn-7', title: 'Missing Closing Bracket' },
      ],
      Runtime: [
        { id: 'b-run-1', title: 'NameError' },
        { id: 'b-run-2', title: 'ZeroDivisionError' },
        { id: 'b-run-3', title: 'TypeError' },
        { id: 'b-run-4', title: 'ValueError' },
      ],
      Logical: [
        { id: 'b-log-1', title: 'Wrong Arithmetic Formula' },
        { id: 'b-log-2', title: 'Wrong Comparison Operator' },
        { id: 'b-log-3', title: 'Wrong Variable Used' },
        { id: 'b-log-4', title: 'Incorrect Condition' },
      ],
    },
  },
  {
    id: 'explorer',
    name: 'Explorer Detective',
    description: 'Understanding why errors happen.',
    difficulty: 'Explorer',
    categories: {
      Syntax: [
        { id: 'e-syn-1', title: 'Nested Indentation Mistakes' },
        { id: 'e-syn-2', title: 'Incorrect Function Definition' },
        { id: 'e-syn-3', title: 'Missing Brackets in Collections' },
        { id: 'e-syn-4', title: 'Invalid Assignment' },
      ],
      Runtime: [
        { id: 'e-run-1', title: 'IndexError' },
        { id: 'e-run-2', title: 'KeyError' },
        { id: 'e-run-3', title: 'AttributeError' },
        { id: 'e-run-4', title: 'FileNotFoundError' },
        { id: 'e-run-5', title: 'ModuleNotFoundError' },
        { id: 'e-run-6', title: 'ImportError' },
      ],
      Logical: [
        { id: 'e-log-1', title: 'Off-by-One Loop Error' },
        { id: 'e-log-2', title: 'Infinite Loop' },
        { id: 'e-log-3', title: 'Wrong Loop Boundary' },
        { id: 'e-log-4', title: 'Incorrect Boolean Logic' },
        { id: 'e-log-5', title: 'Wrong Sequence of Operations' },
      ],
    },
  },
  {
    id: 'builder',
    name: 'Builder Detective',
    description: 'Real-world debugging.',
    difficulty: 'Builder',
    categories: {
      Syntax: [
        { id: 'bu-syn-1', title: 'Multiple Syntax Mistakes in One Program' },
      ],
      Runtime: [
        { id: 'bu-run-1', title: 'Multiple Exceptions in One Program' },
        { id: 'bu-run-2', title: 'Exception Handling (try/except)' },
        { id: 'bu-run-3', title: 'User Input Causing Crashes' },
      ],
      Logical: [
        { id: 'bu-log-1', title: 'Wrong Algorithm' },
        { id: 'bu-log-2', title: 'Incorrect Search Logic' },
        { id: 'bu-log-3', title: 'Incorrect Validation' },
        { id: 'bu-log-4', title: 'Wrong Sorting Logic' },
        { id: 'bu-log-5', title: 'Wrong Calculations' },
        { id: 'bu-log-6', title: 'Edge-Case Failures' },
      ],
    },
  },
];

function getTotalInvestigations(level) {
  return Object.values(level.categories).reduce((sum, arr) => sum + arr.length, 0);
}

const CATEGORY_META = {
  Syntax: { icon: Code2, color: '#3b82f6', label: 'Syntax Errors' },
  Runtime: { icon: Bug, color: '#f59e0b', label: 'Runtime Errors' },
  Logical: { icon: Lightbulb, color: '#8b5cf6', label: 'Logical Errors' },
};

export default function ErrorDetectivePage() {
  const [view, setView] = useState('levels');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedInvestigation, setSelectedInvestigation] = useState(null);
  const [openCategories, setOpenCategories] = useState({});
  const [analysisData, setAnalysisData] = useState(null);
  const [fixData, setFixData] = useState(null);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setOpenCategories({});
    setView('investigations');
  };

  const handleSelectInvestigation = (investigation) => {
    setSelectedInvestigation(investigation);
    setView('detail');
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedInvestigation(null);
    setOpenCategories({});
    setView('levels');
  };

  const handleBackToInvestigations = () => {
    setSelectedInvestigation(null);
    setView('investigations');
  };

  const handleBackToStory = () => {
    setView('detail');
  };

  const handleStartInvestigation = () => {
    setView('room');
  };

  const handleBackToRoom = () => {
    setView('room');
  };

  const handleContinueToAnalysis = () => {
    setView('analysis');
  };

  const handleBackToAnalysis = () => {
    setView('analysis');
  };

  const handleContinueToFix = (data) => {
    setAnalysisData(data);
    setView('fix');
  };

  const handleFixComplete = (data) => {
    setFixData(data);
    setView('closed');
  };

  const handleCaseClosedComplete = () => {
    setAnalysisData(null);
    setFixData(null);
    setSelectedInvestigation(null);
    setView('investigations');
  };

  const handleCaseClosedBack = () => {
    setFixData(null);
    setView('fix');
  };

  const toggleCategory = (cat) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  if (view === 'detail') {
    const story = getStory(selectedInvestigation.id);
    return (
      <StoryPage
        story={story}
        investigationId={selectedInvestigation.id}
        levelName={selectedLevel.name}
        onBack={handleBackToInvestigations}
        onStartInvestigation={handleStartInvestigation}
      />
    );
  }

  if (view === 'room') {
    const story = getStory(selectedInvestigation.id);
    const investigation = getInvestigation(selectedInvestigation.id);
    return (
      <InvestigationRoom
        investigation={investigation}
        story={story}
        levelName={selectedLevel.name}
        onBack={handleBackToStory}
        onContinue={handleContinueToAnalysis}
      />
    );
  }

  if (view === 'analysis') {
    const story = getStory(selectedInvestigation.id);
    const investigation = getInvestigation(selectedInvestigation.id);
    return (
      <BugAnalysisPage
        investigation={investigation}
        story={story}
        levelName={selectedLevel.name}
        onBack={handleBackToRoom}
        onContinue={handleContinueToFix}
        investigationId={selectedInvestigation.id}
      />
    );
  }

  if (view === 'fix') {
    const story = getStory(selectedInvestigation.id);
    const investigation = getInvestigation(selectedInvestigation.id);
    return (
      <FixCodePage
        investigation={investigation}
        story={story}
        levelName={selectedLevel.name}
        analysisData={analysisData}
        onBack={handleBackToAnalysis}
        onContinue={handleFixComplete}
      />
    );
  }

  if (view === 'closed') {
    const story = getStory(selectedInvestigation.id);
    const investigation = getInvestigation(selectedInvestigation.id);
    return (
      <CaseClosedPage
        investigation={investigation}
        story={story}
        levelName={selectedLevel.name}
        analysisData={analysisData}
        fixData={fixData}
        investigationId={selectedInvestigation.id}
        onBack={handleCaseClosedBack}
        onContinue={handleCaseClosedComplete}
      />
    );
  }

  if (view === 'investigations') {
    const total = getTotalInvestigations(selectedLevel);
    return (
      <section className="workspace ed-page">
        <header className="hero ed-hero">
          <div>
            <button className="ed-back-btn" onClick={handleBackToLevels}>
              <ChevronLeft size={16} /> Back to Levels
            </button>
            <p>{selectedLevel.difficulty} Level</p>
            <h1>{selectedLevel.name}</h1>
          </div>
          <div className="hero-stats">
            <span>{total}<small>Investigations</small></span>
          </div>
        </header>

        <div className="ed-investigations-list">
          {Object.entries(selectedLevel.categories).map(([category, investigations]) => {
            const meta = CATEGORY_META[category];
            const Icon = meta.icon;
            const isOpen = openCategories[category];

            return (
              <div key={category} className="ed-category-group">
                <button
                  className={`ed-category-header ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className="ed-category-left">
                    <span className="ed-category-icon" style={{ background: meta.color }}>
                      <Icon size={16} />
                    </span>
                    <span className="ed-category-name">{meta.label}</span>
                    <span className="ed-category-count">{investigations.length}</span>
                  </div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="ed-category-items">
                    {investigations.map((inv) => (
                      <button
                        key={inv.id}
                        className="ed-investigation-item"
                        onClick={() => handleSelectInvestigation(inv)}
                      >
                        <span className="ed-investigation-title">{inv.title}</span>
                        <ChevronRight size={16} className="ed-investigation-arrow" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="workspace ed-page">
      <header className="hero ed-hero">
        <div>
          <p>Structured Learning Path</p>
          <h1>Error Detective</h1>
        </div>
      </header>

      <div className="ed-levels-grid">
        {LEVELS.map((level) => {
          const total = getTotalInvestigations(level);
          return (
            <div key={level.id} className="panel ed-level-card">
              <div className="ed-level-header">
                <span className={`ed-difficulty-badge ed-diff-${level.id}`}>
                  {level.difficulty}
                </span>
              </div>
              <h2 className="ed-level-name">{level.name}</h2>
              <p className="ed-level-desc">{level.description}</p>
              <div className="ed-level-meta">
                <span className="ed-level-investigations">
                  <BookOpen size={14} /> {total} investigations
                </span>
              </div>
              <div className="ed-level-progress">
                <div className="ed-progress-bar">
                  <div className="ed-progress-fill" style={{ width: '0%' }} />
                </div>
                <span className="ed-progress-text">0% complete</span>
              </div>
              <button
                className="primary ed-continue-btn"
                onClick={() => handleSelectLevel(level)}
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
