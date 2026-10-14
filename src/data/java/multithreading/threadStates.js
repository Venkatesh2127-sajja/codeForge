export const threadStates = {
  id: "thread-states",
  slug: "thread-states",
  title: "Thread States in Detail",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Understand Java thread states in detail, including NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED, the operations that cause each state, state transitions, practical examples, and common interview questions.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "thread-states-overview",
      title: "1. What Are Thread States?",

      paragraphs: [
        "A thread state describes the current condition of a Java thread from the perspective of the JVM.",
        "Java defines six states through the Thread.State enum: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED.",
        "A thread can move from one state to another during its lifetime depending on operations such as start(), synchronized locking, wait(), sleep(), join(), interruption, and completion of execution."
      ],

      code: {
        language: "java",
        code: `Thread.State state = thread.getState();

System.out.println(state);`
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
      id: "new-state",
      title: "2. NEW State",

      paragraphs: [
        "A Thread object is in the NEW state after it has been created but before its start() method has been invoked.",
        "The thread has not started execution yet."
      ],

      code: {
        language: "java",
        code: `public class NewStateDemo {

    public static void main(String[] args) {

        Thread worker = new Thread(() -> {
            System.out.println("Worker running");
        });

        System.out.println(worker.getState());
    }
}`
      },

      output: "NEW",

      bullets: [
        "Thread object exists.",
        "start() has not been called.",
        "No thread execution has started.",
        "The next normal transition is NEW → RUNNABLE."
      ]
    },

    {
      id: "new-state-example",
      title: "3. Example of NEW State",

      paragraphs: [
        "Creating a Thread object does not immediately start a new thread."
      ],

      code: {
        language: "java",
        code: `Thread thread = new Thread(() -> {
    System.out.println("Hello");
});

// Still NEW
System.out.println(thread.getState());

// Start the thread
thread.start();`
      },

      bullets: [
        "new Thread(...) creates the Thread object.",
        "The thread remains NEW until start() is called.",
        "Calling start() changes its lifecycle."
      ]
    },

    {
      id: "runnable-state",
      title: "4. RUNNABLE State",

      paragraphs: [
        "RUNNABLE represents a thread that is eligible to run or is currently running.",
        "Java does not define a separate RUNNING state in Thread.State.",
        "The operating system scheduler determines when a RUNNABLE thread actually gets CPU execution."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    System.out.println(
        "Current state: "
        + Thread.currentThread().getState()
    );
});

worker.start();`
      },

      bullets: [
        "A NEW thread becomes RUNNABLE after start().",
        "RUNNABLE does not guarantee that the thread is currently using the CPU.",
        "A RUNNABLE thread may be waiting for CPU scheduling.",
        "Java combines ready-to-run and running into RUNNABLE."
      ]
    },

    {
      id: "runnable-important",
      title: "5. Important Point About RUNNABLE",

      paragraphs: [
        "A common interview mistake is saying that Java has separate RUNNING and RUNNABLE states.",
        "Java's Thread.State enum does not contain RUNNING. A thread that is actually executing is represented as RUNNABLE."
      ],

      code: {
        language: "text",
        code: `Thread.State values:

NEW
RUNNABLE
BLOCKED
WAITING
TIMED_WAITING
TERMINATED

There is NO:
RUNNING`
      },

      bullets: [
        "RUNNABLE = eligible to run or running.",
        "The scheduler controls actual CPU execution.",
        "Do not describe RUNNING as a separate Java Thread.State."
      ]
    },

    {
      id: "blocked-state",
      title: "6. BLOCKED State",

      paragraphs: [
        "A thread enters BLOCKED when it is waiting to acquire an intrinsic monitor lock.",
        "This normally happens when another thread already owns the monitor required by a synchronized method or synchronized block."
      ],

      code: {
        language: "java",
        code: `class Resource {

    public synchronized void process()
            throws InterruptedException {

        Thread.sleep(3000);
    }
}

public class BlockedDemo {

    public static void main(String[] args) {

        Resource resource = new Resource();

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
        "BLOCKED means waiting to acquire an intrinsic monitor.",
        "It is associated with synchronized locking.",
        "The thread is not executing the synchronized code until it obtains the monitor."
      ]
    },

    {
      id: "blocked-flow",
      title: "7. BLOCKED State Flow",

      code: {
        language: "text",
        code: `Thread 1
   |
   v
Acquire Object Monitor
   |
   v
synchronized method
   |
   | holds monitor
   |
   +----------------+
                    |
Thread 2            |
   |                |
   v                |
Attempts same lock |
   |                |
   v                |
BLOCKED <-----------+
   |
   | lock released
   v
RUNNABLE`
      },

      paragraphs: [
        "When Thread 1 owns an object's intrinsic monitor, Thread 2 attempting to acquire the same monitor must wait.",
        "Thread 2 can become BLOCKED until the monitor becomes available."
      ]
    },

    {
      id: "waiting-state",
      title: "8. WAITING State",

      paragraphs: [
        "WAITING means a thread is waiting indefinitely for another thread or event to perform a particular action.",
        "Unlike BLOCKED, WAITING is not specifically about trying to acquire an intrinsic monitor."
      ],

      code: {
        language: "java",
        code: `class Worker {

    synchronized void waitForSignal()
            throws InterruptedException {

        wait();

        System.out.println("Signal received");
    }
}`
      },

      bullets: [
        "Object.wait() can cause WAITING.",
        "Thread.join() without timeout can cause WAITING.",
        "LockSupport.park() can cause WAITING.",
        "The thread waits until another event or thread allows it to continue."
      ]
    },

    {
      id: "wait-state-monitor",
      title: "9. What Happens During wait()?",

      paragraphs: [
        "When a thread calls Object.wait(), it must own that object's monitor.",
        "The thread releases that object's intrinsic monitor and enters WAITING.",
        "When it is notified, interrupted, or otherwise permitted to continue, it must reacquire the monitor before returning from wait()."
      ],

      code: {
        language: "text",
        code: `Thread
   |
   | owns monitor
   v
wait()
   |
   +---- releases monitor
   |
   v
WAITING
   |
   | notify / notifyAll / interrupt
   v
tries to reacquire monitor
   |
   v
RUNNABLE`
      },

      bullets: [
        "wait() releases the object's monitor.",
        "The thread waits for coordination.",
        "After notification, the thread must reacquire the monitor.",
        "This is different from sleep()."
      ]
    },

    {
      id: "timed-waiting-state",
      title: "10. TIMED_WAITING State",

      paragraphs: [
        "TIMED_WAITING means a thread is waiting for a specified maximum amount of time.",
        "The thread may leave this state because the timeout expires, it is interrupted, or another relevant event occurs."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

worker.start();`
      },

      bullets: [
        "Thread.sleep() causes TIMED_WAITING.",
        "Object.wait(timeout) causes TIMED_WAITING.",
        "Thread.join(timeout) causes TIMED_WAITING.",
        "LockSupport.parkNanos() can cause TIMED_WAITING."
      ]
    },

    {
      id: "waiting-vs-timed",
      title: "11. WAITING vs TIMED_WAITING",

      code: {
        language: "text",
        code: `WAITING

wait()
join()
park()

No specified timeout.


TIMED_WAITING

sleep(5000)
wait(5000)
join(5000)

A maximum wait duration is specified.`
      },

      bullets: [
        "WAITING = indefinite waiting.",
        "TIMED_WAITING = bounded waiting.",
        "sleep() always uses a time duration.",
        "join() can be either WAITING or TIMED_WAITING.",
        "wait() can be either WAITING or TIMED_WAITING."
      ]
    },

    {
      id: "terminated-state",
      title: "12. TERMINATED State",

      paragraphs: [
        "A thread enters TERMINATED after its run() method finishes, either normally or because execution ends due to an uncaught exception.",
        "A terminated Thread object cannot be started again."
      ],

      code: {
        language: "java",
        code: `public class TerminatedDemo {

    public static void main(String[] args)
            throws InterruptedException {

        Thread worker = new Thread(() -> {
            System.out.println("Work completed");
        });

        worker.start();

        worker.join();

        System.out.println(worker.getState());
    }
}`
      },

      output:
        "Work completed\nTERMINATED",

      bullets: [
        "Execution has completed.",
        "The thread cannot be restarted.",
        "Calling start() again throws IllegalThreadStateException."
      ]
    },

    {
      id: "state-transition-table",
      title: "13. State Transition Summary",

      paragraphs: [
        "The following transitions represent common ways a Java thread moves between states."
      ],

      bullets: [
        "NEW → RUNNABLE: start() is called.",
        "RUNNABLE → BLOCKED: waiting for an intrinsic monitor.",
        "RUNNABLE → WAITING: wait(), join() without timeout, or park().",
        "RUNNABLE → TIMED_WAITING: sleep(), timed wait(), or timed join().",
        "BLOCKED → RUNNABLE: required monitor becomes available.",
        "WAITING → RUNNABLE: wait is completed after notification/interruption and required monitor reacquisition.",
        "TIMED_WAITING → RUNNABLE: timeout expires or the thread is otherwise released/interrupted as appropriate.",
        "RUNNABLE → TERMINATED: run() finishes or ends because of an uncaught exception."
      ]
    },

    {
      id: "sleep-state",
      title: "14. sleep() and Thread State",

      paragraphs: [
        "Thread.sleep() pauses the currently executing thread for approximately the specified duration.",
        "During this period, the thread is in TIMED_WAITING."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {

    try {
        System.out.println("Before sleep");

        Thread.sleep(2000);

        System.out.println("After sleep");

    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

worker.start();`
      },

      bullets: [
        "sleep() causes TIMED_WAITING.",
        "sleep() does not release intrinsic locks.",
        "After the sleep duration, the thread becomes eligible to run again."
      ]
    },

    {
      id: "join-state",
      title: "15. join() and Thread State",

      paragraphs: [
        "join() makes the calling thread wait for another thread to terminate.",
        "The state depends on which join overload is used."
      ],

      code: {
        language: "java",
        code: `worker.join();

// Calling thread waits for worker
// without a timeout.`
      },

      bullets: [
        "join() → WAITING.",
        "join(milliseconds) → TIMED_WAITING.",
        "join() affects the thread that calls join(), not the target thread."
      ]
    },

    {
      id: "synchronized-state",
      title: "16. synchronized and BLOCKED",

      paragraphs: [
        "When a thread attempts to enter a synchronized block or method and another thread already owns the required intrinsic monitor, the waiting thread can enter BLOCKED."
      ],

      code: {
        language: "java",
        code: `class Counter {

    public synchronized void update() {

        System.out.println("Updating...");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}`
      },

      bullets: [
        "synchronized uses an intrinsic monitor.",
        "Only one thread can own a particular monitor at a time.",
        "Other threads waiting to acquire that monitor can be BLOCKED."
      ]
    },

    {
      id: "wait-notify-states",
      title: "17. wait(), notify(), and Thread States",

      paragraphs: [
        "wait() and notification are mechanisms for coordinating threads around a shared monitor.",
        "A thread that calls wait() releases the object's monitor and waits.",
        "Another thread can call notify() or notifyAll() while holding the same monitor to signal waiting threads."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    lock.wait();

    // Continues after notification
}`
      },

      bullets: [
        "wait() → WAITING or TIMED_WAITING.",
        "notify() wakes one waiting thread conceptually, subject to monitor reacquisition and scheduling.",
        "notifyAll() wakes all waiting threads conceptually.",
        "The notified thread must reacquire the monitor before continuing."
      ]
    },

    {
      id: "state-not-synchronization",
      title: "18. Thread State Is Not a Synchronization Mechanism",

      paragraphs: [
        "getState() is useful for monitoring and debugging, but it should not be used to coordinate threads.",
        "A thread can change state immediately after another thread observes it."
      ],

      code: {
        language: "java",
        code: `Thread.State state = worker.getState();

if (state == Thread.State.RUNNABLE) {
    // Do not assume the worker will remain RUNNABLE.
}`
      },

      bullets: [
        "Thread state is dynamic.",
        "getState() provides an observation.",
        "Use proper synchronization and concurrency utilities for coordination."
      ]
    },

    {
      id: "state-observation",
      title: "19. Observing State Changes",

      paragraphs: [
        "The following example shows that a thread can move from NEW to another state and eventually to TERMINATED."
      ],

      code: {
        language: "java",
        code: `public class StateObservation {

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
            "Before start: " + worker.getState()
        );

        worker.start();

        Thread.sleep(100);

        System.out.println(
            "During execution: " + worker.getState()
        );

        worker.join();

        System.out.println(
            "After completion: " + worker.getState()
        );
    }
}`
      },

      output:
        "Before start: NEW\nDuring execution: TIMED_WAITING\nAfter completion: TERMINATED"
    },

    {
      id: "state-change-fast",
      title: "20. Why Is It Difficult to Observe Some States?",

      paragraphs: [
        "Some thread states can exist for a very short time.",
        "For example, a thread may become RUNNABLE and immediately execute and terminate before another thread gets a chance to observe the intermediate state."
      ],

      code: {
        language: "java",
        code: `Thread worker = new Thread(() -> {
    System.out.println("Quick task");
});

