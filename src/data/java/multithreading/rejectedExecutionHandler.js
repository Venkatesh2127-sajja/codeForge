export const rejectedExecutionHandler = {
  id: "rejected-execution-handler",
  slug: "rejected-execution-handler",
  title: "RejectedExecutionHandler and Rejection Policies",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how ThreadPoolExecutor handles tasks when it cannot accept more work, including RejectedExecutionHandler and the four standard rejection policies: AbortPolicy, CallerRunsPolicy, DiscardPolicy, and DiscardOldestPolicy.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-rejection",
      title: "1. What is Task Rejection?",
      paragraphs: [
        "A ThreadPoolExecutor can reject a task when it cannot accept additional work.",
        "This can happen when the worker threads are fully occupied, the work queue is full, and the executor has already reached maximumPoolSize."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1)
    );`
      }
    },

    {
      id: "rejection-handler",
      title: "2. What is RejectedExecutionHandler?",
      paragraphs: [
        "RejectedExecutionHandler defines what should happen when ThreadPoolExecutor cannot accept a submitted task.",
        "ThreadPoolExecutor provides four standard rejection policies."
      ],
      code: {
        language: "java",
        code: `RejectedExecutionHandler handler =
    new ThreadPoolExecutor.AbortPolicy();

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        handler
    );`
      }
    },

    {
      id: "four-policies",
      title: "3. Four Standard Rejection Policies",
      bullets: [
        "AbortPolicy",
        "CallerRunsPolicy",
        "DiscardPolicy",
        "DiscardOldestPolicy"
      ],
      paragraphs: [
        "Each policy handles rejected tasks differently."
      ]
    },

    {
      id: "abort-policy",
      title: "4. AbortPolicy",
      paragraphs: [
        "AbortPolicy is the default rejection policy of ThreadPoolExecutor.",
        "When a task is rejected, it throws RejectedExecutionException."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        1,
        1,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.AbortPolicy()
    );

executor.submit(() -> {
    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

executor.submit(() ->
    System.out.println("Queued task")
);

try {

    executor.submit(() ->
        System.out.println("Rejected task")
    );

} catch (RejectedExecutionException e) {

    System.out.println(
        "Task rejected"
    );
}

executor.shutdown();`
      },
      output: "Task rejected"
    },

    {
      id: "caller-runs",
      title: "5. CallerRunsPolicy",
      paragraphs: [
        "CallerRunsPolicy executes the rejected task directly in the thread that submitted the task.",
        "This can provide a simple form of backpressure because the submitting thread must perform the work instead of continuously submitting more tasks."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        1,
        1,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

executor.submit(() -> {
    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

executor.submit(() ->
    System.out.println("Queued task")
);

executor.submit(() ->
    System.out.println(
        "Running in: " +
        Thread.currentThread().getName()
    )
);

executor.shutdown();`
      }
    },

    {
      id: "discard-policy",
      title: "6. DiscardPolicy",
      paragraphs: [
        "DiscardPolicy silently discards a rejected task.",
        "No exception is thrown and the task is not executed."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        1,
        1,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.DiscardPolicy()
    );

executor.submit(() -> {
    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

executor.submit(() ->
    System.out.println("Queued task")
);

executor.submit(() ->
    System.out.println("Discarded task")
);

executor.shutdown();`
      }
    },

    {
      id: "discard-oldest",
      title: "7. DiscardOldestPolicy",
      paragraphs: [
        "DiscardOldestPolicy removes the oldest unhandled task from the executor's work queue and then attempts to submit the new task again."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        1,
        1,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.DiscardOldestPolicy()
    );

executor.submit(() -> {
    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

executor.submit(() ->
    System.out.println("Old queued task")
);

executor.submit(() ->
    System.out.println("New task")
);

executor.shutdown();`
      }
    },

    {
      id: "compare-policies",
      title: "8. Comparing the Policies",
      bullets: [
        "AbortPolicy → throws RejectedExecutionException.",
        "CallerRunsPolicy → runs the task in the submitting thread.",
        "DiscardPolicy → silently discards the new task.",
        "DiscardOldestPolicy → removes the oldest queued task and retries the new task."
      ]
    },

    {
      id: "why-rejection",
      title: "9. Why Does Rejection Happen?",
      paragraphs: [
        "Rejection normally occurs when the executor has reached maximumPoolSize and its work queue cannot accept another task."
      ],
      code: {
        language: "java",
        code: `Pool size = 2
Maximum size = 2
Queue capacity = 1

Worker 1 → Busy
Worker 2 → Busy
Queue    → Full

New task
   ↓
Cannot execute
   ↓
Cannot queue
   ↓
Cannot create worker
   ↓
Rejected`
      }
    },

    {
      id: "bounded-queue",
      title: "10. Bounded Queue and Rejection",
      paragraphs: [
        "A bounded queue makes it possible to place an explicit limit on how many tasks can wait in the executor."
      ],
      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(2);

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        queue
    );`
      }
    },

    {
      id: "rejection-flow",
      title: "11. Complete Rejection Flow",
      code: {
        language: "java",
        code: `New task
    ↓
Worker count < corePoolSize?
    ↓
Create worker
    ↓
Otherwise
    ↓
Try queue
    ↓
Queue full?
    ↓
Try worker < maximumPoolSize
    ↓
Create worker
    ↓
Maximum reached?
    ↓
RejectedExecutionHandler`
      }
    },

    {
      id: "default-policy",
      title: "12. What is the Default Policy?",
      paragraphs: [
        "The default RejectedExecutionHandler used by ThreadPoolExecutor is AbortPolicy."
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
    );`
      }
    },

    {
      id: "caller-backpressure",
      title: "13. CallerRunsPolicy and Backpressure",
      paragraphs: [
        "CallerRunsPolicy can slow down the producer when the executor is saturated.",
        "Instead of immediately rejecting the task, the submitting thread executes it itself."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        1,
        1,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

for (int i = 1; i <= 10; i++) {

    int taskNumber = i;

    executor.submit(() ->
        System.out.println(
            "Task " + taskNumber +
            " running on " +
            Thread.currentThread().getName()
        )
    );
}

executor.shutdown();`
      }
    },

    {
      id: "abort-use",
      title: "14. When is AbortPolicy Useful?",
      paragraphs: [
        "AbortPolicy is useful when the application wants task rejection to be explicit and visible to the caller."
      ],
      bullets: [
        "Detect overload immediately.",
        "Handle rejection explicitly.",
        "Log or report rejected work.",
        "Avoid silently losing tasks."
      ]
    },

    {
      id: "caller-use",
      title: "15. When is CallerRunsPolicy Useful?",
      paragraphs: [
        "CallerRunsPolicy can be useful when the application wants the producer to slow down naturally when the executor is saturated."
      ],
      bullets: [
        "Simple backpressure.",
        "Bounded task processing.",
        "Preventing unlimited task submission.",
        "Workloads where the caller can safely execute the task."
      ]
    },

    {
      id: "discard-use",
      title: "16. When is DiscardPolicy Useful?",
      paragraphs: [
        "DiscardPolicy can be appropriate only when losing rejected work is acceptable."
      ],
      bullets: [
        "Best-effort work.",
        "Non-critical tasks.",
        "Work where dropping the newest task is acceptable."
      ]
    },

    {
      id: "discard-oldest-use",
      title: "17. When is DiscardOldestPolicy Useful?",
      paragraphs: [
        "DiscardOldestPolicy may be considered when newer tasks are more useful than older queued tasks."
      ],
      bullets: [
        "Certain best-effort workloads.",
        "Situations where stale queued work has less value.",
        "Workloads where the newest task should replace older queued work."
      ]
    },

    {
      id: "custom-handler",
      title: "18. Creating a Custom Rejection Handler",
      paragraphs: [
        "You can create your own RejectedExecutionHandler when the standard policies do not match the application's requirements."
      ],
      code: {
        language: "java",
        code: `RejectedExecutionHandler handler =
    (task, executor) -> {

        System.out.println(
            "Task rejected"
        );
    };

ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10),
        handler
    );`
      }
    },

    {
      id: "custom-logging",
      title: "19. Custom Handler with Logging",
      paragraphs: [
        "A custom handler can log rejection information or integrate with an application's monitoring system."
      ],
      code: {
        language: "java",
        code: `RejectedExecutionHandler handler =
    (task, executor) -> {

        System.out.println(
            "Rejected task: " + task
        );

        System.out.println(
            "Queue size: " +
            executor.getQueue().size()
        );
    };`
      }
    },

    {
      id: "rejection-monitoring",
      title: "20. Monitoring Rejected Tasks",
      paragraphs: [
        "Rejected tasks can indicate that the application is receiving work faster than the executor can process it."
      ],
      bullets: [
        "Monitor rejection count.",
        "Monitor queue size.",
        "Monitor active worker count.",
        "Monitor task execution time.",
        "Monitor CPU and memory usage.",
        "Check downstream service capacity."
      ]
    },

    {
      id: "database-example",
      title: "21. Database Processing Example",
      paragraphs: [
        "Suppose a backend receives many database-processing jobs. A bounded executor can protect the database by limiting concurrent work."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        5,
        10,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

executor.submit(() -> {
    processDatabaseJob();
});`
      }
    },

    {
      id: "api-example",
      title: "22. API Request Example",
      paragraphs: [
        "Suppose a backend submits background API requests to an executor. A bounded queue and rejection policy can prevent unlimited work from accumulating."
      ],
      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        30,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(50),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

executor.submit(() -> {
    callExternalService();
});`
      }
    },

    {
      id: "rejection-exception",
      title: "23. Handling RejectedExecutionException",
      paragraphs: [
        "When AbortPolicy is used, callers can catch RejectedExecutionException and decide how to handle overload."
      ],
      code: {
        language: "java",
        code: `try {

    executor.submit(() ->
        processTask()
    );

} catch (RejectedExecutionException e) {

    System.out.println(
        "System is currently busy"
    );
}`
      }
    },

    {
      id: "shutdown-rejection",
      title: "24. Rejection During Shutdown",
      paragraphs: [
        "Tasks submitted after shutdown() or shutdownNow() are rejected because the executor no longer accepts new tasks."
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
        "Executor is shutting down"
    );
}`
      }
    },

    {
      id: "queue-size-effect",
      title: "25. Queue Size and Rejection",
      paragraphs: [
        "Increasing queue capacity can delay rejection, but it does not automatically improve performance.",
        "A very large queue can increase memory usage and task waiting time."
      ],
      bullets: [
        "Small queue → earlier rejection or worker expansion.",
        "Large queue → more waiting tasks.",
        "Very large queue → potentially high latency.",
        "Bounded queue → explicit capacity control."
      ]
    },

    {
      id: "policy-example",
      title: "26. Complete Policy Comparison Example",
      code: {
        language: "java",
        code: `ThreadPoolExecutor abort =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.AbortPolicy()
    );

ThreadPoolExecutor callerRuns =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );

