
export const transactionalAnnotation = {
  id: 1006,
  title: "@Transactional in Spring Boot",
  slug: "transactional-annotation",
  topicTitle: "Database & Transactions",
  description:
    "Understand Spring's @Transactional annotation, transaction boundaries, propagation, isolation, rollback rules, and best practices for reliable database operations.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "concept",
      title: "What Is @Transactional?",
      paragraphs: [
        "@Transactional is an annotation provided by Spring that allows a method or class to execute with transaction semantics. It helps Spring determine when a database transaction should begin, commit, or roll back.",
        "A database transaction groups related database operations into one logical unit of work. If all operations succeed, the transaction can commit. If an operation fails and the failure matches the configured rollback rules, the transaction can roll back.",
        "Spring commonly implements declarative transaction management using AOP proxies and a PlatformTransactionManager. The transaction manager coordinates the transaction with the underlying persistence technology, such as JDBC or JPA.",
        "The service layer is usually a suitable place for a transaction because one business operation may require multiple repository calls. For example, transferring money between two accounts requires debiting one account and crediting another within the same transaction.",
        "The annotation does not independently create database atomicity. Spring coordinates the transaction, while the database and persistence provider implement the relevant transactional behavior."
      ],
      bullets: [
        "Begin: Spring starts a new transaction or participates in an existing one according to the propagation setting.",
        "Execute: The method performs its business logic and database operations.",
        "Commit: If the method completes successfully and the transaction is not marked rollback-only, Spring attempts to commit.",
        "Rollback: If a configured rollback condition occurs, Spring attempts to roll back the transaction.",
        "Default rollback behavior: Traditional Spring defaults roll back for unchecked RuntimeException and Error, but not for checked exceptions unless rollback rules are configured."
      ],
      code: {
        language: "text",
        code: `Client
  |
  v
Spring transactional proxy
  |
  v
Transaction manager
  |
  v
Service method
  |
  +--> Repository operation 1
  |
  +--> Repository operation 2
  |
  v
Commit or rollback`
      }
    },
    {
      id: "example",
      title: "Example Service",
      paragraphs: [
        "Consider an Employee Management application. The service layer receives an employee request and saves the employee through a Spring Data JPA repository.",
        "In this example, @Transactional marks the create method as transactional. When the method is invoked through the applicable Spring proxy, Spring applies the configured transaction behavior.",
        "The Employee and EmployeeRepository types are assumed to exist in the application. The repository typically extends JpaRepository<Employee, Long>."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }
}`
      },
      bullets: [
        "@Service: Registers the service as a Spring-managed bean.",
        "Constructor injection: Provides the repository dependency to the service.",
        "@Transactional: Applies transaction semantics to the method when the call passes through the transactional proxy.",
        "save(employee): Requests that the repository persist the employee.",
        "Transaction completion: Spring completes the transaction according to the transaction manager and the method outcome."
      ]
    },
    {
      id: "read-only",
      title: "Read-Only Transactions",
      paragraphs: [
        "A read-only transaction is intended for operations that primarily retrieve data. The readOnly attribute communicates this intention to Spring's transaction infrastructure and may enable optimizations in the persistence provider or database.",
        "Read-only is generally a hint, not a universal guarantee that every write will be rejected. Exact behavior depends on the transaction manager, JPA provider, database, and configuration.",
        "Use read-only transactions for service methods that retrieve data and do not intentionally modify persistent state. Do not assume that this setting alone provides database-level write protection."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeQueryService {

    private final EmployeeRepository employeeRepository;

    public EmployeeQueryService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public Employee findEmployee(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Employee not found: " + id
                )
            );
    }
}`
      },
      bullets: [
        "Use readOnly = true to communicate read intent.",
        "It can be useful for read-heavy service operations.",
        "It does not replace authorization or database permissions.",
        "Do not rely on it as a universal mechanism for rejecting INSERT, UPDATE, or DELETE operations."
      ]
    },
    {
      id: "proxy-limitations",
      title: "Important Proxy Considerations",
      paragraphs: [
        "In the common proxy-based transaction model, Spring wraps a managed bean with a proxy that intercepts eligible method calls. The proxy applies transaction advice before and after the method executes.",
        "A call from one Spring bean to another bean's transactional method can pass through the proxy. However, when a method in the same object calls another method on that same object, the call normally bypasses the proxy. This is known as self-invocation.",
        "Transaction behavior also depends on method visibility, proxy configuration, transaction manager selection, and the application's Spring configuration. With standard proxy-based configuration, public methods are the safest default for transactional service operations.",
        "A database transaction does not automatically make remote HTTP requests, email delivery, file operations, or messages to an unrelated external system part of the same atomic transaction. If a database change and an external action must be coordinated reliably, consider patterns such as the transactional outbox."
      ],
      bullets: [
        "Call the transactional method through the Spring-managed bean proxy.",
        "Avoid relying on self-invocation to activate a separate @Transactional declaration.",
        "Keep transactions focused on a single business operation.",
        "Avoid long-running work, unnecessary delays, and remote network calls inside a database transaction.",
        "Choose the transaction manager that matches the resources being coordinated.",
        "Do not assume that a successful repository save means an enclosing transaction has already committed."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    public void generateReport() {
        // Self-invocation: this call normally bypasses
        // the proxy for the method below.
        saveReport();
    }

    @Transactional
    public void saveReport() {
        // Database operations go here.
    }
}`
      }
    },
    {
      id: "propagation",
      title: "Transaction Propagation",
      paragraphs: [
        "Propagation defines how a transactional method behaves when it is called while another transaction already exists. Spring's default propagation setting is REQUIRED.",
        "Propagation is especially important when one service method calls another transactional service method. It determines whether the inner operation joins the existing transaction, creates a separate transaction, or requires a transaction to exist.",
        "Propagation does not automatically guarantee independent business success. For example, an inner REQUIRED method can mark the shared transaction rollback-only, preventing the outer transaction from committing."
      ],
      bullets: [
        "REQUIRED: Join the existing transaction if one exists; otherwise, start a new transaction. This is the default.",
        "REQUIRES_NEW: Suspend an existing transaction and start a separate transaction, when supported by the transaction manager.",
        "SUPPORTS: Join an existing transaction if available; otherwise, execute without a transaction.",
        "MANDATORY: Require an existing transaction; throw an exception if none exists.",
        "NOT_SUPPORTED: Suspend an existing transaction and execute without one, when supported.",
        "NEVER: Require that no transaction exists; throw an exception if one does.",
        "NESTED: Use a nested transaction when supported, commonly implemented with a savepoint within an existing transaction."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditService {

    @Transactional(
        propagation = Propagation.REQUIRES_NEW
    )
    public void recordAuditEvent() {
        // This method requests an independent transaction.
        // Actual support depends on the transaction manager.
    }
}`
      }
    },
    {
      id: "isolation",
      title: "Transaction Isolation",
      paragraphs: [
        "Isolation controls how concurrently executing transactions observe one another's database changes. The available behavior depends on the database and its transaction implementation.",
        "Spring exposes isolation levels through the isolation attribute of @Transactional. When a method joins an existing transaction, its requested isolation level might not replace the isolation level already in effect.",
        "Choose isolation based on the consistency requirements of the business operation. Higher isolation can reduce some concurrency anomalies but may also increase locking, contention, or retry requirements."
      ],
      bullets: [
        "DEFAULT: Use the database's configured default isolation level.",
        "READ_UNCOMMITTED: May allow dirty reads, depending on database behavior.",
        "READ_COMMITTED: Prevents dirty reads; non-repeatable reads may still occur.",
        "REPEATABLE_READ: Prevents non-repeatable reads under the defined isolation semantics; phantom behavior depends on the database implementation.",
        "SERIALIZABLE: Provides the strongest standard isolation level, with greater potential for contention or transaction retries."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountQueryService {

    @Transactional(
        readOnly = true,
        isolation = Isolation.READ_COMMITTED
    )
    public void readAccountData() {
        // Perform database reads here.
    }
}`
      },
      bullets: [
        "Use DEFAULT unless the business requirements justify a specific level.",
        "Do not assume every database implements isolation levels identically.",
        "Test concurrent operations against the actual database used by the application.",
        "Remember that isolation is different from propagation: isolation concerns visibility and concurrency, while propagation concerns transaction participation."
      ]
    },
    {
      id: "rollback",
      title: "Rollback Rules and Exception Handling",
      paragraphs: [
        "By default, Spring's traditional declarative transaction rules roll back when a method exits by throwing an unchecked RuntimeException or an Error. Checked exceptions do not trigger rollback by default.",
        "Use rollbackFor to request rollback for specified exception types. Use noRollbackFor when a specified exception should not trigger rollback through that rule. These settings should reflect the business meaning of the failure.",
        "Catching an exception and returning normally can prevent the transaction interceptor from seeing that exception. If the transaction must be rolled back after catching an exception, rethrow it or deliberately mark the transaction rollback-only when appropriate.",
        "Rollback rules are not the only factor that determines the outcome. A transaction can already be marked rollback-only by participating code, and the database or transaction manager may report failures during commit."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    @Transactional(rollbackFor = Exception.class)
    public void processPayment() throws Exception {
        // Debit the source account.
        // Credit the destination account.

        if (true) {
            throw new Exception("Payment processing failed");
        }
    }
}`
      },
      bullets: [
        "RuntimeException: Triggers rollback by default under traditional Spring rollback rules.",
        "Error: Triggers rollback by default.",
        "Checked exception: Does not trigger rollback by default unless a matching rollback rule applies.",
        "rollbackFor: Configures exception types that should trigger rollback.",
        "noRollbackFor: Configures exception types that should not trigger rollback through that rule.",
        "Spring Framework 6.2 and later can be configured with a global rollback policy that changes the default checked-exception behavior."
      ]
    },
    {
      id: "class-level",
      title: "Method-Level and Class-Level @Transactional",
      paragraphs: [
        "You can annotate an individual method or an entire class. A class-level annotation provides default transaction settings for eligible methods declared in that class, while a method-level annotation can provide more specific settings.",
        "Method-level transaction metadata takes precedence over class-level metadata for that method. This makes it possible to configure a service with a default transaction policy and override settings for a particular operation.",
        "For example, a service may use a default transaction for write operations and mark a reporting method as read-only. Keep the policy explicit and easy for developers to understand."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DepartmentService {

    public void createDepartment() {
        // Uses class-level transaction settings.
    }

    @Transactional(readOnly = true)
    public void listDepartments() {
        // Uses method-level read-only settings.
    }
}`
      },
      bullets: [
        "Class-level annotation: Supplies default transaction metadata.",
        "Method-level annotation: Defines or overrides metadata for an individual method.",
        "Be careful when overriding propagation, isolation, timeout, or read-only settings.",
        "Only eligible invocations intercepted by the transaction infrastructure receive the expected proxy-based behavior."
      ]
    },
    {
      id: "timeout",
      title: "Transaction Timeout",
      paragraphs: [
        "A transaction timeout specifies the time limit, in seconds, for a transaction. It can help prevent certain transactions from running indefinitely, although exact enforcement depends on the transaction manager and underlying resource.",
        "A timeout is not a universal guarantee that every Java operation or remote HTTP call will be interrupted at exactly that time. Configure separate connection, query, and HTTP timeouts where appropriate."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImportService {

    @Transactional(timeout = 10)
    public void importRecords() {
        // Perform database work with a configured
        // transaction timeout of 10 seconds.
    }
}`
      },
      bullets: [
        "Use timeouts to limit transaction duration where supported.",
        "Investigate slow queries and long-running transactions rather than simply increasing every timeout.",
        "Configure network and database-operation timeouts separately when required.",
        "Test timeout behavior with the actual transaction manager and database."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Assuming that every exception automatically causes rollback, including checked exceptions.",
        "Calling a transactional method from another method in the same object and expecting proxy advice to run.",
        "Catching an exception and returning normally even though the business operation should fail.",
        "Making slow remote HTTP calls while holding database locks.",
        "Assuming readOnly = true universally prevents writes.",
        "Using REQUIRES_NEW without considering additional database connections and independent commit behavior.",
        "Assuming an inner REQUIRED method can commit independently of the outer transaction.",
        "Expecting database rollback to undo an email, HTTP request, or external message that has already been sent.",
        "Applying different isolation settings to a method that joins an existing transaction and assuming the existing transaction's isolation will change.",
        "Testing transaction behavior without checking whether the test itself runs inside a test-managed transaction."
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      bullets: [
        "Define transaction boundaries around meaningful service-layer business operations.",
        "Keep transactions short and avoid unnecessary work while database locks are held.",
        "Use the default REQUIRED propagation unless another behavior is justified.",
        "Select isolation levels according to real consistency requirements and verify behavior against the target database.",
        "Configure rollbackFor when checked exceptions must trigger rollback.",
        "Use readOnly = true for read-focused operations when supported and beneficial.",
        "Do not rely on self-invocation for proxy-based transactional behavior.",
        "Keep remote service calls and other external side effects outside database transactions when practical.",
        "Consider an outbox pattern or another reliable coordination mechanism when a database update must be paired with event publication.",
        "Write integration tests that verify commit, rollback, and concurrency behavior using the actual persistence configuration.",
        "Monitor long-running transactions, lock waits, connection-pool pressure, and database errors.",
        "Remember that a transaction provides atomicity only for resources participating in that transaction; it is not automatically a distributed transaction."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is @Transactional in Spring Boot?",
          answer: "@Transactional declares transaction semantics for an eligible method or class. Spring uses transaction infrastructure, commonly through AOP proxies and a transaction manager, to coordinate transaction completion."
        },
        {
          question: "Where should @Transactional usually be applied?",
          answer: "It is commonly applied at the service layer around a business operation that groups related database changes."
        },
        {
          question: "What happens when a transactional method completes successfully?",
          answer: "If the transaction is not marked rollback-only and no commit failure occurs, Spring attempts to commit the transaction."
        },
        {
          question: "When does Spring roll back by default?",
          answer: "Under traditional Spring rollback rules, unchecked RuntimeException and Error trigger rollback by default. Checked exceptions do not unless configured otherwise."
        },
        {
          question: "How can I roll back for a checked exception?",
          answer: "Configure rollbackFor on @Transactional, such as @Transactional(rollbackFor = Exception.class), when that rollback policy matches the business requirements."
        },
        {
          question: "What is transaction propagation?",
          answer: "Propagation determines how a transactional method behaves when a transaction already exists, including whether it joins or creates a transaction."
        },
        {
          question: "What is REQUIRED propagation?",
          answer: "REQUIRED joins an existing transaction or starts a new one if none exists. It is Spring's default propagation behavior."
        },
        {
          question: "What is REQUIRES_NEW propagation?",
          answer: "REQUIRES_NEW suspends an existing transaction and starts a separate transaction when supported. The inner transaction can commit independently of the outer transaction."
        },
        {
          question: "What is transaction isolation?",
          answer: "Isolation controls how concurrent transactions observe database changes and which concurrency anomalies can occur."
        },
        {
          question: "What does readOnly = true mean?",
          answer: "It communicates read intent and may enable optimizations. It is not a universal guarantee that writes will be rejected."
        },
        {
          question: "What is self-invocation in Spring transactions?",
          answer: "Self-invocation occurs when one method calls another method on the same object. In proxy-based transaction management, that call normally bypasses the proxy and may bypass the second method's transaction advice."
        },
        {
          question: "Can a private method use @Transactional?",
          answer: "Private methods are not intercepted as transactional entry points by the standard proxy-based approach. Use an appropriately visible method on a Spring-managed bean and ensure calls pass through the proxy."
        },
        {
          question: "Can @Transactional be applied at the class level?",
          answer: "Yes. A class-level annotation supplies default transaction metadata for eligible methods. Method-level metadata can override those defaults."
        },
        {
          question: "What is the difference between REQUIRED and REQUIRES_NEW?",
          answer: "REQUIRED participates in an existing transaction when available. REQUIRES_NEW suspends the existing transaction and starts a separate one, subject to transaction-manager support."
        },
        {
          question: "Does @Transactional work for HTTP calls?",
          answer: "A database transaction does not automatically include a remote HTTP call. External effects need their own reliability and coordination strategy."
        },
        {
          question: "What happens if an exception is caught inside a transactional method?",
          answer: "If the exception is caught and the method returns normally, the interceptor may see successful completion and attempt to commit. The transaction can still roll back if it was marked rollback-only or another failure occurs."
        },
        {
          question: "What is rollback-only?",
          answer: "Rollback-only is a transaction state indicating that the transaction must not commit successfully. An outer method may encounter an unexpected rollback when it tries to complete a transaction already marked rollback-only."
        },
        {
          question: "Does @Transactional always start a new transaction?",
          answer: "No. With REQUIRED propagation, it joins an existing transaction when one is available and starts a new one only when necessary."
        },
        {
          question: "What is a transaction manager?",
          answer: "A transaction manager coordinates transaction lifecycle operations such as beginning, committing, and rolling back transactions for the configured persistence resources."
        },
        {
          question: "Can database rollback undo an email sent by the service?",
          answer: "No. A database rollback cannot retract an email that has already been sent. Reliable coordination may require an outbox pattern or another design for external side effects."
        },
        {
          question: "What does the timeout attribute do?",
          answer: "It specifies a transaction time limit in seconds where supported. It does not automatically replace every query, connection, or HTTP timeout."
        },
        {
          question: "What is the difference between propagation and isolation?",
          answer: "Propagation determines transaction participation and creation behavior. Isolation determines the visibility and concurrency rules for database operations."
        },
        {
          question: "Can an inner REQUIRED transaction commit independently?",
          answer: "No. It participates in the existing transaction. The overall transaction is completed by the outer transaction boundary, and inner failures may mark the shared transaction rollback-only."
        },
        {
          question: "How should transactional code be tested?",
          answer: "Use integration tests with the relevant Spring configuration and database to verify commit and rollback behavior. Avoid letting a test-managed transaction hide the actual service transaction outcome."
        }
      ]
    }
  ]
};
