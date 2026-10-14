
export const relationalDatabaseConcepts = {
  id: 2003,
  title: "Relational Database Concepts",
  slug: "relational-database-concepts",
  topicTitle: "Introduction to SQL",
  description:
    "Understand relational databases, tables, rows, columns, schemas, keys, relationships, constraints, normalization, and how relational database concepts are used in backend applications.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "relational-model",
      title: "1. What Is a Relational Database?",

      paragraphs: [
        "A relational database stores structured data in tables and represents relationships between tables using keys.",
        "For example, a college database may contain students, courses, and enrollments. Rather than repeating all course details in every student record, the database can store the information in separate tables and connect them through keys.",
        "The relational model organizes data around relations, which are commonly represented as tables in database systems.",
        "SQL is commonly used to create, query, modify, and manage data in relational database systems."
      ],

      bullets: [
        "Tables store related records.",
        "Rows represent individual records.",
        "Columns define attributes and their data types.",
        "Keys identify records and connect related tables.",
        "Constraints help maintain data integrity.",
        "SQL is commonly used to query relational databases."
      ],

      code: {
        language: "text",
        code: `College Database

students
    ↓
enrollments
    ↓
courses

students
student_id | student_name

courses
course_id | course_name

enrollments
student_id | course_id`
      }
    },

    {
      id: "table-structure",
      title: "2. Tables, Rows, and Columns",

      paragraphs: [
        "A table represents a collection of related data.",
        "A row represents one record in the table.",
        "A column represents an attribute of those records.",
        "For example, an employees table can contain one row for each employee and columns such as employee_id, name, email, and department."
      ],

      code: {
        language: "text",
        code: `employees

employee_id | name  | email              | department
------------+-------+--------------------+-----------
101         | Ravi  | ravi@example.com   | IT
102         | Priya | priya@example.com  | HR
103         | Kiran | kiran@example.com  | Finance`
      },

      bullets: [
        "Table → employees.",
        "Row → one employee record.",
        "Column → employee_id, name, email, department.",
        "Cell → one value at the intersection of a row and column."
      ]
    },

    {
      id: "schema",
      title: "3. What Is a Schema?",

      paragraphs: [
        "A schema describes the structure of database objects, including tables, columns, data types, constraints, and relationships.",
        "In PostgreSQL, a schema is also a named namespace inside a database. MySQL organizes objects differently, so schema terminology and behavior should not be assumed to be identical across database products.",
        "In general database discussions, schema is often used when describing the structure and organization of database objects."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100),
    email VARCHAR(150)
);`
      },

      bullets: [
        "students is the table name.",
        "student_id, student_name, and email are columns.",
        "INT and VARCHAR define column data types.",
        "PRIMARY KEY defines a key constraint.",
        "The table definition is part of the database structure."
      ]
    },

    {
      id: "database-schema-example",
      title: "4. Example of a Relational Database Schema",

      paragraphs: [
        "A database schema can contain multiple related tables.",
        "For example, an employee management system may have employees and departments tables connected through department_id."
      ],

      code: {
        language: "text",
        code: `Company Database

departments
-------------------------
department_id | name
1             | IT
2             | HR


employees
------------------------------------------
employee_id | name  | department_id
101         | Ravi  | 1
102         | Priya | 2
103         | Kiran | 1

Relationship

departments.department_id
             ↑
             |
