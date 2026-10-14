
export const whatIsValidation = {
  id: 601,

  title: "What is Validation?",

  slug: "what-is-validation",

  topicTitle: "Spring Boot Validation",

  description:
    "Understand why validation is required in Spring Boot applications, where validation happens, and how invalid client input can be detected before business logic is executed.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "validation-introduction",

      title: "What is Validation?",

      paragraphs: [
        "Validation is the process of checking whether input data satisfies a predefined set of rules before the application processes that data.",
        "In a REST API, clients send data to the server through request bodies, path variables, query parameters, and other inputs. The server should not blindly trust this data because the client can send missing, empty, invalid, or incorrectly formatted values.",
        "Spring Boot applications commonly use Jakarta Bean Validation to define validation rules directly on DTO fields. Spring then evaluates those rules when the request reaches the appropriate controller boundary.",
        "Validation is therefore an important boundary between external input and internal application processing."
      ],

      bullets: [
        "Checks whether required fields are present.",
        "Checks whether strings have acceptable lengths.",
        "Checks whether numbers fall within an allowed range.",
        "Checks whether an email address has a valid format.",
        "Checks whether dates satisfy requirements such as past or future.",
        "Prevents invalid data from reaching business logic.",
        "Makes API input rules explicit and easier to maintain."
      ]
    },

    {
      id: "validation-boundary",

      title: "Where Does Validation Happen?",

      paragraphs: [
        "Validation commonly happens at the boundary where external input enters the application. In a REST API, the controller is often the first application layer responsible for accepting and validating request data.",
        "The goal is to detect malformed or invalid input as early as practical, before the service performs the main business operation."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   v
Controller Boundary
   |
   | @Valid
   v
Bean Validation
   |
   +-------------------+
   |                   |
   v                   v
Valid               Invalid
   |                   |
   v                   v
Service            Error Response
   |
   v
Repository
   |
   v
Database`
      }
    },

    {
      id: "why-validation",

      title: "Why Do We Need Validation?",

      paragraphs: [
        "Without validation, invalid data can enter the service layer and eventually reach the database. This can create inconsistent application state and make debugging more difficult.",
        "Validation also gives the client a clear response explaining what is wrong with the submitted data.",
        "Validation reduces unnecessary work because obviously invalid requests can be rejected before expensive business operations or database changes are performed."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    String name,

    String email,

    String department

) {
}`
      },

      bullets: [
        "Protects application boundaries from invalid input.",
        "Improves data quality.",
        "Produces predictable API behavior.",
        "Reduces invalid database operations.",
        "Makes request requirements explicit.",
        "Improves client-side error handling."
      ]
    },

    {
      id: "invalid-request",

      title: "Example of Invalid Input",

      paragraphs: [
        "Suppose an employee creation API requires a name, email, and department. A client might send empty values or an invalid email address."
      ],

      code: {
        language: "json",
        code: `{
  "name": "",
  "email": "abc",
  "department": ""
}`
      }
    },

    {
      id: "invalid-request-result",

      title: "What Should Happen to the Invalid Request?",

      paragraphs: [
        "The API should detect the invalid values and return a client error rather than continuing with employee creation.",
        "A typical REST API uses HTTP 400 Bad Request for invalid request data, although the exact API error contract is a design decision."
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
      }
    },

    {
      id: "validation-flow",

      title: "Validation Flow in Spring Boot",

      paragraphs: [
        "A typical validation flow begins when the client sends an HTTP request. Spring MVC receives the request and converts the JSON body into a DTO. When the DTO parameter is annotated with @Valid, Spring triggers the configured validation rules.",
        "If validation succeeds, the controller method can continue normally. If validation fails, the normal controller method processing is interrupted and Spring raises a validation-related exception that can be converted into an API error response."
      ],

      bullets: [
        "Client sends request.",
        "Spring receives the HTTP request.",
        "HTTP message conversion converts JSON into a DTO.",
        "@Valid triggers validation.",
        "Validation constraints are evaluated.",
        "If valid, controller processing continues.",
        "If invalid, validation fails before normal controller processing continues.",
        "An exception handler can create a consistent error response."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
DispatcherServlet
     |
     v
Controller Method
     |
     v
@RequestBody JSON -> DTO
     |
     v
@Valid
     |
     v
Bean Validation
     |
   +---+---+
   |       |
 Valid   Invalid
   |       |
   v       v
Service  Exception
           |
           v
      Error Response`
      }
    },

    {
      id: "validation-example",

      title: "Simple Validation Example",

      code: {
        language: "java",
        code: `import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email

) {
}

@PostMapping
public ResponseEntity<String> createEmployee(
        @Valid @RequestBody EmployeeCreateRequest request) {

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("Employee created");
}`
      },

      paragraphs: [
        "Here, @NotBlank ensures that the name contains meaningful text and @Email checks the email format. The @Valid annotation tells Spring to validate the request object.",
        "If the request is invalid, the controller method does not proceed with the normal successful creation flow."
      ]
    },

    {
      id: "validation-annotations",

      title: "Common Validation Annotations",

      paragraphs: [
        "Jakarta Bean Validation provides standard constraints for common validation requirements. Different constraints should be selected according to the data type and the rule that needs to be enforced."
      ],

      code: {
        language: "java",
        code: `@NotNull
private Integer age;

@NotBlank
private String name;

@NotEmpty
private List<String> skills;

@Size(min = 3, max = 30)
private String username;

@Email
private String email;

@Min(18)
private Integer age;

@Max(60)
private Integer age;

@Positive
private BigDecimal salary;

@Past
private LocalDate dateOfBirth;

@Future
private LocalDate joiningDate;`
      }
    },

    {
      id: "notnull-notempty-notblank-preview",

      title: "Required Field Validation",

      paragraphs: [
        "@NotNull checks that a value is not null. It does not reject an empty string and it does not reject zero for numeric values.",
        "@NotEmpty checks that supported values such as strings, collections, maps, and arrays are not null and contain at least one element or character.",
        "@NotBlank is intended for character sequences and rejects null, empty, and whitespace-only values."
      ],

      code: {
        language: "java",
        code: `@NotNull
Integer age;

@NotEmpty
List<String> skills;

@NotBlank
String name;`
      }
    },

    {
      id: "size-and-range-preview",

      title: "Size and Numeric Range Validation",

      paragraphs: [
        "@Size is commonly used for strings, collections, maps, and arrays.",
        "@Min and @Max validate numeric minimum and maximum values.",
        "@Positive verifies that a supported numeric value is greater than zero."
      ],

      code: {
        language: "java",
        code: `@Size(min = 3, max = 50)
String username;

@Min(18)
Integer age;

@Max(100)
Integer age;

@Positive
BigDecimal salary;`
      }
    },

    {
      id: "format-validation-preview",

      title: "Format Validation",

      paragraphs: [
        "Format constraints are useful when an input must follow a particular structure. @Email is commonly used for email-like values, while @Pattern can enforce a regular-expression-based format."
      ],

      code: {
        language: "java",
        code: `@Email
String email;

@Pattern(regexp = "^[0-9]{10}$")
String phone;`
      }
    },

    {
      id: "date-validation-preview",

      title: "Date Validation",

      paragraphs: [
        "Jakarta Validation also provides temporal constraints. @Past can require a date or time to be in the past, while @Future can require it to be in the future."
      ],

      code: {
        language: "java",
        code: `@Past
LocalDate dateOfBirth;

@Future
LocalDate appointmentDate;`
      }
    },

    {
      id: "dto-validation",

      title: "Why Validate DTOs?",

      paragraphs: [
        "Request DTOs are commonly a good place for input validation because they represent the external API contract.",
        "Keeping request validation in a DTO prevents the controller from becoming a collection of manual if statements and makes the validation rules reusable across the relevant request-processing path."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email,

    @NotBlank(message = "Department is required")
    String department

) {
}`
      }
    },

    {
      id: "dto-to-service",

      title: "Validation Before the Service Layer",

      paragraphs: [
        "A useful architectural goal is to prevent simple request-data violations from entering the service layer. The controller boundary can reject invalid request data first, allowing the service to concentrate on application and business behavior."
      ],

      code: {
        language: "text",
        code: `Request DTO
    |
    v
Input Validation
    |
    | valid
    v
Service Layer
    |
    v
Business Logic
    |
    v
Repository
    |
    v
Database`
      }
    },

    {
      id: "validation-vs-business",

      title: "Validation vs Business Rules",

      paragraphs: [
        "Validation and business rules are related but are not the same thing.",
        "Bean Validation is well suited for structural and input constraints such as required fields, lengths, ranges, and formats.",
        "Business rules often depend on application state, database data, user permissions, or multiple fields and therefore usually belong in the service or domain layer."
      ],

      code: {
        language: "text",
        code: `Input Validation

"Email must be present."
"Name must not be blank."
"Age must be at least 18."


Business Rule

"An employee cannot transfer
to a department that is closed."

"An order cannot be cancelled
after it has been shipped."`
      },

      bullets: [
        "Use validation constraints for straightforward input rules.",
        "Use service/domain logic for state-dependent business rules.",
        "Do not assume Bean Validation can replace all business validation.",
        "Database constraints should still protect important data invariants."
      ]
    },

    {
      id: "validation-vs-database",

      title: "Validation Does Not Replace Database Constraints",

      paragraphs: [
        "Application validation improves the API boundary, but important database invariants should also be enforced by the database.",
        "For example, checking whether an email is already present in application code does not replace a database UNIQUE constraint because concurrent requests can still create a race condition."
      ],

      code: {
        language: "text",
        code: `API Validation
     |
     v
Application Rules
     |
     v
Database Constraints
     |
     v
Final Data Integrity`
      }
    },

    {
      id: "path-variable-validation",

      title: "Validation of Path Variables",

      paragraphs: [
        "Validation is not limited to JSON request bodies. Path variables and request parameters can also be validated when the controller is configured for method validation."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/{id}")
public EmployeeResponse getEmployee(
        @PathVariable
        @Positive
        Long id) {

    return employeeService.getEmployee(id);
}`
      },

      paragraphs: [
        "The exact exception behavior for method validation can vary with the Spring Boot and Spring Framework version and configuration, so applications should define and test their error-handling contract explicitly."
      ]
    },

    {
      id: "request-param-validation",

      title: "Validation of Request Parameters",

      paragraphs: [
        "Query parameters can also have validation rules. This is useful when an API accepts values such as page numbers, limits, IDs, or filtering parameters."
      ],

      code: {
        language: "java",
        code: `@GetMapping
public List<EmployeeResponse> findEmployees(
        @RequestParam
        @Positive
        Integer pageSize) {

    return employeeService.findEmployees(pageSize);
}`
      }
    },

    {
      id: "nested-validation-preview",

      title: "Nested Object Validation",

      paragraphs: [
        "When a request DTO contains another object, @Valid can be used on the nested object so that its constraints are evaluated as well."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank
    String name,

    @Valid
    AddressRequest address

) {
}

public record AddressRequest(

    @NotBlank
    String city,

    @NotBlank
    String country

) {
}`
      }
    },

    {
      id: "collection-validation-preview",

      title: "Validation of Collections",

      paragraphs: [
        "Collections can be validated at two levels: the collection itself and the elements inside it."
      ],

      code: {
        language: "java",
        code: `public record OrderRequest(

    @NotEmpty
    List<@Valid OrderItemRequest> items

) {
}

public record OrderItemRequest(

    @NotBlank
    String productCode,

    @Positive
    Integer quantity

) {
}`
      }
    },

    {
      id: "validation-error",

      title: "What Happens When Validation Fails?",

      paragraphs: [
        "When a request body is validated and one or more constraints fail, Spring MVC can reject the request before the controller method completes normally.",
        "For a typical @Valid @RequestBody scenario, invalid input commonly results in MethodArgumentNotValidException. A global exception handler can translate the validation errors into a consistent JSON response."
      ],

      code: {
        language: "text",
        code: `Invalid Request
      |
      v
Constraint Violation
      |
      v
MethodArgumentNotValidException
      |
      v
@RestControllerAdvice
      |
      v
HTTP 400 Response`
      }
    },

    {
      id: "global-error-handling-preview",

      title: "Validation Error Handling",

      paragraphs: [
        "A production REST API should normally return a predictable error structure instead of exposing framework-specific exception details directly to clients."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
          .getFieldErrors()
          .forEach(error ->
              errors.put(
                  error.getField(),
                  error.getDefaultMessage()
              )
          );

        return ResponseEntity
                .badRequest()
                .body(errors);
    }
}`
      }
    },

    {
      id: "validation-order",

      title: "Validation Happens Before Normal Business Processing",

      paragraphs: [
        "For a standard @Valid @RequestBody flow, validation is performed as part of argument resolution before the controller method can proceed with its normal body execution.",
        "This is why validation is useful as an early boundary check."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
HTTP Request
  |
  v
JSON Deserialization
  |
  v
Bean Validation
  |
  +---- invalid ----> Error Response
  |
 valid
  |
  v
Controller Method
  |
  v
Service
  |
  v
Repository`
      }
    },

    {
      id: "validation-vs-deserialization",

      title: "Validation vs JSON Deserialization",

      paragraphs: [
        "JSON deserialization and validation are different operations.",
        "Deserialization converts JSON into a Java object. Validation checks whether the resulting object satisfies its declared constraints.",
        "Malformed JSON can therefore fail during HTTP message conversion before Bean Validation is reached."
      ],

      code: {
        language: "text",
        code: `JSON
 |
 v
Deserialization
 |
 +---- malformed JSON ---> Conversion Error
 |
 v
Java DTO
 |
 v
Bean Validation
 |
 +---- invalid values ---> Validation Error
 |
 v
Controller`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Validation Mistakes",

      bullets: [
        "Forgetting @Valid on a @RequestBody parameter.",
        "Using the wrong validation namespace.",
        "Using @Email when the field is required but forgetting @NotBlank or @NotNull.",
        "Using @Size for numeric range validation.",
        "Putting every business rule into DTO annotations.",
        "Assuming client-side validation is sufficient.",
        "Assuming application validation replaces database constraints.",
        "Returning inconsistent validation error structures.",
        "Ignoring nested-object validation when @Valid is required.",
        "Not testing invalid input cases."
      ]
    },

    {
      id: "client-vs-server-validation",

      title: "Client-Side vs Server-Side Validation",

      paragraphs: [
        "Frontend validation is useful for user experience because it can immediately show errors to users. However, server-side validation is mandatory for application security and correctness because clients cannot be trusted.",
        "A malicious or modified client can bypass frontend validation and send requests directly to the backend."
      ],

      code: {
        language: "text",
        code: `React / Browser
     |
     | Client-side validation
     v
User Experience
     |
     v
Spring Boot API
     |
     | Server-side validation
     v
Trusted application boundary`
      },

      bullets: [
        "Use frontend validation for better user experience.",
        "Always validate again on the server.",
        "Never trust a validation result generated only by the client."
      ]
    },

    {
      id: "testing-validation",

      title: "Testing Validation",

      paragraphs: [
        "Validation should be tested using both valid and invalid inputs. The important behavior is not only that annotations exist, but that invalid requests are actually rejected at the API boundary."
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
        "Test empty strings.",
        "Test whitespace-only values where relevant.",
        "Test invalid formats.",
        "Test values outside numeric ranges.",
        "Test valid requests.",
        "Test the structure of the validation error response."
      ]
    },

    {
      id: "complete-example",

      title: "Complete Validation Example",

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50)
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email,

    @NotBlank(message = "Department is required")
    String department

) {
}

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public ResponseEntity<String> createEmployee(
            @Valid @RequestBody EmployeeCreateRequest request) {

        // Normally call service layer here.

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Employee created");
    }
}`
      },

      paragraphs: [
        "The DTO defines the input rules and the controller uses @Valid to trigger them. In a real application, the controller would normally delegate the valid request to a service layer rather than containing the business logic itself."
      ]
    },

    {
      id: "complete-architecture",

      title: "Complete Validation Architecture",

      code: {
        language: "text",
        code: `React / Mobile / API Client
            |
            | HTTP Request
            v
      Spring MVC
            |
            v
      Controller
            |
            | @Valid
            v
   Jakarta Bean Validation
            |
       +----+----+
       |         |
     Valid     Invalid
       |         |
       v         v
    Service   Exception Handler
       |         |
       v         v
  Repository  HTTP 400
       |
       v
   Database`
      }
    },

    {
      id: "best-practices",

      title: "Validation Best Practices",

      bullets: [
        "Validate external input at the application boundary.",
        "Use request DTOs for API input validation.",
        "Use standard Jakarta Validation constraints whenever they fit the rule.",
        "Use @Valid for cascading object validation.",
        "Use @Validated when Spring method validation or validation groups are required.",
        "Keep complex business rules in the service or domain layer.",
        "Use database constraints for important persistence-level invariants.",
        "Return consistent validation error responses.",
        "Never rely only on frontend validation.",
        "Write tests for both valid and invalid requests.",
        "Do not expose unnecessary internal exception details to API clients."
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A developer added @NotBlank to a DTO, but the API still accepts an empty value. What would you check?",

          answer:
            "First check whether validation support is available, then verify that the DTO uses jakarta.validation constraints and that the controller parameter is annotated with @Valid. Also verify that the endpoint is actually receiving the DTO being validated."
        },

        {
          question:
            "Why should validation happen before the service layer?",

          answer:
            "It prevents basic invalid request data from entering business logic and keeps the service layer focused on valid application operations and business rules."
        },

        {
          question:
            "Can frontend validation replace Spring Boot server-side validation?",

          answer:
            "No. Frontend validation improves user experience, but clients cannot be trusted. The backend must validate incoming data independently."
        },

        {
          question:
            "Is checking @Email enough to make an email field mandatory?",

          answer:
            "No. @Email checks the email-like format but does not by itself express that the value must be present. For a required email, it is common to combine @NotBlank with @Email for a String."
        },

        {
          question:
            "Does Bean Validation replace database constraints?",

          answer:
            "No. Bean Validation protects the application boundary, while database constraints protect persisted data. Important database invariants should still be enforced by the database."
        },

        {
          question:
            "What happens if the JSON request itself is malformed?",

          answer:
            "Malformed JSON can fail during HTTP message conversion before Bean Validation is reached because there may not be a valid DTO object to validate."
        },

        {
          question:
            "Where should a rule such as 'an order cannot be cancelled after shipment' normally be implemented?",

          answer:
            "That is a state-dependent business rule and normally belongs in the service or domain layer rather than being treated as a simple DTO Bean Validation constraint."
        }
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is validation in Spring Boot?",

          answer:
            "Validation is the process of checking incoming data against predefined rules before allowing the application to process it. Spring Boot commonly uses Jakarta Bean Validation annotations for this purpose."
        },

        {
          question: "Why should validation happen before business logic?",

          answer:
            "It prevents invalid data from entering the service layer and keeps business logic focused on valid application operations."
        },

        {
          question: "What does @Valid do?",

          answer:
            "@Valid triggers validation of the object according to its Bean Validation constraints."
        },

        {
          question: "What is Bean Validation?",

          answer:
            "Bean Validation is a standard Java validation mechanism in which constraints such as @NotNull, @NotBlank, @Size, and @Email can be declared on object fields or properties and evaluated by a validation provider."
        },

        {
          question: "Where should request validation normally be defined?",

          answer:
            "Request-specific validation is commonly defined on DTOs because DTOs represent the API input contract."
        },

        {
          question: "What is the difference between validation and business logic?",

          answer:
            "Validation usually checks input structure and simple constraints, while business logic handles application-specific rules, state transitions, authorization decisions, and other domain behavior."
        },

        {
          question: "Does @Valid validate nested objects?",

          answer:
            "Yes. When @Valid is placed on a nested object or collection element, it enables cascading validation of that object."
        },

        {
          question: "What exception commonly occurs for an invalid @RequestBody with @Valid?",

          answer:
            "For the standard Spring MVC request-body validation scenario, MethodArgumentNotValidException is commonly raised."
        },

        {
          question: "What HTTP status is commonly returned for invalid request data?",

          answer:
            "HTTP 400 Bad Request is commonly used when the client sends invalid request data."
        },

        {
          question: "Can validation guarantee database integrity?",

          answer:
            "No. Application validation and database constraints serve different purposes. Important persistence invariants should also be enforced by the database."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Validation checks incoming data against predefined rules.",
        "Spring Boot commonly uses Jakarta Bean Validation.",
        "Request DTOs are a common place for input constraints.",
        "@Valid commonly triggers validation of a request body.",
        "Validation normally happens before the normal service operation.",
        "Invalid request data commonly results in HTTP 400.",
        "Bean Validation and JSON deserialization are different stages.",
        "@NotBlank is useful for required String-like values.",
        "@Email checks email-like formatting but does not by itself require presence.",
        "@Size checks supported string, collection, map, and array sizes.",
        "@Min and @Max are used for numeric bounds.",
        "@Positive checks that a supported number is greater than zero.",
        "@Past and @Future validate temporal relationships.",
        "Business rules should not all be forced into DTO annotations.",
        "Server-side validation is required even when frontend validation exists.",
        "Database constraints still matter for persistence integrity."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "Validation in Spring Boot is the process of checking incoming data against predefined rules before the application processes it. Spring Boot commonly uses Jakarta Bean Validation annotations such as @NotBlank, @Email, @Size, and @Positive on request DTOs. When a controller parameter uses @Valid, Spring triggers validation before the normal controller processing continues. If the input is invalid, the request can be rejected and a consistent HTTP 400 error response can be returned. Validation protects the application boundary, while business rules belong in the service or domain layer and important database invariants should also be enforced by the database."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      paragraphs: [
        "Think of validation as the first quality check performed on external input. A client can send anything, so the backend must decide whether the received data satisfies the API's input contract.",
        "The basic flow to remember is: Client -> Controller boundary -> @Valid -> Bean Validation -> Valid request continues / Invalid request returns an error.",
        "For REST APIs, request DTOs are usually a clean place for simple input constraints. This keeps validation rules close to the API contract and prevents controllers from becoming filled with repetitive manual checks.",
        "Do not confuse validation with business logic. 'Name must not be blank' is a simple input constraint. 'An employee cannot transfer to a closed department' depends on application state and is a business rule.",
        "Also remember that validation is not a replacement for database constraints. Application validation improves the request boundary, while database constraints provide persistence-level protection.",
        "For interviews, the simplest answer is: 'Validation checks whether incoming data satisfies predefined rules before business processing. In Spring Boot, Jakarta Bean Validation annotations are commonly placed on request DTOs, and @Valid triggers validation at the controller boundary.'"
      ]
    }
  ]
};
