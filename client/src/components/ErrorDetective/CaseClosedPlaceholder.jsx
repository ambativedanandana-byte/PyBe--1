import React from 'react';
import { Archive, Award, ArrowRight, CheckCircle2, RotateCcw, Zap } from 'lucide-react';

export default function CaseClosedPlaceholder({
  isVisible = false,
  caseTitle = 'Case #01: Robot Delivery',
  nextCaseTitle = 'Case #02: Toy Car',
  onNextCase,
  onReplayCase
}) {
  if (!isVisible) return null;

  return (
    <section
      className="ed-placeholder-card"
      style={{
        borderColor: '#10b981',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
        opacity: 1,
        borderStyle: 'solid',
        boxShadow: '0 12px 32px rgba(16, 185, 129, 0.15)'
      }}
    >
      <div className="ed-placeholder-header">
        <div className="ed-placeholder-title" style={{ color: '#047857', fontSize: '1.25rem', fontWeight: 800 }}>
          <Archive size={24} /> 📁 Case Closed &amp; Evidence Filed!
        </div>
        <span className="ed-placeholder-badge" style={{ background: '#d1fae5', color: '#047857', fontSize: '0.8rem', fontWeight: 800 }}>
          SOLVED • VERIFIED BY DETECTIVE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '8px 0' }}>
        <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', display: 'grid', placeItems: 'center', fontSize: '1.4rem' }}>
            🏆
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#059669', fontWeight: 800 }}>
              Badge Unlocked
            </span>
            <strong style={{ fontSize: '0.95rem', color: '#064e3b' }}>
              Master Detective
            </strong>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef08a', display: 'grid', placeItems: 'center', color: '#854d0e' }}>
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: '#854d0e', fontWeight: 800 }}>
              XP Reward
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#713f12' }}>
              +50 XP Earned
            </strong>
          </div>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.92rem', color: '#047857', fontWeight: 600 }}>
        Congratulations Detective! You observed the anomaly, analyzed the code, and successfully corrected the system logic for <strong>{caseTitle}</strong>.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 8, paddingTop: 14, borderTop: '1px stroke #a7f3d0' }}>
        {onReplayCase && (
          <button
            className="ed-btn ed-btn-secondary"
            onClick={onReplayCase}
            style={{ fontSize: '0.85rem' }}
          >
            <RotateCcw size={15} /> Replay Case
          </button>
        )}

        {onNextCase && (
          <button
            className="ed-btn ed-btn-primary"
            onClick={onNextCase}
            style={{ background: '#047857', color: '#d1fae5', marginLeft: 'auto' }}
          >
            Next Case: {nextCaseTitle} <ArrowRight size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
