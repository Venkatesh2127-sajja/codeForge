
export const systemDesignAndProjectInterviewQuestions = {
  id: 1610,
  title: "System Design and Project-Based Interview Questions",
  slug: "system-design-and-project-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for backend interviews with detailed project explanations, Spring Boot architecture, REST API design, database modeling, scalability, reliability, security, testing, deployment, and practical engineering trade-offs.",
  estimatedTime: "60 min",
  sections: [
    {
      id: "project-explanation",
      title: "1. Explaining Your Spring Boot Project",
      paragraphs: [
        "Interviewers want to understand whether you genuinely understand the application you built. They may ask you to explain its purpose, users, architecture, database, API endpoints, security, testing, deployment, and the technical decisions you made.",
        "Start with the business problem instead of listing technologies. Then explain how the frontend communicates with the backend, how Spring Boot processes requests, how data is stored, and how errors are handled.",
        "Be accurate about your contribution. Explain which features you personally implemented, which decisions you influenced, which problems you solved, and which features remain planned. A small project explained deeply is more convincing than a large architecture you cannot defend."
      ],
      bullets: [
        "Problem: What problem does the application solve?",
        "Users: Who uses the application, and what can each user do?",
        "Architecture: What are the major components and how do they communicate?",
        "Request flow: How does a request move from the client to the database and back?",
        "Database: What are the main entities and their relationships?",
        "Security: How are users authenticated and authorized?",
        "Testing: How do you verify the application's behavior?",
        "Deployment: Where does the application run, and how is it configured?",
        "Contribution: What did you personally design, implement, debug, or improve?",
        "Future work: What would you change if the application had more users or a larger workload?"
      ],
      code: {
        language: "text",
        code: `Example: Student Management System

React Frontend
      |
      | HTTP / JSON
      v
Spring Boot REST API
      |
      v
Controller Layer
      |
      v
Service Layer
      |
      v
Spring Data JPA Repository
      |
      v
MySQL Database

Supporting concerns:
- Validation and exception handling
- Authentication and authorization, if required
- Logging, monitoring, and automated tests`,
      },
      interviewQuestions: [
        {
          question: "How do you explain a Spring Boot project in an interview?",
          answer: "I start with the business problem and intended users. Then I explain the architecture, request flow, database design, security, and deployment. I describe my own contributions, one difficult technical problem and how I solved it, and one improvement I would make if the project needed to support more users."
        },
        {
          question: "Why did you choose Spring Boot for your backend?",
          answer: "Spring Boot provides auto-configuration, dependency injection, embedded-server support, externalized configuration, and integration with persistence and testing libraries. These features reduce setup work and help organize the application into maintainable components."
        },
        {
          question: "How does a request flow through your Spring Boot application?",
          answer: "A typical request reaches the embedded servlet container and passes through the servlet filter chain, including security filters where configured. Spring MVC's DispatcherServlet routes it to a controller, which calls the service layer and usually a repository. The response is then serialized and returned to the client, with exception handling and other filters participating as appropriate."
        },
        {
          question: "Why use MySQL with Spring Data JPA?",
          answer: "MySQL is a relational database suitable for structured data and transactional operations. Spring Data JPA simplifies entity mapping and common persistence operations. I would still use suitable indexes, inspect generated SQL, and write custom queries when the workload requires them."
        },
        {
          question: "What was the most challenging part of your project?",
          answer: "I would describe a real challenge I personally encountered, explain how I reproduced it, show the evidence I used to identify the cause, and describe the fix. I would finish by explaining how I tested the solution and what I learned. The example should reflect my actual project experience."
        },
        {
          question: "What would you improve in your project?",
          answer: "I would identify a specific improvement based on an actual limitation, such as stronger automated tests, query optimization, better observability, more robust validation, or improved deployment automation. I would explain the expected benefit and the trade-off rather than claiming that every advanced technology is necessary."
        }
      ]
    },
    {
      id: "architecture-and-layers",
      title: "2. Backend Architecture and Layered Design",
      paragraphs: [
        "Layered architecture separates responsibilities so that HTTP handling, business rules, and persistence logic do not become tightly coupled. In a typical Spring Boot application, controllers handle web concerns, services coordinate business operations, and repositories access stored data.",
        "The controller should not contain complicated business rules or construct database queries directly. The service layer is usually responsible for business workflows and transaction boundaries. The repository layer focuses on persistence.",
        "A layered application can be a monolith or one part of a microservices system. Layered architecture describes the organization of code within an application; microservices describe independently deployable services and their boundaries."
      ],
      code: {
        language: "java",
        code: `public record StudentRequest(
    @NotBlank String name,
    @Email @NotBlank String email
) {}

public record StudentResponse(
    Long id,
    String name,
    String email
) {}

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentResponse> create(
            @Valid @RequestBody StudentRequest request) {

        StudentResponse response =
            studentService.create(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }
}

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional
    public StudentResponse create(StudentRequest request) {
        Student student = new Student(
            request.name(),
            request.email()
        );

        Student saved = studentRepository.save(student);

        return new StudentResponse(
            saved.getId(),
            saved.getName(),
            saved.getEmail()
        );
    }
}

public interface StudentRepository
        extends JpaRepository<Student, Long> {
}`,
      },
      bullets: [
        "Controller: HTTP mappings, request parameters, validation entry points, and response status.",
        "Service: business rules, workflow coordination, and transaction boundaries.",
        "Repository: database access and query definitions.",
        "Entity: persistence representation and database mapping.",
        "DTO: request and response representation exposed through the API.",
        "Configuration: application-wide beans, properties, and infrastructure settings."
      ],
      interviewQuestions: [
        {
          question: "Why do we separate controller, service, and repository layers?",
          answer: "Separation of concerns makes the code easier to test, maintain, and change. Controllers handle HTTP concerns, services implement business workflows, and repositories handle persistence. This prevents database and business logic from becoming tightly coupled to request handling."
        },
        {
          question: "Can a controller call a repository directly?",
          answer: "It is technically possible, but for business applications it often creates tight coupling and spreads business rules across controllers. A service layer provides a better place for workflows, transactions, and reusable business logic."
        },
        {
          question: "What is dependency injection?",
          answer: "Dependency injection means an object receives its dependencies from an external mechanism rather than constructing them itself. Spring's container manages these dependencies, improving modularity and making unit testing easier."
        },
        {
          question: "Why use constructor injection?",
          answer: "Constructor injection makes required dependencies explicit, supports immutable fields, and allows the class to be instantiated easily in tests. It also helps identify dependency cycles during application startup."
        },
        {
          question: "What is the difference between an entity and a DTO?",
          answer: "An entity represents persisted domain data and is managed through JPA. A DTO defines the data exchanged through an API or another boundary. DTOs avoid exposing internal persistence structures and allow request and response formats to evolve independently."
        }
      ]
    },
    {
      id: "requirements-and-use-cases",
      title: "3. Functional and Non-Functional Requirements",
      paragraphs: [
        "System design starts by clarifying what the system must do and the quality attributes it must satisfy. Functional requirements describe features and behavior. Non-functional requirements describe qualities such as latency, availability, security, scalability, and maintainability.",
        "Before selecting technologies, establish expected users, request volume, data size, critical workflows, consistency requirements, and acceptable failure behavior. These constraints influence the architecture.",
        "A design for a small internal CRUD application does not need the same infrastructure as a public payment platform. Start with the simplest design that satisfies the requirements, then introduce complexity when evidence or business needs justify it."
      ],
      bullets: [
        "Functional requirements: register a student, update details, search students, and delete records.",
        "Non-functional requirements: secure access, predictable response times, correct data, and recoverability.",
        "Traffic requirements: normal and peak requests per second, concurrent users, and burst patterns.",
        "Data requirements: data size, retention, relationships, consistency, and reporting needs.",
        "Operational requirements: deployment frequency, monitoring, backups, recovery objectives, and maintenance."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between functional and non-functional requirements?",
          answer: "Functional requirements define what the system does, such as creating an order or retrieving a student. Non-functional requirements define how well the system should operate, including latency, availability, security, and capacity."
        },
        {
          question: "What questions would you ask before designing a system?",
          answer: "I would clarify the core use cases, users, expected traffic, data model, consistency needs, latency targets, availability expectations, security requirements, and operational constraints. These answers help determine the simplest architecture that meets the requirements."
        },
        {
          question: "Why should you avoid choosing technologies too early?",
          answer: "A technology choice without requirements can add unnecessary complexity and cost. Requirements and constraints should drive the choice of database, deployment model, caching, messaging, and service boundaries."
        }
      ]
    },
    {
      id: "rest-api-design",
      title: "4. REST API Design",
      paragraphs: [
        "A REST-style API exposes resources through URLs and uses HTTP methods to express operations. Consistent resource names, status codes, validation rules, pagination, and error responses make an API easier to use and maintain.",
        "Use request DTOs to validate incoming data and response DTOs to control what leaves the service. Avoid returning database entities directly when doing so exposes internal fields or creates uncontrolled object graphs.",
        "API design should also account for backward compatibility. Changing the meaning of an existing field or response can break clients even if the server still compiles."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody CreateProductRequest request) {

        ProductResponse response = productService.create(request);

        return ResponseEntity
            .created(URI.create("/api/v1/products/" + response.id()))
            .body(response);
    }
}

record CreateProductRequest(
    @NotBlank String name,
    @Positive BigDecimal price
) {}

record ProductResponse(Long id, String name, BigDecimal price) {}`,
      },
      bullets: [
        "GET: retrieve a resource or collection.",
        "POST: create a resource or initiate an operation.",
        "PUT: replace a resource representation, typically idempotently.",
        "PATCH: partially modify a resource.",
        "DELETE: remove a resource; repeated requests should be designed carefully around the API contract.",
        "Use 201 Created for successful resource creation where appropriate.",
        "Use 400 for invalid input, 401 for authentication failures, 403 for access denial, and 404 for missing resources.",
        "Use pagination and filtering for large collections instead of returning unbounded result sets."
      ],
      interviewQuestions: [
        {
          question: "What makes a good REST API?",
          answer: "A good API has consistent resource URLs, appropriate HTTP methods and status codes, input validation, predictable error responses, clear documentation, suitable pagination, and deliberate authentication and authorization. It should also consider backward compatibility."
        },
        {
          question: "What is the difference between PUT and PATCH?",
          answer: "PUT generally replaces the resource representation and is intended to be idempotent. PATCH applies a partial update. The exact update semantics should be documented, especially for omitted fields and null values."
        },
        {
          question: "What is idempotency in HTTP?",
          answer: "An operation is idempotent when repeating the same request has the same intended effect as performing it once. GET, PUT, and DELETE are defined as idempotent in HTTP semantics, while POST is not generally guaranteed to be idempotent. Implementations must still handle side effects correctly."
        },
        {
          question: "How do you handle validation errors consistently?",
          answer: "Validate request DTOs at the API boundary and use centralized exception handling, such as @RestControllerAdvice, to return a consistent error structure and suitable HTTP status. Avoid returning stack traces or internal database details to clients."
        }
      ]
    },
    {
      id: "database-design",
      title: "5. Database Design and Transactions",
      paragraphs: [
        "Database design starts with the data model and the relationships between entities. Primary keys identify records, foreign keys enforce referential integrity, and unique constraints prevent duplicate values where the business rules require uniqueness.",
        "Indexes can speed up filtering, joining, and sorting, but they also consume storage and add write overhead. Use query patterns and execution plans to decide which indexes are useful.",
        "Transactions group related database operations into one logical unit. In Spring, @Transactional is commonly applied at service boundaries so a business operation can commit or roll back consistently. Transaction boundaries should be designed with external calls and long-running work in mind."
      ],
      code: {
        language: "java",
        code: `@Entity
@Table(
    name = "students",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_students_email",
            columnNames = "email"
        )
    },
    indexes = {
        @Index(
            name = "idx_students_name",
            columnList = "name"
        )
    }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    protected Student() {}

    public Student(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}`,
      },
      bullets: [
        "Define primary keys, foreign keys, nullability, and uniqueness according to business rules.",
        "Use transactions for operations that must succeed or fail together.",
        "Inspect slow queries and execution plans before adding indexes.",
        "Avoid fetching entire tables when only a small page or projection is needed.",
        "Use database migrations to version schema changes across environments.",
        "Design transaction isolation and locking around actual consistency requirements."
      ],
      interviewQuestions: [
        {
          question: "Why do we use database indexes?",
          answer: "Indexes can reduce the amount of data the database must scan to find matching rows. They can improve filtering, joins, and sorting, but they consume storage and add maintenance overhead during inserts, updates, and deletes."
        },
        {
          question: "What is normalization?",
          answer: "Normalization organizes relational data to reduce unnecessary duplication and update anomalies. The appropriate design depends on the data relationships and workload; denormalization may be justified for measured read-performance requirements."
        },
        {
          question: "Where should @Transactional usually be placed?",
          answer: "It is commonly placed on service-layer methods that represent a business operation requiring transactional consistency. The method should keep the transaction focused and avoid holding database resources during unnecessarily slow external calls."
        },
        {
          question: "How do you prevent duplicate email registration?",
          answer: "Validate the request and check for an existing email for a user-friendly response, but also enforce a unique constraint in the database. The constraint protects against concurrent requests that both pass the initial check."
        },
        {
          question: "Why use database migrations instead of relying only on automatic schema updates?",
          answer: "Migrations provide versioned, reviewable, repeatable schema changes across environments. They help coordinate releases and support controlled changes that are difficult to express safely through automatic entity-based schema updates."
        }
      ]
    },
    {
      id: "scaling-and-load-balancing",
      title: "6. Scaling and Load Balancing",
      paragraphs: [
        "Vertical scaling increases the resources of one machine, such as CPU or memory. Horizontal scaling adds more application instances. Horizontal scaling can increase capacity and availability, but it introduces coordination and operational concerns.",
        "A load balancer distributes incoming requests across healthy instances according to routing and health rules. It does not automatically solve database bottlenecks, shared-state problems, or slow external dependencies.",
        "To scale horizontally, application instances should avoid relying on local in-memory session state or local files for information that must be shared across instances. Shared state can live in a database, distributed cache, or other suitable shared service."
      ],
      code: {
        language: "text",
        code: `                         Client
                            |
                            v
                      Load Balancer
                       /    |    \\
                      v     v     v
                  App A   App B   App C
                      \\     |     /
                       v    v    v
                      Shared Database

