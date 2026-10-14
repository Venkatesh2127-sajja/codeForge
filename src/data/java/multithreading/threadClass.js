export const threadClass = {
  id: "thread-class",
  slug: "thread-class",
  title: "Creating a Thread by Extending Thread",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to create a Java thread by extending the Thread class, override run(), use start(), work with thread names, create multiple threads, and understand the limitations of extending Thread.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-thread-class",
      title: "1. What is the Thread Class?",
      paragraphs: [
        "Thread is a class provided by Java in the java.lang package.",
        "It represents a thread of execution.",
        "One traditional way to create a thread is to create a class that extends Thread.",
        "The child class normally overrides the run() method."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}`
      }
    },

    {
      id: "extending-thread",
      title: "2. Extending the Thread Class",
      paragraphs: [
        "We can create a custom thread by extending the Thread class.",
        "The child class inherits methods such as start(), sleep(), join(), getName(), and getState()."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Hello from MyThread");
    }
}`
      }
    },

    {
      id: "override-run",
      title: "3. Overriding run()",
      paragraphs: [
        "The run() method contains the work that the thread should perform.",
        "When start() is called, the JVM eventually executes run() on the new thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Task is running");
    }
}`
      }
    },

    {
      id: "create-object",
      title: "4. Creating a Thread Object",
      paragraphs: [
        "After creating the Thread subclass, we create an object of that class.",
        "Creating the object does not start the thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Thread running");
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        System.out.println("Thread object created");
    }
}`
      },
      output: "Thread object created"
    },

    {
      id: "start",
      title: "5. Starting the Thread using start()",
      paragraphs: [
        "The start() method starts a new thread of execution.",
        "After start() is called, the JVM schedules the new thread and eventually invokes run()."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Child thread is running");
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();

        System.out.println("Main thread is running");
    }
}`
      },
      output:
        "The exact order of the two messages is not guaranteed."
    },

    {
      id: "start-vs-run",
      title: "6. start() vs run()",
      paragraphs: [
        "start() and run() are different.",
        "start() starts a new thread.",
        "Calling run() directly is a normal method call and does not create a new thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println(
            Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.run();

        thread.start();
    }
}`
      }
    },

    {
      id: "thread-name",
      title: "7. Giving a Thread a Name",
      paragraphs: [
        "We can give a thread a meaningful name.",
        "Thread names are useful when debugging multithreaded applications."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        System.out.println(
            "Thread name: " +
            Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread =
            new MyThread("Worker-1");

        thread.start();
    }
}`
      }
    },

    {
      id: "set-name",
      title: "8. Using setName()",
      paragraphs: [
        "We can also set the name of a thread using setName()."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println(
            "Running: " +
            Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.setName("Worker");

        thread.start();
    }
}`
      }
    },

    {
      id: "current-thread",
      title: "9. Using currentThread()",
      paragraphs: [
        "Thread.currentThread() returns the Thread object representing the currently executing thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        Thread current =
            Thread.currentThread();

        System.out.println(
            "Name: " + current.getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();
    }
}`
      }
    },

    {
      id: "multiple-threads",
      title: "10. Creating Multiple Threads",
      paragraphs: [
        "We can create multiple objects of the same Thread subclass.",
        "Each object represents a separate thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println(
            Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();

        thread1.setName("Worker-1");
        thread2.setName("Worker-2");

        thread1.start();
        thread2.start();
    }
}`
      }
    },

    {
      id: "execution-order",
      title: "11. Thread Execution Order",
      paragraphs: [
        "When multiple threads are started, Java does not guarantee their exact execution order.",
        "The JVM and operating system decide when each thread gets CPU time."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    private String message;

    public MyThread(String message) {
        this.message = message;
    }

    @Override
    public void run() {
        System.out.println(message);
    }
}

public class Main {

    public static void main(String[] args) {

        new MyThread("A").start();
        new MyThread("B").start();
        new MyThread("C").start();
    }
}`
      },
      output:
        "The output order is not guaranteed."
    },

    {
      id: "sleep",
      title: "12. Using sleep()",
      paragraphs: [
        "Thread.sleep() pauses the currently executing thread for approximately the specified duration.",
        "sleep() does not release an intrinsic lock held by the thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        try {

            System.out.println("Thread started");

            Thread.sleep(2000);

            System.out.println("Thread finished");

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();
        }
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();
    }
}`
      }
    },

    {
      id: "join",
      title: "13. Using join()",
      paragraphs: [
        "join() allows one thread to wait until another thread finishes."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        System.out.println("Worker started");

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return;
        }

        System.out.println("Worker finished");
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        MyThread worker = new MyThread();

        worker.start();

        worker.join();

        System.out.println("Main continues");
    }
}`
      },
      output:
        "Worker started\nWorker finished\nMain continues"
    },

    {
      id: "is-alive",
      title: "14. Using isAlive()",
      paragraphs: [
        "isAlive() returns true when a thread has been started and has not yet terminated."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        MyThread thread = new MyThread();

        System.out.println(thread.isAlive());

        thread.start();

        System.out.println(thread.isAlive());

        thread.join();

        System.out.println(thread.isAlive());
    }
}`
      },
      output: "false\ntrue\nfalse"
    },

    {
      id: "interrupt",
      title: "15. Interrupting a Thread",
      paragraphs: [
        "interrupt() sends an interruption request to a thread.",
        "It does not forcibly kill the thread."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        try {

            Thread.sleep(5000);

            System.out.println("Work completed");

        } catch (InterruptedException e) {

            System.out.println("Thread interrupted");

            Thread.currentThread().interrupt();
        }
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        MyThread thread = new MyThread();

        thread.start();

        Thread.sleep(1000);

        thread.interrupt();
    }
}`
      },
      output: "Thread interrupted"
    },

    {
      id: "daemon",
      title: "16. Creating a Daemon Thread",
      paragraphs: [
        "A daemon thread is a background thread that does not prevent the JVM from terminating after all non-daemon threads have finished.",
        "setDaemon(true) must be called before start()."
      ],
      code: {
        language: "java",
        code: `class BackgroundThread extends Thread {

    @Override
    public void run() {

        while (true) {

            System.out.println("Background work");

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
        }
    }
}

