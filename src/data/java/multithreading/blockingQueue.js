export const blockingQueue = {
  id: "blocking-queue",
  slug: "blocking-queue",

  title: "BlockingQueue — ArrayBlockingQueue, LinkedBlockingQueue, and SynchronousQueue",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn how BlockingQueue works with ThreadPoolExecutor and understand the differences between ArrayBlockingQueue, LinkedBlockingQueue, and SynchronousQueue.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-blocking-queue",

      title: "1. What is BlockingQueue?",

      paragraphs: [
        "BlockingQueue is a thread-safe queue designed for communication between producer and consumer threads.",

        "In a ThreadPoolExecutor, submitted tasks can wait in a BlockingQueue until a worker thread is available."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);`
      }
    },

    {
      id: "producer-consumer",

      title: "2. Producer-Consumer Model",

      paragraphs: [
        "A producer adds work to the queue and a consumer removes work from the queue.",

        "ThreadPoolExecutor uses this idea: application code submits tasks, and worker threads execute those tasks."
      ],

      code: {
        language: "text",
        code: `Application
     |
     | submit task
     v
BlockingQueue
     |
     | worker takes task
     v
Worker Thread
     |
     v
Execute Task`
      }
    },

    {
      id: "blocking",

      title: "3. Why is it Called BlockingQueue?",

      paragraphs: [
        "Some BlockingQueue operations can wait when the queue cannot immediately complete the requested operation.",

        "For example, take() waits when the queue is empty, while put() waits when a bounded queue is full."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<String> queue =
    new ArrayBlockingQueue<>(10);

queue.put("Task");

String task =
    queue.take();`
      }
    },

    {
      id: "important-methods",

      title: "4. Important BlockingQueue Methods",

      bullets: [
        "put() — waits if the queue is full",
        "take() — waits if the queue is empty",
        "offer() — tries to add without waiting indefinitely",
        "poll() — tries to remove without waiting indefinitely",
        "offer(timeout) — waits up to a specified time",
        "poll(timeout) — waits up to a specified time"
      ],

      code: {
        language: "java",
        code: `queue.put(task);

Runnable task =
    queue.take();

queue.offer(task);

Runnable item =
    queue.poll();`
      }
    },

    {
      id: "array-blocking",

      title: "5. ArrayBlockingQueue",

      paragraphs: [
        "ArrayBlockingQueue is a bounded BlockingQueue backed by an array.",

        "Its capacity is fixed when the queue is created."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new ArrayBlockingQueue<>(100);`
      }
    },

    {
      id: "array-features",

      title: "6. ArrayBlockingQueue Features",

      bullets: [
        "Bounded capacity",
        "Fixed size",
        "Array-backed",
        "Thread-safe",
        "Useful when you want explicit queue limits",
        "Can provide stronger control over memory and queued work"
      ]
    },

    {
      id: "linked-blocking",

      title: "7. LinkedBlockingQueue",

      paragraphs: [
        "LinkedBlockingQueue is a BlockingQueue backed by linked nodes.",

        "It can be created with a specified capacity or without an explicit capacity."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new LinkedBlockingQueue<>(100);`
      }
    },

    {
      id: "linked-unbounded",

      title: "8. LinkedBlockingQueue Without Capacity",

      paragraphs: [
        "If no capacity is specified, LinkedBlockingQueue uses its maximum supported capacity rather than a small practical bound.",

        "For backend systems, an effectively unbounded queue can allow tasks to accumulate during overload."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new LinkedBlockingQueue<>();`
      }
    },

    {
      id: "synchronous",

      title: "9. SynchronousQueue",

      paragraphs: [
        "SynchronousQueue has no internal capacity for storing elements.",

        "Each insertion must directly hand off an element to a receiving thread."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Runnable> queue =
    new SynchronousQueue<>();`
      }
    },

    {
      id: "synchronous-behavior",

      title: "10. How SynchronousQueue Behaves",

      paragraphs: [
        "Unlike a normal queue, a SynchronousQueue does not store tasks waiting for later consumption.",

        "A producer and consumer effectively meet directly for the handoff."
      ],

      code: {
        language: "text",
        code: `Producer
   |
   | task
   v
SynchronousQueue
   |
   | direct handoff
   v
Worker`
      }
    },

    {
      id: "thread-pool-connection",

      title: "11. BlockingQueue and ThreadPoolExecutor",

      paragraphs: [
        "BlockingQueue selection directly affects ThreadPoolExecutor behavior.",

        "After the core pool is filled, ThreadPoolExecutor normally attempts to queue additional tasks before creating threads beyond corePoolSize, depending on the queue and configuration."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(100)
    );`
      }
    },

    {
      id: "bounded-flow",

      title: "12. Bounded Queue Example",

      paragraphs: [
        "With corePoolSize 4, maximumPoolSize 8, and a queue capacity of 100, tasks can first use the core workers and then accumulate in the queue.",

        "If the queue becomes full, ThreadPoolExecutor can create additional workers up to the maximum pool size. If both the maximum workers and queue capacity are exhausted, the rejection policy is used."
      ]
    },

    {
      id: "unbounded-flow",

      title: "13. Unbounded Queue Effect",

      paragraphs: [
        "With an effectively unbounded LinkedBlockingQueue, tasks can continue accumulating in the queue instead of causing the executor to grow beyond corePoolSize under normal ThreadPoolExecutor behavior.",

        "This can hide overload and increase queue latency."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "compare",

      title: "14. ArrayBlockingQueue vs LinkedBlockingQueue vs SynchronousQueue",

      bullets: [
        "ArrayBlockingQueue → bounded, fixed capacity",
        "LinkedBlockingQueue → linked-node queue, capacity can be specified",
        "LinkedBlockingQueue without explicit capacity → effectively unbounded for normal application use",
        "SynchronousQueue → no stored capacity, direct handoff",
        "Queue selection affects worker creation, task waiting, memory usage, and overload behavior"
      ]
    },

    {
      id: "backend-choice",

      title: "15. Which Queue for a Backend?",

      paragraphs: [
        "There is no universal queue that is best for every backend.",

        "A bounded queue such as ArrayBlockingQueue is useful when you want explicit limits on queued work.",

        "LinkedBlockingQueue can also be bounded by specifying a capacity.",

        "SynchronousQueue is useful when tasks should be handed directly to available workers and the executor is designed around direct handoff."
      ]
    },

    {
      id: "backpressure",

      title: "16. BlockingQueue and Backpressure",

      paragraphs: [
        "A bounded queue can help a backend apply backpressure.",

        "When workers and queue capacity are exhausted, the application must use a rejection policy or another overload strategy instead of allowing unlimited work to accumulate."
      ]
    },

    {
      id: "common-mistake",

      title: "17. Common Mistake — Very Large Queue",

      paragraphs: [
        "A very large queue can make an application appear stable because submissions continue to succeed.",

        "However, tasks may spend a long time waiting before execution, increasing latency and memory usage."
      ]
    },

    {
      id: "common-mistake-two",

      title: "18. Common Mistake — Very Small Queue",

      paragraphs: [
        "A very small queue can cause rejection earlier.",

        "This is not necessarily wrong. The correct behavior depends on whether the application should reject work, run it in the caller thread, or apply another overload strategy."
      ]
    },

    {
      id: "interview-questions",

      title: "19. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is BlockingQueue?",

          answer:
            "BlockingQueue is a thread-safe queue designed for producer-consumer scenarios. It provides operations that can wait when the queue is full or empty."
        },

        {
          question: "What is ArrayBlockingQueue?",

          answer:
            "ArrayBlockingQueue is a bounded, array-backed BlockingQueue with a fixed capacity."
        },

        {
          question: "What is LinkedBlockingQueue?",

          answer:
            "LinkedBlockingQueue is a linked-node BlockingQueue whose capacity can be specified. Without an explicit capacity, it can hold a very large number of elements."
        },

        {
          question: "What is SynchronousQueue?",

          answer:
            "SynchronousQueue has no stored capacity. Each task must be directly handed off to a receiving thread."
        },

        {
          question: "Why use a bounded queue in a backend?",

          answer:
            "A bounded queue limits pending work, helps control memory usage, makes overload visible, and allows rejection or backpressure strategies."
        },

        {
          question: "How does queue selection affect ThreadPoolExecutor?",

          answer:
            "The queue influences when tasks wait, when additional workers are created, and when the rejection policy is triggered."
        },

        {
          question: "Does ThreadPoolExecutor always create maximum threads immediately?",

          answer:
            "No. It normally creates threads up to corePoolSize first, then attempts to queue tasks, and creates additional threads toward maximumPoolSize when the queue cannot accept more tasks."
        }
      ]
    },

    {
      id: "interview-version",

      title: "20. Interview Version",

      paragraphs: [
        "BlockingQueue is used by ThreadPoolExecutor to hold submitted tasks waiting for worker threads. ArrayBlockingQueue is bounded with fixed capacity, LinkedBlockingQueue is linked-node based and can be bounded or effectively unbounded, and SynchronousQueue performs direct handoff without storing tasks. In backend systems, queue selection affects memory usage, latency, thread creation, and overload handling."
      ]
    },

    {
      id: "final-note",

      title: "21. Final Note",

      paragraphs: [
        "The important idea is not simply knowing the three queue classes.",

        "Understand how the queue changes ThreadPoolExecutor behavior."
      ],

      bullets: [
        "ArrayBlockingQueue → bounded queue",
        "LinkedBlockingQueue → linked queue with configurable capacity",
        "SynchronousQueue → direct handoff",
        "Bounded queue → better overload control",
        "Queue choice → affects thread creation and rejection"
      ]
    }
  ]
};