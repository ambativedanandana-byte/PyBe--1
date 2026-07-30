import React, { useState } from 'react';
import SpeechBubble from './SpeechBubble';
import NarrationCard from './NarrationCard';
import { Image as ImageIcon } from 'lucide-react';

const SCENE_ILLUSTRATIONS = {
  warehouse: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#0f172a" />
      <rect x="20" y="160" width="360" height="70" fill="#1e293b" rx="8" />
      <rect x="40" y="110" width="60" height="50" fill="#d97706" rx="6" />
      <rect x="110" y="90" width="70" height="70" fill="#b45309" rx="6" />
      <rect x="200" y="120" width="50" height="40" fill="#f59e0b" rx="4" />
      <circle cx="320" cy="140" r="28" fill="#3b82f6" />
      <rect x="305" y="160" width="30" height="40" fill="#1d4ed8" rx="6" />
      <circle cx="320" cy="132" r="10" fill="#93c5fd" />
      <line x1="20" y1="160" x2="380" y2="160" stroke="#7b9f27" strokeWidth="4" />
      <text x="30" y="45" fill="#d8f07c" fontSize="14" fontWeight="bold" fontFamily="sans-serif">📦 ROBOT LOGISTICS BAY</text>
    </svg>
  ),
  racetrack: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#1e293b" />
      <rect x="0" y="140" width="400" height="90" fill="#334155" />
      <line x1="0" y1="185" x2="400" y2="185" stroke="#f59e0b" strokeWidth="4" strokeDasharray="16 12" />
      <rect x="60" y="155" width="65" height="30" fill="#ef4444" rx="8" />
      <circle cx="75" cy="185" r="10" fill="#0f172a" />
      <circle cx="110" cy="185" r="10" fill="#0f172a" />
      <rect x="220" y="150" width="70" height="32" fill="#3b82f6" rx="8" />
      <circle cx="235" cy="182" r="10" fill="#0f172a" />
      <circle cx="275" cy="182" r="10" fill="#0f172a" />
      <rect x="340" y="60" width="10" height="130" fill="#f8fafc" />
      <rect x="330" y="40" width="30" height="25" fill="#ef4444" rx="4" />
      <text x="30" y="45" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🏎️ SPEED CHAMPIONSHIP TRACK</text>
    </svg>
  ),
  classroom: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#064e3b" />
      <rect x="30" y="25" width="340" height="130" fill="#022c22" stroke="#d8f07c" strokeWidth="4" rx="10" />
      <text x="50" y="65" fill="#f8fafc" fontSize="14" fontFamily="monospace">CLASS 4A ATTENDANCE</text>
      <text x="50" y="95" fill="#7b9f27" fontSize="12" fontFamily="monospace">Ananya: 90  |  Rohan: 85</text>
      <rect x="120" y="180" width="160" height="50" fill="#78350f" rx="6" />
      <circle cx="200" cy="165" r="18" fill="#fed7aa" />
      <text x="30" y="230" fill="#a7f3d0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">🏫 ACADEMIC CLASSROOM</text>
    </svg>
  ),
  station: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#1e1b4b" />
      <rect x="0" y="150" width="400" height="80" fill="#312e81" />
      <rect x="30" y="80" width="340" height="70" fill="#4338ca" rx="12" />
      <circle cx="70" cy="115" r="14" fill="#a5b4fc" />
      <circle cx="160" cy="115" r="14" fill="#a5b4fc" />
      <circle cx="250" cy="115" r="14" fill="#a5b4fc" />
      <text x="30" y="45" fill="#c7d2fe" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🚉 CENTRAL RAILWAY PLATFORM</text>
    </svg>
  ),
  train_coach: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#1e293b" />
      <rect x="20" y="40" width="360" height="150" fill="#334155" rx="12" stroke="#64748b" strokeWidth="3" />
      <rect x="40" y="60" width="60" height="70" fill="#0f172a" rx="6" />
      <rect x="120" y="60" width="60" height="70" fill="#0f172a" rx="6" />
      <rect x="220" y="60" width="60" height="70" fill="#0f172a" rx="6" />
      <rect x="300" y="60" width="60" height="70" fill="#0f172a" rx="6" />
      <text x="30" y="225" fill="#cbd5e1" fontSize="12" fontWeight="bold" fontFamily="sans-serif">🚆 PASSENGER COACH INTERIOR</text>
    </svg>
  ),
  clinic: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#f0fdf4" />
      <rect x="30" y="30" width="340" height="130" fill="#ffffff" stroke="#86efac" strokeWidth="3" rx="12" />
      <path d="M190 60 H210 V100 H190 Z M180 75 H220 V90 H180 Z" fill="#ef4444" />
      <rect x="60" y="180" width="280" height="40" fill="#bbf7d0" rx="8" />
      <text x="40" y="210" fill="#166534" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🩺 HEALTH DIAGNOSTICS CENTER</text>
    </svg>
  ),
  factory: (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="ed-scene-svg">
      <rect width="400" height="250" rx="16" fill="#0f172a" />
      <rect x="20" y="140" width="360" height="20" fill="#f59e0b" rx="4" />
      <rect x="50" y="90" width="40" height="50" fill="#38bdf8" rx="4" />
      <rect x="130" y="90" width="40" height="50" fill="#38bdf8" rx="4" />
      <rect x="210" y="90" width="40" height="50" fill="#38bdf8" rx="4" />
      <rect x="290" y="90" width="40" height="50" fill="#ef4444" rx="4" />
      <text x="30" y="45" fill="#fef08a" fontSize="14" fontWeight="bold" fontFamily="sans-serif">⚙️ SMART AUTOMATION FACTORY</text>
    </svg>
  )
};

export default function ComicPanel({
  panelData = {},
  panelIndex = 0,
  totalPanels = 4
}) {
  const [imgError, setImgError] = useState(false);

  const {
    title = `Panel ${panelIndex + 1}`,
    image,
    characterName = 'Character',
    speechBubble = '',
    narration = '',
    emotion = 'cheerful',
    background = 'warehouse'
  } = panelData;

  const sceneSvg = SCENE_ILLUSTRATIONS[background?.toLowerCase()] || SCENE_ILLUSTRATIONS.warehouse;

  return (
    <div className="ed-comic-panel-card" aria-label={`Panel ${panelIndex + 1}: ${title}`}>
      <div className="ed-panel-illustration-area">
        {image && !imgError ? (
          <img
            src={image}
            alt={`Comic Panel Illustration: ${title}`}
            onError={() => setImgError(true)}
            className="ed-panel-img"
          />
        ) : (
          <div className="ed-panel-svg-wrapper">
            {sceneSvg}
          </div>
        )}
      </div>

      <div className="ed-panel-details-area">
        <h3 className="ed-panel-title">{title}</h3>

        <SpeechBubble
          characterName={characterName}
          speech={speechBubble}
          emotion={emotion}
        />

        <NarrationCard narration={narration} maxWords={25} />
      </div>
    </div>
  );
}