public class Main {

    public static void main(String[] args) {

        BackgroundThread thread =
            new BackgroundThread();

        thread.setDaemon(true);

        thread.start();

        System.out.println("Main finished");
    }
}`
      }
    },

    {
      id: "priority",
      title: "17. Thread Priority",
      paragraphs: [
        "Java provides thread priority values from Thread.MIN_PRIORITY to Thread.MAX_PRIORITY.",
        "Thread.NORM_PRIORITY is the default priority.",
        "Priority is only a scheduling hint and should not be used to guarantee execution order."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println(
            "Priority: " +
            Thread.currentThread().getPriority()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.setPriority(
            Thread.MAX_PRIORITY
        );

        thread.start();
    }
}`
      }
    },

    {
      id: "thread-state",
      title: "18. Checking Thread State",
      paragraphs: [
        "getState() returns the current observed state of a thread.",
        "The state can change immediately after it is observed."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Running");
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        System.out.println(
            thread.getState()
        );

        thread.start();
    }
}`
      },
      output: "Before start(): NEW"
    },

    {
      id: "constructor",
      title: "19. Thread Constructor",
      paragraphs: [
        "A Thread subclass can call the Thread superclass constructor to set the thread name."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        System.out.println(getName());
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread =
            new MyThread("Worker");

        thread.start();
    }
}`
      },
      output: "Worker"
    },

    {
      id: "shared-data",
      title: "20. Shared Data Between Threads",
      paragraphs: [
        "Multiple threads can access the same shared data.",
        "Shared mutable data can cause race conditions when multiple threads modify it at the same time."
      ],
      code: {
        language: "java",
        code: `class CounterThread extends Thread {

    static int count = 0;

    @Override
    public void run() {

        for (int i = 0; i < 1000; i++) {
            count++;
        }
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        Thread t1 = new CounterThread();
        Thread t2 = new CounterThread();

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(
            CounterThread.count
        );
    }
}`
      }
    },

    {
      id: "race-condition",
      title: "21. Race Condition",
      paragraphs: [
        "A race condition occurs when multiple threads access shared mutable data and the result depends on the timing of their execution.",
        "The expression count++ is not atomic."
      ],
      code: {
        language: "java",
        code: `class CounterThread extends Thread {

    static int count = 0;

    @Override
    public void run() {

        for (int i = 0; i < 10000; i++) {
            count++;
        }
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        Thread t1 = new CounterThread();
        Thread t2 = new CounterThread();

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(
            CounterThread.count
        );
    }
}`
      },
      output:
        "The result may be less than 20000 because count++ is not atomic."
    },

    {
      id: "synchronized",
      title: "22. Using synchronized",
      paragraphs: [
        "The synchronized keyword can be used to protect shared data from simultaneous access."
      ],
      code: {
        language: "java",
        code: `class CounterThread extends Thread {

    private static int count = 0;

    public static synchronized void increment() {
        count++;
    }

    @Override
    public void run() {

        for (int i = 0; i < 10000; i++) {
            increment();
        }
    }

    public static int getCount() {
        return count;
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        Thread t1 = new CounterThread();
        Thread t2 = new CounterThread();

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(
            CounterThread.getCount()
        );
    }
}`
      },
      output: "20000"
    },

    {
      id: "inheritance",
      title: "23. Limitation of Extending Thread",
      paragraphs: [
        "Java supports single class inheritance.",
        "If a class already extends another class, it cannot also extend Thread."
      ],
      code: {
        language: "java",
        code: `class Employee {
}

// Not allowed:
//
// class EmployeeTask extends Employee, Thread {
// }`
      }
    },

    {
      id: "thread-vs-runnable",
      title: "24. Thread vs Runnable",
      paragraphs: [
        "Extending Thread makes your class a Thread.",
        "Implementing Runnable represents a task that can be executed by a Thread.",
        "Runnable is often more flexible because it does not use the class inheritance relationship."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Using Thread");
    }
}

