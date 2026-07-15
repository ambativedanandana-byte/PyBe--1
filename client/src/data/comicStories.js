/**
 * comicStories.js
 * Unique 4-panel comic story data for every PyBe topic & level.
 * Each entry: { scene, char, panels:[{speech, narration, pose}x4] }
 */

export const COMIC_STORIES = {

  /* ═══════════ BEGINNER ═══════════ */

  // Arithmetic → Sweet Crumbs Bakery
  beg_arithmetic: {
    scene: 'bakery', char: 'chef',
    title: 'Sweet Crumbs Bakery – Billing Bug',
    imagePanels: [
      '/comics/arithmetic/panel1.png',
      '/comics/arithmetic/panel2.png',
      '/comics/arithmetic/panel3.png',
      '/comics/arithmetic/panel4.png',
    ],
    panels: [
      { speech: "We have many customers today! Let's calculate every bill correctly.", narration: "Maya runs the busy Sweet Crumbs Bakery. She switches on the computer to bill each customer automatically.", pose: 'happy' },
      { speech: "The computer will calculate the total automatically.", narration: "Ravi enters the details: Cake Price ₹250 and Quantity 4. The program should multiply them for the total.", pose: 'focused' },
      { speech: "That total doesn't look right!", narration: "The screen shows ₹254 instead of ₹1000. Something in the billing program is very wrong!", pose: 'shocked' },
      { speech: "A bug has entered the billing program. Can you solve it before customers leave?", narration: "PyBe Mentor arrives with a magnifying glass. The billing code has a bug — it's your job to find and fix it!", pose: 'call' },
    ]
  },

  // Comparisons → School Running Race
  beg_comparisons: {
    scene: 'classroom', char: 'student',
    title: 'The Wrong Winner — Race Day Bug',
    imagePanels: [
      '/comics/comparisons/panel1.png',
      '/comics/comparisons/panel2.png',
      '/comics/comparisons/panel3.png',
      '/comics/comparisons/panel4.png',
    ],
    panels: [
      { speech: "Ready for the 100m sprint? The computer will record who wins!", narration: "Sports Day at Greenfield School! The PE teacher sets up an automatic timing system to find the winner.", pose: 'happy' },
      { speech: "Arjun crossed the finish line first!", narration: "Arjun finishes in 12.3 seconds. Priya finishes in 13.1 seconds. A lower time means a faster runner!", pose: 'focused' },
      { speech: "But I finished first — why does the scoreboard say Priya won?!", narration: "The program used the wrong comparison! It picked the higher time instead of the lower time.", pose: 'shocked' },
      { speech: "The comparison operator is pointing the wrong way! Can you fix it before the trophy is given away?", narration: "PyBe Mentor arrives! The comparison sign is backwards — find the bug and give Arjun his trophy!", pose: 'call' },
    ]
  },

  // Conditionals → Traffic signal
  beg_conditionals: {
    scene: 'traffic', char: 'driver',
    title: 'The Inverted Traffic Light',
    imagePanels: [
      '/comics/conditionals/panel1.png',
      '/comics/conditionals/panel2.png',
      '/comics/conditionals/panel3.png',
      '/comics/conditionals/panel4.png',
    ],
    panels: [
      { speech: "Wait patiently, everyone! The automated traffic system will let us cross soon.", narration: "A group of children and parents wait at the busy school crossing. The automated traffic control system is active.", pose: 'happy' },
      { speech: "Wait! The walk sign says GO, but the cars are still speeding!", narration: "The light changes, but the system is showing conflicting signals to pedestrians and vehicles!", pose: 'focused' },
      { speech: "Stop! The lights are completely inverted! Cars are trying to go on RED!", narration: "Chaos at the intersection! The program is telling vehicles to GO on Red and STOP on Green!", pose: 'shocked' },
      { speech: "The conditions are swapped in the controller code! Can you fix it before an accident happens?", narration: "PyBe Mentor arrives to help! Examine the conditional statements in the program and debug the crossing controller.", pose: 'call' },
    ]
  },

  // Counting / Loops → Toy shop
  beg_counting: {
    scene: 'toyshop', char: 'shopkeeper',
    title: 'The Toy Shop Counting Bug',
    imagePanels: [
      '/comics/counting/panel1.png',
      '/comics/counting/panel2.png',
      '/comics/counting/panel3.png',
      '/comics/counting/panel4.png',
    ],
    panels: [
      { speech: "Welcome to the Toy Kingdom! Look around!", narration: "Three excited children enter the toy shop with a parent, eager to pick their favorite toys.", pose: 'happy' },
      { speech: "Let's count our teddy bears, toy cars, and dolls... 1, 2, 3...", narration: "The shop owner counts the toys before they can be sold, making sure the stock is perfect.", pose: 'focused' },
      { speech: "Wait! You forgot to count those robots on the bottom shelf!", narration: "But the owner accidentally skips some toys on the shelf, ending up with the wrong total count.", pose: 'shocked' },
      { speech: "Can you help us count all the toys correctly before we continue?", narration: "PyBe Mentor appears to guide us in debugging the counting program!", pose: 'call' },
    ]
  },

  // Indexing → Library
  beg_indexing: {
    scene: 'library', char: 'librarian',
    title: 'The Library Indexing Bug',
    imagePanels: [
      '/comics/indexing/panel1.png',
      '/comics/indexing/panel2.png',
      '/comics/indexing/panel3.png',
      '/comics/indexing/panel4.png',
    ],
    panels: [
      { speech: "Shelf 3 has our rarest books! Let's search the library catalog.", narration: "A modern children's library with bookshelves. A student searches for a specific book in the catalog system.", pose: 'happy' },
      { speech: "I'll fetch book #3 from the index.", narration: "The librarian enters the index to retrieve the book from the database shelf array.", pose: 'focused' },
      { speech: "IndexError?! We got the wrong book or the program crashed!", narration: "Confusion at the desk! The librarian accidentally fetches the wrong item because of 0-based indexing.", pose: 'shocked' },
      { speech: "Remember, list items start counting at 0! Can you locate the correct book index?", narration: "PyBe Mentor arrives to help! The index is off-by-one. Correct the search index to find the book.", pose: 'call' },
    ]
  },

  // Lists → Grocery shopping
  beg_lists: {
    scene: 'supermarket', char: 'shopper',
    title: 'The Forgotten Item Bug',
    imagePanels: [
      '/comics/lists/panel1.png',
      '/comics/lists/panel2.png',
      '/comics/lists/panel3.png',
      '/comics/lists/panel4.png',
    ],
    panels: [
      { speech: "Let's grab everything we need from our shopping list!", narration: "A family enters the supermarket with their green shopping basket, excited to buy groceries.", pose: 'happy' },
      { speech: "Milk, bread, and fresh fruit... let's tick them off our list!", narration: "They check their shopping list carefully and start collecting the required items in their basket.", pose: 'focused' },
      { speech: "Wait! We forgot the eggs! They are missing from our list!", narration: "But at the billing counter, they realize a crucial item from the shopping list is forgotten, and the children notice it.", pose: 'shocked' },
      { speech: "Can you help us complete the shopping list before we continue?", narration: "The PyBe mentor appears to help the family update the program and complete their list.", pose: 'call' },
    ]
  },

  // Strings → Birthday invitation cards
  beg_strings: {
    scene: 'party', char: 'birthday_girl',
    title: 'The Misspelled Invitation',
    imagePanels: [
      '/comics/strings/panel1.png',
      '/comics/strings/panel2.png',
      '/comics/strings/panel3.png',
      '/comics/strings/panel4.png',
    ],
    panels: [
      { speech: "Let's write all our friends' names on the invitations!", narration: "The birthday girl and her friends gather in a colorful party room to prepare invitation cards.", pose: 'happy' },
      { speech: "I'm writing each name so carefully... R-O-S-H-A-N... done!", narration: "Each friend carefully writes names on the invitation cards, one letter at a time.", pose: 'focused' },
      { speech: "Oh no! Rohan's name is spelled 'Rahan' — the vowel is wrong!", narration: "But one invitation has a misspelled name — the wrong character has been placed in the string!", pose: 'shocked' },
      { speech: "Can you help us correct the invitation before we continue?", narration: "PyBe Mentor arrives to help debug the name string and fix the invitation!", pose: 'call' },
    ]
  },

  // Subtraction → Fruit Market (NEW — fresh characters & setting)
  beg_subtraction: {
    scene: 'stall', char: 'shopkeeper',
    title: 'Fruit Market – Subtraction Mix-up',
    imagePanels: [
      '/comics/subtraction/panel1.png',
      '/comics/subtraction/panel2.png',
      '/comics/subtraction/panel3.png',
      '/comics/subtraction/panel4.png',
    ],
    panels: [
      {
        speech: "Come, come! Fresh apples, bananas, grapes — the best in the market today!",
        narration: "A lively open-air fruit market. A cheerful Indian father and his elegant wife arrive at the colourful stall with their two excited children, who run ahead pointing at the bright fruit displays.",
        pose: 'happy'
      },
      {
        speech: "I have 15 fresh apples ready! Let me weigh 6 for you on the scale.",
        narration: "The friendly fruit seller with a thick mustache and green apron carefully places 6 shiny red apples on his brass balance scale, handing them across the wooden counter to the smiling mother.",
        pose: 'focused'
      },
      {
        speech: "So... 15 minus 6 equals... 25 apples left! Here you go!",
        narration: "The seller writes '15 − 6 = 25' on his blackboard slate with chalk. The two children stare at the board wide-eyed and point — something is very wrong with that answer!",
        pose: 'shocked'
      },
      {
        speech: "Can you help us calculate the remaining fruits correctly before we continue?",
        narration: "The PyBe mentor — a smart teenager in a blue hoodie and round glasses — steps forward holding a glowing tablet. He smiles at you and invites you to solve the subtraction before the customers leave.",
        pose: 'call'
      },
    ]
  },


  // Variables → School Attendance Register (NEW — classroom, teacher, students, monitor)
  beg_variables: {
    scene: 'classroom', char: 'teacher',
    title: 'Class 5A – The Attendance Register Bug',
    imagePanels: [
      '/comics/variables/panel1.png',
      '/comics/variables/panel2.png',
      '/comics/variables/panel3.png',
      '/comics/variables/panel4.png',
    ],
    panels: [
      {
        speech: "Good morning, Class 5A! Come in and take your seats — attendance time!",
        narration: "A bright modern classroom. A warm young female teacher in a light purple salwar kameez welcomes four students filing through the door. The class monitor, badge pinned proudly, is already seated at the front desk.",
        pose: 'happy'
      },
      {
        speech: "Roll number 1 — Ananya. Roll number 2 — Rohan. I'll enter each name into the computer too.",
        narration: "The teacher writes every student's name and roll number carefully into the attendance register, then types the same data into the school's database on her laptop — creating a variable for each student.",
        pose: 'focused'
      },
      {
        speech: "Wait — Rohan's name is saved under Ananya's roll number! The records are all mixed up!",
        narration: "The teacher spots a critical mismatch on the laptop screen: two student records share the wrong roll numbers. The four students turn around with wide, surprised eyes, and the class monitor stands up in concern.",
        pose: 'shocked'
      },
      {
        speech: "Can you help us identify the correct student information before we continue?",
        narration: "The PyBe mentor — a smart teenager in a blue hoodie and round glasses — steps into the classroom doorway holding a glowing tablet. He faces you with an encouraging smile, inviting you to fix the variable assignment.",
        pose: 'call'
      },
    ]
  },

  /* ═══════════ EXPLORER ═══════════ */

  // Averages → Cricket scoreboard
  exp_averages: {
    scene: 'cricket', char: 'scorer',
    title: 'The Wrong Batting Average',
    panels: [
      { speech: "Virat scored 45, 78, 32 this season!", narration: "The stadium scoreboard operator calculates batting averages after each match.", pose: 'happy' },
      { speech: "Average = total ÷ matches played.", narration: "She runs the Python script to display the season average on the big screen.", pose: 'focused' },
      { speech: "155?! That's the total, not average!", narration: "The crowd gasps. The scoreboard shows the sum instead of the average!", pose: 'shocked' },
      { speech: "Fix it before the trophy ceremony!", narration: "Detective! The division step is missing. Correct the average formula!", pose: 'call' },
    ]
  },

  // Comparisons → Hotel prices (shares illustrated panels with beg_comparisons)
  exp_comparisons: {
    scene: 'hotel', char: 'receptionist',
    title: 'The Wrong Winner — Race Day Bug',
    imagePanels: [
      '/comics/comparisons/panel1.png',
      '/comics/comparisons/panel2.png',
      '/comics/comparisons/panel3.png',
      '/comics/comparisons/panel4.png',
    ],
    panels: [
      { speech: "Deluxe room should cost more!", narration: "Hotel manager Raj uses a price comparison system to show room deals.", pose: 'happy' },
      { speech: "I'll compare standard vs deluxe rates.", narration: "His Python script checks which room gives the best deal for the guest.", pose: 'focused' },
      { speech: "It says standard room is cheaper—wrong!", narration: "The system recommends the expensive room as the budget option!", pose: 'shocked' },
      { speech: "Guests are complaining! Debug this!", narration: "Detective! The comparison operator is flipped. Fix the hotel price logic!", pose: 'call' },
    ]
  },

  // Conditionals → Hospital appointments (shares illustrated panels with beg_conditionals)
  exp_conditionals: {
    scene: 'hospital', char: 'nurse',
    title: 'The Inverted Traffic Light',
    imagePanels: [
      '/comics/conditionals/panel1.png',
      '/comics/conditionals/panel2.png',
      '/comics/conditionals/panel3.png',
      '/comics/conditionals/panel4.png',
    ],
    panels: [
      { speech: "Wait patiently, everyone! The automated traffic system will let us cross soon.", narration: "A group of children and parents wait at the busy school crossing. The automated traffic control system is active.", pose: 'happy' },
      { speech: "Wait! The walk sign says GO, but the cars are still speeding!", narration: "The light changes, but the system is showing conflicting signals to pedestrians and vehicles!", pose: 'focused' },
      { speech: "Stop! The lights are completely inverted! Cars are trying to go on RED!", narration: "Chaos at the intersection! The program is telling vehicles to GO on Red and STOP on Green!", pose: 'shocked' },
      { speech: "The conditions are swapped in the controller code! Can you fix it before an accident happens?", narration: "PyBe Mentor arrives to help! Examine the conditional statements in the program and debug the crossing controller.", pose: 'call' },
    ]
  },

  // Dictionaries → Student database
  exp_dictionaries: {
    scene: 'school_office', char: 'admin',
    title: 'The Student Record Chaos',
    panels: [
      { speech: "Let me pull up Tom's records.", narration: "School admin Dave looks up a student's details in the Python database system.", pose: 'happy' },
      { speech: "student['name'] should work fine.", narration: "He queries the student dictionary using what he thinks is the right key.", pose: 'focused' },
      { speech: "KeyError! 'name' doesn't exist?!", narration: "The database crashes. The key 'name' isn't found in the dictionary!", pose: 'shocked' },
      { speech: "Parents are waiting—fix the lookup!", narration: "Detective! The key name is wrong. Find the correct key in the dictionary.", pose: 'call' },
    ]
  },

  // Filtering → Music playlist
  exp_filtering: {
    scene: 'studio', char: 'dj',
    title: 'The Playlist Filter Fail',
    panels: [
      { speech: "Show only pop songs!", narration: "DJ Maya uses her Python playlist manager at the radio station.", pose: 'happy' },
      { speech: "Filter where genre == 'pop'.", narration: "She runs the filter to separate pop from rock and jazz tracks.", pose: 'focused' },
      { speech: "It returned all 500 songs?!", narration: "The filter shows every song instead of just the pop genre!", pose: 'shocked' },
      { speech: "My show starts in 2 minutes—help!", narration: "Detective! The filter condition is broken. Fix it before the broadcast!", pose: 'call' },
    ]
  },

  // Lists → Warehouse inventory
  exp_lists: {
    scene: 'warehouse', char: 'worker',
    title: 'The Missing Shipment',
    panels: [
      { speech: "50 boxes arrived this morning!", narration: "Warehouse supervisor Finn logs incoming shipments in the Python system.", pose: 'happy' },
      { speech: "Add boxes to the inventory list.", narration: "He uses a list to track each box and then checks the total count.", pose: 'focused' },
      { speech: "Only 1 box in the system?!", narration: "The system shows 1 instead of 50. The list update went terribly wrong!", pose: 'shocked' },
      { speech: "The delivery boss is calling—help!", narration: "Detective! The list is being replaced instead of extended. Fix the code!", pose: 'call' },
    ]
  },

  // Counting / Loops → Toy shop (shares illustrated panels with beg_counting)
  exp_counting: {
    scene: 'toyshop', char: 'shopkeeper',
    title: 'The Toy Shop Counting Bug',
    imagePanels: [
      '/comics/counting/panel1.png',
      '/comics/counting/panel2.png',
      '/comics/counting/panel3.png',
      '/comics/counting/panel4.png',
    ],
    panels: [
      { speech: "Welcome to the Toy Kingdom! Look around!", narration: "Three excited children enter the toy shop with a parent, eager to pick their favorite toys.", pose: 'happy' },
      { speech: "Let's count our teddy bears, toy cars, and dolls... 1, 2, 3...", narration: "The shop owner counts the toys before they can be sold, making sure the stock is perfect.", pose: 'focused' },
      { speech: "Wait! You forgot to count those robots on the bottom shelf!", narration: "But the owner accidentally skips some toys on the shelf, ending up with the wrong total count.", pose: 'shocked' },
      { speech: "Can you help us count all the toys correctly before we continue?", narration: "PyBe Mentor appears to guide us in debugging the counting program!", pose: 'call' },
    ]
  },

  // Indexing → Library (shares illustrated panels with beg_indexing)
  exp_indexing: {
    scene: 'library', char: 'librarian',
    title: 'The Library Indexing Bug',
    imagePanels: [
      '/comics/indexing/panel1.png',
      '/comics/indexing/panel2.png',
      '/comics/indexing/panel3.png',
      '/comics/indexing/panel4.png',
    ],
    panels: [
      { speech: "Shelf 3 has our rarest books! Let's search the library catalog.", narration: "A modern children's library with bookshelves. A student searches for a specific book in the catalog system.", pose: 'happy' },
      { speech: "I'll fetch book #3 from the index.", narration: "The librarian enters the index to retrieve the book from the database shelf array.", pose: 'focused' },
      { speech: "IndexError?! We got the wrong book or the program crashed!", narration: "Confusion at the desk! The librarian accidentally fetches the wrong item because of 0-based indexing.", pose: 'shocked' },
      { speech: "Remember, list items start counting at 0! Can you locate the correct book index?", narration: "PyBe Mentor arrives to help! The index is off-by-one. Correct the search index to find the book.", pose: 'call' },
    ]
  },

  // Lists → Grocery shopping (shares illustrated panels with beg_lists)
  exp_lists: {
    scene: 'supermarket', char: 'shopper',
    title: 'The Forgotten Item Bug',
    imagePanels: [
      '/comics/lists/panel1.png',
      '/comics/lists/panel2.png',
      '/comics/lists/panel3.png',
      '/comics/lists/panel4.png',
    ],
    panels: [
      { speech: "Let's grab everything we need from our shopping list!", narration: "A family enters the supermarket with their green shopping basket, excited to buy groceries.", pose: 'happy' },
      { speech: "Milk, bread, and fresh fruit... let's tick them off our list!", narration: "They check their shopping list carefully and start collecting the required items in their basket.", pose: 'focused' },
      { speech: "Wait! We forgot the eggs! They are missing from our list!", narration: "But at the billing counter, they realize a crucial item from the shopping list is forgotten, and the children notice it.", pose: 'shocked' },
      { speech: "Can you help us complete the shopping list before we continue?", narration: "The PyBe mentor appears to help the family update the program and complete their list.", pose: 'call' },
    ]
  },

  // Loops → Factory conveyor
  exp_loops: {
    scene: 'factory', char: 'engineer',
    title: 'The Runaway Conveyor Belt',
    panels: [
      { speech: "Package 100 boxes, then stop.", narration: "Factory engineer Zara controls the conveyor belt using Python automation.", pose: 'happy' },
      { speech: "Loop 100 times, one box per pass.", narration: "She sets up a for-loop that stamps each box and moves to the next.", pose: 'focused' },
      { speech: "It won't stop! 500 boxes stamped!", narration: "The belt runs forever! Boxes pile up and spill off the end!", pose: 'shocked' },
      { speech: "Shut it down—fix the loop!", narration: "Detective! The loop condition never terminates. Fix the boundary!", pose: 'call' },
    ]
  },

  // Modulo → Bus seat numbering
  exp_modulo: {
    scene: 'bus_depot', char: 'driver',
    title: 'The Bus Seat Error',
    panels: [
      { speech: "Seats alternate: window or aisle.", narration: "Bus company uses Python to assign window/aisle seats automatically.", pose: 'happy' },
      { speech: "Use modulo to split odd/even seats.", narration: "Coder Leo uses the % operator to categorise seat numbers.", pose: 'focused' },
      { speech: "Every seat is 'window'?!", narration: "All 40 passengers get window seats. The aisle seats don't exist!", pose: 'shocked' },
      { speech: "Passengers can't board—fix modulo!", narration: "Detective! The modulo logic is wrong. Fix the even/odd seat check!", pose: 'call' },
    ]
  },

  // Search → Lost item counter
  exp_search: {
    scene: 'lost_found', char: 'officer',
    title: 'The Lost Property Puzzle',
    panels: [
      { speech: "Has anyone lost a blue umbrella?", narration: "Lost property officer Mei searches the database at the train station.", pose: 'happy' },
      { speech: "Search for 'blue umbrella' in list.", narration: "Her Python script scans the list of logged lost items.", pose: 'focused' },
      { speech: "Not found—but I can see it here!", narration: "The umbrella is clearly in the list, but the search returns nothing!", pose: 'shocked' },
      { speech: "The owner is waiting—fix the search!", narration: "Detective! Case sensitivity is tripping up the search. Fix it!", pose: 'call' },
    ]
  },

  // Sets → Club memberships
  exp_sets: {
    scene: 'gym', char: 'manager',
    title: 'The Duplicate Member Problem',
    panels: [
      { speech: "We have 200 unique members!", narration: "Gym manager Grace uses Python to manage membership records.", pose: 'happy' },
      { speech: "Store members in a set—no duplicates!", narration: "She adds all member IDs to a set to eliminate duplicates.", pose: 'focused' },
      { speech: "It shows 200—but 50 are duplicates!", narration: "The set didn't remove duplicates because the IDs are stored wrong!", pose: 'shocked' },
      { speech: "Fix the set before invoicing!", narration: "Detective! The set isn't deduplicating. Fix the data structure usage!", pose: 'call' },
    ]
  },

  // Strings → Birthday invitation cards (shares illustrated panels with beg_strings)
  exp_strings: {
    scene: 'party', char: 'birthday_girl',
    title: 'The Misspelled Invitation',
    imagePanels: [
      '/comics/strings/panel1.png',
      '/comics/strings/panel2.png',
      '/comics/strings/panel3.png',
      '/comics/strings/panel4.png',
    ],
    panels: [
      { speech: "Let's write all our friends' names on the invitations!", narration: "The birthday girl and her friends gather in a colorful party room to prepare invitation cards.", pose: 'happy' },
      { speech: "I'm writing each name so carefully... R-O-S-H-A-N... done!", narration: "Each friend carefully writes names on the invitation cards, one letter at a time.", pose: 'focused' },
      { speech: "Oh no! Rohan's name is spelled 'Rahan' — the vowel is wrong!", narration: "But one invitation has a misspelled name — the wrong character has been placed in the string!", pose: 'shocked' },
      { speech: "Can you help us correct the invitation before we continue?", narration: "PyBe Mentor arrives to help debug the name string and fix the invitation!", pose: 'call' },
    ]
  },

  /* ═══════════ BUILDER ═══════════ */

  // Strings → Birthday invitation cards (shares illustrated panels with beg_strings)
  bld_strings: {
    scene: 'party', char: 'birthday_girl',
    title: 'The Misspelled Invitation',
    imagePanels: [
      '/comics/strings/panel1.png',
      '/comics/strings/panel2.png',
      '/comics/strings/panel3.png',
      '/comics/strings/panel4.png',
    ],
    panels: [
      { speech: "Let's write all our friends' names on the invitations!", narration: "The birthday girl and her friends gather in a colorful party room to prepare invitation cards.", pose: 'happy' },
      { speech: "I'm writing each name so carefully... R-O-S-H-A-N... done!", narration: "Each friend carefully writes names on the invitation cards, one letter at a time.", pose: 'focused' },
      { speech: "Oh no! Rohan's name is spelled 'Rahan' — the vowel is wrong!", narration: "But one invitation has a misspelled name — the wrong character has been placed in the string!", pose: 'shocked' },
      { speech: "Can you help us correct the invitation before we continue?", narration: "PyBe Mentor arrives to help debug the name string and fix the invitation!", pose: 'call' },
    ]
  },

  // Functions → Food delivery
  bld_functions: {
    scene: 'restaurant', char: 'chef',
    title: 'The Delivery App Meltdown',
    panels: [
      { speech: "500 orders placed in 10 minutes!", narration: "FoodRush app processes dinner orders using Python functions.", pose: 'happy' },
      { speech: "calculate_total() handles each order.", narration: "The order function computes item price plus delivery fee.", pose: 'focused' },
      { speech: "Every total shows £0.00!", narration: "Customers are charged nothing! The function returns no value!", pose: 'shocked' },
      { speech: "We're losing money—fix the function!", narration: "Detective! The function is missing a return statement. Add it!", pose: 'call' },
    ]
  },

  // Dictionaries → Banking
  bld_dictionaries: {
    scene: 'bank', char: 'teller',
    title: 'The Account Access Error',
    panels: [
      { speech: "Customer needs to check balance.", narration: "Bank teller Sarah looks up an account in the Python banking system.", pose: 'happy' },
      { speech: "Fetch balance from account dict.", narration: "She calls the lookup function with the customer's account number.", pose: 'focused' },
      { speech: "KeyError—account not found?!", narration: "The customer's account exists but the system crashes trying to find it!", pose: 'shocked' },
      { speech: "Fix before the queue grows!", narration: "Detective! The dictionary key type is mismatched. Fix the lookup!", pose: 'call' },
    ]
  },

  // Validation → Login page
  bld_validation: {
    scene: 'security_room', char: 'developer',
    title: 'The Login Security Hole',
    panels: [
      { speech: "Our login must be secure!", narration: "Security dev Kiran is testing the new Python login validation system.", pose: 'happy' },
      { speech: "Password must be 8+ chars.", narration: "He sets up validation rules for username and password fields.", pose: 'focused' },
      { speech: "'ab' logged in successfully?!", narration: "A 2-character password bypasses the validation and logs in!", pose: 'shocked' },
      { speech: "Hackers could exploit this—fix it!", narration: "Detective! The length check is wrong. Strengthen the validation!", pose: 'call' },
    ]
  },

  // Formatting → Invoice generator
  bld_formatting: {
    scene: 'accountant', char: 'accountant',
    title: 'The Invoice Formatting Bug',
    panels: [
      { speech: "Send invoices to 50 clients today.", narration: "Accountant Nina generates client invoices with the Python billing system.", pose: 'happy' },
      { speech: "Format: £{amount:.2f} per invoice.", narration: "She uses f-strings to format currency values in the invoice template.", pose: 'focused' },
      { speech: "It printed £1234.5 not £1234.50!", narration: "The invoices look unprofessional—trailing zeros are missing!", pose: 'shocked' },
      { speech: "Clients won't pay these—fix it!", narration: "Detective! The format specifier is wrong. Fix the decimal places!", pose: 'call' },
    ]
  },

  // Mutation → Shopping cart
  bld_mutation: {
    scene: 'ecommerce', char: 'shopper',
    title: 'The Cart Corruption Bug',
    panels: [
      { speech: "Add shoes to my cart please!", narration: "Online shopper Dev adds items to his cart on the Python-powered store.", pose: 'happy' },
      { speech: "cart.append() should add items.", narration: "The developer uses list mutation to add products to the shopping cart.", pose: 'focused' },
      { speech: "My saved cart has shoes in it too!", narration: "The original saved cart is also modified—both carts now contain shoes!", pose: 'shocked' },
      { speech: "I only wanted one cart changed!", narration: "Detective! The list was mutated by reference. Fix with a proper copy!", pose: 'call' },
    ]
  },

  // Search → Hospital records
  bld_search: {
    scene: 'hospital', char: 'doctor',
    title: 'The Patient Record Crisis',
    panels: [
      { speech: "Find patient Adams urgently!", narration: "Dr. Patel searches for a patient in the hospital's Python records system.", pose: 'happy' },
      { speech: "Linear search through all records.", narration: "The system scans thousands of patient records one by one.", pose: 'focused' },
      { speech: "Adams not found—but he's admitted!", narration: "The patient exists but a case error stops the search finding him!", pose: 'shocked' },
      { speech: "He needs treatment now—fix search!", narration: "Detective! Fix the case-insensitive search in the patient database!", pose: 'call' },
    ]
  },

  // Counting / Loops → Toy shop (shares illustrated panels with beg_counting)
  bld_counting: {
    scene: 'toyshop', char: 'shopkeeper',
    title: 'The Toy Count Disaster',
    imagePanels: [
      '/comics/counting/panel1.png',
      '/comics/counting/panel2.png',
      '/comics/counting/panel3.png',
      '/comics/counting/panel4.png',
    ],
    panels: [
      { speech: "Let's count our stock of 50 teddy bears before we open the store!", narration: "A toy shop prepares for a busy day. The shopkeeper uses a counting program to verify the inventory.", pose: 'happy' },
      { speech: "A loop will count them all perfectly.", narration: "He runs the Python script to iterate through the boxes and total the teddy bears.", pose: 'focused' },
      { speech: "It counted to 5000—that's impossible!", narration: "The counter displays a massive number. The loop ran way too many times!", pose: 'shocked' },
      { speech: "My loop logic has a bug! Can you find it and fix it?", narration: "PyBe Mentor arrives! Inspect the loop controls and help count the inventory correctly.", pose: 'call' },
    ]
  },

  // Indexing → Library (shares illustrated panels with beg_indexing)
  bld_indexing: {
    scene: 'library', char: 'librarian',
    title: 'The Library Indexing Bug',
    imagePanels: [
      '/comics/indexing/panel1.png',
      '/comics/indexing/panel2.png',
      '/comics/indexing/panel3.png',
      '/comics/indexing/panel4.png',
    ],
    panels: [
      { speech: "Shelf 3 has our rarest books! Let's search the library catalog.", narration: "A modern children's library with bookshelves. A student searches for a specific book in the catalog system.", pose: 'happy' },
      { speech: "I'll fetch book #3 from the index.", narration: "The librarian enters the index to retrieve the book from the database shelf array.", pose: 'focused' },
      { speech: "IndexError?! We got the wrong book or the program crashed!", narration: "Confusion at the desk! The librarian accidentally fetches the wrong item because of 0-based indexing.", pose: 'shocked' },
      { speech: "Remember, list items start counting at 0! Can you locate the correct book index?", narration: "PyBe Mentor arrives to help! The index is off-by-one. Correct the search index to find the book.", pose: 'call' },
    ]
  },

  // Counting / Loops → Toy shop (shares illustrated panels with beg_counting)
  bld_counting: {
    scene: 'toyshop', char: 'shopkeeper',
    title: 'The Toy Shop Counting Bug',
    imagePanels: [
      '/comics/counting/panel1.png',
      '/comics/counting/panel2.png',
      '/comics/counting/panel3.png',
      '/comics/counting/panel4.png',
    ],
    panels: [
      { speech: "Welcome to the Toy Kingdom! Look around!", narration: "Three excited children enter the toy shop with a parent, eager to pick their favorite toys.", pose: 'happy' },
      { speech: "Let's count our teddy bears, toy cars, and dolls... 1, 2, 3...", narration: "The shop owner counts the toys before they can be sold, making sure the stock is perfect.", pose: 'focused' },
      { speech: "Wait! You forgot to count those robots on the bottom shelf!", narration: "But the owner accidentally skips some toys on the shelf, ending up with the wrong total count.", pose: 'shocked' },
      { speech: "Can you help us count all the toys correctly before we continue?", narration: "PyBe Mentor appears to guide us in debugging the counting program!", pose: 'call' },
    ]
  },

  // While Loops → ATM
  bld_while_loops: {
    scene: 'atm', char: 'customer',
    title: 'The ATM Infinite Loop',
    panels: [
      { speech: "Withdraw £50 from the ATM.", narration: "Bank customer Yemi uses the Python-powered ATM at the high street.", pose: 'happy' },
      { speech: "Loop until balance is sufficient.", narration: "The ATM runs a while-loop checking the balance before dispensing.", pose: 'focused' },
      { speech: "It's been printing receipts forever!", narration: "The ATM won't stop! A loop of receipts pours out onto the floor!", pose: 'shocked' },
      { speech: "Stop the machine—fix the loop!", narration: "Detective! The while condition never becomes False. Fix the termination!", pose: 'call' },
    ]
  },

  // Adaptive Logic → Smart traffic
  bld_adaptive: {
    scene: 'smart_city', char: 'engineer',
    title: 'The Smart City Failure',
    panels: [
      { speech: "AI traffic lights go live today!", narration: "City engineer Jo deploys the smart traffic management Python system.", pose: 'happy' },
      { speech: "Lights adapt to traffic density.", narration: "The system reads sensors and adjusts green light duration dynamically.", pose: 'focused' },
      { speech: "All roads stuck on red—gridlock!", narration: "Every intersection freezes red. The entire city is at a standstill!", pose: 'shocked' },
      { speech: "Rush hour disaster—debug now!", narration: "Detective! The adaptive logic has a flaw. Fix the conditional chain!", pose: 'call' },
    ]
  },

  // Comparisons → Online shopping (shares illustrated panels with beg_comparisons)
  bld_comparisons: {
    scene: 'online_shop', char: 'customer',
    title: 'The Wrong Winner — Race Day Bug',
    imagePanels: [
      '/comics/comparisons/panel1.png',
      '/comics/comparisons/panel2.png',
      '/comics/comparisons/panel3.png',
      '/comics/comparisons/panel4.png',
    ],
    panels: [
      { speech: "Apply 20% discount if over £100.", narration: "E-commerce platform applies automatic discounts at checkout.", pose: 'happy' },
      { speech: "if total > 100: apply_discount()", narration: "The Python checkout function checks the cart total before discounting.", pose: 'focused' },
      { speech: "£50 cart got a discount—£200 didn't!", narration: "Small carts get discounts while large carts pay full price!", pose: 'shocked' },
      { speech: "Customers are furious—fix checkout!", narration: "Detective! The comparison is the wrong way around. Flip the operator!", pose: 'call' },
    ]
  },

  // Conditionals → Smart city traffic (shares illustrated panels with beg_conditionals)
  bld_conditionals: {
    scene: 'smart_city', char: 'engineer',
    title: 'The Inverted Traffic Light',
    imagePanels: [
      '/comics/conditionals/panel1.png',
      '/comics/conditionals/panel2.png',
      '/comics/conditionals/panel3.png',
      '/comics/conditionals/panel4.png',
    ],
    panels: [
      { speech: "Wait patiently, everyone! The automated traffic system will let us cross soon.", narration: "A group of children and parents wait at the busy school crossing. The automated traffic control system is active.", pose: 'happy' },
      { speech: "Wait! The walk sign says GO, but the cars are still speeding!", narration: "The light changes, but the system is showing conflicting signals to pedestrians and vehicles!", pose: 'focused' },
      { speech: "Stop! The lights are completely inverted! Cars are trying to go on RED!", narration: "Chaos at the intersection! The program is telling vehicles to GO on Red and STOP on Green!", pose: 'shocked' },
      { speech: "The conditions are swapped in the controller code! Can you fix it before an accident happens?", narration: "PyBe Mentor arrives to help! Examine the conditional statements in the program and debug the crossing controller.", pose: 'call' },
    ]
  },

  // Lists → Airline passengers (shares illustrated panels with beg_lists)
  bld_lists: {
    scene: 'airport', char: 'staff',
    title: 'The Forgotten Item Bug',
    imagePanels: [
      '/comics/lists/panel1.png',
      '/comics/lists/panel2.png',
      '/comics/lists/panel3.png',
      '/comics/lists/panel4.png',
    ],
    panels: [
      { speech: "Let's grab everything we need from our shopping list!", narration: "A family enters the supermarket with their green shopping basket, excited to buy groceries.", pose: 'happy' },
      { speech: "Milk, bread, and fresh fruit... let's tick them off our list!", narration: "They check their shopping list carefully and start collecting the required items in their basket.", pose: 'focused' },
      { speech: "Wait! We forgot the eggs! They are missing from our list!", narration: "But at the billing counter, they realize a crucial item from the shopping list is forgotten, and the children notice it.", pose: 'shocked' },
      { speech: "Can you help us complete the shopping list before we continue?", narration: "The PyBe mentor appears to help the family update the program and complete their list.", pose: 'call' },
    ]
  },

};

