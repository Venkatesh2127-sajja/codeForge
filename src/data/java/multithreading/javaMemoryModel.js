export const javaMemoryModel = {
  id: "java-memory-model",

  slug: "java-memory-model",

  title: "Java Memory Model (JMM)",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Understand the Java Memory Model, visibility, atomicity, ordering, volatile, happens-before relationships, and how synchronized and volatile affect communication between threads.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-jmm",
      title: "1. What is the Java Memory Model?",

      paragraphs: [
        "The Java Memory Model, or JMM, defines how threads interact with shared memory and how changes made by one thread become visible to another thread.",
        "It provides rules for visibility, atomicity, and ordering when multiple threads execute concurrently."
      ],

      code: {
        language: "text",
        code: `Thread A                 Thread B

   write                    read
     |                        |
     v                        v
 shared variable        shared variable

        JMM defines
        what Thread B
        is allowed to see`
      }
    },

    {
      id: "thread-memory",
      title: "2. Thread-Local vs Shared Data",

      paragraphs: [
        "Each Java thread has its own execution state and stack, while objects stored in the heap can be shared between threads.",
        "Problems occur when multiple threads access shared mutable state without proper synchronization or memory visibility guarantees."
      ],

      code: {
        language: "text",
        code: `Thread A
  └── Stack

Thread B
  └── Stack

       Shared Heap
           |
           v
      Shared Object`
      }
    },

    {
      id: "visibility-problem",
      title: "3. Visibility Problem",

      paragraphs: [
        "A visibility problem occurs when one thread changes a shared variable but another thread does not reliably observe the updated value.",
        "The problem is not simply about CPU cache. The Java Memory Model defines the visibility guarantees that Java programs can rely on."
      ],

      code: {
        language: "java",
        code: `class Task {

    private boolean running = true;

    public void stop() {
        running = false;
    }

    public void run() {

        while (running) {
            // Work
        }
    }
}`
      },

      bullets: [
        "One thread changes running.",
        "Another thread reads running.",
        "Without proper synchronization, visibility is not guaranteed."
      ]
    },

    {
      id: "atomicity-problem",
      title: "4. Atomicity Problem",

      paragraphs: [
        "Atomicity means an operation appears to happen as one indivisible operation.",
        "A compound operation can consist of multiple steps even when it looks like a single line of code."
      ],

      code: {
        language: "java",
        code: `count++;

// Conceptually:

read count
add 1
write count`
      },

      bullets: [
        "count++ is not generally atomic.",
        "Two threads can read the same old value.",
        "One increment can overwrite another increment."
      ]
    },

    {
      id: "ordering-problem",
      title: "5. Ordering Problem",

      paragraphs: [
        "The Java Memory Model also defines rules about the ordering and visibility of operations between threads.",
        "Without appropriate synchronization, you should not assume that another thread will observe independent operations in the order you expect."
      ],

      code: {
        language: "java",
        code: `int data = 0;
boolean ready = false;

// Thread A
data = 100;
ready = true;

// Thread B
if (ready) {
    System.out.println(data);
}`
      },

      paragraphs: [
        "The intended logic is that seeing ready as true should also make data = 100 visible. Establishing that relationship requires an appropriate happens-before mechanism."
      ]
    },

    {
      id: "volatile",
      title: "6. volatile",

      paragraphs: [
        "The volatile keyword provides visibility and ordering guarantees for accesses to that variable.",
        "When one thread writes to a volatile variable, another thread reading that volatile variable can observe the updated value according to the Java Memory Model."
      ],

      code: {
        language: "java",
        code: `private volatile boolean running = true;

public void stop() {
    running = false;
}

public void run() {

    while (running) {
        // Work
    }
}`
      },

      bullets: [
        "volatile is useful for simple shared state.",
        "volatile does not provide general mutual exclusion.",
        "volatile does not make count++ atomic."
      ]
    },

    {
      id: "volatile-count",
      title: "7. Why volatile Does Not Fix count++",

      code: {
        language: "java",
        code: `private volatile int count;

public void increment() {
    count++;
}`
      },

      paragraphs: [
        "volatile makes individual reads and writes visible according to its memory semantics, but count++ is still a read-modify-write operation.",
        "Two threads can still read the same value and overwrite each other's result."
      ]
    },

    {
      id: "happens-before",
      title: "8. Happens-Before Relationship",

      paragraphs: [
        "Happens-before is one of the most important concepts in the Java Memory Model.",
        "If action A happens-before action B, the effects that are required to be visible from A are ordered before B according to the Java Memory Model."
      ],

      code: {
        language: "text",
        code: `Action A
   |
   | happens-before
   v
Action B

B can rely on the
required visibility/order
established by A.`
      }
    },

    {
      id: "synchronized-happens-before",
      title: "9. synchronized and Happens-Before",

      paragraphs: [
        "Unlocking an intrinsic monitor happens-before a subsequent successful lock of that same monitor.",
        "This provides both mutual exclusion and the required memory visibility guarantees for correctly synchronized shared state."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {
    data = 100;
}

// Another thread

synchronized (lock) {
    System.out.println(data);
}`
      }
    },

    {
      id: "volatile-happens-before",
      title: "10. volatile and Happens-Before",

      paragraphs: [
        "A write to a volatile variable happens-before every subsequent read of that same volatile variable."
      ],

      code: {
        language: "java",
        code: `private int data;
private volatile boolean ready;

// Thread A
data = 100;
ready = true;

// Thread B
if (ready) {
    System.out.println(data);
}`
      },

      paragraphs: [
        "The volatile write to ready establishes the required happens-before relationship with a subsequent read of ready, so the earlier write to data is visible to that thread under the JMM rules."
      ]
    },

    {
      id: "thread-start",
      title: "11. Thread start() and Happens-Before",

      paragraphs: [
        "Actions in a thread before another thread starts are ordered before actions performed by the started thread."
      ],

      code: {
        language: "java",
        code: `int value = 100;

Thread t = new Thread(() -> {
    System.out.println(value);
});

t.start();`
      },

      paragraphs: [
        "The value assigned before start() is properly published to the started thread according to the thread-start happens-before rule."
      ]
    },

    {
      id: "thread-join",
      title: "12. Thread join() and Happens-Before",

      paragraphs: [
        "Actions performed by a thread happen-before another thread successfully returns from join() on that thread."
      ],

      code: {
        language: "java",
        code: `Thread t = new Thread(() -> {
    result = 100;
});

t.start();

t.join();

System.out.println(result);`
      }
    },

    {
      id: "synchronized-vs-volatile",
      title: "13. synchronized vs volatile",

      bullets: [
        "volatile → visibility and ordering for the variable",
        "synchronized → mutual exclusion plus visibility guarantees",
        "volatile → does not generally make compound operations atomic",
        "synchronized → can protect multiple related operations as one critical section"
      ],

      code: {
        language: "text",
        code: `volatile
   ↓
Visibility + Ordering

synchronized
   ↓
Mutual Exclusion
        +
Visibility
        +
Ordering guarantees`
      }
    },

    {
      id: "atomic-integer",
      title: "14. AtomicInteger and JMM",

      paragraphs: [
        "AtomicInteger provides atomic operations for an integer using concurrency mechanisms such as compare-and-set.",
        "It is useful when the shared state requires individual atomic updates without protecting a larger critical section with synchronized."
      ],

      code: {
        language: "java",
        code: `AtomicInteger count =
    new AtomicInteger();

count.incrementAndGet();`
      }
    },

    {
      id: "safe-publication",
      title: "15. Safe Publication",

      paragraphs: [
        "Safe publication means making an object available to other threads in a way that establishes the required visibility guarantees.",
        "Synchronization, volatile references, final-field semantics, and concurrent utilities are among the mechanisms that can participate in safe publication."
      ],

      code: {
        language: "java",
        code: `private volatile Config config;

public void update(Config newConfig) {
    config = newConfig;
}

public Config getConfig() {
    return config;
}`
      }
    },

    {
      id: "backend-example",
      title: "16. Backend Example",

      paragraphs: [
        "Consider a Spring Boot application where multiple request-handling threads access shared application state.",
        "A mutable singleton field must not be assumed to be thread-safe simply because Spring manages the object."
      ],

      code: {
        language: "java",
        code: `@Service
public class CounterService {

    private final AtomicInteger count =
        new AtomicInteger();

    public int increment() {
        return count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}`
      },

      bullets: [
        "Multiple HTTP requests can execute concurrently.",
        "Shared mutable state requires a thread-safe design.",
        "AtomicInteger is suitable for this simple counter.",
        "For larger multi-step business operations, stronger coordination may be required."
      ]
    },

    {
      id: "common-mistakes",
      title: "17. Common Mistakes",

      bullets: [
        "Assuming count++ is atomic.",
        "Assuming volatile makes an entire class thread-safe.",
        "Using shared mutable fields without synchronization.",
        "Assuming thread execution order without establishing a happens-before relationship.",
        "Using synchronization without considering the actual shared state.",
        "Creating unnecessary shared mutable state in backend services."
      ]
    },

    {
      id: "interview-questions",
      title: "18. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is the Java Memory Model?",
          answer:
            "The JMM defines the rules for how threads interact with shared memory, including visibility, ordering, and atomicity guarantees."
        },

        {
          question: "What is a visibility problem?",
          answer:
            "A visibility problem occurs when one thread changes shared state and another thread does not reliably observe the change because there is no appropriate memory visibility guarantee."
        },

        {
          question: "Is count++ atomic?",
          answer:
            "No. It is a compound read-modify-write operation."
        },

        {
          question: "What does volatile guarantee?",
          answer:
            "volatile provides visibility and ordering guarantees for accesses to the volatile variable, but it does not provide general mutual exclusion."
        },

        {
          question: "Does volatile make count++ thread-safe?",
          answer:
            "No. volatile does not make the complete read-modify-write operation atomic."
        },

        {
          question: "What is happens-before?",
          answer:
            "Happens-before is a JMM ordering relationship that establishes when the effects of one action are guaranteed to be visible and ordered before another action."
        },

        {
          question: "How does synchronized help with the JMM?",
          answer:
            "Correct synchronization provides mutual exclusion and establishes the required visibility and ordering relationships through monitor lock and unlock operations."
        },

        {
          question: "What is the difference between volatile and AtomicInteger?",
          answer:
            "volatile provides visibility and ordering for a variable, while AtomicInteger provides atomic operations such as incrementAndGet and compareAndSet for an integer."
        },

        {
          question: "What happens-before relationship does start() provide?",
          answer:
            "Actions performed by a thread before another thread starts happen-before actions in the started thread."
        },

        {
          question: "What happens-before relationship does join() provide?",
          answer:
            "Actions performed by a thread happen-before another thread successfully returns from join() on that thread."
        }
      ]
    },

    {
      id: "interview-version",
      title: "19. Interview Version",

      paragraphs: [
        "The Java Memory Model defines how threads interact with shared memory and provides rules for visibility, ordering, and atomicity. volatile provides visibility and ordering for a variable, while synchronized provides mutual exclusion together with the required memory visibility guarantees. The happens-before relationship is used to reason about when one thread's actions are guaranteed to be visible to another thread."
      ]
    },

    {
      id: "final-note",
      title: "20. Final Note",

      bullets: [
        "JMM → rules for thread interaction with shared memory",
        "Visibility → one thread can observe another thread's changes",
        "Atomicity → operation behaves as one indivisible unit",
        "Ordering → execution/visibility follows JMM rules",
        "volatile → visibility + ordering, not general atomicity",
        "synchronized → mutual exclusion + visibility",
        "AtomicInteger → atomic operations for suitable variables",
        "happens-before → establishes visibility and ordering relationships"
      ]
    }
  ]
};