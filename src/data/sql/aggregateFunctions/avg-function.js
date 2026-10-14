
export const avgFunction = {
  id: 2034,
  title: "AVG() Function",
  slug: "avg-function",
  topicTitle: "Aggregate Functions",
  description:
    "Learn how to calculate averages using AVG(), filter average calculations, handle NULL values, round results, calculate conditional averages, and solve practical SQL interview questions.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "avg-basics",
      title: "1. Introduction to AVG()",
      paragraphs: [
        "AVG() is a SQL aggregate function that calculates the arithmetic average of non-NULL numeric values. It is widely used in employee salary reports, student marks, product ratings, sales analytics, and financial reporting.",
        "The arithmetic average is calculated by adding the eligible values and dividing the sum by the number of eligible values.",
        "For example, if three employees earn 40000, 50000, and 60000, the average salary is (40000 + 50000 + 60000) / 3 = 50000.",
        "AVG() ignores NULL values. It does not treat NULL as zero. Therefore, the number of non-NULL values determines the divisor.",
        "AVG() can be used on an entire result set, with WHERE to filter rows, or with GROUP BY to calculate a separate average for each group."
      ],
      bullets: [
        "AVG(column_name) calculates the average of non-NULL numeric values.",
        "WHERE filters input rows before the average is calculated.",
        "GROUP BY calculates a separate average for each group.",
        "ROUND() can control the requested decimal precision.",
        "If there are no non-NULL values to average, AVG() generally returns NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS average_salary
FROM avg_demo_employees;`
      },
      output: `average_salary
--------------
53333.333333...`,
      bullets: [
        "The six sample salaries total 320000.",
        "Average salary = 320000 / 6 = 53333.333333...",
        "The displayed number of decimal places depends on the database and result type."
      ]
    },
    {
      id: "avg-sample-data",
      title: "2. Sample Dataset and Calculation",
      paragraphs: [
        "Use the following six employees to practise AVG(). The dataset contains three departments and salary values that make it easy to verify the calculations.",
        "Create this table once in your SQL practice database. If you already have an equivalent table with these values, use your existing table instead of inserting the same records again."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE avg_demo_employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO avg_demo_employees
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
        "Total salary = 320000.",
        "Employee count = 6.",
        "Average salary = 320000 / 6 = 53333.333333...",
        "Engineering average = (70000 + 60000) / 2 = 65000.",
        "HR average = (50000 + 45000) / 2 = 47500.",
        "Sales average = (40000 + 55000) / 2 = 47500."
      ]
    },
    {
      id: "avg-department",
      title: "3. AVG() with WHERE",
      paragraphs: [
        "Use WHERE to select only the rows that should participate in the average. AVG() then calculates the average of the non-NULL values among those rows.",
        "For example, to calculate the Engineering average, SQL selects employees whose department is Engineering and averages their salaries.",
        "The filter can use comparison operators, AND, OR, IN, BETWEEN, and other SQL conditions.",
        "Always check the selected rows when verifying an average. Including or excluding even one employee can change the result."
      ],
      code: {
        language: "sql",
        code: `-- Average salary of all employees
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees;

-- Average salary in Engineering
SELECT AVG(salary) AS engineering_average
FROM avg_demo_employees
WHERE department = 'Engineering';

-- Average salary for employees earning at least 50000
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE salary >= 50000;

-- Average salary in HR and Sales
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE department IN ('HR', 'Sales');`
      },
      output: `average_salary
--------------
53333.333333...

engineering_average
-------------------
65000.00

average_salary
--------------
58750.00

average_salary
--------------
47500.00`,
      bullets: [
        "Engineering: (70000 + 60000) / 2 = 65000.",
        "Salary >= 50000 includes Anita, Rahul, Priya, and Arjun.",
        "The average of those four salaries is 58750.",
        "HR and Sales together have salaries 50000, 45000, 40000, and 55000, averaging 47500."
      ]
    },
    {
      id: "avg-group",
      title: "4. Average by Department Using GROUP BY",
      paragraphs: [
        "GROUP BY divides the selected rows into groups. AVG() then calculates the average independently for each group.",
        "For an employee report, grouping by department produces one average for Engineering, one for HR, and one for Sales.",
        "GROUP BY is especially useful for business dashboards, salary comparisons, category-level analytics, and summary reports.",
        "If the grouping column contains NULL, those rows form a NULL group. The group is included when matching rows exist, but AVG() still ignores NULL salary values within that group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM avg_demo_employees
GROUP BY department
ORDER BY department;`
      },
      output: `department  | average_salary
------------+---------------
Engineering | 65000.00
HR          | 47500.00
Sales       | 47500.00`,
      bullets: [
        "Engineering average: 65000.",
        "HR average: 47500.",
        "Sales average: 47500.",
        "ORDER BY department sorts the final group results.",
        "Without GROUP BY, the same aggregate would calculate one average for the entire input."
      ]
    },
    {
      id: "avg-null",
      title: "5. AVG() and NULL Values",
      paragraphs: [
        "AVG() ignores NULL values. Its calculation uses the sum of non-NULL values divided by the count of non-NULL values.",
        "NULL does not mean zero. It represents a missing or unknown value, so AVG() does not include it in the calculation.",
        "Suppose salaries are 40000, 60000, and NULL. AVG(salary) is 50000 because (40000 + 60000) / 2 = 50000.",
        "If every salary is NULL, or the query returns no matching rows, AVG() generally returns NULL because there are no non-NULL values to average."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE avg_demo_nulls (
    id INT PRIMARY KEY,
    salary DECIMAL(10, 2)
);

INSERT INTO avg_demo_nulls (id, salary)
VALUES
    (1, 40000.00),
    (2, 60000.00),
    (3, NULL);

SELECT
    COUNT(*) AS row_count,
    COUNT(salary) AS known_salary_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM avg_demo_nulls;`
      },
      output: `row_count | known_salary_count | total_salary | average_salary
----------+--------------------+--------------+---------------
3         | 2                  | 100000.00    | 50000.00`,
      bullets: [
        "COUNT(*) returns three because there are three rows.",
        "COUNT(salary) returns two because one salary is NULL.",
        "SUM(salary) returns 100000.",
        "AVG(salary) divides 100000 by two, not by three."
      ]
    },
    {
      id: "avg-rounding",
      title: "6. Rounding Average Results",
      paragraphs: [
        "Average calculations can produce repeating decimal values. ROUND() lets you request a particular number of decimal places for presentation.",
        "For example, the average of 320000 divided by 6 is 53333.333333... ROUND(AVG(salary), 2) requests two decimal places.",
        "Rounding affects the displayed or returned precision, not the underlying mathematical definition of the average. Exact result types and rounding details can vary by database and numeric type.",
        "For monetary reporting, use an appropriate DECIMAL or NUMERIC type when exact decimal arithmetic is required."
      ],
      code: {
        language: "sql",
        code: `SELECT AVG(salary) AS average_salary
FROM avg_demo_employees;

SELECT ROUND(AVG(salary), 2) AS rounded_average
FROM avg_demo_employees;

SELECT ROUND(AVG(salary), 0) AS whole_number_average
FROM avg_demo_employees;`
      },
      output: `average_salary
--------------
53333.333333...

rounded_average
---------------
53333.33

whole_number_average
--------------------
53333`,
      bullets: [
        "ROUND(AVG(salary), 2) requests two decimal places.",
        "ROUND(AVG(salary), 0) requests a whole-number result.",
        "Use the precision that matches the requirements of your report or application."
      ]
    },
    {
      id: "avg-expression",
      title: "7. AVG() with Expressions",
      paragraphs: [
        "AVG() can calculate the average of a numeric expression rather than only a single column.",
        "For example, AVG(quantity * unit_price) calculates the average line-item value when each row represents one order item.",
        "This is not necessarily the same as the average order value. If an order contains several line items, calculating average order value usually requires calculating one total per order first and then averaging those order totals.",
        "Choose the expression carefully so that the result answers the intended business question."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE avg_demo_order_items (
    id INT PRIMARY KEY,
    product_name VARCHAR(50),
    quantity INT,
    unit_price DECIMAL(10, 2)
);

INSERT INTO avg_demo_order_items
    (id, product_name, quantity, unit_price)
VALUES
    (1, 'Keyboard', 2, 1500.00),
    (2, 'Mouse', 3, 500.00),
    (3, 'Monitor', 1, 12000.00);

SELECT
    AVG(quantity * unit_price) AS average_line_total
FROM avg_demo_order_items;`
      },
      output: `average_line_total
------------------
5500.00`,
      bullets: [
        "Keyboard line total: 2 × 1500 = 3000.",
        "Mouse line total: 3 × 500 = 1500.",
        "Monitor line total: 1 × 12000 = 12000.",
        "Average line total = (3000 + 1500 + 12000) / 3 = 5500."
      ]
    },
    {
      id: "avg-having",
      title: "8. Filtering Average Groups with HAVING",
      paragraphs: [
        "HAVING filters groups after GROUP BY has formed them and calculated aggregate results.",
        "Use HAVING when you want to display only departments whose average salary meets a condition. For example, HAVING AVG(salary) > 50000 returns departments with an average greater than 50000.",
        "WHERE and HAVING are not interchangeable. WHERE filters individual source rows before aggregation, while HAVING filters the resulting groups."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM avg_demo_employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY average_salary DESC;`
      },
      output: `department  | average_salary
------------+---------------
Engineering | 65000.00`,
      bullets: [
        "The average for Engineering is 65000, so it passes the condition.",
        "HR and Sales each average 47500, so they are excluded.",
        "Use WHERE when filtering source rows and HAVING when filtering aggregate groups."
      ]
    },
    {
      id: "avg-conditional",
      title: "9. Conditional Averages with CASE",
      paragraphs: [
        "CASE can be combined with AVG() to calculate an average conditionally. This is useful when you need several category-specific metrics in a single result row.",
        "For example, AVG(CASE WHEN department = 'Engineering' THEN salary END) averages Engineering salaries. Rows from other departments produce NULL and are ignored by AVG().",
        "If no rows satisfy the condition, the expression may have no non-NULL values and AVG() returns NULL. Use COALESCE only if the business requirement calls for a zero fallback."
      ],
      code: {
        language: "sql",
        code: `SELECT
    AVG(CASE
        WHEN department = 'Engineering' THEN salary
    END) AS engineering_average,
    AVG(CASE
        WHEN department = 'HR' THEN salary
    END) AS hr_average,
    AVG(CASE
        WHEN department = 'Sales' THEN salary
    END) AS sales_average
FROM avg_demo_employees;`
      },
      output: `engineering_average | hr_average | sales_average
--------------------+-------------+--------------
65000.00            | 47500.00    | 47500.00`,
      bullets: [
        "Each CASE expression returns a salary only for the selected department.",
        "Rows from other departments return NULL and do not affect that average.",
        "The query calculates three averages in one row."
      ]
    },
    {
      id: "avg-distinct",
      title: "10. AVG(DISTINCT column) — Average Unique Values",
      paragraphs: [
        "AVG(DISTINCT expression) averages distinct non-NULL expression values, removing duplicate values before calculating the average.",
        "For values 10, 10, and 20, AVG(value) is 13.333333..., while AVG(DISTINCT value) is 15 because the unique values are 10 and 20.",
        "Use AVG(DISTINCT) only when the requirement specifically asks for an average of unique values. Repeated values may represent legitimate individual employees, orders, or transactions and should not be removed automatically."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE avg_demo_duplicates (
    id INT PRIMARY KEY,
    score DECIMAL(10, 2)
);

INSERT INTO avg_demo_duplicates (id, score)
VALUES
    (1, 10.00),
    (2, 10.00),
    (3, 20.00);

SELECT
    AVG(score) AS normal_average,
    AVG(DISTINCT score) AS distinct_average
FROM avg_demo_duplicates;`
      },
      output: `normal_average | distinct_average
---------------+-----------------
13.333333...   | 15.00`,
      bullets: [
        "AVG(score) = (10 + 10 + 20) / 3 = 13.333333....",
        "AVG(DISTINCT score) = (10 + 20) / 2 = 15.",
        "DISTINCT changes which values participate in the average."
      ]
    },
    {
      id: "avg-common-mistakes",
      title: "11. Common AVG() Mistakes",
      paragraphs: [
        "Average calculations are easy to write but can be misleading if NULL values, filtering conditions, or the intended unit of measurement are misunderstood."
      ],
      bullets: [
        "Mistake: Treating NULL as zero. Fix: AVG() ignores NULL values; explicitly replace NULL only when the business requirement calls for zero.",
        "Mistake: Averaging the wrong rows. Fix: verify the WHERE conditions and the intended population.",
        "Mistake: Confusing average line-item value with average order value. Fix: aggregate line items by order before averaging order totals when that is the intended metric.",
        "Mistake: Using AVG(DISTINCT salary) to remove repeated employee salaries. Fix: use ordinary AVG() unless unique salary values are specifically required.",
        "Mistake: Expecting AVG() to return zero for empty input. Fix: it generally returns NULL when no non-NULL values are available.",
        "Mistake: Filtering aggregate groups with WHERE AVG(salary) > 50000. Fix: use HAVING AVG(salary) > 50000.",
        "Mistake: Assuming a rounded average is the exact underlying value. Fix: choose appropriate numeric types and presentation precision.",
        "Mistake: Comparing department averages without considering employee counts. Fix: report both AVG() and COUNT() when group size matters."
      ]
    },
    {
      id: "practice-beginner",
      title: "12. Beginner Practice Exercises",
      paragraphs: [
        "Solve the exercises using avg_demo_employees. Try to predict the output before running each query."
      ],
      bullets: [
        "Exercise 1: Calculate the average salary of all employees.",
        "Exercise 2: Calculate the Engineering average salary.",
        "Exercise 3: Calculate the average salary of HR employees.",
        "Exercise 4: Calculate the average salary of employees earning at least 50000.",
        "Exercise 5: Display the average salary rounded to two decimal places."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees;

-- Exercise 2
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE department = 'Engineering';

-- Exercise 3
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE department = 'HR';

-- Exercise 4
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE salary >= 50000;

-- Exercise 5
SELECT ROUND(AVG(salary), 2) AS average_salary
FROM avg_demo_employees;`
      },
      output: `Exercise 1: 53333.333333...
Exercise 2: 65000.00
Exercise 3: 47500.00
Exercise 4: 58750.00
Exercise 5: 53333.33`
    },
    {
      id: "practice-intermediate",
      title: "13. Intermediate Practice Exercises",
      paragraphs: [
        "These exercises combine averages with grouping, conditional logic, and aggregate filtering."
      ],
      bullets: [
        "Exercise 1: Calculate the average salary for each department.",
        "Exercise 2: Display departments whose average salary is greater than 50000.",
        "Exercise 3: Calculate the average salary for Engineering and HR employees together.",
        "Exercise 4: Calculate the average line-item total using quantity multiplied by unit_price in avg_demo_order_items.",
        "Exercise 5: Calculate the average salary for all employees whose department is not NULL."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT department, AVG(salary) AS average_salary
FROM avg_demo_employees
GROUP BY department;

-- Exercise 2
SELECT department, AVG(salary) AS average_salary
FROM avg_demo_employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- Exercise 3
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE department IN ('Engineering', 'HR');

-- Exercise 4
SELECT AVG(quantity * unit_price) AS average_line_total
FROM avg_demo_order_items;

-- Exercise 5
SELECT AVG(salary) AS average_salary
FROM avg_demo_employees
WHERE department IS NOT NULL;`
      },
      output: `Exercise 1:
Engineering = 65000.00
HR = 47500.00
Sales = 47500.00

Exercise 2:
Engineering = 65000.00

Exercise 3:
Average = 56250.00

Exercise 4:
Average line total = 5500.00

Exercise 5:
Average = 53333.333333...`
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does AVG() do?",
          answer: "AVG() calculates the arithmetic average of non-NULL numeric values."
        },
        {
          question: "Does AVG() count NULL values as zero?",
          answer: "No. AVG() ignores NULL values rather than treating them as zero."
        },
        {
          question: "How do you calculate the average salary in Engineering?",
          answer: "Use SELECT AVG(salary) FROM employees WHERE department = 'Engineering'."
        },
        {
          question: "What happens when all input values are NULL?",
          answer: "AVG() returns NULL because there are no non-NULL values to average."
        },
        {
          question: "Can AVG() be used with GROUP BY?",
          answer: "Yes. GROUP BY calculates a separate average for each group."
        },
        {
          question: "What is the difference between SUM() and AVG()?",
          answer: "SUM() adds non-NULL numeric values, while AVG() calculates their arithmetic average."
        },
        {
          question: "How do you round an average to two decimal places?",
          answer: "Use ROUND(AVG(column_name), 2)."
        },
        {
          question: "What does AVG(DISTINCT column_name) do?",
          answer: "It averages unique non-NULL values, excluding duplicates before calculating the average."
        },
        {
          question: "Can AVG() be used with WHERE?",
          answer: "Yes. WHERE filters the source rows before AVG() calculates the result."
        },
        {
          question: "What is the difference between WHERE and HAVING for AVG()?",
          answer: "WHERE filters individual rows before aggregation. HAVING filters groups based on their aggregate results."
        },
        {
          question: "What happens when AVG() receives no matching rows?",
          answer: "It generally returns NULL because there are no non-NULL values to average."
        },
        {
          question: "Can AVG() calculate an expression?",
          answer: "Yes. For example, AVG(quantity * unit_price) calculates the average of the row-level quantity-price products."
        },
        {
          question: "How do you calculate an average for each department?",
          answer: "Use SELECT department, AVG(salary) FROM employees GROUP BY department."
        },
        {
          question: "What is conditional aggregation with AVG()?",
          answer: "It uses AVG() with CASE to calculate averages for selected conditions, often producing several metrics in one result row."
        },
        {
          question: "Why can an average be misleading without a count?",
          answer: "Groups with different numbers of observations can have the same average but very different amounts of underlying data. Reporting COUNT() alongside AVG() provides useful context."
        },
        {
          question: "What is the difference between average order value and average line-item value?",
          answer: "Average line-item value averages individual order lines. Average order value first totals each order and then averages those order-level totals."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision",
      paragraphs: [
        "AVG() calculates the arithmetic average of non-NULL numeric values. Master the basic average first, then practise filtering, grouping, rounding, conditional averages, and NULL handling."
      ],
      bullets: [
        "AVG(column) calculates an average of non-NULL values.",
        "AVG() does not treat NULL as zero.",
        "WHERE filters input rows before the average is calculated.",
        "GROUP BY calculates a separate average per group.",
        "HAVING filters groups based on aggregate results.",
        "ROUND(AVG(column), 2) requests two decimal places.",
        "AVG(expression) averages a calculated expression.",
        "AVG(DISTINCT expression) averages distinct non-NULL values.",
        "AVG() generally returns NULL when there are no non-NULL input values.",
        "Use COUNT() alongside AVG() when group size matters.",
        "Understand the difference between average line-item value and average order value."
      ]
    }
  ]
};
