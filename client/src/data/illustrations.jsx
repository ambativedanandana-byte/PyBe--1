import React, { useState } from 'react';

/**
 * ComicImage: Shows PNG comic illustration if available,
 * otherwise falls back to the SVG component.
 *
 * panels: array of panel IDs e.g. ['b-syn-1-p1','b-syn-1-p2',...] for 9-panel 3x3 grid.
 * If panels is provided, renders a 3x3 grid. Otherwise single image.
 */
function ComicImage({ id, panels, FallbackSVG, alt }) {
  // Multi-panel 3x3 grid mode
  if (panels && panels.length > 0) {
    const [failedPanels, setFailedPanels] = useState({});

    const handlePanelError = (panelId) => {
      setFailedPanels((prev) => ({ ...prev, [panelId]: true }));
    };

    const allFailed = panels.every((p) => failedPanels[p]);
    if (allFailed) return <FallbackSVG />;

    return (
      <div className="sp-comic-grid">
        {panels.map((panelId, idx) => (
          <div key={panelId} className="sp-comic-cell">
            {!failedPanels[panelId] ? (
              <img
                src={`/illustrations/${panelId}.png`}
                alt={`${alt} panel ${idx + 1}`}
                className="sp-comic-cell-img"
                onError={() => handlePanelError(panelId)}
              />
            ) : (
              <FallbackSVG />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Single image mode
  const [imgError, setImgError] = useState(false);
  const src = `/illustrations/${id}.png`;

  if (!imgError) {
    return (
      <div className="sp-comic-img-wrapper">
        <img
          src={src}
          alt={alt}
          className="sp-comic-img"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }
  return <FallbackSVG />;
}


/* ===== CASE 001 — The Bakery Order ===== */
function BakeryOrderIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#223a32"/>
      <rect x="0" y="280" width="800" height="80" fill="#2a3d36"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Bakery shelves */}
      <rect x="30" y="30" width="200" height="200" rx="4" fill="#1f3029" stroke="#263d37" strokeWidth="1"/>
      <rect x="40" y="50" width="180" height="5" fill="#3a5650"/>
      <ellipse cx="75" cy="44" rx="18" ry="9" fill="#d4a574"/>
      <ellipse cx="130" cy="44" rx="16" ry="8" fill="#c4956a"/>
      <path d="M170 50 Q185 34 200 50Z" fill="#e8c57a"/>
      <rect x="40" y="100" width="180" height="5" fill="#3a5650"/>
      <rect x="55" y="82" width="35" height="18" rx="3" fill="#f4efe2"/>
      <rect x="55" y="82" width="35" height="5" rx="2" fill="#ef4444"/>
      <rect x="110" y="84" width="30" height="16" rx="3" fill="#f4efe2"/>
      <rect x="110" y="84" width="30" height="5" rx="2" fill="#7b9f27"/>
      <rect x="165" y="86" width="40" height="14" rx="3" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
      <rect x="40" y="155" width="180" height="5" fill="#3a5650"/>
      <circle cx="75" cy="148" r="9" fill="#f59e0b"/>
      <rect x="110" y="140" width="25" height="15" rx="3" fill="#d4a574"/>
      <rect x="155" y="141" width="22" height="14" rx="3" fill="#8b5cf6"/>
      {/* Counter */}
      <rect x="280" y="190" width="380" height="90" rx="5" fill="#3d5a4f"/>
      <rect x="280" y="185" width="380" height="10" rx="3" fill="#4a6b5e"/>
      {/* Display case */}
      <rect x="300" y="145" width="130" height="42" rx="4" fill="rgba(255,253,247,0.12)" stroke="rgba(255,253,247,0.2)"/>
      <rect x="310" y="155" width="22" height="14" rx="2" fill="#f4efe2"/>
      <rect x="340" y="157" width="18" height="12" rx="2" fill="#fbbf24"/>
      <rect x="368" y="155" width="22" height="14" rx="2" fill="#ef4444" opacity="0.8"/>
      <rect x="400" y="157" width="16" height="12" rx="2" fill="#7b9f27" opacity="0.7"/>
      {/* Cash register */}
      <rect x="570" y="160" width="45" height="28" rx="3" fill="#374151"/>
      <rect x="575" y="164" width="35" height="10" rx="2" fill="#111916"/>
      <text x="580" y="172" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">$0.00</text>
      {/* Emma behind counter */}
      <g transform="translate(420, 90)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <rect x="4" y="32" width="30" height="42" rx="3" fill="#fffdf7" opacity="0.9"/>
        <text x="9" y="52" fill="#7b9f27" fontSize="5" fontWeight="700" fontFamily="sans-serif">EMMA</text>
        <circle cx="19" cy="16" r="15" fill="#d4a574"/>
        <path d="M4 16 Q4 1 19 1 Q34 1 34 16" fill="#8B4513"/>
        <circle cx="13" cy="16" r="2" fill="#374151"/>
        <circle cx="25" cy="16" r="2" fill="#374151"/>
        <path d="M13 22 Q19 26 25 22" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="38" y1="42" x2="55" y2="32" stroke="#d4a574" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="52" y="27" width="3" height="10" rx="1" fill="#f59e0b" transform="rotate(-20 53 32)"/>
        <rect x="50" y="22" width="20" height="16" rx="2" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
      </g>
      {/* Marco confused */}
      <g transform="translate(340, 100)">
        <rect x="0" y="28" width="36" height="48" rx="5" fill="#3b82f6"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 1 18 1 Q32 1 32 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="9" y1="8" x2="15" y2="10" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="21" y1="10" x2="27" y2="8" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="28" y="6" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="sans-serif">?</text>
        <line x1="4" y1="40" x2="-8" y2="30" stroke="#c4956a" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="32" y1="40" x2="44" y2="30" stroke="#c4956a" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="-12" y="22" width="22" height="16" rx="2" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
        <line x1="-9" y1="27" x2="6" y2="27" stroke="#ef4444" strokeWidth="0.8"/>
        <line x1="-9" y1="31" x2="4" y2="31" stroke="#ef4444" strokeWidth="0.8"/>
        <line x1="-9" y1="35" x2="6" y2="35" stroke="#ef4444" strokeWidth="0.8"/>
        <text x="-11" y="20" fill="#ef4444" fontSize="5" fontWeight="700">ERROR</text>
      </g>
      {/* Customers */}
      <g transform="translate(530, 110)">
        <circle cx="0" cy="14" r="10" fill="#d4a574"/>
        <path d="M-7 12 Q-7 4 0 4 Q7 4 7 12" fill="#8b5cf6"/>
        <rect x="-7" y="24" width="14" height="26" rx="3" fill="#8b5cf6"/>
      </g>
      <g transform="translate(560, 112)">
        <circle cx="0" cy="12" r="9" fill="#c4956a"/>
        <path d="M-6 10 Q-6 3 0 3 Q6 3 6 10" fill="#f59e0b"/>
        <rect x="-6" y="21" width="12" height="24" rx="3" fill="#f59e0b"/>
      </g>
      <g transform="translate(590, 114)">
        <circle cx="0" cy="11" r="8" fill="#b8956a"/>
        <path d="M-5 9 Q-5 2 0 2 Q5 2 5 9" fill="#ef4444"/>
        <rect x="-5" y="19" width="10" height="22" rx="3" fill="#ef4444"/>
      </g>
      {/* Lamp */}
      <rect x="395" y="0" width="2" height="22" fill="#4a6b5e"/>
      <ellipse cx="400" cy="22" rx="22" ry="7" fill="rgba(251,191,36,0.12)"/>
      {/* Window */}
      <rect x="680" y="35" width="75" height="90" rx="3" fill="rgba(129,230,217,0.06)" stroke="#3a5650"/>
      <line x1="717" y1="35" x2="717" y2="125" stroke="#3a5650" strokeWidth="0.5"/>
      <line x1="680" y1="80" x2="755" y2="80" stroke="#3a5650" strokeWidth="0.5"/>
      <rect x="690" y="135" width="55" height="22" rx="3" fill="#7b9f27"/>
      <text x="700" y="150" fill="#fff" fontSize="8" fontWeight="700" fontFamily="sans-serif">OPEN</text>
    </svg>
  );
}

/* ===== CASE 002 — The Library Shelf ===== */
function LibraryShelfIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Tall bookshelves */}
      <rect x="40" y="20" width="160" height="250" rx="4" fill="#1f3029" stroke="#263d37"/>
      <rect x="50" y="35" width="140" height="4" fill="#3a5650"/>
      <rect x="50" y="85" width="140" height="4" fill="#3a5650"/>
      <rect x="50" y="135" width="140" height="4" fill="#3a5650"/>
      <rect x="50" y="185" width="140" height="4" fill="#3a5650"/>
      {/* Books row 1 */}
      <rect x="55" y="15" width="12" height="20" rx="1" fill="#ef4444"/>
      <rect x="70" y="18" width="10" height="17" rx="1" fill="#3b82f6"/>
      <rect x="83" y="16" width="11" height="19" rx="1" fill="#f59e0b"/>
      <rect x="97" y="17" width="13" height="18" rx="1" fill="#8b5cf6"/>
      <rect x="113" y="15" width="10" height="20" rx="1" fill="#10b981"/>
      <rect x="126" y="18" width="12" height="17" rx="1" fill="#ef4444"/>
      <rect x="141" y="16" width="11" height="19" rx="1" fill="#f59e0b"/>
      <rect x="155" y="17" width="14" height="18" rx="1" fill="#3b82f6"/>
      <rect x="172" y="15" width="10" height="20" rx="1" fill="#8b5cf6"/>
      {/* Books row 2 */}
      <rect x="55" y="42" width="14" height="42" rx="1" fill="#7b9f27"/>
      <rect x="72" y="45" width="11" height="39" rx="1" fill="#ef4444"/>
      <rect x="86" y="43" width="13" height="41" rx="1" fill="#f59e0b"/>
      <rect x="102" y="44" width="10" height="40" rx="1" fill="#3b82f6"/>
      <rect x="115" y="42" width="15" height="42" rx="1" fill="#8b5cf6"/>
      <rect x="133" y="45" width="12" height="39" rx="1" fill="#10b981"/>
      <rect x="148" y="43" width="11" height="41" rx="1" fill="#ef4444"/>
      <rect x="162" y="44" width="14" height="40" rx="1" fill="#f59e0b"/>
      {/* Books row 3 */}
      <rect x="55" y="92" width="12" height="42" rx="1" fill="#3b82f6"/>
      <rect x="70" y="95" width="14" height="39" rx="1" fill="#ef4444"/>
      <rect x="87" y="93" width="10" height="41" rx="1" fill="#8b5cf6"/>
      <rect x="100" y="94" width="13" height="40" rx="1" fill="#f59e0b"/>
      <rect x="116" y="92" width="11" height="42" rx="1" fill="#7b9f27"/>
      <rect x="130" y="95" width="15" height="39" rx="1" fill="#10b981"/>
      <rect x="148" y="93" width="12" height="41" rx="1" fill="#ef4444"/>
      <rect x="163" y="94" width="14" height="40" rx="1" fill="#3b82f6"/>
      {/* Second shelf */}
      <rect x="220" y="20" width="160" height="250" rx="4" fill="#1f3029" stroke="#263d37"/>
      <rect x="230" y="35" width="140" height="4" fill="#3a5650"/>
      <rect x="230" y="85" width="140" height="4" fill="#3a5650"/>
      <rect x="230" y="135" width="140" height="4" fill="#3a5650"/>
      <rect x="230" y="185" width="140" height="4" fill="#3a5650"/>
      {/* More books */}
      <rect x="235" y="15" width="11" height="20" rx="1" fill="#f59e0b"/>
      <rect x="249" y="18" width="13" height="17" rx="1" fill="#8b5cf6"/>
      <rect x="265" y="16" width="10" height="19" rx="1" fill="#ef4444"/>
      <rect x="278" y="17" width="14" height="18" rx="1" fill="#3b82f6"/>
      <rect x="295" y="15" width="12" height="20" rx="1" fill="#7b9f27"/>
      <rect x="310" y="18" width="11" height="17" rx="1" fill="#10b981"/>
      <rect x="324" y="16" width="13" height="19" rx="1" fill="#f59e0b"/>
      <rect x="340" y="17" width="10" height="18" rx="1" fill="#ef4444"/>
      {/* Table display */}
      <rect x="420" y="160" width="200" height="120" rx="4" fill="#2a3d36"/>
      <rect x="420" y="155" width="200" height="10" rx="3" fill="#3a5650"/>
      {/* Books on table */}
      <rect x="440" y="130" width="30" height="25" rx="2" fill="#f4efe2" transform="rotate(-5 455 142)"/>
      <rect x="480" y="132" width="25" height="23" rx="2" fill="#ef4444" opacity="0.8" transform="rotate(3 492 143)"/>
      <rect x="515" y="128" width="28" height="27" rx="2" fill="#3b82f6" opacity="0.8"/>
      <rect x="550" y="131" width="24" height="24" rx="2" fill="#f59e0b" opacity="0.8" transform="rotate(-2 562 143)"/>
      {/* Map poster on wall */}
      <rect x="440" y="40" width="120" height="90" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
      <text x="455" y="58" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="sans-serif">BOOK MAP</text>
      <line x1="450" y1="65" x2="550" y2="65" stroke="#ded7cb" strokeWidth="0.5"/>
      <rect x="450" y="70" width="35" height="20" rx="2" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="0.5"/>
      <text x="455" y="83" fill="#3b82f6" fontSize="5">Fiction</text>
      <rect x="490" y="70" width="35" height="20" rx="2" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="0.5"/>
      <text x="493" y="83" fill="#10b981" fontSize="5">Non-Fic</text>
      <rect x="450" y="95" width="75" height="18" rx="2" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="0.5"/>
      <text x="465" y="107" fill="#f59e0b" fontSize="5">Reference</text>
      {/* Sarah the librarian */}
      <g transform="translate(650, 100)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#8b5cf6"/>
        <rect x="4" y="32" width="28" height="40" rx="3" fill="#fffdf7" opacity="0.85"/>
        <circle cx="18" cy="14" r="14" fill="#d4a574"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#5B3A29"/>
        <path d="M32 8 Q36 14 32 20" stroke="#5B3A29" strokeWidth="3" fill="none"/>
        <circle cx="13" cy="14" r="1.8" fill="#374151"/>
        <circle cx="23" cy="14" r="1.8" fill="#374151"/>
        <path d="M13 20 Q18 23 23 20" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="36" y1="38" x2="50" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
        <rect x="48" y="22" width="18" height="14" rx="2" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
      </g>
      {/* Confused volunteer */}
      <g transform="translate(470, 100)">
        <rect x="0" y="28" width="34" height="46" rx="5" fill="#f59e0b"/>
        <circle cx="17" cy="14" r="13" fill="#c4956a"/>
        <path d="M4 12 Q4 1 17 1 Q30 1 30 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <path d="M12 20 Q17 17 22 20" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <text x="26" y="5" fill="#f59e0b" fontSize="13" fontWeight="700">?</text>
      </g>
      {/* Warm ceiling light */}
      <rect x="395" y="0" width="2" height="18" fill="#4a6b5e"/>
      <ellipse cx="400" cy="18" rx="20" ry="6" fill="rgba(251,191,36,0.1)"/>
    </svg>
  );
}

/* ===== CASE 003 — The Phone Call ===== */
function PhoneCallIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Living room setting */}
      <rect x="100" y="100" width="250" height="170" rx="6" fill="#223a32" stroke="#2a4a42"/>
      <rect x="110" y="110" width="230" height="80" rx="4" fill="#2a3d36"/>
      {/* Couch */}
      <rect x="120" y="200" width="220" height="60" rx="8" fill="#3d5a4f"/>
      <rect x="120" y="195" width="220" height="12" rx="4" fill="#4a6b5e"/>
      <rect x="110" y="205" width="20" height="55" rx="5" fill="#4a6b5e"/>
      <rect x="330" y="205" width="20" height="55" rx="5" fill="#4a6b5e"/>
      {/* David on couch with phone */}
      <g transform="translate(180, 120)">
        <rect x="0" y="28" width="40" height="55" rx="5" fill="#10b981"/>
        <circle cx="20" cy="14" r="15" fill="#d4a574"/>
        <path d="M5 12 Q5 0 20 0 Q35 0 35 12" fill="#3d2b1f"/>
        <circle cx="14" cy="14" r="2" fill="#374151"/>
        <circle cx="26" cy="14" r="2" fill="#374151"/>
        <path d="M14 20 Q20 24 26 20" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="40" y1="40" x2="55" y2="30" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
        <rect x="53" y="24" width="14" height="22" rx="3" fill="#374151"/>
        <rect x="55" y="27" width="10" height="14" rx="1" fill="#111916"/>
        <text x="10" y="65" fill="#8c9c96" fontSize="8" fontWeight="600" fontFamily="sans-serif">David</text>
      </g>
      {/* Tom on phone, frustrated */}
      <g transform="translate(500, 110)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#ef4444"/>
        <circle cx="19" cy="14" r="14" fill="#c4956a"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 21 Q19 18 25 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="7" x2="16" y2="9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="22" y1="9" x2="28" y2="7" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="52" y2="28" stroke="#c4956a" strokeWidth="3" strokeLinecap="round"/>
        <rect x="50" y="22" width="14" height="22" rx="3" fill="#374151"/>
        <rect x="52" y="25" width="10" height="14" rx="1" fill="#111916"/>
        <text x="12" y="65" fill="#8c9c96" fontSize="8" fontWeight="600" fontFamily="sans-serif">Tom</text>
      </g>
      {/* Phone with error */}
      <g transform="translate(530, 55)">
        <rect x="0" y="0" width="40" height="70" rx="6" fill="#374151"/>
        <rect x="3" y="5" width="34" height="55" rx="2" fill="#111916"/>
        <text x="7" y="22" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">ERROR</text>
        <text x="7" y="32" fill="#ef4444" fontSize="5" fontFamily="monospace">List never</text>
        <text x="7" y="40" fill="#ef4444" fontSize="5" fontFamily="monospace">ends!</text>
        <circle cx="20" cy="62" r="3" fill="#263d37"/>
      </g>
      {/* Guest list paper */}
      <g transform="translate(130, 50)">
        <rect x="0" y="0" width="60" height="80" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
        <text x="8" y="14" fill="#17201d" fontSize="6" fontWeight="700" fontFamily="sans-serif">GUEST LIST</text>
        <line x1="8" y1="18" x2="52" y2="18" stroke="#ded7cb" strokeWidth="0.5"/>
        <text x="8" y="28" fill="#374151" fontSize="5" fontFamily="sans-serif">1. Alice</text>
        <text x="8" y="36" fill="#374151" fontSize="5" fontFamily="sans-serif">2. Bob</text>
        <text x="8" y="44" fill="#374151" fontSize="5" fontFamily="sans-serif">3. Carol</text>
        <text x="8" y="52" fill="#374151" fontSize="5" fontFamily="sans-serif">4. Dave</text>
        <text x="8" y="60" fill="#374151" fontSize="5" fontFamily="sans-serif">5. Emily...</text>
        <text x="8" y="72" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="sans-serif">NO END!</text>
      </g>
      {/* Birthday decorations */}
      <circle cx="650" cy="30" r="8" fill="#f59e0b" opacity="0.3"/>
      <circle cx="680" cy="50" r="6" fill="#ef4444" opacity="0.3"/>
      <circle cx="620" cy="45" r="7" fill="#8b5cf6" opacity="0.3"/>
      <circle cx="700" cy="25" r="5" fill="#3b82f6" opacity="0.3"/>
    </svg>
  );
}

