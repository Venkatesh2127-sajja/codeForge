export const operators = {
  id: "operators",
  slug: "operators",
  title: "Operators in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn how operators work in Java and understand arithmetic, assignment, relational, logical, unary, ternary, bitwise, and shift operators with practical examples.",
  estimatedTime: "30 min",

  sections: [

    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Operators",

      paragraphs: [
        "Operators are special symbols used to perform operations on values and variables.",
        "For example, the + operator can be used to add two numbers, while the > operator can be used to compare two values.",
        "Operators are used extensively in Java programs for calculations, comparisons, assignments, and decision-making."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 5;

int sum = a + b;

System.out.println(sum);`
      },

      output: "15",

      bullets: [
        "Operators perform operations on operands.",
        "Operands can be variables, values, or expressions.",
        "Java provides several categories of operators."
      ]
    },

    // =====================================================
    // 2. OPERAND
    // =====================================================
    {
      id: "operator-and-operand",
      title: "Operator and Operand",

      paragraphs: [
        "An operand is the value or variable on which an operator performs an operation.",
        "In the expression a + b, + is the operator and a and b are the operands."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 20;

int result = a + b;`
      },

      output: "result = 30"
    },

    // =====================================================
    // 3. TYPES OF OPERATORS
    // =====================================================
    {
      id: "types-of-operators",
      title: "Types of Operators in Java",

      paragraphs: [
        "Java provides different types of operators for performing different operations."
      ],

      bullets: [
        "Arithmetic Operators",
        "Assignment Operators",
        "Relational Operators",
        "Logical Operators",
        "Unary Operators",
        "Ternary Operator",
        "Bitwise Operators",
        "Shift Operators"
      ]
    },

    // =====================================================
    // 4. ARITHMETIC OPERATORS
    // =====================================================
    {
      id: "arithmetic-operators",
      title: "Arithmetic Operators",

      paragraphs: [
        "Arithmetic operators are used to perform mathematical operations on numeric values."
      ],

      bullets: [
        "+ → Addition",
        "- → Subtraction",
        "* → Multiplication",
        "/ → Division",
        "% → Modulus"
      ],

      code: {
        language: "java",
        code: `int a = 20;
int b = 6;

System.out.println(a + b);
System.out.println(a - b);
System.out.println(a * b);
System.out.println(a / b);
System.out.println(a % b);`
      },

      output: `26
14
120
3
2`
    },

    // =====================================================
    // 5. ADDITION
    // =====================================================
    {
      id: "addition-operator",
      title: "Addition Operator (+)",

      paragraphs: [
        "The + operator adds two numeric values.",
        "The + operator can also be used to concatenate strings."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 20;

int result = a + b;

System.out.println(result);`
      },

      output: "30"
    },

    // =====================================================
    // 6. STRING CONCATENATION
    // =====================================================
    {
      id: "string-concatenation",
      title: "String Concatenation Using +",

      paragraphs: [
        "When the + operator is used with a String, it performs string concatenation."
      ],

      code: {
        language: "java",
        code: `String firstName = "Java";
String language = firstName + " Programming";

System.out.println(language);`
      },

      output: "Java Programming"
    },

    // =====================================================
    // 7. SUBTRACTION
    // =====================================================
    {
      id: "subtraction-operator",
      title: "Subtraction Operator (-)",

      paragraphs: [
        "The - operator subtracts the second value from the first value."
      ],

      code: {
        language: "java",
        code: `int a = 30;
int b = 10;

int result = a - b;

System.out.println(result);`
      },

      output: "20"
    },

    // =====================================================
    // 8. MULTIPLICATION
    // =====================================================
    {
      id: "multiplication-operator",
      title: "Multiplication Operator (*)",

      paragraphs: [
        "The * operator multiplies two numeric values."
      ],

      code: {
        language: "java",
        code: `int price = 100;
int quantity = 5;

int total = price * quantity;

System.out.println(total);`
      },

      output: "500"
    },

    // =====================================================
    // 9. DIVISION
    // =====================================================
    {
      id: "division-operator",
      title: "Division Operator (/)",

      paragraphs: [
        "The / operator divides one value by another.",
        "When both operands are integers, integer division is performed and the decimal portion is discarded."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 3;

System.out.println(a / b);`
      },

      output: "3"
    },

    // =====================================================
    // 10. MODULUS
    // =====================================================
    {
      id: "modulus-operator",
      title: "Modulus Operator (%)",

      paragraphs: [
        "The % operator returns the remainder after division.",
        "The modulus operator is commonly used to check whether a number is even or odd."
      ],

      code: {
        language: "java",
        code: `int number = 10;

int remainder = number % 3;

System.out.println(remainder);`
      },

      output: "1"
    },

    // =====================================================
    // 11. EVEN OR ODD
    // =====================================================
    {
      id: "even-or-odd",
      title: "Practical Example: Even or Odd",

      paragraphs: [
        "We can use the modulus operator to determine whether a number is even or odd."
      ],

      code: {
        language: "java",
        code: `int number = 10;

if (number % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");
}`
      },

      output: "Even"
    },

    // =====================================================
    // 12. ASSIGNMENT OPERATORS
    // =====================================================
    {
      id: "assignment-operators",
      title: "Assignment Operators",

      paragraphs: [
        "Assignment operators are used to assign values to variables.",
        "The basic assignment operator is =."
      ],

      bullets: [
        "= → Assign",
        "+= → Add and assign",
        "-= → Subtract and assign",
        "*= → Multiply and assign",
        "/= → Divide and assign",
        "%= → Modulus and assign"
      ],

      code: {
        language: "java",
        code: `int number = 10;

number += 5;

System.out.println(number);`
      },

      output: "15"
    },

    // =====================================================
    // 13. COMPOUND ASSIGNMENT
    // =====================================================
    {
      id: "compound-assignment",
      title: "Compound Assignment Operators",

      paragraphs: [
        "Compound assignment operators combine an arithmetic operation with assignment."
      ],

      code: {
        language: "java",
        code: `int number = 10;

number += 5;
System.out.println(number);

number -= 3;
System.out.println(number);

number *= 2;
System.out.println(number);

number /= 4;
System.out.println(number);`
      },

      output: `15
12
24
6`
    },

    // =====================================================
    // 14. RELATIONAL OPERATORS
    // =====================================================
    {
      id: "relational-operators",
      title: "Relational Operators",

      paragraphs: [
        "Relational operators are used to compare two values.",
        "The result of a relational expression is a boolean value: true or false."
      ],

      bullets: [
        "== → Equal to",
        "!= → Not equal to",
        "> → Greater than",
        "< → Less than",
        ">= → Greater than or equal to",
        "<= → Less than or equal to"
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 20;

System.out.println(a == b);
System.out.println(a != b);
System.out.println(a < b);
System.out.println(a > b);`
      },

      output: `false
true
true
false`
    },

    // =====================================================
    // 15. EQUAL TO
    // =====================================================
    {
      id: "equal-operator",
      title: "Equal To Operator (==)",

      paragraphs: [
        "The == operator checks whether two values are equal."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 10;

System.out.println(a == b);`
      },

      output: "true"
    },

    // =====================================================
    // 16. NOT EQUAL
    // =====================================================
    {
      id: "not-equal-operator",
      title: "Not Equal Operator (!=)",

      paragraphs: [
        "The != operator checks whether two values are different."
      ],

      code: {
        language: "java",
        code: `int a = 10;
int b = 20;

System.out.println(a != b);`
      },

      output: "true"
    },

    // =====================================================
    // 17. LOGICAL OPERATORS
    // =====================================================
    {
      id: "logical-operators",
      title: "Logical Operators",

      paragraphs: [
        "Logical operators are used to combine or reverse boolean expressions.",
        "They are commonly used in if conditions and other decision-making statements."
      ],

      bullets: [
        "&& → Logical AND",
        "|| → Logical OR",
        "! → Logical NOT"
      ],

      code: {
        language: "java",
        code: `int age = 25;

System.out.println(age >= 18 && age <= 60);
System.out.println(age < 18 || age > 60);
System.out.println(!(age < 18));`
      },

      output: `true
false
true`
    },

    // =====================================================
    // 18. LOGICAL AND
    // =====================================================
    {
      id: "logical-and",
      title: "Logical AND (&&)",

      paragraphs: [
        "The && operator returns true only when both conditions are true."
      ],

      code: {
        language: "java",
        code: `int age = 25;

boolean result = age >= 18 && age <= 60;

System.out.println(result);`
      },

      output: "true"
    },

    // =====================================================
    // 19. LOGICAL OR
    // =====================================================
    {
      id: "logical-or",
      title: "Logical OR (||)",

      paragraphs: [
        "The || operator returns true when at least one of the conditions is true."
      ],

      code: {
        language: "java",
        code: `int age = 15;

boolean result = age < 18 || age > 60;

System.out.println(result);`
      },

      output: "true"
    },

    // =====================================================
    // 20. LOGICAL NOT
    // =====================================================
    {
      id: "logical-not",
      title: "Logical NOT (!)",

      paragraphs: [
        "The ! operator reverses a boolean value.",
        "If an expression is true, ! makes it false. If it is false, ! makes it true."
      ],

      code: {
        language: "java",
        code: `boolean isLoggedIn = true;

System.out.println(!isLoggedIn);`
      },

      output: "false"
    },

    // =====================================================
    // 21. UNARY OPERATORS
    // =====================================================
    {
      id: "unary-operators",
      title: "Unary Operators",

      paragraphs: [
        "Unary operators work with only one operand.",
        "They are commonly used for incrementing, decrementing, negating, and reversing boolean values."
      ],

      bullets: [
        "+ → Unary plus",
        "- → Unary minus",
        "++ → Increment",
        "-- → Decrement",
        "! → Logical NOT"
      ],

      code: {
        language: "java",
        code: `int number = 10;

number++;

System.out.println(number);`
      },

      output: "11"
    },

    // =====================================================
    // 22. INCREMENT
    // =====================================================
    {
      id: "increment-operator",
      title: "Increment Operator (++)",

      paragraphs: [
        "The ++ operator increases a variable's value by one.",
        "It can be used as a prefix or postfix operator."
      ],

      code: {
        language: "java",
        code: `int number = 10;

number++;

System.out.println(number);`
      },

      output: "11"
    },

    // =====================================================
    // 23. DECREMENT
    // =====================================================
    {
      id: "decrement-operator",
      title: "Decrement Operator (--)",

      paragraphs: [
        "The -- operator decreases a variable's value by one."
      ],

      code: {
        language: "java",
        code: `int number = 10;

number--;

System.out.println(number);`
      },

      output: "9"
    },

    // =====================================================
    // 24. PRE-INCREMENT
    // =====================================================
    {
      id: "pre-increment",
      title: "Pre-Increment",

      paragraphs: [
        "In pre-increment, the variable is incremented before its value is used."
      ],

      code: {
        language: "java",
        code: `int number = 10;

int result = ++number;

System.out.println(result);
System.out.println(number);`
      },

      output: `11
11`
    },

    // =====================================================
    // 25. POST-INCREMENT
    // =====================================================
    {
      id: "post-increment",
      title: "Post-Increment",

      paragraphs: [
        "In post-increment, the current value is used first and then the variable is incremented."
      ],

      code: {
        language: "java",
        code: `int number = 10;

int result = number++;

System.out.println(result);
System.out.println(number);`
      },

      output: `10
11`
    },

    // =====================================================
    // 26. PRE VS POST INCREMENT
    // =====================================================
    {
      id: "pre-vs-post-increment",
      title: "Pre-Increment vs Post-Increment",

      bullets: [
        "++number → increment first, then use the value.",
        "number++ → use the current value first, then increment.",
        "Both ultimately increase the variable by one."
      ],

      code: {
        language: "java",
        code: `int a = 10;

int result1 = ++a;

System.out.println(result1);`
      },

      output: "11"
    },

    // =====================================================
    // 27. TERNARY OPERATOR
    // =====================================================
    {
      id: "ternary-operator",
      title: "Ternary Operator",

      paragraphs: [
        "The ternary operator is a shorthand form of a simple if-else expression.",
        "It uses three operands and follows the syntax condition ? valueIfTrue : valueIfFalse."
      ],

      code: {
        language: "java",
        code: `int age = 20;

String result = age >= 18 ? "Adult" : "Minor";

System.out.println(result);`
      },

      output: "Adult"
    },

    // =====================================================
    // 28. TERNARY PRACTICAL EXAMPLE
    // =====================================================
    {
      id: "ternary-practical-example",
      title: "Practical Example of Ternary Operator",

      paragraphs: [
        "The ternary operator can be useful when we need to choose between two values based on a condition."
      ],

      code: {
        language: "java",
        code: `int number = 10;

String result =
        number % 2 == 0 ? "Even" : "Odd";

System.out.println(result);`
      },

      output: "Even"
    },

    // =====================================================
    // 29. BITWISE OPERATORS
    // =====================================================
    {
      id: "bitwise-operators",
      title: "Bitwise Operators",

      paragraphs: [
        "Bitwise operators perform operations directly on the individual bits of integer values.",
        "They are commonly used in low-level programming, flags, permissions, and performance-sensitive operations."
      ],

      bullets: [
        "& → Bitwise AND",
        "| → Bitwise OR",
        "^ → Bitwise XOR",
        "~ → Bitwise NOT"
      ],

      code: {
        language: "java",
        code: `int a = 5;
int b = 3;

System.out.println(a & b);
System.out.println(a | b);
System.out.println(a ^ b);`
      },

      output: `1
7
6`
    },

    // =====================================================
    // 30. SHIFT OPERATORS
    // =====================================================
    {
      id: "shift-operators",
      title: "Shift Operators",

      paragraphs: [
        "Shift operators move the bits of an integer value to the left or right.",
        "Java provides left shift, signed right shift, and unsigned right shift operators."
      ],

      bullets: [
        "<< → Left shift",
        ">> → Signed right shift",
        ">>> → Unsigned right shift"
      ],

      code: {
        language: "java",
        code: `int number = 8;

System.out.println(number << 1);
System.out.println(number >> 1);`
      },

      output: `16
4`
    },

    // =====================================================
    // 31. OPERATOR PRECEDENCE
    // =====================================================
    {
      id: "operator-precedence",
      title: "Operator Precedence",

      paragraphs: [
        "Operator precedence determines the order in which operators are evaluated in an expression.",
        "Multiplication and division generally have higher precedence than addition and subtraction.",
        "Parentheses can be used to explicitly control the order of evaluation."
      ],

      code: {
        language: "java",
        code: `int result = 10 + 5 * 2;

System.out.println(result);`
      },

      output: "20"
    },

    // =====================================================
    // 32. USING PARENTHESES
    // =====================================================
    {
      id: "parentheses",
      title: "Using Parentheses",

      paragraphs: [
        "Parentheses can be used when you want an expression to be evaluated in a specific order."
      ],

      code: {
        language: "java",
        code: `int result = (10 + 5) * 2;

System.out.println(result);`
      },

      output: "30"
    },

    // =====================================================
    // 33. PRACTICAL EXAMPLE
    // =====================================================
    {
      id: "practical-example",
      title: "Practical Example: Student Marks",

      paragraphs: [
        "Let's combine arithmetic, relational, and logical operators in a simple student example."
      ],

      code: {
        language: "java",
        code: `int marks = 85;

boolean passed = marks >= 40;
boolean distinction = marks >= 75;

System.out.println("Passed: " + passed);
System.out.println("Distinction: " + distinction);`
      },

      output: `Passed: true
Distinction: true`
    },

    // =====================================================
    // 34. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners often make mistakes when using operators, especially when comparing values and combining conditions."
      ],

      bullets: [
        "Using = instead of == when comparing values.",
        "Forgetting that integer division removes the decimal portion.",
        "Confusing ++number with number++.",
        "Using && when || is required, or vice versa.",
        "Forgetting parentheses in complex expressions.",
        "Dividing an integer by zero.",
        "Using == with Strings when the intention is to compare their contents."
      ]
    },

    // =====================================================
    // 35. COMMON MISTAKE: = VS ==
    // =====================================================
    {
      id: "assignment-vs-comparison",
      title: "Common Mistake: = vs ==",

      paragraphs: [
        "The = operator assigns a value, while == compares two values.",
        "These operators have completely different purposes."
      ],

      code: {
        language: "java",
        code: `int a = 10;

if (a == 10) {
    System.out.println("Value is 10");
}`
      },

      output: "Value is 10"
    },

    // =====================================================
    // 36. COMMON MISTAKE: INTEGER DIVISION
    // =====================================================
    {
      id: "integer-division",
      title: "Common Mistake: Integer Division",

      paragraphs: [
        "When both operands are integers, Java performs integer division."
      ],

      code: {
        language: "java",
        code: `int result = 5 / 2;

System.out.println(result);`
      },

      output: "2"
    },

    // =====================================================
    // 37. CORRECT DECIMAL DIVISION
    // =====================================================
    {
      id: "decimal-division",
      title: "Getting a Decimal Result",

      paragraphs: [
        "If you want a decimal result, at least one operand should be a floating-point value."
      ],

      code: {
        language: "java",
        code: `double result = 5.0 / 2;

System.out.println(result);`
      },

      output: "2.5"
    },

    // =====================================================
    // 38. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Operators perform operations on values and variables.",
        "Arithmetic operators are used for mathematical calculations.",
        "Assignment operators assign values to variables.",
        "Relational operators compare values.",
        "Logical operators combine boolean expressions.",
        "Unary operators work with one operand.",
        "The ternary operator is a shorthand for simple conditional expressions.",
        "Bitwise operators work on individual bits.",
        "Shift operators move bits left or right.",
        "Operator precedence determines the order of evaluation.",
        "Parentheses can be used to make the intended evaluation order clear."
      ]
    },

    // =====================================================
    // 39. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Operators: Interview Questions",

      interviewQuestions: [
        {
          question: "What are operators in Java?",
          answer:
            "Operators are special symbols used to perform operations on values and variables, such as arithmetic calculations, comparisons, assignments, and logical operations."
        },
        {
          question: "What are the different types of operators in Java?",
          answer:
            "Common categories include arithmetic, assignment, relational, logical, unary, ternary, bitwise, and shift operators."
        },
        {
          question: "What is the difference between = and ==?",
          answer:
            "= is the assignment operator used to assign a value, while == is the equality operator used to compare two values."
        },
        {
          question: "What is the difference between / and %?",
          answer:
            "/ performs division, while % returns the remainder after division."
        },
        {
          question: "What is the difference between ++i and i++?",
          answer:
            "++i is pre-increment, so the value is incremented before it is used. i++ is post-increment, so the current value is used first and then incremented."
        },
        {
          question: "What is the difference between && and ||?",
          answer:
            "&& returns true when both conditions are true, while || returns true when at least one condition is true."
        },
        {
          question: "What is the ternary operator?",
          answer:
            "The ternary operator is a conditional operator written as condition ? valueIfTrue : valueIfFalse. It is commonly used as a short form of simple if-else logic."
        },
        {
          question: "What happens when two integers are divided in Java?",
          answer:
            "Integer division is performed, so the decimal portion is discarded. For example, 5 / 2 produces 2."
        },
        {
          question: "What is operator precedence?",
          answer:
            "Operator precedence determines the order in which operators are evaluated within an expression."
        },
        {
          question: "What are bitwise operators?",
          answer:
            "Bitwise operators perform operations on individual bits of integer values. Examples include &, |, ^, and ~."
        }
      ]
    }
  ]
};