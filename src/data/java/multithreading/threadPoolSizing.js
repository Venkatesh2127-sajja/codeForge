export const threadPoolSizing = {
  id: "thread-pool-sizing",
  slug: "thread-pool-sizing",

  title: "Thread Pool Sizing — CPU-Bound vs I/O-Bound Tasks",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn how to choose an appropriate thread pool size for CPU-bound and I/O-bound workloads and understand the impact of CPU cores, blocking operations, queues, and backend resources.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-thread-pool-sizing",

      title: "1. What is Thread Pool Sizing?",

      paragraphs: [
        "Thread pool sizing means deciding how many worker threads should execute tasks concurrently.",

        "Choosing the right size depends mainly on the type of workload, CPU cores, blocking operations, task duration, and downstream resources."
      ]
    },

    {
      id: "cpu-bound",

      title: "2. CPU-Bound Tasks",

      paragraphs: [
        "CPU-bound tasks spend most of their time using the CPU rather than waiting for external resources.",

        "Examples include calculations, data processing, compression, encryption, and CPU-heavy algorithms."
      ],

      code: {
        language: "java",
        code: `int processors =
    Runtime.getRuntime()
           .availableProcessors();

System.out.println(
    "Available processors: " + processors
);`
      }
    },

    {
      id: "cpu-pool-size",

      title: "3. Thread Pool Size for CPU-Bound Tasks",

      paragraphs: [
        "For CPU-bound workloads, a pool close to the number of available processors is commonly a reasonable starting point.",

        "The exact value should be validated through measurement because the application may have other CPU consumers."
      ],

      code: {
        language: "java",
        code: `int processors =
    Runtime.getRuntime()
           .availableProcessors();

ExecutorService executor =
    Executors.newFixedThreadPool(processors);`
      }
    },

    {
      id: "io-bound",

      title: "4. I/O-Bound Tasks",

      paragraphs: [
        "I/O-bound tasks spend significant time waiting for external resources.",

        "Examples include database calls, HTTP requests, file operations, and calls to external services.",

        "While one thread is waiting for I/O, another thread can perform useful work."
      ]
    },

    {
      id: "io-pool-size",

      title: "5. Thread Pool Size for I/O-Bound Tasks",

      paragraphs: [
        "I/O-bound workloads may need more threads than CPU cores because many threads can spend time waiting.",

        "However, increasing the thread count without considering downstream capacity can overload databases or external services."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        10,
        20,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "blocking-example",

      title: "6. Why I/O Workloads Can Use More Threads",

      paragraphs: [
        "Suppose a server has 8 CPU cores and several tasks spend most of their time waiting for a database response.",

        "Using only 8 threads may leave CPU capacity unused while those threads are blocked.",

        "A larger pool can allow other tasks to make progress, provided the database and other downstream systems can handle the additional concurrency."
      ]
    },

    {
      id: "not-fixed-formula",

      title: "7. There Is No Universal Formula",

      paragraphs: [
        "There is no single thread-pool size that is correct for every application.",

        "A practical starting point must be validated using workload characteristics, measurements, queue behavior, CPU usage, latency, and downstream capacity."
      ]
    },

    {
      id: "queue-impact",

      title: "8. Queue Size Also Matters",

      paragraphs: [
        "Thread count and queue capacity work together.",

        "A very large queue can hide overload by allowing requests to wait for a long time.",

        "A bounded queue makes overload visible and allows the rejection policy to provide backpressure."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      }
    },

    {
      id: "database-capacity",

      title: "9. Database Connection Pool Consideration",

      paragraphs: [
        "A backend thread pool should not be sized independently of the database connection pool.",

        "If many application threads need database connections but only a small number of connections are available, additional threads may simply wait for connections."
      ],

      code: {
        language: "text",
        code: `Application Threads
        |
        v
Thread Pool
        |
        v
Database Connection Pool
        |
        v
Database`
      }
    },

    {
      id: "external-service",

      title: "10. External Service Capacity",

      paragraphs: [
        "The same principle applies to external APIs and services.",

        "A large thread pool can generate excessive concurrent requests and cause rate limiting, timeouts, or failures."
      ]
    },

    {
      id: "too-many-threads",

      title: "11. What Happens with Too Many Threads?",

      bullets: [
        "Higher context-switching overhead",
        "More memory usage because every thread needs stack space",
        "Greater contention for shared resources",
        "More pressure on databases and external services",
        "Possible increase in latency",
        "Harder troubleshooting and monitoring"
      ]
    },

    {
      id: "too-few-threads",

      title: "12. What Happens with Too Few Threads?",

      bullets: [
        "Tasks wait longer in the queue",
        "CPU may remain underutilized",
        "I/O workloads may have unnecessary latency",
        "Request throughput may decrease",
        "Background processing can become slower"
      ]
    },

    {
      id: "spring-boot-example",

      title: "13. Spring Boot Backend Example",

      paragraphs: [
        "A Spring Boot application can use a configured Executor for asynchronous or background work."
      ],

      code: {
        language: "java",
        code: `@Bean
public ExecutorService applicationExecutor() {

    int processors =
        Runtime.getRuntime()
               .availableProcessors();

    return new ThreadPoolExecutor(
        processors,
        processors * 2,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );
}`
      }
    },

    {
      id: "measure",

      title: "14. Measure Before Tuning",

      paragraphs: [
        "Thread-pool configuration should be based on measurements rather than assumptions.",

        "Useful metrics include active threads, queue size, task execution time, rejected tasks, CPU usage, request latency, throughput, and downstream resource utilization."
      ],

      code: {
        language: "java",
        code: `System.out.println(
    "Pool Size: " +
    executor.getPoolSize()
);

System.out.println(
    "Active Threads: " +
    executor.getActiveCount()
);

System.out.println(
    "Queue Size: " +
    executor.getQueue().size()
);

System.out.println(
    "Completed Tasks: " +
    executor.getCompletedTaskCount()
);`
      }
    },

    {
      id: "practical-process",

      title: "15. Practical Thread Pool Sizing Process",

      bullets: [
        "Identify whether the workload is CPU-bound or I/O-bound.",
        "Check available CPU processors.",
        "Identify blocking operations.",
        "Check database connection pool capacity.",
        "Check external service concurrency limits.",
        "Choose an initial pool size.",
        "Use a bounded queue where appropriate.",
        "Choose a rejection policy.",
        "Measure CPU, latency, throughput, queue size, and failures.",
        "Tune based on real workload results."
      ]
    },

    {
      id: "backend-scenario",

      title: "16. Backend Scenario",

      paragraphs: [
        "Suppose a Spring Boot API receives requests that call a database and then an external payment service.",

        "Increasing the thread pool may improve concurrency only until the database connection pool or payment service becomes the bottleneck.",

        "Therefore, thread-pool sizing must consider the complete request path rather than only the application server."
      ]
    },

    {
      id: "interview-questions",

      title: "17. Important Interview Questions",

      interviewQuestions: [
        {
          question: "How do you size a thread pool for CPU-bound tasks?",

          answer:
            "A common starting point is a pool size close to the number of available processors. The actual value should be validated through measurement."
        },

        {
          question: "Why can I/O-bound applications use more threads?",

          answer:
            "Because threads can spend significant time waiting for I/O. Other threads can execute while those threads are blocked."
        },

        {
          question: "Should we always increase the thread pool size for better performance?",

          answer:
            "No. Too many threads can increase context switching, memory usage, contention, and downstream resource pressure."
        },

        {
          question: "Why should database connection pool size be considered?",

          answer:
            "Because database operations require connections. If the application has more concurrent database tasks than available connections, additional threads may wait."
        },

        {
          question: "Why use a bounded queue?",

          answer:
            "A bounded queue limits queued work, prevents unlimited memory growth, and allows overload handling through a rejection policy."
        },

        {
          question: "What should you monitor when tuning a thread pool?",

          answer:
            "Monitor active threads, pool size, queue size, task execution time, rejected tasks, CPU usage, latency, throughput, and downstream resource utilization."
        }
      ]
    },

    {
      id: "interview-version",

      title: "18. Interview Version",

      paragraphs: [
        "When sizing a thread pool, I first determine whether the workload is CPU-bound or I/O-bound. For CPU-bound work, I usually start near the number of available processors. For I/O-bound work, I may use more threads because tasks spend time waiting. I also consider queue capacity, database connections, external-service limits, and rejection policies. Finally, I monitor CPU, latency, throughput, queue size, and resource utilization and tune the configuration based on actual workload."
      ]
    },

    {
      id: "final-note",

      title: "19. Final Note",

      paragraphs: [
        "Thread-pool sizing is a resource-management problem, not simply a matter of choosing a large number of threads.",

        "The goal is to achieve useful concurrency without creating unnecessary contention or overwhelming downstream systems."
      ]
    }
  ]
};