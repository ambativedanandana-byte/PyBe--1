import React from 'react';
import { BookOpen } from 'lucide-react';

export default function NarrationCard({
  narration = '',
  maxWords = 25
}) {
  const narrationText = typeof narration === 'object' && narration !== null ? (narration.text || '') : String(narration || '');

  if (!narrationText) return null;

  // Enforce max 25 words rule safely
  const formatNarration = (text, limit) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const safeNarration = formatNarration(narrationText, maxWords);

  return (
    <div className="ed-narration-card" aria-label="Scene Narration">
      <div className="ed-narration-card-label">
        <BookOpen size={13} /> SCENE RECORD
      </div>
      <p className="ed-narration-card-text">{safeNarration}</p>
    </div>
  );
}
