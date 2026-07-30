import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  Clock,
  HelpCircle,
  FileText,
  Code,
  Wrench,
  Trophy
} from 'lucide-react';
import CaseNavigator from './CaseNavigator';
import ComicViewer from './ComicViewer';
import InvestigationBoard from './InvestigationBoard';
import EvidenceTimeline from './EvidenceTimeline';
import ObservationNotebook from './ObservationNotebook';
import PatternDiscovery from './PatternDiscovery';
import ReflectionCard from './ReflectionCard';
import InvestigationSummary from './InvestigationSummary';
import PythonConnection from './PythonConnection';
import DiscoveryCard from './DiscoveryCard';
import BugFixLab from './BugFixLab';
import CaseClosed from './CaseClosed';

import { getAllCases, getCaseById } from '../../data/masterCases';
import { getComicEngineStory } from '../../data/comicEngineStories';
import { getInvestigationData } from '../../data/investigationData';
import { getPythonCaseData } from '../../data/pythonData';

const STEPS = [
  { id: 1, key: 'case-select', title: 'Case Index', icon: Search },
  { id: 2, key: 'comic-story', title: 'Comic Story', icon: BookOpen },
  { id: 3, key: 'investigation-board', title: 'Evidence Board', icon: Search },
  { id: 4, key: 'evidence-timeline', title: 'Timeline', icon: Clock },
  { id: 5, key: 'investigation-notebook', title: 'Notebook', icon: BookOpen },
  { id: 6, key: 'pattern-discovery', title: 'Pattern Discovery', icon: Sparkles },
  { id: 7, key: 'reflection', title: 'Reflection', icon: HelpCircle },
  { id: 8, key: 'investigation-report', title: 'Report', icon: FileText },
  { id: 9, key: 'python-connection', title: 'Python Connection', icon: Code },
  { id: 10, key: 'bug-fix-lab', title: 'Bug Fix Lab', icon: Wrench },
  { id: 11, key: 'case-closed', title: 'Case Closed', icon: Trophy }
];

