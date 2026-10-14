
export const sumFunction = {
  id: 2033,
  title: "SUM() Function",
  slug: "sum-function",
  topicTitle: "Aggregate Functions",
  description:
    "Learn how to calculate totals using SUM(), aggregate expressions, filter rows, handle NULL values, use DISTINCT, and solve practical SQL reporting problems and interview questions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "sum-basics",
      title: "1. Introduction to SUM()",
      paragraphs: [
        "SUM() is a SQL aggregate function that adds the non-NULL values in a numeric column or expression. It is widely used for salary reports, total sales, payment summaries, inventory calculations, and financial analytics.",
        "For example, if three employees earn 40000, 50000, and 60000, SUM(salary) returns 150000.",
        "SUM() ignores NULL values. If there are no non-NULL values to add, including when the input is empty, SUM() generally returns NULL rather than zero.",
        "SUM() can be used on an entire table, on rows filtered by WHERE, or on groups created by GROUP BY."
      ],
      bullets: [
        "SUM(column_name) adds non-NULL numeric values.",
        "SUM(expression) adds the results of a numeric expression for the selected rows.",
        "WHERE filters the input rows before SUM() is calculated.",
        "GROUP BY calculates a separate sum for each group.",
        "COALESCE can replace a NULL total with zero when that is appropriate."
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
        "The query adds the salary values of all selected employees.",
        "The displayed decimal precision depends on the database and numeric data type."
      ]
    },
    {
      id: "sample-data",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use this sample employees table to practise SUM(). The values are chosen to make the calculations easy to verify manually.",
        "Create and populate the table in your MySQL or PostgreSQL database before running the following lessons. If your existing employees table already contains the same data, avoid inserting duplicate records."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sum_demo_employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO sum_demo_employees
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
        "Total salary: 320000.",
        "Engineering salary total: 130000.",
        "HR salary total: 95000.",
        "Sales salary total: 95000."
      ]
    },
    {
      id: "sum-filtered",
      title: "3. SUM() with WHERE",
      paragraphs: [
        "WHERE filters rows before SUM() performs the calculation. This lets you calculate a total for a specific department, date range, payment status, or other condition.",
        "For example, to calculate the combined salary of Engineering employees, SQL selects only Engineering rows and adds their salaries.",
        "The filter condition can use comparison operators, logical operators, IN, BETWEEN, and other supported SQL predicates."
      ],
      code: {
        language: "sql",
        code: `-- Total salary of all employees
SELECT SUM(salary) AS total_salary
FROM sum_demo_employees;

-- Total salary for Engineering
SELECT SUM(salary) AS engineering_salary
FROM sum_demo_employees
WHERE department = 'Engineering';

-- Total salary for employees earning at least 50000
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE salary >= 50000;

-- Total salary for HR and Sales
SELECT SUM(salary) AS selected_salary_total
FROM sum_demo_employees
WHERE department IN ('HR', 'Sales');`
      },
      output: `total_salary
------------
320000.00

engineering_salary
------------------
130000.00

salary_total
------------
235000.00

selected_salary_total
---------------------
190000.00`,
      bullets: [
        "Engineering includes Anita and Priya: 70000 + 60000 = 130000.",
        "The salary >= 50000 condition includes Anita, Rahul, Priya, and Arjun.",
        "HR and Sales together contribute 95000 + 95000 = 190000."
      ]
    },
    {
      id: "sum-expression",
      title: "4. SUM() with Expressions",
      paragraphs: [
        "SUM() can aggregate a calculated expression instead of a single column. This is useful when each row represents a transaction line, an order item, or a quantity-price combination.",
        "For an order-items table, quantity * unit_price calculates the value of each line. SUM(quantity * unit_price) adds the line values to calculate the combined total.",
        "If an expression evaluates to NULL for a row, SUM() ignores that result. Be careful when nullable inputs affect a calculation: replacing NULL with zero is a business decision, not an automatic requirement.",
        "Use an appropriate numeric type for financial calculations. Decimal arithmetic is generally preferable to floating-point arithmetic when exact decimal amounts are required."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sum_demo_order_items (
    id INT PRIMARY KEY,
    product_name VARCHAR(50),
    quantity INT,
    unit_price DECIMAL(10, 2)
);

INSERT INTO sum_demo_order_items
    (id, product_name, quantity, unit_price)
VALUES
    (1, 'Keyboard', 2, 1500.00),
    (2, 'Mouse', 3, 500.00),
    (3, 'Monitor', 1, 12000.00);

SELECT
    SUM(quantity * unit_price) AS order_total
FROM sum_demo_order_items;`
      },
      output: `order_total
-----------
16500.00`,
      bullets: [
        "Keyboard: 2 × 1500 = 3000.",
        "Mouse: 3 × 500 = 1500.",
        "Monitor: 1 × 12000 = 12000.",
        "Grand total: 3000 + 1500 + 12000 = 16500."
      ]
    },
    {
      id: "sum-empty-input",
      title: "5. SUM() and Empty Inputs",
      paragraphs: [
        "SUM() ignores NULL values. If the query produces no matching rows, or if every value to be summed is NULL, the result is generally NULL.",
        "This behavior differs from COUNT(*), which returns zero for an empty input.",
        "COALESCE(SUM(amount), 0) returns zero when SUM(amount) is NULL. Use this when a report or API contract requires zero for the absence of matching amounts.",
        "A total of zero and an unknown or unavailable total can have different meanings. Choose the default according to the application's business rules."
      ],
      code: {
        language: "sql",
        code: `-- Returns NULL when there are no matching payments
SELECT SUM(amount) AS total_amount
FROM payments
WHERE status = 'COMPLETED';

-- Return zero when the sum is NULL
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM payments
WHERE status = 'COMPLETED';`
      },
      output: `-- If no completed payment rows match:
total_amount
------------
NULL

-- With COALESCE:
total_amount
------------
0`,
      bullets: [
        "COALESCE returns the first non-NULL argument.",
        "If SUM(amount) returns a number, COALESCE preserves it.",
        "If SUM(amount) returns NULL, COALESCE returns zero in this example."
      ]
    },
    {
      id: "sum-null-values",
      title: "6. Understanding NULL Values in SUM()",
      paragraphs: [
        "NULL represents a missing or unknown value. SUM() ignores NULL values rather than treating them as zero.",
        "For example, if a table contains 100, 200, and NULL, SUM(amount) returns 300. The missing value does not contribute to the total.",
        "If all values are NULL, SUM(amount) returns NULL. If the input has no rows, it also generally returns NULL.",
        "If the business requirement says missing amounts should count as zero, COALESCE can be used inside or outside the aggregate. Understand the difference before choosing the expression."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sum_demo_amounts (
    id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

INSERT INTO sum_demo_amounts (id, amount)
VALUES
    (1, 100.00),
    (2, 200.00),
    (3, NULL);

-- NULL values are ignored
SELECT SUM(amount) AS total_amount
FROM sum_demo_amounts;

-- Replace the final NULL result with zero
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM sum_demo_amounts;

-- Replace each NULL amount with zero before summing
SELECT SUM(COALESCE(amount, 0)) AS total_amount
FROM sum_demo_amounts;`
      },
      output: `total_amount
------------
300.00

total_amount
------------
300.00

total_amount
------------
300.00`,
      bullets: [
        "In this dataset, both COALESCE examples return 300 because there are non-NULL values to add.",
        "If every amount were NULL, SUM(amount) would return NULL.",
        "Both COALESCE patterns would return zero for an all-NULL input when used as shown.",
        "COALESCE inside the aggregate replaces each NULL input; COALESCE outside the aggregate replaces the final aggregate result."
      ]
    },
    {
      id: "sum-distinct",
      title: "7. SUM(DISTINCT column) — Sum Unique Values",
      paragraphs: [
        "SUM(DISTINCT expression) adds each distinct non-NULL expression value once. Duplicate numeric values are removed before the total is calculated.",
        "For example, if the values are 100, 100, and 200, SUM(amount) returns 400, while SUM(DISTINCT amount) returns 300.",
        "This feature is useful only when the business requirement is specifically to add unique values. It should not be used to remove duplicate transaction amounts when each transaction is legitimate."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sum_demo_duplicates (
    id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

INSERT INTO sum_demo_duplicates (id, amount)
VALUES
    (1, 100.00),
    (2, 100.00),
    (3, 200.00);

SELECT
    SUM(amount) AS normal_total,
    SUM(DISTINCT amount) AS distinct_total
FROM sum_demo_duplicates;`
      },
      output: `normal_total | distinct_total
-------------+---------------
400.00       | 300.00`,
      bullets: [
        "SUM(amount) includes every non-NULL row value.",
        "SUM(DISTINCT amount) includes 100 only once and adds 200.",
        "Do not confuse unique values with unique records; two different orders can legitimately have the same amount."
      ]
    },
    {
      id: "sum-group-by",
      title: "8. SUM() with GROUP BY",
      paragraphs: [
        "GROUP BY divides rows into groups and calculates a separate total for each group. It is a common pattern in department reports, monthly sales reports, and product-category summaries.",
        "For example, grouping employee salaries by department produces one total for Engineering, one for HR, and one for Sales.",
        "The result can be sorted with ORDER BY to display the largest totals first."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS department_salary_total
FROM sum_demo_employees
GROUP BY department
ORDER BY department_salary_total DESC;`
      },
      output: `department  | department_salary_total
------------+-----------------------
Engineering | 130000.00
HR          | 95000.00
Sales       | 95000.00`,
      bullets: [
        "Engineering has the highest total salary in this dataset.",
        "HR and Sales both have a total salary of 95000.",
        "GROUP BY produces one row for each department represented in the input.",
        "If a grouping column contains NULL, those rows form a NULL group."
      ]
    },
    {
      id: "sum-multiple-conditions",
      title: "9. SUM() with Multiple Conditions",
      paragraphs: [
        "Multiple WHERE conditions can restrict the rows included in a sum. AND requires all combined conditions to be true, while OR allows either condition to match.",
        "IN is useful when matching one of several categories, and BETWEEN can be used for inclusive ranges.",
        "For complex conditions, use parentheses to make the intended logic explicit."
      ],
      code: {
        language: "sql",
        code: `-- Engineering employees earning at least 65000
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE department = 'Engineering'
  AND salary >= 65000;

-- Employees in HR or Sales
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE department IN ('HR', 'Sales');

-- Employees earning between 45000 and 60000 inclusive
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE salary BETWEEN 45000 AND 60000;`
      },
      output: `salary_total
------------
70000.00

salary_total
------------
190000.00

salary_total
------------
210000.00`,
      bullets: [
        "The first query includes only Anita.",
        "The second query adds the salaries in HR and Sales.",
        "The third query includes Rahul, Priya, Meena, and Arjun.",
        "BETWEEN includes both endpoints in this numeric range."
      ]
    },
    {
      id: "sum-case",
      title: "10. Conditional Totals with CASE",
      paragraphs: [
        "CASE allows an aggregate function to include values conditionally. This technique is often called conditional aggregation.",
        "SUM(CASE WHEN condition THEN amount ELSE 0 END) adds the amount when the condition is true and adds zero otherwise.",
        "Conditional aggregation can calculate multiple category totals in a single query, reducing the need to execute separate queries for each category.",
        "When the CASE expression has no ELSE branch, unmatched rows produce NULL. SUM() ignores those NULL values, but an explicit ELSE 0 often makes the intended calculation easier to read."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(CASE
        WHEN department = 'Engineering' THEN salary
        ELSE 0
    END) AS engineering_total,
    SUM(CASE
        WHEN department = 'HR' THEN salary
        ELSE 0
    END) AS hr_total,
    SUM(CASE
        WHEN department = 'Sales' THEN salary
        ELSE 0
    END) AS sales_total
FROM sum_demo_employees;`
      },
      output: `engineering_total | hr_total | sales_total
------------------+----------+------------
130000.00         | 95000.00 | 95000.00`,
      bullets: [
        "Each CASE expression selects salary values for one department.",
        "The ELSE 0 branch contributes zero for employees outside that department.",
        "The query returns all three department totals in one row.",
        "Conditional aggregation is useful for dashboard summaries and pivot-style reports."
      ]
    },
    {
      id: "sum-date-report",
      title: "11. SUM() for Sales and Payment Reports",
      paragraphs: [
        "In real applications, SUM() often calculates revenue or payment totals for a period or transaction status.",
        "A date filter can restrict the calculation to a reporting period. The exact date arithmetic syntax differs between database systems, so use the appropriate syntax for MySQL or PostgreSQL.",
        "The example below assumes that an orders table contains an amount column, an order_date column, and a status column."
      ],
      code: {
        language: "sql",
        code: `-- Total completed order value in a date range
SELECT COALESCE(SUM(amount), 0) AS completed_sales
FROM orders
WHERE status = 'COMPLETED'
  AND order_date >= '2026-01-01'
  AND order_date < '2026-02-01';

-- Total payment amount by status
SELECT
    status,
    SUM(amount) AS payment_total
FROM payments
GROUP BY status
ORDER BY payment_total DESC;`
      },
      bullets: [
        "The first query includes completed orders from January 2026.",
        "Using an inclusive start and exclusive end is a common way to handle date/time ranges.",
        "The second query calculates a separate payment total for each status.",
        "The table and column names are examples; adapt them to your actual schema."
      ]
    },
    {
      id: "sum-common-mistakes",
      title: "12. Common SUM() Mistakes",
      paragraphs: [
        "Incorrect totals often come from misunderstandings about NULL values, filtering, joins, and duplicate rows."
      ],
      bullets: [
        "Mistake: Assuming SUM() returns zero when no rows match. Fix: remember that it generally returns NULL and use COALESCE if zero is required.",
        "Mistake: Assuming SUM() counts rows. Fix: use COUNT() for counting and SUM() for numeric totals.",
        "Mistake: Using SUM(DISTINCT amount) to remove duplicate transactions. Fix: identify the actual duplicate records and correct the data or query logic.",
        "Mistake: Summing text values without a suitable numeric conversion. Fix: use a numeric column or a deliberate, database-appropriate conversion.",
        "Mistake: Forgetting WHERE conditions. Fix: verify which rows participate in the total.",
        "Mistake: Getting inflated totals after a one-to-many JOIN. Fix: inspect row multiplication and aggregate at the appropriate level before joining.",
        "Mistake: Using floating-point types for exact monetary values. Fix: prefer an appropriate DECIMAL or NUMERIC type for financial amounts.",
        "Mistake: Assuming NULL means zero. Fix: decide whether missing data should be excluded, treated as zero, or reported as unknown."
      ],
      code: {
        language: "sql",
        code: `-- Total of matching amounts, possibly NULL when no values match
SELECT SUM(amount) AS total_amount
FROM payments
WHERE status = 'COMPLETED';

-- Explicit zero fallback
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM payments
WHERE status = 'COMPLETED';`
      }
    },
    {
      id: "practice-beginner",
      title: "13. Beginner Practice Exercises",
      paragraphs: [
        "Solve these exercises using sum_demo_employees. Try writing the queries yourself before checking the solutions."
      ],
      bullets: [
        "Exercise 1: Calculate the total salary of all employees.",
        "Exercise 2: Calculate the Engineering salary total.",
        "Exercise 3: Calculate the combined HR and Sales salary.",
        "Exercise 4: Calculate the salary total for employees earning at least 55000.",
        "Exercise 5: Find the salary total for employees earning between 45000 and 60000 inclusive."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT SUM(salary) AS total_salary
FROM sum_demo_employees;

-- Exercise 2
SELECT SUM(salary) AS engineering_total
FROM sum_demo_employees
WHERE department = 'Engineering';

-- Exercise 3
SELECT SUM(salary) AS hr_sales_total
FROM sum_demo_employees
WHERE department IN ('HR', 'Sales');

-- Exercise 4
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE salary >= 55000;

-- Exercise 5
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE salary BETWEEN 45000 AND 60000;`
      },
      output: `Exercise 1: 320000.00
Exercise 2: 130000.00
Exercise 3: 190000.00
Exercise 4: 185000.00
Exercise 5: 210000.00`
    },
    {
      id: "practice-intermediate",
      title: "14. Intermediate Practice Exercises",
      paragraphs: [
        "These problems require expressions, grouping, and conditional aggregation. Use the same sample employees dataset."
      ],
      bullets: [
        "Exercise 1: Calculate the total salary for each department.",
        "Exercise 2: Return only departments whose salary total is greater than 95000.",
        "Exercise 3: Calculate the salary range by subtracting the minimum salary from the maximum salary.",
        "Exercise 4: Calculate the Engineering, HR, and Sales salary totals in one row.",
        "Exercise 5: Calculate the total salary for employees whose department is not NULL."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT department, SUM(salary) AS salary_total
FROM sum_demo_employees
GROUP BY department;

-- Exercise 2
SELECT department, SUM(salary) AS salary_total
FROM sum_demo_employees
GROUP BY department
HAVING SUM(salary) > 95000;

-- Exercise 3
SELECT MAX(salary) - MIN(salary) AS salary_range
FROM sum_demo_employees;

-- Exercise 4
SELECT
    SUM(CASE WHEN department = 'Engineering'
        THEN salary ELSE 0 END) AS engineering_total,
    SUM(CASE WHEN department = 'HR'
        THEN salary ELSE 0 END) AS hr_total,
    SUM(CASE WHEN department = 'Sales'
        THEN salary ELSE 0 END) AS sales_total
FROM sum_demo_employees;

-- Exercise 5
SELECT SUM(salary) AS salary_total
FROM sum_demo_employees
WHERE department IS NOT NULL;`
      },
      output: `Exercise 1:
Engineering = 130000.00
HR = 95000.00
Sales = 95000.00

Exercise 2:
Engineering = 130000.00

Exercise 3:
30000.00

Exercise 4:
Engineering = 130000.00
HR = 95000.00
Sales = 95000.00

Exercise 5:
320000.00`
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does SUM() do?",
          answer: "SUM() adds non-NULL numeric values from the selected input rows."
        },
        {
          question: "Does SUM() ignore NULL values?",
          answer: "Yes. SUM() ignores NULL values when calculating the total."
        },
        {
          question: "What does SUM() return when there are no non-NULL values?",
          answer: "It generally returns NULL. Use COALESCE(SUM(column), 0) if the application requires zero instead."
        },
        {
          question: "How do you calculate total order value?",
          answer: "For line-item data, use SUM(quantity * unit_price), with the appropriate order or payment filters."
        },
        {
          question: "Can SUM() be used with WHERE?",
          answer: "Yes. WHERE filters the rows before SUM() calculates their total."
        },
        {
          question: "What is the difference between SUM() and COUNT()?",
          answer: "SUM() adds numeric values, whereas COUNT() counts rows or non-NULL expression values, depending on the form used."
        },
        {
          question: "How can you return zero instead of NULL from SUM()?",
          answer: "Use COALESCE(SUM(column_name), 0)."
        },
        {
          question: "What is SUM(DISTINCT column)?",
          answer: "It adds each distinct non-NULL expression value once. It should only be used when the requirement is to total unique values."
        },
        {
          question: "Can SUM() be used with GROUP BY?",
          answer: "Yes. GROUP BY creates groups, and SUM() calculates a separate total for each group."
        },
        {
          question: "What is conditional aggregation?",
          answer: "Conditional aggregation combines an aggregate function with CASE, allowing totals for different conditions to be calculated in one query."
        },
        {
          question: "Can SUM() calculate an expression?",
          answer: "Yes. For example, SUM(quantity * unit_price) adds the calculated line-item values."
        },
        {
          question: "Why can a SUM() result become larger after a JOIN?",
          answer: "A one-to-many join may duplicate rows before aggregation. Inspect the join cardinality and aggregate at the correct level to avoid inflated totals."
        },
        {
          question: "What is the difference between COALESCE(SUM(amount), 0) and SUM(COALESCE(amount, 0))?",
          answer: "The first replaces the final NULL aggregate result with zero. The second replaces each NULL input with zero before summing. They can produce the same result for common cases, but their intent and behavior in more complex expressions can differ."
        },
        {
          question: "Which data type is suitable for monetary totals?",
          answer: "DECIMAL or NUMERIC is generally suitable when exact decimal arithmetic is required for monetary amounts."
        },
        {
          question: "How can you calculate monthly sales?",
          answer: "Filter orders to the desired date range and use SUM(amount). For a report across several months, group by an appropriate month expression supported by the database."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision",
      paragraphs: [
        "SUM() calculates numeric totals. Master the basic column sum first, then practise filtered sums, expressions, NULL handling, conditional aggregation, and grouped reports."
      ],
      bullets: [
        "SUM(column) adds non-NULL numeric values.",
        "SUM(expression) aggregates a calculated numeric expression.",
        "WHERE filters rows before aggregation.",
        "GROUP BY calculates one total per group.",
        "HAVING filters groups based on aggregate results.",
        "SUM(DISTINCT expression) adds distinct non-NULL expression values once.",
        "SUM() generally returns NULL for empty input or when no non-NULL values exist.",
        "COALESCE(SUM(column), 0) provides a zero fallback.",
        "CASE inside SUM() enables conditional totals.",
        "Inspect joins carefully to avoid accidentally inflated totals.",
        "Use suitable numeric types for financial calculations."
      ]
    }
  ]
};
