
export const logicalOperators = {
  id: 2017,
  title: "Logical Operators — AND, OR, NOT",
  slug: "logical-operators",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Learn how to combine multiple filtering conditions using AND, OR, and NOT, understand operator precedence, parentheses, NULL behavior, and real-world filtering patterns.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "and",
      title: "1. AND Operator",
      paragraphs: [
        "The AND operator combines two or more conditions. A row qualifies only when every condition connected by AND evaluates to TRUE.",
        "AND is commonly used when a query has multiple requirements. For example, if you need employees from Engineering who also earn at least 60000, both conditions must be satisfied.",
        "If even one condition is FALSE, the complete AND expression becomes FALSE."
      ],

      bullets: [
        "AND requires all conditions to be TRUE.",
        "It is commonly used with WHERE and HAVING.",
        "AND is useful when multiple business requirements must be satisfied.",
        "Parentheses can be used when AND is combined with OR."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "and-truth-table",
      title: "2. AND Truth Table",
      paragraphs: [
        "The AND operator returns TRUE only when both conditions are TRUE.",
        "This is useful for understanding how SQL combines multiple WHERE conditions."
      ],

      bullets: [
        "TRUE AND TRUE = TRUE",
        "TRUE AND FALSE = FALSE",
        "FALSE AND TRUE = FALSE",
        "FALSE AND FALSE = FALSE"
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE salary >= 50000
  AND age >= 25;`
      }
    },

    {
      id: "and-multiple",
      title: "3. Using AND with Multiple Conditions",
      paragraphs: [
        "You can use more than two AND conditions in the same WHERE clause.",
        "Every condition must be satisfied for a row to be returned.",
        "For example, an employee might need to belong to Engineering, earn at least 60000, and have at least three years of experience."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary, experience_years
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000
  AND experience_years >= 3;`
      },

      bullets: [
        "Condition 1: employee belongs to Engineering.",
        "Condition 2: salary is at least 60000.",
        "Condition 3: experience is at least 3 years.",
        "Only rows satisfying all three conditions are returned."
      ]
    },

    {
      id: "or",
      title: "4. OR Operator",
      paragraphs: [
        "The OR operator combines conditions where at least one condition must be TRUE.",
        "Unlike AND, OR does not require every condition to be satisfied.",
        "For example, if you want employees from either HR or Finance, OR is appropriate."
      ],

      bullets: [
        "OR requires at least one condition to be TRUE.",
        "If one condition is TRUE, the complete OR expression is TRUE.",
        "OR is useful when there are multiple acceptable alternatives."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';`
      }
    },

    {
      id: "or-truth-table",
      title: "5. OR Truth Table",
      paragraphs: [
        "The OR operator returns FALSE only when both conditions are FALSE."
      ],

      bullets: [
        "TRUE OR TRUE = TRUE",
        "TRUE OR FALSE = TRUE",
        "FALSE OR TRUE = TRUE",
        "FALSE OR FALSE = FALSE"
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'HR'
   OR salary >= 80000;`
      }
    },

    {
      id: "or-multiple",
      title: "6. Using OR with Multiple Conditions",
      paragraphs: [
        "OR can also be used with more than two conditions.",
        "A row qualifies when at least one of the conditions is TRUE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance'
   OR department = 'Legal';`
      },

      bullets: [
        "Employees from HR qualify.",
        "Employees from Finance qualify.",
        "Employees from Legal qualify.",
        "Employees from other departments do not qualify unless another condition is added."
      ]
    },

    {
      id: "not",
      title: "7. NOT Operator",
      paragraphs: [
        "The NOT operator reverses a logical condition.",
        "If the original condition is TRUE, NOT makes it FALSE. If the original condition is FALSE, NOT makes it TRUE.",
        "NOT is useful when you want to exclude rows that satisfy a particular condition."
      ],

      bullets: [
        "NOT TRUE becomes FALSE.",
        "NOT FALSE becomes TRUE.",
        "NOT is commonly used with conditions, IN, BETWEEN, EXISTS, and other predicates.",
        "Be careful when NULL is involved because UNKNOWN remains UNKNOWN when negated."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE NOT department = 'HR';`
      }
    },

    {
      id: "not-equal",
      title: "8. NOT and Not-Equal Conditions",
      paragraphs: [
        "A condition such as NOT department = 'HR' expresses that the department should not be HR.",
        "For simple equality conditions, department <> 'HR' is often easier to read.",
        "However, NOT becomes especially useful for more complex conditions."
      ],

      code: {
        language: "sql",
        code: `-- Using NOT
SELECT employee_name
FROM employees
WHERE NOT department = 'HR';

-- Equivalent simple form
SELECT employee_name
FROM employees
WHERE department <> 'HR';`
      }
    },

    {
      id: "not-in",
      title: "9. NOT with IN",
      paragraphs: [
        "NOT can be combined with IN to exclude multiple values.",
        "This is often cleaner than writing several not-equal conditions."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department NOT IN ('HR', 'Finance');`
      },

      bullets: [
        "IN checks whether a value belongs to a list.",
        "NOT IN excludes values from the list.",
        "NULL values require special attention when NOT IN is used."
      ]
    },

    {
      id: "not-between",
      title: "10. NOT with BETWEEN",
      paragraphs: [
        "NOT BETWEEN can be used when a value should fall outside an inclusive range.",
        "For example, salary NOT BETWEEN 50000 AND 80000 selects salaries outside that range."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary NOT BETWEEN 50000 AND 80000;`
      }
    },

    {
      id: "parentheses",
      title: "11. Using Parentheses",
      paragraphs: [
        "Parentheses make complex conditions explicit and help avoid ambiguity when AND and OR are combined.",
        "They tell SQL exactly which conditions should be evaluated together.",
        "Using parentheses also makes the business rule easier for another developer to understand."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE
    (department = 'Engineering' OR department = 'Finance')
    AND salary >= 50000;`
      },

      bullets: [
        "First identify the grouped OR condition.",
        "Then apply the AND requirement.",
        "Parentheses improve readability and reduce logical mistakes.",
        "They are especially important in complex WHERE clauses."
      ]
    },

    {
      id: "without-parentheses",
      title: "12. Why Parentheses Matter",
      paragraphs: [
        "Consider a query containing both AND and OR. Without parentheses, SQL follows its operator precedence rules.",
        "AND is generally evaluated before OR. Therefore, a query can produce a different result from what a beginner expects.",
        "Adding parentheses removes ambiguity."
      ],

      code: {
        language: "sql",
        code: `-- Potentially misunderstood
SELECT *
FROM employees
WHERE department = 'IT'
   OR department = 'HR'
  AND salary >= 60000;

-- Explicit and easier to understand
SELECT *
FROM employees
WHERE (department = 'IT' OR department = 'HR')
  AND salary >= 60000;`
      },

      bullets: [
        "In the first query, AND has higher precedence than OR.",
        "The second query explicitly requires salary >= 60000 for both departments.",
        "Prefer parentheses when the business rule depends on a specific grouping."
      ]
    },

    {
      id: "operator-precedence",
      title: "13. Logical Operator Precedence",
      paragraphs: [
        "When SQL evaluates a complex condition, operator precedence determines which operators are processed first.",
        "For the logical operators covered here, NOT has higher precedence than AND, and AND has higher precedence than OR.",
        "Even when you know the precedence rules, parentheses are recommended when the condition is not immediately obvious."
      ],

      bullets: [
        "NOT is evaluated before AND.",
        "AND is evaluated before OR.",
        "Parentheses can explicitly control the grouping.",
        "Clear grouping is better than relying only on precedence."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
WHERE NOT department = 'HR'
  AND salary >= 50000
   OR experience_years >= 5;`
      }
    },

    {
      id: "combined-example",
      title: "14. Combining AND, OR, and NOT",
      paragraphs: [
        "Real-world queries often combine all three logical operators.",
        "The most important skill is translating the business requirement into clear logical groups."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE
    (department = 'Engineering' OR department = 'Finance')
    AND salary >= 60000
    AND NOT employee_name = 'Ravi';`
      },

      bullets: [
        "The employee must be from Engineering or Finance.",
        "The employee must earn at least 60000.",
        "The employee named Ravi is excluded.",
        "Parentheses make the OR condition explicit."
      ]
    },

    {
      id: "three-valued-logic",
      title: "15. SQL Three-Valued Logic",
      paragraphs: [
        "SQL uses three logical results: TRUE, FALSE, and UNKNOWN.",
        "UNKNOWN commonly occurs when a comparison involves NULL because NULL represents an unknown or missing value.",
        "The WHERE clause returns rows only when its condition evaluates to TRUE. Rows evaluating to FALSE or UNKNOWN are filtered out."
      ],

      bullets: [
        "TRUE means the condition is satisfied.",
        "FALSE means the condition is not satisfied.",
        "UNKNOWN commonly occurs because of NULL.",
        "WHERE keeps only TRUE results."
      ]
    },

    {
      id: "null-and-and",
      title: "16. NULL with AND",
      paragraphs: [
        "NULL can produce UNKNOWN when used in comparisons. When UNKNOWN is combined with AND, the final result depends on the other condition.",
        "For example, UNKNOWN AND TRUE results in UNKNOWN, while UNKNOWN AND FALSE results in FALSE.",
        "Because WHERE returns only TRUE, neither UNKNOWN nor FALSE produces a returned row."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE salary >= 50000
  AND bonus = 10000;`
      },

      bullets: [
        "If bonus is NULL, bonus = 10000 evaluates to UNKNOWN.",
        "TRUE AND UNKNOWN results in UNKNOWN.",
        "UNKNOWN rows are not returned by WHERE."
      ]
    },

    {
      id: "null-and-or",
      title: "17. NULL with OR",
      paragraphs: [
        "OR behaves differently when UNKNOWN is combined with TRUE or FALSE.",
        "TRUE OR UNKNOWN is TRUE, while FALSE OR UNKNOWN is UNKNOWN.",
        "This is another reason NULL handling must be considered when writing complex filters."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = 'IT'
   OR bonus = 10000;`
      }
    },

    {
      id: "null-not",
      title: "18. NULL with NOT",
      paragraphs: [
        "NOT UNKNOWN remains UNKNOWN.",
        "Therefore, using NOT does not magically turn a NULL comparison into TRUE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE NOT bonus = 10000;`
      },

      bullets: [
        "bonus = 10000 can be UNKNOWN when bonus is NULL.",
        "NOT UNKNOWN remains UNKNOWN.",
        "The row is therefore not returned by WHERE."
      ]
    },

    {
      id: "truth-table",
      title: "19. Logical Truth Table Summary",
      paragraphs: [
        "The following tables are useful for interviews and for understanding SQL logical expressions."
      ],

      bullets: [
        "AND: TRUE + TRUE = TRUE; every other TRUE/FALSE combination is FALSE.",
        "OR: FALSE + FALSE = FALSE; every other TRUE/FALSE combination is TRUE.",
        "NOT: TRUE becomes FALSE and FALSE becomes TRUE.",
        "UNKNOWN is possible when NULL participates in a comparison."
      ]
    },

    {
      id: "where-filtering",
      title: "20. Logical Operators in WHERE",
      paragraphs: [
        "Logical operators are most commonly used inside WHERE clauses to create meaningful filters.",
        "The database evaluates the conditions against candidate rows and returns only rows for which the complete WHERE expression is TRUE."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },

      bullets: [
        "FROM identifies the employee rows.",
        "WHERE applies the logical expression.",
        "AND requires both conditions to be satisfied.",
        "Only qualifying rows appear in the result."
      ]
    },

    {
      id: "having-logical",
      title: "21. Logical Operators with HAVING",
      paragraphs: [
        "AND, OR, and NOT can also be used in HAVING clauses to combine aggregate conditions.",
        "HAVING is applied to groups created by GROUP BY."
      ],

      code: {
        language: "sql",
        code: `SELECT department,
       COUNT(*) AS employee_count,
       AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5
   AND AVG(salary) >= 60000;`
      },

      bullets: [
        "COUNT(*) >= 5 checks the number of employees in each group.",
        "AVG(salary) >= 60000 checks the group's average salary.",
        "AND requires both group-level conditions to be true."
      ]
    },

    {
      id: "case-expression",
      title: "22. Logical Operators with CASE",
      paragraphs: [
        "Logical conditions can also be used inside CASE expressions to produce calculated or categorized results."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name,
       salary,
       CASE
           WHEN salary >= 80000 THEN 'Senior Salary'
           WHEN salary >= 50000 AND salary < 80000 THEN 'Mid Salary'
           ELSE 'Lower Salary'
       END AS salary_category
FROM employees;`
      },

      bullets: [
        "CASE evaluates conditions from top to bottom.",
        "AND can combine multiple conditions inside WHEN.",
        "The first matching WHEN condition determines the result."
      ]
    },

    {
      id: "spring-data-jpa",
      title: "23. Logical Operators in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA supports logical combinations through derived query method names.",
        "For example, And can combine two conditions in a repository method name.",
        "Or can be used to represent alternative conditions."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartmentAndSalaryGreaterThanEqual(
        String department,
        BigDecimal salary
    );

    List<Employee> findByDepartmentOrDepartment(
        String firstDepartment,
        String secondDepartment
    );
}`
      },

      bullets: [
        "And represents a logical AND between conditions.",
        "Or represents alternative conditions.",
        "Long derived method names can become difficult to read.",
        "For complex business rules, JPQL or Specifications may be easier to maintain."
      ]
    },

    {
      id: "jpql-logical",
      title: "24. Logical Operators in JPQL",
      paragraphs: [
        "JPQL supports AND, OR, and NOT just like SQL logical expressions.",
        "JPQL operates on entities and Java entity properties rather than directly on database table names."
      ],

      code: {
        language: "java",
        code: `@Query("""
    SELECT e
    FROM Employee e
    WHERE (e.department = :department1
           OR e.department = :department2)
      AND e.salary >= :minimumSalary
""")
List<Employee> findEmployees(
    @Param("department1") String department1,
    @Param("department2") String department2,
    @Param("minimumSalary") BigDecimal minimumSalary
);`
      }
    },

    {
      id: "dynamic-filtering",
      title: "25. Dynamic Filtering in Applications",
      paragraphs: [
        "Real applications often allow users to select multiple filters such as department, minimum salary, maximum salary, location, and experience.",
        "The backend may dynamically construct a query based on the filters supplied by the user.",
        "When building dynamic queries, the logical grouping must match the business requirement."
      ],

      code: {
        language: "java",
        code: `// Example request
GET /api/employees?department=Engineering&minSalary=60000

// Conceptual filter
department = 'Engineering'
AND salary >= 60000`
      },

      bullets: [
        "Validate incoming filter values.",
        "Use parameterized query mechanisms.",
        "Keep AND/OR grouping explicit.",
        "Avoid string-concatenating raw user input into SQL."
      ]
    },

    {
      id: "real-world-example",
      title: "26. Real-World Employee Search",
      paragraphs: [
        "Suppose an employee search screen has the following business rule: employees must belong to Engineering or Finance, earn at least 60000, and must not be inactive.",
        "This can be represented clearly using parentheses, AND, OR, and NOT."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary, status
FROM employees
WHERE (department = 'Engineering' OR department = 'Finance')
  AND salary >= 60000
  AND NOT status = 'INACTIVE';`
      }
    },

    {
      id: "common-mistakes",
      title: "27. Common Mistakes",
      paragraphs: [
        "Logical operators are simple individually, but incorrect grouping can produce completely different results."
      ],

      bullets: [
        "Forgetting parentheses when combining AND and OR.",
        "Assuming OR means all conditions must be true.",
        "Assuming AND means any one condition can be true.",
        "Using NOT without understanding what condition is being negated.",
        "Ignoring NULL and UNKNOWN behavior.",
        "Using NOT IN when the compared column can contain NULL without understanding the result.",
        "Writing very long derived Spring Data JPA method names that become difficult to maintain.",
        "Concatenating user input directly into SQL.",
        "Using complicated logic without testing individual conditions.",
        "Forgetting that WHERE returns only rows whose complete condition evaluates to TRUE."
      ]
    },

    {
      id: "debugging-logic",
      title: "28. How to Debug a Complex Logical Condition",
      paragraphs: [
        "When a query returns unexpected results, break the condition into smaller pieces.",
        "First test each condition separately, then combine them step by step.",
        "This makes it easier to identify whether the problem is caused by AND, OR, NOT, NULL, or incorrect parentheses."
      ],

      code: {
        language: "sql",
        code: `-- Step 1
SELECT *
FROM employees
WHERE department = 'Engineering';

-- Step 2
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- Step 3
SELECT *
FROM employees
WHERE (department = 'Engineering'
       OR department = 'Finance')
  AND salary >= 60000;

-- Step 4
SELECT *
FROM employees
WHERE (department = 'Engineering'
       OR department = 'Finance')
  AND salary >= 60000
  AND NOT status = 'INACTIVE';`
      }
    },

    {
      id: "practice",
      title: "29. Practice Problems",
      paragraphs: [
        "Practice AND, OR, and NOT using an employees table containing employee_id, employee_name, department, salary, age, experience_years, and status."
      ],

      bullets: [
        "Find employees who belong to Engineering and earn at least 60000.",
        "Find employees who belong to HR or Finance.",
        "Find employees who do not belong to HR.",
        "Find employees who belong to Engineering and have at least 3 years of experience.",
        "Find employees who earn at least 70000 or have at least 5 years of experience.",
        "Find employees from Engineering or Finance whose salary is at least 50000.",
        "Find employees from Engineering or Finance whose salary is at least 60000 and who are not inactive.",
        "Find employees who are not in HR or Finance.",
        "Find employees whose salary is between 50000 and 80000 and who belong to IT.",
        "Find employees who are either from IT with salary >= 60000 or from HR with salary >= 50000."
      ]
    },

    {
      id: "practice-solutions",
      title: "30. Practice Solutions",
      code: {
        language: "sql",
        code: `-- 1. Engineering employees earning at least 60000
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- 2. Employees from HR or Finance
SELECT *
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';

-- 3. Employees not in HR
SELECT *
FROM employees
WHERE NOT department = 'HR';

-- 4. Engineering employees with at least 3 years
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND experience_years >= 3;

-- 5. Salary at least 70000 OR experience at least 5 years
SELECT *
FROM employees
WHERE salary >= 70000
   OR experience_years >= 5;

-- 6. Engineering or Finance with salary at least 50000
SELECT *
FROM employees
WHERE (department = 'Engineering'
       OR department = 'Finance')
  AND salary >= 50000;

-- 7. Engineering or Finance, salary at least 60000,
--    and employee is not inactive
SELECT *
FROM employees
WHERE (department = 'Engineering'
       OR department = 'Finance')
  AND salary >= 60000
  AND NOT status = 'INACTIVE';

-- 8. Employees not in HR or Finance
SELECT *
FROM employees
WHERE department NOT IN ('HR', 'Finance');

-- 9. IT employees with salary between 50000 and 80000
SELECT *
FROM employees
WHERE department = 'IT'
  AND salary >= 50000
  AND salary <= 80000;

-- 10. IT employees earning >= 60000
--     OR HR employees earning >= 50000
SELECT *
FROM employees
WHERE (department = 'IT' AND salary >= 60000)
   OR (department = 'HR' AND salary >= 50000);`
      }
    },

    {
      id: "scenario-interview",
      title: "31. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You need employees from Engineering who earn at least 60000. Which operator should you use?",
          answer:
            "Use AND because both conditions must be satisfied: department = 'Engineering' AND salary >= 60000."
        },
        {
          question:
            "You need employees from either HR or Finance. Which operator should you use?",
          answer:
            "Use OR because either department condition can satisfy the requirement."
        },
        {
          question:
            "You need to exclude HR employees. How can you write the condition?",
          answer:
            "You can use department <> 'HR' or NOT department = 'HR'."
        },
        {
          question:
            "Why are parentheses important in a query containing AND and OR?",
          answer:
            "Parentheses explicitly define which conditions belong together and prevent unintended results caused by operator precedence."
        },
        {
          question:
            "What happens when a WHERE condition evaluates to UNKNOWN?",
          answer:
            "The row is not returned because WHERE keeps rows only when the complete condition evaluates to TRUE."
        },
        {
          question:
            "What happens when NULL is involved in a comparison?",
          answer:
            "A normal comparison with NULL commonly produces UNKNOWN rather than TRUE or FALSE."
        },
        {
          question:
            "How would you find employees from IT or HR who earn at least 60000?",
          answer:
            "Use WHERE (department = 'IT' OR department = 'HR') AND salary >= 60000."
        },
        {
          question:
            "How would you exclude employees from HR and Finance?",
          answer:
            "You can use department NOT IN ('HR', 'Finance')."
        },
        {
          question:
            "What is the safest way to debug a complicated WHERE condition?",
          answer:
            "Test each condition separately, then combine them gradually using parentheses and verify the result at each step."
        }
      ]
    },

    {
      id: "interview",
      title: "32. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is the AND operator in SQL?",
          answer:
            "AND combines conditions and returns TRUE only when all required conditions are TRUE."
        },
        {
          question: "What is the OR operator in SQL?",
          answer:
            "OR combines conditions and returns TRUE when at least one condition is TRUE."
        },
        {
          question: "What is the NOT operator?",
          answer:
            "NOT reverses the logical result of a condition. TRUE becomes FALSE and FALSE becomes TRUE."
        },
        {
          question: "What is the difference between AND and OR?",
          answer:
            "AND requires all conditions to be satisfied, while OR requires at least one condition to be satisfied."
        },
        {
          question: "Why should we use parentheses with AND and OR?",
          answer:
            "Parentheses explicitly control the grouping of conditions, make the query easier to understand, and help prevent logical mistakes."
        },
        {
          question: "What is SQL operator precedence for NOT, AND, and OR?",
          answer:
            "NOT has higher precedence than AND, and AND has higher precedence than OR. Parentheses can be used to make the intended grouping explicit."
        },
        {
          question: "What are the possible logical results in SQL?",
          answer:
            "SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN."
        },
        {
          question: "Why does NULL produce UNKNOWN?",
          answer:
            "NULL represents an unknown or missing value, so a normal comparison cannot determine whether it is equal to or different from another value."
        },
        {
          question: "Does WHERE return rows for UNKNOWN?",
          answer:
            "No. WHERE returns rows only when its condition evaluates to TRUE. FALSE and UNKNOWN rows are filtered out."
        },
        {
          question: "What is TRUE AND UNKNOWN?",
          answer:
            "TRUE AND UNKNOWN results in UNKNOWN."
        },
        {
          question: "What is FALSE AND UNKNOWN?",
          answer:
            "FALSE AND UNKNOWN results in FALSE."
        },
        {
          question: "What is TRUE OR UNKNOWN?",
          answer:
            "TRUE OR UNKNOWN results in TRUE."
        },
        {
          question: "What is FALSE OR UNKNOWN?",
          answer:
            "FALSE OR UNKNOWN results in UNKNOWN."
        },
        {
          question: "What is NOT UNKNOWN?",
          answer:
            "NOT UNKNOWN remains UNKNOWN."
        },
        {
          question: "Can AND, OR, and NOT be used with HAVING?",
          answer:
            "Yes. They can be used to combine aggregate filtering conditions in HAVING."
        },
        {
          question: "Can logical operators be used in CASE expressions?",
          answer:
            "Yes. AND, OR, and NOT can be used inside CASE WHEN conditions."
        },
        {
          question: "How are AND and OR represented in Spring Data JPA?",
          answer:
            "Spring Data JPA supports derived query keywords such as And and Or, as well as JPQL queries containing SQL-like logical operators."
        },
        {
          question: "What is a common mistake with OR?",
          answer:
            "A common mistake is forgetting parentheses when OR is combined with AND, which can cause SQL to evaluate the conditions differently from the intended business rule."
        },
        {
          question: "What is a common mistake with NOT IN?",
          answer:
            "NOT IN can produce unexpected results when NULL is involved. NULL-aware filtering should be considered explicitly."
        },
        {
          question: "How should complex filtering logic be written in production code?",
          answer:
            "Keep the logic readable, use explicit parentheses, parameterize user-supplied values, test edge cases including NULL, and avoid unnecessarily complicated conditions."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "33. Quick Reference",
      bullets: [
        "AND → All conditions must be TRUE.",
        "OR → At least one condition must be TRUE.",
        "NOT → Reverses a condition.",
        "NOT IN → Excludes values from a list.",
        "NOT BETWEEN → Excludes values inside an inclusive range.",
        "AND has higher precedence than OR.",
        "NOT has higher precedence than AND.",
        "Use parentheses to make grouping explicit.",
        "TRUE → Row can qualify.",
        "FALSE → Row does not qualify.",
        "UNKNOWN → Row does not qualify in WHERE.",
        "NULL comparisons commonly produce UNKNOWN."
      ]
    },

    {
      id: "one-minute-answer",
      title: "34. One-Minute Interview Answer",
      paragraphs: [
        "SQL logical operators are used to combine or reverse filtering conditions. AND requires all conditions to be true, OR requires at least one condition to be true, and NOT reverses a condition.",
        "For example, WHERE department = 'Engineering' AND salary >= 60000 returns Engineering employees earning at least 60000. If I want employees from either Engineering or Finance, I use OR.",
        "When AND and OR are combined, I use parentheses to make the intended grouping explicit because AND has higher precedence than OR. SQL also uses three-valued logic: TRUE, FALSE, and UNKNOWN. UNKNOWN commonly occurs with NULL, and WHERE returns only rows where the final condition is TRUE.",
        "In real applications, these operators are used extensively in SQL queries, Spring Data JPA derived queries, JPQL, dynamic filtering, and API search functionality."
      ]
    },

    {
      id: "revision-notes",
      title: "35. Revision Notes",
      bullets: [
        "AND requires every combined condition to be TRUE.",
        "OR requires at least one condition to be TRUE.",
        "NOT reverses a condition.",
        "Use parentheses when combining AND and OR.",
        "NOT has higher precedence than AND.",
        "AND has higher precedence than OR.",
        "SQL uses TRUE, FALSE, and UNKNOWN.",
        "NULL commonly causes comparison results to become UNKNOWN.",
        "WHERE returns rows only when the complete condition is TRUE.",
        "NOT IN should be used carefully when NULL values are possible.",
        "Logical operators can be used with WHERE and HAVING.",
        "Logical conditions can be used inside CASE expressions.",
        "Spring Data JPA supports And and Or in derived query methods.",
        "JPQL supports AND, OR, and NOT.",
        "Use parameterized queries for user-provided values.",
        "Break complex filters into smaller conditions when debugging.",
        "Always test boundary values and NULL behavior.",
        "Clear logical grouping is important for correct business rules."
      ]
    }
  ]
};
