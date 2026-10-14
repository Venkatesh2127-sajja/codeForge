
export const runtimeException = {
  id: 703,

  title: "RuntimeException in Spring Boot",

  slug: "runtime-exception",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand unchecked RuntimeException behavior in Java and Spring Boot, create custom runtime exceptions, trace exception propagation through application layers, and convert service failures into consistent HTTP responses.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "runtime-introduction",

      title: "What is RuntimeException?",

      paragraphs: [
        "RuntimeException is a class in Java's exception hierarchy. It represents unchecked exceptions that can occur while a program is running. Examples include NullPointerException, IllegalArgumentException, and custom application exceptions such as EmployeeNotFoundException.",

        "RuntimeException extends Exception, which means it belongs to Java's exception hierarchy. However, unlike checked exceptions, the compiler does not require methods to catch a RuntimeException or declare it with throws.",

        "In Spring Boot applications, runtime exceptions are commonly used to represent business failures, missing resources, invalid operations, and other application-level problems.",

        "For example, when a client requests an employee with ID 100 but that employee does not exist, the service can throw EmployeeNotFoundException. The exception can propagate through the controller call and be processed by Spring MVC's exception-handling mechanism.",

        "A RuntimeException does not automatically mean that the application must terminate. If an appropriate handler processes the exception, the application can return an error response and continue serving other requests."
      ],

      bullets: [
        "RuntimeException is an unchecked exception.",
        "The compiler does not require callers to catch it or declare it.",
        "It can represent application-specific failures.",
        "It can propagate through service and controller method calls.",
        "Spring MVC can resolve it through an appropriate exception handler.",
        "An unchecked exception is not necessarily a programming bug; custom business exceptions can also extend RuntimeException."
      ]
    },

    {
      id: "exception-hierarchy",

      title: "Java Exception Hierarchy",

      paragraphs: [
        "Understanding the Java exception hierarchy helps explain why RuntimeException behaves differently from checked exceptions.",

        "Both checked exceptions and RuntimeException are subclasses of Exception. Error is a separate branch under Throwable and usually represents serious JVM or environment-level problems that applications generally should not attempt to handle indiscriminately.",

        "RuntimeException and its subclasses are unchecked. Other Exception subclasses, except RuntimeException and its subclasses, are generally checked exceptions."
      ],

      code: {
        language: "text",
        code: `Object
  |
  v
Throwable
  |
  +----------------------+
  |                      |
  v                      v
Exception               Error
  |
  +-----------------------------+
  |                             |
  v                             v
Checked Exceptions       RuntimeException
                                |
                                +-- NullPointerException
                                +-- IllegalArgumentException
                                +-- IllegalStateException
                                +-- EmployeeNotFoundException`
      }
    },

    {
      id: "checked-vs-unchecked",

      title: "Checked Exception vs. RuntimeException",

      paragraphs: [
        "Java distinguishes checked exceptions from unchecked exceptions primarily through compiler-enforced handling requirements.",

        "A checked exception must generally be caught with try-catch or declared in a method's throws clause. An unchecked exception does not have this compiler requirement.",

        "For example, IOException is a checked exception, while NullPointerException is an unchecked exception. A custom EmployeeNotFoundException can extend RuntimeException when the application wants to represent a missing employee without requiring every caller to declare or catch it."
      ],

      code: {
        language: "java",
        code: `// Checked exception: handling or declaration required.

public String readFile() throws IOException {
    return Files.readString(
        Path.of("employee.txt")
    );
}

// Unchecked exception: no compiler requirement
// to catch or declare it.

public Employee getEmployee(Long id) {
    if (id == null) {
        throw new IllegalArgumentException(
            "Employee ID must not be null"
        );
    }

    return employeeRepository.findById(id)
            .orElseThrow(() ->
                new EmployeeNotFoundException(
                    "Employee not found"
                )
            );
}`
      }
    },

    {
      id: "service-example",

      title: "RuntimeException from Service Layer",

      paragraphs: [
        "The service layer contains business logic and coordinates repository operations. When a required resource cannot be found, the service can throw a meaningful application-specific exception.",

        "In this example, the repository's findById method returns an Optional<Employee>. If an employee exists, the service retrieves it and maps it to an EmployeeResponse. If no employee exists, orElseThrow creates and throws EmployeeNotFoundException.",

        "The exception is not converted into an HTTP response inside the service. It propagates to the web layer, where a controller advice can translate it into HTTP 404 Not Found.",

        "The example assumes EmployeeRepository, Employee, EmployeeResponse, and mapToResponse are defined in the application."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository) {

        this.employeeRepository = employeeRepository;
    }

    public EmployeeResponse findById(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                    .orElseThrow(() ->
                        new EmployeeNotFoundException(
                            "Employee not found with id: " + id
                        )
                    );

        return mapToResponse(employee);
    }

    private EmployeeResponse mapToResponse(
            Employee employee) {

        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail()
        );
    }
}`
      }
    },

    {
      id: "exception-class",

      title: "Create a Custom RuntimeException",

      paragraphs: [
        "A custom runtime exception represents a meaningful failure in your application. Instead of throwing a generic RuntimeException for every problem, create a named exception when the failure has a distinct business meaning.",

        "EmployeeNotFoundException extends RuntimeException. Its constructor calls super(message), which passes the message to the parent exception class.",

        "The message can then be accessed using getMessage(). Make sure any message returned to an API client is safe and does not expose sensitive internal details."
      ],

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(
            String message) {

        super(message);
    }
}`
      }
    },

    {
      id: "why-custom",

      title: "Why Use a Custom RuntimeException?",

      paragraphs: [
        "A custom exception identifies what went wrong. A generic RuntimeException may indicate that a failure occurred, but its type does not explain the business meaning of that failure.",

        "When an exception has a specific type, Spring's @ExceptionHandler can match it and return an appropriate response.",

        "For example, EmployeeNotFoundException can map to HTTP 404, while DuplicateResourceException can map to HTTP 409 Conflict."
      ],

      code: {
        language: "java",
        code: `public class DuplicateResourceException
        extends RuntimeException {

    public DuplicateResourceException(
            String message) {

        super(message);
    }
}`
      },

      bullets: [
        "Use meaningful exception names.",
        "Create custom exceptions for distinct application failures.",
        "Keep business exception creation close to the logic that detects the failure.",
        "Use specific exception handlers when different failures require different HTTP responses.",
        "Avoid creating multiple exception classes that represent exactly the same condition."
      ]
    },

    {
      id: "propagation",

      title: "How the Exception Propagates",

      paragraphs: [
        "Exception propagation means that an exception moves up the call stack when the current method does not handle it.",

        "Suppose the controller calls EmployeeService.findById(), which calls EmployeeRepository.findById(). If the employee is missing, the service throws EmployeeNotFoundException. If neither the service nor the controller catches the exception, it continues propagating until Spring MVC resolves it through an appropriate exception handler.",

        "The service does not need to know about ResponseEntity or HTTP status codes. The web layer is responsible for translating the application failure into an HTTP response."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
EmployeeController
     |
     v
EmployeeService
     |
     v
EmployeeRepository
     |
     v
Employee not found
     |
     v
EmployeeNotFoundException
     |
     v
Spring MVC exception resolution
     |
     v
@RestControllerAdvice
     |
     v
HTTP 404 Response`
      }
    },

    {
      id: "stack-unwinding",

      title: "What Happens When an Exception Is Thrown?",

      paragraphs: [
        "When Java throws an exception, normal execution of the current method stops at the throw point. The JVM looks for a matching exception handler in the current method.",

        "If the current method has no matching handler, the exception propagates to its caller. This process continues up the call stack until a suitable handler is found or the exception reaches the top of the relevant execution path.",

        "In a Spring MVC request, Spring's exception-resolution mechanism can process an exception that propagates out of a controller invocation. If an appropriate handler exists, Spring can produce an HTTP error response instead of leaving the exception unhandled by the MVC layer."
      ],

      code: {
        language: "java",
        code: `public void methodA() {
    methodB();
}

public void methodB() {
    methodC();
}

public void methodC() {
    throw new RuntimeException(
        "Something went wrong"
    );
}`
      }
    },

    {
      id: "global-handler-example",

      title: "Handle RuntimeException with @RestControllerAdvice",

      paragraphs: [
        "A global exception handler centralizes exception-to-HTTP-response mapping across REST controllers.",

        "Use a specific handler for EmployeeNotFoundException so that the missing-resource failure produces HTTP 404. The following example assumes ErrorResponse is a DTO with status and message fields.",

        "The message used for this known exception is suitable for the client. For unexpected exceptions, return a safe generic message instead of exposing the original exception message."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
        EmployeeNotFoundException.class
    )
    public ResponseEntity<ErrorResponse>
    handleEmployeeNotFound(
            EmployeeNotFoundException exception) {

        ErrorResponse response =
                new ErrorResponse(
                    404,
                    exception.getMessage()
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}`
      }
    },

    {
      id: "controller-example",

      title: "Controller Example",

      paragraphs: [
        "The controller calls the service and returns the successful result. It does not need to catch EmployeeNotFoundException if the global exception handler is responsible for translating that exception.",

        "If the service throws the exception, normal execution of the controller method stops. Spring MVC then attempts to resolve the exception through its exception-handling mechanism."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(
            EmployeeService employeeService) {

        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id) {

        return employeeService.findById(id);
    }
}`
      }
    },

    {
      id: "http-response",

      title: "What Response Does the Client Receive?",

      paragraphs: [
        "If the client requests an employee that does not exist, the service throws EmployeeNotFoundException. The global exception handler converts the exception into an HTTP 404 response.",

        "The HTTP status is important because clients often use it to decide how to handle the failure. The response body provides additional information that can be displayed to the user or used for application-level error handling."
      ],

      code: {
        language: "json",
        code: `{
  "status": 404,
  "message": "Employee not found with id: 10"
}`
      },

      bullets: [
        "HTTP status: 404 Not Found.",
        "Response body: the error-response DTO serialized as JSON.",
        "Client behavior: display a suitable message or update the UI state.",
        "Server behavior: continue serving other requests unless another application-level problem occurs."
      ]
    },

    {
      id: "avoid-null",

      title: "Why Throw an Exception Instead of Returning null?",

      paragraphs: [
        "Returning null for a missing resource can force every caller to perform manual null checks. If a caller forgets to check, it may later trigger a NullPointerException.",

        "Using Optional.orElseThrow() makes the missing-resource behavior explicit at the lookup point. The application throws a meaningful exception that can be handled consistently.",

        "Returning null is not always incorrect; it can be appropriate when null has a clearly defined meaning in a particular API. For a required resource lookup, however, an Optional with orElseThrow is often easier to understand."
      ],

      code: {
        language: "java",
        code: `// Less explicit: the caller must check for null.

Employee employee =
        employeeRepository.findById(id)
                .orElse(null);

if (employee == null) {
    // Handle the missing employee here.
}


// Explicit failure: the exception identifies
// why the lookup could not succeed.

Employee employee =
        employeeRepository.findById(id)
                .orElseThrow(() ->
                    new EmployeeNotFoundException(
                        "Employee not found"
                    )
                );`
      }
    },

    {
      id: "throw-vs-throws",

      title: "Difference Between throw and throws",

      paragraphs: [
        "The throw keyword actually throws an exception object. The throws keyword declares in a method signature that the method may propagate specified exception types.",

        "For unchecked exceptions, declaring the exception with throws is optional. It may still be used for documentation, but the compiler does not require it.",

        "For checked exceptions, the caller must generally catch the exception or declare it in its own throws clause."
      ],

      code: {
        language: "java",
        code: `// throw creates and throws an exception.

public Employee getEmployee(Long id) {
    if (id == null) {
        throw new IllegalArgumentException(
            "Employee ID must not be null"
        );
    }

    return employeeRepository.findById(id)
            .orElseThrow(() ->
                new EmployeeNotFoundException(
                    "Employee not found"
                )
            );
}

// throws declares a possible checked exception.

public String readEmployeeFile()
        throws IOException {

    return Files.readString(
        Path.of("employee.txt")
    );
}`
      }
    },

    {
      id: "runtime-common-exceptions",

      title: "Common RuntimeException Subclasses",

      paragraphs: [
        "Java provides several built-in unchecked exceptions. Understanding them helps you distinguish programming mistakes from intentional application-level failures."
      ],

      bullets: [
        "NullPointerException: code attempts an operation on a null reference.",
        "IllegalArgumentException: a method receives an argument that is not acceptable.",
        "IllegalStateException: an operation is not valid for the current state.",
        "IndexOutOfBoundsException: an index is outside the allowed range.",
        "NumberFormatException: a string cannot be converted to the requested numeric format.",
        "ClassCastException: an object cannot be cast to the requested type.",
        "EmployeeNotFoundException: an application-specific example representing a missing employee."
      ]
    },

    {
      id: "runtime-vs-http",

      title: "RuntimeException Is Not an HTTP Status Code",

      paragraphs: [
        "A RuntimeException is a Java exception type. HTTP 404 and HTTP 500 are HTTP status codes. They belong to different layers of the application.",

        "Throwing a RuntimeException does not automatically mean that the response must be HTTP 500. The final HTTP response depends on how the exception is resolved by the web layer.",

        "For example, EmployeeNotFoundException can be mapped to HTTP 404 by a specific @ExceptionHandler. An unexpected exception may be mapped to HTTP 500 by a fallback handler."
      ],

      code: {
        language: "text",
        code: `EmployeeNotFoundException
          |
          v
Specific @ExceptionHandler
          |
          v
HTTP 404 Not Found


Unexpected RuntimeException
          |
          v
Fallback exception handler
          |
          v
HTTP 500 Internal Server Error`
      }
    },

    {
      id: "transaction-rollback",

      title: "RuntimeException and Transaction Rollback",

      paragraphs: [
        "Spring's declarative transaction management has default rollback rules. By default, a transaction is normally rolled back when a RuntimeException or Error escapes the transactional method.",

        "Checked exceptions do not trigger rollback by default under the traditional Spring transaction rules. If a checked exception should cause rollback, configure rollbackFor or use an appropriate global transaction rollback policy.",

        "Catching an exception and swallowing it can change this behavior because the exception may no longer escape the transactional method. If an operation must be atomic, ensure failures are propagated or rollback is explicitly configured.",

        "Transaction behavior also depends on how the method is invoked and how the transaction is configured. For example, self-invocation can bypass proxy-based transactional interception in common Spring configurations."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void updateEmployee(Long id) {

    Employee employee =
            employeeRepository.findById(id)
                    .orElseThrow(() ->
                        new EmployeeNotFoundException(
                            "Employee not found"
                        )
                    );

    employee.setName("Updated Name");

    employeeRepository.save(employee);

    // If a RuntimeException escapes this
    // transactional method, Spring's default
    // rollback rules normally trigger rollback.
}`
      }
    },

    {
      id: "common-mistakes",

      title: "Common RuntimeException Mistakes",

      bullets: [
        "Throwing a generic RuntimeException when a meaningful custom exception would be clearer.",
        "Returning null for a required resource without a clear contract.",
        "Catching RuntimeException and silently ignoring it.",
        "Returning exception.getMessage() for every unexpected failure.",
        "Assuming every RuntimeException automatically becomes HTTP 500.",
        "Returning ResponseEntity from the service layer for every failure.",
        "Using exceptions for routine control flow when a normal return value would be clearer.",
        "Forgetting to test the HTTP response generated by global exception handling.",
        "Assuming a caught RuntimeException will always trigger transaction rollback."
      ]
    },

    {
      id: "best-practices",

      title: "RuntimeException Best Practices",

      bullets: [
        "Use meaningful custom runtime exceptions for important application failures.",
        "Use Optional.orElseThrow() for required resources that are not found.",
        "Keep business logic in the service layer.",
        "Translate application exceptions into HTTP responses in the web layer.",
        "Use @RestControllerAdvice for common REST exception handling.",
        "Use specific exception handlers for known failures.",
        "Return safe error messages to API clients.",
        "Log unexpected exceptions with useful diagnostic context.",
        "Do not swallow exceptions that must propagate or trigger rollback.",
        "Test exception behavior at both the service and HTTP levels."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is RuntimeException in Java?",

          answer:
            "RuntimeException is an unchecked subclass of Exception. The compiler does not require callers to catch it or declare it in a throws clause."
        },

        {
          question: "Is RuntimeException checked or unchecked?",

          answer:
            "RuntimeException is unchecked. Its subclasses do not have a compiler-enforced catch-or-declare requirement."
        },

        {
          question: "What is the difference between Exception and RuntimeException?",

          answer:
            "Exception is the parent class for checked exceptions and RuntimeException. RuntimeException and its subclasses are unchecked, while other direct or indirect Exception subclasses are generally checked."
        },

        {
          question: "Why do Spring Boot applications use custom RuntimeException classes?",

          answer:
            "Custom runtime exceptions represent meaningful application failures, such as a missing employee or duplicate resource. They allow specific exception handling without requiring callers to catch or declare them."
        },

        {
          question: "Where should a resource-not-found exception usually be created?",

          answer:
            "The service layer can detect the missing resource and throw a meaningful application-specific exception. The web layer can translate it into the appropriate HTTP response."
        },

        {
          question: "Should the service layer return ResponseEntity for every exception?",

          answer:
            "Normally no. The service layer should focus on business logic, while the controller or global exception handler translates exceptions into HTTP responses."
        },

        {
          question: "What does Optional.orElseThrow() do?",

          answer:
            "It returns the value when the Optional contains one. If the Optional is empty, it throws the supplied exception."
        },

        {
          question: "Why use a custom EmployeeNotFoundException instead of RuntimeException?",

          answer:
            "The custom exception clearly identifies the failure and allows a specific handler to map it to HTTP 404. A generic RuntimeException does not communicate the business meaning as clearly."
        },

        {
          question: "What is exception propagation?",

          answer:
            "Exception propagation occurs when a method does not handle an exception and the exception moves up the call stack to its caller until a matching handler is found or the exception remains unhandled."
        },

        {
          question: "Does throwing RuntimeException always stop the entire Spring Boot application?",

          answer:
            "No. An exception can be handled by Spring MVC or application code. A failed HTTP request does not normally require the entire Spring Boot application to terminate."
        },

        {
          question: "Does RuntimeException always produce HTTP 500?",

          answer:
            "No. The resulting HTTP status depends on the exception-resolution mechanism and configured handlers. A custom EmployeeNotFoundException can be mapped to HTTP 404."
        },

        {
          question: "What is the difference between throw and throws?",

          answer:
            "throw actually throws an exception object. throws declares possible exception types in a method signature. Checked exceptions generally require handling or declaration, while unchecked exceptions do not."
        },

        {
          question: "Name some common RuntimeException subclasses.",

          answer:
            "Examples include NullPointerException, IllegalArgumentException, IllegalStateException, IndexOutOfBoundsException, NumberFormatException, and ClassCastException."
        },

        {
          question: "What is the difference between a checked exception and an unchecked exception?",

          answer:
            "A checked exception generally must be caught or declared. An unchecked exception, including RuntimeException and its subclasses, has no such compiler-enforced requirement."
        },

        {
          question: "How does @RestControllerAdvice handle a custom RuntimeException?",

          answer:
            "A matching @ExceptionHandler method in controller advice can process the exception and return a ResponseEntity with an appropriate HTTP status and response body."
        },

        {
          question: "Why is returning null sometimes a problem?",

          answer:
            "Callers must remember to check for null, and missing checks can lead to NullPointerException. For required resources, Optional.orElseThrow() makes failure behavior explicit."
        },

        {
          question: "What happens when a RuntimeException escapes a transactional service method?",

          answer:
            "Under Spring's default transaction rollback rules, a RuntimeException that escapes the transactional method normally triggers rollback, provided the method is invoked through the transaction mechanism and the transaction is active."
        },

        {
          question: "What happens if a transactional method catches and ignores a RuntimeException?",

          answer:
            "The exception may no longer escape the method, so Spring's default rollback rules may not trigger rollback for it. The application should propagate the failure or configure rollback behavior when necessary."
        },

        {
          question: "Should RuntimeException be used for every application failure?",

          answer:
            "No. Use an appropriate standard or custom exception that clearly represents the failure. Avoid using exceptions for routine control flow when a normal result would be clearer."
        },

        {
          question: "Explain the RuntimeException flow in a Spring Boot REST API.",

          answer:
            "A controller calls a service, and the service calls the repository. If the required resource is missing, the service throws a custom RuntimeException. The exception propagates through the call stack, and Spring MVC can resolve it through a matching handler in @RestControllerAdvice, which returns an appropriate HTTP response."
        }
      ]
    }
  ]
};
