
export const aggregateFunctionsExercises = {
  id: 2040,
  title: "Aggregate Functions Exercises",
  slug: "aggregate-functions-exercises",
  topicTitle: "Aggregate Functions",
  description:
    "Practice COUNT, SUM, AVG, MIN, MAX, DISTINCT, and NULL handling with SQL exercises and solutions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "setup",
      title: "1. Practice Dataset",
      paragraphs: [
        "These exercises use an employees table containing six employees across Engineering, HR, and Finance. The table includes employee IDs, names, departments, and salaries.",
        "The salary values total 320000. Engineering has three employees with a combined salary of 185000, Finance has two employees with a combined salary of 90000, and HR has one employee with a salary of 45000.",
        "Run this setup once before attempting the exercises. If an employees table already exists from another lesson, use the existing table only if its columns and data match these examples. Otherwise, use a separate practice database or rename the table to avoid conflicts."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (1, 'Ravi', 'Engineering', 60000),
    (2, 'Priya', 'HR', 45000),
    (3, 'Kiran', 'Engineering', 70000),
    (4, 'Anu', 'Finance', 50000),
    (5, 'Meena', 'Engineering', 55000),
    (6, 'Arun', 'Finance', 40000);

SELECT *
FROM employees
ORDER BY employee_id;`
      },
      output: `employee_id  employee_name  department   salary
-----------  -------------  -----------  --------
1            Ravi           Engineering  60000.00
2            Priya          HR           45000.00
3            Kiran          Engineering  70000.00
4            Anu            Finance      50000.00
5            Meena          Engineering  55000.00
6            Arun           Finance      40000.00`
    },
    {
      id: "aggregate-cheat-sheet",
      title: "2. Aggregate Functions Quick Reference",
      paragraphs: [
        "An aggregate function summarizes multiple input rows into a calculated value. Without GROUP BY, a scalar aggregate query normally returns one result row, even if the input contains no matching records.",
        "COUNT(*) counts input rows. COUNT(column) counts non-NULL values in that column. COUNT(DISTINCT column) counts distinct non-NULL values.",
        "SUM() adds non-NULL numeric values, AVG() calculates their average, and MIN() and MAX() find the smallest and largest non-NULL values.",
        "WHERE filters input rows before aggregation. GROUP BY calculates separate aggregates for groups, while HAVING filters those groups after aggregation."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    COUNT(salary) AS known_salaries,
    COUNT(DISTINCT department) AS unique_departments,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
      },
      output: `employee_count  known_salaries  unique_departments  total_salary  average_salary  minimum_salary  maximum_salary
--------------  --------------  ------------------  ------------  --------------  --------------  --------------
6               6               3                   320000.00     53333.333333    40000.00        70000.00`
    },
    {
      id: "exercise-count",
      title: "3. Exercise: Count Employees",
      paragraphs: [
        "Question: Write a query to find the total number of employees.",
        "Solution: Use COUNT(*), which counts every row in the input. It does not depend on whether a particular column contains NULL.",
        "Step by step: SQL reads the employee rows, applies any applicable WHERE condition, and counts the remaining rows. Because this query has no WHERE condition, all six rows are counted."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS employee_count
FROM employees;`
      },
      output: `employee_count
--------------
6`,
      bullets: [
        "Expected result: 6 employees.",
        "Explanation: COUNT(*) counts every input row.",
        "Interview tip: COUNT(*) and COUNT(column) can return different results when the column contains NULL values."
      ]
    },
    {
      id: "exercise-sum",
      title: "4. Exercise: Calculate Total Salary",
      paragraphs: [
        "Question: Calculate the total salary of all employees.",
        "Solution: Use SUM(salary) to add the salary values.",
        "Step by step: 60000 + 45000 + 70000 + 50000 + 55000 + 40000 = 320000.",
        "SUM() ignores NULL salary values. If no non-NULL salary values are available, SUM() returns NULL rather than automatically returning zero."
      ],
      code: {
        language: "sql",
        code: `SELECT SUM(salary) AS total_salary
FROM employees;`
      },
      output: `total_salary
------------
320000.00`,
      bullets: [
        "Expected result: 320000.00.",
        "Explanation: SUM() adds all non-NULL salary values.",
        "Business use: Calculate total salary expenditure for a company or reporting period."
      ]
    },
    {
      id: "exercise-average",
      title: "5. Exercise: Calculate Average Salary",
      paragraphs: [
        "Question: Find the average salary of employees.",
        "Solution: Use AVG(salary). The function divides the sum of non-NULL salaries by the number of non-NULL salary values.",
        "Step by step: 320000 / 6 = 53333.333333 approximately.",
        "If some salary values are NULL, AVG() excludes those rows from both the sum and the denominator. Do not assume missing salaries are automatically treated as zero."
      ],
      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS average_salary
FROM employees;`
      },
      output: `average_salary
--------------
53333.333333`,
      bullets: [
        "Expected result: approximately 53333.33.",
        "Explanation: AVG() calculates the arithmetic average of non-NULL salaries.",
        "Interview tip: Use ROUND(AVG(salary), 2) when a report should display two decimal places."
      ]
    },
    {
      id: "exercise-min-max",
      title: "6. Exercise: Find the Lowest and Highest Salaries",
      paragraphs: [
        "Question: Find the minimum and maximum employee salaries.",
        "Solution: MIN() finds the smallest non-NULL salary, and MAX() finds the largest non-NULL salary.",
        "The minimum salary is 40000 and the maximum salary is 70000. These functions return the values themselves, not the employee records associated with them.",
        "To find the employees who earn the maximum salary, use a subquery or compare salary against a separately calculated maximum."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees;`
      },
      output: `minimum_salary  maximum_salary  salary_range
--------------  --------------  ------------
40000.00        70000.00        30000.00`,
      bullets: [
        "Expected minimum: 40000.00.",
        "Expected maximum: 70000.00.",
        "Salary range: 70000 - 40000 = 30000.",
        "Use a separate SELECT query if you need the employee name associated with either extreme."
      ]
    },
    {
      id: "exercise-distinct",
      title: "7. Exercise: Count Unique Departments",
      paragraphs: [
        "Question: Count the number of distinct, non-NULL departments.",
        "Solution: COUNT(DISTINCT department) counts each department value once.",
        "The sample dataset contains Engineering, HR, and Finance. Engineering appears three times and Finance appears twice, but duplicate values are counted only once.",
        "If department contains NULL values, COUNT(DISTINCT department) excludes them."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(DISTINCT department) AS department_count
FROM employees;`
      },
      output: `department_count
----------------
3`,
      bullets: [
        "Expected result: 3.",
        "Explanation: There are three distinct non-NULL department names.",
        "Common mistake: COUNT(department) counts non-NULL department values, not unique department names."
      ]
    },
    {
      id: "exercise-filter",
      title: "8. Exercise: Engineering Salary Total",
      paragraphs: [
        "Question: Calculate the total salary of employees in Engineering.",
        "Solution: WHERE filters the rows to Engineering employees before SUM() calculates the result.",
        "The qualifying salaries are 60000, 70000, and 55000. Their total is 185000.",
        "The same pattern works for any department, product category, transaction status, or reporting period."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS engineering_total,
    AVG(salary) AS engineering_average
FROM employees
WHERE department = 'Engineering';`
      },
      output: `employee_count  engineering_total  engineering_average
--------------  -----------------  --------------------
3               185000.00          61666.666667`,
      bullets: [
        "Expected employee count: 3.",
        "Expected salary total: 185000.00.",
        "Expected average: approximately 61666.67.",
        "Explanation: WHERE filters rows before aggregate functions calculate their results."
      ]
    },
    {
      id: "exercise-department-report",
      title: "9. Exercise: Salary Report by Department",
      paragraphs: [
        "Question: Display each department, its employee count, total salary, and average salary.",
        "Solution: GROUP BY department creates a group for each department, and the aggregate functions calculate separate results for each group.",
        "Engineering has three employees and a total salary of 185000. Finance has two employees and a total of 90000. HR has one employee and a total of 45000.",
        "Use ORDER BY to make the result order explicit rather than relying on the database's default output order."
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
ORDER BY department;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667
Finance      2               90000.00      45000.000000
HR           1               45000.00      45000.000000`
    },
    {
      id: "exercise-where-having",
      title: "10. Exercise: Filter Aggregate Results",
      paragraphs: [
        "Question: Find departments whose total salary exceeds 80000.",
        "Solution: GROUP BY calculates the total salary for each department. HAVING then filters the grouped results based on the aggregate total.",
        "Engineering has a total of 185000 and Finance has a total of 90000, so both satisfy the condition. HR has a total of 45000 and is excluded.",
        "WHERE and HAVING are not interchangeable: WHERE filters individual rows before grouping, while HAVING filters grouped results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000
ORDER BY total_salary DESC;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance      90000.00`
    },
    {
      id: "exercise-null",
      title: "11. Exercise: Handle NULL Values",
      paragraphs: [
        "Question: Add a row with a NULL salary and compare COUNT(*), COUNT(salary), SUM(salary), and AVG(salary).",
        "Solution: COUNT(*) includes every row, but COUNT(salary) counts only non-NULL salaries. SUM() and AVG() ignore NULL salary values.",
        "The extra row increases the employee row count to seven, but the number of known salaries remains six. The salary total and average remain unchanged.",
        "Run the INSERT only once in a practice environment. Because employee_id is a primary key, do not reuse an ID already present in the table."
      ],
      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (7, 'Suresh', 'HR', NULL);

SELECT
    COUNT(*) AS employee_rows,
    COUNT(salary) AS known_salaries,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees;`
      },
      output: `employee_rows  known_salaries  total_salary  average_salary
-------------  --------------  ------------  --------------
7              6               320000.00     53333.333333`
    },
    {
      id: "exercise-null-count",
      title: "12. Exercise: Count Missing Salaries",
      paragraphs: [
        "Question: Find the number of employees whose salary is NULL.",
        "Solution: Use COUNT(*) - COUNT(salary) or count a CASE expression that returns 1 when salary IS NULL.",
        "After the previous exercise inserts one employee with a NULL salary, the result is one missing salary.",
        "If you run this exercise against the original six-row dataset without the extra row, the result is zero. The expected result therefore depends on whether the previous INSERT has been executed."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_rows,
    COUNT(*) - COUNT(salary) AS missing_salaries,
    COUNT(CASE WHEN salary IS NULL THEN 1 END) AS missing_salaries_case
FROM employees;`
      },
      output: `After inserting the NULL salary row:
employee_rows  missing_salaries  missing_salaries_case
-------------  ----------------  ---------------------
7              1                 1`
    },
    {
      id: "exercise-distinct-sum",
      title: "13. Exercise: SUM(DISTINCT) vs SUM()",
      paragraphs: [
        "Question: Demonstrate how SUM(DISTINCT amount) differs from SUM(amount) when duplicate numeric values exist.",
        "Solution: Create a small sales_demo table containing 100, 100, and 200. SUM(amount) adds all three rows, but SUM(DISTINCT amount) adds 100 and 200 once each.",
        "The regular sum is 400 and the distinct sum is 300. This does not mean duplicate business transactions should automatically be removed; DISTINCT changes the numeric inputs to the aggregate.",
        "Use SUM(DISTINCT) only when the requirement specifically asks to sum unique values rather than every record."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sales_demo (
    amount DECIMAL(10, 2)
);

INSERT INTO sales_demo (amount)
VALUES (100), (100), (200);

SELECT
    SUM(amount) AS regular_sum,
    SUM(DISTINCT amount) AS distinct_sum,
    AVG(amount) AS regular_average,
    AVG(DISTINCT amount) AS distinct_average
FROM sales_demo;`
      },
      output: `regular_sum  distinct_sum  regular_average  distinct_average
-----------  ------------  ---------------  ----------------
400.00       300.00        133.333333       150.000000`
    },
    {
      id: "exercise-conditional",
      title: "14. Exercise: Conditional Aggregation",
      paragraphs: [
        "Question: Calculate separate salary totals for Engineering and Finance in a single result row.",
        "Solution: Use SUM(CASE WHEN ... THEN salary ELSE 0 END) for each department.",
        "Conditional aggregation is useful when a report needs several related metrics in columns instead of one row per department.",
        "If you want one row per department instead, GROUP BY department is usually the more natural approach."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(CASE
        WHEN department = 'Engineering' THEN salary
        ELSE 0
    END) AS engineering_total,
    SUM(CASE
        WHEN department = 'Finance' THEN salary
        ELSE 0
    END) AS finance_total
FROM employees;`
      },
      output: `engineering_total  finance_total
-----------------  -------------
185000.00          90000.00`
    },
    {
      id: "exercise-top-salary",
      title: "15. Exercise: Find Employees Earning Above Average",
      paragraphs: [
        "Question: Return employees whose salary is greater than the overall average salary.",
        "Solution: A scalar subquery calculates AVG(salary), and the outer query selects employees whose salary exceeds that value.",
        "The original six-row dataset has an average salary of approximately 53333.33. Ravi, Kiran, and Meena earn more than this average.",
        "If you have already inserted the extra employee with a NULL salary, the average remains unchanged and the employee with a NULL salary does not satisfy the greater-than comparison."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    department,
    salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
)
ORDER BY salary DESC;`
      },
      output: `employee_name  department   salary
-------------  -----------  --------
Kiran          Engineering  70000.00
Ravi           Engineering  60000.00
Meena          Engineering  55000.00`
    },
    {
      id: "exercise-real-world",
      title: "16. Real-World Reporting Challenge",
      paragraphs: [
        "Scenario: An HR team needs a department report that includes employee count, total salary, average salary, and salary range.",
        "Requirements: calculate the metrics by department, exclude employees whose salary is NULL from numeric aggregates, and sort departments by total salary from highest to lowest.",
        "The employee count includes all employee rows in each department, even if a salary is NULL. Numeric aggregates use only non-NULL salaries.",
        "For a production report, also consider whether departments with no employees should appear. That requirement usually needs a separate departments table and an appropriate LEFT JOIN."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS known_salaries,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees
GROUP BY department
ORDER BY total_salary DESC;`
      },
      output: `For the original six-row dataset:
department   employee_count  known_salaries  total_salary  average_salary  salary_range
-----------  --------------  --------------  ------------  --------------  ------------
Engineering  3               3               185000.00     61666.666667    15000.00
Finance      2               2               90000.00      45000.000000   10000.00
HR           1               1               45000.00      45000.000000   0.00

If the NULL-salary HR employee was inserted,
HR employee_count becomes 2 while known_salaries remains 1.`
    },
    {
      id: "exercise-performance",
      title: "17. Performance and Query Quality",
      paragraphs: [
        "Aggregate queries may need to read many rows. Indexes can help the database locate rows that match selective WHERE conditions, but their value depends on the data distribution and execution plan.",
        "When filtering by department, an index on department may help. When filtering by department and salary range, a composite index may be worth evaluating against the application's actual query patterns.",
        "Use EXPLAIN or the equivalent execution-plan tool to inspect a query before changing indexes. An index does not guarantee that every aggregate becomes faster.",
        "Use DECIMAL for money values when exact decimal arithmetic is required. Avoid unnecessary floating-point calculations for financial totals.",
        "Keep reports semantically correct: check NULL handling, duplicate rows, join cardinality, filter conditions, and whether the result is meant to summarize records or distinct numeric values."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY total_salary DESC;`
      },
      output: `The execution plan describes how the database intends to execute the query.
Exact output depends on the database engine, table definition, indexes, and data.`
    },
    {
      id: "interview",
      title: "18. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Which function counts all rows?",
          answer:
            "COUNT(*) counts all rows in its input, including rows containing NULL values."
        },
        {
          question: "Which function calculates a total?",
          answer:
            "SUM() calculates the total of non-NULL numeric values."
        },
        {
          question: "Which function calculates an average?",
          answer:
            "AVG() calculates the arithmetic average of non-NULL numeric values."
        },
        {
          question: "How do you find the smallest and largest values?",
          answer:
            "Use MIN() for the smallest non-NULL value and MAX() for the largest non-NULL value."
        },
        {
          question: "What does COUNT(DISTINCT department) return?",
          answer:
            "It returns the number of distinct, non-NULL department values."
        },
        {
          question: "How do aggregate functions handle NULL values?",
          answer:
            "COUNT(column), SUM(), AVG(), MIN(), and MAX() ignore NULL values in their calculations. COUNT(*) still counts rows containing NULL."
        },
        {
          question: "Can aggregate functions be combined with WHERE?",
          answer:
            "Yes. WHERE filters the input rows before aggregate calculations are performed."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping. HAVING filters groups after aggregation."
        },
        {
          question: "How do you calculate total salary by department?",
          answer:
            "Use SELECT department, SUM(salary) FROM employees GROUP BY department."
        },
        {
          question: "What is the difference between SUM(amount) and SUM(DISTINCT amount)?",
          answer:
            "SUM(amount) includes every non-NULL amount in the input. SUM(DISTINCT amount) includes each distinct non-NULL numeric value once."
        },
        {
          question: "How do you count employees whose salary is NULL?",
          answer:
            "Use COUNT(*) - COUNT(salary), or COUNT(CASE WHEN salary IS NULL THEN 1 END)."
        },
        {
          question: "What happens when SUM() receives no non-NULL values?",
          answer:
            "SUM() returns NULL. Use COALESCE(SUM(column), 0) if zero is the intended reporting fallback."
        },
        {
          question: "How do you find employees earning more than the company average?",
          answer:
            "Compare salary against a scalar subquery that calculates SELECT AVG(salary) FROM employees."
        },
        {
          question: "Why can COUNT(*) and COUNT(salary) return different values?",
          answer:
            "COUNT(*) counts all rows, while COUNT(salary) excludes rows where salary is NULL."
        },
        {
          question: "Why should financial reports use DECIMAL?",
          answer:
            "DECIMAL supports exact decimal representation for values such as money, unlike approximate floating-point types."
        },
        {
          question: "How can you improve aggregate query performance?",
          answer:
            "Inspect the execution plan, evaluate indexes for selective filters, avoid accidental row multiplication from joins, and test with realistic data."
        }
      ]
    },
    {
      id: "revision",
      title: "19. Quick Revision",
      bullets: [
        "COUNT(*) counts all input rows.",
        "COUNT(column) counts only non-NULL values.",
        "COUNT(DISTINCT column) counts distinct non-NULL values.",
        "SUM() adds non-NULL numeric values.",
        "AVG() calculates the average of non-NULL numeric values.",
        "MIN() and MAX() find the smallest and largest non-NULL values.",
        "WHERE filters rows before aggregate calculations.",
        "GROUP BY calculates aggregates for separate groups.",
        "HAVING filters grouped aggregate results.",
        "SUM(DISTINCT amount) adds each unique numeric amount once, not each unique business record.",
        "COUNT(*) - COUNT(column) counts rows with NULL in that column.",
        "COALESCE can provide a fallback when an aggregate returns NULL.",
        "Use subqueries to compare a row value with an aggregate such as the overall average.",
        "Check query results against the sample data before relying on a business report."
      ]
    }
  ]
};
