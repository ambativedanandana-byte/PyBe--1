import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, ChevronRight, Play, RotateCcw, Maximize2 } from 'lucide-react';
import { getScenarioForQuestion } from '../data/scenarioData';
import './InvestigationFlow.css';

/* ─── Python mini-sandbox ─── */
function runPython(code, inputs = {}) {
  try {
    let js = code;
    // inject inputs
    let decl = Object.entries(inputs).map(([k,v]) => `let ${k}=${JSON.stringify(v)};`).join('\n');
    // transpile basics
    js = js.replace(/\bprint\s*\(/g, '__out(');
    js = js.replace(/\bTrue\b/g,'true').replace(/\bFalse\b/g,'false').replace(/\bNone\b/g,'null');
    js = js.replace(/\band\b/g,'&&').replace(/\bor\b/g,'||').replace(/\bnot\b/g,'!');
    js = js.replace(/\belif\b/g,'else if');
    js = js.replace(/\bint\s*\(([^)]+)\)/g,'parseInt($1)');
    js = js.replace(/\bstr\s*\(([^)]+)\)/g,'String($1)');
    js = js.replace(/\bfloat\s*\(([^)]+)\)/g,'parseFloat($1)');
    js = js.replace(/\blen\s*\(([^)]+)\)/g,'($1).length');
    // convert indented blocks
    let lines = js.split('\n'), out = [], indent = [0];
    for (let raw of lines) {
      let t = raw.trimEnd();
      if (!t || t.trim().startsWith('#')) { out.push(t.trim().startsWith('#') ? '//' + t.trim().slice(1) : ''); continue; }
      let sp = t.length - t.trimStart().length;
      while (indent[indent.length-1] > sp) { out.push('}'); indent.pop(); }
      let tr = t.trim();
      if (/^(if|elif|else|while|for|def)\b/.test(tr)) {
        tr = tr.replace(/^elif\b/, 'else if');
        if (tr.endsWith(':')) { tr = tr.slice(0,-1); out.push(tr + ' {'); indent.push(sp+4); continue; }
      }
      // for x in range
      tr = tr.replace(/for (\w+) in range\((\d+)\)/g,'for(let $1=0;$1<$2;$1++)');
      tr = tr.replace(/for (\w+) in range\((\d+),(\d+)\)/g,'for(let $1=$2;$1<$3;$1++)');
      out.push(tr);
    }
    while (indent.length > 1) { out.push('}'); indent.pop(); }
    let logs = [];
    const fn = new Function('__out', decl + '\n' + out.join('\n'));
    fn((...a) => logs.push(a.map(x => x === null ? 'None' : x === true ? 'True' : x === false ? 'False' : String(x)).join(' ')));
    return { ok: true, output: logs.join('\n') };
  } catch(e) { return { ok: false, error: e.message }; }
}

/* ─── Line-numbered code display ─── */
function CodeBlock({ code }) {
  const lines = code.split('\n');
  return (
    <div className="if2-codebox">
      <div className="if2-linenos">{lines.map((_,i) => <div key={i}>{i+1}</div>)}</div>
      <pre className="if2-codepre">{code}</pre>
    </div>
  );
}

function CodeEditor({ code, onChange }) {
  const lines = code.split('\n');
  const taRef = useRef(null);
  const numRef = useRef(null);
  const sync = () => { if(numRef.current && taRef.current) numRef.current.scrollTop = taRef.current.scrollTop; };
  return (
    <div className="if2-codebox">
      <div className="if2-linenos" ref={numRef}>{lines.map((_,i) => <div key={i}>{i+1}</div>)}</div>
      <textarea className="if2-codeeditor" ref={taRef} value={code} onChange={e => onChange(e.target.value)} onScroll={sync} spellCheck={false}/>
    </div>
  );
}

