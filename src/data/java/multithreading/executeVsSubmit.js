export const executeVsSubmit = {
  id: "execute-vs-submit",

  slug: "execute-vs-submit",

  title: "execute() vs submit() — ExecutorService",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn the differences between execute() and submit() in ExecutorService, including return values, Future, exception handling, Runnable, Callable, and practical backend usage.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "execute",
      title: "1. What is execute()?",

      paragraphs: [
        "execute() is defined in the Executor interface and accepts a Runnable task.",

        "It is used when you want to execute a task but do not need a Future or a returned result."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.execute(() -> {
    System.out.println("Task executed");
});`
      }
    },

    {
      id: "submit",
      title: "2. What is submit()?",

      paragraphs: [
        "submit() is defined by ExecutorService.",

        "It accepts Runnable or Callable tasks and returns a Future representing the submitted task."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

Future<String> future =
    executor.submit(() -> {
        return "Task completed";
    });`
      }
    },

    {
      id: "execute-signature",
      title: "3. execute() Method",

      code: {
        language: "java",
        code: `void execute(Runnable command);`
      },

      bullets: [
        "Accepts Runnable",
        "Returns void",
        "No Future",
        "Suitable for fire-and-forget execution"
      ]
    },

    {
      id: "submit-signatures",
      title: "4. submit() Methods",

      code: {
        language: "java",
        code: `Future<?> submit(Runnable task);

<T> Future<T> submit(
    Runnable task,
    T result
);

<T> Future<T> submit(
    Callable<T> task
);`
      },

      bullets: [
        "Accepts Runnable",
        "Accepts Callable",
        "Returns Future",
        "Can retrieve task results"
      ]
    },

    {
      id: "runnable-execute",
      title: "5. execute() with Runnable",

      code: {
        language: "java",
        code: `executor.execute(() -> {
    System.out.println(
        "Processing background task"
    );
});`
      },

      paragraphs: [
        "Use execute() when the task does not need to return a result."
      ]
    },

    {
      id: "runnable-submit",
      title: "6. submit() with Runnable",

      code: {
        language: "java",
        code: `Future<?> future =
    executor.submit(() -> {
        System.out.println(
            "Processing background task"
        );
    });`
      },

      paragraphs: [
        "Even though Runnable does not return a value, submit() returns a Future that can be used to track completion or cancellation."
      ]
    },

    {
      id: "callable-submit",
      title: "7. submit() with Callable",

      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {
        return 100;
    });

Integer result =
    future.get();

