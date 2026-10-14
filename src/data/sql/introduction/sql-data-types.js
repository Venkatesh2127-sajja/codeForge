
export const sqlDataTypes = {
  id: 2005,
  title: "SQL Data Types",
  slug: "sql-data-types",
  topicTitle: "Introduction to SQL",
  description:
    "Learn numeric, character, date/time, boolean, binary, and JSON-related data types, understand precision and storage considerations, and learn how to choose appropriate types for real-world applications.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "numeric",
      title: "1. Numeric Data Types",

      paragraphs: [
        "Numeric data types store whole numbers or numbers with fractional parts.",
        "The correct numeric type should be selected based on the valid range, precision, scale, and calculations required by the application.",
        "Choosing an appropriate type prevents overflow, unnecessary storage usage, and incorrect calculations."
      ],

      bullets: [
        "INT or INTEGER: commonly used for whole numbers.",
        "BIGINT: used when a wider integer range is required.",
        "SMALLINT: useful for smaller integer ranges where supported.",
        "DECIMAL or NUMERIC: exact decimal values, commonly used for monetary amounts.",
        "FLOAT or REAL: approximate floating-point values.",
        "DOUBLE PRECISION: approximate floating-point values with greater precision than many single-precision types."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    weight DOUBLE PRECISION
);`
      },

      output: `product_id
→ Whole-number identifier

quantity
→ Whole-number quantity

price
→ Exact decimal value

weight
→ Approximate floating-point value`
    },

    {
      id: "integer-types",
      title: "2. Integer Types",

      paragraphs: [
        "Integer types store whole numbers without fractional digits.",
        "The exact range of each integer type depends on the database product, so production applications should check the database documentation."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT,
    age INT,
    department_code SMALLINT
);`
      },

      bullets: [
        "INT is sufficient for many ordinary application identifiers and counts.",
        "BIGINT is useful when identifiers or numeric values may exceed the range of INT.",
        "SMALLINT can be useful for relatively small ranges.",
        "Do not choose BIGINT automatically for every column; choose based on realistic requirements."
      ]
    },

    {
      id: "decimal",
      title: "3. DECIMAL and NUMERIC",

      paragraphs: [
        "DECIMAL and NUMERIC represent exact decimal values with defined precision and scale in common SQL implementations.",
        "They are commonly used for money, prices, percentages that require exact decimal representation, and other values where predictable decimal arithmetic is important."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT,
    price DECIMAL(10, 2),
    discount DECIMAL(5, 2)
);`
      },

      output: `DECIMAL(10, 2)

10 → total number of digits
2  → digits after the decimal point

Example valid values:
99999999.99
1250.50
10.00`
    },

    {
      id: "precision-scale",
      title: "4. Precision and Scale",

      paragraphs: [
        "Precision is the total number of significant decimal digits allowed by the declared DECIMAL or NUMERIC type.",
        "Scale is the number of digits allowed after the decimal point.",
        "For example, DECIMAL(10, 2) has a precision of 10 and a scale of 2."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE invoices (
    amount DECIMAL(10, 2)
);`
      },

      bullets: [
        "DECIMAL(10, 2) → 10 total digits and 2 fractional digits.",
        "The exact maximum value and behavior for out-of-range values depend on the database system and SQL mode.",
        "Use enough precision for the application's expected range.",
        "For financial applications, use exact decimal types rather than approximate floating-point types."
      ]
    },

    {
      id: "floating-point",
      title: "5. FLOAT and DOUBLE",

      paragraphs: [
        "Floating-point types store approximate numeric values.",
        "They are useful for scientific calculations, measurements, and values where approximate representation is acceptable.",
        "They should generally not be the default choice for financial amounts that require exact decimal arithmetic."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE measurements (
    measurement_id INT,
    temperature DOUBLE PRECISION,
    distance DOUBLE PRECISION
);`
      },

      bullets: [
        "Floating-point values can have rounding effects.",
        "They are useful when a large numeric range or approximate representation is acceptable.",
        "Use DECIMAL or NUMERIC when exact decimal arithmetic is required."
      ]
    },

    {
      id: "character",
      title: "6. Character and Text Types",

      paragraphs: [
        "Character types store text such as names, email addresses, usernames, descriptions, and codes.",
        "VARCHAR is commonly used for variable-length strings with a declared maximum length.",
        "TEXT is available in PostgreSQL and MySQL, with product-specific behavior, limits, and indexing characteristics."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT,
    customer_name VARCHAR(100),
    email VARCHAR(200),
    description TEXT
);`
      },

      bullets: [
        "CHAR(n): fixed-length character type in common SQL implementations.",
        "VARCHAR(n): variable-length character data with a declared limit.",
        "TEXT: large text storage in systems that support it."
      ]
    },

    {
      id: "char",
      title: "7. CHAR Data Type",

      paragraphs: [
        "CHAR is a fixed-length character type in common SQL implementations.",
        "It can be useful when values have a predictable fixed size, such as certain codes."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE countries (
    country_code CHAR(2),
    country_name VARCHAR(100)
);`
      },

      bullets: [
        "CHAR is intended for fixed-length character data.",
        "The database handles padding and comparison behavior according to its rules.",
        "Use VARCHAR when the data length naturally varies."
      ]
    },

    {
      id: "varchar",
      title: "8. VARCHAR Data Type",

      paragraphs: [
        "VARCHAR stores variable-length character data up to the declared limit.",
        "It is commonly used for names, emails, usernames, phone numbers, titles, and other normal application strings."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    username VARCHAR(50),
    email VARCHAR(200),
    phone_number VARCHAR(20)
);`
      },

      bullets: [
        "The declared length acts as a constraint on the stored value in common implementations.",
        "Choose a realistic maximum rather than an arbitrary extremely large value.",
        "The exact storage and maximum-length behavior depends on the database product."
      ]
    },

    {
      id: "text",
      title: "9. TEXT Data Type",

      paragraphs: [
        "TEXT is designed for larger text values in database systems that support it.",
        "It can be useful for descriptions, articles, comments, notes, or other potentially large textual content."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE articles (
    article_id INT PRIMARY KEY,
    title VARCHAR(200),
    content TEXT
);`
      },

      bullets: [
        "TEXT is useful for large text content.",
        "Indexing and maximum-size behavior depend on the database.",
        "Do not use large text types automatically when a bounded VARCHAR is sufficient."
      ]
    },

    {
      id: "date-time",
      title: "10. Date and Time Types",

      paragraphs: [
        "Date and time types represent calendar dates, clock times, and timestamps.",
        "Choose a type based on whether the application needs a date only, a time only, or a date-time value."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE appointments (
    appointment_id INT,
    appointment_date DATE,
    start_time TIME,
    created_at TIMESTAMP
);`
      },

      bullets: [
        "DATE stores a calendar date.",
        "TIME stores a time of day.",
        "TIMESTAMP stores date-and-time information.",
        "Timezone semantics differ across database products and specific data types."
      ]
    },

    {
      id: "date",
      title: "11. DATE Data Type",

      paragraphs: [
        "DATE stores a calendar date without requiring a time-of-day component."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT,
    joining_date DATE
);

INSERT INTO employees
(employee_id, joining_date)
VALUES
(101, '2026-10-07');`
      },

      bullets: [
        "Useful for birthdays.",
        "Useful for joining dates.",
        "Useful for due dates.",
        "Useful when the time of day is not relevant."
      ]
    },

    {
      id: "time",
      title: "12. TIME Data Type",

      paragraphs: [
        "TIME represents a time of day without necessarily storing a calendar date."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE appointments (
    appointment_id INT,
    start_time TIME,
    end_time TIME
);`
      },

      bullets: [
        "Useful for business hours.",
        "Useful for appointment times when the date is stored separately.",
        "Exact range and precision depend on the database product."
      ]
    },

    {
      id: "timestamp",
      title: "13. TIMESTAMP Data Type",

      paragraphs: [
        "TIMESTAMP represents a date-and-time value.",
        "It is commonly used for values such as created_at, updated_at, login time, and event time.",
        "Timezone handling differs across database products, so applications should define their time-handling strategy clearly."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE orders (
    order_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);`
      },

      bullets: [
        "Use date-time types for event timestamps.",
        "Be careful when systems operate across multiple time zones.",
        "Define whether an application stores UTC, local time, or another agreed representation."
      ]
    },

    {
      id: "boolean-and-null",
      title: "14. Boolean Values and NULL",

      paragraphs: [
        "Boolean types represent true or false values where supported.",
        "NULL represents missing, unknown, or inapplicable information. NULL is not the same as zero, false, or an empty string.",
        "Use IS NULL and IS NOT NULL to test for NULL. Comparisons such as = NULL do not correctly test for NULL values."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT,
    customer_name VARCHAR(100),
    email VARCHAR(200),
    active BOOLEAN
);

SELECT customer_id, customer_name
FROM customers
WHERE email IS NULL;`
      }
    },

    {
      id: "boolean",
      title: "15. BOOLEAN Data Type",

      paragraphs: [
        "BOOLEAN represents a true/false value where supported.",
        "Database products can differ in how boolean values are physically represented or accepted as input."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id INT,
    username VARCHAR(50),
    active BOOLEAN
);

INSERT INTO users
(user_id, username, active)
VALUES
(1, 'ravi', TRUE);`
      },

      bullets: [
        "Useful for active/inactive state.",
        "Useful for enabled/disabled flags.",
        "Useful for verified/unverified state.",
        "Prefer a boolean type when the domain truly has two states and the database supports it appropriately."
      ]
    },

    {
      id: "null",
      title: "16. Understanding NULL",

      paragraphs: [
        "NULL means that a value is missing, unknown, or not applicable.",
        "NULL is not an ordinary value that can be compared using = or !=.",
        "SQL uses three-valued logic, so expressions involving NULL can evaluate to UNKNOWN rather than TRUE or FALSE."
      ],

      code: {
        language: "sql",
        code: `-- Correct
SELECT *
FROM customers
WHERE email IS NULL;

-- Correct
SELECT *
FROM customers
WHERE email IS NOT NULL;`
      },

      bullets: [
        "NULL is different from 0.",
        "NULL is different from an empty string.",
        "NULL is different from FALSE.",
        "Use IS NULL for NULL checks.",
        "Use IS NOT NULL to find non-NULL values."
      ]
    },

    {
      id: "null-comparison",
      title: "17. Why = NULL Does Not Work",

      paragraphs: [
        "A common beginner mistake is trying to compare NULL using the equality operator.",
        "NULL represents the absence or unknown state of a value, so normal equality comparison does not produce the expected TRUE result."
      ],

      code: {
        language: "sql",
        code: `-- Incorrect
SELECT *
FROM customers
WHERE email = NULL;

-- Correct
SELECT *
FROM customers
WHERE email IS NULL;`
      }
    },

    {
      id: "binary",
      title: "18. Binary Data Types",

      paragraphs: [
        "Binary types store raw bytes rather than normal character text.",
        "They can be useful for binary data when the database design intentionally stores such content, although many applications store large files in object storage and keep only metadata or a reference in the database."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE documents (
    document_id BIGINT PRIMARY KEY,
    file_name VARCHAR(200),
    file_data BLOB
);`
      },

      bullets: [
        "BINARY can represent fixed-length binary data in supported databases.",
        "VARBINARY can represent variable-length binary data.",
        "BLOB is commonly used for larger binary data in systems that support it.",
        "Large files are often better stored in object storage with a database reference."
      ]
    },

    {
      id: "json",
      title: "19. JSON Data Type",

      paragraphs: [
        "Some relational databases provide a JSON type for storing structured JSON documents.",
        "JSON can be useful when some data is naturally semi-structured, but it should not automatically replace normal relational columns."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    attributes JSON
);`
      },

      bullets: [
        "JSON can store flexible structured information.",
        "Database support and JSON functionality vary by product.",
        "Frequently queried fields may be better represented as normal columns.",
        "JSON should be used deliberately rather than as a replacement for relational design."
      ]
    },

    {
      id: "enum",
      title: "20. ENUM and Database-Specific Types",

      paragraphs: [
        "Some database systems provide specialized types such as ENUM.",
        "These types can constrain values to a predefined set, but their syntax, migration behavior, and portability vary between databases."
      ],

      code: {
        language: "sql",
        code: `-- Example of a database-specific ENUM style

CREATE TABLE orders (
    order_id INT,
    status ENUM('PENDING', 'PAID', 'CANCELLED')
);`
      },

      bullets: [
        "ENUM can restrict a column to predefined values in databases that support it.",
        "It can be convenient for small stable sets of values.",
        "Database-specific types can reduce portability.",
        "For frequently changing business states, a lookup table or application/domain design may be more appropriate."
      ]
    },

    {
      id: "constraints-and-types",
      title: "21. Data Types vs Constraints",

      paragraphs: [
        "A data type defines the kind of value a column can represent.",
        "A constraint adds additional rules about which values are allowed.",
        "Both are important for protecting data quality."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    age INT,
    salary DECIMAL(12, 2)
);`
      },

      bullets: [
        "BIGINT defines the numeric type.",
        "VARCHAR defines text storage.",
        "DECIMAL defines exact decimal storage.",
        "PRIMARY KEY enforces row identity.",
        "NOT NULL prevents missing values.",
        "UNIQUE prevents duplicate values according to the database's uniqueness rules."
      ]
    },

    {
      id: "choosing-types",
      title: "22. How to Choose the Correct Data Type",

      paragraphs: [
        "Choosing a data type should start with the meaning of the data, not simply the smallest or largest available type.",
        "Ask what values are valid, how the value will be queried, whether exact arithmetic is required, and whether the application needs to support future growth."
      ],

      bullets: [
        "For counts → use an integer type.",
        "For very large counts or identifiers → consider BIGINT.",
        "For money → use DECIMAL or NUMERIC.",
        "For normal text → use VARCHAR.",
        "For large text → consider TEXT.",
        "For calendar dates → use DATE.",
        "For time of day → use TIME.",
        "For event date and time → use an appropriate timestamp/date-time type.",
        "For true/false state → use BOOLEAN where appropriate.",
        "For missing values → use NULL deliberately.",
        "For structured semi-flexible data → consider JSON when supported and justified.",
        "For binary content → use binary types when appropriate."
      ]
    },

    {
      id: "real-world-table",
      title: "23. Real-World Employee Table",

      paragraphs: [
        "A real application usually combines several data types in one table.",
        "For example, an employee table may contain identifiers, text, dates, numeric salary information, and a boolean active flag."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    age INT,
    salary DECIMAL(12, 2),
    joining_date DATE,
    created_at TIMESTAMP,
    active BOOLEAN
);`
      },

      output: `employee_id
→ BIGINT
→ Employee identifier

employee_name
→ VARCHAR
→ Employee name

email
→ VARCHAR
→ Email address

age
→ INT
→ Whole number

salary
→ DECIMAL
→ Exact monetary amount

joining_date
→ DATE
→ Calendar date

created_at
→ TIMESTAMP
→ Date and time

active
→ BOOLEAN
→ True/false state`
    },

    {
      id: "java-mapping",
      title: "24. SQL Data Types and Java Types",

      paragraphs: [
        "When using Spring Boot with JPA and Hibernate, Java fields are mapped to database columns.",
        "The exact SQL type generated depends on the Java type, JPA annotations, Hibernate version, and database dialect."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private Long employeeId;

    private String employeeName;

    private Integer age;

    private BigDecimal salary;

    private LocalDate joiningDate;

    private LocalDateTime createdAt;

    private Boolean active;
}`
      },

      bullets: [
        "Java Long commonly maps to a database integer type with sufficient range.",
        "String commonly maps to a character type such as VARCHAR.",
        "Integer commonly maps to an integer type.",
        "BigDecimal is commonly used for exact decimal values.",
        "LocalDate represents a date without a time.",
        "LocalDateTime represents date and time without a timezone.",
        "Boolean represents a boolean-like value.",
        "Actual generated SQL types depend on the JPA provider and database."
      ]
    },

    {
      id: "spring-annotations",
      title: "25. Controlling Column Types with JPA",

      paragraphs: [
        "JPA annotations can provide additional mapping information when the default mapping is not sufficient."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Product {

    @Id
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;
}`
      },

      bullets: [
        "@Column can define mapping details.",
        "length can specify a string length where applicable.",
        "nullable can express a database nullability expectation.",
        "precision and scale can describe exact decimal columns.",
        "The final database definition also depends on schema-generation configuration and migration strategy."
      ]
    },

    {
      id: "type-mistakes",
      title: "26. Common Data Type Mistakes",

      bullets: [
        "Using FLOAT or DOUBLE for money when exact decimal arithmetic is required.",
        "Using VARCHAR for values that should be stored and calculated as numbers.",
        "Using a string to represent dates when a proper date/time type is appropriate.",
        "Choosing an integer type without considering future growth.",
        "Confusing NULL with zero or an empty string.",
        "Using = NULL instead of IS NULL.",
        "Using extremely large text types for every string field without considering requirements.",
        "Storing dates in inconsistent textual formats.",
        "Ignoring timezone requirements for distributed applications.",
        "Using database-specific types without considering portability and migration requirements.",
        "Assuming Java and SQL types always map one-to-one.",
        "Storing large files in the database without considering object storage and application requirements."
      ]
    },

    {
      id: "best-practices",
      title: "27. Data Type Best Practices",

      bullets: [
        "Choose a type based on the meaning and valid range of the data.",
        "Use DECIMAL or NUMERIC for exact monetary values.",
        "Use integer types for counts and identifiers where appropriate.",
        "Use VARCHAR for normal bounded text.",
        "Use TEXT only when larger text storage is actually needed.",
        "Use DATE and time/timestamp types instead of storing dates as arbitrary strings.",
        "Define timezone handling explicitly for distributed systems.",
        "Use NULL deliberately rather than treating it as a default value.",
        "Use constraints together with appropriate data types.",
        "Consider indexing and query patterns when choosing types.",
        "Consider database portability when using product-specific types.",
        "Use schema migration tools for production schema changes.",
        "Keep application and database representations consistent."
      ]
    },

    {
      id: "scenario-questions",
      title: "28. Scenario-Based Questions",

      interviewQuestions: [
        {
          question:
            "You are designing an e-commerce product table. What type would you use for product price?",
          answer:
            "I would normally use DECIMAL or NUMERIC because product prices require exact decimal arithmetic."
        },
        {
          question:
            "What type would you use for an employee name?",
          answer:
            "I would normally use VARCHAR with an appropriate maximum length."
        },
        {
          question:
            "What type would you use for an employee's date of joining?",
          answer:
            "I would use DATE if only the calendar date is required."
        },
        {
          question:
            "What type would you use for an order creation timestamp?",
          answer:
            "I would use an appropriate timestamp/date-time type and define the application's timezone strategy clearly."
        },
        {
          question:
            "What type would you use for an active/inactive flag?",
          answer:
            "I would use BOOLEAN where the database supports it appropriately."
        },
        {
          question:
            "What type would you use for a very large employee identifier?",
          answer:
            "I would consider BIGINT if the expected identifier range requires it."
        },
        {
          question:
            "Why should you avoid storing dates as VARCHAR?",
          answer:
            "A proper date/time type gives the database better semantics for validation, comparison, sorting, date arithmetic, and indexing."
        },
        {
          question:
            "When would you consider JSON?",
          answer:
            "I would consider JSON when the data is naturally semi-structured and flexible, especially when the database provides useful JSON functionality. Frequently queried relational attributes may still deserve normal columns."
        }
      ]
    },

    {
      id: "interview",
      title: "29. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "Why do we use data types?",
          answer:
            "Data types define the kind of values a column can store and help the database validate and operate on those values correctly."
        },
        {
          question: "Why is DECIMAL preferred for monetary values?",
          answer:
            "DECIMAL represents fixed-precision decimal values, avoiding the binary floating-point rounding behavior that can affect approximate numeric types."
        },
        {
          question: "What is the difference between CHAR and VARCHAR?",
          answer:
            "CHAR is a fixed-length character type in common implementations, whereas VARCHAR stores variable-length character data up to a declared limit."
        },
        {
          question: "What is NULL?",
          answer:
            "NULL represents an unknown, missing, or inapplicable value. It is not the same as zero, false, or an empty string."
        },
        {
          question: "How do you check for NULL?",
          answer:
            "Use IS NULL or IS NOT NULL rather than = NULL or != NULL."
        },
        {
          question: "What is the difference between INT and BIGINT?",
          answer:
            "Both store whole numbers, but BIGINT provides a wider integer range. The exact ranges depend on the database implementation."
        },
        {
          question: "What is the difference between DECIMAL and FLOAT?",
          answer:
            "DECIMAL provides exact decimal representation with defined precision and scale, while FLOAT represents approximate floating-point values."
        },
        {
          question: "When should you use VARCHAR?",
          answer:
            "VARCHAR is commonly used for variable-length text such as names, emails, usernames, titles, and other bounded strings."
        },
        {
          question: "When should you use TEXT?",
          answer:
            "TEXT is useful for larger textual content when supported by the database, such as article content, descriptions, or long comments."
        },
        {
          question: "What is the purpose of DATE?",
          answer:
            "DATE stores a calendar date without requiring a time-of-day component."
        },
        {
          question: "What is the purpose of TIMESTAMP?",
          answer:
            "TIMESTAMP stores date-and-time information, commonly used for events such as creation and update times. Exact timezone semantics depend on the database."
        },
        {
          question: "Is NULL the same as 0?",
          answer:
            "No. NULL represents missing, unknown, or inapplicable information, while 0 is an actual numeric value."
        },
        {
          question: "Is NULL the same as an empty string?",
          answer:
            "No. NULL represents missing or unknown information, while an empty string is an actual string containing zero characters."
        },
        {
          question: "Why should dates not normally be stored as strings?",
          answer:
            "Proper date/time types provide better validation, comparison, sorting, date arithmetic, and database-level semantics."
        },
        {
          question: "What is precision in DECIMAL?",
          answer:
            "Precision is the total number of digits allowed by the declared decimal type."
        },
        {
          question: "What is scale in DECIMAL?",
          answer:
            "Scale is the number of digits allowed after the decimal point."
        },
        {
          question: "What does DECIMAL(10,2) mean?",
          answer:
            "It declares a decimal value with precision 10 and scale 2, meaning 10 total digits with 2 digits after the decimal point, subject to the database's range and validation rules."
        },
        {
          question: "What is a BOOLEAN?",
          answer:
            "BOOLEAN represents a true/false value where supported. The exact physical representation and accepted literals can vary by database."
        },
        {
          question: "Should every string use TEXT?",
          answer:
            "No. Use a suitable bounded VARCHAR when the application's value has a meaningful maximum length. Use larger text types when the actual requirement calls for them."
        },
        {
          question: "How do SQL data types relate to Java in Spring Boot?",
          answer:
            "JPA and Hibernate map Java fields to database columns. For example, String commonly maps to a character column, BigDecimal to an exact decimal column, LocalDate to a date column, and LocalDateTime to a date-time column."
        },
        {
          question: "What should you consider when selecting a data type?",
          answer:
            "Consider the meaning of the data, valid range, precision, scale, nullability, query patterns, indexing, storage requirements, database capabilities, portability, and future growth."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "30. Quick Revision",

      bullets: [
        "INT → normal whole numbers.",
        "BIGINT → larger whole-number range.",
        "DECIMAL/NUMERIC → exact decimal values.",
        "FLOAT/DOUBLE → approximate floating-point values.",
        "CHAR → fixed-length character data.",
        "VARCHAR → variable-length character data.",
        "TEXT → large text where supported.",
        "DATE → calendar date.",
        "TIME → time of day.",
        "TIMESTAMP → date and time.",
        "BOOLEAN → true/false state where supported.",
        "NULL → missing, unknown, or inapplicable value.",
        "BINARY/VARBINARY/BLOB → binary data where supported.",
        "JSON → structured JSON data where supported.",
        "PRIMARY KEY/NOT NULL/UNIQUE → constraints, not data types.",
        "DECIMAL(10,2) → precision 10, scale 2.",
        "Use IS NULL → to test for NULL.",
        "Use DECIMAL/NUMERIC → for exact monetary values.",
        "Use proper date/time types → instead of arbitrary date strings."
      ]
    },

    {
      id: "one-minute-answer",
      title: "31. One-Minute Interview Answer",

      paragraphs: [
        "SQL data types define what kind of values a database column can store. Common numeric types include INT, BIGINT, DECIMAL, and floating-point types. Character types include CHAR, VARCHAR, and database-specific large text types such as TEXT. DATE, TIME, and TIMESTAMP represent different kinds of date and time information. BOOLEAN represents true or false where supported. NULL represents missing, unknown, or inapplicable information and must be checked using IS NULL or IS NOT NULL. For money, I prefer DECIMAL or NUMERIC because they provide exact decimal representation. When choosing a type, I consider the valid range, precision, scale, meaning of the data, query patterns, database capabilities, and future growth."
      ]
    },

    {
      id: "revision-notes",
      title: "32. Important Revision Notes",

      paragraphs: [
        "The most important rule is: choose the data type based on the meaning of the data and the range and precision it requires.",
        "For money → DECIMAL or NUMERIC.",
        "For whole-number counts → INT or another suitable integer type.",
        "For large identifiers or ranges → consider BIGINT.",
        "For normal text → VARCHAR.",
        "For large text → TEXT where appropriate.",
        "For date only → DATE.",
        "For time only → TIME.",
        "For event date and time → appropriate timestamp/date-time type.",
        "For true/false → BOOLEAN where supported.",
        "For missing information → NULL.",
        "Never confuse NULL with 0, FALSE, or an empty string.",
        "Remember that exact type names, ranges, timezone behavior, JSON support, and storage semantics vary between database products."
      ]
    }
  ]
};
