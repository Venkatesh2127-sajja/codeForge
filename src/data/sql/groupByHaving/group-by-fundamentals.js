
export const groupByFundamentals = {
  id: 2041,
  title: "GROUP BY Fundamentals",
  slug: "group-by-fundamentals",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn how GROUP BY organizes rows into groups for aggregate calculations.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "introduction",
      title: "1. What Is GROUP BY?",
      paragraphs: [
        "GROUP BY combines rows that have the same values in one or more columns into groups. Aggregate functions such as COUNT(), SUM(), AVG(), MIN(), and MAX() can then calculate a result for each group.",
        "Without GROUP BY, an aggregate query usually produces one overall summary row. With GROUP BY department, SQL calculates a separate summary for each department.",
        "For example, if Engineering has three employees, Finance has two employees, and HR has one employee, GROUP BY department creates three groups. COUNT(*) returns the employee count for each group.",
        "GROUP BY is commonly used in business reports, sales analytics, employee reports, inventory summaries, and financial dashboards."
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
        "Use the following employees table throughout this lesson. It contains six employees distributed across Engineering, Finance, and HR.",
        "Engineering contains Ravi, Kiran, and Meena. Finance contains Anu and Arun. HR contains Priya.",
        "The sample salaries are chosen so that you can verify each grouped calculation manually. If the employees table already exists with these columns and values, reuse it instead of running the setup again."
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
      id: "group-process",
      title: "3. How GROUP BY Works Step by Step",
      paragraphs: [
        "Step 1: SQL reads the rows produced by the FROM clause.",
        "Step 2: WHERE, if present, removes rows that do not satisfy its condition.",
        "Step 3: GROUP BY places the remaining rows into groups based on the specified grouping expressions.",
        "Step 4: Aggregate functions calculate values independently for each group.",
        "Step 5: HAVING, if present, filters the groups. ORDER BY sorts the resulting rows.",
        "For GROUP BY department, every Engineering employee belongs to one group, every Finance employee belongs to another group, and every HR employee belongs to a third group. COUNT(*) then counts the rows inside each group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 1
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
HR           1
Finance      1`
    },
    {
      id: "group-sum",
      title: "4. GROUP BY with SUM()",
      paragraphs: [
        "SUM() calculates a separate total for each group. When grouping employees by department, SQL adds the salaries of employees within each department independently.",
        "Engineering salaries are 60000, 70000, and 55000, giving a total of 185000. Finance salaries total 90000, and the HR total is 45000.",
        "This pattern is useful for calculating departmental budgets, category revenue, regional sales, or total inventory value."
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
      id: "group-average",
      title: "5. GROUP BY with AVG()",
      paragraphs: [
        "AVG() calculates the average salary independently for each department. The function uses the non-NULL salary values within each group.",
        "Engineering's average is 185000 divided by 3, which is approximately 61666.67. Finance's average is 90000 divided by 2, which is 45000. HR has one employee, so its average is 45000.",
        "The average for a group can differ from the overall company average because each department has a different number of employees and different salary values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   average_salary
-----------  --------------
Engineering  61666.666667
Finance      45000.000000
HR           45000.000000`
    },
    {
      id: "group-count",
      title: "6. GROUP BY with COUNT(), MIN(), and MAX()",
      paragraphs: [
        "You can combine several aggregate functions in one grouped query. Each function calculates its result for the rows belonging to the current group.",
        "COUNT(*) counts every row in a department. COUNT(salary) counts only rows with a non-NULL salary. MIN(salary) returns the smallest known salary, while MAX(salary) returns the largest known salary.",
        "If a department contains employees whose salaries are NULL, COUNT(*) and COUNT(salary) can differ. SUM(), AVG(), MIN(), and MAX() ignore NULL salary values.",
        "This combination is useful when a report needs both workforce size and salary statistics."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS known_salaries,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  known_salaries  minimum_salary  maximum_salary
-----------  --------------  --------------  --------------  --------------
Engineering  3               3               55000.00        70000.00
Finance      2               2               40000.00        50000.00
HR           1               1               45000.00        45000.00`
    },
    {
      id: "group-rules",
      title: "7. Important GROUP BY Rules",
      paragraphs: [
        "When using GROUP BY, selected expressions generally need to be grouping expressions, expressions derived from them, or aggregate expressions such as SUM(salary). Database-specific functional-dependency rules may allow additional columns in some cases.",
        "For example, selecting department and COUNT(*) is valid when grouping by department. Selecting employee_name directly while grouping only by department is generally invalid or ambiguous because a department may contain several employee names.",
        "GROUP BY does not guarantee the order of result rows. Use ORDER BY when the report requires a specific order.",
        "An aggregate query without GROUP BY calculates an overall summary. A grouped aggregate query calculates one summary per group. If no rows survive filtering, a grouped query normally returns no groups."
      ],
      code: {
        language: "sql",
        code: `-- Correct: department is the grouping column
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Correct: salary is aggregated
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department;

-- Generally invalid: employee_name is neither grouped nor aggregated
-- SELECT department, employee_name, COUNT(*)
-- FROM employees
-- GROUP BY department;`
      },
      output: `The first query returns one row per department.
The second query returns one average salary per department.
The third query is generally rejected because employee_name is not grouped or aggregated.`
    },
    {
      id: "group-multiple-columns",
      title: "8. GROUP BY Multiple Columns",
      paragraphs: [
        "GROUP BY can use more than one column. SQL creates a group for each distinct combination of the grouping-column values.",
        "For example, GROUP BY department, job_title separates employees by both department and job title. Two employees in the same department but with different job titles belong to different groups.",
        "The number of result groups depends on the distinct combinations that actually occur in the input data.",
        "This technique is useful for reporting sales by region and product category, employee counts by department and role, or orders by status and payment method."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employee_roles (
    employee_id INT PRIMARY KEY,
    department VARCHAR(50),
    job_title VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employee_roles
    (employee_id, department, job_title, salary)
VALUES
    (1, 'Engineering', 'Developer', 60000),
    (2, 'Engineering', 'Developer', 70000),
    (3, 'Engineering', 'Tester', 55000),
    (4, 'Finance', 'Analyst', 50000),
    (5, 'Finance', 'Analyst', 40000);

SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  total_salary
-----------  ---------  --------------  ------------
Engineering  Developer  2               130000.00
Engineering  Tester     1               55000.00
Finance      Analyst    2               90000.00`
    },
    {
      id: "group-where",
      title: "9. GROUP BY with WHERE",
      paragraphs: [
        "WHERE filters individual rows before SQL forms groups. This allows you to calculate aggregates using only rows that meet the required conditions.",
        "For example, WHERE salary >= 50000 excludes employees earning less than 50000. GROUP BY then calculates a separate total for each department using only the remaining employees.",
        "The WHERE clause cannot normally use an aggregate such as SUM(salary) at the same query level because aggregation has not yet been performed."
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
      id: "group-having-preview",
      title: "10. GROUP BY with HAVING",
      paragraphs: [
        "HAVING filters groups after aggregate calculations. It is useful when a report should display only groups meeting a condition on COUNT(), SUM(), AVG(), or another aggregate.",
        "For example, HAVING SUM(salary) > 80000 keeps departments whose total salary exceeds 80000. Engineering and Finance qualify, while HR does not.",
        "WHERE and HAVING can be used together. WHERE first selects individual rows, GROUP BY forms groups, and HAVING filters those groups.",
        "The next lessons will explore HAVING conditions, aggregate filtering, and more advanced grouping queries in greater detail."
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
      id: "group-null",
      title: "11. GROUP BY and NULL Values",
      paragraphs: [
        "When a grouping column contains NULL, rows with NULL in that column form a group of their own. The NULL group represents missing or unknown department values.",
        "Aggregate functions inside that group follow their normal rules. COUNT(*) counts its rows, COUNT(salary) counts non-NULL salaries, and SUM(salary) ignores NULL salary values.",
        "A NULL department group is different from a department whose name is an empty string. NULL represents a missing or unknown value, while an empty string is a string value."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE nullable_employees (
    employee_id INT PRIMARY KEY,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO nullable_employees
    (employee_id, department, salary)
VALUES
    (1, 'Engineering', 60000),
    (2, 'Engineering', 70000),
    (3, NULL, 45000),
    (4, NULL, NULL);

SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS known_salaries,
    SUM(salary) AS total_salary
FROM nullable_employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  known_salaries  total_salary
-----------  --------------  --------------  ------------
NULL         2               1               45000.00
Engineering  2               2               130000.00`
    },
    {
      id: "group-common-mistakes",
      title: "12. Common GROUP BY Mistakes",
      paragraphs: [
        "Mistake 1: Selecting an ordinary column that is neither grouped nor aggregated. SQL cannot reliably choose one employee name for a department containing multiple employees.",
        "Mistake 2: Assuming GROUP BY sorts rows. Use ORDER BY to guarantee a requested output order.",
        "Mistake 3: Using WHERE to filter SUM(salary) or COUNT(*). Use HAVING for grouped aggregate conditions.",
        "Mistake 4: Grouping by the wrong columns. Adding extra grouping columns creates more specific groups and can change the number of result rows.",
        "Mistake 5: Confusing COUNT(*) with COUNT(column). The former counts rows; the latter excludes NULL values in that column.",
        "Mistake 6: Assuming departments with no employees automatically appear. GROUP BY only produces groups from rows in its input. To display departments with zero employees, use a departments table and an appropriate LEFT JOIN.",
        "Mistake 7: Forgetting that a join can multiply rows and inflate SUM() or COUNT(). Check the relationship between tables before aggregating."
      ],
      code: {
        language: "sql",
        code: `-- Correct: one row per department
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;

-- Correct: filter departments by their aggregate total
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000;

-- To display departments with zero employees,
-- start from a departments table and use LEFT JOIN.`
      },
      output: `The first query returns all represented departments.
The second query returns Engineering and Finance.
The third approach can also display departments with no matching employees when the query is designed appropriately.`
    },
    {
      id: "group-real-world",
      title: "13. Real-World GROUP BY Examples",
      paragraphs: [
        "Employee reporting: group by department to compare headcount, total salary expenditure, and average salary.",
        "Sales reporting: group by product category to find which categories generate the most revenue.",
        "Order reporting: group by order status to count completed, pending, and cancelled orders.",
        "Monthly reporting: group by an appropriate year-and-month expression to compare monthly revenue. The exact date function depends on the database engine.",
        "Inventory reporting: group by product ID to calculate available quantity or total stock value.",
        "For all these reports, decide whether the input rows represent individual events, orders, order items, or other entities. Aggregate at the correct level to avoid counting the same business event multiple times."
      ],
      code: {
        language: "sql",
        code: `-- Employee headcount and salary expenditure
SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department;

-- Sales revenue by category
SELECT
    category,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_revenue
FROM sales
GROUP BY category
ORDER BY total_revenue DESC;`
      },
      output: `The first query returns one row per employee department.
The second query returns one row per sales category,
ordered from the highest revenue to the lowest.`
    },
    {
      id: "practice-beginner",
      title: "14. Beginner Practice Questions",
      paragraphs: [
        "Use the employees dataset from this lesson. Try answering these questions before looking at the solution queries.",
        "Exercise 1: Count employees in each department.",
        "Exercise 2: Calculate total salary by department.",
        "Exercise 3: Calculate average salary by department.",
        "Exercise 4: Find the minimum and maximum salary for each department."
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
      title: "15. Intermediate Practice Questions with Solutions",
      paragraphs: [
        "Exercise 1: Find departments with at least two employees.",
        "Exercise 2: Find departments whose total salary exceeds 80000.",
        "Exercise 3: Calculate salary totals by department for employees earning at least 50000.",
        "Exercise 4: Sort departments by average salary from highest to lowest.",
        "Exercise 5: Count employees and calculate the known salary total for each department."
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
ORDER BY average_salary DESC, department;

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
      title: "16. Performance Considerations",
      paragraphs: [
        "GROUP BY may require the database to sort or hash rows to form groups. The chosen strategy depends on the database engine, available indexes, query conditions, and data distribution.",
        "Indexes may help queries that filter or group by frequently used columns, but adding an index does not guarantee better performance. Indexes also require storage and can increase the cost of writes.",
        "Filter unnecessary rows with WHERE before grouping when the business requirement allows it. Reducing the input can reduce the work needed to aggregate.",
        "Use EXPLAIN or the database's equivalent execution-plan tool to inspect expensive grouped queries. Test against realistic table sizes and actual query patterns.",
        "Check join cardinality before aggregating joined tables. A one-to-many join can duplicate rows and inflate totals unless the query accounts for that relationship."
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
      output: `EXPLAIN displays the execution plan selected by the database.
Exact output depends on the database engine, table schema,
indexes, and data distribution.`
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is GROUP BY in SQL?",
          answer:
            "GROUP BY groups rows that share the same values so aggregate functions can calculate a result for each group."
        },
        {
          question: "Which aggregate functions can be used with GROUP BY?",
          answer:
            "Common functions include COUNT(), SUM(), AVG(), MIN(), and MAX()."
        },
        {
          question: "Does GROUP BY automatically sort results?",
          answer:
            "No. Use ORDER BY when a specific result order is required."
        },
        {
          question: "Can we select an ordinary column that is not grouped?",
          answer:
            "Generally, selected non-aggregated columns must be grouped or otherwise valid under the database's grouping rules."
        },
        {
          question: "What is the difference between GROUP BY and ORDER BY?",
          answer:
            "GROUP BY forms groups for aggregate calculations, while ORDER BY sorts the resulting rows."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping. HAVING filters groups after aggregation."
        },
        {
          question: "Can GROUP BY contain multiple columns?",
          answer:
            "Yes. SQL creates a group for each distinct combination of values in the grouping columns."
        },
        {
          question: "What happens when a grouping column contains NULL?",
          answer:
            "Rows with NULL in the grouping column form a group of their own."
        },
        {
          question: "How do you count employees by department?",
          answer:
            "Use SELECT department, COUNT(*) FROM employees GROUP BY department."
        },
        {
          question: "How do you find departments with more than two employees?",
          answer:
            "Group by department and use HAVING COUNT(*) > 2."
        },
        {
          question: "Can GROUP BY be used without aggregate functions?",
          answer:
            "Yes. It can return distinct combinations of grouping-column values, although SELECT DISTINCT is often clearer when deduplication is the only goal."
        },
        {
          question: "How do you sort departments by total salary?",
          answer:
            "Use GROUP BY department and ORDER BY SUM(salary) DESC, or order by the total_salary alias where supported."
        },
        {
          question: "Why might a GROUP BY query return fewer rows than the source table?",
          answer:
            "Multiple source rows with the same grouping values are combined into one result row per group."
        },
        {
          question: "Why might SUM() be incorrect after a JOIN?",
          answer:
            "A one-to-many join may duplicate source rows. Check the join relationships and aggregate at the appropriate level."
        }
      ]
    },
    {
      id: "revision",
      title: "18. Quick Revision",
      bullets: [
        "GROUP BY combines rows with matching grouping values.",
        "COUNT(), SUM(), AVG(), MIN(), and MAX() can calculate metrics for each group.",
        "GROUP BY department returns one row for each represented department.",
        "GROUP BY multiple columns creates groups for distinct combinations.",
        "WHERE filters rows before grouping.",
        "HAVING filters groups after aggregate calculations.",
        "ORDER BY sorts the final result and should be used when a specific order is required.",
        "Selected expressions must follow the database's grouping rules.",
        "NULL grouping values form their own group.",
        "GROUP BY only creates groups represented in its input rows.",
        "Use LEFT JOIN when a report must include categories with zero matching records.",
        "Validate joins, NULL handling, and execution plans when building production reports."
      ]
    }
  ]
};
