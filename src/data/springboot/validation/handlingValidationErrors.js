
export const handlingValidationErrors = {
  id: 609,

  title: "Handling Validation Errors",

  slug: "handling-validation-errors",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn how Spring Boot reports validation failures and how a global exception handler can convert validation errors into a clean API response.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "validation-error",

      title: "What Happens When Validation Fails?",

      paragraphs: [
        "When a controller receives a request body annotated with @Valid and one or more constraints fail, Spring MVC raises a validation-related exception instead of continuing with the controller method normally.",
        "For request-body validation, MethodArgumentNotValidException is commonly raised when validation of the request body fails.",
        "The exception contains information about the validation failures, including the fields that failed and their validation messages.",
        "A global exception handler can intercept this exception and convert it into a clean REST API response."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> createEmployee(
        @Valid
        @RequestBody EmployeeRequest request) {

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employeeService.create(request));
}`
      }
    },

    {
      id: "validation-error-flow",

      title: "Validation Failure Flow",

      paragraphs: [
        "The important point is that the controller's normal business logic is not executed when request-body validation fails.",
        "Spring performs validation before invoking the controller method body."
      ],

      code: {
        language: "text",
        code: `HTTP POST Request
       |
       v
@RequestBody
       |
       v
JSON -> DTO
       |
       v
@Valid
       |
       v
Bean Validation
       |
       +----------------------+
       |                      |
       v                      v
Validation Passes       Validation Fails
       |                      |
       v                      v
Controller Method      MethodArgumentNotValidException
       |                      |
       v                      v
Service Layer          Exception Handler
                              |
                              v
                       HTTP 400 Response`
      }
    },

    {
      id: "error-response",

      title: "Designing a Validation Error Response",

      paragraphs: [
        "A REST API should return a predictable structure when validation fails.",
        "A useful response can contain the HTTP status, a general message, and field-specific errors.",
        "Returning field names and messages allows frontend applications to display useful validation feedback."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email",
    "department": "Department is required"
  }
}`
      },

      bullets: [
        "status identifies the HTTP error status.",
        "message provides a general explanation.",
        "errors contains field-specific validation messages.",
        "The response structure should remain consistent across the API."
      ]
    },

    {
      id: "exception-handler",

      title: "Global Exception Handler",

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors =
                exception.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .collect(Collectors.toMap(
                                FieldError::getField,
                                error -> error.getDefaultMessage(),
                                (first, second) -> first
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
    }
}`
      },

      paragraphs: [
        "The exception handler extracts field errors from the BindingResult and converts them into a map containing field names and messages.",
        "The merge function in Collectors.toMap prevents a duplicate-key failure if more than one validation error is associated with the same field.",
        "The handler then returns HTTP 400 Bad Request with the standardized validation response."
      ]
    },

    {
      id: "binding-result",

      title: "What is BindingResult?",

      paragraphs: [
        "BindingResult contains information about data binding and validation errors for an object.",
        "When MethodArgumentNotValidException is thrown, its getBindingResult() method provides access to the validation results.",
        "From the BindingResult, we can obtain field-specific errors and object-level errors."
      ],

      code: {
        language: "java",
        code: `BindingResult result =
        exception.getBindingResult();

List<FieldError> fieldErrors =
        result.getFieldErrors();`
      },

      bullets: [
        "BindingResult contains validation and binding information.",
        "getFieldErrors() returns field-level errors.",
        "getGlobalErrors() returns object-level errors.",
        "getAllErrors() returns all available errors."
      ]
    },

    {
      id: "field-error",

      title: "Understanding FieldError",

      paragraphs: [
        "FieldError represents a validation error associated with a particular field.",
        "It provides useful information such as the field name, rejected value, validation codes, and default validation message."
      ],

      code: {
        language: "java",
        code: `for (FieldError error :
        exception.getBindingResult().getFieldErrors()) {

    String field = error.getField();

    String message = error.getDefaultMessage();

    Object rejectedValue =
            error.getRejectedValue();

    System.out.println(field);
    System.out.println(message);
    System.out.println(rejectedValue);
}`
      },

      bullets: [
        "getField() returns the field name.",
        "getDefaultMessage() returns the resolved/default validation message.",
        "getRejectedValue() returns the value that failed validation.",
        "FieldError is useful for building field-level API responses."
      ]
    },

    {
      id: "multiple-errors",

      title: "Handling Multiple Validation Errors",

      paragraphs: [
        "A single request can contain multiple invalid fields. The exception handler should collect all relevant errors instead of returning only the first failure.",
        "For example, a request can have an invalid email, missing name, and invalid phone number at the same time."
      ],

      code: {
        language: "text",
        code: `Request
  |
  +-- name -> empty
  |
  +-- email -> invalid format
  |
  +-- phone -> wrong format
  |
  v
Bean Validation
  |
  v
Multiple FieldErrors
  |
  v
Global Exception Handler
  |
  v
{
  "name": "Name is required",
  "email": "Invalid email",
  "phone": "Invalid phone number"
}`
      }
    },

    {
      id: "response-dto",

      title: "Validation Error DTO",

      paragraphs: [
        "A dedicated response DTO makes the validation-error contract explicit.",
        "Using a record is a concise approach for an immutable response model."
      ],

      code: {
        language: "java",
        code: `public record ValidationErrorResponse(

    int status,

    String message,

    Map<String, String> errors

) {
}`
      },

      bullets: [
        "The DTO defines the API response structure.",
        "status contains the HTTP status.",
        "message contains the general error message.",
        "errors contains field-specific messages."
      ]
    },

    {
      id: "complete-dto",

      title: "Complete Request DTO Example",

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeRequest(

    @NotBlank(message = "Name is required")
    @Size(
        min = 2,
        max = 100,
        message = "Name must contain 2 to 100 characters"
    )
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    String email,

    @NotBlank(message = "Department is required")
    String department

) {
}`
      }
    },

    {
      id: "invalid-request",

      title: "Example Invalid Request",

      code: {
        language: "json",
        code: `{
  "name": "",
  "email": "wrong-email",
  "department": ""
}`
      },

      paragraphs: [
        "This request violates multiple validation constraints. The name is blank, the email does not have an acceptable email format, and the department is blank."
      ]
    },

    {
      id: "validation-result",

      title: "Possible Validation Response",

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email address",
    "department": "Department is required"
  }
}`
      }
    },

    {
      id: "complete-flow",

      title: "Complete Error Handling Flow",

      bullets: [
        "Client sends invalid request.",
        "Spring receives the HTTP request.",
        "@RequestBody converts JSON into the request DTO.",
        "@Valid triggers Bean Validation.",
        "Constraint violations are detected.",
        "MethodArgumentNotValidException is raised.",
        "@RestControllerAdvice catches the exception.",
        "getBindingResult() retrieves validation information.",
        "getFieldErrors() retrieves field-level errors.",
        "Field names and messages are extracted.",
        "ValidationErrorResponse is created.",
        "HTTP 400 Bad Request is returned to the client."
      ]
    },

    {
      id: "why-global",

      title: "Why Use Global Exception Handling?",

      paragraphs: [
        "Without global exception handling, every controller could end up containing repetitive validation-error handling code.",
        "A @RestControllerAdvice centralizes error handling and allows the application to return consistent API responses.",
        "This approach also makes it easier to add handling for other application exceptions in the same centralized layer."
      ],

      bullets: [
        "Reduces duplicate controller code.",
        "Provides consistent error responses.",
        "Keeps controllers focused on request processing.",
        "Makes API behavior easier to maintain.",
        "Provides a single place for cross-cutting exception handling."
      ]
    },

    {
      id: "rest-controller-advice",

      title: "What is @RestControllerAdvice?",

      paragraphs: [
        "@RestControllerAdvice is a specialized form of controller advice designed for REST APIs.",
        "It combines controller-advice behavior with response-body semantics, making it convenient for returning objects that Spring serializes as JSON.",
        "Exception handlers declared inside it can apply across controllers covered by the advice."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
        MethodArgumentNotValidException.class
    )
    public ResponseEntity<ValidationErrorResponse>
    handleValidation(
        MethodArgumentNotValidException exception) {

        // Build response

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}`
      }
    },

    {
      id: "exception-handler-annotation",

      title: "What Does @ExceptionHandler Do?",

      paragraphs: [
        "@ExceptionHandler tells Spring that a particular method should handle a specified exception type.",
        "When the matching exception is raised during controller processing, Spring can route it to the corresponding handler method."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(
    MethodArgumentNotValidException.class
)
public ResponseEntity<ValidationErrorResponse>
handleValidation(
    MethodArgumentNotValidException exception) {

    // Handle validation error
}`
      },

      bullets: [
        "It associates an exception type with a handler method.",
        "It can be declared inside @RestControllerAdvice.",
        "It can also be declared in a controller for local handling.",
        "Global handling is usually preferable for common API-wide errors."
      ]
    },

    {
      id: "local-vs-global",

      title: "Local vs Global Exception Handling",

      paragraphs: [
        "An exception can be handled locally inside a controller or centrally through @RestControllerAdvice.",
        "Global handling is usually more maintainable when the same error format should be used across many controllers."
      ],

      code: {
        language: "text",
        code: `Local Handling

EmployeeController
        |
        +-- @ExceptionHandler
        |
        v
Only this controller


Global Handling

EmployeeController ----+
UserController --------+----> @RestControllerAdvice
DepartmentController --+
                              |
                              v
                     Common Error Response`
      },

      bullets: [
        "Use local handling when behavior is genuinely controller-specific.",
        "Use global handling for common application-wide exceptions.",
        "Avoid duplicating identical validation handlers across controllers."
      ]
    },

    {
      id: "error-message",

      title: "Where Does the Validation Message Come From?",

      paragraphs: [
        "The validation message normally comes from the message attribute of the constraint annotation or from the validation message configuration.",
        "For example, @NotBlank(message = \"Name is required\") supplies a custom message."
      ],

      code: {
        language: "java",
        code: `@NotBlank(
    message = "Name is required"
)
String name;


@Email(
    message = "Please provide a valid email"
)
String email;`
      },

      paragraphs: [
        "Using meaningful messages makes validation responses easier for API consumers to understand."
      ]
    },

    {
      id: "message-properties",

      title: "Using Message Keys",

      paragraphs: [
        "For larger applications, validation messages can be externalized instead of hardcoding every message directly in the DTO.",
        "This can help with maintainability and internationalization."
      ],

      code: {
        language: "java",
        code: `@NotBlank(
    message = "{employee.name.required}"
)
String name;`
      },

      bullets: [
        "Message keys can be stored in validation message bundles.",
        "Externalized messages are useful for larger applications.",
        "They can also support multiple languages."
      ]
    },

    {
      id: "nested-errors",

      title: "Validation Errors in Nested Objects",

      paragraphs: [
        "Validation can also fail inside nested DTOs when nested validation is enabled with @Valid."
      ],

      code: {
        language: "java",
        code: `public record AddressRequest(

    @NotBlank
    String city,

    @NotBlank
    String country

) {
}


public record EmployeeRequest(

    @NotBlank
    String name,

    @Valid
    @NotNull
    AddressRequest address

) {
}`
      },

      paragraphs: [
        "If address.city is invalid, the validation error contains information about the nested property path."
      ]
    },

    {
      id: "object-errors",

      title: "Field Errors vs Object Errors",

      paragraphs: [
        "Most simple DTO validation failures are field-level errors. However, some validation rules apply to the object as a whole.",
        "For example, a custom cross-field constraint may compare startDate and endDate."
      ],

      code: {
        language: "java",
        code: `BindingResult result =
        exception.getBindingResult();

List<FieldError> fieldErrors =
        result.getFieldErrors();

List<ObjectError> objectErrors =
        result.getGlobalErrors();`
      },

      bullets: [
        "FieldError represents a specific field problem.",
        "ObjectError represents an object-level validation problem.",
        "Global error handling should consider both when the application uses cross-field constraints."
      ]
    },

    {
      id: "duplicate-fields",

      title: "Handling Multiple Errors for One Field",

      paragraphs: [
        "A field can potentially violate more than one constraint. For example, a blank email can violate both @NotBlank and another applicable constraint.",
        "If the API response stores only one message per field, the handler must define which message should be retained."
      ],

      code: {
        language: "java",
        code: `Map<String, String> errors =
    exception.getBindingResult()
        .getFieldErrors()
        .stream()
        .collect(Collectors.toMap(
            FieldError::getField,
            error -> error.getDefaultMessage(),
            (first, second) -> first
        ));`
      },

      paragraphs: [
        "The merge function prevents duplicate field names from causing Collectors.toMap to throw an exception."
      ]
    },

    {
      id: "list-error-design",

      title: "Alternative: Return a List of Errors",

      paragraphs: [
        "A map is simple when the API wants one message per field. A list is more flexible when the API needs to preserve multiple validation errors for the same field."
      ],

      code: {
        language: "java",
        code: `public record FieldValidationError(

    String field,

    String message

) {
}


public record ValidationErrorResponse(

    int status,

    String message,

    List<FieldValidationError> errors

) {
}`
      },

      code: {
        language: "text",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "phone",
      "message": "Invalid phone number"
    }
  ]
}`
      }
    },

    {
      id: "response-entity",

      title: "Why Use ResponseEntity?",

      paragraphs: [
        "ResponseEntity allows the exception handler to control the HTTP status and response body explicitly.",
        "For validation failures, returning HTTP 400 Bad Request communicates that the client sent invalid input."
      ],

      code: {
        language: "java",
        code: `return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(response);`
      },

      bullets: [
        "HTTP status can be controlled explicitly.",
        "The response body can contain the validation DTO.",
        "Headers can also be customized when necessary."
      ]
    },

    {
      id: "status-code",

      title: "Why HTTP 400 Bad Request?",

      paragraphs: [
        "Validation failures normally indicate that the client supplied invalid request data.",
        "Therefore, HTTP 400 Bad Request is commonly used for REST API validation failures."
      ],

      code: {
        language: "text",
        code: `Valid Request
     |
     v
200 / 201


Invalid Request
     |
     v
400 Bad Request


Authentication Missing
     |
     v
401 Unauthorized


Authenticated but Forbidden
     |
     v
403 Forbidden`
      }
    },

    {
      id: "binding-vs-validation",

      title: "Binding Errors vs Validation Errors",

      paragraphs: [
        "Not every request failure is a Bean Validation constraint violation.",
        "For example, JSON may fail to deserialize into the target Java type before Bean Validation can evaluate the DTO."
      ],

      code: {
        language: "text",
        code: `JSON
 |
 +------------------------------+
 |                              |
 v                              v
JSON conversion succeeds   JSON conversion fails
 |                              |
 v                              v
Bean Validation             Deserialization /
 |                          HttpMessageNotReadableException
 v
MethodArgumentNotValidException`
      },

      paragraphs: [
        "A production application should usually handle malformed JSON separately from Bean Validation failures."
      ]
    },

    {
      id: "malformed-json",

      title: "Malformed JSON Is Different",

      code: {
        language: "json",
        code: `{
  "name": "John",
  "age":
}`
      },

      paragraphs: [
        "The example above is malformed JSON. The request may fail during JSON parsing before normal DTO validation occurs.",
        "This is different from receiving valid JSON whose values violate Bean Validation constraints."
      ]
    },

    {
      id: "validation-vs-business",

      title: "Validation Errors vs Business Errors",

      paragraphs: [
        "Validation errors indicate that the request data does not satisfy declared input constraints.",
        "Business errors occur when the request is structurally valid but violates an application rule."
      ],

      code: {
        language: "text",
        code: `Validation Error

email = "invalid"
        |
        v
400 Bad Request


Business Error

email = "user@example.com"
but account already exists
        |
        v
Application-specific error
such as conflict
`
      },

      bullets: [
        "Use Bean Validation for input constraints.",
        "Use service/domain logic for business rules.",
        "Use appropriate application exceptions for business failures.",
        "Do not put every business rule into DTO annotations."
      ]
    },

    {
      id: "production-error-response",

      title: "Production-Friendly Error Response",

      paragraphs: [
        "A production API often needs more than just status and messages. Depending on the application's requirements, the response may include a timestamp, request path, error code, and field-level errors.",
        "The exact response contract should be standardized across the API."
      ],

      code: {
        language: "java",
        code: `public record ApiErrorResponse(

    int status,

    String error,

    String message,

    String path,

    Map<String, String> errors

) {
}`
      },

      code: {
        language: "json",
        code: `{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/employees",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email"
  }
}`
      }
    },

    {
      id: "testing-handler",

      title: "Testing Validation Error Handling",

      paragraphs: [
        "The validation handler should be tested through the API layer to verify both the HTTP status and the response structure."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/employees")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "name": "",
                "email": "invalid",
                "department": ""
            }
            """)
)
.andExpect(status().isBadRequest())
.andExpect(jsonPath("$.message")
    .value("Validation failed"))
.andExpect(jsonPath("$.errors.name")
    .value("Name is required"))
.andExpect(jsonPath("$.errors.email")
    .value("Invalid email"));`
      },

      bullets: [
        "Verify HTTP 400.",
        "Verify the general error message.",
        "Verify important field-level messages.",
        "Test multiple invalid fields.",
        "Test valid requests separately."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Forgetting @Valid on @RequestBody.",
        "Assuming validation happens without a validation provider.",
        "Handling validation errors separately in every controller.",
        "Returning inconsistent validation response structures.",
        "Returning only a generic error without identifying invalid fields.",
        "Using Collectors.toMap without considering duplicate field errors.",
        "Ignoring object-level validation errors.",
        "Confusing MethodArgumentNotValidException with malformed JSON errors.",
        "Treating validation as a replacement for business-rule validation.",
        "Exposing sensitive rejected values in error responses.",
        "Returning HTTP 500 for normal client validation failures.",
        "Validating only in the frontend.",
        "Using overly complicated exception-handling logic."
      ]
    },

    {
      id: "best-practices",

      title: "Validation Error Handling Best Practices",

      bullets: [
        "Use @Valid or the appropriate validation mechanism at the API boundary.",
        "Use @RestControllerAdvice for common API-wide exception handling.",
        "Return HTTP 400 for normal request validation failures.",
        "Return field-level messages so clients can identify invalid inputs.",
        "Keep the error response structure consistent.",
        "Avoid exposing sensitive information.",
        "Handle malformed JSON separately from Bean Validation failures.",
        "Consider object-level validation errors for cross-field constraints.",
        "Use stable error codes when frontend applications need machine-readable error types.",
        "Test the validation response with MockMvc or an equivalent API test.",
        "Keep business-rule exceptions separate from simple input validation.",
        "Document the error response contract for API consumers."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question:
            "Which exception commonly occurs for @Valid @RequestBody validation failures?",

          answer:
            "MethodArgumentNotValidException is commonly raised by Spring MVC for request-body argument validation failures."
        },

        {
          question: "How do you handle validation exceptions globally?",

          answer:
            "Use @RestControllerAdvice together with @ExceptionHandler to centralize validation error handling."
        },

        {
          question: "Why return field-level validation errors?",

          answer:
            "Field-level errors tell the client exactly which inputs failed validation and why."
        },

        {
          question: "What is BindingResult?",

          answer:
            "BindingResult contains information about data binding and validation results. It can provide field-level and object-level errors."
        },

        {
          question: "What does @RestControllerAdvice do?",

          answer:
            "@RestControllerAdvice provides centralized controller exception handling with response-body semantics suitable for REST APIs."
        },

        {
          question: "What is the purpose of @ExceptionHandler?",

          answer:
            "@ExceptionHandler maps a specified exception type to a handler method that processes that exception."
        },

        {
          question:
            "Why is global exception handling preferred over repeating validation handling in every controller?",

          answer:
            "It reduces duplication, provides consistent responses, and keeps controllers focused on request processing."
        },

        {
          question:
            "What HTTP status is normally returned for request validation failure?",

          answer:
            "HTTP 400 Bad Request is commonly returned because the client supplied invalid request data."
        },

        {
          question:
            "What is the difference between validation failure and malformed JSON?",

          answer:
            "Validation failure occurs after the request has been successfully converted into the DTO but violates Bean Validation constraints. Malformed JSON can fail during JSON parsing before normal Bean Validation occurs."
        },

        {
          question:
            "Can one request contain multiple validation errors?",

          answer:
            "Yes. Spring collects validation errors, and the exception handler can extract all field errors and return them in the API response."
        },

        {
          question:
            "What is the difference between FieldError and ObjectError?",

          answer:
            "FieldError represents an error associated with a specific field, while ObjectError represents an object-level validation error."
        },

        {
          question:
            "Why should validation errors not normally return HTTP 500?",

          answer:
            "HTTP 500 represents a server-side failure. Invalid client input is normally a client error, so HTTP 400 is more appropriate."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You added @NotBlank to a DTO, but the API still accepts an empty value. What would you check?",

          answer:
            "First verify that validation is triggered, such as by using @Valid on the request body. Then verify that the validation starter/provider is present and that the request is actually reaching the expected DTO."
        },

        {
          question:
            "Three fields are invalid, but your response contains only one field. What could be wrong?",

          answer:
            "Check the exception handler logic. It should iterate through getFieldErrors() rather than extracting only the first error."
        },

        {
          question:
            "Your Collectors.toMap code throws a duplicate-key exception. Why?",

          answer:
            "More than one FieldError can potentially use the same field name. If the response is designed to store only one message per field, provide a merge function to Collectors.toMap."
        },

        {
          question:
            "The request contains invalid JSON instead of a valid JSON object. Will MethodArgumentNotValidException always be raised?",

          answer:
            "No. JSON parsing or message conversion can fail before Bean Validation. Such failures are handled separately, commonly through HttpMessageNotReadableException handling."
        },

        {
          question:
            "Should validation errors expose the rejected password in the response?",

          answer:
            "No. Sensitive values such as passwords, tokens, and credentials should not be returned in API error responses."
        },

        {
          question:
            "A frontend developer asks why the API returns field-level errors instead of one generic message. How would you explain it?",

          answer:
            "Field-level errors allow the frontend to associate each validation message with the corresponding input field, improving both usability and error handling."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@Valid triggers validation for a request body.",
        "MethodArgumentNotValidException commonly represents @Valid @RequestBody validation failures.",
        "BindingResult contains validation information.",
        "getFieldErrors() retrieves field-level validation errors.",
        "FieldError provides the field and validation message.",
        "@RestControllerAdvice centralizes REST exception handling.",
        "@ExceptionHandler maps exceptions to handler methods.",
        "HTTP 400 is commonly used for validation failures.",
        "Return consistent field-level errors.",
        "Malformed JSON is different from Bean Validation failure.",
        "Object-level validation errors may require getGlobalErrors().",
        "Use merge logic when converting multiple FieldErrors into a Map.",
        "Do not expose sensitive rejected values.",
        "Keep validation errors separate from business-rule errors.",
        "Test both the HTTP status and response body."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "In Spring Boot, when a REST controller receives a request body with @Valid and the DTO contains invalid Bean Validation values, Spring MVC commonly raises MethodArgumentNotValidException. We can handle this globally using @RestControllerAdvice and @ExceptionHandler. From the exception, we can access the BindingResult and extract FieldError objects using getFieldErrors(). We then build a consistent validation response containing HTTP 400, a general message, and field-specific validation messages. This keeps controllers clean and gives frontend clients a predictable error structure."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "The most important flow to remember is: HTTP request -> @RequestBody -> DTO conversion -> @Valid -> Bean Validation -> MethodArgumentNotValidException -> @RestControllerAdvice -> @ExceptionHandler -> HTTP 400 response.",
        "BindingResult is the object that provides access to validation results. getFieldErrors() is used for field-level errors, while getGlobalErrors() can be used for object-level errors.",
        "Do not confuse Bean Validation failures with malformed JSON. If JSON cannot be converted into the expected Java object, the request can fail before Bean Validation runs.",
        "A professional REST API should return a consistent error contract rather than exposing raw framework exception details.",
        "For interviews, emphasize that global exception handling is a cross-cutting concern. @RestControllerAdvice prevents repeated exception-handling logic across controllers and keeps the API layer clean."
      ]
    }
  ]
};
