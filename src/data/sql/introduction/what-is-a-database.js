
export const whatIsADatabase = {
  id: 2002,
  title: "What Is a Database?",
  slug: "what-is-a-database",
  topicTitle: "Introduction to SQL",
  description:
    "Learn what a database is, why applications need one, how relational databases organize information, and how backend applications use databases to store and retrieve persistent data.",
  estimatedTime: "25 min",

  sections: [
    {
      id: "database-definition",
      title: "1. What Is a Database?",

      paragraphs: [
        "A database is an organized collection of data that can be stored, accessed, and managed electronically.",
        "An e-commerce application might store customers, products, orders, and payments. Keeping this information in a database makes it easier to search, update, relate, and protect the data.",
        "A database is not the same as a database management system. The database contains the data and its organization; the DBMS is the software used to manage and access it.",
        "Applications use databases when they need data to remain available after the application process stops or the server restarts. This is called persistent storage."
      ],

      bullets: [
        "Customer database: customer names, email addresses, and contact information.",
        "Banking database: accounts, transactions, and balances.",
        "Learning platform database: courses, lessons, users, and progress.",
        "Inventory database: products, stock quantities, and suppliers.",
        "Employee database: employees, departments, salaries, and projects."
      ]
    },

    {
      id: "why-database",
      title: "2. Why Do Applications Need Databases?",

      paragraphs: [
        "An application needs a reliable way to store information that must survive beyond the lifetime of a single program execution.",
        "For example, when a user creates an account, the account information must still exist after the user closes the browser and after the backend application restarts.",
        "A database provides persistent storage and mechanisms for querying, modifying, organizing, and protecting that information."
      ],

      code: {
        language: "text",
        code: `React Frontend
      ↓
Spring Boot Backend
      ↓
Database
      ↓
Persistent Data

Application restarts
      ↓
Data still exists`
      },

      bullets: [
        "Persistent storage.",
        "Fast data retrieval.",
        "Data modification.",
        "Relationships between data.",
        "Transactions.",
        "Constraints.",
        "Access control.",
        "Concurrent access support."
      ]
    },

    {
      id: "database-example",
      title: "3. Real-World Database Example",

      paragraphs: [
        "Consider an online learning platform such as CodeForge.",
        "The application may need to store users, courses, lessons, coding problems, submissions, and learning progress.",
        "Instead of keeping this information only in Java objects or frontend state, the application stores it persistently in a database."
      ],

      code: {
        language: "text",
        code: `CodeForge Database

users
 ├── id
 ├── name
 ├── email
 └── password_hash

courses
 ├── id
 ├── title
 └── description

lessons
 ├── id
 ├── course_id
 ├── title
 └── content

submissions
 ├── id
 ├── user_id
 ├── problem_id
 └── status`
      }
    },

    {
      id: "database-table",
      title: "4. What Is a Table?",

      paragraphs: [
        "In a relational database, a table organizes related data into rows and columns. Each row represents a record, while each column represents an attribute of that record.",
        "A table usually represents one logical type of data, such as employees, products, customers, or orders."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT,
    employee_name VARCHAR(100),
    department VARCHAR(50)
);`
      },

      bullets: [
        "Table: employees.",
        "Columns: employee_id, employee_name, department.",
        "Row: one employee's stored record.",
        "Cell: one value at the intersection of a row and a column."
      ]
    },

    {
      id: "rows-and-columns",
      title: "5. Rows and Columns",

      paragraphs: [
        "A row represents one stored record in a table.",
        "A column represents one attribute of those records.",
        "For example, one row in an employees table can represent one employee, while the name column stores the employee's name."
      ],

      code: {
        language: "text",
        code: `employees

employee_id | employee_name | department
------------+---------------+------------
101         | Ravi          | IT
102         | Priya         | HR
103         | Kiran         | Finance

Rows
→ 101, 102, 103

Columns
→ employee_id
→ employee_name
→ department`
      }
    },

    {
      id: "database-schema",
      title: "6. What Is a Database Schema?",

      paragraphs: [
        "A database schema describes the structure of database objects such as tables, columns, relationships, constraints, and other objects.",
        "The exact meaning of the term schema can vary between database systems. In general application discussions, it is commonly used to describe how the database is structured."
      ],

      code: {
        language: "text",
        code: `Company Database Schema

employees
departments
projects
employee_projects
salaries

Relationships
employees → departments
employees → projects
employees → salaries`
      }
    },

    {
      id: "database-vs-spreadsheet",
      title: "7. Database vs Spreadsheet",

      paragraphs: [
        "A spreadsheet is useful for manual calculations and small datasets. A database management system is designed to support structured queries, controlled concurrent access, constraints, transactions, and application integration.",
        "Databases do not automatically guarantee that every design is correct. Developers must define appropriate constraints, permissions, relationships, and backup procedures."
      ],

      bullets: [
        "Databases support structured queries over large datasets.",
        "Constraints help prevent invalid data.",
        "Transactions help keep related changes consistent.",
        "Permissions can restrict which users or applications access data.",
        "Databases are designed for concurrent application access.",
        "Applications can interact with databases programmatically."
      ]
    },

    {
      id: "dbms",
      title: "8. What Is a DBMS?",

      paragraphs: [
        "DBMS stands for Database Management System.",
        "A DBMS is software that allows applications and administrators to create, store, retrieve, update, secure, and manage data.",
        "Examples include MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, and other database systems."
      ],

      code: {
        language: "text",
        code: `Application
     ↓
DBMS
     ↓
Database
     ↓
Stored Data`
      },

      bullets: [
        "Database = data and its organization.",
        "DBMS = software that manages the database.",
        "Application = software that uses the database."
      ]
    },

    {
      id: "rdbms",
      title: "9. What Is an RDBMS?",

      paragraphs: [
        "RDBMS stands for Relational Database Management System.",
        "An RDBMS stores data using the relational model, commonly represented by tables, rows, columns, keys, and relationships.",
        "MySQL, PostgreSQL, Oracle Database, and SQL Server are examples of relational database systems."
      ],

      code: {
        language: "text",
        code: `RDBMS

Database
│
├── Table
│   ├── Rows
│   └── Columns
│
├── Primary Keys
│
├── Foreign Keys
│
├── Constraints
│
└── Relationships`
      }
    },

    {
      id: "database-types",
      title: "10. Common Types of Databases",

      paragraphs: [
        "Databases can be categorized in different ways depending on how they organize and manage data.",
        "Relational databases are especially common in enterprise backend applications, while NoSQL databases are useful for certain data models and access patterns."
      ],

      code: {
        language: "text",
        code: `Relational
→ MySQL
→ PostgreSQL
→ Oracle
→ SQL Server

Document
→ MongoDB

Key-Value
→ Redis

Wide-Column
→ Cassandra

Graph
→ Neo4j`
      },

      bullets: [
        "Relational databases organize structured data into related tables.",
        "Document databases commonly store document-oriented data.",
        "Key-value databases store data as key and value pairs.",
        "Wide-column databases organize data around column families.",
        "Graph databases represent nodes and relationships."
      ]
    },

    {
      id: "primary-key",
      title: "11. Primary Key",

      paragraphs: [
        "A primary key uniquely identifies a row in a table.",
        "A table has one primary key constraint, which can consist of one column or multiple columns.",
        "A primary key is fundamental for identifying records and establishing relationships between tables."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100)
);`
      },

      bullets: [
        "Primary key values must uniquely identify records.",
        "A primary key cannot contain NULL values.",
        "A table has one primary key constraint.",
        "The primary key can contain multiple columns in a composite key."
      ]
    },

    {
      id: "foreign-key",
      title: "12. Foreign Key",

      paragraphs: [
        "A foreign key establishes a relationship between tables by referencing a candidate key, commonly the primary key, in another table.",
        "For example, an employee can belong to a department."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id BIGINT PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id BIGINT,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);`
      },

      bullets: [
        "Primary key identifies a record in its own table.",
        "Foreign key references a key in another table.",
        "Foreign keys help maintain referential integrity.",
        "Foreign keys commonly represent relationships between tables."
      ]
    },

    {
      id: "database-relationships",
      title: "13. Relationships Between Tables",

      paragraphs: [
        "Relational databases allow tables to represent relationships between different types of data.",
        "Common relationship patterns include one-to-one, one-to-many, and many-to-many."
      ],

      code: {
        language: "text",
        code: `Department
    |
    | 1
    |
    |------< many
             |
          Employees


Student
   |
   |------< Student_Course >------|
   |                               |
   |                               |
   +----------- Courses -----------+`
      },

      bullets: [
        "One-to-one: one record is associated with one record.",
        "One-to-many: one record is associated with many records.",
        "Many-to-many: many records are associated with many other records."
      ]
    },

    {
      id: "constraints",
      title: "14. Database Constraints",

      paragraphs: [
        "Constraints are rules enforced by the database to help maintain valid and consistent data.",
        "They provide an important layer of protection even when application-level validation already exists."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    salary DECIMAL(10, 2)
);`
      },

      bullets: [
        "PRIMARY KEY identifies rows.",
        "FOREIGN KEY maintains relationships.",
        "NOT NULL prevents NULL values.",
        "UNIQUE prevents duplicate values for a constraint.",
        "CHECK can enforce a condition where supported and appropriate.",
        "DEFAULT provides a value when one is not supplied."
      ]
    },

    {
      id: "data-types",
      title: "15. Database Data Types",

      paragraphs: [
        "Database columns have data types that define what kind of values can be stored.",
        "Choosing appropriate types helps preserve data correctness and can affect storage and query behavior."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    id BIGINT,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    active BOOLEAN,
    joining_date DATE,
    created_at TIMESTAMP
);`
      },

      bullets: [
        "Integer types store whole numbers.",
        "VARCHAR stores variable-length text.",
        "DECIMAL is commonly used for exact numeric values.",
        "BOOLEAN represents logical values where supported.",
        "DATE stores calendar dates.",
        "TIMESTAMP stores date and time information according to database semantics."
      ]
    },

    {
      id: "database-crud",
      title: "16. Basic Database Operations",

      paragraphs: [
        "Applications commonly perform four basic operations on stored data: create, read, update, and delete."
      ],

      code: {
        language: "text",
        code: `Create
INSERT

Read
SELECT

Update
UPDATE

Delete
DELETE`
      },

      bullets: [
        "Create new records.",
        "Read existing records.",
        "Update existing records.",
        "Delete records when required."
      ]
    },

    {
      id: "database-query",
      title: "17. Retrieving Data from a Database",

      paragraphs: [
        "A relational database can be queried using SQL.",
        "For example, an application can request all employees belonging to the IT department."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       department
FROM employees
WHERE department = 'IT';`
      },

      output: `employee_id | employee_name | department
------------+---------------+-----------
101         | Ravi          | IT
103         | Kiran         | IT`
    },

    {
      id: "database-persistence",
      title: "18. Database Provides Persistence",

      paragraphs: [
        "Persistence means data continues to exist after the application process that created it stops.",
        "Java objects stored only in application memory disappear when the application process terminates.",
        "Database records remain available until they are intentionally changed or removed."
      ],

      code: {
        language: "text",
        code: `Java Application Memory

Employee employee = new Employee();

Application stops
       ↓
Object disappears


Database

INSERT employee
       ↓
Application stops
       ↓
Database remains
       ↓
Employee can be retrieved later`
      }
    },

    {
      id: "application-database-flow",
      title: "19. How an Application Uses a Database",

      paragraphs: [
        "A backend application usually does not expose the database directly to the browser.",
        "Instead, the frontend communicates with the backend API, and the backend communicates with the database."
      ],

      code: {
        language: "text",
        code: `React Frontend
      ↓
HTTP Request
      ↓
Spring Boot Controller
      ↓
Service
      ↓
Repository
      ↓
Database
      ↓
Result
      ↓
Service
      ↓
Controller
      ↓
JSON Response
      ↓
React Frontend`
      }
    },

    {
      id: "database-transactions",
      title: "20. Database Transactions",

      paragraphs: [
        "A transaction groups related database operations into a unit of work.",
        "Transactions are important when multiple changes must remain consistent.",
        "For example, transferring money between two accounts may require updating both accounts as part of one transaction."
      ],

      code: {
        language: "text",
        code: `Transaction

UPDATE account A
      ↓
UPDATE account B
      ↓
COMMIT

If an operation fails:

UPDATE account A
      ↓
UPDATE account B
      ↓
ROLLBACK`
      },

      bullets: [
        "COMMIT makes a successful transaction permanent.",
        "ROLLBACK reverses transactional changes according to the database transaction rules.",
        "Transactions help maintain consistency across related operations."
      ]
    },

    {
      id: "database-concurrency",
      title: "21. Database and Concurrent Access",

      paragraphs: [
        "Backend applications often receive many requests at the same time.",
        "A database management system provides mechanisms for handling concurrent access while maintaining defined consistency guarantees.",
        "Transaction isolation and locking mechanisms help control how concurrent operations interact."
      ],

      code: {
        language: "text",
        code: `User A ──┐
         │
User B ──┼──> Database
         │
User C ──┘

Database manages
concurrent operations`
      }
    },

    {
      id: "normalization",
      title: "22. Database Normalization",

      paragraphs: [
        "Normalization is a database design technique used to organize relational data and reduce unnecessary duplication and update anomalies.",
        "Instead of storing the same department information repeatedly in every employee record, the department can be stored in a separate table and referenced using a foreign key."
      ],

      code: {
        language: "text",
        code: `Less Organized

employees
--------------------------------
id | name | department_name
1  | Ravi | Engineering
2  | Priya| Engineering
3  | Kiran| Engineering


Normalized

departments
-------------------------
id | name
10 | Engineering


employees
-------------------------
id | name | department_id
1  | Ravi | 10
2  | Priya| 10
3  | Kiran| 10`
      },

      bullets: [
        "Normalization can reduce redundant data.",
        "It can reduce update anomalies.",
        "It can improve consistency.",
        "Normalization should be balanced with application performance and access patterns."
      ]
    },

    {
      id: "indexes",
      title: "23. Database Indexes",

      paragraphs: [
        "An index is a database data structure that can make suitable searches and other query operations faster.",
        "Indexes are especially useful for frequently queried columns, but they also consume storage and can add overhead to writes."
      ],

      code: {
        language: "sql",
        code: `CREATE INDEX idx_employee_email
ON employees(email);`
      },

      bullets: [
        "Indexes can improve suitable read operations.",
        "Indexes consume additional storage.",
        "INSERT, UPDATE, and DELETE operations may have additional index-maintenance work.",
        "Indexes should be designed based on actual query patterns."
      ]
    },

    {
      id: "database-security",
      title: "24. Database Security",

      paragraphs: [
        "Database security protects stored information from unauthorized access, modification, or destruction.",
        "Applications should use appropriate database accounts and permissions rather than connecting with unrestricted administrative credentials."
      ],

      bullets: [
        "Use strong authentication.",
        "Apply least-privilege permissions.",
        "Protect database credentials.",
        "Use encrypted connections when appropriate.",
        "Avoid exposing the database directly to untrusted clients.",
        "Use parameterized queries to reduce SQL injection risk.",
        "Audit sensitive access where required."
      ]
    },

    {
      id: "database-backup",
      title: "25. Database Backup and Recovery",

      paragraphs: [
        "A database can contain critical business information, so applications need backup and recovery strategies.",
        "A backup is useful only when it can actually be restored successfully.",
        "Production systems should consider backup frequency, retention, recovery objectives, and restore testing."
      ],

      code: {
        language: "text",
        code: `Production Database
       ↓
Backup
       ↓
Stored Safely
       ↓
Restore Test
       ↓
Disaster Recovery`
      },

      bullets: [
        "Back up important data.",
        "Define retention requirements.",
        "Protect backups.",
        "Test restoration.",
        "Understand recovery objectives."
      ]
    },

    {
      id: "database-availability",
      title: "26. Database Availability",

      paragraphs: [
        "When a database becomes unavailable, backend operations that depend on it may also fail.",
        "Production database systems can use techniques such as replication, failover, backups, monitoring, and managed database services to improve availability."
      ],

      code: {
        language: "text",
        code: `Application
    ↓
Database
    |
    +---- Primary
    |
    +---- Replica
    |
    +---- Backup`
      }
    },

    {
      id: "database-sql",
      title: "27. Database and SQL",

      paragraphs: [
        "A relational database management system commonly uses SQL as its query language.",
        "SQL allows applications and developers to create database objects, retrieve records, modify data, and manage other database operations."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE employee_id = 101;`
      },

      bullets: [
        "Database = stored and organized data.",
        "DBMS = software that manages the database.",
        "SQL = language used to communicate with relational database systems."
      ]
    },

    {
      id: "database-jdbc-jpa",
      title: "28. Database in a Java Spring Boot Application",

      paragraphs: [
        "A Java Spring Boot application can access a relational database using JDBC directly or through higher-level abstractions such as Spring Data JPA and Hibernate.",
        "Even when an ORM generates SQL automatically, understanding database concepts and SQL remains important for backend developers."
      ],

      code: {
        language: "text",
        code: `React
  ↓
Spring Boot Controller
  ↓
Service
  ↓
Repository
  ↓
Spring Data JPA
  ↓
Hibernate
  ↓
JDBC
  ↓
Database`
      }
    },

    {
      id: "database-orm",
      title: "29. Why Does a Java Developer Need Database Knowledge?",

      paragraphs: [
        "A Java developer working on backend applications frequently interacts with persistent data.",
        "Understanding databases helps developers design entities, write repository queries, understand relationships, debug persistence errors, analyze performance problems, and reason about transactions."
      ],

      bullets: [
        "Understand JPA entity mapping.",
        "Understand primary and foreign keys.",
        "Write SQL queries.",
        "Understand JOINs.",
        "Understand indexes.",
        "Debug database exceptions.",
        "Understand transactions.",
        "Investigate slow queries.",
        "Design appropriate table relationships."
      ]
    },

    {
      id: "database-vs-memory",
      title: "30. Database vs Application Memory",

      paragraphs: [
        "Application memory and database storage serve different purposes.",
        "Java objects stored in memory are fast to access but normally exist only while the application process is running.",
        "Database storage provides persistence and is designed for durable application data."
      ],

      code: {
        language: "text",
        code: `Application Memory

Employee employee
      ↓
Fast temporary state


Database

employees table
      ↓
Persistent application state`
      }
    },

    {
      id: "common-mistakes",
      title: "31. Common Database Mistakes",

      bullets: [
        "Confusing a database with a DBMS.",
        "Using the database administrator account for the application.",
        "Ignoring primary and foreign keys.",
        "Storing duplicated data without considering consistency.",
        "Ignoring database constraints.",
        "Not creating appropriate indexes for important query patterns.",
        "Returning very large datasets without pagination.",
        "Not using transactions for related multi-step operations.",
        "Storing passwords as plain text.",
        "Hard-coding database credentials in source code.",
        "Ignoring backup and recovery requirements.",
        "Assuming application validation alone guarantees database integrity.",
        "Exposing the database directly to frontend clients."
      ]
    },

    {
      id: "best-practices",
      title: "32. Database Best Practices",

      bullets: [
        "Design tables around clear business concepts.",
        "Use appropriate primary keys.",
        "Use foreign keys where relationships require referential integrity.",
        "Choose appropriate data types.",
        "Use database constraints to protect data integrity.",
        "Use indexes based on actual query patterns.",
        "Use transactions for related multi-step operations.",
        "Apply least-privilege database access.",
        "Protect database credentials and secrets.",
        "Use parameterized SQL queries.",
        "Create and test backups.",
        "Monitor important database metrics.",
        "Use pagination for large result sets.",
        "Review slow queries using appropriate database tools."
      ]
    },

    {
      id: "real-world-example",
      title: "33. Real-World Employee Application",

      paragraphs: [
        "Consider an employee management application built with React, Spring Boot, and MySQL.",
        "The React frontend sends a request to the Spring Boot backend. The controller delegates to the service, the service uses the repository, and the repository interacts with the database."
      ],

      code: {
        language: "text",
        code: `React
  ↓
GET /api/employees/101
  ↓
EmployeeController
  ↓
EmployeeService
  ↓
EmployeeRepository
  ↓
MySQL
  ↓
employees table
  ↓
Employee record
  ↓
EmployeeResponse DTO
  ↓
JSON
  ↓
React`
      }
    },

    {
      id: "interview",
      title: "34. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a database?",
          answer:
            "A database is an organized collection of data that can be stored, retrieved, and managed electronically."
        },
        {
          question: "What is a DBMS?",
          answer:
            "A Database Management System is software used to create, query, modify, secure, and administer databases."
        },
        {
          question: "What is the difference between a database and a DBMS?",
          answer:
            "The database is the organized data and its structure. The DBMS is the software that manages that data."
        },
        {
          question: "Why do backend applications use databases?",
          answer:
            "Databases provide persistent storage, querying, relationships, transaction support, and controlled access to application data."
        },
        {
          question: "What is an RDBMS?",
          answer:
            "An RDBMS is a relational database management system that organizes data using the relational model, commonly represented through tables, rows, columns, keys, and relationships."
        },
        {
          question: "What is a table?",
          answer:
            "A table is a relational database structure that organizes related data into rows and columns."
        },
        {
          question: "What is a row?",
          answer:
            "A row represents one record in a table."
        },
        {
          question: "What is a column?",
          answer:
            "A column represents an attribute or field of the records stored in a table."
        },
        {
          question: "What is a primary key?",
          answer:
            "A primary key uniquely identifies a row in a table and cannot contain NULL values."
        },
        {
          question: "What is a foreign key?",
          answer:
            "A foreign key references a candidate key, commonly a primary key, in another table and is used to represent relationships and maintain referential integrity."
        },
        {
          question: "What is the difference between primary key and foreign key?",
          answer:
            "A primary key identifies a record in its own table, while a foreign key references a key in another table to represent a relationship."
        },
        {
          question: "What are database constraints?",
          answer:
            "Constraints are rules enforced by the database to help maintain valid and consistent data. Examples include PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, and CHECK."
        },
        {
          question: "What is database normalization?",
          answer:
            "Normalization is a database design technique used to organize relational data and reduce unnecessary duplication and update anomalies."
        },
        {
          question: "What is an index?",
          answer:
            "An index is a database data structure that can improve the performance of suitable queries, usually at the cost of additional storage and write overhead."
        },
        {
          question: "What is a transaction?",
          answer:
            "A transaction groups related database operations into a unit of work so that the database can maintain consistency according to the transaction's commit and rollback behavior."
        },
        {
          question: "Why are transactions important?",
          answer:
            "Transactions are important when multiple related changes must succeed or fail together, such as transferring money between accounts."
        },
        {
          question: "What is persistent storage?",
          answer:
            "Persistent storage is storage where data remains available after the application process stops or restarts."
        },
        {
          question: "What is the difference between database and application memory?",
          answer:
            "Application memory stores runtime state and is normally temporary, while database storage provides persistent storage for application data."
        },
        {
          question: "Can a frontend directly connect to a production database?",
          answer:
            "Normally no. A backend API should provide the application boundary and enforce authentication, authorization, validation, and controlled database access."
        },
        {
          question: "How does Spring Boot communicate with a database?",
          answer:
            "Spring Boot can use JDBC directly or higher-level technologies such as Spring Data JPA and Hibernate, which ultimately communicate with the database through a database driver."
        },
        {
          question: "Why should a Java developer understand databases if using JPA?",
          answer:
            "JPA abstracts many persistence details, but database knowledge is still necessary for entity design, relationships, queries, transactions, debugging, and performance analysis."
        },
        {
          question: "What is the difference between SQL and a database?",
          answer:
            "A database stores organized data, while SQL is a language commonly used to communicate with relational database systems."
        },
        {
          question: "What is the difference between MySQL and SQL?",
          answer:
            "SQL is a language, while MySQL is a relational database management system that implements and supports SQL."
        },
        {
          question: "Why are foreign keys useful?",
          answer:
            "Foreign keys represent relationships between tables and can help prevent references to nonexistent related records."
        },
        {
          question: "Why should database credentials be protected?",
          answer:
            "Database credentials provide access to stored data. Exposing them can allow unauthorized users to read, modify, or destroy application data."
        },
        {
          question: "Why are database backups important?",
          answer:
            "Backups provide a way to recover data after accidental deletion, corruption, hardware failure, security incidents, or other failures, provided the backups are usable and appropriately protected."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "35. Quick Revision",

      bullets: [
        "Database = organized collection of data.",
        "DBMS = software that manages databases.",
        "RDBMS = database management system based on the relational model.",
        "Table = collection of related records.",
        "Row = one record.",
        "Column = one attribute.",
        "Primary key = uniquely identifies a row.",
        "Foreign key = represents a relationship to another table.",
        "Constraint = rule that helps protect data integrity.",
        "Transaction = group of related database operations.",
        "Index = data structure that can speed up suitable queries.",
        "Normalization = technique for organizing relational data and reducing unnecessary duplication.",
        "Persistence = data survives application restarts.",
        "SQL = language commonly used with relational databases.",
        "Spring Boot can access databases through JDBC, JPA, Hibernate, and Spring Data.",
        "Frontend normally communicates with the backend rather than directly with the production database."
      ]
    },

    {
      id: "one-minute-answer",
      title: "36. One-Minute Interview Answer",

      paragraphs: [
        "A database is an organized collection of data that allows applications to persist, retrieve, update, and manage information. In a relational database, data is organized into tables containing rows and columns. Primary keys identify records, while foreign keys represent relationships between tables. Database constraints help maintain data integrity, indexes can improve suitable query performance, and transactions help keep related operations consistent. In a Spring Boot application, the frontend usually communicates with the backend, and the backend uses technologies such as JDBC, JPA, Hibernate, or Spring Data to communicate with the database."
      ]
    },

    {
      id: "revision-notes",
      title: "37. Important Revision Notes",

      paragraphs: [
        "Remember the basic difference: Database = data, DBMS = software that manages the data, SQL = language used to communicate with relational databases.",
        "Remember: Table → Rows + Columns.",
        "Remember: Primary Key → identifies a record.",
        "Remember: Foreign Key → represents a relationship.",
        "Remember: Constraint → protects data integrity.",
        "Remember: Index → can improve suitable query performance.",
        "Remember: Transaction → groups related database operations.",
        "Remember: Persistence → data survives application restarts.",
        "For Java backend interviews, database fundamentals are essential because Spring Data JPA and Hibernate do not eliminate the need to understand how relational databases work."
      ]
    }
  ]
};
