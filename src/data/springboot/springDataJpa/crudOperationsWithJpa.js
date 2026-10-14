
export const crudOperationsWithJpa = {
  id: 809,
  title: "CRUD Operations with JPA",
  slug: "crud-operations-with-jpa",
  topicTitle: "Spring Data JPA",
  description:
    "Learn how to create, read, update, and delete records using Spring Data JPA, including repository methods, entity lifecycle, transactions, validation, exception handling, and practical REST API examples.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "CRUD stands for Create, Read, Update, and Delete. These are the four fundamental operations performed on persistent data in almost every backend application.",
        "Spring Data JPA provides repository interfaces that reduce the amount of database access code you need to write. Instead of writing SQL for every basic operation, you can use methods such as save(), findById(), findAll(), deleteById(), and existsById().",
        "For example, if an application manages employees, CRUD operations allow us to create a new employee, retrieve employee information, update an employee's details, and delete an employee.",
        "Spring Data JPA works with entities rather than directly working with database rows in application code. JPA maps Java objects to database tables and converts persistence operations into the appropriate SQL."
      ],
      bullets: [
        "Create means inserting a new record.",
        "Read means retrieving existing records.",
        "Update means changing an existing record.",
        "Delete means removing a record.",
        "Spring Data JPA provides many standard repository methods for these operations.",
        "JpaRepository provides CRUD, pagination, sorting, and JPA-specific repository capabilities."
      ]
    },
    {
      id: "crud-flow",
      title: "Complete CRUD Flow",
      paragraphs: [
        "A typical CRUD request starts from the client, reaches the controller, moves to the service layer, and finally reaches the repository. The repository interacts with the JPA provider, which communicates with the database.",
        "For example, when a client sends POST /api/employees, the controller receives the request, the service applies business logic, the repository saves the entity, and JPA generates the required SQL."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | HTTP Request
  v
Controller
  |
  | calls
  v
Service
  |
  | calls
  v
Repository
  |
  | JPA/Hibernate
  v
Database

Example:
POST /api/employees
       |
       v
EmployeeController
       |
       v
EmployeeService
       |
       v
EmployeeRepository
       |
       v
employees table`
      }
    },
    {
      id: "entity",
      title: "JPA Entity Used for CRUD",
      paragraphs: [
        "CRUD operations are normally performed on a class annotated with @Entity. The entity represents a database table, while its fields represent columns.",
        "The entity must have an identifier, normally declared using @Id. JPA uses this identifier to distinguish one entity instance from another."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private double salary;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}`
      }
    },
    {
      id: "repository",
      title: "Repository Methods",
      paragraphs: [
        "Spring Data JPA provides standard repository methods so that common database operations can be performed without manually writing SQL.",
        "JpaRepository<Employee, Long> means the repository manages Employee entities and the entity identifier type is Long."
      ],
      bullets: [
        "save(entity): creates or updates an entity.",
        "findById(id): retrieves an entity by its identifier and returns Optional.",
        "findAll(): retrieves all entities.",
        "deleteById(id): deletes an entity by its identifier.",
        "existsById(id): checks whether an entity exists.",
        "count(): returns the number of entities.",
        "delete(entity): deletes the specified entity.",
        "deleteAll(): deletes all entities managed by the repository."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}`
      }
    },
    {
      id: "repository-method-return-types",
      title: "Important Repository Return Types",
      paragraphs: [
        "Different repository methods return different types depending on the operation. Understanding these return types is important when writing service-layer code.",
        "findById() returns Optional because the requested record may not exist. findAll() normally returns a List because multiple records can be returned."
      ],
      code: {
        language: "java",
        code: `Optional<Employee> employee =
    employeeRepository.findById(1L);

List<Employee> employees =
    employeeRepository.findAll();

boolean exists =
    employeeRepository.existsById(1L);

long count =
    employeeRepository.count();`
      }
    },
    {
      id: "create",
      title: "Create and Read",
      paragraphs: [
        "Creating an entity means creating a new Java object, setting its values, and passing it to the repository.",
        "When a new entity is persisted, JPA generates an INSERT operation when the persistence context is synchronized with the database.",
        "The generated identifier is normally available on the entity after the persistence operation has been performed."
      ],
      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("Venkatesh");
employee.setEmail("venkatesh@example.com");
employee.setSalary(50000);

Employee saved = employeeRepository.save(employee);

System.out.println(saved.getId());`
      },
      output: `Example result:

Employee created successfully.

Generated ID: 1
Name: Venkatesh
Email: venkatesh@example.com
Salary: 50000`
    },
    {
      id: "create-flow",
      title: "How Create Works Internally",
      paragraphs: [
        "The application first creates an Employee Java object. The service passes that object to the repository. Spring Data JPA delegates the operation to the JPA provider, commonly Hibernate.",
        "Hibernate determines that the entity is new and schedules an INSERT operation. The actual SQL execution occurs when the persistence context is flushed, which may happen before transaction commit or at another required synchronization point."
      ],
      code: {
        language: "text",
        code: `new Employee()
      |
      v
employeeRepository.save(employee)
      |
      v
Spring Data JPA
      |
      v
EntityManager
      |
      v
Hibernate
      |
      v
INSERT INTO employee (...)
      |
      v
Database`
      }
    },
    {
      id: "read-by-id",
      title: "Read an Entity by ID",
      paragraphs: [
        "findById() is used when you need one entity identified by its primary key.",
        "Because the requested record may not exist, findById() returns Optional<Employee> instead of directly returning Employee."
      ],
      code: {
        language: "java",
        code: `Employee employee = employeeRepository.findById(id)
    .orElseThrow(() ->
        new RuntimeException("Employee not found"));`
      }
    },
    {
      id: "read-all",
      title: "Read All Entities",
      paragraphs: [
        "findAll() retrieves all entities available through the repository. It is useful for simple listing operations.",
        "For large tables, loading every record at once may be inefficient. Pagination should normally be considered when the number of records can become large."
      ],
      code: {
        language: "java",
        code: `List<Employee> employees =
    employeeRepository.findAll();

employees.forEach(employee ->
    System.out.println(employee.getName()));`
      }
    },
    {
      id: "read-exists",
      title: "Check Whether an Entity Exists",
      paragraphs: [
        "existsById() checks whether an entity with a particular identifier exists.",
        "It is useful when the application needs to check existence without retrieving the complete entity."
      ],
      code: {
        language: "java",
        code: `boolean exists = employeeRepository.existsById(id);

if (!exists) {
    throw new RuntimeException("Employee does not exist");
}`
      }
    },
    {
      id: "update",
      title: "Update an Entity",
      paragraphs: [
        "A common update pattern is to load the existing entity, change its fields, and save it.",
        "Inside a transaction, when an entity is managed by the persistence context, JPA can detect changes to that entity through dirty checking. Therefore, explicitly calling save() after modifying a managed entity is often not necessary for the database update, although using save() can make repository intent explicit depending on the application's style.",
        "The important part is that the entity being updated must represent an existing database record."
      ],
      code: {
        language: "java",
        code: `Employee employee = employeeRepository.findById(id)
    .orElseThrow(() ->
        new RuntimeException("Employee not found"));

employee.setName("Updated Name");
employee.setEmail("updated@example.com");
employee.setSalary(65000);

employeeRepository.save(employee);`
      }
    },
    {
      id: "dirty-checking",
      title: "Update Through JPA Dirty Checking",
      paragraphs: [
        "Dirty checking is a JPA mechanism that detects changes made to managed entities inside a persistence context.",
        "If an Employee is loaded inside a transaction, the returned entity is normally managed by the current persistence context. When its fields change, Hibernate can detect those changes and generate the required UPDATE during flush.",
        "This is one of the important differences between working with JPA entities and manually writing SQL statements."
      ],
      code: {
        language: "java",
        code: `@Transactional
public void updateEmployee(Long id) {

    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() ->
            new RuntimeException("Employee not found"));

    employee.setName("Updated Name");

    // No explicit update query is required.
    // JPA detects the changed field and updates the database
    // when the persistence context is flushed.
}`
      }
    },
    {
      id: "partial-update",
      title: "Updating Selected Fields",
      paragraphs: [
        "Sometimes an application needs to update only one or two fields instead of replacing the complete entity.",
        "For simple applications, loading the entity and changing the required fields is often clear and safe. For large datasets or specialized use cases, a repository update query can be used carefully.",
        "Bulk update queries have different persistence-context considerations and should be used with an understanding of flushing and stale entity state."
      ],
      code: {
        language: "java",
        code: `@Modifying
@Query("""
       update Employee e
       set e.salary = :salary
       where e.id = :id
       """)
int updateSalary(
    @Param("id") Long id,
    @Param("salary") double salary
);`
      }
    },
    {
      id: "delete",
      title: "Delete an Entity",
      paragraphs: [
        "deleteById() deletes an entity using its identifier.",
        "The delete operation can fail if the record does not exist, if the entity cannot be deleted in the current persistence state, or if database constraints such as foreign keys prevent deletion.",
        "Deletion should normally be performed from the service layer where business rules can be checked before the repository operation."
      ],
      code: {
        language: "java",
        code: `employeeRepository.deleteById(id);`
      }
    },
    {
      id: "delete-after-check",
      title: "Delete After Checking Existence",
      paragraphs: [
        "A service can explicitly check whether an employee exists before deleting it. This allows the application to return a meaningful business-level error when the record is missing.",
        "Whether an explicit existsById() check is necessary depends on the application's requirements. Avoid unnecessary database calls when the delete operation itself can provide sufficient behavior."
      ],
      code: {
        language: "java",
        code: `if (!employeeRepository.existsById(id)) {
    throw new RuntimeException("Employee not found");
}

employeeRepository.deleteById(id);`
      }
    },
    {
      id: "service-layer",
      title: "CRUD Operations in the Service Layer",
      paragraphs: [
        "In a layered Spring Boot application, the controller should handle HTTP concerns while the service layer handles application and business logic.",
        "The service calls the repository to perform persistence operations. This keeps database access out of the controller and makes the application easier to test and maintain."
      ],
      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() ->
                new RuntimeException("Employee not found"));
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee update(Long id, Employee request) {

        Employee employee = getById(id);

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setSalary(request.getSalary());

        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        Employee employee = getById(id);
        employeeRepository.delete(employee);
    }
}`
      }
    },
    {
      id: "controller",
      title: "CRUD REST Controller",
      paragraphs: [
        "The controller exposes CRUD operations through HTTP endpoints. A common REST design uses POST for creation, GET for reading, PUT or PATCH for updates, and DELETE for deletion."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return employeeService.getById(id);
    }

    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @PutMapping("/{id}")
    public Employee update(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return employeeService.update(id, employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.delete(id);
    }
}`
      }
    },
    {
      id: "crud-http-methods",
      title: "CRUD and HTTP Methods",
      bullets: [
        "POST /api/employees -> Create a new employee.",
        "GET /api/employees -> Read all employees.",
        "GET /api/employees/{id} -> Read one employee.",
        "PUT /api/employees/{id} -> Update an employee.",
        "PATCH /api/employees/{id} -> Partially update an employee when the API supports partial updates.",
        "DELETE /api/employees/{id} -> Delete an employee."
      ],
      code: {
        language: "text",
        code: `CREATE
POST /api/employees

READ ALL
GET /api/employees

READ ONE
GET /api/employees/10

UPDATE
PUT /api/employees/10

DELETE
DELETE /api/employees/10`
      }
    },
    {
      id: "request-body",
      title: "Create Request Example",
      paragraphs: [
        "A client can send employee information as JSON. Spring MVC converts the JSON request body into a Java object before the controller method is invoked."
      ],
      code: {
        language: "json",
        code: `{
  "name": "Venkatesh",
  "email": "venkatesh@example.com",
  "salary": 50000
}`
      }
    },
    {
      id: "response",
      title: "CRUD Response Example",
      paragraphs: [
        "A REST API should return an appropriate HTTP status code along with a useful response. For example, successful creation commonly returns 201 Created, while a successful read commonly returns 200 OK.",
        "A production API should also define how it represents errors such as a missing employee or invalid request data."
      ],
      code: {
        language: "json",
        code: `{
  "id": 1,
  "name": "Venkatesh",
  "email": "venkatesh@example.com",
  "salary": 50000
}`
      }
    },
    {
      id: "dto",
      title: "Why DTOs Are Useful in CRUD APIs",
      paragraphs: [
        "Although it is possible to use an entity directly as a request or response object, DTOs are often preferred in production applications.",
        "A DTO separates the API contract from the persistence model. This prevents clients from directly controlling fields that should be managed by the server, such as generated IDs or internal database fields."
      ],
      code: {
        language: "java",
        code: `public class EmployeeRequest {

    private String name;
    private String email;
    private double salary;

    // getters and setters
}`
      }
    },
    {
      id: "validation",
      title: "Validation During CRUD Operations",
      paragraphs: [
        "Create and update operations should validate incoming data before storing it in the database.",
        "Spring Boot commonly uses Jakarta Bean Validation annotations such as @NotBlank, @Email, @Positive, and @Size."
      ],
      code: {
        language: "java",
        code: `public class EmployeeRequest {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @Positive
    private double salary;
}`
      }
    },
    {
      id: "transaction",
      title: "Transactions and CRUD Operations",
      paragraphs: [
        "A transaction defines a unit of work that should be treated consistently by the database.",
        "Simple CRUD operations may execute within repository-managed transactional boundaries, while service methods containing multiple database operations commonly define the business transaction boundary using @Transactional.",
        "For example, if updating an employee also requires inserting an audit record, both operations may need to succeed or fail together."
      ],
      code: {
        language: "java",
        code: `@Transactional
public void updateEmployeeAndCreateAudit(
        Long id,
        String name) {

    Employee employee = employeeRepository.findById(id)
        .orElseThrow();

    employee.setName(name);

    auditRepository.save(
        new Audit("Employee updated: " + id)
    );
}`
      }
    },
    {
      id: "entity-state",
      title: "JPA Entity States During CRUD",
      paragraphs: [
        "Understanding entity states helps explain why save(), dirty checking, and delete operations behave the way they do.",
        "A transient entity is a new Java object that is not associated with the persistence context. A managed entity is associated with the current persistence context. A detached entity was previously managed but is no longer associated with the current persistence context. A removed entity has been marked for deletion."
      ],
      code: {
        language: "text",
        code: `Transient
   |
   | persist/save
   v
Managed
   |
   | transaction/context ends
   v
Detached

Managed
   |
   | remove/delete
   v
Removed`
      }
    },
    {
      id: "save-behavior",
      title: "What Does save() Actually Do?",
      paragraphs: [
        "Spring Data JPA's save() method delegates to the JPA EntityManager. For a new entity it generally results in persist behavior; for an existing entity it may use merge behavior according to Spring Data JPA's entity-newness detection.",
        "Therefore, save() does not simply mean 'always execute INSERT' and it does not simply mean 'always execute UPDATE'. The actual persistence operation depends on whether the entity is considered new."
      ],
      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("New Employee");

// New entity
employeeRepository.save(employee);

// Existing entity
Employee existing =
    employeeRepository.findById(1L).orElseThrow();

existing.setName("Updated Employee");

employeeRepository.save(existing);`
      }
    },
    {
      id: "pagination",
      title: "CRUD and Pagination",
      paragraphs: [
        "findAll() is convenient for small datasets, but returning every record is not appropriate for large tables.",
        "Spring Data JPA supports pagination using Pageable. This allows the application to retrieve only a specific page of records."
      ],
      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}

// Service
Page<Employee> page =
    employeeRepository.findAll(
        PageRequest.of(0, 10)
    );`
      }
    },
    {
      id: "sorting",
      title: "CRUD and Sorting",
      paragraphs: [
        "Spring Data JPA also supports sorting without requiring a custom SQL query for simple cases."
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
      id: "derived-query",
      title: "Finding Records with Derived Query Methods",
      paragraphs: [
        "Spring Data JPA can create queries from repository method names. This is useful when the application needs to read records using fields other than the primary key."
      ],
      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByName(String name);

    List<Employee> findBySalaryGreaterThan(double salary);
}`
      }
    },
    {
      id: "common-mistakes",
      title: "Common CRUD Mistakes",
      bullets: [
        "Calling findById() without handling the possibility that the record does not exist.",
        "Using findAll() for very large tables instead of pagination.",
        "Putting business logic directly inside the controller.",
        "Returning entities directly when the API requires a separate DTO contract.",
        "Assuming save() always means INSERT.",
        "Ignoring validation for create and update requests.",
        "Performing multiple related database operations without considering the transaction boundary.",
        "Deleting records without checking business rules or foreign-key relationships.",
        "Using entity setters blindly during updates and accidentally overwriting fields that should remain unchanged.",
        "Exposing internal database fields through REST responses."
      ]
    },
    {
      id: "crud-best-practices",
      title: "CRUD Best Practices",
      bullets: [
        "Keep CRUD persistence logic in repository classes.",
        "Keep business rules in the service layer.",
        "Keep HTTP-specific logic in controllers.",
        "Use DTOs for stable API contracts.",
        "Validate create and update requests.",
        "Use Optional carefully when reading by ID.",
        "Use pagination for large collections.",
        "Define transaction boundaries around related business operations.",
        "Return meaningful HTTP status codes.",
        "Use centralized exception handling for consistent API errors.",
        "Avoid unnecessary database queries.",
        "Use database constraints to protect important data integrity rules.",
        "Use integration tests for important persistence behavior."
      ]
    },
    {
      id: "complete-crud-flow",
      title: "Complete CRUD Example Flow",
      paragraphs: [
        "The following example shows how the pieces fit together in a typical Spring Boot application."
      ],
      code: {
        language: "text",
        code: `CREATE
Client
  |
  | POST /api/employees
  v
Controller
  |
  v
Service
  |
  v
Repository.save()
  |
  v
Hibernate
  |
  v
INSERT
  |
  v
Database


READ
Client
  |
  | GET /api/employees/1
  v
Controller
  |
  v
Service
  |
  v
Repository.findById(1)
  |
  v
Hibernate
  |
  v
SELECT
  |
  v
Database


UPDATE
Client
  |
  | PUT /api/employees/1
  v
Controller
  |
  v
Service
  |
  v
findById()
  |
  v
Modify Entity
  |
  v
Dirty Checking / save()
  |
  v
UPDATE
  |
  v
Database


DELETE
Client
  |
  | DELETE /api/employees/1
  v
Controller
  |
  v
Service
  |
  v
Repository.deleteById()
  |
  v
Hibernate
  |
  v
DELETE
  |
  v
Database`
      }
    },
    {
      id: "testing-crud",
      title: "Testing CRUD Operations",
      paragraphs: [
        "CRUD behavior should be tested at the appropriate layer. Service unit tests can verify business logic using mocked repositories, while repository tests can verify actual persistence behavior using a JPA-focused test.",
        "Controller tests can verify HTTP status codes, request validation, JSON responses, and service interactions."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCreateEmployee() {

    Employee employee = new Employee();
    employee.setName("Venkatesh");

    when(employeeRepository.save(employee))
        .thenReturn(employee);

    Employee result =
        employeeService.create(employee);

    assertEquals("Venkatesh", result.getName());

    verify(employeeRepository)
        .save(employee);
}`
      }
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "Which interface provides standard CRUD methods?",
          answer: "JpaRepository extends Spring Data repository interfaces and provides CRUD, pagination, sorting, and other JPA persistence methods."
        },
        {
          question: "What does save() do?",
          answer: "save() persists an entity through Spring Data JPA. For a new entity it generally uses persist behavior, while an existing entity may use merge behavior based on entity-newness detection."
        },
        {
          question: "What is CRUD?",
          answer: "CRUD stands for Create, Read, Update, and Delete. These represent the basic operations required to manage persistent data."
        },
        {
          question: "What does findById() return?",
          answer: "findById() returns an Optional containing the entity when it exists. If no entity is found for the given ID, the Optional is empty."
        },
        {
          question: "Why does findById() use Optional?",
          answer: "Because a database record may not exist for the requested identifier. Optional makes the absence explicit and encourages the application to handle that case."
        },
        {
          question: "What is the difference between findById() and findAll()?",
          answer: "findById() retrieves one entity using its identifier, while findAll() retrieves all entities available through the repository."
        },
        {
          question: "What does deleteById() do?",
          answer: "deleteById() requests deletion of the entity identified by the supplied ID. The operation is translated into the appropriate persistence operation by Spring Data JPA."
        },
        {
          question: "What is dirty checking in JPA?",
          answer: "Dirty checking is JPA's mechanism for detecting changes made to managed entities and synchronizing those changes with the database during flush."
        },
        {
          question: "Is save() required when updating a managed entity?",
          answer: "Not necessarily. Inside a transaction, changes to a managed entity can be detected automatically through dirty checking. Calling save() can still be used depending on the application's repository style and entity state."
        },
        {
          question: "What is the difference between persist and merge?",
          answer: "persist makes a new entity managed and schedules it for insertion. merge copies the state of an entity into a managed instance and is commonly associated with existing or detached entity updates."
        },
        {
          question: "Why should CRUD logic usually be placed in a service layer?",
          answer: "The service layer provides a place for business rules, transaction boundaries, validation coordination, and orchestration, keeping controllers focused on HTTP concerns and repositories focused on persistence."
        },
        {
          question: "Why should findAll() be avoided for very large tables?",
          answer: "findAll() can load a large number of records into memory and produce expensive database and network operations. Pagination is generally better for large datasets."
        },
        {
          question: "How can pagination be implemented with Spring Data JPA?",
          answer: "Use a repository method such as findAll(Pageable pageable), then pass a PageRequest containing the page number and page size."
        },
        {
          question: "What is a derived query method?",
          answer: "A derived query method is a Spring Data repository method whose name describes the query, such as findByEmail() or findBySalaryGreaterThan(). Spring Data generates the query from the method name."
        },
        {
          question: "Should an entity be used directly as a REST request object?",
          answer: "It is possible, but DTOs are often preferred because they separate the API contract from the persistence model and prevent clients from directly controlling internal entity fields."
        },
        {
          question: "How do you handle an employee that does not exist?",
          answer: "The service can use findById(id).orElseThrow(...) and throw a domain-specific exception such as EmployeeNotFoundException, which can then be converted into an appropriate HTTP error by centralized exception handling."
        },
        {
          question: "What happens if a delete violates a foreign-key constraint?",
          answer: "The database can reject the deletion because related records still reference the entity. The application should handle the persistence exception and return an appropriate business or API error."
        },
        {
          question: "What is the difference between delete() and deleteById()?",
          answer: "delete() accepts an entity instance, while deleteById() accepts the entity identifier. Both ultimately request removal through the repository and JPA persistence infrastructure."
        },
        {
          question: "Why are transactions important for CRUD operations?",
          answer: "Transactions provide consistent database behavior for related operations. If multiple changes must succeed or fail together, placing them inside the same transaction prevents partial completion."
        },
        {
          question: "Can CRUD operations be performed without writing SQL?",
          answer: "Yes. Spring Data JPA provides standard repository methods and derived queries that allow many CRUD operations without manually writing SQL. Hibernate generates the SQL needed for the database interaction."
        },
        {
          question: "What is the difference between an entity and a database row?",
          answer: "An entity is a Java object managed by JPA, while a database row is relational data stored in a table. JPA maps the entity state to the corresponding database representation."
        },
        {
          question: "What is the typical CRUD architecture in Spring Boot?",
          answer: "A common architecture is Controller -> Service -> Repository -> JPA/Hibernate -> Database. The controller handles HTTP, the service handles application logic, and the repository handles persistence access."
        },
        {
          question: "What happens internally when employeeRepository.save(employee) is called?",
          answer: "Spring Data JPA delegates to the JPA EntityManager. Depending on whether the entity is considered new, persist or merge behavior is used, and Hibernate eventually synchronizes the persistence context with the database."
        },
        {
          question: "What is the difference between unit testing CRUD service logic and repository testing?",
          answer: "A service unit test normally mocks the repository and focuses on business logic. A repository test uses real JPA persistence infrastructure to verify database mapping and query behavior."
        },
        {
          question: "How would you design a production-ready CRUD API?",
          answer: "Use Controller-Service-Repository separation, DTOs, validation, meaningful HTTP status codes, centralized exception handling, pagination for collections, transaction boundaries for related operations, database constraints, and appropriate unit and integration tests."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Question",
      paragraphs: [
        "Interviewers often ask you to explain the complete flow rather than simply define repository methods."
      ],
      interviewQuestions: [
        {
          question: "Explain what happens when a client sends PUT /api/employees/10 to update an employee.",
          answer: "The request reaches the controller through DispatcherServlet. The controller receives the path variable and request body and calls the service. The service loads employee 10 using findById(). If it exists, the service changes the required fields. Inside the transaction, JPA tracks the managed entity and Hibernate detects the changes during flush and generates an UPDATE. The transaction commits and the controller returns the response."
        },
        {
          question: "How would you implement DELETE /api/employees/10 safely?",
          answer: "The controller passes the ID to the service. The service checks the required business rules and loads or verifies the employee. If the employee does not exist, it throws a not-found exception. Otherwise, it deletes the entity through the repository. If database relationships prevent deletion, the application handles the persistence exception and returns an appropriate error."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "CRUD = Create, Read, Update, Delete.",
        "JpaRepository provides standard CRUD operations.",
        "save() is used for create and update persistence operations.",
        "findById() returns Optional.",
        "findAll() retrieves a collection of entities.",
        "existsById() checks whether an ID exists.",
        "deleteById() deletes by identifier.",
        "Dirty checking detects changes to managed entities.",
        "Use transactions when multiple related operations must succeed or fail together.",
        "Use pagination for large collections.",
        "Use DTOs to separate API contracts from persistence entities.",
        "Use validation for create and update requests.",
        "Keep business logic in the service layer.",
        "Use centralized exception handling for consistent API errors.",
        "Test service, controller, and repository behavior at the appropriate level."
      ],
      code: {
        language: "text",
        code: `CRUD Repository Cheat Sheet

CREATE
save(entity)

READ ONE
findById(id)

READ ALL
findAll()

CHECK
existsById(id)

UPDATE
findById(id)
    -> modify entity
    -> transaction / save()

DELETE
deleteById(id)

COUNT
count()

PAGINATION
findAll(Pageable)`
      }
    },
    {
      id: "revision-notes",
      title: "Important Notes",
      bullets: [
        "Do not assume save() always generates INSERT; entity-newness determines whether persist or merge behavior is used.",
        "Do not assume save() is always required after changing a managed entity inside a transaction because JPA dirty checking can detect the change.",
        "findById() can return an empty Optional, so missing-record handling is required.",
        "findAll() is convenient for small datasets but should usually be combined with pagination for large datasets.",
        "A repository should focus on persistence access rather than business rules.",
        "A service layer is the usual place for CRUD business logic and transaction boundaries.",
        "A controller should focus on HTTP request and response concerns.",
        "Database constraints remain important even when validation exists in the application.",
        "CRUD APIs should define clear behavior for not-found, validation, conflict, and database errors.",
        "For interviews, remember the basic flow: Controller -> Service -> Repository -> JPA/Hibernate -> Database."
      ]
    }
  ]
};
