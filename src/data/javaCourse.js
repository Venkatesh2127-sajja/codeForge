export const javaCourse = {
  slug: "java",

  title: "Java Tutorial",

  description:
    "Learn Java programming from the fundamentals to advanced concepts through practical explanations, examples, and coding practice.",

  topics: [
    // =========================================================
    // 1. INTRODUCTION TO JAVA
    // =========================================================

    {
      id: 1,
      title: "Introduction to Java",

      slug: "introduction",

      description:
        "Understand Java, its features, JVM, JDK and JRE.",

      lessons: [
        {
          id: 101,
          title: "What is Java?",
          slug: "what-is-java",
          type: "lesson"
        },
        {
          id: 102,
          title: "Features of Java",
          slug: "features-of-java",
          type: "lesson"
        },
        {
          id: 103,
          title: "JDK vs JRE vs JVM",
          slug: "jdk-jre-jvm",
          type: "lesson"
        },
        {
          id: 104,
          title: "First Java Program",
          slug: "first-java-program",
          type: "lesson"
        }
      ]
    },

    // =========================================================
    // 2. JAVA BASICS
    // =========================================================

    {
      id: 2,
      title: "Java Basics",

      slug: "basics",

      description:
        "Learn the fundamental building blocks of Java programming.",

      lessons: [
        {
          id: 201,
          title: "Variables",
          slug: "variables",
          type: "lesson"
        },
        {
          id: 202,
          title: "Data Types",
          slug: "data-types",
          type: "lesson"
        },
        {
          id: 203,
          title: "Operators",
          slug: "operators",
          type: "lesson"
        },
        {
          id: 204,
          title: "Conditional Statements",
          slug: "conditional-statements",
          type: "lesson"
        },
        {
          id: 205,
          title: "Loops",
          slug: "loops",
          type: "lesson"
        },
        {
          id: 206,
          title: "Arrays",
          slug: "arrays",
          type: "lesson"
        },
        {
          id: 207,
          title: "Strings",
          slug: "strings",
          type: "lesson"
        }
      ]
    },

    // =========================================================
    // 3. OBJECT-ORIENTED PROGRAMMING
    // =========================================================

    {
      id: 3,
      title: "Object-Oriented Programming",

      slug: "oops",

      description:
        "Understand the core principles of object-oriented programming.",

      lessons: [
        {
          id: 301,
          title: "Class and Object",
          slug: "class-and-object",
          type: "lesson"
        },
        {
          id: 302,
          title: "Constructors",
          slug: "constructors",
          type: "lesson"
        },
        {
          id: 303,
          title: "Encapsulation",
          slug: "encapsulation",
          type: "lesson"
        },
        {
          id: 304,
          title: "Inheritance",
          slug: "inheritance",
          type: "lesson"
        },
        {
          id: 305,
          title: "Polymorphism",
          slug: "polymorphism",
          type: "lesson"
        },
        {
          id: 306,
          title: "Abstraction",
          slug: "abstraction",
          type: "lesson"
        },
        {
      id: 307,
      title: "Interfaces",
      slug: "interfaces",
      type: "lesson"
    }
      ]
    },

    // =========================================================
    // 4. EXCEPTION HANDLING
    // =========================================================
{
  id: 4,
  title: "Exception Handling",
  slug: "exception-handling",
  description:
    "Learn Java exception handling from fundamentals to advanced concepts including exception hierarchy, checked and unchecked exceptions, try-catch, finally, throw, throws, custom exceptions, and advanced exception handling.",
  lessons: [
    {
      id: 401,
      title: "What is an Exception?",
      slug: "what-is-exception",
      type: "lesson"
    },
    {
      id: 402,
      title: "Exception Hierarchy",
      slug: "exception-hierarchy",
      type: "lesson"
    },
    {
      id: 403,
      title: "Checked vs Unchecked Exceptions",
      slug: "checked-vs-unchecked-exceptions",
      type: "lesson"
    },
    {
      id: 404,
      title: "try-catch",
      slug: "try-catch",
      type: "lesson"
    },
    {
      id: 405,
      title: "Multiple catch and Nested try",
      slug: "multiple-catch-and-nested-try",
      type: "lesson"
    },
    {
      id: 406,
      title: "finally",
      slug: "finally",
      type: "lesson"
    },
    {
      id: 407,
      title: "throw",
      slug: "throw",
      type: "lesson"
    },
    {
      id: 408,
      title: "throws and Exception Propagation",
      slug: "throws-and-exception-propagation",
      type: "lesson"
    },
    {
      id: 409,
      title: "Custom Exceptions",
      slug: "custom-exceptions",
      type: "lesson"
    },
    {
      id: 410,
      title: "Advanced Exception Handling",
      slug: "advanced-exception-handling",
      type: "lesson"
    }
  ]
},

    // =========================================================
    // 5. COLLECTIONS
    // =========================================================

 
{
  id: 5,
  title: "Collections",
  slug: "collections",
  description:
    "Learn Java's Collection Framework, List, Set, Map, Queue, Deque, iterators, sorting, hashing, performance, and practical collection selection.",

  lessons: [
    {
      id: 501,
      title: "Collections Fundamentals",
      slug: "collections-fundamentals",
      type: "lesson"
    },
    {
      id: 502,
      title: "ArrayList",
      slug: "arraylist",
      type: "lesson"
    },
    {
      id: 503,
      title: "LinkedList",
      slug: "linkedlist",
      type: "lesson"
    },
    {
      id: 504,
      title: "Vector",
      slug: "vector",
      type: "lesson"
    },
    {
      id: 505,
      title: "Stack",
      slug: "stack",
      type: "lesson"
    },
    {
      id: 506,
      title: "HashSet",
      slug: "hashset",
      type: "lesson"
    },
    {
      id: 507,
      title: "LinkedHashSet",
      slug: "linkedhashset",
      type: "lesson"
    },
    {
      id: 508,
      title: "TreeSet",
      slug: "treeset",
      type: "lesson"
    },
    {
      id: 509,
      title: "Queue Fundamentals",
      slug: "queue-fundamentals",
      type: "lesson"
    },
    {
      id: 510,
      title: "PriorityQueue",
      slug: "priority-queue",
      type: "lesson"
    },
    {
      id: 511,
      title: "Deque Fundamentals",
      slug: "deque-fundamentals",
      type: "lesson"
    },
    {
      id: 512,
      title: "ArrayDeque",
      slug: "array-deque",
      type: "lesson"
    },
    {
      id: 513,
      title: "Queue vs Deque",
      slug: "queue-vs-deque",
      type: "lesson"
    },
    {
      id: 514,
      title: "Map Fundamentals",
      slug: "map-fundamentals",
      type: "lesson"
    },
    {
      id: 515,
      title: "HashMap",
      slug: "hashmap",
      type: "lesson"
    },
    {
      id: 516,
      title: "LinkedHashMap",
      slug: "linkedhashmap",
      type: "lesson"
    },
    {
      id: 517,
      title: "TreeMap",
      slug: "treemap",
      type: "lesson"
    },
    {
      id: 518,
      title: "Hashtable",
      slug: "hashtable",
      type: "lesson"
    },
    {
      id: 519,
      title: "ConcurrentHashMap",
      slug: "concurrent-hash-map",
      type: "lesson"
    },

    {
      id: 520,
      title: "Iterable and Iterator",
      slug: "iterable-and-iterator",
      type: "lesson"
    },
    {
      id: 521,
      title: "Collection Interface",
      slug: "collection-interface",
      type: "lesson"
    },
    {
      id: 522,
      title: "List Interface",
      slug: "list-interface",
      type: "lesson"
    },
    {
      id: 523,
      title: "Set Interface",
      slug: "set-interface",
      type: "lesson"
    },
    {
      id: 524,
      title: "Iterator",
      slug: "iterator",
      type: "lesson"
    },
    {
      id: 525,
      title: "ListIterator",
      slug: "list-iterator",
      type: "lesson"
    },
    {
      id: 526,
      title: "Comparable",
      slug: "comparable",
      type: "lesson"
    },
    {
      id: 527,
      title: "Comparator",
      slug: "comparator",
      type: "lesson"
    },
    {
      id: 528,
      title: "Collections Utility Class",
      slug: "collections-utility-class",
      type: "lesson"
    },
    {
      id: 529,
      title: "Arrays vs Collections",
      slug: "arrays-vs-collections",
      type: "lesson"
    },
    {
      id: 530,
      title: "Comparable vs Comparator",
      slug: "comparable-vs-comparator",
      type: "lesson"
    },
    {
      id: 531,
      title: "Fail-Fast vs Fail-Safe",
      slug: "fail-fast-vs-fail-safe",
      type: "lesson"
    },
    {
      id: 532,
      title: "equals() and hashCode()",
      slug: "equals-and-hashcode",
      type: "lesson"
    },
    {
      id: 533,
      title: "Immutable and Unmodifiable Collections",
      slug: "immutable-and-unmodifiable",
      type: "lesson"
    },
    {
      id: 534,
      title: "Choosing the Right Collection",
      slug: "choosing-the-right-collection",
      type: "lesson"
    },
    {
      id: 535,
      title: "Collection Performance",
      slug: "collection-performance",
      type: "lesson"
    },
    {
      id: 536,
      title: "Collections Interview Questions",
      slug: "collections-interview-questions",
      type: "lesson"
    }
  ]
},    // =========================================================
    // 6. MULTITHREADING
    // =========================================================

    {
  id: 6,
  title: "Multithreading",
  slug: "multithreading",
  description:
    "Understand Java multithreading, thread creation, executor framework, thread pools, synchronization, concurrency, CompletableFuture, virtual threads, and advanced concurrency concepts.",
  lessons: [
    // 601–605: Fundamentals
    {
      id: 601,
      title: "What is Multithreading?",
      slug: "what-is-multithreading",
      type: "lesson"
    },
    {
      id: 602,
      title: "Process vs Thread",
      slug: "process-vs-thread",
      type: "lesson"
    },
    {
      id: 603,
      title: "Why Multithreading?",
      slug: "why-multithreading",
      type: "lesson"
    },
    {
      id: 604,
      title: "Thread Lifecycle",
      slug: "thread-lifecycle",
      type: "lesson"
    },
    {
      id: 605,
      title: "Thread States",
      slug: "thread-states",
      type: "lesson"
    },

    // 606–610: Thread Creation and Future
    {
      id: 606,
      title: "Creating a Thread",
      slug: "creating-thread",
      type: "lesson"
    },
    {
      id: 607,
      title: "Thread Class",
      slug: "thread-class",
      type: "lesson"
    },
    {
      id: 608,
      title: "Runnable Interface",
      slug: "runnable-interface",
      type: "lesson"
    },
    {
      id: 609,
      title: "Callable Interface",
      slug: "callable-interface",
      type: "lesson"
    },
    {
      id: 610,
      title: "Future Methods",
      slug: "future-methods",
      type: "lesson"
    },

    // 611–616: Executor Framework
    {
      id: 611,
      title: "Executor Framework",
      slug: "executor-framework",
      type: "lesson"
    },
    {
      id: 612,
      title: "Executor execute()",
      slug: "executor-execute",
      type: "lesson"
    },
    {
      id: 613,
      title: "Executor submit()",
      slug: "executor-submit",
      type: "lesson"
    },
    {
      id: 614,
      title: "Executor Shutdown",
      slug: "executor-shutdown",
      type: "lesson"
    },
    {
      id: 615,
      title: "Executor Types",
      slug: "executor-types",
      type: "lesson"
    },
    {
      id: 616,
      title: "ScheduledExecutorService",
      slug: "scheduled-executor-service",
      type: "lesson"
    },

    // 617–626: Thread Pool and Future Concepts
    {
      id: 617,
      title: "ThreadPoolExecutor",
      slug: "thread-pool-executor",
      type: "lesson"
    },
    {
      id: 618,
      title: "RejectedExecutionHandler",
      slug: "rejected-execution-handler",
      type: "lesson"
    },
    {
      id: 619,
      title: "ThreadFactory",
      slug: "thread-factory",
      type: "lesson"
    },
    {
      id: 620,
      title: "Thread Pool Configuration",
      slug: "thread-pool-configuration",
      type: "lesson"
    },
    {
      id: 621,
      title: "Thread Pool Sizing",
      slug: "thread-pool-sizing",
      type: "lesson"
    },
    {
      id: 622,
      title: "BlockingQueue",
      slug: "blocking-queue",
      type: "lesson"
    },
    {
      id: 623,
      title: "Thread Pool Task Submission",
      slug: "thread-pool-task-submission",
      type: "lesson"
    },
    {
      id: 624,
      title: "execute() vs submit()",
      slug: "execute-vs-submit",
      type: "lesson"
    },
    {
      id: 625,
      title: "FutureTask",
      slug: "future-task",
      type: "lesson"
    },
    {
      id: 626,
      title: "FutureTask vs CompletableFuture",
      slug: "future-task-vs-completable-future",
      type: "lesson"
    },

    // 627–638: Advanced Multithreading
    {
      id: 627,
      title: "Synchronization",
      slug: "synchronization",
      type: "lesson"
    },
    {
      id: 628,
      title: "Inter-Thread Communication",
      slug: "inter-thread-communication",
      type: "lesson"
    },
    {
      id: 629,
      title: "Java Memory Model",
      slug: "java-memory-model",
      type: "lesson"
    },
    {
      id: 630,
      title: "Lock API",
      slug: "lock-api",
      type: "lesson"
    },
    {
      id: 631,
      title: "Atomic Operations",
      slug: "atomic-operations",
      type: "lesson"
    },
    {
      id: 632,
      title: "Concurrent Collections",
      slug: "concurrent-collections",
      type: "lesson"
    },
    {
      id: 633,
      title: "Synchronizers",
      slug: "synchronizers",
      type: "lesson"
    },
    {
      id: 634,
      title: "CompletableFuture",
      slug: "completable-future",
      type: "lesson"
    },
    {
      id: 635,
      title: "Deadlock and Concurrency Problems",
      slug: "deadlock-and-concurrency-problems",
      type: "lesson"
    },
    {
      id: 636,
      title: "ThreadLocal and Spring Thread Safety",
      slug: "thread-local-and-spring-thread-safety",
      type: "lesson"
    },
    {
      id: 637,
      title: "Virtual Threads",
      slug: "virtual-threads",
      type: "lesson"
    },
    {
      id: 638,
      title: "Multithreading Interview Scenarios",
      slug: "multithreading-interview-scenarios",
      type: "lesson"
    }
  ]
},
    // =========================================================
    // 7. JAVA 8
    // =========================================================

   {
  id: 7,
  title: "Java 8",
  slug: "java-8",
  description:
    "Learn Java 8 features including functional programming, lambda expressions, method references, Stream API, Optional, Date-Time API, interface enhancements, advanced streams, collectors, CompletableFuture, and interview preparation.",

  lessons: [
    {
      id: 801,
      title: "Java 8 Fundamentals",
      slug: "java-8-fundamentals",
      type: "lesson"
    },

    {
      id: 802,
      title: "Functional Programming Fundamentals",
      slug: "functional-programming-fundamentals",
      type: "lesson"
    },

    {
      id: 803,
      title: "Lambda Expressions",
      slug: "lambda-expressions",
      type: "lesson"
    },

    {
      id: 804,
      title: "Method References",
      slug: "method-references",
      type: "lesson"
    },

    {
      id: 805,
      title: "Stream API Fundamentals",
      slug: "stream-api-fundamentals",
      type: "lesson"
    },

    {
      id: 806,
      title: "Stream API Advanced",
      slug: "stream-api-advanced",
      type: "lesson"
    },

    {
      id: 807,
      title: "Optional",
      slug: "optional",
      type: "lesson"
    },

    {
      id: 808,
      title: "Date and Time API",
      slug: "date-time-api",
      type: "lesson"
    },

    {
      id: 809,
      title: "Interface Enhancements",
      slug: "interface-enhancements",
      type: "lesson"
    },

    {
      id: 810,
      title: "Java 8 Advanced Concepts",
      slug: "java-8-advanced-concepts",
      type: "lesson"
    },

    {
      id: 811,
      title: "Advanced Collectors",
      slug: "advanced-collectors",
      type: "lesson"
    },

    {
      id: 812,
      title: "CompletableFuture",
      slug: "completable-future",
      type: "lesson"
    },

    {
      id: 813,
      title: "Java 8 Interview Preparation",
      slug: "java-8-interview-preparation",
      type: "lesson"
    }
  ]
}
  ]
};

