
export const createDatabaseAndTables = {
  id: 2006,
  title: "Creating Databases and Tables",
  slug: "create-database-and-tables",
  topicTitle: "Introduction to SQL",
  description:
    "Learn how to create databases and tables, define columns and data types, apply constraints, insert sample records, inspect table structures, and understand how database creation fits into backend applications.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "create-database",
      title: "1. Creating a Database",

      paragraphs: [
        "A database groups related database objects and data. In database systems that support CREATE DATABASE, the statement creates a new database.",
        "Database creation and permissions differ by product. MySQL and PostgreSQL both support CREATE DATABASE, but their connection and administration workflows are not identical.",
        "A database is usually created before application tables are created inside it."
      ],

      code: {
        language: "sql",
        code: `CREATE DATABASE company_db;`
      },

      bullets: [
        "Choose a meaningful database name.",
        "Ensure you have permission to create databases.",
        "Connect to the new database using the appropriate client command or database tool.",
        "Database names and naming rules can vary between database products."
      ]
    },

    {
      id: "create-database-if-not-exists",
      title: "2. CREATE DATABASE IF NOT EXISTS",

      paragraphs: [
        "Some database systems support IF NOT EXISTS with CREATE DATABASE.",
        "It allows the command to avoid failing simply because the database already exists, although exact behavior and supported syntax depend on the database product."
      ],

      code: {
        language: "sql",
        code: `CREATE DATABASE IF NOT EXISTS company_db;`
      },

      bullets: [
        "Useful in development scripts.",
        "Prevents an already-existing database from causing the same type of creation error.",
        "Do not assume identical behavior across all database products."
      ]
    },

    {
      id: "connect-database",
      title: "3. Connecting to the Database",

      paragraphs: [
        "After creating a database, the SQL client or database administration tool needs to connect to that database before tables can be created inside it.",
        "The exact command depends on the database system and client."
      ],

      code: {
        language: "text",
        code: `Database
   ↓
company_db
   ↓
employees
departments
projects`
      },

      bullets: [
        "In MySQL, a client can select a database using USE company_db.",
        "In PostgreSQL, the client connection normally specifies the target database.",
        "Graphical tools may provide a database selector instead of a command."
      ]
    },

    {
      id: "use-database",
      title: "4. Selecting a Database in MySQL",

      paragraphs: [
        "In MySQL, USE selects the database against which subsequent statements are executed."
      ],

      code: {
        language: "sql",
        code: `CREATE DATABASE company_db;

USE company_db;`
      },

      output: `The current MySQL session is now using company_db.`
    },

    {
      id: "create-table",
      title: "5. Creating a Table",

      paragraphs: [
        "CREATE TABLE defines a table and its columns.",
        "Each column has a name and a data type. Constraints can define rules for valid data.",
        "A table represents a particular type of data, such as employees, customers, products, or orders."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    salary DECIMAL(10, 2),
    joining_date DATE
);`
      },

      bullets: [
        "employee_id identifies an employee.",
        "NOT NULL requires employee_name to have a value.",
        "UNIQUE prevents duplicate values according to the database's uniqueness and NULL rules.",
        "DECIMAL(10, 2) stores a fixed-precision decimal salary.",
        "The final semicolon ends the SQL statement."
      ]
    },

    {
      id: "table-anatomy",
      title: "6. Anatomy of CREATE TABLE",

      paragraphs: [
        "A CREATE TABLE statement contains the table name, column definitions, data types, and optional constraints."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    salary DECIMAL(10, 2),
    joining_date DATE
);`
      },

      bullets: [
        "employees → table name.",
        "employee_id → column name.",
        "INT → column data type.",
        "PRIMARY KEY → identity constraint.",
        "VARCHAR(100) → variable-length text.",
        "NOT NULL → value is required.",
        "UNIQUE → prevents duplicate values according to database rules.",
        "DECIMAL(10, 2) → exact decimal value with precision and scale.",
        "DATE → calendar date."
      ]
    },

    {
      id: "primary-key",
      title: "7. PRIMARY KEY While Creating a Table",

      paragraphs: [
        "A primary key uniquely identifies each row in a table.",
        "A primary key must satisfy the database's primary-key rules, including uniqueness and non-nullability."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);`
      },

      bullets: [
        "Each department gets a unique department_id.",
        "A primary key helps identify a specific row.",
        "A table has one primary-key constraint, which can consist of one or multiple columns."
      ]
    },

    {
      id: "not-null",
      title: "8. NOT NULL Constraint",

      paragraphs: [
        "NOT NULL prevents a column from containing NULL values."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL
);`
      },

      bullets: [
        "employee_name must have a value.",
        "The database rejects an insert or update that attempts to assign NULL to the column.",
        "NOT NULL does not prevent an empty string; an empty string is still a string value."
      ]
    },

    {
      id: "unique",
      title: "9. UNIQUE Constraint",

      paragraphs: [
        "UNIQUE requires values in a column or column combination to be unique according to the database's uniqueness rules."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    email VARCHAR(150) UNIQUE
);`
      },

      bullets: [
        "Two employees cannot have the same email value when the UNIQUE constraint considers them duplicates.",
        "Handling of NULL values in UNIQUE columns differs by database product.",
        "UNIQUE is different from PRIMARY KEY because a primary key identifies the row and is non-null."
      ]
    },

    {
      id: "foreign-key-preview",
      title: "10. FOREIGN KEY Preview",

      paragraphs: [
        "A foreign key connects related tables by requiring values in one table to reference a key in another table.",
        "Foreign keys are important when designing relational databases."
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
        "departments is the referenced table.",
        "employees is the referencing table.",
        "department_id connects an employee to a department.",
        "Foreign keys help maintain referential integrity."
      ]
    },

    {
      id: "insert-records",
      title: "11. Inserting Sample Records",

      paragraphs: [
        "INSERT INTO adds data to a table.",
        "Explicitly naming the columns makes the statement easier to understand and avoids depending on the table's physical column order."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, email, salary, joining_date)
VALUES
    (1, 'Ravi', 'ravi@example.com', 45000.00, '2025-01-15'),
    (2, 'Priya', 'priya@example.com', 52000.00, '2025-03-10');`
      },

      output:
        "Two employee records are inserted if the statement succeeds and the values satisfy the table constraints."
    },

    {
      id: "single-insert",
      title: "12. Inserting a Single Record",

      paragraphs: [
        "A single row can be inserted using one VALUES clause."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, email, salary, joining_date)
VALUES
    (3, 'Arun', 'arun@example.com', 48000.00, '2025-04-20');`
      }
    },

    {
      id: "multiple-insert",
      title: "13. Inserting Multiple Records",

      paragraphs: [
        "Multiple rows can often be inserted using one INSERT statement with multiple value groups."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, email, salary, joining_date)
VALUES
    (4, 'Kiran', 'kiran@example.com', 55000.00, '2025-05-10'),
    (5, 'Anita', 'anita@example.com', 60000.00, '2025-06-15');`
      },

      bullets: [
        "The column list applies to every row in the VALUES list.",
        "Each row must provide compatible values.",
        "The database checks applicable constraints before accepting the rows."
      ]
    },

    {
      id: "inspect-table",
      title: "14. Reading the Table",

      code: {
        language: "sql",
        code: `SELECT *
FROM employees;`
      },

      paragraphs: [
        "The asterisk selects all columns.",
        "It is convenient when learning or exploring data, but production queries often benefit from explicitly selecting only the columns required."
      ]
    },

    {
      id: "select-specific-columns",
      title: "15. Selecting Specific Columns",

      paragraphs: [
        "Instead of selecting every column, a query can explicitly request only the columns required by the application."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       email
FROM employees;`
      },

      bullets: [
        "Makes the query intention clearer.",
        "Avoids retrieving unnecessary columns.",
        "Can reduce the amount of data transferred to the application.",
        "Makes API and repository queries easier to reason about."
      ]
    },

    {
      id: "inspect-structure",
      title: "16. Inspecting Table Structure",

      paragraphs: [
        "Database systems provide commands or tools for inspecting table definitions.",
        "The exact command is database-specific."
      ],

      code: {
        language: "sql",
        code: `-- MySQL example
DESCRIBE employees;`
      },

      bullets: [
        "DESCRIBE is commonly available in MySQL.",
        "PostgreSQL commonly uses information_schema, \\d commands in psql, or graphical tools.",
        "Database-specific inspection commands should not be assumed to work identically everywhere."
      ]
    },

    {
      id: "complete-example",
      title: "17. Complete Database and Table Example",

      paragraphs: [
        "The following example shows a simple sequence: create a database, select it in MySQL, create a department table, create an employee table, insert data, and read the data."
      ],

      code: {
        language: "sql",
        code: `CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    salary DECIMAL(10, 2),
    joining_date DATE,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

INSERT INTO departments
    (department_id, department_name)
VALUES
    (1, 'Engineering'),
    (2, 'HR');

INSERT INTO employees
    (employee_id, employee_name, email, salary, joining_date, department_id)
VALUES
    (1, 'Ravi', 'ravi@example.com', 45000.00, '2025-01-15', 1),
    (2, 'Priya', 'priya@example.com', 52000.00, '2025-03-10', 2);

SELECT employee_id,
       employee_name,
       email,
       salary
FROM employees;`
      }
    },

    {
      id: "execution-flow",
      title: "18. Database Creation Flow",

      code: {
        language: "text",
        code: `Create Database
      ↓
Connect / Select Database
      ↓
Create Tables
      ↓
Define Columns
      ↓
Apply Constraints
      ↓
Insert Records
      ↓
Query Records`
      },

      paragraphs: [
        "This is the basic workflow when starting a relational database for an application."
      ]
    },

    {
      id: "spring-boot-database",
      title: "19. Creating Tables for a Spring Boot Application",

      paragraphs: [
        "In a Spring Boot application, developers can create database tables manually using SQL, use migration tools such as Flyway or Liquibase, or allow JPA/Hibernate schema generation to create or update schema during development.",
        "For production systems, versioned migrations are generally preferred because schema changes become explicit, reviewable, and reproducible."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        ↓
Database Configuration
        ↓
MySQL / PostgreSQL
        ↓
Schema
        ↓
Tables
        ↓
Rows`
      },

      bullets: [
        "application.properties or application.yml contains database connection configuration.",
        "JPA/Hibernate can map Java entities to database tables.",
        "Migration tools can manage CREATE TABLE and ALTER TABLE changes.",
        "The chosen approach should match the application's environment and deployment strategy."
      ]
    },

    {
      id: "jpa-example",
      title: "20. Java Entity to Database Table",

      paragraphs: [
        "With Spring Data JPA, a Java entity can represent a database table.",
        "Hibernate, acting as a JPA provider, can use this mapping to generate SQL depending on the application's schema-generation configuration."
      ],

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    private Long employeeId;

    @Column(nullable = false, length = 100)
    private String employeeName;

    @Column(unique = true, length = 150)
    private String email;

    private BigDecimal salary;

    private LocalDate joiningDate;
}`
      },

      bullets: [
        "@Entity marks the class as a persistent entity.",
        "@Table can specify the database table name.",
        "@Id identifies the primary key.",
        "@Column can customize column mapping.",
        "The final database schema depends on JPA provider, database dialect, and schema-generation or migration configuration."
      ]
    },

    {
      id: "naming",
      title: "21. Database Naming Best Practices",

      paragraphs: [
        "Consistent naming makes a database easier to understand and maintain."
      ],

      bullets: [
        "Use meaningful table names.",
        "Use meaningful column names.",
        "Follow one naming convention consistently.",
        "Avoid confusing abbreviations.",
        "Use consistent primary-key naming.",
        "Use consistent foreign-key naming such as department_id.",
        "Be aware that database products can differ in case sensitivity and identifier rules."
      ]
    },

    {
      id: "constraints-summary",
      title: "22. Common Table Constraints",

      bullets: [
        "PRIMARY KEY → uniquely identifies rows.",
        "FOREIGN KEY → references a key in another table.",
        "NOT NULL → prevents NULL values.",
        "UNIQUE → enforces uniqueness according to database rules.",
        "CHECK → restricts values according to a condition where supported.",
        "DEFAULT → supplies a default value when one is not explicitly provided."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    salary DECIMAL(10, 2) CHECK (salary >= 0),
    active BOOLEAN DEFAULT TRUE
);`
      }
    },

    {
      id: "common-mistakes",
      title: "23. Common Mistakes",

      bullets: [
        "Trying to create a table before selecting or connecting to the intended database.",
        "Using an inappropriate data type.",
        "Forgetting a primary key.",
        "Forgetting NOT NULL on values that are mandatory according to the domain.",
        "Using VARCHAR for values that should be stored as numbers or dates.",
        "Using FLOAT for monetary values when exact decimal arithmetic is required.",
        "Forgetting foreign keys when referential integrity is required.",
        "Using duplicate column names.",
        "Inserting values in the wrong column order when the column list is omitted.",
        "Using SELECT * everywhere in production queries.",
        "Changing production schemas manually without a controlled migration process.",
        "Assuming MySQL and PostgreSQL support exactly the same CREATE TABLE syntax."
      ]
    },

    {
      id: "best-practices",
      title: "24. Best Practices",

      bullets: [
        "Choose meaningful database and table names.",
        "Choose data types based on actual requirements.",
        "Define primary keys for tables that represent identifiable records.",
        "Use foreign keys when relationships require database-level referential integrity.",
        "Use NOT NULL for mandatory attributes.",
        "Use UNIQUE for values that must be unique.",
        "Use CHECK constraints where appropriate and supported.",
        "Use explicit column lists in INSERT statements.",
        "Prefer explicit columns instead of SELECT * in application queries.",
        "Use database migration tools for production schema changes.",
        "Keep schema changes version-controlled.",
        "Test schema changes before deploying them to production.",
        "Take appropriate backups before destructive schema operations."
      ]
    },

    {
      id: "scenario-interview",
      title: "25. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You are starting a new employee management application. What would you create first?",
          answer:
            "I would create or provision the target database, connect to it, and then create the required tables with appropriate columns, data types, keys, and constraints."
        },
        {
          question:
            "How would you create an employee table with a unique employee ID?",
          answer:
            "I would define employee_id as the PRIMARY KEY, for example employee_id INT PRIMARY KEY."
        },
        {
          question:
            "How would you prevent duplicate employee email addresses?",
          answer:
            "I would add a UNIQUE constraint to the email column, while also considering the application's rules around NULL values and case sensitivity."
        },
        {
          question:
            "How would you make employee_name mandatory?",
          answer:
            "I would use NOT NULL on the employee_name column."
        },
        {
          question:
            "An employee belongs to a department. How would you model that relationship?",
          answer:
            "I would create a departments table with a primary key and store department_id in employees as a foreign key referencing departments."
        },
        {
          question:
            "Why should INSERT specify column names?",
          answer:
            "Explicit column names make the statement clear and avoid depending on the table's physical column order."
        },
        {
          question:
            "How would you inspect the employee table definition?",
          answer:
            "I would use database-specific inspection facilities. For example, MySQL supports DESCRIBE employees; PostgreSQL commonly uses information_schema, psql commands, or database administration tools."
        },
        {
          question:
            "How should production database schema changes be managed?",
          answer:
            "I would normally use a versioned migration approach such as Flyway or Liquibase so schema changes are reviewed, tracked, repeatable, and deployable across environments."
        }
      ]
    },

    {
      id: "interview",
      title: "26. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "Which command creates a table?",
          answer:
            "CREATE TABLE creates a table with specified columns, data types, and optional constraints."
        },
        {
          question: "Which command creates a database?",
          answer:
            "CREATE DATABASE creates a database in database systems that support the command."
        },
        {
          question: "Why should we specify column names in INSERT?",
          answer:
            "Explicit column names make the statement clear and avoid depending on the table's physical column order."
        },
        {
          question: "What does SELECT * mean?",
          answer:
            "It selects all columns exposed by the query. Explicit column lists are often preferable for maintainability and reducing unnecessary data retrieval."
        },
        {
          question: "What is a primary key?",
          answer:
            "A primary key uniquely identifies rows in a table and must satisfy the database's primary-key rules, including uniqueness and non-nullability."
        },
        {
          question: "What is a foreign key?",
          answer:
            "A foreign key is a constraint that requires values in one table to reference an appropriate key in another table, helping maintain referential integrity."
        },
        {
          question: "What is the purpose of NOT NULL?",
          answer:
            "NOT NULL prevents a column from storing NULL values."
        },
        {
          question: "What is the purpose of UNIQUE?",
          answer:
            "UNIQUE enforces uniqueness for a column or combination of columns according to the database's uniqueness rules."
        },
        {
          question: "What is the difference between PRIMARY KEY and UNIQUE?",
          answer:
            "A primary key identifies the row and is subject to non-null and uniqueness requirements. A table can have multiple UNIQUE constraints, while it has one primary-key constraint."
        },
        {
          question: "Can table creation syntax differ between databases?",
          answer:
            "Yes. Common SQL syntax is widely shared, but data types, identity generation, options, constraints, and other features vary by database product."
        },
        {
          question: "Why should SELECT * generally be avoided in production application queries?",
          answer:
            "Selecting only required columns can reduce unnecessary data retrieval, make query intent clearer, and reduce coupling to table changes."
        },
        {
          question: "How does Spring Boot work with database tables?",
          answer:
            "Spring Boot can connect to a relational database through JDBC or JPA. With JPA, entities represent persistent data and Hibernate can generate SQL based on mappings and configuration. Production applications commonly use migration tools to manage schema changes."
        },
        {
          question: "What is the difference between creating a table and inserting a record?",
          answer:
            "CREATE TABLE defines the structure of the table, while INSERT adds data rows to that existing structure."
        },
        {
          question: "What happens if an INSERT violates a constraint?",
          answer:
            "The database normally rejects the operation or statement according to the violated constraint and database transaction semantics."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "27. Quick Revision",

      bullets: [
        "CREATE DATABASE → creates a database where supported.",
        "USE → selects a database in MySQL.",
        "CREATE TABLE → creates a table.",
        "Column → has a name and data type.",
        "PRIMARY KEY → identifies rows.",
        "FOREIGN KEY → connects related tables.",
        "NOT NULL → prevents NULL values.",
        "UNIQUE → enforces uniqueness according to database rules.",
        "CHECK → validates a condition where supported.",
        "DEFAULT → supplies a default value.",
        "INSERT → adds rows.",
        "SELECT → retrieves rows.",
        "DESCRIBE → commonly inspects table structure in MySQL.",
        "Migration tools → manage controlled schema changes.",
        "JPA/Hibernate → can map Java entities to database tables."
      ]
    },

    {
      id: "one-minute-answer",
      title: "28. One-Minute Interview Answer",

      paragraphs: [
        "To create a relational database structure, I first create or provision the database using CREATE DATABASE where supported. Then I connect to or select that database and use CREATE TABLE to define tables. Each table contains columns with appropriate data types and constraints such as PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, and DEFAULT. After creating the tables, I can use INSERT to add records and SELECT to retrieve them. In a Spring Boot application, these tables can be managed through SQL migrations or JPA/Hibernate mappings. For production systems, I prefer version-controlled migration tools so schema changes are consistent across environments."
      ]
    },

    {
      id: "revision-notes",
      title: "29. Important Revision Notes",

      paragraphs: [
        "Remember the basic sequence: Database → Connection/Selection → Tables → Columns → Constraints → Records → Queries.",
        "CREATE DATABASE creates the database.",
        "CREATE TABLE creates the table structure.",
        "INSERT adds rows.",
        "SELECT reads rows.",
        "PRIMARY KEY identifies a row.",
        "FOREIGN KEY establishes a relationship between tables.",
        "NOT NULL prevents missing values.",
        "UNIQUE prevents duplicate values according to database rules.",
        "Use explicit column names with INSERT.",
        "Use explicit columns instead of SELECT * when writing production application queries.",
        "For production schema management, use controlled and versioned migrations rather than relying on manual changes."
      ]
    }
  ]
};
