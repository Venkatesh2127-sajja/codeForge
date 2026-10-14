export const threadFactory = {
  id: "thread-factory",
  slug: "thread-factory",
  title: "ThreadFactory — Custom Thread Creation and Naming",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how ThreadFactory controls the creation of worker threads, including custom thread names, daemon threads, priorities, and using ThreadFactory with ThreadPoolExecutor.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-thread-factory",
      title: "1. What is ThreadFactory?",
      paragraphs: [
        "ThreadFactory is an interface from java.util.concurrent used to create new threads.",
        "It allows applications to customize how threads are created instead of relying completely on the default thread creation behavior."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {
    return new Thread(task);
};`
      }
    },

    {
      id: "why-thread-factory",
      title: "2. Why Use ThreadFactory?",
      paragraphs: [
        "ThreadFactory is useful when you want consistent configuration for threads created by an executor."
      ],
      bullets: [
        "Give threads meaningful names.",
        "Configure daemon status.",
        "Configure thread priority.",
        "Attach an UncaughtExceptionHandler.",
        "Apply common thread configuration.",
        "Make thread-pool debugging easier."
      ]
    },

    {
      id: "interface-method",
      title: "3. ThreadFactory Method",
      paragraphs: [
        "ThreadFactory has one main method: newThread(Runnable r)."
      ],
      code: {
        language: "java",
        code: `public interface ThreadFactory {

    Thread newThread(Runnable r);
}`
      }
    },

    {
      id: "basic-factory",
      title: "4. Creating a Basic ThreadFactory",
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread = new Thread(task);

    return thread;
};

Thread thread =
    factory.newThread(() -> {
        System.out.println(
            "Task running"
        );
    });

thread.start();`
      }
    },

    {
      id: "custom-name",
      title: "5. Giving Threads Custom Names",
      paragraphs: [
        "Meaningful thread names are very useful when debugging multithreaded applications and reading thread dumps."
      ],
      code: {
        language: "java",
        code: `AtomicInteger counter =
    new AtomicInteger(1);

ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "order-worker-" +
        counter.getAndIncrement()
    );

    return thread;
};`
      }
    },

    {
      id: "factory-executor",
      title: "6. ThreadFactory with ExecutorService",
      code: {
        language: "java",
        code: `AtomicInteger counter =
    new AtomicInteger(1);

ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "worker-" +
        counter.getAndIncrement()
    );

    return thread;
};

ExecutorService executor =
    Executors.newFixedThreadPool(
        2,
        factory
    );

executor.submit(() ->
    System.out.println(
        Thread.currentThread().getName()
    )
);

executor.submit(() ->
    System.out.println(
        Thread.currentThread().getName()
    )
);

executor.shutdown();`
      },
      output:
        "worker-1\nworker-2"
    },

    {
      id: "threadpool-executor",
      title: "7. ThreadFactory with ThreadPoolExecutor",
      paragraphs: [
        "ThreadFactory can also be passed directly to ThreadPoolExecutor."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "api-worker"
    );

    return thread;
};

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10),
        factory
    );`
      }
    },

    {
      id: "daemon",
      title: "8. Creating Daemon Threads",
      paragraphs: [
        "A ThreadFactory can configure worker threads as daemon threads when that behavior is appropriate."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setDaemon(true);

    return thread;
};`
      }
    },

    {
      id: "daemon-warning",
      title: "9. Important Daemon Thread Point",
      paragraphs: [
        "Daemon threads do not prevent the JVM from shutting down after all non-daemon threads have finished.",
        "Therefore, daemon threads should not be used for work that must always complete before JVM shutdown."
      ],
      bullets: [
        "Background monitoring can be a possible use case.",
        "Critical database writes should not depend on daemon shutdown behavior.",
        "Important business operations should have an explicit lifecycle."
      ]
    },

    {
      id: "priority",
      title: "10. Configuring Thread Priority",
      paragraphs: [
        "A ThreadFactory can configure the priority of created threads.",
        "Thread priority is only a scheduling hint and should not be used to guarantee execution order."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setPriority(
        Thread.NORM_PRIORITY
    );

    return thread;
};`
      }
    },

    {
      id: "exception-handler",
      title: "11. UncaughtExceptionHandler",
      paragraphs: [
        "ThreadFactory can configure an UncaughtExceptionHandler for threads it creates.",
        "This is useful for handling uncaught exceptions from tasks that execute directly through a Thread."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setUncaughtExceptionHandler(
        (t, e) -> {
            System.out.println(
                "Thread " +
                t.getName() +
                " failed: " +
                e.getMessage()
            );
        }
    );

    return thread;
};`
      }
    },

    {
      id: "important-submit-note",
      title: "12. Important Exception Note with submit()",
      paragraphs: [
        "When a task is submitted to ExecutorService using submit(), task exceptions are normally captured by the returned Future and are reported through Future.get() as ExecutionException.",
        "Therefore, an UncaughtExceptionHandler is not a replacement for handling Future results when using submit()."
      ],
      code: {
        language: "java",
        code: `Future<?> future =
    executor.submit(() -> {
        throw new RuntimeException(
            "Task failed"
        );
    });

try {

    future.get();

} catch (ExecutionException e) {

    System.out.println(
        e.getCause().getMessage()
    );
}`
      }
    },

    {
      id: "reusable-factory",
      title: "13. Reusable ThreadFactory",
      paragraphs: [
        "A custom ThreadFactory can centralize thread configuration so that every worker created by the executor follows the same rules."
      ],
      code: {
        language: "java",
        code: `class CustomThreadFactory
        implements ThreadFactory {

    private final AtomicInteger counter =
        new AtomicInteger(1);

    @Override
    public Thread newThread(Runnable task) {

        Thread thread =
            new Thread(task);

        thread.setName(
            "payment-worker-" +
            counter.getAndIncrement()
        );

        return thread;
    }
}`
      }
    },

    {
      id: "use-factory",
      title: "14. Using a Custom ThreadFactory",
      code: {
        language: "java",
        code: `ThreadFactory factory =
    new CustomThreadFactory();

ExecutorService executor =
    Executors.newFixedThreadPool(
        3,
        factory
    );

executor.submit(() ->
    System.out.println(
        Thread.currentThread().getName()
    )
);

executor.shutdown();`
      }
    },

    {
      id: "backend-example",
      title: "15. Real-World Backend Example",
      paragraphs: [
        "In a backend application, different executors may handle different workloads. Meaningful thread names make logs and thread dumps much easier to understand."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "email-worker-" +
        System.nanoTime()
    );

    return thread;
};

