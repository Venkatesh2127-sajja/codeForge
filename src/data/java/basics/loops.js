export const loops = {
  id: "loops",
  slug: "loops",
  title: "Loops in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn how loops work in Java using for, while, do-while, and enhanced for loops, along with nested loops, break, continue, and practical programming examples.",
  estimatedTime: "35 min",

  sections: [

    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Loops",

      paragraphs: [
        "A loop is used to execute a block of code repeatedly as long as a specified condition is satisfied.",
        "Loops help us avoid writing the same code multiple times.",
        "For example, instead of writing ten separate System.out.println() statements to print numbers from 1 to 10, we can use a loop."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`
      },

      output: `1
2
3
4
5`,

      bullets: [
        "Loops reduce duplicate code.",
        "Loops are useful when an operation must be repeated.",
        "A loop normally contains initialization, a condition, and an update.",
        "Java provides several types of loops."
      ]
    },

    // =====================================================
    // 2. TYPES OF LOOPS
    // =====================================================
    {
      id: "types-of-loops",
      title: "Types of Loops in Java",

      paragraphs: [
        "Java provides several types of loops for different programming situations."
      ],

      bullets: [
        "for loop",
        "while loop",
        "do-while loop",
        "enhanced for loop"
      ]
    },

    // =====================================================
    // 3. FOR LOOP
    // =====================================================
    {
      id: "for-loop",
      title: "for Loop",

      paragraphs: [
        "The for loop is commonly used when we know how many times a block of code needs to execute.",
        "It combines initialization, condition checking, and updating in one place."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`
      },

      output: `1
2
3
4
5`
    },

    // =====================================================
    // 4. FOR LOOP SYNTAX
    // =====================================================
    {
      id: "for-loop-syntax",
      title: "Syntax of for Loop",

      paragraphs: [
        "The basic syntax of a for loop is:"
      ],

      code: {
        language: "java",
        code: `for (initialization; condition; update) {
    // code to execute
}`
      },

      bullets: [
        "Initialization runs once before the loop starts.",
        "Condition is checked before each iteration.",
        "The loop body executes when the condition is true.",
        "Update executes after each iteration."
      ]
    },

    // =====================================================
    // 5. FOR LOOP FLOW
    // =====================================================
    {
      id: "for-loop-flow",
      title: "How a for Loop Works",

      paragraphs: [
        "A for loop follows a specific execution order.",
        "First, initialization is executed. Then the condition is checked. If it is true, the loop body executes. After that, the update expression executes and the condition is checked again."
      ],

      bullets: [
        "Step 1: Initialization",
        "Step 2: Condition check",
        "Step 3: Execute loop body",
        "Step 4: Execute update",
        "Step 5: Repeat from condition check"
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 3; i++) {
    System.out.println("Hello");
}`
      },

      output: `Hello
Hello
Hello`
    },

    // =====================================================
    // 6. PRINT NUMBERS
    // =====================================================
    {
      id: "print-numbers",
      title: "Practical Example: Print Numbers",

      paragraphs: [
        "A common beginner problem is printing numbers from 1 to a given number."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}`
      },

      output: `1
2
3
4
5
6
7
8
9
10`
    },

    // =====================================================
    // 7. PRINT EVEN NUMBERS
    // =====================================================
    {
      id: "even-numbers",
      title: "Practical Example: Print Even Numbers",

      paragraphs: [
        "We can combine a for loop with the modulus operator to print even numbers."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 10; i++) {

    if (i % 2 == 0) {
        System.out.println(i);
    }
}`
      },

      output: `2
4
6
8
10`
    },

    // =====================================================
    // 8. SUM OF NUMBERS
    // =====================================================
    {
      id: "sum-of-numbers",
      title: "Practical Example: Sum of Numbers",

      paragraphs: [
        "A loop can be used to calculate the sum of numbers from 1 to a given value."
      ],

      code: {
        language: "java",
        code: `int sum = 0;

for (int i = 1; i <= 5; i++) {
    sum = sum + i;
}

System.out.println(sum);`
      },

      output: "15"
    },

    // =====================================================
    // 9. WHILE LOOP
    // =====================================================
    {
      id: "while-loop",
      title: "while Loop",

      paragraphs: [
        "The while loop repeatedly executes a block of code as long as its condition is true.",
        "It is useful when the number of iterations is not known in advance."
      ],

      code: {
        language: "java",
        code: `int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}`
      },

      output: `1
