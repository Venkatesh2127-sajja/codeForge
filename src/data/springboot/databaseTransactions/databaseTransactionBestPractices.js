
export const databaseTransactionBestPractices = {
  id: 1010,
  title: "Database and Transaction Best Practices",
  slug: "database-transaction-best-practices",
  topicTitle: "Database & Transactions",
  description:
    "Apply reliable database configuration, transaction management, performance optimization, testing, and persistence practices in Spring Boot applications.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "configuration",
      title: "Database Configuration",
      paragraphs: [
        "Database configuration determines how an application connects to its database, authenticates, manages connections, and initializes its persistence infrastructure. Incorrect configuration can expose credentials, cause connection failures, or allow an application to access data it should not modify.",
        "In a Spring Boot application, configuration is commonly maintained in application.properties or application.yml. Environment-specific settings can be supplied through environment variables, deployment configuration, or a secrets manager.",
        "Do not commit production passwords, API credentials, or other secrets to source control. Environment variables keep secrets out of the application configuration file, but they are not inherently encrypted. Use appropriate access controls and secret-management facilities.",
        "Use a dedicated database account for the application with only the permissions it needs. For example, an ordinary application account may require SELECT, INSERT, UPDATE, and DELETE but should not automatically receive administrative privileges.",
        "Use Flyway or Liquibase to manage schema changes in shared and production environments. Hibernate schema validation can then help detect differences between entity mappings and the migrated database."
      ],
      bullets: [
        "Use separate configuration for development, testing, staging, and production.",
        "Keep credentials outside source control and restrict access to secrets.",
        "Use least-privilege database accounts.",
        "Set connection timeouts and pool limits deliberately.",
        "Use versioned database migrations instead of relying solely on automatic schema updates.",
        "Validate connectivity, schema compatibility, and permissions before deployment.",
        "Never log passwords, connection strings containing credentials, or sensitive database records."
      ],
      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
    hikari:
      maximum-pool-size: 10
      connection-timeout: 30000

  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false`
      },
      paragraphs: [
        "The example uses environment-provided database settings, configures a bounded HikariCP connection pool, validates Hibernate mappings, and disables Open EntityManager in View. The values are illustrative: choose pool size and timeouts based on measured workload, database capacity, and deployment topology.",
        "If the environment variables are missing, the application may fail to start because the required properties cannot be resolved. Configure them through the deployment environment rather than hardcoding production credentials."
      ]
    },
    {
      id: "transactions",
      title: "Transaction Management",
      paragraphs: [
        "A database transaction groups operations into a logical unit of work. Transactions are commonly explained using ACID: Atomicity, Consistency, Isolation, and Durability.",
        "In Spring, @Transactional is commonly used to define transaction boundaries around service-layer business operations. With Spring's usual proxy-based transaction management, calls must pass through the appropriate proxy for the annotation to take effect. Self-invocation within the same object does not normally trigger a new proxy-based transaction interception.",
        "By default, Spring's declarative transaction handling rolls back for unchecked exceptions such as RuntimeException and Error, but not for every checked exception. Configure rollbackFor when a checked exception should cause rollback.",
        "Transactions should usually remain short. Long-running transactions may retain locks, occupy database connections, increase contention, and cause other requests to wait.",
        "Transaction propagation controls how a method participates in an existing transaction. Isolation controls how concurrent transactions can observe each other's changes. Choose both according to business requirements rather than changing them without understanding their effects."
      ],
      bullets: [
        "Place transaction boundaries around meaningful business operations.",
        "Use @Transactional at the service layer for operations involving multiple repository calls.",
        "Keep database transactions short and avoid unnecessary waiting inside them.",
        "Understand rollback rules for checked and unchecked exceptions.",
        "Use readOnly = true for suitable read operations as a hint; do not treat it as a universal write-protection mechanism.",
        "Choose propagation and isolation based on actual business and concurrency requirements.",
        "Do not assume a local database transaction also covers HTTP requests, messages, or another service's database.",
        "Avoid catching and swallowing exceptions when doing so would hide a failure that should trigger rollback."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferService {

    private final AccountRepository accountRepository;

    public TransferService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void transfer(
            Long fromId,
            Long toId,
            double amount) {

        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Amount must be positive");
        }

        Account from = accountRepository.findById(fromId)
            .orElseThrow(() ->
                new IllegalArgumentException("Source not found"));

        Account to = accountRepository.findById(toId)
            .orElseThrow(() ->
                new IllegalArgumentException("Destination not found"));

        if (from.getBalance() < amount) {
            throw new IllegalStateException(
                "Insufficient balance");
        }

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        accountRepository.save(from);
        accountRepository.save(to);
    }
}

// Assumption:
// Account, AccountRepository, and the balance accessors
// are defined elsewhere in the application.
//
// For financial systems, use BigDecimal rather than double,
// and use suitable concurrency controls to prevent lost updates.`
      },
      paragraphs: [
        "In this example, both account updates participate in the same database transaction. If an unchecked exception escapes the transactional method, Spring normally rolls back the transaction so a partial transfer is not committed.",
        "This simple example is not a complete production banking implementation. Real financial transfers need precise decimal arithmetic, authorization, idempotency, concurrency protection, auditability, and appropriate database constraints."
      ]
    },
    {
      id: "transaction-propagation-isolation",
      title: "Transaction Propagation and Isolation",
      paragraphs: [
        "Propagation determines how a transactional method behaves when it is called while another transaction is already active. Isolation defines the visibility of concurrent transaction changes according to the database's supported isolation behavior.",
        "Spring's default propagation is REQUIRED. It joins an existing transaction or creates one if necessary. REQUIRES_NEW suspends the current transaction and starts a separate transaction when supported by the transaction manager. NESTED may use savepoints when supported by the transaction manager and database.",
        "Isolation levels include READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, and SERIALIZABLE. Their exact behavior depends on the database engine. Higher isolation can reduce certain concurrency anomalies but may also reduce throughput or increase contention.",
        "Do not select SERIALIZABLE for every method as a general performance or correctness solution. First identify the anomaly that must be prevented and choose a suitable combination of constraints, locking, isolation, and retry handling."
      ],
      bullets: [
        "REQUIRED: join the existing transaction or create one.",
        "REQUIRES_NEW: run in a separate transaction, suspending an existing transaction where supported.",
        "SUPPORTS: join an existing transaction if present; otherwise execute without creating one.",
        "MANDATORY: require an existing transaction.",
        "NOT_SUPPORTED: execute without the current transaction, suspending it where supported.",
        "NEVER: require that no transaction is active.",
        "NESTED: use a nested transaction or savepoint when supported.",
        "Select isolation according to the data-integrity requirement and database behavior."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(
            InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void reserveStock(Long productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException(
                "Quantity must be positive");
        }

        // Load the inventory and apply the reservation.
        // Use suitable locking or an atomic database update
        // when concurrent reservations could oversell stock.
    }
}

// InventoryRepository and the actual inventory update
// are intentionally omitted from this configuration example.`
      },
      bullets: [
        "Isolation alone does not automatically prevent every lost-update or business-rule race in every database.",
        "Optimistic locking with a version field, pessimistic locking, atomic SQL updates, and unique constraints are useful tools for particular concurrency problems.",
        "Retry only appropriate transient failures and make retryable operations safe to repeat."
      ]
    },
    {
      id: "performance",
      title: "Performance and Reliability",
      paragraphs: [
        "Database performance depends on query design, indexes, connection management, data volume, transaction duration, network latency, and ORM behavior. A slow API may be caused by a slow SQL statement, connection-pool exhaustion, excessive queries, or a database bottleneck.",
        "Spring Boot commonly uses HikariCP for JDBC connection pooling. A connection pool reuses database connections instead of opening a new physical connection for every operation. Increasing the pool size without measuring database capacity can make contention worse.",
        "Indexes can speed up lookups, joins, and sorting when they match common query patterns. However, indexes consume storage and add overhead to inserts, updates, and deletes. Use execution plans and workload measurements to guide indexing decisions.",
        "Hibernate can produce the N+1 query problem when an application retrieves a list of entities and then triggers additional queries for associated data. Appropriate fetch joins, projections, entity graphs, or batch fetching can reduce unnecessary database round trips.",
        "Use pagination when returning large datasets to an API. For very large or frequently changing datasets, consider keyset pagination where appropriate rather than relying on increasingly expensive offsets."
      ],
      bullets: [
        "Use a connection pool with realistic capacity limits.",
        "Inspect slow SQL queries and database execution plans.",
        "Create indexes that support real query patterns.",
        "Avoid N+1 queries and unnecessary eager loading.",
        "Use pagination or streaming approaches for large result sets.",
        "Select only the columns required by the use case when appropriate.",
        "Avoid holding database connections while waiting for unrelated remote services.",
        "Monitor database latency, active connections, pool wait time, and query volume.",
        "Use caching only when its consistency and invalidation behavior are understood."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Page<Employee> findByDepartmentId(
        Long departmentId,
        Pageable pageable
    );
}

// Example service usage:
//
// Page<Employee> employees =
//     employeeRepository.findByDepartmentId(
//         departmentId,
//         PageRequest.of(0, 20)
//     );
//
// Employee and PageRequest imports are omitted here
// because this is a focused repository example.`
      },
      paragraphs: [
        "Pagination limits the number of rows returned in one request. Always define a sensible maximum page size for public APIs and consider stable sorting so clients can navigate results predictably."
      ]
    },
    {
      id: "testing",
      title: "Testing Database Behavior",
      paragraphs: [
        "Database tests verify that persistence mappings, queries, transactions, constraints, and migrations behave as expected. Choose a test strategy that matches the behavior being verified.",
        "An in-memory database can be useful for fast tests, but it may not reproduce the SQL dialect, locking behavior, index semantics, JSON support, or migration behavior of the production database.",
        "For integration tests that depend on database-specific behavior, use a containerized instance of the target database where practical. Spring Boot test support and Testcontainers can help create repeatable integration-test environments.",
        "A test annotated with @Transactional often runs inside a test-managed transaction that is rolled back after the test. This is convenient for isolation, but it does not prove that every production transaction boundary or commit-time behavior works correctly."
      ],
      bullets: [
        "Test successful inserts, updates, and deletes.",
        "Test rollback when a business operation fails.",
        "Test uniqueness, foreign-key, and NOT NULL constraints.",
        "Test concurrent updates where correctness depends on them.",
        "Run migration tests against the intended database engine.",
        "Test transaction boundaries and exception behavior.",
        "Verify database state rather than relying only on HTTP status codes.",
        "Include tests for pagination, query performance, and important repository queries."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void shouldPersistEmployee() {
        Employee employee = new Employee();
        employee.setName("Venkatesh");

        Employee saved = employeeRepository.save(employee);

        assertEquals("Venkatesh", saved.getName());
    }
}

// Assumptions:
// Employee has a name property and the repository is a
// Spring Data JPA repository. Other required entity fields,
// imports, and database test configuration belong to the project.
//
// This test demonstrates basic persistence. More complex tests
// should verify committed state, rollback, constraints, and
// production-database-specific behavior where relevant.`
      }
    },
    {
      id: "production",
      title: "Production Checklist",
      paragraphs: [
        "Before releasing a Spring Boot application, review database configuration, schema compatibility, transactional correctness, capacity, observability, and recovery procedures. These concerns should be part of deployment readiness rather than addressed only after a production incident."
      ],
      bullets: [
        "Credentials and secrets are securely managed.",
        "The application uses a least-privilege database account.",
        "Connection-pool limits and connection timeouts are configured.",
        "Schema migrations are versioned, reviewed, and tested.",
        "Hibernate schema validation is configured deliberately.",
        "Transaction boundaries and rollback behavior are tested.",
        "Concurrency-sensitive operations have appropriate protection.",
        "Indexes and important queries have been reviewed.",
        "Pagination and API result-size limits are enforced.",
        "Database latency, errors, and connection-pool saturation are monitored.",
        "Backups are scheduled and restoration procedures are verified.",
        "Destructive migrations have a documented recovery strategy.",
        "Deployment procedures account for compatibility between application versions and database schema."
      ],
      code: {
        language: "text",
        code: `Before deployment:
1. Verify credentials, connectivity, and permissions.
2. Review and test database migrations.
3. Check schema compatibility.
4. Verify transaction and concurrency behavior.
5. Inspect critical query execution plans.
6. Confirm connection-pool and database capacity.
7. Verify monitoring, backups, and recovery procedures.
8. Deploy and run smoke tests.
9. Monitor errors, latency, and database health.`
      }
    },
    {
      id: "interview",
      title: "Interview Questions",
      paragraphs: [
        "Use these questions to practice explaining database configuration, Spring transaction management, concurrency, ORM performance, and production reliability in a Java backend interview."
      ],
      interviewQuestions: [
        {
          question: "1. What are the best practices for database configuration in Spring Boot?",
          answer: "Keep secrets outside source control, separate environment-specific configuration, use least-privilege accounts, configure connection limits and timeouts, manage schema changes with migrations, and monitor database health."
        },
        {
          question: "2. What is a database transaction?",
          answer: "A transaction is a logical unit of database work. ACID describes its key properties: Atomicity, Consistency, Isolation, and Durability."
        },
        {
          question: "3. Why should transactions be short?",
          answer: "Long transactions can hold locks and connections for longer periods, increase contention, delay other requests, and reduce throughput."
        },
        {
          question: "4. Where should @Transactional usually be placed?",
          answer: "It is commonly placed on service-layer methods that represent business operations involving one or more repository calls. The transaction boundary should reflect the unit of work that must succeed or fail together."
        },
        {
          question: "5. What is Spring's default transaction propagation?",
          answer: "The default is REQUIRED. The method joins an existing transaction or starts one if no transaction is active and the transaction manager supports it."
        },
        {
          question: "6. What is the difference between REQUIRED and REQUIRES_NEW?",
          answer: "REQUIRED participates in the current transaction when one exists. REQUIRES_NEW suspends the existing transaction and runs in a separate transaction when supported. The separate transaction can commit even if the outer transaction later rolls back, so it should be used deliberately."
        },
        {
          question: "7. What is transaction isolation?",
          answer: "Isolation defines how concurrent transactions interact and which changes they can observe. The available guarantees and exact behavior depend on the database engine and isolation level."
        },
        {
          question: "8. Does @Transactional roll back for every exception?",
          answer: "No. By default, Spring rolls back for unchecked exceptions and Error, but not for all checked exceptions. Use rollbackFor when checked exceptions must trigger rollback."
        },
        {
          question: "9. Why might @Transactional not work on a method?",
          answer: "Possible causes include self-invocation that bypasses the Spring proxy, an object created outside the Spring container, unsuitable method or proxy configuration, or incorrect transaction-manager configuration."
        },
        {
          question: "10. What is a connection pool?",
          answer: "A connection pool maintains reusable database connections so requests can borrow and return them rather than creating a new physical connection for every database operation."
        },
        {
          question: "11. Should we always increase the connection-pool size?",
          answer: "No. A larger pool can increase database contention and resource usage. Tune it according to request concurrency, transaction duration, database capacity, and measured pool wait time."
        },
        {
          question: "12. What is the N+1 query problem?",
          answer: "It occurs when an initial query retrieves a collection of records and additional queries are executed for associated data, often once per record. Fetch joins, projections, entity graphs, or batch fetching may help."
        },
        {
          question: "13. Why are database indexes important?",
          answer: "Indexes can reduce the work needed to find or order rows for suitable queries. They also consume storage and add write overhead, so they should be chosen based on actual query patterns and execution plans."
        },
        {
          question: "14. Why is pagination important?",
          answer: "Pagination limits the number of rows returned per request, helping control memory usage, response size, and query work. Stable sorting and sensible page-size limits are important."
        },
        {
          question: "15. Should a remote API call be made inside a database transaction?",
          answer: "Avoid it when possible because network delays can keep database connections and locks occupied. A local transaction does not automatically include the remote service. Distributed workflows may need an outbox, saga, or other coordination pattern."
        },
        {
          question: "16. What is optimistic locking?",
          answer: "Optimistic locking detects conflicting updates, commonly through a version column such as a JPA @Version field. When another transaction changes the record first, the conflicting update can fail and require suitable error handling or a retry."
        },
        {
          question: "17. What is pessimistic locking?",
          answer: "Pessimistic locking obtains a database lock to restrict conflicting access while a transaction performs an operation. It can help protect particular concurrent updates but may increase contention and deadlock risk."
        },
        {
          question: "18. Why might an H2 test pass while a MySQL integration test fails?",
          answer: "Different database engines can vary in SQL dialects, data types, constraint handling, locking, isolation, and migration support. Test against the intended database engine when those differences matter."
        },
        {
          question: "19. How do you test transaction rollback?",
          answer: "Create a test that performs multiple writes and then triggers a failure that should cause rollback. Verify the resulting database state. Ensure the exception and test transaction setup actually exercise the intended production transaction boundary."
        },
        {
          question: "20. How do you investigate slow database requests?",
          answer: "Inspect application timings, SQL logs, database execution plans, query counts, indexes, connection-pool wait time, transaction duration, database load, and network latency. Optimize based on the measured bottleneck."
        },
        {
          question: "21. What is a database migration?",
          answer: "A database migration is a versioned change to schema or data. Tools such as Flyway and Liquibase help teams review, apply, and track these changes across environments."
        },
        {
          question: "22. Why are database backups not enough by themselves?",
          answer: "A backup is useful only if it is available, consistent for the required recovery objective, and restorable. Teams should test recovery procedures and understand the potential data loss and recovery time."
        },
        {
          question: "23. What is the outbox pattern?",
          answer: "The outbox pattern stores a business change and an event record in the same local database transaction. A separate publisher later sends the event. This helps avoid losing an event between committing database changes and publishing a message, but consumers and publishers still need suitable retry and deduplication behavior."
        },
        {
          question: "24. Summarize database and transaction best practices.",
          answer: "Secure configuration, least-privilege access, versioned migrations, short and correctly scoped transactions, deliberate isolation and propagation, measured connection-pool sizing, efficient queries, appropriate concurrency controls, realistic integration tests, monitoring, and verified backups are key practices."
        }
      ]
    }
  ]
};
