export const threadLocalAndSpringThreadSafety = {
  id: "threadlocal-and-spring-thread-safety",

  slug: "thread-local-and-spring-thread-safety",

  title: "ThreadLocal and Thread Safety in Spring Boot",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn ThreadLocal, thread-local state, thread pools, Spring singleton thread safety, stateless services, request context, asynchronous execution, and practical thread-safety patterns in Spring Boot.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-threadlocal",
      title: "1. What is ThreadLocal?",

      paragraphs: [
        "ThreadLocal is a Java class that provides thread-local variables.",
        "A ThreadLocal variable gives each thread its own independent value.",
        "Multiple threads can use the same ThreadLocal object, but each thread sees its own value."
      ],

      code: {
        language: "java",
        code: `ThreadLocal<String> userContext =
    new ThreadLocal<>();

userContext.set("User-A");

String value =
    userContext.get();

System.out.println(value);`
      },

      output: `User-A`
    },

    {
      id: "threadlocal-concept",
      title: "2. ThreadLocal Concept",

      paragraphs: [
        "Normally, if multiple threads access the same instance field, they may access shared state.",
        "ThreadLocal changes this model by providing separate storage for each thread."
      ],

      code: {
        language: "text",
        code: `Normal shared variable

Thread A ──┐
Thread B ──┼──> Same shared value
Thread C ──┘


ThreadLocal

Thread A ──> Value A
Thread B ──> Value B
Thread C ──> Value C`
      }
    },

    {
      id: "set-get-remove",
      title: "3. set(), get(), and remove()",

      paragraphs: [
        "The three most important ThreadLocal operations are set(), get(), and remove().",
        "set() stores a value for the current thread.",
        "get() retrieves the value associated with the current thread.",
        "remove() removes the value associated with the current thread."
      ],

      code: {
        language: "java",
        code: `ThreadLocal<String> context =
    new ThreadLocal<>();

context.set("Request-123");

String value =
    context.get();

System.out.println(value);

context.remove();`
      }
    },

    {
      id: "simple-example",
      title: "4. Simple ThreadLocal Example",

      code: {
        language: "java",
        code: `ThreadLocal<String> user =
    new ThreadLocal<>();

Thread thread1 =
    new Thread(() -> {

        user.set("Alice");

        System.out.println(
            Thread.currentThread().getName()
            + " -> "
            + user.get()
        );

        user.remove();
    });

Thread thread2 =
    new Thread(() -> {

        user.set("Bob");

        System.out.println(
            Thread.currentThread().getName()
            + " -> "
            + user.get()
        );

        user.remove();
    });

thread1.start();
thread2.start();`
      },

      paragraphs: [
        "Although both threads use the same ThreadLocal object, each thread has its own value."
      ]
    },

    {
      id: "threadlocal-output",
      title: "5. Understanding the Output",

      paragraphs: [
        "The exact order of output is not guaranteed because the operating system and JVM scheduler decide when each thread runs."
      ],

      code: {
        language: "text",
        code: `Thread-0 -> Alice
Thread-1 -> Bob`
      },

      paragraphs: [
        "The important point is that Thread-0 sees Alice and Thread-1 sees Bob. One thread does not overwrite the other thread's ThreadLocal value."
      ]
    },

    {
      id: "why-threadlocal",
      title: "6. Why Do We Need ThreadLocal?",

      bullets: [
        "To maintain data specific to the current thread.",
        "To avoid passing certain contextual data through many method parameters.",
        "To maintain request-related context in thread-based processing.",
        "To provide per-thread state when shared state is not appropriate.",
        "To support certain framework and infrastructure use cases."
      ],

      code: {
        language: "text",
        code: `Request
   ↓
Controller
   ↓
Service
   ↓
Repository

Instead of passing context through
every method:

ThreadLocal
   ↓
Current thread's context`
      }
    },

    {
      id: "threadlocal-withinitial",
      title: "7. ThreadLocal.withInitial()",

      paragraphs: [
        "ThreadLocal.withInitial() can be used to provide an initial value when a thread first accesses the ThreadLocal."
      ],

      code: {
        language: "java",
        code: `ThreadLocal<Integer> counter =
    ThreadLocal.withInitial(() -> 0);

System.out.println(counter.get());

counter.set(counter.get() + 1);

System.out.println(counter.get());`
      },

      output: `0
1`
    },

    {
      id: "threadlocal-thread-pool",
      title: "8. ThreadLocal with Thread Pools",

      paragraphs: [
        "ThreadLocal requires special attention when thread pools are used.",
        "A thread pool reuses worker threads. Therefore, a value stored in ThreadLocal can remain associated with a worker thread after the current task finishes."
      ],

      code: {
        language: "java",
        code: `ExecutorService executor =
    Executors.newFixedThreadPool(2);

ThreadLocal<String> user =
    new ThreadLocal<>();

executor.submit(() -> {

    user.set("Alice");

    System.out.println(
        user.get()
    );

});

executor.submit(() -> {

    System.out.println(
        user.get()
    );

});

executor.shutdown();`
      }
    },

    {
      id: "why-remove",
      title: "9. Why is remove() Important?",

      paragraphs: [
        "When using ThreadLocal with reusable worker threads, remove() should normally be called after the task finishes.",
        "Otherwise, stale context may remain associated with the worker thread and can accidentally affect a later task."
      ],

      code: {
        language: "java",
        code: `executor.submit(() -> {

    try {

        user.set("Alice");

        processRequest();

    } finally {

        user.remove();
    }
});`
      },

      bullets: [
        "Set context at the beginning of the task.",
        "Use the context while processing.",
        "Remove the context in finally.",
        "This is especially important with thread pools."
      ]
    },

    {
      id: "spring-singleton",
      title: "10. Spring Singleton Beans and Thread Safety",

      paragraphs: [
        "By default, Spring beans are singleton-scoped.",
        "Singleton means Spring normally creates one bean instance and shares that instance across requests.",
        "Singleton does not automatically mean thread-safe."
      ],

      code: {
        language: "java",
        code: `@Service
public class OrderService {

    private int count = 0;

    public void processOrder() {

        count++;

        System.out.println(count);
    }
}`
      },

      paragraphs: [
        "If multiple requests execute processOrder() concurrently, the instance field count is shared between those requests. The operation count++ is not automatically thread-safe."
      ]
    },

    {
      id: "stateless-service",
      title: "11. Prefer Stateless Spring Services",

      paragraphs: [
        "A common Spring Boot design is to keep service classes stateless.",
        "Instead of storing request-specific data in instance fields, pass data through method parameters and use local variables."
      ],

      code: {
        language: "java",
        code: `@Service
public class OrderService {

    public OrderResponse createOrder(
            CreateOrderRequest request) {

        String customerId =
            request.getCustomerId();

        return processOrder(customerId);
    }

    private OrderResponse processOrder(
            String customerId) {

        return new OrderResponse(customerId);
    }
}`
      },

      bullets: [
        "Request data is passed through method parameters.",
        "Temporary values are stored in local variables.",
        "No mutable request-specific instance fields are required.",
        "Multiple requests can safely use the same singleton service."
      ]
    },

    {
      id: "local-vs-instance",
      title: "12. Local Variables vs Instance Fields",

      paragraphs: [
        "Local variables belong to the executing method invocation and are normally isolated between concurrent method calls.",
        "Instance fields belong to the shared object and may be accessed by multiple threads."
      ],

      code: {
        language: "java",
        code: `@Service
public class UserService {

    public void process(String name) {

        String message =
            "Hello " + name;

        System.out.println(message);
    }
}`
      },

      code: {
        language: "java",
        code: `@Service
public class UserService {

    private String message;

    public void process(String name) {

        message =
            "Hello " + name;

        System.out.println(message);
    }
}`
      },

      paragraphs: [
        "The first design keeps request-specific data in a local variable. The second design stores request-specific data in a shared instance field and can introduce concurrency problems."
      ]
    },

    {
      id: "safe-spring-pattern",
      title: "13. Recommended Spring Boot Thread-Safety Pattern",

      code: {
        language: "text",
        code: `Controller
    ↓
Method parameters
    ↓
Stateless Service
    ↓
Local variables
    ↓
Repository
    ↓
Database`
      },

      bullets: [
        "Keep singleton services stateless.",
        "Prefer immutable objects where practical.",
        "Use method parameters for request-specific data.",
        "Use local variables for temporary state.",
        "Use synchronized, Lock, Atomic classes, or concurrent collections when shared mutable state is actually required."
      ]
    },

    {
      id: "threadlocal-spring",
      title: "14. ThreadLocal in Spring Boot",

      paragraphs: [
        "ThreadLocal can be used in Spring Boot for certain request or execution context scenarios.",
        "Examples include request identifiers, diagnostic context, or other thread-bound infrastructure information."
      ],

      code: {
        language: "java",
        code: `public final class RequestContext {

    private RequestContext() {
    }

    private static final ThreadLocal<String> REQUEST_ID =
        new ThreadLocal<>();

    public static void setRequestId(
            String requestId) {

        REQUEST_ID.set(requestId);
    }

    public static String getRequestId() {

        return REQUEST_ID.get();
    }

    public static void clear() {

        REQUEST_ID.remove();
    }
}`
      }
    },

    {
      id: "request-context",
      title: "15. Request Context Flow",

      paragraphs: [
        "A common pattern is to set a request ID when a request enters the application and remove it after the request has been processed."
      ],

      code: {
        language: "java",
        code: `@Component
public class RequestContextFilter
        extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String requestId =
            request.getHeader("X-Request-ID");

        try {

            RequestContext.setRequestId(
                requestId
            );

            filterChain.doFilter(
                request,
                response
            );

        } finally {

            RequestContext.clear();
        }
    }
}`
      },

      paragraphs: [
        "The finally block is important because the server may reuse the underlying worker thread for another request."
      ]
    },

    {
      id: "threadlocal-limitations",
      title: "16. Limitations of ThreadLocal",

      bullets: [
        "ThreadLocal is tied to the current thread.",
        "It is not automatically propagated to another thread.",
        "It can cause stale data if values are not removed in thread pools.",
        "Large amounts of thread-local state can increase memory usage.",
        "It can make dependencies less visible because data is accessed indirectly.",
        "It should not be used as a replacement for proper application design."
      ]
    },

    {
      id: "threadlocal-completablefuture",
      title: "17. ThreadLocal and CompletableFuture",

      paragraphs: [
        "A normal ThreadLocal value belongs to the thread that set it.",
        "CompletableFuture stages may execute on different threads, especially when using async methods and executors.",
        "Therefore, ordinary ThreadLocal values should not be assumed to automatically propagate across asynchronous execution boundaries."
      ],

      code: {
        language: "java",
        code: `ThreadLocal<String> context =
    new ThreadLocal<>();

context.set("Request-123");

CompletableFuture
    .runAsync(() -> {

        System.out.println(
            context.get()
        );
    });`
      },

      paragraphs: [
        "The asynchronous stage may execute on another thread, so relying on the original ThreadLocal value can produce unexpected behavior."
      ]
    },

    {
      id: "threadlocal-vs-synchronized",
      title: "18. ThreadLocal vs synchronized",

      bullets: [
        "ThreadLocal → gives each thread independent state.",
        "synchronized → protects shared state through mutual exclusion.",
        "ThreadLocal does not make shared data safe.",
        "synchronized does not create separate copies of data."
      ],

      code: {
        language: "text",
        code: `ThreadLocal

Thread A → Value A
Thread B → Value B


synchronized

Thread A ──┐
           ├── Shared State
Thread B ──┘

Only one thread enters
the synchronized section
at a time.`
      }
    },

    {
      id: "threadlocal-vs-atomic",
      title: "19. ThreadLocal vs AtomicInteger",

      bullets: [
        "ThreadLocal → separate value for every thread.",
        "AtomicInteger → one shared integer that supports atomic operations.",
        "ThreadLocal is useful for per-thread context.",
        "AtomicInteger is useful for shared counters and atomic numeric updates."
      ],

      code: {
        language: "java",
        code: `// ThreadLocal

ThreadLocal<Integer> localCount =
    ThreadLocal.withInitial(() -> 0);


// Shared atomic counter

AtomicInteger sharedCount =
    new AtomicInteger(0);

sharedCount.incrementAndGet();`
      }
    },

    {
      id: "backend-request-id",
      title: "20. Practical Backend Example — Request ID",

      paragraphs: [
        "Suppose every incoming HTTP request has a unique request ID. The application wants to include that ID in logs created by different service methods during the request."
      ],

      code: {
        language: "java",
        code: `public final class RequestContext {

    private static final ThreadLocal<String> REQUEST_ID =
        new ThreadLocal<>();

    private RequestContext() {
    }

    public static void set(
            String requestId) {

        REQUEST_ID.set(requestId);
    }

    public static String get() {

        return REQUEST_ID.get();
    }

    public static void clear() {

        REQUEST_ID.remove();
    }
}`
      }
    },

    {
      id: "service-usage",
      title: "21. Using Request Context in a Service",

      code: {
        language: "java",
        code: `@Service
public class PaymentService {

    public void processPayment() {

        String requestId =
            RequestContext.get();

        System.out.println(
            "Processing payment. Request ID = "
            + requestId
        );
    }
}`
      },

      paragraphs: [
        "This can be useful for infrastructure or diagnostic context, but the application should avoid putting large amounts of business state into ThreadLocal."
      ]
    },

    {
      id: "spring-thread-safety-checklist",
      title: "22. Spring Boot Thread-Safety Checklist",

      bullets: [
        "Is this Spring bean singleton-scoped?",
        "Does it contain mutable instance fields?",
        "Can multiple requests access those fields concurrently?",
        "Can the state be moved into local variables?",
        "Can the state be passed through method parameters?",
        "If shared mutable state is required, is it properly synchronized?",
        "Could AtomicInteger or another atomic class solve the problem?",
        "Could a concurrent collection solve the problem?",
        "If ThreadLocal is used, is remove() guaranteed?",
        "Does asynchronous execution cross thread boundaries?"
      ]
    },

    {
      id: "common-mistakes",
      title: "23. Common Mistakes",

      bullets: [
        "Thinking Spring singleton beans are automatically thread-safe.",
        "Using mutable instance fields for request-specific data.",
        "Forgetting ThreadLocal.remove().",
        "Assuming ThreadLocal automatically propagates through CompletableFuture.",
        "Using ThreadLocal for large business objects.",
        "Using ThreadLocal when method parameters would be clearer.",
        "Using synchronized when each thread could simply have independent state.",
        "Using ThreadLocal as a replacement for proper concurrency design."
      ]
    },

    {
      id: "complete-spring-example",
      title: "24. Complete Spring Boot Example",

      paragraphs: [
        "The following example demonstrates a stateless Spring service. The request-specific values are method parameters and local variables, so concurrent requests do not share mutable request state."
      ],

      code: {
        language: "java",
        code: `@Service
public class OrderService {

    public OrderResponse createOrder(
            CreateOrderRequest request) {

        String customerId =
            request.getCustomerId();

        BigDecimal total =
            calculateTotal(request);

        return new OrderResponse(
            customerId,
            total
        );
    }

    private BigDecimal calculateTotal(
            CreateOrderRequest request) {

        return request.getItems()
            .stream()
            .map(item ->
                item.getPrice()
                    .multiply(
                        BigDecimal.valueOf(
                            item.getQuantity()
                        )
                    )
            )
            .reduce(
                BigDecimal.ZERO,
                BigDecimal::add
            );
    }
}`
      }
    },

    {
      id: "thread-safe-design",
      title: "25. Thread-Safe Spring Boot Design",

      code: {
        language: "text",
        code: `                    HTTP Requests
                         |
              +----------+----------+
              |          |          |
           Request 1  Request 2  Request 3
              |          |          |
              +----------+----------+
                         |
                  Singleton Service
                         |
                  Stateless Methods
                         |
              +----------+----------+
              |          |          |
           Local      Local      Local
          Variables  Variables  Variables
                         |
                    Repository
                         |
                      Database`
      },

      paragraphs: [
        "The singleton service can safely handle concurrent requests when it does not maintain unsafe shared mutable state."
      ]
    },

    {
      id: "important-difference",
      title: "26. Important Difference: Singleton vs Thread-Safe",

      paragraphs: [
        "Singleton and thread-safe are different concepts.",
        "Singleton answers: How many instances of this bean exist?",
        "Thread-safe answers: Can multiple threads safely use the object concurrently?"
      ],

      code: {
        language: "text",
        code: `Singleton
   ↓
One shared object


Thread-safe
   ↓
Multiple threads can safely
use the object concurrently`
      }
    },

    {
      id: "threadlocal-vs-shared",
      title: "27. ThreadLocal vs Shared State",

      code: {
        language: "text",
        code: `Shared State

Thread A ──┐
Thread B ──┼──> Same object
Thread C ──┘

Need synchronization or
concurrent data structures.


ThreadLocal

Thread A ──> Own value
Thread B ──> Own value
Thread C ──> Own value

No sharing of the ThreadLocal value
between these threads.`
      }
    },

    {
      id: "interview-questions",
      title: "28. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is ThreadLocal?",
          answer:
            "ThreadLocal provides a separate value for each thread. Multiple threads can use the same ThreadLocal object, but each thread maintains its own associated value."
        },

        {
          question: "What are the main ThreadLocal methods?",
          answer:
            "The main methods are set(), get(), remove(), and withInitial() for providing an initial value."
        },

        {
          question: "Why should we call ThreadLocal.remove()?",
          answer:
            "Thread pools reuse worker threads. Removing the value prevents stale thread-local data from remaining on a worker thread and affecting later tasks."
        },

        {
          question: "Is ThreadLocal thread-safe?",
          answer:
            "ThreadLocal provides thread-isolated values, so one thread's ThreadLocal value is separate from another thread's value. It does not make other shared application state thread-safe."
        },

        {
          question: "Are Spring singleton beans thread-safe?",
          answer:
            "No. Singleton scope means one shared bean instance by default; it does not automatically guarantee thread safety."
        },

        {
          question: "How should Spring services usually be designed for thread safety?",
          answer:
            "Prefer stateless services, method parameters, local variables, immutable objects, and appropriate concurrency utilities for genuinely shared mutable state."
        },

        {
          question: "What is the difference between ThreadLocal and synchronized?",
          answer:
            "ThreadLocal provides independent state per thread, while synchronized protects shared state by allowing only one thread at a time to enter the synchronized section."
        },

        {
          question: "What is the difference between ThreadLocal and AtomicInteger?",
          answer:
            "ThreadLocal gives each thread its own value, while AtomicInteger provides one shared integer with atomic operations."
        },

        {
          question: "Can ThreadLocal values automatically move to another thread?",
          answer:
            "No. Ordinary ThreadLocal is associated with the current thread and does not automatically propagate to another thread."
        },

        {
          question: "What happens to ThreadLocal when using CompletableFuture?",
          answer:
            "An asynchronous stage may execute on a different thread, so an ordinary ThreadLocal value should not be assumed to be available there."
        },

        {
          question: "Why are mutable instance fields dangerous in Spring singleton services?",
          answer:
            "Because the same service instance can be accessed concurrently by multiple requests, so unsynchronized mutable fields can become shared mutable state."
        },

        {
          question: "Where can ThreadLocal be useful in Spring Boot?",
          answer:
            "It can be useful for certain thread-bound infrastructure or diagnostic context, such as request identifiers, but it should be used carefully and cleaned up."
        },

        {
          question: "What is the biggest ThreadLocal mistake in a thread pool?",
          answer:
            "Setting a value and failing to remove it, which can leave stale context on a reused worker thread."
        }
      ]
    },

    {
      id: "interview-version",
      title: "29. Interview Version",

      paragraphs: [
        "ThreadLocal provides thread-specific storage, meaning each thread gets its own independent value. It is useful for certain request or execution context scenarios, but values should be removed when using reusable thread pools. In Spring Boot, singleton beans are shared across concurrent requests, so singleton does not automatically mean thread-safe. The preferred design is usually stateless services with method parameters, local variables, immutable state, and appropriate concurrency utilities for shared mutable data."
      ]
    },

    {
      id: "final-note",
      title: "30. Final Note",

      bullets: [
        "ThreadLocal → one value per thread.",
        "set() → stores the current thread's value.",
        "get() → reads the current thread's value.",
        "remove() → clears the current thread's value.",
        "Thread pool → always consider cleanup.",
        "Spring singleton → one shared bean instance by default.",
        "Singleton ≠ automatically thread-safe.",
        "Stateless service → preferred Spring backend design.",
        "Local variables → normally isolated per method invocation.",
        "ThreadLocal ≠ synchronized.",
        "ThreadLocal ≠ AtomicInteger.",
        "ThreadLocal does not automatically propagate across threads.",
        "Always consider thread boundaries when using asynchronous execution."
      ]
    }
  ]
};