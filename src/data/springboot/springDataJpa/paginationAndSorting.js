
export const paginationAndSorting = {
  id: 808,

  title: "Pagination and Sorting",

  slug: "pagination-and-sorting",

  topicTitle: "Spring Data JPA",

  description:
    "Learn how Spring Data JPA handles large datasets using Pageable, Page, Slice, and Sort, and how to build efficient paginated and sorted REST APIs.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "pagination",

      title: "What is Pagination?",

      paragraphs: [
        "Pagination means dividing a large dataset into smaller pages instead of returning every record in a single response.",
        "For example, an employee API might return 20 employees per page rather than loading thousands of employees at once.",
        "Pagination is especially important when database tables can grow to thousands, millions, or more records. Returning the entire dataset can increase database work, memory usage, network traffic, and API response time."
      ],

      code: {
        language: "text",
        code: `Without Pagination

Database
  |
  | 100,000 employees
  v
Application
  |
  | loads 100,000 records
  v
HTTP Response
  |
  v
Client


With Pagination

Database
  |
  | requested page
  v
Application
  |
  | 20 records
  v
HTTP Response
  |
  v
Client`
      },

      bullets: [
        "Pagination limits how many records are returned at once.",
        "It reduces response size.",
        "It reduces application memory usage.",
        "It improves API usability.",
        "It is important for large datasets."
      ]
    },

    {
      id: "why-not-find-all",

      title: "Why Not Always Use findAll()?",

      paragraphs: [
        "findAll() is convenient for small datasets, but it can become expensive as the number of records grows.",
        "If an employees table contains 1 million records, loading every employee into the application just to display the first 20 records is wasteful.",
        "Pagination allows the database to return only the records needed for the requested page."
      ],

      code: {
        language: "text",
        code: `findAll()

1,000,000 rows
       |
       v
Application
       |
       v
Potentially huge result


Pagination

1,000,000 rows
       |
       | request page 0, size 20
       v
Database returns
20 rows
       |
       v
Application`
      }
    },

    {
      id: "repository",

      title: "Repository with Pageable",

      paragraphs: [
        "Spring Data JPA supports pagination through Pageable. A repository method can accept a Pageable parameter and return a Page containing the requested results and metadata."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Page<Employee> findAll(Pageable pageable);
}`
      }
    },

    {
      id: "pageable",

      title: "Creating a Pageable",

      code: {
        language: "java",
        code: `Pageable pageable =
        PageRequest.of(0, 20);

Page<Employee> page =
        employeeRepository.findAll(pageable);`
      },

      paragraphs: [
        "The first argument represents the zero-based page number, while the second argument represents the page size.",
        "Page 0 means the first page. Page 1 means the second page, and so on.",
        "In this example, the application requests 20 records from page 0."
      ],

      bullets: [
        "Page number is zero-based.",
        "Page size specifies the maximum number of records in the page.",
        "PageRequest is a common implementation used to create Pageable objects.",
        "A Pageable can also contain sorting information."
      ]
    },

    {
      id: "page-number",

      title: "Understanding Page Numbers",

      paragraphs: [
        "Spring Data pagination uses zero-based page numbering. Therefore, the first page is page 0, the second page is page 1, and the third page is page 2."
      ],

      code: {
        language: "text",
        code: `Page 0
Records 1 - 20

Page 1
Records 21 - 40

Page 2
Records 41 - 60

Page 3
Records 61 - 80`
      }
    },

    {
      id: "page-size",

      title: "Understanding Page Size",

      paragraphs: [
        "Page size determines how many records the application requests per page.",
        "A larger page size means fewer requests may be needed to browse the same dataset, but each response becomes larger. A smaller page size reduces response size but may require more requests."
      ],

      code: {
        language: "java",
        code: `Pageable firstPage =
    PageRequest.of(0, 10);

Pageable secondPage =
    PageRequest.of(1, 10);

Pageable largePage =
    PageRequest.of(0, 100);`
      }
    },

    {
      id: "page",

      title: "What is Page<T>?",

      paragraphs: [
        "Page<T> represents a page of query results along with metadata about the overall result set.",
        "For example, Page<Employee> contains Employee objects for the current page and information such as total elements, total pages, current page number, and whether another page exists."
      ],

      code: {
        language: "text",
        code: `Page<Employee>
    |
    +-- Content
    |     |
    |     +-- Employee 1
    |     +-- Employee 2
    |     +-- ...
    |
    +-- Current page
    +-- Page size
    +-- Total elements
    +-- Total pages
    +-- Has next
    +-- Has previous`
      }
    },

    {
      id: "page-response",

      title: "Page Information",

      paragraphs: [
        "A Page contains both the current content and metadata about the result set."
      ],

      code: {
        language: "java",
        code: `Page<Employee> page;

page.getContent();
page.getNumber();
page.getSize();
page.getTotalElements();
page.getTotalPages();
page.hasNext();
page.hasPrevious();
page.isFirst();
page.isLast();`
      },

      bullets: [
        "getContent() returns the records in the current page.",
        "getNumber() returns the current zero-based page number.",
        "getSize() returns the requested page size.",
        "getTotalElements() returns the total number of matching records.",
        "getTotalPages() returns the number of pages.",
        "hasNext() tells whether another page exists.",
        "hasPrevious() tells whether a previous page exists.",
        "isFirst() tells whether the current page is the first page.",
        "isLast() tells whether the current page is the last page."
      ]
    },

    {
      id: "sorting",

      title: "Sorting",

      paragraphs: [
        "Sorting means controlling the order in which records are returned.",
        "Spring Data JPA provides the Sort class for defining sorting rules."
      ],

      code: {
        language: "java",
        code: `Sort sort =
        Sort.by("name").ascending();

List<Employee> employees =
        employeeRepository.findAll(sort);`
      },

      bullets: [
        "ascending() sorts from low to high or A to Z.",
        "descending() sorts from high to low or Z to A.",
        "The property name should refer to the entity property used for sorting."
      ]
    },

    {
      id: "descending-sort",

      title: "Descending Sorting",

      code: {
        language: "java",
        code: `Sort sort =
    Sort.by("salary").descending();

List<Employee> employees =
    employeeRepository.findAll(sort);`
      },

      paragraphs: [
        "This example requests employees ordered by salary from highest to lowest."
      ]
    },

    {
      id: "multiple-sort",

      title: "Sorting by Multiple Fields",

      paragraphs: [
        "An API may need more than one sorting rule. For example, employees can be sorted by department first and then by employee name."
      ],

      code: {
        language: "java",
        code: `Sort sort = Sort.by(
    Sort.Order.asc("department"),
    Sort.Order.asc("name")
);

List<Employee> employees =
    employeeRepository.findAll(sort);`
      }
    },

    {
      id: "sort-priority",

      title: "How Multiple Sorting Works",

      paragraphs: [
        "When multiple sort fields are specified, the first field has the highest priority. The next field is used when records have the same value for the previous field."
      ],

      code: {
        language: "text",
        code: `Sort by department ASC
        |
        +-- IT
        |    |
        |    +-- Arun
        |    +-- Ravi
        |
        +-- HR
             |
             +-- Anil
             +-- Venkatesh

Within the same department,
name determines the order.`
      }
    },

    {
      id: "pagination-sorting",

      title: "Pagination with Sorting",

      code: {
        language: "java",
        code: `Pageable pageable =
        PageRequest.of(
            0,
            20,
            Sort.by("name").ascending()
        );

Page<Employee> page =
        employeeRepository.findAll(pageable);`
      },

      paragraphs: [
        "Pagination and sorting can be combined in a single Pageable object.",
        "This example requests the first 20 employees sorted by name in ascending order."
      ]
    },

    {
      id: "dynamic-sort",

      title: "Dynamic Sorting",

      paragraphs: [
        "A REST API can allow clients to specify the field and direction used for sorting. However, the application should validate or whitelist allowed fields rather than blindly accepting arbitrary property names."
      ],

      code: {
        language: "java",
        code: `Sort sort;

if ("salary".equals(sortBy)) {
    sort = "desc".equalsIgnoreCase(direction)
        ? Sort.by("salary").descending()
        : Sort.by("salary").ascending();
} else {
    sort = Sort.by("name").ascending();
}

Pageable pageable =
    PageRequest.of(page, size, sort);`
      }
    },

    {
      id: "controller",

      title: "REST Controller Example",

      code: {
        language: "java",
        code: `@GetMapping
public Page<EmployeeResponse> getEmployees(
        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "20")
        int size) {

    Pageable pageable =
            PageRequest.of(
                page,
                size,
                Sort.by("name").ascending()
            );

    return employeeService
            .findAll(pageable);
}`
      },

      paragraphs: [
        "The controller receives page and size from the client and creates a Pageable object.",
        "In a production API, page and size should be validated so clients cannot request unreasonable values."
      ]
    },

    {
      id: "request-parameters",

      title: "Pagination Request Parameters",

      paragraphs: [
        "A common REST API design exposes pagination and sorting through query parameters."
      ],

      code: {
        language: "text",
        code: `GET /api/employees?page=0&size=20

