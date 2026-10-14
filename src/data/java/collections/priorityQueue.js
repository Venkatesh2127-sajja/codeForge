export const priorityQueue = {
  id: "priority-queue",
  slug: "priority-queue",
  title: "PriorityQueue in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn PriorityQueue in Java from priority-based processing and min-heap fundamentals to natural ordering, Comparator, internal heap working, insertion, removal, custom objects, performance, comparisons with Queue, TreeSet and ArrayDeque, common mistakes, best practices, and interview questions.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-priorityqueue",
      title: "1. What is PriorityQueue?",
      paragraphs: [
        "PriorityQueue is a Queue implementation in Java that processes elements according to their priority rather than simple insertion order.",
        "By default, PriorityQueue uses the natural ordering of its elements.",
        "For example, with integers, the smallest value has the highest priority and becomes the head of the queue."
      ],
      code: {
        language: "java",
        code: `import java.util.PriorityQueue;

PriorityQueue<Integer> queue = new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);

System.out.println(queue.poll());`
      },
      output: "10"
    },

    {
      id: "priorityqueue-vs-normal-queue",
      title: "2. PriorityQueue vs Normal Queue",
      paragraphs: [
        "A normal FIFO queue normally processes elements according to insertion order.",
        "PriorityQueue processes elements according to its ordering.",
        "Therefore, an element inserted later can be processed before an element inserted earlier if it has higher priority."
      ],
      code: {
        language: "text",
        code: `Normal Queue:

A → B → C

poll() → A


PriorityQueue:

30
10
20

poll() → 10`
      }
    },

    {
      id: "priorityqueue-hierarchy",
      title: "3. PriorityQueue Hierarchy",
      paragraphs: [
        "PriorityQueue is a class that implements Queue.",
        "Queue extends Collection.",
        "Therefore, PriorityQueue inherits general collection operations while providing priority-based queue behavior."
      ],
      code: {
        language: "text",
        code: `Iterable
   ↓
Collection
   ↓
Queue
   ↓
PriorityQueue`
      }
    },

    {
      id: "creating-priorityqueue",
      title: "4. Creating a PriorityQueue",
      paragraphs: [
        "PriorityQueue is a generic class, so we can specify the type of elements it stores.",
        "The no-argument constructor creates a PriorityQueue that uses the natural ordering of its elements."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(40);
queue.offer(10);
queue.offer(30);

System.out.println(queue.poll());`
      },
      output: "10"
    },

    {
      id: "generic-priorityqueue",
      title: "5. Generics with PriorityQueue",
      paragraphs: [
        "Generics provide compile-time type safety.",
        "Using PriorityQueue<Integer> ensures that the queue stores Integer objects."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(10);
queue.offer(20);

// queue.offer("Java"); // Compile-time error`
      }
    },

    {
      id: "natural-ordering",
      title: "6. Natural Ordering",
      paragraphs: [
        "By default, PriorityQueue uses natural ordering.",
        "For Integer, smaller values have higher priority.",
        "For String, natural ordering is based on lexicographical ordering."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> numbers =
        new PriorityQueue<>();

numbers.offer(50);
numbers.offer(10);
numbers.offer(30);

System.out.println(numbers.poll());
System.out.println(numbers.poll());
System.out.println(numbers.poll());`
      },
      output: `10
30
50`
    },

    {
      id: "min-heap",
      title: "7. PriorityQueue and Min-Heap",
      paragraphs: [
        "The standard PriorityQueue ordering behaves like a min-priority queue when natural ordering is used.",
        "The smallest element is maintained at the head.",
        "Internally, the standard implementation uses a heap-based structure."
      ],
      code: {
        language: "text",
        code: `PriorityQueue:

30
10
20
5

Head:
5

poll() → 5`
      },
      bullets: [
        "Smallest element is the head with natural ordering.",
        "The head has the highest priority.",
        "The complete internal array is not necessarily fully sorted."
      ]
    },

    {
      id: "heap-concept",
      title: "8. What is a Heap?",
      paragraphs: [
        "A heap is a tree-based data structure that satisfies a specific ordering property.",
        "In a min-heap, each parent is less than or equal to its children according to the ordering.",
        "A heap allows the highest-priority element to remain accessible at the root."
      ],
      code: {
        language: "text",
        code: `        10
       /  \
     20    30
    /  \
   40   50

10 is the smallest element
and is therefore the root.`
      }
    },

    {
      id: "heap-array",
      title: "9. Heap Stored in an Array",
      paragraphs: [
        "A binary heap can be efficiently represented using an array.",
        "The tree structure is represented through array indexes instead of explicit tree node objects."
      ],
      code: {
        language: "text",
        code: `Index:
  0   1   2   3   4

Value:
 10  20  30  40  50

For a zero-based array:

left child  = 2 * i + 1
right child = 2 * i + 2
parent      = (i - 1) / 2`
      }
    },

    {
      id: "offer",
      title: "10. offer() Method",
      paragraphs: [
        "The offer() method inserts an element into the PriorityQueue.",
        "The element is placed according to the heap's ordering rules."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);

System.out.println(queue.peek());`
      },
      output: "10"
    },

    {
      id: "add",
      title: "11. add() Method",
      paragraphs: [
        "PriorityQueue also supports add(), inherited through the Queue contract.",
        "For an unbounded PriorityQueue, add() normally succeeds unless an exceptional condition occurs."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.add(30);
queue.add(10);
queue.add(20);

System.out.println(queue.poll());`
      },
      output: "10"
    },

    {
      id: "peek",
      title: "12. peek() Method",
      paragraphs: [
        "peek() returns the head element without removing it.",
        "If the PriorityQueue is empty, peek() returns null."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);

System.out.println(queue.peek());
System.out.println(queue.size());`
      },
      output: `10
3`
    },

    {
      id: "poll",
      title: "13. poll() Method",
      paragraphs: [
        "poll() removes and returns the head element.",
        "With natural ordering, this is normally the smallest element."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);

System.out.println(queue.poll());
System.out.println(queue.poll());
System.out.println(queue.poll());`
      },
      output: `10
20
30`
    },

    {
      id: "remove",
      title: "14. remove() Method",
      paragraphs: [
        "PriorityQueue supports remove() for removing the head element.",
        "The no-argument remove() behaves like the Queue contract and throws NoSuchElementException when the queue is empty.",
        "The overloaded remove(Object) searches for a matching element and removes one occurrence."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);

queue.remove();

System.out.println(queue);`
      },
      output: "[20, 30]"
    },

    {
      id: "priorityqueue-empty",
      title: "15. Empty PriorityQueue",
      paragraphs: [
        "A PriorityQueue can become empty after all elements are removed.",
        "peek() and poll() return null when the queue is empty.",
        "The no-argument remove() throws NoSuchElementException when the queue is empty."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>();

System.out.println(queue.peek());
System.out.println(queue.poll());`
      },
      output: `null
null`
    },

    {
      id: "descending-order",
      title: "16. Creating a Max-Heap Style PriorityQueue",
      paragraphs: [
        "The default PriorityQueue behaves like a min-priority queue for naturally ordered values.",
        "A Comparator can reverse the ordering to make the largest value the head."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
        new PriorityQueue<>(Comparator.reverseOrder());

queue.offer(10);
queue.offer(30);
queue.offer(20);

System.out.println(queue.poll());`
      },
      output: "30"
    },

    {
      id: "custom-comparator",
      title: "17. PriorityQueue with Comparator",
      paragraphs: [
        "A Comparator allows us to define custom priority rules.",
        "This is useful when the default natural ordering does not represent the required business priority."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<String> queue =
        new PriorityQueue<>(
            Comparator.comparingInt(String::length)
        );

queue.offer("Java");
queue.offer("Spring");
queue.offer("AI");

System.out.println(queue.poll());`
      },
      output: "AI"
    },

    {
      id: "custom-object",
      title: "18. PriorityQueue with Custom Objects",
      paragraphs: [
        "PriorityQueue can store custom objects.",
        "The queue needs an ordering mechanism for those objects.",
        "We can provide a Comparator when creating the PriorityQueue."
      ],
      code: {
        language: "java",
        code: `class Task {
    String name;
    int priority;

    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
}

PriorityQueue<Task> queue =
    new PriorityQueue<>(
        Comparator.comparingInt(task -> task.priority)
    );

queue.offer(new Task("Backup", 3));
queue.offer(new Task("Payment", 1));
queue.offer(new Task("Email", 2));

System.out.println(queue.poll().name);`
      },
      output: "Payment"
    },

    {
      id: "comparator-reverse",
      title: "19. Reverse Priority with Comparator",
      paragraphs: [
        "A Comparator can also be reversed when the largest value should have the highest priority.",
        "This is commonly used to create max-heap behavior."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
    new PriorityQueue<>(
        Comparator.reverseOrder()
    );

queue.offer(10);
queue.offer(50);
queue.offer(30);

System.out.println(queue.poll());`
      },
      output: "50"
    },

    {
      id: "custom-priority-rule",
      title: "20. Custom Business Priority",
      paragraphs: [
        "PriorityQueue becomes particularly useful when priority is based on business rules.",
        "For example, a production system may process CRITICAL tasks before HIGH and NORMAL tasks."
      ],
      code: {
        language: "java",
        code: `class Task {
    String name;
    int priority;

    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
}

PriorityQueue<Task> queue =
    new PriorityQueue<>(
        Comparator.comparingInt(task -> task.priority)
    );

queue.offer(new Task("Normal Task", 3));
queue.offer(new Task("Critical Task", 1));
queue.offer(new Task("High Task", 2));

while (!queue.isEmpty()) {
    System.out.println(queue.poll().name);
}`
      },
      output: `Critical Task
High Task
Normal Task`
    },

    {
      id: "priorityqueue-iteration",
      title: "21. Iterating a PriorityQueue",
      paragraphs: [
        "A very important point is that iterating over a PriorityQueue does not guarantee sorted-order traversal.",
        "The PriorityQueue guarantees the correct head according to its ordering, but its iterator does not promise to return elements in priority order."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
    new PriorityQueue<>();

queue.offer(30);
queue.offer(10);
queue.offer(20);
queue.offer(5);

for (Integer value : queue) {
    System.out.println(value);
}`
      },
      bullets: [
        "Do not use the iterator when you need elements strictly in priority order.",
        "Use repeated poll() operations when priority order is required."
      ]
    },

    {
      id: "poll-for-sorted-processing",
      title: "22. Getting Elements in Priority Order",
      paragraphs: [
        "If you need to process elements according to priority, repeatedly call poll().",
        "Each poll() removes the current highest-priority element."
      ],
      code: {
        language: "java",
        code: `PriorityQueue<Integer> queue =
    new PriorityQueue<>();

queue.offer(40);
queue.offer(10);
queue.offer(30);
queue.offer(20);

while (!queue.isEmpty()) {
    System.out.println(queue.poll());
}`
      },
      output: `10
20
30
40`
    },

    {
      id: "internal-working",
      title: "23. Internal Working of PriorityQueue",
      paragraphs: [
        "The standard Java PriorityQueue is implemented using a priority heap represented internally by an array.",
        "When an element is inserted, the heap structure is adjusted so the correct priority element remains at the head.",
        "When the head is removed, another element is moved into the root position and the heap is adjusted again.",
        "The implementation details should be treated as implementation-specific, while the Queue behavior is defined by the API contract."
      ],
      code: {
        language: "text",
        code: `offer(element)
    ↓
Add element to heap
    ↓
Restore heap ordering
    ↓
Head has highest priority


poll()
    ↓
Remove head
    ↓
Move replacement element
    ↓
Restore heap ordering`
      }
    },

    {
      id: "heapify",
      title: "24. Heap Adjustment: Sift Up and Sift Down",
      paragraphs: [
        "When a new element is inserted, it may need to move upward through the heap to restore the heap property.",
        "When the head is removed, a replacement element may move downward until the heap property is restored.",
        "These operations are commonly described as sift-up and sift-down."
      ],
      code: {
        language: "text",
        code: `Insertion:

New element
    ↓
Compare with parent
    ↓
Move upward if necessary


Removal:

Replacement at root
    ↓
Compare with children
    ↓
Move downward if necessary`
      }
    },

    {
      id: "complexity",
      title: "25. PriorityQueue Time Complexity",
      paragraphs: [
        "PriorityQueue provides efficient access to the highest-priority element.",
        "For the standard heap-based implementation, insertion and removal of the head are logarithmic operations, while examining the head is constant time.",
        "Searching for an arbitrary element is linear."
      ],
      code: {
        language: "text",
        code: `Operation              Typical Complexity

offer()                O(log n)
add()                  O(log n)
poll()                 O(log n)
peek()                 O(1)
remove(Object)         O(n)
contains(Object)       O(n)

Note:
Complexity describes the standard heap-based implementation.`
      }
    },

    {
      id: "priorityqueue-vs-treeset",
      title: "26. PriorityQueue vs TreeSet",
      paragraphs: [
        "PriorityQueue and TreeSet both use ordering, but they solve different problems.",
        "PriorityQueue is designed for repeatedly retrieving the highest-priority element.",
        "TreeSet maintains a sorted set of unique elements."
      ],
      code: {
        language: "text",
        code: `PriorityQueue
→ priority-based processing
→ duplicates allowed
→ poll() removes highest-priority element

TreeSet
→ sorted unique collection
→ duplicates not allowed
→ supports Set and NavigableSet operations`
      },
      bullets: [
        "Use PriorityQueue for priority-based processing.",
        "Use TreeSet when you need a sorted set of unique elements.",
        "PriorityQueue does not provide sorted iteration."
      ]
    },

    {
      id: "priorityqueue-vs-arraydeque",
      title: "27. PriorityQueue vs ArrayDeque",
      paragraphs: [
        "ArrayDeque is designed for double-ended queue operations.",
        "PriorityQueue is designed for priority-based processing.",
        "They should not be selected interchangeably."
      ],
      code: {
        language: "text",
        code: `ArrayDeque
→ FIFO queue
→ LIFO stack
→ operations at both ends

PriorityQueue
→ priority-based processing
→ head determined by ordering`
      }
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "PriorityQueue has several behavior details that commonly cause confusion."
      ],
      bullets: [
        "Do not assume PriorityQueue preserves insertion order.",
        "Do not assume printing the queue displays elements in sorted order.",
        "Do not assume iteration returns elements in priority order.",
        "Use poll() repeatedly when priority order is required.",
        "Remember that natural ordering creates min-priority behavior for numbers.",
        "Use Comparator.reverseOrder() when you need reverse numeric priority.",
        "Custom objects need a natural ordering or a Comparator.",
        "Do not assume PriorityQueue allows null elements.",
        "Do not use PriorityQueue when simple FIFO behavior is required.",
        "Do not confuse PriorityQueue with TreeSet; PriorityQueue allows duplicates."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "Choosing the right queue depends on the processing rule required by the application."
      ],
      bullets: [
        "Use the Queue interface as the variable type when appropriate.",
        "Use PriorityQueue when processing order depends on priority.",
        "Use Comparator when business priority differs from natural ordering.",
        "Use poll() when processing elements one by one in priority order.",
        "Use peek() when you need to inspect the next element without removing it.",
        "Use ArrayDeque for many ordinary FIFO or LIFO workloads.",
        "Document custom priority rules clearly.",
        "Avoid relying on the exact internal heap representation.",
        "Remember that PriorityQueue is not synchronized by default.",
        "Use appropriate concurrent queue implementations when multiple threads require concurrent access."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "PriorityQueue is one of the most important Java Queue implementations for interviews because it combines Queue behavior, ordering, Comparator concepts, and heap fundamentals."
      ],
      bullets: [
        "PriorityQueue implements Queue.",
        "By default, the smallest element has highest priority for naturally ordered values.",
        "PriorityQueue is heap-based in the standard Java implementation.",
        "peek() returns the head without removing it.",
        "poll() removes and returns the head.",
        "offer() inserts an element.",
        "Iteration does not guarantee priority order.",
        "Repeated poll() operations process elements according to priority.",
        "PriorityQueue allows duplicates.",
        "PriorityQueue does not permit null elements.",
        "offer() and poll() are typically O(log n).",
        "peek() is typically O(1).",
        "contains() and remove(Object) are typically O(n).",
        "Comparator can be used to define custom priority.",
        "PriorityQueue is not a replacement for TreeSet or ArrayDeque."
      ],
      interviewQuestions: [
        {
          question: "What is PriorityQueue in Java?",
          answer:
            "PriorityQueue is a Queue implementation that processes elements according to their priority instead of simple FIFO insertion order."
        },
        {
          question: "What is the default priority in PriorityQueue?",
          answer:
            "With natural ordering, the smallest element has the highest priority and becomes the head."
        },
        {
          question: "Which data structure is used internally by PriorityQueue?",
          answer:
            "The standard Java implementation uses a heap-based structure represented internally using an array."
        },
        {
          question: "Is PriorityQueue a FIFO queue?",
          answer:
            "No. PriorityQueue is priority-based. Elements are processed according to their ordering rather than simply by insertion order."
        },
        {
          question: "Does PriorityQueue allow duplicates?",
          answer:
            "Yes. PriorityQueue allows duplicate elements."
        },
        {
          question: "Does PriorityQueue allow null?",
          answer:
            "No. PriorityQueue does not permit null elements."
        },
        {
          question: "Does iterating over PriorityQueue return sorted elements?",
          answer:
            "No. The iterator does not guarantee priority-order traversal. Repeated poll() operations should be used when priority order is required."
        },
        {
          question: "How can you create a max-heap style PriorityQueue?",
          answer:
            "Use a reverse-order Comparator, for example new PriorityQueue<>(Comparator.reverseOrder())."
        },
        {
          question: "How do you define custom priority for objects?",
          answer:
            "Provide a Comparator when creating the PriorityQueue, or define a natural ordering for the object type."
        },
        {
          question: "What is the time complexity of offer()?",
          answer:
            "For the standard heap-based implementation, offer() is typically O(log n)."
        },
        {
          question: "What is the time complexity of poll()?",
          answer:
            "For the standard heap-based implementation, poll() is typically O(log n)."
        },
        {
          question: "What is the time complexity of peek()?",
          answer:
            "peek() is typically O(1) because the highest-priority element is maintained at the head."
        },
        {
          question: "What is the difference between PriorityQueue and TreeSet?",
          answer:
            "PriorityQueue is designed for priority-based processing and allows duplicates. TreeSet maintains a sorted set of unique elements."
        },
        {
          question: "What is the difference between PriorityQueue and ArrayDeque?",
          answer:
            "PriorityQueue processes elements according to priority, while ArrayDeque is designed for efficient operations at both ends and can be used as a FIFO queue or LIFO stack."
        },
        {
          question: "How do you process a PriorityQueue in priority order?",
          answer:
            "Repeatedly call poll() until the queue becomes empty."
        }
      ]
    }
  ]
};