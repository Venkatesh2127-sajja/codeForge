
export const notNullNotEmptyNotBlank = {
  id: 604,

  title: "@NotNull, @NotEmpty, @NotBlank",

  slug: "notnull-notempty-notblank",

  topicTitle: "Spring Boot Validation",

  description:
    "Understand the difference between @NotNull, @NotEmpty, and @NotBlank and learn when each constraint should be used.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "three-constraints",

      title: "Three Common Required-Value Constraints",

      paragraphs: [
        "@NotNull, @NotEmpty, and @NotBlank are commonly used to ensure that a value is provided. However, they do not mean exactly the same thing.",
        "@NotNull checks only that a value is not null. @NotEmpty additionally checks that a supported collection, map, array, or string contains at least one element or character. @NotBlank is specifically designed for strings and also rejects strings containing only whitespace.",
        "The correct constraint depends on the type of the field and what the application considers a valid value."
      ],

      code: {
        language: "text",
        code: `@NotNull
        |
        +-- Value must not be null
        |
        +-- Empty string may still be valid


@NotEmpty
        |
        +-- Value must not be null
        |
        +-- Value must contain something


@NotBlank
        |
        +-- For text
        |
        +-- Must not be null
        +-- Must not be empty
        +-- Must not contain only whitespace`
      }
    },

    {
      id: "notnull",

      title: "@NotNull",

      paragraphs: [
        "@NotNull ensures that a value is not null.",
        "It does not check the length of a String, the number of elements in a collection, or whether a number is zero.",
        "It is useful for required object references, numbers, dates, enums, nested DTOs, and other values where null itself is the problem."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.NotNull;

public record EmployeeRequest(

    @NotNull(message = "Age is required")
    Integer age

) {
}`
      },

      bullets: [
        "null → invalid",
        "0 → valid",
        "10 → valid",
        "Negative numbers → valid unless another constraint rejects them",
        "The constraint checks only nullability"
      ]
    },

    {
      id: "notnull-string",

      title: "@NotNull on a String",

      paragraphs: [
        "@NotNull can be applied to a String, but it only checks whether the reference is null.",
        "If an empty string or whitespace-only string should also be rejected, @NotBlank is normally more appropriate."
      ],

      code: {
        language: "java",
        code: `@NotNull
String name;

// Results

null      -> invalid
""        -> valid
"   "     -> valid
"John"    -> valid`
      }
    },

    {
      id: "notnull-number",

      title: "@NotNull Does Not Validate Numeric Range",

      paragraphs: [
        "@NotNull only checks whether a numeric value exists. It does not determine whether the number is positive, negative, zero, or within a particular range."
      ],

      code: {
        language: "java",
        code: `@NotNull(message = "Age is required")
Integer age;`
      },

      bullets: [
        "Use @NotNull when the value must exist.",
        "Use @Min or @Max for minimum and maximum values.",
        "Use @Positive when the value must be greater than zero.",
        "Use @PositiveOrZero when zero should also be accepted."
      ]
    },

    {
      id: "notempty",

      title: "@NotEmpty",

      paragraphs: [
        "@NotEmpty checks that a supported value is not null and contains at least one element or character.",
        "It can be used with supported CharSequence values such as String, as well as collections, maps, and arrays.",
        "Unlike @NotBlank, @NotEmpty does not treat whitespace-only text as blank."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record EmployeeRequest(

    @NotEmpty(message = "Skills are required")
    List<String> skills

) {
}`
      },

      bullets: [
        "null → invalid",
        "empty list → invalid",
        "non-empty list → valid",
        "For a String, empty text is invalid.",
        "Whitespace-only String is not the same as blank text."
      ]
    },

    {
      id: "notempty-string",

      title: "@NotEmpty with String",

      paragraphs: [
        "@NotEmpty can be used when a String must contain at least one character, but it does not reject whitespace-only content."
      ],

      code: {
        language: "java",
        code: `@NotEmpty
String name;


// Examples

null       -> invalid
""         -> invalid
" "        -> valid
"John"     -> valid`
      },

      paragraphs: [
        "If a value such as a person's name must contain meaningful text, @NotBlank is usually the better choice."
      ]
    },

    {
      id: "notempty-collection",

      title: "@NotEmpty with Collections",

      paragraphs: [
        "@NotEmpty is particularly useful when an API requires at least one element in a collection."
      ],

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotEmpty(
        message = "At least one skill is required"
    )
    List<String> skills

) {
}`
      },

      bullets: [
        "null list → invalid",
        "empty list → invalid",
        "list containing one item → valid",
        "list containing multiple items → valid"
      ]
    },

    {
      id: "notempty-map-array",

      title: "@NotEmpty with Maps and Arrays",

      paragraphs: [
        "@NotEmpty can also be used with supported map and array values when the application requires at least one element."
      ],

      code: {
        language: "java",
        code: `@NotEmpty
