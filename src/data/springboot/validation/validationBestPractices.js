
export const validationBestPractices = {
  id: 610,

  title: "Validation Best Practices",

  slug: "validation-best-practices",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn practical validation best practices for designing clean, maintainable, and production-ready Spring Boot REST APIs.",

  estimatedTime: "55 min",

  sections: [
    {
      id: "why-best-practices",

      title: "Why Validation Best Practices Matter",

      paragraphs: [
        "Validation is more than adding annotations to DTO fields. A production application should have a clear validation strategy that separates request validation, business rules, persistence rules, and error handling.",
        "Good validation design makes APIs easier to understand and prevents invalid data from moving deeper into the application.",
        "A good validation strategy also improves API consistency because clients receive predictable validation responses instead of different error formats from different controllers."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
Request DTO
  |
  | Structural validation
  v
Controller
  |
  v
Service
  |
  | Business rules
  v
Repository
  |
  | Persistence constraints
  v
Database`
      }
    },

    {
      id: "dto-validation",

      title: "1. Validate Request DTOs",

      paragraphs: [
        "Request DTOs are a natural boundary for validating client input. This keeps external API validation separate from database entities.",
        "A DTO can express requirements such as required fields, string lengths, email formats, numeric ranges, date constraints, and collection sizes."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email

) {
}`
      },

      bullets: [
        "DTO represents the API contract.",
        "Validation protects the API boundary.",
        "Entities remain focused on persistence.",
        "DTOs can have validation rules specific to an API operation."
      ]
    },

    {
      id: "dto-vs-entity",

      title: "Keep DTOs Separate from Entities",

      paragraphs: [
        "A JPA entity represents persistent state, while a request DTO represents client input. These models can have different fields and different validation requirements.",
        "Using entities directly as request models can unintentionally expose fields that clients should not control."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
EmployeeCreateRequest
  |
  | validation
  v
EmployeeService
  |
  | mapping
  v
Employee
  |
  v
Database`
      },

      bullets: [
        "Do not expose database internals unnecessarily.",
        "Do not allow clients to modify server-controlled fields accidentally.",
        "Keep API contracts independent from persistence models.",
        "Use explicit mapping between DTOs and entities."
      ]
    },

    {
      id: "meaningful-messages",

      title: "2. Use Meaningful Validation Messages",

      paragraphs: [
        "Validation messages should explain what the client needs to correct. Generic messages such as 'Invalid value' are usually less useful than field-specific messages.",
        "Messages should be written from the API consumer's perspective and should clearly describe the expected input."
      ],

      code: {
        language: "java",
        code: `@NotBlank(
    message = "Name is required"
)
String name;


@Email(
    message = "Please provide a valid email address"
)
String email;


@Size(
    min = 2,
    max = 100,
    message = "Name must contain 2 to 100 characters"
)
String name;`
      },

      bullets: [
        "Tell the client what is wrong.",
        "Explain the expected format or range.",
        "Avoid vague messages.",
        "Keep messages consistent across the API."
      ]
    },

    {
      id: "message-keys",

      title: "Validation Messages and API Contracts",

      paragraphs: [
        "For larger applications, validation messages may be externalized into message bundles instead of being hard-coded throughout DTO classes.",
        "This can make message management, localization, and consistency easier."
      ],

      code: {
        language: "java",
        code: `@NotBlank(
    message = "{employee.name.required}"
)
String name;`
      },

      code: {
        language: "properties",
        code: `employee.name.required=Name is required
employee.email.invalid=Please provide a valid email address`
      }
    },

    {
      id: "combine",

      title: "3. Combine Constraints Carefully",

      paragraphs: [
        "Multiple constraints can be useful when a field has several requirements, but constraints should represent actual business or API requirements.",
        "Do not add annotations simply because they are available. Each constraint should have a clear purpose."
      ],

      code: {
        language: "java",
        code: `@NotBlank(
    message = "Name is required"
)
@Size(
    min = 2,
    max = 100,
    message = "Name must contain 2 to 100 characters"
)
String name;`
      },

      bullets: [
        "@NotBlank checks meaningful text.",
        "@Size checks length.",
        "Both constraints solve different problems.",
        "Use multiple constraints when the API actually requires multiple rules."
      ]
    },

    {
      id: "choose-constraint",

      title: "Choose the Correct Constraint",

      code: {
        language: "text",
        code: `Required text
    |
    +--> @NotBlank


Required object/value
    |
    +--> @NotNull


Collection must contain elements
    |
    +--> @NotEmpty


String/collection size
    |
    +--> @Size


Numeric minimum
    |
    +--> @Min / @DecimalMin


Numeric maximum
    |
    +--> @Max / @DecimalMax


Number > 0
    |
    +--> @Positive


Number >= 0
    |
    +--> @PositiveOrZero


Email format
    |
    +--> @Email


Custom text format
    |
    +--> @Pattern`
      }
    },

    {
      id: "global-errors",

      title: "4. Centralize Error Handling",

      paragraphs: [
        "Use global exception handling for validation failures so controllers do not contain repetitive error-processing code.",
        "@RestControllerAdvice provides a centralized place to convert validation exceptions into API responses."
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

        // Build consistent validation response

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}`
      },

      bullets: [
        "Centralizes validation handling.",
        "Reduces duplicate controller code.",
        "Provides a consistent response structure.",
        "Makes error behavior easier to maintain."
      ]
    },

    {
      id: "validation-error-response",

      title: "Design a Useful Validation Error Response",

      paragraphs: [
        "A validation error response should give API clients enough information to identify which fields failed and what needs to be corrected."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email"
  }
}`
      },

      bullets: [
        "HTTP status identifies the type of failure.",
        "General message describes the failure category.",
        "Field errors identify individual invalid fields.",
        "Avoid returning sensitive request values."
      ]
    },

    {
      id: "dont-trust-client",

      title: "5. Never Trust Client Input",

      paragraphs: [
        "Client-side validation can improve user experience, but it should never replace server-side validation. A client can bypass browser or frontend validation and directly call the API.",
        "The backend must enforce the rules that are required for the API.",
        "Postman, curl, mobile applications, scripts, and malicious clients can send requests without following frontend validation rules."
      ],

      code: {
        language: "text",
        code: `React Frontend
     |
     | Client validation
     v
HTTP Request
     |
     v
Spring Boot API
     |
     | Server validation
     v
Service Layer`
      },

      bullets: [
        "Frontend validation is for user experience.",
        "Backend validation is the security and integrity boundary.",
        "Never assume a request came from your own frontend.",
        "Always validate important input on the server."
      ]
    },

    {
      id: "validation-vs-business",

      title: "6. Separate Validation from Business Rules",

      paragraphs: [
        "Bean Validation is excellent for structural input rules such as required fields, formats, lengths, and ranges.",
        "Some rules require business logic. For example, checking whether an employee already exists or whether a product has sufficient inventory usually requires service-layer logic and possibly database access.",
        "A useful rule is: if the validation requires application state, database access, authorization, or a domain decision, it usually belongs beyond simple DTO validation."
      ],

      code: {
        language: "text",
        code: `Request Validation
        |
        v
@NotBlank
@Email
@Size
@Min
@Max
        |
        v
Service Layer
        |
        v
Business Rules
        |
        v
Repository / Database`
      },

      bullets: [
        "Structural rules → Bean Validation.",
        "Application-state rules → service/domain logic.",
        "Authorization rules → security layer.",
        "Database integrity → database constraints."
      ]
    },

    {
      id: "business-rule-example",

      title: "Example of a Business Rule",

      paragraphs: [
        "Suppose an employee email must be unique. @Email can check the format, but it cannot determine whether the email already exists in the database.",
        "The uniqueness rule requires application or database state."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse create(
        EmployeeCreateRequest request) {

    if (employeeRepository
            .existsByEmail(request.email())) {

        throw new DuplicateResourceException(
            "Employee email already exists"
        );
    }

    Employee employee = mapToEntity(request);

    return mapToResponse(
        employeeRepository.save(employee)
    );
}`
      },

      paragraphs: [
        "The DTO handles email format, while the service handles the application-specific uniqueness rule."
      ]
    },

    {
      id: "database-constraints",

      title: "Validation Does Not Replace Database Constraints",

      paragraphs: [
        "Application validation improves API behavior, but important data-integrity rules should also be enforced by the database.",
        "For example, checking email uniqueness in Java is useful, but a database UNIQUE constraint provides the final integrity guarantee when concurrent requests are possible."
      ],

      code: {
        language: "text",
        code: `API Validation
    |
    v
Service Rule
    |
    v
Database Constraint
    |
    v
Persistent Data Integrity`
      },

      bullets: [
        "DTO validation improves input quality.",
        "Service logic handles business behavior.",
        "Database constraints protect stored data.",
        "Use multiple layers when the rule requires strong integrity."
      ]
    },

    {
      id: "consistent-response",

      title: "7. Use a Consistent Error Structure",

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email"
  }
}`
      },

      paragraphs: [
        "A predictable error format makes it easier for frontend applications and API consumers to display validation errors.",
        "Consistency is more important than having a complicated error structure. Clients should know where to find the general error and field-specific messages."
      ]
    },

    {
      id: "error-field-structure",

      title: "Field-Level Errors",

      paragraphs: [
        "Field-level errors are particularly useful for forms because the frontend can associate each message with the corresponding input field."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email",
    "age": "Age must be at least 18"
  }
}`
      },

      bullets: [
        "The field name identifies the invalid input.",
        "The message explains the problem.",
        "The frontend can display the message beside the appropriate input."
      ]
    },

    {
      id: "sensitive-errors",

      title: "Do Not Expose Sensitive Data in Errors",

      paragraphs: [
        "Validation and error responses should not expose passwords, authentication tokens, internal stack traces, database credentials, or other sensitive information.",
        "Return enough information for the client to correct the request without leaking internal application details."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "password": "Password does not meet the required policy"
  }
}`
      }
    },

    {
      id: "production-checklist",

      title: "Validation Checklist",

      bullets: [
        "Use request DTOs for API input.",
        "Use Jakarta Validation constraints.",
        "Use @Valid where object validation is required.",
        "Use @Validated for appropriate method validation or validation-group scenarios.",
        "Choose constraints according to the actual requirement.",
        "Write meaningful validation messages.",
        "Handle validation errors globally.",
        "Return a consistent error response.",
        "Do not rely only on frontend validation.",
        "Keep business rules in the service/domain layer.",
        "Use database constraints for important data integrity rules.",
        "Test both valid and invalid requests.",
        "Test boundary values.",
        "Do not expose sensitive information in error responses."
      ]
    },

    {
      id: "testing",

      title: "Test Validation at the API Boundary",

      paragraphs: [
        "Validation should be tested as part of the API contract. Tests should cover both valid requests and requests that violate individual constraints."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/employees")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "name": "",
                "email": "invalid"
            }
            """)
)
.andExpect(status().isBadRequest());`
      },

      bullets: [
        "Test missing required fields.",
        "Test blank strings.",
        "Test invalid formats.",
        "Test minimum and maximum boundaries.",
        "Test valid requests.",
        "Test nested DTO validation.",
        "Test collection validation.",
        "Test validation error response structure."
      ]
    },

    {
      id: "boundary-testing",

      title: "Test Validation Boundaries",

      paragraphs: [
        "Boundary testing is especially important for @Size, @Min, @Max, @Positive, and similar constraints.",
        "Test the value immediately below the boundary, exactly at the boundary, and immediately above the boundary."
      ],

      code: {
        language: "text",
        code: `@Min(18)
@Max(60)

17 -> FAIL
18 -> PASS
60 -> PASS
61 -> FAIL


@Size(min = 2, max = 100)

1 character   -> FAIL
2 characters  -> PASS
100 characters -> PASS
101 characters -> FAIL`
      }
    },

    {
      id: "complete-example",

      title: "Complete Practical Example",

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(
        message = "Name is required"
    )
    @Size(
        min = 2,
        max = 100,
        message = "Name must contain 2 to 100 characters"
    )
    String name,

    @NotBlank(
        message = "Email is required"
    )
    @Email(
        message = "Invalid email address"
    )
    String email,

    @NotBlank(
        message = "Department is required"
    )
    String department

) {
}


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(
            EmployeeService employeeService) {

        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> create(
            @Valid
            @RequestBody EmployeeCreateRequest request) {

        EmployeeResponse response =
                employeeService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}`
      },

      paragraphs: [
        "This example follows the recommended boundary: the request DTO validates client input, the controller handles HTTP concerns, and the service handles application logic."
      ]
    },

    {
      id: "complete-architecture",

      title: "Production Validation Architecture",

      code: {
        language: "text",
        code: `                    Client
                      |
                      | JSON
                      v
              +---------------+
              | Request DTO   |
              |               |
              | @NotBlank     |
              | @Email        |
              | @Size         |
              | @Min / @Max   |
              +---------------+
                      |
                    @Valid
                      |
                      v
              +---------------+
              |  Controller   |
              +---------------+
                      |
                      v
              +---------------+
              |    Service    |
              |               |
              | Business      |
              | Rules         |
              +---------------+
                      |
                      v
              +---------------+
              |   Repository  |
              +---------------+
                      |
                      v
              +---------------+
              |   Database    |
              | Constraints   |
              +---------------+`
      }
    },

    {
      id: "valid-vs-validated",

      title: "@Valid vs @Validated in Production",

      paragraphs: [
        "@Valid is the normal choice when validating request DTO objects and cascading into nested DTOs.",
        "@Validated is useful for Spring method validation and validation groups.",
        "Do not replace @Valid with @Validated everywhere simply because both are related to validation."
      ],

      code: {
        language: "text",
        code: `Request DTO

@Valid
    |
    +--> Object validation
    +--> Nested validation


Service method

@Validated
    |
    +--> Method parameter validation
    +--> Return-value validation
    +--> Validation groups`
      }
    },

    {
      id: "custom-validation",

      title: "Use Custom Validation Only When Needed",

      paragraphs: [
        "Built-in constraints should be preferred when they can express the rule clearly. Custom constraints are useful when a reusable validation rule cannot be represented effectively with the standard constraints."
      ],

      code: {
        language: "java",
        code: `@ValidEmployeeCode
String employeeCode;`
      },

      bullets: [
        "Prefer built-in constraints for simple rules.",
        "Create custom constraints for reusable specialized rules.",
        "Avoid creating custom annotations for rules that can be expressed with existing constraints.",
        "Keep complex state-dependent rules in service/domain logic."
      ]
    },

    {
      id: "validation-groups",

      title: "Use Validation Groups Carefully",

      paragraphs: [
        "Validation groups can support different validation rules for different operations, but they can make DTOs harder to understand.",
        "If create and update requests have significantly different contracts, separate DTOs are often easier to maintain."
      ],

      code: {
        language: "text",
        code: `Simple API

EmployeeCreateRequest
EmployeeUpdateRequest


More complex conditional validation

EmployeeRequest
       |
       +--> CreateGroup
       |
       +--> UpdateGroup`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Validation Mistakes",

      bullets: [
        "Validating only on the frontend.",
        "Using JPA entities directly as request models without considering API boundaries.",
        "Forgetting @Valid on @RequestBody.",
        "Using the wrong constraint for the data type.",
        "Assuming @Size makes a field mandatory.",
        "Assuming @Positive allows zero.",
        "Forgetting @Valid on nested DTOs.",
        "Using @NotNull when @NotBlank is required for meaningful text.",
        "Putting database-dependent business rules into simple DTO validation.",
        "Using validation groups when separate DTOs would be clearer.",
        "Returning different validation error formats from different controllers.",
        "Returning stack traces to API clients.",
        "Returning sensitive request values in error responses.",
        "Relying on application validation without database constraints for critical integrity rules.",
        "Not testing boundary values."
      ]
    },

    {
      id: "security-considerations",

      title: "Validation and Security",

      paragraphs: [
        "Validation is not a replacement for authentication, authorization, or other security controls.",
        "It can reduce malformed input and enforce expected formats, but a valid request can still be unauthorized or malicious.",
        "Security decisions such as whether a user is allowed to update an employee must be handled by the security and business-logic layers."
      ],

      code: {
        language: "text",
        code: `Authentication
     |
     v
Authorization
     |
     v
Request Validation
     |
     v
Business Rules
     |
     v
Persistence`
      },

      bullets: [
        "Validation checks whether input satisfies declared constraints.",
        "Authentication checks who the caller is.",
        "Authorization checks what the caller is allowed to do.",
        "Business rules determine whether an operation is valid for the application state."
      ]
    },

    {
      id: "best-practices-summary",

      title: "Production Best Practices Summary",

      bullets: [
        "Validate input at the API boundary.",
        "Use dedicated request DTOs.",
        "Prefer Jakarta Validation built-in constraints.",
        "Use meaningful messages.",
        "Use @Valid for ordinary DTO validation.",
        "Use @Validated for method validation and validation groups.",
        "Cascade validation into nested DTOs with @Valid.",
        "Centralize validation error handling.",
        "Return predictable error structures.",
        "Do not expose sensitive information.",
        "Separate structural validation from business rules.",
        "Use database constraints for critical integrity guarantees.",
        "Test valid, invalid, and boundary cases.",
        "Prefer simple DTO designs over unnecessarily complex validation groups."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Where should request validation normally be performed?",

          answer:
            "Request DTO validation should normally happen at the API boundary before invalid input reaches business logic."
        },

        {
          question: "Should frontend validation replace backend validation?",

          answer:
            "No. Frontend validation improves user experience, but backend validation is required because clients cannot be trusted."
        },

        {
          question: "Should every business rule be implemented as a Bean Validation annotation?",

          answer:
            "No. Bean Validation is appropriate for many structural constraints, while complex business rules generally belong in the service or domain layer."
        },

        {
          question: "Why use global exception handling?",

          answer:
            "It centralizes validation error processing and allows the API to return consistent error responses."
        },

        {
          question: "Why should request DTOs be preferred over exposing JPA entities?",

          answer:
            "DTOs provide an explicit API contract, allow API-specific validation, prevent accidental exposure of persistence fields, and keep the API independent from the database model."
        },

        {
          question: "What is the difference between validation and business validation?",

          answer:
            "Bean Validation commonly handles structural input constraints such as required fields, formats, lengths, and ranges. Business validation handles rules that depend on application state, domain behavior, or database data."
        },

        {
          question: "Does Bean Validation replace database constraints?",

          answer:
            "No. Application validation and database constraints serve different layers of data integrity and can complement each other."
        },

        {
          question: "Why are meaningful validation messages important?",

          answer:
            "They help API consumers understand exactly what needs to be corrected and make frontend error handling easier."
        },

        {
          question: "Why should validation errors be centralized?",

          answer:
            "Centralized handling prevents duplicate controller code and provides a consistent error response across the API."
        },

        {
          question: "When should you create a custom validation annotation?",

          answer:
            "Create one when a reusable validation rule cannot be expressed clearly using the built-in constraints and belongs naturally at the validation layer."
        },

        {
          question: "Is validation a security mechanism?",

          answer:
            "Validation is an input-integrity mechanism, not a replacement for authentication or authorization. Security decisions must still be enforced by the backend."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your frontend validates an email, but Postman can send an invalid email to the API. How should the backend handle it?",

          answer:
            "The backend should independently validate the request DTO using Bean Validation. Frontend validation cannot be trusted."
        },

        {
          question:
            "An employee email must have a valid format and also be unique. How would you design this?",

          answer:
            "Use @Email on the request DTO for format validation. Check uniqueness in the service or repository layer and enforce a database UNIQUE constraint for strong data integrity."
        },

        {
          question:
            "A controller has 20 lines of validation-error processing. What would you improve?",

          answer:
            "Move validation exception handling into a centralized @RestControllerAdvice so controllers remain focused on HTTP request processing."
        },

        {
          question:
            "A developer adds @NotBlank, @NotNull, and @NotEmpty to every String field. Is that a good practice?",

          answer:
            "No. Use the constraint that matches the actual requirement. @NotBlank is generally appropriate for required meaningful text; unnecessary overlapping constraints make the model harder to understand."
        },

        {
          question:
            "A product price must be greater than zero and the product must also exist in the database. Where should these rules go?",

          answer:
            "Use @Positive for the numeric input constraint. Existence and other database-dependent rules belong in the service or domain logic."
        },

        {
          question:
            "Why should a database UNIQUE constraint still exist if the service already checks whether an email exists?",

          answer:
            "Concurrent requests can pass an application-level existence check at the same time. The database constraint provides the final integrity guarantee."
        },

        {
          question:
            "The API returns a full Java stack trace when validation fails. Is this recommended?",

          answer:
            "No. Clients should receive a controlled error response. Detailed stack traces should remain in server-side logs and should not be exposed unnecessarily."
        },

        {
          question:
            "A team has different required fields for create and update operations. Should they always use validation groups?",

          answer:
            "No. Validation groups are one option, but separate create and update DTOs are often simpler and clearer when the API contracts are significantly different."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Use request DTOs for API input validation.",
        "Keep DTOs separate from persistence entities.",
        "Use Jakarta Validation constraints.",
        "Use @Valid for normal DTO validation.",
        "Use @Validated for method validation and validation groups.",
        "Choose constraints according to the actual requirement.",
        "Use meaningful validation messages.",
        "Centralize validation errors with @RestControllerAdvice.",
        "Return a consistent error structure.",
        "Never rely only on frontend validation.",
        "Separate structural validation from business rules.",
        "Use service/domain logic for state-dependent business rules.",
        "Use database constraints for critical persistence integrity.",
        "Validate nested DTOs with @Valid.",
        "Test boundary values.",
        "Do not expose sensitive information in error responses.",
        "Prefer simple DTO designs over unnecessary validation complexity."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "My validation strategy in a Spring Boot REST API is to validate client input at the API boundary using dedicated request DTOs and Jakarta Bean Validation. I use constraints such as @NotBlank, @Email, @Size, @Min, and @Positive according to the actual requirement, and @Valid on request bodies to trigger validation. I centralize validation failures using @RestControllerAdvice and return a consistent field-level error response. I keep state-dependent business rules in the service or domain layer and important data-integrity rules in the database. Frontend validation is useful for user experience, but the backend always validates the request because clients cannot be trusted."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "The main principle is to validate at the correct boundary. Request DTOs are responsible for structural input validation, services or domain objects are responsible for business decisions, and databases are responsible for persistent data integrity.",
        "Do not treat Bean Validation as a replacement for business logic. @Email can verify an email-like format, but it cannot determine whether the email belongs to an existing employee. @Positive can verify that a price is greater than zero, but it cannot determine whether the current user is allowed to change that price.",
        "Use @Valid for ordinary DTO validation and cascading validation. Use @Validated when Spring method validation or validation groups are needed.",
        "A production API should have a consistent validation error contract. Clients should be able to identify the HTTP status, general error message, and field-specific validation failures without receiving internal implementation details.",
        "For important uniqueness and integrity rules, application checks and database constraints should complement each other. An application-level check alone is not sufficient against all concurrency scenarios.",
        "For interviews, remember this architecture: Client -> Request DTO -> @Valid -> Controller -> Service -> Repository -> Database. Each layer has a different responsibility, and good validation design keeps those responsibilities separate."
      ]
    }
  ]
};