/* ─── Illustrations ─── */
const ILLUS = {
  bakery: <svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="140" rx="12" fill="#fef3c7" opacity="0.5"/><rect x="18" y="95" width="144" height="32" rx="5" fill="#d97706"/><rect x="22" y="87" width="136" height="8" rx="3" fill="#b45309"/><circle cx="55" cy="58" r="15" fill="#fcd34d"/><path d="M40 73 C40 73,55 63,70 73 L74 87 L36 87Z" fill="#d1fae5"/><path d="M43 47 C36 40,47 31,55 36 C63 31,74 40,67 47Z" fill="#fff"/><rect x="45" y="43" width="20" height="4" fill="#fff"/><circle cx="105" cy="103" r="6" fill="#78350f"/><circle cx="122" cy="107" r="5" fill="#78350f"/><circle cx="139" cy="100" r="6" fill="#78350f"/><rect x="95" y="20" width="74" height="48" rx="8" fill="#fff" stroke="#ef4444" strokeWidth="2"/><text x="103" y="37" fill="#ef4444" fontSize="9" fontWeight="bold">⚠ Oops!</text><text x="103" y="50" fill="#374151" fontSize="8">The program</text><text x="103" y="62" fill="#374151" fontSize="8">crashed</text></svg>,
  builder: <svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="140" rx="12" fill="#ecfdf5" opacity="0.5"/><circle cx="60" cy="65" r="16" fill="#fed7aa"/><path d="M42 81 C42 81,60 72,78 81 L82 110 L38 110Z" fill="#3b82f6"/><path d="M42 60 C42 47,78 47,78 60Z" fill="#fbbf24"/><rect x="39" y="58" width="42" height="4" rx="2" fill="#d97706"/><rect x="100" y="78" width="28" height="10" fill="#f87171" rx="2"/><rect x="130" y="78" width="28" height="10" fill="#f87171" rx="2"/><rect x="114" y="66" width="28" height="10" fill="#f87171" rx="2"/><polygon points="148,18 164,48 132,48" fill="#f59e0b"/><text x="146" y="42" fill="#fff" fontSize="13" fontWeight="bold">!</text></svg>,
  school: <svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="140" rx="12" fill="#f0fdf4" opacity="0.5"/><rect x="22" y="18" width="136" height="80" rx="7" fill="#064e3b" stroke="#78350f" strokeWidth="4"/><line x1="18" y1="100" x2="162" y2="100" stroke="#78350f" strokeWidth="3"/><text x="34" y="44" fill="#f3f4f6" fontSize="10" fontFamily="monospace">score = 95</text><text x="34" y="60" fill="#f3f4f6" fontSize="10" fontFamily="monospace">grade = "A"</text><text x="34" y="76" fill="#f3f4f6" fontSize="10" fontFamily="monospace">print(grade)</text><circle cx="140" cy="120" r="11" fill="#fed7aa"/><path d="M124 130 Q140 126,156 130 L158 140 L122 140Z" fill="#ec4899"/><text x="118" y="72" fill="#facc15" fontSize="24" fontWeight="bold">A+</text></svg>,
  default: <svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="140" rx="12" fill="#f1f5f9" opacity="0.8"/><rect x="28" y="24" width="124" height="92" rx="8" fill="#0f172a"/><text x="40" y="52" fill="#a6e22e" fontSize="9" fontFamily="monospace">def fix_me():</text><text x="48" y="68" fill="#66d9e8" fontSize="9" fontFamily="monospace">  x = 5 / 0</text><text x="48" y="84" fill="#f92672" fontSize="9" fontFamily="monospace">  return x</text><circle cx="140" cy="32" r="13" fill="#ef4444" opacity="0.9"/><text x="135" y="37" fill="#fff" fontSize="14" fontWeight="bold">!</text></svg>
};
const Illustration = ({ type }) => <div className="if2-illus">{ILLUS[type] || ILLUS.default}</div>;

/* ─── Inline SVG icons ─── */
const BugIcon = () => <span style={{fontSize:'1rem'}}>🐛</span>;
const PencilIcon = () => <span style={{fontSize:'1rem'}}>✏️</span>;
const FlaskIcon = () => <span style={{fontSize:'1rem'}}>🧪</span>;
const DetectiveIcon = () => <span style={{fontSize:'1.1rem'}}>🕵️</span>;
const HintIcon = () => <span style={{fontSize:'1rem'}}>💡</span>;

const ERR_BADGE = { 'Syntax Error': '#fee2e2,#fca5a5,#991b1b', 'Runtime Error': '#fff7ed,#fed7aa,#9a3412', 'Logical Error': '#eff6ff,#bfdbfe,#1e40af' };

