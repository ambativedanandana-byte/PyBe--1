import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Flame, Zap, Trophy, Star, Clock, ChevronRight,
  RotateCcw, Lightbulb, CheckCircle, XCircle, Calendar, ArrowLeft
} from "lucide-react";

/* =============================================================
   CHALLENGE DATA  - 30 fill-in-the-blank Python kata
   Segment types:
     { t: "text" }   -> plain code text
     { b: "answer" } -> blank input  (correct value = b)
============================================================= */
const ALL_CHALLENGES = [
  // BEGINNER
  { id:1,  concept:"variables",    difficulty:"Beginner",
    desc:"A student stores their bag weight. Fill in the assignment operator.",
    lines:[[{t:"bag_weight "},{b:"="},{t:" 5.2"}],[{t:"print(bag_weight)"}]],
    hint:"Use = to assign a value to a variable" },
  { id:2,  concept:"strings",      difficulty:"Beginner",
    desc:"Store a learner name as a text value.",
    lines:[[{t:"name = "},{b:'"Riya"'}],[{t:"print(name)"}]],
    hint:"Strings in Python are wrapped in quotes" },
  { id:3,  concept:"conditionals", difficulty:"Beginner",
    desc:"Check if a score is passing. Write the condition keyword.",
    lines:[[{b:"if"},{t:" score >= 50:"}],[{t:'    print("Pass")'}]],
    hint:"The keyword that starts a condition in Python" },
  { id:4,  concept:"conditionals", difficulty:"Beginner",
    desc:"Add the alternative branch for a failing score.",
    lines:[[{t:"if score >= 50:"}],[{t:'    print("Pass")'}],[{b:"else"},{t:":"}],[{t:'    print("Fail")'}]],
    hint:"The keyword for the alternative branch" },
  { id:5,  concept:"arithmetic",   difficulty:"Beginner",
    desc:"A baker totals two item prices.",
    lines:[[{t:"samosa = 10"}],[{t:"juice = 15"}],[{t:"total = samosa "},{b:"+"},{t:" juice"}],[{t:"print(total)"}]],
    hint:"The addition operator in Python" },
  { id:6,  concept:"arithmetic",   difficulty:"Beginner",
    desc:"Calculate the area of a floor board.",
    lines:[[{t:"length = 10"}],[{t:"width = 5"}],[{t:"area = length "},{b:"*"},{t:" width"}],[{t:"print(area)"}]],
    hint:"The multiplication operator" },
  { id:7,  concept:"lists",        difficulty:"Beginner",
    desc:"Create an empty shopping list.",
    lines:[[{t:"shopping = "},{b:"[]"}],[{t:"print(shopping)"}]],
    hint:"An empty list uses square brackets with nothing inside" },
  { id:8,  concept:"lists",        difficulty:"Beginner",
    desc:"Find how many students are present today.",
    lines:[[{t:'students = ["Riya", "Ali", "Sam"]'}],[{t:"count = "},{b:"len"},{t:"(students)"}],[{t:"print(count)"}]],
    hint:"The built-in function that returns the number of items" },
  { id:9,  concept:"output",       difficulty:"Beginner",
    desc:"Display the learner name on screen.",
    lines:[[{t:'name = "Mano"'}],[{b:"print"},{t:"(name)"}]],
    hint:"The function used to display output in Python" },
  { id:10, concept:"booleans",     difficulty:"Beginner",
    desc:"Store whether it is raining today.",
    lines:[[{t:"is_raining = "},{b:"True"}],[{t:"print(is_raining)"}]],
    hint:"Python booleans start with a capital letter: True or False" },
  // EXPLORER
  { id:11, concept:"loops",        difficulty:"Explorer",
    desc:"Print each item in a shopping cart.",
    lines:[[{b:"for"},{t:" item in cart:"}],[{t:"    print(item)"}]],
    hint:"The keyword that starts a for-loop" },
  { id:12, concept:"loops",        difficulty:"Explorer",
    desc:"Repeat a water reminder exactly 5 times.",
    lines:[[{t:"for i in "},{b:"range"},{t:"(5):"}],[{t:'    print("Drink water!")'}]],
    hint:"The built-in that generates a sequence of numbers" },
  { id:13, concept:"loops",        difficulty:"Explorer",
    desc:"Keep prompting until a positive number is entered.",
    lines:[[{b:"while"},{t:" number <= 0:"}],[{t:'    number = int(input("Enter: "))'}]],
    hint:"The loop that runs as long as a condition is True" },
  { id:14, concept:"lists",        difficulty:"Explorer",
    desc:"Add a new fruit to the end of the list.",
    lines:[[{t:'fruits = ["apple", "banana"]'}],[{t:"fruits."},{b:"append"},{t:'("mango")'}],[{t:"print(fruits)"}]],
    hint:"The list method that adds an item to the end" },
  { id:15, concept:"strings",      difficulty:"Explorer",
    desc:"Convert a name to uppercase for a name tag.",
    lines:[[{t:'name = "riya"'}],[{t:"tag = name."},{b:"upper"},{t:"()"}],[{t:"print(tag)"}]],
    hint:"The string method that converts all letters to capitals" },
  { id:16, concept:"strings",      difficulty:"Explorer",
    desc:"Split a sentence into individual words.",
    lines:[[{t:'sentence = "Python is fun"'}],[{t:"words = sentence."},{b:"split"},{t:"()"}],[{t:"print(words)"}]],
    hint:"The string method that breaks text by spaces" },
  { id:17, concept:"dictionaries", difficulty:"Explorer",
    desc:"Look up the chalk count from classroom supplies.",
    lines:[[{t:'supplies = {"chalk": 20, "markers": 5}'}],[{t:"count = supplies"},{b:'["chalk"]'}],[{t:"print(count)"}]],
    hint:"Use square brackets with the key name in quotes" },
  { id:18, concept:"functions",    difficulty:"Explorer",
    desc:"Define a reusable greeting function.",
    lines:[[{b:"def"},{t:" greet(name):"}],[{t:'    return "Hello " + name'}]],
    hint:"The keyword used to define a function in Python" },
  { id:19, concept:"functions",    difficulty:"Explorer",
    desc:"Send back the result from the function.",
    lines:[[{t:"def double(x):"}],[{t:"    "},{b:"return"},{t:" x * 2"}]],
    hint:"The keyword that sends a value back from a function" },
  { id:20, concept:"functions",    difficulty:"Explorer",
    desc:"Call the greet function with a name.",
    lines:[[{t:"def greet(name):"}],[{t:'    return "Hello " + name'}],[{t:"result = "},{b:"greet"},{t:'("Riya")'}],[{t:"print(result)"}]],
    hint:"To call a function write its name followed by parentheses" },
  // BUILDER
  { id:21, concept:"functions",    difficulty:"Builder",
    desc:"Add a width parameter to the area function.",
    lines:[[{t:"def area(length, "},{b:"width"},{t:"):"}],[{t:"    return length * width"}]],
    hint:"Parameters are variable names inside the function parentheses" },
  { id:22, concept:"functions",    difficulty:"Builder",
    desc:"Set Guest as the default name when none is given.",
    lines:[[{t:"def greet(name"},{b:'="Guest"'},{t:"):"}],[{t:'    return "Hello " + name'}]],
    hint:"Default values use = inside the parameter definition" },
  { id:23, concept:"comprehension",difficulty:"Builder",
    desc:"Build a list of squares in one line.",
    lines:[[{t:"nums = [1, 2, 3, 4, 5]"}],[{t:"squares = ["},{b:"x**2"},{t:" for x in nums]"}],[{t:"print(squares)"}]],
    hint:"The expression before for transforms each element" },
  { id:24, concept:"error handling",difficulty:"Builder",
    desc:"Safely wrap code that might fail.",
    lines:[[{b:"try"},{t:":"}],[{t:"    result = 10 / 0"}],[{t:"except ZeroDivisionError:"}],[{t:'    print("Cannot divide by zero")'}]],
    hint:"The keyword that starts a protected code block" },
  { id:25, concept:"error handling",difficulty:"Builder",
    desc:"Catch a ValueError when converting text to a number.",
    lines:[[{t:"try:"}],[{t:'    age = int("abc")'}],[{b:"except"},{t:" ValueError:"}],[{t:'    print("Not a valid number")'}]],
    hint:"The keyword that handles specific error types" },
  { id:26, concept:"classes",      difficulty:"Builder",
    desc:"Create a Student blueprint using a class.",
    lines:[[{b:"class"},{t:" Student:"}],[{t:"    def __init__(self, name):"}],[{t:"        self.name = name"}]],
    hint:"The keyword that defines a new type or blueprint in Python" },
  { id:27, concept:"classes",      difficulty:"Builder",
    desc:"Write the constructor method name.",
    lines:[[{t:"class Student:"}],[{t:"    def __"},{b:"init"},{t:"__(self, name):"}],[{t:"        self.name = name"}]],
    hint:"The constructor method runs when a new object is created" },
  { id:28, concept:"lambda",       difficulty:"Builder",
    desc:"Create a one-line function that doubles a number.",
    lines:[[{t:"double = "},{b:"lambda"},{t:" x: x * 2"}],[{t:"print(double(5))"}]],
    hint:"The keyword for anonymous one-line functions" },
  { id:29, concept:"type convert", difficulty:"Builder",
    desc:"Convert the text 25 into an integer.",
    lines:[[{t:'age_text = "25"'}],[{t:"age = "},{b:"int"},{t:"(age_text)"}],[{t:"print(age + 1)"}]],
    hint:"The built-in function that converts a value to an integer" },
  { id:30, concept:"f-strings",    difficulty:"Builder",
    desc:"Build a formatted message with an f-string prefix.",
    lines:[[{t:'name = "Mano"'}],[{t:"score = 92"}],[{t:"msg = "},{b:"f"},{t:'"Hello {name}, scored {score}!"'}],[{t:"print(msg)"}]],
    hint:"f-strings start with the letter f before the opening quote" },
];

