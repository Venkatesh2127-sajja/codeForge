
export const selectFilteringExercises = {
  id: 2020,
  title: "SELECT and Filtering Exercises",
  slug: "select-filtering-exercises",
  topicTitle: "SELECT Queries and Filtering",
  description:
    "Practise SELECT, DISTINCT, aliases, WHERE, comparison operators, logical operators, IN, BETWEEN, LIKE, NULL filtering, calculated columns, sorting, and practical query combinations.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "setup",
      title: "1. Practice Dataset",
      paragraphs: [
        "Use the following table for all exercises in this lesson.",
        "The dataset contains six employees and intentionally includes a NULL department for Arun so that NULL filtering can be practised.",
        "Run the CREATE TABLE and INSERT statements before attempting the exercises."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    city VARCHAR(50)
);

INSERT INTO employees
    (employee_id, employee_name, department, salary, city)
VALUES
    (1, 'Ravi', 'Engineering', 60000, 'Bangalore'),
    (2, 'Priya', 'HR', 45000, 'Hyderabad'),
    (3, 'Kiran', 'Engineering', 70000, 'Bangalore'),
    (4, 'Anu', 'Finance', 50000, 'Chennai'),
    (5, 'Meena', 'Engineering', 55000, 'Hyderabad'),
    (6, 'Arun', NULL, 40000, 'Chennai');`
      }
    },

    {
      id: "dataset-check",
      title: "2. Check the Dataset",
      paragraphs: [
        "Before starting the exercises, inspect the complete dataset. This helps you understand which rows should match each condition.",
        "There are six employees, three Engineering employees, one HR employee, one Finance employee, and one employee whose department is NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees
ORDER BY employee_id;`
      },

      output: `employee_id | employee_name | department  | salary | city
------------+---------------+-------------+--------+----------
1           | Ravi          | Engineering | 60000  | Bangalore
2           | Priya         | HR          | 45000  | Hyderabad
3           | Kiran         | Engineering | 70000  | Bangalore
4           | Anu           | Finance     | 50000  | Chennai
5           | Meena         | Engineering | 55000  | Hyderabad
6           | Arun          | NULL        | 40000  | Chennai`
    },

    {
      id: "exercise-1",
      title: "3. Exercise — Select All Employees",
      paragraphs: [
        "Retrieve every column and every employee.",
        "This is the basic SELECT * query. It is useful while learning or inspecting data, although production queries often benefit from selecting only the columns actually required."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees;`
      },

      output: `6 rows returned`
    },

    {
      id: "exercise-1-solution",
      title: "4. Solution — Select All Employees",
      paragraphs: [
        "The * symbol means that all columns from the employees table should be returned."
      ],

      code: {
        language: "sql",
        code: `SELECT *
FROM employees;`
      }
    },

    {
      id: "exercise-2",
      title: "5. Exercise — Select Specific Columns",
      paragraphs: [
        "Retrieve employee name, department, and salary.",
        "Selecting only the required columns is usually clearer than selecting every column."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees;`
      }
    },

    {
      id: "exercise-2-solution",
      title: "6. Solution — Select Specific Columns",
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees;`
      },

      output: `employee_name | department  | salary
--------------+-------------+--------
Ravi          | Engineering | 60000
Priya         | HR          | 45000
Kiran         | Engineering | 70000
Anu           | Finance     | 50000
Meena         | Engineering | 55000
Arun          | NULL        | 40000`
    },

    {
      id: "exercise-3",
      title: "7. Exercise — Unique Departments",
      paragraphs: [
        "Display every different department.",
        "Use DISTINCT so duplicate department values appear only once."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees;`
      }
    },

    {
      id: "exercise-3-solution",
      title: "8. Solution — Unique Departments",
      paragraphs: [
        "DISTINCT removes duplicate result values. Notice that NULL can also appear as one distinct value."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees;`
      },

      output: `department
-------------
Engineering
HR
Finance
NULL`
    },

    {
      id: "exercise-4",
      title: "9. Exercise — Salary Filter",
      paragraphs: [
        "Find employees whose salary is greater than 50000.",
        "Remember that > excludes exactly 50000."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;`
      }
    },

    {
      id: "exercise-4-solution",
      title: "10. Solution — Salary Filter",
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > 50000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000
Meena         | 55000`
    },

    {
      id: "exercise-5",
      title: "11. Exercise — Multiple Conditions",
      paragraphs: [
        "Find Engineering employees earning at least 55000.",
        "Both conditions must be true, so use AND."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 55000;`
      }
    },

    {
      id: "exercise-5-solution",
      title: "12. Solution — Multiple Conditions",
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 55000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000
Meena         | 55000`
    },

    {
      id: "exercise-6",
      title: "13. Exercise — IN",
      paragraphs: [
        "Find employees who work in Engineering or Finance.",
        "IN is useful when a column should match one of several exact values."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'Finance');`
      }
    },

    {
      id: "exercise-6-solution",
      title: "14. Solution — IN",
      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department IN ('Engineering', 'Finance');`
      },

      output: `employee_name | department
--------------+-------------
Ravi          | Engineering
Kiran         | Engineering
Anu           | Finance
Meena         | Engineering`
    },

    {
      id: "exercise-7",
      title: "15. Exercise — BETWEEN",
      paragraphs: [
        "Find employees whose salary is between 45000 and 60000, inclusive.",
        "BETWEEN includes both boundary values, so employees earning exactly 45000 and exactly 60000 qualify."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 45000 AND 60000;`
      }
    },

    {
      id: "exercise-7-solution",
      title: "16. Solution — BETWEEN",
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 45000 AND 60000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Priya         | 45000
Anu           | 50000
Meena         | 55000`
    },

    {
      id: "exercise-8",
      title: "17. Exercise — LIKE",
      paragraphs: [
        "Find employees whose names start with A.",
        "The % wildcard represents zero or more characters."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE 'A%';`
      }
    },

    {
      id: "exercise-8-solution",
      title: "18. Solution — LIKE",
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE 'A%';`
      },

      output: `employee_name
-------------
Anu
Arun`
    },

    {
      id: "exercise-9",
      title: "19. Exercise — NULL",
      paragraphs: [
        "Find employees whose department has not been assigned.",
        "Use IS NULL rather than = NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;`
      }
    },

    {
      id: "exercise-9-solution",
      title: "20. Solution — NULL",
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;`
      },

      output: `employee_name
-------------
Arun`
    },

    {
      id: "exercise-10",
      title: "21. Exercise — Calculated Column",
      paragraphs: [
        "Display each employee's name and annual salary.",
        "A calculated column can be created by performing an arithmetic operation inside SELECT."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees;`
      }
    },

    {
      id: "exercise-10-solution",
      title: "22. Solution — Calculated Column",
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees;`
      },

      output: `employee_name | annual_salary
--------------+--------------
Ravi          | 720000
Priya         | 540000
Kiran         | 840000
Anu           | 600000
Meena         | 660000
Arun          | 480000`
    },

    {
      id: "exercise-11",
      title: "23. Exercise — Salary at Least 60000",
      paragraphs: [
        "Find employees whose salary is greater than or equal to 60000."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 60000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000`
    },

    {
      id: "exercise-12",
      title: "24. Exercise — Employees in Bangalore",
      paragraphs: [
        "Find employees who work in Bangalore."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, city
FROM employees
WHERE city = 'Bangalore';`
      },

      output: `employee_name | city
--------------+----------
Ravi          | Bangalore
Kiran         | Bangalore`
    },

    {
      id: "exercise-13",
      title: "25. Exercise — Bangalore Engineering Employees",
      paragraphs: [
        "Find employees who are from Engineering and work in Bangalore.",
        "Both conditions must be satisfied."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, city
FROM employees
WHERE department = 'Engineering'
  AND city = 'Bangalore';`
      },

      output: `employee_name | department  | city
--------------+-------------+----------
Ravi          | Engineering | Bangalore
Kiran         | Engineering | Bangalore`
    },

    {
      id: "exercise-14",
      title: "26. Exercise — HR or Finance",
      paragraphs: [
        "Find employees who work in either HR or Finance."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';`
      },

      output: `employee_name | department
--------------+-----------
Priya         | HR
Anu           | Finance`
    },

    {
      id: "exercise-15",
      title: "27. Exercise — Employees Not in HR",
      paragraphs: [
        "Find employees whose department is not HR.",
        "Remember that a NULL department does not satisfy a normal <> comparison."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department
FROM employees
WHERE department <> 'HR';`
      },

      output: `employee_name | department
--------------+-------------
Ravi          | Engineering
Kiran         | Engineering
Anu           | Finance
Meena         | Engineering`
    },

    {
      id: "exercise-16",
      title: "28. Exercise — Names Containing 'i'",
      paragraphs: [
        "Find employees whose names contain the character i."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE employee_name LIKE '%i%';`
      },

      output: `employee_name
-------------
Ravi
Priya
Kiran
Meena`
    },

    {
      id: "exercise-17",
      title: "29. Exercise — Salary Range with Department",
      paragraphs: [
        "Find Engineering employees whose salary is between 55000 and 70000, inclusive."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary BETWEEN 55000 AND 70000;`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000
Meena         | 55000`
    },

    {
      id: "exercise-18",
      title: "30. Exercise — Multiple Departments and Salary",
      paragraphs: [
        "Find employees from Engineering or Finance whose salary is at least 50000.",
        "Use parentheses so the OR condition is clearly grouped with the salary requirement."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary >= 50000;`
      },

      output: `employee_name | department  | salary
--------------+-------------+-------
Ravi          | Engineering | 60000
Kiran         | Engineering | 70000
Anu           | Finance     | 50000
Meena         | Engineering | 55000`
    },

    {
      id: "exercise-19",
      title: "31. Exercise — Alias a Calculated Column",
      paragraphs: [
        "Display the employee name, salary, and annual salary. Give the calculated column the alias annual_salary."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees;`
      }
    },

    {
      id: "exercise-20",
      title: "32. Exercise — Sort Filtered Results",
      paragraphs: [
        "Find employees earning at least 50000 and display them from highest salary to lowest salary."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },

      output: `employee_name | salary
--------------+-------
Kiran         | 70000
Ravi          | 60000
Meena         | 55000
Anu           | 50000`
    },

    {
      id: "exercise-21",
      title: "33. Exercise — DISTINCT Cities",
      paragraphs: [
        "Display each city only once."
      ],

      code: {
        language: "sql",
        code: `SELECT DISTINCT city
FROM employees;`
      },

      output: `city
---------
Bangalore
Hyderabad
Chennai`
    },

    {
      id: "exercise-22",
      title: "34. Exercise — Top Salary",
      paragraphs: [
        "Find the employee with the highest salary using ORDER BY and LIMIT."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 1;`
      },

      output: `employee_name | salary
--------------+-------
Kiran         | 70000`
    },

    {
      id: "exercise-23",
      title: "35. Exercise — Lowest Salary",
      paragraphs: [
        "Find the employee with the lowest salary."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary ASC
LIMIT 1;`
      },

      output: `employee_name | salary
--------------+-------
Arun          | 40000`
    },

    {
      id: "exercise-24",
      title: "36. Exercise — Employees Without a Department",
      paragraphs: [
        "Find the employee whose department is NULL and display their name, city, and salary."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, city, salary
FROM employees
WHERE department IS NULL;`
      },

      output: `employee_name | city    | salary
--------------+---------+-------
Arun          | Chennai | 40000`
    },

    {
      id: "exercise-25",
      title: "37. Exercise — Complex Filtering",
      paragraphs: [
        "Find employees who are either from Engineering earning at least 60000, or from Finance earning at least 50000.",
        "This exercise tests parentheses, OR, AND, equality, and comparison operators."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE (department = 'Engineering' AND salary >= 60000)
   OR (department = 'Finance' AND salary >= 50000);`
      },

      output: `employee_name | department  | salary
--------------+-------------+-------
Ravi          | Engineering | 60000
Kiran         | Engineering | 70000
Anu           | Finance     | 50000`
    },

    {
      id: "exercise-26",
      title: "38. Exercise — Fallback for NULL",
      paragraphs: [
        "Display every employee's name and department, but show 'Not Assigned' whenever department is NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    COALESCE(department, 'Not Assigned') AS department
FROM employees;`
      },

      output: `employee_name | department
--------------+-------------
Ravi          | Engineering
Priya         | HR
Kiran         | Engineering
Anu           | Finance
Meena         | Engineering
Arun          | Not Assigned`
    },

    {
      id: "exercise-27",
      title: "39. Exercise — City and Name Filtering",
      paragraphs: [
        "Find employees from Hyderabad whose names start with P or M."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, city
FROM employees
WHERE city = 'Hyderabad'
  AND (
      employee_name LIKE 'P%'
      OR employee_name LIKE 'M%'
  );`
      },

      output: `employee_name | city
--------------+----------
Priya         | Hyderabad
Meena         | Hyderabad`
    },

    {
      id: "exercise-28",
      title: "40. Exercise — Exclude a Department",
      paragraphs: [
        "Find employees who are not in Engineering and whose salary is at least 45000."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department <> 'Engineering'
  AND salary >= 45000;`
      },

      output: `employee_name | department | salary
--------------+------------+-------
Priya         | HR         | 45000
Anu           | Finance    | 50000`
    },

    {
      id: "exercise-29",
      title: "41. Exercise — Complete Employee Search",
      paragraphs: [
        "Build a realistic employee search query: find employees from Engineering or Finance, with salary between 50000 and 70000, whose name starts with R, K, or A."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary BETWEEN 50000 AND 70000
  AND (
      employee_name LIKE 'R%'
      OR employee_name LIKE 'K%'
      OR employee_name LIKE 'A%'
  );`
      },

      output: `employee_name | department  | salary
--------------+-------------+-------
Ravi          | Engineering | 60000
Kiran         | Engineering | 70000
Anu           | Finance     | 50000`
    },

    {
      id: "challenge-1",
      title: "42. Challenge — Find the Second Highest Salary",
      paragraphs: [
        "Find the employee with the second-highest distinct salary.",
        "This introduces DISTINCT together with ORDER BY and LIMIT."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary = (
    SELECT DISTINCT salary
    FROM employees
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
);`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000`
    },

    {
      id: "challenge-2",
      title: "43. Challenge — Count Employees by Department",
      paragraphs: [
        "Count how many employees belong to each department.",
        "This introduces GROUP BY. NULL is treated as its own grouping value."
      ],

      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC;`
      },

      output: `department  | employee_count
------------+---------------
Engineering | 3
HR          | 1
Finance     | 1
NULL        | 1`
    },

    {
      id: "challenge-3",
      title: "44. Challenge — Departments with Average Salary",
      paragraphs: [
        "Find departments whose average salary is at least 55000.",
        "Use GROUP BY and HAVING."
      ],

      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 55000;`
      },

      output: `department  | average_salary
------------+---------------
Engineering | 61666.67`
    },

    {
      id: "challenge-4",
      title: "45. Challenge — Employees Above Average Salary",
      paragraphs: [
        "Find employees whose salary is greater than the average salary of all employees."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`
      },

      output: `employee_name | salary
--------------+-------
Ravi          | 60000
Kiran         | 70000
Meena         | 55000`
    },

    {
      id: "debugging",
      title: "46. Debugging Exercise — Why Does This Return No NULL Rows?",
      paragraphs: [
        "The following query is incorrect if the goal is to find employees whose department is NULL.",
        "Identify the problem and rewrite the query correctly."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department = NULL;`
      },

      bullets: [
        "The problem is using = with NULL.",
        "NULL represents an unknown value.",
        "Use IS NULL instead."
      ]
    },

    {
      id: "debugging-solution",
      title: "47. Debugging Solution",
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;`
      },

      output: `employee_name
-------------
Arun`
    },

    {
      id: "debugging-and-or",
      title: "48. Debugging Exercise — AND and OR",
      paragraphs: [
        "The following query is intended to find Engineering or Finance employees who earn at least 50000.",
        "Rewrite it using parentheses so the business rule is explicit."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department = 'Engineering'
   OR department = 'Finance'
  AND salary >= 50000;`
      },

      bullets: [
        "AND has higher precedence than OR.",
        "The original query does not clearly express the intended grouping.",
        "Use parentheses or IN to make the requirement explicit."
      ]
    },

    {
      id: "debugging-and-or-solution",
      title: "49. Debugging Solution — AND and OR",
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE (department = 'Engineering'
       OR department = 'Finance')
  AND salary >= 50000;

-- Cleaner alternative
SELECT employee_name, department, salary
FROM employees
WHERE department IN ('Engineering', 'Finance')
  AND salary >= 50000;`
      }
    },

    {
      id: "interview",
      title: "50. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you filter rows in SQL?",
          answer:
            "Use the WHERE clause with a filtering condition."
        },
        {
          question: "How do you select all columns?",
          answer:
            "Use SELECT * FROM table_name, although selecting only required columns is often preferable in production queries."
        },
        {
          question: "How do you select specific columns?",
          answer:
            "List the required column names after SELECT, such as SELECT employee_name, salary FROM employees."
        },
        {
          question: "How do you find unique values?",
          answer:
            "Use SELECT DISTINCT followed by the required expression or expressions."
        },
        {
          question: "Does DISTINCT remove NULL?",
          answer:
            "DISTINCT removes duplicate result values, and multiple NULL values are treated as one distinct result value."
        },
        {
          question: "How do you filter multiple possible values?",
          answer:
            "Use IN, such as WHERE department IN ('HR', 'Finance')."
        },
        {
          question: "How do you filter a range?",
          answer:
            "Use BETWEEN for an inclusive range, or comparison operators such as >= and < when more precise boundary logic is required."
        },
        {
          question: "Is BETWEEN inclusive?",
          answer:
            "Yes. BETWEEN normally includes both the lower and upper boundary values."
        },
        {
          question: "How do you find names starting with A?",
          answer:
            "Use LIKE 'A%' when the database's pattern-matching behavior is appropriate."
        },
        {
          question: "What does % mean in LIKE?",
          answer:
            "It commonly represents zero or more characters."
        },
        {
          question: "What does _ mean in LIKE?",
          answer:
            "It commonly represents exactly one character."
        },
        {
          question: "How do you find NULL values?",
          answer:
            "Use IS NULL rather than = NULL."
        },
        {
          question: "What is the difference between AND and OR?",
          answer:
            "AND requires all specified conditions to be true, while OR requires at least one condition to be true."
        },
        {
          question: "Why are parentheses important with AND and OR?",
          answer:
            "They explicitly define the intended grouping of conditions and prevent mistakes caused by operator precedence."
        },
        {
          question: "How do you calculate a value in SELECT?",
          answer:
            "Use an expression such as salary * 12 and optionally give it an alias with AS."
        },
        {
          question: "What is an alias?",
          answer:
            "An alias is a temporary name given to a column or table within a query. For example, salary * 12 AS annual_salary."
        },
        {
          question: "How do you sort query results?",
          answer:
            "Use ORDER BY. ASC sorts ascending and DESC sorts descending."
        },
        {
          question: "How do you get the highest-paid employee?",
          answer:
            "One simple approach is ORDER BY salary DESC LIMIT 1. The exact syntax for limiting rows can differ between database systems."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY and is commonly used with aggregate conditions."
        },
        {
          question: "How do you find employees whose salary is above the average salary?",
          answer:
            "Use a subquery such as WHERE salary > (SELECT AVG(salary) FROM employees)."
        },
        {
          question: "Why should user input not be concatenated directly into SQL?",
          answer:
            "Direct concatenation can create SQL injection vulnerabilities. Parameterized queries should be used instead."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "51. Quick Reference",
      bullets: [
        "SELECT * → Select all columns.",
        "SELECT column1, column2 → Select specific columns.",
        "DISTINCT → Remove duplicate result values.",
        "AS → Assign an alias.",
        "WHERE → Filter rows.",
        "= → Equal to.",
        "<> → Not equal to.",
        "> → Greater than.",
        "< → Less than.",
        ">= → Greater than or equal to.",
        "<= → Less than or equal to.",
        "AND → All conditions must be true.",
        "OR → At least one condition must be true.",
        "NOT → Reverse a condition.",
        "IN → Match one of several values.",
        "BETWEEN → Inclusive range.",
        "LIKE → Pattern matching.",
        "IS NULL → Find NULL values.",
        "IS NOT NULL → Find non-NULL values.",
        "ORDER BY → Sort results.",
        "LIMIT → Restrict returned rows in databases that support this syntax.",
        "COALESCE → Return the first non-NULL value.",
        "GROUP BY → Create groups.",
        "HAVING → Filter groups."
      ]
    },

    {
      id: "one-minute-answer",
      title: "52. One-Minute Interview Answer",
      paragraphs: [
        "SELECT is used to retrieve data from database tables, and WHERE is used to filter rows. DISTINCT removes duplicate result values, while aliases created with AS give columns readable names.",
        "For filtering, comparison operators such as =, >, <, >=, and <= can be combined with logical operators such as AND, OR, and NOT. IN is useful for matching a list of values, BETWEEN is useful for inclusive ranges, and LIKE is used for text pattern matching.",
        "NULL requires special handling, so IS NULL and IS NOT NULL should be used instead of = NULL or <> NULL. ORDER BY sorts results, and calculated expressions such as salary * 12 can be given aliases.",
        "In real applications, these concepts form the foundation of database search APIs and Spring Data JPA queries. Complex filtering should use clear parentheses and parameterized query values."
      ]
    },

    {
      id: "revision-notes",
      title: "53. Revision Notes",
      bullets: [
        "SELECT retrieves data.",
        "SELECT * retrieves all columns.",
        "Specific column selection is usually preferable when only certain fields are needed.",
        "DISTINCT removes duplicate result values.",
        "AS creates an alias.",
        "WHERE filters rows.",
        "Comparison operators control numeric, text, and date filtering.",
        "AND requires all conditions to be true.",
        "OR requires at least one condition to be true.",
        "Use parentheses for complex AND/OR expressions.",
        "IN is useful for a list of exact values.",
        "BETWEEN includes both boundaries.",
        "LIKE supports text pattern matching.",
        "% means zero or more characters.",
        "_ means one character.",
        "IS NULL checks for NULL.",
        "IS NOT NULL checks for non-NULL values.",
        "NULL should not be compared using =.",
        "ORDER BY sorts the result.",
        "DESC sorts from high to low or reverse alphabetical order.",
        "LIMIT restricts the number of returned rows where supported.",
        "Calculated expressions can be given aliases.",
        "GROUP BY groups rows for aggregation.",
        "HAVING filters grouped results.",
        "Subqueries can be used for advanced filtering.",
        "Use parameterized queries for user-provided values."
      ]
    }
  ]
};
