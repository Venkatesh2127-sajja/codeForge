export const executorShutdown = {
  id: "executor-shutdown",
  slug: "executor-shutdown",
  title: "ExecutorService — shutdown(), shutdownNow(), and awaitTermination()",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to properly shut down an ExecutorService using shutdown(), shutdownNow(), and awaitTermination(), understand graceful and immediate shutdown, task states, interruption, termination, and best practices for production applications.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "why-shutdown",
      title: "1. Why Should We Shut Down ExecutorService?",
      paragraphs: [
        "An ExecutorService manages worker threads and resources. When an application no longer needs an executor, it should normally be shut down.",
        "Failing to shut down an executor can leave worker threads and other resources active longer than necessary."
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
      id: "shutdown-method",
      title: "2. What is shutdown()?",
      paragraphs: [
        "shutdown() initiates an orderly shutdown of the ExecutorService.",
        "After shutdown() is called, the executor does not accept new tasks, but previously submitted tasks are allowed to complete."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task 1");
});

executor.submit(() -> {
    System.out.println("Task 2");
});

executor.shutdown();`
      },
      output: "Task 1\nTask 2"
    },

    {
      id: "shutdown-no-new-tasks",
      title: "3. shutdown() Rejects New Tasks",
      paragraphs: [
        "Once shutdown() has been called, the executor stops accepting new tasks.",
        "Submitting a new task after shutdown() normally results in RejectedExecutionException."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.shutdown();

executor.submit(() -> {
    System.out.println("New task");
});`
      },
      output: "RejectedExecutionException"
    },

    {
      id: "shutdown-existing",
      title: "4. What Happens to Already Submitted Tasks?",
      paragraphs: [
        "Tasks already submitted before shutdown() are not automatically cancelled.",
        "They are allowed to complete normally, subject to their own behavior and available executor resources."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task started");
});

executor.shutdown();`
      }
    },

    {
      id: "shutdown-state",
      title: "5. isShutdown()",
      paragraphs: [
        "isShutdown() tells us whether shutdown has been initiated.",
        "It does not mean that all submitted tasks have finished."
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
      title: "6. isTerminated()",
      paragraphs: [
        "isTerminated() returns true only after the executor has terminated.",
        "Termination occurs after shutdown has been initiated and all tasks have completed."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task");
});

executor.shutdown();

System.out.println(
    executor.isTerminated()
);`
      },
      output:
        "Usually false immediately after shutdown(); it becomes true after termination."
    },

    {
      id: "shutdown-lifecycle",
      title: "7. ExecutorService Shutdown Lifecycle",
      paragraphs: [
        "A typical graceful shutdown moves through a simple lifecycle."
      ],
      code: {
        language: "java",
        code: `Running
   ↓
shutdown()
   ↓
No new tasks accepted
   ↓
Existing tasks complete
   ↓
Executor terminates`
      }
    },

    {
      id: "shutdown-now",
      title: "8. What is shutdownNow()?",
      paragraphs: [
        "shutdownNow() attempts to stop the executor as quickly as possible.",
        "It prevents new tasks from being accepted, attempts to interrupt currently executing tasks, and returns tasks that were waiting in the executor queue."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        System.out.println(
            "Task interrupted"
        );
    }
});

