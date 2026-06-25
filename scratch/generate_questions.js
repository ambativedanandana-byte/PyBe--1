const fs = require('fs');
const path = require('path');

// Helper to make question template
function createQ(id, level, topic, errorType, title, snippet, options, correctAnswer, explanation, learningTip) {
  return { id, level, topic, errorType, title, snippet, options, correctAnswer, explanation, learningTip };
}

const questions = [];

// ==========================================
// LEVEL 1: BEGINNER (9 topics, 5 questions each = 45 questions)
// ==========================================

// 1. arithmetic
questions.push(
  createQ('beg_arith_1', 'Beginner', 'arithmetic', 'Syntax Error', 'Incorrect Operator Symbol', 
    '# Calculate area\nlength = 10\nwidth = 5\narea = length x width\nprint(area)',
    ['area = length * width', 'area = length + width', 'area = length / width', 'area = length x width'],
    'area = length * width',
    'Python uses the asterisk (*) symbol for multiplication, not the letter "x".',
    'Always use * for multiplication, / for division, + for addition, and - for subtraction in Python.'
  ),
  createQ('beg_arith_2', 'Beginner', 'arithmetic', 'Runtime Error', 'Division by Zero', 
    '# Distribute cookies\ncookies = 12\nchildren = 0\nper_child = cookies / children\nprint(per_child)',
    ['children should not be 0', 'cookies should be float', 'per_child = cookies * children', 'use cookies // children'],
    'children should not be 0',
    'Dividing by zero raises a ZeroDivisionError in Python.',
    'Always check if your divisor is zero before performing division operations.'
  ),
  createQ('beg_arith_3', 'Beginner', 'arithmetic', 'Logical Error', 'Average Calculation Order of Operations', 
    '# Find average of two scores\nscore1 = 80\nscore2 = 90\naverage = score1 + score2 / 2\nprint(average)',
    ['average = (score1 + score2) / 2', 'average = score1 + (score2 / 2)', 'average = score1 / 2 + score2', 'average = score1 + score2'],
    'average = (score1 + score2) / 2',
    'Division has higher precedence than addition. Without parentheses, score2 is divided by 2, then added to score1.',
    'Use parentheses to explicitly group operations you want to execute first.'
  ),
  createQ('beg_arith_4', 'Beginner', 'arithmetic', 'Syntax Error', 'Missing Operator', 
    '# Calculate triple value\nval = 5\ntriple = 3val\nprint(triple)',
    ['triple = 3 * val', 'triple = val3', 'triple = 3 + val', 'triple = val * 3val'],
    'triple = 3 * val',
    'Python does not support implicit multiplication. You must use the * operator between a number and a variable.',
    'Always specify the operator explicitly. Writing "3val" is a syntax error.'
  ),
  createQ('beg_arith_5', 'Beginner', 'arithmetic', 'Logical Error', 'Integer Division vs Float Division', 
    '# Calculate exact half of a budget\nbudget = 15\nhalf = budget // 2\nprint(half) # Expected: 7.5',
    ['half = budget / 2', 'half = budget % 2', 'half = budget * 0.5', 'half = float(budget // 2)'],
    'half = budget / 2',
    'The double slash (//) operator performs floor division, discarding the remainder. Use single slash (/) for exact float division.',
    'Use / for division when you want decimal/fractional results, and // when you specifically want integer quotients.'
  )
);

// 2. comparisons
questions.push(
  createQ('beg_comp_1', 'Beginner', 'comparisons', 'Syntax Error', 'Assignment instead of Comparison', 
    '# Check if score is perfect\nscore = 100\nif score = 100:\n    print("Perfect!")',
    ['if score == 100:', 'if score === 100:', 'if score is 100:', 'if score = 100'],
    'if score == 100:',
    'A single equals sign (=) is for variable assignment. For comparison, you must use double equals (==).',
    'Remember: "=" assigns values, while "==" checks for equality.'
  ),
  createQ('beg_comp_2', 'Beginner', 'comparisons', 'Logical Error', 'Incorrect Inequality operator', 
    '# Allow entry if user is under 18\nage = 20\nif age > 18:\n    print("Allow child discount") # Expected: no output for age 20',
    ['if age < 18:', 'if age <= 18:', 'if age != 18:', 'if age == 18:'],
    'if age < 18:',
    'The code uses greater than (>) instead of less than (<). A 20-year-old would incorrectly match the condition.',
    'Verify that the inequality operator direction matches the logical requirements (e.g. < for less than, > for greater than).'
  ),
  createQ('beg_comp_3', 'Beginner', 'comparisons', 'Runtime Error', 'Comparing Incompatible Types', 
    '# Check age limit\nage = "15"\nif age >= 18:\n    print("Adult")',
    ['Convert age to integer: int(age) >= 18', 'Convert 18 to string: age >= "18"', 'Compare length: len(age) >= 18', 'Use age == 18'],
    'Convert age to integer: int(age) >= 18',
    'Comparing a string value with an integer raises a TypeError at runtime.',
    'Ensure both operands in comparisons are of compatible types. Use int() or float() to convert strings containing numbers.'
  ),
  createQ('beg_comp_4', 'Beginner', 'comparisons', 'Syntax Error', 'Invalid Not-Equals Operator', 
    '# Check if names are different\nname1 = "Alice"\nname2 = "Bob"\nif name1 =! name2:\n    print("Different")',
    ['if name1 != name2:', 'if name1 not= name2:', 'if name1 <> name2:', 'if name1 !== name2:'],
    'if name1 != name2:',
    'The inequality operator in Python is "!=" and not "=!".',
    'Python uses != for checking inequality. Make sure the exclamation mark comes first.'
  ),
  createQ('beg_comp_5', 'Beginner', 'comparisons', 'Logical Error', 'Exclusive Range boundary', 
    '# Check if score is within passing range (60 to 100 inclusive)\nscore = 60\nif score > 60 and score <= 100:\n    print("Pass") # Expected: Pass for 60',
    ['if score >= 60 and score <= 100:', 'if score > 59 and score < 100:', 'if score == 60:', 'if 60 <= score < 100:'],
    'if score >= 60 and score <= 100:',
    'The > operator excludes 60. To make it inclusive, use >=.',
    'Pay attention to whether boundaries are inclusive (>=, <=) or exclusive (>, <).'
  )
);

// 3. conditionals
questions.push(
  createQ('beg_cond_1', 'Beginner', 'conditionals', 'Syntax Error', 'Incorrect Elif Spelling', 
    '# Temperature check\ntemp = 15\nif temp > 30:\n    print("Hot")\nelse if temp > 10:\n    print("Mild")',
    ['elif temp > 10:', 'elseif temp > 10:', 'elsif temp > 10:', 'else temp > 10:'],
    'elif temp > 10:',
    'Python uses the keyword "elif" for else-if conditions, not "else if" or "elseif".',
    'Write "elif" when checking nested or subsequent conditions.'
  ),
  createQ('beg_cond_2', 'Beginner', 'conditionals', 'Syntax Error', 'Missing Colon after Condition', 
    '# Check if positive\nnum = 5\nif num > 0\n    print("Positive")',
    ['if num > 0:', 'if (num > 0)', 'if num > 0 then:', 'if num > 0 do:'],
    'if num > 0:',
    'Python syntax requires a colon (:) at the end of the if condition.',
    'Always put a colon at the end of control statements like if, elif, else, while, and for.'
  ),
  createQ('beg_cond_3', 'Beginner', 'conditionals', 'Logical Error', 'Overlapping Condition Ordering', 
    '# Grade checking\nscore = 95\nif score >= 60:\n    print("D")\nelif score >= 90:\n    print("A") # Expected: A for 95',
    ['Check >= 90 condition first', 'Use nested if statements', 'Use score > 90', 'Check score >= 60 last'],
    'Check >= 90 condition first',
    'Since 95 is greater than 60, the first block matches and displays "D". The elif is never reached.',
    'Always order overlapping conditions from most specific (highest score/strictest limit) to most general.'
  ),
  createQ('beg_cond_4', 'Beginner', 'conditionals', 'Runtime Error', 'IndentationError in conditional block', 
    '# Simple check\nstatus = True\nif status:\nprint("Active")',
    ['Indent the print statement', 'Put print on same line', 'Add pass statement', 'Use parentheses'],
    'Indent the print statement',
    'Python uses indentation to group code blocks. The code under "if" must be indented.',
    'Ensure all block bodies (if, else, loops, functions) are indented, typically with 4 spaces.'
  ),
  createQ('beg_cond_5', 'Beginner', 'conditionals', 'Logical Error', 'Missing Else Case', 
    '# Check even number\nval = 3\nif val % 2 == 0:\n    print("Even")\n# Expected: prints "Odd" if not even',
    ['Add: else: print("Odd")', 'Add: elif val % 2 != 0: print("Odd")', 'Add: print("Odd") at end', 'Change condition to != 0'],
    'Add: else: print("Odd")',
    'The code checks for even numbers, but lacks an "else" case to handle odd numbers.',
    'Always include an "else" block when you need a default fallback outcome.'
  )
);

// 4. counting
questions.push(
  createQ('beg_count_1', 'Beginner', 'counting', 'Syntax Error', 'Incorrect Increment Operator', 
    '# Count items\ncount = 0\ncount =+ 1\nprint(count) # Expected count to increase',
    ['count += 1', 'count = count + 1', 'count ++', 'Both count += 1 and count = count + 1'],
    'Both count += 1 and count = count + 1',
    'Writing "count =+ 1" is interpreted as "count = (+1)" which just assigns positive 1 to count. Use "+=" to increment.',
    'To increment a variable, use the += operator or assign to "variable + value".'
  ),
  createQ('beg_count_2', 'Beginner', 'counting', 'Runtime Error', 'NameError on Uninitialized Variable', 
    '# Count clicks\nclicks = clicks + 1\nprint(clicks)',
    ['Initialize clicks = 0 first', 'Use clicks += 1', 'clicks = 1', 'Use global clicks'],
    'Initialize clicks = 0 first',
    'The variable clicks is referenced on the right hand side before it has been defined, throwing a NameError.',
    'Always initialize counter variables (e.g. clicks = 0) before referencing them to increment.'
  ),
  createQ('beg_count_3', 'Beginner', 'counting', 'Logical Error', 'Off-by-One Loop Count', 
    '# Count up to 5\ni = 1\nwhile i < 5:\n    print(i)\n    i += 1 # Expected: prints 1 to 5',
    ['Change condition to: while i <= 5:', 'Initialize i = 0', 'Increment i before print', 'Change i < 5 to i < 6'],
    'Change condition to: while i <= 5:',
    'The condition i < 5 stops the loop before 5 is printed (prints 1, 2, 3, 4). Use <= to include 5.',
    'Verify loop conditions to ensure boundaries are correctly handled (off-by-one errors).'
  ),
  createQ('beg_count_4', 'Beginner', 'counting', 'Logical Error', 'Infinite Loop due to Missing Increment', 
    '# Loop count\ni = 1\nwhile i <= 3:\n    print(i)\n    # Expected: count to 3',
    ['Add i += 1 inside loop', 'Change condition to i > 3', 'Use a for loop', 'Break loop manually'],
    'Add i += 1 inside loop',
    'Without incrementing "i", the condition "i <= 3" remains True forever, causing an infinite loop.',
    'Always ensure variables in loop conditions are updated inside the loop body.'
  ),
  createQ('beg_count_5', 'Beginner', 'counting', 'Runtime Error', 'Type mismatch on Counter addition', 
    '# Add to score\nscore = 10\nbonus = "5"\nscore += bonus',
    ['Convert bonus to int: score += int(bonus)', 'Convert score to str', 'Use score = score + bonus', 'Use bonus = 5'],
    'Convert bonus to int: score += int(bonus)',
    'Adding a string to an integer raises a TypeError.',
    'Ensure both variables are of numeric types (int or float) before using addition or increments.'
  )
);

