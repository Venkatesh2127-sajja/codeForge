export const threadPoolTaskSubmission = {
  id: "thread-pool-task-submission",

  slug: "thread-pool-task-submission",

  title: "ThreadPoolExecutor Task Submission Flow",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Understand exactly how ThreadPoolExecutor handles submitted tasks using corePoolSize, BlockingQueue, maximumPoolSize, and RejectedExecutionHandler.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "basic-flow",
      title: "1. ThreadPoolExecutor Task Submission Flow",

      paragraphs: [
        "When a task is submitted to ThreadPoolExecutor, the executor follows a specific decision process involving corePoolSize, the work queue, maximumPoolSize, and the rejection policy."
      ],

      code: {
        language: "text",
        code: `submit(task)
     |
     v
workers < corePoolSize?
     |
   YES -----------------> create worker
     |
    NO
     |
     v
add task to queue
     |
     v
queue accepts task?
     |
   YES -----------------> wait in queue
     |
    NO
     |
     v
workers < maximumPoolSize?
     |
   YES -----------------> create worker
     |
    NO
     |
     v
reject task`
      }
    },

    {
      id: "configuration",
      title: "2. Example Configuration",

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(2),
        new ThreadPoolExecutor.AbortPolicy()
    );`
      },

      paragraphs: [
        "In this example, the executor has 2 core threads, a maximum of 4 threads, and a queue capacity of 2."
      ]
    },

    {
      id: "task-one",
      title: "3. Task 1",

      paragraphs: [
        "Suppose Task 1 is submitted and no worker threads currently exist.",

        "Because the current worker count is below corePoolSize, ThreadPoolExecutor creates a worker thread."
      ],

      code: {
        language: "text",
        code: `Workers: 0
Core:    2
Queue:   0

Task 1
  ↓
Workers < Core?
  ↓
YES
  ↓
Create Worker 1`
      }
    },

    {
      id: "task-two",
      title: "4. Task 2",

      paragraphs: [
        "Task 2 is submitted while only one worker exists.",

        "Because the worker count is still below corePoolSize, another worker is created."
      ],

      code: {
        language: "text",
        code: `Workers: 1
Core:    2

Task 2
  ↓
Workers < Core?
  ↓
YES
  ↓
Create Worker 2`
      }
    },

    {
      id: "task-three",
      title: "5. Task 3",

      paragraphs: [
        "Now the core pool is full.",

        "When Task 3 is submitted, ThreadPoolExecutor attempts to place the task into the queue."
      ],

      code: {
        language: "text",
        code: `Workers: 2
Core:    2
Queue:   0 / 2

Task 3
  ↓
Workers < Core?
  ↓
NO
  ↓
Add to Queue
  ↓
Success`
      }
    },

    {
      id: "task-four",
      title: "6. Task 4",

      paragraphs: [
        "Task 4 is also placed into the queue because the queue still has capacity."
      ],

      code: {
        language: "text",
        code: `Workers: 2
Core:    2
Queue:   1 / 2

Task 4
  ↓
Queue accepts task
  ↓
Queue: 2 / 2`
      }
    },

    {
      id: "task-five",
      title: "7. Task 5",

      paragraphs: [
        "Now the queue is full.",

        "When Task 5 arrives, the executor cannot place it into the queue.",

        "Because the current worker count is below maximumPoolSize, the executor creates another worker."
      ],

      code: {
        language: "text",
        code: `Workers: 2
Maximum: 4
Queue:   FULL

Task 5
  ↓
Queue full
  ↓
Workers < Maximum?
  ↓
YES
  ↓
Create Worker 3`
      }
    },

    {
      id: "task-six",
      title: "8. Task 6",

      paragraphs: [
        "Task 6 arrives while the queue is still full.",

        "The worker count is 3, which is below maximumPoolSize 4, so another worker can be created."
      ],

      code: {
        language: "text",
        code: `Workers: 3
Maximum: 4
Queue:   FULL

Task 6
  ↓
Queue full
  ↓
Workers < Maximum?
  ↓
YES
  ↓
Create Worker 4`
      }
    },

    {
      id: "task-seven",
      title: "9. Task 7",

      paragraphs: [
        "Now the pool has reached maximumPoolSize and the queue is full.",

        "There is no remaining capacity for the task.",

        "The configured RejectedExecutionHandler is invoked."
      ],

      code: {
        language: "text",
        code: `Workers: 4
Maximum: 4
Queue:   FULL

Task 7
  ↓
Queue full
  ↓
Workers == Maximum
  ↓
REJECT TASK`
      }
    },

    {
      id: "important-order",
      title: "10. The Most Important Order",

      paragraphs: [
        "The important interview point is that ThreadPoolExecutor does not normally create threads up to maximumPoolSize immediately.",

        "It first creates workers up to corePoolSize, then attempts to queue tasks, and only when the queue cannot accept more work does it create additional workers up to maximumPoolSize."
      ],

      code: {
        language: "text",
        code: `1. corePoolSize
       ↓
2. BlockingQueue
       ↓
3. maximumPoolSize
       ↓
