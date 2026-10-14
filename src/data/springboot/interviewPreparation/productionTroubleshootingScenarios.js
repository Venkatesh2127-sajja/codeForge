
export const productionTroubleshootingScenarios = {
  id: 1609,
  title: "Production Troubleshooting Scenarios",
  slug: "production-troubleshooting-scenarios",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Master real-world Spring Boot production troubleshooting, including API failures, security errors, database timeouts, slow queries, memory problems, thread-pool saturation, configuration issues, and external-service failures.",
  estimatedTime: "60 min",
  sections: [
    {
      id: "api-errors",
      title: "1. API and Application Errors",
      paragraphs: [
        "Production troubleshooting begins by identifying the exact failure rather than immediately changing code. An HTTP status code gives an initial clue, but logs, traces, request details, and application metrics help identify the root cause.",
        "For HTTP 500 errors, find the exception and stack trace. For 404 errors, verify request mappings and deployment context. For 401 and 403 errors, inspect authentication and authorization separately.",
        "Use a correlation ID or trace ID to connect the same request across controllers, services, repositories, and downstream services. Never log passwords, bearer tokens, or unnecessary personal information."
      ],
      bullets: [
        "Check the URL, HTTP method, request headers, request body, and response.",
        "Find the timestamp, request ID, affected endpoint, and application instance.",
        "Inspect the exception type and the first relevant application stack-trace frame.",
        "Compare the failure with recent deployments and configuration changes.",
        "Confirm whether the problem affects one endpoint, one instance, or the entire application."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long id) {

        return ResponseEntity.ok(orderService.getOrder(id));
    }
}

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponse getOrder(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() ->
                new OrderNotFoundException(id));

        return new OrderResponse(
            order.getId(),
            order.getStatus()
        );
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(Long id) {
        super("Order not found: " + id);
    }
}

record OrderResponse(Long id, String status) {}`,
      },
      interviewQuestions: [
        {
          question: "Your API suddenly returns HTTP 500. How do you investigate?",
          answer: "Identify the affected endpoint and request ID, inspect the logs and stack trace, locate the exception, and check recent code or configuration changes. Reproduce the request where possible, verify dependent services and database operations, fix the root cause, and add a regression test. Avoid treating every 500 error as a database problem."
        },
        {
          question: "Your API returns 404 for an endpoint you implemented. What do you check?",
          answer: "Verify the URL, HTTP method, class-level and method-level mappings, application context path, active profiles, component scanning, and deployment version. Also check whether the request reaches the expected application instance or gateway."
        },
        {
          question: "Your API returns 401 even with a token. What do you check?",
          answer: "Check the Authorization header format, token expiry, signature validation, signing-key configuration, issuer and audience requirements if configured, clock differences, and security-filter execution. Never print the actual token in logs."
        },
        {
          question: "Your API returns 403 after successful login. What might be wrong?",
          answer: "Authentication may have succeeded while authorization failed. Check roles, authorities, URL matchers, method-security annotations, and CSRF configuration. For example, a user with ROLE_USER may not be allowed to access an endpoint requiring ROLE_ADMIN."
        },
        {
          question: "How do you distinguish a 400 error from a 500 error?",
          answer: "A 400 generally indicates that the request is invalid or cannot be processed as submitted. A 500 indicates an unexpected server-side failure. Investigate the actual exception and API contract because incorrect exception handling can produce misleading status codes."
        }
      ]
    },
    {
      id: "404-and-routing",
      title: "2. Endpoint Mapping and Request Routing",
      paragraphs: [
        "An endpoint may work locally but return 404 after deployment because the deployed artifact, context path, gateway route, or active profile differs from the local environment.",
        "Spring MVC maps requests using annotations such as @RequestMapping, @GetMapping, and @PostMapping. A request must match the configured path and HTTP method. A path that exists with the wrong method may produce HTTP 405 rather than 404.",
        "When an API sits behind a gateway or reverse proxy, troubleshoot the complete route from the client to the application instead of checking only the controller."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @GetMapping("/{id}")
    public ProductResponse getProduct(
            @PathVariable Long id) {
        // Fetch and return the product.
        return new ProductResponse(id, "Keyboard");
    }

    @GetMapping
    public List<ProductResponse> getProducts(
            @RequestParam(defaultValue = "0") int page) {
        // Return a page of products.
        return List.of(new ProductResponse(1L, "Keyboard"));
    }
}

record ProductResponse(Long id, String name) {}`,
      },
      bullets: [
        "Confirm that /api/v1/products/1 is the expected path.",
        "Check whether the request uses GET, POST, PUT, or another method correctly.",
        "Inspect server.servlet.context-path and any gateway prefix rewriting.",
        "Verify controller component scanning and application startup logs.",
        "Compare the deployed JAR or image version with the version containing the controller.",
        "Check gateway access logs and application access logs to see where the request stops."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between HTTP 404 and HTTP 405?",
          answer: "404 means the requested resource or route was not found. 405 means the resource may exist, but the requested HTTP method is not supported for that route."
        },
        {
          question: "A controller works locally but not behind NGINX. What do you investigate?",
          answer: "Inspect NGINX location rules, upstream configuration, path rewriting, forwarded headers, application context path, and gateway logs. Test the application directly and through the proxy to isolate the failing layer."
        },
        {
          question: "How would you confirm which application version is serving requests?",
          answer: "Use deployment metadata, image tags or digests, startup logs, build information, and an appropriately secured version endpoint. Do not rely solely on assumptions about which server was deployed."
        }
      ]
    },
    {
      id: "database-performance",
      title: "3. Database and Performance Problems",
      paragraphs: [
        "An application can become slow even when its Java code has not changed. The cause may be increased traffic, slow SQL, missing indexes, connection-pool saturation, lock contention, or a downstream dependency.",
        "Measure before optimizing. Compare request latency, throughput, error rate, database query timings, CPU, memory, and connection-pool metrics during normal and degraded periods.",
        "A useful investigation separates time spent in the controller and service code from time spent waiting for a database connection, executing SQL, or calling an external service."
      ],
      bullets: [
        "Identify the slow endpoint and compare its p50, p95, and p99 latency.",
        "Inspect slow-query logs and database execution plans.",
        "Look for N+1 queries, missing indexes, large result sets, and unnecessary joins.",
        "Check connection-pool active, idle, and pending connection metrics.",
        "Review transaction duration, lock waits, and database CPU utilization.",
        "Do not increase the connection pool blindly; the database has finite capacity."
      ],
      code: {
        language: "java",
        code: `public interface OrderRepository
        extends JpaRepository<Order, Long> {

    // Example: retrieve only the fields needed by the API.
    @Query("""
        select new com.example.api.OrderSummary(
            o.id, o.status, o.totalAmount
        )
        from Order o
        where o.customer.id = :customerId
        """)
    List<OrderSummary> findSummariesByCustomerId(
        @Param("customerId") Long customerId);
}

public record OrderSummary(
    Long id,
    String status,
    BigDecimal totalAmount
) {}`,
      },
      interviewQuestions: [
        {
          question: "Your API becomes slow when traffic increases. What do you investigate?",
          answer: "Compare latency, throughput, and error rates. Inspect CPU, heap usage, garbage collection, thread pools, database queries, connection-pool saturation, and external-service latency. Use metrics and traces to find the bottleneck before deciding whether to optimize code, increase capacity, or scale horizontally."
        },
        {
          question: "How do you investigate a slow SQL query?",
          answer: "Capture the actual SQL and execution time, inspect the execution plan with the database's EXPLAIN tools, check index usage and row counts, review joins and filtering conditions, and test the effect of query or index changes against representative data."
        },
        {
          question: "What is the N+1 query problem?",
          answer: "The application executes one query to load a collection and then additional queries for related data for each item. It can cause excessive database round trips. Use an appropriate fetch join, entity graph, projection, or batch-fetch strategy based on the use case."
        },
        {
          question: "Should you increase the database connection pool when connections are exhausted?",
          answer: "Not immediately. First determine whether connections are leaked, held by long transactions, or occupied by slow queries. Increasing the pool without checking database capacity can increase contention and make the system slower."
        },
        {
          question: "What is the difference between latency and throughput?",
          answer: "Latency is the time required to complete an operation. Throughput is the number of operations completed per unit of time. A system can have high throughput but poor tail latency, so both must be monitored."
        }
      ]
    },
    {
      id: "connection-timeouts",
      title: "4. Database Connection Timeouts",
      paragraphs: [
        "A connection timeout occurs when an application cannot obtain a usable database connection within the configured time. The failure may happen before SQL execution begins.",
        "Common causes include an unavailable database, network problems, exhausted connection limits, a saturated HikariCP pool, slow queries, long transactions, and connections not being returned correctly.",
        "Distinguish connection-acquisition timeouts from SQL query timeouts. They occur at different stages and require different diagnostic evidence."
      ],
      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      connection-timeout: 3000
      validation-timeout: 1000

logging:
  level:
    com.zaxxer.hikari: INFO`,
      },
      bullets: [
        "Check database health, network connectivity, DNS, firewall rules, and credentials.",
        "Inspect HikariCP active, idle, maximum, and pending connection counts.",
        "Look for long-running SQL statements and transactions.",
        "Review connection leaks and code that holds transactions open during remote calls.",
        "Compare application pool size with the database's total connection budget across all instances.",
        "Tune timeouts based on measured behavior and user-facing latency requirements."
      ],
      interviewQuestions: [
        {
          question: "What does a HikariCP connection timeout indicate?",
          answer: "It usually indicates that the pool could not provide a connection within the configured connectionTimeout. The cause could be pool exhaustion, slow connection creation, database unavailability, or connections being held too long."
        },
        {
          question: "How do you identify a connection leak?",
          answer: "Inspect pool metrics and connection acquisition patterns, review transaction and resource-management code, and use connection-leak detection in a controlled environment. With Spring-managed JPA and JDBC resources, follow framework transaction boundaries and close manually acquired resources correctly."
        },
        {
          question: "Why can increasing maximum-pool-size make performance worse?",
          answer: "More concurrent database work can increase lock contention, CPU pressure, and context switching. The database may already be at capacity, so a larger pool can amplify the bottleneck."
        }
      ]
    },
    {
      id: "lazy-loading-and-jpa",
      title: "5. JPA and Hibernate Errors",
      paragraphs: [
        "LazyInitializationException commonly occurs when code accesses an uninitialized lazy relationship after the persistence context has closed. The entity may have been loaded successfully, but the related collection or object was not initialized.",
        "A common cause is returning JPA entities directly from a controller and allowing JSON serialization to traverse lazy relationships after the transaction boundary. Another is accessing lazy fields after loading an entity outside an active persistence context.",
        "The correct solution is usually to load the required data intentionally and map it to a DTO within the service boundary. Avoid enabling Open Session in View as a substitute for understanding query and transaction boundaries."
      ],
      code: {
        language: "java",
        code: `@Service
public class CustomerOrderService {

    private final CustomerRepository customerRepository;

    public CustomerOrderService(
            CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public CustomerResponse getCustomer(Long id) {
        Customer customer = customerRepository
            .findById(id)
            .orElseThrow(() ->
                new CustomerNotFoundException(id));

        List<String> orderNumbers = customer.getOrders()
            .stream()
            .map(Order::getOrderNumber)
            .toList();

        return new CustomerResponse(
            customer.getId(),
            customer.getName(),
            orderNumbers
        );
    }
}

record CustomerResponse(
    Long id,
    String name,
    List<String> orderNumbers
) {}`,
      },
      bullets: [
        "Inspect where the entity was loaded and where the lazy property was accessed.",
        "Check whether a transaction and persistence context are active.",
        "Use DTO projections, fetch joins, or entity graphs when appropriate.",
        "Avoid serializing large entity graphs directly from controllers.",
        "Check for N+1 queries when fixing lazy-loading failures.",
        "Do not switch every relationship to EAGER fetching as a blanket solution."
      ],
      interviewQuestions: [
        {
          question: "Why does LazyInitializationException occur?",
          answer: "Hibernate needs an active persistence context to initialize an unfetched lazy association. If code accesses that association after the persistence context is closed, initialization fails."
        },
        {
          question: "How do you fix LazyInitializationException?",
          answer: "Load the required association using a suitable query or fetch plan, access and map the required data inside a proper service transaction, or use a DTO projection. Choose the approach that meets the endpoint's data requirements without introducing excessive queries."
        },
        {
          question: "Why is changing all relationships to EAGER a bad idea?",
          answer: "It may load unnecessary data, increase joins or secondary queries, create large object graphs, and worsen performance. Fetching should be selected according to the particular use case."
        },
        {
          question: "What is the difference between a transient, managed, and detached entity?",
          answer: "A transient entity is not associated with a persistence context. A managed entity is tracked by the current persistence context. A detached entity was previously managed but is no longer tracked by that context."
        }
      ]
    },
    {
      id: "memory-and-gc",
      title: "6. Memory Leaks and High CPU",
      paragraphs: [
        "High memory usage may be caused by large collections, unbounded caches, retained references, large request payloads, excessive buffering, or high object-allocation rates. A memory leak occurs when objects remain reachable even though the application no longer needs them.",
        "High CPU can be caused by tight loops, repeated expensive calculations, excessive garbage collection, inefficient regular expressions, lock contention, or too many runnable threads.",
        "Use JVM metrics and diagnostic evidence. A heap dump helps investigate retained objects; a thread dump helps inspect blocked, waiting, and runnable threads. Capture diagnostics securely because dumps can contain sensitive application data."
      ],
      code: {
        language: "java",
        code: `// Risky: an unbounded in-memory cache can grow indefinitely.
private final Map<String, Product> productCache =
    new ConcurrentHashMap<>();

// Better: use a bounded cache with an expiration policy.
// Example dependency: Caffeine.
private final Cache<String, Product> productCache =
    Caffeine.newBuilder()
        .maximumSize(10_000)
        .expireAfterWrite(Duration.ofMinutes(10))
        .build();`,
      },
      bullets: [
        "Inspect heap usage after garbage collection, allocation rate, and GC pause time.",
        "Capture a heap dump when memory is high and inspect dominant retained objects.",
        "Capture multiple thread dumps during a CPU incident and compare stack traces.",
        "Look for unbounded collections, caches, queues, and retained listeners.",
        "Check container memory limits against JVM heap and native-memory usage.",
        "Do not restart repeatedly without collecting evidence when doing so is safe."
      ],
      interviewQuestions: [
        {
          question: "How do you investigate an OutOfMemoryError?",
          answer: "Check the exact error type, container and JVM memory limits, heap and GC metrics, and recent workload changes. Capture a heap dump if safe, identify dominant retained objects, and determine whether the cause is a leak, oversized workload, or insufficient capacity."
        },
        {
          question: "How do you investigate high CPU usage in Java?",
          answer: "Identify the Java process, collect thread dumps or a profiler recording, correlate busy threads with stack traces, and inspect hot methods, loops, locks, and garbage collection. Compare evidence across time instead of relying on one snapshot."
        },
        {
          question: "What is the difference between heap memory and native memory?",
          answer: "Heap memory stores Java objects managed by the garbage collector. Native memory includes resources such as thread stacks, direct buffers, JVM internals, and native libraries. A process can exceed its memory limit even when heap usage is below the maximum heap."
        },
        {
          question: "Why is an unbounded cache dangerous?",
          answer: "Its entries may accumulate indefinitely, increasing memory usage and potentially causing frequent garbage collection or OutOfMemoryError. Use an appropriate capacity limit, expiration policy, invalidation strategy, and cache metrics."
        }
      ]
    },
    {
      id: "thread-pool-saturation",
      title: "7. Thread Pools and Request Saturation",
      paragraphs: [
        "A Spring Boot application can become unresponsive when request-handling threads, asynchronous executors, or database connections are exhausted. Requests may wait in queues, exceed their deadlines, or fail even though the process is still running.",
        "Thread-pool saturation often results from slow dependencies, blocking calls, excessive concurrency, deadlocks, or a workload that exceeds available capacity.",
        "Adding threads is not always the right solution. More concurrent work can consume more memory and increase contention for the database or downstream services."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableAsync
public class AsyncConfiguration {

    @Bean("applicationTaskExecutor")
    public ThreadPoolTaskExecutor applicationTaskExecutor() {
        ThreadPoolTaskExecutor executor =
            new ThreadPoolTaskExecutor();

        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(8);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("app-async-");
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(20);

        return executor;
    }
}

@Service
public class ReportService {

    @Async("applicationTaskExecutor")
    public CompletableFuture<String> generateReport() {
        String report = performReportGeneration();
        return CompletableFuture.completedFuture(report);
    }

    private String performReportGeneration() {
        return "Report generated";
    }
}`,
      },
      bullets: [
        "Inspect active threads, queue sizes, rejected tasks, and thread states.",
        "Check whether threads are blocked on SQL, HTTP calls, locks, or file operations.",
        "Set realistic timeouts for downstream requests.",
        "Use bounded queues and an intentional rejection policy.",
        "Avoid unbounded thread creation and excessive asynchronous fan-out.",
        "Remember that a separate async executor does not increase database capacity."
      ],
      interviewQuestions: [
        {
          question: "What happens when a thread pool is exhausted?",
          answer: "New tasks may wait in a queue, be rejected, or be handled according to the executor's rejection policy. HTTP requests may also become slow if request-handling threads are blocked waiting for dependencies."
        },
        {
          question: "How do you investigate a deadlock?",
          answer: "Capture a thread dump and look for threads waiting on locks held by each other. Inspect lock acquisition order and shared-resource access, then redesign synchronization to avoid cyclic waits."
        },
        {
          question: "Why should asynchronous executors use bounded queues?",
          answer: "An unbounded queue can accumulate work faster than it can be processed, consuming memory and increasing latency. A bounded queue helps apply backpressure through queue limits and an explicit rejection strategy."
        }
      ]
    },
    {
      id: "external-service-failures",
      title: "8. External API and Dependency Failures",
      paragraphs: [
        "A Spring Boot service may depend on payment gateways, email providers, identity services, or other microservices. If one dependency becomes slow or unavailable, requests can pile up and consume application threads.",
        "Configure connection and response timeouts, classify errors, and apply retries only when they are safe. Retries should generally be bounded, use backoff, and avoid amplifying overload.",
        "Circuit breakers can temporarily stop calls to an unhealthy dependency. They do not replace timeouts, and fallback responses must not falsely report that a business operation succeeded."
      ],
      code: {
        language: "java",
        code: `@Configuration
public class HttpClientConfiguration {

    @Bean
    RestClient paymentRestClient(
            RestClient.Builder builder) {

        return builder
            .baseUrl("https://payments.example.com")
            .build();
    }
}

@Service
public class PaymentGatewayClient {

    private final RestClient restClient;

    public PaymentGatewayClient(RestClient paymentRestClient) {
        this.restClient = paymentRestClient;
    }

    public PaymentResponse getPayment(String paymentId) {
        return restClient.get()
            .uri("/api/payments/{id}", paymentId)
            .retrieve()
            .body(PaymentResponse.class);
    }
}

record PaymentResponse(String id, String status) {}`,
      },
      bullets: [
        "Inspect downstream latency, status codes, DNS errors, TLS failures, and connection errors.",
        "Configure connection and read/response timeouts using the selected HTTP client.",
        "Retry only transient failures and only when the operation is safe to repeat.",
        "Use idempotency keys for supported payment or order-creation operations.",
        "Apply circuit breakers, bulkheads, and rate limits where justified.",
        "Monitor dependency-specific success rate, latency, and timeout rate."
      ],
      interviewQuestions: [
        {
          question: "Your payment API is timing out. What do you do?",
          answer: "Check the provider's status, connection and response timings, application thread usage, and error logs. Set appropriate timeouts, use bounded retries only where safe, and verify payment status before repeating a potentially successful charge."
        },
        {
          question: "Why can retries make an outage worse?",
          answer: "Retries increase traffic to an already unhealthy dependency. If many clients retry simultaneously, they can amplify overload. Use bounded retries, exponential backoff, jitter, and retry budgets where appropriate."
        },
        {
          question: "What is the purpose of a circuit breaker?",
          answer: "It stops or limits calls to a dependency that is failing, allowing the dependency time to recover and preventing repeated failures from consuming application resources. It typically moves through closed, open, and half-open states."
        },
        {
          question: "What is an idempotency key?",
          answer: "It is a client- or server-generated identifier used to recognize repeated submissions of the same logical operation. With appropriate storage and concurrency handling, it can prevent duplicate effects when clients retry requests."
        }
      ]
    },
    {
      id: "configuration-deployment",
      title: "9. Configuration and Deployment Failures",
      paragraphs: [
        "An application that works locally but fails after deployment often has differences in runtime versions, environment variables, secrets, active profiles, network permissions, database schema, or filesystem assumptions.",
        "Spring Boot configuration can come from application.yml, profile-specific files, environment variables, system properties, command-line arguments, and other property sources. Higher-priority sources can override values from files.",
        "Compare effective configuration carefully without exposing credentials. Prefer environment-based secret injection or a secret manager over committing passwords and API keys to source control."
      ],
      code: {
        language: "yaml",
        code: `spring:
  application:
    name: order-service
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

server:
  port: \${SERVER_PORT:8080}

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics`,
      },
      bullets: [
        "Confirm the Java runtime and application build versions.",
        "Check the active Spring profile and required environment variables.",
        "Verify database permissions, migrations, network access, and DNS.",
        "Check writable directories, temporary-file paths, and container filesystem restrictions.",
        "Review time zone, locale, certificate, and TLS differences.",
        "Inspect deployment health checks and startup/readiness failures.",
        "Expose only the Actuator endpoints required by the operational environment."
      ],
      interviewQuestions: [
        {
          question: "The application works locally but fails after deployment. What do you check?",
          answer: "Compare Java and dependency versions, active profiles, environment variables, secrets, database permissions, network access, certificates, filesystem assumptions, time zones, and deployment settings. Inspect startup logs and health-check results before changing application logic."
        },
        {
          question: "How does Spring Boot select configuration values?",
          answer: "Spring Boot uses an ordered set of property sources. Command-line arguments, system properties, environment variables, configuration files, and other sources can have different precedence. Check the official precedence rules for the Spring Boot version in use."
        },
        {
          question: "Why should production secrets not be stored in application.yml?",
          answer: "Committed secrets can leak through source control, build artifacts, logs, and backups. Inject secrets through a secure deployment mechanism or secret manager, restrict access, and rotate credentials when exposure is suspected."
        }
      ]
    },
    {
      id: "security-errors",
      title: "10. Security and Authorization Failures",
      paragraphs: [
        "Security incidents can look similar at first but require different fixes. A 401 usually indicates that authentication is missing or invalid. A 403 generally indicates that the request is understood but access is denied.",
        "In a JWT-based application, verify the token's signature, expiration, expected issuer and audience when configured, authorization header format, and security-filter configuration. Do not disable security simply to make an endpoint work.",
        "Security diagnostics should record the reason for a denial without recording bearer tokens, passwords, private keys, or sensitive personal data."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableMethodSecurity
public class MethodSecurityConfiguration {
}

@Service
public class AdminReportService {

    @PreAuthorize("hasRole('ADMIN')")
    public String generateReport() {
        return "Administrative report";
    }
}`,
      },
      bullets: [
        "Check whether authentication succeeds before investigating authorization.",
        "Verify the required roles and authorities, including the ROLE_ prefix convention.",
        "Inspect URL matchers, method-security annotations, and CSRF behavior.",
        "Confirm the token signing key and validation configuration across instances.",
        "Check token expiration and server clock synchronization.",
        "Never log the full Authorization header or raw JWT."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between 401 and 403?",
          answer: "401 indicates that valid authentication credentials are absent or not accepted. 403 indicates that the caller is not permitted to perform the requested operation, even if authentication may have succeeded."
        },
        {
          question: "A JWT works on one instance but fails on another. What do you check?",
          answer: "Check whether instances use consistent signing or verification keys, issuer and audience configuration, token-validation rules, clock synchronization, and deployment versions. Ensure that secrets are distributed securely and consistently."
        },
        {
          question: "Should you disable CSRF protection when a request returns 403?",
          answer: "Not automatically. First determine whether the application uses browser-based sessions, cookies, bearer tokens, or another authentication model. Configure CSRF protection according to the actual threat model and client behavior rather than disabling it as a quick fix."
        }
      ]
    },
    {
      id: "health-checks-and-observability",
      title: "11. Logs, Metrics, Traces, and Health Checks",
      paragraphs: [
        "Logs explain individual events, metrics reveal trends and saturation, and distributed traces show how a request spends time across multiple components. Combining these signals makes production diagnosis faster.",
        "Spring Boot Actuator provides operational endpoints such as health and metrics when the appropriate dependencies and configuration are present. A liveness check answers whether the process should be restarted; a readiness check answers whether it should receive traffic.",
        "A process can be alive but not ready to serve traffic. Health indicators should reflect the application's actual operational requirements without causing unnecessary restarts whenever a noncritical dependency has a temporary issue."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      probes:
        enabled: true
      show-details: when_authorized`,
      },
      bullets: [
        "Include request or trace IDs in structured logs where available.",
        "Monitor latency percentiles, throughput, errors, CPU, heap, GC, and pool saturation.",
        "Use traces to locate slow spans and downstream bottlenecks.",
        "Configure liveness and readiness probes according to deployment requirements.",
        "Restrict sensitive operational endpoints with appropriate network and security controls.",
        "Alert on symptoms that affect users, not just individual metric spikes."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between logs, metrics, and traces?",
          answer: "Logs record discrete events, metrics aggregate measurements over time, and traces connect operations across a request path. Together they provide context for diagnosing failures and performance problems."
        },
        {
          question: "What is the difference between liveness and readiness?",
          answer: "Liveness indicates whether the process should continue running or be restarted. Readiness indicates whether the instance should receive traffic. They serve different purposes and should not be configured identically without considering the application."
        },
        {
          question: "Why should every dependency not necessarily be included in liveness?",
          answer: "If a temporary database or downstream outage causes liveness to fail, the platform may repeatedly restart otherwise healthy instances and worsen the incident. Dependency health is often more appropriate for readiness or dependency-specific alerts, depending on the architecture."
        }
      ]
    },
    {
      id: "structured-troubleshooting",
      title: "12. A Structured Production Troubleshooting Process",
      paragraphs: [
        "A disciplined incident response process reduces guesswork. First understand user impact and scope. Establish when the incident began, which endpoints and instances are affected, and whether a deployment or configuration change occurred.",
        "Next, collect evidence from logs, metrics, traces, database diagnostics, and dependency health. Form a testable hypothesis and run the smallest safe check that can confirm or reject it.",
        "During a major incident, prioritize a safe and reversible mitigation that restores service. Preserve evidence, communicate impact, and avoid unrelated changes. After recovery, identify the root cause and implement preventive actions.",
        "A root cause analysis should explain not only what failed but also why monitoring, tests, or safeguards did not detect or prevent it earlier."
      ],
      bullets: [
        "Step 1: Establish impact, severity, start time, and affected users.",
        "Step 2: Determine whether the problem affects one endpoint, instance, region, or dependency.",
        "Step 3: Check recent releases, configuration changes, traffic increases, and dependency incidents.",
        "Step 4: Gather logs, metrics, traces, thread dumps, or database evidence as appropriate.",
        "Step 5: State a hypothesis and test it using evidence.",
        "Step 6: Apply the smallest safe mitigation or rollback when justified.",
        "Step 7: Verify recovery using user-facing checks and operational metrics.",
        "Step 8: Add regression tests, alerts, runbook updates, and preventive improvements."
      ],
      interviewQuestions: [
        {
          question: "What is your first action when a production incident is reported?",
          answer: "Establish the impact and scope, determine when the issue began, and confirm it with monitoring or reproducible requests. Then collect relevant evidence and coordinate incident response according to severity. Avoid making speculative changes before understanding the failure."
        },
        {
          question: "Would you fix the root cause or roll back first?",
          answer: "It depends on impact and risk. If a recent release is strongly correlated with the incident, a tested rollback may restore service faster and more safely. Root-cause analysis and a permanent fix can follow after stabilization."
        },
        {
          question: "What should a root cause analysis contain?",
          answer: "Include the timeline, customer impact, technical cause, contributing factors, detection gaps, mitigation, recovery verification, and assigned preventive actions. Focus on system improvements rather than blaming individuals."
        },
        {
          question: "How do you verify that a production fix worked?",
          answer: "Re-run the affected request or business flow, inspect success and error rates, compare latency and resource metrics with the baseline, and check dependent components. Monitor long enough to confirm that the failure has not simply moved elsewhere."
        }
      ]
    },
    {
      id: "common-production-mistakes",
      title: "13. Common Troubleshooting Mistakes",
      paragraphs: [
        "Troubleshooting becomes less effective when engineers jump to conclusions, change several variables at once, or focus only on the visible error instead of the underlying failure.",
        "A production fix should be evidence-based, observable, and reversible when possible. Emergency changes should follow the team's incident and change-management practices."
      ],
      bullets: [
        "Increasing connection-pool sizes without checking database capacity.",
        "Retrying every exception without distinguishing transient and permanent failures.",
        "Disabling security checks to bypass authentication or authorization errors.",
        "Increasing every timeout without understanding end-to-end latency.",
        "Changing multiple settings simultaneously and losing the ability to isolate the cause.",
        "Restarting instances repeatedly without capturing useful diagnostics when safe to do so.",
        "Logging secrets or sensitive request payloads while debugging.",
        "Assuming HTTP 500 always means a database failure.",
        "Declaring recovery based only on one successful request.",
        "Making emergency changes without documenting what changed and how to reverse it."
      ],
      interviewQuestions: [
        {
          question: "Why should you avoid changing multiple production settings at once?",
          answer: "It becomes difficult to determine which change caused improvement or introduced a new failure. Prefer controlled changes, record each action, and verify its effect before proceeding, unless immediate safety requires a coordinated mitigation."
        },
        {
          question: "What is the danger of catching every exception and returning a success response?",
          answer: "It hides failures, produces misleading API responses, and can corrupt business workflows. Handle expected exceptions deliberately, preserve diagnostic context, and return an accurate HTTP status and error response."
        },
        {
          question: "Why is a successful health endpoint not enough to prove recovery?",
          answer: "A basic health endpoint may only prove that the process responds. It does not necessarily verify the affected business flow, database query, authentication path, or external integration. Validate the actual failing path and its key operational signals."
        }
      ]
    },
    {
      id: "production-scenario-practice",
      title: "14. Real-World Scenario Practice",
      paragraphs: [
        "Use the following scenarios to practise answering as if you were the engineer responsible for a live Spring Boot service. Structure your response around impact, evidence, likely causes, safe mitigation, and long-term prevention.",
        "In an interview, explain the sequence of checks rather than listing every possible tool. State what evidence would confirm your hypothesis and what you would do if the evidence pointed elsewhere."
      ],
      bullets: [
        "Scenario A: An order endpoint returns 500 immediately after a deployment. Compare release versions, inspect the exception, and verify database migrations and configuration.",
        "Scenario B: Response time rises from 200 ms to 4 seconds under load. Compare p95 latency, query timings, connection-pool wait time, CPU, and downstream spans.",
        "Scenario C: The service reports database connection timeouts while the database appears healthy. Check pool saturation, long transactions, leaks, and aggregate connections across all instances.",
        "Scenario D: Memory usage grows throughout the day and the process eventually restarts. Inspect heap trends, retained objects, cache bounds, queue sizes, and container limits.",
        "Scenario E: A payment request times out but the provider may have processed it. Query the operation status or use the provider's idempotency mechanism before retrying.",
        "Scenario F: Only one application instance returns 401. Compare key configuration, clocks, deployment versions, and security settings across instances.",
        "Scenario G: The service is alive but fails real requests because the database is unavailable. Check readiness behavior and dependency-specific alerts without triggering unnecessary restart loops."
      ],
      interviewQuestions: [
        {
          question: "An order API returns 500 immediately after deployment. Walk me through your response.",
          answer: "I would confirm the affected version and scope, inspect logs for the request and exception, and compare the deployment with the last known healthy version. I would check schema migrations, configuration, and dependency changes. If the release is the likely cause and impact is high, I would consider a safe rollback, then reproduce the issue, add a regression test, and verify recovery."
        },
        {
          question: "Your API takes four seconds under load but 200 milliseconds under normal traffic. What is your approach?",
          answer: "I would compare p95 and p99 latency with throughput and error rates, then inspect traces to determine where the additional time is spent. I would check database queries and connection acquisition, thread-pool queues, CPU, garbage collection, and external dependencies. I would optimize the measured bottleneck rather than scaling every component blindly."
        },
        {
          question: "A payment request times out. How do you avoid charging the customer twice?",
          answer: "I would treat the outcome as uncertain rather than assuming failure. I would query the payment provider using the transaction reference or use its idempotency mechanism, reconcile the status, and only retry when it is safe. I would also verify that our own order and payment state transitions are consistent."
        },
        {
          question: "The database is healthy, but your application cannot get connections. What do you inspect?",
          answer: "I would inspect connection-pool active and pending counts, acquisition latency, transaction duration, long-running queries, connection leaks, and database connection limits. I would compare the total pool allocation across application instances and avoid increasing the pool until database capacity is understood."
        },
        {
          question: "What makes a good production troubleshooting answer in an interview?",
          answer: "A good answer follows a clear sequence: establish impact, collect evidence, identify the bottleneck or failure layer, test a hypothesis, mitigate safely, verify recovery, and prevent recurrence. It distinguishes confirmed facts from assumptions and avoids risky blanket changes."
        }
      ]
    },
    {
      id: "production-troubleshooting-quick-revision",
      title: "15. Quick Revision Notes",
      paragraphs: [
        "Production troubleshooting is a structured engineering activity, not guesswork. Begin with impact and evidence, isolate the failing layer, test a hypothesis, mitigate safely, and verify recovery.",
        "HTTP status codes provide clues but do not replace exception analysis. Database and performance issues require query, pool, and latency evidence. Memory and CPU incidents require JVM diagnostics. External-service failures require timeouts, bounded retries, and safe handling of uncertain outcomes."
      ],
      bullets: [
        "500: inspect the exception and server-side failure.",
        "404: verify the route, method, context path, and deployment.",
        "401: investigate authentication and credential validation.",
        "403: investigate authorization, roles, authorities, and CSRF.",
        "Connection timeout: inspect database reachability, pool saturation, and connection holding time.",
        "LazyInitializationException: inspect persistence-context boundaries and fetch strategy.",
        "High latency: inspect traces, SQL, queues, thread pools, and dependencies.",
        "OutOfMemoryError: inspect heap, retained objects, native memory, and container limits.",
        "External timeout: inspect downstream latency, timeout settings, and retry safety.",
        "Deployment-only failure: compare runtime, profile, environment, secrets, networking, and migrations.",
        "Successful mitigation: verify the business flow and monitor recovery.",
        "Permanent improvement: add regression tests, monitoring, runbooks, and preventive actions."
      ],
      interviewQuestions: [
        {
          question: "Give a concise summary of your production troubleshooting method.",
          answer: "I establish the impact and scope, correlate logs and metrics, identify the failing component, and test a hypothesis. I apply a safe mitigation, verify the actual business flow and recovery metrics, and then add tests or monitoring to prevent recurrence."
        },
        {
          question: "What is the most important troubleshooting principle?",
          answer: "Use evidence to identify the root cause instead of guessing. Make controlled changes, preserve diagnostic information, protect sensitive data, and verify recovery before considering the incident resolved."
        }
      ]
    }
  ]
};
