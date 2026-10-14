export const runnableInterface = {
  id: "runnable-interface",
  slug: "runnable-interface",
  title: "Implementing Runnable",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Learn how to create Java tasks using the Runnable interface and execute them using Thread.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-runnable",
      title: "1. What is Runnable?",
      paragraphs: [
        "Runnable is a functional interface in Java.",
        "It represents a task that can be executed by a thread.",
        "The Runnable interface contains one abstract method called run()."
      ],
      code: {
        language: "java",
        code: `public interface Runnable {

    void run();
}`
      }
    },

    {
      id: "implement-runnable",
      title: "2. Implementing Runnable",
      paragraphs: [
        "We can create a task by implementing the Runnable interface.",
        "The class must provide the implementation of the run() method."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Task is running");
    }
}`
      }
    },

    {
      id: "create-thread",
      title: "3. Creating Thread with Runnable",
      paragraphs: [
        "Runnable represents the task, but it does not create a thread.",
        "We pass the Runnable object to the Thread constructor."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Task is running");
    }
}

public class Main {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread thread = new Thread(task);

        thread.start();
    }
}`
      },
      output: "Task is running"
    },

    {
      id: "start-vs-run",
      title: "4. start() vs run()",
      paragraphs: [
        "Calling start() creates a new thread of execution.",
        "Calling run() directly does not create a new thread.",
        "run() becomes a normal method call when called directly."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println(
            "Running: " + Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        task.run();

        Thread thread = new Thread(task);

        thread.start();
    }
}`
      },
      output:
        "task.run() executes on the main thread, while thread.start() executes the task on a new thread."
    },

    {
      id: "lambda",
      title: "5. Runnable with Lambda",
      paragraphs: [
        "Runnable is a functional interface, so we can use a lambda expression instead of creating a separate class."
      ],
      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Runnable task = () -> {
            System.out.println("Task is running");
        };

        Thread thread = new Thread(task);

        thread.start();
    }
}`
      }
    },

    {
      id: "direct-lambda",
      title: "6. Passing Lambda Directly",
      paragraphs: [
        "Because Thread has a constructor that accepts Runnable, we can pass the lambda directly."
      ],
      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Thread thread = new Thread(() -> {
            System.out.println("Task is running");
        });

        thread.start();
    }
}`
      }
    },

    {
      id: "thread-name",
      title: "7. Naming the Thread",
      paragraphs: [
        "We can provide a meaningful name when creating the Thread."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println(
            Thread.currentThread().getName()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread thread =
            new Thread(task, "Worker-1");

        thread.start();
    }
}`
      },
      output: "Worker-1"
    },

    {
      id: "multiple-threads",
      title: "8. Multiple Threads Using Runnable",
      paragraphs: [
        "The same Runnable object can be passed to multiple Thread objects.",
        "Each Thread can execute the same task."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println(
            Thread.currentThread().getName()
            + " is running"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread thread1 =
            new Thread(task, "Worker-1");

        Thread thread2 =
            new Thread(task, "Worker-2");

        thread1.start();
        thread2.start();
    }
}`
      }
    },

    {
      id: "shared-state",
      title: "9. Shared State",
      paragraphs: [
        "When multiple threads use the same Runnable object, its instance variables can become shared state.",
        "Shared mutable state must be handled carefully because multiple threads may modify it at the same time."
      ],
      code: {
        language: "java",
        code: `class CounterTask implements Runnable {

    private int count = 0;

    @Override
    public void run() {
        count++;
        System.out.println(count);
    }
}

public class Main {

    public static void main(String[] args) {

        CounterTask task =
            new CounterTask();

        new Thread(task).start();
        new Thread(task).start();
    }
}`
      }
    },

    {
      id: "runnable-inheritance",
      title: "10. Runnable and Inheritance",
      paragraphs: [
        "One major advantage of Runnable is that the class can extend another class.",
        "Java allows a class to extend one class and implement multiple interfaces."
      ],
      code: {
        language: "java",
        code: `class Employee {

    public void display() {
        System.out.println("Employee");
    }
}

class EmployeeTask
        extends Employee
        implements Runnable {

    @Override
    public void run() {
        System.out.println("Task running");
    }
}`
      }
    },

    {
      id: "task-separation",
      title: "11. Separating Task and Thread",
      paragraphs: [
        "Runnable separates the task from the thread that executes the task.",
        "This makes the design more flexible."
      ],
      bullets: [
        "Runnable represents the task.",
        "Thread represents the execution mechanism.",
        "ExecutorService can later manage Runnable tasks.",
        "The same task can be submitted to different execution mechanisms."
      ]
    },

    {
      id: "sleep",
      title: "12. Runnable with sleep()",
      paragraphs: [
        "A Runnable can call Thread.sleep() to pause the currently executing thread."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {

        try {

            System.out.println("Started");

            Thread.sleep(1000);

            System.out.println("Finished");

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();
        }
    }
}

public class Main {

    public static void main(String[] args) {

        new Thread(new MyTask()).start();
    }
}`
      }
    },

    {
      id: "join",
      title: "13. Runnable with join()",
      paragraphs: [
        "join() belongs to Thread.",
        "If a Runnable is executed by a Thread, another thread can call join() on that Thread."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {

        System.out.println("Task started");

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Task finished");
    }
}

public class Main {

    public static void main(String[] args)
        throws InterruptedException {

        Thread worker =
            new Thread(new MyTask());

        worker.start();

        worker.join();

        System.out.println("Main continues");
    }
}`
      }
    },

    {
      id: "interrupt",
      title: "14. Interrupting a Runnable",
      paragraphs: [
        "A Runnable task can respond to interruption.",
        "If a blocking operation throws InterruptedException, the task should handle the interruption appropriately."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {

        try {

            Thread.sleep(5000);

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            System.out.println(
                "Task interrupted"
            );
        }
    }
}`
      }
    },

    {
      id: "exceptions",
      title: "15. Exception Handling",
      paragraphs: [
        "Runnable.run() cannot declare checked exceptions.",
        "Checked exceptions must therefore be handled inside the run() method."
      ],
      code: {
        language: "java",
        code: `class MyTask implements Runnable {

    @Override
    public void run() {

        try {

            Thread.sleep(1000);

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();
        }
    }
}`
      }
    },

    {
      id: "anonymous-class",
      title: "16. Anonymous Runnable",
      paragraphs: [
        "Runnable can also be implemented using an anonymous class."
      ],
      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Runnable task = new Runnable() {

            @Override
            public void run() {
                System.out.println(
                    "Task running"
                );
            }
        };

        new Thread(task).start();
    }
}`
      }
    },

    {
      id: "method-reference",
      title: "17. Runnable with Method Reference",
      paragraphs: [
        "Because Runnable is a functional interface, a compatible method reference can be used."
      ],
      code: {
        language: "java",
        code: `public class Main {

    static void process() {
        System.out.println("Processing");
    }

    public static void main(String[] args) {

        Runnable task = Main::process;

        new Thread(task).start();
    }
}`
      }
    },

    {
      id: "thread-vs-runnable",
      title: "18. Thread vs Runnable",
      paragraphs: [
        "Extending Thread and implementing Runnable are two different approaches to defining concurrent work."
      ],
      bullets: [
        "Extending Thread uses inheritance.",
        "Runnable represents the task separately.",
        "Runnable allows the class to extend another class.",
        "Runnable works naturally with ExecutorService.",
        "Thread provides thread-specific operations."
      ]
    },

    {
      id: "same-runnable",
      title: "19. Reusing the Same Runnable",
      paragraphs: [
        "The same Runnable object can be supplied to multiple Thread objects."
      ],
      code: {
        language: "java",
        code: `class PrintTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Processing");
    }
}

