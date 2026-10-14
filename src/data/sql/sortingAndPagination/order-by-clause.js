
export const orderByClause = {
  id: 2021,
  title: "ORDER BY Clause",
  slug: "order-by-clause",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Learn how ORDER BY sorts SQL query results, including ascending and descending order, multiple columns, NULL values, pagination, and practical Spring Boot examples.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "introduction",
      title: "1. What Is ORDER BY?",
      paragraphs: [
        "ORDER BY is an SQL clause used to sort the rows returned by a query according to one or more columns or expressions.",
        "Without ORDER BY, the database does not guarantee the order of returned rows. The order may change depending on the query plan, indexes, database operations, or changes to the data.",
        "ORDER BY changes the order of the query results, not the way records are physically stored in the table."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary;`
      },
      output: `employee_name | salary
--------------+-------
Arun          | 40000
Priya         | 45000
Anu           | 50000
Meena         | 55000
Ravi          | 60000
Kiran         | 70000`,
      bullets: [
        "ORDER BY is normally written after WHERE, GROUP BY, and HAVING.",
        "It can sort by one column or multiple columns.",
        "ASC means ascending; DESC means descending.",
        "Use ORDER BY when the application requires a predictable result order."
      ]
    },
    {
      id: "ascending",
      title: "2. Default Sorting",
      paragraphs: [
        "When no direction is specified, ORDER BY uses ascending order by default.",
        "For numeric values, ascending order places smaller values before larger values. For text, the ordering depends on the database's comparison and collation rules."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary ASC;`
      },
      bullets: [
        "ASC explicitly means ascending order.",
        "Numbers generally appear from smallest to largest.",
        "Dates generally appear from earliest to latest.",
        "Text ordering can depend on case sensitivity, collation, and language-specific rules."
      ]
    },
    {
      id: "descending",
      title: "3. Descending Sorting",
      paragraphs: [
        "DESC sorts values in descending order. For numbers, the largest value appears first. For dates, the latest date appears first.",
        "Descending sorting is useful for ranking employees by salary, displaying newest orders, or showing the most expensive products."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;`
      },
      bullets: [
        "DESC means descending order.",
        "For numbers, values move from largest to smallest.",
        "For dates, values generally move from newest to oldest.",
        "Use DESC for highest salary, newest order, or most recent activity reports."
      ]
    },
    {
      id: "practical",
      title: "4. Practical Example",
      paragraphs: [
        "Imagine an e-commerce application that must display the most expensive products first. The backend can sort the results using ORDER BY price DESC before returning them to the frontend.",
        "The same idea works for employee salary reports, customer lists, order history, and product catalogs."
      ],
      code: {
        language: "sql",
        code: `SELECT product_name, price
FROM products
ORDER BY price DESC;`
      },
      output: `product_name | price
-------------+------
Laptop       | 80000
Monitor      | 25000
Keyboard     | 3000
Mouse        | 1000`,
      bullets: [
        "SELECT chooses the columns to return.",
        "FROM identifies the source table.",
        "ORDER BY price DESC sorts products from most expensive to least expensive."
      ]
    },
    {
      id: "sorting-text",
      title: "5. Sorting Text Columns",
      paragraphs: [
        "ORDER BY can sort text columns such as employee names, cities, departments, and product names.",
        "Text sorting follows the database's collation and comparison rules. Do not assume that uppercase and lowercase letters, accents, or different languages will sort identically across every database."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
ORDER BY employee_name ASC;`
      },
      bullets: [
        "Text values are sorted according to the database's comparison rules.",
        "Collation can influence case sensitivity and language-specific ordering.",
        "For consistent cross-database behavior, verify the collation and sorting requirements."
      ]
    },
    {
      id: "sorting-dates",
      title: "6. Sorting Date and Time Values",
      paragraphs: [
        "ORDER BY is commonly used to sort records by date or timestamp.",
        "Ascending order places older dates first, while descending order places newer dates first. This is useful for order history, audit records, login activity, and recent transactions."
      ],
      code: {
        language: "sql",
        code: `SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC;`
      },
      bullets: [
        "ASC displays the oldest records first.",
        "DESC displays the newest records first.",
        "Use appropriate DATE, TIME, or TIMESTAMP data types rather than relying on inconsistent date strings."
      ]
    },
    {
      id: "multiple-columns",
      title: "7. Sorting by Multiple Columns",
      paragraphs: [
        "You can specify multiple columns in ORDER BY. The database sorts using the first column, then uses the second column to order rows tied on the first column.",
        "Each column can have its own direction. This is useful when employees must be grouped by department and then ranked by salary."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      },
      bullets: [
        "First, departments are sorted alphabetically according to the applicable collation.",
        "Within each department, employees are sorted by salary from highest to lowest.",
        "The second column does not globally sort all employees by salary; it breaks ties in the first sorting column."
      ]
    },
    {
      id: "sorting-priority",
      title: "8. Understanding Sorting Priority",
      paragraphs: [
        "The order of expressions in ORDER BY matters. The first expression has the highest sorting priority, and later expressions are considered when earlier expressions have equal sort values.",
        "Changing the order of the columns can change the result significantly."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY salary DESC, department ASC;`
      },
      bullets: [
        "First, employees are sorted by salary from highest to lowest.",
        "Employees with the same salary are then sorted by department.",
        "Use the order of columns to represent the exact ranking or grouping required by the application."
      ]
    },
    {
      id: "sort-expressions",
      title: "9. Sorting by Expressions",
      paragraphs: [
        "ORDER BY can sort by a calculated expression instead of only a stored column.",
        "For example, an application can calculate a discounted price or annual salary in the query and sort the resulting rows by that expression."
      ],
      code: {
        language: "sql",
        code: `SELECT product_name, price, price * 0.90 AS discounted_price
FROM products
ORDER BY price * 0.90 ASC;`
      },
      bullets: [
        "Expressions can contain arithmetic operations and supported SQL functions.",
        "The expression must be valid for the database and the column data types.",
        "For complicated calculations, consider readability and whether the expression needs to be reused."
      ]
    },
    {
      id: "column-position",
      title: "10. Sorting by Column Position",
      paragraphs: [
        "Some SQL databases allow ORDER BY to refer to a selected column by its position in the SELECT list.",
        "Although this can work, explicit column names or expressions are usually easier to understand and safer to maintain. Reordering the SELECT list can silently change what a positional reference means."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY 2 DESC;`
      },
      bullets: [
        "In this example, 2 refers to salary because salary is the second selected expression.",
        "Support and behavior can vary across SQL dialects.",
        "Prefer ORDER BY salary DESC for clearer, more maintainable queries."
      ]
    },
    {
      id: "aliases",
      title: "11. Sorting by a Column Alias",
      paragraphs: [
        "When a SELECT expression has an alias, many SQL databases allow ORDER BY to use that alias.",
        "This can make calculated columns easier to reference. However, alias resolution rules and supported syntax can vary by database."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;`
      },
      bullets: [
        "annual_salary is the alias of salary multiplied by 12.",
        "The query sorts by the calculated annual salary.",
        "Do not assume a SELECT alias is available in WHERE; SQL clause processing and alias rules differ."
      ]
    },
    {
      id: "null-ordering",
      title: "12. Sorting NULL Values",
      paragraphs: [
        "NULL represents missing or unknown data. Its position in a sorted result depends on the database and the sorting direction.",
        "Different databases can place NULL values differently. PostgreSQL supports explicit NULLS FIRST and NULLS LAST syntax. MySQL does not support those exact clauses, so an expression can be used when explicit placement is needed."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, commission
FROM employees
ORDER BY commission ASC;`
      },
      bullets: [
        "Check the default NULL ordering for the database you use.",
        "PostgreSQL example: ORDER BY commission ASC NULLS LAST.",
        "MySQL example: ORDER BY commission IS NULL ASC, commission ASC.",
        "Explicitly handling NULL values helps make report behavior predictable."
      ]
    },
    {
      id: "case-based-sorting",
      title: "13. Conditional Sorting with CASE",
      paragraphs: [
        "CASE allows sorting according to custom business rules rather than only numeric or alphabetical order.",
        "For example, a support dashboard may need to show urgent tickets first, followed by high, medium, and low priority tickets."
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
        "CASE converts each priority into a numeric sorting rank.",
        "The ticket ID provides a secondary order for equal priorities.",
        "This technique is useful for custom status, priority, and workflow ordering."
      ]
    },
    {
      id: "where-and-order-by",
      title: "14. Using WHERE with ORDER BY",
      paragraphs: [
        "WHERE filters rows, while ORDER BY sorts the rows that qualify for the query.",
        "In a typical SELECT query, WHERE appears before ORDER BY. This allows the database to return only the matching records in the requested order."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 50000
ORDER BY salary DESC;`
      },
      bullets: [
        "WHERE salary >= 50000 filters out employees below the threshold.",
        "ORDER BY salary DESC sorts the remaining employees from highest to lowest salary.",
        "Filtering and sorting solve different problems and are often used together."
      ]
    },
    {
      id: "group-by-order-by",
      title: "15. Using GROUP BY with ORDER BY",
      paragraphs: [
        "GROUP BY combines rows into groups, often for aggregate calculations. ORDER BY can then sort the grouped results.",
        "For example, you can calculate the average salary for each department and display departments with the highest average first."
      ],
      code: {
        language: "sql",
        code: `SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC;`
      },
      bullets: [
        "GROUP BY creates a result group for each department.",
        "AVG calculates the average salary in each group.",
        "ORDER BY sorts the grouped rows using the calculated average."
      ]
    },
    {
      id: "having-order-by",
      title: "16. Using HAVING with ORDER BY",
      paragraphs: [
        "HAVING filters groups after grouping and aggregation. ORDER BY then sorts the groups that remain.",
        "This is useful for reports that should show only departments meeting a particular condition."
      ],
      code: {
        language: "sql",
        code: `SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5
ORDER BY employee_count DESC;`
      },
      bullets: [
        "GROUP BY creates department groups.",
        "HAVING keeps departments with at least five employees.",
        "ORDER BY displays the largest qualifying departments first."
      ]
    },
    {
      id: "order-by-limit",
      title: "17. ORDER BY with LIMIT",
      paragraphs: [
        "LIMIT restricts the number of rows returned by a query in databases such as MySQL and PostgreSQL.",
        "Combining ORDER BY with LIMIT is useful for top-N queries, such as finding the five highest-paid employees or the ten newest orders.",
        "LIMIT syntax is database-specific. SQL Server commonly uses TOP or OFFSET/FETCH instead."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC, employee_name ASC
LIMIT 5;`
      },
      bullets: [
        "ORDER BY defines which rows rank first.",
        "LIMIT 5 returns at most five rows.",
        "The employee name provides a secondary sort for equal salaries.",
        "If multiple employees have the same salary, LIMIT may return only some of them when the requested number is reached."
      ]
    },
    {
      id: "stable-sorting",
      title: "18. Why a Unique Tie-Breaker Matters",
      paragraphs: [
        "If multiple rows have the same values for every ORDER BY expression, their relative order is not guaranteed.",
        "For predictable reports and pagination, add a unique column such as the primary key as the final sorting expression."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC;`
      },
      bullets: [
        "Salary determines the main ranking.",
        "Employee ID resolves ties between employees with the same salary.",
        "A unique tie-breaker is especially important for pagination and repeatable API responses.",
        "A unique tie-breaker provides a deterministic order for a given dataset, but concurrent data changes can still affect later page requests."
      ]
    },
    {
      id: "pagination",
      title: "19. ORDER BY with Pagination",
      paragraphs: [
        "Pagination returns a subset of a larger result set. A common approach uses ORDER BY with LIMIT and OFFSET.",
        "A stable ordering is essential because pagination without ORDER BY can produce inconsistent page contents.",
        "Large OFFSET values may require the database to scan or skip many rows. Keyset pagination can be more efficient for some large datasets."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "LIMIT 10 requests up to ten rows.",
        "OFFSET 20 skips the first twenty rows in the ordered result.",
        "This is commonly used to retrieve the third page when each page contains ten rows.",
        "Concurrent inserts and deletes can shift offset-based page boundaries."
      ]
    },
    {
      id: "keyset-pagination",
      title: "20. Keyset Pagination Concept",
      paragraphs: [
        "Keyset pagination retrieves the next set of rows relative to the last row seen on the previous page. It avoids skipping a large number of rows using OFFSET.",
        "For a unique, increasing employee ID, the application can request rows whose IDs are greater than the last ID returned. For more complex sorting, the continuation condition must match the full ordering."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
WHERE employee_id > 100
ORDER BY employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "The example assumes the previous page ended at employee ID 100.",
        "The next page begins with IDs greater than 100.",
        "Keyset pagination is useful for large datasets and feed-style interfaces.",
        "The cursor should represent the last row's ordering values, and suitable indexes can improve performance."
      ]
    },
    {
      id: "order-by-joins",
      title: "21. ORDER BY with JOIN",
      paragraphs: [
        "ORDER BY can sort results produced by joining multiple tables.",
        "Qualifying a column with its table name or alias avoids ambiguity when both tables contain a column with the same name."
      ],
      code: {
        language: "sql",
        code: `SELECT e.employee_name, d.department_name, e.salary
FROM employees e
JOIN departments d
  ON e.department_id = d.department_id
ORDER BY d.department_name ASC, e.salary DESC;`
      },
      bullets: [
        "The query joins employee and department information.",
        "Department name determines the primary order.",
        "Salary determines the order of employees within each department.",
        "Use qualified column references when names could be ambiguous."
      ]
    },
    {
      id: "order-by-distinct",
      title: "22. ORDER BY with DISTINCT",
      paragraphs: [
        "DISTINCT removes duplicate combinations from the selected result columns. ORDER BY sorts the resulting rows.",
        "Some databases impose restrictions on which expressions can appear in ORDER BY when DISTINCT is used. For portable queries, select and sort by compatible expressions."
      ],
      code: {
        language: "sql",
        code: `SELECT DISTINCT department
FROM employees
ORDER BY department ASC;`
      },
      bullets: [
        "DISTINCT returns each department once.",
        "ORDER BY sorts the department names.",
        "Check your database's rules when sorting by an expression that is not part of the selected DISTINCT result."
      ]
    },
    {
      id: "performance",
      title: "23. ORDER BY Performance and Indexes",
      paragraphs: [
        "Sorting can require additional database work, particularly when many rows must be sorted or the requested ordering cannot be satisfied efficiently by an index.",
        "A suitable index may help the database retrieve rows in the required order. Whether it does so depends on the query, filtering conditions, index definition, and database optimizer."
      ],
      code: {
        language: "sql",
        code: `CREATE INDEX idx_employees_salary
ON employees (salary);

SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "Indexes can improve some filtering and sorting queries.",
        "An index does not guarantee that every ORDER BY will avoid a sort.",
        "A composite index may help when the query sorts by multiple columns.",
        "Indexes consume storage and add work to inserts, updates, and deletes.",
        "Use EXPLAIN or the database's query-plan tools to investigate performance before adding indexes."
      ]
    },
    {
      id: "order-by-spring-data",
      title: "24. ORDER BY in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA supports sorting through the Sort abstraction. This lets the application request ascending or descending order without writing a complete ORDER BY clause in every repository method.",
        "Sort properties normally refer to entity property names, not database column names. Ensure the property exists on the entity."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getEmployeesBySalary() {
        Sort sort = Sort.by(
            Sort.Order.desc("salary"),
            Sort.Order.asc("employeeId")
        );

        return employeeRepository.findAll(sort);
    }
}`
      },
      bullets: [
        "Sort.Order.desc(\"salary\") sorts by salary descending.",
        "Sort.Order.asc(\"employeeId\") provides a secondary order.",
        "The repository must support the sorting overload being called.",
        "Import java.util.List when using List<Employee>.",
        "For large datasets, use Pageable instead of retrieving every row."
      ]
    },
    {
      id: "derived-query-sorting",
      title: "25. Sorting in Derived Repository Methods",
      paragraphs: [
        "Spring Data JPA can derive sorting from a repository method name. This is convenient for simple, fixed sorting requirements.",
        "The property names in the method should match Java entity properties. The example assumes Employee has a salary property."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartmentOrderBySalaryDesc(
        String department
    );
}`
      },
      bullets: [
        "findByDepartment filters employees by department.",
        "OrderBySalaryDesc sorts matching employees by salary in descending order.",
        "Use repository method names for simple, readable queries.",
        "Use Sort, Pageable, JPQL, or a custom query when the sorting requirements become more complex."
      ]
    },
    {
      id: "pageable-sorting",
      title: "26. Sorting with Pageable",
      paragraphs: [
        "Pageable combines page information, page size, and sorting. Spring Data JPA can use it to retrieve a page of records from the database.",
        "Pageable is useful for REST APIs that need to return data in manageable pages rather than loading every record at once."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public Page<Employee> getEmployeePage(int page, int size) {
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
        "Spring Data page indexes are zero-based.",
        "PageRequest.of(0, 10) requests the first page with ten records.",
        "The Sort object defines the order of the page contents.",
        "Validate page and size values received from an API client.",
        "For large datasets, consider keyset-based approaches when offset pagination becomes expensive."
      ]
    },
    {
      id: "dynamic-sorting-api",
      title: "27. Dynamic Sorting in a REST API",
      paragraphs: [
        "A REST API can allow clients to request sorting, for example by passing sort=salary,desc. The backend should validate the requested property and direction before building the Sort object.",
        "Do not concatenate arbitrary client input into raw SQL. Use framework-supported sorting APIs and an allowlist of permitted fields."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Sort;

public Sort createEmployeeSort(String sortBy, String direction) {
    if (!"salary".equals(sortBy)
            && !"employeeName".equals(sortBy)
            && !"employeeId".equals(sortBy)) {
        throw new IllegalArgumentException(
            "Unsupported sort property"
        );
    }

    if ("desc".equalsIgnoreCase(direction)) {
        return Sort.by(sortBy).descending();
    }

    if ("asc".equalsIgnoreCase(direction)) {
        return Sort.by(sortBy).ascending();
    }

    throw new IllegalArgumentException(
        "Sort direction must be asc or desc"
    );
}`
      },
      bullets: [
        "Validate sort properties against an allowlist.",
        "Validate the sort direction instead of silently accepting invalid values.",
        "Convert invalid input into an appropriate client error in the API layer.",
        "Keep database entity properties and public API parameter names consistent or map them explicitly."
      ]
    },
    {
      id: "common-mistakes",
      title: "28. Common ORDER BY Mistakes",
      paragraphs: [
        "ORDER BY is simple to write, but incorrect assumptions about row order, NULL values, aliases, and pagination can cause production bugs."
      ],
      bullets: [
        "Expecting a guaranteed order without ORDER BY.",
        "Using DESC when ascending order is required.",
        "Assuming a unique order when several rows have equal sort values.",
        "Using LIMIT without a deterministic ORDER BY for a ranking query.",
        "Assuming NULL values appear first or last in every database.",
        "Sorting by a misspelled entity property in Spring Data JPA.",
        "Adding indexes without examining the actual query plan.",
        "Allowing unvalidated client input to select arbitrary sort fields.",
        "Using large OFFSET values without considering their performance cost.",
        "Assuming sorting by a non-unique column alone is enough for reliable pagination."
      ]
    },
    {
      id: "best-practices",
      title: "29. ORDER BY Best Practices",
      bullets: [
        "Always use ORDER BY when the application depends on a particular result order.",
        "Use ASC and DESC explicitly when it improves readability.",
        "Add a unique tie-breaker for stable ranking and pagination.",
        "Handle NULL ordering according to the database dialect and business requirement.",
        "Use table aliases to qualify ambiguous columns in JOIN queries.",
        "Use LIMIT or database-appropriate pagination when only a subset is needed.",
        "Validate dynamic sort properties and directions at the API boundary.",
        "Use EXPLAIN and realistic data to assess sorting performance.",
        "Create indexes based on query patterns rather than indexing every sortable column.",
        "Keep repository sorting property names aligned with Java entity fields."
      ]
    },
    {
      id: "practice-exercises",
      title: "30. Practice Exercises",
      paragraphs: [
        "Assume an employees table containing employee_id, employee_name, department, salary, and hire_date."
      ],
      bullets: [
        "Exercise 1: Display all employees by salary from lowest to highest.",
        "Exercise 2: Display the five highest-paid employees.",
        "Exercise 3: Sort employees by department and then salary descending.",
        "Exercise 4: Display the newest employees first using hire_date.",
        "Exercise 5: Find the three highest-paid employees and use employee_id to break salary ties.",
        "Exercise 6: Calculate the average salary by department and sort departments by average salary descending.",
        "Exercise 7: Display the second page of employees using ten records per page.",
        "Exercise 8: Design a query that puts NULL commission values last in MySQL."
      ]
    },
    {
      id: "practice-solutions",
      title: "31. Practice Exercise Solutions",
      paragraphs: [
        "Try solving the exercises first, then compare your queries with these solutions. Adjust table and column names to match your own database."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1: Lowest salary first
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary ASC;

-- Exercise 2: Five highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 5;

-- Exercise 3: Department, then salary
SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC;

-- Exercise 4: Newest hires first
SELECT employee_name, hire_date
FROM employees
ORDER BY hire_date DESC, employee_id ASC;

-- Exercise 5: Three highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 3;

-- Exercise 6: Highest average salary by department
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;

-- Exercise 7: Second page of ten records in MySQL/PostgreSQL
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Exercise 8: NULL commission values last in MySQL
SELECT employee_name, commission
FROM employees
ORDER BY commission IS NULL ASC, commission ASC;`
      },
      bullets: [
        "The LIMIT syntax shown here is suitable for MySQL and PostgreSQL.",
        "The second-page query assumes employee_id provides the intended unique ordering.",
        "The MySQL NULL expression sorts non-NULL commissions first and NULL commissions last.",
        "The queries use employee_id as a tie-breaker where appropriate."
      ]
    },
    {
      id: "debugging",
      title: "32. Debugging ORDER BY Problems",
      paragraphs: [
        "When a query returns rows in an unexpected order, verify the sorting expression, direction, data types, NULL behavior, and tie-breaking columns."
      ],
      bullets: [
        "Check that ORDER BY references the intended column or expression.",
        "Check whether the required direction is ASC or DESC.",
        "Inspect duplicate sort values and add a unique tie-breaker if necessary.",
        "Verify whether values are stored as numeric/date types or as text.",
        "Check the database's collation and NULL-ordering rules.",
        "For slow queries, inspect the execution plan and relevant indexes.",
        "For Spring Data JPA, confirm that Sort properties match Java entity property names.",
        "For pagination, verify the page index, page size, ordering, and any concurrent data changes."
      ]
    },
    {
      id: "scenario-interview",
      title: "33. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question: "An employee report displays rows in a different order each time. How would you fix it?",
          answer: "Add an ORDER BY clause that expresses the required order. If the main sort column contains duplicate values, add a unique tie-breaker such as employee_id."
        },
        {
          question: "How would you display the five highest-paid employees?",
          answer: "Use ORDER BY salary DESC, employee_id ASC LIMIT 5 in MySQL or PostgreSQL. The unique tie-breaker makes the selection deterministic for a given dataset."
        },
        {
          question: "An API returns duplicate-looking records on different pages. What would you investigate?",
          answer: "Check whether pagination has a deterministic ORDER BY, whether the sort columns contain duplicates, and whether concurrent inserts or deletes are changing offset-based page boundaries. Consider keyset pagination when appropriate."
        },
        {
          question: "A query with ORDER BY is slow. What would you do?",
          answer: "Inspect the execution plan, row counts, filter conditions, and available indexes. Test whether a suitable index can help, while considering its storage and write costs."
        },
        {
          question: "How would you sort tickets by a custom priority order?",
          answer: "Use a CASE expression in ORDER BY to map each priority to a numeric rank, then add a secondary column to order tickets with equal priorities."
        },
        {
          question: "How would you implement sorting in Spring Data JPA?",
          answer: "Use Sort for sorting without pagination or Pageable for sorting and pagination together. Validate client-supplied property names and directions before passing them to the repository."
        }
      ]
    },
    {
      id: "interview",
      title: "34. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is ORDER BY?",
          answer: "ORDER BY sorts query results according to one or more columns or expressions."
        },
        {
          question: "What is the default sort direction?",
          answer: "ASC, or ascending order, is the default when no direction is specified."
        },
        {
          question: "What is the difference between ASC and DESC?",
          answer: "ASC sorts values from lower to higher or earlier to later. DESC sorts values from higher to lower or later to earlier."
        },
        {
          question: "Does SQL guarantee result order without ORDER BY?",
          answer: "No. A query without ORDER BY does not guarantee a particular row order."
        },
        {
          question: "Can we sort by multiple columns?",
          answer: "Yes. The database sorts by the first expression, then uses subsequent expressions to resolve ties."
        },
        {
          question: "Can we use ORDER BY with WHERE?",
          answer: "Yes. WHERE filters qualifying rows, and ORDER BY specifies the order of the resulting rows."
        },
        {
          question: "Can we use ORDER BY with GROUP BY?",
          answer: "Yes. GROUP BY creates groups, and ORDER BY can sort the grouped results using grouping columns or aggregate expressions."
        },
        {
          question: "What is the difference between ORDER BY and GROUP BY?",
          answer: "ORDER BY sorts result rows. GROUP BY combines rows into groups, commonly for aggregate calculations."
        },
        {
          question: "How do you find the highest-paid employee first?",
          answer: "Use ORDER BY salary DESC. If only one row is required, combine it with suitable row-limiting syntax and a unique tie-breaker."
        },
        {
          question: "What happens when multiple rows have the same sort value?",
          answer: "Their relative order is not guaranteed unless additional ORDER BY expressions distinguish them."
        },
        {
          question: "Can ORDER BY sort calculated values?",
          answer: "Yes. It can sort by expressions such as salary * 12 or by an eligible SELECT alias."
        },
        {
          question: "How does ORDER BY work with LIMIT?",
          answer: "ORDER BY defines the ranking, and LIMIT restricts how many rows are returned."
        },
        {
          question: "Why is ORDER BY important for pagination?",
          answer: "It provides a defined order for page retrieval. A unique tie-breaker helps avoid ambiguous ordering when sort values are equal."
        },
        {
          question: "Can ORDER BY use an index?",
          answer: "A suitable index may allow the database to retrieve rows in the requested order, but the optimizer decides based on the query and execution plan."
        },
        {
          question: "How do you sort NULL values last?",
          answer: "Use database-supported syntax such as NULLS LAST in PostgreSQL. In MySQL, an expression such as ORDER BY commission IS NULL ASC, commission ASC can place NULL values last."
        },
        {
          question: "How do you sort results in Spring Data JPA?",
          answer: "Use the Sort abstraction, a derived repository method such as findByDepartmentOrderBySalaryDesc, or Pageable when pagination is also needed."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "35. Quick Reference",
      bullets: [
        "Ascending: ORDER BY salary ASC",
        "Descending: ORDER BY salary DESC",
        "Multiple columns: ORDER BY department ASC, salary DESC",
        "Top five: ORDER BY salary DESC, employee_id ASC LIMIT 5",
        "Newest records: ORDER BY created_at DESC, id DESC",
        "Grouped report: GROUP BY department ORDER BY COUNT(*) DESC",
        "Custom priority: ORDER BY CASE ... END",
        "Pagination: ORDER BY id LIMIT 10 OFFSET 20",
        "Spring Data sorting: Sort.by(Sort.Order.desc(\"salary\"))",
        "Spring Data pagination: PageRequest.of(page, size, sort)"
      ]
    },
    {
      id: "one-minute-answer",
      title: "36. Explain ORDER BY in One Minute",
      paragraphs: [
        "ORDER BY is an SQL clause used to sort query results based on one or more columns or expressions. ASC sorts in ascending order and is the default, while DESC sorts in descending order. We can sort by multiple columns, use expressions, and combine ORDER BY with WHERE, GROUP BY, HAVING, and LIMIT. For predictable pagination, we should use a deterministic sort and include a unique tie-breaker. In Spring Data JPA, sorting can be implemented using Sort or Pageable."
      ]
    },
    {
      id: "revision-notes",
      title: "37. Revision Notes",
      bullets: [
        "ORDER BY sorts query results; it does not permanently rearrange table storage.",
        "ASC is the default direction; DESC reverses the ordering.",
        "Multiple sort expressions are evaluated in the order written.",
        "NULL ordering and text collation can differ between database systems.",
        "LIMIT restricts result count in MySQL and PostgreSQL.",
        "A unique tie-breaker helps produce deterministic ordering.",
        "Pagination requires careful ordering; keyset pagination can help with large datasets.",
        "Spring Data JPA supports Sort, Pageable, and derived query sorting.",
        "Use query plans to investigate sorting performance.",
        "Validate dynamic sort fields and directions received from clients."
      ]
    }
  ]
};
