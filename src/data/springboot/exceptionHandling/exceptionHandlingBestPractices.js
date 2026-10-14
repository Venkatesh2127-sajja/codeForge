
export const exceptionHandlingBestPractices = {
  id: 710,

  title: "Exception Handling Best Practices",

  slug: "exception-handling-best-practices",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Learn practical exception handling practices for building clean, maintainable, secure, and production-ready Spring Boot REST APIs.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "importance",

      title: "Why Exception Handling Best Practices Matter",

      paragraphs: [
        "Exception handling is an important part of API design. A production application should provide predictable responses for known failures while avoiding unnecessary exposure of internal implementation details.",

        "Consider an Employee Management System. When a client requests an employee that does not exist, the API should return HTTP 404 Not Found. When the request contains invalid data, the API should return an appropriate client-error response. When an unexpected programming or infrastructure failure occurs, the API should return a controlled HTTP 500 Internal Server Error.",

        "Good exception handling separates business rules, HTTP response construction, logging, and error reporting. This makes an application easier to maintain, test, debug, and integrate with frontend applications."
      ],

      bullets: [
        "Predictable API responses: clients can handle failures consistently.",
        "Separation of concerns: business services do not need to construct HTTP responses.",
        "Security: internal stack traces, SQL statements, and implementation details remain private.",
        "Maintainability: common error-handling rules can be updated centrally.",
        "Debugging: server-side logs provide diagnostic information.",
        "Testability: expected failure scenarios can be verified independently."
      ]
    },

    {
      id: "custom",

      title: "1. Use Meaningful Custom Exceptions",

      paragraphs: [
        "Create application-specific exceptions when a failure has a meaningful business or resource-level meaning. A custom exception makes the reason for failure clear to developers and allows the exception handler to apply the correct response policy.",

        "For example, EmployeeNotFoundException represents a missing employee. DuplicateResourceException can represent a business conflict, such as an attempt to register an employee with an email address that must be unique.",

        "Custom exceptions should communicate meaningful failure conditions rather than being created for every minor operation. Use standard Java exceptions when they already express the situation adequately."
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
      id: "custom-when",

      title: "When Should You Create a Custom Exception?",

      paragraphs: [
        "A custom exception is useful when the application needs to identify a particular failure and handle it differently from other failures.",

        "For example, EmployeeNotFoundException can map to HTTP 404, while DuplicateResourceException can map to HTTP 409 Conflict. The mapping is an API design decision based on the meaning of the failure."
      ],

      bullets: [
        "Use EmployeeNotFoundException when a requested employee does not exist.",
        "Use DuplicateResourceException when a request conflicts with an existing business resource.",
        "Use InvalidOrderStateException when an order operation is not allowed in its current state.",
        "Use standard validation mechanisms for ordinary request-field validation.",
        "Avoid creating many custom exceptions that all represent exactly the same failure."
      ],

      code: {
        language: "java",
        code: `public Employee getEmployee(Long id) {

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
      id: "global",

      title: "2. Centralize Common Exception Handling",

      paragraphs: [
        "Use @RestControllerAdvice to centralize exception handling that is common across multiple REST controllers. This avoids repeating similar try-catch blocks in every controller method.",

        "@RestControllerAdvice combines controller-advice behavior with response-body semantics. It allows methods annotated with @ExceptionHandler to produce response bodies for matching exceptions.",

        "A centralized handler can translate application exceptions into consistent HTTP status codes and error-response objects. Keep the response contract stable so that frontend applications do not need to understand internal Java exception classes."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
        EmployeeNotFoundException.class
    )
    public ResponseEntity<ErrorResponse>
    handleNotFound(
            EmployeeNotFoundException exception,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(
                Instant.now(),
                404,
                "Not Found",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
}`
      }
    },

    {
      id: "error-response-dto",

      title: "Design a Reusable Error Response DTO",

      paragraphs: [
        "The error-response DTO defines the structure returned to clients when a request fails. A dedicated DTO prevents controllers and exception handlers from creating inconsistent response formats.",

        "This example uses a Java record, available in Java 16 and later. In a conventional class, the same fields can be represented using a constructor, fields, and accessor methods.",

        "The timestamp, status, error, message, and path fields provide useful context. For larger applications, you can add a stable application error code and a request or trace identifier."
      ],

      code: {
        language: "java",
        code: `import java.time.Instant;

public record ErrorResponse(
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
      id: "dont-responseentity-service",

      title: "3. Do Not Mix HTTP Concerns into the Service Layer",

      paragraphs: [
        "The service layer should generally focus on business logic rather than constructing HTTP responses. ResponseEntity belongs primarily to the web layer because it represents an HTTP response, including its status, headers, and body.",

        "A service should return domain data when an operation succeeds and throw an appropriate exception when a business or resource-level operation cannot be completed. The controller or global exception handler then translates that exception into an HTTP response.",

        "This separation allows the same service to be reused by REST controllers, scheduled jobs, message consumers, and other application components without depending on HTTP."
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
     +---- Success: return employee data
     |
     +---- Failure: throw EmployeeNotFoundException
                              |
                              v
                    Global Exception Handler
                              |
                              v
                       HTTP 404 Response`
      }
    },

    {
      id: "service-example",

      title: "Example: Keep the Service Focused on Business Logic",

      paragraphs: [
        "The service below retrieves an employee. It does not create ResponseEntity or decide how the exception should be serialized into an HTTP response.",

        "The controller can remain small because the service owns the lookup logic and the global exception handler owns the error-response mapping."
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
}

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(
            EmployeeService service) {

        this.service = service;
    }

    @GetMapping("/{id}")
    public Employee getEmployee(
            @PathVariable Long id) {

        return service.getEmployee(id);
    }
}`
      }
    },

    {
      id: "specific",

      title: "4. Handle Specific Exceptions",

      paragraphs: [
        "Known exceptions should have specific handlers when they require a particular HTTP status or response structure. This makes the application's behavior intentional and easier to understand.",

        "For a typical REST API, a missing resource often maps to 404 Not Found, invalid request data to 400 Bad Request, and a conflicting resource operation to 409 Conflict.",

        "Choose status codes based on the actual meaning of the failure. Not every exception should become HTTP 500, and not every database exception should be treated as a duplicate-resource error."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(
    EmployeeNotFoundException.class
)
public ResponseEntity<ErrorResponse>
handleNotFound(
        EmployeeNotFoundException exception,
        HttpServletRequest request) {

    ErrorResponse error = new ErrorResponse(
            Instant.now(),
            404,
            "Not Found",
            exception.getMessage(),
            request.getRequestURI()
    );

    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(error);
}`
      }
    },

    {
      id: "http-status-guide",

      title: "Choosing Appropriate HTTP Status Codes",

      paragraphs: [
        "HTTP status codes tell the client what kind of outcome occurred. They should reflect the request and application semantics rather than simply mirroring the Java exception class."
      ],

      bullets: [
        "400 Bad Request: the request is malformed or contains invalid input.",
        "401 Unauthorized: authentication is required or the supplied credentials are invalid.",
        "403 Forbidden: the caller is authenticated but is not allowed to perform the operation.",
        "404 Not Found: the requested resource does not exist or is intentionally concealed.",
        "409 Conflict: the request conflicts with the current state of a resource.",
        "422 Unprocessable Content: optionally used when a syntactically valid request fails semantic validation.",
        "500 Internal Server Error: an unexpected server-side failure occurred.",
        "503 Service Unavailable: the service is temporarily unable to handle requests."
      ]
    },

    {
      id: "generic",

      title: "5. Use Generic Handling as a Fallback",

      paragraphs: [
        "A generic Exception handler can prevent unexpected application exceptions from producing an uncontrolled response. However, it should not replace specific handlers for known failures.",

        "Use specific handlers first for expected application exceptions. Then use a generic fallback for unexpected exceptions that have no more appropriate handler.",

        "Return a safe, generic message to the client for unexpected failures. Log the exception on the server so that developers can investigate the actual cause.",

        "A generic handler in controller advice handles exceptions that reach Spring MVC's exception-resolution mechanism. It does not automatically handle every failure occurring earlier in the request pipeline, such as every servlet-filter or Spring Security failure."
      ],

      code: {
        language: "java",
        code: `private static final Logger log =
        LoggerFactory.getLogger(
            GlobalExceptionHandler.class
        );

@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse>
handleUnexpected(
        Exception exception,
        HttpServletRequest request) {

    log.error(
        "Unexpected failure for {} {}",
        request.getMethod(),
        request.getRequestURI(),
        exception
    );

    ErrorResponse error = new ErrorResponse(
            Instant.now(),
            500,
            "Internal Server Error",
            "An unexpected error occurred",
            request.getRequestURI()
    );

    return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
}`
      }
    },

    {
      id: "dont-expose",

      title: "6. Do Not Expose Internal Details",

      paragraphs: [
        "Database exceptions, stack traces, SQL statements, internal class names, filesystem paths, and other implementation details should not normally be exposed directly to API clients.",

        "These details can reveal application architecture, database structure, library versions, or other information that could help an attacker. They also make the API contract dependent on implementation details that may change.",

        "Use a safe client-facing message and keep detailed diagnostic information in appropriately protected server-side logs. A stable error code can help clients identify the failure without receiving sensitive information.",

        "Be careful with exception messages as well. A custom exception message may be suitable for the client, but a raw database or infrastructure exception message usually is not."
      ],

      code: {
        language: "java",
        code: `// Avoid returning raw internal exception details.
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse>
unsafeExample(Exception exception) {

    // Do not expose exception.getMessage()
    // or a stack trace for unexpected failures.
    ErrorResponse error = new ErrorResponse(
            Instant.now(),
            500,
            "Internal Server Error",
            "An unexpected error occurred",
            "/api/employees"
    );

    return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
}`
      }
    },

    {
      id: "consistent",

      title: "7. Keep Error Responses Consistent",

      paragraphs: [
        "A consistent error contract makes it easier for React applications, mobile applications, and other API clients to process failures. The frontend can use the same fields regardless of which endpoint produced the error.",

        "The following JSON illustrates a response for a missing employee. Its path and timestamp are examples; the application should populate them from the actual request.",

        "Avoid changing the shape of the response arbitrarily between controllers. If the API needs more diagnostic information, add fields in a controlled and backward-compatible way."
      ],

      code: {
        language: "json",
        code: `{
  "timestamp": "2026-09-26T15:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found",
  "path": "/api/employees/10"
}`
      }
    },

    {
      id: "stable-error-codes",

      title: "Use Stable Application Error Codes",

      paragraphs: [
        "For a larger API, a stable error code can be more useful to a frontend than matching the human-readable message. Messages may change for clarity or localization, while an error code can remain stable.",

        "For example, EMPLOYEE_NOT_FOUND identifies a missing employee. The React frontend can use that code to display a suitable message or guide the user to another action.",

        "Do not use a stack trace, database error code, or Java class name as the public application error code. Choose a deliberate API-level identifier."
      ],

      code: {
        language: "json",
        code: `{
  "timestamp": "2026-09-26T15:30:00Z",
  "status": 404,
  "error": "Not Found",
  "code": "EMPLOYEE_NOT_FOUND",
  "message": "Employee not found",
  "path": "/api/employees/10"
}`
      }
    },

    {
      id: "logging",

      title: "8. Log Unexpected Failures",

      paragraphs: [
        "Unexpected server-side failures should be logged with enough context to investigate the problem. Logging the exception object allows the logging framework to record the stack trace.",

        "Use a logging framework such as SLF4J with Logback, which is commonly used in Spring Boot applications. Avoid using System.out.println as the primary production logging mechanism.",

        "Expected business failures, such as a resource not being found, do not necessarily need to be logged as errors every time. Excessive logging of routine failures can make genuine incidents harder to identify.",

        "Never log passwords, access tokens, session identifiers, or unnecessary personal information. Sanitize untrusted values when they could create log-injection risks, and ensure logs are accessible only to authorized personnel."
      ],

      code: {
        language: "java",
        code: `private static final Logger log =
        LoggerFactory.getLogger(
            EmployeeService.class
        );

public Employee getEmployee(Long id) {

    log.debug("Looking up employee with id {}", id);

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
      id: "logging-levels",

      title: "Choosing the Right Logging Level",

      paragraphs: [
        "Logging levels help teams distinguish routine diagnostic information from serious failures. Choose a level based on the operational significance of the event."
      ],

      bullets: [
        "TRACE: very detailed execution information, usually enabled only when needed.",
        "DEBUG: diagnostic details useful during development or investigation.",
        "INFO: significant normal application events.",
        "WARN: an unusual condition that may require attention but is not necessarily a failure.",
        "ERROR: an operation or request failed unexpectedly or requires investigation."
      ]
    },

    {
      id: "testing",

      title: "9. Test Exception Scenarios",

      paragraphs: [
        "Exception handling should be tested just like successful application behavior. A test should verify both the HTTP status and the error-response body.",

        "Test expected failures at the appropriate level. A service unit test can verify that a missing employee causes EmployeeNotFoundException. A controller integration test can verify that the exception becomes an HTTP 404 response with the expected JSON structure.",

        "Use MockMvc for Spring MVC tests when appropriate. The example below assumes that Spring Boot test dependencies are present and that the application has a working MVC configuration and global exception handler."
      ],

      bullets: [
        "Test resource-not-found scenarios.",
        "Test validation failures.",
        "Test duplicate-resource scenarios.",
        "Test malformed request bodies and request parameters.",
        "Test unexpected failures and ensure internal details are not returned.",
        "Verify both HTTP status and response body.",
        "Verify that the response uses the expected content type.",
        "Verify important logging or monitoring behavior where practical."
      ]
    },

    {
      id: "testing-example",

      title: "Example: Test the HTTP Error Response",

      paragraphs: [
        "This MockMvc test verifies that requesting a missing employee returns 404 and the expected application error code. It assumes the endpoint, DTO serialization, and exception handler use the same contract shown in this lesson.",

        "The test uses a real MVC test context rather than manually constructing an uninitialized controller or handler."
      ],

      code: {
        language: "java",
        code: `@SpringBootTest
@AutoConfigureMockMvc
class EmployeeExceptionHandlingTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingEmployeeReturnsNotFound()
            throws Exception {

        mockMvc.perform(
                get("/api/employees/999999")
            )
            .andExpect(status().isNotFound())
            .andExpect(
                jsonPath("$.status").value(404)
            )
            .andExpect(
                jsonPath("$.error")
                    .value("Not Found")
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
      id: "validation",

      title: "Handle Validation Errors Properly",

      paragraphs: [
        "Request validation failures are common in REST APIs. Use Bean Validation annotations such as @NotBlank, @Email, @Size, and @Min to describe constraints on incoming data.",

        "In Spring MVC, @Valid on a request body commonly results in MethodArgumentNotValidException when validation fails. Depending on the validation mechanism and Spring version, method-level validation can produce other exceptions, including HandlerMethodValidationException.",

        "Translate validation failures into a useful 400 Bad Request response. Do not return a raw stack trace or force the frontend to understand Spring's internal exception structure."
      ],

      code: {
        language: "java",
        code: `public record CreateEmployeeRequest(

    @NotBlank(message = "Name is required")
    String name,

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
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
      id: "database-errors",

      title: "Handle Database Errors Carefully",

      paragraphs: [
        "Database-related failures need careful classification. DataIntegrityViolationException can indicate a unique constraint violation, a foreign-key violation, a not-null constraint violation, or another integrity problem. It does not always mean that a duplicate resource exists.",

        "Translate a database failure into a client-facing response only when the cause is understood and the response is appropriate. For example, a known unique-email constraint violation might become 409 Conflict.",

        "Do not return the raw database message to the client. It may expose table names, column names, SQL statements, or other implementation details.",

        "Whenever possible, enforce critical data-integrity rules in the database. An application-level existence check alone is not enough to prevent concurrent requests from creating duplicate records."
      ],

      bullets: [
        "Use database constraints to enforce uniqueness and referential integrity.",
        "Identify known constraint violations rather than treating every database error identically.",
        "Return a suitable 409 response for a recognized resource conflict when appropriate.",
        "Log unexpected persistence failures securely.",
        "Avoid swallowing database exceptions when the transaction must fail."
      ]
    },

    {
      id: "transactions",

      title: "Do Not Accidentally Swallow Exceptions",

      paragraphs: [
        "Catching an exception and continuing as if an operation succeeded can leave the application in an inconsistent state. This is especially important when database transactions are involved.",

        "For example, if a transactional service catches a RuntimeException and does not rethrow it, Spring's default rollback rules may not trigger rollback for that exception because the exception no longer escapes the transactional method.",

        "If a failure means the entire operation must be rolled back, allow the exception to propagate or explicitly configure the appropriate rollback behavior. Handle an exception locally only when the application can recover correctly."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transferMoney(
        Long fromAccountId,
        Long toAccountId,
        BigDecimal amount) {

    debit(fromAccountId, amount);

    try {
        credit(toAccountId, amount);
    } catch (RuntimeException exception) {

        // Do not silently continue when the
        // transfer must be atomic.
        throw exception;
    }
}`
      }
    },

    {
      id: "async-security",

      title: "Remember Security and Filter-Level Errors",

      paragraphs: [
        "Controller advice handles exceptions that are resolved through Spring MVC. It is not a universal handler for every error that can occur before a controller executes.",

        "Authentication and authorization failures often occur in the Spring Security filter chain. Configure AuthenticationEntryPoint for authentication failures and AccessDeniedHandler for access-denied responses when necessary.",

        "Other failures may require handling at the servlet filter, gateway, message-consumer, scheduled-task, or asynchronous execution layer. Choose the handler appropriate to where the failure occurs."
      ],

      code: {
        language: "text",
        code: `Incoming HTTP Request
        |
        v
Servlet Filters / Security Filters
        |
        +---- Authentication failure
        |          |
        |          v
        |   AuthenticationEntryPoint
        |
        +---- Access denied
        |          |
        |          v
        |   AccessDeniedHandler
        |
        v
DispatcherServlet
        |
        v
Controller
        |
        v
@RestControllerAdvice
        |
        v
HTTP Error Response`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Exception Handling Mistakes",

      paragraphs: [
        "These mistakes can make an API difficult to debug, insecure, or inconsistent. Review them when building or maintaining a Spring Boot application."
      ],

      bullets: [
        "Returning HTTP 200 for a failed operation without a deliberate API contract.",
        "Using HTTP 500 for every known business failure.",
        "Returning raw exception messages, stack traces, or SQL errors to clients.",
        "Writing the same exception-handling code in every controller.",
        "Returning ResponseEntity directly from every service method.",
        "Catching Exception and ignoring it.",
        "Logging every expected validation or not-found failure at ERROR level.",
        "Treating all DataIntegrityViolationException instances as duplicate records.",
        "Assuming @RestControllerAdvice handles failures raised before Spring MVC reaches the controller.",
        "Testing only successful requests while ignoring failure responses."
      ]
    },

    {
      id: "recommended-architecture",

      title: "Recommended Exception Handling Architecture",

      paragraphs: [
        "A clean Spring Boot REST API separates request processing, business logic, persistence, and HTTP error translation. Custom exceptions communicate known failures from the service layer to the web layer."
      ],

      code: {
        language: "text",
        code: `Client
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

When a known failure occurs:
  |
  v
Custom Application Exception
  |
  v
@RestControllerAdvice
  |
  v
@ExceptionHandler
  |
  v
Consistent ErrorResponse
  |
  v
Appropriate HTTP Status`
      }
    },

    {
      id: "implementation-example",

      title: "Putting the Best Practices Together",

      paragraphs: [
        "The following example shows a global handler with specific handling for a missing employee and a generic fallback for unexpected exceptions.",

        "The ErrorResponse record is the reusable DTO defined earlier in this lesson. Imports and the DTO are omitted here because they are already shown in the previous sections.",

        "In a production application, extend this handler with other known exceptions, validation handling, and logging policies that match the API's requirements."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
            LoggerFactory.getLogger(
                GlobalExceptionHandler.class
            );

    @ExceptionHandler(
        EmployeeNotFoundException.class
    )
    public ResponseEntity<ErrorResponse>
    handleNotFound(
            EmployeeNotFoundException exception,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(
                Instant.now(),
                404,
                "Not Found",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>
    handleUnexpected(
            Exception exception,
            HttpServletRequest request) {

        log.error(
            "Unexpected error processing {} {}",
            request.getMethod(),
            request.getRequestURI(),
            exception
        );

        ErrorResponse error = new ErrorResponse(
                Instant.now(),
                500,
                "Internal Server Error",
                "An unexpected error occurred",
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }
}`
      }
    },

    {
      id: "best-practices-summary",

      title: "Best Practices Summary",

      bullets: [
        "Use meaningful custom exceptions for important business and resource failures.",
        "Use @RestControllerAdvice to centralize common REST exception handling.",
        "Use @ExceptionHandler for specific exception types.",
        "Keep HTTP response construction in the web layer.",
        "Map failures to appropriate HTTP status codes.",
        "Use a reusable error-response DTO.",
        "Keep response fields and error codes consistent.",
        "Never expose raw stack traces or internal database details to clients.",
        "Log unexpected failures with useful context and appropriate severity.",
        "Avoid logging secrets or unnecessary sensitive information.",
        "Test successful requests and failure scenarios.",
        "Handle validation and database failures according to their actual meaning.",
        "Do not silently swallow exceptions that should cause transaction rollback.",
        "Configure separate handling for security-filter failures where necessary.",
        "Keep error messages stable and understandable for API consumers."
      ]
    },

    {
      id: "final-checklist",

      title: "Exception Handling Checklist",

      bullets: [
        "Use meaningful custom exceptions.",
        "Prefer centralized handling for common API failures.",
        "Use @RestControllerAdvice for REST APIs.",
        "Use @ExceptionHandler for specific exception types.",
        "Return appropriate HTTP status codes.",
        "Keep error responses consistent.",
        "Do not expose internal implementation details.",
        "Keep HTTP concerns out of business services.",
        "Log unexpected failures appropriately.",
        "Write tests for failure scenarios.",
        "Validate incoming request data.",
        "Distinguish known database constraint violations from unexpected persistence failures.",
        "Avoid swallowing exceptions that must trigger rollback.",
        "Check whether failures occur in Spring MVC, Spring Security, or an earlier processing layer."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What are the best practices for exception handling in Spring Boot?",

          answer:
            "Use meaningful custom exceptions, centralized handling with @RestControllerAdvice, appropriate HTTP status codes, consistent error responses, secure logging, and tests for failure scenarios. Avoid exposing internal implementation details."
        },

        {
          question: "Should the service layer return ResponseEntity?",

          answer:
            "Normally no. The service layer should focus on business logic and return application data or throw meaningful exceptions. The controller or web layer should construct the HTTP response."
        },

        {
          question: "Why should we avoid exposing stack traces to clients?",

          answer:
            "Stack traces can reveal internal implementation details and potentially sensitive information. Clients should receive a controlled error response, while detailed diagnostics remain in protected server-side logs."
        },

        {
          question: "What is the purpose of @RestControllerAdvice?",

          answer:
            "@RestControllerAdvice provides centralized advice for REST controllers. It is commonly used with @ExceptionHandler to translate exceptions into consistent HTTP response bodies."
        },

        {
          question: "What is the difference between @ControllerAdvice and @RestControllerAdvice?",

          answer:
            "@ControllerAdvice provides shared controller advice. @RestControllerAdvice combines that behavior with response-body semantics, making it convenient for REST API error responses."
        },

        {
          question: "Why should we create custom exceptions?",

          answer:
            "Custom exceptions represent meaningful application failures, such as a missing employee or a duplicate resource. They make the code easier to understand and allow specific error-handling policies."
        },

        {
          question: "How should a missing employee be handled?",

          answer:
            "The service can throw EmployeeNotFoundException when the repository finds no employee. A specific exception handler can translate that exception into HTTP 404 Not Found."
        },

        {
          question: "When should an API return HTTP 400?",

          answer:
            "HTTP 400 Bad Request is appropriate when the request is malformed or its input is invalid. Validation failures and malformed request bodies commonly use this status."
        },

        {
          question: "When should an API return HTTP 409?",

          answer:
            "HTTP 409 Conflict is appropriate when a request conflicts with the current state of a resource, such as a recognized duplicate-resource operation."
        },

        {
          question: "Should every exception return HTTP 500?",

          answer:
            "No. Known client and business failures should map to appropriate status codes. HTTP 500 is generally used for unexpected server-side failures."
        },

        {
          question: "Why do we need a generic exception handler?",

          answer:
            "A generic handler provides a controlled fallback for unexpected exceptions that reach Spring MVC's exception-resolution mechanism. It should log the failure securely and return a safe response without replacing specific handlers."
        },

        {
          question: "What is the danger of returning exception.getMessage() for every exception?",

          answer:
            "An unexpected exception message may contain SQL details, filesystem paths, infrastructure information, or other internal data. Use a safe public message for unexpected failures."
        },

        {
          question: "What is the purpose of an ErrorResponse DTO?",

          answer:
            "It defines a consistent structure for error responses, allowing API clients to process status, timestamp, message, path, and optional application error codes in a predictable way."
        },

        {
          question: "How should unexpected exceptions be logged?",

          answer:
            "Use a logging framework and include the exception object so the stack trace is recorded. Add useful request context without logging passwords, tokens, or unnecessary sensitive data."
        },

        {
          question: "Should all exceptions be logged at ERROR level?",

          answer:
            "No. Routine expected failures may not require error-level logging. Choose logging levels according to the event's significance to avoid excessive noise."
        },

        {
          question: "How do you test exception handling in Spring Boot?",

          answer:
            "Use unit tests to verify service exception behavior and MockMvc or integration tests to verify the HTTP status, content type, response body, and public error contract."
        },

        {
          question: "How should validation errors be handled?",

          answer:
            "Use Bean Validation annotations and handle the resulting validation exceptions to return an appropriate 400 response with safe, useful validation details."
        },

        {
          question: "Does @RestControllerAdvice handle every exception in a Spring Boot application?",

          answer:
            "No. It handles exceptions resolved through Spring MVC. Failures in earlier filters, Spring Security, scheduled tasks, message consumers, or asynchronous execution may require separate handling."
        },

        {
          question: "Why should database exceptions be classified carefully?",

          answer:
            "A database integrity exception can represent several different problems, including unique, foreign-key, and not-null constraint violations. The application should identify the actual failure before choosing a client-facing status."
        },

        {
          question: "Why is an application-level duplicate check not always sufficient?",

          answer:
            "Two concurrent requests can both pass an existence check before either inserts its record. A database unique constraint is needed to enforce uniqueness reliably."
        },

        {
          question: "What happens if a transactional service catches and swallows an exception?",

          answer:
            "If the exception no longer escapes the transactional method, Spring's default rollback rules may not trigger rollback for it. When the operation must be rolled back, propagate the exception or explicitly configure rollback behavior."
        },

        {
          question: "Why should the error-response format remain consistent?",

          answer:
            "Consistent responses simplify frontend error handling and prevent clients from needing endpoint-specific logic to interpret the same type of failure."
        },

        {
          question: "What is a stable application error code?",

          answer:
            "It is a predictable identifier such as EMPLOYEE_NOT_FOUND that clients can use to identify an error independently of its human-readable message."
        },

        {
          question: "What is the difference between an expected and an unexpected exception?",

          answer:
            "An expected exception represents a known condition that the application can handle deliberately, such as a missing resource. An unexpected exception indicates an unanticipated failure that generally requires diagnostic investigation."
        },

        {
          question: "Explain the complete exception-handling flow in a Spring Boot REST API.",

          answer:
            "A request reaches the controller, which calls the service. If the service encounters a known failure, it throws a meaningful exception. Spring MVC resolves the exception through a suitable @ExceptionHandler, often in @RestControllerAdvice. The handler creates a consistent error response with an appropriate HTTP status, and unexpected failures are logged securely."
        }
      ]
    }
  ]
};