2
3
4
5`
    },

    // =====================================================
    // 10. WHILE SYNTAX
    // =====================================================
    {
      id: "while-loop-syntax",
      title: "Syntax of while Loop",

      code: {
        language: "java",
        code: `while (condition) {
    // code to execute
}`
      },

      bullets: [
        "The condition is checked before each iteration.",
        "If the condition is true, the loop body executes.",
        "If the condition is false, the loop stops.",
        "The loop variable must normally be updated inside the loop."
      ]
    },

    // =====================================================
    // 11. WHILE PRACTICAL
    // =====================================================
    {
      id: "while-practical-example",
      title: "Practical Example: Countdown",

      paragraphs: [
        "A while loop can be used to perform a countdown."
      ],

      code: {
        language: "java",
        code: `int count = 5;

while (count >= 1) {
    System.out.println(count);
    count--;
}`
      },

      output: `5
4
3
2
1`
    },

    // =====================================================
    // 12. WHILE USER STYLE EXAMPLE
    // =====================================================
    {
      id: "while-condition-example",
      title: "Practical Example: Find a Number",

      paragraphs: [
        "A while loop can continue processing until a particular condition becomes false."
      ],

      code: {
        language: "java",
        code: `int number = 1;

while (number <= 3) {

    System.out.println("Processing: " + number);

    number++;
}`
      },

      output: `Processing: 1
Processing: 2
Processing: 3`
    },

    // =====================================================
    // 13. DO-WHILE
    // =====================================================
    {
      id: "do-while-loop",
      title: "do-while Loop",

      paragraphs: [
        "The do-while loop is similar to the while loop, but the condition is checked after the loop body executes.",
        "Therefore, the body of a do-while loop executes at least once."
      ],

      code: {
        language: "java",
        code: `int i = 1;

do {
    System.out.println(i);
    i++;
} while (i <= 5);`
      },

      output: `1
2
3
4
5`
    },

    // =====================================================
    // 14. DO-WHILE SYNTAX
    // =====================================================
    {
      id: "do-while-syntax",
      title: "Syntax of do-while Loop",

      code: {
        language: "java",
        code: `do {
    // code to execute
} while (condition);`
      },

      bullets: [
        "The loop body executes first.",
        "The condition is checked after execution.",
        "The loop continues if the condition is true.",
        "The loop executes at least once."
      ]
    },

    // =====================================================
    // 15. DO-WHILE DIFFERENCE
    // =====================================================
    {
      id: "do-while-difference",
      title: "while vs do-while",

      paragraphs: [
        "The main difference is when the condition is checked.",
        "A while loop checks the condition before executing the body, while a do-while loop checks the condition after executing the body."
      ],

      code: {
        language: "java",
        code: `int number = 10;

while (number < 5) {
    System.out.println("while loop");
}

