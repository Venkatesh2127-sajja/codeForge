export const virtualThreads = {
  id: "virtual-threads",

  slug: "virtual-threads",

  title: "Virtual Threads in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn Java virtual threads, platform threads, thread creation, virtual-thread executors, blocking I/O, CPU-bound workloads, thread pools, Spring Boot usage, and interview-focused concepts.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-are-virtual-threads",
      title: "1. What are Virtual Threads?",

      paragraphs: [
        "Virtual threads are lightweight threads introduced as a permanent feature in Java 21.",
        "They are designed to make it easier to write highly concurrent applications, especially applications that perform many blocking I/O operations.",
        "Virtual threads are managed by the Java runtime rather than being permanently mapped one-to-one to operating-system threads."
      ],

      code: {
        language: "text",
        code: `Platform Thread
      ↓
OS thread

Virtual Thread
      ↓
JVM-managed lightweight thread
      ↓
Runs on available platform threads`
      }
    },

    {
      id: "platform-vs-virtual",
      title: "2. Platform Thread vs Virtual Thread",

      bullets: [
        "Platform thread → traditional Java thread backed by an operating-system thread.",
        "Virtual thread → lightweight Java thread managed by the JVM.",
        "Platform threads are relatively expensive compared with virtual threads.",
        "Virtual threads allow applications to create very large numbers of concurrent tasks.",
        "Virtual threads are particularly useful when tasks spend significant time waiting for I/O."
      ],

      code: {
        language: "text",
        code: `Traditional model:

Request 1 → Platform Thread 1
Request 2 → Platform Thread 2
Request 3 → Platform Thread 3


Virtual-thread model:

Request 1 → Virtual Thread
Request 2 → Virtual Thread
Request 3 → Virtual Thread
Request 4 → Virtual Thread
...
              ↓
      JVM schedules them
      onto platform threads`
      }
    },

    {
      id: "why-virtual-threads",
      title: "3. Why Were Virtual Threads Introduced?",

      paragraphs: [
        "Traditional thread-per-request architectures can become expensive when applications need to handle very large numbers of concurrent requests.",
        "Many backend requests spend a significant amount of time waiting for databases, HTTP services, files, or other I/O.",
        "Virtual threads allow these applications to use a straightforward synchronous programming style while supporting much higher concurrency."
      ],

      code: {
        language: "text",
        code: `Request
   |
   +-- Database call
   |
   +-- Wait
   |
   +-- HTTP call
   |
   +-- Wait
   |
   +-- Response

A virtual thread can wait
without permanently occupying
a platform thread for the entire task.`
      }
    },

    {
      id: "create-virtual-thread",
      title: "4. Creating a Virtual Thread",

      paragraphs: [
        "Java provides Thread.ofVirtual() for creating a virtual-thread builder."
      ],

      code: {
        language: "java",
        code: `Thread thread =
    Thread.ofVirtual()
        .start(() -> {

            System.out.println(
                "Running in virtual thread"
            );
        });`
      }
    },

    {
      id: "start-virtual-thread",
      title: "5. startVirtualThread()",

      paragraphs: [
        "Java also provides Thread.startVirtualThread() as a convenient way to create and start a virtual thread."
      ],

      code: {
        language: "java",
        code: `Thread.startVirtualThread(() -> {

    System.out.println(
        "Hello from virtual thread"
    );
});`
      }
    },

    {
      id: "virtual-thread-name",
      title: "6. Naming Virtual Threads",

      paragraphs: [
        "Virtual threads can be given names just like platform threads."
      ],

      code: {
        language: "java",
        code: `Thread thread =
    Thread.ofVirtual()
        .name("order-worker")
        .start(() -> {

            System.out.println(
                Thread.currentThread()
                    .getName()
            );
        });`
      }
    },

    {
      id: "virtual-thread-builder",
      title: "7. Virtual Thread Builder",

      code: {
        language: "java",
        code: `Thread.Builder builder =
    Thread.ofVirtual()
        .name("worker-", 1);

Thread thread =
    builder.start(() -> {

        System.out.println(
            Thread.currentThread()
                .getName()
        );
    });`
      },

      paragraphs: [
        "The builder can be used when an application needs to configure and create multiple virtual threads with a consistent configuration."
      ]
    },

    {
      id: "executor",
      title: "8. Virtual Threads with ExecutorService",

      paragraphs: [
        "One of the most useful APIs is Executors.newVirtualThreadPerTaskExecutor().",
        "It creates an ExecutorService that starts a new virtual thread for each submitted task."
      ],

      code: {
        language: "java",
        code: `try (ExecutorService executor =
         Executors.newVirtualThreadPerTaskExecutor()) {

    executor.submit(() -> {

        System.out.println(
            "Task running"
        );
    });
}`
      }
    },

    {
      id: "many-tasks",
      title: "9. Running Many Tasks with Virtual Threads",

      code: {
        language: "java",
        code: `try (ExecutorService executor =
         Executors.newVirtualThreadPerTaskExecutor()) {

    for (int i = 1; i <= 1000; i++) {

        int taskId = i;

        executor.submit(() -> {

            System.out.println(
                "Task " + taskId
                + " running"
            );
        });
    }
}`
      },

      paragraphs: [
        "The important idea is that the executor does not maintain a small fixed pool of reusable platform threads for the submitted tasks. Each task gets its own virtual thread."
      ]
    },

    {
      id: "blocking-io",
      title: "10. Virtual Threads and Blocking I/O",

      paragraphs: [
        "Virtual threads are especially useful for workloads that spend substantial time waiting for blocking I/O.",
        "Examples include database calls, HTTP calls, file operations, and socket operations."
      ],

      code: {
        language: "java",
        code: `Thread.startVirtualThread(() -> {

    String response =
        externalService.call();

    saveResponse(response);
});`
      },

      paragraphs: [
        "When the virtual thread reaches a supported blocking operation, the JVM can suspend the virtual thread and use the underlying platform thread for other work."
      ]
    },

    {
      id: "cpu-bound",
      title: "11. Virtual Threads and CPU-Bound Work",

      paragraphs: [
        "Virtual threads do not create additional CPU cores.",
        "If a task is CPU-bound, creating huge numbers of virtual threads does not automatically make the computation faster."
      ],

      code: {
        language: "text",
        code: `CPU-bound:

Virtual Thread
      ↓
CPU computation
      ↓
CPU capacity is the limit

More virtual threads
      ≠
More CPU cores`
      }
    },

    {
      id: "io-vs-cpu",
      title: "12. I/O-Bound vs CPU-Bound",

      bullets: [
        "I/O-bound → virtual threads can provide major concurrency benefits.",
        "CPU-bound → performance is primarily limited by available CPU cores.",
        "Virtual threads are mainly about scalable concurrency, not magically increasing CPU performance."
      ],

      code: {
        language: "text",
        code: `I/O-bound

Task
 ↓
Wait
 ↓
Wait
 ↓
Response

Virtual threads → Very useful


CPU-bound

Task
 ↓
CPU
 ↓
CPU
 ↓
CPU

Virtual threads → Not a replacement
for CPU parallelism`
      }
    },

    {
      id: "join",
      title: "13. join() with Virtual Threads",

      paragraphs: [
        "Virtual threads support normal Thread operations such as join()."
      ],

      code: {
        language: "java",
        code: `Thread thread =
    Thread.startVirtualThread(() -> {

        System.out.println(
            "Processing..."
        );
    });

thread.join();

System.out.println(
    "Task completed"
);`
      }
    },

    {
      id: "sleep",
      title: "14. sleep() with Virtual Threads",

      paragraphs: [
        "Virtual threads support Thread.sleep().",
        "Sleeping a virtual thread does not permanently consume a platform thread for the entire sleep duration."
      ],

      code: {
        language: "java",
        code: `Thread.startVirtualThread(() -> {

    try {

        Thread.sleep(1000);

        System.out.println(
            "Finished waiting"
        );

    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();
    }
});`
      }
    },

    {
      id: "virtual-vs-fixed-pool",
      title: "15. Virtual Threads vs Fixed Thread Pool",

      bullets: [
        "Fixed thread pool → a limited number of worker threads execute tasks.",
        "Virtual-thread-per-task executor → each submitted task gets a virtual thread.",
        "Fixed pools can be useful when limiting concurrency is required.",
        "Virtual threads are useful when very large numbers of mostly waiting tasks need to be handled.",
        "Virtual threads do not remove the need to control external resource capacity."
      ],

      code: {
        language: "java",
        code: `// Traditional fixed pool

ExecutorService pool =
    Executors.newFixedThreadPool(20);


// Virtual threads

ExecutorService virtualPool =
    Executors.newVirtualThreadPerTaskExecutor();`
      }
    },

    {
      id: "do-not-pool",
      title: "16. Should Virtual Threads Be Pooled?",

      paragraphs: [
        "Virtual threads are cheap enough that applications generally should not create a traditional fixed pool of virtual threads just to limit the number of threads.",
        "If concurrency must be limited because a database, external API, or another resource has a fixed capacity, use an appropriate concurrency-limiting mechanism such as Semaphore or the resource's own connection pool."
      ],

      code: {
        language: "java",
        code: `Semaphore semaphore =
    new Semaphore(20);

Thread.startVirtualThread(() -> {

    try {

        semaphore.acquire();

        callExternalService();

    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();

    } finally {

        semaphore.release();
    }
});`
      }
    },

    {
      id: "virtual-thread-spring",
      title: "17. Virtual Threads in Spring Boot",

      paragraphs: [
        "Spring Boot applications can be configured to use virtual threads when running on a Java version that supports them and when the application stack supports the relevant configuration.",
        "With Spring Boot, the common configuration property is spring.threads.virtual.enabled=true."
      ],

      code: {
        language: "yaml",
        code: `spring:
  threads:
    virtual:
      enabled: true`
      }
    },

    {
      id: "spring-example",
      title: "18. Spring Boot Backend Example",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/orders")
public class OrderController {

    @GetMapping("/{id}")
    public OrderResponse getOrder(
            @PathVariable Long id) {

        return orderService
            .getOrder(id);
    }
}`
      },

      paragraphs: [
        "With virtual-thread support enabled appropriately in the Spring Boot application, request handling can use virtual threads, allowing blocking-style request processing to support high concurrency more efficiently for suitable workloads."
      ]
    },

    {
      id: "database-pool",
      title: "19. Virtual Threads Do Not Remove Database Limits",

      paragraphs: [
        "A very important backend concept is that virtual threads do not increase the capacity of a database connection pool.",
        "If thousands of virtual threads simultaneously need database connections but the connection pool has only a limited number of connections, the threads can still wait for available connections."
      ],

      code: {
        language: "text",
        code: `10,000 Virtual Threads
          |
          v
     Database Pool
          |
       20 connections
          |
          v
Most requests wait
for database capacity`
      },

      bullets: [
        "Virtual threads increase concurrency.",
        "Database connection pools still have limits.",
        "External APIs still have rate limits.",
        "CPU still has a finite number of cores."
      ]
    },

    {
      id: "synchronized",
      title: "20. Virtual Threads and synchronized",

      paragraphs: [
        "Virtual threads can use synchronized blocks and methods.",
        "However, developers should understand that certain blocking patterns involving intrinsic monitors can affect scalability depending on the code and runtime behavior.",
        "For normal application synchronization, synchronized remains a valid Java mechanism; virtual threads do not mean that synchronized should automatically be replaced."
      ],

      code: {
        language: "java",
        code: `private final Object lock =
    new Object();

public void update() {

    synchronized (lock) {

        updateSharedState();
    }
}`
      }
    },

    {
      id: "threadlocal",
      title: "21. Virtual Threads and ThreadLocal",

      paragraphs: [
        "Virtual threads support ThreadLocal, but developers should avoid using ThreadLocal as a general-purpose way to carry large amounts of state.",
        "A virtual-thread-per-request model can create very large numbers of threads, so excessive thread-local state can increase memory usage."
      ],

      code: {
        language: "java",
        code: `ThreadLocal<String> context =
    new ThreadLocal<>();

Thread.startVirtualThread(() -> {

    context.set("Request-123");

    try {
        processRequest();

    } finally {
        context.remove();
    }
});`
      }
    },

    {
      id: "structured-concurrency",
      title: "22. Virtual Threads and Structured Concurrency",

      paragraphs: [
        "Virtual threads work well with structured concurrency concepts, where related concurrent tasks have a clear lifetime and are treated as a single unit of work.",
        "Structured concurrency is a separate Java concurrency topic and should be learned as an advanced concept after understanding virtual threads."
      ]
    },

    {
      id: "when-to-use",
      title: "23. When Should You Use Virtual Threads?",

      bullets: [
        "High-concurrency server applications",
        "Many concurrent blocking I/O operations",
        "HTTP client calls",
        "Database operations where the database can handle the concurrency",
        "File and socket I/O",
        "Thread-per-request programming models"
      ]
    },

    {
      id: "when-not",
      title: "24. When Should You Be Careful?",

      bullets: [
        "CPU-bound workloads",
        "Unlimited calls to external services",
        "Unlimited database concurrency",
        "Large amounts of per-thread memory",
        "Code that relies heavily on thread-bound context without understanding thread transitions",
        "Applications where the surrounding libraries or infrastructure are not suitable for the intended virtual-thread usage"
      ]
    },

    {
      id: "virtual-vs-completable",
      title: "25. Virtual Threads vs CompletableFuture",

      bullets: [
        "Virtual threads → make thread-per-task style highly scalable for suitable workloads.",
        "CompletableFuture → provides asynchronous composition and pipelines.",
        "Virtual threads can make blocking-style code easier to write.",
        "CompletableFuture is useful when explicit asynchronous composition is required.",
        "They solve related but different problems and can also be used together."
      ],

      code: {
        language: "text",
        code: `Virtual Threads

Request
   ↓
Blocking call
   ↓
Continue


CompletableFuture

Task A
   ↓
thenCompose()
   ↓
Task B
   ↓
Result`
      }
    },

    {
      id: "backend-example",
      title: "26. Complete Backend Example",

      paragraphs: [
        "Suppose an order service needs to call several external services. Each request may spend significant time waiting for network I/O."
      ],

      code: {
        language: "java",
        code: `try (ExecutorService executor =
         Executors.newVirtualThreadPerTaskExecutor()) {

    Future<String> payment =
        executor.submit(() ->
            paymentService.check()
        );

    Future<String> inventory =
        executor.submit(() ->
            inventoryService.check()
        );

    String paymentResult =
        payment.get();

    String inventoryResult =
        inventory.get();

    System.out.println(
        paymentResult
    );

    System.out.println(
        inventoryResult
    );
}`
      },

      paragraphs: [
        "Each submitted task can execute in its own virtual thread. The external services and other downstream resources still determine how much concurrency the system can safely sustain."
      ]
    },

    {
      id: "common-mistakes",
      title: "27. Common Mistakes",

      bullets: [
        "Thinking virtual threads create more CPU cores.",
        "Creating a fixed pool of virtual threads just because traditional platform threads are pooled.",
        "Ignoring database connection-pool limits.",
        "Ignoring external API rate limits.",
        "Using virtual threads for CPU-bound work and expecting automatic speedup.",
        "Assuming every library has identical virtual-thread behavior.",
        "Keeping unnecessary large state associated with huge numbers of virtual threads."
      ]
    },

    {
      id: "important-rules",
      title: "28. Important Rules",

      bullets: [
        "Virtual threads are lightweight Java threads.",
        "They became a permanent feature in Java 21.",
        "They are especially useful for high-concurrency blocking I/O.",
        "They do not create additional CPU capacity.",
        "Do not blindly pool virtual threads.",
        "Limit scarce external resources separately.",
        "Database connection pools still matter.",
        "External API limits still matter.",
        "Use virtual threads when they simplify and improve the application's concurrency model."
      ]
    },

    {
      id: "interview-questions",
      title: "29. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is a virtual thread?",
          answer:
            "A virtual thread is a lightweight Java thread managed by the JVM and designed to support very high concurrency, especially for workloads that spend significant time waiting for I/O."
        },

        {
          question: "When were virtual threads introduced as a permanent feature?",
          answer:
            "Virtual threads became a permanent feature in Java 21."
        },

        {
          question: "What is the difference between a platform thread and a virtual thread?",
          answer:
            "A platform thread is backed by an operating-system thread, while a virtual thread is a lightweight JVM-managed thread that can be scheduled onto platform threads."
        },

        {
          question: "How do you create a virtual thread?",
          answer:
            "You can use Thread.ofVirtual().start(), Thread.startVirtualThread(), or Executors.newVirtualThreadPerTaskExecutor()."
        },

        {
          question: "Why are virtual threads useful for I/O-bound applications?",
          answer:
            "They allow applications to create many concurrent tasks without requiring one expensive platform thread for every task throughout its lifetime."
        },

        {
          question: "Do virtual threads improve CPU-bound performance?",
          answer:
            "Not automatically. CPU-bound performance is still limited primarily by available CPU cores."
        },

        {
          question: "Should virtual threads be pooled?",
          answer:
            "Generally, no. Virtual threads are intended to be created per task when appropriate. If concurrency needs to be limited, limit the scarce resource or use an explicit concurrency mechanism."
        },

        {
          question: "Do virtual threads remove database connection limits?",
          answer:
            "No. A database connection pool still has a finite number of connections."
        },

        {
          question: "Can virtual threads use synchronized?",
          answer:
            "Yes. Virtual threads support Java synchronization mechanisms, although applications should still consider scalability characteristics of their locking patterns."
        },

        {
          question: "Virtual threads vs CompletableFuture?",
          answer:
            "Virtual threads provide lightweight thread-per-task concurrency, while CompletableFuture provides asynchronous composition and chaining. They address different aspects of concurrent programming."
        },

        {
          question: "Can ThreadLocal be used with virtual threads?",
          answer:
            "Yes, but developers should consider the memory cost of per-thread state when creating very large numbers of virtual threads."
        }
      ]
    },

    {
      id: "interview-version",
      title: "30. Interview Version",

      paragraphs: [
        "Virtual threads are lightweight JVM-managed threads introduced as a permanent feature in Java 21. They are especially useful for high-concurrency applications that perform blocking I/O such as database and HTTP calls. They allow a thread-per-task programming style without requiring a dedicated platform thread for every concurrent task. Virtual threads do not increase CPU capacity, so they are not a replacement for CPU parallelism."
      ]
    },

    {
      id: "final-note",
      title: "31. Final Note",

      bullets: [
        "Platform Thread → traditional OS-backed Java thread",
        "Virtual Thread → lightweight JVM-managed thread",
        "Java 21 → virtual threads became permanent",
        "I/O-bound → strong use case",
        "CPU-bound → CPU remains the bottleneck",
        "newVirtualThreadPerTaskExecutor() → virtual thread per task",
        "Do not blindly pool virtual threads",
        "Database pool → still limited",
        "External API → still rate-limited",
        "Virtual threads → scalable concurrency, not unlimited resources"
      ]
    }
  ]
};