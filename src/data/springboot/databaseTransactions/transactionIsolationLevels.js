
export const transactionIsolationLevels = {
  id: 1008,
  title: "Transaction Isolation Levels",
  slug: "transaction-isolation-levels",
  topicTitle: "Database & Transactions",
  description:
    "Understand transaction isolation levels, concurrency anomalies, database locking, and how to configure isolation in Spring Boot applications.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "concept",
      title: "What Is Isolation?",
      paragraphs: [
        "Transaction isolation is one of the ACID properties of a database transaction. It controls how concurrently executing transactions observe changes made by other transactions.",
        "Imagine two users trying to purchase the last available product at the same time. Both requests read the inventory as 1. If both independently decide that the product is available, both might attempt to purchase it. Correct concurrency control is necessary to prevent inconsistent business results.",
        "Isolation levels define guarantees about which concurrent changes a transaction can observe. Stronger isolation generally provides stronger consistency guarantees, but it can also reduce concurrency or introduce additional locking, retries, or overhead.",
        "Isolation is different from atomicity. Atomicity concerns whether a transaction's changes succeed or fail as a unit. Isolation concerns how concurrent transactions interact while those changes are being processed.",
        "The exact behavior depends on the database engine, storage engine, transaction manager, and concurrency-control implementation. Databases may use locks, multiversion concurrency control (MVCC), or a combination of these techniques."
      ],
      bullets: [
        "Atomicity: A transaction's operations succeed or fail as a unit.",
        "Consistency: A transaction preserves the database's defined integrity rules.",
        "Isolation: Concurrent transactions interact according to the selected isolation guarantees.",
        "Durability: Successfully committed changes are preserved according to the database's durability guarantees."
      ],
      code: {
        language: "text",
        code: `Transaction A                  Transaction B
     |                               |
     | Read product stock = 1        |
     |                               | Read product stock = 1
     | Decrease stock to 0            |
     |                               | Decrease stock to 0
     | Commit                         | Commit
     |                               |
     +------ Possible race condition-+

Isolation and appropriate concurrency control help
prevent invalid results from concurrent operations.`
      }
    },
    {
      id: "anomalies",
      title: "Common Concurrency Anomalies",
      paragraphs: [
        "A concurrency anomaly occurs when the interaction between transactions produces a result that violates the application's expected consistency rules.",
        "Understanding these anomalies is important because choosing an isolation level requires knowing which concurrent behaviors the application must prevent."
      ],
      bullets: [
        "Dirty read: A transaction reads a value written by another transaction before that value has been committed.",
        "Non-repeatable read: A transaction reads the same row twice and observes different committed values because another transaction modified and committed the row between the reads.",
        "Phantom read: A transaction repeats a query with the same search condition and sees a different set of matching rows because another transaction inserted, deleted, or changed rows so that they match the condition.",
        "Lost update: Two transactions read the same original value and then write competing updates. One update overwrites the other's result.",
        "Write skew: Two transactions read overlapping data and update different rows, but their combined result violates a business invariant. This can occur under snapshot-based isolation that is weaker than serializable isolation.",
        "Inconsistent analysis: A transaction calculates an aggregate while other transactions modify related rows, potentially observing a combination of values that does not match the application's intended consistency requirements."
      ],
      code: {
        language: "text",
        code: `Example: Dirty Read

Transaction A                 Transaction B
     |                              |
     | UPDATE account               |
     | SET balance = 500            |
     |                              | SELECT balance
     |                              | Reads 500
     | ROLLBACK                     |
     |                              |
     |                              | Used an uncommitted
     |                              | value that was undone`
      },
      paragraphs: [
        "A dirty read is particularly dangerous when business decisions are made using data that might later be rolled back.",
        "A lost update is different from a dirty read: the competing transactions can both read committed data, yet one transaction's later write can overwrite the other transaction's intended change."
      ]
    },
    {
      id: "levels",
      title: "Standard Isolation Levels",
      paragraphs: [
        "SQL defines four commonly discussed standard isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE.",
        "The levels describe increasing isolation guarantees in the standard model. However, real databases can use different concurrency-control mechanisms, so the name alone does not describe every possible anomaly or performance characteristic."
      ],
      bullets: [
        "READ_UNCOMMITTED: The weakest standard level. It permits dirty reads under the standard model. Some databases do not actually allow dirty reads even when this level is requested.",
        "READ_COMMITTED: A transaction does not read another transaction's uncommitted changes. A later read may see a newly committed value, so non-repeatable reads can occur.",
        "REPEATABLE_READ: Prevents dirty reads and non-repeatable reads under the standard model. Phantom-read guarantees and other concurrency behaviors depend on the database implementation.",
        "SERIALIZABLE: The strongest standard isolation level. Concurrent transactions must produce results equivalent to some serial execution order, although a database may block operations or abort transactions to maintain this guarantee."
      ],
      code: {
        language: "text",
        code: `Typical standard-model guarantees

Isolation Level     Dirty Reads   Non-repeatable   Phantoms
                                  Reads
-----------------------------------------------------------
READ_UNCOMMITTED    Possible      Possible         Possible
READ_COMMITTED      Prevented     Possible         Possible
REPEATABLE_READ     Prevented     Prevented        Possible*
SERIALIZABLE        Prevented     Prevented        Prevented*

*Standard-model summary. Actual database behavior can
differ due to MVCC, locking, and implementation details.`
      },
      paragraphs: [
        "READ COMMITTED is a common choice for general-purpose applications because it prevents dirty reads while permitting useful concurrency. REPEATABLE READ and SERIALIZABLE can be appropriate when a business operation requires stronger guarantees.",
        "For example, MySQL InnoDB commonly defaults to REPEATABLE READ, while PostgreSQL commonly defaults to READ COMMITTED. Always check the actual database and transaction configuration instead of assuming that all databases share the same default.",
        "A database using MVCC can provide snapshot-based reads without holding ordinary read locks for the entire transaction. This can improve concurrency, but snapshot isolation is not automatically equivalent to serializable isolation."
      ]
    },
    {
      id: "configuration",
      title: "Configure Isolation in Spring",
      paragraphs: [
        "Spring lets you request an isolation level using the isolation attribute of @Transactional. The annotation belongs to org.springframework.transaction.annotation.Transactional, and the isolation constants come from org.springframework.transaction.annotation.Isolation.",
        "The setting is relevant when the transaction manager starts a new transaction. If the method joins an existing transaction, the requested isolation level might not replace the isolation level already in effect.",
        "For an operation that updates inventory, you might request READ_COMMITTED. This prevents dirty reads under the standard model, but it does not alone prevent two transactions from purchasing the same final item. Appropriate locking, conditional updates, constraints, or another concurrency-control strategy may still be required.",
        "The following example assumes that InventoryRepository is a Spring-managed repository and that the Inventory entity has the required fields and persistence mapping."
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
    public void updateInventory(Long productId, int quantity) {
        Inventory inventory = inventoryRepository
            .findById(productId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    "Product not found"
                )
            );

        if (inventory.getStock() < quantity) {
            throw new IllegalStateException(
                "Insufficient stock"
            );
        }

        inventory.setStock(inventory.getStock() - quantity);
        inventoryRepository.save(inventory);
    }
}`
      },
      bullets: [
        "Import Isolation and Transactional from Spring's transaction packages.",
        "Place the annotation on an eligible method or class managed by Spring.",
        "Ensure the call passes through the transaction proxy when using proxy-based transaction management.",
        "Verify that the selected transaction manager and database support the requested isolation behavior.",
        "Do not assume that selecting an isolation level automatically solves every race condition."
      ]
    },
    {
      id: "choosing",
      title: "How to Choose an Isolation Level",
      paragraphs: [
        "The correct isolation level depends on the business invariant, the database's concurrency model, the expected workload, and the cost of blocking or retrying transactions.",
        "Start by identifying the anomaly that could cause an incorrect business result. Then select an appropriate database constraint, conditional update, locking strategy, or isolation level and test it under concurrent load.",
        "For example, an inventory system must prevent stock from becoming negative. A simple read followed by a write can be unsafe under concurrency, even if dirty reads are prevented. A conditional database update or an appropriate locking strategy may be more effective than increasing isolation alone."
      ],
      bullets: [
        "Start with the database's configured default isolation level.",
        "Identify which anomalies matter for the specific business operation.",
        "Use database constraints to enforce invariants that must always hold.",
        "Consider optimistic locking with a version field when conflicts are relatively uncommon.",
        "Consider pessimistic locking when a transaction needs to protect selected rows while performing a critical operation.",
        "Use SERIALIZABLE when the required consistency cannot be safely achieved with a weaker level and the performance trade-offs are acceptable.",
        "Design retry handling for transactions that can fail due to serialization conflicts or deadlocks.",
        "Test simultaneous requests against the actual database engine rather than relying only on unit tests."
      ]
    },
    {
      id: "optimistic-locking",
      title: "Optimistic Locking and Version Columns",
      paragraphs: [
        "Optimistic locking assumes that concurrent updates are relatively uncommon. Instead of locking a row for the entire business operation, the persistence provider checks whether the row changed since it was read.",
        "In JPA, the @Version annotation identifies a version field. When an entity is updated, the persistence provider uses the version to detect conflicting changes. If another transaction has already updated the entity, the stale update can fail with an optimistic-locking exception.",
        "Optimistic locking is useful for applications such as employee profile editing, product catalog maintenance, and other workflows where conflicts are possible but not constant."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stock;

    @Version
    private Long version;

    public Long getId() {
        return id;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Long getVersion() {
        return version;
    }
}`
      },
      bullets: [
        "The @Version field is managed by the persistence provider.",
        "Do not manually increment the version as part of ordinary entity updates.",
        "A concurrent modification can cause an optimistic-locking failure.",
        "The application may need to report the conflict, reload the entity, or retry the operation.",
        "Optimistic locking detects conflicting writes; it does not automatically protect every multi-row business invariant."
      ]
    },
    {
      id: "pessimistic-locking",
      title: "Pessimistic Locking",
      paragraphs: [
        "Pessimistic locking obtains a database lock to prevent competing transactions from making conflicting changes to selected data while the lock is held.",
        "In Spring Data JPA, a repository query can use @Lock with a JPA lock mode such as PESSIMISTIC_WRITE. The actual lock behavior depends on the database and provider.",
        "Pessimistic locking can be useful for critical inventory or account operations, but locks may cause waiting, deadlocks, and reduced throughput. Keep the transaction short and ensure that the selected query and database support the intended locking behavior."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select i from Inventory i where i.id = :id")
    Optional<Inventory> findByIdForUpdate(
        @Param("id") Long id
    );
}`
      },
      bullets: [
        "Use the locking query from inside an appropriate transaction.",
        "A pessimistic write lock can make competing transactions wait before modifying the same row.",
        "Locks are usually released when the transaction completes.",
        "The database may lock more resources than expected depending on the query and execution plan.",
        "Handle lock timeouts and deadlocks according to the application's retry and error-reporting policy."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Assuming READ_COMMITTED prevents lost updates in every application workflow.",
        "Assuming REPEATABLE_READ behaves identically across MySQL, PostgreSQL, and other database engines.",
        "Selecting SERIALIZABLE without considering transaction aborts, retries, blocking, and throughput.",
        "Expecting an isolation setting on a method to override an already active transaction.",
        "Assuming that @Transactional works when a transactional method is called through self-invocation.",
        "Assuming that @Version protects multi-row invariants that require broader concurrency control.",
        "Using pessimistic locks but keeping the transaction open during slow network calls.",
        "Testing concurrent behavior only with mocked repositories.",
        "Ignoring unique constraints, check constraints, and conditional updates that can enforce business invariants directly in the database.",
        "Retrying a failed transaction without ensuring that the retried business operation is safe to execute again."
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      bullets: [
        "Understand the actual isolation default of the production database.",
        "Choose isolation based on business consistency requirements rather than always choosing the strongest level.",
        "Use constraints and atomic SQL updates to protect critical invariants where appropriate.",
        "Use optimistic locking for suitable low-contention update workflows.",
        "Use pessimistic locking for operations that require controlled access to selected rows.",
        "Keep transactions short and avoid unnecessary work while locks are held.",
        "Design safe retry behavior for deadlocks and serialization failures.",
        "Test concurrency with realistic simultaneous requests and the actual database engine.",
        "Monitor lock waits, deadlocks, query duration, and transaction duration.",
        "Document why a particular isolation level or locking strategy is required for critical business operations."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is transaction isolation?",
          answer: "Transaction isolation controls how concurrently executing transactions observe each other's database changes and determines which concurrency anomalies can occur."
        },
        {
          question: "What are the four standard isolation levels?",
          answer: "READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE."
        },
        {
          question: "What is a dirty read?",
          answer: "A dirty read occurs when a transaction reads a change made by another transaction before that change has been committed."
        },
        {
          question: "What is a non-repeatable read?",
          answer: "It occurs when a transaction reads the same row more than once and observes a different committed value because another transaction modified the row."
        },
        {
          question: "What is a phantom read?",
          answer: "A phantom read occurs when repeating a query with the same search condition returns a different set of matching rows due to concurrent committed changes."
        },
        {
          question: "What is a lost update?",
          answer: "A lost update occurs when competing transactions update based on the same earlier value and one transaction overwrites the other's intended change."
        },
        {
          question: "Which isolation level prevents dirty reads?",
          answer: "READ COMMITTED and stronger standard isolation levels prevent dirty reads. Some databases also prevent dirty reads when READ UNCOMMITTED is requested."
        },
        {
          question: "Which is the strongest standard isolation level?",
          answer: "SERIALIZABLE. It requires concurrent transactions to produce results equivalent to some serial execution order, although the database may block or abort transactions to achieve this."
        },
        {
          question: "What is the difference between READ_COMMITTED and REPEATABLE_READ?",
          answer: "Under the standard model, both prevent dirty reads. REPEATABLE_READ also prevents non-repeatable reads, while READ_COMMITTED can allow them."
        },
        {
          question: "Does REPEATABLE_READ always prevent phantom reads?",
          answer: "The standard model permits phantom reads at REPEATABLE_READ. Actual behavior differs among database implementations, particularly those using MVCC or additional locking."
        },
        {
          question: "What is MVCC?",
          answer: "Multiversion concurrency control maintains multiple versions of data so transactions can read an appropriate version without requiring every read to block concurrent writes."
        },
        {
          question: "What is the difference between optimistic and pessimistic locking?",
          answer: "Optimistic locking detects conflicting updates, often using a version column. Pessimistic locking acquires locks to restrict conflicting operations while the transaction is active."
        },
        {
          question: "How do you configure isolation in Spring Boot?",
          answer: "Use @Transactional(isolation = Isolation.READ_COMMITTED), replacing READ_COMMITTED with the required Isolation constant."
        },
        {
          question: "Does Spring's isolation setting always change the active transaction?",
          answer: "No. The setting is relevant when a transaction is started. A method joining an existing transaction may continue using that transaction's existing isolation level."
        },
        {
          question: "What is the default isolation level?",
          answer: "Spring's Isolation.DEFAULT delegates to the database or transaction manager's configured default. The actual default depends on the database and configuration."
        },
        {
          question: "What is @Version in JPA?",
          answer: "@Version identifies a version field that the persistence provider uses for optimistic locking and detecting conflicting updates."
        },
        {
          question: "When would you use PESSIMISTIC_WRITE?",
          answer: "Use it when an operation needs to lock selected data against conflicting access while the transaction performs a critical operation. Consider the database's lock behavior and contention costs."
        },
        {
          question: "Can stronger isolation reduce performance?",
          answer: "Yes. Stronger isolation can increase blocking, lock contention, retries, or transaction aborts, depending on the database implementation and workload."
        },
        {
          question: "How can you prevent overselling the last product?",
          answer: "Use appropriate concurrency control, such as an atomic conditional stock update, optimistic or pessimistic locking, and database constraints where suitable. Isolation level selection alone may not solve the race condition."
        },
        {
          question: "What is write skew?",
          answer: "Write skew occurs when concurrent transactions read overlapping data and update different rows, but their combined changes violate a business invariant. It can occur under some snapshot-isolation implementations."
        },
        {
          question: "How should isolation behavior be tested?",
          answer: "Use integration tests with concurrent transactions against the actual database engine. Verify the expected results, locking behavior, conflicts, and retry handling."
        }
      ]
    }
  ]
};
