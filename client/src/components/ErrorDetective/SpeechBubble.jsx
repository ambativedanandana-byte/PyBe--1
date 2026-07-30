import React from 'react';
import { MessageSquare } from 'lucide-react';

const EMOTION_ICONS = {
  cheerful: '😊',
  happy: '😃',
  focused: '🧐',
  confused: '❓',
  surprised: '😲',
  shocked: '⚡',
  puzzled: '🤔',
  energetic: '🔥',
  startled: '❗',
  diligent: '📋',
  calm: '😌',
  bewildered: '🤯',
  alert: '🚨',
  warm: '🩺',
  careful: '🩺',
  alarmed: '⚠️',
  concerned: '😟',
  confident: '🌟',
  meticulous: '🔍',
  distressed: '📢',
  determined: '🕵️'
};

export default function SpeechBubble({
  characterName = 'Character',
  speech = '',
  emotion = 'cheerful'
}) {
  const speechText = typeof speech === 'object' && speech !== null ? (speech.text || '') : String(speech || '');

  if (!speechText) return null;

  const emotionIcon = EMOTION_ICONS[String(emotion).toLowerCase()] || '💬';

  return (
    <div className="ed-speech-bubble-container" aria-label={`Dialogue from ${characterName}`}>
      <div className="ed-speech-bubble-meta">
        <span className="ed-character-name">
          <MessageSquare size={13} /> {characterName}
        </span>
        <span className="ed-emotion-chip" title={`Emotion: ${emotion}`}>
          {emotionIcon} <small>{String(emotion)}</small>
        </span>
      </div>

      <div className="ed-speech-bubble-tail-wrapper">
        <div className="ed-speech-bubble-body">
          "{speechText}"
        </div>
      </div>
    </div>
  );
}
