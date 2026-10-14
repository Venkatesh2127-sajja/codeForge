export const atomicOperations = {
  id: "atomic-operations",
  slug: "atomic-operations",

  title: "Atomic Operations in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn Java atomic operations using AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference, and CAS, with practical examples and interview-focused explanations.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-are-atomic-operations",
      title: "1. What are Atomic Operations?",

      paragraphs: [
        "An atomic operation is an operation that appears to happen as one indivisible step from the perspective of other threads.",
        "Java provides classes in java.util.concurrent.atomic for performing atomic operations on shared variables without using traditional synchronized blocks for every operation."
      ],

      code: {
        language: "text",
        code: `Thread A
    |
    | atomic update
    v
 Shared Value
    ^
    | atomic update
    |
Thread B`
      }
    },

    {
      id: "count-plus-plus",
      title: "2. Why count++ is Not Atomic",

      paragraphs: [
        "The expression count++ looks like one operation, but it is actually a read-modify-write sequence."
      ],

      code: {
        language: "java",
        code: `count++;

// Conceptually:

int temp = count;
temp = temp + 1;
count = temp;`
      },

      bullets: [
        "Thread A reads count.",
        "Thread B reads the same count.",
        "Both calculate a new value.",
        "One update can overwrite the other."
      ]
    },

    {
      id: "atomic-integer",
      title: "3. AtomicInteger",

      paragraphs: [
        "AtomicInteger is used when multiple threads need to safely perform atomic operations on an integer."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger count =
    new AtomicInteger(0);

count.incrementAndGet();`
      },

      bullets: [
        "Thread-safe integer operations",
        "Useful for counters",
        "Supports atomic increment, decrement, update, and compare-and-set operations"
      ]
    },

    {
      id: "atomic-integer-methods",
      title: "4. Important AtomicInteger Methods",

      code: {
        language: "java",
        code: `AtomicInteger count =
    new AtomicInteger(10);

count.get();

count.set(20);

count.incrementAndGet();

count.getAndIncrement();

count.decrementAndGet();

count.getAndDecrement();

count.addAndGet(5);

count.getAndAdd(5);

count.compareAndSet(25, 100);`
      },

      bullets: [
        "get() → returns current value",
        "set() → sets a value",
        "incrementAndGet() → increments and returns new value",
        "getAndIncrement() → returns old value, then increments",
        "decrementAndGet() → decrements and returns new value",
        "getAndDecrement() → returns old value, then decrements",
        "addAndGet() → adds and returns new value",
        "getAndAdd() → returns old value, then adds",
        "compareAndSet() → updates only when the expected value matches"
      ]
    },

    {
      id: "increment-difference",
      title: "5. incrementAndGet() vs getAndIncrement()",

      code: {
        language: "java",
        code: `AtomicInteger count =
    new AtomicInteger(10);

int a = count.incrementAndGet();

// a = 11
// count = 11

int b = count.getAndIncrement();

// b = 11
// count = 12`
      },

      bullets: [
        "incrementAndGet() → increment first, return new value",
        "getAndIncrement() → return old value, then increment"
      ]
    },

    {
      id: "cas",
      title: "6. Compare-And-Set (CAS)",

      paragraphs: [
        "CAS means Compare-And-Set.",
        "It compares the current value with an expected value. If they are equal, it updates the value. Otherwise, the update fails."
      ],

      code: {
        language: "java",
        code: `AtomicInteger value =
    new AtomicInteger(10);

boolean updated =
    value.compareAndSet(10, 20);`
      },

      bullets: [
        "Expected value = 10",
        "Current value = 10",
        "Update to 20",
        "Operation succeeds and returns true"
      ]
    },

    {
      id: "cas-failure",
      title: "7. CAS Failure",

      code: {
        language: "java",
        code: `AtomicInteger value =
    new AtomicInteger(10);

boolean updated =
    value.compareAndSet(5, 20);

// updated = false
// value = 10`
      },

      paragraphs: [
        "The operation fails because the current value is 10, but the expected value supplied to compareAndSet() is 5."
      ]
    },

    {
      id: "cas-simple",
      title: "8. CAS Concept",

      code: {
        language: "text",
        code: `Read current value
       |
       v
Is current == expected?
       |
    +--+--+
    |     |
   Yes    No
    |     |
 Update  Fail
    |
 Success`
      },

      paragraphs: [
        "CAS allows a thread to update shared state only if the value has not changed since it was observed."
      ]
    },

    {
      id: "atomic-long",
      title: "9. AtomicLong",

      paragraphs: [
        "AtomicLong provides atomic operations for long values."
      ],

      code: {
        language: "java",
        code: `AtomicLong total =
    new AtomicLong(0);

total.addAndGet(100);

long value =
    total.get();`
      },

      bullets: [
        "Useful for large counters",
        "Useful for IDs and statistics where an atomic long operation is sufficient",
        "Provides CAS-based operations similar to AtomicInteger"
      ]
    },

    {
      id: "atomic-boolean",
      title: "10. AtomicBoolean",

      paragraphs: [
        "AtomicBoolean provides atomic operations for a boolean value."
      ],

      code: {
        language: "java",
        code: `AtomicBoolean started =
    new AtomicBoolean(false);

if (started.compareAndSet(false, true)) {
    System.out.println(
        "Started successfully"
    );
}`
      },

      paragraphs: [
        "This pattern can ensure that only one competing thread successfully changes the state from false to true."
      ]
    },

    {
      id: "atomic-reference",
      title: "11. AtomicReference",

      paragraphs: [
        "AtomicReference provides atomic operations on object references."
      ],

      code: {
        language: "java",
        code: `AtomicReference<String> status =
    new AtomicReference<>("NEW");

status.compareAndSet(
    "NEW",
    "PROCESSING"
);`
      },

      bullets: [
        "Useful for atomic reference replacement",
        "Useful for simple state transitions",
        "CAS compares the object reference according to the atomic reference semantics"
      ]
    },

    {
      id: "atomic-array",
      title: "12. Atomic Array Classes",

      paragraphs: [
        "Java also provides atomic array classes for atomic operations on array elements."
      ],

      code: {
        language: "java",
        code: `AtomicIntegerArray values =
    new AtomicIntegerArray(5);

values.incrementAndGet(0);

values.compareAndSet(
    1,
    0,
    100
);`
      },

      bullets: [
        "AtomicIntegerArray",
        "AtomicLongArray",
        "AtomicReferenceArray"
      ]
    },

    {
      id: "atomic-vs-volatile",
      title: "13. Atomic Classes vs volatile",

      bullets: [
        "volatile → visibility and ordering for a variable",
        "AtomicInteger → atomic operations on an integer",
        "volatile count++ → still not atomic",
        "AtomicInteger.incrementAndGet() → atomic increment"
      ],

      code: {
        language: "java",
        code: `volatile int count;

count++; // Not atomic

AtomicInteger atomicCount =
    new AtomicInteger();

atomicCount.incrementAndGet(); // Atomic`
      }
    },

    {
      id: "atomic-vs-synchronized",
      title: "14. Atomic Classes vs synchronized",

      paragraphs: [
        "Atomic classes are useful for simple independent atomic operations.",
        "synchronized is more appropriate when several related operations must be performed together as one critical section."
      ],

      code: {
        language: "java",
        code: `// Atomic operation

count.incrementAndGet();


// Multiple related operations

synchronized (lock) {

    if (balance >= amount) {
        balance -= amount;
        recordTransaction();
    }
}`
      },

      bullets: [
        "Atomic class → simple atomic state transition",
        "synchronized → compound business operation",
        "The correct choice depends on the shared-state operation"
      ]
    },

    {
      id: "atomicity-vs-visibility",
      title: "15. Atomicity vs Visibility",

      bullets: [
        "Visibility → whether another thread can observe a change",
        "Atomicity → whether an operation behaves as one indivisible operation",
        "volatile mainly addresses visibility and ordering",
        "Atomic classes provide specific atomic operations and memory visibility guarantees"
      ]
    },

    {
      id: "backend-counter",
      title: "16. Backend Counter Example",

      paragraphs: [
        "Suppose a backend service needs to count processed requests across multiple request-handling threads."
      ],

      code: {
        language: "java",
        code: `@Service
public class RequestCounter {

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

      paragraphs: [
        "Because the counter is shared by concurrent requests, AtomicInteger can provide the required atomic increment operation."
      ]
    },

    {
      id: "cas-loop",
      title: "17. CAS Loop",

      paragraphs: [
        "A CAS loop repeatedly reads the current value and attempts to update it. If another thread changes the value first, the operation retries."
      ],

      code: {
        language: "java",
        code: `AtomicInteger count =
    new AtomicInteger(0);

int current;
int next;

do {
    current = count.get();
    next = current + 1;

} while (!count.compareAndSet(
    current,
    next
));`
      },

      paragraphs: [
        "In normal application code, prefer the higher-level atomic methods such as incrementAndGet() when they directly express the required operation."
      ]
    },

    {
      id: "limitations",
      title: "18. Important Limitations",

      bullets: [
        "Atomic classes do not automatically make an entire object thread-safe.",
        "They are not a replacement for every use of synchronized or Lock.",
        "Multiple related variables may require a larger synchronization strategy.",
        "CAS-based operations can retry under contention.",
        "For distributed systems, JVM-local atomic classes do not coordinate state across different application instances."
      ]
    },

    {
      id: "important-rules",
      title: "19. Important Rules",

      bullets: [
        "Use AtomicInteger for suitable integer atomic operations.",
        "Use AtomicLong for suitable long atomic operations.",
        "Use AtomicBoolean for atomic boolean state transitions.",
        "Use AtomicReference for atomic reference updates.",
        "Use compareAndSet() when the update depends on the current value.",
        "Use synchronized or Lock when multiple operations must be protected together.",
        "Do not confuse atomicity with overall thread safety."
      ]
    },

    {
      id: "interview-questions",
      title: "20. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is an atomic operation?",
          answer:
            "An atomic operation appears to happen as one indivisible operation from the perspective of other threads."
        },

        {
          question: "Why is count++ not atomic?",
          answer:
            "Because it consists of a read, modification, and write operation."
        },

        {
          question: "What is AtomicInteger?",
          answer:
            "AtomicInteger is a thread-safe class that provides atomic operations on an integer, such as incrementAndGet and compareAndSet."
        },

        {
          question: "What is CAS?",
          answer:
            "CAS, or Compare-And-Set, updates a value only when its current value matches the expected value."
        },

        {
          question: "What happens when compareAndSet() fails?",
          answer:
            "The value is not changed and compareAndSet() returns false."
        },

        {
          question: "What is the difference between incrementAndGet() and getAndIncrement()?",
          answer:
            "incrementAndGet() increments first and returns the new value, while getAndIncrement() returns the old value and then increments."
        },

        {
          question: "Can AtomicInteger replace synchronized everywhere?",
          answer:
            "No. AtomicInteger is suitable for specific atomic operations, while synchronized can protect a larger critical section containing multiple related operations."
        },

        {
          question: "What is AtomicReference?",
          answer:
            "AtomicReference provides atomic operations for updating and comparing an object reference."
        },

        {
          question: "What is AtomicBoolean used for?",
          answer:
            "It is useful for atomic boolean state transitions such as changing a state from false to true only once."
        },

        {
          question: "Are Atomic classes useful across multiple JVM instances?",
          answer:
            "No. They provide atomic coordination within a JVM. They do not provide distributed synchronization across separate application instances."
        }
      ]
    },

    {
      id: "interview-version",
      title: "21. Interview Version",

      paragraphs: [
        "Java provides atomic classes such as AtomicInteger, AtomicLong, AtomicBoolean, and AtomicReference for thread-safe atomic operations. They are useful for simple shared-state operations such as counters and state transitions. CAS, or Compare-And-Set, updates a value only when its current value matches an expected value. Atomic classes are not a replacement for synchronized when multiple related operations must be protected together."
      ]
    },

    {
      id: "final-note",
      title: "22. Final Note",

      bullets: [
        "Atomic operation → indivisible operation",
        "AtomicInteger → atomic int operations",
        "AtomicLong → atomic long operations",
        "AtomicBoolean → atomic boolean state",
        "AtomicReference → atomic object reference updates",
        "CAS → compare expected value and update",
        "volatile → visibility, not general atomicity",
        "synchronized → protect larger critical sections",
        "Atomic classes → JVM-local thread coordination"
      ]
    }
  ]
};