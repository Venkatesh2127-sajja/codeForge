
export const inBetweenLike = {
  id: 2018,
  title: "IN, BETWEEN, and LIKE",
  slug: "in-between-like",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn three commonly used SQL filtering operators: IN for matching a list of values, BETWEEN for inclusive ranges, and LIKE for text pattern matching.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "in",
      title: "1. IN Operator",
      paragraphs: [
        "The IN operator checks whether a value matches one of the values in a specified list.",
        "It is commonly used when a column can match several acceptable values.",
        "IN is often easier to read than writing multiple equality conditions connected with OR."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'Finance');`
      },

      bullets: [
        "IN is often cleaner than writing multiple OR equality conditions.",
        "The list contains values to compare against.",
        "IN can be used with strings, numbers, dates, and other comparable values.",
        "IN can also be used with a subquery that returns a set of values."
      ]
    },

    {
      id: "in-equivalent",
      title: "2. IN vs Multiple OR Conditions",
      paragraphs: [
        "An IN condition can often replace multiple equality conditions connected by OR.",
        "Both forms express the same basic requirement, but IN is usually shorter and easier to read."
      ],

      code: {
        language: "sql",
        code: `-- Using OR
SELECT employee_name
FROM employees
WHERE department = 'Engineering'
   OR department = 'Finance';

-- Using IN
SELECT employee_name
FROM employees
WHERE department IN ('Engineering', 'Finance');`
      },

      bullets: [
        "Both queries represent the same basic filtering logic.",
        "IN becomes especially useful when the list contains many values.",
        "IN improves readability for multiple exact-match values."
      ]
    },

    {
      id: "in-numeric",
      title: "3. IN with Numeric Values",
      paragraphs: [
        "IN is not limited to text values. It can also be used with numeric columns.",
        "For example, employee IDs can be filtered against a list of specific IDs."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
WHERE employee_id IN (101, 105, 110);`
      }
    },

    {
      id: "in-dates",
      title: "4. IN with Dates",
      paragraphs: [
        "IN can also compare a date column against a list of specific dates.",
        "This is useful when you need records belonging to a known set of dates rather than an entire date range."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, joining_date
FROM employees
WHERE joining_date IN ('2025-01-10', '2025-02-15', '2025-03-20');`
      },

      bullets: [
        "Use appropriate date literals for your database.",
        "Be careful when the column contains a timestamp rather than only a date.",
        "For continuous date ranges, BETWEEN or explicit range conditions may be more appropriate."
      ]
    },

    {
      id: "in-subquery",
      title: "5. IN with a Subquery",
      paragraphs: [
        "IN can be combined with a subquery. The subquery returns a set of values, and the outer query checks whether each value belongs to that set.",
        "This is useful when the list of values should come from another table instead of being manually written."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE location = 'Bangalore'
);`
      },

      bullets: [
        "The inner query runs as part of the overall query.",
        "The outer query compares department_id against the returned values.",
        "The subquery should return a compatible single column for this form of IN."
      ]
    },

    {
      id: "not-in",
      title: "6. NOT IN",
      paragraphs: [
        "NOT IN selects values that are not in the specified list.",
        "It is useful when a query needs to exclude several known values.",
        "However, NULL values require special attention because SQL uses three-valued logic."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department NOT IN ('HR', 'Finance');`
      },

      bullets: [
        "NOT IN excludes the values listed inside the parentheses.",
        "It is useful for excluding multiple known values.",
        "NULL can make NOT IN behave unexpectedly, especially with subqueries.",
        "Consider NOT EXISTS when NULL may occur in a subquery result."
      ]
    },

    {
      id: "not-in-null",
      title: "7. NOT IN and NULL",
      paragraphs: [
        "A common SQL interview topic is the interaction between NOT IN and NULL.",
        "If a NOT IN comparison involves a list or subquery containing NULL, SQL's three-valued logic can cause the predicate to evaluate to UNKNOWN rather than TRUE.",
        "For this reason, NOT EXISTS is often preferred when excluding rows based on a nullable subquery result."
      ],

      code: {
        language: "sql",
        code: `-- Be careful when the subquery can return NULL
SELECT employee_name
FROM employees
WHERE department_id NOT IN (
    SELECT department_id
    FROM blocked_departments
);

-- Often safer when NULL may exist
SELECT e.employee_name
FROM employees e
WHERE NOT EXISTS (
    SELECT 1
    FROM blocked_departments b
    WHERE b.department_id = e.department_id
);`
      },

      bullets: [
        "NOT IN is safe when you know the compared list contains no NULL.",
        "A NULL in a subquery result can affect the overall predicate.",
        "NOT EXISTS is often a better choice for nullable subquery data."
      ]
    },

    {
      id: "between",
      title: "8. BETWEEN",
      paragraphs: [
        "BETWEEN tests whether a value falls within an inclusive range.",
        "The lower boundary and upper boundary are both included.",
        "BETWEEN is commonly used for numeric values, dates, and other values that have a meaningful ordering."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 70000;`
      },

      bullets: [
        "The lower boundary is included.",
        "The upper boundary is included.",
        "BETWEEN is commonly used with numeric, date, and other comparable values.",
        "The order of the lower and upper bounds matters for readability and expected behavior."
      ]
    },

    {
      id: "between-equivalent",
      title: "9. BETWEEN vs Comparison Operators",
      paragraphs: [
        "A BETWEEN condition can usually be written using >= and <=.",
        "For example, salary BETWEEN 50000 AND 70000 means salary >= 50000 AND salary <= 70000."
      ],

      code: {
        language: "sql",
        code: `-- Using BETWEEN
SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 70000;

-- Equivalent range condition
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
  AND salary <= 70000;`
      }
    },

    {
      id: "between-boundaries",
      title: "10. BETWEEN Includes Both Boundaries",
      paragraphs: [
        "The inclusive nature of BETWEEN is important during interviews and when implementing business rules.",
        "If the salary is exactly 50000 or exactly 70000, the row qualifies for the range 50000 through 70000."
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
        "49999 is excluded.",
        "70001 is excluded."
      ]
    },

    {
      id: "between-date",
      title: "11. BETWEEN with Dates",
      paragraphs: [
        "BETWEEN can be used with date values when you need records within a date range.",
        "For a DATE column, the boundaries are inclusive.",
        "When working with timestamps, be careful because a date literal such as '2025-01-31' may represent the beginning of that date rather than the entire day, depending on the database and expression."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, joining_date
FROM employees
WHERE joining_date BETWEEN '2025-01-01' AND '2025-01-31';`
      },

      bullets: [
        "For DATE values, both boundary dates are included.",
        "For TIMESTAMP or DATETIME values, consider the time component.",
        "For an entire timestamp day, an inclusive lower bound and exclusive next-day upper bound can be clearer."
      ]
    },

    {
      id: "between-timestamp",
      title: "12. BETWEEN with Timestamp Values",
      paragraphs: [
        "Timestamp filtering requires special care because timestamps contain both date and time.",
        "If you want all records on January 31, using an upper bound of '2025-01-31' may not include records later that day.",
        "A common approach is to use an inclusive lower bound and an exclusive upper bound representing the next day."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employee_events
WHERE event_time >= '2025-01-31 00:00:00'
  AND event_time < '2025-02-01 00:00:00';`
      },

      bullets: [
        "The lower boundary is inclusive.",
        "The next-day boundary is exclusive.",
        "This approach avoids depending on the last possible timestamp of the day."
      ]
    },

    {
      id: "like",
      title: "13. LIKE",
      paragraphs: [
        "LIKE performs pattern matching for text values.",
        "Unlike =, which normally checks an exact value, LIKE allows a search pattern.",
        "The percent sign (%) commonly represents zero or more characters, while the underscore (_) commonly represents exactly one character."
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
      id: "like-percent",
      title: "14. Percent (%) Wildcard",
      paragraphs: [
        "The percent wildcard represents zero or more characters.",
        "It can appear at the beginning, end, or both sides of a pattern."
      ],

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
WHERE employee_name LIKE '%av%';`
      },

      bullets: [
        "'R%' means starts with R.",
        "'%i' means ends with i.",
        "'%av%' means contains av.",
        "'%' alone can match any sequence of characters, including an empty sequence."
      ]
    },

    {
      id: "like-underscore",
      title: "15. Underscore (_) Wildcard",
      paragraphs: [
        "The underscore wildcard represents exactly one character.",
        "Multiple underscores can be combined when you want to match a specific number of character positions."
      ],

      code: {
        language: "sql",
        code: `-- Exactly four characters
SELECT employee_name
FROM employees
WHERE employee_name LIKE '____';

-- Starts with R followed by exactly two characters
SELECT employee_name
FROM employees
WHERE employee_name LIKE 'R__';`
      },

      bullets: [
        "_ represents one character.",
        "____ represents four character positions.",
        "R__ represents R followed by two characters."
      ]
    },

    {
      id: "like-examples",
      title: "16. LIKE Pattern Examples",
      code: {
        language: "sql",
        code: `-- Starts with R
WHERE employee_name LIKE 'R%';

-- Ends with i
WHERE employee_name LIKE '%i';

-- Contains av
WHERE employee_name LIKE '%av%';

-- Exactly four characters
WHERE employee_name LIKE '____';

-- Starts with A and has at least three characters
WHERE employee_name LIKE 'A__%';`
      },

      bullets: [
        "% can represent zero or more characters.",
        "_ represents one character.",
        "Case-sensitivity of LIKE can depend on database, collation, and configuration.",
        "Patterns should be designed carefully because leading wildcards can affect index usage."
      ]
    },

    {
      id: "like-not",
      title: "17. NOT LIKE",
      paragraphs: [
        "NOT LIKE is used when you want to exclude values matching a pattern.",
        "For example, NOT LIKE 'A%' excludes names that begin with A."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name NOT LIKE 'A%';`
      }
    },

    {
      id: "like-case",
      title: "18. LIKE and Case Sensitivity",
      paragraphs: [
        "Whether LIKE is case-sensitive depends on the database system, collation, and configuration.",
        "Therefore, you should not assume that LIKE 'r%' behaves identically in MySQL, PostgreSQL, and every other SQL database.",
        "When an application requires predictable case-insensitive matching, use the appropriate database-specific technique."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE 'R%';`
      },

      bullets: [
        "Check the database's collation and comparison rules.",
        "MySQL behavior commonly depends on the selected collation.",
        "PostgreSQL provides ILIKE for case-insensitive pattern matching.",
        "Portable applications should be deliberate about case sensitivity."
      ]
    },

    {
      id: "like-escape",
      title: "19. Escaping LIKE Wildcards",
      paragraphs: [
        "Sometimes you need to search for an actual percent sign or underscore rather than treating it as a wildcard.",
        "SQL supports an ESCAPE mechanism for defining a character that makes a wildcard literal."
      ],

      code: {
        language: "sql",
        code: `SELECT product_name
FROM products
WHERE product_code LIKE 'A\\%%' ESCAPE '\\';`
      },

      bullets: [
        "The ESCAPE character tells SQL that the following wildcard should be treated literally.",
        "Exact escaping syntax can vary in details between database systems and client languages.",
        "Be careful with backslash escaping when the SQL is written inside a Java string."
      ]
    },

    {
      id: "in-between-like-comparison",
      title: "20. IN vs BETWEEN vs LIKE",
      paragraphs: [
        "These operators solve different filtering problems.",
        "IN is best when you have a specific list of acceptable values.",
        "BETWEEN is best when you have a range.",
        "LIKE is best when you need text pattern matching."
      ],

      bullets: [
        "IN → Match one of several specific values.",
        "BETWEEN → Match values within an inclusive range.",
        "LIKE → Match text using a pattern.",
        "NOT IN → Exclude a list of values.",
        "NOT BETWEEN → Exclude a range.",
        "NOT LIKE → Exclude a text pattern."
      ],

      code: {
        language: "sql",
        code: `-- IN
SELECT *
FROM employees
WHERE department IN ('IT', 'HR');

-- BETWEEN
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 80000;

-- LIKE
SELECT *
FROM employees
WHERE employee_name LIKE 'A%';`
      }
    },

    {
      id: "combine-operators",
      title: "21. Combining IN, BETWEEN, and LIKE",
      paragraphs: [
        "These operators can be combined with AND and OR to create practical search filters.",
        "Parentheses are recommended when different logical conditions are combined."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary BETWEEN 50000 AND 80000
  AND employee_name LIKE 'R%';`
      },

      bullets: [
        "IN filters the department.",
        "BETWEEN filters the salary range.",
        "LIKE filters the employee name.",
        "AND requires all three conditions to be satisfied."
      ]
    },

    {
      id: "in-null",
      title: "22. IN and NULL",
      paragraphs: [
        "IN uses equality-style matching, and NULL is not equal to any ordinary value.",
        "If the column being checked is NULL, it will not match an ordinary value in an IN list.",
        "If you need to include NULL explicitly, add an IS NULL condition."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('IT', 'HR')
   OR department IS NULL;`
      }
    },

    {
      id: "between-null",
      title: "23. BETWEEN and NULL",
      paragraphs: [
        "If the value being tested by BETWEEN is NULL, the comparison cannot establish that it falls inside the range.",
        "The result becomes UNKNOWN and the row is not returned by WHERE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 80000;`
      },

      bullets: [
        "NULL salary does not qualify for the BETWEEN condition.",
        "Use IS NULL separately when missing salaries need to be included."
      ]
    },

    {
      id: "like-null",
      title: "24. LIKE and NULL",
      paragraphs: [
        "LIKE comparisons involving NULL also produce UNKNOWN rather than TRUE.",
        "Therefore, a NULL text value does not match a LIKE pattern."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE 'R%';`
      },

      bullets: [
        "NULL does not match the pattern.",
        "Use IS NULL separately if NULL names need to be handled explicitly."
      ]
    },

    {
      id: "performance",
      title: "25. Performance Considerations",
      paragraphs: [
        "Filtering operators themselves are not automatically slow. Performance depends on the query, data distribution, indexes, database optimizer, and execution plan.",
        "Indexes can help many equality, range, and prefix searches.",
        "A LIKE pattern beginning with a wildcard, such as '%abc', generally cannot use a normal B-tree index efficiently for locating the beginning of the value."
      ],

      bullets: [
        "Equality filters can often benefit from indexes.",
        "Range conditions can often benefit from indexes.",
        "Prefix LIKE searches such as 'Abc%' can often use a suitable index.",
        "Leading-wildcard searches such as '%abc' are generally harder to optimize with a normal B-tree index.",
        "Always use EXPLAIN or the database's execution-plan tools when investigating performance."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "26. IN, BETWEEN, and LIKE in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA supports common IN, BETWEEN, and LIKE operations through derived query method keywords.",
        "This allows Java applications to perform common filtering operations without writing SQL directly."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartmentIn(List<String> departments);

    List<Employee> findBySalaryBetween(
        BigDecimal minimum,
        BigDecimal maximum
    );

    List<Employee> findByEmployeeNameStartingWith(String prefix);

    List<Employee> findByEmployeeNameContaining(String text);
}`
      },

      bullets: [
        "In represents an IN condition.",
        "Between represents a range condition.",
        "StartingWith commonly maps to a prefix pattern.",
        "Containing commonly maps to a contains-style pattern.",
        "The generated SQL depends on the JPA provider and database."
      ]
    },

    {
      id: "jpql",
      title: "27. IN, BETWEEN, and LIKE in JPQL",
      paragraphs: [
        "JPQL also supports IN, BETWEEN, and LIKE.",
        "JPQL works with entity names and Java entity properties instead of directly using database table names and columns."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE e.department IN :departments
      AND e.salary BETWEEN :minimumSalary AND :maximumSalary
      AND e.employeeName LIKE :namePattern
""")
List<Employee> searchEmployees(
    @Param("departments") List<String> departments,
    @Param("minimumSalary") BigDecimal minimumSalary,
    @Param("maximumSalary") BigDecimal maximumSalary,
    @Param("namePattern") String namePattern
);`
      }
    },

    {
      id: "rest-api-filtering",
      title: "28. Filtering from a REST API",
      paragraphs: [
        "These SQL operators are commonly used behind REST API search endpoints.",
        "For example, a frontend may allow the user to select departments, minimum and maximum salary, and a name search pattern.",
        "The backend converts these values into parameterized database filters."
      ],

      code: {
        language: "text",
        code: `GET /api/employees?departments=IT,HR&minSalary=50000&maxSalary=80000&name=Ra%`
      },

      bullets: [
        "Frontend sends filter values.",
        "Controller receives request parameters.",
        "Service validates the business rules.",
        "Repository applies parameterized database filtering.",
        "Database returns matching employees.",
        "Controller returns the result as JSON."
      ]
    },

    {
      id: "common-mistakes",
      title: "29. Common Mistakes",
      paragraphs: [
        "IN, BETWEEN, and LIKE are easy to learn, but several mistakes commonly appear in real applications and interviews."
      ],

      bullets: [
        "Forgetting that BETWEEN includes both boundaries.",
        "Using BETWEEN for timestamp ranges without considering the time component.",
        "Using NOT IN when the subquery can return NULL.",
        "Using = when LIKE pattern matching is actually required.",
        "Forgetting that % means zero or more characters.",
        "Forgetting that _ means exactly one character.",
        "Assuming LIKE is always case-insensitive.",
        "Using a leading wildcard such as '%java%' on a very large table without considering performance.",
        "Forgetting to use IS NULL when NULL values should be included.",
        "Passing user input into SQL using string concatenation instead of parameters."
      ]
    },

    {
      id: "debugging",
      title: "30. Debugging Filtering Queries",
      paragraphs: [
        "When a query using IN, BETWEEN, or LIKE returns unexpected results, test each condition independently before combining them.",
        "This makes it easier to determine whether the issue comes from the value list, range boundaries, pattern, NULL handling, or logical combination."
      ],

      code: {
        language: "sql",
        code: `-- Step 1: Test IN
SELECT *
FROM employees
WHERE department IN ('Engineering', 'Finance');

-- Step 2: Test BETWEEN
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 80000;

-- Step 3: Test LIKE
SELECT *
FROM employees
WHERE employee_name LIKE 'R%';

-- Step 4: Combine
SELECT *
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary BETWEEN 50000 AND 80000
  AND employee_name LIKE 'R%';`
      }
    },

    {
      id: "practice",
      title: "31. Practice Problems",
      paragraphs: [
        "Practice these operators using an employees table containing employee_id, employee_name, department, salary, joining_date, and status."
      ],

      bullets: [
        "Find employees from IT, HR, or Finance using IN.",
        "Find employees whose department is not HR or Finance.",
        "Find employees whose salary is between 50000 and 80000.",
        "Find employees whose salary is outside the 50000 to 80000 range.",
        "Find employees whose names start with A.",
        "Find employees whose names end with i.",
        "Find employees whose names contain 'an'.",
        "Find employees whose names contain exactly four characters.",
        "Find employees whose joining date is between January 1 and March 31, 2025.",
        "Find employees from Engineering or Finance earning between 60000 and 90000.",
        "Find employees whose name starts with R and whose salary is at least 50000.",
        "Find employees whose department is in IT or HR and whose name contains 'a'."
      ]
    },

    {
      id: "practice-solutions",
      title: "32. Practice Solutions",
      code: {
        language: "sql",
        code: `-- 1. Employees from IT, HR, or Finance
SELECT *
FROM employees
WHERE department IN ('IT', 'HR', 'Finance');

-- 2. Employees not from HR or Finance
SELECT *
FROM employees
WHERE department NOT IN ('HR', 'Finance');

-- 3. Salary between 50000 and 80000
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 80000;

-- 4. Salary outside 50000 to 80000
SELECT *
FROM employees
WHERE salary NOT BETWEEN 50000 AND 80000;

-- 5. Names starting with A
SELECT *
FROM employees
WHERE employee_name LIKE 'A%';

-- 6. Names ending with i
SELECT *
FROM employees
WHERE employee_name LIKE '%i';

-- 7. Names containing 'an'
SELECT *
FROM employees
WHERE employee_name LIKE '%an%';

-- 8. Names containing exactly four characters
SELECT *
FROM employees
WHERE employee_name LIKE '____';

-- 9. Joining dates between January and March 2025
SELECT *
FROM employees
WHERE joining_date BETWEEN '2025-01-01' AND '2025-03-31';

-- 10. Engineering or Finance with salary between 60000 and 90000
SELECT *
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary BETWEEN 60000 AND 90000;

-- 11. Name starts with R and salary is at least 50000
SELECT *
FROM employees
WHERE employee_name LIKE 'R%'
  AND salary >= 50000;

-- 12. Department is IT or HR and name contains 'a'
SELECT *
FROM employees
WHERE department IN ('IT', 'HR')
  AND employee_name LIKE '%a%';`
      }
    },

    {
      id: "scenario-interview",
      title: "33. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You need employees from IT, HR, or Finance. Which operator would you use?",
          answer:
            "Use IN because the department must match one value from a known list."
        },
        {
          question:
            "How would you find employees whose salary is between 50000 and 80000 inclusive?",
          answer:
            "Use salary BETWEEN 50000 AND 80000. BETWEEN includes both boundary values."
        },
        {
          question:
            "How would you find employees whose names start with 'A'?",
          answer:
            "Use employee_name LIKE 'A%'. The percent wildcard represents zero or more characters after A."
        },
        {
          question:
            "How would you find names containing the word 'raj'?",
          answer:
            "Use employee_name LIKE '%raj%'."
        },
        {
          question:
            "How would you find exactly four-character employee names?",
          answer:
            "Use employee_name LIKE '____'. Each underscore represents one character."
        },
        {
          question:
            "Why can NOT IN be dangerous with NULL?",
          answer:
            "If the list or subquery contains NULL, SQL's three-valued logic can make the NOT IN predicate evaluate to UNKNOWN, causing expected rows to be excluded."
        },
        {
          question:
            "When would you prefer NOT EXISTS over NOT IN?",
          answer:
            "NOT EXISTS is often preferable when the subquery can return NULL or when expressing an existence-based relationship is clearer."
        },
        {
          question:
            "Does BETWEEN include the start and end values?",
          answer:
            "Yes. BETWEEN is normally inclusive of both boundaries."
        },
        {
          question:
            "What is the difference between LIKE and =?",
          answer:
            "= normally checks exact equality, while LIKE performs pattern matching using wildcards such as % and _."
        }
      ]
    },

    {
      id: "interview",
      title: "34. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is IN in SQL?",
          answer:
            "IN checks whether an expression matches one of the values in a specified list or a result returned by a subquery."
        },
        {
          question: "What is NOT IN?",
          answer:
            "NOT IN selects values that are not contained in the specified list or subquery result."
        },
        {
          question: "What is BETWEEN?",
          answer:
            "BETWEEN checks whether a value falls within a specified inclusive range."
        },
        {
          question: "Is BETWEEN inclusive?",
          answer:
            "Yes. BETWEEN normally includes both the lower and upper boundary values."
        },
        {
          question: "What is LIKE?",
          answer:
            "LIKE is used for text pattern matching."
        },
        {
          question: "What does % mean in LIKE?",
          answer:
            "The percent wildcard commonly represents zero or more characters."
        },
        {
          question: "What does _ mean in LIKE?",
          answer:
            "The underscore wildcard commonly represents exactly one character."
        },
        {
          question: "What is the difference between IN and OR?",
          answer:
            "IN provides a concise way to check whether a value matches one of several values, while OR combines separate logical conditions. For simple equality comparisons, IN can often replace multiple OR conditions."
        },
        {
          question: "What is the difference between IN and BETWEEN?",
          answer:
            "IN checks membership in a specific list of values, while BETWEEN checks whether a value falls within an inclusive range."
        },
        {
          question: "What is the difference between BETWEEN and >= with <=?",
          answer:
            "For a normal comparable range, value BETWEEN lower AND upper is equivalent to value >= lower AND value <= upper."
        },
        {
          question: "Does NOT IN include NULL values?",
          answer:
            "No. NULL does not behave like an ordinary value in SQL comparisons, and NOT IN can produce UNKNOWN when NULL participates in the comparison."
        },
        {
          question: "Why is NOT EXISTS often preferred over NOT IN?",
          answer:
            "NOT EXISTS avoids the NULL-related trap that can occur with NOT IN subqueries and directly expresses that no matching row should exist."
        },
        {
          question: "Can BETWEEN be used with dates?",
          answer:
            "Yes. BETWEEN can be used with date values, but timestamp ranges require careful consideration of the time component."
        },
        {
          question: "Can LIKE be used with numbers?",
          answer:
            "LIKE is primarily intended for character or text pattern matching. If a numeric value needs pattern-based searching, it generally needs an appropriate conversion, but that can have portability and performance implications."
        },
        {
          question: "Is LIKE always case-sensitive?",
          answer:
            "No. Case sensitivity depends on the database, collation, operator, and configuration. For example, PostgreSQL provides ILIKE for case-insensitive pattern matching."
        },
        {
          question: "Can LIKE use indexes?",
          answer:
            "Some LIKE patterns can use an appropriate index, especially prefix searches such as 'abc%'. Leading-wildcard patterns such as '%abc' are generally harder for a normal B-tree index to optimize."
        },
        {
          question: "How are IN and BETWEEN represented in Spring Data JPA?",
          answer:
            "Spring Data JPA provides derived query keywords such as In and Between for common repository filtering operations."
        },
        {
          question: "How do you write LIKE conditions in Spring Data JPA?",
          answer:
            "Spring Data JPA supports derived keywords such as StartingWith, EndingWith, and Containing, and JPQL can use the LIKE operator directly."
        },
        {
          question: "Can IN, BETWEEN, and LIKE be combined?",
          answer:
            "Yes. They can be combined with AND, OR, and NOT to build complex filtering conditions."
        },
        {
          question: "What is the most common mistake with BETWEEN?",
          answer:
            "A common mistake is forgetting that BETWEEN includes both boundaries, especially when implementing date or numeric business rules."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "35. Quick Reference",
      bullets: [
        "IN → Matches one value from a list.",
        "NOT IN → Excludes values from a list.",
        "BETWEEN → Checks an inclusive range.",
        "NOT BETWEEN → Checks that a value is outside an inclusive range.",
        "LIKE → Performs text pattern matching.",
        "NOT LIKE → Excludes text matching a pattern.",
        "% → Zero or more characters.",
        "_ → Exactly one character.",
        "IN can often replace multiple OR equality conditions.",
        "BETWEEN is equivalent to >= lower AND <= upper for ordinary range comparisons.",
        "NULL does not match ordinary IN values.",
        "NOT IN requires special attention when NULL is possible.",
        "LIKE case sensitivity depends on database and collation.",
        "Leading-wildcard LIKE patterns can have performance implications."
      ]
    },

    {
      id: "one-minute-answer",
      title: "36. One-Minute Interview Answer",
      paragraphs: [
        "IN, BETWEEN, and LIKE are commonly used SQL filtering operators. IN checks whether a value matches one of several specified values, such as department IN ('IT', 'HR'). BETWEEN checks whether a value falls within an inclusive range, such as salary BETWEEN 50000 AND 80000.",
        "LIKE is used for text pattern matching. The percent sign represents zero or more characters, while the underscore represents one character. For example, employee_name LIKE 'A%' finds names beginning with A.",
        "One important interview point is that NOT IN can behave unexpectedly when NULL is present because SQL uses three-valued logic. NOT EXISTS is often safer for nullable subquery results. Also, when working with timestamps, range boundaries should be chosen carefully.",
        "In Spring Data JPA, similar filtering can be expressed using derived query keywords such as In, Between, StartingWith, and Containing, or by using JPQL."
      ]
    },

    {
      id: "revision-notes",
      title: "37. Revision Notes",
      bullets: [
        "IN checks membership in a list.",
        "NOT IN excludes values from a list.",
        "BETWEEN checks an inclusive range.",
        "BETWEEN includes both lower and upper boundaries.",
        "LIKE performs text pattern matching.",
        "NOT LIKE excludes a text pattern.",
        "% represents zero or more characters.",
        "_ represents one character.",
        "IN is often cleaner than multiple OR equality conditions.",
        "IN can work with subqueries.",
        "NOT IN can be affected by NULL values.",
        "NOT EXISTS is often safer for nullable exclusion subqueries.",
        "BETWEEN can be used with numbers and dates.",
        "Timestamp ranges require attention to time components.",
        "LIKE case sensitivity depends on database and collation.",
        "Prefix searches such as 'abc%' can often be indexed efficiently.",
        "Leading-wildcard searches such as '%abc' can be expensive on large tables.",
        "Spring Data JPA supports In, Between, StartingWith, EndingWith, and Containing.",
        "JPQL supports IN, BETWEEN, and LIKE.",
        "Always parameterize user-provided filter values."
      ]
    }
  ]
};
