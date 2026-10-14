
export const springBootArchitecture = {
  id: "spring-boot-architecture",
  title: "Spring Boot Architecture",
  slug: "spring-boot-architecture",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "25 min",

  description:
    "Understand the basic architecture and execution flow of a Spring Boot application, including the controller, service, repository, database, Spring MVC, DispatcherServlet, and application startup flow.",

  sections: [
    {
      id: "architecture-overview",
      title: "Spring Boot Application Architecture",

      paragraphs: [
        "A typical Spring Boot backend is organized into layers. The controller handles HTTP requests, the service layer contains business logic, and the repository layer communicates with the database.",
        "This layered structure separates responsibilities so that each part of the application has a clear purpose.",
        "The exact architecture can vary depending on the application, but Controller, Service, and Repository are very common layers in Spring Boot applications."
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
Database`
      },

      bullets: [
        "Client → sends HTTP requests.",
        "Controller → handles the HTTP boundary.",
        "Service → performs application and business logic.",
        "Repository → handles persistence operations.",
        "Database → stores persistent application data."
      ]
    },

    {
      id: "architecture-components",
      title: "Main Components of a Spring Boot Backend",

      paragraphs: [
        "A real-world Spring Boot application normally contains more than just Controller, Service, and Repository.",
        "Entities represent persistent data, DTOs define API request and response models, configuration classes define application configuration, and exception handlers provide consistent error responses."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        |
        +-- Controller
        |
        +-- Service
        |
        +-- Repository
        |
        +-- Entity
        |
        +-- DTO
        |
        +-- Exception Handling
        |
        +-- Configuration
        |
        +-- Database`
      },

      bullets: [
        "Controller → HTTP request and response handling.",
        "Service → business/application logic.",
        "Repository → database access.",
        "Entity → persistence model.",
        "DTO → API data transfer model.",
        "Exception handling → consistent error responses.",
        "Configuration → application infrastructure and settings."
      ]
    },

    {
      id: "request-flow",
      title: "Request Flow",

      paragraphs: [
        "When a client sends an HTTP request, the embedded servlet container receives the request and Spring MVC routes it to the appropriate controller method.",
        "The controller usually delegates business processing to a service. The service may call a repository to access persistent data.",
        "The result then travels back through the layers and becomes an HTTP response."
      ],

      code: {
        language: "text",
        code: `Client
   ↓
HTTP Request
   ↓
Embedded Server
   ↓
DispatcherServlet
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database

Database
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
HTTP Response
   ↓
Client`
      },

      bullets: [
        "The client sends the request.",
        "The embedded server accepts the HTTP connection.",
        "DispatcherServlet coordinates Spring MVC request processing.",
        "Spring finds the matching controller method.",
        "The controller calls the service.",
        "The service performs application logic.",
        "The repository accesses the database.",
        "The result travels back to the client."
      ]
    },

    {
      id: "embedded-server",
      title: "Embedded Server",

      paragraphs: [
        "A Spring Boot web application commonly runs with an embedded servlet container such as Tomcat.",
        "The embedded server accepts HTTP connections and passes requests into the Spring web application.",
        "This allows the application to be packaged and started without requiring a separately installed servlet container in the common executable-JAR deployment model."
      ],

      code: {
        language: "text",
        code: `HTTP Client
     |
     | HTTP Request
     v
Embedded Tomcat
     |
     v
Spring MVC
     |
     v
Controller`
      },

      bullets: [
        "The server listens for HTTP requests.",
        "Tomcat is commonly used by Spring Boot applications.",
        "The embedded server starts as part of the application.",
        "The application can commonly run using java -jar."
      ]
    },

    {
      id: "dispatcher-servlet",
      title: "What is DispatcherServlet?",

      paragraphs: [
        "DispatcherServlet is the central front controller of Spring MVC.",
        "It receives incoming HTTP requests and coordinates the process of finding and invoking the appropriate handler.",
        "It works with Spring MVC infrastructure such as handler mappings and handler adapters.",
        "The controller method is not selected simply because its Java method name matches the URL. Spring uses request mappings to determine the appropriate handler."
      ],

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
DispatcherServlet
     |
     v
Find matching handler
     |
     v
Controller Method
     |
     v
Return Result
     |
     v
HTTP Response`
      },

      bullets: [
        "DispatcherServlet is part of Spring MVC.",
        "It acts as a front controller.",
        "It coordinates request processing.",
        "It helps route requests to mapped controller methods.",
        "It participates in producing the final HTTP response."
      ]
    },

    {
      id: "controller",
      title: "Controller Layer",

      paragraphs: [
        "The Controller is the HTTP-facing layer of a typical Spring Boot application.",
        "It receives requests, extracts request data, performs basic HTTP-level validation and coordination, and delegates application operations to the service layer.",
        "Controllers should generally avoid containing large amounts of business logic."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.getEmployee(id);
    }
}`
      },

      bullets: [
        "Handles HTTP requests.",
        "Maps URLs to methods.",
        "Reads path variables, query parameters, and request bodies.",
        "Returns HTTP responses.",
        "Delegates business operations to services."
      ]
    },

    {
      id: "service",
      title: "Service Layer",

      paragraphs: [
        "The Service layer contains application or business logic.",
        "It coordinates operations between controllers, repositories, external services, and other components.",
        "Keeping business logic in the service layer prevents controllers from becoming too large and difficult to maintain."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    public EmployeeResponse getEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(
                            () -> new EmployeeNotFoundException(id)
                        );

        return new EmployeeResponse(
                employee.getId(),
                employee.getName()
        );
    }
}`
      },

      bullets: [
        "Contains business/application logic.",
        "Coordinates multiple operations.",
        "Can call repositories.",
        "Can apply business rules.",
        "Can define transaction boundaries when appropriate.",
        "Should not normally depend on HTTP-specific details."
      ]
    },

    {
      id: "repository",
      title: "Repository Layer",

      paragraphs: [
        "The Repository layer is responsible for persistence operations.",
        "In Spring Data JPA applications, repositories provide an abstraction over database access.",
        "The service layer can use repositories without needing to manually write SQL for every basic CRUD operation."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      bullets: [
        "Handles persistence operations.",
        "Works with Spring Data JPA in JPA-based applications.",
        "Provides common CRUD operations.",
        "Can define derived query methods or custom queries.",
        "Keeps database access separate from business logic."
      ]
    },

    {
      id: "database",
      title: "Database Layer",

      paragraphs: [
        "The database stores persistent application data.",
        "A Spring Boot application can communicate with databases such as MySQL, PostgreSQL, and other supported database systems through appropriate drivers and data-access technologies."
      ],

      code: {
        language: "text",
        code: `Repository
    |
    | SQL / JPA operations
    v
Database

Employee Table

id | name  | department
---|-------|------------
101| Rahul | Engineering
102| Priya | HR`
      },

      bullets: [
        "Stores persistent data.",
        "Provides data after repository operations.",
        "The application can use JPA, JDBC, or other data-access technologies.",
        "Database design is separate from controller design."
      ]
    },

    {
      id: "entity",
      title: "Entity Layer",

      paragraphs: [
        "In a JPA-based application, an entity represents persistent data that is mapped to a database table or another persistence structure.",
        "Entities belong primarily to the persistence model and do not necessarily need to be the same objects exposed by the REST API."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String department;
}`
      },

      bullets: [
        "@Entity identifies a JPA entity.",
        "@Id identifies the primary key.",
        "Entity fields can be mapped to database columns.",
        "Entities represent persistence data."
      ]
    },

    {
      id: "dto",
      title: "DTO Layer",

      paragraphs: [
        "DTO stands for Data Transfer Object.",
        "DTOs are commonly used to define the data that enters or leaves the API.",
        "Using DTOs allows the API contract to remain separate from the database entity model."
      ],

      code: {
        language: "java",
        code: `public record EmployeeResponse(
        Long id,
        String name,
        String department
) {
}`
      },

      bullets: [
        "DTOs define API input or output models.",
        "DTOs can prevent accidental exposure of internal fields.",
        "Request and response DTOs can have different structures.",
        "DTOs reduce coupling between persistence and API contracts."
      ]
    },

    {
      id: "dependency-flow",
      title: "Dependency Flow Between Layers",

      paragraphs: [
        "A common dependency direction is Controller → Service → Repository.",
        "The controller should normally not directly perform database operations when a service layer is being used for the application's business operations."
      ],

      code: {
        language: "text",
        code: `EmployeeController
       |
       | calls
       v
EmployeeService
       |
       | calls
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
        "Repository accesses persistence.",
        "This direction keeps responsibilities separated."
      ]
    },

    {
      id: "complete-flow",
      title: "Complete Spring Boot Request Flow",

      paragraphs: [
        "The following flow combines the web layer, application layer, persistence layer, and database."
      ],

      code: {
        language: "text",
        code: `React / Browser / Postman
            |
            | HTTP Request
            v
      Embedded Tomcat
            |
            v
      DispatcherServlet
            |
            v
       Controller
            |
            v
         Service
            |
            v
       Repository
            |
            v
         Database
            |
            | Data
            v
       Repository
            |
            v
         Service
            |
            v
       Controller
            |
            v
      HTTP Response
            |
            v
React / Browser / Postman`
      },

      bullets: [
        "Client sends an HTTP request.",
        "Embedded server accepts the request.",
        "DispatcherServlet coordinates Spring MVC processing.",
        "Controller receives the mapped request.",
        "Service performs application logic.",
        "Repository performs persistence operations.",
        "Database returns data.",
        "The response is returned to the client."
      ]
    },

    {
      id: "main-class",
      title: "Main Application Class",

      paragraphs: [
        "The main application class is the entry point of the Spring Boot application.",
        "SpringApplication.run() bootstraps the application and creates the application context."
      ],

      code: {
        language: "java",
        code: `@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(
                Application.class,
                args
        );
    }
}`
      },

      bullets: [
        "@SpringBootApplication provides important Spring Boot application configuration behavior.",
        "The main() method is the Java entry point.",
        "SpringApplication.run() starts the Spring application."
      ]
    },

    {
      id: "application-context",
      title: "Spring ApplicationContext",

      paragraphs: [
        "The ApplicationContext is the Spring container that manages application beans and provides dependency injection and other Spring infrastructure.",
        "When the application starts, Spring creates the application context and initializes the required beans."
      ],

      code: {
        language: "text",
        code: `Spring Boot Startup
        |
        v
