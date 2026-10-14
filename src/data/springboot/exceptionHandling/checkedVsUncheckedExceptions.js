
export const checkedVsUncheckedExceptions = {
  id: 702,

  title: "Checked vs Unchecked Exceptions",

  slug: "checked-vs-unchecked-exceptions",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand checked exceptions, unchecked exceptions, RuntimeException, exception hierarchy, exception propagation, and how exception types affect Java and Spring Boot applications.",

  estimatedTime: "35 min",

  sections: [
    {
      id: "exception-types",

      title: "Types of Exceptions in Java",

      paragraphs: [
        "An exception is an event that interrupts the normal execution of a Java program. Exceptions can occur because of invalid input, file access failures, database problems, network issues, or programming mistakes.",

        "Java organizes exceptions using a class hierarchy. Throwable is the root class for objects that can be thrown. Its two main subclasses are Error and Exception. Errors generally represent serious JVM or environment problems, while Exception represents conditions applications may need to handle.",

        "Java exceptions are commonly divided into checked exceptions and unchecked exceptions. The important distinction is whether the compiler requires the programmer to catch the exception or declare it using throws.",

        "Checked exceptions are generally subclasses of Exception that are not subclasses of RuntimeException. Unchecked exceptions include RuntimeException and its subclasses. Error and its subclasses are also unchecked in the Java language sense, although Errors are normally not treated as ordinary application exceptions."
      ],

      code: {
        language: "text",
        code: `Throwable
|
+-- Error
|   +-- OutOfMemoryError
|   +-- StackOverflowError
|
+-- Exception
    |
    +-- IOException
    +-- SQLException
    |
    +-- RuntimeException
        +-- NullPointerException
        +-- IllegalArgumentException
        +-- IllegalStateException
        +-- ArithmeticException`
      },

      bullets: [
        "Throwable is the root class of Java's throwable hierarchy.",
        "Exception represents conditions that applications may handle.",
        "Checked exceptions require handling or declaration under Java's compile-time rules.",
        "RuntimeException and its subclasses are unchecked.",
        "Error and its subclasses are also unchecked, but normally should not be caught as routine application failures."
      ]
    },

    {
      id: "checked",

      title: "Checked Exceptions",

      paragraphs: [
        "A checked exception is an exception that the Java compiler checks at compile time. When a method can throw a checked exception, the caller generally must catch it or declare it in its own throws clause.",

        "Checked exceptions are useful when an operation can fail for a reason that the calling code may reasonably be able to handle. Examples include reading a file, accessing a database through JDBC, or working with certain input and output operations.",

        "For example, FileReader can throw FileNotFoundException, which is a subclass of IOException. The code below declares IOException using throws. The declaration allows the exception to propagate to the caller; it does not handle the exception itself.",

        "A throws declaration describes a possible exception contract. A throw statement actually throws an exception object."
      ],

      code: {
        language: "java",
        code: `import java.io.FileReader;
import java.io.IOException;

public class FileService {

    public void readFile() throws IOException {

        try (FileReader reader =
                 new FileReader("employee.txt")) {

            int character;

            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }
        }
    }
}`
      },

      bullets: [
        "The compiler checks whether checked exceptions are handled or declared.",
        "A method can handle an exception with try-catch.",
        "A method can propagate an exception using throws.",
        "IOException, SQLException, and ClassNotFoundException are common checked exceptions.",
        "Try-with-resources automatically closes resources that implement AutoCloseable."
      ]
    },

    {
      id: "checked-handling",

      title: "Handling Checked Exceptions with try-catch",

      paragraphs: [
        "Instead of propagating a checked exception, a method can catch it and decide how to respond. For example, a file-reading method might return a meaningful message or use a fallback when a configuration file cannot be read.",

        "Catching an exception should involve a meaningful recovery action, useful logging, or translation into an appropriate application-level exception. Catching an exception and silently ignoring it can hide failures."
      ],

      code: {
        language: "java",
        code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ConfigurationService {

    public String readFirstLine() {

        try (BufferedReader reader =
                 new BufferedReader(
                     new FileReader("config.txt"))) {

            return reader.readLine();

        } catch (IOException exception) {

            System.err.println(
                "Unable to read configuration: "
                    + exception.getMessage()
            );

            return "default configuration";
        }
    }
}`
      },

      bullets: [
        "Use try-catch when the current method can recover or provide a sensible fallback.",
        "Use throws when the caller is better positioned to decide how to handle the failure.",
        "Do not return misleading default values if doing so would hide a critical failure.",
        "Prefer a logging framework over System.err in production applications."
      ]
    },

    {
      id: "unchecked",

      title: "Unchecked Exceptions",

      paragraphs: [
        "Unchecked exceptions are exceptions that the compiler does not require the developer to catch or declare. Most application code discusses unchecked exceptions through RuntimeException and its subclasses.",

        "They commonly indicate invalid arguments, incorrect object state, missing required values, or programming errors. They can also represent application-specific failures when that design is appropriate.",

        "An unchecked exception can still be caught with try-catch. Unchecked does not mean that the exception cannot be handled; it means handling is not enforced by the compiler."
      ],

      code: {
        language: "java",
        code: `public class EmployeeService {

    public Employee getEmployee(Long id) {

        if (id == null) {
            throw new IllegalArgumentException(
                "Employee id cannot be null"
            );
        }

        // Retrieve and return the employee.
        return findEmployee(id);
    }

    private Employee findEmployee(Long id) {
        // Example placeholder for retrieval logic.
        return new Employee(id, "Venkatesh");
    }
}

class Employee {

    private final Long id;
    private final String name;

    public Employee(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}`
      },

      bullets: [
        "The compiler does not require catch or throws for RuntimeException subclasses.",
        "Unchecked exceptions can propagate through multiple method calls.",
        "IllegalArgumentException is appropriate for an invalid method argument.",
        "IllegalStateException can represent an operation that is invalid for the current object state.",
        "NullPointerException often indicates an unexpected null reference.",
        "Do not use unchecked exceptions as a reason to ignore input validation or error handling."
      ]
    },

    {
      id: "runtime",

      title: "RuntimeException",

      paragraphs: [
        "RuntimeException is a subclass of Exception and is the parent class of many unchecked exceptions. Classes that extend RuntimeException do not need to be caught or declared by callers.",

        "Java provides RuntimeException subclasses such as NullPointerException, IllegalArgumentException, IllegalStateException, and ArithmeticException. Applications can also define custom subclasses to represent domain-specific failures.",

        "In Spring Boot applications, custom RuntimeException classes are frequently used for conditions such as an employee not being found, an order being invalid, or a business operation violating a rule."
      ],

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(String message) {
        super(message);
    }
}`
      },

      bullets: [
        "RuntimeException extends Exception.",
        "Its subclasses are unchecked exceptions.",
        "Custom runtime exceptions can give application failures meaningful names.",
        "The exception class communicates the failure category; a handler determines how to translate it into an API response.",
        "Throwing an exception does not automatically produce a well-designed HTTP response. Spring MVC exception handling is responsible for that translation."
      ]
    },

    {
      id: "spring-approach",

      title: "Which Approach is Common in Spring Boot?",

      paragraphs: [
        "Spring Boot applications commonly use unchecked exceptions for service-layer failures, including many business-rule violations and resource lookup failures. A custom RuntimeException can communicate a meaningful condition without requiring every calling method to add a checked exception declaration.",

        "For example, an EmployeeService may throw EmployeeNotFoundException when an employee ID does not exist. A centralized exception handler can translate this exception into an HTTP 404 Not Found response.",

        "This is a common design, not a rule that every Spring Boot exception must be unchecked. Checked exceptions can still be appropriate when callers can reasonably recover from the failure or when an underlying API exposes a checked exception contract.",

        "Choose an exception type based on the failure and the handling responsibility. Do not wrap every checked exception in RuntimeException without considering whether the caller needs to recover, retry, or distinguish the failure."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee getEmployee(Long id) {

        if (id == null) {
            throw new IllegalArgumentException(
                "Employee id must not be null"
            );
        }

        return employeeRepository.findById(id)
            .orElseThrow(() ->
                new EmployeeNotFoundException(
                    "Employee not found with id: " + id
                )
            );
    }
}`
      },

      bullets: [
        "Use IllegalArgumentException for invalid method arguments.",
        "Use IllegalStateException when the operation is invalid for the current state.",
        "Use a custom exception for a meaningful domain or application failure.",
        "Use a centralized handler such as @RestControllerAdvice to format REST error responses.",
        "Avoid exposing stack traces, database details, or sensitive internal information to API clients.",
        "Preserve the original cause when wrapping an exception so diagnostic information is not lost."
      ]
    },

    {
      id: "spring-custom-exception",

      title: "Creating a Custom Runtime Exception in Spring Boot",

      paragraphs: [
        "A custom exception gives a specific name to a failure that matters to the application. Instead of throwing a generic RuntimeException, an employee service can throw EmployeeNotFoundException to communicate exactly what went wrong.",

        "The following example shows a small exception class. It can be used by the service layer and handled centrally by Spring MVC."
      ],

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(String message) {
        super(message);
    }

    public EmployeeNotFoundException(
            String message,
            Throwable cause) {
        super(message, cause);
    }
}`
      },

      bullets: [
        "Extend RuntimeException when the failure should be unchecked.",
        "Pass a useful message to the superclass constructor.",
        "Add a cause constructor when translating an underlying exception.",
        "Keep exception names specific and meaningful.",
        "Do not create a separate custom exception for every trivial condition unless it improves clarity."
      ]
    },

    {
      id: "spring-global-handler",

      title: "Handling Exceptions with @RestControllerAdvice",

      paragraphs: [
        "A REST API should return a predictable response when an exception occurs. Spring MVC supports centralized exception handling through @RestControllerAdvice and @ExceptionHandler.",

        "The example below maps EmployeeNotFoundException to HTTP 404 and invalid arguments to HTTP 400. This keeps response formatting out of individual controller methods.",

        "The response DTO shown here is a simple example. In a production API, use a consistent error structure across endpoints and consider Spring's ProblemDetail support where appropriate."
      ],

      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            EmployeeNotFoundException exception) {

        ApiError error = new ApiError(
            404,
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleBadRequest(
            IllegalArgumentException exception) {

        ApiError error = new ApiError(
            400,
            exception.getMessage()
        );

        return ResponseEntity
            .badRequest()
            .body(error);
    }
}

class ApiError {

    private final int status;
    private final String message;

    public ApiError(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}`
      },

      bullets: [
        "@RestControllerAdvice provides centralized REST exception handling.",
        "@ExceptionHandler selects a handler for a particular exception type.",
        "HTTP 404 is appropriate when a requested resource does not exist.",
        "HTTP 400 is commonly used when the request or supplied argument is invalid.",
        "Unexpected server failures generally need a safe HTTP 500 response and server-side diagnostics.",
        "Avoid returning internal exception messages to clients when they may expose sensitive information."
      ]
    },

    {
      id: "exception-propagation",

      title: "How Exceptions Propagate Through Java Methods",

      paragraphs: [
        "When a method throws an exception, Java looks for a matching catch block in the current method. If no matching handler exists, the exception propagates to the calling method. This continues until a matching handler is found or the exception reaches the thread's uncaught-exception handling mechanism.",

        "Checked exceptions must satisfy compile-time handling or declaration rules. Unchecked exceptions can propagate without a throws declaration.",

        "In Spring Boot, an unchecked exception thrown by a service may propagate through the controller invocation and be processed by Spring MVC's exception-resolution mechanisms, including an applicable @ExceptionHandler."
      ],

      code: {
        language: "java",
        code: `public class OrderService {

    public void placeOrder() {
        validateOrder();
    }

    private void validateOrder() {
        throw new IllegalStateException(
            "Order cannot be placed"
        );
    }
}

// Calling placeOrder() propagates the exception
// unless an applicable handler catches it.`
      },

      bullets: [
        "An exception moves up the call stack until handled.",
        "A matching catch block can handle an exception in the current method or a caller.",
        "A method can catch an exception and rethrow it.",
        "When wrapping an exception, preserve the cause where useful.",
        "Do not catch an exception only to log it and rethrow it repeatedly at every layer."
      ]
    },

    {
      id: "comparison",

      title: "Checked vs Unchecked",

      paragraphs: [
        "The main difference is compile-time enforcement. Checked exceptions normally require catch or throws, while unchecked exceptions do not. Both types can be thrown, caught, propagated, logged, and translated into application responses."
      ],

      code: {
        language: "text",
        code: `Checked Exception
    |
    +-- Compiler requires handling or declaration
    |
    +-- Examples:
        IOException
        SQLException
        ClassNotFoundException


Unchecked Exception
    |
    +-- No compiler requirement to catch or declare
    |
    +-- RuntimeException subclasses:
        NullPointerException
        IllegalArgumentException
        IllegalStateException
        Custom RuntimeException`
      },

      bullets: [
        "Checked exceptions are useful when the caller is expected to handle or explicitly acknowledge a recoverable failure.",
        "Unchecked exceptions are common for programming errors, invalid states, and application-specific failures.",
        "Both can be caught using try-catch.",
        "A throws clause declares a possible exception; it does not catch or resolve it.",
        "The exception type alone does not determine the HTTP status code returned by a Spring Boot API."
      ]
    },

    {
      id: "choosing-exception-type",

      title: "How to Choose the Correct Exception Type",

      paragraphs: [
        "Choose the exception type by considering what failed and which layer can respond appropriately. Do not choose an exception type only because it is easier to write.",

        "For a missing employee, EmployeeNotFoundException can communicate the domain condition. For a null argument that violates a method contract, IllegalArgumentException is usually suitable. For a file operation that callers may recover from, IOException may be appropriate."
      ],

      code: {
        language: "java",
        code: `// Invalid argument
throw new IllegalArgumentException(
    "Employee id must be positive"
);

// Invalid application state
throw new IllegalStateException(
    "Order has already been cancelled"
);

// Resource not found
throw new EmployeeNotFoundException(
    "Employee not found with id: " + id
);

// Checked I/O failure
throw new IOException(
    "Unable to read employee file"
);`
      },

      bullets: [
        "Use standard exception types when they clearly describe the failure.",
        "Use custom exceptions when a domain-specific name improves readability or handling.",
        "Prefer checked exceptions when callers can reasonably recover and the checked contract is useful.",
        "Prefer unchecked exceptions when forced handling would add boilerplate without meaningful recovery.",
        "Do not use exceptions as normal control flow for expected, frequent outcomes when a clearer return type or validation result would be better.",
        "Avoid catching Throwable or Error in routine application code."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes and Best Practices",

      bullets: [
        "Do not assume unchecked exceptions cannot be caught. They can be handled with try-catch.",
        "Do not confuse throws with throw. throws appears in a method declaration; throw raises an exception object.",
        "Do not swallow exceptions with an empty catch block.",
        "Do not catch Exception everywhere without a specific recovery or translation strategy.",
        "Do not expose stack traces or SQL exception details in REST responses.",
        "Do not replace a useful original exception with a new exception while discarding the cause.",
        "Do not log the same exception at every layer; choose the layer that has the necessary context.",
        "Use try-with-resources for resources that implement AutoCloseable.",
        "Use @RestControllerAdvice for consistent API error handling.",
        "Test both the exception type and the externally visible HTTP response.",
        "Remember that checked versus unchecked is a Java language distinction; HTTP status mapping is an application design decision.",
        "Remember that Spring's default transaction rollback behavior traditionally rolls back on RuntimeException and Error, not on checked exceptions. Configure rollback rules when required."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "1. What is the difference between checked and unchecked exceptions?",

          answer:
            "Checked exceptions are checked by the compiler and normally must be caught or declared with throws. Unchecked exceptions, including RuntimeException subclasses, do not have that compiler requirement."
        },

        {
          question: "2. What is RuntimeException?",

          answer:
            "RuntimeException is a subclass of Exception and the base class for many unchecked exceptions, such as NullPointerException and IllegalArgumentException."
        },

        {
          question: "3. Give examples of checked exceptions.",

          answer:
            "Common examples include IOException, SQLException, and ClassNotFoundException."
        },

        {
          question: "4. Give examples of unchecked exceptions.",

          answer:
            "Common examples include NullPointerException, IllegalArgumentException, IllegalStateException, and ArithmeticException."
        },

        {
          question: "5. Does an unchecked exception need to be caught?",

          answer:
            "No. The compiler does not require it to be caught or declared. However, the application may still catch it when recovery or translation is appropriate."
        },

        {
          question: "6. Can a checked exception be propagated to another method?",

          answer:
            "Yes. A method can declare the checked exception using throws, allowing the caller to handle it or declare it further."
        },

        {
          question: "7. What is the difference between throw and throws?",

          answer:
            "throw is used to throw an exception object. throws is used in a method declaration to specify exceptions that the method may propagate."
        },

        {
          question: "8. Why are custom RuntimeException classes common in Spring Boot?",

          answer:
            "They represent application-specific failures clearly without forcing every caller to catch or declare the exception. A centralized handler can translate them into appropriate API responses."
        },

        {
          question: "9. What is EmployeeNotFoundException?",

          answer:
            "It is an application-specific exception that represents a missing employee resource. It commonly extends RuntimeException and may be mapped to HTTP 404."
        },

        {
          question: "10. What is @RestControllerAdvice?",

          answer:
            "@RestControllerAdvice provides centralized exception handling for Spring MVC controllers. It is commonly combined with @ExceptionHandler to return consistent REST error responses."
        },

        {
          question: "11. What does @ExceptionHandler do?",

          answer:
            "@ExceptionHandler identifies a method that handles a specified exception type in a controller or controller advice."
        },

        {
          question: "12. Can Spring Boot handle checked exceptions?",

          answer:
            "Yes. Checked exceptions can be caught in application code or handled through appropriate Spring MVC exception-handling mechanisms. The correct strategy depends on where the exception occurs and how it is exposed."
        },

        {
          question: "13. Is NullPointerException checked or unchecked?",

          answer:
            "NullPointerException is unchecked because it extends RuntimeException."
        },

        {
          question: "14. Is IOException checked or unchecked?",

          answer:
            "IOException is a checked exception because it extends Exception and is not a subclass of RuntimeException."
        },

        {
          question: "15. Is SQLException checked or unchecked?",

          answer:
            "SQLException is a checked exception. JDBC callers generally need to catch it or declare it."
        },

        {
          question: "16. Can we catch RuntimeException using try-catch?",

          answer:
            "Yes. Unchecked exceptions can be caught with try-catch. The difference is that the compiler does not require the catch or a throws declaration."
        },

        {
          question: "17. What happens if an exception is not handled?",

          answer:
            "It propagates up the call stack. If no suitable handler is found, it reaches the thread's uncaught-exception handling mechanism. In a Spring MVC request, applicable framework exception handling may translate it into an HTTP response."
        },

        {
          question: "18. Why should we avoid swallowing exceptions?",

          answer:
            "Swallowing exceptions hides failures, makes debugging difficult, and may allow the application to continue with invalid or incomplete state."
        },

        {
          question: "19. Should every business exception extend RuntimeException?",

          answer:
            "No. Runtime exceptions are common in Spring Boot, but the choice should depend on the failure and handling contract. A checked exception may be appropriate when callers can meaningfully recover and the compiler-enforced contract is useful."
        },

        {
          question: "20. What is the relationship between Error and RuntimeException?",

          answer:
            "Both are unchecked in Java's compile-time sense, but they are different branches under Throwable. RuntimeException extends Exception, while Error is a separate branch that generally represents serious JVM or environment problems."
        },

        {
          question: "21. What is exception propagation?",

          answer:
            "Exception propagation occurs when an exception is not handled in the current method and moves to its caller until a matching handler is found or the exception remains uncaught."
        },

        {
          question: "22. What is the difference between an exception and an HTTP error?",

          answer:
            "An exception is a Java runtime object representing a failure. An HTTP error is a response status returned to a client. Spring MVC exception handling or application code maps exceptions to HTTP statuses."
        },

        {
          question: "23. How do checked exceptions affect Spring transaction rollback?",

          answer:
            "With Spring's traditional default rollback rules, RuntimeException and Error trigger rollback, while checked exceptions do not automatically trigger rollback. Configure rollbackFor when a checked exception should cause rollback. Spring Framework 6.2 and later also supports configuring a global rollback policy."
        },

        {
          question: "24. What is the difference between IllegalArgumentException and IllegalStateException?",

          answer:
            "IllegalArgumentException indicates that a method received an invalid argument. IllegalStateException indicates that an operation is invalid for the object's current state."
        },

        {
          question: "25. Should a REST API return the original exception message?",

          answer:
            "Only when the message is safe and appropriate for clients. Avoid exposing stack traces, SQL details, credentials, file paths, or other internal information. Return a consistent error response and log diagnostic details securely on the server."
        }
      ]
    }
  ]
};
