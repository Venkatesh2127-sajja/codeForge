
export const emailPatternPastFuture = {
  id: 606,

  title: "@Email, @Pattern, @Past, @Future",

  slug: "email-pattern-past-future",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn how to validate email addresses, custom formats, past dates, and future dates using Bean Validation constraints.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "format-validation",

      title: "Format and Date Validation",

      paragraphs: [
        "Some fields need validation beyond required-value and numeric constraints. Email addresses must follow an acceptable email format, phone numbers may follow a specific pattern, and dates may need to be in the past or future.",
        "Bean Validation provides specialized constraints for these requirements. @Email is commonly used for email-like input, @Pattern is used for regular-expression-based string formats, and @Past and @Future are used for temporal values.",
        "These constraints are normally placed on request DTOs so invalid input can be rejected before business processing begins."
      ],

      code: {
        language: "text",
        code: `Client Request
      |
      v
Request DTO
      |
      v
Bean Validation
      |
      +---- @Email
      |
      +---- @Pattern
      |
      +---- @Past
      |
      +---- @Future
      |
      +---- Validation Failed
      |          |
      |          v
      |      400 Response
      |
      +---- Validation Passed
                 |
                 v
              Service`
      }
    },

    {
      id: "email",

      title: "@Email",

      paragraphs: [
        "@Email checks whether a string satisfies an email-like format.",
        "It is useful when an API expects a value to represent an email address.",
        "@Email by itself should not be treated as a required-field constraint. If the field must be present, combine it with @NotBlank or another appropriate presence constraint."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    String email

) {
}`
      },

      bullets: [
        "@Email validates email-like syntax.",
        "@Email is normally applied to String values.",
        "Use @NotBlank when an email value is required.",
        "Use a custom business rule when the application needs to restrict domains such as company.com.",
        "Email validation does not prove that an email address actually exists."
      ]
    },

    {
      id: "email-examples",

      title: "Understanding @Email Input",

      paragraphs: [
        "The exact behavior of email validation should not be confused with verifying mailbox existence.",
        "Bean Validation can check whether a value has an acceptable email-like structure, but it does not send an email or verify that the mailbox belongs to the user."
      ],

      code: {
        language: "text",
        code: `Possible input

"user@example.com"
        |
        v
@Email
        |
        v
Format looks valid


"not-an-email"
        |
        v
@Email
        |
        v
Validation failure


""
        |
        v
@NotBlank + @Email
        |
        v
@NotBlank fails`
      },

      bullets: [
        "@Email is format validation.",
        "Email verification is an application workflow.",
        "Do not treat successful @Email validation as proof of ownership.",
        "For account verification, use a separate verification process."
      ]
    },

    {
      id: "email-and-notblank",

      title: "@Email vs @NotBlank",

      paragraphs: [
        "A common interview and implementation mistake is assuming that @Email automatically means the value is mandatory.",
        "If an email field is optional, @Email can validate the value when supplied. If the field is mandatory, combine @Email with @NotBlank."
      ],

      code: {
        language: "java",
        code: `// Required email

@NotBlank
@Email
String email;


// Optional email

@Email
String secondaryEmail;`
      }
    },

    {
      id: "pattern",

      title: "@Pattern",

      paragraphs: [
        "@Pattern validates a string against a regular expression. It is useful when an application requires a particular textual format.",
        "For example, an application may require a ten-digit phone number, an employee code such as EMP-1234, or another controlled string format."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Pattern;

public record EmployeeRequest(

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain 10 digits"
    )
    String phoneNumber

) {
}`
      },

      paragraphs: [
        "The regular expression above requires exactly ten digits."
      ]
    },

    {
      id: "pattern-breakdown",

      title: "Understanding a Regular Expression",

      paragraphs: [
        "Understanding the basic pieces of a regular expression makes @Pattern easier to use."
      ],

      code: {
        language: "text",
        code: `^[0-9]{10}$

^
Start of string

[0-9]
Any digit from 0 to 9

{10}
Exactly 10 occurrences

$
End of string

Therefore:

9876543210 -> valid
98765      -> invalid
98765432101 -> invalid
98AB543210 -> invalid`
      },

      bullets: [
        "^ anchors the expression at the beginning.",
        "$ anchors the expression at the end.",
        "[0-9] represents a digit.",
        "{10} requires exactly ten occurrences."
      ]
    },

    {
      id: "pattern-examples",

      title: "@Pattern Common Examples",

      paragraphs: [
        "@Pattern can represent many custom string formats, but the regular expression should remain understandable and maintainable."
      ],

      code: {
        language: "java",
        code: `// Employee code: EMP-1234

@Pattern(
    regexp = "^EMP-[0-9]{4}$",
    message = "Invalid employee code"
)
String employeeCode;


// PIN: exactly 6 digits

@Pattern(
    regexp = "^[0-9]{6}$",
    message = "PIN must contain 6 digits"
)
String pin;


// Username: letters, numbers and underscore

@Pattern(
    regexp = "^[a-zA-Z0-9_]+$",
    message = "Invalid username"
)
String username;`
      }
    },

    {
      id: "pattern-vs-size",

      title: "@Pattern vs @Size",

      paragraphs: [
        "@Size checks the size or length of supported values. @Pattern checks whether a string matches a regular expression.",
        "They can be used together when an application needs both a length restriction and a format restriction."
      ],

      code: {
        language: "java",
        code: `@NotBlank
@Size(min = 10, max = 10)
@Pattern(regexp = "^[0-9]+$")
String phoneNumber;`
      },

      bullets: [
        "@Size answers: How long is the value?",
        "@Pattern answers: Does the value match this format?",
        "Do not use a complex regex when a simpler built-in constraint is sufficient."
      ]
    },

    {
      id: "past",

      title: "@Past",

      paragraphs: [
        "@Past requires a supported date or time value to represent a point in the past.",
        "It is useful for values such as date of birth, historical dates, previous events, and other values that must occur before the current moment."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Past;
import java.time.LocalDate;

public record EmployeeRequest(

    @Past(
        message = "Date of birth must be in the past"
    )
    LocalDate dateOfBirth

) {
}`
      },

      bullets: [
        "@Past is a temporal constraint.",
        "It validates that the value is before the current time according to the validation context.",
        "@Past does not by itself mean the field is required.",
        "Combine it with @NotNull when a date is mandatory."
      ]
    },

    {
      id: "past-notnull",

      title: "@Past with @NotNull",

      paragraphs: [
        "If the date is required, @Past should normally be combined with @NotNull.",
        "This separates two rules: the value must exist, and the value must represent a past date."
      ],

      code: {
        language: "java",
        code: `public record UserRequest(

    @NotNull(
        message = "Date of birth is required"
    )
    @Past(
        message = "Date of birth must be in the past"
    )
    LocalDate dateOfBirth

) {
}`
      }
    },

    {
      id: "future",

      title: "@Future",

      paragraphs: [
        "@Future requires a supported date or time value to represent a point in the future.",
        "It is useful for scheduled meetings, appointments, events, expiration dates, and other future-oriented values."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Future;
import java.time.LocalDate;

public record MeetingRequest(

    @Future(
        message = "Meeting date must be in the future"
    )
    LocalDate meetingDate

) {
}`
      },

      bullets: [
        "@Future is a temporal constraint.",
        "It checks that the value represents a future point in time.",
        "@Future does not by itself make the field mandatory.",
        "Combine it with @NotNull when the value is required."
      ]
    },

    {
      id: "future-notnull",

      title: "@Future with @NotNull",

      paragraphs: [
        "If a future date is mandatory, combine @NotNull and @Future."
      ],

      code: {
        language: "java",
        code: `public record MeetingRequest(

    @NotNull(
        message = "Meeting date is required"
    )
    @Future(
        message = "Meeting date must be in the future"
    )
    LocalDate meetingDate

) {
}`
      }
    },

    {
      id: "past-present",

      title: "@Past vs @PastOrPresent",

      paragraphs: [
        "@Past requires a value strictly before the current time.",
        "@PastOrPresent allows the current date or time as well as values in the past.",
        "The distinction matters when today's date should be accepted."
      ],

      code: {
        language: "java",
        code: `@Past
LocalDate birthDate;


// Allows today as well

@PastOrPresent
LocalDate registrationDate;`
      },

      bullets: [
        "@Past = strictly past.",
        "@PastOrPresent = past or present.",
        "Choose the constraint according to the business meaning of the field."
      ]
    },

    {
      id: "future-present",

      title: "@Future vs @FutureOrPresent",

      paragraphs: [
        "@Future requires a value strictly after the current time.",
        "@FutureOrPresent allows the current date or time as well."
      ],

      code: {
        language: "java",
        code: `@Future
LocalDate appointmentDate;


// Allows today as well

@FutureOrPresent
LocalDate effectiveDate;`
      },

      bullets: [
        "@Future = strictly future.",
        "@FutureOrPresent = future or present.",
        "Use @FutureOrPresent when today's date should be valid."
      ]
    },

    {
      id: "date-types",

      title: "Date and Time Types",

      paragraphs: [
        "Modern Java applications commonly use java.time types such as LocalDate, LocalDateTime, Instant, and OffsetDateTime for temporal values.",
        "The appropriate type depends on whether the application needs only a date, a local date and time, or an absolute point in time."
      ],

      code: {
        language: "java",
        code: `@Past
LocalDate dateOfBirth;


@Future
LocalDateTime appointment;


@Future
Instant expirationTime;


@PastOrPresent
OffsetDateTime createdAt;`
      },

      bullets: [
        "LocalDate represents a date without a time.",
        "LocalDateTime represents a date and local time without an offset.",
        "Instant represents an absolute point on the UTC timeline.",
        "OffsetDateTime includes a date, time, and offset.",
        "Choose the temporal type according to the domain requirement."
      ]
    },

    {
      id: "combined-example",

      title: "Combined Example",

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record UserRequest(

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    String email,

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Invalid phone number"
    )
    String phoneNumber,

    @NotNull
    @Past(
        message = "Date of birth must be in the past"
    )
    LocalDate dateOfBirth,

    @NotNull
    @Future(
        message = "Appointment date must be in the future"
    )
    LocalDate appointmentDate

) {
}`
      },

      paragraphs: [
        "This DTO combines required-value, email-format, regular-expression, and date validation.",
        "Each constraint has a specific responsibility: @NotBlank and @NotNull handle required values, @Email handles email format, @Pattern handles a custom string format, @Past handles historical dates, and @Future handles future dates."
      ]
    },

    {
      id: "controller-example",

      title: "Using the Combined DTO in a REST Controller",

      paragraphs: [
        "The DTO constraints are evaluated when the controller uses @Valid on the request body."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> createUser(
            @Valid
            @RequestBody UserRequest request) {

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(userService.create(request));
    }
}`
      },

      bullets: [
        "@RequestBody converts JSON into the DTO.",
        "@Valid triggers Bean Validation.",
        "Invalid input is rejected before normal service processing.",
        "A global exception handler can convert validation failures into a consistent API response."
      ]
    },

    {
      id: "request-example",

      title: "Example Request",

      code: {
        language: "json",
        code: `{
  "email": "venkat@example.com",
  "phoneNumber": "9876543210",
  "dateOfBirth": "2000-12-27",
  "appointmentDate": "2030-01-15"
}`
      },

      paragraphs: [
        "If all values satisfy their declared constraints, the request can continue to the controller and service layer."
      ]
    },

    {
      id: "invalid-request",

      title: "Invalid Request Example",

      code: {
        language: "json",
        code: `{
  "email": "invalid-email",
  "phoneNumber": "98765",
  "dateOfBirth": "2030-01-01",
  "appointmentDate": "2020-01-01"
}`
      },

      paragraphs: [
        "This request can fail multiple constraints: the email may fail @Email, the phone number fails the ten-digit @Pattern, the date of birth fails @Past, and the appointment date fails @Future."
      ]
    },

    {
      id: "validation-flow",

      title: "Complete Validation Flow",

      code: {
        language: "text",
        code: `POST /api/users
        |
        v
@RequestBody UserRequest
        |
        v
@Valid
        |
        v
Bean Validation
        |
        +-----------------------------+
        |                             |
        v                             v
Invalid                         Valid
        |                             |
        v                             v
Validation Error                Controller
        |                             |
        v                             v
@RestControllerAdvice            Service
        |                             |
        v                             v
400 Bad Request                Repository
                                      |
                                      v
                                   Database`
      }
    },

    {
      id: "null-behavior",

      title: "Important Null-Value Behavior",

      paragraphs: [
        "A very important Bean Validation concept is that format and temporal constraints generally do not make a value required by themselves.",
        "For example, @Email does not replace @NotBlank, and @Future does not replace @NotNull.",
        "This allows optional fields to be validated when supplied without automatically making them mandatory."
      ],

      code: {
        language: "java",
        code: `// Optional email

@Email
String secondaryEmail;


// Required email

@NotBlank
@Email
String primaryEmail;


// Optional future date

@Future
LocalDate optionalAppointment;


// Required future date

@NotNull
@Future
LocalDate appointment;`
      }
    },

    {
      id: "pattern-limitations",

      title: "Limitations of @Pattern",

      paragraphs: [
        "@Pattern is powerful, but regular expressions can become difficult to understand and maintain.",
        "If a built-in validation constraint already expresses the requirement clearly, prefer the built-in constraint."
      ],

      bullets: [
        "Use @Email instead of creating your own email regex for normal email-format validation.",
        "Use @Size instead of a regex merely to check string length.",
        "Use @Min or @Max for numeric boundaries.",
        "Use @Positive for positive numeric values.",
        "Use @Pattern for genuinely format-specific string requirements."
      ]
    },

    {
      id: "business-date-rules",

      title: "Bean Validation vs Business Date Rules",

      paragraphs: [
        "@Past and @Future handle straightforward temporal constraints, but complex date rules may belong in the service or domain layer.",
        "For example, 'appointment must be at least 24 hours from now' is a business rule and may be better handled in application logic."
      ],

      code: {
        language: "text",
        code: `Simple Validation

appointmentDate must be future
        |
        v
@Future


Complex Business Rule

appointment must be at least
24 hours from now
        |
        v
Service / Domain Logic`
      },

      bullets: [
        "Use @Past and @Future for simple temporal constraints.",
        "Use service/domain logic for complex business rules.",
        "Do not force every business rule into a custom Bean Validation annotation."
      ]
    },

    {
      id: "custom-email-domain",

      title: "Custom Email Domain Rules",

      paragraphs: [
        "Suppose an application allows only company email addresses such as employee@company.com.",
        "@Email can validate the general email format, but the company-domain rule is an additional application requirement."
      ],

      code: {
        language: "java",
        code: `public boolean isCompanyEmail(String email) {

    return email != null
        && email.toLowerCase()
            .endsWith("@company.com");
}`
      },

      bullets: [
        "Use @Email for normal email syntax.",
        "Use application-specific logic for domain restrictions.",
        "A custom constraint can be created if the same domain rule is reused across many DTOs."
      ]
    },

    {
      id: "testing",

      title: "Testing These Constraints",

      paragraphs: [
        "Validation tests should verify both valid and invalid values.",
        "Controller tests can verify the HTTP behavior, while direct validator tests can verify constraint behavior independently."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "email": "invalid",
                "phoneNumber": "123",
                "dateOfBirth": "2030-01-01",
                "appointmentDate": "2020-01-01"
            }
            """)
)
.andExpect(status().isBadRequest());`
      },

      bullets: [
        "Test valid email addresses.",
        "Test invalid email formats.",
        "Test valid and invalid regular-expression values.",
        "Test past and non-past dates for @Past.",
        "Test future and non-future dates for @Future.",
        "Test null values when fields are required.",
        "Test optional fields separately from required fields."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Assuming @Email makes a field mandatory.",
        "Assuming @Pattern validates null values as a required-field rule.",
        "Using @Past without @NotNull when the date is mandatory.",
        "Using @Future without @NotNull when the date is mandatory.",
        "Using a complicated regex when a built-in constraint is sufficient.",
        "Using @Pattern for numeric validation instead of numeric constraints.",
        "Forgetting @Valid on the request body.",
        "Using the wrong Java date/time type for the business requirement.",
        "Confusing @Past with @PastOrPresent.",
        "Confusing @Future with @FutureOrPresent.",
        "Assuming @Email verifies that a mailbox exists.",
        "Putting complex business date rules entirely into annotations.",
        "Validating only on the frontend.",
        "Not testing invalid input."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices",

      bullets: [
        "Use @Email for normal email-format validation.",
        "Use @Pattern only when a custom string format is genuinely required.",
        "Use @Past and @Future for straightforward temporal constraints.",
        "Combine format constraints with @NotBlank or @NotNull when the field is mandatory.",
        "Use @PastOrPresent and @FutureOrPresent when today's value should also be accepted.",
        "Prefer java.time types such as LocalDate and Instant in modern Java applications.",
        "Keep complex business rules in the service or domain layer.",
        "Use meaningful validation messages.",
        "Validate DTOs at the API boundary.",
        "Return consistent validation-error responses.",
        "Test both successful and rejected inputs.",
        "Never rely only on frontend validation."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What does @Email do?",

          answer:
            "@Email checks whether a string satisfies an email-like format. It does not verify that the mailbox actually exists."
        },

        {
          question: "Does @Email make a field mandatory?",

          answer:
            "No. If the field is required, combine @Email with @NotBlank or another appropriate presence constraint."
        },

        {
          question: "When would you use @Pattern?",

          answer:
            "@Pattern is useful when a string must follow a custom regular-expression-based format, such as an employee code or fixed-format identifier."
        },

        {
          question: "What does @Pattern validate?",

          answer:
            "@Pattern validates a string against a regular expression."
        },

        {
          question: "What is the difference between @Pattern and @Size?",

          answer:
            "@Pattern checks whether a string matches a regular expression, while @Size checks the size or length of supported values."
        },

        {
          question: "What does @Past do?",

          answer:
            "@Past requires a supported date or time value to represent a point strictly in the past."
        },

        {
          question: "What does @Future do?",

          answer:
            "@Future requires a supported date or time value to represent a point strictly in the future."
        },

        {
          question: "What is the difference between @Past and @PastOrPresent?",

          answer:
            "@Past requires a value strictly before the current time, while @PastOrPresent also allows the current date or time."
        },

        {
          question: "What is the difference between @Future and @FutureOrPresent?",

          answer:
            "@Future requires a value strictly after the current time, while @FutureOrPresent also allows the current date or time."
        },

        {
          question: "Should @Past be combined with @NotNull?",

          answer:
            "Yes, when the date is required. @Past handles the temporal condition, while @NotNull handles the required-value condition."
        },

        {
          question: "Can @Future be used with LocalDate?",

          answer:
            "Yes. LocalDate is a supported Java time type for temporal validation."
        },

        {
          question: "Does @Email verify that an email address exists?",

          answer:
            "No. It performs format-oriented validation. Verifying ownership or mailbox existence requires a separate application workflow."
        },

        {
          question: "When should @Pattern not be used?",

          answer:
            "Avoid @Pattern when a standard constraint such as @Size, @Min, @Max, @Positive, or @Email already expresses the requirement clearly."
        },

        {
          question: "Can @Email and @NotBlank be used together?",

          answer:
            "Yes. This is a common combination when an email field is both required and must have an acceptable email format."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A user submits an empty email field and @Email does not produce the required-field message. Why?",
          answer:
            "@Email is not the required-value constraint. If the field must contain a value, use @NotBlank together with @Email."
        },

        {
          question:
            "An employee code must always look like EMP-1234. Which constraint would you use?",
          answer:
            "Use @Pattern with a regular expression such as ^EMP-[0-9]{4}$."
        },

        {
          question:
            "A date-of-birth field accepts tomorrow's date. What would you check?",
          answer:
            "Check that the field has @Past and that validation is actually triggered, for example by using @Valid on the request body."
        },

        {
          question:
            "An appointment scheduled for today should be accepted. Should you use @Future?",
          answer:
            "If today is valid, @Future is too strict because it requires a strictly future value. Consider @FutureOrPresent instead, according to the application's time semantics."
        },

        {
          question:
            "A phone number must contain exactly ten digits. What validation would you use?",
          answer:
            "A @Pattern such as ^[0-9]{10}$ can enforce exactly ten digits. @Size can additionally describe length, but the pattern is useful for requiring digits only."
        },

        {
          question:
            "The frontend validates the appointment date, but an attacker sends an old date directly to the API. What should happen?",
          answer:
            "The backend should independently validate the request. Frontend validation is not a security or data-integrity boundary."
        },

        {
          question:
            "The application requires an appointment at least 24 hours from now. Is @Future enough?",
          answer:
            "No. @Future only expresses that the value is in the future. A 24-hour minimum is a more specific business rule that should normally be enforced in application logic or a suitable custom validation rule."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@Email validates email-like string format.",
        "@Email does not verify mailbox existence.",
        "@Email does not by itself make a field mandatory.",
        "@Pattern validates a string against a regular expression.",
        "@Size validates size or length.",
        "@Past requires a strictly past temporal value.",
        "@PastOrPresent allows past or present.",
        "@Future requires a strictly future temporal value.",
        "@FutureOrPresent allows future or present.",
        "Use @NotBlank with @Email when email is required.",
        "Use @NotNull with @Past or @Future when the date is required.",
        "Use java.time types for modern date/time handling.",
        "Use @Valid to trigger DTO validation in REST request bodies.",
        "Complex business rules belong in service/domain logic.",
        "Backend validation is mandatory even when the frontend validates input."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "@Email, @Pattern, @Past, and @Future are Bean Validation constraints used for format and temporal validation. @Email validates an email-like string format, while @Pattern validates a string against a regular expression. @Past requires a supported date or time to be strictly in the past, and @Future requires it to be strictly in the future. These constraints do not generally make values mandatory, so @NotBlank or @NotNull should be added when required. In Spring Boot REST APIs, these annotations are commonly placed on request DTOs and triggered with @Valid."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "Remember the four constraints as four different jobs: @Email checks email format, @Pattern checks custom string format, @Past checks a past date or time, and @Future checks a future date or time.",
        "Remember that format and temporal constraints should not be confused with required-value constraints. @Email and @Future do not automatically mean 'must not be null'.",
        "For required email, use @NotBlank + @Email. For a required past date, use @NotNull + @Past. For a required future date, use @NotNull + @Future.",
        "Remember the strictness difference: @Past is strictly past, while @PastOrPresent also permits the present. @Future is strictly future, while @FutureOrPresent also permits the present.",
        "Use @Pattern for custom string formats, but prefer built-in constraints when they express the rule more clearly.",
        "For interviews, explain that Bean Validation handles declarative input constraints, while complex business rules such as 'appointment must be at least 24 hours from now' usually belong in the service or domain layer."
      ]
    }
  ]
};
