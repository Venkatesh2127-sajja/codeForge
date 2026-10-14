export const completableFuture = {
  id: "completable-future",
  title: "CompletableFuture",
  slug: "completable-future",
  topicTitle: "Java 8",
  estimatedTime: "50 min",

  description:
    "Learn Java 8 CompletableFuture for asynchronous programming, including supplyAsync(), async pipelines, thenApply(), thenCompose(), thenCombine(), exception handling, timeouts, and practical best practices.",

  sections: [
    {
      id: "completable-future-overview",
      title: "What is CompletableFuture?",

      paragraphs: [
        "CompletableFuture is a Java 8 class used to represent the result of an asynchronous computation.",
        "It belongs to the java.util.concurrent package and provides APIs for creating asynchronous tasks, transforming results, combining independent operations, and handling failures.",
        "Unlike a traditional Future, CompletableFuture provides methods for building asynchronous pipelines without manually blocking and waiting after every operation."
      ],

      bullets: [
        "CompletableFuture was introduced in Java 8.",
        "It implements the Future and CompletionStage interfaces.",
        "It supports asynchronous computation.",
        "It supports chaining multiple operations.",
        "It supports combining independent asynchronous tasks.",
        "It provides APIs for exception handling.",
        "It can be used to build non-blocking-style asynchronous workflows."
      ]
    },

    {
      id: "creating-completable-future",
      title: "Creating a CompletableFuture",

      paragraphs: [
        "A CompletableFuture can be created directly when a future result needs to be completed manually."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.CompletableFuture;

public class Main {

    public static void main(String[] args) {

        CompletableFuture<String> future =
                new CompletableFuture<>();

        future.complete("Java");

        System.out.println(
                future.join()
        );
    }
}`
      },

      output: `Java`
    },

    {
      id: "completed-future",
      title: "completedFuture()",

      paragraphs: [
        "completedFuture() creates an already completed CompletableFuture.",
        "It is useful when a method needs to return a CompletableFuture but the result is already available."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
        CompletableFuture.completedFuture("Java");

System.out.println(
        future.join()
);`
      },

      output: `Java`
    },

    {
      id: "run-async",
      title: "runAsync()",

      paragraphs: [
        "runAsync() executes an asynchronous task that does not return a result.",
        "It returns CompletableFuture<Void>."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.CompletableFuture;

public class Main {

    public static void main(String[] args) {

        CompletableFuture<Void> future =
                CompletableFuture.runAsync(() -> {

                    System.out.println(
                            "Running asynchronously"
                    );
                });

        future.join();
    }
}`
      },

      output: `Running asynchronously`
    },

    {
      id: "supply-async",
      title: "supplyAsync()",

      paragraphs: [
        "supplyAsync() is used when an asynchronous computation needs to return a value.",
        "It accepts a Supplier and returns a CompletableFuture containing the result."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.CompletableFuture;

public class Main {

    public static void main(String[] args) {

        CompletableFuture<String> future =
                CompletableFuture.supplyAsync(() -> {

                    return "Hello from async task";
                });

        System.out.println(
                future.join()
        );
    }
}`
      },

      output: `Hello from async task`
    },

    {
      id: "supply-async-thread",
      title: "supplyAsync() and Threads",

      paragraphs: [
        "When no Executor is supplied, supplyAsync() uses the default asynchronous execution facility, which is based on the common ForkJoinPool.",
        "A custom Executor can also be supplied when the application needs explicit control over thread management."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
        CompletableFuture.supplyAsync(() -> {

            System.out.println(
                    Thread.currentThread().getName()
            );

            return "Task completed";
        });

System.out.println(
        future.join()
);`
      },

      output: `Thread name depends on the runtime environment.
Task completed`
    },

    {
      id: "then-apply",
      title: "thenApply()",

      paragraphs: [
        "thenApply() transforms the result of a completed asynchronous computation.",
        "It is similar to map-style transformation: one result is received and another result is produced."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
        CompletableFuture.supplyAsync(
                () -> "java"
        );

CompletableFuture<String> result =
        future.thenApply(
                value -> value.toUpperCase()
        );

System.out.println(
        result.join()
);`
      },

      output: `JAVA`
    },

    {
      id: "then-apply-chain",
      title: "Chaining thenApply()",

      paragraphs: [
        "Multiple thenApply() operations can be chained to create a transformation pipeline."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
        CompletableFuture.supplyAsync(
                () -> "java"
        )
        .thenApply(String::toUpperCase)
        .thenApply(value ->
                value + " 8"
        )
        .thenApply(value ->
                value + " Tutorial"
        );

System.out.println(
        result.join()
);`
      },

      output: `JAVA 8 Tutorial`
    },

    {
      id: "then-accept",
      title: "thenAccept()",

      paragraphs: [
        "thenAccept() consumes the result of a previous stage but does not produce another result.",
        "It returns CompletableFuture<Void>."
      ],

      code: {
        language: "java",
        code: `CompletableFuture.supplyAsync(
        () -> "Java"
)
.thenAccept(
        value -> System.out.println(
                "Received: " + value
        )
)
.join();`
      },

      output: `Received: Java`
    },

    {
      id: "then-run",
      title: "thenRun()",

      paragraphs: [
        "thenRun() executes an action after the previous stage completes but does not receive or produce the previous result."
      ],

      code: {
        language: "java",
        code: `CompletableFuture.supplyAsync(
        () -> "Java"
)
.thenRun(
        () -> System.out.println(
                "Previous task completed"
        )
)
.join();`
      },

      output: `Previous task completed`
    },

    {
      id: "then-compose",
      title: "thenCompose()",

      paragraphs: [
        "thenCompose() is used when the next asynchronous operation itself returns a CompletableFuture.",
        "It combines the stages into a single asynchronous pipeline instead of creating a nested CompletableFuture."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> getUser() {

    return CompletableFuture.supplyAsync(
            () -> "User-101"
    );
}

CompletableFuture<String> getOrders(
        String user
) {

    return CompletableFuture.supplyAsync(
            () -> user + " Orders"
    );
}

CompletableFuture<String> result =
        getUser()
                .thenCompose(
                        this::getOrders
                );

System.out.println(
        result.join()
);`
      },

      output: `User-101 Orders`
    },

    {
      id: "then-compose-vs-then-apply",
      title: "thenApply() vs thenCompose()",

      code: {
        language: "text",
        code: `thenApply()

Used when:

T -> R

Example:

CompletableFuture<String>
    -> thenApply(String::toUpperCase)
    -> CompletableFuture<String>


thenCompose()

Used when:

T -> CompletableFuture<R>

Example:

CompletableFuture<User>
    -> thenCompose(this::getOrders)
    -> CompletableFuture<List<Order>>`
      },

      bullets: [
        "thenApply() transforms a result.",
        "thenCompose() chains dependent asynchronous operations.",
        "Use thenCompose() when the next function already returns CompletableFuture.",
        "thenCompose() prevents nested CompletableFuture structures."
      ]
    },

    {
      id: "then-combine",
      title: "thenCombine()",

      paragraphs: [
        "thenCombine() combines the results of two independent CompletableFuture computations.",
        "It is useful when two asynchronous operations can execute independently and their results are needed together."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> user =
        CompletableFuture.supplyAsync(
                () -> "Venkatesh"
        );

CompletableFuture<String> city =
        CompletableFuture.supplyAsync(
                () -> "Bangalore"
        );

CompletableFuture<String> result =
        user.thenCombine(
                city,
                (name, location) ->
                        name + " - " + location
        );

System.out.println(
        result.join()
);`
      },

      output: `Venkatesh - Bangalore`
    },

    {
      id: "then-combine-real-world",
      title: "Real-World thenCombine() Example",

      paragraphs: [
        "Suppose an application needs customer information and account information. If those operations are independent, they can execute asynchronously and their results can later be combined."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> customer =
        CompletableFuture.supplyAsync(
                () -> "Customer: 101"
        );

CompletableFuture<String> account =
        CompletableFuture.supplyAsync(
                () -> "Balance: 50000"
        );

CompletableFuture<String> response =
        customer.thenCombine(
                account,
                (customerData, accountData) ->
                        customerData
                        + ", "
                        + accountData
        );

System.out.println(
        response.join()
);`
      },

      output: `Customer: 101, Balance: 50000`
    },

    {
      id: "all-of",
      title: "CompletableFuture.allOf()",

      paragraphs: [
        "allOf() waits for multiple CompletableFuture instances to complete.",
        "It returns a CompletableFuture<Void>, so individual results need to be retrieved separately when required."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> first =
        CompletableFuture.supplyAsync(
                () -> "First"
        );

CompletableFuture<String> second =
        CompletableFuture.supplyAsync(
                () -> "Second"
        );

CompletableFuture<Void> all =
        CompletableFuture.allOf(
                first,
                second
        );

all.join();

System.out.println(
        first.join()
);

System.out.println(
        second.join()
);`
      },

      output: `First
Second`
    },

    {
      id: "any-of",
      title: "CompletableFuture.anyOf()",

      paragraphs: [
        "anyOf() completes when any one of the supplied CompletableFuture instances completes."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> first =
        CompletableFuture.supplyAsync(
                () -> "First"
        );

CompletableFuture<String> second =
        CompletableFuture.supplyAsync(
                () -> "Second"
        );

CompletableFuture<Object> result =
        CompletableFuture.anyOf(
                first,
                second
        );

System.out.println(
        result.join()
);`
      },

      output: `Either First or Second, depending on which task completes first.`
    },

    {
      id: "exceptionally",
      title: "Exception Handling with exceptionally()",

      paragraphs: [
        "exceptionally() provides a fallback value when an asynchronous stage completes exceptionally.",
        "It is useful for handling failures and returning a recovery value."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Integer> result =
        CompletableFuture.supplyAsync(() -> {

            if (true) {
                throw new RuntimeException(
                        "Something went wrong"
                );
            }

            return 100;
        })
        .exceptionally(
                error -> {
                    System.out.println(
                            error.getMessage()
                    );
                    return 0;
                }
        );

System.out.println(
        result.join()
);`
      },

      output: `java.lang.RuntimeException: Something went wrong
0`
    },

    {
      id: "handle",
      title: "Exception Handling with handle()",

      paragraphs: [
        "handle() receives both the successful result and the exception, allowing a stage to produce a result regardless of whether the previous stage succeeded or failed."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
        CompletableFuture.supplyAsync(() -> {

            throw new RuntimeException(
                    "Database error"
            );

        })
        .handle((value, error) -> {

            if (error != null) {
                return "Fallback response";
            }

            return value;
        });

System.out.println(
        result.join()
);`
      },

      output: `Fallback response`
    },

    {
      id: "when-complete",
      title: "whenComplete()",

      paragraphs: [
        "whenComplete() performs an action after a stage completes, whether it succeeds or fails.",
        "Unlike handle(), it normally does not transform the result into a different value."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
        CompletableFuture.supplyAsync(
                () -> "Success"
        );

future.whenComplete(
        (value, error) -> {

            if (error != null) {
                System.out.println(
                        "Failed"
                );
            } else {
                System.out.println(
                        "Completed: " + value
                );
            }
        }
).join();`
      },

      output: `Completed: Success`
    },

    {
      id: "exception-handling-comparison",
      title: "exceptionally() vs handle() vs whenComplete()",

      code: {
        language: "text",
        code: `exceptionally()

Purpose:
Recover from failure.

Result:
Can provide a fallback value.


handle()

Purpose:
Process success or failure.

Result:
Can transform the result.


whenComplete()

Purpose:
Perform an action after completion.

Result:
Normally keeps the original result/error.`
      },

      bullets: [
        "Use exceptionally() for simple fallback recovery.",
        "Use handle() when both success and failure need to be transformed into a result.",
        "Use whenComplete() for logging, metrics, cleanup, or observation."
      ]
    },

    {
      id: "exceptionally-async-pipeline",
      title: "Exception Handling in an Async Pipeline",

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
        CompletableFuture.supplyAsync(
                () -> "java"
        )
        .thenApply(
                String::toUpperCase
        )
        .thenApply(
                value -> {
                    throw new RuntimeException(
                            "Processing failed"
                    );
                }
        )
        .exceptionally(
                error -> "Fallback"
        );

System.out.println(
        result.join()
);`
      },

      output: `Fallback`
    },

    {
      id: "timeouts-java8",
      title: "Timeouts in Java 8",

      paragraphs: [
        "CompletableFuture itself did not provide the modern orTimeout() and completeOnTimeout() methods in Java 8. Those methods were added in Java 9.",
        "In Java 8, a timeout can be implemented using techniques such as ScheduledExecutorService and completing a separate CompletableFuture exceptionally when the timeout expires.",
        "This distinction is important when building a Java 8 learning platform."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) {

        ExecutorService executor =
                Executors.newFixedThreadPool(2);

        ScheduledExecutorService scheduler =
                Executors.newScheduledThreadPool(1);

        CompletableFuture<String> task =
                CompletableFuture.supplyAsync(() -> {

                    try {
                        Thread.sleep(3000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }

                    return "Completed";
                }, executor);

        CompletableFuture<String> timeout =
                new CompletableFuture<>();

        scheduler.schedule(
                () -> timeout.completeExceptionally(
                        new TimeoutException(
                                "Operation timed out"
                        )
                ),
                1,
                TimeUnit.SECONDS
        );

        CompletableFuture<String> result =
                task.applyToEither(
                        timeout,
                        value -> value
                );

        try {

            System.out.println(
                    result.join()
            );

        } catch (CompletionException e) {

            System.out.println(
                    "Operation timed out"
            );
        }

        executor.shutdown();
        scheduler.shutdown();
    }
}`
      },

      output: `Operation timed out`
    },

    {
      id: "java9-timeout-note",
      title: "Java 9+ Timeout Methods",

      paragraphs: [
        "For comparison, Java 9 introduced orTimeout() and completeOnTimeout() directly on CompletableFuture.",
        "These methods should not be presented as Java 8 APIs."
      ],

      code: {
        language: "java",
        code: `// Java 9+

future.orTimeout(
        2,
        TimeUnit.SECONDS
);

future.completeOnTimeout(
        "Fallback",
        2,
        TimeUnit.SECONDS
);`
      },

      bullets: [
        "orTimeout() → completes exceptionally after the timeout.",
        "completeOnTimeout() → completes with a fallback value after the timeout.",
        "Both methods are Java 9+ features, not Java 8 features."
      ]
    },

    {
      id: "custom-executor",
      title: "Using a Custom Executor",

      paragraphs: [
        "The asynchronous methods can accept an Executor. A custom Executor gives an application more explicit control over the threads used for asynchronous tasks."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
        Executors.newFixedThreadPool(5);

CompletableFuture<String> future =
        CompletableFuture.supplyAsync(
                () -> "Processing request",
                executor
        );

System.out.println(
        future.join()
);

executor.shutdown();`
      },

      output: `Processing request`
    },

    {
      id: "async-methods",
      title: "thenApply() vs thenApplyAsync()",

      paragraphs: [
        "Many CompletionStage methods have both synchronous and asynchronous variants.",
        "thenApply() may execute the continuation using the thread that completes the previous stage, depending on the execution context.",
        "thenApplyAsync() schedules the continuation for asynchronous execution using the default asynchronous execution facility or a supplied Executor."
      ],

      code: {
        language: "java",
        code: `CompletableFuture.supplyAsync(
        () -> "Java"
)
.thenApplyAsync(
        value -> value.toUpperCase()
)
.thenAccept(
        System.out::println
)
.join();`
      },

      output: `JAVA`
    },

    {
      id: "async-pipeline",
      title: "Building an Async Pipeline",

      paragraphs: [
        "CompletableFuture becomes especially useful when several asynchronous transformations need to be connected into a single pipeline."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
        CompletableFuture.supplyAsync(
                () -> "java"
        )
        .thenApply(
                String::toUpperCase
        )
        .thenApply(
                value -> value + " 8"
        )
        .thenApply(
                value -> "Course: " + value
        );

System.out.println(
        result.join()
);`
      },

      output: `Course: JAVA 8`
    },

    {
      id: "dependent-async-pipeline",
      title: "Dependent Async Pipeline with thenCompose()",

      paragraphs: [
        "When one asynchronous operation depends on the result of another asynchronous operation, thenCompose() is usually the appropriate operation."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> getUser() {

    return CompletableFuture.supplyAsync(
            () -> "User-101"
    );
}

CompletableFuture<String> getProfile(
        String user
) {

    return CompletableFuture.supplyAsync(
            () -> user + " Profile"
    );
}

CompletableFuture<String> result =
        getUser()
                .thenCompose(
                        this::getProfile
                );

System.out.println(
        result.join()
);`
      },

      output: `User-101 Profile`
    },

    {
      id: "parallel-independent-tasks",
      title: "Combining Independent Async Tasks",

      paragraphs: [
        "When two operations are independent, they can be started separately and combined later using thenCombine().",
        "This pattern is common when an application needs information from multiple independent services."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> product =
        CompletableFuture.supplyAsync(
                () -> "Product Details"
        );

CompletableFuture<String> inventory =
        CompletableFuture.supplyAsync(
                () -> "Inventory Details"
        );

CompletableFuture<String> result =
        product.thenCombine(
                inventory,
                (p, i) -> p + " + " + i
        );

System.out.println(
        result.join()
);`
      },

      output: `Product Details + Inventory Details`
    },

    {
      id: "real-world-service-example",
      title: "Real-World Backend Example",

      paragraphs: [
        "In a backend application, customer information and order information may come from separate services.",
        "If the calls are independent, they can be started asynchronously and combined into a single response."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> customerFuture =
        CompletableFuture.supplyAsync(
                () -> fetchCustomer()
        );

CompletableFuture<String> ordersFuture =
        CompletableFuture.supplyAsync(
                () -> fetchOrders()
        );

CompletableFuture<String> response =
        customerFuture.thenCombine(
                ordersFuture,
                (customer, orders) ->
                        customer + " | " + orders
        );

String result =
        response.join();`
      },

      bullets: [
        "Start independent operations separately.",
        "Combine their results when both are available.",
        "Handle exceptions at an appropriate boundary.",
        "Avoid blocking unnecessarily inside asynchronous stages."
      ]
    },

    {
      id: "join-vs-get",
      title: "join() vs get()",

      paragraphs: [
        "CompletableFuture provides both get() and join() for obtaining the result.",
        "get() comes from Future and requires checked exception handling.",
        "join() does not require checked exception handling and wraps failures in CompletionException."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<String> future =
        CompletableFuture.completedFuture(
                "Java"
        );

String result =
        future.join();

System.out.println(result);`
      },

      output: `Java`
    },

    {
      id: "best-practices",
      title: "CompletableFuture Best Practices",

      bullets: [
        "Use supplyAsync() when an asynchronous computation returns a value.",
        "Use runAsync() when the asynchronous task does not return a value.",
        "Use thenApply() for synchronous-style result transformation.",
        "Use thenCompose() for dependent asynchronous operations.",
        "Use thenCombine() for independent asynchronous operations whose results need to be combined.",
        "Use exceptionally() for simple fallback recovery.",
        "Use handle() when both success and failure should be transformed into a result.",
        "Use whenComplete() for observation, logging, metrics, or cleanup.",
        "Use custom Executors when explicit thread-pool control is required.",
        "Avoid blocking calls inside asynchronous pipelines when possible.",
        "Do not assume parallel asynchronous execution is automatically faster.",
        "Always consider timeout and failure behavior for remote operations.",
        "Remember that orTimeout() and completeOnTimeout() are Java 9+ APIs, not Java 8 APIs.",
        "Shut down application-created ExecutorService instances when they are no longer needed.",
        "Keep asynchronous pipelines readable and avoid unnecessarily complex chains."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "CompletableFuture was introduced in Java 8.",
        "It implements Future and CompletionStage.",
        "supplyAsync() executes an asynchronous computation that returns a value.",
        "runAsync() executes an asynchronous computation without a result.",
        "thenApply() transforms a result.",
        "thenCompose() chains dependent asynchronous operations.",
        "thenCombine() combines independent asynchronous results.",
        "allOf() waits for multiple futures to complete.",
        "anyOf() completes when any supplied future completes.",
        "exceptionally() provides recovery from failures.",
        "handle() receives both the result and possible exception.",
        "whenComplete() observes completion without normally changing the result.",
        "Custom Executors can provide explicit thread management.",
        "join() returns a result without requiring checked exception handling.",
        "Java 8 does not have CompletableFuture.orTimeout() or completeOnTimeout()."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is CompletableFuture?",
          answer:
            "CompletableFuture is a Java 8 class for asynchronous computation and composition. It allows applications to create, transform, combine, and handle asynchronous results."
        },
        {
          question: "What is the difference between Future and CompletableFuture?",
          answer:
            "Future mainly represents the result of an asynchronous computation and provides blocking retrieval. CompletableFuture additionally provides CompletionStage APIs for chaining, combining, and handling asynchronous computations."
        },
        {
          question: "What is supplyAsync()?",
          answer:
            "supplyAsync() executes a Supplier asynchronously and returns a CompletableFuture containing its result."
        },
        {
          question: "What is runAsync()?",
          answer:
            "runAsync() executes a Runnable asynchronously and returns CompletableFuture<Void> because it does not produce a result."
        },
        {
          question: "What does thenApply() do?",
          answer:
            "thenApply() transforms the result of a completed stage into another result."
        },
        {
          question: "What is thenCompose()?",
          answer:
            "thenCompose() is used to chain dependent asynchronous operations when the next function itself returns a CompletableFuture."
        },
        {
          question: "What is the difference between thenApply() and thenCompose()?",
          answer:
            "thenApply() transforms T into R. thenCompose() transforms T into CompletableFuture<R> and flattens the resulting asynchronous stages."
        },
        {
          question: "What is thenCombine()?",
          answer:
            "thenCombine() combines the results of two independent CompletableFuture computations using a BiFunction."
        },
        {
          question: "What is the difference between thenCompose() and thenCombine()?",
          answer:
            "thenCompose() is normally used when one asynchronous operation depends on the result of another. thenCombine() is used when two asynchronous operations are independent and their results need to be combined."
        },
        {
          question: "What is exceptionally()?",
          answer:
            "exceptionally() handles exceptional completion and can return a fallback result."
        },
        {
          question: "What is handle()?",
          answer:
            "handle() receives both the successful result and exception and can transform either outcome into a new result."
        },
        {
          question: "What is whenComplete()?",
          answer:
            "whenComplete() performs an action after successful or exceptional completion and normally preserves the original result or failure."
        },
        {
          question: "What is CompletableFuture.allOf()?",
          answer:
            "allOf() creates a CompletableFuture that completes when all supplied futures have completed."
        },
        {
          question: "What is CompletableFuture.anyOf()?",
          answer:
            "anyOf() creates a CompletableFuture that completes when any one of the supplied futures completes."
        },
        {
          question: "Which thread pool does supplyAsync() use by default?",
          answer:
            "When no Executor is supplied, asynchronous execution uses the default asynchronous execution facility, which is based on the common ForkJoinPool."
        },
        {
          question: "Why use a custom Executor with CompletableFuture?",
          answer:
            "A custom Executor provides explicit control over the threads used for asynchronous work and can help isolate workloads."
        },
        {
          question: "What is the difference between join() and get()?",
          answer:
            "get() throws checked exceptions such as InterruptedException and ExecutionException. join() does not require checked exception handling and wraps exceptional completion in CompletionException."
        },
        {
          question: "Does Java 8 CompletableFuture support orTimeout()?",
          answer:
            "No. orTimeout() was introduced in Java 9. In Java 8, timeout behavior must be implemented using other concurrency utilities such as ScheduledExecutorService."
        },
        {
          question: "How would you combine two independent service calls?",
          answer:
            "Start both asynchronous operations and use thenCombine() when their two results need to be combined."
        },
        {
          question: "How would you handle a failure in an asynchronous pipeline?",
          answer:
            "Depending on the requirement, use exceptionally() for fallback recovery, handle() to transform success or failure into a result, or whenComplete() for logging and observation."
        }
      ]
    }
  ]
};