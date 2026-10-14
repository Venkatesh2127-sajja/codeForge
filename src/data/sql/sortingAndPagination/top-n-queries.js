
export const topNQueries = {
  id: 2029,
  title: "Top-N Queries",
  slug: "top-n-queries",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Master Top-N SQL queries using ORDER BY, LIMIT, FETCH FIRST, window functions, ranking, aggregation, real-world examples, optimization, and interview exercises.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "top-n-introduction",
      title: "1. Introduction to Top-N Queries",
      paragraphs: [
        "A Top-N query retrieves a specified number of records according to a particular sorting rule. N represents the number of rows or ranking positions that we want to retrieve.",
        "For example, a company may need the three highest-paid employees, an e-commerce website may display the ten most expensive products, and an order management system may show the five newest orders.",
        "The basic pattern is SELECT, FROM, ORDER BY, and a row-limiting clause. ORDER BY decides the ranking order, while LIMIT or FETCH FIRST restricts the number of rows returned.",
        "Top-N queries are different from ordinary filtering queries. A WHERE condition selects rows that satisfy a condition, while a Top-N query typically sorts eligible rows and returns the first N rows.",
        "The correct query depends on the business requirement. Returning the top three rows is different from returning everyone tied within the top three distinct salary values."
      ],
      code: {
        language: "sql",
        code: `-- General Top-N pattern
SELECT column1, column2
FROM table_name
ORDER BY sort_column DESC
LIMIT N;`
      },
      bullets: [
        "Top-N means the first N rows according to a specified ordering.",
        "Use DESC for highest, newest, or largest values.",
        "Use ASC for lowest, oldest, or smallest values.",
        "LIMIT is supported by MySQL and PostgreSQL.",
        "FETCH FIRST is another row-limiting syntax supported by databases such as PostgreSQL and Oracle.",
        "Use window functions when ranking, ties, or groups require more control.",
        "Always clarify whether N means rows, distinct values, or ranking positions."
      ]
    },
    {
      id: "sample-data",
      title: "2. Create Sample Employee Data",
      paragraphs: [
        "Before writing Top-N queries, create a small dataset. Understanding the input rows makes it easier to verify whether sorting and ranking work correctly.",
        "The following example creates an employees table and inserts records with different salaries. Two employees have the same salary so that we can study tie-handling.",
        "Run the SQL in MySQL or PostgreSQL after selecting a database. If an employees table already exists with a different structure, adapt the table or use a separate practice table."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE topn_employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

INSERT INTO topn_employees
    (employee_id, employee_name, department_id, salary)
VALUES
    (101, 'Anita', 10, 90000),
    (102, 'Rahul', 10, 80000),
    (103, 'Priya', 20, 80000),
    (104, 'Kiran', 20, 70000),
    (105, 'Meena', 10, 60000),
    (106, 'Arjun', 30, 95000),
    (107, 'Divya', 30, 70000),
    (108, 'Vikram', 20, 50000);`
      },
      bullets: [
        "employee_id uniquely identifies each employee.",
        "department_id identifies the employee's department.",
        "salary is the numeric value used for ranking.",
        "Anita earns 90000 and Arjun earns 95000, so Arjun has the highest salary.",
        "Rahul and Priya both earn 80000, allowing us to observe how ranking functions handle ties.",
        "DECIMAL is suitable for exact decimal values such as money."
      ]
    },
    {
      id: "highest-salaries",
      title: "3. Find the Top Three Highest-Paid Employees",
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM topn_employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;`
      },
      paragraphs: [
        "The query sorts employees by salary in descending order, placing the highest salary first. LIMIT 3 then returns at most three rows.",
        "The secondary ordering by employee_id ASC determines the order when two employees have the same salary. In this particular dataset, the third row is Rahul because employee_id 102 comes before Priya's 103.",
        "The secondary ordering does not mean that Rahul has a higher salary than Priya. They have equal salaries; the ID simply provides a predictable order.",
        "A unique tie-breaker is useful because SQL does not guarantee a consistent order among rows that have equal values for every ORDER BY expression."
      ],
      output: `employee_id | employee_name | salary
------------+---------------+-------
106         | Arjun         | 95000
101         | Anita         | 90000
102         | Rahul         | 80000`,
      bullets: [
        "Step 1: Read eligible rows from the table.",
        "Step 2: Sort salary from highest to lowest.",
        "Step 3: Resolve salary ties using employee_id ascending.",
        "Step 4: Return at most three rows.",
        "This query returns three employees, not every employee earning one of the top three distinct salaries."
      ]
    },
    {
      id: "newest-orders",
      title: "4. Find the Five Newest Orders",
      paragraphs: [
        "Top-N queries can use date and timestamp columns, not just numeric columns. Sorting a date in descending order puts newer dates before older dates.",
        "The query below retrieves at most five orders. order_id DESC acts as a secondary sort key when multiple orders have the same order_date.",
        "If the requirement concerns the exact latest events, prefer a timestamp that includes time-of-day rather than a date-only column."
      ],
      code: {
        language: "sql",
        code: `SELECT order_id, customer_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 5;`
      },
      bullets: [
        "DESC retrieves the newest dates first.",
        "A unique secondary key makes ordering predictable when dates tie.",
        "The query returns fewer than five rows if fewer than five matching orders exist.",
        "An index on relevant ordering columns may help frequent queries, depending on the query plan.",
        "The orders table and its column names must match your actual database schema."
      ]
    },
    {
      id: "top-products",
      title: "5. Find the Most Expensive Products",
      paragraphs: [
        "An online store may display its ten most expensive products. This is a Top-N query because the records are ordered by price before the result is limited.",
        "This query returns at most ten product rows. If several products have the same price, product_id provides a predictable secondary order."
      ],
      code: {
        language: "sql",
        code: `SELECT product_id, product_name, price
FROM products
ORDER BY price DESC, product_id ASC
LIMIT 10;`
      },
      bullets: [
        "price DESC puts the most expensive products first.",
        "LIMIT 10 returns at most ten products.",
        "Use a unique tie-breaker when deterministic ordering matters.",
        "The most expensive products are not necessarily the best-selling products.",
        "The business metric must match the requirement."
      ]
    },
    {
      id: "top-n-warning",
      title: "6. Top N Rows vs Top N Distinct Values",
      paragraphs: [
        "LIMIT N returns at most N rows. It does not automatically include every row tied at the last position.",
        "Suppose salaries in descending order are 95000, 90000, 80000, 80000, and 70000. LIMIT 3 returns three employees, so one employee earning 80000 is excluded.",
        "If the requirement is to return everyone whose salary belongs to the three highest distinct salary values, use DENSE_RANK and filter for ranks less than or equal to three.",
        "DENSE_RANK assigns the same rank to equal salary values and does not leave gaps between ranks. Both employees earning 80000 receive rank 3 in this dataset."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM (
    SELECT
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM topn_employees
) ranked
WHERE salary_rank <= 3
ORDER BY salary DESC, employee_id ASC;`
      },
      output: `employee_id | employee_name | salary | salary_rank
------------+---------------+--------+------------
106         | Arjun         | 95000  | 1
101         | Anita         | 90000  | 2
102         | Rahul         | 80000  | 3
103         | Priya         | 80000  | 3`,
      bullets: [
        "LIMIT 3 means at most three rows.",
        "DENSE_RANK() <= 3 means all rows belonging to the top three distinct salary values.",
        "DENSE_RANK assigns equal values the same rank.",
        "Do not add employee_id to the DENSE_RANK window ordering when ranking distinct salaries; doing so would break salary ties.",
        "The outer ORDER BY controls final display order and does not change the rank already calculated."
      ]
    },
    {
      id: "ranking-functions",
      title: "7. ROW_NUMBER vs RANK vs DENSE_RANK",
      paragraphs: [
        "SQL window functions calculate values across related rows without collapsing the rows into a single aggregate result. They are particularly useful for ranking, Top-N queries, and reporting.",
        "ROW_NUMBER assigns a unique sequential number to each row according to the window ordering. RANK gives tied rows the same rank but leaves gaps after ties. DENSE_RANK gives tied rows the same rank without leaving gaps.",
        "Consider salaries 95000, 90000, 80000, 80000, and 70000. The two employees earning 80000 share the same RANK and DENSE_RANK values, but ROW_NUMBER gives them different row numbers.",
        "If ROW_NUMBER is used and repeatable ordering is required, include a unique tie-breaker in the window ORDER BY."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    ROW_NUMBER() OVER (
        ORDER BY salary DESC, employee_id ASC
    ) AS row_num,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank,
    DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) AS dense_salary_rank
FROM topn_employees
ORDER BY salary DESC, employee_id ASC;`
      },
      output: `employee_name | salary | row_num | salary_rank | dense_salary_rank
--------------+--------+---------+-------------+------------------
Arjun         | 95000  | 1       | 1           | 1
Anita         | 90000  | 2       | 2           | 2
Rahul         | 80000  | 3       | 3           | 3
Priya         | 80000  | 4       | 3           | 3
Kiran         | 70000  | 5       | 5           | 4`,
      bullets: [
        "ROW_NUMBER: every row receives a unique sequence number.",
        "RANK: ties share a rank, and subsequent ranks can contain gaps.",
        "DENSE_RANK: ties share a rank, and subsequent ranks do not contain gaps.",
        "For the salaries shown, RANK assigns Kiran rank 5 because rank 4 is skipped.",
        "DENSE_RANK assigns Kiran rank 4 because the next distinct salary receives the next rank.",
        "Window functions such as these are supported by modern MySQL and PostgreSQL versions."
      ]
    },
    {
      id: "second-highest-salary",
      title: "8. Find the Second-Highest Distinct Salary",
      paragraphs: [
        "The second-highest salary is a common SQL interview problem. The key is to clarify whether the question asks for the second row after sorting or the second-highest distinct salary.",
        "For the second-highest distinct salary, DENSE_RANK is useful because all employees with the same salary receive the same rank.",
        "Filter for rank 2 to retrieve all employees earning the second-highest distinct salary. In the sample dataset, Anita earns 90000 and receives rank 2."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM (
    SELECT
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM topn_employees
) ranked
WHERE salary_rank = 2
ORDER BY employee_id ASC;`
      },
      output: `employee_id | employee_name | salary | salary_rank
------------+---------------+--------+------------
101         | Anita         | 90000  | 2`,
      bullets: [
        "DENSE_RANK handles duplicate salary values.",
        "The query returns every employee earning the second-highest distinct salary.",
        "If the table has fewer than two distinct non-NULL salary values, the query returns no rows.",
        "A query using LIMIT and OFFSET can identify a second row, but that is not always equivalent to a second distinct salary."
      ]
    },
    {
      id: "top-n-per-group",
      title: "9. Find the Top Two Employees in Each Department",
      paragraphs: [
        "A Top-N per group query returns the best N rows within each group instead of across the entire table.",
        "For example, a company may need the two highest-paid employees in every department. Sorting and limiting the entire table to two employees would be incorrect because only two employees overall would be returned.",
        "PARTITION BY department_id creates a separate ranking sequence for every department. ROW_NUMBER then numbers employees within each department.",
        "Filtering for row_num <= 2 returns at most two employees per department. If the requirement is to include everyone tied at the second salary position, use an appropriate ranking function instead."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department_id,
    employee_id,
    employee_name,
    salary
FROM (
    SELECT
        department_id,
        employee_id,
        employee_name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC, employee_id ASC
        ) AS row_num
    FROM topn_employees
) ranked
WHERE row_num <= 2
ORDER BY department_id, salary DESC, employee_id ASC;`
      },
      output: `department_id | employee_id | employee_name | salary
--------------+-------------+---------------+-------
10            | 101         | Anita         | 90000
10            | 102         | Rahul         | 80000
20            | 103         | Priya         | 80000
20            | 104         | Kiran         | 70000
30            | 106         | Arjun         | 95000
30            | 107         | Divya         | 70000`,
      bullets: [
        "PARTITION BY separates the ranking into departments.",
        "ROW_NUMBER assigns each employee a position inside their department.",
        "The outer WHERE clause filters the calculated row number.",
        "A department with only one employee contributes one row.",
        "Use DENSE_RANK if the business requirement is to include all employees within the top N distinct salary levels per department."
      ]
    },
    {
      id: "top-n-aggregate",
      title: "10. Find the Top Three Products by Sales",
      paragraphs: [
        "A business may define its top products by total sales rather than unit price. In that case, aggregate order-line data before selecting the Top-N products.",
        "The following example assumes an order_items table containing product_id, quantity, and unit_price. Adjust the names to match your database schema.",
        "GROUP BY creates one result per product, and SUM calculates the total sales value. ORDER BY sorts the calculated totals, and LIMIT returns the first three products.",
        "The query ranks products by revenue, not by the number of units sold. To find the best-selling products by quantity, use SUM(quantity) instead."
      ],
      code: {
        language: "sql",
        code: `SELECT
    product_id,
    SUM(quantity * unit_price) AS total_sales
FROM order_items
GROUP BY product_id
ORDER BY total_sales DESC, product_id ASC
LIMIT 3;`
      },
      bullets: [
        "SUM(quantity * unit_price) calculates sales value for each order line.",
        "GROUP BY product_id calculates one total per product.",
        "ORDER BY total_sales DESC puts the largest totals first.",
        "LIMIT 3 returns at most three products.",
        "Define whether top-selling means revenue, units sold, profit, or another metric.",
        "Real reporting queries may need to filter cancelled orders, refunds, taxes, or date ranges."
      ]
    },
    {
      id: "top-n-with-filter",
      title: "11. Top-N Queries with WHERE Conditions",
      paragraphs: [
        "Top-N queries often need filtering before sorting and limiting. For example, a company may want the three highest-paid employees in department 10.",
        "The WHERE condition selects employees from the requested department. ORDER BY then sorts only those matching rows, and LIMIT returns the first three.",
        "The logical processing of a typical SELECT query applies FROM and WHERE before calculating the final ordered result and limiting the returned rows. This is why the filter affects which rows can appear in the Top-N result."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM topn_employees
WHERE department_id = 10
ORDER BY salary DESC, employee_id ASC
LIMIT 3;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
101         | Anita         | 90000
102         | Rahul         | 80000
105         | Meena         | 60000`,
      bullets: [
        "WHERE filters rows before the Top-N result is selected.",
        "The highest-paid employees across the company may differ from those within one department.",
        "Combine filters and ordering according to the actual business requirement.",
        "Use parameterized queries when department IDs or filter values come from application input."
      ]
    },
    {
      id: "top-n-with-ties",
      title: "12. Handling Ties at the Cutoff",
      paragraphs: [
        "A business requirement may say to return the top three employees and include all employees tied with the third employee. LIMIT 3 alone does not guarantee that behavior.",
        "One solution is DENSE_RANK, which ranks distinct salary values and returns all employees within the first three salary ranks.",
        "Another supported option in databases such as PostgreSQL and Oracle is FETCH FIRST N ROWS WITH TIES. It includes additional rows tied with the last selected row according to the ORDER BY expressions.",
        "Choose the method according to the requirement. DENSE_RANK is especially useful when the requirement refers to the top N distinct salary levels, while WITH TIES refers to ties at the row cutoff."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL and Oracle
SELECT employee_id, employee_name, salary
FROM topn_employees
ORDER BY salary DESC
FETCH FIRST 3 ROWS WITH TIES;

-- Alternative: top three distinct salary levels
SELECT employee_id, employee_name, salary
FROM (
    SELECT
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM topn_employees
) ranked
WHERE salary_rank <= 3
ORDER BY salary DESC, employee_id ASC;`
      },
      bullets: [
        "LIMIT 3 returns at most three rows.",
        "WITH TIES includes rows tied at the cutoff according to the complete ORDER BY expressions.",
        "DENSE_RANK <= 3 includes all rows in the top three distinct salary values.",
        "Adding a unique ID to the ranking order can eliminate ties that otherwise exist on salary.",
        "Check support for FETCH FIRST WITH TIES in your database product and version."
      ]
    },
    {
      id: "performance",
      title: "13. Top-N Query Performance and Indexing",
      paragraphs: [
        "A Top-N query may still require substantial database work even when it returns only a few rows. Without a suitable execution strategy or index, the database may scan many records and sort them before choosing the first N.",
        "An index can help when its column order matches the query's filters and ordering. The best index depends on the database engine, existing indexes, table size, selectivity, and execution plan.",
        "For example, a frequent query filtered by department_id and ordered by salary may benefit from an index beginning with department_id and followed by salary. Confirm the actual benefit with EXPLAIN and representative data.",
        "Do not add indexes blindly. Indexes consume storage and can increase the cost of inserts, updates, and deletes.",
        "Aggregation-based Top-N queries may need to process many input rows before computing totals. For expensive recurring reports, consider query tuning, suitable indexes on source columns, or a reporting strategy designed for the workload."
      ],
      code: {
        language: "sql",
        code: `-- Inspect the query plan in MySQL or PostgreSQL
EXPLAIN
SELECT employee_id, employee_name, salary
FROM topn_employees
WHERE department_id = 10
ORDER BY salary DESC, employee_id ASC
LIMIT 3;

-- Example composite index for this access pattern
CREATE INDEX idx_topn_department_salary_id
ON topn_employees (
    department_id,
    salary DESC,
    employee_id ASC
);`
      },
      bullets: [
        "Use EXPLAIN to inspect the query plan.",
        "Design indexes around real filtering and ordering patterns.",
        "A composite index can help with department filtering and salary ordering, depending on the engine and plan.",
        "LIMIT reduces returned rows but does not guarantee that only N rows are examined.",
        "Benchmark with realistic data and concurrent workload.",
        "Do not create duplicate or unnecessary indexes without checking existing indexes."
      ]
    },
    {
      id: "common-mistakes",
      title: "14. Common Mistakes and Fixes",
      paragraphs: [
        "Top-N queries can produce technically valid but incorrect business results when the sorting column, tie behavior, or grouping logic does not match the requirement.",
        "Before writing the query, identify the metric, direction, scope, number of results, and expected tie behavior."
      ],
      bullets: [
        "Mistake: Using LIMIT without ORDER BY. Fix: Add the required ordering so the selected rows have a defined order.",
        "Mistake: Using salary ASC to find the highest salary. Fix: Use salary DESC.",
        "Mistake: Assuming LIMIT 3 returns all tied employees. Fix: Use a ranking function or WITH TIES when appropriate.",
        "Mistake: Ranking all employees when the requirement is per department. Fix: Use PARTITION BY department_id.",
        "Mistake: Adding a unique employee ID to DENSE_RANK ordering when salary ties must share a rank. Fix: Rank by salary alone and use the ID only in the final ORDER BY.",
        "Mistake: Using RANK when contiguous distinct-value ranks are required. Fix: Use DENSE_RANK.",
        "Mistake: Assuming the most expensive product is the best-selling product. Fix: Calculate the metric required by the business.",
        "Mistake: Assuming LIMIT guarantees a fast query. Fix: Inspect the execution plan and index strategy.",
        "Mistake: Returning the second row instead of the second-highest distinct salary. Fix: Use DENSE_RANK and filter for rank 2."
      ]
    },
    {
      id: "practice-beginner",
      title: "15. Practice Problems — Beginner",
      paragraphs: [
        "Solve these problems using the topn_employees sample table created earlier. Try each problem before checking its solution.",
        "These exercises focus on sorting, limiting, filtering, and selecting distinct salary levels."
      ],
      bullets: [
        "Problem 1: Find the employee with the highest salary.",
        "Problem 2: Find the three employees with the lowest salaries.",
        "Problem 3: Find the two highest-paid employees in department 20.",
        "Problem 4: Find the second-highest distinct salary.",
        "Problem 5: Find all employees earning 70000 or more, ordered by salary from highest to lowest."
      ]
    },
    {
      id: "practice-solutions",
      title: "16. Practice Solutions — Beginner",
      paragraphs: [
        "Compare your queries with the following solutions. More than one valid SQL query may solve a problem, but the selected sorting and tie behavior must match the requirement."
      ],
      code: {
        language: "sql",
        code: `-- Problem 1: Highest-paid employee
SELECT employee_id, employee_name, salary
FROM topn_employees
ORDER BY salary DESC, employee_id ASC
LIMIT 1;

-- Problem 2: Three lowest-paid employees
SELECT employee_id, employee_name, salary
FROM topn_employees
ORDER BY salary ASC, employee_id ASC
LIMIT 3;

-- Problem 3: Two highest-paid employees in department 20
SELECT employee_id, employee_name, salary
FROM topn_employees
WHERE department_id = 20
ORDER BY salary DESC, employee_id ASC
LIMIT 2;

-- Problem 4: Second-highest distinct salary
SELECT DISTINCT salary
FROM topn_employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Problem 5: Employees earning at least 70000
SELECT employee_id, employee_name, salary
FROM topn_employees
WHERE salary >= 70000
ORDER BY salary DESC, employee_id ASC;`
      },
      bullets: [
        "Problem 1 returns Arjun with salary 95000.",
        "Problem 2 returns Vikram, Meena, and Kiran in ascending salary order, with employee ID resolving ties.",
        "Problem 3 returns Priya and Kiran.",
        "Problem 4 returns 90000, the second-highest distinct salary in the sample dataset.",
        "Problem 5 filters first and then orders the matching employees."
      ]
    },
    {
      id: "practice-intermediate",
      title: "17. Practice Problems — Intermediate",
      paragraphs: [
        "These exercises require window functions and aggregation. They resemble common SQL interview and backend reporting tasks.",
        "Use a window function when you need to calculate a ranking for every row, and use GROUP BY when you need aggregate values such as total sales per product."
      ],
      bullets: [
        "Problem 1: Return every employee belonging to the top three distinct salary levels.",
        "Problem 2: Return the top two employees in each department, allowing at most two employees per department.",
        "Problem 3: Return every employee tied for the highest salary in each department.",
        "Problem 4: Calculate total sales per product and return the top three products by revenue.",
        "Problem 5: Explain why ROW_NUMBER and DENSE_RANK can return different results when salaries are tied."
      ]
    },
    {
      id: "practice-intermediate-solutions",
      title: "18. Practice Solutions — Intermediate",
      paragraphs: [
        "The following queries demonstrate the ranking and aggregation patterns used to solve the intermediate exercises. The sales query assumes the order_items schema introduced earlier."
      ],
      code: {
        language: "sql",
        code: `-- Problem 1: Top three distinct salary levels
SELECT employee_id, employee_name, salary
FROM (
    SELECT
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM topn_employees
) ranked
WHERE salary_rank <= 3
ORDER BY salary DESC, employee_id ASC;

-- Problem 2: At most two employees per department
SELECT department_id, employee_id, employee_name, salary
FROM (
    SELECT
        department_id,
        employee_id,
        employee_name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC, employee_id ASC
        ) AS row_num
    FROM topn_employees
) ranked
WHERE row_num <= 2
ORDER BY department_id, row_num;

-- Problem 3: Highest-paid employee or employees in each department
SELECT department_id, employee_id, employee_name, salary
FROM (
    SELECT
        department_id,
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM topn_employees
) ranked
WHERE salary_rank = 1
ORDER BY department_id, employee_id;

-- Problem 4: Top three products by revenue
SELECT
    product_id,
    SUM(quantity * unit_price) AS total_sales
FROM order_items
GROUP BY product_id
ORDER BY total_sales DESC, product_id ASC
LIMIT 3;`
      },
      bullets: [
        "Problem 1 uses DENSE_RANK because ties at a salary level must be included.",
        "Problem 2 uses ROW_NUMBER because the requirement allows at most two employees per department.",
        "Problem 3 uses DENSE_RANK so all employees tied for the highest salary in a department are included.",
        "Problem 4 calculates revenue before sorting and limiting the product totals.",
        "ROW_NUMBER gives tied rows separate positions; DENSE_RANK assigns tied values the same rank."
      ]
    },
    {
      id: "interview",
      title: "19. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a Top-N query?",
          answer: "A Top-N query returns the first N rows according to a specified ordering, such as the highest salaries or newest orders."
        },
        {
          question: "How do you find the top five highest-paid employees?",
          answer: "Use ORDER BY salary DESC LIMIT 5 in MySQL or PostgreSQL, adding a unique tie-breaker for deterministic ordering."
        },
        {
          question: "Does LIMIT 3 include every row tied for third place?",
          answer: "No. LIMIT returns at most three rows. Use a ranking function or a supported WITH TIES clause when the requirement is to include tied rows."
        },
        {
          question: "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?",
          answer: "ROW_NUMBER assigns a unique number to each row. RANK assigns the same rank to ties and leaves gaps. DENSE_RANK assigns the same rank to ties without leaving gaps."
        },
        {
          question: "How do you find the second-highest distinct salary?",
          answer: "Use DENSE_RANK over salary in descending order and filter for rank 2. This returns all employees earning the second-highest distinct salary."
        },
        {
          question: "What is a Top-N per group query?",
          answer: "It returns the top N rows or ranking positions within each group, such as the two highest-paid employees in every department."
        },
        {
          question: "Why use PARTITION BY in a ranking function?",
          answer: "PARTITION BY divides rows into groups so the ranking restarts independently for each group."
        },
        {
          question: "How do you find all employees tied for the highest salary?",
          answer: "Use DENSE_RANK over salary in descending order and filter for rank 1. For department-specific results, partition by department_id."
        },
        {
          question: "Why add a secondary sort column?",
          answer: "A unique secondary key makes ordering deterministic when the main sort values are equal."
        },
        {
          question: "Can LIMIT alone guarantee good query performance?",
          answer: "No. The database may still scan or sort many rows. Suitable indexes, query plans, and performance tests matter."
        },
        {
          question: "How do you find the top-selling products?",
          answer: "Aggregate sales per product with GROUP BY, sort the totals in descending order, and limit the result to the required number of products."
        },
        {
          question: "What is the difference between the top three rows and the top three distinct salaries?",
          answer: "The top three rows means at most three employee records. The top three distinct salaries means every employee whose salary belongs to one of the three highest distinct salary values."
        },
        {
          question: "Can a Top-N query use WHERE?",
          answer: "Yes. WHERE filters the eligible rows before the final ordering and row limit are applied."
        },
        {
          question: "When should you use DENSE_RANK instead of LIMIT?",
          answer: "Use DENSE_RANK when the requirement is based on ranking values and all rows sharing a qualifying rank must be included."
        }
      ]
    },
    {
      id: "revision",
      title: "20. Quick Revision and Key Takeaways",
      paragraphs: [
        "Top-N queries combine sorting with row limiting to answer questions such as highest salary, newest order, lowest price, and best-selling product.",
        "Choose between LIMIT, FETCH FIRST, and window functions according to database syntax and the exact business requirement."
      ],
      bullets: [
        "Basic pattern: SELECT ... ORDER BY ... LIMIT N.",
        "Use DESC for highest values and ASC for lowest values.",
        "Use a unique tie-breaker for deterministic row ordering.",
        "LIMIT N returns at most N rows.",
        "ROW_NUMBER assigns a unique row sequence.",
        "RANK assigns equal ranks to ties and leaves gaps.",
        "DENSE_RANK assigns equal ranks to ties without gaps.",
        "PARTITION BY enables Top-N queries within groups.",
        "GROUP BY and aggregate functions support Top-N reporting such as highest revenue.",
        "Use EXPLAIN and appropriate indexes to investigate performance.",
        "Always distinguish between top N rows and top N distinct ranking values."
      ]
    }
  ]
};
