
export const repositoryLayer = {
  id: "repository-layer",
  title: "Repository Layer",
  slug: "repository-layer",
  topicTitle: "Spring Boot Layered Architecture",
  estimatedTime: "35 min",

  description:
    "Understand the repository layer, Spring Data JPA repositories, CRUD operations, derived query methods, custom queries, pagination, sorting, transactions, repository boundaries, and why persistence logic should be separated from business logic.",

  sections: [
    {
      id: "repository-definition",
      title: "What is the Repository Layer?",

      paragraphs: [
        "The repository layer is responsible for communicating with the persistence mechanism, commonly a relational database in Spring Boot applications.",
        "Spring Data JPA provides repository abstractions that reduce the amount of database-access code developers need to write.",
        "The repository hides many low-level persistence details from the service layer."
      ],

      code: {
        language: "text",
        code: `Service
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
Database`
      },

      bullets: [
        "Repository → persistence/data-access responsibility.",
        "Service → business/application responsibility.",
        "Controller → HTTP/API responsibility.",
        "Repository should normally not contain application workflows."
      ]
    },

    {
      id: "repository-purpose",
      title: "Why Do We Need a Repository Layer?",

      paragraphs: [
        "Without a repository abstraction, application code may become tightly coupled to JDBC, SQL statements, connection management, and persistence implementation details.",
        "A repository provides a cleaner boundary between business logic and data access.",
        "Spring Data JPA can generate much of the implementation automatically."
      ],

      code: {
        language: "text",
        code: `Without repository abstraction

Service
   ↓
JDBC
   ↓
Connection
   ↓
PreparedStatement
   ↓
ResultSet
   ↓
Database


With Spring Data JPA

Service
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
Database`
      }
    },

    {
      id: "jpa-repository",
      title: "JpaRepository",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      paragraphs: [
        "Employee represents the entity type and Long represents the type of its primary key.",
        "By extending JpaRepository, the repository receives many standard persistence operations.",
        "Spring Data creates the repository implementation at runtime, so developers normally do not need to implement these CRUD methods manually."
      ],

      bullets: [
        "First generic type → entity type.",
        "Second generic type → entity ID type.",
        "JpaRepository provides CRUD functionality.",
        "JpaRepository also supports paging and sorting capabilities.",
        "Spring creates the implementation automatically."
      ]
    },

    {
      id: "repository-hierarchy",
      title: "Repository Interface Hierarchy",

      paragraphs: [
        "Spring Data provides several repository interfaces with different levels of functionality.",
        "JpaRepository is commonly used when an application needs JPA-specific repository capabilities in addition to CRUD and paging/sorting functionality."
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

JpaRepository
    ↓
CRUD operations
Paging and sorting
JPA-specific capabilities`
      },

      bullets: [
        "CrudRepository provides basic CRUD operations.",
        "Paging and sorting repositories add paging/sorting functionality.",
        "JpaRepository provides a richer JPA-oriented abstraction.",
        "Exact interface inheritance can vary across Spring Data versions, so focus on the capabilities rather than memorizing the hierarchy."
      ]
    },

    {
      id: "crud-methods",
      title: "Common CRUD Methods",

      code: {
        language: "java",
        code: `employeeRepository.findById(id);

employeeRepository.findAll();

employeeRepository.save(employee);

employeeRepository.deleteById(id);

employeeRepository.existsById(id);`
      },

      bullets: [
        "findById() retrieves one entity by its identifier.",
        "findAll() retrieves entities.",
        "save() persists or updates an entity depending on how Spring Data determines whether it is new.",
        "deleteById() removes an entity by identifier.",
        "existsById() checks whether an entity exists."
      ]
    },

    {
      id: "find-by-id",
      title: "findById()",

      paragraphs: [
        "findById() is commonly used when retrieving a single entity by its primary key.",
        "It returns Optional<T> rather than returning null when the repository abstraction does not find the entity."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> result =
        employeeRepository.findById(10L);`
      },

      bullets: [
        "Found → Optional contains the entity.",
        "Not found → Optional is empty.",
        "The service can decide how a missing entity should be handled.",
        "A REST service may translate a missing entity into HTTP 404."
      ]
    },

    {
      id: "optional-handling",
      title: "Handling Optional from Repository",

      code: {
        language: "java",
        code: `public Employee getEmployee(Long id) {

    return employeeRepository.findById(id)
            .orElseThrow(
                () -> new EmployeeNotFoundException(
                    "Employee not found: " + id
                )
            );
}`
      },

      paragraphs: [
        "The repository provides the data-access result, while the service decides what the absence of data means for the application.",
        "For a REST API, a service exception can later be translated into a 404 response by a global exception handler."
      ]
    },

    {
      id: "find-all",
      title: "findAll()",

      paragraphs: [
        "findAll() retrieves all matching entities for the repository operation.",
        "Although convenient, loading a large table into memory may not be appropriate for production APIs.",
        "For large datasets, pagination should normally be considered."
      ],

      code: {
        language: "java",
        code: `List<Employee> employees =
        employeeRepository.findAll();`
      },

      bullets: [
        "Useful for small datasets.",
        "Can become expensive for large tables.",
        "Consider Page<T> with Pageable for large result sets.",
        "Avoid exposing unbounded database results through public APIs."
      ]
    },

    {
      id: "save",
      title: "save()",

      paragraphs: [
        "save() is commonly used to persist a new entity or merge an existing entity according to Spring Data JPA's entity-newness detection and JPA semantics.",
        "The exact behavior depends on whether Spring Data considers the entity new and on the entity's identifier or persistence metadata."
      ],

      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("Rahul");
employee.setEmail("rahul@example.com");

Employee saved =
        employeeRepository.save(employee);`
      },

      bullets: [
        "New entity → typically persisted.",
        "Existing entity → typically merged when the repository determines it is not new.",
        "save() does not necessarily mean an immediate database commit.",
        "Transaction and flush behavior determine when SQL is synchronized."
      ]
    },

    {
      id: "delete",
      title: "deleteById()",

      paragraphs: [
        "deleteById() requests deletion of the entity identified by the supplied ID.",
        "The exact behavior around missing IDs and the timing of SQL execution depends on the Spring Data/JPA version and context."
      ],

      code: {
        language: "java",
        code: `employeeRepository.deleteById(10L);`
      },

      bullets: [
        "Use the service layer to decide whether deletion is allowed.",
        "Consider authorization and ownership before deleting data.",
        "Database constraints may affect deletion.",
        "The SQL DELETE is synchronized according to persistence and transaction behavior."
      ]
    },

    {
      id: "exists-by-id",
      title: "existsById()",

      paragraphs: [
        "existsById() checks whether an entity with the specified identifier exists."
      ],

      code: {
        language: "java",
        code: `boolean exists =
        employeeRepository.existsById(10L);`
      },

      paragraphs: [
        "It is useful when the application needs to check existence without necessarily loading the complete entity."
      ]
    },

    {
      id: "count",
      title: "count()",

      paragraphs: [
        "count() returns the number of entities represented by the repository query."
      ],

      code: {
        language: "java",
        code: `long total =
        employeeRepository.count();`
      },

      bullets: [
        "Useful for simple totals.",
        "For filtered counts, use an appropriate derived or explicit query.",
        "For large datasets, understand the database cost of COUNT operations."
      ]
    },

    {
      id: "derived-query",
      title: "Derived Query Methods",

      paragraphs: [
        "Spring Data JPA can derive queries from repository method names.",
        "For example, if Employee contains an email property, the repository can define a method named findByEmail.",
        "The method name refers to Java entity property names, not directly to database column names."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
            String email
    );

    boolean existsByEmail(
            String email
    );

    List<Employee> findByDepartment(
            String department
    );
}`
      }
    },

    {
      id: "derived-query-keywords",
      title: "Common Derived Query Keywords",

      code: {
        language: "java",
        code: `List<Employee> findByDepartment(
        String department
);

List<Employee> findByDepartmentAndName(
        String department,
        String name
);

List<Employee> findByDepartmentOrName(
        String department,
        String name
);

List<Employee> findByNameContaining(
        String name
);

List<Employee> findByNameStartingWith(
        String prefix
);

List<Employee> findBySalaryGreaterThan(
        BigDecimal salary
);

List<Employee> findByDepartmentIn(
        Collection<String> departments
);

List<Employee> findByManagerIsNull();`
      },

      bullets: [
        "And → combines conditions.",
        "Or → alternative conditions.",
        "Containing → substring matching.",
        "StartingWith → prefix matching.",
        "GreaterThan → greater-than comparison.",
        "In → checks membership in a collection.",
        "IsNull → checks for null.",
        "OrderBy can specify sorting in a derived method name."
      ]
    },

    {
      id: "query-property-names",
      title: "Derived Queries Use Entity Properties",

      paragraphs: [
        "Spring Data derived queries are based on the entity's Java property names.",
        "They are not written using the database column name unless that happens to match the property name."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Column(name = "employee_email")
    private String email;
}


Repository method:

Optional<Employee> findByEmail(
        String email
);`
      },

      paragraphs: [
        "The repository method uses email because email is the entity property. The database column happens to be employee_email."
      ]
    },

    {
      id: "multiple-conditions",
      title: "Multiple Conditions",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentAndName(
        String department,
        String name
);

List<Employee> findByDepartmentOrName(
        String department,
        String name
);`
      },

      paragraphs: [
        "Spring Data parses the method name and creates the appropriate query based on the entity properties and operators."
      ]
    },

    {
      id: "sorting",
      title: "Sorting",

      paragraphs: [
        "Spring Data can accept Sort objects to control ordering.",
        "This is useful when the sorting requirement should be supplied dynamically."
      ],

      code: {
        language: "java",
        code: `List<Employee> employees =
        employeeRepository.findAll(
            Sort.by("name").ascending()
        );`
      },

      bullets: [
        "Sort can be ascending or descending.",
        "Use entity property names when constructing Sort.",
        "Avoid allowing arbitrary client-provided property names without validation."
      ]
    },

    {
      id: "pagination",
      title: "Pagination with Pageable",

      paragraphs: [
        "Pagination prevents an API from loading an unnecessarily large result set at once.",
        "Spring Data JPA supports Pageable for paging database results."
      ],

      code: {
        language: "java",
        code: `Page<Employee> findAll(
        Pageable pageable
);`
      },

      bullets: [
        "Page contains the current result data and pagination metadata.",
        "Pageable describes page number, page size, and sorting.",
        "Pagination is important for large datasets."
      ]
    },

    {
      id: "pagination-service",
      title: "Using Pagination in the Service",

      code: {
        language: "java",
        code: `public Page<EmployeeResponse> getEmployees(
        int page,
        int size) {

    Pageable pageable =
            PageRequest.of(
                page,
                size,
                Sort.by("name").ascending()
            );

    return repository.findAll(pageable)
            .map(this::toResponse);
}`
      },

      paragraphs: [
        "The service can convert the entities contained in the Page into response DTOs using Page.map()."
      ]
    },

    {
      id: "custom-query",
      title: "Custom Queries",

      paragraphs: [
        "When a derived query method is not appropriate, Spring Data JPA supports explicit queries.",
        "For example, a JPQL query can be defined using @Query.",
        "JPQL uses entity names and entity properties rather than database table and column names."
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
      id: "jpql-vs-sql",
      title: "JPQL vs SQL",

      paragraphs: [
        "JPQL is an object-oriented query language defined by JPA.",
        "JPQL normally refers to entities and their properties.",
        "SQL refers directly to database tables and columns."
      ],

      code: {
        language: "text",
        code: `JPQL

select e
from Employee e
where e.department = :department


SQL

SELECT *
FROM employees
WHERE department = ?`
      },

      bullets: [
        "JPQL → entity-oriented.",
        "SQL → database-oriented.",
        "Hibernate translates JPQL into database-specific SQL.",
        "Native SQL can be used when database-specific SQL is genuinely required."
      ]
    },

    {
      id: "native-query",
      title: "Native Queries",

      paragraphs: [
        "Spring Data JPA also supports native SQL queries when the application genuinely needs database-specific SQL or a query that is difficult to express using JPQL."
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
      },

      bullets: [
        "Native queries use database SQL.",
        "They can be useful for database-specific functionality.",
        "They can increase coupling to the database.",
        "Prefer derived queries or JPQL when they are clear and sufficient."
      ]
    },

    {
      id: "update-query",
      title: "Update and Delete Queries",

      paragraphs: [
        "Spring Data JPA supports explicit modifying queries for bulk updates and deletes.",
        "Bulk operations have important persistence-context implications because they can change database rows without updating already-managed entity instances."
      ],

      code: {
        language: "java",
        code: `@Modifying
@Query("""
       update Employee e
       set e.department = :department
       where e.id = :id
       """)
int updateDepartment(
        @Param("id")
        Long id,

        @Param("department")
        String department
);`
      },

      bullets: [
        "Use @Modifying for modifying JPQL queries.",
        "Usually execute modifying queries inside an appropriate transaction.",
        "Bulk updates can leave the current persistence context stale.",
        "Clear or synchronize the persistence context when appropriate."
      ]
    },

    {
      id: "repository-service",
      title: "Repository Used by Service",

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }

    public Employee getEmployee(Long id) {

        return repository.findById(id)
                .orElseThrow();
    }
}`
      },

      paragraphs: [
        "The service uses the repository but does not need to directly manage JDBC connections or write SQL for simple operations.",
        "The service decides what the application should do with the repository result."
      ]
    },

    {
      id: "repository-responsibility",
      title: "What Should a Repository Do?",

      bullets: [
        "Read persistent data.",
        "Save persistent data.",
        "Delete persistent data.",
        "Execute persistence queries.",
        "Provide data-access abstractions.",
        "Support pagination and sorting when needed.",
        "Return persistence results to the application layer."
      ],

      paragraphs: [
        "Business decisions should normally remain outside the repository. The repository should focus on how data is accessed rather than deciding what the application should do."
      ]
    },

    {
      id: "repository-not-business",
      title: "What Should a Repository Not Do?",

      paragraphs: [
        "Repositories should generally not coordinate complete business workflows.",
        "For example, a repository should not normally decide whether an employee is eligible for a promotion, send an email, call a payment provider, and then update several unrelated entities.",
        "That workflow belongs in an appropriate service or domain component."
      ],

      code: {
        language: "text",
        code: `Avoid

