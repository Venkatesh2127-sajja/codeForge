export const threadPoolExecutor = {
  id: "thread-pool-executor",
  slug: "thread-pool-executor",
  title:
    "ThreadPoolExecutor — Core Pool Size, Maximum Pool Size, Keep-Alive Time, and BlockingQueue",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how ThreadPoolExecutor works internally, including corePoolSize, maximumPoolSize, keepAliveTime, work queues, task submission, worker creation, queueing, thread reuse, and production-oriented thread-pool configuration.",
  estimatedTime: "90 min",

  sections: [
    {
      id: "what-is-thread-pool-executor",
      title: "1. What is ThreadPoolExecutor?",
      paragraphs: [
        "ThreadPoolExecutor is a configurable implementation of ExecutorService from the java.util.concurrent package.",
        "Unlike the convenience methods provided by Executors, ThreadPoolExecutor allows you to directly configure important thread-pool properties such as corePoolSize, maximumPoolSize, keepAliveTime, BlockingQueue, ThreadFactory, and RejectedExecutionHandler."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        60,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "why-direct-config",
      title: "2. Why Configure ThreadPoolExecutor Directly?",
      paragraphs: [
        "The Executors factory methods are convenient, but production applications sometimes need more explicit control over concurrency, queueing, thread creation, and rejected tasks.",
        "ThreadPoolExecutor exposes these controls directly."
      ],
      bullets: [
        "Control minimum worker capacity.",
        "Control maximum worker capacity.",
        "Configure idle-thread timeout.",
        "Choose a work queue.",
        "Customize thread creation.",
        "Define rejected-task behavior.",
        "Make concurrency and resource limits explicit."
      ]
    },

    {
      id: "constructor",
      title: "3. ThreadPoolExecutor Constructor",
      paragraphs: [
        "The commonly used constructor accepts corePoolSize, maximumPoolSize, keepAliveTime, TimeUnit, BlockingQueue, ThreadFactory, and RejectedExecutionHandler."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        corePoolSize,
        maximumPoolSize,
        keepAliveTime,
        TimeUnit.SECONDS,
        workQueue,
        threadFactory,
        rejectionHandler
    );`
      }
    },

    {
      id: "core-pool-size",
      title: "4. What is corePoolSize?",
      paragraphs: [
        "corePoolSize represents the target number of core worker threads that the pool maintains under normal operation.",
        "Core workers are generally retained even when temporarily idle, unless core-thread timeout has explicitly been enabled."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        5,
        60,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "core-example",
      title: "5. Understanding corePoolSize with an Example",
      paragraphs: [
        "Suppose corePoolSize is 2. As tasks are submitted, the executor can create workers until it reaches the core size, depending on the current worker count."
      ],
      code: {
        language: "java",
        code: `corePoolSize = 2
maximumPoolSize = 5

Task 1 → Worker 1
Task 2 → Worker 2
Task 3 → Queue`
      }
    },

    {
      id: "maximum-pool-size",
      title: "6. What is maximumPoolSize?",
      paragraphs: [
        "maximumPoolSize defines the upper bound on the number of worker threads that the pool can have.",
        "It is important to understand that reaching maximumPoolSize depends on the behavior of the work queue and task submission."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        5,
        60,
        TimeUnit.SECONDS,
        new SynchronousQueue<>()
    );`
      }
    },

    {
      id: "core-vs-max",
      title: "7. corePoolSize vs maximumPoolSize",
      paragraphs: [
        "corePoolSize controls the normal core worker level, while maximumPoolSize defines the highest number of workers that may exist."
      ],
      bullets: [
        "corePoolSize → normal core worker capacity.",
        "maximumPoolSize → maximum worker capacity.",
        "maximumPoolSize should normally be greater than or equal to corePoolSize.",
        "The queue configuration strongly affects when additional workers are created."
      ]
    },

    {
      id: "keep-alive",
      title: "8. What is keepAliveTime?",
      paragraphs: [
        "keepAliveTime specifies how long excess idle worker threads may remain alive before being terminated.",
        "By default, this primarily applies to workers beyond the core pool size."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        5,
        30,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "keep-alive-example",
      title: "9. Understanding keepAliveTime",
      paragraphs: [
        "Suppose corePoolSize is 2 and maximumPoolSize is 5. If the pool temporarily grows to five workers and three workers become excess and idle, those excess workers can be removed after the configured keep-alive period."
      ],
      code: {
        language: "java",
        code: `Core workers: 2
Maximum workers: 5
Keep alive: 30 seconds

5 workers active
      ↓
Work decreases
      ↓
3 workers become excess and idle
      ↓
After keep-alive period
      ↓
Excess workers may terminate
      ↓
2 core workers remain`
      }
    },

    {
      id: "allow-core-timeout",
      title: "10. Can Core Threads Time Out?",
      paragraphs: [
        "By default, core threads do not time out because of keepAliveTime.",
        "ThreadPoolExecutor can be configured to allow core threads to time out using allowCoreThreadTimeOut(true)."
      ],
      code: {
        language: "java",
        code: `executor.allowCoreThreadTimeOut(true);`
      }
    },

    {
      id: "blocking-queue",
      title: "11. What is BlockingQueue?",
      paragraphs: [
        "BlockingQueue is the work queue used by ThreadPoolExecutor to hold tasks that cannot be executed immediately.",
        "The queue choice has a major effect on thread-pool behavior."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new LinkedBlockingQueue<>();`
      }
    },

    {
      id: "queue-purpose",
      title: "12. Why Does ThreadPoolExecutor Need a Queue?",
      paragraphs: [
        "A thread pool may receive more tasks than its current workers can immediately execute.",
        "The queue temporarily stores tasks until workers become available."
      ],
      code: {
        language: "java",
        code: `Workers busy
     ↓
New task submitted
     ↓
Task enters work queue
     ↓
Worker becomes available
     ↓
Worker takes task
     ↓
Task executes`
      }
    },

    {
      id: "submission-algorithm",
      title: "13. How Does Task Submission Work?",
      paragraphs: [
        "For a typical ThreadPoolExecutor, task submission follows an important sequence.",
        "Understanding this sequence is one of the most important ThreadPoolExecutor interview concepts."
      ],
      bullets: [
        "If worker count is below corePoolSize, the executor attempts to create a new worker.",
        "Otherwise, it attempts to queue the task.",
        "If the task cannot be queued, the executor attempts to create another worker up to maximumPoolSize.",
        "If another worker cannot be created, the task is rejected."
      ]
    },

    {
      id: "submission-flow",
      title: "14. ThreadPoolExecutor Submission Flow",
      code: {
        language: "java",
        code: `New Task
   ↓
Worker count < corePoolSize?
   ↓ Yes
Create core worker
   ↓
Execute task

If No
   ↓
Try work queue
   ↓
Queue accepted?
   ↓ Yes
Wait in queue

If No
   ↓
Worker count < maximumPoolSize?
   ↓ Yes
Create additional worker

If No
   ↓
Reject task`
      }
    },

    {
      id: "queue-core-interaction",
      title: "15. Core Pool + Queue Interaction",
      paragraphs: [
        "The relationship between corePoolSize and the work queue is critical.",
        "With a queue that accepts tasks readily, the executor may queue many tasks before creating workers beyond the core size."
      ],
      code: {
        language: "java",
        code: `corePoolSize = 2
maximumPoolSize = 5

Task 1 → Worker 1
Task 2 → Worker 2
Task 3 → Queue
Task 4 → Queue
Task 5 → Queue`
      }
    },

    {
      id: "unbounded-queue",
      title: "16. Unbounded BlockingQueue",
      paragraphs: [
        "An unbounded queue such as the commonly used LinkedBlockingQueue can accept a very large number of tasks.",
        "With an unbounded queue, the pool generally does not grow beyond corePoolSize because tasks can continue to be queued rather than causing additional workers to be created."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        10,
        60,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "bounded-queue",
      title: "17. Bounded BlockingQueue",
      paragraphs: [
        "A bounded queue has a maximum capacity.",
        "Once the queue becomes full, ThreadPoolExecutor can create additional workers up to maximumPoolSize before rejecting tasks."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        5,
        30,
        TimeUnit.SECONDS,
        queue
    );`
      }
    },

    {
      id: "synchronous-queue",
      title: "18. SynchronousQueue",
      paragraphs: [
        "SynchronousQueue does not behave like a conventional queue with stored capacity.",
        "Each submitted task must be handed directly to a worker thread."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new SynchronousQueue<>();

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        10,
        60,
        TimeUnit.SECONDS,
        queue
    );`
      }
    },

    {
      id: "queue-comparison",
      title: "19. Common Queue Choices",
      paragraphs: [
        "Different BlockingQueue implementations produce different executor behavior."
      ],
      bullets: [
        "LinkedBlockingQueue → commonly used queue with configurable or effectively large capacity depending on construction.",
        "ArrayBlockingQueue → bounded queue with fixed capacity.",
        "SynchronousQueue → direct handoff without storing tasks.",
        "The queue choice affects when the executor creates additional workers."
      ]
    },

    {
      id: "worker-reuse",
      title: "20. Worker Thread Reuse",
      paragraphs: [
        "ThreadPoolExecutor reuses worker threads instead of creating a new thread for every task.",
        "After completing a task, a worker can retrieve another task from the queue."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10)
    );

executor.submit(() ->
    System.out.println(
        "Task 1"
    )
);

executor.submit(() ->
    System.out.println(
        "Task 2"
    );

executor.submit(() ->
    System.out.println(
        "Task 3"
    );`
      }
    },

    {
      id: "correct-worker-code",
      title: "21. Complete Worker Reuse Example",
      paragraphs: [
        "The following example shows several tasks being submitted to a small pool."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10)
    );

for (int i = 1; i <= 5; i++) {

    int taskNumber = i;

    executor.submit(() -> {

        System.out.println(
            "Task " + taskNumber +
            " on " +
            Thread.currentThread().getName()
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "pool-size-methods",
      title: "22. Monitoring Pool Size",
      paragraphs: [
        "ThreadPoolExecutor provides methods that can help observe the current state of the pool."
      ],
      code: {
        language: "java",
        code: `System.out.println(
    executor.getPoolSize()
);

System.out.println(
    executor.getActiveCount()
);

System.out.println(
    executor.getCorePoolSize()
);

System.out.println(
    executor.getMaximumPoolSize()
);`
      },
      bullets: [
        "getPoolSize() → approximate current number of worker threads.",
        "getActiveCount() → approximate number of threads actively executing tasks.",
        "getCorePoolSize() → configured core size.",
        "getMaximumPoolSize() → configured maximum size."
      ]
    },

    {
      id: "queue-monitoring",
      title: "23. Monitoring the Work Queue",
      paragraphs: [
        "ThreadPoolExecutor also provides access to its work queue, which can help with monitoring and diagnostics."
      ],
      code: {
        language: "java",
        code: `System.out.println(
    executor.getQueue().size()
);

System.out.println(
    executor.getQueue().remainingCapacity()
);`
      }
    },

    {
      id: "active-count",
      title: "24. Understanding Active Count",
      paragraphs: [
        "getActiveCount() provides an approximate count of workers that are actively executing tasks.",
        "It is useful for monitoring but should not be treated as a perfectly synchronized snapshot."
      ],
      code: {
        language: "java",
        code: `int active =
    executor.getActiveCount();

System.out.println(
    "Active workers: " + active
);`
      }
    },

    {
      id: "thread-pool-example",
      title: "25. Complete Configured ThreadPoolExecutor",
      paragraphs: [
        "Here is a complete example using a bounded queue and explicit pool configuration."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(10);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        queue
    );

for (int i = 1; i <= 8; i++) {

    int taskNumber = i;

    executor.submit(() -> {

        System.out.println(
            "Processing task " + taskNumber
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "rejection-intro",
      title: "26. What Happens When the Pool Is Full?",
      paragraphs: [
        "If the pool cannot create another worker because maximumPoolSize has been reached and the work queue cannot accept the task, the task must be handled by the configured RejectedExecutionHandler."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(2),
        new ThreadPoolExecutor.AbortPolicy()
    );`
      }
    },

    {
      id: "resource-control",
      title: "27. Why Queue and Pool Size Matter",
      paragraphs: [
        "A thread pool is not only about creating threads. It is also a resource-control mechanism.",
        "Too many worker threads can increase CPU scheduling, memory usage, contention, and downstream pressure. An excessively large queue can increase waiting time and memory usage."
      ],
      bullets: [
        "Threads consume resources.",
        "Queues consume memory.",
        "Large queues can increase latency.",
        "Too many workers can increase contention.",
        "Database pools may become bottlenecks.",
        "External services may have rate or concurrency limits."
      ]
    },

    {
      id: "backend-example",
      title: "28. Real-World Backend Example",
      paragraphs: [
        "Suppose a backend service processes background jobs. We can configure a small core pool, a larger maximum pool, and a bounded queue to control concurrency and queue growth."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        5,
        10,
        60,
        TimeUnit.SECONDS,
        queue
    );

executor.submit(() -> {
    processOrder();
});`
      }
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      bullets: [
        "Understand the workload before selecting pool parameters.",
        "Use bounded queues when you need explicit queue limits.",
        "Choose corePoolSize based on expected concurrency and workload characteristics.",
        "Choose maximumPoolSize based on resource and downstream capacity.",
        "Use keepAliveTime to remove excess idle workers when appropriate.",
        "Monitor active workers, queue size, task latency, and rejection counts.",
        "Configure a deliberate RejectedExecutionHandler.",
        "Always define a shutdown strategy.",
        "Do not assume a larger pool always improves performance."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is ThreadPoolExecutor?",
          answer:
            "ThreadPoolExecutor is a configurable implementation of ExecutorService that manages worker threads, task queues, thread creation, and rejected tasks."
        },
        {
          question: "What is corePoolSize?",
          answer:
            "corePoolSize represents the normal core worker capacity maintained by the executor."
        },
        {
          question: "What is maximumPoolSize?",
          answer:
            "maximumPoolSize defines the maximum number of worker threads that the executor can have."
        },
        {
          question: "What is keepAliveTime?",
          answer:
            "keepAliveTime specifies how long excess idle worker threads may remain alive before being terminated."
        },
        {
          question: "What is BlockingQueue in ThreadPoolExecutor?",
          answer:
            "BlockingQueue is the work queue used to hold tasks that cannot be executed immediately."
        },
        {
          question: "What happens when a task is submitted?",
          answer:
            "Typically, the executor first creates a worker if the worker count is below corePoolSize. Otherwise it attempts to queue the task. If the queue cannot accept it, the executor can create workers up to maximumPoolSize. If that is also impossible, the task is rejected."
        },
        {
          question: "Why is queue choice important?",
          answer:
            "The queue affects when tasks wait, when additional workers are created, how much work can accumulate, and when rejection occurs."
        },
        {
          question: "What is the difference between bounded and unbounded queues?",
          answer:
            "A bounded queue has a finite capacity, while an unbounded queue can continue accepting tasks subject to available resources. Their behavior strongly affects thread-pool growth and rejection."
        },
        {
          question: "What is SynchronousQueue?",
          answer:
            "SynchronousQueue provides direct handoff semantics: a task is transferred directly to a worker rather than being stored in a conventional queue."
        },
        {
          question: "Why should maximumPoolSize not simply be made very large?",
          answer:
            "Too many worker threads can increase memory use, context switching, contention, and pressure on downstream resources such as databases and external services."
        }
      ]
    }
  ]
};