worker.start();`
      },

      bullets: [
        "Thread states can change very quickly.",
        "getState() is only a snapshot.",
        "Timing changes can make observed states different between executions.",
        "Do not write tests that depend on a thread remaining in a particular state for a predictable duration."
      ]
    },

    {
      id: "blocked-vs-timed",
      title: "21. BLOCKED vs TIMED_WAITING",

      paragraphs: [
        "A thread waiting for an intrinsic monitor is BLOCKED, while a thread waiting for a time-based operation such as sleep() is TIMED_WAITING.",
        "These states have different meanings and should not be confused."
      ],

      code: {
        language: "text",
        code: `BLOCKED

Thread
  |
  +---- wants synchronized lock
  |
  +---- another thread owns lock
  |
  v
BLOCKED


TIMED_WAITING

Thread
  |
  +---- sleep(5000)
  |
  v
TIMED_WAITING`
      }
    },

    {
      id: "waiting-causes",
      title: "22. Operations That Cause WAITING",

      bullets: [
        "Object.wait() without timeout.",
        "Thread.join() without timeout.",
        "LockSupport.park().",
        "A thread remains waiting until an appropriate event, interruption, or coordination mechanism allows it to continue."
      ]
    },

    {
      id: "timed-causes",
      title: "23. Operations That Cause TIMED_WAITING",

      bullets: [
        "Thread.sleep().",
        "Object.wait(timeout).",
        "Thread.join(timeout).",
        "LockSupport.parkNanos().",
        "LockSupport.parkUntil()."
      ]
    },

    {
      id: "blocked-causes",
      title: "24. What Causes BLOCKED?",

      paragraphs: [
        "BLOCKED specifically refers to waiting to acquire an intrinsic monitor lock.",
        "This is commonly seen when synchronized code is already executing on the same object monitor."
      ],

      code: {
        language: "text",
        code: `Thread A
    |
    +---- synchronized(lock)
    |
    +---- owns monitor


