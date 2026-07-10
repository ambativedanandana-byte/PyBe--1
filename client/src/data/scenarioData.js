/**
 * scenarioData.js — New schema
 * step1.questions[3]: real-life MCQs (no code)
 * step2.challenges[3]: each has snippet, tests[], hint, analysis{}
 */

function ch(errorType, title, snippet, hint, tests, analysis) {
  return { errorType, title, snippet, hint, tests, analysis };
}

const DB = {
  beg_arith_1: {
    illustration: 'builder',
    scenarioText: 'A carpenter wrote a quick program to calculate the area of a wooden floor board. The moment he ran it, the computer refused to work and showed a red error.',
    step1: { questions: [
      { q:'The carpenter used the letter "x" between two numbers. What kind of mistake is this?', options:['A spelling mistake in the variable name','Using the wrong symbol for multiplication','Forgetting to save the file','Using too many variables'], correct:1 },
      { q:'What is the correct mathematical symbol for multiplication in most programming languages?', options:['x','×','*','#'], correct:2 },
      { q:'Before running any calculation program, what should you always check?', options:['The screen brightness','That all operators and symbols are correctly written','That the computer has internet','That the file name is correct'], correct:1 }
    ]},
    step2: { challenges: [
      ch('Syntax Error','Wrong multiplication operator',
        'length = 10\nwidth = 5\narea = length x width\nprint(area)',
        'Python uses * for multiplication. Replace "x" with "*".',
        [{ inputLabel:'length=10, width=5', inputs:{}, expected:'50', status:'not-run', actual:'' }],
        { errorType:'Syntax Error', location:'Line 3: area = length x width', why:'"x" is not a valid Python operator — it looks like a variable name.', fix:'Using * is the standard Python multiplication operator.' }
      ),
      ch('Runtime Error','Division by zero',
        'area = 50\nrooms = 0\nresult = area / rooms\nprint(result)',
        'Add a guard: if rooms != 0: before dividing.',
        [{ inputLabel:'area=50, rooms=0', inputs:{}, expected:'Error', status:'not-run', actual:'' }],
        { errorType:'Runtime Error', location:'Line 3: area / rooms', why:'Dividing any number by zero is mathematically undefined and causes a ZeroDivisionError crash.', fix:'Guarding with "if rooms != 0" prevents the crash entirely.' }
      ),
      ch('Logical Error','Wrong formula gives wrong area',
        'length = 10\nwidth = 5\narea = length + width\nprint(area)',
        'Area of a rectangle = length × width, not length + width.',
        [{ inputLabel:'length=10, width=5', inputs:{}, expected:'50', status:'not-run', actual:'' }],
        { errorType:'Logical Error', location:'Line 3: area = length + width', why:'Addition gives the perimeter concept, not the area. No crash occurs but the result is wrong.', fix:'Changing + to * applies the correct area formula: length × width.' }
      )
    ]},
    step3: { learned:['Syntax Error — wrong operator symbol','Runtime Error — division by zero','Logical Error — wrong arithmetic formula'], tip:'Always use * for multiplication and guard divisions with: if divisor != 0.' }
  },

  beg_arith_2: {
    illustration: 'bakery',
    scenarioText: 'A baker wants to share 12 cookies equally among children. The program crashes immediately — no children are present today!',
    step1: { questions: [
      { q:'If 12 cookies need to be shared among 0 children, what is mathematically impossible?', options:['Adding the cookies together','Dividing by zero','Counting the cookies','Storing the number 12'], correct:1 },
      { q:'What real-life check should the baker do BEFORE running the program?', options:['Check the oven is on','Check there is at least 1 child present','Check the cookie recipe','Check the weather'], correct:1 },
      { q:'In a shop system, what should appear when no customers are present?', options:['System crash','A friendly message like "No customers today"','Nothing — just freeze','Delete all data'], correct:1 }
    ]},
    step2: { challenges: [
      ch('Runtime Error','ZeroDivisionError crash',
        'cookies = 12\nchildren = 0\nper_child = cookies / children\nprint(per_child)',
        'Your code should not crash when children = 0. Display a safe message instead.',
        [
          { inputLabel:'(12, 4)', inputs:{}, expected:'3.0', status:'not-run', actual:'' },
          { inputLabel:'(15, 5)', inputs:{}, expected:'3.0', status:'not-run', actual:'' },
          { inputLabel:'(8, 0)',  inputs:{}, expected:'Should handle division by zero', status:'not-run', actual:'' }
        ],
        { errorType:'Runtime Error', location:'Line 3: cookies / children', why:'children is 0. Dividing by zero raises a ZeroDivisionError and crashes the program.', fix:'Adding "if children != 0:" guards the division and provides a safe fallback message.' }
      ),
      ch('Syntax Error','Missing colon in if-statement',
        'children = 4\nif children != 0\n    print("Share cookies")',
        'Python if-statements must end with a colon (:).',
        [{ inputLabel:'children=4', inputs:{}, expected:'Share cookies', status:'not-run', actual:'' }],
        { errorType:'Syntax Error', location:'Line 2: if children != 0', why:'Python requires a colon at the end of every control-flow header line.', fix:'Adding ":" after the condition tells Python a code block is starting.' }
      ),
      ch('Logical Error','Wrong condition direction',
        'children = 4\nif children == 0:\n    print(str(12 // children) + " each")',
        'We want to share cookies WHEN children exist (children != 0), not when there are none.',
        [{ inputLabel:'children=4', inputs:{}, expected:'3 each', status:'not-run', actual:'' }],
        { errorType:'Logical Error', location:'Line 2: if children == 0', why:'The condition is backwards — it only runs when children is 0, which is exactly when we cannot divide.', fix:'Changing == to != makes the code run when children are present.' }
      )
    ]},
    step3: { learned:['ZeroDivisionError — divide by zero crash','Syntax Error — missing colon','Logical Error — inverted condition'], tip:'Always check if divisor != 0 before dividing.' }
  },

  beg_arith_3: {
    illustration: 'school',
    scenarioText: 'A teacher calculates the class average. The result shows 125 instead of 85 — something is very wrong with the formula.',
    step1: { questions: [
      { q:'The teacher gets average of 125 for scores 80 and 90. What likely went wrong?', options:['The scores were too high','The formula calculated in the wrong order','Wrong students used','Scores were swapped'], correct:1 },
      { q:'What is the correct formula for average of two numbers?', options:['Add without dividing','(a + b) / 2','a + b / 2','a × b / 2'], correct:1 },
      { q:'Why do parentheses matter in calculations?', options:['They look nicer','They control which operation happens first','They are required by law','They slow down the program'], correct:1 }
    ]},
    step2: { challenges: [
      ch('Logical Error','Wrong operator precedence',
        'score1 = 80\nscore2 = 90\naverage = score1 + score2 / 2\nprint(average)',
        'Use parentheses to group the addition first: (score1 + score2) / 2.',
        [{ inputLabel:'score1=80, score2=90', inputs:{}, expected:'85.0', status:'not-run', actual:'' }],
        { errorType:'Logical Error', location:'Line 3: score1 + score2 / 2', why:'Division runs before addition (PEMDAS). Python calculates score2/2=45 first, then 80+45=125.', fix:'Wrapping (score1 + score2) forces addition first, giving the correct average.' }
      ),
      ch('Syntax Error','Missing operator between values',
        'a = 80\nb = 90\ntotal = a b\nprint(total)',
        'Python cannot concatenate two variables without an explicit operator (+) between them.',
        [{ inputLabel:'a=80, b=90', inputs:{}, expected:'170', status:'not-run', actual:'' }],
        { errorType:'Syntax Error', location:'Line 3: total = a b', why:'"a b" is not valid Python — the parser cannot determine what operation to perform.', fix:'Adding + between a and b creates a valid arithmetic expression.' }
      ),
      ch('Runtime Error','TypeError — string + number',
        'score1 = 80\nscore2 = "90"\naverage = (score1 + score2) / 2\nprint(average)',
        'Convert the string "90" to an integer using int() before adding.',
        [{ inputLabel:'score1=80, score2="90"', inputs:{}, expected:'85.0', status:'not-run', actual:'' }],
        { errorType:'Runtime Error', location:'Line 3: score1 + score2', why:'Python cannot add an integer and a string. This raises a TypeError at runtime.', fix:'int(score2) converts "90" to the integer 90, making addition valid.' }
      )
    ]},
    step3: { learned:['Logical Error — operator precedence','Syntax Error — missing operators','Runtime Error — mixed types TypeError'], tip:'Group additions with () when dividing: (a + b) / 2.' }
  }
};

