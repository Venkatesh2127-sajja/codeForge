
export const commonSpringBootExceptions = {
  id: 709,

  title: "Handling Common Spring Boot Exceptions",

  slug: "common-spring-boot-exceptions",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand common exceptions encountered in Spring Boot REST applications, identify their causes, debug them effectively, and map them to meaningful HTTP responses using centralized exception handling.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "common-exceptions",

      title: "Why Learn Common Exceptions?",

      paragraphs: [
        "Spring Boot REST applications can encounter exceptions during request validation, parameter conversion, database operations, authentication, authorization, resource retrieval, JSON processing, and business logic execution.",

        "An exception represents a failure during program execution. When a controller or service throws an exception, Spring MVC attempts to resolve it through its exception-handling mechanisms. Depending on the exception and application configuration, Spring may return an appropriate HTTP response or an unexpected server error.",

        "Understanding common exceptions helps developers identify the layer where a failure occurred, distinguish client errors from server errors, and design predictable API responses.",

        "A good REST API should not expose internal stack traces or database implementation details to clients. Instead, it should return an appropriate HTTP status, a clear message, and useful validation details when appropriate."
      ],

      bullets: [
        "Request validation failures commonly result in HTTP 400 Bad Request.",
        "Missing resources commonly result in HTTP 404 Not Found.",
        "Duplicate-resource conflicts commonly result in HTTP 409 Conflict.",
        "Unexpected server failures commonly result in HTTP 500 Internal Server Error.",
        "The exact exception and response depend on the endpoint signature, Spring version, validation setup, and application configuration.",
        "Use centralized exception handling to keep error responses consistent across controllers."
      ],

      code: {
        language: "text",
        code: `Client Request
      |
      v
Spring MVC Controller
      |
      +-- Invalid request ------> 400 Bad Request
      |
      +-- Resource not found ---> 404 Not Found
      |
      +-- Duplicate resource ---> 409 Conflict
      |
      +-- Unexpected failure ---> 500 Internal Server Error`
      }
    },

    {
      id: "method-argument",

      title: "MethodArgumentNotValidException",

      paragraphs: [
        "MethodArgumentNotValidException commonly occurs when Spring MVC validates a request-body object and one or more validation constraints fail. A typical example uses @Valid with @RequestBody.",

        "Suppose an employee registration request requires a nonblank name and a valid email address. If the client sends an empty name or an invalid email, the validation framework records constraint violations. Spring MVC commonly raises MethodArgumentNotValidException before the controller method executes.",

        "This exception is associated with validation of a bound method argument, often a request-body DTO. Validation of method parameters can behave differently depending on the parameter declaration and Spring version. For example, method validation may raise HandlerMethodValidationException in supported Spring MVC configurations.",

        "Validation annotations such as @NotBlank, @Email, @Size, and @Min are provided by Jakarta Bean Validation when a compatible implementation, such as Hibernate Validator, is available."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name is too long")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    String email
) {
}`
      },

      bullets: [
        "Use @Valid on a request-body parameter to trigger validation of the DTO.",
        "Place validation constraints on the DTO fields, record components, or applicable properties.",
        "Handle MethodArgumentNotValidException centrally to return readable validation messages.",
        "Validation should happen before business logic executes whenever possible.",
        "Do not return every internal validation detail if it reveals sensitive information."
      ]
    },

    {
      id: "missing-parameter",

      title: "MissingServletRequestParameterException",

      paragraphs: [
        "MissingServletRequestParameterException can occur when a required request parameter is absent from an HTTP request.",

        "For example, a search endpoint may declare a required keyword using @RequestParam. If the client calls the endpoint without supplying keyword, Spring MVC normally reports the missing parameter.",

        "Request parameters are different from path variables. A query parameter is commonly supplied after a question mark in the URL, while a path variable is part of the URL path."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeSearchController {

    @GetMapping("/api/employees/search")
    public String search(
            @RequestParam String keyword) {

        return "Searching employees for: " + keyword;
    }
}`
      },

      bullets: [
        "A required @RequestParam is normally required by default.",
        "Use @RequestParam(required = false) when absence is allowed.",
        "Use defaultValue when a meaningful default is appropriate.",
        "Do not confuse a missing query parameter with a missing request-body field; they are different situations.",
        "Spring MVC commonly maps a missing required request parameter to HTTP 400."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/search

Missing required parameter:
keyword

Typical result:
400 Bad Request`
      }
    },

    {
      id: "type-mismatch",

      title: "MethodArgumentTypeMismatchException",

      paragraphs: [
        "MethodArgumentTypeMismatchException can occur when Spring MVC cannot convert a supplied request value into the Java type expected by a controller parameter.",

        "For example, if a controller expects a Long employee ID but receives the text abc, Spring cannot convert that value into a Long. The request will commonly fail before the controller method executes.",

        "Similar conversion failures can occur with integers, dates, enums, and other supported parameter types. The exact exception depends on where and how the conversion takes place."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @GetMapping("/api/employees/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id) {

        return employeeService.findById(id);
    }

    // Assume employeeService is injected.
}`
      },

      bullets: [
        "GET /api/employees/10 supplies a value that can normally be converted to Long.",
        "GET /api/employees/abc supplies a value that cannot be converted to Long.",
        "Spring MVC commonly returns HTTP 400 for this type of request conversion failure.",
        "Validate formats at the API boundary when clients need clear guidance.",
        "Avoid accepting an overly broad String and manually converting it everywhere when typed controller parameters are suitable."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/abc

Expected Java parameter:
Long id

Conversion:
"abc" -> Long

Typical result:
400 Bad Request`
      }
    },

    {
      id: "not-found",

      title: "Custom Not-Found Exceptions",

      paragraphs: [
        "A resource-not-found condition occurs when the requested entity or resource does not exist. For example, a client might request an employee with ID 500 when no such employee exists.",

        "Spring Data JPA repository methods such as findById return an Optional for the usual single-entity lookup. A service can use orElseThrow to raise a custom exception when the value is absent.",

        "A custom EmployeeNotFoundException makes the failure meaningful. A global exception handler can map it to HTTP 404 Not Found."
      ],

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(String message) {
        super(message);
    }
}

// Service-layer example:
public Employee getEmployee(Long id) {

    return employeeRepository.findById(id)
        .orElseThrow(() ->
            new EmployeeNotFoundException(
                "Employee not found with id: " + id
            )
        );
}`
      },

      bullets: [
        "Use a custom exception to represent a meaningful missing-resource condition.",
        "Keep the repository responsible for data access and the service responsible for the application's lookup behavior.",
        "Map the exception to HTTP 404 through a global handler or another consistent exception-handling strategy.",
        "Avoid returning null for a missing resource when that would make the caller's responsibility unclear.",
        "Consider whether revealing that a particular resource exists is appropriate for security-sensitive endpoints."
      ]
    },

    {
      id: "duplicate",

      title: "Duplicate Resource Exceptions",

      paragraphs: [
        "A duplicate-resource failure occurs when an operation conflicts with a uniqueness rule. For example, an application may require employee email addresses to be unique.",

        "A service can perform an initial existence check and throw a custom DuplicateResourceException when a duplicate is detected. However, that check alone does not guarantee uniqueness when multiple requests execute concurrently.",

        "For reliable data integrity, enforce uniqueness in the database as well. Handle the resulting database constraint violation appropriately, because another request may insert the same value after the initial check.",

        "HTTP 409 Conflict is commonly appropriate when a request conflicts with the current state of a resource or a uniqueness constraint."
      ],

      code: {
        language: "java",
        code: `public class DuplicateResourceException
        extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}

// Example service logic:
public Employee createEmployee(
        EmployeeCreateRequest request) {

    if (employeeRepository.existsByEmail(request.email())) {
        throw new DuplicateResourceException(
            "An employee already exists with this email"
        );
    }

    Employee employee = new Employee(
        request.name(),
        request.email()
    );

    return employeeRepository.save(employee);
}`
      },

      bullets: [
        "Use a custom exception to represent a business-level duplicate conflict.",
        "Add a database UNIQUE constraint for data integrity.",
        "Do not rely exclusively on existsByEmail because concurrent requests can race.",
        "Handle relevant persistence exceptions carefully and avoid returning raw SQL messages.",
        "Use HTTP 409 Conflict when it accurately represents the API's conflict semantics.",
        "Avoid exposing personal data in error messages when a generic conflict message is sufficient."
      ]
    },

    {
      id: "mapping",

      title: "Exception to HTTP Status Mapping",

      paragraphs: [
        "An exception is a Java object that represents a failure. An HTTP status is part of the response sent to the client. Spring MVC exception handling connects these two concepts by translating known failures into suitable responses.",

        "The mapping is an application design choice rather than a universal rule for every exception. A consistent API should document its error contract and apply the same conventions across endpoints."
      ],

      code: {
        language: "text",
        code: `Validation failure
    |
    +--> 400 Bad Request

Missing required request parameter
    |
    +--> 400 Bad Request

Invalid path-variable type
    |
    +--> 400 Bad Request

EmployeeNotFoundException
    |
    +--> 404 Not Found

DuplicateResourceException
    |
    +--> 409 Conflict

Unexpected server failure
    |
    +--> 500 Internal Server Error`
      },

      bullets: [
        "400 Bad Request: the request is invalid or cannot be processed as supplied.",
        "401 Unauthorized: authentication is required or the supplied authentication is invalid.",
        "403 Forbidden: the caller is authenticated or identified but is not permitted to perform the operation.",
        "404 Not Found: the requested resource cannot be found.",
        "409 Conflict: the request conflicts with the current resource state or a uniqueness rule.",
        "500 Internal Server Error: an unexpected server-side failure occurred.",
        "Choose status codes according to API semantics, not merely the exception class name."
      ]
    },

    {
      id: "global-handler",

      title: "Creating a Global Exception Handler",

      paragraphs: [
        "A global exception handler centralizes the conversion of application exceptions into HTTP responses. In Spring Boot REST applications, @RestControllerAdvice is commonly used with @ExceptionHandler methods.",

        "The following example handles validation failures, missing request parameters, type conversion failures, custom not-found exceptions, duplicate-resource exceptions, and unexpected exceptions.",

        "The example assumes that EmployeeNotFoundException and DuplicateResourceException have already been defined as RuntimeException subclasses. It uses a small response DTO to keep the API error format consistent.",

        "Spring's built-in exception resolvers handle many standard MVC exceptions. Explicit handlers are useful when the application wants a consistent response shape or customized messages."
      ],

      code: {
        language: "java",
        code: `import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
            MethodArgumentNotValidException exception) {

        List<String> errors = exception
            .getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error ->
                error.getField() + ": "
                    + error.getDefaultMessage()
            )
            .toList();

        ApiError body = new ApiError(
            400,
            "Request validation failed",
            errors
        );

        return ResponseEntity
            .badRequest()
            .body(body);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiError> handleMissingParameter(
            MissingServletRequestParameterException exception) {

        ApiError body = new ApiError(
            400,
            "A required request parameter is missing",
            List.of(exception.getParameterName())
        );

        return ResponseEntity
            .badRequest()
            .body(body);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleTypeMismatch(
            MethodArgumentTypeMismatchException exception) {

        ApiError body = new ApiError(
            400,
            "A request parameter has an invalid type",
            List.of(exception.getName())
        );

        return ResponseEntity
            .badRequest()
            .body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleUnreadableBody(
            HttpMessageNotReadableException exception) {

        ApiError body = new ApiError(
            400,
            "Request body is missing or invalid",
            List.of()
        );

        return ResponseEntity
            .badRequest()
            .body(body);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            EmployeeNotFoundException exception) {

        ApiError body = new ApiError(
            404,
            exception.getMessage(),
            List.of()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(body);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiError> handleDuplicate(
            DuplicateResourceException exception) {

        ApiError body = new ApiError(
            409,
            exception.getMessage(),
            List.of()
        );

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpected(
            Exception exception) {

        // Log the exception securely on the server.
        // Do not expose stack traces or internal details.

        ApiError body = new ApiError(
            500,
            "An unexpected server error occurred",
            List.of()
        );

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(body);
    }
}

class ApiError {

    private final int status;
    private final String message;
    private final List<String> details;

    public ApiError(
            int status,
            String message,
            List<String> details) {
        this.status = status;
        this.message = message;
        this.details = details;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getDetails() {
        return details;
    }
}`
      },

      bullets: [
        "Place @RestControllerAdvice in a package scanned by Spring Boot.",
        "Use @ExceptionHandler for exceptions that need customized response behavior.",
        "Keep response structures consistent across all API endpoints.",
        "Use a logging framework such as SLF4J for unexpected failures.",
        "Avoid logging sensitive request bodies, passwords, tokens, or unnecessary personal data.",
        "An Exception handler is a fallback; it should not replace deliberate handling of expected application failures.",
        "Depending on the Spring version, application configuration, and security filters, some errors may need handling outside the controller advice."
      ]
    },

    {
      id: "database-exceptions",

      title: "Common Database Exceptions in Spring Boot",

      paragraphs: [
        "Database-related failures can occur when inserting duplicate values, violating foreign-key constraints, executing invalid queries, or losing database connectivity.",

        "Spring Data JPA and Spring's data-access exception translation may expose exceptions such as DataIntegrityViolationException, DataAccessException, or more specific persistence exceptions. The exact exception depends on the operation, persistence provider, database driver, and constraint involved.",

        "A database exception should be interpreted in context. For example, DataIntegrityViolationException may indicate a unique constraint violation, a foreign-key violation, or another integrity problem. It does not always mean that a duplicate record exists.",

        "Applications should avoid returning raw database exception messages to clients because they may contain SQL statements, table names, constraint names, or other internal details."
      ],

      code: {
        language: "java",
        code: `import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeRegistrationService {

    private final EmployeeRepository employeeRepository;

    public EmployeeRegistrationService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employee register(Employee employee) {

        try {
            return employeeRepository.saveAndFlush(employee);

        } catch (DataIntegrityViolationException exception) {

            // Translate only when the specific constraint
            // violation is understood and the translation
            // is meaningful for the API contract.
            throw new DuplicateResourceException(
                "The employee conflicts with an existing record",
                exception
            );
        }
    }
}`
      },

      bullets: [
        "DataIntegrityViolationException indicates a data-integrity problem, not necessarily a duplicate.",
        "DataAccessException is a Spring abstraction for data-access failures.",
        "Database connectivity failures require diagnosis of configuration, network, availability, credentials, and connection-pool behavior.",
        "Translate database exceptions only when the actual cause is understood.",
        "A database constraint remains the final protection against conflicting concurrent writes.",
        "For transactional work, understand whether an exception has marked the transaction rollback-only before attempting further database operations."
      ]
    },

    {
      id: "important",

      title: "Important Note",

      paragraphs: [
        "Exception behavior can depend on the Spring MVC version, method signature, validation setup, message converters, and application configuration. A request-body validation failure, parameter conversion failure, and JSON parsing failure are distinct situations even though they may all result in HTTP 400.",

        "Spring MVC's built-in exception handling already covers many common request errors. Use custom handlers when you need a consistent response format, additional details, or specific application behavior.",

        "A global exception handler does not automatically handle every failure in the application. Errors raised before a request reaches the controller, including certain authentication or authorization failures, may need handling through Spring Security's authentication entry point or access-denied handler.",

        "For Spring Boot applications, test both the internal exception behavior and the externally visible API response. Verify the HTTP status, response body, and whether sensitive implementation details are excluded."
      ],

      bullets: [
        "Do not create custom exception handlers for every framework exception without a clear need.",
        "Do not assume every exception should become HTTP 500.",
        "Do not expose internal stack traces to API clients.",
        "Use automated integration tests for important error cases.",
        "Document the error response format so frontend developers know how to handle failures.",
        "Use a correlation ID or trace ID when appropriate to connect a client-visible error with server-side logs."
      ]
    },

    {
      id: "testing-exceptions",

      title: "Testing Exception Handling",

      paragraphs: [
        "Exception handling should be tested just like successful API behavior. A test should verify that the expected request produces the correct HTTP status and response structure.",

        "Spring Boot applications can use MockMvc for MVC-layer tests. The following example assumes an application context containing the relevant controller, global exception handler, and a service that throws EmployeeNotFoundException for a missing employee.",

        "For an isolated controller test, configure the required controller dependencies and include the applicable controller advice. For an integration test, load the relevant Spring application context."
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
class EmployeeExceptionHandlingTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingEmployeeReturns404() throws Exception {

        mockMvc.perform(get("/api/employees/999999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.message").exists());
    }
}`
      },

      bullets: [
        "Test missing resources and verify HTTP 404.",
        "Test invalid numeric path variables and verify the chosen HTTP 400 response.",
        "Test missing required parameters and invalid request bodies.",
        "Test duplicate-resource conflicts and verify HTTP 409 when that is the API contract.",
        "Test unexpected failures without requiring internal exception details in the response.",
        "Verify that error responses do not expose stack traces, SQL queries, or secrets.",
        "Use representative IDs and test data so the test genuinely exercises the intended failure path."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "1. Why should we learn common Spring Boot exceptions?",

          answer:
            "Understanding common exceptions helps us identify failures quickly, debug the correct application layer, return appropriate HTTP statuses, and maintain a consistent REST API error contract."
        },

        {
          question: "2. What is MethodArgumentNotValidException?",

          answer:
            "It commonly occurs when validation of a bound request-body argument fails, such as when @Valid is used with @RequestBody and one or more validation constraints are violated."
        },

        {
          question: "3. Which status is commonly returned when @Valid request-body validation fails?",

          answer:
            "HTTP 400 Bad Request is commonly returned. A global exception handler can include useful validation messages in the response."
        },

        {
          question: "4. What is MissingServletRequestParameterException?",

          answer:
            "It can occur when a required request parameter is missing. For example, a controller requires keyword through @RequestParam, but the client does not supply it."
        },

        {
          question: "5. What is MethodArgumentTypeMismatchException?",

          answer:
            "It can occur when Spring MVC cannot convert a supplied request value into the Java type expected by a controller parameter, such as converting abc into Long."
        },

        {
          question: "6. What is EmployeeNotFoundException?",

          answer:
            "It is a custom application exception that represents a missing employee resource. It commonly extends RuntimeException and can be mapped to HTTP 404 Not Found."
        },

        {
          question: "7. What is DuplicateResourceException?",

          answer:
            "It is a custom exception that represents a conflict with a uniqueness rule or another resource constraint. An API commonly maps this condition to HTTP 409 Conflict."
        },

        {
          question: "8. What is @RestControllerAdvice?",

          answer:
            "@RestControllerAdvice centralizes exception handling for Spring MVC REST controllers. It is commonly used with @ExceptionHandler to return consistent response bodies."
        },

        {
          question: "9. What is @ExceptionHandler?",

          answer:
            "@ExceptionHandler marks a method that handles specified exceptions in a controller or controller advice."
        },

        {
          question: "10. Why use a global exception handler?",

          answer:
            "It avoids repeating exception-to-response logic in every controller and helps maintain consistent HTTP statuses and response structures."
        },

        {
          question: "11. What is DataIntegrityViolationException?",

          answer:
            "It is a Spring data-access exception that can indicate a database integrity violation, such as a uniqueness or foreign-key constraint failure. It does not necessarily indicate a duplicate record."
        },

        {
          question: "12. How should duplicate email addresses be handled?",

          answer:
            "Check the business rule in the service, enforce uniqueness in the database, handle concurrent-write conflicts, and return a suitable client response such as HTTP 409 when appropriate."
        },

        {
          question: "13. Why is an existence check alone insufficient for uniqueness?",

          answer:
            "Two concurrent requests can both observe that a value does not exist and then attempt to insert it. A database unique constraint is needed to guarantee uniqueness."
        },

        {
          question: "14. What is the difference between HTTP 400 and HTTP 404?",

          answer:
            "HTTP 400 indicates that the request is invalid or cannot be processed as supplied. HTTP 404 indicates that the requested resource cannot be found."
        },

        {
          question: "15. When should we return HTTP 409 Conflict?",

          answer:
            "HTTP 409 is appropriate when a request conflicts with the current resource state or a uniqueness rule, such as attempting to create a resource that already exists."
        },

        {
          question: "16. When should an API return HTTP 500?",

          answer:
            "HTTP 500 is generally used for unexpected server-side failures that prevent the request from being completed. Known client and business errors should usually receive more specific statuses."
        },

        {
          question: "17. What happens when a path variable expects Long but receives abc?",

          answer:
            "Spring MVC normally fails to convert the value and may raise MethodArgumentTypeMismatchException. The request commonly receives HTTP 400."
        },

        {
          question: "18. What happens if a required @RequestParam is missing?",

          answer:
            "Spring MVC commonly raises MissingServletRequestParameterException and returns HTTP 400 unless the parameter is configured as optional or given an appropriate default."
        },

        {
          question: "19. Does @RestControllerAdvice handle every possible application failure?",

          answer:
            "No. Some failures occur before the controller is invoked, and certain security or infrastructure failures need separate handling. For example, Spring Security can use an authentication entry point and an access-denied handler."
        },

        {
          question: "20. Why should raw exception messages not be returned to clients?",

          answer:
            "They may expose SQL queries, table names, file paths, stack traces, or sensitive implementation details. Return safe, meaningful messages and keep diagnostic information in appropriately protected logs."
        },

        {
          question: "21. What is HttpMessageNotReadableException?",

          answer:
            "It can occur when Spring MVC cannot read or deserialize an HTTP request body, for example because the JSON is malformed or a supplied value cannot be deserialized into the target type."
        },

        {
          question: "22. How do you test exception handling in Spring Boot?",

          answer:
            "Use MockMvc or an appropriate integration-test setup to execute requests that trigger failures. Verify the HTTP status, response body, and absence of sensitive internal details."
        },

        {
          question: "23. Can the same exception be mapped to different HTTP statuses?",

          answer:
            "Application behavior can vary by context and handler design. Prefer clear exception types and deliberate mappings so clients receive predictable responses. Avoid ambiguous mappings that make the API contract difficult to understand."
        },

        {
          question: "24. How are database exceptions different from validation exceptions?",

          answer:
            "Validation exceptions usually indicate that request data violates declared constraints. Database exceptions arise during persistence or database access and may indicate integrity, query, connection, or other data-layer failures."
        },

        {
          question: "25. What are the best practices for Spring Boot exception handling?",

          answer:
            "Use specific exceptions, centralize REST error handling, map failures to appropriate HTTP statuses, preserve causes when translating exceptions, avoid leaking internal details, enforce database constraints, log unexpected failures securely, and test important error paths."
        }
      ]
    }
  ]
};
