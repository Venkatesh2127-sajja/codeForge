
export const groupByMultipleColumns = {
  id: 2043,
  title: "Grouping by Multiple Columns",
  slug: "group-by-multiple-columns",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn how to group records using multiple columns and calculate aggregates for each combination.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "multiple-columns",
      title: "1. What Is Multiple-Column Grouping?",
      paragraphs: [
        "GROUP BY can contain multiple columns. Each group represents a unique combination of values in those columns.",
        "For example, grouping employees by department alone creates one group for Engineering, one for HR, and one for Finance. Grouping by department and job_title separates employees into groups such as Engineering-Developer and Engineering-Tester.",
        "Multiple-column grouping is useful when a report needs more detail than a single grouping column can provide.",
        "For this lesson, create an employee_roles table containing employee names, departments, job titles, and salaries."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employee_roles (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    department VARCHAR(50),
    job_title VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employee_roles
    (employee_id, employee_name, department, job_title, salary)
VALUES
    (1, 'Ravi', 'Engineering', 'Developer', 60000),
    (2, 'Priya', 'Engineering', 'Developer', 65000),
    (3, 'Kiran', 'Engineering', 'Tester', 50000),
    (4, 'Anu', 'HR', 'Recruiter', 45000),
    (5, 'Meena', 'HR', 'Recruiter', 48000),
    (6, 'Arun', 'Finance', 'Analyst', 40000);`
      },
      output: `6 employee records inserted successfully.`,
      bullets: [
        "employee_id uniquely identifies each employee.",
        "department identifies the employee's department.",
        "job_title identifies the employee's role.",
        "salary stores the employee's salary.",
        "The sample contains six employees across three departments and four department-role combinations."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Understand the Sample Dataset",
      paragraphs: [
        "Before grouping records, understand the individual rows. GROUP BY works on these rows and combines those that share the same values in the specified grouping columns.",
        "Ravi and Priya both belong to Engineering and work as Developers. Therefore, they belong to the same group when we group by department and job_title.",
        "Kiran belongs to Engineering but works as a Tester. Kiran must be placed in a different group because the job title is different."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    department,
    job_title,
    salary
FROM employee_roles
ORDER BY employee_id;`
      },
      output: `employee_name  department   job_title  salary
-------------  -----------  ---------  -------
Ravi           Engineering  Developer  60000.00
Priya          Engineering  Developer  65000.00
Kiran          Engineering  Tester     50000.00
Anu            HR           Recruiter  45000.00
Meena          HR           Recruiter  48000.00
Arun           Finance      Analyst    40000.00`,
      bullets: [
        "Engineering + Developer occurs twice.",
        "Engineering + Tester occurs once.",
        "HR + Recruiter occurs twice.",
        "Finance + Analyst occurs once.",
        "There are four unique department and job-title combinations."
      ]
    },
    {
      id: "group-count",
      title: "3. Group by Department and Job Title",
      paragraphs: [
        "Use GROUP BY department, job_title to create one group for every unique combination of department and job title.",
        "COUNT(*) counts the number of rows in each group. Since each row represents one employee, the count gives the number of employees in that department-role combination.",
        "The query returns four rows because the sample dataset contains four distinct combinations."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count
-----------  ---------  --------------
Engineering  Developer  2
Engineering  Tester     1
Finance      Analyst    1
HR           Recruiter  2`,
      bullets: [
        "Engineering-Developer contains Ravi and Priya.",
        "Engineering-Tester contains Kiran.",
        "Finance-Analyst contains Arun.",
        "HR-Recruiter contains Anu and Meena.",
        "ORDER BY department, job_title sorts the grouped rows by department first and then by job title."
      ]
    },
    {
      id: "group-salary",
      title: "4. Calculate Salary by Department and Job Title",
      paragraphs: [
        "You can combine multiple grouping columns with SUM() to calculate salary totals for every department-role combination.",
        "SUM(salary) adds the salaries of all employees within each group. It does not add salaries from other groups.",
        "This type of report helps an organization understand how salary expenditure is distributed across departments and job roles."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    SUM(salary) AS total_salary
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  total_salary
-----------  ---------  ------------
Engineering  Developer  125000.00
Engineering  Tester     50000.00
Finance      Analyst    40000.00
HR           Recruiter  93000.00`,
      bullets: [
        "Engineering Developers: 60000 + 65000 = 125000.",
        "Engineering Testers: 50000.",
        "Finance Analysts: 40000.",
        "HR Recruiters: 45000 + 48000 = 93000."
      ]
    },
    {
      id: "group-average",
      title: "5. Calculate Average Salary for Each Combination",
      paragraphs: [
        "AVG() calculates the average salary separately for every group.",
        "The average for Engineering Developers is (60000 + 65000) / 2 = 62500. Engineering Testers have only one employee, so their average is 50000.",
        "An aggregate function calculates a separate result for each group when used with GROUP BY."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  average_salary
-----------  ---------  --------------  --------------
Engineering  Developer  2               62500.000000
Engineering  Tester     1               50000.000000
Finance      Analyst    1               40000.000000
HR           Recruiter  2               46500.000000`,
      bullets: [
        "COUNT(*) returns the number of employee rows in each group.",
        "AVG(salary) returns the average of the non-NULL salary values in each group.",
        "A group containing one employee has an average equal to that employee's salary, provided the salary is not NULL."
      ]
    },
    {
      id: "group-multiple-aggregates",
      title: "6. Use Multiple Aggregate Functions Together",
      paragraphs: [
        "A grouped query can contain multiple aggregate functions. This lets you generate a more complete report without writing a separate query for each calculation.",
        "For example, a department-role report can include employee count, total salary, average salary, minimum salary, and maximum salary.",
        "All these calculations are performed independently for each department and job-title combination."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  total_salary  average_salary  minimum_salary  maximum_salary
-----------  ---------  --------------  ------------  --------------  --------------  --------------
Engineering  Developer  2               125000.00     62500.00        60000.00        65000.00
Engineering  Tester     1               50000.00      50000.00        50000.00        50000.00
Finance      Analyst    1               40000.00      40000.00        40000.00        40000.00
HR           Recruiter  2               93000.00      46500.00        45000.00        48000.00`,
      bullets: [
        "COUNT(*) counts rows in each group.",
        "SUM(salary) calculates the group's total salary.",
        "AVG(salary) calculates the group's average salary.",
        "MIN(salary) finds the lowest non-NULL salary.",
        "MAX(salary) finds the highest non-NULL salary.",
        "ROUND() controls the displayed decimal precision in this example."
      ]
    },
    {
      id: "group-order",
      title: "7. Understand the Grouping Combination",
      paragraphs: [
        "Grouping by department alone creates one group per department. Grouping by department and job_title creates a separate group for each department-role combination.",
        "For example, Engineering Developer and Engineering Tester are separate groups even though both belong to Engineering.",
        "Adding another grouping column can split an existing group into smaller groups. It does not combine groups that were already separate."
      ],
      bullets: [
        "GROUP BY department: one group per distinct department value.",
        "GROUP BY department, job_title: one group per distinct department and job-title combination.",
        "GROUP BY department, job_title, employee_name: one group per distinct combination of all three values.",
        "Use ORDER BY to control the order in which grouped results are displayed.",
        "The number of groups depends on the distinct combinations present in the filtered input rows, not simply on the number of columns."
      ],
      code: {
        language: "sql",
        code: `-- One row per department
SELECT
    department,
    COUNT(*) AS employee_count
FROM employee_roles
GROUP BY department
ORDER BY department;

-- One row per department and job title
SELECT
    department,
    job_title,
    COUNT(*) AS employee_count
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `Grouping by department:
Engineering  3
Finance      1
HR           2

Grouping by department and job title:
Engineering  Developer  2
Engineering  Tester     1
Finance      Analyst    1
HR           Recruiter  2`
    },
    {
      id: "group-where",
      title: "8. Filter Rows Before Multiple-Column Grouping",
      paragraphs: [
        "WHERE filters individual rows before GROUP BY forms groups. Only rows satisfying the WHERE condition participate in the aggregate calculations.",
        "Suppose a report should include employees earning at least 50000. The query filters out lower-paid employees before calculating each department-role count and total.",
        "WHERE is useful when the business requirement concerns individual records rather than the final aggregate value."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employee_roles
WHERE salary >= 50000
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  total_salary
-----------  ---------  --------------  ------------
Engineering  Developer  2               125000.00
Engineering  Tester     1               50000.00`,
      bullets: [
        "Ravi, Priya, and Kiran satisfy salary >= 50000.",
        "Anu, Meena, and Arun are excluded before grouping.",
        "The HR and Finance groups do not appear because no rows from those combinations remain after filtering."
      ]
    },
    {
      id: "group-having",
      title: "9. Filter Groups Using HAVING",
      paragraphs: [
        "HAVING filters groups after GROUP BY has formed them and aggregate functions have been calculated.",
        "For example, you can display only department-role combinations containing at least two employees.",
        "Unlike WHERE, HAVING can directly filter an aggregate result such as COUNT(*)."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employee_roles
GROUP BY department, job_title
HAVING COUNT(*) >= 2
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  total_salary
-----------  ---------  --------------  ------------
Engineering  Developer  2               125000.00
HR           Recruiter  2               93000.00`,
      bullets: [
        "GROUP BY creates the four department-role groups.",
        "COUNT(*) is calculated for each group.",
        "HAVING removes groups with fewer than two employees.",
        "The Engineering-Tester and Finance-Analyst groups are excluded because each contains one employee."
      ]
    },
    {
      id: "group-where-having",
      title: "10. Combine WHERE and HAVING",
      paragraphs: [
        "A query can use WHERE and HAVING together when both individual rows and final groups need filtering.",
        "In this example, WHERE first keeps employees earning at least 45000. GROUP BY then forms department-role groups from the remaining rows. HAVING finally keeps only groups containing at least two qualifying employees.",
        "The distinction matters because removing rows before grouping can change the count, sum, and average calculated for each group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employee_roles
WHERE salary >= 45000
GROUP BY department, job_title
HAVING COUNT(*) >= 2
ORDER BY department, job_title;`
      },
      output: `department   job_title  employee_count  total_salary
-----------  ---------  --------------  ------------
Engineering  Developer  2               125000.00
HR           Recruiter  2               93000.00`,
      bullets: [
        "WHERE salary >= 45000 keeps Ravi, Priya, Kiran, Anu, and Meena.",
        "Arun is removed because his salary is 40000.",
        "Engineering-Developer and HR-Recruiter each contain two qualifying employees.",
        "Engineering-Tester contains only one qualifying employee and is removed by HAVING."
      ]
    },
    {
      id: "group-null",
      title: "11. Multiple-Column Grouping with NULL Values",
      paragraphs: [
        "If a grouping column contains NULL values, rows with the same combination of grouping values are grouped together, including combinations containing NULL.",
        "For example, rows with department = 'Engineering' and job_title = NULL form a group distinct from Engineering-Developer.",
        "Use IS NULL to filter missing values. Do not use equality with NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count
FROM employee_roles
WHERE job_title IS NULL
GROUP BY department, job_title
ORDER BY department;`
      },
      output: `No rows returned for the supplied sample dataset.`,
      bullets: [
        "The sample data contains no NULL job titles, so this query returns no groups.",
        "If several Engineering employees had NULL job titles, they would appear in one Engineering-NULL group.",
        "GROUP BY does not automatically remove rows containing NULL.",
        "Use WHERE job_title IS NOT NULL before grouping when records with missing job titles should be excluded."
      ]
    },
    {
      id: "group-real-world",
      title: "12. Real-World Use Cases",
      paragraphs: [
        "Multiple-column grouping is common in business reporting because organizations often need totals broken down by more than one business dimension.",
        "The same pattern can be applied to sales, orders, inventory, customer activity, and support tickets. Replace the grouping columns and aggregate expressions with those required by the report."
      ],
      bullets: [
        "HR analytics: count employees by department and job title.",
        "Payroll reports: calculate total salary by department and job title.",
        "Sales reporting: calculate revenue by region and product category.",
        "E-commerce: count orders by payment method and order status.",
        "Customer support: count tickets by team and priority.",
        "Inventory reporting: calculate stock quantities by warehouse and product category."
      ],
      code: {
        language: "sql",
        code: `-- Example: order count by payment method and status
SELECT
    payment_method,
    order_status,
    COUNT(*) AS order_count
FROM orders
GROUP BY payment_method, order_status
ORDER BY payment_method, order_status;`
      },
      output: `The query returns one row for each payment_method and order_status combination present in the orders table.`,
      bullets: [
        "This orders example assumes the orders table contains payment_method and order_status columns.",
        "A combination absent from the table does not automatically appear with a count of zero.",
        "To display every possible combination, even those without records, you generally need dimension tables and an appropriate outer-join strategy."
      ]
    },
    {
      id: "group-common-mistakes",
      title: "13. Common Mistakes and Fixes",
      paragraphs: [
        "Multiple-column GROUP BY queries are easy to write incorrectly when you misunderstand grouping combinations or the difference between filtering rows and filtering groups."
      ],
      bullets: [
        "Mistake: grouping only by department when a separate result is needed for each job title. Fix: include both department and job_title in GROUP BY.",
        "Mistake: using WHERE COUNT(*) >= 2. Fix: use HAVING COUNT(*) >= 2 because COUNT(*) is an aggregate over a group.",
        "Mistake: assuming GROUP BY automatically sorts the results. Fix: use ORDER BY when a specific display order is required.",
        "Mistake: selecting a non-aggregated column that is not part of the grouping expressions. Fix: add it to GROUP BY or apply an appropriate aggregate, following the database's SQL rules.",
        "Mistake: assuming a missing combination will appear with a zero count. Fix: create the required combinations from dimension data and join the aggregated results when a complete matrix is needed.",
        "Mistake: using SUM(DISTINCT salary) to remove duplicate employees. Fix: use the correct row-level identifier or deduplicate records according to the business requirement; SUM(DISTINCT) removes repeated numeric values, not duplicate employees."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect when the report needs counts by job title too:
SELECT department, job_title, COUNT(*)
FROM employee_roles
GROUP BY department;

-- Correct:
SELECT department, job_title, COUNT(*) AS employee_count
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `The corrected query groups and reports each department-role combination separately.`
    },
    {
      id: "practice-beginner",
      title: "14. Practice Exercise 1: Count Employees by Combination",
      paragraphs: [
        "Write a query to count employees for every department and job-title combination. Sort the result by department and job title."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count
FROM employee_roles
GROUP BY department, job_title
ORDER BY department, job_title;`
      },
      output: `Engineering  Developer  2
Engineering  Tester     1
Finance      Analyst    1
HR           Recruiter  2`,
      bullets: [
        "GROUP BY defines the grouping columns.",
        "COUNT(*) calculates the number of employee rows in each group.",
        "ORDER BY provides predictable result ordering."
      ]
    },
    {
      id: "practice-intermediate",
      title: "15. Practice Exercise 2: Find Groups with High Payroll",
      paragraphs: [
        "Display department-role combinations whose total salary is at least 90000. Show the total salary and employee count for each qualifying group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employee_roles
GROUP BY department, job_title
HAVING SUM(salary) >= 90000
ORDER BY total_salary DESC;`
      },
      output: `department   job_title  employee_count  total_salary
-----------  ---------  --------------  ------------
Engineering  Developer  2               125000.00
HR           Recruiter  2               93000.00`,
      bullets: [
        "HAVING SUM(salary) >= 90000 filters the completed groups.",
        "Engineering-Developer has a total of 125000.",
        "HR-Recruiter has a total of 93000.",
        "ORDER BY total_salary DESC displays the highest payroll first."
      ]
    },
    {
      id: "practice-advanced",
      title: "16. Practice Exercise 3: Find Groups Above Their Average",
      paragraphs: [
        "Find department-role combinations whose average salary is greater than 50000. Return the department, job title, and average salary.",
        "This exercise uses HAVING to compare an aggregate result against a fixed business threshold."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    ROUND(AVG(salary), 2) AS average_salary
FROM employee_roles
GROUP BY department, job_title
HAVING AVG(salary) > 50000
ORDER BY average_salary DESC;`
      },
      output: `department   job_title  average_salary
-----------  ---------  --------------
Engineering  Developer  62500.00`,
      bullets: [
        "Engineering-Developer has an average salary of 62500.",
        "Engineering-Tester has an average of exactly 50000 and is excluded because the condition uses > rather than >=.",
        "HR-Recruiter averages 46500, and Finance-Analyst averages 40000."
      ]
    },
    {
      id: "performance",
      title: "17. Performance and Best Practices",
      paragraphs: [
        "GROUP BY may require the database to sort rows or build an internal hash-based grouping structure. The actual execution strategy depends on the database engine, available indexes, table size, and query plan.",
        "Indexes can help some grouped queries, but an index does not guarantee that grouping will be faster. Review the execution plan and test with realistic data before changing indexes.",
        "Filter rows early when the business requirement allows it, and return only the columns needed for the report."
      ],
      bullets: [
        "Use WHERE to remove irrelevant rows before aggregation.",
        "Use HAVING only for conditions that depend on groups or aggregate results.",
        "Avoid unnecessary grouping columns because they can create more groups and change the meaning of the report.",
        "Use EXPLAIN or the equivalent execution-plan tool supported by your database to investigate expensive queries.",
        "Consider indexes involving the filtering and grouping columns when appropriate, but validate their benefit against write overhead and storage cost.",
        "For large reporting workloads, consider summary tables, materialized views where supported, or scheduled aggregate tables when real-time detail is not required.",
        "Do not rely on the physical row order; specify ORDER BY when result order matters."
      ]
    },
    {
      id: "interview",
      title: "18. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can GROUP BY contain multiple columns?",
          answer:
            "Yes. It groups rows by each unique combination of the specified columns."
        },
        {
          question: "What does GROUP BY department, job_title mean?",
          answer:
            "It creates a separate group for each distinct department and job-title combination."
        },
        {
          question: "Does the order of columns in GROUP BY matter?",
          answer:
            "For the same set of grouping expressions, the logical grouping combinations are equivalent when their order is changed. However, column order can affect how results are presented if the query uses a corresponding ORDER BY, and it can affect which indexes or execution strategies are useful."
        },
        {
          question: "How do you count developers in each department?",
          answer:
            "Use GROUP BY department and job_title with COUNT(*), and filter job_title = 'Developer' using WHERE. You can group by both columns even though the filter leaves only Developer rows."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping. HAVING filters groups after aggregation."
        },
        {
          question: "Can we use COUNT(), SUM(), and AVG() together?",
          answer:
            "Yes. A grouped query can calculate multiple aggregates for each group, such as employee count, total salary, and average salary."
        },
        {
          question: "Does GROUP BY automatically sort the output?",
          answer:
            "No. Use ORDER BY to specify the required output order."
        },
        {
          question: "What happens if a grouping column contains NULL?",
          answer:
            "Rows with the same combination of grouping values, including NULL values, can form a group. Use IS NULL or IS NOT NULL to filter missing values."
        },
        {
          question: "Can I select a column that is not in GROUP BY?",
          answer:
            "Generally, a selected column must be grouped or aggregated, subject to database-specific rules and functional-dependency handling. Selecting an arbitrary value from a group can produce invalid or ambiguous results."
        },
        {
          question: "How can I return only combinations containing at least two employees?",
          answer:
            "Use GROUP BY department, job_title and HAVING COUNT(*) >= 2."
        },
        {
          question: "How do you find the department-role combination with the highest total salary?",
          answer:
            "Group by department and job_title, calculate SUM(salary), and order by that aggregate in descending order. Use a top-row limit syntax supported by your database if only the highest result is needed."
        },
        {
          question: "What is a real-world use case for multiple-column grouping?",
          answer:
            "A sales report can group by region and product category to calculate revenue for each combination. The same approach works for employee roles, payment statuses, and support-ticket priorities."
        }
      ]
    },
    {
      id: "revision",
      title: "19. Quick Revision Notes",
      paragraphs: [
        "Multiple-column grouping produces one result row for each unique combination of grouping values present in the input rows.",
        "Remember the basic query structure: FROM identifies the table, WHERE filters rows, GROUP BY forms groups, HAVING filters groups, SELECT calculates or displays grouped values, and ORDER BY controls result ordering."
      ],
      bullets: [
        "GROUP BY department creates department-level groups.",
        "GROUP BY department, job_title creates department-role groups.",
        "COUNT(*) counts rows in each group.",
        "SUM(salary) calculates total salary per group.",
        "AVG(salary) calculates average non-NULL salary per group.",
        "MIN() and MAX() find the smallest and largest non-NULL values.",
        "WHERE filters rows before grouping.",
        "HAVING filters groups after aggregation.",
        "ORDER BY sorts the final results.",
        "Adding grouping columns can split existing groups into smaller groups.",
        "Only combinations represented in the input rows appear unless the query explicitly generates missing combinations."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    job_title,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary
FROM employee_roles
WHERE salary >= 40000
GROUP BY department, job_title
HAVING COUNT(*) >= 1
ORDER BY department, job_title;`
      },
      output: `The query reports employee counts, total salaries, and average salaries for each department-role combination after filtering the input rows and qualifying the groups.`
    }
  ]
};