ApplicationContext
        |
        +-- Controller Bean
        |
        +-- Service Bean
        |
        +-- Repository Bean
        |
        +-- Other Beans
        |
        v
Application Ready`
      },

      bullets: [
        "ApplicationContext is a Spring IoC container.",
        "It creates and manages Spring beans.",
        "It supports dependency injection.",
        "It manages application configuration and lifecycle infrastructure."
      ]
    },

    {
      id: "dependency-injection",
      title: "Dependency Injection in the Architecture",

      paragraphs: [
        "Spring uses dependency injection to provide required objects to application components.",
        "For example, an EmployeeController can receive an EmployeeService through constructor injection."
      ],

      code: {
        language: "java",
        code: `@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(
            EmployeeService employeeService
    ) {
        this.employeeService = employeeService;
    }
}`
      },

      bullets: [
        "Spring creates the required beans.",
        "Spring provides dependencies to dependent components.",
        "Constructor injection makes dependencies explicit.",
        "Dependency injection reduces manual object creation and coupling."
      ]
    },

    {
      id: "validation-flow",
      title: "Validation Flow",

      paragraphs: [
        "Validation is commonly performed at the API boundary before business processing continues.",
        "For example, a REST controller can use @Valid with a request DTO."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | Invalid JSON/data
   v
Controller
   |
   v
Validation
   |
   +---- Invalid ----> Error Response
   |
   +---- Valid
          |
          v
       Service
          |
          v
      Repository`
      },

      bullets: [
        "Invalid input should be rejected early.",
        "Valid requests continue to the service layer.",
        "Validation errors should produce a clear client response.",
        "Business rules can still require additional validation in the service/domain layer."
      ]
    },

    {
      id: "exception-flow",
      title: "Exception Handling Flow",

      paragraphs: [
        "When an exception occurs during request processing, Spring can route it to appropriate exception-handling mechanisms.",
        "A global exception handler can convert application exceptions into consistent REST error responses."
      ],

      code: {
        language: "text",
        code: `Client
   |
   v
Controller
   |
   v
Service
   |
   | EmployeeNotFoundException
   v
Global Exception Handler
   |
   v
404 Not Found
   |
   v
Client`
      },

      bullets: [
        "Service can throw application-specific exceptions.",
        "Global exception handling can translate exceptions into HTTP responses.",
        "Clients should receive safe and predictable error structures.",
        "Internal stack traces and sensitive details should not normally be exposed."
      ]
    },

    {
      id: "transaction-boundary",
      title: "Transaction Boundary",

      paragraphs: [
        "In database-backed applications, transactions are commonly placed around business operations that must succeed or fail as one unit.",
        "The service layer is often a suitable place for transaction boundaries because it represents an application operation."
      ],

      code: {
        language: "java",
        code: `@Service
public class TransferService {

    @Transactional
    public void transferMoney(
            Long fromId,
            Long toId,
            BigDecimal amount
    ) {

        // debit source account

        // credit destination account

    }
}`
      },

      bullets: [
        "A transaction groups related database operations.",
        "The service layer commonly represents the business operation boundary.",
        "The exact transaction design depends on the application's requirements."
      ]
    },

    {
      id: "good-vs-bad",
      title: "Good vs Bad Architecture",

      paragraphs: [
        "Separating responsibilities makes applications easier to understand and maintain."
      ],

      code: {
        language: "text",
        code: `BAD

Controller
   |
   +-- Business Logic
   +-- SQL
   +-- Validation
   +-- Database Operations
   +-- Response Formatting


BETTER

Controller
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
        "Avoid putting database logic directly in controllers.",
        "Avoid putting large business rules directly in controllers.",
        "Keep persistence operations in repositories.",
        "Keep application/business logic in appropriate service/domain components."
      ]
    },

    {
      id: "application-startup-flow",
      title: "Spring Boot Startup Architecture",

      paragraphs: [
        "The architecture is not only about request processing. Spring Boot also has a startup lifecycle that prepares the application before it accepts normal requests."
      ],

      code: {
        language: "text",
        code: `main()
  |
  v
SpringApplication.run()
  |
  v
Create ApplicationContext
  |
  v
Load Configuration
  |
  v
Apply Auto-Configuration
  |
  v
Component Scanning
  |
  v
Create and Initialize Beans
  |
  v
Start Web Server
  |
  v
Application Ready
  |
  v
Accept HTTP Requests`
      },

      bullets: [
        "main() starts the Java process.",
        "SpringApplication.run() bootstraps Spring Boot.",
        "The application context is created.",
        "Configuration and auto-configuration are processed.",
        "Components are discovered and initialized.",
        "The web server starts for a web application.",
        "The application becomes ready to receive requests."
      ]
    },

    {
      id: "layer-responsibilities",
      title: "Layer Responsibilities — Easy to Remember",

      code: {
        language: "text",
        code: `Controller
"What HTTP request came in?"


Service
"What should the application do?"


Repository
"How do I access the stored data?"


Database
"Where is the persistent data stored?"`
      },

      bullets: [
        "Controller → HTTP responsibility.",
        "Service → business/application responsibility.",
        "Repository → persistence responsibility.",
        "Database → data storage responsibility."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Architecture Mistakes",

      paragraphs: [
        "Layered architecture is useful, but simply creating packages named controller, service, and repository does not automatically create good architecture."
      ],

      bullets: [
        "Putting business logic directly in controllers.",
        "Calling repositories directly from controllers for every operation without considering application boundaries.",
        "Putting HTTP-specific objects into deep business logic without a good reason.",
        "Returning database entities directly when DTOs are required for a stable API contract.",
        "Creating services with no meaningful responsibility just to follow a package structure.",
        "Putting SQL and persistence logic into controllers.",
        "Making one huge service class responsible for unrelated business areas.",
        "Ignoring validation and exception handling.",
        "Creating circular dependencies between layers.",
        "Assuming every application must have exactly the same number of layers."
      ]
    },

    {
      id: "testing-layers",
      title: "Testing Different Layers",

      paragraphs: [
        "Different layers can be tested at different levels.",
        "This makes failures easier to isolate and helps keep tests focused."
      ],

      code: {
        language: "text",
        code: `Controller Test
      ↓
HTTP behavior / request mapping


Service Test
      ↓
Business logic


Repository Test
      ↓
Database interaction


Integration Test
      ↓
Multiple components working together`
      },

      bullets: [
        "Controller tests can verify HTTP behavior.",
        "Service tests can verify business rules.",
        "Repository tests can verify persistence behavior.",
        "Integration tests can verify multiple layers together."
      ]
    },

    {
      id: "interview",
      title: "Architecture Interview Questions",

      interviewQuestions: [
        {
          question: "What is the typical layered architecture of a Spring Boot application?",
          answer:
            "A common structure contains Controller, Service, Repository, and Database layers. Applications may also use DTOs, entities, configuration components, and exception handling."
        },
        {
          question: "What is the responsibility of the Controller?",
          answer:
            "The controller handles HTTP requests and responses and delegates application operations to the service layer."
        },
        {
          question: "What is the responsibility of the Service layer?",
          answer:
            "The service layer contains application or business logic and coordinates operations between controllers, repositories, and other application components."
        },
        {
          question: "What is the responsibility of the Repository layer?",
          answer:
            "The repository layer handles persistence operations and communication with the database."
        },
        {
          question: "What is DispatcherServlet?",
          answer:
            "DispatcherServlet is the central front controller of Spring MVC. It receives requests and coordinates finding and invoking the appropriate request handler."
        },
        {
          question: "What is the ApplicationContext?",
          answer:
            "ApplicationContext is a Spring IoC container that manages application beans, dependency injection, configuration, and related application infrastructure."
        },
        {
          question: "Why do we use a service layer?",
          answer:
            "The service layer provides a place for application and business logic and helps keep controllers focused on HTTP concerns and repositories focused on persistence."
        },
        {
          question: "Why should a controller not contain business logic?",
          answer:
            "Large amounts of business logic in controllers make them difficult to test, reuse, and maintain. A service or appropriate application/domain layer provides better separation of responsibilities."
        },
        {
          question: "What is dependency injection?",
          answer:
            "Dependency injection is a technique where an object receives its required dependencies from the Spring container rather than creating them manually."
        },
        {
          question: "Why is constructor injection commonly preferred?",
          answer:
            "Constructor injection makes required dependencies explicit, supports immutable dependency references, and makes classes easier to test."
        },
        {
          question: "What is the role of an entity?",
          answer:
            "In a JPA application, an entity represents persistent data and is mapped to a database structure."
        },
        {
          question: "What is a DTO?",
          answer:
            "A DTO, or Data Transfer Object, represents data transferred between application boundaries, such as API requests and responses."
        },
        {
          question: "Why use DTOs instead of returning entities directly?",
          answer:
            "DTOs allow the API contract to be separated from the persistence model and provide control over which fields are exposed."
        },
        {
          question: "What happens when a client sends a REST request?",
          answer:
            "The embedded web server receives it, Spring MVC processes it through DispatcherServlet and request mappings, the controller handles the request, the service performs application logic, and the repository may access the database before the response is returned."
        },
        {
          question: "Where is transaction management commonly placed?",
          answer:
            "Transaction boundaries are commonly placed around service-level business operations, although the correct boundary depends on the application's design."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Architecture Interview Questions",

      interviewQuestions: [
        {
          question:
            "A controller is 500 lines long and contains database queries and business rules. What would you do?",
          answer:
            "I would separate responsibilities by moving persistence operations into repositories and business/application logic into appropriate service components, keeping the controller focused on HTTP concerns."
        },
        {
          question:
            "Why does a request pass through DispatcherServlet before reaching the controller?",
          answer:
            "DispatcherServlet is Spring MVC's front controller. It coordinates request processing and uses Spring MVC infrastructure to identify the appropriate handler method."
        },
        {
          question:
            "React calls GET /api/employees/101. Explain the complete flow.",
          answer:
            "React sends the HTTP request to the Spring Boot application. The embedded server receives it, DispatcherServlet coordinates Spring MVC processing, the matching controller method executes, the service retrieves the employee through the repository, and the resulting representation is returned as an HTTP response."
        },
        {
          question:
            "Why should the repository not contain business logic?",
          answer:
            "The repository should focus on persistence operations. Business rules belong in the service or appropriate domain/application layer so persistence and business responsibilities remain separated."
        },
        {
          question:
            "Can a Spring Boot application have only Controller and Repository without Service?",
          answer:
            "Technically yes. For very simple applications, a service layer may not add much value. However, service boundaries are often useful when application or business logic becomes significant."
        },
        {
          question:
            "Why can a layered architecture make testing easier?",
          answer:
            "Each layer can have focused responsibilities, allowing controller behavior, business logic, and persistence behavior to be tested separately or together depending on the test type."
        },
        {
          question:
            "A controller needs EmployeeService. Who creates EmployeeService?",
          answer:
            "If EmployeeService is registered as a Spring bean, the Spring container creates and manages it and can inject it into the controller."
        },
        {
          question:
            "Why is the main application class commonly placed above controller and service packages?",
          answer:
            "Spring Boot's default component scanning starts from the main application's package and scans subpackages, making the application's components discoverable."
        },
        {
          question:
            "Where would you handle EmployeeNotFoundException?",
          answer:
            "The exception can be handled by an appropriate exception-handling mechanism such as a global @RestControllerAdvice so that the application returns a consistent HTTP error response."
        },
        {
          question:
            "Why should database entities and API DTOs not always be the same class?",
          answer:
            "They serve different purposes. Entities represent persistence, while DTOs represent API contracts. Keeping them separate can reduce coupling and control what the API exposes."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Architecture Reference",

      code: {
        language: "text",
        code: `REQUEST FLOW

Client
  ↓
Embedded Server
  ↓
DispatcherServlet
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database


RESPONSE FLOW

Database
  ↓
Repository
  ↓
Service
  ↓
Controller
  ↓
HTTP Response
  ↓
Client


RESPONSIBILITIES

Controller
→ HTTP

Service
→ Business/Application Logic

Repository
→ Persistence

Database
→ Persistent Data`
      },

      bullets: [
        "Controller → HTTP layer.",
        "Service → application/business layer.",
        "Repository → persistence layer.",
        "Entity → persistence model.",
        "DTO → API data-transfer model.",
        "DispatcherServlet → Spring MVC front controller.",
        "ApplicationContext → Spring container."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "A typical Spring Boot application separates responsibilities into layers. The client sends an HTTP request, the embedded server receives it, DispatcherServlet coordinates Spring MVC processing, and the request reaches the appropriate controller. The controller delegates application work to the service, which can use a repository to access the database. The result then travels back to the client as an HTTP response."
      ],

      bullets: [
        "Controller handles HTTP concerns.",
        "Service handles application and business logic.",
        "Repository handles persistence.",
        "Database stores persistent data.",
        "Entity represents persistent data in JPA.",
        "DTO represents data transferred across application boundaries.",
        "DispatcherServlet is the Spring MVC front controller.",
        "ApplicationContext manages Spring beans.",
        "Dependency injection provides required dependencies.",
        "Constructor injection makes required dependencies explicit.",
        "Validation can happen at the API boundary.",
        "Global exception handling can provide consistent error responses.",
        "Transactions commonly surround service-level business operations.",
        "Layered architecture improves separation of responsibilities.",
        "A package structure alone does not guarantee good architecture.",
        "Small applications may not need every possible layer.",
        "Keep controllers thin and focused on HTTP concerns.",
        "Keep repositories focused on persistence."
      ]
    }
  ]
};
