
export const aggregateFunctionsIntroduction = {
  id: 2031,
  title: "Introduction to Aggregate Functions",
  slug: "aggregate-functions-introduction",
  topicTitle: "Aggregate Functions",
  description:
    "Understand SQL aggregate functions in depth, including COUNT, SUM, AVG, MIN, MAX, NULL handling, practical reporting queries, common mistakes, and interview questions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "introduction",
      title: "1. What Are Aggregate Functions?",
      paragraphs: [
        "Aggregate functions perform calculations over multiple input rows and return a summarized value. Instead of displaying every employee or order individually, an aggregate query can calculate the total salary, average salary, employee count, highest salary, or lowest salary.",
        "Aggregate functions are widely used in business reports, dashboards, financial calculations, inventory analysis, employee statistics, and sales analytics.",
        "SQL aggregate functions can summarize an entire filtered result set or summarize rows separately when combined with GROUP BY. The aggregate calculation operates on the rows that remain after filtering with WHERE.",
        "The five fundamental aggregate functions are COUNT(), SUM(), AVG(), MIN(), and MAX(). Each function serves a different purpose, and understanding how each handles NULL values is essential."
      ],
      bullets: [
        "COUNT(*) counts rows, including rows that contain NULL values in individual columns.",
        "COUNT(column_name) counts rows where that column is not NULL.",
        "SUM(column_name) calculates the total of non-NULL numeric values.",
        "AVG(column_name) calculates the average of non-NULL numeric values.",
        "MIN(column_name) returns the minimum non-NULL value.",
        "MAX(column_name) returns the maximum non-NULL value.",
        "WHERE filters rows before aggregate calculations are performed.",
        "GROUP BY creates separate groups for aggregate calculations."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
      },
      output: `employee_count | total_salary | average_salary | minimum_salary | maximum_salary
---------------+--------------+----------------+----------------+---------------
6              | 320000.00    | 53333.33       | 40000.00       | 70000.00`,
      bullets: [
        "COUNT(*) reports the number of employee rows.",
        "SUM(salary) adds all non-NULL salary values.",
        "AVG(salary) divides the sum of non-NULL salary values by the number of non-NULL salary values.",
        "MIN(salary) and MAX(salary) identify the lowest and highest salaries."
      ]
    },
    {
      id: "aggregate-dataset",
      title: "2. Sample Dataset for Practice",
      paragraphs: [
        "Use this employees table throughout the lesson. Understanding the input data first makes it easier to predict aggregate results and verify your queries.",
        "The dataset contains six employees across three departments. The salary column contains numeric values, so it can be used with SUM, AVG, MIN, and MAX."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employees (id, name, department, salary)
VALUES
    (1, 'Anita', 'IT', 70000.00),
    (2, 'Rahul', 'HR', 50000.00),
    (3, 'Priya', 'IT', 60000.00),
    (4, 'Kiran', 'Sales', 40000.00),
    (5, 'Meena', 'HR', 45000.00),
    (6, 'Arjun', 'Sales', 55000.00);`
      },
      output: `id | name  | department | salary
---+-------+------------+--------
1  | Anita | IT         | 70000.00
2  | Rahul | HR         | 50000.00
3  | Priya | IT         | 60000.00
4  | Kiran | Sales      | 40000.00
5  | Meena | HR         | 45000.00
6  | Arjun | Sales      | 55000.00`,
      bullets: [
        "Number of employee rows: 6.",
        "Total salary: 320000.",
        "Average salary: approximately 53333.33.",
        "Minimum salary: 40000.",
        "Maximum salary: 70000."
      ]
    },
    {
      id: "count-function",
      title: "3. COUNT() — Counting Rows and Values",
      paragraphs: [
        "COUNT() counts rows or non-NULL expression values. It is frequently used to measure the number of employees, customers, orders, products, or transactions.",
        "COUNT(*) counts all rows in the input, even when some columns in those rows contain NULL. COUNT(column_name) counts only rows where the specified column is not NULL.",
        "COUNT(DISTINCT column_name) counts the number of different non-NULL values in that column. This is useful for counting unique customers, departments, categories, or product types.",
        "Remember that COUNT(column_name) does not count missing values. If a column contains four non-NULL values and two NULL values, COUNT(column_name) returns four, while COUNT(*) returns six."
      ],
      code: {
        language: "sql",
        code: `-- Count all employees
SELECT COUNT(*) AS total_employees
FROM employees;

-- Count employees with a recorded salary
SELECT COUNT(salary) AS employees_with_salary
FROM employees;

-- Count distinct departments
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },
      output: `total_employees
---------------
6

employees_with_salary
---------------------
6

department_count
----------------
3`,
      bullets: [
        "Use COUNT(*) when you need the number of rows.",
        "Use COUNT(column_name) when you need the number of non-NULL values.",
        "Use COUNT(DISTINCT column_name) when you need the number of unique non-NULL values."
      ]
    },
    {
      id: "sum-function",
      title: "4. SUM() — Calculating Totals",
      paragraphs: [
        "SUM() adds the non-NULL values in a numeric expression. It is commonly used for total salary expenses, revenue, order values, inventory quantities, and monthly expenditure.",
        "SUM() ignores NULL values. If every input value is NULL, or there are no input rows, SUM() generally returns NULL rather than zero. Use COALESCE when the application specifically needs to display zero instead.",
        "The result's numeric type and displayed decimal precision depend on the database and input column type. Use an appropriate numeric data type for financial calculations."
      ],
      code: {
        language: "sql",
        code: `SELECT SUM(salary) AS total_salary
FROM employees;

-- Total salary for IT employees
SELECT SUM(salary) AS it_salary_total
FROM employees
WHERE department = 'IT';

-- Display zero when no non-NULL salary values exist
SELECT COALESCE(SUM(salary), 0) AS total_salary
FROM employees
WHERE department = 'Finance';`
      },
      output: `total_salary
------------
320000.00

it_salary_total
---------------
130000.00

total_salary
------------
0`,
      bullets: [
        "SUM(salary) adds the salary values of all selected employees.",
        "The WHERE condition limits the calculation to IT employees in the second query.",
        "COALESCE(SUM(salary), 0) replaces a NULL result with zero when no matching non-NULL salaries exist."
      ]
    },
    {
      id: "avg-function",
      title: "5. AVG() — Calculating Averages",
      paragraphs: [
        "AVG() calculates the arithmetic mean of non-NULL numeric values. It is often used for average salary, average order value, average marks, and average product rating.",
        "The calculation is the sum of non-NULL values divided by the number of non-NULL values. NULL entries are excluded from both the sum and the count.",
        "An average does not necessarily equal one of the values in the original table. For example, the average of 40000 and 60000 is 50000.",
        "For salary and financial reports, decide how many decimal places to display. ROUND() can be used to control the displayed precision, although exact syntax and result types can vary by database."
      ],
      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS average_salary
FROM employees;

SELECT ROUND(AVG(salary), 2) AS average_salary
FROM employees;

SELECT AVG(salary) AS it_average_salary
FROM employees
WHERE department = 'IT';`
      },
      output: `average_salary
--------------
53333.333333...

average_salary
--------------
53333.33

it_average_salary
-----------------
65000.00`,
      bullets: [
        "AVG(salary) calculates the mean of all non-NULL salary values.",
        "ROUND(AVG(salary), 2) requests two decimal places.",
        "Filtering for IT produces an average of (70000 + 60000) / 2 = 65000."
      ]
    },
    {
      id: "min-max-functions",
      title: "6. MIN() and MAX() — Finding Extremes",
      paragraphs: [
        "MIN() returns the smallest non-NULL value, while MAX() returns the largest non-NULL value. These functions are useful for identifying the lowest and highest salaries, earliest and latest dates, and cheapest and most expensive products.",
        "MIN() and MAX() can work with numeric, date/time, and character values. For strings, the result depends on the database's comparison rules and collation.",
        "These functions return a single value for the entire input unless the query groups rows. They ignore NULL values; if there are no non-NULL input values, they generally return NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary
FROM employees;

SELECT
    MIN(name) AS alphabetically_first_name,
    MAX(name) AS alphabetically_last_name
FROM employees;`
      },
      output: `lowest_salary | highest_salary
--------------+---------------
40000.00      | 70000.00

alphabetically_first_name | alphabetically_last_name
--------------------------+-------------------------
Anita                     | Rahul`,
      bullets: [
        "MIN(salary) returns 40000.",
        "MAX(salary) returns 70000.",
        "MIN(name) and MAX(name) use the applicable character comparison and collation rules."
      ]
    },
    {
      id: "single-value",
      title: "7. Aggregate Results Without GROUP BY",
      paragraphs: [
        "When an aggregate query does not contain GROUP BY, it summarizes the complete input result set and generally returns one row. This is true even when no input rows match the query.",
        "For an empty input, COUNT(*) returns zero. SUM(), AVG(), MIN(), and MAX() generally return NULL because there are no values to calculate from.",
        "A query can combine several aggregate functions in the same SELECT statement, as long as each expression is valid for the database."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_employees,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees;

-- Compare the behavior when no rows match
SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE department = 'Finance';`
      },
      output: `-- First query
total_employees | total_salary | average_salary
----------------+--------------+---------------
6               | 320000.00    | 53333.3333...

-- Second query
employee_count | total_salary | average_salary
---------------+--------------+---------------
0              | NULL         | NULL`,
      bullets: [
        "A missing matching department does not prevent an aggregate query from returning its summary row.",
        "COUNT(*) returns zero for an empty input.",
        "SUM() and AVG() return NULL when there are no values to aggregate."
      ]
    },
    {
      id: "group-preview",
      title: "8. Aggregates by Category",
      paragraphs: [
        "When you need a separate summary for each department, combine aggregate functions with GROUP BY. SQL forms groups based on the selected grouping columns and calculates aggregate values for each group.",
        "For example, the employee count, total salary, and average salary can be calculated separately for IT, HR, and Sales.",
        "GROUP BY is introduced here as a preview. The next lessons will explore grouping, HAVING, grouping multiple columns, and common reporting patterns in more detail."
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
      output: `department | employee_count | total_salary | average_salary
-----------+----------------+--------------+---------------
HR         | 2              | 95000.00     | 47500.00
IT         | 2              | 130000.00    | 65000.00
Sales      | 2              | 95000.00     | 47500.00`,
      bullets: [
        "Without GROUP BY, the aggregate summarizes the entire filtered input.",
        "With GROUP BY department, the aggregate produces a result for each department.",
        "WHERE filters input rows before grouping and aggregation.",
        "ORDER BY sorts the final summary rows."
      ]
    },
    {
      id: "null-handling",
      title: "9. Understanding NULL Values in Aggregates",
      paragraphs: [
        "NULL represents a missing or unknown value. It is not the same as zero, an empty string, or the text 'NULL'. Aggregate functions treat NULL differently from ordinary numeric values.",
        "COUNT(*) counts rows regardless of whether a column is NULL. COUNT(column_name), SUM(), AVG(), MIN(), and MAX() ignore NULL values in that expression.",
        "Consider salaries 40000, 60000, and NULL. COUNT(*) returns 3, COUNT(salary) returns 2, SUM(salary) returns 100000, and AVG(salary) returns 50000.",
        "If all values are NULL, COUNT(column_name) returns zero and the other listed value aggregates generally return NULL. Use COALESCE only when replacing missing results with a default value is appropriate for the business requirement."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE salary_demo (
    id INT PRIMARY KEY,
    salary DECIMAL(10, 2)
);

INSERT INTO salary_demo (id, salary)
VALUES
    (1, 40000.00),
    (2, 60000.00),
    (3, NULL);

SELECT
    COUNT(*) AS row_count,
    COUNT(salary) AS known_salary_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM salary_demo;`
      },
      output: `row_count | known_salary_count | total_salary | average_salary | minimum_salary | maximum_salary
----------+--------------------+--------------+----------------+----------------+---------------
3         | 2                  | 100000.00    | 50000.00       | 40000.00      | 60000.00`,
      bullets: [
        "COUNT(*) counts all three rows.",
        "COUNT(salary) excludes the row with NULL salary.",
        "AVG(salary) divides by two known salary values, not three rows.",
        "NULL should not automatically be treated as zero; the correct handling depends on what the missing value means."
      ]
    },
    {
      id: "where-aggregate",
      title: "10. Filtering Rows Before Aggregation",
      paragraphs: [
        "WHERE determines which source rows participate in the aggregate calculation. The database filters rows first and then calculates the aggregate over the remaining rows.",
        "For example, WHERE department = 'IT' means SUM(salary) adds only the salaries of employees in IT.",
        "A common beginner mistake is trying to use an aggregate such as COUNT(*) directly in WHERE to filter groups. Group-level filtering is performed with HAVING, which is covered in a later lesson."
      ],
      code: {
        language: "sql",
        code: `-- Average salary for employees earning at least 50000
SELECT AVG(salary) AS average_salary
FROM employees
WHERE salary >= 50000;

-- Count employees in IT
SELECT COUNT(*) AS it_employee_count
FROM employees
WHERE department = 'IT';`
      },
      output: `average_salary
--------------
58750.00

it_employee_count
-----------------
2`,
      bullets: [
        "The first query includes Anita, Rahul, Priya, and Arjun.",
        "Their salaries total 235000, and 235000 / 4 = 58750.",
        "The second query counts only employees whose department is IT."
      ]
    },
    {
      id: "distinct-aggregates",
      title: "11. DISTINCT Inside Aggregate Functions",
      paragraphs: [
        "Some aggregate functions accept DISTINCT to remove duplicate expression values before calculating the result. This is especially useful with COUNT(DISTINCT column_name), which counts unique non-NULL values.",
        "SUM(DISTINCT salary) adds each different salary value once. This differs from SUM(salary), which adds every non-NULL salary in every selected row.",
        "Use DISTINCT only when the business requirement calls for unique values. Removing duplicates can produce an incorrect total when repeated values represent separate legitimate transactions."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    COUNT(DISTINCT department) AS department_count,
    SUM(salary) AS normal_salary_total,
    SUM(DISTINCT salary) AS distinct_salary_total
FROM employees;`
      },
      output: `employee_count | department_count | normal_salary_total | distinct_salary_total
---------------+------------------+---------------------+----------------------
6              | 3                | 320000.00           | 320000.00`,
      bullets: [
        "In this sample, all six salary values are different, so SUM(salary) and SUM(DISTINCT salary) are equal.",
        "If two employees had the same salary, SUM(DISTINCT salary) would include that salary only once.",
        "COUNT(DISTINCT department) returns the number of distinct non-NULL department values."
      ]
    },
    {
      id: "common-mistakes",
      title: "12. Common Aggregate Function Mistakes",
      paragraphs: [
        "Aggregate queries are simple to write, but incorrect assumptions about NULL values, filtering, and grouping can lead to inaccurate reports."
      ],
      bullets: [
        "Mistake: Using COUNT(salary) to count every employee. Fix: use COUNT(*) when you need the number of rows.",
        "Mistake: Assuming AVG(salary) treats NULL as zero. Fix: remember that AVG ignores NULL values.",
        "Mistake: Using SUM() on a text column that contains descriptive values. Fix: aggregate an appropriate numeric expression.",
        "Mistake: Expecting a missing group to appear in the result automatically. Fix: understand that GROUP BY normally returns groups represented by input rows.",
        "Mistake: Replacing every NULL aggregate result with zero without considering its meaning. Fix: use COALESCE only when zero is a valid business representation.",
        "Mistake: Using an aggregate function directly in WHERE to filter the aggregate result. Fix: use HAVING for group-level filtering.",
        "Mistake: Assuming COUNT(DISTINCT column) counts NULL as a distinct value. Fix: COUNT(DISTINCT expression) excludes NULL."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect for counting all employee rows when salary can be NULL
SELECT COUNT(salary)
FROM employees;

-- Correct row count
SELECT COUNT(*)
FROM employees;

-- Correct way to filter groups by aggregate count
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2;`
      },
      output: `-- The first two queries both return 6 for the current dataset.
-- The HAVING query returns HR, IT, and Sales because each has 2 employees.`,
      bullets: [
        "The current dataset has no NULL salaries, so COUNT(salary) happens to equal COUNT(*).",
        "That equality is not guaranteed for other datasets.",
        "The final query filters grouped results by employee count."
      ]
    },
    {
      id: "practice-beginner",
      title: "13. Beginner Practice Exercises",
      paragraphs: [
        "Try each query before reading the solution. Use the employees dataset from this lesson."
      ],
      bullets: [
        "Exercise 1: Count all employees.",
        "Exercise 2: Calculate the total salary of all employees.",
        "Exercise 3: Calculate the average salary.",
        "Exercise 4: Find the highest and lowest salaries.",
        "Exercise 5: Count the number of distinct departments."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS total_employees
FROM employees;

-- Exercise 2
SELECT SUM(salary) AS total_salary
FROM employees;

-- Exercise 3
SELECT ROUND(AVG(salary), 2) AS average_salary
FROM employees;

-- Exercise 4
SELECT
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary
FROM employees;

-- Exercise 5
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },
      output: `Exercise 1: 6
Exercise 2: 320000.00
Exercise 3: 53333.33
Exercise 4: highest = 70000.00, lowest = 40000.00
Exercise 5: 3`
    },
    {
      id: "practice-intermediate",
      title: "14. Intermediate Practice Exercises",
      paragraphs: [
        "These exercises combine aggregates with WHERE, expressions, and reporting requirements. Attempt each one independently before reviewing the solutions."
      ],
      bullets: [
        "Exercise 1: Calculate the total salary of HR employees.",
        "Exercise 2: Count employees earning at least 55000.",
        "Exercise 3: Calculate the average salary of Sales employees.",
        "Exercise 4: Find the difference between the highest and lowest salaries.",
        "Exercise 5: Calculate the total and average salary for employees whose salary is greater than 45000."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT SUM(salary) AS hr_salary_total
FROM employees
WHERE department = 'HR';

-- Exercise 2
SELECT COUNT(*) AS employee_count
FROM employees
WHERE salary >= 55000;

-- Exercise 3
SELECT AVG(salary) AS sales_average_salary
FROM employees
WHERE department = 'Sales';

-- Exercise 4
SELECT MAX(salary) - MIN(salary) AS salary_range
FROM employees;

-- Exercise 5
SELECT
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE salary > 45000;`
      },
      output: `Exercise 1: 95000.00
Exercise 2: 3
Exercise 3: 47500.00
Exercise 4: 30000.00
Exercise 5: total = 235000.00, average = 58750.00`
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is an aggregate function in SQL?",
          answer: "An aggregate function summarizes values from multiple rows and returns a calculated result, such as a count, sum, average, minimum, or maximum."
        },
        {
          question: "Name five common SQL aggregate functions.",
          answer: "COUNT(), SUM(), AVG(), MIN(), and MAX()."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(column_name)?",
          answer: "COUNT(*) counts all rows in the input, whereas COUNT(column_name) counts only rows where that expression is not NULL."
        },
        {
          question: "What does SUM() do?",
          answer: "SUM() adds the non-NULL numeric values in an expression and returns their total."
        },
        {
          question: "How does AVG() handle NULL values?",
          answer: "AVG() ignores NULL values and divides the sum of the non-NULL values by their count."
        },
        {
          question: "What is the difference between MIN() and MAX()?",
          answer: "MIN() returns the smallest non-NULL value, while MAX() returns the largest non-NULL value according to the applicable data type comparison rules."
        },
        {
          question: "Can aggregate functions be used without GROUP BY?",
          answer: "Yes. Without GROUP BY, an aggregate query generally summarizes the entire input and returns one result row."
        },
        {
          question: "What happens when an aggregate receives no input rows?",
          answer: "COUNT returns zero. SUM, AVG, MIN, and MAX generally return NULL when there are no values to aggregate."
        },
        {
          question: "What is COUNT(DISTINCT column_name)?",
          answer: "It counts the number of unique non-NULL values in the specified expression."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer: "WHERE filters source rows before grouping and aggregation. HAVING filters groups after grouping and aggregate calculations."
        },
        {
          question: "Can aggregate functions ignore NULL values?",
          answer: "COUNT(column_name), SUM(), AVG(), MIN(), and MAX() ignore NULL values in the expression. COUNT(*) still counts rows containing NULL in individual columns."
        },
        {
          question: "Why might SUM() return NULL instead of zero?",
          answer: "SUM() generally returns NULL when no non-NULL values are available, including an empty input. COALESCE(SUM(column_name), 0) can return zero when that behavior is appropriate."
        },
        {
          question: "Can MIN() and MAX() work on dates?",
          answer: "Yes. They can return the earliest and latest non-NULL dates, respectively."
        },
        {
          question: "Can multiple aggregate functions appear in one SELECT statement?",
          answer: "Yes. A query can calculate COUNT, SUM, AVG, MIN, and MAX together, provided the expressions are valid for the database."
        },
        {
          question: "Where are aggregate functions used in real projects?",
          answer: "They are used in dashboards and reports for employee counts, total sales, average order values, revenue summaries, inventory quantities, and transaction statistics."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision and Key Takeaways",
      paragraphs: [
        "Aggregate functions summarize multiple rows into calculated values. They are essential building blocks for SQL reporting and analytics.",
        "Learn the behavior of COUNT(*) versus COUNT(column_name), remember that most aggregates ignore NULL values, and practise combining aggregates with WHERE. Next, study GROUP BY to create summaries for individual categories."
      ],
      bullets: [
        "COUNT(*) counts rows.",
        "COUNT(column_name) counts non-NULL values.",
        "COUNT(DISTINCT column_name) counts unique non-NULL values.",
        "SUM() calculates a total.",
        "AVG() calculates an average of non-NULL values.",
        "MIN() returns the smallest value.",
        "MAX() returns the largest value.",
        "Without GROUP BY, aggregates generally summarize the whole input.",
        "GROUP BY creates one aggregate result per group.",
        "WHERE filters source rows before aggregation.",
        "HAVING filters groups after aggregation.",
        "COALESCE can replace a NULL aggregate result with a suitable default.",
        "Practise the examples in MySQL or PostgreSQL to strengthen your understanding."
      ]
    }
  ]
};