export default function InvestigationWizard({
  selectedLevel = 'Beginner',
  setSelectedLevel,
  solvedCaseIds = [],
  setSolvedIds,
  onReturnHome
}) {
  const allCases = useMemo(() => getAllCases(), []);

  // Current active step state (0 to 10)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Active selected case ID
  const [selectedCaseId, setSelectedCaseId] = useState('case1');

  // Investigation state for active case
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [orderedTimeline, setOrderedTimeline] = useState([]);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const [labSolved, setLabSolved] = useState(false);

  // Derive dynamic case data
  const currentCase = useMemo(() => getCaseById(selectedCaseId), [selectedCaseId]);
  const comicStory = useMemo(() => getComicEngineStory(selectedCaseId), [selectedCaseId]);
  const invData = useMemo(() => getInvestigationData(selectedCaseId), [selectedCaseId]);
  const pyData = useMemo(() => getPythonCaseData(selectedCaseId), [selectedCaseId]);

  // Reset case-level state when case changes
  useEffect(() => {
    if (invData) {
      setSelectedEvidence([]);
      setOrderedTimeline(invData.timeline || []);
      setSelectedObservation(null);
      setSelectedPattern(null);
      setSelectedReflection(null);
      setLabSolved(false);
    }
  }, [selectedCaseId, invData]);

  // Navigation handlers
  const handleSelectCase = (caseId) => {
    setSelectedCaseId(caseId);
    const caseObj = getCaseById(caseId);
    if (setSelectedLevel) setSelectedLevel(caseObj.difficulty);
    setCurrentStepIndex(1); // Jump to Step 2 (Comic Story Carousel)
  };

  const handleNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Move to Next Case
  const handleNextCase = () => {
    const caseIds = allCases.map((c) => c.caseId);
    const currIdx = caseIds.indexOf(selectedCaseId);
    const nextIdx = (currIdx + 1) % caseIds.length;
    const nextCaseId = caseIds[nextIdx];

    if (setSolvedIds && !solvedCaseIds.includes(selectedCaseId)) {
      setSolvedIds([...solvedCaseIds, selectedCaseId]);
    }

    setSelectedCaseId(nextCaseId);
    const nextCase = getCaseById(nextCaseId);
    if (setSelectedLevel) setSelectedLevel(nextCase.difficulty);
    setCurrentStepIndex(1); // Jump to Step 2 (Comic Story Carousel)
  };

  const activeStep = STEPS[currentStepIndex];
  const progressPct = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  // Verification whether "Continue" button is enabled for current step
  const isContinueEnabled = useMemo(() => {
    switch (activeStep.key) {
      case 'case-select':
        return true;
      case 'comic-story':
        return true;
      case 'investigation-board':
        return selectedEvidence.length > 0;
      case 'evidence-timeline':
        return orderedTimeline.length > 0;
      case 'investigation-notebook':
        return selectedObservation !== null;
      case 'pattern-discovery':
        return selectedPattern !== null;
      case 'reflection':
        return selectedReflection !== null;
      case 'investigation-report':
        return true;
      case 'python-connection':
        return true;
      case 'bug-fix-lab':
        return labSolved;
      case 'case-closed':
        return true;
      default:
        return true;
    }
  }, [activeStep.key, selectedEvidence, orderedTimeline, selectedObservation, selectedPattern, selectedReflection, labSolved]);

  return (
    <div className="ed-wizard-wrapper">
      {/* ── 1. Sticky Glassmorphism Top Progress Header ── */}
      <header className="ed-wizard-sticky-header">
        <div className="ed-wizard-header-left">
          <button
            className="ed-btn ed-btn-glass"
            onClick={() => setCurrentStepIndex(0)}
          >
            📋 Case Index
          </button>

          <div className="ed-case-status-badge">
            <span className="ed-status-tag">{currentCase.caseNumber}</span>
            <span className="ed-status-name">{currentCase.title}</span>
            <span className="ed-theme-chip">{currentCase.theme}</span>
          </div>
        </div>

        {/* Step Indicator Carousel Dots */}
        <nav className="ed-step-indicator-bar" aria-label="Investigation Steps">
          {STEPS.map((st, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={st.id}
                className={`ed-indicator-dot ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => idx <= currentStepIndex && setCurrentStepIndex(idx)}
                disabled={idx > currentStepIndex}
                title={`Step ${st.id}: ${st.title}`}
              >
                {isCompleted ? <CheckCircle2 size={12} /> : st.id}
              </button>
            );
          })}
        </nav>

        <div className="ed-wizard-header-right">
          <div className="ed-progress-meta">
            <span className="ed-progress-text">
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
            <div className="ed-progress-track">
              <div className="ed-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Centered Viewport Card Container (Max 1200px / 1400px) ── */}
      <main className="ed-wizard-viewport-container">
        {/* STEP 1: Case Selection */}
        {activeStep.key === 'case-select' && (
          <div className="ed-wizard-card animate-fade-in">
            <CaseNavigator
              activeLevel={selectedLevel}
              onSelectLevel={(lvl) => {
                if (setSelectedLevel) setSelectedLevel(lvl);
              }}
              solvedCaseIds={solvedCaseIds}
            />

            <div style={{ marginTop: 20 }}>
              <div className="ed-step-header">
                <span className="ed-step-badge">Step 1 • Investigation Target</span>
                <h2 className="ed-step-title">Select Active Detective Case</h2>
                <p className="ed-step-subtitle">Choose a scenario to investigate real-world evidence and code bugs.</p>
              </div>

              <div className="ed-case-picker-grid" style={{ marginTop: 16 }}>
                {allCases.map((cs) => {
                  const isSelected = cs.caseId === selectedCaseId;
                  const isSolved = solvedCaseIds.includes(cs.caseId);
                  return (
                    <div
                      key={cs.caseId}
                      className={`ed-case-picker-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectCase(cs.caseId)}
                      role="button"
                      tabIndex={0}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="ed-comic-case-badge">{cs.caseNumber}</span>
                        {isSolved && <CheckCircle2 size={16} color="#7b9f27" />}
                      </div>
                      <h4 style={{ margin: '10px 0 4px', fontSize: '1.1rem', fontWeight: 800 }}>{cs.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                        Theme: <strong>{cs.theme}</strong> • {cs.difficulty}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Comic Story (1 Panel at a time Carousel) */}
        {activeStep.key === 'comic-story' && (
          <div className="ed-wizard-card animate-fade-in">
            <ComicViewer
              story={comicStory}
              onComplete={handleNextStep}
            />
          </div>
        )}

        {/* STEP 3: Investigation Board */}
        {activeStep.key === 'investigation-board' && (
          <div className="ed-wizard-card animate-fade-in">
            <InvestigationBoard
              evidence={invData.evidence}
              selectedEvidence={selectedEvidence}
              onToggleEvidence={(evId) => {
                setSelectedEvidence((prev) =>
                  prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
                );
              }}
            />
          </div>
        )}

        {/* STEP 4: Evidence Timeline */}
        {activeStep.key === 'evidence-timeline' && (
          <div className="ed-wizard-card animate-fade-in">
            <EvidenceTimeline
              timeline={orderedTimeline}
              onReorderTimeline={setOrderedTimeline}
            />
          </div>
        )}

        {/* STEP 5: Investigation Notebook */}
        {activeStep.key === 'investigation-notebook' && (
          <div className="ed-wizard-card animate-fade-in">
            <ObservationNotebook
              observations={invData.observations}
              selectedObservation={selectedObservation}
              onSelectObservation={setSelectedObservation}
            />
          </div>
        )}

        {/* STEP 6: Pattern Discovery */}
        {activeStep.key === 'pattern-discovery' && (
          <div className="ed-wizard-card animate-fade-in">
            <PatternDiscovery
              patterns={invData.patterns}
              selectedPattern={selectedPattern}
              onSelectPattern={setSelectedPattern}
            />
          </div>
        )}

        {/* STEP 7: Reflection */}
        {activeStep.key === 'reflection' && (
          <div className="ed-wizard-card animate-fade-in">
            <ReflectionCard
              reflections={invData.reflections}
              selectedReflection={selectedReflection}
              onSelectReflection={setSelectedReflection}
            />
          </div>
        )}

        {/* STEP 8: Investigation Report */}
        {activeStep.key === 'investigation-report' && (
          <div className="ed-wizard-card animate-fade-in">
            <InvestigationSummary
              evidenceCount={selectedEvidence.length}
              observation={selectedObservation ? invData.observations[selectedObservation] : null}
              pattern={selectedPattern !== null ? invData.patterns[selectedPattern] : null}
              reflection={selectedReflection !== null ? invData.reflections[selectedReflection] : null}
              onContinue={handleNextStep}
            />
          </div>
        )}

        {/* STEP 9: Python Connection & Discovery */}
        {activeStep.key === 'python-connection' && (
          <div className="ed-wizard-card animate-fade-in" style={{ gap: 24 }}>
            <PythonConnection
              storyText={pyData.storyComparison?.storyText}
              pythonText={pyData.storyComparison?.pythonText}
              codeSnippet={pyData.codeSnippet}
              highlightLine={pyData.highlightLine}
            />

            <DiscoveryCard discovery={pyData.discovery} />
          </div>
        )}

        {/* STEP 10: Bug Fix Lab */}
        {activeStep.key === 'bug-fix-lab' && (
          <div className="ed-wizard-card animate-fade-in">
            <BugFixLab
              buggyCode={pyData.buggyCode}
              fixedCode={pyData.fixedCode}
              expectedOutput={pyData.expectedOutput}
              beforeOutput={pyData.beforeOutput}
              hint={pyData.hint}
              solution={pyData.solution}
              onSolved={() => setLabSolved(true)}
            />
          </div>
        )}

        {/* STEP 11: Case Closed */}
        {activeStep.key === 'case-closed' && (
          <div className="ed-wizard-card animate-fade-in">
            <CaseClosed
              caseName={pyData.caseName}
              conceptName={pyData.conceptName}
              xpEarned={50}
              onNextCase={handleNextCase}
              onReturnHome={onReturnHome}
            />
          </div>
        )}
      </main>

      {/* ── 3. Footer Navigation Bar ── */}
      <footer className="ed-wizard-footer-bar">
        <button
          className="ed-btn ed-btn-ghost"
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
        >
          <ChevronLeft size={18} /> Previous Step
        </button>

        <div className="ed-footer-step-title">
          <span>{activeStep.title}</span>
        </div>

        {currentStepIndex < STEPS.length - 1 ? (
          <button
            className={`ed-btn ed-btn-gradient ${!isContinueEnabled ? 'disabled' : ''}`}
            onClick={handleNextStep}
            disabled={!isContinueEnabled}
          >
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button
            className="ed-btn ed-btn-gradient"
            onClick={handleNextCase}
          >
            Next Case <ChevronRight size={18} />
          </button>
        )}
      </footer>
    </div>
  );
}