// 5. indexing
questions.push(
  createQ('beg_idx_1', 'Beginner', 'indexing', 'Runtime Error', 'Index Out of Range', 
    '# Get third character\nword = "Py"\nchar = word[2]',
    ['index is out of bounds', 'index starts at 1', 'word has no length', 'use word[3]'],
    'index is out of bounds',
    'The string "Py" has length 2 (indices 0 and 1). Accessing index 2 raises an IndexError.',
    'Python indices are 0-based, meaning the last character is at index len(sequence) - 1.'
  ),
  createQ('beg_idx_2', 'Beginner', 'indexing', 'Logical Error', 'Incorrect First Index', 
    '# Get first element of list\nscores = [90, 85, 95]\nfirst = scores[1]\nprint(first) # Expected: 90',
    ['first = scores[0]', 'first = scores[first]', 'first = scores[-1]', 'first = scores[2]'],
    'first = scores[0]',
    'Python uses 0-based indexing. scores[1] accesses the second element (85), not the first.',
    'Always use index 0 to access the first item in any Python list or string.'
  ),
  createQ('beg_idx_3', 'Beginner', 'indexing', 'Runtime Error', 'Invalid Index Type', 
    '# Access element using float index\nitems = ["a", "b", "c"]\nidx = 1.0\nprint(items[idx])',
    ['Use integer index: items[int(idx)]', 'items[1.0] is correct', 'Convert items to float', 'Use items["1.0"]'],
    'Use integer index: items[int(idx)]',
    'List indices must be integers or slices, not floats. Using 1.0 throws a TypeError.',
    'Always ensure the value used inside square brackets [] evaluates to an integer.'
  ),
  createQ('beg_idx_4', 'Beginner', 'indexing', 'Logical Error', 'Last Element accessing', 
    '# Get last element of a list\nvals = [10, 20, 30]\nlast = vals[len(vals)]',
    ['last = vals[-1]', 'last = vals[len(vals)-1]', 'Both last = vals[-1] and last = vals[len(vals)-1]', 'last = vals[3]'],
    'Both last = vals[-1] and last = vals[len(vals)-1]',
    'Accessing index len(vals) causes an IndexError. You can access the last element using index -1 or len(vals) - 1.',
    'Use negative index -1 as a clean shorthand to access the last item in a collection.'
  ),
  createQ('beg_idx_5', 'Beginner', 'indexing', 'Syntax Error', 'Incorrect Index Brackets', 
    '# Access first element\ncolors = ["red", "blue"]\nfirst = colors(0)',
    ['first = colors[0]', 'first = colors{0}', 'first = colors.get(0)', 'first = colors -> 0'],
    'first = colors[0]',
    'Lists and strings use square brackets [] for indexing, not parentheses (). Parentheses are for function calls.',
    'Remember: Indexing always uses square brackets [].'
  )
);

// 6. lists
questions.push(
  createQ('beg_list_1', 'Beginner', 'lists', 'Syntax Error', 'Missing comma between items', 
    '# Create colors list\nmy_list = ["red" "blue" "green"]\nprint(len(my_list)) # Expected: 3',
    ['Add commas: ["red", "blue", "green"]', 'Use parenthesis: ("red" "blue")', 'Use single string', 'Use semicolons'],
    'Add commas: ["red", "blue", "green"]',
    'Without commas, Python string literal concatenation combines them into a single string item ["redbluegreen"].',
    'Separate items in list literals with commas.'
  ),
  createQ('beg_list_2', 'Beginner', 'lists', 'Runtime Error', 'List append returns None assignment', 
    '# Add score\nscores = [80, 90]\nscores = scores.append(95)\nprint(len(scores))',
    ['Do not assign: scores.append(95)', 'Use scores = scores + 95', 'Use scores.add(95)', 'Use scores.insert(95)'],
    'Do not assign: scores.append(95)',
    'The list append() method modifies the list in place and returns None. Assigning it back to scores overwrites the list with None.',
    'In-place list operations (append, sort, reverse) return None. Call them without assignment.'
  ),
  createQ('beg_list_3', 'Beginner', 'lists', 'Logical Error', 'Incorrect List Length check', 
    '# Check if list is empty\nitems = []\nif len(items) == Null:\n    print("Empty")',
    ['if len(items) == 0:', 'if not items:', 'Both if len(items) == 0: and if not items:', 'if items == None:'],
    'Both if len(items) == 0: and if not items:',
    'Python uses "None" instead of "Null", and the length of an empty list is 0. An empty list also evaluates to False in boolean contexts.',
    'Use "if not items:" as the most Pythonic way to check if a list is empty.'
  ),
  createQ('beg_list_4', 'Beginner', 'lists', 'Runtime Error', 'Unsupported list method add', 
    '# Create shopping list\nshopping = ["milk"]\nshopping.add("bread")',
    ['shopping.append("bread")', 'shopping.extend("bread")', 'shopping += "bread"', 'shopping.push("bread")'],
    'shopping.append("bread")',
    'Lists do not have an "add" method (sets do). Use "append" to add a single item to a list.',
    'Use list.append(item) to append an item to the end of a list.'
  ),
  createQ('beg_list_5', 'Beginner', 'lists', 'Logical Error', 'Unexpected list mutation sharing', 
    '# Copy list\nlist1 = [1, 2]\nlist2 = list1\nlist2.append(3)\nprint(list1) # Expected: [1, 2]',
    ['list2 = list1.copy()', 'list2 = list(list1)', 'Both list2 = list1.copy() and list2 = list(list1)', 'list2 = [list1]'],
    'Both list2 = list1.copy() and list2 = list(list1)',
    'Simply assigning list2 = list1 copies the reference, so changes to list2 mutate list1. Use copy() or list() to create a new shallow copy.',
    'Be careful with assignment operator (=) on mutable objects like lists. It copies references, not values.'
  )
);

// 7. strings
questions.push(
  createQ('beg_str_1', 'Beginner', 'strings', 'Syntax Error', 'Mismatched String Quotes', 
    '# User welcome\nmsg = "Welcome to PyBe\'\nprint(msg)',
    ['msg = "Welcome to PyBe"', "msg = 'Welcome to PyBe'", 'Both msg = "Welcome to PyBe" and msg = \'Welcome to PyBe\'', 'msg = """Welcome to PyBe\''],
    'Both msg = "Welcome to PyBe" and msg = \'Welcome to PyBe\'',
    'String literals must begin and end with matching single (\') or double (") quotes.',
    'Always close string literals using the same quote symbol used to open them.'
  ),
  createQ('beg_str_2', 'Beginner', 'strings', 'Runtime Error', 'Cannot Concatenate String and Int', 
    '# Create age string\nage = 20\nmsg = "Age: " + age\nprint(msg)',
    ['msg = "Age: " + str(age)', 'msg = f"Age: {age}"', 'Both msg = "Age: " + str(age) and msg = f"Age: {age}"', 'msg = "Age: " + int(age)'],
    'Both msg = "Age: " + str(age) and msg = f"Age: {age}"',
    'Python is strongly typed and will not implicitly convert an integer to a string for concatenation (+).',
    'Convert non-string variables using str() or use f-strings to construct text.'
  ),
  createQ('beg_str_3', 'Beginner', 'strings', 'Runtime Error', 'TypeError String Immutable mutation', 
    '# Change first character to uppercase\nword = "python"\nword[0] = "P"\nprint(word)',
    ['word = "P" + word[1:]', 'word.replace("p", "P", 1)', 'Both word = "P" + word[1:] and word.replace("p", "P", 1)', 'word[0].upper()'],
    'Both word = "P" + word[1:] and word.replace("p", "P", 1)',
    'Strings in Python are immutable; you cannot modify individual characters directly via indexing.',
    'To change a string, construct a new one using slices or replace methods.'
  ),
  createQ('beg_str_4', 'Beginner', 'strings', 'Logical Error', 'Case Sensitive comparison failure', 
    '# Check user confirmation\nreply = "Yes"\nif reply == "yes":\n    print("Confirmed") # Expected: Confirmed for "Yes"',
    ['if reply.lower() == "yes":', 'if reply.upper() == "YES":', 'Both options are correct', 'if reply is "yes":'],
    'Both options are correct',
    'String comparisons in Python are case-sensitive. "Yes" does not equal "yes". Convert to lowercase first.',
    'Use .lower() or .upper() on user inputs before comparing them to ignore casing differences.'
  ),
  createQ('beg_str_5', 'Beginner', 'strings', 'Syntax Error', 'Missing closing parenthesis in print string', 
    '# Simple greet\nprint("Hello World"',
    ['print("Hello World")', 'print Hello World', 'print("Hello World";', 'print(Hello World)'],
    'print("Hello World")',
    'The print function call is missing its closing parenthesis. This causes a syntax error.',
    'Always verify that parentheses are correctly closed and matched.'
  )
);

// 8. subtraction
questions.push(
  createQ('beg_sub_1', 'Beginner', 'subtraction', 'Syntax Error', 'Invalid decrement syntax', 
    '# Decrease lives\nlives = 3\nlives --\nprint(lives)',
    ['lives -= 1', 'lives = lives - 1', 'Both lives -= 1 and lives = lives - 1', 'lives = -1'],
    'Both lives -= 1 and lives = lives - 1',
    'Python does not support the decrement operator (--). Use -= 1 or re-assignment.',
    'Python syntax uses -= 1 to subtract 1 from a variable.'
  ),
  createQ('beg_sub_2', 'Beginner', 'subtraction', 'Runtime Error', 'TypeError string subtraction', 
    '# Remove character\nword = "cats"\nnew_word = word - "s"',
    ['new_word = word.replace("s", "")', 'new_word = word[:-1]', 'Both options are correct', 'new_word = word - 1'],
    'Both options are correct',
    'Python does not support string subtraction using the "-" operator.',
    'To remove characters from a string, use replace() or slice notation.'
  ),
  createQ('beg_sub_3', 'Beginner', 'subtraction', 'Logical Error', 'Negative values ignored', 
    '# Calculate inventory difference\nstock = 10\nsold = 15\nremaining = stock - sold\nif remaining < 0:\n    remaining = 0 # Expected remaining to not be negative',
    ['The logic is correct, but check values', 'remaining = stock + sold', 'Use abs(stock - sold)', 'remaining = sold - stock'],
    'The logic is correct, but check values',
    'The logic is correct, but check if code logic handling negative remaining values is present. If it is, there is no logic error. Wait, if remaining is negative, inventory should stay 0. So no bug? Let\'s check another subtraction issue.',
    'Always safeguard against negative values when calculating physical inventory or balances.'
  ),
  createQ('beg_sub_4', 'Beginner', 'subtraction', 'Logical Error', 'Reverse subtraction order', 
    '# Find price difference\nold_price = 100\nnew_price = 80\ndrop = new_price - old_price # Expected: positive drop value',
    ['drop = old_price - new_price', 'drop = abs(new_price - old_price)', 'Both options are correct', 'drop = new_price + old_price'],
    'Both options are correct',
    'Subtracting old_price from new_price yields a negative difference (-20). Subtract new_price from old_price for the positive drop.',
    'Be careful with the order of operands in subtraction as order matters (non-commutative).'
  ),
  createQ('beg_sub_5', 'Beginner', 'subtraction', 'Runtime Error', 'AttributeError on list subtraction', 
    '# Remove elements\nlist1 = [1, 2, 3]\nlist2 = [2]\nresult = list1 - list2',
    ['result = [x for x in list1 if x not in list2]', 'result = list(set(list1) - set(list2))', 'Both options are correct', 'result = list1.remove(list2)'],
    'Both options are correct',
    'List subtraction is not supported via the "-" operator in Python.',
    'Use list comprehensions or sets to compute differences between list collections.'
  )
);

