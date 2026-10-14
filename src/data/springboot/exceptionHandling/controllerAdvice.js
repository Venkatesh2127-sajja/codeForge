
export const controllerAdvice = {
  id: 705,

  title: "@ControllerAdvice and @RestControllerAdvice",

  slug: "controller-advice",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand how @ControllerAdvice and @RestControllerAdvice provide centralized exception handling across Spring MVC controllers, including exception mapping, response formatting, advice scope, and REST API best practices.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "controller-advice",

      title: "What is @ControllerAdvice?",

      paragraphs: [
        "@ControllerAdvice is a Spring component that allows common controller-related behavior to be applied across multiple Spring MVC controllers. Instead of implementing the same logic in every controller, developers can define the behavior in one shared class.",

        "One of its most common uses is centralized exception handling with @ExceptionHandler methods. When a controller or a method invoked during request processing throws an exception, Spring MVC can look for an appropriate handler in controller advice.",

        "@ControllerAdvice can also participate in other controller-related mechanisms, such as shared model attributes and data binding configuration. However, in REST APIs, it is especially useful for returning consistent error responses.",

        "The advice class must be registered as a Spring bean, normally through component scanning. By default, controller advice can apply across controllers, although annotations and other selector attributes can restrict its scope."
      ],

      bullets: [
        "@ControllerAdvice is a Spring-managed component.",
        "It centralizes controller-related behavior across multiple controllers.",
        "It is commonly used with @ExceptionHandler.",
        "It reduces duplicated exception-handling code.",
        "It can be scoped to selected controllers or packages.",
        "It does not mean every exception in the entire application is automatically handled; the exception must reach a compatible Spring MVC handling mechanism."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public String handleEmployeeNotFound(
            EmployeeNotFoundException exception) {

        return "employee-not-found";
    }
}`
      }
    },

    {
      id: "rest-controller-advice",

      title: "What is @RestControllerAdvice?",

      paragraphs: [
        "@RestControllerAdvice is a convenient specialization of @ControllerAdvice designed for REST-style responses. It combines controller-advice behavior with response-body semantics.",

        "This means that the return value of an applicable handler method is written to the HTTP response body through Spring's message-conversion infrastructure, rather than being interpreted as a traditional MVC view name.",

        "For example, a handler can return a ResponseEntity containing an error DTO. Spring uses the response entity's status and body to produce an HTTP response, commonly serialized as JSON when the appropriate JSON message converter is configured.",

        "@RestControllerAdvice is therefore a common choice for REST APIs that need consistent error structures, such as status, message, timestamp, or validation details."
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
    public ResponseEntity<ErrorResponse>
            handleEmployeeNotFound(
                    EmployeeNotFoundException exception) {

        ErrorResponse response = new ErrorResponse(
            404,
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
    }
}`
      },

      bullets: [
        "@RestControllerAdvice is suitable for centralized REST API exception handling.",
        "It combines @ControllerAdvice with response-body semantics.",
        "ResponseEntity lets the handler explicitly choose the HTTP status and response body.",
        "A DTO provides a predictable structure for clients.",
        "The response is commonly serialized to JSON when a compatible message converter is available."
      ]
    },

    {
      id: "centralization",

      title: "Why Centralize Exception Handling?",

      paragraphs: [
        "Imagine an application with twenty REST controllers. If every controller implements its own logic for converting EmployeeNotFoundException into a 404 response, the same code may be repeated many times.",

        "Repeated implementations can become inconsistent. One controller might return a JSON object, another might return a string, and a third might return the wrong HTTP status.",

        "A global advice class allows common exception-handling rules to be implemented once. When a known exception occurs, the advice can produce a consistent response regardless of which applicable controller initiated the request.",

        "Centralization also makes changes easier. If the API error structure changes, the application can often update the relevant handler instead of editing every controller."
      ],

      code: {
        language: "text",
        code: `EmployeeController ----+
                       |
OrderController -------+
                       |
ProductController -----+----> GlobalExceptionHandler
                       |
UserController --------+
                       |
                       v
                Consistent HTTP response`
      },

      bullets: [
        "Reduces duplicated try-catch blocks in controllers.",
        "Improves consistency across REST endpoints.",
        "Separates request-handling logic from error-response formatting.",
        "Makes exception mappings easier to test and maintain.",
        "Allows different exception types to receive different HTTP statuses.",
        "Does not eliminate the need for local exception handling when a method can meaningfully recover from a failure."
      ]
    },

    {
      id: "controller-code",

      title: "Controllers Become Cleaner",

      paragraphs: [
        "A controller should generally coordinate HTTP requests and responses while delegating business logic to a service. It should not need to repeat the same error-response construction in every endpoint.",

        "In the following example, the controller delegates employee lookup to a service. If the service throws EmployeeNotFoundException, the exception can propagate to the global advice, which translates it into an HTTP response.",

        "The example assumes EmployeeService is injected and EmployeeResponse is the application's response DTO."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
        "The controller does not need to construct the 404 response itself.",
        "The service can throw a meaningful domain-specific exception.",
        "The global advice maps the exception to the HTTP response.",
        "Constructor injection makes the controller dependency explicit.",
        "Controllers should avoid catching exceptions unless they can recover or add meaningful handling."
      ]
    },

    {
      id: "exception-flow",

      title: "How Exception Handling Works in Spring MVC",

      paragraphs: [
        "When a request reaches a Spring MVC controller and an exception occurs, the exception may propagate through the invoked service and controller method.",

        "Spring MVC's DispatcherServlet uses its exception-resolution infrastructure to find a suitable way to handle the exception. Controller-local @ExceptionHandler methods and applicable controller advice are among the mechanisms that can resolve it.",

        "If an appropriate handler is found, Spring invokes it and uses its return value to build the response. If no suitable handler resolves the exception, other framework handling or the server's error mechanism may determine the final response.",

        "This flow applies to exceptions that reach the relevant MVC exception-handling mechanism. Failures occurring earlier in the request pipeline, such as certain Spring Security authentication failures, may require separate handling."
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
     +---- Normal result ----> HTTP response
     |
     +---- Exception
                |
                v
       Spring MVC exception resolution
                |
                v
       @ExceptionHandler method
                |
                v
       ErrorResponse + HTTP status`
      },

      bullets: [
        "DispatcherServlet is the central entry point for Spring MVC request dispatching.",
        "Exceptions may propagate from service code to the controller invocation.",
        "Spring MVC searches its exception-resolution mechanisms for a suitable handler.",
        "An applicable advice method creates the response for the handled exception.",
        "An exception is not automatically converted to a custom response unless an appropriate mechanism handles it."
      ]
    },

    {
      id: "exception-handler",

      title: "Understanding @ExceptionHandler",

      paragraphs: [
        "@ExceptionHandler marks a method that handles one or more specified exception types. The method can be declared inside a controller to handle exceptions locally or inside controller advice to handle them across applicable controllers.",

        "A handler can accept the exception as a method parameter and return a response body, ResponseEntity, or another supported result. With @RestControllerAdvice, response-body semantics apply by default.",

        "Use specific exception handlers for expected application failures. A broad handler can serve as a fallback, but it should not replace explicit handling of known error conditions."
      ],

      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EmployeeExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleNotFound(
            EmployeeNotFoundException exception) {

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(exception.getMessage());
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<String> handleDuplicate(
            DuplicateResourceException exception) {

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(exception.getMessage());
    }
}`
      },

      bullets: [
        "Use @ExceptionHandler to declare the exception type a method handles.",
        "Prefer specific handlers for expected application failures.",
        "Use ResponseEntity when explicit control over status and headers is required.",
        "Avoid returning raw internal exception messages if they could reveal sensitive details.",
        "If multiple handlers could apply, Spring's exception-resolution rules determine which handler is selected."
      ]
    },

    {
      id: "error-response",

      title: "Designing a Consistent Error Response",

      paragraphs: [
        "A REST API should return a predictable error format so frontend applications and API clients can process failures consistently.",

        "A simple error response may contain an HTTP status and a message. Larger applications may also include a timestamp, a machine-readable error code, validation details, and a request or trace identifier.",

        "Avoid including stack traces, SQL statements, credentials, internal file paths, or other sensitive diagnostic information in responses sent to clients."
      ],

      code: {
        language: "java",
        code: `import java.time.Instant;

public record ErrorResponse(
    Instant timestamp,
    int status,
    String code,
    String message
) {
    public static ErrorResponse of(
            int status,
            String code,
            String message) {

        return new ErrorResponse(
            Instant.now(),
            status,
            code,
            message
        );
    }
}`
      },

      bullets: [
        "Use a consistent response structure across endpoints.",
        "Keep HTTP status and response-body status consistent.",
        "Use stable error codes when clients need to distinguish failures programmatically.",
        "Keep messages understandable without exposing implementation details.",
        "Include validation details only when they are useful and safe.",
        "Document the error schema so frontend developers know what to expect."
      ]
    },

    {
      id: "complete-handler",

      title: "Complete Global Exception Handler Example",

      paragraphs: [
        "The following example combines custom not-found handling, duplicate-resource handling, request validation handling, and a fallback for unexpected exceptions.",

        "It assumes EmployeeNotFoundException and DuplicateResourceException extend RuntimeException. It also assumes a Spring MVC application with Jakarta Bean Validation configured for request validation.",

        "The fallback handler intentionally returns a generic message. In a production application, log unexpected exceptions with an appropriate logging framework and enough diagnostic context to investigate the failure securely."
      ],

      code: {
        language: "java",
        code: `import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
        LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            EmployeeNotFoundException exception) {

        ErrorResponse response = ErrorResponse.of(
            404,
            "EMPLOYEE_NOT_FOUND",
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(
            DuplicateResourceException exception) {

        ErrorResponse response = ErrorResponse.of(
            409,
            "DUPLICATE_RESOURCE",
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException exception) {

        List<String> messages = exception
            .getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error ->
                error.getField() + ": "
                    + error.getDefaultMessage()
            )
            .toList();

        ErrorResponse response = ErrorResponse.of(
            400,
            "VALIDATION_FAILED",
            String.join("; ", messages)
        );

        return ResponseEntity
            .badRequest()
            .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(
            Exception exception) {

        log.error(
            "Unexpected error while processing request",
            exception
        );

        ErrorResponse response = ErrorResponse.of(
            500,
            "INTERNAL_SERVER_ERROR",
            "An unexpected server error occurred"
        );

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(response);
    }
}`
      },

      bullets: [
        "The first handlers represent expected application-level failures.",
        "Validation errors can return useful details about invalid fields.",
        "The fallback handler avoids exposing the original exception message.",
        "Logging the exception preserves diagnostic information on the server.",
        "Use an established error-response DTO consistently across handlers.",
        "In a production API, consider whether validation messages or exception messages contain sensitive information before returning them."
      ]
    },

    {
      id: "scope",

      title: "Restricting the Scope of Controller Advice",

      paragraphs: [
        "By default, controller advice can apply to controllers throughout the application. Sometimes a project needs different exception-handling rules for different controller groups.",

        "Spring provides selector attributes such as basePackages, basePackageClasses, annotations, and assignableTypes for restricting which controllers an advice applies to.",

        "Scope selectors are useful in applications containing multiple API modules or controller groups that have different response contracts. Use them carefully because an exception handler may not apply if the controller is outside the configured scope."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.example.employee")
public class EmployeeApiExceptionHandler {

    // Exception handlers for controllers
    // in the selected package.
}`
      },

      bullets: [
        "Use basePackages to select controllers by package.",
        "Use basePackageClasses to select a package through a class reference.",
        "Use annotations or assignableTypes when a more specific controller selection is needed.",
        "Avoid overlapping advice definitions with confusing or unintended handler selection.",
        "Confirm that the advice package is included in component scanning."
      ]
    },

    {
      id: "comparison",

      title: "@ControllerAdvice vs @RestControllerAdvice",

      paragraphs: [
        "Both annotations provide controller-advice behavior. The main practical difference is the default response-body behavior.",

        "@ControllerAdvice is general-purpose. It can be used with traditional MVC controllers that return views or with explicit response-body mechanisms.",

        "@RestControllerAdvice is a convenient choice for REST APIs because it includes response-body semantics. A handler returning an error DTO is therefore serialized into the response body rather than treated as a view name."
      ],

      code: {
        language: "text",
        code: `@ControllerAdvice
    |
    +-- Shared controller advice behavior
    |
    +-- Commonly used with MVC views
    |
    +-- Response bodies can be configured explicitly


@RestControllerAdvice
    |
    +-- @ControllerAdvice behavior
    |
    +-- Response-body semantics by default
    |
    +-- Common choice for REST APIs`
      },

      bullets: [
        "@ControllerAdvice is suitable for general Spring MVC controller advice.",
        "@RestControllerAdvice is convenient for REST response handling.",
        "Both can declare @ExceptionHandler methods.",
        "Both can be scoped to selected controllers.",
        "Choose the annotation that matches the response style and intended controller behavior."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes and Best Practices",

      bullets: [
        "Do not repeat the same exception-to-response mapping in every controller.",
        "Do not assume @RestControllerAdvice handles exceptions from every part of the application.",
        "Do not expose stack traces or raw SQL details in error responses.",
        "Do not convert every exception into HTTP 400; unexpected server failures usually require a different status.",
        "Use specific handlers for expected application exceptions.",
        "Keep a generic fallback handler for unexpected failures when appropriate.",
        "Log unexpected exceptions securely using a logging framework.",
        "Do not silently swallow exceptions in controllers or services.",
        "Use meaningful custom exceptions for domain-specific failures.",
        "Test that the advice is discovered by component scanning and applies to the intended controllers.",
        "Avoid conflicting advice scopes and ambiguous exception mappings.",
        "Keep API error response structures stable and documented.",
        "Remember that authentication and authorization failures may require Spring Security-specific handlers.",
        "Avoid exposing personally identifiable information or sensitive validation details in responses and logs."
      ]
    },

    {
      id: "testing",

      title: "Testing Global Exception Handling",

      paragraphs: [
        "Global exception handling should be tested to ensure that a known exception produces the expected HTTP status and response body.",

        "MockMvc can test the MVC request-handling pipeline without starting a real HTTP server. The example below assumes an application context in which requesting a missing employee causes EmployeeNotFoundException and the global advice is registered."
      ],

      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingEmployeeReturnsNotFound() throws Exception {

        mockMvc.perform(get("/api/employees/999999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.code")
                .value("EMPLOYEE_NOT_FOUND"));
    }
}`
      },

      bullets: [
        "Test the expected status code for each known exception.",
        "Verify the error-response fields and stable error code.",
        "Test invalid request bodies and conversion failures.",
        "Test the fallback handler without asserting sensitive internal exception messages.",
        "Ensure the test actually triggers the intended exception.",
        "Use unit tests for isolated logic and MVC or integration tests for the full exception-resolution flow."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "1. What is @ControllerAdvice?",

          answer:
            "@ControllerAdvice is a Spring component that provides shared controller-related behavior across multiple Spring MVC controllers. It is commonly used for centralized exception handling."
        },

        {
          question: "2. What is @RestControllerAdvice?",

          answer:
            "@RestControllerAdvice is a specialization of @ControllerAdvice that provides response-body semantics by default. It is commonly used to return JSON error responses from REST APIs."
        },

        {
          question: "3. What is the difference between @ControllerAdvice and @RestControllerAdvice?",

          answer:
            "@ControllerAdvice provides general controller-advice behavior. @RestControllerAdvice additionally provides response-body semantics, making it convenient for REST APIs."
        },

        {
          question: "4. Why do we use @RestControllerAdvice?",

          answer:
            "It centralizes REST exception handling, reduces duplicate controller code, and helps maintain consistent HTTP statuses and error-response structures."
        },

        {
          question: "5. What is @ExceptionHandler?",

          answer:
            "@ExceptionHandler marks a method that handles one or more specified exception types in a controller or controller advice."
        },

        {
          question: "6. Can @ExceptionHandler be declared inside a controller?",

          answer:
            "Yes. It can be declared inside an individual controller for local exception handling or inside controller advice for shared handling."
        },

        {
          question: "7. How does Spring MVC resolve controller exceptions?",

          answer:
            "Spring MVC uses its exception-resolution infrastructure to find an applicable handler. Controller exception handlers, controller advice, and other framework mechanisms may participate."
        },

        {
          question: "8. How can EmployeeNotFoundException be handled?",

          answer:
            "Create an @ExceptionHandler for EmployeeNotFoundException in a controller advice and return an appropriate response, commonly HTTP 404 Not Found."
        },

        {
          question: "9. How can duplicate-resource exceptions be handled?",

          answer:
            "A custom DuplicateResourceException can be handled centrally and commonly mapped to HTTP 409 Conflict, provided that status matches the API's semantics."
        },

        {
          question: "10. What is ResponseEntity?",

          answer:
            "ResponseEntity represents an HTTP response and lets an application specify its status, headers, and body."
        },

        {
          question: "11. Does @RestControllerAdvice automatically return JSON?",

          answer:
            "It provides response-body semantics. The actual representation depends on Spring's message converters, content negotiation, and available serialization support. JSON is common in Spring Boot REST applications."
        },

        {
          question: "12. Can a global handler process validation exceptions?",

          answer:
            "Yes. It can handle MethodArgumentNotValidException and return a consistent response containing safe validation details."
        },

        {
          question: "13. What happens if no exception handler matches?",

          answer:
            "Spring MVC continues through its exception-resolution mechanisms. If no mechanism resolves the exception, framework or server error handling determines the outcome."
        },

        {
          question: "14. Can controller advice be restricted to a package?",

          answer:
            "Yes. Use attributes such as basePackages or basePackageClasses to limit the controllers to which the advice applies."
        },

        {
          question: "15. What does @RestControllerAdvice combine?",

          answer:
            "It combines @ControllerAdvice behavior with response-body semantics, equivalent in practical intent to applying controller advice together with response-body behavior."
        },

        {
          question: "16. Should every controller have its own exception handler?",

          answer:
            "No. Shared exception mappings are usually better placed in controller advice. Local handlers are appropriate when a controller needs specific behavior."
        },

        {
          question: "17. Why should we avoid returning stack traces to clients?",

          answer:
            "Stack traces can reveal implementation details, file paths, internal classes, database information, and other details that should remain on the server."
        },

        {
          question: "18. How should unexpected exceptions be handled?",

          answer:
            "Log diagnostic information securely, return a safe generic error response, and avoid exposing the original exception details to clients."
        },

        {
          question: "19. Does @RestControllerAdvice handle Spring Security authentication failures automatically?",

          answer:
            "Not necessarily. Some security failures occur in the security filter chain before controller handling. Configure an AuthenticationEntryPoint or AccessDeniedHandler when appropriate."
        },

        {
          question: "20. What is the purpose of a consistent error-response DTO?",

          answer:
            "It gives API clients a predictable response structure and makes frontend error handling, testing, and documentation easier."
        },

        {
          question: "21. Can @ControllerAdvice handle exceptions from service methods?",

          answer:
            "Yes, when a service exception propagates through a Spring MVC controller invocation and reaches the MVC exception-handling mechanism."
        },

        {
          question: "22. What is the difference between local and global exception handling?",

          answer:
            "Local handling is defined within an individual controller. Global handling is defined in controller advice and can apply to multiple selected controllers."
        },

        {
          question: "23. Can multiple controller advice classes exist in one application?",

          answer:
            "Yes. Applications can define multiple advice classes, including scoped advice. Their scopes and handler selection should be designed carefully to avoid unintended overlaps."
        },

        {
          question: "24. How do you test @RestControllerAdvice?",

          answer:
            "Use MockMvc or integration tests to trigger known failures and verify the HTTP status, error-response fields, and absence of sensitive details."
        },

        {
          question: "25. What are the best practices for centralized exception handling?",

          answer:
            "Use specific exception handlers, return consistent response DTOs, map failures to suitable HTTP statuses, log unexpected errors securely, restrict advice scope when needed, avoid leaking internal details, and test the complete response behavior."
        }
      ]
    }
  ]
};
