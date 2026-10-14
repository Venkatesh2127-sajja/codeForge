export const futureTask = {
  id: "future-task",

  slug: "future-task",

  title: "FutureTask — Callable, Future, and Task Execution",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn how FutureTask connects Callable and Future, how it executes asynchronous tasks, retrieves results, handles exceptions, and supports cancellation.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-future-task",
      title: "1. What is FutureTask?",

      paragraphs: [
        "FutureTask is a class in java.util.concurrent that represents a cancellable asynchronous computation.",
        "It implements both Runnable and Future."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Task completed";
    });`
      }
    },

    {
      id: "important-interfaces",
      title: "2. FutureTask Implements Runnable and Future",

      paragraphs: [
        "This is the most important point to remember for interviews.",
        "Because FutureTask implements Runnable, it can be passed to a Thread or Executor.",
        "Because it implements Future, the caller can retrieve the result, check completion, or cancel the task."
      ],

      code: {
        language: "text",
        code: `FutureTask
     |
     +---- Runnable
     |
     +---- Future`
      }
    },

    {
      id: "callable-constructor",
      title: "3. FutureTask with Callable",

      paragraphs: [
        "A common constructor accepts a Callable.",
        "The Callable performs the computation and produces the result."
      ],

      code: {
        language: "java",
        code: `Callable<Integer> callable = () -> {
    return 100;
};

FutureTask<Integer> task =
    new FutureTask<>(callable);`
      }
    },

    {
      id: "execute-thread",
      title: "4. Running FutureTask with Thread",

      code: {
        language: "java",
        code: `FutureTask<Integer> task =
    new FutureTask<>(() -> {
        return 100;
    });

Thread thread =
    new Thread(task);

thread.start();

Integer result =
    task.get();

System.out.println(result);`
      },

      paragraphs: [
        "The Thread executes FutureTask because FutureTask implements Runnable.",
        "The result can then be obtained through Future.get()."
      ]
    },

    {
      id: "executor",
      title: "5. Running FutureTask with ExecutorService",

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Hello";
    });

executor.execute(task);

String result =
    task.get();

System.out.println(result);

executor.shutdown();`
      },

      paragraphs: [
        "FutureTask can be submitted to an Executor because it is a Runnable."
      ]
    },

    {
      id: "future-get",
      title: "6. FutureTask get()",

      paragraphs: [
        "get() returns the result of the computation.",
        "If the computation has not completed, get() waits for it."
      ],

      code: {
        language: "java",
        code: `FutureTask<Integer> task =
    new FutureTask<>(() -> {
        return 42;
    });

executor.execute(task);

Integer result =
    task.get();`
      }
    },

    {
      id: "get-exceptions",
      title: "7. Exceptions from get()",

      paragraphs: [
        "FutureTask.get() can throw InterruptedException if the waiting thread is interrupted.",
        "If the computation throws an exception, get() reports it through ExecutionException."
      ],

      code: {
        language: "java",
        code: `FutureTask<Integer> task =
    new FutureTask<>(() -> {
        throw new IllegalStateException(
            "Calculation failed"
        );
    });

executor.execute(task);

try {
    task.get();
} catch (ExecutionException e) {
    System.out.println(
        e.getCause()
    );
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "is-done",
      title: "8. isDone()",

      paragraphs: [
        "isDone() checks whether the computation has completed.",
        "It returns true when the task completed normally, failed, or was cancelled."
      ],

      code: {
        language: "java",
        code: `if (task.isDone()) {
    System.out.println(
        "Task completed"
    );
}`
      }
    },

    {
      id: "cancel",
      title: "9. cancel()",

      paragraphs: [
        "FutureTask supports cancellation through Future.cancel()."
      ],

      code: {
        language: "java",
        code: `boolean cancelled =
    task.cancel(true);`
      },

      bullets: [
        "true requests interruption if the task is running",
        "false does not request interruption",
        "Cancellation is cooperative",
        "Cancellation does not guarantee that arbitrary code immediately stops"
      ]
    },

    {
      id: "is-cancelled",
      title: "10. isCancelled()",

      code: {
        language: "java",
        code: `if (task.isCancelled()) {
    System.out.println(
        "Task was cancelled"
    );
}`
      },

      paragraphs: [
        "isCancelled() indicates whether the FutureTask was cancelled before normal completion."
      ]
    },

    {
      id: "runnable-future",
      title: "11. FutureTask as Runnable and Future",

      paragraphs: [
        "FutureTask is useful because one object represents both the executable task and the future result."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Result";
    });

Runnable runnable = task;

Future<String> future = task;`
      }
    },

    {
      id: "submit-futuretask",
      title: "12. FutureTask with submit()",

      paragraphs: [
        "FutureTask can also be passed to ExecutorService.submit(), but this is usually unnecessary because submit() already creates and returns a Future for the submitted task.",
        "For normal application code, submitting a Callable directly is usually simpler."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Hello";
    });

Future<?> future =
    executor.submit(task);`
      }
    },

    {
      id: "execute-vs-futuretask",
      title: "13. execute() with FutureTask",

      paragraphs: [
        "A common use is to pass FutureTask directly to execute()."
      ],

      code: {
        language: "java",
        code: `FutureTask<Integer> task =
    new FutureTask<>(() -> {
        return 200;
    });

executor.execute(task);

