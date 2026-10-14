
export const offsetClause = {
  id: 2026,
  title: "OFFSET Clause",
  slug: "offset-clause",
  topicTitle: "Sorting, Limiting and Pagination",
  description:
    "Learn how OFFSET skips rows before returning query results, implement pagination, understand large-offset performance, and use Spring Data JPA.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "introduction",
      title: "1. What Is OFFSET?",
      paragraphs: [
        "OFFSET skips a specified number of rows before returning the remaining query results.",
        "It is commonly combined with LIMIT for pagination in MySQL and PostgreSQL.",
        "OFFSET does not delete or modify rows. It only determines where the returned portion of the query result begins.",
        "Use ORDER BY to define the intended row order before applying OFFSET. Without a predictable order, the selected page is not guaranteed to contain the same records."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 3 OFFSET 3;`
      },
      output: `employee_id | employee_name
------------+--------------
4           | Anu
5           | Meena
6           | Arun`,
      bullets: [
        "ORDER BY employee_id ASC sorts employees by ID.",
        "OFFSET 3 skips the first three rows.",
        "LIMIT 3 returns at most three rows after skipping.",
        "This syntax is supported by MySQL and PostgreSQL."
      ]
    },
    {
      id: "offset-calculation",
      title: "2. How OFFSET Works",
      paragraphs: [
        "If the rows are sorted by employee_id and OFFSET is 3, the first three rows are skipped. LIMIT 3 then returns the next three rows, if available.",
        "OFFSET counts rows in the ordered query result, starting from zero. It does not refer to an employee ID or another column value."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 3 OFFSET 6;`
      },
      bullets: [
        "OFFSET 0 starts at the beginning of the ordered result.",
        "OFFSET 3 skips the first three rows.",
        "OFFSET 6 skips the first six rows.",
        "LIMIT 3 returns at most three rows after skipping.",
        "Always use a predictable ORDER BY for page-based results."
      ]
    },
    {
      id: "offset-zero",
      title: "3. OFFSET 0",
      paragraphs: [
        "OFFSET 0 skips no rows. When combined with LIMIT, it returns the first portion of the ordered result set.",
        "This is commonly used for the first page of a paginated API."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;`
      },
      bullets: [
        "No rows are skipped.",
        "At most ten rows are returned.",
        "The unique employee ID defines the row order in this example.",
        "OFFSET 0 is equivalent to omitting OFFSET in many simple LIMIT queries, but writing it explicitly can make pagination logic clearer."
      ]
    },
    {
      id: "limit-offset",
      title: "4. LIMIT and OFFSET Together",
      paragraphs: [
        "LIMIT and OFFSET serve different purposes. LIMIT specifies the maximum number of rows to return, while OFFSET specifies how many rows to skip first.",
        "Together, they support page-based retrieval without returning the entire dataset."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 5 OFFSET 10;`
      },
      bullets: [
        "LIMIT 5 requests up to five rows.",
        "OFFSET 10 skips the first ten rows.",
        "The query returns rows 11 through 15 in the ordered result if those rows exist.",
        "The exact records depend on the ORDER BY clause and the current dataset."
      ]
    },
    {
      id: "pagination-formula",
      title: "5. Pagination Formula",
      paragraphs: [
        "For zero-based pagination, calculate the offset by multiplying the page index by the page size.",
        "For example, with ten records per page, page index 0 starts at offset 0, page index 1 starts at offset 10, and page index 2 starts at offset 20."
      ],
      code: {
        language: "java",
        code: `int page = 2;
int pageSize = 10;

int offset = page * pageSize;

System.out.println(offset); // 20`
      },
      bullets: [
        "Offset formula: offset = page index * page size.",
        "Page index 0 means the first page.",
        "Page index 1 means the second page.",
        "Page index 2 means the third page.",
        "Validate that the page index is non-negative and the page size is positive."
      ]
    },
    {
      id: "pagination-examples",
      title: "6. First, Second, and Third Pages",
      paragraphs: [
        "When the page size is ten, each page starts at a different offset. The query should use the same sorting rules for every page."
      ],
      code: {
        language: "sql",
        code: `-- First page
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;

-- Second page
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Third page
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "First page: skips zero rows.",
        "Second page: skips ten rows.",
        "Third page: skips twenty rows.",
        "The number of rows returned may be smaller than the page size if fewer records remain."
      ]
    },
    {
      id: "offset-with-where",
      title: "7. OFFSET with WHERE",
      paragraphs: [
        "WHERE filters records before the ordered page is selected. OFFSET skips rows from the qualifying, ordered result rather than from every row in the underlying table.",
        "This is useful when users request a page of employees from a particular department."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, salary
FROM employees
WHERE department = 'IT'
ORDER BY salary DESC, employee_id ASC
LIMIT 10 OFFSET 10;`
      },
      bullets: [
        "WHERE keeps employees in the IT department.",
        "ORDER BY sorts qualifying employees by salary descending.",
        "OFFSET skips the first ten matching employees.",
        "LIMIT returns up to ten employees from the remaining ordered results."
      ]
    },
    {
      id: "offset-multiple-columns",
      title: "8. OFFSET with Multiple-Column Sorting",
      paragraphs: [
        "Multiple-column sorting defines the exact sequence used for pagination.",
        "When the primary sort column contains duplicates, add additional sorting expressions and a unique tie-breaker to create a deterministic order for a given dataset."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, employee_id ASC
LIMIT 10 OFFSET 20;`
      },
      bullets: [
        "Department is the primary sorting expression.",
        "Salary sorts employees within each department.",
        "Employee ID resolves ties.",
        "OFFSET skips twenty rows in this combined order."
      ]
    },
    {
      id: "large-offset",
      title: "9. Large OFFSET Values",
      paragraphs: [
        "Large offsets can become inefficient because the database may need to process and discard many preceding rows before returning the requested page.",
        "For example, retrieving ten rows after skipping one million rows may require substantial work, depending on the query, indexes, and database execution plan.",
        "For deep pagination, keyset pagination is often a better option when the query has a suitable ordering key."
      ],
      bullets: [
        "Large OFFSET values can increase query cost.",
        "A suitable index may help, depending on the query and execution plan.",
        "LIMIT does not guarantee that only the requested number of rows are processed internally.",
        "Consider keyset pagination for deep pages in large datasets.",
        "Measure query performance before changing the pagination strategy."
      ]
    },
    {
      id: "concurrent-changes",
      title: "10. OFFSET and Concurrent Data Changes",
      paragraphs: [
        "A deterministic ORDER BY defines the order for a given dataset, but the dataset may change between page requests.",
        "If rows are inserted or deleted before the current offset, the next request may repeat a record or skip a record compared with the previous page.",
        "Applications that require a consistent view across multiple pages may need a suitable transaction and isolation strategy, snapshot-based reporting, or cursor-based pagination."
      ],
      code: {
        language: "sql",
        code: `SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;`
      },
      bullets: [
        "The query requests the second page when the page size is ten.",
        "A newly inserted row near the beginning can shift later page boundaries.",
        "A unique tie-breaker solves ambiguous ordering but does not prevent shifts caused by data changes.",
        "Choose a consistency strategy based on the application's requirements."
      ]
    },
    {
      id: "keyset-pagination",
      title: "11. Keyset Pagination",
      paragraphs: [
        "Keyset pagination retrieves the next batch relative to the last row returned. Instead of skipping a large number of rows, it filters using the previous page's last sorting key.",
        "It is useful for large datasets and feed-style interfaces when the sorting columns and indexes are suitable."
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
        "The query starts after employee ID 100.",
        "It returns up to ten employees in ascending ID order.",
        "The example assumes employee_id is unique and increasing.",
        "For complex sorting, the cursor condition must match the complete sort order.",
        "Keyset pagination avoids large offsets but does not automatically create a consistent snapshot of changing data."
      ]
    },
    {
      id: "keyset-multiple-columns",
      title: "12. Keyset Pagination with Multiple Sort Keys",
      paragraphs: [
        "When results are sorted by multiple columns, the continuation condition must account for all relevant sorting values.",
        "For example, if salary is sorted descending and employee ID ascending, the next page should contain employees with lower salaries or employees with the same salary and a higher ID than the last row."
      ],
      code: {
        language: "sql",
        code: `-- Assume the last row had salary 60000 and employee_id 25
SELECT employee_id, employee_name, salary
FROM employees
WHERE salary < 60000
   OR (salary = 60000 AND employee_id > 25)
ORDER BY salary DESC, employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "The query continues after the last row in the composite sort order.",
        "Lower salaries come after higher salaries.",
        "For equal salaries, higher employee IDs come after lower employee IDs.",
        "The cursor must preserve the values of the last row's sorting expressions.",
        "NULL values and complex expressions require additional care when building continuation conditions."
      ]
    },
    {
      id: "offset-vs-limit",
      title: "13. Difference Between LIMIT and OFFSET",
      paragraphs: [
        "LIMIT and OFFSET are often used together, but they control different aspects of the result.",
        "LIMIT controls how many rows are returned, while OFFSET controls how many rows are skipped before the result begins."
      ],
      bullets: [
        "LIMIT 10: return at most ten rows.",
        "OFFSET 10: skip ten rows.",
        "LIMIT 10 OFFSET 10: skip ten rows and return up to the next ten.",
        "Both affect query output and do not modify the stored records."
      ]
    },
    {
      id: "database-syntax",
      title: "14. OFFSET Syntax Across Databases",
      paragraphs: [
        "Pagination syntax differs between database systems. MySQL and PostgreSQL support LIMIT with OFFSET. SQL Server commonly uses OFFSET/FETCH with ORDER BY, while other databases may provide additional forms.",
        "Use the syntax supported by your database and version."
      ],
      code: {
        language: "sql",
        code: `-- MySQL / PostgreSQL
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 20;

-- SQL Server
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;`
      },
      bullets: [
        "LIMIT and OFFSET are common in MySQL and PostgreSQL.",
        "SQL Server uses OFFSET/FETCH with ORDER BY for this pattern.",
        "Pagination generally requires a meaningful ORDER BY.",
        "Check the syntax for your actual database and version."
      ]
    },
    {
      id: "spring-data-pageable",
      title: "15. OFFSET Pagination in Spring Data JPA",
      paragraphs: [
        "Spring Data JPA provides Pageable and PageRequest to implement page-based retrieval. The framework calculates pagination information and translates it into database-specific query behavior.",
        "Spring Data page indexes start at zero, and the page size specifies the maximum number of records requested per page."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public Page<Employee> getEmployees(int page, int size) {
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
            Sort.Order.asc("employeeId")
        )
    );

    return employeeRepository.findAll(pageable);
}`
      },
      bullets: [
        "PageRequest.of(0, 10) requests the first page of ten records.",
        "PageRequest.of(1, 10) requests the second page.",
        "The framework handles the database-specific pagination syntax.",
        "The repository must support findAll(Pageable).",
        "Validate page and size values before creating the Pageable.",
        "The example assumes employeeId is a property of the Employee entity."
      ]
    },
    {
      id: "spring-data-page",
      title: "16. Page, Slice, and List",
      paragraphs: [
        "Spring Data JPA can return different types of paginated results. Page provides pagination metadata and generally needs a total-count query when that information is required. Slice indicates whether more data is available without requiring the total number of records. List can return the content for a Pageable request without providing the full page metadata.",
        "Choose the return type based on what the frontend actually needs."
      ],
      bullets: [
        "Page: content plus metadata such as total elements and total pages.",
        "Slice: content and information about whether more results are available.",
        "List with Pageable: page content without the complete Page metadata.",
        "Count queries can be expensive for very large tables.",
        "For infinite scrolling, Slice or a cursor-based response may be sufficient."
      ]
    },
    {
      id: "rest-api",
      title: "17. OFFSET Pagination in a REST API",
      paragraphs: [
        "A REST endpoint can accept page and size parameters and delegate pagination to the service layer.",
        "The API should validate the inputs, restrict the maximum page size, and use a deterministic sort."
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

        return employeeService.getEmployees(page, size);
    }
}`
      },
      bullets: [
        "A request such as /api/employees?page=0&size=10 asks for the first page.",
        "The controller delegates pagination to the service.",
        "The service validates the page and size values.",
        "In production, consider returning DTOs instead of persistence entities.",
        "Use a response shape that clearly communicates pagination metadata to the client."
      ]
    },
    {
      id: "common-mistakes",
      title: "18. Common OFFSET Mistakes",
      bullets: [
        "Using OFFSET without ORDER BY when a particular page order is required.",
        "Confusing a row offset with a column value such as employee_id.",
        "Forgetting that page indexes in Spring Data JPA are zero-based.",
        "Using the wrong pagination syntax for the database.",
        "Assuming a unique sort key prevents shifts caused by concurrent data changes.",
        "Using extremely large offsets without checking performance.",
        "Allowing clients to request unreasonable page sizes.",
        "Using a non-unique sort expression without a tie-breaker.",
        "Assuming LIMIT and OFFSET guarantee that only the returned rows are processed internally.",
        "Failing to consider whether a Page count query is necessary."
      ]
    },
    {
      id: "best-practices",
      title: "19. OFFSET Best Practices",
      bullets: [
        "Use ORDER BY to define the intended row order.",
        "Include a unique tie-breaker when multiple rows can have equal sort values.",
        "Calculate the offset using page index multiplied by page size.",
        "Validate page indexes and limit page sizes.",
        "Use database-appropriate pagination syntax.",
        "Measure the performance of deep pages with realistic data.",
        "Consider keyset pagination when large offsets become expensive.",
        "Choose Page, Slice, or List based on the metadata the application needs.",
        "Consider concurrent data changes when consistent pagination is important.",
        "Use suitable indexes based on actual filters and ordering requirements."
      ]
    },
    {
      id: "practice-exercises",
      title: "20. Practice Exercises",
      paragraphs: [
        "Assume you have employees(employee_id, employee_name, department, salary)."
      ],
      bullets: [
        "Exercise 1: Return the first ten employees ordered by employee ID.",
        "Exercise 2: Return the second page of ten employees.",
        "Exercise 3: Return the third page of five employees.",
        "Exercise 4: Return the second page of IT employees sorted by salary descending.",
        "Exercise 5: Explain why OFFSET 20 does not mean employee_id 20.",
        "Exercise 6: Explain why a large OFFSET may be slow.",
        "Exercise 7: Write a keyset pagination query that continues after employee ID 100.",
        "Exercise 8: Explain the difference between Page and Slice in Spring Data JPA."
      ]
    },
    {
      id: "practice-solutions",
      title: "21. Practice Exercise Solutions",
      code: {
        language: "sql",
        code: `-- Exercise 1: First ten employees
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 0;

-- Exercise 2: Second page of ten employees
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 10 OFFSET 10;

-- Exercise 3: Third page of five employees
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id ASC
LIMIT 5 OFFSET 10;

-- Exercise 4: Second page of IT employees by salary
SELECT employee_id, employee_name, salary
FROM employees
WHERE department = 'IT'
ORDER BY salary DESC, employee_id ASC
LIMIT 10 OFFSET 10;

-- Exercise 7: Keyset pagination after employee ID 100
SELECT employee_id, employee_name
FROM employees
WHERE employee_id > 100
ORDER BY employee_id ASC
LIMIT 10;`
      },
      bullets: [
        "The queries use MySQL/PostgreSQL syntax.",
        "The third page of five rows starts at offset 10 because 2 * 5 = 10.",
        "The IT query filters first, then sorts, skips, and limits the matching result.",
        "The keyset example assumes employee_id is unique and ordered."
      ]
    },
    {
      id: "debugging",
      title: "22. Debugging OFFSET and Pagination",
      paragraphs: [
        "When pagination returns missing, repeated, or unexpected rows, inspect the ordering, offset calculation, page size, database syntax, and data changes between requests."
      ],
      bullets: [
        "Verify that ORDER BY defines a deterministic sequence.",
        "Check the formula: offset = page index * page size.",
        "Confirm that Spring Data page indexes start at zero.",
        "Check whether WHERE filters change the number of eligible rows.",
        "Investigate concurrent inserts, deletes, and updates.",
        "Inspect the query plan when deep pages are slow.",
        "Consider keyset pagination for large result sets.",
        "Check whether total-count metadata is actually needed."
      ]
    },
    {
      id: "scenario-interview",
      title: "23. Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question: "A frontend needs the second page of ten employees. What SQL would you write?",
          answer: "Use ORDER BY with a deterministic key, then LIMIT 10 OFFSET 10 in MySQL or PostgreSQL."
        },
        {
          question: "Why are some employees repeated or missing between pages?",
          answer: "Offset-based pagination can shift when rows are inserted, deleted, or updated between requests. A deterministic sort helps, but a suitable consistency strategy or keyset pagination may be needed."
        },
        {
          question: "Why is a query with OFFSET 1000000 slow?",
          answer: "The database may need to process and discard a large number of preceding rows. Inspect the execution plan and consider keyset pagination."
        },
        {
          question: "How do you implement OFFSET pagination in Spring Data JPA?",
          answer: "Use Pageable and PageRequest with a zero-based page index, page size, and deterministic sorting."
        },
        {
          question: "When would you use Slice instead of Page?",
          answer: "Use Slice when the application needs to know whether more results exist but does not need the total number of records or pages."
        },
        {
          question: "Does OFFSET 20 select the row with ID 20?",
          answer: "No. It skips the first twenty rows in the ordered query result. The row IDs can be different or non-consecutive."
        }
      ]
    },
    {
      id: "interview",
      title: "24. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does OFFSET do?",
          answer: "OFFSET skips a specified number of rows before returning the remaining results."
        },
        {
          question: "What is the difference between LIMIT and OFFSET?",
          answer: "LIMIT controls the maximum number of rows returned; OFFSET controls how many rows are skipped first."
        },
        {
          question: "Why can large OFFSET values be slow?",
          answer: "The database may have to process many rows before reaching the requested page."
        },
        {
          question: "What is the formula for calculating OFFSET?",
          answer: "For zero-based pagination, offset equals page index multiplied by page size."
        },
        {
          question: "Does OFFSET guarantee which rows are skipped?",
          answer: "It skips rows from the query result order, but without an appropriate ORDER BY the order is not guaranteed."
        },
        {
          question: "Can OFFSET be used without LIMIT?",
          answer: "Syntax support varies by database. MySQL and PostgreSQL commonly use LIMIT with OFFSET, while other systems provide their own pagination syntax."
        },
        {
          question: "What is keyset pagination?",
          answer: "Keyset pagination uses the last returned row's sort values to retrieve the next batch instead of skipping a large offset."
        },
        {
          question: "What is the difference between Page and Slice?",
          answer: "Page provides total-count and page metadata, while Slice focuses on content and whether more results are available."
        },
        {
          question: "How is pagination handled in Spring Data JPA?",
          answer: "PageRequest and Pageable specify the zero-based page index, size, and sorting for repository methods that support pagination."
        },
        {
          question: "Does a unique ORDER BY prevent pagination problems?",
          answer: "It resolves ambiguous ordering for a given dataset, but concurrent changes can still shift offset-based page boundaries."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "25. Quick Reference",
      bullets: [
        "Skip three and return three: LIMIT 3 OFFSET 3",
        "First page of ten: LIMIT 10 OFFSET 0",
        "Second page of ten: LIMIT 10 OFFSET 10",
        "Third page of ten: LIMIT 10 OFFSET 20",
        "Offset formula: page index * page size",
        "Spring Data: PageRequest.of(page, size, sort)",
        "Deep pagination: evaluate keyset pagination.",
        "Deterministic pagination: use ORDER BY with a unique tie-breaker.",
        "Database syntax: MySQL/PostgreSQL use LIMIT and OFFSET; SQL Server commonly uses OFFSET/FETCH."
      ]
    },
    {
      id: "one-minute-answer",
      title: "26. Explain OFFSET in One Minute",
      paragraphs: [
        "OFFSET skips a specified number of rows before returning a query result. It is commonly combined with LIMIT for pagination in MySQL and PostgreSQL. If the page size is ten, the second page uses LIMIT 10 OFFSET 10, and the third page uses LIMIT 10 OFFSET 20. We should use ORDER BY with a unique tie-breaker so the result order is deterministic for a given dataset. Large offsets can be inefficient because the database may process many rows before reaching the requested page. For deep pagination, keyset pagination may be a better option. In Spring Data JPA, Pageable and PageRequest provide page-based retrieval."
      ]
    },
    {
      id: "revision-notes",
      title: "27. Revision Notes",
      bullets: [
        "OFFSET skips rows from the ordered query result.",
        "LIMIT controls the maximum number of returned rows.",
        "The offset formula is page index multiplied by page size.",
        "Page indexes in Spring Data JPA start at zero.",
        "ORDER BY is important for predictable pagination.",
        "A unique tie-breaker resolves ambiguous row ordering.",
        "Concurrent data changes can shift offset-based page boundaries.",
        "Large offsets can be expensive.",
        "Keyset pagination can improve deep-page retrieval for suitable queries.",
        "Page and Slice provide different pagination metadata.",
        "Always use pagination syntax supported by the target database."
      ]
    }
  ]
};
