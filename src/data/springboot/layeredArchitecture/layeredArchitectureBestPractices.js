
export const layeredArchitectureBestPractices = {
  id: "layered-architecture-best-practices",
  title: "Layered Architecture Best Practices",
  slug: "layered-architecture-best-practices",
  topicTitle: "Spring Boot Layered Architecture",
  estimatedTime: "35 min",

  description:
    "Learn practical design rules for building maintainable Spring Boot applications using controllers, services, repositories, entities, DTOs, dependency injection, validation, transactions, exception handling, security, and testing.",

  sections: [
    {
      id: "thin-controller",
      title: "1. Keep Controllers Thin",

      paragraphs: [
        "Controllers should primarily deal with HTTP concerns.",
        "They should receive requests, extract request data, invoke the appropriate application or service operation, and return an HTTP response.",
        "If a controller contains hundreds of lines of business logic, database operations, and complex calculations, the responsibilities are probably not separated well.",
        "A thin controller is easier to understand and easier to test."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> create(
        @Valid
        @RequestBody
        EmployeeCreateRequest request) {

    EmployeeResponse response =
            service.create(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      },

      bullets: [
        "Handle HTTP-specific concerns in the controller.",
        "Use DTOs for request and response data.",
        "Delegate business operations to the service layer.",
        "Avoid direct database logic in controllers.",
        "Avoid large if/else business workflows inside controllers."
      ]
    },

    {
      id: "controller-responsibilities",
      title: "What Should a Controller Do?",

      paragraphs: [
        "A controller should coordinate the HTTP boundary rather than become the application's business engine.",
        "It can handle request mapping, request parameters, request bodies, validation triggering, response status codes, and delegation to application services."
      ],

      code: {
        language: "text",
        code: `Controller responsibilities

HTTP method mapping
       ↓
Path variables
       ↓
Query parameters
       ↓
Request body
       ↓
Validation boundary
       ↓
Service invocation
       ↓
HTTP response`
      },

      bullets: [
        "Map URLs to methods.",
        "Read path variables and query parameters.",
        "Receive request DTOs.",
        "Return response DTOs.",
        "Choose appropriate HTTP response status codes.",
        "Delegate application work."
      ]
    },

    {
      id: "business-service",
      title: "2. Keep Business Logic in the Appropriate Layer",

      paragraphs: [
        "Business rules should normally live in the service or domain layer rather than being duplicated across controllers.",
        "This allows the same rule to be reused when the operation is triggered from different entry points.",
        "For example, an employee creation rule should not exist separately in a REST controller and a scheduled job.",
        "The exact location of a rule depends on whether it is application orchestration or domain behavior."
      ],

      code: {
        language: "text",
        code: `REST Controller
      ↓
     Service
      ↑
Scheduled Job

Same business operation
      ↓
One place for the rule`
      }
    },

    {
      id: "service-responsibilities",
      title: "What Should a Service Do?",

      paragraphs: [
        "The service layer commonly coordinates application use cases.",
        "It can combine repository operations, apply business rules, coordinate external services, define transaction boundaries, and convert between DTOs and entities."
      ],

      code: {
        language: "text",
        code: `Service

Request
  ↓
Validate application rules
  ↓
Load required data
  ↓
Apply business rules
  ↓
Change state
  ↓
Persist
  ↓
Return result`
      },

      bullets: [
        "Coordinate application operations.",
        "Apply business rules.",
        "Coordinate multiple repositories when required.",
        "Coordinate external services when required.",
        "Define transaction boundaries where appropriate.",
        "Return application-level results."
      ]
    },

    {
      id: "repository-focus",
      title: "3. Keep Repositories Focused on Data Access",

      paragraphs: [
        "Repositories should provide persistence operations rather than becoming the location for unrelated business workflows.",
        "A repository can expose useful queries, while the service decides how those results are used by the application.",
        "Spring Data JPA repositories are particularly useful for CRUD operations and query methods."
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
}`
      },

      bullets: [
        "Repository → data access.",
        "Service → business/application logic.",
        "Controller → HTTP handling.",
        "Avoid placing large business workflows inside repositories."
      ]
    },

    {
      id: "repository-business-logic",
      title: "Avoid Business Logic Inside Repositories",

      paragraphs: [
        "A repository can contain queries that retrieve or modify data, but it should not normally decide the complete business workflow.",
        "For example, checking whether an employee exists can be a repository operation, while deciding whether that employee is allowed to perform a business operation belongs elsewhere."
      ],

      code: {
        language: "text",
        code: `Good

Service
  ↓
Repository
  ↓
Database


Avoid

Controller
  ↓
Repository
  ↓
Business decisions
  ↓
More repository calls
  ↓
Complex workflow`
      }
    },

    {
      id: "dto-boundary",
      title: "4. Use DTOs at API Boundaries",

      paragraphs: [
        "DTOs allow the external API contract to remain separate from the persistence model.",
        "This becomes especially useful when database entities contain internal fields, relationships, audit data, or structures that should not be exposed directly.",
        "Request DTOs represent client input, while response DTOs represent data intentionally returned by the API."
      ],

      code: {
        language: "text",
        code: `HTTP
 ↓
Request DTO
 ↓
Service
 ↓
Entity
 ↓
Repository
 ↓
Database


Database
 ↓
Entity
 ↓
Service
 ↓
Response DTO
 ↓
HTTP`
      }
    },

    {
      id: "dto-security",
      title: "DTOs and Data Exposure",

      paragraphs: [
        "DTOs provide explicit control over API representation.",
        "For example, a User entity may contain a password hash, internal status, audit information, or other fields that should not be returned to a client.",
        "A response DTO can expose only the fields required by the API."
      ],

      code: {
        language: "java",
        code: `public record UserResponse(
        Long id,
        String name,
        String email
) {
}

// passwordHash is intentionally absent.`
      },

      bullets: [
        "Do not expose password hashes.",
        "Do not expose internal fields unnecessarily.",
        "Do not rely on frontend code to hide sensitive data.",
        "Use backend DTOs to define the intended response."
      ]
    },

    {
      id: "constructor-injection",
      title: "5. Prefer Constructor Injection",

      paragraphs: [
        "Constructor injection makes required dependencies explicit.",
        "It also makes classes easier to unit test because dependencies can be supplied directly when creating the object.",
        "With a single constructor, Spring can inject the dependency without requiring @Autowired on that constructor."
      ],

      code: {
        language: "java",
        code: `private final EmployeeService service;

public EmployeeController(
        EmployeeService service) {

    this.service = service;
}`
      },

      bullets: [
        "Dependencies are explicit.",
        "Fields can be final.",
        "Objects are easier to construct in unit tests.",
        "Required dependencies cannot be forgotten after construction.",
        "Constructor injection is generally preferred over field injection."
      ]
    },

    {
      id: "dependency-direction",
      title: "6. Keep Dependency Direction Clear",

      paragraphs: [
        "A layered architecture works best when dependencies move in a predictable direction.",
        "A common Spring Boot structure has controllers depending on services and services depending on repositories.",
        "The exact dependency direction can vary in more advanced architectures, but uncontrolled circular dependencies should be avoided."
      ],

      code: {
        language: "text",
        code: `Controller
    ↓
Service
    ↓
Repository
    ↓
Database

DTO → API boundary
Entity → Persistence/domain model`
      },

      bullets: [
        "Controller should not become dependent on database implementation details.",
        "Service should not depend on HTTP-specific controller behavior.",
        "Repository should focus on persistence.",
        "Avoid circular dependencies between application components."
      ]
    },

    {
      id: "single-responsibility",
      title: "7. Follow Single Responsibility",

      paragraphs: [
        "Each class should have a clear responsibility.",
        "This does not mean every class can only have one method. It means the class should have a coherent reason to change.",
        "A controller should not simultaneously act as a repository, service, mapper, validator, and security component."
      ],

      code: {
        language: "text",
        code: `Controller
→ HTTP-related changes

Service
→ Business/application changes

Repository
→ Data-access changes

DTO
→ API data-contract changes

Entity
→ Persistence/domain-model changes

Mapper
→ Conversion changes`
      }
    },

    {
      id: "avoid-god-class",
      title: "Avoid God Classes",

      paragraphs: [
        "A God class is a class that has accumulated too many unrelated responsibilities.",
        "For example, an EmployeeController that performs validation, database queries, email sending, PDF generation, calculations, and security decisions becomes difficult to maintain.",
        "Splitting responsibilities into focused components improves maintainability."
      ],

      code: {
        language: "text",
        code: `Avoid

EmployeeController
 ├── Database logic
 ├── Business rules
 ├── Email sending
 ├── PDF generation
 ├── Validation
 └── Security logic


Prefer

Controller
   ↓
Service
   ├── Repository
   ├── EmailService
   └── PdfService`
      }
    },

    {
      id: "avoid-overengineering",
      title: "8. Avoid Unnecessary Layers",

      paragraphs: [
        "Layered architecture does not mean creating interfaces, classes, wrappers, and packages that provide no meaningful separation.",
        "A small application does not necessarily need the same architecture as a large enterprise system.",
        "Introduce abstractions when they provide a real benefit such as separation, replaceability, testability, or domain clarity."
      ],

      code: {
        language: "text",
        code: `Over-engineered

Controller
 ↓
Facade
 ↓
Manager
 ↓
Helper
 ↓
Adapter
 ↓
Service
 ↓
Repository


Simple application

Controller
 ↓
Service
 ↓
Repository`
      },

      bullets: [
        "Do not create interfaces only because every class supposedly needs one.",
        "Do not create wrappers that add no behavior.",
        "Add abstractions when there is a real design reason.",
        "Let application complexity determine architectural complexity."
      ]
    },

    {
      id: "package-structure",
      title: "9. Keep Package Structure Understandable",

      code: {
        language: "text",
        code: `employee
├── controller
├── service
├── repository
├── entity
└── dto`
      },

      paragraphs: [
        "A clear package structure helps developers quickly find classes and understand application responsibilities.",
        "For larger applications, packages can also be organized around business features rather than only technical layers."
      ]
    },

    {
      id: "feature-package-structure",
      title: "Feature-Based Package Structure",

      paragraphs: [
        "A feature-based package structure groups related classes around a business capability.",
        "This can become useful as a large application grows because everything related to a feature can be located together."
      ],

      code: {
        language: "text",
        code: `com.example.application

employee
├── EmployeeController
├── EmployeeService
├── EmployeeRepository
├── Employee
├── EmployeeCreateRequest
└── EmployeeResponse

department
├── DepartmentController
├── DepartmentService
├── DepartmentRepository
└── Department`
      },

      bullets: [
        "Layer-based packages can work well for smaller applications.",
        "Feature-based packages can improve modularity in larger applications.",
        "Choose the structure that makes the codebase easier to navigate."
      ]
    },

    {
      id: "avoid-entity-exposure",
      title: "10. Avoid Unnecessary Entity Exposure",

      paragraphs: [
        "Returning entities directly from every endpoint can tightly couple the API contract to persistence structures.",
        "DTOs provide a controlled representation of data intended for API clients.",
        "This is particularly important when entities contain sensitive fields or complex relationships."
      ],

      code: {
        language: "text",
        code: `Avoid as a default

Controller
   ↓
Entity
   ↓
JSON


Prefer

Controller
   ↓
Response DTO
   ↓
JSON`
      }
    },

    {
      id: "validation-boundary",
      title: "11. Validate at the API Boundary",

      paragraphs: [
        "Incoming API data should be validated before it reaches deeper application logic.",
        "Request DTOs are a common place for Bean Validation constraints.",
        "Validation should not be confused with business rules. A value can be syntactically valid while still violating a business rule."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

        @NotBlank
        String name,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String department
) {
}`
      },

      bullets: [
        "DTO validation → input constraints.",
        "Service/domain rules → business constraints.",
        "Database constraints → persistence integrity."
      ]
    },

    {
      id: "exception-boundary",
      title: "12. Centralize Exception Handling",

      paragraphs: [
        "Controllers should not contain repetitive try/catch blocks for every possible application exception.",
        "A global exception handler can translate application exceptions into consistent HTTP error responses."
      ],

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            EmployeeNotFoundException.class
    )
    public ResponseEntity<ErrorResponse> handle(
            EmployeeNotFoundException ex) {

        ErrorResponse response =
                new ErrorResponse(
                        404,
                        ex.getMessage()
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}`
      }
    },

    {
      id: "transaction-boundary",
      title: "13. Put Transaction Boundaries in the Appropriate Layer",

      paragraphs: [
        "Transactions usually belong around application operations rather than individual HTTP controller methods or repository methods by default.",
        "The service layer is commonly a suitable place to define a transaction boundary because it represents an application operation."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transfer(
        Long sourceId,
        Long targetId,
        BigDecimal amount) {

    Account source =
            repository.findById(sourceId)
                      .orElseThrow();

    Account target =
            repository.findById(targetId)
                      .orElseThrow();

    source.debit(amount);
    target.credit(amount);
}`
      },

      bullets: [
        "Define transactions around meaningful application operations.",
        "Keep transaction scope as small as practical.",
        "Do not assume every method requires @Transactional.",
        "Understand propagation and rollback behavior."
      ]
    },

    {
      id: "security-boundary",
      title: "14. Keep Security at the Security Boundary",

      paragraphs: [
        "Authentication and authorization should not be implemented as scattered checks inside every controller.",
        "Spring Security can handle authentication and request authorization, while method security can protect specific application operations.",
        "Business ownership checks may still belong in the service or domain layer."
      ],

      code: {
        language: "java",
        code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteEmployee(Long id) {

    repository.deleteById(id);
}`
      },

      bullets: [
        "Spring Security handles authentication and authorization mechanisms.",
        "URL security can protect endpoint access.",
        "Method security can protect application operations.",
        "Resource ownership rules may require business-layer checks."
      ]
    },

    {
      id: "logging",
      title: "15. Keep Logging Useful and Appropriate",

      paragraphs: [
        "Logging should help diagnose application behavior without exposing sensitive information.",
        "Do not log passwords, tokens, authorization headers, or other secrets.",
        "Prefer structured and meaningful logs over large amounts of arbitrary output."
      ],

      code: {
        language: "java",
        code: `log.info(
    "Creating employee with email={}",
    request.email()
);`
      },

      bullets: [
        "Do not log passwords.",
        "Do not log JWT tokens.",
        "Do not log sensitive personal information unnecessarily.",
        "Include identifiers that help diagnose a request when appropriate.",
        "Use suitable log levels."
      ]
    },

    {
      id: "external-services",
      title: "16. Isolate External Service Calls",

      paragraphs: [
        "Calls to email services, payment systems, third-party APIs, cloud storage, or other external systems should not normally be scattered throughout controllers.",
        "A dedicated client or service abstraction can isolate external integration details."
      ],

      code: {
        language: "text",
        code: `Controller
    ↓
Application Service
    ↓
EmailService
    ↓
EmailProvider


Controller
    ↓
Application Service
    ↓
PaymentService
    ↓
PaymentProvider`
      },

      bullets: [
        "Keep external integration code isolated.",
        "Make external dependencies easy to mock in tests.",
        "Avoid mixing HTTP handling with third-party API implementation."
      ]
    },

    {
      id: "testing-layers",
      title: "17. Design Layers for Testability",

      paragraphs: [
        "Clear responsibilities make it easier to test each layer independently.",
        "Service unit tests can mock repositories and external dependencies.",
        "Controller tests can use MockMvc.",
        "Repository tests can use DataJpaTest or another appropriate integration setup."
      ],

      code: {
        language: "text",
        code: `Controller
   ↓
@WebMvcTest

Service
   ↓
JUnit + Mockito

Repository
   ↓
@DataJpaTest

Complete application
   ↓
@SpringBootTest`
      },

      bullets: [
        "Do not start the entire Spring context for every simple service unit test.",
        "Mock dependencies at the appropriate boundary.",
        "Use integration tests when actual framework or database behavior matters."
      ]
    },

    {
      id: "avoid-duplicate-logic",
      title: "18. Avoid Duplicating Business Rules",

      paragraphs: [
        "If the same business rule appears in multiple controllers or services, future changes can easily make the application inconsistent.",
        "Centralize shared rules in an appropriate service or domain component."
      ],

      code: {
        language: "text",
        code: `Bad

Controller A
  └── 10% discount rule

Controller B
  └── 10% discount rule

Scheduled Job
  └── 10% discount rule


Better

DiscountPolicy
  ↓
Used by required application operations`
      }
    },

    {
      id: "avoid-circular-dependencies",
      title: "19. Avoid Circular Dependencies",

      paragraphs: [
        "A circular dependency occurs when components directly or indirectly depend on each other.",
        "For example, EmployeeService depending on DepartmentService while DepartmentService depends on EmployeeService can create unnecessary coupling and may cause Spring bean creation problems.",
        "Redesigning responsibilities is usually better than trying to hide the cycle with framework configuration."
      ],

      code: {
        language: "text",
        code: `Problem

EmployeeService
      ↓
DepartmentService
      ↓
EmployeeService


Better

EmployeeService
      ↓
Domain/Application Component
      ↑
DepartmentService`
      }
    },

    {
      id: "database-access-boundary",
      title: "20. Keep Database Access Behind Repositories",

      paragraphs: [
        "Application code should normally interact with the database through a persistence abstraction such as a Spring Data repository.",
        "This keeps persistence details out of controllers and most application orchestration code."
      ],

      code: {
        language: "text",
        code: `Controller
      ↓
Service
      ↓
Repository
      ↓
JPA / Hibernate
      ↓
Database`
      },

      bullets: [
        "Avoid JDBC code directly inside controllers.",
        "Avoid database queries scattered across unrelated classes.",
        "Keep persistence logic close to the repository boundary."
      ]
    },

    {
      id: "service-transaction-combination",
      title: "21. Combine Service, Transaction, and Repository Correctly",

      paragraphs: [
        "A common Spring Boot flow is for the service to define an application operation, the transaction to protect that operation, and repositories to perform the required persistence operations."
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
    public EmployeeResponse updateDepartment(
            Long id,
            String department) {

        Employee employee =
                repository.findById(id)
                          .orElseThrow();

        employee.changeDepartment(department);

        return toResponse(employee);
    }

    private EmployeeResponse toResponse(
            Employee employee) {

        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment()
        );
    }
}`
      }
    },

    {
      id: "flow-summary",
      title: "22. Remember the Responsibility Flow",

      code: {
        language: "text",
        code: `Controller
"What HTTP request did I receive?"

        ↓

Service
"What should the application do?"

        ↓

Repository
"How should I access the data?"

        ↓

Entity
"What does the persisted model look like?"

        ↓

Database
"Where is the data stored?"`
      },

      paragraphs: [
        "This is a useful mental model for understanding a typical layered Spring Boot application."
      ]
    },

    {
      id: "production-flow",
      title: "23. Industry-Oriented Flow",

      paragraphs: [
        "As the CodeForge backend grows, the same basic separation can be extended with validation, exception handling, transactions, security, logging, external service clients, and other infrastructure concerns.",
        "The goal is not to create the maximum number of layers. The goal is to keep responsibilities clear and dependencies manageable."
      ],

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
Authentication / Authorization
   ↓
Service
   ↓
Business Rules
   ↓
Transaction
   ↓
Repository
   ↓
Database

Database
   ↓
Entity
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
      id: "complete-crud-flow",
      title: "24. Complete CRUD Architecture Flow",

      code: {
        language: "text",
        code: `CREATE

Client
 ↓
POST Controller
 ↓
Request DTO
 ↓
Validation
 ↓
Service
 ↓
Entity
 ↓
Repository
 ↓
Database


READ

Client
 ↓
GET Controller
 ↓
Service
 ↓
Repository
 ↓
Entity
 ↓
Response DTO
 ↓
Client


UPDATE

Client
 ↓
PUT/PATCH Controller
 ↓
Request DTO
 ↓
Validation
 ↓
Service
 ↓
Managed Entity
 ↓
Dirty Checking / Save
 ↓
Database


DELETE

Client
 ↓
DELETE Controller
 ↓
Service
 ↓
Repository
 ↓
Database`
      }
    },

    {
      id: "layer-responsibility-table",
      title: "25. Layer Responsibility Summary",

      code: {
        language: "text",
        code: `Layer          Main Responsibility
------------------------------------------------
Controller      HTTP / REST boundary

DTO             API data contract

Service         Application/business logic

Repository      Data access

Entity          Persistence/domain state

Database        Durable data storage

Security        Authentication/authorization

Exception
Handler         Error-to-HTTP translation

Mapper          Entity/DTO conversion`
      }
    },

    {
      id: "common-mistakes",
      title: "26. Common Layered Architecture Mistakes",

      bullets: [
        "Putting business logic inside controllers.",
        "Putting HTTP-specific logic inside services.",
        "Putting business workflows inside repositories.",
        "Returning JPA entities directly from every endpoint.",
        "Exposing sensitive entity fields.",
        "Using field injection everywhere.",
        "Creating unnecessary interfaces and wrapper classes.",
        "Creating God classes with too many responsibilities.",
        "Duplicating the same business rule in multiple places.",
        "Creating circular service dependencies.",
        "Putting database queries directly inside controllers.",
        "Ignoring transaction boundaries.",
        "Using validation as a replacement for business rules.",
        "Using DTOs as if they were a security mechanism.",
        "Logging secrets or sensitive data.",
        "Calling third-party services directly from controllers.",
        "Starting the entire Spring context for every simple unit test.",
        "Creating packages that are difficult to navigate.",
        "Overengineering a simple application.",
        "Under-structuring a large application."
      ]
    },

    {
      id: "architecture-smell-checklist",
      title: "27. Architecture Smell Checklist",

      paragraphs: [
        "When reviewing a Spring Boot project, the following questions can quickly reveal architectural problems."
      ],

      bullets: [
        "Does the controller contain significant business logic?",
        "Does the repository contain business workflows?",
        "Are entities returned directly from every endpoint?",
        "Are sensitive fields exposed?",
        "Are the same business rules duplicated?",
        "Are there circular dependencies?",
        "Are services doing too many unrelated things?",
        "Are transactions placed around meaningful operations?",
        "Are external integrations isolated?",
        "Can the service layer be unit tested without starting the entire application?",
        "Is the package structure easy to understand?",
        "Are abstractions providing a real benefit?",
        "Can database changes be made without unnecessarily breaking the API?"
      ]
    },

    {
      id: "architecture-decision-guide",
      title: "28. Simple Decision Guide",

      code: {
        language: "text",
        code: `Need to handle HTTP?
        ↓
    Controller

Need business/application logic?
        ↓
      Service

Need database access?
        ↓
    Repository

Need persistent state?
        ↓
      Entity

Need API input/output?
        ↓
       DTO

Need entity ↔ DTO conversion?
        ↓
      Mapper

Need cross-cutting HTTP errors?
        ↓
@RestControllerAdvice

Need transaction boundary?
        ↓
     Service

Need authentication/authorization?
        ↓
 Spring Security`
      }
    },

    {
      id: "small-vs-large",
      title: "29. Small Application vs Large Application",

      paragraphs: [
        "Layered architecture should evolve with application complexity.",
        "A small CRUD application may only need controller, service, repository, entity, and DTO classes.",
        "A larger system may require separate domain services, external clients, mappers, security components, event handlers, validation components, and other abstractions."
      ],

      code: {
        language: "text",
        code: `Small Application

Controller
   ↓
Service
   ↓
Repository
   ↓
Entity


Larger Application

Controller
   ↓
DTO / Validation
   ↓
Application Service
   ↓
Domain Logic
   ↓
Repository / External Client
   ↓
Infrastructure`
      }
    },

    {
      id: "best-practice-summary",
      title: "30. Best Practice Summary",

      bullets: [
        "Keep controllers thin.",
        "Keep business logic in the appropriate service or domain layer.",
        "Keep repositories focused on persistence.",
        "Use DTOs at external API boundaries.",
        "Prefer constructor injection.",
        "Keep dependency direction clear.",
        "Follow single responsibility.",
        "Avoid God classes.",
        "Avoid unnecessary abstractions.",
        "Keep package structure understandable.",
        "Validate request DTOs at the API boundary.",
        "Centralize exception handling.",
        "Use meaningful transaction boundaries.",
        "Keep security concerns at the security boundary.",
        "Isolate external service integrations.",
        "Design components for testability.",
        "Avoid duplicate business rules.",
        "Avoid circular dependencies.",
        "Keep database access behind persistence abstractions.",
        "Let architecture evolve with application complexity."
      ]
    },

    {
      id: "scenario-interview",
      title: "31. Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your controller contains 300 lines of code including database queries and business rules. What would you change?",
          answer:
            "I would move business/application logic into a service, database operations into a repository, and use DTOs for request and response models. The controller would remain responsible mainly for HTTP concerns."
        },
        {
          question:
            "Why should a repository not contain the complete business workflow?",
          answer:
            "A repository should focus on persistence. Business workflows often combine multiple data operations, validation, external services, and business rules, which are better coordinated by the service or domain layer."
        },
        {
          question:
            "Why prefer constructor injection?",
          answer:
            "Constructor injection makes required dependencies explicit, supports final fields, prevents partially initialized objects, and makes unit testing easier."
        },
        {
          question:
            "Would you create an interface for every Spring service?",
          answer:
            "Not necessarily. I would introduce an interface when it provides a meaningful benefit such as multiple implementations, replaceability, architectural boundaries, or testing needs."
        },
        {
          question:
            "Where would you put @Transactional in a layered application?",
          answer:
            "The service layer is commonly a suitable location because it represents application operations and can define the transaction boundary around the complete workflow."
        },
        {
          question:
            "Why should controllers not contain security business rules everywhere?",
          answer:
            "Authentication and general authorization are better centralized through Spring Security. Resource-specific ownership or domain authorization can still be enforced in the appropriate service or domain layer."
        },
        {
          question:
            "Why use DTOs instead of returning JPA entities?",
          answer:
            "DTOs provide a controlled API contract, reduce coupling to persistence, prevent accidental data exposure, and allow API representations to differ from database entities."
        },
        {
          question:
            "How would you test a service that depends on a repository?",
          answer:
            "For a unit test, I would mock the repository with Mockito, arrange the repository behavior, execute the service method, assert the result, and verify important repository interactions."
        },
        {
          question:
            "When can layered architecture become overengineering?",
          answer:
            "It becomes overengineering when additional layers and abstractions do not provide meaningful separation, testability, replaceability, or domain clarity."
        },
        {
          question:
            "What is the main goal of layered architecture?",
          answer:
            "The main goal is clear separation of responsibilities and controlled dependencies so the application is easier to understand, test, maintain, and evolve."
        }
      ]
    },

    {
      id: "interview",
      title: "Layered Architecture Interview Questions",

      interviewQuestions: [
        {
          question:
            "What are the main layers in a typical Spring Boot REST application?",
          answer:
            "A common structure contains controller, service, repository, entity, and DTO components, although the exact architecture depends on the application."
        },
        {
          question: "Why should controllers be thin?",
          answer:
            "Thin controllers keep HTTP concerns separate from business logic, improving readability, testing, and maintainability."
        },
        {
          question: "Why use DTOs instead of exposing entities?",
          answer:
            "DTOs provide a controlled API contract and prevent unnecessary coupling between persistence structures and external clients."
        },
        {
          question:
            "Should every application have controller, service, and repository layers?",
          answer:
            "Not necessarily. The architecture should match the application's complexity and requirements."
        },
        {
          question:
            "What is the most important principle of layered architecture?",
          answer:
            "The key principle is clear separation of responsibilities and controlled dependencies between components."
        },
        {
          question:
            "What is the role of the service layer?",
          answer:
            "The service layer commonly coordinates application operations, applies business rules, manages transaction boundaries when appropriate, and coordinates repositories or external services."
        },
        {
          question:
            "What is the role of the repository layer?",
          answer:
            "The repository layer provides persistence and data-access operations while keeping database-related details behind a persistence abstraction."
        },
        {
          question:
            "What is dependency injection and why is it useful?",
          answer:
            "Dependency injection means required dependencies are supplied to a class rather than the class creating them itself. It reduces coupling and improves testability."
        },
        {
          question:
            "What is constructor injection?",
          answer:
            "Constructor injection supplies required dependencies through the class constructor. It makes dependencies explicit and is generally preferred in Spring applications."
        },
        {
          question:
            "What is single responsibility?",
          answer:
            "Single responsibility means a class should have a coherent responsibility and a clear reason to change, rather than handling many unrelated concerns."
        },
        {
          question:
            "What is a thin controller?",
          answer:
            "A thin controller handles HTTP concerns and delegates application work to services instead of implementing large business workflows itself."
        },
        {
          question:
            "Why should repositories focus on data access?",
          answer:
            "Keeping repositories focused on persistence prevents database components from becoming tightly coupled to application workflows and business logic."
        },
        {
          question:
            "What is overengineering in layered architecture?",
          answer:
            "Overengineering is adding unnecessary abstractions, layers, or wrappers that do not provide meaningful architectural value."
        },
        {
          question:
            "Why are transactions commonly defined at the service layer?",
          answer:
            "The service layer commonly represents a complete application operation, making it a natural place to define the transaction boundary."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",

      bullets: [
        "Controller → HTTP concerns.",
        "Service → application/business logic.",
        "Repository → persistence/data access.",
        "Entity → persistent/domain state.",
        "DTO → API data contract.",
        "Mapper → entity/DTO conversion.",
        "Constructor injection → explicit dependencies.",
        "Thin controller → easier maintenance.",
        "Single responsibility → clear reasons to change.",
        "DTOs → controlled API representation.",
        "Transactions → meaningful application operations.",
        "Exception handler → consistent error responses.",
        "Security → authentication and authorization.",
        "External clients → isolated integrations.",
        "Tests should match the layer being tested.",
        "Avoid unnecessary abstractions.",
        "Avoid circular dependencies.",
        "Avoid duplicated business rules.",
        "Architecture should evolve with application complexity."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",

      paragraphs: [
        "Layered architecture separates responsibilities in a Spring Boot application. The controller handles HTTP concerns, the service handles application and business logic, the repository handles persistence, entities represent persistent or domain state, and DTOs define request and response contracts. I prefer constructor injection for explicit dependencies and testability. Controllers should remain thin, repositories should stay focused on data access, and transactions should normally surround meaningful service operations. I also avoid unnecessary abstractions and direct entity exposure. The main goal is not to create many layers, but to maintain clear responsibilities, controlled dependencies, testability, and maintainability."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes",

      paragraphs: [
        "Remember the basic responsibility flow: Controller → Service → Repository → Database.",
        "Request DTOs enter through the API boundary, while response DTOs leave through the API boundary.",
        "Controllers should coordinate HTTP, not become business engines.",
        "Services should coordinate application operations and business rules.",
        "Repositories should focus on persistence and queries.",
        "Entities represent persistent/domain state and should not automatically become the API contract.",
        "Constructor injection is generally preferred because dependencies are explicit and testing is easier.",
        "Do not create abstractions simply because a design pattern says you should. Add them when they provide real value.",
        "For interviews, the most important principle is: layered architecture is about separation of responsibilities and controlled dependencies, not simply about creating packages named controller, service, and repository."
      ]
    }
  ]
};