/* ===== CASE 004 — The Travel Journal ===== */
function TravelJournalIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Café window with Italian view */}
      <rect x="500" y="30" width="200" height="140" rx="4" fill="rgba(129,230,217,0.06)" stroke="#3a5650"/>
      <line x1="600" y1="30" x2="600" y2="170" stroke="#3a5650" strokeWidth="0.5"/>
      <line x1="500" y1="100" x2="700" y2="100" stroke="#3a5650" strokeWidth="0.5"/>
      {/* Buildings outside */}
      <rect x="510" y="80" width="25" height="60" rx="2" fill="#d4a574" opacity="0.4"/>
      <rect x="540" y="60" width="20" height="80" rx="2" fill="#c4956a" opacity="0.3"/>
      <rect x="620" y="70" width="30" height="70" rx="2" fill="#d4a574" opacity="0.35"/>
      <rect x="660" y="85" width="22" height="55" rx="2" fill="#c4956a" opacity="0.3"/>
      {/* Café table */}
      <rect x="180" y="190" width="200" height="90" rx="5" fill="#3d5a4f"/>
      <rect x="180" y="185" width="200" height="10" rx="3" fill="#4a6b5e"/>
      {/* Coffee cup */}
      <rect x="310" y="165" width="25" height="22" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
      <path d="M335 172 Q342 172 342 178 Q342 184 335 184" stroke="#ded7cb" strokeWidth="1.5" fill="none"/>
      <ellipse cx="322" cy="165" rx="12" ry="3" fill="#8B6914"/>
      {/* Laptop */}
      <rect x="200" y="140" width="100" height="50" rx="3" fill="#374151"/>
      <rect x="205" y="143" width="90" height="40" rx="2" fill="#111916"/>
      <text x="212" y="158" fill="#7b9f27" fontSize="6" fontFamily="monospace">Travel Journal</text>
      <text x="212" y="168" fill="#ef4444" fontSize="5" fontFamily="monospace">Text vanished!</text>
      {/* Maya confused */}
      <g transform="translate(250, 70)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#3b82f6"/>
        <circle cx="19" cy="14" r="15" fill="#d4a574"/>
        <path d="M4 12 Q4 0 19 0 Q34 0 34 12" fill="#5B3A29"/>
        <path d="M34 6 Q38 12 34 18" stroke="#5B3A29" strokeWidth="3" fill="none"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 21 Q19 18 25 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="9" y1="7" x2="15" y2="9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="9" x2="29" y2="7" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="13" fontWeight="700">?</text>
      </g>
      {/* Friend at next table */}
      <g transform="translate(450, 95)">
        <rect x="0" y="26" width="32" height="44" rx="5" fill="#8b5cf6"/>
        <circle cx="16" cy="12" r="12" fill="#c4956a"/>
        <path d="M4 10 Q4 0 16 0 Q28 0 28 10" fill="#2d1f14"/>
        <circle cx="11" cy="12" r="1.5" fill="#374151"/>
        <circle cx="21" cy="12" r="1.5" fill="#374151"/>
        <path d="M11 17 Q16 20 21 17" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Quotation marks floating */}
      <text x="150" y="60" fill="#f59e0b" fontSize="30" fontWeight="700" fontFamily="serif" opacity="0.4">"</text>
      <text x="380" y="120" fill="#ef4444" fontSize="24" fontWeight="700" fontFamily="serif" opacity="0.3">"</text>
    </svg>
  );
}

/* ===== CASE 005 — The Science Lab ===== */
function ScienceLabIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Whiteboard */}
      <rect x="60" y="25" width="280" height="160" rx="4" fill="#fffdf7" stroke="#ded7cb" strokeWidth="1.5"/>
      <text x="80" y="50" fill="#17201d" fontSize="9" fontWeight="700" fontFamily="sans-serif">EXPERIMENT STEPS:</text>
      <line x1="80" y1="58" x2="320" y2="58" stroke="#ded7cb" strokeWidth="0.5"/>
      <text x="80" y="75" fill="#374151" fontSize="7" fontFamily="sans-serif">1. meisure 50ml solution</text>
      <text x="80" y="92" fill="#374151" fontSize="7" fontFamily="sans-serif">2. heat to 80 degrees</text>
      <text x="80" y="109" fill="#374151" fontSize="7" fontFamily="sans-serif">3. obsurbe color change</text>
      <text x="80" y="135" fill="#ef4444" fontSize="7" fontWeight="700" fontFamily="sans-serif">⚠ Spelling errors!</text>
      <text x="80" y="155" fill="#ef4444" fontSize="6" fontFamily="sans-serif">"meisure" and "obsurbe"</text>
      <text x="80" y="170" fill="#ef4444" fontSize="6" fontFamily="sans-serif">are not real words!</text>
      {/* Lab bench */}
      <rect x="380" y="180" width="300" height="100" rx="5" fill="#2a3d36"/>
      <rect x="380" y="175" width="300" height="10" rx="3" fill="#3a5650"/>
      {/* Beakers and flasks */}
      <rect x="400" y="145" width="30" height="35" rx="3" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1"/>
      <rect x="405" y="160" width="20" height="18" rx="2" fill="rgba(59,130,246,0.4)"/>
      <path d="M445 145 L455 180 L465 145" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1"/>
      <ellipse cx="455" cy="165" rx="8" ry="10" fill="rgba(16,185,129,0.35)"/>
      <rect x="490" y="150" width="25" height="30" rx="3" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1"/>
      <rect x="495" y="162" width="15" height="16" rx="2" fill="rgba(245,158,11,0.35)"/>
      <rect x="530" y="148" width="28" height="32" rx="3" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1"/>
      <rect x="535" y="160" width="18" height="18" rx="2" fill="rgba(139,92,246,0.35)"/>
      {/* Test tube rack */}
      <rect x="580" y="155" width="60" height="25" rx="2" fill="#3a5650"/>
      <rect x="588" y="140" width="6" height="20" rx="2" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="0.5"/>
      <rect x="600" y="142" width="6" height="18" rx="2" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="0.5"/>
      <rect x="612" y="140" width="6" height="20" rx="2" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="0.5"/>
      <rect x="624" y="141" width="6" height="19" rx="2" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" strokeWidth="0.5"/>
      {/* Professor Wang */}
      <g transform="translate(420, 70)">
        <rect x="0" y="28" width="38" height="50" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#1a1a1a"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 20 Q19 23 25 20" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="52" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
      </g>
      {/* Jake confused */}
      <g transform="translate(550, 75)">
        <rect x="0" y="26" width="34" height="46" rx="5" fill="#3b82f6"/>
        <circle cx="17" cy="12" r="13" fill="#c4956a"/>
        <path d="M4 10 Q4 0 17 0 Q30 0 30 10" fill="#2d1f14"/>
        <circle cx="12" cy="12" r="1.8" fill="#374151"/>
        <circle cx="22" cy="12" r="1.8" fill="#374151"/>
        <text x="28" y="4" fill="#f59e0b" fontSize="12" fontWeight="700">?</text>
        <line x1="12" y1="6" x2="17" y2="8" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="22" y1="8" x2="27" y2="6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ===== CASE 006 — The Grocery List ===== */
function GroceryListIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Store shelves */}
      <rect x="40" y="40" width="180" height="220" rx="4" fill="#1f3029" stroke="#263d37"/>
      <rect x="50" y="60" width="160" height="4" fill="#3a5650"/>
      <rect x="50" y="120" width="160" height="4" fill="#3a5650"/>
      <rect x="50" y="180" width="160" height="4" fill="#3a5650"/>
      {/* Products on shelves */}
      <rect x="55" y="42" width="20" height="18" rx="2" fill="#f59e0b" opacity="0.7"/>
      <rect x="80" y="44" width="18" height="16" rx="2" fill="#3b82f6" opacity="0.7"/>
      <rect x="105" y="42" width="22" height="18" rx="2" fill="#ef4444" opacity="0.7"/>
      <rect x="135" y="44" width="16" height="16" rx="2" fill="#10b981" opacity="0.7"/>
      <rect x="160" y="42" width="20" height="18" rx="2" fill="#8b5cf6" opacity="0.7"/>
      <rect x="55" y="68" width="25" height="50" rx="2" fill="#f4efe2" opacity="0.6"/>
      <rect x="88" y="72" width="20" height="46" rx="2" fill="#d4a574" opacity="0.6"/>
      <rect x="118" y="70" width="22" height="48" rx="2" fill="#f4efe2" opacity="0.6"/>
      <rect x="150" y="72" width="18" height="46" rx="2" fill="#c4956a" opacity="0.6"/>
      <rect x="55" y="128" width="30" height="48" rx="2" fill="#fbbf24" opacity="0.5"/>
      <rect x="95" y="130" width="25" height="46" rx="2" fill="#7b9f27" opacity="0.5"/>
      <rect x="130" y="128" width="28" height="48" rx="2" fill="#ef4444" opacity="0.5"/>
      {/* Checkout counter */}
      <rect x="300" y="190" width="250" height="90" rx="5" fill="#3d5a4f"/>
      <rect x="300" y="185" width="250" height="10" rx="3" fill="#4a6b5e"/>
      {/* Phone with broken list */}
      <g transform="translate(350, 90)">
        <rect x="0" y="0" width="50" height="90" rx="6" fill="#374151"/>
        <rect x="4" y="6" width="42" height="70" rx="2" fill="#111916"/>
        <text x="8" y="18" fill="#7b9f27" fontSize="5" fontWeight="700" fontFamily="monospace">GROCERY</text>
        <text x="8" y="28" fill="#fff" fontSize="4.5" fontFamily="monospace">eggs</text>
        <text x="8" y="36" fill="#fff" fontSize="4.5" fontFamily="monospace">milk</text>
        <text x="8" y="44" fill="#fff" fontSize="4.5" fontFamily="monospace">bread</text>
        <text x="8" y="55" fill="#ef4444" fontSize="4.5" fontFamily="monospace">butterchicken</text>
        <text x="8" y="63" fill="#ef4444" fontSize="4.5" fontFamily="monospace">riceonionsgarlic</text>
        <circle cx="25" cy="83" r="3" fill="#263d37"/>
      </g>
      {/* Sarah shopper */}
      <g transform="translate(480, 100)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#ef4444"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="7" x2="16" y2="9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="9" x2="26" y2="7" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="38" x2="50" y2="28" stroke="#c4956a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="36" y1="42" x2="48" y2="48" stroke="#c4956a" strokeWidth="3" strokeLinecap="round"/>
      </g>
      {/* Shopping cart */}
      <g transform="translate(550, 150)">
        <rect x="0" y="0" width="50" height="35" rx="3" fill="none" stroke="#4a6b5e" strokeWidth="2"/>
        <line x1="0" y1="0" x2="10" y2="-15" stroke="#4a6b5e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="40" r="5" fill="#3a5650" stroke="#4a6b5e" strokeWidth="1"/>
        <circle cx="40" cy="40" r="5" fill="#3a5650" stroke="#4a6b5e" strokeWidth="1"/>
      </g>
      {/* Tom on phone */}
      <g transform="translate(640, 100)">
        <rect x="0" y="28" width="34" height="48" rx="5" fill="#10b981"/>
        <circle cx="17" cy="14" r="13" fill="#d4a574"/>
        <path d="M4 12 Q4 0 17 0 Q30 0 30 12" fill="#3d2b1f"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <path d="M12 20 Q17 23 22 20" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="34" y1="38" x2="46" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
        <rect x="44" y="22" width="12" height="20" rx="3" fill="#374151"/>
        <rect x="46" y="25" width="8" height="12" rx="1" fill="#111916"/>
      </g>
    </svg>
  );
}

