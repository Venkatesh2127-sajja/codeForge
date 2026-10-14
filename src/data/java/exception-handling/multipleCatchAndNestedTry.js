export const multipleCatchAndNestedTry = {
  id: "multiple-catch-and-nested-try",
  slug: "multiple-catch-and-nested-try",
  title: "Multiple catch and Nested try in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Learn multiple catch blocks, catch ordering, multi-catch, nested try-catch, exception propagation between nested blocks, practical examples, common mistakes, and interview questions.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "multiple-catch-introduction",
      title: "1. Multiple catch Blocks",
      paragraphs: [
        "A single try block can be followed by multiple catch blocks. Each catch block can handle a different type of exception.",
        "This is useful when different exceptions require different handling logic."
      ],
      code: {
        language: "java",
        code: `public class MultipleCatchExample {

    public static void main(String[] args) {

        try {
            int[] numbers = {10, 20, 30};

            System.out.println(numbers[5]);

        } catch (ArithmeticException e) {

            System.out.println("Arithmetic error.");

        } catch (ArrayIndexOutOfBoundsException e) {

            System.out.println("Array index error.");
        }
    }
}`
      },
      output: `Array index error.`
    },

    {
      id: "multiple-catch-execution",
      title: "2. Execution Flow with Multiple catch Blocks",
      paragraphs: [
        "When an exception occurs, Java checks the catch blocks from top to bottom.",
        "The first catch block whose parameter type is compatible with the thrown exception is selected.",
        "After the selected catch block finishes, execution continues after the entire try-catch structure."
      ],
      code: {
        language: "java",
        code: `public class CatchFlowExample {

    public static void main(String[] args) {

        try {
            String value = null;

            System.out.println(value.length());

        } catch (ArithmeticException e) {

            System.out.println("Arithmetic exception.");

        } catch (NullPointerException e) {

            System.out.println("Null pointer exception.");

        } catch (Exception e) {

            System.out.println("General exception.");
        }

        System.out.println("Program continues.");
    }
}`
      },
      output: `Null pointer exception.
Program continues.`
    },

    {
      id: "specific-general",
      title: "3. Specific vs General Exceptions",
      paragraphs: [
        "A specific exception identifies a particular failure, while a general exception type can handle a wider range of exceptions.",
        "When different exceptions need different responses, specific catch blocks provide clearer and more precise handling."
      ],
      code: {
        language: "java",
        code: `try {
    int number = Integer.parseInt("abc");

    System.out.println(number);

} catch (NumberFormatException e) {

    System.out.println("Invalid number format.");

} catch (Exception e) {

    System.out.println("Some other exception occurred.");
}`
      },
      output: `Invalid number format.`
    },

    {
      id: "catch-ordering",
      title: "4. Catch Ordering in Detail",
      paragraphs: [
        "Catch blocks are evaluated from top to bottom. Therefore, a child exception must appear before its parent exception.",
        "If the parent exception appears first, it will handle the child exception as well, making the child catch unreachable."
      ],
      code: {
        language: "java",
        code: `try {
    String value = null;

    System.out.println(value.length());

} catch (NullPointerException e) {

    System.out.println("Null pointer.");

} catch (RuntimeException e) {

    System.out.println("Runtime exception.");

} catch (Exception e) {

    System.out.println("General exception.");
}`
      },
      output: `Null pointer.`
    },

    {
      id: "parent-child",
      title: "5. Parent-Child Exception Relationships",
      paragraphs: [
        "Exception classes use inheritance. A parent exception can catch objects of its child exception types.",
        "For example, RuntimeException can catch NullPointerException because NullPointerException extends RuntimeException."
      ],
      code: {
        language: "java",
        code: `try {
    throw new NullPointerException("Value is null");

} catch (NullPointerException e) {

    System.out.println("Child exception handled.");

} catch (RuntimeException e) {

    System.out.println("Parent exception handled.");

} catch (Exception e) {

    System.out.println("General exception handled.");
}`
      },
      output: `Child exception handled.`
    },

    {
      id: "unreachable-catch",
      title: "6. Unreachable catch Blocks",
      paragraphs: [
        "A catch block is unreachable when an earlier catch block can already handle every exception that the later catch could handle.",
        "Java reports this as a compilation error."
      ],
      code: {
        language: "java",
        code: `try {
    String value = null;
    System.out.println(value.length());

} catch (RuntimeException e) {

    System.out.println("Runtime exception.");

}

// This would be invalid:
//
// catch (NullPointerException e) {
//     System.out.println("Null pointer.");
// }`
      },
      bullets: [
        "NullPointerException is a subclass of RuntimeException.",
        "The first catch already handles NullPointerException.",
        "Therefore, a later NullPointerException catch would be unreachable.",
        "Always place specific exceptions before their parent exceptions."
      ]
    },

    {
      id: "multi-catch",
      title: "7. Multi-Catch with |",
      paragraphs: [
        "Java allows multiple exception types to be handled by a single catch block using the vertical bar operator, |.",
        "This is called multi-catch."
      ],
      code: {
        language: "java",
        code: `public class MultiCatchExample {

    public static void main(String[] args) {

        try {

            int number = Integer.parseInt("abc");

            System.out.println(number);

        } catch (
            NumberFormatException |
            NullPointerException e
        ) {

            System.out.println(
                "Invalid input."
            );
        }
    }
}`
      },
      output: `Invalid input.`
    },

    {
      id: "multi-catch-rules",
      title: "8. Multi-Catch Rules",
      paragraphs: [
        "Multi-catch is useful when different exception types need exactly the same handling logic."
      ],
      code: {
        language: "java",
        code: `try {
    // risky operation
} catch (
    IllegalArgumentException |
    IllegalStateException e
) {
    System.out.println(
        "Invalid operation."
    );
}`
      },
      bullets: [
        "Use | between exception types.",
        "All exception types share the same catch block.",
        "The exception alternatives cannot have a parent-child relationship.",
        "Multi-catch helps reduce duplicate handling code.",
        "The multi-catch exception parameter is implicitly final."
      ]
    },

    {
      id: "nested-introduction",
      title: "9. What is Nested try?",
      paragraphs: [
        "A nested try is a try block placed inside another try block, catch block, or finally block.",
        "Nested exception handling allows different levels of an application to handle different failures."
      ],
      code: {
        language: "java",
        code: `public class NestedTryExample {

    public static void main(String[] args) {

        try {

            System.out.println("Outer try started.");

            try {

                int result = 10 / 0;

                System.out.println(result);

            } catch (ArithmeticException e) {

                System.out.println(
                    "Inner catch handled arithmetic error."
                );
            }

            System.out.println("Outer try continues.");

        } catch (Exception e) {

            System.out.println("Outer catch.");
        }
    }
}`
      },
      output: `Outer try started.
Inner catch handled arithmetic error.
Outer try continues.`
    },

    {
      id: "inner-try-catch",
      title: "10. Inner try-catch",
      paragraphs: [
        "The inner try-catch handles exceptions that occur inside the inner try block.",
        "If the inner catch successfully handles the exception, execution can continue after the inner try-catch."
      ],
      code: {
        language: "java",
        code: `public class InnerTryExample {

    public static void main(String[] args) {

        try {

            try {

                int value = 10 / 0;

                System.out.println(value);

            } catch (ArithmeticException e) {

                System.out.println(
                    "Handled inside inner catch."
                );
            }

            System.out.println(
                "Outer try continues."
            );

        } catch (Exception e) {

            System.out.println(
                "Handled by outer catch."
            );
        }
    }
}`
      },
      output: `Handled inside inner catch.
Outer try continues.`
    },

    {
      id: "outer-try-catch",
      title: "11. Outer try-catch",
      paragraphs: [
        "The outer catch block can handle an exception when the inner try does not have a matching catch block."
      ],
      code: {
        language: "java",
        code: `public class OuterCatchExample {

    public static void main(String[] args) {

        try {

            try {

                int[] numbers = {10, 20};

                System.out.println(numbers[5]);

            } catch (NullPointerException e) {

                System.out.println(
                    "Inner catch."
                );
            }

        } catch (ArrayIndexOutOfBoundsException e) {

            System.out.println(
                "Outer catch handled array error."
            );
        }
    }
}`
      },
      output: `Outer catch handled array error.`
    },

    {
      id: "propagation-inner-outer",
      title: "12. Exception Propagation from Inner to Outer",
      paragraphs: [
        "If an exception occurs in an inner try block and no compatible inner catch block exists, Java searches the surrounding outer catch blocks.",
        "This is a form of exception propagation."
      ],
      code: {
        language: "java",
        code: `public class NestedPropagationExample {

    public static void main(String[] args) {

        try {

            System.out.println("Outer try started.");

            try {

                String name = null;

                System.out.println(
                    name.length()
                );

            } catch (ArithmeticException e) {

                System.out.println(
                    "Inner arithmetic catch."
                );
            }

        } catch (NullPointerException e) {

            System.out.println(
                "Outer null pointer catch."
            );
        }
    }
}`
      },
      output: `Outer try started.
Outer null pointer catch.`
    },

    {
      id: "multiple-nested-levels",
      title: "13. Multiple Nested Levels",
      paragraphs: [
        "Java allows multiple levels of nested try-catch structures, although excessive nesting can make code difficult to understand.",
        "When an exception is not handled at one level, Java can continue searching through the surrounding levels."
      ],
      code: {
        language: "java",
        code: `public class MultiLevelNestedExample {

    public static void main(String[] args) {

        try {

            System.out.println("Level 1");

            try {

                System.out.println("Level 2");

                try {

                    int result = 10 / 0;

                    System.out.println(result);

                } catch (NullPointerException e) {

                    System.out.println(
                        "Level 3 catch."
                    );
                }

            } catch (ArithmeticException e) {

                System.out.println(
                    "Level 2 catch."
                );
            }

        } catch (Exception e) {

            System.out.println(
                "Level 1 catch."
            );
        }
    }
}`
      },
      output: `Level 1
Level 2
Level 2 catch.`
    },

    {
      id: "practical-array",
      title: "14. Practical Example: Array Processing",
      paragraphs: [
        "Suppose an application receives an index dynamically. The code can handle an invalid index without terminating the entire program."
      ],
      code: {
        language: "java",
        code: `public class ArrayProcessing {

    public static void main(String[] args) {

        int[] marks = {85, 90, 75};

        int index = 5;

        try {

            try {

                System.out.println(
                    "Mark: " + marks[index]
                );

            } catch (ArrayIndexOutOfBoundsException e) {

                System.out.println(
                    "Invalid index: " + index
                );
            }

        } catch (Exception e) {

            System.out.println(
                "Unexpected error."
            );
        }
    }
}`
      },
      output: `Invalid index: 5`
    },

    {
      id: "practical-number-conversion",
      title: "15. Practical Example: Number Conversion",
      paragraphs: [
        "A common real-world situation is converting text received from a user or an external source into a number."
      ],
      code: {
        language: "java",
        code: `public class NumberConversion {

    public static void main(String[] args) {

        String input = "100";

        try {

            try {

                int number = Integer.parseInt(input);

                System.out.println(
                    "Number: " + number
                );

            } catch (NumberFormatException e) {

                System.out.println(
                    "Invalid number."
                );
            }

        } catch (Exception e) {

            System.out.println(
                "Unexpected exception."
            );
        }
    }
}`
      },
      output: `Number: 100`
    },

    {
      id: "practical-service",
      title: "16. Practical Example: Service Layer",
      paragraphs: [
        "In a backend application, different layers may have different responsibilities. A service may handle a known validation problem while unexpected exceptions can propagate to a higher-level handler."
      ],
      code: {
        language: "java",
        code: `public class UserService {

    public String findUser(String username) {

        try {

            if (username == null) {
                throw new IllegalArgumentException(
                    "Username is required"
                );
            }

            return "User found: " + username;

        } catch (IllegalArgumentException e) {

            return "Invalid request: "
                    + e.getMessage();
        }
    }
}

public class ServiceExample {

    public static void main(String[] args) {

        UserService service = new UserService();

        System.out.println(
            service.findUser(null)
        );
    }
}`
      },
      output: `Invalid request: Username is required`
    },

    {
      id: "when-nested-useful",
      title: "17. When is Nested try-catch Useful?",
      paragraphs: [
        "Nested try-catch can be useful when a smaller operation has a specific recovery strategy while the surrounding operation has a different recovery strategy."
      ],
      bullets: [
        "A small operation requires specialized exception handling.",
        "The surrounding operation should continue after the inner failure is handled.",
        "Different operations inside one larger workflow have different recovery strategies.",
        "A resource-processing step needs local handling while the outer operation has broader handling."
      ],
      paragraphsAfter: [
        "However, nested try-catch should not be used simply to avoid designing proper exception boundaries."
      ]
    },

    {
      id: "avoid-excessive-nesting",
      title: "18. Avoid Excessive Nested try-catch",
      paragraphs: [
        "Although Java supports nested try-catch structures, excessive nesting can make code difficult to read, test, and maintain.",
        "Prefer clear methods with focused responsibilities when possible."
      ],
      code: {
        language: "java",
        code: `// Prefer extracting responsibilities into methods.

public void processOrder() {

    validateOrder();
    processPayment();
    saveOrder();
}

private void validateOrder() {
    // Validation logic
}

private void processPayment() {
    // Payment logic
}

private void saveOrder() {
    // Persistence logic
}`
      },
      bullets: [
        "Keep try blocks focused.",
        "Extract complex operations into methods.",
        "Handle exceptions at the layer that can make the correct decision.",
        "Avoid deeply nested exception handling."
      ]
    },

    {
      id: "common-mistakes",
      title: "19. Common Mistakes",
      paragraphs: [
        "Understanding these mistakes will help you avoid common Java exception-handling problems."
      ],
      bullets: [
        "Putting a parent catch before a child catch.",
        "Creating unreachable catch blocks.",
        "Using multiple catch blocks when the handling logic is exactly the same instead of using multi-catch.",
        "Using nested try-catch excessively.",
        "Using empty catch blocks.",
        "Catching Exception everywhere instead of handling specific exceptions.",
        "Assuming an exception handled by an inner catch will automatically reach the outer catch.",
        "Forgetting that an unhandled inner exception can propagate to an outer catch.",
        "Writing complicated business logic inside catch blocks.",
        "Using try-catch as a replacement for input validation."
      ],
      code: {
        language: "java",
        code: `// Wrong ordering:

try {
    String value = null;
    System.out.println(value.length());

} catch (RuntimeException e) {

    System.out.println("Runtime exception.");

}

// This would be unreachable:
//
// catch (NullPointerException e) {
//     System.out.println("Null pointer.");
// }`
      }
    },

    {
      id: "key-points",
      title: "20. Key Points and Interview Questions",
      paragraphs: [
        "Multiple catch blocks allow different exception types to be handled separately. Nested try-catch allows exception handling at different levels.",
        "The most important rule is to order catch blocks from the most specific exception to the most general exception."
      ],
      bullets: [
        "A try block can have multiple catch blocks.",
        "Only the first matching catch block executes.",
        "Specific exceptions must appear before parent exceptions.",
        "A parent catch before its child makes the child catch unreachable.",
        "Multi-catch uses the | operator.",
        "Multi-catch is useful when multiple exceptions require the same handling.",
        "A nested try can exist inside another try, catch, or finally block.",
        "An inner catch handles the exception if it matches.",
        "If no inner catch matches, the exception can propagate to an outer catch.",
        "If an inner catch handles the exception, the outer catch does not handle that same exception.",
        "Excessive nesting can reduce readability.",
        "Exception handling should be placed at an appropriate application layer."
      ],
      interviewQuestions: [
        {
          question: "Can we have multiple catch blocks for one try block?",
          answer:
            "Yes. A single try block can be followed by multiple catch blocks to handle different exception types."
        },
        {
          question: "Which catch block executes when multiple catch blocks match?",
          answer:
            "The first compatible catch block executes. Therefore, catch blocks are evaluated from top to bottom."
        },
        {
          question: "Why must child exceptions come before parent exceptions?",
          answer:
            "A parent exception can already catch the child exception. If the parent comes first, the child catch becomes unreachable."
        },
        {
          question: "What happens if a catch block is unreachable?",
          answer:
            "The Java compiler reports an error because the catch block can never be selected."
        },
        {
          question: "What is multi-catch?",
          answer:
            "Multi-catch allows one catch block to handle multiple unrelated exception types using the | operator."
        },
        {
          question: "Can we use parent and child exceptions in multi-catch?",
          answer:
            "No. Multi-catch alternatives cannot have a parent-child relationship."
        },
        {
          question: "What is nested try-catch?",
          answer:
            "Nested try-catch means placing a try-catch structure inside another try, catch, or finally block."
        },
        {
          question: "What happens when an exception is not handled by the inner catch?",
          answer:
            "Java searches the surrounding outer catch blocks for a compatible handler."
        },
        {
          question: "If the inner catch handles an exception, will the outer catch execute?",
          answer:
            "No. Once the inner catch handles the exception, that exception does not continue to the outer catch."
        },
        {
          question: "Can we have multiple levels of nested try blocks?",
          answer:
            "Yes. Java allows multiple levels, although excessive nesting can make code difficult to maintain."
        },
        {
          question: "Can try exist without catch?",
          answer:
            "Yes. A try block can be followed by finally without catch."
        },
        {
          question: "What is the difference between multiple catch and multi-catch?",
          answer:
            "Multiple catch uses separate catch blocks for different exception types. Multi-catch uses one catch block with multiple exception types separated by |."
        },
        {
          question: "When should nested try-catch be used?",
          answer:
            "It can be useful when a smaller operation needs specialized local handling while the surrounding operation has a different recovery strategy."
        },
        {
          question: "What is the biggest rule when ordering catch blocks?",
          answer:
            "Place specific child exception types before their broader parent exception types."
        },
        {
          question: "Can catch(Exception e) handle RuntimeException?",
          answer:
            "Yes. RuntimeException extends Exception, so catch(Exception e) can handle RuntimeException and its subclasses."
        },
        {
          question: "Can catch(RuntimeException e) handle IOException?",
          answer:
            "No. IOException is not a subclass of RuntimeException."
        },
        {
          question: "Can one try block have both specific and general catch blocks?",
          answer:
            "Yes, but the specific catch blocks must appear before the general catch block."
        },
        {
          question: "What is exception propagation in nested try-catch?",
          answer:
            "It is the process where an exception that is not handled at an inner level moves outward to surrounding catch blocks."
        },
        {
          question: "Why should excessive nested try-catch be avoided?",
          answer:
            "Deep nesting makes code harder to read, test, debug, and maintain. Clear methods and appropriate exception boundaries are usually easier to manage."
        },
        {
          question: "When should multi-catch be preferred?",
          answer:
            "When multiple unrelated exception types require exactly the same handling logic."
        }
      ]
    }
  ]
};