export const futureMethods = {
  id: "future-methods",
  slug: "future-methods",
  title: "Future and Future Methods",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how Future represents the result of an asynchronous task and understand get(), get() with timeout, isDone(), isCancelled(), cancel(), and the relationship between Callable, ExecutorService, and Future.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-future",
      title: "1. What is Future?",
      paragraphs: [
        "Future is an interface from the java.util.concurrent package.",
        "It represents the result of an asynchronous computation.",
        "When a task is submitted to an ExecutorService, the executor can return a Future representing that task's pending result."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.Future;`
      }
    },

    {
      id: "future-flow",
      title: "2. Callable → Future Flow",
      paragraphs: [
        "A common asynchronous flow is to create a Callable task, submit it to an ExecutorService, receive a Future, and later retrieve the result."
      ],
      bullets: [
        "Create Callable.",
        "Create ExecutorService.",
        "Submit Callable.",
        "Receive Future.",
        "Callable executes asynchronously.",
        "Use Future methods to monitor or retrieve the result."
      ]
    },

    {
      id: "submit-return",
      title: "3. What Does submit() Return?",
      paragraphs: [
        "When a Callable is submitted using ExecutorService.submit(), the method returns a Future representing the pending result."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

Callable<Integer> task = () -> {
    return 100;
};

Future<Integer> future =
    executor.submit(task);`
      }
    },

    {
      id: "future-get",
      title: "4. Future.get()",
      paragraphs: [
        "The get() method retrieves the result of the asynchronous computation.",
        "If the task has not completed, get() waits until the result becomes available or the operation is interrupted."
      ],
      code: {
        language: "java",
        code: `Callable<Integer> task = () -> {
    return 100 + 200;
};

Future<Integer> future =
    executor.submit(task);

Integer result = future.get();

System.out.println(result);`
      },
      output: "300"
    },

    {
      id: "get-blocking",
      title: "5. Is get() Blocking?",
      paragraphs: [
        "Yes. Future.get() is potentially blocking.",
        "If the task is still running, the calling thread waits for the task to complete."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {

    Thread.sleep(2000);

    return "Task completed";
};

Future<String> future =
    executor.submit(task);

System.out.println("Waiting...");

String result = future.get();

System.out.println(result);`
      },
      output:
        "Waiting...\nTask completed"
    },

    {
      id: "get-timeout",
      title: "6. get() with Timeout",
      paragraphs: [
        "Future also provides get(long timeout, TimeUnit unit).",
        "This allows the calling thread to wait only for a specified amount of time."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.TimeUnit;

String result =
    future.get(2, TimeUnit.SECONDS);`
      }
    },

    {
      id: "timeout-exception",
      title: "7. TimeoutException",
      paragraphs: [
        "If the task does not complete within the specified timeout, the timed get() method throws TimeoutException.",
        "The task is not automatically cancelled just because get() timed out."
      ],
      code: {
        language: "java",
        code: `try {

    String result =
        future.get(1, TimeUnit.SECONDS);

    System.out.println(result);

} catch (TimeoutException e) {

    System.out.println(
        "Task took too long"
    );
}`
      }
    },

    {
      id: "is-done",
      title: "8. isDone()",
      paragraphs: [
        "isDone() tells whether the computation has completed.",
        "It returns true when the task completed normally, completed with an exception, or was cancelled."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> 100);

System.out.println(
    future.isDone()
);

Integer result = future.get();

System.out.println(
    future.isDone()
);`
      },
      output: "false\ntrue"
    },

    {
      id: "is-done-polling",
      title: "9. Using isDone() for Polling",
      paragraphs: [
        "A program can use isDone() to check whether a task has completed without immediately calling get().",
        "However, repeatedly polling in a tight loop can waste CPU. Other coordination mechanisms may be more appropriate depending on the design."
      ],
      code: {
        language: "java",
        code: `while (!future.isDone()) {

    System.out.println(
        "Task still running..."
    );

    Thread.sleep(100);
}

System.out.println(
    "Task completed"
);`
      }
    },

    {
      id: "is-cancelled",
      title: "10. isCancelled()",
      paragraphs: [
        "isCancelled() returns true if the computation was cancelled before it completed."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {

        Thread.sleep(5000);

        return 100;
    });

future.cancel(true);

System.out.println(
    future.isCancelled()
);`
      },
      output: "true"
    },

    {
      id: "cancel",
      title: "11. cancel()",
      paragraphs: [
        "The cancel() method attempts to cancel the computation.",
        "It accepts a boolean parameter called mayInterruptIfRunning.",
        "The parameter indicates whether interruption should be requested if the task is already running."
      ],
      code: {
        language: "java",
        code: `boolean cancelled =
    future.cancel(true);

System.out.println(
    cancelled
);`
      }
    },

    {
      id: "cancel-false",
      title: "12. cancel(false) vs cancel(true)",
      paragraphs: [
        "cancel(false) requests cancellation without requesting interruption of a task that is already running.",
        "cancel(true) allows the Future implementation to request interruption of the executing thread.",
        "Interruption is cooperative. cancel(true) does not forcibly terminate arbitrary Java code."
      ],
      code: {
        language: "java",
        code: `future.cancel(false);

future.cancel(true);`
      }
    },

    {
      id: "cancel-after-complete",
      title: "13. Cancelling a Completed Task",
      paragraphs: [
        "If a task has already completed, cancel() cannot cancel that completed computation and returns false."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> 100);

Integer result = future.get();

boolean cancelled =
    future.cancel(true);

System.out.println(cancelled);`
      },
      output: "false"
    },

    {
      id: "cancel-before-start",
      title: "14. Cancelling Before Execution",
      paragraphs: [
        "A submitted task may be waiting in an executor queue before a worker starts executing it.",
        "Cancelling such a Future can prevent the task from starting."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

Future<Integer> first =
    executor.submit(() -> {

        Thread.sleep(3000);

        return 1;
    });

Future<Integer> second =
    executor.submit(() -> {

        return 2;
    });

second.cancel(false);`
      }
    },

    {
      id: "future-state",
      title: "15. Future State Concepts",
      paragraphs: [
        "A Future can represent a task that is still pending, completed successfully, completed exceptionally, or cancelled.",
        "Future does not expose a general public state enum. Instead, methods such as isDone() and isCancelled() provide status information."
      ],
      bullets: [
        "Pending → task has not completed.",
        "Completed → task finished.",
        "Failed → task completed with an exception.",
        "Cancelled → computation was cancelled.",
        "isDone() → completion status.",
        "isCancelled() → cancellation status."
      ]
    },

    {
      id: "execution-exception",
      title: "16. ExecutionException",
      paragraphs: [
        "If a Callable throws an exception, Future.get() throws ExecutionException.",
        "The original exception is available as the cause of the ExecutionException."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {

        throw new IllegalArgumentException(
            "Invalid value"
        );
    });

try {

    future.get();

} catch (ExecutionException e) {

    System.out.println(
        e.getCause().getMessage()
    );
}`
      },
      output: "Invalid value"
    },

    {
      id: "interrupted-exception",
      title: "17. InterruptedException from get()",
      paragraphs: [
        "Future.get() can throw InterruptedException if the thread waiting for the result is interrupted.",
        "Code should handle interruption appropriately, commonly by restoring the interrupted status and stopping or propagating the interruption."
      ],
      code: {
        language: "java",
        code: `try {

    Integer result =
        future.get();

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "timeout-example",
      title: "18. Complete Timeout Example",
      paragraphs: [
        "A timeout is useful when the caller should not wait indefinitely for a task."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newSingleThreadExecutor();

Future<String> future =
    executor.submit(() -> {

        Thread.sleep(5000);

        return "Completed";
    });

try {

    String result =
        future.get(1, TimeUnit.SECONDS);

    System.out.println(result);

} catch (TimeoutException e) {

    System.out.println(
        "Operation timed out"
    );

} finally {

    executor.shutdown();
}`
      },
      output: "Operation timed out"
    },

    {
      id: "timeout-and-cancel",
      title: "19. Timeout and Cancellation",
      paragraphs: [
        "A timeout and cancellation are separate operations.",
        "If a timed get() expires, the Future remains associated with the submitted task. If the application no longer wants the task to continue, it can explicitly attempt cancellation."
      ],
      code: {
        language: "java",
        code: `try {

    future.get(1, TimeUnit.SECONDS);

} catch (TimeoutException e) {

    future.cancel(true);
}`
      }
    },

    {
      id: "multiple-futures",
      title: "20. Working with Multiple Futures",
      paragraphs: [
        "Multiple independent tasks can be submitted and represented by separate Future objects."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future1 =
    executor.submit(() -> 100);

Future<Integer> future2 =
    executor.submit(() -> 200);

Future<Integer> future3 =
    executor.submit(() -> 300);

Integer result1 = future1.get();
Integer result2 = future2.get();
Integer result3 = future3.get();

System.out.println(
    result1 + result2 + result3
);`
      },
      output: "600"
    },

    {
      id: "future-order",
      title: "21. Submission Order vs Completion Order",
      paragraphs: [
        "The order in which tasks are submitted does not necessarily determine the order in which they complete.",
        "A shorter task may finish before a task submitted earlier."
      ],
      code: {
        language: "java",
        code: `Future<String> first =
    executor.submit(() -> {

        Thread.sleep(2000);

        return "First";
    });

Future<String> second =
    executor.submit(() -> {

        return "Second";
    });`
      }
    },

    {
      id: "future-list",
      title: "22. List of Futures",
      paragraphs: [
        "When many Callable tasks are submitted, their Future objects can be stored in a collection."
      ],
      code: {
        language: "java",
        code: `List<Future<Integer>> futures =
    new ArrayList<>();

futures.add(
    executor.submit(() -> 10)
);

futures.add(
    executor.submit(() -> 20)
);

for (Future<Integer> future : futures) {
    System.out.println(future.get());
}`
      },
      output: "10\n20"
    },

    {
      id: "future-runnable",
      title: "23. Future with Runnable",
      paragraphs: [
        "ExecutorService.submit() can also accept a Runnable.",
        "A Future is returned, but a Runnable does not produce a normal result value."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Processing");
};

Future<?> future =
    executor.submit(task);

future.get();`
      }
    },

    {
      id: "future-runnable-result",
      title: "24. Runnable with a Result",
      paragraphs: [
        "The submit(Runnable, result) overload allows a Future to represent a predefined result associated with a Runnable.",
        "The Runnable itself does not produce that result."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Processing");
};

Future<String> future =
    executor.submit(task, "SUCCESS");

String result = future.get();

System.out.println(result);`
      },
      output: "Processing\nSUCCESS"
    },

    {
      id: "real-world",
      title: "25. Real-World Backend Example",
      paragraphs: [
        "Suppose a backend service needs to perform an independent database or external-service operation.",
        "A Callable can perform the operation and Future can represent its eventual result."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {

    // Simulate external service call
    Thread.sleep(1000);

    return "Customer details";
};

Future<String> future =
    executor.submit(task);

String response =
    future.get(2, TimeUnit.SECONDS);

System.out.println(response);`
      },
      output: "Customer details"
    },

    {
      id: "common-mistakes",
      title: "26. Common Future Mistakes",
      paragraphs: [
        "Future is simple to use, but several mistakes are common in real applications."
      ],
      bullets: [
        "Calling get() immediately after every submit() and unintentionally making tasks effectively sequential.",
        "Waiting forever with get() when a timeout is required.",
        "Ignoring InterruptedException.",
        "Ignoring ExecutionException.",
        "Assuming timeout automatically cancels the task.",
        "Assuming cancel(true) forcibly kills a task.",
        "Forgetting to shut down the executor.",
        "Using busy polling unnecessarily."
      ]
    },

    {
      id: "best-practices",
      title: "27. Future Best Practices",
      bullets: [
        "Use Future when you need to track or retrieve an asynchronous result.",
        "Use timed get() when indefinite waiting is undesirable.",
        "Handle InterruptedException correctly.",
        "Inspect ExecutionException causes when tasks fail.",
        "Explicitly cancel tasks when they are no longer needed.",
        "Do not assume cancel(true) guarantees immediate task termination.",
        "Avoid unnecessary busy polling with isDone().",
        "Shut down ExecutorService when appropriate.",
        "For complex asynchronous workflows, consider CompletableFuture."
      ]
    },

    {
      id: "future-vs-completable",
      title: "28. Future vs CompletableFuture",
      paragraphs: [
        "Future provides a basic representation of an asynchronous result.",
        "CompletableFuture provides additional capabilities for composing, combining, transforming, and handling asynchronous operations.",
        "CompletableFuture will be covered later in the advanced multithreading section."
      ],
      bullets: [
        "Future → basic asynchronous result.",
        "Future.get() → retrieve result.",
        "CompletableFuture → compose asynchronous operations.",
        "CompletableFuture → supports callbacks and pipelines.",
        "CompletableFuture → supports more advanced exception handling."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "Future represents the result of an asynchronous computation.",
        "It is commonly returned when a Callable is submitted to ExecutorService.",
        "get() retrieves the result and may block.",
        "Timed get() limits how long the caller waits.",
        "isDone() checks completion.",
        "isCancelled() checks cancellation.",
        "cancel() attempts to cancel the computation."
      ],
      bullets: [
        "Callable → produces result.",
        "submit() → returns Future.",
        "Future.get() → retrieve result.",
        "Future.get(timeout) → retrieve with time limit.",
        "isDone() → check completion.",
        "isCancelled() → check cancellation.",
        "cancel() → attempt cancellation.",
        "ExecutionException → task failed.",
        "TimeoutException → timed get exceeded its limit.",
        "InterruptedException → waiting thread was interrupted."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is Future in Java?",
          answer:
            "Future is an interface representing the result of an asynchronous computation."
        },
        {
          question: "How do we get a Future?",
          answer:
            "A Future is commonly returned when a task is submitted to ExecutorService using submit()."
        },
        {
          question: "What does Future.get() do?",
          answer:
            "It retrieves the task result. If the computation has not completed, get() waits for it."
        },
        {
          question: "Is Future.get() blocking?",
          answer:
            "Yes. The no-argument get() can block until the task completes."
        },
        {
          question: "How can you avoid waiting indefinitely on Future.get()?",
          answer:
            "Use get(long timeout, TimeUnit unit), which throws TimeoutException if the result is not available within the specified time."
        },
        {
          question: "What does isDone() mean?",
          answer:
            "It returns true when the computation has completed, including normal completion, exceptional completion, or cancellation."
        },
        {
          question: "What does isCancelled() mean?",
          answer:
            "It returns true if the computation was cancelled before it completed."
        },
        {
          question: "What does cancel(true) do?",
          answer:
            "It attempts to cancel the computation and permits interruption to be requested if the task is already running."
        },
        {
          question: "Does cancel(true) forcibly stop a thread?",
          answer:
            "No. Java interruption is cooperative. The task must respond appropriately to interruption."
        },
        {
          question: "What exception does Future.get() throw when a Callable fails?",
          answer:
            "It throws ExecutionException, whose cause is the exception produced by the task."
        },
        {
          question: "What is the difference between Future and CompletableFuture?",
          answer:
            "Future provides basic result retrieval and cancellation capabilities, while CompletableFuture provides richer asynchronous composition and callback-style operations."
        }
      ]
    }
  ]
};