GET /api/employees?page=1&size=20

GET /api/employees?page=0&size=20&sort=name,asc

GET /api/employees?page=0&size=20&sort=salary,desc`
      }
    },

    {
      id: "request-flow",

      title: "Pagination Request Flow",

      code: {
        language: "text",
        code: `Client
  |
  | GET /api/employees?page=0&size=20
  v
Controller
  |
  | page = 0
  | size = 20
  v
PageRequest
  |
  v
Service
  |
  v
Repository
  |
  v
JPA / Hibernate
  |
  v
Database
  |
  | only requested result set
  v
Page<Employee>
  |
  v
REST Response`
      }
    },

    {
      id: "service",

      title: "Pagination in Service Layer",

      paragraphs: [
        "The service layer can receive Pageable from the controller or construct it according to application rules.",
        "Keeping business rules and pagination policy in the service layer can be useful when the application needs to enforce limits or apply default behavior."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository =
            employeeRepository;
    }

    public Page<Employee> findAll(
            Pageable pageable) {

        return employeeRepository
            .findAll(pageable);
    }
}`
      }
    },

    {
      id: "pageable-validation",

      title: "Validating Page and Size",

      paragraphs: [
        "Clients should not be allowed to request unlimited or excessively large pages. A practical API normally applies defaults and maximum limits.",
        "For example, the API might default to 20 records and reject a request for 100,000 records."
      ],

      code: {
        language: "java",
        code: `int safePage = Math.max(page, 0);

int safeSize = Math.min(
    Math.max(size, 1),
    100
);

Pageable pageable =
    PageRequest.of(
        safePage,
        safeSize
    );`
      },

      bullets: [
        "Do not allow negative page numbers.",
        "Do not allow zero or negative page sizes.",
        "Apply a reasonable maximum page size.",
        "Consider rejecting invalid input rather than silently changing it, depending on API design."
      ]
    },

    {
      id: "response-dto",

      title: "Returning a Page of DTOs",

      paragraphs: [
        "Production APIs often return DTOs instead of exposing JPA entities directly.",
        "Page provides a map() operation that can transform the content while preserving pagination metadata."
      ],

      code: {
        language: "java",
        code: `Page<Employee> employees =
    employeeRepository.findAll(pageable);

Page<EmployeeResponse> response =
    employees.map(employee ->
        new EmployeeResponse(
            employee.getId(),
            employee.getName(),
            employee.getEmail()
        )
    );`
      }
    },

    {
      id: "page-metadata",

      title: "Designing a Pagination Response",

      paragraphs: [
        "A REST API can expose pagination metadata explicitly so the frontend can build pagination controls."
      ],

      code: {
        language: "json",
        code: `{
  "content": [
    {
      "id": 1,
      "name": "Arun"
    },
    {
      "id": 2,
      "name": "Ravi"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5,
  "first": true,
  "last": false
}`
      }
    },

    {
      id: "page-vs-slice",

      title: "Page vs Slice",

      paragraphs: [
        "Spring Data also provides Slice. A Slice focuses on whether another slice exists and does not provide the complete total-element and total-page metadata that Page provides.",
        "This can be useful when the UI only needs next/previous navigation and does not need to know the total number of records."
      ],

      code: {
        language: "java",
        code: `Page<Employee> page =
    employeeRepository.findAll(pageable);

Slice<Employee> slice =
    employeeRepository.findByDepartment(
        "IT",
        pageable
    );`
      },

      bullets: [
        "Page provides total-elements and total-pages metadata.",
        "Slice focuses on whether another slice exists.",
        "Page can require additional count-query work depending on the query.",
        "Slice can be useful for infinite-scroll or next-page style interfaces."
      ]
    },

    {
      id: "slice-repository",

      title: "Slice Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Slice<Employee> findByDepartment(
        String department,
        Pageable pageable
    );
}`
      }
    },

    {
      id: "page-query",

      title: "Pagination with Custom Queries",

      paragraphs: [
        "Pagination can also be used with custom JPQL queries. Spring Data can apply the Pageable information to the repository query."
      ],

      code: {
        language: "java",
        code: `@Query("""
    select e
    from Employee e
    where e.department = :department
    """)
