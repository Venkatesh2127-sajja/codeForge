
export const whereClause = {
  id: 2015,
  title: "WHERE Clause",
  slug: "where-clause",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn how WHERE filters rows according to conditions, how to combine conditions, handle NULL values, use comparison operators, and write practical filtering queries.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "where",
      title: "1. What Is WHERE?",
      paragraphs: [
        "The WHERE clause filters rows before they appear in the result.",
        "Only rows for which the WHERE condition evaluates to TRUE are returned.",
        "WHERE is one of the most important clauses in SQL because it allows an application to retrieve only the rows it actually needs."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "where-flow",
      title: "2. How WHERE Works",

      paragraphs: [
        "The database reads rows from the query source and evaluates the WHERE condition for each row.",
        "Rows that satisfy the condition are eligible for the result.",
        "Rows that do not satisfy the condition are excluded."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'Engineering';`
      },

      bullets: [
        "FROM identifies the source table.",
        "WHERE applies the filtering condition.",
        "SELECT determines which expressions appear in the result.",
        "Only rows satisfying the condition are returned."
      ]
    },

    {
      id: "text-filter",
      title: "3. Filtering Text",

      paragraphs: [
        "WHERE can compare text values using operators such as = and <>.",
        "Text values are commonly written inside single quotes.",
        "The comparison behavior for text can depend on database collation and configuration."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'Engineering';`
      },

      bullets: [
        "Text values are commonly written inside single quotes.",
        "The comparison behavior for text can depend on database collation and configuration.",
        "Use the exact comparison rules of your database system."
      ]
    },

    {
      id: "numeric-filter",
      title: "4. Filtering Numbers",

      paragraphs: [
        "Numeric columns can be filtered using comparison operators such as >, <, >=, <=, =, and <>."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 60000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "where-vs-select",
      title: "5. SELECT vs WHERE",

      paragraphs: [
        "SELECT determines which expressions appear in the result.",
        "WHERE determines which rows qualify for the result.",
        "This distinction is fundamental for understanding SQL queries."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;`
      },

      bullets: [
        "SELECT → columns and expressions.",
        "WHERE → row filtering.",
        "SELECT does not decide which rows qualify.",
        "WHERE does not decide which columns are displayed."
      ]
    },

    {
      id: "comparison-operators",
      title: "6. Comparison Operators",

      paragraphs: [
        "WHERE commonly uses comparison operators to determine whether a row satisfies a condition."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE salary > 50000;

SELECT *
FROM employees
WHERE salary >= 50000;

SELECT *
FROM employees
WHERE salary < 70000;

SELECT *
FROM employees
WHERE salary <= 70000;

SELECT *
FROM employees
WHERE department = 'HR';

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
      id: "equal-operator",
      title: "7. Using the Equal Operator",

      paragraphs: [
        "The = operator checks whether two values are equal.",
        "It is commonly used for exact filtering conditions."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR';`
      },

      output: `employee_name | department
--------------+-----------
Priya         | HR`
    },

    {
      id: "not-equal",
      title: "8. Using the Not-Equal Operator",

      paragraphs: [
        "The <> operator is the standard SQL not-equal comparison operator.",
        "Many databases also support !=, but <> is the portable SQL form."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department <> 'HR';`
      },

      bullets: [
        "<> means not equal.",
        "Some databases also support !=.",
        "Check the syntax supported by your target database."
      ]
    },

    {
      id: "and-condition",
      title: "9. Combining Conditions with AND",

      paragraphs: [
        "AND allows multiple conditions to be combined.",
        "A row must satisfy all required AND conditions for the overall condition to be TRUE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },

      bullets: [
        "The employee must belong to Engineering.",
        "The employee must also have salary greater than or equal to 60000.",
        "Both conditions must be satisfied."
      ]
    },

    {
      id: "or-condition",
      title: "10. Combining Conditions with OR",

      paragraphs: [
        "OR returns a row when at least one of the specified conditions is TRUE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';`
      },

      bullets: [
        "The row can match HR.",
        "Or the row can match Finance.",
        "Only one condition needs to be TRUE."
      ]
    },

    {
      id: "and-or",
      title: "11. Combining AND and OR",

      paragraphs: [
        "When AND and OR appear together, use parentheses when you want the intended logic to be obvious.",
        "Parentheses reduce ambiguity and make complex conditions easier to maintain."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND (salary >= 60000 OR employee_name = 'Ravi');`
      },

      bullets: [
        "Parentheses explicitly group the OR condition.",
        "The employee must be in Engineering.",
        "Within that group, salary can be at least 60000 or the employee can be Ravi."
      ]
    },

    {
      id: "not-condition",
      title: "12. Using NOT",

      paragraphs: [
        "NOT reverses the truth value of a condition.",
        "It can be used when you want to exclude rows matching a particular condition."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE NOT department = 'HR';`
      },

      bullets: [
        "NOT department = 'HR' means the department is not HR.",
        "For simple comparisons, <> is often easier to read.",
        "NOT becomes particularly useful with more complex conditions."
      ]
    },

    {
      id: "between",
      title: "13. Filtering with BETWEEN",

      paragraphs: [
        "BETWEEN is used to test whether a value falls within a range.",
        "For numeric values, BETWEEN is inclusive of both boundary values."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 70000;`
      },

      bullets: [
        "50000 is included.",
        "70000 is included.",
        "Values between the two boundaries are included."
      ]
    },

    {
      id: "in",
      title: "14. Filtering with IN",

      paragraphs: [
        "IN is useful when a column should match one value from a list of possible values.",
        "It can make multiple OR conditions shorter and easier to read."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'HR');`
      },

      bullets: [
        "IN checks whether the value matches one of the listed values.",
        "It is often clearer than writing multiple OR comparisons.",
        "The list can contain multiple values."
      ]
    },

    {
      id: "not-in",
      title: "15. Filtering with NOT IN",

      paragraphs: [
        "NOT IN excludes rows whose value matches any value in the specified list.",
        "Be careful when NULL values are involved because SQL's three-valued logic can produce unexpected results."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department NOT IN ('HR', 'Finance');`
      },

      bullets: [
        "Rows belonging to HR are excluded.",
        "Rows belonging to Finance are excluded.",
        "Other matching values are returned.",
        "NULL behavior requires special attention."
      ]
    },

    {
      id: "like",
      title: "16. Filtering Text with LIKE",

      paragraphs: [
        "LIKE is used for pattern-based text matching.",
        "The percent sign (%) commonly represents zero or more characters, while underscore (_) represents a single character."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE 'R%';`
      },

      output: `employee_name
-------------
Ravi`
    },

    {
      id: "like-patterns",
      title: "17. Common LIKE Patterns",

      code: {
        language: "sql",
        code: `-- Starts with R
SELECT *
FROM employees
WHERE employee_name LIKE 'R%';

-- Ends with i
SELECT *
FROM employees
WHERE employee_name LIKE '%i';

-- Contains av
SELECT *
FROM employees
WHERE employee_name LIKE '%av%';

-- Exactly four characters
SELECT *
FROM employees
WHERE employee_name LIKE '____';`
      },

      bullets: [
        "R% → starts with R.",
        "%i → ends with i.",
        "%av% → contains av.",
        "____ → exactly four characters using four underscore wildcards."
      ]
    },

    {
      id: "null-filter",
      title: "18. Filtering NULL Values",

      paragraphs: [
        "NULL cannot be compared using the normal equality operator.",
        "Use IS NULL to find NULL values and IS NOT NULL to find non-NULL values."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IS NULL;

SELECT employee_name, department
FROM employees
WHERE department IS NOT NULL;`
      },

      bullets: [
        "Use IS NULL for NULL values.",
        "Use IS NOT NULL for non-NULL values.",
        "Do not use department = NULL.",
        "NULL represents missing or unknown information rather than an ordinary value."
      ]
    },

    {
      id: "null-comparison",
      title: "19. Why = NULL Does Not Work",

      paragraphs: [
        "SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN.",
        "A comparison with NULL using = does not produce TRUE because NULL represents an unknown value."
      ],

      code: {
        language: "sql",
        code: `-- Incorrect
SELECT *
FROM employees
WHERE department = NULL;

-- Correct
SELECT *
FROM employees
WHERE department IS NULL;`
      },

      bullets: [
        "Do not use = NULL.",
        "Use IS NULL.",
        "Use IS NOT NULL when looking for non-NULL values."
      ]
    },

    {
      id: "where-order-by",
      title: "20. WHERE with ORDER BY",

      paragraphs: [
        "WHERE can be combined with ORDER BY.",
        "WHERE determines which rows qualify, while ORDER BY determines the order of the returned rows."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },

      bullets: [
        "WHERE filters the employees.",
        "ORDER BY sorts the matching employees.",
        "DESC sorts from highest to lowest.",
        "ASC sorts from lowest to highest."
      ]
    },

    {
      id: "where-limit",
      title: "21. WHERE with LIMIT",

      paragraphs: [
        "WHERE can be combined with LIMIT when you want only a limited number of matching rows.",
        "LIMIT syntax is database-specific; MySQL and PostgreSQL support it."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC
LIMIT 2;`
      },

      bullets: [
        "WHERE filters the rows.",
        "ORDER BY determines which matching rows come first.",
        "LIMIT restricts the number of rows returned."
      ]
    },

    {
      id: "where-distinct",
      title: "22. WHERE with DISTINCT",

      paragraphs: [
        "WHERE can be combined with DISTINCT.",
        "WHERE first restricts the qualifying rows, and DISTINCT removes duplicate result combinations."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
WHERE salary >= 50000;`
      },

      bullets: [
        "WHERE controls which employees qualify.",
        "DISTINCT removes duplicate department values.",
        "The final result contains unique departments among the matching employees."
      ]
    },

    {
      id: "where-aggregate",
      title: "23. WHERE with Aggregate Queries",

      paragraphs: [
        "WHERE can filter rows before an aggregate calculation is performed.",
        "This is different from HAVING, which filters groups after GROUP BY."
      ],

      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS average_salary
FROM employees
WHERE department = 'Engineering';`
      },

      bullets: [
        "WHERE selects Engineering employees.",
        "AVG calculates the average salary of the filtered rows.",
        "WHERE operates at the row-filtering stage."
      ]
    },

    {
      id: "where-vs-having",
      title: "24. WHERE vs HAVING",

      paragraphs: [
        "WHERE filters individual rows before grouping.",
        "HAVING filters groups after GROUP BY.",
        "This distinction is a very common SQL interview question."
      ],

      code: {
        language: "sql",
        code: `-- WHERE filters rows
SELECT department, AVG(salary) AS average_salary
FROM employees
WHERE salary >= 50000
GROUP BY department;

-- HAVING filters groups
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 50000;`
      },

      bullets: [
        "WHERE → filters rows.",
        "GROUP BY → creates groups.",
        "HAVING → filters groups.",
        "WHERE is generally evaluated before grouping."
      ]
    },

    {
      id: "where-subquery",
      title: "25. WHERE with a Subquery",

      paragraphs: [
        "A WHERE condition can use the result of a subquery.",
        "This is useful when the filtering value must be calculated dynamically."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`
      },

      bullets: [
        "The subquery calculates the average salary.",
        "The outer query returns employees earning above that average.",
        "The filtering value does not need to be hard-coded."
      ]
    },

    {
      id: "logical-order",
      title: "26. WHERE in SQL Query Processing",

      paragraphs: [
        "For a typical SELECT query, SQL is conceptually processed in a logical order rather than simply from top to bottom.",
        "FROM identifies the source, WHERE filters rows, GROUP BY forms groups, HAVING filters groups, SELECT produces the requested expressions, and ORDER BY sorts the final result."
      ],

      code: {
        language: "sql",
        code: `SELECT department, AVG(salary) AS average_salary
FROM employees
WHERE salary >= 40000
GROUP BY department
HAVING AVG(salary) >= 50000
ORDER BY average_salary DESC;`
      },

      bullets: [
        "FROM → identify source rows.",
        "WHERE → filter rows.",
        "GROUP BY → create groups.",
        "HAVING → filter groups.",
        "SELECT → produce result expressions.",
        "ORDER BY → sort the result."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "27. WHERE Filtering with Spring Data JPA",

      paragraphs: [
        "In Spring Data JPA, many WHERE conditions can be expressed through derived repository methods.",
        "The repository abstraction generates the appropriate query based on the method name."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(String department);

    List<Employee> findBySalaryGreaterThanEqual(
        BigDecimal salary
    );
}`
      },

      bullets: [
        "findByDepartment represents a filtering condition on department.",
        "findBySalaryGreaterThanEqual represents a numeric comparison.",
        "The persistence provider generates the SQL.",
        "Understanding WHERE helps you understand the SQL generated by JPA."
      ]
    },

    {
      id: "spring-query",
      title: "28. WHERE with JPQL",

      paragraphs: [
        "JPQL also provides a WHERE clause.",
        "JPQL uses entity names and entity property names rather than directly using database table and column names."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE e.department = :department
    """)
List<Employee> findByDepartment(
    @Param("department") String department
);`
      },

      bullets: [
        "Employee is the entity name.",
        "department is the entity property.",
        ":department is a named parameter.",
        "The persistence provider converts the JPQL into SQL."
      ]
    },

    {
      id: "parameterized-query",
      title: "29. Safe WHERE Conditions and Parameters",

      paragraphs: [
        "Application code should not build SQL by concatenating untrusted user input.",
        "Parameterized queries allow the database driver or persistence framework to bind values safely."
      ],

      code: {
        language: "java",
        code: `String sql =
    "SELECT employee_name, salary " +
    "FROM employees " +
    "WHERE department = ?";

PreparedStatement statement =
    connection.prepareStatement(sql);

statement.setString(1, department);`
      },

      bullets: [
        "Use parameters instead of concatenating user input into SQL.",
        "Prepared statements help prevent SQL injection.",
        "Spring Data JPA and JPQL parameters provide safer query construction.",
        "Never trust client-provided values simply because they came from a UI."
      ]
    },

    {
      id: "real-world-example",
      title: "30. Real-World WHERE Example",

      paragraphs: [
        "Imagine an employee management application where a manager wants to find Engineering employees earning at least 60000.",
        "The SQL query can combine text and numeric conditions."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    department,
    salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000
ORDER BY salary DESC;`
      },

      bullets: [
        "department = 'Engineering' filters by department.",
        "salary >= 60000 filters by salary.",
        "AND requires both conditions.",
        "ORDER BY displays the highest salary first."
      ]
    },

    {
      id: "common-mistakes",
      title: "31. Common WHERE Mistakes",

      bullets: [
        "Forgetting the WHERE clause when filtering is required.",
        "Using = NULL instead of IS NULL.",
        "Using incorrect comparison operators.",
        "Forgetting quotes around text values.",
        "Using AND when OR was required.",
        "Using OR when all conditions should be satisfied.",
        "Forgetting parentheses in complex AND/OR conditions.",
        "Using WHERE when HAVING is required for aggregate groups.",
        "Building SQL using unsafe string concatenation.",
        "Forgetting that NULL produces UNKNOWN in ordinary comparisons.",
        "Assuming text comparison behavior is identical across all database collations.",
        "Running UPDATE or DELETE without a proper WHERE condition."
      ]
    },

    {
      id: "update-delete-warning",
      title: "32. WHERE with UPDATE and DELETE",

      paragraphs: [
        "WHERE is not limited to SELECT statements.",
        "It is also extremely important in UPDATE and DELETE statements because it determines which rows are modified or removed.",
        "Forgetting WHERE in an UPDATE or DELETE can affect every row in the table."
      ],

      code: {
        language: "sql",
        code: `-- Update only Engineering employees
UPDATE employees
SET salary = salary + 5000
WHERE department = 'Engineering';

-- Delete only a specific employee
DELETE FROM employees
WHERE employee_id = 10;`
      },

      bullets: [
        "Always verify the WHERE condition before UPDATE.",
        "Always verify the WHERE condition before DELETE.",
        "Run a SELECT with the same WHERE condition first when working with important data.",
        "Transactions and backups provide additional protection, but they do not replace careful query construction."
      ]
    },

    {
      id: "practical-exercises",
      title: "33. Practical Exercises",

      paragraphs: [
        "Try these exercises using the employees table before checking the solutions."
      ],

      bullets: [
        "Find employees earning more than 50000.",
        "Find employees earning at least 60000.",
        "Find employees from Engineering.",
        "Find employees who are not in HR.",
        "Find employees from Engineering or Finance.",
        "Find employees whose salary is between 50000 and 70000.",
        "Find employees whose department is Engineering or HR using IN.",
        "Find employee names beginning with R.",
        "Find employees where department is NULL.",
        "Find employees whose department is not NULL.",
        "Find Engineering employees earning at least 60000.",
        "Find employees earning more than the average salary."
      ],

      code: {
        language: "sql",
        code: `-- 1
SELECT *
FROM employees
WHERE salary > 50000;

-- 2
SELECT *
FROM employees
WHERE salary >= 60000;

-- 3
SELECT *
FROM employees
WHERE department = 'Engineering';

-- 4
SELECT *
FROM employees
WHERE department <> 'HR';

-- 5
SELECT *
FROM employees
WHERE department = 'Engineering'
   OR department = 'Finance';

-- 6
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 70000;

-- 7
SELECT *
FROM employees
WHERE department IN ('Engineering', 'HR');

-- 8
SELECT *
FROM employees
WHERE employee_name LIKE 'R%';

-- 9
SELECT *
FROM employees
WHERE department IS NULL;

-- 10
SELECT *
FROM employees
WHERE department IS NOT NULL;

-- 11
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- 12
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`
      }
    },

    {
      id: "debugging",
      title: "34. Debugging WHERE Conditions",

      paragraphs: [
        "When a WHERE query returns unexpected rows, simplify the condition and test each part separately.",
        "This is especially useful when multiple AND, OR, NOT, NULL, or comparison conditions are involved."
      ],

      code: {
        language: "sql",
        code: `-- Step 1
SELECT *
FROM employees;

-- Step 2
SELECT *
FROM employees
WHERE department = 'Engineering';

-- Step 3
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- Step 4
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND (salary >= 60000 OR employee_name = 'Ravi');`
      },

      bullets: [
        "Start with the table without filtering.",
        "Add one condition at a time.",
        "Check the result after every change.",
        "Use parentheses for complex conditions.",
        "Check NULL values separately using IS NULL or IS NOT NULL."
      ]
    },

    {
      id: "scenario-interview",
      title: "35. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An API should return employees earning more than 50000. What SQL would you write?",
          answer:
            "I would use SELECT employee_name, salary FROM employees WHERE salary > 50000."
        },
        {
          question:
            "How would you find employees from Engineering or HR?",
          answer:
            "I could use WHERE department IN ('Engineering', 'HR'), which is cleaner than writing multiple OR conditions."
        },
        {
          question:
            "How would you find employees whose salary is between 50000 and 70000?",
          answer:
            "I would use WHERE salary BETWEEN 50000 AND 70000. BETWEEN is inclusive of both boundaries."
        },
        {
          question:
            "How do you check whether a department is NULL?",
          answer:
            "I would use WHERE department IS NULL, not WHERE department = NULL."
        },
        {
          question:
            "An SQL query returns too many rows after adding OR. What would you check?",
          answer:
            "I would check the logical condition and use parentheses where necessary to make the intended AND/OR grouping explicit."
        },
        {
          question:
            "What happens if WHERE is missing from DELETE?",
          answer:
            "The DELETE can affect all rows in the target table, depending on the statement and database rules."
        },
        {
          question:
            "What happens if WHERE is missing from UPDATE?",
          answer:
            "The UPDATE can modify every row in the target table."
        },
        {
          question:
            "Why should application SQL use parameters?",
          answer:
            "Parameterized queries help safely bind input values and reduce SQL injection risk compared with string concatenation."
        }
      ]
    },

    {
      id: "interview",
      title: "36. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is the WHERE clause?",
          answer:
            "WHERE filters rows according to a condition. Only rows for which the condition evaluates to TRUE are returned."
        },
        {
          question: "Can WHERE filter text values?",
          answer:
            "Yes. For example, WHERE department = 'Engineering' filters rows whose department matches that value according to the database's comparison rules."
        },
        {
          question: "Can WHERE filter numeric values?",
          answer:
            "Yes. Numeric columns can be compared using operators such as >, <, >=, <=, =, and <>."
        },
        {
          question: "What is the difference between SELECT and WHERE?",
          answer:
            "SELECT controls the result expressions, while WHERE controls which rows qualify."
        },
        {
          question: "What happens if WHERE is omitted?",
          answer:
            "Unless another construct limits the rows, the query can return every row from its source."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY."
        },
        {
          question: "How do you check for NULL?",
          answer:
            "Use IS NULL or IS NOT NULL. Do not use = NULL."
        },
        {
          question: "What is the purpose of AND?",
          answer:
            "AND requires all combined conditions to be TRUE for the overall condition to be TRUE."
        },
        {
          question: "What is the purpose of OR?",
          answer:
            "OR makes the condition TRUE when at least one of its conditions is TRUE."
        },
        {
          question: "Why are parentheses useful with AND and OR?",
          answer:
            "Parentheses make the intended logical grouping explicit and help prevent incorrect filtering logic."
        },
        {
          question: "What is BETWEEN?",
          answer:
            "BETWEEN checks whether a value falls within a range and is inclusive of both boundaries."
        },
        {
          question: "What is IN?",
          answer:
            "IN checks whether a value matches one of the values in a specified list."
        },
        {
          question: "What is LIKE?",
          answer:
            "LIKE performs pattern-based text matching using wildcard characters such as % and _."
        },
        {
          question: "Can WHERE be used with UPDATE and DELETE?",
          answer:
            "Yes. WHERE determines which rows are modified by UPDATE or removed by DELETE."
        },
        {
          question: "Why is missing WHERE dangerous in UPDATE or DELETE?",
          answer:
            "Without an appropriate WHERE condition, the statement can affect every row in the target table."
        },
        {
          question: "Can WHERE use a subquery?",
          answer:
            "Yes. A subquery can provide a value or set of values used by the WHERE condition."
        },
        {
          question: "How does WHERE relate to SQL injection?",
          answer:
            "If user input is concatenated directly into a SQL WHERE condition, it can create SQL injection risk. Parameterized queries should be used instead."
        },
        {
          question: "Does WHERE filter columns or rows?",
          answer:
            "WHERE filters rows. SELECT determines which columns or expressions appear in the result."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "37. Quick Revision",

      bullets: [
        "WHERE → filters rows.",
        "SELECT → chooses result expressions.",
        "= → equal to.",
        "<> → not equal to.",
        "> → greater than.",
        "< → less than.",
        ">= → greater than or equal to.",
        "<= → less than or equal to.",
        "AND → all conditions must be TRUE.",
        "OR → at least one condition must be TRUE.",
        "NOT → reverses a condition.",
        "BETWEEN → checks an inclusive range.",
        "IN → checks a list of values.",
        "LIKE → pattern matching.",
        "IS NULL → checks for NULL.",
        "IS NOT NULL → checks for non-NULL.",
        "WHERE filters rows before GROUP BY.",
        "HAVING filters groups after GROUP BY.",
        "Always be careful with UPDATE and DELETE conditions.",
        "Use parameterized queries for user-provided values."
      ]
    },

    {
      id: "one-minute-answer",
      title: "38. One-Minute Interview Answer",

      paragraphs: [
        "The WHERE clause is used to filter rows in SQL. It evaluates a condition for each candidate row, and only rows for which the condition is TRUE are returned. We can use comparison operators such as =, >, <, >=, <=, and <>, and combine conditions using AND, OR, and NOT. SQL also provides BETWEEN for ranges, IN for lists, LIKE for pattern matching, and IS NULL for NULL checks. WHERE filters rows before grouping, while HAVING filters groups after GROUP BY. WHERE is also very important in UPDATE and DELETE because an incorrect or missing condition can modify or remove unintended rows. In application development, user-provided values should be passed through parameterized queries rather than unsafe string concatenation."
      ]
    },

    {
      id: "revision-notes",
      title: "39. Revision Notes",

      paragraphs: [
        "WHERE is used to filter rows according to a condition.",
        "Only rows whose condition evaluates to TRUE are returned.",
        "SELECT controls which columns or expressions appear in the result.",
        "Use comparison operators for numeric and text filtering.",
        "Use AND when all conditions must be satisfied.",
        "Use OR when at least one condition can be satisfied.",
        "Use parentheses when combining complex AND and OR logic.",
        "Use BETWEEN for inclusive ranges.",
        "Use IN for a list of possible values.",
        "Use LIKE for pattern matching.",
        "Use IS NULL and IS NOT NULL for NULL checks.",
        "WHERE filters rows before GROUP BY.",
        "HAVING filters groups after GROUP BY.",
        "WHERE can be used with SELECT, UPDATE, and DELETE.",
        "Always verify WHERE conditions before UPDATE or DELETE.",
        "Use parameterized queries instead of concatenating untrusted input into SQL."
      ]
    }
  ]
};
