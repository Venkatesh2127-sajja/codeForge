export const futureTaskVsCompletableFuture = {
  id: "future-task-vs-completable-future",
  slug: "future-task-vs-completable-future",
  title: "FutureTask vs CompletableFuture",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn the differences between FutureTask and CompletableFuture, including asynchronous composition, exception handling, cancellation, and modern backend use cases.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "future-task-review",
      title: "1. FutureTask Review",

      paragraphs: [
        "FutureTask is a concrete implementation of both Runnable and Future.",

        "It represents one asynchronous computation and allows the caller to retrieve its result, check completion, or cancel the task."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Hello";
    });

ExecutorService executor =
    Executors.newFixedThreadPool(2);

executor.execute(task);

String result =
    task.get();

System.out.println(result);

executor.shutdown();`
      }
    },

    {
      id: "completable-future",
      title: "2. What is CompletableFuture?",

      paragraphs: [
        "CompletableFuture is a Java class used for asynchronous and composable programming.",

        "It implements Future and CompletionStage.",

        "Unlike a basic Future, it provides APIs for chaining, combining, transforming, and handling asynchronous operations."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture.supplyAsync(() -> {
        return "Hello";
    });`
      }
    },

    {
      id: "future-vs-completable",
      title: "3. Future vs CompletableFuture",

      bullets: [
        "Future mainly provides result retrieval, completion checks, and cancellation.",
        "CompletableFuture adds asynchronous composition.",
        "CompletableFuture supports transformations such as thenApply().",
        "CompletableFuture supports chaining such as thenCompose().",
        "CompletableFuture supports combining independent tasks.",
        "CompletableFuture provides dedicated exception-handling operations."
      ]
    },

    {
      id: "basic-supply-async",
      title: "4. supplyAsync()",

      paragraphs: [
        "supplyAsync() runs a Supplier asynchronously and produces a result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture.supplyAsync(() -> {
        return "Backend Result";
    });

String result =
    future.join();