Thread B
    |
    +---- synchronized(lock)
    |
    +---- cannot acquire monitor
    |
    v
  BLOCKED`
      }
    },

    {
      id: "state-flow",
      title: "25. Full Thread State Flow",

      code: {
        language: "text",
        code: `                         start()
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
                  |        |          |
                  |        |          |
                  +--------+----------+
                           |
                           v
                       RUNNABLE
                           |
                           v
                      TERMINATED`
      },

      paragraphs: [
        "The exact path depends on what the thread does during execution. A thread does not have to visit every state."
      ]
    },

    {
      id: "does-every-thread-visit",
      title: "26. Does Every Thread Visit Every State?",

      paragraphs: [
        "No. A thread only enters states required by its execution.",
        "For example, a simple thread that immediately finishes may go from NEW to RUNNABLE to TERMINATED without entering BLOCKED, WAITING, or TIMED_WAITING."
      ],

      code: {
        language: "text",
        code: `Simple thread:

NEW
 |
 v
RUNNABLE
 |
 v
TERMINATED`
      },

      bullets: [
        "Not every thread enters every state.",
        "State transitions depend on operations performed by the thread.",
        "Simple tasks may have very short lifecycles."
      ]
    },

    {
      id: "backend-debugging",
      title: "27. Thread States in Backend Debugging",

      paragraphs: [
        "Thread states are especially useful when diagnosing backend performance problems.",
        "For example, many BLOCKED threads may indicate monitor contention, while many threads waiting on external resources may indicate I/O or pool limitations.",
        "Thread dumps can help developers inspect thread states and stack traces."
      ],

      code: {
        language: "text",
        code: `Thread Dump

