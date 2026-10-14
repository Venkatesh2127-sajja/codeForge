
export const sqlConstraintsOverview = {
  id: 2009,
  title: "SQL Constraints Overview",
  slug: "sql-constraints-overview",
  topicTitle: "Introduction to SQL",
  description:
    "Learn how NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, and DEFAULT protect data integrity and how to use them in real-world database design.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "constraint-definition",
      title: "1. What Is a Constraint?",

      paragraphs: [
        "A constraint is a rule enforced by the database to restrict which data can be stored.",
        "Constraints protect data integrity even when multiple applications or users modify the same tables.",
        "Application validation improves user experience, but database constraints provide an additional integrity boundary that does not depend on a particular application."
      ],

      bullets: [
        "NOT NULL: disallows NULL values.",
        "UNIQUE: enforces uniqueness according to database rules.",
        "PRIMARY KEY: uniquely identifies rows and disallows NULL.",
        "FOREIGN KEY: enforces referential integrity.",
        "CHECK: validates a condition for inserted or updated rows.",
        "DEFAULT: supplies a value when a column is omitted from an insert, subject to database rules."
      ]
    },

    {
      id: "constraint-purpose",
      title: "2. Why Are Constraints Important?",

      paragraphs: [
        "Imagine an employee management system where the application checks that employee emails are unique. If another application directly inserts duplicate emails into the database, application-only validation may not protect the data.",
        "A database UNIQUE constraint provides a database-level rule that applies regardless of which application performs the write."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL
);`
      },

      bullets: [
        "The application can validate input.",
        "The database independently enforces important integrity rules.",
        "Multiple applications can safely share the same database rules.",
        "Constraints help prevent inconsistent or invalid data."
      ]
    },

    {
      id: "not-null",
      title: "3. NOT NULL Constraint",

      paragraphs: [
        "NOT NULL prevents a column from storing NULL.",
        "Use it when a value is mandatory according to the database design."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(100)
);`
      },

      bullets: [
        "employee_name must have a non-NULL value.",
        "department can be NULL because NOT NULL was not specified.",
        "NOT NULL does not prevent an empty string such as ''.",
        "NOT NULL is useful for required database attributes."
      ]
    },

    {
      id: "unique",
      title: "4. UNIQUE Constraint",

      paragraphs: [
        "UNIQUE prevents duplicate values for a column or combination of columns according to the database's uniqueness rules.",
        "A table can have multiple UNIQUE constraints."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(200) UNIQUE
);`
      },

      bullets: [
        "username must satisfy its uniqueness constraint.",
        "email must satisfy its uniqueness constraint.",
        "A table can have multiple UNIQUE constraints.",
        "NULL behavior for UNIQUE constraints can differ between database products."
      ]
    },

    {
      id: "unique-composite",
      title: "5. Composite UNIQUE Constraint",

      paragraphs: [
        "A UNIQUE constraint can contain multiple columns.",
        "In that case, the combination of the columns must be unique rather than each column being unique individually."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE course_enrollments (
    enrollment_id BIGINT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,

    UNIQUE (student_id, course_id)
);`
      },

      bullets: [
        "A student can enroll in multiple courses.",
        "A course can have multiple students.",
        "The same student-course combination cannot appear twice.",
        "student_id alone is not required to be unique.",
        "course_id alone is not required to be unique."
      ]
    },

    {
      id: "primary-key",
      title: "6. PRIMARY KEY Constraint",

      paragraphs: [
        "A PRIMARY KEY uniquely identifies each row in a table.",
        "A primary key is subject to uniqueness and non-nullability requirements.",
        "A table has one PRIMARY KEY constraint, but that constraint can contain multiple columns."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);`
      },

      bullets: [
        "department_id identifies each department.",
        "A primary key cannot contain NULL.",
        "A table has one primary-key constraint.",
        "The primary key can be a single column or composite."
      ]
    },

    {
      id: "foreign-key",
      title: "7. FOREIGN KEY Constraint",

      paragraphs: [
        "A FOREIGN KEY establishes a relationship between tables.",
        "It requires referencing values to match an appropriate referenced key, subject to the database's rules and the column's nullability."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);`
      },

      bullets: [
        "departments.department_id is the referenced key.",
        "employees.department_id is the referencing column.",
        "A nullable foreign key can contain NULL unless restricted.",
        "Non-NULL foreign-key values must satisfy the reference.",
        "Foreign keys help maintain referential integrity."
      ]
    },

    {
      id: "foreign-key-actions",
      title: "8. FOREIGN KEY Referential Actions",

      paragraphs: [
        "A foreign key can specify actions for updates or deletes of referenced rows.",
        "Common actions include CASCADE, SET NULL, RESTRICT, and NO ACTION. Exact behavior and support depend on the database system."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
);`
      },

      bullets: [
        "CASCADE can propagate the operation to dependent rows.",
        "SET NULL can remove the relationship by setting the foreign key to NULL when allowed.",
        "RESTRICT can prevent the parent operation while dependent rows exist.",
        "NO ACTION behavior depends on the database implementation.",
        "Choose cascading behavior based on business requirements."
      ]
    },

    {
      id: "check",
      title: "9. CHECK Constraint",

      paragraphs: [
        "A CHECK constraint requires a condition to be satisfied by inserted or updated row values, subject to the database's constraint semantics.",
        "CHECK constraints are useful for enforcing simple domain rules at the database level."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2)
        CHECK (price >= 0)
);`
      },

      bullets: [
        "The price cannot be negative when the CHECK is enforced.",
        "CHECK can protect simple business-domain rules.",
        "CHECK enforcement and supported expressions can vary by database version.",
        "Application validation can provide better user-facing error messages."
      ]
    },

    {
      id: "default",
      title: "10. DEFAULT Constraint",

      paragraphs: [
        "DEFAULT supplies a value when an INSERT does not provide a value for the column.",
        "A DEFAULT does not necessarily prevent an explicitly supplied NULL value."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    stock_quantity INT DEFAULT 0
);`
      },

      output: `INSERT INTO products
    (product_id, product_name)
VALUES
    (1, 'Keyboard');

stock_quantity
→ 0`
    },

    {
      id: "default-vs-not-null",
      title: "11. DEFAULT vs NOT NULL",

      paragraphs: [
        "DEFAULT and NOT NULL solve different problems.",
        "DEFAULT provides a value when the column is omitted from an INSERT. NOT NULL prevents the final stored value from being NULL."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    stock_quantity INT NOT NULL DEFAULT 0
);`
      },

      bullets: [
        "DEFAULT 0 supplies 0 when stock_quantity is omitted.",
        "NOT NULL prevents stock_quantity from being NULL.",
        "DEFAULT alone does not necessarily prevent explicitly inserting NULL.",
        "Using both can be appropriate when a column must always contain a value and should have a standard initial value."
      ]
    },

    {
      id: "example",
      title: "12. Creating a Table with Constraints",

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    price DECIMAL(10, 2) NOT NULL
        CHECK (price >= 0),
    stock_quantity INT NOT NULL
        DEFAULT 0
        CHECK (stock_quantity >= 0)
);`
      },

      paragraphs: [
        "This example requires each product to have an identifier, a name, a non-negative price, and a non-negative stock quantity.",
        "It also prevents duplicate SKU values according to the database's uniqueness rules.",
        "The stock quantity receives 0 when it is omitted from an INSERT."
      ]
    },

    {
      id: "table-level",
      title: "13. Column-Level vs Table-Level Constraints",

      paragraphs: [
        "Some constraints can be written directly beside a column definition. Other constraints are commonly written at table level, especially when multiple columns participate in the rule."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(200),

    UNIQUE (email)
);`
      },

      bullets: [
        "Column-level syntax places the constraint next to the column.",
        "Table-level syntax places the constraint after the column definitions.",
        "Composite UNIQUE and composite PRIMARY KEY constraints are commonly written at table level."
      ]
    },

    {
      id: "named-constraints",
      title: "14. Naming Constraints",

      paragraphs: [
        "Constraints can be given explicit names.",
        "Named constraints can make schema maintenance and database error messages easier to understand."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT,
    sku VARCHAR(50),

    CONSTRAINT pk_products
        PRIMARY KEY (product_id),

    CONSTRAINT uq_products_sku
        UNIQUE (sku)
);`
      },

      bullets: [
        "pk_products names the primary-key constraint.",
        "uq_products_sku names the unique constraint.",
        "Constraint naming conventions should be consistent across the project.",
        "Explicit names can make ALTER or DROP operations easier to manage."
      ]
    },

    {
      id: "constraint-failure",
      title: "15. What Happens When a Constraint Is Violated?",

      code: {
        language: "sql",
        code: `INSERT INTO products
    (product_id, product_name, price, stock_quantity)
VALUES
    (1, 'Keyboard', -100, 10);`
      },

      paragraphs: [
        "The insert violates the CHECK constraint because the price is negative.",
        "The database rejects the row when the constraint is enforced.",
        "The application should translate the resulting database error into an appropriate application-level response instead of exposing raw database error details to end users."
      ],

      bullets: [
        "Validate inputs in the application for a better user experience.",
        "Enforce important integrity rules in the database as well.",
        "Do not rely only on frontend validation.",
        "Handle constraint violations consistently in the backend."
      ]
    },

    {
      id: "not-null-failure",
      title: "16. NOT NULL Violation",

      paragraphs: [
        "If a NOT NULL column receives NULL, the database rejects the operation."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL
);

INSERT INTO employees
    (employee_id, employee_name)
VALUES
    (1, NULL);`
      },

      output: `The INSERT fails because employee_name
is defined as NOT NULL.`
    },

    {
      id: "unique-failure",
      title: "17. UNIQUE Constraint Violation",

      paragraphs: [
        "If a new row attempts to insert a duplicate value that violates a UNIQUE constraint, the database normally rejects the operation."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id INT PRIMARY KEY,
    email VARCHAR(200) UNIQUE
);

INSERT INTO users
    (user_id, email)
VALUES
    (1, 'ravi@example.com');

INSERT INTO users
    (user_id, email)
VALUES
    (2, 'ravi@example.com');`
      },

      output: `The second INSERT violates the UNIQUE constraint
because the email value is already present,
subject to the database's uniqueness rules.`
    },

    {
      id: "foreign-key-failure",
      title: "18. FOREIGN KEY Violation",

      paragraphs: [
        "A foreign-key constraint can reject an INSERT or UPDATE when a non-NULL referencing value does not correspond to an appropriate referenced key."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, department_id)
VALUES
    (101, 'Ravi', 999);`
      },

      output: `If department_id = 999 does not exist
in departments.department_id,
the database rejects the operation
when the foreign-key constraint is enforced.`
    },

    {
      id: "check-failure",
      title: "19. CHECK Constraint Violation",

      paragraphs: [
        "A CHECK constraint rejects a row when its condition is violated according to the database's CHECK semantics."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE products (
    product_id INT PRIMARY KEY,
    price DECIMAL(10, 2)
        CHECK (price >= 0)
);

INSERT INTO products
    (product_id, price)
VALUES
    (1, -500);`
      },

      output: `The INSERT is rejected because
price violates CHECK (price >= 0).`
    },

    {
      id: "default-example",
      title: "20. DEFAULT in Practice",

      paragraphs: [
        "DEFAULT is useful when a column has a sensible initial value."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    status VARCHAR(30) DEFAULT 'PENDING',
    quantity INT DEFAULT 1
);

INSERT INTO orders
    (order_id)
VALUES
    (1001);`
      },

      output: `order_id
→ 1001

status
→ PENDING

quantity
→ 1`
    },

    {
      id: "multiple-constraints",
      title: "21. Combining Multiple Constraints",

      paragraphs: [
        "Real-world database columns often use multiple constraints together."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    age INT CHECK (age >= 18),
    active BOOLEAN NOT NULL DEFAULT TRUE
);`
      },

      bullets: [
        "user_id → PRIMARY KEY.",
        "username → NOT NULL and UNIQUE.",
        "email → NOT NULL and UNIQUE.",
        "age → CHECK condition.",
        "active → NOT NULL and DEFAULT."
      ]
    },

    {
      id: "application-vs-database",
      title: "22. Application Validation vs Database Constraints",

      paragraphs: [
        "Backend validation and database constraints have different responsibilities.",
        "Application validation gives users fast and meaningful feedback before a database operation is attempted.",
        "Database constraints provide a final integrity boundary at the persistence layer."
      ],

      code: {
        language: "text",
        code: `Frontend
   ↓
Basic Validation
   ↓
Spring Boot DTO Validation
   ↓
Service Business Rules
   ↓
Repository
   ↓
Database Constraints
   ↓
Stored Data`
      },

      bullets: [
        "Frontend validation improves user experience.",
        "Bean Validation in Spring Boot validates request data.",
        "Service logic validates business rules.",
        "Database constraints protect persistent data.",
        "Do not assume client-side validation is sufficient."
      ]
    },

    {
      id: "spring-boot",
      title: "23. Constraints in Spring Boot and JPA",

      paragraphs: [
        "Spring Boot applications commonly use both Java-side validation and database constraints.",
        "JPA annotations can describe some schema constraints, while Bean Validation annotations validate Java objects and request data.",
        "These mechanisms complement rather than completely replace one another."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotNull
    @PositiveOrZero
    private BigDecimal price;
}`
      },

      bullets: [
        "@NotBlank validates the Java value.",
        "@NotNull prevents the Java property from being null during validation.",
        "@PositiveOrZero validates the business input.",
        "@Column(nullable = false) can communicate database nullability.",
        "Actual database constraints still depend on schema generation or migration configuration."
      ]
    },

    {
      id: "constraint-order",
      title: "24. Which Constraint Should I Use?",

      code: {
        language: "text",
        code: `Must have a value?
→ NOT NULL

Must be unique?
→ UNIQUE

Must identify the row?
→ PRIMARY KEY

Must reference another table?
→ FOREIGN KEY

Must satisfy a condition?
→ CHECK

Needs an automatic value when omitted?
→ DEFAULT`
      },

      paragraphs: [
        "A single column can use multiple constraints when multiple rules apply."
      ]
    },

    {
      id: "production-design",
      title: "25. Constraints in Production Database Design",

      paragraphs: [
        "Production database schemas should enforce important integrity rules deliberately.",
        "Constraints should be treated as part of the database contract, not as optional documentation."
      ],

      bullets: [
        "Use PRIMARY KEY for row identity.",
        "Use FOREIGN KEY for relationships that require referential integrity.",
        "Use UNIQUE for important uniqueness rules.",
        "Use NOT NULL for mandatory attributes.",
        "Use CHECK for appropriate domain restrictions supported by the database.",
        "Use DEFAULT for sensible database-level initial values.",
        "Name constraints consistently when useful.",
        "Manage schema changes using version-controlled migrations.",
        "Understand the performance and operational implications of constraints and indexes."
      ]
    },

    {
      id: "common-mistakes",
      title: "26. Common Constraint Mistakes",

      bullets: [
        "Relying only on frontend validation.",
        "Relying only on backend validation for important database integrity rules.",
        "Forgetting NOT NULL on mandatory columns.",
        "Assuming UNIQUE handles NULL identically across databases.",
        "Using DEFAULT when NOT NULL is also required but forgetting to add NOT NULL.",
        "Adding CHECK constraints without considering the target database's supported behavior.",
        "Using FOREIGN KEY without understanding parent-child relationships.",
        "Using ON DELETE CASCADE without understanding its consequences.",
        "Creating too many unnecessary constraints without understanding their purpose.",
        "Ignoring constraint errors in application code.",
        "Exposing raw database constraint error messages to end users.",
        "Changing constraint definitions manually in production without migration tracking."
      ]
    },

    {
      id: "best-practices",
      title: "27. Constraint Best Practices",

      bullets: [
        "Define important integrity rules at the database level.",
        "Use application validation for user-friendly error messages.",
        "Use NOT NULL for truly mandatory columns.",
        "Use UNIQUE for business values that must not be duplicated.",
        "Use PRIMARY KEY for stable row identity.",
        "Use FOREIGN KEY when referential integrity is required.",
        "Use CHECK for simple database-enforceable domain rules.",
        "Use DEFAULT for sensible values when a column is omitted.",
        "Choose foreign-key deletion behavior deliberately.",
        "Use meaningful constraint names when they improve maintainability.",
        "Handle constraint violations centrally in the backend.",
        "Use database migrations to version constraint changes."
      ]
    },

    {
      id: "scenario-interview",
      title: "28. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A product price should never be negative. Which constraint would you use?",
          answer:
            "I would use a CHECK constraint such as CHECK (price >= 0). I would also validate the request in the application for a better user experience."
        },
        {
          question:
            "An email address must be unique. Which constraint would you use?",
          answer:
            "I would use a UNIQUE constraint on the email column, while considering the database's NULL and comparison behavior."
        },
        {
          question:
            "A product stock quantity should default to zero when it is not supplied. Which constraint would you use?",
          answer:
            "I would use DEFAULT 0. If the column must never be NULL, I would combine it with NOT NULL."
        },
        {
          question:
            "An employee must always have a name. Which constraint would you use?",
          answer:
            "I would use NOT NULL on the employee_name column."
        },
        {
          question:
            "An employee must belong to an existing department. Which constraint would you use?",
          answer:
            "I would use a FOREIGN KEY from employees.department_id to departments.department_id and make the column NOT NULL if every employee must have a department."
        },
        {
          question:
            "Why do we need database constraints if Spring Boot already validates requests?",
          answer:
            "Application validation protects the API boundary and improves user feedback, while database constraints provide persistent data integrity even when data is written through another application, script, migration, or administrative tool."
        },
        {
          question:
            "Should DEFAULT replace NOT NULL?",
          answer:
            "No. They solve different problems. DEFAULT supplies a value when a column is omitted, while NOT NULL prevents the stored value from being NULL."
        },
        {
          question:
            "Should all foreign keys use CASCADE?",
          answer:
            "No. CASCADE should be used only when deleting or updating the parent should logically propagate to dependent rows."
        }
      ]
    },

    {
      id: "interview",
      title: "29. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "Why are constraints important?",
          answer:
            "Constraints enforce data integrity at the database level, protecting data from invalid writes by different applications or users."
        },
        {
          question: "What does NOT NULL do?",
          answer:
            "It prevents a column from storing NULL values."
        },
        {
          question: "What is the purpose of a CHECK constraint?",
          answer:
            "A CHECK constraint requires a specified condition to be satisfied by inserted or updated row values, subject to the database's constraint semantics."
        },
        {
          question: "What is the difference between DEFAULT and NOT NULL?",
          answer:
            "DEFAULT supplies a value when a column is omitted from an insert. NOT NULL prohibits NULL values. A DEFAULT alone does not necessarily prohibit explicitly inserting NULL."
        },
        {
          question: "What is a UNIQUE constraint?",
          answer:
            "A UNIQUE constraint prevents duplicate values for a column or column combination according to the database's uniqueness rules."
        },
        {
          question: "What is a PRIMARY KEY constraint?",
          answer:
            "A PRIMARY KEY uniquely identifies each row and cannot contain NULL values."
        },
        {
          question: "What is a FOREIGN KEY constraint?",
          answer:
            "A FOREIGN KEY establishes a relationship between tables and helps enforce referential integrity."
        },
        {
          question: "Can a column have multiple constraints?",
          answer:
            "Yes. For example, a column can be NOT NULL, UNIQUE, and have a DEFAULT value or CHECK condition at the same time."
        },
        {
          question: "What happens when a constraint is violated?",
          answer:
            "The database normally rejects the statement or operation according to the violated constraint and transaction semantics."
        },
        {
          question: "What is referential integrity?",
          answer:
            "Referential integrity ensures that foreign-key relationships remain valid according to the database constraints."
        },
        {
          question: "What is the difference between application validation and database constraints?",
          answer:
            "Application validation provides early and user-friendly feedback, while database constraints provide persistent integrity protection regardless of which application or client performs the write."
        },
        {
          question: "What is ON DELETE CASCADE?",
          answer:
            "It is a foreign-key referential action that can automatically delete dependent rows when the referenced parent row is deleted. It should be used only when that behavior matches the business relationship."
        },
        {
          question: "Can DEFAULT prevent NULL?",
          answer:
            "No. DEFAULT supplies a value when the column is omitted from an insert. To prevent NULL, use NOT NULL."
        },
        {
          question: "Can UNIQUE allow NULL?",
          answer:
            "The behavior depends on the database product and its uniqueness semantics. Do not assume identical NULL behavior across databases."
        },
        {
          question: "Are CHECK constraints supported identically by every database?",
          answer:
            "No. CHECK syntax and enforcement behavior can vary by database product and version, so the target database documentation should be verified."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "30. Quick Revision",

      bullets: [
        "Constraint → database-enforced data rule.",
        "NOT NULL → prevents NULL.",
        "UNIQUE → prevents duplicate values according to database rules.",
        "PRIMARY KEY → identifies each row.",
        "FOREIGN KEY → maintains a relationship between tables.",
        "CHECK → validates a condition.",
        "DEFAULT → supplies a value when a column is omitted.",
        "Composite UNIQUE → combination of columns must be unique.",
        "Composite PRIMARY KEY → multiple columns together identify the row.",
        "Application validation → user-friendly validation.",
        "Database constraints → persistent integrity protection.",
        "CASCADE → can propagate parent changes to dependent rows.",
        "Constraint violation → database normally rejects the operation.",
        "Migration tools → manage schema and constraint changes in production."
      ]
    },

    {
      id: "one-minute-answer",
      title: "31. One-Minute Interview Answer",

      paragraphs: [
        "SQL constraints are database-level rules used to protect data integrity. NOT NULL prevents missing values, UNIQUE enforces uniqueness, PRIMARY KEY identifies rows, FOREIGN KEY maintains relationships between tables, CHECK validates conditions, and DEFAULT supplies a value when a column is omitted from an insert. In a Spring Boot application, I would use Bean Validation for early API validation and database constraints for persistent integrity. For example, an email can use NOT NULL and UNIQUE, a price can use CHECK (price >= 0), and an employee's department_id can use a FOREIGN KEY. Important constraints should be enforced by the database rather than relying only on frontend or backend validation."
      ]
    },

    {
      id: "revision-notes",
      title: "32. Important Revision Notes",

      paragraphs: [
        "Remember the six major constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, and DEFAULT.",
        "NOT NULL answers: 'Must this column have a value?'",
        "UNIQUE answers: 'Can this value be duplicated?'",
        "PRIMARY KEY answers: 'How do I uniquely identify this row?'",
        "FOREIGN KEY answers: 'How does this row reference another table?'",
        "CHECK answers: 'Must this value satisfy a condition?'",
        "DEFAULT answers: 'What value should be supplied when this column is omitted?'",
        "Application validation and database constraints should complement each other.",
        "For production systems, constraint changes should be managed through controlled, versioned database migrations."
      ]
    }
  ]
};
