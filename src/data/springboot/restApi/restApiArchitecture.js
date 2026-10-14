
export const restApiArchitecture = {
  id: "rest-api-architecture",
  title: "REST API Architecture",
  slug: "rest-api-architecture",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Understand the basic architecture of a REST API and how clients, controllers, services, repositories, and databases work together in a layered Spring Boot application.",

  sections: [
    {
      id: "architecture-overview",
      title: "REST API Architecture",

      paragraphs: [
        "A REST API is commonly organized into layers so that each part of the application has a clear responsibility.",
        "In a typical Spring Boot backend, the controller receives HTTP requests, the service contains application and business logic, the repository communicates with the database, and the database stores application data.",
        "The client can be a React application, mobile application, browser, Postman, or another backend service.",
        "The layered approach helps developers understand where code belongs and reduces the risk of putting all application logic into one class."
      ],

      code: {
        language: "text",
        code: `Client
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database


Response:

Database
   ↑
Repository
   ↑
Service
   ↑
Controller
   ↑
Client`
      },

      bullets: [
        "Client → sends HTTP requests.",
        "Controller → handles HTTP communication.",
        "Service → contains application and business logic.",
        "Repository → handles data-access operations.",
        "Database → stores persistent data.",
        "The response travels back through the application layers."
      ]
    },

    {
      id: "client",
      title: "Client Layer",

      paragraphs: [
        "The client is the application or system that communicates with the REST API.",
        "A client sends an HTTP request containing information such as the HTTP method, URL, headers, and sometimes a request body.",
        "The client receives the HTTP response containing a status code, headers, and optionally a response body."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/101
Accept: application/json`
      },

      bullets: [
        "React frontend can be a client.",
        "A mobile application can be a client.",
        "Postman can be used as a client for testing.",
        "Another backend service can also act as a client.",
        "The client should not directly access the application's database."
      ]
    },

    {
      id: "controller",
      title: "Controller Layer",

      paragraphs: [
        "The controller handles HTTP requests and responses.",
        "It maps URLs and HTTP methods to Java methods.",
        "Controllers should generally focus on HTTP-related responsibilities such as reading request data, validating input through appropriate mechanisms, calling the service layer, and producing an HTTP response.",
        "Controllers should normally avoid containing large amounts of business logic."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(
            EmployeeService employeeService
    ) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployee(
            @PathVariable Long id
    ) {
        EmployeeResponse employee =
                employeeService.getEmployee(id);

        return ResponseEntity.ok(employee);
    }
}`
      },

      bullets: [
        "@RestController identifies the class as a REST controller.",
        "@RequestMapping defines the common URL prefix.",
        "@GetMapping maps the GET request.",
        "@PathVariable reads the employee ID.",
        "The controller delegates application logic to the service.",
        "The controller returns the HTTP response."
      ]
    },

    {
      id: "controller-responsibilities",
      title: "Controller Responsibilities",

      paragraphs: [
        "A controller acts as the HTTP boundary of the application.",
        "It should translate HTTP input into application-layer calls and translate application results into HTTP responses."
      ],

      code: {
        language: "text",
        code: `Controller responsibilities:

1. Receive HTTP request
        ↓
2. Read path/query/body data
        ↓
3. Trigger validation
        ↓
4. Call service
        ↓
5. Receive service result
        ↓
6. Return HTTP response`
      },

      bullets: [
        "Request mapping.",
        "Request parameter extraction.",
        "Request-body handling.",
        "Input validation coordination.",
        "Calling the service layer.",
        "Returning suitable HTTP status codes.",
        "Returning response DTOs."
      ]
    },

    {
      id: "service",
      title: "Service Layer",

      paragraphs: [
        "The service layer contains application or business logic.",
        "Keeping business logic outside controllers makes the application easier to maintain and test.",
        "The service can coordinate multiple repositories or other application components to complete one business operation.",
        "A service should not normally be responsible for directly handling HTTP-specific details."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository
    ) {
        this.employeeRepository = employeeRepository;
    }

    public Employee getEmployee(Long id) {

        return employeeRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Employee not found"
                    )
                );
    }
}`
      },

      bullets: [
        "@Service identifies the class as a Spring service bean.",
        "Business rules generally belong here.",
        "The service can call repositories.",
        "The service can coordinate multiple operations.",
        "The service should normally remain independent of HTTP details."
      ]
    },

    {
      id: "business-logic",
      title: "What is Business Logic?",

      paragraphs: [
        "Business logic represents the rules and decisions required by the application.",
        "For example, an employee-management application might prevent duplicate employee emails or prevent an employee from being deleted when business rules do not allow deletion.",
        "These rules should generally be implemented in the service or appropriate domain/application layer rather than inside controller methods."
      ],

      code: {
        language: "java",
        code: `public Employee createEmployee(
        Employee employee
) {

    boolean exists =
            employeeRepository
                    .existsByEmail(employee.getEmail());

    if (exists) {
        throw new RuntimeException(
                "Email already exists"
        );
    }

    return employeeRepository.save(employee);
}`
      },

      bullets: [
        "Checking business rules is service-layer work.",
        "The controller should not contain large business-rule blocks.",
        "Services can coordinate repositories.",
        "Business rules should be testable independently from HTTP."
      ]
    },

    {
      id: "repository",
      title: "Repository Layer",

      paragraphs: [
        "The repository layer is responsible for data-access operations.",
        "In Spring Data JPA, repositories can extend JpaRepository to obtain common CRUD operations without writing SQL for every basic operation.",
        "The repository should normally focus on persistence rather than application business rules."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);
}`
      },

      bullets: [
        "Repositories communicate with the persistence layer.",
        "JpaRepository provides common CRUD operations.",
        "findById can retrieve an entity by ID.",
        "save can create or update an entity.",
        "deleteById can delete an entity.",
        "Custom query methods can be added when required."
      ]
    },

    {
      id: "database",
      title: "Database Layer",

      paragraphs: [
        "The database stores persistent application data.",
        "For a Spring Boot application using MySQL, application entities can be mapped to database tables using JPA and Hibernate.",
        "The database remains responsible for persistent storage, constraints, indexes, and transactionally consistent data operations according to the database design."
      ],

      code: {
        language: "text",
        code: `MySQL

employees

+----+--------+---------------------+
| id | name   | email               |
+----+--------+---------------------+
| 1  | Rahul  | rahul@example.com   |
| 2  | Priya  | priya@example.com   |
+----+--------+---------------------+`
      },

      bullets: [
        "Database stores persistent data.",
        "Tables store structured records.",
        "Primary keys identify rows.",
        "Constraints protect data integrity.",
        "Indexes can improve query performance.",
        "Transactions help maintain consistency across related operations."
      ]
    },

    {
      id: "entity",
      title: "Entity Layer",

      paragraphs: [
        "In a Spring Data JPA application, an entity represents a persistent object that is mapped to a database table.",
        "The entity is commonly used by the persistence layer, while REST APIs often use DTOs to control the external API contract."
      ],

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String department;

    // getters and setters
}`
      },

      bullets: [
        "@Entity marks a persistent JPA entity.",
        "@Table can specify the database table.",
        "@Id identifies the primary key.",
        "@GeneratedValue can configure ID generation.",
        "Entity design and API response design do not have to be identical."
      ]
    },

    {
      id: "dto",
      title: "DTO Layer",

      paragraphs: [
        "A DTO, or Data Transfer Object, is commonly used to transfer data between the API and the application without exposing persistence entities directly.",
        "Request DTOs define what clients are allowed to submit, while response DTOs define what the API returns."
      ],

      code: {
        language: "java",
        code: `public class EmployeeResponse {

    private Long id;
    private String name;
    private String email;
    private String department;

    // getters and setters
}


