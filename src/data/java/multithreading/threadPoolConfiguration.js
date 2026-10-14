export const threadPoolConfiguration = {
  id: "thread-pool-configuration",
  slug: "thread-pool-configuration",
  title: "ThreadPoolExecutor Configuration",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to configure ThreadPoolExecutor using corePoolSize, maximumPoolSize, keepAliveTime, BlockingQueue, ThreadFactory, and RejectedExecutionHandler, and understand how these settings affect backend applications.",
  estimatedTime: "50 min",

  sections: [
    {
      id: "what-is-configuration",
      title: "1. What is ThreadPoolExecutor Configuration?",
      paragraphs: [
        "ThreadPoolExecutor allows us to explicitly configure how many worker threads can run, how many tasks can wait in a queue, how long extra threads stay alive, and what happens when the executor is overloaded."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,                          // corePoolSize
        8,                          // maximumPoolSize
        60,                         // keepAliveTime
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      }
    },

    {
      id: "important-parameters",
      title: "2. The Important Parameters",
      bullets: [
        "corePoolSize → normal number of worker threads.",
        "maximumPoolSize → maximum number of workers.",
        "keepAliveTime → how long excess idle workers remain alive.",
        "BlockingQueue → stores waiting tasks.",
        "ThreadFactory → creates/configures worker threads.",
        "RejectedExecutionHandler → handles rejected tasks."
      ]
    },

    {
      id: "core-size",
      title: "3. corePoolSize",
      paragraphs: [
        "corePoolSize controls the normal worker capacity of the executor.",
        "For example, a core size of 4 means the executor can maintain four core workers under normal operation."
      ],
      code: {
        language: "java",
        code: `int corePoolSize = 4;

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        corePoolSize,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "maximum-size",
      title: "4. maximumPoolSize",
      paragraphs: [
        "maximumPoolSize defines the upper limit for worker threads.",
        "The executor can create additional workers beyond corePoolSize when the queue cannot accept more work and the maximum has not been reached."
      ],
      code: {
        language: "java",
        code: `int corePoolSize = 4;
int maximumPoolSize = 8;

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        corePoolSize,
        maximumPoolSize,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "queue-size",
      title: "5. BlockingQueue Capacity",
      paragraphs: [
        "The queue determines how many tasks can wait when workers are busy.",
        "A bounded queue gives the application explicit control over how much work can accumulate."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);`
      }
    },

    {
      id: "queue-effect",
      title: "6. Pool Size and Queue Work Together",
      paragraphs: [
        "The relationship between corePoolSize, maximumPoolSize, and queue capacity is one of the most important ThreadPoolExecutor concepts."
      ],
      code: {
        language: "java",
        code: `corePoolSize = 4
maximumPoolSize = 8
queueCapacity = 100

First tasks
    ↓
Create workers up to core size

More tasks
    ↓
Queue tasks

Queue becomes full
    ↓
Create workers up to maximum size

Pool and queue full
    ↓
Reject task`
      }
    },

    {
      id: "keep-alive",
      title: "7. keepAliveTime",
      paragraphs: [
        "keepAliveTime controls how long excess idle workers can remain alive.",
        "It is particularly relevant when the pool temporarily grows beyond corePoolSize."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "bounded-queue",
      title: "8. Why Use a Bounded Queue?",
      paragraphs: [
        "A bounded queue prevents an unlimited number of tasks from accumulating in memory.",
        "This provides a clear capacity limit and allows the executor's rejection policy to become part of overload handling."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        queue,
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      }
    },

    {
      id: "rejection-policy",
      title: "9. RejectedExecutionHandler",
      paragraphs: [
        "When the executor reaches its capacity, the RejectedExecutionHandler decides what happens to a new task."
      ],
      code: {
        language: "java",
        code: `RejectedExecutionHandler handler =
    new ThreadPoolExecutor.CallerRunsPolicy();

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        handler
    );`
      }
    },

    {
      id: "thread-factory",
      title: "10. ThreadFactory",
      paragraphs: [
        "A ThreadFactory controls how worker threads are created. It is commonly used to give worker threads meaningful names."
      ],
      code: {
        language: "java",
        code: `AtomicInteger counter =
    new AtomicInteger(1);

ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "api-worker-" +
        counter.getAndIncrement()
    );

    return thread;
};`
      }
    },

    {
      id: "complete-config",
      title: "11. Complete ThreadPoolExecutor Configuration",
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);

AtomicInteger counter =
    new AtomicInteger(1);

ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "backend-worker-" +
        counter.getAndIncrement()
    );

    return thread;
};

RejectedExecutionHandler handler =
    new ThreadPoolExecutor.CallerRunsPolicy();

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        queue,
        factory,
        handler
    );

executor.submit(() -> {
    System.out.println(
        "Processing request on " +
        Thread.currentThread().getName()
    );
});

executor.shutdown();`
      }
    },

    {
      id: "cpu-bound",
      title: "12. CPU-Bound Tasks",
      paragraphs: [
        "CPU-bound tasks spend most of their time using the CPU, such as calculations, compression, or intensive data processing.",
        "For CPU-bound workloads, creating excessive worker threads can increase contention and context switching."
      ],
      code: {
        language: "java",
        code: `int processors =
    Runtime.getRuntime()
           .availableProcessors();

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        processors,
        processors,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "io-bound",
      title: "13. I/O-Bound Tasks",
      paragraphs: [
        "I/O-bound tasks spend significant time waiting for databases, network services, files, or other external resources.",
        "Such workloads may benefit from more concurrency than CPU-bound workloads, but the correct size depends on the application and downstream limits."
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
      id: "dont-copy-values",
      title: "14. Do Not Blindly Copy Pool Sizes",
      paragraphs: [
        "There is no single thread-pool configuration that is correct for every application.",
        "Pool size should be based on workload characteristics, latency requirements, CPU capacity, queueing behavior, and downstream resource limits."
      ],
      bullets: [
        "Measure the workload.",
        "Check CPU usage.",
        "Check task execution time.",
        "Check queue latency.",
        "Check database connection limits.",
        "Check external API limits."
      ]
    },

    {
      id: "database-limit",
      title: "15. Database Connection Pool Consideration",
      paragraphs: [
        "A thread pool can have more workers than the database connection pool can serve concurrently.",
        "Increasing application threads does not automatically increase database throughput."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        20,
        40,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );

// But the database may only allow
// a much smaller number of active
// connections.`
      }
    },

    {
      id: "spring-backend",
      title: "16. Backend Example",
      paragraphs: [
        "Suppose a backend receives background order-processing tasks. A bounded pool can control concurrency and prevent unlimited tasks from accumulating."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(50);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        5,
        10,
        30,
        TimeUnit.SECONDS,
        queue,
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

executor.submit(() -> {
    processOrder();
});`
      }
    },

    {
      id: "monitoring",
      title: "17. Monitor the Executor",
      paragraphs: [
        "ThreadPoolExecutor provides useful metrics for understanding pool behavior."
      ],
      code: {
        language: "java",
        code: `System.out.println(
    "Pool size: " +
    executor.getPoolSize()
);

System.out.println(
    "Active threads: " +
    executor.getActiveCount()
);

System.out.println(
    "Queue size: " +
    executor.getQueue().size()
);

System.out.println(
    "Completed tasks: " +
    executor.getCompletedTaskCount()
);`
      }
    },

    {
      id: "saturation",
      title: "18. Recognizing Pool Saturation",
      paragraphs: [
        "A pool may be saturated when worker threads remain busy, the queue is consistently full, and tasks begin getting rejected or delayed."
      ],
      bullets: [
        "High active-thread count.",
        "Growing queue size.",
        "Increasing task latency.",
        "Increasing rejection count.",
        "High CPU or downstream resource usage."
      ]
    },

    {
      id: "too-many-threads",
      title: "19. Why Not Use a Huge Pool?",
      paragraphs: [
        "A very large thread pool can cause excessive context switching, memory consumption, lock contention, and pressure on downstream systems."
      ],
      bullets: [
        "More threads are not automatically faster.",
        "Threads consume memory.",
        "CPU scheduling has overhead.",
        "Database connections may become the bottleneck.",
        "External APIs may have concurrency limits."
      ]
    },

    {
      id: "too-small-pool",
      title: "20. Why Not Use a Very Small Pool?",
      paragraphs: [
        "A pool that is too small can cause unnecessary task waiting and poor utilization, particularly when tasks spend significant time waiting for I/O."
      ],
      bullets: [
        "Long queue waiting time.",
        "Lower throughput.",
        "Poor utilization of available resources.",
        "Increased request latency."
      ]
    },

    {
      id: "configuration-summary",
      title: "21. Configuration Summary",
      bullets: [
        "corePoolSize → normal worker capacity.",
        "maximumPoolSize → upper worker limit.",
        "keepAliveTime → lifetime of excess idle workers.",
        "BlockingQueue → waiting-task capacity.",
        "ThreadFactory → worker-thread configuration.",
        "RejectedExecutionHandler → overload behavior."
      ]
    },

    {
      id: "interview",
      title: "22. Interview Questions",
      interviewQuestions: [
        {
          question: "What are the important ThreadPoolExecutor parameters?",
          answer:
            "The important parameters are corePoolSize, maximumPoolSize, keepAliveTime, BlockingQueue, ThreadFactory, and RejectedExecutionHandler."
        },
        {
          question: "How does corePoolSize differ from maximumPoolSize?",
          answer:
            "corePoolSize represents the normal core worker capacity, while maximumPoolSize defines the maximum number of worker threads."
        },
        {
          question: "Why is BlockingQueue important?",
          answer:
            "It stores tasks waiting for execution and strongly affects when additional workers are created and when tasks are rejected."
        },
        {
          question: "Why use a bounded queue?",
          answer:
            "A bounded queue provides explicit limits on queued work and helps prevent unlimited task accumulation."
        },
        {
          question: "How do you choose thread-pool size?",
          answer:
            "Consider whether the workload is CPU-bound or I/O-bound, task execution time, CPU capacity, downstream limits, queue latency, and measured application behavior."
        },
        {
          question: "What happens when the pool is saturated?",
          answer:
            "If workers are at maximum capacity and the queue cannot accept another task, the configured RejectedExecutionHandler handles the task."
        },
        {
          question: "Why can a large thread pool be harmful?",
          answer:
            "Too many threads can increase memory usage, context switching, contention, and pressure on databases or external services."
        },
        {
          question: "Why should the database connection pool be considered?",
          answer:
            "Because database operations may require connections, so having many application threads does not help if the database connection pool or database itself is the bottleneck."
        }
      ]
    },

    {
      id: "interview-answer",
      title: "23. Interview Version",
      paragraphs: [
        "When configuring ThreadPoolExecutor, I consider corePoolSize, maximumPoolSize, queue capacity, keepAliveTime, thread factory, and rejection policy. I choose the pool size based on whether the workload is CPU-bound or I/O-bound and also consider database, network, and other downstream limits. I prefer bounded queues when I need explicit control over queued work and overload behavior."
      ]
    },

    {
      id: "final-note",
      title: "24. Final Note",
      paragraphs: [
        "The most important idea is that thread count, queue capacity, and rejection policy work together. You should configure them as one system rather than choosing each value independently."
      ]
    }
  ]
};