class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Using Runnable");
    }
}`
      }
    },

    {
      id: "start-twice",
      title: "25. Can We Start the Same Thread Twice?",
      paragraphs: [
        "No. A Thread object can be started only once.",
        "Calling start() again results in IllegalThreadStateException."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Running");
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();

        // This is invalid:
        // thread.start();
    }
}`
      }
    },

    {
      id: "exception",
      title: "26. Exception in a Thread",
      paragraphs: [
        "If an exception escapes from the run() method, the thread terminates.",
        "The exception does not automatically propagate to the thread that called start()."
      ],
      code: {
        language: "java",
        code: `class MyThread extends Thread {

    @Override
    public void run() {

        throw new RuntimeException(
            "Something went wrong"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();
    }
}`
      }
    },

    {
      id: "real-world",
      title: "27. Real-World Example",
      paragraphs: [
        "Suppose we want to perform a report-generation task in the background.",
        "We can create a Thread subclass for this task."
      ],
      code: {
        language: "java",
        code: `class ReportThread extends Thread {

    @Override
    public void run() {

        System.out.println(
            "Generating report..."
        );

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return;
        }

        System.out.println(
            "Report generated"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        ReportThread report =
            new ReportThread();

        report.setName("Report-Worker");

        report.start();
    }
}`
      }
    },

    {
      id: "too-many-threads",
      title: "28. Why Not Create Too Many Threads?",
      paragraphs: [
        "Creating a new thread for every task can consume significant system resources.",
        "Large applications usually use thread pools to control the number of worker threads."
      ],
      bullets: [
        "Threads consume memory.",
        "Too many threads increase context switching.",
        "CPU resources are limited.",
        "Database connections are limited.",
        "External services may limit concurrent requests.",
        "ExecutorService provides managed thread execution."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "Extending Thread is useful for understanding Java multithreading.",
        "For application-level concurrency, Runnable, Callable, ExecutorService, and other concurrency utilities are commonly preferred."
      ],
      bullets: [
        "Override run() to define the task.",
        "Use start() to start a new thread.",
        "Do not call run() directly when you need a new thread.",
        "Use meaningful thread names.",
        "Handle InterruptedException correctly.",
        "Do not depend on thread execution order.",
        "Avoid unnecessary shared mutable state.",
        "Use synchronization when shared state must be protected.",
        "Avoid creating unlimited threads.",
        "Prefer managed executors for larger applications."
      ]
    },

    {
      id: "key-points",
      title: "30. Key Points to Remember",
      paragraphs: [
        "Creating a thread by extending Thread is a traditional Java multithreading technique.",
        "The class extends Thread and normally overrides run().",
        "The start() method starts a new thread.",
        "Calling run() directly does not create a new thread.",
        "A Thread object can be started only once.",
        "The main limitation is Java's single class inheritance."
      ],
      bullets: [
        "extends Thread → create a Thread subclass.",
        "run() → contains the task.",
        "start() → starts a new thread.",
        "sleep() → pauses the current thread.",
        "join() → waits for another thread.",
        "interrupt() → requests interruption.",
        "isAlive() → checks whether the thread is alive.",
        "getState() → checks the observed thread state.",
        "Runnable → represents a task.",
        "ExecutorService → manages concurrent tasks."
      ],
      interviewQuestions: [
        {
          question: "How do you create a thread by extending Thread?",
          answer:
            "Create a class that extends Thread, override run(), create an object, and call start()."
        },
        {
          question: "Why do we call start() instead of run()?",
          answer:
            "start() starts a new thread of execution, while run() called directly is just a normal method call."
        },
        {
          question: "Can we start the same Thread object twice?",
          answer:
            "No. Starting the same Thread object twice causes IllegalThreadStateException."
        },
        {
          question: "What is the purpose of run()?",
          answer:
            "run() contains the task that the thread executes."
        },
        {
          question: "What is the limitation of extending Thread?",
          answer:
            "Java supports single class inheritance, so a class extending Thread cannot extend another class."
        },
        {
          question: "What is the difference between Thread and Runnable?",
          answer:
            "Thread represents a thread of execution, while Runnable represents a task. Runnable is more flexible because it does not consume the class inheritance relationship."
        },
        {
          question: "Does start() guarantee immediate execution?",
          answer:
            "No. start() makes the thread eligible for scheduling, but the exact execution time is not guaranteed."
        },
        {
          question: "What does join() do?",
          answer:
            "join() makes the calling thread wait until the target thread terminates."
        },
        {
          question: "Does sleep() release a lock?",
          answer:
            "No. sleep() pauses the current thread but does not release an intrinsic monitor lock."
        },
        {
          question: "Does interrupt() terminate a thread?",
          answer:
            "No. interrupt() sends an interruption request. The thread must respond appropriately."
        }
      ]
    }
  ]
};