public class EmployeeCreateRequest {

    private String name;
    private String email;
    private String department;

    // getters and setters
}`
      },

      bullets: [
        "Request DTO → input from the client.",
        "Response DTO → output sent to the client.",
        "DTOs provide a controlled API contract.",
        "DTOs can prevent exposing internal persistence fields.",
        "DTOs can carry validation rules."
      ]
    },

    {
      id: "complete-flow",
      title: "Complete Request Flow",

      paragraphs: [
        "A REST API request normally travels through several application components before the response is returned to the client.",
        "The exact flow depends on the application's implementation, but the layered flow below is a common Spring Boot pattern."
      ],

      code: {
        language: "text",
        code: `GET /api/employees/101
        |
        v
Embedded Tomcat
        |
        v
DispatcherServlet
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
MySQL
        |
        | Employee row
        v
EmployeeRepository
        |
        v
EmployeeService
        |
        v
EmployeeController
        |
        v
HTTP Response
        |
        v
Client`
      },

      bullets: [
        "The client sends the HTTP request.",
        "The embedded server receives the request.",
        "DispatcherServlet coordinates Spring MVC request processing.",
        "The controller receives the mapped request.",
        "The service performs application logic.",
        "The repository accesses the database.",
        "The result travels back through the application layers.",
        "The controller produces the HTTP response."
      ]
    },

    {
      id: "create-flow",
      title: "POST Request Flow",

      paragraphs: [
        "A create operation normally starts with a POST request containing the new resource data.",
        "The controller receives the request, the service applies business rules, and the repository persists the entity."
      ],

      code: {
        language: "text",
        code: `POST /api/employees
        |
        | JSON body
        v
