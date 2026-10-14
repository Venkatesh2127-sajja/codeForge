
export const filteringGroupsWithAggregates = {
  id: 2047,
  title: "Filtering Groups with Aggregates",
  slug: "filtering-groups-with-aggregates",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn to filter grouped SQL results using aggregate conditions and multiple HAVING expressions.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "count-filter",
      title: "1. Filter Groups by COUNT()",
      paragraphs: [
        "Use HAVING COUNT(*) to keep groups that contain a required number of rows.",
        "For example, a company may want to identify departments with at least two employees. GROUP BY department creates one group for each department, and COUNT(*) counts the employee rows in each group.",
        "HAVING COUNT(*) >= 2 then removes groups that contain fewer than two employees. The condition applies to each department's count, not to an individual employee."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2`,
      bullets: [
        "Engineering has three employees and qualifies.",
        "Finance has two employees and qualifies.",
        "HR has one employee and is excluded.",
        "COUNT(*) counts rows, including rows whose other columns contain NULL."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use the following six employee records to understand how aggregate filters work. The same dataset is used throughout this lesson so you can compare each result consistently.",
        "Each employee belongs to a department and has a salary. Grouping by department allows us to calculate department-level employee counts, salary totals, and average salaries."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    department,
    salary
FROM employees
ORDER BY employee_id;`
      },
      output: `employee_id  employee_name  department   salary
-----------  -------------  -----------  -------
1            Ravi           Engineering  55000.00
2            Priya          Engineering  60000.00
3            Kiran          Engineering  70000.00
4            Anu            Finance      40000.00
5            Meena          Finance      50000.00
6            Rahul          HR           45000.00`,
      bullets: [
        "Engineering count: 3; salary total: 185000; average: 61666.67 approximately.",
        "Finance count: 2; salary total: 90000; average: 45000.",
        "HR count: 1; salary total: 45000; average: 45000.",
        "The complete salary total is 320000."
      ]
    },
    {
      id: "sum-filter",
      title: "3. Filter Groups by SUM()",
      paragraphs: [
        "SUM() calculates the total value of a column within each group. HAVING can then keep only groups whose total meets a specified threshold.",
        "This is useful for payroll reports, sales summaries, department budgets, and order totals.",
        "The condition HAVING SUM(salary) >= 90000 includes departments whose total salary is exactly 90000 or greater."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 90000
ORDER BY department;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance      90000.00`,
      bullets: [
        "Engineering qualifies because its total is 185000.",
        "Finance qualifies because its total is exactly 90000.",
        "HR is excluded because its total is 45000.",
        "The >= operator includes a group whose total equals the threshold."
      ]
    },
    {
      id: "avg-filter",
      title: "4. Filter Groups by AVG()",
      paragraphs: [
        "AVG() calculates the average of non-NULL values within each group. HAVING AVG(salary) can filter departments based on their average salary.",
        "The condition AVG(salary) > 45000 excludes groups whose average is exactly 45000 because the comparison is strictly greater than.",
        "Average salary and total salary measure different things. A department with a large number of employees may have a high total salary without having the highest average."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 45000
ORDER BY department;`
      },
      output: `department   average_salary
-----------  --------------
Engineering  61666.666667`,
      bullets: [
        "Engineering average: 185000 / 3 = 61666.67 approximately.",
        "Finance average: 90000 / 2 = 45000.",
        "HR average: 45000.",
        "Only Engineering has an average greater than 45000."
      ]
    },
    {
      id: "multiple-conditions",
      title: "5. Combine Aggregate Conditions",
      paragraphs: [
        "HAVING can contain multiple aggregate conditions. A group must satisfy both conditions when they are connected by AND.",
        "In this example, a department must contain at least two employees and have an average salary of at least 45000.",
        "If either condition is false, the department is excluded. This is useful when a business report has multiple qualification rules."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
   AND AVG(salary) >= 45000
ORDER BY department;`
      },
      output: `department   employee_count  average_salary
-----------  --------------  --------------
Engineering  3               61666.666667
Finance      2               45000.000000`,
      bullets: [
        "Engineering satisfies both conditions.",
        "Finance has two employees and an average salary of 45000.",
        "HR has an average salary of 45000 but only one employee, so it fails the count condition.",
        "AND requires every specified condition to be true."
      ]
    },
    {
      id: "or-conditions",
      title: "6. Combine Aggregate Conditions with OR",
      paragraphs: [
        "OR allows a group to qualify when at least one condition is true.",
        "For example, a report may need departments with at least three employees or a total salary greater than 100000.",
        "Parentheses help make the intended logic clear when AND and OR appear together."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 3
    OR SUM(salary) > 100000
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00`,
      bullets: [
        "Engineering qualifies because it has three employees and a total salary of 185000.",
        "Finance meets neither condition.",
        "HR meets neither condition.",
        "A department satisfying either condition would be included even if the other condition were false."
      ]
    },
    {
      id: "having-min-max",
      title: "7. Filter Groups by MIN() and MAX()",
      paragraphs: [
        "HAVING can also filter groups using the minimum and maximum values within each group.",
        "For example, you may want departments whose highest salary is at least 60000 or whose lowest salary is below 45000.",
        "MIN() and MAX() ignore NULL values. If a group has no non-NULL salaries, the result of these aggregate functions is NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
HAVING MAX(salary) >= 60000
ORDER BY department;`
      },
      output: `department   minimum_salary  maximum_salary
-----------  --------------  --------------
Engineering  55000.00        70000.00`,
      bullets: [
        "Engineering qualifies because its maximum salary is 70000.",
        "Finance has a maximum salary of 50000.",
        "HR has a maximum salary of 45000.",
        "HAVING MAX(salary) >= 60000 filters groups using their maximum values."
      ]
    },
    {
      id: "where-vs-having",
      title: "8. WHERE vs HAVING",
      paragraphs: [
        "WHERE filters individual input rows before grouping. HAVING filters groups after aggregate calculations.",
        "For example, WHERE salary >= 50000 means that only employees earning at least 50000 participate in the aggregation. HAVING SUM(salary) >= 90000 means that the department's calculated total must be at least 90000.",
        "Moving a condition from WHERE to HAVING can change the meaning of the query because the two clauses operate on different levels."
      ],
      code: {
        language: "sql",
        code: `-- Filter employees before grouping
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY department;

-- Filter departments after grouping
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 90000
ORDER BY department;`
      },
      output: `First query:
Engineering  3
Finance      1

Second query:
Engineering  185000.00
Finance      90000.00`,
      bullets: [
        "WHERE changes which employee rows contribute to the aggregate.",
        "HAVING evaluates an aggregate result for each group.",
        "The first query returns qualifying employee counts.",
        "The second query returns departments with sufficiently high total salaries."
      ]
    },
    {
      id: "where-and-having",
      title: "9. Combine WHERE and HAVING",
      paragraphs: [
        "A query can use WHERE to select qualifying employees and HAVING to select qualifying departments.",
        "In this example, employees earning at least 45000 are considered first. The query then keeps departments with at least two qualifying employees.",
        "Both the count and salary total are calculated from the rows that survive WHERE."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS qualifying_employees,
    SUM(salary) AS qualifying_salary_total
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   qualifying_employees  qualifying_salary_total
-----------  --------------------  -----------------------
Engineering  3                     185000.00`,
      bullets: [
        "WHERE removes Anu because her salary is 40000.",
        "Engineering has three qualifying employees.",
        "Finance has one qualifying employee, and HR has one qualifying employee.",
        "HAVING removes Finance and HR because their qualifying counts are below two."
      ]
    },
    {
      id: "conditional-aggregation",
      title: "10. Count Matching Rows Without Losing Other Groups",
      paragraphs: [
        "Sometimes you want to display every department while counting only employees who meet a condition.",
        "Using WHERE salary >= 60000 removes employees who do not meet the salary threshold before grouping. Departments without qualifying employees can disappear.",
        "Conditional aggregation with CASE lets you count matching rows while retaining groups represented in the original input."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS total_employees,
    SUM(
        CASE
            WHEN salary >= 60000 THEN 1
            ELSE 0
        END
    ) AS high_salary_employees
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   total_employees  high_salary_employees
-----------  ---------------  ---------------------
Engineering  3                2
Finance      2                0
HR           1                0`,
      bullets: [
        "COUNT(*) counts all employees in each department.",
        "CASE returns 1 when salary is at least 60000 and 0 otherwise.",
        "SUM() adds the CASE results to calculate the number of matching employees.",
        "Finance and HR remain visible with zero high-salary employees."
      ]
    },
    {
      id: "common-mistakes",
      title: "11. Common Mistakes and Fixes",
      paragraphs: [
        "When using HAVING, make sure the condition matches the business requirement and the level of data being filtered."
      ],
      bullets: [
        "Mistake: using WHERE COUNT(*) >= 2. Fix: use HAVING COUNT(*) >= 2 because COUNT(*) is an aggregate.",
        "Mistake: using HAVING salary >= 50000 when individual salaries must be filtered before averaging. Fix: use WHERE salary >= 50000.",
        "Mistake: using > when the requirement includes the exact threshold. Fix: use >= when equality should qualify.",
        "Mistake: using AND when either condition should qualify a group. Fix: use OR when at least one condition must be true.",
        "Mistake: assuming HAVING sorts the output. Fix: use ORDER BY.",
        "Mistake: expecting groups with zero matching rows to appear after WHERE removes those rows. Fix: consider conditional aggregation or an outer join from a department table."
      ],
      code: {
        language: "sql",
        code: `-- Correct: filter groups with at least two employees
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2`
    },
    {
      id: "practice-beginner",
      title: "12. Practice Exercise 1: Filter by Employee Count",
      paragraphs: [
        "Write a query that displays departments with at least two employees. Return the department and employee count."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2`,
      bullets: [
        "GROUP BY creates department groups.",
        "COUNT(*) calculates each group's size.",
        "HAVING keeps groups with at least two employees."
      ]
    },
    {
      id: "practice-intermediate",
      title: "13. Practice Exercise 2: Filter by Total and Average Salary",
      paragraphs: [
        "Find departments with a total salary of at least 90000 and an average salary of at least 45000. Both conditions must be satisfied."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 90000
   AND AVG(salary) >= 45000
ORDER BY department;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667
Finance      2               90000.00      45000.000000`,
      bullets: [
        "Engineering satisfies both conditions.",
        "Finance satisfies both conditions exactly or above the required thresholds.",
        "HR does not satisfy the total salary condition.",
        "AND requires both aggregate conditions to be true."
      ]
    },
    {
      id: "practice-advanced",
      title: "14. Practice Exercise 3: Filter Rows and Then Groups",
      paragraphs: [
        "Find departments with at least two employees earning 50000 or more. Display the qualifying employee count and their average salary.",
        "Use WHERE to filter employees before grouping and HAVING to filter the resulting departments."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS qualifying_employees,
    AVG(salary) AS qualifying_average_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   qualifying_employees  qualifying_average_salary
-----------  --------------------  --------------------------
Engineering  3                     61666.666667`,
      bullets: [
        "Engineering has three employees earning at least 50000.",
        "Finance has only one qualifying employee.",
        "HR has no qualifying employees.",
        "HAVING removes departments with fewer than two qualifying employees."
      ]
    },
    {
      id: "performance",
      title: "15. Performance and Best Practices",
      paragraphs: [
        "Aggregate filtering can be expensive on large tables because the database may need to read many rows and calculate groups. The actual execution plan depends on the database engine, indexes, data distribution, and query structure.",
        "Choose WHERE and HAVING based on correctness first. The database optimizer may push suitable predicates earlier in execution when that preserves the query's meaning."
      ],
      bullets: [
        "Use WHERE for valid row-level filters before grouping.",
        "Use HAVING for aggregate-based group filters.",
        "Calculate related metrics in one grouped query when their grouping and filtering requirements are the same.",
        "Select only the columns needed for the report.",
        "Use EXPLAIN or the equivalent execution-plan tool to investigate expensive queries.",
        "Evaluate indexes based on actual query patterns; indexes consume storage and may increase the cost of inserts, updates, and deletes.",
        "Consider summary tables or materialized views for expensive recurring reports when appropriate.",
        "Use ORDER BY explicitly when a stable output order is required."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you filter groups containing at least two employees?",
          answer:
            "Use GROUP BY department HAVING COUNT(*) >= 2."
        },
        {
          question: "Can HAVING filter groups by total salary?",
          answer:
            "Yes. Use HAVING SUM(salary) with the required comparison, such as HAVING SUM(salary) >= 90000."
        },
        {
          question: "Can multiple aggregate functions be used in HAVING?",
          answer:
            "Yes. For example, HAVING COUNT(*) >= 2 AND AVG(salary) > 40000 filters groups using both employee count and average salary."
        },
        {
          question: "What is the difference between HAVING COUNT(*) and WHERE?",
          answer:
            "HAVING COUNT(*) filters groups by their row counts. WHERE filters individual rows before grouping."
        },
        {
          question: "Can HAVING use SUM(), AVG(), MIN(), and MAX()?",
          answer:
            "Yes. HAVING can filter groups using aggregate results such as SUM(salary), AVG(salary), MIN(salary), and MAX(salary)."
        },
        {
          question: "What is the difference between AND and OR in HAVING?",
          answer:
            "AND requires every condition to be true. OR requires at least one condition to be true."
        },
        {
          question: "Can WHERE and HAVING appear in the same query?",
          answer:
            "Yes. WHERE filters input rows, and HAVING filters the groups formed from the remaining rows."
        },
        {
          question: "Why might a department not appear after WHERE filtering?",
          answer:
            "If WHERE removes all rows belonging to that department, no group is formed for it in the filtered input."
        },
        {
          question: "How can you count qualifying employees while displaying every existing department?",
          answer:
            "Use conditional aggregation, such as SUM(CASE WHEN salary >= 60000 THEN 1 ELSE 0 END), rather than filtering all other employees out with WHERE."
        },
        {
          question: "Does HAVING automatically sort results?",
          answer:
            "No. Use ORDER BY to specify the output order."
        }
      ]
    },
    {
      id: "revision",
      title: "17. Quick Revision Notes",
      paragraphs: [
        "HAVING filters grouped results based on aggregate conditions. It is commonly used with COUNT(), SUM(), AVG(), MIN(), and MAX().",
        "The key idea is that GROUP BY forms the groups, aggregate functions calculate group-level values, and HAVING decides which groups remain in the final result."
      ],
      bullets: [
        "HAVING COUNT(*) >= 2 keeps groups containing at least two rows.",
        "HAVING SUM(salary) >= 90000 filters groups by total salary.",
        "HAVING AVG(salary) > 45000 filters groups by average salary.",
        "AND requires all conditions to be true.",
        "OR requires at least one condition to be true.",
        "WHERE filters individual rows before grouping.",
        "HAVING filters groups after aggregation.",
        "Conditional aggregation can preserve existing groups with zero matching rows.",
        "ORDER BY sorts the final result.",
        "Use the clause that matches the business requirement rather than moving conditions between WHERE and HAVING blindly."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
   AND SUM(salary) >= 90000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667
Finance      2               90000.00      45000.000000`
    }
  ]
};
