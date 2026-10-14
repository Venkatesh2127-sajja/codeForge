
export const sortingPaginationExercises = {
  id: 2030,
  title: "Sorting and Pagination Exercises",
  slug: "sorting-pagination-exercises",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Practise ORDER BY, ASC, DESC, multiple-column sorting, LIMIT, OFFSET, Top-N queries, window functions, and real-world pagination scenarios.",
  estimatedTime: "60 min",
  sections: [
    {
      id: "dataset",
      title: "1. Practice Dataset",
      paragraphs: [
        "Before solving the exercises, create a sample employees table and insert records. The exercises use this dataset to demonstrate sorting, filtering, Top-N queries, and pagination.",
        "The dataset contains six employees from Engineering, HR, and Finance. Salaries differ so you can observe how ASC and DESC change the order.",
        "Run this script in MySQL or PostgreSQL. If the employees table already exists, use a separate practice database or rename the table to avoid a table-definition conflict."
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
    (6, 'Arun', 'Finance', 40000);`
      },
      bullets: [
        "employee_id uniquely identifies each employee.",
        "employee_name stores the employee's name.",
        "department groups employees by department.",
        "salary stores salary as a decimal value.",
        "ORDER BY controls the result order.",
        "LIMIT restricts the number of returned rows in MySQL and PostgreSQL.",
        "OFFSET skips rows before returning the requested page."
      ]
    },
    {
      id: "exercise-1",
      title: "2. Sort by Salary",
      paragraphs: [
        "Exercise: Display all employees from highest salary to lowest.",
        "Use ORDER BY salary DESC. DESC sorts values in descending order, so the highest salary appears first.",
        "Because all six employees have different salaries, no tie-breaker is needed to determine their salary order in this dataset. In production, add a unique secondary key if equal salaries must have a predictable order."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;`
      },
      output: `employee_name | salary
--------------+-------
Kiran         | 70000
Ravi          | 60000
Meena         | 55000
Anu           | 50000
Priya         | 45000
Arun          | 40000`,
      bullets: [
        "DESC means descending order.",
        "The highest salary appears first.",
        "Without LIMIT, all matching employees are returned.",
        "The query sorts the results; it does not permanently rearrange the table."
      ]
    },
    {
      id: "exercise-2",
      title: "3. Sort by Department and Salary",
      paragraphs: [
        "Exercise: Sort departments alphabetically, then sort each department by salary from highest to lowest.",
        "SQL supports multiple ORDER BY expressions. The database first sorts by department ASC. When two rows belong to the same department, it sorts those rows by salary DESC.",
        "The order of the expressions matters. Reversing the expressions would sort the entire result by salary first, with department used only to resolve salary ties."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      },
      output: `employee_name | department  | salary
--------------+-------------+-------
Anu           | Finance     | 50000
Arun          | Finance     | 40000
Kiran         | Engineering | 70000
Ravi          | Engineering | 60000
Meena         | Engineering | 55000
Priya         | HR          | 45000`,
      bullets: [
        "The primary sort expression is department ASC.",
        "The secondary sort expression is salary DESC.",
        "Finance appears before Engineering and HR alphabetically.",
        "Employees within Engineering are ordered from highest salary to lowest.",
        "If all sort expressions tie, SQL does not guarantee the relative order of those rows."
      ]
    },
    {
      id: "exercise-3",
      title: "4. Top Three Employees",
      paragraphs: [
        "Exercise: Find the three highest-paid employees.",
        "Sort by salary DESC and limit the result to three rows. Add employee_id ASC as a tie-breaker so the query remains deterministic if employees have equal salaries.",
        "LIMIT returns at most three rows. It does not guarantee that all employees tied at the third position will be included."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
3           | Kiran         | 70000
1           | Ravi          | 60000
5           | Meena         | 55000`,
      bullets: [
        "ORDER BY determines which employees rank first.",
        "LIMIT 3 returns at most three records.",
        "The query does not modify the underlying employee data.",
        "Use DENSE_RANK when the requirement is to include all employees within the top three distinct salary levels."
      ]
    },
    {
      id: "exercise-4",
      title: "5. Retrieve the Second Page",
      paragraphs: [
        "Exercise: Display the second page using a page size of two.",
        "For one-based page numbering, the offset formula is (pageNumber - 1) * pageSize. For page 2 with a size of 2, the offset is (2 - 1) * 2 = 2.",
        "LIMIT 2 OFFSET 2 skips the first two ordered records and returns the next two. Because the query orders by employee_id, the selected page is predictable."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 2 OFFSET 2;`
      },
      output: `employee_id | employee_name
------------+--------------
3           | Kiran
4           | Anu`,
      bullets: [
        "Page size is two records.",
        "The offset is two because the first two records are skipped.",
        "The query returns employee IDs 3 and 4.",
        "Page 1 uses OFFSET 0, page 2 uses OFFSET 2, and page 3 uses OFFSET 4.",
        "Pagination should use a stable ORDER BY clause."
      ]
    },
    {
      id: "exercise-5",
      title: "6. Retrieve the Five Latest Orders",
      paragraphs: [
        "Exercise: Assuming an orders table has order_date and order_id, retrieve the five latest orders.",
        "Sort order_date in descending order so newer orders appear first. Use order_id DESC as a secondary key when orders share the same date or timestamp.",
        "This query assumes the orders table and columns already exist. The employee dataset above does not create an orders table."
      ],
      code: {
        language: "sql",
        code: `SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 5;`
      },
      bullets: [
        "DESC puts newer dates before older dates.",
        "order_id DESC makes the order predictable when dates tie, assuming order_id is unique.",
        "LIMIT 5 returns at most five orders.",
        "A timestamp is more precise than a date-only column when exact event time matters.",
        "An index may help this query, depending on the schema and execution plan."
      ]
    },
    {
      id: "exercise-6",
      title: "7. Sort Employees in Ascending Salary Order",
      paragraphs: [
        "Exercise: Display all employees from the lowest salary to the highest salary.",
        "Use ORDER BY salary ASC. ASC is the default direction in SQL, but explicitly writing it can improve readability.",
        "This query is useful for finding the lowest-paid employees or reviewing salary distributions."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary ASC, employee_id ASC;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
6           | Arun          | 40000
2           | Priya         | 45000
4           | Anu           | 50000
5           | Meena         | 55000
1           | Ravi          | 60000
3           | Kiran         | 70000`,
      bullets: [
        "ASC means ascending order.",
        "The lowest salary appears first.",
        "employee_id ASC provides a tie-breaker.",
        "ASC is the default sort direction if none is specified."
      ]
    },
    {
      id: "exercise-7",
      title: "8. Filter and Sort Employees",
      paragraphs: [
        "Exercise: Find Engineering employees whose salary is at least 55000 and display the highest-paid matching employee first.",
        "WHERE filters the eligible records before the final ordering and row limit are applied. ORDER BY then sorts the remaining employees by salary in descending order."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 55000
ORDER BY salary DESC, employee_id ASC;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
3           | Kiran         | 70000
1           | Ravi          | 60000
5           | Meena         | 55000`,
      bullets: [
        "WHERE restricts the result to Engineering employees.",
        "AND requires both conditions to be true.",
        "ORDER BY salary DESC sorts the matching employees from highest to lowest.",
        "Filtering and sorting can be combined in the same query.",
        "Use parameterized queries when filter values are supplied by an application user."
      ]
    },
    {
      id: "exercise-8",
      title: "9. Find the Second-Highest Distinct Salary",
      paragraphs: [
        "Exercise: Find the second-highest distinct salary.",
        "One solution is to select distinct salary values, sort them in descending order, skip the highest value, and return the next value.",
        "This solution returns the second-highest distinct salary, not necessarily the second employee in salary order. If the highest salary is shared by several employees, the result still correctly skips that salary value."
      ],
      code: {
        language: "sql",
        code: `SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`
      },
      output: `salary
------
60000`,
      bullets: [
        "DISTINCT removes duplicate salary values.",
        "ORDER BY salary DESC puts the highest distinct salary first.",
        "OFFSET 1 skips the highest distinct salary.",
        "LIMIT 1 returns the next distinct value.",
        "If fewer than two distinct non-NULL salaries exist, the query returns no rows.",
        "Use DENSE_RANK when you need the employees earning the second-highest distinct salary."
      ]
    },
    {
      id: "exercise-9",
      title: "10. Retrieve All Employees Within the Top Three Distinct Salaries",
      paragraphs: [
        "Exercise: Return every employee whose salary belongs to one of the three highest distinct salary levels.",
        "LIMIT 3 is insufficient because it returns at most three rows. A window function can rank the distinct salary levels while retaining employee records.",
        "DENSE_RANK assigns the same rank to employees with equal salaries. Filter for salary_rank <= 3 to include all employees within the top three distinct salary levels."
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
    FROM employees
) ranked
WHERE salary_rank <= 3
ORDER BY salary DESC, employee_id ASC;`
      },
      output: `employee_id | employee_name | salary | salary_rank
------------+---------------+--------+------------
3           | Kiran         | 70000  | 1
1           | Ravi          | 60000  | 2
5           | Meena         | 55000  | 3`,
      bullets: [
        "DENSE_RANK calculates ranking values over the salary ordering.",
        "The outer query filters the calculated ranking.",
        "The final ORDER BY controls the display order.",
        "If several employees share a qualifying salary, all are included.",
        "Window functions are supported by modern MySQL and PostgreSQL versions."
      ]
    },
    {
      id: "exercise-10",
      title: "11. Pagination with a WHERE Condition",
      paragraphs: [
        "Exercise: Retrieve the first two Engineering employees ordered by salary from highest to lowest.",
        "The query first filters by department, then orders the matching employees, and finally returns two records.",
        "This pattern is common in applications where a user selects a department and navigates through its employees."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC, employee_id ASC
LIMIT 2 OFFSET 0;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
3           | Kiran         | 70000
1           | Ravi          | 60000`,
      bullets: [
        "WHERE limits the eligible rows to Engineering.",
        "ORDER BY determines which matching employees come first.",
        "LIMIT 2 requests at most two records.",
        "OFFSET 0 starts at the first matching record.",
        "For page 2 with a size of two, use LIMIT 2 OFFSET 2."
      ]
    },
    {
      id: "exercise-11",
      title: "12. Top Two Employees in Each Department",
      paragraphs: [
        "Exercise: Return the two highest-paid employees in each department.",
        "A simple LIMIT 2 would return only two employees across the whole company. To return two per department, use ROW_NUMBER with PARTITION BY department.",
        "The ranking restarts for every department. Filtering row_num <= 2 then returns at most two employees from each group."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    employee_id,
    employee_name,
    salary
FROM (
    SELECT
        department,
        employee_id,
        employee_name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC, employee_id ASC
        ) AS row_num
    FROM employees
) ranked
WHERE row_num <= 2
ORDER BY department ASC, salary DESC, employee_id ASC;`
      },
      output: `department  | employee_id | employee_name | salary
------------+-------------+---------------+-------
Engineering | 3           | Kiran         | 70000
Engineering | 1           | Ravi          | 60000
Finance     | 4           | Anu           | 50000
Finance     | 6           | Arun          | 40000
HR          | 2           | Priya         | 45000`,
      bullets: [
        "PARTITION BY department creates separate ranking groups.",
        "ROW_NUMBER gives each employee a unique position within the department.",
        "row_num <= 2 returns at most two employees per department.",
        "Use DENSE_RANK instead if all employees tied within the top two distinct salary levels must be included.",
        "This pattern is called a Top-N per group query."
      ]
    },
    {
      id: "exercise-12",
      title: "13. Calculate Total Pages",
      paragraphs: [
        "Exercise: A query returns 53 matching employees, and the page size is 10. Calculate the number of pages.",
        "Divide the total record count by the page size and round up. The final page may contain fewer records than the requested page size."
      ],
      code: {
        language: "text",
        code: `Total records = 53
Page size = 10

Page 1 -> 10 records
Page 2 -> 10 records
Page 3 -> 10 records
Page 4 -> 10 records
Page 5 -> 10 records
Page 6 -> 3 records

Total pages = ceil(53 / 10) = 6`
      },
      bullets: [
        "The total page count is six.",
        "The first five pages contain ten records each.",
        "The last page contains three records.",
        "For Spring Data JPA, Page.getTotalPages() provides the calculated page count.",
        "A zero-record result has zero total pages when the page size is positive."
      ]
    },
    {
      id: "exercise-13",
      title: "14. Find the Lowest Two Salaries",
      paragraphs: [
        "Exercise: Retrieve the two employees with the lowest salaries.",
        "Sort salary in ascending order and return at most two rows. Add employee_id ASC to resolve ties predictably."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary ASC, employee_id ASC
LIMIT 2;`
      },
      output: `employee_id | employee_name | salary
------------+---------------+-------
6           | Arun          | 40000
2           | Priya         | 45000`,
      bullets: [
        "ASC places the lowest salary first.",
        "LIMIT 2 returns at most two employees.",
        "A tie-breaker gives predictable ordering for equal salaries.",
        "The query does not change employee salary values."
      ]
    },
    {
      id: "exercise-14",
      title: "15. Sort by a Calculated Expression",
      paragraphs: [
        "Exercise: Assume salary represents monthly pay. Sort employees by estimated annual salary, highest first.",
        "SQL can sort by an expression such as salary * 12. The expression calculates annual pay for sorting without modifying the stored salary.",
        "If salary is not monthly pay, change the expression to match the actual data model."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_id ASC;`
      },
      output: `employee_id | employee_name | salary | annual_salary
------------+---------------+--------+--------------
3           | Kiran         | 70000  | 840000
1           | Ravi          | 60000  | 720000
5           | Meena         | 55000  | 660000
4           | Anu           | 50000  | 600000
2           | Priya         | 45000  | 540000
6           | Arun          | 40000  | 480000`,
      bullets: [
        "salary * 12 calculates estimated annual pay.",
        "The alias annual_salary makes the selected expression easier to read.",
        "The query sorts by the calculated value.",
        "The calculation assumes twelve monthly salary payments and excludes bonuses or other compensation."
      ]
    },
    {
      id: "solutions-summary",
      title: "16. Exercise Summary and Self-Assessment",
      paragraphs: [
        "Use this checklist to verify that you understand the concepts covered in the lesson. Try writing each query from memory before checking your earlier solutions.",
        "A good SQL developer does more than memorize syntax. The developer must identify the required result, choose the correct sort order, handle ties deliberately, and understand the pagination convention."
      ],
      bullets: [
        "I can sort rows using ORDER BY ASC and DESC.",
        "I can sort by multiple columns.",
        "I can filter records using WHERE before applying pagination.",
        "I can retrieve the first N rows with LIMIT.",
        "I can calculate OFFSET from a page number and page size.",
        "I can retrieve a specific page using LIMIT and OFFSET.",
        "I can distinguish top N rows from top N distinct values.",
        "I can use DENSE_RANK to include tied salary values.",
        "I can use ROW_NUMBER with PARTITION BY for Top-N per group.",
        "I can calculate total pages from the total number of matching records.",
        "I understand why stable ordering matters for pagination."
      ]
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you sort SQL query results?",
          answer: "Use ORDER BY followed by one or more columns or expressions. ASC sorts in ascending order, while DESC sorts in descending order."
        },
        {
          question: "What is the difference between ASC and DESC?",
          answer: "ASC sorts from lower to higher values for numeric columns, while DESC sorts from higher to lower values. The meaning for text and dates follows the corresponding sort order."
        },
        {
          question: "How do you sort by department and then salary?",
          answer: "Use ORDER BY department ASC, salary DESC. The department determines the primary order, and salary determines the order within each department."
        },
        {
          question: "How do you retrieve the top three highest-paid employees?",
          answer: "Use ORDER BY salary DESC LIMIT 3 in MySQL or PostgreSQL. Add a unique tie-breaker such as employee_id for deterministic ordering."
        },
        {
          question: "How do you retrieve the second page with ten records per page?",
          answer: "Use LIMIT 10 OFFSET 10 with a deterministic ORDER BY clause. The first ten rows are skipped and the next ten are returned."
        },
        {
          question: "What is the offset for page four with a page size of ten?",
          answer: "For one-based page numbers, offset = (4 - 1) * 10 = 30."
        },
        {
          question: "Why is ORDER BY important for pagination?",
          answer: "Without ORDER BY, SQL does not guarantee a predictable row order, so records can appear in unexpected positions between requests."
        },
        {
          question: "Does LIMIT 3 return every employee tied at the third position?",
          answer: "No. LIMIT returns at most three rows. Use DENSE_RANK or a supported FETCH FIRST WITH TIES clause when tied rows must be included."
        },
        {
          question: "How do you retrieve the second-highest distinct salary?",
          answer: "One approach is SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1. DENSE_RANK is another useful approach."
        },
        {
          question: "What is the difference between ROW_NUMBER and DENSE_RANK?",
          answer: "ROW_NUMBER assigns a unique sequence number to every row. DENSE_RANK gives equal ordering values the same rank and does not leave gaps."
        },
        {
          question: "How do you retrieve the top two employees from every department?",
          answer: "Use ROW_NUMBER with PARTITION BY department and ORDER BY salary DESC, then filter the result to row_num <= 2."
        },
        {
          question: "What happens when the requested page is beyond the final page?",
          answer: "The query generally returns an empty result set. The API should define its response behavior and can provide metadata indicating the available page range."
        },
        {
          question: "Why should pagination page size be limited?",
          answer: "A maximum page size protects the database, application memory, network, and response time from excessively large requests."
        },
        {
          question: "What is the difference between offset and keyset pagination?",
          answer: "Offset pagination skips rows and supports numbered pages. Keyset pagination continues from a last-seen sort key and can be more efficient for sequential navigation through large datasets."
        },
        {
          question: "Can ORDER BY sort by an expression?",
          answer: "Yes. For example, ORDER BY salary * 12 DESC sorts by an estimated annual salary when salary represents monthly pay."
        },
        {
          question: "Does LIMIT guarantee that the database processes only the requested number of rows?",
          answer: "No. The database may still scan, filter, or sort many rows before returning the limited result. Indexes and execution plans influence performance."
        }
      ]
    }
  ]
};
