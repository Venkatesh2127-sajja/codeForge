
export const limitClause = {
  id: 2025,
  title: "LIMIT Clause",
  slug: "limit-clause",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Learn to restrict the number of rows returned by a query, combine LIMIT with ORDER BY and OFFSET, implement pagination, and use limiting in Spring Data JPA.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "introduction",
      title: "1. What Is LIMIT?",
      paragraphs: [
        "LIMIT restricts how many rows a query returns. It is supported by MySQL and PostgreSQL.",
        "LIMIT is commonly combined with ORDER BY to return a meaningful subset of rows, such as the three highest-paid employees or the five cheapest products.",
        "LIMIT controls the maximum number of rows in the result. It does not delete or modify records in the database."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;`
      },
      output: `employee_name | salary
--------------+-------
Kiran         | 70000
Ravi          | 60000
Meena         | 55000`,
      bullets: [
        "ORDER BY salary DESC sorts employees from highest to lowest salary.",
        "employee_id ASC resolves ties between equal salaries.",
        "LIMIT 3 returns at most three rows.",
        "The LIMIT syntax shown here is supported by MySQL and PostgreSQL."
      ]
    },
    {
      id: "limit-without-order",
      title: "2. LIMIT Without ORDER BY",
      paragraphs: [
        "LIMIT without ORDER BY returns at most the requested number of rows, but does not guarantee which rows will be selected.",
        "The selected rows may vary because of indexes, query plans, data changes, or other database operations. Use ORDER BY when the selection must follow a particular rule."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
LIMIT 3;`
      },
      bullets: [
        "The query returns at most three employees.",
        "It does not guarantee the three employees with the highest salary.",
        "It does not guarantee alphabetical order.",
        "Add an appropriate ORDER BY clause when the selection must be predictable."
      ]
    },
    {
      id: "limit-zero",
      title: "3. LIMIT Values",
      paragraphs: [
        "A positive LIMIT value specifies the maximum number of rows to return. LIMIT 0 returns no rows in MySQL and PostgreSQL.",
        "The limit is an upper bound, not a guarantee that exactly that many rows exist or will be returned."
      ],
      code: {
        language: "sql",
        code: `-- Return at most five employees
SELECT employee_id, employee_name
FROM employees
LIMIT 5;

-- Return no rows
SELECT employee_id, employee_name
FROM employees
LIMIT 0;`
      },
      output: `LIMIT 5: At most five rows.
LIMIT 0: An empty result set.`,
      bullets: [
        "LIMIT 5 can return fewer than five rows if fewer matching records exist.",
        "LIMIT 0 returns an empty result set.",
        "Validate any limit value received from an API client."
      ]
    },
    {
      id: "limit-with-where",
      title: "4. LIMIT with WHERE",
      paragraphs: [
        "WHERE filters records, while LIMIT restricts how many of the resulting rows are returned.",
        "Combining WHERE, ORDER BY, and LIMIT is common in real applications because it filters records, ranks the matches, and returns only the required number."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC, employee_id ASC
LIMIT 5;`
      },
      bullets: [
        "WHERE keeps employees earning at least 50000.",
        "ORDER BY sorts the qualifying employees by salary descending.",
        "LIMIT returns at most five qualifying employees.",
        "The unique employee ID provides a deterministic tie-breaker for a given dataset."
      ]
    },
    {
      id: "limit-highest-lowest",
      title: "5. Finding the Highest and Lowest Values",
      paragraphs: [
        "LIMIT is especially useful for top-N queries. Combine it with descending order to find the highest values or ascending order to find the lowest values.",
        "This pattern works for salaries, product prices, examination marks, order totals, and many other ranking requirements."
      ],
      code: {
        language: "sql",
        code: `-- Three highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;

-- Three lowest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary ASC, employee_id ASC
LIMIT 3;`
      },
      bullets: [
        "DESC places higher values first.",
        "ASC places lower values first.",
        "LIMIT 3 returns at most three rows.",
        "If several employees tie at the cutoff, LIMIT may return only some of them.",
        "If all tied rows must be included, consider a ranking function such as RANK or DENSE_RANK."
      ]
    },
    {
      id: "limit-with-multiple-columns",
      title: "6. LIMIT with Multiple-Column Sorting",
      paragraphs: [
        "Multiple-column sorting defines the priority used before LIMIT selects rows.",
        "A unique tie-breaker helps determine which records are selected when primary sorting values are equal."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "Department determines the primary order.",
        "Salary determines the order within each department.",
        "Employee ID resolves ties.",
        "LIMIT returns the first ten rows in that defined order."
      ]
    },
    {
      id: "limit-offset",
      title: "7. LIMIT with OFFSET",
      paragraphs: [
        "OFFSET specifies how many rows to skip before returning the limited result. In MySQL and PostgreSQL, LIMIT and OFFSET are commonly used together for pagination.",
        "The ordering should be deterministic so that rows have a defined sequence before the offset is applied."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "OFFSET 20 skips the first twenty rows.",
        "LIMIT 10 requests up to ten rows after the skipped rows.",
        "If the page size is ten, this commonly represents the third page.",
        "Concurrent inserts, deletes, or updates can shift offset-based page boundaries."
      ]
    },
    {
      id: "pagination-formula",
      title: "8. Understanding the Pagination Formula",
      paragraphs: [
        "For page-based pagination, a common zero-based formula is offset = page number multiplied by page size.",
        "For example, if the page size is ten, page zero starts at offset zero, page one starts at offset ten, and page two starts at offset twenty."
      ],
      code: {
        language: "sql",
        code: `-- Page 1: first ten rows
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;

-- Page 2: next ten rows
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Page 3: next ten rows
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "Page index 0 starts at offset 0.",
        "Page index 1 starts at offset 10 for a page size of 10.",
        "Page index 2 starts at offset 20 for a page size of 10.",
        "Use the same sorting rules consistently across page requests."
      ]
    },
    {
      id: "limit-with-distinct",
      title: "9. LIMIT with DISTINCT",
      paragraphs: [
        "DISTINCT removes duplicate combinations from the selected result columns. LIMIT then restricts the number of distinct rows returned.",
        "Combining DISTINCT with ORDER BY is useful for retrieving a limited list of unique values in a defined order."
      ],
      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
ORDER BY department ASC
LIMIT 5;`
      },
      bullets: [
        "DISTINCT returns each department once.",
        "ORDER BY sorts the department names.",
        "LIMIT returns at most five distinct department values.",
        "The exact result depends on the available department values."
      ]
    },
    {
      id: "limit-with-aggregate",
      title: "10. LIMIT with GROUP BY and Aggregates",
      paragraphs: [
        "LIMIT can restrict grouped results after aggregate calculations and sorting.",
        "For example, a report can identify the three departments with the largest number of employees."
      ],
      code: {
        language: "sql",
        code: `SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC, department ASC
LIMIT 3;`
      },
      bullets: [
        "GROUP BY creates one group per department.",
        "COUNT calculates the number of employees in each department.",
        "ORDER BY sorts departments by employee count.",
        "LIMIT returns the three highest-count groups, or fewer if fewer groups exist."
      ]
    },
    {
      id: "limit-with-join",
      title: "11. LIMIT with JOIN",
      paragraphs: [
        "LIMIT can restrict the result of a query that joins multiple tables.",
        "Use qualified column names when different tables contain columns with the same name. Choose the sorting columns according to the result you want to rank."
      ],
      code: {
        language: "sql",
        code: `SELECT o.order_id, c.customer_name, o.total_amount
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
ORDER BY o.total_amount DESC, o.order_id ASC
LIMIT 5;`
      },
      bullets: [
        "The JOIN combines orders with customer information.",
        "ORDER BY ranks orders by total amount.",
        "Order ID resolves ties.",
        "LIMIT returns at most five orders."
      ]
    },
    {
      id: "limit-with-subquery",
      title: "12. LIMIT in a Subquery",
      paragraphs: [
        "A subquery can use LIMIT to select a limited set of rows before an outer query processes them.",
        "This is useful for tasks such as selecting the top few records and then using them in another calculation. The inner query should have an appropriate ORDER BY when its selected rows depend on ranking."
      ],
      code: {
        language: "sql",
        code: `SELECT top_employees.employee_id,
       top_employees.employee_name,
       top_employees.salary
FROM (
    SELECT employee_id, employee_name, salary
    FROM employees
    ORDER BY salary DESC, employee_id ASC
    LIMIT 3
) AS top_employees
ORDER BY top_employees.salary DESC,
         top_employees.employee_id ASC;`
      },
      bullets: [
        "The inner query selects the three highest-paid employees.",
        "The outer query reads the selected rows.",
        "The outer ORDER BY explicitly defines the final result order.",
        "Subquery and limiting syntax can vary between database systems."
      ]
    },
    {
      id: "limit-vs-fetch",
      title: "13. LIMIT vs FETCH FIRST and TOP",
      paragraphs: [
        "Different database systems provide different ways to limit returned rows. LIMIT is common in MySQL and PostgreSQL, TOP is used by SQL Server, and FETCH FIRST or OFFSET/FETCH is supported by several other database systems.",
        "The underlying goal is similar, but syntax and supported options vary."
      ],
      code: {
        language: "sql",
        code: `-- MySQL / PostgreSQL
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- SQL Server
SELECT TOP 3 employee_name, salary
FROM employees
ORDER BY salary DESC;

-- Standard-style FETCH FIRST syntax
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 3 ROWS ONLY;`
      },
      bullets: [
        "LIMIT is widely used in MySQL and PostgreSQL.",
        "TOP is commonly used in SQL Server.",
        "FETCH FIRST is supported by several SQL systems.",
        "Use the syntax supported by your actual database version."
      ]
    },
    {
      id: "limit-spring-data",
      title: "14. Limiting Results in Spring Data JPA",
      paragraphs: [
        "In Spring Data JPA, derived query methods can limit results using keywords such as First and Top.",
        "This is convenient for fixed requirements, such as retrieving the highest-paid employee. Sorting should be specified when the selected record depends on ranking."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findTop3ByOrderBySalaryDescEmployeeIdAsc();

    List<Employee> findFirst5ByOrderBySalaryAscEmployeeIdAsc();
}`
      },
      bullets: [
        "findTop3ByOrderBySalaryDescEmployeeIdAsc returns at most three employees.",
        "findFirst5ByOrderBySalaryAscEmployeeIdAsc returns at most five employees.",
        "The method names use Java entity property names.",
        "The example assumes Employee contains salary and employeeId properties.",
        "Use Pageable when the client needs to navigate through multiple pages."
      ]
    },
    {
      id: "limit-pageable",
      title: "15. Pagination with Spring Data JPA",
      paragraphs: [
        "Pageable combines page number, page size, and sorting. Spring Data JPA translates these details into database-specific pagination behavior.",
        "This avoids loading all records into application memory when only a single page is required."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public Page<Employee> getEmployeePage(int page, int size) {
    if (page < 0) {
        throw new IllegalArgumentException(
            "Page must be zero or greater"
        );
    }

    if (size < 1 || size > 100) {
        throw new IllegalArgumentException(
            "Page size must be between 1 and 100"
        );
    }

    Pageable pageable = PageRequest.of(
        page,
        size,
        Sort.by(
            Sort.Order.desc("salary"),
            Sort.Order.asc("employeeId")
        )
    );

    return employeeRepository.findAll(pageable);
}`
      },
      bullets: [
        "Page numbers are zero-based in Spring Data.",
        "The example restricts the page size to between 1 and 100.",
        "Sorting is included in the Pageable.",
        "The repository must support findAll(Pageable).",
        "A Page commonly includes pagination metadata and may require a count query."
      ]
    },
    {
      id: "limit-rest-api",
      title: "16. LIMIT and Pagination in a REST API",
      paragraphs: [
        "A REST endpoint can accept page and size parameters so clients can request a limited subset of records.",
        "The backend should validate these parameters and should not allow an unreasonably large page size that could overload the database or application."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/api/employees")
    public Page<Employee> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return employeeService.getEmployeePage(page, size);
    }
}`
      },
      bullets: [
        "A request such as /api/employees?page=0&size=10 requests the first page.",
        "The controller delegates pagination to the service.",
        "The service validates page and size before querying the repository.",
        "In production, consider returning a DTO instead of exposing persistence entities directly."
      ]
    },
    {
      id: "keyset-pagination",
      title: "17. LIMIT and Keyset Pagination",
      paragraphs: [
        "Offset pagination is straightforward, but large OFFSET values may require the database to process or skip many rows.",
        "Keyset pagination retrieves the next batch relative to the last row returned. It can be more efficient for large datasets when the cursor columns and indexes are suitable."
      ],
      code: {
        language: "sql",
        code: `-- Assume the previous page ended at employee_id 100
SELECT employee_id, employee_name
FROM employees
WHERE employee_id > 100
ORDER BY employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "The query requests rows with IDs greater than 100.",
        "The next ten IDs are returned in ascending order.",
        "The example assumes employee_id is unique and ordered appropriately.",
        "For complex sorting, the cursor condition must match the complete sorting order.",
        "Keyset pagination avoids skipping a large offset but does not automatically provide a snapshot of changing data."
      ]
    },
    {
      id: "performance",
      title: "18. LIMIT Performance Considerations",
      paragraphs: [
        "LIMIT can reduce the amount of data returned to the application, but it does not guarantee that the database processes only that many rows internally.",
        "For example, the database may still need to examine and sort many rows before determining the top ten. Suitable indexes and query plans can help certain queries."
      ],
      bullets: [
        "Use ORDER BY and LIMIT together when retrieving a ranked subset.",
        "Inspect query plans for slow top-N queries.",
        "An appropriate index may help the database satisfy filtering and ordering efficiently.",
        "Large OFFSET values can be expensive.",
        "Avoid SELECT * when the application needs only a few columns.",
        "Choose page-size limits appropriate for the API workload.",
        "Indexes use storage and add write overhead.",
        "Consider keyset pagination for large datasets and feed-style interfaces."
      ]
    },
    {
      id: "common-mistakes",
      title: "19. Common LIMIT Mistakes",
      bullets: [
        "Using LIMIT without ORDER BY when particular records must be selected.",
        "Assuming LIMIT guarantees exactly the requested number of rows.",
        "Forgetting that LIMIT 0 returns no rows.",
        "Using the wrong database's pagination syntax.",
        "Using a non-deterministic sort when the selected top-N records must be predictable.",
        "Ignoring ties at the LIMIT boundary.",
        "Allowing API clients to request extremely large page sizes.",
        "Using a large OFFSET without evaluating query performance.",
        "Assuming LIMIT alone guarantees a fast query.",
        "Assuming offset-based pagination cannot shift when data changes."
      ]
    },
    {
      id: "best-practices",
      title: "20. LIMIT Best Practices",
      bullets: [
        "Use ORDER BY when the selection depends on ranking or sequence.",
        "Add a unique tie-breaker when deterministic selection is required.",
        "Validate limits and page sizes received from clients.",
        "Select only the columns the application needs.",
        "Use LIMIT for top-N queries in supported databases.",
        "Use Pageable for Spring Data JPA pagination.",
        "Inspect execution plans for slow limited queries.",
        "Consider keyset pagination for large datasets.",
        "Understand whether the requirement is to return a fixed number of rows or all rows tied at a ranking boundary.",
        "Check the exact syntax and behavior of the target database."
      ]
    },
    {
      id: "practice-exercises",
      title: "21. Practice Exercises",
      paragraphs: [
        "Assume you have employees(employee_id, employee_name, salary, department), products(product_id, product_name, price), and orders(order_id, order_date, total_amount)."
      ],
      bullets: [
        "Exercise 1: Return the five highest-paid employees.",
        "Exercise 2: Return the three cheapest products.",
        "Exercise 3: Return the five newest orders.",
        "Exercise 4: Return ten employees starting from the eleventh row.",
        "Exercise 5: Return the top three departments by employee count.",
        "Exercise 6: Return the three largest orders.",
        "Exercise 7: Explain why LIMIT without ORDER BY cannot guarantee the highest-paid employees.",
        "Exercise 8: Explain one advantage and one limitation of keyset pagination."
      ]
    },
    {
      id: "practice-solutions",
      title: "22. Practice Exercise Solutions",
      code: {
        language: "sql",
        code: `-- Exercise 1: Five highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 5;

-- Exercise 2: Three cheapest products
SELECT product_id, product_name, price
FROM products
ORDER BY price ASC, product_id ASC
LIMIT 3;

-- Exercise 3: Five newest orders
SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 5;

-- Exercise 4: Ten employees starting from the eleventh row
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Exercise 5: Top three departments by employee count
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
ORDER BY employee_count DESC, department ASC
LIMIT 3;

-- Exercise 6: Three largest orders
SELECT order_id, total_amount
FROM orders
ORDER BY total_amount DESC, order_id ASC
LIMIT 3;`
      },
      bullets: [
        "The examples use MySQL/PostgreSQL LIMIT syntax.",
        "Each ranking query includes a secondary key for deterministic ordering.",
        "Exercise 4 uses OFFSET 10 because ten rows are skipped before returning the next ten.",
        "The department query limits grouped results rather than individual employee rows."
      ]
    },
    {
      id: "debugging",
      title: "23. Debugging LIMIT and Pagination",
      paragraphs: [
        "When a limited query returns unexpected rows, inspect the sorting, filtering, row limit, offset, and data changes between requests."
      ],
      bullets: [
        "Check whether the intended ORDER BY is present.",
        "Verify that ASC and DESC are correct.",
        "Check for ties and add a unique tie-breaker.",
        "Verify the LIMIT and OFFSET values.",
        "Confirm that the SQL syntax matches the database.",
        "Check page-index conventions: SQL OFFSET counts rows, while Spring Data page indexes start at zero.",
        "Validate API page-size boundaries.",
        "Inspect execution plans when the query is slow.",
        "Consider keyset pagination if large offsets are a performance problem."
      ]
    },
    {
      id: "scenario-interview",
      title: "24. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question: "A dashboard must display the three highest-paid employees. What query would you write?",
          answer: "Use ORDER BY salary DESC with LIMIT 3 in MySQL or PostgreSQL. Add a unique tie-breaker such as employee_id for deterministic selection."
        },
        {
          question: "A query uses LIMIT 10 but returns unexpected employees. What would you check?",
          answer: "Check the ORDER BY clause, filters, and whether a unique tie-breaker is present. Without an appropriate order, LIMIT does not identify the highest-ranked records."
        },
        {
          question: "Why can a query with LIMIT still be slow?",
          answer: "The database may still need to scan, filter, or sort many rows before returning the limited result. Inspect the execution plan and indexes."
        },
        {
          question: "Why do records shift between pages?",
          answer: "Offset-based pagination can shift when records are inserted, deleted, or updated between requests. A deterministic sort helps, while keyset pagination can reduce some of these problems."
        },
        {
          question: "How do you implement LIMIT-style pagination in Spring Data JPA?",
          answer: "Use Pageable and PageRequest with a page index, size, and sorting. Validate the page size and use repository methods that support pagination."
        },
        {
          question: "How can you retrieve all employees tied for the third-highest salary?",
          answer: "Use a ranking function such as DENSE_RANK over salary descending and filter for rank 3. LIMIT 3 returns at most three rows, not necessarily every employee tied at a ranking boundary."
        }
      ]
    },
    {
      id: "interview",
      title: "25. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does LIMIT do?",
          answer: "LIMIT restricts the maximum number of rows returned by a query in MySQL and PostgreSQL."
        },
        {
          question: "How do you find the three highest-paid employees?",
          answer: "Use ORDER BY salary DESC LIMIT 3. Add a unique secondary sort column if deterministic ordering is required."
        },
        {
          question: "Does LIMIT guarantee which rows are returned?",
          answer: "Not without an appropriate ORDER BY clause."
        },
        {
          question: "What does LIMIT 0 do?",
          answer: "In MySQL and PostgreSQL, LIMIT 0 returns an empty result set."
        },
        {
          question: "What is OFFSET?",
          answer: "OFFSET specifies how many rows to skip before returning the limited result."
        },
        {
          question: "What is the difference between LIMIT and OFFSET?",
          answer: "LIMIT controls the maximum number of returned rows, while OFFSET skips rows before the result begins."
        },
        {
          question: "Can LIMIT be used with GROUP BY?",
          answer: "Yes. It can restrict grouped results after aggregation and ordering."
        },
        {
          question: "Does LIMIT always improve performance?",
          answer: "Not necessarily. The database may still need to scan or sort many rows before producing the limited result."
        },
        {
          question: "What is keyset pagination?",
          answer: "Keyset pagination retrieves the next batch using the last row's sort values instead of skipping a large number of rows with OFFSET."
        },
        {
          question: "How does Spring Data JPA implement pagination?",
          answer: "It uses Pageable and PageRequest to pass page number, page size, and optional sorting to repository methods."
        },
        {
          question: "What is the difference between LIMIT and TOP?",
          answer: "Both can limit returned rows, but LIMIT is used in MySQL and PostgreSQL while TOP is commonly used in SQL Server."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "26. Quick Reference",
      bullets: [
        "Limit rows: SELECT ... LIMIT 5",
        "Highest salaries: ORDER BY salary DESC LIMIT 3",
        "Lowest prices: ORDER BY price ASC LIMIT 3",
        "Skip rows: LIMIT 10 OFFSET 20",
        "Top departments: GROUP BY department ORDER BY COUNT(*) DESC LIMIT 3",
        "Deterministic ranking: include a unique tie-breaker.",
        "Spring Data JPA: PageRequest.of(page, size, sort)",
        "SQL Server: TOP or supported OFFSET/FETCH syntax.",
        "Keyset pagination: filter relative to the last returned sort key."
      ]
    },
    {
      id: "one-minute-answer",
      title: "27. Explain LIMIT in One Minute",
      paragraphs: [
        "LIMIT restricts the maximum number of rows returned by a query in MySQL and PostgreSQL. It is commonly combined with ORDER BY to retrieve top-N results, such as the three highest-paid employees. OFFSET can skip rows and is often used with LIMIT for pagination. For predictable results, we should use an appropriate ORDER BY clause and a unique tie-breaker. In Spring Data JPA, Pageable and PageRequest provide pagination support. For large datasets, keyset pagination can be more efficient than skipping a large OFFSET, depending on the query and indexes."
      ]
    },
    {
      id: "revision-notes",
      title: "28. Revision Notes",
      bullets: [
        "LIMIT specifies the maximum number of returned rows.",
        "LIMIT 0 returns no rows in MySQL and PostgreSQL.",
        "LIMIT without ORDER BY does not guarantee which rows are selected.",
        "ORDER BY and LIMIT are commonly used together for top-N queries.",
        "OFFSET skips rows before returning the limited result.",
        "A unique tie-breaker helps make ranking deterministic.",
        "LIMIT may still require substantial scanning or sorting.",
        "Spring Data JPA uses Pageable and PageRequest for pagination.",
        "Keyset pagination can help with large datasets.",
        "Database-specific syntax should be checked before using LIMIT in a different SQL system."
      ]
    }
  ]
};
