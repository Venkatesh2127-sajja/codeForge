export const variables = {
  id: "variables",

  slug: "variables",
  title: "Variables in Java",

  topicTitle: "Java Basics",

  topicSlug: "basics",

  description:
    "Learn what variables are, how to declare and initialize them, different types of variables, naming rules, constants, and common mistakes.",

  estimatedTime: "20 min",

  sections: [
    {
      id: "what-is-variable",

      title: "What is a Variable?",

      paragraphs: [
        "A variable is a named location used to store a value in a Java program.",

        "Every variable in Java has a data type, a name, and a value. The data type determines what kind of value the variable can store.",

        "For example, an int variable can store whole numbers, while a String variable can store text."
      ],

      code: {
        language: "java",

        code: `int age = 25;
String name = "John";
double salary = 45000.50;`
      }
    },

    {
      id: "why-variables",

      title: "Why Do We Need Variables?",

      paragraphs: [
        "Variables allow a program to store information and use that information later.",

        "Instead of repeatedly writing the same value, we can store it in a variable and refer to the variable by its name.",

        "Variables also allow values to change while a program is running."
      ],

      code: {
        language: "java",

        code: `int price = 100;
int quantity = 3;

int total = price * quantity;

System.out.println(total);`
      },

      output: `300`
    },

    {
      id: "variable-syntax",

      title: "Variable Syntax",

      paragraphs: [
        "The general syntax for declaring a variable is:"
      ],

      code: {
        language: "java",

        code: `dataType variableName;`
      },

      paragraphsAfterCode: [
        "For example, the following statement declares an integer variable named age."
      ],

      codeExamples: [
        {
          language: "java",

          code: `int age;`
        }
      ]
    },

    {
      id: "declaration",

      title: "Variable Declaration",

      paragraphs: [
        "Declaration means specifying the data type and name of a variable without assigning a value to it."
      ],

      code: {
        language: "java",

        code: `int age;
double salary;
String name;
boolean active;`
      },

      paragraphsAfterCode: [
        "Here, the variables have been declared, but no values have been assigned to them."
      ]
    },

    {
      id: "initialization",

      title: "Variable Initialization",

      paragraphs: [
        "Initialization means assigning an initial value to a variable."
      ],

      code: {
        language: "java",

        code: `int age = 25;
double salary = 45000.50;
String name = "John";
boolean active = true;`
      }
    },

    {
      id: "declaration-initialization",

      title: "Declaration and Initialization Together",

      paragraphs: [
        "In most cases, we declare and initialize a variable in the same statement."
      ],

      code: {
        language: "java",

        code: `int age = 25;

System.out.println(age);`
      },

      output: `25`
    },

    {
      id: "changing-value",

      title: "Changing the Value of a Variable",

      paragraphs: [
        "A variable can usually be assigned a new value after it has been initialized.",

        "The new value must be compatible with the variable's data type."
      ],

      code: {
        language: "java",

        code: `int age = 25;

System.out.println(age);

age = 26;

System.out.println(age);`
      },

      output: `25
26`
    },

    {
      id: "data-type-example",

      title: "Variables with Different Data Types",

      paragraphs: [
        "Java provides different data types for storing different kinds of values."
      ],

      code: {
        language: "java",

        code: `int age = 25;

long population = 1400000000L;

double price = 99.99;

char grade = 'A';

boolean passed = true;

String name = "John";`
      }
    },

    {
      id: "local-variable",

      title: "Local Variables",

      paragraphs: [
        "A local variable is declared inside a method, constructor, or block.",

        "A local variable can be accessed only within the scope where it is declared.",

        "Local variables do not automatically receive a default value. They must be initialized before they are read."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        int age = 25;

        System.out.println(age);
    }
}`
      },

      output: `25`
    },

    {
      id: "instance-variable",

      title: "Instance Variables",

      paragraphs: [
        "An instance variable is declared inside a class but outside methods, constructors, and blocks.",

        "Each object of the class has its own copy of instance variables.",

        "Instance variables receive default values if they are not explicitly initialized."
      ],

      code: {
        language: "java",

        code: `class Student {

    String name;
    int age;
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
      },

      output: `null
0`
    },

    {
      id: "static-variable",

      title: "Static Variables",

      paragraphs: [
        "A static variable belongs to the class rather than to a particular object.",

        "Only one shared copy of a static variable exists for a class."
      ],

      code: {
        language: "java",

        code: `class Student {

    static String college = "ABC College";
}

public class Main {

    public static void main(String[] args) {

        System.out.println(Student.college);
    }
}`
      },

      output: `ABC College`
    },

    {
      id: "variable-scope",

      title: "Variable Scope",

      paragraphs: [
        "Scope determines where a variable can be accessed in a program.",

        "A variable declared inside a method is normally accessible only inside that method or its nested blocks.",

        "A variable declared as an instance field can be accessed through an object, subject to its access modifier."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        int number = 10;

        if (number > 5) {

            int result = 20;

            System.out.println(result);
        }

        System.out.println(number);
    }
}`
      },

      output: `20
10`
    },

    {
      id: "naming-rules",

      title: "Variable Naming Rules",

      paragraphs: [
        "Java has rules that variable names must follow.",

        "A variable name can contain letters, digits, underscore and dollar sign, but it cannot start with a digit.",

        "Java keywords such as class, int, public and static cannot be used as variable names."
      ],

      code: {
        language: "java",

        code: `int age;
int studentAge;
int student_age;
int $price;
int number1;`
      }
    },

    {
      id: "naming-convention",

      title: "Variable Naming Convention",

      paragraphs: [
        "Although Java allows several forms of variable names, Java developers commonly use camelCase for variables and methods.",

        "Meaningful names make programs easier to read and maintain."
      ],

      code: {
        language: "java",

        code: `int studentAge;

String studentName;

double monthlySalary;

boolean accountActive;`
      }
    },

    {
      id: "invalid-names",

      title: "Invalid Variable Names",

      paragraphs: [
        "The following examples are invalid because they violate Java's identifier rules."
      ],

      code: {
        language: "java",

        code: `int 1age;        // Cannot start with a digit

int class;        // class is a keyword

int student-name; // Hyphen is not allowed`
      }
    },

    {
      id: "constants",

      title: "Constants using final",

      paragraphs: [
        "If a value should not be changed after initialization, we can use the final keyword.",

        "A variable declared with final can be assigned only once."
      ],

      code: {
        language: "java",

        code: `final double PI = 3.14159;

System.out.println(PI);`
      },

      output: `3.14159`
    },

    {
      id: "constant-change-error",

      title: "Trying to Change a Constant",

      paragraphs: [
        "Once a final variable has been initialized, assigning another value to it causes a compilation error."
      ],

      code: {
        language: "java",

        code: `final int MAX_USERS = 100;

MAX_USERS = 200;`
      }
    },

    {
      id: "practical-example",

      title: "Practical Example",

      paragraphs: [
        "Let's combine several variables to represent information about a bank account."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        String accountHolder = "John";

        int accountNumber = 1001;

        double balance = 25000.50;

        boolean active = true;

        System.out.println(accountHolder);
        System.out.println(accountNumber);
        System.out.println(balance);
        System.out.println(active);
    }
}`
      },

      output: `John
