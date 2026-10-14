export const scheduledExecutorService = {
  id: "scheduled-executor-service",
  slug: "scheduled-executor-service",
  title:
    "ScheduledExecutorService — schedule(), scheduleAtFixedRate(), and scheduleWithFixedDelay()",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how ScheduledExecutorService schedules tasks for delayed and repeated execution using schedule(), scheduleAtFixedRate(), and scheduleWithFixedDelay(), including Future, cancellation, exception handling, shutdown, and real-world backend use cases.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-scheduled-executor",
      title: "1. What is ScheduledExecutorService?",
      paragraphs: [
        "ScheduledExecutorService is an ExecutorService that can schedule tasks to execute after a delay or repeatedly at a specified interval.",
        "It is useful when an application needs delayed execution, periodic background processing, cleanup jobs, polling, or other scheduled tasks."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);`
      }
    },

    {
      id: "why-scheduled",
      title: "2. Why Use ScheduledExecutorService?",
      paragraphs: [
        "Without a scheduler, an application might manually create threads and use sleep() to control timing.",
        "ScheduledExecutorService provides a managed and reusable mechanism for delayed and periodic task execution."
      ],
      bullets: [
        "Execute a task after a delay.",
        "Execute a task repeatedly.",
        "Avoid manually managing timer threads.",
        "Combine scheduling with ExecutorService features.",
        "Obtain Future objects for scheduled tasks.",
        "Cancel scheduled tasks when they are no longer needed."
      ]
    },

    {
      id: "create-scheduler",
      title: "3. Creating ScheduledExecutorService",
      paragraphs: [
        "The Executors utility class provides newScheduledThreadPool() for creating a ScheduledExecutorService."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);

scheduler.shutdown();`
      }
    },

    {
      id: "schedule-method",
      title: "4. What is schedule()?",
      paragraphs: [
        "schedule() executes a task once after the specified delay.",
        "It does not automatically repeat the task."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

scheduler.schedule(
    () -> System.out.println("Task executed"),
    5,
    TimeUnit.SECONDS
);

scheduler.shutdown();`
      },
      output: "Task executed after approximately 5 seconds."
    },

    {
      id: "schedule-runnable",
      title: "5. schedule() with Runnable",
      paragraphs: [
        "The Runnable version of schedule() executes a task once after the given delay."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

ScheduledFuture<?> future =
    scheduler.schedule(
        () -> System.out.println("Hello"),
        2,
        TimeUnit.SECONDS
    );`
      },
      output: "Hello"
    },

    {
      id: "schedule-callable",
      title: "6. schedule() with Callable",
      paragraphs: [
        "schedule() can also accept Callable.",
        "The Callable executes once after the delay and its result can be obtained through the returned ScheduledFuture."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

ScheduledFuture<Integer> future =
    scheduler.schedule(
        () -> 100 + 200,
        2,
        TimeUnit.SECONDS
    );

Integer result = future.get();

System.out.println(result);

scheduler.shutdown();`
      },
      output: "300"
    },

    {
      id: "schedule-delay",
      title: "7. Understanding the Initial Delay",
      paragraphs: [
        "The delay passed to schedule() specifies how long the executor waits before enabling the task for execution.",
        "It is not a guarantee of the exact wall-clock execution time because the task may still wait for an available worker."
      ],
      code: {
        language: "java",
        code: `scheduler.schedule(
    () -> System.out.println("Run"),
    10,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "schedule-return",
      title: "8. What Does schedule() Return?",
      paragraphs: [
        "The Runnable form returns a ScheduledFuture<?>.",
        "The Callable form returns a ScheduledFuture<V>, where V is the Callable result type."
      ],
      code: {
        language: "java",
        code: `ScheduledFuture<?> future =
    scheduler.schedule(
        () -> System.out.println("Done"),
        3,
        TimeUnit.SECONDS
    );`
      }
    },

    {
      id: "schedule-cancel",
      title: "9. Cancelling a Scheduled Task",
      paragraphs: [
        "The ScheduledFuture returned by schedule() can be used to cancel a task before it executes."
      ],
      code: {
        language: "java",
        code: `ScheduledFuture<?> future =
    scheduler.schedule(
        () -> System.out.println("Task"),
        10,
        TimeUnit.SECONDS
    );

future.cancel(false);`
      }
    },

    {
      id: "fixed-rate",
      title: "10. What is scheduleAtFixedRate()?",
      paragraphs: [
        "scheduleAtFixedRate() repeatedly executes a Runnable with a requested period between scheduled start times.",
        "It accepts an initial delay and a period."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

scheduler.scheduleAtFixedRate(
    () -> System.out.println("Running"),
    0,
    5,
    TimeUnit.SECONDS
);`
      },
      output:
        "Running immediately, then approximately every 5 seconds according to the schedule."
    },

    {
      id: "fixed-rate-parameters",
      title: "11. scheduleAtFixedRate() Parameters",
      paragraphs: [
        "The method receives four important values: the task, initial delay, period, and time unit."
      ],
      code: {
        language: "java",
        code: `scheduler.scheduleAtFixedRate(
    task,
    initialDelay,
    period,
    TimeUnit.SECONDS
);`
      },
      bullets: [
        "task → Runnable to execute.",
        "initialDelay → delay before the first execution.",
        "period → requested interval between scheduled start times.",
        "TimeUnit → unit used for the delay and period."
      ]
    },

    {
      id: "fixed-rate-timeline",
      title: "12. How scheduleAtFixedRate() Works",
      paragraphs: [
        "Suppose a task has an initial delay of 2 seconds and a period of 5 seconds. The scheduler attempts to start executions according to the fixed-rate schedule."
      ],
      code: {
        language: "java",
        code: `Initial delay: 2 seconds
Period: 5 seconds

Approximate schedule:

2s  → Task starts
7s  → Task starts
12s → Task starts
17s → Task starts`
      }
    },

    {
      id: "fixed-rate-long-task",
      title: "13. What if a Fixed-Rate Task Takes Too Long?",
      paragraphs: [
        "A periodic execution does not create overlapping executions of the same periodic task.",
        "If an execution takes longer than the configured period, later executions may start late rather than overlapping the previous execution."
      ],
      code: {
        language: "java",
        code: `scheduler.scheduleAtFixedRate(
    () -> {
        try {
            Thread.sleep(7000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    },
    0,
    5,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "fixed-rate-ideal",
      title: "14. When is Fixed Rate Useful?",
      paragraphs: [
        "scheduleAtFixedRate() is useful when the application wants executions based on a regular schedule rather than waiting a full delay after each task completes."
      ],
      bullets: [
        "Periodic metrics collection.",
        "Regular polling.",
        "Periodic status checks.",
        "Refreshing cached information.",
        "Tasks where a regular execution schedule matters."
      ]
    },

    {
      id: "fixed-delay",
      title: "15. What is scheduleWithFixedDelay()?",
      paragraphs: [
        "scheduleWithFixedDelay() repeatedly executes a Runnable with a fixed delay between the completion of one execution and the start of the next execution."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

scheduler.scheduleWithFixedDelay(
    () -> System.out.println("Running"),
    0,
    5,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "fixed-delay-parameters",
      title: "16. scheduleWithFixedDelay() Parameters",
      paragraphs: [
        "The method accepts a task, initial delay, delay between executions, and time unit."
      ],
      code: {
        language: "java",
        code: `scheduler.scheduleWithFixedDelay(
    task,
    initialDelay,
    delay,
    TimeUnit.SECONDS
);`
      },
      bullets: [
        "task → Runnable to execute.",
        "initialDelay → delay before the first execution.",
        "delay → delay after one execution completes before the next starts.",
        "TimeUnit → unit used for the delays."
      ]
    },

    {
      id: "fixed-delay-timeline",
      title: "17. How scheduleWithFixedDelay() Works",
      paragraphs: [
        "Suppose the task takes 3 seconds and the configured delay is 5 seconds.",
        "The next execution starts approximately 5 seconds after the previous execution finishes."
      ],
      code: {
        language: "java",
        code: `Task starts
    ↓
3 seconds execution
    ↓
Task completes
    ↓
5 seconds delay
    ↓
Next task starts`
      }
    },

    {
      id: "fixed-delay-long",
      title: "18. Long-Running Task with Fixed Delay",
      paragraphs: [
        "With fixed delay, a longer task naturally pushes the next execution later because the delay begins only after the current execution completes."
      ],
      code: {
        language: "java",
        code: `scheduler.scheduleWithFixedDelay(
    () -> {

        try {
            Thread.sleep(7000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

    },
    0,
    5,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "fixed-delay-use",
      title: "19. When is Fixed Delay Useful?",
      paragraphs: [
        "Fixed delay is useful when each execution should have a defined pause after completion before the next execution begins."
      ],
      bullets: [
        "Repeated polling.",
        "Periodic cleanup work.",
        "Background maintenance.",
        "Tasks where executions should be separated by a fixed pause.",
        "Tasks whose execution duration can vary."
      ]
    },

    {
      id: "rate-vs-delay",
      title: "20. scheduleAtFixedRate() vs scheduleWithFixedDelay()",
      paragraphs: [
        "The key difference is how the interval is measured."
      ],
      bullets: [
        "Fixed rate → based on scheduled start times.",
        "Fixed delay → delay starts after the previous execution completes.",
        "Fixed rate is suitable for regular scheduling.",
        "Fixed delay is suitable when each execution should be followed by a fixed pause."
      ],
      code: {
        language: "java",
        code: `// Fixed rate
scheduler.scheduleAtFixedRate(
    task,
    0,
    5,
    TimeUnit.SECONDS
);

// Fixed delay
scheduler.scheduleWithFixedDelay(
    task,
    0,
    5,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "exception-periodic",
      title: "21. Important: Exception in a Periodic Task",
      paragraphs: [
        "If an execution of a periodic task terminates abruptly because its Runnable throws an exception, subsequent executions of that periodic task are suppressed.",
        "Therefore, periodic tasks that should continue normally should handle expected exceptions inside the task."
      ],
      code: {
        language: "java",
        code: `scheduler.scheduleAtFixedRate(
    () -> {

        try {

            performTask();

        } catch (Exception e) {

            System.out.println(
                "Task failed: " +
                e.getMessage()
            );
        }
    },
    0,
    10,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "periodic-future",
      title: "22. ScheduledFuture for Periodic Tasks",
      paragraphs: [
        "Periodic scheduling methods return ScheduledFuture<?>.",
        "The Future can be used to inspect completion or cancellation state and to cancel future executions."
      ],
      code: {
        language: "java",
        code: `ScheduledFuture<?> future =
    scheduler.scheduleAtFixedRate(
        () -> System.out.println("Running"),
        0,
        5,
        TimeUnit.SECONDS
    );

future.cancel(false);`
      }
    },

    {
      id: "cancel-periodic",
      title: "23. Cancelling a Periodic Task",
      paragraphs: [
        "Calling cancel() on the ScheduledFuture prevents future executions of the periodic task."
      ],
      code: {
        language: "java",
        code: `ScheduledFuture<?> future =
    scheduler.scheduleWithFixedDelay(
        () -> System.out.println("Running"),
        0,
        3,
        TimeUnit.SECONDS
    );

Thread.sleep(10000);

future.cancel(false);`
      }
    },

    {
      id: "shutdown-scheduler",
      title: "24. Shutting Down ScheduledExecutorService",
      paragraphs: [
        "ScheduledExecutorService extends ExecutorService, so the normal shutdown methods are available.",
        "The scheduler should be shut down when the application or component no longer needs it."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);

scheduler.schedule(
    () -> System.out.println("Task"),
    5,
    TimeUnit.SECONDS
);

scheduler.shutdown();`
      }
    },

    {
      id: "backend-polling",
      title: "25. Real-World Backend Example — Polling",
      paragraphs: [
        "A backend application may need to periodically check an external service for status changes.",
        "ScheduledExecutorService can perform this polling without manually creating a new thread for every check."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

scheduler.scheduleWithFixedDelay(
    () -> {

        try {

            checkExternalService();

        } catch (Exception e) {

            System.out.println(
                "Polling failed"
            );
        }

    },
    0,
    30,
    TimeUnit.SECONDS
);`
      }
    },

    {
      id: "backend-cleanup",
      title: "26. Real-World Backend Example — Cleanup",
      paragraphs: [
        "ScheduledExecutorService can also be used for periodic cleanup of temporary resources."
      ],
      code: {
        language: "java",
        code: `ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);

scheduler.scheduleAtFixedRate(
    () -> {
        System.out.println(
            "Cleaning expired data"
        );
    },
    0,
    1,
    TimeUnit.HOURS
);`
      }
    },

    {
      id: "schedule-vs-timer",
      title: "27. ScheduledExecutorService vs Timer",
      paragraphs: [
        "Java also provides the older Timer and TimerTask APIs.",
        "ScheduledExecutorService integrates scheduling with the Executor framework and provides configurable thread-pool based execution."
      ],
      bullets: [
        "Timer is an older scheduling API.",
        "ScheduledExecutorService is part of java.util.concurrent.",
        "ScheduledExecutorService supports multiple worker threads.",
        "ScheduledExecutorService integrates with Future-based task management.",
        "ScheduledExecutorService is generally preferred for modern concurrent application code."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "Scheduling errors can cause unexpected execution frequency, stopped periodic tasks, or resource leaks."
      ],
      bullets: [
        "Confusing fixed rate with fixed delay.",
        "Forgetting to shut down the scheduler.",
        "Allowing an exception to terminate a periodic task unexpectedly.",
        "Assuming the task executes at an exact wall-clock time.",
        "Using a very small pool for many blocking scheduled tasks.",
        "Creating a new scheduler for every scheduled task.",
        "Ignoring cancellation requirements.",
        "Assuming periodic executions overlap automatically."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      bullets: [
        "Use schedule() for one-time delayed work.",
        "Use scheduleAtFixedRate() when regular scheduled start times are important.",
        "Use scheduleWithFixedDelay() when a fixed pause after completion is desired.",
        "Handle expected exceptions inside periodic tasks.",
        "Keep scheduled tasks reasonably short when possible.",
        "Consider blocking operations when choosing scheduler pool size.",
        "Cancel periodic tasks when they are no longer needed.",
        "Shut down the scheduler during application/component shutdown."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is ScheduledExecutorService?",
          answer:
            "ScheduledExecutorService extends ExecutorService and provides methods for delayed and periodic task execution."
        },
        {
          question: "What does schedule() do?",
          answer:
            "schedule() executes a Runnable or Callable once after a specified delay."
        },
        {
          question: "What does scheduleAtFixedRate() do?",
          answer:
            "It repeatedly executes a Runnable according to a fixed-rate schedule based on scheduled start times."
        },
        {
          question: "What does scheduleWithFixedDelay() do?",
          answer:
            "It repeatedly executes a Runnable with a fixed delay between the completion of one execution and the start of the next."
        },
        {
          question: "What is the difference between fixed rate and fixed delay?",
          answer:
            "Fixed rate schedules executions according to a regular period, while fixed delay waits for the current execution to finish and then waits the configured delay before starting the next execution."
        },
        {
          question: "What happens if a periodic task throws an exception?",
          answer:
            "If an execution terminates abruptly because its Runnable throws an exception, subsequent executions of that periodic task are suppressed."
        },
        {
          question: "How can you stop a periodic task?",
          answer:
            "Keep the ScheduledFuture returned by the scheduling method and call cancel() on it."
        },
        {
          question: "Can schedule() execute Callable?",
          answer:
            "Yes. schedule() has a Callable overload and returns a ScheduledFuture containing the eventual result."
        },
        {
          question: "What is the return type of scheduleAtFixedRate()?",
          answer:
            "It returns ScheduledFuture<?>."
        },
        {
          question: "Give a real-world use case for ScheduledExecutorService.",
          answer:
            "Common examples include periodic polling, cache refresh, cleanup jobs, status checks, metrics collection, and delayed background processing."
        }
      ]
    }
  ]
};