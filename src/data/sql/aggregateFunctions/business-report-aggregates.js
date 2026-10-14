
export const businessReportAggregates = {
  id: 2039,
  title: "Aggregate Functions in Business Reports",
  slug: "business-report-aggregates",
  topicTitle: "Aggregate Functions",
  description:
    "Apply SQL aggregate functions to employee, sales, and order reporting scenarios.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "report-introduction",
      title: "1. Understanding Business Reports with SQL",
      paragraphs: [
        "Businesses store operational information in relational tables. SQL aggregate functions transform individual records into summary metrics that help teams understand performance and make decisions.",
        "COUNT() measures record counts, SUM() calculates totals, AVG() calculates averages, and MIN() and MAX() identify the smallest and largest values.",
        "Examples include monthly sales revenue, average order value, employee salary expenditure, completed payment counts, and the highest-value transaction.",
        "A useful report must define its scope clearly. Decide which records qualify, how missing values should be handled, which time period is being measured, and whether the report should return one overall summary or separate summaries by category.",
        "This lesson starts with simple reports and then introduces filtering, grouping, NULL handling, and practical reporting exercises."
      ],
      bullets: [
        "COUNT(*) — number of input rows.",
        "SUM(amount) — total of non-NULL amounts.",
        "AVG(amount) — average of non-NULL amounts.",
        "MIN(amount) — smallest non-NULL amount.",
        "MAX(amount) — largest non-NULL amount.",
        "WHERE — filters records before aggregation.",
        "GROUP BY — calculates separate aggregates for each group."
      ]
    },
    {
      id: "report-dataset",
      title: "2. Sample Business Datasets",
      paragraphs: [
        "The employee reports use six employees with salary values totaling 320000. Engineering has three employees, Finance has two, and HR has one.",
        "The sales reports use four transactions with amounts of 1200, 800, 1500, and 500. Their total revenue is 4000 and their average transaction amount is 1000.",
        "The payment reports use four payment records: three completed payments and one pending payment. The completed amounts total 2500.",
        "Create these tables before running the examples. If your project already has equivalent tables, adapt the table and column names rather than recreating them."
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
    (2, 'Rahul', 'HR', 45000),
    (3, 'Priya', 'Engineering', 60000),
    (4, 'Kiran', 'Finance', 40000),
    (5, 'Meena', 'Finance', 50000),
    (6, 'Arjun', 'Engineering', 55000);

CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    sale_date DATE,
    category VARCHAR(30),
    amount DECIMAL(10, 2)
);

INSERT INTO sales (sale_id, sale_date, category, amount)
VALUES
    (101, '2026-01-05', 'Electronics', 1200),
    (102, '2026-01-10', 'Books', 800),
    (103, '2026-02-02', 'Electronics', 1500),
    (104, '2026-02-15', 'Books', 500);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    status VARCHAR(20),
    amount DECIMAL(10, 2)
);

INSERT INTO payments (payment_id, status, amount)
VALUES
    (1, 'COMPLETED', 1000),
    (2, 'COMPLETED', 500),
    (3, 'PENDING', 700),
    (4, 'COMPLETED', 1000);`
      },
      output: `employees: 6 records
sales: 4 records
payments: 4 records

Employee salary total: 320000.00
Sales revenue total: 4000.00
Completed payment total: 2500.00`
    },
    {
      id: "employee-report",
      title: "3. Employee Salary Report",
      paragraphs: [
        "Businesses use aggregate functions to summarize employee counts, salary expenditure, and salary ranges.",
        "COUNT(*) returns the number of employee records. SUM(salary) calculates total salary expenditure, while AVG(salary) calculates the average salary.",
        "MIN(salary) and MAX(salary) identify the lowest and highest salaries. These metrics can support workforce planning, budgeting, and compensation analysis.",
        "The query below produces one summary row for the entire employees table. It does not return individual employee details."
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
      output: `employee_count  total_salary  average_salary  minimum_salary  maximum_salary