/* Fallback for all other questions */
function makeFallback(q) {
  return {
    illustration: ['school','builder','bakery','library','default'][Math.floor(Math.abs(q.id.charCodeAt(4)||0) % 5)],
    scenarioText: `A developer encountered a bug while working on a ${q.topic} system. The program reports: "${q.title}". Let's investigate!`,
    step1: { questions: [
      { q:`In a real ${q.topic} system, what could cause this type of failure?`, options:[q.options[0]||'Wrong data type','The server crashed','Internet disconnected','Screen glitch'], correct:0 },
      { q:'What is the first step when debugging a crash?', options:['Restart the computer','Read the error message carefully','Delete all code','Call support'], correct:1 },
      { q:`What type of error is a "${q.errorType}"?`, options:['Found when reading code (before running)','Happens while the program runs','Code runs but gives wrong results','All of the above'], correct: q.errorType==='Syntax Error'?0:q.errorType==='Runtime Error'?1:2 }
    ]},
    step2: { challenges: [
      { errorType: q.errorType, title: q.title,
        snippet: q.snippet,
        hint: q.learningTip || 'Look carefully at the operators, types, and logic.',
        tests: [{ inputLabel:'Default test', inputs:{}, expected: q.correctAnswer, status:'not-run', actual:'' }],
        analysis: { errorType:q.errorType, location:'See buggy code', why:q.explanation, fix:`Applying: ${q.correctAnswer}` }
      },
      { errorType:'Syntax Error', title:'Missing colon',
        snippet:`# ${q.topic} check\nif value > 0\n    print("valid")`,
        hint:'Python control flow headers must end with a colon (:).',
        tests:[{ inputLabel:'value=5', inputs:{}, expected:'valid', status:'not-run', actual:'' }],
        analysis:{ errorType:'Syntax Error', location:'Line 2: if value > 0', why:'Colons are required after if/while/for/def headers in Python.', fix:'Adding ":" satisfies the Python parser.' }
      },
      { errorType:'Logical Error', title:'Wrong comparison',
        snippet:`value = 5\nif value > 10:\n    print("In range")`,
        hint:'Check the direction of the comparison operator.',
        tests:[{ inputLabel:'value=5', inputs:{}, expected:'In range', status:'not-run', actual:'' }],
        analysis:{ errorType:'Logical Error', location:'Line 2: value > 10', why:'value=5 is not > 10, so the print never runs.', fix:'Changing > to < allows value=5 to satisfy the condition.' }
      }
    ]},
    step3: { learned:[q.errorType, q.topic, 'Debugging mindset'], tip: q.learningTip||q.explanation }
  };
}

export function getScenarioForQuestion(q) {
  if (!q) return null;
  const base = DB[q.id] ? DB[q.id] : makeFallback(q);
  return { id:q.id, level:q.level, topic:q.topic, title:q.title, errorType:q.errorType, ...base };
}
