
export const sqlKeysOverview = {
  id: 2008,
  title: "SQL Keys Overview",
  slug: "sql-keys-overview",
  topicTitle: "Introduction to SQL",
  description:
    "Understand primary, foreign, candidate, alternate, composite, natural, surrogate, and unique keys with practical examples and real-world database relationships.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "primary-key",
      title: "1. Primary Key",

      paragraphs: [
        "A primary key uniquely identifies each row in a table. A primary key must be unique and cannot contain NULL values.",
        "A table has one primary-key constraint, which may consist of one column or multiple columns.",
        "The primary key is one of the most important concepts in relational database design because applications frequently use it to identify, retrieve, update, and delete individual records."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);`
      },

      bullets: [
        "department_id uniquely identifies each department.",
        "A primary-key column cannot contain NULL.",
        "A table has one PRIMARY KEY constraint.",
        "The primary key can contain one column or multiple columns.",
        "A primary key is normally indexed by the database."
      ]
    },

    {
      id: "primary-key-example",
      title: "2. Primary Key Example",

      paragraphs: [
        "Suppose an employees table contains thousands of records. The application needs a reliable way to identify one employee.",
        "employee_id can be used as the primary key because every employee should have a unique identifier."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150)
);

INSERT INTO employees
(employee_id, employee_name, email)
VALUES
(101, 'Ravi', 'ravi@example.com'),
(102, 'Priya', 'priya@example.com');`
      },

      output: `employee_id = 101
→ identifies Ravi

employee_id = 102
→ identifies Priya`
    },

    {
      id: "primary-key-properties",
      title: "3. Properties of a Primary Key",

      bullets: [
        "Must uniquely identify rows.",
        "Cannot contain NULL.",
        "A table has one primary-key constraint.",
        "The constraint can contain multiple columns.",
        "The primary key should normally be stable.",
        "The primary key is commonly referenced by foreign keys in other tables.",
        "The database normally creates or uses an index to support the primary-key constraint."
      ]
    },

    {
      id: "foreign-key",
      title: "4. Foreign Key",

      paragraphs: [
        "A foreign key establishes a relationship between tables by requiring referencing values to match a referenced key or satisfy the applicable NULL rules.",
        "Foreign keys help maintain referential integrity. The referenced table and column must satisfy the database's requirements for a valid reference.",
        "A foreign key usually represents a relationship such as employee-to-department, order-to-customer, or order-item-to-order."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);`
      },

      bullets: [
        "departments.department_id is the referenced primary key.",
        "employees.department_id is the foreign-key column.",
        "A nullable foreign key may contain NULL unless restricted.",
        "Referential actions such as CASCADE must be selected carefully.",
        "The database can reject a value that does not satisfy the foreign-key relationship."
      ]
    },

    {
      id: "foreign-key-flow",
      title: "5. How a Foreign Key Works",

      paragraphs: [
        "A foreign key connects a child table to a referenced parent table.",
        "For example, an employee can belong to a department."
      ],

      code: {
        language: "text",
        code: `departments
----------------
department_id
department_name
       ↑
       │
       │ FOREIGN KEY
       │
employees
----------------
employee_id
employee_name
department_id`
      },

      bullets: [
        "departments is the referenced or parent table.",
        "employees is the referencing or child table.",
        "employees.department_id points to departments.department_id.",
        "The relationship helps maintain referential integrity."
      ]
    },

    {
      id: "foreign-key-actions",
      title: "6. Foreign Key Referential Actions",

      paragraphs: [
        "Foreign keys can define what happens when a referenced row is updated or deleted.",
        "Common actions include CASCADE, SET NULL, RESTRICT, and NO ACTION, but exact behavior and support vary by database."
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
        ON UPDATE CASCADE
);`
      },

      bullets: [
        "CASCADE can propagate the operation to related rows.",
        "SET NULL can set the foreign-key value to NULL when allowed.",
        "RESTRICT can prevent an operation when dependent rows exist.",
        "NO ACTION behavior depends on the database and constraint implementation.",
        "Choose cascading behavior based on the business relationship rather than using CASCADE automatically."
      ]
    },

    {
      id: "unique-and-composite",
      title: "7. Unique and Composite Keys",

      paragraphs: [
        "A UNIQUE constraint prevents duplicate values for its constrained column or column combination, subject to the database's handling of NULL values.",
        "A composite key contains multiple columns. The combination, rather than each individual column, identifies a record uniquely."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE course_enrollments (
    student_id INT,
    course_id INT,
    enrolled_on DATE,
    PRIMARY KEY (student_id, course_id)
);`
      },

      bullets: [
        "The same student can enroll in different courses.",
        "The same course can contain different students.",
        "The same student-course pair cannot be inserted twice under this primary key.",
        "student_id alone is not unique.",
        "course_id alone is not unique.",
        "The combination of student_id and course_id is unique."
      ]
    },

    {
      id: "unique-key",
      title: "8. UNIQUE Key / Constraint",

      paragraphs: [
        "A UNIQUE constraint ensures that duplicate values are not allowed for the constrained column or combination of columns according to the database's rules.",
        "A table can have multiple UNIQUE constraints."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(150) UNIQUE
);`
      },

      bullets: [
        "user_id identifies the row.",
        "username must be unique according to the UNIQUE constraint.",
        "email must be unique according to the UNIQUE constraint.",
        "A table can have multiple UNIQUE constraints.",
        "NULL behavior for UNIQUE constraints varies between database products."
      ]
    },

    {
      id: "candidate-key",
      title: "9. Candidate and Alternate Keys",

      paragraphs: [
        "A candidate key is a minimal set of attributes that uniquely identifies a row.",
        "One candidate key is selected as the primary key. Other candidate keys can be called alternate keys.",
        "A UNIQUE constraint is often used to enforce uniqueness for an alternate key, but exact NULL behavior depends on the database and constraint definition."
      ],

      code: {
        language: "text",
        code: `Employee table

employee_id
→ unique
→ minimal
→ candidate key

email
→ unique
→ minimal
→ candidate key

Selected primary key:
employee_id

Other candidate key:
email
→ alternate key`
      },

      bullets: [
        "Primary key: the selected key used to identify records.",
        "Candidate key: a minimal possible unique identifier.",
        "Alternate key: a candidate key not selected as the primary key.",
        "Composite key: a key formed from multiple columns."
      ]
    },

    {
      id: "candidate-example",
      title: "10. Candidate Key Example",

      paragraphs: [
        "Suppose an employee table has employee_id and email, and both are guaranteed to uniquely identify an employee.",
        "Both can theoretically be candidate keys because each can uniquely identify a row."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    employee_name VARCHAR(100)
);`
      },

      bullets: [
        "employee_id is selected as the primary key.",
        "email is another candidate key.",
        "email becomes an alternate key because employee_id was selected as the primary key.",
        "Whether email remains a good candidate key depends on the application's guarantee that it is unique and stable."
      ]
    },

    {
      id: "composite-key",
      title: "11. Composite Key",

      paragraphs: [
        "A composite key consists of two or more columns used together to uniquely identify a row.",
        "A composite key is useful when uniqueness naturally comes from a combination of attributes."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,

    PRIMARY KEY (order_id, product_id)
);`
      },

      bullets: [
        "order_id alone can appear multiple times.",
        "product_id alone can appear multiple times.",
        "The combination order_id + product_id identifies one product entry within one order.",
        "The combination cannot be duplicated under this primary key."
      ]
    },

    {
      id: "composite-foreign-key",
      title: "12. Composite Foreign Key",

      paragraphs: [
        "A foreign key can also consist of multiple columns.",
        "The referencing columns must correspond to an appropriate unique or primary key in the referenced table."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE course_sections (
    course_id INT,
    section_id INT,
    room VARCHAR(50),

    PRIMARY KEY (course_id, section_id)
);

CREATE TABLE enrollments (
    course_id INT,
    section_id INT,
    student_id INT,

    FOREIGN KEY (course_id, section_id)
        REFERENCES course_sections(course_id, section_id)
);`
      },

      bullets: [
        "Both columns participate in the relationship.",
        "The pair identifies the referenced course section.",
        "Composite foreign keys are useful when the parent identity itself is composite."
      ]
    },

    {
      id: "natural-key",
      title: "13. Natural Key",

      paragraphs: [
        "A natural key is an attribute or combination of attributes that already has business meaning and can uniquely identify a record.",
        "Examples can include an officially assigned code or another stable business identifier."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE countries (
    country_code CHAR(2) PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);`
      },

      bullets: [
        "The key has meaning outside the database.",
        "Natural keys can sometimes change because business rules change.",
        "A natural key should be selected only when it is stable and truly unique for the domain."
      ]
    },

    {
      id: "surrogate-key",
      title: "14. Surrogate Key",

      paragraphs: [
        "A surrogate key is an artificial identifier created specifically for the database record.",
        "Common examples include auto-generated numeric IDs and UUIDs."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);`
      },

      bullets: [
        "employee_id can act as a surrogate key.",
        "It normally has no business meaning.",
        "Surrogate keys can remain stable even when business attributes change.",
        "A separate UNIQUE constraint can still protect a business identifier such as email."
      ]
    },

    {
      id: "natural-vs-surrogate",
      title: "15. Natural Key vs Surrogate Key",

      code: {
        language: "text",
        code: `Natural Key
→ Has business meaning
→ Example: country_code

Surrogate Key
→ Artificial database identifier
→ Example: employee_id`
      },

      bullets: [
        "Natural keys represent existing business identity.",
        "Surrogate keys are created specifically for database identity.",
        "Surrogate keys can simplify relationships and remain stable when business values change.",
        "Natural keys can be useful when the business identifier is genuinely stable and unique.",
        "Many application schemas use a surrogate primary key plus UNIQUE constraints for important business identifiers."
      ]
    },

    {
      id: "primary-vs-unique",
      title: "16. PRIMARY KEY vs UNIQUE",

      paragraphs: [
        "PRIMARY KEY and UNIQUE both enforce uniqueness, but they serve different modeling purposes."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(150) UNIQUE
);`
      },

      bullets: [
        "A table has one primary-key constraint.",
        "A table can have multiple UNIQUE constraints.",
        "Primary keys cannot contain NULL.",
        "UNIQUE NULL behavior depends on the database product.",
        "Primary keys are commonly used as the target of foreign-key relationships."
      ]
    },

    {
      id: "key-vs-index",
      title: "17. Key vs Index",

      paragraphs: [
        "A key is primarily a data-modeling or integrity concept, while an index is a data structure used to make certain data access operations faster.",
        "A primary key or UNIQUE constraint commonly causes the database to maintain an index, but an index can also exist without being a key."
      ],

      code: {
        language: "sql",
        code: `CREATE INDEX idx_employee_name
ON employees(employee_name);`
      },

      bullets: [
        "PRIMARY KEY → identifies rows.",
        "FOREIGN KEY → enforces a relationship.",
        "UNIQUE → enforces uniqueness.",
        "INDEX → improves access performance for suitable queries.",
        "Not every index represents a key."
      ]
    },

    {
      id: "key-relationships",
      title: "18. Keys and Table Relationships",

      paragraphs: [
        "Keys are fundamental to relational database relationships.",
        "A primary key identifies a parent row, while a foreign key can reference that row from another table."
      ],

      code: {
        language: "text",
        code: `Department
-----------
department_id PK
       ↑
       │
       │ FK
       │
Employee
-----------
employee_id PK
department_id FK`
      },

      bullets: [
        "One department can have many employees.",
        "department_id identifies the department.",
        "employees.department_id references departments.department_id.",
        "The relationship can be queried using JOIN."
      ]
    },

    {
      id: "keys-and-joins",
      title: "19. Keys and JOIN Operations",

      paragraphs: [
        "JOIN operations commonly use key relationships to combine related rows from multiple tables."
      ],

      code: {
        language: "sql",
        code: `SELECT
    e.employee_id,
    e.employee_name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.department_id;`
      },

      bullets: [
        "e.department_id is the foreign key.",
        "d.department_id is the referenced key.",
        "The JOIN condition matches related rows.",
        "Good key design makes relationships easier to query."
      ]
    },

    {
      id: "jpa-keys",
      title: "20. Keys in Spring Data JPA",

      paragraphs: [
        "In Spring Boot applications using JPA, the primary key of an entity is commonly represented using @Id.",
        "Relationships can be represented using annotations such as @ManyToOne, @OneToMany, @OneToOne, and @ManyToMany."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long employeeId;

    private String employeeName;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}`
      },

      bullets: [
        "@Id identifies the entity's primary key.",
        "@GeneratedValue can configure generated identifier behavior.",
        "@ManyToOne models an employee-to-department relationship.",
        "@JoinColumn represents the foreign-key column used by the relationship."
      ]
    },

    {
      id: "key-design-example",
      title: "21. Real-World Key Design Example",

      paragraphs: [
        "Consider an e-commerce application with customers and orders.",
        "A customer can have many orders, so the customer table can have a primary key and the order table can contain a foreign key referencing it."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id BIGINT PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    order_date DATE NOT NULL,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);`
      },

      output: `customers
customer_id → Primary Key

orders
order_id → Primary Key
customer_id → Foreign Key`
    },

    {
      id: "common-mistakes",
      title: "22. Common Mistakes with SQL Keys",

      bullets: [
        "Creating a table without a meaningful primary key.",
        "Using a non-unique column as a primary key.",
        "Allowing NULL in a primary-key design.",
        "Confusing a primary key with a UNIQUE constraint.",
        "Assuming every UNIQUE constraint handles NULL in exactly the same way across databases.",
        "Forgetting a foreign key when referential integrity is required.",
        "Adding CASCADE without understanding its data-deletion consequences.",
        "Using a business field as a primary key even though it can change.",
        "Creating an unnecessarily large composite key.",
        "Assuming every index is a key.",
        "Assuming foreign-key columns are automatically indexed in every database implementation.",
        "Changing primary keys after other tables already depend on them without considering the impact."
      ]
    },

    {
      id: "best-practices",
      title: "23. SQL Key Design Best Practices",

      bullets: [
        "Every important relational table should have a deliberate row-identity strategy.",
        "Choose primary keys that are stable and unique.",
        "Use surrogate keys when they simplify identity and relationships.",
        "Use natural keys when the business identifier is genuinely stable and unique.",
        "Use UNIQUE constraints for important business-level uniqueness rules.",
        "Use foreign keys to maintain referential integrity when appropriate.",
        "Choose ON DELETE behavior deliberately.",
        "Keep composite keys as small and meaningful as possible.",
        "Index foreign-key columns when query patterns and database behavior justify it.",
        "Do not confuse indexes with keys.",
        "Avoid changing primary keys unnecessarily.",
        "Consider key design before creating large numbers of dependent tables."
      ]
    },

    {
      id: "scenario-interview",
      title: "24. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An employee table needs a unique identifier. Which key would you choose?",
          answer:
            "I would define a primary key, such as employee_id, because each employee needs a unique and non-null row identifier."
        },
        {
          question:
            "An employee belongs to a department. How would you represent that relationship?",
          answer:
            "I would store department_id in the employee table and define it as a foreign key referencing the department table's primary key."
        },
        {
          question:
            "A student can enroll in many courses and a course can have many students. What key design could be used?",
          answer:
            "I would use a junction table such as course_enrollments. A composite primary key of student_id and course_id can uniquely identify each enrollment."
        },
        {
          question:
            "Both employee_id and email are unique. Can both be candidate keys?",
          answer:
            "Yes, if both are minimal, unique, and suitable for identifying an employee. One can be selected as the primary key and the other can be enforced as an alternate key using a UNIQUE constraint."
        },
        {
          question:
            "Why might you choose a surrogate key instead of email as the primary key?",
          answer:
            "An artificial identifier such as employee_id is usually stable and has no dependency on a business attribute that might change."
        },
        {
          question:
            "What happens if an employee references a department that does not exist?",
          answer:
            "If the foreign-key constraint is enforced, the database normally rejects the operation because referential integrity would be violated."
        },
        {
          question:
            "When would you use a composite key?",
          answer:
            "I would use a composite key when the combination of multiple columns naturally defines uniqueness, such as student_id plus course_id in an enrollment table."
        },
        {
          question:
            "Should every foreign key use ON DELETE CASCADE?",
          answer:
            "No. CASCADE should be used only when deleting a parent should logically delete the dependent rows. Otherwise, RESTRICT, NO ACTION, SET NULL, or another appropriate behavior may be safer."
        }
      ]
    },

    {
      id: "interview",
      title: "25. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a primary key?",
          answer:
            "A primary key uniquely identifies each row and cannot contain NULL values. A table has one primary-key constraint, which may contain one or multiple columns."
        },
        {
          question: "What is a foreign key?",
          answer:
            "A foreign key enforces a relationship by requiring its non-NULL values to reference valid values in a referenced key, subject to the database's rules."
        },
        {
          question: "What is a composite key?",
          answer:
            "A composite key uses two or more columns together to identify a row uniquely."
        },
        {
          question: "What is the difference between PRIMARY KEY and UNIQUE?",
          answer:
            "Both enforce uniqueness, but a primary key also identifies the table's rows and disallows NULL. A table has one primary-key constraint, while it may have multiple UNIQUE constraints."
        },
        {
          question: "What is a candidate key?",
          answer:
            "A candidate key is a minimal set of attributes that can uniquely identify a row."
        },
        {
          question: "What is an alternate key?",
          answer:
            "An alternate key is a candidate key that was not selected as the table's primary key."
        },
        {
          question: "What is a natural key?",
          answer:
            "A natural key is a stable business attribute or combination of attributes that naturally identifies a record."
        },
        {
          question: "What is a surrogate key?",
          answer:
            "A surrogate key is an artificial identifier created specifically to identify a database record, such as a generated numeric ID or UUID."
        },
        {
          question: "Can a primary key contain multiple columns?",
          answer:
            "Yes. A primary key can be composite and contain multiple columns."
        },
        {
          question: "Can a table have multiple primary keys?",
          answer:
            "A table has one PRIMARY KEY constraint, although that constraint can contain multiple columns."
        },
        {
          question: "Can a table have multiple UNIQUE constraints?",
          answer:
            "Yes. A table can have multiple UNIQUE constraints on different columns or column combinations."
        },
        {
          question: "Can a foreign key contain NULL?",
          answer:
            "Yes, if the foreign-key column is nullable. In that case, NULL generally means the relationship is not specified, while non-NULL values must satisfy the foreign-key constraint."
        },
        {
          question: "What is referential integrity?",
          answer:
            "Referential integrity ensures that relationships represented by foreign keys remain valid according to the database constraints."
        },
        {
          question: "What is the purpose of ON DELETE CASCADE?",
          answer:
            "It can automatically delete dependent rows when the referenced parent row is deleted. It should be used only when that behavior matches the business relationship."
        },
        {
          question: "What is the difference between a key and an index?",
          answer:
            "A key is primarily related to identity or data integrity, while an index is a data structure used to improve access performance. A key may be backed by an index, but an index is not necessarily a key."
        },
        {
          question: "Why are foreign keys important?",
          answer:
            "Foreign keys maintain referential integrity and prevent invalid references between related tables when the constraints are enforced."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "26. Quick Revision",

      bullets: [
        "PRIMARY KEY → uniquely identifies table rows.",
        "FOREIGN KEY → references a key in another table.",
        "UNIQUE → prevents duplicate values according to database rules.",
        "CANDIDATE KEY → minimal possible unique identifier.",
        "ALTERNATE KEY → candidate key not selected as primary key.",
        "COMPOSITE KEY → key made from multiple columns.",
        "NATURAL KEY → business-meaningful identifier.",
        "SURROGATE KEY → artificial database identifier.",
        "Referential integrity → keeps foreign-key relationships valid.",
        "ON DELETE CASCADE → propagates parent deletion to dependent rows.",
        "JOIN → commonly combines rows using related key values.",
        "@Id → JPA primary-key mapping.",
        "@JoinColumn → commonly maps a relationship's foreign-key column.",
        "Index → improves suitable query access but is not automatically the same thing as a key."
      ]
    },

    {
      id: "one-minute-answer",
      title: "27. One-Minute Interview Answer",

      paragraphs: [
        "SQL keys are used to identify records, enforce uniqueness, and maintain relationships between tables. A primary key uniquely identifies each row and cannot contain NULL. A foreign key references a key in another table and maintains referential integrity. A candidate key is any minimal set of attributes that can uniquely identify a row, while the selected candidate becomes the primary key and the others are alternate keys. A composite key uses multiple columns together. A natural key has business meaning, while a surrogate key is an artificial identifier such as a generated ID. UNIQUE constraints enforce business-level uniqueness, and indexes are separate performance structures that may support keys and queries."
      ]
    },

    {
      id: "revision-notes",
      title: "28. Important Revision Notes",

      paragraphs: [
        "The easiest way to remember SQL keys is: PRIMARY KEY identifies the row, FOREIGN KEY connects tables, UNIQUE prevents duplicate values, CANDIDATE KEY is a possible unique identifier, ALTERNATE KEY is an unused candidate key, and COMPOSITE KEY combines multiple columns.",
        "For application development, a common design is to use a stable surrogate primary key such as employee_id and add UNIQUE constraints for important business identifiers such as email.",
        "Foreign keys protect relationships between tables. Always choose deletion and update actions carefully, especially CASCADE.",
        "Do not confuse keys with indexes. Keys primarily express identity and integrity rules, while indexes primarily improve data access performance."
      ]
    }
  ]
};