--------------  ------------  --------------  --------------  --------------
6               320000.00     53333.333333    40000.00        70000.00`
    },
    {
      id: "employee-report-analysis",
      title: "4. Interpreting the Employee Report",
      paragraphs: [
        "The report contains six employee records and a total salary expenditure of 320000. The average salary is approximately 53333.33.",
        "The minimum salary is 40000 and the maximum salary is 70000. The difference between these values is the salary range, which is 30000.",
        "An aggregate result is a summary, not an explanation of why a value is high or low. To investigate the maximum salary, run a separate detail query that retrieves the employee or employees whose salary equals the maximum.",
        "If the salary column permits NULL, COUNT(*) and COUNT(salary) can differ. SUM() and AVG() ignore NULL salary values, so a report may need both the total employee count and the count of known salaries."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MAX(salary) - MIN(salary) AS salary_range,
    COUNT(*) AS employee_rows,
    COUNT(salary) AS employees_with_known_salary
FROM employees;

SELECT id, name, department, salary
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);`
      },
      output: `salary_range  employee_rows  employees_with_known_salary
------------  -------------  ----------------------------
30000.00      6              6

Highest-paid employee:
id  name   department   salary
--  -----  -----------  --------
1   Anita  Engineering  70000.00`
    },
    {
      id: "department-report",
      title: "5. Department Salary Report",
      paragraphs: [
        "A department report shows how salary expenditure and employee counts differ between departments.",
        "GROUP BY department creates a separate group for each department. The aggregate functions are then calculated independently for each group.",
        "Engineering has three employees with a total salary of 185000. Finance has two employees totaling 90000, while HR has one employee earning 45000.",
        "GROUP BY is introduced here because business reports commonly need category-level summaries. The next lessons will cover grouping rules, multiple grouping columns, and filtering grouped results in greater detail."
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
      id: "sales-report",
      title: "6. Sales Revenue Report",
      paragraphs: [
        "Sales teams use aggregate functions to track transaction counts, revenue, and average transaction values.",
        "COUNT(*) counts sales records, SUM(amount) calculates total revenue, and AVG(amount) calculates the average transaction amount.",
        "For the four sample transactions, total revenue is 4000 and average transaction value is 1000.",
        "The meaning of revenue depends on the data model. A sales table might contain gross sales, discounts, refunds, taxes, or net revenue separately. Choose the appropriate business measure rather than assuming every amount represents the same thing."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_transaction,
    MIN(amount) AS smallest_transaction,
    MAX(amount) AS largest_transaction
FROM sales;`
      },
      output: `transaction_count  total_revenue  average_transaction  smallest_transaction  largest_transaction
-----------------  -------------  -------------------  --------------------  --------------------
4                  4000.00        1000.000000          500.00                1500.00`
    },
    {
      id: "sales-filtered-report",
      title: "7. Filtered Sales Reports",
      paragraphs: [
        "Business reports often focus on a date range, product category, region, or sales status. WHERE filters the source rows before aggregate functions run.",
        "The first query calculates revenue from Electronics transactions. The matching amounts are 1200 and 1500, giving total revenue of 2700.",
        "The second query calculates revenue for January 2026. Its transactions are 1200 and 800, giving a total of 2000.",
        "For timestamp columns, a half-open date range using a start boundary and an exclusive next-period boundary avoids many problems associated with timestamps containing time components."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS transaction_count,
    SUM(amount) AS electronics_revenue,
    AVG(amount) AS average_transaction
FROM sales
WHERE category = 'Electronics';

SELECT
    COUNT(*) AS transaction_count,
    SUM(amount) AS january_revenue
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2026-02-01';`
      },
      output: `Electronics:
transaction_count = 2
electronics_revenue = 2700.00
average_transaction = 1350.000000

January 2026:
transaction_count = 2
january_revenue = 2000.00`
    },
    {
      id: "sales-category-report",
      title: "8. Revenue by Product Category",
      paragraphs: [
        "Category-level reports help businesses compare the revenue generated by different product categories.",
        "GROUP BY category calculates separate totals and averages for Electronics and Books. ORDER BY can then sort the resulting groups by revenue.",
        "Electronics contributes 2700, while Books contributes 1300. These category totals add up to the overall revenue of 4000.",
        "The category totals reconcile with the overall total because every sample sales record belongs to exactly one category and each row is counted once."
      ],
      code: {
        language: "sql",
        code: `SELECT
    category,
    COUNT(*) AS transaction_count,
    SUM(amount) AS category_revenue,
    AVG(amount) AS average_transaction
FROM sales
GROUP BY category
ORDER BY category_revenue DESC;`
      },
      output: `category     transaction_count  category_revenue  average_transaction
------------ ------------------  ----------------  --------------------
Electronics  2                   2700.00           1350.000000
Books        2                   1300.00            650.000000`
    },
    {
      id: "order-report",
      title: "9. Completed Payment Report",
      paragraphs: [
        "Payment reports frequently distinguish completed payments from pending, failed, or cancelled payments.",
        "WHERE status = 'COMPLETED' selects only completed payment records. COUNT(*) counts those records, SUM(amount) calculates the collected amount, and AVG(amount) calculates the average completed payment.",
        "The sample data contains three completed payments totaling 2500. Their average payment is approximately 833.33.",
        "A completed-payment total is not necessarily the same as recognized accounting revenue. The exact meaning depends on the business process, refunds, settlement rules, and accounting requirements."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS completed_payments,
    SUM(amount) AS total_collected,
    AVG(amount) AS average_payment,
    MIN(amount) AS smallest_payment,
    MAX(amount) AS largest_payment
FROM payments
WHERE status = 'COMPLETED';`
      },
      output: `completed_payments  total_collected  average_payment  smallest_payment  largest_payment
------------------  ---------------  ---------------  ----------------  ---------------
3                   2500.00          833.333333       500.00            1000.00`
    },
    {
      id: "payment-status-report",
      title: "10. Comparing Payment Statuses",
      paragraphs: [
        "A business may need to compare completed and pending payments in the same report.",
        "Conditional aggregation uses CASE inside aggregate functions to calculate multiple metrics from the same input rows.",
        "In this example, completed payments total 2500 and pending payments total 700. COALESCE ensures that a status with no matching amounts can display zero when that is the desired reporting convention.",
        "This pattern can also be used to compare successful and failed transactions, approved and rejected applications, or delivered and cancelled orders."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS all_payments,
    SUM(CASE
        WHEN status = 'COMPLETED' THEN amount
        ELSE 0
    END) AS completed_total,
    SUM(CASE
        WHEN status = 'PENDING' THEN amount
        ELSE 0
    END) AS pending_total,
    COUNT(CASE
        WHEN status = 'COMPLETED' THEN 1
    END) AS completed_count,
    COUNT(CASE
        WHEN status = 'PENDING' THEN 1
    END) AS pending_count
FROM payments;`
      },
      output: `all_payments  completed_total  pending_total  completed_count  pending_count
------------  ---------------  -------------  ---------------  -------------
4             2500.00          700.00         3                1`
    },
    {
      id: "report-null",
      title: "11. Handling Missing Report Values",
      paragraphs: [
        "COUNT(*) counts matching rows, while COUNT(amount) counts only matching rows with a non-NULL amount. SUM(amount) and AVG(amount) ignore NULL inputs.",
        "In a scalar aggregate query without GROUP BY, COUNT(*) returns zero when no rows match. SUM() and AVG() return NULL when no non-NULL values contribute to the calculation.",
        "COALESCE(SUM(amount), 0) displays zero instead of NULL when the report needs a numeric fallback. This does not mean that missing source data should always be treated as zero.",
        "For accurate reporting, distinguish between no matching payment records, matching payment records with missing amounts, and actual payments whose amount is zero."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS payment_count,
    COUNT(amount) AS payments_with_amount,
    COALESCE(SUM(amount), 0) AS total_collected,
    AVG(amount) AS average_payment
FROM payments
WHERE status = 'REFUNDED';`
      },
      output: `payment_count  payments_with_amount  total_collected  average_payment
-------------  ---------------------  ---------------  ---------------
0              0                      0.00             NULL`
    },
    {
      id: "report-null-data-quality",
      title: "12. Data Quality Checks for Reports",
      paragraphs: [
        "Before trusting a report, check whether important fields are missing. For example, a sales report can count all transactions and separately count transactions that have a known amount.",
        "The difference between COUNT(*) and COUNT(amount) indicates how many input rows have NULL amounts.",
        "A report with many missing values may produce a misleading average or total even if the SQL query is technically correct.",
        "Data-quality checks are useful in ETL pipelines, scheduled reporting jobs, finance dashboards, and analytics applications."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_sales_rows,
    COUNT(amount) AS rows_with_amount,
    COUNT(*) - COUNT(amount) AS rows_with_missing_amount,
    SUM(amount) AS known_amount_total
FROM sales;`
      },
      output: `total_sales_rows  rows_with_amount  rows_with_missing_amount  known_amount_total
----------------  ----------------  -------------------------  ------------------
4                 4                 0                          4000.00`
    },
    {
      id: "report-common-mistakes",
      title: "13. Common Reporting Mistakes",
      paragraphs: [
        "Mistake 1: Using COUNT(column) when the requirement is to count all records. COUNT(column) excludes NULL values.",
        "Mistake 2: Forgetting WHERE and accidentally including pending or failed payments in a completed-payment report.",
        "Mistake 3: Assuming AVG(amount) divides by every row. It excludes NULL amounts from its calculation.",
        "Mistake 4: Replacing every NULL with zero without considering whether zero accurately represents the business meaning.",
        "Mistake 5: Using SUM(amount) without understanding whether amount represents gross revenue, net revenue, payment collected, or another metric.",
        "Mistake 6: Joining a transaction table to a one-to-many detail table and then summing the transaction amount. The join can duplicate transaction rows and inflate the total.",
        "Mistake 7: Assuming grouped report rows will appear in a specific order without ORDER BY.",
        "Mistake 8: Filtering an aggregate result with WHERE at the same query level. Use HAVING for grouped aggregate results or a subquery for an overall aggregate."
      ],
      code: {
        language: "sql",
        code: `-- Count completed payments only
SELECT COUNT(*) AS completed_count
FROM payments
WHERE status = 'COMPLETED';

-- Sort category totals from highest to lowest
SELECT category, SUM(amount) AS category_revenue
FROM sales
GROUP BY category
ORDER BY category_revenue DESC;

-- Check for missing amounts
SELECT
    COUNT(*) AS total_rows,
    COUNT(amount) AS known_amounts
FROM sales;`
      },
      output: `Completed payment count: 3

Category report:
Electronics = 2700.00
Books = 1300.00

Data quality:
total_rows = 4
known_amounts = 4`
    },
    {
      id: "practice-beginner",
      title: "14. Beginner Practice Questions",
      paragraphs: [
        "Run these queries against the sample datasets created in this lesson.",
        "Exercise 1: Find the total number of employees.",
        "Exercise 2: Calculate total sales revenue.",
        "Exercise 3: Find the average sales transaction amount.",
        "Exercise 4: Count completed payments.",
        "Exercise 5: Calculate the highest employee salary."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS employee_count
FROM employees;

-- Exercise 2
SELECT SUM(amount) AS total_revenue
FROM sales;

-- Exercise 3
SELECT AVG(amount) AS average_transaction
FROM sales;

-- Exercise 4
SELECT COUNT(*) AS completed_count
FROM payments
WHERE status = 'COMPLETED';

-- Exercise 5
SELECT MAX(salary) AS highest_salary
FROM employees;`
      },
      output: `Exercise 1: employee_count = 6
Exercise 2: total_revenue = 4000.00
Exercise 3: average_transaction = 1000.000000
Exercise 4: completed_count = 3
Exercise 5: highest_salary = 70000.00`
    },
    {
      id: "practice-intermediate",
      title: "15. Intermediate Practice Questions with Solutions",
      paragraphs: [
        "Exercise 1: Calculate Engineering salary expenditure for employees earning at least 60000.",
        "Exercise 2: Find the revenue generated by Books.",
        "Exercise 3: Calculate the total and average completed payment.",
        "Exercise 4: Return department salary totals in descending order.",
        "Exercise 5: Find the difference between the largest and smallest sales transactions."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT SUM(salary) AS engineering_total
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

-- Exercise 2
SELECT SUM(amount) AS books_revenue
FROM sales
WHERE category = 'Books';

-- Exercise 3
SELECT
    SUM(amount) AS completed_total,
    AVG(amount) AS average_completed_payment
FROM payments
WHERE status = 'COMPLETED';

-- Exercise 4
SELECT department, SUM(salary) AS department_total
FROM employees
GROUP BY department
ORDER BY department_total DESC;

-- Exercise 5
SELECT MAX(amount) - MIN(amount) AS transaction_range
FROM sales;`
      },
      output: `Exercise 1: engineering_total = 130000.00
Exercise 2: books_revenue = 1300.00

Exercise 3:
completed_total = 2500.00
average_completed_payment = 833.333333

Exercise 4:
Engineering = 185000.00
Finance = 90000.00
HR = 45000.00

Exercise 5: transaction_range = 1000.00`
    },
    {
      id: "report-performance",
      title: "16. Performance and Report Reliability",
      paragraphs: [
        "Business reports may scan thousands or millions of records. Indexes on selective filter columns can help the database find matching rows, but their usefulness depends on data distribution and query patterns.",
        "For date-based reports, consider an index that supports the date filter. For reports filtered by status and date, a composite index may be worth evaluating after inspecting the actual execution plan.",
        "Aggregate queries still need to account for all relevant input values. An index does not guarantee that SUM() or AVG() can be calculated without reading the relevant data.",
        "For financial reports, use suitable decimal numeric types and establish clear rules for rounding, refunds, duplicate transactions, and NULL values.",
        "If reports join multiple tables, verify that each source row contributes the intended amount exactly once. A join can multiply rows and produce incorrect totals.",
        "Use EXPLAIN or the equivalent tool in your database to investigate slow reports. Validate totals against known business figures and test the report with realistic data."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    COUNT(*) AS completed_count,
    SUM(amount) AS completed_total
FROM payments
WHERE status = 'COMPLETED';`
      },
      output: `The execution plan shows how the database intends to execute the query.
Its exact output depends on the database engine, table definition, indexes, and data.`
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do aggregate functions help businesses?",
          answer:
            "They summarize records into useful metrics such as revenue, average order value, employee count, and salary expenditure."
        },
        {
          question: "How do you calculate total company salary expenditure?",
          answer:
            "Use SELECT SUM(salary) FROM employees. SUM() adds the non-NULL salary values."
        },
        {
          question: "How do you calculate revenue by department or category?",
          answer:
            "Use SUM(amount) with GROUP BY on the department or category column."
        },
        {
          question: "How do you count completed payments?",
          answer:
            "Use COUNT(*) with WHERE status = 'COMPLETED'."
        },
        {
          question: "Why might a report use COALESCE(SUM(amount), 0)?",
          answer:
            "It displays zero instead of NULL when the sum has no non-NULL input values and zero is the intended reporting fallback."
        },
        {
          question: "What is the difference between WHERE and GROUP BY?",
          answer:
            "WHERE filters input rows. GROUP BY organizes the remaining rows into groups for aggregate calculations."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters rows before aggregation, while HAVING filters groups after aggregation."
        },
        {
          question: "How do you calculate average order value?",
          answer:
            "A simple version is AVG(order_amount). In a real order model, define whether the amount represents gross or net value and whether each row represents an order or an order item."
        },
        {
          question: "What happens when SUM() receives NULL values?",
          answer:
            "SUM() ignores NULL inputs and adds the remaining non-NULL values. If no non-NULL values are available, it returns NULL."
        },
        {
          question: "How do you compare completed and pending payment totals in one query?",
          answer:
            "Use conditional aggregation with SUM(CASE WHEN status = 'COMPLETED' THEN amount ELSE 0 END) and a similar expression for PENDING."
        },
        {
          question: "Why can a report's SUM() be larger than expected after a JOIN?",
          answer:
            "A one-to-many join can duplicate rows from the original table. Check join cardinality and aggregate at the correct level before combining results."
        },
        {
          question: "Why should financial reports use DECIMAL or NUMERIC?",
          answer:
            "These types support exact decimal representation for values such as money, unlike approximate floating-point types."
        },
        {
          question: "How can you improve aggregate query performance?",
          answer:
            "Inspect the execution plan, evaluate indexes that support selective filters, avoid unnecessary row multiplication, and test with realistic data."
        },
        {
          question: "Why should business requirements be defined before writing a report?",
          answer:
            "Terms such as revenue, collected payment, net sales, and completed order may represent different measures. The query must match the intended business definition."
        }
      ]
    },
    {
      id: "revision",
      title: "18. Quick Revision",
      bullets: [
        "COUNT(*) counts input rows.",
        "SUM() calculates a total of non-NULL numeric values.",
        "AVG() calculates the average of non-NULL numeric values.",
        "MIN() and MAX() identify the smallest and largest non-NULL values.",
        "WHERE filters rows before aggregate calculations.",
        "GROUP BY produces separate aggregate results for each group.",
        "HAVING filters groups after aggregation.",
        "COALESCE can provide a default when an aggregate result is NULL.",
        "Use conditional aggregation to compare business statuses in one query.",
        "Use ORDER BY when report rows must appear in a specific order.",
        "Define revenue and payment metrics carefully before calculating totals.",
        "Check for missing values, duplicate rows, and join multiplication.",
        "Use execution plans to investigate performance problems."
      ]
    }
  ]
};
