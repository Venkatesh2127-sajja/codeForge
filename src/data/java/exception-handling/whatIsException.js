export const whatIsException = {
  id: "what-is-exception",
  slug: "what-is-exception",
  title: "What is an Exception?",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Understand what exceptions are, why they occur, how Java represents exceptions, the role of the JVM, stack traces, common exceptions, and the basics of exception handling.",
  estimatedTime: "35 min",

  sections: [
    // =========================================================
    // 1. INTRODUCTION
    // =========================================================

    {
      id: "introduction",
      title: "Introduction to Exceptions",

      paragraphs: [
        "An exception is an unexpected event that occurs during the execution of a program and interrupts the normal flow of execution.",
        "Java provides a mechanism called exception handling to detect, handle, and recover from many exceptional situations.",
        "For example, dividing an integer by zero, accessing an invalid array index, or trying to use a null reference can cause an exception."
      ],

      bullets: [
        "An exception is an exceptional condition during program execution.",
        "An exception can interrupt the normal flow of a program.",
        "Java represents exceptions as objects.",
        "Exception handling allows applications to respond to exceptional situations.",
        "Java provides try, catch, finally, throw, and throws for exception handling."
      ]
    },

    // =========================================================
    // 2. SIMPLE EXCEPTION EXAMPLE
    // =========================================================

    {
      id: "simple-exception",
      title: "Simple Exception Example",

      paragraphs: [
        "Consider a program that attempts to divide an integer by zero.",
        "Integer division by zero is not a valid arithmetic operation, so Java throws an ArithmeticException."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int number = 10;
        int divisor = 0;

        int result = number / divisor;

        System.out.println(result);
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.ArithmeticException: / by zero`
    },

    // =========================================================
    // 3. WHAT HAPPENS WHEN AN EXCEPTION OCCURS
    // =========================================================

    {
      id: "exception-flow",
      title: "What Happens When an Exception Occurs?",

      paragraphs: [
        "When an exception occurs, Java creates an exception object containing information about the exceptional condition.",
        "The JVM then looks for code that can handle the exception.",
        "If the exception is not handled in the current method, it can propagate to the caller method.",
        "If nobody handles the exception, the JVM terminates the current program and prints information about the exception."
      ],

      bullets: [
        "An exceptional condition occurs.",
        "Java creates an exception object.",
        "The current method looks for a suitable handler.",
        "If no handler is found, the exception propagates to the caller.",
        "Propagation continues until a handler is found or the call stack is exhausted.",
        "If the exception remains unhandled, the JVM terminates the program."
      ]
    },

    // =========================================================
    // 4. EXCEPTION AS AN OBJECT
    // =========================================================

    {
      id: "exception-object",
      title: "Exceptions Are Objects",

      paragraphs: [
        "In Java, exceptions are objects.",
        "Exception classes are part of Java's class hierarchy and ultimately derive from Throwable.",
        "Because exceptions are objects, they contain information and methods that can be used to understand the problem."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

        } catch (ArithmeticException exception) {

            System.out.println(
                exception.getClass().getName()
            );
        }
    }
}`
      },

      output: "java.lang.ArithmeticException"
    },

    // =========================================================
    // 5. EXCEPTION CLASS
    // =========================================================

    {
      id: "exception-class",
      title: "The Exception Class",

      paragraphs: [
        "Java provides the java.lang.Exception class as an important part of the exception hierarchy.",
        "Many application-level exceptional conditions are represented by classes that extend Exception directly or indirectly.",
        "RuntimeException is a subclass of Exception and is the parent of many unchecked exceptions."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Exception exception =
            new Exception("Something went wrong");

        System.out.println(
            exception.getMessage()
        );
    }
}`
      },

      output: "Something went wrong"
    },

    // =========================================================
    // 6. THROWABLE
    // =========================================================

    {
      id: "throwable",
      title: "What is Throwable?",

      paragraphs: [
        "Throwable is the root type for objects that can be thrown by Java's exception mechanism.",
        "The two major branches under Throwable are Error and Exception.",
        "Application code generally handles exceptions, while serious JVM or system-level errors are normally not treated as ordinary application exceptions."
      ],

      code: {
        language: "text",
        code: `Object
   |
   +-- Throwable
         |
         +-- Error
         |
         +-- Exception
               |
               +-- RuntimeException`
      },

      bullets: [
        "Throwable is the root of Java's throwable hierarchy.",
        "Error represents serious problems generally outside normal application recovery.",
        "Exception represents conditions that applications can often handle.",
        "RuntimeException is a subclass of Exception."
      ]
    },

    // =========================================================
    // 7. EXCEPTION VS ERROR
    // =========================================================

    {
      id: "exception-vs-error",
      title: "Exception vs Error",

      paragraphs: [
        "Both Error and Exception extend Throwable, but they represent different categories of problems.",
        "Exceptions commonly represent conditions that application code may be able to handle.",
        "Errors generally indicate serious problems involving the JVM or runtime environment."
      ],

      bullets: [
        "Exception generally represents an exceptional application condition.",
        "Error generally represents a serious JVM or runtime problem.",
        "NullPointerException is an Exception.",
        "ArithmeticException is an Exception.",
        "OutOfMemoryError is an Error.",
        "StackOverflowError is an Error.",
        "Application code normally should not try to recover from every Error."
      ]
    },

    // =========================================================
    // 8. RUNTIME EXCEPTION
    // =========================================================

    {
      id: "runtime-exception",
      title: "What is RuntimeException?",

      paragraphs: [
        "RuntimeException is a subclass of Exception.",
        "Exceptions that extend RuntimeException are called unchecked exceptions because the compiler does not require them to be caught or declared with throws.",
        "They commonly result from programming mistakes or invalid operations at runtime."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String name = null;

        System.out.println(name.length());
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.NullPointerException`,

      bullets: [
        "RuntimeException extends Exception.",
        "Runtime exceptions are unchecked.",
        "The compiler does not force catch or throws for RuntimeException subclasses.",
        "Common examples include NullPointerException and ArithmeticException."
      ]
    },

    // =========================================================
    // 9. COMMON EXCEPTIONS
    // =========================================================

    {
      id: "common-exceptions",
      title: "Common Java Exceptions",

      paragraphs: [
        "Java provides many predefined exception classes. Understanding the common ones is important for both development and interviews."
      ],

      bullets: [
        "ArithmeticException → invalid arithmetic operation such as integer division by zero.",
        "NullPointerException → attempting to use a null reference in an invalid way.",
        "ArrayIndexOutOfBoundsException → accessing an array using an invalid index.",
        "StringIndexOutOfBoundsException → accessing an invalid position in a String.",
        "NumberFormatException → converting an invalid String to a numeric type.",
        "ClassCastException → invalid runtime type casting.",
        "IllegalArgumentException → a method receives an inappropriate argument.",
        "IllegalStateException → a method is called when the object's state does not permit that operation."
      ]
    },

    // =========================================================
    // 10. ARITHMETIC EXCEPTION
    // =========================================================

    {
      id: "arithmetic-exception",
      title: "ArithmeticException",

      paragraphs: [
        "ArithmeticException is a runtime exception that occurs when an invalid arithmetic operation is performed.",
        "A common example is integer division by zero."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 0;

        System.out.println(a / b);
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.ArithmeticException: / by zero`
    },

    // =========================================================
    // 11. NULL POINTER EXCEPTION
    // =========================================================

    {
      id: "null-pointer-exception",
      title: "NullPointerException",

      paragraphs: [
        "NullPointerException occurs when code attempts to perform an operation on a null reference that requires an actual object.",
        "It is one of the most common runtime exceptions in Java applications."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String name = null;

        System.out.println(name.length());
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.NullPointerException`
    },

    // =========================================================
    // 12. ARRAY INDEX EXCEPTION
    // =========================================================

    {
      id: "array-index-exception",
      title: "ArrayIndexOutOfBoundsException",

      paragraphs: [
        "ArrayIndexOutOfBoundsException occurs when an array is accessed using an index outside its valid range.",
        "For an array of length 3, valid indexes are 0, 1, and 2."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int[] numbers = {
            10,
            20,
            30
        };

        System.out.println(numbers[3]);
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException`
    },

    // =========================================================
    // 13. NUMBER FORMAT EXCEPTION
    // =========================================================

    {
      id: "number-format-exception",
      title: "NumberFormatException",

      paragraphs: [
        "NumberFormatException occurs when a String cannot be converted into the requested numeric type."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String value = "abc";

        int number = Integer.parseInt(value);

        System.out.println(number);
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.NumberFormatException`
    },

    // =========================================================
    // 14. CLASS CAST EXCEPTION
    // =========================================================

    {
      id: "class-cast-exception",
      title: "ClassCastException",

      paragraphs: [
        "ClassCastException occurs when an object is cast to an incompatible type at runtime."
      ],

      code: {
        language: "java",
        code: `class Animal {
}

class Dog extends Animal {
}

class Cat extends Animal {
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        Cat cat = (Cat) animal;

        System.out.println(cat);
    }
}`
      },

      output:
        `Exception in thread "main" java.lang.ClassCastException`
    },

    // =========================================================
    // 15. GET MESSAGE
    // =========================================================

    {
      id: "get-message",
      title: "Getting the Exception Message",

      paragraphs: [
        "The getMessage() method returns the detail message associated with an exception.",
        "It is useful when we want to display or log a concise explanation of what went wrong."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

        } catch (ArithmeticException exception) {

            System.out.println(
                exception.getMessage()
            );
        }
    }
}`
      },

      output: "/ by zero"
    },

    // =========================================================
    // 16. TOSTRING
    // =========================================================

    {
      id: "to-string",
      title: "Using toString()",

      paragraphs: [
        "The toString() method returns a String representation of the exception object.",
        "It normally contains the exception class name and its message."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

        } catch (ArithmeticException exception) {

            System.out.println(
                exception.toString()
            );
        }
    }
}`
      },

      output:
        "java.lang.ArithmeticException: / by zero"
    },

    // =========================================================
    // 17. PRINT STACK TRACE
    // =========================================================

    {
      id: "print-stack-trace",
      title: "Using printStackTrace()",

      paragraphs: [
        "The printStackTrace() method prints information about the exception and the sequence of method calls that led to it.",
        "Stack traces are particularly useful when debugging and diagnosing problems."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

        } catch (ArithmeticException exception) {

            exception.printStackTrace();
        }
    }
}`
      },

      output: `java.lang.ArithmeticException: / by zero
    at Main.main(Main.java:7)`
    },

    // =========================================================
    // 18. STACK TRACE
    // =========================================================

    {
      id: "stack-trace",
      title: "What is a Stack Trace?",

      paragraphs: [
        "A stack trace shows the sequence of method calls that were active when an exception occurred.",
        "It helps developers identify where the exception originated and how execution reached that point."
      ],

      code: {
        language: "java",
        code: `public class Main {

    static void methodA() {

        methodB();
    }

    static void methodB() {

        methodC();
    }

    static void methodC() {

        int result = 10 / 0;

        System.out.println(result);
    }

    public static void main(String[] args) {

        methodA();
    }
}`
      },

      output: `java.lang.ArithmeticException: / by zero
    at Main.methodC(Main.java:15)
    at Main.methodB(Main.java:10)
    at Main.methodA(Main.java:6)
    at Main.main(Main.java:21)`
    },

    // =========================================================
    // 19. COMPILE-TIME ERROR VS EXCEPTION
    // =========================================================

    {
      id: "compile-time-vs-exception",
      title: "Compile-Time Error vs Exception",

      paragraphs: [
        "A compile-time error is detected by the compiler before the program successfully runs.",
        "An exception generally occurs while the program is executing.",
        "Understanding this difference is important because exception handling is designed primarily for exceptional conditions during execution."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int number = "Java";

        System.out.println(number);
    }
}`
      },

      bullets: [
        "Compile-time error → detected during compilation.",
        "Exception → generally occurs during program execution.",
        "Syntax errors are compile-time problems.",
        "Type incompatibility can produce compile-time errors.",
        "Integer division by zero causes a runtime exception.",
        "Null reference access can produce a runtime exception."
      ]
    },

    // =========================================================
    // 20. EXCEPTION VS NORMAL FLOW
    // =========================================================

    {
      id: "exception-vs-normal-flow",
      title: "Exception vs Normal Program Flow",

      paragraphs: [
        "Normally, a method executes statements sequentially and returns normally.",
        "When an exception occurs, normal execution of the current flow is interrupted and Java searches for an appropriate exception handler."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        System.out.println("Statement 1");

        try {

            System.out.println("Statement 2");

            int result = 10 / 0;

            System.out.println("Statement 3");

        } catch (ArithmeticException exception) {

            System.out.println(
                "Exception handled"
            );
        }

        System.out.println("Statement 4");
    }
}`
      },

      output: `Statement 1