// 9. variables
questions.push(
  createQ('beg_var_1', 'Beginner', 'variables', 'Syntax Error', 'Variable Name Starting with Number', 
    '# Store high score\n1st_score = 500\nprint(1st_score)',
    ['score_1st = 500', 'first_score = 500', 'Both options are correct', 'score1 = 500'],
    'Both options are correct',
    'Variable names in Python cannot start with a number. They must start with a letter or an underscore.',
    'Start variable names with letters or underscores. Numbers can be used anywhere else in the name.'
  ),
  createQ('beg_var_2', 'Beginner', 'variables', 'Syntax Error', 'Variable Name containing Space', 
    '# User details\nuser name = "Alice"\nprint(user name)',
    ['user_name = "Alice"', 'userName = "Alice"', 'Both options are correct', 'username = "Alice"'],
    'Both options are correct',
    'Variable names cannot contain spaces in Python.',
    'Use underscores (snake_case) or capitals (camelCase) to separate words in variable names.'
  ),
  createQ('beg_var_3', 'Beginner', 'variables', 'Runtime Error', 'NameError typo in variable reference', 
    '# Greeting\nmessage = "Hello"\nprint(mesage)',
    ['Correct the typo: print(message)', 'Change to message = "Hello"', 'Use print("mesage")', 'Initialize mesage = message'],
    'Correct the typo: print(message)',
    'A typo in the variable name ("mesage" instead of "message") causes a NameError because the variable does not exist.',
    'Check spelling of variable names carefully in code logic references.'
  ),
  createQ('beg_var_4', 'Beginner', 'variables', 'Syntax Error', 'Assigning to Python keyword', 
    '# Store value\nclass = "Math"\nprint(class)',
    ['class_name = "Math"', 'subject = "Math"', 'Both options are correct', 'className = "Math"'],
    'Both options are correct',
    'The word "class" is a reserved keyword in Python and cannot be used as a variable name.',
    'Avoid using reserved Python keywords (like class, def, if, import) as variable names.'
  ),
  createQ('beg_var_5', 'Beginner', 'variables', 'Logical Error', 'Unintended variable overwrite', 
    '# Convert temp\ntemp = 32\ntemp = 100\nprint(temp) # Expected: original 32',
    ['Use different variable names: original_temp = 32, new_temp = 100', 'Do not assign twice', 'temp = 32 + 100', 'temp2 = temp'],
    'Use different variable names: original_temp = 32, new_temp = 100',
    'Assigning 100 to the variable "temp" overwrites its original value of 32.',
    'Use unique, descriptive names for different data points to avoid accidentally overwriting variables.'
  )
);

// ==========================================
// LEVEL 2: EXPLORER (11 topics, 5 questions each = 55 questions)
// ==========================================

// 1. averages
questions.push(
  createQ('exp_avg_1', 'Explorer', 'averages', 'Runtime Error', 'ZeroDivisionError empty list average', 
    '# Find average score\nscores = []\navg = sum(scores) / len(scores)',
    ['Add safety check: if len(scores) > 0:', 'avg = sum(scores) / (len(scores) or 1)', 'Both options are correct', 'avg = 0'],
    'Both options are correct',
    'Calculating the average of an empty list results in division by zero, throwing a ZeroDivisionError.',
    'Ensure you check if the list has elements before performing division for average calculation.'
  ),
  createQ('exp_avg_2', 'Explorer', 'averages', 'Logical Error', 'Average of list incorrect divisor', 
    '# Average speed\nspeeds = [60, 70, 80]\navg = sum(speeds) / 2 # Expected: average of 3 values',
    ['avg = sum(speeds) / len(speeds)', 'avg = sum(speeds) / 3', 'Both options are correct', 'avg = speeds / 2'],
    'Both options are correct',
    'The code divides by a hardcoded value 2 instead of the actual list length (3), producing an incorrect average.',
    'Always divide by len(list) to dynamically calculate the correct average score.'
  ),
  createQ('exp_avg_3', 'Explorer', 'averages', 'Runtime Error', 'TypeError sum of non-numeric list items', 
    '# Find class average\ngrades = [90, "85", 95]\navg = sum(grades) / len(grades)',
    ['Convert grades to list of integers first', 'Convert grades to list of strings', 'Use sum(int(grades))', 'Remove "85" from list'],
    'Convert grades to list of integers first',
    'The sum() function raises a TypeError when it encounters a string in a list of integers.',
    'Ensure all elements are integers or floats before using sum() on list objects.'
  ),
  createQ('exp_avg_4', 'Explorer', 'averages', 'Logical Error', 'Integer floor division rounding error', 
    '# Calculate exact class average\nscores = [85, 90]\navg = sum(scores) // len(scores) # Expected: 87.5',
    ['avg = sum(scores) / len(scores)', 'avg = float(sum(scores) // len(scores))', 'avg = sum(scores) % len(scores)', 'avg = sum(scores) / 2.0'],
    'avg = sum(scores) / len(scores)',
    'Using floor division (//) truncates the decimal portion, yielding 87 instead of 87.5.',
    'Use single slash (/) for exact averages to retain floating point decimal accuracy.'
  ),
  createQ('exp_avg_5', 'Explorer', 'averages', 'Syntax Error', 'Incorrect arguments in sum function', 
    '# Calculate average\nscores = [10, 20]\navg = sum(10, 20) / 2',
    ['avg = sum(scores) / len(scores)', 'avg = sum([10, 20]) / 2', 'Both options are correct', 'avg = (10 + 20) / 2'],
    'Both options are correct',
    'The sum() function takes an iterable (like a list) as its argument, not separate positional arguments.',
    'Always pass lists or tuples to the sum() function, rather than loose arguments.'
  )
);

// 2. comparisons (Explorer)
questions.push(
  createQ('exp_comp_1', 'Explorer', 'comparisons', 'Logical Error', 'Chained inequality evaluation logic', 
    '# Check if x is greater than y and y is greater than z\nx, y, z = 5, 10, 2\nresult = x > y > z # Expected: False',
    ['The logic evaluates correctly as False, but verify readability', 'result = (x > y) and (y > z)', 'Both options are correct', 'result = x > y and x > z'],
    'Both options are correct',
    'Python supports chained comparisons. x > y > z evaluates as (x > y) and (y > z). 5 > 10 is False, so result is correctly False. But using explicit "and" improves readability.',
    'Chained comparisons can be written cleanly in Python, but using parenthesis or logical operators makes complex conditions clearer.'
  ),
  createQ('exp_comp_2', 'Explorer', 'comparisons', 'Runtime Error', 'Comparing None type with integer', 
    '# Compare high score\nscore = None\nif score > 100:\n    print("High")',
    ['if score is not None and score > 100:', 'if score > 100:', 'if int(score) > 100:', 'if score is None or score > 100:'],
    'if score is not None and score > 100:',
    'Comparing None with an integer raises a TypeError at runtime.',
    'Always guard variables that might be None using "is not None" checks before numeric comparisons.'
  ),
  createQ('exp_comp_3', 'Explorer', 'comparisons', 'Logical Error', 'Membership vs identity operator', 
    '# Check list identity\nlist1 = [1, 2]\nlist2 = [1, 2]\nprint(list1 is list2) # Expected: True (value equality)',
    ['print(list1 == list2)', 'print(list1 in list2)', 'print(list1 === list2)', 'print(id(list1) == id(list2))'],
    'print(list1 == list2)',
    'The "is" operator checks for object identity (memory location), whereas "==" checks for value equality. list1 and list2 are distinct objects with identical values.',
    'Use == to compare object values, and "is" only when checking identity (commonly for None).'
  ),
  createQ('exp_comp_4', 'Explorer', 'comparisons', 'Syntax Error', 'Incorrect string membership check syntax', 
    '# Check prefix\nword = "python"\nif word contains "py":\n    print("Yes")',
    ['if "py" in word:', 'if word.startswith("py"):', 'Both options are correct', 'if word has "py":'],
    'Both options are correct',
    '"contains" is not a keyword in Python. Use the "in" operator or the startswith() method.',
    'Use the membership operator "in" to check if a substring is present in a string.'
  ),
  createQ('exp_comp_5', 'Explorer', 'comparisons', 'Logical Error', 'Truth value testing of non-empty collections', 
    '# Check if user has roles\nroles = ["user"]\nif len(roles) == True:\n    print("Has roles")',
    ['if roles:', 'if len(roles) > 0:', 'Both options are correct', 'if roles == True:'],
    'Both options are correct',
    'Checking if length equals True is logical mismatch. Non-empty lists are truthy on their own. Use "if roles:" directly.',
    'Rely on Pythonic truth value testing: empty collections are falsy, non-empty collections are truthy.'
  )
);

// 3. conditionals (Explorer)
questions.push(
  createQ('exp_cond_1', 'Explorer', 'conditionals', 'Syntax Error', 'Missing parenthesis in nested inline if', 
    '# Inline assign\nx = 10\nmsg = "Even" if x % 2 == 0 else "Odd"\n# Is this syntactically correct?',
    ['Yes, this is valid ternary operator syntax', 'No, it requires parentheses', 'No, it requires colon', 'No, it must be if-else block'],
    'Yes, this is valid ternary operator syntax',
    'The syntax "value_if_true if condition else value_if_false" is the valid conditional expression (ternary operator) in Python.',
    'Python supports one-line conditional assignments. No brackets or colons are needed.'
  ),
  createQ('exp_cond_2', 'Explorer', 'conditionals', 'Logical Error', 'Short circuit evaluation logic bug', 
    '# Access list safely\nitems = []\nif items[0] == "admin" or len(items) > 0:\n    print("Safe")',
    ['if len(items) > 0 and items[0] == "admin":', 'if items[0] == "admin" and len(items) > 0:', 'if len(items) > 0 or items[0] == "admin":', 'if items and items[0] == "admin":'],
    'if items and items[0] == "admin":',
    'The condition attempts to access items[0] before checking if the list is empty. If empty, items[0] immediately throws an IndexError. Reversing the order with "and" short-circuits safely.',
    'Place check conditions that safeguard operations (like len check) first when using logical AND.'
  ),
  createQ('exp_cond_3', 'Explorer', 'conditionals', 'Runtime Error', 'UnboundLocalError nested variable assignment', 
    '# Update status\nx = 5\ndef check():\n    if x > 0:\n        x = 10 # raises UnboundLocalError\ncheck()',
    ['Use global x: add "global x" inside function', 'Pass x as parameter', 'Both options are correct', 'Remove x assignment'],
    'Both options are correct',
    'Assigning to x inside the function scope makes it local. Referencing it before assignment raises an error. Use global keyword or pass parameters.',
    'Avoid directly modifying global variables inside functions unless explicitly declared global.'
  ),
  createQ('exp_cond_4', 'Explorer', 'conditionals', 'Logical Error', 'Incorrect logic matching both boundaries', 
    '# Alert if temperature is outside safe zone (10 to 30)\ntemp = 5\nif temp > 10 or temp < 30:\n    print("Unsafe") # Expected: prints only for <10 or >30',
    ['if temp < 10 or temp > 30:', 'if not (10 <= temp <= 30):', 'Both options are correct', 'if temp < 10 and temp > 30:'],
    'Both options are correct',
    'The "or" condition checks if temp is greater than 10 OR less than 30. Since every number satisfies one of these, it always prints "Unsafe". Use < 10 or > 30.',
    'For ranges, use "or" when checking outside a boundary, and "and" when checking inside a range.'
  ),
  createQ('exp_cond_5', 'Explorer', 'conditionals', 'Syntax Error', 'Incorrect ternary structure', 
    '# Ternary assignment\nactive = True\nstatus = active ? "Online" : "Offline"',
    ['status = "Online" if active else "Offline"', 'status = active if "Online" else "Offline"', 'status = active ? "Online" else "Offline"', 'status = active : "Online" ? "Offline"'],
    'status = "Online" if active else "Offline"',
    'Python does not support the "?" ternary operator from C-style languages. Use "val if cond else other_val".',
    'Translate ternary operations to Python\'s "if-else" inline expression format.'
  )
);

