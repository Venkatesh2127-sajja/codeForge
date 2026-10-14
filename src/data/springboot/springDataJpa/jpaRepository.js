
export const jpaRepository = {
  id: 805,

  title: "JpaRepository",

  slug: "jpa-repository",

  topicTitle: "Spring Data JPA",

  description:
    "Learn how JpaRepository provides ready-to-use CRUD, pagination, sorting, query derivation, and persistence operations for JPA entities.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "repository",

      title: "What is JpaRepository?",

      paragraphs: [
        "JpaRepository is a Spring Data interface that provides repository operations for JPA entities.",
        "By extending JpaRepository, an application receives many common persistence operations without implementing the repository class manually.",
        "JpaRepository is part of Spring Data JPA and builds on the Spring Data repository abstraction. It works with a JPA provider such as Hibernate underneath.",
        "A repository normally represents the persistence access point for a particular entity type."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      bullets: [
        "JpaRepository provides standard CRUD operations.",
        "It supports pagination and sorting.",
        "It supports query derivation from method names.",
        "It supports custom queries using @Query.",
        "It works with JPA entities.",
        "Spring Data creates the repository implementation at runtime."
      ]
    },

    {
      id: "repository-hierarchy",

      title: "JpaRepository Interface Hierarchy",

      paragraphs: [
        "JpaRepository builds on several Spring Data repository abstractions. This hierarchy explains why JpaRepository provides methods for CRUD, paging, sorting, and JPA-specific operations.",
        "The exact inheritance structure can vary across Spring Data versions, but conceptually JpaRepository provides capabilities from the broader repository interfaces and adds JPA-oriented functionality."
      ],

      code: {
        language: "text",
        code: `Repository
    ↓
CrudRepository
    ↓
PagingAndSortingRepository
    ↓
JpaRepository

Conceptually:

Repository
  → base repository abstraction

CrudRepository
  → CRUD operations

PagingAndSortingRepository
  → pagination + sorting

JpaRepository
  → JPA-specific repository capabilities`
      }
    },

    {
      id: "generic-types",

      title: "Understanding the Generic Parameters",

      code: {
        language: "java",
        code: `JpaRepository<Employee, Long>`
      },

      paragraphs: [
        "The first generic parameter is the entity type. The second generic parameter is the entity's identifier type.",
        "Therefore JpaRepository<Employee, Long> means that this repository manages Employee entities whose identifier is Long.",
        "The identifier type must match the type used by the entity's @Id field."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}`
      }
    },

    {
      id: "repository-creation",

      title: "Do We Need to Implement the Repository?",

      paragraphs: [
        "No. For standard repository operations, you normally only define the interface.",
        "Spring Data creates the repository implementation at runtime and provides the required infrastructure through the Spring application context.",
        "This is one of the major reasons Spring Data JPA reduces persistence boilerplate."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}

// No implementation class is required for
// standard CRUD operations.`
      }
    },

    {
      id: "save",

      title: "save()",

      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("John");
employee.setEmail("john@example.com");

Employee saved =
        employeeRepository.save(employee);`
      },

      paragraphs: [
        "save() is used to persist an entity or update an existing entity according to Spring Data JPA's entity-newness and persistence behavior.",
        "For a new entity, save() generally results in persist behavior. For an existing or detached entity, Spring Data JPA may use merge behavior depending on how the entity is determined to be new.",
        "The exact SQL execution timing is affected by the persistence context, flushing, and transaction boundaries."
      ]
    },

    {
      id: "save-new-vs-existing",

      title: "save() for New vs Existing Entities",

      paragraphs: [
        "The important distinction is whether the entity is considered new or existing.",
        "A new entity is normally inserted into the database. An existing entity represents a previously persisted record and can result in update behavior."
      ],

      code: {
        language: "java",
        code: `// New entity

Employee employee = new Employee();
employee.setName("John");

employeeRepository.save(employee);

// Typically results in INSERT


// Existing entity

Employee existing =
    employeeRepository.findById(10L)
        .orElseThrow();

existing.setName("Updated John");

employeeRepository.save(existing);

// Can result in UPDATE`
      }
    },

    {
      id: "save-all",

      title: "saveAll()",

      paragraphs: [
        "saveAll() accepts a collection of entities and saves them through the repository.",
        "It is useful when an application needs to persist multiple entities through repository operations."
      ],

      code: {
        language: "java",
        code: `List<Employee> employees =
    List.of(
        employee1,
        employee2,
        employee3
    );

List<Employee> savedEmployees =
    employeeRepository.saveAll(employees);`
      },

      bullets: [
        "saveAll() returns the saved entities.",
        "It does not automatically mean that one optimized bulk SQL statement will be generated.",
        "For very large batches, database and Hibernate batch configuration should be considered separately."
      ]
    },

    {
      id: "find",

      title: "findById()",

      code: {
        language: "java",
        code: `Optional<Employee> employee =
        employeeRepository.findById(10L);`
      },

      paragraphs: [
        "findById() returns an Optional because the requested entity may or may not exist.",
        "The service layer should normally handle the empty case explicitly instead of blindly calling get()."
      ]
    },

    {
      id: "find-optional-handling",

      title: "Handling Optional from findById()",

      paragraphs: [
        "A common service-layer pattern is to convert an empty Optional into a meaningful domain exception."
      ],

      code: {
        language: "java",
        code: `public Employee getEmployee(Long id) {

    return employeeRepository.findById(id)
        .orElseThrow(() ->
            new EmployeeNotFoundException(
                "Employee not found: " + id
            )
        );
}`
      }
    },

    {
      id: "find-all",

      title: "findAll()",

      code: {
        language: "java",
        code: `List<Employee> employees =
        employeeRepository.findAll();`
      },

      paragraphs: [
        "findAll() retrieves all entities available through the repository.",
        "It is convenient for small datasets, but it should be used carefully when the table can contain a large number of records."
      ]
    },

    {
      id: "find-all-pagination",

      title: "Why Pagination Matters with findAll()",

      paragraphs: [
        "Loading thousands or millions of rows into memory can create high memory usage, slow responses, large database result sets, and unnecessary network traffic.",
        "For large collections, use a Pageable-based repository method and return only the requested page."
      ],

      code: {
        language: "java",
        code: `Page<Employee> page =
    employeeRepository.findAll(
        PageRequest.of(0, 10)
    );`
      }
    },

    {
      id: "delete",

      title: "deleteById()",

      code: {
        language: "java",
        code: `employeeRepository.deleteById(10L);`
      },

      paragraphs: [
        "deleteById() removes the entity associated with the supplied identifier, subject to the repository and persistence rules.",
        "Applications should consider what should happen when the entity does not exist and whether related database records prevent deletion."
      ]
    },

    {
      id: "delete-entity",

      title: "delete()",

      paragraphs: [
        "delete() accepts an entity instance rather than an identifier."
      ],

      code: {
        language: "java",
        code: `Employee employee =
    employeeRepository.findById(10L)
        .orElseThrow();

employeeRepository.delete(employee);`
      }
    },

    {
      id: "exists",

      title: "existsById()",

      paragraphs: [
        "existsById() checks whether an entity with the supplied identifier exists."
      ],

      code: {
        language: "java",
        code: `boolean exists =
    employeeRepository.existsById(10L);

if (!exists) {
    throw new EmployeeNotFoundException(
        "Employee not found"
    );
}`
      }
    },

    {
      id: "count",

      title: "count()",

      paragraphs: [
        "count() returns the number of entities represented by the repository."
      ],

      code: {
        language: "java",
        code: `long employeeCount =
    employeeRepository.count();`
      }
    },

    {
      id: "common-methods",

      title: "Common JpaRepository Methods",

      code: {
        language: "text",
        code: `save(entity)
saveAll(entities)

findById(id)
findAll()

existsById(id)

count()

delete(entity)
deleteById(id)
deleteAll()`
      },

      bullets: [
        "save() -> saves one entity.",
        "saveAll() -> saves multiple entities.",
        "findById() -> finds an entity by identifier.",
        "findAll() -> retrieves entities.",
        "existsById() -> checks existence.",
        "count() -> counts entities.",
        "delete() -> deletes an entity.",
        "deleteById() -> deletes by identifier.",
        "deleteAll() -> deletes entities."
      ]
    },

    {
      id: "pagination",

      title: "Pagination with JpaRepository",

      paragraphs: [
        "JpaRepository supports pagination through Pageable. Pagination allows an application to retrieve a limited portion of a larger result set.",
        "PageRequest is commonly used to specify the page number and page size."
      ],

      code: {
        language: "java",
        code: `Pageable pageable =
    PageRequest.of(0, 10);

Page<Employee> page =
    employeeRepository.findAll(pageable);`
      },

      bullets: [
        "Page number is zero-based.",
        "Page size specifies how many records should be requested.",
        "Page contains content and pagination metadata.",
        "Pagination reduces the amount of data returned per request."
      ]
    },

    {
      id: "page-result",

      title: "Working with Page<T>",

      paragraphs: [
        "Page<T> contains both the current page content and useful metadata such as total elements, total pages, page size, and current page information."
      ],

      code: {
        language: "java",
        code: `Page<Employee> page =
    employeeRepository.findAll(
        PageRequest.of(0, 10)
    );

List<Employee> employees =
    page.getContent();

long total =
    page.getTotalElements();

int totalPages =
    page.getTotalPages();`
      }
    },

    {
      id: "sorting",

      title: "Sorting with JpaRepository",

      paragraphs: [
        "Spring Data JPA supports sorting using Sort. Sorting can be combined with pagination."
      ],

      code: {
        language: "java",
        code: `List<Employee> employees =
    employeeRepository.findAll(
        Sort.by("name").ascending()
    );`
      }
    },

    {
      id: "pagination-sorting",

      title: "Pagination and Sorting Together",

      code: {
        language: "java",
        code: `Pageable pageable =
    PageRequest.of(
        0,
        10,
        Sort.by("name").ascending()
    );

Page<Employee> page =
    employeeRepository.findAll(pageable);`
      },

      paragraphs: [
        "This retrieves the first page containing up to 10 employees and requests ascending ordering by name."
      ]
    },

    {
      id: "query-derivation",

      title: "Query Derivation",

      paragraphs: [
        "Spring Data JPA can derive queries from repository method names. This means developers can define a method whose name describes the query and Spring Data can create the query implementation.",
        "This is especially useful for simple queries that follow predictable naming conventions."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByDepartment(
        String department
    );

    List<Employee> findBySalaryGreaterThan(
        double salary
    );
}`
      }
    },

    {
      id: "query-keywords",

      title: "Common Derived Query Keywords",

      code: {
        language: "java",
        code: `findByName(String name)

findByEmail(String email)

findBySalaryGreaterThan(double salary)

findBySalaryLessThan(double salary)

findByNameContaining(String text)

findByNameStartingWith(String text)

findByDepartmentAndSalary(
    String department,
    double salary
)

findByDepartmentOrDepartment(
    String first,
    String second
)`
      },

      bullets: [
        "And combines conditions.",
        "Or combines alternative conditions.",
        "GreaterThan compares numeric or comparable values.",
        "LessThan compares numeric or comparable values.",
        "Containing searches for containing text.",
        "StartingWith searches for a prefix.",
        "EndingWith searches for a suffix.",
        "Between can express a range."
      ]
    },

    {
      id: "query",

      title: "Custom Queries with @Query",

      paragraphs: [
        "When a query is too complex or when explicit query control is preferred, @Query can be used.",
        "JPQL queries normally use entity names and entity attributes rather than database table and column names."
      ],

      code: {
        language: "java",
        code: `@Query("""
       select e
       from Employee e
       where e.department = :department
       """)
List<Employee> findEmployeesByDepartment(
    @Param("department")
    String department
);`
      }
    },

    {
      id: "native-query",

      title: "Native SQL Query",

      paragraphs: [
        "Spring Data JPA can also execute native SQL queries when database-specific SQL is required.",
        "Native queries should be used deliberately because they couple the repository more closely to the database schema and SQL dialect."
      ],

      code: {
        language: "java",
        code: `@Query(
    value = """
        SELECT *
        FROM employees
        WHERE department = :department
        """,
    nativeQuery = true
)
List<Employee> findByDepartmentNative(
    @Param("department")
    String department
);`
      }
    },

    {
      id: "get-reference",

      title: "getReferenceById()",

      paragraphs: [
        "getReferenceById() obtains a reference to an entity by its identifier. Depending on the persistence provider and when the entity's state is accessed, the database may not be queried immediately.",
        "This can be useful when an entity reference is needed for a relationship or operation and the complete entity data is not required immediately."
      ],

      code: {
        language: "java",
        code: `Employee employee =
    employeeRepository.getReferenceById(10L);`
      },

      bullets: [
        "It provides an entity reference.",
        "Database access may be deferred until the entity state is needed.",
        "Accessing a missing entity can result in persistence-related behavior such as an EntityNotFoundException.",
        "Use it when deferred reference behavior is appropriate rather than as a general replacement for findById()."
      ]
    },

    {
      id: "delete-all",

      title: "deleteAll() and deleteAllInBatch()",

      paragraphs: [
        "Spring Data JPA provides different deletion methods. deleteAll() and batch-oriented deletion methods should be understood carefully because bulk operations can have different persistence-context behavior from deleting entities one by one.",
        "Bulk delete operations can bypass normal entity lifecycle processing and can leave already-managed entities stale unless the persistence context is handled appropriately."
      ],

      code: {
        language: "java",
        code: `employeeRepository.deleteAll();

// For a batch-oriented repository operation,
// consult the Spring Data JPA version and method
// semantics before using it in production.`
      }
    },

    {
      id: "transactions",

      title: "Transactions and JpaRepository",

      paragraphs: [
        "Repository operations participate in Spring's transaction infrastructure. When multiple persistence operations form one business operation, the service layer is commonly used to define the transaction boundary with @Transactional.",
        "For example, if updating an employee and inserting an audit record must succeed or fail together, the service method can define the transaction."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void updateEmployee(Long id) {

    Employee employee =
        employeeRepository.findById(id)
            .orElseThrow();

    employee.setName("Updated Name");

    auditRepository.save(
        new Audit("Employee updated")
    );
}`
      }
    },

    {
      id: "repository-service-controller",

      title: "Repository, Service, and Controller Responsibilities",

      paragraphs: [
        "JpaRepository should normally focus on persistence access. The service layer should contain application and business logic, while the controller should handle HTTP-specific concerns."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Controller
     |
     | HTTP concerns
     v
Service
     |
     | Business logic
     v
JpaRepository
     |
     | Persistence access
     v
JPA / Hibernate
     |
     v
Database`
      },

      bullets: [
        "Controller -> request and response handling.",
        "Service -> business rules and transaction orchestration.",
        "Repository -> persistence access.",
        "JPA/Hibernate -> ORM and database interaction."
      ]
    },

    {
      id: "custom-repository-method",

      title: "Adding Custom Repository Methods",

      paragraphs: [
        "A repository can contain derived query methods or explicitly defined query methods in addition to inherited JpaRepository methods."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
        String email
    );

    List<Employee> findByDepartment(
        String department
    );

    @Query("""
        select e
        from Employee e
        where e.salary > :salary
        """)
    List<Employee> findHighEarners(
        @Param("salary")
        double salary
    );
}`
      }
    },

    {
      id: "projections-preview",

      title: "Projection Preview",

      paragraphs: [
        "Spring Data JPA supports projections that can retrieve selected data instead of always materializing the complete entity representation.",
        "Projections can be useful when an API needs only a small subset of fields."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeSummary {

    String getName();

    String getDepartment();
}

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<EmployeeSummary>
    findByDepartment(String department);
}`
      }
    },

    {
      id: "locking-preview",

      title: "Locking Preview",

      paragraphs: [
        "For concurrent updates, JPA supports locking mechanisms such as optimistic and pessimistic locking. Spring Data JPA can expose locking through the @Lock annotation.",
        "Locking should be introduced when the business scenario requires concurrency control rather than being added automatically to every repository method."
      ],

      code: {
        language: "java",
        code: `@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("""
    select e
    from Employee e
    where e.id = :id
    """)
Optional<Employee> findForUpdate(
    @Param("id") Long id
);`
      }
    },

    {
      id: "benefit",

      title: "Why JpaRepository is Useful",

      bullets: [
        "No manual repository implementation for common operations.",
        "Provides CRUD functionality.",
        "Supports pagination.",
        "Supports sorting.",
        "Supports query derivation.",
        "Supports custom queries.",
        "Integrates with JPA.",
        "Works naturally with Spring Boot.",
        "Reduces repetitive persistence code.",
        "Provides a clean persistence abstraction."
      ]
    },

    {
      id: "repository-testing",

      title: "Testing a JpaRepository",

      paragraphs: [
        "Repository tests should verify persistence mappings, queries, constraints, and database-related behavior. Spring Boot provides @DataJpaTest for focused JPA repository testing.",
        "Unlike a service unit test that mocks the repository, a repository test normally exercises real JPA persistence infrastructure."
      ],

      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void shouldFindEmployeeByEmail() {

        Employee employee = new Employee();

        employee.setName("John");
        employee.setEmail("john@example.com");

        employeeRepository.save(employee);

        Optional<Employee> result =
            employeeRepository.findByEmail(
                "john@example.com"
            );

        assertTrue(result.isPresent());
        assertEquals(
            "John",
            result.get().getName()
        );
    }
}`
      }
    },

    {
      id: "repository-flow",

      title: "How JpaRepository Works Internally",

      paragraphs: [
        "When the application calls a repository method, the method is handled by Spring Data's repository infrastructure. The persistence operation is then delegated to JPA infrastructure and the configured JPA provider, commonly Hibernate.",
        "The following diagram is a conceptual representation of the flow."
      ],

      code: {
        language: "text",
        code: `Application
     |
     v