/* ─── Main Component ─── */
export default function InvestigationFlow({ question, onAnswerSubmit, onNext }) {
  const scenario = getScenarioForQuestion(question);

  /* Stage 1 state */
  const [stage, setStage]               = useState(1);
  const [s1ans, setS1ans]               = useState([null,null,null]);
  const [s1done, setS1done]             = useState([false,false,false]);

  /* Stage 2 state */
  const [chalIdx, setChalIdx]           = useState(0);
  const [fixedCodes, setFixedCodes]     = useState(['','','']);
  const [testRows, setTestRows]         = useState([[],[],[]]);
  const [analysisOn, setAnalysisOn]     = useState([false,false,false]);
  const [chalDone, setChalDone]         = useState([false,false,false]);
  const [running, setRunning]           = useState(false);

  /* Stage 3 confetti */
  const [confetti, setConfetti]         = useState([]);

  /* reset on question change */
  useEffect(() => {
    setStage(1); setS1ans([null,null,null]); setS1done([false,false,false]);
    setChalIdx(0); setChalDone([false,false,false]); setAnalysisOn([false,false,false]);
    if (scenario) {
      const codes = scenario.step2.challenges.map(c => c.snippet);
      setFixedCodes(codes);
      setTestRows(scenario.step2.challenges.map(c => c.tests.map(t => ({ ...t, status:'not-run', actual:'' }))));
    }
  }, [question.id]);

  useEffect(() => {
    if (stage === 3) setConfetti(Array.from({length:36},(_,i) => ({ id:i, left:Math.random()*100, delay:Math.random()*2.5, color:['#fbbf24','#3b82f6','#10b981','#ec4899','#f97316'][i%5] })));
  }, [stage]);

  if (!scenario) return null;
  const { step1, step2, step3 } = scenario;

  /* ── Stage 1 helpers ── */
  const pickS1 = (qi, oi) => { if (s1done[qi]) return; setS1ans(a => { const n=[...a]; n[qi]=oi; return n; }); };
  const checkS1 = qi => { if (s1ans[qi] === null) return; setS1done(d => { const n=[...d]; n[qi]=true; return n; }); };
  const s1AllDone = s1done.every(Boolean);

  /* ── Stage 2 helpers ── */
  const ch = step2.challenges[chalIdx];
  const curTests = testRows[chalIdx] || [];
  const curCode = fixedCodes[chalIdx] || '';
  const curAnalysis = analysisOn[chalIdx];
  const curDone = chalDone[chalIdx];

  const resetCode = () => {
    setFixedCodes(f => { const n=[...f]; n[chalIdx]=ch.snippet; return n; });
    setTestRows(r => { const n=[...r]; n[chalIdx]=ch.tests.map(t=>({...t,status:'not-run',actual:''})); return n; });
    setAnalysisOn(a => { const n=[...a]; n[chalIdx]=false; return n; });
  };

  const runCode = () => {
    setRunning(true);
    setTimeout(() => {
      const res = runPython(fixedCodes[chalIdx], {});
      const lines = res.output ? res.output.split('\n') : [];
      setTestRows(r => {
        const n=[...r];
        n[chalIdx] = ch.tests.map((t,i) => {
          const actual = res.ok ? (lines[i] || '').trim() : (res.error||'Error');
          const passed = res.ok && actual === String(t.expected).trim();
          return { ...t, status: passed ? 'pass' : 'fail', actual };
        });
        return n;
      });
      setRunning(false);
    }, 700);
  };

  const runAllTests = () => {
    setRunning(true);
    setTimeout(() => {
      let allPass = true;
      const newRows = ch.tests.map(t => {
        const res = runPython(fixedCodes[chalIdx], t.inputs || {});
        const actual = res.ok ? res.output.trim() : (res.error || 'Error');
        const passed = res.ok && actual === String(t.expected).trim();
        if (!passed) allPass = false;
        return { ...t, status: passed ? 'pass' : 'fail', actual };
      });
      setTestRows(r => { const n=[...r]; n[chalIdx]=newRows; return n; });
      if (allPass) {
        setAnalysisOn(a => { const n=[...a]; n[chalIdx]=true; return n; });
        setChalDone(d => { const n=[...d]; n[chalIdx]=true; return n; });
      }
      setRunning(false);
    }, 700);
  };

  const goNextChallenge = () => {
    if (chalIdx < 2) setChalIdx(chalIdx + 1);
    else setStage(3);
  };

  const handleFinalNext = async () => {
    await onAnswerSubmit(question.id, question.correctAnswer);
    onNext();
  };

  const [bg, border, color] = (ERR_BADGE[ch?.errorType] || ERR_BADGE['Logical Error']).split(',');

  /* ════════════════════════════════════ RENDER ════════════════════════════════════ */
  return (
    <div className="if2-wrap">

      {/* ── STEP BAR ── */}
      <div className="if2-stepbar">
        {['Real-Life Scenario','Investigation Room','Case Closed'].map((l,i) => (
          <div key={i} className={`if2-step ${stage===i+1?'if2-step-on':stage>i+1?'if2-step-done':''}`}>
            <span className="if2-step-n">{stage>i+1?'✓':i+1}</span><span>{l}</span>
          </div>
        ))}
      </div>

      {/* ══════════ STAGE 1 ══════════ */}
      {stage === 1 && (
        <div className="if2-s1">
          <div className="if2-scenario-row">
            <Illustration type={scenario.illustration}/>
            <div className="if2-scenario-txt">
              <span className="if2-tag">📋 Incident Report</span>
              <h2 className="if2-sc-title">{scenario.title}</h2>
              <p className="if2-sc-body">{scenario.scenarioText}</p>
            </div>
          </div>

          <div className="if2-qs-head"><HelpCircle size={18}/> Answer 3 Questions About This Scenario</div>

          {step1.questions.map((qObj,qi) => {
            const done = s1done[qi];
            const sel = s1ans[qi];
            const ok = sel === qObj.correct;
            return (
              <div key={qi} className="if2-qcard">
                <div className="if2-qnum">Q{qi+1}</div>
                <div style={{flex:1}}>
                  <p className="if2-qtext">{qObj.q}</p>
                  <div className="if2-opts4">
                    {qObj.options.map((opt,oi) => {
                      let cls='if2-opt';
                      if (sel===oi) cls+=done?(ok?' if2-opt-ok':oi===qObj.correct?' if2-opt-ok':' if2-opt-no'):' if2-opt-sel';
                      else if(done&&oi===qObj.correct) cls+=' if2-opt-ok';
                      return <button key={oi} className={cls} onClick={()=>pickS1(qi,oi)} disabled={done}><span className="if2-ltr">{String.fromCharCode(65+oi)}</span>{opt}</button>;
                    })}
                  </div>
                  {done && <div className={`if2-fb ${ok?'if2-fb-ok':'if2-fb-no'}`}>{ok?'✅ Correct!':'❌ Incorrect — correct: '+qObj.options[qObj.correct]}</div>}
                  {!done && <div style={{textAlign:'right',marginTop:8}}><button className="if2-check-btn" onClick={()=>checkS1(qi)} disabled={sel===null}>Check Answer</button></div>}
                </div>
              </div>
            );
          })}

          {s1AllDone && <div style={{textAlign:'right',marginTop:8}}><button className="if2-primary" onClick={()=>setStage(2)}>Enter Investigation Room <ChevronRight size={15}/></button></div>}
        </div>
      )}

      {/* ══════════ STAGE 2 ══════════ */}
      {stage === 2 && ch && (
        <div className="if2-s2">

          {/* Challenge tabs */}
          <div className="if2-chal-tabs">
            {step2.challenges.map((c,i) => (
              <button key={i} className={`if2-tab ${chalIdx===i?'if2-tab-on':''} ${chalDone[i]?'if2-tab-done':''}`} onClick={()=>setChalIdx(i)}>
                {chalDone[i]?'✅ ':''}Challenge {i+1}: {c.errorType}
              </button>
            ))}
          </div>

          {/* Mission + Illustration row */}
          <div className="if2-top-row">
            <div className="if2-mission-card">
              <div className="if2-mission-head">🎯 Your Mission</div>
              <div className="if2-mission-list">
                {['Find the bug in the code.','Fix the bug.','Run your code.','Pass all test cases.'].map((m,i)=>(
                  <div key={i} className="if2-mission-item"><CheckCircle2 size={14} color="#10b981"/> {m}</div>
                ))}
              </div>
            </div>
            <div className="if2-illus-top">
              {ILLUS[scenario.illustration] || ILLUS.default}
            </div>
          </div>

          {/* Error type badge */}
          <div className="if2-err-badge-row">
            <span className="if2-err-badge" style={{background:bg,borderColor:border,color}}>{ch.errorType}</span>
            <span className="if2-chal-title">{ch.title}</span>
          </div>

          {/* Code panels */}
          <div className="if2-code-cols">
            {/* Buggy code — read only */}
            <div className="if2-code-panel">
              <div className="if2-code-head-bar">
                <span><BugIcon/> Buggy Code</span>
              </div>
              <CodeBlock code={ch.snippet}/>
              <div className="if2-crash-box">
                <span>⚠️</span>
                <span>The program crashed when it was run. Somewhere in the code, there is a bug!</span>
              </div>
            </div>

            {/* Fix the code — editable */}
            <div className="if2-code-panel">
              <div className="if2-code-head-bar" style={{justifyContent:'space-between'}}>
                <span><PencilIcon/> Fix the Code</span>
                <Maximize2 size={14} color="#8b949e"/>
              </div>
              <CodeEditor code={curCode} onChange={v => setFixedCodes(f=>{ const n=[...f]; n[chalIdx]=v; return n; })}/>
              <div className="if2-run-row">
                <button className="if2-run-btn" onClick={runCode} disabled={running || curDone}>
                  <Play size={14} fill="currentColor"/> {running ? 'Running…' : 'Run Code'}
                </button>
                <button className="if2-reset-btn" onClick={resetCode} disabled={running || curDone}>
                  <RotateCcw size={14}/> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Test suite */}
          <div className="if2-test-card">
            <div className="if2-test-head"><FlaskIcon/> Test Your Code</div>
            <table className="if2-table">
              <thead><tr><th>Test Case</th><th>Input</th><th>Expected Output</th><th>Your Output</th><th>Status</th></tr></thead>
              <tbody>
                {curTests.map((t,i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><code>{t.inputLabel || JSON.stringify(t.inputs||{})}</code></td>
                    <td>{t.expected}</td>
                    <td>{t.status==='not-run'?'–':t.actual}</td>
                    <td>
                      {t.status==='not-run' && <span className="if2-st-nr">⏳ Not Run</span>}
                      {t.status==='pass'    && <span className="if2-st-ok"><CheckCircle2 size={13}/> Passed</span>}
                      {t.status==='fail'    && <span className="if2-st-no"><XCircle size={13}/> Failed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="if2-hint-row">
              <div className="if2-hint"><HintIcon/> <span><b>Hint:</b> {ch.hint}</span></div>
              <button className="if2-run-all-btn" onClick={runAllTests} disabled={running || curDone}>
                <Play size={14} fill="currentColor"/> {running?'Running…':'Run All Tests'}
              </button>
            </div>
          </div>

          {/* Detective Analysis */}
          <div className={`if2-analysis-card ${curAnalysis?'if2-analysis-on':''}`}>
            <div className="if2-analysis-head"><DetectiveIcon/> Detective Analysis {!curAnalysis && <span className="if2-analysis-hint">(will appear after all tests pass)</span>}</div>
            <div className="if2-analysis-grid">
              {[['⚠️ Error Type', curAnalysis?ch.analysis.errorType:'–'],
                ['📍 Bug Location', curAnalysis?ch.analysis.location:'–'],
                ['❓ Why it happened', curAnalysis?ch.analysis.why:'–'],
                ['✅ Why your fix works', curAnalysis?ch.analysis.fix:'–']].map(([label,val],i) => (
                <div key={i} className={`if2-a-field ${curAnalysis && i===3?'if2-a-field-ok':''}`}>
                  <div className="if2-a-label">{label}</div>
                  <div className="if2-a-val">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue */}
          {curDone && (
            <div style={{textAlign:'center',marginTop:8}}>
              <button className="if2-continue-btn" onClick={goNextChallenge}>
                {chalIdx<2 ? `Continue to Challenge ${chalIdx+2} →` : 'Close the Case 🏆'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══════════ STAGE 3 ══════════ */}
      {stage === 3 && (
        <div className="if2-s3">
          <div className="if2-confetti-wrap">
            {confetti.map(p=><div key={p.id} className="if2-cp" style={{left:`${p.left}%`,animationDelay:`${p.delay}s`,background:p.color}}/>)}
          </div>
          <div className="if2-celebrate">
            <div className="if2-badge">🏆</div>
            <h1 className="if2-cel-title">CASE CLOSED!</h1>
            <p className="if2-cel-sub">You found and fixed all 3 bugs in the <b style={{color:'#fff',textTransform:'capitalize'}}>{question.topic}</b> challenge.</p>
          </div>
          <div className="if2-sum-card">
            <div className="if2-sum-head"><Award size={17}/> What You Learned</div>
            {step3.learned.map((l,i)=><div key={i} className="if2-learned"><CheckCircle2 size={14} color="#10b981"/> {l}</div>)}
          </div>
          <div className="if2-tip-card">
            <span style={{fontSize:'1.8rem'}}>💡</span>
            <div><b className="if2-tip-title">Remember:</b><p className="if2-tip-txt">{step3.tip}</p></div>
          </div>
          <div className="if2-rewards">
            {[['✨',`+${question.level==='Beginner'?10:question.level==='Explorer'?20:30} XP`,'Earned'],['🥇','Badge','Unlocked'],['🔥','Streak','Continued'],['📈','Progress','Updated']].map(([e,v,l],i)=>(
              <div key={i} className="if2-rchip"><span style={{fontSize:'1.5rem'}}>{e}</span><strong>{v}</strong><small>{l}</small></div>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
            <button className="if2-outline-btn" onClick={()=>setStage(1)}>Review Case</button>
            <button className="if2-primary" onClick={handleFinalNext}>Next Mission →</button>
          </div>
        </div>
      )}
    </div>
  );
}
