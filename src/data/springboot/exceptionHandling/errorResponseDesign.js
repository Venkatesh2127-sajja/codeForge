
export const errorResponseDesign = {
  id: 708,

  title: "Error Response Design",

  slug: "error-response-design",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Learn how to design consistent REST API error responses containing status, message, path, timestamp, and field-level validation errors. Build reusable error DTOs, handle exceptions centrally, integrate error responses with frontend applications, and test API failure scenarios.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "error-response",

      title: "What is an Error Response?",

      paragraphs: [
        "An error response is the structured HTTP response returned when an API request cannot be completed successfully. It communicates what went wrong and gives the client enough information to respond appropriately.",

        "For example, when a React application requests GET /api/employees/10 and employee 10 does not exist, the Spring Boot backend can return HTTP 404 Not Found along with a JSON error response.",

        "A consistent error response allows frontend applications, mobile applications, and other API consumers to understand failures without depending on internal implementation details. Clients can inspect the HTTP status and response fields instead of parsing different message formats from individual endpoints.",

        "Error response design is part of API design. A useful contract should be predictable, safe, easy to understand, and consistent across controllers."
      ],

      code: {
        language: "text",
        code: `HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found"
}`
      },

      bullets: [
        "The HTTP status communicates the general outcome of the request.",
        "The error field identifies the category of failure.",
        "The message provides a human-readable explanation.",
        "The path identifies the request that failed.",
        "The timestamp records when the error response was generated.",
        "Field-level errors can explain validation failures.",
        "The response must not expose secrets, stack traces, or internal implementation details."
      ]
    },

    {
      id: "basic-response",

      title: "Basic Error Response",

      paragraphs: [
        "A basic error response can contain only a status and a message. This is easy to implement and can be sufficient for a small demonstration application.",

        "In Java, a record is a concise way to define an immutable data carrier. Spring Boot's Jackson integration can serialize a record into JSON when the application's configuration supports the relevant Java version and record handling.",

        "A basic response is a useful starting point, but a larger API often benefits from additional information such as an error category, timestamp, and request path."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public record ErrorResponse(
    int status,
    String message
) {
}`
      },

      bullets: [
        "status contains the numeric HTTP status code.",
        "message describes the failure in readable language.",
        "The record keeps the response structure concise.",
        "The same DTO can be returned from multiple exception handlers.",
        "A production API may need more fields for diagnostics and validation."
      ]
    },

    {
      id: "production-response",

      title: "More Complete Error Response",

      paragraphs: [
        "A more complete error response can contain a timestamp, status, error description, message, and request path. These fields provide a consistent structure that works for many REST API failures.",

        "Instant represents a point in time and is commonly serialized as an ISO-8601 timestamp. Using a standard timestamp format makes it easier for clients and logging systems to interpret the value.",

        "The path should identify the relevant API route, not expose internal filesystem paths. The message should be suitable for the client. Detailed diagnostic information belongs in server-side logs.",

        "This DTO is a response model. It does not automatically create an error response by itself; an exception handler or another response-producing component must populate it and return it."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import java.time.Instant;

public record ErrorResponse(
    Instant timestamp,
    int status,
    String error,
    String message,
    String path
) {
}`
      },

      bullets: [
        "timestamp records when the response was created.",
        "status duplicates the HTTP status in the JSON body for convenient client processing.",
        "error provides a short category such as Not Found or Conflict.",
        "message explains the failure without exposing sensitive details.",
        "path identifies the request route associated with the error.",
        "Keep the HTTP status and body status consistent."
      ]
    },

    {
      id: "json",

      title: "Example JSON Response",

      paragraphs: [
        "The following example shows what a client might receive when an employee lookup fails. The response body contains the status, error category, message, timestamp, and request path.",

        "The timestamp value is an example. A real response should use the time at which the server generates the error response."
      ],

      code: {
        language: "json",
        code: `{
  "timestamp": "2026-09-26T15:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found with id: 10",
  "path": "/api/employees/10"
}`
      },

      bullets: [
        "The HTTP response status should also be 404.",
        "The JSON body gives additional context about the failure.",
        "The path helps associate the response with the failed request.",
        "The client can display the message or show a dedicated not-found state.",
        "Do not assume that the example timestamp or employee ID is a real runtime value."
      ]
    },

    {
      id: "validation-response",

      title: "Validation Error Response",

      paragraphs: [
        "Validation failures often require additional field-level information because multiple fields can fail at the same time. For example, a registration request might contain an empty name and an invalid email address.",

        "Instead of returning only 'Validation failed', an API can return an errors object that identifies each invalid field. A React form can use these values to display an error beside the appropriate input.",

        "A map is suitable when each field needs only one message. If a field can have multiple validation failures, use a list of messages per field or a list of structured validation-error objects.",

        "For predictable behavior, decide how the API handles repeated errors for the same field. A simple Map<String, String> can retain only one message per field, depending on how it is populated."
      ],

      code: {
        language: "json",
        code: `{
  "timestamp": "2026-09-26T15:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/employees",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email"
  }
}`
      },

      bullets: [
        "Use HTTP 400 Bad Request for request validation failures in a typical REST API.",
        "The errors object maps field names to client-safe validation messages.",
        "Keep field names consistent with the API request DTO.",
        "Avoid including rejected passwords, access tokens, or other sensitive values.",
        "Return validation details separately from unexpected server errors."
      ]
    },

    {
      id: "validation-dto",

      title: "Designing a Validation Error DTO",

      paragraphs: [
        "The main ErrorResponse can include a field-level errors map. This keeps the outer error contract consistent while allowing validation failures to provide extra details.",

        "One straightforward design uses a Map<String, String>. For error types that do not involve request fields, the map can be empty. If the API needs multiple messages per field, consider Map<String, List<String>> instead.",

        "The following record shows a validation-specific response. A project can alternatively extend a shared error contract through composition or use a single DTO with an optional errors field, depending on its serialization and API compatibility requirements."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import java.time.Instant;
import java.util.Map;

public record ValidationErrorResponse(
    Instant timestamp,
    int status,
    String error,
    String message,
    String path,
    Map<String, String> errors
) {
}`
      },

      bullets: [
        "Use Map<String, String> when one message per field is sufficient.",
        "Use Map<String, List<String>> when several constraints can fail for one field.",
        "Initialize the map to an empty map when there are no field errors if the contract requires the property to be present.",
        "Document whether empty errors are omitted or returned as an empty JSON object.",
        "Avoid changing response field names without considering existing API clients."
      ]
    },

    {
      id: "status-codes",

      title: "Use Appropriate HTTP Status Codes",

      paragraphs: [
        "The HTTP status code should communicate the general category of failure while the response body provides additional information. Choosing an accurate status helps API clients decide whether to correct the request, change the application state, authenticate, or report a server problem.",

        "The following mappings are common choices. The final mapping should follow the API's documented behavior and the meaning of the particular operation."
      ],

      code: {
        language: "text",
        code: `400 Bad Request
    |
    +-- Invalid request data
    +-- Malformed request body

401 Unauthorized
    |
    +-- Authentication is required or invalid

403 Forbidden
    |
    +-- Caller is not allowed to perform the action

404 Not Found
    |
    +-- Requested resource does not exist

409 Conflict
    |
    +-- Request conflicts with existing resource state

500 Internal Server Error
    |
    +-- Unexpected server-side failure`
      },

      bullets: [
        "400: commonly used for malformed requests or invalid input.",
        "401: used when valid authentication is missing or unsuccessful.",
        "403: used when the caller is not permitted to perform the operation.",
        "404: used when the requested resource cannot be found.",
        "409: used when the request conflicts with the current resource state.",
        "500: used for unexpected server-side failures."
      ]
    },

    {
      id: "consistency",

      title: "Keep Error Responses Consistent",

      paragraphs: [
        "All controllers should ideally follow the same error response contract. This prevents frontend developers and API consumers from implementing different error-processing logic for every endpoint.",

        "In Spring Boot, @RestControllerAdvice and @ExceptionHandler can centralize response construction. Instead of building slightly different JSON structures in each controller, the application can create ErrorResponse objects through shared handler methods.",

        "Consistency should cover successful error handling, not just the JSON property names. The application should also agree on status codes, field-validation format, message safety, and how unexpected exceptions are reported.",

        "Avoid returning one structure for a missing employee, a different structure for a duplicate email, and plain text for a validation failure unless those differences are intentional and documented."
      ],

      bullets: [
        "Use a shared error response DTO.",
        "Centralize exception-to-response mapping.",
        "Follow the same property names across endpoints.",
        "Keep status codes aligned with the response body.",
        "Define a predictable field-validation structure.",
        "Return safe client-facing messages.",
        "Use server logs for detailed diagnostic information."
      ]
    },

    {
      id: "global-handler",

      title: "Implementing a Global Exception Handler",

      paragraphs: [
        "A global exception handler creates error responses in one place. The following example assumes that EmployeeNotFoundException and DuplicateResourceException already exist in the application.",

        "The helper method creates the shared ErrorResponse. The specific handlers select the appropriate status and message. The request path is obtained from the current servlet request.",

        "This example uses Spring MVC and Jakarta Servlet APIs, as used in modern Spring Boot applications. Exceptions raised in security filters or other parts of the request pipeline may need additional handling outside MVC controller advice."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import java.time.Instant;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ErrorResponse buildResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request) {

        return new ErrorResponse(
            Instant.now(),
            status.value(),
            status.getReasonPhrase(),
            message,
            request.getRequestURI()
        );
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            EmployeeNotFoundException ex,
            HttpServletRequest request) {

        HttpStatus status = HttpStatus.NOT_FOUND;

        ErrorResponse body = buildResponse(
            status,
            ex.getMessage(),
            request
        );

        return ResponseEntity.status(status).body(body);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(
            DuplicateResourceException ex,
            HttpServletRequest request) {

        HttpStatus status = HttpStatus.CONFLICT;

        ErrorResponse body = buildResponse(
            status,
            ex.getMessage(),
            request
        );

        return ResponseEntity.status(status).body(body);
    }
}`
      },

      bullets: [
        "@RestControllerAdvice centralizes REST API exception handling.",
        "@ExceptionHandler identifies which exception a handler method processes.",
        "ResponseEntity controls the HTTP status and response body.",
        "Instant.now() creates the response timestamp.",
        "HttpServletRequest provides the request URI.",
        "The helper method avoids duplicating the response-construction logic.",
        "Add handlers for validation and other known failures as required by the API."
      ]
    },

    {
      id: "validation-handler",

      title: "Handling Field-Level Validation Errors",

      paragraphs: [
        "Spring MVC commonly raises MethodArgumentNotValidException when a request body annotated with @Valid fails Bean Validation constraints. A global exception handler can extract the field errors and place them into the validation response.",

        "This example assumes the application has the necessary Spring validation dependency and uses constraints such as @NotBlank and @Email on its request DTO.",

        "Depending on the Spring Framework version and controller method signature, method validation can produce other exception types, including HandlerMethodValidationException. Handle the validation mechanisms used by your application rather than assuming every validation failure always has the same exception type."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        Map<String, String> errors = new LinkedHashMap<>();

        ex.getBindingResult()
            .getFieldErrors()
            .forEach(fieldError ->
                errors.putIfAbsent(
                    fieldError.getField(),
                    fieldError.getDefaultMessage() == null
                        ? "Invalid value"
                        : fieldError.getDefaultMessage()
                )
            );

        HttpStatus status = HttpStatus.BAD_REQUEST;

        ValidationErrorResponse body =
            new ValidationErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "Validation failed",
                request.getRequestURI(),
                errors
            );

        return ResponseEntity.status(status).body(body);
    }
}`
      },

      bullets: [
        "getBindingResult() provides the validation results.",
        "getFieldErrors() retrieves validation failures associated with individual fields.",
        "getField() identifies the request field that failed.",
        "getDefaultMessage() retrieves the configured validation message.",
        "putIfAbsent retains the first message for each field in this example.",
        "Use a list-valued map if the client needs all validation messages for each field.",
        "Keep validation messages safe and suitable for display to API consumers."
      ]
    },

    {
      id: "request-validation-example",

      title: "Connecting Error Responses to Request Validation",

      paragraphs: [
        "A validation error response is useful only when the request DTO defines constraints and the controller triggers validation. The following example shows a simple employee-creation request.",

        "The @Valid annotation asks Spring MVC to validate the request body against the constraints declared on EmployeeCreateRequest. If validation fails, the configured validation exception handler can produce the field-level JSON response."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email

) {
}`
      },

      code: {
        language: "java",
        code: `package com.example.employee.controller;

import com.example.employee.dto.EmployeeCreateRequest;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String create(
            @Valid @RequestBody EmployeeCreateRequest request) {

        // Delegate to the service in a real application.
        return "Employee request accepted";
    }
}`
      },

      bullets: [
        "Use @NotBlank to reject null, empty, or whitespace-only strings.",
        "Use @Email to validate email format according to the configured constraint.",
        "Use @Valid on the request body to trigger validation.",
        "Add the appropriate validation dependency to the project.",
        "A real controller should delegate employee creation to a service rather than contain business logic.",
        "For an invalid request, the validation exception handler should return HTTP 400 and field-level errors."
      ]
    },

    {
      id: "frontend-integration",

      title: "How a React Frontend Uses Error Responses",

      paragraphs: [
        "A consistent error response makes frontend error handling simpler. A React application can read the HTTP status and JSON body and display the message returned by the backend.",

        "When using fetch, HTTP errors such as 404 or 400 do not automatically reject the promise. The frontend should check response.ok and parse the body explicitly.",

        "The following example demonstrates the request and error-handling pattern. In a production application, also handle network failures, malformed response bodies, loading states, and field-level validation errors."
      ],

      code: {
        language: "javascript",
        code: `async function getEmployee(id) {
  const response = await fetch(
    \`http://localhost:8080/api/employees/\${id}\`
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.message || "Unable to retrieve employee"
    );
  }

  return body;
}

// Example usage
getEmployee(10)
  .then((employee) => {
    console.log("Employee:", employee);
  })
  .catch((error) => {
    console.error("Request failed:", error.message);
  });`
      },

      bullets: [
        "response.ok is true for successful HTTP statuses and false for unsuccessful statuses.",
        "The frontend can display body.message to explain the failure.",
        "The frontend can use body.status to decide how to respond to a particular failure.",
        "For validation errors, read body.errors and associate messages with form fields.",
        "Do not rely only on the message string for application logic; use status codes and stable error codes if the API defines them.",
        "Network failures may not contain an HTTP response body, so frontend code should handle them separately."
      ]
    },

    {
      id: "error-codes",

      title: "Optional: Adding Stable Application Error Codes",

      paragraphs: [
        "An API can include an application-specific error code in addition to the HTTP status. For example, EMPLOYEE_NOT_FOUND can identify a known failure independently of the human-readable message.",

        "Stable codes are useful when the backend message changes, when the frontend needs to localize text, or when several failures share the same HTTP status.",

        "Error codes should be documented and stable. Avoid making clients depend on the exact wording of a message when a structured code can express the failure more reliably."
      ],

      code: {
        language: "json",
        code: `{
  "timestamp": "2026-09-26T15:30:00Z",
  "status": 404,
  "error": "Not Found",
  "code": "EMPLOYEE_NOT_FOUND",
  "message": "The requested employee was not found",
  "path": "/api/employees/10"
}`
      },

      bullets: [
        "HTTP status communicates the general HTTP outcome.",
        "An application error code identifies a specific application failure.",
        "The message is written for people, while the code is suitable for stable client-side branching.",
        "Document codes and avoid changing their meaning after clients begin depending on them.",
        "This field is optional and should be added only if it benefits the API."
      ]
    },

    {
      id: "security",

      title: "Security and Error Message Best Practices",

      paragraphs: [
        "Error responses must be informative without revealing sensitive implementation details. Returning raw exception messages for every unexpected failure can expose database names, SQL fragments, internal class names, server paths, or other information that helps an attacker understand the system.",

        "Known application exceptions can use carefully designed client-safe messages. Unexpected exceptions should generally return a generic message while the server logs the underlying diagnostic details.",

        "Authentication and authorization errors can arise in Spring Security filters before the request reaches a controller. Those failures may require an AuthenticationEntryPoint or AccessDeniedHandler instead of relying only on @RestControllerAdvice."
      ],

      bullets: [
        "Never return stack traces in normal production API responses.",
        "Do not include credentials, tokens, or sensitive personal information in error messages.",
        "Use a generic message for unexpected server errors.",
        "Log technical details on the server with appropriate access controls.",
        "Avoid logging secrets or full request bodies that contain sensitive information.",
        "Use dedicated Spring Security handlers for authentication and authorization failures when necessary.",
        "Do not assume controller advice handles every failure that can happen anywhere in the request pipeline."
      ]
    },

    {
      id: "testing",

      title: "Testing Error Response Design",

      paragraphs: [
        "Error response tests should verify both the HTTP status and the JSON structure. Checking only the exception type is insufficient when clients rely on a stable REST API contract.",

        "MockMvc can test a Spring MVC endpoint without starting a real HTTP server. The following is a representative test for a missing employee endpoint and assumes that the controller, service, and global exception handler are registered in the test context."
      ],

      code: {
        language: "java",
        code: `import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(EmployeeController.class)
@Import(GlobalExceptionHandler.class)
class EmployeeErrorResponseTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingEmployeeReturnsStructuredError()
            throws Exception {

        mockMvc.perform(get("/api/employees/10"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.error").value("Not Found"))
            .andExpect(jsonPath("$.message")
                .value("Employee not found with id: 10"))
            .andExpect(jsonPath("$.path")
                .value("/api/employees/10"));
    }
}`
      },

      bullets: [
        "The test assumes the service used by EmployeeController is configured or mocked to throw EmployeeNotFoundException for ID 10.",
        "Add @MockBean or the corresponding mock-bean mechanism for the Spring Boot version used when the service must be replaced in a WebMvcTest.",
        "Import the global handler when it is not discovered by the test configuration.",
        "Assert the HTTP status and the important JSON fields.",
        "Write separate tests for validation errors, duplicate resources, and unexpected failures.",
        "Also test successful responses so error handling does not interfere with normal API behavior."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Error Response Design Mistakes",

      bullets: [
        "Using different JSON property names for the same type of error across controllers.",
        "Returning HTTP 200 when the operation actually failed.",
        "Returning HTTP 500 for every known validation or business failure.",
        "Including internal stack traces or SQL details in the response.",
        "Providing only a general validation message when the client needs field-level details.",
        "Allowing the HTTP status to disagree with the status value in the JSON body.",
        "Making frontend logic depend on exact human-readable message wording.",
        "Returning an empty or ambiguous message for an error the client needs to understand.",
        "Assuming @RestControllerAdvice handles exceptions raised in every filter or infrastructure component.",
        "Changing the error schema without considering existing clients."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices for REST API Error Responses",

      bullets: [
        "Define a shared response schema for API failures.",
        "Use the appropriate HTTP status for the failure.",
        "Include a timestamp and request path when useful for troubleshooting.",
        "Return field-level validation details for invalid request data.",
        "Use stable application error codes when clients need to distinguish specific failure types.",
        "Keep messages concise, accurate, and safe for API consumers.",
        "Use @RestControllerAdvice for centralized Spring MVC exception handling.",
        "Log unexpected failures on the server and return a safe generic message to clients.",
        "Test error status codes and JSON fields using MockMvc or integration tests.",
        "Document the error response contract so frontend and external API consumers can use it reliably.",
        "Preserve compatibility when adding, renaming, or removing response fields.",
        "Handle security-filter failures through the appropriate Spring Security mechanisms."
      ]
    },

    {
      id: "interview",

      title: "Error Response Design Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is an error response in a REST API?",

          answer:
            "An error response is an HTTP response returned when an API request fails. It contains a status code and a body that explains the failure in a predictable format."
        },

        {
          question: "2. What should a REST error response contain?",

          answer:
            "A useful response can contain the HTTP status, error category, human-readable message, timestamp, request path, and field-level validation details when applicable."
        },

        {
          question: "3. Why should APIs use consistent error responses?",

          answer:
            "Consistency allows frontend applications and API consumers to process failures through shared logic instead of implementing different parsing rules for every endpoint."
        },

        {
          question: "4. Why include a timestamp in an error response?",

          answer:
            "A timestamp indicates when the server generated the error response. It can help correlate client reports with server logs."
        },

        {
          question: "5. Why include the request path?",

          answer:
            "The path identifies the request associated with the failure. It helps developers diagnose which API endpoint produced the error."
        },

        {
          question: "6. Why include the HTTP status in the response body if it is already in the HTTP response?",

          answer:
            "The status in the body can make client-side processing convenient, but it duplicates information. If included, it should always agree with the actual HTTP status."
        },

        {
          question: "7. What is the difference between the HTTP status and the error message?",

          answer:
            "The HTTP status communicates the general result of the request, while the message provides a human-readable explanation of the particular failure."
        },

        {
          question: "8. When should an API return HTTP 400?",

          answer:
            "HTTP 400 is commonly used when a request is malformed or its supplied data fails validation."
        },

        {
          question: "9. When should an API return HTTP 404?",

          answer:
            "HTTP 404 is commonly used when the requested resource cannot be found, such as an employee lookup for a nonexistent ID."
        },

        {
          question: "10. When should an API return HTTP 409?",

          answer:
            "HTTP 409 is commonly used when the request conflicts with the current resource state, such as attempting to create a resource that violates a uniqueness rule."
        },

        {
          question: "11. When should an API return HTTP 500?",

          answer:
            "HTTP 500 is used for an unexpected server-side failure. Known validation and business failures should generally receive more appropriate status codes."
        },

        {
          question: "12. How do you design a reusable error response in Spring Boot?",

          answer:
            "Create a DTO or Java record containing the chosen error fields, then populate it in centralized exception handlers using @RestControllerAdvice and @ExceptionHandler."
        },

        {
          question: "13. What is the purpose of @RestControllerAdvice?",

          answer:
            "@RestControllerAdvice provides shared controller-related behavior with response-body semantics. It is commonly used to centralize REST API exception handling."
        },

        {
          question: "14. How do you return field-level validation errors?",

          answer:
            "Handle the relevant validation exception, extract the field names and messages from the validation result, and return them in a structured errors object."
        },

        {
          question: "15. Why is a Map useful for validation errors?",

          answer:
            "A Map can associate each request field name with a validation message. If several messages per field are required, use a list of messages instead."
        },

        {
          question: "16. What is the role of @Valid in request validation?",

          answer:
            "@Valid asks Spring MVC to validate a supported request object against its declared Bean Validation constraints. Validation failures can then be translated into an error response."
        },

        {
          question: "17. Should stack traces be returned to API clients?",

          answer:
            "No, not in normal production responses. Stack traces can reveal implementation details. Log appropriate diagnostic information on the server and return a safe message."
        },

        {
          question: "18. Should the frontend depend on the exact error message?",

          answer:
            "Prefer stable status codes and documented application error codes for program logic. Human-readable messages may change or be localized."
        },

        {
          question: "19. How does a React frontend handle an unsuccessful fetch request?",

          answer:
            "The frontend checks response.ok, parses the response body when available, and displays or processes the returned error information. Fetch does not automatically reject merely because the server returned HTTP 400 or 404."
        },

        {
          question: "20. How do you test an error response in Spring Boot?",

          answer:
            "Use MockMvc or an integration test to invoke the endpoint and assert the HTTP status, content type, and relevant JSON fields."
        },

        {
          question: "21. Is a Java record suitable for an error DTO?",

          answer:
            "Yes. A record is a concise data carrier with immutable component references and generated accessors. It is suitable for an error response when the application's Java version and serialization setup support it."
        },

        {
          question: "22. Should all exceptions use the same HTTP status?",

          answer:
            "No. Known failure types should map to appropriate statuses according to their meaning and the API contract. Unexpected failures commonly use HTTP 500."
        },

        {
          question: "23. Does @RestControllerAdvice handle every exception in a Spring Boot application?",

          answer:
            "No. It primarily handles exceptions resolved through Spring MVC controller processing. Failures in security filters or other infrastructure layers may require separate mechanisms."
        },

        {
          question: "24. What is an application error code?",

          answer:
            "An application error code is a stable identifier such as EMPLOYEE_NOT_FOUND. It lets clients distinguish a specific failure independently of its human-readable message."
        },

        {
          question: "25. Explain error response design in a Spring Boot interview.",

          answer:
            "I define a consistent error DTO containing fields such as timestamp, status, error, message, and path. For validation failures, I include field-level errors. I use @RestControllerAdvice to centralize exception handling and map known failures to appropriate HTTP statuses. I avoid exposing internal details, and I test the status codes and JSON contract using MockMvc."
        }
      ]
    },

    {
      id: "summary",

      title: "Lesson Summary",

      paragraphs: [
        "A well-designed error response gives API clients a consistent way to understand failures. Common fields include timestamp, HTTP status, error category, message, and request path. Validation responses can also contain field-level errors.",

        "In Spring Boot, a reusable error DTO combined with @RestControllerAdvice and @ExceptionHandler keeps response formatting consistent across controllers. Correct status codes, safe messages, frontend-friendly validation details, and automated tests make the API easier to maintain."
      ],

      bullets: [
        "Define a consistent error response contract.",
        "Keep the HTTP status and body status aligned.",
        "Include useful context without revealing sensitive implementation details.",
        "Return field-level errors for request validation failures.",
        "Use stable application error codes when they provide value.",
        "Centralize Spring MVC error handling.",
        "Test error response status codes and JSON fields.",
        "Document the contract for frontend and API consumers."
      ]
    }
  ]
};
