export const throwLesson = {
  id: "throw",
  slug: "throw",
  title: "throw in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Learn how to manually throw exceptions in Java using the throw keyword, understand checked and unchecked exceptions, validation, custom exceptions, exception propagation, throw vs throws, common mistakes, and interview questions.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "introduction",
      title: "1. What is throw?",
      paragraphs: [
        "The throw keyword is used to explicitly throw an exception from Java code.",
        "Normally, Java throws exceptions automatically when an exceptional condition occurs. With throw, the programmer can decide when an exception should be created and thrown.",
        "throw is especially useful for validation, business rules, and custom exceptions."
      ],
      code: {
        language: "java",
        code: `public class ThrowExample {

    public static void main(String[] args) {

        throw new RuntimeException("Something went wrong");
    }
}`
      },
      output: `Exception in thread "main" java.lang.RuntimeException: Something went wrong`
    },

    {
      id: "syntax",
      title: "2. throw Syntax",
      paragraphs: [
        "The basic syntax of throw requires an object whose type extends Throwable."
      ],
      code: {
        language: "java",
        code: `throw new ExceptionType("message");`
      },
      bullets: [
        "throw is a Java keyword.",
        "new creates an exception object.",
        "The exception object is passed to throw.",
        "The thrown exception interrupts normal execution.",
        "The exception can be handled by a matching catch block or propagated to the caller."
      ]
    },

    {
      id: "throw-with-catch",
      title: "3. Throwing an Exception and Handling It",
      paragraphs: [
        "An explicitly thrown exception can be handled using a normal try-catch structure."
      ],
      code: {
        language: "java",
        code: `public class ThrowCatchExample {

    public static void main(String[] args) {

        try {

            throw new ArithmeticException(
                "Invalid arithmetic operation"
            );

        } catch (ArithmeticException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Invalid arithmetic operation`
    },

    {
      id: "execution-flow",
      title: "4. Execution Flow After throw",
      paragraphs: [
        "When throw executes, normal execution stops immediately at that point.",
        "Java then searches for a matching catch block in the current method. If no matching catch exists, the exception can propagate to the caller."
      ],
      code: {
        language: "java",
        code: `public class ThrowFlow {

    public static void main(String[] args) {

        try {

            System.out.println("Before throw");

            throw new RuntimeException("Problem");

            // This statement is unreachable:
            // System.out.println("After throw");

        } catch (RuntimeException e) {

            System.out.println(
                "Exception handled."
            );
        }

        System.out.println(
            "Program continues."
        );
    }
}`
      },
      output: `Before throw
Exception handled.
Program continues.`
    },

    {
      id: "throw-standard-exceptions",
      title: "5. Throwing Standard Java Exceptions",
      paragraphs: [
        "You can explicitly throw many standard Java exception types when their meaning matches the situation."
      ],
      code: {
        language: "java",
        code: `public class StandardExceptions {

    public static void validateAge(int age) {

        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }
    }

    public static void main(String[] args) {

        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Age cannot be negative`,
      bullets: [
        "IllegalArgumentException is useful for invalid method arguments.",
        "IllegalStateException can represent an invalid object or application state.",
        "NullPointerException can be thrown explicitly, although explicit validation with a more meaningful exception is often preferable.",
        "Choose an exception type that accurately describes the failure."
      ]
    },

    {
      id: "unchecked",
      title: "6. throw with Unchecked Exceptions",
      paragraphs: [
        "Unchecked exceptions are commonly thrown manually when validation fails or an object is in an invalid state.",
        "RuntimeException and its subclasses do not require catch-or-declare handling."
      ],
      code: {
        language: "java",
        code: `public class UncheckedThrow {

    public static void withdraw(double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be greater than zero"
            );
        }

        System.out.println(
            "Withdrawal request accepted."
        );
    }

    public static void main(String[] args) {

        try {
            withdraw(-100);
        } catch (IllegalArgumentException e) {
            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Amount must be greater than zero`
    },

    {
      id: "checked",
      title: "7. throw with Checked Exceptions",
      paragraphs: [
        "You can also explicitly throw checked exceptions. When you throw a checked exception from a method, the method must generally catch it or declare it with throws."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class CheckedThrow {

    public static void readData()
            throws IOException {

        throw new IOException(
            "Unable to read data"
        );
    }

    public static void main(String[] args) {

        try {
            readData();
        } catch (IOException e) {
            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Unable to read data`
    },

    {
      id: "checked-without-throws",
      title: "8. Why Checked throw Requires Handling or Declaration",
      paragraphs: [
        "Because IOException is a checked exception, Java requires the method to either handle it or declare that it can throw it."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class CheckedRule {

    public static void readData()
            throws IOException {

        throw new IOException(
            "Data unavailable"
        );
    }
}`
      },
      bullets: [
        "IOException is checked.",
        "The method declares it using throws.",
        "The caller must handle IOException or declare it further.",
        "The compiler enforces this rule."
      ]
    },

    {
      id: "validation",
      title: "9. throw for Input Validation",
      paragraphs: [
        "One of the most common uses of throw is validating method arguments before performing an operation."
      ],
      code: {
        language: "java",
        code: `public class ValidationExample {

    public static void registerUser(
            String username,
            int age) {

        if (username == null ||
            username.isBlank()) {

            throw new IllegalArgumentException(
                "Username is required"
            );
        }

        if (age < 18) {

            throw new IllegalArgumentException(
                "User must be at least 18"
            );
        }

        System.out.println(
            "Registration successful."
        );
    }

    public static void main(String[] args) {

        try {

            registerUser("", 25);

        } catch (IllegalArgumentException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Username is required`
    },

    {
      id: "multiple-validation",
      title: "10. Multiple Validation Rules",
      paragraphs: [
        "A method can contain multiple validation rules and throw an exception as soon as an invalid condition is detected."
      ],
      code: {
        language: "java",
        code: `public class ProductValidator {

    public static void validate(
            String productName,
            double price) {

        if (productName == null ||
            productName.isBlank()) {

            throw new IllegalArgumentException(
                "Product name is required"
            );
        }

        if (price <= 0) {

            throw new IllegalArgumentException(
                "Price must be positive"
            );
        }

        System.out.println(
            "Product is valid."
        );
    }

    public static void main(String[] args) {

        try {

            validate("Laptop", -500);

        } catch (IllegalArgumentException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Price must be positive`
    },

    {
      id: "business-rule",
      title: "11. throw for Business Rules",
      paragraphs: [
        "throw is also useful when an operation violates a business rule.",
        "For example, a bank account can reject a withdrawal when the requested amount is greater than the available balance."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) {

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
    }
}

public class BankExample {

    public static void main(String[] args) {

        BankAccount account =
                new BankAccount(5000);

        try {

            account.withdraw(7000);

        } catch (IllegalStateException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Insufficient balance`
    },

    {
      id: "custom-exception",
      title: "12. Creating a Custom Exception",
      paragraphs: [
        "When standard exception types do not clearly describe a business or application-specific failure, you can create a custom exception.",
        "A custom exception is a normal Java class that extends an appropriate exception type."
      ],
      code: {
        language: "java",
        code: `class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(
            String message) {

        super(message);
    }
}`
      },
      bullets: [
        "The custom exception extends RuntimeException.",
        "Therefore, it is an unchecked exception.",
        "The constructor passes the message to the parent exception."
      ]
    },

    {
      id: "throw-custom",
      title: "13. Throwing a Custom Exception",
      paragraphs: [
        "After creating a custom exception, throw can be used to enforce the corresponding business rule."
      ],
      code: {
        language: "java",
        code: `class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(
            String message) {

        super(message);
    }
}

class BankAccount {

    private double balance = 5000;

    public void withdraw(double amount) {

        if (amount > balance) {

            throw new InsufficientBalanceException(
                "Insufficient balance"
            );
        }

        balance -= amount;

        System.out.println(
            "Withdrawal successful."
        );
    }
}

public class CustomExceptionExample {

    public static void main(String[] args) {

        BankAccount account =
                new BankAccount();

        try {

            account.withdraw(7000);

        } catch (InsufficientBalanceException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Insufficient balance`
    },

    {
      id: "custom-checked",
      title: "14. Throwing a Custom Checked Exception",
      paragraphs: [
        "A custom exception can also extend Exception. In that case, it becomes a checked exception and must be caught or declared."
      ],
      code: {
        language: "java",
        code: `class InvalidOrderException
        extends Exception {

    public InvalidOrderException(
            String message) {

        super(message);
    }
}

public class CheckedCustomExample {

    public static void createOrder(
            int quantity)
            throws InvalidOrderException {

        if (quantity <= 0) {

            throw new InvalidOrderException(
                "Quantity must be greater than zero"
            );
        }

        System.out.println(
            "Order created."
        );
    }

    public static void main(String[] args) {

        try {

            createOrder(0);

        } catch (InvalidOrderException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `Quantity must be greater than zero`
    },

    {
      id: "throw-vs-throws",
      title: "15. throw vs throws",
      paragraphs: [
        "throw and throws are related to exception handling, but they perform completely different jobs."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class ThrowVsThrows {

    public void readData()
            throws IOException {

        throw new IOException(
            "Unable to read data"
        );
    }
}`
      },
      bullets: [
        "throw is used inside a method body.",
        "throw actually throws an exception object.",
        "throws appears in a method declaration.",
        "throws declares that a method may propagate exceptions.",
        "throw works with one exception object at a time.",
        "throws can declare multiple exception types."
      ]
    },

    {
      id: "multiple-throws",
      title: "16. Declaring Multiple Exceptions with throws",
      paragraphs: [
        "A method can declare multiple exception types using throws."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;
import java.sql.SQLException;

public class MultipleThrows {

    public void process()
            throws IOException, SQLException {

        // Operation that may produce
        // either exception.
    }
}`
      },
      bullets: [
        "Multiple exceptions are separated by commas.",
        "The caller must satisfy the handling requirements for checked exceptions.",
        "Unchecked exceptions may also be declared, but the compiler does not require callers to handle them."
      ]
    },

    {
      id: "propagation",
      title: "17. Exception Propagation After throw",
      paragraphs: [
        "If a thrown exception is not handled in the current method, it can propagate to the caller.",
        "This allows a lower-level method to report a failure while a higher-level method decides how to handle it."
      ],
      code: {
        language: "java",
        code: `public class PropagationExample {

    static void methodC() {

        throw new IllegalArgumentException(
            "Invalid value"
        );
    }

    static void methodB() {
        methodC();
    }

    static void methodA() {
        methodB();
    }

    public static void main(String[] args) {

        try {

            methodA();

        } catch (IllegalArgumentException e) {

            System.out.println(
                "Handled in main: "
                + e.getMessage()
            );
        }
    }
}`
      },
      output: `Handled in main: Invalid value`
    },

    {
      id: "checked-propagation",
      title: "18. Checked Exception Propagation",
      paragraphs: [
        "Checked exceptions can also propagate through multiple methods, but each method in the chain must handle or declare the checked exception."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class CheckedPropagation {

    static void methodC()
            throws IOException {

        throw new IOException(
            "File operation failed"
        );
    }

    static void methodB()
            throws IOException {

        methodC();
    }

    static void methodA()
            throws IOException {

        methodB();
    }

    public static void main(String[] args) {

        try {

            methodA();

        } catch (IOException e) {

            System.out.println(
                e.getMessage()
            );
        }
    }
}`
      },
      output: `File operation failed`
    },

    {
      id: "throw-new-vs-rethrow",
      title: "19. Throwing a New Exception vs Rethrowing",
      paragraphs: [
        "There is an important difference between throwing a new exception and rethrowing an existing exception.",
        "A new exception creates a new exception object. Rethrowing sends the existing exception to the caller."
      ],
      code: {
        language: "java",
        code: `public class RethrowExample {

    static void process() {

        try {

            int result = 10 / 0;
            System.out.println(result);

        } catch (ArithmeticException e) {

            System.out.println(
                "Logging exception."
            );

            throw e;
        }
    }

    public static void main(String[] args) {

        try {

            process();

        } catch (ArithmeticException e) {

            System.out.println(
                "Handled by caller."
            );
        }
    }
}`
      },
      output: `Logging exception.
Handled by caller.`
    },

    {
      id: "exception-chaining-preview",
      title: "20. Throwing an Exception with a Cause",
      paragraphs: [
        "Sometimes an application catches a lower-level exception and throws a higher-level exception while preserving the original cause.",
        "This is called exception chaining and is especially useful in layered applications."
      ],
      code: {
        language: "java",
        code: `public class ExceptionChaining {

    static void repositoryOperation() {

        throw new IllegalStateException(
            "Database operation failed"
        );
    }

    static void serviceOperation() {

        try {

            repositoryOperation();

        } catch (IllegalStateException e) {

            throw new RuntimeException(
                "User service failed",
                e
            );
        }
    }

    public static void main(String[] args) {

        try {

            serviceOperation();

        } catch (RuntimeException e) {

            System.out.println(
                e.getMessage()
            );

            System.out.println(
                "Cause: "
                + e.getCause().getMessage()
            );
        }
    }
}`
      },
      output: `User service failed
Cause: Database operation failed`
    },

    {
      id: "common-mistakes",
      title: "21. Common Mistakes",
      paragraphs: [
        "There are several mistakes developers commonly make when using throw."
      ],
      bullets: [
        "Mistake: Confusing throw with throws.",
        "Mistake: Throwing a checked exception without catching or declaring it.",
        "Mistake: Using a very generic exception when a meaningful specific exception exists.",
        "Mistake: Creating custom exceptions without useful messages.",
        "Mistake: Throwing exceptions for normal program flow.",
        "Mistake: Catching an exception and silently ignoring it.",
        "Mistake: Creating a new exception and losing the original cause.",
        "Mistake: Using return codes when an exceptional condition is better represented by an exception.",
        "Mistake: Throwing NullPointerException manually when a clearer exception such as IllegalArgumentException would better describe invalid input."
      ],
      code: {
        language: "java",
        code: `// Prefer this:

if (age < 18) {
    throw new IllegalArgumentException(
        "Age must be at least 18"
    );
}

// Instead of deliberately causing
// a NullPointerException.`
      }
    },

    {
      id: "best-practices",
      title: "22. Best Practices for throw",
      paragraphs: [
        "The throw keyword is powerful, but exceptions should be used deliberately."
      ],
      bullets: [
        "Throw exceptions when an operation cannot reasonably continue.",
        "Use specific exception types.",
        "Use meaningful exception messages.",
        "Validate method arguments early when appropriate.",
        "Create custom exceptions for meaningful domain-specific failures.",
        "Preserve the original cause when translating exceptions between layers.",
        "Do not use exceptions for ordinary control flow.",
        "Use checked exceptions when callers should explicitly handle or propagate the condition.",
        "Use unchecked exceptions when the failure represents invalid input, programming misuse, or invalid state.",
        "Do not expose unnecessary low-level implementation details through higher application layers."
      ]
    },

    {
      id: "key-points",
      title: "23. Key Points",
      paragraphs: [
        "The throw keyword allows Java developers to explicitly create and throw exceptions when an application detects an exceptional condition."
      ],
      bullets: [
        "throw explicitly throws an exception object.",
        "throw is normally used inside a method body.",
        "A thrown exception stops normal execution at that point.",
        "A matching catch block can handle the exception.",
        "If there is no matching handler, the exception propagates to the caller.",
        "Checked exceptions thrown using throw must generally be caught or declared.",
        "Unchecked exceptions do not require catch-or-declare handling.",
        "throw and throws have different purposes.",
        "throw performs the throwing operation.",
        "throws declares possible exception propagation.",
        "Custom checked exceptions extend Exception.",
        "Custom unchecked exceptions extend RuntimeException.",
        "throw is commonly used for validation and business rules.",
        "Exceptions can be rethrown after logging or partial handling.",
        "Exception chaining can preserve the original cause."
      ]
    },

    {
      id: "interview-questions",
      title: "24. Interview Questions",
      interviewQuestions: [
        {
          question: "What is throw in Java?",
          answer:
            "throw is a Java keyword used to explicitly throw an exception object from program code."
        },
        {
          question: "What is the syntax of throw?",
          answer:
            "The basic syntax is throw new ExceptionType(\"message\");"
        },
        {
          question: "Can we throw a checked exception using throw?",
          answer:
            "Yes. A checked exception can be thrown explicitly, but the method must generally catch it or declare it using throws."
        },
        {
          question: "Can we throw an unchecked exception using throw?",
          answer:
            "Yes. RuntimeException and its subclasses can be thrown explicitly, and the compiler does not require them to be caught or declared."
        },
        {
          question: "What is the difference between throw and throws?",
          answer:
            "throw actually throws an exception object inside a method body. throws declares in a method signature that the method may propagate one or more exceptions."
        },
        {
          question: "Can we use throw and throws together?",
          answer:
            "Yes. A method can use throw to actually throw an exception and throws to declare a checked exception that may propagate."
        },
        {
          question: "Can throw be used without new?",
          answer:
            "Yes, if an existing exception object is available. For example, inside a catch block you can use throw e; to rethrow the same exception."
        },
        {
          question: "What is rethrowing?",
          answer:
            "Rethrowing means throwing an existing exception object again, commonly using throw e inside a catch block."
        },
        {
          question: "What is a custom exception?",
          answer:
            "A custom exception is a developer-defined exception class created by extending Exception, RuntimeException, or another suitable exception type."
        },
        {
          question: "How do you create a custom checked exception?",
          answer:
            "Create a class that extends Exception."
        },
        {
          question: "How do you create a custom unchecked exception?",
          answer:
            "Create a class that extends RuntimeException."
        },
        {
          question: "Why is throw commonly used in validation?",
          answer:
            "It allows a method to immediately report invalid input instead of continuing with invalid data."
        },
        {
          question: "What happens after throw executes?",
          answer:
            "Normal execution stops at the throw statement and Java searches for a matching exception handler. If none exists in the current method, the exception can propagate to the caller."
        },
        {
          question: "Can we throw multiple exceptions using one throw statement?",
          answer:
            "One throw statement throws one exception object. A method can contain multiple throw statements and can declare multiple exception types using throws."
        },
        {
          question: "Can a method throw RuntimeException without declaring it?",
          answer:
            "Yes. RuntimeException is unchecked, so the compiler does not require it to be declared."
        },
        {
          question: "Can a method throw IOException without declaring it?",
          answer:
            "Only if IOException is caught within the method or the method declares it with throws. IOException is checked."
        },
        {
          question: "What is the difference between throwing a new exception and rethrowing?",
          answer:
            "Throwing a new exception creates a new exception object. Rethrowing sends an existing exception object to the caller."
        },
        {
          question: "What is exception chaining?",
          answer:
            "Exception chaining means creating or throwing another exception while preserving the original exception as its cause."
        },
        {
          question: "Why should exception messages be meaningful?",
          answer:
            "Meaningful messages make debugging, logging, and diagnosing application failures easier."
        },
        {
          question: "Should exceptions be used for normal control flow?",
          answer:
            "Generally no. Exceptions should represent exceptional conditions rather than ordinary expected program flow."
        }
      ]
    }
  ]
};