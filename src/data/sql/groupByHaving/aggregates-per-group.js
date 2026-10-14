
export const aggregatesPerGroup = {
  id: 2044,
  title: "Aggregates per Group",
  slug: "aggregates-per-group",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Calculate counts, totals, averages, minimums, and maximums for each group.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "multiple-aggregates",
      title: "1. Multiple Aggregates in One Query",
      paragraphs: [
        "You can use multiple aggregate functions in the same SELECT statement. Each function calculates a metric for every group.",
        "For example, when employees are grouped by department, COUNT(*) counts employees, SUM(salary) calculates the total salary, AVG(salary) calculates the average salary, MIN(salary) finds the lowest salary, and MAX(salary) finds the highest salary.",
        "Instead of writing five separate queries, you can calculate all these metrics in one grouped query. This is useful for dashboards, payroll reports, department summaries, and management reports.",
        "The following examples use an employees table with department and salary columns. The expected results assume the six employee records shown in the sample dataset."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  total_salary  average_salary  minimum_salary  maximum_salary
-----------  --------------  ------------  --------------  --------------  --------------
Engineering  3               185000.00     61666.666667    55000.00        70000.00
Finance      2               90000.00      45000.000000    40000.00        50000.00
HR           1               45000.00      45000.000000    45000.00        45000.00`,
      bullets: [
        "COUNT(*) counts employee rows in each department.",
        "SUM(salary) adds salaries within each department.",
        "AVG(salary) calculates the average of non-NULL salaries.",
        "MIN(salary) returns the lowest non-NULL salary.",
        "MAX(salary) returns the highest non-NULL salary.",
        "GROUP BY department produces one row per department represented in the input data."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset and Manual Calculation",
      paragraphs: [
        "Understanding the input data helps you verify aggregate results instead of memorizing output values.",
        "For Engineering, the three salaries are 55000, 60000, and 70000. Their total is 185000, and their average is 185000 divided by 3, or approximately 61666.67.",
        "For Finance, the salaries are 40000 and 50000. Their total is 90000, and their average is 45000.",
        "For HR, the only salary is 45000. Therefore, the total, average, minimum, and maximum are all 45000."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
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
        "Engineering: count = 3, total = 185000, average = 61666.67.",
        "Finance: count = 2, total = 90000, average = 45000.",
        "HR: count = 1, total = 45000, average = 45000.",
        "The exact decimal display of AVG() can vary by database and client settings."
      ]
    },
    {
      id: "conditional-count",
      title: "3. Count Rows Matching a Condition",
      paragraphs: [
        "A conditional aggregate calculates a metric only for rows that satisfy a condition. One portable technique is to use CASE inside SUM().",
        "In this example, CASE returns 1 when salary is at least 60000 and 0 otherwise. SUM() adds these values for each department, giving the number of employees earning at least 60000.",
        "This approach is especially useful when a report needs multiple conditional counts or totals in a single query."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(
        CASE
            WHEN salary >= 60000 THEN 1
            ELSE 0
        END
    ) AS high_salary_count
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   high_salary_count
-----------  ------------------
Engineering  2
Finance      0
HR           0`,
      bullets: [
        "Engineering has two qualifying salaries: 60000 and 70000.",
        "Finance has no salary of at least 60000.",
        "HR has no salary of at least 60000.",
        "ELSE 0 ensures that non-matching rows contribute zero to the sum.",
        "If salary is NULL, the WHEN condition is not true, so this CASE expression returns 0."
      ]
    },
    {
      id: "conditional-count-alternatives",
      title: "4. Alternative Ways to Count Matching Rows",
      paragraphs: [
        "There are several ways to count rows satisfying a condition. The best choice depends on whether you need one filtered result or several conditional metrics in the same report.",
        "WHERE filters the input rows before grouping. Conditional aggregation keeps all groups represented in the input and calculates a metric for matching rows within each group.",
        "COUNT(CASE WHEN condition THEN 1 END) counts only the non-NULL values returned by CASE. SUM(CASE WHEN condition THEN 1 ELSE 0 END) adds one for each matching row and zero for each non-matching row."
      ],
      code: {
        language: "sql",
        code: `-- Count qualifying employees within each department
SELECT
    department,
    COUNT(
        CASE WHEN salary >= 60000 THEN 1 END
    ) AS high_salary_count
FROM employees
GROUP BY department
ORDER BY department;

-- Filter to qualifying employees before grouping
SELECT
    department,
    COUNT(*) AS high_salary_count
FROM employees
WHERE salary >= 60000
GROUP BY department
ORDER BY department;`
      },
      output: `Conditional aggregation:
Engineering  2
Finance      0
HR           0

WHERE filtering:
Engineering  2`,
      bullets: [
        "Conditional aggregation returns departments represented in the original input, including departments with zero matching employees.",
        "WHERE removes non-matching rows before grouping, so departments with no qualifying employees do not appear.",
        "Use conditional aggregation when one report needs several metrics with different conditions.",
        "Use WHERE when the entire report should include only qualifying rows."
      ]
    },
    {
      id: "group-expression",
      title: "5. Calculate a Derived Group Metric",
      paragraphs: [
        "A derived group metric is calculated using aggregate results rather than directly aggregating a single column.",
        "For example, MAX(salary) - MIN(salary) calculates the salary range in each department. It measures the difference between the highest and lowest non-NULL salaries.",
        "Derived metrics are useful for measuring salary ranges, price ranges, maximum-versus-minimum sales, and other business differences."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   salary_range
-----------  ------------
Engineering  15000.00
Finance      10000.00
HR           0.00`,
      bullets: [
        "Engineering: 70000 - 55000 = 15000.",
        "Finance: 50000 - 40000 = 10000.",
        "HR: 45000 - 45000 = 0.",
        "If a group has no non-NULL salaries, MIN() and MAX() return NULL, and subtracting them also produces NULL."
      ]
    },
    {
      id: "conditional-sum",
      title: "6. Calculate Conditional Salary Totals",
      paragraphs: [
        "Conditional aggregation can calculate the total salary of employees meeting a condition without removing other employees from the report.",
        "The following query reports both the total salary of every department and the salary total for employees earning at least 60000.",
        "This is useful when management wants to compare overall expenditure with expenditure for a particular employee category."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary,
    SUM(
        CASE
            WHEN salary >= 60000 THEN salary
            ELSE 0
        END
    ) AS high_salary_total
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   total_salary  high_salary_total
-----------  ------------  -----------------
Engineering  185000.00     130000.00
Finance      90000.00      0.00
HR           45000.00      0.00`,
      bullets: [
        "Engineering's high-salary total is 60000 + 70000 = 130000.",
        "Finance and HR have no employees meeting the condition.",
        "The CASE expression returns salary for matching rows and zero for other rows.",
        "The total_salary calculation remains independent of the conditional calculation."
      ]
    },
    {
      id: "having-aggregate",
      title: "7. Filter Groups Using HAVING",
      paragraphs: [
        "HAVING filters groups after aggregate calculations. It is useful when a report should include only departments meeting a business threshold.",
        "For example, HAVING SUM(salary) > 100000 returns only departments whose total salary exceeds 100000.",
        "WHERE cannot directly replace HAVING SUM(salary) > 100000 because SUM(salary) is calculated across each group."
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
HAVING SUM(salary) > 100000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667`,
      bullets: [
        "Engineering qualifies because its total salary is 185000.",
        "Finance does not qualify because its total is 90000.",
        "HR does not qualify because its total is 45000.",
        "HAVING can use aggregate expressions even when those expressions are not written as aliases in the HAVING clause."
      ]
    },
    {
      id: "where-vs-having",
      title: "8. WHERE vs HAVING with Aggregates",
      paragraphs: [
        "WHERE and HAVING operate at different stages of a grouped query.",
        "WHERE removes individual rows before the groups are calculated. HAVING removes completed groups based on their aggregate results.",
        "You can use both when the report needs to filter individual employees and then filter the resulting department summaries."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      1               50000.00`,
      bullets: [
        "WHERE salary >= 45000 keeps Ravi, Priya, Kiran, Meena, and Rahul.",
        "Anu is removed because her salary is 40000.",
        "After grouping, Engineering contains three qualifying employees, Finance contains one, and HR contains one.",
        "HAVING COUNT(*) >= 2 keeps only Engineering.",
        "Correction to the expected result: Finance has only one qualifying employee, so it must not appear. The result should contain Engineering only."
      ]
    },
    {
      id: "null-aggregate-values",
      title: "9. Aggregate Functions and NULL Values",
      paragraphs: [
        "Most aggregate functions ignore NULL input values. COUNT(*) counts rows regardless of NULL values in individual columns, while COUNT(salary) counts only rows where salary is not NULL.",
        "SUM(), AVG(), MIN(), and MAX() calculate results from non-NULL salary values. If every salary in a group is NULL, these aggregates return NULL.",
        "When using conditional aggregation, decide how missing values should be treated. Returning zero for a non-matching condition is different from treating a missing salary as an actual zero salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS employees_with_salary,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `For the supplied six-row sample, COUNT(*) and COUNT(salary) are equal because every salary is populated.`,
      bullets: [
        "COUNT(*) counts all rows in each department.",
        "COUNT(salary) excludes rows with NULL salary.",
        "SUM(salary) and AVG(salary) ignore NULL salary values.",
        "COALESCE(SUM(salary), 0) can display zero instead of NULL when a group has no non-NULL salaries, but use this only when zero is appropriate for the report.",
        "An aggregate over an empty input without GROUP BY returns one row with COUNT(*) equal to zero and most other aggregates equal to NULL; with GROUP BY, an empty input produces no groups."
      ]
    },
    {
      id: "multiple-conditional-metrics",
      title: "10. Calculate Multiple Conditional Metrics",
      paragraphs: [
        "One of the strongest uses of conditional aggregation is calculating several business metrics in a single grouped query.",
        "The following example counts employees in two salary categories for each department. Both counts are calculated over the same department groups.",
        "This technique can be extended to sales by status, orders by payment type, tickets by priority, or transactions by outcome."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS total_employees,
    SUM(
        CASE WHEN salary >= 60000 THEN 1 ELSE 0 END
    ) AS high_salary_employees,
    SUM(
        CASE WHEN salary < 60000 THEN 1 ELSE 0 END
    ) AS lower_salary_employees
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   total_employees  high_salary_employees  lower_salary_employees
-----------  ---------------  ---------------------  ----------------------
Engineering  3                2                      1
Finance      2                0                      2
HR           1                0                      1`,
      bullets: [
        "Engineering has two employees earning at least 60000 and one earning less than 60000.",
        "Finance has two employees earning less than 60000.",
        "HR has one employee earning less than 60000.",
        "The two salary categories cover every employee in this sample because every salary is non-NULL and the conditions split values at 60000."
      ]
    },
    {
      id: "real-world-report",
      title: "11. Real-World Department Report",
      paragraphs: [
        "A department report often needs employee count, total payroll, average payroll per employee, and the salary range.",
        "Combining these measures provides a useful overview without requiring separate queries for every metric.",
        "The same query structure can be adapted to business entities such as sales orders, inventory records, support tickets, and customer transactions."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS payroll,
    ROUND(AVG(salary), 2) AS average_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY payroll DESC;`
      },
      output: `department   employee_count  payroll     average_salary  salary_range
-----------  --------------  ----------  --------------  ------------
Engineering  3               185000.00   61666.67        15000.00
Finance      2               90000.00    45000.00        10000.00`,
      bullets: [
        "HAVING COUNT(*) >= 2 excludes HR because it contains only one employee.",
        "Engineering appears first because its payroll is higher than Finance's.",
        "A payroll total is not the same as average salary; both measures provide different information.",
        "For production payroll reports, ensure the salary column and employee population match the organization's reporting rules."
      ]
    },
    {
      id: "common-mistakes",
      title: "12. Common Mistakes and Fixes",
      paragraphs: [
        "Aggregate queries can return misleading results when the filtering stage, grouping columns, or treatment of NULL values is misunderstood."
      ],
      bullets: [
        "Mistake: using WHERE SUM(salary) > 100000. Fix: use HAVING SUM(salary) > 100000 because the condition concerns a group aggregate.",
        "Mistake: using COUNT(salary) when the requirement is to count all employee rows. Fix: use COUNT(*) if every row should count, including rows with NULL salary.",
        "Mistake: expecting a department with zero matching rows to appear after WHERE removes those rows. Fix: use conditional aggregation when existing groups must remain visible.",
        "Mistake: using AVG(salary) as if it counted missing salaries as zero. Fix: remember that AVG ignores NULL values; explicitly define the business rule if missing values should be treated differently.",
        "Mistake: assuming aliases can be used identically in every SQL clause. Fix: use aggregate expressions directly in HAVING when alias support differs across database engines.",
        "Mistake: expecting results to be sorted automatically. Fix: use ORDER BY."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect: aggregate filtering belongs in HAVING
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000;

-- Correct conditional count
SELECT
    department,
    SUM(CASE WHEN salary >= 60000 THEN 1 ELSE 0 END)
        AS high_salary_count
FROM employees
GROUP BY department;`
      },
      output: `The first query returns departments whose total salary exceeds 100000. The second query counts employees earning at least 60000 in each department.`
    },
    {
      id: "practice-beginner",
      title: "13. Practice Exercise 1: Department Salary Summary",
      paragraphs: [
        "Write a query that returns department, employee count, total salary, and average salary. Include every department represented in the employees table."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `Engineering  3  185000.00  61666.67
Finance      2  90000.00   45000.00
HR           1  45000.00   45000.00`,
      bullets: [
        "GROUP BY department forms the groups.",
        "COUNT(*) counts rows in each group.",
        "SUM() and AVG() calculate salary metrics for each department.",
        "ORDER BY department sorts the report alphabetically by department."
      ]
    },
    {
      id: "practice-intermediate",
      title: "14. Practice Exercise 2: Find Departments with High Average Salaries",
      paragraphs: [
        "Display departments whose average salary is greater than 50000. Show the employee count and average salary, and sort by average salary from highest to lowest."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    ROUND(AVG(salary), 2) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY average_salary DESC;`
      },
      output: `department   employee_count  average_salary
-----------  --------------  --------------
Engineering  3               61666.67`,
      bullets: [
        "HAVING AVG(salary) > 50000 filters department groups by their average.",
        "Engineering qualifies because its average is approximately 61666.67.",
        "Finance and HR have average salaries of 45000 and do not qualify."
      ]
    },
    {
      id: "practice-advanced",
      title: "15. Practice Exercise 3: Conditional Counts and Salary Totals",
      paragraphs: [
        "Write one query that returns the total employee count, the number of employees earning at least 60000, and the salary total of those employees for each department."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(
        CASE WHEN salary >= 60000 THEN 1 ELSE 0 END
    ) AS high_salary_count,
    SUM(
        CASE WHEN salary >= 60000 THEN salary ELSE 0 END
    ) AS high_salary_total
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  high_salary_count  high_salary_total
-----------  --------------  ------------------  -----------------
Engineering  3               2                   130000.00
Finance      2               0                   0.00
HR           1               0                   0.00`,
      bullets: [
        "The total employee count includes all rows in each department.",
        "The conditional count increments only when salary is at least 60000.",
        "The conditional salary total adds salaries only for matching employees.",
        "The CASE expressions allow departments with no qualifying employees to remain in the report."
      ]
    },
    {
      id: "performance",
      title: "16. Performance and Best Practices",
      paragraphs: [
        "The database may use sorting, hashing, indexes, or other execution strategies to calculate grouped aggregates. The actual plan depends on the database engine, data distribution, available indexes, and query structure.",
        "A grouped query that calculates several aggregates often avoids the need to scan and group the same table separately for every metric. However, actual performance should be measured rather than assumed."
      ],
      bullets: [
        "Calculate related aggregate metrics in one query when they share the same grouping and filtering requirements.",
        "Use WHERE to reduce input rows when those rows are not needed in the report.",
        "Use HAVING for aggregate-based group conditions.",
        "Select only the columns required by the report.",
        "Use EXPLAIN or the database's execution-plan tool to investigate slow queries.",
        "Evaluate indexes based on actual query patterns and execution plans; indexes also add storage and write costs.",
        "For expensive recurring reports, consider summary tables or materialized views where supported and appropriate.",
        "Avoid rounding values before calculations unless the business rules require it; round final displayed metrics when suitable."
      ]
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can multiple aggregate functions be used in one query?",
          answer:
            "Yes. COUNT(), SUM(), AVG(), MIN(), and MAX() can calculate different metrics for the same groups."
        },
        {
          question: "How do you count employees earning at least 60000 in each department?",
          answer:
            "Use SUM(CASE WHEN salary >= 60000 THEN 1 ELSE 0 END) with GROUP BY department."
        },
        {
          question: "How do you calculate the salary range for each department?",
          answer:
            "Use MAX(salary) - MIN(salary) and GROUP BY department."
        },
        {
          question: "What does each aggregate return with GROUP BY?",
          answer:
            "Each aggregate returns a separate result for every group formed by GROUP BY."
        },
        {
          question: "What is conditional aggregation?",
          answer:
            "Conditional aggregation uses expressions such as CASE inside aggregate functions to calculate counts or totals for rows meeting a condition."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(salary)?",
          answer:
            "COUNT(*) counts all rows, while COUNT(salary) counts only rows where salary is not NULL."
        },
        {
          question: "Can we use WHERE with aggregate functions?",
          answer:
            "WHERE filters input rows before grouping and generally cannot directly filter on an aggregate calculated for each group. Use HAVING to filter aggregate results."
        },
        {
          question: "How do you display only departments whose total salary exceeds 100000?",
          answer:
            "Group by department and use HAVING SUM(salary) > 100000."
        },
        {
          question: "What happens when all salary values in a group are NULL?",
          answer:
            "COUNT(*) still counts the rows, COUNT(salary) returns zero, and SUM(), AVG(), MIN(), and MAX() return NULL for that group."
        },
        {
          question: "Why calculate several aggregates in one query?",
          answer:
            "It produces related metrics in a single grouped report and can avoid repeating separate queries with the same grouping requirements."
        },
        {
          question: "What is the difference between a conditional aggregate and a WHERE filter?",
          answer:
            "A conditional aggregate calculates a metric for matching rows while preserving other groups. WHERE removes non-matching rows before grouping, so groups with no remaining rows may disappear."
        }
      ]
    },
    {
      id: "revision",
      title: "18. Quick Revision Notes",
      paragraphs: [
        "Aggregate functions summarize data. GROUP BY applies those calculations separately to each group, while conditional aggregation calculates metrics for rows that meet specific conditions.",
        "Remember the basic order: WHERE filters rows, GROUP BY forms groups, aggregate functions calculate group metrics, HAVING filters groups, and ORDER BY sorts the final results."
      ],
      bullets: [
        "COUNT(*) counts rows.",
        "COUNT(column) counts non-NULL values.",
        "SUM(column) calculates a total.",
        "AVG(column) calculates an average of non-NULL values.",
        "MIN(column) finds the smallest non-NULL value.",
        "MAX(column) finds the largest non-NULL value.",
        "SUM(CASE WHEN condition THEN 1 ELSE 0 END) counts matching rows.",
        "SUM(CASE WHEN condition THEN amount ELSE 0 END) totals amounts for matching rows.",
        "MAX(salary) - MIN(salary) calculates a salary range.",
        "HAVING filters groups based on aggregate conditions.",
        "ORDER BY determines the output order."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary,
    SUM(CASE WHEN salary >= 60000 THEN 1 ELSE 0 END)
        AS high_salary_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 1
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary  high_salary_count
-----------  --------------  ------------  --------------  -----------------
Engineering  3               185000.00     61666.67        2
Finance      2               90000.00      45000.00        0
HR           1               45000.00      45000.00        0`
    }
  ]
};