Possible supporting components:
- Distributed cache
- Centralized logs and metrics
- Externalized configuration
- Health and readiness checks`,
      },
      bullets: [
        "Vertical scaling is operationally simple but limited by the capacity of one machine.",
        "Horizontal scaling can increase aggregate capacity and improve instance-level resilience.",
        "Use health checks to avoid sending traffic to unhealthy instances.",
        "Externalize configuration and shared state.",
        "Make application instances disposable and safe to replace.",
        "Measure database and downstream capacity before increasing application instance counts."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between vertical and horizontal scaling?",
          answer: "Vertical scaling increases resources on one machine, while horizontal scaling adds more machines or application instances. Horizontal scaling can improve aggregate capacity and resilience but usually requires load balancing and careful handling of shared state and dependencies."
        },
        {
          question: "What is a load balancer?",
          answer: "A load balancer distributes incoming requests across available targets according to routing, health, and balancing rules. It can improve traffic distribution and availability, but application and data-layer bottlenecks must still be addressed separately."
        },
        {
          question: "Can you scale a Spring Boot application by running three instances?",
          answer: "Often yes, if the application and its dependencies can support the extra load. I would verify stateless request handling, database connection budgets, session storage, scheduled-job duplication, shared files, and downstream rate limits before increasing instances."
        },
        {
          question: "What is a single point of failure?",
          answer: "It is a component whose failure can make the entire system unavailable or unable to perform a critical function. Examples include a single application instance or an unreplicated critical dependency without a suitable recovery strategy."
        }
      ]
    },
    {
      id: "statelessness-and-caching",
      title: "7. Stateless Applications and Caching",
      paragraphs: [
        "A stateless application instance does not rely on its own local memory to preserve client-specific state between independent requests. This makes it easier for a load balancer to route consecutive requests to different healthy instances.",
        "Statelessness does not mean the application has no state. Business state still exists in databases or other shared systems. It means the server instance does not depend on private local state to continue processing a client's next request.",
        "Caching stores frequently reused data to reduce repeated computation or database access. Cache invalidation, expiration, memory limits, and consistency must be considered. A cache is an optimization and should not silently become the only source of important business data."
      ],
      bullets: [
        "Avoid relying on in-memory sessions when requests may reach different instances.",
        "Use shared session storage if server-side session state is required.",
        "Choose cache keys that include all parameters affecting the result.",
        "Set appropriate expiration and capacity limits.",
        "Invalidate or refresh cached data when its source changes.",
        "Measure cache hit rate and backend load to confirm that caching helps."
      ],
      interviewQuestions: [
        {
          question: "Why should a web application be stateless where practical?",
          answer: "Stateless request handling allows any healthy instance to process a request without depending on state stored only in another instance's memory. This simplifies load balancing, horizontal scaling, and instance replacement."
        },
        {
          question: "Does stateless mean that the application stores no data?",
          answer: "No. Business data can be persisted in databases, caches, or other shared systems. Statelessness means that a particular server instance does not need to retain private request-to-request state to handle a client correctly."
        },
        {
          question: "What is cache invalidation?",
          answer: "Cache invalidation is the process of removing or refreshing cached values when they are no longer correct. It is important because cached data can become stale after updates to the source of truth."
        },
        {
          question: "What is a cache stampede?",
          answer: "A cache stampede occurs when many requests simultaneously attempt to regenerate the same expired or missing value, causing a burst of load on the underlying service. Techniques such as request coalescing, controlled refresh, and expiration jitter can help."
        }
      ]
    },
    {
      id: "reliability-and-resilience",
      title: "8. Reliability, Timeouts, Retries, and Circuit Breakers",
      paragraphs: [
        "Reliable systems expect failures. Databases, networks, third-party APIs, and individual application instances may become slow or unavailable. The goal is to contain the impact, recover safely, and preserve correct business behavior.",
        "Timeouts prevent a caller from waiting indefinitely. Retries can recover from transient failures, but they should be bounded and applied only when repeating an operation is safe. Exponential backoff and jitter can reduce synchronized retry traffic.",
        "Circuit breakers can stop repeated calls to an unhealthy dependency. Bulkheads isolate resource usage, while fallbacks can provide degraded functionality when the business rules permit it. None of these patterns replaces sound error handling or monitoring."
      ],
      code: {
        language: "java",
        code: `public PaymentResult processPayment(
        PaymentRequest request) {

    try {
        return paymentClient.charge(
            request.idempotencyKey(),
            request.amount()
        );
    } catch (PaymentTimeoutException ex) {
        // A timeout does not prove that the charge failed.
        // Reconcile with the provider before retrying.
        return paymentClient.lookupByIdempotencyKey(
            request.idempotencyKey()
        );
    }
}

