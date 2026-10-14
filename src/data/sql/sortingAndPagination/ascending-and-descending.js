
export const ascendingAndDescending = {
  id: 2022,
  title: "Ascending and Descending Order",
  slug: "ascending-and-descending",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Understand ASC and DESC with numbers, names, dates, multiple columns, pagination, and practical Spring Data JPA examples.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "ascending",
      title: "1. Ascending Order",
      paragraphs: [
        "Ascending order arranges values from smaller to larger. For text values, it follows the database's collation and comparison rules.",
        "In SQL, ASC specifies ascending order. It is also the default direction when ORDER BY does not explicitly specify ASC or DESC.",
        "Ascending sorting is useful when displaying lower prices first, employee names alphabetically, or older records before newer records."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary ASC;`
      },
      output: `employee_name | salary
--------------+-------
Arun          | 30000
Priya         | 40000
Anu           | 50000
Ravi          | 65000`,
      bullets: [
        "ASC means ascending.",
        "Numbers generally move from smallest to largest.",
        "Dates generally move from earliest to latest.",
        "Text order depends on the database's collation rules.",
        "ORDER BY salary and ORDER BY salary ASC have the same direction."
      ]
    },
    {
      id: "descending",
      title: "2. Descending Order",
      paragraphs: [
        "Descending order arranges values from larger to smaller. In SQL, DESC specifies descending order.",
        "It is useful for finding the highest-paid employees, most expensive products, newest orders, or latest login activities."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;`
      },
      output: `employee_name | salary
--------------+-------
Ravi          | 65000
Anu           | 50000
Priya         | 40000
Arun          | 30000`,
      bullets: [
        "DESC means descending.",
        "Numbers generally move from largest to smallest.",
        "Dates generally move from latest to earliest.",
        "DESC does not filter records; it only specifies their order."
      ]
    },
    {
      id: "dates",
      title: "3. Sorting Dates",
      paragraphs: [
        "Sorting date or timestamp columns is useful for displaying the newest or oldest records first.",
        "Use ASC to show earlier dates first and DESC to show later dates first. Store dates using appropriate date/time data types so comparisons and sorting behave correctly.",
        "If multiple orders share the same timestamp, add another sorting column when a deterministic order is required."
      ],
      code: {
        language: "sql",
        code: `SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC;`
      },
      bullets: [
        "ASC places earlier dates first.",
        "DESC places later dates first.",
        "A secondary key helps resolve identical dates.",
        "A unique secondary key, such as order_id, makes the ordering deterministic for a given dataset."
      ]
    },
    {
      id: "numbers",
      title: "4. Sorting Numeric Values",
      paragraphs: [
        "Numeric columns can be sorted using ASC or DESC. For example, salary, product price, quantity, marks, and account balance can be sorted numerically.",
        "Make sure numeric data is stored using an appropriate numeric type. Sorting numbers stored as text can produce unexpected lexical ordering."
      ],
      code: {
        language: "sql",
        code: `SELECT product_name, price
FROM products
ORDER BY price ASC;`
      },
      bullets: [
        "ASC displays lower prices first.",
        "DESC displays higher prices first.",
        "Numeric types should be used for numeric values.",
        "Text values such as '100', '20', and '3' may not sort numerically when stored as strings."
      ]
    },
    {
      id: "text",
      title: "5. Sorting Names and Text",
      paragraphs: [
        "SQL can sort employee names, product names, city names, and department names alphabetically.",
        "The exact ordering of uppercase letters, lowercase letters, accents, and different languages depends on the database's collation and comparison rules."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name
FROM employees
ORDER BY employee_name ASC;`
      },
      bullets: [
        "ASC generally displays names in alphabetical order according to the applicable collation.",
        "DESC reverses the ordering.",
        "Case sensitivity is database- and collation-dependent.",
        "Verify collation settings when an application requires specific language or alphabetical sorting behavior."
      ]
    },
    {
      id: "default-direction",
      title: "6. What Happens When ASC or DESC Is Omitted?",
      paragraphs: [
        "When an ORDER BY expression has no explicit direction, SQL uses ascending order by default.",
        "Although the default is ascending, writing ASC explicitly can make the intended behavior easier to understand."
      ],
      code: {
        language: "sql",
        code: `-- Ascending by default
SELECT employee_name, salary
FROM employees
ORDER BY salary;

-- Explicit ascending order
SELECT employee_name, salary
FROM employees
ORDER BY salary ASC;`
      },
      bullets: [
        "Both queries request ascending salary order.",
        "DESC must be specified to request descending order.",
        "Without an ORDER BY clause, the database does not guarantee row order."
      ]
    },
    {
      id: "multiple-columns",
      title: "7. Sorting by Multiple Columns",
      paragraphs: [
        "SQL allows multiple expressions in ORDER BY. The first expression determines the primary order. The next expression sorts rows that have equal values for the previous expression.",
        "For example, an employee report can sort departments alphabetically and salaries from highest to lowest within each department."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`
      },
      bullets: [
        "First, employees are sorted by department.",
        "Within each department, higher salaries appear first.",
        "Each sorting column can use its own direction.",
        "The order of the expressions matters."
      ]
    },
    {
      id: "tie-breaker",
      title: "8. Sorting When Values Are Equal",
      paragraphs: [
        "If several records have the same value for the sort column, their relative order is not guaranteed unless additional ORDER BY expressions distinguish them.",
        "Adding a unique tie-breaker is particularly useful for ranking, reports, and pagination."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC;`
      },
      bullets: [
        "Salary determines the main order.",
        "Employee ID resolves ties between equal salaries.",
        "A unique tie-breaker makes the order deterministic for the same dataset.",
        "Concurrent inserts or updates can still change results between separate page requests."
      ]
    },
    {
      id: "where-order",
      title: "9. Combining WHERE with ASC and DESC",
      paragraphs: [
        "WHERE filters rows, while ORDER BY specifies the order of the rows that remain.",
        "This combination is common in reports and REST APIs because applications usually need to filter records before displaying them in a chosen order."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_name, salary
FROM employees
WHERE salary >= 40000
ORDER BY salary DESC;`
      },
      bullets: [
        "WHERE removes employees earning less than 40000.",
        "ORDER BY salary DESC sorts the remaining employees from highest to lowest salary.",
        "Filtering and sorting are different operations."
      ]
    },
    {
      id: "limit",
      title: "10. Combining ASC and DESC with LIMIT",
      paragraphs: [
        "LIMIT restricts the number of rows returned in MySQL and PostgreSQL. When combined with ORDER BY, it is useful for retrieving the highest or lowest values.",
        "Other databases may use different row-limiting syntax, so check the database dialect."
      ],
      code: {
        language: "sql",
        code: `-- Five highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 5;

-- Five lowest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary ASC, employee_id ASC
LIMIT 5;`
      },
      bullets: [
        "DESC with LIMIT returns the highest values first.",
        "ASC with LIMIT returns the lowest values first.",
        "A unique tie-breaker helps make the selection deterministic.",
        "LIMIT without a meaningful ORDER BY does not reliably identify the top or bottom records."
      ]
    },
    {
      id: "null-values",
      title: "11. ASC, DESC, and NULL Values",
      paragraphs: [
        "NULL represents missing or unknown data. The position of NULL values in sorted results depends on the database and sorting direction.",
        "PostgreSQL supports explicit NULLS FIRST and NULLS LAST syntax. MySQL can use an expression to place NULL values explicitly."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL: put missing commissions last
SELECT employee_name, commission
FROM employees
ORDER BY commission ASC NULLS LAST;

-- MySQL: put missing commissions last
SELECT employee_name, commission
FROM employees
ORDER BY commission IS NULL ASC, commission ASC;`
      },
      bullets: [
        "Check your database's default NULL ordering.",
        "PostgreSQL supports NULLS FIRST and NULLS LAST.",
        "The MySQL expression places non-NULL commissions first and NULL values last.",
        "Do not assume every database supports identical syntax."
      ]
    },
    {
      id: "group-by",
      title: "12. Sorting Aggregate Results",
      paragraphs: [
        "ASC and DESC can sort aggregate results such as COUNT, SUM, AVG, MIN, and MAX.",
        "This is useful for displaying departments with the highest average salary, products with the most sales, or categories with the most orders."
      ],
      code: {
        language: "sql",
        code: `SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC;`
      },
      bullets: [
        "GROUP BY creates one group for each department.",
        "AVG calculates the average salary in each group.",
        "DESC displays departments with higher averages first.",
        "Add another sort expression if groups with equal averages need a deterministic order."
      ]
    },
    {
      id: "pagination",
      title: "13. ASC and DESC with Pagination",
      paragraphs: [
        "Pagination returns a subset of rows instead of loading the entire result set. ORDER BY should be used to define the intended sequence of those rows.",
        "A unique tie-breaker helps prevent ambiguous ordering when multiple rows have the same primary sort value."
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
        "The query uses salary descending as the main order and employee ID ascending as a tie-breaker.",
        "Offset-based pages may shift when records are inserted or deleted between requests."
      ]
    },
    {
      id: "spring-data-sorting",
      title: "14. ASC and DESC in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA provides the Sort abstraction for expressing sorting in Java. Use Sort.Order.asc for ascending order and Sort.Order.desc for descending order.",
        "The property names generally refer to Java entity properties, not database column names. This example assumes the Employee entity contains salary and employeeId properties."
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
        "Sort.Order.asc(\"salary\") requests ascending salary order.",
        "Sort.Order.desc(\"salary\") requests descending salary order.",
        "Multiple Sort.Order expressions support secondary sorting.",
        "The repository must support the findAll(Sort) overload.",
        "For large datasets, use Pageable when pagination is also required."
      ]
    },
    {
      id: "derived-method",
      title: "15. ASC and DESC in Repository Method Names",
      paragraphs: [
        "Spring Data JPA supports derived query methods that express sorting in the method name.",
        "This approach works well for simple, fixed sorting requirements. The method uses Java entity property names."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findAllByOrderBySalaryAsc();

    List<Employee> findAllByOrderBySalaryDesc();

    List<Employee> findByDepartmentOrderBySalaryDesc(
        String department
    );
}`
      },
      bullets: [
        "findAllByOrderBySalaryAsc returns employees sorted by salary ascending.",
        "findAllByOrderBySalaryDesc returns employees sorted by salary descending.",
        "findByDepartmentOrderBySalaryDesc filters by department and sorts by salary descending.",
        "Use Sort or Pageable when clients need to choose sorting dynamically."
      ]
    },
    {
      id: "common-mistakes",
      title: "16. Common Mistakes",
      bullets: [
        "Confusing ASC with DESC.",
        "Expecting rows to be sorted when ORDER BY is missing.",
        "Assuming equal sort values have a guaranteed relative order.",
        "Using LIMIT without specifying the required ranking order.",
        "Assuming NULL values always appear first or always appear last.",
        "Sorting numeric values stored as text and expecting numeric ordering.",
        "Using database column names instead of entity property names in Spring Data JPA Sort.",
        "Allowing unvalidated client input to control arbitrary sorting properties.",
        "Ignoring the cost of sorting large result sets.",
        "Using pagination without a deterministic ordering."
      ]
    },
    {
      id: "best-practices",
      title: "17. Best Practices",
      bullets: [
        "Use ORDER BY whenever the result sequence matters.",
        "Write ASC or DESC explicitly when it improves readability.",
        "Add a unique tie-breaker for stable ranking and pagination.",
        "Use proper numeric and date/time column types.",
        "Check the database's collation and NULL-ordering behavior.",
        "Use LIMIT or suitable pagination when only a subset is needed.",
        "Validate dynamic sorting fields and directions in REST APIs.",
        "Use EXPLAIN or the relevant query-plan tool to investigate slow queries.",
        "Choose indexes based on real query patterns and execution plans.",
        "In Spring Data JPA, ensure Sort properties match entity properties."
      ]
    },
    {
      id: "practice",
      title: "18. Practice Exercises",
      paragraphs: [
        "Assume you have employees(employee_id, employee_name, department, salary, hire_date) and orders(order_id, order_date). Write queries for these tasks."
      ],
      bullets: [
        "Exercise 1: Display employees from the lowest salary to the highest.",
        "Exercise 2: Display employees from the highest salary to the lowest.",
        "Exercise 3: Display the five highest-paid employees.",
        "Exercise 4: Sort employees by department ascending and salary descending.",
        "Exercise 5: Display the newest orders first.",
        "Exercise 6: Display departments by average salary, highest average first.",
        "Exercise 7: Return ten employees for the second page, sorted by employee ID.",
        "Exercise 8: Display employees with missing commissions last in MySQL."
      ]
    },
    {
      id: "practice-solutions",
      title: "19. Practice Exercise Solutions",
      code: {
        language: "sql",
        code: `-- Exercise 1: Lowest salary first
SELECT employee_name, salary
FROM employees
ORDER BY salary ASC;

-- Exercise 2: Highest salary first
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC;

-- Exercise 3: Five highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 5;

-- Exercise 4: Department and salary
SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC;

-- Exercise 5: Newest orders first
SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC;

-- Exercise 6: Highest average salary by department
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
ORDER BY average_salary DESC, department ASC;

-- Exercise 7: Second page of ten employees
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Exercise 8: NULL commissions last in MySQL
SELECT employee_name, commission
FROM employees
ORDER BY commission IS NULL ASC, commission ASC;`
      },
      bullets: [
        "The LIMIT and OFFSET examples use MySQL/PostgreSQL syntax.",
        "The queries assume the named tables and columns exist.",
        "The unique ID columns provide deterministic tie-breaking for the examples.",
        "The NULL-ordering expression in Exercise 8 is MySQL-compatible."
      ]
    },
    {
      id: "interview",
      title: "20. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does ASC mean?",
          answer: "ASC means ascending order. It generally sorts numbers from smallest to largest and dates from earliest to latest."
        },
        {
          question: "What does DESC mean?",
          answer: "DESC means descending order. It generally sorts numbers from largest to smallest and dates from latest to earliest."
        },
        {
          question: "What is the default sort direction?",
          answer: "Ascending order is the default when ORDER BY does not specify ASC or DESC."
        },
        {
          question: "What is the difference between ASC and DESC?",
          answer: "ASC sorts in ascending order, while DESC sorts in descending order."
        },
        {
          question: "How do you retrieve the newest orders first?",
          answer: "Use ORDER BY order_date DESC. Add a unique secondary sort key, such as order_id, when deterministic ordering is required."
        },
        {
          question: "How do you find the five highest-paid employees?",
          answer: "Use ORDER BY salary DESC with LIMIT 5 in MySQL or PostgreSQL. Add a unique tie-breaker such as employee_id."
        },
        {
          question: "Can we sort by multiple columns?",
          answer: "Yes. SQL sorts by the first expression and uses later expressions to resolve ties. Each expression can have its own direction."
        },
        {
          question: "What happens when ORDER BY is omitted?",
          answer: "The database does not guarantee a particular row order."
        },
        {
          question: "Can we use ASC or DESC with GROUP BY?",
          answer: "Yes. GROUP BY forms groups, and ORDER BY sorts the grouped results, including results calculated with aggregate functions."
        },
        {
          question: "How does sorting work with NULL values?",
          answer: "NULL ordering depends on the database and sort direction. Use database-supported syntax or an expression to place NULL values explicitly."
        },
        {
          question: "How do you sort records in Spring Data JPA?",
          answer: "Use Sort.Order.asc or Sort.Order.desc, a derived query method, or Pageable when sorting and pagination are both needed."
        },
        {
          question: "Why should pagination use a unique tie-breaker?",
          answer: "A unique tie-breaker resolves equal sort values and gives the result a deterministic order for a given dataset. Concurrent changes can still affect later page requests."
        },
        {
          question: "Can an index improve ORDER BY performance?",
          answer: "Yes, a suitable index may help the database produce rows in the required order. The actual benefit depends on the query and execution plan."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "21. Quick Reference",
      bullets: [
        "Ascending: ORDER BY salary ASC",
        "Descending: ORDER BY salary DESC",
        "Ascending is the default when the direction is omitted.",
        "Multiple columns: ORDER BY department ASC, salary DESC",
        "Newest orders: ORDER BY order_date DESC, order_id DESC",
        "Highest-paid employees: ORDER BY salary DESC, employee_id ASC LIMIT 5",
        "Stable pagination: use ORDER BY with a unique tie-breaker.",
        "Spring Data ascending: Sort.Order.asc(\"salary\")",
        "Spring Data descending: Sort.Order.desc(\"salary\")",
        "Spring Data pagination: PageRequest.of(page, size, sort)"
      ]
    },
    {
      id: "one-minute-answer",
      title: "22. Explain ASC and DESC in One Minute",
      paragraphs: [
        "ASC and DESC are sorting directions used with SQL ORDER BY. ASC means ascending order and is the default, while DESC means descending order. We use ASC to show lower prices or older dates first, and DESC to show higher prices or newer dates first. We can combine multiple sorting columns, use ORDER BY with LIMIT for top-N queries, and use it with pagination. For predictable results, especially when sort values are equal, we should add a unique tie-breaker. In Spring Data JPA, we can implement sorting using Sort or Pageable."
      ]
    },
    {
      id: "revision-notes",
      title: "23. Revision Notes",
      bullets: [
        "ASC = ascending; DESC = descending.",
        "ORDER BY is required when a particular row order matters.",
        "Ascending order is the default direction.",
        "Multiple sort expressions are evaluated from left to right.",
        "Date, numeric, and text sorting depend on appropriate data types and comparison rules.",
        "NULL ordering differs between database systems.",
        "Use LIMIT with ORDER BY for top-N queries in MySQL and PostgreSQL.",
        "Use a unique tie-breaker for deterministic sorting and pagination.",
        "Spring Data JPA supports Sort, Pageable, and derived sorting methods.",
        "Inspect query plans when sorting performance is poor."
      ]
    }
  ]
};