do {
    System.out.println("do-while loop");
} while (number < 5);`
      },

      output: "do-while loop"
    },

    // =====================================================
    // 16. ENHANCED FOR LOOP
    // =====================================================
    {
      id: "enhanced-for-loop",
      title: "Enhanced for Loop",

      paragraphs: [
        "The enhanced for loop, also called the for-each loop, is used to iterate over arrays and other iterable collections.",
        "It provides a simpler way to access each element without manually managing an index."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40};

for (int number : numbers) {
    System.out.println(number);
}`
      },

      output: `10
20
30
40`
    },

    // =====================================================
    // 17. ENHANCED FOR SYNTAX
    // =====================================================
    {
      id: "enhanced-for-syntax",
      title: "Syntax of Enhanced for Loop",

      code: {
        language: "java",
        code: `for (dataType variable : collection) {
    // code
}`
      },

      bullets: [
        "The variable receives each element one at a time.",
        "The loop automatically moves to the next element.",
        "No index variable is required for simple traversal.",
        "It is commonly used with arrays and collections."
      ]
    },

    // =====================================================
    // 18. ENHANCED FOR STRING ARRAY
    // =====================================================
    {
      id: "enhanced-for-string-array",
      title: "Enhanced for with String Array",

      code: {
        language: "java",
        code: `String[] names = {
    "Java",
    "Spring Boot",
    "React"
};

for (String name : names) {
    System.out.println(name);
}`
      },

      output: `Java
Spring Boot
React`
    },

    // =====================================================
    // 19. NESTED LOOPS
    // =====================================================
    {
      id: "nested-loops",
      title: "Nested Loops",

      paragraphs: [
        "A nested loop is a loop placed inside another loop.",
        "For every iteration of the outer loop, the inner loop executes completely.",
        "Nested loops are commonly used for matrices, tables, patterns, and two-dimensional data."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 3; i++) {

    for (int j = 1; j <= 2; j++) {
        System.out.println(
            "i = " + i + ", j = " + j
        );
    }
}`
      },

      output: `i = 1, j = 1
i = 1, j = 2
i = 2, j = 1
i = 2, j = 2
i = 3, j = 1
i = 3, j = 2`
    },

    // =====================================================
    // 20. NESTED LOOP FLOW
    // =====================================================
    {
      id: "nested-loop-flow",
      title: "How Nested Loops Work",

      paragraphs: [
        "The outer loop controls how many times the inner loop starts.",
        "For every single iteration of the outer loop, the inner loop completes all of its iterations."
      ],

      bullets: [
        "Outer loop starts.",
        "Inner loop starts.",
        "Inner loop runs completely.",
        "Outer loop moves to its next iteration.",
        "The inner loop starts again."
      ]
    },

    // =====================================================
    // 21. STAR PATTERN
    // =====================================================
    {
      id: "star-pattern",
      title: "Practical Example: Star Pattern",

      paragraphs: [
        "Nested loops can be used to create simple patterns."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 4; i++) {

    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }

    System.out.println();
}`
      },

      output: `* 
* * 
* * * 
* * * *`
    },

    // =====================================================
    // 22. MULTIPLICATION TABLE
    // =====================================================
    {
      id: "multiplication-table",
      title: "Practical Example: Multiplication Table",

      paragraphs: [
        "A for loop can be used to generate a multiplication table."
      ],

      code: {
        language: "java",
        code: `int number = 5;

for (int i = 1; i <= 10; i++) {
    System.out.println(
        number + " x " + i + " = " + (number * i)
    );
}`
      },

      output: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`
    },

    // =====================================================
    // 23. BREAK
    // =====================================================
    {
      id: "break-statement",
      title: "break Statement",

      paragraphs: [
        "The break statement is used to immediately terminate a loop.",
        "When Java encounters break, execution continues with the statement after the loop."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 10; i++) {

    if (i == 5) {
        break;
    }

    System.out.println(i);
}`
      },

      output: `1
2
3
4`
    },

    // =====================================================
    // 24. BREAK PRACTICAL
    // =====================================================
    {
      id: "break-practical-example",
      title: "Practical Example: Stop at a Number",

      paragraphs: [
        "We can use break when we want to stop searching after finding a particular value."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

for (int number : numbers) {

    if (number == 30) {
        System.out.println("Number found");
        break;
    }
}`
      },

      output: "Number found"
    },

    // =====================================================
    // 25. CONTINUE
    // =====================================================
    {
      id: "continue-statement",
      title: "continue Statement",

      paragraphs: [
        "The continue statement skips the current iteration and moves to the next iteration of the loop."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 5; i++) {

    if (i == 3) {
        continue;
    }

    System.out.println(i);
}`
      },

      output: `1
2
4
5`
    },

    // =====================================================
    // 26. CONTINUE PRACTICAL
    // =====================================================
    {
      id: "continue-practical-example",
      title: "Practical Example: Skip Even Numbers",

      paragraphs: [
        "The continue statement can be used when certain values should be skipped."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 10; i++) {

    if (i % 2 == 0) {
        continue;
    }

    System.out.println(i);
}`
      },

      output: `1
3
5
7
9`
    },

    // =====================================================
    // 27. BREAK VS CONTINUE
    // =====================================================
    {
      id: "break-vs-continue",
      title: "break vs continue",

      paragraphs: [
        "break and continue both change the normal flow of a loop, but they behave differently."
      ],

      bullets: [
        "break completely terminates the loop.",
        "continue skips the current iteration.",
        "After break, execution moves outside the loop.",
        "After continue, execution moves to the next iteration."
      ],

      code: {
        language: "java",
        code: `for (int i = 1; i <= 5; i++) {

    if (i == 3) {
        continue;
    }

    System.out.println(i);
}`
      },

      output: `1
2
4
5`
    },

    // =====================================================
    // 28. INFINITE LOOP
    // =====================================================
    {
      id: "infinite-loop",
      title: "Infinite Loop",

      paragraphs: [
        "An infinite loop is a loop that never becomes false and therefore continues executing indefinitely.",
        "Infinite loops are sometimes intentional, but accidentally creating one is a common programming mistake."
      ],

      code: {
        language: "java",
        code: `int i = 1;

while (i <= 5) {
    System.out.println(i);
    // i is never updated
}`
      },

      output:
        "The loop continues indefinitely because i remains 1."
    },

    // =====================================================
    // 29. AVOIDING INFINITE LOOPS
    // =====================================================
    {
      id: "avoid-infinite-loop",
      title: "How to Avoid Infinite Loops",

      paragraphs: [
        "Make sure the loop condition can eventually become false.",
        "When using a counter, update the counter correctly inside the loop."
      ],

      code: {
        language: "java",
        code: `int i = 1;

while (i <= 5) {

    System.out.println(i);

    i++;
}`
      },

      output: `1
2
3
4
5`
    },

    // =====================================================
    // 30. PRACTICAL EXAMPLE - FACTORIAL
    // =====================================================
    {
      id: "factorial-example",
      title: "Practical Example: Factorial",

      paragraphs: [
        "A loop can be used to calculate the factorial of a number.",
        "The factorial of 5 is 5 × 4 × 3 × 2 × 1 = 120."
      ],

      code: {
        language: "java",
        code: `int number = 5;
int factorial = 1;

for (int i = 1; i <= number; i++) {
    factorial = factorial * i;
}

System.out.println(factorial);`
      },

      output: "120"
    },

    // =====================================================
    // 31. PRACTICAL EXAMPLE - REVERSE NUMBER
    // =====================================================
    {
      id: "reverse-number",
      title: "Practical Example: Reverse a Number",

      paragraphs: [
        "A while loop can be used to reverse the digits of an integer."
      ],

      code: {
        language: "java",
        code: `int number = 1234;
int reverse = 0;

while (number != 0) {

    int digit = number % 10;

    reverse = reverse * 10 + digit;

    number = number / 10;
}

System.out.println(reverse);`
      },

      output: "4321"
    },

    // =====================================================
    // 32. PRACTICAL EXAMPLE - COUNT DIGITS
    // =====================================================
    {
      id: "count-digits",
      title: "Practical Example: Count Digits",

      code: {
        language: "java",
        code: `int number = 12345;
int count = 0;

while (number != 0) {

    number = number / 10;
    count++;
}

System.out.println(count);`
      },

      output: "5"
    },

    // =====================================================
    // 33. PRACTICAL EXAMPLE - PRIME NUMBER
    // =====================================================
    {
      id: "prime-number",
      title: "Practical Example: Check Prime Number",

      paragraphs: [
        "A loop can be used to check whether a number is divisible by any number other than 1 and itself."
      ],

      code: {
        language: "java",
        code: `int number = 17;
boolean isPrime = true;

if (number < 2) {
    isPrime = false;
}

for (int i = 2; i <= number / 2; i++) {

    if (number % i == 0) {
        isPrime = false;
        break;
    }
}

if (isPrime) {
    System.out.println("Prime");
} else {
    System.out.println("Not Prime");
}`
      },

      output: "Prime"
    },

    // =====================================================
    // 34. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when working with loops."
      ],

      bullets: [
        "Forgetting to update the loop variable.",
        "Creating an accidental infinite loop.",
        "Using the wrong loop condition.",
        "Using <= when < was intended, or vice versa.",
        "Using break when continue was required.",
        "Using continue without understanding that the current iteration is skipped.",
        "Accessing an array using an invalid index.",
        "Writing unnecessarily complex nested loops.",
        "Changing the loop variable unexpectedly inside the loop."
      ]
    },

    // =====================================================
    // 35. COMMON MISTAKE - OFF BY ONE
    // =====================================================
    {
      id: "off-by-one",
      title: "Common Mistake: Off-by-One Error",

      paragraphs: [
        "An off-by-one error occurs when a loop executes one time too many or one time too few."
      ],

      code: {
        language: "java",
        code: `for (int i = 0; i <= 5; i++) {
    System.out.println(i);
}`
      },

      output: `0
1
2
3
4
5`
    },

    // =====================================================
    // 36. CORRECT ARRAY LOOP
    // =====================================================
    {
      id: "array-loop",
      title: "Correct Loop for an Array",

      paragraphs: [
        "When using an index to traverse an array, the condition should normally use the array length."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40};

for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}`
      },

      output: `10
20
30
40`
    },

    // =====================================================
    // 37. LOOP COMPARISON
    // =====================================================
    {
      id: "loop-comparison",
      title: "for vs while vs do-while vs enhanced for",

      bullets: [
        "for loop → useful when the number of iterations is known.",
        "while loop → useful when repetition depends on a condition.",
        "do-while loop → useful when the body must execute at least once.",
        "enhanced for loop → useful for traversing arrays and collections."
      ]
    },

    // =====================================================
    // 38. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Loops are used to repeatedly execute a block of code.",
        "The for loop is commonly used when the number of iterations is known.",
        "The while loop checks its condition before executing the body.",
        "The do-while loop executes its body at least once.",
        "The enhanced for loop is useful for traversing arrays and collections.",
        "Nested loops contain one loop inside another loop.",
        "break terminates the loop immediately.",
        "continue skips the current iteration.",
        "An infinite loop occurs when the loop condition never becomes false.",
        "Loop conditions and updates should be carefully designed to avoid off-by-one errors."
      ]
    },

    // =====================================================
    // 39. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Loops: Interview Questions",

      interviewQuestions: [
        {
          question: "What is a loop in Java?",
          answer:
            "A loop is a control structure used to repeatedly execute a block of code while a specified condition is satisfied."
        },
        {
          question: "What are the different types of loops in Java?",
          answer:
            "The main loops are for, while, do-while, and enhanced for loops."
        },
        {
          question: "When should you use a for loop?",
          answer:
            "A for loop is commonly used when the number of iterations is known or when initialization, condition, and update can be expressed together."
        },
        {
          question: "What is the difference between while and do-while?",
          answer:
            "A while loop checks the condition before executing the body, while a do-while loop checks the condition after executing the body. Therefore, do-while executes at least once."
        },
        {
          question: "What is an enhanced for loop?",
          answer:
            "The enhanced for loop, or for-each loop, is used to iterate through arrays and iterable collections without manually managing an index."
        },
        {
          question: "What is a nested loop?",
          answer:
            "A nested loop is a loop placed inside another loop. The inner loop completes its iterations for each iteration of the outer loop."
        },
        {
          question: "What is the difference between break and continue?",
          answer:
            "break terminates the loop completely, while continue skips the current iteration and moves to the next iteration."
        },
        {
          question: "What is an infinite loop?",
          answer:
            "An infinite loop is a loop whose condition never becomes false, causing the loop to continue indefinitely."
        },
        {
          question: "What is an off-by-one error?",
          answer:
            "An off-by-one error occurs when a loop executes one iteration too many or one iteration too few because of an incorrect boundary condition."
        },
        {
          question: "How do you traverse an array using a for loop?",
          answer:
            "Use an index starting at 0 and continue while the index is less than the array's length, for example: for (int i = 0; i < array.length; i++)."
        }
      ]
    }
  ]
};