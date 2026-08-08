const INVESTIGATIONS = {
  'b-syn-1': {
    code: [
      '# Bakery Order System',
      'def calculate_price(item, quantity):',
      '    price = quantity * 2.50',
      '    print(f"{item}: ${price}")',
      '    return price',
      '',
      'def print_total()',
      '    total = calculate_price("cupcakes", 24)',
      '    total = total + calculate_price("croissants", 12)',
      '    print(f"Total: ${total}")',
      '',
      'print_total()',
    ],
    output: null,
    error: `  File "bakery.py", line 7
    def print_total()
                   ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The program did not produce the expected result.',
      'Python stopped running before completing the task.',
      'There is an issue on line 7 of the program.',
    ],
  },
  'b-syn-2': {
    code: [
      '# Library Book Organizer',
      'sections = ["fiction", "non-fiction", "reference"]',
      '',
      'for section in sections',
      '    print(f"Setting up: {section}")',
      '    books = get_books(section)',
      '    for book in books:',
      '        place_on_shelf(book, section)',
      '',
      'print("All sections organized!")',
    ],
    output: null,
    error: `  File "library.py", line 4
    for section in sections
                         ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The volunteers could not follow the instructions.',
      'The program stopped before organizing any books.',
      'Python found something wrong on line 4.',
    ],
  },
  'b-syn-3': {
    code: [
      '# Phone Contact List',
      'contacts = ["Alice", "Bob", "Carol"',
      '            "Dave", "Emily", "Frank"',
      '            "Grace", "Henry"]',
      '',
      'print(f"Total contacts: {len(contacts)}")',
      '',
      'for name in contacts:',
      '    print(f"Calling {name}...")',
    ],
    output: null,
    error: `  File "phone.py", line 2
            "Dave", "Emily", "Frank"
            ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'Tom\'s phone kept freezing when processing the list.',
      'The list appears incomplete to the program.',
      'Python cannot parse the contact list correctly.',
    ],
  },
  'b-syn-4': {
    code: [
      '# Travel Journal Entry',
      'entry = "I visited the most wonderful place today"',
      'review = "The pasta was delicious"',
      '',
      'quote = "The waiter said, "The Chef\'s special is amazing""',
      '',
      'print(entry)',
      'print(review)',
      'print(quote)',
    ],
    output: null,
    error: `  File "journal.py", line 5
    quote = "The waiter said, "The Chef's special is amazing""
                                 ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'Maya\'s journal entry disappeared when she added a quote.',
      'The text vanished after a certain pair of characters.',
      'Python is confused about where the string ends.',
    ],
  },
  'b-syn-5': {
    code: [
      '# Science Lab Instructions',
      'def meisure_volume(amount):',
      '    print(f"Measuring {amount}ml of solution")',
      '    return amount',
      '',
      'def obsurbe_color(mixture):',
      '    print(f"Observing color change in {mixture}")',
      '    return "color_changed"',
      '',
      'solution = meisure_volume(50)',
      'result = obsurbe_color(solution)',
      'print(f"Experiment complete: {result}")',
    ],
    output: `Measuring 50ml of solution
Observing color change in 50
Experiment complete: color_changed`,
    error: null,
    evidenceClues: [
      'The students could not find the tools mentioned.',
      'The instructions use words that don\'t match standard terms.',
      'The program runs, but the function names are unusual.',
    ],
  },
  'b-syn-6': {
    code: [
      '# Grocery List Manager',
      'items = ["eggs"',
      '         "milk"',
      '         "bread"',
      '         "butter"',
      '         "chicken"',
      '         "rice"]',
      '',
      'print(f"Shopping list ({len(items)} items):")',
      'for item in items:',
      '    print(f"  - {item}")',
    ],
    output: null,
    error: `  File "grocery.py", line 2
         "milk"
         ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'Sarah\'s grocery list items ran together.',
      'The items appear as one giant word to the program.',
      'Python cannot read the list correctly.',
    ],
  },
  'b-syn-7': {
    code: [
      '# Concert Ticket Form',
      'name = input("Enter your name: ")',
      'email = input("Enter your email: ")',
      'tickets = int(input("Number of tickets: "))',
      '',
      'order = {',
      '    "name": name',
      '    "email": email',
      '    "tickets": tickets',
      '}',
      '',
      'print(f"Order confirmed: {order}")',
    ],
    output: null,
    error: `  File "tickets.py", line 7
    "email": email
              ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The purchase button was unresponsive.',
      'The form fields appear open and unfinished.',
      'Python cannot parse the order dictionary.',
    ],
  },
  'b-run-1': {
    code: [
      '# School Awards Ceremony',
      'awards = {',
      '    "Best Science": "Alexandra Chen",',
      '    "Best Math": undefined,',
      '    "Best Art": "Jordan Lee",',
      '    "Best Music": undefined,',
      '    "Best Sports": "Sam Rivera"',
      '}',
      '',
      'for category, student in awards.items():',
      '    print(f"{category}: {student}")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "ceremony.py", line 9
    print(f"{category}: {student}")
NameError: name 'undefined' is not defined`,
    evidenceClues: [
      'Some student names disappeared from the list.',
      'The ceremony had to stop halfway through.',
      'Python does not recognize one of the values.',
    ],
  },
  'b-run-2': {
    code: [
      '# Apple Pie Recipe',
      'flour_cups = 2',
      'butter_cups = flour_cups / 0',
      '',
      'print(f"Flour: {flour_cups} cups")',
      'print(f"Butter: {butter_cups} cups")',
      'print("Mix ingredients together")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "recipe.py", line 2
    butter_cups = flour_cups / 0
ZeroDivisionError: division by zero`,
    evidenceClues: [
      'The recipe instructions contain an impossible calculation.',
      'The program crashed when trying to compute an amount.',
      'Python cannot divide something into zero parts.',
    ],
  },
  'b-run-3': {
    code: [
      '# Train Schedule App',
      'def get_platform(station):',
      '    stations = {"NYC": 1, "BOS": 3, "CHI": 5}',
      '    return stations[station]',
      '',
      'departure = "NYC"',
      'arrival = input("Enter destination: ")',
      '',
      'print(f"Platform for {arrival}: {get_platform(arrival)}")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "train.py", line 8
    print(f"Platform for {arrival}: {get_platform(arrival)}")
  File "train.py", line 3
    return stations[station]
TypeError: cannot read property 'platform' of undefined`,
    evidenceClues: [
      'The app crashes when receiving certain input.',
      'The program expects a specific type of data.',
      'Python found a mismatch in the data types.',
    ],
  },
  'b-run-4': {
    code: [
      '# Voting System',
      'def cast_vote(choice):',
      '    if choice == 1:',
      '        return "Candidate A"',
      '    elif choice == 2:',
      '        return "Candidate B"',
      '    elif choice == 3:',
      '        return "Candidate C"',
      '',
      'voter_choice = int(input("Enter your vote (1-3): "))',
      'result = cast_vote(voter_choice)',
      'print(f"You voted for: {result}")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "voting.py", line 10
    result = cast_vote(voter_choice)
  File "voting.py", line 2
    if choice == 1:
ValueError: invalid choice. Please try again.`,
    evidenceClues: [
      'The voting system crashes on unexpected input.',
      'Only three specific values are accepted.',
      'Python raises an error for any other input.',
    ],
  },
  'b-log-1': {
    code: [
      '# Pizza Party Calculator',
      'people = 24',
      'slices_per_person = 3',
      'slices_per_pizza = 8',
      '',
      'total_slices = people * slices_per_person',
      'pizzas_needed = total_slices * slices_per_pizza',
      '',
      'print(f"People: {people}")',
      'print(f"Slices needed: {total_slices}")',
      'print(f"Pizzas to order: {pizzas_needed}")',
    ],
    output: `People: 24
Slices needed: 72
Pizzas to order: 576`,
    error: null,
    evidenceClues: [
      'The result doesn\'t match real-world experience.',
      'The calculation produces an unreasonable number.',
      'The formula uses the wrong mathematical operation.',
    ],
  },
  'b-log-2': {
    code: [
      '# Smart Thermostat',
      'current_temp = 68',
      'target_temp = 72',
      '',
      'if current_temp > target_temp:',
      '    print("Heater: ON")',
      'else:',
      '    print("Heater: OFF")',
      '',
      'print(f"Current: {current_temp}°F")',
      'print(f"Target: {target_temp}°F")',
    ],
    output: `Current: 68°F
Target: 72°F
Heater: OFF`,
    error: null,
    evidenceClues: [
      'The heater won\'t turn on even though it\'s cold.',
      'The thermostat is comparing temperatures incorrectly.',
      'The comparison operator is checking the wrong condition.',
    ],
  },
  'b-log-3': {
    code: [
      '# Student Grade Calculator',
      'ryan_scores = [85, 92, 78, 90]',
      'other_scores = [70, 75, 80, 85]',
      '',
      'def calculate_average(scores):',
      '    return sum(scores) / len(scores)',
      '',
      'ryan_avg = calculate_average(ryan_scores)',
      'other_avg = calculate_average(other_scores)',
      '',
      'print(f"Ryan\'s average: {ryan_avg}")',
      'print(f"Other average: {other_avg}")',
    ],
    output: `Ryan's average: 86.25
Other average: 77.5`,
    error: null,
    evidenceClues: [
      'The grade calculation shows the wrong result.',
      'The math looks correct but the output is different.',
      'The wrong data is being used in the calculation.',
    ],
  },
  'b-log-4': {
    code: [
      '# Traffic Light Controller',
      'is_daytime = True',
      'is_nighttime = False',
      '',
      'if is_daytime:',
      '    print("Light: GREEN")',
      '',
      'print("Traffic flowing normally")',
    ],
    output: `Light: GREEN
Traffic flowing normally`,
    error: null,
    evidenceClues: [
      'The traffic light stays green at night.',
      'The program only handles one condition.',
      'There is no rule for the nighttime case.',
    ],
  },
  'e-syn-1': {
    code: [
      '# Nested Loop Organizer',
      'rooms = ["kitchen", "living room", "bedroom"]',
      '',
      'for room in rooms:',
      '    items = get_items(room)',
      '        for item in items:',
      '            print(f"Checking {item} in {room}")',
      '    print(f"{room} organized")',
    ],
    output: null,
    error: `  File "organizer.py", line 6
        for item in items:
        ^
IndentationError: unexpected indent`,
    evidenceClues: [
      'The volunteers mixed up the sections.',
      'The instructions don\'t line up correctly.',
      'Python found an indentation problem.',
    ],
  },
  'e-syn-2': {
    code: [
      '# Function Definition Error',
      'def greet_user(name)',
      '    """Greet the user"""',
      '    print(f"Hello, {name}!")',
      '    return f"Welcome, {name}"',
      '',
      'message = greet_user("Alice")',
      'print(message)',
    ],
    output: null,
    error: `  File "greeting.py", line 1
    def greet_user(name)
                      ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The function definition is incomplete.',
      'Python expects a colon after the parameters.',
      'The function cannot be called properly.',
    ],
  },
  'e-syn-3': {
    code: [
      '# Collection Manager',
      'fruits = ["apple", "banana", "cherry"',
      'vegetables = ["carrot", "pea", "corn"]',
      '',
      'print(f"Fruits: {len(fruits)}")',
      'print(f"Vegetables: {len(vegetables)}")',
    ],
    output: null,
    error: `  File "collection.py", line 2
    vegetables = ["carrot", "pea", "corn"]
              ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The collection lists are not properly closed.',
      'Python cannot parse the data structures.',
      'There are missing brackets in the code.',
    ],
  },
  'e-syn-4': {
    code: [
      '# Variable Assignment Error',
      'x = 10',
      'y = 20',
      '',
      'x + y = 30',
      '',
      'print(f"Sum: {x + y}")',
    ],
    output: null,
    error: `  File "assign.py", line 5
    x + y = 30
    ^
SyntaxError: cannot assign to operator`,
    evidenceClues: [
      'The program cannot store the calculated value.',
      'The assignment target is invalid.',
      'Python does not allow this type of assignment.',
    ],
  },
  'e-run-1': {
    code: [
      '# List Index Accessor',
      'colors = ["red", "green", "blue"]',
      '',
      'print(f"First color: {colors[0]}")',
      'print(f"Second color: {colors[1]}")',
      'print(f"Third color: {colors[2]}")',
      'print(f"Fourth color: {colors[3]}")',
    ],
    output: `First color: red
Second color: green
Third color: blue`,
    error: `Traceback (most recent call last):
  File "colors.py", line 7
    print(f"Fourth color: {colors[3]}")
IndexError: list index out of range`,
    evidenceClues: [
      'The program works for some items but fails on others.',
      'The list has only 3 items but the code tries to access a 4th.',
      'Python cannot find an element at that position.',
    ],
  },
  'e-run-2': {
    code: [
      '# Dictionary Lookup',
      'person = {"name": "Alice", "age": 25}',
      '',
      'print(f"Name: {person[\'name\']}")',
      'print(f"Age: {person[\'age\']}")',
      'print(f"City: {person[\'city\']}")',
    ],
    output: `Name: Alice
Age: 25`,
    error: `Traceback (most recent call last):
  File "lookup.py", line 6
    print(f"City: {person['city']}")
KeyError: 'city'`,
    evidenceClues: [
      'The program works for some lookups but fails on others.',
      'The dictionary doesn\'t contain all expected keys.',
      'Python cannot find the requested key in the dictionary.',
    ],
  },
  'e-run-3': {
    code: [
      '# String Method Caller',
      'text = "Hello World"',
      '',
      'print(text.upper())',
      'print(text.lower())',
      'print(text.reverse())',
    ],
    output: `HELLO WORLD
hello world`,
    error: `Traceback (most recent call last):
  File "string.py", line 6
    print(text.reverse())
AttributeError: 'str' object has no attribute 'reverse'`,
    evidenceClues: [
      'Some string operations work but others fail.',
      'The program tries to call a method that doesn\'t exist.',
      'Python strings don\'t have a reverse() method.',
    ],
  },
  'e-run-4': {
    code: [
      '# File Reader',
      'filename = "data.txt"',
      '',
      'with open(filename, "r") as file:',
      '    content = file.read()',
      '    print(content)',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "reader.py", line 4
    with open(filename, "r") as file:
FileNotFoundError: [Errno 2] No such file or directory: 'data.txt'`,
    evidenceClues: [
      'The program crashes when trying to read a file.',
      'The file might not exist in the expected location.',
      'Python cannot find the file on the system.',
    ],
  },
  'e-run-5': {
    code: [
      '# Module Importer',
      'import math',
      'import statistics',
      'import nonexistent_module',
      '',
      'print(math.sqrt(16))',
      'print(statistics.mean([1, 2, 3, 4, 5]))',
    ],
    output: `4.0
3.0`,
    error: `Traceback (most recent call last):
  File "importer.py", line 4
    import nonexistent_module
ModuleNotFoundError: No module named 'nonexistent_module'`,
    evidenceClues: [
      'The program works for some imports but fails on others.',
      'One of the modules doesn\'t exist.',
      'Python cannot find the specified module.',
    ],
  },
  'e-run-6': {
    code: [
      '# Package Importer',
      'from datetime import datetime',
      'from os import path',
      'from fake_package import helper',
      '',
      'now = datetime.now()',
      'print(f"Current time: {now}")',
    ],
    output: `Current time: 2024-01-15 10:30:00.123456`,
    error: `Traceback (most recent call last):
  File "package.py", line 4
    from fake_package import helper
ImportError: cannot import name 'helper' from 'fake_package'`,
    evidenceClues: [
      'Some imports work but others fail.',
      'The package doesn\'t contain the expected module.',
      'Python cannot find the specified name in the package.',
    ],
  },
  'e-log-1': {
    code: [
      '# Loop Counter',
      'count = 0',
      'for i in range(10):',
      '    count = i',
      '',
      'print(f"Final count: {count}")',
      'print(f"Expected: 10")',
    ],
    output: `Final count: 9
Expected: 10`,
    error: null,
    evidenceClues: [
      'The loop runs 10 times but the result is 9.',
      'The counter is off by one.',
      'The loop boundary is incorrect.',
    ],
  },
  'e-log-2': {
    code: [
      '# Counter Program',
      'x = 1',
      '',
      'while x > 0:',
      '    print(f"x = {x}")',
      '    x = x + 1',
    ],
    output: `x = 1
x = 2
x = 3
... (continues forever)`,
    error: null,
    evidenceClues: [
      'The program never stops running.',
      'The loop condition is always true.',
      'There is no way to exit the loop.',
    ],
  },
  'e-log-3': {
    code: [
      '# Range Iterator',
      'for i in range(5):',
      '    print(f"Processing item {i}")',
      '',
      'print(f"Total items processed: {i}")',
    ],
    output: `Processing item 0
Processing item 1
Processing item 2
Processing item 3
Processing item 4
Total items processed: 4`,
    error: null,
    evidenceClues: [
      'The loop processes fewer items than expected.',
      'The boundary condition is wrong.',
      'The last item is not included.',
    ],
  },
  'e-log-4': {
    code: [
      '# Boolean Logic Checker',
      'age = 20',
      'has_ticket = True',
      '',
      'if age >= 18 and has_ticket = True:',
      '    print("Entry allowed")',
      'else:',
      '    print("Entry denied")',
    ],
    output: null,
    error: `  File "logic.py", line 5
    if age >= 18 and has_ticket = True:
                              ^
SyntaxError: invalid syntax`,
    evidenceClues: [
      'The condition check produces an error.',
      'The boolean comparison is written incorrectly.',
      'Python expects == for comparison, not =.',
    ],
  },
  'e-log-5': {
    code: [
      '# Calculation Order',
      'a = 10',
      'b = 5',
      'c = 2',
      '',
      'result = a + b * c',
      'print(f"Result: {result}")',
      '',
      'expected = (a + b) * c',
      'print(f"Expected: {expected}")',
    ],
    output: `Result: 20
Expected: 30`,
    error: null,
    evidenceClues: [
      'The calculation gives a different result than expected.',
      'The order of operations affects the outcome.',
      'Multiplication is happening before addition.',
    ],
  },
  'bu-syn-1': {
    code: [
      '# Multi-Issue Program',
      'def process_data(data)',
      '    result = []',
      '    for item in data:',
      '        if item > 0',
      '            result.append(item * 2',
      '    return result',
      '',
      'numbers = [1, -2, 3, -4, 5]',
      'processed = process_data(numbers)',
      'print(processed)',
    ],
    output: null,
    error: `  File "multi.py", line 1
    def process_data(data)
                        ^
SyntaxError: expected ':'`,
    evidenceClues: [
      'The program has multiple issues at once.',
      'The first error stops all further execution.',
      'There are problems on several lines.',
    ],
  },
  'bu-run-1': {
    code: [
      '# Multiple Exception Program',
      'data = {"a": 1, "b": 2}',
      '',
      'result = data["c"]',
      'value = result / 0',
      'text = value.upper()',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "multi.py", line 4
    result = data["c"]
KeyError: 'c'`,
    evidenceClues: [
      'Multiple things could go wrong.',
      'The first error prevents other errors from showing.',
      'Each line has a different type of potential error.',
    ],
  },
  'bu-run-2': {
    code: [
      '# Exception Handling',
      'def safe_divide(a, b):',
      '    result = a / b',
      '    return result',
      '',
      'print(safe_divide(10, 2))',
      'print(safe_divide(10, 0))',
      'print(safe_divide(10, "a"))',
    ],
    output: `5.0`,
    error: `Traceback (most recent call last):
  File "exception.py", line 7
    print(safe_divide(10, 0))
ZeroDivisionError: division by zero`,
    evidenceClues: [
      'The program works for valid inputs.',
      'It crashes on invalid inputs.',
      'There is no error handling for edge cases.',
    ],
  },
  'bu-run-3': {
    code: [
      '# User Input Handler',
      'user_input = input("Enter a number: ")',
      'number = int(user_input)',
      'result = 100 / number',
      'print(f"Result: {result}")',
    ],
    output: null,
    error: `Traceback (most recent call last):
  File "input.py", line 2
    number = int(user_input)
ValueError: invalid literal for int()`,
    evidenceClues: [
      'The program crashes on certain user input.',
      'The input might not be a valid number.',
      'Python cannot convert the input to an integer.',
    ],
  },
  'bu-log-1': {
    code: [
      '# Search Algorithm',
      'def linear_search(arr, target):',
      '    for i in range(len(arr)):',
      '        if arr[i] == target:',
      '            return i',
      '    return -1',
      '',
      'numbers = [10, 20, 30, 40, 50]',
      'index = linear_search(numbers, 30)',
      'print(f"Found at index: {index}")',
    ],
    output: `Found at index: 2`,
    error: null,
    evidenceClues: [
      'The search algorithm might not work correctly.',
      'The implementation has a logical flaw.',
      'The algorithm doesn\'t handle all cases properly.',
    ],
  },
  'bu-log-2': {
    code: [
      '# Search Validator',
      'def validate_search(query, database):',
      '    if query in database:',
      '        return True',
      '    return False',
      '',
      'database = ["apple", "banana", "cherry"]',
      'print(validate_search("Apple", database))',
    ],
    output: `False`,
    error: null,
    evidenceClues: [
      'The search is case-sensitive.',
      'The validation doesn\'t match expected behavior.',
      'The comparison is not handling text correctly.',
    ],
  },
  'bu-log-3': {
    code: [
      '# Input Validator',
      'def validate_age(age):',
      '    if age > 0:',
      '        return True',
      '    return False',
      '',
      'print(validate_age(25))',
      'print(validate_age(-5))',
      'print(validate_age(150))',
    ],
    output: `True
True
True`,
    error: null,
    evidenceClues: [
      'The validator accepts unreasonable values.',
      'There are no upper or lower bounds.',
      'The validation logic is incomplete.',
    ],
  },
  'bu-log-4': {
    code: [
      '# Bubble Sort',
      'def bubble_sort(arr):',
      '    n = len(arr)',
      '    for i in range(n):',
      '        for j in range(0, n-i-1):',
      '            if arr[j] > arr[j+1]:',
      '                arr[j], arr[j+1] = arr[j+1], arr[j]',
      '    return arr',
      '',
      'numbers = [64, 34, 25, 12, 22, 11, 90]',
      'sorted_numbers = bubble_sort(numbers)',
      'print(sorted_numbers)',
    ],
    output: `[11, 12, 22, 25, 34, 64, 90]`,
    error: null,
    evidenceClues: [
      'The sorting algorithm might not work correctly.',
      'The implementation has a potential issue.',
      'The algorithm doesn\'t sort all elements properly.',
    ],
  },
  'bu-log-5': {
    code: [
      '# Temperature Converter',
      'def celsius_to_fahrenheit(celsius):',
      '    return celsius * 9 / 5 + 32',
      '',
      'def fahrenheit_to_celsius(fahrenheit):',
      '    return fahrenheit * 9 / 5 + 32',
      '',
      'print(f"100°C = {celsius_to_fahrenheit(100)}°F")',
      'print(f"32°F = {fahrenheit_to_celsius(32)}°C")',
    ],
    output: `100°C = 212.0°F
32°F = 89.6°C`,
    error: null,
    evidenceClues: [
      'The temperature conversion gives wrong results.',
      'One of the formulas is incorrect.',
      'The conversion logic has a mathematical error.',
    ],
  },
  'bu-log-6': {
    code: [
      '# Edge Case Handler',
      'def find_max(numbers):',
      '    max_val = numbers[0]',
      '    for num in numbers:',
      '        if num > max_val:',
      '            max_val = num',
      '    return max_val',
      '',
      'print(find_max([3, 7, 2, 8, 1]))',
      'print(find_max([]))',
    ],
    output: `8`,
    error: `Traceback (most recent call last):
  File "edge.py", line 10
    print(find_max([]))
  File "edge.py", line 2
    max_val = numbers[0]
IndexError: list index out of range`,
    evidenceClues: [
      'The function works for normal cases.',
      'It fails on empty or special inputs.',
      'The edge case is not handled properly.',
    ],
  },
};

export function getInvestigation(id) {
  return INVESTIGATIONS[id] || null;
}

export default INVESTIGATIONS;
