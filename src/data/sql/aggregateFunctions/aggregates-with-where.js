
export const aggregatesWithWhere = {
  id: 2038,
  title: "Aggregate Functions with WHERE",
  slug: "aggregates-with-where",
  topicTitle: "Aggregate Functions",
  description:
    "Learn how to filter rows before applying aggregate functions such as COUNT, SUM, AVG, MIN, and MAX.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "where-introduction",
      title: "1. Understanding WHERE with Aggregate Functions",
      paragraphs: [
        "The WHERE clause filters individual rows before aggregate functions calculate their results. Only rows that satisfy the WHERE condition become part of the aggregate input.",
        "For example, if a company has employees in Engineering, HR, Finance, and Sales, WHERE department = 'Engineering' restricts the input to Engineering employees before COUNT(), SUM(), AVG(), MIN(), or MAX() is evaluated.",
        "This differs from HAVING, which filters groups after GROUP BY and aggregate calculations. A query that calculates one overall aggregate can also use a subquery when the requirement is to filter that aggregate result.",
        "Aggregate functions can be combined with comparison operators, logical operators, IN, BETWEEN, LIKE, IS NULL, and other valid SQL conditions."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE department = 'Engineering';`
      },
      output: `The query returns one summary row for Engineering employees.
The exact values depend on the rows in the employees table.`
    },
    {
      id: "where-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use the following six-row dataset to understand how filtering changes aggregate results. Each employee has a department and salary.",
        "Engineering employees are Anita, Priya, and Arjun. Their salaries are 70000, 60000, and 55000. The Engineering salary total is 185000, and its average is approximately 61666.67.",
        "The examples below use this dataset so that the result of each query can be checked manually."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(30),
    salary DECIMAL(10, 2)
);

INSERT INTO employees (id, name, department, salary)
VALUES
    (1, 'Anita', 'Engineering', 70000),
    (2, 'Rahul', 'HR', 50000),
    (3, 'Priya', 'Engineering', 60000),
    (4, 'Kiran', 'Finance', 40000),
    (5, 'Meena', 'Finance', 50000),
    (6, 'Arjun', 'Engineering', 55000);

SELECT * FROM employees
ORDER BY id;`
      },
      output: `id  name   department   salary
--  -----  -----------  --------
1   Anita  Engineering  70000.00
2   Rahul  HR           50000.00
3   Priya  Engineering  60000.00
4   Kiran  Finance      40000.00
5   Meena  Finance      50000.00
6   Arjun  Engineering  55000.00`
    },
    {
      id: "where-count",
      title: "3. COUNT() with WHERE",
      paragraphs: [
        "COUNT(*) counts all rows that remain after WHERE filtering. It does not require any particular column to be non-NULL.",
        "The query below filters the employees table to Engineering and then counts the matching rows. Three employees satisfy the condition.",
        "If you instead use COUNT(salary), only Engineering rows with a non-NULL salary are counted. COUNT(DISTINCT department) counts distinct non-NULL department values in the filtered input."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS engineering_count
FROM employees
WHERE department = 'Engineering';`
      },
      output: `engineering_count
-----------------
3`
    },
    {
      id: "where-count-comparison",
      title: "4. COUNT(*) vs COUNT(column) with WHERE",
      paragraphs: [
        "WHERE determines which rows are eligible for counting. COUNT(*) then counts every eligible row, while COUNT(column) excludes eligible rows where that column is NULL.",
        "The following example counts Engineering employees whose salary is at least 60000. It returns the number of matching rows and the number of known salaries among those rows.",
        "When a condition contains NULL comparisons, remember that SQL may evaluate the condition to UNKNOWN. WHERE retains only rows for which the condition is TRUE."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS matching_rows,
    COUNT(salary) AS known_salaries,
    COUNT(DISTINCT department) AS distinct_departments
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },
      output: `matching_rows  known_salaries  distinct_departments
-------------  --------------  --------------------
2              2               1`
    },
    {
      id: "where-sum",
      title: "5. SUM() with WHERE",
      paragraphs: [
        "SUM() adds the non-NULL salary values among rows that satisfy the WHERE condition.",
        "The three Engineering salaries are 70000, 60000, and 55000. Their sum is 185000.",
        "A filter can select a department, a date range, a salary threshold, or any other valid condition. The aggregate calculates a result only from the selected rows."
      ],
      code: {
        language: "sql",
        code: `SELECT SUM(salary) AS engineering_total
FROM employees
WHERE department = 'Engineering';`
      },
      output: `engineering_total
-----------------
185000.00`
    },
    {
      id: "where-sum-condition",
      title: "6. SUM() with Multiple Conditions",
      paragraphs: [
        "Multiple WHERE conditions let you narrow the aggregate input further. AND requires both conditions to be TRUE; OR allows either condition to be TRUE.",
        "This example includes Engineering employees with salaries of at least 60000. Anita and Priya qualify, so the sum is 130000.",
        "Use parentheses when combining AND and OR if the intended condition would otherwise be ambiguous. SQL evaluates AND before OR, so parentheses can make the business rule explicit."
      ],
      code: {
        language: "sql",
        code: `SELECT SUM(salary) AS qualifying_salary_total
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },
      output: `qualifying_salary_total
-----------------------
130000.00`
    },
    {
      id: "where-average",
      title: "7. AVG() with Multiple Conditions",
      paragraphs: [
        "AVG() calculates the average of the non-NULL salary values that survive WHERE filtering.",
        "For Engineering employees with salary at least 60000, the qualifying salaries are 70000 and 60000. The average is (70000 + 60000) / 2 = 65000.",
        "AVG() does not divide by the total number of employees in the original table. It uses only the qualifying non-NULL salary values.",
        "If no rows match, AVG() returns NULL in a scalar aggregate query. Use COALESCE only if the required reporting result should display a default such as zero."
      ],
      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS high_salary_average
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },
      output: `high_salary_average
-------------------
65000.000000`
    },
    {
      id: "where-min-max",
      title: "8. MIN() and MAX() with WHERE",
      paragraphs: [
        "MIN() returns the smallest non-NULL value and MAX() returns the largest non-NULL value among rows that survive WHERE filtering.",
        "The Finance department contains salaries of 40000 and 50000. Therefore, its minimum salary is 40000 and its maximum salary is 50000.",
        "MIN() and MAX() return NULL when the filtered input has no non-NULL salary values. They do not automatically return zero.",
        "Use the same approach with dates, prices, quantities, and other comparable data types."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
WHERE department = 'Finance';`
      },
      output: `minimum_salary  maximum_salary
--------------  --------------
40000.00        50000.00`
    },
    {
      id: "where-practice",
      title: "9. Combining Multiple Aggregates",
      paragraphs: [
        "A single SELECT statement can calculate COUNT(), SUM(), AVG(), MIN(), and MAX() over the same filtered rows.",
        "This is useful for a department summary, product report, salary dashboard, or sales analysis because the query can return several related metrics at once.",
        "For Engineering, the salaries are 70000, 60000, and 55000. The count is 3, total is 185000, average is 61666.67, minimum is 55000, and maximum is 70000."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
WHERE department = 'Engineering';`
      },
      output: `employee_count  total_salary  average_salary  minimum_salary  maximum_salary
--------------  ------------  --------------  --------------  --------------
3               185000.00     61666.666667    55000.00        70000.00`
    },
    {
      id: "where-in-between",
      title: "10. WHERE with IN and BETWEEN",
      paragraphs: [
        "IN checks whether a value matches any value in a list. BETWEEN checks whether a value lies within an inclusive range.",
        "The first query calculates the combined salary for Finance and HR. Finance contributes 90000 and HR contributes 50000, giving a total of 140000.",
        "The second query includes salaries from 50000 through 60000, including both boundaries. The matching salaries are 50000, 60000, and 50000, so the total is 160000.",
        "For date ranges, remember that BETWEEN includes both endpoints. For timestamp columns, a half-open interval using >= start and < next-period-start is often safer."
      ],
      code: {
        language: "sql",
        code: `SELECT SUM(salary) AS selected_departments_total
FROM employees
WHERE department IN ('Finance', 'HR');

SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS salary_total
FROM employees
WHERE salary BETWEEN 50000 AND 60000;`
      },
      output: `First query:
selected_departments_total
--------------------------
140000.00

Second query:
employee_count  salary_total
--------------  ------------
4               215000.00`
    },
    {
      id: "where-null",
      title: "11. WHERE and NULL Values in Aggregates",
      paragraphs: [
        "If a salary is NULL, the condition salary >= 60000 evaluates to UNKNOWN for that row. The row is not retained by WHERE.",
        "COUNT(*) counts all rows that satisfy WHERE. COUNT(salary), SUM(salary), and AVG(salary) operate on the qualifying input but ignore NULL salary values in their aggregate calculations.",
        "Use IS NULL or IS NOT NULL to test whether a column is missing. Do not use salary = NULL.",
        "If all rows are filtered out, a scalar aggregate query without GROUP BY still returns one result row. COUNT(*) is zero, while SUM(), AVG(), MIN(), and MAX() return NULL when there are no non-NULL inputs."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS matching_rows,
    COUNT(salary) AS known_salaries,
    SUM(salary) AS salary_total,
    AVG(salary) AS average_salary
FROM employees
WHERE department = 'Engineering'
  AND salary < 0;`
      },
      output: `matching_rows  known_salaries  salary_total  average_salary
-------------  --------------  ------------  --------------
0              0               NULL          NULL`
    },
    {
      id: "where-vs-having",
      title: "12. WHERE vs HAVING",
      paragraphs: [
        "WHERE filters individual rows before grouping and aggregation. HAVING filters groups after GROUP BY and aggregate calculations.",
        "Use WHERE to select Engineering employees before calculating their salary total. Use GROUP BY with HAVING when you want to calculate a total for each department and keep only departments whose total exceeds a threshold.",
        "An aggregate function generally cannot be used directly in WHERE at the same query level. For example, WHERE SUM(salary) > 100000 is invalid. Use HAVING for grouped results or a subquery for a scalar aggregate result.",
        "A practical query may use both WHERE and HAVING: WHERE limits the source rows, GROUP BY forms groups, and HAVING filters the resulting groups."
      ],
      code: {
        language: "sql",
        code: `-- WHERE filters employee rows before aggregation
SELECT SUM(salary) AS engineering_total
FROM employees
WHERE department = 'Engineering';

-- HAVING filters grouped department results
SELECT
    department,
    SUM(salary) AS department_total
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000;`
      },
      output: `First query:
engineering_total = 185000.00

Second query:
department   department_total
-----------  ----------------
Engineering  185000.00`
    },
    {
      id: "where-subquery",
      title: "13. Filtering an Overall Aggregate Result",
      paragraphs: [
        "When the requirement is to return an overall aggregate only if it meets a condition, place the aggregate in a subquery and filter the result in the outer query.",
        "The inner query calculates the total salary of Engineering employees. The outer query checks whether that total exceeds 100000.",
        "This pattern is different from HAVING with GROUP BY because the inner query produces one overall aggregate result rather than a set of department groups."
      ],
      code: {
        language: "sql",
        code: `SELECT total_salary
FROM (
    SELECT SUM(salary) AS total_salary
    FROM employees
    WHERE department = 'Engineering'
) AS salary_summary
WHERE total_salary > 100000;`
      },
      output: `total_salary
------------
185000.00`
    },
    {
      id: "where-common-mistakes",
      title: "14. Common Mistakes and Fixes",
      paragraphs: [
        "Mistake 1: Filtering an aggregate with WHERE at the same query level. Use HAVING for grouped aggregate results or a subquery for an overall aggregate.",
        "Mistake 2: Forgetting that WHERE runs before aggregation. The aggregate result may differ from the total calculated over the entire table.",
        "Mistake 3: Using OR without parentheses. Combine conditions explicitly to avoid accidentally including rows from other departments.",
        "Mistake 4: Assuming AVG() uses every original row. AVG() uses qualifying non-NULL values.",
        "Mistake 5: Assuming SUM() returns zero when no rows match. SUM() returns NULL when there are no non-NULL inputs; COALESCE can provide a fallback.",
        "Mistake 6: Comparing a column to NULL using = NULL. Use IS NULL or IS NOT NULL."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect: aggregate in WHERE at the same query level
-- SELECT department, SUM(salary)
-- FROM employees
-- WHERE SUM(salary) > 100000
-- GROUP BY department;

-- Correct: filter grouped aggregate results
SELECT department, SUM(salary) AS department_total
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000;

-- Correct: make the OR condition explicit
SELECT *
FROM employees
WHERE department = 'Engineering'
  AND (salary >= 60000 OR salary = 55000);

-- Correct: handle an empty aggregate result if required
SELECT COALESCE(SUM(salary), 0) AS salary_total
FROM employees
WHERE department = 'Unknown';`
      },
      output: `The HAVING query returns Engineering with 185000.00.
The parenthesized condition returns the three Engineering employees.
The final query returns 0.00 when no matching non-NULL salary exists.`
    },
    {
      id: "practice-beginner",
      title: "15. Beginner Practice Questions",
      paragraphs: [
        "Use the six-row employees dataset from this lesson.",
        "Exercise 1: Count employees in Finance.",
        "Exercise 2: Calculate the total salary of HR employees.",
        "Exercise 3: Find the average salary of Engineering employees.",
        "Exercise 4: Find the highest salary among employees earning at least 60000.",
        "Exercise 5: Count employees whose salary is between 40000 and 50000, inclusive."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS finance_count
FROM employees
WHERE department = 'Finance';

-- Exercise 2
SELECT SUM(salary) AS hr_total
FROM employees
WHERE department = 'HR';

-- Exercise 3
SELECT AVG(salary) AS engineering_average
FROM employees
WHERE department = 'Engineering';

-- Exercise 4
SELECT MAX(salary) AS highest_salary
FROM employees
WHERE salary >= 60000;

-- Exercise 5
SELECT COUNT(*) AS employee_count
FROM employees
WHERE salary BETWEEN 40000 AND 50000;`
      },
      output: `Exercise 1: finance_count = 2
Exercise 2: hr_total = 50000.00
Exercise 3: engineering_average = 61666.666667
Exercise 4: highest_salary = 70000.00
Exercise 5: employee_count = 3`
    },
    {
      id: "practice-intermediate",
      title: "16. Intermediate Practice with Solutions",
      paragraphs: [
        "Exercise 1: Calculate the total and average salary for Engineering employees earning at least 60000.",
        "Exercise 2: Calculate the combined salary for Finance and HR employees.",
        "Exercise 3: Return the minimum and maximum Engineering salaries.",
        "Exercise 4: Find departments whose total salary exceeds 100000.",
        "Exercise 5: Return the total salary for a department that has no employees, displaying zero instead of NULL."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- Exercise 2
SELECT SUM(salary) AS combined_salary
FROM employees
WHERE department IN ('Finance', 'HR');

-- Exercise 3
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
WHERE department = 'Engineering';

-- Exercise 4
SELECT department, SUM(salary) AS department_total
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000;

-- Exercise 5
SELECT COALESCE(SUM(salary), 0) AS total_salary
FROM employees
WHERE department = 'Unknown';`
      },
      output: `Exercise 1:
total_salary = 130000.00
average_salary = 65000.000000

Exercise 2:
combined_salary = 140000.00

Exercise 3:
minimum_salary = 55000.00
maximum_salary = 70000.00

Exercise 4:
Engineering = 185000.00

Exercise 5:
total_salary = 0.00`
    },
    {
      id: "performance",
      title: "17. Performance Considerations",
      paragraphs: [
        "Indexes on columns used in selective WHERE conditions may help the database locate matching rows efficiently. For example, an index on department may help queries that frequently filter by department, depending on the table size, selectivity, and execution plan.",
        "For queries that filter by department and a salary range, a composite index such as (department, salary) may be worth evaluating. Index design depends on the application's query patterns and write workload.",
        "An aggregate query may still need to read many matching rows to calculate SUM() or AVG(). An index does not guarantee that the database can avoid reading all relevant values.",
        "Use EXPLAIN or the database engine's equivalent to inspect the plan. Test performance against realistic data rather than assuming every index improves an aggregate query.",
        "Avoid applying unnecessary functions to filtered columns when index usage matters. Whether a function prevents ordinary index use depends on the database and available expression or functional indexes."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;`
      },
      output: `EXPLAIN displays the database's execution plan.
Exact output depends on the database engine, indexes, schema, and data.`
    },
    {
      id: "interview",
      title: "18. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can aggregate functions be used with WHERE?",
          answer:
            "Yes. WHERE filters the input rows before aggregate functions calculate their results."
        },
        {
          question: "How do you count employees in Engineering?",
          answer:
            "Use SELECT COUNT(*) FROM employees WHERE department = 'Engineering'."
        },
        {
          question: "Can one query contain multiple aggregate functions?",
          answer:
            "Yes. COUNT(), SUM(), AVG(), MIN(), and MAX() can appear together in a SELECT statement over the same filtered input."
        },
        {
          question: "Does WHERE filter rows before SUM()?",
          answer:
            "Yes. SUM() calculates its result from the rows that remain after WHERE filtering."
        },
        {
          question: "Can WHERE directly filter SUM(salary) > 100000?",
          answer:
            "Not at the same query level. Use HAVING for grouped aggregate results or a subquery when filtering an overall aggregate."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping and aggregation. HAVING filters groups after aggregation."
        },
        {
          question: "What happens when no rows match the WHERE condition?",
          answer:
            "In a scalar aggregate query without GROUP BY, COUNT(*) returns zero. SUM(), AVG(), MIN(), and MAX() return NULL when no non-NULL input values are available."
        },
        {
          question: "How does AVG() handle NULL values after WHERE filtering?",
          answer:
            "AVG() ignores NULL values and divides the sum of qualifying non-NULL values by their count."
        },
        {
          question: "Can WHERE use AND and OR together?",
          answer:
            "Yes. Use parentheses when needed to express the intended logic clearly because AND has higher precedence than OR."
        },
        {
          question: "How do you calculate an aggregate for multiple departments?",
          answer:
            "Use WHERE department IN ('Finance', 'HR') or another appropriate condition, then apply the aggregate function."
        },
        {
          question: "How can you display zero when SUM() has no non-NULL inputs?",
          answer:
            "Use COALESCE(SUM(column), 0) when zero is the correct reporting fallback."
        },
        {
          question: "How do you find the maximum salary in a department?",
          answer:
            "Use SELECT MAX(salary) FROM employees WHERE department = 'Engineering', replacing the department as required."
        },
        {
          question: "Can an aggregate query return one row when no records match?",
          answer:
            "Yes. A scalar aggregate query without GROUP BY returns one result row. COUNT(*) is zero and the other standard aggregates return NULL if no non-NULL inputs are available."
        },
        {
          question: "How can you improve the performance of an aggregate query with WHERE?",
          answer:
            "Review the execution plan, evaluate indexes on selective filter columns, and test with realistic data. An index may reduce scanning but does not guarantee faster execution."
        }
      ]
    },
    {
      id: "revision",
      title: "19. Quick Revision",
      bullets: [
        "WHERE filters rows before aggregate calculations.",
        "COUNT(*) counts rows that satisfy WHERE.",
        "COUNT(column) excludes NULL values from the count.",
        "SUM() adds qualifying non-NULL values.",
        "AVG() averages qualifying non-NULL values.",
        "MIN() and MAX() find the smallest and largest qualifying non-NULL values.",
        "AND requires both conditions to be TRUE; OR allows either condition to be TRUE.",
        "IN checks a list of values; BETWEEN includes both range boundaries.",
        "Use IS NULL or IS NOT NULL to test for NULL values.",
        "Use HAVING to filter grouped aggregate results.",
        "Use a subquery when filtering an overall aggregate result.",
        "COALESCE(SUM(column), 0) displays zero when the aggregate result is NULL.",
        "Check execution plans before making index or query-performance changes."
      ]
    }
  ]
};