EmployeeController
        |
        | EmployeeCreateRequest
        v
EmployeeService
        |
        | Validate business rules
        v
EmployeeRepository
        |
        | INSERT
        v
MySQL
        |
        | Generated ID
        v
EmployeeRepository
        |
        v
EmployeeService
        |
        v
EmployeeController
        |
        v
201 Created`
      },

      bullets: [
        "Controller handles HTTP input.",
        "Service validates business rules.",
        "Repository performs persistence.",
        "Database stores the new record.",
        "The API commonly returns 201 Created after successful creation."
      ]
    },

    {
      id: "read-flow",
      title: "GET Request Flow",

      paragraphs: [
        "A read operation normally retrieves data from the database and returns it to the client."
      ],

      code: {
        language: "text",
        code: `GET /api/employees/101
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
        | SELECT
        v
MySQL
        |
        | Employee row
        v
EmployeeRepository
        |
        v
EmployeeService
        |
        v
EmployeeController
        |
        v
200 OK
        |
        v
JSON Response`
      },

      bullets: [
        "GET normally does not modify the database.",
        "Repository retrieves the required data.",
        "Service can apply application rules or transformations.",
        "Controller returns the response."
      ]
    },

    {
      id: "update-flow",
      title: "PUT or PATCH Request Flow",

      paragraphs: [
        "Update operations follow the same layered architecture but include validation and modification of an existing resource."
      ],

      code: {
        language: "text",
        code: `PUT/PATCH /api/employees/101
        |
        | Request body
        v
EmployeeController
        |
        v
EmployeeService
        |
        | Find employee
        | Validate rules
        | Apply changes
        v
EmployeeRepository
        |
        | UPDATE
        v
MySQL
        |
        v
EmployeeService
        |
        v
EmployeeController
        |
        v
200 OK / 204 No Content`
      },

      bullets: [
        "Controller receives the update request.",
        "Service loads the existing resource when required.",
        "Service applies business rules.",
        "Repository persists the update.",
        "The API returns an appropriate success response."
      ]
    },

    {
      id: "delete-flow",
      title: "DELETE Request Flow",

      paragraphs: [
        "A delete operation normally identifies a resource using its ID and asks the service layer to remove it."
      ],

      code: {
        language: "text",
        code: `DELETE /api/employees/101
        |
        v
