
export const businessReportsGroupBy = {
  id: 2049,
  title: "Business Reports with GROUP BY",
  slug: "business-reports-group-by",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Build practical SQL reports using GROUP BY, aggregate functions, WHERE, and HAVING.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "business-report-introduction",
      title: "Introduction: Turning Data into Business Reports",
      paragraphs: [
        "Business databases store detailed records such as employees, orders, products, customers, and payments. Managers usually need summaries rather than every individual record.",
        "GROUP BY combines rows that share the same value into groups. Aggregate functions calculate a summary for each group. For example, an HR report can show the number of employees, total salary expenditure, and average salary for each department.",
        "A useful business report often combines WHERE to filter individual records, GROUP BY to create groups, aggregate functions to calculate metrics, HAVING to filter groups, and ORDER BY to arrange the final report."
      ],
      bullets: [
        "COUNT(*) counts rows in a group.",
        "SUM(column) calculates the total of non-NULL values.",
        "AVG(column) calculates the average of non-NULL values.",
        "MIN(column) and MAX(column) find the smallest and largest non-NULL values.",
        "WHERE filters rows before grouping.",
        "HAVING filters groups after grouping.",
        "ORDER BY sorts the final report."
      ]
    },
    {
      id: "business-report-dataset",
      title: "Sample Dataset: Employees",
      paragraphs: [
        "The following six employees will be used throughout this lesson. Their salaries are stored in the salary column, and their departments determine how rows are grouped.",
        "The example assumes that employee_id identifies each employee and that department and salary contain the values shown below."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary DECIMAL(10, 2)
);

INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (1, 'Ravi',  'Engineering', 55000.00),
    (2, 'Priya', 'Engineering', 60000.00),
    (3, 'Kiran', 'Engineering', 70000.00),
    (4, 'Anu',   'Finance',     40000.00),
    (5, 'Meena', 'Finance',     50000.00),
    (6, 'Rahul', 'HR',          45000.00);`
      },
      output: `employee_id  employee_name  department   salary
-----------  -------------  -----------  --------
1            Ravi           Engineering  55000.00
2            Priya          Engineering  60000.00
3            Kiran          Engineering  70000.00
4            Anu            Finance      40000.00
5            Meena          Finance      50000.00
6            Rahul          HR           45000.00`
    },
    {
      id: "department-report",
      title: "1. Department Summary Report",
      paragraphs: [
        "An HR report can summarize employee counts, salary expenditure, and average salary by department.",
        "GROUP BY department creates one group for Engineering, one for Finance, and one for HR. Each aggregate function is calculated separately for every group.",
        "COUNT(*) counts all employee rows in a department. SUM(salary) adds the salaries, while AVG(salary) divides the sum of non-NULL salaries by the number of non-NULL salary values.",
        "The Engineering total is 185000 because 55000 + 60000 + 70000 = 185000. Its average salary is 185000 / 3 = 61666.67 approximately."
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
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667
Finance      2                90000.00     45000.000000
HR           1                45000.00     45000.000000`,
      bullets: [
        "Engineering has three employees and the highest total salary expenditure.",
        "Finance has two employees with a combined salary of 90000.",
        "HR has one employee with a salary of 45000.",
        "ORDER BY department sorts the result alphabetically by department."
      ]
    },
    {
      id: "high-salary-report",
      title: "2. Departments with High Average Salaries",
      paragraphs: [
        "Managers may want to see only departments whose average salary exceeds a specified threshold. HAVING is designed to filter groups using aggregate results.",
        "The query groups employees by department, calculates each department's average salary, and then keeps only groups where AVG(salary) is greater than 50000.",
        "Engineering qualifies because its average salary is approximately 61666.67. Finance and HR both average 45000, so neither qualifies. Notice that the condition uses > 50000, not >= 50000."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY average_salary DESC;`
      },
      output: `department   average_salary
-----------  --------------
Engineering  61666.666667`
    },
    {
      id: "filtered-report",
      title: "3. Report Employees Earning at Least 45000",
      paragraphs: [
        "WHERE filters individual employee rows before GROUP BY calculates department metrics. This means employees earning below 45000 do not contribute to the count or salary total.",
        "Anu earns 40000, so the WHERE condition excludes her. Finance therefore has one qualifying employee, Meena, and a qualifying salary total of 50000.",
        "Engineering retains all three employees, while HR retains Rahul because his salary is exactly 45000. The comparison operator >= includes values equal to the threshold."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
WHERE salary >= 45000
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      1                50000.00
HR           1                45000.00`
    },
    {
      id: "large-departments",
      title: "4. Find Departments with Multiple Employees",
      paragraphs: [
        "A management report may need to display only departments that have at least two employees and total salary expenditure of at least 90000.",
        "The HAVING clause evaluates both conditions for each department. COUNT(*) >= 2 checks the number of employee rows, and SUM(salary) >= 90000 checks total salary expenditure.",
        "Engineering qualifies with three employees and a total of 185000. Finance qualifies with two employees and a total of exactly 90000. HR is excluded because it has only one employee.",
        "Both conditions must be true because they are connected by AND."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
   AND SUM(salary) >= 90000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      2                90000.00`
    },
    {
      id: "sales-report",
      title: "5. Sales Summary by Category",
      paragraphs: [
        "The same reporting pattern works for sales data. A business may want to calculate the number of orders, total revenue, and average order value for each product category.",
        "Assume an orders table has order_id, category, and amount columns. The following example creates a category-level report. The output is illustrative and assumes the sample records shown in the dataset."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE sales_orders (
    order_id INT PRIMARY KEY,
    category VARCHAR(30),
    amount DECIMAL(10, 2)
);

INSERT INTO sales_orders (order_id, category, amount)
VALUES
    (101, 'Electronics', 1200.00),
    (102, 'Books',        300.00),
    (103, 'Electronics', 1500.00),
    (104, 'Books',        500.00);

SELECT
    category,
    COUNT(*) AS order_count,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_order_value
FROM sales_orders
GROUP BY category
ORDER BY total_revenue DESC;`
      },
      output: `category     order_count  total_revenue  average_order_value
-----------  -----------  -------------  -------------------
Electronics  2            2700.00        1350.000000
Books        2             800.00         400.000000`,
      bullets: [
        "Electronics revenue is 1200 + 1500 = 2700.",
        "Books revenue is 300 + 500 = 800.",
        "The average order value is the total amount divided by the number of non-NULL amounts.",
        "In an actual sales system, confirm whether amount represents gross sales, net sales, or another business-defined metric."
      ]
    },
    {
      id: "report-having-multiple-metrics",
      title: "6. Filter a Report Using Multiple Aggregate Conditions",
      paragraphs: [
        "A business can require a minimum number of transactions and a minimum revenue amount before a category appears in a report.",
        "This example displays categories with at least two orders and total revenue greater than 1000. HAVING evaluates both aggregate conditions after the categories have been grouped."
      ],
      code: {
        language: "sql",
        code: `SELECT
    category,
    COUNT(*) AS order_count,
    SUM(amount) AS total_revenue
FROM sales_orders
GROUP BY category
HAVING COUNT(*) >= 2
   AND SUM(amount) > 1000
ORDER BY total_revenue DESC;`
      },
      output: `category     order_count  total_revenue
-----------  -----------  -------------
Electronics  2            2700.00`,
      bullets: [
        "Electronics passes both conditions.",
        "Books has two orders but revenue is only 800, so it fails the revenue condition.",
        "If the query used OR instead of AND, a category could qualify by satisfying either condition."
      ]
    },
    {
      id: "where-having-report",
      title: "7. Combining WHERE and HAVING in One Report",
      paragraphs: [
        "WHERE and HAVING solve different filtering problems. WHERE determines which employee records enter the report. HAVING determines which completed department groups remain in the report.",
        "The following query includes only employees earning at least 45000, groups those employees by department, and then keeps departments with at least two qualifying employees.",
        "Finance loses Anu because her salary is 40000. Only Meena remains in Finance, so Finance does not meet the count requirement. Engineering has three qualifying employees and is retained. HR has one qualifying employee and is excluded."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS qualifying_employees,
    SUM(salary) AS qualifying_salary_total
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY qualifying_salary_total DESC;`
      },
      output: `department   qualifying_employees  qualifying_salary_total
-----------  --------------------  -----------------------
Engineering  3                     185000.00`,
      bullets: [
        "WHERE salary >= 45000 filters employee rows first.",
        "GROUP BY department creates the department groups.",
        "COUNT(*) and SUM(salary) calculate metrics from the filtered rows.",
        "HAVING COUNT(*) >= 2 removes groups with fewer than two qualifying employees."
      ]
    },
    {
      id: "conditional-business-report",
      title: "8. Build Multiple Metrics with Conditional Aggregation",
      paragraphs: [
        "Sometimes one report needs to compare several employee categories without filtering any category out of the input rows.",
        "Conditional aggregation uses CASE inside an aggregate function. SUM(CASE WHEN ... THEN 1 ELSE 0 END) counts rows that meet a condition, while SUM(CASE WHEN ... THEN salary ELSE 0 END) totals salaries for qualifying rows.",
        "The following report shows each department's total employee count and the number of employees earning at least 60000."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(
        CASE
            WHEN salary >= 60000 THEN 1
            ELSE 0
        END
    ) AS high_salary_employee_count
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  high_salary_employee_count
-----------  --------------  --------------------------
Engineering  3               2
Finance      2               0
HR           1               0`,
      bullets: [
        "Engineering has two employees earning at least 60000.",
        "Finance and HR have no employees meeting that threshold.",
        "Unlike WHERE salary >= 60000, conditional aggregation preserves departments that have no qualifying employees."
      ]
    },
    {
      id: "report-null-values",
      title: "9. Handling NULL Values in Business Reports",
      paragraphs: [
        "Real databases may contain NULL values in salary or department. Aggregate functions generally ignore NULL inputs, except COUNT(*), which counts rows regardless of the values in individual columns.",
        "If a salary is NULL, COUNT(*) still counts that employee, but SUM(salary) and AVG(salary) do not treat the missing salary as zero.",
        "Rows whose department is NULL can form a separate GROUP BY group. If the business wants to label those rows as Unassigned, it can use COALESCE(department, 'Unassigned') in both SELECT and GROUP BY.",
        "Replacing missing salary values with zero is a business decision, not a default SQL rule. A missing salary does not necessarily mean the employee earns zero."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COALESCE(department, 'Unassigned') AS department_name,
    COUNT(*) AS employee_count,
    COUNT(salary) AS employees_with_salary,
    SUM(salary) AS total_salary
FROM employees
GROUP BY COALESCE(department, 'Unassigned')
ORDER BY department_name;`
      },
      bullets: [
        "COUNT(*) counts all rows in each group.",
        "COUNT(salary) counts only rows where salary is not NULL.",
        "SUM(salary) ignores NULL salary values.",
        "COALESCE returns the first non-NULL expression."
      ]
    },
    {
      id: "report-common-mistakes",
      title: "10. Common Mistakes in Business Reports",
      paragraphs: [
        "Business reports can produce incorrect totals when the filtering stage, grouping columns, or aggregate logic does not match the business requirement."
      ],
      bullets: [
        "Using WHERE COUNT(*) >= 2: aggregate conditions belong in HAVING, not WHERE.",
        "Filtering rows too early: WHERE salary >= 60000 removes lower-paid employees from every metric, which may be wrong if the report should show total headcount as well.",
        "Grouping at the wrong level: grouping by department and job_title creates separate groups for each department-job combination, not one row per department.",
        "Using COUNT(salary) when the requirement is total employee count: COUNT(salary) excludes employees whose salary is NULL; COUNT(*) counts employee rows.",
        "Confusing SUM(amount) with COUNT(*): SUM calculates a numeric total, while COUNT(*) counts rows.",
        "Forgetting ORDER BY: SQL does not guarantee result order without an explicit ORDER BY.",
        "Using an incorrect threshold: > 50000 excludes exactly 50000, while >= 50000 includes it.",
        "Using SELECT * with grouped results: every selected non-aggregated expression generally needs to be included in GROUP BY, subject to database-specific functional-dependency rules.",
        "Assuming average of averages equals overall average: an overall average should usually be calculated from the underlying records or correctly weighted group results."
      ]
    },
    {
      id: "practice-beginner",
      title: "11. Practice Exercise: Department Employee Count",
      paragraphs: [
        "Task: Write a query that displays each department and its employee count. Sort the report by employee count from highest to lowest.",
        "Try writing the query before revealing or reviewing the solution."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC, department ASC;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2
HR           1`,
      bullets: [
        "The first sort key places the largest departments first.",
        "The second sort key provides a predictable alphabetical order when counts tie."
      ]
    },
    {
      id: "practice-intermediate",
      title: "12. Practice Exercise: Departments with Salary Expenditure Above 80000",
      paragraphs: [
        "Task: Display the department, employee count, and total salary for departments whose total salary exceeds 80000.",
        "Use GROUP BY to create department groups and HAVING to filter the aggregated results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      2                90000.00`,
      bullets: [
        "Engineering qualifies with 185000.",
        "Finance qualifies with 90000.",
        "HR is excluded because its total is 45000."
      ]
    },
    {
      id: "practice-advanced",
      title: "13. Practice Exercise: Filter Employees, Then Filter Departments",
      paragraphs: [
        "Task: Include employees earning at least 50000, group the qualifying employees by department, and show only departments with at least two qualifying employees. Display the count, total salary, and average salary.",
        "This exercise combines row filtering, grouping, aggregate calculations, group filtering, and sorting."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY average_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667`,
      bullets: [
        "Engineering qualifies because all three employees earn at least 50000.",
        "Finance has only one qualifying employee, Meena, because Anu earns 40000.",
        "HR has no qualifying employees because Rahul earns 45000.",
        "The HAVING condition is evaluated after WHERE has removed non-qualifying employee rows."
      ]
    },
    {
      id: "performance",
      title: "14. Performance and Reporting Best Practices",
      paragraphs: [
        "Business reports often scan many rows and calculate several aggregates. Good query design helps keep reports understandable and can improve performance on large tables."
      ],
      bullets: [
        "Filter early when the business requirement allows it: a selective WHERE condition can reduce the number of rows that need to be grouped.",
        "Index useful filter columns: indexes may help conditions such as WHERE order_date >= ... or WHERE department = ..., depending on the query plan and data distribution.",
        "Choose grouping columns carefully: adding unnecessary columns creates more groups and can change the meaning of the report.",
        "Avoid applying functions to indexed filter columns when a direct range predicate can express the same condition. For example, use an appropriate date range instead of filtering every row with YEAR(order_date) = 2026 when index use matters.",
        "Use EXPLAIN to inspect the execution plan and verify whether indexes and grouping strategies are effective.",
        "For frequently requested, expensive reports, consider summary tables or materialized views where supported, with a plan to keep the summaries up to date.",
        "Use explicit numeric precision when presenting financial reports. ROUND(AVG(salary), 2) can make a report easier to read.",
        "Do not remove rows just to improve performance if doing so changes the business definition of the metric."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary
FROM employees
WHERE salary >= 45000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY total_salary DESC;`
      },
      paragraphs: [
        "This example demonstrates a filtered report with rounded averages. It includes only employees earning at least 45000 and only departments with at least two qualifying employees. In the sample dataset, Engineering is the only department that meets the group-count requirement."
      ],
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.67`
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you create a department salary report?",
          answer:
            "Use GROUP BY department with COUNT(), SUM(), and AVG() as required. Each aggregate produces a metric for every department."
        },
        {
          question: "How do you show only departments with average salaries above 50000?",
          answer:
            "Use GROUP BY department HAVING AVG(salary) > 50000. HAVING filters groups based on the calculated average."
        },
        {
          question: "How do WHERE and HAVING work together in a report?",
          answer:
            "WHERE filters individual records before grouping, while HAVING filters groups after aggregate calculations."
        },
        {
          question: "How do you sort departments by total salary?",
          answer:
            "Use ORDER BY SUM(salary) DESC or ORDER BY a total-salary alias such as total_salary DESC."
        },
        {
          question: "Why are GROUP BY and aggregate functions useful in reporting?",
          answer:
            "They convert detailed records into summaries such as department totals, transaction counts, and average values."
        },
        {
          question: "Can HAVING be used without GROUP BY?",
          answer:
            "Yes, depending on the query and database. An aggregate query without GROUP BY forms one group over its input rows, and HAVING can filter that group."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(salary)?",
          answer:
            "COUNT(*) counts rows, including rows where salary is NULL. COUNT(salary) counts only rows with a non-NULL salary."
        },
        {
          question: "Why might a department disappear after adding WHERE?",
          answer:
            "WHERE removes employee rows before grouping. If no rows remain for a department, that department cannot appear in the grouped result."
        },
        {
          question: "Can a SELECT alias be used in HAVING?",
          answer:
            "Alias support in HAVING varies by database. For portable SQL, repeating the aggregate expression in HAVING is a reliable choice."
        },
        {
          question: "How do you count employees earning at least 60000 without excluding other employees from the report?",
          answer:
            "Use conditional aggregation, for example SUM(CASE WHEN salary >= 60000 THEN 1 ELSE 0 END). This preserves the full department group while counting only qualifying employees."
        },
        {
          question: "How can you improve a slow GROUP BY report?",
          answer:
            "Review the execution plan with EXPLAIN, consider indexes that support filters and joins, reduce unnecessary input rows where correct, and evaluate summary tables for frequently repeated expensive reports."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision Notes",
      paragraphs: [
        "Remember the reporting sequence: filter the input rows, group the remaining rows, calculate aggregates, filter groups, and sort the report."
      ],
      bullets: [
        "GROUP BY department produces one result group per department value.",
        "COUNT(*) counts rows; SUM(salary) calculates total salary; AVG(salary) calculates average non-NULL salary.",
        "WHERE filters individual rows before grouping.",
        "HAVING filters grouped results using aggregate conditions.",
        "ORDER BY total_salary DESC sorts the report from highest total to lowest.",
        "Conditional aggregation lets one report calculate multiple metrics for different subsets of rows.",
        "NULL values require deliberate handling, especially in salary and financial reports.",
        "Always check that sample outputs match the data and the exact filtering conditions."
      ]
    }
  ]
};