Page<Employee> findByDepartment(
    @Param("department")
    String department,
    Pageable pageable
);`
      }
    },

    {
      id: "count-query",

      title: "Why Page May Need a Count Query",

      paragraphs: [
        "When returning Page, Spring Data may need to determine how many records match the query so that it can calculate total elements and total pages.",
        "For complex custom queries, an appropriate count query may sometimes need to be supplied explicitly."
      ],

      code: {
        language: "java",
        code: `@Query(
    value = """
        select e
        from Employee e
        where e.department = :department
        """,
    countQuery = """
        select count(e)
        from Employee e
        where e.department = :department
        """
)
Page<Employee> findByDepartment(
    @Param("department")
    String department,
    Pageable pageable
);`
      }
    },

    {
      id: "database-pagination",

      title: "Pagination Happens at the Database Level",

      paragraphs: [
        "The goal of Spring Data pagination is not to retrieve the entire table and then manually discard records in Java. The pagination information is translated by the persistence provider into database-specific query behavior.",
        "For example, Hibernate can generate SQL containing database-specific pagination clauses or mechanisms."
      ],

      code: {
        language: "text",
        code: `PageRequest
    |
    v
Spring Data JPA
    |
    v
Hibernate
    |
    v
Database-specific SQL
    |
    v
Only requested rows
    |
    v
