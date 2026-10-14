
export const sqlCommandCategories = {
  id: 2004,
  title: "SQL Command Categories",
  slug: "sql-command-categories",
  topicTitle: "Introduction to SQL",
  description:
    "Understand DDL, DML, DQL, DCL, and transaction-control commands with practical examples, differences, execution behavior, and backend application use cases.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "ddl",
      title: "1. DDL — Data Definition Language",

      paragraphs: [
        "DDL stands for Data Definition Language.",
        "DDL commands define or change database structures, such as tables, columns, constraints, indexes, and other database objects.",
        "DDL primarily changes the structure or definition of database objects rather than manipulating individual application records."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

ALTER TABLE departments
ADD location VARCHAR(100);

DROP TABLE departments;`
      },

      bullets: [
        "CREATE: creates database objects.",
        "ALTER: changes object structure.",
        "DROP: removes database objects.",
        "TRUNCATE: removes all rows while retaining the table structure, subject to database-specific behavior."
      ]
    },

    {
      id: "ddl-create",
      title: "2. CREATE Command",

      paragraphs: [
        "CREATE is used to create database objects such as tables, indexes, views, schemas, and other objects depending on the database system.",
        "CREATE TABLE is one of the most common DDL commands for backend developers."
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
        "Defines the table structure.",
        "Defines column names.",
        "Defines data types.",
        "Can define constraints."
      ]
    },

    {
      id: "ddl-alter",
      title: "3. ALTER Command",

      paragraphs: [
        "ALTER changes the structure of an existing database object.",
        "For example, a new column can be added to an existing table."
      ],

      code: {
        language: "sql",
        code: `ALTER TABLE employees
ADD department VARCHAR(100);`
      },

      bullets: [
        "ALTER can add columns.",
        "ALTER can modify columns depending on database support.",
        "ALTER can remove columns depending on database support.",
        "ALTER can change constraints and other object definitions."
      ]
    },

    {
      id: "ddl-drop",
      title: "4. DROP Command",

      paragraphs: [
        "DROP removes a database object.",
        "Dropping a table removes the table definition and its stored rows, subject to the database system's dependency and transaction behavior."
      ],

      code: {
        language: "sql",
        code: `DROP TABLE employees;`
      },

      bullets: [
        "DROP TABLE removes the table object.",
        "It is a destructive operation.",
        "Dependent objects or constraints can affect whether the operation is allowed."
      ]
    },

    {
      id: "ddl-truncate",
      title: "5. TRUNCATE Command",

      paragraphs: [
        "TRUNCATE removes all rows from a table while keeping the table structure.",
        "Its logging, identity-reset behavior, locking, and transaction semantics vary between database products, so developers should check the documentation of the database they are using."
      ],

      code: {
        language: "sql",
        code: `TRUNCATE TABLE employees;`
      },

      bullets: [
        "Removes all rows.",
        "Does not remove the table definition.",
        "Does not normally support a WHERE clause.",
        "Behavior differs across database products."
      ]
    },

    {
      id: "ddl-comparison",
      title: "6. CREATE vs ALTER vs DROP vs TRUNCATE",

      code: {
        language: "text",
        code: `CREATE
→ Creates a database object

ALTER
→ Changes an existing object

TRUNCATE
→ Removes all rows while keeping
  the table structure

DROP
→ Removes the database object`
      },

      bullets: [
        "CREATE changes the database by adding an object.",
        "ALTER changes the definition of an existing object.",
        "TRUNCATE removes table data while retaining the table structure.",
        "DROP removes the object itself."
      ]
    },

    {
      id: "dml",
      title: "7. DML — Data Manipulation Language",

      paragraphs: [
        "DML stands for Data Manipulation Language.",
        "DML commands insert, update, and delete data stored in tables.",
        "DML works with the rows inside existing database structures."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name)
VALUES
    (1, 'Ravi');

UPDATE employees
SET employee_name = 'Ravi Kumar'
WHERE employee_id = 1;

DELETE FROM employees
WHERE employee_id = 1;`
      },

      bullets: [
        "INSERT adds rows.",
        "UPDATE changes existing rows.",
        "DELETE removes selected rows when a matching condition is supplied."
      ]
    },

    {
      id: "dml-insert",
      title: "8. INSERT Command",

      paragraphs: [
        "INSERT adds new rows to an existing table.",
        "The column list identifies which columns receive the supplied values."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, department)
VALUES
    (101, 'Ravi', 'IT');`
      },

      output: `One new employee row is inserted.`
    },

    {
      id: "dml-update",
      title: "9. UPDATE Command",

      paragraphs: [
        "UPDATE changes values in existing rows.",
        "The WHERE clause determines which rows are affected."
      ],

      code: {
        language: "sql",
        code: `UPDATE employees
SET department = 'Engineering'
WHERE employee_id = 101;`
      },

      bullets: [
        "SET specifies new values.",
        "WHERE identifies rows to update.",
        "Without an appropriate WHERE clause, multiple or all rows may be updated."
      ]
    },

    {
      id: "dml-delete",
      title: "10. DELETE Command",

      paragraphs: [
        "DELETE removes rows from a table.",
        "A WHERE clause can restrict the operation to specific records."
      ],

      code: {
        language: "sql",
        code: `DELETE FROM employees
WHERE employee_id = 101;`
      },

      bullets: [
        "DELETE operates on rows.",
        "WHERE determines which rows are removed.",
        "Without WHERE, all rows may be deleted."
      ]
    },

    {
      id: "dql",
      title: "11. DQL — Data Query Language",

      paragraphs: [
        "DQL is a common educational classification for queries that retrieve data. SELECT is its central command.",
        "Some SQL classifications treat SELECT as part of DML instead. The classification is less important than understanding what SELECT actually does."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
WHERE employee_id = 1;`
      },

      bullets: [
        "SELECT retrieves data.",
        "FROM identifies the source table or tables.",
        "WHERE can filter rows.",
        "ORDER BY can sort results.",
        "GROUP BY can group results."
      ]
    },

    {
      id: "dql-select",
      title: "12. SELECT Command",

      paragraphs: [
        "SELECT retrieves data from one or more tables.",
        "It can return specific columns or calculated values."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       department
FROM employees;`
      }
    },

    {
      id: "dql-filter",
      title: "13. SELECT with WHERE",

      paragraphs: [
        "SELECT is commonly combined with WHERE to retrieve only rows matching a condition."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name
FROM employees
WHERE department = 'IT';`
      }
    },

    {
      id: "dql-order",
      title: "14. SELECT with ORDER BY",

      paragraphs: [
        "ORDER BY sorts the result returned by a query."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       salary
FROM employees
ORDER BY salary DESC;`
      },

      bullets: [
        "ASC sorts ascending.",
        "DESC sorts descending.",
        "Sorting can be performed using one or more expressions."
      ]
    },

    {
      id: "dql-group",
      title: "15. SELECT with GROUP BY",

      paragraphs: [
        "GROUP BY groups rows that have the same values for selected expressions.",
        "It is commonly used with aggregate functions such as COUNT, SUM, AVG, MIN, and MAX."
      ],

      code: {
        language: "sql",
        code: `SELECT department,
       COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      }
    },

    {
      id: "dcl",
      title: "16. DCL — Data Control Language",

      paragraphs: [
        "DCL refers to privilege-management commands.",
        "DCL commands control which users or roles can perform certain operations on database objects.",
        "Exact syntax and supported permission models depend on the database product."
      ],

      code: {
        language: "sql",
        code: `GRANT SELECT
ON employees
TO reporting_user;

REVOKE SELECT
ON employees
FROM reporting_user;`
      },

      bullets: [
        "GRANT provides privileges.",
        "REVOKE removes privileges.",
        "Permissions should follow the principle of least privilege."
      ]
    },

    {
      id: "grant",
      title: "17. GRANT Command",

      paragraphs: [
        "GRANT gives a user or role specific privileges on a database object."
      ],

      code: {
        language: "sql",
        code: `GRANT SELECT
ON employees
TO reporting_user;`
      },

      paragraphs: [
        "This example gives the reporting_user permission to perform SELECT operations on the employees object, subject to the database system's privilege model."
      ]
    },

    {
      id: "revoke",
      title: "18. REVOKE Command",

      paragraphs: [
        "REVOKE removes previously granted privileges."
      ],

      code: {
        language: "sql",
        code: `REVOKE SELECT
ON employees
FROM reporting_user;`
      }
    },

    {
      id: "tcl",
      title: "19. TCL — Transaction Control Language",

      paragraphs: [
        "TCL refers to transaction-control commands.",
        "Transaction control is used to manage groups of database operations as a transaction.",
        "A transaction groups operations so they can be committed or rolled back according to the database's transaction rules."
      ],

      code: {
        language: "sql",
        code: `START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE account_id = 2;

COMMIT;`
      },

      bullets: [
        "COMMIT confirms the transaction's changes.",
        "ROLLBACK cancels uncommitted changes when rollback is available.",
        "SAVEPOINT can create a point within a transaction to which the transaction can potentially roll back.",
        "Transaction behavior for particular DDL commands varies by database."
      ]
    },

    {
      id: "commit",
      title: "20. COMMIT",

      paragraphs: [
        "COMMIT completes a transaction and makes its changes permanent according to the database transaction semantics."
      ],

      code: {
        language: "sql",
        code: `START TRANSACTION;

UPDATE employees
SET department = 'IT'
WHERE employee_id = 101;

COMMIT;`
      }
    },

    {
      id: "rollback",
      title: "21. ROLLBACK",

      paragraphs: [
        "ROLLBACK reverses uncommitted changes within the current transaction when the database and transaction state allow the rollback."
      ],

      code: {
        language: "sql",
        code: `START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

ROLLBACK;`
      },

      paragraphs: [
        "After the rollback, the uncommitted update is discarded according to the database transaction semantics."
      ]
    },

    {
      id: "savepoint",
      title: "22. SAVEPOINT",

      paragraphs: [
        "A SAVEPOINT creates a point inside a transaction to which the transaction can potentially roll back without necessarily abandoning the entire transaction."
      ],

      code: {
        language: "sql",
        code: `START TRANSACTION;

UPDATE employees
SET department = 'IT'
WHERE employee_id = 101;

SAVEPOINT employee_update;

UPDATE employees
SET department = 'HR'
WHERE employee_id = 102;

ROLLBACK TO SAVEPOINT employee_update;

COMMIT;`
      },

      bullets: [
        "SAVEPOINT creates a rollback point.",
        "ROLLBACK TO SAVEPOINT moves the transaction back to that point when supported.",
        "The exact syntax and behavior depend on the database system."
      ]
    },

    {
      id: "ddl-vs-dml",
      title: "23. DDL vs DML",

      code: {
        language: "text",
        code: `DDL
→ Changes database structure

Examples:
CREATE
ALTER
DROP
TRUNCATE


DML
→ Changes table data

Examples:
INSERT
UPDATE
DELETE`
      },

      paragraphs: [
        "The easiest way to remember the difference is that DDL primarily changes the definition of database objects, while DML manipulates the data stored in those objects."
      ]
    },

    {
      id: "dql-vs-dml",
      title: "24. DQL vs DML",

      paragraphs: [
        "DQL is commonly taught as the category containing SELECT because SELECT retrieves data.",
        "DML modifies data using commands such as INSERT, UPDATE, and DELETE.",
        "However, SQL command classifications vary between educational resources and database documentation."
      ],

      code: {
        language: "text",
        code: `DQL
→ Retrieve data
→ SELECT

DML
→ Manipulate data
→ INSERT
→ UPDATE
→ DELETE`
      }
    },

    {
      id: "dcl-vs-tcl",
      title: "25. DCL vs TCL",

      code: {
        language: "text",
        code: `DCL
→ Controls privileges

GRANT
REVOKE


TCL
→ Controls transactions

COMMIT
ROLLBACK
SAVEPOINT`
      },

      paragraphs: [
        "DCL is concerned with database access permissions.",
        "TCL is concerned with transaction state and transaction control."
      ]
    },

    {
      id: "complete-categories",
      title: "26. Complete SQL Command Categories",

      code: {
        language: "text",
        code: `DDL
Data Definition Language
│
├── CREATE
├── ALTER
├── DROP
└── TRUNCATE

DML
Data Manipulation Language
│
├── INSERT
├── UPDATE
└── DELETE

DQL
Data Query Language
│
└── SELECT

DCL
Data Control Language
│
├── GRANT
└── REVOKE

TCL
Transaction Control Language
│
├── COMMIT
├── ROLLBACK
└── SAVEPOINT`
      }
    },

    {
      id: "spring-boot-relevance",
      title: "27. SQL Categories in Spring Boot",

      paragraphs: [
        "In a Spring Boot application, developers may not write every SQL statement manually because Spring Data JPA and Hibernate can generate SQL.",
        "However, understanding SQL command categories helps developers understand what the persistence layer is ultimately doing.",
        "For example, saving a new entity can result in an INSERT, changing a managed entity can result in an UPDATE, and retrieving records can result in a SELECT."
      ],

      code: {
        language: "text",
        code: `Spring Boot Service
        ↓
Repository
        ↓
JPA / Hibernate
        ↓
SQL
        ↓
Database

Create Entity
→ INSERT

Read Entity
→ SELECT

Modify Entity
→ UPDATE

Delete Entity
→ DELETE`
      }
    },

    {
      id: "transaction-spring",
      title: "28. Transactions in Spring Boot",

      paragraphs: [
        "In Spring Boot applications, transaction management is commonly handled through Spring's transaction abstraction and @Transactional.",
        "The application developer can define a business operation as a transactional unit without manually writing COMMIT and ROLLBACK statements for every operation."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transferMoney(
        Long sourceId,
        Long targetId,
        BigDecimal amount) {

    accountRepository.debit(
            sourceId,
            amount
    );

    accountRepository.credit(
            targetId,
            amount
    );
}`
      },

      bullets: [
        "Spring manages the transaction boundary.",
        "Repositories participate in the transaction.",
        "Successful completion allows the transaction to commit.",
        "An appropriate failure can cause rollback according to transaction configuration."
      ]
    },

    {
      id: "dangerous-commands",
      title: "29. Dangerous SQL Operations",

      paragraphs: [
        "Some SQL commands can cause significant data loss if executed incorrectly.",
        "Developers should carefully review destructive commands and use appropriate transaction, backup, migration, and deployment practices."
      ],

      code: {
        language: "sql",
        code: `-- Potentially dangerous

DELETE FROM employees;

TRUNCATE TABLE employees;

DROP TABLE employees;`
      },

      bullets: [
        "DELETE can remove rows.",
        "TRUNCATE can remove all rows.",
        "DROP can remove the table itself.",
        "Always understand the target environment before executing destructive operations."
      ]
    },

    {
      id: "migration-tools",
      title: "30. Schema Changes in Real Applications",

      paragraphs: [
        "Production applications commonly manage database structure changes through migration tools rather than manually executing arbitrary DDL statements.",
        "Migration systems allow database changes to be versioned and applied consistently across environments.",
        "Examples include Flyway and Liquibase."
      ],

      code: {
        language: "text",
        code: `Application Version 1
        ↓
Migration V1
        ↓
Database

Application Version 2
        ↓
Migration V2
        ↓
Database

Application Version 3
        ↓
Migration V3
        ↓
Database`
      }
    },

    {
      id: "common-mistakes",
      title: "31. Common SQL Command Mistakes",

      bullets: [
        "Forgetting WHERE in UPDATE statements.",
        "Forgetting WHERE in DELETE statements.",
        "Confusing DROP with DELETE.",
        "Confusing TRUNCATE with DROP.",
        "Assuming TRUNCATE behaves identically across databases.",
        "Assuming DQL/DML classifications are universally standardized.",
        "Running destructive DDL directly in production without proper migration practices.",
        "Using excessive database privileges for application users.",
        "Assuming COMMIT and ROLLBACK behave identically for every DDL statement across databases.",
        "Ignoring transaction boundaries in multi-step application operations.",
        "Writing SQL without parameter binding for untrusted input."
      ]
    },

    {
      id: "best-practices",
      title: "32. SQL Command Best Practices",

      bullets: [
        "Understand the command before executing it.",
        "Always review UPDATE and DELETE conditions.",
        "Use transactions for related multi-step changes.",
        "Use parameterized queries.",
        "Use least-privilege database permissions.",
        "Use migration tools for controlled schema changes.",
        "Test destructive operations in non-production environments first.",
        "Maintain reliable database backups.",
        "Understand database-specific behavior for DDL and transaction commands.",
        "Use SELECT queries to verify affected data where appropriate.",
        "Avoid running destructive commands directly against production without an approved process."
      ]
    },

    {
      id: "interview-scenarios",
      title: "33. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You need to create a new employees table. Which SQL category and commands would you use?",
          answer:
            "I would use DDL, specifically CREATE TABLE, because I am defining a new database structure."
        },
        {
          question:
            "You need to add a new column to an existing employees table. Which command would you use?",
          answer:
            "I would use ALTER TABLE because the existing table structure needs to be changed."
        },
        {
          question:
            "You need to add a new employee record. Which category is used?",
          answer:
            "DML, using INSERT."
        },
        {
          question:
            "You need to retrieve all employees from IT. Which category is commonly used?",
          answer:
            "DQL, using SELECT with a WHERE condition. Some classifications include SELECT within DML, but SELECT is commonly taught as DQL."
        },
        {
          question:
            "You need to give a reporting user permission to read employee data. What do you use?",
          answer:
            "DCL, using GRANT with the appropriate SELECT privilege."
        },
        {
          question:
            "You need to remove the permission later. What do you use?",
          answer:
            "DCL, using REVOKE."
        },
        {
          question:
            "Two account updates must succeed or fail together. What should you use?",
          answer:
            "A transaction. The changes should be performed within one transaction and committed only when the complete operation succeeds."
        },
        {
          question:
            "What is the difference between DELETE and TRUNCATE?",
          answer:
            "DELETE removes rows and can use a WHERE condition. TRUNCATE removes all rows while retaining the table structure, with transaction, logging, identity, and locking behavior depending on the database system."
        },
        {
          question:
            "What is the difference between DROP and TRUNCATE?",
          answer:
            "DROP removes the database object itself, while TRUNCATE removes the rows but retains the table structure."
        },
        {
          question:
            "What is the difference between DELETE and DROP?",
          answer:
            "DELETE removes rows from a table, while DROP removes the database object itself."
        },
        {
          question:
            "What is the purpose of ROLLBACK?",
          answer:
            "ROLLBACK discards uncommitted transaction changes when rollback is available for the current transaction state."
        },
        {
          question:
            "What is the purpose of SAVEPOINT?",
          answer:
            "SAVEPOINT creates a point within a transaction that can be used as a partial rollback target when supported."
        }
      ]
    },

    {
      id: "interview",
      title: "34. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is DDL?",
          answer:
            "DDL stands for Data Definition Language. It defines or changes database structures using commands such as CREATE, ALTER, and DROP."
        },
        {
          question: "What is DML?",
          answer:
            "DML stands for Data Manipulation Language. It is commonly used for commands such as INSERT, UPDATE, and DELETE that modify table data."
        },
        {
          question: "What is DQL?",
          answer:
            "DQL is a common educational classification for data-retrieval queries, with SELECT as its central command. Some classifications include SELECT within DML."
        },
        {
          question: "What is DCL?",
          answer:
            "DCL refers to privilege-management commands such as GRANT and REVOKE."
        },
        {
          question: "What is TCL?",
          answer:
            "TCL refers to transaction-control commands such as COMMIT, ROLLBACK, and SAVEPOINT."
        },
        {
          question: "What is the difference between DDL and DML?",
          answer:
            "DDL primarily defines or changes database structures, while DML manipulates the data stored in those structures."
        },
        {
          question: "What is the difference between DELETE and TRUNCATE?",
          answer:
            "DELETE removes rows and can use a WHERE condition. TRUNCATE removes all rows while retaining the table structure, with database-specific logging, identity, locking, and transaction behavior."
        },
        {
          question: "What is the difference between TRUNCATE and DROP?",
          answer:
            "TRUNCATE removes table rows while retaining the table structure. DROP removes the table object itself."
        },
        {
          question: "What is the difference between DELETE and DROP?",
          answer:
            "DELETE removes data rows, while DROP removes the database object itself."
        },
        {
          question: "What is the purpose of COMMIT?",
          answer:
            "COMMIT confirms a transaction's changes and completes the transaction according to the database's transaction semantics."
        },
        {
          question: "What is the purpose of ROLLBACK?",
          answer:
            "ROLLBACK discards uncommitted changes within the current transaction when rollback is available."
        },
        {
          question: "What is the purpose of SAVEPOINT?",
          answer:
            "SAVEPOINT creates a point inside a transaction to which the transaction can potentially roll back."
        },
        {
          question: "What is GRANT?",
          answer:
            "GRANT provides specified privileges to a user or role."
        },
        {
          question: "What is REVOKE?",
          answer:
            "REVOKE removes previously granted privileges from a user or role."
        },
        {
          question: "Is SQL command classification universal?",
          answer:
            "No. Categories such as DDL, DML, DQL, DCL, and TCL are widely used educational classifications, but exact classification and command behavior can vary between database systems and references."
        },
        {
          question: "How does SQL relate to Spring Data JPA?",
          answer:
            "Spring Data JPA and Hibernate can generate SQL for persistence operations, but developers should understand SQL to debug queries, reason about database behavior, and optimize persistence operations."
        },
        {
          question: "Why are migration tools used in production?",
          answer:
            "Migration tools allow database structure changes to be versioned, reviewed, applied consistently, and tracked across environments."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "35. Quick Revision",

      bullets: [
        "DDL → database structure.",
        "CREATE → create objects.",
        "ALTER → modify object structure.",
        "DROP → remove database objects.",
        "TRUNCATE → remove all rows while retaining table structure, subject to database behavior.",
        "DML → manipulate table data.",
        "INSERT → add rows.",
        "UPDATE → modify rows.",
        "DELETE → remove rows.",
        "DQL → commonly used for SELECT/retrieval.",
        "DCL → manage privileges.",
        "GRANT → provide privileges.",
        "REVOKE → remove privileges.",
        "TCL → manage transactions.",
        "COMMIT → complete transaction changes.",
        "ROLLBACK → discard uncommitted changes when available.",
        "SAVEPOINT → create a transaction rollback point.",
        "Spring @Transactional → common application-level transaction boundary.",
        "Migration tools → manage controlled database structure changes."
      ]
    },

    {
      id: "one-minute-answer",
      title: "36. One-Minute Interview Answer",

      paragraphs: [
        "SQL commands are commonly grouped into categories based on their purpose. DDL, or Data Definition Language, defines and changes database structures using commands such as CREATE, ALTER, DROP, and TRUNCATE. DML, or Data Manipulation Language, changes table data using INSERT, UPDATE, and DELETE. DQL is a common educational classification for data retrieval using SELECT. DCL manages database privileges using GRANT and REVOKE. TCL manages transactions using commands such as COMMIT, ROLLBACK, and SAVEPOINT. The exact classification and behavior of some commands can vary between database products."
      ]
    },

    {
      id: "revision-notes",
      title: "37. Important Revision Notes",

      paragraphs: [
        "Remember the easiest classification: DDL = structure, DML = data changes, DQL = data retrieval, DCL = permissions, TCL = transactions.",
        "DDL examples: CREATE, ALTER, DROP, TRUNCATE.",
        "DML examples: INSERT, UPDATE, DELETE.",
        "DQL example: SELECT.",
        "DCL examples: GRANT, REVOKE.",
        "TCL examples: COMMIT, ROLLBACK, SAVEPOINT.",
        "For interviews, always explain DELETE vs TRUNCATE vs DROP carefully because their effects and transaction behavior are different.",
        "Also remember that SQL command classifications are not perfectly universal across all database products and educational resources."
      ]
    }
  ]
};
