import React from 'react';
import { Wrench, ShieldAlert } from 'lucide-react';

export default function BugFixPlaceholder({
  isVisible = false
}) {
  if (!isVisible) return null;

  return (
    <section className="ed-placeholder-card" style={{ borderColor: '#ec4899' }}>
      <div className="ed-placeholder-header">
        <div className="ed-placeholder-title" style={{ color: '#db2777' }}>
          <Wrench size={20} /> Bug Fix Placeholder
        </div>
        <span className="ed-placeholder-badge" style={{ background: '#fce7f3', color: '#be185d' }}>
          Reserved Card • Hidden Initially
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
        Reserved area for interactive bug repair workspace. No business logic implemented.
      </p>
    </section>
  );
}