1001
25000.5
true`
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when declaring and using variables."
      ],

      bullets: [
        "Using a local variable before initializing it.",
        "Using an invalid variable name.",
        "Trying to assign a value of an incompatible data type.",
        "Using unclear variable names.",
        "Trying to change a final variable.",
        "Confusing instance variables with local variables.",
        "Using a variable outside its scope."
      ]
    },

    {
      id: "common-mistake-example",

      title: "Example of a Common Mistake",

      paragraphs: [
        "The following local variable is declared but not initialized before it is used."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        int age;

        System.out.println(age);
    }
}`
      }
    },

    {
      id: "correct-example",

      title: "Correct Version",

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        int age = 25;

        System.out.println(age);
    }
}`
      },

      output: `25`
    },

    {
      id: "key-points",

      title: "Key Points",

      bullets: [
        "A variable stores a value that can be used by a program.",
        "Every Java variable has a data type and a name.",
        "Declaration specifies the variable's type and name.",
        "Initialization assigns an initial value.",
        "A variable can usually be reassigned unless it is final.",
        "Local variables must be initialized before they are read.",
        "Instance variables belong to objects.",
        "Static variables belong to the class.",
        "Variable names should follow Java naming rules and conventions.",
        "Use final when a variable should not be reassigned."
      ]
    },

    {
      id: "interview-questions",

      title: "Java Variables: Interview Questions",

      interviewQuestions: [
        {
          question: "What is a variable in Java?",

          answer:
            "A variable is a named storage location used to hold a value. Every variable has a data type that determines what kind of value it can store."
        },

        {
          question: "What is the difference between declaration and initialization?",

          answer:
            "Declaration specifies the variable's data type and name, while initialization assigns a value to the variable."
        },

        {
          question: "What are the types of variables in Java?",

          answer:
            "The commonly discussed types are local variables, instance variables and static variables."
        },

        {
          question: "What is a local variable?",

          answer:
            "A local variable is declared inside a method, constructor or block and is accessible within its scope."
        },

        {
          question: "What is an instance variable?",

          answer:
            "An instance variable is a non-static field declared inside a class. Each object normally has its own copy."
        },

        {
          question: "What is a static variable?",

          answer:
            "A static variable belongs to the class rather than an individual object, so the class has a shared copy."
        },

        {
          question: "Can the value of a final variable be changed?",

          answer:
            "A final variable cannot be reassigned after it has been initialized."
        },

        {
          question: "What happens if a local variable is used before initialization?",

          answer:
            "The Java compiler reports an error because local variables do not receive automatic default values."
        },

        {
          question: "What is variable scope?",

          answer:
            "Variable scope is the region of a program where a variable can be accessed."
        },

        {
          question: "What naming convention is commonly used for Java variables?",

          answer:
            "Java commonly uses camelCase for variable names, such as studentName and monthlySalary."
        }
      ]
    }
  ]
};