export const executorTypes = {
  id: "executor-types",
  slug: "executor-types",
  title: "ExecutorService — FixedThreadPool, SingleThreadExecutor, and CachedThreadPool",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn the major ExecutorService thread-pool types in Java, including FixedThreadPool, SingleThreadExecutor, and CachedThreadPool, how they create and reuse worker threads, their behavior, use cases, limitations, and interview questions.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "executor-pool",
      title: "1. What is a Thread Pool?",
      paragraphs: [
        "A thread pool is a group of worker threads managed by an executor.",
        "Instead of creating a new Thread for every task, an application can submit tasks to a thread pool. Worker threads execute those tasks and can be reused for later tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.submit(() ->
    System.out.println("Task 1")
);

executor.submit(() ->
    System.out.println("Task 2")
);

executor.shutdown();`
      }
    },

    {
      id: "why-pools",
      title: "2. Why Use Thread Pools?",
      paragraphs: [
        "Creating a new thread for every task can create unnecessary overhead.",
        "Thread pools allow an application to reuse worker threads and control how many tasks can execute concurrently."
      ],
      bullets: [
        "Reuse worker threads.",
        "Reduce repeated thread-creation overhead.",
        "Control concurrency.",
        "Manage submitted tasks.",
        "Improve resource management.",
        "Provide a common mechanism for executing asynchronous tasks."
      ]
    },

    {
      id: "executors-class",
      title: "3. Executors Utility Class",
      paragraphs: [
        "The Executors utility class provides factory methods for creating commonly used ExecutorService implementations.",
        "Three classic factory methods are newFixedThreadPool(), newSingleThreadExecutor(), and newCachedThreadPool()."
      ],
      code: {
        language: "java",
        code: `ExecutorService fixed =
    Executors.newFixedThreadPool(4);

ExecutorService single =
    Executors.newSingleThreadExecutor();

ExecutorService cached =
    Executors.newCachedThreadPool();`
      }
    },

    {
      id: "fixed-intro",
      title: "4. What is FixedThreadPool?",
      paragraphs: [
        "newFixedThreadPool(n) creates an ExecutorService with a fixed number of worker threads.",
        "The pool maintains up to the specified number of worker threads for executing submitted tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.submit(() ->
    System.out.println("Task 1")
);

executor.submit(() ->
    System.out.println("Task 2")
);

executor.submit(() ->
    System.out.println("Task 3")
);

executor.shutdown();`
      }
    },

    {
      id: "fixed-number",
      title: "5. Fixed Number of Threads",
      paragraphs: [
        "If a fixed pool has three worker threads and ten tasks are submitted, at most three tasks can execute concurrently through that pool at a time.",
        "The remaining tasks wait until workers become available."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

for (int i = 1; i <= 10; i++) {

    int taskNumber = i;

    executor.submit(() -> {
        System.out.println(
            "Task " + taskNumber
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "fixed-reuse",
      title: "6. FixedThreadPool Reuses Threads",
      paragraphs: [
        "When a worker finishes one task, it can take another task from the executor's work queue.",
        "This allows the same worker threads to execute many submitted tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

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
      id: "fixed-queue",
      title: "7. What Happens When All Fixed Threads Are Busy?",
      paragraphs: [
        "When all worker threads are busy, additional submitted tasks wait in the executor's work queue until a worker becomes available."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    Thread.sleep(3000);
    return null;
});

executor.submit(() -> {
    Thread.sleep(3000);
    return null;
});

executor.submit(() ->
    System.out.println(
        "Waiting task"
    )
);

executor.shutdown();`
      }
    },

    {
      id: "fixed-use",
      title: "8. When is FixedThreadPool Useful?",
      paragraphs: [
        "A fixed pool can be useful when an application wants to limit the number of tasks executing concurrently.",
        "It is commonly considered for workloads where controlled concurrency is important."
      ],
      bullets: [
        "Controlled background processing.",
        "CPU-bound tasks with an appropriate pool size.",
        "Processing independent jobs.",
        "Applications where concurrency should be bounded."
      ]
    },

    {
      id: "single-intro",
      title: "9. What is SingleThreadExecutor?",
      paragraphs: [
        "newSingleThreadExecutor() creates an ExecutorService that uses a single worker thread to execute submitted tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() ->
    System.out.println("Task 1")
);

executor.submit(() ->
    System.out.println("Task 2")
);

executor.submit(() ->
    System.out.println("Task 3")
);

executor.shutdown();`
      }
    },

    {
      id: "single-one",
      title: "10. Only One Task Executes at a Time",
      paragraphs: [
        "Because the executor has one worker thread, submitted tasks do not execute concurrently with each other through that executor."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

for (int i = 1; i <= 3; i++) {

    int taskNumber = i;

    executor.submit(() -> {

        System.out.println(
            "Starting " + taskNumber
        );

        Thread.sleep(1000);

        System.out.println(
            "Finished " + taskNumber
        );
    });
}

executor.shutdown();`
      },
      output:
        "Starting 1\nFinished 1\nStarting 2\nFinished 2\nStarting 3\nFinished 3"
    },

    {
      id: "single-order",
      title: "11. Task Ordering in SingleThreadExecutor",
      paragraphs: [
        "Tasks submitted to a single-thread executor are executed sequentially by its single worker. In normal usage, tasks are taken from its work queue in submission order."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() ->
    System.out.println("First")
);

executor.submit(() ->
    System.out.println("Second")
);

executor.submit(() ->
    System.out.println("Third")
);

executor.shutdown();`
      },
      output: "First\nSecond\nThird"
    },

    {
      id: "single-failure",
      title: "12. What If the Worker Thread Encounters an Exception?",
      paragraphs: [
        "A key property of newSingleThreadExecutor() is that if its worker terminates because of an uncaught exception, the executor can replace that worker so that subsequent tasks can still execute.",
        "Exceptions thrown by tasks submitted with submit() are captured by their Future, so they do not normally escape as uncaught exceptions on the worker thread."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() -> {
    throw new RuntimeException("Task failed");
});

executor.submit(() ->
    System.out.println(
        "Next task can execute"
    )
);

executor.shutdown();`
      }
    },

    {
      id: "single-use",
      title: "13. When is SingleThreadExecutor Useful?",
      paragraphs: [
        "A single-thread executor is useful when tasks should be processed sequentially and the application wants executor-based task management."
      ],
      bullets: [
        "Sequential background processing.",
        "Ordered task processing.",
        "Single-writer style workloads.",
        "Background logging or event processing.",
        "Tasks that should not execute concurrently through that executor."
      ]
    },

    {
      id: "cached-intro",
      title: "14. What is CachedThreadPool?",
      paragraphs: [
        "newCachedThreadPool() creates an ExecutorService that can create new worker threads as needed and reuse previously created threads when they become available.",
        "It is designed for workloads with many short-lived asynchronous tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newCachedThreadPool();

executor.submit(() ->
    System.out.println("Task 1")
);

executor.submit(() ->
    System.out.println("Task 2")
);

executor.shutdown();`
      }
    },

    {
      id: "cached-reuse",
      title: "15. CachedThreadPool Reuses Idle Threads",
      paragraphs: [
        "A cached thread pool attempts to reuse previously created threads when possible.",
        "If no suitable idle worker is available, it can create another worker to handle submitted work."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newCachedThreadPool();

for (int i = 1; i <= 5; i++) {

    int taskNumber = i;

    executor.submit(() -> {

        System.out.println(
            "Task " + taskNumber +
            " running on " +
            Thread.currentThread().getName()
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "cached-growth",
      title: "16. CachedThreadPool Can Grow",
      paragraphs: [
        "Unlike a fixed-size pool, a cached thread pool does not use a fixed maximum worker count in the same way.",
        "It can create additional threads when demand requires them, subject to the executor's implementation and runtime resources."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newCachedThreadPool();

for (int i = 1; i <= 20; i++) {

    executor.submit(() -> {

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
}

executor.shutdown();`
      }
    },

    {
      id: "cached-idle",
      title: "17. Idle Threads in CachedThreadPool",
      paragraphs: [
        "CachedThreadPool uses a SynchronousQueue internally, so tasks are handed directly to worker threads rather than being stored in a conventional task queue.",
        "Idle workers can remain available for a limited time and are removed when they remain unused."
      ]
    },

    {
      id: "cached-use",
      title: "18. When is CachedThreadPool Useful?",
      paragraphs: [
        "A cached pool can be useful for workloads involving many short-lived asynchronous tasks where demand can vary significantly."
      ],
      bullets: [
        "Short-lived tasks.",
        "Bursty workloads.",
        "Variable task arrival rates.",
        "Tasks that can execute concurrently.",
        "Workloads where thread creation and reuse are appropriate."
      ]
    },

    {
      id: "cached-warning",
      title: "19. CachedThreadPool and Resource Risk",
      paragraphs: [
        "Because a cached thread pool can create many threads when demand increases, it should not automatically be treated as the best choice for every workload.",
        "A sudden large number of submitted tasks can result in many active threads and significant resource usage."
      ],
      bullets: [
        "Large bursts can create many worker threads.",
        "Threads consume memory and scheduling resources.",
        "Downstream systems may become overloaded.",
        "Use bounded concurrency when the workload requires strict limits."
      ]
    },

    {
      id: "fixed-vs-single",
      title: "20. FixedThreadPool vs SingleThreadExecutor",
      paragraphs: [
        "Both provide controlled execution, but their concurrency level is different."
      ],
      bullets: [
        "FixedThreadPool(n) → multiple worker threads.",
        "SingleThreadExecutor → one worker thread.",
        "FixedThreadPool → multiple tasks can execute concurrently.",
        "SingleThreadExecutor → tasks execute sequentially through one worker."
      ],
      code: {
        language: "java",
        code: `ExecutorService fixed =
    Executors.newFixedThreadPool(4);

ExecutorService single =
    Executors.newSingleThreadExecutor();`
      }
    },

    {
      id: "fixed-vs-cached",
      title: "21. FixedThreadPool vs CachedThreadPool",
      paragraphs: [
        "The main difference is how worker concurrency is controlled."
      ],
      bullets: [
        "FixedThreadPool → fixed number of worker threads.",
        "CachedThreadPool → creates workers as needed and reuses idle workers.",
        "FixedThreadPool → provides a clearer concurrency bound.",
        "CachedThreadPool → can expand significantly under load."
      ]
    },

    {
      id: "single-vs-cached",
      title: "22. SingleThreadExecutor vs CachedThreadPool",
      paragraphs: [
        "These executors have very different concurrency characteristics."
      ],
      bullets: [
        "SingleThreadExecutor → one worker.",
        "CachedThreadPool → dynamically creates workers as needed.",
        "SingleThreadExecutor → sequential processing.",
        "CachedThreadPool → concurrent processing."
      ]
    },

    {
      id: "comparison",
      title: "23. Comparing the Three Executors",
      paragraphs: [
        "The following comparison summarizes their main characteristics."
      ],
      bullets: [
        "FixedThreadPool → fixed worker count.",
        "SingleThreadExecutor → exactly one worker for sequential execution.",
        "CachedThreadPool → dynamically creates and reuses workers.",
        "FixedThreadPool → useful when concurrency should be bounded.",
        "SingleThreadExecutor → useful when tasks must execute sequentially.",
        "CachedThreadPool → useful for suitable short-lived, bursty asynchronous workloads."
      ]
    },

    {
      id: "cpu-io",
      title: "24. CPU-Bound vs I/O-Bound Tasks",
      paragraphs: [
        "Thread-pool choice should consider the workload. CPU-bound tasks generally need controlled concurrency close to available CPU capacity, while I/O-bound tasks can spend significant time waiting.",
        "There is no universal pool size that is correct for every application."
      ],
      code: {
        language: "java",
        code: `int processors =
    Runtime.getRuntime()
           .availableProcessors();

ExecutorService executor =
    Executors.newFixedThreadPool(
        processors
    );`
      }
    },

    {
      id: "backend-example",
      title: "25. Backend Example",
      paragraphs: [
        "Imagine a backend application processing customer jobs.",
        "A fixed pool can be used when the application wants a controlled number of concurrent workers."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(5);

for (int i = 1; i <= 20; i++) {

    int jobId = i;

    executor.submit(() -> {

        System.out.println(
            "Processing job " + jobId
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "single-backend",
      title: "26. SingleThreadExecutor Backend Example",
      paragraphs: [
        "A single-thread executor can be useful when a sequence of background operations must be processed one at a time through the same executor."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() ->
    System.out.println(
        "Write event 1"
    )
);

executor.submit(() ->
    System.out.println(
        "Write event 2"
    )
);

executor.submit(() ->
    System.out.println(
        "Write event 3"
    )
);

executor.shutdown();`
      }
    },

    {
      id: "selection",
      title: "27. How Do You Choose?",
      paragraphs: [
        "Choose the executor based on the workload, concurrency requirements, task duration, resource limits, and downstream capacity.",
        "The executor should be selected deliberately rather than simply choosing the most convenient factory method."
      ],
      bullets: [
        "Need a fixed concurrency limit → consider FixedThreadPool.",
        "Need sequential execution → consider SingleThreadExecutor.",
        "Need dynamic workers for suitable short-lived tasks → consider CachedThreadPool.",
        "Need strict production resource control → consider a deliberately configured ThreadPoolExecutor."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "Thread-pool mistakes can cause resource exhaustion, poor throughput, or unexpected task behavior."
      ],
      bullets: [
        "Using CachedThreadPool without considering workload bursts.",
        "Creating an unnecessarily large fixed pool.",
        "Assuming more threads always means better performance.",
        "Forgetting to shut down the executor.",
        "Ignoring database or downstream service limits.",
        "Using a single-thread executor for work that requires concurrency.",
        "Using a fixed pool that is too small for a latency-sensitive workload.",
        "Choosing a pool without measuring the actual workload."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      bullets: [
        "Understand whether tasks are CPU-bound or I/O-bound.",
        "Bound concurrency when resource protection is important.",
        "Do not create unnecessarily large thread pools.",
        "Consider downstream database and network capacity.",
        "Reuse executor instances instead of creating one per task.",
        "Always define a clear executor shutdown strategy.",
        "Measure throughput, latency, queueing, and resource usage.",
        "For advanced production configuration, learn ThreadPoolExecutor directly."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is FixedThreadPool?",
          answer:
            "FixedThreadPool is an ExecutorService with a fixed number of worker threads. Additional tasks wait until a worker becomes available."
        },
        {
          question: "What is SingleThreadExecutor?",
          answer:
            "SingleThreadExecutor uses one worker thread and processes submitted tasks sequentially through that executor."
        },
        {
          question: "What is CachedThreadPool?",
          answer:
            "CachedThreadPool creates worker threads as needed and reuses previously created idle workers when possible. It is designed for suitable short-lived asynchronous workloads."
        },
        {
          question: "What happens when more tasks are submitted than FixedThreadPool has workers?",
          answer:
            "Tasks that cannot immediately execute wait in the executor's work queue until workers become available."
        },
        {
          question: "Does SingleThreadExecutor execute tasks concurrently?",
          answer:
            "No. It has one worker, so tasks execute sequentially through that executor."
        },
        {
          question: "Can CachedThreadPool create many threads?",
          answer:
            "Yes. It can create additional worker threads when demand requires them, so workloads with large bursts can consume significant resources."
        },
        {
          question: "When would you use FixedThreadPool?",
          answer:
            "It can be used when the application needs a controlled number of concurrent worker threads."
        },
        {
          question: "When would you use SingleThreadExecutor?",
          answer:
            "It can be used when tasks should be processed sequentially through a single worker."
        },
        {
          question: "When would you use CachedThreadPool?",
          answer:
            "It can be considered for suitable short-lived, bursty asynchronous tasks where dynamically creating and reusing workers is appropriate."
        },
        {
          question: "Which executor gives a fixed concurrency level?",
          answer:
            "FixedThreadPool provides a fixed number of worker threads. SingleThreadExecutor is the special one-worker case."
        }
      ]
    }
  ]
};