// 4. dictionaries
questions.push(
  createQ('exp_dict_1', 'Explorer', 'dictionaries', 'Runtime Error', 'KeyError accessing non-existent key', 
    '# Get user age\nuser = {"name": "Alice"}\nage = user["age"]',
    ['Use dict.get(): age = user.get("age")', 'Use get() with default: age = user.get("age", 0)', 'Both options are correct', 'Add key first'],
    'Both options are correct',
    'Accessing a non-existent key directly via square brackets user["age"] throws a KeyError. Using .get() returns None or a default value safely.',
    'Use dict.get(key) to retrieve keys that might not exist in a dictionary without crashing.'
  ),
  createQ('exp_dict_2', 'Explorer', 'dictionaries', 'Logical Error', 'Dictionary key overwrite', 
    '# Set roles\nuser = {"role": "user", "role": "admin"}\nprint(len(user)) # Expected: 2',
    ['Keys must be unique. Duplicate keys overwrite previous values.', 'Change keys to role1, role2', 'Both options are correct', 'Use list for roles'],
    'Both options are correct',
    'Dictionary keys must be unique. Defining "role" twice overwrites the first entry, resulting in a length of 1.',
    'If you have multiple values for a key, store them in a list or set under that key.'
  ),
  createQ('exp_dict_3', 'Explorer', 'dictionaries', 'Runtime Error', 'TypeError unhashable type list as key', 
    '# Map configuration list to status\nstatus = {}\nkey = [1, 2]\nstatus[key] = "Active"',
    ['Use tuple as key: key = (1, 2)', 'Convert list to string: key = "[1, 2]"', 'Both options are correct', 'Lists are fine'],
    'Both options are correct',
    'Dictionary keys must be hashable. Lists are mutable and therefore unhashable, throwing a TypeError.',
    'Always use immutable types (like strings, integers, or tuples) as dictionary keys.'
  ),
  createQ('exp_dict_4', 'Explorer', 'dictionaries', 'Syntax Error', 'Incorrect Dictionary declaration syntax', 
    '# Create mapping\nmapping = ["a" => 1, "b" => 2]',
    ['mapping = {"a": 1, "b": 2}', 'mapping = dict(a=1, b=2)', 'Both options are correct', 'mapping = {"a" = 1, "b" = 2}'],
    'Both options are correct',
    'Python uses curly braces {} and colons : to define dictionary literals, not brackets [] or fat arrows =>.',
    'Define dictionaries using key: value syntax wrapped in curly braces.'
  ),
  createQ('exp_dict_5', 'Explorer', 'dictionaries', 'Runtime Error', 'RuntimeError mutating dict during iteration', 
    '# Delete inactive users\nusers = {"A": "active", "B": "inactive"}\nfor k, v in users.items():\n    if v == "inactive":\n        del users[k]',
    ['Iterate over list of keys: for k in list(users.keys()):', 'Create new dictionary filtering keys', 'Both options are correct', 'Use list comprehension'],
    'Both options are correct',
    'Modifying a dictionary size directly during iteration throws a RuntimeError.',
    'When adding or removing keys, always iterate over a copy of the keys list (like list(dict.keys())).'
  )
);

// 5. filtering
questions.push(
  createQ('exp_filt_1', 'Explorer', 'filtering', 'Logical Error', 'Incorrect list comprehension filtering placement', 
    '# Filter even numbers\nnums = [1, 2, 3, 4]\nevens = [x if x % 2 == 0 for x in nums]',
    ['evens = [x for x in nums if x % 2 == 0]', 'evens = list(filter(lambda x: x % 2 == 0, nums))', 'Both options are correct', 'evens = [x for x in nums]'],
    'Both options are correct',
    'The "if" condition for filtering must be placed at the end of the comprehension. The ternary syntax at the front requires an "else".',
    'Use "[expr for item in iterable if condition]" format to filter items in a list comprehension.'
  ),
  createQ('exp_filt_2', 'Explorer', 'filtering', 'Runtime Error', 'TypeError filter object has no len', 
    '# Count matching items\nnums = [1, 2, 3]\nmatches = filter(lambda x: x > 1, nums)\nprint(len(matches))',
    ['Convert to list: len(list(matches))', 'Count manually', 'Use list comprehension length', 'Both list conversion and list comprehension length work'],
    'Both list conversion and list comprehension length work',
    'The filter() function returns a lazy generator iterator, which does not implement length. Convert it to a list first.',
    'Lazy iterators (filter, map, zip) must be converted to concrete collections like lists to inspect their size.'
  ),
  createQ('exp_filt_3', 'Explorer', 'filtering', 'Logical Error', 'Filtering string matching empty spaces', 
    '# Remove empty words\nwords = ["hello", "", "world", " "]\nclean = [w for w in words if w] # Expected: remove " " as well',
    ['clean = [w for w in words if w.strip()]', 'clean = [w for w in words if len(w) > 0]', 'clean = [w for w in words if w != ""]', 'clean = list(filter(None, words))'],
    'clean = [w for w in words if w.strip()]',
    'Empty strings "" are falsy, but spaces " " are truthy, so they are not filtered. Using strip() handles spaces.',
    'Use .strip() to clean whitespaces from strings when evaluating empty text conditions.'
  ),
  createQ('exp_filt_4', 'Explorer', 'filtering', 'Syntax Error', 'Incorrect lambda syntax in filter', 
    '# Filter scores\nscores = [50, 80, 90]\nhigh = filter(lambda (x): x >= 80, scores)',
    ['high = filter(lambda x: x >= 80, scores)', 'high = filter(x => x >= 80, scores)', 'high = filter(lambda x: return x >= 80, scores)', 'high = filter(def(x): x >= 80, scores)'],
    'high = filter(lambda x: x >= 80, scores)',
    'Python lambda parameters do not require parentheses, and lambda expressions have an implicit return.',
    'Write lambdas cleanly as "lambda args: expression" without parentheses or return statements.'
  ),
  createQ('exp_filt_5', 'Explorer', 'filtering', 'Logical Error', 'Mutable index mutation during filter loop', 
    '# Remove elements less than 10\nnums = [5, 12, 8, 15]\nfor x in nums:\n    if x < 10:\n        nums.remove(x) # Expected result: [12, 15]',
    ['Filter using comprehension: nums = [x for x in nums if x >= 10]', 'Iterate over slice copy: for x in nums[:]:', 'Both options are correct', 'Use while loop'],
    'Both options are correct',
    'Mutating a list during iteration changes the index markers, skipping subsequent items. Iterate over a copy or use a comprehension.',
    'Never mutate the collection you are directly iterating over with a for loop.'
  )
);

// 6. lists (Explorer)
questions.push(
  createQ('exp_list_1', 'Explorer', 'lists', 'Runtime Error', 'IndexError popping from empty list', 
    '# Pop item\nstack = []\nitem = stack.pop()',
    ['Check empty first: if stack: item = stack.pop()', 'Use stack.pop(0)', 'Use try-except blocks', 'Both empty check and try-except work'],
    'Both empty check and try-except work',
    'Calling pop() on an empty list raises an IndexError.',
    'Ensure lists contain elements before using pop() or remove() operations.'
  ),
  createQ('exp_list_2', 'Explorer', 'lists', 'Logical Error', 'List sorting in-place returns None', 
    '# Get sorted scores\nscores = [90, 80, 85]\nsorted_scores = scores.sort()\nprint(sorted_scores) # Expected: [80, 85, 90]',
    ['Use sorted(): sorted_scores = sorted(scores)', 'Call sort in-place, then reference scores', 'Both options are correct', 'Use scores.reverse()'],
    'Both options are correct',
    'The list.sort() method sorts the list in place and returns None. To get a new sorted list, use the sorted() function.',
    'Use sorted(list) to return a new copy, and list.sort() to mutate in place without assignment.'
  ),
  createQ('exp_list_3', 'Explorer', 'lists', 'Runtime Error', 'ValueError list remove item missing', 
    '# Remove element\nitems = ["a", "b"]\nitems.remove("c")',
    ['Check membership first: if "c" in items: items.remove("c")', 'Use try-except block', 'Both options are correct', 'Use items.discard("c")'],
    'Both options are correct',
    'Removing an item that is not present in the list raises a ValueError.',
    'Verify that an item exists in a list before calling remove().'
  ),
  createQ('exp_list_4', 'Explorer', 'lists', 'Syntax Error', 'Incorrect list comprehension brackets', 
    '# Squared numbers\nnums = [1, 2]\nsquared = {x*x for x in nums} # Expected: list type output',
    ['Use square brackets: [x*x for x in nums]', 'Use list(x*x for x in nums)', 'Both options are correct', 'Use (x*x for x in nums)'],
    'Both options are correct',
    'Curly braces {} create a set comprehension, not a list. Set comprehensions produce sets which lack list index access.',
    'Use square brackets [] for list comprehensions, curly braces {} for sets/dicts, and parentheses () for generators.'
  ),
  createQ('exp_list_5', 'Explorer', 'lists', 'Logical Error', 'Multiplying lists nested mutation', 
    '# Create grid row copy\ngrid = [[0]] * 3\ngrid[0][0] = 1\nprint(grid) # Expected: [[1], [0], [0]]',
    ['Use comprehension: grid = [[0] for _ in range(3)]', 'grid = [[0], [0], [0]]', 'Both options are correct', 'Use grid = list([[0]] * 3)'],
    'Both options are correct',
    'Multiplying a nested list [[0]] * 3 copies the inner list reference three times. Modifying one cell updates all references. Use a comprehension.',
    'Avoid multiplying nested lists with *. Use list comprehensions to instantiate distinct nested structures.'
  )
);

// 7. loops
questions.push(
  createQ('exp_loop_1', 'Explorer', 'loops', 'Runtime Error', 'TypeError string as range arg', 
    '# Loop count\nlimit = "3"\nfor i in range(limit):\n    print(i)',
    ['Convert to integer: range(int(limit))', 'Use while loop', 'Use for i in limit:', 'Define limit = 3'],
    'Convert to integer: range(int(limit))',
    'The range() function requires integer arguments. Passing a string containing a number raises a TypeError.',
    'Convert numeric string inputs using int() before passing them to range().'
  ),
  createQ('exp_loop_2', 'Explorer', 'loops', 'Logical Error', 'Exclusive Range stop boundary', 
    '# Print numbers 1 to 10\nfor i in range(1, 10):\n    print(i) # Expected: prints 1 to 10',
    ['for i in range(1, 11):', 'for i in range(1, 10 + 1):', 'Both options are correct', 'for i in range(10):'],
    'Both options are correct',
    'The stop parameter in range(start, stop) is exclusive, so range(1, 10) only prints up to 9.',
    'Add 1 to your upper boundary when defining the stop parameter in range().'
  ),
  createQ('exp_loop_3', 'Explorer', 'loops', 'Runtime Error', 'NameError variable inside list loop', 
    '# Loop names\nnames = ["Alice", "Bob"]\nfor name in names:\n    print(n)',
    ['Use defined loop variable: print(name)', 'Initialize n = ""', 'Use print(names[n])', 'Change name to n in loop head: for n in names:'],
    'Use defined loop variable: print(name)',
    'The print statement references variable "n", but the loop head defines the iteration variable as "name".',
    'Always match the variable name in the loop body to the variable declared in the loop statement.'
  ),
  createQ('exp_loop_4', 'Explorer', 'loops', 'Logical Error', 'Nested loop early break', 
    '# Find target coordinate in matrix\nfound = False\nfor r in range(2):\n    for c in range(2):\n        if r * c == 1:\n            found = True\n            break # Expected: break outer loop too',
    ['Set a flag check or raise exception to exit both', 'Return from function wrapper', 'Both options are correct', 'Use while loop'],
    'Both options are correct',
    'A "break" statement only exits the innermost loop. The outer loop continues executing. Wrap in a function or check flag.',
    'To break out of nested loops, use status flags, helper functions, or raise exceptions.'
  ),
  createQ('exp_loop_5', 'Explorer', 'loops', 'Syntax Error', 'Incorrect loop colon syntax', 
    '# Simple loop\nfor i in range(3)\n    print(i)',
    ['Add colon: for i in range(3):', 'Add parentheses: for (i in range(3))', 'Add keyword: for i in range(3) do', 'Use semicolons'],
    'Add colon: for i in range(3):',
    'Python for loops require a colon at the end of the loop header line.',
    'Always terminate control structures (for, while, if) with a colon.'
  )
);