record PaymentRequest(
    String idempotencyKey,
    BigDecimal amount
) {}`,
      },
      bullets: [
        "Set connection and response timeouts based on latency requirements.",
        "Retry only appropriate transient failures.",
        "Use idempotency protection for operations that create important side effects.",
        "Use circuit breakers to limit repeated calls to unhealthy dependencies.",
        "Use bulkheads to isolate critical workloads.",
        "Define meaningful fallbacks without falsely claiming success.",
        "Monitor timeout, retry, circuit-breaker, and dependency error rates."
      ],
      interviewQuestions: [
        {
          question: "How would you handle a slow external service?",
          answer: "I would inspect dependency latency and errors, configure appropriate timeouts, and bound concurrency. I would use retries with backoff only for transient failures where repeating the operation is safe. Depending on the business requirements, I might add a circuit breaker or a degraded response."
        },
        {
          question: "What is the difference between a timeout and a circuit breaker?",
          answer: "A timeout limits how long one operation waits. A circuit breaker tracks failures and can temporarily stop new calls to a dependency that appears unhealthy. They complement each other."
        },
        {
          question: "Why is retrying a payment request dangerous?",
          answer: "The provider may have processed the payment even though the response timed out. Retrying without idempotency or status reconciliation can create duplicate charges. The system must determine the outcome safely before repeating the operation."
        },
        {
          question: "What is graceful degradation?",
          answer: "Graceful degradation means preserving essential functionality when a noncritical component fails. For example, a product page might remain available without recommendations. The fallback must respect business and security requirements."
        }
      ]
    },
    {
      id: "idempotency-and-consistency",
      title: "9. Duplicate Requests and Data Consistency",
      paragraphs: [
        "Distributed systems commonly experience retries, duplicated messages, client resubmissions, and uncertain outcomes. A request may reach the server more than once, or the server may complete a database operation while the response is lost.",
        "Idempotency is especially important for order creation, payment processing, and other operations with side effects. A robust design may combine an idempotency key, a stored operation result, database constraints, and transaction handling.",
        "Checking for a record before inserting it is not enough on its own. Two concurrent requests may both observe that no record exists. A unique constraint or other concurrency-safe mechanism must enforce the invariant."
      ],
      code: {
        language: "java",
        code: `@Entity
