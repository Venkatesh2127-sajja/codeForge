export const creatingThread = {
  id: "creating-thread",
  slug: "creating-thread",
  title: "Creating a Thread in Java",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to create and start threads in Java using the Thread class, Runnable, lambda expressions, and Callable, understand start() vs run(), thread naming, and the recommended approach for real-world applications.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "thread-creation-overview",
      title: "1. How Can We Create a Thread in Java?",

      paragraphs: [
        "Java provides several ways to define work that can execute on a thread.",
        "The traditional approaches are extending the Thread class and implementing Runnable.",
        "Java also provides Callable for tasks that need to return a result or throw checked exceptions.",
        "For production applications, tasks are commonly submitted to ExecutorService rather than manually creating a large number of Thread objects."
      ],

      bullets: [
        "Extend Thread.",
        "Implement Runnable.",
        "Use Runnable with a lambda expression.",
        "Use Callable for tasks that return a result.",
        "Use ExecutorService to manage threads in real applications."
      ]
    },

    {
      id: "thread-class",
      title: "2. Creating a Thread by Extending Thread",

      paragraphs: [
        "One traditional approach is to create a class that extends Thread and override its run() method.",
        "The code inside run() represents the work performed by the thread.",
        "Calling start() begins execution of the new thread."
      ],

      code: {
        language: "java",
        code: `class WorkerThread extends Thread {

    @Override
    public void run() {
        System.out.println("Worker thread is running");
    }
}

public class ThreadExample {

    public static void main(String[] args) {

        WorkerThread worker = new WorkerThread();

        worker.start();
    }
}`
      },

      output: "Worker thread is running",

      bullets: [
        "Extend Thread.",
        "Override run().",
        "Create the thread object.",
        "Call start().",
        "The JVM executes run() on the new thread."
      ]
    },

    {
      id: "run-method",
      title: "3. What is the run() Method?",

      paragraphs: [
        "The run() method contains the task that a Thread performs.",
        "You normally override run() when extending Thread.",
        "However, calling run() directly does not create a new thread."
      ],

      code: {
        language: "java",
        code: `class Worker extends Thread {

    @Override
    public void run() {
        System.out.println(
            "Task executed by worker"
        );
    }
}`
      },

      bullets: [
        "run() contains the thread's task.",
        "run() can be overridden.",
        "run() should normally be started indirectly through start().",
        "Calling run() directly executes it like a normal method."
      ]
    },

    {
      id: "start-method",
      title: "4. What is the start() Method?",

      paragraphs: [
        "The start() method starts a new thread of execution.",
        "After start() is called, the JVM schedules the new thread and eventually invokes its run() method.",
        "The exact moment at which run() executes is determined by scheduling."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {
    System.out.println("Worker running");
});

worker.start();`
      },

      bullets: [
        "start() begins a new thread.",
        "start() eventually causes run() to execute on that thread.",
        "start() should be called only once for a Thread object.",
        "start() does not guarantee immediate execution."
      ]
    },

    {
      id: "start-vs-run",
      title: "5. start() vs run()",

      paragraphs: [
        "This is one of the most important beginner concepts in Java multithreading.",
        "Calling start() creates a new execution path. Calling run() directly does not create a new thread."
      ],

      code: {
        language: "java",
        code: `public class StartVsRun {

    public static void main(String[] args) {

        Thread worker = new Thread(() -> {

            System.out.println(
                "Running in: "
                + Thread.currentThread().getName()
            );
        });

        worker.run();

        Thread anotherWorker = new Thread(() -> {

            System.out.println(
                "Running in: "
                + Thread.currentThread().getName()
            );
        });

        anotherWorker.start();
    }
}`
      },

      output:
        "Running in: main\nRunning in: Thread-0",

      bullets: [
        "run() directly → current thread executes the method.",
        "start() → a new thread is created and executes run().",
        "Calling run() is just a normal method call.",
        "Calling start() is the correct way to start a Thread."
      ]
    },

    {
      id: "runnable",
      title: "6. Creating a Thread Using Runnable",

      paragraphs: [
        "Runnable represents a task that can be executed by a thread.",
        "Instead of making the task class inherit from Thread, we can implement Runnable and pass the Runnable object to a Thread."
      ],

      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Task is running");
    }
}

public class RunnableExample {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread worker = new Thread(task);

        worker.start();
    }
}`
      },

      output: "Task is running",

      bullets: [
        "Runnable represents the task.",
        "Thread represents the execution mechanism.",
        "The Runnable object is passed to Thread.",
        "start() begins execution."
      ]
    },

    {
      id: "why-runnable",
      title: "7. Why Prefer Runnable Over Extending Thread?",

      paragraphs: [
        "Java supports single inheritance, so a class that extends Thread cannot extend another class.",
        "Using Runnable separates the task from the thread that executes it.",
        "This makes the design more flexible because the same task can potentially be executed by different thread-management mechanisms."
      ],

      code: {
        language: "java",
        code: `class PaymentService {

    void processPayment() {
        System.out.println("Payment processed");
    }
}

class PaymentTask implements Runnable {

    private final PaymentService service;

    PaymentTask(PaymentService service) {
        this.service = service;
    }

    @Override
    public void run() {
        service.processPayment();
    }
}`
      },

      bullets: [
        "Runnable separates task logic from thread management.",
        "The task class remains free to extend another class.",
        "Runnable works naturally with ExecutorService.",
        "Runnable is generally preferred when you only need a task with no returned result."
      ]
    },

    {
      id: "lambda-runnable",
      title: "8. Runnable with Lambda Expression",

      paragraphs: [
        "Runnable is a functional interface, so it can be implemented using a lambda expression.",
        "This is a concise way to define a small task."
      ],

      code: {
        language: "java",
        code: `public class LambdaRunnableExample {

    public static void main(String[] args) {

        Runnable task = () -> {
            System.out.println("Task is running");
        };

        Thread worker = new Thread(task);

        worker.start();
    }
}`
      },

      output: "Task is running"
    },

    {
      id: "inline-lambda",
      title: "9. Creating a Thread Directly with a Lambda",

      paragraphs: [
        "For very small tasks, the Runnable can be passed directly to the Thread constructor."
      ],

      code: {
        language: "java",
        code: `public class DirectLambdaExample {

    public static void main(String[] args) {

        Thread worker = new Thread(() -> {
            System.out.println("Hello from worker");
        });

        worker.start();
    }
}`
      },

      output: "Hello from worker",

      bullets: [
        "Short and readable.",
        "Useful for small examples.",
        "For larger tasks, separating task logic into a class can improve maintainability."
      ]
    },

    {
      id: "thread-name",
      title: "10. Creating a Thread with a Name",

      paragraphs: [
        "Java allows a thread name to be specified when creating the Thread.",
        "Meaningful names are useful when reading logs, debugging applications, and analyzing thread dumps."
      ],

      code: {
        language: "java",
        code: `public class NamedThreadExample {

    public static void main(String[] args) {

        Thread worker = new Thread(
            () -> {
                System.out.println(
                    "Processing payment"
                );
            },
            "payment-worker"
        );

        worker.start();
    }
}`
      },

      bullets: [
        "Thread names improve observability.",
        "Use meaningful names in backend applications.",
        "Thread.getName() returns the name."
      ]
    },

    {
      id: "set-name",
      title: "11. Setting a Thread Name",

      paragraphs: [
        "A thread name can also be changed using setName().",
        "The name should ideally describe the role or type of work performed by the thread."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {
    System.out.println("Processing");
});

worker.setName("order-worker");

worker.start();

System.out.println(worker.getName());`
      },

      output: "order-worker"
    },

    {
      id: "thread-current",
      title: "12. Getting the Current Thread",

      paragraphs: [
        "Thread.currentThread() returns the Thread object representing the thread that is currently executing the code."
      ],

      code: {
        language: "java",
        code: `public class CurrentThreadExample {

    public static void main(String[] args) {

        Thread worker = new Thread(() -> {

            Thread current =
                Thread.currentThread();

            System.out.println(
                "Name: " + current.getName()
            );
        });

        worker.start();
    }
}`
      },

      output: "Name: Thread-0"
    },

    {
      id: "multiple-threads",
      title: "13. Creating Multiple Threads",

      paragraphs: [
        "An application can create multiple Thread objects when multiple independent tasks need to execute concurrently."
      ],

      code: {
        language: "java",
        code: `public class MultipleThreadsExample {

    public static void main(String[] args) {

        Thread thread1 = new Thread(() ->
            System.out.println("Task 1")
        );

        Thread thread2 = new Thread(() ->
            System.out.println("Task 2")
        );

        Thread thread3 = new Thread(() ->
            System.out.println("Task 3")
        );

        thread1.start();
        thread2.start();
        thread3.start();
    }
}`
      },

      bullets: [
        "Each Thread can execute a different task.",
        "The output order is not guaranteed.",
        "Creating many threads manually is not ideal for large applications.",
        "ExecutorService is covered later for managing many tasks."
      ]
    },

    {
      id: "thread-start-once",
      title: "14. A Thread Can Be Started Only Once",

      paragraphs: [
        "A Thread object can only be started once.",
        "Trying to call start() again on the same Thread object results in IllegalThreadStateException."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {
    System.out.println("Running");
});

worker.start();

// Invalid:
// worker.start();`
      },

      bullets: [
        "One Thread object → one start().",
        "A terminated Thread cannot be restarted.",
        "Create another Thread object for another execution."
      ]
    },

    {
      id: "anonymous-class",
      title: "15. Runnable Using Anonymous Class",

      paragraphs: [
        "Before lambda expressions became available in Java 8, anonymous classes were commonly used to implement Runnable."
      ],

      code: {
        language: "java",
        code: `public class AnonymousRunnableExample {

    public static void main(String[] args) {

        Runnable task = new Runnable() {

            @Override
            public void run() {
                System.out.println(
                    "Task running"
                );
            }
        };

        Thread worker = new Thread(task);

        worker.start();
    }
}`
      },

      output: "Task running",

      bullets: [
        "Anonymous classes avoid creating a separate named class.",
        "Lambda expressions are usually more concise for Runnable."
      ]
    },

    {
      id: "thread-inheritance",
      title: "16. Thread Class and Inheritance",

      paragraphs: [
        "When a class extends Thread, it becomes a subclass of Thread.",
        "Because Java allows a class to extend only one class, using Thread inheritance can restrict the class's inheritance options."
      ],

      code: {
        language: "java",
        code: `class Worker extends Thread {

    @Override
    public void run() {
        System.out.println("Working");
    }
}`
      },

      bullets: [
        "Extending Thread uses the single inheritance relationship.",
        "The class becomes a Thread subclass.",
        "Runnable avoids consuming the class's single superclass choice."
      ]
    },

    {
      id: "runnable-reuse",
      title: "17. Reusing a Runnable Task",

      paragraphs: [
        "A Runnable represents task logic independently of a particular Thread object.",
        "The same Runnable instance can be supplied to multiple Thread objects when the task design safely supports such sharing."
      ],

      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println(
        "Executing task"
    );
};

