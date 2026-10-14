
export const distinctKeyword = {
  id: 2013,
  title: "DISTINCT Keyword",
  slug: "distinct-keyword",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn how DISTINCT removes duplicate result rows, how it works with multiple columns, how it differs from GROUP BY, and when it should and should not be used.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-distinct",
      title: "1. What Is DISTINCT?",
      paragraphs: [
        "DISTINCT is a SQL keyword used with SELECT to remove duplicate result rows.",
        "It is useful when you want to see unique values rather than every occurrence of a value.",
        "DISTINCT applies to the complete set of expressions in the SELECT list."
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
      id: "without-distinct",
      title: "2. Without DISTINCT",
      paragraphs: [
        "Without DISTINCT, SELECT returns every matching row, including repeated values.",
        "If several employees belong to the same department, that department can appear multiple times."
      ],

      code: {
        language: "sql",
        code: `SELECT department
FROM employees;`
      },

      output: `department
-----------
Engineering
HR
Engineering
Finance`
    },

    {
      id: "distinct-comparison",
      title: "3. SELECT vs SELECT DISTINCT",

      paragraphs: [
        "A normal SELECT returns all matching rows.",
        "SELECT DISTINCT removes duplicate result rows from the selected expressions.",
        "The important point is that DISTINCT affects the result set; it does not modify the data stored in the table."
      ],

      code: {
        language: "sql",
        code: `-- Without DISTINCT
SELECT department
FROM employees;

-- With DISTINCT
SELECT DISTINCT department
FROM employees;`
      },

      bullets: [
        "SELECT returns every matching occurrence.",
        "SELECT DISTINCT removes duplicate result rows.",
        "DISTINCT does not delete records from the table.",
        "DISTINCT does not change the stored data.",
        "DISTINCT only affects the query result."
      ]
    },

    {
      id: "multiple-columns",
      title: "4. DISTINCT with Multiple Columns",

      paragraphs: [
        "When multiple expressions are selected, DISTINCT removes duplicate combinations of the selected values.",
        "The database compares the complete selected combination when determining whether two result rows are duplicates.",
        "DISTINCT does not make every individual column unique."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department, salary
FROM employees;`
      },

      bullets: [
        "DISTINCT applies to the complete selected combination.",
        "It does not mean each column is independently unique.",
        "department and salary together determine whether a result row is duplicated.",
        "Two employees with the same department but different salaries are different DISTINCT combinations."
      ]
    },

    {
      id: "multiple-column-example",
      title: "5. Understanding Combination Uniqueness",

      paragraphs: [
        "Consider a table containing several employees.",
        "If two employees have Engineering and salary 60000, the combination appears once with DISTINCT.",
        "If one employee has Engineering and 60000 and another has Engineering and 70000, both combinations remain because they are different."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    department,
    salary
FROM employees;`
      },

      output: `department  | salary
------------+-------
Engineering | 60000
Engineering | 70000
HR          | 45000
Finance     | 50000`
    },

    {
      id: "distinct-does-not-change-data",
      title: "6. DISTINCT Does Not Delete Duplicate Data",

      paragraphs: [
        "A common beginner misunderstanding is that DISTINCT removes duplicate records from the database.",
        "That is incorrect. DISTINCT only removes duplicate rows from the query result.",
        "The original records remain unchanged in the table."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees;`
      },

      bullets: [
        "The employees table is not modified.",
        "No employee row is deleted.",
        "Only duplicate result values are suppressed.",
        "Running the query again produces the same result unless the underlying data changes."
      ]
    },

    {
      id: "distinct-with-where",
      title: "7. DISTINCT with WHERE",

      paragraphs: [
        "DISTINCT can be combined with WHERE.",
        "WHERE first determines which rows qualify for the query, and DISTINCT removes duplicate result rows from the selected expressions."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
WHERE salary >= 60000;`
      },

      output: `department
-----------
Engineering`
    },

    {
      id: "distinct-with-order-by",
      title: "8. DISTINCT with ORDER BY",

      paragraphs: [
        "DISTINCT can be combined with ORDER BY when you want unique values in a particular order.",
        "ORDER BY controls the ordering of the result after the qualifying result set has been determined.",
        "Rules around ORDER BY expressions with DISTINCT can vary by database system, so queries should follow the target database's restrictions."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
ORDER BY department;`
      },

      output: `department
-----------
Engineering
Finance
HR`
    },

    {
      id: "distinct-with-limit",
      title: "9. DISTINCT with LIMIT",

      paragraphs: [
        "DISTINCT can also be combined with LIMIT when you need only a limited number of unique results.",
        "This is useful when exploring unique categories or values."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
ORDER BY department
LIMIT 2;`
      },

      output: `department
-----------
Engineering
Finance`
    },

    {
      id: "distinct-null",
      title: "10. DISTINCT and NULL",

      paragraphs: [
        "DISTINCT treats duplicate NULL result values as one distinct result value.",
        "Therefore, if several rows contain NULL for the selected column, a DISTINCT query can return a single NULL result for that value."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees;`
      },

      bullets: [
        "NULL represents an unknown or missing value.",
        "Multiple NULL values can exist in a column.",
        "DISTINCT can return one NULL result for those repeated NULL values.",
        "The exact display of NULL depends on the SQL client."
      ]
    },

    {
      id: "distinct-count",
      title: "11. COUNT(DISTINCT ...)",

      paragraphs: [
        "DISTINCT can also be used inside aggregate functions.",
        "COUNT(DISTINCT column) counts the number of unique non-NULL values for that expression."
      ],

      code: {
        language: "sql",
        code: `SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },

      output: `department_count
----------------
3`
    },

    {
      id: "count-distinct-vs-count",
      title: "12. COUNT(*) vs COUNT(DISTINCT column)",

      paragraphs: [
        "COUNT(*) counts rows, while COUNT(DISTINCT column) counts unique non-NULL values of the selected column.",
        "These two expressions answer different questions."
      ],

      code: {
        language: "sql",
        code: `-- Count all rows
SELECT COUNT(*) AS employee_count
FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },

      bullets: [
        "COUNT(*) → counts rows.",
        "COUNT(department) → counts non-NULL department values.",
        "COUNT(DISTINCT department) → counts unique non-NULL department values.",
        "Use the expression that matches the business requirement."
      ]
    },

    {
      id: "distinct-vs-group-by",
      title: "13. DISTINCT vs GROUP BY",

      paragraphs: [
        "DISTINCT and GROUP BY can sometimes produce similar-looking results when you only need unique combinations.",
        "However, their purposes are different.",
        "DISTINCT focuses on removing duplicate result rows, while GROUP BY is primarily used to form groups for aggregate calculations."
      ],

      code: {
        language: "sql",
        code: `-- DISTINCT
SELECT DISTINCT department
FROM employees;

-- GROUP BY
SELECT department
FROM employees
GROUP BY department;`
      },

      bullets: [
        "DISTINCT is useful for unique result combinations.",
        "GROUP BY is useful when calculations are needed for each group.",
        "COUNT, SUM, AVG, MIN, and MAX are commonly used with GROUP BY.",
        "Do not use GROUP BY only because you are unfamiliar with DISTINCT."
      ]
    },

    {
      id: "group-by-aggregate",
      title: "14. GROUP BY When You Need Aggregation",

      paragraphs: [
        "If the requirement is to calculate information for each department, GROUP BY is usually the appropriate tool.",
        "For example, you can calculate the number of employees in every department."
      ],

      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      },

      output: `department  | employee_count
------------+---------------
Engineering | 2
HR          | 1
Finance     | 1`
    },

    {
      id: "distinct-and-joins",
      title: "15. DISTINCT with JOINs",

      paragraphs: [
        "DISTINCT is sometimes used when a JOIN produces repeated result rows.",
        "However, you should first understand why the JOIN is producing duplicates.",
        "A one-to-many relationship naturally produces multiple rows for one parent when child records are joined."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    e.employee_name
FROM employees AS e
JOIN employee_projects AS ep
    ON e.employee_id = ep.employee_id;`
      },

      bullets: [
        "An employee may belong to multiple projects.",
        "The JOIN can therefore produce multiple rows for the same employee.",
        "DISTINCT can return each employee name once.",
        "But DISTINCT should not automatically be used to hide an incorrect JOIN condition."
      ]
    },

    {
      id: "duplicate-join-problem",
      title: "16. Do Not Use DISTINCT to Hide a Bad JOIN",

      paragraphs: [
        "One of the most important practical lessons is that DISTINCT should not be used as a quick fix for every duplicate result.",
        "If a query unexpectedly returns duplicates, inspect the JOIN conditions and table relationships first."
      ],

      code: {
        language: "sql",
        code: `-- First investigate the join
SELECT
    e.employee_id,
    e.employee_name,
    ep.project_id
FROM employees AS e
JOIN employee_projects AS ep
    ON e.employee_id = ep.employee_id;`
      },

      bullets: [
        "Check the foreign-key relationship.",
        "Check whether the relationship is one-to-many or many-to-many.",
        "Check the JOIN condition.",
        "Check whether duplicate rows are actually expected.",
        "Use DISTINCT only when uniqueness is part of the required result."
      ]
    },

    {
      id: "distinct-performance",
      title: "17. DISTINCT and Performance",

      paragraphs: [
        "Removing duplicates can require additional database work, especially for large result sets.",
        "Depending on the database and query, the optimizer may need to sort, hash, or otherwise process rows to identify duplicates.",
        "Do not assume DISTINCT is always expensive, but do understand that it can add work."
      ],

      bullets: [
        "Avoid unnecessary DISTINCT.",
        "Select only the columns actually required.",
        "Use appropriate WHERE conditions.",
        "Use indexes where they support important access patterns.",
        "Inspect the execution plan when performance matters.",
        "Fix incorrect joins instead of masking them with DISTINCT."
      ]
    },

    {
      id: "distinct-and-indexes",
      title: "18. DISTINCT and Indexes",

      paragraphs: [
        "Indexes can sometimes help the database efficiently process DISTINCT queries, depending on the selected columns, predicates, database engine, and execution plan.",
        "You should not create an index solely because a query contains DISTINCT without analyzing the actual workload."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
WHERE department IS NOT NULL;`
      },

      bullets: [
        "Indexes should support real query patterns.",
        "An index is not automatically required for every DISTINCT query.",
        "Use EXPLAIN or the database's query-plan tools to investigate performance."
      ]
    },

    {
      id: "distinct-with-functions",
      title: "19. DISTINCT with Expressions and Functions",

      paragraphs: [
        "DISTINCT can be applied to expressions rather than only physical table columns.",
        "The database compares the resulting expression values when determining duplicates."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    UPPER(department) AS department
FROM employees;`
      },

      output: `department
-----------
ENGINEERING
HR
FINANCE`
    },

    {
      id: "distinct-column-combination",
      title: "20. DISTINCT on a Combination",

      paragraphs: [
        "When several columns are selected with DISTINCT, the entire combination must be unique.",
        "This is one of the most important interview concepts about DISTINCT."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT
    department,
    job_title
FROM employees;`
      },

      bullets: [
        "Engineering + Developer is one combination.",
        "Engineering + Tester is another combination.",
        "Engineering + Developer repeated multiple times appears once.",
        "Engineering + Developer and Engineering + Tester are not duplicates."
      ]
    },

    {
      id: "real-world-example",
      title: "21. Real-World Example",

      paragraphs: [
        "Imagine an e-commerce application where many products belong to different categories.",
        "If the UI needs a list of available categories, returning every product's category would contain repeated values.",
        "DISTINCT can return the unique category names required by the UI."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT category_name
FROM products
ORDER BY category_name;`
      },

      bullets: [
        "The database may contain thousands of products.",
        "Many products can belong to the same category.",
        "The UI needs each category only once.",
        "DISTINCT produces a unique category list."
      ]
    },

    {
      id: "spring-boot-example",
      title: "22. DISTINCT in Spring Boot and JPA",

      paragraphs: [
        "In Spring Data JPA, distinct queries can be expressed through repository methods or JPQL depending on the requirement.",
        "The underlying persistence provider translates the query into database-specific SQL."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findDistinctByDepartment(String department);
}`
      },

      bullets: [
        "Spring Data JPA supports query derivation using the Distinct keyword.",
        "The exact generated SQL depends on the JPA provider and query.",
        "For more complex requirements, JPQL or projections can be used.",
        "Understanding SQL DISTINCT helps you understand what the repository query is trying to achieve."
      ]
    },

    {
      id: "jpql-distinct",
      title: "23. DISTINCT in JPQL",

      paragraphs: [
        "JPQL also supports DISTINCT.",
        "JPQL operates on entities and their properties rather than directly using database table and column names."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT DISTINCT e.department
    FROM Employee e
    """)
List<String> findDistinctDepartments();`
      },

      bullets: [
        "Employee is the entity name.",
        "department is the entity property.",
        "JPQL DISTINCT removes duplicate result values.",
        "The persistence provider translates the JPQL into SQL."
      ]
    },

    {
      id: "distinct-api-use",
      title: "24. DISTINCT in REST APIs",

      paragraphs: [
        "A REST API may need unique values for dropdowns, filters, search suggestions, reports, or categories.",
        "Instead of retrieving a large list and removing duplicates in Java, the database can often perform the distinct operation directly."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/departments")
public List<String> getDepartments() {
    return employeeRepository.findDistinctDepartments();
}`
      },

      bullets: [
        "Database returns only the required unique values.",
        "The service does not need to manually remove duplicates.",
        "The API response becomes smaller.",
        "The endpoint has a clear purpose."
      ]
    },

    {
      id: "application-vs-database-distinct",
      title: "25. DISTINCT in Database vs Removing Duplicates in Java",

      paragraphs: [
        "You can technically retrieve all values and remove duplicates in application code, but this may transfer unnecessary data from the database.",
        "When the database can produce the required unique result directly, it is often more efficient and expressive to perform the operation in SQL."
      ],

      code: {
        language: "java",
        code: `// Application-side duplicate removal
List<String> departments = employees.stream()
    .map(Employee::getDepartment)
    .distinct()
    .toList();`
      },

      bullets: [
        "Java Stream distinct() removes duplicate values in application memory.",
        "SQL DISTINCT removes duplicate result rows at the database query level.",
        "For large datasets, pushing the operation to the database can avoid unnecessary data transfer.",
        "The best choice depends on the complete query and application requirements."
      ]
    },

    {
      id: "common-mistakes",
      title: "26. Common DISTINCT Mistakes",

      bullets: [
        "Thinking DISTINCT deletes duplicate records from the table.",
        "Thinking DISTINCT makes every selected column individually unique.",
        "Using DISTINCT to hide an incorrect JOIN.",
        "Using DISTINCT when duplicates are actually required.",
        "Using GROUP BY unnecessarily when only unique values are needed.",
        "Assuming DISTINCT always makes a query faster.",
        "Ignoring NULL behavior.",
        "Forgetting that multiple selected columns form one combination for DISTINCT.",
        "Using DISTINCT without understanding the business requirement.",
        "Using application-side duplicate removal when the database could return the required unique result directly."
      ]
    },

    {
      id: "practical-exercises",
      title: "27. Practical Exercises",

      paragraphs: [
        "Try these queries yourself before looking at the solutions."
      ],

      bullets: [
        "Find all unique departments.",
        "Find all unique job titles.",
        "Find unique department and salary combinations.",
        "Count the number of unique departments.",
        "Find unique departments ordered alphabetically.",
        "Find unique departments for employees earning at least 50000.",
        "Find unique department and job-title combinations.",
        "Explain why DISTINCT should not be used to hide an incorrect JOIN."
      ],

      code: {
        language: "sql",
        code: `-- 1
SELECT DISTINCT department
FROM employees;

-- 2
SELECT DISTINCT job_title
FROM employees;

-- 3
SELECT DISTINCT
    department,
    salary
FROM employees;

-- 4
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;

-- 5
SELECT DISTINCT department
FROM employees
ORDER BY department;

-- 6
SELECT DISTINCT department
FROM employees
WHERE salary >= 50000;

-- 7
SELECT DISTINCT
    department,
    job_title
FROM employees;`
      }
    },

    {
      id: "debugging",
      title: "28. Debugging Unexpected Duplicate Results",

      paragraphs: [
        "If you receive duplicate rows unexpectedly, do not immediately add DISTINCT.",
        "First simplify the query and identify where the duplicate rows are being introduced."
      ],

      code: {
        language: "sql",
        code: `-- Step 1: inspect the base table
SELECT *
FROM employees;

-- Step 2: inspect the relevant columns
SELECT employee_id, employee_name, department
FROM employees;

-- Step 3: add the JOIN
SELECT
    e.employee_id,
    e.employee_name,
    ep.project_id
FROM employees AS e
JOIN employee_projects AS ep
    ON e.employee_id = ep.employee_id;

-- Step 4: if only unique employees are required
SELECT DISTINCT
    e.employee_id,
    e.employee_name
FROM employees AS e
JOIN employee_projects AS ep
    ON e.employee_id = ep.employee_id;`
      },

      bullets: [
        "Check the base rows.",
        "Check the JOIN relationship.",
        "Check the number of matching child rows.",
        "Determine whether repeated rows are expected.",
        "Use DISTINCT only if the final requirement is a unique result."
      ]
    },

    {
      id: "scenario-interview",
      title: "29. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "An application needs a list of unique departments. What SQL would you use?",
          answer:
            "I would use SELECT DISTINCT department FROM employees."
        },
        {
          question:
            "If two employees are in Engineering, how many Engineering values will SELECT DISTINCT department return?",
          answer:
            "It will return Engineering once because duplicate result values are removed."
        },
        {
          question:
            "What happens when DISTINCT is used with department and salary?",
          answer:
            "DISTINCT considers the complete department and salary combination. Duplicate combinations are removed."
        },
        {
          question:
            "Does DISTINCT delete duplicate rows from the database?",
          answer:
            "No. DISTINCT only removes duplicate rows from the query result. It does not modify the stored data."
        },
        {
          question:
            "A JOIN suddenly produces duplicate employees. Should you immediately add DISTINCT?",
          answer:
            "No. First investigate the JOIN condition and relationship. DISTINCT should be used only if the required result is genuinely unique."
        },
        {
          question:
            "How do you count unique departments?",
          answer:
            "Use COUNT(DISTINCT department)."
        },
        {
          question:
            "What is the difference between DISTINCT and GROUP BY?",
          answer:
            "DISTINCT removes duplicate result rows, while GROUP BY forms groups and is commonly used with aggregate functions."
        }
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is DISTINCT?",
          answer:
            "DISTINCT is a SQL keyword used with SELECT to remove duplicate result rows."
        },
        {
          question: "What is SELECT DISTINCT department used for?",
          answer:
            "It returns each distinct department value once."
        },
        {
          question: "Does DISTINCT modify the database?",
          answer:
            "No. DISTINCT only affects the result returned by the SELECT query."
        },
        {
          question: "Does DISTINCT apply to one column only?",
          answer:
            "No. DISTINCT applies to the complete combination of expressions in the SELECT list."
        },
        {
          question: "What happens with SELECT DISTINCT department, salary?",
          answer:
            "The database removes duplicate department-and-salary combinations."
        },
        {
          question: "What is COUNT(DISTINCT department)?",
          answer:
            "It counts the number of unique non-NULL department values."
        },
        {
          question: "Can DISTINCT be used with WHERE?",
          answer:
            "Yes. WHERE filters the qualifying rows, and DISTINCT removes duplicate result rows from the selected expressions."
        },
        {
          question: "Can DISTINCT be used with ORDER BY?",
          answer:
            "Yes, subject to the rules of the particular database system, especially when DISTINCT and ORDER BY expressions interact."
        },
        {
          question: "Can DISTINCT be used with JOIN?",
          answer:
            "Yes. It can be used when the required result should contain unique combinations after joining tables."
        },
        {
          question: "Should DISTINCT be used to fix every duplicate-result problem?",
          answer:
            "No. Unexpected duplicates may indicate an incorrect JOIN condition or misunderstanding of the table relationship."
        },
        {
          question: "What is the difference between SQL DISTINCT and Java Stream distinct()?",
          answer:
            "SQL DISTINCT removes duplicate result rows at the database query level, while Java Stream distinct() removes duplicate elements after data has been loaded into the application."
        },
        {
          question: "Can DISTINCT affect query performance?",
          answer:
            "Yes. Removing duplicates can require additional database processing, especially for large result sets, although the actual cost depends on the query and execution plan."
        },
        {
          question: "What happens to duplicate NULL values with DISTINCT?",
          answer:
            "They are treated as one distinct result value for the purpose of DISTINCT."
        },
        {
          question: "When should you prefer DISTINCT?",
          answer:
            "Use it when the requirement genuinely asks for unique result combinations or values."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "31. Quick Revision",

      bullets: [
        "DISTINCT removes duplicate result rows.",
        "DISTINCT does not delete database records.",
        "SELECT DISTINCT department → returns unique departments.",
        "SELECT DISTINCT col1, col2 → returns unique combinations of col1 and col2.",
        "COUNT(DISTINCT column) → counts unique non-NULL values.",
        "DISTINCT can be combined with WHERE.",
        "DISTINCT can be combined with ORDER BY subject to database rules.",
        "DISTINCT can be used with JOINs.",
        "DISTINCT is different from GROUP BY.",
        "GROUP BY is commonly used with aggregate calculations.",
        "Do not use DISTINCT to hide incorrect JOIN logic.",
        "DISTINCT can require additional database processing.",
        "SQL DISTINCT happens at the database query level.",
        "Java Stream distinct() happens after data reaches the application."
      ]
    },

    {
      id: "one-minute-answer",
      title: "32. One-Minute Interview Answer",

      paragraphs: [
        "DISTINCT is a SQL keyword used with SELECT to remove duplicate result rows. For example, SELECT DISTINCT department FROM employees returns each department only once. When multiple columns are selected, DISTINCT applies to the complete combination of those selected values. We can also use COUNT(DISTINCT department) to count unique non-NULL department values. DISTINCT does not delete or modify the original database records. It can be combined with WHERE, ORDER BY, JOINs, and aggregate functions depending on the requirement. In production, I would not blindly use DISTINCT to solve duplicate results because unexpected duplicates may indicate an incorrect JOIN or query design."
      ]
    },

    {
      id: "revision-notes",
      title: "33. Revision Notes",

      paragraphs: [
        "DISTINCT is used with SELECT to remove duplicate result rows.",
        "SELECT DISTINCT department returns each department value once.",
        "DISTINCT applies to the complete SELECT expression combination.",
        "DISTINCT does not modify or delete database records.",
        "COUNT(DISTINCT column) counts unique non-NULL values.",
        "WHERE filters rows before the final DISTINCT result is produced.",
        "DISTINCT can be useful with JOINs when the required result must be unique.",
        "Unexpected duplicates should be investigated before adding DISTINCT.",
        "GROUP BY is generally used when grouping and aggregate calculations are required.",
        "DISTINCT can require additional database processing, so it should be used intentionally.",
        "For application APIs, database-level DISTINCT can avoid transferring unnecessary duplicate data to the application."
      ]
    }
  ]
};
