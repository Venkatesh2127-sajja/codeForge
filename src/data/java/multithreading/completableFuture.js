export const completableFuture = {
  id: "completable-future",

  slug: "completable-future",

  title: "CompletableFuture in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn CompletableFuture for asynchronous and composable programming in Java, including async execution, transformations, chaining, combining tasks, exception handling, and custom executors.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "what-is-completable-future",
      title: "1. What is CompletableFuture?",

      paragraphs: [
        "CompletableFuture is a Java class used to represent the result of an asynchronous computation.",
        "It implements Future and CompletionStage, allowing asynchronous tasks to be composed into pipelines.",
        "Unlike a basic Future, CompletableFuture provides methods for chaining, combining, and handling asynchronous operations."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture.supplyAsync(
        () -> "Hello"
    );`
      }
    },

    {
      id: "future-vs-completable",
      title: "2. Future vs CompletableFuture",

      bullets: [
        "Future → represents a result that may become available later",
        "CompletableFuture → represents a result and supports asynchronous composition",
        "Future.get() is commonly used to wait for a result",
        "CompletableFuture provides chaining methods such as thenApply() and thenCompose()",
        "CompletableFuture provides explicit exception-handling stages"
      ]
    },

    {
      id: "run-async",
      title: "3. runAsync()",

      paragraphs: [
        "runAsync() is used when an asynchronous task does not return a result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Void> future =
    CompletableFuture.runAsync(() -> {

        System.out.println(
            "Running asynchronously"
        );
    });

future.join();`
      }
    },

    {
      id: "supply-async",
      title: "4. supplyAsync()",

      paragraphs: [
        "supplyAsync() is used when an asynchronous task produces a result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture.supplyAsync(() -> {

        return "Java";

    });

String result = future.join();

