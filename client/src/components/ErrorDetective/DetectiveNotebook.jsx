import React, { useState, useEffect, useMemo } from 'react';
import InvestigationBoard from './InvestigationBoard';
import EvidenceTimeline from './EvidenceTimeline';
import ObservationNotebook from './ObservationNotebook';
import PatternDiscovery from './PatternDiscovery';
import ReflectionCard from './ReflectionCard';
import InvestigationSummary from './InvestigationSummary';
import { getInvestigationData } from '../../data/investigationData';

export default function DetectiveNotebook({
  caseId = 'case1',
  onCompleteInvestigation
}) {
  const caseData = useMemo(() => getInvestigationData(caseId), [caseId]);

  // Section 1: Selected Evidence IDs
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState(['ev-1', 'ev-3']);

  // Section 2: Reorderable Timeline
  const [timelineItems, setTimelineItems] = useState(caseData.timeline || []);

  // Section 3: Selected Notebook Observation
  const [selectedObservation, setSelectedObservation] = useState('The result was different.');

  // Section 4: Selected Pattern ID
  const [selectedPatternId, setSelectedPatternId] = useState('pat-3');

  // Section 5: Selected Reflection
  const [selectedReflection, setSelectedReflection] = useState(
    caseData.reflections?.[0] || 'The calculation rule applied the wrong formula.'
  );

  // Sync state when caseId changes
  useEffect(() => {
    const data = getInvestigationData(caseId);
    setSelectedEvidenceIds(data.evidence?.map((e) => e.id).slice(0, 2) || []);
    setTimelineItems(data.timeline || []);
    setSelectedObservation(data.observations?.[3] || data.observations?.[0] || '');
    setSelectedPatternId(data.patterns?.[2]?.id || data.patterns?.[0]?.id || '');
    setSelectedReflection(data.reflections?.[0] || '');
  }, [caseId]);

  const toggleEvidence = (id) => {
    setSelectedEvidenceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Derived selected evidence objects
  const selectedEvidenceObjs = useMemo(() => {
    return (caseData.evidence || []).filter((e) => selectedEvidenceIds.includes(e.id));
  }, [caseData.evidence, selectedEvidenceIds]);

  // Derived selected pattern object
  const selectedPatternObj = useMemo(() => {
    return (caseData.patterns || []).find((p) => p.id === selectedPatternId);
  }, [caseData.patterns, selectedPatternId]);

  return (
    <div className="ed-detective-notebook-container">
      {/* SECTION 1: Investigation Board */}
      <InvestigationBoard
        evidenceList={caseData.evidence || []}
        selectedIds={selectedEvidenceIds}
        onToggleEvidence={toggleEvidence}
      />

      <div className="ed-notebook-split-grid">
        {/* SECTION 2: Evidence Timeline */}
        <EvidenceTimeline
          timelineItems={timelineItems}
          onReorder={setTimelineItems}
        />

        {/* SECTION 3: Observation Notebook */}
        <ObservationNotebook
          observations={caseData.observations}
          selectedObservation={selectedObservation}
          onSelectObservation={setSelectedObservation}
        />
      </div>

      <div className="ed-notebook-split-grid">
        {/* SECTION 4: Pattern Discovery */}
        <PatternDiscovery
          patterns={caseData.patterns}
          selectedPatternId={selectedPatternId}
          onSelectPattern={setSelectedPatternId}
        />

        {/* SECTION 5: Reflection */}
        <ReflectionCard
          reflections={caseData.reflections}
          selectedReflection={selectedReflection}
          onSelectReflection={setSelectedReflection}
        />
      </div>

      {/* SECTION 6: Investigation Summary */}
      <InvestigationSummary
        caseTitle={caseData.title}
        timelineItems={timelineItems}
        selectedEvidence={selectedEvidenceObjs}
        observation={selectedObservation}
        patternTitle={selectedPatternObj?.title}
        reflection={selectedReflection}
        onContinue={onCompleteInvestigation}
      />
    </div>
  );
}