Page<T>`
      }
    },

    {
      id: "offset-pagination",

      title: "Offset-Based Pagination",

      paragraphs: [
        "The common PageRequest model is conceptually based on page number and page size, which correspond to an offset and limit style of database retrieval.",
        "For example, page 0 with size 20 starts at offset 0, while page 2 with size 20 conceptually starts after 40 records."
      ],

      code: {
        language: "text",
        code: `Page 0, size 20
Offset = 0
Limit  = 20

Page 1, size 20
Offset = 20
Limit  = 20

Page 2, size 20
Offset = 40
Limit  = 20`
      }
    },

    {
      id: "offset-performance",

      title: "Offset Pagination Performance",

      paragraphs: [
        "Offset pagination is simple and works well for many applications. However, very large offsets can become expensive on some databases because the database may need to process or skip many rows before returning the requested page.",
        "For extremely large or frequently changing datasets, cursor or keyset pagination can be a better design."
      ]
    },

    {
      id: "keyset-preview",

      title: "Keyset or Cursor Pagination Preview",

      paragraphs: [
        "Keyset pagination uses a known ordering key to find the next set of records rather than calculating a large offset.",
        "For example, an API can request the next 20 employees whose ID is greater than the last employee ID received."
      ],

      code: {
        language: "java",
        code: `List<Employee> findTop20ByIdGreaterThanOrderByIdAsc(
    Long lastSeenId
);`
      },

      bullets: [
        "Useful for very large datasets.",
        "Works well with stable indexed ordering keys.",
        "Often suitable for infinite scrolling.",
        "Does not naturally provide total-page information like Page."
      ]
    },

    {
      id: "stable-sorting",

      title: "Why Stable Sorting Matters",

      paragraphs: [
        "Pagination should use deterministic ordering. If records have identical values for the primary sort field, adding a unique secondary field such as ID can make the order more stable between requests.",
        "This is especially useful when records can be inserted or updated while a client is moving between pages."
      ],

      code: {
        language: "java",
        code: `Sort sort = Sort.by(
    Sort.Order.asc("name"),
    Sort.Order.asc("id")
);