@Table(
    name = "orders",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_orders_idempotency_key",
            columnNames = "idempotency_key"
        )
    }
)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "idempotency_key",
        nullable = false,
        updatable = false
    )
    private String idempotencyKey;

    @Column(nullable = false)
    private String status;

    protected Order() {}

    public Order(String idempotencyKey, String status) {
        this.idempotencyKey = idempotencyKey;
        this.status = status;
    }
}`,
      },
      bullets: [
        "Define the idempotency key's scope and retention period.",
        "Store enough information to identify a previous operation and return its result.",
        "Enforce uniqueness in the database to handle concurrent requests.",
        "Handle duplicate-key conflicts as expected business outcomes where appropriate.",
        "Do not assume a timeout means that a transaction rolled back.",
        "For asynchronous processing, design consumers to handle duplicate messages safely."
      ],
      interviewQuestions: [
        {
          question: "How do you prevent duplicate order creation?",
          answer: "I would define an idempotency key for the logical operation, persist the key and operation result, and enforce a unique constraint in the database. Repeated requests would return or reconcile the existing result rather than creating a second order."
        },
        {
          question: "Why is a check-then-insert pattern insufficient?",
          answer: "Two concurrent requests can both check that a record does not exist and then attempt to insert it. A database unique constraint or another concurrency-safe mechanism is needed to enforce uniqueness under concurrent execution."
        },
        {
          question: "What is eventual consistency?",
          answer: "Eventual consistency means that replicas or related components may temporarily show different states, but under the model's assumptions they converge if updates stop and processing succeeds. It can improve decoupling and availability but requires handling stale reads and asynchronous failures."
        },
        {
          question: "Does a database transaction guarantee exactly-once processing across multiple services?",
          answer: "No. A local database transaction protects operations within its transaction boundary. It does not atomically include arbitrary remote services or message brokers. Distributed workflows need explicit reliability patterns, idempotency, and sometimes a saga or transactional outbox."
        }
      ]
    },
    {
      id: "monolith-vs-microservices",
      title: "10. Monolith vs Microservices",
      paragraphs: [
        "A monolith is deployed as one application unit. A modular monolith can still have clear internal boundaries and independently testable modules. Microservices split capabilities into independently deployable services that communicate over defined interfaces.",
        "Microservices can enable independent deployment, scaling, ownership, and failure isolation. They also introduce network failures, distributed tracing, service discovery, data ownership questions, deployment coordination, and more complex testing.",
        "The right choice depends on organizational structure, scaling needs, domain boundaries, release requirements, and operational maturity. Starting with a modular monolith is often reasonable when a product and its workload are still evolving."
      ],
      bullets: [
        "Choose a monolith when simplicity, fast development, and straightforward transactions are priorities.",
        "Use clear module boundaries even in a monolith.",
        "Consider microservices when independent ownership, deployment, or scaling has a measurable benefit.",
        "Give each service a clear business responsibility and API contract.",
        "Avoid creating many services that must always be deployed together.",
        "Plan for network timeouts, partial failure, observability, and data consistency in distributed designs."
      ],
      interviewQuestions: [
        {
          question: "Would you always choose microservices over a monolith?",
          answer: "No. A modular monolith is often easier to develop, test, deploy, and operate. Microservices are justified when independent deployment, scaling, ownership, or isolation provides enough value to offset distributed-system complexity."
        },
        {
          question: "What is the difference between a monolith and a modular monolith?",
          answer: "A monolith is deployed as one application unit. A modular monolith is also deployed as one unit, but its code is organized into explicit modules with defined responsibilities and dependencies. Modularity can improve maintainability without requiring distributed deployment."
        },
        {
          question: "What problems do microservices introduce?",
          answer: "They introduce network latency and failures, distributed tracing, service communication, data consistency challenges, deployment coordination, and more complex testing and operations. Teams must manage these concerns deliberately."
        },
        {
          question: "How should services communicate?",
          answer: "Synchronous HTTP APIs are useful when a caller needs an immediate response. Messaging is useful for asynchronous workflows and decoupling. The choice depends on latency, consistency, delivery guarantees, coupling, and operational needs."
        }
      ]
    },
    {
      id: "security-and-access-control",
      title: "11. API Security and Access Control",
      paragraphs: [
        "Authentication establishes who or what is making a request. Authorization determines whether that identity can perform the requested action. A successful login does not automatically grant access to every endpoint or record.",
        "A secure API validates inputs, enforces access rules, uses HTTPS, protects secrets, and returns appropriate error responses without leaking internal details. CORS and CSRF settings should reflect the actual client and credential model rather than being configured by guesswork.",
        "Security should be enforced at relevant boundaries, including endpoint access and sensitive business operations. Object-level authorization matters too: a user who can access an endpoint must not automatically be able to read another user's private data."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .build();
    }
}

@Service
public class DocumentService {

    @PreAuthorize("@documentAccess.canRead(authentication, #id)")
    public DocumentResponse getDocument(Long id) {
        // Load and return the authorized document.
        return loadDocument(id);
    }

    private DocumentResponse loadDocument(Long id) {
        throw new UnsupportedOperationException(
            "Implement document loading"
        );
    }
}`,
      },
      bullets: [
        "Authenticate callers using an appropriate mechanism.",
        "Authorize actions and resources using roles, authorities, or domain-specific rules.",
        "Validate inputs and avoid exposing stack traces or secrets in API responses.",
        "Use HTTPS and secure secret-management practices.",
        "Configure CORS and CSRF according to the actual client and credential model.",
        "Protect management endpoints and sensitive operational information.",
        "Test that users cannot access resources belonging to other users without permission."
      ],
      interviewQuestions: [
        {
          question: "How would you secure a REST API?",
          answer: "I would use appropriate authentication and authorization, validate input, require HTTPS, protect secrets, and enforce access rules at both endpoint and resource levels. I would configure CORS and CSRF based on the client and credential model, and ensure sensitive operational endpoints are restricted."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication verifies identity, while authorization determines permitted actions. A user may be authenticated successfully but still receive 403 when attempting an operation they are not allowed to perform."
        },
        {
          question: "What is object-level authorization?",
          answer: "It verifies that the authenticated caller is allowed to access the specific resource being requested. For example, a customer must not be able to retrieve another customer's order merely by changing the order ID in the URL."
        },
        {
          question: "Why should the backend validate data even if the frontend already validates it?",
          answer: "Frontend validation improves user experience but can be bypassed. The backend must independently validate all untrusted input because API requests can come from scripts, modified clients, or direct HTTP calls."
        }
      ]
    },
    {
      id: "testing-and-quality",
      title: "12. Testing Strategy and Code Quality",
      paragraphs: [
        "A production-ready project needs tests at different levels. Unit tests validate individual components, web-layer tests verify HTTP behavior, repository tests verify persistence behavior, and integration tests check that important components work together.",
        "Tests should cover both successful operations and failure cases, including invalid input, missing resources, authorization failures, database constraints, and downstream timeouts. The aim is not just a high coverage percentage but confidence in important business behavior.",
        "Keep tests repeatable and isolated. Avoid depending on a developer's local database state, fixed execution order, real external APIs, or uncontrolled timing."
      ],
      bullets: [
        "Unit tests: business rules and edge cases in isolated classes.",
        "Web-layer tests: request mappings, validation, serialization, and HTTP status codes.",
        "Repository tests: query correctness and persistence mapping.",
        "Integration tests: important end-to-end component interactions.",
        "Security tests: unauthenticated requests, role checks, and resource-level authorization.",
        "Performance tests: latency and throughput under representative load.",
        "CI pipeline: run automated checks consistently before deployment."
      ],
      code: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    void shouldReturnStudentWhenFound() {
        Student student = new Student(
            "Venkatesh",
            "student@example.com"
        );

        when(studentRepository.findById(1L))
            .thenReturn(Optional.of(student));

        StudentResponse response =
            studentService.getById(1L);

        assertEquals("Venkatesh", response.name());
        verify(studentRepository).findById(1L);
    }
}`,
      },
      interviewQuestions: [
        {
          question: "What types of tests do you write for a Spring Boot project?",
          answer: "I use unit tests for business logic, web-layer tests for controller behavior and validation, repository tests for persistence, and integration tests for important cross-component flows. I also test authorization, failure handling, and performance where required."
        },
        {
          question: "What is the difference between @WebMvcTest and @SpringBootTest?",
          answer: "@WebMvcTest focuses on the Spring MVC layer and usually uses mocks for collaborating services. @SpringBootTest loads a broader application context and is appropriate for integration tests, although it may take longer and require more configuration."
        },
        {
          question: "Why mock a repository in a service unit test?",
          answer: "Mocking isolates the service's business logic from the database. It makes tests fast and allows controlled success and failure scenarios. Repository behavior should be verified separately with repository or integration tests."
        },
        {
          question: "Is high code coverage enough to prove code quality?",
          answer: "No. Coverage measures which code was executed, not whether assertions verify the correct behavior. Tests must check meaningful outcomes, edge cases, error handling, and business invariants."
        }
      ]
    },
    {
      id: "deployment-and-observability",
      title: "13. Deployment, Monitoring, and Production Readiness",
      paragraphs: [
        "Deployment is part of system design because application behavior depends on configuration, runtime resources, database migrations, network access, and operational safeguards. A project that runs only on one developer's machine is not necessarily ready for production.",
        "A practical deployment pipeline builds a repeatable artifact, runs automated checks, injects environment-specific configuration, deploys using a controlled process, and verifies health and business functionality. Rollback or roll-forward procedures should be understood before a release.",
        "Observability combines logs, metrics, and traces to help teams understand behavior after deployment. Spring Boot Actuator can expose health and metrics endpoints when configured appropriately, but operational endpoints must be secured."
      ],
      bullets: [
        "Build reproducible artifacts and pin compatible dependency versions.",
        "Keep environment-specific configuration outside the application artifact where practical.",
        "Use controlled database migrations and a rollback or recovery strategy.",
        "Implement health and readiness checks suitable for the deployment platform.",
        "Monitor latency percentiles, throughput, error rates, CPU, memory, and connection pools.",
        "Use structured logs and correlation or trace IDs where available.",
        "Define alert ownership and a practical incident-response runbook.",
        "Verify the actual business flow after deployment."
      ],
      interviewQuestions: [
        {
          question: "How would you prepare a Spring Boot application for production?",
          answer: "I would verify security, configuration, automated tests, database migrations, logging, metrics, health checks, resource limits, graceful shutdown, and deployment procedures. I would also confirm backups, recovery expectations, and a safe way to roll back or roll forward a release."
        },
        {
          question: "What is the difference between liveness and readiness?",
          answer: "Liveness indicates whether a process should continue running or be restarted. Readiness indicates whether an instance should receive traffic. The checks should reflect those distinct purposes so a temporary dependency issue does not unnecessarily trigger repeated restarts."
        },
        {
          question: "How do logs, metrics, and traces help during an incident?",
          answer: "Logs provide event details, metrics reveal changes in latency, traffic, errors, and resource usage, and traces show where time is spent across a request path. Correlating these signals helps isolate the failing component."
        },
        {
          question: "How would you deploy a change safely?",
          answer: "I would run automated checks, review configuration and schema changes, deploy using the team's controlled rollout strategy, verify health and key business flows, and monitor error rates and latency. I would use the established rollback or roll-forward procedure if verification failed."
        }
      ]
    },
    {
      id: "capacity-estimation",
      title: "14. Basic Capacity Estimation",
      paragraphs: [
        "Capacity estimation helps determine whether a design is plausible before implementation. Begin with rough assumptions about users, requests per user, peak traffic, payload sizes, and stored data. The estimates do not need to be exact, but the assumptions should be explicit.",
        "Average requests per second can be estimated by dividing the number of requests over a period by the number of seconds in that period. Peak traffic may be substantially higher than the average, so production sizing should use realistic traffic patterns and measurements.",
        "Use estimates to identify likely bottlenecks and then validate them with load tests and real metrics. Do not treat a rough calculation as a guarantee of performance."
      ],
      code: {
        language: "text",
        code: `Example assumptions:

