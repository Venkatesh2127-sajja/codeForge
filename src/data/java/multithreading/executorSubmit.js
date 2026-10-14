export const executorSubmit = {
  id: "executor-submit",
  slug: "executor-submit",
  title: "ExecutorService — submit() Method",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how ExecutorService submit() works with Runnable and Callable, understand Future results, task submission, exception handling, cancellation, and the difference between execute() and submit().",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-submit",
      title: "1. What is submit()?",
      paragraphs: [
        "submit() is a method provided by ExecutorService for submitting tasks for asynchronous execution.",
        "Unlike execute(), submit() returns a Future that can be used to track the submitted task."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

Runnable task = () -> {
    System.out.println("Task running");
};

Future<?> future =
    executor.submit(task);`
      }
    },

    {
      id: "submit-runnable",
      title: "2. submit() with Runnable",
      paragraphs: [
        "A Runnable can be submitted using submit().",
        "Because Runnable does not return a result, the returned Future normally has no useful result value."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Processing");
};

Future<?> future =
    executor.submit(task);

future.get();`
      },
      output: "Processing"
    },

    {
      id: "submit-callable",
      title: "3. submit() with Callable",
      paragraphs: [
        "Callable can also be submitted using submit().",
        "In this case, the Future represents the result produced by the Callable."
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
      id: "submit-overloads",
      title: "4. submit() Method Overloads",
      paragraphs: [
        "ExecutorService provides three commonly used submit() forms.",
        "They support Runnable without a result, Runnable with a predefined result, and Callable with a computed result."
      ],
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
      }
    },

    {
      id: "submit-vs-execute",
      title: "5. submit() vs execute()",
      paragraphs: [
        "Both methods can execute Runnable tasks, but submit() provides a Future while execute() does not."
      ],
      bullets: [
        "execute(Runnable) → returns void.",
        "submit(Runnable) → returns Future<?>.",
        "submit(Callable<T>) → returns Future<T>.",
        "submit() allows task tracking.",
        "submit() allows cancellation through Future.",
        "submit() allows result retrieval when using Callable."
      ]
    },

    {
      id: "future-result",
      title: "6. Getting the Result",
      paragraphs: [
        "For a Callable task, Future.get() retrieves the result returned by call().",
        "If the task has not completed, get() waits for it."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {
    return "Hello Java";
};

Future<String> future =
    executor.submit(task);

String result = future.get();

System.out.println(result);`
      },
      output: "Hello Java"
    },

    {
      id: "submit-async",
      title: "7. submit() Is Asynchronous",
      paragraphs: [
        "Calling submit() schedules the task for execution and returns a Future to the caller.",
        "The caller can continue executing before the submitted task finishes."
      ],
      code: {
        language: "java",
        code: `Future<String> future =
    executor.submit(() -> {

        Thread.sleep(2000);

        return "Task completed";
    });

System.out.println("Main continues");

String result = future.get();

System.out.println(result);`
      },
      output:
        "Main continues\nTask completed"
    },

    {
      id: "submit-get-immediately",
      title: "8. submit() Followed Immediately by get()",
      paragraphs: [
        "Although submit() schedules work asynchronously, calling get() immediately can make the calling thread wait.",
        "The task is still executed by the executor, but the caller waits for its result."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {

        Thread.sleep(2000);

        return 100;
    });

Integer result = future.get();

System.out.println(result);`
      },
      output: "100"
    },

    {
      id: "submit-multiple",
      title: "9. Submitting Multiple Tasks",
      paragraphs: [
        "Multiple tasks can be submitted before retrieving their results."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future1 =
    executor.submit(() -> 100);

Future<Integer> future2 =
    executor.submit(() -> 200);

Future<Integer> future3 =
    executor.submit(() -> 300);

System.out.println(future1.get());
System.out.println(future2.get());
System.out.println(future3.get());`
      },
      output: "100\n200\n300"
    },

    {
      id: "submit-runnable-future",
      title: "10. Future from Runnable",
      paragraphs: [
        "When Runnable is submitted, submit() returns Future<?>.",
        "Calling get() waits until the Runnable completes, but there is no task-generated return value."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Running task");
};

Future<?> future =
    executor.submit(task);

future.get();

System.out.println(
    "Task completed"
);`
      },
      output:
        "Running task\nTask completed"
    },

    {
      id: "submit-runnable-result",
      title: "11. Runnable with a Predefined Result",
      paragraphs: [
        "The submit(Runnable, result) overload allows a Future to return a predefined value after the Runnable completes.",
        "The Runnable itself does not produce that value."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Processing");
};

Future<String> future =
    executor.submit(
        task,
        "SUCCESS"
    );

String result = future.get();

System.out.println(result);`
      },
      output: "Processing\nSUCCESS"
    },

    {
      id: "callable-generic",
      title: "12. Callable Generic Type",
      paragraphs: [
        "Callable<T> specifies the type of result returned by the task.",
        "The Future returned by submit() uses the same type."
      ],
      code: {
        language: "java",
        code: `Callable<Integer> task = () -> {
    return 500;
};

Future<Integer> future =
    executor.submit(task);

Integer result = future.get();`
      }
    },

    {
      id: "submit-string",
      title: "13. Callable Returning String",
      paragraphs: [
        "Callable can return a String or any other object type."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {
    return "Customer found";
};

Future<String> future =
    executor.submit(task);

String result = future.get();

System.out.println(result);`
      },
      output: "Customer found"
    },

    {
      id: "submit-object",
      title: "14. Callable Returning Custom Object",
      paragraphs: [
        "In real applications, Callable can return a custom Java object such as a DTO or domain result."
      ],
      code: {
        language: "java",
        code: `class User {

    private final int id;
    private final String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

Callable<User> task = () -> {
    return new User(101, "John");
};

Future<User> future =
    executor.submit(task);

User user = future.get();

System.out.println(
    user.getName()
);`
      },
      output: "John"
    },

    {
      id: "exception-submit",
      title: "15. Exception Handling with submit()",
      paragraphs: [
        "When a task submitted using submit() throws an exception, the exception is captured by the Future.",
        "When get() is called, the failure is reported through ExecutionException."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {

        throw new RuntimeException(
            "Calculation failed"
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
      output: "Calculation failed"
    },

    {
      id: "submit-interrupted",
      title: "16. InterruptedException",
      paragraphs: [
        "Future.get() can throw InterruptedException if the thread waiting for the result is interrupted.",
        "A common response is to restore the interrupted status."
      ],
      code: {
        language: "java",
        code: `try {

    String result =
        future.get();

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "submit-timeout",
      title: "17. submit() with Timed get()",
      paragraphs: [
        "submit() can be combined with Future.get(timeout, unit) when the caller should not wait indefinitely."
      ],
      code: {
        language: "java",
        code: `try {

    String result =
        future.get(
            2,
            TimeUnit.SECONDS
        );

    System.out.println(result);

} catch (TimeoutException e) {

    System.out.println(
        "Task timed out"
    );
}`
      }
    },

    {
      id: "submit-cancel",
      title: "18. Cancelling a Submitted Task",
      paragraphs: [
        "The Future returned by submit() can be used to attempt cancellation."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> {

        Thread.sleep(5000);

        return 100;
    });

boolean cancelled =
    future.cancel(true);

System.out.println(cancelled);`
      }
    },

    {
      id: "submit-isdone",
      title: "19. Checking Task Completion",
      paragraphs: [
        "The Future returned by submit() can be checked using isDone()."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> 100);

System.out.println(
    future.isDone()
);

future.get();

System.out.println(
    future.isDone()
);`
      },
      output: "false\ntrue"
    },

    {
      id: "submit-iscancelled",
      title: "20. Checking Cancellation",
      paragraphs: [
        "isCancelled() can be used to determine whether a submitted task was cancelled."
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
      id: "submit-task-order",
      title: "21. Submission Order vs Execution Order",
      paragraphs: [
        "Submitting tasks in a particular order does not mean they will complete in the same order when multiple worker threads are available."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.submit(() -> {

    Thread.sleep(2000);

    System.out.println("Slow task");
});

executor.submit(() -> {

    System.out.println("Fast task");
});`
      },
      output:
        "Fast task may be printed before Slow task."
    },

    {
      id: "submit-thread-pool",
      title: "22. submit() with Thread Pool",
      paragraphs: [
        "submit() is commonly used with thread pools.",
        "The executor controls the worker threads while the application focuses on submitting tasks."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

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
      id: "submit-vs-new-thread",
      title: "23. submit() vs new Thread()",
      paragraphs: [
        "new Thread() directly creates a Thread object.",
        "submit() gives the task to an ExecutorService, allowing the executor to manage worker threads and task execution."
      ],
      bullets: [
        "new Thread() → direct thread creation.",
        "submit() → task submission.",
        "submit() → works with managed thread pools.",
        "submit() → provides Future.",
        "submit() → supports Callable results."
      ]
    },

    {
      id: "submit-real-world",
      title: "24. Real-World Backend Example",
      paragraphs: [
        "Suppose a backend application needs to calculate an order total in the background.",
        "Callable can perform the calculation and submit() can return a Future representing the result."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

Callable<Double> orderTask = () -> {

    double price = 1000.0;
    double tax = 180.0;

    return price + tax;
};

Future<Double> future =
    executor.submit(orderTask);

Double total = future.get();

System.out.println(
    "Total: " + total
);

executor.shutdown();`
      },
      output: "Total: 1180.0"
    },

    {
      id: "submit-many",
      title: "25. Submitting Many Tasks",
      paragraphs: [
        "submit() is useful when an application has many independent tasks that can be processed by a controlled worker pool."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(4);

List<Future<Integer>> futures =
    new ArrayList<>();

for (int i = 1; i <= 10; i++) {

    int number = i;

    Future<Integer> future =
        executor.submit(() -> number * number);

    futures.add(future);
}

for (Future<Integer> future : futures) {

    System.out.println(
        future.get()
    );
}

executor.shutdown();`
      },
      output:
        "1\n4\n9\n16\n25\n36\n49\n64\n81\n100"
    },

    {
      id: "submit-shutdown",
      title: "26. Shutting Down After submit()",
      paragraphs: [
        "After submitting all required tasks, the ExecutorService should normally be shut down when it is no longer needed.",
        "shutdown() does not cancel already submitted tasks."
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
      }
    },

    {
      id: "common-mistakes",
      title: "27. Common submit() Mistakes",
      paragraphs: [
        "These mistakes are common when using ExecutorService.submit()."
      ],
      bullets: [
        "Calling get() immediately after every submit().",
        "Forgetting to shut down the executor.",
        "Ignoring ExecutionException.",
        "Ignoring InterruptedException.",
        "Assuming submit() guarantees immediate execution.",
        "Assuming Future.get() is non-blocking.",
        "Assuming cancel(true) forcibly kills a task.",
        "Creating an unnecessarily large thread pool."
      ]
    },

    {
      id: "best-practices",
      title: "28. submit() Best Practices",
      bullets: [
        "Use submit() when you need a Future.",
        "Use Callable when a task must return a result.",
        "Submit independent tasks before waiting for their results when appropriate.",
        "Use timed get() when indefinite waiting is undesirable.",
        "Handle InterruptedException correctly.",
        "Handle ExecutionException when retrieving results.",
        "Cancel tasks that are no longer needed.",
        "Shut down the executor when its work is complete.",
        "Choose an appropriate thread-pool size."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "ExecutorService.submit() submits a Runnable or Callable task for execution.",
        "It returns a Future representing the submitted computation.",
        "Callable produces a result that can be retrieved using Future.get().",
        "Runnable can be submitted too, but it does not normally produce a result.",
        "Future also provides task monitoring and cancellation operations."
      ],
      bullets: [
        "submit(Runnable) → Future<?>.",
        "submit(Runnable, result) → Future<T>.",
        "submit(Callable<T>) → Future<T>.",
        "Future.get() → retrieve result.",
        "Future.isDone() → check completion.",
        "Future.isCancelled() → check cancellation.",
        "Future.cancel() → attempt cancellation."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is submit() in ExecutorService?",
          answer:
            "submit() submits a Runnable or Callable task for asynchronous execution and returns a Future representing that task."
        },
        {
          question: "What does submit(Runnable) return?",
          answer:
            "It returns Future<?>. The Future can be used to wait for completion, check status, or attempt cancellation."
        },
        {
          question: "What does submit(Callable<T>) return?",
          answer:
            "It returns Future<T>, which can be used to retrieve the value returned by Callable.call()."
        },
        {
          question: "What is the difference between execute() and submit()?",
          answer:
            "execute() accepts Runnable and returns void. submit() belongs to ExecutorService, accepts Runnable or Callable, and returns a Future."
        },
        {
          question: "Does submit() block the calling thread?",
          answer:
            "Normally submit() returns after scheduling the task and does not wait for the task to finish. However, calling Future.get() can block."
        },
        {
          question: "How are exceptions handled with submit()?",
          answer:
            "For a submitted task, an exception is captured by the Future and is reported through ExecutionException when get() is called."
        },
        {
          question: "Can submit() execute Callable?",
          answer:
            "Yes. submit(Callable<T>) is one of the main ways to execute Callable tasks."
        },
        {
          question: "Can submit() execute Runnable?",
          answer:
            "Yes. ExecutorService provides submit() overloads for Runnable."
        },
        {
          question: "How do you cancel a task submitted with submit()?",
          answer:
            "Use the Future returned by submit() and call cancel()."
        },
        {
          question: "Why might calling get() immediately after submit() be a problem?",
          answer:
            "get() can block until the task completes, so doing it immediately for each task can reduce the concurrency benefit and make independent tasks effectively sequential from the caller's perspective."
        }
      ]
    }
  ]
};