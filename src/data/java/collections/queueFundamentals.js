export const queueFundamentals = {
  id: "queue-fundamentals",
  slug: "queue-fundamentals",
  title: "Queue Fundamentals in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Queue fundamentals in Java including FIFO behavior, Queue interface, core methods, add, offer, remove, poll, element, peek, iteration, null handling, exceptions, LinkedList as Queue, ArrayDeque as Queue, performance, common mistakes, best practices, and interview questions.",
  estimatedTime: "70 min",

  sections: [
    {
      id: "what-is-queue",
      title: "1. What is a Queue?",
      paragraphs: [
        "A Queue is a data structure used to store elements in a specific processing order.",
        "A traditional queue follows the FIFO principle, which means First In, First Out.",
        "The element inserted first is normally the element removed first.",
        "Java provides the Queue interface in the java.util package."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.add("A");
queue.add("B");
queue.add("C");

System.out.println(queue.poll());`
      },
      output: "A"
    },

    {
      id: "fifo-principle",
      title: "2. FIFO Principle",
      paragraphs: [
        "FIFO stands for First In, First Out.",
        "The first element entering the queue is the first element that leaves the queue.",
        "This behavior is similar to people standing in a line."
      ],
      code: {
        language: "text",
        code: `Insert:
A → B → C

Remove:
A

Remaining:
B → C`
      },
      output: "A is removed first because A entered the queue first."
    },

    {
      id: "real-world-examples",
      title: "3. Real-World Examples of Queue",
      paragraphs: [
        "Queues are common in real-world systems where requests need to be processed in an ordered manner.",
        "Examples include printer jobs, customer service lines, task scheduling, message processing, and web request processing.",
        "A queue can also be used when one component produces tasks and another component processes them."
      ],
      bullets: [
        "Printer job processing",
        "Customer service systems",
        "Task scheduling",
        "Message processing",
        "Request processing",
        "Breadth-first search"
      ]
    },

    {
      id: "queue-interface",
      title: "4. Queue Interface in Java",
      paragraphs: [
        "Queue is an interface in the Java Collections Framework.",
        "It extends the Collection interface.",
        "Queue defines operations for inserting, removing, and examining elements at the head of the queue."
      ],
      code: {
        language: "java",
        code: `import java.util.Queue;
import java.util.LinkedList;

Queue<Integer> queue = new LinkedList<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);`
      }
    },

    {
      id: "queue-hierarchy",
      title: "5. Queue Hierarchy",
      paragraphs: [
        "Queue extends Collection.",
        "Several classes implement Queue-related behavior, including LinkedList and PriorityQueue.",
        "ArrayDeque implements Deque, and Deque extends Queue."
      ],
      code: {
        language: "text",
        code: `Iterable
   ↓
Collection
   ↓
Queue
   ↓
Deque

Examples:
LinkedList
PriorityQueue
ArrayDeque (through Deque)`
      }
    },

    {
      id: "queue-vs-collection",
      title: "6. Queue vs Collection",
      paragraphs: [
        "Collection is a general interface for groups of objects.",
        "Queue is more specialized because it represents elements waiting to be processed.",
        "Queue adds operations specifically for inserting, removing, and examining the head element."
      ],
      bullets: [
        "Collection provides general collection operations.",
        "Queue provides queue-specific operations.",
        "Queue normally represents an ordered processing structure."
      ]
    },

    {
      id: "creating-queue",
      title: "7. Creating a Queue",
      paragraphs: [
        "Because Queue is an interface, we cannot directly create an object using new Queue<>().",
        "We need to use a concrete implementation such as LinkedList or another Queue implementation."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.add("Java");
queue.add("Spring");
queue.add("React");

System.out.println(queue);`
      },
      output: "[Java, Spring, React]"
    },

    {
      id: "add-method",
      title: "8. add() Method",
      paragraphs: [
        "The add() method inserts an element into the queue.",
        "If the queue cannot accept the element, add() may throw an exception.",
        "For queues with capacity restrictions, offer() is often preferred when you want failure to be represented by a return value."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

queue.add(10);
queue.add(20);
queue.add(30);

System.out.println(queue);`
      },
      output: "[10, 20, 30]"
    },

    {
      id: "offer-method",
      title: "9. offer() Method",
      paragraphs: [
        "The offer() method attempts to insert an element into the queue.",
        "It returns true when the element is accepted and false when it cannot be inserted.",
        "This behavior is especially useful with bounded queues."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

boolean result = queue.offer(10);

System.out.println(result);
System.out.println(queue);`
      },
      output: `true
[10]`
    },

    {
      id: "add-vs-offer",
      title: "10. add() vs offer()",
      paragraphs: [
        "Both add() and offer() are used to insert elements.",
        "The important difference is how failure is handled.",
        "add() throws an exception if the element cannot be added, while offer() returns false."
      ],
      code: {
        language: "text",
        code: `add(element)
    ↓
successful → true
failure → exception

offer(element)
    ↓
successful → true
failure → false`
      },
      bullets: [
        "Use add() when failure should be represented by an exception.",
        "Use offer() when you prefer a boolean result.",
        "For bounded queues, offer() is commonly useful."
      ]
    },

    {
      id: "remove-method",
      title: "11. remove() Method",
      paragraphs: [
        "The remove() method removes and returns the head element of the queue.",
        "If the queue is empty, remove() throws NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.add("A");
queue.add("B");

String value = queue.remove();

System.out.println(value);
System.out.println(queue);`
      },
      output: `A
[B]`
    },

    {
      id: "poll-method",
      title: "12. poll() Method",
      paragraphs: [
        "The poll() method removes and returns the head element.",
        "Unlike remove(), poll() returns null when the queue is empty instead of throwing NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer("A");
queue.offer("B");

System.out.println(queue.poll());
System.out.println(queue.poll());
System.out.println(queue.poll());`
      },
      output: `A
B
null`
    },

    {
      id: "remove-vs-poll",
      title: "13. remove() vs poll()",
      paragraphs: [
        "Both methods remove the head element.",
        "The difference is their behavior when the queue is empty."
      ],
      code: {
        language: "text",
        code: `remove()
empty queue → NoSuchElementException

poll()
empty queue → null`
      },
      bullets: [
        "remove() is useful when an empty queue represents an exceptional situation.",
        "poll() is useful when an empty queue is an expected condition."
      ]
    },

    {
      id: "element-method",
      title: "14. element() Method",
      paragraphs: [
        "The element() method retrieves the head element without removing it.",
        "If the queue is empty, it throws NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

queue.offer(10);
queue.offer(20);

System.out.println(queue.element());
System.out.println(queue);`
      },
      output: `10
[10, 20]`
    },

    {
      id: "peek-method",
      title: "15. peek() Method",
      paragraphs: [
        "The peek() method retrieves the head element without removing it.",
        "If the queue is empty, peek() returns null."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

queue.offer(10);

System.out.println(queue.peek());
System.out.println(queue);`
      },
      output: `10
[10]`
    },

    {
      id: "element-vs-peek",
      title: "16. element() vs peek()",
      paragraphs: [
        "Both methods examine the head element without removing it.",
        "Their difference is what happens when the queue is empty."
      ],
      code: {
        language: "text",
        code: `element()
empty queue → NoSuchElementException

peek()
empty queue → null`
      }
    },

    {
      id: "queue-method-summary",
      title: "17. Queue Method Summary",
      paragraphs: [
        "The Queue interface provides paired methods for insertion, removal, and examination."
      ],
      code: {
        language: "text",
        code: `Operation       Exception form      Special-value form

Insert          add(e)              offer(e)

Remove head     remove()            poll()

Examine head    element()           peek()`
      }
    },

    {
      id: "queue-empty-check",
      title: "18. Checking Whether a Queue is Empty",
      paragraphs: [
        "The isEmpty() method checks whether the queue contains any elements.",
        "It is commonly used before processing a queue."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

if (queue.isEmpty()) {
    System.out.println("Queue is empty");
}

queue.offer("Java");

if (!queue.isEmpty()) {
    System.out.println("Queue contains elements");
}`
      },
      output: `Queue is empty
Queue contains elements`
    },

    {
      id: "queue-size",
      title: "19. size() Method",
      paragraphs: [
        "The size() method returns the number of elements currently present in the queue."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer("A");
queue.offer("B");
queue.offer("C");

System.out.println(queue.size());`
      },
      output: "3"
    },

    {
      id: "queue-iteration",
      title: "20. Iterating Through a Queue",
      paragraphs: [
        "A queue can be traversed using an enhanced for loop.",
        "Iteration does not remove elements from the queue."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer("Java");
queue.offer("Spring");
queue.offer("React");

for (String item : queue) {
    System.out.println(item);
}

System.out.println(queue);`
      },
      output: `Java
Spring
React
[Java, Spring, React]`
    },

    {
      id: "iterator",
      title: "21. Using Iterator with Queue",
      paragraphs: [
        "Iterator can be used when you need explicit traversal control.",
        "Iterator also provides a remove() operation that can remove the last element returned by that iterator."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);

Iterator<Integer> iterator = queue.iterator();

while (iterator.hasNext()) {
    Integer value = iterator.next();
    System.out.println(value);
}`
      },
      output: `10
20
30`
    },

    {
      id: "queue-processing-loop",
      title: "22. Processing a Queue Until Empty",
      paragraphs: [
        "A common queue pattern is repeatedly polling elements until the queue becomes empty.",
        "This is useful for task processing and breadth-first traversal."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer("Task 1");
queue.offer("Task 2");
queue.offer("Task 3");

while (!queue.isEmpty()) {
    String task = queue.poll();
    System.out.println("Processing: " + task);
}`
      },
      output: `Processing: Task 1
Processing: Task 2
Processing: Task 3`
    },

    {
      id: "linkedlist-as-queue",
      title: "23. LinkedList as a Queue",
      paragraphs: [
        "LinkedList implements the Queue interface, so it can be used as a queue.",
        "It supports insertion and removal at both ends and therefore also implements Deque.",
        "This makes LinkedList useful for demonstrating queue operations, although it is not always the best choice for every queue workload."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new LinkedList<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);

System.out.println(queue.poll());`
      },
      output: "10"
    },

    {
      id: "arraydeque-as-queue",
      title: "24. ArrayDeque as a Queue",
      paragraphs: [
        "ArrayDeque implements Deque and therefore can also be used through the Queue interface.",
        "For many ordinary in-memory FIFO workloads, ArrayDeque is a strong general-purpose choice.",
        "ArrayDeque does not permit null elements."
      ],
      code: {
        language: "java",
        code: `Queue<Integer> queue = new ArrayDeque<>();

queue.offer(10);
queue.offer(20);
queue.offer(30);

System.out.println(queue.poll());`
      },
      output: "10"
    },

    {
      id: "queue-null",
      title: "25. Null Elements in Queue",
      paragraphs: [
        "Whether a Queue allows null depends on its implementation.",
        "LinkedList permits null elements.",
        "ArrayDeque does not permit null elements.",
        "Because poll() and peek() use null to indicate an empty queue, implementations that allow null require extra care when interpreting results."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer(null);

System.out.println(queue.peek());
System.out.println(queue.size());`
      },
      output: `null
1`
    },

    {
      id: "queue-duplicates",
      title: "26. Duplicate Elements in Queue",
      paragraphs: [
        "A normal Queue does not automatically remove duplicate values.",
        "The same value can appear multiple times."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new LinkedList<>();

queue.offer("Java");
queue.offer("Java");
queue.offer("Spring");

System.out.println(queue);`
      },
      output: "[Java, Java, Spring]"
    },

    {
      id: "queue-complexity",
      title: "27. Queue Performance and Complexity",
      paragraphs: [
        "The exact complexity depends on the implementation.",
        "For common queue implementations such as LinkedList and ArrayDeque, operations at the ends are generally constant time.",
        "PriorityQueue has different complexity because it maintains a priority heap."
      ],
      code: {
        language: "text",
        code: `Typical Queue operations:

offer()   → O(1) for common deque-based implementations
poll()    → O(1) for common deque-based implementations
peek()    → O(1)
size()    → O(1)

contains() → O(n)

Note:
Exact performance depends on the implementation.`
      }
    },

    {
      id: "queue-vs-stack",
      title: "28. Queue vs Stack",
      paragraphs: [
        "Queue and Stack represent different processing orders.",
        "A Queue normally follows FIFO, while a Stack follows LIFO.",
        "In modern Java, Deque and ArrayDeque can support both queue-style and stack-style operations."
      ],
      code: {
        language: "text",
        code: `Queue → FIFO

A → B → C
remove → A

Stack → LIFO

A → B → C
remove → C`
      }
    },

    {
      id: "common-mistakes",
      title: "29. Common Mistakes and Best Practices",
      paragraphs: [
        "Queue operations look simple, but several mistakes are common in interviews and production code."
      ],
      bullets: [
        "Do not instantiate Queue directly because Queue is an interface.",
        "Understand the difference between add() and offer().",
        "Understand the difference between remove() and poll().",
        "Understand the difference between element() and peek().",
        "Do not assume every Queue implementation allows null.",
        "Do not assume every Queue has the same performance characteristics.",
        "Use Queue as the declared type when queue behavior is what your code needs.",
        "Consider ArrayDeque for many ordinary FIFO workloads.",
        "Use PriorityQueue when processing order is based on priority rather than simple FIFO.",
        "Use a concurrent queue implementation when multiple threads require safe concurrent access."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "Queue is an interface in the Java Collections Framework and normally represents FIFO processing.",
        "The most important interview topic is understanding the paired Queue methods and their empty-queue behavior."
      ],
      bullets: [
        "Queue extends Collection.",
        "FIFO means First In, First Out.",
        "add() inserts and may throw an exception when insertion fails.",
        "offer() inserts and returns false when insertion fails.",
        "remove() removes the head and throws when empty.",
        "poll() removes the head and returns null when empty.",
        "element() examines the head and throws when empty.",
        "peek() examines the head and returns null when empty.",
        "LinkedList and ArrayDeque can be used as FIFO queues.",
        "PriorityQueue processes elements according to priority rather than ordinary FIFO order."
      ],
      interviewQuestions: [
        {
          question: "What is a Queue in Java?",
          answer:
            "Queue is an interface in the Java Collections Framework used to represent elements waiting to be processed. A traditional queue follows FIFO, or First In, First Out."
        },
        {
          question: "What is FIFO?",
          answer:
            "FIFO means First In, First Out. The element inserted first is normally removed first."
        },
        {
          question: "Can we create an object of Queue directly?",
          answer:
            "No. Queue is an interface, so we need a concrete implementation such as LinkedList or another Queue implementation."
        },
        {
          question: "What is the difference between add() and offer()?",
          answer:
            "Both attempt to insert an element. add() may throw an exception when insertion fails, while offer() returns false when the element cannot be accepted."
        },
        {
          question: "What is the difference between remove() and poll()?",
          answer:
            "Both remove the head element. remove() throws NoSuchElementException when the queue is empty, while poll() returns null."
        },
        {
          question: "What is the difference between element() and peek()?",
          answer:
            "Both examine the head without removing it. element() throws NoSuchElementException when empty, while peek() returns null."
        },
        {
          question: "Does Queue allow duplicate elements?",
          answer:
            "A normal Queue does allow duplicate elements unless its specific implementation imposes different restrictions."
        },
        {
          question: "Does every Queue implementation allow null?",
          answer:
            "No. Null support depends on the implementation. LinkedList permits null, while ArrayDeque does not."
        },
        {
          question: "Can LinkedList be used as a Queue?",
          answer:
            "Yes. LinkedList implements Queue and Deque, so it can provide FIFO queue operations."
        },
        {
          question: "Can ArrayDeque be used as a Queue?",
          answer:
            "Yes. ArrayDeque implements Deque, which extends Queue, so it can be used for FIFO queue operations."
        },
        {
          question: "What is the difference between Queue and Stack?",
          answer:
            "A traditional Queue follows FIFO, while a Stack follows LIFO. Queue removes the oldest element first, whereas Stack removes the most recently added element first."
        },
        {
          question: "When would you use PriorityQueue instead of a normal Queue?",
          answer:
            "Use PriorityQueue when elements should be processed according to priority rather than simply according to insertion order."
        },
        {
          question: "What is the common complexity of peek()?",
          answer:
            "For common queue implementations such as LinkedList and ArrayDeque, peek() is generally O(1)."
        },
        {
          question: "What happens when poll() is called on an empty queue?",
          answer:
            "poll() returns null."
        },
        {
          question: "What happens when remove() is called on an empty queue?",
          answer:
            "remove() throws NoSuchElementException."
        }
      ]
    }
  ]
};