EmployeeController
        |
        v
EmployeeService
        |
        | Check business rules
        v
EmployeeRepository
        |
        | DELETE
        v
MySQL
        |
        v
EmployeeController
        |
        v
204 No Content`
      },

      bullets: [
        "Controller receives the DELETE request.",
        "Service can verify deletion rules.",
        "Repository performs the persistence operation.",
        "204 No Content is commonly returned after successful deletion."
      ]
    },

    {
      id: "separation",
      title: "Why Separate Layers?",

      paragraphs: [
        "Separating responsibilities makes the application easier to understand, test, maintain, and extend.",
        "If every operation is implemented directly inside a controller, controllers can quickly become large and difficult to test."
      ],

      bullets: [
        "Controllers focus on HTTP communication.",
        "Services focus on business logic.",
        "Repositories focus on data access.",
        "Entities represent persistent data.",
        "DTOs define controlled API data contracts.",
        "Responsibilities are easier to understand.",
        "Unit testing becomes easier.",
        "Application changes can be isolated to the appropriate layer.",
        "Code reuse becomes easier.",
        "Large controllers can be avoided."
      ]
    },

    {
      id: "dependency-flow",
      title: "Dependency Flow Between Layers",

      paragraphs: [
        "A common Spring Boot design is for the controller to depend on the service, and the service to depend on the repository.",
        "This creates a clear direction for application-level dependencies."
      ],

      code: {
        language: "text",
        code: `EmployeeController
       |
       | depends on
       v
EmployeeService
       |
       | depends on
       v
EmployeeRepository
       |
       | accesses
       v
Database`
      },

      bullets: [
        "Controller depends on service.",
        "Service depends on repository.",
        "Repository accesses persistence infrastructure.",
        "Controllers should not normally call repositories directly when a service layer is part of the application's architecture."
      ]
    },

    {
      id: "bad-architecture",
      title: "What Happens Without Layer Separation?",

      paragraphs: [
        "Without separation, a controller can end up handling request parsing, validation, business rules, database access, error handling, and response creation all in one method.",
        "This makes the code harder to understand and test."
      ],

      code: {
        language: "java",
        code: `// Avoid large controllers like this:

@PostMapping("/employees")
public ResponseEntity<?> createEmployee(
        @RequestBody Employee employee
) {

    // Validate input

    // Check duplicate email

    // Apply business rules

    // Connect to database

    // Save employee

    // Handle database errors

    // Build response

    // Return response

    return null;
}`
      },

      bullets: [
        "Too many responsibilities are placed in one method.",
        "Business logic becomes coupled to HTTP.",
        "Testing becomes harder.",
        "Code reuse becomes harder.",
        "Changes can affect unrelated responsibilities."
      ]
    },

    {
      id: "good-architecture",
      title: "Recommended Layered Structure",

      paragraphs: [
        "A cleaner approach is to keep the controller thin and delegate business operations to the service layer."
      ],

      code: {
        language: "text",
        code: `Controller

Receives request
      |
      v
Service

Business logic
      |
      v
Repository

Data access
      |
      v
Database

Persistence`
      },

      bullets: [
        "Controller should coordinate HTTP communication.",
        "Service should coordinate business operations.",
        "Repository should handle persistence.",
        "Database should store application data.",
        "DTOs can control data crossing the API boundary."
      ]
    },

    {
      id: "error-handling",
      title: "Where Does Exception Handling Fit?",

      paragraphs: [
        "Exceptions can originate in different layers. For example, a service may throw a business exception when an employee does not exist, while a repository operation may fail because of a persistence problem.",
        "A global exception-handling mechanism can translate application exceptions into consistent HTTP responses."
      ],

      code: {
        language: "text",
        code: `Controller
    |
    v
Service
    |
    +---- BusinessException
    |
    v
Repository
    |
    +---- PersistenceException
    |
    v
Global Exception Handler
    |
    v
