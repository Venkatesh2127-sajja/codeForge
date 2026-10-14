
export const comparisonOperators = {
  id: 2016,
  title: "Comparison Operators",
  slug: "comparison-operators",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn SQL comparison operators such as =, <>, >, <, >=, and <=, how they work with WHERE conditions, NULL values, strings, numbers, dates, and real-world Spring Boot applications.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "operators",
      title: "1. Common Comparison Operators",
      paragraphs: [
        "Comparison operators compare two values and determine whether a condition is true, false, or unknown. They are most commonly used inside the WHERE clause to filter rows.",
        "For example, if an employees table contains salary values, the condition salary >= 50000 selects employees whose salary is at least 50000.",
        "The most commonly used SQL comparison operators are =, <>, >, <, >=, and <=."
      ],

      bullets: [
        "= means equal to.",
        "<> means not equal to in standard SQL.",
        "> means greater than.",
        "< means less than.",
        ">= means greater than or equal to.",
        "<= means less than or equal to.",
        "Comparison operators are frequently used with WHERE, HAVING, CASE, JOIN conditions, and subqueries."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE salary >= 50000;`
      },

      output: `employee_name
-------------
Arjun
Priya
Rahul`
    },

    {
      id: "comparison-table",
      title: "2. Comparison Operators at a Glance",
      paragraphs: [
        "The following table summarizes the basic comparison operators. Understanding these operators is essential because they form the foundation of SQL filtering."
      ],

      bullets: [
        "= : Equal to",
        "<> : Not equal to",
        "> : Greater than",
        "< : Less than",
        ">= : Greater than or equal to",
        "<= : Less than or equal to"
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE salary > 50000;

SELECT *
FROM employees
WHERE salary <= 50000;

SELECT *
FROM employees
WHERE department = 'IT';

SELECT *
FROM employees
WHERE department <> 'HR';`
      }
    },

    {
      id: "equal",
      title: "3. Equal To (=)",
      paragraphs: [
        "The equal operator = checks whether two values are equal.",
        "For text values, the value is normally written inside single quotes. For numeric values, quotes are generally not required.",
        "The equality operator is one of the most frequently used operators in SQL."
      ],

      bullets: [
        "Use = when you want an exact match.",
        "Text values are normally written using single quotes.",
        "Numbers are normally written without quotes.",
        "Date literals depend on the SQL database and its supported date syntax."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'HR';

SELECT employee_name
FROM employees
WHERE salary = 50000;`
      },

      output: `employee_name
-------------
Priya`
    },

    {
      id: "equal-numeric",
      title: "4. Comparing Numeric Values with =",
      paragraphs: [
        "Numeric columns can be compared directly with numbers. For example, salary = 50000 returns employees whose salary is exactly 50000.",
        "Exact equality is useful when searching for a particular numeric value, but remember that decimal or floating-point values may require special care because of precision."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
WHERE salary = 50000;`
      },

      output: `employee_id | employee_name | salary
------------+---------------+-------
101         | Priya         | 50000`
    },

    {
      id: "not-equal",
      title: "5. Not Equal (<> )",
      paragraphs: [
        "The <> operator means not equal to. It returns rows where the compared values are different.",
        "For example, department <> 'HR' returns employees whose department is not HR.",
        "Some database systems also support != as a not-equal operator. However, <> is the standard SQL form and is a good operator to know for interviews."
      ],

      bullets: [
        "<> is the standard SQL not-equal operator.",
        "!= is also supported by many databases.",
        "Not-equal comparisons do not automatically include NULL values.",
        "NULL must be checked separately using IS NULL or IS NOT NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department <> 'HR';`
      },

      output: `employee_name
-------------
Arjun
Rahul
Sneha`
    },

    {
      id: "not-equal-alternative",
      title: "6. <> vs !=",
      paragraphs: [
        "Many SQL databases accept both <> and != for inequality. The important point for interviews is that <> is the standard SQL operator.",
        "When writing portable SQL, using <> is generally a safe choice."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department <> 'HR';

SELECT employee_name
FROM employees
WHERE department != 'HR';`
      }
    },

    {
      id: "greater-less",
      title: "7. Greater Than and Less Than",
      paragraphs: [
        "The greater-than operator > selects values that are strictly greater than the specified value.",
        "The less-than operator < selects values that are strictly less than the specified value.",
        "These operators are commonly used with numeric columns such as salary, age, price, quantity, and marks."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;

SELECT employee_name, salary
FROM employees
WHERE salary < 50000;`
      },

      output: `For salary > 50000:

employee_name | salary
--------------+-------
Arjun         | 75000
Rahul         | 65000

For salary < 50000:

employee_name | salary
--------------+-------
Sneha         | 40000`
    },

    {
      id: "greater-equal-less-equal",
      title: "8. Greater Than or Equal To and Less Than or Equal To",
      paragraphs: [
        "The >= operator means greater than or equal to. It includes the boundary value.",
        "The <= operator means less than or equal to. It also includes the boundary value.",
        "The difference between > and >= is important because >= includes the value being compared."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;

SELECT employee_name, salary
FROM employees
WHERE salary <= 50000;`
      },

      bullets: [
        "> 50000 means 50000 is excluded.",
        ">= 50000 means 50000 is included.",
        "< 50000 means 50000 is excluded.",
        "<= 50000 means 50000 is included."
      ]
    },

    {
      id: "boundary-values",
      title: "9. Understanding Boundary Values",
      paragraphs: [
        "Boundary values are especially important when using >= and <=.",
        "Suppose employee salaries are 40000, 50000, and 60000. A condition salary > 50000 returns only 60000, while salary >= 50000 returns both 50000 and 60000."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;

SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;`
      }
    },

    {
      id: "text-comparison",
      title: "10. Comparing Text Values",
      paragraphs: [
        "Comparison operators can also be used with character or string columns.",
        "For example, you can use = to find employees in a particular department.",
        "Text comparison behavior such as case sensitivity and collation depends on the database system and column/database collation settings."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'IT';

SELECT employee_name
FROM employees
WHERE department <> 'IT';`
      },

      bullets: [
        "Use single quotes for string literals.",
        "Do not normally use double quotes for string values in portable SQL.",
        "Case sensitivity can depend on the database and collation.",
        "Use LIKE when you need pattern matching rather than exact comparison."
      ]
    },

    {
      id: "date-comparison",
      title: "11. Comparing Dates",
      paragraphs: [
        "Comparison operators can be used with date and time columns as well.",
        "For example, you can retrieve employees who joined after a particular date.",
        "Date syntax and functions vary somewhat between database systems, but comparison concepts remain the same."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, joining_date
FROM employees
WHERE joining_date >= '2025-01-01';

SELECT employee_name, joining_date
FROM employees
WHERE joining_date < '2025-01-01';`
      },

      bullets: [
        ">= can be used to include a starting date.",
        "< can be used to exclude records after a boundary.",
        "Be careful when comparing TIMESTAMP values because time components may matter.",
        "For date ranges, understand whether your boundary is inclusive or exclusive."
      ]
    },

    {
      id: "and-comparison",
      title: "12. Combining Comparison Operators with AND",
      paragraphs: [
        "Comparison conditions can be combined using AND when all conditions must be true.",
        "For example, salary >= 50000 AND salary <= 80000 returns employees whose salary falls within the inclusive range."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
  AND salary <= 80000;`
      },

      output: `employee_name | salary
--------------+-------
Priya         | 50000
Rahul         | 65000
Arjun         | 75000`
    },

    {
      id: "or-comparison",
      title: "13. Combining Comparison Operators with OR",
      paragraphs: [
        "OR returns rows when at least one of the conditions is true.",
        "This is useful when you want to retrieve records matching one of several possible conditions."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'IT';`
      }
    },

    {
      id: "not-comparison",
      title: "14. Using NOT with Comparisons",
      paragraphs: [
        "The NOT operator reverses a condition.",
        "For example, NOT salary > 50000 means the salary condition is not true. In practice, you may often write salary <= 50000 instead when NULL behavior is not relevant.",
        "Be careful with NULL because SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE NOT salary > 50000;`
      }
    },

    {
      id: "null-warning",
      title: "15. Important: NULL Is Not Compared Normally",
      paragraphs: [
        "NULL represents an unknown, missing, or unavailable value. It is not the same thing as zero, an empty string, or false.",
        "A comparison such as salary = NULL does not test whether salary is NULL.",
        "Use IS NULL or IS NOT NULL when checking for NULL values.",
        "This happens because SQL uses three-valued logic. A comparison involving NULL generally produces UNKNOWN rather than TRUE or FALSE."
      ],

      code: {
        language: "sql",
        code: `-- Incorrect
SELECT *
FROM employees
WHERE salary = NULL;

-- Correct
SELECT *
FROM employees
WHERE salary IS NULL;

-- Also correct
SELECT *
FROM employees
WHERE salary IS NOT NULL;`
      }
    },

    {
      id: "null-comparison",
      title: "16. Why NULL Comparison Is Different",
      paragraphs: [
        "Suppose an employee has no salary value stored, so salary is NULL. SQL cannot say that NULL is equal to 50000 because the actual value is unknown.",
        "Therefore, salary = NULL does not return the row. IS NULL explicitly asks whether the value is missing."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE salary IS NULL;

SELECT employee_name
FROM employees
WHERE salary IS NOT NULL;`
      }
    },

    {
      id: "between-preview",
      title: "17. Comparison Operators and BETWEEN",
      paragraphs: [
        "BETWEEN is a convenient SQL operator for checking whether a value falls within a range.",
        "It is effectively a concise way to express an inclusive lower and upper boundary.",
        "For example, salary BETWEEN 50000 AND 80000 includes both 50000 and 80000."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 80000;`
      },

      bullets: [
        "BETWEEN normally includes both boundary values.",
        "BETWEEN is useful for readable range conditions.",
        "The equivalent numeric condition is usually salary >= 50000 AND salary <= 80000."
      ]
    },

    {
      id: "in-preview",
      title: "18. Comparison Operators and IN",
      paragraphs: [
        "IN is useful when a value needs to match one value from a list.",
        "Instead of writing several equality conditions using OR, IN can make the query shorter and easier to read."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('HR', 'IT', 'Finance');`
      },

      bullets: [
        "IN is commonly used for multiple exact-match values.",
        "department IN ('HR', 'IT') is easier to read than department = 'HR' OR department = 'IT'.",
        "NOT IN can be used when values should be excluded, but NULL requires special attention."
      ]
    },

    {
      id: "like-preview",
      title: "19. Comparison Operators vs LIKE",
      paragraphs: [
        "The = operator checks an exact value, while LIKE is used for pattern matching.",
        "For example, department = 'IT' looks for an exact department value, whereas employee_name LIKE 'A%' can find names beginning with A."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name = 'Arjun';

SELECT employee_name
FROM employees
WHERE employee_name LIKE 'A%';`
      },

      bullets: [
        "= is normally used for exact equality.",
        "LIKE is used for pattern matching.",
        "% represents zero or more characters in a LIKE pattern.",
        "_ represents a single character in a LIKE pattern."
      ]
    },

    {
      id: "where-comparison-flow",
      title: "20. Comparison Operators Inside WHERE",
      paragraphs: [
        "The WHERE clause evaluates comparison conditions for each candidate row.",
        "Rows for which the WHERE condition evaluates to TRUE are included in the result. Rows evaluating to FALSE or UNKNOWN are filtered out.",
        "This is why NULL comparisons behave differently from normal comparisons."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;`
      },

      bullets: [
        "FROM identifies the source table.",
        "WHERE applies the filtering condition.",
        "salary >= 50000 is evaluated for candidate rows.",
        "Only rows satisfying the condition are returned.",
        "SELECT determines which columns appear in the final result."
      ]
    },

    {
      id: "multiple-comparisons",
      title: "21. Multiple Comparison Conditions",
      paragraphs: [
        "Real-world queries commonly use multiple comparison operators together.",
        "Parentheses are useful when combining AND and OR because they make the intended logic explicit."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE (department = 'IT' AND salary >= 60000)
   OR (department = 'HR' AND salary >= 50000);`
      }
    },

    {
      id: "operator-precedence",
      title: "22. AND, OR, and Parentheses",
      paragraphs: [
        "When a WHERE clause contains both AND and OR, SQL operator precedence affects how the condition is interpreted.",
        "AND is evaluated before OR in typical SQL expression precedence. However, relying on precedence alone can make a query difficult to understand.",
        "Use parentheses to clearly express the intended business rule."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'IT'
  AND (salary >= 60000 OR experience_years >= 3);`
      },

      bullets: [
        "Use parentheses for clarity.",
        "Do not create complicated conditions without checking the intended logic.",
        "Test complex filters with small sample datasets."
      ]
    },

    {
      id: "comparison-in-having",
      title: "23. Comparison Operators with HAVING",
      paragraphs: [
        "Comparison operators are also used in HAVING when filtering grouped or aggregated results.",
        "WHERE filters rows before grouping, while HAVING filters groups after aggregation."
      ],

      code: {
        language: "sql",
        code: `SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 60000;`
      },

      bullets: [
        "WHERE normally filters individual rows.",
        "HAVING filters groups.",
        "Aggregate expressions such as AVG, COUNT, and SUM are commonly used with HAVING."
      ]
    },

    {
      id: "comparison-in-join",
      title: "24. Comparison Operators in JOIN Conditions",
      paragraphs: [
        "Comparison operators are also used when joining tables.",
        "The most common JOIN condition uses equality between a primary key and a foreign key."
      ],

      code: {
        language: "sql",
        code: `SELECT e.employee_name, d.department_name
FROM employees e
JOIN departments d
  ON e.department_id = d.department_id;`
      },

      bullets: [
        "The ON condition determines how rows from the tables are matched.",
        "Equality is the most common JOIN comparison.",
        "Other comparison conditions can also be used in specialized joins."
      ]
    },

    {
      id: "comparison-data-types",
      title: "25. Comparing Compatible Data Types",
      paragraphs: [
        "Comparison operators work best when values have compatible data types.",
        "Comparing a numeric column with a string literal can cause implicit conversion, warnings, errors, or unexpected behavior depending on the database.",
        "Use the correct data type for the value being compared."
      ],

      code: {
        language: "sql",
        code: `-- Preferred
SELECT employee_name
FROM employees
WHERE salary >= 50000;

-- Avoid unnecessary type conversion
SELECT employee_name
FROM employees
WHERE salary >= '50000';`
      },

      bullets: [
        "Compare numeric columns with numeric values.",
        "Compare date columns with appropriate date values.",
        "Compare text columns with text values.",
        "Avoid unnecessary implicit conversions."
      ]
    },

    {
      id: "case-insensitive",
      title: "26. Case Sensitivity and Collation",
      paragraphs: [
        "String comparisons can behave differently depending on the database and collation configuration.",
        "For example, whether 'IT' and 'it' are considered equal is not something you should assume universally across all database systems.",
        "MySQL commonly uses collations that may be case-insensitive, while PostgreSQL text comparison is generally case-sensitive unless you use an appropriate operator, collation, or expression."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'IT';`
      },

      bullets: [
        "Do not assume string comparison behavior is identical across databases.",
        "Understand the collation configuration of your database.",
        "For portable applications, explicitly handle case-insensitive requirements when necessary."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "27. Comparison Operators in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA frequently translates repository method names into SQL conditions.",
        "For example, a method such as findBySalaryGreaterThanEqual represents a salary >= condition.",
        "This allows Java applications to express common filtering operations without writing SQL manually."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findBySalaryGreaterThanEqual(BigDecimal salary);

    List<Employee> findBySalaryLessThan(BigDecimal salary);

    List<Employee> findByDepartmentNot(String department);
}`
      },

      bullets: [
        "GreaterThan represents >.",
        "GreaterThanEqual represents >=.",
        "LessThan represents <.",
        "LessThanEqual represents <=.",
        "Not represents a not-equal style condition.",
        "The exact generated SQL depends on the JPA provider and database."
      ]
    },

    {
      id: "jpql-comparison",
      title: "28. Comparison Operators in JPQL",
      paragraphs: [
        "JPQL also supports comparison operators such as =, <>, >, <, >=, and <=.",
        "Unlike SQL, JPQL queries operate on entity names and entity properties rather than directly on database table and column names."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE e.salary >= :minimumSalary
""")
List<Employee> findEmployeesWithMinimumSalary(
        @Param("minimumSalary") BigDecimal minimumSalary
);`
      },

      bullets: [
        "Employee is the entity name.",
        "salary is the Java entity property.",
        ":minimumSalary is a named parameter.",
        "The JPA provider translates the JPQL into SQL."
      ]
    },

    {
      id: "parameterized-comparison",
      title: "29. Parameterized Queries and Safe Filtering",
      paragraphs: [
        "When comparison values come from users, applications should use parameterized queries rather than concatenating user input into SQL strings.",
        "Parameterized queries help prevent SQL injection and allow the database or framework to handle values correctly."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE e.salary >= :salary
""")
List<Employee> findByMinimumSalary(
        @Param("salary") BigDecimal salary
);`
      },

      bullets: [
        "Do not concatenate untrusted input into SQL.",
        "Use Spring Data parameters, JPQL parameters, JDBC PreparedStatement, or another parameterized mechanism.",
        "Input validation is useful but should not replace parameterization."
      ]
    },

    {
      id: "real-world-example",
      title: "30. Real-World Employee Filtering Example",
      paragraphs: [
        "Suppose a company wants to find experienced employees who earn at least 60000 and belong to either IT or Engineering.",
        "The query can combine equality, greater-than-or-equal, AND, and OR conditions."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
WHERE salary >= 60000
  AND (department = 'IT' OR department = 'Engineering');`
      }
    },

    {
      id: "common-mistakes",
      title: "31. Common Mistakes",
      paragraphs: [
        "Comparison operators are simple, but small mistakes can produce incorrect results or affect many rows."
      ],

      bullets: [
        "Using = NULL instead of IS NULL.",
        "Using > when the business requirement actually needs >=.",
        "Forgetting parentheses when combining AND and OR.",
        "Comparing values using inappropriate data types.",
        "Forgetting that NULL rows do not satisfy normal comparisons.",
        "Assuming string comparison is case-insensitive in every database.",
        "Using UPDATE or DELETE with an incorrect WHERE condition.",
        "Concatenating user input directly into SQL queries.",
        "Using <> and expecting NULL values to be returned as not-equal rows.",
        "Not testing boundary values such as exactly 50000 when using > or >=."
      ]
    },

    {
      id: "update-delete-warning",
      title: "32. Be Careful with UPDATE and DELETE",
      paragraphs: [
        "Comparison operators are not limited to SELECT statements. They can also appear in UPDATE and DELETE statements.",
        "An incorrect comparison condition in UPDATE or DELETE can modify or remove many more rows than intended.",
        "Always verify the WHERE condition before executing destructive statements."
      ],

      code: {
        language: "sql",
        code: `UPDATE employees
SET salary = salary + 5000
WHERE salary >= 50000;

DELETE FROM employees
WHERE salary < 30000;`
      },

      bullets: [
        "Test the WHERE condition using SELECT first.",
        "Use transactions when appropriate for important data changes.",
        "Be especially careful with missing WHERE clauses.",
        "Review affected-row counts before committing critical changes."
      ]
    },

    {
      id: "debugging-filters",
      title: "33. How to Debug an Incorrect Filter",
      paragraphs: [
        "If a query returns unexpected rows, first simplify the WHERE condition.",
        "Check one comparison at a time, verify the actual stored values, and then combine the conditions again.",
        "This is particularly useful when AND, OR, NULL, or boundary values are involved."
      ],

      code: {
        language: "sql",
        code: `-- Step 1
SELECT *
FROM employees
WHERE salary >= 50000;

-- Step 2
SELECT *
FROM employees
WHERE salary >= 50000
  AND department = 'IT';

-- Step 3
SELECT *
FROM employees
WHERE salary >= 50000
  AND (department = 'IT' OR department = 'HR');`
      }
    },

    {
      id: "practice",
      title: "34. Practice Problems",
      paragraphs: [
        "Practice comparison operators by writing queries against an employees table containing employee_id, employee_name, department, salary, age, and joining_date."
      ],

      bullets: [
        "Find employees whose salary is greater than 60000.",
        "Find employees whose salary is less than or equal to 40000.",
        "Find employees whose department is not HR.",
        "Find employees whose age is greater than or equal to 25.",
        "Find employees whose salary is exactly 50000.",
        "Find employees whose salary is between 50000 and 80000.",
        "Find employees whose department is IT or HR.",
        "Find employees whose salary is at least 60000 and department is IT.",
        "Find employees whose salary is NULL.",
        "Find employees whose salary is not NULL.",
        "Find employees who joined on or after 2025-01-01.",
        "Find employees whose salary is greater than 50000 or whose experience is at least 5 years."
      ]
    },

    {
      id: "practice-solutions",
      title: "35. Practice Solutions",
      code: {
        language: "sql",
        code: `-- 1. Salary greater than 60000
SELECT *
FROM employees
WHERE salary > 60000;

-- 2. Salary less than or equal to 40000
SELECT *
FROM employees
WHERE salary <= 40000;

-- 3. Department is not HR
SELECT *
FROM employees
WHERE department <> 'HR';

-- 4. Age greater than or equal to 25
SELECT *
FROM employees
WHERE age >= 25;

-- 5. Salary exactly 50000
SELECT *
FROM employees
WHERE salary = 50000;

-- 6. Salary between 50000 and 80000
SELECT *
FROM employees
WHERE salary >= 50000
  AND salary <= 80000;

-- 7. Department is IT or HR
SELECT *
FROM employees
WHERE department = 'IT'
   OR department = 'HR';

-- 8. Salary at least 60000 and department is IT
SELECT *
FROM employees
WHERE salary >= 60000
  AND department = 'IT';

-- 9. Salary is NULL
SELECT *
FROM employees
WHERE salary IS NULL;

-- 10. Salary is not NULL
SELECT *
FROM employees
WHERE salary IS NOT NULL;

-- 11. Joined on or after 2025-01-01
SELECT *
FROM employees
WHERE joining_date >= '2025-01-01';`
      }
    },

    {
      id: "scenario-interview",
      title: "36. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You need employees with salary 50000 or more. Which operator should you use?",
          answer:
            "Use >= because the requirement includes employees whose salary is exactly 50000 as well as employees earning more."
        },
        {
          question:
            "You need employees earning more than 50000, excluding exactly 50000. Which operator should you use?",
          answer:
            "Use > because it excludes the boundary value 50000."
        },
        {
          question:
            "You need employees whose department is not HR. Which operator can you use?",
          answer:
            "Use <> 'HR'. Many databases also support !=, but <> is the standard SQL not-equal operator."
        },
        {
          question:
            "A query using WHERE salary = NULL returns no rows. Why?",
          answer:
            "NULL represents an unknown or missing value and normal equality comparison does not test for NULL. Use IS NULL instead."
        },
        {
          question:
            "How would you find employees earning between 50000 and 80000 inclusive?",
          answer:
            "Use salary >= 50000 AND salary <= 80000, or the more concise salary BETWEEN 50000 AND 80000."
        },
        {
          question:
            "How would you filter employees from IT whose salary is at least 60000?",
          answer:
            "Use WHERE department = 'IT' AND salary >= 60000."
        },
        {
          question:
            "Why should parentheses be used with AND and OR?",
          answer:
            "Parentheses make the intended logical grouping explicit and prevent misunderstandings caused by operator precedence."
        },
        {
          question:
            "Can comparison operators be used with dates?",
          answer:
            "Yes. Operators such as =, >, <, >=, and <= can be used with date and timestamp values."
        }
      ]
    },

    {
      id: "interview",
      title: "37. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What are SQL comparison operators?",
          answer:
            "SQL comparison operators compare values and include =, <>, >, <, >=, and <=. They are commonly used in WHERE and HAVING conditions."
        },
        {
          question: "What is the difference between = and <>?",
          answer:
            "= checks whether two values are equal, while <> checks whether two values are different."
        },
        {
          question: "What does > mean?",
          answer:
            "The > operator checks whether the left value is strictly greater than the right value."
        },
        {
          question: "What does < mean?",
          answer:
            "The < operator checks whether the left value is strictly less than the right value."
        },
        {
          question: "What does >= mean?",
          answer:
            "It means greater than or equal to and includes the boundary value."
        },
        {
          question: "What does <= mean?",
          answer:
            "It means less than or equal to and includes the boundary value."
        },
        {
          question: "What is the difference between > and >=?",
          answer:
            "> excludes the boundary value, while >= includes it."
        },
        {
          question: "What is the difference between < and <=?",
          answer:
            "< excludes the boundary value, while <= includes it."
        },
        {
          question: "Can we use = NULL in SQL?",
          answer:
            "No. Use IS NULL to test whether a column contains NULL."
        },
        {
          question: "Why does salary = NULL not work?",
          answer:
            "NULL represents an unknown value, so normal equality comparison with NULL results in UNKNOWN rather than TRUE."
        },
        {
          question: "How do you check for non-NULL values?",
          answer:
            "Use IS NOT NULL."
        },
        {
          question: "Is != valid SQL?",
          answer:
            "Many database systems support != as a not-equal operator, but <> is the standard SQL operator."
        },
        {
          question: "Can comparison operators be used with strings?",
          answer:
            "Yes. For example, department = 'IT' compares a string value. String comparison behavior can depend on the database and collation."
        },
        {
          question: "Can comparison operators be used with dates?",
          answer:
            "Yes. Date and timestamp columns can be compared using operators such as >=, <=, >, and <."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters rows before grouping, while HAVING filters groups after GROUP BY and is commonly used with aggregate conditions."
        },
        {
          question: "How do you combine multiple comparison conditions?",
          answer:
            "Use logical operators such as AND, OR, and NOT. Parentheses should be used when the intended grouping needs to be explicit."
        },
        {
          question: "What is the difference between BETWEEN and >= <=?",
          answer:
            "BETWEEN provides a concise range condition and normally includes both boundary values. For example, salary BETWEEN 50000 AND 80000 is equivalent to salary >= 50000 AND salary <= 80000."
        },
        {
          question: "How are comparison operators used in Spring Data JPA?",
          answer:
            "Spring Data JPA supports derived query keywords such as GreaterThan, GreaterThanEqual, LessThan, LessThanEqual, and Not, which represent corresponding filtering conditions."
        },
        {
          question: "How are comparison operators used in JPQL?",
          answer:
            "JPQL supports operators such as =, <>, >, <, >=, and <= while querying entity properties rather than directly querying database table columns."
        },
        {
          question: "What is the most common mistake when using SQL comparison operators?",
          answer:
            "Common mistakes include using = NULL instead of IS NULL, confusing > with >=, forgetting parentheses around complex conditions, and using unsafe string concatenation for user input."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "38. Quick Reference",
      bullets: [
        "= → Equal to",
        "<> → Not equal to",
        "> → Greater than",
        "< → Less than",
        ">= → Greater than or equal to",
        "<= → Less than or equal to",
        "IS NULL → Checks for NULL",
        "IS NOT NULL → Checks for non-NULL",
        "BETWEEN → Inclusive range check",
        "IN → Matches one value from a list",
        "LIKE → Pattern matching",
        "AND → All conditions must be true",
        "OR → At least one condition must be true",
        "NOT → Reverses a condition"
      ]
    },

    {
      id: "one-minute-answer",
      title: "39. One-Minute Interview Answer",
      paragraphs: [
        "SQL comparison operators are used to compare values and filter data. The main operators are = for equality, <> for inequality, > for greater than, < for less than, >= for greater than or equal to, and <= for less than or equal to.",
        "They are commonly used with WHERE and HAVING conditions. For example, WHERE salary >= 50000 returns employees whose salary is at least 50000.",
        "One important point is that NULL should not be compared using = or <>. We use IS NULL or IS NOT NULL because NULL represents an unknown or missing value.",
        "In real applications, comparison operators are used for filtering data by salary, age, dates, status, prices, and other business conditions. Spring Data JPA and JPQL also provide ways to express these comparisons."
      ]
    },

    {
      id: "revision-notes",
      title: "40. Revision Notes",
      bullets: [
        "Comparison operators compare two values.",
        "= checks equality.",
        "<> checks inequality.",
        "> checks strictly greater than.",
        "< checks strictly less than.",
        ">= includes the boundary value.",
        "<= includes the boundary value.",
        "Use IS NULL instead of = NULL.",
        "Use IS NOT NULL to find non-NULL values.",
        "Use AND when all conditions must be satisfied.",
        "Use OR when at least one condition can be satisfied.",
        "Use parentheses for complex AND/OR logic.",
        "BETWEEN normally includes both boundaries.",
        "IN is useful for matching one of several exact values.",
        "LIKE is used for pattern matching.",
        "WHERE filters rows.",
        "HAVING filters groups.",
        "Comparison operators can be used with numbers, strings, dates, and other compatible values.",
        "Be careful with UPDATE and DELETE conditions.",
        "Use parameterized queries for values supplied by users.",
        "Spring Data JPA provides derived query keywords for common comparison operations."
      ]
    }
  ]
};