Repository
 ├── Query database
 ├── Apply business rules
 ├── Send email
 ├── Call payment API
 └── Decide workflow


Prefer

Service
 ├── Business rules
 ├── Email service
 └── Repository
        ↓
     Database`
      }
    },

    {
      id: "repository-transactions",
      title: "Repositories and Transactions",

      paragraphs: [
        "Repositories participate in transaction management, but the application-level transaction boundary is commonly defined at the service layer.",
        "A service operation may call several repository methods and require all of them to succeed or fail as one unit."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transferEmployee(
        Long employeeId,
        Long departmentId) {

    Employee employee =
            employeeRepository.findById(employeeId)
                              .orElseThrow();

    Department department =
            departmentRepository.findById(departmentId)
                              .orElseThrow();

    employee.setDepartment(department);
}`
      }
    },

    {
      id: "read-only-transactions",
      title: "Read-Only Transactions",

      paragraphs: [
        "For read-heavy service operations, @Transactional(readOnly = true) can communicate the intent that the operation is read-only.",
        "The exact performance behavior depends on the JPA provider, database, and configuration, so it should not be treated as a universal performance guarantee."
      ],

      code: {
        language: "java",
        code: `@Transactional(readOnly = true)
public EmployeeResponse getEmployee(
        Long id) {

    Employee employee =
            repository.findById(id)
                      .orElseThrow();

    return toResponse(employee);
}`
      }
    },

    {
      id: "repository-query-design",
      title: "Choose the Right Query Approach",

      code: {
        language: "text",
        code: `Simple equality
      ↓
Derived Query


Moderate / explicit query
      ↓
JPQL @Query


Complex dynamic filtering
      ↓
Specification / Criteria / Query DSL


Database-specific SQL
      ↓
Native Query`
      },

      paragraphs: [
        "Choose the simplest query mechanism that clearly expresses the requirement.",
        "Do not create extremely long derived method names when an explicit query would be easier to understand."
      ]
    },

    {
      id: "long-derived-method",
      title: "Avoid Extremely Long Derived Query Names",

      paragraphs: [
        "Derived queries are convenient, but very long method names can become difficult to read and maintain.",
        "When the query becomes complex, an explicit @Query, Specification, or another query mechanism may be clearer."
      ],

      code: {
        language: "java",
        code: `// Can become difficult to maintain

findByDepartmentAndStatusAndNameContaining
AndSalaryGreaterThanAndCreatedAtBetweenAnd...


Better

@Query("""
    select e
    from Employee e
    where e.department = :department
      and e.status = :status
      and e.salary > :salary
    """)
List<Employee> search(...);`
      }
    },

    {
      id: "projection",
      title: "Repository Projections",

      paragraphs: [
        "Sometimes an API needs only a few fields rather than a complete entity.",
        "Spring Data JPA supports projections that can select only the required data for supported query designs."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeSummary {

    Long getId();

    String getName();

    String getDepartment();
}


List<EmployeeSummary>
        findByDepartment(
            String department
        );`
      },

      bullets: [
        "Projections can reduce unnecessary data loading.",
        "They are useful for read-oriented use cases.",
        "Choose projections when the complete entity is not required."
      ]
    },

    {
      id: "locking-preview",
      title: "Repository Locking Preview",

      paragraphs: [
        "Some concurrent data operations require locking semantics.",
        "Spring Data JPA supports JPA lock modes through @Lock for appropriate repository queries."
      ],

      code: {
        language: "java",
        code: `@Lock(LockModeType.PESSIMISTIC_WRITE)
Optional<Employee> findById(
        Long id
);`
      },

      bullets: [
        "Locking should be introduced only when the concurrency requirement justifies it.",
        "Understand database transaction and isolation behavior before using locks.",
        "Optimistic locking with @Version is another common strategy."
      ]
    },

    {
      id: "repository-testing",
      title: "Testing the Repository Layer",

      paragraphs: [
        "Repository tests verify persistence behavior such as entity mappings, derived queries, custom queries, constraints, and database interactions.",
        "Spring Boot commonly provides @DataJpaTest for focused JPA repository tests."
      ],

      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void shouldFindByEmail() {

        Employee employee =
                new Employee(
                    "Rahul",
                    "rahul@example.com",
                    "Engineering"
                );

        repository.save(employee);

        Optional<Employee> result =
                repository.findByEmail(
                    "rahul@example.com"
                );

        assertTrue(result.isPresent());
    }
}`
      },

      bullets: [
        "Test repository queries against persistence infrastructure.",
        "Verify mappings and constraints.",
        "Test important custom queries.",
        "Use realistic database behavior when database-specific features matter."
      ]
    },

    {
      id: "repository-vs-mock",
      title: "Repository Test vs Service Unit Test",

      code: {
        language: "text",
        code: `Service Unit Test

Service
  ↓
Mock Repository


Repository Test

Repository
  ↓
JPA / Database Test Infrastructure`
      },

      paragraphs: [
        "A service unit test usually mocks the repository because the goal is to test service business logic.",
        "A repository test should exercise the persistence behavior because the goal is to verify queries and mappings."
      ]
    },

    {
      id: "repository-performance",
      title: "Repository Performance Best Practices",

      bullets: [
        "Avoid unbounded findAll() for large tables.",
        "Use pagination for large result sets.",
        "Select only required data when appropriate.",
        "Avoid unnecessary entity relationships being loaded.",
        "Watch for N+1 query problems.",
        "Use appropriate database indexes.",
        "Review generated SQL for expensive queries.",
        "Use projections or explicit queries for read-heavy use cases when appropriate.",
        "Do not solve every performance problem by adding native SQL.",
        "Measure database performance before optimizing."
      ]
    },

    {
      id: "n-plus-one",
      title: "Repository Queries and N+1 Problem",

      paragraphs: [
        "An N+1 problem occurs when one query loads a collection of entities and then additional queries are executed for related data for each entity.",
        "This can result in many database queries for a single application operation."
      ],

      code: {
        language: "text",
        code: `Query 1
SELECT employees


Then:

Query 2
SELECT department for employee 1

Query 3
SELECT department for employee 2

Query 4
SELECT department for employee 3

...

Potential N+1 problem`
      },

      bullets: [
        "Inspect generated SQL when performance is suspicious.",
        "Use fetch joins, entity graphs, projections, or other suitable strategies.",
        "Do not blindly change every relationship to EAGER."
      ]
    },

    {
      id: "repository-security",
      title: "Repository and Security",

      paragraphs: [
        "A repository should not be treated as the primary authorization boundary.",
        "Before modifying or deleting data, the application must determine whether the current user is allowed to perform the operation.",
        "Authorization can be enforced through Spring Security and application/domain rules."
      ],

      code: {
        language: "text",
        code: `Request
  ↓
Authentication
  ↓
Authorization
  ↓
Service
  ↓
Repository
  ↓
Database`
      }
    },

    {
      id: "complete-architecture",
      title: "Complete Repository Architecture",

      code: {
        language: "text",
        code: `Client
   ↓
Controller
   ↓
Request DTO
   ↓
Validation
   ↓
Service
   ↓
Business Rules
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
Database


Database
   ↓
JPA / Hibernate
   ↓
Entity
   ↓
Repository
   ↓
Service
   ↓
Response DTO
   ↓
Controller
   ↓
Client`
      }
    },

    {
      id: "common-mistakes",
      title: "Common Repository Mistakes",

      bullets: [
        "Putting business logic inside repositories.",
        "Calling repositories directly from controllers for complex operations.",
        "Using findAll() for very large datasets without pagination.",
        "Creating extremely long derived query names.",
        "Using native SQL when a simple derived query or JPQL query would be clearer.",
        "Ignoring N+1 query problems.",
        "Returning entities without considering API exposure.",
        "Ignoring transaction boundaries.",
        "Using bulk update queries without understanding persistence-context effects.",
        "Ignoring database indexes for frequently queried columns.",
        "Testing service logic only through repository integration tests.",
        "Assuming save() immediately commits the database transaction.",
        "Assuming every repository method requires a custom implementation.",
        "Passing arbitrary client-controlled sorting fields without validation."
      ]
    },

    {
      id: "repository-best-practices",
      title: "Repository Best Practices",

      bullets: [
        "Keep repositories focused on persistence.",
        "Use JpaRepository when its capabilities are appropriate.",
        "Use derived queries for simple readable conditions.",
        "Use JPQL for explicit queries that are easier to express declaratively.",
        "Use native SQL only when there is a clear reason.",
        "Use pagination for large datasets.",
        "Use sorting deliberately.",
        "Use projections when the complete entity is unnecessary.",
        "Watch for N+1 queries.",
        "Understand transaction boundaries.",
        "Test important repository queries.",
        "Keep business decisions in services or domain components.",
        "Use appropriate database indexes.",
        "Review generated SQL when diagnosing performance.",
        "Keep repository methods readable and intention-revealing."
      ]
    },

    {
      id: "repository-flow",
      title: "Complete Repository Request Flow",

      code: {
        language: "text",
        code: `HTTP Request
     ↓
Controller
     ↓
Request DTO
     ↓
Validation
     ↓
Service
     ↓
Repository Method
     ↓
Spring Data JPA
     ↓
Hibernate
     ↓
SQL
     ↓
Database
     ↓
Result
     ↓
Entity
     ↓
Service
     ↓
Response DTO
     ↓
Controller
     ↓
HTTP Response`
      }
    },

    {
      id: "repository-example",
      title: "Complete Employee Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
            String email
    );

    boolean existsByEmail(
            String email
    );

    List<Employee> findByDepartment(
            String department
    );

    List<Employee> findByNameContainingIgnoreCase(
            String name
    );

    Page<Employee> findByDepartment(
            String department,
            Pageable pageable
    );

    @Query("""
        select e
        from Employee e
        where e.salary > :salary
        """)
    List<Employee> findEmployeesWithSalaryAbove(
            @Param("salary")
            BigDecimal salary
    );
}`
      },

      paragraphs: [
        "This repository combines standard CRUD methods, derived query methods, pagination, and an explicit JPQL query.",
        "The service layer can use these methods to implement application use cases without directly managing SQL."
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Repository Interview Questions",

      interviewQuestions: [
        {
          question:
            "Why should the service layer use a repository instead of directly writing JDBC code?",
          answer:
            "The repository provides a persistence abstraction that separates data-access details from application logic and reduces repetitive database-access code."
        },
        {
          question:
            "What happens when you extend JpaRepository?",
          answer:
            "Spring Data creates an implementation for the repository interface and provides standard persistence operations along with additional JPA repository capabilities."
        },
        {
          question:
            "When would you use a derived query instead of @Query?",
          answer:
            "I would use a derived query for simple, readable conditions that can be expressed clearly through the method name. For more complex queries, @Query or another query mechanism may be easier to maintain."
        },
        {
          question:
            "Why is findAll() dangerous for a large production table?",
          answer:
            "It can retrieve a very large number of rows and consume significant database, memory, and network resources. Pagination is usually more appropriate for large result sets."
        },
        {
          question:
            "What is the N+1 query problem?",
          answer:
            "It occurs when an initial query loads N entities and additional queries are executed for related data for each entity, resulting in N+1 database queries."
        },
        {
          question:
            "Where should business logic be placed instead of the repository?",
          answer:
            "Business and application logic should normally be placed in the service or appropriate domain layer."
        },
        {
          question:
            "Does save() always immediately execute INSERT or UPDATE and commit it?",
          answer:
            "No. save() participates in JPA persistence behavior, while SQL execution and transaction commit depend on persistence-context and transaction/flush behavior."
        },
        {
          question:
            "What is the difference between JPQL and SQL?",
          answer:
            "JPQL is entity-oriented and uses entity names and properties, while SQL directly targets database tables and columns."
        },
        {
          question:
            "When would you use a native query?",
          answer:
            "When database-specific SQL is required or a query is difficult to express appropriately using derived queries or JPQL."
        },
        {
          question:
            "How would you test a repository?",
          answer:
            "I would use a focused persistence test such as @DataJpaTest to verify mappings, queries, constraints, and database interaction behavior."
        }
      ]
    },

    {
      id: "interview",
      title: "Repository Layer Interview Questions",

      interviewQuestions: [
        {
          question: "What is a repository in Spring Boot?",
          answer:
            "A repository provides an abstraction for persistence and data-access operations."
        },
        {
          question: "What is JpaRepository?",
          answer:
            "JpaRepository is a Spring Data JPA interface that provides CRUD operations and additional repository functionality such as paging and sorting."
        },
        {
          question: "What is a derived query method?",
          answer:
            "It is a repository method whose name follows Spring Data conventions so that the framework can derive the query automatically."
        },
        {
          question: "Should business logic be placed in repositories?",
          answer:
            "Repositories should generally focus on data access. Business rules should normally be handled by the service or appropriate domain layer."
        },
        {
          question: "What does findById() return?",
          answer:
            "findById() normally returns an Optional containing the entity when it exists or an empty Optional when it does not."
        },
        {
          question: "What is the purpose of existsById()?",
          answer:
            "It checks whether an entity with the specified identifier exists without requiring the application to retrieve the complete entity."
        },
        {
          question: "What is the difference between findAll() and pagination?",
          answer:
            "findAll() can retrieve all matching entities, while pagination retrieves a limited portion of the result set and provides pagination metadata."
        },
        {
          question: "What is @Query?",
          answer:
            "@Query allows a repository method to define an explicit JPQL or native SQL query instead of relying entirely on method-name query derivation."
        },
        {
          question: "What is @Modifying?",
          answer:
            "@Modifying indicates that a repository query performs an update or delete operation rather than simply retrieving data."
        },
        {
          question: "What is Pageable?",
          answer:
            "Pageable represents pagination information such as page number, page size, and sorting."
        },
        {
          question: "What is a Page?",
          answer:
            "Page represents a paginated result and provides the current data along with pagination-related metadata."
        },
        {
          question: "Why use projections?",
          answer:
            "Projections can retrieve only the data needed for a particular read operation instead of loading the complete entity."
        },
        {
          question: "What is the N+1 problem?",
          answer:
            "It is a query performance problem where one initial query is followed by additional queries for related data for each returned entity."
        },
        {
          question: "Can a repository call another repository?",
          answer:
            "It is technically possible, but repositories should generally remain focused on persistence. Cross-repository business coordination is usually better handled by a service or application layer."
        },
        {
          question: "Why should repositories not contain business workflows?",
          answer:
            "Repositories should focus on persistence. Keeping business workflows in services or domain components maintains separation of responsibilities and makes the application easier to test and evolve."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",

      bullets: [
        "Repository → data-access layer.",
        "JpaRepository → common Spring Data JPA repository abstraction.",
        "findById() → retrieve by identifier.",
        "findAll() → retrieve results.",
        "save() → persist or update according to entity-newness semantics.",
        "deleteById() → request deletion by identifier.",
        "existsById() → check existence.",
        "Derived query → query generated from method name.",
        "@Query → explicit JPQL/native query.",
        "@Modifying → modifying repository query.",
        "Pageable → pagination and sorting input.",
        "Page → paginated result.",
        "Projection → retrieve selected data.",
        "Repository → persistence, not business workflow.",
        "Service → business/application logic.",
        "Avoid unbounded findAll() for large datasets.",
        "Watch for N+1 queries.",
        "Use appropriate indexes and query strategies.",
        "Test important repository queries."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",

      paragraphs: [
        "The repository layer is responsible for data access and persistence. In Spring Boot, Spring Data JPA provides abstractions such as JpaRepository, which gives us standard CRUD operations and support for derived queries, pagination, sorting, and explicit queries. The service layer uses the repository to access data but keeps business decisions outside the repository. For simple conditions we can use derived query methods, while more complex queries can use JPQL, projections, Specifications, or native SQL when justified. Repositories should remain focused on persistence, while services coordinate business operations and transaction boundaries."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes",

      paragraphs: [
        "Remember the basic flow: Controller → Service → Repository → JPA/Hibernate → Database.",
        "A repository answers the question: 'How do I access persistent data?'",
        "A service answers the question: 'What should the application do?'",
        "JpaRepository provides many operations automatically, so you do not normally write CRUD implementations yourself.",
        "Derived query methods use entity property names.",
        "Use pagination for large result sets rather than blindly using findAll().",
        "Use JPQL for explicit entity-oriented queries and native SQL only when there is a clear reason.",
        "Bulk modifying queries can make the persistence context stale, so understand their transaction and synchronization implications.",
        "For interviews, remember: Repository = persistence, Service = business/application logic, Controller = HTTP."
      ]
    }
  ]
};
