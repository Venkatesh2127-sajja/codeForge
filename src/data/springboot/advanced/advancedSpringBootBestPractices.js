
export const advancedSpringBootBestPractices = {
  id: 1510,
  title: "Advanced Spring Boot Best Practices",
  slug: "advanced-spring-boot-best-practices",
  topicTitle: "Spring Boot Advanced",
  description:
    "Bring advanced Spring Boot concepts together with maintainability, performance, reliability, security, and testing.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "design-principles",
      title: "1. Design for Maintainability",
      paragraphs: [
        "Maintainability means that developers can understand, modify, test, and extend an application without introducing unnecessary complexity. A maintainable Spring Boot application separates responsibilities into controllers, services, repositories, configuration classes, and domain objects.",
        "Controllers should handle HTTP concerns such as request mapping, request validation, and response status codes. Service classes should coordinate business operations and transaction boundaries. Repositories should handle persistence. Avoid placing substantial business rules directly inside controllers or repository implementations.",
        "Use constructor injection to make dependencies explicit. It makes required dependencies visible, supports unit testing, and allows fields to remain final. Avoid field injection when constructor injection is practical.",
        "Create interfaces when they establish a useful boundary, support multiple implementations, or represent a domain contract. Do not create an interface for every class automatically. Abstraction should reduce coupling rather than add unnecessary layers.",
        "Keep business logic independent of transport details. For example, a service should not need HttpServletRequest to calculate an order total. This separation makes business rules easier to test and reuse.",
        "Use clear names, small methods, cohesive classes, and consistent package organization. Organize larger applications around business features when that makes dependencies easier to understand."
      ],
      code: {
        language: "java",
        code: "public record CreateOrderRequest(\n        @NotBlank String productCode,\n        @Positive int quantity\n) {}\n\n@RestController\n@RequestMapping(\"/api/orders\")\nclass OrderController {\n    private final OrderService orderService;\n\n    OrderController(OrderService orderService) {\n        this.orderService = orderService;\n    }\n\n    @PostMapping\n    ResponseEntity<OrderResponse> createOrder(\n            @Valid @RequestBody CreateOrderRequest request) {\n        OrderResponse response = orderService.createOrder(request);\n        return ResponseEntity.status(HttpStatus.CREATED).body(response);\n    }\n}\n\n@Service\nclass OrderService {\n    private final OrderRepository orderRepository;\n\n    OrderService(OrderRepository orderRepository) {\n        this.orderRepository = orderRepository;\n    }\n\n    @Transactional\n    public OrderResponse createOrder(CreateOrderRequest request) {\n        // Validate business rules and persist the order here.\n        // Map the saved entity to an API response.\n        throw new UnsupportedOperationException(\"Implement business logic\");\n    }\n}"
      }
    },
    {
      id: "dependency-injection",
      title: "2. Dependency Injection and Component Boundaries",
      paragraphs: [
        "Spring's dependency injection container creates and wires managed objects, commonly called beans. Prefer constructor injection for required dependencies because it makes a class's requirements explicit.",
        "Avoid circular dependencies in which service A requires service B while service B also requires service A. Such dependencies often indicate that responsibilities should be separated or that a third component should coordinate the workflow.",
        "Do not make every class a Spring bean automatically. Simple immutable value objects and pure utility logic may not need container management. Use Spring annotations where lifecycle management, configuration, transactions, or other framework features are genuinely needed.",
        "Be aware that annotations such as @Transactional, @Async, and caching annotations commonly rely on Spring proxies. Calls made from one method to another method on the same object can bypass proxy-based behavior."
      ],
      code: {
        language: "java",
        code: "@Service\npublic class PaymentService {\n    private final PaymentGateway paymentGateway;\n    private final PaymentRepository paymentRepository;\n\n    public PaymentService(\n            PaymentGateway paymentGateway,\n            PaymentRepository paymentRepository) {\n        this.paymentGateway = paymentGateway;\n        this.paymentRepository = paymentRepository;\n    }\n\n    public PaymentResult pay(PaymentRequest request) {\n        PaymentResult result = paymentGateway.charge(request);\n        paymentRepository.save(Payment.from(request, result));\n        return result;\n    }\n}"
      }
    },
    {
      id: "configuration-management",
      title: "3. Externalize Configuration",
      paragraphs: [
        "Application configuration should vary by environment without requiring source-code changes. Keep environment-specific URLs, feature settings, timeouts, and pool sizes outside business logic.",
        "Use application.yml for safe defaults and environment variables or protected deployment configuration for environment-specific values. Never commit real passwords, private keys, API tokens, or database credentials to source control.",
        "Use @ConfigurationProperties for related settings instead of scattering many @Value expressions throughout the codebase. It groups configuration, supports type conversion, and can be validated.",
        "Separate configuration values from secrets. A checked-in example configuration can contain placeholder values, but production credentials must come from an approved secret-management mechanism."
      ],
      code: {
        language: "java",
        code: "@ConfigurationProperties(prefix = \"clients.inventory\")\n@Validated\npublic record InventoryClientProperties(\n        @NotBlank String baseUrl,\n        @Positive Duration connectTimeout,\n        @Positive Duration readTimeout\n) {}\n\n@Configuration(proxyBeanMethods = false)\n@EnableConfigurationProperties(InventoryClientProperties.class)\nclass InventoryClientConfiguration {\n    // Configure and expose the inventory HTTP client here.\n}"
      }
    },
    {
      id: "api-design",
      title: "4. Design Stable and Validated APIs",
      paragraphs: [
        "Use request and response DTOs to define the public API contract. Returning JPA entities directly can expose internal fields, couple clients to database design, and trigger lazy-loading or serialization problems.",
        "Validate incoming requests at the API boundary using Jakarta Bean Validation. Use @Valid with @RequestBody and appropriate constraints such as @NotBlank, @Positive, @Email, and @Size.",
        "Use meaningful HTTP status codes. Typical choices include 200 for successful reads or updates, 201 for resource creation, 204 for successful operations without a response body, 400 for invalid requests, 404 for missing resources, and 409 for business conflicts.",
        "Return consistent error responses. Spring Framework's ProblemDetail support can represent structured API errors. Do not expose stack traces, SQL statements, secrets, or internal infrastructure details to clients.",
        "Document endpoints, request schemas, response schemas, authentication requirements, and error cases. Version APIs when a breaking change cannot be avoided through backward-compatible evolution."
      ],
      code: {
        language: "java",
        code: "@RestControllerAdvice\nclass ApiExceptionHandler {\n\n    @ExceptionHandler(OrderNotFoundException.class)\n    ResponseEntity<ProblemDetail> handleNotFound(\n            OrderNotFoundException exception) {\n        ProblemDetail problem = ProblemDetail.forStatusAndDetail(\n                HttpStatus.NOT_FOUND,\n                \"The requested order was not found.\");\n        problem.setTitle(\"Order not found\");\n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problem);\n    }\n}"
      }
    },
    {
      id: "database-transactions",
      title: "5. Database Transactions and Data Integrity",
      paragraphs: [
        "Use @Transactional to define a business operation that must succeed or fail as a unit. Put the transaction boundary at the service layer when it coordinates multiple repository operations.",
        "By default, Spring rolls back declarative transactions for unchecked exceptions and Errors. Checked exceptions do not trigger rollback by default; configure rollbackFor when the business requirement calls for it.",
        "Use database constraints such as primary keys, foreign keys, unique constraints, and NOT NULL constraints to protect data integrity. Application validation improves error messages, but it cannot replace database constraints under concurrent requests.",
        "Keep transactions reasonably short. Avoid holding database connections and locks while making slow remote HTTP calls. For workflows involving multiple services, consider explicit states, idempotency, and a saga or outbox pattern where appropriate.",
        "Understand transaction propagation and isolation before changing them. REQUIRES_NEW, stronger isolation, and pessimistic locking each have consequences for connection usage, locking, and throughput.",
        "Do not assume that a database transaction also covers a remote payment gateway, message broker, or another independent service. A local transaction normally protects only its configured transactional resource."
      ],
      code: {
        language: "java",
        code: "@Service\npublic class TransferService {\n    private final AccountRepository accountRepository;\n\n    public TransferService(AccountRepository accountRepository) {\n        this.accountRepository = accountRepository;\n    }\n\n    @Transactional\n    public void transfer(Long sourceId, Long targetId, BigDecimal amount) {\n        if (amount == null || amount.signum() <= 0) {\n            throw new IllegalArgumentException(\"Amount must be positive\");\n        }\n\n        Account source = accountRepository.findById(sourceId)\n                .orElseThrow(() -> new AccountNotFoundException(sourceId));\n        Account target = accountRepository.findById(targetId)\n                .orElseThrow(() -> new AccountNotFoundException(targetId));\n\n        source.debit(amount);\n        target.credit(amount);\n        // Both updates participate in the same transaction.\n    }\n}"
      }
    },
    {
      id: "performance-measurement",
      title: "6. Measure Before Optimizing",
      paragraphs: [
        "Performance tuning should start with evidence. Measure request latency, throughput, error rate, CPU usage, memory pressure, garbage collection, database query duration, and external dependency latency.",
        "Use percentiles such as p50, p95, and p99 instead of relying only on average response time. An acceptable average can hide slow requests experienced by a significant portion of users.",
        "Enable Spring Boot Actuator and expose only the management endpoints required by your monitoring system. Micrometer can publish metrics to supported monitoring backends.",
        "Use profilers, application traces, query plans, and load tests to identify the actual bottleneck. Adding more threads or caching every result may increase resource consumption or make consistency harder.",
        "Set measurable performance goals before optimization. After changing code or configuration, compare results under comparable load and data conditions."
      ],
      bullets: [
        "Latency: time required to complete a request.",
        "Throughput: requests or operations completed per unit of time.",
        "Error rate: proportion of operations that fail.",
        "Saturation: how close a resource is to its practical capacity.",
        "p95 latency: 95 percent of measured requests complete at or below this duration."
      ]
    },
    {
      id: "database-performance",
      title: "7. Database and Connection Pool Performance",
      paragraphs: [
        "A slow API may be caused by an inefficient SQL query, a missing index, excessive database round trips, connection-pool exhaustion, or loading more data than necessary.",
        "Inspect generated SQL and database execution plans before adding indexes. Indexes can improve reads but consume storage and add work to inserts, updates, and deletes.",
        "Avoid N+1 query problems in JPA. Use appropriate fetch joins, entity graphs, projections, or batch fetching based on the query and use case. Avoid fetching large object graphs indiscriminately.",
        "Paginate large result sets and return only the fields clients need. For high-volume read APIs, DTO projections can be more efficient than loading complete entity graphs.",
        "Configure the JDBC connection pool based on database capacity and measured workload. Increasing the pool size beyond what the database can handle may increase contention rather than improve throughput.",
        "Monitor active, idle, pending, and timed-out connection-pool requests. A pool timeout can indicate slow queries, leaked connections, long transactions, or insufficient database capacity."
      ],
      code: {
        language: "java",
        code: "public interface ProductRepository extends JpaRepository<Product, Long> {\n\n    @Query(\"\"\"\n        select new com.example.api.ProductSummary(\n            p.id, p.name, p.price\n        )\n        from Product p\n        where p.active = true\n        order by p.name\n        \"\"\")\n    Page<ProductSummary> findActiveSummaries(Pageable pageable);\n}"
      }
    },
    {
      id: "http-timeouts",
      title: "8. Configure Timeouts for External Services",
      paragraphs: [
        "External HTTP calls can stall when a remote service is slow or unavailable. Configure connection and response timeouts appropriate to the operation and the end-to-end latency budget.",
        "Use connection pooling and resource limits for HTTP clients where appropriate. Monitor remote call duration, timeout counts, connection failures, and response status codes.",
        "A timeout does not always mean the remote operation did not happen. For example, a payment request might have reached the provider even though the response was lost. Use provider-supported idempotency keys or reconciliation before blindly repeating non-idempotent operations.",
        "Do not set every timeout to the same arbitrary large value. Derive limits from the API's service-level objective, expected remote latency, and the time remaining for the overall request."
      ],
      bullets: [
        "Connection timeout: maximum time to establish a connection.",
        "Response or read timeout: maximum wait for the relevant response activity, depending on the client implementation.",
        "Overall deadline: maximum time allowed for the complete operation, including retries where applicable.",
        "A timeout should be paired with clear error handling and metrics."
      ]
    },
    {
      id: "bounded-executors",
      title: "9. Use Bounded Executors and Controlled Concurrency",
      paragraphs: [
        "Asynchronous execution can keep request threads from waiting for suitable background tasks, but it does not make work free. Every task consumes CPU, memory, connections, or downstream capacity.",
        "Configure thread pools with intentional core and maximum sizes, queue capacities, thread names, and rejection behavior. Avoid unbounded queues that can accumulate work until the application runs out of memory.",
        "Choose a rejection policy deliberately. Running rejected work on the caller thread can introduce unexpected request latency; silently discarding tasks can lose important work. For business-critical tasks, use durable messaging or persistent job records instead of relying only on an in-memory executor.",
        "Separate executors for workloads with different resource profiles. A slow reporting task should not exhaust the threads needed for latency-sensitive operations.",
        "Monitor active threads, queue depth, rejected tasks, task duration, and task failures. Include a plan for graceful shutdown and in-flight work."
      ],
      code: {
        language: "java",
        code: "@Configuration\n@EnableAsync\nclass AsyncConfiguration {\n\n    @Bean(\"reportExecutor\")\n    ThreadPoolTaskExecutor reportExecutor() {\n        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();\n        executor.setCorePoolSize(4);\n        executor.setMaxPoolSize(8);\n        executor.setQueueCapacity(100);\n        executor.setThreadNamePrefix(\"report-\");\n        executor.setWaitForTasksToCompleteOnShutdown(true);\n        executor.setAwaitTerminationSeconds(20);\n        executor.initialize();\n        return executor;\n    }\n}"
      }
    },
    {
      id: "retry-and-circuit-breaker",
      title: "10. Design Retries and Circuit Breakers Carefully",
      paragraphs: [
        "Retries can help with temporary failures such as brief network interruptions, but retrying every failure can amplify an outage. Retry only failures that are plausibly transient and only when the operation can be repeated safely.",
        "Use a small retry limit, backoff, and jitter where appropriate. Coordinate retry budgets across application layers; a client, gateway, and service that all retry independently can multiply the total number of calls.",
        "A circuit breaker temporarily stops calls to a dependency after a configured failure pattern and later permits controlled recovery checks. It is not a replacement for timeouts or bulkheads.",
        "A fallback should provide a valid degraded result or a clear error. Returning fabricated success for a failed payment, order, or inventory reservation can corrupt business behavior.",
        "Use Resilience4j or another suitable library when its behavior and operational configuration are understood. Test open, half-open, closed, timeout, retry, and fallback scenarios relevant to the application."
      ],
      bullets: [
        "Timeout limits how long one attempt can wait.",
        "Retry decides whether another attempt should be made.",
        "Circuit breaker limits repeated calls to a failing dependency.",
        "Bulkhead limits the resources consumed by a workload or dependency.",
        "Idempotency prevents repeated requests from creating unintended duplicate effects."
      ]
    },
    {
      id: "caching",
      title: "11. Cache Deliberately",
      paragraphs: [
        "Caching can reduce database load and improve response time for frequently read data, but cached values may become stale. Define freshness requirements and invalidation rules before introducing a cache.",
        "Use Spring's @Cacheable, @CachePut, and @CacheEvict only when their behavior matches the data lifecycle. Select keys that uniquely identify the result and avoid putting sensitive information into cache keys or diagnostic logs.",
        "Understand proxy-based caching: calling a cached method from another method on the same instance can bypass the proxy and therefore bypass caching.",
        "Choose an appropriate provider and TTL. In a multi-instance application, local caches can diverge between instances; distributed caching or explicit invalidation may be required.",
        "Monitor hit rate, misses, evictions, memory usage, and stale-data incidents. Do not assume that adding a cache automatically improves end-to-end performance."
      ]
    },
    {
      id: "events-and-background-work",
      title: "12. Use Events and Background Processing with Clear Guarantees",
      paragraphs: [
        "Spring application events are useful for decoupling components inside one application process. They are not automatically durable messages and are not a replacement for a message broker when independent services or durable delivery are required.",
        "By default, Spring application event listeners run synchronously in the publishing thread. An asynchronous listener changes execution behavior but does not automatically guarantee delivery after a process crash.",
        "Use @TransactionalEventListener with the appropriate phase when a listener must react to a transaction outcome. AFTER_COMMIT is useful for work that should only start after a successful commit, but it does not make the follow-up work durable.",
        "For reliable integration between a database transaction and message publication, consider a transactional outbox. Store the business change and an outgoing event record in the same transaction, then publish pending records through a separate process.",
        "Consumers should be idempotent because retries and duplicate message delivery are common in distributed systems. Track event identifiers or business operation identifiers when needed."
      ]
    },
    {
      id: "security",
      title: "13. Apply Production Security Practices",
      paragraphs: [
        "Follow least privilege: each application component, service account, database user, and deployment identity should have only the permissions it needs.",
        "Store credentials in a secret manager or protected deployment configuration. Rotate secrets when required and never write access tokens, passwords, private keys, or sensitive personal data to logs.",
        "Validate input at trust boundaries and use parameterized queries or repository APIs rather than building SQL from untrusted strings. Validation complements authorization; it does not replace it.",
        "Apply authentication and authorization consistently. Check access to the specific resource being requested, not just whether a user is authenticated.",
        "Protect Actuator and management endpoints. Expose only the required endpoints, restrict network access, and apply appropriate authentication and authorization. Health details and environment information can reveal sensitive infrastructure data.",
        "Use HTTPS, secure cookie settings where relevant, dependency updates, and appropriate CORS and CSRF configuration for the application's authentication model. Do not disable security controls without understanding the consequences.",
        "Avoid returning raw exception messages to clients. Use a safe external error message and retain useful diagnostic details in access-controlled logs."
      ],
      bullets: [
        "Never commit production secrets to Git.",
        "Do not log authorization headers or full credentials.",
        "Authorize every protected operation and resource.",
        "Use supported dependencies and patch known vulnerabilities.",
        "Keep management interfaces separate from public business APIs where possible."
      ]
    },
    {
      id: "observability",
      title: "14. Logs, Metrics, Traces, and Health Checks",
      paragraphs: [
        "Observability helps operators understand what an application is doing and why it is failing. Logs provide event details, metrics show aggregate behavior over time, and distributed traces connect work across components.",
        "Use structured, searchable logs with consistent fields such as timestamp, severity, service name, request or correlation identifier, and relevant operation name. Avoid logging secrets or excessive personal data.",
        "Use Spring Boot Actuator and Micrometer to expose useful health and metrics information. Secure management endpoints and avoid exposing internal details to unauthenticated clients.",
        "Liveness and readiness have different meanings. Liveness asks whether the process should be restarted; readiness asks whether the instance should receive traffic. A dependency outage does not always mean that restarting every application instance is useful.",
        "Define alerts around user impact and actionable symptoms, such as sustained high error rates, latency regressions, queue saturation, or connection-pool exhaustion. Avoid high-cardinality metric labels such as raw user IDs or request URLs containing unique identifiers.",
        "Create dashboards and alerts for important business operations as well as infrastructure. A server can be healthy at the process level while an essential business workflow is failing."
      ]
    },
    {
      id: "testing-strategy",
      title: "15. Build a Balanced Testing Strategy",
      paragraphs: [
        "Unit tests should verify business rules quickly without starting the entire Spring application. Inject dependencies or use small test doubles to isolate the behavior under test.",
        "Use Spring integration tests for important wiring, configuration, transaction, serialization, repository, and security behavior. Avoid starting a full application context for every simple calculation test.",
        "Use @WebMvcTest for focused Spring MVC tests and @DataJpaTest for focused persistence tests when these slices fit the requirement. Use @SpringBootTest when the broader application context is genuinely part of what must be verified.",
        "Test both successful and failure paths. Include invalid inputs, missing resources, authorization failures, dependency timeouts, database constraints, duplicate requests, and relevant rollback behavior.",
        "For asynchronous and scheduled tasks, verify completion, error handling, shutdown behavior, and repeated execution. Avoid fragile tests that depend on arbitrary sleeps when synchronization or a controllable executor can be used.",
        "Use Testcontainers or equivalent realistic infrastructure when database or broker behavior must match production closely. Keep test data isolated and make cleanup reliable.",
        "A passing test suite is evidence of tested behavior, not proof that a system cannot fail. Combine tests with monitoring, operational drills, and controlled load testing."
      ],
      code: {
        language: "java",
        code: "@WebMvcTest(OrderController.class)\nclass OrderControllerTest {\n\n    @Autowired\n    MockMvc mockMvc;\n\n    @MockitoBean\n    OrderService orderService;\n\n    @Test\n    void rejectsInvalidQuantity() throws Exception {\n        mockMvc.perform(post(\"/api/orders\")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(\"\"\"\n                    {\"productCode\":\"BOOK-1\",\"quantity\":0}\n                    \"\"\"))\n            .andExpect(status().isBadRequest());\n    }\n}"
      }
    },
    {
      id: "deployment-readiness",
      title: "16. Plan Deployment, Shutdown, and Recovery",
      paragraphs: [
        "Production readiness includes more than code quality. Plan deployment sequencing, database migration compatibility, configuration changes, health checks, rollback, backups, and recovery procedures.",
        "Prefer backward-compatible database migrations during rolling deployments. For example, add a new nullable column before deploying code that requires it, migrate data safely, and remove obsolete schema only after old application versions no longer depend on it.",
        "Configure graceful shutdown so the application stops accepting new work and gets an opportunity to finish in-flight requests or tasks within a defined period. Graceful shutdown does not guarantee that all work survives a crash.",
        "Use resource requests and limits appropriate to the deployment platform, and verify that the JVM's memory settings are compatible with container limits. Watch for CPU throttling, out-of-memory kills, and insufficient shutdown time.",
        "Test backups by restoring them. A backup that has never been restored is not a verified recovery strategy. Define recovery time and recovery point objectives for important data.",
        "Make rollback and incident procedures practical: document who acts, which signals to inspect, how to disable a problematic feature, and how to restore a known-good version."
      ]
    },
    {
      id: "code-quality",
      title: "17. Code Quality and Dependency Management",
      paragraphs: [
        "Keep dependencies current and supported. Review release notes, security advisories, and compatibility before upgrading Spring Boot, the JDK, database drivers, or third-party libraries.",
        "Use the Spring Boot dependency management model to keep compatible dependency versions aligned. Avoid overriding managed versions without a clear reason and a test plan.",
        "Run automated checks in CI, such as compilation, unit and integration tests, static analysis, dependency vulnerability scanning, and formatting or style checks where appropriate.",
        "Remove dead code, unused dependencies, and duplicated logic. Document architectural decisions that would otherwise be difficult to infer from code.",
        "Use feature flags carefully. Every flag has a lifecycle: define who owns it, how it is configured, how it is monitored, and when it should be removed."
      ],
      bullets: [
        "Build reproducibly using a controlled JDK and dependency configuration.",
        "Review dependency updates rather than applying them blindly.",
        "Run the same essential verification steps in CI and before release.",
        "Document operationally important configuration and architecture decisions.",
        "Keep application behavior simple unless requirements justify additional abstraction."
      ]
    },
    {
      id: "common-mistakes",
      title: "18. Common Advanced Spring Boot Mistakes",
      bullets: [
        "Optimizing code before measuring the actual bottleneck.",
        "Using @Async or in-memory events as though they provide durable job delivery.",
        "Using unbounded executor queues or unlimited retries.",
        "Retrying non-idempotent operations without deduplication or reconciliation.",
        "Opening database transactions around slow remote calls unnecessarily.",
        "Returning JPA entities directly from public API endpoints.",
        "Caching data without a clear TTL or invalidation strategy.",
        "Assuming @Transactional or @Cacheable works on every same-class method call.",
        "Exposing all Actuator endpoints to the public internet.",
        "Logging credentials, tokens, full request bodies, or sensitive personal data.",
        "Treating a process health check as proof that all business dependencies are healthy.",
        "Using broad integration tests for every small unit of business logic.",
        "Assuming a successful deployment means rollback and recovery have been tested.",
        "Adding microservices, custom starters, or distributed infrastructure without a real requirement."
      ]
    },
    {
      id: "production-checklist",
      title: "19. Production Readiness Checklist",
      paragraphs: [
        "Use this checklist before releasing a Spring Boot application. Adapt it to the application's risk, scale, compliance requirements, and deployment environment."
      ],
      bullets: [
        "API contracts and request validation are documented and tested.",
        "Business logic, persistence, and transport concerns are separated appropriately.",
        "Transactions and database constraints protect important business invariants.",
        "Database queries, indexes, and connection pools have been reviewed.",
        "HTTP clients and executors have timeouts, capacity limits, and failure handling.",
        "Retries are bounded and safe for the operation being retried.",
        "Caches have documented freshness and invalidation behavior.",
        "Asynchronous and event-driven workflows have explicit delivery guarantees.",
        "Authentication, authorization, secret management, and management endpoint access are configured.",
        "Logs, metrics, health checks, dashboards, and actionable alerts are available.",
        "Unit, integration, security, and relevant failure-path tests pass.",
        "Configuration is externalized and validated at startup.",
        "Graceful shutdown, deployment rollback, backups, and recovery procedures have been tested.",
        "Dependencies are supported and automated CI checks are enabled."
      ]
    },
    {
      id: "interview",
      title: "20. Advanced Spring Boot Best Practices — Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you improve a slow Spring Boot API?",
          answer: "Measure the request path first. Inspect latency percentiles, database queries and indexes, connection pools, external calls, serialization, CPU, memory, and garbage collection. Apply targeted changes and verify the result using regression tests and load measurements."
        },
        {
          question: "Why should executor queues and retries be bounded?",
          answer: "Unbounded queues can accumulate work until memory is exhausted, while unlimited retries can amplify a dependency outage. Capacity limits, deadlines, retry budgets, and clear rejection behavior help prevent failure amplification."
        },
        {
          question: "How do you manage secrets?",
          answer: "Use a suitable secret manager or protected deployment configuration, restrict access, rotate credentials when required, and avoid committing or logging secrets. Grant each application component only the permissions it needs."
        },
        {
          question: "What should be included in production readiness?",
          answer: "Security controls, automated tests, health checks, monitoring, resource limits, externalized configuration, safe deployment and rollback, graceful shutdown, backups, and a tested recovery plan."
        },
        {
          question: "Should advanced Spring features always be used?",
          answer: "No. Use them when requirements or measurements justify the complexity. Straightforward synchronous code is often easier to debug and maintain than unnecessary asynchronous processing, caching, custom starters, or distributed infrastructure."
        },
        {
          question: "Why is constructor injection preferred?",
          answer: "It makes required dependencies explicit, supports immutable fields, simplifies unit testing, and avoids hidden dependencies created by field injection."
        },
        {
          question: "What is the difference between a unit test and an integration test?",
          answer: "A unit test verifies a focused piece of logic in isolation. An integration test verifies collaboration between components such as Spring configuration, repositories, transactions, security filters, or external infrastructure."
        },
        {
          question: "Why should controllers not contain business logic?",
          answer: "Controllers should focus on HTTP concerns. Keeping business rules in the service or domain layer makes them reusable, easier to test, and independent of a particular API endpoint."
        },
        {
          question: "Why should APIs use DTOs instead of exposing JPA entities?",
          answer: "DTOs provide a stable public contract, prevent accidental exposure of internal fields, avoid coupling API clients to database structure, and help control serialization and data fetching."
        },
        {
          question: "What is the N+1 query problem?",
          answer: "It occurs when an initial query loads a set of records and additional queries are executed for each record's related data. Fetch joins, entity graphs, projections, and batch fetching can help when used appropriately."
        },
        {
          question: "Why is connection-pool tuning important?",
          answer: "A pool that is too small can cause waiting and timeouts; one that is too large can overwhelm the database. Pool size should be selected using database capacity and measured concurrency."
        },
        {
          question: "What is the difference between a timeout and a retry?",
          answer: "A timeout limits how long an operation can wait. A retry decides whether another attempt should be made after a failure. Retries need bounded attempts, backoff, and safe handling of repeated operations."
        },
        {
          question: "What is a circuit breaker?",
          answer: "A circuit breaker temporarily blocks calls to a failing dependency after configured conditions are met. It helps prevent repeated calls from consuming resources during an outage, but it does not replace timeouts or retries."
        },
        {
          question: "Why must retried operations be idempotent?",
          answer: "A failed response does not prove that the original operation failed. Idempotency or deduplication prevents repeated attempts from creating unintended duplicate effects, such as duplicate payments or orders."
        },
        {
          question: "What are the risks of caching?",
          answer: "Cached data can become stale, invalidation can be difficult, and cache keys may be incorrect. Define freshness requirements, key design, TTL, invalidation, provider behavior, and monitoring before deploying a cache."
        },
        {
          question: "Are Spring application events durable?",
          answer: "No. Spring application events are normally in-process notifications. They are useful for local decoupling, but reliable delivery across process crashes or services requires a durable mechanism such as a message broker and, when appropriate, a transactional outbox."
        },
        {
          question: "What problem does the transactional outbox solve?",
          answer: "It stores the business change and outgoing event record in the same database transaction. A separate publisher sends pending events, reducing the risk of committing data without publishing the corresponding message. Consumers still need idempotency because duplicate delivery can occur."
        },
        {
          question: "What is the difference between liveness and readiness?",
          answer: "Liveness indicates whether the process should continue running or be restarted. Readiness indicates whether the instance should receive traffic. Their failure policies should reflect the deployment platform and application architecture."
        },
        {
          question: "Why should Actuator endpoints be protected?",
          answer: "Management endpoints can reveal health details, metrics, configuration, or operational information. Expose only what is necessary and apply appropriate authentication, authorization, and network restrictions."
        },
        {
          question: "How do you test asynchronous processing?",
          answer: "Test successful completion, failure handling, task rejection, and relevant shutdown behavior. Prefer synchronization or controllable executors over arbitrary sleeps, and use durable infrastructure tests when delivery guarantees depend on a broker or database."
        },
        {
          question: "What is graceful shutdown?",
          answer: "Graceful shutdown allows the application to stop accepting new work and gives in-flight requests or tasks a limited period to finish. It reduces disruption but does not guarantee survival of work during a crash."
        },
        {
          question: "How do you manage database schema changes during rolling deployments?",
          answer: "Use backward-compatible migrations. Introduce compatible schema changes first, deploy code that can work with both versions where necessary, migrate data, and remove obsolete schema only after older application versions no longer depend on it."
        },
        {
          question: "Why are p95 and p99 latency useful?",
          answer: "They show the experience of slower requests that averages can hide. p95 is the latency at or below which 95 percent of measured requests complete; p99 highlights the slowest one percent."
        },
        {
          question: "How do you prevent sensitive information from appearing in logs?",
          answer: "Use structured logging with deliberate field selection, redact secrets and personal data, avoid logging authorization headers or full sensitive request bodies, and restrict access and retention of operational logs."
        },
        {
          question: "How do you choose between synchronous and asynchronous processing?",
          answer: "Use synchronous processing when the caller needs an immediate result and the operation fits the request deadline. Use asynchronous processing for suitable background work, but choose durable queues or persistent job records when losing work during a process crash is unacceptable."
        },
        {
          question: "Why should database constraints complement application validation?",
          answer: "Application validation improves feedback, but concurrent requests can pass the same check at the same time. Database constraints enforce important invariants at the persistence boundary."
        },
        {
          question: "What should you monitor in a Spring Boot application?",
          answer: "Monitor latency percentiles, throughput, error rates, CPU, memory, garbage collection, connection pools, executor queues, database query behavior, external dependency latency, and important business workflow outcomes."
        },
        {
          question: "How do you decide whether to introduce a microservice or custom starter?",
          answer: "Start from a concrete requirement such as independent deployment, ownership boundaries, or reusable configuration. Evaluate operational cost, testing, observability, versioning, and failure modes before adding the extra architecture."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "21. Quick Revision Notes",
      paragraphs: [
        "Advanced Spring Boot best practices are about making the application predictable, secure, observable, testable, and maintainable—not about using the largest number of framework features.",
        "Measure before optimizing. Keep business rules in the appropriate layer, use constructor injection, validate API input, protect data with transactions and database constraints, and externalize configuration.",
        "Bound resource consumption with timeouts, executor limits, connection-pool settings, and retry budgets. Use caching, events, and asynchronous execution only when their consistency and delivery guarantees are understood.",
        "Secure management endpoints and secrets, monitor both technical and business behavior, test failure paths, and prepare for graceful shutdown, rollback, backup restoration, and recovery."
      ],
      bullets: [
        "Maintainability: clear responsibilities, cohesive classes, and explicit dependencies.",
        "Performance: measure latency and resource use before tuning.",
        "Reliability: timeouts, bounded retries, idempotency, and capacity limits.",
        "Data integrity: transaction boundaries plus database constraints.",
        "Security: least privilege, validated input, protected secrets, and restricted management endpoints.",
        "Testing: focused unit tests, meaningful integration tests, and failure-path coverage.",
        "Operations: logs, metrics, health checks, graceful shutdown, rollback, and tested recovery.",
        "Architecture: choose the simplest design that satisfies the actual requirements."
      ]
    }
  ]
};
