import React, { useState, useEffect } from 'react';
import { Wrench, Play, RotateCcw, Lightbulb, KeyRound, CheckCircle2 } from 'lucide-react';
import PythonCodeViewer from './PythonCodeViewer';
import HintCard from './HintCard';
import SolutionCard from './SolutionCard';
import RunOutput from './RunOutput';

export default function BugFixLab({
  buggyCode = '',
  expectedOutput = '15',
  beforeOutput = '105',
  hint = '',
  solution = '',
  onSuccessFix
}) {
  const [userCode, setUserCode] = useState(buggyCode);
  const [currentOutput, setCurrentOutput] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setUserCode(buggyCode);
    setCurrentOutput('');
    setHasRun(false);
    setIsSuccess(false);
    setShowHint(false);
    setShowSolution(false);
  }, [buggyCode]);

  const handleReset = () => {
    setUserCode(buggyCode);
    setCurrentOutput('');
    setHasRun(false);
    setIsSuccess(false);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleRun = () => {
    setHasRun(true);
    let resultOutput = '';

    // Evaluate user fixes
    try {
      const lines = userCode.trim().split('\n');
      
      // Case 1 check (Quotes around numbers vs numbers)
      if (userCode.includes('val1 = 10') && userCode.includes('val2 = 5')) {
        resultOutput = '15';
      } else if (userCode.includes('val1 = "10"') || userCode.includes('val2 = "5"')) {
        resultOutput = '105';
      }
      // Case 2 check (Comparison < vs >)
      else if (userCode.includes('red_time < blue_time')) {
        resultOutput = 'Red wins: True';
      } else if (userCode.includes('red_time > blue_time')) {
        resultOutput = 'Red wins: False';
      }
      // Case 3 check (Missing colon)
      else if (userCode.includes('if ananya > rohan:')) {
        resultOutput = 'Ananya leading';
      } else if (userCode.includes('if ananya > rohan')) {
        resultOutput = 'SyntaxError: expected \':\' at end of if statement';
      }
      // Case 4 check (List index out of range)
      else if (userCode.includes('Coach C')) {
        resultOutput = 'Scanning: Coach C';
      } else if (userCode.includes('coaches[2]')) {
        resultOutput = 'IndexError: list index out of range';
      }
      // Case 5 check (Zero division)
      else if (userCode.includes('count = 3')) {
        resultOutput = 'Average: 36.9';
      } else if (userCode.includes('count = 0')) {
        resultOutput = 'ZeroDivisionError: division by zero';
      }
      // Case 6 check (Inverted boolean condition)
      else if (userCode.includes('score >= 80') || userCode.includes('score > 80')) {
        resultOutput = 'Accepted';
      } else if (userCode.includes('score < 80')) {
        resultOutput = 'Rejected';
      } else {
        // Fallback simple line eval
        resultOutput = 'Output updated';
      }
    } catch (err) {
      resultOutput = `Execution Error: ${err.message}`;
    }

    setCurrentOutput(resultOutput);

    if (resultOutput.trim() === expectedOutput.trim()) {
      setIsSuccess(true);
      if (onSuccessFix) onSuccessFix();
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <section className="ed-bug-fix-lab-card">
      <div className="ed-lab-header">
        <div className="ed-lab-icon">
          <Wrench size={22} color="#ffffff" />
        </div>
        <div>
          <h2>🛠 Bug Fix Lab</h2>
          <p>Edit the Python code below to fix the anomaly and achieve the expected output.</p>
        </div>
      </div>

      <PythonCodeViewer
        code={userCode}
        isEditable={true}
        onChangeCode={setUserCode}
        fileName="buggy_script.py"
      />

      <div className="ed-lab-controls-bar">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ed-btn ed-btn-primary" onClick={handleRun}>
            <Play size={15} fill="currentColor" /> Run Code
          </button>
          <button className="ed-btn ed-btn-secondary" onClick={handleReset}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`ed-btn ${showHint ? 'ed-btn-primary' : 'ed-btn-secondary'}`}
            onClick={() => setShowHint(!showHint)}
            style={{ fontSize: '0.82rem' }}
          >
            <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Hint'}
          </button>

          <button
            className={`ed-btn ${showSolution ? 'ed-btn-primary' : 'ed-btn-secondary'}`}
            onClick={() => setShowSolution(!showSolution)}
            style={{ fontSize: '0.82rem' }}
          >
            <KeyRound size={14} /> {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>
      </div>

      {showHint && <HintCard hintText={hint} />}
      {showSolution && <SolutionCard solutionText={solution} />}

      {hasRun && (
        <RunOutput
          beforeOutput={beforeOutput}
          afterOutput={currentOutput}
          expectedOutput={expectedOutput}
          isSuccess={isSuccess}
        />
      )}
    </section>
  );
}
