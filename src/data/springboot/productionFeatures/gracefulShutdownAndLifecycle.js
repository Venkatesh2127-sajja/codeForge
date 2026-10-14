
export const gracefulShutdownAndLifecycle = {
  id: 1407,
  title: "Graceful Shutdown and Lifecycle Management",
  slug: "graceful-shutdown-and-lifecycle-management",
  topicTitle: "Spring Boot Production Features",
  description:
    "Understand graceful shutdown, Spring application lifecycle events, in-flight request draining, container termination, lifecycle timeouts, and safe production deployment.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "shutdown",
      title: "What Is Graceful Shutdown?",
      paragraphs: [
        "Graceful shutdown allows an application to stop accepting new work and gives in-progress requests an opportunity to finish before the process terminates, subject to configured time limits.",
        "During a deployment, an application instance may be removed from service and then terminated. If the process stops immediately, requests that are still running may fail, client connections may be interrupted, and unfinished background work may be lost.",
        "Spring Boot supports graceful shutdown for supported embedded web servers. The server stops accepting new requests on its listening interface while existing requests are given an opportunity to complete. The exact behavior depends on the embedded server and application configuration.",
        "Graceful shutdown does not make every operation reliable automatically. A request may take longer than the allowed shutdown period, a database operation may fail, or the operating system may forcibly terminate the process. Important business operations still need transaction boundaries, idempotency, retries, and durable processing where appropriate.",
        "A useful way to understand graceful shutdown is to distinguish it from abrupt termination. Graceful shutdown gives the application a controlled opportunity to finish work and release resources; abrupt termination may stop it before those activities complete."
      ],
      bullets: [
        "Stop accepting new work on the application's server interface.",
        "Give in-flight HTTP requests time to finish.",
        "Configure an appropriate Spring lifecycle timeout.",
        "Allow the deployment platform enough time before forced termination.",
        "Close resources and stop background workers safely.",
        "Design critical operations to recover from interruption.",
        "Remember that a graceful shutdown is best-effort, not a guarantee that all work will complete."
      ]
    },
    {
      id: "configuration",
      title: "Configure Graceful Shutdown",
      paragraphs: [
        "Spring Boot provides the server.shutdown property for enabling graceful shutdown on supported embedded web servers. Set it to graceful to enable this behavior.",
        "The spring.lifecycle.timeout-per-shutdown-phase property controls how long Spring waits for an individual lifecycle phase to complete during shutdown. The timeout should reflect the application's shutdown requirements and the time allowed by the deployment platform.",
        "The lifecycle phase timeout is not a universal per-request timeout. The web server's draining behavior and application request timeouts also influence how long requests can continue. A long-running request can still be interrupted if the overall termination deadline expires.",
        "The following example enables graceful shutdown and configures a 30-second timeout for each Spring lifecycle shutdown phase."
      ],
      code: {
        language: "yaml",
        code: `server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s`
      },
      bullets: [
        "Verify that the embedded server and Spring Boot version support the expected behavior.",
        "Choose a timeout based on observed request durations and shutdown work.",
        "Coordinate Spring lifecycle timeouts with the container or orchestrator termination grace period.",
        "Do not assume a shutdown hook can finish after an immediate forced kill.",
        "Use suitable connection, request, and downstream-call timeouts in addition to the lifecycle timeout.",
        "Test the actual packaged application rather than relying only on unit tests."
      ]
    },
    {
      id: "shutdown-flow",
      title: "Understand the Graceful Shutdown Flow",
      paragraphs: [
        "In a typical Spring Boot web application, an operating-system termination signal initiates application shutdown. Spring begins closing its application context, and the embedded server participates in the configured graceful shutdown process.",
        "The server stops accepting new requests on the relevant listening interface and gives requests already in progress time to finish. Spring also stops and closes managed lifecycle components according to their lifecycle contracts.",
        "After the allowed time has elapsed, shutdown must continue. Depending on the server, the operation being performed, and the deployment platform's deadline, unfinished work may be interrupted or terminated.",
        "The exact ordering of web-server draining, lifecycle callbacks, resource destruction, and individual component shutdown depends on the framework lifecycle and component configuration. Avoid assuming that every component shuts down in a single universal sequence."
      ],
      code: {
        language: "text",
        code: `Typical graceful shutdown

Deployment platform sends termination signal
                  |
                  v
        Spring begins shutdown
                  |
                  v
      Web server stops new work
                  |
                  v
     In-flight requests may finish
                  |
                  v
   Managed lifecycle components stop
                  |
                  v
       Resources are released
                  |
                  v
          Process exits

If the deadline expires, remaining work may be interrupted.`
      },
      bullets: [
        "A termination signal starts the shutdown process.",
        "Graceful server shutdown gives existing requests time to complete.",
        "Spring-managed components can perform their shutdown work.",
        "Shutdown deadlines limit how long the process can remain active.",
        "A forced kill may bypass normal cleanup.",
        "External systems must not assume that a process always exits cleanly."
      ]
    },
    {
      id: "lifecycle-events",
      title: "Observe Application Lifecycle Events",
      paragraphs: [
        "Spring and Spring Boot publish events that allow components to react to important application lifecycle milestones.",
        "ApplicationReadyEvent is published after the application context has been refreshed and application runners have completed. It is commonly used for short actions that should happen after startup, such as logging a readiness milestone or initializing non-critical application-specific state.",
        "ApplicationStartedEvent occurs earlier than ApplicationReadyEvent. It is published after the application context has been refreshed but before ApplicationRunner and CommandLineRunner execution has completed.",
        "ContextClosedEvent is published when the application context begins closing. It can be useful for observing shutdown, but event listeners should not be used as an unbounded place to perform lengthy cleanup.",
        "Lifecycle events are not a substitute for an external readiness probe. Whether an instance receives traffic also depends on the load balancer, platform, readiness configuration, and deployment process."
      ],
      code: {
        language: "java",
        code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationLifecycleLogger {

    private static final Logger log =
            LoggerFactory.getLogger(
                    ApplicationLifecycleLogger.class);

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        log.info("Application startup completed");
    }
}`
      },
      bullets: [
        "Use ApplicationReadyEvent for actions that should occur after startup and runner execution.",
        "Use ApplicationStartedEvent when you need to observe an earlier startup milestone.",
        "Use ContextClosedEvent to observe context shutdown when appropriate.",
        "Keep lifecycle event handlers short and predictable.",
        "Avoid blocking startup or shutdown with long-running external calls.",
        "Use readiness and liveness probes for platform health decisions.",
        "Design critical startup tasks so failures are visible and recoverable."
      ]
    },
    {
      id: "pre-destroy",
      title: "Release Resources During Shutdown",
      paragraphs: [
        "Spring provides lifecycle mechanisms for managed components to release resources when the application context closes. One commonly used option is the @PreDestroy annotation on a bean method.",
        "A cleanup method may close a custom resource, stop a locally managed worker, or release a resource owned by the bean. It should be bounded and should not duplicate cleanup already handled by a framework-managed resource.",
        "For more advanced lifecycle control, SmartLifecycle allows a component to participate in Spring's phased startup and shutdown process. Its stop contract supports asynchronous completion signaling, so implementations must signal completion correctly.",
        "Cleanup is not guaranteed under every failure condition. A SIGKILL, machine crash, or abrupt container termination can prevent cleanup code from running. External locks, distributed leases, database transactions, and queued jobs must therefore be designed with failure recovery in mind."
      ],
      code: {
        language: "java",
        code: `import jakarta.annotation.PreDestroy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class WorkerLifecycle {

    private static final Logger log =
            LoggerFactory.getLogger(WorkerLifecycle.class);

    @PreDestroy
    public void stopWorker() {
        log.info("Stopping application worker");
        // Signal the worker to stop and release
        // resources owned by this bean.
    }
}`
      },
      bullets: [
        "Use @PreDestroy for bounded cleanup of resources owned by a bean.",
        "Avoid starting new business operations during shutdown.",
        "Do not block indefinitely while waiting for a worker to stop.",
        "Use SmartLifecycle when explicit lifecycle phases or asynchronous stopping are required.",
        "Do not manually close resources already managed by Spring unless your ownership model requires it.",
        "Make external resources recover safely if the process disappears without cleanup."
      ]
    },
    {
      id: "deployment",
      title: "Graceful Shutdown During Deployment",
      paragraphs: [
        "In a rolling deployment, a platform replaces application instances gradually. A safe replacement process removes an instance from new traffic, gives active work time to finish, and then terminates the process.",
        "Readiness checks, load-balancer draining, Spring Boot graceful shutdown, and the platform's termination deadline should be coordinated. If the platform stops routing traffic only after the application has begun terminating, new requests may still reach an instance at an inconvenient time.",
        "Kubernetes, for example, has a termination grace period. A preStop hook may be used as part of a carefully designed shutdown sequence, and the container runtime eventually sends a termination signal before forcefully killing a process if the grace period expires.",
        "A preStop hook consumes time from the pod's termination grace period. It should not be added without considering readiness changes, endpoint propagation, application shutdown time, and the total termination deadline.",
        "For important asynchronous work, use durable queues or persistent job records. A queue consumer should stop acquiring new messages, finish or safely abandon its current work, and allow unacknowledged messages to be retried according to the messaging system's semantics."
      ],
      code: {
        language: "text",
        code: `Deployment coordination

1. Mark the instance as unavailable for new traffic.
2. Allow readiness and routing changes to take effect.
3. Initiate process termination.
4. Let Spring Boot drain in-flight HTTP requests.
5. Stop background workers and release resources.
6. Exit before the platform termination deadline.

If work cannot finish:
- Stop waiting when the deadline requires it.
- Recover through retries, durable state, or idempotent processing.`
      },
      bullets: [
        "Coordinate readiness, load-balancer draining, and process termination.",
        "Allow enough termination grace time for the application's shutdown behavior.",
        "Account for preStop hook execution within the platform's termination deadline.",
        "Use durable messaging and idempotent handlers for critical asynchronous work.",
        "Avoid relying only on in-memory queues for business-critical jobs.",
        "Test rolling deployments while requests and background jobs are active.",
        "Verify the behavior of the actual orchestrator and embedded server."
      ]
    },
    {
      id: "readiness",
      title: "Coordinate Shutdown with Readiness Checks",
      paragraphs: [
        "Readiness indicates whether an instance should receive traffic. Liveness indicates whether an application is alive enough to continue running or should be restarted by the platform. These checks answer different operational questions.",
        "A readiness probe can help a platform stop routing new traffic to an instance that is no longer ready. Graceful shutdown then provides time for work already in progress to finish.",
        "Spring Boot Actuator supports application availability states and health probes when configured appropriately. The exact integration with a load balancer or container platform must still be verified.",
        "Do not use a readiness endpoint as the only shutdown mechanism. Correct endpoint propagation, server shutdown behavior, and the process termination deadline are also important."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoint:
    health:
      probes:
        enabled: true
  endpoints:
    web:
      exposure:
        include: health

server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s`
      },
      bullets: [
        "Use readiness to indicate whether the instance should receive new traffic.",
        "Use liveness to indicate whether the process should continue running.",
        "Verify the probe paths and routing behavior in the target deployment platform.",
        "Do not expose sensitive Actuator endpoints publicly without suitable protection.",
        "Do not assume probe configuration alone guarantees that traffic has drained.",
        "Coordinate application and infrastructure timeouts."
      ]
    },
    {
      id: "background-jobs",
      title: "Handle Background Jobs and Message Consumers",
      paragraphs: [
        "Graceful HTTP shutdown does not automatically make every background task safe. Scheduled tasks, custom executor threads, and message consumers may continue running unless their lifecycle is managed appropriately.",
        "For a message consumer, a safe shutdown strategy commonly stops polling or accepting new messages, gives the current message time to finish when possible, and acknowledges it only according to the broker's delivery semantics.",
        "If processing is interrupted before acknowledgement, a message may be delivered again. Handlers should therefore be idempotent or use a reliable deduplication strategy when duplicate processing could cause incorrect business results.",
        "For scheduled jobs, consider whether overlapping executions are possible, whether work is persisted, and how an interrupted execution will be retried or resumed."
      ],
      bullets: [
        "Stop acquiring new work before terminating workers.",
        "Give active work a bounded time to finish.",
        "Persist critical work instead of relying only on memory.",
        "Use idempotency keys or deduplication where duplicate execution is possible.",
        "Acknowledge messages only according to the chosen processing and durability model.",
        "Define retry, dead-letter, and recovery behavior.",
        "Monitor unfinished jobs and shutdown duration."
      ]
    },
    {
      id: "testing",
      title: "Test Graceful Shutdown in Practice",
      paragraphs: [
        "Graceful shutdown should be tested under realistic conditions because its behavior depends on the web server, request duration, Spring lifecycle, and deployment platform.",
        "A useful test starts a request that takes a known amount of time, initiates shutdown while the request is active, and observes whether the request completes within the configured limits.",
        "Also test a request that exceeds the shutdown deadline, a background task that is still running, and a deployment termination that reaches the platform's deadline. The purpose is to understand the limits of the system, not to assume that every request must always succeed.",
        "Use logs and metrics to observe shutdown start time, active requests where available, worker termination, and final process exit. Avoid logging credentials or sensitive request content."
      ],
      code: {
        language: "bash",
        code: `# Build the application
./mvnw clean package

# Run the packaged application
java -jar target/app.jar

# In a separate terminal, call an endpoint
curl http://localhost:8080/actuator/health

# Send a termination signal to the Java process.
# Observe application logs and verify shutdown behavior.
# Use the actual PID and platform-specific process tools
# appropriate to your operating system.`
      },
      bullets: [
        "Test with requests that finish quickly and requests that take longer.",
        "Initiate shutdown while requests are active.",
        "Verify that the application exits within the expected deadline.",
        "Test background jobs and message consumers separately.",
        "Test the packaged application in the target container or orchestration environment.",
        "Verify that forced termination and retry paths behave safely.",
        "Use logs and metrics to investigate shutdown delays."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Graceful Shutdown Mistakes",
      paragraphs: [
        "Graceful shutdown can fail to achieve its goal when application and infrastructure timeouts are inconsistent or when background work is not managed. For example, configuring a 60-second lifecycle timeout does not help if the container is forcibly killed after 10 seconds.",
        "Another common mistake is assuming that an application-ready event means the instance is registered and healthy in every external load balancer. Application lifecycle events and infrastructure routing state are related but separate concerns.",
        "Shutdown callbacks that block indefinitely, threads that ignore interruption, and jobs that depend entirely on in-memory state can also prevent a clean exit or cause lost work."
      ],
      bullets: [
        "Enabling graceful shutdown but providing too little termination grace time.",
        "Treating timeout-per-shutdown-phase as a universal per-request timeout.",
        "Assuming every request will finish regardless of its duration.",
        "Using blocking shutdown callbacks that never return.",
        "Assuming @PreDestroy always runs, even after forced termination.",
        "Ignoring scheduled tasks and message consumers during shutdown.",
        "Confusing readiness with liveness.",
        "Assuming ApplicationReadyEvent automatically removes or registers an instance in a load balancer.",
        "Failing to test shutdown in the actual container environment.",
        "Relying on an in-memory queue for critical work that must survive process termination."
      ]
    },
    {
      id: "best-practices",
      title: "Graceful Shutdown Best Practices",
      paragraphs: [
        "A production shutdown strategy combines application-level lifecycle management with infrastructure-level traffic draining and termination deadlines. Each layer should have a clear responsibility.",
        "Measure actual request durations and shutdown behavior before choosing timeout values. Ensure that the platform's termination deadline leaves enough time for readiness propagation, server draining, component cleanup, and process exit.",
        "For business-critical work, prefer durable storage and explicit recovery strategies over assumptions that a process will always have time to finish. Graceful shutdown reduces disruption, while durability and idempotency help protect correctness when interruption still occurs."
      ],
      bullets: [
        "Enable server.shutdown=graceful where supported.",
        "Set spring.lifecycle.timeout-per-shutdown-phase based on measured behavior.",
        "Coordinate Spring, server, client, load-balancer, and container timeouts.",
        "Use readiness checks and traffic draining to reduce new requests during replacement.",
        "Keep lifecycle callbacks bounded and observable.",
        "Stop background workers from accepting new work before termination.",
        "Use durable queues, idempotency, and retries for important processing.",
        "Test SIGTERM handling and forced termination scenarios.",
        "Monitor shutdown duration and identify components that delay termination.",
        "Never rely on cleanup callbacks as the only protection against data loss."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is graceful shutdown?",
          answer: "Graceful shutdown allows an application to stop accepting new work and gives in-flight requests and managed components time to finish or stop within configured limits before the process exits."
        },
        {
          question: "How do you enable graceful shutdown in Spring Boot?",
          answer: "For supported Spring Boot versions and embedded servers, configure server.shutdown=graceful and set spring.lifecycle.timeout-per-shutdown-phase to an appropriate duration."
        },
        {
          question: "What does timeout-per-shutdown-phase mean?",
          answer: "It controls how long Spring waits for an individual lifecycle shutdown phase to complete. It is not a universal timeout for each HTTP request."
        },
        {
          question: "Does graceful shutdown guarantee that all requests finish?",
          answer: "No. Requests may exceed the allowed time, dependencies may fail, and a forced process termination may interrupt work. Durable processing, appropriate timeouts, and recovery strategies remain important."
        },
        {
          question: "Why should application shutdown be coordinated with a container termination grace period?",
          answer: "The platform eventually enforces its termination deadline. The application's draining and cleanup must fit within that deadline, or the process may be killed before shutdown completes."
        },
        {
          question: "What is ApplicationReadyEvent?",
          answer: "It is a Spring Boot event published after application startup and application runner execution have completed. It can be used to observe an application-specific readiness milestone."
        },
        {
          question: "What is the difference between ApplicationStartedEvent and ApplicationReadyEvent?",
          answer: "ApplicationStartedEvent is published after the application context has been refreshed but before application runners complete. ApplicationReadyEvent is published later, after those runners finish."
        },
        {
          question: "What is the purpose of @PreDestroy?",
          answer: "It marks a bean method for cleanup when the managed bean is being destroyed as part of normal container shutdown. It is not guaranteed to run after forced termination or a machine crash."
        },
        {
          question: "What is SmartLifecycle?",
          answer: "SmartLifecycle is a Spring lifecycle interface that supports controlled startup and shutdown phases, including asynchronous stop completion signaling."
        },
        {
          question: "What is the difference between readiness and liveness?",
          answer: "Readiness indicates whether an instance should receive traffic. Liveness indicates whether the application should continue running or be restarted by the platform."
        },
        {
          question: "How does graceful shutdown help during rolling deployments?",
          answer: "Traffic draining and readiness changes help prevent new work from reaching a retiring instance, while graceful shutdown gives existing requests and managed components time to finish."
        },
        {
          question: "What happens if a container receives SIGKILL?",
          answer: "SIGKILL cannot be handled by application shutdown hooks. The process stops immediately, so cleanup code may not execute and unfinished work must be handled through recovery mechanisms."
        },
        {
          question: "How should a message consumer stop gracefully?",
          answer: "It should stop accepting or fetching new messages, allow current work to finish within a bounded period when possible, and use appropriate acknowledgement, retry, and deduplication behavior if processing is interrupted."
        },
        {
          question: "How do you test graceful shutdown?",
          answer: "Run the packaged application, start requests or jobs that remain active, initiate termination, and observe completion, logs, and exit time. Also test timeout expiration and forced termination in the target deployment environment."
        },
        {
          question: "Does ApplicationReadyEvent guarantee that a load balancer is sending traffic to the instance?",
          answer: "No. It indicates a Spring Boot startup milestone. External routing and health decisions depend on the load balancer, orchestration platform, and readiness configuration."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Graceful shutdown reduces disruption by stopping new work and allowing in-flight requests and managed components time to finish within configured limits. Spring Boot supports this through embedded-server graceful shutdown and the Spring application lifecycle.",
        "A complete production strategy coordinates server behavior, Spring lifecycle timeouts, readiness checks, traffic draining, background worker shutdown, and container termination deadlines. Durable processing and recovery mechanisms are still necessary for work that may be interrupted."
      ],
      bullets: [
        "Enable graceful shutdown: server.shutdown=graceful.",
        "Configure lifecycle timeout: spring.lifecycle.timeout-per-shutdown-phase=30s.",
        "ApplicationReadyEvent: startup and runner execution have completed.",
        "ContextClosedEvent: the application context is closing.",
        "@PreDestroy: bounded bean cleanup during normal destruction.",
        "Readiness: whether the instance should receive traffic.",
        "Liveness: whether the application should continue running.",
        "Container grace period: the infrastructure deadline for termination.",
        "Critical background work: use durable storage, idempotency, and recovery.",
        "Remember: graceful shutdown reduces disruption but cannot guarantee that all work completes."
      ],
      code: {
        language: "text",
        code: `Production shutdown checklist

[ ] Graceful shutdown enabled
[ ] Lifecycle timeout configured
[ ] Container termination grace period reviewed
[ ] Readiness and traffic draining coordinated
[ ] In-flight request behavior tested
[ ] Background workers stop accepting new work
[ ] Critical jobs have retry and recovery strategies
[ ] Shutdown duration is observable
[ ] Forced termination behavior is tested`
      }
    }
  ]
};