
export const transactionPropagation = {
  id: 1007,
  title: "Transaction Propagation",
  slug: "transaction-propagation",
  topicTitle: "Database & Transactions",
  description:
    "Understand all Spring transaction propagation modes, how nested service calls share or create transactions, and how propagation affects commits, rollbacks, and database consistency.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "concept",
      title: "What Is Transaction Propagation?",
      paragraphs: [
        "Transaction propagation defines how a method behaves when it is called while a transaction already exists. Spring provides propagation settings through the @Transactional annotation.",
        "Consider an Employee Management application. An employee registration operation might save employee details, create a department assignment, and record an audit event. These operations may call different service methods, so Spring must determine whether they share one transaction or execute in separate transactions.",
        "Propagation answers questions such as: Should the called method join the existing transaction? Should it start an independent transaction? Should it fail if a transaction is missing? Should it execute without a transaction?",
        "Spring defines seven propagation behaviors: REQUIRED, REQUIRES_NEW, SUPPORTS, MANDATORY, NOT_SUPPORTED, NEVER, and NESTED. REQUIRED is the default.",
        "Propagation is different from isolation. Propagation controls transaction participation and creation behavior. Isolation controls how concurrent transactions observe database changes.",
        "In the common proxy-based transaction model, propagation settings are applied when an eligible method call passes through Spring's transaction proxy. Self-invocation within the same object normally bypasses that proxy."
      ],
      code: {
        language: "text",
        code: `Client
  |
  v
EmployeeService
  |
  +----> DepartmentService
  |
  +----> AuditService
  |
  v
Transaction manager
  |
  +----> Join existing transaction?
  |
  +----> Start independent transaction?
  |
  +----> Execute without a transaction?
  |
  v
Commit or rollback according to transaction rules`
      },
      bullets: [
        "Propagation is configured with @Transactional(propagation = Propagation.REQUIRED), for example.",
        "If no propagation attribute is specified, Spring uses REQUIRED.",
        "A transaction can be created by an outer service method and reused by multiple inner service methods.",
        "A separate transaction can commit even if an outer transaction later rolls back, depending on the propagation mode.",
        "Actual behavior depends on the transaction manager, resource support, and whether the call is intercepted."
      ]
    },
    {
      id: "required",
      title: "REQUIRED",
      paragraphs: [
        "REQUIRED is Spring's default propagation mode. If a transaction already exists, the method joins it. If no transaction exists, Spring starts a new transaction for the method.",
        "When multiple REQUIRED methods participate in the same transaction, their database operations are normally committed or rolled back together. An inner method does not independently commit the shared transaction.",
        "If an inner REQUIRED operation encounters a failure that marks the shared transaction rollback-only, the outer method cannot simply commit successfully by catching the original exception. The outer transaction may fail with an UnexpectedRollbackException when completion is attempted.",
        "Use REQUIRED for ordinary business operations where multiple service methods should participate in one atomic unit of work."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentService departmentService;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            DepartmentService departmentService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void registerEmployee(Employee employee) {
        employeeRepository.save(employee);

        departmentService.assignEmployee(employee);
    }
}`
      },
      bullets: [
        "If registerEmployee starts the transaction, assignEmployee can join that transaction when it uses REQUIRED and is invoked through its Spring proxy.",
        "If assignEmployee fails and the shared transaction is marked rollback-only, the employee registration may roll back as well.",
        "If registerEmployee is called inside another transaction, it normally participates in that existing transaction.",
        "The transaction's final commit or rollback is coordinated by the applicable outer transaction boundary."
      ]
    },
    {
      id: "requires-new",
      title: "REQUIRES_NEW",
      paragraphs: [
        "REQUIRES_NEW always requests an independent transaction for the method. If an outer transaction exists, Spring suspends it while the inner transaction executes, provided the transaction manager supports this behavior.",
        "The inner transaction has its own commit or rollback outcome. If the inner method commits successfully, that committed work normally remains committed even if the outer transaction subsequently rolls back.",
        "This behavior can be useful when an audit record must survive the failure of a larger business operation. However, the decision to make audit records independent should reflect the application's compliance and consistency requirements.",
        "The outer transaction is suspended, not committed. Its database locks may remain held while the inner transaction executes. If the inner transaction needs a lock held by the suspended outer transaction, the application can block or time out.",
        "The inner transaction may require another database connection while the outer transaction's connection remains associated with its suspended transaction. Connection-pool capacity and concurrent workload therefore matter."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditService {

    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordAuditEvent(String message) {
        AuditEvent event = new AuditEvent();
        event.setMessage(message);

        auditRepository.save(event);
    }
}`
      },
      bullets: [
        "REQUIRES_NEW does not join the outer transaction.",
        "An inner commit can survive an outer rollback.",
        "An inner rollback does not automatically roll back an otherwise independent outer transaction.",
        "The inner transaction can still fail because of database errors, constraint violations, timeouts, or other failures.",
        "The outer transaction resumes after the inner transaction completes or fails, subject to exception handling and transaction-manager behavior.",
        "Use this mode deliberately because it changes the atomicity boundary of the business operation."
      ]
    },
    {
      id: "other-modes",
      title: "Other Propagation Modes",
      paragraphs: [
        "The remaining propagation modes define whether a transaction is optional, required, prohibited, suspended, or nested within an existing transaction.",
        "They are less common than REQUIRED, but they are useful when a service must enforce a particular transaction context or deliberately execute without one."
      ],
      bullets: [
        "SUPPORTS: Joins an existing transaction if one exists; otherwise, executes without an actual transaction. Some transaction managers may still apply synchronization behavior without an actual transaction.",
        "MANDATORY: Requires an existing transaction. If no transaction exists, Spring throws an IllegalTransactionStateException.",
        "NOT_SUPPORTED: Executes without an actual transaction, suspending an existing transaction when supported.",
        "NEVER: Requires that no transaction exists. If a transaction exists, Spring throws an IllegalTransactionStateException.",
        "NESTED: Requests a nested transaction when supported, commonly using a savepoint within an existing transaction. If no transaction exists, behavior generally begins like REQUIRED."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportingService {

    @Transactional(propagation = Propagation.SUPPORTS)
    public void readOptionalTransactionalData() {
        // Participate in a transaction if available.
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void updateWithinExistingTransaction() {
        // The caller must already have a transaction.
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void performNonTransactionalWork() {
        // An existing transaction is suspended if supported.
    }

    @Transactional(propagation = Propagation.NEVER)
    public void executeOnlyWithoutTransaction() {
        // Fails if a transaction already exists.
    }

    @Transactional(propagation = Propagation.NESTED)
    public void performNestedWork() {
        // Nested/savepoint behavior depends on support.
    }
}`
      },
      paragraphs: [
        "NESTED is not equivalent to REQUIRES_NEW. A nested transaction commonly uses a savepoint inside the existing physical transaction, so rolling back to that savepoint does not independently commit the nested work.",
        "Support for NESTED depends on the transaction manager and resource. For example, savepoint-based behavior may be available with JDBC transaction management, while JPA transaction managers and persistence providers may impose limitations.",
        "Do not assume every propagation mode creates a physical database transaction. SUPPORTS, NOT_SUPPORTED, and NEVER can execute without one."
      ]
    },
    {
      id: "caution",
      title: "Practical Cautions",
      paragraphs: [
        "Propagation settings determine how Spring coordinates transaction boundaries, but they do not eliminate all concurrency, resource-management, or distributed-system problems.",
        "Always distinguish the logical method boundary from the physical database transaction. Multiple REQUIRED method calls can participate in one physical transaction, whereas REQUIRES_NEW requests a separate transaction."
      ],
      bullets: [
        "Proxy limitations: With proxy-based transaction management, self-invocation normally bypasses transaction advice.",
        "Independent commits: REQUIRES_NEW can commit work that survives an outer rollback. Use it only when this behavior is intentional.",
        "Connection pools: An inner REQUIRES_NEW transaction may need an additional connection while an outer transaction is suspended.",
        "Lock interactions: The suspended outer transaction may continue holding database locks needed by the inner transaction.",
        "Savepoint support: NESTED depends on transaction-manager and resource capabilities.",
        "Remote services: Neither REQUIRED nor REQUIRES_NEW automatically includes an HTTP request, email, or external message in the database transaction.",
        "Exception handling: Catching an exception does not guarantee that a shared transaction can commit; the transaction may already be marked rollback-only.",
        "Testing: Verify propagation with integration tests using the actual transaction manager and database configuration."
      ]
    },
    {
      id: "real-world-example",
      title: "Real-World Example: Employee Registration and Audit",
      paragraphs: [
        "Suppose an application registers an employee and records an audit event. The business requirement is that employee registration must succeed or fail as one unit, but an audit event recording the attempt should be committed independently.",
        "The outer EmployeeService method uses REQUIRED. The AuditService method uses REQUIRES_NEW. When the audit method is called through its Spring-managed proxy, Spring suspends the outer transaction and executes the audit operation in its own transaction.",
        "If the audit transaction commits and the employee registration later fails, the audit record can remain in the database. This example demonstrates why choosing propagation changes the business semantics of an application."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeRegistrationService {

    private final EmployeeRepository employeeRepository;
    private final AuditService auditService;

    public EmployeeRegistrationService(
            EmployeeRepository employeeRepository,
            AuditService auditService) {
        this.employeeRepository = employeeRepository;
        this.auditService = auditService;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void register(Employee employee) {
        employeeRepository.save(employee);

        auditService.recordAuditEvent(
            "Employee registration attempted"
        );

        // If a later failure causes this transaction
        // to roll back, the independent audit commit
        // can remain committed.
    }
}`
      },
      bullets: [
        "EmployeeRegistrationService starts or joins the main business transaction.",
        "AuditService uses a separate transaction when called through its Spring proxy.",
        "The audit transaction completes before the outer method continues.",
        "A later outer rollback does not undo an already committed audit transaction.",
        "If the audit operation fails, the failure can propagate to the outer method; whether the outer transaction rolls back depends on exception handling and rollback rules.",
        "An audit record written in REQUIRES_NEW is not automatically proof that employee registration succeeded. Choose event names and statuses that accurately represent the business process."
      ]
    },
    {
      id: "comparison",
      title: "REQUIRED vs REQUIRES_NEW vs NESTED",
      paragraphs: [
        "These three propagation modes are often compared in interviews because they differ in transaction sharing and rollback behavior.",
        "REQUIRED is appropriate when related work must be committed or rolled back together. REQUIRES_NEW is appropriate when a particular operation needs an independent commit boundary. NESTED can provide partial rollback to a savepoint when the underlying transaction infrastructure supports it."
      ],
      bullets: [
        "REQUIRED: Joins the existing transaction. Inner work shares the outer transaction's final outcome.",
        "REQUIRES_NEW: Suspends the outer transaction and starts an independent transaction. Inner work can commit independently.",
        "NESTED: Commonly uses a savepoint inside the existing transaction. Rolling back nested work can return to the savepoint, but the outer transaction must still complete.",
        "REQUIRED and NESTED can both participate in the same underlying physical transaction, but NESTED introduces a savepoint boundary when supported.",
        "REQUIRES_NEW can consume additional connections and introduce lock interactions; NESTED generally does not require an independent physical transaction."
      ],
      code: {
        language: "text",
        code: `REQUIRED
Outer transaction begins
  |
  +--> Inner method joins outer transaction
  |
Outer transaction commits or rolls back


REQUIRES_NEW
Outer transaction begins
  |
  +--> Outer transaction suspended
  |       |
  |       +--> Independent inner transaction
  |       |       |
  |       |       +--> Inner commit or rollback
  |       |
  +--> Outer transaction resumes
  |
Outer transaction commits or rolls back


NESTED (when savepoints are supported)
Outer transaction begins
  |
  +--> Savepoint created
  |
  +--> Nested database work
          |
          +--> Success: continue outer transaction
          |
          +--> Failure: roll back to savepoint
  |
Outer transaction still must commit or roll back`
      }
    },
    {
      id: "best-practices",
      title: "Best Practices",
      bullets: [
        "Use REQUIRED as the default for ordinary business operations that should share one transaction.",
        "Use REQUIRES_NEW only when an independent commit or rollback boundary is an explicit requirement.",
        "Use MANDATORY to enforce that a method is called within an existing transaction.",
        "Use NEVER or NOT_SUPPORTED only when the operation genuinely must not execute within the caller's transaction.",
        "Use NESTED only after confirming savepoint and transaction-manager support.",
        "Keep transactions short and avoid slow external calls while holding database locks.",
        "Ensure transactional calls pass through Spring-managed proxies when using proxy-based transaction management.",
        "Handle rollback-only states and exceptions intentionally instead of swallowing failures without considering transaction status.",
        "Check connection-pool sizing when nested service calls use REQUIRES_NEW.",
        "Write integration tests that verify both database state and the independent commit behavior of different propagation modes."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is transaction propagation?",
          answer: "Transaction propagation defines how a transactional method behaves when a transaction already exists, including whether it joins, suspends, or requires a transaction."
        },
        {
          question: "What is the default propagation in Spring?",
          answer: "Propagation.REQUIRED is the default."
        },
        {
          question: "What does REQUIRED do?",
          answer: "REQUIRED joins an existing transaction or starts a new one if none exists."
        },
        {
          question: "What is the difference between REQUIRED and REQUIRES_NEW?",
          answer: "REQUIRED joins an existing transaction when possible. REQUIRES_NEW suspends an existing transaction and starts an independent transaction."
        },
        {
          question: "Can a REQUIRES_NEW transaction commit when the outer transaction rolls back?",
          answer: "Yes. If the inner transaction commits successfully, its changes normally remain committed even if the outer transaction later rolls back."
        },
        {
          question: "What is SUPPORTS propagation?",
          answer: "SUPPORTS participates in an existing transaction if available; otherwise, it executes without an actual transaction."
        },
        {
          question: "What is MANDATORY propagation?",
          answer: "MANDATORY requires an existing transaction and throws IllegalTransactionStateException if none exists."
        },
        {
          question: "What is NOT_SUPPORTED propagation?",
          answer: "NOT_SUPPORTED executes without an actual transaction and suspends an existing transaction when the transaction manager supports suspension."
        },
        {
          question: "What is NEVER propagation?",
          answer: "NEVER requires that no transaction exists. If a transaction is active, Spring throws IllegalTransactionStateException."
        },
        {
          question: "What is NESTED propagation?",
          answer: "NESTED requests nested transaction behavior, commonly through a savepoint within an existing transaction when supported by the transaction manager and resource."
        },
        {
          question: "What is the difference between NESTED and REQUIRES_NEW?",
          answer: "NESTED commonly uses a savepoint within the existing physical transaction, while REQUIRES_NEW uses an independent transaction that can commit separately."
        },
        {
          question: "Can a REQUIRED inner method roll back the outer transaction?",
          answer: "Yes. Because it shares the transaction, an inner failure can mark the shared transaction rollback-only. The outer transaction may then fail to commit even if the original exception was caught."
        },
        {
          question: "Does REQUIRES_NEW require an additional database connection?",
          answer: "It may require another connection while the outer transaction's connection remains associated with the suspended transaction. The exact resource behavior depends on the transaction manager and configuration."
        },
        {
          question: "Can REQUIRES_NEW cause a connection-pool problem?",
          answer: "Yes. Nested calls can increase simultaneous connection demand. An undersized pool can cause connection acquisition waits or resource exhaustion."
        },
        {
          question: "Can NESTED roll back only part of the work?",
          answer: "When savepoint-based nested transactions are supported, the nested portion can roll back to a savepoint while the outer transaction continues. The outer transaction must still complete normally."
        },
        {
          question: "Does propagation apply during self-invocation?",
          answer: "With standard proxy-based transaction management, a method calling another method on the same object normally bypasses the proxy, so the second method's transactional advice may not be applied."
        },
        {
          question: "Can REQUIRES_NEW make a remote HTTP request transactional?",
          answer: "No. REQUIRES_NEW creates an independent transaction for supported transactional resources; it does not automatically make an external HTTP request atomic with the database."
        },
        {
          question: "When should MANDATORY be used?",
          answer: "Use MANDATORY when a method is valid only as part of an existing transaction and should fail when called without one."
        },
        {
          question: "Does NOT_SUPPORTED commit the outer transaction before running?",
          answer: "No. It suspends the outer transaction when supported; it does not automatically commit it. The outer transaction resumes afterward."
        },
        {
          question: "How do you test transaction propagation?",
          answer: "Use integration tests with the actual transaction manager and database. Verify which changes persist after successful completion, inner failures, and outer rollbacks."
        }
      ]
    }
  ]
};
