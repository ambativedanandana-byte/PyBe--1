import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function PreviousButton({ onClick, disabled }) {
  return (
    <button
      className="ed-btn ed-btn-secondary ed-prev-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous Comic Panel"
    >
      <ChevronLeft size={18} /> Previous
    </button>
  );
}