public class Main {

    public static void main(String[] args) {

        PrintTask task =
            new PrintTask();

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();
    }
}`
      }
    },

    {
      id: "executor-intro",
      title: "20. Runnable and ExecutorService",
      paragraphs: [
        "Runnable is commonly used with the Executor Framework.",
        "ExecutorService allows applications to submit tasks without manually creating a new thread for every task."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

    public static void main(String[] args) {

        ExecutorService executor =
            Executors.newFixedThreadPool(2);

        Runnable task = () -> {
            System.out.println(
                "Task running"
            );
        };

        executor.submit(task);

        executor.shutdown();
    }
}`
      }
    },

    {
      id: "why-preferred",
      title: "21. Why Runnable is Often Preferred",
      paragraphs: [
        "Runnable provides better separation between the task and the execution mechanism.",
        "It also avoids the single inheritance limitation of extending Thread."
      ],
      bullets: [
        "Better separation of responsibilities.",
        "Can extend another class.",
        "Can be reused as a task.",
        "Works with ExecutorService.",
        "Suitable for application-level task definitions."
      ]
    },

    {
      id: "runnable-not-thread",
      title: "22. Runnable is Not a Thread",
      paragraphs: [
        "A common beginner mistake is thinking that a Runnable object itself is a thread.",
        "Runnable only describes work. A Thread or executor must execute that work."
      ],
      code: {
        language: "java",
        code: `Runnable task = () -> {
    System.out.println("Hello");
};

Thread thread = new Thread(task);

thread.start();`
      }
    },

    {
      id: "common-mistakes",
      title: "23. Common Mistakes",
      paragraphs: [
        "These mistakes are common when learning Runnable."
      ],
      bullets: [
        "Calling run() instead of start().",
        "Thinking Runnable creates a thread automatically.",
        "Sharing mutable state without synchronization.",
        "Ignoring InterruptedException.",
        "Assuming thread execution order.",
        "Creating too many manual threads."
      ]
    },

    {
      id: "real-world",
      title: "24. Real-World Example",
      paragraphs: [
        "Suppose an application needs to process an order in the background.",
        "The order-processing operation can be represented as a Runnable task."
      ],
      code: {
        language: "java",
        code: `class OrderTask implements Runnable {

    private final int orderId;

    public OrderTask(int orderId) {
        this.orderId = orderId;
    }

    @Override
    public void run() {

        System.out.println(
            "Processing order: " + orderId
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Runnable task =
            new OrderTask(101);

        Thread thread =
            new Thread(task, "Order-Worker");

        thread.start();
    }
}`
      }
    },

    {
      id: "runnable-and-spring",
      title: "25. Runnable in Backend Applications",
      paragraphs: [
        "In backend applications, Runnable can represent background work such as report generation, file processing, or notification tasks.",
        "For production applications, manually creating threads is usually not the preferred approach. Managed thread pools and framework facilities provide better control."
      ]
    },

    {
      id: "shared-state-warning",
      title: "26. Shared Mutable State Warning",
      paragraphs: [
        "Using the same Runnable object from multiple threads can expose shared mutable fields to concurrent access.",
        "Such state may require synchronization or another concurrency mechanism."
      ],
      code: {
        language: "java",
        code: `class CounterTask implements Runnable {

    private int count;

    @Override
    public synchronized void run() {
        count++;
        System.out.println(count);
    }
}`
      }
    },

    {
      id: "runnable-and-lambda",
      title: "27. Runnable and Java 8",
      paragraphs: [
        "Runnable became especially convenient with Java 8 because it is a functional interface and therefore works naturally with lambda expressions."
      ],
      code: {
        language: "java",
        code: `Runnable task =
    () -> System.out.println("Hello");

Thread thread =
    new Thread(task);

thread.start();`
      }
    },

    {
      id: "best-practices",
      title: "28. Runnable Best Practices",
      bullets: [
        "Keep the Runnable focused on the task.",
        "Avoid unnecessary shared mutable state.",
        "Handle InterruptedException correctly.",
        "Do not depend on thread execution order.",
        "Use meaningful thread names when appropriate.",
        "Prefer ExecutorService for managing multiple tasks.",
        "Use synchronization or concurrency utilities when shared state requires protection."
      ]
    },

    {
      id: "summary",
      title: "29. Summary",
      paragraphs: [
        "Runnable is a functional interface that represents a task.",
        "It does not create a thread by itself.",
        "A Runnable can be passed to a Thread and started using start().",
        "Runnable separates task logic from thread management.",
        "Runnable is commonly used with executor-based concurrency."
      ]
    },

    {
      id: "interview",
      title: "30. Interview Questions",
      interviewQuestions: [
        {
          question: "What is Runnable?",
          answer:
            "Runnable is a functional interface that represents a task that can be executed by a thread."
        },
        {
          question: "How do you create a thread using Runnable?",
          answer:
            "Implement Runnable, override run(), create a Thread with the Runnable object, and call start() on the Thread."
        },
        {
          question: "Does Runnable create a thread?",
          answer:
            "No. Runnable represents the task. Thread or an executor performs the execution."
        },
        {
          question: "Why use Runnable instead of extending Thread?",
          answer:
            "Runnable separates task logic from thread management and allows the class to extend another class."
        },
        {
          question: "What happens when run() is called directly?",
          answer:
            "It executes as a normal method on the current thread. A new thread is not created."
        },
        {
          question: "Can the same Runnable be used by multiple threads?",
          answer:
            "Yes. The same Runnable object can be passed to multiple Thread objects, but shared mutable state must be handled safely."
        },
        {
          question: "Can Runnable throw checked exceptions from run()?",
          answer:
            "No. Runnable.run() does not declare checked exceptions, so checked exceptions must be handled inside the method."
        },
        {
          question: "What is the relationship between Runnable and ExecutorService?",
          answer:
            "ExecutorService can execute submitted Runnable tasks using managed worker threads."
        }
      ]
    }
  ]
};