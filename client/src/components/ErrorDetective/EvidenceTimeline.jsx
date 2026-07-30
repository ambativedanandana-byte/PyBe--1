import React from 'react';
import { ArrowUp, ArrowDown, Clock, Move } from 'lucide-react';

const STAGE_LABELS = ['Beginning', 'Middle', 'End'];

export default function EvidenceTimeline({
  timelineItems = [],
  onReorder
}) {
  const handleMoveUp = (index) => {
    if (index > 0) {
      const updated = [...timelineItems];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      if (onReorder) onReorder(updated);
    }
  };

  const handleMoveDown = (index) => {
    if (index < timelineItems.length - 1) {
      const updated = [...timelineItems];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      if (onReorder) onReorder(updated);
    }
  };

  return (
    <section className="ed-timeline-card">
      <div className="ed-timeline-header">
        <div className="ed-timeline-icon">
          <Clock size={20} color="#7b9f27" />
        </div>
        <div>
          <h3>Evidence Timeline</h3>
          <p>Arrange case events in chronological order (Beginning → Middle → End).</p>
        </div>
      </div>

      <div className="ed-timeline-list">
        {timelineItems.map((item, idx) => (
          <div key={item.id || idx} className="ed-timeline-item">
            <div className="ed-timeline-stage-pill">
              {STAGE_LABELS[idx] || `Step ${idx + 1}`}
            </div>

            <div className="ed-timeline-text">
              {item.text}
            </div>

            <div className="ed-timeline-controls">
              <button
                className="ed-timeline-btn"
                onClick={() => handleMoveUp(idx)}
                disabled={idx === 0}
                aria-label={`Move ${item.text} up`}
                title="Move Up"
              >
                <ArrowUp size={15} />
              </button>

              <button
                className="ed-timeline-btn"
                onClick={() => handleMoveDown(idx)}
                disabled={idx === timelineItems.length - 1}
                aria-label={`Move ${item.text} down`}
                title="Move Down"
              >
                <ArrowDown size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
