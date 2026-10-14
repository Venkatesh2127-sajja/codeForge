
export const firstSqlQueries = {
  id: 2010,
  title: "Your First SQL Queries",
  slug: "first-sql-queries",
  topicTitle: "Introduction to SQL",
  description:
    "Practise creating a small employee table, inserting records, retrieving and filtering data with SELECT, and performing basic UPDATE, DELETE, and aggregate queries.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "setup",
      title: "1. Create a Practice Table",
      paragraphs: [
        "This lesson combines the previous SQL concepts into one small exercise.",
        "The examples use broadly supported SQL syntax and can be adapted to MySQL or PostgreSQL.",
        "We will create an employees table and then practise inserting, reading, filtering, updating, deleting, and counting employee records."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);`
      },
      bullets: [
        "employee_id uniquely identifies each employee.",
        "employee_name is mandatory because it is NOT NULL.",
        "department stores the employee's department.",
        "salary stores monetary values using DECIMAL."
      ]
    },

    {
      id: "understand-table",
      title: "2. Understand the Table Structure",
      paragraphs: [
        "Before inserting data, understand what each column represents.",
        "A table is made of columns and rows. The column definitions describe the structure, while each inserted record becomes a row."
      ],
      code: {
        language: "sql",
        code: `employees

employee_id | employee_name | department  | salary
------------+---------------+-------------+---------
1           | Ravi          | Engineering | 60000.00
2           | Priya         | HR          | 45000.00
3           | Kiran         | Engineering | 70000.00
4           | Anu           | Finance     | 50000.00`
      },
      bullets: [
        "Column → employee_id, employee_name, department, salary.",
        "Row → one employee record.",
        "Primary key → employee_id.",
        "salary → DECIMAL(10, 2)."
      ]
    },

    {
      id: "insert-data",
      title: "3. Insert Sample Data",
      paragraphs: [
        "INSERT INTO adds new rows to a table.",
        "The column list tells the database which columns receive the supplied values."
      ],
      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (1, 'Ravi', 'Engineering', 60000.00),
    (2, 'Priya', 'HR', 45000.00),
    (3, 'Kiran', 'Engineering', 70000.00),
    (4, 'Anu', 'Finance', 50000.00);`
      },
      output:
        "The table now contains four employee records if the insert completes successfully."
    },

    {
      id: "insert-one",
      title: "4. Insert a Single Employee",

      paragraphs: [
        "You can insert one row at a time or multiple rows in one INSERT statement."
      ],

      code: {
        language: "sql",
        code: `INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (5, 'Meena', 'IT', 55000.00);`
      },

      output: "One new employee row is added if employee_id 5 is not already present."
    },

    {
      id: "select-all",
      title: "5. Retrieve All Employees",
      code: {
        language: "sql",
        code: `SELECT *
FROM employees;`
      },
      paragraphs: [
        "SELECT is used to retrieve data.",
        "The * means all columns.",
        "Without a WHERE clause, this query selects all rows from employees.",
        "The database does not guarantee a particular row order unless ORDER BY is specified."
      ]
    },

    {
      id: "select-columns",
      title: "6. Retrieve Specific Columns",
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees;`
      },
      output: `employee_name | salary
--------------+---------
Ravi          | 60000.00
Priya         | 45000.00
Kiran         | 70000.00
Anu           | 50000.00`,
      paragraphs: [
        "The result contains only the requested columns.",
        "Selecting only the columns required by the application is generally clearer than using SELECT *.",
        "The row order is not guaranteed because the query has no ORDER BY clause."
      ]
    },

    {
      id: "where",
      title: "7. Filter Rows with WHERE",

      paragraphs: [
        "WHERE filters rows before the result is returned.",
        "Only rows satisfying the condition are included in the result."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department = 'Engineering';`
      },

      output: `employee_name | department  | salary
--------------+-------------+---------
Ravi          | Engineering | 60000.00
Kiran         | Engineering | 70000.00`,

      bullets: [
        "WHERE department = 'Engineering' filters employees.",
        "Only matching rows are returned.",
        "Text values are normally written using single quotes.",
        "WHERE can be combined with comparison and logical operators."
      ]
    },

    {
      id: "comparison",
      title: "8. Use Comparison Operators",

      paragraphs: [
        "SQL supports comparison operators such as =, <>, !=, >, <, >=, and <=, although exact operator support can vary slightly by database."
      ],

      code: {
        language: "sql",
        code: `-- Salary greater than 50000
SELECT employee_name, salary
FROM employees
WHERE salary > 50000;

-- Salary at least 50000
SELECT employee_name, salary
FROM employees
WHERE salary >= 50000;

-- Salary less than 60000
SELECT employee_name, salary
FROM employees
WHERE salary < 60000;`
      }
    },

    {
      id: "and-or",
      title: "9. Combine Conditions with AND and OR",

      paragraphs: [
        "AND requires all specified conditions to be true.",
        "OR requires at least one condition to be true.",
        "Parentheses are useful when combining multiple conditions so the intended logic is explicit."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND salary >= 60000;

SELECT employee_name, department
FROM employees
WHERE department = 'HR'
   OR department = 'Finance';`
      }
    },

    {
      id: "order-by",
      title: "10. Sort Query Results with ORDER BY",

      paragraphs: [
        "ORDER BY sorts the result set.",
        "ASC means ascending order and is the default direction in many SQL implementations.",
        "DESC means descending order."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;`
      },

      output: `employee_name | salary
--------------+---------
Kiran         | 70000.00
Ravi          | 60000.00
Anu           | 50000.00
Priya         | 45000.00`
    },

    {
      id: "limit",
      title: "11. Limit the Number of Rows",

      paragraphs: [
        "When you only need a small number of results, you can limit the result set.",
        "The exact syntax differs between database systems. MySQL commonly uses LIMIT, while PostgreSQL also supports LIMIT."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 2;`
      },

      output: `employee_name | salary
--------------+---------
Kiran         | 70000.00
Ravi          | 60000.00`
    },

    {
      id: "aliases",
      title: "12. Use Column Aliases",

      paragraphs: [
        "An alias gives a temporary name to a column in the query result.",
        "Aliases are useful when calculated values or database column names are not convenient for API consumers."
      ],

      code: {
        language: "sql",
        code: `SELECT
    employee_name AS name,
    salary AS monthly_salary
FROM employees;`
      },

      output: `name  | monthly_salary
------+---------------
Ravi  | 60000.00
Priya | 45000.00
Kiran | 70000.00
Anu   | 50000.00`
    },

    {
      id: "update",
      title: "13. Update Employee Data",

      paragraphs: [
        "UPDATE modifies existing rows.",
        "Always think carefully about the WHERE clause before executing an UPDATE."
      ],

      code: {
        language: "sql",
        code: `UPDATE employees
SET salary = 65000
WHERE employee_id = 1;`
      },

      output:
        "Ravi's salary changes from 60000.00 to 65000.00 if employee_id 1 belongs to Ravi."
    },

    {
      id: "update-multiple",
      title: "14. Update Multiple Columns",

      paragraphs: [
        "An UPDATE statement can change more than one column."
      ],

      code: {
        language: "sql",
        code: `UPDATE employees
SET department = 'IT',
    salary = 58000
WHERE employee_id = 5;`
      },

      bullets: [
        "department is changed to IT.",
        "salary is changed to 58000.",
        "WHERE employee_id = 5 limits the update to one employee."
      ]
    },

    {
      id: "delete",
      title: "15. Delete an Employee",

      paragraphs: [
        "DELETE removes rows from a table.",
        "A WHERE clause is usually required when you want to delete specific records."
      ],

      code: {
        language: "sql",
        code: `DELETE FROM employees
WHERE employee_id = 4;`
      },

      output:
        "The employee with employee_id 4 is removed if that row exists."
    },

    {
      id: "count",
      title: "16. Count Employees",

      paragraphs: [
        "COUNT(*) counts rows in the result set."
      ],

      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS employee_count
FROM employees;`
      },

      output: `employee_count
--------------
4`
    },

    {
      id: "aggregate",
      title: "17. Basic Aggregate Queries",

      paragraphs: [
        "Aggregate functions calculate a value from multiple rows.",
        "Common aggregate functions include COUNT, SUM, AVG, MIN, and MAX."
      ],

      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;`
      },

      bullets: [
        "COUNT → number of rows.",
        "SUM → total of numeric values.",
        "AVG → average value.",
        "MIN → smallest value.",
        "MAX → largest value."
      ]
    },

    {
      id: "group-by",
      title: "18. Count Employees by Department",

      paragraphs: [
        "GROUP BY groups rows with the same value so aggregate functions can be calculated for each group."
      ],

      code: {
        language: "sql",
        code: `SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      },

      output: `department  | employee_count
------------+---------------
Engineering | 2
HR          | 1
Finance     | 1`
    },

    {
      id: "null",
      title: "19. Working with NULL",

      paragraphs: [
        "NULL means the value is missing or unknown. It is not the same as zero and is not the same as an empty string.",
        "Use IS NULL or IS NOT NULL to test for NULL."
      ],

      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
WHERE department IS NULL;

SELECT employee_name
FROM employees
WHERE department IS NOT NULL;`
      }
    },

    {
      id: "practice",
      title: "20. Beginner Practice Exercises",
      paragraphs: [
        "Write SQL statements for the following tasks using the employees table created above."
      ],
      bullets: [
        "Display only employee_name.",
        "Display employee_name and department.",
        "Display employees whose salary is greater than 50000.",
        "Display employees from the Engineering department.",
        "Display employees ordered by salary from highest to lowest.",
        "Insert an employee named Meena in the IT department with a salary of 55000.",
        "Change Ravi's salary to 65000.",
        "Delete the employee whose employee_id is 4.",
        "Display the number of rows in the table using COUNT(*).",
        "Display the average employee salary.",
        "Display the highest employee salary.",
        "Display the number of employees in each department."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT employee_name
FROM employees;

-- Exercise 2
SELECT employee_name, department
FROM employees;

-- Exercise 3
SELECT employee_name, salary
FROM employees
WHERE salary > 50000;

-- Exercise 4
SELECT employee_name, department
FROM employees
WHERE department = 'Engineering';

-- Exercise 5
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;

-- Exercise 6
INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (5, 'Meena', 'IT', 55000.00);

-- Exercise 7
UPDATE employees
SET salary = 65000
WHERE employee_id = 1;

-- Exercise 8
DELETE FROM employees
WHERE employee_id = 4;

-- Exercise 9
SELECT COUNT(*) AS employee_count
FROM employees;

-- Exercise 10
SELECT AVG(salary) AS average_salary
FROM employees;

-- Exercise 11
SELECT MAX(salary) AS highest_salary
FROM employees;

-- Exercise 12
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;`
      },
      output:
        "The output depends on which exercises have already been executed. Run each statement in order against your practice database."
    },

    {
      id: "sql-execution-flow",
      title: "21. How a SELECT Query Works",

      paragraphs: [
        "When you send a SELECT query to the database, the database parses the SQL, determines an execution strategy, accesses the required data, applies filtering and other operations, and returns the result.",
        "For a beginner, remember the simplified flow: SQL query → database parser/planner → data access → filtering/grouping/sorting → result."
      ],

      code: {
        language: "text",
        code: `Application
    ↓
SQL Query
    ↓
Database Server
    ↓
Parse SQL
    ↓
Choose Execution Plan
    ↓
Read Required Data
    ↓
WHERE / GROUP BY / ORDER BY
    ↓
Result Set
    ↓
Application`
      }
    },

    {
      id: "crud-summary",
      title: "22. Your First SQL CRUD Operations",

      paragraphs: [
        "The four basic database operations are commonly summarized as CRUD: Create, Read, Update, and Delete."
      ],

      code: {
        language: "sql",
        code: `-- CREATE
INSERT INTO employees
    (employee_id, employee_name, department, salary)
VALUES
    (6, 'Suresh', 'Support', 40000);

-- READ
SELECT *
FROM employees;

-- UPDATE
UPDATE employees
SET salary = 45000
WHERE employee_id = 6;

-- DELETE
DELETE FROM employees
WHERE employee_id = 6;`
      },

      bullets: [
        "INSERT → Create data.",
        "SELECT → Read data.",
        "UPDATE → Modify data.",
        "DELETE → Remove data."
      ]
    },

    {
      id: "spring-boot-relevance",
      title: "23. How These Queries Appear in Spring Boot",

      paragraphs: [
        "In a Spring Boot application, you usually do not write every CRUD SQL statement manually when using Spring Data JPA. Repository methods can generate or execute SQL through the persistence provider.",
        "Understanding SQL is still important because JPA ultimately interacts with the database and SQL knowledge is essential for debugging, performance analysis, custom queries, and interviews."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(String department);

    List<Employee> findBySalaryGreaterThan(BigDecimal salary);
}`
      },

      bullets: [
        "findByDepartment can result in a SQL query filtering by department.",
        "findBySalaryGreaterThan can result in a SQL comparison query.",
        "Spring Data JPA generates the query based on the repository method name.",
        "The exact SQL depends on the entity mapping, database, and JPA provider."
      ]
    },

    {
      id: "postman-api-flow",
      title: "24. SQL Behind a REST API Request",

      paragraphs: [
        "When a React frontend calls a Spring Boot REST API, the backend may eventually execute SQL through JPA or JDBC."
      ],

      code: {
        language: "text",
        code: `React Frontend
      ↓
HTTP GET /api/employees
      ↓
Spring Boot Controller
      ↓
Service Layer
      ↓
Repository
      ↓
JPA / Hibernate
      ↓
SQL
      ↓
MySQL / PostgreSQL
      ↓
Rows
      ↓
Entity / DTO
      ↓
JSON Response
      ↓
React Frontend`
      }
    },

    {
      id: "common-mistakes",
      title: "25. Common Beginner Mistakes",

      bullets: [
        "Forgetting the semicolon in environments that require statement termination.",
        "Using SELECT * when only a few columns are required.",
        "Forgetting WHERE in UPDATE statements.",
        "Forgetting WHERE in DELETE statements.",
        "Using = NULL instead of IS NULL.",
        "Forgetting quotes around string literals.",
        "Using the wrong column name.",
        "Trying to insert a duplicate primary key.",
        "Trying to insert NULL into a NOT NULL column.",
        "Expecting rows to come back in insertion order without ORDER BY.",
        "Using an invalid database-specific syntax.",
        "Running INSERT examples repeatedly and accidentally creating duplicate data where allowed."
      ]
    },

    {
      id: "safe-update-delete",
      title: "26. Be Careful with UPDATE and DELETE",

      paragraphs: [
        "One of the most important beginner SQL rules is to inspect the WHERE condition before executing UPDATE or DELETE.",
        "An UPDATE or DELETE without WHERE can affect every row in the table."
      ],

      code: {
        language: "sql",
        code: `-- Dangerous: may update every employee
UPDATE employees
SET salary = 50000;

-- Safer: updates one employee
UPDATE employees
SET salary = 50000
WHERE employee_id = 1;

-- Dangerous: may delete every employee
DELETE FROM employees;

-- Safer: deletes one employee
DELETE FROM employees
WHERE employee_id = 4;`
      },

      bullets: [
        "Always verify the WHERE condition.",
        "For important production operations, first run a SELECT using the same WHERE condition.",
        "Use transactions where appropriate so mistakes can potentially be rolled back."
      ]
    },

    {
      id: "debugging",
      title: "27. How to Debug a SQL Query",

      paragraphs: [
        "When a query does not produce the expected result, break it into smaller pieces instead of guessing."
      ],

      code: {
        language: "sql",
        code: `-- Step 1: Check the table
SELECT *
FROM employees;

-- Step 2: Test the filter
SELECT *
FROM employees
WHERE department = 'Engineering';

-- Step 3: Add sorting
SELECT *
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;`
      },

      bullets: [
        "Check the table and column names.",
        "Run the simplest SELECT first.",
        "Add WHERE conditions one at a time.",
        "Add ORDER BY after confirming the filter.",
        "Check whether NULL values are involved.",
        "Check the database error message."
      ]
    },

    {
      id: "scenario-interview",
      title: "28. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "How would you find employees whose salary is greater than 60000?",
          answer:
            "I would use SELECT employee_name, salary FROM employees WHERE salary > 60000. If a particular order is required, I would add ORDER BY."
        },
        {
          question:
            "How would you find all employees working in Engineering?",
          answer:
            "I would use SELECT * FROM employees WHERE department = 'Engineering'."
        },
        {
          question:
            "How would you find the highest salary?",
          answer:
            "I would use SELECT MAX(salary) FROM employees."
        },
        {
          question:
            "How would you count employees in each department?",
          answer:
            "I would use SELECT department, COUNT(*) FROM employees GROUP BY department."
        },
        {
          question:
            "How would you retrieve the two highest-paid employees?",
          answer:
            "I would order employees by salary descending and limit the result, for example SELECT * FROM employees ORDER BY salary DESC LIMIT 2 in MySQL or PostgreSQL."
        },
        {
          question:
            "How would you update only Ravi's salary?",
          answer:
            "I would identify Ravi using a stable key such as employee_id and execute UPDATE employees SET salary = 65000 WHERE employee_id = 1."
        },
        {
          question:
            "How would you safely delete one employee?",
          answer:
            "I would use DELETE with a specific WHERE condition based on a stable identifier such as employee_id."
        }
      ]
    },

    {
      id: "interview",
      title: "29. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does SELECT * return?",
          answer:
            "It returns all columns for every row selected by the query. Without WHERE, all rows are selected."
        },
        {
          question: "Why should UPDATE and DELETE usually include WHERE?",
          answer:
            "WHERE limits the affected rows. Without it, UPDATE may change every row and DELETE may remove every row in the table."
        },
        {
          question: "Does SQL guarantee row order?",
          answer:
            "No. Use ORDER BY when a specific result order is required."
        },
        {
          question: "How do you count rows in a table?",
          answer:
            "Use SELECT COUNT(*) FROM table_name to count the rows returned by that query."
        },
        {
          question: "What is the purpose of WHERE?",
          answer:
            "WHERE filters rows based on a condition so that only matching rows participate in the result or modification."
        },
        {
          question: "What is the difference between WHERE and ORDER BY?",
          answer:
            "WHERE filters rows, while ORDER BY sorts the rows in the result."
        },
        {
          question: "What is GROUP BY used for?",
          answer:
            "GROUP BY groups rows with the same values so aggregate functions such as COUNT, SUM, or AVG can be calculated for each group."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(column_name)?",
          answer:
            "COUNT(*) counts rows in the result set. COUNT(column_name) generally counts non-NULL values in that column."
        },
        {
          question: "What is an aggregate function?",
          answer:
            "An aggregate function calculates a result from multiple rows, such as COUNT, SUM, AVG, MIN, or MAX."
        },
        {
          question: "How do you check for NULL?",
          answer:
            "Use IS NULL or IS NOT NULL rather than using = NULL."
        },
        {
          question: "What does INSERT do?",
          answer:
            "INSERT adds new rows to a table."
        },
        {
          question: "What does UPDATE do?",
          answer:
            "UPDATE modifies existing rows that match its condition."
        },
        {
          question: "What does DELETE do?",
          answer:
            "DELETE removes rows that match its condition."
        },
        {
          question: "What is CRUD?",
          answer:
            "CRUD stands for Create, Read, Update, and Delete. In SQL these operations are commonly represented by INSERT, SELECT, UPDATE, and DELETE."
        },
        {
          question: "Why is SELECT * often avoided in production queries?",
          answer:
            "Selecting only required columns makes the query's intent clearer and can reduce unnecessary data transfer and processing."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "30. Quick Revision",

      bullets: [
        "CREATE TABLE → creates table structure.",
        "INSERT → adds rows.",
        "SELECT → reads rows.",
        "WHERE → filters rows.",
        "ORDER BY → sorts results.",
        "LIMIT → restricts returned rows in supported databases.",
        "UPDATE → modifies existing rows.",
        "DELETE → removes rows.",
        "COUNT → counts rows or values depending on the expression.",
        "SUM → calculates a total.",
        "AVG → calculates an average.",
        "MIN → finds the smallest value.",
        "MAX → finds the largest value.",
        "GROUP BY → creates groups for aggregation.",
        "IS NULL → checks for NULL.",
        "AS → creates a query-result alias.",
        "Always use WHERE carefully with UPDATE and DELETE.",
        "Use ORDER BY when result order matters."
      ]
    },

    {
      id: "one-minute-answer",
      title: "31. One-Minute Interview Answer",

      paragraphs: [
        "My first SQL queries usually start with CREATE TABLE to define the structure, INSERT to add records, and SELECT to retrieve data. I use WHERE to filter rows, ORDER BY to sort them, and aggregate functions such as COUNT, SUM, AVG, MIN, and MAX for calculations. UPDATE modifies existing records and DELETE removes records, usually with a WHERE clause to avoid affecting unintended rows. In real applications, these SQL operations are often executed through JDBC, JPA, or Spring Data repositories. Even when using JPA, understanding SQL is important for debugging, database design, and performance."
      ]
    },

    {
      id: "revision-notes",
      title: "32. Revision Notes",

      paragraphs: [
        "Remember the basic SQL learning sequence: create a table, insert data, select data, filter data, sort data, update data, delete data, and then use aggregate functions.",
        "The most important beginner safety rule is to check the WHERE clause before executing UPDATE or DELETE.",
        "The most important SELECT rule is that row order is not guaranteed unless ORDER BY is specified.",
        "The most important NULL rule is to use IS NULL or IS NOT NULL.",
        "The most important aggregation rule is to understand how GROUP BY works with aggregate functions.",
        "These fundamentals form the foundation for later topics such as JOINs, subqueries, indexes, transactions, views, and Spring Data JPA queries."
      ]
    }
  ]
};
