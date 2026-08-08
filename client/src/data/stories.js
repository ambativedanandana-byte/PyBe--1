const STORIES = {
  'b-syn-1': {
    caseNumber: '001',
    title: 'The Bakery Order',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Emma owns a small bakery downtown. Every morning, she writes down the orders from her customers on a whiteboard. Today, she received a big order for a birthday party — 24 cupcakes, 12 croissants, and a three-layer chocolate cake.

She carefully wrote each item on the board with the quantities. Then she handed the board to her assistant chef, Marco, and said, "Please start preparing these right away." Marco picked up the board, read through the list, and then stopped. He stared at the board for a long moment, looking confused and frustrated.

"I can't start," Marco said. "Something is wrong with this list. It doesn't make sense the way it's written. I don't know what comes first or what goes where." Emma looked at the board again. Everything seemed fine to her — the items were there, the quantities were correct. But Marco insisted he could not proceed. The morning rush was approaching, and the order had to be ready by noon.`,
    mission: `Your mission is to investigate what went wrong with Emma's order list. Something is preventing Marco from starting his work, even though all the information appears to be there. Find the issue and fix it so the bakery can fulfill the order on time.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-2': {
    caseNumber: '002',
    title: 'The Library Shelf',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `The city library was preparing for its annual book fair. Sarah, the head librarian, had spent all week organizing books into categories — fiction on the left, non-fiction in the middle, and reference books on the right. She created a detailed map showing exactly where each section begins and ends.

On the morning of the fair, she handed the map to her volunteer team and asked them to set up the display tables accordingly. The volunteers gathered around the map, but something went wrong immediately. Half the team started placing fiction books in the non-fiction area, and the other half was arguing about where the reference section actually began.

"I followed your map exactly," said one volunteer. "But the instructions after the first line don't line up with what came before. It's like the second step doesn't know where the first step ended." Sarah was puzzled. She had been so careful. The fair started in two hours, and the library looked like a disaster zone.`,
    mission: `Your mission is to figure out why the volunteers are mixing up the sections. The map looks complete, but something about how the instructions are organized is causing confusion. Investigate and fix the issue before the book fair starts.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-3': {
    caseNumber: '003',
    title: 'The Phone Call',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `David was setting up a surprise birthday party for his wife, Lisa. He made a checklist of everything he needed: decorations, cake, gifts, and guest list. He called his best friend Tom to help coordinate.

"Hey Tom, I need you to handle the guest list," David said. "Call everyone and confirm they can come. Here is the list —" David started reading names. "Alice, Bob, Carol, Dave, Emily, Frank, Grace, Henry."

Tom wrote down every name carefully. But when he tried to call the first person on the list, his phone froze. He restarted it and tried again. Same problem. He grabbed a pen and paper to write the numbers manually, but the page just kept going — names without endings, numbers without finishes.

"This list never ends!" Tom complained. "Every time I think I'm done, there's another name but no way to reach the end. It's like someone forgot to close something." David was confused — the list was only eight people long.`,
    mission: `Your mission is to investigate why Tom's phone keeps freezing and why the list feels incomplete. Something about how the list is structured is preventing Tom from finishing his task. Find the hidden problem.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-4': {
    caseNumber: '004',
    title: 'The Travel Journal',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Maya was writing a travel journal about her trip to Italy. She wanted to record every restaurant she visited with a short review. She started typing on her laptop at a café in Rome.

"I visited the most wonderful place today," she wrote. She described the pasta, the wine, the music, the candlelight. Then she tried to add a quote from the waiter — he had said something funny about the Chef's special dish.

But the moment she typed the opening quotation mark and started writing the waiter's words, something strange happened. Her entire journal entry disappeared. The screen went blank after the first quote. Maya panicked. She had written three pages of her trip, and now only the beginning was visible.

She closed the document and reopened it. Her writing was still there, but every time she tried to add the waiter's quote, the text after it vanished. Her friend at the next table looked over and said, "It looks like you started a conversation but never told it who was speaking."`,
    mission: `Your mission is to discover why Maya's journal entry keeps disappearing when she adds a quote. The text is fine until she types a certain pair of characters. Find what's breaking her journal and fix it.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-5': {
    caseNumber: '005',
    title: 'The Science Lab',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `In a university chemistry lab, Professor Wang was demonstrating an experiment to her students. She had a list of steps written on the whiteboard that the students had to follow exactly.

"Step one: meisure 50 milliliters of the solution," she read aloud. "Step two: heat the mixture to 80 degrees. Step three: obsurbe the color change."

A student named Jake raised his hand. "Professor, I can't find the 'meisure' tool in my kit. Is it the graduated cylinder or the beaker?" Another student, Priya, spoke up. "I don't understand step three either. What does 'obsurbe' mean? Is that a type of measurement?"

The professor looked at her notes and then at the whiteboard. She had copied the steps from her textbook that morning, but something felt off. The students couldn't follow her instructions because the words she wrote didn't match anything they recognized. The experiment was delayed by thirty minutes while she rechecked every word.`,
    mission: `Your mission is to find out why the students can't follow the experiment instructions. The steps look right at first glance, but something is subtly wrong with the words. Investigate and correct the issue.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-6': {
    caseNumber: '006',
    title: 'The Grocery List',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Tom was preparing for a big family dinner. He made a grocery list on his phone: eggs, milk, bread, butter, chicken, rice, onions, garlic, tomatoes. He sent the list to his partner, Sarah, who was already at the store.

Sarah started picking up items one by one. Eggs — done. Milk — done. Bread — done. But when she got to the next item, she couldn't tell what it was supposed to be. The list just showed "butterchickenriceonionsgarlictomatoes" all smushed together into one long word.

She called Tom. "Your list is broken! After the first few items, everything is combined into one giant word. I can't tell where one item ends and the next begins."

Tom looked at his phone. "That's weird. On my screen, the items are on separate lines. But I think I forgot something between them. It's like I wrote the items but left out the separators." Sarah sighed. "Well, figure it out fast — the store closes in an hour!"`,
    mission: `Your mission is to investigate why Sarah's grocery list items are running together. The items are all there, but something is missing between them. Find the problem and fix the list.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-syn-7': {
    caseNumber: '007',
    title: 'The Concert Tickets',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Lina was buying concert tickets online for her favorite band. The ticket website asked her to fill in a form with her name, email, and the number of tickets she wanted. She carefully typed everything in: her full name, her email address, and "2" for two tickets.

She clicked the "Purchase" button, but nothing happened. She tried again. Still nothing. She refreshed the page and filled in the form once more. Same result. The purchase button just sat there, completely unresponsive.

Her friend Max, who was sitting next to her, looked at the screen. "Wait, look at the form fields. Your name field is open — there is no closing bracket around your information. And the email field looks the same. It's like the form started collecting your data but never finished wrapping it up."

Lina squinted at the screen. The form did look odd — like someone had started organizing the information but left the containers open. "How do I close this form so I can buy my tickets?" she asked.`,
    mission: `Your mission is to figure out why the ticket purchase form isn't working. The form fields appear to be open and unfinished. Find what is missing and fix it so Lina can buy her concert tickets.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-run-1': {
    caseNumber: '008',
    title: 'The School Ceremony',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `The school was holding its annual awards ceremony. Principal Adams had prepared a list of every student who would receive an award. The list was stored in a large folder on her desk, organized by grade level.

When the ceremony began, the principal walked to the podium and opened her folder. She called out the first name: "Grade 5 — Best Science Project — Alexandra Chen!" The audience clapped as Alexandra walked to the stage.

Then the principal looked at her list for the next award. She paused. Her face turned red. "Grade 5 — Best Math Award — " She stopped. The name was missing. Not just one name — several names throughout the list were gone. In their place, there was just a blank space with a small note that said "undefined."

The principal tried to skip ahead, but more names were missing. She eventually had to stop the ceremony halfway through and apologize to the parents. "Something is wrong with my list," she said quietly. "Names that should be here are simply... gone."`,
    mission: `Your mission is to investigate why some student names are missing from the ceremony list. The list was complete when the principal wrote it, but something is causing certain names to disappear. Find the cause and fix it.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-run-2': {
    caseNumber: '009',
    title: 'The Recipe Disaster',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Grandma Rose was teaching her granddaughter, Mia, how to make her famous apple pie. She had the recipe memorized and was guiding Mia step by step.

"First, we need to make the crust," Grandma Rose said. "Take two cups of flour and divide it by zero to get the base amount of butter." Mia looked confused. "Divide by zero? Grandma, that doesn't make sense. You can't split something into zero parts."

Grandma Rose chuckled. "Oh dear, you're right. I misspoke. Let me think..." She looked at her old recipe card and realized the instructions had been changed. Someone had altered the recipe, replacing key numbers with impossible values. "This isn't right at all," she said. "If we try to follow this, the whole pie will fall apart."

Mia picked up the card and examined it closely. "Grandma, it looks like someone changed the numbers. The recipe says to divide the flour by zero, but that's impossible. No one can do that calculation."`,
    mission: `Your mission is to find the impossible instruction in Grandma Rose's recipe. Something in the measurements is dividing by zero, which cannot be done. Identify the problem and correct it.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-run-3': {
    caseNumber: '010',
    title: 'The Train Schedule',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Marcus was planning a trip from New York to Boston by train. He opened the train schedule app and selected his departure station. Then the app asked him for his arrival station.

"I want to go to Boston," Marcus typed. But the app crashed immediately. A red error message appeared: "TypeError: cannot read property 'platform' of undefined." Marcus had no idea what that meant. He tried again — same result.

His friend Zoe looked at the screen. "Try typing the station name differently. Maybe the app doesn't understand what you entered." Marcus tried "BOSTON" in all caps. Crash. He tried "boston" in lowercase. Crash. He tried "Bos-ton" with a hyphen. Crash.

"I don't understand," Marcus said. "All I want is to go to Boston. Why can't the app just tell me what time the train leaves?" Zoe thought for a moment. "I think the problem is that you're giving it words, but it's trying to do math with them. It's like asking a calculator to multiply a word by a number."`,
    mission: `Your mission is to figure out why the train schedule app keeps crashing. The app expects a certain type of input, but it's receiving something incompatible. Find the mismatch and understand what's going wrong.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-run-4': {
    caseNumber: '011',
    title: 'The Voting Booth',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `The community center was hosting an election for the neighborhood council. Volunteers set up a digital voting system where residents could cast their votes by entering a number: 1 for Candidate A, 2 for Candidate B, or 3 for Candidate C.

The first voter, Mr. Johnson, walked in confidently. He studied the candidates' posters, made his decision, and approached the voting tablet. He typed in his choice: "4" — for none of the above. The tablet froze. A message appeared: "ValueError: invalid choice. Please try again."

Mr. Johnson tried "4" again. Same error. He tried "5." Same error. He tried typing the word "none." Even worse error. The volunteer, Amy, came over to help. "Sir, you can only enter 1, 2, or 3."

"But what if I don't want to vote for any of them?" Mr. Johnson asked. Amy looked at the system. "I'm sorry, sir. The system only accepts those three numbers. If you enter anything else, it crashes. We didn't plan for that scenario."`,
    mission: `Your mission is to understand why the voting system crashes when a voter enters an unexpected value. The system only handles three specific inputs and fails on everything else. Identify the limitation and the error it produces.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-log-1': {
    caseNumber: '012',
    title: 'The Pizza Party',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Chris was organizing a pizza party for 24 people. He called the pizza place and asked, "How many pizzas should I order if each person eats 3 slices?" The person on the phone did some quick math and said, "You need 72 slices total. Our large pizzas have 8 slices each, so you need 9 pizzas."

Chris wrote down "9" and hung up. But something felt wrong. He had hosted parties before, and 9 pizzas seemed like way too many for 24 people. He usually ordered about 6 pizzas and there were always leftovers.

He called his friend Dani, who is great at math. "Hey, 24 people, 3 slices each, 8 slices per pizza. The pizza place said 9 pizzas. Does that sound right?" Dani thought for a moment. "Wait, that doesn't sound right at all. 24 times 3 is 72, and 72 divided by 8 is... actually, that IS 9. But something still feels off about this whole situation."

Chris agreed. The math checked out, but the result was unreasonable. "Maybe the formula itself is wrong," Dani suggested. "What if the calculation is using the wrong operation somewhere?"`,
    mission: `Your mission is to investigate whether the pizza calculation is using the correct math. The numbers seem to add up, but the result doesn't match real-world experience. Look for a mistake in the formula itself.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-log-2': {
    caseNumber: '013',
    title: 'The Thermostat',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Nina just moved into a new apartment with a smart thermostat. She set the target temperature to 72 degrees Fahrenheit. The apartment was currently 68 degrees, so she expected the heater to turn on.

She waited an hour. The apartment was still cold. She checked the thermostat display — it showed the current temperature was 68 and the target was 72. But the heater was off. She pressed the "heat" button again. Nothing happened.

Her roommate Alex came home and saw Nina shivering. "Why is the heat off? It's freezing in here!" Nina showed him the thermostat. "I set it to 72, but the heater won't turn on. The display says 68, which is less than 72, so the heater should be running."

Alex examined the thermostat settings. "Ah, I see the problem. The thermostat is comparing the temperatures incorrectly. It's checking if the current temperature is GREATER than the target instead of checking if it's LESS. So it thinks 68 is already warm enough because the comparison is backwards."`,
    mission: `Your mission is to find why the heater won't turn on even though it's cold. The thermostat is comparing temperatures, but it might be using the wrong comparison. Investigate the logic and find the error.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-log-3': {
    caseNumber: '014',
    title: 'The Exam Score',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `Teacher Patel was calculating her students' final grades. She had a simple system: add up all the test scores and divide by the number of tests to get the average.

She entered the scores for her student, Ryan: 85, 92, 78, and 90. She expected the average to be 86.25. But when she checked the result, it showed 90. She frowned and re-entered the numbers. Still 90.

"Something is wrong," she said to her colleague, Mr. Kim. "I'm adding four test scores and dividing by four, but the result is too high." Mr. Kim looked at her screen. "What numbers are you using?"

Teacher Patel pointed to the results. "Look — I have 85, 92, 78, and 90. The average should be around 86. But the system is giving me 90." Mr. Kim studied the screen. "Wait, I think I see it. You're using the right numbers, but something is wrong with which variable you're pulling the scores from. It's like you intended to use Ryan's scores, but the system is accidentally pulling a different student's scores for part of the calculation."`,
    mission: `Your mission is to find why Ryan's average grade is coming out wrong. The math operation looks correct, but the wrong data is being used somewhere. Identify which variable has the incorrect value.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
  'b-log-4': {
    caseNumber: '015',
    title: 'The Traffic Light',
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    story: `The city installed a new smart traffic light at the busiest intersection downtown. The engineers programmed it with a simple rule: if it is daytime, turn on the green light; if it is nighttime, turn on the red light.

On the first day, the traffic light worked perfectly during the day — green light, traffic flowing smoothly. But when night fell, something unexpected happened. The light stayed green instead of switching to red.

Driver after driver passed through the intersection. Pedestrians were afraid to cross. The light was supposed to turn red at night to slow down traffic, but it remained green.

The city engineer, Patricia, was called to investigate. She checked the traffic light's programming. "The rule says: if daytime, green. If nighttime, red." She looked at the condition more carefully. "Wait, the condition is checking 'if day' but it should be checking 'if not night' or something similar. The logic is incomplete — it only handles the daytime case and ignores nighttime entirely."`,
    mission: `Your mission is to find out why the traffic light stays green at night. The traffic light has a rule for daytime, but it seems to be missing the logic for the nighttime case. Investigate the condition and find what's wrong.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  // ═══════════════════════════════════════════════
  // EXPLORER CASES
  // ═══════════════════════════════════════════════

  'e-syn-1': {
    caseNumber: '016',
    title: 'The Room Organizer',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `Lisa was helping her mom organize the house for a big family gathering. She made a checklist of rooms to clean: kitchen, living room, and bedroom. For each room, she listed the tasks — pick up items, wipe surfaces, and vacuum the floor.

She gave the checklist to her younger brother, Tom, and said, "Follow each step carefully." Tom started with the kitchen. He picked up the items, wiped the surfaces, and vacuumed. Then he moved to the living room — but something went wrong.

"I followed your list exactly," Tom said, looking confused. "But after I picked up the items in the living room, the next step says to vacuum before wiping. That doesn't make sense — I should wipe first, then vacuum." Lisa looked at the checklist and realized the steps under "living room" were shifted to the right, as if they belonged to a different section. The tasks were all there, but they were lined up under the wrong heading.`,
    mission: `Your mission is to figure out why the tasks under "living room" are not aligned correctly. The steps exist but they are shifted to the wrong position. Investigate and fix the alignment issue.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-syn-2': {
    caseNumber: '017',
    title: 'The Morning Greeting',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A school was building a automated greeting system. The programmer wrote a function that would say hello to each student when they entered the building. The function was supposed to take the student's name and print a personalized greeting.

On the first day of school, the system crashed immediately. The error message said the function definition was incomplete. The programmer had written the function name and the parameter, but forgot something small at the end of the first line.

"Everything else looks correct," the programmer said. "The function body is indented properly, the print statement is right, and the return value is correct. But the system won't accept the function at all."`,
    mission: `Your mission is to find what small piece is missing from the function definition line. The function body and logic are correct, but the first line is incomplete. Find and fix it.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-syn-3': {
    caseNumber: '018',
    title: 'The Fruit Basket',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `Maria was organizing her pantry. She wrote two lists — one for fruits and one for vegetables. She started typing them into her phone's notes app. The fruit list went smoothly: "apple, banana, cherry." But when she started the vegetable list, her phone glitched.

"Look at this," Maria said to her roommate. "My fruit list is missing its closing bracket, and now the vegetable list is attached to it. It looks like 'apple, banana, cherry' and 'carrot, pea, corn' are fused into one giant mess."

Her roommate examined the screen. "You forgot to close the first list before starting the second one. The phone thinks they're all part of the same group."`,
    mission: `Your mission is to find why the two lists are merged together. The items are correct but the lists are not properly separated. Find the missing closing bracket.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-syn-4': {
    caseNumber: '019',
    title: 'The Score Calculator',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A teacher was building a simple calculator to add two quiz scores together. She wrote: "x = 10" for the first score and "y = 20" for the second score. Then she tried to store the result by writing "x + y = 30."

The computer immediately rejected it. "You can't put the result on the left side of the equals sign," her colleague explained. "The equals sign stores information into a variable. You need a variable name on the left, not a calculation."

The teacher was confused. "But I'm just telling the computer that x plus y equals 30. Why can't it understand that?"`,
    mission: `Your mission is to understand why the computer won't accept the assignment. The calculation is correct, but the way the result is being stored is wrong. Find the issue and fix it.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-1': {
    caseNumber: '020',
    title: 'The Color Palette',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A designer was creating a color palette for a website. She stored three colors in a list: red, green, and blue. She then wrote a program to print each color by its position — first color, second color, third color, and fourth color.

The first three colors printed perfectly. But when the program tried to print the fourth color, it crashed with an error. "Index out of range," the error said.

"I only have three colors," the designer said. "But my program is trying to find a fourth one that doesn't exist. It's like looking for a drawer that isn't there."`,
    mission: `Your mission is to find why the program crashes when trying to access the fourth color. The list has three items, but the program tries to access four. Identify the problem.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-2': {
    caseNumber: '021',
    title: 'The Contact Card',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A receptionist was building a digital contact card system. She stored a person's information in a filing system: name is "Alice" and age is 25. The system could look up any piece of information by its label.

She tested it twice — looking up the name worked, and looking up the age worked. Then she tried to look up the city. The system crashed immediately. "Key not found," the error said.

"But I never stored a city," the receptionist realized. "The card only has name and age. I'm asking for something that was never filed."`,
    mission: `Your mission is to understand why the system crashes when looking up the city. The name and age lookups work, but the city lookup fails. Find the missing key.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-3': {
    caseNumber: '022',
    title: 'The Text Editor',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A writer was using a text processing tool to format her manuscript. The tool could convert text to uppercase and lowercase — both worked perfectly. Then she tried to reverse the text, and the tool crashed.

"Attribute not found," the error said. "The text object does not have a reverse method."

"That's strange," the writer said. "Upper case works, lower case works, but reverse doesn't? They're all text operations. Why would one work and not the other?"`,
    mission: `Your mission is to find why the reverse operation fails while other text operations succeed. The uppercase and lowercase methods work, but reverse does not exist. Investigate the difference.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-4': {
    caseNumber: '023',
    title: 'The Diary Reader',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A journalist was writing a program to read her notes from a text file. She wrote the filename "data.txt" and told the program to open it and read everything inside.

But when she ran the program, it crashed immediately. "File not found," the error said. "No such file or directory: data.txt."

The journalist checked her desk. "The file should be right here," she said. "I created it yesterday and saved it in the same folder. Why can't the program find it?"`,
    mission: `Your mission is to understand why the program can't find the file. The filename is correct, but the file might not be in the expected location. Investigate the file reading process.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-5': {
    caseNumber: '024',
    title: 'The Toolbox',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A carpenter was building a program that used special tools from a toolbox. She needed two tools: a math tool for calculations and a statistics tool for averaging numbers. Both tools worked perfectly when she imported them.

Then she tried to import a third tool — a "nonexistent" tool that she thought she had installed. The program crashed. "Module not found," the error said.

"I'm sure I installed it," the carpenter said. "The other two tools loaded fine. Why can't it find this one?"`,
    mission: `Your mission is to find why one tool can't be imported while the others load fine. The math and statistics tools work, but the third module doesn't exist. Investigate the import failure.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-run-6': {
    caseNumber: '025',
    title: 'The Clock App',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A developer was building a clock app. She needed to import tools from different packages — a time tool from the datetime package and a path tool from the os package. Both imports worked perfectly.

Then she tried to import a helper tool from a package called "fake_package." The program crashed. "Import error," the error said. "Cannot import name 'helper' from 'fake_package'."

"The datetime and os packages loaded fine," the developer said. "But this one package won't give me the helper tool. Maybe the package doesn't have it."`,
    mission: `Your mission is to understand why one import fails while others succeed. The datetime and os imports work, but the fake_package import fails. Find the cause.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-log-1': {
    caseNumber: '026',
    title: 'The Voting Counter',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A teacher set up a classroom voting system. She wrote a counter that would count from 0 to 9 — ten votes total. She expected the final count to be 10, showing that all ten students had voted.

But when the counting finished, the result showed 9 instead of 10. "That's one short," the teacher said. "I counted ten students, but the counter only reached nine."

Her colleague looked at the code. "The counter starts at 0 and updates on each loop. By the time the loop finishes, the counter holds the value from the last iteration — which is 9, not 10."`,
    mission: `Your mission is to find why the counter shows 9 instead of 10. The loop runs ten times, but the final count is off by one. Investigate how the counter is updated.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-log-2': {
    caseNumber: '027',
    title: 'The Endless Meeting',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `An office manager wrote a program to process tasks one by one. The program started with a counter at 1 and was supposed to run while the counter was greater than 0. Each iteration would print the current task number and then increase the counter by 1.

The program started printing: "Task 1, Task 2, Task 3..." and kept going. It never stopped. The manager had to force-close the program.

"I wanted it to process my tasks," she said. "But it just keeps going forever. The counter keeps getting bigger, so the condition 'counter > 0' is always true."`,
    mission: `Your mission is to find why the program never stops. The loop condition is always true because the counter keeps increasing. Find the logic error.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-log-3': {
    caseNumber: '028',
    title: 'The Inventory Check',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A warehouse manager wrote a program to check five items in inventory. The program would loop through items 0 to 4 and print "Processing item" for each one. After the loop, it would print the total items processed.

The program printed all five items correctly. But the total showed "4" instead of "5." "I processed five items," the manager said. "Why does it say four?"

His assistant explained, "The loop runs from 0 to 4 — that's five items. But the variable holding the last item number is 4, because that's the highest number the loop reached."`,
    mission: `Your mission is to find why the total shows 4 instead of 5. The loop processes all five items, but the final count is wrong. Investigate the loop boundary.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-log-4': {
    caseNumber: '029',
    title: 'The Club Entry',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A nightclub bouncer was setting up a digital entry system. The rule was simple: if a person is 18 or older AND has a ticket, they can enter. Otherwise, they are denied.

The bouncer tested it with a 20-year-old who had a ticket. The system crashed. "Invalid syntax," the error said.

"I wrote the rule exactly as I wanted it," the bouncer said. "If age is 18 or more AND has a ticket equals true, let them in. What's wrong with that?"`,
    mission: `Your mission is to find why the entry condition crashes. The logic seems correct but the syntax is wrong. Find the incorrect symbol in the condition.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'e-log-5': {
    caseNumber: '030',
    title: 'The Shopping Bill',
    difficulty: 'Explorer',
    estimatedTime: '4 minutes',
    story: `A store manager was calculating a customer's bill. The customer bought items worth 10 and 5, and there was a tax multiplier of 2. The manager expected the total to be 30 — first adding 10 and 5 to get 15, then multiplying by 2 to get 30.

But the program gave 20 instead. "That's wrong," the manager said. "10 plus 5 is 15, and 15 times 2 is 30. Why is it giving me 20?"

His colleague checked the formula. "The program is multiplying 5 times 2 first, getting 10, then adding 10 — so 10 plus 10 equals 20. It's doing the multiplication before the addition."`,
    mission: `Your mission is to find why the calculation gives 20 instead of 30. The numbers are correct but the order of operations is wrong. Investigate the calculation formula.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  // ═══════════════════════════════════════════════
  // BUILDER CASES
  // ═══════════════════════════════════════════════

  'bu-syn-1': {
    caseNumber: '031',
    title: 'The Data Filter',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A data analyst was building a program to filter numbers from a dataset. The program should accept a list of numbers, keep only the positive ones, double each of them, and return the result. She wrote the function and called it with a test list.

But the program crashed immediately. The first error said the function definition was incomplete — it was missing a colon at the end. She fixed that. Then it crashed again — an if statement was also missing a colon. She fixed that too. Then a third error appeared — a parenthesis was never closed.

"Three errors in one program," she sighed. "Each one stops the next line from running. I have to fix them one by one, starting from the top."`,
    mission: `Your mission is to find and fix all the syntax errors in this program. There are multiple issues — fix them from top to bottom until the program runs correctly.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix ALL the problems.',
      'Verify the solution.',
    ],
  },

  'bu-run-1': {
    caseNumber: '032',
    title: 'The Dictionary Explorer',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A student was building a program to explore a dictionary of animals and their sounds. The dictionary had two entries: "a" for "meow" and "b" for "woof." The program was supposed to look up animal "c," divide the result by zero, and then convert it to uppercase.

The program crashed on the first step. "Key not found," the error said. "The dictionary doesn't have key 'c'."

"If the first lookup hadn't failed," the student said, "the program would have tried to divide by zero next. And if that somehow worked, it would have tried to call uppercase on a number. Three different errors, but only the first one shows."`,
    mission: `Your mission is to understand the chain of potential errors. The program has multiple issues but only the first error is reported. Identify all the problems.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problems.',
      'Verify the solution.',
    ],
  },

  'bu-run-2': {
    caseNumber: '033',
    title: 'The Division Tool',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A scientist was building a safe division calculator. She wrote a function that takes two numbers and divides them. She tested it with three cases: 10 divided by 2 (works perfectly, gives 5), 10 divided by 0 (crashes with division by zero), and 10 divided by "a" (crashes with type error).

"The first case works fine," the scientist said. "But the second and third cases crash the whole program. I need the program to handle these bad inputs gracefully instead of crashing."`,
    mission: `Your mission is to understand why the program crashes on invalid inputs. The valid case works, but dividing by zero and dividing by a string both cause crashes. Investigate the error handling.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-run-3': {
    caseNumber: '034',
    title: 'The Number Converter',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A developer was building a program that asks the user to enter a number, converts it to an integer, divides 100 by that number, and prints the result. She tested it with the number 5 — the program worked perfectly, giving 20.

Then she tried entering the word "hello" instead of a number. The program crashed. "Invalid literal for int()," the error said. "Can't convert 'hello' to a number."

"The program works when I give it a real number," the developer said. "But when someone types letters instead of numbers, it crashes. I need to handle that situation."`,
    mission: `Your mission is to find why the program crashes when the user enters non-numeric input. The program works with numbers but fails with text. Investigate the input validation.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-1': {
    caseNumber: '035',
    title: 'The Book Search',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A librarian was building a search system to find books by their position on a shelf. She wrote a function that looks through a shelf of five books one by one, checking each book's title. If it matches, the function returns the position. If no match is found after checking all books, it returns -1.

She tested it by searching for the third book. The program found it at position 2 and stopped. "That's correct," she said. "But what happens if I search for a book that isn't on the shelf? Or what if there are duplicate titles? The function might not handle all cases properly."`,
    mission: `Your mission is to examine the search algorithm and find any logical flaws. The basic search works, but there might be edge cases it doesn't handle correctly. Investigate the algorithm.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-2': {
    caseNumber: '036',
    title: 'The Fruit Finder',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A grocery app had a search feature to find fruits in its database. The database contained three fruits: apple, banana, and cherry. When a user searched for "apple," the app found it immediately. When they searched for "banana," it found that too.

But when a user searched for "Apple" with a capital A, the app returned "not found." "That's the same word," the user complained. "Why doesn't it find it?"

The developer checked the code. "The search is checking for an exact match. 'Apple' and 'apple' are different strings to the computer. The comparison is case-sensitive."`,
    mission: `Your mission is to find why searching for "Apple" fails when "apple" exists in the database. The search works for lowercase but fails for uppercase. Investigate the comparison logic.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-3': {
    caseNumber: '037',
    title: 'The Age Gate',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A movie theater was building an age verification system. The rule was simple: if a person's age is greater than 0, they are allowed in. The system checked three people: a 25-year-old (allowed), a -5-year-old (allowed — wait, that's wrong!), and a 150-year-old (allowed — also wrong!).

"The system is letting everyone in," the theater manager said. "A negative age doesn't make sense, and nobody is 150 years old. The validator is too loose — it only checks if age is above zero, but it should also check for reasonable limits."`,
    mission: `Your mission is to find why the age validator accepts impossible values. The system only checks one condition but should check multiple bounds. Investigate the validation logic.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-4': {
    caseNumber: '038',
    title: 'The Number Sorter',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A teacher was building a program to sort student test scores from lowest to highest. She used a sorting method that compares adjacent pairs and swaps them if they're in the wrong order. She tested it with seven scores: 64, 34, 25, 12, 22, 11, 90.

The program ran and produced a sorted list. But the teacher wasn't sure the sorting was happening correctly. "It looks right," she said, "but I want to understand exactly how the sorting works. Does it compare every pair? Does it swap correctly? Are there any cases where it might fail?"`,
    mission: `Your mission is to examine the sorting algorithm and verify it works correctly. Trace through the logic to find any potential issues with how elements are compared and swapped.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-5': {
    caseNumber: '039',
    title: 'The Temperature Lab',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A weather station was building a temperature converter. They wrote two functions: one to convert Celsius to Fahrenheit and another to convert Fahrenheit to Celsius. They tested the first function with 100°C — it gave 212°F, which is correct.

Then they tested the second function with 32°F — it gave 89.6°C. "That's wrong," the meteorologist said. "32°F should be 0°C, not 89.6°C. The formula for the second function must be different from the first."`,
    mission: `Your mission is to find why the Fahrenheit-to-Celsius conversion gives the wrong result. The Celsius-to-Fahrenheit function works correctly, but the reverse function uses the wrong formula. Compare the two functions.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },

  'bu-log-6': {
    caseNumber: '040',
    title: 'The Score Analyzer',
    difficulty: 'Builder',
    estimatedTime: '5 minutes',
    story: `A sports analyst was building a program to find the highest score from a list of game scores. The function takes a list, assumes the first number is the maximum, then compares every other number. If a bigger number is found, it becomes the new maximum.

She tested it with five scores: 3, 7, 2, 8, 1. The program correctly found 8 as the maximum. But when she tested it with an empty list — no scores at all — the program crashed. "List index out of range," the error said.

"The function works fine with real data," the analyst said. "But what happens when there's no data at all? I need to handle that edge case."`,
    mission: `Your mission is to find why the function crashes on an empty list. The function works with normal data but fails when given no data. Investigate the edge case handling.`,
    rules: [
      'Read the story carefully.',
      'Observe every clue.',
      'Investigate the program.',
      'Fix the problem.',
      'Verify the solution.',
    ],
  },
};

export function getStory(investigationId) {
  return STORIES[investigationId] || null;
}

export default STORIES;