/* ===== CASE 007 — The Concert Tickets ===== */
function ConcertTicketsIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Large monitor/screen */}
      <rect x="120" y="30" width="380" height="230" rx="6" fill="#374151" stroke="#4a6b5e" strokeWidth="2"/>
      <rect x="130" y="40" width="360" height="200" rx="3" fill="#111916"/>
      {/* Ticket website */}
      <rect x="140" y="48" width="340" height="20" rx="2" fill="#1f3029"/>
      <text x="155" y="62" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="sans-serif">🎵 CONCERT TICKETS</text>
      <rect x="140" y="76" width="340" height="150" rx="2" fill="#1a2b25" stroke="#263d37"/>
      {/* Form fields */}
      <text x="155" y="96" fill="#8c9c96" fontSize="6" fontFamily="sans-serif">Name:</text>
      <rect x="155" y="100" width="150" height="16" rx="2" fill="#111916" stroke="#ef4444" strokeWidth="1"/>
      <text x="160" y="111" fill="#fff" fontSize="6" fontFamily="monospace">Lina Johnson</text>
      <text x="155" y="132" fill="#8c9c96" fontSize="6" fontFamily="sans-serif">Email:</text>
      <rect x="155" y="136" width="150" height="16" rx="2" fill="#111916" stroke="#ef4444" strokeWidth="1"/>
      <text x="160" y="147" fill="#fff" fontSize="6" fontFamily="monospace">lina@email.com</text>
      <text x="155" y="168" fill="#8c9c96" fontSize="6" fontFamily="sans-serif">Tickets:</text>
      <rect x="155" y="172" width="60" height="16" rx="2" fill="#111916" stroke="#ef4444" strokeWidth="1"/>
      <text x="160" y="183" fill="#fff" fontSize="6" fontFamily="monospace">2</text>
      {/* Broken brackets indicator */}
      <text x="320" y="111" fill="#ef4444" fontSize="10" fontWeight="700">[</text>
      <text x="320" y="147" fill="#ef4444" fontSize="10" fontWeight="700">[</text>
      <text x="320" y="183" fill="#ef4444" fontSize="10" fontWeight="700">[</text>
      <text x="340" y="111" fill="#ef4444" fontSize="8">no close ]</text>
      {/* Purchase button - grayed out */}
      <rect x="155" y="200" width="100" height="20" rx="3" fill="#3a5650"/>
      <text x="170" y="214" fill="#53615c" fontSize="7" fontWeight="700" fontFamily="sans-serif">Purchase</text>
      {/* Lina at computer */}
      <g transform="translate(200, 240)">
        <rect x="0" y="10" width="36" height="40" rx="5" fill="#8b5cf6"/>
        <circle cx="18" cy="-2" r="13" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 18 -12 Q31 -12 31 0" fill="#5B3A29"/>
        <circle cx="13" cy="-2" r="1.8" fill="#374151"/>
        <circle cx="23" cy="-2" r="1.8" fill="#374151"/>
        <path d="M13 4 Q18 7 23 4" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Max next to her */}
      <g transform="translate(320, 245)">
        <rect x="0" y="10" width="32" height="38" rx="5" fill="#f59e0b"/>
        <circle cx="16" cy="-1" r="12" fill="#c4956a"/>
        <path d="M4 0 Q4 -10 16 -10 Q28 -10 28 0" fill="#2d1f14"/>
        <circle cx="11" cy="-1" r="1.5" fill="#374151"/>
        <circle cx="21" cy="-1" r="1.5" fill="#374151"/>
        <path d="M11 5 Q16 8 21 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Musical notes floating */}
      <text x="550" y="50" fill="#8b5cf6" fontSize="20" opacity="0.3">♪</text>
      <text x="600" y="80" fill="#f59e0b" fontSize="16" opacity="0.3">♫</text>
      <text x="570" y="120" fill="#3b82f6" fontSize="18" opacity="0.3">♪</text>
      <text x="620" y="60" fill="#ef4444" fontSize="14" opacity="0.25">♫</text>
    </svg>
  );
}

/* ===== CASE 008 — The School Ceremony ===== */
function SchoolCeremonyIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Stage */}
      <rect x="150" y="160" width="500" height="120" rx="4" fill="#2a3d36"/>
      <rect x="150" y="155" width="500" height="10" rx="3" fill="#3a5650"/>
      {/* Podium */}
      <rect x="350" y="100" width="80" height="60" rx="4" fill="#3d5a4f"/>
      <rect x="350" y="95" width="80" height="10" rx="3" fill="#4a6b5e"/>
      <text x="362" y="130" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="sans-serif">PODIUM</text>
      {/* Principal Adams at podium */}
      <g transform="translate(370, 30)">
        <rect x="0" y="28" width="38" height="50" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#5B3A29"/>
        <path d="M33 6 Q37 12 33 18" stroke="#5B3A29" strokeWidth="3" fill="none"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 21 Q19 18 25 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="50" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
      </g>
      {/* Folder/paper with missing names */}
      <g transform="translate(270, 70)">
        <rect x="0" y="0" width="55" height="70" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
        <text x="6" y="12" fill="#17201d" fontSize="5" fontWeight="700" fontFamily="sans-serif">AWARDS</text>
        <line x1="6" y1="16" x2="49" y2="16" stroke="#ded7cb" strokeWidth="0.5"/>
        <text x="6" y="26" fill="#374151" fontSize="4.5" fontFamily="sans-serif">Alexandra Chen</text>
        <text x="6" y="34" fill="#ef4444" fontSize="4.5" fontFamily="sans-serif">undefined</text>
        <text x="6" y="42" fill="#374151" fontSize="4.5" fontFamily="sans-serif">Ryan Park</text>
        <text x="6" y="50" fill="#ef4444" fontSize="4.5" fontFamily="sans-serif">undefined</text>
        <text x="6" y="58" fill="#ef4444" fontSize="4.5" fontFamily="sans-serif">undefined</text>
        <text x="6" y="66" fill="#ef4444" fontSize="4" fontWeight="700" fontFamily="sans-serif">⚠ NAMES MISSING</text>
      </g>
      {/* Student on stage receiving award */}
      <g transform="translate(500, 110)">
        <rect x="0" y="24" width="30" height="40" rx="4" fill="#3b82f6"/>
        <circle cx="15" cy="10" r="12" fill="#c4956a"/>
        <path d="M3 8 Q3 0 15 0 Q27 0 27 8" fill="#2d1f14"/>
        <circle cx="10" cy="10" r="1.5" fill="#374151"/>
        <circle cx="20" cy="10" r="1.5" fill="#374151"/>
        <path d="M10 16 Q15 19 20 16" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Trophy */}
      <g transform="translate(545, 108)">
        <rect x="5" y="25" width="10" height="8" rx="1" fill="#f59e0b"/>
        <rect x="2" y="33" width="16" height="4" rx="1" fill="#d97706"/>
        <path d="M0 10 Q0 0 10 0 Q20 0 20 10 L18 25 L2 25Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
        <path d="M0 10 Q-5 10 -5 16 Q-5 22 0 20" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M20 10 Q25 10 25 16 Q25 22 20 20" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
      </g>
      {/* Audience seats */}
      <rect x="100" y="250" width="600" height="30" rx="3" fill="#263a34"/>
      {/* Audience members */}
      <circle cx="180" cy="245" r="8" fill="#d4a574"/>
      <circle cx="210" cy="245" r="8" fill="#c4956a"/>
      <circle cx="240" cy="245" r="8" fill="#b8956a"/>
      <circle cx="350" cy="245" r="8" fill="#d4a574"/>
      <circle cx="380" cy="245" r="8" fill="#c4956a"/>
      <circle cx="500" cy="245" r="8" fill="#d4a574"/>
      <circle cx="530" cy="245" r="8" fill="#c4956a"/>
      <circle cx="560" cy="245" r="8" fill="#b8956a"/>
      {/* Banner */}
      <rect x="200" y="20" width="160" height="25" rx="3" fill="#7b9f27"/>
      <text x="220" y="37" fill="#fff" fontSize="8" fontWeight="700" fontFamily="sans-serif">SCHOOL CEREMONY</text>
    </svg>
  );
}

/* ===== CASE 009 — The Recipe Disaster ===== */
function RecipeDisasterIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Kitchen counter */}
      <rect x="100" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="400" height="10" rx="3" fill="#4a6b5e"/>
      {/* Recipe card */}
      <g transform="translate(130, 50)">
        <rect x="0" y="0" width="120" height="140" rx="4" fill="#fffdf7" stroke="#ded7cb" strokeWidth="1"/>
        <text x="10" y="18" fill="#17201d" fontSize="7" fontWeight="700" fontFamily="sans-serif">Apple Pie Recipe</text>
        <line x1="10" y1="24" x2="110" y2="24" stroke="#ded7cb" strokeWidth="0.5"/>
        <text x="10" y="38" fill="#374151" fontSize="5.5" fontFamily="sans-serif">1. Flour: 2 cups</text>
        <text x="10" y="50" fill="#ef4444" fontSize="5.5" fontWeight="700" fontFamily="sans-serif">2. Divide by ZERO ❌</text>
        <text x="10" y="62" fill="#374151" fontSize="5.5" fontFamily="sans-serif">3. Add butter</text>
        <text x="10" y="74" fill="#374151" fontSize="5.5" fontFamily="sans-serif">4. Roll the crust</text>
        <text x="10" y="86" fill="#374151" fontSize="5.5" fontFamily="sans-serif">5. Add apples</text>
        <text x="10" y="98" fill="#374151" fontSize="5.5" fontFamily="sans-serif">6. Bake at 375°F</text>
        <line x1="10" y1="108" x2="110" y2="108" stroke="#ef4444" strokeWidth="0.8"/>
        <text x="10" y="122" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="sans-serif">⚠ IMPOSSIBLE STEP!</text>
        <text x="10" y="132" fill="#ef4444" fontSize="4.5" fontFamily="sans-serif">Cannot divide by zero</text>
      </g>
      {/* Baking ingredients on counter */}
      <rect x="350" y="145" width="40" height="35" rx="3" fill="#f4efe2" stroke="#ded7cb"/>
      <text x="355" y="165" fill="#8B6914" fontSize="5" fontWeight="700" fontFamily="sans-serif">FLOUR</text>
      <rect x="400" y="150" width="30" height="30" rx="3" fill="#fbbf24"/>
      <text x="405" y="168" fill="#8B4513" fontSize="5" fontWeight="700" fontFamily="sans-serif">BUTTER</text>
      <circle cx="460" cy="162" r="15" fill="#ef4444" opacity="0.7"/>
      <text x="450" y="166" fill="#fff" fontSize="5" fontWeight="700" fontFamily="sans-serif">APPLES</text>
      {/* Mixing bowl */}
      <ellipse cx="300" cy="165" rx="35" ry="18" fill="#3a5650"/>
      <ellipse cx="300" cy="160" rx="35" ry="18" fill="#4a6b5e"/>
      {/* Grandma Rose */}
      <g transform="translate(200, 90)">
        <rect x="0" y="28" width="38" height="50" rx="5" fill="#f59e0b"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#999"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 20 Q19 23 25 20" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Glasses */}
        <circle cx="13" cy="14" r="5" fill="none" stroke="#374151" strokeWidth="0.8"/>
        <circle cx="25" cy="14" r="5" fill="none" stroke="#374151" strokeWidth="0.8"/>
      </g>
      {/* Mia confused */}
      <g transform="translate(420, 85)">
        <rect x="0" y="28" width="34" height="46" rx="5" fill="#3b82f6"/>
        <circle cx="17" cy="14" r="13" fill="#c4956a"/>
        <path d="M4 12 Q4 0 17 0 Q30 0 30 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <path d="M12 20 Q17 17 22 20" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <text x="26" y="5" fill="#f59e0b" fontSize="12" fontWeight="700">?</text>
      </g>
      {/* Zero symbol floating */}
      <text x="500" y="60" fill="#ef4444" fontSize="40" fontWeight="800" fontFamily="sans-serif" opacity="0.25">÷0</text>
    </svg>
  );
}

/* ===== CASE 010 — The Train Schedule ===== */
function TrainScheduleIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Platform */}
      <rect x="50" y="220" width="700" height="60" rx="3" fill="#2a3d36"/>
      <line x1="50" y1="220" x2="750" y2="220" stroke="#4a6b5e" strokeWidth="2"/>
      {/* Yellow safety line */}
      <rect x="50" y="215" width="700" height="5" fill="#f59e0b" opacity="0.5"/>
      {/* Train tracks */}
      <rect x="50" y="285" width="700" height="8" fill="#3a5650"/>
      <line x1="50" y1="289" x2="750" y2="289" stroke="#4a6b5e" strokeWidth="2"/>
      {/* Train */}
      <rect x="100" y="150" width="300" height="70" rx="8" fill="#3b82f6"/>
      <rect x="100" y="150" width="300" height="25" rx="8" fill="#2563eb"/>
      {/* Windows */}
      <rect x="120" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="160" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="200" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="240" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="280" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="320" y="160" width="30" height="20" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.3)"/>
      {/* Train door */}
      <rect x="360" y="155" width="25" height="65" rx="3" fill="#1d4ed8"/>
      <line x1="372" y1="160" x2="372" y2="215" stroke="#2563eb" strokeWidth="1"/>
      {/* Train wheels */}
      <circle cx="150" cy="225" r="10" fill="#374151" stroke="#4a6b5e"/>
      <circle cx="150" cy="225" r="4" fill="#4a6b5e"/>
      <circle cx="250" cy="225" r="10" fill="#374151" stroke="#4a6b5e"/>
      <circle cx="250" cy="225" r="4" fill="#4a6b5e"/>
      <circle cx="350" cy="225" r="10" fill="#374151" stroke="#4a6b5e"/>
      <circle cx="350" cy="225" r="4" fill="#4a6b5e"/>
      {/* Departure board */}
      <g transform="translate(480, 30)">
        <rect x="0" y="0" width="180" height="100" rx="4" fill="#374151" stroke="#4a6b5e"/>
        <rect x="5" y="5" width="170" height="90" rx="2" fill="#111916"/>
        <text x="15" y="20" fill="#f59e0b" fontSize="7" fontWeight="700" fontFamily="monospace">DEPARTURES</text>
        <line x1="12" y1="25" x2="168" y2="25" stroke="#263d37" strokeWidth="0.5"/>
        <text x="15" y="38" fill="#10b981" fontSize="5" fontFamily="monospace">09:15  BOSTON</text>
        <text x="15" y="48" fill="#10b981" fontSize="5" fontFamily="monospace">10:30  NYC</text>
        <text x="15" y="58" fill="#ef4444" fontSize="5" fontFamily="monospace">ERROR: TypeError</text>
        <text x="15" y="68" fill="#ef4444" fontSize="5" fontFamily="monospace">cannot read 'platform'</text>
        <text x="15" y="78" fill="#ef4444" fontSize="5" fontFamily="monospace">of undefined</text>
      </g>
      {/* Marcus confused */}
      <g transform="translate(530, 140)">
        <rect x="0" y="28" width="36" height="48" rx="5" fill="#ef4444"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="9" y1="7" x2="15" y2="9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="21" y1="9" x2="27" y2="7" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="38" x2="50" y2="28" stroke="#c4956a" strokeWidth="3" strokeLinecap="round"/>
        <rect x="48" y="22" width="14" height="22" rx="3" fill="#374151"/>
        <rect x="50" y="25" width="10" height="14" rx="1" fill="#111916"/>
      </g>
      {/* Zoe helpful */}
      <g transform="translate(620, 145)">
        <rect x="0" y="26" width="32" height="44" rx="5" fill="#10b981"/>
        <circle cx="16" cy="12" r="12" fill="#d4a574"/>
        <path d="M4 10 Q4 0 16 0 Q28 0 28 10" fill="#5B3A29"/>
        <circle cx="11" cy="12" r="1.5" fill="#374151"/>
        <circle cx="21" cy="12" r="1.5" fill="#374151"/>
        <path d="M11 17 Q16 20 21 17" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <text x="24" y="4" fill="#10b981" fontSize="11" fontWeight="700">💡</text>
      </g>
      {/* Station sign */}
      <rect x="480" y="140" width="120" height="20" rx="3" fill="#7b9f27"/>
      <text x="500" y="154" fill="#fff" fontSize="7" fontWeight="700" fontFamily="sans-serif">RAILWAY STATION</text>
    </svg>
  );
}