System.out.println(result);`
      }
    },

    {
      id: "then-apply",
      title: "5. thenApply()",

      paragraphs: [
        "thenApply() transforms the result of a completed stage and returns another CompletableFuture."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> "java")
        .thenApply(String::toUpperCase);

System.out.println(
    future.join()
);

// JAVA`
      }
    },

    {
      id: "then-accept",
      title: "6. thenAccept()",

      paragraphs: [
        "thenAccept() consumes the result but does not produce another result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture
    .supplyAsync(() -> "Java")
    .thenAccept(value -> {

        System.out.println(
            "Received: " + value
        );
    })
    .join();`
      }
    },

    {
      id: "then-run",
      title: "7. thenRun()",

      paragraphs: [
        "thenRun() executes an action after the previous stage completes but does not receive its result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture
    .supplyAsync(() -> "Java")
    .thenRun(() -> {

        System.out.println(
            "Previous task completed"
        );
    })
    .join();`
      }
    },

    {
      id: "then-apply-accept-run",
      title: "8. thenApply vs thenAccept vs thenRun",

      code: {
        language: "text",
        code: `thenApply()
    ↓
T → R
Transform result

thenAccept()
    ↓
T → void
Consume result

thenRun()
    ↓
void → void
Run after completion`
      },

      bullets: [
        "thenApply() → transforms a result",
        "thenAccept() → consumes a result",
        "thenRun() → executes an action without receiving the result"
      ]
    },

    {
      id: "then-compose",
      title: "9. thenCompose()",

      paragraphs: [
        "thenCompose() is used when the next asynchronous operation depends on the result of the previous operation.",
        "It avoids creating a nested CompletableFuture."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> getUser() {

    return CompletableFuture.supplyAsync(
        () -> "User-100"
    );
}

CompletableFuture<String> getOrders(
        String user) {

    return CompletableFuture.supplyAsync(
        () -> "Orders for " + user
    );
}

CompletableFuture<String> result =
    getUser()
        .thenCompose(this::getOrders);

System.out.println(
    result.join()
);`
      }
    },

    {
      id: "then-compose-simple",
      title: "10. Why thenCompose()?",

      code: {
        language: "text",
        code: `Task A
  |
  v
Result A
  |
  v
Task B needs Result A
  |
  v
Result B

Use:
thenCompose()`
      },

      paragraphs: [
        "Use thenCompose when the second asynchronous operation depends on the result of the first."
      ]
    },

    {
      id: "then-combine",
      title: "11. thenCombine()",

      paragraphs: [
        "thenCombine() combines two independent CompletableFuture computations."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Integer> price =
    CompletableFuture.supplyAsync(
        () -> 100
    );

CompletableFuture<Integer> tax =
    CompletableFuture.supplyAsync(
        () -> 18
    );

CompletableFuture<Integer> total =
    price.thenCombine(
        tax,
        Integer::sum
    );

System.out.println(
    total.join()
);

// 118`
      }
    },

    {
      id: "compose-vs-combine",
      title: "12. thenCompose vs thenCombine",

      code: {
        language: "text",
        code: `thenCompose()

A → B

B depends on A


thenCombine()

A ──┐
    ├──→ Combined Result
B ──┘

A and B are independent`
      },

      bullets: [
        "thenCompose() → dependent asynchronous operations",
        "thenCombine() → independent asynchronous operations"
      ]
    },

    {
      id: "all-of",
      title: "13. allOf()",

      paragraphs: [
        "allOf() creates a CompletableFuture that completes when all supplied futures complete."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> a =
    CompletableFuture.supplyAsync(
        () -> "A"
    );

CompletableFuture<String> b =
    CompletableFuture.supplyAsync(
        () -> "B"
    );

CompletableFuture<String> c =
    CompletableFuture.supplyAsync(
        () -> "C"
    );

CompletableFuture<Void> all =
    CompletableFuture.allOf(a, b, c);

all.join();

System.out.println(a.join());
System.out.println(b.join());
System.out.println(c.join());`
      }
    },

    {
      id: "any-of",
      title: "14. anyOf()",

      paragraphs: [
        "anyOf() creates a CompletableFuture that completes when any one of the supplied futures completes."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> a =
    CompletableFuture.supplyAsync(
        () -> "A"
    );

CompletableFuture<String> b =
    CompletableFuture.supplyAsync(
        () -> "B"
    );

CompletableFuture<Object> result =
    CompletableFuture.anyOf(a, b);

System.out.println(
    result.join()
);`
      }
    },

    {
      id: "exceptionally",
      title: "15. exceptionally()",

      paragraphs: [
        "exceptionally() provides a fallback when the previous stage completes exceptionally."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> {

            throw new RuntimeException(
                "Something failed"
            );
        })
        .exceptionally(ex -> {

            return "Fallback value";
        });

System.out.println(
    future.join()
);`
      }
    },

    {
      id: "handle",
      title: "16. handle()",

      paragraphs: [
        "handle() receives both the result and the exception and can transform the outcome into another result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> "Java")
        .handle((result, exception) -> {

            if (exception != null) {
                return "Fallback";
            }

            return result.toUpperCase();
        });

System.out.println(
    future.join()
);`
      }
    },

    {
      id: "when-complete",
      title: "17. whenComplete()",

      paragraphs: [
        "whenComplete() allows an action to observe the result or exception after a stage completes.",
        "It is commonly useful for logging or metrics."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> "Java")
        .whenComplete((result, exception) -> {

            System.out.println(
                "Completed"
            );
        });`
      }
    },

    {
      id: "exception-comparison",
      title: "18. exceptionally vs handle vs whenComplete",

      bullets: [
        "exceptionally() → recover from an exception with a fallback result",
        "handle() → process both result and exception and produce another result",
        "whenComplete() → observe result/exception without being primarily a transformation stage"
      ]
    },

    {
      id: "join-vs-get",
      title: "19. join() vs get()",

      paragraphs: [
        "Both join() and get() wait for the asynchronous result.",
        "The main difference is how they report checked interruption and execution failures."
      ],

      code: {
        language: "java",
        code: `String result1 =
    future.join();

String result2 =
    future.get();`
      },

      bullets: [
        "join() → throws unchecked CompletionException for exceptional completion",
        "get() → throws checked InterruptedException and ExecutionException",
        "join() is often convenient when working directly with CompletableFuture pipelines"
      ]
    },

    {
      id: "async-methods",
      title: "20. thenApply vs thenApplyAsync",

      paragraphs: [
        "The non-Async continuation may execute using the thread that completes the previous stage, depending on the completion context.",
        "The Async variant schedules the continuation asynchronously, using the default CompletableFuture executor when no executor is supplied."
      ],

      code: {
        language: "java",
        code: `future.thenApply(value ->
    value.toUpperCase()
);

future.thenApplyAsync(value ->
    value.toUpperCase()
);`
      },

      bullets: [
        "thenApply() → synchronous-style continuation",
        "thenApplyAsync() → asynchronous scheduling",
        "The Async overload can also accept a custom Executor"
      ]
    },

    {
      id: "custom-executor",
      title: "21. Custom Executor",

      paragraphs: [
        "For backend applications, a custom Executor can be useful when asynchronous work needs controlled thread-pool sizing and isolation."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(10);

CompletableFuture<String> future =
    CompletableFuture.supplyAsync(
        () -> loadUser(),
        executor
    );

System.out.println(
    future.join()
);

executor.shutdown();`
      }
    },

    {
      id: "backend-example",
      title: "22. Backend Example",

      paragraphs: [
        "Suppose a backend request needs user information and order information. If the operations are independent, they can run concurrently and their results can be combined."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<User> userFuture =
    CompletableFuture.supplyAsync(
        () -> userService.getUser()
    );

CompletableFuture<List<Order>> ordersFuture =
    CompletableFuture.supplyAsync(
        () -> orderService.getOrders()
    );

CompletableFuture<Dashboard> dashboard =
    userFuture.thenCombine(
        ordersFuture,
        Dashboard::new
    );`
      }
    },

    {
      id: "dependent-backend",
      title: "23. Backend Example: Dependent Calls",

      paragraphs: [
        "If the second call needs data from the first call, thenCompose() is appropriate."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<User> user =
    getUser();

CompletableFuture<List<Order>> orders =
    user.thenCompose(
        u -> getOrders(u.getId())
    );`
      }
    },

    {
      id: "all-backend",
      title: "24. Multiple Independent Backend Calls",

      paragraphs: [
        "allOf() can be used when several independent operations must all finish before the next step."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> profile =
    CompletableFuture.supplyAsync(
        () -> loadProfile()
    );

CompletableFuture<String> orders =
    CompletableFuture.supplyAsync(
        () -> loadOrders()
    );

CompletableFuture<String> recommendations =
    CompletableFuture.supplyAsync(
        () -> loadRecommendations()
    );

CompletableFuture.allOf(
    profile,
    orders,
    recommendations
).join();`
      }
    },

    {
      id: "important-warning",
      title: "25. Important: CompletableFuture Does Not Make Blocking I/O Non-Blocking",

      paragraphs: [
        "Putting a blocking database or HTTP call inside CompletableFuture does not magically make that operation non-blocking.",
        "The operation can still block the worker thread executing it.",
        "The application should choose appropriate executors and I/O technologies based on the workload."
      ],

      code: {
        language: "java",
        code: `CompletableFuture.supplyAsync(() -> {

    // This may still block
    return blockingDatabaseCall();

});`
      }
    },

    {
      id: "common-mistakes",
      title: "26. Common Mistakes",

      bullets: [
        "Calling join() immediately after starting every asynchronous operation and losing the benefit of composition.",
        "Using the common pool blindly for blocking I/O.",
        "Creating an unlimited number of custom threads.",
        "Forgetting to handle exceptional completion.",
        "Using thenCompose() when independent operations should be combined with thenCombine().",
        "Using thenCombine() when the second operation actually depends on the first.",
        "Assuming CompletableFuture automatically makes blocking code non-blocking."
      ]
    },

    {
      id: "interview-questions",
      title: "27. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is CompletableFuture?",
          answer:
            "CompletableFuture represents an asynchronous computation and provides APIs for composing, combining, and handling asynchronous operations."
        },

        {
          question: "What is the difference between runAsync() and supplyAsync()?",
          answer:
            "runAsync() is used for an asynchronous task without a result, while supplyAsync() is used when the task produces a result."
        },

        {
          question: "What does thenApply() do?",
          answer:
            "thenApply() transforms the result of one CompletableFuture stage into another result."
        },

        {
          question: "What is thenCompose()?",
          answer:
            "thenCompose() chains dependent asynchronous operations and avoids creating nested CompletableFuture objects."
        },

        {
          question: "What is thenCombine()?",
          answer:
            "thenCombine() combines the results of two independent asynchronous computations."
        },

        {
          question: "What is the difference between thenCompose() and thenCombine()?",
          answer:
            "thenCompose() is for dependent asynchronous operations, while thenCombine() is for independent operations whose results need to be combined."
        },

        {
          question: "What does allOf() do?",
          answer:
            "allOf() creates a CompletableFuture that completes when all supplied futures complete."
        },

        {
          question: "What does anyOf() do?",
          answer:
            "anyOf() completes when any one of the supplied futures completes."
        },

        {
          question: "What is the difference between exceptionally() and handle()?",
          answer:
            "exceptionally() provides recovery from exceptional completion, while handle() receives both the result and exception and can transform either outcome."
        },

        {
          question: "What is the difference between join() and get()?",
          answer:
            "Both wait for completion, but join() reports failures through unchecked CompletionException, while get() uses checked InterruptedException and ExecutionException."
        },

        {
          question: "Does CompletableFuture make blocking code non-blocking?",
          answer:
            "No. If a stage performs blocking I/O, the executing thread can still be blocked."
        }
      ]
    },

    {
      id: "interview-version",
      title: "28. Interview Version",

      paragraphs: [
        "CompletableFuture is used for asynchronous and composable programming in Java. runAsync() handles tasks without results, while supplyAsync() handles tasks that return results. thenApply() transforms results, thenCompose() chains dependent asynchronous operations, and thenCombine() combines independent operations. allOf() waits for multiple futures, while exceptionally(), handle(), and whenComplete() provide exception and completion handling."
      ]
    },

    {
      id: "final-note",
      title: "29. Final Note",

      bullets: [
        "CompletableFuture → asynchronous computation",
        "runAsync() → no result",
        "supplyAsync() → produces result",
        "thenApply() → transform",
        "thenAccept() → consume",
        "thenRun() → run after completion",
        "thenCompose() → dependent async tasks",
        "thenCombine() → independent async tasks",
        "allOf() → wait for all",
        "anyOf() → first completed future",
        "exceptionally() → fallback",
        "handle() → result + exception",
        "whenComplete() → observe completion",
        "Custom Executor → control async execution"
      ]
    }
  ]
};