"http-worker-1" RUNNABLE
"http-worker-2" BLOCKED
"http-worker-3" WAITING
"http-worker-4" TIMED_WAITING`
      },

      bullets: [
        "RUNNABLE can indicate active or schedulable work.",
        "BLOCKED can indicate monitor contention.",
        "WAITING can indicate coordination or waiting for another task.",
        "TIMED_WAITING can indicate timed sleeps or waits.",
        "Thread dumps provide much more context than state alone."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",

      bullets: [
        "Calling RUNNING a separate Java Thread.State.",
        "Confusing BLOCKED with WAITING.",
        "Thinking sleep() releases locks.",
        "Thinking wait() keeps the object's monitor.",
        "Thinking getState() guarantees what the thread will do next.",
        "Assuming every thread passes through every state.",
        "Assuming a RUNNABLE thread must currently be executing.",
        "Trying to coordinate threads by polling getState()."
      ]
    },

    {
      id: "key-points",
      title: "29. Key Points to Remember",

      paragraphs: [
        "The six Java thread states describe why a thread is in a particular lifecycle condition.",
        "The most important skill is understanding the operation responsible for the state."
      ],

      bullets: [
        "NEW → created but not started.",
        "RUNNABLE → eligible to run or running.",
        "BLOCKED → waiting for intrinsic monitor.",
        "WAITING → waiting indefinitely.",
        "TIMED_WAITING → waiting for a specified duration.",
        "TERMINATED → execution completed.",
        "sleep() → TIMED_WAITING.",
        "wait() → WAITING.",
        "synchronized lock contention → BLOCKED.",
        "run() completion → TERMINATED."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These are important interview questions for Java thread states."
      ],

      interviewQuestions: [
        {
          question: "How many states does a Java thread have?",
          answer:
            "Java defines six Thread.State values: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
        },
        {
          question: "What is the difference between RUNNABLE and RUNNING?",
          answer:
            "Java does not define a separate RUNNING state. RUNNABLE represents a thread that is eligible to run as well as one that is actually running."
        },
        {
          question: "When does a thread enter BLOCKED?",
          answer:
            "A thread enters BLOCKED when it is waiting to acquire an intrinsic monitor lock required by synchronized code."
        },
        {
          question: "When does a thread enter WAITING?",
          answer:
            "A thread can enter WAITING when it waits indefinitely using mechanisms such as Object.wait(), join() without timeout, or LockSupport.park()."
        },
        {
          question: "When does a thread enter TIMED_WAITING?",
          answer:
            "A thread can enter TIMED_WAITING when it waits for a specified maximum time, such as with sleep(), timed wait(), or timed join()."
        },
        {
          question: "What is the difference between BLOCKED and WAITING?",
          answer:
            "BLOCKED means waiting to acquire an intrinsic monitor. WAITING means waiting indefinitely for another thread or event to perform an action."
        },
        {
          question: "Does wait() release the lock?",
          answer:
            "Yes. Object.wait() releases the object's intrinsic monitor while the thread waits."
        },
        {
          question: "Does sleep() release the lock?",
          answer:
            "No. Thread.sleep() does not release intrinsic locks held by the thread."
        },
        {
          question: "Can a thread go directly from NEW to TERMINATED?",
          answer:
            "No. A thread must be started before its execution can complete. The normal lifecycle includes NEW → RUNNABLE → TERMINATED, although intermediate states may be skipped."
        },
        {
          question: "Can a thread skip BLOCKED, WAITING, and TIMED_WAITING?",
          answer:
            "Yes. A simple thread can go from NEW to RUNNABLE and then TERMINATED without entering any waiting state."
        },
        {
          question: "Can getState() be used for synchronization?",
          answer:
            "No. getState() is for observation and debugging. The state can change immediately after it is returned, so proper synchronization mechanisms should be used for coordination."
        },
        {
          question: "What happens when a thread finishes run()?",
          answer:
            "The thread enters the TERMINATED state and cannot be started again."
        }
      ]
    }
  ]
};