/* ===== CASE 011 — The Voting Booth ===== */
function VotingBoothIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Voting booth */}
      <rect x="280" y="60" width="200" height="160" rx="5" fill="#2a3d36" stroke="#3a5650"/>
      <rect x="280" y="55" width="200" height="10" rx="3" fill="#3a5650"/>
      <text x="320" y="48" fill="#7b9f27" fontSize="8" fontWeight="700" fontFamily="sans-serif">VOTING BOOTH</text>
      {/* Voting tablet */}
      <rect x="310" y="80" width="140" height="100" rx="4" fill="#374151"/>
      <rect x="315" y="85" width="130" height="85" rx="2" fill="#111916"/>
      <text x="325" y="100" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">CAST YOUR VOTE</text>
      <text x="325" y="114" fill="#fff" fontSize="5.5" fontFamily="monospace">1 - Candidate A</text>
      <text x="325" y="126" fill="#fff" fontSize="5.5" fontFamily="monospace">2 - Candidate B</text>
      <text x="325" y="138" fill="#fff" fontSize="5.5" fontFamily="monospace">3 - Candidate C</text>
      <line x1="325" y1="144" x2="435" y2="144" stroke="#263d37" strokeWidth="0.5"/>
      <text x="325" y="156" fill="#ef4444" fontSize="5.5" fontFamily="monospace">Your choice: 4</text>
      <text x="325" y="166" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="monospace">ValueError: invalid</text>
      {/* Candidate posters */}
      <g transform="translate(80, 60)">
        <rect x="0" y="0" width="80" height="100" rx="4" fill="#fffdf7" stroke="#ded7cb"/>
        <rect x="5" y="5" width="70" height="40" rx="3" fill="#3b82f6" opacity="0.2"/>
        <text x="15" y="30" fill="#3b82f6" fontSize="18" fontWeight="700">A</text>
        <text x="10" y="60" fill="#17201d" fontSize="6" fontWeight="700" fontFamily="sans-serif">Candidate A</text>
        <text x="15" y="72" fill="#53615c" fontSize="5" fontFamily="sans-serif">Vote: 1</text>
      </g>
      <g transform="translate(540, 60)">
        <rect x="0" y="0" width="80" height="100" rx="4" fill="#fffdf7" stroke="#ded7cb"/>
        <rect x="5" y="5" width="70" height="40" rx="3" fill="#10b981" opacity="0.2"/>
        <text x="15" y="30" fill="#10b981" fontSize="18" fontWeight="700">B</text>
        <text x="10" y="60" fill="#17201d" fontSize="6" fontWeight="700" fontFamily="sans-serif">Candidate B</text>
        <text x="15" y="72" fill="#53615c" fontSize="5" fontFamily="sans-serif">Vote: 2</text>
      </g>
      {/* Mr. Johnson */}
      <g transform="translate(340, 200)">
        <rect x="0" y="10" width="36" height="42" rx="5" fill="#8b5cf6"/>
        <circle cx="18" cy="-2" r="13" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 18 -12 Q31 -12 31 0" fill="#666"/>
        <circle cx="13" cy="-2" r="1.8" fill="#374151"/>
        <circle cx="23" cy="-2" r="1.8" fill="#374151"/>
        <path d="M13 5 Q18 2 23 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Amy volunteer */}
      <g transform="translate(440, 200)">
        <rect x="0" y="10" width="32" height="40" rx="5" fill="#f59e0b"/>
        <circle cx="16" cy="-2" r="12" fill="#c4956a"/>
        <path d="M4 0 Q4 -10 16 -10 Q28 -10 28 0" fill="#5B3A29"/>
        <circle cx="11" cy="-2" r="1.5" fill="#374151"/>
        <circle cx="21" cy="-2" r="1.5" fill="#374151"/>
        <path d="M11 4 Q16 7 21 4" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* "4" key floating with error */}
      <text x="400" y="145" fill="#ef4444" fontSize="30" fontWeight="800" fontFamily="sans-serif" opacity="0.2">4</text>
    </svg>
  );
}

/* ===== CASE 012 — The Pizza Party ===== */
function PizzaPartyIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Party table */}
      <rect x="150" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="150" y="175" width="400" height="10" rx="3" fill="#4a6b5e"/>
      {/* Pizza boxes stacked */}
      <g transform="translate(200, 110)">
        <rect x="0" y="20" width="80" height="12" rx="2" fill="#d4a574" stroke="#b8865a" strokeWidth="0.5"/>
        <rect x="3" y="8" width="74" height="12" rx="2" fill="#c4956a" stroke="#b8865a" strokeWidth="0.5"/>
        <rect x="6" y="-4" width="68" height="12" rx="2" fill="#d4a574" stroke="#b8865a" strokeWidth="0.5"/>
        <text x="18" y="6" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="sans-serif">PIZZA</text>
      </g>
      {/* Pizza on plate */}
      <g transform="translate(350, 140)">
        <circle cx="35" cy="15" r="35" fill="#f59e0b" opacity="0.3"/>
        <circle cx="35" cy="15" r="30" fill="#d4a574"/>
        <circle cx="35" cy="15" r="25" fill="#ef4444" opacity="0.6"/>
        <circle cx="25" cy="10" r="3" fill="#10b981" opacity="0.7"/>
        <circle cx="40" cy="8" r="2.5" fill="#10b981" opacity="0.7"/>
        <circle cx="35" cy="20" r="2" fill="#10b981" opacity="0.7"/>
        <circle cx="28" cy="18" r="3" fill="#fff" opacity="0.4"/>
        <circle cx="42" cy="16" r="2.5" fill="#fff" opacity="0.4"/>
        {/* Slices cut */}
        <line x1="35" y1="15" x2="35" y2="-15" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="60" y2="0" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="65" y2="15" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="60" y2="30" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="35" y2="45" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="10" y2="30" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="5" y2="15" stroke="#b8865a" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="10" y2="0" stroke="#b8865a" strokeWidth="0.5"/>
      </g>
      {/* Plates */}
      <circle cx="480" cy="170" r="20" fill="#fffdf7" stroke="#ded7cb" strokeWidth="1"/>
      <circle cx="520" cy="175" r="18" fill="#fffdf7" stroke="#ded7cb" strokeWidth="1"/>
      {/* "9 PIZZAS?" text */}
      <g transform="translate(550, 60)">
        <rect x="0" y="0" width="120" height="50" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1"/>
        <text x="15" y="20" fill="#ef4444" fontSize="14" fontWeight="800" fontFamily="sans-serif">9 PIZZAS?</text>
        <text x="20" y="38" fill="#ef4444" fontSize="7" fontFamily="sans-serif">Too many!</text>
      </g>
      {/* Chris worried */}
      <g transform="translate(250, 220)">
        <rect x="0" y="10" width="36" height="42" rx="5" fill="#ef4444"/>
        <circle cx="18" cy="-2" r="13" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 18 -12 Q31 -12 31 0" fill="#3d2b1f"/>
        <circle cx="13" cy="-2" r="1.8" fill="#374151"/>
        <circle cx="23" cy="-2" r="1.8" fill="#374151"/>
        <path d="M13 5 Q18 2 23 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Dani analytical */}
      <g transform="translate(380, 220)">
        <rect x="0" y="10" width="34" height="40" rx="5" fill="#3b82f6"/>
        <circle cx="17" cy="-2" r="12" fill="#c4956a"/>
        <path d="M5 0 Q5 -10 17 -10 Q29 -10 29 0" fill="#2d1f14"/>
        <circle cx="12" cy="-2" r="1.5" fill="#374151"/>
        <circle cx="22" cy="-2" r="1.5" fill="#374151"/>
        <path d="M12 5 Q17 8 22 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Math floating */}
      <text x="130" y="60" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="monospace" opacity="0.3">24 × 3 = 72</text>
      <text x="130" y="80" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="monospace" opacity="0.3">72 ÷ 8 = 9</text>
    </svg>
  );
}

/* ===== CASE 013 — The Thermostat ===== */
function ThermostatIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Apartment wall */}
      <rect x="100" y="40" width="300" height="230" rx="4" fill="#223a32"/>
      {/* Thermostat on wall */}
      <g transform="translate(200, 70)">
        <rect x="0" y="0" width="80" height="100" rx="8" fill="#374151" stroke="#4a6b5e" strokeWidth="1.5"/>
        <rect x="5" y="5" width="70" height="60" rx="4" fill="#111916"/>
        <text x="15" y="22" fill="#3b82f6" fontSize="18" fontWeight="700" fontFamily="monospace">68°</text>
        <text x="15" y="34" fill="#8c9c96" fontSize="5" fontFamily="monospace">Current</text>
        <text x="15" y="50" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="monospace">72°</text>
        <text x="15" y="60" fill="#8c9c96" fontSize="5" fontFamily="monospace">Target</text>
        {/* Heat indicator */}
        <circle cx="60" cy="20" r="6" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
        <text x="56" y="23" fill="#ef4444" fontSize="8" fontWeight="700">OFF</text>
        {/* Buttons */}
        <rect x="15" y="70" width="22" height="12" rx="3" fill="#3a5650"/>
        <text x="18" y="79" fill="#fff" fontSize="5" fontWeight="700" fontFamily="sans-serif">HEAT</text>
        <rect x="43" y="70" width="22" height="12" rx="3" fill="#3a5650"/>
        <text x="49" y="79" fill="#fff" fontSize="5" fontWeight="700" fontFamily="sans-serif">COOL</text>
      </g>
      {/* Error logic shown */}
      <g transform="translate(130, 190)">
        <rect x="0" y="0" width="200" height="60" rx="4" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="0.8"/>
          <text x="10" y="16" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">if current &gt; target:</text>
        <text x="10" y="30" fill="#ef4444" fontSize="6" fontFamily="monospace">  turn_on_heater()</text>
        <text x="10" y="46" fill="#ef4444" fontSize="5" fontFamily="monospace">❌ WRONG! Should be &lt;</text>
      </g>
      {/* Window showing cold outside */}
      <g transform="translate(450, 40)">
        <rect x="0" y="0" width="140" height="120" rx="3" fill="rgba(129,230,217,0.06)" stroke="#3a5650"/>
        <line x1="70" y1="0" x2="70" y2="120" stroke="#3a5650" strokeWidth="0.5"/>
        <line x1="0" y1="60" x2="140" y2="60" stroke="#3a5650" strokeWidth="0.5"/>
        {/* Snowflakes */}
        <text x="20" y="35" fill="#3b82f6" fontSize="12" opacity="0.5">❄</text>
        <text x="80" y="50" fill="#3b82f6" fontSize="10" opacity="0.4">❄</text>
        <text x="50" y="80" fill="#3b82f6" fontSize="14" opacity="0.5">❄</text>
        <text x="100" y="30" fill="#3b82f6" fontSize="8" opacity="0.3">❄</text>
      </g>
      {/* Nina shivering */}
      <g transform="translate(500, 180)">
        <rect x="0" y="28" width="36" height="48" rx="5" fill="#3b82f6"/>
        <circle cx="18" cy="14" r="14" fill="#d4a574"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Shiver lines */}
        <line x1="-5" y1="30" x2="-10" y2="28" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"/>
        <line x1="-5" y1="38" x2="-10" y2="36" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"/>
        <line x1="41" y1="30" x2="46" y2="28" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"/>
        <line x1="41" y1="38" x2="46" y2="36" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"/>
        <text x="5" y="75" fill="#8c9c96" fontSize="7" fontFamily="sans-serif">Nina</text>
      </g>
      {/* Alex */}
      <g transform="translate(600, 185)">
        <rect x="0" y="26" width="32" height="44" rx="5" fill="#10b981"/>
        <circle cx="16" cy="12" r="12" fill="#c4956a"/>
        <path d="M4 10 Q4 0 16 0 Q28 0 28 10" fill="#2d1f14"/>
        <circle cx="11" cy="12" r="1.5" fill="#374151"/>
        <circle cx="21" cy="12" r="1.5" fill="#374151"/>
        <path d="M11 17 Q16 20 21 17" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <text x="4" y="65" fill="#8c9c96" fontSize="7" fontFamily="sans-serif">Alex</text>
      </g>
    </svg>
  );
}

