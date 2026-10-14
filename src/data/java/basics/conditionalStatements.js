export const conditionalStatements = {
  id: "conditional-statements",
  slug: "conditional-statement",
  title: "Conditional Statements in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn how conditional statements work in Java using if, if-else, else-if, nested if, and switch statements with practical examples.",
  estimatedTime: "30 min",

  sections: [

    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Conditional Statements",

      paragraphs: [
        "Conditional statements are used to make decisions in a Java program.",
        "They allow a program to execute different blocks of code depending on whether a condition is true or false.",
        "Conditional statements are commonly used with relational and logical operators."
      ],

      code: {
        language: "java",
        code: `int age = 20;

if (age >= 18) {
    System.out.println("You are eligible to vote.");
}`
      },

      output: "You are eligible to vote.",

      bullets: [
        "A condition is evaluated as true or false.",
        "If the condition is true, the corresponding code executes.",
        "If the condition is false, another block may execute.",
        "Conditional statements are important for decision-making."
      ]
    },

    // =====================================================
    // 2. TYPES
    // =====================================================
    {
      id: "types-of-conditional-statements",
      title: "Types of Conditional Statements",

      paragraphs: [
        "Java provides several ways to perform conditional logic."
      ],

      bullets: [
        "if statement",
        "if-else statement",
        "else-if ladder",
        "nested if statement",
        "switch statement",
        "ternary operator"
      ]
    },

    // =====================================================
    // 3. IF STATEMENT
    // =====================================================
    {
      id: "if-statement",
      title: "if Statement",

      paragraphs: [
        "The if statement executes a block of code only when the specified condition is true.",
        "If the condition is false, the code inside the if block is skipped."
      ],

      code: {
        language: "java",
        code: `int age = 20;

if (age >= 18) {
    System.out.println("Adult");
}`
      },

      output: "Adult"
    },

    // =====================================================
    // 4. IF SYNTAX
    // =====================================================
    {
      id: "if-syntax",
      title: "Syntax of if Statement",

      paragraphs: [
        "The basic syntax of an if statement is:"
      ],

      code: {
        language: "java",
        code: `if (condition) {
    // code executes when condition is true
}`
      }
    },

    // =====================================================
    // 5. IF WITH BOOLEAN
    // =====================================================
    {
      id: "if-with-boolean",
      title: "if Statement with Boolean Condition",

      paragraphs: [
        "An if statement can directly use a boolean expression."
      ],

      code: {
        language: "java",
        code: `boolean isLoggedIn = true;

if (isLoggedIn) {
    System.out.println("Welcome to the application.");
}`
      },

      output: "Welcome to the application."
    },

    // =====================================================
    // 6. IF-ELSE
    // =====================================================
    {
      id: "if-else",
      title: "if-else Statement",

      paragraphs: [
        "The if-else statement provides two possible paths.",
        "If the condition is true, the if block executes. Otherwise, the else block executes."
      ],

      code: {
        language: "java",
        code: `int age = 16;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`
      },

      output: "Minor"
    },

    // =====================================================
    // 7. IF-ELSE SYNTAX
    // =====================================================
    {
      id: "if-else-syntax",
      title: "Syntax of if-else",

      code: {
        language: "java",
        code: `if (condition) {
    // executes when condition is true
} else {
    // executes when condition is false
}`
      }
    },

    // =====================================================
    // 8. EVEN OR ODD
    // =====================================================
    {
      id: "even-odd",
      title: "Practical Example: Even or Odd",

      paragraphs: [
        "We can combine the if-else statement with the modulus operator to determine whether a number is even or odd."
      ],

      code: {
        language: "java",
        code: `int number = 15;

if (number % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}`
      },

      output: "Odd"
    },

    // =====================================================
    // 9. ELSE-IF
    // =====================================================
    {
      id: "else-if",
      title: "else-if Statement",

      paragraphs: [
        "The else-if ladder is used when we need to check multiple conditions.",
        "Java checks the conditions from top to bottom. The first condition that evaluates to true gets executed."
      ],

      code: {
        language: "java",
        code: `int marks = 75;

if (marks >= 90) {
    System.out.println("Grade A+");
} else if (marks >= 75) {
    System.out.println("Grade A");
} else if (marks >= 60) {
    System.out.println("Grade B");
} else {
    System.out.println("Grade C");
}`
      },

      output: "Grade A"
    },

    // =====================================================
    // 10. ELSE-IF SYNTAX
    // =====================================================
    {
      id: "else-if-syntax",
      title: "Syntax of else-if Ladder",

      code: {
        language: "java",
        code: `if (condition1) {
    // code
} else if (condition2) {
    // code
} else if (condition3) {
    // code
} else {
    // default code
}`
      }
    },

    // =====================================================
    // 11. MULTIPLE CONDITIONS
    // =====================================================
    {
      id: "multiple-conditions",
      title: "Using Multiple Conditions",

      paragraphs: [
        "Logical operators can be used when a decision depends on more than one condition."
      ],

      code: {
        language: "java",
        code: `int age = 25;
boolean hasId = true;

if (age >= 18 && hasId) {
    System.out.println("Entry allowed");
} else {
    System.out.println("Entry denied");
}`
      },

      output: "Entry allowed"
    },

    // =====================================================
    // 12. NESTED IF
    // =====================================================
    {
      id: "nested-if",
      title: "Nested if Statement",

      paragraphs: [
        "A nested if statement is an if statement placed inside another if statement.",
        "It is useful when a second condition should be checked only after the first condition is satisfied."
      ],

      code: {
        language: "java",
        code: `int age = 25;
boolean hasLicense = true;

if (age >= 18) {

    if (hasLicense) {
        System.out.println("You can drive.");
    }
}`
      },

      output: "You can drive."
    },

    // =====================================================
    // 13. NESTED IF-ELSE
    // =====================================================
    {
      id: "nested-if-else",
      title: "Nested if-else Example",

      code: {
        language: "java",
        code: `int age = 20;
boolean hasLicense = false;

if (age >= 18) {

    if (hasLicense) {
        System.out.println("You can drive.");
    } else {
        System.out.println("You need a driving license.");
    }

} else {
    System.out.println("You are not old enough to drive.");
}`
      },

      output: "You need a driving license."
    },

    // =====================================================
    // 14. SWITCH
    // =====================================================
    {
      id: "switch-statement",
      title: "switch Statement",

      paragraphs: [
        "The switch statement is used when we want to compare one expression against multiple possible values.",
        "It can make certain multi-way decision problems easier to read than a long else-if ladder."
      ],

      code: {
        language: "java",
        code: `int day = 2;

switch (day) {

    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    case 3:
        System.out.println("Wednesday");
        break;

    default:
        System.out.println("Invalid day");
}`
      },

      output: "Tuesday"
    },

    // =====================================================
    // 15. SWITCH SYNTAX
    // =====================================================
    {
      id: "switch-syntax",
      title: "Syntax of switch",

      code: {
        language: "java",
        code: `switch (expression) {

    case value1:
        // code
        break;

    case value2:
        // code
        break;

    default:
        // default code
}`
      },

      bullets: [
        "switch evaluates an expression.",
        "case defines possible matching values.",
        "break exits the switch.",
        "default executes when no case matches."
      ]
    },

    // =====================================================
    // 16. BREAK
    // =====================================================
    {
      id: "switch-break",
      title: "break in switch",

      paragraphs: [
        "The break statement is commonly used to stop execution of the switch after a matching case.",
        "Without break, execution can continue into the following cases in a traditional switch statement."
      ],

      code: {
        language: "java",
        code: `int number = 1;

switch (number) {

    case 1:
        System.out.println("One");
        break;

    case 2:
        System.out.println("Two");
        break;

    default:
        System.out.println("Other");
}`
      },

      output: "One"
    },

    // =====================================================
    // 17. DEFAULT
    // =====================================================
    {
      id: "switch-default",
      title: "default in switch",

      paragraphs: [
        "The default block executes when none of the case values match the switch expression."
      ],

      code: {
        language: "java",
        code: `int day = 8;

switch (day) {

    case 1:
        System.out.println("Monday");
        break;

    case 2:
        System.out.println("Tuesday");
        break;

    default:
        System.out.println("Invalid day");
}`
      },

      output: "Invalid day"
    },

    // =====================================================
    // 18. SWITCH WITH STRING
    // =====================================================
    {
      id: "switch-string",
      title: "switch with String",

      paragraphs: [
        "Java supports using String values in switch statements."
      ],

      code: {
        language: "java",
        code: `String role = "admin";

switch (role) {

    case "admin":
        System.out.println("Admin Dashboard");
        break;

    case "user":
        System.out.println("User Dashboard");
        break;

    default:
        System.out.println("Unknown Role");
}`
      },

      output: "Admin Dashboard"
    },

    // =====================================================
    // 19. SWITCH VS ELSE-IF
    // =====================================================
    {
      id: "switch-vs-else-if",
      title: "switch vs else-if",

      paragraphs: [
        "Both switch and else-if can be used for decision-making, but they are useful in different situations.",
        "switch is particularly convenient when comparing one expression against a set of discrete values.",
        "else-if is more flexible when conditions involve ranges or complex boolean expressions."
      ],

      bullets: [
        "Use switch when checking one value against several specific cases.",
        "Use else-if when conditions involve ranges or different expressions.",
        "Both are used for multi-way decision-making."
      ]
    },

    // =====================================================
    // 20. TERNARY
    // =====================================================
    {
      id: "ternary-operator",
      title: "Ternary Operator",

      paragraphs: [
        "The ternary operator is a compact way to choose between two values based on a condition.",
        "It is useful for simple conditional assignments."
      ],

      code: {
        language: "java",
        code: `int age = 20;

String result =
        age >= 18 ? "Adult" : "Minor";

System.out.println(result);`
      },

      output: "Adult"
    },

    // =====================================================
    // 21. PRACTICAL EXAMPLE - LOGIN
    // =====================================================
    {
      id: "login-example",
      title: "Practical Example: Login Validation",

      paragraphs: [
        "Conditional statements are commonly used in application logic. For example, we can check whether a user has entered valid login details."
      ],

      code: {
        language: "java",
        code: `String username = "admin";
String password = "1234";

if (username.equals("admin")
        && password.equals("1234")) {

    System.out.println("Login successful");

} else {

    System.out.println("Invalid credentials");
}`
      },

      output: "Login successful"
    },

    // =====================================================
    // 22. PRACTICAL EXAMPLE - AGE
    // =====================================================
    {
      id: "age-category-example",
      title: "Practical Example: Age Category",

      code: {
        language: "java",
        code: `int age = 25;

if (age < 13) {
    System.out.println("Child");
} else if (age < 20) {
    System.out.println("Teenager");
} else if (age < 60) {
    System.out.println("Adult");
} else {
    System.out.println("Senior Citizen");
}`
      },

      output: "Adult"
    },

    // =====================================================
    // 23. PRACTICAL EXAMPLE - MARKS
    // =====================================================
    {
      id: "marks-example",
      title: "Practical Example: Student Grade",

      code: {
        language: "java",
        code: `int marks = 82;

if (marks >= 90) {
    System.out.println("A+");
} else if (marks >= 80) {
    System.out.println("A");
} else if (marks >= 70) {
    System.out.println("B");
} else if (marks >= 60) {
    System.out.println("C");
} else if (marks >= 40) {
    System.out.println("D");
} else {
    System.out.println("Fail");
}`
      },

      output: "A"
    },

    // =====================================================
    // 24. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when writing conditions and switch statements."
      ],

      bullets: [
        "Using = instead of == for comparison.",
        "Forgetting braces when multiple statements belong to a condition.",
        "Using incorrect logical operators.",
        "Writing conditions in the wrong order in an else-if ladder.",
        "Forgetting break statements in traditional switch cases.",
        "Forgetting the default case when unexpected values need to be handled.",
        "Using == to compare String contents instead of equals().",
        "Creating unnecessarily complex nested if statements."
      ]
    },

    // =====================================================
    // 25. STRING COMPARISON
    // =====================================================
    {
      id: "string-comparison",
      title: "Comparing Strings in Conditions",

      paragraphs: [
        "When comparing the contents of String objects, use the equals() method rather than ==."
      ],

      code: {
        language: "java",
        code: `String username = "admin";

if (username.equals("admin")) {
    System.out.println("Valid user");
}`
      },

      output: "Valid user"
    },

    // =====================================================
    // 26. CONDITION ORDER
    // =====================================================
    {
      id: "condition-order",
      title: "Importance of Condition Order",

      paragraphs: [
        "In an else-if ladder, Java checks conditions from top to bottom and executes the first matching condition.",
        "Therefore, the order of conditions is important."
      ],

      code: {
        language: "java",
        code: `int marks = 85;

if (marks >= 40) {
    System.out.println("Pass");
} else if (marks >= 80) {
    System.out.println("Excellent");
}`
      },

      output: "Pass"
    },

    // =====================================================
    // 27. CORRECT CONDITION ORDER
    // =====================================================
    {
      id: "correct-condition-order",
      title: "Correct Condition Order",

      paragraphs: [
        "More specific or higher-range conditions should be checked before broader conditions."
      ],

      code: {
        language: "java",
        code: `int marks = 85;

if (marks >= 80) {
    System.out.println("Excellent");
} else if (marks >= 40) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}`
      },

      output: "Excellent"
    },

    // =====================================================
    // 28. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Conditional statements allow Java programs to make decisions.",
        "The if statement executes code when a condition is true.",
        "The if-else statement provides two possible execution paths.",
        "The else-if ladder is useful for checking multiple conditions.",
        "Nested if statements contain one conditional statement inside another.",
        "switch is useful for matching one expression against multiple values.",
        "break prevents execution from continuing into subsequent traditional switch cases.",
        "default handles cases where no switch case matches.",
        "The ternary operator is useful for simple two-way conditional expressions.",
        "Condition order matters in an else-if ladder.",
        "Use equals() to compare String contents."
      ]
    },

    // =====================================================
    // 29. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Conditional Statements: Interview Questions",

      interviewQuestions: [
        {
          question: "What are conditional statements in Java?",
          answer:
            "Conditional statements allow a program to make decisions and execute different blocks of code depending on whether conditions are true or false."
        },
        {
          question: "What is the difference between if and if-else?",
          answer:
            "An if statement executes code only when its condition is true. An if-else statement provides an alternative block when the condition is false."
        },
        {
          question: "What is an else-if ladder?",
          answer:
            "An else-if ladder is used to check multiple conditions sequentially. Java executes the block associated with the first condition that evaluates to true."
        },
        {
          question: "What is a nested if statement?",
          answer:
            "A nested if statement is an if statement placed inside another if or else block. It is useful when one decision depends on another decision."
        },
        {
          question: "When should we use switch instead of if-else?",
          answer:
            "switch is convenient when comparing one expression against multiple specific values. if-else is more flexible for ranges and complex boolean conditions."
        },
        {
          question: "What is the purpose of break in switch?",
          answer:
            "In a traditional switch statement, break exits the switch after a matching case so execution does not continue into subsequent cases."
        },
        {
          question: "What is the purpose of default in switch?",
          answer:
            "The default block executes when none of the case values match the switch expression."
        },
        {
          question: "Can String be used in switch?",
          answer:
            "Yes. Java supports String values in switch statements."
        },
        {
          question: "Why should equals() be used instead of == for String content comparison?",
          answer:
            "equals() compares the contents of String objects, while == compares whether two references refer to the same object."
        },
        {
          question: "What is the ternary operator?",
          answer:
            "The ternary operator is a compact conditional operator written as condition ? valueIfTrue : valueIfFalse. It is commonly used for simple conditional assignments."
        }
      ]
    }
  ]
};