Daily API requests = 8,640,000
Seconds per day    = 86,400

Average RPS = 8,640,000 / 86,400
            = 100 requests/second

If peak traffic is 5 times the average:
Peak estimate = 500 requests/second

This is an initial estimate, not a capacity guarantee.
Validate with representative load tests and monitoring.`,
      },
      bullets: [
        "Estimate average and peak requests per second.",
        "Estimate average request and response payload sizes.",
        "Estimate database reads and writes per request.",
        "Estimate storage growth and retention requirements.",
        "Identify CPU-intensive and I/O-intensive operations.",
        "Load-test the complete request path, including database and external dependencies.",
        "Include headroom for traffic spikes and instance failures."
      ],
      interviewQuestions: [
        {
          question: "How do you estimate the traffic for a new API?",
          answer: "I estimate the number of active users, requests per user, and traffic distribution over time. I calculate average requests per second, apply a justified peak factor, and validate the assumptions with load tests and production metrics."
        },
        {
          question: "What is RPS?",
          answer: "RPS means requests per second. It measures the rate at which a service receives or handles requests, depending on the metric definition. It should be considered alongside latency, error rate, and resource utilization."
        },
        {
          question: "If a service handles 100 RPS on average, should it be sized for exactly 100 RPS?",
          answer: "No. Average traffic hides peaks, uneven workloads, and failure scenarios. I would estimate peak traffic, account for instance loss and dependency capacity, and verify the design through load testing."
        }
      ]
    },
    {
      id: "project-walkthrough-example",
      title: "15. Example: Explain a Project from Start to Finish",
      paragraphs: [
        "Use this example as a structure for explaining a student management or CRUD application. Replace the sample details with your real project architecture and actual implementation. Do not claim to have implemented features that were only planned.",
        "A strong walkthrough moves from the business problem to the design, then to one complete request flow. After that, explain an actual challenge, how you diagnosed it, and what you would improve."
      ],
      code: {
        language: "text",
        code: `1. Problem
   Manage student records through a web application.

