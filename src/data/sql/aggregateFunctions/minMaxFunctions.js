
export const minMaxFunctions = {
  id: 2035,
  title: "MIN() and MAX() Functions",
  slug: "min-max-functions",
  topicTitle: "Aggregate Functions",
  description:
    "Learn how MIN() and MAX() find minimum and maximum values in SQL, including numeric values, dates, text, filtering, grouping, NULL handling, practical exercises, and interview questions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "min-max-basics",
      title: "1. Introduction to MIN() and MAX()",
      paragraphs: [
        "MIN() and MAX() are SQL aggregate functions used to find the smallest and largest non-NULL values in a set of input rows.",
        "MIN(salary) returns the lowest salary, while MAX(salary) returns the highest salary. These functions are useful for salary analysis, price comparisons, inventory reports, examination results, and sales analytics.",
        "Both functions work with numeric values, dates, and comparable text values. Text ordering depends on the database's collation and comparison rules.",
        "Without GROUP BY, MIN() and MAX() generally return a single summary row for the complete input. With GROUP BY, they calculate a minimum and maximum for each group.",
        "Both functions ignore NULL values. If there are no non-NULL values to compare, the result is generally NULL."
      ],
      bullets: [
        "MIN(column_name) finds the smallest non-NULL value.",
        "MAX(column_name) finds the largest non-NULL value.",
        "WHERE filters rows before the functions calculate their results.",
        "GROUP BY calculates separate minimum and maximum values for each group.",
        "MIN() and MAX() return values, not the complete records associated with those values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees;`
      },
      output: `minimum_salary | maximum_salary
---------------+---------------
40000.00       | 70000.00`,
      bullets: [
        "The smallest salary in the sample dataset is 40000.",
        "The largest salary in the sample dataset is 70000."
      ]
    },
    {
      id: "sample-data",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use this employees table for the numeric examples throughout the lesson. The dataset contains six employees across three departments.",
        "Create and populate the table once in your SQL practice database. If you already have an equivalent table containing these records, use it instead of inserting duplicate data."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE minmax_demo_employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO minmax_demo_employees
    (id, name, department, salary)
VALUES
    (1, 'Anita', 'Engineering', 70000.00),
    (2, 'Rahul', 'HR', 50000.00),
    (3, 'Priya', 'Engineering', 60000.00),
    (4, 'Kiran', 'Sales', 40000.00),
    (5, 'Meena', 'HR', 45000.00),
    (6, 'Arjun', 'Sales', 55000.00);`
      },
      output: `id | name  | department  | salary
---+-------+-------------+--------
1  | Anita | Engineering | 70000.00
2  | Rahul | HR          | 50000.00
3  | Priya | Engineering | 60000.00
4  | Kiran | Sales       | 40000.00
5  | Meena | HR          | 45000.00
6  | Arjun | Sales       | 55000.00`,
      bullets: [
        "Minimum salary: 40000.",
        "Maximum salary: 70000.",
        "Engineering minimum: 60000.",
        "Engineering maximum: 70000.",
        "HR minimum and maximum: 45000 and 50000.",
        "Sales minimum and maximum: 40000 and 55000."
      ]
    },
    {
      id: "min-max-filter",
      title: "3. MIN() and MAX() with WHERE",
      paragraphs: [
        "WHERE filters the input rows before MIN() and MAX() are evaluated. This lets you find the minimum and maximum values for a particular department, product category, price range, or status.",
        "For example, filtering by Engineering returns the lowest and highest salaries among Engineering employees only.",
        "You can use comparison operators, IN, BETWEEN, AND, and OR to select the relevant records.",
        "Always verify the filter conditions before interpreting the result. A minimum or maximum is meaningful only in relation to the selected rows."
      ],
      code: {
        language: "sql",
        code: `-- Minimum and maximum salaries for all employees
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees;

-- Minimum and maximum salaries in Engineering
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
WHERE department = 'Engineering';

-- Salary extremes for employees earning at least 50000
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
WHERE salary >= 50000;`
      },
      output: `-- All employees
minimum_salary | maximum_salary
---------------+---------------
40000.00       | 70000.00

-- Engineering
minimum_salary | maximum_salary
---------------+---------------
60000.00       | 70000.00

-- Salary >= 50000
minimum_salary | maximum_salary
---------------+---------------
50000.00       | 70000.00`,
      bullets: [
        "Engineering contains salaries of 70000 and 60000.",
        "Employees earning at least 50000 have salaries of 50000, 55000, 60000, and 70000.",
        "The WHERE clause changes the input used by both aggregate functions."
      ]
    },
    {
      id: "min-max-dates",
      title: "4. MIN() and MAX() with Dates",
      paragraphs: [
        "MIN() and MAX() can find the earliest and latest non-NULL date or timestamp values. They are useful for finding the first order, latest payment, oldest employee record, or most recent login.",
        "MIN(order_date) returns the earliest date in the selected rows. MAX(order_date) returns the latest date.",
        "Date and timestamp columns should use appropriate date/time data types. Storing dates as inconsistent text strings can produce incorrect chronological comparisons.",
        "When filtering timestamps by a calendar period, an inclusive start and exclusive end is often a reliable pattern because it includes all times on the start date while excluding the next period."
      ],
      code: {
        language: "sql",
        code: `-- Assumes orders contains an order_date column
SELECT
    MIN(order_date) AS first_order_date,
    MAX(order_date) AS latest_order_date
FROM orders;

-- Find the latest order in January 2026
SELECT MAX(order_date) AS latest_january_order
FROM orders
WHERE order_date >= '2026-01-01'
  AND order_date < '2026-02-01';`
      },
      bullets: [
        "MIN(order_date) finds the earliest non-NULL order date.",
        "MAX(order_date) finds the latest non-NULL order date.",
        "The second query limits the search to January 2026.",
        "The table and column names are examples; adapt them to your schema."
      ]
    },
    {
      id: "min-max-text",
      title: "5. MIN() and MAX() with Text Values",
      paragraphs: [
        "MIN() and MAX() can compare text values according to the database's string comparison and collation rules.",
        "For example, MIN(name) may return the alphabetically earliest name and MAX(name) may return the alphabetically latest name under the applicable collation.",
        "Case sensitivity, accent handling, and locale-specific sorting can affect string comparisons. Do not assume every database orders text identically.",
        "Text comparison order is not the same as finding the shortest or longest string. Use an appropriate length expression if the business requirement concerns string length."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(name) AS minimum_name,
    MAX(name) AS maximum_name
FROM minmax_demo_employees;`
      },
      output: `minimum_name | maximum_name
-------------+-------------
Anita        | Rahul`,
      bullets: [
        "The example assumes a common case-insensitive or case-consistent alphabetical ordering for these names.",
        "Exact text ordering depends on the database collation.",
        "MIN(name) does not mean the name with the fewest characters.",
        "MAX(name) does not mean the name with the most characters."
      ]
    },
    {
      id: "min-max-group",
      title: "6. MIN() and MAX() with GROUP BY",
      paragraphs: [
        "GROUP BY creates groups based on one or more columns. MIN() and MAX() then calculate the minimum and maximum separately for each group.",
        "A department salary report can show the lowest and highest salary in Engineering, HR, and Sales.",
        "This is useful for departmental comparisons, product-category price ranges, and regional sales reports.",
        "ORDER BY can sort the resulting groups by department name or by one of the calculated values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
GROUP BY department
ORDER BY department;`
      },
      output: `department  | minimum_salary | maximum_salary
------------+----------------+---------------
Engineering | 60000.00       | 70000.00
HR          | 45000.00       | 50000.00
Sales       | 40000.00       | 55000.00`,
      bullets: [
        "Engineering: minimum 60000, maximum 70000.",
        "HR: minimum 45000, maximum 50000.",
        "Sales: minimum 40000, maximum 55000.",
        "Each row represents a department rather than an individual employee."
      ]
    },
    {
      id: "min-max-null",
      title: "7. MIN(), MAX(), and NULL Values",
      paragraphs: [
        "MIN() and MAX() ignore NULL values. A NULL value is not treated as zero or as a value smaller or larger than all other values.",
        "If a column contains 100, 200, and NULL, MIN(column) returns 100 and MAX(column) returns 200.",
        "If every input value is NULL, or the query matches no rows, MIN() and MAX() generally return NULL.",
        "An aggregate query without GROUP BY generally returns one result row even for empty input. A grouped query with no matching rows returns no groups."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE minmax_demo_nulls (
    id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

INSERT INTO minmax_demo_nulls (id, amount)
VALUES
    (1, 100.00),
    (2, 200.00),
    (3, NULL);

SELECT
    MIN(amount) AS minimum_amount,
    MAX(amount) AS maximum_amount
FROM minmax_demo_nulls;

SELECT
    MIN(amount) AS minimum_amount,
    MAX(amount) AS maximum_amount
FROM minmax_demo_nulls
WHERE amount IS NULL;`
      },
      output: `-- First query
minimum_amount | maximum_amount
---------------+---------------
100.00         | 200.00

-- Second query
minimum_amount | maximum_amount
---------------+---------------
NULL           | NULL`,
      bullets: [
        "The first query ignores the NULL amount and compares 100 with 200.",
        "The second query selects a row whose amount is NULL, leaving no non-NULL values to compare.",
        "Use IS NULL to test for NULL values."
      ]
    },
    {
      id: "min-max-extreme-row",
      title: "8. Finding the Record with the Minimum or Maximum Value",
      paragraphs: [
        "MIN() and MAX() return the extreme value, not the full row containing that value. If you need the employee with the highest salary, you can compare each salary with the maximum salary.",
        "A subquery calculates the maximum salary first. The outer query then selects every employee whose salary equals that maximum.",
        "If multiple employees share the same maximum salary, the query returns all tied employees. Use a ranking function or an explicit tie-breaking rule if the application requires exactly one record."
      ],
      code: {
        language: "sql",
        code: `-- Return every employee tied for the highest salary
SELECT id, name, department, salary
FROM minmax_demo_employees
WHERE salary = (
    SELECT MAX(salary)
    FROM minmax_demo_employees
);

-- Return every employee tied for the lowest salary
SELECT id, name, department, salary
FROM minmax_demo_employees
WHERE salary = (
    SELECT MIN(salary)
    FROM minmax_demo_employees
);`
      },
      output: `-- Highest salary
id | name  | department  | salary
---+-------+-------------+--------
1  | Anita | Engineering | 70000.00

-- Lowest salary
id | name  | department | salary
---+-------+------------+--------
4  | Kiran | Sales      | 40000.00`,
      bullets: [
        "The subquery returns a single maximum or minimum value.",
        "The outer query retrieves rows matching that value.",
        "Ties are preserved because every matching row is returned.",
        "This pattern is useful when you need employee or product details alongside the extreme value."
      ]
    },
    {
      id: "min-max-range",
      title: "9. Calculating a Range with MIN() and MAX()",
      paragraphs: [
        "Subtracting MIN() from MAX() gives the range between the largest and smallest numeric values in the selected input.",
        "For employee salaries, MAX(salary) - MIN(salary) shows the difference between the highest and lowest salaries.",
        "The range is a measure of spread, not an average. A large range can indicate a large difference between the highest and lowest observations.",
        "The expression is most meaningful for numeric values where subtraction is defined."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM minmax_demo_employees;`
      },
      output: `minimum_salary | maximum_salary | salary_range
---------------+----------------+-------------
40000.00       | 70000.00       | 30000.00`,
      bullets: [
        "Minimum salary = 40000.",
        "Maximum salary = 70000.",
        "Salary range = 70000 - 40000 = 30000."
      ]
    },
    {
      id: "min-max-common-mistakes",
      title: "10. Common MIN() and MAX() Mistakes",
      paragraphs: [
        "Although MIN() and MAX() are straightforward, their results can be misunderstood when NULL values, filtering, ties, and data types are not considered."
      ],
      bullets: [
        "Mistake: Assuming MIN() returns the entire row with the smallest value. Fix: use a subquery, join, or ranking query to retrieve the matching row.",
        "Mistake: Assuming MAX() returns only one record when values are tied. Fix: query for all rows matching the maximum or define a tie-breaking rule.",
        "Mistake: Treating NULL as zero. Fix: remember that MIN() and MAX() ignore NULL values.",
        "Mistake: Using a text column to store dates in inconsistent formats. Fix: use proper DATE or TIMESTAMP types.",
        "Mistake: Assuming MIN(text) and MAX(text) always follow the same ordering rules. Fix: consider the database collation.",
        "Mistake: Forgetting WHERE conditions. Fix: verify which rows participate in the calculation.",
        "Mistake: Expecting grouped results for categories with no matching records. Fix: understand that GROUP BY produces groups from rows present in its input.",
        "Mistake: Assuming the minimum value is unique. Fix: check whether multiple records share that value."
      ]
    },
    {
      id: "practice-beginner",
      title: "11. Beginner Practice Exercises",
      paragraphs: [
        "Solve these exercises using minmax_demo_employees. Try to predict each output before running the query."
      ],
      bullets: [
        "Exercise 1: Find the minimum salary.",
        "Exercise 2: Find the maximum salary.",
        "Exercise 3: Find the minimum and maximum salary in Engineering.",
        "Exercise 4: Calculate the salary range.",
        "Exercise 5: Find the alphabetically minimum employee name."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT MIN(salary) AS minimum_salary
FROM minmax_demo_employees;

-- Exercise 2
SELECT MAX(salary) AS maximum_salary
FROM minmax_demo_employees;

-- Exercise 3
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
WHERE department = 'Engineering';

-- Exercise 4
SELECT MAX(salary) - MIN(salary) AS salary_range
FROM minmax_demo_employees;

-- Exercise 5
SELECT MIN(name) AS minimum_name
FROM minmax_demo_employees;`
      },
      output: `Exercise 1: 40000.00
Exercise 2: 70000.00
Exercise 3: minimum = 60000.00, maximum = 70000.00
Exercise 4: 30000.00
Exercise 5: Anita, under the example's assumed alphabetical ordering`
    },
    {
      id: "practice-intermediate",
      title: "12. Intermediate Practice Exercises",
      paragraphs: [
        "These exercises combine MIN() and MAX() with filtering, grouping, and subqueries."
      ],
      bullets: [
        "Exercise 1: Find the minimum and maximum salary for each department.",
        "Exercise 2: Find the highest salary among employees earning at least 50000.",
        "Exercise 3: Return all employees earning the maximum salary.",
        "Exercise 4: Find the earliest and latest order dates in an orders table.",
        "Exercise 5: Find departments where the maximum salary is greater than 60000."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT
    department,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
GROUP BY department;

-- Exercise 2
SELECT MAX(salary) AS maximum_salary
FROM minmax_demo_employees
WHERE salary >= 50000;

-- Exercise 3
SELECT id, name, salary
FROM minmax_demo_employees
WHERE salary = (
    SELECT MAX(salary)
    FROM minmax_demo_employees
);

-- Exercise 4
SELECT
    MIN(order_date) AS earliest_order,
    MAX(order_date) AS latest_order
FROM orders;

-- Exercise 5
SELECT
    department,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
GROUP BY department
HAVING MAX(salary) > 60000;`
      },
      output: `Exercise 1:
Engineering: minimum 60000.00, maximum 70000.00
HR: minimum 45000.00, maximum 50000.00
Sales: minimum 40000.00, maximum 55000.00

Exercise 2: 70000.00

Exercise 3: Anita, salary 70000.00

Exercise 4: Depends on the rows in orders.

Exercise 5:
Engineering: maximum 70000.00`
    },
    {
      id: "performance",
      title: "13. Performance Basics",
      paragraphs: [
        "MIN() and MAX() performance depends on table size, filters, indexes, data distribution, and the database optimizer.",
        "An index on a column may help the database find its minimum or maximum value efficiently, especially when the query can use the index directly. The actual benefit depends on the execution plan and query conditions.",
        "A filter such as WHERE department = 'Engineering' may benefit from an appropriate index on department, or from a composite index designed for the query workload.",
        "Use EXPLAIN in MySQL or PostgreSQL to inspect the execution plan. Avoid adding indexes without considering their storage cost and their impact on inserts, updates, and deletes."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM minmax_demo_employees
WHERE department = 'Engineering';

-- Example index for department filtering
CREATE INDEX idx_minmax_demo_department
ON minmax_demo_employees(department);`
      },
      bullets: [
        "Indexes can improve some minimum and maximum queries.",
        "A small practice dataset is not a reliable performance benchmark.",
        "The optimizer determines whether an index is beneficial.",
        "Measure performance using realistic data and execution plans."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does MIN() do?",
          answer: "MIN() returns the smallest non-NULL value in the selected input."
        },
        {
          question: "What does MAX() do?",
          answer: "MAX() returns the largest non-NULL value in the selected input."
        },
        {
          question: "Can MIN() and MAX() work with dates?",
          answer: "Yes. They can return the earliest and latest non-NULL dates, respectively."
        },
        {
          question: "Do MIN() and MAX() ignore NULL values?",
          answer: "Yes. Both functions ignore NULL values."
        },
        {
          question: "How do you find the highest salary?",
          answer: "Use SELECT MAX(salary) FROM employees."
        },
        {
          question: "What happens if no non-NULL values exist?",
          answer: "MIN() and MAX() return NULL when their input contains no non-NULL values."
        },
        {
          question: "Can MIN() and MAX() work with text?",
          answer: "Yes. They compare text values according to the database's applicable collation and comparison rules."
        },
        {
          question: "What is the difference between MIN() and MAX()?",
          answer: "MIN() returns the smallest value, whereas MAX() returns the largest value."
        },
        {
          question: "How do you find the employee earning the highest salary?",
          answer: "Use a subquery that calculates MAX(salary), then select employees whose salary equals that result. This returns all employees tied for the maximum."
        },
        {
          question: "How do you calculate the difference between the highest and lowest salaries?",
          answer: "Use MAX(salary) - MIN(salary) to calculate the numeric range."
        },
        {
          question: "Can MIN() and MAX() be used with GROUP BY?",
          answer: "Yes. GROUP BY calculates the minimum and maximum separately for each group."
        },
        {
          question: "What happens if the query matches no rows?",
          answer: "An aggregate query without GROUP BY generally returns one result row with NULL for MIN() and MAX(). A grouped query with no matching rows returns no groups."
        },
        {
          question: "Do MIN() and MAX() return the complete record containing the extreme value?",
          answer: "No. They return the extreme value only. Use a subquery, join, or ranking query to retrieve the associated record."
        },
        {
          question: "What happens when multiple employees share the highest salary?",
          answer: "A query comparing salary with the maximum salary returns every employee tied for that value, unless an additional rule limits the result."
        },
        {
          question: "Can indexes improve MIN() and MAX() performance?",
          answer: "Yes, in suitable queries an index may help the database find an extreme value efficiently. Verify the actual execution plan before assuming an index will help."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision",
      paragraphs: [
        "MIN() and MAX() find the smallest and largest non-NULL values in SQL. Practise them with numeric columns, dates, text, filters, grouping, and subqueries."
      ],
      bullets: [
        "MIN(column) returns the smallest non-NULL value.",
        "MAX(column) returns the largest non-NULL value.",
        "WHERE filters input rows before aggregation.",
        "GROUP BY calculates minimum and maximum values per group.",
        "MIN() and MAX() can work with numeric, date/time, and comparable text values.",
        "NULL values are ignored.",
        "If there are no non-NULL values, the result is generally NULL.",
        "MIN() and MAX() return values, not complete records.",
        "A subquery can retrieve records matching the minimum or maximum.",
        "MAX(value) - MIN(value) calculates a numeric range.",
        "Indexes may help certain queries; inspect execution plans to verify."
      ]
    }
  ]
};
