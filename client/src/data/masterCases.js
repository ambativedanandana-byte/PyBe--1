import masterData from './masterCases.json';

export const MASTER_CASES = masterData;

export function getAllCases() {
  return Object.values(masterData);
}

export function getCaseById(caseId) {
  if (!caseId) return masterData.case1;
  const key = String(caseId).toLowerCase().replace(/[^a-z0-9]/g, '');
  return masterData[key] || masterData[caseId] || masterData.case1;
}

export function getCasesByLevel(level) {
  const all = getAllCases();
  if (!level) return all;
  return all.filter(c => c.difficulty.toLowerCase() === level.toLowerCase());
}
