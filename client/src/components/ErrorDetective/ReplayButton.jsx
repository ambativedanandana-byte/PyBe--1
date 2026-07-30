import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ReplayButton({ onClick }) {
  return (
    <button
      className="ed-btn ed-btn-secondary ed-replay-btn"
      onClick={onClick}
      aria-label="Replay Story from beginning"
      title="Replay Story"
    >
      <RotateCcw size={16} /> Replay Story
    </button>
  );
}
