
export const lazyVsEagerFetching = {
  id: 909,
  title: "Lazy vs Eager Fetching",
  slug: "lazy-vs-eager-fetching",
  topicTitle: "JPA Relationships",
  description:
    "Understand when related entity data is loaded and how to avoid fetching problems.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "concept",
      title: "What Is Fetching?",
      paragraphs: [
        "In JPA, entities can reference other entities. For example, an Employee can reference a Department, and a Department can contain multiple employees. Fetch strategy determines when the associated entity data must be made available.",
        "Lazy fetching permits the persistence provider to defer loading an association until it is accessed. Eager fetching requires the association to be fetched eagerly. The exact SQL execution strategy depends on the JPA provider, the query, and the fetch plan.",
        "Fetching is important because loading every related entity for every request can waste database resources, while delaying every association without planning can lead to additional queries or LazyInitializationException.",
        "Consider an employee-list API that only needs employee IDs and names. Loading complete department details for every employee may be unnecessary. A department-details API, however, may specifically require the department information.",
        "The best fetch strategy depends on the operation. Instead of trying to define one fetch configuration that is ideal for every endpoint, configure relationships sensibly and choose an appropriate fetch plan for each query."
      ],
      code: {
        language: "text",
        code: `Employee entity
    |
    | department association
    v
Department entity

LAZY:
Load the employee first.
Load department data when the association is accessed,
if it has not already been loaded.

EAGER:
The department association must be fetched eagerly.
The provider may use a join or additional SQL queries.`
      },
      bullets: [
        "Fetch strategy controls when associated data is loaded.",
        "Fetch strategy and SQL join strategy are related but not identical.",
        "LAZY does not mean that the association can never be loaded automatically.",
        "EAGER does not guarantee that all associated data is loaded in one SQL query.",
        "The query and the business use case should determine which related data is needed."
      ]
    },
    {
      id: "lazy",
      title: "Lazy Fetching",
      paragraphs: [
        "Lazy fetching allows an association to remain unloaded until the application accesses it. Hibernate commonly implements lazy loading through proxies or enhanced entity behavior, depending on the association and configuration.",
        "Suppose an employee has a department association. When the employee is loaded, Hibernate may retrieve the employee row without retrieving the department's full entity state. When the application accesses employee.getDepartment().getName(), Hibernate may execute another query to retrieve the department.",
        "The additional query normally requires an available persistence context. If the association has already been initialized or the necessary data is already available, another query may not be necessary.",
        "Lazy fetching is especially useful for large collections and associations that are not required by every use case. It reduces unnecessary loading, but it must be combined with deliberate query design."
      ],
      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    // Getters and setters
}`
      },
      paragraphs: [
        "The example explicitly configures the employee's department association for lazy fetching. This is a common choice when department details are not needed for every employee operation.",
        "For a simple employee lookup, the application might only access the employee ID and name. The department association can remain uninitialized. If department information is needed later, load it deliberately or access it while the persistence context is available."
      ],
      code: {
        language: "java",
        code: `Employee employee = employeeRepository.findById(1L)
    .orElseThrow();

// This reads a field from the loaded employee.
System.out.println(employee.getName());