Map<String, String> attributes;


@NotEmpty
String[] roles;`
      }
    },

    {
      id: "notblank",

      title: "@NotBlank",

      paragraphs: [
        "@NotBlank is intended for character sequences such as String values.",
        "It rejects null, empty strings, and strings containing only whitespace.",
        "It is generally the most useful choice when a text field must contain meaningful text."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.NotBlank;

public record EmployeeRequest(

    @NotBlank(message = "Name is required")
    String name

) {
}`
      },

      bullets: [
        "null → invalid",
        "\"\" → invalid",
        "\"   \" → invalid",
        "\"John\" → valid"
      ]
    },

    {
      id: "notblank-whitespace",

      title: "Why @NotBlank Rejects Whitespace",

      paragraphs: [
        "Whitespace-only input often appears valid to a simple empty check because the string contains characters. However, from a user-input perspective, a value such as three spaces usually does not represent meaningful text.",
        "@NotBlank is designed for this situation."
      ],

      code: {
        language: "text",
        code: `""
   |
   +--> no characters
   |
   +--> @NotBlank rejects


"   "
   |
   +--> only whitespace
   |
   +--> @NotBlank rejects


"John"
   |
   +--> meaningful text
   |
   +--> @NotBlank accepts`
      }
    },

    {
      id: "comparison",

      title: "Comparison",

      code: {
        language: "text",
        code: `@NotNull
Checks:
    value != null

Typical use:
    Integer
    LocalDate
    Enum
    DTO
    Object reference


@NotEmpty
Checks:
    value != null
    AND value contains at least one element/character

Typical use:
    String
    List
    Set
    Map
    Array


@NotBlank
Checks:
    value is not null
    AND value is not empty
    AND value is not whitespace-only

Typical use:
    String / CharSequence`
      }
    },

    {
      id: "comparison-table",

      title: "Constraint Comparison Table",

      code: {
        language: "text",
        code: `Input                 @NotNull   @NotEmpty   @NotBlank

null                    FAIL        FAIL        FAIL
""                      PASS        FAIL        FAIL
"   "                   PASS        PASS        FAIL
"John"                  PASS        PASS        PASS

empty List              PASS        FAIL        N/A
non-empty List           PASS        PASS        N/A

0                       PASS        N/A         N/A
10                      PASS        N/A         N/A`
      },

      paragraphs: [
        "The table shows why the annotations should not be treated as interchangeable. Each constraint expresses a different requirement."
      ]
    },

    {
      id: "practical-example",

      title: "Practical DTO Example",

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotNull(message = "Age is required")
    Integer age,

    @NotEmpty(message = "Skills are required")
    List<String> skills

) {
}`
      },

      paragraphs: [
        "This DTO demonstrates the typical use of each annotation. The name must contain meaningful text, age must be supplied, and the skills collection must contain at least one element."
      ]
    },

    {
      id: "controller-validation",

      title: "Using the DTO in a REST Controller",

      paragraphs: [
        "The constraints on the DTO are evaluated when the controller uses @Valid on the request body."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public ResponseEntity<?> createEmployee(
            @Valid
            @RequestBody EmployeeCreateRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employeeService.create(request));
    }
}`
      },

      bullets: [
        "@RequestBody converts JSON into EmployeeCreateRequest.",
        "@Valid triggers Bean Validation.",
        "Invalid values prevent normal controller processing.",
        "A validation exception can be handled globally with @RestControllerAdvice."
      ]
    },

    {
      id: "request-example",

      title: "Valid Request Example",

      code: {
        language: "json",
        code: `{
  "name": "John",
  "age": 25,
  "skills": [
    "Java",
    "Spring Boot"
  ]
}`
      },

      paragraphs: [
        "This request satisfies the three constraints because name contains meaningful text, age is not null, and skills contains elements."
      ]
    },

    {
      id: "invalid-request",

      title: "Invalid Request Example",

      code: {
        language: "json",
        code: `{
  "name": "   ",
  "age": null,
  "skills": []
}`
      },

      paragraphs: [
        "The name fails @NotBlank, age fails @NotNull, and skills fails @NotEmpty."
      ]
    },

    {
      id: "validation-flow",

      title: "Complete Validation Flow",

      code: {
        language: "text",
        code: `Client
  |
  | POST /api/employees
  v
JSON Request
  |
  v
@RequestBody
  |
  v
EmployeeCreateRequest
  |
  v
@Valid
  |
  v
Bean Validation
  |
  +---------------------------+
  |                           |
  v                           v
Valid                      Invalid
  |                           |
  v                           v
Controller                 Validation
  |                         Exception
  v                           |
Service                       v
  |                     Global Handler
  v                           |
Database                      v
                         HTTP 400`
      }
    },

    {
      id: "notnull-vs-primitive",

      title: "@NotNull and Primitive Types",

      paragraphs: [
        "@NotNull requires a value that can actually be null. Java primitive types such as int and boolean cannot contain null, so wrapper types are normally used when null must be distinguishable from a real value."
      ],

      code: {
        language: "java",
        code: `// Can be null
@NotNull
Integer age;


// Cannot be null
int age;`
      },

      paragraphs: [
        "For a required numeric request field where null and zero have different meanings, Integer can be more appropriate than int."
      ]
    },

    {
      id: "nested-dto",

      title: "@NotNull with Nested DTOs",

      paragraphs: [
        "@NotNull can ensure that a nested object exists. If the nested object's own fields should also be validated, combine @NotNull with @Valid."
      ],

      code: {
        language: "java",
        code: `public record AddressRequest(

    @NotBlank
    String city

) {
}


public record EmployeeRequest(

    @NotBlank
    String name,

    @NotNull
    @Valid
    AddressRequest address

) {
}`
      },

      bullets: [
        "@NotNull checks that address exists.",
        "@Valid cascades validation into AddressRequest.",
        "Without @Valid, the nested object's constraints are not automatically cascaded."
      ]
    },

    {
      id: "collection-element-validation",

      title: "Validating Collection Elements",

      paragraphs: [
        "@NotEmpty can ensure that a collection contains at least one element, while @Valid or element constraints can validate the individual elements."
      ],

      code: {
        language: "java",
        code: `public record SkillRequest(

    @NotBlank
    String name

) {
}


public record EmployeeRequest(

    @NotEmpty
    List<@Valid SkillRequest> skills

) {
}`
      },

      paragraphs: [
        "Here @NotEmpty validates the collection itself, while @Valid validates each SkillRequest element."
      ]
    },

    {
      id: "notblank-vs-size",

      title: "@NotBlank vs @Size",

      paragraphs: [
        "@NotBlank answers whether text contains meaningful non-whitespace content. @Size answers whether the value has an acceptable size or length.",
        "They can be combined when both requirements matter."
      ],

      code: {
        language: "java",
        code: `@NotBlank(message = "Username is required")
@Size(
    min = 3,
    max = 20,
    message = "Username must contain 3 to 20 characters"
)
String username;`
      },

      bullets: [
        "@NotBlank checks meaningful text.",
        "@Size checks length.",
        "Combining them can express both requirements clearly."
      ]
    },

    {
      id: "notempty-vs-size",

      title: "@NotEmpty vs @Size",

      paragraphs: [
        "@NotEmpty requires at least one element or character. @Size allows a specific minimum and maximum size.",
        "If the application requires a collection to contain between 1 and 10 items, @Size can express that more precisely."
      ],

      code: {
        language: "java",
        code: `@Size(
    min = 1,
    max = 10,
    message = "Select between 1 and 10 skills"
)
List<String> skills;`
      },

      paragraphs: [
        "@NotEmpty is useful for a simple non-empty requirement. @Size is useful when exact size limits matter."
      ]
    },

    {
      id: "optional-fields",

      title: "Optional Fields",

      paragraphs: [
        "Not every field in a request must be required. Validation annotations should reflect the actual API contract.",
        "An optional String may have no @NotBlank constraint, while a supplied value can still be checked with other constraints."
      ],

      code: {
        language: "java",
        code: `public record EmployeeUpdateRequest(

    @NotBlank
    String name,

    String nickname,

    @Size(max = 500)
    String description

) {
}`
      },

      bullets: [
        "Do not add required-value constraints to fields that are intentionally optional.",
        "Optional values can still have format or size constraints.",
        "Required and optional fields should be defined according to the endpoint's contract."
      ]
    },

    {
      id: "validation-vs-database",

      title: "Validation vs Database Constraints",

      paragraphs: [
        "Bean Validation improves API input validation, but it does not replace database constraints.",
        "For example, @NotNull can reject missing API input, while a database NOT NULL constraint protects the stored data."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
@NotNull / @NotBlank
  |
  v
Service
  |
  v
Database NOT NULL / constraints
  |
  v
Stored Data`
      },

      bullets: [
        "Application validation improves user feedback.",
        "Database constraints provide data-integrity protection.",
        "Critical data-integrity rules should be enforced at the database level where appropriate.",
        "The two layers complement each other."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Using @NotNull for a String when whitespace-only input should be rejected.",
        "Assuming @NotEmpty rejects whitespace-only strings.",
        "Using @NotBlank on numbers or collections.",
        "Using @NotNull when a collection must contain at least one element.",
        "Forgetting @Valid on a request body.",
        "Using primitive int when null must be distinguished from zero.",
        "Assuming @NotNull validates numeric ranges.",
        "Assuming @NotEmpty checks the validity of elements inside a collection.",
        "Forgetting @Valid when nested DTO fields must also be validated.",
        "Treating Bean Validation as a replacement for database constraints.",
        "Adding required constraints to intentionally optional fields.",
        "Validating only on the frontend."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices",

      bullets: [
        "Use @NotNull when the value itself must not be null.",
        "Use @NotEmpty when a supported collection, map, array, or string must contain something.",
        "Use @NotBlank for required textual input.",
        "Use @Size when specific length or collection-size limits are required.",
        "Use numeric constraints such as @Min, @Max, @Positive, and @PositiveOrZero for numbers.",
        "Use @Valid for cascading validation into nested DTOs.",
        "Use meaningful validation messages.",
        "Place API input validation primarily on request DTOs.",
        "Keep business rules separate from simple input constraints.",
        "Return consistent validation errors from REST APIs.",
        "Keep database constraints for important data integrity.",
        "Test null, empty, whitespace, valid, and boundary values."
      ]
    },

    {
      id: "testing",

      title: "Testing @NotNull, @NotEmpty, and @NotBlank",

      paragraphs: [
        "Testing should verify the behavior that each constraint is intended to provide. The most important cases are null, empty, whitespace-only, and valid values."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/employees")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "name": "   ",
                "age": null,
                "skills": []
            }
            """)
)
.andExpect(status().isBadRequest())
.andExpect(jsonPath("$.errors.name")
    .value("Name is required"))
.andExpect(jsonPath("$.errors.age")
    .value("Age is required"))
.andExpect(jsonPath("$.errors.skills")
    .value("Skills are required"));`
      },

      bullets: [
        "Test null values.",
        "Test empty strings.",
        "Test whitespace-only strings.",
        "Test empty collections.",
        "Test valid values.",
        "Test boundary values when using @Size or numeric constraints."
      ]
    },

    {
      id: "decision-guide",

      title: "Which Constraint Should I Choose?",

      code: {
        language: "text",
        code: `Question:
Can the value be null?

YES -> @NotNull


Question:
Must a collection/string/array/map contain
at least one element or character?

YES -> @NotEmpty


Question:
Is the value textual and must it contain
meaningful non-whitespace content?

YES -> @NotBlank


Question:
Does the field need a minimum/maximum size?

YES -> @Size


Question:
Does a number need a range restriction?

YES -> @Min / @Max / @Positive / @PositiveOrZero`
      }
    },

    {
      id: "real-world-example",

      title: "Real-World Employee API Example",

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

    @NotBlank(
        message = "Employee name is required"
    )
    String name,

    @NotNull(
        message = "Age is required"
    )
    @Min(
        value = 18,
        message = "Employee must be at least 18"
    )
    Integer age,

    @NotEmpty(
        message = "At least one skill is required"
    )
    List<String> skills

) {
}`
      },

      paragraphs: [
        "This example demonstrates an important principle: multiple constraints can be combined when each one represents a different rule.",
        "For age, @NotNull handles presence and @Min handles the minimum value. For name, @NotBlank handles meaningful text. For skills, @NotEmpty ensures that at least one skill is supplied."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Difference between @NotNull and @NotBlank?",

          answer:
            "@NotNull only rejects null values. @NotBlank is for character sequences and rejects null, empty, and whitespace-only values."
        },

        {
          question: "Difference between @NotEmpty and @NotBlank?",

          answer:
            "@NotEmpty checks that a supported value is non-null and contains at least one element or character. @NotBlank is specifically for character sequences and also rejects whitespace-only content."
        },

        {
          question: "Which annotation would you normally use for a required String name?",

          answer:
            "@NotBlank is generally appropriate when the name must contain meaningful text."
        },

        {
          question: "Which annotation would you use for a required Integer age?",

          answer:
            "@NotNull is appropriate when the age must be supplied. Add a numeric constraint such as @Min when a range must also be enforced."
        },

        {
          question: "Does @NotNull reject an empty String?",

          answer:
            "No. @NotNull only rejects null. An empty String is still a non-null value."
        },

        {
          question: "Does @NotEmpty reject whitespace-only Strings?",

          answer:
            "No. @NotEmpty checks that the value is non-null and non-empty, but whitespace-only text is not the same as an empty string. Use @NotBlank for meaningful text."
        },

        {
          question: "Can @NotEmpty be used with List?",

          answer:
            "Yes. @NotEmpty can require a supported collection to be non-null and contain at least one element."
        },

        {
          question: "Can @NotBlank be used with Integer?",

          answer:
            "No. @NotBlank is intended for character sequences such as String. Use @NotNull and appropriate numeric constraints for numbers."
        },

        {
          question: "Does @NotEmpty validate the elements inside a List?",

          answer:
            "No. @NotEmpty validates the collection itself. Use element constraints or @Valid to validate individual elements."
        },

        {
          question: "Can @NotNull be used with LocalDate?",

          answer:
            "Yes. @NotNull can ensure that a LocalDate value is supplied. Other temporal constraints such as @Past or @Future can validate the date's temporal meaning."
        },

        {
          question: "Why might Integer be preferred over int in a request DTO?",

          answer:
            "Integer can represent null, allowing the application to distinguish a missing value from a supplied value such as zero."
        },

        {
          question: "What is the difference between @NotEmpty and @Size(min = 1)?",

          answer:
            "@NotEmpty expresses a simple non-null and non-empty requirement, while @Size can express minimum and maximum size boundaries."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A String field contains three spaces and @NotNull accepts it. Is that expected?",

          answer:
            "Yes. @NotNull only checks for null. If whitespace-only input should be rejected, use @NotBlank."
        },

        {
          question:
            "A List field must contain at least one skill. Which constraint would you choose?",

          answer:
            "Use @NotEmpty. It rejects both null and empty collections."
        },

        {
          question:
            "An age field must be provided and must be at least 18. Which constraints would you use?",

          answer:
            "Use @NotNull to require the value and @Min(18) to enforce the minimum age."
        },

        {
          question:
            "Why doesn't @NotEmpty solve the problem of a name containing only spaces?",

          answer:
            "@NotEmpty checks whether the string contains characters, but whitespace characters still make the string non-empty. @NotBlank is designed to reject whitespace-only text."
        },

        {
          question:
            "A collection is non-empty, but one element is invalid. Will @NotEmpty detect the invalid element?",

          answer:
            "No. @NotEmpty validates the collection itself. Individual elements require their own constraints and, for nested objects, usually @Valid."
        },

        {
          question:
            "The frontend prevents an empty name, but Postman sends an empty name directly to the backend. What should the backend do?",

          answer:
            "The backend should independently validate the request using Bean Validation. Frontend validation is useful for user experience but cannot be trusted as the API's validation boundary."
        },

        {
          question:
            "The API should allow zero as an age value but must reject null. Which constraint handles that requirement?",

          answer:
            "@NotNull handles the presence requirement and still allows zero. If zero should be rejected, an additional numeric constraint is required."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@NotNull = value must not be null.",
        "@NotEmpty = supported value must not be null or empty.",
        "@NotBlank = character sequence must not be null, empty, or whitespace-only.",
        "@NotNull does not reject empty Strings.",
        "@NotEmpty does not reject whitespace-only Strings.",
        "@NotBlank is intended for text.",
        "@NotEmpty is useful for collections, maps, arrays, and supported character sequences.",
        "@NotNull is useful for numbers, dates, enums, and nested objects.",
        "Use @Size for length or collection-size limits.",
        "Use @Min/@Max for numeric boundaries.",
        "Use @Valid for nested validation.",
        "Use wrapper types such as Integer when null must be distinguishable from a primitive default.",
        "@NotEmpty validates the container, not the individual elements.",
        "Bean Validation complements database constraints.",
        "Backend validation should not depend only on frontend validation."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "@NotNull, @NotEmpty, and @NotBlank are Bean Validation constraints with different purposes. @NotNull only checks that a value is not null. @NotEmpty checks that a supported String, collection, map, or array is not null and contains at least one element or character. @NotBlank is intended for text and additionally rejects whitespace-only values. So for a required String such as a name, I would normally use @NotBlank. For a required Integer, I would use @NotNull, and if the number also needs a range restriction, I would combine it with constraints such as @Min or @Max."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "Remember the easiest distinction: @NotNull asks 'Does a value exist?', @NotEmpty asks 'Does this supported value contain at least something?', and @NotBlank asks 'Does this text contain meaningful non-whitespace content?'",
        "For a String name, @NotBlank is usually the most useful required-value constraint. For an Integer age, @NotNull handles presence while @Min or @Max can handle the numeric range.",
        "For a List of skills, @NotEmpty checks that the list itself exists and contains at least one element. It does not validate the elements inside the list.",
        "A common interview trap is whitespace. @NotNull accepts an empty String and whitespace-only String. @NotEmpty rejects an empty String but can accept whitespace-only String. @NotBlank rejects both.",
        "Another important distinction is null versus zero. @NotNull on Integer rejects null but accepts zero. If zero is invalid, a separate numeric constraint is required.",
        "In a Spring Boot REST API, these constraints are commonly placed on request DTOs and triggered using @Valid. Invalid input can then be converted into a consistent HTTP 400 validation response by a global exception handler."
      ]
    }
  ]
};
