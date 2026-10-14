
export const validatingRequestDtos = {
  id: 608,

  title: "Validating Request DTOs",

  slug: "validating-request-dtos",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn how to design request DTOs with validation constraints and connect them to Spring Boot REST controllers.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "dto-validation",

      title: "Why Validate Request DTOs?",

      paragraphs: [
        "Request DTOs represent data received from clients. They are an ideal place to define input validation rules because they separate external request data from persistent entities.",
        "A request DTO can express requirements such as mandatory fields, valid email addresses, acceptable string lengths, numeric limits, date rules, and collection-size restrictions.",
        "DTO validation creates a clear boundary between external client input and the application's internal business logic."
      ],

      code: {
        language: "text",
        code: `Client
  |
  | JSON
  v
Request DTO
  |
  | Bean Validation
  v
Validated Input
  |
  v
Service Layer
  |
  v
Entity
  |
  v
Database`
      }
    },

    {
      id: "dto-vs-entity",

      title: "Why Use a DTO Instead of an Entity?",

      paragraphs: [
        "A JPA entity represents persistent data and is designed around database mapping. A request DTO represents an API input contract and is designed around what the client is allowed or required to send.",
        "Using a separate request DTO prevents the external API contract from becoming tightly coupled to the database model.",
        "It also allows request-specific validation rules without putting API concerns directly into the persistence model."
      ],

      code: {
        language: "text",
        code: `REST API

EmployeeCreateRequest
        |
        | API validation
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
        "DTO represents the API contract.",
        "Entity represents persistent data.",
        "DTO validation protects the API boundary.",
        "Entity mapping protects persistence concerns.",
        "DTOs reduce accidental exposure of entity fields."
      ]
    },

    {
      id: "employee-dto",

      title: "EmployeeCreateRequest",

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    @Size(
        min = 2,
        max = 100,
        message = "Name must contain 2 to 100 characters"
    )
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email,

    @NotBlank(message = "Department is required")
    String department

) {
}`
      },

      paragraphs: [
        "This DTO defines the contract for creating an employee. The name must contain meaningful text within the specified length, email must be present and have an acceptable email format, and department must be provided."
      ]
    },

    {
      id: "constraint-responsibility",

      title: "Understanding the DTO Constraints",

      code: {
        language: "text",
        code: `name
 |
 +-- @NotBlank
 |      |
 |      +-- required meaningful text
 |
 +-- @Size
        |
        +-- 2 to 100 characters


email
 |
 +-- @NotBlank
 |      |
 |      +-- email is required
 |
 +-- @Email
        |
        +-- email-like format


department
 |
 +-- @NotBlank
        |
        +-- required meaningful text`
      }
    },

    {
      id: "controller",

      title: "Validate the DTO in the Controller",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

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
        "The @RequestBody annotation converts JSON into EmployeeCreateRequest. The @Valid annotation then triggers the validation constraints defined on that DTO.",
        "If validation fails, normal controller processing does not continue through the successful path. Spring MVC commonly raises MethodArgumentNotValidException for request-body validation failures."
      ]
    },

    {
      id: "request-body-flow",

      title: "How @RequestBody and @Valid Work Together",

      code: {
        language: "text",
        code: `HTTP JSON
   |
   v
@RequestBody
   |
   v
EmployeeCreateRequest object
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
Valid                 Invalid
   |                      |
   v                      v
Controller             Exception
   |                      |
   v                      v
Service              Global Handler
                          |
                          v
                       HTTP 400`
      }
    },

    {
      id: "request",

      title: "Example Request",

      code: {
        language: "json",
        code: `{
  "name": "John",
  "email": "john@example.com",
  "department": "Engineering"
}`
      },

      paragraphs: [
        "This request satisfies the constraints defined on EmployeeCreateRequest."
      ]
    },

    {
      id: "invalid-request",

      title: "Invalid Request",

      code: {
        language: "json",
        code: `{
  "name": "",
  "email": "abc",
  "department": ""
}`
      },

      paragraphs: [
        "This request violates multiple validation rules. The name and department are blank, and the email does not satisfy the email constraint.",
        "The API can return these failures as a structured HTTP 400 validation response."
      ]
    },

    {
      id: "validation-response",

      title: "Validation Error Response",

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

      paragraphs: [
        "A consistent validation response makes it easier for frontend clients and other API consumers to identify and display invalid fields."
      ]
    },

    {
      id: "flow",

      title: "Complete Validation Flow",

      bullets: [
        "Client sends JSON request.",
        "Spring converts JSON into EmployeeCreateRequest.",
        "@Valid triggers validation.",
        "Validation provider checks each constraint.",
        "If all constraints pass, the controller continues.",
        "If constraints fail, Spring raises a validation exception.",
        "Global exception handling can convert the failure into a consistent JSON response.",
        "Only validated input should continue into normal application processing."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
JSON
  |
  v
@RequestBody
  |
  v
Request DTO
  |
  v
@Valid
  |
  v
Bean Validation
  |
  +-------- Valid --------> Controller -> Service
  |
  +------ Invalid --------> Exception -> 400`
      }
    },

    {
      id: "service",

      title: "Passing the Validated DTO to the Service",

      paragraphs: [
        "After request validation succeeds, the controller can pass the DTO to the service layer.",
        "The service should focus on business operations rather than repeating simple input checks already expressed by the DTO constraints."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    public EmployeeResponse create(
            EmployeeCreateRequest request) {

        Employee employee = new Employee();

        employee.setName(request.name());
        employee.setEmail(request.email());
        employee.setDepartment(request.department());

        Employee saved =
                employeeRepository.save(employee);

        return EmployeeResponse.from(saved);
    }
}`
      }
    },

    {
      id: "dto-to-entity",

      title: "Mapping Request DTO to Entity",

      paragraphs: [
        "A common architecture is to validate the request DTO first and then map it to a JPA entity inside the service layer or a dedicated mapper."
      ],

      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName(request.name());
employee.setEmail(request.email());
employee.setDepartment(request.department());

employeeRepository.save(employee);`
      },

      bullets: [
        "Request DTO receives external input.",
        "Validation happens at the API boundary.",
        "Service performs business processing.",
        "Entity represents persistent data.",
        "Repository handles database interaction."
      ]
    },

    {
      id: "nested-dto",

      title: "Validating Nested Request DTOs",

      paragraphs: [
        "Request DTOs can contain other DTOs. When the nested object also contains validation constraints, use @Valid to cascade validation into it."
      ],

      code: {
        language: "java",
        code: `public record AddressRequest(

    @NotBlank(message = "City is required")
    String city,

    @NotBlank(message = "Country is required")
    String country

) {
}


public record EmployeeCreateRequest(

    @NotBlank
    String name,

    @Valid
    @NotNull(message = "Address is required")
    AddressRequest address

) {
}`
      },

      bullets: [
        "@NotNull checks that address exists.",
        "@Valid cascades validation into AddressRequest.",
        "AddressRequest constraints are evaluated after cascading."
      ]
    },

    {
      id: "collection-dto",

      title: "Validating Collections in Request DTOs",

      paragraphs: [
        "A DTO can contain a collection of nested objects. The collection itself and each element can have separate validation rules."
      ],

      code: {
        language: "java",
        code: `public record SkillRequest(

    @NotBlank(message = "Skill name is required")
    String name

) {
}


public record EmployeeCreateRequest(

    @NotBlank
    String name,

    @NotEmpty(message = "Skills are required")
    List<@Valid SkillRequest> skills

) {
}`
      },

      paragraphs: [
        "@NotEmpty validates that the skills collection contains elements, while @Valid validates each SkillRequest element."
      ]
    },

    {
      id: "create-vs-update",

      title: "Create DTO vs Update DTO",

      paragraphs: [
        "Create and update operations often have different validation requirements. A separate DTO for each operation can make the API contract clearer.",
        "For example, an ID may not be accepted during creation but may be part of the URL during an update."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank
    String name,

    @Email
    @NotBlank
    String email

) {
}


public record EmployeeUpdateRequest(

    @NotBlank
    String name,

    @Email
    @NotBlank
    String email,

    @NotBlank
    String department

) {
}`
      },

      bullets: [
        "Create and update requests can have different fields.",
        "Validation rules can differ between operations.",
        "Separate DTOs often make the API contract easier to understand."
      ]
    },

    {
      id: "partial-update",

      title: "Validation and Partial Updates",

      paragraphs: [
        "PATCH-style partial updates require special consideration because omitted fields and explicitly supplied values can have different meanings.",
        "A DTO designed for a full create operation should not automatically be reused for every partial-update operation."
      ],

      code: {
        language: "java",
        code: `// Full creation

public record EmployeeCreateRequest(

    @NotBlank
    String name,

    @NotBlank
    @Email
    String email

) {
}


// Partial update

public record EmployeePatchRequest(

    String name,

    @Email
    String email

) {
}`
      },

      paragraphs: [
        "For partial updates, required-value constraints may need to be different because omitted fields can be intentionally left unchanged."
      ]
    },

    {
      id: "optional-fields",

      title: "Optional Request Fields",

      paragraphs: [
        "Not every request field should be mandatory. Validation should reflect the API contract rather than blindly adding @NotBlank or @NotNull to every field.",
        "Optional fields can still have constraints when they are supplied."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank
    String name,

    @Email(message = "Invalid email")
    String alternateEmail,

    @Size(max = 500)
    String description

) {
}`
      },

      bullets: [
        "name is required.",
        "alternateEmail can be omitted but must be valid when supplied.",
        "description can be optional while still having a maximum size."
      ]
    },

    {
      id: "validation-groups",

      title: "Validation Groups in Request DTOs",

      paragraphs: [
        "Validation groups can be used when the same DTO has different constraints for different operations.",
        "However, if create and update requests are substantially different, separate DTOs are often easier to understand and maintain."
      ],

      code: {
        language: "java",
        code: `public interface CreateGroup {
}


public interface UpdateGroup {
}


public record EmployeeRequest(

    @NotBlank(groups = CreateGroup.class)
    String name,

    @NotBlank(groups = UpdateGroup.class)
    String department

) {
}`
      }
    },

    {
      id: "controller-groups",

      title: "Selecting a Validation Group",

      paragraphs: [
        "@Validated can be used in Spring-specific validation scenarios where a particular validation group needs to be selected."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<?> create(
        @Validated(CreateGroup.class)
        @RequestBody EmployeeRequest request) {

    return ResponseEntity.ok(
        employeeService.create(request)
    );
}`
      },

      paragraphs: [
        "Validation groups should be introduced only when they solve a real requirement. Separate request DTOs are frequently simpler for public REST APIs."
      ]
    },

    {
      id: "validation-provider",

      title: "What Performs the Validation?",

      paragraphs: [
        "The Jakarta Validation API defines the validation annotations and contracts. A validation provider performs the actual constraint evaluation.",
        "Spring Boot applications commonly use Hibernate Validator as the Bean Validation provider through the validation starter."
      ],

      code: {
        language: "text",
        code: `Request DTO
    |
    v
Jakarta Validation API
    |
    v
Validation Provider
    |
    v
Constraint Evaluation
    |
    v
Pass / Fail`
      }
    },

    {
      id: "validation-starter",

      title: "Validation Dependency",

      paragraphs: [
        "Spring Boot applications commonly include spring-boot-starter-validation to integrate Bean Validation with the application."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`
      },

      bullets: [
        "Provides the validation integration needed by the application.",
        "Modern Spring Boot applications use jakarta.validation imports.",
        "A validation provider such as Hibernate Validator performs the actual validation."
      ]
    },

    {
      id: "global-handler",

      title: "Handling DTO Validation Errors Globally",

      paragraphs: [
        "A global exception handler can convert request DTO validation failures into a consistent REST response."
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

        Map<String, String> errors =
            exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                    FieldError::getField,
                    error -> error.getDefaultMessage(),
                    (first, second) -> first
                ));

        return ResponseEntity
            .badRequest()
            .body(
                new ValidationErrorResponse(
                    400,
                    "Validation failed",
                    errors
                )
            );
    }
}`
      }
    },

    {
      id: "response-dto",

      title: "Validation Error Response DTO",

      code: {
        language: "java",
        code: `public record ValidationErrorResponse(

    int status,

    String message,

    Map<String, String> errors

) {
}`
      },

      paragraphs: [
        "A dedicated error DTO keeps the validation response contract explicit and makes it easier for frontend applications to process errors consistently."
      ]
    },

    {
      id: "validation-vs-business",

      title: "DTO Validation vs Business Validation",

      paragraphs: [
        "Request DTO validation should handle straightforward input constraints such as required values, formats, sizes, and numeric ranges.",
        "Business rules that require application state or domain knowledge generally belong in the service or domain layer."
      ],

      code: {
        language: "text",
        code: `DTO Validation

email must be valid
name must not be blank
age must be >= 18
        |
        v
Bean Validation


Business Validation

email must be unique
employee cannot be deleted
salary change requires permission
        |
        v
Service / Domain Logic`
      },

      bullets: [
        "DTO validation handles structural input rules.",
        "Business logic handles application-specific rules.",
        "Database constraints provide an additional data-integrity boundary."
      ]
    },

    {
      id: "entity-validation",

      title: "Should Entities Also Have Validation?",

      paragraphs: [
        "Entities can also contain Bean Validation constraints when appropriate, especially when the constraints represent domain or persistence invariants.",
        "However, request validation and persistence validation solve different concerns, so API DTOs should not be abandoned simply because entities can also be validated."
      ],

      bullets: [
        "DTO validation protects the API boundary.",
        "Entity validation can protect domain-level invariants.",
        "Do not expose entities simply to reuse validation annotations.",
        "Use the model that best represents each layer's responsibility."
      ]
    },

    {
      id: "testing",

      title: "Testing Request DTO Validation",

      paragraphs: [
        "Controller tests should verify that invalid request DTOs are rejected and valid requests are accepted.",
        "Boundary cases should be included for constraints such as @Size, @Min, @Max, and @Positive."
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
.andExpect(status().isBadRequest());`
      },

      bullets: [
        "Test missing required fields.",
        "Test blank strings.",
        "Test invalid email formats.",
        "Test minimum and maximum boundaries.",
        "Test valid requests.",
        "Test nested DTO validation.",
        "Test collection validation."
      ]
    },

    {
      id: "complete-example",

      title: "Complete Request DTO Example",

      code: {
        language: "java",
        code: `import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record EmployeeCreateRequest(

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
    String department,

    @NotNull(
        message = "Age is required"
    )
    @Min(
        value = 18,
        message = "Age must be at least 18"
    )
    Integer age,

    @NotEmpty(
        message = "At least one skill is required"
    )
    List<@NotBlank String> skills

) {
}`
      },

      paragraphs: [
        "This DTO demonstrates required text, string length, email format, numeric minimum, collection size, and collection-element validation."
      ]
    },

    {
      id: "complete-controller",

      title: "Complete Controller Example",

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
        "The controller remains focused on HTTP concerns. Validation rules are declared on the DTO and business processing is delegated to the service."
      ]
    },

    {
      id: "complete-architecture",

      title: "Complete Architecture",

      code: {
        language: "text",
        code: `React / Postman / Client
          |
          | JSON
          v
+------------------------+
| EmployeeController     |
|                        |
| @RequestBody           |
| @Valid                 |
+------------------------+
          |
          v
+------------------------+
| Bean Validation        |
|                        |
| @NotBlank              |
| @Email                 |
| @Size                  |
| @Min                   |
+------------------------+
          |
      Valid?
       /   \
     No     Yes
     |       |
     v       v
  400     Service
 Response    |
             v
          Entity
             |
             v
        Repository
             |
             v
          Database`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Using JPA entities directly as request models.",
        "Forgetting @Valid on @RequestBody.",
        "Adding validation annotations but forgetting the validation dependency.",
        "Using @NotNull for a String when @NotBlank is required.",
        "Assuming @Size makes a field mandatory.",
        "Forgetting @Valid on nested DTOs.",
        "Assuming @NotEmpty validates collection elements.",
        "Putting complex business rules into simple DTO constraints.",
        "Using the same DTO for create and partial-update operations without considering different validation requirements.",
        "Returning inconsistent validation error structures.",
        "Validating only on the frontend.",
        "Exposing sensitive entity fields through request or response models.",
        "Assuming DTO validation replaces database constraints."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices",

      bullets: [
        "Use request DTOs as the API input boundary.",
        "Put straightforward input constraints on DTO fields.",
        "Use @Valid to trigger request DTO validation.",
        "Use @Valid for nested DTO validation.",
        "Use @NotNull together with @Valid when a nested DTO is mandatory.",
        "Use separate create and update DTOs when their contracts differ significantly.",
        "Use validation groups only when they provide a real benefit.",
        "Keep complex business rules in the service or domain layer.",
        "Use a global exception handler for consistent validation responses.",
        "Do not expose JPA entities directly as API request models.",
        "Test both valid and invalid requests.",
        "Keep important database constraints at the database level.",
        "Use clear validation messages.",
        "Keep API contracts stable and explicit."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Where should request validation rules usually be defined?",

          answer:
            "They are commonly defined on request DTOs using Jakarta Validation constraints."
        },

        {
          question: "How do you trigger validation for a @RequestBody DTO?",

          answer:
            "Place @Valid on the request-body parameter."
        },

        {
          question: "Why should we avoid exposing entities directly as request models?",

          answer:
            "DTOs provide a separate API contract and allow request validation rules to be defined independently from persistence concerns."
        },

        {
          question: "Why are request DTOs useful in Spring Boot?",

          answer:
            "They separate external API input from persistence entities and provide a clear place for request-specific validation rules."
        },

        {
          question: "What happens when @Valid validation fails for a request body?",

          answer:
            "Spring MVC commonly raises MethodArgumentNotValidException, which can be handled globally using @RestControllerAdvice."
        },

        {
          question: "Why use @NotBlank and @Size together?",

          answer:
            "@NotBlank ensures the text contains meaningful content, while @Size enforces minimum and maximum length."
        },

        {
          question: "How do you validate a nested DTO?",

          answer:
            "Use @Valid on the nested DTO field so Bean Validation cascades into the nested object's constraints."
        },

        {
          question: "Does @NotEmpty validate elements inside a collection?",

          answer:
            "No. @NotEmpty validates the collection itself. Use element constraints or @Valid to validate individual elements."
        },

        {
          question: "Should create and update requests use the same DTO?",

          answer:
            "Not necessarily. When their fields or validation rules differ significantly, separate DTOs usually provide a clearer API contract."
        },

        {
          question: "Where should business validation be performed?",

          answer:
            "Simple input constraints belong naturally on DTOs, while rules involving application state, permissions, or domain behavior generally belong in the service or domain layer."
        },

        {
          question: "Does DTO validation replace database constraints?",

          answer:
            "No. DTO validation improves API input handling, while database constraints protect persisted data integrity. They complement each other."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "The controller receives an invalid EmployeeCreateRequest, but the service is still called. What would you investigate?",

          answer:
            "First check that @Valid is present on the @RequestBody parameter and that validation is configured correctly. Also verify that the endpoint is actually using the expected DTO."
        },

        {
          question:
            "The EmployeeRequest contains an AddressRequest with @NotBlank on city, but city validation is not happening. What is missing?",

          answer:
            "The parent DTO should use @Valid on the AddressRequest field so validation cascades into the nested object."
        },

        {
          question:
            "An API accepts an empty skills list even though at least one skill is required. What should you check?",

          answer:
            "Check that the collection has an appropriate constraint such as @NotEmpty or @Size(min = 1), and that @Valid is triggering DTO validation."
        },

        {
          question:
            "Why might separate EmployeeCreateRequest and EmployeeUpdateRequest DTOs be preferable?",

          answer:
            "Create and update operations can have different fields and required-value rules. Separate DTOs make those API contracts explicit and avoid complicated conditional validation."
        },

        {
          question:
            "The frontend prevents an invalid email, but a client sends an invalid email using Postman. What should happen?",

          answer:
            "The backend must independently validate the email using the request DTO. Frontend validation cannot be trusted as the API validation boundary."
        },

        {
          question:
            "A request DTO contains a password field. Should the API return that value in validation errors?",

          answer:
            "No. Sensitive values such as passwords, tokens, and credentials should not be exposed in validation or error responses."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Request DTOs represent client input.",
        "DTOs provide a separate API contract from JPA entities.",
        "@Valid triggers validation for a request DTO.",
        "@RequestBody converts JSON into the DTO.",
        "Validation occurs before normal successful controller processing.",
        "MethodArgumentNotValidException commonly represents request-body validation failures.",
        "@Valid enables cascading validation into nested DTOs.",
        "@NotNull checks that a nested DTO exists.",
        "@NotEmpty checks that a collection contains elements.",
        "Collection elements require their own constraints or @Valid.",
        "Create and update DTOs can have different validation requirements.",
        "Validation groups are an option for conditional constraint sets.",
        "Global exception handling provides consistent validation responses.",
        "DTO validation does not replace business validation.",
        "DTO validation does not replace database constraints."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "Request DTOs are used to represent client input separately from JPA entities. They are a good place for API-level Bean Validation constraints such as @NotBlank, @Email, @Size, @Min, and @Positive. In the controller, @RequestBody converts JSON into the DTO and @Valid triggers validation. If validation fails, Spring MVC commonly raises MethodArgumentNotValidException, which can be handled globally using @RestControllerAdvice. After validation succeeds, the controller passes the DTO to the service layer, where business rules are applied and the DTO can be mapped to an entity. This separation keeps API validation, business logic, and persistence responsibilities clear."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "The most important request-validation flow is: Client JSON -> @RequestBody -> Request DTO -> @Valid -> Bean Validation -> Controller -> Service -> Entity -> Repository -> Database.",
        "Remember why DTOs are preferred over exposing entities directly: a DTO represents the API contract, while an entity represents persistence. They can therefore have different fields, validation rules, and responsibilities.",
        "For nested DTOs, remember the difference between @NotNull and @Valid. @NotNull ensures that the nested object exists, while @Valid tells Bean Validation to inspect the nested object's constraints.",
        "For collections, @NotEmpty validates the collection itself, but it does not validate individual elements. Use element constraints or @Valid for nested objects.",
        "For create and update operations, separate DTOs are often easier to maintain when their validation requirements differ. Validation groups are another option, but they should not be introduced unnecessarily.",
        "For interviews, explain that DTO validation handles straightforward input constraints, while service or domain logic handles rules that depend on application state, permissions, or business behavior."
      ]
    }
  ]
};