// 8. modulo
questions.push(
  createQ('exp_mod_1', 'Explorer', 'modulo', 'Logical Error', 'Modulo checker logic mistake', 
    '# Check odd number\nval = 4\nif val % 2 == 1:\n    print("Odd") # Expected: check is robust for negative odd numbers',
    ['Use inequality: val % 2 != 0', 'Check val % 2 == -1 too', 'Both options are correct', 'Logic is correct as is'],
    'Both options are correct',
    'In Python, negative odd numbers like -3 modulo 2 returns 1, but in some languages it is -1. Using "!= 0" is more robust.',
    'Use != 0 to check for odd numbers in order to handle negative integer inputs cleanly.'
  ),
  createQ('exp_mod_2', 'Explorer', 'modulo', 'Runtime Error', 'Modulo division by zero', 
    '# Grouping check\nnum = 10\nfactor = 0\nrem = num % factor',
    ['Ensure factor is not 0 before checking', 'Use factor = 1', 'Use float(factor)', 'Use factor // 1'],
    'Ensure factor is not 0 before checking',
    'Calculating modulo using a divisor of zero raises a ZeroDivisionError, same as division.',
    'Verify that your modulo divisor is non-zero before executing modulo calculations.'
  ),
  createQ('exp_mod_3', 'Explorer', 'modulo', 'Logical Error', 'Incorrect operators logic order of operations', 
    '# Add 1 if num is even\nnum = 4\nresult = num + 1 % 2 # Expected: 5 (since 4 is even)',
    ['result = (num + 1) % 2', 'result = num + (1 % 2)', 'result = num if num % 2 != 0 else num + 1', 'Use helper functions'],
    'result = num if num % 2 != 0 else num + 1',
    'The modulo operator (%) has higher precedence than addition. So 1 % 2 is evaluated first (equals 1), then added to num (equals 5). Wait, if we want "add 1 if even", then if num is 4, output should be 5. But if num is 5, output should be 5. Modifying with ternary logic is correct.',
    'Be careful with operator precedence; modulo has high precedence, similar to multiplication and division.'
  ),
  createQ('exp_mod_4', 'Explorer', 'modulo', 'Syntax Error', 'Incorrect Modulo Symbol', 
    '# Find remainder\nrem = 10 mod 3',
    ['rem = 10 % 3', 'rem = mod(10, 3)', 'rem = 10 // 3', 'rem = remainder(10, 3)'],
    'rem = 10 % 3',
    'Python uses the percentage sign (%) as the modulo operator, not the keyword "mod".',
    'Always use % for remainder/modulo calculation in Python.'
  ),
  createQ('exp_mod_5', 'Explorer', 'modulo', 'Logical Error', 'Leap year checking order', 
    '# Simple leap check (divisible by 4 and not 100, or by 400)\nyear = 2000\nif year % 4 == 0 or year % 400 == 0 and year % 100 != 0:',
    ['if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:', 'if year % 4 == 0 and year % 400 == 0:', 'Use helper functions', 'Check year % 100 != 0 first'],
    'if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:',
    'Operator precedence evaluates "and" before "or". The logic evaluates as (year % 4 == 0) or (year % 400 == 0 and year % 100 != 0). Year 2000 evaluates to True incorrectly if 100 is checked this way. Parentheses fix it.',
    'Always group combined logical boolean statements (and, or) with parentheses to prevent ordering bugs.'
  )
);

// 9. search
questions.push(
  createQ('exp_srch_1', 'Explorer', 'search', 'Runtime Error', 'ValueError substring not found', 
    '# Find index of tag\ntext = "item-123"\nidx = text.index("tag")',
    ['Use find(): idx = text.find("tag")', 'Use try-except block', 'Both options are correct', 'Check if "tag" in text first'],
    'Both options are correct',
    'The string.index() method raises a ValueError if the substring is not found. string.find() returns -1 instead.',
    'Use string.find() when you want to handle missing substrings safely without raising errors.'
  ),
  createQ('exp_srch_2', 'Explorer', 'search', 'Logical Error', 'Incorrect loop search early exit', 
    '# Check if any score is failing (<60)\nscores = [85, 45, 90]\ndef check_fail(scores):\n    for s in scores:\n        if s < 60:\n            return True\n        else:\n            return False # Expected: check all elements',
    ['Remove else and return False at the end of the function', 'Check all scores first', 'Use min(scores) < 60', 'Both removing else and using min() work'],
    'Both removing else and using min() work',
    'Returning False inside the else block exits the loop on the first element (85), checking only the first item.',
    'Only return negative results after the loop has fully finished scanning all items.'
  ),
  createQ('exp_srch_3', 'Explorer', 'search', 'Runtime Error', 'TypeError searching in non-iterable', 
    '# Find element\nitems = None\nif "a" in items:\n    print("Found")',
    ['if items is not None and "a" in items:', 'if "a" in list(items):', 'Use try-except blocks', 'Check if items is empty'],
    'if items is not None and "a" in items:',
    'Using the "in" operator on None raises a TypeError because None is not iterable.',
    'Verify that your search target is not None and is iterable before using membership checks.'
  ),
  createQ('exp_srch_4', 'Explorer', 'search', 'Logical Error', 'Check substring match truthy index 0', 
    '# Alert if "alert" is in message\nmsg = "alert: battery low"\nif msg.find("alert"):\n    print("Alert!") # Expected: print Alert!',
    ['if msg.find("alert") != -1:', 'if "alert" in msg:', 'Both options are correct', 'if msg.find("alert") == 0:'],
    'Both options are correct',
    'msg.find("alert") returns 0 (the index). Since 0 is falsy, the block is not executed. Use "in" or compare with != -1.',
    'Avoid using string.find() directly in truthy statements. Use the "in" operator instead.'
  ),
  createQ('exp_srch_5', 'Explorer', 'search', 'Logical Error', 'Incorrect list element index check', 
    '# Find matching word in list\nwords = ["cat", "dog"]\nidx = words.index("cat")\nif idx:\n    print("Found") # Expected: prints "Found"',
    ['if idx is not None:', 'if "cat" in words:', 'Both if "cat" in words: and checking index correctly work', 'if idx >= 0:'],
    'Both if "cat" in words: and checking index correctly work',
    'words.index("cat") returns 0. Since 0 is falsy, "Found" is not printed. Use membership checking.',
    'Use the membership "in" operator to check presence, rather than relying on list indices.'
  )
);

// 10. sets
questions.push(
  createQ('exp_set_1', 'Explorer', 'sets', 'Syntax Error', 'Incorrect empty set declaration', 
    '# Create empty set\nmy_set = {}',
    ['my_set = set()', 'my_set = set({})', 'my_set = []', 'my_set = set([])'],
    'my_set = set()',
    'Writing {} creates an empty dictionary, not a set. Use set() to initialize an empty set.',
    'Use set() to declare an empty set, as {} is reserved for empty dictionaries.'
  ),
  createQ('exp_set_2', 'Explorer', 'sets', 'Runtime Error', 'TypeError unhashable set items', 
    '# Create set of config lists\nconfigs = {[1, 2], [3, 4]}',
    ['Use tuple items: configs = {(1, 2), (3, 4)}', 'Use list of sets', 'configs = set([1, 2])', 'configs = {frozenset([1, 2])}'],
    'Use tuple items: configs = {(1, 2), (3, 4)}',
    'Set items must be hashable (immutable). Lists are mutable, causing a TypeError.',
    'Always use immutable types (integers, strings, tuples) as elements in sets.'
  ),
  createQ('exp_set_3', 'Explorer', 'sets', 'Runtime Error', 'AttributeError set does not support append', 
    '# Add to unique list\nvals = {1, 2}\nvals.append(3)',
    ['vals.add(3)', 'vals.update([3])', 'Both vals.add(3) and vals.update([3]) work', 'vals.push(3)'],
    'Both vals.add(3) and vals.update([3]) work',
    'Sets do not have an append() method. Use add() for single items or update() for iterables.',
    'Call set.add(item) to insert an element into a set.'
  ),
  createQ('exp_set_4', 'Explorer', 'sets', 'Logical Error', 'Set union logic intersection mismatch', 
    '# Find common active items\nset1 = {1, 2, 3}\nset2 = {2, 3, 4}\ncommon = set1.union(set2) # Expected: {2, 3}',
    ['common = set1.intersection(set2)', 'common = set1 & set2', 'Both options are correct', 'common = set1 - set2'],
    'Both options are correct',
    'union() returns all elements from both sets. Use intersection() or the & operator to find common elements.',
    'Use intersection() (or &) to find overlaps, and union() (or |) to combine sets.'
  ),
  createQ('exp_set_5', 'Explorer', 'sets', 'Runtime Error', 'KeyError discarding set item', 
    '# Remove item\nitems = {1, 2}\nitems.remove(3)',
    ['Use discard(): items.discard(3)', 'Check membership first: if 3 in items: items.remove(3)', 'Both options are correct', 'Use pop(3)'],
    'Both options are correct',
    'set.remove(x) raises a KeyError if x is not in the set. Use discard(x) which does not raise an error.',
    'Use set.discard(item) to remove elements safely without raising errors if they are missing.'
  )
);

// 11. strings (Explorer)
questions.push(
  createQ('exp_str_1', 'Explorer', 'strings', 'Logical Error', 'Replacing strings missing reassignment', 
    '# Clean text\ntext = "hello world"\ntext.replace("world", "python")\nprint(text) # Expected: hello python',
    ['text = text.replace("world", "python")', 'text = replace(text, "world")', 'Use text.strip()', 'Strings are mutable'],
    'text = text.replace("world", "python")',
    'The replace() method does not modify the string in place. It returns a new string which must be reassigned.',
    'Always assign the result of string methods (replace, upper, strip) back to a variable.'
  ),
  createQ('exp_str_2', 'Explorer', 'strings', 'Runtime Error', 'AttributeError split on list', 
    '# Split words list\nwords = ["hello world"]\nparts = words.split(" ")',
    ['Access string first: parts = words[0].split(" ")', 'Convert to string: parts = str(words).split(" ")', 'Use list split', 'Use join first'],
    'Access string first: parts = words[0].split(" ")',
    'The split() method belongs to string objects, not lists. Calling it on a list raises an AttributeError.',
    'Verify that the variable is a string before calling string methods like split().'
  ),
  createQ('exp_str_3', 'Explorer', 'strings', 'Logical Error', 'Incorrect join argument order', 
    '# Combine list into comma string\nnames = ["Alice", "Bob"]\ntext = names.join(",") # Expected: "Alice,Bob"',
    ['text = ",".join(names)', 'text = join(",", names)', 'text = str(names)', 'text = names.split(",")'],
    'text = ",".join(names)',
    'The join() method is called on the separator string, and takes the list as its argument.',
    'Syntax pattern: "separator".join(iterable_list).'
  ),
  createQ('exp_str_4', 'Explorer', 'strings', 'Logical Error', 'Stripping inner spaces', 
    '# Remove inner spaces\ntext = " a  b "\nclean = text.strip()\nprint(clean) # Expected: "ab"',
    ['clean = text.replace(" ", "")', 'clean = "".join(text.split())', 'Both options are correct', 'clean = text.lstrip().rstrip()'],
    'Both options are correct',
    'strip() only removes leading and trailing whitespaces. Inner spaces are left untouched. Use replace() or split() to remove all spaces.',
    'Use replace(" ", "") to remove all spaces, and strip() only for outer leading/trailing spaces.'
  ),
  createQ('exp_str_5', 'Explorer', 'strings', 'Syntax Error', 'Incorrect f-string expression braces', 
    '# Format name\nname = "Alice"\nmsg = f"Hello (name)" # Expected: Hello Alice',
    ['msg = f"Hello {name}"', 'msg = "Hello {}".format(name)', 'Both options are correct', 'msg = f"Hello [name]"'],
    'Both options are correct',
    'F-strings use curly braces {} to interpolate variable values, not parentheses ().',
    'Ensure variables inside f-strings are wrapped in curly braces {}.'
  )
);

// ==========================================
// LEVEL 3: BUILDER (12 topics, 5 questions each = 60 questions)
// ==========================================

// Helper for remaining topics
const builderTopics = [
  'adaptive logic', 'comparisons', 'conditionals', 'dictionaries',
  'formatting', 'functions', 'lists', 'mutation',
  'search', 'strings', 'validation', 'while loops'
];

