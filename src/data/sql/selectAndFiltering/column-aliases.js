
export const columnAliases = {
  id: 2014,
  title: "Column Aliases with AS",
  slug: "column-aliases",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn how aliases make query results easier to understand, how column and table aliases work, how aliases are used with expressions and joins, and common alias mistakes.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "alias",
      title: "1. What Is a Column Alias?",

      paragraphs: [
        "A column alias temporarily changes the name displayed for a result expression.",
        "It does not rename the actual database column.",
        "Aliases are especially useful when a column name is too technical, too long, or when the SELECT expression is calculated."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    salary AS monthly_salary
FROM employees;`
      },

      output: `name  | monthly_salary
------+---------------
Ravi  | 60000
Priya | 45000`
    },

    {
      id: "alias-purpose",
      title: "2. Why Use Column Aliases?",

      paragraphs: [
        "Column aliases make query results easier for humans and applications to understand.",
        "They are particularly useful when the selected expression does not have a convenient name."
      ],

      bullets: [
        "Improve result readability.",
        "Give calculated values meaningful names.",
        "Make reports easier to understand.",
        "Provide cleaner column names for API responses.",
        "Avoid exposing technical database column names directly in some query results.",
        "Make complex expressions easier to identify."
      ]
    },

    {
      id: "calculated-alias",
      title: "3. Alias for Calculated Values",

      paragraphs: [
        "Aliases are commonly used with calculated expressions.",
        "The database calculates the expression and uses the alias as the result-column name."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees;`
      },

      bullets: [
        "The expression salary * 12 calculates a value.",
        "annual_salary is the output alias.",
        "The alias does not create a new database column.",
        "The calculated value exists only in the query result."
      ],

      output: `employee_name | annual_salary
--------------+--------------
Ravi          | 720000
Priya         | 540000`
    },

    {
      id: "without-as",
      title: "4. AS Keyword",

      paragraphs: [
        "AS explicitly introduces an alias in many SQL statements.",
        "Some database systems also allow the AS keyword to be omitted for column aliases.",
        "Using AS is often preferred because it makes the intention clear and improves readability."
      ],

      code: {
        language: "sql",
        code: `-- Explicit AS
SELECT
    employee_name AS name,
    salary AS salary_amount
FROM employees;

-- Alias without AS
SELECT
    employee_name name,
    salary salary_amount
FROM employees;`
      },

      bullets: [
        "AS clearly communicates that a result alias is being assigned.",
        "Some SQL dialects permit omission of AS for column aliases.",
        "Using AS is generally easier for beginners to read.",
        "Database-specific syntax rules should always be considered."
      ]
    },

    {
      id: "alias-table",
      title: "5. Table Aliases",

      paragraphs: [
        "Aliases can also be assigned to tables.",
        "Table aliases become especially useful when working with joins because they make column references shorter and easier to read."
      ],

      code: {
        language: "sql",
        code: `SELECT e.employee_name
FROM employees AS e;`
      },

      bullets: [
        "employees is the actual table name.",
        "e is the table alias.",
        "e.employee_name refers to employee_name from employees.",
        "Table aliases do not rename the actual database table."
      ]
    },

    {
      id: "table-alias-join",
      title: "6. Table Aliases with JOIN",

      paragraphs: [
        "When multiple tables contain similarly named columns, table aliases help identify exactly which table each column belongs to.",
        "This is one of the most common uses of aliases in real-world SQL."
      ],

      code: {
        language: "sql",
        code: `SELECT
    e.employee_name,
    d.department_name
FROM employees AS e
JOIN departments AS d
    ON e.department_id = d.department_id;`
      },

      bullets: [
        "e represents employees.",
        "d represents departments.",
        "e.employee_name refers to the employees table.",
        "d.department_name refers to the departments table.",
        "Aliases make joins shorter and easier to understand."
      ]
    },

    {
      id: "column-alias-multiple",
      title: "7. Multiple Column Aliases",

      paragraphs: [
        "A SELECT statement can assign aliases to multiple columns.",
        "Each alias belongs to the expression immediately before it."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_id AS id,
    employee_name AS name,
    department AS dept,
    salary AS monthly_salary
FROM employees;`
      },

      output: `id | name  | dept        | monthly_salary
---+-------+-------------+---------------
1  | Ravi  | Engineering | 60000
2  | Priya | HR          | 45000`
    },

    {
      id: "expression-alias",
      title: "8. Aliases for Expressions",

      paragraphs: [
        "Any valid SELECT expression can usually be given a meaningful alias.",
        "This is useful for arithmetic, functions, CASE expressions, and other calculated results."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    salary * 12 AS annual_salary,
    salary * 12 * 0.10 AS estimated_bonus
FROM employees;`
      },

      bullets: [
        "name is an alias for employee_name.",
        "annual_salary is an alias for salary * 12.",
        "estimated_bonus is an alias for the bonus calculation.",
        "Aliases describe the meaning of the returned expressions."
      ]
    },

    {
      id: "function-alias",
      title: "9. Aliases with SQL Functions",

      paragraphs: [
        "SQL functions can also be assigned aliases.",
        "This makes function-based results easier to understand."
      ],

      code: {
        language: "sql",
        code: `SELECT
    UPPER(employee_name) AS uppercase_name,
    LENGTH(employee_name) AS name_length
FROM employees;`
      },

      output: `uppercase_name | name_length
---------------+------------
RAVI           | 4
PRIYA          | 5
KIRAN          | 5`
    },

    {
      id: "distinct-alias",
      title: "10. DISTINCT with Aliases",

      paragraphs: [
        "DISTINCT can be combined with an aliased expression.",
        "The alias is the name displayed for the selected expression."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    department AS department_name
FROM employees;`
      },

      output: `department_name
---------------
Engineering
HR
Finance`
    },

    {
      id: "where-alias",
      title: "11. Can You Use a SELECT Alias in WHERE?",

      paragraphs: [
        "In standard SQL processing, the WHERE clause is evaluated before the SELECT list produces its output aliases.",
        "Therefore, a SELECT alias generally cannot be referenced directly in the WHERE clause of the same query.",
        "Database-specific behavior can differ in some situations, so follow the rules of the database you are using."
      ],

      code: {
        language: "sql",
        code: `-- Usually not valid
SELECT
    salary * 12 AS annual_salary
FROM employees
WHERE annual_salary > 700000;`
      },

      bullets: [
        "The alias annual_salary is created by the SELECT expression.",
        "WHERE is logically evaluated before the SELECT output alias exists.",
        "Repeat the expression, use a subquery, or use another appropriate query structure."
      ]
    },

    {
      id: "where-alias-solution",
      title: "12. Filtering a Calculated Value",

      paragraphs: [
        "If you need to filter using a calculated value, one approach is to repeat the expression.",
        "Another approach is to place the calculation in a subquery and then filter the alias in the outer query."
      ],

      code: {
        language: "sql",
        code: `-- Repeat the expression
SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees
WHERE salary * 12 > 700000;

-- Or use a subquery
SELECT
    name,
    annual_salary
FROM (
    SELECT
        employee_name AS name,
        salary * 12 AS annual_salary
    FROM employees
) AS employee_data
WHERE annual_salary > 700000;`
      }
    },

    {
      id: "order-by-alias",
      title: "13. Using an Alias with ORDER BY",

      paragraphs: [
        "ORDER BY can commonly reference a SELECT-list alias.",
        "This is convenient when the selected value is a calculated expression."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      },

      bullets: [
        "annual_salary is created in the SELECT list.",
        "ORDER BY uses the result alias.",
        "This avoids repeating salary * 12 in the ORDER BY clause.",
        "Exact alias rules can vary by SQL dialect."
      ]
    },

    {
      id: "group-by-alias",
      title: "14. Using Aliases with GROUP BY",

      paragraphs: [
        "Whether a SELECT alias can be referenced in GROUP BY depends on the SQL database and query rules.",
        "For portable SQL, it is safer to understand the database-specific behavior rather than assuming aliases work everywhere."
      ],

      code: {
        language: "sql",
        code: `SELECT
    department AS dept,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      },

      bullets: [
        "department is grouped.",
        "dept is the output alias.",
        "employee_count is the aggregate result alias.",
        "Using the original expression in GROUP BY is often the most portable approach."
      ]
    },

    {
      id: "having-alias",
      title: "15. Aliases with HAVING",

      paragraphs: [
        "Aliases and HAVING require database-specific consideration.",
        "A reliable approach is to understand the SQL dialect being used and whether it permits SELECT aliases in HAVING."
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

      bullets: [
        "COUNT(*) calculates the number of employees in each group.",
        "employee_count is the output alias.",
        "The example uses COUNT(*) directly in HAVING for broad SQL compatibility."
      ]
    },

    {
      id: "reserved-word-alias",
      title: "16. Avoid Problematic Alias Names",

      paragraphs: [
        "Alias names should be chosen carefully.",
        "Using SQL reserved words as aliases can create confusing or invalid queries depending on the database."
      ],

      code: {
        language: "sql",
        code: `-- Clear alias
SELECT
    employee_name AS employee_name
FROM employees;

-- Avoid unclear aliases
SELECT
    employee_name AS data
FROM employees;`
      },

      bullets: [
        "Prefer descriptive aliases.",
        "Avoid unnecessary abbreviations.",
        "Avoid reserved words unless quoting rules are understood.",
        "Use consistent naming conventions."
      ]
    },

    {
      id: "quoted-alias",
      title: "17. Aliases with Spaces",

      paragraphs: [
        "Aliases can sometimes contain spaces when quoted according to the database's identifier rules.",
        "However, simple aliases without spaces are generally easier to use in application code."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS "Employee Name",
    salary AS "Monthly Salary"
FROM employees;`
      },

      bullets: [
        "Quoted identifiers are database-dialect sensitive.",
        "Simple aliases such as employee_name are easier to reference.",
        "Avoid spaces in aliases when the result will be consumed programmatically unless there is a good reason."
      ]
    },

    {
      id: "api-response",
      title: "18. Column Aliases and REST API Responses",

      paragraphs: [
        "Aliases can make database query results easier to map to application-specific names.",
        "In Spring Boot applications, however, DTOs or projections are usually a better long-term API boundary than relying only on SQL column aliases."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_id AS id,
    employee_name AS name,
    department AS department_name
FROM employees;`
      },

      bullets: [
        "The database result uses the requested aliases.",
        "The application receives a clearer result structure.",
        "DTOs provide stronger control over API contracts.",
        "Aliases are useful at the query level, while DTOs are useful at the application boundary."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "19. Column Aliases in Spring Data JPA",

      paragraphs: [
        "Spring Data JPA can use JPQL or native SQL queries depending on the requirement.",
        "When using projections or native queries, aliases can help map selected values to the expected result properties."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeSummary {

    Long getId();

    String getName();

    String getDepartment();
}`
      },

      bullets: [
        "A projection can expose only the required fields.",
        "Native queries may use SQL aliases that correspond to projection property names.",
        "This can be useful when the database column names differ from the API-oriented names."
      ]
    },

    {
      id: "native-query-alias",
      title: "20. Native Query with Aliases",

      paragraphs: [
        "When using a native SQL query, column aliases can make the result names match the application's projection properties."
      ],

      code: {
        language: "java",
        code: `@Query(value = """
    SELECT
        employee_id AS id,
        employee_name AS name,
        department AS department
    FROM employees
    """, nativeQuery = true)
List<EmployeeSummary> findEmployeeSummaries();`
      },

      bullets: [
        "employee_id is returned as id.",
        "employee_name is returned as name.",
        "The projection can expose the application-friendly names.",
        "The exact projection mapping behavior depends on the JPA provider and query configuration."
      ]
    },

    {
      id: "column-alias-vs-rename",
      title: "21. Alias vs Renaming a Column",

      paragraphs: [
        "A column alias and a database column rename are completely different operations.",
        "An alias affects the result of a query.",
        "Renaming a column changes the database schema."
      ],

      code: {
        language: "sql",
        code: `-- Alias only
SELECT employee_name AS name
FROM employees;

-- Schema change example
ALTER TABLE employees
RENAME COLUMN employee_name TO name;`
      },

      bullets: [
        "SELECT ... AS ... → changes the result-column label.",
        "ALTER TABLE ... RENAME COLUMN ... → changes the database schema.",
        "An alias normally lasts only for the query result.",
        "A schema rename affects future queries and application mappings."
      ]
    },

    {
      id: "column-alias-best-practices",
      title: "22. Column Alias Best Practices",

      bullets: [
        "Use meaningful aliases.",
        "Use consistent naming conventions.",
        "Prefer aliases that describe the actual result.",
        "Use AS when it improves readability.",
        "Avoid unnecessary abbreviations.",
        "Avoid confusing aliases that hide the meaning of the data.",
        "Be careful when aliases contain spaces or reserved words.",
        "Remember that aliases do not modify the database schema.",
        "Use DTOs or projections for stable API contracts when appropriate.",
        "Check database-specific alias rules when writing portable SQL."
      ]
    },

    {
      id: "common-mistakes",
      title: "23. Common Mistakes",

      bullets: [
        "Thinking an alias permanently renames a database column.",
        "Using a SELECT alias directly in WHERE when the database does not allow it.",
        "Using unclear aliases such as x, data, or value without a reason.",
        "Forgetting AS when readability is important.",
        "Assuming alias behavior is identical across all database systems.",
        "Using spaces or reserved words in aliases without understanding identifier quoting.",
        "Confusing table aliases with column aliases.",
        "Repeating a long calculated expression instead of using an appropriate alias where supported.",
        "Returning database-specific technical names directly from an API when a DTO would provide a cleaner contract."
      ]
    },

    {
      id: "practical-exercises",
      title: "24. Practical Exercises",

      paragraphs: [
        "Try these exercises using the employees table before checking the solutions."
      ],

      bullets: [
        "Rename employee_name to name in the query result.",
        "Rename salary to monthly_salary.",
        "Calculate annual salary and give it the alias annual_salary.",
        "Create an alias for department called dept.",
        "Create a table alias e for employees.",
        "Use table aliases in a JOIN.",
        "Use an alias with COUNT(*).",
        "Use an alias with AVG(salary).",
        "Sort a calculated annual salary using its alias.",
        "Explain why a SELECT alias does not rename the database column."
      ],

      code: {
        language: "sql",
        code: `-- 1
SELECT employee_name AS name
FROM employees;

-- 2
SELECT salary AS monthly_salary
FROM employees;

-- 3
SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees;

-- 4
SELECT department AS dept
FROM employees;

-- 5
SELECT e.employee_name
FROM employees AS e;

-- 6
SELECT
    e.employee_name,
    d.department_name
FROM employees AS e
JOIN departments AS d
    ON e.department_id = d.department_id;

-- 7
SELECT COUNT(*) AS employee_count
FROM employees;

-- 8
SELECT AVG(salary) AS average_salary
FROM employees;

-- 9
SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      }
    },

    {
      id: "debugging",
      title: "25. Debugging Alias Problems",

      paragraphs: [
        "When an alias-related query fails, first check whether the alias is being used in a clause where the database allows it.",
        "Then verify spelling, quoting, and whether the alias belongs to a column, expression, or table."
      ],

      code: {
        language: "sql",
        code: `-- Step 1: simple alias
SELECT
    employee_name AS name
FROM employees;

-- Step 2: calculated alias
SELECT
    employee_name AS name,
    salary * 12 AS annual_salary
FROM employees;

-- Step 3: sort using the alias
SELECT
    employee_name AS name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      },

      bullets: [
        "Check the alias spelling.",
        "Check whether the alias is a column alias or table alias.",
        "Check whether the clause supports referencing that alias.",
        "Check database-specific syntax rules.",
        "Simplify the query and add complexity one step at a time."
      ]
    },

    {
      id: "scenario-interview",
      title: "26. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An API should return employee_name as name. How can SQL help?",
          answer:
            "I can use SELECT employee_name AS name FROM employees. This changes the result label without changing the database column."
        },
        {
          question:
            "How would you calculate annual salary and give it a meaningful name?",
          answer:
            "I would use salary * 12 AS annual_salary in the SELECT list."
        },
        {
          question:
            "You have a JOIN between employees and departments. How would you make the query readable?",
          answer:
            "I would assign table aliases such as employees AS e and departments AS d and use qualified references such as e.employee_name and d.department_name."
        },
        {
          question:
            "Does an alias change the database schema?",
          answer:
            "No. A SELECT alias changes only the name displayed in that query result."
        },
        {
          question:
            "Can you always use a SELECT alias in WHERE?",
          answer:
            "Generally no, because WHERE is logically evaluated before the SELECT-list alias is produced. Database-specific rules should also be considered."
        },
        {
          question:
            "Why are aliases important for calculated columns?",
          answer:
            "They give calculated expressions meaningful result names, making reports, queries, and application mappings easier to understand."
        }
      ]
    },

    {
      id: "interview",
      title: "27. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a column alias?",
          answer:
            "A column alias is a temporary name assigned to a column or expression in the query result."
        },
        {
          question: "What is the syntax for a column alias?",
          answer:
            "A common syntax is SELECT column_name AS alias_name FROM table_name."
        },
        {
          question: "Does an alias rename the database column?",
          answer:
            "No. A SELECT alias changes the name displayed in that query's result. It does not modify the database schema."
        },
        {
          question: "Why are aliases useful?",
          answer:
            "They improve readability and give meaningful names to columns and calculated expressions."
        },
        {
          question: "What is a table alias?",
          answer:
            "A table alias is a temporary name assigned to a table or query source, commonly used to simplify joins and qualified column references."
        },
        {
          question: "Can aliases be used with expressions?",
          answer:
            "Yes. Expressions such as salary * 12 can be assigned an alias such as annual_salary."
        },
        {
          question: "Can aliases be used with aggregate functions?",
          answer:
            "Yes. For example, COUNT(*) AS employee_count gives the aggregate result a meaningful name."
        },
        {
          question: "Can you use a column alias in WHERE?",
          answer:
            "Generally not in the same SELECT level because WHERE is logically evaluated before the SELECT-list alias is produced."
        },
        {
          question: "Can you use a column alias in ORDER BY?",
          answer:
            "Yes, many SQL databases allow ORDER BY to reference a SELECT-list alias."
        },
        {
          question: "What is the difference between a column alias and a table alias?",
          answer:
            "A column alias renames a selected result expression, while a table alias provides a temporary name for a table or query source."
        },
        {
          question: "What is the difference between AS and ALTER TABLE RENAME COLUMN?",
          answer:
            "AS creates a temporary query-result alias, while ALTER TABLE RENAME COLUMN changes the actual database schema."
        },
        {
          question: "Should aliases be meaningful?",
          answer:
            "Yes. Meaningful aliases make SQL results easier to understand and maintain."
        },
        {
          question: "Why are table aliases useful in JOINs?",
          answer:
            "They shorten qualified column references and make it clear which table each column belongs to."
        },
        {
          question: "Can aliases contain spaces?",
          answer:
            "They can when quoted according to the database's identifier rules, but simple aliases without spaces are generally easier to use."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "28. Quick Revision",

      bullets: [
        "AS creates a query-result alias.",
        "Column aliases do not rename physical database columns.",
        "employee_name AS name → result column is displayed as name.",
        "salary * 12 AS annual_salary → calculated result gets a meaningful name.",
        "Table aliases provide shorter names for tables.",
        "employees AS e → e becomes the table alias.",
        "Aliases are especially useful with JOINs.",
        "Aliases can be used with calculated expressions.",
        "Aliases can be used with aggregate results.",
        "SELECT aliases generally cannot be used directly in WHERE at the same query level.",
        "ORDER BY commonly supports SELECT aliases.",
        "Use meaningful and consistent aliases.",
        "Schema renaming and query aliasing are different operations."
      ]
    },

    {
      id: "one-minute-answer",
      title: "29. One-Minute Interview Answer",

      paragraphs: [
        "A column alias is a temporary name assigned to a column or expression in a SQL query result. We commonly use AS, for example SELECT employee_name AS name FROM employees. Aliases do not rename the actual database column. They are especially useful for calculated values such as salary * 12 AS annual_salary and for aggregate results such as COUNT(*) AS employee_count. SQL also supports table aliases, which are very useful in JOIN queries. In application development, meaningful aliases can improve readability, while DTOs and projections can provide a stronger API contract when needed."
      ]
    },

    {
      id: "revision-notes",
      title: "30. Revision Notes",

      paragraphs: [
        "A column alias provides a temporary name for a selected column or expression.",
        "Use AS to make alias assignment explicit and readable.",
        "Aliases do not change the physical database column.",
        "Calculated expressions can be given meaningful aliases.",
        "Aggregate expressions can also have aliases.",
        "Table aliases provide shorter names for tables.",
        "Table aliases are especially useful in JOIN queries.",
        "SELECT aliases generally cannot be referenced directly in WHERE at the same query level.",
        "ORDER BY commonly allows SELECT-list aliases.",
        "Database-specific rules should be checked when writing portable SQL.",
        "Use clear, meaningful, and consistent aliases.",
        "Do not confuse query aliases with permanent schema changes."
      ]
    }
  ]
};
