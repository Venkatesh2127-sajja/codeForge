export const arrays = {
  id: "arrays",
  slug: "arrays",
  title: "Arrays in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn how arrays work in Java, including declaration, initialization, indexing, traversal, updating elements, searching, finding minimum and maximum values, reversing arrays, and practical programming examples.",
  estimatedTime: "40 min",

  sections: [

    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Arrays",

      paragraphs: [
        "An array is a data structure used to store multiple values of the same data type in a single variable.",
        "Instead of creating separate variables for every value, we can store related values together inside an array.",
        "For example, an array can store the marks of multiple students."
      ],

      code: {
        language: "java",
        code: `int[] marks = {85, 90, 78, 92, 88};

System.out.println(marks[0]);
System.out.println(marks[1]);`
      },

      output: `85
90`,

      bullets: [
        "An array stores multiple values.",
        "All elements normally have the same data type.",
        "Array indexing starts from 0.",
        "Arrays have a fixed length after creation."
      ]
    },

    // =====================================================
    // 2. WHY ARRAYS
    // =====================================================
    {
      id: "why-arrays",
      title: "Why Do We Need Arrays?",

      paragraphs: [
        "Suppose we need to store the marks of five students. Without an array, we would need five separate variables.",
        "An array allows us to store all five values under one variable name and access them using indexes."
      ],

      code: {
        language: "java",
        code: `int mark1 = 80;
int mark2 = 85;
int mark3 = 90;
int mark4 = 75;
int mark5 = 88;`
      },

      bullets: [
        "Without arrays, many related variables may be required.",
        "Arrays make related data easier to manage.",
        "Loops can be used to process array elements efficiently."
      ]
    },

    // =====================================================
    // 3. ARRAY DECLARATION
    // =====================================================
    {
      id: "array-declaration",
      title: "Array Declaration",

      paragraphs: [
        "Array declaration tells Java that a variable will refer to an array of a particular data type.",
        "The square brackets [] indicate that the variable is an array."
      ],

      code: {
        language: "java",
        code: `int[] numbers;
String[] names;
double[] prices;`
      },

      bullets: [
        "int[] numbers declares an integer array.",
        "String[] names declares a String array.",
        "double[] prices declares a double array.",
        "Declaration alone does not create the array object."
      ]
    },

    // =====================================================
    // 4. ARRAY CREATION
    // =====================================================
    {
      id: "array-creation",
      title: "Array Creation",

      paragraphs: [
        "After declaring an array, we can create an array object using the new keyword.",
        "The size of the array must be specified when using this form."
      ],

      code: {
        language: "java",
        code: `int[] numbers = new int[5];`
      },

      bullets: [
        "The array above can store five integers.",
        "The indexes are 0 through 4.",
        "The length is fixed after creation."
      ]
    },

    // =====================================================
    // 5. ARRAY INITIALIZATION
    // =====================================================
    {
      id: "array-initialization",
      title: "Array Initialization",

      paragraphs: [
        "Array initialization means assigning values to the elements of an array.",
        "Java provides multiple ways to initialize arrays."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

System.out.println(numbers[0]);
System.out.println(numbers[4]);`
      },

      output: `10
50`
    },

    // =====================================================
    // 6. DECLARATION CREATION INITIALIZATION
    // =====================================================
    {
      id: "declaration-creation-initialization",
      title: "Declaration, Creation, and Initialization",

      paragraphs: [
        "An array can be declared first and created later. Values can then be assigned to individual positions."
      ],

      code: {
        language: "java",
        code: `int[] numbers;

numbers = new int[3];

numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;

System.out.println(numbers[0]);
System.out.println(numbers[1]);
System.out.println(numbers[2]);`
      },

      output: `10
20
30`
    },

    // =====================================================
    // 7. INDEXING
    // =====================================================
    {
      id: "array-indexing",
      title: "Array Indexing",

      paragraphs: [
        "An index is the position of an element inside an array.",
        "Java arrays use zero-based indexing, which means the first element is at index 0."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40};

System.out.println(numbers[0]);
System.out.println(numbers[1]);
System.out.println(numbers[2]);
System.out.println(numbers[3]);`
      },

      output: `10
20
30
40`,

      bullets: [
        "First element → index 0",
        "Second element → index 1",
        "Third element → index 2",
        "Last element → length - 1"
      ]
    },

    // =====================================================
    // 8. ACCESSING ELEMENT
    // =====================================================
    {
      id: "accessing-elements",
      title: "Accessing Array Elements",

      paragraphs: [
        "We can access an array element by using its index inside square brackets."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

int first = numbers[0];
int second = numbers[1];

System.out.println(first);
System.out.println(second);`
      },

      output: `10
20`
    },

    // =====================================================
    // 9. UPDATING ELEMENTS
    // =====================================================
    {
      id: "updating-elements",
      title: "Updating Array Elements",

      paragraphs: [
        "Array elements can be changed by assigning a new value to a specific index."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

numbers[1] = 100;

System.out.println(numbers[1]);`
      },

      output: "100"
    },

    // =====================================================
    // 10. ARRAY LENGTH
    // =====================================================
    {
      id: "array-length",
      title: "Finding Array Length",

      paragraphs: [
        "The length property returns the number of elements that an array can contain."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

System.out.println(numbers.length);`
      },

      output: "5"
    },

    // =====================================================
    // 11. TRAVERSAL USING FOR
    // =====================================================
    {
      id: "array-traversal-for",
      title: "Traversing an Array Using for Loop",

      paragraphs: [
        "Array traversal means visiting each element of an array.",
        "A traditional for loop can be used when we need access to the index as well as the value."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}`
      },

      output: `10
20
30
40
50`
    },

    // =====================================================
    // 12. TRAVERSAL USING ENHANCED FOR
    // =====================================================
    {
      id: "array-traversal-enhanced-for",
      title: "Traversing an Array Using Enhanced for",

      paragraphs: [
        "The enhanced for loop provides a simpler way to visit every element when the index is not required."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

for (int number : numbers) {
    System.out.println(number);
}`
      },

      output: `10
20
30
40
50`
    },

    // =====================================================
    // 13. UPDATE ALL ELEMENTS
    // =====================================================
    {
      id: "update-all-elements",
      title: "Updating Multiple Array Elements",

      paragraphs: [
        "When we need to modify array elements, a traditional for loop is useful because it provides the index."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {1, 2, 3, 4, 5};

for (int i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
}

for (int number : numbers) {
    System.out.println(number);
}`
      },

      output: `2
4
6
8
10`
    },

    // =====================================================
    // 14. SEARCHING
    // =====================================================
    {
      id: "searching-array",
      title: "Searching an Array",

      paragraphs: [
        "Searching means checking whether a particular value exists in an array.",
        "A simple approach is to compare the target value with every element."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

int target = 30;
boolean found = false;

for (int number : numbers) {

    if (number == target) {
        found = true;
        break;
    }
}

System.out.println(found);`
      },

      output: "true"
    },

    // =====================================================
    // 15. SEARCH AND INDEX
    // =====================================================
    {
      id: "search-index",
      title: "Searching and Finding the Index",

      paragraphs: [
        "Sometimes we need to know not only whether a value exists but also its position."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

int target = 40;
int index = -1;

for (int i = 0; i < numbers.length; i++) {

    if (numbers[i] == target) {
        index = i;
        break;
    }
}

System.out.println(index);`
      },

      output: "3"
    },

    // =====================================================
    // 16. MINIMUM VALUE
    // =====================================================
    {
      id: "minimum-value",
      title: "Finding the Minimum Value",

      paragraphs: [
        "To find the minimum value, we can assume the first element is the minimum and then compare it with the remaining elements."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {45, 12, 78, 23, 9};

int min = numbers[0];

for (int i = 1; i < numbers.length; i++) {

    if (numbers[i] < min) {
        min = numbers[i];
    }
}

System.out.println(min);`
      },

      output: "9"
    },

    // =====================================================
    // 17. MAXIMUM VALUE
    // =====================================================
    {
      id: "maximum-value",
      title: "Finding the Maximum Value",

      paragraphs: [
        "To find the maximum value, we can assume the first element is the maximum and compare it with the remaining elements."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {45, 12, 78, 23, 9};

int max = numbers[0];

for (int i = 1; i < numbers.length; i++) {

    if (numbers[i] > max) {
        max = numbers[i];
    }
}

System.out.println(max);`
      },

      output: "78"
    },

    // =====================================================
    // 18. MIN AND MAX
    // =====================================================
    {
      id: "min-max-together",
      title: "Finding Minimum and Maximum Together",

      paragraphs: [
        "We can find both the minimum and maximum values in a single traversal of the array."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {45, 12, 78, 23, 9};

int min = numbers[0];
int max = numbers[0];

for (int i = 1; i < numbers.length; i++) {

    if (numbers[i] < min) {
        min = numbers[i];
    }

    if (numbers[i] > max) {
        max = numbers[i];
    }
}

System.out.println("Min: " + min);
System.out.println("Max: " + max);`
      },

      output: `Min: 9
Max: 78`
    },

    // =====================================================
    // 19. SUM
    // =====================================================
    {
      id: "array-sum",
      title: "Finding the Sum of Array Elements",

      paragraphs: [
        "We can calculate the sum of all elements by adding each element to a running total."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40};

int sum = 0;

for (int number : numbers) {
    sum += number;
}

System.out.println(sum);`
      },

      output: "100"
    },

    // =====================================================
    // 20. AVERAGE
    // =====================================================
    {
      id: "array-average",
      title: "Finding the Average",

      paragraphs: [
        "The average can be calculated by dividing the sum of all elements by the number of elements."
      ],

      code: {
        language: "java",
        code: `int[] marks = {80, 90, 70, 60};

int sum = 0;

for (int mark : marks) {
    sum += mark;
}

double average =
        (double) sum / marks.length;

System.out.println(average);`
      },

      output: "75.0"
    },

    // =====================================================
    // 21. REVERSE ARRAY
    // =====================================================
    {
      id: "reverse-array",
      title: "Reversing an Array",

      paragraphs: [
        "Reversing an array means changing the order of its elements so that the last element becomes the first and the first becomes the last.",
        "A common approach is to use two indexes: one starting from the beginning and another from the end."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30, 40, 50};

int start = 0;
int end = numbers.length - 1;

while (start < end) {

    int temp = numbers[start];

    numbers[start] = numbers[end];
    numbers[end] = temp;

    start++;
    end--;
}

for (int number : numbers) {
    System.out.println(number);
}`
      },

      output: `50
40
30
20
10`
    },

    // =====================================================
    // 22. SWAP ELEMENTS
    // =====================================================
    {
      id: "swap-array-elements",
      title: "Swapping Array Elements",

      paragraphs: [
        "To reverse an array in-place, we swap elements from opposite ends.",
        "A temporary variable is commonly used to safely exchange two values."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

int temp = numbers[0];

numbers[0] = numbers[2];
numbers[2] = temp;

for (int number : numbers) {
    System.out.println(number);
}`
      },

      output: `30
20
10`
    },

    // =====================================================
    // 23. COUNT EVEN NUMBERS
    // =====================================================
    {
      id: "count-even-numbers",
      title: "Practical Example: Count Even Numbers",

      paragraphs: [
        "We can traverse an array and use the modulus operator to count how many elements are even."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 15, 20, 25, 30};

int count = 0;

for (int number : numbers) {

    if (number % 2 == 0) {
        count++;
    }
}

System.out.println(count);`
      },

      output: "3"
    },

    // =====================================================
    // 24. COUNT ODD NUMBERS
    // =====================================================
    {
      id: "count-odd-numbers",
      title: "Practical Example: Count Odd Numbers",

      code: {
        language: "java",
        code: `int[] numbers = {10, 15, 20, 25, 30};

int count = 0;

for (int number : numbers) {

    if (number % 2 != 0) {
        count++;
    }
}

System.out.println(count);`
      },

      output: "2"
    },

    // =====================================================
    // 25. SECOND LARGEST
    // =====================================================
    {
      id: "second-largest",
      title: "Practical Example: Find Second Largest Element",

      paragraphs: [
        "Finding the second largest value is a common array interview problem.",
        "One approach is to maintain both the largest and second-largest values while traversing the array."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 50, 30, 40, 20};

int largest = Integer.MIN_VALUE;
int secondLargest = Integer.MIN_VALUE;

for (int number : numbers) {

    if (number > largest) {
        secondLargest = largest;
        largest = number;

    } else if (
        number > secondLargest &&
        number != largest
    ) {
        secondLargest = number;
    }
}

System.out.println(secondLargest);`
      },

      output: "40"
    },

    // =====================================================
    // 26. ARRAY OUT OF BOUNDS
    // =====================================================
    {
      id: "array-index-error",
      title: "ArrayIndexOutOfBoundsException",

      paragraphs: [
        "Java throws ArrayIndexOutOfBoundsException when we try to access an array using an invalid index.",
        "Valid indexes range from 0 to length - 1."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

System.out.println(numbers[3]);`
      },

      output:
        "ArrayIndexOutOfBoundsException"
    },

    // =====================================================
    // 27. CORRECT ARRAY INDEX
    // =====================================================
    {
      id: "correct-array-index",
      title: "Using a Valid Array Index",

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

System.out.println(numbers[2]);`
      },

      output: "30"
    },

    // =====================================================
    // 28. DEFAULT VALUES
    // =====================================================
    {
      id: "default-array-values",
      title: "Default Values in Arrays",

      paragraphs: [
        "When an array is created using new, its elements are automatically initialized with default values."
      ],

      bullets: [
        "int → 0",
        "long → 0L",
        "float → 0.0f",
        "double → 0.0",
        "char → \\u0000",
        "boolean → false",
        "Reference types → null"
      ],

      code: {
        language: "java",
        code: `int[] numbers = new int[3];

System.out.println(numbers[0]);
System.out.println(numbers[1]);
System.out.println(numbers[2]);`
      },

      output: `0
0
0`
    },

    // =====================================================
    // 29. ARRAY OF STRINGS
    // =====================================================
    {
      id: "string-array",
      title: "Array of Strings",

      paragraphs: [
        "Arrays can store reference types such as String."
      ],

      code: {
        language: "java",
        code: `String[] languages = {
    "Java",
    "Python",
    "JavaScript"
};

for (String language : languages) {
    System.out.println(language);
}`
      },

      output: `Java
Python
JavaScript`
    },

    // =====================================================
    // 30. PRACTICAL STUDENT EXAMPLE
    // =====================================================
    {
      id: "student-marks-example",
      title: "Practical Example: Student Marks",

      paragraphs: [
        "Let's combine array traversal, sum, maximum, and average calculations in one example."
      ],

      code: {
        language: "java",
        code: `int[] marks = {85, 90, 78, 92, 88};

int sum = 0;
int max = marks[0];

for (int mark : marks) {

    sum += mark;

    if (mark > max) {
        max = mark;
    }
}

double average =
        (double) sum / marks.length;

System.out.println("Sum: " + sum);
System.out.println("Average: " + average);
System.out.println("Highest: " + max);`
      },

      output: `Sum: 433
Average: 86.6
Highest: 92`
    },

    // =====================================================
    // 31. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when working with arrays."
      ],

      bullets: [
        "Forgetting that array indexing starts at 0.",
        "Trying to access an index equal to the array length.",
        "Assuming an array can grow automatically after creation.",
        "Using <= instead of < when traversing an array.",
        "Forgetting to initialize an array before accessing it.",
        "Confusing array length with String length().",
        "Using an enhanced for loop when the index is required for updating elements.",
        "Incorrectly handling an empty array when finding minimum or maximum values."
      ]
    },

    // =====================================================
    // 32. ARRAY LENGTH VS STRING LENGTH
    // =====================================================
    {
      id: "length-vs-length-method",
      title: "Array length vs String length()",

      paragraphs: [
        "Arrays use the length property, while String uses the length() method."
      ],

      code: {
        language: "java",
        code: `int[] numbers = {10, 20, 30};

String name = "Java";

System.out.println(numbers.length);
System.out.println(name.length());`
      },

      output: `3
4`
    },

    // =====================================================
    // 33. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "An array stores multiple values of the same data type.",
        "Java arrays use zero-based indexing.",
        "The first element is at index 0.",
        "The last element is at index length - 1.",
        "An array has a fixed length after creation.",
        "The length property returns the number of elements.",
        "A for loop is useful when the index is required.",
        "An enhanced for loop is useful for simple traversal.",
        "Array elements can be updated using their indexes.",
        "Searching can be performed using a loop.",
        "Minimum and maximum values can be found using a single traversal.",
        "Arrays can be reversed using two-pointer logic.",
        "Invalid indexes cause ArrayIndexOutOfBoundsException."
      ]
    },

    // =====================================================
    // 34. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Arrays: Interview Questions",

      interviewQuestions: [
        {
          question: "What is an array in Java?",
          answer:
            "An array is an object that stores a fixed number of values of the same type and allows those values to be accessed using indexes."
        },
        {
          question: "Does Java array indexing start from 0 or 1?",
          answer:
            "Java array indexing starts from 0. The first element is at index 0 and the last element is at index length - 1."
        },
        {
          question: "How do you find the length of an array?",
          answer:
            "Use the array's length property, for example: numbers.length."
        },
        {
          question: "Can the size of a Java array be changed after creation?",
          answer:
            "No. A Java array has a fixed length after it is created. If a different size is required, a new array must be created."
        },
        {
          question: "What happens when you access an invalid array index?",
          answer:
            "Java throws an ArrayIndexOutOfBoundsException when an index is outside the valid range."
        },
        {
          question: "What is the difference between a for loop and enhanced for loop when working with arrays?",
          answer:
            "A traditional for loop provides the index and is useful when elements need to be updated or positions are required. An enhanced for loop is simpler when only the values need to be read."
        },
        {
          question: "How do you search for an element in an array?",
          answer:
            "A simple approach is to traverse the array and compare each element with the target value. This is commonly called linear search."
        },
        {
          question: "How do you find the maximum value in an array?",
          answer:
            "Initialize max with the first element and traverse the remaining elements. Whenever a larger value is found, update max."
        },
        {
          question: "How do you reverse an array?",
          answer:
            "A common approach is to use two indexes, one at the beginning and one at the end, swap their values, and move both indexes toward the center."
        },
        {
          question: "What is the time complexity of linear search in an array?",
          answer:
            "Linear search has O(n) time complexity in the worst case because it may need to examine every element."
        },
        {
          question: "What is the time complexity of finding the minimum or maximum in an unsorted array?",
          answer:
            "Finding the minimum or maximum in an unsorted array requires checking all elements, so the time complexity is O(n)."
        },
        {
          question: "What are the default values of elements in a newly created int array?",
          answer:
            "The elements of a newly created int array are initialized to 0."
        }
      ]
    }
  ]
};