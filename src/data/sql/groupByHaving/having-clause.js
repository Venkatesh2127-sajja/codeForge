
export const havingClause = {
  id: 2045,
  title: "HAVING Clause",
  slug: "having-clause",
  topicTitle: "GROUP BY and HAVING",
  description:
    "Learn how HAVING filters grouped results using aggregate conditions.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "having-intro",
      title: "1. What Is HAVING?",
      paragraphs: [
        "HAVING filters groups after GROUP BY forms them. It is commonly used with aggregate functions such as COUNT(), SUM(), and AVG().",
        "Suppose an employees table contains employees from Engineering, Finance, and HR. GROUP BY department creates a group for each department. HAVING COUNT(*) > 1 then keeps only departments containing more than one employee.",
        "WHERE and HAVING are different. WHERE filters individual rows before grouping, while HAVING filters completed groups based on aggregate results.",
        "The following examples use the same six-row employee dataset: Engineering has three employees, Finance has two, and HR has one."
      ],
      code: {
        language: "sql",
        code: `SELECT department, COUNT(*) AS employee_count
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
        "The condition COUNT(*) > 1 is evaluated for each group, not separately for each employee."
      ]
    },
    {
      id: "sample-dataset",
      title: "2. Sample Dataset",
      paragraphs: [
        "Use the following employee records to understand how HAVING works. The department and salary values are used throughout the examples in this lesson.",
        "The database groups records according to their department values, then evaluates the aggregate condition for each group."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY employee_id;`
      },
      output: `employee_id  employee_name  department   salary
-----------  -------------  -----------  -------
1            Ravi           Engineering  55000.00
2            Priya          Engineering  60000.00
3            Kiran          Engineering  70000.00
4            Anu            Finance      40000.00
5            Meena          Finance      50000.00
6            Rahul          HR           45000.00`,
      bullets: [
        "Engineering salaries: 55000, 60000, and 70000.",
        "Finance salaries: 40000 and 50000.",
        "HR salary: 45000.",
        "Engineering total salary: 185000.",
        "Finance total salary: 90000.",
        "HR total salary: 45000."
      ]
    },
    {
      id: "having-sum",
      title: "3. HAVING with SUM()",
      paragraphs: [
        "SUM() calculates the total value for each group. HAVING can then filter groups according to that total.",
        "In the following example, only departments with a total salary greater than 100000 are returned.",
        "The condition applies to the department's total salary, not to the salary of an individual employee."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000
ORDER BY department;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00`,
      bullets: [
        "Engineering qualifies because 185000 > 100000.",
        "Finance is excluded because its total is 90000.",
        "HR is excluded because its total is 45000.",
        "Use SUM(salary) in HAVING to filter by total salary."
      ]
    },
    {
      id: "having-average",
      title: "4. HAVING with AVG()",
      paragraphs: [
        "AVG() calculates the average of non-NULL salary values in each group. HAVING can filter groups whose average meets a business requirement.",
        "The example returns departments with an average salary greater than 50000.",
        "A department can have a high average even if it contains relatively few employees, so average salary and total salary answer different business questions."
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
        "Engineering average: 185000 / 3 = 61666.67 approximately.",
        "Finance average: 90000 / 2 = 45000.",
        "HR average: 45000.",
        "Only Engineering has an average greater than 50000."
      ]
    },
    {
      id: "having-count",
      title: "5. HAVING with COUNT()",
      paragraphs: [
        "COUNT(*) counts the rows in each group. HAVING COUNT(*) can filter groups according to their size.",
        "For example, a company might want to find departments with at least two employees for workforce reporting.",
        "COUNT(*) includes every row in the group, even when some individual columns contain NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY employee_count DESC, department;`
      },
      output: `department   employee_count
-----------  --------------
Engineering  3
Finance      2`,
      bullets: [
        "HAVING COUNT(*) >= 2 retains groups with two or more employee rows.",
        "ORDER BY employee_count DESC displays larger departments first.",
        "Department is used as a tie-breaker for predictable ordering."
      ]
    },
    {
      id: "having-multiple",
      title: "6. HAVING with Multiple Conditions",
      paragraphs: [
        "You can combine aggregate conditions in HAVING using AND and OR.",
        "AND requires all specified conditions to be true. OR requires at least one condition to be true.",
        "The following query returns departments with at least two employees and a total salary greater than 100000."
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
   AND SUM(salary) > 100000
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00`,
      bullets: [
        "Engineering satisfies both conditions.",
        "Finance has two employees but its total salary is only 90000.",
        "HR does not satisfy the employee-count condition or the total-salary condition.",
        "Both conditions must be true because they are joined by AND."
      ]
    },
    {
      id: "having-or",
      title: "7. HAVING with OR",
      paragraphs: [
        "OR returns a group when at least one of the specified conditions is true.",
        "This example returns departments with either at least three employees or a total salary greater than 100000.",
        "The conditions are evaluated against each completed department group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 3
    OR SUM(salary) > 100000
ORDER BY department;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00`,
      bullets: [
        "Engineering qualifies because both conditions are true.",
        "Finance qualifies under neither condition.",
        "HR qualifies under neither condition.",
        "A group satisfying either one of the conditions would also be returned."
      ]
    },
    {
      id: "where-vs-having",
      title: "8. WHERE vs HAVING",
      paragraphs: [
        "WHERE filters individual rows before GROUP BY creates groups. HAVING filters groups after the aggregate calculations.",
        "Use WHERE when a condition concerns individual employee records, such as salary >= 45000. Use HAVING when a condition concerns a department total or employee count.",
        "A query can contain both WHERE and HAVING. First, WHERE removes employees who do not qualify; then GROUP BY aggregates the remaining employees; finally, HAVING filters the resulting groups."
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
        "WHERE salary >= 45000 keeps Ravi, Priya, Kiran, Meena, and Rahul.",
        "Anu is excluded because her salary is 40000.",
        "Engineering has three remaining employees and a total salary of 185000.",
        "Finance has one remaining employee, and HR has one remaining employee.",
        "HAVING COUNT(*) >= 2 therefore retains Engineering only."
      ]
    },
    {
      id: "having-alias",
      title: "9. HAVING with Aggregate Aliases",
      paragraphs: [
        "An alias gives a readable name to a selected expression. For example, SUM(salary) AS total_salary names the aggregate result total_salary.",
        "Database support for referencing a SELECT alias in HAVING differs. For portable SQL, write the aggregate expression directly in HAVING instead of relying on the alias.",
        "The following example uses SUM(salary) directly in HAVING."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000
ORDER BY total_salary DESC;`
      },
      output: `department   total_salary
-----------  ------------
Engineering  185000.00`,
      bullets: [
        "AS total_salary makes the result column easier to understand.",
        "HAVING SUM(salary) > 100000 expresses the group condition directly.",
        "ORDER BY total_salary DESC sorts by the selected aggregate alias in databases that support this common usage."
      ]
    },
    {
      id: "having-without-group-by",
      title: "10. Can HAVING Be Used Without GROUP BY?",
      paragraphs: [
        "Yes. In many SQL databases, an aggregate query without GROUP BY treats the input as one overall group. HAVING can filter that aggregate result.",
        "For example, the following query returns the total salary only when the overall salary total exceeds 300000.",
        "If the HAVING condition is false, the query returns no row. This differs from a grouped query, which can return multiple groups."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(salary) AS company_salary
FROM employees
HAVING SUM(salary) > 300000;`
      },
      output: `company_salary
--------------
320000.00`,
      bullets: [
        "The total of all six salaries is 320000.",
        "The condition 320000 > 300000 is true.",
        "Because there is no GROUP BY, the aggregate is calculated over the full input rather than separately for each department.",
        "The precise syntax and behavior of edge cases can vary by database, so check the target database when portability is important."
      ]
    },
    {
      id: "having-null",
      title: "11. HAVING and NULL Values",
      paragraphs: [
        "Aggregate functions such as SUM() and AVG() generally ignore NULL input values. COUNT(*) counts rows, while COUNT(salary) counts only non-NULL salary values.",
        "If a group has no non-NULL salary values, SUM(salary) and AVG(salary) return NULL. A comparison such as SUM(salary) > 100000 is then unknown, so the group does not pass the HAVING filter.",
        "Do not use = NULL to check missing values. Use IS NULL or IS NOT NULL."
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
HAVING COUNT(salary) < COUNT(*)
ORDER BY department;`
      },
      output: `No rows returned for the supplied sample dataset because every employee has a non-NULL salary.`,
      bullets: [
        "COUNT(*) counts all rows in each department.",
        "COUNT(salary) excludes rows where salary is NULL.",
        "The HAVING condition identifies groups with at least one missing salary.",
        "If the sample data contained a NULL salary, the affected department could appear in the result."
      ]
    },
    {
      id: "having-common-mistakes",
      title: "12. Common Mistakes and Fixes",
      paragraphs: [
        "Understanding the difference between row-level and group-level conditions prevents many SQL errors."
      ],
      bullets: [
        "Mistake: using WHERE COUNT(*) > 1. Fix: use HAVING COUNT(*) > 1 because COUNT(*) is a group aggregate.",
        "Mistake: using HAVING salary > 50000 when the intended rule is to remove individual employees before grouping. Fix: use WHERE salary > 50000.",
        "Mistake: assuming HAVING changes the rows used in the aggregate calculation. Fix: filter input rows with WHERE when they should not contribute to totals or averages.",
        "Mistake: using AND when either condition should qualify a group. Fix: use OR if the requirement is that at least one condition be true.",
        "Mistake: expecting HAVING to sort the results. Fix: use ORDER BY.",
        "Mistake: assuming a SELECT alias works in HAVING in every database. Fix: repeat the aggregate expression in HAVING for broader compatibility."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect: aggregate condition in WHERE
-- SELECT department, COUNT(*)
-- FROM employees
-- WHERE COUNT(*) > 1
-- GROUP BY department;

-- Correct:
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY department;`
      },
      output: `Engineering  3
Finance      2`
    },
    {
      id: "practice-beginner",
      title: "13. Practice Exercise 1: Departments with More Than One Employee",
      paragraphs: [
        "Write a query to return departments containing more than one employee. Display department and employee count, sorted alphabetically."
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
        "GROUP BY department creates one group per department.",
        "HAVING COUNT(*) > 1 removes groups with one employee.",
        "HR is excluded because it has only one employee."
      ]
    },
    {
      id: "practice-intermediate",
      title: "14. Practice Exercise 2: Departments with High Payroll",
      paragraphs: [
        "Return departments whose total salary is at least 90000. Display the department, employee count, and total salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 90000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary
-----------  --------------  ------------
Engineering  3               185000.00
Finance      2               90000.00`,
      bullets: [
        "Engineering qualifies with a total salary of 185000.",
        "Finance qualifies because its total salary is exactly 90000 and the condition uses >=.",
        "HR is excluded because its total salary is 45000."
      ]
    },
    {
      id: "practice-advanced",
      title: "15. Practice Exercise 3: Combine WHERE and HAVING",
      paragraphs: [
        "Return departments that have at least two employees earning 50000 or more. The employee count and salary total should be calculated only from employees earning at least 50000.",
        "The distinction is important: WHERE determines which employees participate in the calculation, and HAVING determines which department groups remain in the result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS qualifying_employees,
    SUM(salary) AS qualifying_salary_total
FROM employees
WHERE salary >= 50000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY department;`
      },
      output: `department   qualifying_employees  qualifying_salary_total
-----------  --------------------  -----------------------
Engineering  3                     185000.00`,
      bullets: [
        "WHERE keeps salaries of 50000 or higher.",
        "Engineering has three qualifying employees.",
        "Finance has only one qualifying employee, Meena.",
        "HR has no qualifying employees.",
        "HAVING COUNT(*) >= 2 keeps Engineering only."
      ]
    },
    {
      id: "performance",
      title: "16. Performance and Best Practices",
      paragraphs: [
        "HAVING is applied to groups, but query performance depends on the full query plan, the amount of data, indexes, and the database engine.",
        "If a condition can correctly be applied to individual rows, using WHERE can reduce the rows that need to be grouped. Do not move an aggregate condition from HAVING into WHERE because the meaning is different."
      ],
      bullets: [
        "Use WHERE to filter input rows before aggregation whenever the business rule allows it.",
        "Use HAVING for conditions that depend on aggregate values such as COUNT(*), SUM(salary), or AVG(salary).",
        "Select only the columns required for the report.",
        "Use EXPLAIN or the database's execution-plan tool to investigate slow grouped queries.",
        "Evaluate indexes against actual query patterns and execution plans; indexes also consume storage and can increase write costs.",
        "For frequently requested, expensive reports, consider summary tables or materialized views where supported.",
        "Use ORDER BY explicitly whenever a stable display order is required."
      ]
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is HAVING in SQL?",
          answer:
            "HAVING filters groups formed by GROUP BY, often using aggregate conditions."
        },
        {
          question: "Can HAVING be used with COUNT()?",
          answer:
            "Yes. For example, HAVING COUNT(*) > 1 returns groups containing more than one row."
        },
        {
          question: "Can HAVING be used without GROUP BY?",
          answer:
            "Yes. In many SQL databases, an aggregate query without GROUP BY creates one overall aggregate group, and HAVING can filter that result."
        },
        {
          question: "Can HAVING contain multiple conditions?",
          answer:
            "Yes. Combine conditions using AND or OR."
        },
        {
          question: "Does HAVING filter individual rows?",
          answer:
            "No. HAVING filters groups or aggregate results, whereas WHERE filters input rows."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters rows before grouping. HAVING filters groups after aggregate calculations."
        },
        {
          question: "How do you find departments whose total salary exceeds 100000?",
          answer:
            "Use GROUP BY department and HAVING SUM(salary) > 100000."
        },
        {
          question: "Can HAVING use SUM() and COUNT() in the same condition?",
          answer:
            "Yes. For example, HAVING COUNT(*) >= 2 AND SUM(salary) > 100000 requires both conditions to be true."
        },
        {
          question: "Does HAVING automatically sort grouped results?",
          answer:
            "No. Use ORDER BY to control the result order."
        },
        {
          question: "Why might a department disappear after applying WHERE?",
          answer:
            "If WHERE removes every row belonging to that department, no group is formed for it in the filtered input."
        },
        {
          question: "What happens when SUM(salary) is NULL in a group?",
          answer:
            "A comparison such as SUM(salary) > 100000 is unknown when the sum is NULL, so that group does not pass the HAVING condition."
        }
      ]
    },
    {
      id: "revision",
      title: "18. Quick Revision Notes",
      paragraphs: [
        "HAVING filters groups using conditions evaluated after grouping and aggregation. It is commonly used with COUNT(), SUM(), AVG(), MIN(), and MAX().",
        "Remember the practical query sequence: WHERE filters rows, GROUP BY creates groups, aggregate functions calculate metrics, HAVING filters groups, and ORDER BY sorts the output."
      ],
      bullets: [
        "HAVING COUNT(*) > 1 finds groups containing more than one row.",
        "HAVING SUM(salary) > 100000 finds groups with total salary above 100000.",
        "HAVING AVG(salary) > 50000 finds groups with average salary above 50000.",
        "AND requires every condition to be true.",
        "OR requires at least one condition to be true.",
        "WHERE filters rows before aggregation.",
        "HAVING filters groups after aggregation.",
        "HAVING can be used without GROUP BY in many aggregate queries.",
        "Use ORDER BY for sorting; HAVING does not sort results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM employees
WHERE salary >= 40000
GROUP BY department
HAVING COUNT(*) >= 2
   AND SUM(salary) >= 90000
ORDER BY total_salary DESC;`
      },
      output: `department   employee_count  total_salary  average_salary
-----------  --------------  ------------  --------------
Engineering  3               185000.00     61666.666667
Finance      2               90000.00      45000.000000`
    }
  ]
};
