const prompt_data = {
  topics: [
    {
      topic: "Introduction to Python",
      ai_prompt:
        "Explain Python in a fun way for kids. Give an example of a simple Python program and explain what it does. Output format: html inside div, clear and simple with step-by-step explanation.",
      fun_fact:
        "Did you know? Python is named after a comedy group called Monty Python, not the snake! It’s because the creator of Python wanted the language to be fun and playful!",
      quiz: {
        questions: [
          {
            question: "What is Python?",
            options: [
              "A programming language.",
              "A type of snake.",
              "A video game.",
              "A robot.",
            ],
            correctAnswer: "A programming language.",
          },
          {
            question: "What symbol is used to write a comment in Python?",
            options: ["#", "//", "/* */", "--"],
            correctAnswer: "#",
          },
          {
            question: "Which animal does Python's name come from?",
            options: [
              "Monty Python (a comedy group).",
              "An anaconda.",
              "A cobra.",
              "A dragon.",
            ],
            correctAnswer: "Monty Python (a comedy group).",
          },
          {
            question: "How do you print text in Python?",
            options: [
              "print('Hello')",
              "echo 'Hello'",
              "say 'Hello'",
              "display('Hello')",
            ],
            correctAnswer: "print('Hello')",
          },
          {
            question: "Is Python a programming language or a type of snake?",
            options: ["Programming language", "Snake", "Both", "Neither"],
            correctAnswer: "Both",
          },
        ],
      },
    },
    {
      topic: "Variables and Data Types",
      ai_prompt:
        "Explain what variables are in Python like explaining to a kid with a toy box example. Show how to create a variable with an example. Output format: html inside div, simple, with an example code snippet and explanation.",
      fun_fact:
        "Fun fact: In Python, you don’t need to tell the computer the type of the toy (variable) you’re storing. Python figures it out for you! It’s like a toy box that knows what toys you’re putting in.",
      quiz: {
        questions: [
          {
            question: "What is a variable?",
            options: [
              "A box that stores information.",
              "A type of food.",
              "A computer part.",
              "An error in code.",
            ],
            correctAnswer: "A box that stores information.",
          },
          {
            question: "Which symbol is used to assign a value to a variable?",
            options: ["=", "==", "->", "<-"],
            correctAnswer: "=",
          },
          {
            question: "What are the three basic data types in Python?",
            options: [
              "Numbers, Text, and True/False.",
              "Images, Sounds, and Videos.",
              "Cars, Bikes, and Trains.",
              "Books, Pens, and Papers.",
            ],
            correctAnswer: "Numbers, Text, and True/False.",
          },
          {
            question: "Can you change the value of a variable?",
            options: ["Yes!", "No", "Sometimes", "Only in special cases"],
            correctAnswer: "Yes!",
          },
          {
            question: "What will this print? name = 'Alice'; print(name)",
            options: ["Alice", "name", "print(name)", "Error"],
            correctAnswer: "Alice",
          },
        ],
      },
    },
    {
      topic: "Loops in Python",
      ai_prompt:
        "Explain loops in Python, especially the 'for' loop and 'while' loop, in a way a kid would understand. Show an example of each loop with simple code and output. Output format: html inside div with clear explanations and sample code, followed by expected output.",
      fun_fact:
        "Fun fact: Python’s loops are like a magic repeat button! The 'for' loop helps you do something over and over, and the 'while' loop keeps repeating until you say stop.",
      quiz: {
        questions: [
          {
            question: "What is a loop in Python?",
            options: [
              "A way to repeat tasks.",
              "A type of snake.",
              "A math operation.",
              "A computer virus.",
            ],
            correctAnswer: "A way to repeat tasks.",
          },
          {
            question: "What does a 'for' loop do?",
            options: [
              "Repeats a task a set number of times.",
              "Asks a question.",
              "Pauses the program.",
              "Ends the program.",
            ],
            correctAnswer: "Repeats a task a set number of times.",
          },
          {
            question: "What is the correct syntax for a 'for' loop?",
            options: [
              "for x in range(5):",
              "for range(5):",
              "repeat x until 5",
              "loop(x, 5)",
            ],
            correctAnswer: "for x in range(5):",
          },
          {
            question:
              "What is the output of this code: for i in range(3): print(i)",
            options: ["0 1 2", "1 2 3", "3 2 1", "Error"],
            correctAnswer: "0 1 2",
          },
          {
            question: "What is a 'while' loop used for?",
            options: [
              "Repeats as long as a condition is true.",
              "Repeats a fixed number of times.",
              "Checks if a number is even.",
              "Stops the program.",
            ],
            correctAnswer: "Repeats as long as a condition is true.",
          },
        ],
      },
    },
    {
      topic: "Conditionals in Python",
      ai_prompt:
        "Explain 'if', 'else', and 'elif' statements using a real-world example. Show simple code with different conditions. Output format: html inside div, with examples and expected output after each block of code.",
      fun_fact:
        "Fun fact: Conditionals are like having a 'choose your own adventure' book! The program makes choices based on the conditions you set!",
      quiz: {
        questions: [
          {
            question: "What is the purpose of an 'if' statement?",
            options: [
              "To check if something is true.",
              "To repeat a task.",
              "To define a variable.",
              "To stop the program.",
            ],
            correctAnswer: "To check if something is true.",
          },
          {
            question:
              "Which statement is used for alternate actions in Python?",
            options: ["else", "if", "for", "while"],
            correctAnswer: "else",
          },
          {
            question: "What does 'elif' mean in Python?",
            options: ["Else if", "Else output", "Error", "End if"],
            correctAnswer: "Else if",
          },
          {
            question:
              "What will this code output? if 5 > 3: print('Yes') else: print('No')",
            options: ["Yes", "No", "Error", "Nothing"],
            correctAnswer: "Yes",
          },
          {
            question:
              "What happens if no conditions are true in an 'if' statement?",
            options: [
              "The 'else' part runs.",
              "The program stops.",
              "An error occurs.",
              "The loop repeats.",
            ],
            correctAnswer: "The 'else' part runs.",
          },
        ],
      },
    },
    {
      topic: "Functions in Python",
      ai_prompt:
        "Explain what functions are in Python using a fun analogy like a recipe. Show how to create and use a function. Output format: html inside div with a detailed explanation and code examples showing both function definition and calling.",
      fun_fact:
        "Did you know? Functions are like recipes! You can follow the same instructions (function) over and over to make the same dish (output). No need to start from scratch every time!",
      quiz: {
        questions: [
          {
            question: "What is a function in Python?",
            options: [
              "A set of instructions to perform a task.",
              "A type of variable.",
              "A loop that repeats.",
              "A data type.",
            ],
            correctAnswer: "A set of instructions to perform a task.",
          },
          {
            question: "How do you define a function in Python?",
            options: [
              "def function_name():",
              "function_name def():",
              "define function_name:",
              "func function_name():",
            ],
            correctAnswer: "def function_name():",
          },
          {
            question:
              "What is the output of this code? def greet(): print('Hello!'); greet()",
            options: ["Hello!", "greet", "Error", "Nothing"],
            correctAnswer: "Hello!",
          },
          {
            question: "What is a return statement used for in a function?",
            options: [
              "To send a value back to the caller.",
              "To end the program.",
              "To repeat the function.",
              "To print a message.",
            ],
            correctAnswer: "To send a value back to the caller.",
          },
          {
            question: "Can a function return more than one value?",
            options: ["Yes", "No", "Sometimes", "Only in certain cases"],
            correctAnswer: "Yes",
          },
        ],
      },
    },
  ],
};

export default prompt_data;
