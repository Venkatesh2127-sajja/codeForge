
export const beanValidation = {
  id: 602,

  title: "Bean Validation",

  slug: "bean-validation",

  topicTitle: "Spring Boot Validation",

  description:
    "Understand Jakarta Bean Validation, validation constraints, Hibernate Validator, and how Spring Boot integrates Bean Validation into REST applications.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "bean-validation-intro",

      title: "What is Bean Validation?",

      paragraphs: [
        "Bean Validation is a standard mechanism for declaring validation rules on Java objects. Modern Spring Boot applications use the Jakarta Validation API for these rules.",
        "Instead of writing manual if-else statements for every input field, validation constraints can be placed directly on DTO fields, record components, method parameters, or other supported elements.",
        "Spring Boot integrates the Jakarta Validation API with a validation provider such as Hibernate Validator.",
        "Bean Validation is especially useful for REST APIs because incoming JSON can be validated before the application performs its business operation."
      ],

      code: {
        language: "text",
        code: `Client Request
      |
      v
Controller
      |
      v
DTO
      |
      v
Bean Validation
      |
      +---- Validation Failed
      |          |
      |          v
      |       400 Response
      |
      +---- Validation Passed
                 |
                 v
             Service
                 |
                 v
             Database`
      },

      bullets: [
        "Bean Validation defines reusable validation constraints.",
        "Validation rules can be declared close to the data they validate.",
        "Spring Boot integrates validation into the web layer.",
        "DTO validation prevents invalid input from reaching business logic.",
        "Validation is different from business authorization and authentication."
      ]
    },

    {
      id: "validation-api",

      title: "Jakarta Validation API",

      paragraphs: [
        "Validation annotations are provided through the Jakarta Validation API.",
        "Common annotations include @NotNull, @NotBlank, @NotEmpty, @Size, @Min, @Max, @Positive, @PositiveOrZero, @Negative, @Email, @Pattern, @Past, @PastOrPresent, @Future, and @FutureOrPresent.",
        "The exact constraint should be selected according to the data type and validation requirement."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(

    @NotBlank
    @Size(min = 2, max = 50)
    String name,

    @NotBlank
    @Email
    String email

) {
}`
      },

      bullets: [
        "Jakarta Validation provides the standard API.",
        "Constraints describe validation rules.",
        "Constraints can be combined.",
        "The validation provider evaluates the constraints."
      ]
    },

    {
      id: "provider",

      title: "Validation Provider",

      paragraphs: [
        "The Jakarta Validation API defines the validation contracts and annotations. A validation provider performs the actual validation work.",
        "Hibernate Validator is a commonly used Bean Validation implementation and is integrated into Spring Boot through the validation starter.",
        "The API and provider are separate concepts: the API defines how validation is described, while the provider performs validation."
      ],

      bullets: [
        "Jakarta Validation provides the standard API.",
        "Validation annotations describe constraints.",
        "Hibernate Validator performs validation.",
        "Spring Boot integrates validation into the application.",
        "The provider evaluates the constraints at runtime."
      ]
    },

    {
      id: "dependency",

      title: "Validation Dependency in Spring Boot",

      paragraphs: [
        "A Spring Boot application normally adds the validation starter when it wants to use Bean Validation with Spring Boot's web and application infrastructure.",
        "The starter brings the required validation integration and a compatible validation provider."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`
      },

      bullets: [
        "Add the validation starter when Bean Validation is required.",
        "Use jakarta.validation imports in modern Spring Boot applications.",
        "Do not mix old javax.validation imports with modern Jakarta-based applications."
      ]
    },

    {
      id: "constraint",

      title: "What is a Constraint?",

      paragraphs: [
        "A constraint is a rule that a value must satisfy.",
        "For example, @NotBlank defines a rule that a string must contain at least one non-whitespace character.",
        "Multiple constraints can be applied to the same field."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank
    @Size(min = 2, max = 100)
    String name,

    @NotBlank
    @Email
    String email

) {
}`
      },

      bullets: [
        "One field can have multiple constraints.",
        "Constraints should describe input requirements clearly.",
        "Validation annotations should not replace complex business rules.",
        "Choose constraints according to the field's data type."
      ]
    },

    {
      id: "common-constraints",

      title: "Important Bean Validation Constraints",

      paragraphs: [
        "Different constraints solve different validation problems. Choosing the correct annotation is important because annotations such as @NotNull, @NotEmpty, and @NotBlank have different meanings."
      ],

      code: {
        language: "java",
        code: `public record ProductRequest(

    @NotNull
    Long categoryId,

    @NotBlank
    String name,

    @NotEmpty
    List<String> tags,

    @Size(min = 3, max = 100)
    String description,

    @Min(1)
    @Max(100000)
    Integer quantity,

    @Positive
    BigDecimal price,

    @Email
    String contactEmail

) {
}`
      },

      bullets: [
        "@NotNull: value must not be null.",
        "@NotEmpty: collection, map, array, or supported string value must not be null or empty.",
        "@NotBlank: string must not be null and must contain a non-whitespace character.",
        "@Size: validates size or length within a specified range.",
        "@Min: numeric value must be greater than or equal to the specified minimum.",
        "@Max: numeric value must be less than or equal to the specified maximum.",
        "@Positive: numeric value must be greater than zero.",
        "@PositiveOrZero: numeric value must be zero or greater.",
        "@Email: value should conform to an email-address format.",
        "@Pattern: value must match a regular expression.",
        "@Past: date or time value must represent a time in the past.",
        "@Future: date or time value must represent a time in the future."
      ]
    },

    {
      id: "not-null-empty-blank",

      title: "@NotNull vs @NotEmpty vs @NotBlank",

      paragraphs: [
        "These three annotations are frequently asked in interviews because they solve similar-looking but different problems."
      ],

      code: {
        language: "text",
        code: `@NotNull
"hello"  -> valid
""       -> valid
"   "    -> valid
null     -> invalid


@NotEmpty
"hello"  -> valid
""       -> invalid
"   "    -> valid
null     -> invalid


@NotBlank
"hello"  -> valid
""       -> invalid
"   "    -> invalid
null     -> invalid`
      },

      bullets: [
        "@NotNull checks only that the value is not null.",
        "@NotEmpty checks that a supported value is not null and not empty.",
        "@NotBlank is intended for strings and also rejects whitespace-only values."
      ]
    },

    {
      id: "size-validation",

      title: "@Size Validation",

      paragraphs: [
        "@Size validates the size or length of supported values such as strings, collections, maps, and arrays.",
        "It is useful when an application needs to restrict the minimum or maximum amount of data."
      ],

      code: {
        language: "java",
        code: `public record RegistrationRequest(

    @NotBlank
    @Size(min = 2, max = 50)
    String username,

    @NotBlank
    @Size(min = 8, max = 100)
    String password

) {
}`
      },

      bullets: [
        "@Size does not mean the value cannot be null.",
        "Combine @Size with @NotBlank or @NotNull when null must also be rejected.",
        "For numeric minimum or maximum values, use numeric constraints such as @Min and @Max."
      ]
    },

    {
      id: "numeric-validation",

      title: "Numeric Validation",

      paragraphs: [
        "Bean Validation provides several constraints for validating numeric values.",
        "These constraints are useful for quantities, prices, ages, counts, limits, and other numeric input."
      ],

      code: {
        language: "java",
        code: `public record ProductRequest(

    @Min(1)
    @Max(100)
    Integer quantity,

    @Positive
    BigDecimal price,

    @PositiveOrZero
    Integer discount

) {
}`
      },

      bullets: [
        "@Min checks the lower numeric boundary.",
        "@Max checks the upper numeric boundary.",
        "@Positive requires a value greater than zero.",
        "@PositiveOrZero allows zero.",
        "Use @DecimalMin or @DecimalMax when decimal boundary semantics are required."
      ]
    },

    {
      id: "string-validation",

      title: "String Validation",

      paragraphs: [
        "String input commonly needs multiple constraints because different rules answer different questions.",
        "For example, @NotBlank can ensure that a name exists while @Size can limit its length."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank(message = "Name is required")
    @Size(
        min = 2,
        max = 100,
        message = "Name must contain 2 to 100 characters"
    )
    String name

) {
}`
      },

      bullets: [
        "Use @NotBlank for required text.",
        "Use @Size for length restrictions.",
        "Use @Pattern when a specific text format is required.",
        "Use custom validators for complex reusable formats."
      ]
    },

    {
      id: "email-validation",

      title: "Email Validation",

      paragraphs: [
        "@Email can be used when an input is expected to represent an email address.",
        "It should normally be combined with @NotBlank when the field is required because @Email by itself is not intended to mean that the value cannot be null."
      ],

      code: {
        language: "java",
        code: `public record UserRequest(

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    String email

) {
}`
      }
    },

    {
      id: "pattern-validation",

      title: "@Pattern Validation",

      paragraphs: [
        "@Pattern validates a string against a regular expression.",
        "It can be useful for formats such as employee codes, postal codes, usernames, or controlled identifiers."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank
    @Pattern(
        regexp = "EMP-[0-9]{4}",
        message = "Employee code must look like EMP-1234"
    )
    String employeeCode

) {
}`
      },

      bullets: [
        "Use a clear regular expression.",
        "Do not use complex regex when a simpler constraint is sufficient.",
        "Remember that @Pattern is for string values."
      ]
    },

    {
      id: "date-validation",

      title: "Date and Time Validation",

      paragraphs: [
        "Bean Validation provides constraints for validating temporal values.",
        "For example, a birth date may need to be in the past while an appointment date may need to be in the future."
      ],

      code: {
        language: "java",
        code: `public record AppointmentRequest(

    @NotNull
    @Future
    LocalDate appointmentDate,

    @NotNull
    @Past
    LocalDate dateOfBirth

) {
}`
      },

      bullets: [
        "@Past requires a past date or time.",
        "@PastOrPresent allows the current point in time as well.",
        "@Future requires a future date or time.",
        "@FutureOrPresent allows the current point in time as well."
      ]
    },

    {
      id: "validation-process",

      title: "How Bean Validation Works",

      paragraphs: [
        "When validation is triggered, the validation provider examines the object's fields and evaluates each constraint.",
        "If one or more constraints fail, validation errors are collected and made available to the application."
      ],

      bullets: [
        "Create a DTO.",
        "Add validation constraints.",
        "Receive the DTO in the controller.",
        "Trigger validation with @Valid or another supported validation mechanism.",
        "The validation provider evaluates the constraints.",
        "Spring MVC handles validation failures.",
        "The application can return a structured validation-error response."
      ],

      code: {
        language: "text",
        code: `HTTP Request
      |
      v
@RequestBody DTO
      |
      v
@Valid
      |
      v
Bean Validation
      |
      +---- Invalid
      |       |
      |       v
      |   Validation Error
      |       |
      |       v
      |      400
      |
      +---- Valid
              |
              v
           Service
              |
              v
          Repository`
      }
    },

    {
      id: "valid",

      title: "Using @Valid",

      paragraphs: [
        "@Valid tells Spring to validate the object using the Bean Validation constraints declared on it.",
        "For a REST request body, @Valid is commonly placed on the @RequestBody parameter."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/users")
public ResponseEntity<UserResponse> createUser(
        @Valid @RequestBody UserRequest request) {

    UserResponse response =
        userService.createUser(request);

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(response);
}`
      },

      bullets: [
        "@Valid triggers validation of the request DTO.",
        "Validation occurs before normal controller processing continues.",
        "Invalid input can result in a validation exception.",
        "The exception can be handled centrally using @RestControllerAdvice."
      ]
    },

    {
      id: "request-body-validation",

      title: "Validating a REST Request Body",

      paragraphs: [
        "A common Spring Boot pattern is to put validation annotations on request DTOs and use @Valid on the controller's @RequestBody parameter.",
        "This keeps input validation close to the API contract while keeping the service focused on business logic."
      ],

      code: {
        language: "java",
        code: `public record CreateEmployeeRequest(

    @NotBlank
    @Size(min = 2, max = 100)
    String name,

    @NotBlank
    @Email
    String email,

    @NotNull
    @Positive
    Long departmentId

) {
}


@PostMapping("/employees")
public ResponseEntity<?> create(
        @Valid @RequestBody CreateEmployeeRequest request) {

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(employeeService.create(request));
}`
      }
    },

    {
      id: "validation-error-flow",

      title: "What Happens When Validation Fails?",

      paragraphs: [
        "When a request body fails Bean Validation, Spring MVC can reject the request before the controller method executes normally.",
        "For REST APIs, the application commonly converts the validation failure into a structured 400 Bad Request response."
      ],

      code: {
        language: "text",
        code: `POST /api/employees

{
  "name": "",
  "email": "wrong-email",
  "departmentId": -5
}

        |
        v
@Valid
        |
        v
Bean Validation
        |
        +---- name invalid
        |
        +---- email invalid
        |
        +---- departmentId invalid
        |
        v
Validation Exception
        |
        v
@RestControllerAdvice
        |
        v
400 Bad Request`
      }
    },

    {
      id: "binding-result",

      title: "BindingResult",

      paragraphs: [
        "BindingResult can be used when the controller wants to inspect validation errors directly instead of immediately relying on exception handling.",
        "It is often useful when the application needs custom handling inside a controller, although centralized exception handling is commonly cleaner for REST APIs."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/users")
public ResponseEntity<?> createUser(
        @Valid @RequestBody UserRequest request,
        BindingResult result) {

    if (result.hasErrors()) {
        return ResponseEntity
            .badRequest()
            .body(result.getFieldErrors());
    }

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.create(request));
}`
      },

      bullets: [
        "BindingResult contains validation and binding errors.",
        "It must be associated correctly with the validated parameter.",
        "For larger REST applications, centralized exception handling is often easier to maintain."
      ]
    },

    {
      id: "field-error",

      title: "Understanding Field Validation Errors",

      paragraphs: [
        "Validation errors can contain useful information such as the field name, rejected value, validation code, and message.",
        "A production API commonly converts these details into a consistent error-response structure."
      ],

      code: {
        language: "text",
        code: `Validation Errors

name
  -> must not be blank

email
  -> must be a well-formed email address

age
  -> must be greater than or equal to 18`
      }
    },

    {
      id: "validation-error-response",

      title: "Designing a Validation Error Response",

      paragraphs: [
        "A REST API should ideally return a predictable error format instead of exposing framework-specific exception details directly to clients."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Enter a valid email address",
    "age": "Age must be at least 18"
  }
}`
      },

      bullets: [
        "Return a clear HTTP status.",
        "Provide a general validation message.",
        "Identify which fields failed.",
        "Return useful but safe messages.",
        "Avoid exposing internal stack traces."
      ]
    },

    {
      id: "global-validation-handler",

      title: "Handling Validation Errors Globally",

      paragraphs: [
        "A REST application can use @RestControllerAdvice to handle validation-related exceptions centrally.",
        "This prevents every controller from repeating the same validation-error handling code."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors =
            new HashMap<>();

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
      id: "message",

      title: "Custom Validation Messages",

      paragraphs: [
        "Constraint annotations can define custom messages that are more meaningful to API consumers."
      ],

      code: {
        language: "java",
        code: `public record UserRequest(

    @NotBlank(
        message = "Name is required"
    )
    String name,

    @Email(
        message = "Please provide a valid email"
    )
    String email

) {
}`
      },

      bullets: [
        "Use messages that explain how the client can correct the input.",
        "Avoid exposing internal implementation details.",
        "For large applications, validation messages can also be externalized into message bundles."
      ]
    },

    {
      id: "nested-validation",

      title: "Nested Object Validation",

      paragraphs: [
        "DTOs can contain nested objects. When the nested object itself contains validation constraints, @Valid can be used to cascade validation into the nested object."
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


public record UserRequest(

    @NotBlank
    String name,

    @Valid
    @NotNull
    AddressRequest address

) {
}`
      },

      bullets: [
        "@Valid enables cascading validation.",
        "Nested DTOs can define their own constraints.",
        "Use @NotNull when the nested object itself is required."
      ]
    },

    {
      id: "collection-validation",

      title: "Validating Collections of Objects",

      paragraphs: [
        "When a DTO contains a collection of nested objects, @Valid can be used to cascade validation into each element."
      ],

      code: {
        language: "java",
        code: `public record OrderRequest(

    @NotEmpty
    List<@Valid OrderItemRequest> items

) {
}


public record OrderItemRequest(

    @NotNull
    Long productId,

    @Positive
    Integer quantity

) {
}`
      },

      bullets: [
        "@NotEmpty validates that the collection is present and contains elements.",
        "@Valid validates the objects contained in the collection.",
        "Element constraints can be useful for collection elements."
      ]
    },

    {
      id: "path-variable-validation",

      title: "Validating Path Variables",

      paragraphs: [
        "Spring applications can also validate method parameters such as path variables when method validation is enabled.",
        "The exact configuration depends on the Spring Boot and Spring Framework version being used."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/users/{id}")
public UserResponse getUser(
        @PathVariable
        @Positive
        Long id) {

    return userService.getUser(id);
}`
      },

      bullets: [
        "Request-body validation and method-parameter validation are related but separate use cases.",
        "Use constraints appropriate for the parameter type.",
        "Enable method validation when required by the application."
      ]
    },

    {
      id: "request-param-validation",

      title: "Validating Request Parameters",

      paragraphs: [
        "Query parameters can also be validated when method validation is enabled."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/users")
public List<UserResponse> search(
        @RequestParam
        @Size(min = 2, max = 50)
        String name) {

    return userService.search(name);
}`
      }
    },

    {
      id: "validated",

      title: "Using @Validated",

      paragraphs: [
        "@Validated is a Spring validation annotation that can be used to enable method validation and supports validation groups.",
        "It is different from @Valid, although both participate in validation."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class UserService {

    public UserResponse findUser(
            @Positive Long id) {

        return userRepository
            .findById(id)
            .map(this::toResponse)
            .orElseThrow();
    }
}`
      },

      bullets: [
        "@Valid is commonly used for cascading validation.",
        "@Validated is a Spring annotation that can activate method validation and supports validation groups.",
        "Use the annotation appropriate to the validation requirement."
      ]
    },

    {
      id: "dto-validation",

      title: "Why Validate DTOs Instead of Entities?",

      paragraphs: [
        "Request DTOs represent the API contract and are often the best place for request-specific validation rules.",
        "Database entities represent persistence and domain state. Their constraints may have different purposes from API input constraints.",
        "Separating request validation from persistence models reduces coupling and allows different APIs to have different validation requirements."
      ],

      code: {
        language: "text",
        code: `Client JSON
     |
     v
Request DTO
     |
     +---- API Validation
     |
     v
Service
     |
     v
Entity
     |
     +---- Persistence Constraints
     |
     v
Database`
      },

      bullets: [
        "DTO validation describes API input requirements.",
        "Entity constraints can describe persistence/domain requirements.",
        "Do not automatically expose entities as API request models.",
        "DTOs provide a cleaner API boundary."
      ]
    },

    {
      id: "validation-vs-business-rules",

      title: "Validation vs Business Rules",

      paragraphs: [
        "Bean Validation is excellent for declarative input constraints, but not every business rule should be represented as a validation annotation.",
        "A rule such as 'email must not be blank' is a good validation constraint. A rule such as 'an employee cannot approve their own expense report' is business logic and normally belongs in the service/domain layer."
      ],

      code: {
        language: "text",
        code: `Bean Validation

"Name must not be blank"
"Age must be >= 18"
"Email must be valid"


Business Logic

"Employee cannot approve own expense"
"Only account owner can withdraw"
"Order cannot be cancelled after shipment"`
      },

      bullets: [
        "Use Bean Validation for structural and input constraints.",
        "Use service/domain logic for business rules.",
        "Do not create custom validation annotations for every business rule."
      ]
    },

    {
      id: "cross-field-validation",

      title: "Cross-Field Validation",

      paragraphs: [
        "Some validation rules depend on multiple fields rather than a single field.",
        "For example, password and confirmPassword must match. Such rules can be implemented using a class-level custom constraint or handled explicitly in the appropriate application layer."
      ],

      code: {
        language: "java",
        code: `public record RegistrationRequest(

    @NotBlank
    String password,

    @NotBlank
    String confirmPassword

) {
}`
      },

      bullets: [
        "Single-field constraints are ideal for independent field rules.",
        "Cross-field rules require access to multiple values.",
        "Custom class-level constraints can provide reusable cross-field validation."
      ]
    },

    {
      id: "custom-validator",

      title: "Custom Validation Constraint",

      paragraphs: [
        "When the built-in constraints are not sufficient, a custom constraint can be created.",
        "A custom constraint normally consists of an annotation and a ConstraintValidator implementation."
      ],

      code: {
        language: "java",
        code: `@Target({
    ElementType.FIELD,
    ElementType.PARAMETER
})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmployeeCodeValidator.class)
public @interface ValidEmployeeCode {

    String message() default
        "Invalid employee code";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}`
      }
    },

    {
      id: "constraint-validator",

      title: "ConstraintValidator",

      paragraphs: [
        "ConstraintValidator contains the custom validation logic for a custom constraint.",
        "The validator receives the value and returns whether that value satisfies the custom rule."
      ],

      code: {
        language: "java",
        code: `public class EmployeeCodeValidator
        implements ConstraintValidator<
            ValidEmployeeCode,
            String> {

    @Override
    public boolean isValid(
            String value,
            ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        return value.matches(
            "EMP-[0-9]{4}"
        );
    }
}`
      },

      bullets: [
        "ConstraintValidator contains the custom validation logic.",
        "Null handling should be considered explicitly.",
        "Required-field validation can be combined with a separate @NotNull or @NotBlank constraint."
      ]
    },

    {
      id: "validation-groups",

      title: "Validation Groups",

      paragraphs: [
        "Validation groups allow different validation constraints to be activated for different validation scenarios.",
        "For example, an application may require one set of fields during creation and another set during an update."
      ],

      code: {
        language: "java",
        code: `public interface CreateValidation {
}

public interface UpdateValidation {
}


public record UserRequest(

    @NotBlank(groups = CreateValidation.class)
    String username,

    @NotBlank(
        groups = {
            CreateValidation.class,
            UpdateValidation.class
        }
    )
    String name

) {
}`
      },

      bullets: [
        "Validation groups allow scenario-specific constraints.",
        "They can be useful for create vs update operations.",
        "Do not introduce groups unless different validation scenarios genuinely require them."
      ]
    },

    {
      id: "validation-groups-controller",

      title: "Using Validation Groups",

      paragraphs: [
        "Spring's @Validated can be used to select a validation group for a method or controller operation."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/users")
public ResponseEntity<?> create(
        @Validated(CreateValidation.class)
        @RequestBody UserRequest request) {

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.create(request));
}`
      }
    },

    {
      id: "optional-fields",

      title: "Optional Fields and Validation",

      paragraphs: [
        "Validation rules should reflect whether a field is required or optional.",
        "For example, an optional phone number may not need @NotBlank, but if it is supplied, it can still be validated for format."
      ],

      code: {
        language: "java",
        code: `public record ProfileRequest(

    @Email
    String email,

    @Pattern(
        regexp = "[0-9]{10}",
        message = "Phone must contain 10 digits"
    )
    String phone

) {
}`
      },

      bullets: [
        "Optional fields should not be made required accidentally.",
        "Format constraints can still validate non-null optional values.",
        "Use @NotBlank or @NotNull only when the field is required."
      ]
    },

    {
      id: "validation-order",

      title: "Validation and Controller Execution",

      paragraphs: [
        "For a valid request body annotated with @Valid, Spring performs validation as part of argument resolution before the controller method proceeds normally.",
        "This means the service layer should receive data that has passed the declared request validation, while business rules can still be checked separately."
      ],

      code: {
        language: "text",
        code: `HTTP Request
      |
      v
JSON Deserialization
      |
      v
DTO Creation
      |
      v
Bean Validation
      |
      +---- Failed ---> Error Response
      |
      +---- Passed
              |
              v
          Controller
              |
              v
           Service`
      }
    },

    {
      id: "validation-vs-database",

      title: "Validation vs Database Constraints",

      paragraphs: [
        "Bean Validation and database constraints solve related but different problems.",
        "Bean Validation provides application-level validation before data is persisted, while database constraints protect the database itself.",
        "Important invariants should not rely only on application validation when the database can enforce them directly."
      ],
      code: {
        language: "text",
        code: `Application Layer
      |
      +---- Bean Validation
      |
      v
Service
      |
      v
Repository
      |
      v
Database
      |
      +---- NOT NULL
      +---- UNIQUE
      +---- PRIMARY KEY
      +---- FOREIGN KEY`
      },

      bullets: [
        "Bean Validation improves API input handling.",
        "Database constraints protect persisted data.",
        "Use both where appropriate.",
        "A database UNIQUE constraint is still important even if the DTO checks a value."
      ]
    },

    {
      id: "validation-and-json",

      title: "JSON Deserialization vs Validation",

      paragraphs: [
        "JSON deserialization and Bean Validation are separate steps.",
        "Jackson first converts JSON into the Java DTO. Bean Validation then checks the resulting object against its declared constraints.",
        "Malformed JSON can therefore fail before Bean Validation is reached."
      ],

      code: {
        language: "text",
        code: `JSON
 |
 v
Jackson Deserialization
 |
 +---- Malformed JSON
 |         |
 |         v
 |      400 Error
 |
 +---- DTO Created
           |
           v
      Bean Validation
           |
           +---- Invalid
           |
           +---- Valid`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Bean Validation Mistakes",

      bullets: [
        "Using javax.validation imports in a modern Jakarta-based Spring Boot application.",
        "Forgetting the validation starter dependency.",
        "Adding validation annotations but forgetting @Valid on the request body.",
        "Using @NotNull when blank strings should also be rejected.",
        "Using @NotBlank on numeric values.",
        "Assuming @Email means the field is required.",
        "Using @Size when a numeric @Min or @Max constraint is needed.",
        "Returning framework exception details directly to API clients.",
        "Putting complex business rules into simple field constraints.",
        "Forgetting @Valid on nested DTOs.",
        "Not validating collection elements.",
        "Using custom constraints when built-in constraints are sufficient.",
        "Validating only in React and not on the backend.",
        "Assuming Bean Validation replaces database constraints.",
        "Not testing invalid input scenarios."
      ]
    },

    {
      id: "best-practices",

      title: "Bean Validation Best Practices",

      bullets: [
        "Use DTOs for API request validation.",
        "Use jakarta.validation annotations in modern Spring Boot applications.",
        "Keep validation rules close to the API contract.",
        "Use @Valid for request-body validation.",
        "Use @Validated where method validation or validation groups are required.",
        "Use @NotBlank for required text fields.",
        "Use numeric constraints for numeric values.",
        "Use @Valid for nested DTO validation.",
        "Return a consistent validation-error response.",
        "Handle validation exceptions centrally in REST APIs.",
        "Keep complex business rules in the service/domain layer.",
        "Use database constraints for important persistence invariants.",
        "Test both valid and invalid requests.",
        "Use custom validators only when built-in constraints are insufficient."
      ]
    },

    {
      id: "testing",

      title: "Testing Bean Validation",

      paragraphs: [
        "Validation should be tested with both valid and invalid input.",
        "Controller tests can verify the HTTP response, while validator-focused tests can verify individual constraint behavior."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/users")
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
        "Test invalid email formats.",
        "Test values outside numeric ranges.",
        "Test nested validation.",
        "Test successful requests with valid input.",
        "Test custom validation constraints when they exist."
      ]
    },

    {
      id: "complete-example",

      title: "Complete Bean Validation Example",

      paragraphs: [
        "The following example combines a request DTO, validation constraints, a controller, and service processing."
      ],

      code: {
        language: "java",
        code: `public record CreateUserRequest(

    @NotBlank(
        message = "Name is required"
    )
    @Size(
        min = 2,
        max = 50,
        message = "Name must contain 2 to 50 characters"
    )
    String name,

    @NotBlank(
        message = "Email is required"
    )
    @Email(
        message = "Invalid email"
    )
    String email,

    @NotNull(
        message = "Age is required"
    )
    @Min(
        value = 18,
        message = "User must be at least 18"
    )
    Integer age

) {
}


@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> create(
            @Valid
            @RequestBody
            CreateUserRequest request) {

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(userService.create(request));
    }
}`
      }
    },

    {
      id: "complete-flow",

      title: "Complete Validation Flow",

      code: {
        language: "text",
        code: `React / Postman
       |
       | JSON
       v
Spring Boot Controller
       |
       v
@RequestBody
       |
       v
DTO Created
       |
       v
@Valid
       |
       v
Jakarta Validation API
       |
       v
Hibernate Validator
       |
       +-------------------+
       |                   |
       v                   v
Invalid               Valid
  |                     |
  v                     v
400 Response          Controller
  |                     |
  v                     v
Error Handler        Service
                        |
                        v
                    Repository
                        |
                        v
                     Database`
      }
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is Bean Validation?",
          answer:
            "Bean Validation is a standard mechanism for declaring and evaluating constraints on Java objects."
        },
        {
          question: "What is Jakarta Validation?",
          answer:
            "Jakarta Validation provides the standard API and annotations used to define validation constraints in modern Java applications."
        },
        {
          question: "What is Hibernate Validator?",
          answer:
            "Hibernate Validator is a Bean Validation implementation that performs the actual constraint validation."
        },
        {
          question: "What is the difference between Bean Validation API and Hibernate Validator?",
          answer:
            "The Jakarta Validation API defines the standard validation contracts and annotations, while Hibernate Validator is an implementation that performs the validation."
        },
        {
          question: "What is @Valid?",
          answer:
            "@Valid triggers validation of an object using its Bean Validation constraints and also enables cascading validation for nested objects."
        },
        {
          question: "What is @Validated?",
          answer:
            "@Validated is a Spring validation annotation commonly used for method validation and validation groups."
        },
        {
          question: "What is the difference between @Valid and @Validated?",
          answer:
            "@Valid is a Jakarta Validation annotation commonly used for validating and cascading into objects. @Validated is a Spring annotation that supports method validation and validation groups."
        },
        {
          question: "What is the difference between @NotNull, @NotEmpty, and @NotBlank?",
          answer:
            "@NotNull rejects null values, @NotEmpty rejects null or empty supported values, and @NotBlank is intended for strings and rejects null, empty, and whitespace-only values."
        },
        {
          question: "Does @Email make a field mandatory?",
          answer:
            "No. If the field must be present, combine @Email with @NotNull or @NotBlank as appropriate."
        },
        {
          question: "What is @Size used for?",
          answer:
            "@Size validates the size or length of supported values such as strings, collections, maps, and arrays."
        },
        {
          question: "What is @Min?",
          answer:
            "@Min validates that a numeric value is greater than or equal to the specified minimum."
        },
        {
          question: "What is @Pattern?",
          answer:
            "@Pattern validates a string against a regular expression."
        },
        {
          question: "Why should DTOs commonly be validated instead of entities?",
          answer:
            "DTOs represent API contracts and allow request-specific validation without tightly coupling external API rules to persistence entities."
        },
        {
          question: "What happens when @Valid validation fails for a REST request body?",
          answer:
            "Spring MVC commonly raises a validation-related exception and the application can return a 400 Bad Request response through its exception-handling mechanism."
        },
        {
          question: "How do you handle validation errors globally?",
          answer:
            "A REST API can use @RestControllerAdvice and an appropriate @ExceptionHandler to convert validation exceptions into a consistent error response."
        },
        {
          question: "What is cascading validation?",
          answer:
            "Cascading validation means validating nested objects or collection elements using @Valid."
        },
        {
          question: "When would you create a custom validator?",
          answer:
            "A custom validator is useful when the built-in constraints cannot express a reusable validation rule."
        },
        {
          question: "Does Bean Validation replace database constraints?",
          answer:
            "No. Bean Validation handles application-level validation, while database constraints protect persisted data. Important invariants may require both."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "The request contains an empty name, but the controller still accepts it. What would you check?",
          answer:
            "Check whether the field has an appropriate constraint such as @NotBlank and whether the controller parameter is annotated with @Valid."
        },
        {
          question:
            "The email field is optional, but invalid emails should be rejected when supplied. How would you design the validation?",
          answer:
            "Use @Email without making the field required. Add @NotBlank or @NotNull only if the field must be present."
        },
        {
          question:
            "A nested AddressRequest contains @NotBlank fields, but invalid addresses are not being rejected. What is likely missing?",
          answer:
            "The parent DTO may be missing @Valid on the nested AddressRequest field."
        },
        {
          question:
            "A developer uses @Size(min = 18) on an Integer age field. Is that the correct constraint?",
          answer:
            "No. @Size is for size or length-oriented values such as strings and collections. A numeric age should use a constraint such as @Min(18)."
        },
        {
          question:
            "The frontend validates that age is at least 18. Is backend validation still necessary?",
          answer:
            "Yes. The frontend can be bypassed. The backend must validate input independently."
        },
        {
          question:
            "A username must be unique in the database. Is @NotBlank enough?",
          answer:
            "No. @NotBlank only validates that the value is present and non-whitespace. Uniqueness is a separate rule that should normally also be enforced with a database unique constraint."
        },
        {
          question:
            "When should a business rule be implemented in the service instead of Bean Validation?",
          answer:
            "When the rule depends on application state, multiple entities, authorization, workflows, or business operations. For example, 'an employee cannot approve their own expense' is business logic rather than a simple field constraint."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Bean Validation is a standard mechanism for declaring Java object constraints.",
        "Modern Spring Boot uses Jakarta Validation.",
        "Hibernate Validator is a common validation provider.",
        "@NotNull rejects null.",
        "@NotEmpty rejects null or empty supported values.",
        "@NotBlank rejects null, empty, and whitespace-only strings.",
        "@Size validates size or length.",
        "@Min and @Max validate numeric boundaries.",
        "@Positive requires a number greater than zero.",
        "@Email validates email-like input.",
        "@Pattern validates strings against regular expressions.",
        "@Past and @Future validate temporal values.",
        "@Valid triggers object validation and cascading validation.",
        "@Validated supports Spring method validation and validation groups.",
        "DTOs are commonly a good location for API input validation.",
        "Use @RestControllerAdvice for centralized REST validation-error handling.",
        "Use custom validators when built-in constraints are insufficient.",
        "Bean Validation does not replace business logic.",
        "Bean Validation does not replace database constraints.",
        "Always validate on the backend."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "Bean Validation is a standard Java mechanism for declaring validation constraints on objects. In modern Spring Boot applications, the Jakarta Validation API provides annotations such as @NotBlank, @Email, @Size, @Min, and @NotNull, while a provider such as Hibernate Validator performs the validation. In a REST API, validation constraints are commonly placed on request DTOs and triggered using @Valid in the controller. If validation fails, Spring can reject the request and the application can return a structured 400 Bad Request response through global exception handling. Bean Validation is best suited for input and structural constraints, while complex business rules belong in the service or domain layer."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "Remember the basic architecture: Jakarta Validation API defines the validation contract, Hibernate Validator performs validation, and Spring Boot integrates validation into the web application.",
        "Remember the most important annotation difference: @NotNull checks null, @NotEmpty checks null or empty supported values, and @NotBlank rejects null, empty, and whitespace-only strings.",
        "Remember that @Valid is commonly used on @RequestBody to trigger DTO validation.",
        "Remember that @Valid also enables cascading validation into nested objects when placed appropriately.",
        "Remember that @Validated is a Spring annotation commonly used for method validation and validation groups.",
        "Remember that validation is not the same as business logic. 'Email must be valid' is input validation, while 'a customer cannot cancel an order after shipment' is business logic.",
        "Remember that frontend validation is not enough. A malicious client can bypass React and call the backend directly.",
        "Remember that Bean Validation does not replace database constraints. Important persistence invariants should also be protected at the database level when appropriate.",
        "For interviews, the strongest explanation is: DTO -> @Valid -> Jakarta Validation -> Hibernate Validator -> validation result -> 400 on failure or Service on success."
      ]
    }
  ]
};
