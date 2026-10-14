export const dataTypes = {
  id: "data-types",
  slug: "data-types",
  title: "Data Types in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn about primitive and non-primitive data types in Java, their sizes, ranges, default values, and how to use them in programs.",
  estimatedTime: "25 min",

  sections: [
    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Data Types",

      paragraphs: [
        "A data type specifies what kind of value a variable can store.",
        "When we create a variable in Java, we must specify its data type. The data type tells Java what type of data the variable will contain and how that data should be handled.",
        "For example, an integer variable can store whole numbers, while a double variable can store decimal values."
      ],

      code: {
        language: "java",
        code: `int age = 25;
double salary = 45000.50;
char grade = 'A';
boolean isActive = true;`
      },

      output:
        "age stores 25\nsalary stores 45000.50\ngrade stores A\nisActive stores true",

      bullets: [
        "int is used for whole numbers.",
        "double is commonly used for decimal numbers.",
        "char is used for a single character.",
        "boolean stores true or false."
      ]
    },

    // =====================================================
    // 2. TYPES OF DATA TYPES
    // =====================================================
    {
      id: "types-of-data-types",
      title: "Types of Data Types in Java",

      paragraphs: [
        "Java data types are mainly divided into two categories: Primitive Data Types and Non-Primitive Data Types.",
        "Primitive data types are built into the Java language. Non-primitive data types are reference types that refer to objects."
      ],

      bullets: [
        "Primitive Data Types",
        "Non-Primitive Data Types"
      ]
    },

    // =====================================================
    // 3. PRIMITIVE DATA TYPES
    // =====================================================
    {
      id: "primitive-data-types",
      title: "Primitive Data Types",

      paragraphs: [
        "Primitive data types are the basic data types provided by Java.",
        "Java has eight primitive data types: byte, short, int, long, float, double, char, and boolean."
      ],

      bullets: [
        "byte",
        "short",
        "int",
        "long",
        "float",
        "double",
        "char",
        "boolean"
      ]
    },

    // =====================================================
    // 4. BYTE
    // =====================================================
    {
      id: "byte",
      title: "1. byte",

      paragraphs: [
        "The byte data type is an 8-bit signed integer.",
        "It can store small whole numbers and requires only 1 byte of memory."
      ],

      bullets: [
        "Size: 8 bits or 1 byte",
        "Range: -128 to 127",
        "Default value: 0",
        "Used when memory optimization is important."
      ],

      code: {
        language: "java",
        code: `byte age = 25;
byte temperature = -10;

System.out.println(age);
System.out.println(temperature);`
      },

      output: `25
-10`
    },

    // =====================================================
    // 5. SHORT
    // =====================================================
    {
      id: "short",
      title: "2. short",

      paragraphs: [
        "The short data type is a 16-bit signed integer.",
        "It can store a larger range of whole numbers than byte."
      ],

      bullets: [
        "Size: 16 bits or 2 bytes",
        "Range: -32,768 to 32,767",
        "Default value: 0"
      ],

      code: {
        language: "java",
        code: `short marks = 25000;

System.out.println(marks);`
      },

      output: "25000"
    },

    // =====================================================
    // 6. INT
    // =====================================================
    {
      id: "int",
      title: "3. int",

      paragraphs: [
        "The int data type is a 32-bit signed integer.",
        "It is the most commonly used data type for storing whole numbers in Java."
      ],

      bullets: [
        "Size: 32 bits or 4 bytes",
        "Range: -2,147,483,648 to 2,147,483,647",
        "Default value: 0",
        "Commonly used for counting, IDs, marks, age, and other whole numbers."
      ],

      code: {
        language: "java",
        code: `int age = 25;
int salary = 50000;

System.out.println(age);
System.out.println(salary);`
      },

      output: `25
50000`
    },

    // =====================================================
    // 7. LONG
    // =====================================================
    {
      id: "long",
      title: "4. long",

      paragraphs: [
        "The long data type is a 64-bit signed integer.",
        "It is used when an int is not large enough to store the required whole number."
      ],

      bullets: [
        "Size: 64 bits or 8 bytes",
        "Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807",
        "Default value: 0L"
      ],

      code: {
        language: "java",
        code: `long population = 8000000000L;

System.out.println(population);`
      },

      output: "8000000000"
    },

    // =====================================================
    // 8. FLOAT
    // =====================================================
    {
      id: "float",
      title: "5. float",

      paragraphs: [
        "The float data type is used to store decimal numbers with single precision.",
        "A float value must normally have an f or F suffix when assigned directly."
      ],

      bullets: [
        "Size: 32 bits or 4 bytes",
        "Single-precision floating-point value",
        "Default value: 0.0f",
        "Use f or F when assigning a decimal literal."
      ],

      code: {
        language: "java",
        code: `float price = 99.50f;

System.out.println(price);`
      },

      output: "99.5"
    },

    // =====================================================
    // 9. DOUBLE
    // =====================================================
    {
      id: "double",
      title: "6. double",

      paragraphs: [
        "The double data type is used to store decimal numbers with double precision.",
        "It provides more precision than float and is the default type for decimal literals in Java."
      ],

      bullets: [
        "Size: 64 bits or 8 bytes",
        "Double-precision floating-point value",
        "Default value: 0.0",
        "More precise than float for most general-purpose decimal calculations."
      ],

      code: {
        language: "java",
        code: `double salary = 45000.75;

System.out.println(salary);`
      },

      output: "45000.75"
    },

    // =====================================================
    // 10. CHAR
    // =====================================================
    {
      id: "char",
      title: "7. char",

      paragraphs: [
        "The char data type is used to store a single 16-bit Unicode character.",
        "A char value is written using single quotes."
      ],

      bullets: [
        "Size: 16 bits or 2 bytes",
        "Stores a single character",
        "Uses single quotes",
        "Supports Unicode characters."
      ],

      code: {
        language: "java",
        code: `char grade = 'A';
char firstLetter = 'J';

System.out.println(grade);
System.out.println(firstLetter);`
      },

      output: `A
J`
    },

    // =====================================================
    // 11. BOOLEAN
    // =====================================================
    {
      id: "boolean",
      title: "8. boolean",

      paragraphs: [
        "The boolean data type stores one of two values: true or false.",
        "It is commonly used in conditions, decision-making, and flags."
      ],

      bullets: [
        "Possible values: true or false",
        "Default value for a field: false",
        "Commonly used with if, while, and other conditional statements."
      ],

      code: {
        language: "java",
        code: `boolean isLoggedIn = true;
boolean isAdmin = false;

System.out.println(isLoggedIn);
System.out.println(isAdmin);`
      },

      output: `true
false`
    },

    // =====================================================
    // 12. PRIMITIVE SUMMARY
    // =====================================================
    {
      id: "primitive-summary",
      title: "Primitive Data Types Summary",

      paragraphs: [
        "The following table summarizes the eight primitive data types in Java."
      ],

      bullets: [
        "byte → 8-bit integer",
        "short → 16-bit integer",
        "int → 32-bit integer",
        "long → 64-bit integer",
        "float → 32-bit decimal",
        "double → 64-bit decimal",
        "char → 16-bit Unicode character",
        "boolean → true or false"
      ]
    },

    // =====================================================
    // 13. NON-PRIMITIVE DATA TYPES
    // =====================================================
    {
      id: "non-primitive-data-types",
      title: "Non-Primitive Data Types",

      paragraphs: [
        "Non-primitive data types are also called reference types.",
        "They are used to refer to objects rather than directly storing a primitive value.",
        "Examples include String, arrays, classes, interfaces, and enums."
      ],

      bullets: [
        "String",
        "Arrays",
        "Classes",
        "Interfaces",
        "Enums",
        "Objects"
      ],

      code: {
        language: "java",
        code: `String name = "Venkatesh";

int[] numbers = {10, 20, 30};

System.out.println(name);
System.out.println(numbers[0]);`
      },

      output: `Venkatesh
10`
    },

    // =====================================================
    // 14. PRIMITIVE VS NON-PRIMITIVE
    // =====================================================
    {
      id: "primitive-vs-non-primitive",
      title: "Primitive vs Non-Primitive Data Types",

      paragraphs: [
        "Primitive and non-primitive data types are different in how they represent and work with data.",
        "Primitive types are built into Java, while non-primitive types are reference types such as classes, arrays, and String."
      ],

      bullets: [
        "Primitive types are built into Java.",
        "Non-primitive types are reference types.",
        "Primitive types have predefined values and sizes.",
        "Non-primitive types can represent objects and collections of data.",
        "Primitive variables directly represent primitive values.",
        "Reference variables refer to objects."
      ]
    },

    // =====================================================
    // 15. TYPE CASTING
    // =====================================================
    {
      id: "type-casting",
      title: "Type Casting",

      paragraphs: [
        "Type casting means converting a value from one data type to another data type.",
        "Java supports widening casting and narrowing casting."
      ]
    },

    // =====================================================
    // 16. WIDENING CASTING
    // =====================================================
    {
      id: "widening-casting",
      title: "Widening Casting",

      paragraphs: [
        "Widening casting happens when a smaller data type is converted into a larger compatible data type.",
        "This conversion is generally performed automatically by Java."
      ],

      bullets: [
        "byte → short",
        "short → int",
        "int → long",
        "int → float",
        "float → double"
      ],

      code: {
        language: "java",
        code: `int number = 100;

long largeNumber = number;

System.out.println(largeNumber);`
      },

      output: "100"
    },

    // =====================================================
    // 17. NARROWING CASTING
    // =====================================================
    {
      id: "narrowing-casting",
      title: "Narrowing Casting",

      paragraphs: [
        "Narrowing casting happens when a larger data type is converted into a smaller compatible data type.",
        "This conversion must normally be performed explicitly using a cast."
      ],

      code: {
        language: "java",
        code: `double price = 99.99;

int wholePrice = (int) price;

System.out.println(wholePrice);`
      },

      output: "99"
    },

    // =====================================================
    // 18. DATA TYPE EXAMPLE
    // =====================================================
    {
      id: "practical-example",
      title: "Practical Example",

      paragraphs: [
        "Let's use different data types together in a simple student example."
      ],

      code: {
        language: "java",
        code: `public class Student {

    public static void main(String[] args) {

        String name = "Rahul";
        int age = 21;
        double percentage = 85.5;
        char grade = 'A';
        boolean passed = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Percentage: " + percentage);
        System.out.println("Grade: " + grade);
        System.out.println("Passed: " + passed);
    }
}`
      },

      output: `Name: Rahul
Age: 21
Percentage: 85.5
Grade: A
Passed: true`
    },

    // =====================================================
    // 19. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when assigning values to different data types."
      ],

      bullets: [
        "Assigning a decimal value to an int without conversion.",
        "Forgetting the f suffix when assigning a float literal.",
        "Using double quotes for a char instead of single quotes.",
        "Using single quotes for a String.",
        "Trying to store a value outside the range of a data type.",
        "Using a larger value in a smaller data type without explicit casting."
      ]
    },

    // =====================================================
    // 20. COMMON MISTAKE EXAMPLE
    // =====================================================
    {
      id: "common-mistake-example",
      title: "Example of a Common Mistake",

      paragraphs: [
        "The following code causes a compilation error because 10.5 is a double literal and cannot be directly assigned to an int."
      ],

      code: {
        language: "java",
        code: `int number = 10.5;`
      },

      output:
        "Compilation error: incompatible types: possible lossy conversion from double to int"
    },

    // =====================================================
    // 21. CORRECT VERSION
    // =====================================================
    {
      id: "correct-version",
      title: "Correct Version",

      paragraphs: [
        "If you want to store the decimal value, use a suitable decimal data type such as double."
      ],

      code: {
        language: "java",
        code: `double number = 10.5;

System.out.println(number);`
      },

      output: "10.5"
    },

    // =====================================================
    // 22. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Java has eight primitive data types.",
        "The primitive types are byte, short, int, long, float, double, char, and boolean.",
        "int is commonly used for whole numbers.",
        "double is commonly used for decimal numbers.",
        "char stores a single character.",
        "boolean stores true or false.",
        "String and arrays are non-primitive reference types.",
        "Widening conversion is generally automatic.",
        "Narrowing conversion normally requires explicit casting.",
        "Choosing the correct data type helps write clear and reliable programs."
      ]
    },

    // =====================================================
    // 23. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Data Types: Interview Questions",

      interviewQuestions: [
        {
          question: "How many primitive data types are available in Java?",
          answer:
            "Java has eight primitive data types: byte, short, int, long, float, double, char, and boolean."
        },
        {
          question: "What is the difference between int and long?",
          answer:
            "int is a 32-bit signed integer, while long is a 64-bit signed integer and can store a much larger range of whole numbers."
        },
        {
          question: "What is the difference between float and double?",
          answer:
            "float is a 32-bit single-precision floating-point type, while double is a 64-bit double-precision type and provides more precision."
        },
        {
          question: "Why do we use f after a float value?",
          answer:
            "Decimal literals are treated as double by default in Java. The f suffix tells Java that the literal should be treated as a float."
        },
        {
          question: "What is the difference between char and String?",
          answer:
            "char stores a single character using single quotes, while String represents a sequence of characters and is written using double quotes."
        },
        {
          question: "What are non-primitive data types?",
          answer:
            "Non-primitive data types are reference types that refer to objects. Examples include String, arrays, classes, interfaces, and enums."
        },
        {
          question: "What is type casting in Java?",
          answer:
            "Type casting is the conversion of a value from one data type to another compatible data type."
        },
        {
          question: "What is widening casting?",
          answer:
            "Widening casting converts a smaller compatible data type into a larger one, such as int to long. Java generally performs this conversion automatically."
        },
        {
          question: "What is narrowing casting?",
          answer:
            "Narrowing casting converts a larger data type into a smaller compatible type, such as double to int. It normally requires explicit casting."
        },
        {
          question: "Which data type is commonly used for whole numbers in Java?",
          answer:
            "int is the commonly used data type for whole numbers when the value fits within its range."
        }
      ]
    }
  ]
};