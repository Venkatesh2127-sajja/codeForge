export const multithreadingInterviewScenarios = {
  id: "multithreading-interview-scenarios",
  slug: "multithreading-interview-scenarios",

  title: "Multithreading Interview and Backend Scenarios",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Prepare for Java multithreading interviews with important conceptual questions, practical coding scenarios, Spring Boot backend situations, concurrency problems, thread pools, synchronization, CompletableFuture, ThreadLocal, and virtual threads.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "how-to-answer",
      title: "1. How to Answer Multithreading Questions",

      paragraphs: [
        "In interviews, do not only define a multithreading concept. Explain what problem it solves, how it works, and where it is useful in a backend application.",
        "A good answer usually follows this structure: definition, problem, solution, small example, and backend use case."
      ],

      code: {
        language: "text",
        code: `Concept
   ↓
What problem does it solve?
   ↓
How does it work?
   ↓
Small Java example
   ↓
Spring Boot / backend use case`
      }
    },

    {
      id: "thread-vs-process",
      title: "2. Interview: Process vs Thread",

      paragraphs: [
        "A process is an independent running program with its own address space and resources. A thread is an execution unit inside a process.",
        "Threads within the same process share process-level memory such as the heap, while each thread has its own execution state and stack."
      ],

      interviewQuestions: [
        {
          question: "What is the difference between a process and a thread?",
          answer:
            "A process is an independent execution environment with its own address space, while a thread is an execution unit inside a process. Threads of the same process can share memory."
        },

        {
          question: "Why are threads generally cheaper than processes?",
          answer:
            "Threads share many process resources, so creating and switching between threads generally requires less overhead than creating and switching between separate processes."
        }
      ]
    },

    {
      id: "start-vs-run",
      title: "3. Interview: start() vs run()",

      code: {
        language: "java",
        code: `Thread thread =
    new Thread(() -> {

        System.out.println(
            Thread.currentThread().getName()
        );
    });

thread.start();`
      },

      interviewQuestions: [
        {
          question: "What is the difference between start() and run()?",
          answer:
            "start() creates a new thread of execution and then invokes run() on that new thread. Calling run() directly is just a normal method call and does not create a new thread."
        },

        {
          question: "Can the same Thread object be started twice?",
          answer:
            "No. Calling start() more than once on the same Thread object throws IllegalThreadStateException."
        }
      ]
    },

    {
      id: "runnable-vs-callable",
      title: "4. Interview: Runnable vs Callable",

      bullets: [
        "Runnable does not return a result.",
        "Callable returns a result.",
        "Callable.call() can throw checked exceptions.",
        "Runnable.run() cannot declare checked exceptions in its method signature.",
        "Callable is commonly submitted to ExecutorService and represented by a Future."
      ],

      interviewQuestions: [
        {
          question: "When would you use Callable instead of Runnable?",
          answer:
            "Use Callable when the task needs to return a result or needs to propagate a checked exception through Future."
        }
      ]
    },

    {
      id: "execute-vs-submit-interview",
      title: "5. Interview: execute() vs submit()",

      code: {
        language: "java",
        code: `executor.execute(() -> {
    System.out.println("Task");
});

Future<Integer> future =
    executor.submit(() -> 100);`
      },

      interviewQuestions: [
        {
          question: "What is the difference between execute() and submit()?",
          answer:
            "execute() accepts a Runnable and returns void. submit() accepts Runnable or Callable and returns a Future, allowing result retrieval, cancellation, and task-status tracking."
        },

        {
          question: "How are exceptions handled differently?",
          answer:
            "An exception from a task submitted using submit() is captured by the Future and is typically observed through get() as an ExecutionException. With execute(), an uncaught task exception can reach the thread's uncaught-exception handling."
        }
      ]
    },

    {
      id: "future-get",
      title: "6. Interview: Why Can Future.get() Be Dangerous?",

      paragraphs: [
        "Future.get() waits until the task completes. If it is called on an important request thread and the task takes a long time, the request thread can remain blocked.",
        "This does not mean Future is bad. It means the application should understand where blocking occurs."
      ],

      code: {
        language: "java",
        code: `Future<String> future =
    executor.submit(() -> {

        return callExternalService();
    });

String result =
    future.get();`
      },

      interviewQuestions: [
        {
          question: "Does submit() block the calling thread?",
          answer:
            "No. submit() normally returns immediately with a Future. Future.get() is the operation that may block while waiting for the result."
        }
      ]
    },

    {
      id: "race-condition-scenario",
      title: "7. Backend Scenario: Race Condition",

      paragraphs: [
        "Suppose multiple requests update the same shared counter. The expression count++ is a read-modify-write operation and is not atomic."
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

      paragraphs: [
        "If multiple threads execute increment() concurrently, updates can be lost."
      ],

      interviewQuestions: [
        {
          question: "How would you fix this counter?",
          answer:
            "Depending on the requirement, use AtomicInteger for a simple atomic counter, or synchronized/Lock when the operation involves multiple related pieces of shared state."
        }
      ]
    },

    {
      id: "atomic-counter",
      title: "8. Solution: AtomicInteger",

      code: {
        language: "java",
        code: `class Counter {

    private final AtomicInteger count =
        new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}`
      },

      paragraphs: [
        "AtomicInteger is appropriate when the shared state is a simple integer and the required operations are supported by the atomic API."
      ]
    },

    {
      id: "synchronization-scenario",
      title: "9. Backend Scenario: Synchronization",

      paragraphs: [
        "Suppose two requests attempt to update the same bank account balance at the same time. The update operation must protect the shared state."
      ],

      code: {
        language: "java",
        code: `public class BankAccount {

    private BigDecimal balance;

    public synchronized void deposit(
            BigDecimal amount) {

        balance =
            balance.add(amount);
    }

    public synchronized BigDecimal getBalance() {

        return balance;
    }
}`
      },

      interviewQuestions: [
        {
          question: "Why use synchronized here?",
          answer:
            "The account balance is shared mutable state. synchronized provides mutual exclusion so that only one thread at a time executes the protected operation on the same account object."
        }
      ]
    },

    {
      id: "volatile-scenario",
      title: "10. Backend Scenario: volatile",

      paragraphs: [
        "volatile is useful when threads need visibility of updates to a shared variable and the operation itself does not require a compound atomic read-modify-write operation."
      ],

      code: {
        language: "java",
        code: `class Worker {

    private volatile boolean running =
        true;

    public void stop() {
        running = false;
    }

    public void work() {

        while (running) {
            doWork();
        }
    }
}`
      },

      interviewQuestions: [
        {
          question: "Does volatile make count++ thread-safe?",
          answer:
            "No. volatile provides visibility and ordering guarantees, but count++ is still a compound read-modify-write operation and is not atomic."
        }
      ]
    },

    {
      id: "deadlock-scenario",
      title: "11. Backend Scenario: Deadlock",

      code: {
        language: "java",
        code: `Object lockA = new Object();
Object lockB = new Object();

Thread thread1 =
    new Thread(() -> {

        synchronized (lockA) {

            synchronized (lockB) {
                work();
            }
        }
    });

Thread thread2 =
    new Thread(() -> {

        synchronized (lockB) {

            synchronized (lockA) {
                work();
            }
        }
    });`
      },

      paragraphs: [
        "Thread 1 holds lockA and waits for lockB. Thread 2 holds lockB and waits for lockA. Neither can continue."
      ],

      interviewQuestions: [
        {
          question: "How can you prevent this deadlock?",
          answer:
            "Use a consistent lock-ordering rule so all threads acquire multiple locks in the same order. Other approaches include reducing lock scope and using timed tryLock() where appropriate."
        }
      ]
    },

    {
      id: "deadlock-four-conditions",
      title: "12. Four Conditions for Deadlock",

      bullets: [
        "Mutual exclusion",
        "Hold and wait",
        "No preemption",
        "Circular wait"
      ],

      paragraphs: [
        "A classic deadlock requires these four conditions to exist together. Breaking one of the conditions can prevent the deadlock."
      ]
    },

    {
      id: "thread-pool-scenario",
      title: "13. Backend Scenario: Choosing a Thread Pool",

      paragraphs: [
        "Suppose a Spring Boot application receives many requests that perform external HTTP calls. The work is mostly I/O-bound, so threads spend significant time waiting."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        10,
        20,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      },

      interviewQuestions: [
        {
          question: "How do you decide thread-pool size?",
          answer:
            "There is no universal number. For CPU-bound work, a starting point is related to available processors. For I/O-bound work, more concurrency may be appropriate because tasks spend time waiting. The final configuration should consider workload, queue capacity, database connections, downstream limits, latency, throughput, and measurements."
        }
      ]
    },

    {
      id: "threadpool-flow",
      title: "14. Interview: ThreadPoolExecutor Task Flow",

      code: {
        language: "text",
        code: `submit(task)
     |
     v
Workers < corePoolSize?
     |
    Yes
     ↓
Create worker


No
 |
 v
Queue task


Queue full?
 |
Yes
 ↓
Workers < maxPoolSize?
 |
Yes
 ↓
Create additional worker


No
 |
 v
Reject task`
      },

      interviewQuestions: [
        {
          question: "Does ThreadPoolExecutor immediately create maxPoolSize threads?",
          answer:
            "No. It first creates workers up to corePoolSize, then uses the queue. If the queue cannot accept the task and the pool has not reached maxPoolSize, additional workers can be created."
        }
      ]
    },

    {
      id: "blockingqueue-scenario",
      title: "15. Backend Scenario: BlockingQueue",

      paragraphs: [
        "BlockingQueue is useful when producers and consumers need safe coordination and when producers may need to wait because the queue is full or consumers may need to wait because the queue is empty."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(10);

queue.put("Order-1");

String order =
    queue.take();`
      },

      interviewQuestions: [
        {
          question: "What is the difference between put() and offer()?",
          answer:
            "put() waits if necessary until space becomes available. offer() attempts to add the element and returns false if it cannot do so immediately, unless a timed form is used."
        },

        {
          question: "What is the difference between take() and poll()?",
          answer:
            "take() waits if the queue is empty. poll() returns immediately with null when no element is available, unless a timed form is used."
        }
      ]
    },

    {
      id: "completablefuture-scenario",
      title: "16. Backend Scenario: Parallel API Calls",

      paragraphs: [
        "Suppose an order details endpoint needs customer information and inventory information. If the two calls are independent, they can be started concurrently and combined after both complete."
      ],

      code: {
        language: "java",
        code: `CompletableFuture<Customer> customer =
    CompletableFuture.supplyAsync(
        () -> customerService.getCustomer(id)
    );

CompletableFuture<Inventory> inventory =
    CompletableFuture.supplyAsync(
        () -> inventoryService.getInventory(id)
    );

CompletableFuture<OrderView> result =
    customer.thenCombine(
        inventory,
        (customerData, inventoryData) ->
            buildOrderView(
                customerData,
                inventoryData
            )
    );`
      },

      interviewQuestions: [
        {
          question: "Why use thenCombine() here?",
          answer:
            "The customer and inventory operations are independent, so they can execute concurrently and their results can be combined after both complete."
        }
      ]
    },

    {
      id: "thencompose-scenario",
      title: "17. Interview: thenCompose() vs thenCombine()",

      code: {
        language: "text",
        code: `Dependent:

Task A
  ↓
Task B

Use thenCompose()


Independent:

Task A ──┐
         ├──> Combined Result
Task B ──┘

Use thenCombine()`
      },

      interviewQuestions: [
        {
          question: "When do you use thenCompose()?",
          answer:
            "Use thenCompose() when the second asynchronous operation depends on the result of the first operation."
        },

        {
          question: "When do you use thenCombine()?",
          answer:
            "Use thenCombine() when two independent CompletableFuture operations need to be combined after both complete."
        }
      ]
    },

    {
      id: "exception-completable",
      title: "18. Backend Scenario: CompletableFuture Exception Handling",

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
    CompletableFuture
        .supplyAsync(() ->
            callService()
        )
        .exceptionally(error -> {

            return "Fallback";
        });`
      },

      interviewQuestions: [
        {
          question: "What is exceptionally() used for?",
          answer:
            "exceptionally() provides a recovery path when the CompletableFuture pipeline completes exceptionally."
        },

        {
          question: "What is the difference between handle() and exceptionally()?",
          answer:
            "exceptionally() is primarily a failure-recovery stage, while handle() receives both the successful result and the exception and can transform either case into a new result."
        }
      ]
    },

    {
      id: "threadlocal-scenario",
      title: "19. Backend Scenario: ThreadLocal",

      paragraphs: [
        "Suppose an application stores a request ID in ThreadLocal so that service code can access the current request context."
      ],

      code: {
        language: "java",
        code: `private static final ThreadLocal<String> REQUEST_ID =
    new ThreadLocal<>();

public void processRequest(String id) {

    try {

        REQUEST_ID.set(id);

        serviceCall();

    } finally {

        REQUEST_ID.remove();
    }
}`
      },

      interviewQuestions: [
        {
          question: "Why is remove() important here?",
          answer:
            "Application server worker threads are often reused. remove() prevents the request ID from remaining on the worker thread and being accidentally visible to a later request."
        }
      ]
    },

    {
      id: "spring-singleton-scenario",
      title: "20. Backend Scenario: Spring Singleton",

      code: {
        language: "java",
        code: `@Service
public class UserService {

    private String currentUser;

    public void process(String user) {

        currentUser = user;

        doWork();
    }
}`
      },

      paragraphs: [
        "This design is dangerous because the Spring service is normally a shared singleton instance. Multiple requests can access currentUser concurrently."
      ],

      interviewQuestions: [
        {
          question: "How would you fix this design?",
          answer:
            "Remove request-specific mutable state from the instance field and use method parameters and local variables instead."
        }
      ]
    },

    {
      id: "stateless-service-scenario",
      title: "21. Recommended Stateless Service",

      code: {
        language: "java",
        code: `@Service
public class UserService {

    public void process(String user) {

        String currentUser =
            user;

        doWork(currentUser);
    }

    private void doWork(String user) {

        System.out.println(user);
    }
}`
      },

      paragraphs: [
        "The request-specific state now belongs to the current method invocation rather than the shared singleton object."
      ]
    },

    {
      id: "concurrenthashmap-scenario",
      title: "22. Backend Scenario: ConcurrentHashMap",

      paragraphs: [
        "Suppose multiple threads maintain a shared in-memory cache. HashMap is not designed for concurrent updates, while ConcurrentHashMap provides concurrent map operations."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Long, String> cache =
    new ConcurrentHashMap<>();

cache.put(1L, "Product");

cache.putIfAbsent(
    2L,
    "Another Product"
);

cache.computeIfAbsent(
    3L,
    key -> loadProduct(key)
);`
      },

      interviewQuestions: [
        {
          question: "Why use ConcurrentHashMap instead of HashMap?",
          answer:
            "ConcurrentHashMap is designed for concurrent access and provides thread-safe map operations without requiring the entire map to be protected by one application-level lock."
        }
      ]
    },

    {
      id: "synchronizer-scenario",
      title: "23. Backend Scenario: CountDownLatch",

      paragraphs: [
        "Suppose an application needs to start a process only after several initialization tasks have completed."
      ],

      code: {
        language: "java",
        code: `CountDownLatch latch =
    new CountDownLatch(3);

executor.submit(() -> {
    loadUsers();
    latch.countDown();
});

executor.submit(() -> {
    loadProducts();
    latch.countDown();
});

executor.submit(() -> {
    loadConfiguration();
    latch.countDown();
});

latch.await();

startApplication();`
      },

      interviewQuestions: [
        {
          question: "Why use CountDownLatch?",
          answer:
            "It allows one or more threads to wait until a specified number of events or tasks have completed. A CountDownLatch is one-time use."
        }
      ]
    },

    {
      id: "semaphore-scenario",
      title: "24. Backend Scenario: Semaphore",

      paragraphs: [
        "Suppose an external service allows only a limited number of concurrent requests. A Semaphore can be used to limit concurrency."
      ],

      code: {
        language: "java",
        code: `Semaphore semaphore =
    new Semaphore(10);

semaphore.acquire();

try {

    callExternalService();

} finally {

    semaphore.release();
}`
      },

      interviewQuestions: [
        {
          question: "Why use Semaphore?",
          answer:
            "Semaphore controls access to a limited resource by maintaining a number of permits. It can be used to limit the number of concurrent operations."
        }
      ]
    },

    {
      id: "virtual-thread-scenario",
      title: "25. Backend Scenario: Virtual Threads",

      paragraphs: [
        "Suppose a service handles a very large number of concurrent requests and each request performs blocking HTTP or database operations. Virtual threads can be considered when the application stack and workload are suitable."
      ],

      code: {
        language: "java",
        code: `try (ExecutorService executor =
         Executors.newVirtualThreadPerTaskExecutor()) {

    Future<String> result =
        executor.submit(() ->
            callExternalService()
        );

    System.out.println(
        result.get()
    );
}`
      },

      interviewQuestions: [
        {
          question: "Do virtual threads remove database connection-pool limits?",
          answer:
            "No. Virtual threads make thread-per-task concurrency more scalable, but database connections remain a finite resource."
        },

        {
          question: "Are virtual threads useful for CPU-bound workloads?",
          answer:
            "They are not a replacement for CPU parallelism. CPU-bound work is still limited primarily by available CPU cores."
        }
      ]
    },

    {
      id: "lock-scenario",
      title: "26. Backend Scenario: ReentrantLock",

      paragraphs: [
        "ReentrantLock is useful when an application needs locking features such as tryLock(), timed lock acquisition, interruptible lock acquisition, or multiple Condition objects."
      ],

      code: {
        language: "java",
        code: `private final Lock lock =
    new ReentrantLock();

public void update() {

    lock.lock();

    try {

        updateSharedState();

    } finally {

        lock.unlock();
    }
}`
      },

      interviewQuestions: [
        {
          question: "Why should unlock() be inside finally?",
          answer:
            "The finally block guarantees that the lock is released even when the protected operation throws an exception."
        }
      ]
    },

    {
      id: "trylock-scenario",
      title: "27. Backend Scenario: tryLock()",

      code: {
        language: "java",
        code: `if (lock.tryLock()) {

    try {

        updateData();

    } finally {

        lock.unlock();
    }

} else {

    handleBusyResource();
}`
      },

      paragraphs: [
        "tryLock() allows a thread to attempt to acquire a lock without waiting indefinitely."
      ]
    },

    {
      id: "interthread-scenario",
      title: "28. Interview: wait(), notify(), notifyAll()",

      interviewQuestions: [
        {
          question: "What is the purpose of wait()?",
          answer:
            "wait() causes the current thread to wait and releases the monitor of the object on which wait() was called."
        },

        {
          question: "Does notify() release the lock immediately?",
          answer:
            "No. notify() wakes a waiting thread conceptually, but the notifying thread still owns the monitor until it exits the synchronized region. The awakened thread must reacquire the monitor before continuing."
        },

        {
          question: "Why is wait() usually used inside a while loop?",
          answer:
            "The condition should be checked again after the thread wakes because another thread may have changed the shared state before the awakened thread reacquires the lock."
        }
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    while (!condition) {

        lock.wait();
    }

    process();
}`
      }
    },

    {
      id: "starvation-livelock",
      title: "29. Interview: Starvation vs Livelock",

      bullets: [
        "Starvation → a thread cannot obtain the resources or CPU time it needs for a sufficiently long period.",
        "Livelock → threads remain active and respond to each other but fail to make useful progress.",
        "Deadlock → threads wait indefinitely for resources held by each other."
      ],

      code: {
        language: "text",
        code: `Deadlock
   ↓
Waiting forever


Starvation
   ↓
Repeatedly denied access


Livelock
   ↓
Active but no useful progress`
      }
    },

    {
      id: "concurrency-vs-parallelism",
      title: "30. Interview: Concurrency vs Parallelism",

      paragraphs: [
        "Concurrency means multiple tasks are in progress during the same period and their execution can overlap.",
        "Parallelism means multiple tasks are actually executing at the same time on different processing resources."
      ],

      code: {
        language: "text",
        code: `Concurrency

Task A ──────┐
             ├── Progress overlaps
Task B ──────┘


Parallelism

CPU 1 → Task A
CPU 2 → Task B`
      }
    },

    {
      id: "visibility-atomicity",
      title: "31. Interview: Visibility vs Atomicity",

      bullets: [
        "Visibility → one thread can see another thread's update.",
        "Atomicity → an operation happens as one indivisible unit.",
        "volatile mainly addresses visibility and ordering.",
        "Atomic classes provide atomic operations.",
        "synchronized provides mutual exclusion along with visibility and ordering guarantees."
      ],

      code: {
        language: "text",
        code: `Visibility
Thread A writes
       ↓
Thread B sees update


Atomicity
count++
       ↓
Must not be interrupted
between its logical steps`
      }
    },

    {
      id: "backend-bottleneck",
      title: "32. Backend Scenario: Thread Pool Looks Fine but API Is Slow",

      paragraphs: [
        "Increasing the number of threads does not automatically solve backend performance problems.",
        "The actual bottleneck may be database connections, slow SQL queries, external APIs, CPU, network latency, connection pools, or lock contention."
      ],

      code: {
        language: "text",
        code: `Requests
   ↓
Thread Pool
   ↓
Database Pool
   ↓
Database

If Database Pool = 20

Adding 200 application threads
does not create 200 DB connections.`
      },

      interviewQuestions: [
        {
          question: "What would you investigate before increasing the thread pool?",
          answer:
            "Check CPU usage, request latency, queue length, database connection-pool usage, SQL performance, downstream latency, external service limits, lock contention, and throughput."
        }
      ]
    },

    {
      id: "threadpool-exhaustion",
      title: "33. Backend Scenario: Thread Pool Exhaustion",

      paragraphs: [
        "Thread pool exhaustion can occur when tasks are slow, blocked, or waiting on resources while new requests continue arriving.",
        "A bounded queue and appropriate rejection policy can provide backpressure instead of allowing unbounded work to accumulate."
      ],

      code: {
        language: "text",
        code: `Too many requests
       ↓
Thread Pool
       ↓
All workers busy
       ↓
Queue grows
       ↓
Queue full
       ↓
Rejection / Backpressure`
      }
    },

    {
      id: "nested-lock",
      title: "34. Interview Scenario: Multiple Locks",

      paragraphs: [
        "When a transaction or operation requires multiple locks, always consider the order in which locks are acquired."
      ],

      code: {
        language: "text",
        code: `Bad:

Thread A → Lock A → Lock B
Thread B → Lock B → Lock A


Safer ordering:

Thread A → Lock A → Lock B
Thread B → Lock A → Lock B`
      },

      interviewQuestions: [
        {
          question: "What is lock ordering?",
          answer:
            "Lock ordering is a rule that requires threads to acquire multiple locks in a consistent global order, reducing the possibility of circular wait and deadlock."
        }
      ]
    },

    {
      id: "production-debugging",
      title: "35. Production Scenario: How Would You Debug a Concurrency Problem?",

      paragraphs: [
        "Start by identifying the symptom and determining whether the problem is race condition, deadlock, starvation, thread-pool exhaustion, excessive blocking, resource contention, or another bottleneck."
      ],

      bullets: [
        "Check application logs.",
        "Check request latency and throughput.",
        "Inspect thread dumps.",
        "Look for BLOCKED, WAITING, and TIMED_WAITING threads.",
        "Check deadlock detection information.",
        "Inspect thread-pool active count and queue size.",
        "Check database connection-pool usage.",
        "Check CPU and memory usage.",
        "Check downstream service latency.",
        "Reproduce the problem with a controlled concurrent test."
      ]
    },

    {
      id: "thread-dump",
      title: "36. Thread Dump Interview Question",

      interviewQuestions: [
        {
          question: "What can you learn from a Java thread dump?",
          answer:
            "A thread dump can show thread states, stack traces, lock ownership and waiting relationships, helping identify deadlocks, blocked threads, long waits, and possible thread-pool problems."
        },

        {
          question: "What thread states are particularly useful when investigating concurrency problems?",
          answer:
            "RUNNABLE, BLOCKED, WAITING, and TIMED_WAITING are especially useful when analyzing thread activity and waiting behavior."
        }
      ]
    },

    {
      id: "scenario-order-service",
      title: "37. Complete Backend Scenario — Order Service",

      paragraphs: [
        "Imagine an Order API that receives many concurrent requests. Each request validates the customer, checks inventory, calls payment, and stores the order.",
        "A good concurrency design separates request-specific state from shared infrastructure and controls each scarce resource independently."
      ],

      code: {
        language: "text",
        code: `HTTP Requests
      |
      v
Controller
      |
      v
Stateless Service
      |
      +-------- Customer Service
      |
      +-------- Inventory
      |
      +-------- Payment API
      |
      v
Repository
      |
      v
Database

Concurrency controls:

Thread execution
      ↓
Executor / Virtual Threads

Shared counters
      ↓
AtomicInteger

Shared maps
      ↓
ConcurrentHashMap

Limited external resource
      ↓
Semaphore

Database
      ↓
Connection Pool`
      }
    },

    {
      id: "scenario-design",
      title: "38. How to Choose the Right Concurrency Tool",

      code: {
        language: "text",
        code: `Need separate state per thread?
        ↓
    ThreadLocal


Need simple atomic counter?
        ↓
    AtomicInteger


Need protect shared critical section?
        ↓
    synchronized / Lock


Need concurrent Map?
        ↓
    ConcurrentHashMap


Need producer-consumer?
        ↓
    BlockingQueue


Need wait for N tasks once?
        ↓
    CountDownLatch


Need limit concurrent access?
        ↓
    Semaphore


Need async composition?
        ↓
    CompletableFuture


Need very high concurrency with blocking I/O?
        ↓
    Virtual Threads`
      }
    },

    {
      id: "important-comparison",
      title: "39. Important Multithreading Comparison",

      code: {
        language: "text",
        code: `synchronized
    → Shared critical section

Lock
    → Advanced explicit locking

volatile
    → Visibility / ordering

AtomicInteger
    → Atomic numeric operations

ThreadLocal
    → Per-thread state

ConcurrentHashMap
    → Concurrent Map

BlockingQueue
    → Producer / Consumer

CountDownLatch
    → Wait for completion

Semaphore
    → Limit concurrency

CompletableFuture
    → Async composition

Virtual Threads
    → Lightweight high concurrency`
      }
    },

    {
      id: "rapid-fire",
      title: "40. Rapid-Fire Interview Questions",

      interviewQuestions: [
        {
          question: "What is a race condition?",
          answer:
            "A race condition occurs when the result depends on the timing or interleaving of concurrent operations on shared state."
        },

        {
          question: "What is thread safety?",
          answer:
            "Thread safety means an object or operation behaves correctly when accessed concurrently according to its intended contract."
        },

        {
          question: "What is mutual exclusion?",
          answer:
            "Mutual exclusion ensures that only one thread at a time enters a protected critical section for a given lock."
        },

        {
          question: "What is a critical section?",
          answer:
            "A critical section is code that accesses shared state and requires controlled concurrent access."
        },

        {
          question: "What does synchronized provide?",
          answer:
            "It provides mutual exclusion for the protected monitor and establishes visibility and ordering guarantees around lock acquisition and release."
        },

        {
          question: "What is CAS?",
          answer:
            "Compare-And-Set is an atomic operation that updates a value only when its current value matches an expected value."
        },

        {
          question: "What is starvation?",
          answer:
            "Starvation occurs when a thread repeatedly fails to obtain the resources or execution opportunity it needs."
        },

        {
          question: "What is livelock?",
          answer:
            "Livelock occurs when threads continue responding to each other but do not make useful progress."
        },

        {
          question: "What is backpressure?",
          answer:
            "Backpressure is a mechanism for preventing producers from overwhelming consumers or downstream resources."
        },

        {
          question: "What is thread-pool exhaustion?",
          answer:
            "It occurs when available worker threads are occupied and new work cannot be processed promptly, often causing queue growth or rejection."
        },

        {
          question: "What is the main advantage of a thread pool?",
          answer:
            "It controls thread creation and allows threads to be reused for multiple tasks, reducing the overhead and resource cost of creating unlimited threads."
        },

        {
          question: "What is the main risk of creating too many threads?",
          answer:
            "Excessive threads can increase memory usage, scheduling overhead, context switching, contention, and overall system instability."
        }
      ]
    },

    {
      id: "interview-scenario-question",
      title: "41. Common Scenario-Based Interview Question",

      paragraphs: [
        "A typical interview question is: 'Your Spring Boot API suddenly becomes slow when traffic increases. What would you check?'",
        "The important part is not to immediately say 'increase the thread pool'. First identify where requests are waiting."
      ],

      bullets: [
        "Check application thread-pool utilization.",
        "Check queue size and rejected tasks.",
        "Check database connection-pool utilization.",
        "Check slow SQL queries.",
        "Check external API latency.",
        "Check CPU utilization.",
        "Check memory and garbage-collection behavior.",
        "Check lock contention.",
        "Check thread dumps.",
        "Check request and downstream latency."
      ]
    },

    {
      id: "final-interview-answer",
      title: "42. Final Interview Answer",

      paragraphs: [
        "In Java, multithreading is used to execute multiple tasks concurrently. Thread safety becomes important when multiple threads access shared mutable state. Java provides synchronized, Lock, volatile, atomic classes, concurrent collections, executors, CompletableFuture, and other concurrency utilities for different problems. In Spring Boot, services are commonly singleton-scoped, so they should generally be designed stateless. Thread pools help control execution resources, while virtual threads can provide highly scalable concurrency for suitable blocking I/O workloads. The correct concurrency solution depends on the workload, shared state, resource limits, and application requirements."
      ]
    },

    {
      id: "final-note",
      title: "43. Final Note",

      bullets: [
        "Race condition → shared state + unsafe concurrent access.",
        "synchronized → protect shared critical sections.",
        "Lock → explicit and advanced locking.",
        "volatile → visibility and ordering, not general atomicity.",
        "AtomicInteger → simple atomic shared counter.",
        "ThreadLocal → separate state per thread.",
        "ConcurrentHashMap → concurrent map.",
        "BlockingQueue → producer-consumer coordination.",
        "CountDownLatch → wait for multiple tasks/events.",
        "Semaphore → limit concurrent access.",
        "CompletableFuture → asynchronous composition.",
        "ThreadPoolExecutor → control task execution resources.",
        "Virtual Threads → scalable thread-per-task concurrency for suitable workloads.",
        "Spring singleton → shared instance, not automatically thread-safe.",
        "Stateless services → preferred Spring Boot design.",
        "Database pools and external services remain independent resource limits."
      ]
    }
  ]
};