
export const selectingSpecificColumns = {

  id: 2012,

  title: "Selecting Specific Columns",

  slug: "selecting-specific-columns",

  topicTitle: "SELECT Queries and Filtering",

  description:
    "Learn how to retrieve only the columns required from a table, use aliases and expressions, and understand why precise column selection is important in SQL queries.",

  estimatedTime: "30 min",

  sections: [

    {
      id: "specific-columns",
      title: "1. Selecting Specific Columns",

      paragraphs: [
        "Instead of retrieving every column from a table, you can specify exactly which columns should appear in the result.",
        "This makes the query more precise because the result contains only the information required by the application or user."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees;`
      },

      output: `employee_name | department
--------------+------------
Ravi          | Engineering
Priya         | HR
Kiran         | Engineering
Anu           | Finance`
    },

    {
      id: "why-specific-columns",
      title: "2. Why Select Specific Columns?",

      paragraphs: [
        "Selecting only the required columns is a common SQL best practice, especially in application code.",
        "If a table contains many columns but the application needs only two or three, there is usually no reason to retrieve all of them."
      ],

      bullets: [
        "Makes the query easier to understand.",
        "Makes the result structure explicit.",
        "Can reduce unnecessary data transfer.",
        "Can reduce the amount of data the application needs to process.",
        "Reduces accidental exposure of columns that the application does not need.",
        "Makes the query less dependent on unrelated columns being added to the table."
      ]
    },

    {
      id: "multiple-columns",
      title: "3. Selecting Multiple Columns",

      paragraphs: [
        "Separate multiple columns with commas.",
        "The columns can be written on one line or across multiple lines. SQL formatting does not change the meaning of the query."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    department,
    salary
FROM employees;`
      },

      bullets: [
        "Columns can be written on one line or multiple lines.",
        "Formatting does not change the meaning of the query.",
        "The order of columns in SELECT determines the order of result columns.",
        "A comma is required between selected expressions."
      ]
    },

    {
      id: "column-order",
      title: "4. Result Column Order",

      paragraphs: [
        "The order in which columns are written after SELECT determines the order of those columns in the result set."
      ],

      code: {
        language: "sql",
        code: `SELECT salary, employee_name, department
FROM employees;`
      },

      output: `salary  | employee_name | department
--------+---------------+------------
60000   | Ravi          | Engineering
45000   | Priya         | HR
70000   | Kiran         | Engineering`,

      bullets: [
        "salary appears first because it is the first SELECT expression.",
        "employee_name appears second.",
        "department appears third.",
        "The physical order of columns in the table does not determine the SELECT result order."
      ]
    },

    {
      id: "single-column",
      title: "5. Selecting a Single Column",

      paragraphs: [
        "A SELECT query can retrieve only one column if that is all the application needs."
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
      id: "different-column-combinations",
      title: "6. Different Column Combinations",

      paragraphs: [
        "You can select any valid combination of columns from the same table."
      ],

      code: {
        language: "sql",
        code: `-- Only names
SELECT employee_name
FROM employees;

-- Name and department
SELECT employee_name, department
FROM employees;

-- Name and salary
SELECT employee_name, salary
FROM employees;

-- ID, name and salary
SELECT employee_id, employee_name, salary
FROM employees;`
      }
    },

    {
      id: "expressions",
      title: "7. Selecting Expressions",

      paragraphs: [
        "SELECT can also return expressions calculated from column values.",
        "The calculated value does not have to exist as a physical column in the table."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees;`
      },

      output: `employee_name | salary | annual_salary
--------------+--------+--------------
Ravi          | 60000  | 720000
Priya         | 45000  | 540000
Kiran         | 70000  | 840000`
    },

    {
      id: "column-alias",
      title: "8. Using AS with Selected Columns",

      paragraphs: [
        "AS creates an alias for a selected column or expression.",
        "An alias changes the name shown in the query result; it does not rename the physical database column."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    department AS dept,
    salary AS monthly_salary
FROM employees;`
      },

      output: `name  | dept        | monthly_salary
------+-------------+---------------
Ravi  | Engineering | 60000
Priya | HR          | 45000
Kiran | Engineering | 70000
Anu   | Finance     | 50000`
    },

    {
      id: "expression-alias",
      title: "9. Alias for a Calculated Column",

      paragraphs: [
        "Aliases are particularly useful for calculated expressions because the expression itself may not have a convenient result-column name."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary,
    salary * 12 * 0.10 AS estimated_bonus
FROM employees;`
      },

      bullets: [
        "annual_salary is calculated from salary.",
        "estimated_bonus is another calculated expression.",
        "The aliases make the result easier to understand.",
        "The calculated values are returned by the query but are not automatically stored in the table."
      ]
    },

    {
      id: "distinct-columns",
      title: "10. Selecting Unique Column Values",

      paragraphs: [
        "DISTINCT removes duplicate result rows for the selected expressions.",
        "It is useful when you want to see the unique values of a column."
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
      id: "distinct-multiple",
      title: "11. DISTINCT with Multiple Columns",

      paragraphs: [
        "When DISTINCT is used with multiple columns, uniqueness applies to the combination of those selected columns."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    department,
    salary
FROM employees;`
      },

      bullets: [
        "DISTINCT does not independently make each column unique.",
        "The complete selected combination is considered when removing duplicate result rows.",
        "This distinction becomes important when selecting multiple columns."
      ]
    },

    {
      id: "where-specific",
      title: "12. Selecting Specific Columns with WHERE",

      paragraphs: [
        "Specific column selection can be combined with WHERE.",
        "SELECT determines which columns appear, while WHERE determines which rows qualify."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary
FROM employees
WHERE department = 'Engineering';`
      },

      output: `employee_name | salary
--------------+--------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "where-vs-select",
      title: "13. SELECT vs WHERE",

      paragraphs: [
        "A useful beginner distinction is that SELECT controls the columns in the result, while WHERE controls the rows."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 60000;`
      },

      bullets: [
        "SELECT employee_name, salary → chooses two columns.",
        "WHERE salary >= 60000 → filters the rows.",
        "The result therefore contains selected columns from only matching employees."
      ]
    },

    {
      id: "order-by-specific",
      title: "14. Selecting Columns with ORDER BY",

      paragraphs: [
        "Specific column selection can be combined with ORDER BY.",
        "The sorting column does not always have to appear in the SELECT list, although there are database-specific rules and restrictions in some DISTINCT queries."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    department
FROM employees
ORDER BY salary DESC;`
      },

      output: `employee_name | department
--------------+-------------
Kiran         | Engineering
Ravi          | Engineering
Anu           | Finance
Priya         | HR`
    },

    {
      id: "null-columns",
      title: "15. Selecting Columns That May Contain NULL",

      paragraphs: [
        "If a selected column contains NULL, the result displays NULL according to the database client or tool.",
        "Selecting a column does not automatically replace NULL with another value."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    department
FROM employees;`
      },

      bullets: [
        "A NULL department remains NULL in the result.",
        "NULL is not the same as an empty string.",
        "Functions such as COALESCE can be used when a replacement value is required."
      ]
    },

    {
      id: "coalesce",
      title: "16. Replacing NULL Values with COALESCE",

      paragraphs: [
        "COALESCE returns the first non-NULL expression from its arguments.",
        "It can be useful when the query result should display a fallback value."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    COALESCE(department, 'Not Assigned') AS department
FROM employees;`
      },

      output: `employee_name | department
--------------+-------------
Ravi          | Engineering
Priya         | HR
Kiran         | Engineering
Anu           | Finance`
    },

    {
      id: "calculation",
      title: "17. Arithmetic with Selected Columns",

      paragraphs: [
        "SQL expressions can perform arithmetic operations using numeric columns."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    salary + 5000 AS increased_salary,
    salary * 12 AS annual_salary
FROM employees;`
      },

      bullets: [
        "+ → addition.",
        "- → subtraction.",
        "* → multiplication.",
        "/ → division.",
        "The exact result type and division behavior can depend on the database and operand types."
      ]
    },

    {
      id: "functions",
      title: "18. Using Functions in SELECT",

      paragraphs: [
        "SELECT can call SQL functions to transform or calculate values.",
        "The exact available functions vary between database systems."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    UPPER(employee_name) AS uppercase_name
FROM employees;`
      },

      output: `employee_name | uppercase_name
--------------+---------------
Ravi          | RAVI
Priya         | PRIYA
Kiran         | KIRAN
Anu           | ANU`
    },

    {
      id: "count-specific",
      title: "19. Selecting Aggregate Results",

      paragraphs: [
        "SELECT can return aggregate calculations instead of individual rows."
      ],

      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary,
    MAX(salary) AS highest_salary
FROM employees;`
      },

      bullets: [
        "COUNT(*) counts rows.",
        "AVG(salary) calculates the average salary.",
        "MAX(salary) returns the highest salary.",
        "Aggregate queries can return a single summary row."
      ]
    },

    {
      id: "group-by",
      title: "20. Selecting Aggregates by Group",

      paragraphs: [
        "GROUP BY allows aggregate calculations to be performed separately for each group."
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
      id: "table-alias",
      title: "21. Using Table Aliases",

      paragraphs: [
        "A table alias gives a shorter name to a table and is especially useful when queries involve multiple tables."
      ],

      code: {
        language: "sql",
        code: `SELECT
    e.employee_name,
    e.department,
    e.salary
FROM employees AS e;`
      },

      bullets: [
        "e is the alias for employees.",
        "e.employee_name refers to the employee_name column from employees.",
        "Table aliases make joins easier to read."
      ]
    },

    {
      id: "join-preview",
      title: "22. Selecting Columns from Multiple Tables",

      paragraphs: [
        "When multiple tables are related, SELECT can retrieve specific columns from each table using JOIN."
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
        "SELECT chooses columns from both tables.",
        "JOIN defines how related rows are connected."
      ]
    },

    {
      id: "select-star-vs-specific",
      title: "23. SELECT * vs Specific Columns",

      paragraphs: [
        "SELECT * is convenient when exploring a table or learning SQL.",
        "For application queries, explicitly selecting required columns is usually clearer and more intentional."
      ],

      code: {
        language: "sql",
        code: `-- Selecting everything
SELECT *
FROM employees;

-- Selecting only required columns
SELECT
    employee_id,
    employee_name,
    salary
FROM employees;`
      },

      bullets: [
        "SELECT * is convenient for exploration.",
        "Specific columns make the expected result explicit.",
        "Specific columns can reduce unnecessary data transfer.",
        "Specific columns reduce accidental exposure of unrelated data.",
        "Specific columns make application code less dependent on every table column."
      ]
    },

    {
      id: "performance",
      title: "24. Why Specific Columns Can Improve Performance",

      paragraphs: [
        "Selecting fewer columns can reduce the amount of data that must be transferred from the database to the application.",
        "However, selecting fewer columns does not automatically make every query fast. Filtering, indexes, joins, sorting, grouping, execution plans, and the amount of data scanned can have much larger effects depending on the query."
      ],

      bullets: [
        "Reduce unnecessary result data.",
        "Avoid transferring sensitive or unused columns.",
        "Use appropriate WHERE conditions.",
        "Use indexes for important access patterns.",
        "Use pagination for large result sets.",
        "Use EXPLAIN or database query-plan tools when investigating performance."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "25. Selecting Specific Data with Spring Data JPA",

      paragraphs: [
        "In Spring Data JPA, you can retrieve entities, projections, or DTO-shaped results depending on the requirement.",
        "The goal is similar to SQL column selection: retrieve the data that the application actually needs."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(String department);
}`
      },

      bullets: [
        "The repository method can retrieve employees for a department.",
        "The exact SQL is generated by the persistence provider.",
        "For larger applications, projections or DTO queries can be useful when a complete entity is unnecessary.",
        "SQL knowledge helps you understand what the ORM is doing underneath."
      ]
    },

    {
      id: "dto-projection",
      title: "26. Why Specific Columns Matter in APIs",

      paragraphs: [
        "A REST API may not need every database column. Returning only the required data can reduce response size and prevent accidental exposure of fields that should not be part of the API contract."
      ],

      code: {
        language: "java",
        code: `public record EmployeeSummary(
    Long id,
    String name,
    String department
) {
}`
      },

      bullets: [
        "Database entity → may contain many fields.",
        "DTO/projection → contains only fields required by the API.",
        "Controller → returns the DTO.",
        "This creates a cleaner API boundary."
      ]
    },

    {
      id: "common-mistakes",
      title: "27. Common Mistakes",

      bullets: [
        "Forgetting commas between selected columns.",
        "Writing a column name that does not exist.",
        "Using SELECT * when only a few fields are required.",
        "Assuming SELECT column order changes the physical table structure.",
        "Forgetting that aliases affect the result name, not the physical column name.",
        "Using an alias incorrectly in a query clause.",
        "Assuming duplicate rows disappear automatically.",
        "Forgetting DISTINCT when unique result combinations are required.",
        "Assuming NULL and empty string are the same.",
        "Selecting sensitive columns unnecessarily.",
        "Returning complete entities when an API needs only a small summary.",
        "Assuming selecting fewer columns alone guarantees a fast query."
      ]
    },

    {
      id: "practical-exercises",
      title: "28. Practical Exercises",

      paragraphs: [
        "Use the employees table and try to solve these exercises yourself before looking at the solutions."
      ],

      bullets: [
        "Select only employee_name.",
        "Select employee_name and salary.",
        "Select employee_id, employee_name, and department.",
        "Select salary first, followed by employee_name.",
        "Select employee_name and calculate annual salary.",
        "Select unique department values.",
        "Select Engineering employees with only their names and salaries.",
        "Select employees and sort them by salary.",
        "Calculate the average salary.",
        "Count employees in each department."
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
SELECT employee_id, employee_name, department
FROM employees;

-- 4
SELECT salary, employee_name
FROM employees;

-- 5
SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees;

-- 6
SELECT DISTINCT department
FROM employees;

-- 7
SELECT
    employee_name,
    salary
FROM employees
WHERE department = 'Engineering';

-- 8
SELECT
    employee_name,
    salary
FROM employees
ORDER BY salary DESC;

-- 9
SELECT AVG(salary) AS average_salary
FROM employees;

-- 10
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      }
    },

    {
      id: "debugging",
      title: "29. Debugging a Column Selection Query",

      paragraphs: [
        "If a SELECT query is not returning what you expect, start with a simple query and gradually add columns, filters, expressions, and sorting."
      ],

      code: {
        language: "sql",
        code: `-- Step 1
SELECT *
FROM employees;

-- Step 2
SELECT employee_name, salary
FROM employees;

-- Step 3
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;

-- Step 4
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },

      bullets: [
        "First verify that the table contains data.",
        "Then verify the column names.",
        "Then add the WHERE condition.",
        "Finally add sorting or calculations.",
        "This makes SQL errors easier to isolate."
      ]
    },

    {
      id: "scenario-interview",
      title: "30. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An API needs only employee name and department. How would you query the database?",
          answer:
            "I would explicitly select only employee_name and department instead of using SELECT *."
        },
        {
          question:
            "How would you calculate annual salary without adding a database column?",
          answer:
            "I would calculate it in the SELECT expression, for example salary * 12 AS annual_salary."
        },
        {
          question:
            "How would you retrieve only unique departments?",
          answer:
            "I would use SELECT DISTINCT department FROM employees."
        },
        {
          question:
            "Does SELECT employee_name, salary change the table?",
          answer:
            "No. SELECT retrieves data and does not normally modify the stored table rows."
        },
        {
          question:
            "Does changing the order of columns in SELECT change the table?",
          answer:
            "No. It changes only the order of columns in the query result."
        },
        {
          question:
            "Why might you avoid SELECT * in a REST API?",
          answer:
            "The API may not need every database field. Explicit selection can reduce unnecessary data transfer and help prevent accidental exposure of fields."
        },
        {
          question:
            "Can SELECT return calculated values?",
          answer:
            "Yes. SELECT can contain arithmetic expressions, functions, CASE expressions, and other supported SQL expressions."
        }
      ]
    },

    {
      id: "interview",
      title: "31. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "How do you select specific columns?",
          answer:
            "List the required column names after SELECT and separate them with commas."
        },
        {
          question: "Does the SELECT column order matter?",
          answer:
            "Yes. The order of expressions in SELECT determines the order of columns in the result set."
        },
        {
          question: "Can SELECT calculate values?",
          answer:
            "Yes. SELECT can contain expressions using columns, operators, functions, and other SQL expressions."
        },
        {
          question: "What is the advantage of selecting specific columns?",
          answer:
            "It makes queries clearer and can reduce unnecessary data retrieval."
        },
        {
          question: "What is SELECT *?",
          answer:
            "SELECT * requests all columns from the query source."
        },
        {
          question: "Does selecting specific columns improve performance?",
          answer:
            "It can reduce the amount of result data transferred and processed, but overall query performance also depends on filtering, indexes, joins, sorting, grouping, execution plans, and data volume."
        },
        {
          question: "What is a column alias?",
          answer:
            "A column alias is a temporary name assigned to a selected column or expression in the query result."
        },
        {
          question: "Does an alias rename the database column?",
          answer:
            "No. An alias changes the name shown in that query's result. It does not rename the physical database column."
        },
        {
          question: "What is DISTINCT?",
          answer:
            "DISTINCT removes duplicate result rows for the selected expressions."
        },
        {
          question: "Can SELECT contain expressions?",
          answer:
            "Yes. SELECT can contain arithmetic operations, functions, CASE expressions, and other supported expressions."
        },
        {
          question: "Can you select columns from multiple tables?",
          answer:
            "Yes. SELECT can retrieve columns from multiple tables when they are combined using JOINs or other SQL constructs."
        },
        {
          question: "Why should APIs avoid returning unnecessary database columns?",
          answer:
            "Returning only required fields can reduce response size, improve the API contract, and reduce the risk of exposing fields that the client does not need."
        },
        {
          question: "What is the difference between selecting an entity and selecting a DTO or projection?",
          answer:
            "Selecting an entity typically retrieves the entity representation managed by the persistence layer, while a DTO or projection can represent only the fields required for a particular use case."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "32. Quick Revision",

      bullets: [
        "SELECT column1, column2 → selects specific columns.",
        "SELECT * → selects all available columns.",
        "Column order in SELECT → determines result column order.",
        "AS → creates an alias.",
        "DISTINCT → removes duplicate result rows.",
        "Expressions → calculate values in the result.",
        "WHERE → filters rows.",
        "ORDER BY → sorts results.",
        "GROUP BY → groups rows for aggregation.",
        "COUNT, SUM, AVG, MIN, MAX → common aggregate functions.",
        "Specific columns → usually preferred for application queries.",
        "SELECT does not normally modify stored data.",
        "Aliases do not rename physical database columns.",
        "Selecting fewer columns can reduce result-data transfer but does not by itself guarantee better query performance.",
        "DTOs and projections can help return only the fields an API needs."
      ]
    },

    {
      id: "one-minute-answer",
      title: "33. One-Minute Interview Answer",

      paragraphs: [
        "Selecting specific columns means listing only the fields required after SELECT instead of using SELECT *. For example, SELECT employee_name, department FROM employees returns only those two columns. The order of the selected expressions determines the result-column order. We can also use aliases with AS, expressions such as salary * 12, DISTINCT for unique result rows, WHERE for filtering, and ORDER BY for sorting. In production applications, selecting only required columns can reduce unnecessary data transfer and help prevent accidental exposure of fields. With Spring Boot and JPA, DTOs and projections can be used when an API needs only a subset of entity data."
      ]
    },

    {
      id: "revision-notes",
      title: "34. Revision Notes",

      paragraphs: [
        "The basic syntax is SELECT column1, column2 FROM table_name.",
        "Use commas between selected columns.",
        "The order after SELECT controls the order of columns in the result.",
        "Use AS when a result column needs a clearer temporary name.",
        "Use DISTINCT when duplicate result rows should be removed.",
        "Use expressions when values need to be calculated rather than directly retrieved.",
        "Use WHERE to decide which rows should appear.",
        "Use ORDER BY when result ordering is important.",
        "In production application queries, prefer explicit column selection when appropriate instead of automatically using SELECT *.",
        "Remember that selecting fewer columns can reduce result-data transfer, but query performance depends on many factors including indexes, filtering, joins, sorting, grouping, execution plans, and data volume."
      ]
    }

  ]
};