Pageable pageable =
    PageRequest.of(
        0,
        20,
        sort
    );`
      }
    },

    {
      id: "sorting-property",

      title: "Sort by Entity Properties",

      paragraphs: [
        "Sort properties should normally refer to entity attributes, not arbitrary database column names.",
        "For example, if the entity field is employeeName, the Spring Data property used for sorting should correspond to that mapped entity property."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    private String name;

    private double salary;
}

// Correct entity property:
Sort.by("name");

// Correct entity property:
Sort.by("salary");`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Pagination and Sorting Mistakes",

      bullets: [
        "Using findAll() for very large tables.",
        "Forgetting that page numbers are zero-based.",
        "Allowing clients to request extremely large page sizes.",
        "Accepting arbitrary sort fields without validation.",
        "Using unstable sorting when records can change between requests.",
        "Returning JPA entities directly when the API should use DTOs.",
        "Ignoring total-count query costs when using Page for complex queries.",
        "Assuming Page and Slice have the same metadata.",
        "Using offset pagination for extremely large datasets without considering performance.",
        "Sorting by a property that does not exist on the entity.",
        "Building pagination directly in the controller without enforcing application-level limits.",
        "Assuming pagination alone solves every large-data performance problem."
      ]
    },

    {
      id: "best-practices",

      title: "Pagination and Sorting Best Practices",

      bullets: [
        "Use pagination for large collections.",
        "Choose a sensible default page size.",
        "Set a maximum allowed page size.",
        "Validate page numbers and sizes.",
        "Use deterministic sorting.",
        "Add a unique secondary sort field when necessary.",
        "Validate allowed sort properties.",
        "Use DTOs for API responses when appropriate.",
        "Use Page when total-result metadata is required.",
        "Use Slice when only next/previous navigation is required.",
        "Consider keyset pagination for very large datasets.",
        "Add appropriate database indexes for commonly filtered and sorted columns.",
        "Test pagination behavior with empty, first, middle, and last pages.",
        "Measure query performance instead of assuming pagination automatically makes every query fast."
      ]
    },

    {
      id: "testing",

      title: "Testing Pagination",

      paragraphs: [
        "Pagination behavior should be tested with different page numbers, sizes, sorting options, empty results, and boundary conditions."
      ],

      code: {
        language: "java",
        code: `@Test
void shouldReturnFirstPage() {

    Pageable pageable =
        PageRequest.of(
            0,
            2,
            Sort.by("name").ascending()
        );

    Page<Employee> page =
        employeeRepository.findAll(pageable);

    assertEquals(0, page.getNumber());
    assertEquals(2, page.getSize());
    assertTrue(page.getContent().size() <= 2);
}`
      }
    },

    {
      id: "complete-repository",

      title: "Complete Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Page<Employee> findByDepartment(
        String department,
        Pageable pageable
    );

    Slice<Employee> findBySalaryGreaterThan(
        double salary,
        Pageable pageable
    );
}`
      },

      paragraphs: [
        "The repository can combine filtering with pagination. Spring Data applies the Pageable information to the generated or custom query."
      ]
    },

    {
      id: "complete-controller",

      title: "Complete REST API Example",

      code: {
        language: "java",
        code: `@GetMapping
public Page<EmployeeResponse> getEmployees(
        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "20")
        int size,

        @RequestParam(defaultValue = "name")
        String sortBy,

        @RequestParam(defaultValue = "asc")
        String direction) {

    if (page < 0) {
        throw new IllegalArgumentException(
            "Page must not be negative"
        );
    }

    if (size < 1 || size > 100) {
        throw new IllegalArgumentException(
            "Size must be between 1 and 100"
        );
    }

    Sort.Direction sortDirection =
        "desc".equalsIgnoreCase(direction)
            ? Sort.Direction.DESC
            : Sort.Direction.ASC;

    Sort sort =
        Sort.by(sortDirection, sortBy);

    Pageable pageable =
        PageRequest.of(page, size, sort);

    return employeeService
        .findAll(pageable)
        .map(employee ->
            new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail()
            )
        );
}`
      }
    },

    {
      id: "benefits",

      title: "Benefits of Pagination",

      bullets: [
        "Reduces the amount of data transferred.",
        "Reduces memory usage.",
        "Improves API usability.",
        "Works well for large datasets.",
        "Allows clients to navigate through results.",
        "Reduces the amount of data processed by the application.",
        "Works naturally with frontend pagination components.",
        "Can improve perceived application responsiveness."
      ]
    },

    {
      id: "frontend-flow",

      title: "Frontend Pagination Flow",

      paragraphs: [
        "A frontend such as React can maintain the current page and page size and request the corresponding data from the backend.",
        "The backend returns the current content and pagination metadata, allowing the frontend to enable or disable Next and Previous buttons."
      ],

      code: {
        language: "text",
        code: `React
  |
  | page = 0
  | size = 20
  v
GET /api/employees?page=0&size=20
  |
  v
Spring Boot
  |
  v
Spring Data JPA
  |
  v
