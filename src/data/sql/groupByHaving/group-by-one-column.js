
export const groupByOneColumn = {
  id: 2042,
  title: "Grouping by One Column",
  slug: "group-by-one-column",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn to group records by one column and calculate counts, totals, and averages for each group.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "department-count",
      title: "1. Count Employees by Department",
      paragraphs: [
        "Grouping by one column means combining rows that share the same value in that column. GROUP BY department produces one result row for each distinct department value represented in the input.",
        "COUNT(*) counts the number of employee rows in each department. Engineering has three employees, Finance has two, and HR has one.",
        "The database processes the rows, forms department groups, and calculates COUNT(*) separately for each group. This is different from COUNT(*) without GROUP BY, which returns one overall count.",
        "Use ORDER BY department when the result must appear in a predictable alphabetical order. GROUP BY itself does not guarantee the order of the output."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2
HR           1`
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "The examples in this lesson use six employees distributed across three departments. Reviewing the source rows helps you understand exactly how the grouped results are calculated.",
        "Engineering contains Ravi, Kiran, and Meena. Finance contains Anu and Arun. HR contains Priya.",
        "If you already created the employees table in an earlier lesson, reuse it when its columns and data match these examples. Otherwise, create the table and insert the sample records below."
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
      id: "department-salary",
      title: "3. Calculate Department Salary Totals",
      paragraphs: [
        "SUM(salary) adds the salary values inside each department group. Every department receives its own total rather than contributing to a single company-wide total.",
        "Engineering total: 60000 + 70000 + 55000 = 185000.",
        "Finance total: 50000 + 40000 = 90000.",
        "HR total: 45000.",
        "This pattern is useful for calculating department budgets, sales revenue by category, expenses by business unit, and inventory value by product type."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance      90000.00
HR           45000.00`
    },
    {
      id: "department-average",
      title: "4. Calculate Average Salary",
      paragraphs: [
        "AVG(salary) calculates the average salary separately for each department. It divides the sum of the non-NULL salary values by the number of non-NULL salary values in that group.",
        "Engineering's average is 185000 divided by 3, approximately 61666.67. Finance's average is 90000 divided by 2, or 45000. HR has one employee, so its average is also 45000.",
        "If a department contains rows with NULL salaries, AVG() ignores those values. COUNT(*) may therefore be greater than COUNT(salary), and the average uses only the known salaries.",
        "Use ROUND(AVG(salary), 2) if a report requires two decimal places."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    ROUND(AVG(salary), 2) AS average_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   average_salary
-----------  --------------
Engineering  61666.67
Finance      45000.00
HR           45000.00`
    },
    {
      id: "department-multiple-aggregates",
      title: "5. Multiple Aggregate Functions in One Group",
      paragraphs: [
        "You can use several aggregate functions in the same grouped query. Each function calculates its own metric using the rows belonging to the current group.",
        "COUNT(*) measures employee count, SUM(salary) calculates total salary, AVG(salary) calculates average salary, and MIN() and MAX() identify the salary range boundaries.",
        "This is more efficient and convenient than writing a separate report query for each metric because the database can calculate all requested aggregates in one query.",
        "The result contains one row per department, with each metric displayed in a separate column."
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
Finance      2               90000.00      45000.000000   40000.00        50000.00
HR           1               45000.00      45000.000000   45000.00        45000.00`
    },
    {
      id: "department-filter",
      title: "6. Grouping After WHERE Filtering",
      paragraphs: [
        "WHERE filters individual rows before GROUP BY creates groups. This lets you calculate grouped results using only records that satisfy the specified condition.",
        "For example, WHERE salary >= 50000 excludes employees earning less than 50000. SQL then groups the remaining employees by department and calculates each department's salary total.",
        "Engineering retains all three employees, while Finance retains only Anu. HR has no employee earning at least 50000 and therefore does not appear in this result.",
        "Use WHERE for row-level conditions and HAVING for conditions on grouped aggregate results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      1               50000.00`
    },
    {
      id: "department-order",
      title: "7. Sorting Groups by Aggregate Values",
      paragraphs: [
        "ORDER BY can sort grouped results using an aggregate expression or its SELECT alias, where supported by the database.",
        "ORDER BY total_salary DESC sorts departments from the highest total salary to the lowest. DESC means descending order; ASC means ascending order.",
        "A secondary sorting column can make the result more predictable when multiple groups have the same aggregate value.",
        "For example, Finance and HR both have an average salary of 45000. Ordering by average salary descending and department ascending places Finance before HR."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC, department ASC;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance      90000.00
HR           45000.00`
    },
    {
      id: "null-groups",
      title: "8. Grouping NULL Values",
      paragraphs: [
        "If a grouping column contains NULL values, those rows form a NULL group. Multiple rows with NULL in the grouping column appear in the same group.",
        "For example, if two employees have NULL departments, GROUP BY department creates one NULL department group containing both employees.",
        "Use WHERE department IS NOT NULL before GROUP BY when you want to exclude rows with missing departments. This filters those rows before the groups are formed.",
        "COUNT(*) counts every row in a NULL department group. SUM(salary) and AVG(salary) ignore NULL salary values within that group."
      ],
      code: {
        language: "sql",
        code: `-- Include a NULL department group if it exists
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;

-- Exclude rows with missing departments
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE department IS NOT NULL
GROUP BY department
ORDER BY department;`
      },
      output: `For the original sample dataset, both queries return:
Engineering  3
Finance      2
HR           1

If NULL department values exist, the first query includes a NULL group.
The second query excludes those rows.`
    },
    {
      id: "department-having",
      title: "9. GROUP BY with HAVING",
      paragraphs: [
        "HAVING filters groups after aggregate calculations. It is useful when you want to keep only departments that meet a condition based on employee count, salary total, or another aggregate.",
        "The following query returns departments whose total salary exceeds 80000. Engineering and Finance qualify, while HR is excluded.",
        "WHERE cannot normally filter SUM(salary) at the same query level because WHERE operates before grouping. Use HAVING for grouped aggregate conditions."
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
      id: "department-real-world",
      title: "10. Real-World Use Cases",
      paragraphs: [
        "Human resources: group employees by department to calculate headcount, average salary, and salary expenditure.",
        "Retail: group sales by product category to calculate total revenue and average transaction value.",
        "Finance: group expenses by expense category to understand where the company spends money.",
        "Inventory: group stock records by product to calculate available quantities and stock value.",
        "Customer analytics: group orders by customer to calculate order counts and total spending.",
        "When grouping transaction data, check whether each source row represents one complete transaction or a transaction detail. Joining a transaction to multiple detail rows can duplicate amounts and inflate totals."
      ],
      code: {
        language: "sql",
        code: `-- Example: sales totals by category
SELECT
    category,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_transaction
FROM sales
GROUP BY category
ORDER BY total_revenue DESC;`
      },
      output: `This query returns one row for each represented sales category,
including its transaction count, total revenue, and average transaction.
Exact values depend on the rows in the sales table.`
    },
    {
      id: "department-common-mistakes",
      title: "11. Common Mistakes and Fixes",
      paragraphs: [
        "Mistake 1: Selecting an ordinary column that is neither grouped nor aggregated. A department can contain multiple employee names, so selecting one arbitrary name is ambiguous.",
        "Mistake 2: Assuming GROUP BY sorts the result. Add ORDER BY when the output order matters.",
        "Mistake 3: Using WHERE to filter SUM(salary) or COUNT(*). Use HAVING for conditions on grouped aggregate results.",
        "Mistake 4: Grouping by an extra column unintentionally. GROUP BY department, employee_name creates smaller groups than GROUP BY department alone.",
        "Mistake 5: Forgetting NULL handling. COUNT(*) counts rows, but COUNT(salary) excludes rows with NULL salary.",
        "Mistake 6: Expecting departments with no employees to appear automatically. GROUP BY only creates groups from its input rows. Use a departments table with LEFT JOIN when zero-employee departments must appear."
      ],
      code: {
        language: "sql",
        code: `-- Correct: one row per department
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Correct: filter grouped totals
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000;

-- Correct: sort grouped results
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC;`
      },
      output: `The first query counts employees by department.
The second query returns departments whose salary totals exceed 80000.
The third query sorts all department totals from highest to lowest.`
    },
    {
      id: "practice-beginner",
      title: "12. Beginner Practice Questions with Solutions",
      paragraphs: [
        "Use the sample employees dataset to solve these questions.",
        "Exercise 1: Count employees in each department.",
        "Exercise 2: Calculate the total salary for each department.",
        "Exercise 3: Calculate the average salary for each department.",
        "Exercise 4: Find the minimum and maximum salary in each department."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;

-- Exercise 2
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY department;

-- Exercise 3
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY department;

-- Exercise 4
SELECT
    department,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `Exercise 1:
Engineering = 3
Finance = 2
HR = 1

Exercise 2:
Engineering = 185000.00
Finance = 90000.00
HR = 45000.00

Exercise 3:
Engineering = 61666.666667
Finance = 45000.000000
HR = 45000.000000

Exercise 4:
Engineering: minimum 55000.00, maximum 70000.00
Finance: minimum 40000.00, maximum 50000.00
HR: minimum 45000.00, maximum 45000.00`
    },
    {
      id: "practice-intermediate",
      title: "13. Intermediate Practice Questions with Solutions",
      paragraphs: [
        "Exercise 1: Return departments with at least two employees.",
        "Exercise 2: Return departments whose total salary exceeds 80000.",
        "Exercise 3: Calculate department salary totals using only employees earning at least 50000.",
        "Exercise 4: Sort departments by average salary from highest to lowest.",
        "Exercise 5: Display each department's employee count, known salary count, and total salary."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;

-- Exercise 2
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000
ORDER BY total_salary DESC;

-- Exercise 3
SELECT department, SUM(salary) AS total_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
ORDER BY department;

-- Exercise 4
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;

-- Exercise 5
SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS known_salaries,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `Exercise 1:
Engineering = 3
Finance = 2

Exercise 2:
Engineering = 185000.00
Finance = 90000.00

Exercise 3:
Engineering = 185000.00
Finance = 50000.00

Exercise 4:
Engineering = 61666.666667
Finance = 45000.000000
HR = 45000.000000

Exercise 5:
Engineering: employee_count 3, known_salaries 3, total 185000.00
Finance: employee_count 2, known_salaries 2, total 90000.00
HR: employee_count 1, known_salaries 1, total 45000.00`
    },
    {
      id: "performance",
      title: "14. Performance Considerations",
      paragraphs: [
        "GROUP BY may require the database to sort or hash rows to form groups. The execution strategy depends on the database engine, available indexes, filtering conditions, and data distribution.",
        "Indexes may help queries that filter or group by frequently used columns, but they do not guarantee faster execution. Additional indexes also consume storage and can increase the cost of inserts and updates.",
        "Apply selective WHERE filters before grouping when the business requirement permits it. Reducing the number of input rows can reduce aggregation work.",
        "Use EXPLAIN or the database's equivalent execution-plan tool to investigate expensive queries. Test with realistic data and verify that indexes support the actual query patterns.",
        "Always verify join cardinality before grouping joined tables. A one-to-many join can multiply rows and produce incorrect counts or totals."
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
      output: `EXPLAIN displays the database's planned execution strategy.
Exact output depends on the database engine, table schema,
indexes, and data distribution.`
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you count employees in each department?",
          answer:
            "Use COUNT(*) with GROUP BY department."
        },
        {
          question: "How many result rows does grouping by department produce?",
          answer:
            "It produces one row for each distinct grouping value represented in the input, including a NULL group if NULL values exist."
        },
        {
          question: "Can GROUP BY be used with SUM()?",
          answer:
            "Yes. SUM() calculates a separate total for each group."
        },
        {
          question: "How can you exclude rows with missing departments?",
          answer:
            "Use WHERE department IS NOT NULL before GROUP BY."
        },
        {
          question: "Why use ORDER BY after GROUP BY?",
          answer:
            "ORDER BY sorts the grouped results into a predictable order."
        },
        {
          question: "What is the difference between GROUP BY and DISTINCT?",
          answer:
            "GROUP BY forms groups and is commonly used with aggregate functions. DISTINCT removes duplicate result rows. GROUP BY can also return distinct grouping values when no aggregates are used."
        },
        {
          question: "Can we group by more than one column?",
          answer:
            "Yes. GROUP BY department, job_title creates one group for each distinct department and job-title combination."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping, while HAVING filters groups after aggregation."
        },
        {
          question: "What happens when a grouping column contains NULL?",
          answer:
            "Rows with NULL in that grouping column form a group of their own."
        },
        {
          question: "Can we select employee_name while grouping only by department?",
          answer:
            "Generally, no. employee_name is neither grouped nor aggregated, and a department may contain several employee names."
        },
        {
          question: "How do you find departments with more than two employees?",
          answer:
            "Use GROUP BY department followed by HAVING COUNT(*) > 2."
        },
        {
          question: "How do you sort departments by total salary?",
          answer:
            "Use ORDER BY SUM(salary) DESC or order by the total_salary alias where supported."
        },
        {
          question: "Why can an aggregate total be incorrect after a JOIN?",
          answer:
            "A one-to-many join may duplicate rows. Check the relationship between tables and aggregate at the correct level."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision",
      bullets: [
        "GROUP BY combines rows with matching values in one column or a combination of columns.",
        "COUNT(*) counts rows in each group.",
        "SUM() calculates a separate total for each group.",
        "AVG() calculates a separate average for each group.",
        "MIN() and MAX() find the smallest and largest non-NULL values in each group.",
        "WHERE filters rows before groups are formed.",
        "HAVING filters groups after aggregation.",
        "ORDER BY controls the order of the final results.",
        "NULL grouping values form their own group.",
        "Use COUNT(column) when you need the count of non-NULL values.",
        "Use LEFT JOIN when a report must include categories with zero matching records.",
        "Check grouping columns, NULL values, join cardinality, and execution plans when building production reports."
      ]
    }
  ]
};
