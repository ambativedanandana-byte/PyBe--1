const INVESTIGATIONS = {
  'b-syn-1': {
    code: [
      'def greet():',
      '    print("Hello!")',
      'def add(a, b)',
      '    return a + b',
      '',
      'greet()',
      'result = add(2, 3)',
      'print(result)',
    ],
    output: null,
    error: `  File "app.py", line 3
    def add(a, b)
               ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The program stopped before finishing.',
      'Python found a problem on line 3.',
      'A small character is missing.',
    ],
  },
  'b-syn-2': {
    code: [
      'colors = ["red", "green", "blue"]',
      '',
      'for color in colors',
      '    print(color)',
    ],
    output: null,
    error: `  File "app.py", line 3
    for color in colors
                   ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The loop does not start running.',
      'Python expects something at the end of line 3.',
      'A colon is missing.',
    ],
  },
  'b-syn-3': {
    code: [
      'fruits = ["apple", "banana"',
      '          "cherry", "grape"]',
      '',
      'print(fruits)',
    ],
    output: null,
    error: `  File "app.py", line 2
          "cherry", "grape"]
          ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The list is not readable by Python.',
      'Items appear stuck together.',
      'A comma is missing between items.',
    ],
  },
  'b-syn-4': {
    code: [
      'name = "Alice"',
      'age = 25',
      '',
      'print(name)',
      'print(age)',
    ],
    output: `Alice
25`,
    error: null,
    evidenceClues: [
      'This code runs fine.',
      'The output matches expectations.',
      'No bug here — check the story for clues.',
    ],
  },
  'b-syn-5': {
    code: [
      'def measure(amount):',
      '    print(f"Measuring {amount}ml")',
      '    return amount',
      '',
      'x = measure(50)',
      'print(x)',
    ],
    output: `Measuring 50ml
50`,
    error: null,
    evidenceClues: [
      'The program runs but uses odd names.',
      'Function names look like misspellings.',
      'The code works but is hard to read.',
    ],
  },
  'b-syn-6': {
    code: [
      'items = ["eggs"',
      '         "milk"',
      '         "bread"]',
      '',
      'print(items)',
    ],
    output: null,
    error: `  File "app.py", line 2
         "milk"
         ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The list items are joined together.',
      'Python cannot read the list properly.',
      'Commas are missing between items.',
    ],
  },
  'b-syn-7': {
    code: [
      'order = {',
      '    "name": "Alice"',
      '    "item": "cake"',
      '}',
      '',
      'print(order)',
    ],
    output: null,
    error: `  File "app.py", line 3
    "item": "cake"
            ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The dictionary cannot be created.',
      'Entries look incomplete.',
      'A comma is missing between entries.',
    ],
  },
  'b-run-1': {
    code: [
      'names = {',
      '    "A": "Alice",',
      '    "B": undefined,',
      '    "C": "Carol"',
      '}',
      '',
      'for key in names:',
      '    print(names[key])',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 8
    print(names[key])
NameError: name 'undefined' is not defined`,
    evidenceClues: [
      'One value is not recognized.',
      'The program stops halfway.',
      'Python does not know what "undefined" means.',
    ],
  },
  'b-run-2': {
    code: [
      'total = 10',
      'share = total / 0',
      '',
      'print(share)',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 2
    share = total / 0
ZeroDivisionError: division by zero`,
    evidenceClues: [
      'The calculation is impossible.',
      'You cannot divide by zero.',
      'The program crashes on line 2.',
    ],
  },
  'b-run-3': {
    code: [
      'data = {"NYC": 1, "BOS": 3}',
      '',
      'city = "LAX"',
      'print(data[city])',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 4
    print(data[city])
KeyError: 'LAX'`,
    evidenceClues: [
      'The lookup fails for some keys.',
      'The key does not exist in the dictionary.',
      'Python cannot find the requested entry.',
    ],
  },
  'b-run-4': {
    code: [
      'vote = input("Pick 1, 2, or 3: ")',
      '',
      'if vote == 1:',
      '    print("A")',
      'elif vote == 2:',
      '    print("B")',
      'else:',
      '    print("C")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 3
    if vote == 1:
TypeError: comparison failed`,
    evidenceClues: [
      'Input is text but compared as a number.',
      'The data types do not match.',
      'Python cannot compare string to integer.',
    ],
  },
  'b-log-1': {
    code: [
      'people = 24',
      'slices_each = 3',
      'slices_per_pizza = 8',
      '',
      'total = people * slices_each',
      'pizzas = total * slices_per_pizza',
      '',
      'print(f"Pizzas needed: {pizzas}")',
    ],
    output: `Pizzas needed: 576`,
    error: null,
    evidenceClues: [
      '576 pizzas is way too many.',
      'The answer does not match real life.',
      'The formula uses the wrong operation.',
    ],
  },
  'b-log-2': {
    code: [
      'current = 68',
      'target = 72',
      '',
      'if current > target:',
      '    print("Heat ON")',
      'else:',
      '    print("Heat OFF")',
    ],
    output: `Heat OFF`,
    error: null,
    evidenceClues: [
      'The heater should be on but is off.',
      'The comparison checks the wrong thing.',
      '68 is less than 72, so heat stays off.',
    ],
  },
  'b-log-3': {
    code: [
      'scores_a = [85, 92, 78, 90]',
      'scores_b = [70, 75, 80, 85]',
      '',
      'avg_a = sum(scores_a) / len(scores_a)',
      'avg_b = sum(scores_a) / len(scores_b)',
      '',
      'print(f"A: {avg_a}")',
      'print(f"B: {avg_b}")',
    ],
    output: `A: 86.25
B: 86.25`,
    error: null,
    evidenceClues: [
      'Both averages are the same.',
      'One calculation uses the wrong data.',
      'scores_a is used twice by mistake.',
    ],
  },
  'b-log-4': {
    code: [
      'is_day = True',
      '',
      'if is_day:',
      '    print("GREEN")',
      '',
      'print("Go")',
    ],
    output: `GREEN
Go`,
    error: null,
    evidenceClues: [
      'Only daytime is handled.',
      'There is no check for nighttime.',
      'The light stays green always.',
    ],
  },
  'e-syn-1': {
    code: [
      'rooms = ["kitchen", "bedroom"]',
      '',
      'for room in rooms:',
      '    items = ["table", "chair"]',
      '        for item in items:',
      '            print(item)',
    ],
    output: null,
    error: `  File "app.py", line 5
        for item in items:
        ^
IndentationError: unexpected indent`,
    evidenceClues: [
      'The inner loop is not lined up.',
      'Indentation is wrong on line 5.',
      'Python expects consistent spacing.',
    ],
  },
  'e-syn-2': {
    code: [
      'def greet(name)',
      '    print(f"Hello {name}")',
      '',
      'greet("Alice")',
    ],
    output: null,
    error: `  File "app.py", line 1
    def greet(name)
                ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The function header is incomplete.',
      'A colon is missing after the parentheses.',
      'Python cannot define the function.',
    ],
  },
  'e-syn-3': {
    code: [
      'fruits = ["apple", "banana"',
      'vegs = ["carrot", "pea"]',
      '',
      'print(fruits)',
      'print(vegs)',
    ],
    output: null,
    error: `  File "app.py", line 2
    vegs = ["carrot", "pea"]
          ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The first list is not closed.',
      'A closing bracket is missing.',
      'Python thinks both lists are one.',
    ],
  },
  'e-syn-4': {
    code: [
      'x = 10',
      'y = 20',
      '',
      'x + y = 30',
      '',
      'print(x + y)',
    ],
    output: null,
    error: `  File "app.py", line 4
    x + y = 30
    ^
SyntaxError: cannot assign to operator`,
    evidenceClues: [
      'The result cannot be stored.',
      'You cannot put a calculation on the left side.',
      'A variable name is needed on the left.',
    ],
  },
  'e-run-1': {
    code: [
      'colors = ["red", "green", "blue"]',
      '',
      'print(colors[0])',
      'print(colors[1])',
      'print(colors[2])',
      'print(colors[3])',
    ],
    output: `red
green
blue`,
    error: `Traceback (most recent call last):
  File "app.py", line 6
    print(colors[3])
IndexError: list index out of range`,
    evidenceClues: [
      'The list has 3 items.',
      'The code tries to access a 4th item.',
      'There is no item at index 3.',
    ],
  },
  'e-run-2': {
    code: [
      'person = {"name": "Alice", "age": 25}',
      '',
      'print(person["name"])',
      'print(person["age"])',
      'print(person["city"])',
    ],
    output: `Alice
25`,
    error: `Traceback (most recent call last):
  File "app.py", line 5
    print(person["city"])
KeyError: 'city'`,
    evidenceClues: [
      'Two lookups work, one fails.',
      'The dictionary has no "city" key.',
      'Python cannot find the missing key.',
    ],
  },
  'e-run-3': {
    code: [
      'text = "hello"',
      '',
      'print(text.upper())',
      'print(text.lower())',
      'print(text.reverse())',
    ],
    output: `HELLO
hello`,
    error: `Traceback (most recent call last):
  File "app.py", line 5
    print(text.reverse())
AttributeError: 'str' has no attribute 'reverse'`,
    evidenceClues: [
      'upper() and lower() work fine.',
      'reverse() does not exist on strings.',
      'Python strings cannot be reversed this way.',
    ],
  },
  'e-run-4': {
    code: [
      'file = open("data.txt")',
      'content = file.read()',
      'print(content)',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 1
    file = open("data.txt")
FileNotFoundError: data.txt`,
    evidenceClues: [
      'The file does not exist.',
      'Python cannot find "data.txt".',
      'The file path may be wrong.',
    ],
  },
  'e-run-5': {
    code: [
      'import math',
      'import statistics',
      'import fake_module',
      '',
      'print(math.sqrt(16))',
    ],
    output: `4.0`,
    error: `Traceback (most recent call last):
  File "app.py", line 3
    import fake_module
ModuleNotFoundError: No module named 'fake_module'`,
    evidenceClues: [
      'math and statistics load fine.',
      'fake_module does not exist.',
      'Python cannot import it.',
    ],
  },
  'e-run-6': {
    code: [
      'from datetime import datetime',
      'from os import path',
      'from fake_pkg import helper',
      '',
      'print(datetime.now())',
    ],
    output: `2024-01-15 10:30:00`,
    error: `Traceback (most recent call last):
  File "app.py", line 3
    from fake_pkg import helper
ImportError: cannot import name 'helper'`,
    evidenceClues: [
      'Two imports work, one fails.',
      'The package does not have "helper".',
      'Python cannot find the name in the package.',
    ],
  },
  'e-log-1': {
    code: [
      'count = 0',
      'for i in range(10):',
      '    count = i',
      '',
      'print(f"Count: {count}")',
    ],
    output: `Count: 9`,
    error: null,
    evidenceClues: [
      'The count is 9, not 10.',
      'The loop runs 10 times but count is wrong.',
      'The last value of i is 9.',
    ],
  },
  'e-log-2': {
    code: [
      'x = 1',
      '',
      'while x > 0:',
      '    print(x)',
      '    x = x + 1',
    ],
    output: `1
2
3
... (forever)`,
    error: null,
    evidenceClues: [
      'The program never stops.',
      'x keeps getting bigger.',
      'The condition is always true.',
    ],
  },
  'e-log-3': {
    code: [
      'for i in range(5):',
      '    print(f"Item {i}")',
      '',
      'print(f"Last: {i}")',
    ],
    output: `Item 0
Item 1
Item 2
Item 3
Item 4
Last: 4`,
    error: null,
    evidenceClues: [
      'The last item shows as 4, not 5.',
      'range(5) goes from 0 to 4.',
      'The count is off by one.',
    ],
  },
  'e-log-4': {
    code: [
      'age = 20',
      'ticket = True',
      '',
      'if age >= 18 and ticket = True:',
      '    print("Enter")',
    ],
    output: null,
    error: `  File "app.py", line 4
    if age >= 18 and ticket = True:
                              ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The condition has a syntax error.',
      'Single = is for assignment, not comparison.',
      'Python expects == to compare values.',
    ],
  },
  'e-log-5': {
    code: [
      'price = 10',
      'qty = 5',
      'tax = 2',
      '',
      'total = price + qty * tax',
      'print(f"Total: {total}")',
    ],
    output: `Total: 20`,
    error: null,
    evidenceClues: [
      'The total is 20, not 30.',
      'Multiplication runs before addition.',
      'Parentheses are needed around the sum.',
    ],
  },
  'bu-syn-1': {
    code: [
      'def filter_pos(data)',
      '    result = []',
      '    for x in data:',
      '        if x > 0',
      '            result.append(x * 2)',
      '    return result',
      '',
      'print(filter_pos([1, -2, 3]))',
    ],
    output: null,
    error: `  File "app.py", line 1
    def filter_pos(data)
                      ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'Multiple issues in one program.',
      'The first error blocks everything else.',
      'Fix errors from top to bottom.',
    ],
  },
  'bu-run-1': {
    code: [
      'data = {"a": 1, "b": 2}',
      '',
      'val = data["c"]',
      'result = val / 0',
      'text = result.upper()',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 3
    val = data["c"]
KeyError: 'c'`,
    evidenceClues: [
      'Three things could go wrong.',
      'Only the first error is shown.',
      'Each line has a different potential error.',
    ],
  },
  'bu-run-2': {
    code: [
      'def divide(a, b):',
      '    return a / b',
      '',
      'print(divide(10, 2))',
      'print(divide(10, 0))',
    ],
    output: `5.0`,
    error: `Traceback (most recent call last):
  File "app.py", line 5
    print(divide(10, 0))
ZeroDivisionError: division by zero`,
    evidenceClues: [
      'divide(10, 2) works fine.',
      'divide(10, 0) crashes.',
      'No error handling for bad input.',
    ],
  },
  'bu-run-3': {
    code: [
      'user = input("Enter number: ")',
      'num = int(user)',
      'result = 100 / num',
      'print(result)',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "app.py", line 2
    num = int(user)
ValueError: invalid literal for int()`,
    evidenceClues: [
      'Works if you type a number.',
      'Crashes if you type letters.',
      'The input is not validated.',
    ],
  },
  'bu-log-1': {
    code: [
      'def search(arr, target):',
      '    for i in range(len(arr)):',
      '        if arr[i] == target:',
      '            return i',
      '    return -1',
      '',
      'print(search([10, 20, 30], 30))',
    ],
    output: `2`,
    error: null,
    evidenceClues: [
      'The search finds the item.',
      'The code looks correct on the surface.',
      'Check if it handles all edge cases.',
    ],
  },
  'bu-log-2': {
    code: [
      'db = ["apple", "banana", "cherry"]',
      '',
      'def find(item):',
      '    return item in db',
      '',
      'print(find("Apple"))',
    ],
    output: `False`,
    error: null,
    evidenceClues: [
      '"Apple" is in the list but returns False.',
      'Python compares with exact case.',
      '"Apple" is not the same as "apple".',
    ],
  },
  'bu-log-3': {
    code: [
      'def check_age(age):',
      '    if age > 0:',
      '        return True',
      '    return False',
      '',
      'print(check_age(25))',
      'print(check_age(-5))',
      'print(check_age(150))',
    ],
    output: `True
True
True`,
    error: null,
    evidenceClues: [
      'All ages return True.',
      '-5 and 150 should not be valid.',
      'The check only verifies age > 0.',
    ],
  },
  'bu-log-4': {
    code: [
      'def sort(arr):',
      '    n = len(arr)',
      '    for i in range(n):',
      '        for j in range(0, n-i-1):',
      '            if arr[j] > arr[j+1]:',
      '                arr[j], arr[j+1] = arr[j+1], arr[j]',
      '    return arr',
      '',
      'print(sort([64, 34, 25, 12]))',
    ],
    output: `[12, 25, 34, 64]`,
    error: null,
    evidenceClues: [
      'The sort works correctly.',
      'The output looks sorted.',
      'Verify each step of the algorithm.',
    ],
  },
  'bu-log-5': {
    code: [
      'def to_f(c):',
      '    return c * 9 / 5 + 32',
      '',
      'def to_c(f):',
      '    return f * 9 / 5 + 32',
      '',
      'print(to_f(100))',
      'print(to_c(32))',
    ],
    output: `212.0
89.6`,
    error: null,
    evidenceClues: [
      'to_f(100) gives 212, which is correct.',
      'to_c(32) gives 89.6, which is wrong.',
      'The formula for to_c is the same as to_f.',
    ],
  },
  'bu-log-6': {
    code: [
      'def find_max(nums):',
      '    m = nums[0]',
      '    for n in nums:',
      '        if n > m:',
      '            m = n',
      '    return m',
      '',
      'print(find_max([3, 7, 2, 8]))',
      'print(find_max([]))',
    ],
    output: `8`,
    error: `Traceback (most recent call last):
  File "app.py", line 9
    print(find_max([]))
  File "app.py", line 2
    m = nums[0]
IndexError: list index out of range`,
    evidenceClues: [
      'Works with normal data.',
      'Crashes on an empty list.',
      'nums[0] fails when the list is empty.',
    ],
  },
};

export function getInvestigation(id) {
  return INVESTIGATIONS[id] || null;
}

export default INVESTIGATIONS;
