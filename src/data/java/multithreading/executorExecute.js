export const executorExecute = {
  id: "executor-execute",
  slug: "executor-execute",
  title: "Executor — execute() Method",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how the Executor interface and execute() method work, how Runnable tasks are submitted for execution, how executors separate task submission from thread management, and how execute() differs from submit().",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-executor",
      title: "1. What is Executor?",
      paragraphs: [
        "Executor is an interface in the java.util.concurrent package.",
        "It provides a simple abstraction for executing Runnable tasks.",
        "The main method of the Executor interface is execute()."
      ],
      code: {
        language: "java",
        code: `public interface Executor {

    void execute(Runnable command);
}`
      }
    },

    {
      id: "execute-method",
      title: "2. What is execute()?",
      paragraphs: [
        "The execute() method accepts a Runnable task and arranges for it to be executed.",
        "The Executor decides how the task will actually run.",
        "The calling code does not need to know whether the task will run on a new thread, an existing worker thread, or another execution mechanism."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() -> {
    System.out.println("Task running");
});`
      }
    },

    {
      id: "runnable-parameter",
      title: "3. execute() Accepts Runnable",
      paragraphs: [
        "The execute() method accepts a Runnable object.",
        "Therefore, the task must provide a run() method."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Hello from task");
};

executor.execute(task);`
      }
    },

    {
      id: "basic-example",
      title: "4. Basic Executor Example",
      paragraphs: [
        "Here is a simple example where a custom Executor implementation creates a new Thread for every submitted task."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.Executor;

public class Main {

    public static void main(String[] args) {

        Executor executor = command -> {
            new Thread(command).start();
        };

        executor.execute(() -> {
            System.out.println(
                "Running task"
            );
        });
    }
}`
      },
      output: "Running task"
    },

    {
      id: "separation",
      title: "5. Separation of Task and Execution",
      paragraphs: [
        "The important idea behind Executor is separation of concerns.",
        "The calling code describes the task, while the Executor decides how that task is executed."
      ],
      bullets: [
        "Runnable → describes the work.",
        "Executor → decides how to execute the work.",
        "Caller → submits the task.",
        "Execution mechanism → can change without changing the task code."
      ]
    },

    {
      id: "manual-thread-vs-executor",
      title: "6. Manual Thread vs Executor",
      paragraphs: [
        "Without Executor, application code directly creates and starts a Thread.",
        "With Executor, application code submits a Runnable and lets the Executor manage execution."
      ],
      code: {
        language: "java",
        code: `// Manual thread

Thread thread = new Thread(() -> {
    System.out.println("Task");
});

thread.start();


// Executor

Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() -> {
    System.out.println("Task");
});`
      }
    },

    {
      id: "multiple-tasks",
      title: "7. Executing Multiple Tasks",
      paragraphs: [
        "An Executor can receive multiple Runnable tasks."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() -> {
    System.out.println("Task 1");
});

executor.execute(() -> {
    System.out.println("Task 2");
});

executor.execute(() -> {
    System.out.println("Task 3");
});`
      }
    },

    {
      id: "thread-name",
      title: "8. Observing the Executing Thread",
      paragraphs: [
        "Inside the Runnable, Thread.currentThread() can be used to inspect the thread executing the task."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command, "Worker").start();
};

