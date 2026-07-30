import { MASTER_CASES, getCaseById } from './masterCases';

export const INVESTIGATION_DATA = Object.keys(MASTER_CASES).reduce((acc, key) => {
  const c = MASTER_CASES[key];
  acc[key] = {
    caseId: c.caseId,
    title: c.title,
    evidence: c.investigation?.evidence || [],
    timeline: c.investigation?.timeline || [],
    observations: c.investigation?.observations || [],
    patterns: c.investigation?.patterns || [],
    reflections: c.investigation?.reflections || []
  };
  return acc;
}, {});

export function getInvestigationData(caseId) {
  const c = getCaseById(caseId);
  return INVESTIGATION_DATA[c.caseId] || INVESTIGATION_DATA.case1;
}
