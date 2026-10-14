export const finallyLesson = {
  id: "finally",
  slug: "finally",
  title: "finally in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Understand the finally block in Java, its execution flow, cleanup purpose, return behavior, nested try-catch-finally, practical examples, important rules, common mistakes, and interview questions.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-finally",
      title: "1. What is finally?",
      paragraphs: [
        "The finally block is used to execute code after a try or try-catch operation.",
        "It is mainly used for cleanup activities such as closing resources, releasing locks, or restoring application state.",
        "The finally block normally executes whether an exception occurs or not."
      ],
      code: {
        language: "java",
        code: `public class FinallyExample {

    public static void main(String[] args) {

        try {
            System.out.println("Inside try.");
        } catch (Exception e) {
            System.out.println("Inside catch.");
        } finally {
            System.out.println("Inside finally.");
        }
    }
}`
      },
      output: `Inside try.
Inside finally.`
    },

    {
      id: "basic-syntax",
      title: "2. Basic try-catch-finally Syntax",
      paragraphs: [
        "A finally block can be placed after one or more catch blocks."
      ],
      code: {
        language: "java",
        code: `try {
    // Risky code
} catch (Exception e) {
    // Exception handling
} finally {
    // Cleanup code
}`
      },
      bullets: [
        "try contains potentially risky code.",
        "catch handles an exception.",
        "finally contains code that should normally execute afterward.",
        "A try block must have either catch or finally."
      ]
    },

    {
      id: "no-exception-flow",
      title: "3. Execution Flow Without an Exception",
      paragraphs: [
        "If no exception occurs inside the try block, Java executes the try block completely and then executes finally."
      ],
      code: {
        language: "java",
        code: `public class FinallyFlow {

    public static void main(String[] args) {

        try {
            System.out.println("Step 1");
            System.out.println("Step 2");
        } catch (Exception e) {
            System.out.println("Catch");
        } finally {
            System.out.println("Finally");
        }

        System.out.println("Program continues.");
    }
}`
      },
      output: `Step 1
Step 2
Finally
Program continues.`
    },

    {
      id: "exception-flow",
      title: "4. Execution Flow With an Exception",
      paragraphs: [
        "When an exception occurs, normal execution of the try block stops. Java searches for a matching catch block and then executes finally."
      ],
      code: {
        language: "java",
        code: `public class ExceptionFinally {

    public static void main(String[] args) {

        try {
            System.out.println("Before exception");

            int result = 10 / 0;

            System.out.println("After exception");

        } catch (ArithmeticException e) {

            System.out.println("Exception handled.");

        } finally {

            System.out.println("Finally executed.");
        }
    }
}`
      },
      output: `Before exception
Exception handled.
Finally executed.`
    },

    {
      id: "finally-after-catch",
      title: "5. finally After catch",
      paragraphs: [
        "The common structure is try-catch-finally. The catch block handles the exception and finally performs the final cleanup operation."
      ],
      code: {
        language: "java",
        code: `try {

    int result = 10 / 0;

} catch (ArithmeticException e) {

    System.out.println("Cannot divide by zero.");

} finally {

    System.out.println("Cleanup completed.");
}`
      },
      output: `Cannot divide by zero.
Cleanup completed.`
    },

    {
      id: "finally-without-catch",
      title: "6. finally Without catch",
      paragraphs: [
        "A try block does not always need a catch block. It can be followed directly by finally.",
        "This is useful when the current method does not want to handle the exception but still needs to perform cleanup."
      ],
      code: {
        language: "java",
        code: `public class FinallyWithoutCatch {

    public static void main(String[] args) {

        try {

            System.out.println("Inside try.");

        } finally {

            System.out.println("Cleanup.");
        }
    }
}`
      },
      output: `Inside try.
Cleanup.`
    },

    {
      id: "finally-with-return",
      title: "7. finally with return Inside try",
      paragraphs: [
        "A finally block normally executes even when the try block contains a return statement.",
        "The return expression is evaluated, but the finally block executes before the method actually completes."
      ],
      code: {
        language: "java",
        code: `public class ReturnFinally {

    static int getNumber() {

        try {
            return 10;
        } finally {
            System.out.println("Finally executed.");
        }
    }

    public static void main(String[] args) {

        int result = getNumber();

        System.out.println("Result: " + result);
    }
}`
      },
      output: `Finally executed.
Result: 10`
    },

    {
      id: "return-catch",
      title: "8. return Inside catch",
      paragraphs: [
        "The finally block also executes when a catch block contains a return statement."
      ],
      code: {
        language: "java",
        code: `public class CatchReturn {

    static int calculate() {

        try {

            int result = 10 / 0;
            return result;

        } catch (ArithmeticException e) {

            return 20;

        } finally {

            System.out.println("Finally executed.");
        }
    }

    public static void main(String[] args) {

        System.out.println(calculate());
    }
}`
      },
      output: `Finally executed.
20`
    },

    {
      id: "return-finally",
      title: "9. return Inside finally",
      paragraphs: [
        "Java allows a return statement inside finally, but this is strongly discouraged.",
        "A return from finally can override a return value from try or catch and can also suppress an exception."
      ],
      code: {
        language: "java",
        code: `public class FinallyReturn {

    static int getNumber() {

        try {
            return 10;
        } finally {
            return 20;
        }
    }

    public static void main(String[] args) {

        System.out.println(
            getNumber()
        );
    }
}`
      },
      output: `20`
    },

    {
      id: "finally-overrides-return",
      title: "10. finally Can Override a Return Value",
      paragraphs: [
        "If both try and finally contain return statements, the return from finally wins."
      ],
      code: {
        language: "java",
        code: `static String getMessage() {

    try {
        return "From try";
    } finally {
        return "From finally";
    }
}`
      },
      output: `From finally`,
      bullets: [
        "The try block prepares a return value.",
        "finally executes before the method completes.",
        "The return inside finally replaces the earlier return.",
        "Avoid returning from finally because it makes control flow confusing."
      ]
    },

    {
      id: "finally-with-throw",
      title: "11. finally with throw",
      paragraphs: [
        "A finally block can throw an exception. However, throwing a new exception from finally can replace an exception that was already being propagated."
      ],
      code: {
        language: "java",
        code: `public class FinallyThrow {

    public static void process() {

        try {

            throw new RuntimeException(
                "Original exception"
            );

        } finally {

            System.out.println(
                "Finally executed."
            );
        }
    }

    public static void main(String[] args) {

        try {
            process();
        } catch (RuntimeException e) {
            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Finally executed.
Original exception`
    },

    {
      id: "finally-throw-replacement",
      title: "12. Throwing a New Exception from finally",
      paragraphs: [
        "If finally itself throws another exception while an earlier exception is being propagated, the exception from finally can replace the earlier exception."
      ],
      code: {
        language: "java",
        code: `public class FinallyExceptionReplacement {

    public static void process() {

        try {

            throw new RuntimeException(
                "Original exception"
            );

        } finally {

            throw new RuntimeException(
                "Finally exception"
            );
        }
    }

    public static void main(String[] args) {

        try {
            process();
        } catch (RuntimeException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Finally exception`
    },

    {
      id: "nested-finally",
      title: "13. Nested try-catch-finally",
      paragraphs: [
        "A nested try-catch-finally structure allows an inner operation and an outer operation to have separate cleanup and exception-handling logic."
      ],
      code: {
        language: "java",
        code: `public class NestedFinally {

    public static void main(String[] args) {

        try {

            System.out.println("Outer try.");

            try {

                int result = 10 / 0;
                System.out.println(result);

            } catch (ArithmeticException e) {

                System.out.println(
                    "Inner catch."
                );

            } finally {

                System.out.println(
                    "Inner finally."
                );
            }

        } finally {

            System.out.println(
                "Outer finally."
            );
        }
    }
}`
      },
      output: `Outer try.
Inner catch.
Inner finally.
Outer finally.`
    },

    {
      id: "cleanup",
      title: "14. Resource Cleanup",
      paragraphs: [
        "Historically, finally was commonly used to close resources such as files, streams, or database-related objects.",
        "Modern Java often prefers try-with-resources for AutoCloseable resources because it handles resource closing automatically. However, finally remains important for understanding Java control flow and for cleanup that is not covered by try-with-resources."
      ],
      code: {
        language: "java",
        code: `public class CleanupExample {

    public static void main(String[] args) {

        boolean resourceOpened = false;

        try {

            System.out.println(
                "Opening resource."
            );

            resourceOpened = true;

            System.out.println(
                "Using resource."
            );

        } finally {

            if (resourceOpened) {
                System.out.println(
                    "Releasing resource."
                );
            }
        }
    }
}`
      },
      output: `Opening resource.
Using resource.
Releasing resource.`
    },

    {
      id: "file-style",
      title: "15. Practical Example: File-Style Cleanup",
      paragraphs: [
        "A simplified example can demonstrate the cleanup pattern. In modern Java, actual file resources should generally use try-with-resources."
      ],
      code: {
        language: "java",
        code: `public class FileCleanupExample {

    public static void main(String[] args) {

        boolean fileOpened = false;

        try {

            System.out.println(
                "Opening file."
            );

            fileOpened = true;

            System.out.println(
                "Reading file."
            );

        } catch (RuntimeException e) {

            System.out.println(
                "File processing failed."
            );

        } finally {

            if (fileOpened) {
                System.out.println(
                    "Closing file."
                );
            }
        }
    }
}`
      },
      output: `Opening file.
Reading file.
Closing file.`
    },

    {
      id: "database-style",
      title: "16. Practical Example: Database-Style Cleanup",
      paragraphs: [
        "The same pattern can be applied to database-style operations where a resource or state must be cleaned up regardless of whether an operation succeeds."
      ],
      code: {
        language: "java",
        code: `public class DatabaseCleanupExample {

    public static void main(String[] args) {

        boolean connectionOpened = false;

        try {

            System.out.println(
                "Opening database connection."
            );

            connectionOpened = true;

            System.out.println(
                "Executing query."
            );

        } catch (RuntimeException e) {

            System.out.println(
                "Database operation failed."
            );

        } finally {

            if (connectionOpened) {
                System.out.println(
                    "Closing database connection."
                );
            }
        }
    }
}`
      },
      output: `Opening database connection.
Executing query.
Closing database connection.`
    },

    {
      id: "final-finally-finalize",
      title: "17. final vs finally vs finalize()",
      paragraphs: [
        "The keywords final and finally and the method finalize() have different purposes. They should not be confused."
      ],
      code: {
        language: "java",
        code: `public class KeywordsExample {

    final int number = 10;

    public void demonstrateFinally() {

        try {
            System.out.println("Try");
        } finally {
            System.out.println("Finally");
        }
    }
}`
      },
      bullets: [
        "final is a keyword used with variables, methods, and classes.",
        "A final variable cannot be reassigned.",
        "A final method cannot be overridden.",
        "A final class cannot be extended.",
        "finally is a block used with exception handling.",
        "finalize() was an old object-finalization mechanism and should not be used for resource management. It has been deprecated for removal in modern Java."
      ]
    },

    {
      id: "finally-guarantee",
      title: "18. Can finally Fail to Execute?",
      paragraphs: [
        "The finally block normally executes when control leaves the associated try-catch structure.",
        "However, finally is not an absolute guarantee under every possible JVM termination scenario."
      ],
      code: {
        language: "java",
        code: `public class FinallyTermination {

    public static void main(String[] args) {

        try {

            System.out.println(
                "Inside try."
            );

            System.exit(0);

        } finally {

            System.out.println(
                "This may not execute."
            );
        }
    }
}`
      },
      bullets: [
        "System.exit() can terminate the JVM before finally executes.",
        "A JVM crash or forced process termination can also prevent finally from executing.",
        "Therefore, finally should be described as normally executing, not as an absolute guarantee."
      ]
    },

    {
      id: "return-reference",
      title: "19. Important Rule: finally Executes Before Method Completion",
      paragraphs: [
        "When a method returns from try or catch, Java executes finally before the method actually completes."
      ],
      code: {
        language: "java",
        code: `public class ReturnFlow {

    static String getValue() {

        try {

            return "Java";

        } finally {

            System.out.println(
                "Cleanup before return."
            );
        }
    }

    public static void main(String[] args) {

        String value = getValue();

        System.out.println(
            "Value: " + value
        );
    }
}`
      },
      output: `Cleanup before return.
Value: Java`
    },

    {
      id: "finally-best-practices",
      title: "20. Best Practices, Key Points and Interview Questions",
      paragraphs: [
        "The finally block is primarily useful for cleanup and control-flow understanding. Modern Java applications should prefer try-with-resources for closing AutoCloseable resources."
      ],
      bullets: [
        "Use finally for cleanup that must normally happen after try-catch.",
        "Do not put return statements inside finally.",
        "Avoid throwing new exceptions from finally unless there is a specific reason.",
        "Do not use finally as a replacement for proper resource-management APIs.",
        "Prefer try-with-resources for files, streams, sockets, and other AutoCloseable resources.",
        "finally normally executes whether an exception occurs or not.",
        "finally executes even when try or catch contains return.",
        "A return in finally can override a return from try or catch.",
        "System.exit() can prevent finally from executing.",
        "JVM termination or a process crash can also prevent finally from running.",
        "final, finally, and finalize() have different meanings."
      ],
      interviewQuestions: [
        {
          question: "What is finally in Java?",
          answer:
            "finally is a block used to execute cleanup or finalization logic after a try or try-catch operation."
        },
        {
          question: "When does finally execute?",
          answer:
            "It normally executes when control leaves the associated try-catch structure, whether an exception occurs or not."
        },
        {
          question: "Can we use finally without catch?",
          answer:
            "Yes. A try block can be followed by finally without a catch block."
        },
        {
          question: "Does finally execute when try contains return?",
          answer:
            "Yes. The finally block normally executes before the method actually returns."
        },
        {
          question: "Does finally execute when catch contains return?",
          answer:
            "Yes. The finally block normally executes before the method returns from the catch block."
        },
        {
          question: "What happens if finally also has return?",
          answer:
            "The return from finally overrides a return from try or catch. This is why returning from finally is strongly discouraged."
        },
        {
          question: "Can finally throw an exception?",
          answer:
            "Yes. A finally block can throw an exception, although doing so can replace or obscure an exception that was already being propagated."
        },
        {
          question: "Can finally fail to execute?",
          answer:
            "Yes. For example, System.exit() can terminate the JVM before finally runs. JVM crashes or forced process termination can also prevent it."
        },
        {
          question: "What is the main purpose of finally?",
          answer:
            "Its traditional purpose is cleanup, such as releasing resources or restoring state. For AutoCloseable resources, try-with-resources is generally preferred."
        },
        {
          question: "What is the difference between final and finally?",
          answer:
            "final is a Java keyword used with variables, methods, and classes. finally is a block associated with exception handling."
        },
        {
          question: "What is the difference between finally and finalize()?",
          answer:
            "finally is an exception-handling block. finalize() was an old object-finalization method and is deprecated for removal in modern Java."
        },
        {
          question: "Can try exist without catch?",
          answer:
            "Yes. A try block can be followed by finally without a catch block."
        },
        {
          question: "Is finally guaranteed to execute in every situation?",
          answer:
            "No. It normally executes, but JVM termination through mechanisms such as System.exit(), a JVM crash, or forced process termination can prevent it."
        },
        {
          question: "Why should return in finally be avoided?",
          answer:
            "It can override a return from try or catch and can also suppress an exception, making program behavior difficult to understand."
        },
        {
          question: "Should finally be used to close files in modern Java?",
          answer:
            "For AutoCloseable resources, try-with-resources is generally preferred because it automatically closes resources and handles suppressed exceptions correctly."
        }
      ]
    }
  ]
};