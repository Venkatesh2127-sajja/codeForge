export const callableInterface = {
  id: "callable-interface",
  slug: "callable-interface",
  title: "Implementing Callable",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to use Callable in Java to execute tasks that return results and can throw checked exceptions, and understand Callable, Future, submit(), and get().",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-callable",
      title: "1. What is Callable?",
      paragraphs: [
        "Callable is an interface in the java.util.concurrent package.",
        "It is similar to Runnable, but Callable can return a result and can throw checked exceptions.",
        "Callable is commonly used with ExecutorService."
      ],
      code: {
        language: "java",
        code: `@FunctionalInterface
public interface Callable<V> {

    V call() throws Exception;
}`
      }
    },

    {
      id: "runnable-vs-callable",
      title: "2. Runnable vs Callable",
      paragraphs: [
        "Runnable and Callable both represent tasks, but they have important differences."
      ],
      bullets: [
        "Runnable uses run().",
        "Callable uses call().",
        "Runnable does not return a result.",
        "Callable returns a result.",
        "Runnable.run() cannot declare checked exceptions.",
        "Callable.call() can throw checked exceptions.",
        "Callable is commonly submitted using ExecutorService."
      ]
    },

    {
      id: "implement-callable",
      title: "3. Implementing Callable",
      paragraphs: [
        "A class can implement Callable and specify the type of value it will return.",
        "The call() method contains the task logic."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.Callable;

class CalculationTask implements Callable<Integer> {

    @Override
    public Integer call() {

        return 100 + 200;
    }
}`
      }
    },

    {
      id: "callable-with-executor",
      title: "4. Executing Callable with ExecutorService",
      paragraphs: [
        "Callable is normally executed through ExecutorService.",
        "The submit() method accepts a Callable and returns a Future."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {

    public static void main(String[] args)
        throws Exception {

        ExecutorService executor =
            Executors.newSingleThreadExecutor();

        Callable<Integer> task = () -> {
            return 100 + 200;
        };

        Future<Integer> future =
            executor.submit(task);

        Integer result = future.get();

        System.out.println(result);

        executor.shutdown();
    }
}`
      },
      output: "300"
    },

    {
      id: "what-is-future",
      title: "5. What is Future?",
      paragraphs: [
        "Future represents the result of an asynchronous computation.",
        "When a Callable is submitted to an ExecutorService, the executor returns a Future object.",
        "The Future can later be used to retrieve the result."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(task);`
      }
    },

    {
      id: "future-get",
      title: "6. Using Future.get()",
      paragraphs: [
        "Future.get() returns the result produced by the Callable.",
        "If the task has not completed yet, get() waits for the task to finish."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {
    return "Hello from Callable";
};

Future<String> future =
    executor.submit(task);

String result = future.get();

System.out.println(result);`
      },
      output: "Hello from Callable"
    },

    {
      id: "get-blocking",
      title: "7. Is Future.get() Blocking?",
      paragraphs: [
        "Yes. The no-argument get() method waits if the task has not completed.",
        "This means the calling thread may block until the Callable produces a result."
      ],
      code: {
        language: "java",
        code: `Callable<Integer> task = () -> {

    Thread.sleep(2000);

    return 500;
};

Future<Integer> future =
    executor.submit(task);

System.out.println("Waiting...");

Integer result = future.get();

System.out.println(result);`
      },
      output: "Waiting...\n500"
    },

    {
      id: "timed-get",
      title: "8. Future.get() with Timeout",
      paragraphs: [
        "Future provides a timed version of get().",
        "This allows the caller to wait only for a specified amount of time."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.TimeUnit;

Integer result =
    future.get(2, TimeUnit.SECONDS);`
      }
    },

    {
      id: "callable-exception",
      title: "9. Callable Can Throw Checked Exceptions",
      paragraphs: [
        "Unlike Runnable.run(), Callable.call() declares throws Exception.",
        "Therefore, a Callable can perform operations that throw checked exceptions."
      ],
      code: {
        language: "java",
        code: `Callable<String> task = () -> {

    Thread.sleep(1000);

    return "Completed";
};`
      }
    },

    {
      id: "future-exception",
      title: "10. Handling Callable Exceptions",
      paragraphs: [
        "If a Callable throws an exception, the exception is observed when the result is retrieved through Future.get().",
        "The exception is wrapped in ExecutionException."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.ExecutionException;

try {

    String result = future.get();

    System.out.println(result);

} catch (ExecutionException e) {

    System.out.println(
        "Task failed: " +
        e.getCause().getMessage()
    );
}`
      }
    },

    {
      id: "callable-generic",
      title: "11. Callable with Different Return Types",
      paragraphs: [
        "Callable uses generics, so it can return different types such as String, Integer, Boolean, or custom objects."
      ],
      code: {
        language: "java",
        code: `Callable<String> stringTask =
    () -> "Java";

Callable<Integer> numberTask =
    () -> 100;

Callable<Boolean> booleanTask =
    () -> true;`
      }
    },

    {
      id: "callable-string",
      title: "12. Callable Returning String",
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
      id: "callable-object",
      title: "13. Callable Returning an Object",
      paragraphs: [
        "Callable can return custom objects, which is useful in backend applications."
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

System.out.println(user.getName());`
      },
      output: "John"
    },

    {
      id: "submit-callable",
      title: "14. ExecutorService.submit() with Callable",
      paragraphs: [
        "ExecutorService provides submit(Callable<T>) for submitting Callable tasks.",
        "The method returns Future<T>, where T is the Callable's result type."
      ],
      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

Callable<Integer> task =
    () -> 10 * 20;

Future<Integer> future =
    executor.submit(task);`
      }
    },

    {
      id: "execute-vs-submit",
      title: "15. execute() vs submit()",
      paragraphs: [
        "execute() is used for Runnable tasks and does not return a Future.",
        "submit() can accept Runnable or Callable and returns a Future."
      ],
      bullets: [
        "execute(Runnable) → no Future result.",
        "submit(Runnable) → returns Future<?>.",
        "submit(Callable<T>) → returns Future<T>.",
        "Callable is useful when a task needs to return a result."
      ]
    },

    {
      id: "callable-lambda",
      title: "16. Callable with Lambda",
      paragraphs: [
        "Callable is a functional interface, so it can be written using a lambda expression."
      ],
      code: {
        language: "java",
        code: `Callable<Integer> task =
    () -> 50 + 50;

Future<Integer> future =
    executor.submit(task);

System.out.println(
    future.get()
);`
      },
      output: "100"
    },

    {
      id: "multiple-callable",
      title: "17. Executing Multiple Callable Tasks",
      paragraphs: [
        "Multiple Callable tasks can be submitted to the same ExecutorService.",
        "Each submission returns its own Future."
      ],
      code: {
        language: "java",
        code: `Callable<Integer> task1 =
    () -> 100;

Callable<Integer> task2 =
    () -> 200;

Future<Integer> future1 =
    executor.submit(task1);

Future<Integer> future2 =
    executor.submit(task2);

System.out.println(future1.get());
System.out.println(future2.get());`
      },
      output: "100\n200"
    },

    {
      id: "future-is-done",
      title: "18. Future.isDone()",
      paragraphs: [
        "isDone() tells whether the asynchronous computation has completed.",
        "It returns true when the task completed normally, failed with an exception, or was cancelled."
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
      id: "future-cancel",
      title: "19. Future.cancel()",
      paragraphs: [
        "Future.cancel() attempts to cancel the task.",
        "Whether a running task actually stops depends on interruption handling and the task's behavior."
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
      id: "future-is-cancelled",
      title: "20. Future.isCancelled()",
      paragraphs: [
        "isCancelled() tells whether the Future was cancelled before completion."
      ],
      code: {
        language: "java",
        code: `Future<Integer> future =
    executor.submit(() -> 100);

future.cancel(true);

System.out.println(
    future.isCancelled()
);`
      },
      output: "true"
    },

    {
      id: "invoke-all",
      title: "21. invokeAll()",
      paragraphs: [
        "ExecutorService provides invokeAll() for submitting a collection of Callable tasks.",
        "It returns a list of Future objects corresponding to the submitted tasks."
      ],
      code: {
        language: "java",
        code: `List<Callable<Integer>> tasks =
    List.of(
        () -> 10,
        () -> 20,
        () -> 30
    );

List<Future<Integer>> futures =
    executor.invokeAll(tasks);

for (Future<Integer> future : futures) {
    System.out.println(future.get());
}`
      },
      output: "10\n20\n30"
    },

    {
      id: "invoke-any",
      title: "22. invokeAny()",
      paragraphs: [
        "invokeAny() submits multiple Callable tasks and returns the result of one task that completes successfully.",
        "The executor may cancel unfinished tasks after a successful result is obtained."
      ],
      code: {
        language: "java",
        code: `List<Callable<String>> tasks =
    List.of(
        () -> "Task 1",
        () -> "Task 2",
        () -> "Task 3"
    );

String result =
    executor.invokeAny(tasks);

System.out.println(result);`
      }
    },

    {
      id: "callable-vs-runnable",
      title: "23. Callable vs Runnable",
      paragraphs: [
        "The main difference is that Callable can return a result and declare checked exceptions."
      ],
      bullets: [
        "Runnable → run().",
        "Callable → call().",
        "Runnable → no return value.",
        "Callable<T> → returns T.",
        "Runnable → cannot declare checked exceptions.",
        "Callable → can throw checked exceptions.",
        "Runnable can be used with Thread.",
        "Callable is commonly used with ExecutorService."
      ]
    },

    {
      id: "real-world",
      title: "24. Real-World Example",
      paragraphs: [
        "Consider a backend application that needs to retrieve customer information and return it to the calling code.",
        "Callable can represent the operation and Future can provide the result later."
      ],
      code: {
        language: "java",
        code: `Callable<String> customerTask = () -> {

    // Simulate database work
    Thread.sleep(1000);

    return "Customer-101";
};

Future<String> future =
    executor.submit(customerTask);

String customer =
    future.get();

System.out.println(customer);`
      },
      output: "Customer-101"
    },

    {
      id: "future-blocking-warning",
      title: "25. Important Future.get() Warning",
      paragraphs: [
        "Although Callable allows asynchronous task submission, calling get() immediately can make the calling thread wait.",
        "If multiple independent tasks are submitted, a design can sometimes submit them first and retrieve their results later."
      ],
      code: {
        language: "java",
        code: `Future<Integer> first =
    executor.submit(() -> 100);

Future<Integer> second =
    executor.submit(() -> 200);

// Tasks can execute concurrently.

Integer result1 = first.get();
Integer result2 = second.get();

System.out.println(result1 + result2);`
      },
      output: "300"
    },

    {
      id: "callable-execution-flow",
      title: "26. Callable Execution Flow",
      paragraphs: [
        "The complete flow can be understood as a sequence."
      ],
      bullets: [
        "Create Callable task.",
        "Create ExecutorService.",
        "Submit Callable using submit().",
        "Executor schedules the task.",
        "Executor returns Future.",
        "Callable executes call().",
        "Callable produces a result.",
        "Future.get() retrieves the result."
      ]
    },

    {
      id: "common-mistakes",
      title: "27. Common Callable Mistakes",
      paragraphs: [
        "There are several common mistakes when working with Callable and Future."
      ],
      bullets: [
        "Calling get() immediately when asynchronous coordination was intended.",
        "Forgetting to shut down the ExecutorService.",
        "Ignoring ExecutionException.",
        "Ignoring InterruptedException.",
        "Assuming cancel(true) forcibly kills a task.",
        "Creating unlimited executor threads.",
        "Ignoring timeout requirements for long-running tasks."
      ]
    },

    {
      id: "best-practices",
      title: "28. Callable Best Practices",
      bullets: [
        "Use Callable when a task needs to return a result.",
        "Use Future to represent the pending result.",
        "Handle InterruptedException correctly.",
        "Handle ExecutionException when retrieving results.",
        "Use timeouts when indefinite waiting is undesirable.",
        "Shut down ExecutorService when it is no longer needed.",
        "Prefer managed executors instead of manually creating many threads.",
        "Consider CompletableFuture for more advanced asynchronous composition."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "Callable is a functional interface used to represent tasks that return results.",
        "The task logic is written inside call().",
        "Callable can throw checked exceptions.",
        "ExecutorService.submit() can execute Callable tasks.",
        "submit() returns a Future.",
        "Future.get() retrieves the result and may block until the task completes."
      ],
      bullets: [
        "Callable<T> → task returning T.",
        "call() → task method.",
        "submit() → submit task.",
        "Future<T> → represents pending result.",
        "get() → retrieve result.",
        "isDone() → check completion.",
        "cancel() → attempt cancellation.",
        "invokeAll() → execute multiple Callable tasks.",
        "invokeAny() → obtain one successful result."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is Callable in Java?",
          answer:
            "Callable is a functional interface from java.util.concurrent that represents a task which can return a result and throw checked exceptions."
        },
        {
          question: "What is the difference between Runnable and Callable?",
          answer:
            "Runnable uses run() and does not return a result, while Callable uses call(), returns a value, and can throw checked exceptions."
        },
        {
          question: "What does Callable.call() return?",
          answer:
            "It returns the generic type specified by Callable<T>."
        },
        {
          question: "How do you execute Callable?",
          answer:
            "Callable is commonly submitted to an ExecutorService using submit()."
        },
        {
          question: "What does submit() return for Callable?",
          answer:
            "It returns a Future representing the pending result of the Callable."
        },
        {
          question: "What does Future.get() do?",
          answer:
            "It retrieves the result of the asynchronous computation and waits if the task has not completed."
        },
        {
          question: "Can Callable throw checked exceptions?",
          answer:
            "Yes. Callable.call() declares throws Exception."
        },
        {
          question: "What happens if Callable throws an exception?",
          answer:
            "When the result is retrieved using Future.get(), the failure is reported through ExecutionException, whose cause can be inspected."
        },
        {
          question: "What is the difference between execute() and submit()?",
          answer:
            "execute() accepts Runnable and does not return a Future. submit() accepts Runnable or Callable and returns a Future."
        },
        {
          question: "What is invokeAll()?",
          answer:
            "invokeAll() submits a collection of Callable tasks and returns a list of Future objects after the submitted tasks have completed or the operation has otherwise terminated."
        }
      ]
    }
  ]
};