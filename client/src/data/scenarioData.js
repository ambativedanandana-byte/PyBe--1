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
      { q:'Why is Maya worried?', options:['The bakery is closed.','The computer calculated the customer’s bill incorrectly.','The cakes are missing.','The cashier went home.'], correct:1 },
      { q:'Which value should depend on both the cake price and quantity?', options:['Bakery name','Total bill','Customer name','Shop address'], correct:1 },
      { q:'What should you do before the customer pays?', options:['Ignore the wrong bill.','Fix the billing program.','Close the bakery.','Delete the order.'], correct:1 }
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
      { q:'Why is Maya worried?', options:['The bakery is closed.','The computer calculated the customer’s bill incorrectly.','The cakes are missing.','The cashier went home.'], correct:1 },
      { q:'Which value should depend on both the cake price and quantity?', options:['Bakery name','Total bill','Customer name','Shop address'], correct:1 },
      { q:'What should you do before the customer pays?', options:['Ignore the wrong bill.','Fix the billing program.','Close the bakery.','Delete the order.'], correct:1 }
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
      { q:'Why is Maya worried?', options:['The bakery is closed.','The computer calculated the customer’s bill incorrectly.','The cakes are missing.','The cashier went home.'], correct:1 },
      { q:'Which value should depend on both the cake price and quantity?', options:['Bakery name','Total bill','Customer name','Shop address'], correct:1 },
      { q:'What should you do before the customer pays?', options:['Ignore the wrong bill.','Fix the billing program.','Close the bakery.','Delete the order.'], correct:1 }
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

/* ── Shared Comparisons race-day MCQs ── */
const COMP_Q = [
  { q:'Why is Arjun confused after the race?', options:['He tripped and fell.','The scoreboard showed the wrong winner.','The race was cancelled.','The timer ran out.'], correct:1 },
  { q:'Arjun finished in 12.3s and Priya in 13.1s. Who actually ran faster?', options:['Priya, because 13.1 is a bigger number.','Arjun, because a lower time means faster.','It was a tie.','The PE teacher decides the winner.'], correct:1 },
  { q:'What must be fixed in the program before the trophy is given?', options:['The screen brightness.','The comparison that picks the winner.','The race track length.','The runner\'s jersey colour.'], correct:1 },
];

/* Comparisons scenario entries — all 5 question IDs */
const COMP_SCENARIO = {
  illustration: 'school',
  scenarioText: 'At Greenfield School Sports Day, Arjun finished the 100m sprint in 12.3 seconds and Priya in 13.1 seconds. But the computer scoreboard declared Priya the winner! The comparison program has a bug — it is picking the larger time instead of the smaller one.',
  step1: { questions: COMP_Q },
};

/* ── Shared Conditionals traffic crossing MCQs ── */
const COND_Q = [
  { q:'What is the problem with the traffic lights?', options:['The lights are off.','The light changes but cars keep speeding while the walk sign says GO.','The police officer is missing.','A car crashed into the pole.'], correct:1 },
  { q:'Under what light color condition should vehicles STOP?', options:['Green','Yellow','Red','Flashing amber'], correct:2 },
  { q:'What went wrong in the automated light controller program?', options:['The screen broke.','The conditional rules are swapped or inverted.','The computer runs out of memory.','The internet disconnected.'], correct:1 }
];

/* Conditionals scenario entries */
const COND_SCENARIO = {
  illustration: 'traffic',
  scenarioText: 'A group of school children and parents are waiting at a busy pedestrian crossing. The traffic light changes, and the walk sign turns green, but cars continue speeding through! The automated controller code has an inverted condition, causing chaos.',
  step1: { questions: COND_Q },
};

/* ── Shared Counting toy shop MCQs ── */
const COUNT_Q = [
  { q:'What is the shopkeeper trying to do?', options:['Clean the shelves.','Count the stock of 50 teddy bears before opening.','Sell all toys to a single customer.','Decorate the store with balloons.'], correct:1 },
  { q:'What is the unexpected result of the counting script?', options:['It counted 0 toys.','It counted exactly 50 toys.','It output an incorrect, massive total of 5000.','The script crashed with an error.'], correct:2 },
  { q:'What kind of bug would cause a loop to run too many times?', options:['An incorrect range boundary or missing termination check.','A misspelled variable name.','Low computer battery.','A network failure.'], correct:0 }
];

/* Counting scenario entries */
const COUNT_SCENARIO = {
  illustration: 'default',
  scenarioText: 'Three excited children enter a colorful toy shop with their parent. The friendly shop owner begins counting teddy bears, toy cars, dolls, and robots before selling them. However, he accidentally skips a few items, resulting in an incorrect total count! Let\'s debug and fix the counting program.',
  step1: { questions: COUNT_Q },
};

