export const lockApi = {
  id: "lock-api",
  slug: "lock-api",

  title: "Lock API in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn the Java Lock API including Lock, ReentrantLock, tryLock, lockInterruptibly, fairness, reentrancy, Condition, and ReadWriteLock.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-lock",
      title: "1. What is the Lock API?",

      paragraphs: [
        "The Lock API provides explicit locking mechanisms for controlling access to shared mutable state.",
        "The main interface is java.util.concurrent.locks.Lock.",
        "Unlike synchronized, a Lock is explicitly acquired and released by the application."
      ],

      code: {
        language: "java",
        code: `Lock lock = new ReentrantLock();

lock.lock();

try {
    // Critical section
} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "why-lock",
      title: "2. Why Use Lock Instead of synchronized?",

      paragraphs: [
        "synchronized is simple and is usually the first choice for straightforward mutual exclusion.",
        "The Lock API provides additional capabilities such as tryLock(), timed lock acquisition, interruptible lock acquisition, fairness options, and Condition objects."
      ],

      bullets: [
        "synchronized → simpler language-level mechanism",
        "Lock → more flexible explicit mechanism",
        "Use Lock when its additional features are actually useful"
      ]
    },

    {
      id: "reentrant-lock",
      title: "3. ReentrantLock",

      paragraphs: [
        "ReentrantLock is the most commonly used implementation of Lock.",
        "Reentrant means that the thread holding the lock can acquire the same lock again without blocking itself."
      ],

      code: {
        language: "java",
        code: `ReentrantLock lock =
    new ReentrantLock();

lock.lock();

try {
    // Critical section
} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "lock-unlock",
      title: "4. lock() and unlock()",

      paragraphs: [
        "lock() attempts to acquire the lock and waits if another thread currently owns it.",
        "unlock() releases the lock."
      ],

      code: {
        language: "java",
        code: `lock.lock();

try {
    updateBalance();
} finally {
    lock.unlock();
}`
      },

      bullets: [
        "Always release the lock.",
        "Put unlock() inside finally.",
        "Do not call unlock() from a thread that does not own the lock."
      ]
    },

    {
      id: "finally",
      title: "5. Why is finally Important?",

      paragraphs: [
        "If an exception occurs inside the critical section, the lock must still be released.",
        "The finally block guarantees that unlock() is attempted."
      ],

      code: {
        language: "java",
        code: `lock.lock();

try {
    performOperation();

} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "try-lock",
      title: "6. tryLock()",

      paragraphs: [
        "tryLock() attempts to acquire the lock without waiting indefinitely.",
        "It returns true if the lock was acquired and false if it could not be acquired immediately."
      ],

      code: {
        language: "java",
        code: `if (lock.tryLock()) {

    try {
        updateData();
    } finally {
        lock.unlock();
    }

} else {
    System.out.println(
        "Could not acquire lock"
    );
}`
      }
    },

    {
      id: "timed-try-lock",
      title: "7. Timed tryLock()",

      paragraphs: [
        "tryLock() can also wait for a specified amount of time before giving up."
      ],

      code: {
        language: "java",
        code: `if (lock.tryLock(2, TimeUnit.SECONDS)) {

    try {
        updateData();
    } finally {
        lock.unlock();
    }

} else {
    System.out.println(
        "Lock unavailable"
    );
}`
      },

      paragraphs: [
        "The timed form can throw InterruptedException, so the calling code must handle interruption."
      ]
    },

    {
      id: "lock-interruptibly",
      title: "8. lockInterruptibly()",

      paragraphs: [
        "lockInterruptibly() waits for the lock but allows the waiting thread to respond to interruption."
      ],

      code: {
        language: "java",
        code: `try {
    lock.lockInterruptibly();

    try {
        performOperation();
    } finally {
        lock.unlock();
    }

} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "fair-lock",
      title: "9. Fair vs Non-Fair Lock",

      paragraphs: [
        "ReentrantLock can be created as fair or non-fair.",
        "A fair lock attempts to give waiting threads access according to an ordering policy, generally favoring the longest-waiting thread.",
        "The default ReentrantLock is non-fair."
      ],

      code: {
        language: "java",
        code: `ReentrantLock fairLock =
    new ReentrantLock(true);

ReentrantLock defaultLock =
    new ReentrantLock();`
      },

      bullets: [
        "Fair lock → more predictable acquisition ordering",
        "Non-fair lock → can provide better throughput in many workloads",
        "Fairness does not mean application-level starvation can never occur"
      ]
    },

    {
      id: "reentrancy",
      title: "10. Reentrancy",

      paragraphs: [
        "A reentrant lock allows the thread that already owns the lock to acquire it again.",
        "The lock maintains a hold count, and the thread must unlock the lock the corresponding number of times."
      ],

      code: {
        language: "java",
        code: `ReentrantLock lock =
    new ReentrantLock();

lock.lock();

try {

    lock.lock();

    try {
        System.out.println("Nested lock");
    } finally {
        lock.unlock();
    }

} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "lock-vs-synchronized",
      title: "11. Lock vs synchronized",

      bullets: [
        "synchronized → automatic lock release when leaving the synchronized block",
        "Lock → explicit lock() and unlock()",
        "Lock → supports tryLock()",
        "Lock → supports timed acquisition",
        "Lock → supports interruptible acquisition",
        "Lock → supports Condition",
        "ReentrantLock → supports configurable fairness"
      ]
    },

    {
      id: "condition",
      title: "12. Condition",

      paragraphs: [
        "Condition provides thread coordination associated with a Lock.",
        "It provides await(), signal(), and signalAll(), which play a role similar to wait(), notify(), and notifyAll() but are associated with a particular Lock."
      ],

      code: {
        language: "java",
        code: `ReentrantLock lock =
    new ReentrantLock();

Condition condition =
    lock.newCondition();`
      }
    },

    {
      id: "condition-await",
      title: "13. await()",

      paragraphs: [
        "A thread calls await() when it needs to wait for a condition.",
        "The thread must hold the associated Lock.",
        "await() releases the lock while waiting and reacquires it before returning."
      ],

      code: {
        language: "java",
        code: `lock.lock();

try {

    while (!ready) {
        condition.await();
    }

    process();

} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "condition-signal",
      title: "14. signal() and signalAll()",

      paragraphs: [
        "signal() wakes one thread waiting on the Condition.",
        "signalAll() wakes all threads waiting on that Condition.",
        "As with wait/notify, waking does not mean the thread immediately gets the lock."
      ],

      code: {
        language: "java",
        code: `lock.lock();

try {

    ready = true;

    condition.signalAll();

} finally {
    lock.unlock();
}`
      }
    },

    {
      id: "producer-consumer-condition",
      title: "15. Producer-Consumer with Condition",

      paragraphs: [
        "A Lock can provide separate conditions for different waiting situations.",
        "This can make a bounded buffer design clearer than using a single intrinsic monitor condition."
      ],

      code: {
        language: "java",
        code: `class Buffer {

    private final Queue<Integer> queue =
        new ArrayDeque<>();

    private final int capacity = 10;

    private final ReentrantLock lock =
        new ReentrantLock();

    private final Condition notFull =
        lock.newCondition();

    private final Condition notEmpty =
        lock.newCondition();

    public void put(int value)
            throws InterruptedException {

        lock.lock();

        try {

            while (queue.size() == capacity) {
                notFull.await();
            }

            queue.add(value);

            notEmpty.signal();

        } finally {
            lock.unlock();
        }
    }

    public int take()
            throws InterruptedException {

        lock.lock();

        try {

            while (queue.isEmpty()) {
                notEmpty.await();
            }

            int value = queue.remove();

            notFull.signal();

            return value;

        } finally {
            lock.unlock();
        }
    }
}`
      }
    },

    {
      id: "read-write-lock",
      title: "16. ReadWriteLock",

      paragraphs: [
        "ReadWriteLock separates read access from write access.",
        "Multiple readers can generally hold the read lock simultaneously, while the write lock provides exclusive access."
      ],

      code: {
        language: "java",
        code: `ReadWriteLock rwLock =
    new ReentrantReadWriteLock();

Lock readLock =
    rwLock.readLock();

Lock writeLock =
    rwLock.writeLock();`
      },

      bullets: [
        "Read lock → shared access",
        "Write lock → exclusive access",
        "Useful when reads are frequent and writes are relatively less frequent",
        "It is not automatically faster for every workload"
      ]
    },

    {
      id: "backend-example",
      title: "17. Backend Example",

      paragraphs: [
        "Suppose a backend component maintains shared mutable in-memory state and needs to perform a multi-step update.",
        "A ReentrantLock can protect that critical section when features such as tryLock or interruptible acquisition are useful."
      ],

      code: {
        language: "java",
        code: `@Service
public class InventoryService {

    private final ReentrantLock lock =
        new ReentrantLock();

    private int stock = 100;

    public boolean purchase(int quantity) {

        lock.lock();

        try {

            if (stock < quantity) {
                return false;
            }

            stock -= quantity;

            return true;

        } finally {
            lock.unlock();
        }
    }
}`
      },

      paragraphs: [
        "In a real distributed application, database transactions, atomic SQL updates, optimistic locking, or distributed coordination may be more appropriate when the shared state is stored outside a single JVM."
      ]
    },

    {
      id: "common-mistakes",
      title: "18. Common Mistakes",

      bullets: [
        "Forgetting unlock().",
        "Not placing unlock() inside finally.",
        "Calling unlock() from a thread that does not own the lock.",
        "Using tryLock() without handling the false case.",
        "Assuming fair locks always provide better performance.",
        "Holding locks for unnecessarily long periods.",
        "Using an in-memory Lock to protect data shared across multiple application instances."
      ]
    },

    {
      id: "interview-questions",
      title: "19. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is the Lock interface?",
          answer:
            "Lock is a Java concurrency interface that provides explicit control over acquiring and releasing locks."
        },

        {
          question: "What is ReentrantLock?",
          answer:
            "ReentrantLock is an implementation of Lock that allows the owning thread to acquire the same lock multiple times."
        },

        {
          question: "Why should unlock() be placed inside finally?",
          answer:
            "Because the lock should be released even when an exception occurs inside the critical section."
        },

        {
          question: "What is tryLock()?",
          answer:
            "tryLock() attempts to acquire a lock without waiting indefinitely and returns whether the lock was acquired."
        },

        {
          question: "What is lockInterruptibly()?",
          answer:
            "It waits for the lock while allowing the waiting thread to respond to interruption."
        },

        {
          question: "What is a fair ReentrantLock?",
          answer:
            "A fair lock attempts to grant access to waiting threads according to a fairness policy, generally favoring longer-waiting threads."
        },

        {
          question: "What is reentrancy?",
          answer:
            "Reentrancy means a thread that already owns a lock can acquire that same lock again."
        },

        {
          question: "What is Condition?",
          answer:
            "Condition provides await(), signal(), and signalAll() for thread coordination associated with a Lock."
        },

        {
          question: "What is the difference between wait/notify and Condition?",
          answer:
            "wait/notify are associated with an object's intrinsic monitor, while Condition is associated with an explicit Lock and can provide separate waiting conditions."
        },

        {
          question: "What is ReadWriteLock?",
          answer:
            "ReadWriteLock separates read and write access, allowing multiple readers while writes require exclusive access."
        }
      ]
    },

    {
      id: "interview-version",
      title: "20. Interview Version",

      paragraphs: [
        "The Java Lock API provides explicit control over thread synchronization. ReentrantLock supports features such as tryLock(), timed acquisition, interruptible acquisition, fairness, and Condition objects. The lock should always be released in a finally block. Condition provides await(), signal(), and signalAll() for thread communication associated with a Lock."
      ]
    },

    {
      id: "final-note",
      title: "21. Final Note",

      bullets: [
        "Lock → explicit synchronization API",
        "ReentrantLock → common Lock implementation",
        "lock() → acquire",
        "unlock() → release",
        "tryLock() → attempt without indefinite waiting",
        "lockInterruptibly() → acquisition can respond to interruption",
        "Condition → await/signal/signalAll",
        "ReadWriteLock → separate read and write access",
        "finally → always release the lock"
      ]
    }
  ]
};