EmployeeRepository
     |
     v
Spring Data Repository Proxy
     |
     v
JPA EntityManager
     |
     v
Hibernate
     |
     v
SQL
     |
     v
JDBC
     |
     v
Database`
      }
    },

    {
      id: "common-mistakes",

      title: "Common JpaRepository Mistakes",

      bullets: [
        "Creating a manual repository implementation for every basic CRUD method.",
        "Using findAll() for very large datasets without pagination.",
        "Calling findById().get() without handling the missing-record case.",
        "Putting business rules directly into the repository.",
        "Using repositories directly from controllers when meaningful business logic belongs in a service.",
        "Writing complex derived query method names that become difficult to understand.",
        "Using native SQL when JPQL or a derived query would be clearer and portable.",
        "Ignoring transaction boundaries when several persistence operations must succeed together.",
        "Assuming save() always means INSERT.",
        "Assuming saveAll() automatically means one optimized database batch.",
        "Ignoring stale persistence-context state when using bulk update or delete operations.",
        "Using getReferenceById() when the application actually needs to verify that the record exists immediately."
      ]
    },

    {
      id: "best-practices",

      title: "JpaRepository Best Practices",

      bullets: [
        "Keep repositories focused on persistence access.",
        "Put business logic in the service layer.",
        "Use constructor injection for repository dependencies.",
        "Use Optional returned by findById() appropriately.",
        "Use pagination for large collections.",
        "Use sorting explicitly when result ordering matters.",
        "Use derived queries for simple readable conditions.",
        "Use @Query when explicit query control improves readability.",
        "Use native queries only when database-specific SQL is justified.",
        "Define transaction boundaries at the service layer for multi-step business operations.",
        "Write repository tests for important mappings and queries.",
        "Be careful with bulk update and delete operations because they can interact differently with the persistence context.",
        "Avoid exposing persistence-specific behavior directly through controller code."
      ]
    },

    {
      id: "complete-example",

      title: "Complete JpaRepository Example",

      code: {
        language: "java",
        code: `@Repository