Database
  |
  v
{
  content: [...],
  totalPages: 5,
  totalElements: 100
}
  |
  v
React renders page 1`
      }
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is Pageable?",
          answer:
            "Pageable represents pagination information such as page number, page size, and optionally sorting."
        },

        {
          question: "What is Page in Spring Data?",
          answer:
            "Page represents a page of results along with metadata such as total elements, total pages, current page, and navigation information."
        },

        {
          question: "Why is pagination important?",
          answer:
            "Pagination prevents APIs from loading and transferring unnecessarily large result sets at once. It reduces database, memory, network, and response costs."
        },

        {
          question: "Is page numbering zero-based in Spring Data?",
          answer:
            "Yes. The first page is page 0, the second page is page 1, and so on."
        },

        {
          question: "What is PageRequest?",
          answer:
            "PageRequest is a common implementation of Pageable used to specify the page number, page size, and optionally sorting."
        },

        {
          question: "What is Sort?",
          answer:
            "Sort is a Spring Data abstraction used to define ordering of query results by one or more entity properties."
        },

        {
          question: "How do you sort records in ascending order?",
          answer:
            "Use Sort.by(\"property\").ascending() or an equivalent Sort.Order configuration."
        },

        {
          question: "How do you sort records in descending order?",
          answer:
            "Use Sort.by(\"property\").descending() or Sort.Order.desc(\"property\")."
        },

        {
          question: "Can pagination and sorting be used together?",
          answer:
            "Yes. A Pageable can contain both page information and sorting information, for example PageRequest.of(0, 20, Sort.by(\"name\").ascending())."
        },

        {
          question: "What is the difference between Page and Slice?",
          answer:
            "Page provides pagination metadata such as total elements and total pages. Slice focuses on the current portion of data and whether another slice exists, without requiring complete total-result metadata."
        },

        {
          question: "Why can Page be more expensive than Slice?",
          answer:
            "Page may need to determine the total number of matching records so it can calculate total pages and total elements. Slice can avoid that total-count requirement."
        },

        {
          question: "Why should page size have a maximum limit?",
          answer:
            "Without a limit, a client could request an extremely large number of records, causing high database load, memory usage, network traffic, and slow responses."
        },

        {
          question: "What is offset pagination?",
          answer:
            "Offset pagination conceptually identifies a result position using an offset and retrieves a limited number of records after that position. PageRequest provides a page-number and page-size abstraction for this style of pagination."
        },

        {
          question: "What is keyset pagination?",
          answer:
            "Keyset pagination uses a known ordering key, such as an ID, to retrieve the next set of records instead of relying on a large offset. It can perform better for very large datasets."
        },

        {
          question: "Why should pagination use deterministic sorting?",
          answer:
            "Deterministic sorting keeps record order stable between page requests. Adding a unique secondary field such as ID can reduce ambiguous ordering when multiple records have the same primary sort value."
        },

        {
          question: "Can you sort by multiple fields?",
          answer:
            "Yes. Spring Data Sort supports multiple Sort.Order values. The first order has higher priority, and subsequent orders break ties."
        },

        {
          question: "How do you paginate a custom @Query?",
          answer:
            "A repository method can accept Pageable and return Page<T> or Slice<T>. Spring Data applies pagination and sorting information to the query."
        },

        {
          question: "Why might a countQuery be required?",
          answer:
            "For complex custom queries returning Page, Spring Data may need a separate count query to determine total matching records. Providing countQuery can make the count operation explicit."
        },

        {
          question: "Should pagination logic be placed only in the controller?",
          answer:
            "The controller can receive pagination parameters, but validation, maximum page-size rules, sorting policies, and business-specific pagination behavior can be handled in the service layer."
        },

        {
          question: "Can a Page be mapped to a DTO?",
          answer:
            "Yes. Page provides map(), which can transform the page content from entities to DTOs while preserving the pagination metadata."
        },

        {
          question: "What happens if there are no records for the requested page?",
          answer:
            "The application receives an empty page content. The Page metadata can indicate that the requested page is beyond the available result set."
        },

        {
          question: "What happens if the page number is negative?",
          answer:
            "A PageRequest cannot represent a negative page number. The API should validate input and return an appropriate client error rather than allowing invalid pagination parameters."
        },

        {
          question: "Does pagination automatically make a query fast?",
          answer:
            "No. Pagination reduces the number of records returned, but query performance still depends on filtering, sorting, indexes, joins, database statistics, query design, and the pagination strategy."
        },

        {
          question: "Why are database indexes important for pagination and sorting?",
          answer:
            "Indexes can help the database efficiently locate and order records for common filter and sort conditions. The appropriate indexes depend on actual query patterns and database behavior."
        },

        {
          question: "How would you implement pagination in a Spring Boot REST API?",
          answer:
            "Accept page, size, and optionally sort parameters in the controller, validate them, create a Pageable using PageRequest, pass it to the service and repository, and return a Page or a custom DTO containing the records and pagination metadata."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "You have 2 million employees and the frontend displays 20 at a time. How would you design the API?",
          answer:
            "I would use a paginated endpoint such as GET /api/employees?page=0&size=20. The controller would validate the parameters, create a Pageable, and pass it to the service. The repository would execute a paginated query, and the API would return the current records along with appropriate pagination metadata."
        },

        {
          question: "The interviewer asks why you do not simply use findAll(). What would you say?",
          answer:
            "findAll() can load the entire result set into the application, which becomes expensive for large tables. Pagination allows the database and application to process only the records required for the current page."
        },

        {
          question: "Users can sort employees by name or salary. How would you implement it safely?",
          answer:
            "I would accept a sort parameter but whitelist the allowed entity properties, such as name and salary. I would also validate the direction and create a Sort object from the validated values rather than blindly accepting arbitrary property names."
        },

        {
          question: "The application uses infinite scrolling and does not need total pages. Would you choose Page or Slice?",
          answer:
            "Slice would often be a better fit because the client primarily needs to know whether more results are available. It avoids the need for complete total-result metadata that Page provides."
        },

        {
          question: "The page number is very large and the query has become slow. What would you investigate?",
          answer:
            "I would examine the generated SQL, database execution plan, indexes, sorting and filtering conditions, and the cost of the offset. If the dataset is extremely large, I would consider keyset or cursor-based pagination."
        },

        {
          question: "Two employees have the same name and the API sorts only by name. What problem can occur?",
          answer:
            "The order of employees with identical names may not be deterministic. Adding a unique secondary sort such as ID can make the ordering more stable across page requests."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Pagination divides a large result set into smaller pages.",
        "PageRequest is commonly used to create Pageable.",
        "Page numbers are zero-based.",
        "Page size controls how many records are requested.",
        "Page<T> contains content and pagination metadata.",
        "Slice<T> focuses on current content and whether another slice exists.",
        "Sort controls result ordering.",
        "Pagination and sorting can be combined in Pageable.",
        "Use maximum page-size limits.",
        "Validate page and sort parameters.",
        "Use deterministic sorting for stable pagination.",
        "Page may require total-count information.",
        "Keyset pagination can be useful for very large datasets.",
        "Use DTOs when the API should not expose entities directly.",
        "Indexes should be considered for frequently filtered and sorted fields."
      ],

      code: {
        language: "text",
        code: `Pagination Cheat Sheet

