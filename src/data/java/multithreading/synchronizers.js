export const synchronizers = {
  id: "synchronizers",

  slug: "synchronizers",

  title: "Synchronizers in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn Java synchronizers including CountDownLatch, CyclicBarrier, and Semaphore for coordinating multiple threads and controlling concurrent access to limited resources.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-are-synchronizers",
      title: "1. What are Synchronizers?",

      paragraphs: [
        "Synchronizers are concurrency utilities that help multiple threads coordinate their execution.",
        "Java provides several synchronizers in java.util.concurrent.",
        "Three important ones are CountDownLatch, CyclicBarrier, and Semaphore."
      ],

      code: {
        language: "text",
        code: `CountDownLatch
      ↓
Wait for events/tasks

CyclicBarrier
      ↓
Wait for threads

Semaphore
      ↓
Limit concurrent access`
      }
    },

    {
      id: "countdown-latch",
      title: "2. CountDownLatch",

      paragraphs: [
        "CountDownLatch allows one or more threads to wait until a counter reaches zero.",
        "The count is initialized when the latch is created and cannot be reset."
      ],

      code: {
        language: "java",
        code: `CountDownLatch latch =
    new CountDownLatch(3);`
      }
    },

    {
      id: "latch-await",
      title: "3. await()",

      paragraphs: [
        "A thread calls await() when it needs to wait until the latch count reaches zero."
      ],

      code: {
        language: "java",
        code: `latch.await();

System.out.println(
    "All tasks completed"
);`
      },

      bullets: [
        "If count is greater than zero → thread waits.",
        "If count reaches zero → waiting threads can continue.",
        "await() can throw InterruptedException."
      ]
    },

    {
      id: "latch-countdown",
      title: "4. countDown()",

      paragraphs: [
        "countDown() decreases the latch count by one.",
        "When the count reaches zero, waiting threads are released."
      ],

      code: {
        language: "java",
        code: `latch.countDown();`
      }
    },

    {
      id: "latch-example",
      title: "5. CountDownLatch Example",

      code: {
        language: "java",
        code: `CountDownLatch latch =
    new CountDownLatch(3);

Runnable task = () -> {

    try {

        System.out.println(
            Thread.currentThread().getName()
            + " completed"
        );

        latch.countDown();

    } catch (Exception e) {
        Thread.currentThread().interrupt();
    }
};

new Thread(task, "Task-1").start();
new Thread(task, "Task-2").start();
new Thread(task, "Task-3").start();

try {

    latch.await();

    System.out.println(
        "All tasks completed"
    );

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();
}`
      },

      paragraphs: [
        "The main thread waits until all three worker tasks call countDown()."
      ]
    },

    {
      id: "latch-one-time",
      title: "6. CountDownLatch is One-Time",

      paragraphs: [
        "Once the count reaches zero, the latch remains open.",
        "It cannot be reset for another cycle."
      ],

      code: {
        language: "text",
        code: `Count = 3

countDown()
    ↓
Count = 2

countDown()
    ↓
Count = 1

countDown()
    ↓
Count = 0
    ↓
Latch opens permanently`
      }
    },

    {
      id: "cyclic-barrier",
      title: "7. CyclicBarrier",

      paragraphs: [
        "CyclicBarrier allows a group of threads to wait for each other at a common synchronization point.",
        "When the required number of parties reaches the barrier, all waiting parties are released."
      ],

      code: {
        language: "java",
        code: `CyclicBarrier barrier =
    new CyclicBarrier(3);`
      }
    },

    {
      id: "barrier-await",
      title: "8. barrier.await()",

      paragraphs: [
        "Each participating thread calls await() when it reaches the synchronization point."
      ],

      code: {
        language: "java",
        code: `barrier.await();

System.out.println(
    "All threads reached the barrier"
);`
      }
    },

    {
      id: "barrier-example",
      title: "9. CyclicBarrier Example",

      code: {
        language: "java",
        code: `CyclicBarrier barrier =
    new CyclicBarrier(3);

Runnable task = () -> {

    try {

        System.out.println(
            Thread.currentThread().getName()
            + " reached barrier"
        );

        barrier.await();

        System.out.println(
            Thread.currentThread().getName()
            + " continues"
        );

    } catch (
        InterruptedException |
        BrokenBarrierException e
    ) {

        Thread.currentThread().interrupt();
    }
};

new Thread(task, "Worker-1").start();
new Thread(task, "Worker-2").start();
new Thread(task, "Worker-3").start();`
      }
    },

    {
      id: "barrier-reusable",
      title: "10. Why is it Called CyclicBarrier?",

      paragraphs: [
        "A CyclicBarrier can be reused after the participating threads pass the barrier.",
        "This makes it useful when a computation proceeds through multiple phases."
      ],

      code: {
        language: "text",
        code: `Phase 1
  ↓
Barrier
  ↓
Phase 2
  ↓
Barrier
  ↓
Phase 3
  ↓
Barrier`
      }
    },

    {
      id: "barrier-action",
      title: "11. Barrier Action",

      paragraphs: [
        "A CyclicBarrier can optionally execute a Runnable when the required number of parties reaches the barrier."
      ],

      code: {
        language: "java",
        code: `CyclicBarrier barrier =
    new CyclicBarrier(
        3,
        () -> System.out.println(
            "Phase completed"
        )
    );`
      }
    },

    {
      id: "semaphore",
      title: "12. Semaphore",

      paragraphs: [
        "Semaphore controls access to a resource using a number of permits.",
        "A thread must acquire a permit before entering the protected resource and release it afterward."
      ],

      code: {
        language: "java",
        code: `Semaphore semaphore =
    new Semaphore(3);`
      },

      bullets: [
        "3 permits → at most 3 permit-holding threads at once.",
        "acquire() obtains a permit.",
        "release() returns a permit."
      ]
    },

    {
      id: "semaphore-acquire",
      title: "13. acquire()",

      paragraphs: [
        "acquire() waits until a permit becomes available."
      ],

      code: {
        language: "java",
        code: `semaphore.acquire();

try {
    useResource();
} finally {
    semaphore.release();
}`
      }
    },

    {
      id: "semaphore-try-acquire",
      title: "14. tryAcquire()",

      paragraphs: [
        "tryAcquire() attempts to obtain a permit without waiting indefinitely."
      ],

      code: {
        language: "java",
        code: `if (semaphore.tryAcquire()) {

    try {
        useResource();
    } finally {
        semaphore.release();
    }

} else {
    System.out.println(
        "Resource unavailable"
    );
}`
      }
    },

    {
      id: "semaphore-example",
      title: "15. Semaphore Example",

      code: {
        language: "java",
        code: `Semaphore semaphore =
    new Semaphore(2);

Runnable task = () -> {

    try {

        semaphore.acquire();

        System.out.println(
            Thread.currentThread().getName()
            + " using resource"
        );

        Thread.sleep(1000);

    } catch (InterruptedException e) {

        Thread.currentThread().interrupt();

    } finally {

        semaphore.release();
    }
};`
      },

      paragraphs: [
        "Even if many threads attempt to execute the task, only two can hold permits simultaneously."
      ]
    },

    {
      id: "countdown-vs-barrier",
      title: "16. CountDownLatch vs CyclicBarrier",

      bullets: [
        "CountDownLatch → wait for a count of events/tasks to complete",
        "CyclicBarrier → wait for a group of threads to reach the same point",
        "CountDownLatch → one-time use",
        "CyclicBarrier → reusable",
        "Latch countDown() is performed by workers",
        "Barrier await() is performed by participating parties"
      ]
    },

    {
      id: "barrier-vs-semaphore",
      title: "17. CyclicBarrier vs Semaphore",

      bullets: [
        "CyclicBarrier → coordinates threads at a common point",
        "Semaphore → limits concurrent access to a resource",
        "Barrier → synchronization point",
        "Semaphore → permit-based access control"
      ]
    },

    {
      id: "all-three",
      title: "18. Simple Comparison",

      code: {
        language: "text",
        code: `CountDownLatch
    ↓
"Wait until these tasks finish."

CyclicBarrier
    ↓
"Wait until all participating threads
reach this point."

Semaphore
    ↓
"Only N threads can access
this resource at once."`
      }
    },

    {
      id: "backend-latch",
      title: "19. Backend Example: Application Startup",

      paragraphs: [
        "Suppose several initialization tasks must finish before an application continues with a particular startup phase.",
        "A CountDownLatch can represent those completion events."
      ],

      code: {
        language: "java",
        code: `CountDownLatch latch =
    new CountDownLatch(3);

executor.submit(() -> {
    loadConfiguration();
    latch.countDown();
});

executor.submit(() -> {
    loadCache();
    latch.countDown();
});

executor.submit(() -> {
    initializeData();
    latch.countDown();
});

latch.await();

startApplication();`
      }
    },

    {
      id: "backend-barrier",
      title: "20. Backend Example: Multi-Phase Processing",

      paragraphs: [
        "CyclicBarrier can be useful when several workers perform phase-based processing and no worker should start the next phase until all participating workers finish the current phase."
      ],

      code: {
        language: "text",
        code: `Worker 1 ── Phase 1 ──┐
Worker 2 ── Phase 1 ──┼── Barrier
Worker 3 ── Phase 1 ──┘
                       |
                       v
                  Phase 2`
      }
    },

    {
      id: "backend-semaphore",
      title: "21. Backend Example: Limit Concurrent Resource Usage",

      paragraphs: [
        "A Semaphore can limit concurrent access to a resource when the application must not allow too many operations to happen simultaneously."
      ],

      code: {
        language: "java",
        code: `private final Semaphore semaphore =
    new Semaphore(10);

public void callExternalService()
        throws InterruptedException {

    semaphore.acquire();

    try {
        externalService.call();

    } finally {
        semaphore.release();
    }
}`
      },

      paragraphs: [
        "For example, the semaphore could limit how many concurrent operations are allowed to use a constrained resource. The actual limit should be chosen based on the resource's capacity and application requirements."
      ]
    },

    {
      id: "common-mistakes",
      title: "22. Common Mistakes",

      bullets: [
        "Forgetting semaphore.release().",
        "Using CountDownLatch when the coordination needs to repeat.",
        "Using CyclicBarrier when the real requirement is simply waiting for task completion.",
        "Confusing Semaphore permits with a mutual-exclusion lock.",
        "Assuming a Semaphore with multiple permits provides exclusive access.",
        "Ignoring InterruptedException.",
        "Using a concurrency utility without understanding the lifecycle of the participating threads."
      ]
    },

    {
      id: "interview-questions",
      title: "23. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is CountDownLatch?",
          answer:
            "CountDownLatch allows one or more threads to wait until a counter reaches zero."
        },

        {
          question: "Can CountDownLatch be reused?",
          answer:
            "No. Once its count reaches zero, it cannot be reset."
        },

        {
          question: "What is CyclicBarrier?",
          answer:
            "CyclicBarrier allows a fixed group of threads to wait for each other at a common synchronization point."
        },

        {
          question: "Why is CyclicBarrier reusable?",
          answer:
            "After the participating threads pass the barrier, it can be used again for another synchronization phase."
        },

        {
          question: "What is Semaphore?",
          answer:
            "Semaphore controls concurrent access to a resource using a configurable number of permits."
        },

        {
          question: "What is the difference between Semaphore and Lock?",
          answer:
            "A Lock normally represents ownership by one thread at a time, while a Semaphore can allow multiple threads to hold permits simultaneously."
        },

        {
          question: "What does acquire() do?",
          answer:
            "It obtains a permit from a Semaphore and waits if no permit is available."
        },

        {
          question: "What does release() do?",
          answer:
            "It returns a permit to a Semaphore."
        },

        {
          question: "When would you use CountDownLatch?",
          answer:
            "When one or more threads need to wait for a known set of tasks or events to complete."
        },

        {
          question: "When would you use CyclicBarrier?",
          answer:
            "When a group of threads must reach a common synchronization point before proceeding to the next phase."
        }
      ]
    },

    {
      id: "interview-version",
      title: "24. Interview Version",

      paragraphs: [
        "Java synchronizers help coordinate multiple threads. CountDownLatch allows threads to wait until a counter reaches zero and is one-time use. CyclicBarrier allows a group of threads to wait for each other at a reusable synchronization point. Semaphore controls concurrent access to a resource using permits."
      ]
    },

    {
      id: "final-note",
      title: "25. Final Note",

      bullets: [
        "CountDownLatch → wait for tasks/events to complete",
        "countDown() → decrease latch count",
        "await() → wait for latch to reach zero",
        "CyclicBarrier → threads wait for each other",
        "Barrier → reusable synchronization point",
        "Semaphore → control concurrent resource access",
        "acquire() → obtain permit",
        "release() → return permit"
      ]
    }
  ]
};