
export const whereVsHaving = {
  id: 2046,
  title: "WHERE vs HAVING",
  slug: "where-vs-having",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Understand the difference between WHERE and HAVING and learn to combine them in SQL queries.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "where-definition",
      title: "1. WHERE Clause",
      paragraphs: [
        "WHERE filters individual input rows before grouping and aggregate calculations.",
        "Suppose a company wants to count employees earning at least 50000 in each department. WHERE salary >= 50000 removes employees whose salaries are below the threshold before GROUP BY creates the department groups.",
        "The COUNT(*) aggregate then counts only the employees that remain after filtering. A department with no qualifying employees will not appear in this grouped result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      1`,
      bullets: [
        "Engineering has three employees earning at least 50000.",
        "Finance has one qualifying employee earning 50000.",
        "HR has no qualifying employees, so it does not appear.",
        "WHERE filters individual records, not completed department totals."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use this six-row dataset to understand the difference between row filtering and group filtering throughout the lesson.",
        "Engineering has three employees, Finance has two employees, and HR has one employee. The salary values also let us see how filtering changes aggregate calculations."
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
        "Engineering salaries: 55000, 60000, and 70000.",
        "Finance salaries: 40000 and 50000.",
        "HR salary: 45000.",
        "All six records are used when no WHERE condition is specified."
      ]
    },
    {
      id: "having-definition",
      title: "3. HAVING Clause",
      paragraphs: [
        "HAVING filters groups after GROUP BY forms them and aggregate values are calculated.",
        "For example, HAVING COUNT(*) >= 2 keeps departments containing at least two employees. Unlike WHERE salary >= 50000, this condition concerns the number of rows in each department rather than an individual employee's salary.",
        "The query below groups all employees first and then removes departments with fewer than two employees."
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
        "Engineering qualifies with three employees.",
        "Finance qualifies with two employees.",
        "HR is excluded because it has only one employee.",
        "The count includes all employees because there is no WHERE filter."
      ]
    },
    {
      id: "combined",
      title: "4. Using WHERE and HAVING Together",
      paragraphs: [
        "A query can use WHERE and HAVING together when both individual rows and completed groups need filtering.",
        "First, WHERE salary >= 45000 removes employees earning less than 45000. GROUP BY then creates department groups from the remaining rows. Finally, HAVING COUNT(*) >= 2 keeps only departments with at least two remaining employees.",
        "The aggregate results are calculated from the rows that survive WHERE. HAVING does not restore rows that WHERE removed."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count  average_salary
-----------  --------------  --------------
Engineering  3               61666.666667`,
      bullets: [
        "WHERE removes Anu because her salary is 40000.",
        "Engineering retains Ravi, Priya, and Kiran.",
        "Finance retains only Meena, and HR retains Rahul.",
        "HAVING removes Finance and HR because each has only one remaining employee.",
        "Engineering's average is (55000 + 60000 + 70000) / 3 = 61666.67 approximately."
      ]
    },
    {
      id: "comparison",
      title: "5. Key Differences",
      paragraphs: [
        "The main difference is the stage at which each clause filters data. WHERE determines which input rows participate in grouping. HAVING determines which completed groups appear in the result.",
        "A useful rule is to ask what the condition describes: an individual employee or an aggregate of multiple employees?"
      ],
      bullets: [
        "WHERE filters individual rows before grouping.",
        "GROUP BY creates groups from the remaining rows.",
        "HAVING filters the groups using group-level conditions.",
        "ORDER BY sorts the final result.",
        "WHERE salary > 50000 is a row-level condition.",
        "HAVING AVG(salary) > 50000 is a group-level condition.",
        "WHERE can be used without GROUP BY; HAVING is often used with GROUP BY but can also appear in aggregate queries without it in many databases."
      ],
      code: {
        language: "sql",
        code: `-- Row-level filtering
SELECT employee_name, department, salary
FROM employees
WHERE salary >= 60000;

-- Group-level filtering
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 50000;`
      },
      output: `The first query returns individual employee records with salary >= 60000.

The second query returns departments whose average salary is >= 50000.`
    },
    {
      id: "execution-order",
      title: "6. Logical Query Processing Order",
      paragraphs: [
        "SQL is written in a particular syntax order, but the database logically processes the main clauses in a different order.",
        "Understanding this order explains why WHERE cannot normally reference an aggregate calculated for the current query's groups and why HAVING can filter aggregate results.",
        "The optimizer may change the physical execution plan while preserving the query's logical meaning."
      ],
      bullets: [
        "FROM: identify the source table or tables.",
        "WHERE: filter individual input rows.",
        "GROUP BY: form groups from the remaining rows.",
        "Aggregate calculations: calculate COUNT(), SUM(), AVG(), MIN(), and MAX() for groups.",
        "HAVING: filter the groups.",
        "SELECT: produce the requested columns and expressions.",
        "ORDER BY: sort the output.",
        "LIMIT or the database-specific row-limiting clause: restrict the returned rows when used."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `FROM -> WHERE -> GROUP BY -> aggregate calculation -> HAVING -> SELECT -> ORDER BY`,
      bullets: [
        "The order above is the logical processing model, not a guarantee that the database physically executes every operation in that exact sequence.",
        "The example filters salaries first, counts the remaining employees by department, removes groups with fewer than two employees, and sorts the final output."
      ]
    },
    {
      id: "where-vs-having-sum",
      title: "7. Compare Filtering Rows and Filtering Totals",
      paragraphs: [
        "A salary condition in WHERE changes which employees contribute to a department's total. A condition in HAVING checks the total calculated from the rows that reached the grouping stage.",
        "Compare the following queries: one totals only salaries of at least 60000, while the other calculates each department's complete salary total and then filters departments by that total."
      ],
      code: {
        language: "sql",
        code: `-- Query A: sum only qualifying employee salaries
SELECT
    department,
    SUM(salary) AS qualifying_salary_total
FROM employees
WHERE salary >= 60000
GROUP BY department
ORDER BY department;

-- Query B: sum every salary, then filter department totals
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 60000
ORDER BY department;`
      },
      output: `Query A:
department   qualifying_salary_total
-----------  -----------------------
Engineering  130000.00

Query B:
department   total_salary
-----------  ------------
Engineering  185000.00
Finance      90000.00`,
      bullets: [
        "Query A excludes salaries below 60000 before calculating totals.",
        "Query B calculates complete department totals before applying the threshold.",
        "Engineering's total differs because Query A includes only 60000 and 70000.",
        "Finance appears in Query B because its full total is 90000, even though neither employee earns 60000."
      ]
    },
    {
      id: "aggregate-where-error",
      title: "8. Why WHERE Cannot Normally Filter Group Aggregates",
      paragraphs: [
        "At the same query level, WHERE is evaluated before grouping and aggregate calculations. Therefore, a condition such as WHERE COUNT(*) > 2 is invalid in an ordinary grouped query.",
        "Use HAVING when you want to filter a group by COUNT(), SUM(), or AVG(). If the requirement involves an aggregate subquery or a window-function result, an appropriate outer query may be needed instead."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect at the same query level:
-- SELECT department, COUNT(*)
-- FROM employees
-- WHERE COUNT(*) > 2
-- GROUP BY department;

-- Correct:
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 2
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3`,
      bullets: [
        "WHERE COUNT(*) > 2 is invalid because COUNT(*) is a group aggregate.",
        "HAVING COUNT(*) > 2 filters departments after their employee counts are calculated.",
        "The result contains Engineering because it has three employees."
      ]
    },
    {
      id: "conditional-aggregation",
      title: "9. Conditional Aggregation: Keep Groups with Zero Matches",
      paragraphs: [
        "Sometimes you want to report every department but count only employees satisfying a condition. Using WHERE alone removes non-qualifying employees before groups are created, which can make departments with zero matches disappear.",
        "Conditional aggregation uses CASE inside an aggregate function. It can preserve departments represented in the input while reporting zero qualifying employees for departments without matches."
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
        "COUNT(*) counts all employee rows in each department.",
        "The CASE expression returns 1 for salaries of at least 60000 and 0 otherwise.",
        "SUM() adds the values returned by CASE.",
        "Finance and HR remain visible even though neither has an employee earning at least 60000."
      ]
    },
    {
      id: "multiple-conditions",
      title: "10. Combining WHERE, HAVING, AND, and OR",
      paragraphs: [
        "WHERE and HAVING can each contain multiple conditions. WHERE conditions apply to individual rows, while HAVING conditions apply to groups.",
        "AND requires all conditions to be true. OR requires at least one condition to be true. Parentheses are useful when combining AND and OR because AND normally has higher precedence than OR."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE salary >= 40000
GROUP BY department
HAVING COUNT(*) >= 2
   AND (
       SUM(salary) > 100000
       OR AVG(salary) >= 45000
   )
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      2               90000.00`,
      bullets: [
        "WHERE salary >= 40000 keeps all six sample employees because their salaries meet the condition.",
        "Engineering qualifies because its employee count is at least two and its total salary exceeds 100000.",
        "Finance qualifies because it has two employees and its average salary is 45000.",
        "HR is excluded because its employee count is one.",
        "Parentheses make the intended OR condition explicit."
      ]
    },
    {
      id: "common-mistakes",
      title: "11. Common Mistakes and Fixes",
      paragraphs: [
        "Many SQL interview questions test whether you can distinguish a condition on an individual record from a condition on an aggregate result."
      ],
      bullets: [
        "Mistake: using WHERE COUNT(*) > 2. Fix: use HAVING COUNT(*) > 2.",
        "Mistake: using HAVING salary >= 50000 when individual employee salaries should be filtered before calculating the average. Fix: use WHERE salary >= 50000.",
        "Mistake: using WHERE salary >= 60000 when the requirement is to display departments whose complete salary total is at least 60000. Fix: calculate the total and use HAVING SUM(salary) >= 60000.",
        "Mistake: expecting departments with no qualifying employees to appear after WHERE removes every row for those departments. Fix: consider conditional aggregation or an outer join from a department table.",
        "Mistake: assuming HAVING sorts groups. Fix: use ORDER BY.",
        "Mistake: moving conditions between WHERE and HAVING without checking their meaning. Fix: determine whether the condition applies to source rows or to a group-level aggregate."
      ],
      code: {
        language: "sql",
        code: `-- Find departments whose complete payroll exceeds 100000
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000
ORDER BY total_salary DESC;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00`
    },
    {
      id: "practice-beginner",
      title: "12. Practice Exercise 1: Filter Employees Before Grouping",
      paragraphs: [
        "Write a query to count employees earning at least 50000 in each department. Return only departments containing at least one qualifying employee."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      1`,
      bullets: [
        "WHERE removes employees earning less than 50000.",
        "GROUP BY creates groups from the remaining rows.",
        "COUNT(*) counts the qualifying employees in each department."
      ]
    },
    {
      id: "practice-intermediate",
      title: "13. Practice Exercise 2: Filter Departments After Grouping",
      paragraphs: [
        "Return departments whose average salary is greater than 45000. Display department, employee count, and average salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 45000
ORDER BY department;`
      },
      output: `department   employee_count  average_salary
-----------  --------------  --------------
Engineering  3               61666.666667`,
      bullets: [
        "The condition is based on the average salary of the whole department.",
        "Engineering's average is approximately 61666.67.",
        "Finance and HR both have averages of 45000, so they do not satisfy the strict > condition."
      ]
    },
    {
      id: "practice-advanced",
      title: "14. Practice Exercise 3: Use WHERE and HAVING Together",
      paragraphs: [
        "Find departments with at least two employees earning 50000 or more, and calculate the average salary using only those qualifying employees."
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
        "WHERE removes employees earning less than 50000.",
        "Engineering has three qualifying employees.",
        "Finance has only one qualifying employee, and HR has none.",
        "HAVING COUNT(*) >= 2 retains Engineering only."
      ]
    },
    {
      id: "performance",
      title: "15. Performance and Best Practices",
      paragraphs: [
        "WHERE can reduce the number of input rows that need grouping when its condition matches the business requirement. HAVING filters groups based on aggregate results.",
        "Modern optimizers may rewrite queries or push suitable conditions to earlier execution stages when doing so preserves SQL semantics. Therefore, choose clauses for correctness first and inspect the execution plan when performance matters."
      ],
      bullets: [
        "Use WHERE for row-level conditions that should affect the input to aggregation.",
        "Use HAVING for conditions involving group aggregates.",
        "Avoid filtering rows in WHERE if those rows must contribute to the reported totals or averages.",
        "Use EXPLAIN or the equivalent execution-plan tool to investigate expensive queries.",
        "Consider indexes that support common filters and grouping patterns, but validate their benefit against actual data and execution plans.",
        "Use explicit ORDER BY when the report needs a predictable order.",
        "For large recurring reports, consider precomputed summaries where the freshness requirements allow them."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is the main difference between WHERE and HAVING?",
          answer:
            "WHERE filters rows before grouping, while HAVING filters groups after grouping."
        },
        {
          question: "Can WHERE use aggregate functions such as SUM() directly?",
          answer:
            "Not directly at the same query level in an ordinary grouped query. Use HAVING for grouped aggregate conditions or a suitable subquery for filtering an aggregate result."
        },
        {
          question: "Can a query use both WHERE and HAVING?",
          answer:
            "Yes. WHERE filters input rows, and HAVING filters the resulting groups."
        },
        {
          question: "Which clause comes first, WHERE or HAVING?",
          answer:
            "In SQL query syntax, WHERE appears before GROUP BY and HAVING appears after GROUP BY."
        },
        {
          question: "How do you find departments with more than two employees?",
          answer:
            "Use GROUP BY department HAVING COUNT(*) > 2."
        },
        {
          question: "Can WHERE be used without GROUP BY?",
          answer:
            "Yes. WHERE filters rows in ordinary SELECT queries, whether or not the query groups the results."
        },
        {
          question: "Can HAVING be used without GROUP BY?",
          answer:
            "Yes, in many SQL databases. An aggregate query without GROUP BY can form one overall group, and HAVING can filter that result."
        },
        {
          question: "Why does WHERE salary >= 60000 produce different results from HAVING SUM(salary) >= 60000?",
          answer:
            "WHERE removes individual employees earning less than 60000 before aggregation. HAVING SUM(salary) >= 60000 checks the complete salary total for each group."
        },
        {
          question: "Does HAVING automatically sort the result?",
          answer:
            "No. Use ORDER BY to specify result ordering."
        },
        {
          question: "How do you retain departments with zero employees meeting a salary condition?",
          answer:
            "Conditional aggregation can count matching rows while preserving existing department groups. To show departments with no employee rows at all, use a department table and an appropriate outer join."
        }
      ]
    },
    {
      id: "revision",
      title: "17. Quick Revision Notes",
      paragraphs: [
        "WHERE and HAVING both filter data, but they filter at different logical stages. WHERE filters input rows before aggregation, while HAVING filters completed groups.",
        "The easiest way to remember the difference is to identify what the condition describes: an individual row or a group-level aggregate."
      ],
      bullets: [
        "WHERE salary >= 50000 filters individual employees.",
        "GROUP BY department creates department groups.",
        "HAVING COUNT(*) > 2 filters groups with more than two rows.",
        "HAVING SUM(salary) > 100000 filters groups by total salary.",
        "HAVING AVG(salary) > 50000 filters groups by average salary.",
        "A query can use WHERE and HAVING together.",
        "WHERE runs before grouping in the logical processing model.",
        "HAVING is evaluated after groups and their aggregate values are formed.",
        "ORDER BY sorts the final output.",
        "Use conditional aggregation when you need to calculate a metric for matching rows while retaining other existing groups."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667`
    }
  ]
};
