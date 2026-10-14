
export const fetchFirstAndDatabaseDifferences = {
  id: 2028,
  title: "FETCH FIRST and Database Differences",
  slug: "fetch-first-and-database-differences",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Compare row-limiting syntax across MySQL, PostgreSQL, Oracle, and SQL Server, and learn when to use LIMIT or FETCH FIRST.",
  estimatedTime: "20 min",
  sections: [
    {
      id: "fetch-first",
      title: "1. FETCH FIRST",
      paragraphs: [
        "FETCH FIRST restricts the number of rows returned by a SELECT query. It is part of the SQL standard-style row-limiting syntax and is supported by PostgreSQL and Oracle.",
        "For example, FETCH FIRST 3 ROWS ONLY returns at most three rows from the ordered result set.",
        "The ORDER BY clause determines which rows are considered first. Without ORDER BY, the database does not guarantee which rows will be returned.",
        "Do not confuse the FETCH FIRST clause in a SELECT query with the FETCH statement used to retrieve rows from a database cursor. They are different operations."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL and Oracle
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
FETCH FIRST 3 ROWS ONLY;`
      },
      bullets: [
        "FETCH FIRST specifies the maximum number of rows to return.",
        "ROWS ONLY means return no more than the requested number.",
        "ORDER BY salary DESC places the highest salaries first.",
        "employee_id ASC provides a unique tie-breaker if employee_id is unique.",
        "Check the database product and version before using this syntax."
      ]
    },
    {
      id: "limit",
      title: "2. LIMIT in MySQL and PostgreSQL",
      paragraphs: [
        "LIMIT is a widely used row-limiting clause supported by both MySQL and PostgreSQL.",
        "LIMIT 3 returns at most three rows. You can combine LIMIT with OFFSET to skip rows before returning the requested portion.",
        "MySQL and PostgreSQL commonly use LIMIT for pagination. PostgreSQL also supports the FETCH FIRST syntax."
      ],
      code: {
        language: "sql",
        code: `-- Works in MySQL and PostgreSQL
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;

-- Skip the first 10 rows and return up to 10 more
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY employee_id
LIMIT 10 OFFSET 10;`
      },
      bullets: [
        "LIMIT controls the maximum number of returned rows.",
        "OFFSET controls how many rows are skipped.",
        "LIMIT 3 requests at most three rows.",
        "LIMIT 10 OFFSET 10 requests the second page when the page size is ten.",
        "Use a deterministic ORDER BY for predictable results."
      ]
    },
    {
      id: "differences",
      title: "3. Important Database Differences",
      paragraphs: [
        "SQL syntax varies across database products. A query that works in PostgreSQL or Oracle may need to be rewritten for MySQL or SQL Server.",
        "MySQL uses LIMIT for ordinary SELECT row limiting. PostgreSQL supports both LIMIT and FETCH FIRST. Oracle supports FETCH FIRST, while SQL Server uses ORDER BY with OFFSET and FETCH NEXT for this style of pagination.",
        "When migrating an application between databases, review row-limiting syntax, pagination behavior, supported versions, and query execution plans."
      ],
      code: {
        language: "sql",
        code: `-- MySQL
SELECT employee_name
FROM employees
ORDER BY employee_id
LIMIT 3;

-- PostgreSQL
SELECT employee_name
FROM employees
ORDER BY employee_id
FETCH FIRST 3 ROWS ONLY;

-- Oracle
SELECT employee_name
FROM employees
ORDER BY employee_id
FETCH FIRST 3 ROWS ONLY;

-- SQL Server
SELECT employee_name
FROM employees
ORDER BY employee_id
OFFSET 0 ROWS
FETCH NEXT 3 ROWS ONLY;`
      },
      bullets: [
        "MySQL: use LIMIT for SELECT row limiting.",
        "PostgreSQL: supports LIMIT and FETCH FIRST.",
        "Oracle: supports FETCH FIRST row limiting.",
        "SQL Server: use ORDER BY with OFFSET and FETCH NEXT.",
        "SQL syntax and feature support can vary by product version.",
        "ORDER BY is important when a defined row order is required.",
        "Do not assume that all SQL databases support every row-limiting clause."
      ]
    },
    {
      id: "with-ties",
      title: "4. FETCH FIRST WITH TIES",
      paragraphs: [
        "Some databases, including PostgreSQL and Oracle, support WITH TIES with FETCH FIRST. It can return additional rows that tie with the last selected row according to the ORDER BY expressions.",
        "For example, if the third position is shared by two employees with the same salary, FETCH FIRST 3 ROWS WITH TIES can return four rows instead of three.",
        "WITH TIES requires ORDER BY. If the ordering includes a unique employee ID as a tie-breaker, rows with the same salary will no longer tie on the complete ordering."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL and Oracle
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 3 ROWS WITH TIES;`
      },
      bullets: [
        "ONLY returns at most the requested number of rows.",
        "WITH TIES can return more rows when the last position is tied.",
        "The ORDER BY expressions determine whether rows are tied.",
        "WITH TIES is useful when all records tied at the cutoff should be included.",
        "Verify support in the database product and version you use."
      ]
    },
    {
      id: "pagination",
      title: "5. FETCH FIRST with OFFSET",
      paragraphs: [
        "FETCH FIRST can be combined with OFFSET to retrieve a particular portion of an ordered result set in databases that support this syntax.",
        "For example, OFFSET 10 ROWS skips ten rows and FETCH NEXT 10 ROWS ONLY returns up to the next ten rows.",
        "The SQL standard-style syntax uses OFFSET before FETCH. Keep the ORDER BY clause stable to make page navigation predictable."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL and Oracle
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id
OFFSET 10 ROWS
FETCH NEXT 10 ROWS ONLY;`
      },
      bullets: [
        "OFFSET 0 ROWS starts from the first row.",
        "OFFSET 10 ROWS skips ten rows.",
        "FETCH NEXT 10 ROWS ONLY requests up to ten rows after the offset.",
        "Large offsets can be expensive on large datasets.",
        "Consider keyset pagination for efficient sequential navigation through very large result sets."
      ]
    },
    {
      id: "common-mistakes",
      title: "6. Common Mistakes",
      paragraphs: [
        "The most common mistake is assuming that row-limiting syntax is identical across database products. Another is limiting rows without specifying the required ordering.",
        "A query can execute successfully and still return unexpected rows if it relies on an unspecified order."
      ],
      bullets: [
        "Using MySQL LIMIT syntax in a database that expects different syntax.",
        "Assuming MySQL supports FETCH FIRST in a SELECT query.",
        "Forgetting ORDER BY when selecting the top records.",
        "Assuming FETCH FIRST 3 ROWS ONLY always returns exactly three rows; fewer may be available.",
        "Using WITH TIES without understanding which ORDER BY values define a tie.",
        "Ignoring database version compatibility.",
        "Using large OFFSET values without checking query performance.",
        "Testing a query only in one database when the application supports multiple database products."
      ]
    },
    {
      id: "interview",
      title: "7. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does FETCH FIRST do?",
          answer: "FETCH FIRST restricts a query to the first specified number of rows in its ordered result set."
        },
        {
          question: "Is LIMIT supported by MySQL and PostgreSQL?",
          answer: "Yes. Both support LIMIT for restricting query results."
        },
        {
          question: "Does PostgreSQL support FETCH FIRST?",
          answer: "Yes. PostgreSQL supports FETCH FIRST and also supports LIMIT."
        },
        {
          question: "Can I use FETCH FIRST in MySQL?",
          answer: "Use LIMIT for ordinary SELECT row limiting in MySQL. Do not assume MySQL supports the FETCH FIRST ... ROWS ONLY syntax."
        },
        {
          question: "What is the difference between LIMIT and FETCH FIRST?",
          answer: "Both can restrict the number of rows returned. LIMIT is common in MySQL and PostgreSQL, while FETCH FIRST is SQL standard-style syntax supported by databases such as PostgreSQL and Oracle."
        },
        {
          question: "What does OFFSET do?",
          answer: "OFFSET skips a specified number of rows before the database returns the requested portion of the result."
        },
        {
          question: "What is FETCH FIRST WITH TIES?",
          answer: "It returns the requested number of rows plus additional rows tied with the last selected row according to the ORDER BY expressions, where supported."
        },
        {
          question: "Why is ORDER BY important with row limiting?",
          answer: "ORDER BY defines which rows come first. Without it, the database does not guarantee a predictable subset of rows."
        },
        {
          question: "Which syntax does SQL Server use for pagination?",
          answer: "SQL Server commonly uses ORDER BY with OFFSET and FETCH NEXT to skip rows and return the next portion."
        },
        {
          question: "Why does database-specific syntax matter?",
          answer: "SQL dialects and feature support vary. Queries may need changes when an application moves between database products or versions."
        }
      ]
    }
  ]
};
