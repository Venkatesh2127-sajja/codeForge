
export const countFunction = {
  id: 2032,
  title: "COUNT() Function",
  slug: "count-function",
  topicTitle: "Aggregate Functions",
  description:
    "Learn COUNT(*), COUNT(column), and COUNT(DISTINCT column) with detailed explanations, NULL handling, filtering, grouping, practical SQL examples, exercises, and interview questions.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction to COUNT()",
      paragraphs: [
        "COUNT() is a SQL aggregate function used to count rows or non-NULL values. It is one of the most frequently used functions in reporting, analytics, dashboards, and database applications.",
        "For example, an employee management system can use COUNT() to find the total number of employees, count employees who have a recorded email address, or calculate how many distinct departments exist.",
        "SQL provides three commonly used counting patterns: COUNT(*), COUNT(column_name), and COUNT(DISTINCT column_name). They look similar, but their behavior is different.",
        "Understanding NULL values is particularly important because COUNT(*) counts rows even when their columns contain NULL, while COUNT(column_name) ignores rows where that expression is NULL."
      ],
      bullets: [
        "COUNT(*) counts every row in the input.",
        "COUNT(column_name) counts rows where the column is not NULL.",
        "COUNT(DISTINCT column_name) counts unique non-NULL values.",
        "COUNT() returns zero when there are no rows to count.",
        "COUNT() can be combined with WHERE, GROUP BY, and HAVING."
      ],
      code: {
        language: "sql",
        code: `-- Count all employees
SELECT COUNT(*) AS total_employees
FROM employees;

-- Count employees with a recorded email
SELECT COUNT(email) AS employees_with_email
FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      }
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use the following employees table to understand the difference between the COUNT() variations. It deliberately contains NULL email and department values so you can observe how SQL handles missing data.",
        "Run the CREATE TABLE and INSERT statements in your MySQL or PostgreSQL database before executing the examples in this lesson."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE count_demo_employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO count_demo_employees
    (id, name, department, email)
VALUES
    (1, 'Anita', 'Engineering', 'anita@example.com'),
    (2, 'Rahul', 'HR', NULL),
    (3, 'Priya', 'Engineering', 'priya@example.com'),
    (4, 'Kiran', 'Sales', NULL),
    (5, 'Meena', 'HR', 'meena@example.com'),
    (6, 'Arjun', NULL, 'arjun@example.com');`
      },
      output: `id | name  | department  | email
---+-------+-------------+-------------------
1  | Anita | Engineering | anita@example.com
2  | Rahul | HR          | NULL
3  | Priya | Engineering | priya@example.com
4  | Kiran | Sales       | NULL
5  | Meena | HR          | meena@example.com
6  | Arjun | NULL        | arjun@example.com`,
      bullets: [
        "Total rows: 6.",
        "Non-NULL email values: 4.",
        "Non-NULL department values: 5.",
        "Distinct non-NULL departments: 3."
      ]
    },
    {
      id: "count-star",
      title: "3. COUNT(*) — Count All Rows",
      paragraphs: [
        "COUNT(*) counts every row in the input result, regardless of whether individual columns contain NULL values.",
        "The asterisk does not mean that SQL adds up every column. It means that the query counts rows.",
        "This is the preferred and clearest form when you need the total number of matching records in a table or result set.",
        "If a table contains six employee rows, COUNT(*) returns six. If a WHERE condition matches only two rows, COUNT(*) returns two."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS total_employees
FROM count_demo_employees;

SELECT COUNT(*) AS engineering_employees
FROM count_demo_employees
WHERE department = 'Engineering';`
      },
      output: `total_employees
---------------
6

engineering_employees
---------------------
2`,
      bullets: [
        "The first query counts all six employees.",
        "The second query counts only employees in Engineering.",
        "Rows with NULL in unrelated columns are still counted.",
        "In ordinary SQL usage, COUNT(1) also counts input rows, but COUNT(*) communicates the intent more clearly."
      ]
    },
    {
      id: "count-column",
      title: "4. COUNT(column_name) — Count Non-NULL Values",
      paragraphs: [
        "COUNT(column_name) counts the number of rows in which the specified column expression is not NULL. It does not count every row automatically.",
        "In the sample dataset, six employees exist, but only four have a recorded email address. Therefore, COUNT(email) returns four.",
        "This pattern is useful when measuring data completeness, such as the number of customers with phone numbers, employees with email addresses, or orders with a recorded delivery date.",
        "A value such as an empty string is not necessarily NULL. COUNT(column_name) counts empty strings because they are values rather than SQL NULL values."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(email) AS employees_with_email
FROM count_demo_employees;

SELECT COUNT(department) AS employees_with_department
FROM count_demo_employees;

SELECT COUNT(name) AS employees_with_name
FROM count_demo_employees;`
      },
      output: `employees_with_email
--------------------
4

employees_with_department
-------------------------
5

employees_with_name
-------------------
6`,
      bullets: [
        "COUNT(email) returns four because two email values are NULL.",
        "COUNT(department) returns five because one department value is NULL.",
        "COUNT(name) returns six because every name is populated.",
        "Choose the column based on the values you want to count."
      ]
    },
    {
      id: "count-distinct",
      title: "5. COUNT(DISTINCT column_name) — Count Unique Values",
      paragraphs: [
        "COUNT(DISTINCT column_name) counts the number of unique, non-NULL values in the specified expression.",
        "Suppose a department appears in several employee rows. COUNT(DISTINCT department) counts that department once instead of counting every employee assigned to it.",
        "This function is commonly used to calculate the number of unique customers who placed orders, distinct products sold, unique departments, and unique users who visited an application.",
        "Duplicate values are removed for the count, and NULL values are excluded. If every value is NULL, COUNT(DISTINCT column_name) returns zero."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(DISTINCT department) AS unique_departments
FROM count_demo_employees;

SELECT COUNT(DISTINCT email) AS unique_email_addresses
FROM count_demo_employees;`
      },
      output: `unique_departments
------------------
3

unique_email_addresses
----------------------
4`,
      bullets: [
        "The non-NULL departments are Engineering, HR, and Sales.",
        "The four recorded email addresses are unique in this dataset.",
        "Repeated department names are counted only once.",
        "COUNT(DISTINCT department) does not count NULL as an additional department."
      ]
    },
    {
      id: "comparison",
      title: "6. COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)",
      paragraphs: [
        "The key difference is what SQL counts: all rows, non-NULL expression values, or distinct non-NULL expression values.",
        "Using the same input column for each query is a good way to understand the difference. The counts may be identical in some datasets, but they can differ when NULL or duplicate values exist."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS all_rows,
    COUNT(department) AS non_null_departments,
    COUNT(DISTINCT department) AS unique_departments
FROM count_demo_employees;`
      },
      output: `all_rows | non_null_departments | unique_departments
---------+----------------------+-------------------
6        | 5                    | 3`,
      bullets: [
        "COUNT(*) = 6 because there are six rows.",
        "COUNT(department) = 5 because one department is NULL.",
        "COUNT(DISTINCT department) = 3 because there are three unique non-NULL department values."
      ]
    },
    {
      id: "where-filtering",
      title: "7. Using COUNT() with WHERE",
      paragraphs: [
        "WHERE filters source rows before COUNT() calculates the result. This lets you count only records that satisfy a condition.",
        "You can filter by a department, salary, status, date, or multiple conditions using AND and OR.",
        "Remember that a comparison such as email = NULL does not correctly test for missing values. Use IS NULL or IS NOT NULL."
      ],
      code: {
        language: "sql",
        code: `-- Count Engineering employees
SELECT COUNT(*) AS engineering_count
FROM count_demo_employees
WHERE department = 'Engineering';

-- Count employees without an email address
SELECT COUNT(*) AS missing_email_count
FROM count_demo_employees
WHERE email IS NULL;

-- Count employees who have an email address
SELECT COUNT(*) AS available_email_count
FROM count_demo_employees
WHERE email IS NOT NULL;

-- Count employees in Engineering or Sales
SELECT COUNT(*) AS selected_employee_count
FROM count_demo_employees
WHERE department IN ('Engineering', 'Sales');`
      },
      output: `engineering_count
-----------------
2

missing_email_count
-------------------
2

available_email_count
---------------------
4

selected_employee_count
-----------------------
3`,
      bullets: [
        "WHERE department = 'Engineering' selects Anita and Priya.",
        "IS NULL finds rows where the email is missing.",
        "IS NOT NULL finds rows where the email is present.",
        "IN matches any of the listed department values."
      ]
    },
    {
      id: "group-by",
      title: "8. Using COUNT() with GROUP BY",
      paragraphs: [
        "GROUP BY divides the selected rows into groups based on one or more columns. COUNT() then calculates a separate count for each group.",
        "For example, grouping by department shows how many employees belong to Engineering, HR, and Sales.",
        "Rows with NULL in the grouping column form their own group. This means an employee with a missing department can appear in a result whose department value is NULL.",
        "GROUP BY is useful for business reports where each category needs its own count."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM count_demo_employees
GROUP BY department
ORDER BY department;`
      },
      output: `department  | employee_count
------------+---------------
NULL        | 1
Engineering | 2
HR          | 2
Sales       | 1`,
      bullets: [
        "Engineering contains two employees.",
        "HR contains two employees.",
        "Sales contains one employee.",
        "The NULL department group contains one employee.",
        "ORDER BY department sorts the displayed groups; NULL sorting position can differ by database."
      ]
    },
    {
      id: "having",
      title: "9. Using COUNT() with HAVING",
      paragraphs: [
        "HAVING filters grouped results based on an aggregate condition. It is useful when you want to display only groups that meet a count threshold.",
        "For example, you can find departments with at least two employees. SQL forms the department groups, calculates COUNT(*) for each group, and then applies the HAVING condition.",
        "WHERE and HAVING serve different purposes: WHERE filters individual input rows, while HAVING filters groups after aggregation."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM count_demo_employees
WHERE department IS NOT NULL
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department  | employee_count
------------+---------------
Engineering | 2
HR          | 2`,
      bullets: [
        "WHERE department IS NOT NULL removes employees without a department before grouping.",
        "GROUP BY creates one group per department.",
        "HAVING COUNT(*) >= 2 keeps groups containing at least two employees.",
        "Sales is excluded because it contains only one employee."
      ]
    },
    {
      id: "empty-results",
      title: "10. What Happens When No Rows Match?",
      paragraphs: [
        "COUNT() returns zero when there are no input rows to count. This is different from some other aggregate functions, such as SUM(), which generally return NULL when there are no non-NULL values.",
        "An aggregate query without GROUP BY generally returns one result row even if its input is empty. COUNT(*) in that row is zero.",
        "A grouped query is different: if no rows survive filtering, there are no groups to display, so the grouped query returns no result rows."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS finance_employee_count
FROM count_demo_employees
WHERE department = 'Finance';

SELECT
    department,
    COUNT(*) AS employee_count
FROM count_demo_employees
WHERE department = 'Finance'
GROUP BY department;`
      },
      output: `-- First query
finance_employee_count
----------------------
0

-- Second query
No rows returned.`,
      bullets: [
        "The first query returns one summary row with a count of zero.",
        "The second query returns no groups because no Finance rows exist.",
        "Use the result shape expected by your application when handling empty datasets."
      ]
    },
    {
      id: "real-world-examples",
      title: "11. Real-World COUNT() Examples",
      paragraphs: [
        "COUNT() is widely used in backend applications to calculate dashboard metrics, validate data quality, and summarize transactions.",
        "These examples illustrate typical requirements from employee management, e-commerce, and application analytics systems."
      ],
      code: {
        language: "sql",
        code: `-- Count registered customers
SELECT COUNT(*) AS customer_count
FROM customers;

-- Count orders that have been completed
SELECT COUNT(*) AS completed_order_count
FROM orders
WHERE status = 'COMPLETED';

-- Count unique customers who placed orders
SELECT COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;

-- Count products currently in stock
SELECT COUNT(*) AS products_in_stock
FROM products
WHERE stock_quantity > 0;

-- Count employees missing email addresses
SELECT COUNT(*) AS missing_email_count
FROM count_demo_employees
WHERE email IS NULL;`
      },
      bullets: [
        "Customer dashboards use COUNT(*) to report registered customers.",
        "Order dashboards use WHERE to count completed or pending orders.",
        "Sales reports use COUNT(DISTINCT customer_id) to count unique customers.",
        "Inventory reports use COUNT(*) with stock conditions.",
        "Data-quality reports count missing required values."
      ]
    },
    {
      id: "common-mistakes",
      title: "12. Common COUNT() Mistakes",
      paragraphs: [
        "Many counting errors come from confusing rows with values or forgetting that NULL is handled differently by different SQL expressions."
      ],
      bullets: [
        "Mistake: Using COUNT(email) to count every employee. Fix: use COUNT(*) when you need the total row count.",
        "Mistake: Assuming COUNT(column) includes NULL. Fix: it counts only non-NULL expression values.",
        "Mistake: Using COUNT(department) to count unique departments. Fix: use COUNT(DISTINCT department).",
        "Mistake: Testing missing values with email = NULL. Fix: use email IS NULL.",
        "Mistake: Assuming COUNT(DISTINCT department) counts NULL as a unique department. Fix: NULL values are excluded.",
        "Mistake: Using WHERE COUNT(*) >= 2. Fix: use HAVING COUNT(*) >= 2 when filtering groups.",
        "Mistake: Forgetting that WHERE changes which rows are counted. Fix: verify the filtering conditions before interpreting the result.",
        "Mistake: Assuming a grouped query returns a zero-count row for every possible category. Fix: GROUP BY only produces groups represented in the input rows."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect way to check for NULL
SELECT COUNT(*)
FROM count_demo_employees
WHERE email = NULL;

-- Correct way
SELECT COUNT(*)
FROM count_demo_employees
WHERE email IS NULL;

-- Count unique departments
SELECT COUNT(DISTINCT department)
FROM count_demo_employees;`
      },
      output: `The first query does not correctly match NULL email values.
The second query returns 2.
The third query returns 3.`
    },
    {
      id: "practice-exercises",
      title: "13. Practice Exercises",
      paragraphs: [
        "Try to solve each problem using the count_demo_employees table. Write your query before checking the solutions."
      ],
      bullets: [
        "Exercise 1: Count all employee records.",
        "Exercise 2: Count employees with an email address.",
        "Exercise 3: Count employees without an email address.",
        "Exercise 4: Count unique departments.",
        "Exercise 5: Count employees in HR.",
        "Exercise 6: Count employees in each department, including the NULL department group.",
        "Exercise 7: Count departments that have at least two employees, excluding the NULL department.",
        "Exercise 8: Count employees whose names are not NULL."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS total_employees
FROM count_demo_employees;

-- Exercise 2
SELECT COUNT(email) AS employees_with_email
FROM count_demo_employees;

-- Exercise 3
SELECT COUNT(*) AS employees_without_email
FROM count_demo_employees
WHERE email IS NULL;

-- Exercise 4
SELECT COUNT(DISTINCT department) AS unique_departments
FROM count_demo_employees;

-- Exercise 5
SELECT COUNT(*) AS hr_employees
FROM count_demo_employees
WHERE department = 'HR';

-- Exercise 6
SELECT department, COUNT(*) AS employee_count
FROM count_demo_employees
GROUP BY department;

-- Exercise 7
SELECT department, COUNT(*) AS employee_count
FROM count_demo_employees
WHERE department IS NOT NULL
GROUP BY department
HAVING COUNT(*) >= 2;

-- Exercise 8
SELECT COUNT(name) AS employees_with_name
FROM count_demo_employees;`
      },
      output: `Exercise 1: 6
Exercise 2: 4
Exercise 3: 2
Exercise 4: 3
Exercise 5: 2
Exercise 6: NULL = 1, Engineering = 2, HR = 2, Sales = 1
Exercise 7: Engineering = 2, HR = 2
Exercise 8: 6`
    },
    {
      id: "performance",
      title: "14. COUNT() Performance Basics",
      paragraphs: [
        "COUNT() performance depends on the database engine, the table size, the query conditions, available indexes, and the execution plan. Counting rows across a large table may require substantial work.",
        "When counting rows that match a selective condition, an appropriate index can sometimes reduce the amount of data the database needs to examine. Whether an index helps depends on the query and the database optimizer.",
        "COUNT(DISTINCT column_name) may require additional work to identify unique values. Its cost depends on the number of rows, number of distinct values, indexes, and execution strategy.",
        "Use EXPLAIN in MySQL or PostgreSQL to inspect how a query is executed. Avoid adding indexes blindly; indexes consume storage and can slow down inserts, updates, and deletes."
      ],
      code: {
        language: "sql",
        code: `-- Inspect the query plan in MySQL or PostgreSQL
EXPLAIN
SELECT COUNT(*)
FROM count_demo_employees
WHERE department = 'Engineering';

-- An index may help queries filtering by department
CREATE INDEX idx_count_demo_department
ON count_demo_employees(department);`
      },
      bullets: [
        "An index may improve filtering by department on sufficiently large tables.",
        "A tiny practice table is not a reliable benchmark for index performance.",
        "The optimizer decides whether an index is beneficial for a query.",
        "Measure performance using representative data and execution plans."
      ]
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is the difference between COUNT(*) and COUNT(column)?",
          answer: "COUNT(*) counts all input rows. COUNT(column) counts rows where that expression is not NULL."
        },
        {
          question: "Does COUNT(column) count NULL values?",
          answer: "No. COUNT(column) ignores NULL values."
        },
        {
          question: "What does COUNT(DISTINCT department) do?",
          answer: "It counts the distinct non-NULL department values."
        },
        {
          question: "What does COUNT(*) return for an empty input?",
          answer: "It returns zero. An aggregate query without GROUP BY generally returns one summary row containing that count."
        },
        {
          question: "Can COUNT() be used with WHERE?",
          answer: "Yes. WHERE filters the input rows before COUNT() counts them."
        },
        {
          question: "How do you count employees in Engineering?",
          answer: "Use SELECT COUNT(*) FROM employees WHERE department = 'Engineering'."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(1)?",
          answer: "Both count input rows in common SQL databases. COUNT(*) is generally clearer because it explicitly communicates row counting."
        },
        {
          question: "What is the difference between COUNT(column) and COUNT(DISTINCT column)?",
          answer: "COUNT(column) counts all non-NULL values, including duplicates. COUNT(DISTINCT column) counts unique non-NULL values."
        },
        {
          question: "Does COUNT(DISTINCT column) count NULL?",
          answer: "No. NULL values are excluded from the distinct count."
        },
        {
          question: "Can COUNT() be used with GROUP BY?",
          answer: "Yes. GROUP BY creates groups, and COUNT() returns a count for each group."
        },
        {
          question: "Can you filter groups using WHERE COUNT(*) >= 2?",
          answer: "No. Use HAVING COUNT(*) >= 2 to filter groups based on their aggregate count."
        },
        {
          question: "How do you count employees with missing email addresses?",
          answer: "Use SELECT COUNT(*) FROM employees WHERE email IS NULL."
        },
        {
          question: "What does COUNT(email) return if every email is NULL?",
          answer: "It returns zero because there are no non-NULL email values to count."
        },
        {
          question: "Does COUNT(*) ignore rows containing NULL values?",
          answer: "No. COUNT(*) counts rows even if some or all non-key columns contain NULL values."
        },
        {
          question: "How would you count unique customers who placed orders?",
          answer: "Use SELECT COUNT(DISTINCT customer_id) FROM orders. This counts unique non-NULL customer IDs in the orders table."
        },
        {
          question: "What is the difference between WHERE and HAVING when using COUNT()?",
          answer: "WHERE filters individual rows before aggregation. HAVING filters groups based on aggregate results."
        },
        {
          question: "Is COUNT() useful for data-quality checks?",
          answer: "Yes. It can count missing email addresses, missing phone numbers, duplicate categories through comparison queries, and records meeting validation conditions."
        },
        {
          question: "How can you investigate a slow COUNT() query?",
          answer: "Inspect the execution plan using EXPLAIN, review filtering conditions and indexes, and test with representative data."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision",
      paragraphs: [
        "COUNT() is used to count rows and values in SQL. Choose the correct form based on whether you need all rows, non-NULL values, or unique non-NULL values."
      ],
      bullets: [
        "COUNT(*) counts all input rows.",
        "COUNT(column) counts non-NULL expression values.",
        "COUNT(DISTINCT column) counts unique non-NULL values.",
        "COUNT() returns zero when there are no values or rows to count.",
        "WHERE filters rows before COUNT() executes.",
        "GROUP BY calculates counts separately for each group.",
        "HAVING filters groups based on aggregate conditions.",
        "Use IS NULL and IS NOT NULL to test missing values.",
        "Indexes may help some filtered counting queries.",
        "Practise all three COUNT() forms until their differences are clear."
      ]
    }
  ]
};
