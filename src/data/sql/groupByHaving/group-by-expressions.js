
export const groupByExpressions = {
  id: 2048,
  title: "GROUP BY with Expressions",
  slug: "group-by-expressions",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn to group SQL records using expressions, calculated values, and CASE statements.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "group-expression",
      title: "1. Group by a Calculated Expression",
      paragraphs: [
        "GROUP BY can use an expression to create groups from calculated values. This example groups employees into salary bands using CASE.",
        "A CASE expression checks conditions in order and returns the result associated with the first matching WHEN clause. Here, salaries of at least 60000 are High, salaries from 45000 up to but not including 60000 are Medium, and salaries below 45000 are Low.",
        "The salary_band column is calculated from salary rather than stored directly in the table. GROUP BY applies the same expression to each row and combines rows that produce the same category.",
        "The expression is repeated in GROUP BY for broad SQL compatibility. Some databases allow a SELECT alias in GROUP BY, but support and rules vary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
ORDER BY salary_band;`
      },
      output: `salary_band  employee_count
-----------  --------------
High         2
Low          1
Medium       3`,
      bullets: [
        "High: employees earning 60000 or more.",
        "Medium: employees earning at least 45000 but less than 60000.",
        "Low: employees earning less than 45000.",
        "The output contains one row for each salary band represented in the data.",
        "ORDER BY salary_band sorts the category labels alphabetically, which explains the order High, Low, Medium."
      ]
    },
    {
      id: "salary-band-dataset",
      title: "2. Understand Salary Band Classification",
      paragraphs: [
        "Consider the six employee salaries used in this course: 55000, 60000, 70000, 40000, 50000, and 45000.",
        "The CASE expression classifies each employee before aggregation. Three employees fall into Medium, two fall into High, and one falls into Low.",
        "When creating categories, define boundary conditions carefully. The order of WHEN conditions matters because CASE returns the result for the first matching condition."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band
FROM employees
ORDER BY salary DESC;`
      },
      output: `employee_name  salary    salary_band
-------------  --------  -----------
Kiran          70000.00  High
Priya          60000.00  High
Ravi           55000.00  Medium
Meena          50000.00  Medium
Rahul          45000.00  Medium
Anu            40000.00  Low`,
      bullets: [
        "A salary of exactly 60000 belongs to High.",
        "A salary of exactly 45000 belongs to Medium.",
        "A salary below 45000 belongs to Low.",
        "If salary is NULL, neither comparison is true, so the ELSE branch returns Low in this particular expression. Change the CASE expression if missing salaries need a separate category."
      ]
    },
    {
      id: "group-month",
      title: "3. Group by Month",
      paragraphs: [
        "Date expressions can group records by month, allowing reports to summarize orders, payments, or events over time.",
        "The following example uses MySQL's DATE_FORMAT() function to convert each order date into a year-month label such as 2026-01. Grouping by this expression combines orders from the same calendar month and year.",
        "Including the year is important. Grouping only by the month number would combine January orders from different years into one group.",
        "This example assumes an orders table with an order_date column."
      ],
      code: {
        language: "sql",
        code: `SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS order_month,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY order_month;`
      },
      output: `order_month  order_count
-----------  -----------
2026-01      12
2026-02      18
2026-03      15`,
      bullets: [
        "DATE_FORMAT(order_date, '%Y-%m') produces a year-month label in MySQL.",
        "COUNT(*) counts orders in each month.",
        "The displayed counts are illustrative; actual results depend on the rows in the orders table.",
        "ORDER BY order_month sorts these zero-padded year-month labels chronologically.",
        "DATE_FORMAT() is MySQL-specific; other databases use different date functions."
      ]
    },
    {
      id: "group-calculation",
      title: "4. Group by a Calculated Category",
      paragraphs: [
        "Expressions are useful when reports need categories that do not exist as stored columns.",
        "For example, a business might classify employee salaries into two groups: 60000 and above, and below 60000. The query calculates the category for every employee and then totals salary within each category.",
        "This allows you to generate reports without adding a permanent category column to the table."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN '60000 and above'
        ELSE 'Below 60000'
    END AS salary_category,
    SUM(salary) AS total_salary
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN '60000 and above'
        ELSE 'Below 60000'
    END
ORDER BY salary_category;`
      },
      output: `salary_category  total_salary
---------------  ------------
60000 and above  130000.00
Below 60000      190000.00`,
      bullets: [
        "The High category contains salaries of 60000 and 70000, totaling 130000.",
        "The Below 60000 category contains 55000, 40000, 50000, and 45000, totaling 190000.",
        "The two category totals add up to 320000, the total salary of the six employees.",
        "These categories are calculated at query time rather than read from a stored salary_category column."
      ]
    },
    {
      id: "group-arithmetic",
      title: "5. Group by an Arithmetic Expression",
      paragraphs: [
        "GROUP BY can also use arithmetic expressions. For example, an orders report may group line items by their calculated line value, or a business may group products by a calculated price band.",
        "The expression must represent the category or value you intend to group by. Grouping by an arithmetic result is different from simply aggregating that result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    quantity * unit_price AS line_total,
    COUNT(*) AS item_count
FROM order_items
GROUP BY quantity * unit_price
ORDER BY line_total;`
      },
      output: `line_total  item_count
----------  ----------
100.00      2
250.00      1
500.00      3`,
      bullets: [
        "The expression quantity * unit_price calculates each row's line total.",
        "Rows with the same calculated line total are placed in the same group.",
        "The output values are illustrative and depend on the order_items data.",
        "Grouping by an expression can combine different records that happen to produce the same calculated value."
      ]
    },
    {
      id: "group-case-having",
      title: "6. Filter Calculated Groups with HAVING",
      paragraphs: [
        "After grouping by a calculated expression, HAVING can filter the resulting categories using aggregate values.",
        "For example, a report can show only salary bands containing at least two employees. The CASE expression creates the salary bands, COUNT(*) counts employees in each band, and HAVING removes bands with fewer than two employees."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
HAVING COUNT(*) >= 2
ORDER BY salary_band;`
      },
      output: `salary_band  employee_count  total_salary
-----------  --------------  ------------
High         2               130000.00
Medium       3               150000.00`,
      bullets: [
        "High has two employees and a total salary of 130000.",
        "Medium has three employees and a total salary of 150000.",
        "Low has one employee and is excluded by HAVING COUNT(*) >= 2.",
        "HAVING filters the completed groups, not individual salary rows."
      ]
    },
    {
      id: "group-date-alternatives",
      title: "7. Date Grouping Across SQL Databases",
      paragraphs: [
        "Date functions differ between database systems. MySQL uses DATE_FORMAT() for custom date labels, while other databases commonly use functions such as DATE_TRUNC() or FORMAT(), or extract individual date parts.",
        "For monthly reports, group by a year-month value rather than the month number alone so records from different years remain separate.",
        "When date grouping is performance-sensitive, consider grouping by a date range or using a suitable indexed date column, depending on the reporting requirement and database."
      ],
      code: {
        language: "sql",
        code: `-- MySQL
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS order_month,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY order_month;

-- PostgreSQL
SELECT
    DATE_TRUNC('month', order_date) AS order_month,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY order_month;`
      },
      output: `Both queries summarize orders by calendar month in their respective database systems.`,
      bullets: [
        "The MySQL example returns a formatted year-month string.",
        "The PostgreSQL example groups by a timestamp representing the start of each month.",
        "The output types and formatting differ between databases.",
        "Choose date functions that match your actual database engine."
      ]
    },
    {
      id: "group-null",
      title: "8. Expressions and NULL Values",
      paragraphs: [
        "NULL values can affect the category produced by an expression. In a CASE expression, a WHEN condition that evaluates to unknown is not treated as true, so processing continues to the next WHEN or ELSE.",
        "In the original salary-band expression, a NULL salary falls into the ELSE category Low. If that is not the intended business meaning, add an explicit NULL condition before the other salary conditions.",
        "The chosen classification should reflect the reporting requirements rather than silently treating missing data as a real low salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary IS NULL THEN 'Unknown'
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY
    CASE
        WHEN salary IS NULL THEN 'Unknown'
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
ORDER BY salary_band;`
      },
      output: `The supplied six-row dataset contains no NULL salaries, so the Unknown group does not appear.`,
      bullets: [
        "IS NULL checks for missing salaries.",
        "The explicit Unknown branch prevents missing salaries from being classified as Low.",
        "GROUP BY creates an Unknown group only when at least one input row is classified that way.",
        "Aggregate functions such as SUM(salary) ignore NULL salary values."
      ]
    },
    {
      id: "group-common-mistakes",
      title: "9. Common Mistakes and Fixes",
      paragraphs: [
        "When grouping by expressions, the expression in GROUP BY must match the category logic intended by the report. Small differences in CASE conditions can produce incorrect or inconsistent categories."
      ],
      bullets: [
        "Mistake: grouping only by the month number. Fix: include the year so January in different years is not combined.",
        "Mistake: writing different CASE conditions in SELECT and GROUP BY. Fix: use equivalent expressions in both places.",
        "Mistake: assuming the alias from SELECT works in GROUP BY in every database. Fix: repeat the expression for broad compatibility or use a supported derived-table pattern.",
        "Mistake: using CASE without checking boundary conditions. Fix: define whether the threshold is inclusive, such as salary >= 60000.",
        "Mistake: treating NULL salary as Low without considering the business meaning. Fix: add an explicit WHEN salary IS NULL branch when needed.",
        "Mistake: assuming grouping by a calculated value identifies unique business records. Fix: include the appropriate identifier when the report needs record-level uniqueness.",
        "Mistake: expecting a group to appear when no rows produce its value. Fix: generate the required categories from a category table and join the aggregates if empty categories must be displayed."
      ],
      code: {
        language: "sql",
        code: `-- Correctly separate years and months in MySQL
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS order_month,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY order_month;`
      },
      output: `Orders from January 2025 and January 2026 are placed in separate groups.`
    },
    {
      id: "practice-beginner",
      title: "10. Practice Exercise 1: Count Employees by Salary Band",
      paragraphs: [
        "Write a query that groups employees into High, Medium, and Low salary bands and counts the employees in each band."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
ORDER BY salary_band;`
      },
      output: `salary_band  employee_count
-----------  --------------
High         2
Low          1
Medium       3`,
      bullets: [
        "The CASE expression classifies each salary.",
        "COUNT(*) counts the rows in each category.",
        "GROUP BY uses the calculated classification."
      ]
    },
    {
      id: "practice-intermediate",
      title: "11. Practice Exercise 2: Total Salary by Category",
      paragraphs: [
        "Calculate the total salary for employees earning at least 60000 and for employees earning below 60000."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN '60000 and above'
        ELSE 'Below 60000'
    END AS salary_category,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN '60000 and above'
        ELSE 'Below 60000'
    END
ORDER BY salary_category;`
      },
      output: `salary_category  employee_count  total_salary
---------------  --------------  ------------
60000 and above  2               130000.00
Below 60000      4               190000.00`,
      bullets: [
        "The first category contains salaries of 60000 and 70000.",
        "The second category contains salaries of 55000, 40000, 50000, and 45000.",
        "The two totals add up to 320000."
      ]
    },
    {
      id: "practice-advanced",
      title: "12. Practice Exercise 3: Filter Salary Bands",
      paragraphs: [
        "Display salary bands containing at least two employees. Show the category, employee count, and total salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
HAVING COUNT(*) >= 2
ORDER BY salary_band;`
      },
      output: `salary_band  employee_count  total_salary
-----------  --------------  ------------
High         2               130000.00
Medium       3               150000.00`,
      bullets: [
        "High qualifies with two employees.",
        "Medium qualifies with three employees.",
        "Low is excluded because it contains only one employee.",
        "HAVING is evaluated after the salary-band groups are formed."
      ]
    },
    {
      id: "performance",
      title: "13. Performance and Best Practices",
      paragraphs: [
        "Grouping by expressions can require the database to calculate an expression for many rows before forming groups. The impact depends on the expression, indexes, data volume, and database optimizer.",
        "For recurring reports, a stored generated column, a suitable expression index where supported, or a summary table may help. These approaches depend on the database engine and should be justified by measured performance."
      ],
      bullets: [
        "Use simple and consistent expressions for grouping categories.",
        "Use EXPLAIN or the database's execution-plan tool to investigate expensive grouping queries.",
        "Filter irrelevant rows with WHERE when doing so preserves the intended business meaning.",
        "Consider an expression index or generated column for frequently used classifications when supported by your database.",
        "Use an actual date or timestamp value for sorting and date calculations when possible; a formatted label is often best reserved for display.",
        "Avoid grouping by unnecessary expressions that create more groups than the report requires.",
        "Use explicit ORDER BY when the output order matters."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can GROUP BY use expressions?",
          answer:
            "Yes. You can group by calculations, CASE expressions, and date expressions."
        },
        {
          question: "Why use CASE inside GROUP BY?",
          answer:
            "CASE creates categories from existing values, such as High, Medium, and Low salary bands."
        },
        {
          question: "Can you group orders by month?",
          answer:
            "Yes. Use a suitable date expression to derive the month and group by that expression."
        },
        {
          question: "Are date functions identical across all SQL databases?",
          answer:
            "No. Date functions and formatting syntax vary between database systems. DATE_FORMAT() is MySQL-specific, while PostgreSQL supports DATE_TRUNC()."
        },
        {
          question: "Why repeat the CASE expression in GROUP BY?",
          answer:
            "Repeating the expression works across more SQL dialects because support for SELECT aliases in GROUP BY varies."
        },
        {
          question: "What happens when salary is exactly 60000?",
          answer:
            "It belongs to High because the condition salary >= 60000 is inclusive."
        },
        {
          question: "What happens when salary is NULL in the original CASE expression?",
          answer:
            "The comparisons do not evaluate to true, so the ELSE branch classifies the row as Low. Add an explicit IS NULL branch if missing salary should have a separate category."
        },
        {
          question: "Can HAVING filter groups created by CASE?",
          answer:
            "Yes. For example, HAVING COUNT(*) >= 2 can keep only salary bands containing at least two employees."
        },
        {
          question: "Why include the year when grouping by month?",
          answer:
            "Grouping only by month number combines the same month across different years. A year-month expression keeps each calendar month distinct."
        },
        {
          question: "Does grouping by a calculated value identify unique records?",
          answer:
            "No. Different records can produce the same calculated value and therefore belong to the same group."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision Notes",
      paragraphs: [
        "GROUP BY with expressions lets you create groups from calculated values instead of relying only on stored columns. CASE is especially useful for creating reporting categories.",
        "Always check category boundaries, NULL handling, and date grouping rules. Repeat the grouping expression when necessary for SQL dialect compatibility."
      ],
      bullets: [
        "GROUP BY can use arithmetic expressions.",
        "CASE can convert numeric values into reporting categories.",
        "COUNT(*) counts rows in each calculated group.",
        "SUM() calculates a total for each calculated group.",
        "HAVING filters calculated groups using aggregate conditions.",
        "DATE_FORMAT() is a MySQL date-formatting function.",
        "Include year and month when grouping by calendar month.",
        "Use IS NULL to identify missing values.",
        "Different records with the same expression result belong to the same group.",
        "Database support for aliases and date expressions varies."
      ],
      code: {
        language: "sql",
        code: `SELECT
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY
    CASE
        WHEN salary >= 60000 THEN 'High'
        WHEN salary >= 45000 THEN 'Medium'
        ELSE 'Low'
    END
HAVING COUNT(*) >= 2
ORDER BY salary_band;`
      },
      output: `salary_band  employee_count  total_salary
-----------  --------------  ------------
High         2               130000.00
Medium       3               150000.00`
    }
  ]
};