/* ===== CASE 014 — The Exam Score ===== */
function ExamScoreIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      {/* Whiteboard */}
      <rect x="60" y="30" width="280" height="180" rx="4" fill="#fffdf7" stroke="#ded7cb" strokeWidth="1.5"/>
      <text x="80" y="55" fill="#17201d" fontSize="9" fontWeight="700" fontFamily="sans-serif">GRADE CALCULATOR</text>
      <line x1="80" y1="62" x2="320" y2="62" stroke="#ded7cb" strokeWidth="0.5"/>
      <text x="80" y="80" fill="#374151" fontSize="7" fontFamily="sans-serif">Ryan's Scores:</text>
      <text x="80" y="95" fill="#374151" fontSize="7" fontFamily="monospace">85, 92, 78, 90</text>
      <text x="80" y="115" fill="#374151" fontSize="7" fontFamily="sans-serif">Expected Average: 86.25</text>
      <text x="80" y="135" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="sans-serif">Got: 90 ❌</text>
      <text x="80" y="155" fill="#ef4444" fontSize="6" fontFamily="sans-serif">Wrong variable used!</text>
      <text x="80" y="170" fill="#ef4444" fontSize="6" fontFamily="sans-serif">System pulled wrong data</text>
      {/* Computer screen */}
      <g transform="translate(400, 30)">
        <rect x="0" y="0" width="220" height="150" rx="5" fill="#374151" stroke="#4a6b5e"/>
        <rect x="8" y="8" width="204" height="120" rx="3" fill="#111916"/>
        <text x="18" y="25" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">Student Grade Report</text>
        <line x1="18" y1="30" x2="200" y2="30" stroke="#263d37" strokeWidth="0.5"/>
        <text x="18" y="44" fill="#fff" fontSize="5.5" fontFamily="monospace">Student: Ryan</text>
        <text x="18" y="56" fill="#fff" fontSize="5.5" fontFamily="monospace">Test 1: 85</text>
        <text x="18" y="68" fill="#fff" fontSize="5.5" fontFamily="monospace">Test 2: 92</text>
        <text x="18" y="80" fill="#fff" fontSize="5.5" fontFamily="monospace">Test 3: 78</text>
        <text x="18" y="92" fill="#fff" fontSize="5.5" fontFamily="monospace">Test 4: 90</text>
        <line x1="18" y1="98" x2="200" y2="98" stroke="#263d37" strokeWidth="0.5"/>
        <text x="18" y="112" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">Average: 90 (WRONG)</text>
        <text x="18" y="122" fill="#f59e0b" fontSize="5" fontFamily="monospace">Should be: 86.25</text>
      </g>
      {/* Teacher Patel */}
      <g transform="translate(180, 220)">
        <rect x="0" y="10" width="36" height="44" rx="5" fill="#8b5cf6"/>
        <circle cx="18" cy="-2" r="13" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 18 -12 Q31 -12 31 0" fill="#5B3A29"/>
        <circle cx="13" cy="-2" r="1.8" fill="#374151"/>
        <circle cx="23" cy="-2" r="1.8" fill="#374151"/>
        <path d="M13 5 Q18 2 23 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Mr. Kim */}
      <g transform="translate(350, 220)">
        <rect x="0" y="10" width="34" height="42" rx="5" fill="#f59e0b"/>
        <circle cx="17" cy="-2" r="12" fill="#c4956a"/>
        <path d="M5 0 Q5 -10 17 -10 Q29 -10 29 0" fill="#2d1f14"/>
        <circle cx="12" cy="-2" r="1.5" fill="#374151"/>
        <circle cx="22" cy="-2" r="1.5" fill="#374151"/>
        <path d="M12 5 Q17 8 22 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
      {/* Wrong variable indicator */}
      <text x="450" y="200" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace" opacity="0.3">ryan_scores → wrong_var</text>
    </svg>
  );
}

/* ===== CASE 015 — The Traffic Light ===== */
function TrafficLightIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      {/* Night sky */}
      <rect width="800" height="200" fill="#111916"/>
      {/* Stars */}
      <circle cx="100" cy="30" r="1.5" fill="#fff" opacity="0.4"/>
      <circle cx="200" cy="50" r="1" fill="#fff" opacity="0.3"/>
      <circle cx="350" cy="20" r="1.5" fill="#fff" opacity="0.4"/>
      <circle cx="500" cy="40" r="1" fill="#fff" opacity="0.3"/>
      <circle cx="650" cy="25" r="1.5" fill="#fff" opacity="0.4"/>
      <circle cx="720" cy="55" r="1" fill="#fff" opacity="0.3"/>
      <circle cx="50" cy="60" r="1" fill="#fff" opacity="0.25"/>
      <circle cx="450" cy="15" r="1" fill="#fff" opacity="0.3"/>
      {/* Moon */}
      <circle cx="700" cy="40" r="20" fill="#f4efe2" opacity="0.15"/>
      {/* Road */}
      <rect x="0" y="200" width="800" height="160" fill="#263a34"/>
      <rect x="0" y="200" width="800" height="4" fill="#3a5650"/>
      {/* Road markings */}
      <rect x="50" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="140" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="230" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="320" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="410" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="500" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="590" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      <rect x="680" y="270" width="40" height="4" rx="2" fill="#f4efe2" opacity="0.3"/>
      {/* Traffic light pole */}
      <rect x="395" y="50" width="8" height="220" fill="#374151"/>
      {/* Traffic light box */}
      <rect x="370" y="50" width="58" height="140" rx="8" fill="#374151" stroke="#4a6b5e" strokeWidth="1.5"/>
      {/* Red light - OFF */}
      <circle cx="399" cy="80" r="16" fill="#1a1a1a" stroke="#4a6b5e" strokeWidth="1"/>
      {/* Yellow light - OFF */}
      <circle cx="399" cy="120" r="16" fill="#1a1a1a" stroke="#4a6b5e" strokeWidth="1"/>
      {/* Green light - ON (wrong at night!) */}
      <circle cx="399" cy="160" r="16" fill="#10b981" stroke="#059669" strokeWidth="1"/>
      <circle cx="399" cy="160" r="22" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3"/>
      <circle cx="399" cy="160" r="28" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.15"/>
      {/* ERROR label */}
      <g transform="translate(440, 80)">
        <rect x="0" y="0" width="100" height="35" rx="4" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="0.8"/>
        <text x="8" y="14" fill="#ef4444" fontSize="7" fontWeight="700" fontFamily="monospace">ERROR:</text>
        <text x="8" y="26" fill="#ef4444" fontSize="5.5" fontFamily="monospace">Green at night!</text>
      </g>
      {/* Cars */}
      <g transform="translate(100, 230)">
        <rect x="0" y="0" width="60" height="25" rx="4" fill="#3b82f6"/>
        <rect x="5" y="-8" width="50" height="12" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.2)"/>
        <circle cx="12" cy="28" r="5" fill="#374151" stroke="#4a6b5e"/>
        <circle cx="48" cy="28" r="5" fill="#374151" stroke="#4a6b5e"/>
        <rect x="55" y="8" width="6" height="4" rx="1" fill="#f59e0b"/>
      </g>
      <g transform="translate(500, 235)">
        <rect x="0" y="0" width="55" height="22" rx="4" fill="#ef4444"/>
        <rect x="5" y="-7" width="45" height="10" rx="3" fill="rgba(129,230,217,0.2)" stroke="rgba(255,255,255,0.2)"/>
        <circle cx="10" cy="25" r="5" fill="#374151" stroke="#4a6b5e"/>
        <circle cx="45" cy="25" r="5" fill="#374151" stroke="#4a6b5e"/>
        <rect x="0" y="8" width="5" height="4" rx="1" fill="#f59e0b"/>
      </g>
      {/* Pedestrian */}
      <g transform="translate(650, 210)">
        <circle cx="10" cy="0" r="8" fill="#d4a574"/>
        <rect x="2" y="8" width="16" height="22" rx="3" fill="#f59e0b"/>
        <line x1="6" y1="30" x2="4" y2="42" stroke="#d4a574" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="14" y1="30" x2="16" y2="42" stroke="#d4a574" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      {/* Streetlight */}
      <rect x="200" y="60" width="4" height="140" fill="#374151"/>
      <rect x="185" y="55" width="34" height="10" rx="3" fill="#374151"/>
      <ellipse cx="202" cy="65" rx="15" ry="6" fill="rgba(251,191,36,0.12)"/>
    </svg>
  );
}

/* ===== CASE 016 — The Room Organizer ===== */
function RoomOrganizerIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <g transform="translate(60, 30)">
        <rect x="0" y="0" width="180" height="220" rx="4" fill="#fffdf7" stroke="#ded7cb"/>
        <text x="12" y="22" fill="#17201d" fontSize="8" fontWeight="700" fontFamily="sans-serif">CLEANING CHECKLIST</text>
        <line x1="12" y1="28" x2="168" y2="28" stroke="#ded7cb" strokeWidth="0.5"/>
        <text x="12" y="46" fill="#7b9f27" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">KITCHEN</text>
        <text x="12" y="58" fill="#374151" fontSize="5.5" fontFamily="sans-serif">Pick up items</text>
        <text x="12" y="70" fill="#374151" fontSize="5.5" fontFamily="sans-serif">Wipe surfaces</text>
        <text x="12" y="82" fill="#374151" fontSize="5.5" fontFamily="sans-serif">Vacuum floor</text>
        <line x1="12" y1="88" x2="168" y2="88" stroke="#ded7cb" strokeWidth="0.5"/>
        <text x="12" y="104" fill="#7b9f27" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">LIVING ROOM</text>
        <text x="12" y="116" fill="#374151" fontSize="5.5" fontFamily="sans-serif">Pick up items</text>
        <text x="45" y="128" fill="#ef4444" fontSize="5.5" fontWeight="700" fontFamily="sans-serif">Wipe surfaces</text>
        <text x="45" y="140" fill="#ef4444" fontSize="5.5" fontWeight="700" fontFamily="sans-serif">Vacuum floor</text>
        <text x="12" y="168" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="sans-serif">Shifted right!</text>
      </g>
      <g transform="translate(350, 80)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#3b82f6"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 1 18 1 Q32 1 32 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="28" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
        <line x1="4" y1="40" x2="-8" y2="30" stroke="#c4956a" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="32" y1="40" x2="44" y2="30" stroke="#c4956a" strokeWidth="3.5" strokeLinecap="round"/>
      </g>
      <g transform="translate(450, 85)">
        <rect x="0" y="28" width="34" height="46" rx="5" fill="#ef4444"/>
        <circle cx="17" cy="14" r="13" fill="#d4a574"/>
        <path d="M4 12 Q4 1 17 1 Q30 1 30 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <path d="M12 20 Q17 23 22 20" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <line x1="34" y1="38" x2="46" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
        <rect x="44" y="22" width="18" height="14" rx="2" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
      </g>
      <rect x="300" y="170" width="250" height="100" rx="5" fill="#2a3d36"/>
      <rect x="320" y="180" width="80" height="60" rx="4" fill="#3d5a4f"/>
      <rect x="420" y="190" width="60" height="50" rx="4" fill="#3d5a4f"/>
      <rect x="500" y="185" width="40" height="55" rx="4" fill="#3d5a4f"/>
    </svg>
  );
}

/* ===== CASE 017 — The Morning Greeting ===== */
function MorningGreetingIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="200" y="60" width="400" height="220" rx="4" fill="#2a3d36"/>
      <rect x="200" y="50" width="400" height="20" rx="3" fill="#3a5650"/>
      <text x="320" y="42" fill="#7b9f27" fontSize="10" fontWeight="700" fontFamily="sans-serif">SCHOOL ENTRANCE</text>
      <rect x="360" y="160" width="80" height="120" rx="4" fill="#3d5a4f" stroke="#4a6b5e"/>
      <circle cx="420" cy="220" r="5" fill="#f59e0b"/>
      <rect x="240" y="80" width="160" height="60" rx="4" fill="#374151"/>
      <rect x="245" y="85" width="150" height="50" rx="2" fill="#111916"/>
      <text x="255" y="100" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">GREETING SYSTEM</text>
      <text x="255" y="112" fill="#fff" fontSize="5.5" fontFamily="monospace">Hello, Student!</text>
      <text x="255" y="124" fill="#ef4444" fontSize="5.5" fontFamily="monospace">def greet(name)</text>
      <text x="410" y="124" fill="#f59e0b" fontSize="12" fontWeight="700">missing :</text>
      <g transform="translate(500, 170)">
        <circle cx="0" cy="14" r="10" fill="#d4a574"/>
        <path d="M-7 12 Q-7 4 0 4 Q7 4 7 12" fill="#3b82f6"/>
        <rect x="-7" y="24" width="14" height="26" rx="3" fill="#3b82f6"/>
      </g>
      <g transform="translate(530, 172)">
        <circle cx="0" cy="12" r="9" fill="#c4956a"/>
        <path d="M-6 10 Q-6 3 0 3 Q6 3 6 10" fill="#8b5cf6"/>
        <rect x="-6" y="21" width="12" height="24" rx="3" fill="#8b5cf6"/>
      </g>
    </svg>
  );
}

/* ===== CASE 018 — The Fruit Basket ===== */
function FruitBasketIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="400" height="10" rx="3" fill="#4a6b5e"/>
      <g transform="translate(150, 50)">
        <rect x="0" y="0" width="100" height="170" rx="8" fill="#374151"/>
        <rect x="6" y="10" width="88" height="140" rx="3" fill="#111916"/>
        <text x="14" y="28" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">NOTES</text>
        <text x="14" y="42" fill="#fff" fontSize="5" fontFamily="monospace">apple</text>
        <text x="14" y="52" fill="#fff" fontSize="5" fontFamily="monospace">banana</text>
        <text x="14" y="62" fill="#fff" fontSize="5" fontFamily="monospace">cherry</text>
        <text x="14" y="72" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="monospace"> MISSING ] !</text>
        <text x="14" y="84" fill="#fff" fontSize="5" fontFamily="monospace">carrot</text>
        <text x="14" y="94" fill="#fff" fontSize="5" fontFamily="monospace">pea</text>
        <text x="14" y="104" fill="#fff" fontSize="5" fontFamily="monospace">corn</text>
        <text x="14" y="118" fill="#f59e0b" fontSize="5" fontWeight="700" fontFamily="monospace">FUSED!</text>
        <circle cx="50" cy="162" r="4" fill="#263d37"/>
      </g>
      <circle cx="350" cy="165" r="12" fill="#ef4444" opacity="0.7"/>
      <rect x="380" y="155" width="30" height="20" rx="4" fill="#f59e0b"/>
      <circle cx="440" cy="162" r="10" fill="#ef4444"/>
      <g transform="translate(550, 80)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#8b5cf6"/>
        <circle cx="18" cy="14" r="14" fill="#d4a574"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <text x="28" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 019 — The Score Calculator ===== */
function ScoreCalculatorIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="30" width="300" height="220" rx="4" fill="#fffdf7" stroke="#ded7cb"/>
      <text x="80" y="55" fill="#17201d" fontSize="9" fontWeight="700" fontFamily="sans-serif">SCORE CALCULATOR</text>
      <line x1="80" y1="62" x2="340" y2="62" stroke="#ded7cb" strokeWidth="0.5"/>
      <text x="80" y="85" fill="#374151" fontSize="8" fontFamily="monospace">x = 10</text>
      <text x="80" y="105" fill="#374151" fontSize="8" fontFamily="monospace">y = 20</text>
      <text x="80" y="135" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="monospace">x + y = 30</text>
      <text x="80" y="155" fill="#ef4444" fontSize="6" fontFamily="sans-serif">Cannot assign to expression!</text>
      <text x="80" y="180" fill="#7b9f27" fontSize="7" fontFamily="monospace">result = x + y  OK</text>
      <g transform="translate(400, 60)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#f59e0b"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#5B3A29"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 21 Q19 18 25 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
      <g transform="translate(500, 65)">
        <rect x="0" y="28" width="34" height="46" rx="5" fill="#10b981"/>
        <circle cx="17" cy="14" r="13" fill="#c4956a"/>
        <path d="M4 12 Q4 1 17 1 Q30 1 30 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <line x1="34" y1="38" x2="46" y2="28" stroke="#c4956a" strokeWidth="3" strokeLinecap="round"/>
        <rect x="44" y="22" width="18" height="14" rx="2" fill="#fffdf7" stroke="#ded7cb" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}