ExecutorService executor =
    Executors.newFixedThreadPool(
        5,
        factory
    );

executor.submit(() -> {
    sendEmail();
});

executor.shutdown();`
      }
    },

    {
      id: "thread-factory-vs-thread",
      title: "16. ThreadFactory vs Thread",
      bullets: [
        "Thread → represents an individual thread.",
        "ThreadFactory → creates threads.",
        "ThreadFactory → centralizes thread configuration.",
        "ThreadFactory → useful with executors and thread pools."
      ]
    },

    {
      id: "factory-with-scheduled",
      title: "17. ThreadFactory with ScheduledExecutorService",
      paragraphs: [
        "ScheduledExecutorService also supports a custom ThreadFactory."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "scheduler-worker"
    );

    return thread;
};

ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(
        2,
        factory
    );

scheduler.scheduleAtFixedRate(
    () -> System.out.println(
        Thread.currentThread().getName()
    ),
    0,
    10,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "factory-configuration",
      title: "18. What Can ThreadFactory Configure?",
      bullets: [
        "Thread name.",
        "Daemon status.",
        "Priority.",
        "UncaughtExceptionHandler.",
        "Thread group in appropriate advanced use cases.",
        "Other Thread properties available through the Thread API."
      ]
    },

    {
      id: "thread-names",
      title: "19. Why Thread Names Matter",
      paragraphs: [
        "Thread names are especially useful when investigating production issues involving concurrency.",
        "A name such as api-worker-3 provides much more context than a generic pool thread name."
      ],
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "inventory-worker"
    );

    return thread;
};`
      }
    },

    {
      id: "common-mistakes",
      title: "20. Common Mistakes",
      bullets: [
        "Creating a new ThreadFactory for every task.",
        "Using meaningless thread names.",
        "Making critical workers daemon threads without understanding JVM shutdown.",
        "Assuming thread priority guarantees execution order.",
        "Using UncaughtExceptionHandler instead of checking Future.get() for submit().",
        "Creating custom threads without considering executor lifecycle."
      ]
    },

    {
      id: "best-practices",
      title: "21. Best Practices",
      bullets: [
        "Use meaningful thread names.",
        "Reuse a ThreadFactory with the executor it configures.",
        "Use AtomicInteger when generating thread sequence numbers.",
        "Use daemon threads only when their lifecycle is appropriate.",
        "Use UncaughtExceptionHandler for uncaught thread failures where appropriate.",
        "Always shut down executors when their lifecycle ends."
      ]
    },

    {
      id: "key-concept",
      title: "22. Most Important Concept",
      paragraphs: [
        "ThreadFactory separates thread creation from task execution.",
        "The executor decides when a thread is needed, while the ThreadFactory decides how that thread is created and configured."
      ],
      code: {
        language: "java",
        code: `ExecutorService
       ↓
Needs a worker
       ↓
ThreadFactory.newThread()
       ↓
Configured Thread
       ↓
Executes Runnable`
      }
    },

    {
      id: "interview-code",
      title: "23. Interview-Ready Example",
      code: {
        language: "java",
        code: `ThreadFactory factory = task -> {

    Thread thread =
        new Thread(task);

    thread.setName(
        "app-worker-" +
        System.nanoTime()
    );

    return thread;
};

ExecutorService executor =
    Executors.newFixedThreadPool(
        3,
        factory
    );

executor.submit(() ->
    System.out.println(
        Thread.currentThread().getName()
    )
);

executor.shutdown();`
      }
    },

    {
      id: "when-use",
      title: "24. When Should You Use ThreadFactory?",
      paragraphs: [
        "Use ThreadFactory when you need consistent customization of threads created by an ExecutorService or ThreadPoolExecutor."
      ],
      bullets: [
        "Custom thread names.",
        "Daemon configuration.",
        "Thread priority configuration.",
        "Uncaught exception handling.",
        "Application-specific worker identification."
      ]
    },

    {
      id: "important-interview",
      title: "25. Interview Focus",
      paragraphs: [
        "For interviews, focus mainly on why ThreadFactory exists and how it integrates with ExecutorService."
      ],
      bullets: [
        "ThreadFactory creates threads.",
        "newThread(Runnable) is its main method.",
        "Executors can accept a custom ThreadFactory.",
        "ThreadPoolExecutor can accept a ThreadFactory.",
        "Custom names make debugging easier."
      ]
    },

    {
      id: "summary",
      title: "26. Summary",
      paragraphs: [
        "ThreadFactory provides a standard way to customize thread creation.",
        "It is especially useful when applications use thread pools and need consistent worker configuration."
      ]
    },

    {
      id: "quick-revision",
      title: "27. Quick Revision",
      bullets: [
        "ThreadFactory → creates threads.",
        "newThread() → creates a configured Thread.",
        "ExecutorService → uses ThreadFactory when it needs workers.",
        "Custom names → improve debugging.",
        "Daemon → affects JVM shutdown behavior.",
        "Priority → scheduling hint.",
        "UncaughtExceptionHandler → handles uncaught thread exceptions."
      ]
    },

    {
      id: "important-question",
      title: "28. Important Interview Questions",
      interviewQuestions: [
        {
          question: "What is ThreadFactory?",
          answer:
            "ThreadFactory is an interface used to create and configure threads for executors and other concurrent components."
        },
        {
          question: "What method does ThreadFactory provide?",
          answer:
            "Its main method is newThread(Runnable r), which creates a new Thread."
        },
        {
          question: "Why use a custom ThreadFactory?",
          answer:
            "It allows consistent configuration such as meaningful thread names, daemon status, priority, and uncaught exception handling."
        },
        {
          question: "How do you use ThreadFactory with ExecutorService?",
          answer:
            "Pass the ThreadFactory to an executor factory such as Executors.newFixedThreadPool(poolSize, threadFactory)."
        },
        {
          question: "Why are custom thread names useful?",
          answer:
            "They make application logs, debugging, monitoring, and thread-dump analysis easier."
        },
        {
          question: "Can ThreadFactory create daemon threads?",
          answer:
            "Yes. The ThreadFactory can call setDaemon(true) before returning the thread."
        },
        {
          question: "Does ThreadFactory execute tasks?",
          answer:
            "No. ThreadFactory creates threads. The executor manages task execution."
        },
        {
          question: "What happens to exceptions from submit()?",
          answer:
            "Exceptions from tasks submitted using submit() are normally captured by Future and reported through ExecutionException when get() is called."
        }
      ]
    },

    {
      id: "interview-version",
      title: "29. Short Interview Answer",
      paragraphs: [
        "ThreadFactory is an interface used by ExecutorService and ThreadPoolExecutor to create worker threads in a controlled way. It is commonly used to give threads meaningful names and configure properties such as daemon status and uncaught exception handling."
      ]
    },

    {
      id: "final-note",
      title: "30. Final Note",
      paragraphs: [
        "Remember: ExecutorService manages tasks and worker threads, while ThreadFactory controls how those worker threads are created."
      ]
    }
  ]
};