Integer result =
    task.get();`
      }
    },

    {
      id: "new-task-for",
      title: "14. newTaskFor()",

      paragraphs: [
        "AbstractExecutorService provides newTaskFor() methods that create RunnableFuture objects for submitted Runnable or Callable tasks.",
        "ThreadPoolExecutor inherits these facilities through AbstractExecutorService."
      ],

      code: {
        language: "java",
        code: `RunnableFuture<Integer> task =
    executor.newTaskFor(
        () -> 100
    );`
      }
    },

    {
      id: "internal-state",
      title: "15. FutureTask Internal State",

      paragraphs: [
        "FutureTask maintains internal state representing the lifecycle of the computation.",
        "Conceptually, the task moves from incomplete to a completed, failed, or cancelled state."
      ],

      code: {
        language: "text",
        code: `NEW
 |
 +----> NORMAL
 |
 +----> EXCEPTIONAL
 |
 +----> CANCELLED
 |
 +----> INTERRUPTED`
      }
    },

    {
      id: "run-method",
      title: "16. What Does run() Do?",

      paragraphs: [
        "FutureTask implements Runnable, so its run() method performs the computation represented by the underlying Callable or Runnable.",
        "The executor or Thread calls run()."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(() -> {
        return "Completed";
    });

executor.execute(task);`
      }
    },

    {
      id: "once",
      title: "17. FutureTask Runs Once",

      paragraphs: [
        "A FutureTask represents one computation.",
        "Once it has completed or been cancelled, calling run() again does not perform the computation again."
      ],

      code: {
        language: "java",
        code: `FutureTask<Integer> task =
    new FutureTask<>(() -> 10);

task.run();
task.run();`
      }
    },

    {
      id: "done-hook",
      title: "18. done() Method",

      paragraphs: [
        "FutureTask provides a protected done() method that can be overridden to perform an action when the task completes or is cancelled."
      ],

      code: {
        language: "java",
        code: `FutureTask<String> task =
    new FutureTask<>(
        () -> "Completed"
    ) {
        @Override
        protected void done() {
            System.out.println(
                "Task finished"
            );
        }
    };`
      }
    },

    {
      id: "real-world",
      title: "19. Real-World Backend Example",

      paragraphs: [
        "Imagine a backend service that calculates a report asynchronously."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(4);

FutureTask<Report> reportTask =
    new FutureTask<>(
        () -> generateReport()
    );

executor.execute(reportTask);

try {
    Report report =
        reportTask.get();

    saveReport(report);

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();

} catch (ExecutionException e) {

    System.out.println(
        "Report generation failed: " +
        e.getCause()
    );

} finally {

    executor.shutdown();
}`
      }
    },

    {
      id: "future-vs-futuretask",
      title: "20. Future vs FutureTask",

      bullets: [
        "Future is an interface",
        "FutureTask is a concrete class",
        "Future represents the result of asynchronous computation",
        "FutureTask implements Future",
        "FutureTask also implements Runnable",
        "FutureTask can be executed by Thread or Executor"
      ]
    },

    {
      id: "callable-future-futuretask",
      title: "21. Callable → FutureTask → Executor",

      code: {
        language: "text",
        code: `Callable<T>
     |
     v
FutureTask<T>
     |
     +------ Runnable
     |
     +------ Future<T>
     |
     v
Executor
     |
     v
Result`
      }
    },

    {
      id: "when-use",
      title: "22. When Would You Use FutureTask?",

      bullets: [
        "When you need an object that is both Runnable and Future",
        "When integrating a Callable with an Executor or Thread",
        "When you need explicit control over a future computation",
        "When implementing lower-level concurrency utilities",
        "For normal application code, ExecutorService.submit() is often simpler"
      ]
    },

    {
      id: "interview-questions",
      title: "23. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is FutureTask?",

          answer:
            "FutureTask is a java.util.concurrent class that represents a cancellable asynchronous computation and implements both Runnable and Future."
        },

        {
          question: "Why does FutureTask implement Runnable and Future?",

          answer:
            "Runnable allows the task to be executed by a Thread or Executor, while Future allows the caller to retrieve the result, check completion, or cancel the task."
        },

        {
          question: "Can FutureTask accept Callable?",

          answer:
            "Yes. A Callable can be passed to the FutureTask constructor, allowing the task to produce a result."
        },

        {
          question: "Does FutureTask.get() block?",

          answer:
            "Yes. If the computation has not completed, get() waits until the result is available, the task fails, or it is cancelled."
        },

        {
          question: "What happens if the Callable throws an exception?",

          answer:
            "The exception is captured by the FutureTask and is reported through ExecutionException when get() is called."
        },

        {
          question: "Can FutureTask be cancelled?",

          answer:
            "Yes. FutureTask implements Future, so cancel() can be used to request cancellation."
        },

        {
          question: "Is FutureTask commonly required when using ExecutorService.submit()?",

          answer:
            "Usually no. submit() already creates and returns a Future. FutureTask is more useful when you specifically need the same object to act as both Runnable and Future."
        }
      ]
    },

    {
      id: "interview-version",
      title: "24. Interview Version",

      paragraphs: [
        "FutureTask is a concrete implementation of Future and Runnable. It can wrap a Callable, execute the computation through a Thread or Executor, and provide the result through get(). It also supports cancellation and completion tracking. In normal ExecutorService code, submit() is often simpler, but FutureTask is important for understanding Java concurrency internals."
      ]
    },

    {
      id: "final-note",
      title: "25. Final Note",

      paragraphs: [
        "The most important point to remember is:"
      ],

      bullets: [
        "Future → represents an asynchronous result",
        "Runnable → represents executable work",
        "FutureTask → combines Runnable + Future",
        "Callable → can produce a result",
        "FutureTask.get() → retrieves the result",
        "FutureTask.cancel() → requests cancellation"
      ]
    }
  ]
};