2. Client
   React frontend sends HTTP requests with JSON.

3. Backend
   Spring Boot exposes REST endpoints.

4. Request handling
   Controller validates and routes requests.
   Service applies business rules.
   Repository accesses the database.

5. Persistence
   MySQL stores student records.
   Spring Data JPA maps entities to tables.

6. Reliability
   Validation, exception handling, and tests
   help protect expected application behavior.

7. Operations
   Configuration, deployment, logs, and health
   checks support ongoing maintenance.

8. Personal contribution
   Explain the specific features and fixes
   you personally completed.`,
      },
      interviewQuestions: [
        {
          question: "Can you explain one API from your project end to end?",
          answer: "I would choose a real endpoint and describe the incoming HTTP request, validation, controller method, service business rules, repository call, database operation, and returned response. I would also explain how missing data, invalid input, and database errors are handled."
        },
        {
          question: "How do you explain a technical challenge convincingly?",
          answer: "I describe the symptom, the impact, and how I reproduced it. Then I explain the evidence I collected, the root cause, the fix, and the tests used to verify the result. I finish with a lesson or preventive improvement."
        },
        {
          question: "What if the interviewer asks about a feature you did not implement?",
          answer: "I would clearly state that I did not implement it, then explain what I understand about the feature and how I would approach it. Being accurate about my contribution is better than claiming experience I cannot defend."
        },
        {
          question: "How do you explain a project when it has no production users?",
          answer: "I would describe it honestly as a learning, portfolio, or prototype project. I would explain the requirements, implementation, tests, deployment if applicable, known limitations, and the measurements or design changes I would introduce before production use."
        }
      ]
    },
    {
      id: "system-design-answer-framework",
      title: "16. How to Structure a System Design Interview Answer",
      paragraphs: [
        "System design interviews evaluate how you clarify requirements, break down a problem, make trade-offs, and reason about failure. You do not need to begin with a list of technologies.",
        "Start by clarifying the use cases and constraints. Sketch the high-level components and data flow. Then explain the data model, API boundaries, scaling strategy, reliability, security, and observability. Finish by identifying bottlenecks and explaining how you would validate the design.",
        "When discussing a trade-off, explain both the benefit and the cost. For example, caching can reduce database load but introduces stale-data and invalidation concerns."
      ],
      bullets: [
        "Step 1: Clarify functional and non-functional requirements.",
        "Step 2: Estimate traffic, data size, and growth where relevant.",
        "Step 3: Define APIs and the main data model.",
        "Step 4: Draw the major components and request flow.",
        "Step 5: Explain storage, transactions, and consistency.",
        "Step 6: Explain scaling, caching, and load balancing where needed.",
        "Step 7: Discuss security, failure handling, and observability.",
        "Step 8: Identify trade-offs, bottlenecks, and validation methods."
      ],
      interviewQuestions: [
        {
          question: "How do you approach a system design question you have never seen before?",
          answer: "I clarify the use cases and constraints, identify the core data and API requirements, and sketch a simple design. I then examine capacity, reliability, security, and failure scenarios. I state assumptions explicitly and refine the design as new constraints emerge."
        },
        {
          question: "What do interviewers look for in a system design answer?",
          answer: "They look for structured reasoning, requirement clarification, sound component boundaries, data and API design, scalability awareness, failure handling, security, and the ability to explain trade-offs. The exact technology is usually less important than the reasoning behind the choice."
        },
        {
          question: "How do you justify choosing a database or cache?",
          answer: "I connect the choice to the data model, consistency requirements, access patterns, latency goals, and operational constraints. I explain the trade-offs and how I would validate the choice through query analysis, benchmarks, and monitoring."
        }
      ]
    },
    {
      id: "common-interview-mistakes",
      title: "17. Common Project and System Design Interview Mistakes",
      paragraphs: [
        "Strong candidates explain why a design meets the requirements. Weak answers often consist of technology names without a clear problem, data flow, or trade-off.",
        "Do not claim that microservices, caching, a message broker, or a distributed database automatically makes a system scalable. Each adds benefits only when its costs and failure modes are understood.",
        "When you do not know an exact implementation detail, state your assumptions and explain how you would investigate it. A reasoned answer is better than unsupported certainty."
      ],
      bullets: [
        "Explaining technologies without describing the business problem.",
        "Claiming responsibility for work that was implemented by someone else.",
        "Using microservices without explaining why independent deployment or scaling is needed.",
        "Ignoring database constraints and transaction boundaries.",
        "Assuming a load balancer fixes every performance problem.",
        "Treating retries as safe for every operation.",
        "Ignoring authentication, authorization, and data privacy.",
        "Claiming production readiness without tests, monitoring, or recovery planning.",
        "Confusing average traffic with peak capacity.",
        "Giving no explanation of the trade-offs behind a design decision."
      ],
      interviewQuestions: [
        {
          question: "What if an interviewer challenges your technology choice?",
          answer: "I would explain the requirements that motivated the choice, acknowledge its limitations, and compare reasonable alternatives. If the requirements changed, I would reconsider the design rather than defend the original choice regardless of evidence."
        },
        {
          question: "What if you do not know the answer to a system design question?",
          answer: "I would clarify what I understand, state reasonable assumptions, and work through the problem step by step. I would identify uncertainties and explain how I would validate them rather than inventing details."
        },
        {
          question: "Why is it important to discuss trade-offs?",
          answer: "Every architecture has costs. Discussing trade-offs shows that the candidate understands operational complexity, performance, consistency, security, and maintainability rather than choosing technologies solely because they are popular."
        }
      ]
    },
    {
      id: "system-design-quick-revision",
      title: "18. Quick Revision Notes",
      paragraphs: [
        "A good project explanation connects the business problem to the architecture, request flow, data model, security, testing, deployment, and personal contribution. A good system design answer makes assumptions explicit and justifies decisions against requirements.",
        "Begin with a simple architecture, identify the actual bottlenecks, and add complexity only when the requirements justify it. Be prepared to explain failure handling, data consistency, and how you would measure whether the system works as expected."
      ],
      bullets: [
        "Controller: handles HTTP requests and responses.",
        "Service: contains business workflows and transaction boundaries.",
        "Repository: provides database access.",
        "DTO: controls API input and output.",
        "Vertical scaling: increase resources on one machine.",
        "Horizontal scaling: add more instances.",
        "Load balancer: distributes traffic across targets.",
        "Stateless design: avoids dependence on instance-local request state.",
        "Caching: reduces repeated work but introduces invalidation concerns.",
        "Idempotency: prevents repeated requests from causing unintended duplicate effects.",
        "Timeouts: bound waiting time for an operation.",
        "Circuit breaker: limits calls to an unhealthy dependency.",
        "Observability: uses logs, metrics, and traces to understand behavior.",
        "Production readiness: includes security, tests, monitoring, deployment, and recovery."
      ],
      interviewQuestions: [
        {
          question: "Give a concise answer to 'How would you design a scalable Spring Boot application?'",
          answer: "I would start with clear functional and non-functional requirements, then design a modular Spring Boot API with suitable database constraints and transaction boundaries. I would measure the workload, optimize queries, and introduce load balancing, horizontal scaling, or caching when justified. I would also implement security, timeouts, observability, automated tests, and a safe deployment strategy."
        },
        {
          question: "What is the most important principle in system design?",
          answer: "Design around the requirements and constraints. Start with a simple solution, understand its trade-offs, measure actual bottlenecks, and evolve the architecture when there is a clear reason."
        },
        {
          question: "How should you prepare to explain your own project?",
          answer: "Practise a short overview, a component-level architecture explanation, one end-to-end API walkthrough, one real technical challenge, and the reasoning behind your main design choices. Be precise about what you personally implemented and what you would improve next."
        }
      ]
    }
  ]
};