Pageable pageable =
    PageRequest.of(
        page,
        size,
        Sort.by("name").ascending()
    );

Page<Employee> page =
    employeeRepository.findAll(pageable);


Useful methods:

page.getContent()
page.getNumber()
page.getSize()
page.getTotalElements()
page.getTotalPages()
page.hasNext()
page.hasPrevious()


REST:

GET /api/employees?page=0&size=20
GET /api/employees?page=0&size=20&sort=name,asc`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "Page numbers in Spring Data are zero-based.",
        "Pageable contains page, size, and optional sorting information.",
        "Page contains the current content plus total-result metadata.",
        "Slice is useful when total-result information is not required.",
        "Do not allow unlimited page sizes.",
        "Validate client-provided sorting fields.",
        "Prefer deterministic ordering when records can have duplicate sort values.",
        "findAll() is not automatically wrong, but it should be avoided for unbounded large datasets.",
        "Pagination reduces returned data but does not automatically solve every query-performance problem.",
        "For complex Page queries, count-query performance should be considered.",
        "Offset pagination can become expensive at very large offsets.",
        "Keyset or cursor pagination can be considered for very large datasets.",
        "Database indexes should be designed around real filtering and sorting patterns.",
        "For interviews, remember: Pageable describes the request, Page contains the results and metadata, and Sort controls ordering."
      ]
    }
  ]
};
