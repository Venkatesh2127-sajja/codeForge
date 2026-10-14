export const tryCatch = {
  id: "try-catch",
  slug: "try-catch",
  title: "try-catch in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Learn how try-catch handles exceptions in Java, understand execution flow, multiple catch blocks, catch ordering, exception methods, nested try-catch, practical examples, and common interview questions.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "introduction",
      title: "1. Introduction to try-catch",
      paragraphs: [
        "The try-catch statement is one of the most important mechanisms for handling exceptions in Java.",
        "Code that may produce an exception is placed inside the try block. If an exception occurs, Java transfers control to a matching catch block.",
        "Instead of allowing the application to terminate unexpectedly, the catch block can handle the exceptional situation."
      ],
      code: {
        language: "java",
        code: `public class TryCatchExample {

    public static void main(String[] args) {

        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }
    }
}`
      },
      output: `Cannot divide by zero.`
    },

    {
      id: "try-block",
      title: "2. What is the try Block?",
      paragraphs: [
        "The try block contains code that may throw an exception.",
        "A try block cannot normally exist by itself. It must be followed by at least one catch block or a finally block."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
}`
      },
      bullets: [
        "Place risky code inside try.",
        "A try block can contain multiple statements.",
        "If no exception occurs, all statements in the try block execute normally.",
        "If an exception occurs, Java searches for a matching catch block."
      ]
    },

    {
      id: "catch-block",
      title: "3. What is the catch Block?",
      paragraphs: [
        "The catch block handles an exception thrown from its associated try block.",
        "The catch block specifies the type of exception it can handle."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Arithmetic error occurred.");
}`
      },
      bullets: [
        "ArithmeticException is the exception type.",
        "e is the exception reference.",
        "The catch block executes only when a matching exception occurs."
      ]
    },

    {
      id: "basic-syntax",
      title: "4. Basic try-catch Syntax",
      paragraphs: [
        "The basic structure consists of a try block followed by a catch block."
      ],
      code: {
        language: "java",
        code: `try {
    // Code that may throw an exception
} catch (ExceptionType e) {
    // Exception handling code
}`
      },
      bullets: [
        "try contains risky code.",
        "catch contains recovery or handling logic.",
        "ExceptionType determines which exception the catch block can handle.",
        "The variable e refers to the exception object."
      ]
    },

    {
      id: "execution-no-exception",
      title: "5. Execution Flow When No Exception Occurs",
      paragraphs: [
        "If no exception occurs inside the try block, Java executes all statements in the try block and skips the catch block."
      ],
      code: {
        language: "java",
        code: `public class FlowExample {

    public static void main(String[] args) {

        System.out.println("Start");

        try {
            int result = 10 / 2;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Exception occurred.");
        }

        System.out.println("End");
    }
}`
      },
      output: `Start
Result: 5
End`
    },

    {
      id: "execution-exception",
      title: "6. Execution Flow When an Exception Occurs",
      paragraphs: [
        "When an exception occurs inside the try block, Java immediately stops normal execution of the remaining statements in that try block.",
        "Java then searches for a matching catch block."
      ],
      code: {
        language: "java",
        code: `public class FlowExample {

    public static void main(String[] args) {

        System.out.println("Start");

        try {
            System.out.println("Before exception");

            int result = 10 / 0;

            System.out.println("After exception");
        } catch (ArithmeticException e) {
            System.out.println("Exception handled.");
        }

        System.out.println("End");
    }
}`
      },
      output: `Start
Before exception
Exception handled.
End`
      ,
      bullets: [
        "The statement before the exception executes.",
        "The statement causing the exception executes and throws the exception.",
        "Statements after the exception inside try are skipped.",
        "The matching catch block executes.",
        "Execution continues after the try-catch statement."
      ]
    },

    {
      id: "important-flow",
      title: "7. Important Execution Flow Rule",
      paragraphs: [
        "Once an exception is thrown inside a try block, Java does not return to that point and continue executing the remaining statements in the same try block."
      ],
      code: {
        language: "java",
        code: `try {
    System.out.println("Statement 1");

    int value = 10 / 0;

    System.out.println("Statement 3");
} catch (ArithmeticException e) {
    System.out.println("Exception handled");
}

System.out.println("Statement 4");`
      },
      output: `Statement 1
Exception handled
Statement 4`
    },

    {
      id: "specific-exception",
      title: "8. Catching a Specific Exception",
      paragraphs: [
        "It is generally better to catch the specific exception that you know how to handle."
      ],
      code: {
        language: "java",
        code: `public class SpecificCatchExample {

    public static void main(String[] args) {

        try {
            int result = 20 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println(
                "Division by zero is not allowed."
            );
        }
    }
}`
      },
      output: `Division by zero is not allowed.`
    },

    {
      id: "exception-reference",
      title: "9. The Exception Reference",
      paragraphs: [
        "The variable declared inside catch refers to the exception object that was thrown."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {

    System.out.println(e);
}`
      },
      output: `java.lang.ArithmeticException: / by zero`
    },

    {
      id: "get-message",
      title: "10. getMessage()",
      paragraphs: [
        "The getMessage() method returns the detail message associated with an exception."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println(e.getMessage());
}`
      },
      output: `/ by zero`,
      bullets: [
        "getMessage() usually provides a concise description of the exception.",
        "The returned message can be null for exceptions created without a message."
      ]
    },

    {
      id: "to-string",
      title: "11. toString()",
      paragraphs: [
        "The toString() method provides a textual representation of the exception object."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println(e.toString());
}`
      },
      output: `java.lang.ArithmeticException: / by zero`,
      bullets: [
        "toString() normally includes the exception class name and message.",
        "It provides more information than getMessage()."
      ]
    },

    {
      id: "print-stack-trace",
      title: "12. printStackTrace()",
      paragraphs: [
        "The printStackTrace() method prints information about the exception and the call stack where the exception occurred.",
        "It is especially useful while debugging."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    e.printStackTrace();
}`
      },
      output: `java.lang.ArithmeticException: / by zero
    at Example.main(Example.java:...)`
    },

    {
      id: "stack-trace",
      title: "13. What is a Stack Trace?",
      paragraphs: [
        "A stack trace shows the sequence of method calls that led to the point where an exception occurred.",
        "It helps developers identify where the exception originated and how execution reached that location."
      ],
      code: {
        language: "java",
        code: `public class StackTraceExample {

    static void methodA() {
        methodB();
    }

    static void methodB() {
        int result = 10 / 0;
    }

    public static void main(String[] args) {

        try {
            methodA();
        } catch (ArithmeticException e) {
            e.printStackTrace();
        }
    }
}`
      },
      bullets: [
        "main() calls methodA().",
        "methodA() calls methodB().",
        "methodB() causes the exception.",
        "The stack trace shows this call path."
      ]
    },

    {
      id: "multiple-catch",
      title: "14. Multiple catch Blocks",
      paragraphs: [
        "A single try block can be followed by multiple catch blocks.",
        "This is useful when different exception types require different handling."
      ],
      code: {
        language: "java",
        code: `public class MultipleCatchExample {

    public static void main(String[] args) {

        try {
            int[] numbers = {10, 20, 30};

            int result = numbers[5] / 0;

            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic exception.");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index exception.");
        }
    }
}`
      },
      output: `Array index exception.`
    },

    {
      id: "multiple-catch-flow",
      title: "15. How Multiple catch Blocks Work",
      paragraphs: [
        "When an exception occurs, Java checks the catch blocks from top to bottom and executes the first compatible catch block."
      ],
      code: {
        language: "java",
        code: `try {
    int[] values = {10, 20};

    System.out.println(values[5]);

} catch (ArithmeticException e) {

    System.out.println("Arithmetic problem.");

} catch (ArrayIndexOutOfBoundsException e) {

    System.out.println("Array index problem.");
}`
      },
      output: `Array index problem.`
    },

    {
      id: "catch-ordering",
      title: "16. Catch Ordering",
      paragraphs: [
        "The order of catch blocks is important when exception types have a parent-child relationship.",
        "A more specific exception must appear before its more general parent exception."
      ],
      code: {
        language: "java",
        code: `try {
    int[] values = {10, 20};
    System.out.println(values[5]);

} catch (ArrayIndexOutOfBoundsException e) {

    System.out.println("Specific exception.");

} catch (IndexOutOfBoundsException e) {

    System.out.println("Parent exception.");
}`
      },
      output: `Specific exception.`
    },

    {
      id: "wrong-catch-order",
      title: "17. Wrong Catch Ordering",
      paragraphs: [
        "If a parent exception is caught before its child exception, the child catch block becomes unreachable."
      ],
      code: {
        language: "java",
        code: `try {
    int[] values = {10, 20};
    System.out.println(values[5]);

} catch (IndexOutOfBoundsException e) {

    System.out.println("Parent exception.");

}
// This catch block would cause a compilation error:
//
// catch (ArrayIndexOutOfBoundsException e) {
//     System.out.println("Child exception.");
// }`
      },
      bullets: [
        "IndexOutOfBoundsException is the parent.",
        "ArrayIndexOutOfBoundsException is a child.",
        "The parent catch can already handle the child exception.",
        "Therefore, a later child catch is unreachable."
      ]
    },

    {
      id: "exception-parent-child",
      title: "18. Parent and Child Exception Types",
      paragraphs: [
        "The catch ordering rule follows normal inheritance relationships."
      ],
      code: {
        language: "java",
        code: `try {
    // risky code
} catch (NullPointerException e) {
    // specific
} catch (RuntimeException e) {
    // parent
} catch (Exception e) {
    // broader parent
}`
      },
      bullets: [
        "NullPointerException is more specific than RuntimeException.",
        "RuntimeException is more specific than Exception.",
        "Exception is more specific than Throwable.",
        "Therefore, catch blocks should normally move from specific to general."
      ]
    },

    {
      id: "catch-exception",
      title: "19. Catching Exception",
      paragraphs: [
        "Exception is a broad parent type that can catch many checked exceptions and RuntimeException subclasses."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
    System.out.println(result);
} catch (Exception e) {
    System.out.println("An exception occurred.");
}`
      },
      output: `An exception occurred.`
    },

    {
      id: "specific-vs-general",
      title: "20. Specific Exception vs General Exception",
      paragraphs: [
        "Catching a specific exception is usually preferable when you know what failure you need to handle.",
        "A broad Exception catch can be useful at an appropriate application boundary, but it may hide the specific cause if used everywhere."
      ],
      code: {
        language: "java",
        code: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println(
        "Handle division problem specifically."
    );
}`
      },
      bullets: [
        "Specific catches make handling intent clearer.",
        "General catches can be useful for centralized error handling.",
        "Avoid using broad catches simply to hide programming errors."
      ]
    },

    {
      id: "multiple-exception-single-catch",
      title: "21. Multi-Catch with One catch Block",
      paragraphs: [
        "Java also supports multi-catch, where a single catch block handles multiple unrelated exception types."
      ],
      code: {
        language: "java",
        code: `public class MultiCatchExample {

    public static void main(String[] args) {

        try {
            int[] values = {10, 20};

            System.out.println(values[5]);

        } catch (
            ArithmeticException |
            ArrayIndexOutOfBoundsException e
        ) {
            System.out.println(
                "Arithmetic or array error."
            );
        }
    }
}`
      },
      output: `Arithmetic or array error.`
    },

    {
      id: "multi-catch-rules",
      title: "22. Multi-Catch Rules",
      paragraphs: [
        "A multi-catch statement allows multiple exception types to share the same handling logic."
      ],
      bullets: [
        "Exception types are separated using the | operator.",
        "The alternatives cannot have a parent-child relationship.",
        "The catch variable is implicitly final for the multi-catch parameter.",
        "Multi-catch reduces duplicate handling code when the response is the same."
      ],
      code: {
        language: "java",
        code: `try {
    // risky code
} catch (ArithmeticException | NullPointerException e) {
    System.out.println("Invalid operation.");
}`
      }
    },

    {
      id: "nested-preview",
      title: "23. Nested try-catch — Preview",
      paragraphs: [
        "A try-catch can be placed inside another try block or inside another catch block. This is called nested exception handling.",
        "Nested try-catch is useful when different operations require different levels of handling, although excessive nesting can make code difficult to understand."
      ],
      code: {
        language: "java",
        code: `public class NestedTryPreview {

    public static void main(String[] args) {

        try {

            System.out.println("Outer try");

            try {
                int result = 10 / 0;
                System.out.println(result);

            } catch (ArithmeticException e) {
                System.out.println(
                    "Inner catch handled arithmetic error."
                );
            }

        } catch (Exception e) {

            System.out.println("Outer catch.");

        }
    }
}`
      },
      output: `Outer try
Inner catch handled arithmetic error.`
    },

    {
      id: "nested-flow",
      title: "24. Nested try-catch Execution Flow",
      paragraphs: [
        "When an exception occurs in the inner try block, Java first searches for a matching inner catch block.",
        "If the inner catch handles the exception, execution continues after the inner try-catch statement.",
        "If no matching inner catch exists, the exception can propagate to the outer try-catch."
      ],
      code: {
        language: "java",
        code: `try {

    try {
        int value = 10 / 0;
        System.out.println(value);

    } catch (NullPointerException e) {

        System.out.println("Inner catch.");

    }

} catch (ArithmeticException e) {

    System.out.println("Outer catch.");
}`
      },
      output: `Outer catch.`
    },

    {
      id: "practical-user-input",
      title: "25. Practical Example: Validating User Input",
      paragraphs: [
        "A common use of try-catch is converting user-provided text into a number."
      ],
      code: {
        language: "java",
        code: `public class UserInputExample {

    public static void main(String[] args) {

        String input = "25";

        try {

            int age = Integer.parseInt(input);

            System.out.println(
                "Age: " + age
            );

        } catch (NumberFormatException e) {

            System.out.println(
                "Please enter a valid number."
            );
        }
    }
}`
      },
      output: `Age: 25`
    },

    {
      id: "practical-bank",
      title: "26. Practical Example: Bank Withdrawal",
      paragraphs: [
        "Exception handling can also be used to validate business operations."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance = 5000;

    public void withdraw(double amount) {

        try {

            if (amount <= 0) {
                throw new IllegalArgumentException(
                    "Amount must be positive"
                );
            }

            if (amount > balance) {
                throw new IllegalStateException(
                    "Insufficient balance"
                );
            }

            balance -= amount;

            System.out.println(
                "Withdrawal successful."
            );

        } catch (IllegalArgumentException e) {

            System.out.println(
                "Invalid amount: " + e.getMessage()
            );

        } catch (IllegalStateException e) {

            System.out.println(
                "Transaction failed: " + e.getMessage()
            );
        }
    }
}

public class BankExample {

    public static void main(String[] args) {

        BankAccount account = new BankAccount();

        account.withdraw(7000);
    }
}`
      },
      output: `Transaction failed: Insufficient balance`
    },

    {
      id: "practical-array",
      title: "27. Practical Example: Safe Array Access",
      paragraphs: [
        "An application can use try-catch when an array index comes from dynamic input."
      ],
      code: {
        language: "java",
        code: `public class ArrayExample {

    public static void main(String[] args) {

        int[] marks = {80, 75, 90};

        int index = 5;

        try {

            System.out.println(
                "Mark: " + marks[index]
            );

        } catch (ArrayIndexOutOfBoundsException e) {

            System.out.println(
                "Invalid array index."
            );
        }
    }
}`
      },
      output: `Invalid array index.`
    },

    {
      id: "practical-service",
      title: "28. Practical Example: Service Layer",
      paragraphs: [
        "In a backend application, a service method may perform an operation that can fail. The exception can be handled at an appropriate layer or propagated to a centralized exception handler."
      ],
      code: {
        language: "java",
        code: `public class UserService {

    public String findUser(String username) {

        try {

            if (username == null) {
                throw new IllegalArgumentException(
                    "Username cannot be null"
                );
            }

            return "User found: " + username;

        } catch (IllegalArgumentException e) {

            return "Invalid request: "
                    + e.getMessage();
        }
    }
}`
      },
      output: `Invalid request: Username cannot be null`
    },

    {
      id: "catch-variable-final",
      title: "29. Exception Variable and Scope",
      paragraphs: [
        "The exception variable declared in a catch block is available inside that catch block."
      ],
      code: {
        language: "java",
        code: `try {

    int result = 10 / 0;

} catch (ArithmeticException e) {

    System.out.println(
        "Exception type: "
        + e.getClass().getSimpleName()
    );

    System.out.println(
        "Message: "
        + e.getMessage()
    );
}`
      },
      output: `Exception type: ArithmeticException
Message: / by zero`
    },

    {
      id: "rethrow-preview",
      title: "30. Rethrowing an Exception — Preview",
      paragraphs: [
        "Sometimes a catch block performs logging or cleanup and then throws the exception again so that another layer can handle it.",
        "Rethrowing will be covered in more detail when we study advanced exception handling."
      ],
      code: {
        language: "java",
        code: `public void process() {

    try {

        performOperation();

    } catch (RuntimeException e) {

        System.out.println("Logging exception.");

        throw e;
    }
}

private void performOperation() {
    throw new RuntimeException("Operation failed");
}`
      },
      bullets: [
        "The exception is caught.",
        "The code performs some handling such as logging.",
        "throw e sends the same exception to the caller.",
        "This is different from simply swallowing the exception."
      ]
    },

    {
      id: "common-mistakes",
      title: "31. Common Mistakes",
      paragraphs: [
        "Several mistakes are common when learning try-catch."
      ],
      bullets: [
        "Mistake: Putting every line of the application inside one huge try block.",
        "Mistake: Catching Exception when a more specific exception can be handled.",
        "Mistake: Writing a parent catch block before a child catch block.",
        "Mistake: Assuming code after the statement that throws an exception will execute inside the same try block.",
        "Mistake: Using an empty catch block and silently ignoring the exception.",
        "Mistake: Printing only a generic error message and losing useful diagnostic information.",
        "Mistake: Using printStackTrace() as the application's complete production error-handling strategy.",
        "Mistake: Using nested try-catch everywhere instead of designing clear exception boundaries.",
        "Mistake: Catching Throwable unnecessarily.",
        "Mistake: Catching an exception and then throwing an unrelated exception without preserving useful context."
      ]
    },

    {
      id: "empty-catch",
      title: "32. Why Empty catch Blocks Are Dangerous",
      paragraphs: [
        "An empty catch block silently discards an exception. This can make debugging extremely difficult and can hide real application failures."
      ],
      code: {
        language: "java",
        code: `try {

    int result = 10 / 0;

} catch (ArithmeticException e) {

    // Bad practice:
    // ignoring the exception
}`
      },
      bullets: [
        "The failure becomes invisible.",
        "The application may continue in an invalid state.",
        "Important diagnostic information may be lost.",
        "Handle the exception, propagate it, or translate it appropriately."
      ]
    },

    {
      id: "specific-catch-best-practice",
      title: "33. Prefer Specific Catch Blocks",
      paragraphs: [
        "When different exceptions require different responses, use separate catch blocks."
      ],
      code: {
        language: "java",
        code: `try {

    // risky operation

} catch (NumberFormatException e) {

    System.out.println("Invalid number.");

} catch (NullPointerException e) {

    System.out.println("Required object is missing.");

} catch (Exception e) {

    System.out.println("Unexpected exception.");
}`
      },
      bullets: [
        "Specific exceptions are handled first.",
        "A broader exception can be used as a final fallback when appropriate.",
        "This makes the exception-handling intent easier to understand."
      ]
    },

    {
      id: "key-points",
      title: "34. Key Points",
      paragraphs: [
        "The try-catch mechanism provides structured exception handling in Java."
      ],
      bullets: [
        "try contains code that may throw an exception.",
        "catch handles a matching exception.",
        "If no exception occurs, catch is skipped.",
        "If an exception occurs, remaining statements in that try block are skipped.",
        "Java searches catch blocks for a compatible exception type.",
        "Multiple catch blocks can handle different exception types.",
        "Specific catch blocks must appear before their parent catch blocks.",
        "getMessage() returns the exception message.",
        "toString() provides the exception type and message.",
        "printStackTrace() prints diagnostic stack information.",
        "Multi-catch allows multiple exception types to share one catch block.",
        "Nested try-catch allows inner and outer exception handling.",
        "Avoid empty catch blocks.",
        "Prefer specific exception handling when possible.",
        "Do not catch Throwable unless there is a strong reason to do so."
      ]
    },

    {
      id: "interview-questions",
      title: "35. Interview Questions",
      interviewQuestions: [
        {
          question: "What is try-catch in Java?",
          answer:
            "try-catch is a mechanism for handling exceptions. Potentially risky code is placed inside try and a matching catch block handles an exception if one occurs."
        },
        {
          question: "What happens if no exception occurs inside try?",
          answer:
            "The statements inside try execute normally and the catch block is skipped. Execution continues after the try-catch statement."
        },
        {
          question: "What happens when an exception occurs inside try?",
          answer:
            "Normal execution of the try block stops at the exception. Java searches for a matching catch block and executes it if found."
        },
        {
          question: "Will statements after an exception execute inside the same try block?",
          answer:
            "No. Once an exception is thrown, the remaining statements in that try block are skipped."
        },
        {
          question: "Can we have multiple catch blocks?",
          answer:
            "Yes. Multiple catch blocks can be used to handle different exception types from the same try block."
        },
        {
          question: "What is the correct order of multiple catch blocks?",
          answer:
            "More specific exception types must come before their more general parent exception types."
        },
        {
          question: "Why must child exceptions come before parent exceptions?",
          answer:
            "A parent catch block can already handle the child exception. If the parent comes first, the child catch becomes unreachable and causes a compilation error."
        },
        {
          question: "Can we catch Exception directly?",
          answer:
            "Yes. Exception is a broad parent type and can catch many checked exceptions and RuntimeException subclasses."
        },
        {
          question: "What is getMessage()?",
          answer:
            "getMessage() returns the detail message associated with an exception."
        },
        {
          question: "What is the difference between getMessage() and toString()?",
          answer:
            "getMessage() generally returns only the exception message, while toString() generally includes the exception class name and message."
        },
        {
          question: "What is printStackTrace()?",
          answer:
            "printStackTrace() prints the exception information and the call stack that shows where the exception occurred."
        },
        {
          question: "What is a stack trace?",
          answer:
            "A stack trace shows the sequence of method calls leading to the point where an exception occurred."
        },
        {
          question: "Can a try block exist without catch?",
          answer:
            "Yes, a try block can be followed by finally without catch. A try block cannot normally stand alone."
        },
        {
          question: "Can we have multiple try blocks?",
          answer:
            "Yes. Multiple independent try-catch statements can exist in a program."
        },
        {
          question: "What is nested try-catch?",
          answer:
            "Nested try-catch means placing a try-catch structure inside another try, catch, or finally block."
        },
        {
          question: "What is multi-catch?",
          answer:
            "Multi-catch allows one catch block to handle multiple unrelated exception types using the | operator."
        },
        {
          question: "Can multi-catch contain parent and child exceptions?",
          answer:
            "No. Multi-catch alternatives cannot have a parent-child relationship because the broader type would make the narrower type redundant."
        },
        {
          question: "Why should empty catch blocks be avoided?",
          answer:
            "They silently ignore failures, which can hide bugs and make production problems difficult to diagnose."
        },
        {
          question: "Should we always catch Exception?",
          answer:
            "No. Catch a specific exception when you know how to handle it. A broad Exception catch should be used only where it makes sense, such as an appropriate application boundary."
        },
        {
          question: "What is the difference between handling and propagating an exception?",
          answer:
            "Handling means taking appropriate action in the current layer. Propagating means allowing the exception to move to a caller or another layer for handling."
        }
      ]
    }
  ]
};