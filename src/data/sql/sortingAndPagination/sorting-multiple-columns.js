
export const sortingMultipleColumns = {
  id: 2023,
  title: "Sorting by Multiple Columns",
  slug: "sorting-multiple-columns",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Learn how SQL sorts rows using multiple columns, mixed sort directions, tie-breakers, pagination, and Spring Data JPA.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "multiple-columns",
      title: "1. What Is Multiple-Column Sorting?",
      paragraphs: [
        "You can specify multiple expressions in ORDER BY. The database sorts using the first expression, then uses later expressions to order rows tied on earlier expressions.",
        "This is useful when a report requires more than one sorting rule, such as sorting employees by department and then by salary within each department.",
        "Each expression can have its own direction, allowing ASC and DESC to be combined in the same ORDER BY clause."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      },
      output: `employee_name | department | salary
--------------+------------+-------
Ravi          | Finance    | 70000
Anu           | Finance    | 55000
Arun          | Finance    | 40000
Priya         | IT         | 80000
Kiran         | IT         | 65000
Meena         | Sales      | 60000`,
      bullets: [
        "First, sort by department in ascending order.",
        "Within each department, sort salary from highest to lowest.",
        "Each ORDER BY expression can have its own direction.",
        "Later expressions only affect the ordering of rows tied on earlier expressions."
      ]
    },
    {
      id: "stable-order",
      title: "2. Adding a Tie-Breaker",
      paragraphs: [
        "Rows may have the same department and salary. When all specified sorting values are equal, their relative order is not guaranteed.",
        "Add a unique column, such as employee_id, as the final sorting expression when you need a deterministic order for a given dataset.",
        "This is particularly important for reports, ranking queries, and pagination."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC;`
      },
      bullets: [
        "Salary determines the primary order.",
        "Employee ID determines the order among employees with equal salaries.",
        "A unique final sort key removes ambiguity between rows in the same result set.",
        "Concurrent inserts, deletes, or updates can still change results between separate requests."
      ]
    },
    {
      id: "sorting-priority",
      title: "3. Understanding Sorting Priority",
      paragraphs: [
        "The first ORDER BY expression has the highest priority. The database considers the second expression only when rows have equal values for the first expression.",
        "The third expression is considered when the first two expressions are equal, and the same principle continues for additional expressions."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary, employee_id
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC;`
      },
      bullets: [
        "Priority 1: department ascending.",
        "Priority 2: salary descending within the same department.",
        "Priority 3: employee_id ascending when department and salary are equal.",
        "Changing the order of the expressions can change the result."
      ]
    },
    {
      id: "mixed-directions",
      title: "4. Combining ASC and DESC",
      paragraphs: [
        "SQL allows ascending and descending directions to be mixed across different sorting expressions.",
        "For example, an employee report can sort departments alphabetically while displaying the highest-paid employee first within each department."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      },
      bullets: [
        "ASC sorts departments in ascending order.",
        "DESC sorts salaries from highest to lowest within each department.",
        "A direction applies to its own ORDER BY expression.",
        "You do not need to use the same direction for every column."
      ]
    },
    {
      id: "three-columns",
      title: "5. Sorting by Three or More Columns",
      paragraphs: [
        "ORDER BY can contain several expressions when a report needs multiple levels of ordering.",
        "A student report, for example, might sort by class, then total marks descending, then student ID ascending."
      ],
      code: {
        language: "sql",
        code: `SELECT student_id, student_name, class_name, total_marks
FROM students
ORDER BY class_name ASC, total_marks DESC, student_id ASC;`
      },
      bullets: [
        "Students are grouped in the result by class order.",
        "Within each class, higher marks appear first.",
        "Student ID resolves ties when class and marks are equal.",
        "Choose sorting columns based on the required business rule."
      ]
    },
    {
      id: "where-order",
      title: "6. Multiple-Column Sorting with WHERE",
      paragraphs: [
        "WHERE filters the records that qualify for the query. ORDER BY then defines the order of the result.",
        "Multiple-column sorting is commonly combined with filtering to produce reports containing only relevant records."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
WHERE salary >= 40000
ORDER BY department ASC, salary DESC;`
      },
      bullets: [
        "WHERE excludes employees earning less than 40000.",
        "Department determines the primary order.",
        "Salary determines the order within each department.",
        "Filtering and sorting perform different tasks."
      ]
    },
    {
      id: "group-by-order",
      title: "7. Multiple-Column Sorting with GROUP BY",
      paragraphs: [
        "GROUP BY combines rows into groups for aggregate calculations. ORDER BY can sort those grouped results using multiple expressions.",
        "For example, departments can be sorted by average salary descending and then by department name ascending when averages are equal."
      ],
      code: {
        language: "sql",
        code: `SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;`
      },
      bullets: [
        "GROUP BY creates one group per department.",
        "AVG calculates each department's average salary.",
        "Average salary is the primary sort expression.",
        "Department name provides a secondary order for equal averages."
      ]
    },
    {
      id: "having-order",
      title: "8. Multiple-Column Sorting with HAVING",
      paragraphs: [
        "HAVING filters grouped results, while ORDER BY sorts the groups that remain.",
        "This pattern is useful for reports that include only departments meeting a condition and then rank them by more than one value."
      ],
      code: {
        language: "sql",
        code: `SELECT department, COUNT(*) AS employee_count,
       AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 3
ORDER BY employee_count DESC, average_salary DESC;`
      },
      bullets: [
        "GROUP BY creates department groups.",
        "HAVING keeps departments with at least three employees.",
        "Employee count determines the primary order.",
        "Average salary determines the order when employee counts are equal."
      ]
    },
    {
      id: "aliases",
      title: "9. Sorting by Aliases and Expressions",
      paragraphs: [
        "You can sort by selected expressions and, in many databases, by aliases assigned to those expressions.",
        "This is useful for sorting calculated values such as annual salary or discounted product price."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name,
       salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC, employee_id ASC;`
      },
      bullets: [
        "annual_salary represents salary multiplied by 12.",
        "Annual salary determines the primary order.",
        "Employee ID resolves ties.",
        "Alias support and resolution rules can vary across SQL dialects."
      ]
    },
    {
      id: "null-values",
      title: "10. Multiple-Column Sorting with NULL Values",
      paragraphs: [
        "NULL represents missing or unknown data. Its position in sorted results depends on the database and sort direction.",
        "If a report requires explicit NULL placement, use database-supported syntax or an expression appropriate for the database."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL example
SELECT employee_name, department, commission
FROM employees
ORDER BY department ASC, commission DESC NULLS LAST,
         employee_name ASC;

-- MySQL example
SELECT employee_name, department, commission
FROM employees
ORDER BY department ASC, commission IS NULL ASC,
         commission DESC, employee_name ASC;`
      },
      bullets: [
        "Department determines the primary order.",
        "Commission determines the secondary order.",
        "The PostgreSQL example places NULL commissions last within each department.",
        "The MySQL expression places non-NULL commissions before NULL values.",
        "Verify syntax for the database you use."
      ]
    },
    {
      id: "limit",
      title: "11. Multiple-Column Sorting with LIMIT",
      paragraphs: [
        "LIMIT restricts the number of rows returned in MySQL and PostgreSQL. It is useful when an application needs only the top few records after applying several sorting rules.",
        "Always define the intended ranking before applying LIMIT. A unique tie-breaker helps determine which rows are selected when primary sort values are equal."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "The query orders departments first.",
        "Employees are sorted by salary within each department.",
        "Employee ID resolves ties.",
        "LIMIT 10 returns at most ten rows from the ordered result."
      ]
    },
    {
      id: "pagination",
      title: "12. Multiple-Column Sorting with Pagination",
      paragraphs: [
        "Pagination retrieves a subset of the ordered result set. When sorting by multiple columns, the ordering should include a unique tie-breaker to avoid ambiguity between rows.",
        "Offset pagination can still shift between requests when records are inserted, deleted, or updated. Keyset pagination may be a better option for some large datasets."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "LIMIT 10 requests up to ten rows.",
        "OFFSET 20 skips the first twenty rows in the ordered result.",
        "Salary determines the primary order.",
        "Employee ID resolves ties between equal salaries.",
        "A deterministic sort does not prevent page shifts caused by concurrent data changes."
      ]
    },
    {
      id: "joins",
      title: "13. Multiple-Column Sorting with JOIN",
      paragraphs: [
        "ORDER BY can sort rows returned by a JOIN between tables.",
        "Use qualified column references or table aliases when columns from different tables have the same name."
      ],
      code: {
        language: "sql",
        code: `SELECT e.employee_name, d.department_name, e.salary
FROM employees e
JOIN departments d
  ON e.department_id = d.department_id
ORDER BY d.department_name ASC, e.salary DESC,
         e.employee_id ASC;`
      },
      bullets: [
        "The query combines employee and department information.",
        "Department name determines the primary order.",
        "Salary sorts employees within each department.",
        "Employee ID provides a unique tie-breaker."
      ]
    },
    {
      id: "real-world",
      title: "14. Real-World Example: E-Commerce Orders",
      paragraphs: [
        "An e-commerce dashboard may need to show orders by status priority, then newest order date, and finally order ID.",
        "Custom priority can be represented using CASE so the sorting order follows the application's business rules rather than alphabetical status order."
      ],
      code: {
        language: "sql",
        code: `SELECT order_id, customer_id, status, order_date
FROM orders
ORDER BY
  CASE status
    WHEN 'PENDING' THEN 1
    WHEN 'PROCESSING' THEN 2
    WHEN 'SHIPPED' THEN 3
    WHEN 'DELIVERED' THEN 4
    ELSE 5
  END ASC,
  order_date DESC,
  order_id ASC;`
      },
      bullets: [
        "CASE assigns a custom rank to each order status.",
        "Orders with higher-priority statuses appear first according to the chosen mapping.",
        "Newer orders appear first within the same priority.",
        "Order ID resolves remaining ties.",
        "The priority mapping should reflect the application's actual business requirements."
      ]
    },
    {
      id: "spring-data-sort",
      title: "15. Multiple-Column Sorting in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA supports multiple sorting expressions through the Sort abstraction.",
        "Each Sort.Order defines a property and direction. The properties normally refer to Java entity properties rather than database column names."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getEmployees() {
        Sort sort = Sort.by(
            Sort.Order.asc("department"),
            Sort.Order.desc("salary"),
            Sort.Order.asc("employeeId")
        );

        return employeeRepository.findAll(sort);
    }
}`
      },
      bullets: [
        "Department is sorted ascending.",
        "Salary is sorted descending within each department.",
        "Employee ID provides the final tie-breaker.",
        "The Employee entity must contain matching properties.",
        "The repository must support findAll(Sort)."
      ]
    },
    {
      id: "pageable",
      title: "16. Multiple-Column Sorting with Pageable",
      paragraphs: [
        "Pageable combines page number, page size, and sorting. It is useful when a REST API must return sorted records in manageable pages.",
        "Spring Data page numbers are zero-based, so page 0 represents the first page."
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
            Sort.Order.asc("department"),
            Sort.Order.desc("salary"),
            Sort.Order.asc("employeeId")
        )
    );

    return employeeRepository.findAll(pageable);
}`
      },
      bullets: [
        "PageRequest.of(0, 10, sort) requests the first page of ten records.",
        "The Sort object defines all sorting levels.",
        "Validate page and size values before constructing the Pageable.",
        "For large datasets, consider keyset pagination when offset-based queries become expensive."
      ]
    },
    {
      id: "dynamic-sorting",
      title: "17. Dynamic Sorting from a REST API",
      paragraphs: [
        "A REST API may allow clients to choose sorting columns and directions. The backend should validate these inputs and map allowed public sort fields to valid entity properties.",
        "Do not concatenate arbitrary client-supplied sort expressions into raw SQL. Use framework-supported sorting APIs and an allowlist."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Sort;

public Sort createSort(String sortBy, String direction) {
    if (!"department".equals(sortBy)
            && !"salary".equals(sortBy)
            && !"employeeId".equals(sortBy)) {
        throw new IllegalArgumentException(
            "Unsupported sort property"
        );
    }

    if ("asc".equalsIgnoreCase(direction)) {
        return Sort.by(sortBy).ascending();
    }

    if ("desc".equalsIgnoreCase(direction)) {
        return Sort.by(sortBy).descending();
    }

    throw new IllegalArgumentException(
        "Direction must be asc or desc"
    );
}`
      },
      bullets: [
        "Allow only approved sort properties.",
        "Validate the direction explicitly.",
        "Return an appropriate client error for invalid parameters.",
        "For multiple requested sort fields, validate every field and direction separately.",
        "Map public API field names to entity property names when they differ."
      ]
    },
    {
      id: "performance",
      title: "18. Performance Considerations",
      paragraphs: [
        "Sorting large result sets can require significant database work. A suitable index may help with some sorting patterns, but the optimizer decides whether the index is useful for a particular query.",
        "Composite indexes should be designed around actual filtering and ordering requirements. Their usefulness depends on column order, query conditions, and the database engine."
      ],
      code: {
        language: "sql",
        code: `CREATE INDEX idx_employees_department_salary
ON employees (department, salary);

SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "A composite index can help some queries that filter or sort on its leading columns.",
        "An index does not guarantee that the database can avoid sorting.",
        "Mixed directions and additional tie-breaker columns can affect index usefulness.",
        "Indexes increase storage use and the cost of inserts, updates, and deletes.",
        "Use EXPLAIN or the database's execution-plan tools before changing indexes.",
        "The index shown is an example, not a universal recommendation for every table."
      ]
    },
    {
      id: "common-mistakes",
      title: "19. Common Mistakes",
      bullets: [
        "Assuming the second ORDER BY column sorts all rows globally before the first column.",
        "Reversing the intended sorting priority.",
        "Using ASC or DESC on the wrong expression.",
        "Assuming rows tied on all sort expressions have a guaranteed relative order.",
        "Forgetting a unique tie-breaker in pagination queries.",
        "Assuming NULL values have identical ordering behavior in every database.",
        "Using database column names instead of Java entity property names in Spring Data JPA Sort.",
        "Allowing arbitrary client input to control raw SQL sorting expressions.",
        "Adding indexes without checking the actual query plan.",
        "Assuming a unique ordering prevents page changes caused by concurrent data modifications."
      ]
    },
    {
      id: "best-practices",
      title: "20. Best Practices",
      bullets: [
        "Put the most important sorting expression first.",
        "Use ASC and DESC explicitly when it improves readability.",
        "Add a unique tie-breaker for ranking and pagination.",
        "Use table aliases to qualify ambiguous columns in JOIN queries.",
        "Handle NULL placement according to the database and business requirements.",
        "Validate all client-supplied sorting fields and directions.",
        "Use Pageable when sorting and pagination are both required.",
        "Use keyset pagination when it better suits large, frequently changing datasets.",
        "Evaluate composite indexes with realistic queries and execution plans.",
        "Document custom CASE-based sorting rules so future developers understand the intended priority."
      ]
    },
    {
      id: "practice-exercises",
      title: "21. Practice Exercises",
      paragraphs: [
        "Assume you have an employees table with employee_id, employee_name, department, and salary columns."
      ],
      bullets: [
        "Exercise 1: Sort employees by department ascending and salary descending.",
        "Exercise 2: Sort employees by salary descending and employee ID ascending.",
        "Exercise 3: Sort employees by department, then salary, then employee name.",
        "Exercise 4: Return the ten highest-paid employees with a deterministic tie-breaker.",
        "Exercise 5: Calculate average salary by department and sort by average salary descending, then department ascending.",
        "Exercise 6: Display the second page of ten employees ordered by department and employee ID.",
        "Exercise 7: Sort support tickets by a custom priority, then creation date descending.",
        "Exercise 8: Implement the department-and-salary sorting rules using Spring Data JPA Sort."
      ]
    },
    {
      id: "practice-solutions",
      title: "22. Practice Exercise Solutions",
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- Exercise 2
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC;

-- Exercise 3
SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_name ASC,
         employee_id ASC;

-- Exercise 4
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 10;

-- Exercise 5
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;

-- Exercise 6: MySQL/PostgreSQL syntax
SELECT employee_id, employee_name, department
FROM employees
ORDER BY department ASC, employee_id ASC
LIMIT 10 OFFSET 10;`
      },
      bullets: [
        "Exercise 3 includes employee_id as a final tie-breaker in case employee names are equal.",
        "Exercise 4 uses LIMIT syntax supported by MySQL and PostgreSQL.",
        "Exercise 6 assumes department and employee_id define the required deterministic order.",
        "For Exercise 7, use CASE in ORDER BY as shown in the real-world example, followed by creation date and a unique ticket ID.",
        "For Exercise 8, use Sort.Order.asc(\"department\"), Sort.Order.desc(\"salary\"), and Sort.Order.asc(\"employeeId\") if those entity properties exist."
      ]
    },
    {
      id: "debugging",
      title: "23. Debugging Multiple-Column Sorting",
      paragraphs: [
        "When the result order is unexpected, verify the sorting priority first. Then check each expression, its direction, data type, NULL behavior, and tie-breaking logic."
      ],
      bullets: [
        "Confirm that the first expression represents the primary business requirement.",
        "Check that later expressions resolve ties rather than replacing the primary order.",
        "Verify each ASC and DESC direction independently.",
        "Check whether the data contains duplicate values for the sorting columns.",
        "Add a unique final key when deterministic ordering is required.",
        "Check collation and NULL behavior if text or missing values appear unexpectedly.",
        "For Spring Data JPA, verify entity property names and repository method signatures.",
        "For slow queries, inspect the execution plan and available indexes.",
        "For inconsistent pagination, check concurrent changes and consider keyset pagination."
      ]
    },
    {
      id: "scenario-interview",
      title: "24. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question: "A report must sort departments alphabetically and employees by salary within each department. What query would you write?",
          answer: "Use ORDER BY department ASC, salary DESC. Add a unique employee ID as a final expression if deterministic ordering is required."
        },
        {
          question: "Two employees have the same salary. How can you decide which one appears first?",
          answer: "Add another sorting expression, such as employee_id ASC, after salary DESC. The second expression determines the order among employees tied on salary."
        },
        {
          question: "Why are records appearing differently across pages?",
          answer: "The query may lack a deterministic ORDER BY or unique tie-breaker. Concurrent inserts, deletes, and updates can also shift offset-based pagination between requests."
        },
        {
          question: "How would you rank departments by average salary?",
          answer: "Use GROUP BY department, calculate AVG(salary), and sort by the average descending. Add department ascending to resolve equal averages."
        },
        {
          question: "How would you implement multiple-column sorting in Spring Data JPA?",
          answer: "Create a Sort using multiple Sort.Order expressions and pass it to a repository method that supports sorting. Use Pageable when pagination is also required."
        },
        {
          question: "A query with multiple sorting columns is slow. What would you investigate?",
          answer: "Inspect the execution plan, filters, row counts, and existing indexes. Evaluate whether a suitable composite index helps the actual query before adding one."
        }
      ]
    },
    {
      id: "interview",
      title: "25. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can ORDER BY contain multiple columns?",
          answer: "Yes. Each expression defines another sorting level."
        },
        {
          question: "How does SQL handle ties in the first sort column?",
          answer: "The next ORDER BY expression determines the order among rows tied on the previous expressions."
        },
        {
          question: "Why add a unique tie-breaker?",
          answer: "It makes the ordering deterministic for a given dataset, which is particularly important for ranking and pagination."
        },
        {
          question: "Does the order of columns in ORDER BY matter?",
          answer: "Yes. The first expression has the highest priority, and later expressions are considered when earlier expressions have equal values."
        },
        {
          question: "Can different ORDER BY columns use different directions?",
          answer: "Yes. For example, ORDER BY department ASC, salary DESC sorts departments ascending and salaries descending within each department."
        },
        {
          question: "Can we sort aggregate results using multiple columns?",
          answer: "Yes. After GROUP BY, you can sort using aggregate expressions and additional columns, such as ORDER BY AVG(salary) DESC, department ASC."
        },
        {
          question: "Can ORDER BY use aliases?",
          answer: "Many SQL databases allow selected column aliases in ORDER BY. Check the database's rules for complex expressions and DISTINCT queries."
        },
        {
          question: "How do you use multiple-column sorting with LIMIT?",
          answer: "Define the desired sorting priority, include a tie-breaker when needed, and then apply LIMIT to return the requested number of rows."
        },
        {
          question: "How do you use multiple-column sorting with pagination?",
          answer: "Use a deterministic ORDER BY with pagination syntax or Pageable. For large datasets, consider whether keyset pagination is more suitable."
        },
        {
          question: "Does adding an index always eliminate sorting?",
          answer: "No. The optimizer may use an index when it is suitable, but the outcome depends on the query, index definition, and database execution plan."
        },
        {
          question: "How does Spring Data JPA support multiple sorting expressions?",
          answer: "Use Sort.by with multiple Sort.Order expressions or pass a sorted Pageable to a repository method."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "26. Quick Reference",
      bullets: [
        "Two columns: ORDER BY department ASC, salary DESC",
        "Three columns: ORDER BY department ASC, salary DESC, employee_id ASC",
        "Highest salaries: ORDER BY salary DESC, employee_id ASC",
        "Aggregate report: GROUP BY department ORDER BY average_salary DESC, department ASC",
        "Top ten: ORDER BY salary DESC, employee_id ASC LIMIT 10",
        "Pagination: ORDER BY department ASC, employee_id ASC LIMIT 10 OFFSET 10",
        "Custom priority: ORDER BY CASE ... END, created_at DESC, id ASC",
        "Spring Data: Sort.by(Sort.Order.asc(\"department\"), Sort.Order.desc(\"salary\"))",
        "Always verify property names, database syntax, and pagination requirements."
      ]
    },
    {
      id: "one-minute-answer",
      title: "27. Explain Multiple-Column Sorting in One Minute",
      paragraphs: [
        "Multiple-column sorting means using more than one expression in SQL ORDER BY. The first expression determines the primary order, and the next expression sorts rows tied on the previous expression. For example, ORDER BY department ASC, salary DESC sorts departments alphabetically and employees by salary from highest to lowest within each department. We can mix ASC and DESC, sort aggregate results, and combine sorting with LIMIT and pagination. For deterministic results, especially in pagination, we should add a unique tie-breaker. In Spring Data JPA, multiple sorting rules can be represented using Sort.Order objects or a sorted Pageable."
      ]
    },
    {
      id: "revision-notes",
      title: "28. Revision Notes",
      bullets: [
        "ORDER BY supports multiple columns and expressions.",
        "The first expression defines the primary sorting priority.",
        "Later expressions resolve ties in earlier expressions.",
        "ASC and DESC can be mixed in the same clause.",
        "A unique tie-breaker makes the ordering deterministic for a given dataset.",
        "GROUP BY and HAVING can be combined with multiple-column sorting.",
        "LIMIT and pagination should use a meaningful deterministic order.",
        "Database-specific NULL and collation behavior can affect sorting.",
        "Spring Data JPA supports multiple Sort.Order expressions and Pageable.",
        "Use execution plans to evaluate sorting performance and index usefulness."
      ]
    }
  ]
};