ThreadPoolExecutor discard =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.DiscardPolicy()
    );

ThreadPoolExecutor discardOldest =
    new ThreadPoolExecutor(
        2,
        2,
        0,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(1),
        new ThreadPoolExecutor.DiscardOldestPolicy()
    );

abort.shutdown();
callerRuns.shutdown();
discard.shutdown();
discardOldest.shutdown();`
      }
    },

    {
      id: "common-mistakes",
      title: "27. Common Mistakes",
      bullets: [
        "Using DiscardPolicy for important business tasks.",
        "Assuming CallerRunsPolicy always executes the task immediately in a worker thread.",
        "Ignoring RejectedExecutionException with AbortPolicy.",
        "Using an unbounded queue without understanding its effect.",
        "Making maximumPoolSize unnecessarily large.",
        "Ignoring rejection metrics.",
        "Submitting tasks after shutdown.",
        "Choosing a rejection policy without considering business requirements."
      ]
    },

    {
      id: "best-practices",
      title: "28. Best Practices",
      bullets: [
        "Use bounded queues when explicit capacity control is required.",
        "Choose a rejection policy based on business requirements.",
        "Use AbortPolicy when rejection must be visible.",
        "Consider CallerRunsPolicy when producer backpressure is appropriate.",
        "Use Discard policies only when losing work is acceptable.",
        "Monitor rejected tasks.",
        "Monitor queue size and execution latency.",
        "Consider database and downstream-service limits."
      ]
    },

    {
      id: "short-note",
      title: "29. Short Note",
      paragraphs: [
        "RejectedExecutionHandler decides what happens when ThreadPoolExecutor cannot accept a task."
      ],
      bullets: [
        "AbortPolicy → throw exception.",
        "CallerRunsPolicy → caller executes task.",
        "DiscardPolicy → discard new task.",
        "DiscardOldestPolicy → discard oldest queued task and retry."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is RejectedExecutionHandler?",
          answer:
            "It defines the behavior that ThreadPoolExecutor uses when a task cannot be accepted for execution."
        },
        {
          question: "What is the default rejection policy?",
          answer:
            "AbortPolicy is the default RejectedExecutionHandler."
        },
        {
          question: "What does AbortPolicy do?",
          answer:
            "It throws RejectedExecutionException when a task is rejected."
        },
        {
          question: "What does CallerRunsPolicy do?",
          answer:
            "It executes the rejected task in the thread that submitted the task, unless the executor has been shut down."
        },
        {
          question: "What does DiscardPolicy do?",
          answer:
            "It silently discards the rejected task."
        },
        {
          question: "What does DiscardOldestPolicy do?",
          answer:
            "It removes the oldest unhandled task from the work queue and then attempts to submit the new task again."
        },
        {
          question: "When does task rejection occur?",
          answer:
            "Typically when the executor has reached maximumPoolSize and the work queue cannot accept the new task."
        },
        {
          question: "Why is CallerRunsPolicy considered a backpressure mechanism?",
          answer:
            "Because the submitting thread performs the rejected task itself, which can slow down further task submission."
        },
        {
          question: "Should DiscardPolicy be used for important business operations?",
          answer:
            "Usually not, because rejected tasks are silently lost."
        },
        {
          question: "Can tasks be rejected during shutdown?",
          answer:
            "Yes. Once shutdown begins, new task submissions are rejected."
        }
      ]
    }
  ]
};