4. Rejection`
      }
    },

    {
      id: "why-queue-matters",
      title: "11. Why Queue Capacity Matters",

      paragraphs: [
        "Queue capacity strongly influences when additional threads are created.",

        "A large queue can delay the creation of threads beyond corePoolSize.",

        "A small bounded queue can cause the executor to create additional workers sooner."
      ]
    },

    {
      id: "unbounded-queue",
      title: "12. What Happens with an Unbounded Queue?",

      paragraphs: [
        "With an effectively unbounded queue such as a LinkedBlockingQueue without an explicit practical capacity, tasks can continue entering the queue.",

        "Under normal ThreadPoolExecutor behavior, the pool therefore generally does not grow beyond corePoolSize because queue insertion succeeds."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        10,
        60,
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>()
    );`
      }
    },

    {
      id: "bounded-queue",
      title: "13. What Happens with a Bounded Queue?",

      paragraphs: [
        "With a bounded queue, the queue can become full.",

        "Once it is full, ThreadPoolExecutor can create additional workers up to maximumPoolSize."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        10,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10)
    );`
      }
    },

    {
      id: "rejection",
      title: "14. Rejection Happens at the End",

      paragraphs: [
        "Rejection occurs when the queue cannot accept the task and the executor cannot create another worker because maximumPoolSize has already been reached."
      ],

      code: {
        language: "java",
        code: `new ThreadPoolExecutor.AbortPolicy()`
      }
    },

    {
      id: "caller-runs",
      title: "15. CallerRunsPolicy",

      paragraphs: [
        "CallerRunsPolicy executes the rejected task in the thread that submitted the task, when the executor is not shut down.",

        "This can provide a form of backpressure because the submitting thread has to perform the work."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        4,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(2),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      }
    },

    {
      id: "abort-policy",
      title: "16. AbortPolicy",

      paragraphs: [
        "AbortPolicy throws RejectedExecutionException when a task cannot be accepted."
      ],

      code: {
        language: "java",
        code: `try {
    executor.execute(task);
} catch (RejectedExecutionException e) {
    System.out.println(
        "Task rejected"
    );
}`
      }
    },

    {
      id: "synchronous-queue",
      title: "17. SynchronousQueue Changes the Flow",

      paragraphs: [
        "SynchronousQueue does not store tasks.",

        "Tasks must be directly handed off to a worker, so its interaction with ThreadPoolExecutor is different from a normal buffered queue."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor executor =
    new ThreadPoolExecutor(
        2,
        10,
        60,
        TimeUnit.SECONDS,
        new SynchronousQueue<>()
    );`
      }
    },

    {
      id: "execute-vs-submit",
      title: "18. execute() vs submit()",

      paragraphs: [
        "Both execute() and submit() can send work to an ExecutorService.",

        "execute() accepts Runnable and returns no result.",

        "submit() accepts Runnable or Callable and returns a Future."
      ],

      code: {
        language: "java",
        code: `executor.execute(() -> {
    System.out.println("Task");
});

Future<String> future =
    executor.submit(() -> {
        return "Result";
    });`
      }
    },

    {
      id: "backend-example",
      title: "19. Backend Example",

      paragraphs: [
        "Consider a Spring Boot service that processes background report-generation tasks.",

        "A bounded queue can prevent unlimited report requests from accumulating when all workers are busy."
      ],

      code: {
        language: "java",
        code: `ThreadPoolExecutor reportExecutor =
    new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(50),
        new ThreadPoolExecutor.CallerRunsPolicy()
    );`
      }
    },

    {
      id: "visual-summary",
      title: "20. Complete Submission Flow",

      code: {
        language: "text",
        code: `                submit(task)
                     |
                     v
          workers < corePoolSize?
               /          \\
             YES           NO
              |             |
        create worker       v
                       queue task
                           |
                    queue accepts?
                       /       \\
                     YES        NO
                      |          |
                  wait queue     v
                         workers < maximumPoolSize?
                              /        \\
                            YES         NO
                             |           |
                       create worker   reject
                                         |
                                         v
                              RejectedExecutionHandler`
      }
    },

    {
      id: "interview-questions",
      title: "21. Important Interview Questions",

      interviewQuestions: [
        {
          question:
            "What happens when a task is submitted to ThreadPoolExecutor?",

          answer:
            "The executor first creates a worker if the worker count is below corePoolSize. Otherwise, it attempts to queue the task. If the queue cannot accept the task, it creates another worker up to maximumPoolSize. If that is also not possible, the rejection policy is invoked."
        },

        {
          question:
            "Does ThreadPoolExecutor immediately create maximumPoolSize threads?",

          answer:
            "No. It normally creates workers up to corePoolSize first, then queues tasks, and creates additional workers toward maximumPoolSize when the queue cannot accept more tasks."
        },

        {
          question:
            "Why is queue capacity important?",

          answer:
            "Queue capacity determines how much work can wait and affects when additional threads are created and when rejection occurs."
        },

        {
          question:
            "What happens with an unbounded queue?",

          answer:
            "Tasks can continue entering the queue, so under normal ThreadPoolExecutor behavior the pool generally does not grow beyond corePoolSize."
        },

        {
          question:
            "When does RejectedExecutionHandler run?",

          answer:
            "It runs when a submitted task cannot be queued and the executor cannot create another worker because maximumPoolSize has been reached, or when the executor is shut down."
        },

        {
          question:
            "Why can a bounded queue be useful?",

          answer:
            "It limits pending work, makes overload visible, and allows the executor to create workers beyond corePoolSize before eventually applying a rejection policy."
        }
      ]
    },

    {
      id: "interview-version",
      title: "22. Interview Version",

      paragraphs: [
        "When a task is submitted to ThreadPoolExecutor, it first checks whether the number of workers is below corePoolSize. If yes, it creates a worker. Otherwise, it tries to add the task to the BlockingQueue. If the queue is full, it creates additional workers up to maximumPoolSize. If the maximum is already reached, the RejectedExecutionHandler handles the task."
      ]
    },

    {
      id: "final-note",
      title: "23. Final Note",

      paragraphs: [
        "Remember this order for interviews:"
      ],

      bullets: [
        "1. corePoolSize",
        "2. BlockingQueue",
        "3. maximumPoolSize",
        "4. RejectedExecutionHandler"
      ]
    }
  ]
};