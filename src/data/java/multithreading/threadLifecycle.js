export const threadLifecycle = {
  id: "thread-lifecycle",
  slug: "thread-lifecycle",
  title: "Thread Lifecycle in Java",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Understand the complete lifecycle of a Java thread, including NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED states, state transitions, and practical examples.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-thread-lifecycle",
      title: "1. What is Thread Lifecycle?",

      paragraphs: [
        "Thread lifecycle describes the different states a Java thread can move through from the time its Thread object is created until its execution finishes.",
        "Java represents these states using the Thread.State enum.",
        "A thread does not remain in one state throughout its lifetime. Its state can change based on operations such as start(), waiting for a lock, sleep(), wait(), join(), and completion of run()."
      ],

      code: {
        language: "text",
        code: `NEW
 |
 | start()
 v
RUNNABLE
 |
 +----> BLOCKED
 |
 +----> WAITING
 |
 +----> TIMED_WAITING
 |
 v
TERMINATED`
      },

      bullets: [
        "NEW",
        "RUNNABLE",
        "BLOCKED",
        "WAITING",
        "TIMED_WAITING",
        "TERMINATED"
      ]
    },

    {
      id: "thread-state-enum",
      title: "2. Java Thread.State",

      paragraphs: [
        "Java provides the Thread.State enum to represent the lifecycle state of a thread.",
        "There are six states defined by Java: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
      ],

      code: {
        language: "java",
        code: `Thread.State state = thread.getState();

System.out.println(state);`
      },

      bullets: [
        "Thread.State.NEW",
        "Thread.State.RUNNABLE",
        "Thread.State.BLOCKED",
        "Thread.State.WAITING",
        "Thread.State.TIMED_WAITING",
        "Thread.State.TERMINATED"
      ]
    },

    {
      id: "new-state",
      title: "3. NEW State",

      paragraphs: [
        "A thread is in the NEW state after its Thread object has been created but before start() has been called.",
        "The thread has not started execution yet."
      ],

      code: {
        language: "java",
        code: `public class NewStateExample {

    public static void main(String[] args) {

        Thread thread = new Thread(() -> {
            System.out.println("Running");
        });

        System.out.println(thread.getState());
    }
}`
      },

      output: "NEW",

      bullets: [
        "Thread object has been created.",
        "start() has not been called.",
        "The thread has not begun execution.",
        "A NEW thread can transition to RUNNABLE by calling start()."
      ]
    },

    {
      id: "start-transition",
      title: "4. NEW → RUNNABLE",

      paragraphs: [
        "Calling start() causes a NEW thread to transition to the RUNNABLE state.",
        "The JVM makes the thread eligible for execution, and the operating system scheduler determines when it actually gets CPU time."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {
    System.out.println("Task is running");
});

System.out.println(thread.getState());

thread.start();

System.out.println(thread.getState());`
      },

      bullets: [
        "Before start(): NEW.",
        "After start(): normally RUNNABLE if the thread has not already completed.",
        "start() does not guarantee immediate execution.",
        "The scheduler determines when the thread actually runs."
      ]
    },

    {
      id: "runnable-state",
      title: "5. RUNNABLE State",

      paragraphs: [
        "RUNNABLE means the thread is eligible to run or is actually running according to the JVM and operating system scheduling model.",
        "Java does not expose a separate RUNNING state in Thread.State.",
        "Therefore, a Java thread that is currently executing and one that is ready to execute are both represented as RUNNABLE."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {

    System.out.println(
        "State while executing: "
        + Thread.currentThread().getState()
    );
});

thread.start();`
      },

      bullets: [
        "RUNNABLE includes both ready-to-run and actively running situations.",
        "Java does not have a separate RUNNING enum value.",
        "The operating system scheduler controls actual CPU execution."
      ]
    },

    {
      id: "runnable-scheduling",
      title: "6. How Does Scheduling Work?",

      paragraphs: [
        "When a thread becomes RUNNABLE, it becomes eligible for execution.",
        "The operating system and JVM cooperate in scheduling threads. The exact scheduling behavior depends on the platform and runtime.",
        "Therefore, you should not assume that the thread created first will always execute first."
      ],

      code: {
        language: "java",
        code: `Thread t1 = new Thread(() ->
    System.out.println("Thread 1")
);

Thread t2 = new Thread(() ->
    System.out.println("Thread 2")
);

t1.start();
t2.start();`
      },

      bullets: [
        "Thread 1 may print first.",
        "Thread 2 may print first.",
        "Execution order is generally not guaranteed.",
        "Correct programs should not depend on accidental scheduling order."
      ]
    },

    {
      id: "blocked-state",
      title: "7. BLOCKED State",

      paragraphs: [
        "A thread enters the BLOCKED state when it is waiting to acquire an intrinsic monitor lock so that it can enter a synchronized block or method.",
        "The thread remains BLOCKED until the required monitor becomes available."
      ],

      code: {
        language: "java",
        code: `class SharedResource {

    public synchronized void process()
            throws InterruptedException {

        Thread.sleep(2000);
    }
}

public class BlockedExample {

    public static void main(String[] args) {

        SharedResource resource = new SharedResource();

        Thread t1 = new Thread(() -> {
            try {
                resource.process();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread t2 = new Thread(() -> {
            try {
                resource.process();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        t1.start();
        t2.start();
    }
}`
      },

      bullets: [
        "BLOCKED means waiting for an intrinsic monitor lock.",
        "It commonly occurs with synchronized methods or synchronized blocks.",
        "The thread is not executing the protected code until it obtains the lock."
      ]
    },

    {
      id: "blocked-example",
      title: "8. Understanding BLOCKED with synchronized",

      paragraphs: [
        "Suppose Thread 1 enters a synchronized method and obtains the object's monitor.",
        "If Thread 2 tries to enter the same synchronized method on the same object while Thread 1 still owns the monitor, Thread 2 can enter the BLOCKED state."
      ],

      code: {
        language: "text",
        code: `Thread 1
   |
   +---- acquire monitor
   |
   +---- synchronized method
   |
   +---- holds lock
             ^
             |
Thread 2 ----+
             |
          BLOCKED
        waiting for lock`
      },

      bullets: [
        "The lock belongs to the object monitor.",
        "Only one thread can own a particular intrinsic monitor at a time.",
        "Other threads attempting to acquire the same monitor can become BLOCKED."
      ]
    },

    {
      id: "waiting-state",
      title: "9. WAITING State",

      paragraphs: [
        "A thread enters the WAITING state when it waits indefinitely for another thread to perform an action.",
        "Methods such as Object.wait(), Thread.join(), and LockSupport.park() can cause WAITING depending on how they are used."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    synchronized (Thread.currentThread()) {

        try {
            Thread.currentThread().wait();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
});`
      },

      bullets: [
        "WAITING means waiting indefinitely.",
        "Object.wait() can cause WAITING.",
        "join() without a timeout can cause WAITING.",
        "LockSupport.park() can cause WAITING."
      ]
    },

    {
      id: "timed-waiting",
      title: "10. TIMED_WAITING State",

      paragraphs: [
        "A thread enters TIMED_WAITING when it waits for a specified maximum amount of time.",
        "Common operations that can cause TIMED_WAITING include Thread.sleep(), Object.wait(timeout), and Thread.join(timeout)."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});`
      },

      bullets: [
        "sleep() → TIMED_WAITING.",
        "join(timeout) → TIMED_WAITING.",
        "wait(timeout) → TIMED_WAITING.",
        "LockSupport.parkNanos() and parkUntil() can also involve timed waiting."
      ]
    },

    {
      id: "waiting-vs-timed",
      title: "11. WAITING vs TIMED_WAITING",

      paragraphs: [
        "The main difference is whether the thread waits indefinitely or for a specified maximum duration."
      ],

      code: {
        language: "text",
        code: `WAITING

Thread
  |
  +---- wait()
  |
  +---- waits indefinitely
  |
  +---- another event must wake it


TIMED_WAITING

Thread
  |
  +---- sleep(5000)
  |
  +---- waits up to 5 seconds
  |
  +---- timeout or interruption`
      },

      bullets: [
        "WAITING = indefinite wait.",
        "TIMED_WAITING = wait with a time limit.",
        "Both are different from BLOCKED.",
        "BLOCKED specifically concerns waiting to acquire an intrinsic monitor."
      ]
    },

    {
      id: "terminated-state",
      title: "12. TERMINATED State",

      paragraphs: [
        "A thread enters the TERMINATED state after its run() method completes normally or after execution ends because an uncaught exception terminates that thread.",
        "A terminated thread cannot be started again."
      ],

      code: {
        language: "java",
        code: `public class TerminatedExample {

    public static void main(String[] args)
            throws InterruptedException {

        Thread thread = new Thread(() -> {
            System.out.println("Task completed");
        });

        thread.start();

        thread.join();

        System.out.println(thread.getState());
    }
}`
      },

      output:
        "Task completed\nTERMINATED",

      bullets: [
        "TERMINATED means thread execution has ended.",
        "A terminated thread cannot be restarted.",
        "Calling start() again results in IllegalThreadStateException."
      ]
    },

    {
      id: "complete-lifecycle",
      title: "13. Complete Thread Lifecycle",

      paragraphs: [
        "A typical thread starts in NEW, becomes RUNNABLE after start(), may temporarily enter BLOCKED, WAITING, or TIMED_WAITING depending on its operations, and eventually reaches TERMINATED."
      ],

      code: {
        language: "text",
        code: `                 start()
NEW ------------------------------> RUNNABLE
                                      |
                    +-----------------+----------------+
                    |                 |                |
                    v                 v                v
                 BLOCKED           WAITING       TIMED_WAITING
                    |                 |                |
                    +-----------------+----------------+
                                      |
                                      v
                                  RUNNABLE
                                      |
                                      |
                                      v
                                 TERMINATED`
      }
    },

    {
      id: "sleep-transition",
      title: "14. RUNNABLE → TIMED_WAITING with sleep()",

      paragraphs: [
        "When a running thread calls Thread.sleep(), it enters TIMED_WAITING for the specified duration.",
        "After the sleep duration expires, the thread becomes eligible to run again."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    System.out.println("Before sleep");

    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }

    System.out.println("After sleep");
});