List<Runnable> waitingTasks =
    executor.shutdownNow();`
      }
    },

    {
      id: "shutdown-now-attempt",
      title: "9. shutdownNow() Is an Attempt",
      paragraphs: [
        "The name shutdownNow() does not mean that every task is forcibly terminated immediately.",
        "Java uses interruption as a cooperative mechanism. A task must respond appropriately to interruption."
      ],
      bullets: [
        "shutdownNow() attempts immediate shutdown.",
        "Running tasks are interrupted.",
        "Queued tasks are returned.",
        "Tasks may ignore interruption.",
        "Java does not forcibly kill a running thread through shutdownNow()."
      ]
    },

    {
      id: "interrupt-example",
      title: "10. How shutdownNow() Uses Interruption",
      paragraphs: [
        "A running task can detect interruption and stop its work cooperatively."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(1);

executor.submit(() -> {

    try {

        while (!Thread.currentThread()
                .isInterrupted()) {

            System.out.println(
                "Working..."
            );

            Thread.sleep(500);
        }

    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();

        System.out.println(
            "Stopping task"
        );
    }
});

Thread.sleep(1000);

executor.shutdownNow();`
      }
    },

    {
      id: "queued-tasks",
      title: "11. What Happens to Queued Tasks?",
      paragraphs: [
        "shutdownNow() attempts to stop active execution and returns tasks that never started because they were waiting in the executor queue."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

executor.submit(() -> {
    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

executor.submit(() ->
    System.out.println("Queued task")
);

List<Runnable> remaining =
    executor.shutdownNow();

System.out.println(
    "Remaining tasks: " +
    remaining.size()
);`
      }
    },

    {
      id: "shutdown-vs-now",
      title: "12. shutdown() vs shutdownNow()",
      paragraphs: [
        "The main difference is how existing work is handled."
      ],
      bullets: [
        "shutdown() → graceful shutdown.",
        "shutdownNow() → attempts immediate shutdown.",
        "shutdown() allows previously submitted tasks to complete.",
        "shutdownNow() attempts to interrupt running tasks.",
        "shutdownNow() returns tasks that never started.",
        "Neither method should be treated as a guaranteed force-kill mechanism."
      ]
    },

    {
      id: "await-termination",
      title: "13. What is awaitTermination()?",
      paragraphs: [
        "awaitTermination() allows the calling thread to wait for the ExecutorService to terminate.",
        "It is commonly used after shutdown() when the application needs to wait for existing tasks to finish."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task running");
});

executor.shutdown();

boolean finished =
    executor.awaitTermination(
        10,
        TimeUnit.SECONDS
    );

System.out.println(finished);`
      }
    },

    {
      id: "await-return",
      title: "14. What Does awaitTermination() Return?",
      paragraphs: [
        "awaitTermination() returns a boolean.",
        "true means the executor terminated within the specified waiting period. false means the timeout expired before termination."
      ],
      code: {
        language: "java",
        code: `boolean terminated =
    executor.awaitTermination(
        5,
        TimeUnit.SECONDS
    );

if (terminated) {
    System.out.println(
        "Executor terminated"
    );
} else {
    System.out.println(
        "Timeout waiting for termination"
    );
}`
      }
    },

    {
      id: "await-interrupted",
      title: "15. InterruptedException from awaitTermination()",
      paragraphs: [
        "awaitTermination() can throw InterruptedException if the thread waiting for termination is interrupted."
      ],
      code: {
        language: "java",
        code: `try {

    executor.awaitTermination(
        10,
        TimeUnit.SECONDS
    );

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();

    System.out.println(
        "Waiting thread interrupted"
    );
}`
      }
    },

    {
      id: "graceful-pattern",
      title: "16. Standard Graceful Shutdown Pattern",
      paragraphs: [
        "A common pattern is to call shutdown(), wait using awaitTermination(), and use shutdownNow() as a fallback if the timeout expires."
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
      id: "why-await",
      title: "17. Why Use shutdown() and awaitTermination() Together?",
      paragraphs: [
        "shutdown() starts graceful shutdown, while awaitTermination() allows the caller to wait for that shutdown to finish.",
        "Together they provide controlled executor lifecycle management."
      ],
      code: {
        language: "java",
        code: `executor.shutdown();

try {

    boolean terminated =
        executor.awaitTermination(
            30,
            TimeUnit.SECONDS
        );

    if (!terminated) {
        executor.shutdownNow();
    }

} catch (InterruptedException e) {

    executor.shutdownNow();
    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "shutdown-order",
      title: "18. Correct Shutdown Order",
      paragraphs: [
        "A typical application should first stop accepting new work and then wait for existing work."
      ],
      bullets: [
        "1. Stop submitting new tasks.",
        "2. Call shutdown().",
        "3. Wait using awaitTermination().",
        "4. If the timeout expires, consider shutdownNow().",
        "5. Restore interruption if the waiting thread is interrupted."
      ]
    },

    {
      id: "shutdown-now-caveat",
      title: "19. Important shutdownNow() Limitation",
      paragraphs: [
        "shutdownNow() relies on thread interruption for tasks that are already running.",
        "A task performing interruptible operations such as sleep() can react to interruption, while poorly designed code may fail to respond promptly."
      ],
      code: {
        language: "java",
        code: `executor.submit(() -> {

    while (true) {

        if (Thread.currentThread()
                .isInterrupted()) {

            break;
        }

        // Continue cooperative work
    }
});`
      }
    },

    {
      id: "sleep-interruption",
      title: "20. sleep() and shutdownNow()",
      paragraphs: [
        "If a running task is sleeping and shutdownNow() interrupts its thread, sleep() throws InterruptedException.",
        "The task should normally handle the interruption and exit or propagate the interruption appropriately."
      ],
      code: {
        language: "java",
        code: `executor.submit(() -> {

    try {

        Thread.sleep(10000);

    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();

        System.out.println(
            "Task stopping"
        );
    }
});`
      }
    },

    {
      id: "shutdown-exception",
      title: "21. Handling RejectedExecutionException",
      paragraphs: [
        "Submitting work after shutdown() or shutdownNow() can result in RejectedExecutionException.",
        "Applications should control their executor lifecycle so tasks are not submitted after shutdown begins."
      ],
      code: {
        language: "java",
        code: `executor.shutdown();

try {

    executor.submit(() ->
        System.out.println("Task")
    );

} catch (RejectedExecutionException e) {

    System.out.println(
        "Executor is no longer accepting tasks"
    );
}`
      }
    },

    {
      id: "shutdown-status",
      title: "22. shutdown() vs isShutdown() vs isTerminated()",
      paragraphs: [
        "These concepts represent different points in the executor lifecycle."
      ],
      bullets: [
        "shutdown() → requests orderly shutdown.",
        "isShutdown() → tells whether shutdown has been initiated.",
        "isTerminated() → tells whether shutdown has completed and all tasks have finished."
      ],
      code: {
        language: "java",
        code: `executor.shutdown();

System.out.println(
    executor.isShutdown()
);

System.out.println(
    executor.isTerminated()
);`
      },
      output:
        "true\nUsually false until all submitted tasks complete."
    },

    {
      id: "await-vs-get",
      title: "23. awaitTermination() vs Future.get()",
      paragraphs: [
        "Future.get() waits for a particular submitted task and can retrieve its result.",
        "awaitTermination() waits for the ExecutorService itself to terminate."
      ],
      bullets: [
        "Future.get() → waits for a specific Future.",
        "Future.get() → can return a task result.",
        "awaitTermination() → waits for executor termination.",
        "awaitTermination() → returns a boolean, not a task result."
      ]
    },

    {
      id: "backend-example",
      title: "24. Real-World Backend Example",
      paragraphs: [
        "Consider a backend service that uses an ExecutorService for background processing.",
        "During application shutdown, the service can stop accepting new tasks, allow existing work to finish, and then force interruption if the graceful shutdown timeout expires."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(4);

public void shutdownExecutor() {

    executor.shutdown();

    try {

        if (!executor.awaitTermination(
                30,
                TimeUnit.SECONDS)) {

            executor.shutdownNow();
        }

    } catch (InterruptedException e) {

        executor.shutdownNow();

        Thread.currentThread().interrupt();
    }
}`
      }
    },

    {
      id: "application-lifecycle",
      title: "25. Executor Lifecycle in an Application",
      paragraphs: [
        "An executor is usually created during application startup or component initialization, used while the application is running, and shut down when the component or application is stopping."
      ],
      code: {
        language: "java",
        code: `Application starts
       ↓
Create ExecutorService
       ↓
Submit tasks
       ↓
Process tasks
       ↓
Application shutdown begins
       ↓
shutdown()
       ↓
awaitTermination()
       ↓
shutdownNow() if necessary
       ↓
Executor terminated`
      }
    },

    {
      id: "try-finally",
      title: "26. Shutdown with try-finally",
      paragraphs: [
        "When an executor is created for a specific block of work, a finally block can be used to ensure that shutdown is attempted even if the surrounding code fails."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

try {

    executor.submit(() ->
        System.out.println("Task")
    );

} finally {

    executor.shutdown();
}`
      }
    },

    {
      id: "common-mistakes",
      title: "27. Common Shutdown Mistakes",
      paragraphs: [
        "Incorrect executor lifecycle management can cause resource leaks, rejected tasks, or incomplete background work."
      ],
      bullets: [
        "Forgetting to call shutdown().",
        "Calling shutdownNow() when graceful shutdown is sufficient.",
        "Assuming shutdownNow() forcibly kills every task.",
        "Ignoring InterruptedException.",
        "Ignoring the boolean result of awaitTermination().",
        "Submitting tasks after shutdown begins.",
        "Waiting forever for tasks that may never finish.",
        "Using an executor without a clear ownership and shutdown strategy."
      ]
    },

    {
      id: "best-practices",
      title: "28. Shutdown Best Practices",
      bullets: [
        "Prefer shutdown() for normal application shutdown.",
        "Use awaitTermination() when the caller needs to wait for completion.",
        "Use shutdownNow() as an escalation mechanism when appropriate.",
        "Handle InterruptedException correctly.",
        "Do not assume shutdownNow() guarantees immediate termination.",
        "Avoid submitting new tasks after shutdown begins.",
        "Use a bounded waiting period when graceful shutdown must finish within a limit.",
        "Make sure executor ownership and lifecycle are clearly defined."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "shutdown() performs an orderly shutdown. It rejects new tasks but allows previously submitted tasks to complete.",
        "shutdownNow() attempts to stop the executor immediately, interrupts running tasks, and returns tasks that were waiting to start.",
        "awaitTermination() waits for the executor to terminate for a specified amount of time.",
        "A common production pattern is shutdown(), awaitTermination(), and shutdownNow() as a fallback."
      ],
      bullets: [
        "shutdown() → graceful shutdown.",
        "shutdownNow() → attempt immediate shutdown.",
        "awaitTermination() → wait for termination.",
        "isShutdown() → shutdown initiated.",
        "isTerminated() → executor fully terminated.",
        "shutdownNow() uses interruption for running tasks.",
        "Interruption should be handled cooperatively."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What does shutdown() do?",
          answer:
            "shutdown() initiates an orderly shutdown. It stops accepting new tasks but allows previously submitted tasks to complete."
        },
        {
          question: "What does shutdownNow() do?",
          answer:
            "shutdownNow() attempts to stop the executor immediately, interrupts running tasks, and returns tasks that were waiting in the executor queue."
        },
        {
          question: "Does shutdownNow() forcibly kill a thread?",
          answer:
            "No. It uses interruption as a cooperative mechanism. A running task must respond appropriately to interruption."
        },
        {
          question: "What is awaitTermination()?",
          answer:
            "awaitTermination() allows the calling thread to wait for an ExecutorService to terminate for a specified amount of time."
        },
        {
          question: "What does awaitTermination() return?",
          answer:
            "It returns true if the executor terminated within the specified timeout and false if the timeout expired first."
        },
        {
          question: "What is the difference between isShutdown() and isTerminated()?",
          answer:
            "isShutdown() indicates that shutdown has been initiated. isTerminated() indicates that shutdown has completed and the executor has terminated."
        },
        {
          question: "Can tasks be submitted after shutdown()?",
          answer:
            "No. New task submissions are rejected, normally with RejectedExecutionException."
        },
        {
          question: "What happens to already submitted tasks after shutdown()?",
          answer:
            "They are allowed to complete normally unless other application or task behavior prevents completion."
        },
        {
          question: "What is a common graceful shutdown pattern?",
          answer:
            "Call shutdown(), wait using awaitTermination(), and if the timeout expires, call shutdownNow(). If the waiting thread is interrupted, call shutdownNow() and restore the interrupted status."
        },
        {
          question: "What is the difference between Future.get() and awaitTermination()?",
          answer:
            "Future.get() waits for a particular submitted task and can retrieve its result. awaitTermination() waits for the ExecutorService itself to terminate."
        }
      ]
    }
  ]
};