/**
 * Get comic story for a question.
 * Maps topic + level to the right story entry.
 */
export function getComicStory(question) {
  const topic = (question.topic || '').toLowerCase();
  const level = (question.level || '').toLowerCase();

  // exact ID overrides first
  const idMap = {
    beg_arith_1: 'beg_arithmetic', beg_arith_2: 'beg_arithmetic', beg_arith_3: 'beg_arithmetic',
    beg_idx_1: 'beg_indexing', beg_cond_1: 'beg_conditionals',
  };
  if (idMap[question.id]) return COMIC_STORIES[idMap[question.id]];

  // level prefix
  const prefix = level.startsWith('beg') ? 'beg' : level.startsWith('exp') ? 'exp' : 'bld';

  const topicKeys = [
    ['subtract'], ['arith','modulo'], ['compar'], ['cond','conditional'],
    ['count','loop','while'], ['idx','index'], ['list'],
    ['str','string','format'], ['variable','var'], ['average','avg'],
    ['dict'], ['filter'], ['search'], ['set'], ['func','function'],
    ['valid'], ['mutat'], ['adaptive'],
  ];
  const storyKeys = [
    [`${prefix}_subtraction`], [`${prefix}_arithmetic`], [`${prefix}_comparisons`], [`${prefix}_conditionals`],
    [`${prefix}_counting`,`${prefix}_loops`,`${prefix}_while_loops`],
    [`${prefix}_indexing`], [`${prefix}_lists`],
    [`${prefix}_strings`], [`${prefix}_variables`], [`${prefix}_averages`],
    [`${prefix}_dictionaries`], [`${prefix}_filtering`], [`${prefix}_search`],
    [`${prefix}_sets`], [`${prefix}_functions`],
    [`${prefix}_validation`], [`${prefix}_mutation`], [`${prefix}_adaptive`],
  ];

  for (let i = 0; i < topicKeys.length; i++) {
    if (topicKeys[i].some(k => topic.includes(k))) {
      for (const key of storyKeys[i]) {
        if (COMIC_STORIES[key]) return COMIC_STORIES[key];
      }
    }
  }

  // fallback
  return {
    scene: 'office', char: 'developer',
    title: question.title || 'The Debug Mission',
    panels: [
      { speech: "Everything looks fine here!", narration: `A developer is testing the ${question.topic} system.`, pose: 'happy' },
      { speech: "Running the Python script now.", narration: "The code runs and processes data as expected.", pose: 'focused' },
      { speech: `A ${question.errorType} appeared!`, narration: "Suddenly the program throws an error and stops running!", pose: 'shocked' },
      { speech: "Help me fix this bug!", narration: "Detective! Inspect the code below and find the mistake.", pose: 'call' },
    ]
  };
}
