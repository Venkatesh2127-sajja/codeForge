
export const sqlCommentsAndSyntax = {
  id: 2007,
  title: "SQL Syntax and Comments",
  slug: "sql-comments-and-syntax",
  topicTitle: "Introduction to SQL",
  description:
    "Learn SQL statement structure, keywords, identifiers, literals, operators, aliases, semicolons, comments, formatting, quoting rules, and safe parameterized SQL.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "statement-structure",
      title: "1. Basic SQL Statement Structure",

      paragraphs: [
        "A SQL statement contains keywords, identifiers, operators, literals, and expressions. The exact grammar depends on the statement being used.",
        "SQL keywords such as SELECT, FROM, WHERE, and ORDER BY describe operations. Identifiers name database objects such as tables and columns.",
        "A SQL statement is interpreted by the database engine according to the SQL dialect supported by that database."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },

      bullets: [
        "SELECT specifies output columns or expressions.",
        "FROM identifies the data source.",
        "WHERE filters rows.",
        "ORDER BY controls the output order.",
        "DESC sorts in descending order.",
        "The semicolon terminates the statement in clients that use statement terminators."
      ]
    },

    {
      id: "sql-statement-anatomy",
      title: "2. Anatomy of a SQL Statement",

      paragraphs: [
        "The following query can be understood by breaking it into individual parts."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },

      bullets: [
        "SELECT → SQL keyword.",
        "employee_name, salary → column identifiers.",
        "FROM → SQL keyword.",
        "employees → table identifier.",
        "WHERE → filtering clause.",
        "salary >= 50000 → condition.",
        "ORDER BY → sorting clause.",
        "DESC → descending sort keyword.",
        "50000 → numeric literal."
      ]
    },

    {
      id: "keywords",
      title: "3. SQL Keywords",

      paragraphs: [
        "Keywords are reserved or specially recognized words that have meaning in SQL syntax.",
        "Common keywords include SELECT, FROM, WHERE, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, JOIN, GROUP BY, HAVING, ORDER BY, and LIMIT."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'Engineering';`
      },

      bullets: [
        "SELECT tells the database to retrieve data.",
        "FROM identifies the source.",
        "WHERE applies a filter.",
        "Keywords form the structure of a SQL statement.",
        "Some words can have different status depending on the database product and SQL version."
      ]
    },

    {
      id: "identifiers",
      title: "4. SQL Identifiers",

      paragraphs: [
        "Identifiers are names given to database objects such as databases, schemas, tables, columns, indexes, views, and constraints.",
        "For example, employees is a table identifier and employee_name is a column identifier."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees;`
      },

      bullets: [
        "employees → table identifier.",
        "employee_name → column identifier.",
        "Use meaningful names.",
        "Avoid unnecessary reserved words as identifiers.",
        "Identifier case and quoting behavior can vary between database systems."
      ]
    },

    {
      id: "literals",
      title: "5. SQL Literals",

      paragraphs: [
        "A literal is a value written directly in a SQL statement.",
        "Common literal types include string literals, numeric literals, date literals, and boolean values depending on the database."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE salary >= 50000
  AND department = 'Engineering';`
      },

      bullets: [
        "50000 → numeric literal.",
        "'Engineering' → string literal.",
        "Literal syntax can vary for some data types between database products.",
        "User-provided values should normally be passed as parameters rather than concatenated into SQL."
      ]
    },

    {
      id: "strings-and-identifiers",
      title: "6. Strings and Identifiers",

      paragraphs: [
        "String literals are commonly enclosed in single quotes.",
        "Double quotes are commonly used for delimited identifiers in PostgreSQL and standard SQL, while MySQL identifier quoting commonly uses backticks.",
        "Identifier case sensitivity and quoting rules differ between database systems. Prefer simple, descriptive identifiers and avoid unnecessary quoting."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'Engineering';`
      },

      bullets: [
        "Use single quotes for ordinary text values.",
        "Use consistent naming conventions for tables and columns.",
        "Do not confuse a string literal with a column identifier.",
        "Use parameterized queries in applications rather than concatenating user input into SQL."
      ]
    },

    {
      id: "single-quotes",
      title: "7. String Literals and Single Quotes",

      paragraphs: [
        "SQL string values are commonly written using single quotes.",
        "If a string contains an apostrophe, the exact escaping syntax depends on the SQL dialect, but standard SQL commonly represents a single quote inside a string by doubling it."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE employee_name = 'Ravi';

SELECT *
FROM employees
WHERE employee_name = 'O''Brien';`
      },

      bullets: [
        "'Ravi' is a string literal.",
        "'O''Brien' demonstrates the common SQL escaping form for an apostrophe.",
        "In application code, parameterized queries are preferred instead of manually escaping user input."
      ]
    },

    {
      id: "operators",
      title: "8. SQL Operators",

      paragraphs: [
        "Operators are symbols or keywords used to compare, calculate, combine, or test values."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
  AND department = 'Engineering';`
      },

      bullets: [
        "= → equal to.",
        "<> or != → not equal, depending on database support.",
        "> → greater than.",
        "< → less than.",
        ">= → greater than or equal to.",
        "<= → less than or equal to.",
        "AND → both conditions must be true.",
        "OR → at least one condition can be true.",
        "NOT → negates a condition."
      ]
    },

    {
      id: "aliases",
      title: "9. SQL Aliases",

      paragraphs: [
        "Aliases provide temporary names for columns or tables within a query.",
        "They can make query output easier to understand and can simplify references to tables."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    salary AS monthly_salary
FROM employees;`
      },

      bullets: [
        "AS gives an expression or column an alias.",
        "Aliases do not normally rename the actual database column.",
        "Table aliases are especially useful in joins."
      ]
    },

    {
      id: "table-alias",
      title: "10. Table Aliases",

      paragraphs: [
        "A table alias provides a shorter name for a table within a query."
      ],

      code: {
        language: "sql",
        code: `SELECT e.employee_id,
       e.employee_name
FROM employees AS e
WHERE e.salary >= 50000;`
      },

      bullets: [
        "employees is the actual table.",
        "e is the alias.",
        "e.employee_name references the employee_name column through the alias.",
        "Aliases are especially useful when multiple tables have similar column names."
      ]
    },

    {
      id: "semicolon",
      title: "11. Semicolon in SQL",

      paragraphs: [
        "A semicolon is commonly used as a statement terminator.",
        "Many SQL clients and tools use it to determine where one statement ends and another begins.",
        "Whether a semicolon is required depends on the client, API, script format, and database environment."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees;

SELECT *
FROM departments;`
      },

      bullets: [
        "The first semicolon terminates the first statement.",
        "The second semicolon terminates the second statement.",
        "Using semicolons consistently is good practice in SQL scripts."
      ]
    },

    {
      id: "whitespace",
      title: "12. Whitespace and Formatting",

      paragraphs: [
        "SQL generally allows flexible whitespace between tokens.",
        "Good formatting makes SQL easier to read, debug, review, and maintain."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       salary
FROM employees
WHERE salary >= 50000
  AND department = 'Engineering'
ORDER BY salary DESC;`
      },

      bullets: [
        "Put major clauses on separate lines.",
        "Indent conditions consistently.",
        "Put long column lists on separate lines.",
        "Use consistent formatting across the project.",
        "Readable SQL is easier to review than compressed SQL."
      ]
    },

    {
      id: "case",
      title: "13. SQL Keyword Case",

      paragraphs: [
        "SQL keywords are generally written in uppercase in many codebases for readability, although common SQL implementations generally treat keywords case-insensitively.",
        "Identifiers are different: their case sensitivity and normalization rules depend on the database product and how identifiers are quoted."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE salary > 50000;`
      },

      output: `The same SQL keywords are commonly written as:

select employee_name
from employees
where salary > 50000;

Uppercase formatting is mainly a readability convention.`
    },

    {
      id: "comments",
      title: "14. Adding SQL Comments",

      paragraphs: [
        "Comments explain why a query exists or document non-obvious business rules.",
        "Comments are ignored as executable SQL syntax."
      ],

      code: {
        language: "sql",
        code: `-- Retrieve employees from Engineering.
SELECT employee_id, employee_name
FROM employees
WHERE department = 'Engineering';

/*
  This query returns employees
  with salaries above the threshold.
*/
SELECT employee_name, salary
FROM employees
WHERE salary > 60000;`
      },

      bullets: [
        "-- begins a single-line comment in MySQL and PostgreSQL.",
        "/* ... */ marks a block comment in both systems.",
        "Comment syntax has product-specific details, so verify it when using another SQL dialect."
      ]
    },

    {
      id: "single-line-comments",
      title: "15. Single-Line Comments",

      paragraphs: [
        "A single-line comment documents one line or the remainder of a line."
      ],

      code: {
        language: "sql",
        code: `-- Find high-salary employees
SELECT employee_name
FROM employees
WHERE salary > 60000;`
      },

      bullets: [
        "Useful for short explanations.",
        "Useful for documenting filters or business rules.",
        "Do not use comments as a substitute for clear SQL naming."
      ]
    },

    {
      id: "block-comments",
      title: "16. Block Comments",

      paragraphs: [
        "Block comments can span multiple lines."
      ],

      code: {
        language: "sql",
        code: `/*
  Retrieve employees who:
  1. Work in Engineering
  2. Earn at least 50,000
*/
SELECT employee_name
FROM employees
WHERE department = 'Engineering'
  AND salary >= 50000;`
      },

      bullets: [
        "Useful for longer explanations.",
        "Useful for documenting complex SQL.",
        "Avoid leaving outdated comments that contradict the query."
      ]
    },

    {
      id: "commented-query",
      title: "17. Commenting During Development",

      paragraphs: [
        "Comments can temporarily disable a query condition during debugging, but this should be used carefully because removing a filter can change the result significantly."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id,
       employee_name,
       salary
FROM employees
-- WHERE department = 'Engineering'
ORDER BY salary DESC;`
      },

      bullets: [
        "Useful for temporary debugging.",
        "Review commented code before committing it.",
        "Avoid leaving confusing dead SQL in production scripts."
      ]
    },

    {
      id: "safe-syntax",
      title: "18. Writing Safer SQL",

      paragraphs: [
        "SQL formatting makes complex statements easier to read and review.",
        "In application code, values from users must be passed using prepared statements or other parameterized-query mechanisms."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
WHERE email = ?;`
      },

      bullets: [
        "The question-mark placeholder is common in JDBC prepared statements.",
        "Placeholder syntax depends on the database client or query API.",
        "Parameterization helps prevent SQL injection for values.",
        "Identifiers such as table names generally cannot be supplied as ordinary value parameters."
      ]
    },

    {
      id: "jdbc-example",
      title: "19. Parameterized SQL with JDBC",

      paragraphs: [
        "In Java applications, JDBC PreparedStatement allows values to be supplied separately from the SQL statement."
      ],

      code: {
        language: "java",
        code: `String sql = """
    SELECT employee_id, employee_name
    FROM employees
    WHERE email = ?
    """;

PreparedStatement statement =
        connection.prepareStatement(sql);

statement.setString(1, email);

ResultSet resultSet =
        statement.executeQuery();`
      },

      bullets: [
        "The SQL structure is defined separately from the input value.",
        "setString supplies the value for the placeholder.",
        "Prepared statements are preferred over string concatenation for user-provided values."
      ]
    },

    {
      id: "unsafe-sql",
      title: "20. Unsafe SQL String Concatenation",

      paragraphs: [
        "Building SQL by directly concatenating untrusted input can create SQL injection vulnerabilities."
      ],

      code: {
        language: "java",
        code: `// Unsafe pattern
String sql =
    "SELECT * FROM employees WHERE email = '"
    + email
    + "'";`
      },

      bullets: [
        "Do not concatenate untrusted values directly into SQL.",
        "Use PreparedStatement or an appropriate framework abstraction.",
        "Parameterization protects values, not arbitrary SQL identifiers or SQL syntax."
      ]
    },

    {
      id: "sql-injection",
      title: "21. SQL Injection",

      paragraphs: [
        "SQL injection occurs when untrusted input is incorporated into SQL syntax instead of being treated strictly as data.",
        "Parameterized queries are one of the primary defenses against SQL injection for values."
      ],

      code: {
        language: "text",
        code: `Unsafe:
User Input
   ↓
String Concatenation
   ↓
SQL Syntax
   ↓
Database

Safer:
User Input
   ↓
Parameter
   ↓
Prepared Statement
   ↓
Database`
      },

      bullets: [
        "Validate input according to business requirements.",
        "Use parameterized queries.",
        "Avoid constructing SQL through string concatenation.",
        "Use least-privilege database accounts."
      ]
    },

    {
      id: "syntax-errors",
      title: "22. Common SQL Syntax Errors",

      paragraphs: [
        "SQL syntax errors happen when the statement does not follow the grammar expected by the database."
      ],

      code: {
        language: "sql",
        code: `-- Incorrect
SELECT employee_name
employees;

-- Correct
SELECT employee_name
FROM employees;`
      },

      bullets: [
        "Missing FROM.",
        "Misspelled keywords.",
        "Missing commas.",
        "Incorrect quotation marks.",
        "Unbalanced parentheses.",
        "Using a column or table name incorrectly.",
        "Using syntax from another database dialect.",
        "Forgetting required clauses in a particular statement."
      ]
    },

    {
      id: "comma-errors",
      title: "23. Comma and Parenthesis Errors",

      paragraphs: [
        "Commas separate columns or expressions in many SQL statements, while parentheses group expressions or define lists."
      ],

      code: {
        language: "sql",
        code: `-- Correct
SELECT employee_id,
       employee_name,
       salary
FROM employees;

-- Incorrect
SELECT employee_id,
       employee_name,
       salary,
FROM employees;`
      },

      bullets: [
        "Avoid trailing commas where the database syntax does not allow them.",
        "Check opening and closing parentheses.",
        "Format long statements so missing commas are easier to spot."
      ]
    },

    {
      id: "reserved-words",
      title: "24. Reserved Words as Identifiers",

      paragraphs: [
        "Some words have special meaning in SQL and may be reserved by a database.",
        "Using reserved words as table or column names can make queries harder to write and less portable."
      ],

      code: {
        language: "sql",
        code: `-- Better naming
CREATE TABLE employees (
    employee_id INT,
    employee_name VARCHAR(100)
);`
      },

      bullets: [
        "Prefer descriptive names that are unlikely to conflict with SQL keywords.",
        "Avoid unnecessary identifier quoting.",
        "If quoting is required, use the syntax appropriate to the database product."
      ]
    },

    {
      id: "dialect-differences",
      title: "25. SQL Dialects",

      paragraphs: [
        "SQL is standardized, but database products implement SQL with their own extensions and differences.",
        "MySQL, PostgreSQL, SQL Server, Oracle, and other systems can differ in data types, functions, identifier quoting, pagination syntax, auto-generated keys, and other features."
      ],

      code: {
        language: "text",
        code: `SQL
 │
 ├── MySQL
 ├── PostgreSQL
 ├── SQL Server
 ├── Oracle
 └── Other database systems

Common SQL concepts
        +
Database-specific syntax/features`
      },

      bullets: [
        "Learn standard SQL concepts first.",
        "Then learn the dialect used by your application.",
        "Do not assume a query written for one database will work unchanged on another."
      ]
    },

    {
      id: "spring-boot-relevance",
      title: "26. SQL Syntax in Spring Boot",

      paragraphs: [
        "Spring Boot applications may execute SQL directly through JDBC or indirectly through JPA and Hibernate.",
        "Even when developers use Spring Data JPA repositories, understanding SQL syntax helps with debugging generated SQL, writing native queries, optimizing database access, and understanding application behavior."
      ],

      code: {
        language: "text",
        code: `React / Client
      ↓
Spring Boot Controller
      ↓
Service
      ↓
Repository / JDBC
      ↓
SQL
      ↓
Database`
      },

      bullets: [
        "JDBC allows direct SQL execution.",
        "Spring Data JPA can generate SQL from repository operations.",
        "JPQL operates on JPA entities rather than directly on database tables.",
        "Native queries use database SQL syntax."
      ]
    },

    {
      id: "formatting-best-practices",
      title: "27. SQL Formatting Best Practices",

      bullets: [
        "Use uppercase for SQL keywords if that convention improves readability.",
        "Put major clauses on separate lines.",
        "Indent complex conditions.",
        "Use meaningful aliases.",
        "Use explicit column lists where practical.",
        "Keep comments short and useful.",
        "Remove outdated comments.",
        "Use parameterized queries for application values.",
        "Avoid unnecessary identifier quoting.",
        "Keep SQL formatting consistent across the project."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common SQL Syntax Mistakes",

      bullets: [
        "Using double quotes for a string value when the database expects single quotes.",
        "Forgetting FROM in a SELECT statement.",
        "Forgetting commas between selected columns.",
        "Adding an invalid trailing comma.",
        "Forgetting a closing parenthesis.",
        "Using a reserved word as an identifier.",
        "Using syntax from MySQL in PostgreSQL or vice versa.",
        "Concatenating user input directly into SQL.",
        "Using SELECT * when only a few columns are required.",
        "Writing very long SQL statements without formatting.",
        "Leaving misleading comments in production SQL."
      ]
    },

    {
      id: "interview-scenarios",
      title: "29. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You need to retrieve employees with salary above 50,000 and sort them from highest to lowest. How would you write it?",
          answer:
            "I would use SELECT with a WHERE condition and ORDER BY salary DESC."
        },
        {
          question:
            "A developer wrote WHERE email = NULL. What is wrong?",
          answer:
            "NULL should not be compared using the equality operator. The correct form is WHERE email IS NULL."
        },
        {
          question:
            "Why is SELECT * not always recommended in production?",
          answer:
            "It can retrieve unnecessary columns, increase data transfer, make the query more coupled to schema changes, and make the required output less explicit."
        },
        {
          question:
            "A user enters an email address into a Spring Boot API. Should the email be concatenated into SQL?",
          answer:
            "No. It should be passed as a parameter using PreparedStatement or an appropriate framework abstraction."
        },
        {
          question:
            "Can you use a parameter placeholder for a table name?",
          answer:
            "Ordinary prepared-statement parameters are designed for values, not arbitrary SQL identifiers such as table names. Dynamic identifiers require a carefully controlled approach."
        },
        {
          question:
            "Why can the same SQL-looking query behave differently on MySQL and PostgreSQL?",
          answer:
            "Database products implement SQL dialects with differences in syntax, data types, functions, identifier quoting, and other behavior."
        }
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "Are SQL keywords case-sensitive?",
          answer:
            "SQL keywords are generally case-insensitive in common usage, but identifier case and quoting rules can vary between database systems."
        },
        {
          question: "How do you write a SQL comment?",
          answer:
            "Use -- for a single-line comment and /* ... */ for a block comment in MySQL and PostgreSQL."
        },
        {
          question: "Why use prepared statements?",
          answer:
            "Prepared statements separate SQL structure from input values and help prevent SQL injection when parameters are used correctly."
        },
        {
          question: "Why is SQL formatting important?",
          answer:
            "Consistent formatting improves readability, makes query errors easier to identify, and helps developers review and maintain complex statements."
        },
        {
          question: "What is an SQL keyword?",
          answer:
            "A keyword is a word recognized by the SQL parser as part of the SQL language, such as SELECT, FROM, WHERE, INSERT, or UPDATE."
        },
        {
          question: "What is an SQL identifier?",
          answer:
            "An identifier is a name for a database object such as a table, column, schema, view, or index."
        },
        {
          question: "What is a literal?",
          answer:
            "A literal is a value written directly in a SQL statement, such as a number or a quoted string."
        },
        {
          question: "Why are single quotes used in SQL?",
          answer:
            "Single quotes are commonly used to delimit string literals."
        },
        {
          question: "What is the purpose of a semicolon?",
          answer:
            "A semicolon commonly terminates a SQL statement in SQL clients and scripts, although whether it is required depends on the execution environment."
        },
        {
          question: "What is a SQL alias?",
          answer:
            "An alias gives a temporary name to a column, expression, or table within a query."
        },
        {
          question: "What is SQL injection?",
          answer:
            "SQL injection is a vulnerability where untrusted input becomes part of SQL syntax. Parameterized queries are a primary defense for user-supplied values."
        },
        {
          question: "Can SQL identifiers be passed as normal parameters?",
          answer:
            "Normally no. Prepared-statement parameters are intended for values, not arbitrary identifiers such as table or column names."
        },
        {
          question: "What is the difference between a string literal and an identifier?",
          answer:
            "A string literal represents a value, such as 'Engineering'. An identifier names a database object, such as the employees table or employee_name column."
        },
        {
          question: "Why can SQL syntax differ between databases?",
          answer:
            "SQL database products implement their own dialects and extensions, so data types, functions, quoting rules, and some statement syntax can differ."
        },
        {
          question: "How does PreparedStatement improve application security?",
          answer:
            "It keeps SQL structure separate from parameter values, reducing the risk that user input will be interpreted as SQL syntax."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "31. Quick Revision",

      bullets: [
        "Keyword → part of SQL language syntax.",
        "Identifier → name of a database object.",
        "Literal → value written directly in SQL.",
        "SELECT → retrieves data.",
        "FROM → identifies data source.",
        "WHERE → filters rows.",
        "ORDER BY → sorts results.",
        "ASC → ascending order.",
        "DESC → descending order.",
        "AS → defines an alias.",
        "Single quotes → commonly delimit string literals.",
        "-- → single-line comment.",
        "/* ... */ → block comment.",
        "Semicolon → commonly terminates SQL statements.",
        "NULL → use IS NULL or IS NOT NULL.",
        "PreparedStatement → parameterized SQL in JDBC.",
        "Parameterization → helps prevent SQL injection for values.",
        "SQL dialect → database-specific implementation differences."
      ]
    },

    {
      id: "one-minute-answer",
      title: "32. One-Minute Interview Answer",

      paragraphs: [
        "SQL syntax is the grammar used to communicate with a relational database. A SQL statement commonly contains keywords, identifiers, literals, operators, expressions, and clauses. For example, SELECT defines the requested output, FROM identifies the source, WHERE filters rows, and ORDER BY controls sorting. String values are commonly written using single quotes, while identifier quoting varies between database systems. SQL comments can be written using -- for single-line comments and /* ... */ for block comments in common systems such as MySQL and PostgreSQL. In applications, user input should be passed through parameterized queries such as JDBC PreparedStatement rather than string concatenation to reduce SQL injection risk."
      ]
    },

    {
      id: "revision-notes",
      title: "33. Important Revision Notes",

      paragraphs: [
        "Remember the basic SQL building blocks: keywords describe the operation, identifiers name database objects, literals represent values, operators compare or combine values, and clauses organize the statement.",
        "Use single quotes for ordinary SQL string literals.",
        "Use -- for single-line comments and /* ... */ for block comments in common SQL systems.",
        "Use semicolons consistently in SQL scripts.",
        "Format SQL clearly so it is easy to read and debug.",
        "Do not concatenate untrusted user input into SQL.",
        "Use parameterized queries for application values.",
        "Remember that SQL is not completely identical across database products; always consider the database dialect being used."
      ]
    }
  ]
};
