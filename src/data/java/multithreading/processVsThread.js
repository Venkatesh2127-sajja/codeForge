export const processVsThread = {
  id: "process-vs-thread",
  slug: "process-vs-thread",
  title: "Process vs Thread",
  topicTitle: "Multithreading",
  topicSlug: "multithreading",
  description:
    "Understand the difference between a process and a thread, how threads work inside a process, memory sharing, resource isolation, communication, creation cost, and why Java applications use multiple threads.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-process",
      title: "1. What is a Process?",

      paragraphs: [
        "A process is a running instance of a program.",
        "When you start an application, the operating system creates a process for that application. The process gets its own address space and operating-system-managed resources.",
        "For example, when you start a Java application, the JVM runs as a process."
      ],

      code: {
        language: "text",
        code: `Application
     |
     v
Operating System
     |
     v
Java Process (JVM)
     |
     +---- Threads`
      },

      bullets: [
        "A process is a running program.",
        "A process has its own address space.",
        "A process has operating-system-managed resources.",
        "A process can contain one or more threads.",
        "Different processes are generally isolated from each other."
      ]
    },

    {
      id: "process-example",
      title: "2. Real-World Example of a Process",

      paragraphs: [
        "Suppose you open a Java application. The operating system creates a process for that application.",
        "If you open another independent application, the operating system can create another process.",
        "Each process can have its own threads."
      ],

      code: {
        language: "text",
        code: `Operating System
│
├── Java Application Process
│   ├── Main Thread
│   ├── Worker Thread
│   └── Worker Thread
│
└── Another Application Process
    ├── Main Thread
    └── Worker Thread`
      }
    },

    {
      id: "what-is-thread",
      title: "3. What is a Thread?",

      paragraphs: [
        "A thread is an execution path within a process.",
        "A single process can contain multiple threads. These threads share many resources of their process while maintaining their own execution state."
      ],

      code: {
        language: "text",
        code: `Java Process
     |
     +-------------------+
     |                   |
     v                   v
 Main Thread        Worker Thread
     |                   |
   Task A              Task B`
      },

      bullets: [
        "Thread = unit of execution.",
        "A process can contain multiple threads.",
        "Threads within a process share process resources.",
        "Each thread has its own execution stack and thread-specific state."
      ]
    },

    {
      id: "process-thread-relationship",
      title: "4. Relationship Between Process and Thread",

      paragraphs: [
        "A process provides the environment and resources in which threads execute.",
        "Threads are execution units inside that process.",
        "Therefore, a process can be viewed as a container for one or more threads and the resources they use."
      ],

      code: {
        language: "text",
        code: `Process
│
├── Memory / Address Space
├── Resources
├── Main Thread
├── Worker Thread 1
└── Worker Thread 2`
      }
    },

    {
      id: "process-memory",
      title: "5. Process Memory",

      paragraphs: [
        "A process normally has its own virtual address space. This provides isolation between processes.",
        "One process generally cannot directly access another process's memory without using operating-system-supported mechanisms such as inter-process communication."
      ],

      code: {
        language: "text",
        code: `Process A                    Process B
┌──────────────┐              ┌──────────────┐
│ Own Address  │              │ Own Address  │
│ Space        │              │ Space        │
│              │              │              │
│ Data         │              │ Data         │
└──────────────┘              └──────────────┘

       Separate process memory spaces`
      },

      bullets: [
        "Processes are generally isolated from one another.",
        "A process has its own virtual address space.",
        "Process isolation improves fault containment and security."
      ]
    },

    {
      id: "thread-memory",
      title: "6. Thread Memory Sharing",

      paragraphs: [
        "Threads belonging to the same process share the process's memory and many of its resources.",
        "In a Java application, multiple threads can access the same objects on the heap.",
        "This shared memory makes communication between threads convenient, but it also introduces concurrency problems when mutable data is accessed without proper coordination."
      ],

      code: {
        language: "text",
        code: `Java Process
│
├── Heap
│   ├── Object A
│   ├── Object B
│   └── Shared Object
│
├── Thread 1
│   └── Own Stack
│
├── Thread 2
│   └── Own Stack
│
└── Thread 3
    └── Own Stack`
      },

      bullets: [
        "Threads share process-level memory such as the heap.",
        "Each thread has its own stack.",
        "Shared mutable objects require thread-safe access.",
        "Shared memory is useful but can cause race conditions."
      ]
    },

    {
      id: "thread-stack",
      title: "7. Does Every Thread Have Its Own Stack?",

      paragraphs: [
        "Yes. Each Java thread has its own JVM stack.",
        "The stack contains execution information such as stack frames for method calls and thread-local execution state.",
        "Objects created with new are normally allocated on the heap, while references and method execution information can be held in a thread's stack frames."
      ],

      code: {
        language: "text",
        code: `Shared Heap
┌──────────────────────┐
│ Customer Object      │
│ Order Object         │
└──────────────────────┘
          ▲
          │
    shared references
          │
 ┌────────┴────────┐
 │                 │
 ▼                 ▼
Thread 1         Thread 2
Stack            Stack
┌───────┐        ┌───────┐
│ frame │        │ frame │
│ frame │        │ frame │
└───────┘        └───────┘`
      },

      bullets: [
        "Heap is shared by threads in the same process.",
        "Each thread has its own stack.",
        "Local variables belong to individual method invocations.",
        "Shared object state can still be accessed by multiple threads."
      ]
    },

    {
      id: "resource-sharing",
      title: "8. What Resources Do Threads Share?",

      paragraphs: [
        "Threads belonging to the same process share many process-level resources.",
        "In a Java application, threads can access the same heap objects, class metadata, and other process resources."
      ],

      bullets: [
        "Heap memory.",
        "Loaded classes and class metadata.",
        "Process-level resources.",
        "Open resources managed by the process, subject to the operating system and runtime.",
        "Application-wide shared objects."
      ]
    },

    {
      id: "thread-independent-state",
      title: "9. What Does Each Thread Maintain Separately?",

      paragraphs: [
        "Although threads share many process resources, each thread also maintains its own execution state.",
        "This allows different threads to execute different methods and tasks independently."
      ],

      bullets: [
        "Program counter / execution position.",
        "Its own JVM stack.",
        "Its own stack frames.",
        "Thread identity and name.",
        "Thread state.",
        "Thread-local storage when used."
      ]
    },

    {
      id: "communication-process",
      title: "10. Communication Between Processes",

      paragraphs: [
        "Because processes normally have separate address spaces, communication between processes requires an inter-process communication mechanism.",
        "Examples include pipes, sockets, shared memory mechanisms, files, and operating-system-specific IPC facilities."
      ],

      code: {
        language: "text",
        code: `Process A
    |
    | IPC
    v
Process B

Examples:
- Socket
- Pipe
- Shared memory
- File
- OS IPC mechanism`
      },

      bullets: [
        "Processes normally cannot directly access each other's memory.",
        "IPC is used for communication between processes.",
        "IPC generally requires more coordination than sharing memory inside one process."
      ]
    },

    {
      id: "communication-threads",
      title: "11. Communication Between Threads",

      paragraphs: [
        "Threads within the same process can communicate through shared objects and synchronization mechanisms.",
        "Java provides mechanisms such as synchronized blocks, locks, wait/notify, concurrent collections, and higher-level concurrency utilities."
      ],

      code: {
        language: "java",
        code: `class SharedData {

    private int value;

    public synchronized void setValue(int value) {
        this.value = value;
    }

    public synchronized int getValue() {
        return value;
    }
}`
      },

      bullets: [
        "Threads can share Java objects.",
        "Shared data must be designed for safe concurrent access.",
        "Synchronization can coordinate access to shared mutable state.",
        "Higher-level concurrency utilities are often preferable to manually coordinating threads."
      ]
    },

    {
      id: "failure-isolation",
      title: "12. Process Isolation vs Thread Failure",

      paragraphs: [
        "Processes provide stronger isolation from each other than threads within the same process.",
        "A serious failure in one process does not normally directly corrupt the memory of another process.",
        "Threads within the same process share memory, so an error involving shared state can affect other threads."
      ],

      code: {
        language: "text",
        code: `Process A             Process B
┌───────────┐          ┌───────────┐
│ Threads   │          │ Threads   │
│           │          │           │
└───────────┘          └───────────┘
      X
   failure

Process B is isolated from Process A's
address space.`
      },

      bullets: [
        "Processes provide stronger memory isolation.",
        "Threads share process resources.",
        "Shared memory makes thread communication easier.",
        "Shared memory also means concurrency bugs can affect multiple threads."
      ]
    },

    {
      id: "creation-cost",
      title: "13. Process Creation vs Thread Creation",

      paragraphs: [
        "Creating and managing a process generally involves more operating-system resources than creating a thread within an existing process.",
        "Threads share many process resources, so creating a thread can be relatively lightweight compared with creating an independent process.",
        "The exact cost depends on the operating system, JVM, workload, and implementation."
      ],

      bullets: [
        "Processes generally have greater resource overhead.",
        "Threads share process resources.",
        "Thread creation can be cheaper than process creation.",
        "Creating thousands of platform threads can still be expensive.",
        "Thread pools and modern concurrency mechanisms help control resource usage."
      ]
    },

    {
      id: "context-switching",
      title: "14. What is Context Switching?",

      paragraphs: [
        "Context switching occurs when the system switches execution from one task or thread to another.",
        "The system needs to preserve enough execution state for the previous task and restore the state of the next task.",
        "Context switching has overhead, so simply creating more threads does not always make an application faster."
      ],

      code: {
        language: "text",
        code: `CPU
 |
 +---- Thread A
 |
 | context switch
 v
 +---- Thread B
 |
 | context switch
 v
 +---- Thread A`
      },

      bullets: [
        "Context switching allows multiple runnable tasks to make progress.",
        "Switching has overhead.",
        "Too many threads can increase contention and scheduling overhead.",
        "Thread-pool sizing should match the workload."
      ]
    },

    {
      id: "java-process",
      title: "15. What Happens When a Java Application Starts?",

      paragraphs: [
        "When a Java application starts, the operating system starts the Java process and the JVM initializes the runtime environment.",
        "The JVM then starts the main thread, which executes the main() method.",
        "Additional threads can be created during application execution."
      ],

      code: {
        language: "text",
        code: `Operating System
       |
       v
   Java Process
       |
       v
      JVM
       |
       v
   Main Thread
       |
       +---- Worker Thread
       |
       +---- Worker Thread`
      },

      bullets: [
        "The JVM runs inside a process.",
        "The main thread executes main().",
        "The JVM can have additional runtime threads.",
        "Application code can create additional threads."
      ]
    },

    {
      id: "java-multiple-threads",
      title: "16. One Java Process Can Have Multiple Threads",

      paragraphs: [
        "A Java application does not have to perform all work using the main thread.",
        "It can create multiple worker threads to perform independent tasks."
      ],

      code: {
        language: "java",
        code: `public class MultipleThreadExample {

    public static void main(String[] args) {

        Thread thread1 = new Thread(() ->
            System.out.println("Task 1")
        );

        Thread thread2 = new Thread(() ->
            System.out.println("Task 2")
        );

        thread1.start();
        thread2.start();

        System.out.println("Main task");
    }
}`
      },

      bullets: [
        "One process can contain multiple threads.",
        "Threads can perform different tasks.",
        "The JVM and operating system manage their execution."
      ]
    },

    {
      id: "shared-object-example",
      title: "17. Threads Sharing the Same Object",

      paragraphs: [
        "One of the most important differences between processes and threads is that threads in the same process can access shared objects.",
        "This is powerful for communication but creates the need for thread-safety mechanisms."
      ],

      code: {
        language: "java",
        code: `class SharedCounter {

    int count = 0;
}

public class SharedObjectExample {

    public static void main(String[] args) {

        SharedCounter counter = new SharedCounter();

        Thread t1 = new Thread(() -> {
            counter.count++;
        });

        Thread t2 = new Thread(() -> {
            counter.count++;
        });

        t1.start();
        t2.start();
    }
}`
      },

      bullets: [
        "Both threads can access the same counter object.",
        "The object is stored in shared heap memory.",
        "Concurrent modification can cause race conditions.",
        "Later lessons will cover synchronized, locks, and atomic variables."
      ]
    },

    {
      id: "process-vs-thread-table",
      title: "18. Process vs Thread — Comparison",

      paragraphs: [
        "The following comparison summarizes the main differences."
      ],

      bullets: [
        "Process: independent running program; Thread: execution unit inside a process.",
        "Process: separate address space; Threads: share the process address space.",
        "Process: generally higher resource overhead; Thread: generally lower resource overhead.",
        "Process communication: usually requires IPC; Thread communication: can use shared memory and synchronization.",
        "Process isolation: stronger; Thread isolation: weaker because memory is shared.",
        "Process creation: generally more expensive; Thread creation: generally lighter, though platform threads still have cost.",
        "Process failure: generally isolated from other processes; Thread failure or shared-state bugs can affect the containing process."
      ]
    },

    {
      id: "process-vs-thread-diagram",
      title: "19. Visualizing Process and Thread",

      code: {
        language: "text",
        code: `                 OPERATING SYSTEM
                        |
          +-------------+-------------+
          |                           |
          v                           v
      Process A                   Process B
     +---------+                 +---------+
     | Memory  |                 | Memory  |
     |         |                 |         |
     | Thread1 |                 | Thread1 |
     | Thread2 |                 | Thread2 |
     | Thread3 |                 |         |
     +---------+                 +---------+

Different processes
      -> separate address spaces

Threads inside one process
      -> shared process memory`
      }
    },

    {
      id: "when-use-process",
      title: "20. When Do We Use Separate Processes?",

      paragraphs: [
        "Separate processes are useful when strong isolation, independent deployment, fault containment, or separate runtime environments are required.",
        "Modern distributed systems frequently use multiple application processes or service instances."
      ],

      bullets: [
        "Running independent applications.",
        "Strong isolation requirements.",
        "Fault containment.",
        "Independent deployment.",
        "Running separate services.",
        "Using different runtime environments."
      ]
    },

    {
      id: "when-use-threads",
      title: "21. When Do We Use Multiple Threads?",

      paragraphs: [
        "Multiple threads are useful when tasks belong to the same application and can benefit from concurrent execution.",
        "Typical examples include handling requests, background jobs, asynchronous work, and parallelizable computations."
      ],

      bullets: [
        "Handling multiple requests.",
        "Background processing.",
        "Concurrent I/O operations.",
        "Scheduled tasks.",
        "Parallel computation when appropriate.",
        "Asynchronous application workflows."
      ]
    },

    {
      id: "backend-example",
      title: "22. Process vs Thread in a Backend Application",

      paragraphs: [
        "Consider a Spring Boot application running on a server.",
        "The operating system runs the application as a process. Inside that process, the application server can use multiple threads to process requests.",
        "This allows multiple clients to be served concurrently."
      ],

      code: {
        language: "text",
        code: `Clients
  |
  +---- Request 1 ----+
  +---- Request 2 ----+----> Spring Boot Process
  +---- Request 3 ----+          |
  +---- Request 4 ----+          +-- Thread 1
                                 +-- Thread 2
                                 +-- Thread 3
                                 +-- Thread 4`
      },

      bullets: [
        "One application instance runs inside a process.",
        "Multiple threads can handle application work.",
        "Thread pools help control concurrent execution.",
        "Shared application state must be handled safely."
      ]
    },

    {
      id: "microservices-example",
      title: "23. Processes in a Backend System",

      paragraphs: [
        "A backend system can run multiple application instances or services as separate processes.",
        "Each process can then use multiple threads internally."
      ],

      code: {
        language: "text",
        code: `                    Load Balancer
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
          Process A   Process B   Process C
             |           |           |
          Threads     Threads     Threads`
      },

      bullets: [
        "Multiple processes can provide application-level isolation.",
        "Each process can use multiple threads.",
        "This creates two levels of concurrency: multiple processes and multiple threads per process."
      ]
    },

    {
      id: "common-misunderstanding",
      title: "24. Common Misunderstandings",

      bullets: [
        "A thread is not the same thing as a process.",
        "A process can contain multiple threads.",
        "Threads do not each get a completely separate process memory space.",
        "Calling start() does not guarantee immediate execution.",
        "More threads do not automatically mean better performance.",
        "Concurrency does not always mean simultaneous execution.",
        "Thread safety is necessary when shared mutable state is accessed concurrently."
      ]
    },

    {
      id: "important-interview-point",
      title: "25. Important Interview Point",

      paragraphs: [
        "A very common interview question is: 'If threads share memory, what is private to each thread?'",
        "The important answer is that threads share the process's memory and resources, but each thread has its own execution state, including its own JVM stack and stack frames."
      ],

      code: {
        language: "text",
        code: `Shared:
- Heap
- Process resources
- Loaded classes

Per thread:
- JVM stack
- Stack frames
- Program counter / execution position
- Thread state`
      }
    },

    {
      id: "process-vs-thread-summary",
      title: "26. Process vs Thread — Easy Explanation",

      paragraphs: [
        "Think of a process as a company and threads as employees working inside that company.",
        "The company has shared resources such as an office and equipment. Employees can use those shared resources, but each employee has their own current task and working state.",
        "Similarly, a process provides shared resources while threads provide individual execution paths."
      ],

      code: {
        language: "text",
        code: `Company = Process

Employees = Threads

Shared office/resources = Process resources

Each employee's current work = Thread execution state`
      }
    },

    {
      id: "key-points",
      title: "27. Key Points to Remember",

      bullets: [
        "A process is a running program.",
        "A thread is an execution unit inside a process.",
        "A process normally has its own virtual address space.",
        "Threads within a process share many resources.",
        "Each thread has its own JVM stack and execution state.",
        "Threads can communicate through shared memory.",
        "Shared mutable state can cause race conditions.",
        "Processes provide stronger isolation than threads.",
        "Creating too many threads can hurt performance.",
        "Thread pools help manage thread resources."
      ]
    },

    {
      id: "common-mistakes",
      title: "28. Common Interview Mistakes",

      bullets: [
        "Saying every thread has completely separate memory.",
        "Saying threads cannot share objects.",
        "Saying concurrency always means simultaneous execution.",
        "Saying more threads always improve performance.",
        "Confusing a JVM process with a Java thread.",
        "Forgetting that each thread has its own stack."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",

      bullets: [
        "Understand whether a task is CPU-bound or I/O-bound before choosing a concurrency strategy.",
        "Avoid unnecessary shared mutable state.",
        "Use thread-safe collections and concurrency utilities when appropriate.",
        "Prefer managed thread pools for application workloads.",
        "Do not depend on thread scheduling order.",
        "Use synchronization or atomic mechanisms when shared state requires coordination."
      ]
    },

    {
      id: "interview-questions",
      title: "30. Interview Questions",

      paragraphs: [
        "These questions are important for beginner-level Java multithreading interviews."
      ],

      interviewQuestions: [
        {
          question: "What is a process?",
          answer:
            "A process is a running instance of a program with its own virtual address space and operating-system-managed resources."
        },
        {
          question: "What is a thread?",
          answer:
            "A thread is an execution unit within a process. A process can contain multiple threads."
        },
        {
          question: "What is the main difference between a process and a thread?",
          answer:
            "A process generally has its own address space, while threads within the same process share the process's memory and resources."
        },
        {
          question: "Do threads share memory?",
          answer:
            "Threads in the same process share many process-level resources, including the heap in a Java application, while each thread has its own execution stack."
        },
        {
          question: "Does every thread have its own stack?",
          answer:
            "Yes. Each Java thread has its own JVM stack containing its method execution frames."
        },
        {
          question: "Can one process have multiple threads?",
          answer:
            "Yes. A process can contain multiple threads that execute concurrently."
        },
        {
          question: "Which is generally more expensive, a process or a thread?",
          answer:
            "Creating and managing an independent process generally involves more resource overhead than creating a thread within an existing process, although the exact cost depends on the platform and implementation."
        },
        {
          question: "How do processes communicate?",
          answer:
            "Processes generally communicate using inter-process communication mechanisms such as sockets, pipes, shared memory mechanisms, files, or operating-system IPC facilities."
        },
        {
          question: "How do threads communicate?",
          answer:
            "Threads in the same process can communicate through shared objects and synchronization or concurrency mechanisms."
        },
        {
          question: "Why can too many threads reduce performance?",
          answer:
            "Too many threads can increase context-switching, scheduling, memory, and synchronization overhead and can create contention for CPU and other resources."
        }
      ]
    }
  ]
};