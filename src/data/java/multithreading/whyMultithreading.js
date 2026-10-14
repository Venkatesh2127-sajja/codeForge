export const whyMultithreading = {
  id: "why-multithreading",
  slug: "why-multithreading",
  title: "Why Multithreading?",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Understand why multithreading is used in Java, how it improves responsiveness and throughput, how it helps with concurrent tasks and I/O operations, and when using multiple threads may not provide a benefit.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "why-multithreading",
      title: "1. Why Do We Need Multithreading?",

      paragraphs: [
        "Multithreading is used when an application needs to handle multiple tasks concurrently.",
        "Without concurrency, a program may execute one task completely before starting another. If one task takes a long time, other tasks may have to wait.",
        "With multiple threads, independent tasks can make progress during overlapping periods."
      ],

      code: {
        language: "text",
        code: `Without Multithreading

Task A ========>
                 Task B ========>
                                  Task C ========>

Each task waits for the previous task.`
      },

      bullets: [
        "Handle multiple tasks concurrently.",
        "Improve application responsiveness.",
        "Improve throughput for suitable workloads.",
        "Keep applications responsive while other work is in progress.",
        "Perform background tasks.",
        "Make efficient use of available execution resources."
      ]
    },

    {
      id: "sequential-problem",
      title: "2. Problem with Sequential Execution",

      paragraphs: [
        "Suppose an application has three independent tasks. Task A takes five seconds, Task B takes three seconds, and Task C takes two seconds.",
        "If all three tasks are performed sequentially, Task B cannot start until Task A finishes, and Task C cannot start until Task B finishes.",
        "The total elapsed time is approximately the sum of the individual task durations, ignoring other overhead."
      ],

      code: {
        language: "java",
        code: `public class SequentialExample {

    static void task(String name, int seconds)
            throws InterruptedException {

        System.out.println(name + " started");

        Thread.sleep(seconds * 1000L);

        System.out.println(name + " completed");
    }

    public static void main(String[] args)
            throws InterruptedException {

        task("Task A", 5);
        task("Task B", 3);
        task("Task C", 2);

        System.out.println("All tasks completed");
    }
}`
      },

      bullets: [
        "Task B waits for Task A.",
        "Task C waits for Task B.",
        "Independent tasks are not overlapping.",
        "Slow operations can delay unrelated work."
      ]
    },

    {
      id: "concurrent-solution",
      title: "3. Running Independent Tasks Concurrently",

      paragraphs: [
        "If tasks are independent, they may be executed concurrently using separate threads.",
        "The tasks can then make progress during overlapping periods."
      ],

      code: {
        language: "java",
        code: `public class ConcurrentExample {

    static void task(String name, int seconds) {

        try {
            System.out.println(name + " started");

            Thread.sleep(seconds * 1000L);

            System.out.println(name + " completed");

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args)
            throws InterruptedException {

        Thread taskA = new Thread(() -> task("Task A", 5));
        Thread taskB = new Thread(() -> task("Task B", 3));
        Thread taskC = new Thread(() -> task("Task C", 2));

        taskA.start();
        taskB.start();
        taskC.start();

        taskA.join();
        taskB.join();
        taskC.join();

        System.out.println("All tasks completed");
    }
}`
      },

      bullets: [
        "The three tasks can overlap.",
        "join() makes the main thread wait for completion.",
        "The exact execution order is not guaranteed.",
        "For real applications, ExecutorService is usually preferred over manually creating many threads."
      ]
    },

    {
      id: "responsiveness",
      title: "4. Improve Application Responsiveness",

      paragraphs: [
        "One important reason for concurrency is keeping an application responsive while another task is running.",
        "For example, a user-facing application may need to perform a long-running operation while still allowing other work to continue."
      ],

      code: {
        language: "text",
        code: `Main/UI Thread
      |
      +---- Handle user interaction
      |
      +---- Start background task
                    |
                    v
              Worker Thread
                    |
                    +---- Long operation`
      },

      bullets: [
        "The main execution path does not have to perform every task itself.",
        "Long-running work can be moved to an appropriate background executor.",
        "The exact approach depends on the application architecture."
      ]
    },

    {
      id: "backend-request-example",
      title: "5. Multithreading in Backend Applications",

      paragraphs: [
        "A backend server may receive many client requests at the same time.",
        "If every request had to wait for all previous requests to finish, server throughput would be severely limited.",
        "Server frameworks commonly use managed concurrency mechanisms such as thread pools to process requests."
      ],

      code: {
        language: "text",
        code: `Client 1 ──────┐
Client 2 ──────┤
Client 3 ──────┼──> Server
Client 4 ──────┤      |
Client 5 ──────┘      v
                  Thread Pool
                  /    |    \\
             Thread  Thread  Thread`
      },

      bullets: [
        "Multiple requests can be processed concurrently.",
        "A thread pool limits the number of simultaneously executing tasks.",
        "This is more scalable than creating an uncontrolled thread for every task.",
        "Backend concurrency must also consider database connections and downstream services."
      ]
    },

    {
      id: "io-bound",
      title: "6. Multithreading for I/O-Bound Tasks",

      paragraphs: [
        "I/O-bound tasks spend significant time waiting for external operations such as network communication, database queries, file operations, or remote service responses.",
        "While one task is waiting for I/O, another task can potentially make progress using an available execution resource."
      ],

      code: {
        language: "text",
        code: `Thread 1
  |
  +---- Database request
  |
  +---- Waiting ........
  |
  +---- Continue

Thread 2
  |
  +---- Process another task
  |
  +---- Continue`
      },

      bullets: [
        "Database calls can be I/O-bound.",
        "HTTP calls can be I/O-bound.",
        "File operations can be I/O-bound.",
        "Message broker operations can involve I/O waiting.",
        "Concurrency can improve resource utilization for suitable I/O workloads."
      ]
    },

    {
      id: "cpu-bound",
      title: "7. Multithreading for CPU-Bound Tasks",

      paragraphs: [
        "CPU-bound tasks spend most of their time performing computation rather than waiting for external I/O.",
        "Examples include numerical calculations, image processing, compression, and some data-processing workloads.",
        "For CPU-bound work, useful parallelism is closely related to the number of available CPU cores and the nature of the workload."
      ],

      code: {
        language: "text",
        code: `CPU Core 1 -> Calculation A

CPU Core 2 -> Calculation B

CPU Core 3 -> Calculation C

CPU Core 4 -> Calculation D`
      },

      bullets: [
        "CPU-bound work is limited primarily by computation resources.",
        "Multiple cores can allow independent computations to execute in parallel.",
        "Creating far more CPU-heavy threads than useful execution capacity can add overhead.",
        "The correct concurrency level depends on the workload and environment."
      ]
    },

    {
      id: "throughput",
      title: "8. Improve Throughput",

      paragraphs: [
        "Throughput describes how much work an application completes during a given period.",
        "Concurrency can increase throughput when tasks can safely overlap and the underlying resources can support that concurrency."
      ],

      code: {
        language: "text",
        code: `Sequential:

Request 1 -> complete
Request 2 -> complete
Request 3 -> complete

Concurrent:

Request 1 -> ========>
Request 2 -> ========>
Request 3 -> ========>

Multiple requests make progress concurrently.`
      },

      bullets: [
        "Concurrency can allow more independent work to be in progress.",
        "Throughput depends on CPU, memory, database capacity, network capacity, locks, and downstream systems.",
        "Adding threads alone does not guarantee higher throughput."
      ]
    },

    {
      id: "background-tasks",
      title: "9. Background Processing",

      paragraphs: [
        "Some tasks do not need to block the main application flow.",
        "Examples include sending notifications, generating reports, processing files, or performing scheduled maintenance.",
        "Such tasks can be executed asynchronously using managed executors or other appropriate mechanisms."
      ],

      code: {
        language: "text",
        code: `API Request
    |
    +---- Save request
    |
    +---- Submit background task
    |           |
    |           v
    |      Worker Thread
    |           |
    |           +---- Send email
    |
    +---- Return response`
      },

      bullets: [
        "Background work can reduce request latency when the result is not immediately required.",
        "The application must still handle failures and task durability appropriately.",
        "For critical background work, a persistent messaging system may be more appropriate than an in-memory executor."
      ]
    },

    {
      id: "multiple-users",
      title: "10. Supporting Multiple Users",

      paragraphs: [
        "Web applications commonly serve many users at the same time.",
        "Concurrency allows independent requests to make progress without forcing every user to wait for unrelated requests."
      ],

      code: {
        language: "text",
        code: `User A ──> Request A ──> Worker
User B ──> Request B ──> Worker
User C ──> Request C ──> Worker
User D ──> Request D ──> Worker`
      },

      bullets: [
        "Different requests may execute concurrently.",
        "Requests should avoid unsafe shared mutable state.",
        "Database and external-service capacity can become bottlenecks."
      ]
    },

    {
      id: "resource-utilization",
      title: "11. Better Resource Utilization",

      paragraphs: [
        "Multithreading can help an application use available resources more effectively.",
        "For example, during I/O waits, an execution resource may otherwise remain underutilized while another independent task could make progress."
      ],

      bullets: [
        "CPU resources can be used for independent computations.",
        "I/O waiting time can overlap with other work.",
        "Thread pools can control concurrency.",
        "Better utilization does not mean maximum thread count."
      ]
    },

    {
      id: "task-independence",
      title: "12. Independent Tasks and Concurrency",

      paragraphs: [
        "Multithreading is particularly useful when tasks are independent or have limited dependencies.",
        "If Task B does not need the result of Task A, they may be able to execute concurrently."
      ],

      code: {
        language: "text",
        code: `Task A ───────────────>

Task B ───────────────>

Task C ───────────────>

No dependency between tasks.`
      },

      bullets: [
        "Independent tasks are good candidates for concurrency.",
        "Dependencies may require coordination.",
        "Shared mutable state can introduce dependencies even when tasks initially appear independent."
      ]
    },

    {
      id: "dependent-tasks",
      title: "13. When Tasks Depend on Each Other",

      paragraphs: [
        "Not every task can run independently.",
        "If Task B needs the result produced by Task A, some form of coordination is required.",
        "Java provides mechanisms such as Future, CompletableFuture, locks, and other concurrency utilities for handling dependencies."
      ],

      code: {
        language: "text",
        code: `Task A
   |
   | result
   v
Task B
   |
   | result
   v
Task C`
      },

      bullets: [
        "Dependencies reduce available concurrency.",
        "The dependency must be represented correctly.",
        "Do not use arbitrary sleep() calls to wait for dependent work.",
        "Use appropriate synchronization or asynchronous composition mechanisms."
      ]
    },

    {
      id: "server-example",
      title: "14. Example: Online Shopping Backend",

      paragraphs: [
        "Consider an online shopping application receiving an order.",
        "Some operations may be independent. For example, after an order is successfully created, sending a notification may not need to block unrelated application work.",
        "Other operations, such as validating payment before confirming an order, may have dependencies."
      ],

      code: {
        language: "text",
        code: `Create Order
     |
     +---- Validate Payment
     |
     +---- Update Inventory
     |
     +---- Send Notification
     |
     +---- Generate Event`
      },

      bullets: [
        "Some operations may be performed concurrently when business rules allow it.",
        "Some operations must remain ordered.",
        "Concurrency should follow business dependencies rather than simply creating threads everywhere."
      ]
    },

    {
      id: "database-example",
      title: "15. Multithreading and Database Operations",

      paragraphs: [
        "Backend applications frequently perform database operations.",
        "When multiple independent requests are being processed, database calls from those requests can overlap.",
        "However, the database has limited connections and resources, so application concurrency should be coordinated with database capacity."
      ],

      code: {
        language: "text",
        code: `Application Thread Pool
        |
        +---- Thread 1 ----> DB Connection
        |
        +---- Thread 2 ----> DB Connection
        |
        +---- Thread 3 ----> DB Connection
        |
        +---- Thread 4 ----> waits for connection`
      },

      bullets: [
        "Application threads and database connections are different resources.",
        "Too much application concurrency can exhaust the connection pool.",
        "Database capacity can become the bottleneck.",
        "Thread-pool size should be considered together with downstream resource limits."
      ]
    },

    {
      id: "network-example",
      title: "16. Multithreading and External APIs",

      paragraphs: [
        "A backend service may call multiple external APIs.",
        "If those calls are independent, concurrent execution can reduce the time spent waiting for all of them, subject to service limits and application design."
      ],

      code: {
        language: "text",
        code: `Backend
   |
   +----> Payment API
   |
   +----> Shipping API
   |
   +----> Notification API

Independent calls may overlap.`
      },

      bullets: [
        "Network calls are commonly I/O-bound.",
        "Concurrent calls can reduce waiting when calls are independent.",
        "External APIs may impose rate limits.",
        "Timeouts and failure handling are essential."
      ]
    },

    {
      id: "multithreading-not-always-faster",
      title: "17. Multithreading Is Not Always Faster",

      paragraphs: [
        "Using multiple threads introduces overhead.",
        "Thread creation, scheduling, context switching, synchronization, memory usage, and contention can reduce performance.",
        "Therefore, multithreading should be used when the workload benefits from concurrency."
      ],

      bullets: [
        "Very small tasks may not benefit.",
        "Too many threads can cause contention.",
        "Synchronization can become a bottleneck.",
        "CPU-bound workloads have finite processing capacity.",
        "I/O concurrency can be limited by downstream resources."
      ]
    },

    {
      id: "thread-overhead",
      title: "18. Thread Overhead",

      paragraphs: [
        "Every platform thread consumes system and JVM resources.",
        "A large number of threads can increase memory consumption and scheduling overhead.",
        "This is one reason production applications commonly use thread pools rather than creating unlimited threads."
      ],

      code: {
        language: "text",
        code: `Bad approach:

Request -> new Thread()
Request -> new Thread()
Request -> new Thread()
Request -> new Thread()
...
Request -> new Thread()

Potentially unlimited thread creation.

Better:

Requests
   |
   v
Thread Pool
   |
   +-- Worker
   +-- Worker
   +-- Worker`
      }
    },

    {
      id: "thread-pool-introduction",
      title: "19. Why Use Thread Pools?",

      paragraphs: [
        "A thread pool maintains a managed set of worker threads that can execute submitted tasks.",
        "Instead of creating a new thread for every task, tasks can be submitted to the pool.",
        "Thread pools help control concurrency and reuse worker threads."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(3);

executor.submit(() ->
    System.out.println("Task 1")
);

executor.submit(() ->
    System.out.println("Task 2")
);

executor.submit(() ->
    System.out.println("Task 3")
);

executor.shutdown();`
      },

      bullets: [
        "Threads can be reused.",
        "Concurrency can be bounded.",
        "Task management becomes easier.",
        "ExecutorService provides lifecycle management.",
        "Thread pools are covered in detail later."
      ]
    },

    {
      id: "scalability",
      title: "20. Multithreading and Scalability",

      paragraphs: [
        "Multithreading can contribute to application scalability by allowing a single application instance to handle multiple tasks concurrently.",
        "However, scalability depends on the complete system: CPU, memory, database, network, external services, locks, and architecture."
      ],

      code: {
        language: "text",
        code: `Clients
   |
   v
Load Balancer
   |
   +------ Application Instance 1
   |          └── Thread Pool
   |
   +------ Application Instance 2
   |          └── Thread Pool
   |
   +------ Application Instance 3
              └── Thread Pool`
      },

      bullets: [
        "Threads provide concurrency inside an application instance.",
        "Multiple instances provide another level of scalability.",
        "A load balancer can distribute requests across instances.",
        "Threading alone does not solve every scalability problem."
      ]
    },

    {
      id: "concurrency-vs-parallelism",
      title: "21. Multithreading, Concurrency, and Parallelism",

      paragraphs: [
        "Multithreading is a programming technique for using multiple threads.",
        "Concurrency describes multiple tasks making progress during overlapping periods.",
        "Parallelism describes tasks executing simultaneously."
      ],

      code: {
        language: "text",
        code: `Multithreading
      |
      v
Multiple Threads
      |
      +------> Concurrency
      |
      +------> Parallel execution
                 when hardware/workload allows`
      },

      bullets: [
        "Multithreading can be used for concurrency.",
        "Multiple threads may execute in parallel on multiple CPU cores.",
        "Concurrency does not guarantee simultaneous execution."
      ]
    },

    {
      id: "cpu-bound-vs-io-bound",
      title: "22. CPU-Bound vs I/O-Bound Work",

      paragraphs: [
        "Understanding whether a workload is CPU-bound or I/O-bound is important when designing concurrent applications.",
        "CPU-bound tasks spend most of their time using CPU resources. I/O-bound tasks spend significant time waiting for external resources."
      ],

      bullets: [
        "CPU-bound example: image processing.",
        "CPU-bound example: complex numerical computation.",
        "I/O-bound example: database query.",
        "I/O-bound example: HTTP request.",
        "I/O-bound example: file or network operation."
      ]
    },

    {
      id: "asynchronous-work",
      title: "23. Multithreading vs Asynchronous Programming",

      paragraphs: [
        "Multithreading and asynchronous programming are related but not identical.",
        "Multithreading uses multiple execution threads. Asynchronous programming focuses on allowing work to proceed without blocking the current flow while the result becomes available later.",
        "Modern Java provides CompletableFuture and other mechanisms for asynchronous workflows."
      ],

      bullets: [
        "Multithreading is about execution using multiple threads.",
        "Asynchronous programming is about non-blocking or deferred workflows.",
        "An asynchronous operation may use a thread pool underneath.",
        "The two concepts can be combined."
      ]
    },

    {
      id: "real-world-example",
      title: "24. Real-World Example: Food Delivery Application",

      paragraphs: [
        "Consider a food delivery application.",
        "A request may involve restaurant availability, payment processing, order creation, notification, and delivery updates.",
        "Some operations may be independent and suitable for concurrent execution, while others must follow a specific order."
      ],

      code: {
        language: "text",
        code: `Place Order
     |
     +---- Validate Order
     |
     +---- Process Payment
     |
     +---- Update Order
     |
     +---- Notify Restaurant
     |
     +---- Notify Customer`
      },

      bullets: [
        "Concurrency can improve responsiveness for suitable independent operations.",
        "Business dependencies must be respected.",
        "External API failures must be handled.",
        "Background processing may be suitable for non-critical notifications."
      ]
    },

    {
      id: "shared-state-problem",
      title: "25. Why Does Multithreading Make Programming Harder?",

      paragraphs: [
        "Multiple threads introduce shared-state and coordination problems.",
        "Two threads may read and modify the same object at overlapping times.",
        "This can lead to race conditions, visibility problems, deadlocks, and other concurrency bugs."
      ],

      code: {
        language: "text",
        code: `Thread 1 ──┐
           ├──> Shared Object
Thread 2 ──┘

Without proper coordination:
        ↓
Race Condition
        ↓
Incorrect Result`
      },

      bullets: [
        "Shared mutable state increases complexity.",
        "Race conditions can produce inconsistent results.",
        "Locks can cause contention or deadlocks.",
        "Visibility must be considered.",
        "Higher-level concurrency utilities can reduce complexity."
      ]
    },

    {
      id: "when-not-to-use",
      title: "26. When Should We Avoid Multithreading?",

      paragraphs: [
        "Multithreading should not be introduced simply because it sounds faster.",
        "If a task is tiny, sequential execution may be simpler and fast enough.",
        "If tasks heavily depend on each other, concurrency may provide little benefit and introduce additional complexity."
      ],

      bullets: [
        "Very small workloads.",
        "Strongly sequential algorithms.",
        "Workloads dominated by shared-state synchronization.",
        "When downstream resources cannot handle additional concurrency.",
        "When the complexity is greater than the performance benefit."
      ]
    },

    {
      id: "benefits",
      title: "27. Main Benefits of Multithreading",

      bullets: [
        "Concurrent execution of independent tasks.",
        "Improved responsiveness.",
        "Potentially higher throughput.",
        "Better utilization of CPU resources.",
        "Overlap of computation and I/O waiting.",
        "Background processing.",
        "Concurrent handling of multiple application requests."
      ]
    },

    {
      id: "limitations",
      title: "28. Limitations of Multithreading",

      bullets: [
        "Increased application complexity.",
        "Race conditions.",
        "Visibility problems.",
        "Synchronization overhead.",
        "Deadlocks.",
        "Thread contention.",
        "Memory and scheduling overhead.",
        "Limited benefit when the underlying resource is already saturated."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",

      paragraphs: [
        "Multithreading is useful when multiple tasks can make progress concurrently.",
        "It can improve responsiveness and throughput for suitable workloads, but it also introduces synchronization and resource-management challenges."
      ],

      bullets: [
        "Use concurrency when tasks can safely overlap.",
        "I/O-bound tasks often benefit from concurrency.",
        "CPU-bound tasks can benefit from parallel execution when multiple cores and independent work are available.",
        "Use thread pools to control platform-thread usage.",
        "Do not assume more threads means better performance.",
        "Always consider CPU, memory, database, network, and downstream capacity."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These questions cover the important concepts from this lesson."
      ],

      interviewQuestions: [
        {
          question: "Why do we need multithreading?",
          answer:
            "Multithreading allows independent tasks to make progress concurrently. It can improve responsiveness, throughput, and resource utilization for suitable workloads."
        },
        {
          question: "Does multithreading always improve performance?",
          answer:
            "No. Thread creation, context switching, synchronization, contention, and resource limits can make excessive concurrency slower."
        },
        {
          question: "Why is multithreading useful for I/O-bound tasks?",
          answer:
            "I/O-bound tasks spend significant time waiting for external operations. While one task is waiting, another task can potentially make progress."
        },
        {
          question: "What is a CPU-bound task?",
          answer:
            "A CPU-bound task spends most of its time performing computation rather than waiting for external I/O."
        },
        {
          question: "What is an I/O-bound task?",
          answer:
            "An I/O-bound task spends significant time waiting for operations such as database, network, or file I/O."
        },
        {
          question: "Why should we use a thread pool?",
          answer:
            "A thread pool reuses worker threads and limits concurrency, helping control resource usage and avoid uncontrolled thread creation."
        },
        {
          question: "Can multiple threads execute at the exact same time?",
          answer:
            "On a multicore system, multiple threads can execute simultaneously on different CPU cores. On a single core, execution is interleaved over time."
        },
        {
          question: "What is the biggest challenge with multithreading?",
          answer:
            "Managing shared mutable state safely is a major challenge. It can lead to race conditions, visibility problems, contention, and deadlocks."
        },
        {
          question: "When should you avoid multithreading?",
          answer:
            "It may be unnecessary for small or strongly sequential workloads, or when concurrency would add more overhead and complexity than benefit."
        },
        {
          question: "How is multithreading used in backend applications?",
          answer:
            "Backend servers use concurrency to process multiple requests and background tasks. Managed thread pools and asynchronous mechanisms are commonly used to control execution."
        }
      ]
    }
  ]
};