System.out.println(result);`
      },

      paragraphs: [
        "Callable is useful when the background task needs to return a result."
      ]
    },

    {
      id: "future",
      title: "8. Why does submit() Return Future?",

      paragraphs: [
        "Future allows the caller to interact with the asynchronous task after submitting it."
      ],

      bullets: [
        "Check completion using isDone()",
        "Cancel using cancel()",
        "Check cancellation using isCancelled()",
        "Retrieve result using get()",
        "Wait for a limited time using timed get()"
      ],

      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {
        return 50;
    });

System.out.println(
    future.isDone()
);

Integer result =
    future.get();`
      }
    },

    {
      id: "execute-exception",
      title: "9. Exception Handling with execute()",

      paragraphs: [
        "If a task submitted using execute() throws an uncaught RuntimeException, the exception can reach the worker thread's uncaught-exception handling mechanism."
      ],

      code: {
        language: "java",
        code: `executor.execute(() -> {
    throw new RuntimeException(
        "Something went wrong"
    );
});`
      }
    },

    {
      id: "submit-exception",
      title: "10. Exception Handling with submit()",

      paragraphs: [
        "When a task submitted using submit() throws an exception, the executor captures the exception as part of the Future's outcome.",

        "Calling Future.get() can then throw ExecutionException whose cause is the task exception."
      ],

      code: {
        language: "java",
        code: `Future<?> future =
    executor.submit(() -> {
        throw new RuntimeException(
            "Something went wrong"
        );
    });

try {
    future.get();
} catch (ExecutionException e) {
    System.out.println(
        "Task failed: " +
        e.getCause()
    );
}`
      }
    },

    {
      id: "important-exception",
      title: "11. Important Exception Difference",

      paragraphs: [
        "A common interview mistake is saying that submit() immediately throws the task exception.",

        "It does not. The exception is associated with the Future and is observed when get() is called."
      ],

      code: {
        language: "java",
        code: `Future<?> future =
    executor.submit(() -> {
        throw new IllegalStateException();
    });

// Exception is not thrown here.

try {
    future.get();
} catch (ExecutionException e) {
    // Task exception observed here
}`
      }
    },

    {
      id: "cancel",
      title: "12. Cancellation with submit()",

      paragraphs: [
        "Because submit() returns a Future, the caller can request cancellation of the task."
      ],

      code: {
        language: "java",
        code: `Future<?> future =
    executor.submit(() -> {
        performTask();
    });

future.cancel(true);`
      },

      paragraphs: [
        "Cancellation is cooperative. Interrupting a thread does not guarantee that arbitrary code immediately stops."
      ]
    },

    {
      id: "execute-no-result",
      title: "13. execute() Cannot Return a Result",

      paragraphs: [
        "execute() returns void, so it cannot directly provide a task result."
      ],

      code: {
        language: "java",
        code: `executor.execute(() -> {
    int result = calculate();
    System.out.println(result);
});`
      }
    },

    {
      id: "submit-runnable-result",
      title: "14. submit(Runnable, result)",

      paragraphs: [
        "ExecutorService also provides a submit overload that accepts a Runnable and a predefined result."
      ],

      code: {
        language: "java",
        code: `String result = "SUCCESS";

Future<String> future =
    executor.submit(
        () -> {
            System.out.println(
                "Task executed"
            );
        },
        result
    );

System.out.println(
    future.get()
);`
      }
    },

    {
      id: "comparison",
      title: "15. execute() vs submit()",

      bullets: [
        "execute() → Runnable only",
        "submit() → Runnable or Callable",
        "execute() → returns void",
        "submit() → returns Future",
        "execute() → no task result",
        "submit() → can retrieve a result",
        "execute() → exceptions can reach uncaught-exception handling",
        "submit() → task exceptions are observed through Future.get()"
      ]
    },

    {
      id: "backend-example",
      title: "16. Backend Example — Fire-and-Forget",

      paragraphs: [
        "Suppose a backend needs to perform a simple background cleanup operation and does not need a result."
      ],

      code: {
        language: "java",
        code: `executor.execute(() -> {
    cleanupExpiredData();
});`
      },

      paragraphs: [
        "execute() can be appropriate when the application only needs to submit the task for execution."
      ]
    },

    {
      id: "backend-result",
      title: "17. Backend Example — Need a Result",

      paragraphs: [
        "Suppose a backend service needs to calculate a report asynchronously and later use the generated result."
      ],

      code: {
        language: "java",
        code: `Future<Report> future =
    executor.submit(() -> {
        return generateReport();
    });

Report report =
    future.get();`
      },

      paragraphs: [
        "submit() is appropriate because the caller needs a Future and the task produces a result."
      ]
    },

    {
      id: "avoid-unnecessary-get",
      title: "18. Avoid Blocking Immediately on Future.get()",

      paragraphs: [
        "If you call get() immediately after submit(), the caller can end up waiting for the task and lose much of the benefit of asynchronous execution.",

        "Use Future carefully when the result is actually needed."
      ],

      code: {
        language: "java",
        code: `Future<String> future =
    executor.submit(() -> {
        return generateData();
    });

// Other useful work can happen here.

String result =
    future.get();`
      }
    },

    {
      id: "shutdown",
      title: "19. Always Manage Executor Lifecycle",

      paragraphs: [
        "ExecutorService should be shut down when the application no longer needs it."
      ],

      code: {
        language: "java",
        code: `executor.shutdown();`
      },

      paragraphs: [
        "In managed applications such as Spring Boot, lifecycle management is often handled through application configuration or bean lifecycle mechanisms rather than creating unmanaged executors everywhere."
      ]
    },

    {
      id: "interview-questions",
      title: "20. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is the difference between execute() and submit()?",

          answer:
            "execute() accepts Runnable and returns void. submit() accepts Runnable or Callable and returns a Future."
        },

        {
          question: "Can execute() return a result?",

          answer:
            "No. execute() returns void."
        },

        {
          question: "Can submit() execute a Runnable?",

          answer:
            "Yes. submit() supports both Runnable and Callable."
        },

        {
          question: "Why use Callable with submit()?",

          answer:
            "Callable can return a value and throw checked exceptions, and submit() returns a Future for retrieving the result."
        },

        {
          question: "How are exceptions handled differently?",

          answer:
            "With execute(), an uncaught task exception can reach the worker thread's uncaught-exception handling. With submit(), the exception is captured in the Future and is observed through ExecutionException when get() is called."
        },

        {
          question: "Does submit() block?",

          answer:
            "The submit() call itself normally returns after accepting the task. Future.get() is the operation that can block while waiting for the result."
        },

        {
          question: "When would you use execute()?",

          answer:
            "When you only need to submit a Runnable task and do not need a Future or task result."
        }
      ]
    },

    {
      id: "interview-version",
      title: "21. Interview Version",

      paragraphs: [
        "execute() is used for Runnable tasks when no result or Future is required. submit() is more flexible because it accepts Runnable or Callable and returns a Future. With submit(), task results can be retrieved and task exceptions can be observed through Future.get()."
      ]
    },

    {
      id: "final-note",
      title: "22. Final Note",

      paragraphs: [
        "Remember the simple difference:"
      ],

      bullets: [
        "execute() → Runnable → void",
        "submit() → Runnable/Callable → Future",
        "Need result → submit()",
        "Need task tracking → submit()",
        "Simple fire-and-forget execution → execute()"
      ]
    }
  ]
};