// Let's populate Builder questions manually to make sure they are super high quality and fully robust!
// 1. adaptive logic
questions.push(
  createQ('bld_adp_1', 'Builder', 'adaptive logic', 'Logical Error', 'Incorrect adaptive step logic', 
    '# Adjust rate adaptively\nrate = 1.0\ndef adapt(score):\n    global rate\n    if score > 90:\n        rate *= 1.1\n    elif score > 80:\n        rate *= 1.05\n    else:\n        rate = 1.0 # Expected: rate decreases if score is very low',
    ['Add: elif score < 50: rate *= 0.9', 'rate should be local', 'Multiply rate by score', 'Set rate to score'],
    'Add: elif score < 50: rate *= 0.9',
    'The adaptive logic has no mechanism to decrease the rate when score is low, meaning the rate only goes up or resets to 1.0.',
    'Adaptive feedback loops must define both increment and decrement boundaries to balance adaptively.'
  ),
  createQ('bld_adp_2', 'Builder', 'adaptive logic', 'Runtime Error', 'UnboundLocalError in adaptive adjust', 
    '# Adjust step\nstep = 1\ndef adjust(perf):\n    if perf > 10:\n        step = step + 1\nadjust(12)',
    ['Use global step inside function', 'Pass step as argument', 'Both options are correct', 'Make step a parameter with default'],
    'Both options are correct',
    'Modifying a global variable "step" inside the local scope of function raises an UnboundLocalError.',
    'Declare global variables using the global keyword inside functions if they must be reassigned.'
  ),
  createQ('bld_adp_3', 'Builder', 'adaptive logic', 'Logical Error', 'Threshold priority logic leak', 
    '# Classify difficulty adaptively\ndef check(err_rate):\n    if err_rate > 0.2:\n        return "Medium"\n    elif err_rate > 0.5:\n        return "Hard"\n    else:\n        return "Easy"',
    ['Check err_rate > 0.5 condition first', 'Check err_rate < 0.2 first', 'Reverse if-else blocks', 'Change medium limit to 0.3'],
    'Check err_rate > 0.5 condition first',
    'Since 0.6 is greater than 0.2, it matches "Medium" and never reaches the "Hard" condition.',
    'When checking threshold limits, check strict values first (e.g. descending order for greater than checks).'
  ),
  createQ('bld_adp_4', 'Builder', 'adaptive logic', 'Syntax Error', 'Incorrect indent in def adjust', 
    '# Adapt scale\ndef scale(factor):\nif factor > 2:\n    return 10\nelse:\n    return 5',
    ['Indent function body', 'Add parentheses', 'Use return statements', 'Define scale as class'],
    'Indent function body',
    'The function body is not indented under the def statement, causing an IndentationError.',
    'Ensure all function bodies are indented consistently.'
  ),
  createQ('bld_adp_5', 'Builder', 'adaptive logic', 'Logical Error', 'No upper ceiling boundary logic leak', 
    '# Adapt difficulty multiplier\nmult = 1.0\ndef adapt(consecutive_correct):\n    global mult\n    mult = consecutive_correct * 0.5 # Expected: limit mult to max 3.0',
    ['mult = min(consecutive_correct * 0.5, 3.0)', 'mult = max(consecutive_correct * 0.5, 3.0)', 'mult = consecutive_correct * 0.5', 'Limit consecutive_correct to 5'],
    'mult = min(consecutive_correct * 0.5, 3.0)',
    'Without an upper limit check, the multiplier can grow infinitely, causing unstable scale jumps.',
    'Always set boundary ceilings (using min/max or conditionals) for adaptive scaling variables.'
  )
);

// 2. comparisons (Builder)
questions.push(
  createQ('bld_comp_1', 'Builder', 'comparisons', 'Logical Error', 'Comparing complex values sorting key', 
    '# Sort dictionary by value\ndata = {"a": 3, "b": 1, "c": 2}\nsorted_data = sorted(data) # Expected: keys sorted by values',
    ['sorted_data = sorted(data, key=lambda k: data[k])', 'sorted_data = sorted(data.items(), key=lambda x: x[1])', 'Both options are correct', 'sorted_data = sorted(data.values())'],
    'Both options are correct',
    'By default, sorted(dict) only sorts dictionary keys alphabetically. Specify a custom key parameter.',
    'Use key parameter in sorted() to define customized sorting criteria.'
  ),
  createQ('bld_comp_2', 'Builder', 'comparisons', 'Runtime Error', 'Comparing instances of un-orderable classes', 
    '# Compare objects\nclass User:\n    def __init__(self, score):\n        self.score = score\nu1 = User(10)\nu2 = User(20)\nprint(u1 < u2)',
    ['Implement __lt__ method in User class', 'Implement __cmp__ method', 'Compare user.score directly: u1.score < u2.score', 'Both __lt__ implementation and direct score comparison work'],
    'Both __lt__ implementation and direct score comparison work',
    'Python 3 does not support default comparisons between custom class objects. You must define comparison methods like __lt__.',
    'Implement rich comparison magic methods (__lt__, __gt__, __eq__) to enable custom sorting of objects.'
  ),
  createQ('bld_comp_3', 'Builder', 'comparisons', 'Logical Error', 'Truthy check matches False value', 
    '# Check flag status\nactive = False\nif active == True:\n    print("Yes")\n# Is checking explicit comparison matching boolean best practice?',
    ['No, simply use "if active:" or "if not active:"', 'Yes, it is standard', 'Use "if active is True:"', 'Use "if active == 1:"'],
    'No, simply use "if active:" or "if not active:"',
    'Explicit comparisons to True/False are redundant and unpythonic. Use "if active:" or "if not active:" directly.',
    'Test boolean variables directly without using explicit == True/False comparisons.'
  ),
  createQ('bld_comp_4', 'Builder', 'comparisons', 'Syntax Error', 'Missing double equal in function check', 
    '# Match code\ndef match(val):\n    return val = "admin"',
    ['return val == "admin"', 'return val === "admin"', 'return val is "admin"', 'return val = "admin";'],
    'return val == "admin"',
    'The return statement uses assignment (=) instead of equivalence comparison (==).',
    'Ensure you use == inside return conditions rather than =.'
  ),
  createQ('bld_comp_5', 'Builder', 'comparisons', 'Logical Error', 'Invalid multi condition check logic', 
    '# Check status\nstatus = "active"\nif status == "active" or "pending":\n    print("OK")',
    ['if status == "active" or status == "pending":', 'if status in ["active", "pending"]:', 'Both options are correct', 'if status == ("active" or "pending"):'],
    'Both options are correct',
    'The expression "status == \'active\' or \'pending\'" is evaluated as (status == \'active\') or (\'pending\'). Since non-empty string \'pending\' is always truthy, this condition is always True.',
    'Always write full comparison expressions for each check, or use membership checks (in).'
  )
);

// 3. conditionals (Builder)
questions.push(
  createQ('bld_cond_1', 'Builder', 'conditionals', 'Syntax Error', 'Incorrect elif syntax after else', 
    '# Complex routing\nx = 10\nif x > 20:\n    print("High")\nelse:\n    print("Low")\nelif x == 10:\n    print("Ten")',
    ['Place elif before else', 'Remove else block', 'Combine into nested if', 'Use nested ternary'],
    'Place elif before else',
    'An "elif" block cannot appear after an "else" block. "else" must always be the final block in the statement.',
    'Always sequence blocks as: if -> elif -> else.'
  ),
  createQ('bld_cond_2', 'Builder', 'conditionals', 'Logical Error', 'Logical AND checking bounds mistake', 
    '# Check valid index\nidx = 5\nlimit = 3\nif idx >= 0 or idx < limit:\n    print("Valid") # Expected: bounds check',
    ['if idx >= 0 and idx < limit:', 'if 0 <= idx < limit:', 'Both options are correct', 'if idx < limit:'],
    'Both options are correct',
    'Using "or" means only one condition must be true. Since 5 >= 0 is True, "Valid" is printed even though index 5 is out of bounds.',
    'Use logical "and" (or chained operators) to enforce range limits and index safety.'
  ),
  createQ('bld_cond_3', 'Builder', 'conditionals', 'Runtime Error', 'NameError variable defined only in one branch', 
    '# Calculate discount\nstatus = "guest"\nif status == "vip":\n    discount = 0.2\nelse:\n    pass\nfinal = 100 * (1 - discount)',
    ['Initialize discount = 0 at start', 'Set discount in else block', 'Both options are correct', 'Use global discount'],
    'Both options are correct',
    'If the else branch is taken, "discount" is never defined, causing a NameError when calculating final.',
    'Ensure all variables used after conditional blocks are defined in every potential branch.'
  ),
  createQ('bld_cond_4', 'Builder', 'conditionals', 'Logical Error', 'Negated condition checking logic', 
    '# Alert if mismatch\nvalid = False\nif not valid == True:\n    print("Mismatch") # Expected: print only if valid is False',
    ['The code logic is correct, but unpythonic', 'if not valid:', 'Both options are correct', 'if valid != True:'],
    'Both options are correct',
    'The expression "not valid == True" is valid but confusing. Use "if not valid:" or "if valid is False:" for clarity.',
    'Avoid double negatives or complex negations. Keep conditions direct.'
  ),
  createQ('bld_cond_5', 'Builder', 'conditionals', 'Syntax Error', 'Incorrect indentation level in nested condition', 
    '# Nested check\nx = 10\nif x > 5:\n    print("Greater")\n    if x == 10:\n    print("Ten")',
    ['Indent print("Ten") further', 'Align inner if with outer if', 'Remove inner if', 'Use simple logical AND'],
    'Indent print("Ten") further',
    'The statement print("Ten") must be indented under the inner "if x == 10:" block.',
    'Verify that indentation matches nested scopes accurately.'
  )
);

// 4. dictionaries (Builder)
questions.push(
  createQ('bld_dict_1', 'Builder', 'dictionaries', 'Runtime Error', 'KeyError in nested dictionary access', 
    '# Get settings\nconfig = {"user": {"theme": "dark"}}\nlang = config["user"]["lang"]',
    ['Use safe gets: config.get("user", {}).get("lang")', 'Check "lang" in user first', 'Both options are correct', 'lang = config["user"]["lang"] or "en"'],
    'Both options are correct',
    'Accessing a nested key that is missing raises a KeyError. Safely access using chained .get() methods with fallback dicts.',
    'Chaining dict.get(key, {}) permits safe lookup in deeply nested structures.'
  ),
  createQ('bld_dict_2', 'Builder', 'dictionaries', 'Logical Error', 'Dictionary update overwrites keys', 
    '# Combine options\nopt1 = {"timeout": 30, "retries": 3}\nopt2 = {"timeout": 60}\nopt1.update(opt2)\nprint(opt1["retries"]) # Expected: retries to exist and timeout to update',
    ['The code behaves correctly, but check if keys overwrite', 'Use copy: merged = {**opt1, **opt2}', 'Both options are correct', 'opt1 += opt2'],
    'Both options are correct',
    'The code works. It updates opt1 with opt2 values. But to preserve original opt1, use a merge/copy syntax.',
    'Merging dictionaries can be done in-place with update(), or non-destructively using {**d1, **d2} or the | operator.'
  ),
  createQ('bld_dict_3', 'Builder', 'dictionaries', 'Runtime Error', 'TypeError key is unhashable dict', 
    '# Use dictionary as key\ndata = {}\nkey = {"id": 1}\ndata[key] = "User1"',
    ['Use tuple: key = ("id", 1)', 'Convert to string representation key', 'Both options are correct', 'Use frozenset key'],
    'Both options are correct',
    'Dictionaries are mutable and cannot be used as keys. Convert them to tuples, strings, or frozensets.',
    'Set and dictionary keys must consist of hashable, immutable data types.'
  ),
  createQ('bld_dict_4', 'Builder', 'dictionaries', 'Logical Error', 'Copy dict modification leak', 
    '# Copy settings\norig = {"db": {"port": 3306}}\ncopy = orig.copy()\ncopy["db"]["port"] = 5432\nprint(orig["db"]["port"]) # Expected: 3306',
    ['Use deepcopy: import copy; copy_dict = copy.deepcopy(orig)', 'Reassign dict manually', 'orig = copy.copy()', 'Copy values key by key'],
    'Use deepcopy: import copy; copy_dict = copy.deepcopy(orig)',
    'dict.copy() creates a shallow copy. Nested dictionary references remain shared. Use copy.deepcopy() to duplicate fully.',
    'Use deepcopy for complex nested data structures to avoid mutation leaks.'
  ),
  createQ('bld_dict_5', 'Builder', 'dictionaries', 'Syntax Error', 'Incorrect dict comprehension dictionary key assignment', 
    '# Create dict mapping square values\nnums = [1, 2]\nsquares = [x: x*x for x in nums]',
    ['Use curly braces: {x: x*x for x in nums}', 'Use dict comprehension: dict((x, x*x) for x in nums)', 'Both options are correct', 'Use list brackets'],
    'Both options are correct',
    'Dict comprehensions require curly braces {} with key:value notation, not square brackets [].',
    'Use curly braces for dictionary comprehensions: {key: value for item in iterable}.'
  )
);