/* ===== CASE 020 — The Color Palette ===== */
function ColorPaletteIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="350" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="350" height="10" rx="3" fill="#4a6b5e"/>
      <rect x="120" y="140" width="60" height="35" rx="4" fill="#ef4444"/>
      <text x="132" y="162" fill="#fff" fontSize="7" fontWeight="700">RED</text>
      <rect x="195" y="140" width="60" height="35" rx="4" fill="#10b981"/>
      <text x="202" y="162" fill="#fff" fontSize="7" fontWeight="700">GREEN</text>
      <rect x="270" y="140" width="60" height="35" rx="4" fill="#3b82f6"/>
      <text x="278" y="162" fill="#fff" fontSize="7" fontWeight="700">BLUE</text>
      <rect x="345" y="140" width="60" height="35" rx="4" fill="#1a1a1a" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"/>
      <text x="355" y="155" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">4th?</text>
      <text x="352" y="168" fill="#ef4444" fontSize="5" fontFamily="monospace">NOT FOUND</text>
      <rect x="480" y="30" width="200" height="140" rx="6" fill="#374151"/>
      <rect x="488" y="38" width="184" height="118" rx="3" fill="#111916"/>
      <text x="498" y="56" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">COLOR PALETTE</text>
      <rect x="498" y="64" width="40" height="20" rx="2" fill="#ef4444"/>
      <rect x="548" y="64" width="40" height="20" rx="2" fill="#10b981"/>
      <rect x="598" y="64" width="40" height="20" rx="2" fill="#3b82f6"/>
      <text x="498" y="100" fill="#ef4444" fontSize="6" fontFamily="monospace">IndexError: 4</text>
      <g transform="translate(530, 160)">
        <rect x="0" y="10" width="36" height="48" rx="5" fill="#8b5cf6"/>
        <circle cx="18" cy="-2" r="13" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 18 -12 Q31 -12 31 0" fill="#5B3A29"/>
        <circle cx="12" cy="-2" r="1.8" fill="#374151"/>
        <circle cx="24" cy="-2" r="1.8" fill="#374151"/>
        <path d="M12 5 Q18 2 24 5" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <text x="28" y="-15" fill="#f59e0b" fontSize="12" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 021 — The Contact Card ===== */
function ContactCardIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="200" y="180" width="350" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="200" y="175" width="350" height="10" rx="3" fill="#4a6b5e"/>
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="120" height="230" rx="4" fill="#2a3d36" stroke="#3a5650"/>
        <rect x="10" y="10" width="100" height="35" rx="3" fill="#1f3029"/>
        <text x="20" y="32" fill="#10b981" fontSize="7" fontWeight="700" fontFamily="monospace">ALICE</text>
        <rect x="10" y="55" width="100" height="35" rx="3" fill="#1f3029"/>
        <text x="20" y="77" fill="#10b981" fontSize="7" fontWeight="700" fontFamily="monospace">AGE: 25</text>
        <rect x="10" y="100" width="100" height="35" rx="3" fill="#1f3029" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2"/>
        <text x="20" y="122" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">CITY: ???</text>
        <text x="15" y="160" fill="#ef4444" fontSize="5">Key city not found!</text>
      </g>
      <rect x="300" y="40" width="180" height="130" rx="5" fill="#374151"/>
      <rect x="308" y="48" width="164" height="110" rx="3" fill="#111916"/>
      <text x="318" y="66" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">CONTACT CARD</text>
      <text x="318" y="82" fill="#fff" fontSize="5.5" fontFamily="monospace">name: Alice OK</text>
      <text x="318" y="96" fill="#fff" fontSize="5.5" fontFamily="monospace">age: 25 OK</text>
      <text x="318" y="110" fill="#ef4444" fontSize="5.5" fontFamily="monospace">city: NOT FOUND</text>
      <text x="318" y="128" fill="#ef4444" fontSize="5" fontFamily="monospace">KeyError: city</text>
      <g transform="translate(420, 100)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#7b9f27"/>
        <circle cx="18" cy="14" r="14" fill="#d4a574"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="28" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 022 — The Text Editor ===== */
function TextEditorIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="500" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="500" height="10" rx="3" fill="#4a6b5e"/>
      <rect x="180" y="30" width="320" height="145" rx="6" fill="#374151"/>
      <rect x="188" y="38" width="304" height="127" rx="3" fill="#111916"/>
      <text x="200" y="56" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="monospace">TEXT PROCESSOR</text>
      <text x="200" y="78" fill="#10b981" fontSize="6" fontFamily="monospace">uppercase: HELLO OK</text>
      <text x="200" y="94" fill="#10b981" fontSize="6" fontFamily="monospace">lowercase: hello OK</text>
      <text x="200" y="110" fill="#ef4444" fontSize="6" fontFamily="monospace">reverse: ERROR</text>
      <text x="200" y="126" fill="#ef4444" fontSize="5.5" fontFamily="monospace">AttributeError: str has no reverse</text>
      <g transform="translate(280, 160)">
        <rect x="0" y="10" width="38" height="48" rx="5" fill="#8b5cf6"/>
        <circle cx="19" cy="-2" r="14" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 19 -12 Q33 -12 33 0" fill="#5B3A29"/>
        <circle cx="13" cy="-2" r="2" fill="#374151"/>
        <circle cx="25" cy="-2" r="2" fill="#374151"/>
        <path d="M13 5 Q19 2 25 5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
      <rect x="550" y="80" width="80" height="100" rx="3" fill="#fffdf7" stroke="#ded7cb" transform="rotate(-5 590 130)"/>
      <rect x="540" y="90" width="80" height="100" rx="3" fill="#f4efe2" stroke="#ded7cb" transform="rotate(2 580 140)"/>
    </svg>
  );
}

/* ===== CASE 023 — The Diary Reader ===== */
function DiaryReaderIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="400" height="10" rx="3" fill="#4a6b5e"/>
      <rect x="180" y="30" width="250" height="145" rx="6" fill="#374151"/>
      <rect x="188" y="38" width="234" height="127" rx="3" fill="#111916"/>
      <text x="200" y="56" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="monospace">NOTE READER</text>
      <text x="200" y="74" fill="#fff" fontSize="6" fontFamily="monospace">Opening: data.txt</text>
      <text x="200" y="90" fill="#ef4444" fontSize="6" fontFamily="monospace">FileNotFoundError!</text>
      <text x="200" y="106" fill="#ef4444" fontSize="5.5" fontFamily="monospace">No such file or directory: data.txt</text>
      <g transform="translate(500, 50)">
        <rect x="0" y="0" width="140" height="170" rx="4" fill="#2a3d36" stroke="#3a5650"/>
        <rect x="10" y="10" width="120" height="30" rx="3" fill="#1f3029"/>
        <text x="25" y="30" fill="#10b981" fontSize="6" fontFamily="monospace">notes_v1.txt</text>
        <rect x="10" y="50" width="120" height="30" rx="3" fill="#1f3029"/>
        <text x="25" y="70" fill="#10b981" fontSize="6" fontFamily="monospace">notes_v2.txt</text>
        <rect x="10" y="90" width="120" height="30" rx="3" fill="#1f3029" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2"/>
        <text x="25" y="110" fill="#ef4444" fontSize="6" fontFamily="monospace">data.txt ???</text>
        <text x="20" y="140" fill="#ef4444" fontSize="5" fontWeight="700">FILE NOT HERE!</text>
      </g>
      <g transform="translate(280, 160)">
        <rect x="0" y="10" width="38" height="48" rx="5" fill="#f59e0b"/>
        <circle cx="19" cy="-2" r="14" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 19 -12 Q33 -12 33 0" fill="#2d1f14"/>
        <circle cx="13" cy="-2" r="2" fill="#374151"/>
        <circle cx="25" cy="-2" r="2" fill="#374151"/>
        <path d="M13 5 Q19 2 25 5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="30" y="-15" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 024 — The Toolbox ===== */
function ToolboxIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="500" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="100" y="175" width="500" height="10" rx="3" fill="#4a6b5e"/>
      <g transform="translate(150, 60)">
        <rect x="0" y="30" width="200" height="110" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <rect x="5" y="35" width="190" height="10" rx="3" fill="#d97706"/>
        <rect x="15" y="55" width="40" height="70" rx="3" fill="#10b981" stroke="#059669"/>
        <text x="18" y="78" fill="#fff" fontSize="5" fontWeight="700">MATH</text>
        <text x="18" y="88" fill="#fff" fontSize="4">loaded</text>
        <rect x="65" y="55" width="40" height="70" rx="3" fill="#3b82f6" stroke="#2563eb"/>
        <text x="68" y="78" fill="#fff" fontSize="5" fontWeight="700">STATS</text>
        <text x="68" y="88" fill="#fff" fontSize="4">loaded</text>
        <rect x="115" y="55" width="70" height="70" rx="3" fill="#1a1a1a" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"/>
        <text x="122" y="78" fill="#ef4444" fontSize="5" fontWeight="700">FAKE_PKG</text>
        <text x="122" y="90" fill="#ef4444" fontSize="4.5" fontFamily="monospace">NOT FOUND</text>
      </g>
      <g transform="translate(420, 80)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <path d="M13 21 Q19 18 25 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 025 — The Clock App ===== */
function ClockAppIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="280" y="20" width="240" height="250" rx="12" fill="#374151"/>
      <rect x="290" y="35" width="220" height="220" rx="4" fill="#111916"/>
      <circle cx="400" cy="100" r="45" fill="#1f3029" stroke="#3a5650" strokeWidth="2"/>
      <line x1="400" y1="100" x2="400" y2="70" stroke="#7b9f27" strokeWidth="2" strokeLinecap="round"/>
      <line x1="400" y1="100" x2="425" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="400" cy="100" r="3" fill="#7b9f27"/>
      <rect x="300" y="155" width="200" height="90" rx="3" fill="#1f3029"/>
      <text x="310" y="172" fill="#10b981" fontSize="6" fontFamily="monospace">datetime loaded</text>
      <text x="310" y="186" fill="#10b981" fontSize="6" fontFamily="monospace">os loaded</text>
      <text x="310" y="200" fill="#ef4444" fontSize="6" fontFamily="monospace">fake_package ERROR</text>
      <text x="310" y="216" fill="#ef4444" fontSize="5.5" fontFamily="monospace">ImportError: cannot import helper</text>
      <g transform="translate(560, 100)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#3b82f6"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <path d="M12 21 Q18 18 24 21" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="28" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 026 — The Voting Counter ===== */
function VotingCounterIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="40" width="280" height="230" rx="4" fill="#2a3d36"/>
      <rect x="80" y="50" width="240" height="100" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
      <text x="100" y="72" fill="#17201d" fontSize="7" fontWeight="700" fontFamily="sans-serif">VOTE COUNTER</text>
      <text x="100" y="90" fill="#374151" fontSize="6" fontFamily="monospace">After 10 loops: 9</text>
      <text x="100" y="125" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">Expected: 10</text>
      <g transform="translate(400, 80)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#5B3A29"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
      </g>
      <g transform="translate(500, 50)">
        <rect x="0" y="0" width="120" height="80" rx="6" fill="#374151"/>
        <rect x="5" y="5" width="110" height="70" rx="3" fill="#111916"/>
        <text x="15" y="25" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">VOTES CAST</text>
        <text x="30" y="58" fill="#f59e0b" fontSize="28" fontWeight="800" fontFamily="monospace">9</text>
        <text x="70" y="58" fill="#ef4444" fontSize="12" fontFamily="monospace">/10</text>
      </g>
    </svg>
  );
}

/* ===== CASE 027 — The Endless Meeting ===== */
function EndlessMeetingIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="60" width="400" height="210" rx="5" fill="#2a3d36"/>
      <rect x="140" y="150" width="320" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="520" y="30" width="200" height="140" rx="5" fill="#374151"/>
      <rect x="528" y="38" width="184" height="122" rx="3" fill="#111916"/>
      <text x="540" y="56" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">TASK PROCESSOR</text>
      <text x="540" y="72" fill="#fff" fontSize="5.5" fontFamily="monospace">Task 1... Task 2...</text>
      <text x="540" y="96" fill="#ef4444" fontSize="5.5" fontFamily="monospace">Task 99... INFINITE!</text>
      <text x="540" y="126" fill="#ef4444" fontSize="5" fontFamily="monospace">while counter &gt; 0: counter += 1</text>
      <circle cx="680" cy="200" r="30" fill="#1f3029" stroke="#3a5650" strokeWidth="1.5"/>
      <line x1="680" y1="200" x2="680" y2="180" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="680" y1="200" x2="695" y2="210" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round"/>
      <text x="668" y="205" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">11PM</text>
    </svg>
  );
}

/* ===== CASE 028 — The Inventory Check ===== */
function InventoryCheckIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="40" width="350" height="230" rx="4" fill="#2a3d36"/>
      <rect x="80" y="60" width="310" height="4" fill="#3a5650"/>
      <rect x="80" y="120" width="310" height="4" fill="#3a5650"/>
      <rect x="90" y="65" width="25" height="50" rx="2" fill="#3b82f6" opacity="0.6"/>
      <rect x="125" y="70" width="20" height="45" rx="2" fill="#ef4444" opacity="0.6"/>
      <rect x="155" y="68" width="22" height="47" rx="2" fill="#10b981" opacity="0.6"/>
      <rect x="187" y="66" width="24" height="49" rx="2" fill="#f59e0b" opacity="0.6"/>
      <rect x="221" y="65" width="20" height="50" rx="2" fill="#8b5cf6" opacity="0.6"/>
      <g transform="translate(440, 40)">
        <rect x="0" y="0" width="180" height="120" rx="4" fill="#fffdf7" stroke="#ded7cb"/>
        <text x="15" y="22" fill="#17201d" fontSize="7" fontWeight="700" fontFamily="sans-serif">INVENTORY CHECK</text>
        <text x="15" y="40" fill="#374151" fontSize="6" fontFamily="monospace">Loop: 0 to 4</text>
        <text x="15" y="75" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">Last index: 4</text>
        <text x="15" y="95" fill="#ef4444" fontSize="5" fontFamily="monospace">Shows 4, expected 5!</text>
      </g>
      <g transform="translate(500, 180)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 029 — The Club Entry ===== */
function ClubEntryIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="250" y="40" width="250" height="230" rx="5" fill="#2a3d36"/>
      <text x="290" y="28" fill="#8b5cf6" fontSize="10" fontWeight="700">NIGHT CLUB</text>
      <rect x="330" y="120" width="80" height="150" rx="4" fill="#3d5a4f" stroke="#4a6b5e"/>
      <circle cx="390" cy="195" r="5" fill="#f59e0b"/>
      <rect x="280" y="70" width="150" height="40" rx="3" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1"/>
      <text x="292" y="87" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">SYNTAX ERROR!</text>
      <text x="292" y="100" fill="#ef4444" fontSize="5.5" fontFamily="monospace">age &gt;= 18 and has_ticket</text>
      <g transform="translate(150, 100)">
        <rect x="0" y="28" width="42" height="60" rx="6" fill="#1a1a1a"/>
        <rect x="5" y="32" width="32" height="50" rx="3" fill="#fffdf7" opacity="0.9"/>
        <text x="10" y="52" fill="#1a1a1a" fontSize="5" fontWeight="700">BOUNCER</text>
        <circle cx="21" cy="14" r="16" fill="#c4956a"/>
        <path d="M5 12 Q5 0 21 0 Q37 0 37 12" fill="#1a1a1a"/>
        <circle cx="14" cy="14" r="2.2" fill="#374151"/>
        <circle cx="28" cy="14" r="2.2" fill="#374151"/>
        <line x1="42" y1="42" x2="60" y2="32" stroke="#c4956a" strokeWidth="4" strokeLinecap="round"/>
      </g>
      <g transform="translate(450, 120)">
        <rect x="0" y="28" width="34" height="48" rx="5" fill="#3b82f6"/>
        <circle cx="17" cy="14" r="13" fill="#d4a574"/>
        <path d="M4 12 Q4 1 17 1 Q30 1 30 12" fill="#5B3A29"/>
        <circle cx="12" cy="14" r="1.8" fill="#374151"/>
        <circle cx="22" cy="14" r="1.8" fill="#374151"/>
        <text x="12" y="48" fill="#fff" fontSize="5" fontWeight="700">Age: 20</text>
      </g>
    </svg>
  );
}

