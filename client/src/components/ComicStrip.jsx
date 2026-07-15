import React from 'react';

/* Scene background colors */
const SCENE_BG = {
  bakery:'#fff8e7', classroom:'#e8f4f8', traffic:'#e8f5e9', toyshop:'#fce4ec',
  library:'#f3e5d0', supermarket:'#e8f5e9', office:'#e3f2fd', wallet:'#fce4ec',
  stall:'#fffde7', cricket:'#e8f5e9', hotel:'#e3f2fd', hospital:'#e8f5e9',
  school_office:'#e8f4f8', studio:'#f3e5f7', warehouse:'#fff3e0', factory:'#eceff1',
  bus_depot:'#e3f2fd', lost_found:'#fce4ec', gym:'#e8f5e9', call_centre:'#e3f2fd',
  restaurant:'#fff8e7', bank:'#e8f5e9', security_room:'#e8eaf6', accountant:'#e3f2fd',
  ecommerce:'#fce4ec', atm:'#e3f2fd', smart_city:'#e8eaf6', online_shop:'#fce4ec',
  airport:'#e3f2fd', default:'#f5f5f5'
};

/* Scene SVG content (background objects only, no character) */
function SceneBG({ scene, panelNum }) {
  const err = panelNum === 3;
  switch(scene) {
    case 'bakery': return <>
      <rect x="10" y="80" width="120" height="60" rx="4" fill="#c8a96e"/>
      <rect x="20" y="90" width="40" height="40" rx="3" fill={err?"#ef5350":"#ff8f00"}/>
      <rect x="70" y="90" width="40" height="40" rx="3" fill={err?"#ef5350":"#ff8f00"}/>
      <circle cx="40" cy="75" r="12" fill="#f9a825"/><circle cx="65" cy="72" r="10" fill="#f57f17"/>
      <circle cx="88" cy="75" r="11" fill="#f9a825"/>
      {err && <text x="55" y="145" textAnchor="middle" fill="#b71c1c" fontSize="9" fontWeight="bold">CRASH!</text>}
      <rect x="0" y="155" width="160" height="10" fill="#8d6e63"/>
    </>;
    case 'classroom': return <>
      <rect x="5" y="20" width="150" height="90" rx="4" fill={err?"#b71c1c":"#1a237e"}/>
      <rect x="15" y="28" width="130" height="74" rx="2" fill={err?"#c62828":"#283593"}/>
      {!err && <><text x="25" y="50" fill="#a5d6a7" fontSize="8" fontFamily="monospace">score_a = 85</text>
      <text x="25" y="63" fill="#a5d6a7" fontSize="8" fontFamily="monospace">score_b = 72</text>
      <text x="25" y="76" fill="#80cbc4" fontSize="8" fontFamily="monospace">if a &gt; b: ...</text></>}
      {err && <><text x="80" y="60" textAnchor="middle" fill="#ff8a80" fontSize="11" fontWeight="bold">ERROR!</text>
      <text x="80" y="78" textAnchor="middle" fill="#ff8a80" fontSize="8">Wrong result!</text></>}
      <rect x="5" y="112" width="150" height="8" fill="#795548"/>
    </>;
    case 'traffic': return <>
      <rect x="0" y="100" width="160" height="70" fill="#546e7a"/>
      <rect x="60" y="15" width="30" height="90" rx="5" fill="#263238"/>
      <circle cx="75" cy="30" r="11" fill={err?"#ef5350":"#757575"} opacity={err?1:0.4}/>
      <circle cx="75" cy="55" r="11" fill={err?"#757575":"#ff9800"} opacity={err?0.4:1}/>
      <circle cx="75" cy="80" r="11" fill={err?"#757575":"#66bb6a"} opacity={err?0.4:1}/>
      <rect x="10" y="110" width="50" height="25" rx="3" fill="#1565c0"/>
      <rect x="100" y="108" width="50" height="25" rx="3" fill="#c62828"/>
    </>;
    case 'library': return <>
      <rect x="5" y="20" width="145" height="110" rx="3" fill="#5d4037"/>
      {[0,1,2,3,4].map(i=><rect key={i} x={15+i*28} y="30" width="20" height="50" rx="2" fill={['#1565c0','#b71c1c','#2e7d32','#f57f17','#6a1b9a'][i]}/>)}
      {[0,1,2].map(i=><rect key={i} x={15+i*40} y="90" width="28" height="30" rx="2" fill={['#00838f','#ad1457','#558b2f'][i]}/>)}
      {err && <><circle cx="130" cy="50" r="15" fill="#ef5350" opacity="0.9"/>
      <text x="130" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">!</text></>}
    </>;
    case 'hospital': return <>
      <rect x="5" y="15" width="150" height="100" rx="4" fill="white" stroke="#e0e0e0"/>
      <rect x="70" y="5" width="20" height="20" rx="2" fill="#ef5350"/>
      <text x="80" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">+</text>
      {[0,1].map(i=><rect key={i} x={15+i*70} y="50" width="60" height="50" rx="3" fill={err&&i===0?"#ffcdd2":"#e3f2fd"} stroke="#bdbdbd"/>)}
      {err && <text x="45" y="80" textAnchor="middle" fill="#c62828" fontSize="8" fontWeight="bold">URGENT!</text>}
      <rect x="65" y="35" width="30" height="10" rx="2" fill="#42a5f5"/>
    </>;
    case 'restaurant': return <>
      <rect x="5" y="60" width="150" height="80" rx="3" fill="#4e342e"/>
      {[0,1].map(i=><rect key={i} x={15+i*80} y="70" width="60" height="50" rx="2" fill="#6d4c41"/>)}
      <rect x="0" y="55" width="160" height="8" fill="#3e2723"/>
      {err ? <><circle cx="80" cy="100" r="20" fill="#ef5350" opacity="0.9"/>
      <text x="80" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">£0.00!</text></>
      : <><circle cx="45" cy="95" r="18" fill="#fff9c4" stroke="#f9a825" strokeWidth="2"/>
      <circle cx="115" cy="95" r="18" fill="#fff9c4" stroke="#f9a825" strokeWidth="2"/></>}
    </>;
    case 'bank': return <>
      <rect x="5" y="15" width="150" height="110" rx="4" fill="#37474f"/>
      <rect x="30" y="40" width="100" height="70" rx="3" fill="#455a64"/>
      <circle cx="80" cy="75" r="25" fill="none" stroke="#78909c" strokeWidth="4"/>
      <line x1="80" y1="50" x2="80" y2="100" stroke="#78909c" strokeWidth="3"/>
      <line x1="55" y1="75" x2="105" y2="75" stroke="#78909c" strokeWidth="3"/>
      {err && <><rect x="55" y="62" width="50" height="26" rx="4" fill="#ef5350"/>
      <text x="80" y="79" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ERROR!</text></>}
    </>;
    case 'warehouse': return <>
      <rect x="0" y="0" width="160" height="170" fill="#eceff1"/>
      <rect x="5" y="30" width="8" height="130" fill="#78909c"/>
      <rect x="147" y="30" width="8" height="130" fill="#78909c"/>
      {[0,1,2].map(i=><rect key={i} x="5" y={50+i*35} width="150" height="5" fill="#607d8b"/>)}
      {[0,1,2].map(i=>[0,1,2].map(j=><rect key={`${i}${j}`} x={15+j*45} y={55+i*35} width="35" height="25" rx="2" fill={err?"#ef9a9a":"#f57f17"} stroke="#e65100" strokeWidth="1.5"/>))}
    </>;
    case 'factory': return <>
      <rect x="0" y="0" width="160" height="170" fill="#eceff1"/>
      <rect x="5" y="80" width="150" height="40" rx="2" fill="#607d8b"/>
      {[0,1,2,3].map(i=><rect key={i} x={10+i*38} y="85" width="30" height="30" rx="2" fill={err?"#ef5350":"#f57f17"} stroke="#e65100" strokeWidth="2"/>)}
      <rect x="0" y="78" width="160" height="5" fill="#455a64"/>
      <rect x="0" y="118" width="160" height="5" fill="#455a64"/>
      {err && <text x="80" y="145" textAnchor="middle" fill="#b71c1c" fontSize="9" fontWeight="bold">OVERFLOW!</text>}
    </>;
    case 'airport': return <>
      <rect x="0" y="0" width="160" height="170" fill="#e3f2fd"/>
      <rect x="5" y="30" width="150" height="80" rx="4" fill="#0d47a1" opacity="0.8"/>
      <text x="80" y="60" textAnchor="middle" fill="white" fontSize="9">DEPARTURES</text>
      {[0,1,2].map(i=><rect key={i} x="15" y={70+i*12} width="130" height="10" rx="1" fill="white" opacity="0.2"/>)}
      <rect x="20" y="120" width="120" height="30" rx="3" fill="#1565c0"/>
      {err && <text x="80" y="141" textAnchor="middle" fill="#ffcdd2" fontSize="8" fontWeight="bold">BOARDING ERROR</text>}
    </>;
    case 'office': return <>
      <rect x="30" y="60" width="100" height="70" rx="4" fill="#0d1117" stroke="#30363d" strokeWidth="2"/>
      <rect x="37" y="67" width="86" height="55" rx="2" fill={err?"#4a0000":"#001a00"}/>
      {!err ? <><text x="45" y="85" fill="#4ec9b0" fontSize="7" fontFamily="monospace">def process():</text>
      <text x="53" y="97" fill="#9cdcfe" fontSize="7" fontFamily="monospace">  data = fetch()</text>
      <text x="53" y="109" fill="#ce9178" fontSize="7" fontFamily="monospace">  return data</text></>
      : <><text x="80" y="90" textAnchor="middle" fill="#f92672" fontSize="8" fontWeight="bold">TypeError!</text>
      <text x="80" y="105" textAnchor="middle" fill="#f92672" fontSize="7">Line 3 crashed</text></>}
      <rect x="65" y="130" width="30" height="12" fill="#455a64"/>
      <ellipse cx="80" cy="144" rx="28" ry="5" fill="#37474f"/>
    </>;
    default: return <>
      <rect x="20" y="40" width="120" height="80" rx="6" fill={err?"#4a0000":"#0d1117"} stroke="#30363d" strokeWidth="2"/>
      {err && <text x="80" y="85" textAnchor="middle" fill="#ef5350" fontSize="11" fontWeight="bold">ERROR!</text>}
    </>;
  }
}

/* Cartoon character with pose */
function Character({ pose, skinTone='#FFCC99', x=75, y=125 }) {
  const eyeL = pose==='shocked'?<ellipse cx="-7" cy="-4" rx="5" ry="6" fill="white" stroke="#333" strokeWidth="1.5"/>:<circle cx="-7" cy="-3" r="3" fill="#333"/>;
  const eyeR = pose==='shocked'?<ellipse cx="7" cy="-4" rx="5" ry="6" fill="white" stroke="#333" strokeWidth="1.5"/>:<circle cx="7" cy="-3" r="3" fill="#333"/>;
  const mouth = pose==='happy' ? <path d="M-7 5 Q0 11 7 5" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
    : pose==='shocked' ? <ellipse cx="0" cy="7" rx="5" ry="7" fill="#333"/>
    : pose==='focused' ? <line x1="-5" y1="6" x2="5" y2="6" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
    : <path d="M-7 5 Q0 9 7 5" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>;
  const brow = pose==='shocked'
    ? <><path d="M-10 -11 Q-6 -15 -2 -11" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/><path d="M2 -11 Q6 -15 10 -11" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/></>
    : pose==='focused'
    ? <><line x1="-10" y1="-11" x2="-2" y2="-13" stroke="#333" strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="-13" x2="10" y2="-11" stroke="#333" strokeWidth="2" strokeLinecap="round"/></>
    : <><path d="M-10 -12 Q-6 -16 -2 -13" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 -13 Q6 -16 10 -12" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></>;
  const armL = pose==='call' ? <line x1="-14" y1="12" x2="-26" y2="-5" stroke={skinTone} strokeWidth="7" strokeLinecap="round"/> : <line x1="-14" y1="12" x2="-24" y2="28" stroke={skinTone} strokeWidth="7" strokeLinecap="round"/>;
  const armR = pose==='shocked' ? <line x1="14" y1="12" x2="26" y2="-2" stroke={skinTone} strokeWidth="7" strokeLinecap="round"/> : <line x1="14" y1="12" x2="24" y2="28" stroke={skinTone} strokeWidth="7" strokeLinecap="round"/>;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Body */}
      <ellipse cx="0" cy="22" rx="17" ry="22" fill="#4fc3f7" stroke="#333" strokeWidth="1.5"/>
      {armL}{armR}
      {/* Head */}
      <circle cx="0" cy="0" r="18" fill={skinTone} stroke="#333" strokeWidth="2"/>
      {brow}{eyeL}{eyeR}{mouth}
      {/* Hair */}
      <path d="M-18 -5 Q-15 -22 0 -20 Q15 -22 18 -5" fill="#5d4037" stroke="#333" strokeWidth="1.5"/>
      {/* Legs */}
      <line x1="-7" y1="42" x2="-9" y2="60" stroke="#333" strokeWidth="7" strokeLinecap="round"/>
      <line x1="7" y1="42" x2="9" y2="60" stroke="#333" strokeWidth="7" strokeLinecap="round"/>
    </g>
  );
}

