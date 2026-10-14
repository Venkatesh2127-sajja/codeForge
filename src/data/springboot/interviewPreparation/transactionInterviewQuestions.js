
export const transactionInterviewQuestions = {
  id: 1606,
  title: "Database and Transaction Interview Questions",
  slug: "database-and-transaction-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for ACID, @Transactional, propagation, isolation, rollback rules, transaction boundaries, JPA behavior, and real-world database consistency scenarios.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "transaction-fundamentals",
      title: "1. Transactions and ACID Properties",
      paragraphs: [
        "A database transaction is a group of database operations treated as one logical unit of work. Either the transaction commits successfully, or its changes are rolled back according to the database and transaction rules.",
        "Consider a bank transfer of ₹1,000 from Account A to Account B. The application must debit Account A and credit Account B together. If the debit succeeds but the credit fails, the transaction should roll back so the transfer does not leave the accounts inconsistent.",
        "ACID describes four important transaction properties: Atomicity, Consistency, Isolation, and Durability."
      ],
      bullets: [
        "Atomicity: All operations in the transaction succeed together, or the transaction is rolled back.",
        "Consistency: A transaction must preserve the database's defined integrity rules, constraints, and invariants.",
        "Isolation: Concurrent transactions are controlled so that their interactions follow the selected isolation guarantees.",
        "Durability: Once a transaction is committed, its changes are expected to survive failures according to the database's durability configuration."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class BankTransferService {\n\n    private final AccountRepository accountRepository;\n\n    public BankTransferService(AccountRepository accountRepository) {\n        this.accountRepository = accountRepository;\n    }\n\n    @Transactional\n    public void transfer(Long fromId, Long toId, double amount) {\n        Account from = accountRepository.findById(fromId)\n            .orElseThrow(() -> new IllegalArgumentException(\"Source account not found\"));\n\n        Account to = accountRepository.findById(toId)\n            .orElseThrow(() -> new IllegalArgumentException(\"Destination account not found\"));\n\n        if (amount <= 0 || from.getBalance() < amount) {\n            throw new IllegalArgumentException(\"Invalid transfer amount or insufficient balance\");\n        }\n\n        from.debit(amount);\n        to.credit(amount);\n\n        accountRepository.save(from);\n        accountRepository.save(to);\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What is a database transaction?",
          answer: "A transaction groups database operations into a logical unit of work. It commits when the work succeeds or rolls back when a failure triggers the configured rollback behavior."
        },
        {
          question: "What does ACID stand for?",
          answer: "ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties describe key guarantees provided by database transaction processing."
        },
        {
          question: "Explain atomicity with an example.",
          answer: "During a bank transfer, debiting one account and crediting another must succeed together. If a required operation fails and the transaction rolls back, neither account should retain a partial transfer."
        },
        {
          question: "What is the difference between commit and rollback?",
          answer: "Commit completes the transaction and makes its changes permanent according to the database's durability guarantees. Rollback discards the transaction's uncommitted changes."
        },
        {
          question: "Does ACID guarantee that an application will never have inconsistent data?",
          answer: "No. ACID provides transaction guarantees, but the application must still define correct business rules, database constraints, and transaction boundaries. Incorrect business logic can commit logically invalid data."
        }
      ]
    },
    {
      id: "spring-transaction-management",
      title: "2. How Spring Manages Transactions",
      paragraphs: [
        "Spring supports declarative transaction management through annotations such as @Transactional. Instead of manually writing begin, commit, and rollback logic around every database operation, developers declare the intended transaction behavior.",
        "In the usual proxy-based Spring configuration, a call from another Spring bean passes through a transaction proxy. The transaction interceptor examines the method's transaction attributes, coordinates with a transaction manager, invokes the target method, and commits or rolls back as appropriate.",
        "For Spring Data JPA applications, JpaTransactionManager is commonly used to manage transactions for a JPA EntityManager. Other applications may use different transaction managers depending on the resources involved.",
        "The transaction boundary should generally surround a business operation in the service layer, where multiple repository calls may need to succeed or fail together."
      ],
      bullets: [
        "Controller: receives and validates the HTTP request.",
        "Service: defines the business operation and transaction boundary.",
        "Repository: performs database access.",
        "Transaction manager: coordinates transaction lifecycle operations.",
        "Database: enforces constraints and executes transactional SQL."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class OrderService {\n\n    private final OrderRepository orderRepository;\n    private final PaymentRecordRepository paymentRecordRepository;\n\n    public OrderService(\n            OrderRepository orderRepository,\n            PaymentRecordRepository paymentRecordRepository) {\n        this.orderRepository = orderRepository;\n        this.paymentRecordRepository = paymentRecordRepository;\n    }\n\n    @Transactional\n    public void createOrder(Order order, PaymentRecord paymentRecord) {\n        orderRepository.save(order);\n        paymentRecordRepository.save(paymentRecord);\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What does @Transactional do?",
          answer: "It declares transaction behavior for a class or method. In the usual proxy-based Spring setup, a transaction interceptor applies that behavior when the invocation passes through the proxy."
        },
        {
          question: "How does Spring implement @Transactional?",
          answer: "Spring commonly uses AOP proxies and a transaction interceptor. The interceptor works with a transaction manager to begin or join a transaction, invoke the method, and commit or roll back based on the outcome and configured rules."
        },
        {
          question: "Where should @Transactional usually be placed?",
          answer: "It is commonly placed on service-layer methods that represent business operations requiring atomic database work. This gives related repository operations a clear shared transaction boundary."
        },
        {
          question: "What is a PlatformTransactionManager?",
          answer: "It is Spring's transaction-management abstraction for operations such as obtaining a transaction, committing it, and rolling it back. Concrete implementations manage particular resources, such as JDBC connections or JPA transactions."
        },
        {
          question: "Are all repository methods automatically part of one transaction?",
          answer: "No. Spring Data repository methods have their own transaction behavior, but multiple repository calls are not automatically guaranteed to share one transaction unless an appropriate surrounding transaction exists."
        }
      ]
    },
    {
      id: "transaction-propagation",
      title: "3. Transaction Propagation",
      paragraphs: [
        "Propagation defines how a transactional method behaves when it is called while another transaction is already active. It determines whether the method joins the existing transaction, starts a new one, or requires a particular transaction context.",
        "Propagation is especially important when one service method calls another service method and both methods perform database operations.",
        "REQUIRED is the default propagation mode. It joins an existing transaction or starts one when no transaction exists. REQUIRES_NEW suspends an existing transaction when supported and runs the inner operation in a separate transaction.",
        "A separate transaction does not automatically mean the business workflow is safe. For example, a REQUIRES_NEW audit record may commit even if the outer business transaction later rolls back. That can be intentional, but it must be designed carefully."
      ],
      bullets: [
        "REQUIRED: Join the current transaction or create one.",
        "REQUIRES_NEW: Run in an independent transaction, suspending the current one when applicable.",
        "SUPPORTS: Join a current transaction if one exists; otherwise, execute without a transaction.",
        "MANDATORY: Require an existing transaction; otherwise, throw an exception.",
        "NOT_SUPPORTED: Execute without a transaction, suspending an existing one when supported.",
        "NEVER: Require that no transaction is active.",
        "NESTED: Use a nested transaction or savepoint when supported by the transaction manager and resource."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Propagation;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class AuditService {\n\n    private final AuditRepository auditRepository;\n\n    public AuditService(AuditRepository auditRepository) {\n        this.auditRepository = auditRepository;\n    }\n\n    @Transactional(propagation = Propagation.REQUIRES_NEW)\n    public void recordFailure(String message) {\n        auditRepository.save(new AuditRecord(message));\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What is transaction propagation?",
          answer: "Propagation determines how a transactional method participates in an existing transaction. It controls whether the method joins, creates, requires, or avoids a transaction."
        },
        {
          question: "What is the default propagation in Spring?",
          answer: "Propagation.REQUIRED is the default. It joins the current transaction or creates a transaction if none exists."
        },
        {
          question: "What is the difference between REQUIRED and REQUIRES_NEW?",
          answer: "REQUIRED normally shares the caller's transaction. REQUIRES_NEW suspends the caller's transaction when supported and executes in a separate transaction that can commit or roll back independently."
        },
        {
          question: "When would you use REQUIRES_NEW?",
          answer: "It can be useful for an operation that must commit independently, such as a deliberately independent audit record. It should be used carefully because the inner commit is not undone if the outer transaction later rolls back."
        },
        {
          question: "What does MANDATORY propagation do?",
          answer: "It requires an existing transaction. If the method is invoked without one, Spring throws an exception rather than starting a new transaction."
        },
        {
          question: "What is the difference between NESTED and REQUIRES_NEW?",
          answer: "REQUIRES_NEW uses an independent transaction while suspending the outer one when supported. NESTED typically uses a savepoint within the same physical transaction when the transaction manager and resource support it."
        }
      ]
    },
    {
      id: "transaction-isolation",
      title: "4. Transaction Isolation Levels",
      paragraphs: [
        "Isolation controls how concurrent transactions can see one another's changes. Higher isolation can prevent more concurrency anomalies, but it may also reduce concurrency or increase locking and retry costs.",
        "A dirty read occurs when a transaction reads data written by another transaction that has not committed. A non-repeatable read occurs when the same row is read twice and another committed transaction changes it between reads. A phantom read occurs when repeating a query returns a different set of rows because another transaction inserts or removes rows matching the query.",
        "Actual behavior depends on the database engine, its implementation of isolation, and whether it uses locking, multiversion concurrency control, or a combination of techniques."
      ],
      bullets: [
        "READ_UNCOMMITTED: Allows the weakest isolation; dirty reads may be possible where supported.",
        "READ_COMMITTED: Prevents dirty reads, but repeated reads may observe newly committed changes.",
        "REPEATABLE_READ: Provides stronger repeat-read guarantees; phantom behavior depends on the database implementation.",
        "SERIALIZABLE: Provides the strongest standard isolation level by making concurrent transactions behave as if appropriately serialized, potentially with reduced concurrency.",
        "DEFAULT: Uses the database or transaction manager's configured default isolation level."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Isolation;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class InventoryService {\n\n    private final InventoryRepository inventoryRepository;\n\n    public InventoryService(InventoryRepository inventoryRepository) {\n        this.inventoryRepository = inventoryRepository;\n    }\n\n    @Transactional(isolation = Isolation.READ_COMMITTED)\n    public int getAvailableQuantity(Long productId) {\n        Inventory inventory = inventoryRepository.findById(productId)\n            .orElseThrow(() -> new IllegalArgumentException(\"Product not found\"));\n\n        return inventory.getAvailableQuantity();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What is transaction isolation?",
          answer: "Isolation defines the guarantees around how concurrent transactions observe each other's changes. It helps control anomalies such as dirty reads and non-repeatable reads."
        },
        {
          question: "What is a dirty read?",
          answer: "A dirty read occurs when one transaction reads another transaction's uncommitted changes. If the writer rolls back, the reader has observed data that was never committed."
        },
        {
          question: "What is a non-repeatable read?",
          answer: "It occurs when a transaction reads the same row twice and sees different values because another transaction committed a change between the reads."
        },
        {
          question: "What is a phantom read?",
          answer: "It occurs when repeating a query that matches a set of rows returns a different set because another transaction changed which rows satisfy the query."
        },
        {
          question: "Which isolation level is the strongest?",
          answer: "SERIALIZABLE is the strongest standard SQL isolation level. It can reduce concurrency and may require transactions to retry after serialization failures."
        },
        {
          question: "Does REPEATABLE_READ behave identically in every database?",
          answer: "No. Database engines differ in their isolation implementations and concurrency behavior. Check the database documentation before relying on a particular anomaly-prevention guarantee."
        }
      ]
    },
    {
      id: "rollback-rules",
      title: "5. Rollback Rules and Exception Handling",
      paragraphs: [
        "In Spring's traditional default declarative transaction behavior, an unchecked exception (RuntimeException or a subclass) or an Error escaping the transactional method triggers rollback. Checked exceptions do not generally trigger rollback by default.",
        "Use rollbackFor when a checked exception must cause a rollback. Use noRollbackFor when a particular exception should not trigger rollback under the configured rules.",
        "The exception must be handled with care. If application code catches an exception and returns normally, Spring's interceptor may see a successful method return and commit the transaction, unless the transaction has already been marked rollback-only.",
        "A transaction can also be marked rollback-only by participating code. If an outer method later tries to commit, Spring may report an UnexpectedRollbackException because the transaction cannot be committed."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class EmployeeService {\n\n    private final EmployeeRepository employeeRepository;\n\n    public EmployeeService(EmployeeRepository employeeRepository) {\n        this.employeeRepository = employeeRepository;\n    }\n\n    @Transactional(rollbackFor = Exception.class)\n    public void createEmployee(Employee employee) throws Exception {\n        employeeRepository.save(employee);\n\n        if (employee.getEmail() == null || employee.getEmail().isBlank()) {\n            throw new Exception(\"Employee email is required\");\n        }\n    }\n}"
      },
      bullets: [
        "RuntimeException: triggers rollback by default when it escapes the transactional invocation.",
        "Error: triggers rollback by default.",
        "Checked exception: does not generally trigger rollback by default.",
        "rollbackFor: explicitly includes exception types in rollback rules.",
        "noRollbackFor: specifies exceptions that should not trigger rollback under the applicable rules.",
        "Catch-and-ignore: can accidentally allow a commit when a failure should have aborted the operation."
      ],
      interviewQuestions: [
        {
          question: "Does @Transactional roll back for every exception by default?",
          answer: "No. By default, Spring rolls back for unchecked exceptions and Errors, but not generally for checked exceptions. You can customize the behavior with rollbackFor and noRollbackFor."
        },
        {
          question: "How do you roll back for a checked exception?",
          answer: "Specify a rollback rule such as @Transactional(rollbackFor = Exception.class) or a narrower checked exception type that represents the failure."
        },
        {
          question: "What happens if an exception is caught inside a transactional method?",
          answer: "If the method catches the exception and returns normally, the interceptor may attempt to commit. If the transaction has already been marked rollback-only, the commit may instead fail with an unexpected rollback."
        },
        {
          question: "What is rollback-only?",
          answer: "It is a transaction state indicating that the transaction must not commit. A participating operation or transaction manager may mark it rollback-only after a failure."
        },
        {
          question: "What is UnexpectedRollbackException?",
          answer: "It can occur when an outer transaction attempts to commit but the shared transaction has already been marked rollback-only. It indicates that the transaction could not commit despite the outer method returning normally."
        }
      ]
    },
    {
      id: "transaction-proxy-and-self-invocation",
      title: "6. Why @Transactional Sometimes Does Not Work",
      paragraphs: [
        "In Spring's default proxy-based transaction model, transactional behavior is applied when a call passes through the Spring proxy. A direct call from one method to another method on the same object, called self-invocation, normally bypasses that proxy.",
        "For example, if a non-transactional method calls another method on this with @Transactional, the annotation on the inner method may not start a transaction as expected.",
        "The most maintainable fix is usually to move the transactional operation into another Spring-managed service and invoke it through that bean. AspectJ-based transaction weaving is another option, but it requires additional configuration.",
        "Proxy limitations also matter for method visibility and proxy type. Prefer public service methods invoked through Spring-managed beans, and verify the behavior of the specific Spring configuration when using less common method or proxy patterns."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class ImportService {\n\n    private final ImportWorker importWorker;\n\n    public ImportService(ImportWorker importWorker) {\n        this.importWorker = importWorker;\n    }\n\n    public void importData() {\n        // This call passes through the Spring-managed ImportWorker proxy.\n        importWorker.saveImportedData();\n    }\n}\n\n@Service\nclass ImportWorker {\n\n    private final ImportedRecordRepository repository;\n\n    ImportWorker(ImportedRecordRepository repository) {\n        this.repository = repository;\n    }\n\n    @Transactional\n    public void saveImportedData() {\n        repository.save(new ImportedRecord());\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "Why might @Transactional not work during self-invocation?",
          answer: "A call from one method to another on the same object bypasses the proxy in Spring's default proxy-based model. The transaction interceptor therefore may not apply the inner method's annotation."
        },
        {
          question: "How can you fix self-invocation problems?",
          answer: "Move the transactional operation into another Spring-managed bean and invoke it through that bean's proxy. AspectJ transaction weaving is an alternative when appropriately configured."
        },
        {
          question: "Does creating an object with new activate Spring transaction management?",
          answer: "No. An object created directly with new is not automatically managed or proxied by Spring. Its @Transactional annotations will not receive Spring's normal proxy-based behavior unless it is integrated into the appropriate transaction infrastructure."
        },
        {
          question: "Can a private method reliably establish a transaction using proxy-based @Transactional?",
          answer: "Private methods cannot be intercepted as overridable methods by standard class-based proxies, and they are not suitable transaction entry points in the usual proxy model. Prefer public methods called through a Spring-managed bean."
        }
      ]
    },
    {
      id: "jpa-flush-commit",
      title: "7. JPA Flush, Commit, and Persistence Context",
      paragraphs: [
        "JPA manages entity changes through a persistence context. When an entity is loaded and modified inside a managed persistence context, JPA can detect the changes and synchronize them with the database through dirty checking.",
        "Flush synchronizes pending persistence-context changes with the database. It can execute INSERT, UPDATE, or DELETE statements before the transaction commits, but it does not itself commit the transaction.",
        "Commit completes the transaction. The persistence provider generally flushes pending changes before commit when required, although exact timing can depend on the flush mode and provider behavior.",
        "A flush may expose constraint violations or database errors earlier than commit. However, a successful flush does not guarantee that the entire transaction will eventually commit."
      ],
      code: {
        language: "java",
        code: "import jakarta.persistence.EntityManager;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class ProductService {\n\n    private final EntityManager entityManager;\n\n    public ProductService(EntityManager entityManager) {\n        this.entityManager = entityManager;\n    }\n\n    @Transactional\n    public void updateProduct(Long productId, String newName) {\n        Product product = entityManager.find(Product.class, productId);\n\n        if (product == null) {\n            throw new IllegalArgumentException(\"Product not found\");\n        }\n\n        product.setName(newName);\n\n        // Synchronizes pending changes with the database.\n        // The transaction remains active and has not been committed here.\n        entityManager.flush();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "Does flushing a JPA persistence context commit a transaction?",
          answer: "No. Flush synchronizes pending changes with the database, while commit completes the transaction. A flushed change can still be rolled back before the transaction commits."
        },
        {
          question: "What is dirty checking in JPA?",
          answer: "Dirty checking detects changes to managed entities and generates the necessary database updates when the persistence context is flushed."
        },
        {
          question: "When does Hibernate flush changes?",
          answer: "It may flush before transaction commit and before certain queries, depending on the flush mode and provider behavior. Calling flush explicitly can force synchronization earlier."
        },
        {
          question: "Why can an error appear at commit even if repository save returned successfully?",
          answer: "Some SQL may be delayed until flush or commit. Database constraints, locking conflicts, or other persistence errors can therefore surface after the save call returns."
        },
        {
          question: "What is the difference between save and flush?",
          answer: "A Spring Data repository save operation makes an entity managed or schedules persistence work as appropriate. It does not necessarily execute SQL immediately. A flush synchronizes pending persistence-context changes with the database."
        }
      ]
    },
    {
      id: "read-only-and-transaction-boundaries",
      title: "8. Read-Only Transactions and Transaction Boundaries",
      paragraphs: [
        "The readOnly attribute expresses that a transaction is intended for reading. Depending on the transaction manager, database, and JPA provider, it may enable optimizations or influence how changes are handled.",
        "readOnly = true is not a universal security control and does not guarantee that every database write will be rejected. Do not rely on it as the only protection against modifications.",
        "Transaction boundaries should be as short as practical. Holding a transaction open while making a slow HTTP request, waiting for user input, or processing a large file can increase lock duration, connection usage, and contention.",
        "When a workflow spans a database and an external service, consider an explicit state machine, idempotent operations, retries, or a saga/outbox design rather than assuming a local database transaction can roll back a remote side effect."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class CustomerQueryService {\n\n    private final CustomerRepository customerRepository;\n\n    public CustomerQueryService(CustomerRepository customerRepository) {\n        this.customerRepository = customerRepository;\n    }\n\n    @Transactional(readOnly = true)\n    public Customer findCustomer(Long customerId) {\n        return customerRepository.findById(customerId)\n            .orElseThrow(() -> new IllegalArgumentException(\"Customer not found\"));\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What does readOnly = true mean?",
          answer: "It declares read-only intent for the transaction. It may help the transaction manager or persistence provider optimize work, but it is not a universal guarantee that writes are impossible."
        },
        {
          question: "Should every service method use @Transactional(readOnly = true)?",
          answer: "No. Use it where a read-only transaction is appropriate and supported by the application's configuration. Methods that modify data need transaction behavior consistent with their business requirements."
        },
        {
          question: "Why should database transactions be short?",
          answer: "Long transactions can hold locks, consume connections, increase contention, and make failures more expensive. Short, well-defined transaction boundaries generally improve concurrency and reliability."
        },
        {
          question: "Should a remote HTTP request run inside a database transaction?",
          answer: "Avoid it when possible because remote latency can keep database resources occupied. If the workflow needs cross-system consistency, use a deliberate coordination strategy rather than expecting a database rollback to undo the remote request."
        }
      ]
    },
    {
      id: "concurrency-locking",
      title: "9. Concurrent Updates, Locking, and Lost Updates",
      paragraphs: [
        "Transactions alone do not automatically prevent every concurrency problem. Two transactions may read the same value and then overwrite one another's changes unless the application uses an appropriate locking or concurrency-control strategy.",
        "Optimistic locking uses a version field to detect conflicting updates. If another transaction changes the entity first, the stale update can fail, allowing the application to retry or return a conflict.",
        "Pessimistic locking asks the database to lock selected rows while a transaction works with them. It can be useful when conflicts are likely, but long-held locks can reduce throughput and cause deadlocks.",
        "Choose a strategy based on the business invariant, database capabilities, expected contention, and retry behavior."
      ],
      code: {
        language: "java",
        code: "import jakarta.persistence.Entity;\nimport jakarta.persistence.Id;\nimport jakarta.persistence.Version;\n\n@Entity\npublic class Inventory {\n\n    @Id\n    private Long id;\n\n    private int availableQuantity;\n\n    @Version\n    private Long version;\n\n    protected Inventory() {\n    }\n\n    public int getAvailableQuantity() {\n        return availableQuantity;\n    }\n\n    public void reserve(int quantity) {\n        if (quantity <= 0 || quantity > availableQuantity) {\n            throw new IllegalArgumentException(\"Invalid reservation quantity\");\n        }\n        availableQuantity -= quantity;\n    }\n}"
      },
      bullets: [
        "Optimistic locking: commonly uses @Version to detect conflicting changes.",
        "Pessimistic locking: uses database locks, often through JPA lock modes.",
        "Lost update: one transaction overwrites another transaction's update based on stale data.",
        "Deadlock: transactions wait on one another's locks in a cycle; the database may abort one transaction.",
        "Retry policy: retry only when the operation is safe to repeat and the failure is transient."
      ],
      interviewQuestions: [
        {
          question: "What is optimistic locking?",
          answer: "Optimistic locking detects conflicting updates, commonly using a version field. If the stored version changes before an update succeeds, the stale transaction can fail rather than silently overwrite newer data."
        },
        {
          question: "What does @Version do in JPA?",
          answer: "It marks an entity version attribute used for optimistic locking. The persistence provider checks and updates the version during writes to detect conflicting modifications."
        },
        {
          question: "What is pessimistic locking?",
          answer: "Pessimistic locking obtains database locks to control concurrent access to selected rows. It can prevent certain conflicts but may increase contention or deadlock risk."
        },
        {
          question: "What is a lost update?",
          answer: "A lost update happens when concurrent transactions modify the same data and one update overwrites another based on a stale read, causing a change to be lost."
        },
        {
          question: "What is a deadlock?",
          answer: "A deadlock occurs when transactions wait on locks held by one another in a cycle. Databases commonly detect the cycle and abort one transaction so the others can proceed."
        }
      ]
    },
    {
      id: "transaction-testing",
      title: "10. Testing Transactional Code",
      paragraphs: [
        "Transactional behavior should be tested at the layer where the transaction is actually applied. A unit test that directly constructs a service does not automatically activate Spring's transaction proxy.",
        "Spring integration tests can run within a test-managed transaction and roll back after the test. This is useful for database isolation, but it can also hide production behavior if the test assumes that an inner service transaction commits independently.",
        "When testing rollback, verify the persisted database state after the transaction has ended. A test that only checks that an exception was thrown may not prove that all intended database changes were rolled back.",
        "For asynchronous work, independently committed transactions, or external systems, design tests around the actual transaction boundaries rather than assuming the test method's transaction covers every operation."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertThrows;\nimport static org.junit.jupiter.api.Assertions.assertFalse;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.context.SpringBootTest;\n\n@SpringBootTest\nclass EmployeeServiceIntegrationTest {\n\n    @Autowired\n    private EmployeeService employeeService;\n\n    @Autowired\n    private EmployeeRepository employeeRepository;\n\n    @Test\n    void shouldNotPersistEmployeeWhenCheckedFailureOccurs() {\n        Employee employee = new Employee();\n        employee.setEmail(null);\n\n        assertThrows(Exception.class, () -> employeeService.createEmployee(employee));\n\n        assertFalse(employeeRepository.existsById(employee.getId()));\n    }\n}"
      },
      bullets: [
        "Use a Spring-managed bean when testing proxy-based @Transactional behavior.",
        "Verify database state after the relevant transaction has completed.",
        "Remember that test-level transactions may roll back automatically after a test.",
        "Use the production database engine or a compatible test environment for database-specific locking and isolation behavior.",
        "Test retry and concurrency paths separately when they are part of the business contract."
      ],
      interviewQuestions: [
        {
          question: "How do you test rollback behavior?",
          answer: "Invoke the transactional operation through a Spring-managed bean, trigger the failure, and verify the database state after the transaction has ended. Ensure the test's own transaction does not mask the behavior being tested."
        },
        {
          question: "Why might a test fail to demonstrate that a transaction committed?",
          answer: "The test may run inside a transaction that Spring rolls back after the test method. Use an appropriate transaction boundary and verify the persisted state outside the transaction whose behavior is under test."
        },
        {
          question: "Does directly constructing a service test @Transactional behavior?",
          answer: "Not by itself. Direct construction bypasses the Spring-managed proxy and transaction infrastructure. Use a Spring integration test or explicitly test the business logic separately from transaction integration."
        }
      ]
    },
    {
      id: "common-transaction-mistakes",
      title: "11. Common Transaction Mistakes",
      paragraphs: [
        "Transaction problems often arise from unclear boundaries, incorrect exception handling, proxy limitations, or assumptions that a database transaction covers resources outside the database.",
        "A database transaction can protect related database changes within its scope, but it cannot automatically reverse an email, an HTTP request, or a message already accepted by another system.",
        "If an operation needs reliable publication of an event after a database change, a transactional outbox can store the event in the same database transaction. A separate publisher sends it later, and consumers should be idempotent because delivery can be repeated."
      ],
      bullets: [
        "Assuming checked exceptions cause rollback automatically.",
        "Calling a transactional method through self-invocation and expecting a new proxy interception.",
        "Using REQUIRES_NEW without understanding independent commit behavior.",
        "Keeping transactions open during slow external calls.",
        "Assuming flush is the same as commit.",
        "Assuming readOnly = true always blocks writes.",
        "Retrying every exception without checking whether the operation is safe to repeat.",
        "Assuming a database rollback can undo a remote service side effect.",
        "Ignoring concurrent updates, locking, and database-specific isolation behavior."
      ],
      interviewQuestions: [
        {
          question: "Can a database transaction roll back an email that has already been sent?",
          answer: "No. A local database transaction cannot undo an external email delivery. Use an appropriate workflow, such as storing an outbox record in the transaction and sending the email after commit."
        },
        {
          question: "How do you reliably publish an event after a database update?",
          answer: "A transactional outbox stores the business change and an event record in the same database transaction. A publisher later delivers the event, while consumers handle possible duplicate delivery idempotently."
        },
        {
          question: "Does @Transactional provide distributed transactions automatically?",
          answer: "No. It usually manages a local transaction for the configured resource. Coordinating atomic changes across independent services or databases requires an explicit distributed transaction or workflow design."
        },
        {
          question: "Is retrying a failed transaction always safe?",
          answer: "No. Retry only appropriate transient failures and ensure the operation is safe to repeat. Idempotency, bounded retries, backoff, and concurrency-conflict handling help prevent duplicate side effects."
        }
      ]
    },
    {
      id: "transaction-interview-scenarios",
      title: "12. Real-World Interview Scenarios",
      paragraphs: [
        "Interviewers often ask what happens when a failure occurs halfway through a business operation. Explain which operations share the same transaction, which exceptions trigger rollback, and whether any external side effect has already occurred.",
        "For a bank transfer, keep the debit and credit in one transaction and protect against concurrent balance updates. For order creation, decide whether order and payment-record writes must commit together. For event publication, consider the outbox pattern if losing an event after a database commit would be unacceptable.",
        "A strong answer identifies the guarantee first, describes the transaction boundary, explains the failure behavior, and then mentions the concurrency or distributed-system limitation."
      ],
      bullets: [
        "Scenario: Two repository writes must succeed together. Answer: Put the business operation inside one service-layer transaction.",
        "Scenario: A checked exception occurs after a write. Answer: Configure rollbackFor if that exception must roll back the transaction.",
        "Scenario: An inner method must commit independently. Answer: Consider REQUIRES_NEW and explain its independent commit semantics.",
        "Scenario: Two users reserve the last item. Answer: Use appropriate locking or optimistic concurrency control, enforce database constraints where appropriate, and handle conflicts.",
        "Scenario: A database update succeeds but event delivery fails. Answer: Consider a transactional outbox and idempotent delivery.",
        "Scenario: A transaction remains open during a slow HTTP request. Answer: Reconsider the boundary and use a workflow or saga when cross-system coordination is needed."
      ],
      interviewQuestions: [
        {
          question: "Two repository saves occur in one service method. How do you ensure they succeed or fail together?",
          answer: "Place the service operation inside one effective transaction, for example with @Transactional. If an exception triggers rollback, both database changes in that transaction should be rolled back."
        },
        {
          question: "A method saves data and then throws a checked exception. Will the data roll back?",
          answer: "Not generally by default. If the checked exception escapes the transactional method, configure rollbackFor for the relevant exception type when rollback is required."
        },
        {
          question: "Two users try to purchase the last available product. What would you do?",
          answer: "Use an appropriate concurrency strategy such as optimistic or pessimistic locking, and enforce the inventory invariant at the database or update-operation level. Handle conflicts or insufficient inventory explicitly."
        },
        {
          question: "The database commits an order, but publishing its event fails. How do you handle this?",
          answer: "Use a transactional outbox to persist the order and event record together. A separate publisher retries delivery, and consumers must be prepared for duplicate messages."
        },
        {
          question: "How would you explain @Transactional in an interview in 30 seconds?",
          answer: "@Transactional lets Spring manage a database transaction around a method or class. Spring's transaction interceptor works through the configured transaction manager to join or start a transaction and commit or roll back according to the method outcome and rollback rules. Correct proxy invocation and transaction boundaries are essential."
        }
      ]
    },
    {
      id: "transaction-quick-revision",
      title: "13. Quick Revision Notes",
      paragraphs: [
        "A transaction is a logical unit of database work. ACID stands for Atomicity, Consistency, Isolation, and Durability.",
        "@Transactional declares transaction behavior, commonly applied through Spring AOP proxies. REQUIRED is the default propagation. REQUIRES_NEW creates an independent transaction when supported and can commit even if the outer transaction later rolls back.",
        "Spring's default rollback behavior applies to unchecked exceptions and Errors, not generally checked exceptions. Flush synchronizes persistence changes with the database; commit completes the transaction. Isolation and locking behavior depend partly on the database engine.",
        "For reliable production behavior, keep transaction boundaries clear and short, handle concurrent updates, test rollback explicitly, and do not assume a local database transaction can undo external side effects."
      ],
      bullets: [
        "ACID: Atomicity, Consistency, Isolation, Durability.",
        "@Transactional: declarative transaction management.",
        "Propagation: REQUIRED is the default.",
        "Isolation: controls visibility and concurrency guarantees.",
        "Rollback: unchecked exceptions and Errors by default; checked exceptions generally need explicit rollback rules.",
        "Self-invocation: bypasses the usual proxy-based interception.",
        "Flush: synchronizes changes; it does not commit.",
        "readOnly = true: intent and possible optimization, not a universal write prohibition.",
        "@Version: common JPA optimistic-locking mechanism.",
        "Outbox: reliable event publication pattern for database-plus-message workflows."
      ]
    }
  ]
};