/* ===== CASE 030 — The Shopping Bill ===== */
function ShoppingBillIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="150" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <g transform="translate(180, 30)">
        <rect x="0" y="0" width="160" height="145" rx="3" fill="#fffdf7" stroke="#ded7cb"/>
        <text x="12" y="18" fill="#17201d" fontSize="7" fontWeight="700" fontFamily="sans-serif">SHOPPING BILL</text>
        <text x="12" y="40" fill="#374151" fontSize="6" fontFamily="monospace">Item A: $10</text>
        <text x="12" y="54" fill="#374151" fontSize="6" fontFamily="monospace">Item B: $5</text>
        <text x="12" y="68" fill="#374151" fontSize="6" fontFamily="monospace">Tax: 2</text>
        <text x="12" y="92" fill="#374151" fontSize="6" fontFamily="monospace">Wrong: 5 * 2 + 10 = 20</text>
        <text x="12" y="110" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">Should be: 30!</text>
        <text x="12" y="130" fill="#7b9f27" fontSize="5.5" fontFamily="monospace">Fix: (10 + 5) * 2 = 30</text>
      </g>
      <g transform="translate(420, 50)">
        <rect x="0" y="0" width="120" height="100" rx="6" fill="#374151"/>
        <rect x="5" y="5" width="110" height="30" rx="2" fill="#111916"/>
        <text x="12" y="25" fill="#ef4444" fontSize="14" fontWeight="800" fontFamily="monospace">$20</text>
        <text x="70" y="25" fill="#ef4444" fontSize="8" fontFamily="monospace">WRONG</text>
        <text x="12" y="55" fill="#10b981" fontSize="12" fontWeight="800" fontFamily="monospace">$30</text>
        <text x="70" y="55" fill="#10b981" fontSize="8" fontFamily="monospace">RIGHT</text>
      </g>
      <g transform="translate(300, 120)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 031 — The Data Filter ===== */
function DataFilterIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="150" y="30" width="300" height="145" rx="6" fill="#374151"/>
      <rect x="158" y="38" width="284" height="127" rx="3" fill="#111916"/>
      <text x="170" y="56" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="monospace">DATA FILTER</text>
      <text x="170" y="74" fill="#ef4444" fontSize="6" fontFamily="monospace">Error 1: Missing colon</text>
      <text x="170" y="88" fill="#ef4444" fontSize="6" fontFamily="monospace">Error 2: Missing colon in if</text>
      <text x="170" y="102" fill="#ef4444" fontSize="6" fontFamily="monospace">Error 3: Unclosed paren</text>
      <text x="170" y="120" fill="#f59e0b" fontSize="5.5" fontFamily="monospace">Fix top-to-bottom!</text>
      <g transform="translate(520, 50)">
        <rect x="0" y="0" width="80" height="140" rx="4" fill="#2a3d36"/>
        <text x="10" y="18" fill="#7b9f27" fontSize="6" fontWeight="700">FILTER</text>
        <rect x="10" y="25" width="60" height="15" rx="2" fill="#3b82f6" opacity="0.5"/>
        <text x="15" y="36" fill="#fff" fontSize="5" fontFamily="monospace">-3</text>
        <rect x="10" y="45" width="60" height="15" rx="2" fill="#ef4444" opacity="0.5"/>
        <text x="15" y="56" fill="#fff" fontSize="5" fontFamily="monospace">-1</text>
        <rect x="10" y="65" width="60" height="15" rx="2" fill="#10b981" opacity="0.7"/>
        <text x="15" y="76" fill="#fff" fontSize="5" fontFamily="monospace">+2</text>
        <rect x="10" y="85" width="60" height="15" rx="2" fill="#10b981" opacity="0.7"/>
        <text x="15" y="96" fill="#fff" fontSize="5" fontFamily="monospace">+5</text>
        <text x="10" y="135" fill="#7b9f27" fontSize="5">keep + values</text>
      </g>
      <g transform="translate(300, 160)">
        <rect x="0" y="10" width="38" height="48" rx="5" fill="#8b5cf6"/>
        <circle cx="19" cy="-2" r="14" fill="#d4a574"/>
        <path d="M5 0 Q5 -12 19 -12 Q33 -12 33 0" fill="#5B3A29"/>
        <circle cx="13" cy="-2" r="2" fill="#374151"/>
        <circle cx="25" cy="-2" r="2" fill="#374151"/>
        <path d="M13 5 Q19 2 25 5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ===== CASE 032 — The Dictionary Explorer ===== */
function DictionaryExplorerIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="50" width="280" height="220" rx="5" fill="#2a3d36"/>
      <text x="120" y="38" fill="#7b9f27" fontSize="9" fontWeight="700">ANIMAL SOUNDS</text>
      <g transform="translate(80, 65)">
        <rect x="0" y="0" width="100" height="40" rx="4" fill="#10b981" opacity="0.15" stroke="#10b981"/>
        <text x="10" y="18" fill="#10b981" fontSize="7" fontWeight="700" fontFamily="monospace">a = meow</text>
        <text x="10" y="32" fill="#10b981" fontSize="5">Found</text>
      </g>
      <g transform="translate(80, 115)">
        <rect x="0" y="0" width="100" height="40" rx="4" fill="#10b981" opacity="0.15" stroke="#10b981"/>
        <text x="10" y="18" fill="#10b981" fontSize="7" fontWeight="700" fontFamily="monospace">b = woof</text>
        <text x="10" y="32" fill="#10b981" fontSize="5">Found</text>
      </g>
      <g transform="translate(80, 165)">
        <rect x="0" y="0" width="100" height="40" rx="4" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeDasharray="4 2"/>
        <text x="10" y="18" fill="#ef4444" fontSize="7" fontWeight="700" fontFamily="monospace">c = ???</text>
        <text x="10" y="32" fill="#ef4444" fontSize="5">Not Found!</text>
      </g>
      <g transform="translate(400, 80)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#3b82f6"/>
        <circle cx="19" cy="14" r="14" fill="#c4956a"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
      <g transform="translate(500, 60)">
        <rect x="0" y="0" width="180" height="120" rx="4" fill="#374151"/>
        <rect x="5" y="5" width="170" height="110" rx="3" fill="#111916"/>
        <text x="15" y="22" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">CHAIN OF ERRORS</text>
        <text x="15" y="38" fill="#ef4444" fontSize="5.5" fontFamily="monospace">1. dict c - KeyError</text>
        <text x="15" y="54" fill="#ef4444" fontSize="5.5" fontFamily="monospace">2. 10 / 0 - ZeroDivision</text>
        <text x="15" y="70" fill="#ef4444" fontSize="5.5" fontFamily="monospace">3. .upper() - AttributeError</text>
        <text x="15" y="90" fill="#f59e0b" fontSize="5.5" fontFamily="monospace">Only first error shows!</text>
      </g>
    </svg>
  );
}

/* ===== CASE 033 — The Division Tool ===== */
function DivisionToolIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="500" height="100" rx="5" fill="#3d5a4f"/>
      <g transform="translate(130, 60)">
        <rect x="0" y="0" width="80" height="110" rx="4" fill="#10b981" opacity="0.15" stroke="#10b981"/>
        <text x="10" y="18" fill="#10b981" fontSize="6" fontWeight="700" fontFamily="monospace">Test 1</text>
        <text x="10" y="34" fill="#fff" fontSize="5.5" fontFamily="monospace">10 / 2 = 5</text>
        <text x="10" y="50" fill="#10b981" fontSize="5">WORKS!</text>
      </g>
      <g transform="translate(250, 60)">
        <rect x="0" y="0" width="80" height="110" rx="4" fill="#ef4444" opacity="0.15" stroke="#ef4444"/>
        <text x="10" y="18" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">Test 2</text>
        <text x="10" y="34" fill="#fff" fontSize="5.5" fontFamily="monospace">10 / 0 = ?</text>
        <text x="10" y="50" fill="#ef4444" fontSize="5">CRASH!</text>
        <text x="10" y="65" fill="#ef4444" fontSize="4.5" fontFamily="monospace">ZeroDivision</text>
      </g>
      <g transform="translate(370, 60)">
        <rect x="0" y="0" width="80" height="110" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b"/>
        <text x="10" y="18" fill="#f59e0b" fontSize="6" fontWeight="700" fontFamily="monospace">Test 3</text>
        <text x="10" y="34" fill="#fff" fontSize="5.5" fontFamily="monospace">10 / a = ?</text>
        <text x="10" y="50" fill="#f59e0b" fontSize="5">CRASH!</text>
        <text x="10" y="65" fill="#f59e0b" fontSize="4.5" fontFamily="monospace">TypeError</text>
      </g>
      <g transform="translate(520, 80)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#1a1a1a"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
      </g>
    </svg>
  );
}

/* ===== CASE 034 — The Number Converter ===== */
function NumberConverterIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="400" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="150" y="30" width="300" height="145" rx="6" fill="#374151"/>
      <rect x="158" y="38" width="284" height="127" rx="3" fill="#111916"/>
      <text x="170" y="56" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="monospace">NUMBER CONVERTER</text>
      <text x="170" y="74" fill="#10b981" fontSize="6" fontFamily="monospace">Input: 5 - Result: 20 OK</text>
      <text x="170" y="90" fill="#ef4444" fontSize="6" fontFamily="monospace">Input: hello - ERROR</text>
      <text x="170" y="106" fill="#ef4444" fontSize="5.5" fontFamily="monospace">ValueError: invalid literal for int</text>
      <g transform="translate(500, 50)">
        <rect x="0" y="0" width="150" height="100" rx="4" fill="#2a3d36"/>
        <text x="15" y="18" fill="#7b9f27" fontSize="6" fontWeight="700">USER INPUT</text>
        <rect x="15" y="25" width="40" height="20" rx="3" fill="#10b981"/>
        <text x="22" y="39" fill="#fff" fontSize="7" fontWeight="700" fontFamily="monospace">5</text>
        <rect x="65" y="25" width="70" height="20" rx="3" fill="#ef4444"/>
        <text x="72" y="39" fill="#fff" fontSize="6" fontWeight="700" fontFamily="monospace">hello</text>
        <text x="15" y="65" fill="#10b981" fontSize="5" fontFamily="monospace">5 works</text>
        <text x="15" y="82" fill="#ef4444" fontSize="5" fontFamily="monospace">hello crash</text>
      </g>
      <g transform="translate(300, 160)">
        <rect x="0" y="10" width="38" height="48" rx="5" fill="#3b82f6"/>
        <circle cx="19" cy="-2" r="14" fill="#c4956a"/>
        <path d="M5 0 Q5 -12 19 -12 Q33 -12 33 0" fill="#2d1f14"/>
        <circle cx="13" cy="-2" r="2" fill="#374151"/>
        <circle cx="25" cy="-2" r="2" fill="#374151"/>
        <path d="M13 5 Q19 2 25 5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="30" y="-15" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 035 — The Book Search ===== */
function BookSearchIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="50" width="300" height="220" rx="4" fill="#1f3029" stroke="#263d37"/>
      <rect x="80" y="55" width="20" height="15" rx="1" fill="#ef4444"/>
      <rect x="105" y="57" width="18" height="13" rx="1" fill="#3b82f6"/>
      <rect x="128" y="55" width="22" height="15" rx="1" fill="#f59e0b"/>
      <rect x="155" y="56" width="16" height="14" rx="1" fill="#8b5cf6"/>
      <rect x="176" y="55" width="20" height="15" rx="1" fill="#10b981"/>
      <rect x="200" y="52" width="24" height="18" rx="2" fill="#7b9f27" stroke="#7b9f27" strokeWidth="2"/>
      <text x="204" y="64" fill="#fff" fontSize="4" fontWeight="700">BOOK 3</text>
      <g transform="translate(420, 50)">
        <rect x="0" y="0" width="200" height="100" rx="4" fill="#374151"/>
        <rect x="5" y="5" width="190" height="90" rx="3" fill="#111916"/>
        <text x="15" y="22" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">BOOK SEARCH</text>
        <text x="15" y="38" fill="#fff" fontSize="5.5" fontFamily="monospace">Book 3 found at pos 2</text>
        <text x="15" y="54" fill="#10b981" fontSize="5.5" fontFamily="monospace">Search complete</text>
        <text x="15" y="72" fill="#f59e0b" fontSize="5.5" fontFamily="monospace">Book 9 not found = -1</text>
      </g>
      <g transform="translate(500, 180)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#8b5cf6"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#5B3A29"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
      </g>
    </svg>
  );
}

/* ===== CASE 036 — The Fruit Finder ===== */
function FruitFinderIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="50" width="200" height="220" rx="4" fill="#2a3d36"/>
      <text x="100" y="38" fill="#7b9f27" fontSize="8" fontWeight="700">FRUIT DATABASE</text>
      <circle cx="95" cy="78" r="10" fill="#ef4444"/>
      <text x="85" y="82" fill="#fff" fontSize="5" fontWeight="700">apple</text>
      <rect x="130" y="72" width="20" height="12" rx="3" fill="#f59e0b"/>
      <text x="133" y="82" fill="#8B4513" fontSize="4.5" fontWeight="700">banana</text>
      <circle cx="195" cy="78" r="8" fill="#ef4444"/>
      <text x="183" y="82" fill="#fff" fontSize="4.5" fontWeight="700">cherry</text>
      <g transform="translate(300, 50)">
        <rect x="0" y="0" width="200" height="130" rx="4" fill="#374151"/>
        <rect x="5" y="5" width="190" height="120" rx="3" fill="#111916"/>
        <text x="15" y="22" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">FRUIT SEARCH</text>
        <text x="15" y="40" fill="#10b981" fontSize="5.5" fontFamily="monospace">apple FOUND</text>
        <text x="15" y="56" fill="#10b981" fontSize="5.5" fontFamily="monospace">banana FOUND</text>
        <text x="15" y="72" fill="#ef4444" fontSize="5.5" fontFamily="monospace">Apple NOT FOUND</text>
        <text x="15" y="90" fill="#f59e0b" fontSize="5.5" fontFamily="monospace">Case-sensitive!</text>
      </g>
      <g transform="translate(550, 100)">
        <rect x="0" y="28" width="36" height="50" rx="5" fill="#3b82f6"/>
        <circle cx="18" cy="14" r="14" fill="#c4956a"/>
        <path d="M4 12 Q4 0 18 0 Q32 0 32 12" fill="#2d1f14"/>
        <circle cx="12" cy="14" r="2" fill="#374151"/>
        <circle cx="24" cy="14" r="2" fill="#374151"/>
        <text x="28" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 037 — The Age Gate ===== */
function AgeGateIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="250" y="40" width="250" height="230" rx="5" fill="#2a3d36"/>
      <text x="290" y="28" fill="#8b5cf6" fontSize="9" fontWeight="700">MOVIE THEATER</text>
      <rect x="280" y="60" width="180" height="80" rx="4" fill="#374151"/>
      <rect x="286" y="66" width="168" height="68" rx="3" fill="#111916"/>
      <text x="298" y="84" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">AGE VERIFIER</text>
      <text x="298" y="100" fill="#10b981" fontSize="5.5" fontFamily="monospace">age 25 ALLOWED</text>
      <text x="298" y="114" fill="#ef4444" fontSize="5.5" fontFamily="monospace">age -5 ALLOWED?</text>
      <text x="298" y="128" fill="#ef4444" fontSize="5.5" fontFamily="monospace">age 150 ALLOWED?</text>
      <g transform="translate(100, 130)">
        <circle cx="0" cy="14" r="10" fill="#d4a574"/>
        <rect x="-7" y="24" width="14" height="26" rx="3" fill="#10b981"/>
        <text x="-5" y="56" fill="#10b981" fontSize="5" fontWeight="700" fontFamily="monospace">25</text>
      </g>
      <g transform="translate(140, 130)">
        <circle cx="0" cy="14" r="10" fill="#c4956a"/>
        <rect x="-7" y="24" width="14" height="26" rx="3" fill="#3b82f6"/>
        <text x="-10" y="56" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="monospace">-5?</text>
      </g>
      <g transform="translate(180, 130)">
        <circle cx="0" cy="14" r="10" fill="#b8956a"/>
        <rect x="-7" y="24" width="14" height="26" rx="3" fill="#f59e0b"/>
        <text x="-8" y="56" fill="#ef4444" fontSize="5" fontWeight="700" fontFamily="monospace">150?</text>
      </g>
      <g transform="translate(520, 100)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 038 — The Number Sorter ===== */
function NumberSorterIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="60" y="40" width="350" height="230" rx="4" fill="#2a3d36"/>
      <g transform="translate(80, 60)">
        <text x="0" y="0" fill="#7b9f27" fontSize="7" fontWeight="700">SCORE SORTING</text>
        <text x="0" y="18" fill="#374151" fontSize="6" fontFamily="monospace">Original: 64 34 25 12 22 11 90</text>
        <rect x="0" y="25" width="350" height="2" fill="#3a5650"/>
        <text x="0" y="42" fill="#f59e0b" fontSize="5.5" fontFamily="monospace">Step 1: Compare and swap pairs</text>
        <text x="0" y="58" fill="#374151" fontSize="5.5" fontFamily="monospace">34 64 25 12 22 11 90</text>
        <text x="0" y="110" fill="#10b981" fontSize="6" fontWeight="700" fontFamily="monospace">Final: 11 12 22 25 34 64 90</text>
      </g>
      <g transform="translate(450, 60)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#7b9f27"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#5B3A29"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <line x1="38" y1="38" x2="50" y2="28" stroke="#d4a574" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <g transform="translate(460, 140)">
        <rect x="0" y="0" width="280" height="120" rx="4" fill="#374151"/>
        <rect x="5" y="5" width="270" height="110" rx="3" fill="#111916"/>
        <text x="15" y="18" fill="#7b9f27" fontSize="6" fontWeight="700" fontFamily="monospace">SORTED SCORES</text>
        <rect x="15" y="25" width="30" height="75" rx="2" fill="#10b981" opacity="0.7"/>
        <rect x="55" y="35" width="35" height="65" rx="2" fill="#10b981" opacity="0.75"/>
        <rect x="100" y="42" width="40" height="58" rx="2" fill="#10b981" opacity="0.8"/>
        <rect x="150" y="48" width="45" height="52" rx="2" fill="#10b981" opacity="0.85"/>
        <rect x="205" y="55" width="50" height="45" rx="2" fill="#10b981" opacity="0.9"/>
        <text x="20" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">11</text>
        <text x="60" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">12</text>
        <text x="105" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">22</text>
        <text x="155" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">25</text>
        <text x="210" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">34</text>
      </g>
    </svg>
  );
}

/* ===== CASE 039 — The Temperature Lab ===== */
function TemperatureLabIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="500" height="100" rx="5" fill="#3d5a4f"/>
      <g transform="translate(130, 50)">
        <rect x="0" y="0" width="100" height="120" rx="4" fill="#10b981" opacity="0.15" stroke="#10b981"/>
        <text x="10" y="18" fill="#10b981" fontSize="6" fontWeight="700" fontFamily="monospace">C to F</text>
        <text x="10" y="38" fill="#fff" fontSize="5.5" fontFamily="monospace">100C = 212F</text>
        <text x="10" y="58" fill="#10b981" fontSize="5">CORRECT!</text>
        <rect x="15" y="70" width="70" height="40" rx="3" fill="#1f3029"/>
        <text x="25" y="90" fill="#10b981" fontSize="6" fontFamily="monospace">F = C * 9/5 + 32</text>
      </g>
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="100" height="120" rx="4" fill="#ef4444" opacity="0.15" stroke="#ef4444"/>
        <text x="10" y="18" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="monospace">F to C</text>
        <text x="10" y="38" fill="#fff" fontSize="5.5" fontFamily="monospace">32F = 89.6C?</text>
        <text x="10" y="58" fill="#ef4444" fontSize="5">WRONG!</text>
        <rect x="15" y="70" width="70" height="40" rx="3" fill="#1f3029"/>
        <text x="25" y="86" fill="#ef4444" fontSize="5" fontFamily="monospace">C = F * 9/5 + 32</text>
        <text x="25" y="100" fill="#ef4444" fontSize="5">wrong formula!</text>
      </g>
      <g transform="translate(450, 70)">
        <rect x="0" y="28" width="38" height="52" rx="5" fill="#f59e0b"/>
        <circle cx="19" cy="14" r="14" fill="#d4a574"/>
        <path d="M5 12 Q5 0 19 0 Q33 0 33 12" fill="#2d1f14"/>
        <circle cx="13" cy="14" r="2" fill="#374151"/>
        <circle cx="25" cy="14" r="2" fill="#374151"/>
        <text x="30" y="5" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== CASE 040 — The Score Analyzer ===== */
function ScoreAnalyzerIllustration() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="sp-illustration-svg">
      <rect width="800" height="360" fill="#1a2b25"/>
      <rect width="800" height="280" fill="#1e2f2a"/>
      <rect x="0" y="280" width="800" height="80" fill="#263a34"/>
      <line x1="0" y1="280" x2="800" y2="280" stroke="#3a5650" strokeWidth="2"/>
      <rect x="100" y="180" width="500" height="100" rx="5" fill="#3d5a4f"/>
      <rect x="150" y="30" width="300" height="145" rx="6" fill="#374151"/>
      <rect x="158" y="38" width="284" height="127" rx="3" fill="#111916"/>
      <text x="170" y="56" fill="#7b9f27" fontSize="7" fontWeight="700" fontFamily="monospace">SCORE ANALYZER</text>
      <text x="170" y="74" fill="#fff" fontSize="6" fontFamily="monospace">Scores: 3, 7, 2, 8, 1</text>
      <text x="170" y="90" fill="#10b981" fontSize="6" fontFamily="monospace">Max found: 8 OK</text>
      <text x="170" y="108" fill="#ef4444" fontSize="6" fontFamily="monospace">Empty list: CRASH</text>
      <text x="170" y="124" fill="#ef4444" fontSize="5.5" fontFamily="monospace">IndexError: list index out of range</text>
      <g transform="translate(500, 50)">
        <rect x="0" y="0" width="150" height="120" rx="4" fill="#2a3d36"/>
        <text x="15" y="18" fill="#7b9f27" fontSize="6" fontWeight="700">SCORES</text>
        <rect x="15" y="25" width="30" height="70" rx="2" fill="#3b82f6" opacity="0.5"/>
        <rect x="55" y="45" width="30" height="50" rx="2" fill="#10b981" opacity="0.7"/>
        <rect x="95" y="30" width="30" height="65" rx="2" fill="#ef4444" opacity="0.5"/>
        <text x="20" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">3</text>
        <text x="60" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">7</text>
        <text x="100" y="115" fill="#8c9c96" fontSize="4" fontFamily="monospace">2</text>
      </g>
      <g transform="translate(300, 160)">
        <rect x="0" y="10" width="38" height="48" rx="5" fill="#3b82f6"/>
        <circle cx="19" cy="-2" r="14" fill="#c4956a"/>
        <path d="M5 0 Q5 -12 19 -12 Q33 -12 33 0" fill="#2d1f14"/>
        <circle cx="13" cy="-2" r="2" fill="#374151"/>
        <circle cx="25" cy="-2" r="2" fill="#374151"/>
        <path d="M13 5 Q19 2 25 5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="30" y="-15" fill="#f59e0b" fontSize="14" fontWeight="700">?</text>
      </g>
    </svg>
  );
}

/* ===== ILLUSTRATION MAP ===== */
function makePanels(caseId) {
  return Array.from({ length: 9 }, (_, i) => `${caseId}-p${i + 1}`);
}

const ILLUSTRATION_MAP = {
  'b-syn-1': () => <ComicImage id="b-syn-1" FallbackSVG={BakeryOrderIllustration} alt="The Bakery Order" />,
  'b-syn-2': () => <ComicImage id="b-syn-2" FallbackSVG={LibraryShelfIllustration} alt="The Library Shelf" />,
  'b-syn-3': () => <ComicImage id="b-syn-3" FallbackSVG={PhoneCallIllustration} alt="The Phone Call" />,
  'b-syn-4': () => <ComicImage id="b-syn-4" FallbackSVG={TravelJournalIllustration} alt="Unmatched Quotes" />,
  'b-syn-5': () => <ComicImage id="b-syn-5" FallbackSVG={ScienceLabIllustration} alt="Misspelled Keywords" />,
  'b-syn-6': () => <ComicImage id="b-syn-6" FallbackSVG={GroceryListIllustration} alt="Missing Comma" />,
  'b-syn-7': () => <ComicImage id="b-syn-7" FallbackSVG={ConcertTicketsIllustration} alt="Missing Closing Bracket" />,
  'b-run-1': () => <ComicImage id="b-run-1" FallbackSVG={SchoolCeremonyIllustration} alt="School Ceremony" />,
  'b-run-2': () => <ComicImage id="b-run-2" FallbackSVG={RecipeDisasterIllustration} alt="Recipe Disaster" />,
  'b-run-3': () => <ComicImage id="b-run-3" FallbackSVG={TrainScheduleIllustration} alt="Train Schedule" />,
  'b-run-4': () => <ComicImage id="b-run-4" FallbackSVG={VotingBoothIllustration} alt="Voting Booth" />,
  'b-log-1': () => <ComicImage id="b-log-1" FallbackSVG={PizzaPartyIllustration} alt="Pizza Party" />,
  'b-log-2': () => <ComicImage id="b-log-2" FallbackSVG={ThermostatIllustration} alt="Thermostat" />,
  'b-log-3': () => <ComicImage id="b-log-3" FallbackSVG={ExamScoreIllustration} alt="Exam Score" />,
  'b-log-4': () => <ComicImage id="b-log-4" FallbackSVG={TrafficLightIllustration} alt="Traffic Light" />,
  'e-syn-1': () => <ComicImage id="e-syn-1" panels={makePanels('e-syn-1')} FallbackSVG={RoomOrganizerIllustration} alt="Room Organizer" />,
  'e-syn-2': () => <ComicImage id="e-syn-2" panels={makePanels('e-syn-2')} FallbackSVG={MorningGreetingIllustration} alt="Morning Greeting" />,
  'e-syn-3': () => <ComicImage id="e-syn-3" panels={makePanels('e-syn-3')} FallbackSVG={FruitBasketIllustration} alt="Fruit Basket" />,
  'e-syn-4': () => <ComicImage id="e-syn-4" panels={makePanels('e-syn-4')} FallbackSVG={ScoreCalculatorIllustration} alt="Score Calculator" />,
  'e-run-1': () => <ComicImage id="e-run-1" panels={makePanels('e-run-1')} FallbackSVG={ColorPaletteIllustration} alt="Color Palette" />,
  'e-run-2': () => <ComicImage id="e-run-2" panels={makePanels('e-run-2')} FallbackSVG={ContactCardIllustration} alt="Contact Card" />,
  'e-run-3': () => <ComicImage id="e-run-3" panels={makePanels('e-run-3')} FallbackSVG={TextEditorIllustration} alt="Text Editor" />,
  'e-run-4': () => <ComicImage id="e-run-4" panels={makePanels('e-run-4')} FallbackSVG={DiaryReaderIllustration} alt="Diary Reader" />,
  'e-run-5': () => <ComicImage id="e-run-5" panels={makePanels('e-run-5')} FallbackSVG={ToolboxIllustration} alt="Toolbox" />,
  'e-run-6': () => <ComicImage id="e-run-6" panels={makePanels('e-run-6')} FallbackSVG={ClockAppIllustration} alt="Clock App" />,
  'e-log-1': () => <ComicImage id="e-log-1" panels={makePanels('e-log-1')} FallbackSVG={VotingCounterIllustration} alt="Voting Counter" />,
  'e-log-2': () => <ComicImage id="e-log-2" panels={makePanels('e-log-2')} FallbackSVG={EndlessMeetingIllustration} alt="Endless Meeting" />,
  'e-log-3': () => <ComicImage id="e-log-3" panels={makePanels('e-log-3')} FallbackSVG={InventoryCheckIllustration} alt="Inventory Check" />,
  'e-log-4': () => <ComicImage id="e-log-4" panels={makePanels('e-log-4')} FallbackSVG={ClubEntryIllustration} alt="Club Entry" />,
  'e-log-5': () => <ComicImage id="e-log-5" panels={makePanels('e-log-5')} FallbackSVG={ShoppingBillIllustration} alt="Shopping Bill" />,
  'bu-syn-1': () => <ComicImage id="bu-syn-1" panels={makePanels('bu-syn-1')} FallbackSVG={DataFilterIllustration} alt="Data Filter" />,
  'bu-run-1': () => <ComicImage id="bu-run-1" panels={makePanels('bu-run-1')} FallbackSVG={DictionaryExplorerIllustration} alt="Dictionary Explorer" />,
  'bu-run-2': () => <ComicImage id="bu-run-2" panels={makePanels('bu-run-2')} FallbackSVG={DivisionToolIllustration} alt="Division Tool" />,
  'bu-run-3': () => <ComicImage id="bu-run-3" panels={makePanels('bu-run-3')} FallbackSVG={NumberConverterIllustration} alt="Number Converter" />,
  'bu-log-1': () => <ComicImage id="bu-log-1" panels={makePanels('bu-log-1')} FallbackSVG={BookSearchIllustration} alt="Book Search" />,
  'bu-log-2': () => <ComicImage id="bu-log-2" panels={makePanels('bu-log-2')} FallbackSVG={FruitFinderIllustration} alt="Fruit Finder" />,
  'bu-log-3': () => <ComicImage id="bu-log-3" panels={makePanels('bu-log-3')} FallbackSVG={AgeGateIllustration} alt="Age Gate" />,
  'bu-log-4': () => <ComicImage id="bu-log-4" panels={makePanels('bu-log-4')} FallbackSVG={NumberSorterIllustration} alt="Number Sorter" />,
  'bu-log-5': () => <ComicImage id="bu-log-5" panels={makePanels('bu-log-5')} FallbackSVG={TemperatureLabIllustration} alt="Temperature Lab" />,
  'bu-log-6': () => <ComicImage id="bu-log-6" panels={makePanels('bu-log-6')} FallbackSVG={ScoreAnalyzerIllustration} alt="Score Analyzer" />,
};

export function getIllustration(investigationId) {
  return ILLUSTRATION_MAP[investigationId] || null;
}

export default ILLUSTRATION_MAP;
