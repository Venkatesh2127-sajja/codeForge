
export const nullValues = {
  id: 2019,
  title: "NULL Values and IS NULL",
  slug: "null-values",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Understand NULL, missing values, IS NULL, IS NOT NULL, SQL three-valued logic, NULL-safe filtering, COALESCE, aggregates, joins, and NULL handling in Spring Boot applications.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "null",
      title: "1. What Is NULL?",
      paragraphs: [
        "NULL represents an unknown, missing, or inapplicable value. It is not the same as zero, false, or an empty string.",
        "NULL means that the database does not have a known value for that column in that row.",
        "For example, an employee may not have a department assigned yet. In that situation, the department column could contain NULL.",
        "Because NULL represents an absence of a known value, normal equality comparisons do not work as they do for ordinary values."
      ],

      bullets: [
        "NULL is not equal to zero.",
        "NULL is not an empty string.",
        "NULL is not FALSE.",
        "NULL does not mean the value is automatically unknown to the business; it means SQL has no known value stored for that column.",
        "NULL requires special SQL operators for testing.",
        "A nullable column can contain NULL unless constraints prevent it."
      ]
    },

    {
      id: "null-examples",
      title: "2. NULL vs Zero vs Empty String",
      paragraphs: [
        "It is important to distinguish NULL from other values that may appear to represent missing information.",
        "Zero is an actual numeric value. An empty string is a character value containing no characters. NULL represents the absence of a known value."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employee_example (
    employee_id INT,
    employee_name VARCHAR(100),
    salary DECIMAL(10, 2),
    notes VARCHAR(255)
);

INSERT INTO employee_example
(employee_id, employee_name, salary, notes)
VALUES
(1, 'Ravi', 50000, ''),
(2, 'Priya', 0, 'New employee'),
(3, 'Kiran', NULL, NULL);`
      },

      bullets: [
        "salary = 0 means the stored numeric value is zero.",
        "notes = '' means an empty string is stored.",
        "salary = NULL means no known salary value is stored.",
        "notes = NULL means no known notes value is stored."
      ]
    },

    {
      id: "null-operators",
      title: "3. Operators Used with NULL",
      paragraphs: [
        "SQL provides IS NULL and IS NOT NULL for checking whether an expression contains NULL.",
        "Do not use = NULL or <> NULL when you want to test for NULL."
      ],

      bullets: [
        "IS NULL → checks whether a value is NULL.",
        "IS NOT NULL → checks whether a value is not NULL.",
        "= NULL → does not correctly test for NULL.",
        "<> NULL → does not correctly test for non-NULL values."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE department IS NULL;

SELECT *
FROM employees
WHERE department IS NOT NULL;`
      }
    },

    {
      id: "is-null",
      title: "4. IS NULL",
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;`
      },

      paragraphs: [
        "IS NULL correctly identifies rows whose department value is NULL.",
        "It is the standard way to find rows where a nullable column has no stored value."
      ],

      output: `employee_name
-------------
Anu
`
    },

    {
      id: "is-not-null",
      title: "5. IS NOT NULL",
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NOT NULL;`
      },

      paragraphs: [
        "IS NOT NULL selects rows where the specified expression is not NULL.",
        "It is commonly used when an application requires a value to be present before processing a record."
      ]
    },

    {
      id: "null-comparison",
      title: "6. Why = NULL Does Not Work",
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

      paragraphs: [
        "A comparison with NULL generally produces UNKNOWN rather than TRUE.",
        "Since WHERE returns rows only when its condition is TRUE, the = NULL condition does not find NULL rows.",
        "This is one of the most common SQL mistakes and is frequently asked in interviews."
      ]
    },

    {
      id: "not-null-comparison",
      title: "7. Why <> NULL Does Not Work",
      paragraphs: [
        "The same rule applies to inequality. Writing department <> NULL does not correctly mean that department contains a value.",
        "Use IS NOT NULL when you want to find rows that contain a non-NULL value."
      ],

      code: {
        language: "sql",
        code: `-- Incorrect
SELECT *
FROM employees
WHERE department <> NULL;

-- Correct
SELECT *
FROM employees
WHERE department IS NOT NULL;`
      }
    },

    {
      id: "three-valued-logic",
      title: "8. SQL Three-Valued Logic",
      paragraphs: [
        "Normal Boolean logic has TRUE and FALSE, but SQL also has UNKNOWN.",
        "UNKNOWN commonly appears when an expression involves NULL and SQL cannot determine whether the comparison is true or false.",
        "For example, salary = 50000 is TRUE when salary is 50000, FALSE when salary is another known value, and UNKNOWN when salary is NULL."
      ],

      bullets: [
        "TRUE → condition is satisfied.",
        "FALSE → condition is not satisfied.",
        "UNKNOWN → SQL cannot determine the result because of an unknown value such as NULL.",
        "WHERE returns rows only when the final condition evaluates to TRUE."
      ]
    },

    {
      id: "null-and",
      title: "9. NULL with AND",
      paragraphs: [
        "When NULL produces UNKNOWN, combining that result with AND follows SQL's three-valued logic.",
        "UNKNOWN AND TRUE results in UNKNOWN, while UNKNOWN AND FALSE results in FALSE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE salary >= 50000
  AND bonus = 10000;`
      },

      bullets: [
        "If salary is NULL, salary >= 50000 becomes UNKNOWN.",
        "If bonus is NULL, bonus = 10000 becomes UNKNOWN.",
        "WHERE does not return rows when the final condition is UNKNOWN."
      ]
    },

    {
      id: "null-or",
      title: "10. NULL with OR",
      paragraphs: [
        "OR also follows three-valued logic.",
        "TRUE OR UNKNOWN is TRUE, while FALSE OR UNKNOWN is UNKNOWN."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'IT'
   OR bonus = 10000;`
      },

      bullets: [
        "If department = 'IT' is TRUE, the OR expression can be TRUE even if bonus is NULL.",
        "If both conditions are FALSE or UNKNOWN, the row does not qualify.",
        "Always consider NULL when designing complex filters."
      ]
    },

    {
      id: "null-not",
      title: "11. NULL with NOT",
      paragraphs: [
        "NOT reverses TRUE and FALSE, but NOT UNKNOWN remains UNKNOWN.",
        "Therefore, NOT cannot be used as a replacement for IS NOT NULL."
      ],

      code: {
        language: "sql",
        code: `-- This does not correctly mean "bonus is not NULL"
SELECT *
FROM employees
WHERE NOT bonus = NULL;

-- Correct
SELECT *
FROM employees
WHERE bonus IS NOT NULL;`
      }
    },

    {
      id: "coalesce-preview",
      title: "12. Handling NULL in Results",
      paragraphs: [
        "Functions such as COALESCE can be used to return the first non-NULL expression.",
        "This is useful when a query should display a fallback value instead of showing NULL to the user."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    COALESCE(department, 'Not Assigned') AS department
FROM employees;`
      },

      output: `employee_name | department
--------------+------------
Ravi          | Engineering
Priya         | HR
Kiran         | Engineering
Anu           | Not Assigned`
    },

    {
      id: "coalesce",
      title: "13. COALESCE in Detail",
      paragraphs: [
        "COALESCE returns the first non-NULL expression from its arguments.",
        "If the first expression is not NULL, SQL returns it. Otherwise, SQL checks the next expression and continues until a non-NULL value is found.",
        "If every expression is NULL, COALESCE returns NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    COALESCE(phone_number, email, 'No Contact') AS contact
FROM employees;`
      },

      bullets: [
        "COALESCE is useful for fallback values.",
        "It can accept multiple expressions.",
        "It returns the first non-NULL expression.",
        "It can be used in SELECT, ORDER BY, calculations, and other expressions."
      ]
    },

    {
      id: "nullif",
      title: "14. NULLIF",
      paragraphs: [
        "NULLIF returns NULL when its two expressions are equal. Otherwise, it returns the first expression.",
        "It is useful when a particular value should be treated as NULL, such as converting a zero denominator into NULL before a calculation."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    NULLIF(total_sales, 0) AS sales_value
FROM employees;`
      },

      bullets: [
        "NULLIF(a, b) returns NULL when a equals b.",
        "Otherwise it returns a.",
        "It is useful for avoiding certain divide-by-zero situations when combined with appropriate calculations."
      ]
    },

    {
      id: "coalesce-vs-nullif",
      title: "15. COALESCE vs NULLIF",
      paragraphs: [
        "COALESCE and NULLIF both deal with NULL but solve different problems.",
        "COALESCE provides a fallback when a value is NULL, while NULLIF converts a matching value into NULL."
      ],

      bullets: [
        "COALESCE → Replace or handle NULL using the first non-NULL value.",
        "NULLIF → Convert a specific matching value into NULL.",
        "COALESCE is commonly used for display and fallback values.",
        "NULLIF is commonly useful in calculations and data normalization."
      ],

      code: {
        language: "sql",
        code: `SELECT
    COALESCE(department, 'Not Assigned') AS department,
    NULLIF(salary, 0) AS salary
FROM employees;`
      }
    },

    {
      id: "null-aggregate",
      title: "16. NULL and Aggregate Functions",
      paragraphs: [
        "Many SQL aggregate functions ignore NULL values.",
        "For example, AVG(salary) calculates the average of non-NULL salary values. COUNT(column) counts only non-NULL values in that column.",
        "COUNT(*) behaves differently because it counts rows regardless of whether individual columns contain NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(salary) AS salaries_present,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
      },

      bullets: [
        "COUNT(*) counts rows.",
        "COUNT(column) counts non-NULL values in that column.",
        "AVG(column) normally ignores NULL values.",
        "MIN and MAX normally ignore NULL values.",
        "SUM normally ignores NULL values."
      ]
    },

    {
      id: "count-null",
      title: "17. COUNT(*) vs COUNT(column)",
      paragraphs: [
        "One of the most important NULL-related SQL interview questions is the difference between COUNT(*) and COUNT(column).",
        "COUNT(*) counts rows, while COUNT(column) counts only rows where that specific column is not NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS total_employees
FROM employees;

SELECT COUNT(department) AS employees_with_department
FROM employees;`
      },

      bullets: [
        "COUNT(*) includes rows with NULL columns.",
        "COUNT(department) excludes rows where department is NULL.",
        "The two counts can therefore be different."
      ]
    },

    {
      id: "sum-null",
      title: "18. NULL and SUM/AVG",
      paragraphs: [
        "Aggregate functions such as SUM and AVG normally ignore NULL values.",
        "However, if every value being aggregated is NULL, the result of functions such as SUM and AVG can be NULL rather than zero."
      ],

      code: {
        language: "sql",
        code: `SELECT
    SUM(bonus) AS total_bonus,
    AVG(bonus) AS average_bonus
FROM employees;`
      },

      bullets: [
        "NULL values are not treated as zero by SUM or AVG.",
        "Use COALESCE if the application needs a fallback such as zero.",
        "For example, COALESCE(SUM(bonus), 0) can return zero when no non-NULL bonus values exist."
      ]
    },

    {
      id: "coalesce-aggregate",
      title: "19. COALESCE with Aggregate Functions",
      paragraphs: [
        "COALESCE can be combined with aggregate functions when the application needs a guaranteed display value."
      ],

      code: {
        language: "sql",
        code: `SELECT
    COALESCE(SUM(bonus), 0) AS total_bonus
FROM employees;`
      }
    },

    {
      id: "null-order",
      title: "20. NULL with ORDER BY",
      paragraphs: [
        "NULL values can also appear when sorting results.",
        "The exact placement of NULL values in ORDER BY depends on the database system and whether NULLS FIRST or NULLS LAST is supported.",
        "Do not assume every database sorts NULL values in exactly the same position."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
ORDER BY department;`
      },

      bullets: [
        "NULL ordering can be database-dependent.",
        "Some databases support explicit NULLS FIRST or NULLS LAST syntax.",
        "COALESCE can sometimes be used when a custom fallback sort value is required."
      ]
    },

    {
      id: "null-join",
      title: "21. NULL and JOIN Conditions",
      paragraphs: [
        "NULL also affects joins because normal equality comparisons do not match NULL to NULL.",
        "For example, employee.department_id = department.department_id will not match two NULL values."
      ],

      code: {
        language: "sql",
        code: `SELECT e.employee_name, d.department_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id;`
      },

      bullets: [
        "LEFT JOIN can preserve employees even when department_id is NULL.",
        "The department columns from the right table become NULL when no matching department exists.",
        "NULL does not normally equal NULL in an equality JOIN condition."
      ]
    },

    {
      id: "left-join-null",
      title: "22. Finding Rows Without a Matching Record",
      paragraphs: [
        "A common SQL pattern uses LEFT JOIN followed by IS NULL to find rows that have no matching record in another table."
      ],

      code: {
        language: "sql",
        code: `SELECT e.employee_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id
WHERE d.department_id IS NULL;`
      },

      bullets: [
        "LEFT JOIN keeps all employees.",
        "Employees without a matching department have NULL values from the departments table.",
        "IS NULL identifies those unmatched rows.",
        "This pattern is commonly called an anti-join pattern."
      ]
    },

    {
      id: "null-constraints",
      title: "23. NULL and NOT NULL Constraints",
      paragraphs: [
        "Database constraints can control whether a column is allowed to contain NULL.",
        "A NOT NULL constraint means the column must contain a value when a row is inserted or updated.",
        "This is a database-level data integrity rule."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    salary DECIMAL(10, 2)
);`
      },

      bullets: [
        "employee_name cannot be NULL in this example.",
        "department can be NULL because no NOT NULL constraint is specified.",
        "salary can also be NULL unless another constraint prevents it.",
        "Application validation and database constraints should complement each other."
      ]
    },

    {
      id: "null-default",
      title: "24. NULL and DEFAULT Values",
      paragraphs: [
        "A DEFAULT value and NULL are different concepts.",
        "A DEFAULT can provide a value when an INSERT does not explicitly provide a value, while NULL represents the absence of a known value.",
        "Whether a default is used depends on the INSERT statement and database behavior."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id BIGINT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);`
      },

      bullets: [
        "DEFAULT provides a value when applicable.",
        "NULL means no known value is stored.",
        "A column can sometimes have both a DEFAULT and allow NULL.",
        "NOT NULL and DEFAULT solve different problems."
      ]
    },

    {
      id: "null-data-model",
      title: "25. Deciding Whether a Column Should Allow NULL",
      paragraphs: [
        "Allowing NULL should be a deliberate data-model decision.",
        "If a value is mandatory for the business, a NOT NULL constraint is usually appropriate.",
        "If a value is genuinely optional or unknown, allowing NULL may be appropriate."
      ],

      bullets: [
        "Ask whether the value is required for every valid record.",
        "Use NOT NULL for mandatory business data.",
        "Allow NULL when missing or unknown is a valid state.",
        "Do not use NULL simply because an application does not know how to handle missing values.",
        "Avoid confusing NULL with special placeholder values such as 0 or 'N/A'."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "26. NULL Handling in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA provides repository methods for checking whether entity properties are NULL or not NULL.",
        "Derived query keywords such as IsNull and IsNotNull can be used for this purpose."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartmentIsNull();

    List<Employee> findByDepartmentIsNotNull();

    List<Employee> findByManagerIsNull();
}`
      },

      bullets: [
        "IsNull represents a NULL check.",
        "IsNotNull represents a non-NULL check.",
        "The property name refers to the Java entity property.",
        "Spring Data JPA translates the repository method into an appropriate query."
      ]
    },

    {
      id: "jpql-null",
      title: "27. NULL Handling with JPQL",
      paragraphs: [
        "JPQL supports IS NULL and IS NOT NULL for entity properties.",
        "As with SQL, you should not use = NULL to test for NULL."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE e.department IS NULL
""")
List<Employee> findEmployeesWithoutDepartment();`
      }
    },

    {
      id: "rest-api-null",
      title: "28. NULL in REST API Responses",
      paragraphs: [
        "NULL values frequently appear in REST API responses when optional database fields have no value.",
        "The backend should decide whether NULL should be returned as null, replaced with a meaningful fallback, or omitted from the API response based on the API contract."
      ],

      code: {
        language: "json",
        code: `{
  "employeeId": 101,
  "employeeName": "Anu",
  "department": null,
  "salary": 50000
}`
      },

      bullets: [
        "null in JSON is different from the string 'null'.",
        "Do not automatically convert every NULL database value to an empty string.",
        "API behavior should be consistent and documented.",
        "DTO mapping is a good place to apply presentation-specific fallback rules."
      ]
    },

    {
      id: "common-mistakes",
      title: "29. Common NULL Mistakes",
      paragraphs: [
        "NULL handling is one of the most common sources of SQL bugs because NULL behaves differently from ordinary values."
      ],

      bullets: [
        "Using = NULL instead of IS NULL.",
        "Using <> NULL instead of IS NOT NULL.",
        "Assuming NULL means zero.",
        "Assuming NULL means an empty string.",
        "Assuming NULL means FALSE.",
        "Forgetting that NULL comparisons can produce UNKNOWN.",
        "Assuming COUNT(column) counts NULL values.",
        "Forgetting that NOT IN can be affected by NULL.",
        "Assuming NULL ordering is identical across databases.",
        "Using placeholder values such as 0 or 'N/A' when NULL would better represent an unknown value.",
        "Treating every NULL as an error when NULL may be a valid business state."
      ]
    },

    {
      id: "debugging-null",
      title: "30. How to Debug NULL Problems",
      paragraphs: [
        "When a query involving NULL produces unexpected results, first inspect the actual stored values.",
        "Then test IS NULL and IS NOT NULL separately before adding more complex conditions."
      ],

      code: {
        language: "sql",
        code: `-- Step 1: Find NULL departments
SELECT employee_name, department
FROM employees
WHERE department IS NULL;

-- Step 2: Find non-NULL departments
SELECT employee_name, department
FROM employees
WHERE department IS NOT NULL;

-- Step 3: Count both
SELECT
    COUNT(*) AS total_rows,
    COUNT(department) AS departments_present
FROM employees;`
      }
    },

    {
      id: "practice",
      title: "31. Practice Problems",
      paragraphs: [
        "Practice NULL handling using an employees table containing employee_id, employee_name, department, salary, bonus, manager_id, and status."
      ],

      bullets: [
        "Find employees whose department is NULL.",
        "Find employees whose department is not NULL.",
        "Find employees whose manager_id is NULL.",
        "Find employees whose bonus is NULL.",
        "Display 'Not Assigned' when department is NULL.",
        "Display 'No Bonus' when bonus is NULL.",
        "Count all employees.",
        "Count employees whose department is not NULL.",
        "Calculate average salary while ignoring NULL salaries.",
        "Calculate total bonus and display zero if the result is NULL.",
        "Find employees who have no matching department using LEFT JOIN.",
        "Find employees whose department is NULL or whose status is 'PENDING'."
      ]
    },

    {
      id: "practice-solutions",
      title: "32. Practice Solutions",
      code: {
        language: "sql",
        code: `-- 1. Department is NULL
SELECT *
FROM employees
WHERE department IS NULL;

-- 2. Department is not NULL
SELECT *
FROM employees
WHERE department IS NOT NULL;

-- 3. Manager is NULL
SELECT *
FROM employees
WHERE manager_id IS NULL;

-- 4. Bonus is NULL
SELECT *
FROM employees
WHERE bonus IS NULL;

-- 5. Display fallback department
SELECT
    employee_name,
    COALESCE(department, 'Not Assigned') AS department
FROM employees;

-- 6. Display fallback bonus
SELECT
    employee_name,
    COALESCE(bonus, 0) AS bonus
FROM employees;

-- 7. Count all employees
SELECT COUNT(*) AS total_employees
FROM employees;

-- 8. Count employees with department
SELECT COUNT(department) AS employees_with_department
FROM employees;

-- 9. Average salary
SELECT AVG(salary) AS average_salary
FROM employees;

-- 10. Total bonus with zero fallback
SELECT COALESCE(SUM(bonus), 0) AS total_bonus
FROM employees;

-- 11. Employees without a matching department
SELECT e.employee_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id
WHERE d.department_id IS NULL;

-- 12. NULL department or pending status
SELECT *
FROM employees
WHERE department IS NULL
   OR status = 'PENDING';`
      }
    },

    {
      id: "scenario-interview",
      title: "33. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "An employee has no department assigned. How would you find that employee?",
          answer:
            "Use WHERE department IS NULL."
        },
        {
          question:
            "How would you find employees who already have a department?",
          answer:
            "Use WHERE department IS NOT NULL."
        },
        {
          question:
            "Why does WHERE department = NULL return no NULL departments?",
          answer:
            "Because comparison with NULL generally produces UNKNOWN rather than TRUE. IS NULL must be used to test for NULL."
        },
        {
          question:
            "How would you display 'Not Assigned' when department is NULL?",
          answer:
            "Use COALESCE(department, 'Not Assigned') in the SELECT expression."
        },
        {
          question:
            "How would you count employees who have a department?",
          answer:
            "Use COUNT(department), because COUNT(column) ignores NULL values."
        },
        {
          question:
            "How would you count all employees regardless of NULL values?",
          answer:
            "Use COUNT(*), which counts rows."
        },
        {
          question:
            "How can you find employees that have no matching department record?",
          answer:
            "Use a LEFT JOIN from employees to departments and filter the right-side key with IS NULL."
        },
        {
          question:
            "What should you use when a nullable subquery is involved in an exclusion condition?",
          answer:
            "NOT EXISTS is often safer than NOT IN when NULL values can appear in the subquery result."
        }
      ]
    },

    {
      id: "interview",
      title: "34. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is NULL in SQL?",
          answer:
            "NULL represents an unknown, missing, or inapplicable value. It is not the same as zero, an empty string, or FALSE."
        },
        {
          question: "Is NULL equal to zero?",
          answer:
            "No. Zero is an actual numeric value, while NULL represents the absence of a known value."
        },
        {
          question: "Is NULL equal to an empty string?",
          answer:
            "Conceptually, no. NULL represents no known value, while an empty string is a character value containing zero characters. Exact empty-string behavior can also vary by database."
        },
        {
          question: "How do you check for NULL?",
          answer:
            "Use IS NULL."
        },
        {
          question: "How do you check for a non-NULL value?",
          answer:
            "Use IS NOT NULL."
        },
        {
          question: "Why does column = NULL not work?",
          answer:
            "A comparison involving NULL generally produces UNKNOWN rather than TRUE. WHERE returns rows only when the condition is TRUE, so IS NULL must be used."
        },
        {
          question: "What is SQL three-valued logic?",
          answer:
            "SQL expressions can evaluate to TRUE, FALSE, or UNKNOWN. UNKNOWN commonly occurs when NULL participates in a comparison."
        },
        {
          question: "Does WHERE return UNKNOWN rows?",
          answer:
            "No. WHERE returns rows only when the final condition evaluates to TRUE."
        },
        {
          question: "What is COALESCE?",
          answer:
            "COALESCE returns the first non-NULL expression from its arguments."
        },
        {
          question: "What happens if all COALESCE arguments are NULL?",
          answer:
            "COALESCE returns NULL when all supplied expressions are NULL."
        },
        {
          question: "What is NULLIF?",
          answer:
            "NULLIF returns NULL when its two expressions are equal; otherwise, it returns the first expression."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(column)?",
          answer:
            "COUNT(*) counts rows, while COUNT(column) counts only non-NULL values in that column."
        },
        {
          question: "Do aggregate functions ignore NULL?",
          answer:
            "Most common aggregate functions such as SUM, AVG, MIN, and MAX ignore NULL values. COUNT(column) also ignores NULL values, while COUNT(*) counts rows."
        },
        {
          question: "Can NULL values participate in JOIN conditions?",
          answer:
            "Yes, but normal equality does not make NULL equal to NULL. A NULL foreign key will not normally match another NULL using an equality JOIN condition."
        },
        {
          question: "How can LEFT JOIN and IS NULL find unmatched rows?",
          answer:
            "A LEFT JOIN preserves rows from the left table. When no right-side match exists, right-side columns become NULL, allowing IS NULL to identify unmatched rows."
        },
        {
          question: "What is the difference between NULL and NOT NULL?",
          answer:
            "NULL is a data value representing an unknown, missing, or inapplicable value. NOT NULL is a database constraint that prevents a column from containing NULL."
        },
        {
          question: "How do you handle NULL in Spring Data JPA?",
          answer:
            "Spring Data JPA provides derived query keywords such as IsNull and IsNotNull, and JPQL supports IS NULL and IS NOT NULL."
        },
        {
          question: "Why is NOT IN dangerous when NULL is involved?",
          answer:
            "A NULL in the compared list or subquery can cause the NOT IN predicate to evaluate to UNKNOWN, potentially excluding rows unexpectedly."
        },
        {
          question: "What is often safer than NOT IN for nullable subqueries?",
          answer:
            "NOT EXISTS is often safer because it directly checks whether a matching row exists and avoids the NULL-related NOT IN trap."
        },
        {
          question: "What is the most common SQL NULL mistake?",
          answer:
            "Using = NULL instead of IS NULL is one of the most common mistakes."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "35. Quick Reference",
      bullets: [
        "NULL → Unknown, missing, or inapplicable value.",
        "IS NULL → Checks whether a value is NULL.",
        "IS NOT NULL → Checks whether a value is not NULL.",
        "= NULL → Incorrect way to test for NULL.",
        "<> NULL → Incorrect way to test for non-NULL.",
        "TRUE → Condition is satisfied.",
        "FALSE → Condition is not satisfied.",
        "UNKNOWN → Common result of comparisons involving NULL.",
        "WHERE returns only TRUE rows.",
        "COALESCE → Returns the first non-NULL expression.",
        "NULLIF → Returns NULL when two expressions are equal.",
        "COUNT(*) → Counts rows.",
        "COUNT(column) → Counts non-NULL values.",
        "NOT NULL → Database constraint preventing NULL values.",
        "LEFT JOIN + IS NULL → Common pattern for finding unmatched rows.",
        "NOT EXISTS → Often safer than NOT IN for nullable subqueries."
      ]
    },

    {
      id: "one-minute-answer",
      title: "36. One-Minute Interview Answer",
      paragraphs: [
        "NULL in SQL represents an unknown, missing, or inapplicable value. It is different from zero, an empty string, and FALSE. Because NULL represents an unknown value, normal comparisons such as column = NULL or column <> NULL do not correctly test for NULL.",
        "To check for NULL, we use IS NULL, and to check for a non-NULL value, we use IS NOT NULL. SQL uses three-valued logic, so expressions can evaluate to TRUE, FALSE, or UNKNOWN. WHERE returns rows only when the final condition is TRUE.",
        "COALESCE is commonly used to provide a fallback value when a column is NULL. NULL also affects aggregate functions, joins, NOT IN, and sorting. For example, COUNT(column) ignores NULL values while COUNT(*) counts rows.",
        "In Spring Data JPA, NULL filtering can be expressed using derived query methods such as findByDepartmentIsNull and findByDepartmentIsNotNull, or through JPQL using IS NULL and IS NOT NULL."
      ]
    },

    {
      id: "revision-notes",
      title: "37. Revision Notes",
      bullets: [
        "NULL represents an unknown, missing, or inapplicable value.",
        "NULL is not zero.",
        "NULL is not an empty string.",
        "NULL is not FALSE.",
        "Use IS NULL to find NULL values.",
        "Use IS NOT NULL to find non-NULL values.",
        "Never use = NULL to test for NULL.",
        "Never use <> NULL to test for non-NULL.",
        "SQL uses TRUE, FALSE, and UNKNOWN.",
        "WHERE returns only rows whose condition evaluates to TRUE.",
        "COALESCE returns the first non-NULL expression.",
        "NULLIF returns NULL when two expressions are equal.",
        "COUNT(*) counts rows.",
        "COUNT(column) counts non-NULL values.",
        "Most aggregate functions ignore NULL values.",
        "NULL does not normally equal NULL in an equality JOIN.",
        "LEFT JOIN plus IS NULL can find unmatched records.",
        "NOT IN can behave unexpectedly when NULL is present.",
        "NOT EXISTS is often safer for nullable exclusion subqueries.",
        "NOT NULL is a database constraint, not a value.",
        "Spring Data JPA supports IsNull and IsNotNull.",
        "Always design NULL behavior intentionally in database and API layers."
      ]
    }
  ]
};
