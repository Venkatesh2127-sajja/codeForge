
export const sortingWithExpressions = {
  id: 2024,
  title: "Sorting with Expressions",
  slug: "sorting-with-expressions",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Learn to sort SQL results using calculated expressions, aliases, functions, conditional expressions, and practical Spring Data JPA examples.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "expressions",
      title: "1. Sorting with Expressions",
      paragraphs: [
        "ORDER BY can sort results using expressions instead of only column names. This is useful when the required order depends on a calculated value.",
        "For example, an employee's annual salary can be calculated from monthly salary and used as a sort expression.",
        "The calculation is performed as part of the query. It does not update or permanently modify the stored salary values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees
ORDER BY salary * 12 DESC;`
      },
      bullets: [
        "The expression salary * 12 calculates annual salary.",
        "DESC places larger calculated values first.",
        "The expression does not modify stored salary values.",
        "The calculation assumes salary represents a monthly amount."
      ]
    },
    {
      id: "alias",
      title: "2. Sorting by an Alias",
      paragraphs: [
        "A SELECT expression can have an alias that provides a readable name for its calculated result.",
        "MySQL and PostgreSQL generally allow a SELECT-list alias to be referenced in ORDER BY. This makes the query easier to read and avoids repeating the expression."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      },
      bullets: [
        "annual_salary is an alias for salary * 12.",
        "The query sorts by the calculated annual salary.",
        "Aliases in ORDER BY are supported by MySQL and PostgreSQL.",
        "Alias rules can differ across SQL clauses, so do not assume a SELECT alias is available in WHERE."
      ]
    },
    {
      id: "multiple-expressions",
      title: "3. Sorting with Multiple Expressions",
      paragraphs: [
        "ORDER BY can contain multiple expressions. The first expression determines the primary order, while later expressions resolve ties.",
        "This query sorts employees by annual salary first and employee name second. The second expression determines the order when annual salaries are equal."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    salary,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_name ASC,
         employee_id ASC;`
      },
      bullets: [
        "Annual salary is the primary sort expression.",
        "Employee name sorts employees with equal annual salaries.",
        "Employee ID provides a final tie-breaker when names are also equal.",
        "A unique tie-breaker helps produce deterministic ordering for a given dataset."
      ]
    },
    {
      id: "arithmetic-expressions",
      title: "4. Sorting with Arithmetic Expressions",
      paragraphs: [
        "Arithmetic expressions such as addition, subtraction, multiplication, and division can be used in ORDER BY.",
        "For example, an e-commerce application can calculate a discounted price and sort products from cheapest to most expensive after applying the discount."
      ],
      code: {
        language: "sql",
        code: `SELECT
    product_name,
    price,
    price * 0.90 AS discounted_price
FROM products
ORDER BY discounted_price ASC, product_name ASC;`
      },
      bullets: [
        "price * 0.90 calculates a price after a 10% discount.",
        "ASC sorts the discounted price from lowest to highest.",
        "product_name resolves ties between equal discounted prices.",
        "The calculation does not change the stored product price."
      ]
    },
    {
      id: "function-expressions",
      title: "5. Sorting with SQL Functions",
      paragraphs: [
        "SQL functions can be used in sorting expressions. For example, LOWER can normalize text case for sorting, and date or numeric functions can calculate values used for ordering.",
        "Function availability and exact behavior depend on the database system."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
ORDER BY LOWER(employee_name) ASC, employee_id ASC;`
      },
      bullets: [
        "LOWER converts text to lowercase for the sorting expression.",
        "The expression can help produce case-normalized sorting.",
        "Collation and language-specific ordering rules may still affect the result.",
        "A function applied to a column can affect whether an ordinary index can satisfy the sort efficiently."
      ]
    },
    {
      id: "case-expression",
      title: "6. Sorting with CASE Expressions",
      paragraphs: [
        "CASE allows SQL to apply custom sorting rules based on business requirements.",
        "For example, a support system may need to display urgent tickets first, followed by high, medium, and low priority tickets. Alphabetical sorting would not necessarily produce that order."
      ],
      code: {
        language: "sql",
        code: `SELECT ticket_id, title, priority
FROM support_tickets
ORDER BY
    CASE priority
        WHEN 'URGENT' THEN 1
        WHEN 'HIGH' THEN 2
        WHEN 'MEDIUM' THEN 3
        WHEN 'LOW' THEN 4
        ELSE 5
    END ASC,
    ticket_id ASC;`
      },
      bullets: [
        "CASE maps each priority to a numeric rank.",
        "URGENT receives the highest sorting priority because it has rank 1.",
        "The ticket ID provides a secondary order.",
        "The mapping should reflect the actual business rules."
      ]
    },
    {
      id: "null-expression",
      title: "7. Sorting with NULL-Handling Expressions",
      paragraphs: [
        "NULL represents missing or unknown data. If an application needs missing values to appear last, a sorting expression can explicitly control their position.",
        "The following MySQL example places employees with known commission values first, followed by employees whose commission is NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, commission
FROM employees
ORDER BY commission IS NULL ASC,
         commission ASC,
         employee_id ASC;`
      },
      bullets: [
        "In MySQL, commission IS NULL evaluates to 0 for non-NULL values and 1 for NULL values.",
        "ASC therefore places non-NULL commissions first.",
        "The second expression sorts the known commission values in ascending order.",
        "The employee ID resolves ties.",
        "For PostgreSQL, ORDER BY commission ASC NULLS LAST is another option."
      ]
    },
    {
      id: "date-expressions",
      title: "8. Sorting with Date Expressions",
      paragraphs: [
        "Date and timestamp expressions can help sort records according to a calculated date or time value.",
        "For example, an application can sort orders by the number of days since an order was created. Date arithmetic syntax differs between databases, so use the appropriate syntax for your SQL dialect."
      ],
      code: {
        language: "sql",
        code: `-- MySQL example: newest orders first
SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC;`
      },
      bullets: [
        "A date or timestamp column can be sorted directly.",
        "DESC places later dates first.",
        "A unique secondary key resolves equal timestamps.",
        "Use database-specific date functions when sorting by calculated date differences."
      ]
    },
    {
      id: "expression-filtering",
      title: "9. Sorting Calculated Values with WHERE",
      paragraphs: [
        "WHERE filters rows, and ORDER BY sorts the rows that remain.",
        "If a calculation is used for both filtering and sorting, the expression may need to appear more than once, depending on the database and query structure."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    salary * 12 AS annual_salary
FROM employees
WHERE salary * 12 >= 600000
ORDER BY annual_salary DESC, employee_id ASC;`
      },
      bullets: [
        "WHERE filters employees whose calculated annual salary is at least 600000.",
        "ORDER BY sorts the qualifying employees by annual salary.",
        "The query assumes salary is a monthly salary.",
        "A SELECT alias generally cannot be referenced directly in WHERE in MySQL or PostgreSQL."
      ]
    },
    {
      id: "aggregate-expressions",
      title: "10. Sorting Aggregate Expressions",
      paragraphs: [
        "Aggregate functions such as COUNT, SUM, AVG, MIN, and MAX can be used in sorting grouped results.",
        "This is useful for ranking departments by employee count, products by total sales, or categories by average price."
      ],
      code: {
        language: "sql",
        code: `SELECT
    department,
    AVG(salary) AS average_salary,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY AVG(salary) DESC, employee_count DESC,
         department ASC;`
      },
      bullets: [
        "GROUP BY creates one group for each department.",
        "AVG calculates the average salary for each group.",
        "The average salary determines the primary order.",
        "Employee count and department name provide additional sorting levels."
      ]
    },
    {
      id: "expression-vs-column",
      title: "11. Sorting by a Column vs an Expression",
      paragraphs: [
        "Sorting by a column uses its stored value directly. Sorting by an expression calculates a value for each row and orders the results using that calculation.",
        "Both approaches are useful, but expressions can require additional computation and may affect index usage."
      ],
      code: {
        language: "sql",
        code: `-- Sort by stored salary
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;

-- Sort by calculated annual salary
SELECT employee_name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      },
      bullets: [
        "The first query sorts directly by salary.",
        "The second query sorts by salary multiplied by 12.",
        "If every salary is multiplied by the same positive constant, the relative numeric order remains the same.",
        "More complex expressions can change the ordering compared with the original column."
      ]
    },
    {
      id: "limit-expressions",
      title: "12. Sorting Expressions with LIMIT",
      paragraphs: [
        "LIMIT can be combined with an expression-based ORDER BY to return only the first few rows according to a calculated ranking.",
        "This is useful for top-N reports such as the most expensive discounted products or employees with the highest annual salary."
      ],
      code: {
        language: "sql",
        code: `SELECT
    product_id,
    product_name,
    price * 0.90 AS discounted_price
FROM products
ORDER BY discounted_price ASC, product_id ASC
LIMIT 5;`
      },
      bullets: [
        "The query calculates a discounted price.",
        "ASC places the lowest discounted prices first.",
        "Product ID resolves ties.",
        "LIMIT 5 returns at most five products in MySQL and PostgreSQL."
      ]
    },
    {
      id: "pagination-expressions",
      title: "13. Sorting Expressions with Pagination",
      paragraphs: [
        "Pagination can use calculated expressions for ordering, but the ordering should be deterministic.",
        "When an expression produces equal values for multiple rows, add a unique column as a tie-breaker so the result has a defined order for a given dataset."
      ],
      code: {
        language: "sql",
        code: `SELECT
    employee_id,
    employee_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_id ASC
LIMIT 10 OFFSET 10;`
      },
      bullets: [
        "The query orders employees by annual salary descending.",
        "Employee ID resolves equal annual salary values.",
        "LIMIT 10 requests up to ten rows.",
        "OFFSET 10 skips the first ten rows in the ordered result.",
        "Concurrent data changes can still affect offset-based pagination."
      ]
    },
    {
      id: "performance",
      title: "14. Performance Considerations",
      paragraphs: [
        "Sorting by expressions may require the database to calculate a value for many rows before ordering them.",
        "A normal index on the original column may not always satisfy an ORDER BY that applies a function or complex expression. Some databases support expression indexes or generated columns that can help specific query patterns.",
        "The correct optimization depends on the database, expression, filters, and execution plan."
      ],
      bullets: [
        "Prefer a direct column sort when it satisfies the requirement.",
        "Avoid unnecessary expensive functions in large sorting queries.",
        "Use EXPLAIN or the database's execution-plan tools to investigate slow queries.",
        "Evaluate expression indexes or generated columns only when supported and justified by the workload.",
        "Indexes consume storage and add work to inserts, updates, and deletes.",
        "Do not assume that every calculated ORDER BY requires a new index."
      ]
    },
    {
      id: "spring-data-jpa",
      title: "15. Sorting Expressions in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA supports ordinary property-based sorting through Sort. However, arbitrary SQL expressions are not always accepted as normal entity property names.",
        "For a calculated database expression, you can use a suitable JPQL query, a native query, or calculate and sort the value in application code when the dataset is small and already loaded.",
        "Choose the approach based on query complexity, database portability, and how much data must be processed."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository
        extends Repository<Employee, Long> {

    @Query("""
        SELECT e
        FROM Employee e
        WHERE e.salary >= :minimumSalary
        ORDER BY e.salary DESC, e.employeeId ASC
        """)
    List<Employee> findEmployeesBySalary(
        @Param("minimumSalary") double minimumSalary
    );
}`
      },
      bullets: [
        "JPQL uses entity names and Java entity property names.",
        "The example sorts by a stored entity property rather than an arbitrary SQL expression.",
        "For calculated projections, a JPQL constructor expression or a native query may be appropriate.",
        "Avoid loading a very large dataset into Java solely to sort it in memory.",
        "The repository must be compatible with the declared query and entity model."
      ]
    },
    {
      id: "common-mistakes",
      title: "16. Common Mistakes",
      bullets: [
        "Assuming a SELECT alias can be used in every SQL clause.",
        "Using an incorrect expression or incompatible data types.",
        "Forgetting that expressions are evaluated according to the database's type and arithmetic rules.",
        "Assuming a calculated sort changes stored values.",
        "Sorting by an expression without a tie-breaker when deterministic ordering is required.",
        "Assuming all databases support identical date and NULL-handling syntax.",
        "Using a function on a column without considering performance.",
        "Passing arbitrary client-provided SQL expressions into dynamic query construction.",
        "Assuming a normal index always satisfies an expression-based sort.",
        "Using Java-side sorting on a very large result set unnecessarily."
      ]
    },
    {
      id: "best-practices",
      title: "17. Best Practices",
      bullets: [
        "Use clear aliases for calculated values.",
        "Prefer readable expressions and explicit sort directions.",
        "Add a unique tie-breaker when stable ordering matters.",
        "Verify alias and expression support for your database dialect.",
        "Use appropriate numeric and date/time data types.",
        "Validate dynamic sorting fields and avoid raw SQL concatenation.",
        "Use query execution plans before optimizing sorting performance.",
        "Consider database-side sorting for large datasets.",
        "Use Spring Data JPA Sort for entity properties and suitable queries for calculated expressions.",
        "Document business-specific CASE sorting rules."
      ]
    },
    {
      id: "practice-exercises",
      title: "18. Practice Exercises",
      paragraphs: [
        "Assume you have employees(employee_id, employee_name, salary, department), products(product_id, product_name, price), and support_tickets(ticket_id, title, priority)."
      ],
      bullets: [
        "Exercise 1: Calculate annual salary and sort employees from highest to lowest.",
        "Exercise 2: Sort products by price after a 15% discount.",
        "Exercise 3: Sort employees by annual salary and then employee name.",
        "Exercise 4: Display urgent support tickets before high, medium, and low priority tickets.",
        "Exercise 5: Sort departments by average salary descending.",
        "Exercise 6: Display the five cheapest products after a 10% discount.",
        "Exercise 7: Place NULL commission values last in MySQL.",
        "Exercise 8: Explain why an expression-based sort might be slower than sorting by an indexed column."
      ]
    },
    {
      id: "practice-solutions",
      title: "19. Practice Exercise Solutions",
      code: {
        language: "sql",
        code: `-- Exercise 1: Highest annual salary first
SELECT employee_id, employee_name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_id ASC;

-- Exercise 2: Price after a 15% discount
SELECT product_id, product_name, price,
       price * 0.85 AS discounted_price
FROM products
ORDER BY discounted_price ASC, product_id ASC;

-- Exercise 3: Annual salary, then employee name
SELECT employee_id, employee_name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_name ASC,
         employee_id ASC;

-- Exercise 4: Custom ticket priority
SELECT ticket_id, title, priority
FROM support_tickets
ORDER BY
    CASE priority
        WHEN 'URGENT' THEN 1
        WHEN 'HIGH' THEN 2
        WHEN 'MEDIUM' THEN 3
        WHEN 'LOW' THEN 4
        ELSE 5
    END ASC,
    ticket_id ASC;

-- Exercise 5: Average salary by department
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;

-- Exercise 6: Five cheapest products after a 10% discount
SELECT product_id, product_name, price * 0.90 AS discounted_price
FROM products
ORDER BY discounted_price ASC, product_id ASC
LIMIT 5;

-- Exercise 7: NULL commissions last in MySQL
SELECT employee_id, employee_name, commission
FROM employees
ORDER BY commission IS NULL ASC, commission ASC,
         employee_id ASC;`
      },
      bullets: [
        "The LIMIT example uses MySQL/PostgreSQL syntax.",
        "The examples assume the listed tables and columns exist.",
        "The MySQL NULL expression places known commission values before NULL values.",
        "The unique IDs provide tie-breakers where appropriate.",
        "The CASE expression defines a custom business priority."
      ]
    },
    {
      id: "debugging",
      title: "20. Debugging Expression-Based Sorting",
      paragraphs: [
        "When expression-based sorting returns unexpected results, inspect the expression, data types, alias, direction, NULL behavior, and tie-breaker.",
        "If the query is slow, inspect the execution plan and compare the cost of sorting by the expression with sorting by the underlying column."
      ],
      bullets: [
        "Confirm that the expression calculates the intended value.",
        "Check whether the alias is valid in the relevant SQL clause.",
        "Verify arithmetic precision and data types.",
        "Check how NULL values are ordered.",
        "Add a unique tie-breaker if necessary.",
        "Verify SQL syntax for the database being used.",
        "For Spring Data JPA, distinguish entity property sorting from arbitrary SQL expression sorting.",
        "Use EXPLAIN or an equivalent tool to investigate performance."
      ]
    },
    {
      id: "scenario-interview",
      title: "21. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question: "An application must show employees with the highest annual salary first. How would you write the query?",
          answer: "Calculate salary * 12 and sort by that expression descending. If rows may have equal annual salaries, add a unique tie-breaker such as employee_id."
        },
        {
          question: "How would you sort products by their discounted price without updating the table?",
          answer: "Calculate the discounted price in the SELECT expression and sort by that expression or its supported alias. This changes the result order, not the stored price."
        },
        {
          question: "How would you display urgent tickets before low-priority tickets?",
          answer: "Use a CASE expression in ORDER BY to assign each priority a numeric rank, then sort by the rank and a unique ticket ID."
        },
        {
          question: "A calculated ORDER BY query is slow. What would you investigate?",
          answer: "Inspect the execution plan, number of rows, expression cost, and available indexes. Consider an expression index or generated column if the database supports it and the workload justifies it."
        },
        {
          question: "Can Spring Data JPA Sort directly sort by any SQL expression?",
          answer: "Not as an ordinary entity property in every situation. For calculated expressions, use an appropriate JPQL projection, native query, or another supported query approach."
        }
      ]
    },
    {
      id: "interview",
      title: "22. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can ORDER BY use an expression?",
          answer: "Yes. ORDER BY can sort using expressions such as salary * 12, price * 0.90, or a CASE expression."
        },
        {
          question: "Can ORDER BY use a SELECT alias?",
          answer: "MySQL and PostgreSQL generally allow SELECT-list aliases in ORDER BY. Alias support varies by clause and database."
        },
        {
          question: "Does sorting by a calculated value change the database?",
          answer: "No. Sorting changes the order of query results, not the stored values."
        },
        {
          question: "What is an expression in SQL?",
          answer: "An expression combines columns, literals, operators, and supported functions to produce a value."
        },
        {
          question: "Can CASE be used inside ORDER BY?",
          answer: "Yes. CASE can assign custom sorting ranks based on business rules."
        },
        {
          question: "Why use an alias for a calculated column?",
          answer: "An alias provides a readable name for a calculated result and can make the query easier to understand."
        },
        {
          question: "Can aggregate functions be used for sorting?",
          answer: "Yes. After grouping, aggregate expressions such as AVG(salary) or COUNT(*) can be used to sort groups."
        },
        {
          question: "Why can sorting by a function be slower?",
          answer: "The database may need to calculate the expression for many rows and may not be able to use an ordinary index to satisfy the sort."
        },
        {
          question: "How can expression-based sorting be optimized?",
          answer: "Inspect the query plan and consider a suitable expression index or generated column when supported and justified."
        },
        {
          question: "How do you sort calculated values in Spring Data JPA?",
          answer: "Use a suitable JPQL query, projection, or native query. Standard Sort properties generally refer to entity properties rather than arbitrary SQL expressions."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "23. Quick Reference",
      bullets: [
        "Arithmetic expression: ORDER BY salary * 12 DESC",
        "Alias: ORDER BY annual_salary DESC",
        "Multiple expressions: ORDER BY annual_salary DESC, employee_name ASC",
        "Custom priority: ORDER BY CASE ... END ASC",
        "NULL values last in MySQL: ORDER BY commission IS NULL ASC, commission ASC",
        "Aggregate sorting: GROUP BY department ORDER BY AVG(salary) DESC",
        "Top five: ORDER BY discounted_price ASC LIMIT 5",
        "Stable sorting: add a unique tie-breaker.",
        "Spring Data JPA: use Sort for entity properties and suitable queries for calculated expressions."
      ]
    },
    {
      id: "one-minute-answer",
      title: "24. Explain Sorting with Expressions in One Minute",
      paragraphs: [
        "SQL allows ORDER BY to sort rows using expressions instead of only stored columns. For example, ORDER BY salary * 12 DESC sorts employees by calculated annual salary. We can also use aliases, arithmetic operations, SQL functions, CASE expressions, and aggregate values. These calculations affect query results, not the stored data. For deterministic ordering, especially with pagination, we should add a unique tie-breaker. In Spring Data JPA, ordinary entity properties can be sorted using Sort, while calculated expressions may require JPQL projections or native queries. For performance, we should inspect the execution plan before adding indexes or changing the query."
      ]
    },
    {
      id: "revision-notes",
      title: "25. Revision Notes",
      bullets: [
        "ORDER BY can sort using columns, expressions, functions, and supported aliases.",
        "Arithmetic expressions can calculate values used for sorting.",
        "CASE supports custom business sorting rules.",
        "Aggregate expressions can sort grouped results.",
        "Sorting does not modify stored values.",
        "Alias rules differ between SQL clauses and database systems.",
        "Expression-based sorting can affect index usage and performance.",
        "Use a unique tie-breaker for deterministic ordering.",
        "Spring Data JPA Sort normally uses entity property names.",
        "Use appropriate JPQL or native queries for database-calculated expressions."
      ]
    }
  ]
};
