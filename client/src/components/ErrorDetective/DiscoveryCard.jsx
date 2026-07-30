import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, Zap, BookOpen } from 'lucide-react';

export default function DiscoveryCard({
  conceptName = 'Logical Error',
  discovery = {},
  onProceed
}) {
  const {
    definition = 'The program runs completely without crashing, but produces an incorrect result because the calculation rule is wrong.',
    realLifeConnection = 'The scale displayed 105 instead of 15.',
    pythonConnection = 'Text strings were concatenated instead of added mathematically.',
    memoryTip = 'Logical errors don\'t crash your code—they just give wrong answers!'
  } = discovery;

  return (
    <section className="ed-discovery-card">
      <div className="ed-discovery-header">
        <div className="ed-sparkle-badge">
          <Sparkles size={24} color="#7b9f27" />
        </div>
        <div>
          <h2>🎉 Great Investigation!</h2>
          <p className="ed-discovery-subtitle">You discovered a programming pattern.</p>
        </div>
      </div>

      {/* Connection Flow Animation */}
      <div className="ed-discovery-flow-pipeline">
        <div className="ed-flow-step">
          <span className="ed-step-num">1</span>
          <span>Real-Life Situation</span>
        </div>
        <div className="ed-flow-arrow">➔</div>
        <div className="ed-flow-step">
          <span className="ed-step-num">2</span>
          <span>Python Code</span>
        </div>
        <div className="ed-flow-arrow">➔</div>
        <div className="ed-flow-step active">
          <span className="ed-step-num">3</span>
          <strong>{conceptName}</strong>
        </div>
      </div>

      {/* Concept Card Banner */}
      <div className="ed-concept-banner">
        <span className="ed-concept-label">Discovered Programming Concept</span>
        <h1 className="ed-concept-title">{conceptName}</h1>
        <p className="ed-concept-def">{definition}</p>
      </div>

      {/* 3-Pillar Breakdown */}
      <div className="ed-discovery-pillars-grid">
        <div className="ed-pillar-card">
          <div className="ed-pillar-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
            📖
          </div>
          <div>
            <strong>Real-Life Connection</strong>
            <p>{realLifeConnection}</p>
          </div>
        </div>

        <div className="ed-pillar-card">
          <div className="ed-pillar-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>
            💻
          </div>
          <div>
            <strong>Python Connection</strong>
            <p>{pythonConnection}</p>
          </div>
        </div>

        <div className="ed-pillar-card memory">
          <div className="ed-pillar-icon" style={{ background: '#f7fee7', color: '#3f6212' }}>
            💡
          </div>
          <div>
            <strong>Memory Tip</strong>
            <p>{memoryTip}</p>
          </div>
        </div>
      </div>

      {onProceed && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="ed-btn ed-btn-primary" onClick={onProceed}>
            Proceed to Bug Fix Lab <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
