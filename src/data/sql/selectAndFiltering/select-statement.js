
export const selectStatement = {
  id: 2011,
  title: "SELECT Statement",
  slug: "select-statement",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn how the SELECT statement retrieves data from relational databases, filters rows, selects columns, sorts results, and performs basic calculations.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "introduction",
      title: "1. What Is SELECT?",
      paragraphs: [
        "SELECT is the primary SQL statement used to retrieve data from one or more tables, views, or other query sources.",
        "A SELECT query normally does not modify the stored data. Instead, it produces a result set containing rows and columns that match the query.",
        "The basic form of a SELECT query is SELECT followed by the columns or expressions you want and FROM followed by the query source."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees;`
      },
      output: `employee_name
-------------
Ravi
Priya
Kiran
Anu`
    },

    {
      id: "select-structure",
      title: "2. Basic SELECT Syntax",
      paragraphs: [
        "A SELECT statement can contain several clauses. The simplest query needs SELECT and FROM, while filtering, grouping, sorting, and limiting are added when required."
      ],
      code: {
        language: "sql",
        code: `SELECT column1, column2
FROM table_name
WHERE condition
GROUP BY column1, column2
HAVING group_condition
ORDER BY column1
LIMIT 10;`
      },
      bullets: [
        "SELECT → specifies columns or expressions to return.",
        "FROM → specifies the source of the data.",
        "WHERE → filters individual rows.",
        "GROUP BY → creates groups for aggregate calculations.",
        "HAVING → filters groups.",
        "ORDER BY → sorts the result.",
        "LIMIT → restricts the number of returned rows in databases that support it."
      ]
    },

    {
      id: "select-all",
      title: "3. Selecting All Columns",
      paragraphs: [
        "The asterisk (*) means all columns available from the query source."
      ],
      code: {
        language: "sql",
        code: `SELECT *
FROM employees;`
      },
      bullets: [
        "SELECT * requests all columns.",
        "FROM employees specifies the source table.",
        "All rows are returned because there is no WHERE condition.",
        "The database does not guarantee row order without ORDER BY."
      ]
    },

    {
      id: "select-columns",
      title: "4. Selecting Specific Columns",
      paragraphs: [
        "Instead of selecting every column, you can specify exactly which columns are required."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees;`
      },
      bullets: [
        "Only employee_id, employee_name, and salary are returned.",
        "The remaining columns are not included in the result.",
        "Explicit column selection makes application queries clearer.",
        "It can reduce unnecessary data transfer."
      ]
    },

    {
      id: "select-expression",
      title: "5. Selecting Expressions",
      paragraphs: [
        "SELECT can return expressions in addition to stored columns.",
        "The database evaluates the expression for each selected row."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees;`
      },
      output: `employee_name | salary  | annual_salary
--------------+---------+--------------
Ravi          | 60000   | 720000
Priya         | 45000   | 540000
Kiran         | 70000   | 840000
Anu           | 50000   | 600000`
    },

    {
      id: "query-flow",
      title: "6. Basic SELECT Query Flow",
      paragraphs: [
        "Conceptually, the database identifies the source specified by FROM, applies filtering if a WHERE clause exists, and produces the requested expressions as the result.",
        "The exact internal execution strategy is determined by the database optimizer."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;`
      },
      bullets: [
        "FROM identifies employees.",
        "WHERE removes rows that do not satisfy the condition.",
        "SELECT determines which values appear in the result."
      ]
    },

    {
      id: "where",
      title: "7. Filtering Rows with WHERE",
      paragraphs: [
        "WHERE is used to filter rows based on a condition.",
        "Only rows for which the condition is satisfied are included in the result."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;`
      },
      output: `employee_name | salary
--------------+--------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "comparison",
      title: "8. Comparison Operators",
      paragraphs: [
        "Comparison operators allow you to compare column values with other values or expressions."
      ],
      code: {
        language: "sql",
        code: `-- Equal
SELECT *
FROM employees
WHERE department = 'Engineering';

-- Greater than
SELECT *
FROM employees
WHERE salary > 50000;

-- Greater than or equal
SELECT *
FROM employees
WHERE salary >= 50000;

-- Less than
SELECT *
FROM employees
WHERE salary < 60000;

-- Not equal
SELECT *
FROM employees
WHERE department <> 'HR';`
      },
      bullets: [
        "= → equal to.",
        "<> → not equal to in standard SQL.",
        "> → greater than.",
        "< → less than.",
        ">= → greater than or equal to.",
        "<= → less than or equal to."
      ]
    },

    {
      id: "and-or-not",
      title: "9. AND, OR, and NOT",
      paragraphs: [
        "Logical operators allow you to combine conditions.",
        "AND requires all relevant conditions to be true, while OR allows at least one condition to be true.",
        "NOT reverses a condition."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';

SELECT employee_name, department
FROM employees
WHERE NOT department = 'HR';`
      }
    },

    {
      id: "between-in",
      title: "10. BETWEEN and IN",
      paragraphs: [
        "BETWEEN is useful for checking whether a value falls within an inclusive range.",
        "IN is useful when comparing a value against multiple possible values."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 70000;

SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'Finance');`
      },
      bullets: [
        "BETWEEN is commonly inclusive of its two boundary values.",
        "IN avoids repeatedly writing OR conditions for a list of values.",
        "Always verify the intended data type and boundary behavior."
      ]
    },

    {
      id: "like",
      title: "11. Searching Text with LIKE",
      paragraphs: [
        "LIKE is used for pattern matching on text values.",
        "The percent sign (%) represents a sequence of characters, while underscore (_) represents a single character in standard SQL pattern matching."
      ],
      code: {
        language: "sql",
        code: `-- Names beginning with R
SELECT employee_name
FROM employees
WHERE employee_name LIKE 'R%';

-- Names containing "an"
SELECT employee_name
FROM employees
WHERE employee_name LIKE '%an%';`
      }
    },

    {
      id: "null",
      title: "12. Handling NULL Values",
      paragraphs: [
        "NULL represents a missing or unknown value. It is not the same as zero and is not the same as an empty string.",
        "Use IS NULL or IS NOT NULL when testing for NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;

SELECT employee_name
FROM employees
WHERE department IS NOT NULL;`
      },
      bullets: [
        "Do not use department = NULL.",
        "Use department IS NULL.",
        "Use department IS NOT NULL to find non-NULL values.",
        "NULL participates in SQL's three-valued logic."
      ]
    },

    {
      id: "distinct",
      title: "13. SELECT DISTINCT",
      paragraphs: [
        "DISTINCT removes duplicate result rows for the selected expressions."
      ],
      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees;`
      },
      output: `department
-----------
Engineering
HR
Finance`
    },

    {
      id: "aliases",
      title: "14. Column Aliases",
      paragraphs: [
        "An alias gives a temporary name to a column or expression in the query result.",
        "Aliases are especially useful for calculated values and clearer API result names."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    salary AS monthly_salary,
    salary * 12 AS annual_salary
FROM employees;`
      }
    },

    {
      id: "table-alias",
      title: "15. Table Aliases",
      paragraphs: [
        "Table aliases provide shorter names for query sources.",
        "They become especially useful when joining multiple tables."
      ],
      code: {
        language: "sql",
        code: `SELECT e.employee_name, e.salary
FROM employees AS e
WHERE e.salary > 50000;`
      },
      bullets: [
        "e is an alias for employees.",
        "e.employee_name refers to employees.employee_name.",
        "Aliases improve readability in multi-table queries."
      ]
    },

    {
      id: "order-by",
      title: "16. Sorting SELECT Results with ORDER BY",
      paragraphs: [
        "ORDER BY controls the order of rows in the final result.",
        "ASC sorts in ascending order and DESC sorts in descending order."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;`
      },
      output: `employee_name | salary
--------------+---------
Kiran         | 70000
Ravi          | 60000
Anu           | 50000
Priya         | 45000`
    },

    {
      id: "order-multiple",
      title: "17. Sorting by Multiple Columns",
      paragraphs: [
        "You can specify multiple ORDER BY expressions.",
        "The database first sorts using the first expression and then uses later expressions to resolve ties."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      }
    },

    {
      id: "limit",
      title: "18. Limiting SELECT Results",
      paragraphs: [
        "LIMIT restricts the number of rows returned in database systems that support this syntax.",
        "MySQL and PostgreSQL support LIMIT, while other database systems may use different syntax."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 2;`
      },
      output: `employee_name | salary
--------------+--------
Kiran         | 70000
Ravi          | 60000`
    },

    {
      id: "offset",
      title: "19. LIMIT and OFFSET",
      paragraphs: [
        "OFFSET skips a specified number of rows before returning the remaining result rows in databases that support this syntax.",
        "LIMIT and OFFSET are commonly used for simple pagination."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY employee_id
LIMIT 2 OFFSET 2;`
      }
    },

    {
      id: "aggregate",
      title: "20. Aggregate Functions with SELECT",
      paragraphs: [
        "SELECT can calculate aggregate values across multiple rows.",
        "Common aggregate functions include COUNT, SUM, AVG, MIN, and MAX."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
      },
      bullets: [
        "COUNT → counts rows or values depending on the expression.",
        "SUM → calculates a numeric total.",
        "AVG → calculates an average.",
        "MIN → returns the minimum value.",
        "MAX → returns the maximum value."
      ]
    },

    {
      id: "group-by",
      title: "21. SELECT with GROUP BY",
      paragraphs: [
        "GROUP BY divides rows into groups based on one or more expressions.",
        "Aggregate functions can then calculate values for each group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department;`
      },
      output: `department  | employee_count | average_salary
------------+----------------+---------------
Engineering | 2              | 65000
HR          | 1              | 45000
Finance     | 1              | 50000`
    },

    {
      id: "having",
      title: "22. SELECT with HAVING",
      paragraphs: [
        "HAVING filters groups after GROUP BY has produced them.",
        "A useful distinction is that WHERE filters individual rows, while HAVING filters grouped results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2;`
      },
      output: `department  | employee_count
------------+---------------
Engineering | 2`
    },

    {
      id: "where-vs-having",
      title: "23. WHERE vs HAVING",
      paragraphs: [
        "WHERE filters rows before grouping.",
        "HAVING filters groups after grouping."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
HAVING AVG(salary) > 55000;`
      },
      bullets: [
        "WHERE salary >= 50000 filters individual employee rows.",
        "GROUP BY department creates department groups.",
        "HAVING AVG(salary) > 55000 filters the resulting groups."
      ]
    },

    {
      id: "select-join-preview",
      title: "24. SELECT from Multiple Tables",
      paragraphs: [
        "SELECT can retrieve data from multiple related tables using JOIN.",
        "JOIN is covered in detail later, but it is important to understand that SELECT is not limited to a single table."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name,
    d.department_name
FROM employees AS e
JOIN departments AS d
    ON e.department_id = d.department_id;`
      }
    },

    {
      id: "subquery-preview",
      title: "25. SELECT with a Subquery",
      paragraphs: [
        "A subquery is a query nested inside another SQL statement.",
        "Subqueries can be used when one query needs the result of another query.",
        "The inner query calculates the average salary, and the outer query returns employees whose salary is greater than that average."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`
      }
    },

    {
      id: "execution-order",
      title: "26. Logical Processing Order of SELECT",
      paragraphs: [
        "The SQL written order is not the same as the logical order used to reason about query processing.",
        "A simplified logical processing order is useful for understanding SQL behavior."
      ],
      code: {
        language: "text",
        code: `1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET`
      },
      bullets: [
        "FROM determines the source rows.",
        "WHERE filters rows.",
        "GROUP BY creates groups.",
        "HAVING filters groups.",
        "SELECT produces the requested expressions.",
        "DISTINCT removes duplicate result rows.",
        "ORDER BY sorts the result.",
        "LIMIT/OFFSET restricts the final result where supported."
      ]
    },

    {
      id: "best-practices",
      title: "27. SELECT Best Practices",
      paragraphs: [
        "SELECT * is useful while learning and exploring a table, but application queries should usually request only the columns they need.",
        "Selecting only required columns can reduce the amount of data transferred and make the query's intention clearer."
      ],
      code: {
        language: "sql",
        code: `-- Less specific
SELECT *
FROM employees;

-- More specific
SELECT employee_id, employee_name, salary
FROM employees;`
      },
      bullets: [
        "Select only required columns in application queries.",
        "Use meaningful aliases for calculated or unclear expressions.",
        "Use WHERE to reduce unnecessary rows.",
        "Use ORDER BY when result order matters.",
        "Use pagination for large result sets.",
        "Avoid unnecessary DISTINCT because it may require additional work.",
        "Use indexes that support important filtering and sorting patterns.",
        "Use EXPLAIN or the database's query-plan tools when investigating performance."
      ]
    },

    {
      id: "spring-boot",
      title: "28. SELECT in Spring Boot Applications",
      paragraphs: [
        "In Spring Boot applications, SELECT queries can be executed through JDBC, Spring Data JPA, Hibernate, or other data-access technologies.",
        "With Spring Data JPA, developers often write repository methods instead of manually writing simple SELECT statements."
      ],
      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(String department);

    List<Employee> findBySalaryGreaterThan(BigDecimal salary);
}`
      },
      bullets: [
        "findByDepartment can result in a SELECT query with a department condition.",
        "findBySalaryGreaterThan can result in a SELECT query using a salary comparison.",
        "The exact SQL depends on entity mappings, JPA provider, database, and query strategy.",
        "SQL knowledge remains important for debugging generated queries and optimizing database access."
      ]
    },

    {
      id: "request-flow",
      title: "29. SELECT Request Flow in a REST API",
      paragraphs: [
        "A SELECT operation in a Spring Boot REST application commonly travels through several layers before the database returns the result."
      ],
      code: {
        language: "text",
        code: `React / Client
      ↓
GET /api/employees
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
JPA / Hibernate / JDBC
      ↓
SELECT SQL
      ↓
MySQL / PostgreSQL
      ↓
Result Rows
      ↓
Entity / Projection / DTO
      ↓
JSON Response
      ↓
Client`
      }
    },

    {
      id: "common-mistakes",
      title: "30. Common SELECT Mistakes",
      bullets: [
        "Using SELECT * everywhere instead of selecting required columns.",
        "Assuming rows are returned in insertion order.",
        "Forgetting ORDER BY when deterministic ordering is required.",
        "Using = NULL instead of IS NULL.",
        "Forgetting quotes around string literals.",
        "Using a column name that does not exist.",
        "Using WHERE incorrectly and filtering out required rows.",
        "Using HAVING when WHERE would be appropriate for row filtering.",
        "Forgetting GROUP BY when required by the selected aggregate query.",
        "Using DISTINCT unnecessarily.",
        "Returning thousands or millions of rows without pagination.",
        "Ignoring query performance on large tables.",
        "Not checking the execution plan for slow queries."
      ]
    },

    {
      id: "practical-queries",
      title: "31. Practical SELECT Exercises",
      paragraphs: [
        "Use the employees table from the previous lesson and practise these queries before checking the solutions."
      ],
      bullets: [
        "Display all employee names.",
        "Display employee names and salaries.",
        "Display employees earning more than 50000.",
        "Display Engineering employees.",
        "Display employees with salary between 50000 and 70000.",
        "Display employees from Engineering or Finance.",
        "Display unique departments.",
        "Display employees ordered by salary from highest to lowest.",
        "Display the two highest-paid employees.",
        "Display the average salary.",
        "Display the number of employees in each department.",
        "Display departments having at least two employees."
      ],
      code: {
        language: "sql",
        code: `-- 1
SELECT employee_name
FROM employees;

-- 2
SELECT employee_name, salary
FROM employees;

-- 3
SELECT employee_name, salary
FROM employees
WHERE salary > 50000;

-- 4
SELECT employee_name
FROM employees
WHERE department = 'Engineering';

-- 5
SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 70000;

-- 6
SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'Finance');

-- 7
SELECT DISTINCT department
FROM employees;

-- 8
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;

-- 9
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 2;

-- 10
SELECT AVG(salary) AS average_salary
FROM employees;

-- 11
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- 12
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2;`
      }
    },

    {
      id: "debugging",
      title: "32. How to Debug a SELECT Query",
      paragraphs: [
        "When a SELECT query does not return the expected result, build the query gradually instead of adding every clause at once."
      ],
      code: {
        language: "sql",
        code: `-- Step 1: Check the source
SELECT *
FROM employees;

-- Step 2: Select only required columns
SELECT employee_name, salary
FROM employees;

-- Step 3: Add filtering
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;

-- Step 4: Add sorting
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },
      bullets: [
        "Confirm the table name.",
        "Confirm the column names.",
        "Check whether NULL values exist.",
        "Test WHERE conditions independently.",
        "Add ORDER BY only after the filtering works.",
        "Use EXPLAIN when investigating performance."
      ]
    },

    {
      id: "scenario-interview",
      title: "33. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "How would you find employees earning more than 60000?",
          answer:
            "I would use SELECT employee_name, salary FROM employees WHERE salary > 60000."
        },
        {
          question:
            "How would you find the two highest-paid employees?",
          answer:
            "I would order the employees by salary descending and limit the result, for example SELECT employee_name, salary FROM employees ORDER BY salary DESC LIMIT 2 in MySQL or PostgreSQL."
        },
        {
          question:
            "How would you find unique departments?",
          answer:
            "I would use SELECT DISTINCT department FROM employees."
        },
        {
          question:
            "How would you calculate the average salary?",
          answer:
            "I would use SELECT AVG(salary) FROM employees."
        },
        {
          question:
            "How would you find the number of employees in each department?",
          answer:
            "I would use GROUP BY department together with COUNT(*)."
        },
        {
          question:
            "How would you find departments containing at least two employees?",
          answer:
            "I would GROUP BY department and use HAVING COUNT(*) >= 2."
        },
        {
          question:
            "How would you find employees earning above the company average?",
          answer:
            "I would use a subquery that calculates AVG(salary), then compare each employee's salary with that result."
        }
      ]
    },

    {
      id: "interview",
      title: "34. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is SELECT in SQL?",
          answer:
            "SELECT is used to retrieve data from one or more database objects such as tables or views."
        },
        {
          question: "What does SELECT * mean?",
          answer:
            "It requests all columns from the query source."
        },
        {
          question: "Does SELECT modify data?",
          answer:
            "A normal SELECT query retrieves data without modifying the stored rows."
        },
        {
          question: "Why should SELECT * often be avoided in application queries?",
          answer:
            "Selecting only required columns can reduce unnecessary data transfer, make the query clearer, and reduce coupling to table structure."
        },
        {
          question: "Does SELECT guarantee row order?",
          answer:
            "No. Use ORDER BY when a specific result order is required."
        },
        {
          question: "What is the purpose of WHERE?",
          answer:
            "WHERE filters rows based on a condition."
        },
        {
          question: "What is DISTINCT?",
          answer:
            "DISTINCT removes duplicate result rows for the selected expressions."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY."
        },
        {
          question: "What is GROUP BY used for?",
          answer:
            "GROUP BY groups rows so aggregate calculations such as COUNT, SUM, or AVG can be performed for each group."
        },
        {
          question: "What is an aggregate function?",
          answer:
            "An aggregate function calculates a value from multiple rows. Examples include COUNT, SUM, AVG, MIN, and MAX."
        },
        {
          question: "How do you check for NULL?",
          answer:
            "Use IS NULL or IS NOT NULL. Do not use = NULL."
        },
        {
          question: "What is ORDER BY?",
          answer:
            "ORDER BY sorts the result set according to one or more expressions."
        },
        {
          question: "What is the difference between ASC and DESC?",
          answer:
            "ASC sorts ascending and DESC sorts descending."
        },
        {
          question: "What is LIMIT?",
          answer:
            "LIMIT restricts the number of rows returned in database systems that support this syntax."
        },
        {
          question: "What is OFFSET?",
          answer:
            "OFFSET skips a specified number of result rows before returning the remaining rows in databases that support it."
        },
        {
          question: "What is a column alias?",
          answer:
            "A column alias gives a temporary name to a selected column or expression using AS or equivalent syntax."
        },
        {
          question: "What is a table alias?",
          answer:
            "A table alias gives a shorter temporary name to a table or query source, which is particularly useful in joins."
        },
        {
          question: "What is the logical order of a SELECT query?",
          answer:
            "A simplified logical order is FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, and LIMIT/OFFSET."
        },
        {
          question: "Can SELECT query multiple tables?",
          answer:
            "Yes. SELECT can retrieve data from multiple related sources using JOINs, subqueries, and other SQL constructs."
        },
        {
          question: "Why is SQL knowledge important when using JPA?",
          answer:
            "JPA abstracts much of the database interaction, but understanding SQL is essential for debugging generated queries, writing custom queries, designing indexes, and investigating performance."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "35. Quick Revision",
      bullets: [
        "SELECT → retrieves data.",
        "FROM → identifies the query source.",
        "WHERE → filters rows.",
        "DISTINCT → removes duplicate result rows.",
        "AS → creates an alias.",
        "ORDER BY → sorts results.",
        "ASC → ascending order.",
        "DESC → descending order.",
        "LIMIT → limits returned rows where supported.",
        "OFFSET → skips rows where supported.",
        "COUNT → counts rows or values.",
        "SUM → calculates a total.",
        "AVG → calculates an average.",
        "MIN → finds the minimum.",
        "MAX → finds the maximum.",
        "GROUP BY → groups rows for aggregation.",
        "HAVING → filters groups.",
        "IS NULL → checks for NULL.",
        "JOIN → combines related query sources.",
        "Subquery → query nested inside another query.",
        "Always use ORDER BY when result order matters.",
        "Avoid unnecessary SELECT * in application code."
      ]
    },

    {
      id: "one-minute-answer",
      title: "36. One-Minute Interview Answer",
      paragraphs: [
        "SELECT is the SQL statement used to retrieve data from tables and other query sources. A basic SELECT specifies the columns to return and the source using FROM. WHERE filters rows, DISTINCT removes duplicate result rows, ORDER BY sorts the result, and LIMIT can restrict the number of returned rows. SELECT can also use aggregate functions such as COUNT, SUM, AVG, MIN, and MAX together with GROUP BY and HAVING. In real applications, SELECT queries may be executed through JDBC, JPA, Hibernate, or Spring Data. Even when using an ORM, understanding SELECT is important for debugging, query optimization, and database interviews."
      ]
    },

    {
      id: "revision-notes",
      title: "37. Revision Notes",
      paragraphs: [
        "Remember the basic SELECT structure: SELECT columns FROM table.",
        "Add WHERE when you need to filter rows.",
        "Use ORDER BY when a deterministic result order is required.",
        "Use DISTINCT when duplicate result rows need to be removed intentionally.",
        "Use aggregate functions for calculations across multiple rows.",
        "Use GROUP BY when aggregate results are required for separate groups.",
        "Use HAVING to filter grouped results.",
        "Use IS NULL instead of = NULL.",
        "Use LIMIT and OFFSET carefully for pagination and always combine them with a meaningful ORDER BY when deterministic pagination is required.",
        "For production queries, select only the columns needed and investigate slow queries using appropriate database query-plan tools."
      ]
    }
  ]
};
