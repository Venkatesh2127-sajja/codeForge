
export const asyncProcessingWithAsync = {
  id: 1501,
  title: "Asynchronous Processing with @Async",
  slug: "async-processing-with-async",
  topicTitle: "Spring Boot Advanced",
  description:
    "Understand asynchronous method execution, thread pools, CompletableFuture, exception handling, timeouts, testing, and production-ready @Async patterns in Spring Boot.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "what-is-async",
      title: "1. What Is Asynchronous Processing?",
      paragraphs: [
        "In synchronous processing, the caller waits for a method to finish before continuing. In asynchronous processing, a task can run on another thread so the caller can continue without waiting for that task to finish.",
        "Consider an e-commerce application. When a customer places an order, the application may need to save the order, send a confirmation email, and record an analytics event. The order should be saved successfully before the application confirms the purchase. Sending an email, however, may be performed separately if the business workflow allows it.",
        "Spring's @Async annotation allows eligible Spring-managed methods to execute using a task executor. The calling thread can continue while the task runs on a worker thread.",
        "Asynchronous execution does not automatically make the task itself faster. It changes how the application schedules and waits for work. It can improve responsiveness and concurrency, but it introduces thread management, exception handling, and coordination concerns."
      ],
      bullets: [
        "Synchronous: the caller waits for the operation to finish.",
        "Asynchronous: the caller can continue while the task executes separately.",
        "Worker thread: a thread that executes a submitted task.",
        "Executor: manages task execution and worker threads.",
        "Use asynchronous execution for independent, potentially slow work.",
        "Do not make critical business operations asynchronous without defining their completion and failure guarantees."
      ]
    },
    {
      id: "synchronous-vs-asynchronous",
      title: "2. Synchronous vs Asynchronous Execution",
      paragraphs: [
        "In synchronous execution, the calling thread performs an operation and waits for its result. If an external email provider takes three seconds to respond, the caller may remain occupied for those three seconds.",
        "In asynchronous execution, the application submits work to another thread. The calling thread can continue with other work while the submitted task runs. The asynchronous task still consumes resources and may take the same amount of time to complete.",
        "Suppose an API saves an order and then waits for an email provider. If email delivery is allowed to happen separately, the API can return after the order has been durably accepted and the notification task has been submitted. The API must not claim that the email was successfully delivered unless that result is actually known.",
        "Asynchronous processing is useful when tasks can run independently. If one operation requires the completed result of another operation immediately, asynchronous execution may simply move the waiting to a later point."
      ],
      bullets: [
        "Synchronous code is usually easier to follow and debug.",
        "Asynchronous code can improve responsiveness for independent tasks.",
        "Both approaches still consume CPU, memory, connections, or other resources.",
        "A future that is immediately joined or awaited may eliminate the responsiveness benefit.",
        "Define whether an API response means accepted, completed, or successfully delivered."
      ],
      code: {
        language: "java",
        code: "// Synchronous: the caller waits for the operation.\nString result = reportService.generateReport();\nSystem.out.println(result);\n\n// Asynchronous: the caller receives a future for the result.\nCompletableFuture<String> future =\n    reportService.generateReportAsync();\n\nSystem.out.println(\"The caller can do other work now.\");"
      }
    },
    {
      id: "enable-async",
      title: "3. Enable Asynchronous Processing",
      paragraphs: [
        "Spring supports asynchronous method execution through @EnableAsync and @Async. Add @EnableAsync to a configuration class or application configuration so Spring can process eligible asynchronous methods.",
        "In the default proxy-based configuration, a call must pass through the Spring-managed proxy. Calling an @Async method from another method on the same object can bypass the proxy and execute synchronously.",
        "For a typical Spring Boot application, place @EnableAsync on a configuration class and keep asynchronous methods in Spring-managed beans such as @Service components.",
        "Enabling asynchronous processing does not automatically make every method asynchronous. Only eligible calls to methods annotated with @Async are intercepted."
      ],
      code: {
        language: "java",
        code: "import org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.scheduling.annotation.EnableAsync;\n\n@SpringBootApplication\n@EnableAsync\npublic class CodeForgeApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(CodeForgeApplication.class, args);\n    }\n}"
      },
      bullets: [
        "@EnableAsync enables Spring's annotation-driven asynchronous method support.",
        "@Async marks a method for asynchronous execution.",
        "The class containing the method should be managed by Spring.",
        "The caller should invoke the method through the Spring proxy.",
        "A separate service bean is a common way to avoid self-invocation problems."
      ]
    },
    {
      id: "thread-pool-fundamentals",
      title: "4. What Is a Thread Pool?",
      paragraphs: [
        "A thread pool manages reusable worker threads. Instead of creating a new operating-system thread for every task, the executor submits tasks to a pool that schedules them for execution.",
        "A thread pool usually has a core pool size, a maximum pool size, and a queue capacity. Core threads handle normal work, additional threads may be created when the queueing policy and configured limits permit it, and the queue holds tasks waiting for execution.",
        "When all workers are busy and the queue is full, the executor must reject or otherwise handle additional tasks according to its rejection policy. A bounded queue and a sensible maximum thread count help prevent uncontrolled resource consumption.",
        "The best pool size depends on the workload. CPU-intensive work is constrained by available CPU capacity, while I/O-heavy work may benefit from more concurrent workers because tasks spend time waiting on databases or remote services. Load testing is more reliable than choosing arbitrary large numbers."
      ],
      bullets: [
        "Core pool size: the normal baseline number of workers.",
        "Maximum pool size: the upper limit for worker threads.",
        "Queue capacity: the number of pending tasks the queue can hold.",
        "Thread name prefix: helps identify workers in logs and thread dumps.",
        "Rejection policy: defines what happens when the executor cannot accept more work.",
        "A larger pool is not always faster; it can increase context switching and downstream pressure."
      ]
    },
    {
      id: "configure-thread-pool",
      title: "5. Configure a Bounded Thread Pool",
      paragraphs: [
        "A production application should normally configure asynchronous execution explicitly instead of relying on an unsuitable default executor. A bounded executor makes concurrency and queueing behavior more predictable.",
        "The following configuration creates a named ThreadPoolTaskExecutor. Its core size is four workers, its maximum size is eight workers, and its queue can hold 100 waiting tasks. These are example values, not universal production recommendations.",
        "With the default queue-first behavior of ThreadPoolExecutor, new tasks are generally queued after core workers are busy. Additional workers above the core size are normally created when the queue becomes full, up to the maximum size. After the executor reaches its limits, the rejection policy applies.",
        "A rejection policy such as AbortPolicy makes overload visible by throwing a rejection exception. Avoid silently discarding important work. The application should handle submission failures and define whether to return an error, retry safely, or persist the task for later processing."
      ],
      code: {
        language: "java",
        code: "import java.util.concurrent.Executor;\nimport java.util.concurrent.ThreadPoolExecutor;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.scheduling.annotation.EnableAsync;\nimport org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;\n\n@Configuration\n@EnableAsync\npublic class AsyncConfig {\n\n    @Bean(\"taskExecutor\")\n    public Executor taskExecutor() {\n        ThreadPoolTaskExecutor executor =\n            new ThreadPoolTaskExecutor();\n\n        executor.setCorePoolSize(4);\n        executor.setMaxPoolSize(8);\n        executor.setQueueCapacity(100);\n        executor.setThreadNamePrefix(\"app-async-\");\n        executor.setRejectedExecutionHandler(\n            new ThreadPoolExecutor.AbortPolicy()\n        );\n        executor.setWaitForTasksToCompleteOnShutdown(true);\n        executor.setAwaitTerminationSeconds(20);\n\n        return executor;\n    }\n}"
      },
      bullets: [
        "Use a separate executor for workloads with different resource requirements.",
        "Set queue capacity based on acceptable waiting time and memory consumption.",
        "Choose a rejection policy deliberately.",
        "Configure shutdown behavior according to the application's requirements.",
        "Monitor active threads, queue depth, task duration, and rejected tasks.",
        "Do not treat an in-memory executor queue as durable job storage."
      ]
    },
    {
      id: "async-service",
      title: "6. Create an Asynchronous Service",
      paragraphs: [
        "A service method can be annotated with @Async to execute through a configured executor. When the caller invokes the method through the Spring proxy, the invocation is submitted to the executor instead of running as an ordinary synchronous method call.",
        "The following example returns a CompletableFuture containing a result. Spring's @Async infrastructure executes the method on a worker thread and adapts the returned future to the future observed by the caller.",
        "The example simulates notification processing. A real implementation would call an email provider or notification client and should distinguish successful delivery from merely accepting a notification request.",
        "For methods that return a result, use Future or CompletableFuture. A void-returning @Async method can be appropriate for simple fire-and-forget work, but callers cannot directly observe its result through a return value."
      ],
      code: {
        language: "java",
        code: "import java.util.concurrent.CompletableFuture;\n\nimport org.springframework.scheduling.annotation.Async;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class NotificationService {\n\n    @Async(\"taskExecutor\")\n    public CompletableFuture<String> sendNotification(\n            String email) {\n\n        // Replace this simulation with a real provider call.\n        String result = \"Notification processed for \" + email;\n\n        return CompletableFuture.completedFuture(result);\n    }\n}"
      },
      bullets: [
        "Use @Async(\"taskExecutor\") to select a named executor.",
        "Return CompletableFuture when the caller needs completion or result information.",
        "Keep expensive work inside the asynchronous method.",
        "Do not return a completed future before the actual work has completed.",
        "Do not claim that a notification was delivered unless the provider confirms delivery."
      ]
    },
    {
      id: "completable-future",
      title: "7. Understanding CompletableFuture",
      paragraphs: [
        "CompletableFuture represents a computation that may complete in the future. It allows the caller to register callbacks, transform results, combine independent operations, and handle errors without blocking immediately.",
        "thenApply transforms a successful result into another value. thenAccept consumes a result without returning a new business value. thenCompose chains an operation that itself returns a future, while thenCombine combines the results of two independent futures.",
        "The non-Async variants of these methods may execute on the thread that completes the previous stage or another thread participating in completion. The Async variants generally use an asynchronous executor, and an explicit executor can be supplied where supported.",
        "Calling get() or join() waits for completion. This may be appropriate at a genuine synchronization boundary, but calling either immediately after starting an asynchronous operation can make the calling thread wait and reduce the benefit of asynchronous execution."
      ],
      code: {
        language: "java",
        code: "CompletableFuture<String> future =\n    notificationService.sendNotification(\"user@example.com\");\n\nfuture.thenApply(String::toUpperCase)\n      .thenAccept(System.out::println)\n      .exceptionally(error -> {\n          // Log the failure and record suitable diagnostics.\n          return null;\n      });\n\nSystem.out.println(\"The caller can continue here.\");"
      },
      bullets: [
        "thenApply: transform a successful result.",
        "thenAccept: consume a successful result.",
        "thenCompose: chain dependent asynchronous work.",
        "thenCombine: combine results from independent futures.",
        "exceptionally: provide a recovery result after failure.",
        "handle: process either a successful result or a failure.",
        "orTimeout: complete a future exceptionally after a time limit, where supported by the Java version."
      ]
    },
    {
      id: "async-controller",
      title: "8. Calling an Async Service from a REST Controller",
      paragraphs: [
        "A controller can call an asynchronous service and return a response without immediately waiting for the background result. The response must accurately describe what has happened.",
        "For example, an API may return HTTP 202 Accepted when a notification or report-generation task has been accepted for processing but has not yet completed. This status does not guarantee that the task will eventually succeed.",
        "For a simple in-memory @Async task, submission may fail because the executor is shutting down or overloaded. The controller or calling service should handle submission failures. If the application must guarantee that accepted work survives a process crash, use a durable job or messaging design instead.",
        "Do not expose an email address, internal exception, or other sensitive information unnecessarily in API responses or logs."
      ],
      code: {
        language: "java",
        code: "import java.util.concurrent.CompletableFuture;\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class NotificationController {\n\n    private final NotificationService notificationService;\n\n    public NotificationController(\n            NotificationService notificationService) {\n        this.notificationService = notificationService;\n    }\n\n    @PostMapping(\"/api/notifications\")\n    public ResponseEntity<String> send(\n            @RequestParam String email) {\n\n        CompletableFuture<String> task =\n            notificationService.sendNotification(email);\n\n        return ResponseEntity.accepted()\n            .body(\"Notification processing was requested.\");\n    }\n}"
      },
      bullets: [
        "HTTP 202 is suitable when work has been accepted but is not complete.",
        "An accepted response does not prove successful completion.",
        "Handle failures that occur while submitting the task.",
        "Use a status endpoint or job ID when clients need to track progress.",
        "Use durable messaging or job persistence when task loss is unacceptable."
      ]
    },
    {
      id: "async-exception-handling",
      title: "9. Exception Handling in @Async Methods",
      paragraphs: [
        "An exception thrown inside an asynchronous task does not automatically propagate to the original caller in the same way as a normal synchronous method call. How the failure is observed depends on the method's return type and the caller's handling.",
        "For a CompletableFuture-returning method, the future completes exceptionally if the asynchronous computation fails. The caller can use exceptionally, handle, or whenComplete to react to the failure.",
        "For a void-returning @Async method, the caller has no future to inspect. Spring provides AsyncUncaughtExceptionHandler for uncaught exceptions from such methods. This handler should record useful diagnostics and trigger appropriate operational alerts where necessary.",
        "Exception handling is not the same as retrying. Retrying should be limited to operations that are safe to repeat, use bounded attempts and backoff, and distinguish transient failures from permanent errors."
      ],
      code: {
        language: "java",
        code: "CompletableFuture<String> task =\n    notificationService.sendNotification(\"user@example.com\");\n\ntask.whenComplete((result, error) -> {\n    if (error != null) {\n        // Log the failure and record a metric.\n        System.err.println(\"Notification task failed: \"\n            + error.getMessage());\n    } else {\n        System.out.println(\"Task completed: \" + result);\n    }\n});"
      },
      bullets: [
        "Handle future failures with exceptionally, handle, or whenComplete.",
        "Configure AsyncUncaughtExceptionHandler for uncaught void-method failures.",
        "Do not swallow exceptions without recording the failure.",
        "Use retries only when they are safe and bounded.",
        "Record correlation IDs and task identifiers for troubleshooting.",
        "Do not log secrets or full sensitive payloads."
      ]
    },
    {
      id: "async-timeouts-and-cancellation",
      title: "10. Timeouts and Cancellation",
      paragraphs: [
        "An asynchronous task can wait too long for a database, HTTP service, or other resource. Define timeouts at the operation that performs the blocking work, such as the HTTP client or database layer.",
        "CompletableFuture.orTimeout can cause a future to complete exceptionally after a configured duration. However, timing out the future does not necessarily stop the underlying blocking operation or release its resources immediately.",
        "Cancellation is also not a universal guarantee that work stops. Its effectiveness depends on the task implementation, thread interruption handling, and the underlying library. A network call should have its own connect and response timeouts.",
        "Keep task deadlines aligned across layers. If an API has a short response deadline, submitting an unbounded background operation without limits can allow work to accumulate after the original request is no longer useful."
      ],
      code: {
        language: "java",
        code: "import java.util.concurrent.CompletableFuture;\nimport java.util.concurrent.TimeUnit;\n\nCompletableFuture<String> task =\n    notificationService.sendNotification(\"user@example.com\");\n\ntask.orTimeout(5, TimeUnit.SECONDS)\n    .exceptionally(error -> {\n        // Record timeout or another task failure.\n        return \"Notification processing did not complete in time.\";\n    });"
      },
      bullets: [
        "Configure timeouts in the actual database or HTTP client operation.",
        "Use future timeouts to bound waiting, not as proof that work stopped.",
        "Propagate cancellation where the underlying operation supports it.",
        "Avoid unlimited task duration and unlimited queued work.",
        "Distinguish timeout, cancellation, rejection, and business failure in monitoring."
      ]
    },
    {
      id: "async-thread-context",
      title: "11. Thread Context, Security, and Transactions",
      paragraphs: [
        "A worker thread is different from the thread that received the original request. Thread-local state does not automatically move to another thread. This can affect logging MDC values, security context, request-scoped data, and transaction state.",
        "Spring Security can provide executor integrations that propagate security context when configured appropriately. Logging correlation IDs can also be propagated using a task decorator or another deliberate context propagation mechanism. Avoid copying the entire request context blindly.",
        "A database transaction started on the caller thread does not automatically become one shared transaction with an @Async worker thread. If the asynchronous method performs database writes, it generally needs its own transaction boundary when required.",
        "Do not pass managed JPA entities with lazy relationships across thread boundaries without considering persistence-context ownership and data consistency. Passing immutable DTOs or identifiers and loading the needed data in the worker is often safer."
      ],
      bullets: [
        "Thread-local values do not automatically propagate to worker threads.",
        "A caller's transaction is not automatically shared with the async worker.",
        "Configure security and logging context propagation deliberately.",
        "Prefer immutable task inputs and explicit identifiers.",
        "Avoid sharing non-thread-safe mutable objects between tasks.",
        "Design transaction boundaries inside the service that owns the database operation."
      ]
    },
    {
      id: "async-vs-durable-processing",
      title: "12. @Async vs Durable Background Processing",
      paragraphs: [
        "@Async is useful for relatively simple background tasks executed by the current application process. It does not by itself persist tasks to durable storage, guarantee execution after a crash, or provide distributed message delivery.",
        "If an application accepts a payment-related task, report-generation request, or critical notification that must survive process restarts, an in-memory executor alone may be insufficient. A process crash can lose queued work, and shutdown behavior cannot guarantee every task completes.",
        "Durable alternatives include storing jobs in a database, publishing messages to a broker such as RabbitMQ or Kafka, or using a managed job-processing system. These designs add operational complexity but can provide persistence, redelivery, and better control over processing.",
        "Even with a durable queue, consumers should be designed for duplicate delivery and safe retries. Exactly-once business effects usually require idempotency and appropriate database constraints or transaction design."
      ],
      bullets: [
        "@Async: convenient process-local asynchronous execution.",
        "Database-backed jobs: useful when work needs persistence and status tracking.",
        "Message broker: useful for decoupling services and durable delivery patterns.",
        "Scheduled jobs: useful for periodic or time-based work.",
        "Use idempotency keys or deduplication for repeatable task processing.",
        "Choose based on delivery guarantees, volume, latency, and operational needs."
      ]
    },
    {
      id: "async-self-invocation",
      title: "13. Why @Async May Not Work",
      paragraphs: [
        "In the default proxy-based Spring configuration, annotations such as @Async are applied when a method is called through a Spring proxy. A direct call from one method to another method on the same object does not pass through that proxy.",
        "For example, if processOrder() calls sendNotification() inside the same service object, the @Async advice on sendNotification() may not run. The method may execute synchronously on the current thread.",
        "A clean solution is to place the asynchronous method in a separate Spring-managed service and inject that service into the caller. This also makes the asynchronous boundary easier to test and maintain.",
        "Other reasons for unexpected behavior include forgetting @EnableAsync, using an object created with new instead of Spring dependency injection, selecting the wrong executor bean name, or testing a method without going through the proxy."
      ],
      bullets: [
        "Avoid self-invocation of @Async methods.",
        "Use constructor injection for the asynchronous service.",
        "Ensure the target object is managed by Spring.",
        "Verify @EnableAsync and executor bean names.",
        "Test behavior through the Spring application context when proxy behavior matters."
      ],
      code: {
        language: "java",
        code: "@Service\npublic class OrderService {\n    private final NotificationService notificationService;\n\n    public OrderService(NotificationService notificationService) {\n        this.notificationService = notificationService;\n    }\n\n    public void processOrder(Long orderId, String email) {\n        // Perform required order validation and persistence first.\n        notificationService.sendNotification(email);\n    }\n}"
      }
    },
    {
      id: "async-testing",
      title: "14. Testing Asynchronous Methods",
      paragraphs: [
        "Asynchronous tests must account for the fact that a task may not have completed when the test thread continues. Avoid arbitrary Thread.sleep calls as the main synchronization mechanism because they make tests slow and flaky.",
        "For methods returning CompletableFuture, wait for completion with a bounded timeout when the test needs to assert the result. Use mocks to verify interactions and test both successful and exceptional completion.",
        "For void-returning asynchronous methods, use synchronization tools such as CountDownLatch or Awaitility when available in the project. Verify that the task completes within a reasonable deadline and that failure handling works.",
        "Unit tests that instantiate a service directly do not exercise Spring's asynchronous proxy. Add an application-context integration test when you need to verify that @EnableAsync, bean proxying, and executor configuration work together."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertTrue;\n\nimport java.util.concurrent.CompletableFuture;\nimport java.util.concurrent.TimeUnit;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.context.SpringBootTest;\n\n@SpringBootTest\nclass AsyncNotificationIntegrationTest {\n\n    @Autowired\n    private NotificationService notificationService;\n\n    @Test\n    void asynchronousMethodCompletes() throws Exception {\n        CompletableFuture<String> result =\n            notificationService.sendNotification(\"test@example.com\");\n\n        String value = result.get(3, TimeUnit.SECONDS);\n\n        assertTrue(value.contains(\"test@example.com\"));\n    }\n}"
      },
      bullets: [
        "Use bounded waits in tests.",
        "Test successful completion and exceptional completion.",
        "Avoid relying on arbitrary sleeps.",
        "Use mocks to verify external provider interactions.",
        "Use integration tests to validate Spring proxy behavior.",
        "Keep tests independent of real email or third-party services where possible."
      ]
    },
    {
      id: "async-monitoring",
      title: "15. Monitoring and Production Best Practices",
      paragraphs: [
        "An asynchronous executor is a resource boundary. Monitor active worker count, pool size, queue depth, completed task count, rejected submissions, task duration, and failure rates.",
        "Thread names such as app-async- make thread dumps and logs easier to interpret. Correlation IDs and task identifiers help connect the original request to background work when the context is propagated correctly.",
        "Use separate executors for tasks with different behavior. For example, slow report generation should not consume every worker needed for short notification tasks. Size pools according to downstream connection limits as well as CPU and memory.",
        "Graceful shutdown can allow accepted tasks time to complete, but it is not a durability guarantee. If losing queued work is unacceptable, persist or publish the work to a durable system."
      ],
      bullets: [
        "Use bounded queues and explicit rejection handling.",
        "Set operation-level timeouts.",
        "Monitor task latency, failures, queue depth, and rejections.",
        "Use separate executors for distinct workloads.",
        "Avoid blocking worker threads on unnecessary nested future waits.",
        "Make retries bounded and operations idempotent where possible.",
        "Use durable messaging or job storage for critical background work."
      ]
    },
    {
      id: "common-mistakes",
      title: "16. Common @Async Mistakes",
      paragraphs: [
        "A common mistake is expecting @Async to work without enabling asynchronous processing or without calling the target through the Spring proxy. Another is configuring a pool with an unbounded queue, which can allow pending tasks and memory usage to grow excessively.",
        "Fire-and-forget tasks can fail without the original caller noticing. A task may also be rejected before it starts, time out while waiting on an external service, or be lost if the application process terminates.",
        "Another mistake is assuming that asynchronous work shares the caller's transaction, security context, or thread-local values. Those properties require explicit configuration and careful design.",
        "Finally, adding @Async to every slow method is not a complete performance strategy. Measure bottlenecks, establish resource limits, and choose between process-local tasks and durable processing based on the business requirement."
      ],
      bullets: [
        "Forgetting @EnableAsync.",
        "Calling an @Async method through self-invocation.",
        "Creating the service manually instead of using Spring dependency injection.",
        "Using unbounded queues or excessive thread counts.",
        "Ignoring exceptions and rejected task submissions.",
        "Assuming caller transactions automatically propagate to worker threads.",
        "Using @Async where durable task delivery is required."
      ]
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is asynchronous processing?",
          answer: "Asynchronous processing allows a task to run independently of the caller's immediate execution flow, so the caller can continue without waiting for the task to finish."
        },
        {
          question: "What is @Async in Spring Boot?",
          answer: "@Async marks a Spring-managed method for asynchronous execution through a configured executor when the invocation is intercepted by Spring's async infrastructure."
        },
        {
          question: "Why do we use @EnableAsync?",
          answer: "@EnableAsync enables Spring's annotation-driven asynchronous method execution support."
        },
        {
          question: "What is a thread pool?",
          answer: "A thread pool manages reusable worker threads that execute submitted tasks. It controls concurrency and avoids creating a new thread for every task."
        },
        {
          question: "What is the difference between core pool size and maximum pool size?",
          answer: "Core pool size is the baseline number of workers. Maximum pool size is the upper limit that the executor may reach under its configured queueing policy."
        },
        {
          question: "What is queue capacity?",
          answer: "Queue capacity controls how many tasks can wait for execution. A bounded queue helps limit pending work and memory usage."
        },
        {
          question: "What happens when an executor is overloaded?",
          answer: "When workers and the configured queue cannot accept more tasks, the executor applies its rejection policy, which may throw an exception or perform another configured action."
        },
        {
          question: "Why might @Async not work when a method calls another method in the same class?",
          answer: "In default proxy-based configuration, self-invocation bypasses the Spring proxy, so the async interceptor may not run."
        },
        {
          question: "What is CompletableFuture?",
          answer: "CompletableFuture represents a computation that may complete later and supports result transformation, composition, combination, and error handling."
        },
        {
          question: "What is the difference between thenApply and thenCompose?",
          answer: "thenApply transforms a result into another value. thenCompose chains a function that returns another CompletionStage or CompletableFuture, flattening the nested asynchronous result."
        },
        {
          question: "What is the difference between thenAccept and thenApply?",
          answer: "thenAccept consumes a result without producing a new business result, while thenApply transforms the result into a new value."
        },
        {
          question: "Does calling join() preserve the benefit of asynchronous execution?",
          answer: "The task may still run asynchronously, but join() blocks the calling thread until completion. Calling it immediately can remove much of the responsiveness benefit."
        },
        {
          question: "How are exceptions handled in a CompletableFuture-returning @Async method?",
          answer: "The future can complete exceptionally. The caller can handle the failure with exceptionally, handle, or whenComplete."
        },
        {
          question: "How are exceptions handled in a void-returning @Async method?",
          answer: "The caller has no future to inspect. An AsyncUncaughtExceptionHandler can handle uncaught exceptions from void-returning asynchronous methods."
        },
        {
          question: "Does @Async guarantee successful task completion?",
          answer: "No. Tasks can fail, be rejected, time out, or be interrupted by process shutdown. Completion and failure behavior must be designed explicitly."
        },
        {
          question: "Does @Async guarantee that a task survives application restart?",
          answer: "No. Tasks and queues managed only in application memory are not durable. Use persistent jobs or a durable message broker when work must survive process failure."
        },
        {
          question: "Does a caller's database transaction automatically propagate to an @Async method?",
          answer: "No. The asynchronous method normally runs on a different thread and needs its own transaction boundary when database work requires one."
        },
        {
          question: "How do you propagate security context to an asynchronous task?",
          answer: "Configure an appropriate security-aware executor or explicit context propagation mechanism. Do not assume thread-local security context automatically moves to worker threads."
        },
        {
          question: "What is the purpose of a named executor?",
          answer: "A named executor lets an @Async method select a specific thread pool, making it possible to isolate workloads and tune their resource limits separately."
        },
        {
          question: "Why should thread pools and queues be bounded?",
          answer: "Bounds limit resource consumption and expose overload instead of allowing unlimited threads or pending tasks to exhaust application resources."
        },
        {
          question: "How should asynchronous methods be tested?",
          answer: "Use bounded waits for futures, synchronization tools for void methods, mocks for external dependencies, and integration tests to verify Spring proxy configuration."
        },
        {
          question: "What is the difference between @Async and a message queue?",
          answer: "@Async schedules process-local work, while a properly configured durable message queue can persist messages and support redelivery and decoupling across services."
        },
        {
          question: "When is HTTP 202 Accepted appropriate?",
          answer: "It is appropriate when the server has accepted a request for processing but has not yet completed the requested operation. It does not guarantee eventual success."
        },
        {
          question: "How can you prevent duplicate side effects when retrying asynchronous work?",
          answer: "Use idempotent operations, idempotency keys, deduplication, and suitable database constraints so repeated attempts do not create duplicate business effects."
        },
        {
          question: "What should be monitored for an async executor?",
          answer: "Monitor active workers, pool size, queue depth, task duration, completed tasks, exceptions, rejected submissions, and downstream resource pressure."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "18. Quick Revision Notes",
      paragraphs: [
        "@EnableAsync enables Spring's asynchronous method execution support, and @Async marks eligible methods for execution through an executor. A bounded ThreadPoolTaskExecutor controls workers, queued tasks, and overload behavior.",
        "CompletableFuture lets callers observe completion and compose asynchronous operations. Exceptions should be handled deliberately, and timeouts should be configured at the actual operation as well as at the future-waiting layer when appropriate.",
        "The default proxy-based setup does not intercept self-invocation. Worker threads do not automatically share the caller's transaction or thread-local context. In-memory @Async tasks are not durable, so critical background work may require persistent jobs or messaging."
      ],
      bullets: [
        "@EnableAsync: enables async annotation support.",
        "@Async: schedules an eligible method on an executor.",
        "ThreadPoolTaskExecutor: configurable Spring task executor.",
        "CompletableFuture: represents a result that may complete later.",
        "Use bounded queues, timeouts, and explicit rejection policies.",
        "Handle future failures and void-method exceptions.",
        "Avoid self-invocation of @Async methods.",
        "Do not assume transactions or thread-local context are shared.",
        "Use durable jobs or messaging when accepted work must survive crashes."
      ]
    }
  ]
};