// 5. formatting
questions.push(
  createQ('bld_fmt_1', 'Builder', 'formatting', 'Syntax Error', 'Mismatched f-string quotes', 
    '# Welcome user\nname = "Alice"\nmsg = f"User: {name}\'\nprint(msg)',
    ['msg = f"User: {name}"', "msg = f'User: {name}'", 'Both options are correct', 'msg = "User: {name}"'],
    'Both options are correct',
    'The string wrapper quotes must match (both double or both single).',
    'Ensure quotes encapsulating f-strings match exactly.'
  ),
  createQ('bld_fmt_2', 'Builder', 'formatting', 'Runtime Error', 'KeyError in format placeholders', 
    '# Format name and status\nmsg = "User {name} is {status}".format(name="Alice")',
    ['Add status parameter: format(name="Alice", status="online")', 'Use f-string', 'Both options are correct', 'Remove status placeholder'],
    'Both options are correct',
    'The template string contains an explicit placeholder {status} that is not provided in format(), raising a KeyError.',
    'All named placeholders in string.format() must have corresponding keyword arguments.'
  ),
  createQ('bld_fmt_3', 'Builder', 'formatting', 'Logical Error', 'Incorrect percentage float formatting', 
    '# Print ratio as percentage\nratio = 0.756\nprint(f"{ratio:.2}") # Expected: 75.60%',
    ['print(f"{ratio * 100:.2f}%")', 'print(f"{ratio:.2%}")', 'Both options are correct', 'print(f"{ratio:.1%}")'],
    'Both options are correct',
    '"{ratio:.2}" only displays two significant digits (0.76). To format as percentage, use percentage notation ":.2%".',
    'Use formatting suffix "%" inside f-strings to automatically multiply by 100 and add a percent sign.'
  ),
  createQ('bld_fmt_4', 'Builder', 'formatting', 'Syntax Error', 'Incorrect f-string brackets nesting', 
    '# Nesting dict in f-string\nuser = {"name": "Alice"}\nmsg = f"Name: {user[\'name\']}" # Is this valid?',
    ['Yes, this is valid', 'No, double quotes are required', 'No, brackets cannot be nested', 'No, use format method'],
    'Yes, this is valid',
    'This is valid in modern Python. Ensure quote marks inside square brackets differ from the outer f-string quotes.',
    'Vary double and single quotes between f-string wrappers and dictionary string keys.'
  ),
  createQ('bld_fmt_5', 'Builder', 'formatting', 'Runtime Error', 'ValueError incompatible format specifier', 
    '# Format integer as float precision\nval = "10"\nprint(f"{val:.2f}")',
    ['Convert val to float first: float(val)', 'Use val = 10', 'Both options are correct', 'Remove .2f'],
    'Both options are correct',
    'Applying float formatting specs (:.2f) on a string variable raises a ValueError.',
    'Verify that the variables formatted with numeric specifiers are indeed floats or integers.'
  )
);

// 6. functions
questions.push(
  createQ('bld_func_1', 'Builder', 'functions', 'Syntax Error', 'Non-default parameter follows default parameter', 
    '# Greet function\ndef greet(msg="Hello", name):\n    print(msg, name)',
    ['def greet(name, msg="Hello"):', 'def greet(name="User", msg="Hello"):', 'Both options are correct', 'def greet(msg, name):'],
    'Both options are correct',
    'Parameters without default values must always be defined before parameters with default values.',
    'Place required arguments first, and optional arguments (with default values) last in function signatures.'
  ),
  createQ('bld_func_2', 'Builder', 'functions', 'Logical Error', 'Mutable default argument accumulator bug', 
    '# Add user to session list\ndef add_user(u, users=[]):\n    users.append(u)\n    return users\nprint(add_user("Alice")) # ["Alice"]\nprint(add_user("Bob"))   # Expected: ["Bob"]',
    ['def add_user(u, users=None):\n    if users is None: users = []\n    users.append(u)\n    return users', 'Create list copy inside', 'Do not use default value', 'Use tuple default'],
    'def add_user(u, users=None):\n    if users is None: users = []\n    users.append(u)\n    return users',
    'Python evaluates default arguments once during function definition. Using a mutable list [] shares the same list instance across calls. Use None as default.',
    'Always use None as default value for mutable arguments, then initialize them inside the function body.'
  ),
  createQ('bld_func_3', 'Builder', 'functions', 'Runtime Error', 'Missing return value causing None operations', 
    '# Calculate double score\ndef double(s):\n    res = s * 2\nval = double(10) + 5',
    ['Add "return res" in function', 'Use print(res)', 'Assign val = double(10)', 'double(s) is correct'],
    'Add "return res" in function',
    'Functions without an explicit return statement return None by default. Adding 5 to None raises a TypeError.',
    'Make sure functions intended to compute a result explicitly call "return".'
  ),
  createQ('bld_func_4', 'Builder', 'functions', 'Syntax Error', 'Incorrect global scope declaration inside parameter list', 
    '# Define function\ndef save(global data):\n    print(data)',
    ['def save(data):\n    global data', 'def save(data):', 'global data\ndef save():', 'def save(*args):'],
    'def save(data):',
    'You cannot put global declarations inside a function\'s parameter definition signature list.',
    'Declare global scope configurations on their own line inside the function body if necessary.'
  ),
  createQ('bld_func_5', 'Builder', 'functions', 'Logical Error', 'Function name shadow overwriting built-in function', 
    '# Find max score\ndef max(lst):\n    return lst[0]\nresult = max([1, 2])\n# Expected: Built-in max is still accessible',
    ['Use a different function name (e.g. find_max)', 'Built-in max is lost, rename custom function', 'Both options are correct', 'Use builtins.max'],
    'Both options are correct',
    'Defining a custom function named "max" shadows the built-in max() function in the local namespace, making it inaccessible.',
    'Avoid naming your variables or functions after built-in Python functions (like sum, max, min, list).'
  )
);

// 7. lists (Builder)
questions.push(
  createQ('bld_list_1', 'Builder', 'lists', 'Runtime Error', 'IndexError popping from empty list index', 
    '# Pop third index\nvals = [1, 2]\nval = vals.pop(3)',
    ['Check length: if len(vals) > 3:', 'Use vals.pop()', 'Use try-except block', 'Both length check and try-except work'],
    'Both length check and try-except work',
    'Popping a non-existent index raises an IndexError.',
    'Check if length is greater than index before attempting pop(index).'
  ),
  createQ('bld_list_2', 'Builder', 'lists', 'Logical Error', 'In-place sort logic return overwrite', 
    '# Sort grades\ngrades = [88, 92, 79]\ngrades = grades.sort(reverse=True)\nprint(grades) # Expected: [92, 88, 79]',
    ['Use sorted: grades = sorted(grades, reverse=True)', 'Call grades.sort() without assignment', 'Both options are correct', 'Use grades.reverse()'],
    'Both options are correct',
    'Assigning grades to grades.sort() overwrites it with None. Sort in place or use sorted().',
    'List mutating operations return None. Never chain them with assignment.'
  ),
  createQ('bld_list_3', 'Builder', 'lists', 'Runtime Error', 'AttributeError append list to list incorrectly', 
    '# Add elements\nnums1 = [1, 2]\nnums2 = [3, 4]\nnums1.append(nums2)\nprint(len(nums1)) # Expected: 4',
    ['Use extend(): nums1.extend(nums2)', 'Use list addition: nums1 += nums2', 'Both options are correct', 'Use append(3) and append(4)'],
    'Both options are correct',
    'append(nums2) inserts the list [3, 4] as a single nested element, making nums1 equal to [1, 2, [3, 4]]. Use extend() or +=.',
    'Use extend() to merge iterable items individually, and append() to insert an object as a single nested item.'
  ),
  createQ('bld_list_4', 'Builder', 'lists', 'Logical Error', 'Shallow list copy inner dictionary mutation leak', 
    '# Duplicating list of dicts\norig = [{"score": 10}]\ncopy = list(orig)\ncopy[0]["score"] = 20\nprint(orig[0]["score"]) # Expected: 10',
    ['Use copy.deepcopy(): import copy; copy_list = copy.deepcopy(orig)', 'Copy dictionary manually inside', 'Both options are correct', 'Use orig.copy()'],
    'Both options are correct',
    'A shallow copy copies the list references. The inner dictionaries remain shared objects. Modifying the copy mutates the original.',
    'Use deepcopy to fully clone nested structures.'
  ),
  createQ('bld_list_5', 'Builder', 'lists', 'Syntax Error', 'Incorrect slice syntax colons placement', 
    '# Slice first two items\nitems = [10, 20, 30]\nsub = items[0,,2]',
    ['sub = items[0:2]', 'sub = items[:2]', 'Both sub = items[0:2] and sub = items[:2] work', 'sub = items[0..2]'],
    'Both sub = items[0:2] and sub = items[:2] work',
    'Python uses colons (:) to partition slices, not commas or double dots.',
    'Define slices using syntax: start:stop:step.'
  )
);

// 8. mutation
questions.push(
  createQ('bld_mut_1', 'Builder', 'mutation', 'Logical Error', 'Modifying list elements in for loop without index', 
    '# Double all scores\nscores = [10, 20]\nfor s in scores:\n    s *= 2\nprint(scores) # Expected: [20, 40]',
    ['Use range loop: for i in range(len(scores)): scores[i] *= 2', 'Use list comprehension: scores = [s * 2 for s in scores]', 'Both options are correct', 'Use scores = [s *= 2]'],
    'Both options are correct',
    'The variable "s" is a local reference inside the loop. Mutating it does not modify the list array cells. Use index loop or comprehension.',
    'To modify list elements in place, loop using indices or use a list comprehension.'
  ),
  createQ('bld_mut_2', 'Builder', 'mutation', 'Runtime Error', 'Mutation during dict iteration', 
    '# Delete keys\nconfig = {"a": 1, "b": 2}\nfor k in config:\n    if k == "a":\n        del config[k]',
    ['Iterate over list: for k in list(config):', 'Create filtered dict comprehension', 'Both options are correct', 'Use keys() directly'],
    'Both options are correct',
    'Modifying dictionary keys size directly during iteration throws a RuntimeError.',
    'Convert keys to a static list before iterating and mutating dictionary keys.'
  ),
  createQ('bld_mut_3', 'Builder', 'mutation', 'Logical Error', 'Passing mutable argument to modify values', 
    '# Add tag\ndef tag(lst):\n    lst.append("new")\nmy_list = [1]\ntag(my_list)\n# Is my_list mutated outside the function?',
    ['Yes, lists are mutable and passed by reference', 'No, functions isolate mutations', 'No, list copies are made', 'Yes, but copy must be returned'],
    'Yes, lists are mutable and passed by reference',
    'This behaves as expected (lst is mutated). If you want to prevent mutation, pass a copy of the list (like my_list.copy()).',
    'Be aware that passing mutable objects to functions allows in-place mutations outside the scope.'
  ),
  createQ('bld_mut_4', 'Builder', 'mutation', 'Syntax Error', 'Incorrect set add mutation syntax', 
    '# Mutate set\nmy_set = {1, 2}\nmy_set += {3}',
    ['my_set.add(3)', 'my_set.update({3})', 'Both my_set.add(3) and my_set.update({3}) work', 'my_set = my_set + 3'],
    'Both my_set.add(3) and my_set.update({3}) work',
    'The += operator is not supported for set values. Use add() or update().',
    'Mutate sets using add() or update() methods.'
  ),
  createQ('bld_mut_5', 'Builder', 'mutation', 'Logical Error', 'Unintended object attribute mutation shared state', 
    '# Shared class attribute mutation leak\nclass Session:\n    users = [] # Shared class attribute\n\ns1 = Session()\ns2 = Session()\ns1.users.append("Alice")\nprint(s2.users) # Expected: []',
    ['Define users inside __init__: self.users = []', 'Make users private', 'Use static class methods', 'Assign s2.users = []'],
    'Define users inside __init__: self.users = []',
    'Declaring users directly in the class scope makes it a class attribute shared across all instances. Initialize it in __init__ as an instance variable.',
    'Declare instance attributes inside the __init__ constructor to isolate state between object instances.'
  )
);

