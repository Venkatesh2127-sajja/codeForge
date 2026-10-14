
export const groupByHavingExercises = {
  id: 2050,
  title: "GROUP BY and HAVING Exercises",
  slug: "group-by-having-exercises",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Practice grouping rows, calculating aggregates, and filtering groups using HAVING.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "setup",
      title: "1. Practice Dataset",
      paragraphs: [
        "Use the employees table from earlier SQL lessons. If it already exists with the six sample records, continue to the exercises without recreating it.",
        "The dataset contains three Engineering employees, two Finance employees, and one HR employee. Salary values are used to practice COUNT(), SUM(), AVG(), MIN(), and MAX().",
        "If you need to recreate the table, make sure you do not insert the same employee IDs twice. The employee_id column is a primary key, so duplicate IDs will cause an error."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (1, 'Ravi', 'Engineering', 60000),
    (2, 'Priya', 'HR', 45000),
    (3, 'Kiran', 'Engineering', 70000),
    (4, 'Anu', 'Finance', 50000),
    (5, 'Meena', 'Engineering', 55000),
    (6, 'Arun', 'Finance', 40000);

SELECT *
FROM employees
ORDER BY employee_id;`
      },
      output: `employee_id  employee_name  department   salary
-----------  -------------  -----------  --------
1            Ravi           Engineering  60000.00
2            Priya          HR           45000.00
3            Kiran          Engineering  70000.00
4            Anu            Finance      50000.00
5            Meena          Engineering  55000.00
6            Arun           Finance      40000.00`,
      bullets: [
        "Engineering total: 60000 + 70000 + 55000 = 185000.",
        "Finance total: 50000 + 40000 = 90000.",
        "HR total: 45000.",
        "Overall salary total: 320000.",
        "Engineering average: 61666.67 approximately.",
        "Overall employee count: 6."
      ]
    },
    {
      id: "exercise-count",
      title: "2. Exercise: Count Employees by Department",
      paragraphs: [
        "Question: Display each department and its employee count.",
        "GROUP BY department creates one group for every department value. COUNT(*) counts all rows in each group.",
        "The ORDER BY clause sorts the resulting department names alphabetically. It does not change the number of rows counted."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2
HR           1`,
      bullets: [
        "Engineering contains Ravi, Kiran, and Meena.",
        "Finance contains Anu and Arun.",
        "HR contains Priya.",
        "Remember: GROUP BY determines the groups; COUNT(*) calculates the count for each group."
      ]
    },
    {
      id: "exercise-total",
      title: "3. Exercise: Calculate Total Salary by Department",
      paragraphs: [
        "Question: Display each department and its combined salary.",
        "SUM(salary) adds the salary values within each department group. Because the sample salaries are non-NULL, every salary contributes to its department total.",
        "This report can help an HR or finance team compare salary expenditure across departments."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance       90000.00
HR            45000.00`,
      bullets: [
        "Engineering: 185000.",
        "Finance: 90000.",
        "HR: 45000.",
        "The overall salary total is 320000, which equals the sum of all three department totals."
      ]
    },
    {
      id: "exercise-having",
      title: "4. Exercise: Find Departments with More Than One Employee",
      paragraphs: [
        "Question: Return only departments with more than one employee.",
        "COUNT(*) > 1 is an aggregate condition, so it belongs in HAVING. SQL first creates the department groups and counts the employees in each group, then removes groups that do not satisfy the condition."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2`,
      bullets: [
        "Engineering qualifies because it has three employees.",
        "Finance qualifies because it has two employees.",
        "HR is excluded because it has only one employee.",
        "HAVING COUNT(*) > 1 means more than one, whereas HAVING COUNT(*) >= 2 means two or more. These conditions are equivalent for integer counts."
      ]
    },
    {
      id: "exercise-average",
      title: "5. Exercise: Filter by Average Salary",
      paragraphs: [
        "Question: Show departments whose average salary is greater than 50000.",
        "AVG(salary) calculates the average salary for each department. HAVING AVG(salary) > 50000 keeps only departments whose average is strictly greater than 50000.",
        "Engineering has an average of 185000 / 3 = 61666.67 approximately. Finance and HR both average 45000, so they are excluded."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY department;`
      },
      output: `department   average_salary
-----------  --------------
Engineering  61666.666667`,
      bullets: [
        "Use AVG() when the requirement asks for an average rather than a total.",
        "Use HAVING because the condition depends on an aggregate calculation.",
        "Use >= 50000 instead if the business requirement includes departments averaging exactly 50000."
      ]
    },
    {
      id: "exercise-where-having",
      title: "6. Exercise: Combine WHERE and HAVING",
      paragraphs: [
        "Question: Include employees earning at least 45000, group them by department, and return groups with at least two qualifying employees.",
        "WHERE salary >= 45000 filters individual employee rows before grouping. Arun, who earns 40000, is excluded.",
        "HAVING COUNT(*) >= 2 then keeps only departments with at least two employees remaining after that filter. Engineering qualifies; Finance has only Anu remaining, and HR has only Priya."
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
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00`,
      bullets: [
        "WHERE filters rows.",
        "GROUP BY forms department groups from the remaining rows.",
        "COUNT(*) and SUM(salary) calculate the metrics for those rows.",
        "HAVING filters the completed groups."
      ]
    },
    {
      id: "exercise-min-max",
      title: "7. Exercise: Find Minimum and Maximum Salary by Department",
      paragraphs: [
        "Question: Display the lowest and highest salary in each department.",
        "MIN(salary) returns the smallest non-NULL salary in a group. MAX(salary) returns the largest non-NULL salary in that group.",
        "This report helps managers compare salary ranges between departments."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   minimum_salary  maximum_salary
-----------  --------------  --------------
Engineering  55000.00        70000.00
Finance      40000.00        50000.00
HR           45000.00        45000.00`
    },
    {
      id: "exercise-multiple-aggregates",
      title: "8. Exercise: Calculate Multiple Aggregates",
      paragraphs: [
        "Question: Create a department report showing employee count, total salary, average salary, minimum salary, and maximum salary.",
        "Multiple aggregate functions can be used in one SELECT statement. They all operate on the same department groups but calculate different metrics.",
        "This is a common reporting pattern because one query can provide several useful measurements without running separate queries for each metric."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    ROUND(AVG(salary), 2) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary  minimum_salary  maximum_salary
-----------  --------------  ------------  --------------  --------------  --------------
Engineering  3               185000.00     61666.67        55000.00        70000.00
Finance      2                90000.00     45000.00        40000.00        50000.00
HR           1                45000.00     45000.00        45000.00        45000.00`
    },
    {
      id: "exercise-salary-threshold",
      title: "9. Exercise: Find Departments with Total Salary Above 80000",
      paragraphs: [
        "Question: Return departments whose combined salary is greater than 80000.",
        "The condition applies to the department's total, not to each employee's individual salary. Therefore, use HAVING SUM(salary) > 80000.",
        "Engineering and Finance qualify. HR does not qualify because its total is 45000."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 80000
ORDER BY total_salary DESC;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00
Finance       90000.00`
    },
    {
      id: "exercise-count-and-sum",
      title: "10. Exercise: Filter Groups Using Two Conditions",
      paragraphs: [
        "Question: Display departments that have at least two employees and total salary of at least 90000.",
        "Use AND when both conditions must be true. The group must meet the employee-count requirement and the salary-total requirement.",
        "Engineering has three employees and total salary of 185000. Finance has two employees and total salary of exactly 90000. Both qualify."
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
      id: "exercise-multiple-columns",
      title: "11. Exercise: Group by Department and Salary Band",
      paragraphs: [
        "Question: Group employees by department and classify each employee as High Salary or Standard Salary. Count employees in each department and salary band.",
        "The CASE expression assigns High Salary when salary is at least 60000; otherwise, it assigns Standard Salary. Grouping by both department and the CASE expression creates a separate group for each department-band combination.",
        "For example, Engineering has two High Salary employees and one Standard Salary employee. The other departments contain only Standard Salary employees."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    CASE
        WHEN salary >= 60000 THEN 'High Salary'
        ELSE 'Standard Salary'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY
    department,
    CASE
        WHEN salary >= 60000 THEN 'High Salary'
        ELSE 'Standard Salary'
    END
ORDER BY department, salary_band;`
      },
      output: `department   salary_band      employee_count
-----------  ---------------  --------------
Engineering  High Salary      2
Engineering  Standard Salary  1
Finance      Standard Salary  2
HR           Standard Salary  1`,
      bullets: [
        "Use multiple GROUP BY expressions when the report needs more than one grouping dimension.",
        "The CASE expression must be grouped consistently with the selected category expression.",
        "Some database systems support grouping by a SELECT alias; repeating the expression is more portable."
      ]
    },
    {
      id: "exercise-conditional-aggregation",
      title: "12. Exercise: Count High-Salary Employees per Department",
      paragraphs: [
        "Question: Show every department's total employee count and the number of employees earning at least 60000.",
        "Use conditional aggregation instead of filtering the entire input with WHERE. This allows departments with zero high-salary employees to remain in the report."
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
    ) AS high_salary_count
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  high_salary_count
-----------  --------------  -----------------
Engineering  3               2
Finance      2               0
HR           1               0`,
      bullets: [
        "Engineering has two employees earning at least 60000.",
        "Finance and HR remain visible even though neither has a qualifying employee.",
        "If you added WHERE salary >= 60000, the other departments would disappear."
      ]
    },
    {
      id: "exercise-null-values",
      title: "13. Exercise: Understand NULL in Grouped Results",
      paragraphs: [
        "Question: If some employees have a NULL salary, how do COUNT(*), COUNT(salary), and SUM(salary) behave?",
        "COUNT(*) counts rows even when salary is NULL. COUNT(salary) counts only non-NULL salary values. SUM(salary) adds the non-NULL salary values.",
        "The current practice dataset contains no NULL salaries, so the following query produces equal row and non-NULL salary counts for each department. The distinction becomes important when real data contains missing values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    COUNT(salary) AS employees_with_salary,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY department;`
      },
      output: `department   employee_count  employees_with_salary  total_salary
-----------  --------------  ----------------------  ------------
Engineering  3               3                       185000.00
Finance      2               2                        90000.00
HR           1               1                        45000.00`
    },
    {
      id: "exercise-challenge",
      title: "14. Challenge: Create a Management Report",
      paragraphs: [
        "Challenge: Build a report for departments with at least two employees earning 50000 or more. Display department, qualifying employee count, total qualifying salary, and average qualifying salary. Sort by total qualifying salary from highest to lowest.",
        "Think carefully about the order of operations. The WHERE clause removes employees earning less than 50000 before the department groups are calculated. HAVING then requires at least two employees in each remaining group.",
        "Try solving the problem yourself before comparing your solution with the answer below."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS qualifying_employee_count,
    SUM(salary) AS qualifying_salary_total,
    ROUND(AVG(salary), 2) AS qualifying_average_salary
FROM employees
WHERE salary >= 50000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY qualifying_salary_total DESC;`
      },
      output: `department   qualifying_employee_count  qualifying_salary_total  qualifying_average_salary
-----------  -------------------------  -----------------------  -------------------------
Engineering  3                          185000.00                61666.67`,
      bullets: [
        "Engineering qualifies: Ravi, Kiran, and Meena all earn at least 50000.",
        "Finance has only one qualifying employee, Anu, because Arun earns 40000.",
        "HR has no qualifying employees because Priya earns 45000.",
        "The result contains only qualifying employees and departments with at least two qualifying rows."
      ]
    },
    {
      id: "common-mistakes",
      title: "15. Common Mistakes and Fixes",
      paragraphs: [
        "Review these mistakes before interviews or when debugging a grouped SQL query."
      ],
      bullets: [
        "Mistake: WHERE COUNT(*) > 1. Fix: use HAVING COUNT(*) > 1 because COUNT(*) is an aggregate condition.",
        "Mistake: filtering individual employees with HAVING salary >= 50000 when the intention is to filter input rows. Fix: use WHERE salary >= 50000.",
        "Mistake: grouping only by department when the output also needs separate salary bands. Fix: group by department and the salary-band expression.",
        "Mistake: using COUNT(salary) when the requirement is to count every employee row. Fix: use COUNT(*), especially when salary can be NULL.",
        "Mistake: using > when the business rule says at least. Fix: use >= for inclusive thresholds.",
        "Mistake: assuming rows will always appear in a particular order. Fix: add an explicit ORDER BY.",
        "Mistake: assuming SUM(DISTINCT salary) gives the correct payroll total. Fix: use SUM(salary) for the total of employee salary rows unless the business requirement explicitly asks for distinct numeric values."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is the purpose of GROUP BY?",
          answer:
            "It groups rows with matching values so aggregate functions can calculate a result for each group."
        },
        {
          question: "What is the purpose of HAVING?",
          answer:
            "It filters groups based on conditions, often involving aggregate functions."
        },
        {
          question: "Can WHERE and HAVING be used together?",
          answer:
            "Yes. WHERE filters input rows before grouping, and HAVING filters groups afterward."
        },
        {
          question: "How do you find departments with more than one employee?",
          answer:
            "Use GROUP BY department HAVING COUNT(*) > 1."
        },
        {
          question: "How do you sort grouped results by total salary from highest to lowest?",
          answer:
            "Use ORDER BY SUM(salary) DESC or ORDER BY total_salary DESC when total_salary is the selected alias."
        },
        {
          question: "Can we use SUM(), AVG(), and COUNT() in the same query?",
          answer:
            "Yes. A grouped query can use multiple aggregate functions to calculate different metrics for every group."
        },
        {
          question: "Can GROUP BY contain more than one column?",
          answer:
            "Yes. GROUP BY department, job_title creates a group for each distinct department and job-title combination."
        },
        {
          question: "Why is HAVING used instead of WHERE for aggregate conditions?",
          answer:
            "WHERE filters rows before aggregate calculations, while HAVING filters the grouped results after aggregate calculations."
        },
        {
          question: "What happens if we use GROUP BY without an aggregate function?",
          answer:
            "SQL can still group rows by the specified expressions, but GROUP BY is commonly used with aggregates to produce summaries."
        },
        {
          question: "What is conditional aggregation?",
          answer:
            "It combines CASE expressions with aggregate functions to calculate metrics for rows that meet particular conditions without filtering out all other rows."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(column)?",
          answer:
            "COUNT(*) counts rows, while COUNT(column) counts only rows where that column is not NULL."
        },
        {
          question: "What is the logical processing order of WHERE, GROUP BY, HAVING, and ORDER BY?",
          answer:
            "A simplified order is FROM, WHERE, GROUP BY, HAVING, SELECT, and ORDER BY. The database optimizer may execute operations differently while preserving the query's required results."
        }
      ]
    },
    {
      id: "revision",
      title: "17. Quick Revision Notes",
      paragraphs: [
        "Use these rules to remember how to solve most GROUP BY and HAVING interview questions."
      ],
      bullets: [
        "GROUP BY creates groups from rows that share the same grouping values.",
        "COUNT(*) counts rows in each group.",
        "SUM(salary) calculates the salary total for each group.",
        "AVG(salary) calculates the average of non-NULL salary values.",
        "MIN(salary) and MAX(salary) find the smallest and largest non-NULL values.",
        "WHERE filters rows before grouping.",
        "HAVING filters groups after grouping.",
        "ORDER BY sorts the final report.",
        "Use conditional aggregation when one report must count or total multiple categories while retaining all groups.",
        "For every exercise, verify the input rows, the grouping level, the filtering conditions, and the expected output."
      ]
    }
  ]
};
