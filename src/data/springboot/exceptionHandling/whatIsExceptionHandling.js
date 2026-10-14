
export const whatIsExceptionHandling = {
  id: 701,

  title: "What is Exception Handling?",

  slug: "what-is-exception-handling",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand what exceptions are, why exception handling is important, how Java exceptions propagate through application layers, and how Spring Boot returns consistent HTTP error responses using custom exceptions, @ExceptionHandler, and @RestControllerAdvice.",

  estimatedTime: "35 min",

  sections: [
    {
      id: "exception-introduction",

      title: "What is an Exception?",

      paragraphs: [
        "An exception is an event that occurs during program execution and interrupts the normal flow of instructions. In Java, exceptions are represented by objects that describe an abnormal condition or failure.",

        "For example, an application may try to find an employee who does not exist, divide a number by zero, parse invalid input, access a missing file, or communicate with a database that is temporarily unavailable.",

        "Java provides an exception-handling mechanism that allows developers to detect failures, respond to them, and decide whether execution can continue or the current operation must stop.",

        "In Spring Boot applications, exceptions can originate in controllers, service classes, repositories, database operations, request validation, or other components. The application should handle these failures at an appropriate layer and return a meaningful response to the client.",

        "An exception is not necessarily a programming mistake. Some exceptions represent expected business situations, such as an employee not being found. Others indicate unexpected technical problems, such as a database connection failure or a NullPointerException."
      ],

      bullets: [
        "Employee does not exist.",
        "Invalid request data is received.",
        "A required request parameter is missing.",
        "A database operation violates a constraint.",
        "A requested file or external resource cannot be accessed.",
        "An unexpected programming error occurs.",
        "A downstream service fails or times out."
      ],

      code: {
        language: "java",
        code: `public class ExceptionExample {

    public static void main(String[] args) {
        int a = 10;
        int b = 0;

        int result = a / b;

        System.out.println(result);
    }
}`
      }
    },

    {
      id: "why-handling",

      title: "Why is Exception Handling Important?",

      paragraphs: [
        "Exception handling prevents failures from being handled inconsistently or exposed directly to API clients. It allows an application to translate technical or business failures into appropriate HTTP responses.",

        "A REST API should communicate the outcome of a request using an appropriate HTTP status code and a predictable response structure. This makes it easier for frontend applications, mobile applications, and other services to understand and process errors.",

        "For example, if a client requests an employee with ID 100 but that employee does not exist, returning HTTP 404 Not Found is generally more meaningful than returning HTTP 200 OK with an unexplained null value.",

        "Exception handling also improves maintainability. Instead of repeating error-response logic in every controller, an application can centralize common handling rules in one place.",

        "Good exception handling does not mean catching every exception and ignoring it. It means recognizing the failure, preserving useful diagnostic information, returning an appropriate response, and allowing the application to maintain its intended behavior."
      ],

      bullets: [
        "Provides meaningful HTTP status codes.",
        "Maintains a consistent API error-response structure.",
        "Separates business failures from unexpected technical failures.",
        "Prevents internal stack traces and sensitive implementation details from leaking to clients.",
        "Makes debugging easier through appropriate server-side logging.",
        "Reduces repeated exception-handling code.",
        "Helps frontend applications display useful error messages."
      ],

      code: {
        language: "json",
        code: `{
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found",
  "path": "/api/employees/100"
}`
      }
    },

    {
      id: "without-handling",

      title: "What Happens Without Proper Handling?",

      paragraphs: [
        "When an exception is not handled by application-specific logic, it propagates up the call stack. If no suitable handler catches it, the framework or runtime handles the failure according to its default behavior.",

        "In a Spring Boot REST application, Spring MVC and Spring Boot may produce a default error response for an unhandled request-processing exception. The exact response depends on the exception, framework configuration, and error-response settings.",

        "The main problem is not that every unhandled exception causes the server to stop. Usually, an individual request fails while the application continues running. The problem is that the response may not match the API's intended business semantics or error format.",

        "For example, one controller might return a custom JSON message, another might return a framework-generated error response, and another might return an inappropriate success status. Such inconsistency makes frontend error handling difficult.",

        "A particularly dangerous mistake is catching an exception and returning null or an ordinary success response. This hides the failure and can cause incorrect behavior in the frontend or downstream services."
      ],

      code: {
        language: "text",
        code: `Controller A
    |
    v
Custom error format

Controller B
    |
    v
Framework error format

Controller C
    |
    v
Null or incorrect success response

Problem:
Inconsistent API behavior`
      },

      bullets: [
        "Clients may receive inconsistent error formats.",
        "An incorrect HTTP status may misrepresent the failure.",
        "Important diagnostic information may be lost.",
        "Returning null may cause a second failure later.",
        "Catching and ignoring exceptions can hide production defects.",
        "Raw technical messages can reveal database or implementation details."
      ]
    },

    {
      id: "with-global-handling",

      title: "Exception Handling with Spring Boot",

      paragraphs: [
        "Spring Boot applications commonly use Java exception handling together with Spring MVC's exception-resolution mechanisms. The most appropriate approach depends on whether the error is local to one controller or should be handled consistently across multiple controllers.",

        "A try-catch block can handle an exception directly where an operation is performed. A controller can also define an @ExceptionHandler method for specific exceptions. For application-wide REST API error handling, @RestControllerAdvice is a common choice.",

        "The service layer generally owns business operations and can throw meaningful exceptions when business rules cannot be satisfied. The web layer can then translate those exceptions into HTTP status codes and response bodies.",

        "For example, an EmployeeService can throw EmployeeNotFoundException when an employee does not exist. A global exception handler can translate that exception into HTTP 404 Not Found without placing HTTP response-building code throughout the service layer.",

        "The simplified flow below describes an exception raised during normal Spring MVC controller processing. Exceptions that occur earlier in servlet filters or Spring Security may need separate handling, such as an AuthenticationEntryPoint or AccessDeniedHandler."
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
Service Layer
     |
     v
Exception is thrown
     |
     v
Spring MVC exception resolution
     |
     v
@RestControllerAdvice
     |
     v
ErrorResponse
     |
     v
HTTP Error Response`
      },

      bullets: [
        "@ExceptionHandler handles selected exception types.",
        "@RestControllerAdvice provides shared REST controller exception handling.",
        "Custom exceptions represent meaningful application or business failures.",
        "ResponseEntity allows explicit control over the HTTP status and response body.",
        "Unexpected failures should be logged appropriately without exposing sensitive internals."
      ]
    },

    {
      id: "simple-example",

      title: "Simple Example",

      paragraphs: [
        "Consider an employee management REST API. A client sends a GET request to /api/employees/10 to retrieve employee ID 10.",

        "The controller receives the employee ID and calls the service layer. The service looks for the employee. If the employee exists, the service returns the employee data. If the employee does not exist, the service throws EmployeeNotFoundException.",

        "The controller does not need to construct the error response manually. A matching exception handler can convert EmployeeNotFoundException into a 404 response.",

        "This approach keeps the controller focused on handling HTTP requests and allows the service to focus on business operations."
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
      },

      bullets: [
        "The controller receives the request.",
        "The service performs the employee lookup.",
        "The service throws an exception if the employee is absent.",
        "The exception handler maps the failure to an HTTP response.",
        "The client receives a structured error instead of an incorrect success response."
      ]
    },

    {
      id: "what-is-try-catch",

      title: "Understanding try-catch in Java",

      paragraphs: [
        "Java provides try, catch, finally, throw, and throws as important parts of exception handling. The try block contains code that may fail, and a matching catch block handles a supported exception type.",

        "A catch block should handle an exception only when the application can take a meaningful action. Catching an exception merely to print a message and continue with invalid data can make the application less reliable.",

        "In a Spring Boot application, try-catch is useful for local recovery, cleanup decisions, or translating a lower-level exception into a meaningful application exception. It is usually unnecessary to add try-catch around every service or repository call if a global handler already manages the failure.",

        "Catch more specific exception types before broader types. For example, catch NumberFormatException before IllegalArgumentException when both handlers are needed and the former is not already covered by an earlier catch block."
      ],

      code: {
        language: "java",
        code: `public int divide(int a, int b) {
    try {
        return a / b;
    } catch (ArithmeticException ex) {
        System.out.println("Cannot divide by zero");
        throw ex;
    }
}`
      },

      bullets: [
        "try contains the code that may throw an exception.",
        "catch handles a matching exception type.",
        "finally is commonly used for cleanup when appropriate; try-with-resources is preferred for many resource-management scenarios.",
        "throw explicitly throws an exception object.",
        "throws declares exception types that a method may propagate."
      ]
    },

    {
      id: "custom-exception-flow",

      title: "How Exceptions Travel Through Application Layers",

      paragraphs: [
        "Java exceptions propagate through the call stack when a method does not catch them. If a repository call throws an exception, the exception can travel through the service method and controller method until an appropriate handler resolves it.",

        "Suppose EmployeeController calls EmployeeService, which calls EmployeeRepository. If the service detects that the requested employee is missing, it can throw EmployeeNotFoundException. The exception propagates out of the service method because the service does not catch it.",

        "During normal Spring MVC request processing, Spring's exception-resolution mechanism searches for an appropriate handler. A matching @ExceptionHandler in a controller or controller advice can produce the response.",

        "A global handler should map expected business exceptions explicitly. Unexpected exceptions can be handled by a fallback handler that returns a generic server-error message while logging the details internally.",

        "Do not catch an exception in the service, log it, and then silently return null unless null is explicitly part of the method's contract. That approach can prevent the correct exception handler from receiving the original failure."
      ],

      code: {
        language: "text",
        code: `EmployeeController
       |
       | calls
       v
EmployeeService
       |
       | employee is missing
       v
throw EmployeeNotFoundException
       |
       | propagates through the call stack
       v
Spring MVC exception resolution
       |
       v
Exception handler
       |
       v
HTTP 404 response`
      }
    },

    {
      id: "custom-exception-example",

      title: "Creating a Custom Exception",

      paragraphs: [
        "A custom exception gives a failure a clear application-specific meaning. Instead of throwing a generic RuntimeException for every situation, create exception types that represent important business conditions.",

        "For example, EmployeeNotFoundException communicates that the requested employee does not exist. The name makes the code easier to understand and allows the global exception handler to map this failure to a suitable status code.",

        "Extending RuntimeException is a common choice for service-layer business exceptions because it does not require callers to declare or catch the exception. Spring transaction management also normally treats unchecked exceptions as rollback triggers for applicable transactions.",

        "The HTTP status should normally be selected by the web-layer exception handler, not embedded in every service method. This keeps the service less dependent on HTTP concerns."
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
        "Use a meaningful exception name.",
        "Provide a useful message for diagnostics and controlled error mapping.",
        "Use custom exception types for meaningful business conditions.",
        "Do not use exceptions as a replacement for ordinary conditional logic.",
        "Avoid placing sensitive personal or system information in exception messages returned to clients."
      ]
    },

    {
      id: "service-layer-example",

      title: "Throwing an Exception from the Service Layer",

      paragraphs: [
        "The service layer implements the application's business operations. For an employee lookup, the service can call the repository and use Optional.orElseThrow to raise a custom exception when no matching record exists.",

        "Spring Data JPA repository methods such as findById return an Optional for standard ID lookups. Optional.orElseThrow is useful because it clearly describes the behavior required when a value is absent.",

        "The service should not return an arbitrary placeholder employee or a null value when the requested employee does not exist. Throwing a meaningful exception makes the failure explicit and allows the web layer to produce an appropriate response."
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
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                new EmployeeNotFoundException(
                    "Employee not found with id: " + id
                )
            );

        return new EmployeeResponse(
            employee.getId(),
            employee.getName(),
            employee.getEmail()
        );
    }
}`
      },

      paragraphs: [
        "In this example, EmployeeRepository is assumed to be a Spring Data repository for Employee, and EmployeeResponse is assumed to have a matching constructor. Adapt the names and constructor to your project's existing classes.",

        "The exception is raised only when the repository lookup is empty. When the employee exists, the service maps the entity into a response DTO and returns it."
      ]
    },

    {
      id: "exception-handler-basics",

      title: "Handling Exceptions with @ExceptionHandler",

      paragraphs: [
        "@ExceptionHandler is a Spring MVC annotation used to declare a method that handles one or more exception types. The method can be declared inside a controller for local handling or inside a controller advice for shared handling.",

        "An exception handler can return a response body, a ResponseEntity, or another supported MVC return type. Returning ResponseEntity is useful when the application must control the HTTP status and response headers.",

        "A local @ExceptionHandler is useful when a particular controller needs special behavior. When many controllers need the same error format, centralizing the handling in @RestControllerAdvice avoids repeated code.",

        "Spring MVC selects a suitable exception handler based on the exception and its type hierarchy. If more than one handler could apply, handler specificity and the MVC exception-resolution rules determine which one is selected."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id) {
        // Normal lookup logic
        return employeeService.findById(id);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFound(
            EmployeeNotFoundException ex) {

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }
}`
      },

      bullets: [
        "@ExceptionHandler identifies the exception type to handle.",
        "The exception parameter provides access to the exception object.",
        "ResponseEntity controls the HTTP status and body.",
        "A handler inside a controller is local to that controller.",
        "For a consistent API-wide response, use @RestControllerAdvice."
      ]
    },

    {
      id: "global-handling-example",

      title: "Global Exception Handling with @RestControllerAdvice",

      paragraphs: [
        "@RestControllerAdvice combines controller-advice behavior with response-body semantics. It allows the application to define exception handlers that can be applied across controllers.",

        "This is a common way to implement a centralized error-handling strategy in a Spring Boot REST API. Controllers can focus on request handling while the advice translates exceptions into standardized HTTP responses.",

        "For example, EmployeeNotFoundException can map to HTTP 404 Not Found, while a DuplicateResourceException might map to HTTP 409 Conflict if that matches the API's business semantics.",

        "The advice should include explicit handlers for expected failures and, when appropriate, a fallback handler for unexpected exceptions. A fallback should return a generic message and should not expose the exception's raw message, stack trace, SQL statement, or infrastructure details.",

        "Controller advice handles exceptions resolved by the Spring MVC exception-resolution mechanism. It does not automatically replace error handling for failures that occur before a request reaches MVC controller processing, such as some authentication or authorization failures in Spring Security filters."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(
            EmployeeNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorResponse error = new ApiErrorResponse(
            404,
            "Not Found",
            ex.getMessage(),
            request.getRequestURI()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpected(
            Exception ex,
            HttpServletRequest request) {

        // Log the exception on the server using an
        // appropriately configured logger.

        ApiErrorResponse error = new ApiErrorResponse(
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
      },

      bullets: [
        "@RestControllerAdvice centralizes REST exception handling.",
        "Specific exception handlers should be defined for known failure types.",
        "A fallback handler can prevent unexpected failures from producing inconsistent application-level responses.",
        "The server-side logs should retain the details needed for diagnosis.",
        "The client should receive only the information intended for public API consumers.",
        "Review the project's existing Spring MVC and Spring Boot error-handling configuration to avoid conflicting or redundant handlers."
      ]
    },

    {
      id: "error-response-example",

      title: "Designing a Standard Error Response",

      paragraphs: [
        "A standard error-response DTO provides a predictable structure for clients. A simple design can include the HTTP status, a short error label, a readable message, and the request path.",

        "A real API may also include a timestamp, a stable application error code, or a request correlation ID. These fields help clients distinguish error types and help support teams investigate reported failures.",

        "The error response should be designed for the API's consumers. Do not expose Java stack traces, SQL statements, database hostnames, authentication tokens, or other sensitive implementation details.",

        "If your application already uses Spring Boot's ProblemDetail support or an established API error schema, prefer maintaining that existing contract rather than introducing a conflicting response format."
      ],

      code: {
        language: "java",
        code: `public class ApiErrorResponse {

    private final int status;
    private final String error;
    private final String message;
    private final String path;

    public ApiErrorResponse(
            int status,
            String error,
            String message,
            String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}`
      },

      bullets: [
        "status: the HTTP status code represented by the response.",
        "error: a short description of the status category.",
        "message: a safe, human-readable explanation.",
        "path: the request path associated with the error.",
        "Optional fields: timestamp, stable error code, or correlation ID.",
        "Avoid returning raw exception objects or stack traces."
      ]
    },

    {
      id: "http-status-codes",

      title: "Choosing the Correct HTTP Status Code",

      paragraphs: [
        "Exception handling is not only about catching exceptions. The handler must also select an HTTP status that accurately represents the failure.",

        "HTTP 400 Bad Request is commonly used when the client sends malformed input or violates a request contract. HTTP 401 Unauthorized indicates that valid authentication is missing or not provided. HTTP 403 Forbidden indicates that the request is understood but access is not permitted.",

        "HTTP 404 Not Found is appropriate when a requested resource does not exist. HTTP 409 Conflict can represent a conflict with the current state of a resource, such as an attempted duplicate operation, when that is how the API defines the conflict.",

        "HTTP 500 Internal Server Error represents an unexpected server-side failure. A temporary dependency failure may sometimes be better represented by another status, such as 503 Service Unavailable, depending on the nature of the failure and the API contract.",

        "These mappings are common design choices rather than automatic rules for every Java exception. Choose the response based on the actual HTTP semantics and your application's documented contract."
      ],

      bullets: [
        "400 Bad Request: malformed JSON, invalid request syntax, or invalid request parameters.",
        "401 Unauthorized: authentication is missing or invalid.",
        "403 Forbidden: the caller is not permitted to perform the operation.",
        "404 Not Found: the requested resource does not exist.",
        "409 Conflict: a request conflicts with the current resource state.",
        "422 Unprocessable Content: sometimes used for syntactically valid requests that fail semantic validation, if the API adopts this convention.",
        "500 Internal Server Error: unexpected application failure.",
        "503 Service Unavailable: a service cannot currently handle the request, when this accurately describes the situation."
      ],

      code: {
        language: "text",
        code: `EmployeeNotFoundException
          -> 404 Not Found

Invalid request payload
          -> 400 Bad Request

Duplicate business resource
          -> 409 Conflict

Unexpected server failure
          -> 500 Internal Server Error`
      }
    },

    {
      id: "request-validation-exceptions",

      title: "Handling Validation and Request Errors",

      paragraphs: [
        "Some failures happen before the service layer is called. Spring MVC can reject a request because a required parameter is missing, a path variable cannot be converted to the expected type, or the JSON body cannot be deserialized.",

        "For example, a request containing a non-numeric value for a Long path variable can produce MethodArgumentTypeMismatchException. Malformed JSON can produce HttpMessageNotReadableException. A missing required query parameter can produce MissingServletRequestParameterException.",

        "When using @Valid with a request body DTO, validation failures commonly produce MethodArgumentNotValidException. Method-level validation can use HandlerMethodValidationException in applicable Spring Framework versions and controller signatures.",

        "These errors should generally be returned as client errors rather than being converted into generic HTTP 500 responses. A centralized handler can provide clear messages while preserving the API's error-response format.",

        "Validation messages should not disclose internal implementation details. For example, return a field-level message such as 'Email must be valid' rather than exposing a Java validation stack trace."
      ],

      code: {
        language: "java",
        code: `public class CreateEmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    // Getters and setters
}`
      },

      bullets: [
        "Use @Valid to trigger supported bean validation on request DTOs.",
        "Handle MethodArgumentNotValidException for common request-body validation failures.",
        "Consider HandlerMethodValidationException where method-level validation applies.",
        "Handle malformed JSON and parameter-conversion errors consistently.",
        "Return safe, useful validation messages.",
        "Do not assume every request failure originated in the service layer."
      ]
    },

    {
      id: "exception-types-overview",

      title: "Checked Exceptions and Unchecked Exceptions",

      paragraphs: [
        "Java exceptions are commonly discussed as checked exceptions and unchecked exceptions. This distinction affects whether the compiler requires a method to catch an exception or declare it using throws.",

        "Checked exceptions are subclasses of Exception that are not subclasses of RuntimeException. The compiler generally requires callers to catch them or declare them. IOException is a common example.",

        "Unchecked exceptions include RuntimeException and its subclasses, as well as Error and its subclasses. The compiler does not require them to be caught or declared. NullPointerException and IllegalArgumentException are common runtime examples.",

        "Spring service-layer business exceptions are often implemented as RuntimeException subclasses. This is a design convention, not a requirement: checked exceptions can also be used when the application has a reason to model a recoverable or declared failure that way.",

        "Error generally represents serious problems that applications should not routinely catch and suppress. Exception-handling code should be designed carefully rather than treating every Throwable as an ordinary recoverable error."
      ],

      code: {
        language: "java",
        code: `// Checked exception
public void readFile() throws IOException {
    Files.readString(Path.of("data.txt"));
}

// Unchecked exception
public void validateAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException(
            "Age must be at least 18"
        );
    }
}`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Exception-Handling Mistakes",

      paragraphs: [
        "A common mistake is catching Exception everywhere without knowing how to recover. This makes failures harder to understand and can hide programming defects.",

        "Another mistake is returning null when an operation fails. The caller may treat null as a valid result or encounter a second exception later, which obscures the original cause.",

        "Returning HTTP 200 OK for every outcome is also incorrect. HTTP success should indicate that the request was handled successfully according to the API's contract.",

        "A generic fallback handler must not reveal ex.getMessage() for every unexpected exception. Low-level messages can include SQL details, file paths, internal service names, or other sensitive data.",

        "Finally, avoid logging the same exception at every layer. Log it where useful diagnostic context is available, preserve the original cause when translating exceptions, and avoid producing redundant stack traces."
      ],

      bullets: [
        "Catching exceptions and silently ignoring them.",
        "Returning null for a failed operation without a defined contract.",
        "Returning HTTP 200 for unsuccessful requests.",
        "Returning stack traces or database details to API clients.",
        "Throwing generic exceptions for every business failure.",
        "Catching Exception and rethrowing it without adding value.",
        "Logging the same exception repeatedly at multiple layers.",
        "Converting every exception into HTTP 400 or HTTP 500 without considering its meaning."
      ],

      code: {
        language: "java",
        code: `// Bad: hides the failure
public Employee findEmployee(Long id) {
    try {
        return repository.findById(id).orElse(null);
    } catch (Exception ex) {
        return null;
    }
}`
      },

      paragraphs: [
        "A better approach is to distinguish a genuinely missing employee from an unexpected database or infrastructure failure. Use Optional.orElseThrow for the missing-record case and allow unexpected failures to propagate to suitable handling and logging."
      ]
    },

    {
      id: "best-practices",

      title: "Exception-Handling Best Practices",

      paragraphs: [
        "Good exception handling starts with a clear separation of responsibilities. The service layer should enforce business rules and raise meaningful exceptions. The web layer should translate those exceptions into appropriate HTTP responses.",

        "Use specific exception types for expected business failures and centralize shared REST error handling with @RestControllerAdvice when that fits the application architecture.",

        "Keep error responses stable and safe. Clients should receive a clear message and the correct status, while server logs retain the diagnostic context needed to investigate unexpected failures.",

        "Do not catch exceptions unless the current layer can recover, add useful context, translate the exception meaningfully, or perform required cleanup. Preserve the original cause when wrapping a lower-level exception.",

        "For production systems, consider correlation IDs, structured logs, metrics, and tests for both expected and unexpected failures. Exception handling should support observability without leaking sensitive information."
      ],

      bullets: [
        "Use custom exceptions for meaningful business failures.",
        "Use @RestControllerAdvice for shared REST exception handling.",
        "Map exceptions to appropriate HTTP status codes.",
        "Keep error-response structures consistent.",
        "Log unexpected failures with useful diagnostic context.",
        "Do not expose stack traces or sensitive details in API responses.",
        "Preserve the original cause when translating exceptions.",
        "Test error responses and status codes with MockMvc or integration tests.",
        "Handle authentication and authorization failures at the appropriate security layer.",
        "Avoid overly broad catch blocks and swallowed exceptions."
      ]
    },

    {
      id: "testing-exception-handling",

      title: "Testing Exception Handling",

      paragraphs: [
        "Exception handling should be tested just like successful application behavior. A test should verify that a known business failure produces the intended HTTP status and error-response structure.",

        "For example, when an employee is missing, a controller test can verify that the API returns HTTP 404 and includes the expected error message. The service can be mocked to throw EmployeeNotFoundException so that the test focuses on the web-layer behavior.",

        "Additional tests should cover malformed input, validation failures, duplicate-resource conflicts where applicable, and unexpected exceptions. Verify that fallback responses do not expose internal exception details.",

        "The exact test setup depends on the project's Spring Boot and Spring Framework versions. Use the mocking annotations and testing APIs supported by the version in your project."
      ],

      code: {
        language: "java",
        code: `@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    @Test
    void shouldReturn404WhenEmployeeDoesNotExist()
            throws Exception {

        given(employeeService.findById(99L))
            .willThrow(
                new EmployeeNotFoundException(
                    "Employee not found with id: 99"
                )
            );

        mockMvc.perform(get("/api/employees/99"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(
                jsonPath("$.message")
                    .value("Employee not found with id: 99")
            );
    }
}`
      },

      paragraphs: [
        "This example assumes that EmployeeController is configured with the relevant exception advice and that ApiErrorResponse exposes a message field. The @MockitoBean annotation is available in newer Spring Framework versions; use the compatible mocking annotation for your project's version."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is exception handling?",

          answer:
            "Exception handling is the mechanism used to detect, propagate, and respond to failures during program execution. In Java, it uses constructs such as try, catch, finally, throw, and throws. In Spring Boot, exception handling can also convert failures into meaningful HTTP responses."
        },

        {
          question: "Why is exception handling important in REST APIs?",

          answer:
            "It allows the API to return appropriate HTTP status codes and consistent error responses instead of exposing raw internal failures. It also improves debugging, maintainability, and frontend error handling."
        },

        {
          question: "How is exception handling commonly centralized in Spring Boot?",

          answer:
            "A common approach is to use @RestControllerAdvice with @ExceptionHandler methods. The advice handles selected exceptions across controllers and returns standardized REST error responses."
        },

        {
          question: "What is the difference between an exception and an error?",

          answer:
            "Both Exception and Error are subclasses of Throwable. Exception generally represents conditions an application may be able to handle, while Error generally represents serious problems that should not routinely be caught and suppressed."
        },

        {
          question: "What is the difference between checked and unchecked exceptions?",

          answer:
            "Checked exceptions must generally be caught or declared using throws. Unchecked exceptions, including RuntimeException subclasses, do not have that compiler requirement."
        },

        {
          question: "What is the difference between @ExceptionHandler and @RestControllerAdvice?",

          answer:
            "@ExceptionHandler declares a method for handling selected exceptions. It can be used inside a controller or controller advice. @RestControllerAdvice provides shared advice behavior with response-body semantics, making it useful for centralized REST exception handling."
        },

        {
          question: "What happens when an exception is thrown from a service method?",

          answer:
            "If the service does not catch the exception, it propagates through the call stack. During Spring MVC request processing, a suitable exception resolver or handler may convert it into an HTTP response. If no application-specific handler matches, framework defaults may apply."
        },

        {
          question: "Should a service method return null when an employee is not found?",

          answer:
            "Not unless null is explicitly part of the method's contract. A service can return Optional or throw a meaningful EmployeeNotFoundException. For an API lookup that requires an existing employee, a custom exception mapped to HTTP 404 is a common approach."
        },

        {
          question: "Which HTTP status should be returned when an employee does not exist?",

          answer:
            "HTTP 404 Not Found is the common choice when the requested employee resource does not exist."
        },

        {
          question: "What is the purpose of a global exception handler?",

          answer:
            "It centralizes exception-to-response mapping, reduces duplicated controller code, and helps maintain a consistent error-response format across a REST API."
        },

        {
          question: "Should every exception be caught using try-catch?",

          answer:
            "No. Catch an exception when the current layer can recover, translate it meaningfully, add useful context, or perform required cleanup. Otherwise, allow it to propagate to an appropriate handler."
        },

        {
          question: "How should unexpected exceptions be handled in a production API?",

          answer:
            "Return a safe generic server-error response, log the exception with appropriate diagnostic context, and avoid exposing stack traces or sensitive implementation details to clients."
        },

        {
          question: "What is the difference between HTTP 400 and HTTP 500?",

          answer:
            "HTTP 400 generally indicates a client request problem, such as malformed input. HTTP 500 indicates an unexpected server-side failure."
        },

        {
          question: "Can @RestControllerAdvice handle every application exception?",

          answer:
            "No. It handles exceptions resolved through Spring MVC controller processing. Failures in earlier servlet filters or Spring Security may require mechanisms such as an AuthenticationEntryPoint or AccessDeniedHandler."
        },

        {
          question: "What is a custom exception in Java?",

          answer:
            "A custom exception is an application-defined exception class that represents a meaningful failure, such as EmployeeNotFoundException. It makes the code clearer and allows specific exception handling."
        },

        {
          question: "Why should we not expose stack traces in API responses?",

          answer:
            "Stack traces can reveal implementation details, internal class names, file paths, SQL information, and other sensitive data. They should remain in appropriately protected server-side logs."
        },

        {
          question: "How do you test exception handling in Spring Boot?",

          answer:
            "Use controller tests with MockMvc or integration tests to verify the HTTP status, response body, and expected error message when the service throws an exception or request validation fails."
        }
      ]
    },

    {
      id: "revision-notes",

      title: "Quick Revision Notes",

      paragraphs: [
        "Exception handling allows an application to respond to failures in a controlled and consistent way. Java provides try-catch and exception types, while Spring MVC provides mechanisms to convert exceptions into HTTP responses.",

        "A common Spring Boot design is to throw meaningful business exceptions from the service layer and handle them using @RestControllerAdvice and @ExceptionHandler. This keeps business logic separate from HTTP response formatting."
      ],

      bullets: [
        "Exception: an object representing an abnormal condition during execution.",
        "try-catch: Java mechanism for handling selected exceptions.",
        "Custom exception: represents a meaningful application failure.",
        "@ExceptionHandler: handles selected exception types.",
        "@RestControllerAdvice: centralizes REST controller exception handling.",
        "404 Not Found: common response for a missing resource.",
        "400 Bad Request: common response for malformed or invalid request input.",
        "500 Internal Server Error: common response for an unexpected server failure.",
        "Best practice: return safe error messages and log diagnostic details on the server."
      ],

      code: {
        language: "text",
        code: `Controller
    |
    v
Service
    |
    v
Custom exception
    |
    v
@RestControllerAdvice
    |
    v
HTTP status + standard error body`
      }
    }
  ]
};