executor.execute(() -> {

    Thread current =
        Thread.currentThread();

    System.out.println(
        current.getName()
    );
});`
      },
      output: "Worker"
    },

    {
      id: "lambda",
      title: "9. execute() with Lambda",
      paragraphs: [
        "Because Runnable is a functional interface, execute() can receive a lambda expression directly."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() ->
    System.out.println("Hello")
);`
      }
    },

    {
      id: "anonymous-runnable",
      title: "10. execute() with Anonymous Runnable",
      paragraphs: [
        "Before lambda expressions, Runnable tasks were commonly created using anonymous classes."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(new Runnable() {

    @Override
    public void run() {
        System.out.println(
            "Task running"
        );
    }
});`
      }
    },

    {
      id: "executor-implementation",
      title: "11. Executor is an Interface",
      paragraphs: [
        "Executor is an interface, so it does not provide one fixed thread-management strategy.",
        "Different implementations can decide how submitted tasks are executed."
      ],
      bullets: [
        "One implementation may create a new thread.",
        "Another may reuse worker threads.",
        "Another may execute the task in the calling thread.",
        "ExecutorService provides a richer lifecycle and task-management API."
      ]
    },

    {
      id: "direct-executor",
      title: "12. Executor That Runs in Calling Thread",
      paragraphs: [
        "An Executor implementation does not necessarily have to create a new thread.",
        "For example, an Executor can execute the Runnable directly in the calling thread."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    command.run();
};

executor.execute(() -> {

    System.out.println(
        Thread.currentThread().getName()
    );
});`
      },
      output: "main"
    },

    {
      id: "thread-per-task",
      title: "13. Thread-Per-Task Executor",
      paragraphs: [
        "Another Executor implementation can create a new platform thread for each task.",
        "This demonstrates the flexibility of the Executor abstraction."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() -> {
    System.out.println(
        Thread.currentThread().getName()
    );
});`
      }
    },

    {
      id: "execute-no-result",
      title: "14. Does execute() Return a Result?",
      paragraphs: [
        "No. The execute() method returns void.",
        "It is designed for submitting Runnable tasks when the caller does not need a Future representing the task."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    new Thread(command).start();
};

executor.execute(() -> {
    System.out.println("Processing");
});`
      }
    },

    {
      id: "execute-vs-submit",
      title: "15. execute() vs submit()",
      paragraphs: [
        "execute() belongs to Executor and accepts a Runnable.",
        "submit() is provided by ExecutorService and returns a Future."
      ],
      bullets: [
        "execute(Runnable) → returns void.",
        "submit(Runnable) → returns Future<?>.",
        "submit(Callable<T>) → returns Future<T>.",
        "execute() is useful when no Future is required.",
        "submit() is useful when task tracking or a result is required."
      ]
    },

    {
      id: "execute-exception",
      title: "16. Exceptions with execute()",
      paragraphs: [
        "If a Runnable submitted using execute() throws an unchecked exception that escapes run(), the exception can be handled by the executing thread's UncaughtExceptionHandler.",
        "There is no Future from execute() through which the caller can later retrieve the failure."
      ],
      code: {
        language: "java",
        code: `Executor executor = command -> {
    Thread thread = new Thread(command);

    thread.setUncaughtExceptionHandler(
        (t, e) -> {
            System.out.println(
                "Error: " + e.getMessage()
            );
        }
    );

    thread.start();
};

executor.execute(() -> {
    throw new RuntimeException(
        "Task failed"
    );
});`
      },
      output: "Error: Task failed"
    },

    {
      id: "execute-order",
      title: "17. Is Task Order Guaranteed?",
      paragraphs: [
        "Executor does not by itself guarantee the order in which submitted tasks complete.",
        "The behavior depends on the Executor implementation."
      ],
      code: {
        language: "java",
        code: `executor.execute(() -> {
    System.out.println("Task 1");
});

executor.execute(() -> {
    System.out.println("Task 2");
});

executor.execute(() -> {
    System.out.println("Task 3");
});`
      }
    },

    {
      id: "executor-thread-pool",
      title: "18. Executor with Thread Pool",
      paragraphs: [
        "A common implementation of Executor is a thread pool.",
        "A thread pool keeps a controlled number of worker threads and uses them to execute submitted tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.execute(() -> {
    System.out.println("Task 1");
});

executor.execute(() -> {
    System.out.println("Task 2");
});

