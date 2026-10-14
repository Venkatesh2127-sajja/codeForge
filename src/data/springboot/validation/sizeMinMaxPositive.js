
export const sizeMinMaxPositive = {
  id: 605,

  title: "@Size, @Min, @Max, @Positive",

  slug: "size-min-max-positive",

  topicTitle: "Spring Boot Validation",

  description:
    "Learn how to validate string lengths, collection sizes, numeric ranges, and positive numeric values using common Bean Validation constraints.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "range-validation",

      title: "Why Range Validation is Required",

      paragraphs: [
        "Required-value validation only checks whether data exists. Many applications also need to restrict how much data can be supplied or which numeric values are acceptable.",
        "For example, an employee name might need to contain between 2 and 100 characters, while salary might need to be a positive value.",
        "Bean Validation provides different constraints for different types of rules. @Size is used for size or length, @Min and @Max are used for numeric boundaries, and @Positive is used when a number must be greater than zero."
      ],

      code: {
        language: "text",
        code: `Input Validation
      |
      +---------------------+
      |                     |
      v                     v
Size / Length          Numeric Value
      |                     |
      v                     v
@Size                  @Min / @Max
                          |
                          v
                     @Positive`
      }
    },

    {
      id: "size",

      title: "@Size",

      paragraphs: [
        "@Size checks the size of supported strings, collections, maps, or arrays. It can define minimum and maximum boundaries.",
        "It is useful when an application needs to control the amount of text or the number of elements in a collection."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Size;

public record EmployeeRequest(

    @Size(
        min = 2,
        max = 100,
        message = "Name must contain 2 to 100 characters"
    )
    String name,

    @Size(
        min = 1,
        max = 10,
        message = "Skills must contain 1 to 10 items"
    )
    List<String> skills

) {
}`
      },

      bullets: [
        "Useful for String length.",
        "Useful for collection size.",
        "Useful for map size.",
        "Useful for array size.",
        "Can define minimum and maximum values."
      ]
    },

    {
      id: "size-string",

      title: "@Size with String",

      paragraphs: [
        "@Size can restrict the length of a String.",
        "For example, a username can be required to contain between 3 and 20 characters."
      ],

      code: {
        language: "java",
        code: `@Size(
    min = 3,
    max = 20,
    message = "Username must contain 3 to 20 characters"
)
String username;`
      },

      bullets: [
        "\"Jo\" → invalid",
        "\"John\" → valid",
        "A 20-character value → valid",
        "A value longer than 20 characters → invalid"
      ]
    },

    {
      id: "size-collection",

      title: "@Size with Collections",

      paragraphs: [
        "@Size can validate the number of elements in a collection.",
        "This is useful when an API should accept a minimum or maximum number of items."
      ],

      code: {
        language: "java",
        code: `@Size(
    min = 1,
    max = 5,
    message = "Select between 1 and 5 skills"
)
List<String> skills;`
      },

      code: {
        language: "text",
        code: `skills = []

size = 0
      |
      v
FAIL


skills = ["Java"]

size = 1
      |
      v
PASS


skills = ["Java", "Spring", "SQL",
          "Docker", "Git", "React"]

size = 6
      |
      v
FAIL`
      }
    },

    {
      id: "size-null",

      title: "@Size and Null Values",

      paragraphs: [
        "@Size does not generally make a value mandatory. If the value is null, @Size itself does not reject it.",
        "If the field must be present as well as satisfy a size requirement, combine @Size with @NotNull or @NotBlank depending on the type."
      ],

      code: {
        language: "java",
        code: `// Optional name

@Size(min = 2, max = 100)
String name;


// Required name

@NotBlank
@Size(min = 2, max = 100)
String name;`
      },

      bullets: [
        "@Size handles size.",
        "@NotNull handles null.",
        "@NotBlank handles required meaningful text.",
        "Use multiple constraints when multiple rules are required."
      ]
    },

    {
      id: "min",

      title: "@Min",

      paragraphs: [
        "@Min defines the minimum numeric value allowed.",
        "The value must be greater than or equal to the specified minimum."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Min;

public record EmployeeRequest(

    @Min(
        value = 18,
        message = "Age must be at least 18"
    )
    Integer age

) {
}`
      },

      paragraphs: [
        "An age of 17 fails the constraint, while 18 or a greater value satisfies it."
      ],

      bullets: [
        "17 → invalid",
        "18 → valid",
        "25 → valid"
      ]
    },

    {
      id: "min-null",

      title: "@Min and Null Values",

      paragraphs: [
        "@Min is a numeric boundary constraint and does not normally act as a required-value constraint.",
        "If the numeric field must be supplied, combine @Min with @NotNull."
      ],

      code: {
        language: "java",
        code: `@NotNull(message = "Age is required")
@Min(
    value = 18,
    message = "Age must be at least 18"
)
Integer age;`
      }
    },

    {
      id: "min-decimal",

      title: "@Min and Decimal Numbers",

      paragraphs: [
        "@Min is intended for numeric values with an integral minimum value. For decimal business values such as prices, @DecimalMin is often more appropriate."
      ],

      code: {
        language: "java",
        code: `@DecimalMin(
    value = "0.01",
    message = "Price must be at least 0.01"
)
BigDecimal price;`
      },

      bullets: [
        "@Min is commonly used for integral numeric boundaries.",
        "@DecimalMin is useful when decimal precision matters.",
        "Choose the constraint based on the numeric type and business rule."
      ]
    },

    {
      id: "max",

      title: "@Max",

      paragraphs: [
        "@Max defines the maximum numeric value allowed.",
        "The value must be less than or equal to the specified maximum."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Max;

public record EmployeeRequest(

    @Max(
        value = 60,
        message = "Age cannot exceed 60"
    )
    Integer age

) {
}`
      },

      bullets: [
        "60 → valid",
        "59 → valid",
        "61 → invalid"
      ]
    },

    {
      id: "min-max",

      title: "Using @Min and @Max Together",

      paragraphs: [
        "@Min and @Max can be combined to define an allowed numeric range."
      ],

      code: {
        language: "java",
        code: `@NotNull
@Min(
    value = 18,
    message = "Age must be at least 18"
)
@Max(
    value = 60,
    message = "Age cannot exceed 60"
)
Integer age;`
      },

      code: {
        language: "text",
        code: `Allowed range:

18 <= age <= 60

17  -> FAIL
18  -> PASS
30  -> PASS
60  -> PASS
61  -> FAIL`
      }
    },

    {
      id: "positive",

      title: "@Positive",

      paragraphs: [
        "@Positive requires a numeric value to be greater than zero.",
        "It is useful when zero and negative values are not valid for a business field."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Positive;

public record ProductRequest(

    @Positive(
        message = "Price must be positive"
    )
    BigDecimal price

) {
}`
      },

      bullets: [
        "Positive value → valid",
        "Zero → invalid",
        "Negative value → invalid"
      ]
    },

    {
      id: "positive-examples",

      title: "@Positive Examples",

      code: {
        language: "text",
        code: `@Positive

100      -> PASS
10       -> PASS
1        -> PASS
0        -> FAIL
-1       -> FAIL
-100     -> FAIL`
      },

      paragraphs: [
        "@Positive expresses a strict greater-than-zero rule. If zero should also be accepted, use @PositiveOrZero instead."
      ]
    },

    {
      id: "positive-or-zero",

      title: "@Positive vs @PositiveOrZero",

      paragraphs: [
        "@Positive requires a number to be strictly greater than zero. @PositiveOrZero allows zero as well."
      ],

      code: {
        language: "java",
        code: `@Positive
BigDecimal price;


// Zero is allowed

@PositiveOrZero
BigDecimal balance;`
      },

      bullets: [
        "@Positive: 0 is invalid.",
        "@PositiveOrZero: 0 is valid.",
        "Both reject negative values."
      ]
    },

    {
      id: "negative-constraints",

      title: "Related Negative Constraints",

      paragraphs: [
        "Bean Validation also provides @Negative and @NegativeOrZero for applications where negative values are meaningful."
      ],

      code: {
        language: "java",
        code: `@Negative
Integer temperatureChange;


@NegativeOrZero
Integer discountAdjustment;`
      },

      bullets: [
        "@Negative requires a value less than zero.",
        "@NegativeOrZero allows zero and negative values."
      ]
    },

    {
      id: "combined",

      title: "Combining Constraints",

      code: {
        language: "java",
        code: `public record EmployeeRequest(

    @NotBlank
    @Size(
        min = 2,
        max = 100
    )
    String name,

    @NotNull
    @Min(18)
    @Max(60)
    Integer age,

    @NotNull
    @Positive
    BigDecimal salary

) {
}`
      },

      paragraphs: [
        "Multiple constraints can be applied to the same field when the business rule requires more than one validation condition.",
        "For example, @NotNull ensures salary is supplied while @Positive ensures that the supplied salary is greater than zero."
      ]
    },

    {
      id: "constraint-responsibilities",

      title: "Understanding Each Constraint's Responsibility",

      code: {
        language: "text",
        code: `@NotNull
        |
        +--> Is a value supplied?


@Size
        |
        +--> Is the size/length within limits?


@Min
        |
        +--> Is the number >= minimum?


@Max
        |
        +--> Is the number <= maximum?


@Positive
        |
        +--> Is the number > 0?`
      }
    },

    {
      id: "size-vs-min",

      title: "Difference Between @Size and @Min",

      paragraphs: [
        "@Size and @Min may both contain a number in their configuration, but they validate completely different things.",
        "@Size validates the size or length of supported values. @Min validates the numeric value itself."
      ],

      code: {
        language: "java",
        code: `@Size(min = 2)
String name;


// Minimum numeric value

@Min(18)
Integer age;`
      },

      bullets: [
        "@Size(2) on String means at least 2 characters.",
        "@Min(18) on Integer means value must be at least 18.",
        "@Size is not a numeric-range constraint."
      ]
    },

    {
      id: "size-vs-positive",

      title: "Difference Between @Size and @Positive",

      paragraphs: [
        "@Size is related to the size of a supported value. @Positive is related to the numeric value being greater than zero."
      ],

      code: {
        language: "java",
        code: `@Size(min = 1)
List<String> skills;


@Positive
BigDecimal salary;`
      }
    },

    {
      id: "decimal-constraints",

      title: "Decimal Numeric Constraints",

      paragraphs: [
        "For decimal values such as prices, percentages, and monetary amounts, decimal-specific constraints can be more appropriate than integral numeric constraints."
      ],

      code: {
        language: "java",
        code: `@DecimalMin("0.01")
BigDecimal price;


@DecimalMax("1000000.00")
BigDecimal salary;


@Positive
BigDecimal quantity;`
      },

      bullets: [
        "@DecimalMin defines a decimal minimum.",
        "@DecimalMax defines a decimal maximum.",
        "@Positive can express a strict greater-than-zero rule for supported numeric values.",
        "Use BigDecimal for financial values when decimal precision matters."
      ]
    },

    {
      id: "controller-example",

      title: "Using Range Constraints in a REST API",

      code: {
        language: "java",
        code: `public record ProductRequest(

    @NotBlank
    @Size(
        min = 2,
        max = 100
    )
    String name,

    @NotNull
    @Positive
    BigDecimal price,

    @NotNull
    @Min(1)
    @Max(100)
    Integer quantity

) {
}


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @PostMapping
    public ResponseEntity<?> createProduct(
            @Valid
            @RequestBody ProductRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.create(request));
    }
}`
      },

      paragraphs: [
        "The request DTO defines the input rules, while the controller activates those rules with @Valid."
      ]
    },

    {
      id: "valid-request",

      title: "Valid Request Example",

      code: {
        language: "json",
        code: `{
  "name": "Laptop",
  "price": 75000.00,
  "quantity": 2
}`
      },

      paragraphs: [
        "This request satisfies the example constraints because the name has an acceptable length, price is positive, and quantity is between 1 and 100."
      ]
    },

    {
      id: "invalid-request",

      title: "Invalid Request Example",

      code: {
        language: "json",
        code: `{
  "name": "A",
  "price": 0,
  "quantity": 150
}`
      },

      paragraphs: [
        "The name can fail @Size, the price fails @Positive because zero is not positive, and the quantity fails @Max(100)."
      ]
    },

    {
      id: "validation-flow",

      title: "Complete Validation Flow",

      code: {
        language: "text",
        code: `Client
   |
   | POST /api/products
   v
JSON
   |
   v
@RequestBody
   |
   v
ProductRequest
   |
   v
@Valid
   |
   v
Bean Validation
   |
   +-------------------------+
   |                         |
   v                         v
Valid                    Invalid
   |                         |
   v                         v
Controller              Validation Error
   |                         |
   v                         v
Service                @RestControllerAdvice
   |                         |
   v                         v
Database                 HTTP 400`
      }
    },

    {
      id: "null-behavior",

      title: "Important Null Behavior",

      paragraphs: [
        "Range and size constraints generally do not make a field mandatory by themselves. A null value is normally considered valid for these constraints.",
        "If the field must exist, combine the range or size constraint with @NotNull, @NotBlank, or @NotEmpty as appropriate."
      ],

      code: {
        language: "java",
        code: `// Optional numeric value

@Positive
BigDecimal price;


// Required positive numeric value

@NotNull
@Positive
BigDecimal price;


// Required text with length restriction

@NotBlank
@Size(min = 2, max = 100)
String name;`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Using @Min to validate String length.",
        "Using @Size to validate numeric values.",
        "Assuming @Positive allows zero.",
        "Forgetting that @Positive rejects negative values and zero.",
        "Using @Min for decimal precision requirements without checking whether @DecimalMin is more appropriate.",
        "Assuming @Size automatically makes a field required.",
        "Forgetting @NotNull when a numeric field must be supplied.",
        "Using @Size on a number.",
        "Using @Min or @Max when the actual requirement is collection size.",
        "Forgetting @Valid on @RequestBody.",
        "Relying only on frontend validation.",
        "Not testing boundary values such as exactly min and exactly max."
      ]
    },

    {
      id: "boundary-testing",

      title: "Boundary Testing",

      paragraphs: [
        "Range constraints should be tested at the boundaries because off-by-one errors are common.",
        "For @Min and @Max, the boundary value itself is valid because the comparisons are inclusive."
      ],

      code: {
        language: "text",
        code: `@Min(18)
@Max(60)

17  -> FAIL
18  -> PASS
19  -> PASS
59  -> PASS
60  -> PASS
61  -> FAIL


@Size(min = 2, max = 5)

1 character  -> FAIL
2 characters -> PASS
3 characters -> PASS
5 characters -> PASS
6 characters -> FAIL`
      }
    },

    {
      id: "best-practices",

      title: "Best Practices",

      bullets: [
        "Use @Size for string, collection, map, and array size requirements.",
        "Use @Min and @Max for numeric boundaries when appropriate.",
        "Use @Positive when a number must be strictly greater than zero.",
        "Use @PositiveOrZero when zero is a valid value.",
        "Use @DecimalMin and @DecimalMax when decimal boundary semantics are required.",
        "Combine range constraints with @NotNull when the value is mandatory.",
        "Combine @Size with @NotBlank when required text must also have a specific length.",
        "Test minimum, maximum, below-minimum, and above-maximum values.",
        "Keep validation rules close to the API input DTO.",
        "Keep complex business rules in the service or domain layer.",
        "Do not rely only on frontend validation.",
        "Use meaningful validation messages."
      ]
    },

    {
      id: "testing",

      title: "Testing Range Validation",

      paragraphs: [
        "Validation tests should focus on boundary values and invalid values.",
        "Controller tests can verify that invalid requests produce HTTP 400 responses."
      ],

      code: {
        language: "java",
        code: `mockMvc.perform(
    post("/api/products")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {
                "name": "A",
                "price": 0,
                "quantity": 150
            }
            """)
)
.andExpect(status().isBadRequest());`
      },

      bullets: [
        "Test exactly the minimum value.",
        "Test below the minimum.",
        "Test exactly the maximum value.",
        "Test above the maximum.",
        "Test zero for @Positive.",
        "Test negative values.",
        "Test null values when fields are required.",
        "Test string and collection size boundaries."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What does @Size validate?",

          answer:
            "@Size validates the size or length of supported values such as strings, collections, maps, and arrays."
        },

        {
          question: "Difference between @Size and @Min?",

          answer:
            "@Size validates the size or length of supported values, while @Min validates a numeric value against a minimum boundary."
        },

        {
          question: "What does @Positive check?",

          answer:
            "@Positive requires a numeric value to be greater than zero."
        },

        {
          question: "Does @Positive allow zero?",

          answer:
            "No. @Positive requires the value to be strictly greater than zero. Use @PositiveOrZero if zero should be accepted."
        },

        {
          question: "Does @Min include the minimum value?",

          answer:
            "Yes. @Min is inclusive. For example, @Min(18) accepts 18 and greater values."
        },

        {
          question: "Does @Max include the maximum value?",

          answer:
            "Yes. @Max is inclusive. For example, @Max(60) accepts 60 and lower values."
        },

        {
          question: "Can @Size validate a List?",

          answer:
            "Yes. @Size can validate the number of elements in supported collections."
        },

        {
          question: "Can @Size validate an Integer?",

          answer:
            "No. @Size is for supported size-based values such as strings, collections, maps, and arrays. Use numeric constraints for numbers."
        },

        {
          question: "Does @Size make a field mandatory?",

          answer:
            "No. If the field must not be null, combine @Size with an appropriate presence constraint such as @NotNull or @NotBlank."
        },

        {
          question: "What should you use for a positive BigDecimal price?",

          answer:
            "@Positive is appropriate when the value must be strictly greater than zero. For a more specific decimal minimum such as 0.01, @DecimalMin can be used."
        },

        {
          question: "What is the difference between @Positive and @PositiveOrZero?",

          answer:
            "@Positive rejects zero and negative values, while @PositiveOrZero allows zero but rejects negative values."
        },

        {
          question: "Why would you use @DecimalMin instead of @Min?",

          answer:
            "@DecimalMin is useful when the minimum boundary has decimal precision or when the numeric value is represented with decimal semantics, such as a monetary amount."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An employee age must be between 18 and 60 inclusive. Which constraints would you use?",

          answer:
            "Use @Min(18) and @Max(60). Add @NotNull if age is mandatory."
        },

        {
          question:
            "A product price must be greater than zero. Which constraint would you use?",

          answer:
            "Use @Positive. If the field is mandatory, combine it with @NotNull."
        },

        {
          question:
            "A product price can be zero but cannot be negative. Which constraint would you use?",

          answer:
            "Use @PositiveOrZero."
        },

        {
          question:
            "A username must contain between 3 and 20 characters. Which constraint would you use?",

          answer:
            "Use @Size(min = 3, max = 20). If the username is required and whitespace-only input should be rejected, combine it with @NotBlank."
        },

        {
          question:
            "A request accepts a maximum of 10 skills. Should you use @Max(10)?",

          answer:
            "No. @Max is for numeric values. Use @Size(max = 10) for a collection containing at most 10 elements."
        },

        {
          question:
            "The API accepts a salary of zero even though the requirement says salary must be positive. What should you check?",

          answer:
            "Check that @Positive is applied to the correct DTO field and that validation is triggered with @Valid. @Positive rejects zero."
        },

        {
          question:
            "The API rejects null salary even though only @Positive is present. What should you investigate?",

          answer:
            "Check whether another constraint such as @NotNull is present or whether application/business logic is performing an additional null check. @Positive itself is not the required-value constraint."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@Size validates size or length.",
        "@Size works with supported strings, collections, maps, and arrays.",
        "@Min validates a numeric minimum.",
        "@Max validates a numeric maximum.",
        "@Min and @Max are inclusive.",
        "@Positive requires a value greater than zero.",
        "@Positive rejects zero.",
        "@PositiveOrZero allows zero.",
        "@Negative requires a value less than zero.",
        "@NegativeOrZero allows zero.",
        "@DecimalMin and @DecimalMax are useful for decimal boundaries.",
        "Range and size constraints generally do not make a value mandatory.",
        "Combine @NotNull with numeric constraints when a number is required.",
        "Combine @NotBlank with @Size when required text also needs length limits.",
        "Test boundary values carefully.",
        "Use @Valid to trigger DTO validation in REST APIs."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "@Size, @Min, @Max, and @Positive are Bean Validation constraints used for size and numeric validation. @Size validates the size or length of supported values such as Strings, collections, maps, and arrays. @Min defines an inclusive minimum numeric value, while @Max defines an inclusive maximum numeric value. @Positive requires a numeric value to be strictly greater than zero. These constraints generally do not make a field mandatory, so @NotNull, @NotBlank, or another appropriate presence constraint should be added when required."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Interview Notes",

      paragraphs: [
        "The easiest way to remember these constraints is: @Size is about how much data exists, @Min and @Max are about numeric boundaries, and @Positive is about whether a number is greater than zero.",
        "A common interview trap is confusing @Size with @Min. @Size(2) on a String means the String must have at least two characters, while @Min(2) on an Integer means the numeric value must be at least two.",
        "Another important point is that @Positive is strict. Zero is invalid. If zero should be accepted, use @PositiveOrZero.",
        "@Min and @Max are inclusive. Therefore, @Min(18) accepts 18 and @Max(60) accepts 60.",
        "For financial or decimal boundaries, consider decimal-specific constraints such as @DecimalMin and @DecimalMax.",
        "Remember that size and range constraints generally do not replace required-value constraints. If a field must be supplied, combine them with @NotNull, @NotBlank, or @NotEmpty as appropriate."
      ]
    }
  ]
};
