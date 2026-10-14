export const deadlockAndConcurrencyProblems = {
  id: "deadlock-and-concurrency-problems",
  slug: "deadlock-and-concurrency-problems",

  title: "Deadlock and Concurrency Problems",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn common Java concurrency problems including race conditions, deadlock, starvation, livelock, resource contention, and practical strategies for preventing them.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "concurrency-problems",
      title: "1. Common Concurrency Problems",

      paragraphs: [
        "Concurrent programs can improve performance and responsiveness, but incorrect coordination can cause several problems.",
        "The most important problems to understand are race conditions, deadlocks, starvation, livelocks, and excessive resource contention."
      ],

      code: {
        language: "text",
        code: `Concurrency Problems
        |
        +-- Race Condition
        |
        +-- Deadlock
        |
        +-- Starvation
        |
        +-- Livelock
        |
        +-- Resource Contention`
      }
    },

    {
      id: "race-condition",
      title: "2. Race Condition",

      paragraphs: [
        "A race condition occurs when multiple threads access shared mutable state concurrently and the result depends on the timing of their execution."
      ],

      code: {
        language: "java",
        code: `class Counter {

    private int count = 0;

    public void increment() {
        count++;
    }
}`
      },

      paragraphs: [
        "If multiple threads call increment() concurrently, updates can be lost because count++ is a read-modify-write operation."
      ]
    },

    {
      id: "race-condition-fix",
      title: "3. Preventing Race Conditions",

      paragraphs: [
        "Race conditions can often be prevented by protecting shared mutable state using synchronization, locks, atomic classes, or suitable concurrent data structures."
      ],

      code: {
        language: "java",
        code: `private final AtomicInteger count =
    new AtomicInteger();

public void increment() {
    count.incrementAndGet();
}`
      }
    },

    {
      id: "deadlock",
      title: "4. What is Deadlock?",

      paragraphs: [
        "A deadlock occurs when two or more threads wait indefinitely for resources or locks held by each other.",
        "Because every thread is waiting for another thread to release something, none of them can make progress."
      ],

      code: {
        language: "text",
        code: `Thread A
   |
   | holds Lock 1
   |
   v
 waits for Lock 2
          ^
          |
   holds Lock 2
   |
Thread B
   |
   v
 waits for Lock 1

Result:
Neither thread can continue.`
      }
    },

    {
      id: "deadlock-example",
      title: "5. Simple Deadlock Example",

      code: {
        language: "java",
        code: `Object lock1 = new Object();
Object lock2 = new Object();

Thread threadA = new Thread(() -> {

    synchronized (lock1) {

        System.out.println(
            "Thread A: Lock 1"
        );

        synchronized (lock2) {

            System.out.println(
                "Thread A: Lock 2"
            );
        }
    }
});

Thread threadB = new Thread(() -> {

    synchronized (lock2) {

        System.out.println(
            "Thread B: Lock 2"
        );

        synchronized (lock1) {

            System.out.println(
                "Thread B: Lock 1"
            );
        }
    }
});`
      },

      paragraphs: [
        "If Thread A acquires lock1 while Thread B acquires lock2, each thread can wait forever for the other lock."
      ]
    },

    {
      id: "coffman",
      title: "6. Four Conditions for Deadlock",

      paragraphs: [
        "The classic Coffman conditions describe four conditions that must coexist for a traditional deadlock to occur."
      ],

      bullets: [
        "Mutual exclusion",
        "Hold and wait",
        "No preemption",
        "Circular wait"
      ]
    },

    {
      id: "mutual-exclusion",
      title: "7. Condition 1 — Mutual Exclusion",

      paragraphs: [
        "At least one resource must be held in a mutually exclusive manner, meaning only one thread can own it at a time."
      ],

      code: {
        language: "text",
        code: `Lock A
   |
   +-- Thread 1 owns it

Thread 2
   |
   +-- must wait`
      }
    },

    {
      id: "hold-and-wait",
      title: "8. Condition 2 — Hold and Wait",

      paragraphs: [
        "A thread holds one resource while waiting to acquire another resource."
      ],

      code: {
        language: "text",
        code: `Thread A

holds Lock 1
     |
     +---- waits for Lock 2`
      }
    },

    {
      id: "no-preemption",
      title: "9. Condition 3 — No Preemption",

      paragraphs: [
        "A resource cannot simply be forcibly taken away from the thread holding it; the thread must release it voluntarily."
      ]
    },

    {
      id: "circular-wait",
      title: "10. Condition 4 — Circular Wait",

      paragraphs: [
        "A circular wait occurs when threads form a cycle where each thread waits for a resource held by the next thread."
      ],

      code: {
        language: "text",
        code: `Thread A
   ↓
waits for B

Thread B
   ↓
waits for C

Thread C
   ↓
waits for A

      ↓

Circular Wait`
      }
    },

    {
      id: "deadlock-prevention",
      title: "11. How to Prevent Deadlock",

      bullets: [
        "Use a consistent lock ordering.",
        "Avoid holding one lock while waiting indefinitely for another.",
        "Keep critical sections small.",
        "Use tryLock() with timeouts where appropriate.",
        "Avoid unnecessary nested locking.",
        "Use higher-level concurrency utilities when they fit the problem."
      ]
    },

    {
      id: "lock-ordering",
      title: "12. Lock Ordering",

      paragraphs: [
        "One of the most practical deadlock prevention techniques is to acquire multiple locks in the same order everywhere."
      ],

      code: {
        language: "text",
        code: `Always acquire:

Lock 1
   ↓
Lock 2

Never:

Thread A:
Lock 1 → Lock 2

Thread B:
Lock 2 → Lock 1`
      }
    },

    {
      id: "safe-lock-ordering",
      title: "13. Safe Lock Ordering Example",

      code: {
        language: "java",
        code: `synchronized (lock1) {

    synchronized (lock2) {

        // Work
    }
}`
      },

      paragraphs: [
        "If every thread follows the same lock acquisition order, circular waiting can be prevented for those locks."
      ]
    },

    {
      id: "try-lock",
      title: "14. Using tryLock() to Reduce Deadlock Risk",

      paragraphs: [
        "ReentrantLock provides tryLock(), which can attempt to acquire a lock without waiting indefinitely."
      ],

      code: {
        language: "java",
        code: `if (lock1.tryLock()) {

    try {

        if (lock2.tryLock()) {

            try {
                performWork();

            } finally {
                lock2.unlock();
            }

        } else {
            // Could not get lock2
        }

    } finally {
        lock1.unlock();
    }
}`
      },

      paragraphs: [
        "A timed tryLock() can also be used when the application needs to wait only for a bounded period."
      ]
    },

    {
      id: "starvation",
      title: "15. Starvation",

      paragraphs: [
        "Starvation occurs when a thread repeatedly fails to obtain the CPU or required resources because other threads continually get access first.",
        "The affected thread may remain unable to make useful progress."
      ],

      code: {
        language: "text",
        code: `Thread A
   ↓
gets resource

Thread B
   ↓
gets resource

Thread A
   ↓
gets resource

Thread B
   ↓
gets resource

Thread C
   ↓
continually waits`
      },

      bullets: [
        "Starvation is different from deadlock.",
        "In starvation, other threads may continue making progress.",
        "Fairness policies can sometimes reduce starvation."
      ]
    },

    {
      id: "livelock",
      title: "16. Livelock",

      paragraphs: [
        "Livelock occurs when threads are active and repeatedly respond to each other, but the system still fails to make useful progress.",
        "Unlike deadlock, the threads are not necessarily blocked; they keep executing."
      ],

      code: {
        language: "text",
        code: `Thread A
   ↓
changes state
   ↓
Thread B responds
   ↓
changes state
   ↓
Thread A responds
   ↓
...

Threads are active,
but no useful progress occurs.`
      }
    },

    {
      id: "deadlock-vs-starvation",
      title: "17. Deadlock vs Starvation vs Livelock",

      bullets: [
        "Deadlock → threads are stuck waiting for each other.",
        "Starvation → a thread cannot get sufficient access to resources while others continue.",
        "Livelock → threads keep changing state but make no useful progress."
      ]
    },

    {
      id: "resource-contention",
      title: "18. Resource Contention",

      paragraphs: [
        "Resource contention occurs when multiple threads compete for a limited resource such as a lock, connection pool, CPU, database connection, or external service capacity."
      ],

      code: {
        language: "text",
        code: `100 request threads
        |
        v
   Database Pool
        |
     10 connections

90 threads may wait
for database access.`
      },

      paragraphs: [
        "Contention does not necessarily mean deadlock. A system can experience high contention while still making progress."
      ]
    },

    {
      id: "backend-deadlock",
      title: "19. Backend Deadlock Example",

      paragraphs: [
        "Imagine two backend operations that update two shared resources but acquire their locks in different orders."
      ],

      code: {
        language: "text",
        code: `Request A:

User Lock
   ↓
Order Lock


Request B:

Order Lock
   ↓
User Lock

Possible result:

User Lock ← Request A
     ↑
     |
     ↓
Order Lock ← Request B`
      }
    },

    {
      id: "backend-prevention",
      title: "20. Backend Prevention Strategy",

      bullets: [
        "Define a consistent lock ordering.",
        "Keep lock scope small.",
        "Avoid holding locks during slow external calls.",
        "Use database transactions and appropriate database locking for database state.",
        "Use optimistic locking where appropriate.",
        "Use distributed coordination mechanisms when multiple application instances share the state.",
        "Monitor thread dumps and lock contention in production."
      ]
    },

    {
      id: "thread-dump",
      title: "21. Detecting Deadlocks",

      paragraphs: [
        "A thread dump can help identify threads waiting for locks and reveal cycles in lock ownership.",
        "Java monitoring tools can also detect deadlocked threads in a running JVM."
      ],

      code: {
        language: "text",
        code: `Thread-1
  WAITING for Lock-B
  owns Lock-A

Thread-2
  WAITING for Lock-A
  owns Lock-B

        ↓

Possible deadlock cycle`
      }
    },

    {
      id: "synchronized-deadlock",
      title: "22. synchronized Can Cause Deadlock",

      paragraphs: [
        "synchronized itself is not a deadlock prevention mechanism.",
        "If multiple synchronized locks are acquired in conflicting orders, deadlock can still occur."
      ],

      code: {
        language: "java",
        code: `synchronized (accountA) {

    synchronized (accountB) {
        transfer();
    }
}`
      }
    },

    {
      id: "lock-deadlock",
      title: "23. ReentrantLock Can Also Cause Deadlock",

      paragraphs: [
        "Explicit locks provide additional control, but they do not automatically prevent deadlocks.",
        "The same lock-ordering and lock-scope principles still apply."
      ],

      code: {
        language: "java",
        code: `lockA.lock();

try {

    lockB.lock();

    try {
        performWork();

    } finally {
        lockB.unlock();
    }

} finally {
    lockA.unlock();
}`
      }
    },

    {
      id: "important-rules",
      title: "24. Important Rules",

      bullets: [
        "Race condition → incorrect result due to unsynchronized shared state.",
        "Deadlock → threads wait indefinitely for each other.",
        "Starvation → a thread repeatedly fails to obtain resources.",
        "Livelock → threads remain active but make no useful progress.",
        "Use consistent lock ordering to prevent circular wait.",
        "Keep critical sections small.",
        "Do not hold locks during slow operations unnecessarily.",
        "Use timeouts where appropriate.",
        "Monitor production systems for contention and deadlocks."
      ]
    },

    {
      id: "interview-questions",
      title: "25. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is deadlock?",
          answer:
            "Deadlock occurs when two or more threads wait indefinitely for resources or locks held by each other."
        },

        {
          question: "What are the four conditions for deadlock?",
          answer:
            "Mutual exclusion, hold and wait, no preemption, and circular wait."
        },

        {
          question: "How can deadlock be prevented?",
          answer:
            "Common techniques include consistent lock ordering, avoiding unnecessary nested locks, keeping critical sections small, and using timed tryLock() where appropriate."
        },

        {
          question: "What is starvation?",
          answer:
            "Starvation occurs when a thread repeatedly fails to obtain required CPU time or resources while other threads continue making progress."
        },

        {
          question: "What is livelock?",
          answer:
            "Livelock occurs when threads remain active and respond to each other but fail to make useful progress."
        },

        {
          question: "What is the difference between deadlock and starvation?",
          answer:
            "Deadlock involves threads waiting on each other so that the involved threads cannot progress, while starvation means one thread is repeatedly denied resources while other work can continue."
        },

        {
          question: "Can synchronized cause deadlock?",
          answer:
            "Yes. Multiple synchronized locks acquired in inconsistent orders can create circular waiting."
        },

        {
          question: "Can ReentrantLock cause deadlock?",
          answer:
            "Yes. Explicit locks can also deadlock if locks are acquired in conflicting orders or otherwise create circular waits."
        },

        {
          question: "How does tryLock() help?",
          answer:
            "tryLock() allows an application to attempt lock acquisition without waiting indefinitely, which can help implement timeout or recovery strategies."
        },

        {
          question: "What is resource contention?",
          answer:
            "Resource contention occurs when multiple threads compete for a limited shared resource."
        }
      ]
    },

    {
      id: "interview-version",
      title: "26. Interview Version",

      paragraphs: [
        "Deadlock occurs when threads wait indefinitely for resources held by each other. The four classic conditions are mutual exclusion, hold and wait, no preemption, and circular wait. Deadlocks can be reduced by consistent lock ordering, minimizing lock scope, avoiding unnecessary nested locking, and using timed tryLock() where appropriate. Starvation means a thread is repeatedly denied resources, while livelock means threads remain active but make no useful progress."
      ]
    },

    {
      id: "final-note",
      title: "27. Final Note",

      bullets: [
        "Race condition → wrong result",
        "Deadlock → waiting forever",
        "Starvation → one thread keeps losing access",
        "Livelock → active but no useful progress",
        "Contention → competition for limited resources",
        "Lock ordering → important deadlock prevention technique",
        "tryLock() → bounded lock acquisition strategy",
        "Small critical sections → reduce contention"
      ]
    }
  ]
};