Statement 2
Exception handled
Statement 4`
    },

    // =========================================================
    // 21. BASIC EXCEPTION HANDLING PREVIEW
    // =========================================================

    {
      id: "exception-handling-preview",
      title: "Basic Exception Handling Preview",

      paragraphs: [
        "Java provides try and catch blocks to handle exceptions.",
        "The risky code is placed inside try, while the code that handles a particular exception is placed inside catch.",
        "The detailed try-catch mechanism will be covered in the next lesson."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

            System.out.println(result);

        } catch (ArithmeticException exception) {

            System.out.println(
                "Cannot divide by zero"
            );
        }
    }
}`
      },

      output: "Cannot divide by zero"
    },

    // =========================================================
    // 22. COMMON MISTAKES
    // =========================================================

    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Understanding what an exception is is only the first step. Developers should also avoid common mistakes when diagnosing and handling exceptions."
      ],

      bullets: [
        "Confusing compile-time errors with runtime exceptions.",
        "Thinking every Throwable should be caught.",
        "Using Exception everywhere instead of handling specific exceptions when appropriate.",
        "Ignoring exception messages and stack traces while debugging.",
        "Catching an exception and silently doing nothing.",
        "Using exceptions for normal program control flow.",
        "Assuming all runtime problems are checked exceptions.",
        "Confusing Error with Exception.",
        "Ignoring the root cause of an exception.",
        "Logging an exception without enough context."
      ]
    },

    // =========================================================
    // 23. KEY POINTS
    // =========================================================

    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "An exception is an event that disrupts the normal flow of program execution.",
        "Java represents exceptions as objects.",
        "Throwable is the root type of Java's throwable hierarchy.",
        "Throwable has two major branches: Error and Exception.",
        "RuntimeException is a subclass of Exception.",
        "RuntimeException and its subclasses are unchecked exceptions.",
        "ArithmeticException occurs for invalid arithmetic operations such as integer division by zero.",
        "NullPointerException occurs when code improperly uses a null reference.",
        "ArrayIndexOutOfBoundsException occurs when an invalid array index is accessed.",
        "NumberFormatException occurs when an invalid String is converted to a number.",
        "ClassCastException occurs when an incompatible runtime cast is attempted.",
        "getMessage() returns the exception's detail message.",
        "toString() provides a String representation of the exception.",
        "printStackTrace() prints debugging information and the call stack.",
        "An unhandled exception can propagate through calling methods.",
        "If no handler is found, the JVM terminates the program and reports the exception.",
        "try-catch can be used to handle exceptions.",
        "Exception handling should be used for exceptional conditions rather than normal program flow."
      ]
    },

    // =========================================================
    // 24. INTERVIEW QUESTIONS
    // =========================================================

    {
      id: "interview-questions",
      title: "Exception: Interview Questions",

      interviewQuestions: [
        {
          question: "What is an exception in Java?",
          answer:
            "An exception is an event that occurs during program execution and disrupts the normal flow of the program. Java represents exceptions as objects."
        },

        {
          question: "What is exception handling?",
          answer:
            "Exception handling is the mechanism used to detect, handle, and manage exceptional conditions so that an application can respond appropriately instead of terminating unexpectedly."
        },

        {
          question: "What is the root class of Java's throwable hierarchy?",
          answer:
            "Throwable is the root class of Java's throwable hierarchy. Error and Exception directly extend Throwable."
        },

        {
          question: "What is the difference between Error and Exception?",
          answer:
            "Error generally represents serious JVM or runtime problems, while Exception generally represents conditions that application code may be able to handle."
        },

        {
          question: "What is RuntimeException?",
          answer:
            "RuntimeException is a subclass of Exception and is the parent of many unchecked exceptions such as NullPointerException and ArithmeticException."
        },

        {
          question: "What is a checked exception?",
          answer:
            "A checked exception is an exception that the compiler requires the programmer to handle or declare, typically using catch or throws."
        },

        {
          question: "What is an unchecked exception?",
          answer:
            "An unchecked exception is a RuntimeException or one of its subclasses. The compiler does not force the programmer to catch or declare it."
        },

        {
          question: "Give examples of unchecked exceptions.",
          answer:
            "Common examples include NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException, NumberFormatException, and ClassCastException."
        },

        {
          question: "What causes ArithmeticException?",
          answer:
            "A common cause is integer division by zero, such as int result = 10 / 0."
        },

        {
          question: "What causes NullPointerException?",
          answer:
            "It occurs when code attempts to perform an operation on a null reference that requires an actual object."
        },

        {
          question: "What causes ArrayIndexOutOfBoundsException?",
          answer:
            "It occurs when an array is accessed using an index outside the valid range of the array."
        },

        {
          question: "What causes NumberFormatException?",
          answer:
            "It occurs when a String cannot be converted into the requested numeric type, such as Integer.parseInt(\"abc\")."
        },

        {
          question: "What causes ClassCastException?",
          answer:
            "It occurs when an object is cast to an incompatible type at runtime."
        },

        {
          question: "What does getMessage() do?",
          answer:
            "getMessage() returns the detail message associated with an exception."
        },

        {
          question: "What is printStackTrace()?",
          answer:
            "printStackTrace() prints the exception information and the sequence of method calls that led to the exception, which is useful for debugging."
        },

        {
          question: "What is a stack trace?",
          answer:
            "A stack trace shows the sequence of active method calls at the point where an exception occurred. It helps identify where the problem originated."
        },

        {
          question: "What happens if an exception is not handled?",
          answer:
            "The exception can propagate through the calling methods. If no suitable handler is found, the JVM terminates the program and reports the exception."
        },

        {
          question: "Can we catch Error?",
          answer:
            "Technically, Error is a Throwable and can be caught, but application code generally should not catch serious JVM errors unless there is a very specific reason."
        },

        {
          question: "Is division by zero always an ArithmeticException?",
          answer:
            "Integer division by zero causes ArithmeticException. Floating-point division by zero follows IEEE 754 behavior and can produce Infinity or NaN instead."
        },

        {
          question: "Why should we avoid catching Exception everywhere?",
          answer:
            "Catching Exception everywhere can hide specific problems and make debugging difficult. It is generally better to handle exceptions at an appropriate boundary and use specific exception types when practical."
        }
      ]
    }
  ]
};