/* Speech bubble */
function Bubble({ x, y, w=105, h=42, text, tailDir='left' }) {
  const r = 8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="white" stroke="#222" strokeWidth="2.5"/>
      {tailDir==='left'
        ? <polygon points={`${x+15},${y+h} ${x+5},${y+h+10} ${x+30},${y+h}`} fill="white" stroke="#222" strokeWidth="2" strokeLinejoin="round"/>
        : <polygon points={`${x+w-15},${y+h} ${x+w-5},${y+h+10} ${x+w-30},${y+h}`} fill="white" stroke="#222" strokeWidth="2" strokeLinejoin="round"/>}
      <foreignObject x={x+6} y={y+5} width={w-12} height={h-10}>
        <div style={{fontSize:'7.5px',fontWeight:700,lineHeight:'1.3',color:'#111',fontFamily:'Outfit,sans-serif',overflow:'hidden',height:'100%'}}>
          {text}
        </div>
      </foreignObject>
    </g>
  );
}

/* Single comic panel */
function Panel({ story, panelIndex, panelNum, totalW=320, totalH=200 }) {
  const p = story.panels[panelIndex];
  const bg = SCENE_BG[story.scene] || SCENE_BG.default;
  const charX = panelIndex % 2 === 0 ? 55 : 245;
  const bubX  = panelIndex % 2 === 0 ? 85  : 105;
  const tailDir = panelIndex % 2 === 0 ? 'left' : 'right';

  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      {/* BG */}
      <rect width={totalW} height={totalH} fill={bg}/>
      {/* Scene objects */}
      <SceneBG scene={story.scene} panelNum={panelNum}/>
      {/* Character */}
      <Character pose={p.pose} x={charX} y={130}/>
      {/* Speech bubble */}
      <Bubble x={bubX} y={25} w={105} h={42} text={p.speech} tailDir={tailDir}/>
      {/* Narration strip */}
      <rect x="0" y={totalH-32} width={totalW} height={32} fill="#fffde7" stroke="#f9a825" strokeWidth="2"/>
      <foreignObject x="6" y={totalH-29} width={totalW-12} height={28}>
        <div style={{fontSize:'7px',fontWeight:600,lineHeight:'1.3',color:'#37474f',fontFamily:'Outfit,sans-serif',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
          {p.narration}
        </div>
      </foreignObject>
      {/* Panel border */}
      <rect x="0" y="0" width={totalW} height={totalH} fill="none" stroke="#111" strokeWidth="4"/>
      {/* Panel number */}
      <rect x="6" y="6" width="42" height="15" rx="3" fill="#111"/>
      <text x="27" y="17" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" fontFamily="Outfit,sans-serif">PANEL {panelNum}</text>
    </svg>
  );
}

/* Full 4-panel comic strip */
export default function ComicStrip({ story, question }) {
  const hasImages = story.imagePanels && story.imagePanels.length === 4;

  return (
    <div className="comic-strip-container">
      <div className="comic-strip-header">
        <span className="comic-badge-tag">🎬 Comic Case File</span>
        <h3>{story.title}</h3>
      </div>
      <div className="comic-grid">
        {[0,1,2,3].map(i => (
          <div key={i} className={`comic-panel-container entry-anim delay-${i+1}`}>
            {hasImages ? (
              /* ── Real illustrated image panel ── */
              <div className="comic-img-panel">
                <img
                  src={story.imagePanels[i]}
                  alt={`Panel ${i+1}`}
                  className="comic-img"
                  draggable={false}
                />
                {/* Panel number badge */}
                <div className="comic-img-badge">PANEL {i+1}</div>
                {/* Narration strip */}
                <div className="comic-img-narration">
                  {story.panels[i]?.narration}
                </div>
              </div>
            ) : (
              /* ── SVG fallback panel ── */
              <Panel story={story} panelIndex={i} panelNum={i+1}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
