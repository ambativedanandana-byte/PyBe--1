import { MASTER_CASES, getCaseById } from './masterCases';

// Convert MASTER_CASES to COMIC_ENGINE_STORIES format dynamically
export const COMIC_ENGINE_STORIES = Object.keys(MASTER_CASES).reduce((acc, key) => {
  const c = MASTER_CASES[key];
  acc[key] = {
    id: c.caseId,
    level: c.difficulty,
    caseNumber: c.caseNumber,
    title: c.title,
    totalPanels: c.comicPanels?.length || 4,
    panels: (c.comicPanels || []).map(panel => {
      const speechText = typeof panel.speechBubble === 'object' ? (panel.speechBubble?.text || '') : String(panel.speechBubble || '');
      const narrationText = typeof panel.narration === 'object' ? (panel.narration?.text || '') : String(panel.narration || '');

      return {
        panelNumber: panel.panelNumber,
        title: panel.title,
        characterName: panel.characterName,
        character: {
          name: panel.characterName,
          emotion: panel.emotion || 'neutral'
        },
        speechBubble: speechText,
        narration: narrationText,
        narrationCard: narrationText ? { text: narrationText } : null,
        emotion: panel.emotion || 'cheerful',
        background: panel.background || c.theme?.toLowerCase() || 'warehouse',
        visual: {
          theme: c.theme?.toLowerCase() || 'default',
          background: panel.background || c.theme?.toLowerCase() || 'default'
        }
      };
    })
  };
  return acc;
}, {});

export function getComicEngineStory(caseId) {
  const caseObj = getCaseById(caseId);
  return COMIC_ENGINE_STORIES[caseObj.caseId] || COMIC_ENGINE_STORIES.case1;
}

export function getComicStory(caseId) {
  return getComicEngineStory(caseId);
}
