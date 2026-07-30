import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function NextButton({ onClick, isLast }) {
  return (
    <button
      className="ed-btn ed-btn-primary ed-next-btn"
      onClick={onClick}
      aria-label={isLast ? 'Examine Evidence' : 'Next Comic Panel'}
    >
      {isLast ? 'Examine Evidence' : 'Next Panel'} <ChevronRight size={18} />
    </button>
  );
}