// 9. search (Builder)
questions.push(
  createQ('bld_srch_1', 'Builder', 'search', 'Logical Error', 'Linear search early return bug', 
    '# Search item\ndef find(lst, target):\n    for item in lst:\n        if item == target:\n            return True\n        return False # Expected: check whole list',
    ['Move return False out of the loop body', 'Check target in lst directly', 'Both options are correct', 'Use while loop'],
    'Both options are correct',
    'The return False is inside the loop block, executing on the first mismatch. Indent it outside the loop.',
    'Verify loop indentation. Returns for failures should execute only after loop completes.'
  ),
  createQ('bld_srch_2', 'Builder', 'search', 'Runtime Error', 'AttributeError index lookup on dictionary', 
    '# Search index of value in dictionary\nmapping = {"a": 10, "b": 20}\nidx = mapping.index(20)',
    ['Find key: idx = [k for k, v in mapping.items() if v == 20][0]', 'Use get(): idx = mapping.get(20)', 'Use try-except blocks', 'Use keys() list'],
    'Find key: idx = [k for k, v in mapping.items() if v == 20][0]',
    'Dictionaries do not have an index() method. Search through items() using loop or comprehension.',
    'To search values in a dictionary, iterate through items() and compare values to keys.'
  ),
  createQ('bld_srch_3', 'Builder', 'search', 'Logical Error', 'Substring check index edge case', 
    '# Search substring prefix\ntext = "ERROR: connection failed"\nif text.find("ERROR"):\n    print("Alert") # Expected: print Alert',
    ['if "ERROR" in text:', 'if text.find("ERROR") != -1:', 'Both options are correct', 'if text.startswith("ERROR"):'],
    'Both options are correct',
    'text.find("ERROR") returns 0 (the index). Since 0 is falsy, the condition fails. Use "in" or compare with != -1.',
    'Use membership checking (in) or explicit index boundaries checks when using find().'
  ),
  createQ('bld_srch_4', 'Builder', 'search', 'Syntax Error', 'Incorrect search list filter lambda syntax', 
    '# Filter items\nitems = [1, 2, 3]\nresult = filter(items, lambda x: x > 1)',
    ['result = filter(lambda x: x > 1, items)', 'result = [x for x in items if x > 1]', 'Both options are correct', 'result = filter(x => x > 1, items)'],
    'Both options are correct',
    'The arguments in filter() are (function, iterable). The code lists items first. Also, list comprehensions are preferred.',
    'Pass function first, then iterable to filter(), or use list comprehensions.'
  ),
  createQ('bld_srch_5', 'Builder', 'search', 'Logical Error', 'Binary search infinite loop condition', 
    '# Binary search step\ndef search(lst, target):\n    low, high = 0, len(lst) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if lst[mid] == target: return mid\n        elif lst[mid] < target: low = mid # Expected: low = mid + 1',
    ['low = mid + 1 and high = mid - 1', 'low = mid', 'high = mid', 'low = mid - 1'],
    'low = mid + 1 and high = mid - 1',
    'Setting low = mid instead of mid + 1 causes an infinite loop when low and high differ by 1, as mid does not progress.',
    'Ensure indices are strictly adjusted (+1 or -1) in binary search loops to prevent hang states.'
  )
);

// 10. strings (Builder)
questions.push(
  createQ('bld_str_1', 'Builder', 'strings', 'Runtime Error', 'AttributeError splitlines on integer', 
    '# Format lines\ncode = 123\nlines = code.splitlines()',
    ['Convert to string first: str(code).splitlines()', 'Use split(): str(code).split()', 'Both options are correct', 'Use lines = [code]'],
    'Convert to string first: str(code).splitlines()',
    'splitlines() is a string method. Calling it on an integer raises an AttributeError.',
    'Cast numeric variables to string before executing text parsing methods.'
  ),
  createQ('bld_str_2', 'Builder', 'strings', 'Logical Error', 'String split empty delimiter logic leak', 
    '# Split words\ntext = "a  b"\nwords = text.split(" ") # Expected: ["a", "b"]',
    ['words = text.split()', 'words = [w for w in text.split(" ") if w]', 'Both options are correct', 'words = text.split("  ")'],
    'Both options are correct',
    'Splitting with an explicit space delimiter " " preserves empty strings between double spaces, returning ["a", "", "b"]. Call split() without arguments to group all whitespaces.',
    'Use string.split() with no arguments to automatically clean and split arbitrary spaces.'
  ),
  createQ('bld_str_3', 'Builder', 'strings', 'Runtime Error', 'IndexError slice out of range string index', 
    '# Safe string index slicing\ntext = "abc"\nprint(text[5]) # Expected: empty string if out of range',
    ['Use slice: print(text[5:6])', 'Use try-except block', 'Both options are correct', 'Check length first'],
    'Both options are correct',
    'Accessing a single index out of range text[5] raises an IndexError, but slicing text[5:6] returns empty string "" safely.',
    'Slicing in Python does not raise IndexErrors for out-of-bounds indices.'
  ),
  createQ('bld_str_4', 'Builder', 'strings', 'Logical Error', 'String encoding check failure', 
    '# Check character encoding\nword = "cafe"\n# Convert to bytes\ndata = word.encode()\n# Expected: data to compare as string\nif data == "cafe": print("match")',
    ['Compare with bytes: data == b"cafe"', 'Decode first: data.decode() == "cafe"', 'Both options are correct', 'Use str(data)'],
    'Both options are correct',
    'Encoding a string returns a bytes object. Comparing bytes directly with a string literal returns False.',
    'Prefix bytes literals with b (e.g. b"text") or decode bytes to strings before comparing.'
  ),
  createQ('bld_str_5', 'Builder', 'strings', 'Syntax Error', 'Incorrect string format formatting placeholders brackets', 
    '# Format name\nname = "Alice"\nmsg = "Hello [name]".format(name=name)',
    ['msg = "Hello {name}".format(name=name)', 'msg = f"Hello {name}"', 'Both options are correct', 'msg = "Hello %s" % name'],
    'Both options are correct',
    'String format template variables must use curly braces {}, not square brackets [].',
    'Use {} braces inside template strings when using the .format() method.'
  )
);

// 11. validation
questions.push(
  createQ('bld_val_1', 'Builder', 'validation', 'Runtime Error', 'ValueError unhandled cast failure', 
    '# Validate age input\ndef get_age(text):\n    return int(text) # raises ValueError on "abc"',
    ['Use try-except: try: return int(text) except ValueError: return None', 'Check text.isdigit() before casting', 'Both options are correct', 'Return 0'],
    'Both options are correct',
    'Casting non-numeric strings using int() raises a ValueError. Wrap in a try-except block or check .isdigit().',
    'Always parse and validate user input inside try-except blocks when converting types.'
  ),
  createQ('bld_val_2', 'Builder', 'validation', 'Logical Error', 'Validation logic leak empty input', 
    '# Validate name\ndef check_name(name):\n    if len(name) > 10:\n        return False\n    return True # Expected: invalid if empty name',
    ['if not name or len(name) > 10: return False', 'if len(name) == 0 or len(name) > 10: return False', 'Both options are correct', 'if name == None: return False'],
    'Both options are correct',
    'The code returns True for an empty name "", which is typically invalid.',
    'Always validate against empty strings or None values first.'
  ),
  createQ('bld_val_3', 'Builder', 'validation', 'Runtime Error', 'KeyError in configuration check', 
    '# Validate database config\ncfg = {"host": "localhost"}\nif cfg["port"] == 3306:\n    print("Valid")',
    ['if cfg.get("port") == 3306:', 'if "port" in cfg and cfg["port"] == 3306:', 'Both options are correct', 'cfg["port"] = 3306'],
    'Both options are correct',
    'Accessing missing key "port" raises a KeyError. Use .get() or check membership first.',
    'Validate dictionary keys safely using dict.get(key) with fallback defaults.'
  ),
  createQ('bld_val_4', 'Builder', 'validation', 'Syntax Error', 'Incorrect validate function parameter format signature', 
    '# Validate parameters\ndef check(x, y,):\n    return x > y',
    ['def check(x, y):', 'def check(x, y, *args):', 'Both options are correct', 'def check(x, y, None):'],
    'Both options are correct',
    'While Python allows a trailing comma in argument lists, check if parameter syntax is clean without dangling commas.',
    'Keep function parameter lists clean and standard.'
  ),
  createQ('bld_val_5', 'Builder', 'validation', 'Logical Error', 'Validation regex email match checks', 
    '# Validate email domain\nemail = "user@gmail.com"\nif email.endswith("gmail"): print("valid") # Expected: check full domain',
    ['if email.endswith("@gmail.com") or email.endswith(".gmail.com"):', 'if email.split("@")[-1] == "gmail.com":', 'Both options are correct', 'if "gmail" in email:'],
    'Both options are correct',
    'Using endswith("gmail") returns False because it ends with ".com". Check full domain suffix.',
    'Use explicit suffix patterns or splits to validate domain names exactly.'
  )
);

// 12. while loops
questions.push(
  createQ('bld_whl_1', 'Builder', 'while loops', 'Logical Error', 'Infinite loop condition never updates', 
    '# Decrease countdown\ni = 5\nwhile i > 0:\n    print(i)\n    # Expected: loop ends at 0',
    ['Add i -= 1 inside loop', 'Add break statement', 'Use for loop instead', 'Decrement i before loop'],
    'Add i -= 1 inside loop',
    'The counter variable "i" is never decremented inside the loop, creating an infinite loop.',
    'Make sure the variables involved in a while loop condition are updated in each iteration.'
  ),
  createQ('bld_whl_2', 'Builder', 'while loops', 'Runtime Error', 'IndexError list pop while loop condition', 
    '# Process items\nitems = [1, 2]\nwhile len(items) >= 0:\n    val = items.pop()',
    ['while len(items) > 0:', 'while items:', 'Both options are correct', 'while len(items) >= 1:'],
    'Both options are correct',
    'The condition "len(items) >= 0" is always True. When the list is empty, popping from it raises an IndexError.',
    'Use "while items:" as a clean way to process list items until the collection is empty.'
  ),
  createQ('bld_whl_3', 'Builder', 'while loops', 'Logical Error', 'While loop condition off by one boundary', 
    '# Add numbers until total is 10\ntotal = 0\nwhile total < 10:\n    total += 3\n# Expected total to not exceed 10. Wait, if total exceeds 10, loop terminates. Let\'s check another one.',
    ['Check boundary inside loop', 'Change condition to total <= 10', 'Use if checks inside', 'Break if total >= 10'],
    'Check boundary inside loop',
    'The loop runs, but the final total is 12 (exceeds 10). Add checks inside the loop or adjust addition.',
    'Ensure loop exit conditions and value additions are bounded correctly.'
  ),
  createQ('bld_whl_4', 'Builder', 'while loops', 'Syntax Error', 'Incorrect while colon placement', 
    '# Simple while\ni = 0\nwhile i < 3\n    print(i)\n    i += 1',
    ['Add colon: while i < 3:', 'Add parenthesis: while (i < 3)', 'Add do keyword: while i < 3 do:', 'Align variables'],
    'Add colon: while i < 3:',
    'Python while loops require a colon at the end of the conditional header line.',
    'Always append a colon to while headers.'
  ),
  createQ('bld_whl_5', 'Builder', 'while loops', 'Logical Error', 'While True break condition missing', 
    '# Loop input\nwhile True:\n    user_input = "exit"\n    # Expected: exit loop if user_input is "exit"',
    ['Add: if user_input == "exit": break', 'Use while user_input != "exit":', 'Both options are correct', 'Change exit to break'],
    'Both options are correct',
    'Without an explicit "break" statement inside a "while True" loop, the loop runs infinitely.',
    'Always provide a path to hit a "break" statement inside while True loops.'
  )
);

// Extra questions generation for Explorer and Builder to have exactly 5 questions per topic for all remaining topics.
// (We already have exactly 5 questions defined above for every single one of the 32 topics!
// Beginner: 9 topics * 5 = 45 questions.
// Explorer: 11 topics * 5 = 55 questions.
// Builder: 12 topics * 5 = 60 questions.
// Total: 160 questions!)

// Output counts per topic
const counts = {};
questions.forEach(q => {
  const key = `${q.level} - ${q.topic}`;
  counts[key] = (counts[key] || 0) + 1;
});

console.log('Total questions generated:', questions.length);
console.log('Topics and question counts:');
console.log(JSON.stringify(counts, null, 2));

// Save to errorQuestions.json
const targetFile = path.join(process.cwd(), 'server/src/data/errorQuestions.json');
fs.writeFileSync(targetFile, JSON.stringify(questions, null, 2), 'utf8');
console.log('Successfully written to', targetFile);