const TIMER_SEC  = 60;
const BASE_XP    = 20;
const TIME_BONUS = 10;

// -- Helpers ---------------------------------------------------
function getDailyChallenges() {
  const day    = Math.floor(Date.now() / 86400000);
  const offset = (day * 5) % ALL_CHALLENGES.length;
  return Array.from({ length: 5 }, (_, i) =>
    ALL_CHALLENGES[(offset + i) % ALL_CHALLENGES.length]
  );
}

function getComboInfo(count) {
  if (count >= 5) return { label: "🔥 3x COMBO", mult: 3, cls: "cmax" };
  if (count >= 3) return { label: "⚡ 2x Combo", mult: 2, cls: "chigh" };
  if (count >= 1) return { label: "👍 On a roll!", mult: 1, cls: "clow" };
  return { label: "", mult: 1, cls: "" };
}

function processLines(ch) {
  let bi = 0;
  return ch.lines.map(line =>
    line.map(seg => {
      if ("t" in seg) return { k: "txt", v: seg.t };
      const idx = bi++;
      return { k: "inp", idx, ans: seg.b };
    })
  );
}

function loadStreak() {
  try {
    const raw = localStorage.getItem("pybe_kata_history");
    const history = raw ? JSON.parse(raw) : [];
    if (!history || history.length === 0) return { n: 0, today: false, history: [] };
    
    const sorted = [...new Set(history)].sort((a,b) => new Date(b) - new Date(a));
    const todayStr = new Date().toDateString();
    const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
    
    let currentStreak = 0;
    let hasToday = sorted[0] === todayStr;
    
    if (!hasToday && sorted[0] !== yesterdayStr) {
       return { n: 0, today: false, history: sorted };
    }
    
    let expectedTime = new Date(hasToday ? todayStr : yesterdayStr).getTime();
    for (const dateStr of sorted) {
      if (new Date(dateStr).getTime() === expectedTime) {
        currentStreak++;
        expectedTime -= 86400000;
      } else {
        break;
      }
    }
    return { n: currentStreak, today: hasToday, history: sorted };
  } catch { return { n: 0, today: false, history: [] }; }
}