Thread t1 = new Thread(task);
Thread t2 = new Thread(task);

t1.start();
t2.start();`
      },

      bullets: [
        "Runnable separates task from thread.",
        "Multiple threads can execute the same Runnable instance.",
        "If the Runnable contains mutable shared state, thread safety must be considered."
      ]
    },

    {
      id: "thread-constructor",
      title: "18. Common Thread Constructors",

      paragraphs: [
        "Thread provides constructors that allow you to create threads with a Runnable task and optionally a thread name."
      ],

      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Running");
};

Thread t1 = new Thread(task);

Thread t2 = new Thread(
    task,
    "worker-thread"
);`
      },

      bullets: [
        "new Thread().",
        "new Thread(Runnable).",
        "new Thread(Runnable, String).",
        "The exact available constructors should be checked against the Java version/API documentation when using less common overloads."
      ]
    },

    {
      id: "thread-exception",
      title: "19. Handling Exceptions in Thread Tasks",

      paragraphs: [
        "Runnable.run() cannot declare checked exceptions in its method signature.",
        "If a task performs an operation that throws a checked exception, the exception normally needs to be handled inside the Runnable or converted appropriately."
      ],

      code: {
        language: "java",
        code: `Runnable task = () -> {

    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();

        System.out.println(
            "Task interrupted"
        );
    }
};

Thread worker = new Thread(task);

worker.start();`
      },

      bullets: [
        "Handle InterruptedException appropriately.",
        "Do not silently ignore interruption.",
        "Restoring the interrupt status is often appropriate when the current code cannot fully handle the interruption."
      ]
    },

    {
      id: "callable-introduction",
      title: "20. Creating a Task with Callable",

      paragraphs: [
        "Callable is useful when a task needs to return a result.",
        "Unlike Runnable, Callable.call() returns a value and can declare checked exceptions.",
        "Callable is normally used together with ExecutorService and Future."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.Callable;

public class CallableExample {

    public static void main(String[] args) {

        Callable<Integer> task = () -> {
            return 10 + 20;
        };
    }
}`
      },

      bullets: [
        "Runnable → no return value.",
        "Callable<T> → returns T.",
        "Callable can throw checked exceptions.",
        "Callable is normally submitted to an ExecutorService."
      ]
    },

    {
      id: "runnable-vs-callable",
      title: "21. Runnable vs Callable",

      paragraphs: [
        "Runnable is appropriate when a task does not need to return a result.",
        "Callable is appropriate when a task needs to produce a result or declare checked exceptions."
      ],

      bullets: [
        "Runnable.run() → void.",
        "Callable.call() → returns a value.",
        "Runnable cannot declare checked exceptions from run().",
        "Callable.call() can declare checked exceptions.",
        "Callable is commonly used with Future."
      ]
    },

    {
      id: "thread-vs-runnable",
      title: "22. Thread vs Runnable",

      paragraphs: [
        "Thread represents an execution mechanism, while Runnable represents a task.",
        "This distinction is important because modern Java applications generally separate task definition from thread management."
      ],

      code: {
        language: "text",
        code: `Runnable
   |
   | represents
   v
  TASK
   |
   | executed by
   v
 Thread
   |
   v
Execution`
      },

      bullets: [
        "Runnable = what should be done.",
        "Thread = one way to execute it.",
        "ExecutorService = a higher-level mechanism for managing execution.",
        "Separating task and execution improves flexibility."
      ]
    },

    {
      id: "executor-introduction",
      title: "23. Why Not Create Threads Everywhere?",

      paragraphs: [
        "Manually creating a Thread for every task can become expensive and difficult to manage in large applications.",
        "Production systems commonly use executors and thread pools to control how tasks are executed."
      ],

      code: {
        language: "java",
        code: `// Simple example only

ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.submit(() ->
    System.out.println("Task running")
);

executor.shutdown();`
      },

      bullets: [
        "Thread creation has resource costs.",
        "Thread pools reuse worker threads.",
        "Executors can limit concurrency.",
        "Task submission becomes separate from thread creation.",
        "ExecutorService will be covered in detail later."
      ]
    },

    {
      id: "thread-daemon",
      title: "24. Creating a Daemon Thread",

      paragraphs: [
        "A thread can be marked as a daemon thread before it is started.",
        "Daemon threads do not prevent the JVM from shutting down after all non-daemon threads have terminated."
      ],

      code: {
        language: "java",
        code: `Thread background = new Thread(() -> {

    while (true) {
        System.out.println(
            "Background work"
        );
    }
});

background.setDaemon(true);

background.start();`
      },

      bullets: [
        "setDaemon(true) must be called before start().",
        "Daemon threads are suitable only for work that does not need guaranteed completion.",
        "Critical business operations should not depend on a daemon thread finishing."
      ]
    },

    {
      id: "thread-priority",
      title: "25. Setting Thread Priority",

      paragraphs: [
        "Java allows a thread priority to be specified.",
        "Priority is a scheduling hint and should not be used to guarantee execution order or application correctness."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {
    System.out.println("Working");
});

worker.setPriority(Thread.NORM_PRIORITY);

worker.start();`
      },

      bullets: [
        "MIN_PRIORITY = 1.",
        "NORM_PRIORITY = 5.",
        "MAX_PRIORITY = 10.",
        "Priority does not guarantee execution order."
      ]
    },

    {
      id: "thread-lifecycle-connection",
      title: "26. Connecting Thread Creation to Lifecycle",

      paragraphs: [
        "Thread creation is the beginning of the thread lifecycle.",
        "A newly created Thread starts in NEW state. Calling start() transitions it toward RUNNABLE, after which it may enter other states depending on its execution."
      ],

      code: {
        language: "text",
        code: `Create Thread
     |
     v
    NEW
     |
  start()
     |
     v
 RUNNABLE
     |
     +---- BLOCKED
     |
     +---- WAITING
     |
     +---- TIMED_WAITING
     |
     v
TERMINATED`
      }
    },

    {
      id: "backend-example",
      title: "27. Real-World Backend Example",

      paragraphs: [
        "Suppose a backend application receives a request to generate a report.",
        "The report-generation task can be represented as a Runnable and then submitted to a managed executor.",
        "The important design principle is that the business task should not need to know how many worker threads exist or how those threads are managed."
      ],

      code: {
        language: "java",
        code: `Runnable reportTask = () -> {
    System.out.println(
        "Generating report..."
    );
};

// Later:
// executor.submit(reportTask);`
      },

      bullets: [
        "Business task = Runnable.",
        "Thread management = executor.",
        "Worker thread = execution resource.",
        "This separation becomes important in Spring Boot applications."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",

      bullets: [
        "Calling run() when you intended to start a new thread.",
        "Calling start() more than once on the same Thread object.",
        "Creating too many threads manually.",
        "Extending Thread when the task should be separated from execution.",
        "Ignoring InterruptedException.",
        "Assuming thread execution order.",
        "Using thread priority as a synchronization mechanism.",
        "Using daemon threads for critical business operations."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",

      bullets: [
        "Prefer Runnable when defining a task without a return value.",
        "Use Callable when a task needs to return a result.",
        "Use meaningful thread names when manually creating threads.",
        "Use ExecutorService for managing groups of tasks.",
        "Avoid uncontrolled manual thread creation.",
        "Handle interruption correctly.",
        "Do not rely on scheduling order.",
        "Separate business task logic from thread management."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These questions cover the most important concepts about creating threads in Java."
      ],

      interviewQuestions: [
        {
          question: "How can you create a thread in Java?",
          answer:
            "Traditional approaches include extending Thread and implementing Runnable. Callable can be used for tasks that return results, usually through ExecutorService. Modern applications commonly use executor-based task execution."
        },
        {
          question: "What is the difference between Thread and Runnable?",
          answer:
            "Thread represents an execution mechanism, while Runnable represents the task to be executed. Runnable separates task logic from thread management and avoids consuming the class's single inheritance option."
        },
        {
          question: "What is the difference between start() and run()?",
          answer:
            "start() begins a new thread of execution and eventually invokes run() on that thread. Calling run() directly is just a normal method call on the current thread."
        },
        {
          question: "Can we call start() twice?",
          answer:
            "No. A Thread object can be started only once. Calling start() again throws IllegalThreadStateException."
        },
        {
          question: "Why is Runnable generally preferred over extending Thread?",
          answer:
            "Runnable separates the task from thread management and allows the class to extend another class. It also integrates naturally with ExecutorService."
        },
        {
          question: "What is Callable?",
          answer:
            "Callable represents a task that returns a result and can throw checked exceptions. It is commonly submitted to an ExecutorService and produces a Future."
        },
        {
          question: "What is the difference between Runnable and Callable?",
          answer:
            "Runnable returns void and cannot declare checked exceptions from run(). Callable returns a value and can declare checked exceptions."
        },
        {
          question: "Can a Runnable be executed by multiple threads?",
          answer:
            "Yes. The same Runnable instance can be passed to multiple Thread objects, but shared mutable state inside the Runnable must be designed for thread safety."
        },
        {
          question: "Why should we use ExecutorService?",
          answer:
            "ExecutorService separates task submission from thread management and can reuse worker threads, limit concurrency, and manage task execution more effectively."
        },
        {
          question: "What happens if run() is called directly?",
          answer:
            "The run() method executes on the current thread. No new thread is created."
        }
      ]
    }
  ]
};