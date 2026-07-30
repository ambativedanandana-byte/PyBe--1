import React, { useState, useEffect, useMemo } from 'react';
import PythonConnection from './PythonConnection';
import DiscoveryCard from './DiscoveryCard';
import BugFixLab from './BugFixLab';
import CaseClosed from './CaseClosed';
import DetectiveJournal from './DetectiveJournal';
import { getPythonCaseData } from '../../data/pythonData';

export default function PythonInvestigationFlow({
  caseId = 'case1',
  onNextCase,
  onReturnHome
}) {
  const pythonCase = useMemo(() => getPythonCaseData(caseId), [caseId]);

  // Step state: 'connection' -> 'discovery' -> 'lab' -> 'closed'
  const [step, setStep] = useState('connection');

  // Journal entries state
  const [journalEntries, setJournalEntries] = useState([
    {
      caseId: pythonCase.caseId,
      caseName: pythonCase.caseName,
      conceptName: pythonCase.conceptName,
      behaviorPattern: 'The work finished but produced the wrong result.',
      summarySentence: pythonCase.summarySentence,
      dateCompleted: new Date().toISOString().split('T')[0]
    }
  ]);

  // Reset step when caseId changes
  useEffect(() => {
    setStep('connection');
  }, [caseId]);

  const handleFixSuccess = () => {
    setStep('closed');

    // Add to Detective Journal if not already added
    const newEntry = {
      caseId: pythonCase.caseId,
      caseName: pythonCase.caseName,
      conceptName: pythonCase.conceptName,
      behaviorPattern: 'The work finished but produced the wrong result.',
      summarySentence: pythonCase.summarySentence,
      dateCompleted: new Date().toISOString().split('T')[0]
    };

    setJournalEntries((prev) => {
      if (prev.some((e) => e.caseId === pythonCase.caseId)) return prev;
      return [newEntry, ...prev];
    });
  };

  return (
    <div className="ed-python-flow-container">
      {/* SECTION 1: Python Connection */}
      <PythonConnection
        storyComparison={pythonCase.storyComparison}
        codeSnippet={pythonCase.codeSnippet}
        highlightLine={pythonCase.highlightLine}
        onProceed={() => setStep('discovery')}
      />

      {/* SECTION 2: Discovery Screen (Reveals concept only after observation) */}
      {(step === 'discovery' || step === 'lab' || step === 'closed') && (
        <div id="discovery-section">
          <DiscoveryCard
            conceptName={pythonCase.conceptName}
            discovery={pythonCase.discovery}
            onProceed={() => setStep('lab')}
          />
        </div>
      )}

      {/* SECTION 3 & 4: Bug Fix Lab & Terminal Output */}
      {(step === 'lab' || step === 'closed') && (
        <div id="bug-fix-lab-section">
          <BugFixLab
            buggyCode={pythonCase.buggyCode}
            expectedOutput={pythonCase.expectedOutput}
            beforeOutput={pythonCase.beforeOutput}
            hint={pythonCase.hint}
            solution={pythonCase.solution}
            onSuccessFix={handleFixSuccess}
          />
        </div>
      )}

      {/* SECTION 5: Case Closed */}
      {step === 'closed' && (
        <div id="case-closed-final-section">
          <CaseClosed
            caseName={pythonCase.caseName}
            conceptName={pythonCase.conceptName}
            xpEarned={50}
            timeTaken="2m 15s"
            onNextCase={onNextCase}
            onReturnHome={onReturnHome}
          />
        </div>
      )}

      {/* SECTION 6: Detective Journal */}
      <DetectiveJournal completedEntries={journalEntries} />
    </div>
  );
}