function saveHistory(historyArray) {
  localStorage.setItem("pybe_kata_history", JSON.stringify(historyArray));
}

function loadXP()    { return parseInt(localStorage.getItem("pybe_kata_xp") || "0", 10); }
function saveXP(xp)  { localStorage.setItem("pybe_kata_xp", String(xp)); }


const SNAKE_PATH = [
  0, 1, 2, 3, 4, 5, 6,
  13, 12, 11, 10, 9, 8, 7,
  14, 15, 16, 17, 18, 19, 20,
  27, 26, 25, 24, 23, 22, 21
];

// -- Main Component --------------------------------------------

export default function PracticePage() {
  const [phase,    setPhase]    = useState("intro");
  const daily                   = useMemo(getDailyChallenges, []);
  const [ci,       setCi]       = useState(0);
  const [inputs,   setInputs]   = useState({});
  const [done,     setDone]     = useState(false);
  const [results,  setResults]  = useState({});
  const [timeLeft, setTimeLeft] = useState(TIMER_SEC);
  const [combo,    setCombo]    = useState(0);
  const [sxp,      setSxp]      = useState(0);
  const [scorrect, setScorrect] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [shake,    setShake]    = useState(false);

  const [snakePos, setSnakePos] = useState(0);

  useEffect(() => {
    if (phase !== "intro") return;
    const interval = setInterval(() => {
      setSnakePos(p => (p + 1) % 28);
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  const snakeLen = 4;
  const snakeBody = Array.from({length: snakeLen}).map((_, i) => SNAKE_PATH[(snakePos - i + 28) % 28]);
  const snakeHead = snakeBody[0];

  const [xpBurst,  setXpBurst]  = useState(null);
  const [streak,   setStreak]   = useState(loadStreak);
  const [totalXP,  setTotalXP]  = useState(loadXP);

  // Refs for latest values (avoids stale closures in timer)
  const inputsRef   = useRef({});
  const doneRef     = useRef(false);
  const comboRef    = useRef(0);
  const timeLeftRef = useRef(TIMER_SEC);
  const hintUsedRef = useRef(false);
  const totalXPRef  = useRef(loadXP());
  const submitRef   = useRef(null);

  useEffect(() => { inputsRef.current   = inputs;   }, [inputs]);
  useEffect(() => { doneRef.current     = done;     }, [done]);
  useEffect(() => { comboRef.current    = combo;    }, [combo]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { hintUsedRef.current = hintUsed; }, [hintUsed]);

  const ch        = daily[ci];
  const processed = useMemo(() => processLines(ch), [ch]);
  const blanks    = useMemo(() => processed.flat().filter(s => s.k === "inp"), [processed]);

  // Reset on challenge change
  useEffect(() => {
    if (phase !== "playing") return;
    setInputs({});       inputsRef.current   = {};
    setDone(false);      doneRef.current     = false;
    setResults({});
    setTimeLeft(TIMER_SEC); timeLeftRef.current = TIMER_SEC;
    setShowHint(false);
    setHintUsed(false);  hintUsedRef.current = false;
    setShake(false);
  }, [ci, phase]);

  // Submit
  function submit(timedOut) {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    const cur = inputsRef.current;
    const res = {};
    let allOk = true;
    blanks.forEach(b => {
      const user = (cur[b.idx] || "").trim();
      const ok   = user.toLowerCase() === b.ans.trim().toLowerCase();
      res[b.idx] = ok ? "ok" : "bad";
      if (!ok) allOk = false;
    });
    setResults(res);
    if (allOk && !timedOut) {
      setScorrect(c => c + 1);
      setCombo(c => { const n = c + 1; comboRef.current = n; return n; });
      
      // Only award XP if not already completed today
      if (!streak.today) {
        const { mult } = getComboInfo(comboRef.current);
        let earned = BASE_XP * mult;
        if (timeLeftRef.current > 30) earned += TIME_BONUS;
        if (hintUsedRef.current)      earned = Math.max(5, earned - 10);
        
        setSxp(x => x + earned);
        const nxp = totalXPRef.current + earned;
        setTotalXP(nxp); totalXPRef.current = nxp; saveXP(nxp);
        setXpBurst(earned);
        setTimeout(() => setXpBurst(null), 1400);
      }
    } else if (!allOk) {
      setCombo(0); comboRef.current = 0;
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  // Keep submitRef up to date
  useEffect(() => { submitRef.current = submit; });

  // Timer (setTimeout chain)
  const timerActive = phase === "playing" && !done;
  useEffect(() => {
    if (!timerActive) return;
    const id = setTimeout(() => {
      setTimeLeft(t => {
        const next = Math.max(0, t - 1);
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [timerActive, timeLeft, ci]);

  // Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && phase === "playing" && !doneRef.current) {
      submitRef.current(true);
    }
  }, [timeLeft, phase]);

  function handleNext() {
    if (ci < daily.length - 1) {
      setCi(c => c + 1);
    } else {
      const hist = [...(streak.history || [])];
      const todayStr = new Date().toDateString();
      if (!hist.includes(todayStr)) {
        hist.unshift(todayStr);
        saveHistory(hist);
        const updated = loadStreak();
        setStreak(updated);
      }
      setPhase("end");
    }
  }

  function handleStart() {
    setCi(0); setCombo(0); comboRef.current = 0;
    setSxp(0); setScorrect(0);
    setPhase("playing");
  }

  const ci_info   = getComboInfo(combo);
  const timerPct  = (timeLeft / TIMER_SEC) * 100;
  const timerCol  = timerPct > 50 ? "#a3e635" : timerPct > 25 ? "#facc15" : "#ef4444";
  const allFilled = blanks.every(b => (inputs[b.idx] || "").trim().length > 0);
  const isAllOk   = done && blanks.every(b => results[b.idx] === "ok");
  const hasWrong  = done && blanks.some(b  => results[b.idx] === "bad");

  // -- INTRO --------------------------------------------------
  if (phase === "intro") return (
    <section className="workspace">
      <div className="pkt-intro-wrap">
        
        {/* Left Column */}
        <div className="pkt-intro-left">
          <div className="pkt-hero-card pkt-fade-in-up pkt-hero-bg" style={{ animationDelay: '0.1s' }}>
            <div className="pkt-hero-content">
              <div className="pkt-hero-badge">
                <Flame size={28} className="pkt-hero-badge-icon" />
                <div className="pkt-streak-bubble">{streak.n}</div>
              </div>
              <h1 className="pkt-intro-h1">Daily Code Kata</h1>
              <p className="pkt-intro-sub">
                5 short Python fill-in-the-blank challenges to build muscle memory.
                <span className="pkt-intro-rule">
                  <span className="pkt-intro-rule-chip">Type only</span>
                  <span className="pkt-intro-rule-chip">No copy-paste</span>
                  <span className="pkt-intro-rule-chip">60s per challenge</span>
                </span>
              </p>
              
              <button className="pkt-start-btn pkt-pulse-btn" onClick={handleStart}>
                <Zap size={18} /> {streak.today ? "Practice Again" : "Start Today's Kata"}
              </button>
              {streak.today && (
                <p className="pkt-done-today" style={{ marginTop: '12px' }}>
                  You have already completed today's set.<br/>New challenges tomorrow!
                </p>
              )}
            </div>
          </div>

          <div className="pkt-stats-row">
            <div className="pkt-stat-card pkt-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="pkt-stat-val">{streak.n}</span>
              <span className="pkt-stat-lbl">Day Streak</span>
            </div>
            <div className="pkt-stat-card pkt-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="pkt-stat-val">{totalXP}</span>
              <span className="pkt-stat-lbl">Total XP</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="pkt-intro-right">
          <div className="pkt-streak-calendar pkt-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="pkt-cal-title">Activity Calendar</p>
            <div className="pkt-cal-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={"hdr"+i} className="pkt-cal-hdr">{d}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => {
                const dObj = new Date(Date.now() - (27 - i) * 86400000);
                const dStr = dObj.toDateString();
                const isActive = (streak.history || []).includes(dStr);
                const isHead = i === snakeHead;
                const isBody = snakeBody.includes(i);
                
                let cls = `pkt-cal-day ${isActive ? 'active' : ''}`;
                if (isHead) cls += ' pkt-snake-head';
                else if (isBody) cls += ' pkt-snake-body';

                return (
                  <div key={i} className={cls} title={dStr}>
                    {dObj.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  // -- END ----------------------------------------------------
  if (phase === "end") {
    const emoji = scorrect === 5 ? "🏆" : scorrect >= 3 ? "⭐" : "💪";
    const msg   = scorrect === 5 ? "Perfect Session!" : `${scorrect} of 5 Correct`;
    return (
      <section className="workspace">
        <div className="pkt-end-wrap">
          <div className="pkt-end-emoji">{emoji}</div>
          <h2 className="pkt-end-h2">{msg}</h2>
          <p className="pkt-end-sub">
            {scorrect === 5 ? "Flawless! You are a Python kata master." : "Keep practicing - you're getting there!"}
          </p>
          <div className="pkt-end-grid">
            <div className="pkt-end-cell"><span className="pkt-end-big">{sxp}</span><span className="pkt-end-label">XP Earned</span></div>
            <div className="pkt-end-cell"><span className="pkt-end-big">{scorrect}/5</span><span className="pkt-end-label">Correct</span></div>
            <div className="pkt-end-cell"><span className="pkt-end-big">🔥 {streak.n}</span><span className="pkt-end-label">Day Streak</span></div>
            <div className="pkt-end-cell"><span className="pkt-end-big">{totalXP}</span><span className="pkt-end-label">Total XP</span></div>
          </div>
          <p className="pkt-end-tomorrow">Come back tomorrow for 5 new challenges!</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="pkt-retry-btn" style={{ background: 'transparent', color: '#a3e635', border: '1px solid rgba(163,230,53,0.3)' }} onClick={() => setPhase('intro')}>Back to Intro</button>
            <button className="pkt-retry-btn" onClick={handleStart}><RotateCcw size={14} /> Practice Again</button>
          </div>
        </div>
      </section>
    );
  }

  // -- PLAYING ------------------------------------------------
  return (
    <section className="workspace pkt-play-section">
      <div className="pkt-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="pkt-retry-btn" 
            style={{ padding: '6px 12px', background: 'transparent', color: 'inherit', border: '1px solid rgba(255,255,255,0.1)' }} 
            onClick={() => setPhase('intro')}
          >
            <ArrowLeft size={14} /> Quit
          </button>
          <div className="pkt-step-dots">
            {daily.map((_, i) => (
              <div key={i} className={`pkt-step-dot${i < ci ? " done" : i === ci ? " active" : ""}`} />
            ))}
          </div>
        </div>
        <div className="pkt-topbar-right">
          {ci_info.label && <span className={`pkt-combo-badge ${ci_info.cls}`}>{ci_info.label}</span>}
          {xpBurst && <span className="pkt-xp-burst">+{xpBurst} XP</span>}
          <span className="pkt-sxp-chip"><Star size={11} /> {sxp} XP</span>
        </div>
      </div>

      <div className="pkt-timer-track">
        <div
          className="pkt-timer-fill"
          style={{ width: `${timerPct}%`, background: timerCol, transition: "width 1s linear, background 0.4s" }}
        />
      </div>
      <div className="pkt-timer-label"><Clock size={11} /> {timeLeft}s remaining</div>

      <div className={`pkt-card${shake ? " pkt-shake" : ""}`}>
        <div className="pkt-card-header">
          <span className={`pkt-concept-tag pkt-diff-${ch.difficulty.toLowerCase()}`}>{ch.concept}</span>
          <span className="pkt-challenge-num">{ci + 1} / {daily.length}</span>
        </div>
        <p className="pkt-desc">{ch.desc}</p>

        <pre className="pkt-code-block">
          {processed.map((line, li) => (
            <div key={li} className="pkt-code-line">
              {line.map((seg, si) => {
                if (seg.k === "txt") return <span key={si} className="pkt-code-text">{seg.v}</span>;
                const res = results[seg.idx];
                return (
                  <input
                    key={si}
                    className={`pkt-blank-input${res === "ok" ? " ok" : res === "bad" ? " bad" : ""}`}
                    value={inputs[seg.idx] || ""}
                    onChange={e => { if (!done) setInputs(p => ({ ...p, [seg.idx]: e.target.value })); }}
                    onPaste={e => e.preventDefault()}
                    onCopy={e => e.preventDefault()}
                    onCut={e => e.preventDefault()}
                    onKeyDown={e => { if (e.key === "Enter" && !done) submit(false); }}
                    disabled={done}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{ width: Math.max(seg.ans.length * 9 + 24, 52) + "px" }}
                  />
                );
              })}
            </div>
          ))}
        </pre>

        {!done && (
          <button
            className={`pkt-hint-btn${showHint ? " revealed" : ""}`}
            onClick={() => { setShowHint(true); setHintUsed(true); hintUsedRef.current = true; }}
          >
            <Lightbulb size={13} /> {showHint ? ch.hint : "Show Hint (-10 XP)"}
          </button>
        )}

        {isAllOk && (
          <div className="pkt-feedback ok">
            <CheckCircle size={16} /> Correct!
            {hintUsed && <span className="pkt-fb-hint"> (hint used)</span>}
            {ci_info.label && <span className="pkt-fb-combo"> {ci_info.label}</span>}
          </div>
        )}

        {hasWrong && (
          <div className="pkt-feedback bad">
            <XCircle size={16} /> Some blanks were wrong. Correct answers:
            <div className="pkt-answer-reveals">
              {blanks.filter(b => results[b.idx] === "bad").map(b => (
                <code key={b.idx} className="pkt-reveal-chip">{b.ans}</code>
              ))}
            </div>
          </div>
        )}

        {done && !isAllOk && !hasWrong && timeLeft === 0 && (
          <div className="pkt-feedback timeout">
            <Clock size={16} /> Time is up! Correct answers:
            <div className="pkt-answer-reveals">
              {blanks.map(b => <code key={b.idx} className="pkt-reveal-chip">{b.ans}</code>)}
            </div>
          </div>
        )}
      </div>

      <div className="pkt-actions">
        {!done ? (
          <button className="pkt-submit-btn" onClick={() => submit(false)} disabled={!allFilled}>
            Check Answer <ChevronRight size={15} />
          </button>
        ) : (
          <button className="pkt-next-btn" onClick={handleNext}>
            {ci < daily.length - 1
              ? <><ChevronRight size={15} /> Next Challenge</>
              : <><Trophy size={15} /> Finish Session</>
            }
          </button>
        )}
      </div>
    </section>
  );
}