executor.shutdown();`
      }
    },

    {
      id: "task-reuse",
      title: "19. Worker Thread Reuse",
      paragraphs: [
        "With a thread pool, a worker thread can execute one task and then execute another task.",
        "This avoids creating a new thread for every submitted task."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

for (int i = 1; i <= 5; i++) {

    int taskNumber = i;

    executor.execute(() -> {

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
      title: "20. Tasks and Queuing",
      paragraphs: [
        "A thread-pool-based Executor can queue tasks when all worker threads are busy.",
        "The exact queuing behavior depends on the executor implementation and configuration."
      ],
      bullets: [
        "Submit task.",
        "Available worker executes task.",
        "If workers are busy, task may wait in a queue.",
        "Worker becomes available.",
        "Queued task can then execute."
      ]
    },

    {
      id: "execute-no-control",
      title: "21. What execute() Does Not Provide",
      paragraphs: [
        "The basic Executor interface intentionally provides a small API.",
        "It does not provide methods for retrieving results, cancelling tasks through Future, or shutting down the executor."
      ],
      bullets: [
        "No Future result.",
        "No task cancellation API through execute().",
        "No shutdown() method in Executor itself.",
        "No awaitTermination().",
        "For these features, use ExecutorService."
      ]
    },

    {
      id: "executor-service",
      title: "22. Moving from Executor to ExecutorService",
      paragraphs: [
        "ExecutorService extends Executor and adds many features required by real applications.",
        "It supports submit(), shutdown(), shutdownNow(), awaitTermination(), and Future-based task management."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.execute(() -> {
    System.out.println("Task");
});

executor.shutdown();`
      }
    },

    {
      id: "real-world",
      title: "23. Real-World Example",
      paragraphs: [
        "Consider a backend application that needs to process notifications.",
        "The application can submit notification tasks to an Executor instead of directly creating a Thread inside every service method."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(5);

Runnable notificationTask = () -> {
    System.out.println(
        "Sending notification"
    );
};

executor.execute(notificationTask);

executor.shutdown();`
      }
    },

    {
      id: "execute-and-runnable",
      title: "24. Why execute() Uses Runnable",
      paragraphs: [
        "Executor.execute() is designed for fire-and-execute tasks where the caller does not need a return value.",
        "Runnable provides exactly this task abstraction."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println(
        "Background operation"
    );
};

executor.execute(task);`
      }
    },

    {
      id: "common-mistakes",
      title: "25. Common execute() Mistakes",
      paragraphs: [
        "There are several mistakes beginners commonly make when using execute()."
      ],
      bullets: [
        "Calling run() instead of execute().",
        "Expecting execute() to return a Future.",
        "Expecting execute() to return a task result.",
        "Assuming execute() always creates a new thread.",
        "Assuming task execution order is guaranteed.",
        "Using an executor without understanding its thread-management strategy.",
        "Forgetting to shut down an ExecutorService."
      ]
    },

    {
      id: "execute-vs-thread",
      title: "26. execute() vs new Thread()",
      paragraphs: [
        "new Thread() directly creates a Thread object.",
        "execute() submits a task to an Executor abstraction.",
        "This allows the execution strategy to change without changing the task itself."
      ],
      bullets: [
        "new Thread() → directly creates a thread.",
        "execute() → submits a Runnable to an Executor.",
        "Executor → controls the execution strategy.",
        "Thread pool → allows worker-thread reuse.",
        "ExecutorService → adds lifecycle and Future support."
      ]
    },

    {
      id: "best-practices",
      title: "27. Best Practices",
      bullets: [
        "Use execute() when you only need to submit a Runnable task.",
        "Use submit() when you need a Future.",
        "Use Callable when a task needs to return a result.",
        "Use ExecutorService when lifecycle management is required.",
        "Avoid creating unlimited threads manually.",
        "Choose an appropriate executor implementation for the workload.",
        "Handle exceptions inside tasks or through appropriate executor mechanisms.",
        "Use meaningful thread names when debugging concurrent applications."
      ]
    },

    {
      id: "important-concept",
      title: "28. Important Concept",
      paragraphs: [
        "The most important idea behind Executor is that task submission and task execution are separated.",
        "Your application provides the work. The Executor determines how that work gets executed.",
        "This abstraction is the foundation for Java's executor-based concurrency APIs."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "Executor is a basic interface for executing Runnable tasks.",
        "Its main method is execute(Runnable).",
        "execute() returns void.",
        "The Executor decides how the Runnable is executed.",
        "ExecutorService extends Executor and adds task-management and lifecycle features."
      ],
      bullets: [
        "Executor → basic task execution.",
        "execute() → accepts Runnable.",
        "Runnable → represents the task.",
        "execute() → no Future.",
        "ExecutorService → advanced task management.",
        "submit() → returns Future.",
        "Thread pool → reuses worker threads."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is Executor in Java?",
          answer:
            "Executor is an interface from java.util.concurrent that provides a simple abstraction for executing Runnable tasks."
        },
        {
          question: "What is execute()?",
          answer:
            "execute() accepts a Runnable task and arranges for it to be executed by the Executor."
        },
        {
          question: "Does execute() create a new thread?",
          answer:
            "Not necessarily. The Executor implementation decides how the Runnable is executed. It may create a thread, reuse a worker thread, or use another execution strategy."
        },
        {
          question: "Does execute() return a Future?",
          answer:
            "No. Executor.execute() returns void. ExecutorService.submit() returns a Future."
        },
        {
          question: "What is the difference between execute() and submit()?",
          answer:
            "execute() accepts a Runnable and returns void. submit() belongs to ExecutorService, accepts Runnable or Callable, and returns a Future."
        },
        {
          question: "Why use Executor instead of directly creating a Thread?",
          answer:
            "Executor separates task submission from thread management and allows the execution strategy to be changed without changing the task."
        },
        {
          question: "Can execute() execute a Callable?",
          answer:
            "No. Executor.execute() accepts only Runnable. Callable is commonly submitted through ExecutorService.submit()."
        },
        {
          question: "Can an Executor execute tasks sequentially?",
          answer:
            "Yes. The behavior depends on the implementation. An executor using a single worker can execute tasks sequentially."
        },
        {
          question: "What happens if a Runnable throws an unchecked exception when using execute()?",
          answer:
            "If the exception escapes run(), it is handled according to the executing thread's uncaught-exception handling mechanism. There is no Future from execute() to retrieve the exception."
        },
        {
          question: "What is the relationship between Executor and ExecutorService?",
          answer:
            "Executor is the basic task-execution interface. ExecutorService extends Executor and adds task submission, Future support, and executor lifecycle management."
        }
      ]
    }
  ]
};