HTTP Error Response`
      },

      bullets: [
        "Business exceptions can originate in the service layer.",
        "Persistence exceptions can originate around database operations.",
        "Global exception handling can create consistent API responses.",
        "Controllers should not contain repeated try-catch blocks for every possible application exception."
      ]
    },

    {
      id: "validation-flow",
      title: "Validation in Layered Architecture",

      paragraphs: [
        "Validation can occur at multiple levels depending on what is being validated.",
        "Input validation checks whether the request is structurally valid, while business validation checks whether the operation is allowed by application rules."
      ],

      code: {
        language: "text",
        code: `Client
   |
   v
Controller
   |
   | DTO validation
   | @Valid
   v
Service
   |
   | Business validation
   | Duplicate checks
   | Business rules
   v
Repository
   |
   v
Database
   |
   | Database constraints
   v
Data`
      },

      bullets: [
        "Controller boundary → request validation.",
        "Service layer → business validation.",
        "Database → persistence constraints.",
        "Different validation layers protect different concerns."
      ]
    },

    {
      id: "transaction-boundary",
      title: "Transactions and the Service Layer",

      paragraphs: [
        "When an operation contains multiple related database changes that must succeed or fail together, the service layer is commonly a suitable place to define the transaction boundary.",
        "Spring's @Transactional can be used when transaction management is required."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    @Transactional
    public void transferEmployee(
            Long employeeId,
            Long departmentId
    ) {

        // Load employee

        // Validate department

        // Change department

        // Save changes
    }
}`
      },

      bullets: [
        "A transaction can group related database operations.",
        "The service layer often represents the business operation boundary.",
        "@Transactional should be used based on the application's transaction requirements.",
        "Transaction boundaries should be designed around business operations rather than HTTP methods alone."
      ]
    },

    {
      id: "complete-project-structure",
      title: "Typical Spring Boot Project Structure",

      code: {
        language: "text",
        code: `src/main/java/com/example/app

├── controller
│   └── EmployeeController.java
│
├── service
│   ├── EmployeeService.java
│   └── EmployeeServiceImpl.java
│
├── repository
│   └── EmployeeRepository.java
│
├── entity
│   └── Employee.java
│
├── dto
│   ├── EmployeeCreateRequest.java
│   └── EmployeeResponse.java
│
├── exception
│   ├── EmployeeNotFoundException.java
│   └── GlobalExceptionHandler.java
│
└── config
    └── SecurityConfig.java`
      },

      bullets: [
        "controller → REST endpoints.",
        "service → application and business logic.",
        "repository → data access.",
        "entity → persistence models.",
        "dto → API request and response models.",
        "exception → application exception handling.",
        "config → application configuration."
      ]
    },

    {
      id: "complete-example",
      title: "Complete Layered Employee Example",

      paragraphs: [
        "The following simplified example shows how the layers work together for a GET operation."
      ],

      code: {
        language: "java",
        code: `// Controller

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(
            EmployeeService service
    ) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id
    ) {
        return service.getEmployee(id);
    }
}


// Service

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository
    ) {
        this.repository = repository;
    }

    public EmployeeResponse getEmployee(Long id) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow(
                            () -> new RuntimeException(
                                "Employee not found"
                            )
                        );

        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail()
        );
    }
}


// Repository

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}


// Response DTO

public record EmployeeResponse(
        Long id,
        String name,
        String email
) {
}`
      },

      bullets: [
        "The controller receives the HTTP request.",
        "The service performs application logic.",
        "The repository retrieves the entity.",
        "The service converts the entity into a response DTO.",
        "The controller returns the DTO to the client."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common REST Architecture Mistakes",

      paragraphs: [
        "Layered architecture is simple in concept, but developers commonly violate the responsibilities of each layer."
      ],

      bullets: [
        "Mistake 1: Putting business logic directly inside controllers.",
        "Mistake 2: Calling repositories directly from every controller method.",
        "Mistake 3: Returning JPA entities everywhere without considering API DTOs.",
        "Mistake 4: Putting HTTP-specific code inside the repository.",
        "Mistake 5: Putting SQL/database operations directly inside controllers.",
        "Mistake 6: Creating a service layer that contains no meaningful application responsibility and simply duplicates every repository method without reason.",
        "Mistake 7: Returning internal database exceptions directly to clients.",
        "Mistake 8: Mixing request validation, business rules, persistence, and response formatting into one method.",
        "Mistake 9: Creating circular dependencies between layers.",
        "Mistake 10: Treating the database as something the frontend should access directly."
      ]
    },

    {
      id: "when-service-layer-needed",
      title: "Do We Always Need a Service Layer?",

      paragraphs: [
        "For a very small application, a controller may technically call a repository directly. However, once application logic becomes meaningful, a service layer provides a useful boundary for business operations.",
        "The goal is not to create unnecessary layers mechanically. The goal is to keep responsibilities clear and maintainable."
      ],

      bullets: [
        "Small prototypes may have simpler structures.",
        "Production applications commonly benefit from a service layer.",
        "Services are especially useful when business rules exist.",
        "Services are useful when one operation coordinates multiple repositories.",
        "Services provide a natural place for transaction boundaries."
      ]
    },

    {
      id: "testing-layers",
      title: "Testing the Layers",

      paragraphs: [
        "Layer separation also makes testing easier because each layer can be tested according to its responsibility."
      ],

      code: {
        language: "text",
        code: `Controller Test
    |
    | Verify HTTP mapping
    | Verify status
    | Verify response
    v

Service Test
    |
    | Verify business rules
    | Verify service behavior
    v

Repository Test
    |
    | Verify persistence queries
    | Verify database interaction
    v

Database`
      },

      bullets: [
        "Controller tests focus on HTTP behavior.",
        "Service tests focus on business logic.",
        "Repository tests focus on persistence behavior.",
        "Mocks can isolate service dependencies during unit testing."
      ]
    },

    {
      id: "interview",
      title: "REST Architecture Interview Questions",

      interviewQuestions: [
        {
          question: "What is the responsibility of a controller?",
          answer:
            "The controller receives HTTP requests, handles request-related data, invokes the appropriate application logic, and returns HTTP responses."
        },
        {
          question: "What belongs in the service layer?",
          answer:
            "Application and business logic should generally be placed in the service layer."
        },
        {
          question: "What is the responsibility of a repository?",
          answer:
            "The repository handles data-access operations and communicates with the persistence layer."
        },
        {
          question: "Why should business logic not be placed directly in controllers?",
          answer:
            "Separating business logic into services improves maintainability, testability, reuse, and separation of responsibilities."
        },
        {
          question: "What is layered architecture?",
          answer:
            "Layered architecture separates an application into components with distinct responsibilities, such as controller, service, repository, and database layers."
        },
        {
          question: "What is the typical request flow in a Spring Boot REST API?",
          answer:
            "A common flow is client → embedded server and DispatcherServlet → controller → service → repository → database, followed by the result traveling back to the client."
        },
        {
          question: "Can a controller directly call a repository?",
          answer:
            "It can technically do so, but applications commonly use a service layer to keep business logic and application operations separated from HTTP handling."
        },
        {
          question: "Why use DTOs?",
          answer:
            "DTOs provide a controlled API contract, help prevent exposing internal persistence details, and allow request and response models to evolve independently from database entities."
        },
        {
          question: "What is the difference between an entity and a DTO?",
          answer:
            "An entity represents persistent data managed by the persistence layer, while a DTO is designed to transfer data across an application boundary such as a REST API."
        },
        {
          question: "Where should business validation happen?",
          answer:
            "Business validation generally belongs in the service or appropriate application/domain layer, while structural request validation can occur at the controller boundary."
        },
        {
          question: "Where should database queries be written?",
          answer:
            "Database-access logic should generally belong in the repository or data-access layer rather than in controllers."
        },
        {
          question: "Why is separation of concerns important?",
          answer:
            "It keeps each component focused, making the application easier to understand, test, maintain, and modify."
        },
        {
          question: "Where can @Transactional be used?",
          answer:
            "It is commonly placed at a service-layer method representing a business operation that should execute within a transaction."
        },
        {
          question: "What happens when an employee is not found?",
          answer:
            "The service can throw an appropriate application exception, which can then be translated by exception handling into an HTTP response such as 404 Not Found."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A React frontend sends GET /api/employees/101. Which layer receives the HTTP request first?",
          answer:
            "The controller layer handles the mapped HTTP request after Spring MVC's request-processing infrastructure selects the controller method."
        },
        {
          question:
            "Where should you check whether employee 101 exists?",
          answer:
            "The service can coordinate the operation and use the repository to retrieve the employee. The repository performs the actual data-access operation."
        },
        {
          question:
            "You need to prevent duplicate employee emails. Which layer should contain the business rule?",
          answer:
            "The service layer should generally contain the business rule, while the repository can provide the data-access operation needed to check whether the email exists."
        },
        {
          question:
            "You need to save an employee to MySQL. Which component should perform the persistence operation?",
          answer:
            "The repository layer should handle the persistence operation."
        },
        {
          question:
            "The frontend should not receive the employee's internal password field. How can you prevent it from being exposed?",
          answer:
            "Use a response DTO that contains only the fields intended for the API response instead of directly exposing the persistence entity."
        },
        {
          question:
            "An employee creation operation saves an employee and also creates an audit record. Where could the transaction boundary be placed?",
          answer:
            "The service-layer business operation is a common place for the transaction boundary so both persistence operations can participate in the same transaction when required."
        },
        {
          question:
            "Why should the controller not contain SQL queries?",
          answer:
            "SQL and persistence concerns belong in the data-access layer. Keeping them out of controllers maintains separation of responsibilities and improves testability."
        },
        {
          question:
            "A service needs data from two repositories to complete one business operation. Is that a reason to use a service?",
          answer:
            "Yes. A service can coordinate multiple repositories and apply the business rules required to complete the overall operation."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Architecture Reference",

      code: {
        language: "text",
        code: `CLIENT
React / Mobile / Postman / Another API
        |
        | HTTP
        v
CONTROLLER
@RestController
        |
        | Application call
        v
SERVICE
@Service
        |
        | Data access
        v
REPOSITORY
JpaRepository
        |
        | SQL / Persistence
        v
DATABASE
MySQL


Responsibilities:

Controller -> HTTP
Service    -> Business logic
Repository -> Data access
Database   -> Persistent storage
DTO        -> API data transfer
Entity     -> Persistent model`
      },

      bullets: [
        "Controller = HTTP boundary.",
        "Service = business/application logic.",
        "Repository = data access.",
        "Database = persistent storage.",
        "DTO = API data contract.",
        "Entity = persistence model."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "The most important idea in REST API architecture is separation of responsibilities. The controller handles HTTP, the service handles application and business logic, the repository handles data access, and the database stores persistent data."
      ],

      bullets: [
        "Client sends HTTP request.",
        "Controller receives the request.",
        "Service performs application/business logic.",
        "Repository performs data-access operations.",
        "Database stores persistent data.",
        "Response travels back to the client.",
        "Use DTOs to control API input and output.",
        "Use entities for persistence mapping.",
        "Keep controllers thin.",
        "Keep business rules in the service/application layer.",
        "Keep database access in repositories.",
        "Use exception handling to translate application failures into HTTP responses.",
        "Use transactions around appropriate business operations.",
        "Layer separation improves maintainability and testability.",
        "Do not let the frontend access the database directly.",
        "Do not put SQL queries inside controllers.",
        "Do not expose sensitive entity fields through API responses."
      ]
    }
  ]
};
