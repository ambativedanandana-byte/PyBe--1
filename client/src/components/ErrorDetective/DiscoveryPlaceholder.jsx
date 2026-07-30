import React from 'react';
import { Eye, Sparkles } from 'lucide-react';

export default function DiscoveryPlaceholder({
  isVisible = false
}) {
  if (!isVisible) return null;

  return (
    <section className="ed-placeholder-card" style={{ borderColor: '#f59e0b' }}>
      <div className="ed-placeholder-header">
        <div className="ed-placeholder-title" style={{ color: '#d97706' }}>
          <Eye size={20} /> Discovery Placeholder
        </div>
        <span className="ed-placeholder-badge" style={{ background: '#fef3c7', color: '#b45309' }}>
          Reserved Card • Hidden Initially
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
        Reserved area for detective discovery revelation. No business logic implemented.
      </p>
    </section>
  );
}
