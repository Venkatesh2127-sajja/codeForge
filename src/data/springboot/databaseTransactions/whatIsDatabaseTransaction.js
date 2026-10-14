
export const whatIsDatabaseTransaction = {
  id: 1005,
  title: "What Is a Database Transaction?",
  slug: "what-is-database-transaction",
  topicTitle: "Database & Transactions",
  description:
    "Understand database transactions, ACID properties, commit and rollback, and how Spring Boot manages reliable database operations.",
  estimatedTime: "28 min",
  sections: [
    {
      id: "concept",
      title: "What Is a Transaction?",
      paragraphs: [
        "A database transaction is a logical unit of work containing one or more database operations. The transaction is completed by committing its changes or rolling them back when the work cannot be completed successfully.",
        "Consider transferring ₹1,000 from Account A to Account B. The application must subtract ₹1,000 from Account A and add ₹1,000 to Account B. If the debit succeeds but the credit fails, the system must not leave the transfer partially completed.",
        "A transaction groups the debit and credit so that they participate in the same database transaction. If the transaction commits, both changes become part of the committed database state. If the transaction rolls back, neither change should remain as a committed effect of that transaction.",
        "Transactions are important in banking, e-commerce orders, employee registration, inventory management, booking systems, and other applications where several related database changes must be coordinated.",
        "A database transaction is managed by the database and its transaction infrastructure. In a Spring Boot application, Spring can coordinate this behavior through a transaction manager and declarative transaction management using @Transactional.",
        "A transaction does not automatically cover every action performed by a Java method. For example, sending an email or making an HTTP request is not automatically undone when the database transaction rolls back."
      ],
      bullets: [
        "Transaction: A logical group of database operations.",
        "Commit: Completes the transaction successfully, making its changes committed according to database guarantees.",
        "Rollback: Aborts the transaction and undoes its uncommitted database changes where supported.",
        "Consistency: The database must satisfy its applicable integrity constraints after a successful transaction.",
        "Transaction boundary: The point at which transactional work begins and its completion is coordinated."
      ],
      code: {
        language: "text",
        code: `Start transaction
       |
       v
Debit Account A
       |
       v
Credit Account B
       |
       v
Did all operations succeed?
       |
   +---+---+
   |       |
  Yes      No
   |       |
 Commit  Rollback
   |       |
   v       v
Both     Undo the
changes  uncommitted
commit   changes`
      }
    },
    {
      id: "acid",
      title: "ACID Properties",
      paragraphs: [
        "ACID is a set of properties used to describe reliable database transactions. The four properties are Atomicity, Consistency, Isolation, and Durability.",
        "Each property addresses a different concern. Atomicity focuses on all-or-nothing execution, consistency focuses on integrity rules, isolation focuses on concurrent transactions, and durability focuses on preserving committed changes."
      ],
      bullets: [
        "Atomicity: A transaction's database changes succeed as one unit or are rolled back. In a money transfer, the debit and credit should not be committed separately.",
        "Consistency: A successful transaction preserves defined database integrity rules. Examples include primary keys, foreign keys, unique constraints, check constraints, and business invariants enforced by the application or database.",
        "Isolation: Concurrent transactions interact according to the selected isolation level and database implementation. Isolation helps control anomalies such as dirty reads and conflicting updates.",
        "Durability: Once a transaction is committed, the database preserves the changes according to its durability guarantees, including the configured recovery and storage mechanisms."
      ],
      code: {
        language: "text",
        code: `A - Atomicity
    All changes succeed or fail together.

C - Consistency
    Integrity rules remain satisfied.

I - Isolation
    Concurrent transactions are controlled.

D - Durability
    Committed changes are preserved.`
      },
      paragraphs: [
        "Example: When an online order is placed, atomicity helps coordinate related database updates, consistency preserves data rules, isolation helps manage simultaneous orders, and durability protects the committed order against failures covered by the database's guarantees.",
        "ACID does not mean that application code can never contain a business logic bug. Consistency depends on the integrity rules that are actually defined and enforced, and durability depends on the database's configured guarantees."
      ]
    },
    {
      id: "example",
      title: "Money Transfer Example",
      paragraphs: [
        "Suppose Account A has ₹5,000 and Account B has ₹2,000. The application transfers ₹1,000 from A to B.",
        "After a successful transfer, Account A should have ₹4,000 and Account B should have ₹3,000. The combined balance remains ₹7,000, assuming there are no fees or other changes.",
        "The service method below places both account updates inside one Spring-managed transaction. It assumes that Account has debit and credit methods that validate their inputs, and that AccountRepository is a Spring Data JPA repository.",
        "The example also assumes that the application has a suitable strategy for concurrent transfers, such as optimistic locking, pessimistic locking, or an atomic database update. @Transactional alone does not prevent every concurrency race."
      ],
      code: {
        language: "java",
        code: `import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferService {

    private final AccountRepository accountRepository;

    public TransferService(
            AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void transfer(
            Long fromId,
            Long toId,
            BigDecimal amount) {

        if (amount == null
                || amount.signum() <= 0) {
            throw new IllegalArgumentException(
                "Transfer amount must be positive"
            );
        }

        if (fromId.equals(toId)) {
            throw new IllegalArgumentException(
                "Source and destination must differ"
            );
        }

        Account from = accountRepository.findById(fromId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Source account not found"
                )
            );

        Account to = accountRepository.findById(toId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Destination account not found"
                )
            );

        from.debit(amount);
        to.credit(amount);

        accountRepository.save(from);
        accountRepository.save(to);
    }
}`
      },
      bullets: [
        "The amount is validated before any account changes are made.",
        "Both accounts must exist before the transfer can proceed.",
        "The debit and credit occur within the same transaction when the method is invoked through Spring's transaction proxy.",
        "If an unchecked exception escapes the method and the transaction is eligible for rollback, the database changes are rolled back.",
        "If the transaction commits successfully, both account changes are committed together.",
        "A production banking system needs additional controls for concurrent transfers, authorization, auditability, idempotency, and appropriate database locking."
      ]
    },
    {
      id: "failure",
      title: "What Happens if an Operation Fails?",
      paragraphs: [
        "A transaction can fail because of a validation error, a database constraint violation, a connection problem, a deadlock, or an exception raised during business processing.",
        "If an unchecked RuntimeException or an Error escapes a Spring transactional method, traditional Spring rollback rules normally trigger rollback. Checked exceptions do not trigger rollback by default unless a matching rollback rule is configured.",
        "For example, if the debit succeeds in memory but the credit operation throws an unchecked exception, Spring can roll back the transaction so the debit is not committed by itself.",
        "Catching an exception inside a transactional method and returning normally can change the outcome because Spring's transaction interceptor may see normal method completion. However, the transaction may already be marked rollback-only, or a database error may still prevent commit.",
        "A successful return from an inner repository call does not always mean the entire transaction has committed. When a method participates in an outer transaction, the outer transaction boundary normally determines final completion.",
        "If the connection fails during commit, the application might not know whether the database committed successfully. This is one reason financial and order-processing operations need carefully designed idempotency and recovery strategies."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentRecordRepository paymentRecordRepository;

    public OrderService(
            OrderRepository orderRepository,
            PaymentRecordRepository paymentRecordRepository) {
        this.orderRepository = orderRepository;
        this.paymentRecordRepository = paymentRecordRepository;
    }

    @Transactional
    public void createOrder(Order order) {
        orderRepository.save(order);

        paymentRecordRepository.save(
            createPaymentRecord(order)
        );

        // If an unchecked exception escapes and rollback
        // rules apply, both database changes can roll back.
    }

    private PaymentRecord createPaymentRecord(Order order) {
        PaymentRecord record = new PaymentRecord();
        record.setOrderId(order.getId());
        return record;
    }
}`
      },
      bullets: [
        "Commit: The transaction completes successfully and its changes become committed.",
        "Rollback: The transaction aborts and its uncommitted database changes are undone.",
        "Rollback rules: Spring decides whether an exception triggers rollback based on the configured transaction rules.",
        "Constraint violation: The database may reject an insert or update because a defined integrity constraint is violated.",
        "Commit failure: A failure during commit may require additional error handling because the final outcome is not always known to the caller.",
        "External side effects: Database rollback does not automatically reverse an email, HTTP request, or external payment operation."
      ]
    },
    {
      id: "spring-boot",
      title: "How Spring Boot Manages Transactions",
      paragraphs: [
        "In a typical Spring Boot application using Spring Data JPA, a service method can be annotated with @Transactional. When the method is called through the relevant Spring-managed proxy, transaction advice coordinates the transaction lifecycle.",
        "Spring's transaction manager starts or joins a transaction according to the propagation configuration. Repository operations then participate in the applicable transaction when they use the same transactional resources and configuration.",
        "If the method completes successfully and the transaction is not marked rollback-only, Spring attempts to commit. If a configured rollback condition occurs, Spring attempts to roll back.",
        "For JPA applications, a JpaTransactionManager is commonly used to manage transactions associated with an EntityManager. JDBC applications can use a DataSourceTransactionManager or another appropriate transaction manager, depending on the Spring version and configuration.",
        "The database remains responsible for its own transactional guarantees. Spring coordinates the transaction lifecycle; it does not replace the database's transaction engine."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Controller
     |
     v
Service method with @Transactional
     |
     v
Spring transaction proxy
     |
     v
Transaction manager
     |
     v
Repository / EntityManager / JDBC
     |
     v
Database operations
     |
     v
Commit or rollback`
      },
      bullets: [
        "@Transactional: Declares transaction behavior.",
        "Spring proxy: Intercepts eligible calls in the common proxy-based model.",
        "Transaction manager: Coordinates transaction begin, commit, and rollback.",
        "Repository: Performs database operations through the configured persistence infrastructure.",
        "Database: Enforces its transactional and integrity guarantees.",
        "Self-invocation: A method calling another method on the same object normally bypasses proxy-based transaction advice."
      ]
    },
    {
      id: "commit-rollback",
      title: "COMMIT vs ROLLBACK",
      paragraphs: [
        "COMMIT completes the current transaction successfully. Its changes become committed and are preserved according to the database's durability guarantees.",
        "ROLLBACK aborts the current transaction and undoes its uncommitted database changes. It does not normally undo changes that were committed in a separate transaction.",
        "In Spring applications, the transaction manager usually performs commit or rollback automatically at the transactional boundary. Application code generally does not need to execute SQL COMMIT or ROLLBACK manually when using declarative transaction management."
      ],
      code: {
        language: "sql",
        code: `-- Example of explicit transaction control in SQL.
-- Exact syntax and behavior depend on the database.

START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;

-- If the operation must be abandoned before commit:
-- ROLLBACK;`
      },
      bullets: [
        "COMMIT: Finalizes the transaction successfully.",
        "ROLLBACK: Aborts the transaction and undoes its uncommitted changes.",
        "Spring declarative transactions: Let Spring coordinate transaction completion.",
        "Separate transactions: A committed transaction is not automatically undone by rolling back another transaction."
      ]
    },
    {
      id: "real-world-examples",
      title: "Real-World Uses of Database Transactions",
      paragraphs: [
        "Transactions are used wherever multiple related database changes must preserve a consistent result. The exact transaction boundary depends on the application's business requirements and architecture."
      ],
      bullets: [
        "Banking: Debit one account and credit another as part of one database transaction.",
        "E-commerce: Save an order and its order items consistently.",
        "Inventory: Update stock and related reservation records while preserving inventory rules.",
        "Employee management: Save employee information and associated database records together.",
        "Ticket booking: Create a booking and update relevant seat-allocation records with suitable concurrency control.",
        "Catering applications: Create an order and its order-item records in a consistent transaction.",
        "Payment processing: Store payment state and related records reliably, while coordinating external payment-provider calls using suitable distributed-workflow patterns."
      ],
      code: {
        language: "text",
        code: `E-commerce order transaction

Begin transaction
       |
       v
Insert order
       |
       v
Insert order items
       |
       v
Update inventory
       |
       v
All required database operations succeed?
       |
   +---+---+
   |       |
  Yes      No
   |       |
 Commit  Rollback`
      }
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Assuming every exception automatically triggers rollback, including checked exceptions.",
        "Applying @Transactional to a method and then calling it through self-invocation.",
        "Assuming a transaction automatically includes remote HTTP requests, email delivery, or external payment processing.",
        "Keeping transactions open during slow network calls or unnecessary processing.",
        "Assuming @Transactional alone prevents lost updates or every concurrent inventory race.",
        "Catching an exception and returning normally without considering whether rollback is required.",
        "Assuming a repository save always means the outer transaction has already committed.",
        "Using floating-point types such as float or double for financial amounts instead of an appropriate decimal representation such as BigDecimal.",
        "Ignoring database constraints that can enforce critical integrity rules.",
        "Assuming a failure during commit always means the transaction definitely rolled back."
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      bullets: [
        "Define transaction boundaries around meaningful business operations.",
        "Use @Transactional at the service layer when multiple repository operations must succeed or fail together.",
        "Validate business inputs before performing database changes.",
        "Use appropriate database constraints to enforce integrity rules.",
        "Use BigDecimal for monetary calculations when decimal arithmetic is required.",
        "Choose transaction isolation and locking strategies based on concurrency requirements.",
        "Keep transactions short and avoid unnecessary network calls inside them.",
        "Configure rollback rules explicitly when checked exceptions must trigger rollback.",
        "Design idempotent operations and recovery strategies for uncertain outcomes in critical workflows.",
        "Use an outbox or another suitable coordination pattern when a database change must reliably trigger an external event.",
        "Test commit and rollback behavior with integration tests against the configured persistence infrastructure.",
        "Monitor transaction duration, deadlocks, database errors, and connection-pool utilization."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is a database transaction?",
          answer: "A database transaction is a logical unit of work containing one or more operations that are committed together or rolled back when the transaction is aborted."
        },
        {
          question: "What are ACID properties?",
          answer: "ACID stands for Atomicity, Consistency, Isolation, and Durability."
        },
        {
          question: "What is atomicity?",
          answer: "Atomicity means that a transaction's changes succeed as a unit or are rolled back rather than being committed as a partial transaction."
        },
        {
          question: "What is consistency?",
          answer: "Consistency means that a successful transaction preserves the database's defined integrity constraints and invariants."
        },
        {
          question: "What is isolation?",
          answer: "Isolation controls how concurrent transactions interact and which concurrent changes they can observe, according to the configured isolation behavior."
        },
        {
          question: "What is durability?",
          answer: "Durability means that committed changes are preserved according to the database's configured durability and recovery guarantees."
        },
        {
          question: "What is the difference between COMMIT and ROLLBACK?",
          answer: "COMMIT completes a transaction successfully, while ROLLBACK aborts it and undoes its uncommitted database changes."
        },
        {
          question: "Why are transactions important?",
          answer: "Transactions help maintain consistent database state when related operations must succeed or fail together, such as debiting and crediting bank accounts."
        },
        {
          question: "What does @Transactional do in Spring Boot?",
          answer: "It declares transaction semantics for an eligible method or class. Spring's transaction infrastructure coordinates the transaction lifecycle."
        },
        {
          question: "Where should @Transactional usually be applied?",
          answer: "It is commonly applied at the service layer around a business operation that groups related database changes."
        },
        {
          question: "When does Spring roll back by default?",
          answer: "Traditional Spring rollback rules roll back for unchecked RuntimeException and Error by default. Checked exceptions do not trigger rollback unless a matching rule is configured."
        },
        {
          question: "Does a database transaction include an HTTP request?",
          answer: "Not automatically. A database transaction does not generally undo a remote HTTP request, email, or external service operation."
        },
        {
          question: "What happens if the second database operation fails?",
          answer: "If both operations participate in the same transaction and the failure causes rollback, the first operation's uncommitted change is also rolled back."
        },
        {
          question: "What is the role of a transaction manager?",
          answer: "A transaction manager coordinates operations such as beginning, committing, and rolling back transactions for the configured resources."
        },
        {
          question: "Can @Transactional prevent lost updates?",
          answer: "Not by itself in every situation. The application may need appropriate isolation, optimistic or pessimistic locking, conditional updates, or database constraints."
        },
        {
          question: "What is the difference between a transaction and a database query?",
          answer: "A query is an individual database operation. A transaction can group multiple database operations into one logical unit of work."
        },
        {
          question: "What happens if an exception is caught inside a transactional method?",
          answer: "If the method returns normally, Spring may attempt to commit unless the transaction has already been marked rollback-only or another failure prevents commit."
        },
        {
          question: "What is a transaction boundary?",
          answer: "A transaction boundary defines the scope of work coordinated as one transaction, including where transaction completion is handled."
        },
        {
          question: "Can a committed transaction be rolled back later?",
          answer: "A normal rollback cannot undo a transaction that has already committed. Reversing a committed business operation generally requires a new compensating transaction."
        },
        {
          question: "How do you test a transaction?",
          answer: "Use integration tests to verify that successful operations commit their changes and failures cause the expected rollback, using the actual transaction configuration where practical."
        }
      ]
    }
  ]
};
