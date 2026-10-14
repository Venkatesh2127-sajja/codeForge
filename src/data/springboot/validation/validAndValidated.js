
export const validAndValidated = {
  id: 607,

  title: "@Valid and @Validated",

  slug: "valid-and-validated",

  topicTitle: "Spring Boot Validation",

  description:
    "Understand how @Valid and @Validated trigger validation in Spring Boot and learn their common use cases in controller and service layers.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "valid-introduction",

      title: "What is @Valid?",

      paragraphs: [
        "@Valid is a Jakarta Bean Validation annotation commonly used on controller request-body parameters to trigger validation of a DTO.",
        "When Spring receives a request body and converts it into a DTO, @Valid tells Spring to validate that DTO using the constraints declared on its fields.",
        "The constraints may include @NotBlank, @NotNull, @Size, @Email, @Min, @Max, @Positive, @Past, and many others."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> create(
        @Valid
        @RequestBody EmployeeCreateRequest request) {

    EmployeeResponse response =
            employeeService.create(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      }
    },

    {
      id: "valid-request-flow",

      title: "How @Valid Works in a REST Request",

      paragraphs: [
        "@Valid is part of the request-processing flow. Spring first converts the JSON request into the DTO and then performs Bean Validation before normal controller processing continues."
      ],

      code: {
        language: "text",
        code: `HTTP Request
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
Valid                  Invalid
      |                      |
      v                      v
Controller Method    Validation Exception
      |                      |
      v                      v
Service               Global Exception Handler
      |                      |
      v                      v
Database               HTTP 400 Response`
      }
    },

    {
      id: "valid-dto-example",

      title: "@Valid with a DTO",

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    String name,

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    String email,

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    Integer age

) {
}


@PostMapping
public ResponseEntity<String> create(
        @Valid
        @RequestBody EmployeeCreateRequest request) {

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("Employee created");
}`
      },

      paragraphs: [
        "The controller does not need to manually check every field. Bean Validation evaluates the constraints declared on the DTO."
      ]
    },

    {
      id: "validated",

      title: "What is @Validated?",

      paragraphs: [
        "@Validated is a Spring-specific annotation that can be used to activate method validation and validation groups.",
        "It can be placed at the class level or method level depending on the use case.",
        "It is especially useful when validation needs to happen on method parameters or return values rather than only on a request DTO."
      ],

      code: {
        language: "java",
        code: `import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class EmployeeService {

    public void updateSalary(
            @Positive Long employeeId,
            @Positive BigDecimal salary) {

        // business logic
    }
}`
      },

      bullets: [
        "@Validated is provided by Spring.",
        "It is commonly used for method-level validation.",
        "It supports validation groups.",
        "It is often placed on a service class when method parameters need validation."
      ]
    },

    {
      id: "method-validation",

      title: "Method Validation with @Validated",

      paragraphs: [
        "Method validation allows constraints to be placed directly on method parameters.",
        "This is useful when values entering a service method must satisfy validation rules."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class EmployeeService {

    public Employee findEmployee(
            @Positive Long employeeId) {

        return employeeRepository
                .findById(employeeId)
                .orElseThrow();
    }
}`
      },

      paragraphs: [
        "If a caller supplies an invalid value such as zero or a negative employee ID, method validation can reject the call before normal business logic executes, assuming the application's method-validation infrastructure is enabled."
      ]
    },

    {
      id: "method-validation-flow",

      title: "Method Validation Flow",

      code: {
        language: "text",
        code: `Controller
    |
    v
Service Method
    |
    v
@Validated
    |
    v
Method Validation
    |
    +----------------------+
    |                      |
    v                      v
Valid                  Invalid
    |                      |
    v                      v
Business Logic       Validation Exception
    |
    v
Repository`
      }
    },

    {
      id: "nested-validation",

      title: "Nested Object Validation",

      paragraphs: [
        "@Valid is also important when validating nested objects. If one DTO contains another DTO, @Valid can be used to cascade validation into the nested object.",
        "The outer DTO can validate its own fields while @Valid tells the validation provider to continue into the nested object."
      ],

      code: {
        language: "java",
        code: `public record AddressRequest(

    @NotBlank(
        message = "City is required"
    )
    String city

) {
}


public record EmployeeRequest(

    @NotBlank
    String name,

    @Valid
    AddressRequest address

) {
}`
      },

      bullets: [
        "@Valid enables cascading validation.",
        "The nested DTO's own constraints are evaluated.",
        "Without cascading validation, nested constraints may not be evaluated.",
        "@NotNull can additionally be used when the nested object itself is mandatory."
      ]
    },

    {
      id: "nested-notnull",

      title: "@Valid with @NotNull",

      paragraphs: [
        "When a nested DTO is required, it is common to combine @NotNull with @Valid.",
        "@NotNull checks that the nested object exists, while @Valid validates its contents."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank
    String name,

    @NotNull(message = "Address is required")
    @Valid
    AddressRequest address

) {
}`
      },

      code: {
        language: "text",
        code: `@NotNull
    |
    +--> Does address exist?


@Valid
    |
    +--> Are address fields valid?`
      }
    },

    {
      id: "nested-collection",

      title: "Validating Nested Collections",

      paragraphs: [
        "@Valid can also be used when a DTO contains a collection of nested DTOs.",
        "The collection can have its own constraints while each element can be validated separately."
      ],

      code: {
        language: "java",
        code: `public record SkillRequest(

    @NotBlank
    String name

) {
}


public record EmployeeRequest(

    @NotBlank
    String name,

    @NotEmpty
    List<@Valid SkillRequest> skills

) {
}`
      },

      bullets: [
        "@NotEmpty validates that the collection contains elements.",
        "@Valid validates each nested SkillRequest.",
        "Constraints on SkillRequest fields are evaluated for each element."
      ]
    },

    {
      id: "controller-example",

      title: "Controller Example",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public ResponseEntity<String> create(
            @Valid
            @RequestBody EmployeeRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Employee created");
    }
}`
      },

      paragraphs: [
        "This is the most common @Valid use case in Spring Boot REST APIs: validating an incoming request DTO before the service layer is called."
      ]
    },

    {
      id: "request-validation",

      title: "What Happens with an Invalid Request?",

      code: {
        language: "json",
        code: `{
  "name": "",
  "address": {
    "city": ""
  }
}`
      },

      paragraphs: [
        "If name and address.city have constraints such as @NotBlank, validation fails before the normal controller method processing completes.",
        "The resulting validation information can be converted into a structured HTTP 400 response by a global exception handler."
      ]
    },

    {
      id: "comparison",

      title: "@Valid vs @Validated",

      code: {
        language: "text",
        code: `@Valid

Source:
Jakarta Validation

Common purpose:
Validate an object and cascade validation
into nested objects.

Common use:
@Valid @RequestBody EmployeeRequest request


@Validated

Source:
Spring Framework

Common purposes:
Method validation
Validation groups

Common use:
@Validated on service/class
with constrained method parameters`
      },

      bullets: [
        "@Valid comes from Jakarta Validation.",
        "@Validated comes from Spring.",
        "@Valid is commonly used with @RequestBody.",
        "@Valid is important for cascading nested validation.",
        "@Validated is useful for method validation and groups.",
        "@Validated can also be used where validation groups need to be selected."
      ]
    },

    {
      id: "method-parameter-validation",

      title: "Validating Method Parameters",

      paragraphs: [
        "With method validation enabled, constraints can be placed directly on service or controller method parameters.",
        "This is different from validating the fields of a request DTO."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class PaymentService {

    public void processPayment(
            @Positive Long paymentId,
            @Positive BigDecimal amount) {

        // process payment
    }
}`
      },

      bullets: [
        "@Positive validates paymentId.",
        "@Positive validates amount.",
        "The validation happens at method invocation.",
        "This is useful for service-level contracts."
      ]
    },

    {
      id: "return-value-validation",

      title: "Method Return Value Validation",

      paragraphs: [
        "Method validation can also be used for return values when the appropriate validation setup is present.",
        "This allows an application to declare constraints on values returned from methods."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class EmployeeService {

    @NotNull
    public Employee findEmployee(
            @Positive Long employeeId) {

        return employeeRepository
                .findById(employeeId)
                .orElse(null);
    }
}`
      },

      paragraphs: [
        "If the method returns null while the return value is constrained with @NotNull, method validation can detect the violation."
      ]
    },

    {
      id: "validation-groups",

      title: "What are Validation Groups?",

      paragraphs: [
        "Validation groups allow an application to organize constraints into different groups and choose which group should be evaluated.",
        "This is useful when the same DTO has different validation requirements in different operations, although separate request DTOs are often simpler for public REST APIs."
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
      id: "validated-groups",

      title: "Using @Validated with Groups",

      paragraphs: [
        "@Validated can select a validation group for a Spring method or controller method."
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
        "The selected group determines which grouped constraints are evaluated."
      ]
    },

    {
      id: "valid-vs-groups",

      title: "@Valid and Validation Groups",

      paragraphs: [
        "@Valid triggers normal cascading validation but does not select a custom validation group.",
        "@Validated can be used when Spring-specific validation group selection is required."
      ],

      code: {
        language: "text",
        code: `Simple DTO validation

@Valid
    |
    v
Default validation


Group-specific validation

@Validated(CreateGroup.class)
    |
    v
CreateGroup constraints`
      }
    },

    {
      id: "dto-vs-method",

      title: "DTO Validation vs Method Validation",

      code: {
        language: "text",
        code: `DTO Validation

Client
  |
  v
JSON
  |
  v
Request DTO
  |
  v
@Valid
  |
  v
DTO constraints


Method Validation

Caller
  |
  v
Service method
  |
  v
@Validated
  |
  v
Parameter constraints`
      },

      bullets: [
        "DTO validation is ideal for validating incoming API payloads.",
        "Method validation is useful for service method contracts.",
        "Both approaches can be used in the same application.",
        "Choose validation at the boundary where the rule is most meaningful."
      ]
    },

    {
      id: "when-to-use-valid",

      title: "When Should You Use @Valid?",

      bullets: [
        "Validating REST request DTOs.",
        "Validating nested DTOs.",
        "Cascading validation into child objects.",
        "Validating collection elements containing nested DTOs.",
        "When standard/default validation behavior is sufficient."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<?> create(
        @Valid
        @RequestBody EmployeeRequest request) {

    return ResponseEntity.ok(
        employeeService.create(request)
    );
}`
      }
    },

    {
      id: "when-to-use-validated",

      title: "When Should You Use @Validated?",

      bullets: [
        "Method-level validation.",
        "Service method parameter validation.",
        "Method return-value validation.",
        "Validation groups.",
        "Spring-specific validation scenarios."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class EmployeeService {

    public void update(
            @Positive Long employeeId) {

        // business logic
    }
}`
      }
    },

    {
      id: "exception-flow",

      title: "Validation Exception Flow",

      paragraphs: [
        "The exception produced by validation depends on where validation occurs. Request-body validation in Spring MVC commonly results in MethodArgumentNotValidException, while method validation has its own method-validation exception behavior depending on the Spring Framework version and configuration."
      ],

      code: {
        language: "text",
        code: `Request Body Validation
        |
        v
@Valid @RequestBody
        |
        v
Validation failure
        |
        v
MethodArgumentNotValidException
        |
        v
@RestControllerAdvice


Method Validation
        |
        v
@Validated
        |
        v
Method parameter violation
        |
        v
Method-validation exception handling`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Assuming @Valid and @Validated are exactly the same annotation.",
        "Using @Validated only because it is available without understanding validation groups or method validation.",
        "Forgetting @Valid when nested DTO fields need cascading validation.",
        "Assuming @NotNull automatically validates nested DTO fields.",
        "Forgetting @Validated on a service class when method validation is required.",
        "Putting @Valid on a DTO field but forgetting to validate the parent object.",
        "Confusing DTO field validation with service method validation.",
        "Assuming frontend validation replaces backend validation.",
        "Using validation groups when separate DTOs would make the API contract clearer.",
        "Assuming every validation failure produces MethodArgumentNotValidException regardless of where validation occurs."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices",

      bullets: [
        "Use @Valid for normal request DTO validation.",
        "Use @Valid for cascading nested DTO validation.",
        "Use @Validated for method validation when method parameters or return values need constraints.",
        "Use @Validated when validation groups are genuinely required.",
        "Prefer separate request DTOs when create and update operations have substantially different validation rules.",
        "Keep validation close to the appropriate application boundary.",
        "Use meaningful validation messages.",
        "Handle validation exceptions centrally with @RestControllerAdvice.",
        "Test both valid and invalid requests.",
        "Do not rely only on frontend validation.",
        "Keep complex business rules in the service/domain layer rather than forcing every rule into Bean Validation."
      ]
    },

    {
      id: "testing-valid",

      title: "Testing @Valid with MockMvc",

      paragraphs: [
        "Controller tests can verify that @Valid rejects invalid request bodies."
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
        "Test invalid DTO fields.",
        "Verify HTTP 400.",
        "Verify field-level error messages.",
        "Test valid requests separately."
      ]
    },

    {
      id: "testing-validated",

      title: "Testing Method Validation",

      paragraphs: [
        "Method validation can be tested by calling a service method with values that violate its declared constraints."
      ],

      code: {
        language: "java",
        code: `@Service
@Validated
public class EmployeeService {

    public void updateSalary(
            @Positive Long employeeId,
            @Positive BigDecimal salary) {

        // logic
    }
}


// Example invalid invocation

employeeService.updateSalary(
    0L,
    BigDecimal.ZERO
);`
      },

      paragraphs: [
        "The test should verify that the method-validation infrastructure rejects the invalid arguments before the normal business operation proceeds."
      ]
    },

    {
      id: "complete-example",

      title: "Complete Controller and Service Example",

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    Integer age

) {
}


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public ResponseEntity<String> create(
            @Valid
            @RequestBody EmployeeRequest request) {

        employeeService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Employee created");
    }
}


@Service
@Validated
public class EmployeeService {

    public void updateSalary(
            @Positive Long employeeId,
            @Positive BigDecimal salary) {

        // business logic
    }

    public void create(EmployeeRequest request) {

        // business logic
    }
}`
      },

      paragraphs: [
        "This example demonstrates both major validation styles: @Valid validates the incoming DTO, while @Validated activates method-level validation for service parameters."
      ]
    },

    {
      id: "decision-guide",

      title: "Which One Should You Choose?",

      code: {
        language: "text",
        code: `Need to validate a request DTO?
        |
        +---- YES ---> @Valid


Need cascading validation into nested DTOs?
        |
        +---- YES ---> @Valid


Need validation on service method parameters?
        |
        +---- YES ---> @Validated


Need method return-value validation?
        |
        +---- YES ---> @Validated


Need validation groups?
        |
        +---- YES ---> @Validated


Simple DTO validation?
        |
        +---- YES ---> @Valid`
      }
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is the purpose of @Valid?",

          answer:
            "@Valid triggers Bean Validation for an object, commonly a request DTO received through a REST controller. It also enables cascading validation into nested objects."
        },

        {
          question: "What is @Validated?",

          answer:
            "@Validated is a Spring-specific annotation used for method validation and validation groups."
        },

        {
          question: "When would you use @Validated instead of only @Valid?",

          answer:
            "@Validated is useful when method-level validation or validation groups are required."
        },

        {
          question: "What is the difference between @Valid and @Validated?",

          answer:
            "@Valid is part of Jakarta Validation and is commonly used to trigger object and cascading validation. @Validated is Spring-specific and adds support for method validation and validation groups."
        },

        {
          question: "Can @Valid validate nested objects?",

          answer:
            "Yes. @Valid enables cascading validation into nested objects."
        },

        {
          question: "Why would you use @NotNull together with @Valid on a nested DTO?",

          answer:
            "@NotNull ensures that the nested object itself is present, while @Valid cascades validation into the nested object's fields."
        },

        {
          question: "Where is @Validated commonly placed for method validation?",

          answer:
            "It is commonly placed on a Spring-managed service or component class whose method parameters or return values need validation."
        },

        {
          question: "Does @Valid support validation groups?",

          answer:
            "@Valid triggers default validation and cascading, but it does not itself select a custom validation group. @Validated can be used for Spring validation-group scenarios."
        },

        {
          question: "Can @Validated be used on a controller?",

          answer:
            "Yes. @Validated can be used in Spring validation scenarios involving controller methods, including method validation and groups."
        },

        {
          question: "Does @Validated replace @Valid for every use case?",

          answer:
            "No. They have overlapping roles but different purposes. @Valid is the standard choice for ordinary DTO and cascading validation, while @Validated is useful for Spring method validation and groups."
        },

        {
          question: "What exception occurs for @Valid @RequestBody validation failure?",

          answer:
            "In Spring MVC, MethodArgumentNotValidException is commonly raised for request-body argument validation failures."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your nested AddressRequest has @NotBlank on city, but invalid city values are not being rejected. What should you check?",

          answer:
            "Check that the parent DTO uses @Valid on the AddressRequest field so validation cascades into the nested object. Also verify that the parent request itself is being validated."
        },

        {
          question:
            "You want employeeId to be greater than zero whenever a service method is called. How would you implement it?",

          answer:
            "Put @Validated on the Spring-managed service and add @Positive to the employeeId method parameter."
        },

        {
          question:
            "A developer uses @NotNull on an Address field but expects the Address city's @NotBlank constraint to execute. Is @NotNull enough?",

          answer:
            "No. @NotNull only checks that the Address object exists. Add @Valid to cascade validation into Address."
        },

        {
          question:
            "Create and update operations require different validation rules. What options do you have?",

          answer:
            "You can use validation groups with @Validated, but separate request DTOs are often clearer when the create and update contracts are substantially different."
        },

        {
          question:
            "A controller uses @Valid @RequestBody and validation fails. Does the service method execute normally?",

          answer:
            "No. Request-body validation occurs before normal controller processing continues, so an invalid request is rejected and the service should not be called through that normal path."
        },

        {
          question:
            "A service method has @Positive parameters but invalid values are accepted. What should you investigate?",

          answer:
            "Check that the service is a Spring-managed bean, that method validation is enabled/configured correctly for the Spring Boot version, and that @Validated is applied to the appropriate class."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@Valid comes from Jakarta Validation.",
        "@Validated comes from Spring.",
        "@Valid is commonly used with @RequestBody.",
        "@Valid triggers validation of an object.",
        "@Valid enables cascading validation into nested objects.",
        "@Validated is useful for method validation.",
        "@Validated supports validation groups.",
        "@Validated is commonly placed on a Spring service class for method validation.",
        "@NotNull + @Valid can ensure a nested object exists and is validated.",
        "Method validation is different from request DTO validation.",
        "Request-body validation commonly results in MethodArgumentNotValidException when it fails.",
        "Method-validation failures can have different exception behavior from MVC request-body validation.",
        "Use separate DTOs when validation groups would make the API contract unnecessarily complex.",
        "Test both DTO validation and method validation."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "@Valid is a Jakarta Validation annotation commonly used to validate request DTOs and cascade validation into nested objects. For example, @Valid @RequestBody EmployeeRequest tells Spring to validate the DTO before normal controller processing. @Validated is a Spring-specific annotation that is especially useful for method validation and validation groups. It is commonly placed on a Spring-managed service when method parameters such as employeeId or salary have constraints like @Positive. So, for normal REST DTO validation I would generally use @Valid, while for method-level validation or groups I would use @Validated."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "The easiest way to remember the difference is: @Valid is the standard choice for validating an object and cascading into nested objects, while @Validated adds Spring-specific support for method validation and validation groups.",
        "For a REST request, the common pattern is @Valid @RequestBody EmployeeRequest request. Spring converts JSON into the DTO and then evaluates its Bean Validation constraints.",
        "For service method validation, a common pattern is @Validated on the Spring-managed service class and constraints such as @Positive on method parameters.",
        "Remember that @NotNull and @Valid have different responsibilities on nested DTOs. @NotNull checks whether the nested object exists, while @Valid tells validation to inspect the nested object's constraints.",
        "Validation groups are powerful but can make DTOs harder to understand. When create and update requests have substantially different contracts, separate DTOs are often easier to maintain.",
        "For interviews, clearly distinguish request-body validation from method validation. Request-body validation in Spring MVC commonly results in MethodArgumentNotValidException, while method validation has its own validation exception behavior."
      ]
    }
  ]
};
