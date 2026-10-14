
export const customEventsAndEventDrivenDesign = {
  id: 1506,
  title: "Custom Events and Event-Driven Design",
  slug: "custom-events-and-event-driven-design",
  topicTitle: "Spring Boot Advanced",
  description:
    "Design meaningful domain events, use Spring application events, understand asynchronous and transactional listeners, and build reliable event-driven workflows.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "domain-events",
      title: "Designing a Custom Event",
      paragraphs: [
        "A domain event represents a meaningful business fact that has already happened, such as OrderPlaced, PaymentCompleted, or CustomerRegistered. Event names should normally describe completed facts rather than instructions to execute a specific implementation.",
        "For example, CustomerRegisteredEvent communicates that a customer registration occurred. An audit component may record the registration, and a notification component may request a welcome email. The registration service does not need to call both components directly.",
        "A good event contains the identifiers and business facts required by its consumers. Avoid including passwords, access tokens, full payment-card details, or unnecessary personal information. Keep the event contract stable so that consumers do not depend on unrelated implementation details.",
        "Events reduce direct dependencies between components, but they also make execution flow less obvious. Meaningful event names, correlation IDs, structured logs, and tests help developers understand which reactions follow an event.",
        "In Java, an immutable record is a convenient way to define a simple event. Records are available from Java 16 onward and work well with modern Spring Boot applications."
      ],
      code: {
        language: "java",
        code: `package com.example.customer.event;

public record CustomerRegisteredEvent(
    Long customerId,
    String correlationId
) {
}`
      },
      bullets: [
        "An event describes a fact that occurred.",
        "Prefer names such as OrderPlacedEvent over ProcessOrderEvent.",
        "Keep event payloads small, immutable, and intentional.",
        "Include stable identifiers rather than entire JPA entity graphs.",
        "Use correlation IDs to connect related logs and operations.",
        "Treat event fields as a contract when other modules or services depend on them."
      ]
    },
    {
      id: "event-vs-command",
      title: "Event vs Command",
      paragraphs: [
        "An event and a command serve different purposes. A command asks a component to perform an action, while an event announces that a fact has occurred.",
        "For example, RegisterCustomerCommand requests registration. CustomerRegisteredEvent announces that registration has succeeded. A command may be rejected because of validation or business rules, whereas an event normally represents a completed fact.",
        "Keeping this distinction clear improves naming, error handling, and the design of service boundaries."
      ],
      bullets: [
        "Command: a request to do something, such as PlaceOrderCommand.",
        "Event: a fact that something happened, such as OrderPlacedEvent.",
        "A command usually has one logical handler responsible for deciding whether to perform the requested action.",
        "An event can have zero, one, or multiple independent listeners.",
        "Do not publish a success event before the corresponding business operation has actually succeeded."
      ],
      code: {
        language: "java",
        code: `public record RegisterCustomerCommand(
    String email
) {
}

public record CustomerRegisteredEvent(
    Long customerId,
    String correlationId
) {
}`
      }
    },
    {
      id: "spring-event-mechanism",
      title: "How Spring Application Events Work",
      paragraphs: [
        "Spring provides an application event mechanism through ApplicationEventPublisher and listener methods annotated with @EventListener. An event can be a simple object; it does not need to extend ApplicationEvent.",
        "A service publishes an event using ApplicationEventPublisher.publishEvent(event). Spring looks for matching listeners in the application context and invokes them according to the configured event-processing behavior.",
        "By default, Spring application event listeners are generally invoked synchronously by the publisher's thread. This means the publishing call does not normally return until synchronous listeners have finished.",
        "Spring application events are in-process notifications. They are not automatically stored in a database, sent to a message broker, or guaranteed to survive an application crash.",
        "Use Spring application events for communication between components inside the same application. When events must cross process boundaries or be delivered durably, consider a message broker and an appropriate reliability pattern."
      ],
      bullets: [
        "ApplicationEventPublisher: publishes an event.",
        "@EventListener: marks a method as an event listener.",
        "A plain Java object or record can be an event payload.",
        "Default synchronous listeners run as part of the publisher's call path.",
        "Publishing an event does not automatically make the event durable.",
        "Do not confuse an in-process event with Kafka, RabbitMQ, or another messaging system."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class CustomerRegistrationService {

    private final ApplicationEventPublisher eventPublisher;

    public CustomerRegistrationService(
            ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void publishRegistration(Long customerId) {
        eventPublisher.publishEvent(
            new CustomerRegisteredEvent(customerId, "req-123")
        );
    }
}`
      }
    },
    {
      id: "publish-and-listen",
      title: "Publish and Handle a Custom Event",
      paragraphs: [
        "A publisher announces the event without knowing which listeners will react. The listener declares interest in the event type using @EventListener.",
        "In the following example, the audit listener records the customer registration. A separate listener could update an internal metric or initiate a notification workflow.",
        "This design makes it possible to add a new reaction without adding another direct dependency to CustomerRegistrationService. However, synchronous listener failures can still affect the publishing call, so error handling must be designed deliberately."
      ],
      code: {
        language: "java",
        code: `package com.example.customer.event;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class CustomerRegistrationAuditListener {

    private static final Logger log =
        LoggerFactory.getLogger(
            CustomerRegistrationAuditListener.class
        );

    @EventListener
    public void handle(CustomerRegisteredEvent event) {
        log.info(
            "Customer registered. customerId={}, correlationId={}",
            event.customerId(),
            event.correlationId()
        );
    }
}`
      },
      bullets: [
        "The listener method parameter identifies the event type.",
        "Listeners can be placed in separate components.",
        "Use constructor injection for listener dependencies.",
        "Avoid performing lengthy external network calls inside a synchronous listener when they would unnecessarily delay the publisher.",
        "Do not assume that a log statement or listener invocation is equivalent to durable audit storage."
      ]
    },
    {
      id: "registration-workflow",
      title: "Build a Registration Event Workflow",
      paragraphs: [
        "Consider a customer registration workflow. The service validates the request, saves the customer, and publishes CustomerRegisteredEvent. The audit listener records the registration, while a notification listener may request a welcome email.",
        "Keep required business invariants in the registration service and its database transaction. An event is best used for reactions that can be separated from the core operation.",
        "The following simplified example assumes a CustomerRepository with a save method and a Customer entity with an appropriate constructor. Adapt those details to the entities and repository methods in your application.",
        "Publishing an event after repository.save does not by itself guarantee that the database transaction has committed. For operations that require listeners to run only after commit, use transaction-aware event handling."
      ],
      code: {
        language: "java",
        code: `package com.example.customer.service;

import com.example.customer.Customer;
import com.example.customer.CustomerRepository;
import com.example.customer.event.CustomerRegisteredEvent;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerRegistrationService {

    private final CustomerRepository customerRepository;
    private final ApplicationEventPublisher eventPublisher;

    public CustomerRegistrationService(
            CustomerRepository customerRepository,
            ApplicationEventPublisher eventPublisher) {
        this.customerRepository = customerRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public Long register(String email, String correlationId) {
        Customer customer = new Customer(email);

        Customer savedCustomer =
            customerRepository.save(customer);

        eventPublisher.publishEvent(
            new CustomerRegisteredEvent(
                savedCustomer.getId(),
                correlationId
            )
        );

        return savedCustomer.getId();
    }
}`
      },
      bullets: [
        "Save the business entity before publishing an event that represents its creation.",
        "Keep validation and required database changes inside the core business workflow.",
        "Use transaction-aware listeners when a reaction must wait for transaction commit.",
        "For durable cross-service delivery, do not rely solely on an in-memory event.",
        "Avoid passing a managed JPA entity to unrelated listeners; prefer a stable event payload."
      ]
    },
    {
      id: "multiple-listeners",
      title: "Use Multiple Independent Listeners",
      paragraphs: [
        "One event can have multiple listeners. For example, CustomerRegisteredEvent may be consumed by an audit listener, a metrics listener, and a welcome-notification listener.",
        "The publisher does not need to know how many listeners exist. This reduces direct coupling, but it does not automatically guarantee that all listeners succeed or that they execute in a particular order.",
        "With synchronous listeners, they normally execute in the publishing call path. If a listener throws an exception, that exception can propagate to the publisher and interrupt normal event dispatch. Do not design correctness around an assumed listener order unless the application explicitly configures and tests that order.",
        "If the reactions have different reliability requirements, isolate them appropriately. An audit requirement may need durable storage, while an in-memory metric update may tolerate occasional process interruption."
      ],
      code: {
        language: "java",
        code: `@Component
public class CustomerMetricsListener {

    @EventListener
    public void handle(CustomerRegisteredEvent event) {
        // Update an in-memory metric or invoke a metrics abstraction.
        // Keep this handler lightweight.
    }
}

@Component
public class CustomerWelcomeListener {

    @EventListener
    public void handle(CustomerRegisteredEvent event) {
        // Initiate the welcome-notification workflow.
        // Use a reliable queue when delivery must be durable.
    }
}`
      },
      bullets: [
        "Multiple listeners can react to the same event type.",
        "Keep each listener focused on one responsibility.",
        "Do not assume every listener succeeds merely because the event was published.",
        "Use explicit ordering only when there is a real dependency between listeners.",
        "Separate critical business changes from best-effort side effects."
      ]
    },
    {
      id: "synchronous-vs-async",
      title: "Synchronous vs Asynchronous Event Handling",
      paragraphs: [
        "Synchronous event handling runs a listener in the publisher's call path. It is easy to reason about, but a slow listener delays the operation that published the event.",
        "Asynchronous handling can move listener work to another thread. In Spring, one option is to enable asynchronous method execution and annotate a listener with @Async.",
        "Asynchronous execution changes the error and transaction model. The publisher may return before the listener finishes, and exceptions from a void asynchronous listener will not normally propagate back to the publisher. Configure an AsyncUncaughtExceptionHandler or another error-reporting mechanism where appropriate.",
        "An in-memory asynchronous event is still not durable. Work queued in process memory can be lost if the application stops or crashes. Use a durable broker or an outbox-based approach when reliable delivery is required."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AsyncCustomerNotificationListener {

    @Async
    @EventListener
    public void handle(CustomerRegisteredEvent event) {
        // Perform notification-related work.
        // Exceptions must be reported through an appropriate
        // asynchronous error-handling mechanism.
    }
}`
      },
      bullets: [
        "Enable asynchronous execution with @EnableAsync in configuration.",
        "Configure an appropriate task executor and bounded thread pool for production workloads.",
        "Use @Async on a Spring-managed bean method so Spring's proxy-based execution can apply.",
        "Self-invocation within the same object generally bypasses proxy-based @Async behavior.",
        "Handle asynchronous failures explicitly.",
        "Use durable messaging rather than only @Async when the work must survive process failure."
      ]
    },
    {
      id: "enable-async",
      title: "Configure Asynchronous Event Processing",
      paragraphs: [
        "Spring's @EnableAsync activates asynchronous method execution for supported Spring-managed methods. An executor can control thread creation and concurrency.",
        "Avoid creating an unbounded number of threads or allowing an unlimited queue to accumulate. Choose pool sizes and queue capacity according to expected workload, downstream limits, and available resources.",
        "The following configuration is an illustrative starting point. Tune the values for the application and define a deliberate policy for rejected tasks and shutdown behavior."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncEventConfiguration {

    @Bean(name = "eventTaskExecutor")
    public Executor eventTaskExecutor() {
        ThreadPoolTaskExecutor executor =
            new ThreadPoolTaskExecutor();

        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(8);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("event-");
        executor.setRejectedExecutionHandler(
            new ThreadPoolExecutor.CallerRunsPolicy()
        );

        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(20);

        return executor;
    }
}`
      },
      bullets: [
        "A bounded queue helps limit memory growth under load.",
        "CallerRunsPolicy can apply backpressure, but it may cause the submitting thread to perform work.",
        "For an isolated executor, specify the executor name in @Async(\"eventTaskExecutor\").",
        "A task executor is not a message broker and does not provide durable delivery.",
        "Test shutdown behavior and saturation scenarios rather than relying only on happy-path tests."
      ]
    },
    {
      id: "transactional-listener",
      title: "Run a Listener After Transaction Commit",
      paragraphs: [
        "Sometimes an event reaction should occur only if the transaction that produced the event commits. For example, a welcome-notification request should not be triggered by a customer registration that later rolls back.",
        "Spring's @TransactionalEventListener supports transaction phases such as BEFORE_COMMIT, AFTER_COMMIT, AFTER_ROLLBACK, and AFTER_COMPLETION. The default phase is AFTER_COMMIT.",
        "A transactional listener normally requires an active transaction when the event is published. If no transaction is active, the listener is not invoked unless fallbackExecution is enabled.",
        "An AFTER_COMMIT listener prevents work from running for a rolled-back transaction, but it does not make the listener's side effect durable. The process can fail after the database commits but before the listener completes."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class CustomerAfterCommitListener {

    @TransactionalEventListener
    public void handleAfterCommit(
            CustomerRegisteredEvent event) {
        // The publishing transaction has committed.
        // Start a notification workflow or another post-commit action.
    }
}`
      },
      bullets: [
        "AFTER_COMMIT: run after successful commit; this is the default phase.",
        "BEFORE_COMMIT: run before the transaction commits.",
        "AFTER_ROLLBACK: run after rollback.",
        "AFTER_COMPLETION: run after transaction completion, regardless of outcome.",
        "fallbackExecution = true permits execution without a transaction, so use it only when that behavior is intentional.",
        "Use a transactional outbox when missing a post-commit action is unacceptable."
      ]
    },
    {
      id: "transaction-boundary",
      title: "Understand Transaction and Listener Boundaries",
      paragraphs: [
        "A common mistake is assuming that publishing an event inside @Transactional makes every listener part of the same atomic operation. That depends on the listener type, its transaction behavior, and when the work executes.",
        "A normal synchronous @EventListener can run before the publishing transaction commits. If it performs external work, that work may succeed even when the database transaction later rolls back.",
        "An AFTER_COMMIT listener avoids reacting to a transaction that rolls back, but a failure in the listener cannot normally undo the already committed business transaction.",
        "A listener that writes to the database after commit may need its own transaction. Design its transaction boundary explicitly, especially when using repository operations that require a transactional context.",
        "For operations that must be atomic with the original database update and reliably published to another system, consider recording an outbox message in the original transaction."
      ],
      bullets: [
        "Publishing inside a transaction is not the same as publishing durably.",
        "External API calls cannot generally be rolled back with a local database transaction.",
        "Post-commit failures require a retry, recovery, or durable delivery strategy.",
        "Keep the business transaction focused and avoid holding database locks while waiting for slow external systems.",
        "Test rollback, commit, and listener-failure scenarios explicitly."
      ]
    },
    {
      id: "error-handling",
      title: "Handle Listener Failures",
      paragraphs: [
        "Listener failures should be handled according to the business importance of the reaction. A best-effort metrics update may only require logging, while a payment-related action or required notification may need retries and durable tracking.",
        "For synchronous listeners, an exception can propagate to the publisher and interfere with the initiating operation. Catch exceptions only when the application can safely continue and the failure is recorded or otherwise handled.",
        "For asynchronous listeners, failures generally occur outside the publisher's call path. Configure monitoring and error reporting rather than assuming the original service will see the exception.",
        "Avoid broad catch blocks that silently ignore errors. A successful method return should not imply that critical downstream work completed unless the workflow actually verifies it."
      ],
      bullets: [
        "Define whether each listener is critical, retryable, or best effort.",
        "Log useful identifiers without exposing sensitive payloads.",
        "Use metrics and alerts for repeated listener failures.",
        "Use retry policies with bounded attempts and backoff where appropriate.",
        "Avoid blindly retrying non-idempotent operations.",
        "Use durable queues or outbox records for important work that must not be lost."
      ]
    },
    {
      id: "idempotency",
      title: "Make Event Consumers Idempotent",
      paragraphs: [
        "An idempotent consumer can process the same event more than once without repeating unintended business effects. This is important when events are retried, messages are redelivered, or a publisher cannot tell whether a previous delivery succeeded.",
        "A useful event contract may include a unique event ID in addition to the business entity ID. The event ID identifies a particular occurrence, while a customer ID or order ID identifies the business entity.",
        "A consumer can record processed event IDs and use a database uniqueness constraint or another atomic deduplication mechanism to prevent duplicate processing.",
        "Do not rely only on an in-memory set for production deduplication when the application can restart or multiple instances can process the same event."
      ],
      code: {
        language: "java",
        code: `import java.time.Instant;
import java.util.UUID;

public record OrderPlacedEvent(
    UUID eventId,
    Long orderId,
    Instant occurredAt,
    String correlationId
) {
}`
      },
      bullets: [
        "Use a stable unique event ID for each event occurrence.",
        "Make repeated processing safe where possible.",
        "Store deduplication records durably when duplicate effects are unacceptable.",
        "Use database constraints to protect against concurrent duplicate processing.",
        "Idempotency is particularly important for payments, email dispatch workflows, inventory updates, and message-broker consumers."
      ]
    },
    {
      id: "transactional-outbox",
      title: "Transactional Outbox Pattern",
      paragraphs: [
        "The transactional outbox pattern addresses a common reliability problem: a service updates its database and also needs to publish a message to another system.",
        "If the database commits but the message broker is unavailable, the business change may be saved while the event is lost. If the message is published first and the database transaction later rolls back, consumers may receive an event describing a change that never committed.",
        "With an outbox, the service saves the business change and an outbox record in the same database transaction. A separate publisher reads pending records and sends them to the message broker, then records successful publication according to the implementation's delivery protocol.",
        "The outbox makes the database change and event record atomic. It does not automatically guarantee exactly-once delivery: the publisher may send a message and fail before recording that it was sent, causing a duplicate on retry. Consumers should therefore be idempotent.",
        "A production outbox implementation needs retry handling, monitoring, retention or cleanup, and a safe strategy for concurrent publishers. It can use polling or a change-data-capture approach."
      ],
      bullets: [
        "Write business data and the outbox row in one database transaction.",
        "Publish pending outbox records asynchronously.",
        "Mark or otherwise track successful publication safely.",
        "Retry transient broker failures.",
        "Make consumers idempotent because duplicate delivery is possible.",
        "Monitor pending-message count, oldest-message age, and publishing failures."
      ],
      code: {
        language: "java",
        code: `// Conceptual transaction boundary:
//
// 1. Save the order.
// 2. Save an outbox record for OrderPlacedEvent.
// 3. Commit both changes together.
//
// A separate publisher then:
// 4. Reads pending outbox records.
// 5. Publishes each event to the broker.
// 6. Records successful publication.
//
// Implement repository methods, concurrency control,
// retry handling, and message serialization for your system.`
      }
    },
    {
      id: "local-vs-distributed-events",
      title: "Local Spring Events vs Distributed Messaging",
      paragraphs: [
        "Spring application events are useful for communication between components in one running application. They avoid direct method-call dependencies and can support synchronous, asynchronous, and transaction-aware listeners.",
        "A message broker such as Kafka or RabbitMQ is designed for communication between processes or services. Depending on its configuration, it can provide persistent messages, acknowledgements, consumer groups, retries, and other delivery capabilities.",
        "A local Spring event does not automatically become a distributed event. If another service must receive the event reliably, define a message contract and use a broker or another durable integration mechanism.",
        "Choose the simplest mechanism that meets the reliability and scaling requirements. Do not introduce a distributed messaging platform solely to replace a straightforward in-process notification."
      ],
      bullets: [
        "Use Spring events for in-process decoupling.",
        "Use a broker for communication across services or process boundaries.",
        "Use a transactional outbox when database changes and message publication must be coordinated reliably.",
        "Plan schema evolution and compatibility for distributed event contracts.",
        "Account for duplicate delivery, ordering requirements, retries, and observability."
      ]
    },
    {
      id: "event-versioning",
      title: "Event Contracts and Versioning",
      paragraphs: [
        "An event contract defines the information available to its consumers. If several modules or services depend on an event, changing its fields or meaning can break those consumers.",
        "Prefer explicit identifiers, timestamps, and well-defined business facts. Avoid exposing internal persistence entities as public event contracts because database refactoring can unintentionally change the event API.",
        "When distributed consumers depend on an event, plan how the contract will evolve. Additive changes may be easier to support than removing or changing existing fields, but compatibility still depends on serialization format and consumer behavior.",
        "A version field or versioned event name may be appropriate for a distributed contract with incompatible changes. For local events inside one codebase, ordinary source-level refactoring may be sufficient when all consumers are upgraded together."
      ],
      bullets: [
        "Keep event meaning stable and unambiguous.",
        "Use explicit event IDs and timestamps when useful.",
        "Avoid exposing passwords, tokens, or unnecessary personal data.",
        "Define serialization and compatibility rules for cross-service events.",
        "Document deprecated fields and migration paths.",
        "Include a correlation ID or trace context where it helps observability."
      ]
    },
    {
      id: "testing-events",
      title: "Test Event Publishers and Listeners",
      paragraphs: [
        "Event-driven workflows need tests for both the event contract and the behavior of listeners. A publisher test can verify that the expected event is published, while a listener test can verify how the event is processed.",
        "Spring's test support can capture published application events with @RecordApplicationEvents and ApplicationEvents in supported test configurations. Alternatively, a test can provide a test listener or mock ApplicationEventPublisher to verify interactions.",
        "For @TransactionalEventListener, test transaction commit and rollback behavior. A test that publishes an event without an active transaction will not exercise the default AFTER_COMMIT behavior in the same way as a real transactional workflow.",
        "For asynchronous listeners, wait for the expected outcome using a reliable test synchronization mechanism. Avoid arbitrary sleeps because they make tests slow and flaky.",
        "For an outbox or broker integration, test retries, duplicate delivery, serialization, and recovery after simulated failures."
      ],
      bullets: [
        "Test that the correct event is published with the expected identifiers.",
        "Test listener behavior independently from the publisher.",
        "Test transaction commit and rollback paths.",
        "Test asynchronous exception reporting and task-executor saturation.",
        "Test idempotency by delivering the same event twice.",
        "Test outbox recovery when the broker is unavailable."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.event.ApplicationEvents;
import org.springframework.test.context.event.RecordApplicationEvents;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@RecordApplicationEvents
class CustomerEventPublicationTest {

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private ApplicationEvents applicationEvents;

    @Test
    void publishesCustomerRegisteredEvent() {
        publisher.publishEvent(
            new CustomerRegisteredEvent(42L, "test-request")
        );

        assertThat(
            applicationEvents.stream(
                CustomerRegisteredEvent.class
            ).toList()
        ).hasSize(1);
    }
}`
      }
    },
    {
      id: "observability",
      title: "Monitor Event-Driven Workflows",
      paragraphs: [
        "Event-driven systems can be harder to debug because the initiating operation and its reactions may run in different components or threads. Observability should make the path from publication to completion visible.",
        "Log event IDs, correlation IDs, relevant entity IDs, listener outcomes, and failure details without exposing sensitive payloads. Distributed tracing can help connect operations across threads and services when tracing context is propagated correctly.",
        "For durable messaging and outbox workflows, monitor backlog size, processing latency, retry counts, failed messages, and the age of the oldest pending record.",
        "Avoid logging complete event payloads by default. Logs should provide enough information for diagnosis without unnecessarily duplicating personal or confidential data."
      ],
      bullets: [
        "Include event and correlation identifiers in structured logs.",
        "Track listener success and failure rates.",
        "Measure event-processing latency.",
        "Monitor executor saturation for asynchronous listeners.",
        "Monitor outbox backlog and broker delivery failures.",
        "Define alerts for events that remain pending beyond an acceptable time."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Event-Driven Design Mistakes",
      paragraphs: [
        "Event-driven code can appear loosely coupled while still hiding important reliability and transaction assumptions. Make those assumptions explicit and test them."
      ],
      bullets: [
        "Treating an in-process event as durable: local events can be lost when the application stops.",
        "Publishing success too early: listeners may react to a fact that later rolls back.",
        "Using synchronous listeners for slow network calls: the publisher becomes slower and more failure-prone.",
        "Ignoring asynchronous exceptions: failed work may go unnoticed.",
        "Publishing full entities: listeners become coupled to persistence details and may encounter lazy-loading issues.",
        "Ignoring duplicate delivery: retries can create repeated business effects.",
        "Using events for mandatory immediate validation: commands and direct business operations may be more appropriate.",
        "Assuming listener order: event dispatch order should not become an accidental business dependency.",
        "Swallowing exceptions: a failed workflow can look successful.",
        "Skipping monitoring: pending and repeatedly failing event work becomes difficult to diagnose."
      ]
    },
    {
      id: "best-practices",
      title: "Production Best Practices",
      paragraphs: [
        "Use events to express meaningful business facts and keep listeners focused on independent reactions. Keep essential business invariants within explicit service and transaction boundaries.",
        "Choose synchronous, asynchronous, transactional, or distributed handling according to the actual requirements. Each option has different latency, failure, and delivery guarantees.",
        "For reliable integration with other services, combine a durable messaging strategy with idempotent consumers and observable retries. If a database change must reliably produce an event, evaluate the transactional outbox pattern.",
        "Design event contracts as APIs when other services consume them. Keep sensitive data out of messages and plan for schema evolution, monitoring, and operational recovery."
      ],
      bullets: [
        "Use domain-focused event names.",
        "Publish events at the correct business lifecycle point.",
        "Keep event payloads immutable and minimal.",
        "Use @TransactionalEventListener when reactions must wait for commit.",
        "Use @Async for suitable in-process background work, not as a durable queue.",
        "Use an outbox or broker for reliable cross-service workflows.",
        "Make consumers idempotent.",
        "Test rollback, failure, duplicate delivery, and retry scenarios.",
        "Propagate correlation identifiers and monitor processing outcomes."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a domain event?",
          answer: "A domain event represents a meaningful business fact that has occurred, such as an order being placed or a customer registering."
        },
        {
          question: "What is event-driven design?",
          answer: "Event-driven design allows components to react to events rather than requiring the initiating component to call every reaction directly."
        },
        {
          question: "How do events reduce coupling?",
          answer: "The publisher announces an event without depending directly on each listener's implementation. New listeners can often be added independently."
        },
        {
          question: "What is the difference between an event and a command?",
          answer: "A command requests an action, while an event describes a fact that has already occurred."
        },
        {
          question: "How do you publish a custom event in Spring Boot?",
          answer: "Inject ApplicationEventPublisher and call publishEvent with the event object."
        },
        {
          question: "What does @EventListener do?",
          answer: "It marks a method as a listener for matching Spring application events."
        },
        {
          question: "Do custom Spring events need to extend ApplicationEvent?",
          answer: "No. A plain Java object or record can be published as an application event."
        },
        {
          question: "Are Spring application events synchronous by default?",
          answer: "Normally yes. Listeners execute in the publisher's call path unless asynchronous handling or another event multicaster configuration changes that behavior."
        },
        {
          question: "Can one event have multiple listeners?",
          answer: "Yes. Multiple listeners can independently react to the same event type."
        },
        {
          question: "What happens if a synchronous event listener throws an exception?",
          answer: "The exception can propagate through event publication and affect the initiating operation, depending on the listener and event-dispatch configuration."
        },
        {
          question: "How do you execute a listener asynchronously?",
          answer: "Enable asynchronous method execution with @EnableAsync and use @Async on a suitable Spring-managed listener method."
        },
        {
          question: "Does @Async guarantee reliable delivery?",
          answer: "No. It moves work to an executor but does not provide durable storage or guaranteed recovery after process failure."
        },
        {
          question: "What is @TransactionalEventListener?",
          answer: "It binds event handling to a transaction phase, such as AFTER_COMMIT or AFTER_ROLLBACK."
        },
        {
          question: "What is the default phase of @TransactionalEventListener?",
          answer: "The default phase is AFTER_COMMIT."
        },
        {
          question: "What happens if a transactional event is published without an active transaction?",
          answer: "The transactional listener normally does not execute unless fallbackExecution is enabled."
        },
        {
          question: "Does AFTER_COMMIT guarantee that an external message will be delivered?",
          answer: "No. The process can fail after the database commits but before the listener completes. A durable mechanism such as a transactional outbox is needed when reliable delivery is required."
        },
        {
          question: "What is the transactional outbox pattern?",
          answer: "It stores an event record in the same database transaction as the business change and publishes that record to messaging infrastructure separately."
        },
        {
          question: "Why is the outbox pattern useful?",
          answer: "It avoids the dual-write gap in which the database commits but publishing to a broker fails, or a message is published for a transaction that later rolls back."
        },
        {
          question: "Does the outbox pattern guarantee exactly-once delivery?",
          answer: "Not automatically. Duplicate publication can occur during retries, so consumers should be idempotent."
        },
        {
          question: "Why should event consumers be idempotent?",
          answer: "The same event may be delivered more than once. Idempotent processing prevents duplicates from causing repeated unintended business effects."
        },
        {
          question: "What is the difference between local Spring events and distributed messaging?",
          answer: "Spring events notify components within one application process, while a broker supports communication between processes or services and can provide durable delivery features."
        },
        {
          question: "When should you use a message broker instead of Spring application events?",
          answer: "Use a broker when events must cross service boundaries, survive process restarts, or use messaging capabilities such as durable queues and consumer groups."
        },
        {
          question: "How do you test Spring event publication?",
          answer: "Verify the published event using a test listener, a mocked publisher, or Spring test support such as @RecordApplicationEvents and ApplicationEvents."
        },
        {
          question: "How do you test a transactional event listener?",
          answer: "Test the listener with a real transaction and verify the expected behavior after commit and rollback."
        },
        {
          question: "What is a correlation ID?",
          answer: "A correlation ID connects related operations and logs across components or services, helping developers trace an event-driven workflow."
        },
        {
          question: "What information should a domain event contain?",
          answer: "Include the identifiers and business facts consumers need, and avoid secrets or unnecessary personal information."
        },
        {
          question: "How should listener failures be handled?",
          answer: "Define whether the work is critical or best effort, report failures, and use suitable retries or durable messaging for important work."
        },
        {
          question: "Why should events not expose JPA entities directly?",
          answer: "Passing entities couples consumers to persistence details and may cause lazy-loading or serialization problems. Small immutable event contracts are generally safer."
        },
        {
          question: "How do you monitor an event-driven system?",
          answer: "Track event-processing latency, listener failures, retry counts, executor saturation, and pending-message or outbox backlog."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "A domain event represents a meaningful business fact. Spring's ApplicationEventPublisher publishes events, and @EventListener methods handle them. Default listeners normally execute synchronously in the publisher's call path.",
        "Use @Async for appropriate in-process background work and @TransactionalEventListener when handling should depend on a transaction phase. Neither mechanism alone guarantees durable delivery.",
        "When a database change must reliably produce a distributed message, use a transactional outbox or another suitable integration strategy. Design consumers to tolerate duplicate delivery and monitor the workflow."
      ],
      bullets: [
        "Event = a fact that happened.",
        "Command = a request to perform an action.",
        "ApplicationEventPublisher = publishes a Spring event.",
        "@EventListener = handles an event.",
        "@Async = asynchronous method execution when properly configured.",
        "@TransactionalEventListener = transaction-phase-aware event handling.",
        "Transactional outbox = atomically stores business data and an event record.",
        "Idempotent consumer = safe against repeated delivery.",
        "Correlation ID = helps trace related operations.",
        "Durability, retries, and cross-service delivery require explicit design."
      ]
    }
  ]
};