employees.department_id`
      }
    },

    {
      id: "relationships",
      title: "5. Relationships Between Tables",

      paragraphs: [
        "Tables can be related using key columns. These relationships help reduce repeated data and make it possible to retrieve information from multiple tables.",
        "A student may enroll in multiple courses, and each course may contain multiple students. This is a many-to-many relationship, usually represented through an enrollment table."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);`
      },

      bullets: [
        "One-to-one: one record corresponds to at most one related record.",
        "One-to-many: one department can have many employees.",
        "Many-to-many: many students can enroll in many courses.",
        "A junction table represents a many-to-many relationship."
      ]
    },

    {
      id: "one-to-one",
      title: "6. One-to-One Relationship",

      paragraphs: [
        "A one-to-one relationship means one record in one table is associated with at most one record in another table, and vice versa.",
        "For example, an employee might have one employee profile record."
      ],

      code: {
        language: "text",
        code: `Employee
   |
   | 1
   |
   |------ 1
           |
      EmployeeProfile`
      },

      bullets: [
        "One employee can have one profile.",
        "One profile belongs to one employee.",
        "A UNIQUE constraint on the foreign key can help enforce the one-to-one relationship."
      ]
    },

    {
      id: "one-to-many",
      title: "7. One-to-Many Relationship",

      paragraphs: [
        "A one-to-many relationship means one record in one table can be related to many records in another table.",
        "For example, one department can contain many employees."
      ],

      code: {
        language: "text",
        code: `Department
     |
     | 1
     |
     |------< many
              |
           Employee
           Employee
           Employee`
      },

      bullets: [
        "One department can have many employees.",
        "Each employee can belong to one department in this model.",
        "The foreign key is commonly stored on the many-side table."
      ]
    },

    {
      id: "many-to-many",
      title: "8. Many-to-Many Relationship",

      paragraphs: [
        "A many-to-many relationship means many records in one table can be associated with many records in another table.",
        "For example, students can enroll in multiple courses, and each course can have multiple students.",
        "A relational database normally represents this using a junction table."
      ],

      code: {
        language: "text",
        code: `Student
   |
   | many
   |
   ↓
Enrollment
   ↑
   |
   | many
   |
Course


Tables:

students
courses
enrollments`
      }
    },

    {
      id: "junction-table",
      title: "9. Junction Table",

      paragraphs: [
        "A junction table, also called an associative or bridge table, represents a many-to-many relationship.",
        "It normally contains foreign keys referencing the two related tables."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE enrollments (
    student_id INT,
    course_id INT,

    PRIMARY KEY (
        student_id,
        course_id
    ),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);`
      },

      bullets: [
        "student_id identifies the student.",
        "course_id identifies the course.",
        "The pair can form a composite primary key.",
        "The junction table can also contain relationship-specific data such as enrollment_date or grade."
      ]
    },

    {
      id: "keys",
      title: "10. What Are Keys?",

      paragraphs: [
        "Keys are columns or combinations of columns used to identify records and establish relationships between tables.",
        "The most important keys for beginners are primary keys and foreign keys."
      ],

      code: {
        language: "text",
        code: `Primary Key
→ Identifies a record

Foreign Key
→ References a key in another table

Composite Key
→ Uses multiple columns together

Candidate Key
→ Column or column combination
  that can uniquely identify a row`
      }
    },

    {
      id: "primary-key",
      title: "11. Primary Key",

      paragraphs: [
        "A primary key uniquely identifies a row within a table.",
        "A primary key constraint can consist of one column or multiple columns.",
        "Primary keys cannot contain NULL values."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100),
    email VARCHAR(150)
);`
      },

      bullets: [
        "A primary key identifies a row.",
        "Primary key values must be unique.",
        "A primary key cannot contain NULL.",
        "A table has one primary key constraint.",
        "The constraint can contain multiple columns."
      ]
    },

    {
      id: "foreign-key",
      title: "12. Foreign Key",

      paragraphs: [
        "A foreign key is a column or set of columns that references a candidate key, commonly the primary key, in another table.",
        "Foreign keys are used to represent relationships and help maintain referential integrity."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);`
      }
    },

    {
      id: "composite-key",
      title: "13. Composite Key",

      paragraphs: [
        "A composite key uses two or more columns together to uniquely identify a record.",
        "A common example is a junction table where the combination of student_id and course_id identifies one enrollment."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE enrollments (
    student_id INT,
    course_id INT,

    PRIMARY KEY (
        student_id,
        course_id
    )
);`
      },

      bullets: [
        "The combination is unique.",
        "student_id alone does not identify the enrollment.",
        "course_id alone does not identify the enrollment.",
        "The pair student_id + course_id identifies it."
      ]
    },

    {
      id: "candidate-key",
      title: "14. Candidate Key",

      paragraphs: [
        "A candidate key is a minimal set of columns that can uniquely identify a row.",
        "A table can have multiple candidate keys, but one key constraint is chosen as the primary key."
      ],

      code: {
        language: "text",
        code: `Employee

employee_id → unique
email       → unique

Both may be candidate keys.

Chosen primary key:
employee_id

Another candidate key:
email`
      }
    },

    {
      id: "constraints",
      title: "15. Constraints in Relational Databases",

      paragraphs: [
        "Constraints are rules enforced by the database to help maintain valid and consistent data.",
        "They are important because application validation alone cannot guarantee database integrity in every situation."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,

    employee_name VARCHAR(100)
        NOT NULL,

    email VARCHAR(150)
        UNIQUE,

    salary DECIMAL(10, 2)
);`
      },

      bullets: [
        "PRIMARY KEY → identifies rows.",
        "FOREIGN KEY → maintains relationships.",
        "NOT NULL → prevents NULL values.",
        "UNIQUE → prevents duplicate values for the constraint.",
        "CHECK → can enforce a condition where supported.",
        "DEFAULT → provides a default value."
      ]
    },

    {
      id: "referential-integrity",
      title: "16. Referential Integrity",

      paragraphs: [
        "Referential integrity means relationships between related tables remain valid according to their foreign key constraints.",
        "For example, an employee should not reference a department that does not exist when the foreign key requires a valid department."
      ],

      code: {
        language: "text",
        code: `departments

id
1
2


employees

id | department_id
101| 1
102| 2

Valid


employees

id | department_id
103| 99

Invalid if department 99
does not exist and the
foreign key prevents it.`
      }
    },

    {
      id: "normalization",
      title: "17. Normalization",

      paragraphs: [
        "Normalization is a database design technique used to organize relational data and reduce unnecessary duplication and update anomalies.",
        "Instead of storing the same department name repeatedly for every employee, the department can be stored in a separate table and referenced using department_id."
      ],

      code: {
        language: "text",
        code: `Less normalized

employees
--------------------------------
id | name  | department
1  | Ravi  | Engineering
2  | Priya | Engineering
3  | Kiran | Engineering


Normalized

departments
-------------------------
id | name
10 | Engineering


employees
-------------------------
id | name  | department_id
1  | Ravi  | 10
2  | Priya | 10
3  | Kiran | 10`
      },

      bullets: [
        "Normalization reduces unnecessary duplication.",
        "It can reduce update anomalies.",
        "It can improve consistency.",
        "The appropriate design depends on application requirements and access patterns."
      ]
    },

    {
      id: "denormalization",
      title: "18. Denormalization",

      paragraphs: [
        "Denormalization intentionally introduces some redundancy to improve particular read patterns or simplify certain queries.",
        "It should be a deliberate design decision rather than an accidental duplication of data.",
        "Denormalization can improve read performance in some systems but increases the responsibility of keeping duplicated values consistent."
      ],

      code: {
        language: "text",
        code: `Normalized

orders
   ↓
customers
   ↓
customer details


Possible denormalized read model

orders
--------------------------------
order_id
customer_id
customer_name
customer_city`
      }
    },

    {
      id: "joins",
      title: "19. Relationships and JOINs",

      paragraphs: [
        "Once related data is stored in separate tables, SQL JOINs can combine that information when querying.",
        "For example, an employee table can be joined with a department table to display the employee name together with the department name."
      ],

      code: {
        language: "sql",
        code: `SELECT
    e.employee_name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id =
       d.department_id;`
      },

      bullets: [
        "JOIN combines related data.",
        "ON specifies the relationship used for matching rows.",
        "INNER JOIN returns matching rows.",
        "LEFT JOIN preserves rows from the left table."
      ]
    },

    {
      id: "schema-vs-table",
      title: "20. Schema vs Table",

      paragraphs: [
        "A table is one database object used to store a particular set of records.",
        "A schema can describe the organization of database objects, and in systems such as PostgreSQL it is also a namespace containing objects.",
        "The exact terminology differs across database products, so developers should understand the specific database system they are using."
      ],

      code: {
        language: "text",
        code: `Conceptually

Database
   ↓
Schema / Namespace
   ↓
Tables
   ↓
Rows + Columns`
      }
    },

    {
      id: "relational-vs-nonrelational",
      title: "21. Relational vs Non-Relational Databases",

      paragraphs: [
        "Relational databases organize data primarily around tables and relationships.",
        "Non-relational or NoSQL databases use different models, such as documents, key-value pairs, wide columns, or graphs.",
        "The choice depends on data structure, consistency requirements, query patterns, scalability requirements, and application needs."
      ],

      code: {
        language: "text",
        code: `Relational

Employees
Departments
Projects
     ↓
Tables + Relationships


Document

User
{
  name: "Ravi",
  skills: [...]
}


Key-Value

"user:101"
       ↓
"user data"`
      },

      bullets: [
        "Relational databases are strong for structured relational data.",
        "NoSQL databases can be useful for specific access patterns and data models.",
        "Neither model is universally better for every application."
      ]
    },

    {
      id: "relational-request-flow",
      title: "22. Relational Database Request Flow",

      paragraphs: [
        "In a typical Spring Boot application, the frontend does not directly manipulate relational tables.",
        "The backend processes the request and uses a persistence layer to communicate with the database."
      ],

      code: {
        language: "text",
        code: `React
  ↓
HTTP Request
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
JPA / Hibernate
  ↓
SQL
  ↓
Relational Database
  ↓
Tables
  ↓
Rows
  ↓
Result
  ↓
Backend
  ↓
JSON Response`
      }
    },

    {
      id: "jpa-relational-mapping",
      title: "23. Relational Database and JPA",

      paragraphs: [
        "JPA allows Java applications to map Java objects to relational database structures.",
        "An entity commonly maps to a table, while fields map to columns.",
        "Relationships between entities can represent relationships between database tables."
      ],

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    private Long id;

    private String name;

    private String email;
}`
      },

      bullets: [
        "@Entity → persistent Java entity.",
        "@Table → table mapping.",
        "@Id → identifier mapping.",
        "Fields can map to database columns.",
        "JPA relationships can map to foreign-key relationships."
      ]
    },

    {
      id: "relational-benefits",
      title: "24. Advantages of Relational Databases",

      bullets: [
        "Structured data model.",
        "Strong relationship support.",
        "Primary and foreign keys.",
        "Database constraints.",
        "Transaction support.",
        "Powerful SQL querying.",
        "Mature tooling and ecosystem.",
        "Suitable for many enterprise applications.",
        "Good support for reporting and analytical queries.",
        "Well-defined data integrity mechanisms."
      ]
    },

    {
      id: "relational-limitations",
      title: "25. Limitations and Design Considerations",

      paragraphs: [
        "Relational databases are powerful, but database design must still consider application requirements.",
        "Highly normalized structures can sometimes require complex joins, while large-scale workloads may require careful indexing, partitioning, caching, replication, or other strategies.",
        "Choosing a relational database should be based on requirements rather than assuming one database model is always correct."
      ],

      bullets: [
        "Complex queries may require multiple JOINs.",
        "Indexes increase storage and write overhead.",
        "Poor schema design can create performance problems.",
        "High-scale systems may require additional architecture around the database.",
        "Transactions and constraints must be designed appropriately."
      ]
    },

    {
      id: "common-mistakes",
      title: "26. Common Relational Database Mistakes",

      bullets: [
        "Confusing a database with a DBMS.",
        "Using duplicate data without understanding the consistency consequences.",
        "Ignoring primary keys.",
        "Ignoring foreign keys when referential integrity is required.",
        "Using inappropriate data types.",
        "Creating unnecessary relationships.",
        "Creating too many JOINs without understanding the query.",
        "Adding indexes without considering write overhead.",
        "Assuming normalization alone guarantees good performance.",
        "Assuming every database product handles schemas identically.",
        "Relying only on application validation instead of database constraints.",
        "Exposing the database directly to frontend clients.",
        "Ignoring transaction requirements for multi-step operations."
      ]
    },

    {
      id: "best-practices",
      title: "27. Relational Database Best Practices",

      bullets: [
        "Design tables around clear business concepts.",
        "Use meaningful table and column names.",
        "Define appropriate primary keys.",
        "Use foreign keys when relationships require referential integrity.",
        "Choose appropriate data types.",
        "Use constraints to protect data integrity.",
        "Normalize data where appropriate.",
        "Use denormalization only for deliberate performance or access-pattern reasons.",
        "Create indexes based on real query patterns.",
        "Use transactions for related multi-step operations.",
        "Review query execution plans when performance problems occur.",
        "Protect database credentials.",
        "Use least-privilege database permissions.",
        "Understand the behavior of the specific database product being used."
      ]
    },

    {
      id: "scenario-example",
      title: "28. Complete College Database Example",

      paragraphs: [
        "Consider a college application where students can enroll in multiple courses and each course can contain multiple students.",
        "The relational design separates students and courses and uses enrollments as the relationship table."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,

    PRIMARY KEY (
        student_id,
        course_id
    ),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);`
      }
    },

    {
      id: "scenario-query",
      title: "29. Querying the Related Tables",

      paragraphs: [
        "Once the tables are related, a JOIN can retrieve the student and course information together."
      ],

      code: {
        language: "sql",
        code: `SELECT
    s.student_name,
    c.course_name
FROM students s
JOIN enrollments e
    ON s.student_id = e.student_id
JOIN courses c
    ON e.course_id = c.course_id
ORDER BY s.student_name;`
      },

      output: `student_name | course_name
-------------+----------------
Kiran        | Java
Kiran        | SQL
Priya        | Spring Boot
Ravi         | Java`
    },

    {
      id: "interview",
      title: "30. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a relational database?",
          answer:
            "A relational database stores structured data in tables and uses keys and relationships to connect related records."
        },
        {
          question: "What are rows and columns?",
          answer:
            "A row represents a record, while a column represents an attribute shared by records in the table."
        },
        {
          question: "What is a schema?",
          answer:
            "A schema describes database object structure. In PostgreSQL, it also acts as a namespace for objects within a database."
        },
        {
          question: "Why are relationships important?",
          answer:
            "Relationships connect records across tables, help maintain data integrity, and can reduce unnecessary duplication."
        },
        {
          question: "What are the common types of relationships?",
          answer:
            "The common relationship patterns are one-to-one, one-to-many, and many-to-many."
        },
        {
          question: "What is a one-to-many relationship?",
          answer:
            "It means one record in one table can be associated with many records in another table, such as one department having many employees."
        },
        {
          question: "What is a many-to-many relationship?",
          answer:
            "It means many records in one table can be associated with many records in another table. In a relational database, it is commonly represented using a junction table."
        },
        {
          question: "What is a junction table?",
          answer:
            "A junction table is a table used to represent a many-to-many relationship. It normally contains foreign keys referencing the related tables."
        },
        {
          question: "What is a primary key?",
          answer:
            "A primary key uniquely identifies a row in a table and cannot contain NULL values."
        },
        {
          question: "What is a foreign key?",
          answer:
            "A foreign key is a column or set of columns that references a candidate key, commonly a primary key, in another table."
        },
        {
          question: "What is a composite key?",
          answer:
            "A composite key uses two or more columns together to uniquely identify a record."
        },
        {
          question: "What is referential integrity?",
          answer:
            "Referential integrity means relationships represented by foreign keys remain valid according to the database constraints."
        },
        {
          question: "What is normalization?",
          answer:
            "Normalization is a database design technique used to organize relational data and reduce unnecessary duplication and update anomalies."
        },
        {
          question: "What is denormalization?",
          answer:
            "Denormalization intentionally introduces some redundancy to support particular read patterns or performance requirements."
        },
        {
          question: "What is the difference between a primary key and a foreign key?",
          answer:
            "A primary key identifies a record in its own table, while a foreign key references a key in another table to represent a relationship."
        },
        {
          question: "Can a table have multiple primary keys?",
          answer:
            "A table has one primary key constraint, although that constraint can contain multiple columns as a composite primary key."
        },
        {
          question: "Can a table have multiple foreign keys?",
          answer:
            "Yes. A table can have multiple foreign key constraints referencing one or more other tables."
        },
        {
          question: "What is the purpose of database constraints?",
          answer:
            "Constraints enforce rules that help maintain data integrity, such as uniqueness, required values, valid relationships, and other allowed conditions."
        },
        {
          question: "How are relational tables connected in SQL?",
          answer:
            "Tables are commonly connected using primary and foreign keys, and related data can be retrieved using JOIN operations."
        },
        {
          question: "What is the difference between a schema and a table?",
          answer:
            "A table is a database object that stores records. A schema describes database structure and, in systems such as PostgreSQL, also provides a namespace for database objects."
        },
        {
          question: "Does every database product use schemas in exactly the same way?",
          answer:
            "No. Schema terminology and behavior vary between database products. PostgreSQL schemas are named namespaces inside a database, while MySQL uses schema terminology differently."
        },
        {
          question: "How does JPA map to a relational database?",
          answer:
            "JPA maps Java entities and their fields and relationships to relational tables, columns, and foreign-key relationships."
        },
        {
          question: "Why is normalization useful?",
          answer:
            "Normalization can reduce unnecessary data duplication and prevent certain insertion, update, and deletion anomalies."
        },
        {
          question: "Is normalization always better for performance?",
          answer:
            "Not necessarily. Normalization improves data organization and consistency, but highly normalized designs may require more joins. Performance should be evaluated based on real access patterns and requirements."
        },
        {
          question: "What is the role of a foreign key in a many-to-many relationship?",
          answer:
            "The junction table normally contains foreign keys to both related tables, allowing each side to be associated with multiple records on the other side."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "31. Quick Revision",

      bullets: [
        "Relational database → structured data organized into related tables.",
        "Table → collection of related records.",
        "Row → one record.",
        "Column → one attribute.",
        "Schema → describes database object structure; in PostgreSQL, also a namespace.",
        "Primary key → uniquely identifies a row.",
        "Foreign key → references a key in another table.",
        "Composite key → multiple columns used together as a key.",
        "One-to-one → one record relates to at most one record.",
        "One-to-many → one record relates to many records.",
        "Many-to-many → many records relate to many records.",
        "Junction table → represents many-to-many relationships.",
        "Constraint → database rule for data integrity.",
        "Referential integrity → keeps foreign-key relationships valid.",
        "Normalization → reduces unnecessary duplication and anomalies.",
        "Denormalization → deliberate redundancy for specific requirements.",
        "JOIN → combines related table data.",
        "JPA → maps Java objects to relational persistence structures."
      ]
    },

    {
      id: "one-minute-answer",
      title: "32. One-Minute Interview Answer",

      paragraphs: [
        "A relational database stores structured data in tables made up of rows and columns. Relationships between tables are represented using keys, especially primary keys and foreign keys. Common relationship types are one-to-one, one-to-many, and many-to-many, with many-to-many relationships usually represented using a junction table. Constraints help maintain data integrity, while normalization can reduce unnecessary duplication. SQL is used to query relational databases, and technologies such as JPA and Hibernate allow Java applications to map objects to relational tables and relationships."
      ]
    },

    {
      id: "revision-notes",
      title: "33. Important Revision Notes",

      paragraphs: [
        "Remember: Relational database → Tables + Relationships.",
        "Remember: Table → Rows + Columns.",
        "Remember: Primary Key → identifies a record.",
        "Remember: Foreign Key → connects related tables.",
        "Remember: One-to-Many → one department can have many employees.",
        "Remember: Many-to-Many → students and courses, usually with a junction table.",
        "Remember: Normalization → reduce unnecessary duplication and anomalies.",
        "Remember: Constraint → protect data integrity.",
        "Remember: JOIN → retrieve related information from multiple tables.",
        "For Spring Boot interviews, understand how relational concepts map to JPA: Entity → Table, field → Column, @Id → Identifier, and relationship mapping → Foreign Key relationships."
      ]
    }
  ]
};