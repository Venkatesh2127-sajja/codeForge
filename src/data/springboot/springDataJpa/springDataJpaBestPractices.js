
export const springDataJpaBestPractices = {
  id: 810,

  title: "Spring Data JPA Best Practices",

  slug: "spring-data-jpa-best-practices",

  topicTitle: "Spring Data JPA",

  description:
    "Learn practical Spring Data JPA practices for designing maintainable, efficient, and reliable database access in Spring Boot applications.",

  estimatedTime: "60 min",

  sections: [
    {
      id: "importance",

      title: "Why JPA Best Practices Matter",

      paragraphs: [
        "Spring Data JPA makes database access easier, but applications can still suffer from poor query design, excessive data loading, incorrect transaction boundaries, inefficient entity usage, and unnecessary database calls.",
        "A good JPA design should keep persistence code maintainable while controlling database interactions carefully.",
        "JPA removes much of the repetitive JDBC code, but it does not remove the need to understand transactions, SQL, indexes, entity state, relationships, and database performance."
      ],

      bullets: [
        "Keep persistence responsibilities focused.",
        "Avoid loading data that the API does not need.",
        "Use transactions deliberately.",
        "Use pagination for large collections.",
        "Monitor important generated SQL.",
        "Test persistence behavior.",
        "Understand entity relationships and fetch behavior."
      ]
    },

    {
      id: "repository",

      title: "1. Keep Repository Responsibilities Focused",

      paragraphs: [
        "Repositories should primarily handle persistence operations and database queries. Business rules should generally remain in the service or domain layer.",
        "A repository should answer questions such as how to find, save, update, or delete persistent data. It should not normally decide business policies such as whether an employee is allowed to change departments."
      ],

      code: {
        language: "text",
        code: `Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database`
      },

      bullets: [
        "Repository: persistence and query operations.",
        "Service: application and business logic.",
        "Controller: HTTP request and response handling.",
        "Entity: persistent domain state."
      ]
    },

    {
      id: "repository-example",

      title: "Focused Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
        String email
    );

    Page<Employee> findByDepartment(
        String department,
        Pageable pageable
    );
}`
      },

      paragraphs: [
        "The repository defines how employees are retrieved from persistence. It does not decide what business action should happen after an employee is retrieved."
      ]
    },

    {
      id: "service-boundary",

      title: "Keep Business Logic in the Service Layer",

      paragraphs: [
        "The service layer is commonly responsible for coordinating repositories, applying business rules, validating application-level conditions, and defining transaction boundaries."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void changeDepartment(
            Long employeeId,
            String department) {

        Employee employee =
            repository.findById(employeeId)
                .orElseThrow();

        // Business rule can be applied here.

        employee.setDepartment(department);
    }
}`
      }
    },

    {
      id: "dto",

      title: "2. Use DTOs for API Boundaries",

      paragraphs: [
        "Avoid exposing JPA entities directly as the API contract when a separate DTO provides a cleaner boundary between persistence and the external API.",
        "A DTO allows the API response structure to evolve independently from the database entity model.",
        "DTOs also help prevent accidental exposure of internal fields and can avoid serialization problems caused by entity relationships."
      ],

      code: {
        language: "text",
        code: `HTTP Request
    |
    v
EmployeeCreateRequest
    |
    v
Service
    |
    v
Employee Entity
    |
    v
Repository`
      }
    },

    {
      id: "dto-response",

      title: "Entity to DTO Response",

      code: {
        language: "java",
        code: `public record EmployeeResponse(
    Long id,
    String name,
    String email
) {
}


// Service

public EmployeeResponse getEmployee(Long id) {

    Employee employee =
        repository.findById(id)
            .orElseThrow();

    return new EmployeeResponse(
        employee.getId(),
        employee.getName(),
        employee.getEmail()
    );
}`
      }
    },

    {
      id: "dto-request",

      title: "Use Request DTOs for Input",

      paragraphs: [
        "Request DTOs are useful because the client should not normally control every field of a persistence entity. For example, an ID, audit field, or internal status may be managed by the server."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(
    String name,
    String email,
    String department
) {
}`
      }
    },

    {
      id: "pagination",

      title: "3. Use Pagination for Large Result Sets",

      paragraphs: [
        "Avoid returning thousands or millions of database rows from a single API request. Use Pageable and Page for endpoints that can return large collections.",
        "Pagination reduces the amount of data returned in a single request and can reduce memory and network usage."
      ],

      code: {
        language: "java",
        code: `Pageable pageable =
        PageRequest.of(0, 20);

Page<Employee> employees =
        employeeRepository.findAll(pageable);`
      }
    },

    {
      id: "pagination-limits",

      title: "Set a Maximum Page Size",

      paragraphs: [
        "Pagination is less useful if a client can request an arbitrarily large page. APIs should generally enforce a sensible maximum page size."
      ],

      code: {
        language: "java",
        code: `int safeSize = Math.min(
    Math.max(size, 1),
    100
);

Pageable pageable =
    PageRequest.of(page, safeSize);`
      },

      bullets: [
        "Reject or normalize invalid page numbers.",
        "Prevent extremely large page sizes.",
        "Choose defaults appropriate for the endpoint.",
        "Use Slice when total-count metadata is unnecessary."
      ]
    },

    {
      id: "query",

      title: "4. Choose the Right Query Strategy",

      paragraphs: [
        "Use derived query methods for simple conditions. Use @Query when the query is more complex or when an explicit query communicates the intent more clearly.",
        "For highly dynamic filtering, specifications or other query-building mechanisms may be more appropriate than creating extremely long repository method names."
      ],

      code: {
        language: "java",
        code: `// Simple

List<Employee> findByDepartment(
        String department
);


// Explicit

@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
List<Employee> findEmployees(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "query-selection",

      title: "Select Only the Data You Need",

      paragraphs: [
        "Avoid loading a complete entity graph when the API only needs a small number of fields. Projections or DTO queries can reduce unnecessary data loading."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT new com.example.employee.EmployeeSummary(
           e.id,
           e.name,
           e.department
       )
       FROM Employee e
       WHERE e.active = true
       """)
List<EmployeeSummary> findActiveSummaries();`
      }
    },

    {
      id: "transactions",

      title: "5. Use Transactions at Appropriate Boundaries",

      paragraphs: [
        "Operations that modify multiple pieces of persistent state should have an appropriate transaction boundary so that related changes can succeed or fail consistently.",
        "In a typical layered Spring Boot application, transaction boundaries are commonly placed at the service layer."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void updateEmployeeDepartment(
        Long employeeId,
        String department) {

    Employee employee =
            employeeRepository.findById(employeeId)
                .orElseThrow();

    employee.setDepartment(department);
}`
      }
    },

    {
      id: "transaction-read",

      title: "Keep Read and Write Transactions Intentional",

      paragraphs: [
        "Not every service method requires an explicitly declared @Transactional annotation. The transaction requirement depends on the operation and application's consistency needs.",
        "For read-only workloads, a read-only transaction can communicate intent and may provide provider/database-specific optimizations, but it should not be treated as a universal performance switch."
      ],

      code: {
        language: "java",
        code: `@Transactional(readOnly = true)
public EmployeeResponse getEmployee(
        Long id) {

    Employee employee =
        employeeRepository.findById(id)
            .orElseThrow();

    return mapToResponse(employee);
}`
      }
    },

    {
      id: "transaction-scope",

      title: "Keep Transaction Scope Reasonable",

      paragraphs: [
        "A transaction should contain the database work that needs to be atomic. Keeping transactions unnecessarily open while performing slow external calls or unrelated work can increase database connection usage and lock duration."
      ],

      code: {
        language: "text",
        code: `Prefer:

Transaction
    |
    +-- Read/update database
    +-- Save related changes
    |
Commit


Avoid unnecessarily:

Transaction
    |
    +-- Database operation
    +-- Slow HTTP call
    +-- Long computation
    +-- User interaction
    |
Commit`
      }
    },

    {
      id: "dirty-checking",

      title: "Use JPA Dirty Checking Carefully",

      paragraphs: [
        "A managed entity can be changed inside a transaction without explicitly calling repository.save() for every field update. JPA can detect the change and synchronize it with the database during flush.",
        "This behavior is known as dirty checking."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void updateDepartment(
        Long id,
        String department) {

    Employee employee =
        employeeRepository.findById(id)
            .orElseThrow();

    employee.setDepartment(department);

    // No explicit save is required
    // for this managed entity update.
}`
      }
    },

    {
      id: "save-usage",

      title: "Use save() Intentionally",

      paragraphs: [
        "Repository save() is appropriate when creating or explicitly persisting an entity according to the repository operation. For managed entities already loaded inside a transaction, changing their state can be sufficient because dirty checking detects the modification.",
        "The exact behavior of save() depends on whether Spring Data considers the entity new and whether the persistence provider uses persist or merge."
      ],

      code: {
        language: "java",
        code: `Employee employee =
    repository.findById(id)
        .orElseThrow();

employee.setDepartment("IT");

// Managed entity.
// Dirty checking can synchronize the change.
`
      }
    },

    {
      id: "avoid-n-plus-one",

      title: "6. Be Aware of the N+1 Query Problem",

      paragraphs: [
        "The N+1 query problem can occur when loading a collection of entities and then triggering additional queries for related data one entity at a time.",
        "This can produce many database queries and significantly affect application performance."
      ],

      code: {
        language: "text",
        code: `1 query
   |
   v
Load 100 employees

Then:

100 additional queries
   |
   v
Load related data

Total:
101 queries`
      }
    },

    {
      id: "n-plus-one-example",

      title: "Typical N+1 Example",

      paragraphs: [
        "Suppose employees have a lazy relationship to projects. Loading 100 employees and then accessing employee.getProjects() inside a loop can trigger additional queries if the relationship is not already initialized."
      ],

      code: {
        language: "java",
        code: `List<Employee> employees =
    repository.findAll();

for (Employee employee : employees) {

    // May trigger another query
    // for each employee when lazy
    // relationship is accessed.

    employee.getProjects().size();
}`
      }
    },

    {
      id: "n-plus-one-solutions",

      title: "Ways to Address N+1 Queries",

      bullets: [
        "Use a carefully designed fetch join when appropriate.",
        "Use EntityGraph for selected fetch plans.",
        "Use DTO projections when only specific fields are needed.",
        "Review generated SQL and query counts.",
        "Avoid blindly changing every relationship to EAGER.",
        "Consider batch fetching where appropriate.",
        "Test important queries with realistic relationship sizes."
      ]
    },

    {
      id: "sql",

      title: "7. Understand the SQL Behind JPA",

      paragraphs: [
        "Using JPA does not remove the need to understand databases and SQL. Developers should understand what queries their repository methods and entity relationships cause the application to execute.",
        "When an endpoint becomes slow, knowing the generated SQL helps identify missing indexes, unnecessary joins, excessive result sets, expensive sorting, or unexpected additional queries."
      ]
    },

    {
      id: "sql-logging",

      title: "Inspect Generated SQL During Development",

      paragraphs: [
        "SQL logging can be useful during development and troubleshooting. Production logging should be configured carefully because SQL and parameter values can contain sensitive information and generate significant log volume."
      ],

      code: {
        language: "yaml",
        code: `spring:
  jpa:
    show-sql: true`
      }
    },

    {
      id: "query-performance",

      title: "Check Query Performance",

      paragraphs: [
        "When a query is slow, do not assume that the repository method is the only problem. Inspect the generated SQL, database execution plan, indexes, number of returned rows, joins, sorting, and filtering conditions."
      ],

      code: {
        language: "text",
        code: `Slow API
   |
   v
Repository method
   |
   v
Generated SQL
   |
   +-- WHERE
   +-- JOIN
   +-- ORDER BY
   |
   v
Database execution plan
   |
   +-- Index usage
   +-- Rows examined
   +-- Join strategy
   +-- Sorting cost
   |
   v
Optimization`
      }
    },

    {
      id: "lazy",

      title: "8. Understand Fetching Strategies",

      paragraphs: [
        "Entity relationships can involve different fetching behavior. Developers should understand when related data is loaded and avoid loading large object graphs unnecessarily.",
        "Lazy loading can reduce unnecessary initial data retrieval, but accessing lazy relationships outside an appropriate persistence context can lead to LazyInitializationException.",
        "Changing everything to EAGER is usually not a good solution because it can cause unnecessarily large queries or object graphs."
      ]
    },

    {
      id: "fetch-join",

      title: "Use Fetch Joins Carefully",

      paragraphs: [
        "A fetch join can load associated data as part of the same query. It can be useful for solving specific N+1 scenarios, but collection fetch joins should be designed carefully, especially with pagination."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT DISTINCT e
       FROM Employee e
       JOIN FETCH e.projects
       WHERE e.department = :department
       """)
List<Employee> findEmployeesWithProjects(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "entity-graph",

      title: "Consider EntityGraph for Fetch Plans",

      paragraphs: [
        "EntityGraph can be used to specify which relationships should be fetched for a particular repository operation without changing the default mapping fetch strategy."
      ],

      code: {
        language: "java",
        code: `@EntityGraph(attributePaths = {"projects"})
Optional<Employee> findWithProjectsById(
        Long id
);`
      }
    },

    {
      id: "relationships",

      title: "9. Design Entity Relationships Carefully",

      paragraphs: [
        "Relationships such as OneToMany, ManyToOne, and ManyToMany should be mapped according to actual application requirements.",
        "A relationship should not be added merely because two tables happen to be related in the database. Consider ownership, lifecycle, navigation direction, fetching, cascading, and API requirements."
      ],

      code: {
        language: "java",
        code: `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;`
      }
    },

    {
      id: "cascade",

      title: "Use Cascade Carefully",

      paragraphs: [
        "Cascade settings control whether certain persistence operations propagate from one entity to related entities.",
        "CascadeType.ALL should not be added automatically to every relationship. The correct cascade behavior depends on the lifecycle relationship between the entities."
      ],

      code: {
        language: "java",
        code: `@OneToMany(
    mappedBy = "employee",
    cascade = CascadeType.ALL,
    orphanRemoval = true
)
private List<EmployeeAddress> addresses;`
      }
    },

    {
      id: "orphan-removal",

      title: "Understand orphanRemoval",

      paragraphs: [
        "orphanRemoval can be useful when a child entity is conceptually owned by its parent and should be removed when it is removed from the parent's relationship.",
        "It should not be used blindly on relationships where the child has an independent lifecycle."
      ]
    },

    {
      id: "repository-methods",

      title: "10. Keep Repository Methods Readable",

      paragraphs: [
        "Derived query methods are excellent for simple queries, but extremely long method names become difficult to understand and maintain."
      ],

      code: {
        language: "java",
        code: `// Readable

List<Employee> findByDepartment(
    String department
);


// Warning sign: query is becoming too complex

List<Employee>
findByDepartmentAndNameContainingAndSalaryGreaterThanAndActiveTrueOrderBySalaryDesc(
    String department,
    String name,
    BigDecimal salary
);`
      }
    },

    {
      id: "query-strategy",

      title: "Choose the Query Tool Based on Complexity",

      code: {
        language: "text",
        code: `Simple fixed condition
        |
        v
Derived Query


Explicit complex query
        |
        v
@Query / JPQL


Highly dynamic filtering
        |
        v
Specification / Criteria / Query DSL


Database-specific SQL
        |
        v
Native Query`
      }
    },

    {
      id: "pagination-sorting",

      title: "11. Use Pagination and Sorting Together",

      paragraphs: [
        "Large collection endpoints should normally support pagination. Sorting should also be deterministic so that records do not move unpredictably between pages."
      ],

      code: {
        language: "java",
        code: `Pageable pageable =
    PageRequest.of(
        0,
        20,
        Sort.by(
            Sort.Order.asc("name"),
            Sort.Order.asc("id")
        )
    );

Page<Employee> page =
    repository.findAll(pageable);`
      },

      bullets: [
        "Keep page sizes bounded.",
        "Validate client-provided sort fields.",
        "Use stable sorting where possible.",
        "Consider Slice when total counts are unnecessary.",
        "Consider keyset pagination for very large datasets."
      ]
    },

    {
      id: "locking",

      title: "12. Understand Optimistic and Pessimistic Locking",

      paragraphs: [
        "Concurrent updates can cause data consistency problems when multiple transactions modify the same data.",
        "Optimistic locking commonly uses a version field and detects conflicting updates. Pessimistic locking can explicitly lock database rows for certain operations."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private Long id;

    @Version
    private Long version;
}`
      }
    },

    {
      id: "optimistic-locking",

      title: "Optimistic Locking with @Version",

      paragraphs: [
        "The @Version field allows JPA to detect whether another transaction changed the entity after it was read.",
        "If a conflicting update is detected, the application can handle the optimistic-locking failure rather than silently overwriting another transaction's changes."
      ],

      code: {
        language: "text",
        code: `Transaction A
    |
    | reads version 5
    v
Employee

Transaction B
    |
    | reads version 5
    v
Employee

A updates
version becomes 6

B tries update using version 5
    |
    v
Conflict detected`
      }
    },

    {
      id: "auditing",

      title: "13. Use Auditing for Created and Updated Information",

      paragraphs: [
        "Applications often need to know when an entity was created or updated and sometimes which user performed the operation.",
        "Spring Data auditing can help maintain these fields consistently."
      ],

      code: {
        language: "java",
        code: `@Entity
@EntityListeners(AuditingEntityListener.class)
public class Employee {

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}`
      }
    },

    {
      id: "entity-design",

      title: "14. Keep Entity Design Clean",

      bullets: [
        "Give entities a clear identity using @Id.",
        "Keep persistent fields meaningful.",
        "Avoid putting API-specific response formatting into entities.",
        "Be careful with equals() and hashCode() for entities.",
        "Be careful with toString() when relationships are present.",
        "Avoid serializing large bidirectional relationship graphs directly.",
        "Use DTOs for external API contracts.",
        "Use appropriate column constraints and database constraints."
      ]
    },

    {
      id: "equals-hashcode",

      title: "Be Careful with equals(), hashCode(), and toString()",

      paragraphs: [
        "Entity equality is more subtle than equality for ordinary Java value objects because entities can transition between transient, managed, detached, and persistent states.",
        "Including mutable relationship fields in equals(), hashCode(), or toString() can cause unexpected behavior, recursive output, or excessive lazy loading."
      ],

      code: {
        language: "text",
        code: `Avoid blindly generating:

equals()
hashCode()
toString()

using every entity field and relationship.

Consider:

Entity identity
Stable equality semantics
Lazy relationships
Proxy behavior
Collection relationships`
      }
    },

    {
      id: "database-constraints",

      title: "15. Use Database Constraints as Well as Java Validation",

      paragraphs: [
        "Application validation improves user-facing error messages, but important data integrity rules should also be enforced at the database level when appropriate.",
        "For example, an email that must be unique should have a database uniqueness constraint rather than relying only on an application-level check."
      ],

      code: {
        language: "java",
        code: `@Column(
    nullable = false,
    unique = true
)
private String email;`
      }
    },

    {
      id: "indexes",

      title: "16. Use Indexes for Important Query Patterns",

      paragraphs: [
        "Indexes can significantly improve searches, joins, and sorting for appropriate workloads. However, indexes also consume storage and can increase write cost.",
        "Indexes should be based on real query patterns rather than added indiscriminately."
      ],

      code: {
        language: "java",
        code: `@Table(
    indexes = {
        @Index(
            name = "idx_employee_department",
            columnList = "department"
        )
    }
)
@Entity
public class Employee {
    // fields
}`
      }
    },

    {
      id: "bulk-operations",

      title: "17. Be Careful with Bulk Updates and Deletes",

      paragraphs: [
        "Bulk JPQL UPDATE and DELETE operations can be efficient because they modify many rows without loading every entity into the persistence context.",
        "However, they can bypass normal entity-level lifecycle behavior and can leave already-managed entities stale."
      ],

      code: {
        language: "java",
        code: `@Modifying(clearAutomatically = true)
@Query("""
       UPDATE Employee e
       SET e.active = false
       WHERE e.department = :department
       """)
int deactivateDepartment(
    @Param("department")
    String department
);`
      }
    },

    {
      id: "flush",

      title: "18. Understand Flush vs Commit",

      paragraphs: [
        "Flush synchronizes pending persistence changes from the persistence context to the database. Commit completes the transaction.",
        "A flush does not mean that the transaction has committed successfully."
      ],

      code: {
        language: "text",
        code: `Entity change
     |
     v
Persistence Context
     |
     | flush
     v
Database
     |
     | commit
     v
Transaction completed`
      }
    },

    {
      id: "lazy-initialization",

      title: "19. Avoid LazyInitializationException by Designing the Use Case",

      paragraphs: [
        "A LazyInitializationException can occur when application code tries to access a lazy relationship after the persistence context is no longer available.",
        "The solution should generally be to design the query and transaction boundary correctly rather than simply making every relationship EAGER."
      ],

      code: {
        language: "text",
        code: `Request
  |
  v
Service transaction
  |
  +-- load required data
  +-- map to DTO
  |
  v
Transaction ends
  |
  v
Controller
  |
  v
JSON response`
      }
    },

    {
      id: "service-mapping",

      title: "20. Map Entities to DTOs Inside the Appropriate Boundary",

      paragraphs: [
        "Mapping entities to DTOs while the required data is available can prevent the web layer from unexpectedly triggering lazy loads.",
        "The exact location of mapping can vary by architecture, but the important point is to make required data access explicit."
      ],

      code: {
        language: "java",
        code: `@Transactional(readOnly = true)
public EmployeeResponse getEmployee(Long id) {

    Employee employee =
        repository.findById(id)
            .orElseThrow();

    return new EmployeeResponse(
        employee.getId(),
        employee.getName(),
        employee.getEmail()
    );
}`
      }
    },

    {
      id: "testing",

      title: "21. Test Repository and Service Behavior",

      bullets: [
        "Test repository queries.",
        "Test CRUD operations.",
        "Test not-found scenarios.",
        "Test pagination.",
        "Test sorting.",
        "Test relationships.",
        "Test transaction-related behavior.",
        "Test important business queries.",
        "Test constraint violations.",
        "Test optimistic-locking behavior when concurrency matters."
      ]
    },

    {
      id: "repository-testing",

      title: "Repository Testing with @DataJpaTest",

      paragraphs: [
        "@DataJpaTest is useful for focused JPA repository tests because it loads the JPA-related test infrastructure rather than the entire application in the same way as a full @SpringBootTest."
      ],

      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void shouldFindByDepartment() {

        List<Employee> employees =
            repository.findByDepartment("IT");

        assertTrue(
            employees.stream()
                .allMatch(
                    e -> "IT".equals(
                        e.getDepartment()
                    )
                )
        );
    }
}`
      }
    },

    {
      id: "service-testing",

      title: "Service Testing",

      paragraphs: [
        "Service tests should focus on application and business behavior. Repository dependencies can usually be mocked for unit tests."
      ],

      code: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @InjectMocks
    private EmployeeService service;

    @Test
    void shouldThrowWhenEmployeeDoesNotExist() {

        when(repository.findById(1L))
            .thenReturn(Optional.empty());

        assertThrows(
            EmployeeNotFoundException.class,
            () -> service.getEmployee(1L)
        );
    }
}`
      }
    },

    {
      id: "integration-testing",

      title: "Use Integration Tests for Persistence Behavior",

      paragraphs: [
        "Mockito unit tests cannot prove that JPA mappings, SQL generation, transactions, database constraints, or repository queries work correctly.",
        "Use repository or integration tests when real persistence behavior is what needs to be verified."
      ],

      code: {
        language: "text",
        code: `Unit Test
    |
    +-- Business logic
    +-- Mock repository


Repository Test
    |
    +-- Entity mapping
    +-- Repository query
    +-- Database interaction


Integration Test
    |
    +-- Multiple application layers
    +-- Real infrastructure boundaries`
      }
    },

    {
      id: "checklist",

      title: "Spring Data JPA Checklist",

      bullets: [
        "Use @Entity for persistent classes.",
        "Define a clear primary key.",
        "Use JpaRepository for common persistence operations.",
        "Use derived queries for simple conditions.",
        "Use @Query for complex queries.",
        "Use DTOs at API boundaries.",
        "Use pagination for large datasets.",
        "Define appropriate transaction boundaries.",
        "Understand entity relationships and fetching.",
        "Monitor generated SQL for important operations.",
        "Use indexes based on real query patterns.",
        "Avoid unnecessary EAGER loading.",
        "Watch for N+1 queries.",
        "Be careful with bulk UPDATE and DELETE operations.",
        "Use optimistic locking where concurrent updates require it.",
        "Use database constraints for important integrity rules.",
        "Test important persistence behavior.",
        "Keep repository methods focused and readable."
      ]
    },

    {
      id: "architecture",

      title: "Recommended Architecture",

      code: {
        language: "text",
        code: `React / Client
       |
       v
REST Controller
       |
       v
Request DTO
       |
       v
Service
       |
       +-- Business Rules
       +-- Transaction Boundary
       |
       v
Repository
       |
       v
Spring Data JPA
       |
       v
JPA
       |
       v
Hibernate
       |
       v
MySQL`
      }
    },

    {
      id: "complete-flow",

      title: "Complete Persistence Request Flow",

      paragraphs: [
        "A typical Spring Boot application separates HTTP concerns, application logic, persistence abstraction, ORM behavior, and database execution."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Controller
     |
     | Request DTO
     v
Service
     |
     | Transaction
     v
Repository
     |
     | Spring Data
     v
JPA / Hibernate
     |
     | SQL
     v
MySQL
     |
     | Result
     v
Hibernate
     |
     | Entity
     v
Service
     |
     | Response DTO
     v
Controller
     |
     | JSON
     v
HTTP Response`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Spring Data JPA Mistakes",

      bullets: [
        "Putting business logic directly in repositories.",
        "Returning entities directly from every REST endpoint.",
        "Loading entire tables when only a few records are required.",
        "Using EAGER fetching as a universal solution.",
        "Ignoring N+1 queries.",
        "Creating unnecessarily long derived query method names.",
        "Using @Query when a simple derived query would be clearer.",
        "Using derived queries for logic that is too complex to understand.",
        "Keeping transactions open during slow external operations.",
        "Ignoring database indexes.",
        "Assuming save() is required after every modification of a managed entity.",
        "Ignoring persistence-context effects of bulk updates.",
        "Using database column names in JPQL instead of entity property names.",
        "Ignoring LazyInitializationException until production.",
        "Returning huge unpaginated collections.",
        "Using Object[] projections when a typed DTO would be clearer.",
        "Testing only service mocks and never testing important repository queries.",
        "Relying only on application validation for critical database constraints."
      ]
    },

    {
      id: "production",

      title: "Production-Oriented JPA Practices",

      bullets: [
        "Monitor slow database queries.",
        "Review execution plans for important queries.",
        "Use connection pooling appropriately.",
        "Set reasonable transaction boundaries.",
        "Keep large collection APIs paginated.",
        "Avoid accidental N+1 queries.",
        "Use appropriate database indexes.",
        "Avoid logging sensitive SQL parameters in production.",
        "Use migrations for controlled schema changes.",
        "Test against a database behavior close to production when database-specific behavior matters.",
        "Measure before and after performance changes."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What are important Spring Data JPA best practices?",
          answer:
            "Use focused repositories, DTOs at API boundaries, appropriate transactions, pagination, suitable query strategies, careful entity fetching, proper database constraints, and repository testing."
        },

        {
          question: "What is the N+1 query problem?",
          answer:
            "It occurs when an initial query loads a collection and additional queries are executed individually for related data, potentially causing a large number of database queries."
        },

        {
          question: "Why should developers understand SQL when using JPA?",
          answer:
            "JPA abstracts many database operations, but understanding SQL is still important for diagnosing query performance, joins, indexes, sorting, and unexpected database access."
        },

        {
          question: "Should repositories contain business logic?",
          answer:
            "Repositories should primarily focus on persistence and queries. Business logic is generally better placed in the service or domain layer."
        },

        {
          question: "Why should DTOs be used instead of exposing entities directly?",
          answer:
            "DTOs create a boundary between the persistence model and API contract, prevent accidental exposure of internal fields, and give the API freedom to evolve independently of entity mappings."
        },

        {
          question: "Why is pagination important?",
          answer:
            "Pagination prevents APIs from loading and transferring unnecessarily large result sets at once and reduces response, memory, and network costs."
        },

        {
          question: "Where should @Transactional normally be placed?",
          answer:
            "In a layered Spring application, transaction boundaries are commonly placed on service methods because the service coordinates the business operation and the required repository calls."
        },

        {
          question: "Does every service method need @Transactional?",
          answer:
            "No. The need depends on the operation. Methods that require an atomic persistence operation or managed-entity changes often need a transaction, while not every read or non-persistent operation requires an explicit transaction."
        },

        {
          question: "What is dirty checking?",
          answer:
            "Dirty checking is JPA's mechanism for detecting changes made to managed entities and synchronizing those changes with the database during flush."
        },

        {
          question: "Do you always need to call save() after changing a managed entity?",
          answer:
            "No. When an entity is already managed inside an appropriate transaction, changing its state can be detected through dirty checking. save() may still be appropriate depending on the operation and repository usage."
        },

        {
          question: "What is LazyInitializationException?",
          answer:
            "It can occur when a lazy relationship is accessed after the persistence context needed to initialize it is no longer available."
        },

        {
          question: "Why is changing every relationship to EAGER not a good solution?",
          answer:
            "EAGER fetching can cause unnecessary joins, larger object graphs, more database work, and unexpected performance problems. Fetching should be designed around the actual use case."
        },

        {
          question: "How can you solve an N+1 query problem?",
          answer:
            "Depending on the use case, options include fetch joins, EntityGraph, DTO projections, batch fetching, or restructuring the query. The generated SQL should be inspected to choose the correct solution."
        },

        {
          question: "What is the difference between flush and commit?",
          answer:
            "Flush synchronizes pending persistence changes with the database, while commit completes the transaction. A flush does not by itself mean that the transaction has committed."
        },

        {
          question: "Why should bulk updates be used carefully?",
          answer:
            "Bulk updates operate directly on database rows and can leave already-managed entities stale. They can also bypass normal entity lifecycle behavior."
        },

        {
          question: "What is optimistic locking?",
          answer:
            "Optimistic locking detects concurrent modifications, commonly using a @Version field, and prevents one transaction from silently overwriting another transaction's changes."
        },

        {
          question: "Why are database constraints important if we already validate data in Java?",
          answer:
            "Application validation improves user-facing behavior, but database constraints provide an additional integrity guarantee at the persistence boundary."
        },

        {
          question: "Why are indexes important for JPA applications?",
          answer:
            "Indexes can help the database efficiently execute frequently used filters, joins, and sorting operations. The correct indexes depend on actual query patterns."
        },

        {
          question: "When should you use @Query instead of a derived query?",
          answer:
            "Use @Query when the query is complex or explicit query syntax is easier to understand than a long method name."
        },

        {
          question: "What should you test in a Spring Data JPA application?",
          answer:
            "Test important repository queries, entity mappings, CRUD behavior, pagination, sorting, relationships, constraints, transaction behavior, and important business operations."
        },

        {
          question: "What is the purpose of @DataJpaTest?",
          answer:
            "@DataJpaTest provides a focused test setup for JPA-related components such as repositories and entity mappings, making it useful for persistence-focused tests."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "Your API returns 100,000 employees and has become slow. What would you change first?",
          answer:
            "I would introduce pagination and return only the required page. I would then inspect query performance, indexes, sorting, and the generated SQL to identify additional bottlenecks."
        },

        {
          question: "You load 100 employees and accessing employee.getProjects() creates 101 database queries. What is happening?",
          answer:
            "This is a typical N+1 query problem. The initial query loads employees and additional queries are triggered when the related projects are accessed individually."
        },

        {
          question: "Would you change all relationships to EAGER to solve N+1?",
          answer:
            "No. EAGER fetching can create different performance problems by loading data that the use case does not need. I would design a targeted fetch strategy using fetch joins, EntityGraph, DTO projections, or another appropriate approach."
        },

        {
          question: "A service loads an Employee, changes its department, and calls save(). Is save() always necessary?",
          answer:
            "Not necessarily. If the Employee is managed inside an appropriate transaction, dirty checking can detect the changed department and synchronize it during flush. The correct approach depends on the entity state and operation."
        },

        {
          question: "A developer puts a call to an external payment service inside a long database transaction. What concern do you have?",
          answer:
            "The transaction may remain open while waiting for the external service, increasing connection and lock duration. I would review the transaction boundary and consider separating external operations from database work when consistency requirements allow."
        },

        {
          question: "A bulk JPQL update changes 10,000 employees, but an already-loaded Employee object still contains the old value. Why?",
          answer:
            "The bulk update changed the database directly while the managed entity still contains its previous state in the persistence context. The persistence context may need to be cleared or otherwise synchronized according to the operation."
        },

        {
          question: "A repository method has become extremely long. What would you recommend?",
          answer:
            "I would first determine whether the query can be simplified. If not, I would consider @Query for explicit logic or a dynamic query mechanism such as Specifications rather than maintaining an unreadable method name."
        },

        {
          question: "An employee email must be unique. Is checking for an existing email in Java enough?",
          answer:
            "No. An application-level check can still have a race condition between concurrent requests. A database unique constraint should enforce the final integrity rule."
        },

        {
          question: "A production query is slow even though the repository method looks simple. What would you investigate?",
          answer:
            "I would inspect the generated SQL, execution plan, indexes, row counts, joins, filtering conditions, sorting, database statistics, and whether unexpected lazy-loading queries are being triggered."
        },

        {
          question: "The frontend only needs employee ID, name, and department. Should you load the entire entity?",
          answer:
            "Not necessarily. I would consider a DTO projection or explicit select query so that only the required data is retrieved."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Repositories should focus on persistence.",
        "Services should coordinate business operations and transaction boundaries.",
        "Use DTOs at API boundaries.",
        "Use pagination for large result sets.",
        "Use derived queries for simple conditions.",
        "Use @Query for complex explicit queries.",
        "Use appropriate transactions for atomic operations.",
        "Understand dirty checking.",
        "Avoid unnecessary calls to save() on already-managed entities.",
        "Watch for N+1 queries.",
        "Do not solve every fetch problem by changing relationships to EAGER.",
        "Use targeted fetch plans.",
        "Understand generated SQL.",
        "Use database indexes based on actual query patterns.",
        "Use optimistic locking where concurrent updates require protection.",
        "Use database constraints for important integrity rules.",
        "Be careful with bulk UPDATE and DELETE operations.",
        "Test repositories with persistence-focused tests.",
        "Test business logic separately from persistence infrastructure."
      ],

      code: {
        language: "text",
        code: `Recommended Flow

Controller
    |
    | DTO
    v
Service
    |
    | @Transactional
    v
Repository
    |
    | Spring Data JPA
    v
Hibernate
    |
    | SQL
    v
Database


Remember:

Repository  -> Persistence
Service     -> Business logic
DTO         -> API boundary
Pageable    -> Pagination
@Query      -> Explicit query
@Transactional -> Transaction boundary
@Version    -> Optimistic locking`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "Spring Data JPA simplifies persistence but does not eliminate the need to understand SQL and databases.",
        "Keep repository responsibilities focused on persistence.",
        "Keep business rules in the service or appropriate domain layer.",
        "Use DTOs instead of exposing entities directly when an API boundary requires separation.",
        "Use pagination for potentially large collections.",
        "Use bounded page sizes.",
        "Choose derived queries, @Query, Specifications, or native SQL according to query complexity and requirements.",
        "Use transactions around operations that need atomic persistence behavior.",
        "Keep transaction scope reasonable.",
        "Understand JPA dirty checking and entity state.",
        "Do not blindly call save() after every change to a managed entity.",
        "Understand lazy loading and avoid treating EAGER fetching as a universal solution.",
        "Watch for N+1 queries.",
        "Use fetch joins, EntityGraph, DTO projections, or batch strategies deliberately.",
        "Inspect generated SQL and database execution plans for important queries.",
        "Use indexes based on real query patterns.",
        "Use database constraints for critical data integrity rules.",
        "Be careful with bulk modifying queries and persistence-context synchronization.",
        "Use @Version when optimistic locking is required.",
        "Test important repository and persistence behavior.",
        "For interviews, remember the core principle: Spring Data JPA should simplify database access without hiding the database behavior that matters for correctness, maintainability, and performance."
      ]
    }
  ]
};
