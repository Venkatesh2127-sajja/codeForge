export const executorFramework = {
  id: "executor-framework",
  slug: "executor-framework",
  title: "Executor Framework — Why ExecutorService?",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn why Java provides the Executor Framework, understand Executor and ExecutorService, submit tasks without manually creating threads, manage thread pools, and properly shut down executors.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-executor-framework",
      title: "1. What is the Executor Framework?",
      paragraphs: [
        "The Executor Framework is a set of classes and interfaces in java.util.concurrent used to manage and execute tasks.",
        "Instead of manually creating and managing a Thread for every task, we can submit tasks to an executor.",
        "The executor manages how those tasks are executed using worker threads."
      ]
    },

    {
      id: "why-executor",
      title: "2. Why Do We Need Executor Framework?",
      paragraphs: [
        "Creating threads manually works for simple examples, but it becomes difficult to manage when an application has many tasks.",
        "An executor provides a controlled way to submit and execute tasks."
      ],
      bullets: [
        "Reduces manual thread management.",
        "Allows thread reuse.",
        "Controls the number of worker threads.",
        "Provides task queues.",
        "Supports graceful shutdown.",
        "Works with Runnable and Callable.",
        "Provides Future for asynchronous results."
      ]
    },

    {
      id: "manual-thread-problem",
      title: "3. Problem with Creating Threads Manually",
      paragraphs: [
        "Suppose an application receives many independent tasks.",
        "Creating one new Thread for every task can result in a large number of threads.",
        "Too many threads can increase memory usage and scheduling overhead."
      ],
      code: {
        language: "java",
        code: `for (int i = 1; i <= 1000; i++) {

    Thread thread = new Thread(() -> {
        System.out.println("Processing task");
    });

    thread.start();
}`
      }
    },

    {
      id: "executor-solution",
      title: "4. Executor Framework Solution",
      paragraphs: [
        "Instead of creating hundreds or thousands of threads directly, an executor can maintain a controlled number of worker threads and execute submitted tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(10);

for (int i = 1; i <= 1000; i++) {

    executor.submit(() -> {
        System.out.println("Processing task");
    });
}

executor.shutdown();`
      }
    },

    {
      id: "executor-interface",
      title: "5. What is Executor?",
      paragraphs: [
        "Executor is the simplest interface in the Executor Framework.",
        "It provides a method named execute() for submitting a Runnable task."
      ],
      code: {
        language: "java",
        code: `public interface Executor {

    void execute(Runnable command);
}`
      }
    },

    {
      id: "executor-execute",
      title: "6. Using Executor.execute()",
      paragraphs: [
        "The execute() method accepts a Runnable task.",
        "The executor decides how and when the task will be executed."
      ],
      code: {
        language: "java",
        code: `Executor executor =
    command -> {
        new Thread(command).start();
    };

executor.execute(() -> {
    System.out.println("Task running");
});`
      }
    },

    {
      id: "executorservice",
      title: "7. What is ExecutorService?",
      paragraphs: [
        "ExecutorService extends Executor and provides additional features for managing asynchronous tasks and the executor lifecycle.",
        "It supports task submission, Future results, shutdown operations, and batch task execution."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);`
      }
    },

    {
      id: "executor-hierarchy",
      title: "8. Executor Framework Hierarchy",
      paragraphs: [
        "The main interfaces can be understood as a progression from basic task execution to more complete executor lifecycle management."
      ],
      bullets: [
        "Executor → execute Runnable tasks.",
        "ExecutorService → task submission, Future, and lifecycle management.",
        "ScheduledExecutorService → delayed and periodic task execution.",
        "ThreadPoolExecutor → configurable thread-pool implementation."
      ]
    },

    {
      id: "create-executor",
      title: "9. Creating ExecutorService",
      paragraphs: [
        "The Executors utility class provides convenient factory methods for creating common executor configurations."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

ExecutorService executor =
    Executors.newFixedThreadPool(3);`
      }
    },

    {
      id: "submit-runnable",
      title: "10. Submitting Runnable Tasks",
      paragraphs: [
        "ExecutorService can execute Runnable tasks using execute() or submit().",
        "submit() returns a Future, while execute() does not return a Future."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

Runnable task = () -> {
    System.out.println(
        "Running: " +
        Thread.currentThread().getName()
    );
};

executor.submit(task);

executor.shutdown();`
      }
    },

    {
      id: "submit-callable",
      title: "11. Submitting Callable Tasks",
      paragraphs: [
        "ExecutorService can also execute Callable tasks.",
        "submit() returns a Future containing the Callable's result."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> {
    return 100 + 200;
};

Future<Integer> future =
    executor.submit(task);

System.out.println(
    future.get()
);

executor.shutdown();`
      },
      output: "300"
    },

    {
      id: "thread-reuse",
      title: "12. Thread Reuse",
      paragraphs: [
        "One major advantage of a thread pool is that worker threads can execute multiple tasks.",
        "The executor does not necessarily create a new thread for every submitted task."
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
            " - " +
            Thread.currentThread().getName()
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "task-queue",
      title: "13. Task Queue",
      paragraphs: [
        "When all available worker threads are busy, additional submitted tasks can wait in a queue depending on the executor implementation.",
        "This allows a bounded number of worker threads to process many tasks over time."
      ],
      bullets: [
        "Tasks are submitted.",
        "Available worker threads execute tasks.",
        "Tasks waiting for execution can remain queued.",
        "When a worker becomes available, another task can execute."
      ]
    },

    {
      id: "fixed-thread-pool",
      title: "14. Fixed Thread Pool",
      paragraphs: [
        "newFixedThreadPool(n) creates an ExecutorService with a fixed number of worker threads.",
        "This can be useful when you want to limit concurrent execution."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

for (int i = 1; i <= 10; i++) {

    int task = i;

    executor.submit(() -> {
        System.out.println(
            "Task " + task
        );
    });
}

executor.shutdown();`
      }
    },

    {
      id: "single-thread-executor",
      title: "15. Single Thread Executor",
      paragraphs: [
        "newSingleThreadExecutor() creates an executor that uses a single worker thread.",
        "Submitted tasks are executed sequentially by that worker."
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
      id: "cached-thread-pool",
      title: "16. Cached Thread Pool",
      paragraphs: [
        "newCachedThreadPool() creates an executor designed to reuse available threads and create additional threads when needed.",
        "It is important to understand the workload before choosing this configuration because an unbounded number of threads may potentially be created."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newCachedThreadPool();

executor.submit(() -> {
    System.out.println("Task running");
});

executor.shutdown();`
      }
    },

    {
      id: "executor-shutdown",
      title: "17. Why shutdown() is Important",
      paragraphs: [
        "An ExecutorService should be shut down when it is no longer needed.",
        "shutdown() prevents new tasks from being accepted while allowing already submitted tasks to finish."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task running");
});

executor.shutdown();`
      }
    },

    {
      id: "shutdown-now",
      title: "18. shutdownNow()",
      paragraphs: [
        "shutdownNow() attempts to stop actively executing tasks by interrupting their worker threads and returns tasks that were awaiting execution.",
        "It is an immediate shutdown request, not a guarantee that every running task will stop."
      ],
      code: {
        language: "java",
        code: `List<Runnable> waitingTasks =
    executor.shutdownNow();`
      }
    },

    {
      id: "shutdown-difference",
      title: "19. shutdown() vs shutdownNow()",
      paragraphs: [
        "The two methods have different shutdown behavior."
      ],
      bullets: [
        "shutdown() → stop accepting new tasks and allow submitted tasks to finish.",
        "shutdownNow() → attempt to interrupt running tasks and return tasks that were waiting.",
        "Neither method should be treated as a guaranteed forceful termination mechanism."
      ]
    },

    {
      id: "await-termination",
      title: "20. awaitTermination()",
      paragraphs: [
        "awaitTermination() allows the calling thread to wait for an ExecutorService to terminate after shutdown has been initiated."
      ],
      code: {
        language: "java",
        code: `executor.shutdown();

try {

    if (!executor.awaitTermination(
            10,
            TimeUnit.SECONDS)) {

        executor.shutdownNow();
    }

} catch (InterruptedException e) {

    executor.shutdownNow();

    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "executor-lifecycle",
      title: "21. ExecutorService Lifecycle",
      paragraphs: [
        "An ExecutorService has a lifecycle that can be controlled through its shutdown methods."
      ],
      bullets: [
        "Create executor.",
        "Submit tasks.",
        "Tasks execute using worker threads.",
        "Call shutdown() when no more tasks should be submitted.",
        "Optionally wait using awaitTermination().",
        "Use shutdownNow() when an interruption-based immediate shutdown is required."
      ]
    },

    {
      id: "is-shutdown",
      title: "22. isShutdown()",
      paragraphs: [
        "isShutdown() returns true after shutdown() or shutdownNow() has been called."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

System.out.println(
    executor.isShutdown()
);

executor.shutdown();

System.out.println(
    executor.isShutdown()
);`
      },
      output: "false\ntrue"
    },

    {
      id: "is-terminated",
      title: "23. isTerminated()",
      paragraphs: [
        "isTerminated() returns true only after shutdown has been initiated and all tasks have completed and the executor has fully terminated."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() -> {
    System.out.println("Task completed");
});

executor.shutdown();

try {
    executor.awaitTermination(
        5,
        TimeUnit.SECONDS
    );
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}

System.out.println(
    executor.isTerminated()
);`
      }
    },

    {
      id: "executor-submit-many",
      title: "24. Submitting Many Tasks",
      paragraphs: [
        "An executor allows many tasks to be submitted while controlling the number of worker threads."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

for (int i = 1; i <= 20; i++) {

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
      id: "executor-real-world",
      title: "25. Real-World Backend Example",
      paragraphs: [
        "Imagine a backend service receiving requests that need background processing.",
        "Instead of creating a new thread for every task, an executor can manage a controlled set of worker threads."
      ],
      code: {
        language: "java",
        code: `class EmailTask implements Runnable {

    private final String email;

    public EmailTask(String email) {
        this.email = email;
    }

    @Override
    public void run() {
        System.out.println(
            "Sending email to " + email
        );
    }
}

public class Main {

    public static void main(String[] args) {

        ExecutorService executor =
            Executors.newFixedThreadPool(5);

        executor.submit(
            new EmailTask("user1@example.com")
        );

        executor.submit(
            new EmailTask("user2@example.com")
        );

        executor.shutdown();
    }
}`
      }
    },

    {
      id: "executor-resource-control",
      title: "26. ExecutorService and Resource Control",
      paragraphs: [
        "Thread management is not only about CPU threads.",
        "A backend application may also depend on database connections, external APIs, memory, and other limited resources.",
        "Choosing an executor size should therefore consider the entire workload rather than simply creating as many threads as possible."
      ],
      bullets: [
        "CPU capacity.",
        "I/O waiting time.",
        "Database connection pool size.",
        "Downstream service limits.",
        "Memory usage.",
        "Task duration."
      ]
    },

    {
      id: "common-mistakes",
      title: "27. Common Executor Mistakes",
      paragraphs: [
        "ExecutorService simplifies concurrency, but it still requires careful resource management."
      ],
      bullets: [
        "Forgetting to shut down the executor.",
        "Creating too many worker threads.",
        "Using a thread pool without understanding the workload.",
        "Submitting blocking tasks to an unsuitable pool.",
        "Ignoring task exceptions.",
        "Calling get() immediately for every Future and unintentionally serializing work.",
        "Assuming shutdownNow() forcibly kills tasks.",
        "Sharing mutable state without proper synchronization."
      ]
    },

    {
      id: "best-practices",
      title: "28. ExecutorService Best Practices",
      bullets: [
        "Prefer ExecutorService over manually creating large numbers of threads.",
        "Choose the executor type according to the workload.",
        "Keep thread-pool sizes controlled.",
        "Name threads meaningfully when using custom ThreadFactory configurations.",
        "Always define an appropriate shutdown strategy.",
        "Handle task exceptions.",
        "Consider downstream resource limits.",
        "Use bounded queues and explicit ThreadPoolExecutor configuration when precise control is required.",
        "Avoid blocking operations in inappropriate executor pools."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "The Executor Framework separates task submission from thread management.",
        "Executor provides basic Runnable execution.",
        "ExecutorService provides task submission, Future support, and lifecycle management.",
        "Thread pools allow worker threads to be reused across multiple tasks.",
        "shutdown() should be used when an executor is no longer needed."
      ],
      bullets: [
        "Executor → execute Runnable.",
        "ExecutorService → manage asynchronous tasks.",
        "submit() → submit Runnable or Callable.",
        "Future → represent asynchronous result.",
        "Fixed thread pool → controlled number of workers.",
        "Single thread executor → one worker.",
        "shutdown() → graceful shutdown.",
        "shutdownNow() → attempt immediate interruption.",
        "awaitTermination() → wait for termination."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "Why do we need the Executor Framework?",
          answer:
            "It provides a structured way to execute and manage tasks without manually creating and managing a new thread for every task."
        },
        {
          question: "What is Executor?",
          answer:
            "Executor is an interface that provides the execute(Runnable) method for task execution."
        },
        {
          question: "What is ExecutorService?",
          answer:
            "ExecutorService extends Executor and provides task submission, Future support, shutdown operations, and other lifecycle management features."
        },
        {
          question: "What is the advantage of a thread pool?",
          answer:
            "A thread pool limits the number of worker threads and allows worker threads to be reused for multiple tasks."
        },
        {
          question: "What is the difference between execute() and submit()?",
          answer:
            "execute() accepts Runnable and does not return a Future. submit() accepts Runnable or Callable and returns a Future."
        },
        {
          question: "What does shutdown() do?",
          answer:
            "shutdown() stops the executor from accepting new tasks while allowing already submitted tasks to complete."
        },
        {
          question: "What does shutdownNow() do?",
          answer:
            "It attempts to interrupt running tasks and returns tasks that were waiting to execute. It does not guarantee that running tasks will immediately stop."
        },
        {
          question: "What is awaitTermination()?",
          answer:
            "It allows the calling thread to wait for an executor to terminate after shutdown has been initiated."
        },
        {
          question: "What is the difference between isShutdown() and isTerminated()?",
          answer:
            "isShutdown() becomes true after shutdown begins. isTerminated() becomes true only after shutdown has occurred and all tasks and worker threads have completed termination."
        },
        {
          question: "Why shouldn't we create unlimited threads?",
          answer:
            "Too many threads can increase memory usage, scheduling overhead, contention, and resource pressure. A controlled executor helps manage concurrency."
        }
      ]
    }
  ]
};