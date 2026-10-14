
export const aggregateDistinct = {
  id: 2036,
  title: "Aggregate Functions with DISTINCT",
  slug: "aggregate-distinct",
  topicTitle: "Aggregate Functions",
  description:
    "Understand how DISTINCT changes COUNT, SUM, and AVG calculations by removing duplicate expression values, with NULL handling, practical datasets, common mistakes, exercises, and interview questions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "distinct-count",
      title: "1. COUNT(DISTINCT column)",
      paragraphs: [
        "DISTINCT removes duplicate expression values before an aggregate calculation. COUNT(DISTINCT column_name) counts the unique, non-NULL values in the specified column.",
        "For example, if department values are Engineering, HR, Engineering, and Finance, there are three distinct non-NULL departments.",
        "COUNT(*) counts input rows, COUNT(column_name) counts non-NULL values including duplicates, and COUNT(DISTINCT column_name) counts unique non-NULL values.",
        "This is useful for counting unique customers, registered users, product categories, departments, and customers who placed orders."
      ],
      bullets: [
        "COUNT(*) counts all input rows.",
        "COUNT(column_name) counts non-NULL expression values.",
        "COUNT(DISTINCT column_name) counts unique non-NULL expression values.",
        "NULL values are excluded from COUNT(DISTINCT column_name).",
        "Duplicate values are counted once."
      ],
      code: {
        language: "sql",
        code: `SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },
      output: `department_count
---------------
3`,
      bullets: [
        "If Engineering appears multiple times, it contributes only one to the distinct count.",
        "The example assumes the table contains three distinct non-NULL department values."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset for DISTINCT Aggregates",
      paragraphs: [
        "The following dataset deliberately contains duplicate salary and sales amount values. It helps demonstrate why regular and DISTINCT aggregates can produce different results.",
        "Run this setup once in your practice database before trying the examples. The table is separate from the employees table used in earlier lessons."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE distinct_demo (
    id INT PRIMARY KEY,
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    amount DECIMAL(10, 2)
);

INSERT INTO distinct_demo
    (id, department, salary, amount)
VALUES
    (1, 'Engineering', 60000.00, 100.00),
    (2, 'HR',          50000.00, 100.00),
    (3, 'Engineering', 60000.00, 200.00),
    (4, 'Sales',       40000.00, 200.00),
    (5, 'HR',          45000.00, NULL),
    (6, NULL,          55000.00, 300.00);`
      },
      output: `id | department  | salary   | amount
---+-------------+----------+-------
1  | Engineering | 60000.00 | 100.00
2  | HR          | 50000.00 | 100.00
3  | Engineering | 60000.00 | 200.00
4  | Sales       | 40000.00 | 200.00
5  | HR          | 45000.00 | NULL
6  | NULL        | 55000.00 | 300.00`,
      bullets: [
        "Total rows: 6.",
        "Distinct non-NULL departments: 3.",
        "Non-NULL salary values: 6, with one duplicate salary value of 60000.",
        "Non-NULL amount values: 5, with duplicate values of 100 and 200."
      ]
    },
    {
      id: "distinct-count-comparison",
      title: "3. Compare COUNT() Variations",
      paragraphs: [
        "The easiest way to understand COUNT(DISTINCT) is to compare it with COUNT(*) and COUNT(column_name) on the same input.",
        "In the sample dataset, six rows exist, but only five department values are non-NULL. Engineering and HR each occur twice, so the number of unique non-NULL departments is three."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(department) AS non_null_departments,
    COUNT(DISTINCT department) AS unique_departments
FROM distinct_demo;`
      },
      output: `total_rows | non_null_departments | unique_departments
-----------+----------------------+-------------------
6          | 5                    | 3`,
      bullets: [
        "COUNT(*) counts all six rows.",
        "COUNT(department) excludes the row where department is NULL.",
        "COUNT(DISTINCT department) counts Engineering, HR, and Sales once each."
      ]
    },
    {
      id: "distinct-sum",
      title: "4. SUM(DISTINCT column)",
      paragraphs: [
        "SUM(DISTINCT expression) adds each distinct non-NULL expression value once. Duplicate numeric values contribute only once to the result.",
        "This differs from SUM(expression), which adds the value from every qualifying row.",
        "For example, if amounts are 100, 100, and 200, SUM(amount) returns 400 while SUM(DISTINCT amount) returns 300.",
        "Be careful when using this with salaries, orders, or payments. Two employees or transactions can legitimately have the same amount. DISTINCT removes repeated values, not duplicate business records."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(amount) AS regular_total,
    SUM(DISTINCT amount) AS distinct_total
FROM distinct_demo;`
      },
      output: `regular_total | distinct_total
--------------+---------------
900.00        | 600.00`,
      bullets: [
        "Regular total = 100 + 100 + 200 + 200 + 300 = 900.",
        "The NULL amount is ignored by SUM().",
        "Distinct total = 100 + 200 + 300 = 600.",
        "The second occurrence of 100 and 200 is not added by SUM(DISTINCT amount)."
      ]
    },
    {
      id: "distinct-average",
      title: "5. AVG(DISTINCT column)",
      paragraphs: [
        "AVG(DISTINCT expression) calculates the average of distinct non-NULL expression values. Duplicate values are removed before the average is calculated.",
        "For values 10, 10, and 20, AVG(value) returns approximately 13.3333, while AVG(DISTINCT value) returns 15 because it averages only 10 and 20.",
        "The normal average treats each row as an observation. The distinct average treats each unique value as an observation. Neither is universally better; the correct choice depends on the intended metric."
      ],
      code: {
        language: "sql",
        code: `SELECT
    AVG(amount) AS regular_average,
    AVG(DISTINCT amount) AS distinct_average
FROM distinct_demo;`
      },
      output: `regular_average | distinct_average
----------------+-----------------
180.00          | 200.00`,
      bullets: [
        "Regular average = (100 + 100 + 200 + 200 + 300) / 5 = 180.",
        "Distinct average = (100 + 200 + 300) / 3 = 200.",
        "The NULL amount is excluded from both averages.",
        "Removing duplicates changes the population being averaged."
      ]
    },
    {
      id: "distinct-example",
      title: "6. Understand the Difference with a Small Example",
      paragraphs: [
        "This simple example uses three numeric values to make the calculation easy to verify by hand.",
        "Two rows contain 100 and one row contains 200. Regular aggregates use all three rows, whereas DISTINCT aggregates use only the two unique non-NULL values."
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
      output: `regular_sum | distinct_sum | regular_average | distinct_average
------------+--------------+-----------------+----------------
400.00      | 300.00       | 133.333333...   | 150.000000`,
      bullets: [
        "Regular sum = 100 + 100 + 200 = 400.",
        "Distinct sum = 100 + 200 = 300.",
        "Regular average = 400 / 3 = 133.333333....",
        "Distinct average = 300 / 2 = 150."
      ]
    },
    {
      id: "distinct-null",
      title: "7. DISTINCT Aggregates and NULL",
      paragraphs: [
        "COUNT(DISTINCT column), SUM(DISTINCT column), and AVG(DISTINCT column) exclude NULL values from their aggregate calculations.",
        "For COUNT(DISTINCT column), NULL is not counted as a unique value. For SUM(DISTINCT column) and AVG(DISTINCT column), NULL does not contribute to the total or average.",
        "If the input contains no non-NULL values, COUNT(DISTINCT column) returns zero, while SUM(DISTINCT column) and AVG(DISTINCT column) generally return NULL.",
        "A duplicate NULL does not change these results because NULL is excluded from these aggregate calculations."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE distinct_null_demo (
    id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

INSERT INTO distinct_null_demo (id, amount)
VALUES
    (1, 100.00),
    (2, 100.00),
    (3, NULL),
    (4, NULL);

SELECT
    COUNT(DISTINCT amount) AS unique_amount_count,
    SUM(DISTINCT amount) AS unique_amount_total,
    AVG(DISTINCT amount) AS unique_amount_average
FROM distinct_null_demo;`
      },
      output: `unique_amount_count | unique_amount_total | unique_amount_average
--------------------+---------------------+----------------------
1                   | 100.00              | 100.00`,
      bullets: [
        "There is only one distinct non-NULL amount: 100.",
        "COUNT(DISTINCT amount) returns one.",
        "SUM(DISTINCT amount) returns 100.",
        "AVG(DISTINCT amount) returns 100."
      ]
    },
    {
      id: "distinct-group-by",
      title: "8. DISTINCT Aggregates with GROUP BY",
      paragraphs: [
        "DISTINCT aggregates can be combined with GROUP BY to calculate unique counts, sums, or averages for each group.",
        "For example, COUNT(DISTINCT customer_id) grouped by region calculates the number of unique customers represented in each region.",
        "The distinction between rows and values still matters within every group. A customer appearing on multiple orders in the same region contributes only once to COUNT(DISTINCT customer_id)."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_rows,
    COUNT(DISTINCT salary) AS unique_salary_values
FROM distinct_demo
GROUP BY department
ORDER BY department;`
      },
      output: `department  | employee_rows | unique_salary_values
------------+---------------+--------------------
NULL        | 1             | 1
Engineering | 2             | 1
HR          | 2             | 2
Sales       | 1             | 1`,
      bullets: [
        "Engineering has two rows but only one distinct salary value.",
        "HR has two different salary values.",
        "The row with a NULL department forms a separate group.",
        "COUNT(DISTINCT salary) excludes NULL salary values."
      ]
    },
    {
      id: "distinct-real-world",
      title: "9. Real-World Use Cases",
      paragraphs: [
        "DISTINCT aggregates are useful when the question concerns unique entities or unique numeric values rather than the number of records.",
        "In e-commerce, a customer can place several orders. COUNT(DISTINCT customer_id) counts each customer once in the selected data, while COUNT(*) counts the matching order rows.",
        "In analytics, the same user can create multiple events. Counting distinct user IDs helps measure unique users represented in the event dataset.",
        "For financial totals, do not use SUM(DISTINCT amount) merely because repeated amounts look duplicated. Separate transactions with the same amount are still separate transactions."
      ],
      code: {
        language: "sql",
        code: `-- Count unique customers who placed orders
SELECT COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;

-- Count unique products represented in order items
SELECT COUNT(DISTINCT product_id) AS unique_products
FROM order_items;

-- Count unique users in application events
SELECT COUNT(DISTINCT user_id) AS unique_users
FROM user_events;

-- Count unique departments
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;`
      },
      bullets: [
        "COUNT(DISTINCT customer_id) counts unique customer IDs in the selected orders.",
        "COUNT(DISTINCT product_id) counts unique products represented in order items.",
        "COUNT(DISTINCT user_id) counts unique non-NULL user IDs in the selected events.",
        "The table and column names are illustrative and should match your schema."
      ]
    },
    {
      id: "distinct-common-mistakes",
      title: "10. Common DISTINCT Aggregate Mistakes",
      paragraphs: [
        "DISTINCT changes the values supplied to an aggregate. Using it without understanding whether the requirement concerns rows, records, or unique values can produce incorrect reports."
      ],
      bullets: [
        "Mistake: Using COUNT(DISTINCT column) when the requirement is to count all rows. Fix: use COUNT(*).",
        "Mistake: Using SUM(DISTINCT salary) to calculate total payroll. Fix: use SUM(salary) when every employee salary should contribute.",
        "Mistake: Assuming DISTINCT counts NULL as one unique value. Fix: COUNT(DISTINCT expression) excludes NULL.",
        "Mistake: Assuming SUM(DISTINCT amount) removes duplicate records. Fix: it removes repeated numeric values, even when those values belong to legitimate transactions.",
        "Mistake: Assuming AVG(DISTINCT value) is always more accurate. Fix: choose regular or distinct averaging according to the definition of the metric.",
        "Mistake: Using DISTINCT to conceal a row-multiplication problem caused by an incorrect JOIN. Fix: inspect the join relationship and correct the query.",
        "Mistake: Expecting COUNT(DISTINCT column) to count unique combinations of multiple columns. Fix: use the database-appropriate multi-column syntax or a carefully designed distinct subquery."
      ],
      code: {
        language: "sql",
        code: `-- Count all employee rows
SELECT COUNT(*) AS employee_count
FROM employees;

-- Count unique non-NULL departments
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;

-- Total payroll: every employee contributes
SELECT SUM(salary) AS total_payroll
FROM employees;

-- Distinct salary values: a different metric
SELECT SUM(DISTINCT salary) AS distinct_salary_total
FROM employees;`
      },
      bullets: [
        "The correct query depends on the business question.",
        "DISTINCT is not a general-purpose fix for duplicate rows introduced by a JOIN."
      ]
    },
    {
      id: "practice-beginner",
      title: "11. Beginner Practice Exercises",
      paragraphs: [
        "Use the distinct_demo table to solve the following exercises. Predict each result before executing the query."
      ],
      bullets: [
        "Exercise 1: Count all rows.",
        "Exercise 2: Count unique non-NULL departments.",
        "Exercise 3: Count unique non-NULL salary values.",
        "Exercise 4: Calculate the regular total amount.",
        "Exercise 5: Calculate the sum of distinct amounts."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS total_rows
FROM distinct_demo;

-- Exercise 2
SELECT COUNT(DISTINCT department) AS department_count
FROM distinct_demo;

-- Exercise 3
SELECT COUNT(DISTINCT salary) AS unique_salary_count
FROM distinct_demo;

-- Exercise 4
SELECT SUM(amount) AS regular_total
FROM distinct_demo;

-- Exercise 5
SELECT SUM(DISTINCT amount) AS distinct_total
FROM distinct_demo;`
      },
      output: `Exercise 1: 6
Exercise 2: 3
Exercise 3: 5
Exercise 4: 900.00
Exercise 5: 600.00`
    },
    {
      id: "practice-intermediate",
      title: "12. Intermediate Practice Exercises",
      paragraphs: [
        "These exercises combine DISTINCT aggregates with grouping and filtering."
      ],
      bullets: [
        "Exercise 1: Count distinct departments.",
        "Exercise 2: Calculate the regular and distinct salary totals.",
        "Exercise 3: Calculate regular and distinct average amounts.",
        "Exercise 4: Count unique salary values for each department.",
        "Exercise 5: Count unique non-NULL departments for employees whose salary is at least 50000."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(DISTINCT department) AS department_count
FROM distinct_demo;

-- Exercise 2
SELECT
    SUM(salary) AS regular_total,
    SUM(DISTINCT salary) AS distinct_total
FROM distinct_demo;

-- Exercise 3
SELECT
    AVG(amount) AS regular_average,
    AVG(DISTINCT amount) AS distinct_average
FROM distinct_demo;

-- Exercise 4
SELECT
    department,
    COUNT(DISTINCT salary) AS unique_salary_count
FROM distinct_demo
GROUP BY department;

-- Exercise 5
SELECT COUNT(DISTINCT department) AS department_count
FROM distinct_demo
WHERE salary >= 50000;`
      },
      output: `Exercise 1: 3

Exercise 2:
regular_total = 320000.00
distinct_total = 260000.00

Exercise 3:
regular_average = 180.00
distinct_average = 200.00

Exercise 4:
NULL department: 1
Engineering: 1
HR: 2
Sales: 1

Exercise 5: 2`
    },
    {
      id: "performance",
      title: "13. DISTINCT Aggregate Performance",
      paragraphs: [
        "DISTINCT aggregates can require extra work because the database must identify unique values before calculating the aggregate.",
        "Performance depends on table size, the number of distinct values, indexes, filtering conditions, and the database optimizer.",
        "Use EXPLAIN in MySQL or PostgreSQL to inspect the execution plan. Do not assume DISTINCT is slow in every situation or that an index will always improve the query.",
        "For multi-million-row analytics, check query plans and benchmark with representative data before changing the schema or rewriting the aggregation."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT COUNT(DISTINCT customer_id)
FROM orders
WHERE status = 'COMPLETED';`
      },
      bullets: [
        "The query counts unique customer IDs among completed orders.",
        "The execution plan can reveal the access path and estimated work.",
        "An index may help some filtered queries, but its usefulness depends on the workload.",
        "Indexes have storage and write-maintenance costs."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does DISTINCT do in an aggregate function?",
          answer: "It removes duplicate expression values before the aggregate calculation."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(DISTINCT department)?",
          answer: "COUNT(*) counts input rows, while COUNT(DISTINCT department) counts unique, non-NULL department values."
        },
        {
          question: "What is the difference between SUM() and SUM(DISTINCT)?",
          answer: "SUM() includes every non-NULL row value. SUM(DISTINCT) includes each distinct non-NULL expression value once."
        },
        {
          question: "Does COUNT(DISTINCT column) count NULL?",
          answer: "No. NULL values are excluded."
        },
        {
          question: "When should DISTINCT be used with aggregates?",
          answer: "Use it when the requirement is to calculate using unique values rather than every qualifying row."
        },
        {
          question: "What is the difference between AVG() and AVG(DISTINCT)?",
          answer: "AVG() averages all non-NULL row values, including repeated values. AVG(DISTINCT) averages the unique non-NULL values."
        },
        {
          question: "What happens when SUM(DISTINCT column) receives duplicate values?",
          answer: "Each distinct non-NULL value contributes to the sum only once."
        },
        {
          question: "Can DISTINCT be combined with GROUP BY?",
          answer: "Yes. For example, COUNT(DISTINCT customer_id) with GROUP BY region counts unique customers in each region."
        },
        {
          question: "Does SUM(DISTINCT amount) remove duplicate transaction records?",
          answer: "No. It removes repeated amount values, even if those amounts belong to separate legitimate transactions."
        },
        {
          question: "What does COUNT(DISTINCT column) return when every value is NULL?",
          answer: "It returns zero because there are no distinct non-NULL values."
        },
        {
          question: "Why might COUNT(DISTINCT customer_id) be useful in e-commerce?",
          answer: "It counts unique non-NULL customer IDs represented in the selected orders, even when a customer has multiple orders."
        },
        {
          question: "Can DISTINCT aggregates affect query performance?",
          answer: "Yes. Identifying distinct values may require extra processing. The actual cost depends on the data, indexes, query, and database optimizer."
        },
        {
          question: "Is AVG(DISTINCT salary) always better than AVG(salary)?",
          answer: "No. They answer different questions. AVG(salary) averages employee salary rows, while AVG(DISTINCT salary) averages unique salary values."
        },
        {
          question: "How can you count unique combinations of two columns?",
          answer: "Use a database-supported multi-column DISTINCT count where available, or count rows from a SELECT DISTINCT subquery containing both columns. Be explicit about how NULL combinations should be treated."
        },
        {
          question: "Should DISTINCT be used to correct a query that returns duplicate rows after a JOIN?",
          answer: "Not automatically. Investigate the join relationship and correct the row multiplication. DISTINCT may hide the symptom without fixing the underlying query."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision",
      paragraphs: [
        "DISTINCT changes the input values used by an aggregate. The key is to understand whether the requirement is to count rows, count unique values, sum every record, or calculate a statistic over unique values."
      ],
      bullets: [
        "COUNT(*) counts all input rows.",
        "COUNT(column) counts non-NULL values, including duplicates.",
        "COUNT(DISTINCT column) counts unique non-NULL values.",
        "SUM(column) adds every non-NULL row value.",
        "SUM(DISTINCT column) adds each unique non-NULL value once.",
        "AVG(column) averages non-NULL row values.",
        "AVG(DISTINCT column) averages unique non-NULL values.",
        "DISTINCT aggregates can be combined with GROUP BY.",
        "NULL values are excluded from these aggregate calculations.",
        "Use DISTINCT only when the metric requires unique values.",
        "Do not use SUM(DISTINCT amount) to remove legitimate repeated transaction amounts.",
        "Use EXPLAIN and representative data to investigate performance."
      ]
    }
  ]
};
