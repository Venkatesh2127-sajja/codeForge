
export const paginationFundamentals = {
  id: 2027,
  title: "Pagination Fundamentals",
  slug: "pagination-fundamentals",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Master SQL pagination, page and offset calculations, Spring Data JPA, REST API pagination, Page versus Slice, keyset pagination, performance optimization, practical exercises, and interview questions.",
  estimatedTime: "60 min",
  sections: [
    {
      id: "pagination",
      title: "1. What Is Pagination?",
      paragraphs: [
        "Pagination is the process of dividing a large collection of records into smaller portions called pages. Instead of retrieving every employee, product, order, or transaction in one request, an application retrieves only the records needed for the current page.",
        "Suppose an employee table contains 10,000 records. Returning every record in one API response can increase database work, response size, network traffic, memory consumption, and frontend rendering time. With a page size of 10, the client can retrieve ten employees at a time.",
        "Pagination normally combines ordering, a page size, and a position. SQL databases can implement offset pagination with LIMIT and OFFSET, while Spring Data JPA provides Pageable, PageRequest, Page, and Slice abstractions.",
        "Pagination is useful in admin dashboards, product catalogs, transaction histories, employee directories, search results, audit logs, and reporting screens.",
        "Pagination reduces the amount of data returned by each request, but it does not automatically make every query fast. A database may still scan, filter, sort, or count many rows before producing a page."
      ],
      code: {
        language: "text",
        code: `Example: 25 employee records

Page size = 10

Page 1 -> Employees 1 through 10
Page 2 -> Employees 11 through 20
Page 3 -> Employees 21 through 25

Total records = 25
Total pages = ceil(25 / 10) = 3`
      },
      bullets: [
        "A page number identifies which page the client wants.",
        "Page size specifies the maximum number of records requested per page.",
        "ORDER BY defines the order in which records are arranged.",
        "LIMIT controls how many rows are returned in supported SQL dialects.",
        "OFFSET specifies how many rows to skip before returning the requested rows.",
        "Spring Data JPA uses zero-based page indexes.",
        "A backend should validate page indexes and enforce a maximum page size.",
        "Use a deterministic sort order so that pagination results are predictable."
      ]
    },
    {
      id: "calculation",
      title: "2. Calculate OFFSET and Total Pages",
      paragraphs: [
        "OFFSET determines how many rows the database skips before returning a page. For a one-based page number, the formula is offset = (pageNumber - 1) * pageSize.",
        "For example, page 1 with a size of 10 starts at offset 0. Page 2 starts at offset 10, and page 3 starts at offset 20.",
        "Spring Data JPA uses a different numbering convention: page indexes start at zero. Therefore, PageRequest.of(0, 10) requests the first page, while PageRequest.of(1, 10) requests the second page.",
        "The total number of pages can be calculated using ceil(totalElements / pageSize). In integer arithmetic, a common safe formula for non-negative counts and a positive page size is totalPages = totalElements / pageSize + (totalElements % pageSize == 0 ? 0 : 1).",
        "The backend must validate the page size before using these formulas. A page size of zero causes division-by-zero problems when calculating page counts, and negative values are not meaningful pagination requests."
      ],
      code: {
        language: "text",
        code: `One-based API page numbers:

Page number = 1
Page size = 10
OFFSET = (1 - 1) * 10 = 0

Page number = 2
Page size = 10
OFFSET = (2 - 1) * 10 = 10

Page number = 3
Page size = 10
OFFSET = (3 - 1) * 10 = 20

Zero-based Spring Data page indexes:

Page index = 0 -> OFFSET 0
Page index = 1 -> OFFSET 10
Page index = 2 -> OFFSET 20

Total-page calculation:

Total records = 25
Page size = 10
Total pages = ceil(25 / 10) = 3

Total records = 20
Page size = 10
Total pages = ceil(20 / 10) = 2

Total records = 0
Page size = 10
Total pages = 0`
      },
      bullets: [
        "One-based page 1 corresponds to zero-based page index 0.",
        "For a fixed page size, each next page increases the offset by the page size.",
        "The last page may contain fewer records than the requested page size.",
        "An empty result set has zero total pages when page size is positive.",
        "Do not mix client page numbering with the backend's page-index convention.",
        "Use integer arithmetic carefully when calculating page counts."
      ]
    },
    {
      id: "query",
      title: "3. SQL Pagination Example",
      paragraphs: [
        "MySQL and PostgreSQL support LIMIT and OFFSET for retrieving a particular portion of an ordered result set.",
        "LIMIT 10 requests at most ten rows. OFFSET 10 skips the first ten rows in the ordered result and returns the next ten, if available.",
        "ORDER BY is essential for predictable pagination. Without an explicit order, SQL does not guarantee that the same records will appear in the same positions between requests.",
        "A unique tie-breaker is useful when the primary sort column contains duplicate values. For example, ordering by salary DESC and employee_id ASC creates a stable order if employee_id is unique.",
        "The following queries demonstrate three pages of ten employees each. They assume employee_id uniquely identifies every employee."
      ],
      code: {
        language: "sql",
        code: `-- First page: rows 1 through 10
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;

-- Second page: rows 11 through 20
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Third page: rows 21 through 30
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "LIMIT 10 returns at most ten rows.",
        "OFFSET 0 skips no rows.",
        "OFFSET 10 skips ten rows before returning the next page.",
        "The last page can contain fewer than ten rows.",
        "MySQL and PostgreSQL support this syntax.",
        "Other database products may use different pagination syntax.",
        "Use prepared statements or parameterized query mechanisms when pagination values are supplied by application users."
      ]
    },
    {
      id: "backend",
      title: "4. Pagination in Spring Boot with Spring Data JPA",
      paragraphs: [
        "Spring Data JPA provides pagination through the Pageable abstraction. PageRequest is a common implementation that specifies a zero-based page index, page size, and optional sorting.",
        "A repository method can accept Pageable to retrieve a page without requiring the developer to manually write LIMIT and OFFSET in every query.",
        "Page<T> contains the current page's content and pagination metadata, such as total elements and total pages. Obtaining the total count can require an additional count query.",
        "The sort property passed to Sort.by must match a Java entity property. If the entity field is employeeId, use Sort.by(\"employeeId\"), even if the mapped database column is employee_id.",
        "The following example assumes an Employee entity and an EmployeeRepository that extends JpaRepository<Employee, Long>. It illustrates the pagination operation in a service or application method."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

int page = 0;
int size = 10;

Pageable pageable = PageRequest.of(
    page,
    size,
    Sort.by("employeeId").ascending()
);

Page<Employee> result =
    employeeRepository.findAll(pageable);

List<Employee> employees = result.getContent();

int currentPage = result.getNumber();
int pageSize = result.getSize();
long totalElements = result.getTotalElements();
int totalPages = result.getTotalPages();

boolean hasNext = result.hasNext();
boolean hasPrevious = result.hasPrevious();`
      },
      bullets: [
        "PageRequest.of(0, 10) requests the first page of ten items.",
        "PageRequest.of(1, 10) requests the second page.",
        "getContent() returns the current page's records.",
        "getTotalElements() returns the total number of matching records.",
        "getTotalPages() returns the total page count.",
        "hasNext() indicates whether another page exists.",
        "hasPrevious() indicates whether a previous page exists.",
        "Use Slice when total-count metadata is unnecessary.",
        "Validate the requested page size before creating PageRequest."
      ]
    },
    {
      id: "api-example",
      title: "5. Build a Paginated REST API",
      paragraphs: [
        "A REST API can expose pagination through query parameters. For example, GET /api/employees?page=0&size=10 requests the first ten employees when the API uses zero-based indexes.",
        "The controller should validate the request before calling the service. In this example, page must be zero or greater, and size must be between 1 and 100.",
        "The service layer performs the repository call and owns the application-level retrieval logic. The controller is responsible for handling HTTP input and returning the response.",
        "This example returns Page<Employee> for learning purposes. A production application should generally map entities to DTOs to control the API contract and avoid exposing persistence-specific details.",
        "IllegalArgumentException is used here to keep the example short. In a production API, a dedicated validation exception and global exception handler should convert invalid input into a consistent HTTP 400 response."
      ],
      code: {
        language: "java",
        code: `// EmployeeService.java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Page<Employee> getEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
}

// EmployeeController.java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Page<Employee>> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (page < 0) {
            throw new IllegalArgumentException(
                "Page must be zero or greater"
            );
        }

        if (size < 1 || size > 100) {
            throw new IllegalArgumentException(
                "Size must be between 1 and 100"
            );
        }

        Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by("employeeId").ascending()
        );

        Page<Employee> result =
            employeeService.getEmployees(pageable);

        return ResponseEntity.ok(result);
    }
}`
      },
      bullets: [
        "The controller accepts page and size as query parameters.",
        "The service delegates the pagination request to the repository.",
        "The repository performs the database query.",
        "The maximum page size of 100 is an example policy, not a universal rule.",
        "A global exception handler should return a consistent error structure.",
        "If client-controlled sorting is supported, allowlist valid entity properties instead of accepting arbitrary sort expressions.",
        "For larger APIs, use DTOs for response content and metadata."
      ]
    },
    {
      id: "response-shape",
      title: "6. Understand the Paginated API Response",
      paragraphs: [
        "A paginated response commonly contains the current page's records together with metadata describing the page and the complete matching result set.",
        "A custom response DTO provides a stable API structure and allows the backend to expose only the metadata that the frontend needs.",
        "The JSON below is an illustrative custom response shape. It is not a guarantee of the default JSON serialization produced by returning Spring Data's Page directly.",
        "If total counts are expensive or unnecessary, a response can omit totalElements and totalPages and return only the items, page information, and a hasNext indicator."
      ],
      code: {
        language: "json",
        code: `{
  "content": [
    {
      "employeeId": 101,
      "employeeName": "Anita",
      "salary": 45000
    },
    {
      "employeeId": 102,
      "employeeName": "Rahul",
      "salary": 50000
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 25,
  "totalPages": 3,
  "hasNext": true
}`
      },
      bullets: [
        "content contains the records returned for the current page.",
        "page is the zero-based page index in this example.",
        "size is the requested page size.",
        "totalElements is the total number of matching records.",
        "totalPages is the number of pages based on the total count and page size.",
        "hasNext indicates whether another page is available.",
        "The final page may contain fewer records than the requested size.",
        "Define and document the response structure so frontend code can consume it consistently."
      ]
    },
    {
      id: "page-vs-slice",
      title: "7. Page vs Slice vs List",
      paragraphs: [
        "Spring Data repository methods can return different result types depending on the information the application needs.",
        "Page<T> includes the current content and total-count metadata. The total number of matching records may require a count query, which can add database work.",
        "Slice<T> provides the current portion of results and indicates whether more results exist, without requiring the complete total-page count. The repository may retrieve an extra row to determine whether another slice exists.",
        "List<T> returns records but does not automatically provide page metadata. When a repository method accepts Pageable and returns a List, it can still limit the records to the requested page.",
        "Choose the return type according to the UI and workload. A numbered pagination control may need total-page metadata, while an infinite-scroll interface may only need to know whether more data is available."
      ],
      code: {
        language: "java",
        code: `// Page: content and total-count metadata
Page<Employee> pageResult =
    employeeRepository.findAll(pageable);

long total = pageResult.getTotalElements();
int pages = pageResult.getTotalPages();

// Slice: content and next-slice information
Slice<Employee> sliceResult =
    employeeRepository.findByDepartmentId(10L, pageable);

boolean moreAvailable = sliceResult.hasNext();

// List: content only, when used with a Pageable repository method
List<Employee> employeeList =
    employeeRepository.findByDepartmentId(10L, pageable);`
      },
      bullets: [
        "Use Page<T> when total counts and page numbers are required.",
        "Use Slice<T> when the UI needs next/previous navigation without total counts.",
        "Use List<T> when the content is enough and the repository method supports the requested paging.",
        "The repository must declare compatible methods for the chosen return type.",
        "Page can incur extra count-query cost depending on the query and provider.",
        "Do not assume Slice guarantees zero extra database work; it may fetch an extra record to determine hasNext."
      ]
    },
    {
      id: "repository",
      title: "8. Repository Methods for Pagination",
      paragraphs: [
        "Spring Data JPA repositories support paging through methods that accept Pageable. JpaRepository already provides findAll(Pageable), while custom derived queries can also accept Pageable.",
        "For example, findByDepartmentId(10L, pageable) returns employees matching a department within the requested page. The property name in a derived query must match the Java entity property.",
        "A custom JPQL query can also accept Pageable when the query and return type support paging. Complex native queries may require an explicit count query if Spring Data cannot derive one reliably.",
        "Keep sorting properties aligned with entity property names and avoid exposing unrestricted client-controlled sorting."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Page<Employee> findByDepartmentId(
        Long departmentId,
        Pageable pageable
    );

    Slice<Employee> findBySalaryGreaterThanEqual(
        java.math.BigDecimal minimumSalary,
        Pageable pageable
    );
}`
      },
      bullets: [
        "findAll(Pageable) is available through JpaRepository.",
        "Derived query methods can accept Pageable.",
        "Page<T> supports total-page metadata.",
        "Slice<T> supports navigation without requiring a total count.",
        "Use a custom @Query when a derived method cannot express the query clearly.",
        "For complicated native SQL, verify the count query and pagination behavior.",
        "A sort field should match an entity property, not simply a database column name."
      ]
    },
    {
      id: "frontend-integration",
      title: "9. Pagination from a React Frontend",
      paragraphs: [
        "A frontend normally stores the current page and page size in component state. When the user moves to another page, React sends a new HTTP request containing those values.",
        "In this example, the UI uses one-based page numbers while the Spring Boot API expects zero-based indexes. The frontend converts the page number by subtracting one when constructing the request.",
        "The example assumes the backend returns the custom response structure shown earlier, with content, totalPages, and related metadata. Adjust the property names to match your actual API response.",
        "For a production component, also handle loading states, request failures, empty results, and overlapping requests."
      ],
      code: {
        language: "javascript",
        code: `import { useEffect, useState } from "react";

export default function EmployeeList() {
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          \`/api/employees?page=\${page - 1}&size=\${size}\`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load employees");
        }

        const data = await response.json();

        setEmployees(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEmployees();

    return () => controller.abort();
  }, [page, size]);

  return (
    <div>
      <h2>Employees</h2>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && employees.length === 0 && (
        <p>No employees found.</p>
      )}

      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeId}>
            {employee.employeeName} - {employee.salary}
          </li>
        ))}
      </ul>

      <button
        disabled={page <= 1 || loading}
        onClick={() => setPage((current) => current - 1)}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages || loading || totalPages === 0}
        onClick={() => setPage((current) => current + 1)}
      >
        Next
      </button>
    </div>
  );
}`
      },
      bullets: [
        "React page state is one-based in this example.",
        "The API request converts the UI page to a zero-based index.",
        "Changing page triggers a new request through useEffect.",
        "AbortController helps cancel an outdated request when the component changes pages or unmounts.",
        "The frontend must match the actual response structure returned by the backend.",
        "Backend validation remains necessary even when the frontend disables invalid navigation buttons."
      ]
    },
    {
      id: "postman-testing",
      title: "10. Test Pagination with Postman",
      paragraphs: [
        "Postman can verify pagination independently of the frontend. Send GET requests with different page and size values and compare the returned records.",
        "Assuming the controller uses zero-based indexes and defaults to page 0 and size 10, the first request returns the first ten records, while page 1 returns the next ten.",
        "Test normal requests, boundary conditions, invalid parameters, and datasets with fewer rows than the requested page size."
      ],
      code: {
        language: "text",
        code: `GET http://localhost:8080/api/employees?page=0&size=10
Expected: First page of at most 10 employees

GET http://localhost:8080/api/employees?page=1&size=10
Expected: Second page of at most 10 employees

GET http://localhost:8080/api/employees?page=0&size=5
Expected: First page of at most 5 employees

GET http://localhost:8080/api/employees?page=0&size=100
Expected: Allowed maximum page size

GET http://localhost:8080/api/employees?page=-1&size=10
Expected: HTTP 400 after validation errors are mapped

GET http://localhost:8080/api/employees?page=0&size=101
Expected: HTTP 400 after validation errors are mapped`
      },
      bullets: [
        "Verify that the first and second pages contain the expected records.",
        "Check that page size changes the number of returned records.",
        "Check the empty-page behavior when the requested index is beyond the available records.",
        "Verify the response metadata and total counts.",
        "Confirm that invalid input produces a documented error response.",
        "The HTTP 400 expectations depend on configuring the exception handling described earlier."
      ]
    },
    {
      id: "common-mistakes",
      title: "11. Common Pagination Mistakes",
      paragraphs: [
        "Pagination errors often arise from incorrect page-number conversion, unstable sorting, missing validation, or assumptions about how data changes between requests.",
        "A query can execute successfully and still return confusing results if the ordering or page boundaries do not match the application's requirements."
      ],
      bullets: [
        "Forgetting ORDER BY and expecting the same records on every request.",
        "Mixing one-based frontend pages with zero-based Spring Data page indexes.",
        "Allowing negative page values or zero and negative page sizes.",
        "Allowing an unlimited page size and creating large database responses.",
        "Sorting by a non-unique column without a unique tie-breaker.",
        "Assuming LIMIT and OFFSET guarantee fast execution for large offsets.",
        "Returning every entity field when a DTO would be more appropriate.",
        "Assuming every page request sees a consistent snapshot while rows are changing.",
        "Using a page index beyond the final page without defining the expected empty-result behavior.",
        "Allowing arbitrary sort property names from clients without validation.",
        "Assuming Page, Slice, and List provide identical metadata.",
        "Forgetting to reset the current page when a frontend filter changes and the old page is no longer valid."
      ]
    },
    {
      id: "performance",
      title: "12. Offset Pagination vs Keyset Pagination",
      paragraphs: [
        "Offset pagination is straightforward and supports numbered page navigation. However, a large OFFSET can be expensive because the database may need to process or walk past many earlier rows before returning the requested page.",
        "Keyset pagination, also called cursor pagination, continues from the last-seen sort key. Instead of saying skip 10,000 rows, the request says continue after a known record.",
        "For example, if the result is ordered by a unique employee_id, the next page can request employee_id values greater than the last ID received. An appropriate index can make this efficient.",
        "For a composite order such as salary DESC and employee_id ASC, the cursor condition must reflect both sort keys. Using only the salary or only the employee ID can skip or repeat records.",
        "Keyset pagination is well suited to sequential navigation through large datasets, but it does not naturally provide arbitrary page-number navigation or total-page counts. Offset pagination remains useful when users need numbered pages.",
        "Neither approach automatically guarantees a transactionally consistent snapshot across multiple HTTP requests. Choose a strategy based on the application's consistency and navigation requirements."
      ],
      code: {
        language: "sql",
        code: `-- Offset pagination
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10000;

-- Keyset pagination
-- Assume the last employee_id received was 11000
SELECT employee_id, employee_name
FROM employees
WHERE employee_id > 11000
ORDER BY employee_id ASC
LIMIT 10;

-- Keyset pagination with a composite sort
-- Sort by salary DESC, then employee_id ASC
SELECT employee_id, employee_name, salary
FROM employees
WHERE salary < 80000
   OR (salary = 80000 AND employee_id > 102)
ORDER BY salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "Offset pagination is simple and supports direct page-number navigation.",
        "Keyset pagination continues after the last-seen sort key.",
        "Keyset pagination can be more efficient for deep sequential navigation with suitable indexes.",
        "The continuation condition must match the complete sort order.",
        "Use a unique tie-breaker to make the ordering deterministic.",
        "A cursor can become invalid or less useful if the underlying sort values change.",
        "Choose based on navigation needs, query performance, and consistency requirements."
      ]
    },
    {
      id: "pagination-indexing",
      title: "13. Pagination Performance and Indexing",
      paragraphs: [
        "Indexes can improve pagination when they support the query's filtering and ordering pattern. For example, an employee listing filtered by department and ordered by employee ID may benefit from an index that starts with department_id and then employee_id.",
        "The correct index depends on the database engine, table size, filters, selectivity, ordering, existing indexes, and query plan. A composite index should be based on observed workload rather than added automatically.",
        "Use EXPLAIN to inspect the database's query plan. Benchmark representative data volumes because a query that performs well on a small development table may perform differently in production.",
        "Page<T> can also require a count query to determine the total number of matching records. For expensive queries, consider whether the UI genuinely needs an exact total count or whether Slice or cursor-based navigation would be sufficient."
      ],
      code: {
        language: "sql",
        code: `-- Inspect a query plan in MySQL or PostgreSQL
EXPLAIN
SELECT employee_id, employee_name
FROM employees
WHERE department_id = 10
ORDER BY employee_id ASC
LIMIT 10 OFFSET 100;

-- Example index for this access pattern
CREATE INDEX idx_employee_department_id
ON employees (department_id, employee_id);`
      },
      bullets: [
        "Use EXPLAIN to inspect how the database executes the query.",
        "Align indexes with frequently used filters and ordering columns.",
        "Avoid creating duplicate or unnecessary indexes.",
        "Indexes consume storage and can increase write costs.",
        "LIMIT reduces returned rows but does not guarantee that only those rows are examined.",
        "Measure performance using realistic data and representative queries.",
        "Consider the cost of total-count queries when using Page<T>."
      ]
    },
    {
      id: "practice-beginner",
      title: "14. Practice Problems — Beginner",
      paragraphs: [
        "Use an employees table containing employee_id, employee_name, department_id, and salary. Assume employee_id uniquely identifies every employee.",
        "Try to solve each problem before checking the solutions. Focus on identifying the correct page index, page size, ordering, and filtering conditions."
      ],
      bullets: [
        "Problem 1: Retrieve the first ten employees ordered by employee ID.",
        "Problem 2: Retrieve the second page when the page size is ten.",
        "Problem 3: Retrieve the first five highest-paid employees.",
        "Problem 4: Retrieve employees from department 10, ordered by employee ID, with five records per page.",
        "Problem 5: Calculate the total page count when 47 records are returned in pages of ten.",
        "Problem 6: Explain why page index 0 is the first page in Spring Data JPA."
      ]
    },
    {
      id: "practice-solutions",
      title: "15. Practice Solutions — Beginner",
      paragraphs: [
        "The following queries demonstrate the expected SQL patterns. Adjust table and column names to match your database."
      ],
      code: {
        language: "sql",
        code: `-- Problem 1: First ten employees
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;

-- Problem 2: Second page of ten
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Problem 3: Five highest-paid employees
SELECT employee_id, employee_name, salary
FROM employees
ORDER BY salary DESC, employee_id ASC
LIMIT 5;

-- Problem 4: Department 10, first page of five
SELECT employee_id, employee_name
FROM employees
WHERE department_id = 10
ORDER BY employee_id ASC
LIMIT 5 OFFSET 0;

-- Problem 5: Total page count
-- ceil(47 / 10) = 5 pages`
      },
      bullets: [
        "Problem 1 returns at most ten employees.",
        "Problem 2 skips ten ordered records before returning the next ten.",
        "Problem 3 sorts by salary and uses employee_id to resolve ties.",
        "Problem 4 filters by department before returning the requested page.",
        "Problem 5 requires five pages because the final page contains the remaining seven records.",
        "Problem 6: Spring Data uses zero-based indexes, so page 0 means the first page."
      ]
    },
    {
      id: "practice-intermediate",
      title: "16. Practice Problems — Intermediate",
      paragraphs: [
        "These exercises combine pagination with Spring Data JPA, validation, and query performance. They resemble tasks that appear in backend development and technical interviews."
      ],
      bullets: [
        "Problem 1: Write a repository method that returns a Page of employees belonging to a department.",
        "Problem 2: Design a REST endpoint accepting page and size query parameters.",
        "Problem 3: Explain why the backend should limit page size even if the frontend already has a maximum.",
        "Problem 4: Choose between Page and Slice for an infinite-scroll interface.",
        "Problem 5: Explain why a large OFFSET can be expensive and describe a keyset alternative.",
        "Problem 6: Explain what can happen when a record is inserted between two offset-based page requests.",
        "Problem 7: Describe how you would test invalid page and size parameters in Postman."
      ]
    },
    {
      id: "practice-intermediate-solutions",
      title: "17. Practice Solutions — Intermediate",
      paragraphs: [
        "The following examples show common implementation patterns. The entity, repository, and application configuration must exist in the actual Spring Boot project."
      ],
      code: {
        language: "java",
        code: `// Repository method
Page<Employee> findByDepartmentId(
    Long departmentId,
    Pageable pageable
);

// Create a pageable request
Pageable pageable = PageRequest.of(
    0,
    10,
    Sort.by("employeeId").ascending()
);

// Execute a paginated query
Page<Employee> employees =
    employeeRepository.findByDepartmentId(10L, pageable);

// Read page metadata
long totalElements = employees.getTotalElements();
int totalPages = employees.getTotalPages();
boolean hasNext = employees.hasNext();

// Validate request parameters before PageRequest creation
if (page < 0) {
    throw new IllegalArgumentException("Invalid page");
}

if (size < 1 || size > 100) {
    throw new IllegalArgumentException("Invalid page size");
}`
      },
      bullets: [
        "Problem 1: Accept Pageable in a repository query method and return Page<Employee>.",
        "Problem 2: Accept page and size with request parameters, validate them, then construct PageRequest.",
        "Problem 3: Backend validation is required because clients can bypass frontend controls.",
        "Problem 4: Slice is often suitable for infinite scrolling when exact total counts are unnecessary.",
        "Problem 5: Keyset pagination continues after a last-seen key instead of skipping a large offset.",
        "Problem 6: Insertions and deletions can shift page boundaries, producing repeated or skipped records.",
        "Problem 7: Test normal requests, negative page indexes, zero page sizes, oversized page sizes, and out-of-range pages."
      ]
    },
    {
      id: "interview",
      title: "18. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is pagination?",
          answer: "Pagination divides a large result set into smaller pages so clients can retrieve and display records incrementally."
        },
        {
          question: "How do you calculate OFFSET?",
          answer: "For a one-based page number, offset = (pageNumber - 1) * pageSize. For page 3 with size 10, the offset is 20."
        },
        {
          question: "Is Spring Data JPA page numbering zero-based?",
          answer: "Yes. PageRequest.of(0, 10) requests the first page containing up to ten items."
        },
        {
          question: "What is the difference between LIMIT and OFFSET?",
          answer: "LIMIT controls the maximum number of returned rows, while OFFSET specifies how many rows to skip before returning results."
        },
        {
          question: "Why is ORDER BY important for pagination?",
          answer: "ORDER BY defines the result order. Without it, the database does not guarantee a predictable ordering between requests."
        },
        {
          question: "What are Pageable and PageRequest?",
          answer: "Pageable describes pagination and sorting information. PageRequest is a common implementation created with a zero-based page index, page size, and optional sorting."
        },
        {
          question: "What information does Page<T> provide?",
          answer: "Page<T> provides the current content and metadata such as page number, page size, total elements, total pages, and navigation indicators."
        },
        {
          question: "What is the difference between Page and Slice?",
          answer: "Page provides total-count and total-page metadata, which may require a count query. Slice focuses on the current portion and whether more results are available."
        },
        {
          question: "Why should page size be limited?",
          answer: "A maximum page size helps protect database, memory, network, and response-time resources from excessively large requests."
        },
        {
          question: "Why does Spring Data JPA use zero-based page indexes?",
          answer: "It follows the common programming convention that indexes begin at zero. The first page is index 0, the second is index 1, and so on."
        },
        {
          question: "What is keyset pagination?",
          answer: "Keyset pagination uses the last-seen sort key as a cursor to retrieve subsequent records rather than skipping a large number of rows with OFFSET."
        },
        {
          question: "What is the difference between offset and keyset pagination?",
          answer: "Offset pagination supports page-number navigation but can become expensive for large offsets. Keyset pagination can be more efficient for sequential navigation but does not naturally support arbitrary page numbers."
        },
        {
          question: "What happens if records change between page requests?",
          answer: "Inserted or deleted rows can shift offset-based page boundaries, causing repeated or skipped records. A suitable cursor strategy can reduce this problem for sequential navigation."
        },
        {
          question: "Why can Page<T> require an additional query?",
          answer: "The repository may need a count query to determine the total number of matching records and calculate the total pages."
        },
        {
          question: "Should a Spring Boot controller return a JPA entity directly?",
          answer: "A DTO is generally preferable for production APIs because it controls exposed fields and separates the public API contract from the persistence model."
        },
        {
          question: "How do you prevent users from requesting too many records?",
          answer: "Validate the page size on the backend and enforce a configured maximum before constructing the pagination request."
        },
        {
          question: "How do you paginate records filtered by department?",
          answer: "Use a repository method such as findByDepartmentId(departmentId, pageable), then pass the requested page and sorting information."
        },
        {
          question: "Does LIMIT guarantee that the database reads only N rows?",
          answer: "No. The database may need to scan, filter, or sort many rows before returning the limited result. Indexes and execution plans influence performance."
        },
        {
          question: "When is Slice preferable to Page?",
          answer: "Slice is useful when an application needs next-page navigation but does not need the total number of matching records."
        }
      ]
    },
    {
      id: "revision",
      title: "19. Quick Revision and Key Takeaways",
      paragraphs: [
        "Pagination is a fundamental technique for building responsive database-backed applications. SQL controls which portion of an ordered result is returned, while Spring Data JPA provides abstractions for implementing pagination in a backend service.",
        "The most important decisions are the page-number convention, page size, deterministic ordering, response metadata, and whether offset or cursor-based navigation suits the workload."
      ],
      bullets: [
        "One-based offset formula: (pageNumber - 1) * pageSize.",
        "Spring Data page indexes start at zero.",
        "LIMIT controls the maximum number of returned rows.",
        "OFFSET skips rows in the ordered result.",
        "ORDER BY is essential for predictable pagination.",
        "PageRequest.of(0, 10) requests the first ten items.",
        "Page provides total-count metadata; Slice focuses on navigation.",
        "Validate page and size on the backend.",
        "Use DTOs to define stable API response contracts.",
        "Large offsets can be expensive.",
        "Keyset pagination is useful for sequential navigation through large datasets.",
        "Indexes and execution plans help diagnose query performance.",
        "Data changes between requests can affect page boundaries."
      ]
    }
  ]
};