public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
        String email
    );

    List<Employee> findByDepartment(
        String department
    );

    List<Employee>
    findBySalaryGreaterThan(
        double salary
    );

    @Query("""
        select e
        from Employee e
        where e.department = :department
        and e.salary > :salary
        """)
    List<Employee> findByDepartmentAndMinimumSalary(
        @Param("department")
        String department,

        @Param("salary")
        double salary
    );
}`
      },

      paragraphs: [
        "This repository combines inherited CRUD methods, derived query methods, and an explicit JPQL query."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is JpaRepository?",
          answer:
            "JpaRepository is a Spring Data interface that provides common persistence operations for JPA entities, including CRUD, pagination, sorting, and JPA-oriented repository functionality."
        },

        {
          question: "What are the generic parameters of JpaRepository?",
          answer:
            "The first parameter is the entity type and the second parameter is the entity identifier type. For example, JpaRepository<Employee, Long> manages Employee entities whose ID type is Long."
        },

        {
          question: "Why does findById return Optional?",
          answer:
            "Because the requested entity may not exist, Optional allows the absence of a result to be represented explicitly."
        },

        {
          question: "Does JpaRepository require an implementation class?",
          answer:
            "Not for standard repository operations. You normally define an interface extending JpaRepository, and Spring Data provides the repository implementation through its runtime infrastructure."
        },

        {
          question: "What methods does JpaRepository provide?",
          answer:
            "It provides methods such as save, saveAll, findById, findAll, existsById, count, delete, deleteById, and other repository capabilities including pagination and sorting."
        },

        {
          question: "What does save() do?",
          answer:
            "save() persists an entity or handles an existing entity according to Spring Data JPA's entity-newness detection and JPA persistence semantics. It does not simply mean INSERT in every case."
        },

        {
          question: "What is saveAll()?",
          answer:
            "saveAll() accepts an iterable collection of entities and saves them through the repository."
        },

        {
          question: "What is findAll()?",
          answer:
            "findAll() retrieves the entities available through the repository. For large datasets, a pageable query is usually more appropriate."
        },

        {
          question: "What is deleteById()?",
          answer:
            "deleteById() requests deletion of the entity identified by the supplied identifier."
        },

        {
          question: "What is existsById()?",
          answer:
            "existsById() checks whether an entity with the supplied identifier exists."
        },

        {
          question: "What is the difference between delete() and deleteById()?",
          answer:
            "delete() accepts an entity instance, while deleteById() accepts the entity identifier."
        },

        {
          question: "How does pagination work in JpaRepository?",
          answer:
            "A Pageable such as PageRequest is supplied to a repository method, and the result can be returned as a Page containing both the requested content and pagination metadata."
        },

        {
          question: "Why is pagination important?",
          answer:
            "Pagination prevents the application from loading an unnecessarily large number of records into memory and reduces database, network, and response costs."
        },

        {
          question: "What is Sort?",
          answer:
            "Sort is a Spring Data abstraction used to specify ordering of query results, such as ascending or descending order by an entity property."
        },

        {
          question: "What is query derivation?",
          answer:
            "Query derivation allows Spring Data to create repository queries from method names, such as findByEmail() or findBySalaryGreaterThan()."
        },

        {
          question: "What is @Query?",
          answer:
            "@Query allows a repository method to define an explicit query, commonly using JPQL. It is useful when a derived query method is not appropriate or when explicit query control improves readability."
        },

        {
          question: "What is the difference between JPQL and native SQL in @Query?",
          answer:
            "JPQL queries JPA entities and their attributes, while nativeQuery=true allows the repository to execute database SQL directly against tables and columns."
        },

        {
          question: "What is getReferenceById()?",
          answer:
            "getReferenceById() obtains an entity reference by ID and may defer database access until the entity state is actually needed. It is useful when a reference is sufficient and immediate loading is unnecessary."
        },

        {
          question: "What is the difference between findById() and getReferenceById()?",
          answer:
            "findById() is designed to retrieve an entity and returns Optional. getReferenceById() obtains a reference that may defer database access and does not use Optional to represent absence."
        },

        {
          question: "Can JpaRepository execute custom queries?",
          answer:
            "Yes. Repository methods can use derived query methods, @Query with JPQL, and native SQL queries when nativeQuery=true is appropriate."
        },

        {
          question: "What is the role of JpaRepository in layered architecture?",
          answer:
            "JpaRepository normally provides the persistence-access layer. The service layer uses it to perform data operations while applying business rules and transaction orchestration."
        },

        {
          question: "Should a controller directly call JpaRepository?",
          answer:
            "It can technically do so, but a service layer is usually preferred when business logic, transactions, validation coordination, or orchestration is involved."
        },

        {
          question: "What happens internally when a JpaRepository method is called?",
          answer:
            "Spring Data handles the repository abstraction, delegates persistence operations to JPA infrastructure, and the configured JPA provider such as Hibernate performs ORM work and database interaction."
        },

        {
          question: "What is the difference between JpaRepository and EntityManager?",
          answer:
            "EntityManager is a standard JPA API for persistence-context operations, while JpaRepository is a higher-level Spring Data abstraction providing convenient CRUD, query, pagination, and sorting operations."
        },

        {
          question: "Does saveAll() guarantee a single SQL statement?",
          answer:
            "No. saveAll() processes multiple entities through repository persistence operations. Database batching is a separate concern and depends on Hibernate configuration, JDBC behavior, database capabilities, and entity-generation strategy."
        },

        {
          question: "What is a repository proxy?",
          answer:
            "A repository proxy is the runtime-generated implementation used by Spring Data to intercept repository method calls and perform the corresponding persistence operations."
        },

        {
          question: "Why should repository methods not contain business logic?",
          answer:
            "Repositories should focus on data access. Business rules are usually easier to maintain and test in the service layer, while the repository remains responsible for persistence concerns."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "An interviewer asks: How does JpaRepository.findById(10L) reach MySQL?",
          answer:
            "The application calls the repository proxy. Spring Data JPA processes the repository method through JPA infrastructure. The JPA EntityManager and configured provider, commonly Hibernate, perform the persistence operation. Hibernate generates the required SQL, JDBC executes it through the database driver, MySQL returns the result, and Hibernate maps the result to an Employee entity."
        },

        {
          question: "You have 5 million employees. Would you use findAll()?",
          answer:
            "No. I would normally use pagination or another controlled retrieval strategy. Loading millions of records into memory would be inefficient. I would use Pageable and retrieve only the required page."
        },

        {
          question: "When would you use a derived query versus @Query?",
          answer:
            "I would use a derived query when the condition is simple and the method name remains readable. For more complex queries, joins, projections, or cases where explicit query control improves readability, I would use @Query."
        },

        {
          question: "Why might you use getReferenceById() instead of findById()?",
          answer:
            "If I only need an entity reference, such as assigning an existing entity to a relationship, and I do not need its complete state immediately, getReferenceById() may avoid immediate loading. I would use findById() when I need to verify existence and access the entity data."
        },

        {
          question: "You need to update an employee and save an audit record atomically. Where would you put the transaction?",
          answer:
            "I would normally put the transaction boundary around the service method that coordinates both operations. That keeps the business operation together and allows both database changes to succeed or roll back as one transaction."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "JpaRepository is a Spring Data JPA repository abstraction.",
        "JpaRepository<Entity, ID> uses the entity type first and ID type second.",
        "save() handles persistence of new or existing entities.",
        "saveAll() saves multiple entities.",
        "findById() returns Optional.",
        "findAll() retrieves all entities and can be expensive for large tables.",
        "existsById() checks existence.",
        "count() returns the entity count.",
        "delete() deletes an entity.",
        "deleteById() deletes using the identifier.",
        "Pageable enables pagination.",
        "Sort enables ordering.",
        "Derived queries are created from method names.",
        "@Query provides explicit queries.",
        "getReferenceById() provides a potentially lazy entity reference.",
        "Repositories should focus on persistence access.",
        "Business logic normally belongs in the service layer."
      ],

      code: {
        language: "text",
        code: `JpaRepository Cheat Sheet

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}


CRUD
save()
saveAll()
findById()
findAll()
existsById()
count()
delete()
deleteById()


Pagination
findAll(Pageable)


Sorting
findAll(Sort)


Derived Query
findByEmail()


Custom Query
@Query("...")


Reference
getReferenceById(id)`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "JpaRepository is an abstraction; Spring Data creates the implementation at runtime.",
        "The first generic parameter represents the entity type.",
        "The second generic parameter represents the entity ID type.",
        "save() does not simply mean INSERT; behavior depends on whether the entity is considered new.",
        "findById() returns Optional because the record may not exist.",
        "findAll() should be used carefully for large datasets.",
        "Use Pageable for large collection endpoints.",
        "Use Sort when result ordering matters.",
        "Use derived queries for simple, readable query conditions.",
        "Use @Query when explicit query control is useful.",
        "Use native SQL deliberately because it increases database coupling.",
        "getReferenceById() may defer database access and is not a direct replacement for findById().",
        "Bulk update and delete operations require attention to persistence-context state.",
        "Use service-layer transactions when several repository operations form one business operation.",
        "For interviews, remember: JpaRepository provides the repository abstraction, JPA provides the persistence API, and Hibernate commonly performs the underlying ORM work."
      ]
    }
  ]
};
