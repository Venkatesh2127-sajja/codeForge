export const whatIsMultithreading = {
  id: "what-is-multithreading",
  slug: "what-is-multithreading",
  title: "What is Multithreading in Java?",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn the fundamentals of multithreading in Java, including processes, threads, concurrency, parallelism, the main thread, and why multithreading is important in real-world applications.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-multithreading",
      title: "1. What is Multithreading?",

      paragraphs: [
        "Multithreading is the process of executing multiple threads concurrently within a single application.",
        "A thread is the smallest unit of execution inside a program. A Java application can have multiple threads working on different tasks.",
        "For example, a backend application may have one thread processing an API request while other threads handle database operations, logging, background tasks, or other requests.",
        "Multithreading is mainly used to improve application responsiveness and efficiently use available CPU resources."
      ],

      code: {
        language: "java",
        code: `public class MultithreadingExample {

    public static void main(String[] args) {

        Thread thread1 = new Thread(() -> {
            System.out.println("Task 1 is running");
        });

        Thread thread2 = new Thread(() -> {
            System.out.println("Task 2 is running");
        });

        thread1.start();
        thread2.start();
    }
}`
      },

      output:
        "Task 1 is running\nTask 2 is running",

      bullets: [
        "A process is a running application.",
        "A thread is an execution path inside a process.",
        "Multiple threads can exist inside one Java application.",
        "Threads can execute tasks concurrently.",
        "Multithreading is useful for responsive and scalable applications."
      ]
    },

    {
      id: "why-multithreading",
      title: "2. Why Do We Need Multithreading?",

      paragraphs: [
        "A program may need to perform multiple tasks at the same time. If everything is executed sequentially by a single thread, one slow operation can delay other work.",
        "Multithreading allows independent tasks to make progress concurrently.",
        "This is especially useful for backend applications that handle many requests, perform I/O operations, process background jobs, or communicate with external services."
      ],

      code: {
        language: "java",
        code: `public class TaskExample {

    public static void main(String[] args) {

        Thread emailTask = new Thread(() -> {
            System.out.println("Sending email...");
        });

        Thread reportTask = new Thread(() -> {
            System.out.println("Generating report...");
        });

        emailTask.start();
        reportTask.start();
    }
}`
      },

      bullets: [
        "Improve application responsiveness.",
        "Handle multiple independent tasks.",
        "Process multiple requests concurrently.",
        "Make better use of available CPU resources.",
        "Perform background work without blocking the main flow."
      ]
    },

    {
      id: "process-vs-thread",
      title: "3. Process vs Thread",

      paragraphs: [
        "A process is an independent running instance of a program. A thread is an execution unit inside a process.",
        "A process normally has its own memory space, while threads belonging to the same process share the process's memory and resources.",
        "For example, when a Java application starts, the JVM runs as a process and the application can contain multiple threads."
      ],

      bullets: [
        "Process = running application.",
        "Thread = execution unit inside a process.",
        "Processes generally have separate memory spaces.",
        "Threads within the same process share memory.",
        "Creating and switching between processes is generally more expensive than working with threads."
      ],

      code: {
        language: "text",
        code: `Java Application
       |
       v
   JVM Process
       |
       +----------------+
       |       |        |
     Thread  Thread   Thread
       1       2        3`
      }
    },

    {
      id: "thread-example",
      title: "4. What is a Thread?",

      paragraphs: [
        "A thread represents an independent path of execution within a program.",
        "Every Java application starts with at least one thread called the main thread.",
        "Additional threads can be created when the application needs to execute other tasks concurrently."
      ],

      code: {
        language: "java",
        code: `public class ThreadExample {

    public static void main(String[] args) {

        Thread currentThread = Thread.currentThread();

        System.out.println("Thread name: "
                + currentThread.getName());
    }
}`
      },

      output: "Thread name: main",

      bullets: [
        "The JVM starts the main thread for the main() method.",
        "Thread.currentThread() returns the currently executing thread.",
        "Threads have properties such as name, priority, and state."
      ]
    },

    {
      id: "main-thread",
      title: "5. What is the Main Thread?",

      paragraphs: [
        "The main thread is the thread that starts execution of the main() method.",
        "When a Java program starts, the JVM creates the main thread and uses it to execute the application's main() method.",
        "Additional threads can then be created from the main thread."
      ],

      code: {
        language: "java",
        code: `public class MainThreadExample {

    public static void main(String[] args) {

        System.out.println(
            "Running thread: "
            + Thread.currentThread().getName()
        );

        Thread worker = new Thread(() -> {
            System.out.println(
                "Worker thread: "
                + Thread.currentThread().getName()
            );
        });

        worker.start();
    }
}`
      },

      output:
        "Running thread: main\nWorker thread: Thread-0"
    },

    {
      id: "concurrency",
      title: "6. What is Concurrency?",

      paragraphs: [
        "Concurrency means multiple tasks can make progress during overlapping periods of time.",
        "Concurrency does not necessarily mean that tasks execute at exactly the same instant.",
        "On a single CPU core, the operating system can switch between threads. On multiple CPU cores, multiple threads may execute simultaneously."
      ],

      code: {
        language: "text",
        code: `Concurrency

Task A:  =======       ========
Task B:       =======       =======

Tasks make progress during overlapping time periods.`
      },

      bullets: [
        "Concurrency is about managing multiple tasks.",
        "Tasks may take turns executing.",
        "Concurrency can happen on a single CPU core.",
        "Concurrency is different from actual simultaneous execution."
      ]
    },

    {
      id: "parallelism",
      title: "7. What is Parallelism?",

      paragraphs: [
        "Parallelism means multiple tasks are executing at the same time, usually on different CPU cores.",
        "For example, if a computer has multiple CPU cores, two threads may execute simultaneously on two different cores."
      ],

      code: {
        language: "text",
        code: `CPU Core 1 -> Task A ========

CPU Core 2 -> Task B ========

Task A and Task B can execute simultaneously.`
      },

      bullets: [
        "Parallelism requires actual simultaneous execution.",
        "Multiple CPU cores can enable parallel execution.",
        "Concurrency focuses on managing overlapping tasks.",
        "Parallelism focuses on simultaneous execution."
      ]
    },

    {
      id: "concurrency-vs-parallelism",
      title: "8. Concurrency vs Parallelism",

      paragraphs: [
        "Concurrency and parallelism are related but different concepts.",
        "Concurrency means multiple tasks are in progress during overlapping periods. Parallelism means multiple tasks execute simultaneously."
      ],

      bullets: [
        "Concurrency = dealing with multiple tasks.",
        "Parallelism = executing multiple tasks simultaneously.",
        "Concurrency can exist on a single CPU core.",
        "Parallelism generally benefits from multiple CPU cores."
      ]
    },

    {
      id: "creating-thread-overview",
      title: "9. How Can We Create Threads in Java?",

      paragraphs: [
        "Java provides several mechanisms for executing tasks using threads.",
        "The traditional approaches include extending the Thread class and implementing Runnable.",
        "Modern applications commonly use ExecutorService and other concurrency utilities instead of manually creating large numbers of threads."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {
    System.out.println("Task is running");
});

thread.start();`
      },

      bullets: [
        "Extend Thread.",
        "Implement Runnable.",
        "Use Callable when a task needs to return a result.",
        "Use ExecutorService for managing groups of tasks.",
        "Use CompletableFuture for asynchronous workflows."
      ]
    },

    {
      id: "thread-class",
      title: "10. Creating a Thread Using Thread Class",

      paragraphs: [
        "One traditional way to create a thread is to extend the Thread class and override its run() method.",
        "The start() method is then called to begin execution on a new thread."
      ],

      code: {
        language: "java",
        code: `class WorkerThread extends Thread {

    @Override
    public void run() {
        System.out.println("Worker thread is running");
    }
}

public class ThreadClassExample {

    public static void main(String[] args) {

        WorkerThread thread = new WorkerThread();

        thread.start();
    }
}`
      },

      output: "Worker thread is running"
    },

    {
      id: "runnable",
      title: "11. Creating a Thread Using Runnable",

      paragraphs: [
        "Runnable represents a task that can be executed by a thread.",
        "Implementing Runnable separates the task from the Thread object and is generally more flexible than extending Thread."
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

        Runnable task = new MyTask();

        Thread thread = new Thread(task);

        thread.start();
    }
}`
      },

      output: "Task is running"
    },

    {
      id: "lambda-runnable",
      title: "12. Runnable with Lambda Expression",

      paragraphs: [
        "Runnable is a functional interface, so it can be implemented using a lambda expression.",
        "This makes small thread tasks concise and readable."
      ],

      code: {
        language: "java",
        code: `public class LambdaThreadExample {

    public static void main(String[] args) {

        Runnable task = () -> {
            System.out.println("Task running");
        };

        Thread thread = new Thread(task);

        thread.start();
    }
}`
      },

      output: "Task running"
    },

    {
      id: "start-vs-run",
      title: "13. start() vs run()",

      paragraphs: [
        "start() and run() are very different when working with threads.",
        "Calling start() asks the JVM to start a new thread, after which the new thread executes run().",
        "Calling run() directly does not create a new thread. It simply executes the method in the current thread."
      ],

      code: {
        language: "java",
        code: `public class StartVsRun {

    public static void main(String[] args) {

        Thread thread = new Thread(() -> {
            System.out.println(
                "Running in: "
                + Thread.currentThread().getName()
            );
        });

        thread.start();
    }
}`
      },

      bullets: [
        "start() creates a new execution path.",
        "run() is the task method.",
        "Calling run() directly does not start a new thread.",
        "A Thread object can only be started once."
      ]
    },

    {
      id: "thread-execution",
      title: "14. How Does Thread Execution Work?",

      paragraphs: [
        "When start() is called, the JVM schedules the new thread for execution.",
        "The operating system and JVM determine when the thread gets CPU time.",
        "Therefore, the exact order in which multiple threads print messages is generally not guaranteed."
      ],

      code: {
        language: "java",
        code: `public class ExecutionOrder {

    public static void main(String[] args) {

        Thread thread1 = new Thread(() ->
            System.out.println("A")
        );

        Thread thread2 = new Thread(() ->
            System.out.println("B")
        );

        thread1.start();
        thread2.start();
    }
}`
      },

      bullets: [
        "Thread scheduling is not controlled simply by source-code order.",
        "Output order may vary.",
        "Do not build program correctness on an assumed scheduling order.",
        "Synchronization mechanisms are required when ordering or shared-state safety matters."
      ]
    },

    {
      id: "thread-name",
      title: "15. Thread Names",

      paragraphs: [
        "Every thread has a name. Giving meaningful names to application threads makes debugging and monitoring easier."
      ],

      code: {
        language: "java",
        code: `public class ThreadNameExample {

    public static void main(String[] args) {

        Thread worker = new Thread(
            () -> System.out.println("Processing task"),
            "payment-worker"
        );

        worker.start();

        System.out.println(
            "Thread: " + worker.getName()
        );
    }
}`
      },

      bullets: [
        "Use getName() to retrieve a thread name.",
        "Use setName() to change a thread name.",
        "Meaningful names are useful when analyzing logs and thread dumps."
      ]
    },

    {
      id: "multiple-threads",
      title: "16. Running Multiple Threads",

      paragraphs: [
        "An application can create multiple threads, with each thread responsible for a different task."
      ],

      code: {
        language: "java",
        code: `public class MultipleThreads {

    public static void main(String[] args) {

        Thread emailThread = new Thread(() ->
            System.out.println("Sending email")
        );

        Thread paymentThread = new Thread(() ->
            System.out.println("Processing payment")
        );

        Thread notificationThread = new Thread(() ->
            System.out.println("Sending notification")
        );

        emailThread.start();
        paymentThread.start();
        notificationThread.start();
    }
}`
      },

      bullets: [
        "Each thread can represent an independent task.",
        "Execution order is not guaranteed.",
        "Creating many threads manually is usually not ideal for production applications.",
        "ExecutorService is commonly used to manage thread pools."
      ]
    },

    {
      id: "thread-lifecycle-overview",
      title: "17. Thread Lifecycle",

      paragraphs: [
        "A thread moves through different states during its lifetime.",
        "Java represents these states using the Thread.State enumeration."
      ],

      code: {
        language: "text",
        code: `NEW
 |
 | start()
 v
RUNNABLE
 |
 +----> BLOCKED
 |
 +----> WAITING
 |
 +----> TIMED_WAITING
 |
 v
TERMINATED`
      },

      bullets: [
        "NEW — thread object created but not started.",
        "RUNNABLE — eligible to run or running according to JVM/OS scheduling.",
        "BLOCKED — waiting to acquire a monitor lock.",
        "WAITING — waiting indefinitely for another thread/action.",
        "TIMED_WAITING — waiting for a specified time.",
        "TERMINATED — execution has completed."
      ]
    },

    {
      id: "thread-state",
      title: "18. Checking Thread State",

      paragraphs: [
        "The getState() method can be used to inspect the current state of a thread."
      ],

      code: {
        language: "java",
        code: `public class ThreadStateExample {

    public static void main(String[] args) {

        Thread thread = new Thread(() -> {
            System.out.println("Running...");
        });

        System.out.println(thread.getState());

        thread.start();
    }
}`
      },

      output: "NEW"
    },

    {
      id: "thread-sleep-overview",
      title: "19. What is sleep()?",

      paragraphs: [
        "Thread.sleep() pauses the currently executing thread for approximately the specified duration.",
        "The thread enters the TIMED_WAITING state during the sleep period.",
        "sleep() does not release intrinsic locks that the thread already holds."
      ],

      code: {
        language: "java",
        code: `public class SleepExample {

    public static void main(String[] args)
            throws InterruptedException {

        System.out.println("Starting");

        Thread.sleep(1000);

        System.out.println("After 1 second");
    }
}`
      },

      output: "Starting\nAfter 1 second"
    },

    {
      id: "thread-join-overview",
      title: "20. What is join()?",

      paragraphs: [
        "The join() method allows one thread to wait for another thread to finish.",
        "For example, the main thread can wait for a worker thread before continuing."
      ],

      code: {
        language: "java",
        code: `public class JoinExample {

    public static void main(String[] args)
            throws InterruptedException {

        Thread worker = new Thread(() -> {
            System.out.println("Worker finished");
        });

        worker.start();

        worker.join();

        System.out.println("Main continues");
    }
}`
      },

      output:
        "Worker finished\nMain continues"
    },

    {
      id: "interrupt-overview",
      title: "21. What is interrupt()?",

      paragraphs: [
        "interrupt() is a mechanism for requesting that a thread stop what it is waiting or sleeping for and respond to an interruption.",
        "It does not forcibly kill the thread.",
        "If a thread is sleeping, waiting, or joining and interruption occurs, the blocking method normally throws InterruptedException."
      ],

      code: {
        language: "java",
        code: `public class InterruptExample {

    public static void main(String[] args) {

        Thread worker = new Thread(() -> {

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("Worker interrupted");
            }
        });

        worker.start();

        worker.interrupt();
    }
}`
      },

      output: "Worker interrupted",

      bullets: [
        "interrupt() is a cooperative cancellation mechanism.",
        "It does not forcibly terminate a thread.",
        "Blocking methods may throw InterruptedException.",
        "Well-designed code should respond appropriately to interruption."
      ]
    },

    {
      id: "daemon-thread",
      title: "22. What is a Daemon Thread?",

      paragraphs: [
        "A daemon thread is a background thread that does not prevent the JVM from shutting down when no non-daemon threads remain.",
        "Daemon threads are commonly associated with background support work."
      ],

      code: {
        language: "java",
        code: `public class DaemonExample {

    public static void main(String[] args) {

        Thread background = new Thread(() -> {

            while (true) {
                System.out.println("Background task");
            }
        });

        background.setDaemon(true);

        background.start();

        System.out.println("Main finished");
    }
}`
      },

      bullets: [
        "setDaemon(true) must be called before start().",
        "Daemon status is a JVM lifecycle property.",
        "Do not use daemon threads for critical work that must finish before application shutdown."
      ]
    },

    {
      id: "thread-priority",
      title: "23. Thread Priority",

      paragraphs: [
        "Java threads have a priority value. Thread priority can provide scheduling hints to the JVM and operating system.",
        "Application correctness should not depend on thread priority because scheduling behavior is platform dependent."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {
    System.out.println("Worker");
});

thread.setPriority(Thread.MAX_PRIORITY);

thread.start();`
      },

      bullets: [
        "Thread.MIN_PRIORITY = 1.",
        "Thread.NORM_PRIORITY = 5.",
        "Thread.MAX_PRIORITY = 10.",
        "Priority is not a guarantee of execution order."
      ]
    },

    {
      id: "thread-safety-intro",
      title: "24. What is Thread Safety?",

      paragraphs: [
        "Thread safety means that code behaves correctly when accessed by multiple threads concurrently.",
        "Shared mutable state is one of the main sources of concurrency problems.",
        "For example, if multiple threads modify the same counter without proper synchronization, the final result may be incorrect."
      ],

      code: {
        language: "java",
        code: `class Counter {

    private int count = 0;

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}`
      },

      bullets: [
        "Shared mutable state requires careful design.",
        "Multiple threads can interfere with each other.",
        "Synchronization, locks, atomic classes, and concurrent collections can help.",
        "Immutable objects can reduce concurrency problems."
      ]
    },

    {
      id: "race-condition-intro",
      title: "25. What is a Race Condition?",

      paragraphs: [
        "A race condition occurs when the result of a program depends on the timing or interleaving of multiple threads accessing shared state.",
        "The expression count++ is not one indivisible operation. It involves reading the value, calculating a new value, and writing the result."
      ],

      code: {
        language: "java",
        code: `class Counter {

    private int count = 0;

    public void increment() {
        count++;
    }
}

public class RaceConditionExample {

    public static void main(String[] args)
            throws InterruptedException {

        Counter counter = new Counter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();
    }
}`
      },

      bullets: [
        "Race conditions occur because multiple threads interact with shared state.",
        "Timing can affect the result.",
        "The solution depends on the problem and may involve synchronization, locks, atomic variables, or a different design."
      ]
    },

    {
      id: "multithreading-real-world",
      title: "26. Multithreading in Real-World Backend Applications",

      paragraphs: [
        "Multithreading is heavily used in backend applications.",
        "A web server can process many requests concurrently instead of forcing every request to wait for the previous request to finish.",
        "Background jobs, asynchronous processing, database operations, message consumers, and scheduled tasks can also use different threads."
      ],

      code: {
        language: "text",
        code: `Client 1 ──┐
Client 2 ──┤
Client 3 ──┼──> Server Thread Pool
Client 4 ──┤       │
Client 5 ──┘       ├── Worker Thread
                    ├── Worker Thread
                    └── Worker Thread`
      },

      bullets: [
        "Web servers commonly use thread pools.",
        "Spring Boot applications can execute asynchronous tasks using configured executors.",
        "Database and network I/O can benefit from concurrent task execution.",
        "Thread pools prevent uncontrolled creation of threads."
      ]
    },

    {
      id: "multithreading-common-mistakes",
      title: "27. Common Multithreading Mistakes",

      paragraphs: [
        "Multithreading introduces complexity. Several common mistakes can cause incorrect results or poor performance."
      ],

      bullets: [
        "Calling run() instead of start().",
        "Creating too many threads.",
        "Accessing shared mutable state without synchronization.",
        "Assuming a particular thread execution order.",
        "Ignoring InterruptedException.",
        "Holding locks for unnecessarily long periods.",
        "Using sleep() as a synchronization mechanism.",
        "Using thread priority to guarantee execution order.",
        "Forgetting to shut down ExecutorService.",
        "Assuming thread-safe individual operations make an entire multi-step business operation atomic."
      ]
    },

    {
      id: "multithreading-best-practices",
      title: "28. Multithreading Best Practices",

      paragraphs: [
        "Good concurrency design focuses on minimizing shared mutable state and using the appropriate concurrency utilities."
      ],

      bullets: [
        "Prefer immutable data where practical.",
        "Keep critical sections small.",
        "Use ExecutorService instead of manually creating large numbers of threads.",
        "Use concurrent collections when appropriate.",
        "Use atomic classes for suitable atomic state updates.",
        "Handle interruption correctly.",
        "Avoid unnecessary synchronization.",
        "Do not depend on thread scheduling behavior.",
        "Use meaningful thread names for debugging.",
        "Choose thread-pool sizes according to the workload."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",

      paragraphs: [
        "Multithreading allows multiple execution paths within an application.",
        "Java provides Thread, Runnable, Callable, ExecutorService, concurrent collections, locks, atomic classes, CompletableFuture, and other concurrency utilities.",
        "Understanding shared state, synchronization, visibility, and thread coordination is essential before moving to advanced concurrency."
      ],

      bullets: [
        "Thread = unit of execution.",
        "Process = running application.",
        "Concurrency = overlapping progress of multiple tasks.",
        "Parallelism = simultaneous execution.",
        "start() starts a new thread; run() does not.",
        "sleep() pauses the current thread.",
        "join() waits for another thread.",
        "interrupt() requests interruption.",
        "Race conditions can occur with shared mutable state.",
        "Thread safety means correct behavior under concurrent access."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These questions are commonly asked when testing Java multithreading fundamentals."
      ],

      interviewQuestions: [
        {
          question: "What is multithreading in Java?",
          answer:
            "Multithreading is the execution of multiple threads within a single application, allowing multiple tasks to make progress concurrently."
        },
        {
          question: "What is the difference between a process and a thread?",
          answer:
            "A process is a running application with its own process resources and memory space. A thread is an execution unit within a process, and threads in the same process share process memory and resources."
        },
        {
          question: "What is the difference between concurrency and parallelism?",
          answer:
            "Concurrency means multiple tasks can make progress during overlapping periods. Parallelism means multiple tasks execute simultaneously, typically on different CPU cores."
        },
        {
          question: "What is the difference between start() and run()?",
          answer:
            "start() begins execution of a new thread and eventually invokes run() on that thread. Calling run() directly executes the method on the current thread."
        },
        {
          question: "What is the main thread?",
          answer:
            "The main thread is the thread created by the JVM to execute the application's main() method."
        },
        {
          question: "What does sleep() do?",
          answer:
            "sleep() pauses the currently executing thread for approximately the specified duration. It does not release intrinsic locks held by that thread."
        },
        {
          question: "What does join() do?",
          answer:
            "join() causes the calling thread to wait until the target thread terminates, or until a specified timeout expires when using a timed overload."
        },
        {
          question: "Does interrupt() kill a thread?",
          answer:
            "No. interrupt() is a request for a thread to respond to interruption. It does not forcibly terminate the thread."
        },
        {
          question: "What is a race condition?",
          answer:
            "A race condition occurs when the result depends on the timing or interleaving of multiple threads accessing shared state."
        },
        {
          question: "What is thread safety?",
          answer:
            "Thread safety means code maintains correct behavior when accessed concurrently by multiple threads."
        }
      ]
    }
  ]
};