worker.start();`
      },

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    System.out.println("Before sleep");

    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }

    System.out.println("After sleep");
});

worker.start();`
      },

      bullets: [
        "sleep() causes TIMED_WAITING.",
        "sleep() does not release intrinsic locks held by the thread.",
        "After the sleep duration expires, the thread becomes eligible to run again."
      ]
    },

    {
      id: "join-transition",
      title: "15. RUNNABLE → WAITING with join()",

      paragraphs: [
        "When one thread calls another thread's join() without a timeout, the calling thread waits for the target thread to finish.",
        "The calling thread can therefore enter WAITING."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

worker.start();

worker.join();

System.out.println("Worker completed");`
      },

      bullets: [
        "The thread calling join() waits for the target thread.",
        "join() without timeout can result in WAITING.",
        "join(timeout) can result in TIMED_WAITING."
      ]
    },

    {
      id: "wait-transition",
      title: "16. RUNNABLE → WAITING with wait()",

      paragraphs: [
        "Object.wait() causes the current thread to wait until another thread performs a notification or the waiting thread is interrupted.",
        "The thread must own the object's monitor before calling wait().",
        "When wait() is called, the thread releases that object's monitor and enters WAITING."
      ],

      code: {
        language: "java",
        code: `class SharedResource {

    public synchronized void waitForSignal()
            throws InterruptedException {

        wait();

        System.out.println("Signal received");
    }
}`
      },

      bullets: [
        "wait() must be called while owning the object's monitor.",
        "wait() releases that object's intrinsic lock.",
        "notify() or notifyAll() can wake waiting threads.",
        "After being notified, the thread must reacquire the monitor before continuing."
      ]
    },

    {
      id: "wait-vs-sleep",
      title: "17. Thread Lifecycle: wait() vs sleep()",

      paragraphs: [
        "wait() and sleep() are frequently confused.",
        "sleep() is a static method of Thread and pauses the current thread for a duration.",
        "wait() is a method of Object and is used for thread coordination. It releases the object's monitor while waiting."
      ],

      bullets: [
        "sleep() → Thread.sleep().",
        "wait() → Object.wait().",
        "sleep() → TIMED_WAITING for a timed sleep.",
        "wait() → WAITING when called without a timeout.",
        "wait() releases the object's monitor.",
        "sleep() does not release intrinsic locks."
      ]
    },

    {
      id: "blocked-vs-waiting",
      title: "18. BLOCKED vs WAITING",

      paragraphs: [
        "BLOCKED and WAITING both mean a thread is not currently executing, but the reasons are different.",
        "BLOCKED means the thread is waiting to acquire an intrinsic monitor. WAITING means the thread is waiting for another thread or event to perform an action."
      ],

      code: {
        language: "text",
        code: `BLOCKED
   |
   +---- Waiting for monitor lock


WAITING
   |
   +---- Waiting for another action
         |
         +---- wait()
         +---- join()
         +---- park()`
      },

      bullets: [
        "BLOCKED = waiting for a monitor.",
        "WAITING = waiting indefinitely for an event/action.",
        "TIMED_WAITING = waiting for an event/action with a time limit."
      ]
    },

    {
      id: "state-observation",
      title: "19. Observing a Thread's State",

      paragraphs: [
        "The getState() method can be used to observe a thread's current Thread.State.",
        "Because thread state can change quickly, the returned state is only a snapshot at the time getState() is called."
      ],

      code: {
        language: "java",
        code: `public class StateExample {

    public static void main(String[] args)
            throws InterruptedException {

        Thread thread = new Thread(() -> {

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        System.out.println(
            "Before start: " + thread.getState()
        );

        thread.start();

        Thread.sleep(100);

        System.out.println(
            "During sleep: " + thread.getState()
        );

        thread.join();

        System.out.println(
            "After completion: " + thread.getState()
        );
    }
}`
      },

      bullets: [
        "getState() returns a snapshot.",
        "Thread state can change immediately after getState() returns.",
        "Do not use getState() as a synchronization mechanism."
      ]
    },

    {
      id: "illegal-start",
      title: "20. Can We Start a Thread Twice?",

      paragraphs: [
        "No. A Thread object can be started only once.",
        "After a thread has been started and eventually terminates, calling start() again on the same Thread object throws IllegalThreadStateException."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {
    System.out.println("Running");
});

thread.start();

// Invalid:
// thread.start();`
      },

      bullets: [
        "A NEW Thread can be started once.",
        "A RUNNABLE or TERMINATED Thread cannot be started again.",
        "Create a new Thread object if another execution is required."
      ]
    },

    {
      id: "uncaught-exception",
      title: "21. What Happens When run() Throws an Exception?",

      paragraphs: [
        "If a thread's run() method terminates because of an uncaught exception, that thread terminates.",
        "The JVM's uncaught exception handling mechanism can report the exception."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {

    throw new RuntimeException("Something went wrong");
});

thread.start();`
      },

      bullets: [
        "The exception can terminate that thread if it is uncaught.",
        "The exact effect on other application threads depends on the application and JVM context.",
        "Use appropriate exception handling for thread tasks."
      ]
    },

    {
      id: "interruption-state",
      title: "22. Interruption and Thread State",

      paragraphs: [
        "Interrupting a thread is a request for that thread to respond to interruption.",
        "If the thread is sleeping, waiting, or joining, the blocking method normally throws InterruptedException and the thread becomes eligible to continue after handling the exception.",
        "Interrupting a thread does not directly define a new Thread.State."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    try {
        Thread.sleep(10000);
    } catch (InterruptedException e) {

        System.out.println("Interrupted");

        Thread.currentThread().interrupt();
    }
});

worker.start();

worker.interrupt();`
      },

      bullets: [
        "interrupt() does not forcibly kill a thread.",
        "InterruptedException is commonly used to communicate interruption from blocking methods.",
        "Restoring the interrupt status is often appropriate when the current method cannot fully handle the interruption."
      ]
    },

    {
      id: "state-transition-example",
      title: "23. Practical State Transition Example",

      paragraphs: [
        "The following example demonstrates a simple lifecycle from NEW to RUNNABLE, then TIMED_WAITING, and finally TERMINATED."
      ],

      code: {
        language: "java",
        code: `public class LifecycleExample {

    public static void main(String[] args)
            throws InterruptedException {

        Thread worker = new Thread(() -> {

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        System.out.println(
            "1. " + worker.getState()
        );

        worker.start();

        Thread.sleep(100);

        System.out.println(
            "2. " + worker.getState()
        );

        worker.join();

        System.out.println(
            "3. " + worker.getState()
        );
    }
}`
      },

      output:
        "1. NEW\n2. TIMED_WAITING\n3. TERMINATED"
    },

    {
      id: "lifecycle-diagram",
      title: "24. Complete Lifecycle Diagram",

      code: {
        language: "text",
        code: `                    start()
                       |
                       v
                    NEW
                       |
                       v
                  RUNNABLE
                 /    |    \\
                /     |     \\
               v      v      v
          BLOCKED   WAITING   TIMED_WAITING
               \\      |       /
                \\     |      /
                 \\    |     /
                    RUNNABLE
                       |
                       |
                       v
                  TERMINATED`
      }
    },

    {
      id: "important-rules",
      title: "25. Important Lifecycle Rules",

      bullets: [
        "A NEW thread becomes eligible for execution after start().",
        "Calling start() does not guarantee immediate execution.",
        "Java's RUNNABLE state includes both ready-to-run and running situations.",
        "BLOCKED means waiting for an intrinsic monitor.",
        "WAITING means waiting indefinitely for another action.",
        "TIMED_WAITING means waiting for a bounded amount of time.",
        "TERMINATED means thread execution has ended.",
        "A terminated Thread cannot be restarted.",
        "getState() provides a snapshot, not a synchronization mechanism."
      ]
    },

    {
      id: "common-mistakes",
      title: "26. Common Mistakes",

      bullets: [
        "Thinking Java has a separate RUNNING Thread.State.",
        "Thinking sleep() releases a synchronized lock.",
        "Confusing BLOCKED with WAITING.",
        "Calling start() twice on the same Thread object.",
        "Assuming start() means immediate execution.",
        "Using getState() to coordinate threads.",
        "Assuming thread states remain unchanged after getState() is called.",
        "Forgetting that join() without timeout can cause WAITING."
      ]
    },

    {
      id: "real-world",
      title: "27. Real-World Backend Example",

      paragraphs: [
        "Imagine a Spring Boot application processing an order.",
        "A worker thread may be RUNNABLE while processing the request, TIMED_WAITING while sleeping or waiting with a timeout, BLOCKED while trying to acquire a synchronized monitor, or WAITING for another task to complete.",
        "After the request-processing task finishes, that execution thread can return to the server's thread pool rather than necessarily becoming TERMINATED. This distinction is important: the lifecycle of a thread managed by a pool is different from the lifecycle of an individual task."
      ],

      code: {
        language: "text",
        code: `Thread Pool Worker
       |
       +---- Execute Task A
       |
       +---- Execute Task B
       |
       +---- Execute Task C
       |
       +---- Continue waiting for work

Thread itself may remain alive
while individual tasks start and finish.`
      },

      bullets: [
        "A task finishing does not necessarily mean the worker thread terminates.",
        "Thread pools reuse worker threads.",
        "This is why backend applications normally manage tasks through executors rather than creating one permanent thread per request."
      ]
    },

    {
      id: "interview-comparison",
      title: "28. Interview Comparison",

      paragraphs: [
        "A common interview question is to explain all six Java thread states and what causes them."
      ],

      bullets: [
        "NEW → Thread created but start() not called.",
        "RUNNABLE → Thread is eligible to run or is running.",
        "BLOCKED → Waiting to acquire an intrinsic monitor.",
        "WAITING → Waiting indefinitely for another action.",
        "TIMED_WAITING → Waiting for a specified maximum time.",
        "TERMINATED → Execution has completed."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",

      paragraphs: [
        "Understanding the lifecycle is essential before learning synchronization, locks, wait/notify, ExecutorService, and advanced concurrency.",
        "The most important distinction to remember is the reason a thread is not currently executing."
      ],

      bullets: [
        "NEW = not started.",
        "RUNNABLE = ready/running.",
        "BLOCKED = waiting for monitor.",
        "WAITING = waiting indefinitely.",
        "TIMED_WAITING = waiting with a time limit.",
        "TERMINATED = finished.",
        "sleep() → TIMED_WAITING.",
        "wait() → WAITING.",
        "join() → WAITING or TIMED_WAITING depending on overload.",
        "synchronized lock contention → BLOCKED."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These questions cover the most important Thread Lifecycle concepts for Java interviews."
      ],

      interviewQuestions: [
        {
          question: "What are the states of a Java thread?",
          answer:
            "Java defines six states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
        },
        {
          question: "What is the NEW state?",
          answer:
            "A Thread object is in NEW state after creation but before start() has been called."
        },
        {
          question: "What happens when start() is called?",
          answer:
            "The thread becomes eligible for execution and transitions from NEW to RUNNABLE."
        },
        {
          question: "Does Java have a RUNNING thread state?",
          answer:
            "No. Java's Thread.State has RUNNABLE, which covers a thread that is ready to run as well as one that is actually running."
        },
        {
          question: "What is the BLOCKED state?",
          answer:
            "BLOCKED means the thread is waiting to acquire an intrinsic monitor lock needed to enter a synchronized block or method."
        },
        {
          question: "What is the WAITING state?",
          answer:
            "WAITING means the thread is waiting indefinitely for another thread or event to perform an action. Object.wait(), join() without timeout, and LockSupport.park() can cause it."
        },
        {
          question: "What is TIMED_WAITING?",
          answer:
            "TIMED_WAITING means the thread is waiting for a specified maximum duration. sleep(), timed wait(), and timed join() can cause it."
        },
        {
          question: "What is the difference between BLOCKED and WAITING?",
          answer:
            "BLOCKED means waiting to acquire an intrinsic monitor. WAITING means waiting indefinitely for another action or event."
        },
        {
          question: "Can a terminated thread be started again?",
          answer:
            "No. Calling start() again on the same Thread object throws IllegalThreadStateException."
        },
        {
          question: "Does sleep() release a synchronized lock?",
          answer:
            "No. Thread.sleep() does not release intrinsic locks held by the sleeping thread."
        },
        {
          question: "What state does sleep() cause?",
          answer:
            "A sleeping thread enters TIMED_WAITING."
        },
        {
          question: "What state can join() cause?",
          answer:
            "join() without a timeout can cause WAITING, while a timed join can cause TIMED_WAITING."
        },
        {
          question: "What does getState() return?",
          answer:
            "It returns the thread's current Thread.State as observed at that moment. The state can change immediately afterward."
        }
      ]
    }
  ]
};