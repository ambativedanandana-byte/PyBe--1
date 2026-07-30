import React from 'react';
import { Terminal } from 'lucide-react';

export default function PythonCodeViewer({
  code = '',
  highlightLine = null,
  fileName = 'investigation_target.py',
  isEditable = false,
  onChangeCode
}) {
  const lines = code.split('\n');

  return (
    <div className="ed-code-viewer-container">
      <div className="ed-code-viewer-header">
        <span className="ed-code-file-name">
          <Terminal size={14} /> {fileName}
        </span>
        <span className="ed-code-mode-badge">
          {isEditable ? '✏️ Editable Code (Max 6 Lines)' : '🔍 Python Inspector'}
        </span>
      </div>

      {isEditable ? (
        <textarea
          value={code}
          onChange={(e) => onChangeCode && onChangeCode(e.target.value)}
          spellCheck={false}
          className="ed-code-textarea"
          rows={Math.max(lines.length, 5)}
        />
      ) : (
        <div className="ed-code-lines-wrapper">
          {lines.map((lineText, idx) => {
            const lineNumber = idx + 1;
            const isHighlighted = highlightLine === lineNumber;
            return (
              <div
                key={idx}
                className={`ed-code-line ${isHighlighted ? 'highlighted' : ''}`}
              >
                <span className="ed-line-num">{lineNumber}</span>
                <span className="ed-line-content">{lineText}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
