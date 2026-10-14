
export const rollbackRules = {
  id: 1009,
  title: "Rollback Rules and Transaction Boundaries",
  slug: "rollback-rules",
  topicTitle: "Database & Transactions",
  description:
    "Understand Spring transaction rollback behavior, exception rules, rollback-only status, and where transactions should begin and end.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "defaults",
      title: "Default Rollback Behavior",
      paragraphs: [
        "A database transaction groups related database operations into a single unit of work. If the operation succeeds, the transaction can commit. If a failure requires the transaction to be abandoned, the transaction can roll back so its uncommitted database changes are not committed.",
        "In Spring's traditional declarative transaction management, a transaction interceptor evaluates the outcome of a transactional method and applies the configured rollback rules. By default, Spring rolls back when an unchecked exception, such as RuntimeException, or an Error escapes the transactional method.",
        "Checked exceptions do not trigger rollback by default. For example, IOException is a checked exception. If it escapes a transactional method without a matching rollback rule, Spring's default behavior is generally to commit rather than roll back, provided the transaction has not otherwise been marked rollback-only and no other failure prevents commit.",
        "This distinction is important because Java's exception hierarchy and Spring's rollback rules serve different purposes. Java determines whether a method must declare or handle a checked exception. Spring determines whether a transactional operation should be rolled back according to its configured rules.",
        "Spring Framework 6.2 introduced a configurable global rollback policy that can make all exceptions trigger rollback. Unless that policy is configured, use the default behavior of the actual Spring version and transaction configuration in your application."
      ],
      bullets: [
        "RuntimeException: triggers rollback by default when it escapes a transactional method.",
        "Error: triggers rollback by default.",
        "Checked exception: does not trigger rollback by default.",
        "rollbackFor: explicitly configures exception types that should trigger rollback.",
        "noRollbackFor: configures exception types that should not trigger rollback under the matching rule.",
        "Rollback applies to the transaction managed by the transaction manager; it does not undo an external HTTP request or an already-published message.",
        "Database constraints and other failures may independently prevent a transaction from committing."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public void savePayment() {
        Payment payment = new Payment();
        payment.setAmount(500);

        paymentRepository.save(payment);

        throw new IllegalStateException(
            "Payment processing failed");
    }
}

// Assumption:
// Payment and PaymentRepository are defined elsewhere.
//
// IllegalStateException is unchecked. If it escapes this
// transactional method, Spring normally rolls back the
// transaction managed for this operation.`
      },
      paragraphs: [
        "The example saves a payment and then throws an unchecked exception. Assuming the repository participates in the same transaction and the exception escapes the transactional boundary, the insert is not committed.",
        "Rollback only affects transactional database work that has not already been committed. It cannot reverse an external side effect, such as sending an email or calling a remote payment provider."
      ]
    },
    {
      id: "rollback-for",
      title: "Use rollbackFor",
      paragraphs: [
        "Use rollbackFor when a particular checked exception should cause the current transaction to roll back. The rule can be declared on a @Transactional method or class.",
        "The rollbackFor attribute accepts exception classes. If a matching exception escapes the transactional method, Spring applies the configured rollback rule.",
        "A broad rule such as rollbackFor = Exception.class is useful when every exception, including checked exceptions, should normally abort the operation. However, choose it deliberately because it can change the behavior of checked exceptions that previously allowed a commit."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public void createOrder() throws Exception {
        Order order = new Order();
        order.setStatus("PENDING");

        Order savedOrder = orderRepository.save(order);

        OrderItem item = new OrderItem();
        item.setOrder(savedOrder);
        item.setQuantity(2);

        orderItemRepository.save(item);

        throw new Exception("Order validation failed");
    }
}

// Assumption:
// Order, OrderItem, and both repositories are defined
// elsewhere. The entity relationships and required fields
// must match the actual application model.
//
// The checked Exception matches rollbackFor, so the
// transaction is configured to roll back if it escapes.`
      },
      paragraphs: [
        "The example demonstrates why transaction boundaries matter: creating an order and its items should usually be atomic. If the item creation or a later business step fails, the order should not be left partially persisted.",
        "In a real application, prefer meaningful domain-specific checked or unchecked exceptions where appropriate. Avoid using a broad exception type merely to conceal unclear business failure behavior."
      ]
    },
    {
      id: "no-rollback",
      title: "Use noRollbackFor Carefully",
      paragraphs: [
        "The noRollbackFor attribute specifies exception types that should not cause rollback under the matching rollback rule. This is useful only when the business operation should remain committed even if that exception occurs.",
        "For example, a business warning might indicate that a record was successfully processed but requires additional attention. If the exception is allowed to escape and no other rollback rule applies, noRollbackFor can allow the transaction to commit.",
        "This configuration does not mean every exception can be safely ignored. A database error, an earlier rollback-only marker, or a matching rule with different precedence may still prevent the transaction from committing."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderProcessingService {

    private final OrderRepository orderRepository;

    public OrderProcessingService(
            OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional(
        noRollbackFor = BusinessWarningException.class
    )
    public void processOrder() {
        Order order = new Order();
        order.setStatus("PROCESSED");

        orderRepository.save(order);

        throw new BusinessWarningException(
            "Order processed with a warning");
    }
}

// Assumption:
// BusinessWarningException, Order, and OrderRepository
// are defined elsewhere.
//
// This demonstrates configuration, not a recommendation
// to use exceptions for ordinary warning responses.
// The matching warning must genuinely permit a commit.`
      },
      bullets: [
        "Use noRollbackFor only when committing after the specified exception is correct.",
        "Do not use it to suppress real database-integrity or consistency failures.",
        "Review class-level and method-level transaction rules together.",
        "If multiple rollback rules match, Spring applies the strongest matching rule; avoid ambiguous configurations.",
        "Test the committed database state rather than assuming the annotation guarantees a commit."
      ]
    },
    {
      id: "boundaries",
      title: "Choose Transaction Boundaries",
      paragraphs: [
        "A transaction boundary determines which operations must succeed or fail together. In Spring Boot applications, business transaction boundaries are commonly placed in the service layer because one service method may coordinate several repository operations.",
        "For example, creating an order may involve saving an order, saving its items, and reserving inventory. If those database changes belong to the same transactional resource and business operation, a single transaction can preserve atomicity.",
        "A transaction should not remain open longer than necessary. Long transactions can hold locks, occupy pooled database connections, increase contention, and make failures harder to recover from.",
        "Spring's typical proxy-based transaction management requires a call to pass through the relevant Spring proxy. A method calling another @Transactional method on the same object normally bypasses proxy interception for that internal call. Consequently, the inner method's transaction settings may not be applied as expected.",
        "A transaction annotation also requires an appropriate transaction manager and a supported invocation arrangement. Annotating an object created with new does not automatically make that object Spring-managed or transaction-aware."
      ],
      bullets: [
        "Group database changes that must succeed or fail together.",
        "Place transaction boundaries around meaningful business operations.",
        "Keep transactions as short as practical.",
        "Avoid waiting on slow remote calls while holding database locks or connections.",
        "Understand how exceptions are caught, rethrown, or translated.",
        "Do not assume a remote API call participates in a local database transaction.",
        "Use database constraints and concurrency controls where business correctness requires them.",
        "Test rollback behavior through the actual Spring-managed service boundary."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryReservationService {

    private final InventoryRepository inventoryRepository;
    private final ReservationRepository reservationRepository;

    public InventoryReservationService(
            InventoryRepository inventoryRepository,
            ReservationRepository reservationRepository) {
        this.inventoryRepository = inventoryRepository;
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public void reserve(Long productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException(
                "Quantity must be positive");
        }

        Inventory inventory = inventoryRepository
            .findById(productId)
            .orElseThrow(() ->
                new IllegalArgumentException("Product not found"));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new IllegalStateException(
                "Insufficient inventory");
        }

        inventory.setAvailableQuantity(
            inventory.getAvailableQuantity() - quantity
        );

        inventoryRepository.save(inventory);

        Reservation reservation = new Reservation();
        reservation.setProductId(productId);
        reservation.setQuantity(quantity);

        reservationRepository.save(reservation);
    }
}

// Assumption:
// Inventory, Reservation, and both repositories are
// defined elsewhere. Production inventory reservation
// also needs suitable concurrency protection to prevent
// simultaneous requests from overselling stock.`
      },
      paragraphs: [
        "This example illustrates a business operation in which updating inventory and recording a reservation should succeed or fail together. The transactional method provides a boundary around both repository operations.",
        "A transaction alone does not prevent every concurrent inventory race. Use an appropriate mechanism such as an atomic conditional SQL update, optimistic locking, or pessimistic locking when multiple requests can reserve the same stock simultaneously."
      ]
    },
    {
      id: "caught-exceptions",
      title: "What If an Exception Is Caught?",
      paragraphs: [
        "Spring's transaction interceptor usually evaluates the outcome of the transactional method when control returns through the proxy. If an exception is caught inside the method and the method returns normally, the interceptor may not see the exception that application code handled.",
        "As a result, catching an exception does not automatically cause rollback. If the transaction has not been marked rollback-only and no other failure occurs, it may commit the database changes made before the exception.",
        "Sometimes the transaction manager or persistence provider has already marked a transaction rollback-only. Catching the original exception does not clear that marker. A later commit attempt may fail with an unexpected rollback outcome.",
        "When a failure means the entire operation must be undone, allow the exception to propagate through the transactional boundary or deliberately mark the transaction rollback-only using an appropriate transaction-aware mechanism.",
        "Do not catch an exception merely to return a success response. Handle the error only when the application can safely recover or deliberately continue."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Transactional
    public void generateReport() {
        Report report = new Report();
        report.setStatus("STARTED");

        reportRepository.save(report);

        try {
            performBusinessStep();
        } catch (IllegalStateException exception) {
            // The exception is caught and not rethrown.
            // Unless the transaction has been marked
            // rollback-only or another failure occurs,
            // Spring may commit the database changes.
            System.err.println(
                "Business step failed: " + exception.getMessage()
            );
        }
    }

    private void performBusinessStep() {
        throw new IllegalStateException(
            "Unable to complete report step");
    }
}

// Assumption:
// Report and ReportRepository are defined elsewhere.
// This example illustrates exception handling, not a
// recommended production error-reporting implementation.`
      },
      paragraphs: [
        "In this example, the unchecked exception does not escape generateReport. Therefore, the default rollback rule is not triggered simply by that caught exception. The report insert may commit if the transaction remains usable.",
        "If the operation must roll back, do not silently swallow the failure. Either rethrow an appropriate exception or deliberately mark the transaction rollback-only when that is the intended behavior.",
        "For errors originating in nested transactional operations, understand propagation and transaction-manager behavior. An inner operation may mark a shared transaction rollback-only even when the outer method catches its exception."
      ]
    },
    {
      id: "rollback-only-and-propagation",
      title: "Rollback-Only Status and Propagation",
      paragraphs: [
        "A transaction marked rollback-only cannot be committed successfully as an ordinary successful transaction. Spring or the persistence infrastructure may mark it rollback-only after a participating operation fails.",
        "With REQUIRED propagation, a called transactional method usually joins the existing transaction. If that participating operation marks the shared transaction rollback-only, catching its exception in the outer method does not necessarily make the transaction committable again.",
        "REQUIRES_NEW suspends the current transaction and executes in a separate transaction when supported by the transaction manager. The inner transaction may commit independently even if the outer transaction later rolls back. This behavior should be used only when the business operation genuinely requires independent commit semantics.",
        "NESTED propagation may use a savepoint when supported by the transaction manager and database. Its behavior is not identical to an independent REQUIRES_NEW transaction.",
        "Choose propagation based on the required atomicity of the business operation. Avoid introducing REQUIRES_NEW merely to make exceptions disappear or force some data to commit."
      ],
      bullets: [
        "A rollback-only marker prevents the affected transaction from committing normally.",
        "Catching an exception does not necessarily clear a rollback-only marker.",
        "REQUIRED generally shares the existing transaction.",
        "REQUIRES_NEW creates a separate transaction when supported.",
        "NESTED may rely on savepoints and support from the transaction manager.",
        "Independent commits can leave data committed even when an outer operation fails; design this intentionally."
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
    public void recordAudit(String message) {
        AuditEntry entry = new AuditEntry();
        entry.setMessage(message);

        auditRepository.save(entry);
    }
}

// Assumption:
// AuditEntry and AuditRepository are defined elsewhere.
//
// REQUIRES_NEW should be invoked through the appropriate
// Spring-managed proxy. The audit transaction can commit
// independently of an outer transaction if it succeeds.`
      },
      paragraphs: [
        "An independent audit transaction may be useful when audit records must survive a failure in an outer business transaction. However, it can also produce an audit entry describing an attempted operation that did not ultimately commit.",
        "Use this pattern only when that semantic is correct, and consider connection-pool capacity because an outer transaction may retain its connection while the inner transaction requires another one."
      ]
    },
    {
      id: "testing-rollback",
      title: "How to Test Rollback Behavior",
      paragraphs: [
        "Transaction behavior should be tested through the Spring-managed service method, not merely inferred from the annotation. A useful test performs a database write, triggers the relevant exception, and checks whether the expected data was committed.",
        "Tests should cover both default behavior and explicit rollback rules. They should also cover caught exceptions, nested transactional operations, and rollback-only behavior when those patterns occur in the application.",
        "Be careful with tests annotated @Transactional. A test-managed transaction may roll back after the test regardless of what the service method did. This can hide whether the service transaction itself committed. Design the test so the observed database state distinguishes the behavior being verified."
      ],
      bullets: [
        "Verify that unchecked exceptions trigger the expected rollback.",
        "Verify checked-exception behavior with and without rollbackFor.",
        "Verify that noRollbackFor produces the intended outcome.",
        "Test what happens when application code catches an exception.",
        "Test transaction propagation when nested service calls are used.",
        "Use the production database engine or a compatible test environment when database-specific behavior matters.",
        "Check persisted state after the relevant transaction has completed."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class PaymentRollbackIntegrationTest {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PaymentRepository paymentRepository;

    @Test
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    void shouldRollbackWhenUncheckedExceptionEscapes() {
        long before = paymentRepository.count();

        assertThrows(
            IllegalStateException.class,
            () -> paymentService.savePayment()
        );

        assertEquals(before, paymentRepository.count());
    }
}

// Assumptions:
// PaymentService.savePayment() is the transactional
// example from the defaults section.
// PaymentRepository and the test database are configured
// by Spring Boot.
//
// NOT_SUPPORTED prevents the test from wrapping the
// service invocation in the test-managed transaction.
// This makes the service transaction's completed outcome
// observable in the assertion.`
      },
      paragraphs: [
        "The test illustrates the important distinction between the service's transaction and the test framework's transaction. The service method must be invoked through its Spring-managed proxy for the transaction interceptor to apply.",
        "For a reliable integration test, isolate the database state, ensure the count query observes committed data, and account for other test activity that could modify the same table."
      ]
    },
    {
      id: "best-practices",
      title: "Rollback and Transaction Best Practices",
      paragraphs: [
        "Correct transaction handling requires clear business boundaries, deliberate exception rules, and tests that verify actual database outcomes. The goal is not to roll back every failure indiscriminately; it is to ensure that each business operation has the correct commit and rollback semantics."
      ],
      bullets: [
        "Define transactions around business operations that must be atomic.",
        "Use rollbackFor for checked exceptions when the business operation must be undone.",
        "Use noRollbackFor only when a matching exception genuinely permits commit.",
        "Keep transactions short and avoid slow remote calls within database transactions.",
        "Do not swallow exceptions that should abort the operation.",
        "Understand rollback-only status and propagation before catching nested transaction failures.",
        "Avoid self-invocation when relying on proxy-based transaction interception.",
        "Test rollback and commit outcomes against the actual database state.",
        "Use idempotency and appropriate concurrency controls for retryable operations.",
        "Remember that local database rollback cannot reverse external side effects."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      paragraphs: [
        "Review these questions to prepare for Java backend interviews about Spring declarative transactions, exception handling, and database consistency."
      ],
      interviewQuestions: [
        {
          question: "1. What is transaction rollback?",
          answer: "Rollback abandons uncommitted transactional changes so they are not committed as part of that transaction. It is used when an operation fails and its database changes must be undone."
        },
        {
          question: "2. What is Spring's default rollback behavior?",
          answer: "By default, Spring's declarative transaction management rolls back for unchecked exceptions such as RuntimeException and for Error. Checked exceptions do not cause rollback by default."
        },
        {
          question: "3. Does Spring roll back for checked exceptions by default?",
          answer: "No. A checked exception generally does not trigger rollback unless a matching rollback rule or a different configured global policy applies."
        },
        {
          question: "4. How do you roll back for a checked exception?",
          answer: "Use a rollback rule such as @Transactional(rollbackFor = Exception.class), or specify the particular checked exception class that should trigger rollback."
        },
        {
          question: "5. What is rollbackFor?",
          answer: "rollbackFor declares exception types that should trigger rollback when a matching exception escapes the transactional method."
        },
        {
          question: "6. What is noRollbackFor?",
          answer: "noRollbackFor declares exception types that should not trigger rollback under the matching rule. Use it only when committing after that exception is correct for the business operation."
        },
        {
          question: "7. What happens if an exception is caught inside a transactional method?",
          answer: "If the exception is caught and the method returns normally, the interceptor may not see it as an escaping failure. The transaction may commit unless it has already been marked rollback-only or another failure prevents commit."
        },
        {
          question: "8. How can you force a transaction to roll back after catching an exception?",
          answer: "Prefer rethrowing an appropriate exception when the whole operation should fail. Alternatively, mark the transaction rollback-only through an appropriate transaction-aware mechanism when that is the intended behavior."
        },
        {
          question: "9. What does rollback-only mean?",
          answer: "A rollback-only transaction is marked so it cannot be committed normally. An attempt to complete it may result in rollback and an unexpected rollback exception, depending on the transaction flow."
        },
        {
          question: "10. Where should @Transactional usually be applied?",
          answer: "It is commonly applied to service-layer methods that represent business operations involving one or more database operations that must succeed or fail together."
        },
        {
          question: "11. Why should transactions be short?",
          answer: "Long transactions can hold database locks and connections, increase contention, reduce throughput, and make failures harder to recover from."
        },
        {
          question: "12. What is the difference between REQUIRED and REQUIRES_NEW?",
          answer: "REQUIRED joins an existing transaction or creates one if necessary. REQUIRES_NEW suspends an existing transaction and uses a separate transaction when supported, allowing the inner operation to commit independently."
        },
        {
          question: "13. What happens if a nested REQUIRED method fails and the outer method catches the exception?",
          answer: "The participating method may have marked the shared transaction rollback-only. Catching the exception does not necessarily clear that status, so the outer transaction may still roll back."
        },
        {
          question: "14. Why might @Transactional not work during self-invocation?",
          answer: "With standard proxy-based transaction management, a method calling another transactional method on the same object bypasses the Spring proxy for that internal call. The inner method's transaction configuration may therefore not be intercepted."
        },
        {
          question: "15. Does rollback undo an email or remote HTTP request?",
          answer: "No. A local database transaction does not automatically reverse external side effects. Use appropriate distributed workflow patterns, idempotency, or compensating actions where necessary."
        },
        {
          question: "16. How do you test a rollback rule?",
          answer: "Invoke the Spring-managed transactional method, trigger the relevant exception, and verify the resulting database state after the transaction completes. Ensure a test-managed transaction does not hide the behavior being tested."
        },
        {
          question: "17. Can noRollbackFor guarantee that a transaction commits?",
          answer: "No. It affects exception-based rollback-rule evaluation for matching exceptions. A rollback-only marker, database failure, or other transaction-completion error may still prevent commit."
        },
        {
          question: "18. What is the difference between rollbackFor and noRollbackFor?",
          answer: "rollbackFor specifies exceptions that should trigger rollback. noRollbackFor specifies exceptions that should not trigger rollback under the matching rule. They should be configured according to the business operation's required outcome."
        },
        {
          question: "19. What is the purpose of transaction boundaries?",
          answer: "Transaction boundaries define which database operations must commit or roll back together. Correct boundaries preserve business consistency and prevent partially completed operations."
        },
        {
          question: "20. Summarize Spring transaction rollback best practices.",
          answer: "Define meaningful service-layer transaction boundaries, understand default rollback rules, configure checked-exception handling deliberately, avoid swallowing failures, keep transactions short, understand propagation and rollback-only status, and verify behavior with integration tests."
        }
      ]
    }
  ]
};
