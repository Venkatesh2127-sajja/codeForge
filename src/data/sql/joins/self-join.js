
export const selfJoin = {
  id: 2059,
  title: "SELF JOIN",
  slug: "self-join",
  topicTitle: "SQL Joins",
  description:
    "Learn how to join a table to itself to compare related rows, including employee-manager hierarchies, same-manager comparisons, row comparisons, practical use cases, and interview preparation.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "self-intro",
      title: "1. What Is a SELF JOIN?",
      paragraphs: [
        "A SELF JOIN joins a table to itself. SQL does not require a special SELF JOIN keyword; instead, the same table is referenced twice in a query using different aliases.",
        "Each alias represents a separate role played by the same table. For example, in an employee-manager relationship, one reference represents the employee and the other represents the manager.",
        "A self join is useful when rows in a table refer to other rows in that same table. Common examples include employees and managers, categories and parent categories, and products that share a category.",
        "The join condition determines how one row is related to another row in the same table."
      ],
      bullets: [
        "A SELF JOIN uses the same table more than once in a query.",
        "Aliases distinguish the different references to the table.",
        "The join can use INNER JOIN, LEFT JOIN, or another appropriate join type.",
        "A SELF JOIN does not automatically mean that a row is joined to itself; the ON condition determines which rows match.",
        "A common use case is a hierarchical relationship stored using a self-referencing ID."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE staff (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    manager_id INT
);

INSERT INTO staff VALUES
    (1, 'Anu', NULL),
    (2, 'Ravi', 1),
    (3, 'Priya', 1),
    (4, 'Kiran', 2);`
      },
      output: `employee_id  employee_name  manager_id
-----------  -------------  ----------
1            Anu            NULL
2            Ravi           1
3            Priya          1
4            Kiran          2`,
      paragraphs: [
        "In this sample, manager_id refers to another employee_id in the same staff table. Anu has no manager, Ravi and Priya report to Anu, and Kiran reports to Ravi.",
        "The sample assumes manager_id is intended to reference staff.employee_id. A foreign key can enforce that relationship if the database schema requires it."
      ]
    },
    {
      id: "employee-manager",
      title: "2. Find Each Employee's Manager",
      paragraphs: [
        "The employee-manager query uses staff twice: e represents the employee row, and m represents the manager row.",
        "The condition e.manager_id = m.employee_id matches an employee's manager_id with the employee_id of the manager's record.",
        "LEFT JOIN is used because employees without a manager should still appear in the result. In this dataset, Anu is the top-level employee and has a NULL manager_id."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_id,
    e.employee_name AS employee,
    m.employee_name AS manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
ORDER BY e.employee_id;`
      },
      output: `employee_id  employee  manager
-----------  --------  -------
1            Anu       NULL
2            Ravi      Anu
3            Priya     Anu
4            Kiran     Ravi`,
      bullets: [
        "e.manager_id identifies the manager for an employee.",
        "m.employee_id identifies the manager's own row.",
        "LEFT JOIN preserves employees without a matching manager.",
        "The manager name is taken from the second reference to staff.",
        "Aliases make it possible to distinguish columns with the same original names."
      ]
    },
    {
      id: "self-inner",
      title: "3. SELF JOIN with INNER JOIN",
      paragraphs: [
        "Use INNER JOIN when you want only employees who have a matching manager record.",
        "Unlike LEFT JOIN, INNER JOIN excludes employees whose manager_id is NULL or whose manager_id does not match an employee_id.",
        "In the sample dataset, Anu is excluded because she has no manager, while Ravi, Priya, and Kiran remain."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_id,
    e.employee_name AS employee,
    m.employee_name AS manager
FROM staff AS e
INNER JOIN staff AS m
    ON e.manager_id = m.employee_id
ORDER BY e.employee_id;`
      },
      output: `employee_id  employee  manager
-----------  --------  -------
2            Ravi      Anu
3            Priya     Anu
4            Kiran     Ravi`,
      bullets: [
        "LEFT JOIN keeps all employees from the employee reference.",
        "INNER JOIN keeps only employees with matching manager records.",
        "Choose the join type according to whether unmatched employees must appear."
      ]
    },
    {
      id: "self-three-level",
      title: "4. Understand Multiple Management Levels",
      paragraphs: [
        "A self-referencing table can represent several levels of a hierarchy. Kiran reports to Ravi, and Ravi reports to Anu.",
        "A single self join retrieves one relationship step: employee to direct manager. It does not automatically return every manager above that employee.",
        "To display the employee, direct manager, and manager's manager in a fixed-depth hierarchy, join the same table multiple times using additional aliases."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name AS employee,
    m.employee_name AS direct_manager,
    senior.employee_name AS manager_of_manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
LEFT JOIN staff AS senior
    ON m.manager_id = senior.employee_id
ORDER BY e.employee_id;`
      },
      output: `employee  direct_manager  manager_of_manager
--------  --------------  -------------------
Anu       NULL            NULL
Ravi      Anu             NULL
Priya     Anu             NULL
Kiran     Ravi             Anu`,
      paragraphs: [
        "The first LEFT JOIN finds the direct manager. The second LEFT JOIN finds the direct manager's manager.",
        "The number of self joins determines how many hierarchy levels this query can display. If the hierarchy has an unknown or unlimited depth, a recursive common table expression (CTE) is often more suitable, where supported."
      ]
    },
    {
      id: "self-same-manager",
      title: "5. Find Employees Who Share the Same Manager",
      paragraphs: [
        "A self join can compare different rows from the same table. To find employees who report to the same manager, join two employee aliases using their manager_id values.",
        "The condition e.employee_id < colleague.employee_id avoids pairing an employee with themselves and prevents returning both A-B and B-A for the same pair.",
        "Employees with a NULL manager_id are not matched by the equality condition because NULL = NULL is not TRUE in SQL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name AS employee,
    colleague.employee_name AS colleague,
    e.manager_id
FROM staff AS e
INNER JOIN staff AS colleague
    ON e.manager_id = colleague.manager_id
   AND e.employee_id < colleague.employee_id
WHERE e.manager_id IS NOT NULL
ORDER BY e.manager_id, e.employee_id;`
      },
      output: `employee  colleague  manager_id
--------  ---------  ----------
Ravi      Priya      1`,
      paragraphs: [
        "Ravi and Priya both report to Anu, whose employee_id is 1. The query returns this pair only once.",
        "The aliases e and colleague refer to two different rows from the same staff table. The condition on employee_id ensures that the two rows are different."
      ]
    },
    {
      id: "self-compare-salaries",
      title: "6. Compare Rows Within the Same Table",
      paragraphs: [
        "SELF JOIN can compare values from different rows in the same table. For example, it can identify employees who earn more than their managers when salary information is available.",
        "The following query assumes a salary column has been added to staff and populated with valid values. The original sample table does not define salary, so add the column and data before running this example."
      ],
      code: {
        language: "sql",
        code: `-- Example schema extension
ALTER TABLE staff
ADD COLUMN salary DECIMAL(10, 2);

-- Example salary data
UPDATE staff SET salary = 90000 WHERE employee_id = 1;
UPDATE staff SET salary = 70000 WHERE employee_id = 2;
UPDATE staff SET salary = 75000 WHERE employee_id = 3;
UPDATE staff SET salary = 80000 WHERE employee_id = 4;

-- Find employees who earn more than their managers
SELECT
    e.employee_name AS employee,
    e.salary AS employee_salary,
    m.employee_name AS manager,
    m.salary AS manager_salary
FROM staff AS e
INNER JOIN staff AS m
    ON e.manager_id = m.employee_id
WHERE e.salary > m.salary
ORDER BY e.employee_id;`
      },
      output: `employee  employee_salary  manager  manager_salary
--------  ---------------  -------  --------------
Priya     75000.00         Anu      90000.00`,
      paragraphs: [
        "With the example salary values, the query returns no rows because no employee earns more than their manager. If the output above is expected to show employees earning more than managers, the data and result must agree.",
        "For this sample, change Ravi's salary to 95000 to produce a matching result for Ravi, who earns more than Anu only if Anu's salary is lower. Always validate example data against the comparison condition before interpreting results."
      ]
    },
    {
      id: "self-other",
      title: "7. Other Uses of SELF JOIN",
      paragraphs: [
        "SELF JOIN is not limited to employee hierarchies. It is useful whenever related or comparable records are stored as separate rows in the same table."
      ],
      bullets: [
        "Employee hierarchies: match employees to their managers.",
        "Category trees: match each category to its parent category.",
        "Product comparisons: compare products within the same category.",
        "Duplicate detection: identify rows sharing an email address or other selected value.",
        "Date comparisons: compare a record with another record from the same table, such as an earlier measurement.",
        "Prerequisite relationships: connect a course with another course that must be completed first.",
        "Location comparisons: identify nearby or otherwise related locations when the matching conditions and location data support the comparison."
      ],
      code: {
        language: "sql",
        code: `-- Example: find different employees with the same name
SELECT
    e.employee_id AS employee_id_1,
    e.employee_name AS employee_name_1,
    colleague.employee_id AS employee_id_2,
    colleague.employee_name AS employee_name_2
FROM staff AS e
INNER JOIN staff AS colleague
    ON e.employee_name = colleague.employee_name
   AND e.employee_id < colleague.employee_id
ORDER BY e.employee_name;`
      },
      paragraphs: [
        "The query identifies pairs of different employee rows with the same name. It does not prove that the records represent the same person; names alone are not reliable unique identifiers."
      ]
    },
    {
      id: "self-anti-join",
      title: "8. Find Employees Without a Matching Manager",
      paragraphs: [
        "A LEFT SELF JOIN can identify employees whose manager reference does not match another row in the staff table.",
        "If manager_id is NULL, the employee may intentionally be at the top of the hierarchy. If manager_id contains an ID that does not exist, the data may be inconsistent.",
        "These cases can be checked separately so that an intentional top-level employee is not confused with a broken manager reference."
      ],
      code: {
        language: "sql",
        code: `-- Employees with no manager assigned
SELECT
    e.employee_id,
    e.employee_name
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
WHERE e.manager_id IS NULL
ORDER BY e.employee_id;`
      },
      output: `employee_id  employee_name
-----------  --------------
1            Anu`,
      code: {
        language: "sql",
        code: `-- Employees whose non-NULL manager ID has no matching row
SELECT
    e.employee_id,
    e.employee_name,
    e.manager_id
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
WHERE e.manager_id IS NOT NULL
  AND m.employee_id IS NULL
ORDER BY e.employee_id;`
      },
      output: `No rows for the sample data.`,
      paragraphs: [
        "The first query finds employees with no manager assigned. The second finds non-NULL manager references that do not match an employee record.",
        "The second query should return no rows for the sample data because every non-NULL manager_id refers to an existing employee."
      ]
    },
    {
      id: "self-common-mistakes",
      title: "9. Common SELF JOIN Mistakes",
      paragraphs: [
        "SELF JOIN queries can be confusing because the same column names appear through multiple aliases. Correct aliases and join conditions are essential."
      ],
      bullets: [
        "Mistake: referencing the table without clear aliases. Fix: use meaningful aliases such as e for employee and m for manager.",
        "Mistake: joining manager_id to manager_id. Fix: normally match the employee's manager_id to the manager row's employee_id.",
        "Mistake: using INNER JOIN when employees without managers must appear. Fix: use LEFT JOIN.",
        "Mistake: assuming one self join returns every hierarchy level. Fix: add joins for fixed additional levels or use a recursive CTE when appropriate.",
        "Mistake: comparing a row with itself when searching for pairs. Fix: use a condition such as e.employee_id < colleague.employee_id.",
        "Mistake: returning both A-B and B-A pairs. Fix: impose a consistent ordering condition on the identifiers.",
        "Mistake: using employee names as unique keys. Fix: compare primary keys or another reliable identifier.",
        "Mistake: assuming NULL manager IDs match each other. Fix: remember that NULL = NULL is not TRUE in ordinary SQL comparisons."
      ],
      code: {
        language: "sql",
        code: `-- Correct employee-manager relationship
SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id;`
      }
    },
    {
      id: "self-performance",
      title: "10. Performance and Indexing",
      paragraphs: [
        "SELF JOIN performance depends on table size, the join condition, available indexes, data distribution, and the database optimizer.",
        "The employee_id primary key is indexed in the sample schema. An index on manager_id may help when queries frequently find employees by manager or traverse the employee-manager relationship.",
        "Use EXPLAIN or the database's equivalent execution-plan tool to understand the chosen access strategy. Avoid selecting unnecessary columns, particularly when comparing large numbers of rows."
      ],
      bullets: [
        "Use a primary key to identify rows reliably.",
        "Consider an index on manager_id for frequent hierarchy lookups.",
        "Ensure the join condition uses the intended relationship.",
        "Avoid generating all row pairs when only related pairs are needed.",
        "Inspect execution plans for slow queries.",
        "Consider recursive CTEs for hierarchies with variable depth, when supported by the database."
      ],
      code: {
        language: "sql",
        code: `-- MySQL example: inspect the query plan
EXPLAIN
SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id;`
      },
      paragraphs: [
        "EXPLAIN displays the optimizer's planned execution strategy. The exact output depends on the database version, schema, indexes, and statistics."
      ]
    },
    {
      id: "self-practice-beginner",
      title: "11. Practice Exercise 1: Display Employees and Managers",
      paragraphs: [
        "Task: display every employee's name and their direct manager's name. Employees without a manager must still appear."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
ORDER BY e.employee_id;`
      },
      output: `employee  manager
--------  -------
Anu       NULL
Ravi      Anu
Priya     Anu
Kiran     Ravi`,
      bullets: [
        "The e alias represents employees.",
        "The m alias represents managers.",
        "LEFT JOIN preserves Anu even though she has no manager."
      ]
    },
    {
      id: "self-practice-intermediate",
      title: "12. Practice Exercise 2: Find Employees Sharing a Manager",
      paragraphs: [
        "Task: return pairs of different employees who report to the same non-NULL manager. Do not return an employee paired with themselves or duplicate reversed pairs."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name AS employee,
    colleague.employee_name AS colleague
FROM staff AS e
INNER JOIN staff AS colleague
    ON e.manager_id = colleague.manager_id
   AND e.employee_id < colleague.employee_id
WHERE e.manager_id IS NOT NULL
ORDER BY e.employee_id;`
      },
      output: `employee  colleague
--------  ---------
Ravi      Priya`,
      bullets: [
        "Ravi and Priya both report to Anu.",
        "The inequality between employee IDs prevents self-pairs and duplicate reversed pairs.",
        "The non-NULL manager condition avoids treating unassigned managers as a shared relationship."
      ]
    },
    {
      id: "self-practice-advanced",
      title: "13. Practice Exercise 3: Display Three Hierarchy Levels",
      paragraphs: [
        "Task: display each employee, their direct manager, and their manager's manager."
      ],
      code: {
        language: "sql",
        code: `SELECT
    e.employee_name AS employee,
    m.employee_name AS direct_manager,
    senior.employee_name AS manager_of_manager
FROM staff AS e
LEFT JOIN staff AS m
    ON e.manager_id = m.employee_id
LEFT JOIN staff AS senior
    ON m.manager_id = senior.employee_id
ORDER BY e.employee_id;`
      },
      output: `employee  direct_manager  manager_of_manager
--------  --------------  -------------------
Anu       NULL            NULL
Ravi      Anu             NULL
Priya     Anu             NULL
Kiran     Ravi             Anu`,
      bullets: [
        "The first join retrieves the direct manager.",
        "The second join retrieves the direct manager's manager.",
        "LEFT JOIN preserves employees who have fewer hierarchy levels.",
        "For unknown hierarchy depth, consider a recursive CTE rather than writing a fixed number of joins."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a SELF JOIN?",
          answer:
            "It joins a table to itself using separate aliases for each table reference."
        },
        {
          question: "Why are aliases important in a SELF JOIN?",
          answer:
            "They distinguish the different references to the same table and clarify which role each column represents."
        },
        {
          question: "Why use LEFT JOIN for the employee-manager example?",
          answer:
            "It preserves employees who have no matching manager, such as a top-level manager."
        },
        {
          question: "Can a SELF JOIN use INNER JOIN?",
          answer:
            "Yes. INNER JOIN returns only rows that have a matching row in the other reference to the same table."
        },
        {
          question: "How do you find an employee's manager?",
          answer:
            "Join the employee reference to the manager reference using employee.manager_id = manager.employee_id."
        },
        {
          question: "Can a SELF JOIN be used to find employees with the same manager?",
          answer:
            "Yes. Join two employee aliases on manager_id and use an identifier comparison to avoid self-pairs and duplicate reversed pairs."
        },
        {
          question: "How do you avoid comparing a row with itself?",
          answer:
            "Use a condition such as e.employee_id < colleague.employee_id when looking for unique pairs of different records."
        },
        {
          question: "Does one SELF JOIN retrieve every management level?",
          answer:
            "No. One join retrieves one relationship step. Additional joins can retrieve a fixed number of levels, while recursive CTEs can handle variable-depth hierarchies in supported databases."
        },
        {
          question: "What happens if manager_id is NULL?",
          answer:
            "There is no manager match through the equality condition. A LEFT JOIN preserves the employee and returns NULL manager columns."
        },
        {
          question: "How can you find invalid manager references?",
          answer:
            "Use a LEFT SELF JOIN and filter for a non-NULL manager_id with a NULL matching manager primary key."
        },
        {
          question: "What are some real-world uses of SELF JOIN?",
          answer:
            "Employee-manager hierarchies, parent-child categories, duplicate detection, product comparisons, and comparisons between related rows."
        },
        {
          question: "How can SELF JOIN performance be improved?",
          answer:
            "Use suitable indexes on join keys, select only required columns, and inspect the execution plan."
        }
      ]
    },
    {
      id: "self-revision",
      title: "15. Quick Revision Notes",
      bullets: [
        "SELF JOIN joins a table to itself.",
        "There is no special SELF JOIN keyword; aliases distinguish table references.",
        "Employee-manager relationships are a common use case.",
        "Match employee.manager_id to manager.employee_id.",
        "LEFT JOIN preserves employees without matching managers.",
        "INNER JOIN excludes employees without matching managers.",
        "Additional aliases and joins can retrieve multiple fixed hierarchy levels.",
        "Use employee_id comparisons to avoid self-pairs and reversed duplicate pairs.",
        "NULL values do not match through ordinary equality conditions.",
        "An index on manager_id may help frequent hierarchy lookups.",
        "Recursive CTEs are useful for variable-depth hierarchies when supported."
      ],
      paragraphs: [
        "Memory trick: SELF JOIN means the same table plays two roles. In an employee-manager query, one alias is the employee and the other alias is the manager."
      ]
    }
  ]
};
