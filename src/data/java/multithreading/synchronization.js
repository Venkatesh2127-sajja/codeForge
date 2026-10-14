export const synchronization = {
  id: "synchronization",
  slug: "synchronization",

  title: "Synchronization in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn Java synchronization including race conditions, thread safety, synchronized methods and blocks, object and class locks, critical sections, mutual exclusion, atomicity, visibility, volatile, and AtomicInteger.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-synchronization",
      title: "1. What is Synchronization?",

      paragraphs: [
        "Synchronization is used to safely control access to shared mutable data when multiple threads execute concurrently.",
        "It helps prevent race conditions and provides mutual exclusion for protected critical sections."
      ],

      code: {
        language: "java",
        code: `public synchronized void increment() {
    count++;
}`
      }
    },

    {
      id: "race-condition",
      title: "2. Race Condition",

      paragraphs: [
        "A race condition occurs when multiple threads access shared data concurrently and the result depends on the timing of their execution.",
        "For example, count++ is not an atomic operation."
      ],

      code: {
        language: "java",
        code: `class Counter {

    private int count = 0;

    public void increment() {
        count++;
    }
}`
      }
    },

    {
      id: "thread-safety",
      title: "3. Thread Safety",

      paragraphs: [
        "Thread safety means that a class behaves correctly when multiple threads access it concurrently.",
        "Synchronization is one technique used to make shared mutable state thread-safe."
      ]
    },

    {
      id: "critical-section",
      title: "4. Critical Section",

      paragraphs: [
        "A critical section is the part of code that accesses shared mutable state and must be protected from conflicting concurrent execution."
      ],

      code: {
        language: "java",
        code: `synchronized (this) {
    count++;
}`
      }
    },

    {
      id: "mutual-exclusion",
      title: "5. Mutual Exclusion",

      paragraphs: [
        "Mutual exclusion means only one thread at a time can execute a synchronized section protected by the same lock."
      ],

      code: {
        language: "text",
        code: `Thread A
   ↓
Acquire Lock
   ↓
Critical Section
   ↓
Release Lock

Thread B
   ↓
Wait for Lock`
      }
    },

    {
      id: "synchronized-method",
      title: "6. synchronized Method",

      paragraphs: [
        "A synchronized instance method uses the intrinsic lock of the current object.",
        "Only one thread at a time can execute synchronized instance methods protected by the same object lock."
      ],

      code: {
        language: "java",
        code: `class Counter {

    private int count;

    public synchronized void increment() {
        count++;
    }
}`
      }
    },

    {
      id: "synchronized-block",
      title: "7. synchronized Block",

      paragraphs: [
        "A synchronized block allows us to protect only the required critical section instead of the entire method."
      ],

      code: {
        language: "java",
        code: `public void increment() {

    // Other work

    synchronized (this) {
        count++;
    }

    // Other work
}`
      }
    },

    {
      id: "object-lock",
      title: "8. Object Lock",

      paragraphs: [
        "A synchronized instance method uses the lock associated with the current object.",
        "Different objects have different instance locks."
      ],

      code: {
        language: "java",
        code: `Counter c1 = new Counter();
Counter c2 = new Counter();`
      }
    },

    {
      id: "class-lock",
      title: "9. Class Lock",

      paragraphs: [
        "A static synchronized method uses a class-level lock associated with the Class object."
      ],

      code: {
        language: "java",
        code: `class Counter {

    public static synchronized void reset() {
        // Class-level lock
    }
}`
      }
    },

    {
      id: "object-vs-class-lock",
      title: "10. Object Lock vs Class Lock",

      bullets: [
        "synchronized instance method → object lock",
        "static synchronized method → class-level lock",
        "Different objects have different object locks",
        "A class-level lock is shared by the class",
        "Object lock and class lock are different locks"
      ]
    },

    {
      id: "atomicity",
      title: "11. Atomicity",

      paragraphs: [
        "Atomicity means an operation appears to happen as one indivisible unit from the perspective of other threads.",
        "Synchronization can make multiple operations behave atomically when they are protected by the same lock."
      ],

      code: {
        language: "java",
        code: `public synchronized void increment() {
    count++;
}`
      }
    },

    {
      id: "visibility",
      title: "12. Visibility",

      paragraphs: [
        "Visibility means that changes made by one thread become visible to another thread according to the Java Memory Model.",
        "Synchronization provides the required visibility guarantees when the same lock is used correctly."
      ]
    },

    {
      id: "synchronized-guarantees",
      title: "13. What synchronized Provides",

      bullets: [
        "Mutual exclusion",
        "Atomicity for protected critical sections",
        "Memory visibility",
        "Ordering guarantees associated with monitor synchronization"
      ]
    },

    {
      id: "volatile",
      title: "14. synchronized vs volatile",

      paragraphs: [
        "volatile mainly provides visibility and ordering guarantees for a variable.",
        "volatile does not provide general mutual exclusion and does not make compound operations such as count++ atomic."
      ],

      code: {
        language: "java",
        code: `private volatile boolean running = true;`
      }
    },

    {
      id: "atomic-integer",
      title: "15. synchronized vs AtomicInteger",

      paragraphs: [
        "AtomicInteger provides atomic operations for an integer and is useful for simple shared counters or state."
      ],

      code: {
        language: "java",
        code: `AtomicInteger count =
    new AtomicInteger();

count.incrementAndGet();`
      },

      bullets: [
        "AtomicInteger → useful for individual atomic operations",
        "synchronized → useful for protecting a critical section",
        "AtomicInteger does not replace synchronization for every multi-step operation"
      ]
    },

    {
      id: "bank-example",
      title: "16. Practical Example",

      paragraphs: [
        "A bank account is a simple example of shared mutable state."
      ],

      code: {
        language: "java",
        code: `class BankAccount {

    private int balance;

    public synchronized void deposit(int amount) {
        balance += amount;
    }

    public synchronized void withdraw(int amount) {

        if (balance >= amount) {
            balance -= amount;
        }
    }

    public synchronized int getBalance() {
        return balance;
    }
}`
      }
    },

    {
      id: "important-rules",
      title: "17. Important Rules",

      bullets: [
        "Protect shared mutable state.",
        "Use the same lock for related operations.",
        "Keep critical sections reasonably small.",
        "Do not assume volatile makes compound operations atomic.",
        "Use AtomicInteger for suitable single-variable atomic operations.",
        "Be careful when using multiple locks because deadlocks can occur."
      ]
    },

    {
      id: "interview-questions",
      title: "18. Interview Questions",

      interviewQuestions: [
        {
          question: "What is synchronization in Java?",
          answer:
            "Synchronization controls concurrent access to shared mutable data and provides mutual exclusion and memory visibility for protected operations."
        },

        {
          question: "What is a race condition?",
          answer:
            "A race condition occurs when multiple threads access shared data concurrently and the result depends on the timing of their execution."
        },

        {
          question: "What is a critical section?",
          answer:
            "A critical section is code that accesses shared mutable state and needs protection from conflicting concurrent execution."
        },

        {
          question: "What lock does a synchronized instance method use?",
          answer:
            "It uses the intrinsic lock of the current object."
        },

        {
          question: "What lock does a static synchronized method use?",
          answer:
            "It uses a class-level lock associated with the Class object."
        },

        {
          question: "Is count++ atomic?",
          answer:
            "No. count++ is a read-modify-write operation and is not generally atomic."
        },

        {
          question: "What is the difference between synchronized and volatile?",
          answer:
            "volatile mainly provides visibility and ordering guarantees, while synchronized provides mutual exclusion together with the required visibility guarantees."
        },

        {
          question: "When would you use AtomicInteger?",
          answer:
            "AtomicInteger is useful when a shared integer requires individual atomic operations such as incrementAndGet or compareAndSet."
        }
      ]
    },

    {
      id: "interview-version",
      title: "19. Interview Version",

      paragraphs: [
        "Synchronization is used to protect shared mutable data when multiple threads access it concurrently. It prevents race conditions by providing mutual exclusion for the critical section and also provides memory visibility. A synchronized instance method uses an object lock, while a static synchronized method uses a class-level lock."
      ]
    },

    {
      id: "final-note",
      title: "20. Final Note",

      bullets: [
        "Race condition → the problem",
        "Critical section → code that needs protection",
        "synchronized → protection mechanism",
        "Object lock → instance synchronization",
        "Class lock → static synchronization",
        "Mutual exclusion → one thread at a time",
        "Atomicity → operation behaves as one unit",
        "Visibility → changes become observable",
        "volatile → visibility, not general atomicity",
        "AtomicInteger → atomic operations for suitable variables"
      ]
    }
  ]
};