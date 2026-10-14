export const advancedExceptionHandling = {
  id: "advanced-exception-handling",
  slug: "advanced-exception-handling",
  title: "Advanced Exception Handling in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Learn advanced Java exception-handling techniques including try-with-resources, AutoCloseable, suppressed exceptions, multi-catch, precise rethrow, exception chaining, resource cleanup, Spring Boot global exception handling, best practices, and interview questions.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "advanced-overview",
      title: "1. What is Advanced Exception Handling?",
      paragraphs: [
        "Basic exception handling uses try, catch, finally, throw, and throws. Advanced exception handling focuses on writing reliable, maintainable applications where exceptions, resources, and application layers are handled correctly.",
        "Important advanced concepts include try-with-resources, AutoCloseable, suppressed exceptions, multi-catch, precise rethrow, exception chaining, centralized exception handling, and proper logging."
      ],
      bullets: [
        "Resource-safe exception handling",
        "Try-with-resources",
        "AutoCloseable",
        "Suppressed exceptions",
        "Multi-catch",
        "Precise rethrow",
        "Exception chaining",
        "Global exception handling",
        "Exception logging",
        "Exception-handling best practices"
      ]
    },

    {
      id: "try-with-resources",
      title: "2. try-with-resources",
      paragraphs: [
        "Try-with-resources is a Java feature used to automatically close resources after they are no longer needed.",
        "It is especially useful for resources such as files, streams, database resources, and network resources that implement AutoCloseable or Closeable."
      ],
      code: {
        language: "java",
        code: `try (FileReader reader =
        new FileReader("data.txt")) {

    int data = reader.read();

} catch (IOException e) {

    System.out.println(
        "Unable to read file"
    );
}`
      },
      bullets: [
        "The resource is declared inside parentheses after try.",
        "Java automatically closes the resource.",
        "The resource must implement AutoCloseable.",
        "Explicit finally-based cleanup is usually unnecessary."
      ]
    },

    {
      id: "why-try-with-resources",
      title: "3. Why Use try-with-resources?",
      paragraphs: [
        "Before try-with-resources, developers commonly created resources inside try and closed them inside finally.",
        "This approach required more code and could become difficult to maintain when multiple resources were involved."
      ],
      code: {
        language: "java",
        code: `// Older approach

FileReader reader = null;

try {
    reader = new FileReader("data.txt");

} catch (IOException e) {

    System.out.println("Read failed");

} finally {

    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            System.out.println(
                "Close failed"
            );
        }
    }
}`
      },
      bullets: [
        "More boilerplate code.",
        "Cleanup code can become complicated.",
        "Closing a resource can itself throw an exception.",
        "try-with-resources makes cleanup safer and shorter."
      ]
    },

    {
      id: "autocloseable",
      title: "4. AutoCloseable Interface",
      paragraphs: [
        "The AutoCloseable interface is the foundation of try-with-resources.",
        "A class implementing AutoCloseable provides a close() method that Java can automatically call when the try block finishes."
      ],
      code: {
        language: "java",
        code: `class MyResource implements AutoCloseable {

    public void use() {
        System.out.println(
            "Using resource"
        );
    }

    @Override
    public void close() {
        System.out.println(
            "Resource closed"
        );
    }
}

public class Demo {

    public static void main(String[] args) {

        try (MyResource resource =
                new MyResource()) {

            resource.use();
        }
    }
}`
      },
      output: `Using resource
Resource closed`,
      bullets: [
        "AutoCloseable defines close().",
        "try-with-resources calls close() automatically.",
        "Custom resources can implement AutoCloseable."
      ]
    },

    {
      id: "close-execution",
      title: "5. When Does close() Execute?",
      paragraphs: [
        "The close() method executes automatically when execution leaves the try-with-resources block.",
        "This happens whether the try block completes normally or an exception occurs."
      ],
      code: {
        language: "java",
        code: `try (MyResource resource =
        new MyResource()) {

    System.out.println("Inside try");

    throw new RuntimeException(
        "Something failed"
    );
} catch (RuntimeException e) {

    System.out.println(
        "Exception handled"
    );
}`
      },
      output: `Inside try
Resource closed
Exception handled`,
      bullets: [
        "The try block starts execution.",
        "An exception occurs.",
        "The resource is closed.",
        "The catch block handles the exception."
      ]
    },

    {
      id: "multiple-resources",
      title: "6. Multiple Resources in try-with-resources",
      paragraphs: [
        "Multiple resources can be declared in the same try-with-resources statement.",
        "Java closes them automatically in reverse order of creation."
      ],
      code: {
        language: "java",
        code: `try (
    FileReader reader =
        new FileReader("input.txt");

    FileWriter writer =
        new FileWriter("output.txt")
) {

    int data = reader.read();

    writer.write(data);
}`
      },
      bullets: [
        "Multiple resources are separated by semicolons.",
        "All resources are automatically closed.",
        "Resources are closed in reverse order.",
        "The last resource created is closed first."
      ]
    },

    {
      id: "resource-closing-order",
      title: "7. Resource Closing Order",
      paragraphs: [
        "When multiple resources are declared, Java closes them in the reverse order of declaration.",
        "This follows a stack-like cleanup model."
      ],
      code: {
        language: "java",
        code: `try (
    MyResource first =
        new MyResource();

    MyResource second =
        new MyResource();

    MyResource third =
        new MyResource()
) {

    System.out.println("Using resources");
}`
      },
      bullets: [
        "first is created first.",
        "second is created second.",
        "third is created last.",
        "third is closed first.",
        "second is closed second.",
        "first is closed last."
      ]
    },

    {
      id: "suppressed-exceptions",
      title: "8. Suppressed Exceptions",
      paragraphs: [
        "A suppressed exception occurs when an exception is already being thrown from the try block and another exception occurs while closing a resource.",
        "In this situation, the exception from the try block remains the primary exception and the exception from close() becomes suppressed."
      ],
      code: {
        language: "java",
        code: `class Resource implements AutoCloseable {

    @Override
    public void close() {
        throw new RuntimeException(
            "Close failed"
        );
    }
}

public static void main(String[] args) {

    try (Resource resource =
            new Resource()) {

        throw new RuntimeException(
            "Try failed"
        );

    } catch (RuntimeException e) {

        System.out.println(
            e.getMessage()
        );

        for (Throwable suppressed :
                e.getSuppressed()) {

            System.out.println(
                suppressed.getMessage()
            );
        }
    }
}`
      },
      output: `Try failed
Close failed`,
      bullets: [
        "The try-block exception is the primary exception.",
        "The close() exception becomes suppressed.",
        "getSuppressed() returns suppressed exceptions."
      ]
    },

    {
      id: "get-suppressed",
      title: "9. getSuppressed()",
      paragraphs: [
        "Throwable provides the getSuppressed() method to retrieve exceptions that were suppressed during exception handling."
      ],
      code: {
        language: "java",
        code: `catch (Exception e) {

    Throwable[] suppressed =
        e.getSuppressed();

    for (Throwable exception :
            suppressed) {

        System.out.println(
            exception.getMessage()
        );
    }
}`
      },
      bullets: [
        "getSuppressed() returns an array.",
        "There can be zero or more suppressed exceptions.",
        "Suppressed exceptions are especially relevant to try-with-resources."
      ]
    },

    {
      id: "multi-catch",
      title: "10. Multi-Catch",
      paragraphs: [
        "Multi-catch allows multiple exception types to be handled by a single catch block using the | operator.",
        "It was introduced in Java 7."
      ],
      code: {
        language: "java",
        code: `try {
    processData();

} catch (
    IOException |
    SQLException e
) {

    System.out.println(
        "Operation failed"
    );
}`
      },
      bullets: [
        "Use | between exception types.",
        "One catch block handles multiple exception types.",
        "It reduces duplicate handling code.",
        "The caught variable is implicitly final."
      ]
    },

    {
      id: "multi-catch-rules",
      title: "11. Multi-Catch Rules",
      paragraphs: [
        "Multi-catch has several important rules that are commonly asked in interviews."
      ],
      code: {
        language: "java",
        code: `try {
    process();

} catch (
    IOException |
    SQLException e
) {
    System.out.println(e.getMessage());
}`
      },
      bullets: [
        "The exception types cannot have a parent-child relationship.",
        "For example, IOException | FileNotFoundException is invalid.",
        "The catch variable cannot be reassigned.",
        "The same handling logic should generally apply to all listed exceptions."
      ]
    },

    {
      id: "precise-rethrow",
      title: "12. Precise Rethrow",
      paragraphs: [
        "Precise rethrow allows the Java compiler to determine the more specific checked exceptions that can actually be thrown from a try block.",
        "This became possible with improved exception analysis introduced in Java 7."
      ],
      code: {
        language: "java",
        code: `public void process()
        throws IOException, SQLException {

    try {

        if (System.currentTimeMillis() % 2 == 0) {
            throw new IOException();
        } else {
            throw new SQLException();
        }

    } catch (Exception e) {

        throw e;
    }
}`
      },
      bullets: [
        "The method catches Exception.",
        "The compiler can determine that the try block throws IOException or SQLException.",
        "The method can therefore declare those specific checked exceptions instead of simply declaring Exception.",
        "This is called precise rethrow."
      ]
    },

    {
      id: "exception-chaining",
      title: "13. Exception Chaining",
      paragraphs: [
        "Exception chaining connects one exception to another by preserving the original exception as the cause.",
        "This is particularly useful when translating low-level technical failures into application-level exceptions."
      ],
      code: {
        language: "java",
        code: `try {
    loadConfiguration();

} catch (IOException e) {

    throw new RuntimeException(
        "Configuration loading failed",
        e
    );
}`
      },
      bullets: [
        "The new exception gives meaningful application context.",
        "The original exception remains available.",
        "getCause() can retrieve the original exception.",
        "Stack traces can show the complete failure chain."
      ]
    },

    {
      id: "cause-chain",
      title: "14. Inspecting the Exception Cause",
      paragraphs: [
        "The getCause() method can be used to inspect the exception that caused another exception."
      ],
      code: {
        language: "java",
        code: `try {
    process();

} catch (RuntimeException e) {

    Throwable cause = e.getCause();

    if (cause != null) {
        System.out.println(
            "Root cause: " +
            cause.getMessage()
        );
    }
}`
      },
      bullets: [
        "getCause() returns the original cause.",
        "The cause can be null.",
        "Cause chains help diagnose failures across application layers."
      ]
    },

    {
      id: "custom-autocloseable",
      title: "15. Custom AutoCloseable Resource",
      paragraphs: [
        "Application developers can create their own resources that work with try-with-resources by implementing AutoCloseable."
      ],
      code: {
        language: "java",
        code: `class DatabaseConnection
        implements AutoCloseable {

    public void connect() {
        System.out.println(
            "Connected"
        );
    }

    public void executeQuery() {
        System.out.println(
            "Executing query"
        );
    }

    @Override
    public void close() {
        System.out.println(
            "Connection closed"
        );
    }
}

public static void main(String[] args) {

    try (
        DatabaseConnection connection =
            new DatabaseConnection()
    ) {

        connection.connect();
        connection.executeQuery();
    }
}`
      },
      output: `Connected
Executing query
Connection closed`,
      bullets: [
        "The resource owns cleanup logic.",
        "The caller does not need to explicitly call close().",
        "This pattern makes resource ownership clearer."
      ]
    },

    {
      id: "resource-management",
      title: "16. Exception Handling and Resource Management",
      paragraphs: [
        "Exception handling is closely related to resource management. Resources such as files, streams, sockets, and database objects should be released reliably.",
        "Failing to release resources can cause memory pressure, file-lock problems, connection exhaustion, or other application failures."
      ],
      bullets: [
        "Use try-with-resources for AutoCloseable resources.",
        "Avoid manual cleanup when try-with-resources can be used.",
        "Do not ignore exceptions during resource cleanup.",
        "Release resources as close to their ownership boundary as possible.",
        "Keep resource lifetimes as short as practical."
      ]
    },

    {
      id: "spring-global-exception",
      title: "17. Advanced Spring Boot Global Exception Handling",
      paragraphs: [
        "In Spring Boot REST applications, exception handling is often centralized using @RestControllerAdvice.",
        "A global handler can convert different custom exceptions into a consistent ErrorResponse structure."
      ],
      code: {
        language: "java",
        code: `public record ErrorResponse(
    String code,
    String message,
    String path
) {
}

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse>
    handleUserNotFound(
            UserNotFoundException ex,
            HttpServletRequest request) {

        ErrorResponse response =
            new ErrorResponse(
                "USER_NOT_FOUND",
                ex.getMessage(),
                request.getRequestURI()
            );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
    }
}`
      },
      bullets: [
        "The exception handler centralizes error processing.",
        "The response contains structured error information.",
        "The client receives a predictable API format.",
        "Different exception types can map to different HTTP status codes."
      ]
    },

    {
      id: "spring-layered-flow",
      title: "18. Advanced Exception Flow in Spring Boot",
      paragraphs: [
        "A production-style Spring Boot application can use exception propagation and centralized handling across multiple layers."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Controller
     |
     v
Service
     |
     v
Repository
     |
     v
Database
     |
     | Exception
     v
Repository
     |
     v
Service
     |
     | Translate / Propagate
     v
Custom Exception
     |
     v
@RestControllerAdvice
     |
     v
ErrorResponse
     |
     v
HTTP Response`
      },
      bullets: [
        "Repository handles database interaction.",
        "Service handles business logic.",
        "Low-level exceptions can be translated when appropriate.",
        "Custom exceptions communicate domain failures.",
        "Global exception handling creates consistent REST responses."
      ]
    },

    {
      id: "logging-exceptions",
      title: "19. Logging Exceptions Correctly",
      paragraphs: [
        "Logging is an important part of production exception handling. A log should provide enough information to diagnose the problem without unnecessarily exposing sensitive data.",
        "When logging an exception, pass the exception object to the logger so that the stack trace is preserved."
      ],
      code: {
        language: "java",
        code: `try {
    processOrder();

} catch (OrderProcessingException e) {

    logger.error(
        "Order processing failed",
        e
    );

    throw e;
}`
      },
      bullets: [
        "Preserve the stack trace.",
        "Do not log sensitive information such as passwords or tokens.",
        "Avoid logging the same exception repeatedly at every layer.",
        "Log meaningful context such as an operation or safe identifier."
      ]
    },

    {
      id: "do-not-swallow",
      title: "20. Never Swallow Exceptions",
      paragraphs: [
        "Swallowing an exception means catching it and doing nothing meaningful with it.",
        "This can hide serious failures and make debugging extremely difficult."
      ],
      code: {
        language: "java",
        code: `// Bad

try {
    processOrder();

} catch (Exception e) {
    // Do nothing
}`
      },
      bullets: [
        "The failure disappears silently.",
        "The caller may incorrectly assume the operation succeeded.",
        "Production debugging becomes difficult.",
        "Either handle the exception meaningfully, translate it, rethrow it, or propagate it."
      ]
    },

    {
      id: "broad-catch",
      title: "21. Avoid Unnecessary Broad Catch Blocks",
      paragraphs: [
        "Catching Exception or Throwable everywhere can hide the actual problem and make error handling less precise.",
        "Catch the most appropriate exception type when the application knows how to handle it."
      ],
      code: {
        language: "java",
        code: `// Prefer specific handling

try {
    readFile();

} catch (IOException e) {

    logger.error(
        "Unable to read file",
        e
    );
}`
      },
      bullets: [
        "Prefer specific exceptions when possible.",
        "Avoid catch(Throwable) in normal application code.",
        "Do not use catch(Exception) as a replacement for understanding failures.",
        "A global handler may intentionally handle broad categories at an application boundary."
      ]
    },

    {
      id: "finally-vs-resources",
      title: "22. finally vs try-with-resources",
      paragraphs: [
        "Both finally and try-with-resources can be used for cleanup, but they serve different purposes.",
        "For AutoCloseable resources, try-with-resources is generally the preferred mechanism because Java manages closing order and suppressed exceptions automatically."
      ],
      code: {
        language: "java",
        code: `// Preferred for resources

try (FileReader reader =
        new FileReader("data.txt")) {

    reader.read();

} catch (IOException e) {

    System.out.println(
        "File operation failed"
    );
}`
      },
      bullets: [
        "finally is useful for general cleanup logic.",
        "try-with-resources is designed specifically for resource management.",
        "try-with-resources automatically closes AutoCloseable resources.",
        "It also handles suppressed exceptions correctly."
      ]
    },

    {
      id: "advanced-mistakes",
      title: "23. Common Advanced Exception Handling Mistakes",
      paragraphs: [
        "Advanced exception handling requires careful design. The following mistakes commonly appear in production applications and interviews."
      ],
      bullets: [
        "Using finally instead of try-with-resources for AutoCloseable resources.",
        "Ignoring suppressed exceptions.",
        "Using catch(Exception) everywhere.",
        "Catching Throwable without a very specific reason.",
        "Swallowing exceptions.",
        "Logging and rethrowing the same exception at every layer.",
        "Losing the original cause during exception translation.",
        "Using exceptions as normal control flow.",
        "Returning inconsistent error responses from REST APIs.",
        "Putting all business validation inside controllers.",
        "Creating too many unnecessary custom exceptions.",
        "Exposing internal database or stack-trace details directly to API clients."
      ]
    },

    {
      id: "best-practices",
      title: "24. Exception Handling Best Practices",
      paragraphs: [
        "Good exception handling should make failures understandable, recoverable where possible, and diagnosable without exposing unnecessary internal details."
      ],
      bullets: [
        "Use specific exception types.",
        "Use try-with-resources for resource management.",
        "Preserve original causes when translating exceptions.",
        "Create custom exceptions for meaningful domain failures.",
        "Handle exceptions at the appropriate layer.",
        "Use centralized exception handling for REST APIs.",
        "Return consistent API error responses.",
        "Do not expose stack traces to clients.",
        "Do not swallow exceptions silently.",
        "Avoid using exceptions for normal program flow.",
        "Log exceptions with useful context.",
        "Avoid logging sensitive information.",
        "Keep exception classes simple and focused.",
        "Document exceptional behavior when it is important to callers."
      ]
    },

    {
      id: "key-points-interview",
      title: "25. Key Points and Interview Questions",
      paragraphs: [
        "Advanced exception handling combines Java language features with good application architecture. The most important goal is to handle failures safely while preserving enough information to diagnose the root cause."
      ],
      bullets: [
        "try-with-resources automatically closes AutoCloseable resources.",
        "Resources are closed in reverse declaration order.",
        "Suppressed exceptions can be retrieved using getSuppressed().",
        "Multi-catch handles multiple exception types with one catch block.",
        "Multi-catch types cannot have a parent-child relationship.",
        "Precise rethrow allows more specific checked exception analysis.",
        "Exception chaining preserves the original cause.",
        "Custom resources can implement AutoCloseable.",
        "Spring Boot commonly uses @RestControllerAdvice for centralized REST exception handling.",
        "Exceptions should not be silently swallowed.",
        "Specific exception handling is preferred over unnecessary broad catches.",
        "try-with-resources is generally preferred for AutoCloseable resource cleanup."
      ],
      interviewQuestions: [
        {
          question: "What is try-with-resources?",
          answer:
            "Try-with-resources is a Java feature that automatically closes resources implementing AutoCloseable when execution leaves the try block."
        },
        {
          question: "Which interface is required for try-with-resources?",
          answer:
            "The resource must implement AutoCloseable. Closeable is a related subinterface commonly used by I/O resources."
        },
        {
          question: "When is the close() method called?",
          answer:
            "The resource is automatically closed when execution leaves the try-with-resources block, whether execution completes normally or because of an exception."
        },
        {
          question: "In what order are multiple resources closed?",
          answer:
            "They are closed in reverse order of their declaration. The last resource created is closed first."
        },
        {
          question: "What is a suppressed exception?",
          answer:
            "It is an exception that occurs while closing a resource when another exception is already being thrown from the try block. The close exception becomes suppressed."
        },
        {
          question: "How can you retrieve suppressed exceptions?",
          answer:
            "Use Throwable's getSuppressed() method."
        },
        {
          question: "What is multi-catch?",
          answer:
            "Multi-catch allows a single catch block to handle multiple exception types using the | operator."
        },
        {
          question: "Can multi-catch contain parent and child exceptions?",
          answer:
            "No. Exception types in a multi-catch cannot have a parent-child relationship because the parent type would already cover the child type."
        },
        {
          question: "What is precise rethrow?",
          answer:
            "Precise rethrow is Java's ability to determine the more specific checked exceptions that can actually be thrown from a try block even when the catch parameter has a broader type."
        },
        {
          question: "What is exception chaining?",
          answer:
            "Exception chaining preserves one exception as the cause of another exception, allowing higher-level code to add context without losing the original failure."
        },
        {
          question: "Why is try-with-resources better than manual finally cleanup?",
          answer:
            "It reduces boilerplate, automatically closes resources, handles multiple resources safely, and correctly manages suppressed exceptions."
        },
        {
          question: "Can a custom class be used with try-with-resources?",
          answer:
            "Yes. The class can implement AutoCloseable and provide its cleanup logic in close()."
        },
        {
          question: "What happens if close() throws an exception?",
          answer:
            "If there is already a primary exception from the try block, the close exception becomes suppressed. If there is no primary exception, the close exception can become the primary exception."
        },
        {
          question: "Why should we avoid catch(Throwable)?",
          answer:
            "Throwable includes both Exception and Error. Catching it broadly can interfere with serious JVM-level errors that application code normally should not attempt to recover from."
        },
        {
          question: "Why should exceptions not be swallowed?",
          answer:
            "Swallowing exceptions hides failures, can make the application appear successful when it is not, and makes debugging extremely difficult."
        },
        {
          question: "What is the role of @RestControllerAdvice?",
          answer:
            "@RestControllerAdvice provides centralized exception handling for REST controllers and allows consistent HTTP error responses."
        },
        {
          question: "What is the difference between @ExceptionHandler and @RestControllerAdvice?",
          answer:
            "@ExceptionHandler identifies a method that handles a particular exception, while @RestControllerAdvice provides centralized controller exception handling across REST controllers."
        },
        {
          question: "Should stack traces be returned to API clients?",
          answer:
            "Normally no. Stack traces and internal implementation details should be logged securely on the server while the client receives a controlled error response."
        },
        {
          question: "Why is exception chaining important in Spring Boot applications?",
          answer:
            "It allows service or infrastructure exceptions to be translated into meaningful application exceptions while preserving the original cause for debugging."
        },
        {
          question: "What is the recommended approach for closing database or file resources?",
          answer:
            "Use APIs that support automatic resource management and use try-with-resources whenever the resource implements AutoCloseable."
        }
      ]
    }
  ]
};