/* ── Shared Indexing library MCQs ── */
const INDEX_Q = [
  { q:'What is the student trying to find?', options:['A specific library card.','A book from the library shelves.','A key to the bookshelf locks.','A list of library rules.'], correct:1 },
  { q:'Why did the librarian pick the wrong book or crash the lookup?', options:['The book was missing.','Computer arrays count starting at 0, causing an off-by-one error.','The search catalog was turned off.','The book cover was damaged.'], correct:1 },
  { q:'If a list has 5 books, what is the index of the first book?', options:['1','0','-1','5'], correct:1 }
];

/* Indexing scenario entries */
const INDEX_SCENARIO = {
  illustration: 'library',
  scenarioText: 'A student is looking for a book on a shelf of rare books. The librarian inputs the query index, but the system either grabs the wrong book or crashes due to an IndexError! The lookup code has a typical off-by-one indexing bug.',
  step1: { questions: INDEX_Q },
};

/* ── Shared Lists supermarket MCQs ── */
const LIST_Q = [
  { q:'Why does the family go to the supermarket?', options:['For a birthday party.','To buy groceries from their shopping list.','To return a faulty item.','To meet a friend.'], correct:1 },
  { q:'What went wrong when Dad added apples to the list?', options:['He forgot to go to the shop.','The list printed \'None\' instead of the updated items.','The app crashed completely.','He bought the wrong fruit.'], correct:1 },
  { q:'What does the Python append() method actually return?', options:['The updated list.','The item that was added.','None — it modifies the list in place.','A copy of the list.'], correct:2 }
];

/* Lists scenario entries */
const LIST_SCENARIO = {
  illustration: 'default',
  scenarioText: 'A family is preparing to go grocery shopping. They build a shopping list app to track items. When Dad tries to add apples using append(), the list shows \'None\' instead of the updated list! A classic Python lists bug needs fixing.',
  step1: { questions: LIST_Q },
};

/* ── Shared Strings birthday invitation MCQs ── */
const STR_Q = [
  { q:'What are the children preparing in the comic?', options:['A shopping list.','Birthday party invitation cards.','A school project.','A recipe book.'], correct:1 },
  { q:'What went wrong with the invitation?', options:['The card was torn.','A friend\'s name was spelled incorrectly.','The date was missing.','The envelope was lost.'], correct:1 },
  { q:'In Python, what is a string?', options:['A list of numbers.','A type of loop.','A sequence of characters.','A dictionary key.'], correct:2 }
];

/* Strings scenario entries */
const STR_SCENARIO = {
  illustration: 'default',
  scenarioText: 'A birthday girl and her friends are preparing invitation cards for a party. They carefully write each friend\'s name on the invitations. But one name gets misspelled — the wrong character is placed inside the string! Can you fix the name before the party begins?',
  step1: { questions: STR_Q },
};

/* ── Shared Subtraction fruit market MCQs ── */
const SUB_Q = [
  { q: 'Why are the children whispering and pointing at the slate?', options: ['They want to buy grapes.', 'They noticed the fruit seller made a subtraction mistake.', 'They are looking for the PyBe mentor.', 'They want to eat oranges.'], correct: 1 },
  { q: 'The seller had 15 apples and sold 6. What is the correct remaining amount?', options: ['25 apples', '9 apples', '21 apples', '6 apples'], correct: 1 },
  { q: 'In the calculation \'15 - 6\', which number is being subtracted?', options: ['15', '6', '25', '9'], correct: 1 }
];

/* Subtraction scenario entries */
const SUB_SCENARIO = {
  illustration: 'stall',
  scenarioText: 'Customers arrive at a colorful fruit market to buy fresh apples and bananas. The seller begins weighing and selling them, but when calculating the remaining fruits, he makes a subtraction calculation error. The children spot the issue. Can you help correct the subtraction logic before they leave?',
  step1: { questions: SUB_Q },
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

  /* Comparisons: always use race-day comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('compar')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...COMP_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Conditionals: always use traffic crossing comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('cond')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...COND_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Counting & Loops: always use toy shop counting comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('count') || (q.topic || '').toLowerCase().includes('loop')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...COUNT_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Indexing: always use library indexing comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('idx') || (q.topic || '').toLowerCase().includes('index')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...INDEX_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Lists: always use supermarket grocery comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('list')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...LIST_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Strings: always use birthday invitation comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('str') || (q.topic || '').toLowerCase().includes('string')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...STR_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  /* Subtraction: always use fruit market subtraction comic MCQs, but keep step2/3 from fallback */
  if ((q.topic || '').toLowerCase().includes('subtraction') || (q.topic || '').toLowerCase().includes('subt')) {
    const fallback = DB[q.id] || makeFallback(q);
    return {
      id: q.id, level: q.level, topic: q.topic, title: q.title, errorType: q.errorType,
      ...SUB_SCENARIO,
      step2: fallback.step2,
      step3: fallback.step3,
    };
  }

  const base = DB[q.id] ? DB[q.id] : makeFallback(q);
  return { id:q.id, level:q.level, topic:q.topic, title:q.title, errorType:q.errorType, ...base };
}
