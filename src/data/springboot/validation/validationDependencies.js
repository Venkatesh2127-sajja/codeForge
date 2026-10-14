
export const validationDependencies = {
  id: 603,

  title: "Validation Dependencies",

  slug: "validation-dependencies",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn how to add Spring Boot validation support using spring-boot-starter-validation and understand the role of the validation dependency.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "dependency-introduction",

      title: "Why Do We Need a Validation Dependency?",

      paragraphs: [
        "Spring Boot applications need validation support so that Jakarta Validation constraints can be discovered and executed by the application.",
        "The recommended approach is to add the Spring Boot validation starter to the project.",
        "The validation starter brings the libraries required for Bean Validation integration into the Spring Boot application. The application can then use annotations such as @NotBlank, @Email, @Size, @Min, and @Positive.",
        "Adding the dependency provides validation infrastructure, but it does not mean that every DTO is automatically validated. Validation still needs to be triggered at an appropriate application boundary."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        |
        v
spring-boot-starter-validation
        |
        +--> Jakarta Validation API
        |
        +--> Validation Provider
        |
        v
Constraint Evaluation
        |
        v
Validation Result`
      }
    },

    {
      id: "dependency-role",

      title: "What Does the Validation Starter Provide?",

      paragraphs: [
        "The validation starter is a convenient Spring Boot dependency that brings validation support into the application.",
        "Conceptually, validation involves an API that defines the standard contracts and annotations and a provider that performs the actual validation."
      ],

      code: {
        language: "text",
        code: `Your DTO
   |
   v
Jakarta Validation API
   |
   | Defines constraints such as
   | @NotBlank, @Email, @Size
   |
   v
Validation Provider
   |
   | Evaluates constraints
   |
   v
Validation Result`
      },

      bullets: [
        "Jakarta Validation defines the standard validation API.",
        "Constraint annotations describe validation rules.",
        "A validation provider performs the actual constraint evaluation.",
        "Spring Boot integrates the validation infrastructure into the application."
      ]
    },

    {
      id: "maven",

      title: "Maven Dependency",

      paragraphs: [
        "For a Maven-based Spring Boot application, add spring-boot-starter-validation to pom.xml.",
        "When Spring Boot dependency management is used, you normally do not specify a separate version for this starter because the Spring Boot parent or dependency management controls compatible dependency versions."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`
      }
    },

    {
      id: "gradle",

      title: "Gradle Dependency",

      paragraphs: [
        "For a Gradle-based Spring Boot project, the same validation starter can be added using the implementation configuration."
      ],

      code: {
        language: "gradle",
        code: `dependencies {
    implementation(
        "org.springframework.boot:spring-boot-starter-validation"
    )
}`
      },

      bullets: [
        "Maven uses pom.xml.",
        "Gradle commonly uses build.gradle or build.gradle.kts.",
        "Spring Boot dependency management normally controls compatible versions."
      ]
    },

    {
      id: "imports",

      title: "Import Validation Annotations",

      paragraphs: [
        "After adding the dependency, validation annotations can be imported from jakarta.validation.constraints.",
        "Modern Spring Boot applications use the jakarta.validation namespace rather than the older javax.validation namespace."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;`
      }
    },

    {
      id: "jakarta-vs-javax",

      title: "Jakarta Validation vs javax.validation",

      paragraphs: [
        "Modern Spring Boot applications use the Jakarta namespace for Bean Validation.",
        "Older Java and Spring applications may contain javax.validation imports. Mixing the old javax namespace with a modern Jakarta-based application can cause compilation or configuration problems."
      ],

      code: {
        language: "text",
        code: `Modern Spring Boot

jakarta.validation.constraints.NotBlank
jakarta.validation.Valid


Older applications

javax.validation.constraints.NotBlank
javax.validation.Valid`
      },

      bullets: [
        "Use jakarta.validation in modern Spring Boot applications.",
        "Do not blindly copy javax.validation imports from old tutorials.",
        "The exact namespace should match the Spring Boot generation used by the project."
      ]
    },

    {
      id: "dto-example",

      title: "Using the Dependency in a DTO",

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30)
    String username,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email

) {
}`
      },

      paragraphs: [
        "The annotations define the validation rules. The validation provider evaluates these rules when validation is triggered."
      ]
    },

    {
      id: "valid-trigger",

      title: "Dependency Alone Does Not Trigger Validation",

      paragraphs: [
        "Adding spring-boot-starter-validation gives the application validation support, but the application still needs to trigger validation.",
        "For a REST request body, @Valid is commonly placed on the controller parameter."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<String> create(
        @Valid
        @RequestBody UserRequest request) {

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("User created");
}`
      },

      code: {
        language: "text",
        code: `Dependency
   |
   v
Validation support available
   |
   v
@Valid
   |
   v
Validation actually triggered`
      }
    },

    {
      id: "dependency-vs-trigger",

      title: "Dependency vs Validation Trigger",

      paragraphs: [
        "A useful interview distinction is that the dependency provides validation infrastructure, while @Valid or another supported mechanism determines when validation is performed."
      ],

      code: {
        language: "text",
        code: `spring-boot-starter-validation
        |
        +--> Provides validation support


@Valid
        |
        +--> Triggers object validation


@Validated
        |
        +--> Spring method validation
        +--> Validation groups`
      }
    },

    {
      id: "validation-flow",

      title: "Complete Validation Dependency Flow",

      code: {
        language: "text",
        code: `1. Add validation starter
          |
          v
2. Application starts
          |
          v
3. Validation infrastructure available
          |
          v
4. DTO declares constraints
          |
          v
5. Controller receives request
          |
          v
6. @Valid triggers validation
          |
          v
7. Provider evaluates constraints
          |
          +-------------------+
          |                   |
          v                   v
       Valid               Invalid
          |                   |
          v                   v
      Controller          Validation
       continues           Exception`
      }
    },

    {
      id: "common-constraints",

      title: "Common Constraints After Adding the Dependency",

      paragraphs: [
        "Once validation support is available, a DTO can use many standard constraints depending on the type of data being validated."
      ],

      code: {
        language: "java",
        code: `@NotNull
Integer age;

@NotBlank
String name;

@NotEmpty
List<String> skills;

@Size(min = 2, max = 100)
String name;

@Email
String email;

@Pattern(regexp = "^[0-9]{10}$")
String phone;

@Min(18)
Integer age;

@Max(60)
Integer age;

@Positive
BigDecimal salary;

@Past
LocalDate dateOfBirth;

@Future
LocalDate meetingDate;`
      }
    },

    {
      id: "validation-provider",

      title: "Validation Provider",

      paragraphs: [
        "Jakarta Validation defines the standard API and constraint contracts. A provider performs the actual validation.",
        "Hibernate Validator is a commonly used Bean Validation implementation in Spring Boot applications."
      ],

      code: {
        language: "text",
        code: `Jakarta Validation
        |
        | Standard API
        v
Validation Provider
        |
        | Evaluates
        v
@NotBlank
@Email
@Size
@Min
@Max
...
        |
        v
Constraint Violations`
      },

      bullets: [
        "API defines the contract.",
        "Provider performs validation.",
        "Spring Boot integrates the provider into the application.",
        "Application code normally works with standard validation annotations."
      ]
    },

    {
      id: "provider-vs-api",

      title: "API vs Provider",

      code: {
        language: "text",
        code: `Jakarta Validation API

Question:
"What validation rules and contracts are available?"

Examples:
@NotBlank
@NotNull
@Email
@Size


Validation Provider

Question:
"Who actually evaluates those rules?"

Example:
Hibernate Validator`
      },

      paragraphs: [
        "This separation is an important Bean Validation concept. Applications normally depend on the standard API rather than tightly coupling DTOs to provider-specific APIs."
      ]
    },

    {
      id: "dependency-inspection",

      title: "Checking the Dependency in Maven",

      paragraphs: [
        "When troubleshooting validation, it can be useful to inspect the Maven dependency tree and confirm that the validation starter and its transitive dependencies are present."
      ],

      code: {
        language: "bash",
        code: `mvn dependency:tree`
      },

      bullets: [
        "Check whether spring-boot-starter-validation is present.",
        "Look for conflicting validation dependencies.",
        "Check for unexpected old javax.validation dependencies.",
        "Confirm that dependency versions are managed consistently by Spring Boot."
      ]
    },

    {
      id: "clean-build",

      title: "Rebuild After Adding the Dependency",

      paragraphs: [
        "After adding a dependency, reload the Maven or Gradle project in the IDE and perform a clean build if necessary."
      ],

      code: {
        language: "bash",
        code: `mvn clean package`
      },

      bullets: [
        "Refresh the Maven project in the IDE.",
        "Check for dependency download errors.",
        "Run a clean build.",
        "Restart the application if required."
      ]
    },

    {
      id: "common-mistake",

      title: "Common Dependency Mistake",

      paragraphs: [
        "A common problem is adding validation annotations to a DTO without having validation support configured correctly. If the required starter is missing or the imports are incorrect, validation may not behave as expected."
      ],

      bullets: [
        "Use spring-boot-starter-validation.",
        "Use jakarta.validation imports in modern Spring Boot applications.",
        "Use @Valid or an appropriate validation mechanism to trigger validation.",
        "Verify that validation errors are handled correctly.",
        "Refresh the Maven or Gradle project after changing dependencies.",
        "Avoid mixing javax.validation and jakarta.validation APIs in the same modern application."
      ]
    },

    {
      id: "common-errors",

      title: "Common Validation Dependency Problems",

      bullets: [
        "Cannot resolve jakarta.validation imports.",
        "Validation annotations compile but are never triggered.",
        "Using @Valid without having validation support configured.",
        "Using old javax.validation imports in a Jakarta-based application.",
        "Maven dependency was added but the IDE has not refreshed the project.",
        "Conflicting or incompatible dependency versions.",
        "Validation errors are occurring but the application has no consistent exception handler."
      ]
    },

    {
      id: "troubleshooting",

      title: "Validation Troubleshooting Checklist",

      code: {
        language: "text",
        code: `Validation not working?
        |
        +--> 1. Is spring-boot-starter-validation present?
        |
        +--> 2. Are imports jakarta.validation.*?
        |
        +--> 3. Is @Valid present where object validation is needed?
        |
        +--> 4. Is the DTO actually used by the endpoint?
        |
        +--> 5. Are constraints correctly defined?
        |
        +--> 6. Has Maven/Gradle been refreshed?
        |
        +--> 7. Is the application running with the expected dependencies?
        |
        +--> 8. Is validation error handling configured correctly?`
      }
    },

    {
      id: "controller-example",

      title: "Complete Controller Example",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<String> create(
            @Valid
            @RequestBody UserRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User created");
    }
}`
      },

      paragraphs: [
        "The dependency makes validation infrastructure available, the DTO declares the rules, and @Valid triggers validation when the controller receives the request."
      ]
    },

    {
      id: "invalid-request",

      title: "Testing an Invalid Request",

      code: {
        language: "json",
        code: `{
  "username": "",
  "email": "invalid-email"
}`
      },

      paragraphs: [
        "The username violates @NotBlank and the email violates the @Email constraint. Because @Valid is present on the request body, Spring can detect these violations before the normal successful controller flow continues."
      ]
    },

    {
      id: "starter-vs-manual",

      title: "Why Use the Starter Instead of Individual Dependencies?",

      paragraphs: [
        "Spring Boot starters provide a convenient dependency set that works with Spring Boot's dependency management. Manually adding individual validation libraries can make dependency management more difficult and can introduce incompatible versions.",
        "For normal Spring Boot applications, the starter is the simpler and more maintainable approach."
      ],

      bullets: [
        "Starter provides convenient dependency management.",
        "Spring Boot manages compatible versions.",
        "Reduces manual dependency configuration.",
        "Makes project setup easier to understand."
      ]
    },

    {
      id: "testing",

      title: "Testing Validation After Adding the Dependency",

      paragraphs: [
        "A simple controller test can verify that validation support is actually active."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "username": "",
                "email": "invalid"
            }
            """)
)
.andExpect(status().isBadRequest());`
      },

      bullets: [
        "Send invalid input.",
        "Verify that validation is triggered.",
        "Verify the expected HTTP status.",
        "Verify the validation error response if a global handler is configured."
      ]
    },

    {
      id: "production-best-practice",

      title: "Production Dependency Best Practices",

      bullets: [
        "Use spring-boot-starter-validation for standard Spring Boot validation support.",
        "Let Spring Boot dependency management control compatible versions.",
        "Use jakarta.validation imports in modern Spring Boot applications.",
        "Keep DTO validation focused on API input rules.",
        "Do not add unnecessary validation libraries.",
        "Avoid mixing old javax validation APIs with Jakarta-based dependencies.",
        "Test validation behavior as part of the API contract.",
        "Centralize validation error handling.",
        "Keep business rules separate from simple Bean Validation constraints."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Which dependency is commonly used for validation in Spring Boot?",

          answer:
            "spring-boot-starter-validation provides the validation support commonly used by Spring Boot applications."
        },

        {
          question: "Where are validation constraints imported from?",

          answer:
            "In modern Spring Boot applications, standard constraints are imported from jakarta.validation.constraints."
        },

        {
          question: "Does adding a validation annotation automatically validate every DTO?",

          answer:
            "No. Validation must be triggered at an appropriate boundary, commonly by using @Valid on a controller method parameter."
        },

        {
          question: "What is the role of the validation starter?",

          answer:
            "It provides convenient Spring Boot integration and the dependencies required for Bean Validation support."
        },

        {
          question: "What is the difference between the validation API and a validation provider?",

          answer:
            "The validation API defines the standard contracts and annotations, while the provider performs the actual validation."
        },

        {
          question: "Which validation provider is commonly used with Spring Boot?",

          answer:
            "Hibernate Validator is a commonly used Bean Validation implementation."
        },

        {
          question: "Why should modern Spring Boot applications use jakarta.validation instead of javax.validation?",

          answer:
            "Modern Spring Boot generations use the Jakarta namespace. Using the old javax namespace can cause compatibility and dependency problems."
        },

        {
          question: "Does spring-boot-starter-validation itself trigger validation?",

          answer:
            "No. The starter provides validation support. An appropriate validation mechanism such as @Valid must trigger validation at the relevant boundary."
        },

        {
          question: "How can you check whether the validation dependency is present in Maven?",

          answer:
            "Use mvn dependency:tree and inspect the project's dependency graph."
        },

        {
          question: "Why is the Spring Boot starter preferred over manually adding individual validation libraries?",

          answer:
            "The starter simplifies dependency management and allows Spring Boot's dependency management to provide compatible versions."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your DTO contains @NotBlank, but invalid values are being accepted. What would you check first?",

          answer:
            "Check that spring-boot-starter-validation is present, the annotation uses jakarta.validation, and the controller parameter is annotated with @Valid."
        },

        {
          question:
            "The IDE cannot resolve jakarta.validation.constraints.NotBlank. What could be wrong?",

          answer:
            "The validation starter may be missing, the Maven or Gradle project may not have been refreshed, or the project's dependency configuration may be incorrect."
        },

        {
          question:
            "A project was upgraded to a modern Spring Boot version and javax.validation imports now cause problems. What should you do?",

          answer:
            "Update the validation imports to the Jakarta namespace where appropriate and ensure the project's dependencies are aligned with the Spring Boot version."
        },

        {
          question:
            "A developer added spring-boot-starter-validation but the controller still accepts invalid input. What is the likely missing piece?",

          answer:
            "The validation dependency only provides validation support. The request object must also be validated at an appropriate boundary, commonly with @Valid on @RequestBody."
        },

        {
          question:
            "Why should you avoid manually selecting unrelated versions of validation libraries?",

          answer:
            "Manually mixing versions can create incompatible dependencies. Spring Boot's dependency management is designed to keep supported dependency versions aligned."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "spring-boot-starter-validation is the common Spring Boot validation starter.",
        "Modern applications use jakarta.validation.",
        "Jakarta Validation defines the standard validation API.",
        "Hibernate Validator is a commonly used validation provider.",
        "The dependency provides validation infrastructure.",
        "@Valid commonly triggers request DTO validation.",
        "@Validated is useful for method validation and validation groups.",
        "The starter does not automatically validate every DTO.",
        "Use Maven dependency management instead of unnecessary manual version management.",
        "Use mvn dependency:tree when troubleshooting dependencies.",
        "Refresh Maven or Gradle after changing dependencies.",
        "Do not mix javax.validation and jakarta.validation casually.",
        "Test invalid requests to verify that validation is actually active."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "In Spring Boot, spring-boot-starter-validation is commonly used to add Bean Validation support. It integrates the Jakarta Validation API with a validation provider such as Hibernate Validator. We define constraints like @NotBlank, @Email, and @Size on request DTOs using jakarta.validation imports. The dependency itself does not automatically validate every DTO; validation must be triggered at an appropriate boundary, commonly with @Valid on a @RequestBody parameter. In modern Spring Boot applications, we should use the Jakarta namespace rather than the older javax.validation namespace."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "Remember the three-part validation concept: Jakarta Validation provides the standard API and constraints, the validation provider performs the actual validation, and Spring Boot integrates the validation infrastructure into the application.",
        "The most common dependency is spring-boot-starter-validation. With Spring Boot dependency management, you normally do not need to manually specify the versions of the libraries pulled in by the starter.",
        "Adding the dependency does not automatically validate every object. For a REST request body, the common pattern is @Valid @RequestBody EmployeeRequest request.",
        "Modern Spring Boot applications use jakarta.validation imports. Older tutorials may show javax.validation, so always match the namespace to the application's Spring Boot generation.",
        "For troubleshooting, check the dependency tree, verify imports, confirm @Valid or another appropriate validation mechanism is present, refresh the build tool project, and test with an intentionally invalid request.",
        "For interviews, the simplest answer is: 'spring-boot-starter-validation adds validation support; Jakarta Validation defines the constraints; Hibernate Validator commonly performs validation; and @Valid triggers validation of request DTOs.'"
      ]
    }
  ]
};