System.out.println(result);`
      }
    },

    {
      id: "run-async",
      title: "5. runAsync()",

      paragraphs: [
        "runAsync() is used when the asynchronous task does not return a result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Void> future =
    CompletableFuture.runAsync(() -> {
        System.out.println(
            "Background task"
        );
    });

future.join();`
      }
    },

    {
      id: "then-apply",
      title: "6. thenApply() — Transform a Result",

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
);`
      }
    },

    {
      id: "then-accept",
      title: "7. thenAccept() — Consume a Result",

      paragraphs: [
        "thenAccept() performs an action using the result but does not produce another result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture
    .supplyAsync(() -> "Order Created")
    .thenAccept(result -> {
        System.out.println(result);
    })
    .join();`
      }
    },

    {
      id: "then-run",
      title: "8. thenRun() — Run After Completion",

      paragraphs: [
        "thenRun() executes an action after the previous stage completes.",

        "It does not receive the previous result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture
    .supplyAsync(() -> "Payment Success")
    .thenRun(() -> {
        System.out.println(
            "Send notification"
        );
    })
    .join();`
      }
    },

    {
      id: "then-compose",
      title: "9. thenCompose() — Dependent Async Operations",

      paragraphs: [
        "thenCompose() is used when the next asynchronous operation depends on the result of the previous operation.",

        "It avoids creating nested CompletableFuture objects."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<User> userFuture =
    getUserAsync();

CompletableFuture<Order> orderFuture =
    userFuture.thenCompose(
        user -> getOrdersAsync(user.getId())
    );`
      }
    },

    {
      id: "then-compose-flow",
      title: "10. thenCompose() Flow",

      code: {
        language: "text",
        code: `getUserAsync()
      |
      v
    User
      |
      v
getOrdersAsync(userId)
      |
      v
    Orders`
      }
    },

    {
      id: "then-apply-vs-compose",
      title: "11. thenApply() vs thenCompose()",

      bullets: [
        "thenApply() → transforms a value.",
        "thenCompose() → chains another asynchronous operation.",
        "thenApply() can produce CompletableFuture<CompletableFuture<T>> if the function itself returns a CompletableFuture.",
        "thenCompose() flattens that nested asynchronous structure."
      ],

      code: {
        language: "java",
        code: `// Transformation
CompletableFuture<String> name =
    userFuture.thenApply(
        User::getName
    );

// Dependent async operation
CompletableFuture<Order> orders =
    userFuture.thenCompose(
        user -> getOrdersAsync(user.getId())
    );`
      }
    },

    {
      id: "then-combine",
      title: "12. thenCombine() — Combine Independent Tasks",

      paragraphs: [
        "thenCombine() combines the results of two independent CompletableFuture operations."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> user =
    getUserNameAsync();

CompletableFuture<Integer> orders =
    getOrderCountAsync();

CompletableFuture<String> result =
    user.thenCombine(
        orders,
        (name, count) ->
            name + " has " + count + " orders"
    );`
      }
    },

    {
      id: "all-of",
      title: "13. CompletableFuture.allOf()",

      paragraphs: [
        "allOf() creates a CompletableFuture that completes when all supplied futures complete."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> user =
    getUserAsync();

CompletableFuture<String> orders =
    getOrdersAsync();

CompletableFuture<String> payment =
    getPaymentStatusAsync();

CompletableFuture<Void> all =
    CompletableFuture.allOf(
        user,
        orders,
        payment
    );

all.join();`
      }
    },

    {
      id: "any-of",
      title: "14. CompletableFuture.anyOf()",

      paragraphs: [
        "anyOf() completes when any one of the supplied futures completes."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Object> fastest =
    CompletableFuture.anyOf(
        serviceA(),
        serviceB(),
        serviceC()
    );`
      },

      paragraphs: [
        "This can be useful when several alternative asynchronous operations are racing to provide a result."
      ]
    },

    {
      id: "exceptionally",
      title: "15. exceptionally() — Recover from Failure",

      paragraphs: [
        "exceptionally() allows an asynchronous pipeline to provide a fallback result when an earlier stage fails."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> {
            throw new RuntimeException(
                "Service failed"
            );
        })
        .exceptionally(ex -> {
            return "Fallback Result";
        });

System.out.println(
    future.join()
);`
      }
    },

    {
      id: "handle",
      title: "16. handle() — Handle Success and Failure",

      paragraphs: [
        "handle() receives either the successful result or the exception and can transform both into a new result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> {
            return callService();
        })
        .handle((result, error) -> {

            if (error != null) {
                return "Fallback";
            }

            return result;
        });`
      }
    },

    {
      id: "when-complete",
      title: "17. whenComplete() — Observe Completion",

      paragraphs: [
        "whenComplete() allows you to observe the result or failure without normally transforming it."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
    CompletableFuture
        .supplyAsync(() -> {
            return "Success";
        })
        .whenComplete((result, error) -> {

            System.out.println(
                "Result: " + result
            );

            if (error != null) {
                System.out.println(error);
            }
        });`
      }
    },

    {
      id: "join-vs-get",
      title: "18. join() vs get()",

      paragraphs: [
        "Both join() and get() can wait for a CompletableFuture to complete.",

        "get() uses checked exceptions such as InterruptedException and ExecutionException.",

        "join() throws unchecked CompletionException when the computation fails."
      ],

      code: {
        language: "java",
        code: `String result =
    future.join();

try {
    String result2 =
        future.get();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
} catch (ExecutionException e) {
    // Handle failure
}`
      }
    },

    {
      id: "custom-executor",
      title: "19. Using a Custom Executor",

      paragraphs: [
        "By default, many CompletableFuture async methods use ForkJoinPool.commonPool().",

        "Backend applications often need explicit control over the executor, especially when tasks perform blocking I/O."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(10);

CompletableFuture<String> future =
    CompletableFuture.supplyAsync(
        () -> callExternalService(),
        executor
    );`
      }
    },

    {
      id: "why-custom-executor",
      title: "20. Why Use a Custom Executor in Backend Applications?",

      bullets: [
        "Separate application workloads",
        "Control thread-pool size",
        "Prevent blocking operations from consuming shared common-pool threads",
        "Apply application-specific monitoring",
        "Control shutdown and lifecycle",
        "Match concurrency to downstream resources"
      ]
    },

    {
      id: "backend-example",
      title: "21. Modern Backend Example",

      paragraphs: [
        "Suppose an order API needs customer information and inventory information before building a response.",

        "These two operations are independent and can run concurrently."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Customer> customerFuture =
    CompletableFuture.supplyAsync(
        () -> customerService.getCustomer(id),
        executor
    );

CompletableFuture<Inventory> inventoryFuture =
    CompletableFuture.supplyAsync(
        () -> inventoryService.getInventory(id),
        executor
    );

CompletableFuture<OrderResponse> response =
    customerFuture.thenCombine(
        inventoryFuture,
        (customer, inventory) ->
            new OrderResponse(
                customer,
                inventory
            )
    );`
      }
    },

    {
      id: "backend-chain",
      title: "22. Dependent Backend Calls",

      paragraphs: [
        "Sometimes one service call depends on the result of another."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Order> orderFuture =
    getOrderAsync(orderId);

CompletableFuture<Customer> customerFuture =
    orderFuture.thenCompose(
        order ->
            getCustomerAsync(
                order.getCustomerId()
            )
    );`
      }
    },

    {
      id: "parallel-services",
      title: "23. Parallel Backend Calls",

      paragraphs: [
        "If multiple independent services are required, CompletableFuture can start them concurrently and combine their results."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<User> userFuture =
    getUserAsync();

CompletableFuture<List<Order>> ordersFuture =
    getOrdersAsync();

CompletableFuture<Profile> profileFuture =
    getProfileAsync();

CompletableFuture<Void> all =
    CompletableFuture.allOf(
        userFuture,
        ordersFuture,
        profileFuture
    );

CompletableFuture<Response> response =
    all.thenApply(v ->
        new Response(
            userFuture.join(),
            ordersFuture.join(),
            profileFuture.join()
        )
    );`
      }
    },

    {
      id: "futuretask-limit",
      title: "24. Where FutureTask Is Limited",

      paragraphs: [
        "FutureTask is useful for representing and controlling one asynchronous computation.",

        "However, composing several FutureTask instances into a readable asynchronous workflow requires additional coordination.",

        "CompletableFuture provides dedicated APIs for chaining, combining, and handling asynchronous stages."
      ]
    },

    {
      id: "when-futuretask",
      title: "25. When to Use FutureTask",

      bullets: [
        "You need a concrete Future implementation",
        "You need the same object to be Runnable and Future",
        "You are working with lower-level concurrency utilities",
        "You need explicit control over a single computation",
        "You are implementing or studying concurrency infrastructure"
      ]
    },

    {
      id: "when-completable",
      title: "26. When to Use CompletableFuture",

      bullets: [
        "Multiple asynchronous operations must be composed",
        "Tasks have dependencies",
        "Independent service calls should run concurrently",
        "Results need transformation",
        "Several tasks need to be combined",
        "Asynchronous exception handling is required",
        "You are implementing modern backend asynchronous workflows"
      ]
    },

    {
      id: "comparison",
      title: "27. FutureTask vs CompletableFuture",

      bullets: [
        "FutureTask → concrete Future + Runnable",
        "CompletableFuture → Future + CompletionStage",
        "FutureTask → mainly one computation",
        "CompletableFuture → composable asynchronous pipeline",
        "FutureTask → get(), cancel(), isDone()",
        "CompletableFuture → thenApply(), thenCompose(), thenCombine(), allOf(), anyOf()",
        "FutureTask → lower-level concurrency utility",
        "CompletableFuture → modern asynchronous application workflows"
      ]
    },

    {
      id: "common-mistake",
      title: "28. Common Backend Mistake",

      paragraphs: [
        "CompletableFuture does not automatically make blocking code non-blocking.",

        "If a CompletableFuture task performs a blocking database or HTTP operation, the executing thread can still be blocked.",

        "The executor and downstream resources must therefore be chosen carefully."
      ]
    },

    {
      id: "exception-flow",
      title: "29. Exception Handling Flow",

      code: {
        language: "text",
        code: `Async Task
    |
    v
Exception?
   / \
 NO   YES
 |      |
 v      v
Result exceptionally()
         |
         +---- handle()
         |
         +---- whenComplete()`
      }
    },

    {
      id: "interview-questions",
      title: "30. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is the main difference between FutureTask and CompletableFuture?",

          answer:
            "FutureTask is a concrete implementation of Future and Runnable, mainly representing one asynchronous computation. CompletableFuture implements Future and CompletionStage and provides APIs for composing, combining, transforming, and handling asynchronous operations."
        },

        {
          question: "Why is CompletableFuture preferred for modern asynchronous workflows?",

          answer:
            "It provides fluent APIs for chaining dependent tasks, combining independent tasks, handling exceptions, and coordinating multiple asynchronous operations."
        },

        {
          question: "What is thenCompose() used for?",

          answer:
            "thenCompose() is used when the next asynchronous operation depends on the result of the previous operation."
        },

        {
          question: "What is thenCombine() used for?",

          answer:
            "thenCombine() combines the results of two independent CompletableFuture operations."
        },

        {
          question: "What is the difference between exceptionally() and handle()?",

          answer:
            "exceptionally() provides a fallback when an earlier stage fails. handle() receives both the result and exception and can transform either successful or failed execution into a new result."
        },

        {
          question: "What is CompletableFuture.allOf()?",

          answer:
            "allOf() returns a CompletableFuture that completes when all supplied futures complete."
        },

        {
          question: "Does CompletableFuture automatically make blocking I/O non-blocking?",

          answer:
            "No. If the task performs blocking I/O, the executing thread can still block. The executor and downstream resources must be designed appropriately."
        },

        {
          question: "Why might a backend use a custom Executor with CompletableFuture?",

          answer:
            "A custom executor provides control over thread count and resource isolation, especially when asynchronous tasks perform blocking I/O."
        }
      ]
    },

    {
      id: "interview-version",
      title: "31. Interview Version",

      paragraphs: [
        "FutureTask is a lower-level concurrency utility that combines Runnable and Future for one asynchronous computation. CompletableFuture is designed for composable asynchronous workflows. It supports chaining with thenCompose(), transformation with thenApply(), combining with thenCombine(), coordination with allOf() and anyOf(), and exception handling with exceptionally(), handle(), and whenComplete(). In backend applications, CompletableFuture is useful when multiple service calls need to run concurrently or when asynchronous operations need to be composed."
      ]
    },

    {
      id: "final-note",
      title: "32. Final Note",

      paragraphs: [
        "Remember this simple distinction:"
      ],

      bullets: [
        "FutureTask → one computation",
        "CompletableFuture → asynchronous workflow",
        "thenApply() → transform",
        "thenCompose() → dependent async task",
        "thenCombine() → combine independent tasks",
        "allOf() → wait for multiple tasks",
        "exceptionally() → fallback on failure",
        "handle() → handle success or failure",
        "Custom Executor → control backend concurrency"
      ]
    }
  ]
};