// Accessing the association may trigger another SQL query.
System.out.println(employee.getDepartment().getName());`
      },
      bullets: [
        "Lazy loading can avoid unnecessary queries when an association is never accessed.",
        "Accessing an uninitialized association can execute additional SQL.",
        "Repeated access to different associations can create an N+1 query problem.",
        "Lazy loading does not remove the need for transactions or a suitable persistence-context boundary.",
        "Use a deliberate query when an operation always requires particular related fields."
      ]
    },
    {
      id: "eager",
      title: "Eager Fetching",
      paragraphs: [
        "Eager fetching requires an association to be fetched eagerly as part of loading the entity. It does not require the provider to use one SQL JOIN for every query.",
        "Depending on the query and provider, eager loading may be implemented with a join or with additional SELECT statements. As a result, EAGER can still cause more database queries than expected.",
        "Eager associations can be convenient when related data is almost always required, but applying EAGER broadly can make unrelated operations retrieve data they do not need.",
        "For example, loading thousands of employees with eager department associations may load department state for a report that only needs employee names. If the report requires only a few columns, a DTO projection can be more efficient."
      ],
      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    // Getters and setters
}`
      },
      paragraphs: [
        "With this mapping, the provider must make the department association available eagerly when loading the employee. The exact SQL is not guaranteed by the annotation alone.",
        "Avoid changing every association to EAGER simply because one endpoint needs related data. Prefer a query-specific fetch plan so that the endpoint gets the data it needs without imposing the same loading cost on every operation."
      ],
      bullets: [
        "EAGER fetching can be useful for genuinely small, consistently required associations.",
        "EAGER does not mean one SQL query in all situations.",
        "Unnecessary eager associations increase the amount of data that may be loaded.",
        "Large eager graphs can increase memory use and database work.",
        "Prefer explicit fetch joins, entity graphs, or projections for use-case-specific data requirements."
      ]
    },
    {
      id: "defaults",
      title: "Default Fetch Types",
      paragraphs: [
        "Jakarta Persistence defines default fetch types for the standard relationship annotations. These defaults apply unless the mapping specifies another fetch type where the annotation permits it.",
        "The defaults are important because a relationship may load more data than expected even when no explicit fetch setting appears in the entity class."
      ],
      bullets: [
        "@ManyToOne: EAGER by default.",
        "@OneToOne: EAGER by default.",
        "@OneToMany: LAZY by default.",
        "@ManyToMany: LAZY by default."
      ],
      code: {
        language: "java",
        code: `// EAGER by default
@ManyToOne
private Department department;

// EAGER by default
@OneToOne
private EmployeeProfile profile;

// LAZY by default
@OneToMany(mappedBy = "department")
private List<Employee> employees = new ArrayList<>();

// LAZY by default
@ManyToMany
private Set<Role> roles = new HashSet<>();`
      },
      paragraphs: [
        "Defaults are not a substitute for understanding the query. Explicitly configuring fetch behavior can make the intent clearer, but the final SQL should still be checked against the application's performance requirements.",
        "For example, changing a many-to-one association to LAZY may reduce unnecessary loading, while a particular repository method can explicitly fetch the department when needed."
      ],
      bullets: [
        "Inspect relationship annotations when investigating unexpected SQL queries.",
        "Remember that provider-specific behavior and query-level fetch plans affect execution.",
        "Do not assume that setting LAZY means every association will remain unloaded.",
        "Do not assume that setting EAGER means a single join will be used."
      ]
    },
    {
      id: "n-plus-one",
      title: "Understanding the N+1 Query Problem",
      paragraphs: [
        "The N+1 query problem occurs when an initial query retrieves a collection of entities and subsequent access to an association triggers additional queries, often once per returned entity.",
        "For example, one query retrieves 100 employees. If each employee's department is not already loaded, accessing every department can cause up to 100 additional queries. The operation can therefore require roughly 101 queries instead of a small number of planned queries.",
        "The exact number depends on association sharing, persistence-context caching, batching, and provider behavior. The key problem is that query count can grow with the number of returned entities."
      ],
      code: {
        language: "java",
        code: `List<Employee> employees = employeeRepository.findAll();

for (Employee employee : employees) {
    // May trigger an additional query for each employee.
    System.out.println(
        employee.getName() + " - " +
        employee.getDepartment().getName()
    );
}`
      },
      code: {
        language: "text",
        code: `1 query:
    SELECT employees ...

N additional queries:
    SELECT department ... WHERE id = ?
    SELECT department ... WHERE id = ?
    SELECT department ... WHERE id = ?
    ...

Total: 1 + N queries in a common N+1 scenario.`
      },
      paragraphs: [
        "A common solution is to fetch the association as part of the query when the operation requires it. For list endpoints, a DTO projection may be even better because it retrieves only the fields required by the response."
      ],
      code: {
        language: "java",
        code: `@Query("""
    select e
    from Employee e
    join fetch e.department
    """)
List<Employee> findAllWithDepartment();`
      },
      bullets: [
        "Use a fetch join when the query needs the related entity.",
        "Use @EntityGraph to specify associations for a repository operation.",
        "Use DTO projections when the response needs only selected columns.",
        "Enable SQL logging or use Hibernate statistics to inspect query counts.",
        "Be careful with collection fetch joins and pagination because they can produce duplicate rows or interfere with efficient paging."
      ]
    },
    {
      id: "fetch-solutions",
      title: "Fetch Joins, Entity Graphs, and DTO Projections",
      paragraphs: [
        "A fetch join, an entity graph, and a DTO projection solve related but different problems. A fetch join explicitly requests an association in JPQL. An entity graph describes which associations should be fetched for a particular operation. A DTO projection selects the values needed for a result without requiring the application to expose or navigate a full entity graph.",
        "Choose the option based on the data needed, the shape of the result, and whether the operation uses pagination. Inspect the generated SQL to verify the actual behavior."
      ],
      code: {
        language: "java",
        code: `// Option 1: JPQL fetch join
@Query("""
    select e
    from Employee e
    join fetch e.department
    where e.id = :id
    """)
Optional<Employee> findByIdWithDepartment(
    @Param("id") Long id
);`
      },
      code: {
        language: "java",
        code: `// Option 2: Entity graph
@EntityGraph(attributePaths = {"department"})
Optional<Employee> findWithDepartmentById(Long id);`
      },
      code: {
        language: "java",
        code: `// Option 3: DTO projection
@Query("""
    select new com.example.dto.EmployeeSummary(
        e.id, e.name, d.name
    )
    from Employee e
    join e.department d
    """)
List<EmployeeSummary> findEmployeeSummaries();`
      },
      paragraphs: [
        "The DTO example assumes that EmployeeSummary is a DTO with a matching constructor and that the entity and package names match the application.",
        "A fetch join is useful when the operation needs entities and their associations. An entity graph can keep fetch requirements separate from the JPQL text. A DTO projection is often a good fit for read-only screens and reports.",
        "When pagination is required, avoid blindly combining pagination with a collection fetch join. Consider paging through IDs first and loading the required associations separately, or using a projection designed for the page."
      ]
    },
    {
      id: "lazy-exception",
      title: "Understanding LazyInitializationException",
      paragraphs: [
        "Hibernate can throw LazyInitializationException when application code tries to initialize an unfetched lazy association after the persistence context is no longer available.",
        "A common example occurs when a service loads an employee, returns the entity, and the controller or JSON serializer accesses employee.getDepartment().getName() after the service transaction has ended. If the department is still uninitialized, Hibernate may be unable to load it.",
        "The exception is not proof that LAZY fetching is incorrect. It usually means that the application has not defined clearly where the required data should be loaded and transformed into the response.",
        "A reliable solution is to load the necessary data inside the appropriate service operation using a fetch join, entity graph, or DTO projection. The service can then return a DTO that contains the required values."
      ],
      code: {
        language: "java",
        code: `// Risky when the department is not initialized
// and the persistence context has already closed.

Employee employee = employeeService.getEmployee(id);

return employee.getDepartment().getName();`
      },
      code: {
        language: "java",
        code: `// Prefer returning a DTO populated inside the service.
@Transactional(readOnly = true)
public EmployeeResponse getEmployee(Long id) {
    Employee employee = employeeRepository
        .findByIdWithDepartment(id)
        .orElseThrow(() -> new EmployeeNotFoundException(id));

    return new EmployeeResponse(
        employee.getId(),
        employee.getName(),
        employee.getDepartment().getId(),
        employee.getDepartment().getName()
    );
}`
      },
      paragraphs: [
        "This example assumes EmployeeResponse and EmployeeNotFoundException are defined in the application and that the repository method loads the department association.",
        "Avoid solving the problem by making every relationship EAGER or relying on an open persistence context throughout HTTP response serialization. Those approaches can hide the underlying fetch-plan problem and introduce extra queries or unpredictable database work."
      ],
      bullets: [
        "Load the associations required by the service use case.",
        "Use a transaction for the operation that reads the necessary data.",
        "Return DTOs instead of exposing an uninitialized entity graph.",
        "Use a fetch join, entity graph, or projection when appropriate.",
        "Do not access lazy relationships in code that runs after the persistence context has closed.",
        "Check for N+1 queries when changing a fetch plan."
      ]
    },
    {
      id: "best-practices",
      title: "Lazy vs Eager Fetching Best Practices",
      bullets: [
        "Prefer LAZY for associations that are not required by every operation, where appropriate.",
        "Plan each query around the data the use case actually needs.",
        "Use fetch joins or entity graphs for required associations.",
        "Use DTO projections for read-heavy endpoints and reports.",
        "Avoid switching all relationships to EAGER to fix a single LazyInitializationException.",
        "Avoid returning complex bidirectional entity graphs from REST controllers.",
        "Measure SQL query counts and inspect execution plans for important endpoints.",
        "Test performance with realistic data volumes rather than only a few rows.",
        "Use special care with collection fetching and pagination.",
        "Keep transaction boundaries in the service layer and return a controlled response DTO."
      ],
      paragraphs: [
        "A useful rule is to keep entity mappings sensible and define the actual fetch plan at the repository or service use-case level. This gives each operation control over what it loads without making every other operation pay the same cost."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is the difference between LAZY and EAGER fetching?",
          answer: "LAZY permits deferred loading of an association, while EAGER requires the association to be fetched eagerly. The provider may use a join or additional queries, so the annotation alone does not determine the exact SQL strategy."
        },
        {
          question: "What are the default fetch types in JPA?",
          answer: "@ManyToOne and @OneToOne default to EAGER. @OneToMany and @ManyToMany default to LAZY."
        },
        {
          question: "Does EAGER fetching always execute one SQL query?",
          answer: "No. EAGER specifies when the association must be fetched, not that it must be fetched using a single join. The provider may execute additional queries."
        },
        {
          question: "Does LAZY fetching guarantee that no extra SQL will execute?",
          answer: "No. Accessing an uninitialized lazy association may trigger additional SQL, and repeatedly accessing associations can cause the N+1 query problem."
        },
        {
          question: "What is the N+1 query problem?",
          answer: "It occurs when one query retrieves a collection of entities and additional queries are executed for associated data, often one query per entity. Fetch joins, entity graphs, DTO projections, and appropriate batch-fetching strategies can help."
        },
        {
          question: "How can you avoid LazyInitializationException?",
          answer: "Load the required associations while the persistence context is available, using a fetch join, entity graph, or DTO projection. Return DTOs instead of accessing uninitialized entities after the transaction has ended."
        },
        {
          question: "Why not make every association EAGER?",
          answer: "It can load unnecessary data for operations that do not need the associations, increase memory use, and cause additional database queries. Fetch requirements should match each use case."
        },
        {
          question: "What is the difference between a fetch join and an ordinary join?",
          answer: "An ordinary JPQL join can be used to filter or query related data without necessarily initializing the association on the returned entity. A fetch join explicitly requests that the association be fetched as part of the query."
        },
        {
          question: "What is @EntityGraph used for?",
          answer: "@EntityGraph specifies which associations should be fetched for a repository operation without requiring the fetch plan to be written as a JPQL fetch join. The provider determines the exact SQL strategy."
        },
        {
          question: "When should you use a DTO projection?",
          answer: "Use a DTO projection when an operation needs only selected fields, such as a summary screen or report. It can reduce unnecessary entity loading and makes the returned data shape explicit."
        },
        {
          question: "Can fetch joins cause problems with pagination?",
          answer: "Yes. Collection fetch joins can produce duplicate result rows and may prevent efficient database-level pagination. A DTO projection, paging through IDs first, or loading collections separately may be more appropriate."
        },
        {
          question: "What is a good default strategy for @ManyToOne?",
          answer: "Consider explicitly configuring it as LAZY when the related entity is not required for every use case, then fetch the association deliberately in queries that need it. Test the actual provider behavior and generated SQL."
        },
        {
          question: "Is LazyInitializationException always a reason to change LAZY to EAGER?",
          answer: "No. It usually indicates that the required association was accessed after the persistence context became unavailable. Prefer defining an explicit fetch plan and returning a DTO."
        },
        {
          question: "How do you identify unnecessary database queries?",
          answer: "Inspect Hibernate SQL logs, query counts, Hibernate statistics, and database monitoring. Reproduce the operation with realistic amounts of data and check whether query counts grow with the number of returned entities."
        }
      ]
    },
    {
      id: "summary",
      title: "Quick Revision Notes",
      bullets: [
        "LAZY permits deferred association loading.",
        "EAGER requires eager fetching but does not guarantee a single SQL join.",
        "@ManyToOne and @OneToOne default to EAGER.",
        "@OneToMany and @ManyToMany default to LAZY.",
        "Accessing lazy associations can trigger additional SQL.",
        "N+1 queries can make collection endpoints slow.",
        "Use fetch joins, entity graphs, or DTO projections based on the use case.",
        "LazyInitializationException can occur when an uninitialized association is accessed after the persistence context closes.",
        "Do not make all relationships EAGER just to fix a loading exception.",
        "Inspect generated SQL and test with realistic data."
      ],
      paragraphs: [
        "Interview-ready answer: Lazy fetching allows JPA to defer loading associated data until it is accessed, while eager fetching requires the association to be fetched eagerly. The default is EAGER for many-to-one and one-to-one relationships and LAZY for one-to-many and many-to-many relationships. I choose fetch plans based on each use case, use fetch joins, entity graphs, or DTO projections when necessary, and monitor N+1 queries and LazyInitializationException."
      ]
    }
  ]
};
