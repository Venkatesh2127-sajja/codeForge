
export const globalExceptionHandling = {
  id: 707,

  title: "Global Exception Handling",

  slug: "global-exception-handling",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Build a production-ready global exception handling mechanism using @RestControllerAdvice, multiple @ExceptionHandler methods, validation handling, consistent error responses, and secure logging.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "global-handler",

      title: "What is Global Exception Handling?",

      paragraphs: [
        "Global exception handling means processing exceptions from multiple controllers through a centralized component instead of writing separate exception-handling logic in every controller.",

        "In Spring Boot REST applications, @RestControllerAdvice combined with @ExceptionHandler is a common approach. The advice can handle exceptions raised during Spring MVC request processing and return a consistent response to the client.",

        "For example, an EmployeeController might throw EmployeeNotFoundException, while a DepartmentController might throw DepartmentNotFoundException. A global handler can process both exceptions and return the appropriate HTTP responses.",

        "Global exception handling separates business logic from HTTP error-response construction. Services can report failures using exceptions, while the web layer translates those failures into HTTP status codes and response bodies."
      ],

      bullets: [
        "Centralizes common exception-handling logic.",
        "Reduces repeated try-catch blocks in controllers.",
        "Provides consistent error-response formats.",
        "Maps known exceptions to suitable HTTP status codes.",
        "Allows unexpected exceptions to be handled with a safe fallback.",
        "Makes error handling easier to test and maintain."
      ]
    },

    {
      id: "global-handler-annotations",

      title: "Understanding @RestControllerAdvice and @ExceptionHandler",

      paragraphs: [
        "@RestControllerAdvice provides shared advice for REST controllers. Its response-body semantics make it convenient for returning serialized error-response objects.",

        "@ExceptionHandler identifies a method that handles a particular exception type. When Spring MVC resolves a matching exception, it can invoke the corresponding handler method.",

        "An exception handler can be declared inside an individual controller for local handling or inside controller advice for centralized handling.",

        "When multiple handlers could match an exception, Spring considers exception-type specificity and the applicable exception-resolution rules. More specific exception handlers should be used for known failures."
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
      id: "error-response",

      title: "Create an Error Response",

      paragraphs: [
        "An error-response DTO defines the structure returned when an API request fails. A consistent DTO allows frontend applications to process errors without needing to understand internal Java exception classes.",

        "This basic example contains the HTTP status and a message. In a larger application, you can also include a timestamp, stable application error code, and request path.",

        "The status value in the body should match the actual HTTP response status. For example, a response with HTTP 404 should contain status 404 in its body."
      ],

      code: {
        language: "java",
        code: `public record ErrorResponse(
        int status,
        String message
) {
}`
      }
    },

    {
      id: "error-response-extended",

      title: "A More Informative Error Response",

      paragraphs: [
        "For production APIs, additional metadata can help with debugging and client-side handling. The following example uses a Java record and includes a timestamp, HTTP status, error label, message, and request path.",

        "This example requires Java 16 or later because it uses a record. If your project uses an earlier Java version, implement the DTO as a regular class.",

        "The message must be appropriate for the client. Do not populate it with raw SQL errors, stack traces, or sensitive internal information."
      ],

      code: {
        language: "java",
        code: `import java.time.Instant;

public record ApiErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path
) {
}`
      }
    },

    {
      id: "handler",

      title: "Create GlobalExceptionHandler",

      paragraphs: [
        "Create a class annotated with @RestControllerAdvice. Add separate @ExceptionHandler methods for the application exceptions that require different HTTP status codes.",

        "In this example, EmployeeNotFoundException maps to HTTP 404 Not Found, while DuplicateResourceException maps to HTTP 409 Conflict.",

        "The exception messages shown here are assumed to be safe, application-controlled messages. For exceptions that might contain internal information, use a predefined client-facing message instead."
      ],

      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
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

    @ExceptionHandler(
        DuplicateResourceException.class
    )
    public ResponseEntity<ErrorResponse>
    handleDuplicateResource(
            DuplicateResourceException exception) {

        ErrorResponse response =
                new ErrorResponse(
                    409,
                    exception.getMessage()
                );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }
}`
      }
    },

    {
      id: "custom-exceptions",

      title: "Create Custom Exceptions for Business Failures",

      paragraphs: [
        "Custom exceptions give application failures meaningful names. They allow the service layer to communicate why an operation could not be completed without deciding how the HTTP response should be constructed.",

        "EmployeeNotFoundException represents a missing employee. DuplicateResourceException can represent a known conflict, such as an attempt to register an email address that must be unique.",

        "These exceptions can extend RuntimeException so they can propagate through ordinary service calls without requiring every calling method to declare them."
      ],

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(
            String message) {

        super(message);
    }
}

public class DuplicateResourceException
        extends RuntimeException {

    public DuplicateResourceException(
            String message) {

        super(message);
    }
}`
      }
    },

    {
      id: "service-integration",

      title: "How the Service Layer Uses Custom Exceptions",

      paragraphs: [
        "The service layer throws a meaningful exception when the requested employee does not exist. It does not return ResponseEntity or construct an HTTP error body.",

        "The exception propagates out of the service and is resolved by the global exception handler. This keeps the business logic independent of the REST API response format."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }

    public Employee getEmployee(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                    new EmployeeNotFoundException(
                        "Employee not found"
                    )
                );
    }
}`
      }
    },

    {
      id: "validation",

      title: "Handle Validation Errors",

      paragraphs: [
        "The global handler can also process validation failures raised when Spring validates incoming request data.",

        "For example, a request DTO may use @NotBlank to require a name and @Email to validate an email address. When a request body annotated with @Valid fails validation, Spring MVC commonly raises MethodArgumentNotValidException.",

        "The handler can extract field-level validation messages and return HTTP 400 Bad Request. This lets a frontend display understandable validation feedback without parsing a Java exception.",

        "A field may have multiple validation errors. The example below merges messages for the same field instead of allowing duplicate keys to cause an IllegalStateException. The resulting messages should be reviewed to ensure they do not expose sensitive information."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(
    MethodArgumentNotValidException.class
)
public ResponseEntity<ValidationErrorResponse>
handleValidation(
        MethodArgumentNotValidException exception) {

    Map<String, String> errors =
            exception.getBindingResult()
                    .getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(
                        FieldError::getField,
                        error -> error.getDefaultMessage()
                                == null
                                ? "Invalid value"
                                : error.getDefaultMessage(),
                        (first, second) ->
                            first + "; " + second,
                        LinkedHashMap::new
                    ));

    ValidationErrorResponse response =
            new ValidationErrorResponse(
                400,
                "Validation failed",
                errors
            );

    return ResponseEntity
            .badRequest()
            .body(response);
}`
      }
    },

    {
      id: "validation-dto",

      title: "Create a Validation Error Response DTO",

      paragraphs: [
        "The validation response contains the HTTP status, a general message, and a map of field names to validation messages.",

        "The field map makes it easier for a frontend form to identify which inputs need correction."
      ],

      code: {
        language: "java",
        code: `import java.util.Map;

public record ValidationErrorResponse(
        int status,
        String message,
        Map<String, String> fieldErrors
) {
}`
      }
    },

    {
      id: "validation-request",

      title: "Example: Validate an Incoming Request",

      paragraphs: [
        "Use Bean Validation annotations on request DTOs to define input requirements. Add @Valid to the request body parameter so that Spring MVC performs validation before invoking the controller method.",

        "The validation annotations require a Bean Validation implementation on the classpath, such as the validation starter in a Spring Boot application."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateEmployeeRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    String email

) {
}

@PostMapping
public ResponseEntity<Employee> createEmployee(
        @Valid @RequestBody
        CreateEmployeeRequest request) {

    Employee employee =
            employeeService.createEmployee(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employee);
}`
      }
    },

    {
      id: "generic",

      title: "Handling Unexpected Exceptions",

      paragraphs: [
        "A global handler can provide a fallback for unexpected exceptions that reach Spring MVC's exception-resolution mechanism.",

        "Return a safe message such as An unexpected error occurred rather than exposing the raw exception message. Log the exception on the server so that developers can investigate the underlying cause.",

        "The generic handler should be a fallback, not a replacement for specific handlers for known application failures.",

        "Exceptions raised in servlet filters or Spring Security before the request reaches Spring MVC may require separate handling. A controller advice does not automatically handle every failure in the entire request pipeline."
      ],

      code: {
        language: "java",
        code: `private static final Logger log =
        LoggerFactory.getLogger(
            GlobalExceptionHandler.class
        );

@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse>
handleUnexpectedException(
        Exception exception) {

    log.error(
        "Unexpected exception while processing request",
        exception
    );

    ErrorResponse response =
            new ErrorResponse(
                500,
                "An unexpected error occurred"
            );

    return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(response);
}`
      }
    },

    {
      id: "http-status-codes",

      title: "Choose Appropriate HTTP Status Codes",

      paragraphs: [
        "The global handler should map failures to HTTP status codes according to the meaning of the failure. A status code helps the client decide whether it should correct the request, authenticate, retry later, or report an unexpected problem."
      ],

      bullets: [
        "400 Bad Request: malformed request or invalid input.",
        "401 Unauthorized: authentication is missing or invalid.",
        "403 Forbidden: the caller is not allowed to perform the operation.",
        "404 Not Found: the requested resource does not exist.",
        "409 Conflict: the request conflicts with the current state of a resource.",
        "500 Internal Server Error: an unexpected server-side failure occurred.",
        "503 Service Unavailable: the service is temporarily unable to handle requests."
      ]
    },

    {
      id: "flow",

      title: "Complete Global Handling Flow",

      paragraphs: [
        "When a request fails inside the Spring MVC processing flow, the exception is passed to Spring's exception-resolution mechanism. A matching handler in controller advice can create an error response with an appropriate HTTP status.",

        "The controller does not need to catch every application exception individually. However, not all failures occur inside the controller-processing flow, so filters and security components may need their own handlers."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
DispatcherServlet
     |
     v
Controller
     |
     v
Service
     |
     +---- Success: return normal response
     |
     +---- Failure: throw exception
                    |
                    v
          Spring MVC Exception Resolution
                    |
                    v
             @RestControllerAdvice
                    |
                    v
          Matching @ExceptionHandler
                    |
                    v
              ErrorResponse
                    |
                    v
              HTTP Response`
      }
    },

    {
      id: "specific-vs-generic",

      title: "Specific Handlers vs. Generic Handlers",

      paragraphs: [
        "Specific handlers define the intended behavior for known failures. A missing employee should not be treated in the same way as an unexpected programming error.",

        "A generic Exception handler is useful when an exception has no more specific application handler. Spring MVC also has built-in exception-resolution behavior, so the final result depends on handler selection and ordering.",

        "Avoid registering overlapping handlers that create ambiguity. Test the actual response for important exception types, particularly when you add more controller advice classes."
      ],

      bullets: [
        "EmployeeNotFoundException: usually HTTP 404.",
        "DuplicateResourceException: often HTTP 409.",
        "Request validation failure: usually HTTP 400.",
        "Unexpected application exception: usually HTTP 500.",
        "Authentication and authorization failures: configure the appropriate security handling when they occur in the security filter chain."
      ]
    },

    {
      id: "logging",

      title: "Logging Exceptions Securely",

      paragraphs: [
        "Logging is important because the client-facing error response should not contain internal diagnostic information. Server-side logs can preserve the stack trace and useful context for investigation.",

        "Use SLF4J with a logging implementation such as Logback. Pass the exception object to the logging method when you need the stack trace.",

        "Avoid logging passwords, access tokens, session identifiers, or unnecessary personal information. Expected failures should not automatically be logged at ERROR level because doing so can create excessive noise."
      ],

      code: {
        language: "java",
        code: `private static final Logger log =
        LoggerFactory.getLogger(
            GlobalExceptionHandler.class
        );

log.error(
    "Unexpected error while handling request",
    exception
);`
      }
    },

    {
      id: "security-filter-handling",

      title: "Handling Spring Security Failures",

      paragraphs: [
        "Authentication and authorization failures can occur before a request reaches a controller. In those cases, a global controller advice may not be invoked.",

        "Spring Security commonly uses AuthenticationEntryPoint to handle authentication failures and AccessDeniedHandler to handle access-denied failures. Configure these components when the API needs the same error-response contract for security failures.",

        "The same principle applies to other processing layers: handle an exception where it can be observed and translated reliably."
      ],

      code: {
        language: "text",
        code: `Incoming Request
       |
       v
Servlet / Security Filters
       |
       +---- Authentication failure
       |             |
       |             v
       |     AuthenticationEntryPoint
       |
       +---- Access denied
       |             |
       |             v
       |      AccessDeniedHandler
       |
       v
DispatcherServlet
       |
       v
Controller and Service
       |
       v
@RestControllerAdvice
       |
       v
HTTP Error Response`
      }
    },

    {
      id: "testing",

      title: "Test Global Exception Handling",

      paragraphs: [
        "Test global exception handling to ensure that known exceptions produce the expected HTTP status and response body.",

        "A service unit test can verify that a missing employee produces EmployeeNotFoundException. A Spring MVC test can verify that the exception is translated into HTTP 404 and the expected JSON fields.",

        "Use MockMvc or an appropriate integration-test setup to exercise the actual request-processing flow. The example below assumes the endpoint and global handler are registered in the Spring application context."
      ],

      code: {
        language: "java",
        code: `@SpringBootTest
@AutoConfigureMockMvc
class GlobalExceptionHandlingTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingEmployeeReturns404()
            throws Exception {

        mockMvc.perform(
                get("/api/employees/999999")
            )
            .andExpect(status().isNotFound())
            .andExpect(
                jsonPath("$.status").value(404)
            )
            .andExpect(
                jsonPath("$.message")
                    .value("Employee not found")
            );
    }
}`
      }
    },

    {
      id: "testing-checklist",

      title: "What Should You Test?",

      bullets: [
        "A missing resource returns HTTP 404.",
        "A duplicate-resource conflict returns HTTP 409.",
        "Invalid request data returns HTTP 400.",
        "The response body follows the agreed error-response structure.",
        "The HTTP status matches the status value in the response body.",
        "Unexpected failures do not expose stack traces or internal messages.",
        "Repeated validation errors for one field do not break response generation.",
        "Security failures return the intended API response when security handling is configured.",
        "Successful requests continue to return their normal responses."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Global Exception Handling Mistakes",

      bullets: [
        "Using a generic Exception handler for every known failure.",
        "Returning HTTP 200 for failed operations without a deliberate API contract.",
        "Returning raw exception messages or stack traces to clients.",
        "Creating inconsistent error-response formats across controllers.",
        "Using HTTP 500 for ordinary validation failures.",
        "Assuming @RestControllerAdvice handles failures that occur before Spring MVC.",
        "Using Collectors.toMap without a merge function when duplicate field errors are possible.",
        "Logging sensitive values or credentials.",
        "Logging every expected business failure as an error.",
        "Failing to test the actual HTTP response generated by the exception handler."
      ]
    },

    {
      id: "important-note",

      title: "Important Design Note",

      paragraphs: [
        "The generic Exception handler should be a fallback rather than the primary way to handle known application failures. Known exceptions should have specific handlers so that the API can return appropriate status codes and useful messages.",

        "Keep exception handling centralized, but do not force every kind of application failure through one controller advice class. Spring Security, servlet filters, scheduled jobs, message consumers, and asynchronous tasks may require their own error-handling mechanisms.",

        "For a production API, define a stable error-response contract, keep public messages safe, log unexpected failures appropriately, and test the behavior that API clients depend on."
      ]
    },

    {
      id: "best-practices",

      title: "Global Exception Handling Best Practices",

      bullets: [
        "Use @RestControllerAdvice for shared REST controller error handling.",
        "Create meaningful custom exceptions for known business failures.",
        "Use separate @ExceptionHandler methods for different exception types.",
        "Return appropriate HTTP status codes.",
        "Use a consistent error-response DTO.",
        "Handle validation errors without exposing internal details.",
        "Log unexpected exceptions securely with useful context.",
        "Use a generic handler as a fallback.",
        "Avoid leaking SQL statements, stack traces, or sensitive information.",
        "Handle security-filter errors in the appropriate security components.",
        "Test error status codes and response bodies with MockMvc or integration tests."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is global exception handling in Spring Boot?",

          answer:
            "Global exception handling processes common exceptions from multiple REST controllers through a centralized component. @RestControllerAdvice and @ExceptionHandler are commonly used to return consistent error responses."
        },

        {
          question: "What is the benefit of global exception handling?",

          answer:
            "It reduces duplicated exception-handling code, centralizes error-response mapping, improves maintainability, and provides a consistent API contract."
        },

        {
          question: "What is the difference between @ControllerAdvice and @RestControllerAdvice?",

          answer:
            "@ControllerAdvice provides shared controller advice. @RestControllerAdvice combines controller advice with response-body semantics, making it convenient for REST APIs."
        },

        {
          question: "What does @ExceptionHandler do?",

          answer:
            "@ExceptionHandler maps a controller or advice method to one or more exception types so that Spring MVC can invoke the method when a matching exception is resolved."
        },

        {
          question: "Can one @RestControllerAdvice contain multiple @ExceptionHandler methods?",

          answer:
            "Yes. Different methods can handle different exception types, such as EmployeeNotFoundException, DuplicateResourceException, and request-validation exceptions."
        },

        {
          question: "How do you handle EmployeeNotFoundException globally?",

          answer:
            "Create a method annotated with @ExceptionHandler(EmployeeNotFoundException.class) inside controller advice and return an ErrorResponse with HTTP 404 Not Found."
        },

        {
          question: "How do you handle duplicate-resource exceptions?",

          answer:
            "For a recognized business conflict, use a specific handler that returns HTTP 409 Conflict and a safe, meaningful message."
        },

        {
          question: "Why do we need an ErrorResponse DTO?",

          answer:
            "It defines a consistent response structure that clients can process without understanding internal Java exception classes."
        },

        {
          question: "How should validation errors be handled?",

          answer:
            "Handle the appropriate validation exception, extract safe field-level messages, and return HTTP 400 Bad Request. In Spring MVC, @Valid request-body validation commonly raises MethodArgumentNotValidException."
        },

        {
          question: "Why should a validation error map handle duplicate field errors?",

          answer:
            "A field can have multiple constraint violations. A collector without a merge function may throw an exception when duplicate keys occur. Merge the messages or represent them as a list."
        },

        {
          question: "Why do we need a generic Exception handler?",

          answer:
            "It provides a controlled fallback for unexpected exceptions that reach Spring MVC's exception-resolution mechanism. It should return a safe message and log the underlying exception."
        },

        {
          question: "Should the generic handler return exception.getMessage()?",

          answer:
            "Not for unexpected exceptions by default. Their messages may expose SQL statements, internal paths, or other sensitive implementation details. Return a safe public message instead."
        },

        {
          question: "Which HTTP status is commonly used for a missing resource?",

          answer:
            "HTTP 404 Not Found is commonly used when a requested resource does not exist."
        },

        {
          question: "Which HTTP status is commonly used for a duplicate-resource conflict?",

          answer:
            "HTTP 409 Conflict is often appropriate when a request conflicts with an existing resource or its current state."
        },

        {
          question: "Does @RestControllerAdvice handle every exception in Spring Boot?",

          answer:
            "No. It handles exceptions resolved through Spring MVC. Failures in security filters, servlet filters, scheduled tasks, message consumers, and asynchronous execution may need separate handling."
        },

        {
          question: "How do you handle authentication failures globally?",

          answer:
            "Authentication failures in the Spring Security filter chain are commonly handled using AuthenticationEntryPoint. Access-denied failures are commonly handled using AccessDeniedHandler."
        },

        {
          question: "How do you test a global exception handler?",

          answer:
            "Use MockMvc or integration tests to send a request that triggers an exception and verify the HTTP status, response body, and expected error fields."
        },

        {
          question: "Why should unexpected exceptions be logged?",

          answer:
            "Server-side logs preserve diagnostic details, including the stack trace, so developers can investigate the underlying cause without exposing those details to API clients."
        },

        {
          question: "What is the difference between a specific and a generic exception handler?",

          answer:
            "A specific handler processes a known exception type and applies its intended response policy. A generic handler provides a fallback for otherwise unhandled exceptions."
        },

        {
          question: "Can a service throw an exception that is handled by @RestControllerAdvice?",

          answer:
            "Yes. If an exception propagates from a service invoked during Spring MVC request processing, Spring MVC can resolve it through a matching exception handler."
        },

        {
          question: "Explain the complete global exception-handling flow.",

          answer:
            "A request enters Spring MVC, reaches a controller, and invokes the service. If an exception propagates, Spring MVC searches for an appropriate exception handler. A matching @ExceptionHandler in @RestControllerAdvice creates an error response with the appropriate HTTP status and body, which is returned to the client."
        }
      ]
    }
  ]
};
