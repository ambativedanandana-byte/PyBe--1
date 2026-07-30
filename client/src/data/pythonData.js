import { MASTER_CASES, getCaseById } from './masterCases';

export const PYTHON_DATA = Object.keys(MASTER_CASES).reduce((acc, key) => {
  const c = MASTER_CASES[key];
  acc[key] = {
    caseId: c.caseId,
    caseName: `${c.caseNumber}: ${c.title}`,
    conceptName: c.learningSummary?.conceptName || 'Logical Error',
    codeSnippet: c.pythonCode?.codeSnippet || '',
    highlightLine: c.pythonCode?.highlightLine || 1,
    buggyCode: c.pythonCode?.buggyCode || '',
    fixedCode: c.pythonCode?.fixedCode || '',
    beforeOutput: c.pythonCode?.beforeOutput || '',
    expectedOutput: c.pythonCode?.expectedOutput || '',
    storyComparison: c.pythonCode?.storyComparison || {},
    discovery: {
      title: c.learningSummary?.conceptName || 'Logical Error',
      definition: c.learningSummary?.definition || '',
      realLifeConnection: c.learningSummary?.realLifeConnection || '',
      pythonConnection: c.learningSummary?.pythonConnection || '',
      memoryTip: c.learningSummary?.memoryTip || ''
    },
    hint: c.hint || '',
    solution: c.bugFix?.solution || '',
    summarySentence: c.learningSummary?.summarySentence || ''
  };
  return acc;
}, {});

export function getPythonCaseData(caseId) {
  const c = getCaseById(caseId);
  return PYTHON_DATA[c.caseId] || PYTHON_DATA.case1;
}
