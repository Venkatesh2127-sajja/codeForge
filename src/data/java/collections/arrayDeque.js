export const arrayDeque = {
  id: "array-deque",
  slug: "array-deque",
  title: "ArrayDeque in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn ArrayDeque in Java from double-ended queue fundamentals to internal circular-array concepts, insertion and removal from both ends, Queue usage, Stack usage, push, pop, offer, poll, null restrictions, resizing, performance, comparisons with LinkedList and Stack, common mistakes, best practices, and interview questions.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-arraydeque",
      title: "1. What is ArrayDeque?",
      paragraphs: [
        "ArrayDeque is a resizable-array implementation of the Deque interface in Java.",
        "It allows elements to be inserted and removed efficiently from both ends.",
        "Because it implements Deque, ArrayDeque can be used as both a FIFO Queue and a LIFO Stack."
      ],
      code: {
        language: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);
deque.addLast(20);
deque.addLast(30);

System.out.println(deque);`
      },
      output: "[10, 20, 30]"
    },

    {
      id: "arraydeque-hierarchy",
      title: "2. ArrayDeque Hierarchy",
      paragraphs: [
        "ArrayDeque implements the Deque interface.",
        "Deque extends Queue, and Queue extends Collection."
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
   ↓
ArrayDeque`
      }
    },

    {
      id: "creating-arraydeque",
      title: "3. Creating ArrayDeque",
      paragraphs: [
        "ArrayDeque can be created using its no-argument constructor.",
        "It can also be created with an initial capacity hint.",
        "The structure can grow as elements are added."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque1 = new ArrayDeque<>();

Deque<String> deque2 =
        new ArrayDeque<>(20);

deque1.add("Java");
deque1.add("Spring");

System.out.println(deque1);`
      },
      output: "[Java, Spring]"
    },

    {
      id: "generic-arraydeque",
      title: "4. Generics with ArrayDeque",
      paragraphs: [
        "Generics provide compile-time type safety when using ArrayDeque.",
        "The declared type determines which kind of objects can be inserted."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> numbers = new ArrayDeque<>();

numbers.add(10);
numbers.add(20);

// numbers.add("Java"); // Compile-time error`
      }
    },

    {
      id: "addfirst",
      title: "5. addFirst()",
      paragraphs: [
        "addFirst() inserts an element at the front of the deque."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(20);
deque.addLast(30);

deque.addFirst(10);

System.out.println(deque);`
      },
      output: "[10, 20, 30]"
    },

    {
      id: "addlast",
      title: "6. addLast()",
      paragraphs: [
        "addLast() inserts an element at the rear of the deque.",
        "This method is commonly used when treating ArrayDeque as a FIFO queue."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);
deque.addLast(20);
deque.addLast(30);

System.out.println(deque);`
      },
      output: "[10, 20, 30]"
    },

    {
      id: "offerfirst-offerlast",
      title: "7. offerFirst() and offerLast()",
      paragraphs: [
        "offerFirst() attempts to insert an element at the front.",
        "offerLast() attempts to insert an element at the rear.",
        "Both return true when the element is accepted."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

System.out.println(deque.offerFirst(20));
System.out.println(deque.offerLast(30));
System.out.println(deque.offerFirst(10));

System.out.println(deque);`
      },
      output: `true
true
true
[10, 20, 30]`
    },

    {
      id: "remove-first-last",
      title: "8. removeFirst() and removeLast()",
      paragraphs: [
        "removeFirst() removes and returns the first element.",
        "removeLast() removes and returns the last element.",
        "Both throw NoSuchElementException when the deque is empty."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);
deque.addLast(20);
deque.addLast(30);

System.out.println(deque.removeFirst());
System.out.println(deque.removeLast());
System.out.println(deque);`
      },
      output: `10
30
[20]`
    },

    {
      id: "poll-first-last",
      title: "9. pollFirst() and pollLast()",
      paragraphs: [
        "pollFirst() removes and returns the first element.",
        "pollLast() removes and returns the last element.",
        "Unlike removeFirst() and removeLast(), they return null when the deque is empty."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);

System.out.println(deque.pollFirst());
System.out.println(deque.pollLast());
System.out.println(deque.pollFirst());`
      },
      output: `10
null
null`
    },

    {
      id: "peek-first-last",
      title: "10. peekFirst() and peekLast()",
      paragraphs: [
        "peekFirst() retrieves the first element without removing it.",
        "peekLast() retrieves the last element without removing it.",
        "Both return null when the deque is empty."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("Java");
deque.addLast("Spring");
deque.addLast("React");

System.out.println(deque.peekFirst());
System.out.println(deque.peekLast());
System.out.println(deque);`
      },
      output: `Java
React
[Java, Spring, React]`
    },

    {
      id: "arraydeque-as-queue",
      title: "11. ArrayDeque as a Queue",
      paragraphs: [
        "ArrayDeque can be used as a FIFO Queue.",
        "Insert elements at the rear and remove them from the front."
      ],
      code: {
        language: "java",
        code: `Queue<String> queue = new ArrayDeque<>();

queue.offer("Task 1");
queue.offer("Task 2");
queue.offer("Task 3");

while (!queue.isEmpty()) {
    System.out.println(queue.poll());
}`
      },
      output: `Task 1
Task 2
Task 3`
    },

    {
      id: "arraydeque-as-stack",
      title: "12. ArrayDeque as a Stack",
      paragraphs: [
        "ArrayDeque can also be used as a LIFO Stack.",
        "push() inserts at the front and pop() removes from the front."
      ],
      code: {
        language: "java",
        code: `Deque<String> stack = new ArrayDeque<>();

stack.push("A");
stack.push("B");
stack.push("C");

System.out.println(stack.pop());
System.out.println(stack);`
      },
      output: `C
[B, A]`
    },

    {
      id: "push-method",
      title: "13. push() Method",
      paragraphs: [
        "push() inserts an element at the front of the ArrayDeque.",
        "It is equivalent to addFirst() for Deque behavior."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack);`
      },
      output: "[30, 20, 10]"
    },

    {
      id: "pop-method",
      title: "14. pop() Method",
      paragraphs: [
        "pop() removes and returns the first element.",
        "It is equivalent to removeFirst() for Deque behavior.",
        "If the deque is empty, pop() throws NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.pop());
System.out.println(stack);`
      },
      output: `30
[20, 10]`
    },

    {
      id: "arraydeque-null",
      title: "15. Why ArrayDeque Does Not Allow null",
      paragraphs: [
        "ArrayDeque does not permit null elements.",
        "This makes null available to represent an empty result for operations such as poll() and peek().",
        "Attempting to insert null results in NullPointerException."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

// deque.add(null);
// NullPointerException`
      },
      bullets: [
        "add(null) is not allowed.",
        "offer(null) is not allowed.",
        "peek() can return null because null is used to represent an empty result."
      ]
    },

    {
      id: "duplicates",
      title: "16. Duplicate Elements",
      paragraphs: [
        "ArrayDeque does not enforce uniqueness.",
        "The same value can be stored multiple times."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("Java");
deque.addLast("Java");
deque.addLast("Spring");

System.out.println(deque);`
      },
      output: "[Java, Java, Spring]"
    },

    {
      id: "size-empty",
      title: "17. size() and isEmpty()",
      paragraphs: [
        "size() returns the number of elements in the deque.",
        "isEmpty() returns true when there are no elements."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.add(10);
deque.add(20);

System.out.println(deque.size());
System.out.println(deque.isEmpty());

deque.clear();

System.out.println(deque.isEmpty());`
      },
      output: `2
false
true`
    },

    {
      id: "contains",
      title: "18. contains()",
      paragraphs: [
        "contains() checks whether an element is present in the ArrayDeque.",
        "It searches for an element using equality."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.add("Java");
deque.add("Spring");

System.out.println(deque.contains("Java"));
System.out.println(deque.contains("Python"));`
      },
      output: `true
false`
    },

    {
      id: "iteration",
      title: "19. Iterating ArrayDeque",
      paragraphs: [
        "ArrayDeque can be traversed using an enhanced for loop.",
        "The normal iterator traverses from the front toward the rear."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("A");
deque.addLast("B");
deque.addLast("C");

for (String value : deque) {
    System.out.println(value);
}`
      },
      output: `A
B
C`
    },

    {
      id: "descending-iterator",
      title: "20. Descending Iterator",
      paragraphs: [
        "ArrayDeque provides descendingIterator(), which traverses from the rear toward the front."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("A");
deque.addLast("B");
deque.addLast("C");

Iterator<String> iterator =
        deque.descendingIterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}`
      },
      output: `C
B
A`
    },

    {
      id: "internal-circular-array",
      title: "21. Internal Working: Circular Array Concept",
      paragraphs: [
        "ArrayDeque is based on a resizable array structure.",
        "Conceptually, the front and rear can wrap around the end of the underlying array, allowing unused positions to be reused.",
        "This is commonly described as a circular array or circular buffer design.",
        "The exact internal implementation details are implementation-specific and may change between Java versions."
      ],
      code: {
        language: "text",
        code: `Conceptual circular buffer:

        ┌───────┐
        ↓       │
[A] [B] [C] [ ] [ ]
 ↑               │
 └───────────────┘

Front and rear can wrap
around the array.`
      }
    },

    {
      id: "front-rear",
      title: "22. Front and Rear Management",
      paragraphs: [
        "A deque needs to keep track of both ends so that insertion and removal can occur efficiently.",
        "When elements are added at either end, the logical front or rear position changes.",
        "When an end reaches the physical boundary of the array, the circular representation can wrap around."
      ],
      code: {
        language: "text",
        code: `Front
  ↓
[10] [20] [30] [40]
                   ↑
                  Rear

AddFirst:
new element becomes front

AddLast:
new element becomes rear`
      }
    },

    {
      id: "resizing",
      title: "23. Dynamic Resizing",
      paragraphs: [
        "ArrayDeque is resizable, so it can grow when the current storage is insufficient.",
        "When resizing occurs, the implementation reorganizes its internal storage while preserving the logical deque order.",
        "The exact growth strategy is an implementation detail and should not be hard-coded into application assumptions."
      ],
      code: {
        language: "text",
        code: `Small internal storage
        ↓
Deque becomes full
        ↓
Resize
        ↓
Elements reorganized
        ↓
Continue adding elements`
      }
    },

    {
      id: "time-complexity",
      title: "24. ArrayDeque Time Complexity",
      paragraphs: [
        "ArrayDeque is designed for efficient operations at both ends.",
        "End insertion and removal operations are typically constant time, with insertion described as amortized O(1) because resizing can occasionally occur."
      ],
      code: {
        language: "text",
        code: `Operation             Typical Complexity

addFirst()             O(1) amortized
addLast()              O(1) amortized

offerFirst()           O(1) amortized
offerLast()            O(1) amortized

removeFirst()          O(1)
removeLast()           O(1)

pollFirst()            O(1)
pollLast()             O(1)

peekFirst()            O(1)
peekLast()             O(1)

contains()             O(n)

clear()                O(n)`
      }
    },

    {
      id: "arraydeque-vs-linkedlist",
      title: "25. ArrayDeque vs LinkedList",
      paragraphs: [
        "Both ArrayDeque and LinkedList implement Deque and can support operations at both ends.",
        "ArrayDeque uses an array-based structure, while LinkedList uses linked nodes.",
        "ArrayDeque generally has lower per-element memory overhead because it does not need a separate node object for every element."
      ],
      code: {
        language: "text",
        code: `ArrayDeque
→ array-based deque
→ no null elements
→ efficient end operations
→ generally lower node overhead

LinkedList
→ linked-node structure
→ allows null
→ implements List and Deque
→ additional node/reference overhead`
      }
    },

    {
      id: "arraydeque-vs-stack",
      title: "26. ArrayDeque vs Stack",
      paragraphs: [
        "Stack is a legacy class that extends Vector.",
        "ArrayDeque implements Deque and provides stack operations such as push(), pop(), and peek().",
        "For ordinary single-threaded stack usage, ArrayDeque is generally preferred over the legacy Stack class."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> stack =
        new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.pop());`
      },
      output: "30"
    },

    {
      id: "arraydeque-vs-priorityqueue",
      title: "27. ArrayDeque vs PriorityQueue",
      paragraphs: [
        "ArrayDeque and PriorityQueue solve different problems.",
        "ArrayDeque processes elements from its ends according to the operations you choose.",
        "PriorityQueue processes the head according to its priority ordering."
      ],
      code: {
        language: "text",
        code: `ArrayDeque
→ FIFO Queue
→ LIFO Stack
→ Double-ended operations

PriorityQueue
→ Priority-based processing
→ Heap-based ordering
→ Head determined by priority`
      }
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "Several ArrayDeque details are frequently misunderstood."
      ],
      bullets: [
        "Do not insert null into ArrayDeque.",
        "Do not confuse ArrayDeque with PriorityQueue.",
        "Do not assume ArrayDeque maintains sorted order.",
        "Do not use ArrayDeque when you specifically need arbitrary index-based access.",
        "Do not assume ArrayDeque is synchronized.",
        "Do not rely on exact internal capacity or growth details.",
        "Remember that push() inserts at the front.",
        "Remember that pop() removes from the front.",
        "Use poll() or pollFirst() when an empty deque should produce null.",
        "Use remove() or removeFirst() when an empty deque should be treated as an exceptional condition."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "ArrayDeque is a strong general-purpose choice for many in-memory queue and stack use cases."
      ],
      bullets: [
        "Declare variables using the Deque interface.",
        "Use ArrayDeque for ordinary FIFO queue workloads.",
        "Use ArrayDeque for ordinary LIFO stack workloads.",
        "Use addLast() + pollFirst() for explicit FIFO semantics.",
        "Use push() + pop() for explicit Stack semantics.",
        "Use addFirst() and removeLast() when processing from the opposite ends is required.",
        "Avoid null elements.",
        "Use a concurrent collection when multiple threads require concurrent access.",
        "Use PriorityQueue when priority determines processing order.",
        "Use ArrayDeque when efficient operations at both ends are the primary requirement."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "ArrayDeque is one of the most useful implementations of the Deque interface in modern Java.",
        "It can act as both a Queue and a Stack while providing efficient operations at both ends."
      ],
      bullets: [
        "ArrayDeque implements Deque.",
        "Deque extends Queue.",
        "ArrayDeque is backed by a resizable array structure.",
        "It supports insertion and removal from both ends.",
        "ArrayDeque does not permit null elements.",
        "Duplicate elements are allowed.",
        "It can be used as a FIFO Queue.",
        "It can be used as a LIFO Stack.",
        "push() inserts at the front.",
        "pop() removes from the front.",
        "peek() examines the front without removing.",
        "End operations are typically O(1) amortized.",
        "contains() is typically O(n).",
        "ArrayDeque is not synchronized by default.",
        "ArrayDeque is commonly preferred over the legacy Stack class for ordinary stack usage."
      ],
      interviewQuestions: [
        {
          question: "What is ArrayDeque in Java?",
          answer:
            "ArrayDeque is a resizable-array implementation of the Deque interface that supports insertion and removal from both ends."
        },
        {
          question: "What is the relationship between ArrayDeque and Deque?",
          answer:
            "ArrayDeque implements the Deque interface. Deque extends Queue, so ArrayDeque can also be used as a Queue."
        },
        {
          question: "Can ArrayDeque be used as a Queue?",
          answer:
            "Yes. Use operations such as offerLast() and pollFirst() to implement FIFO behavior."
        },
        {
          question: "Can ArrayDeque be used as a Stack?",
          answer:
            "Yes. Use push() and pop() to implement LIFO behavior."
        },
        {
          question: "Does ArrayDeque allow null?",
          answer:
            "No. ArrayDeque does not permit null elements."
        },
        {
          question: "Does ArrayDeque allow duplicate elements?",
          answer:
            "Yes. ArrayDeque allows duplicate elements."
        },
        {
          question: "What is the internal data structure of ArrayDeque?",
          answer:
            "It uses a resizable array-based deque structure. Conceptually, it uses circular-buffer behavior so both ends can be managed efficiently."
        },
        {
          question: "What is the time complexity of addFirst()?",
          answer:
            "For ArrayDeque, addFirst() is typically O(1) amortized."
        },
        {
          question: "What is the time complexity of addLast()?",
          answer:
            "For ArrayDeque, addLast() is typically O(1) amortized."
        },
        {
          question: "What is the time complexity of pollFirst()?",
          answer:
            "pollFirst() is typically O(1)."
        },
        {
          question: "What is the time complexity of contains()?",
          answer:
            "contains() is typically O(n) because ArrayDeque may need to examine multiple elements."
        },
        {
          question: "Why is ArrayDeque preferred over Stack?",
          answer:
            "Stack is a legacy Vector-based class, while ArrayDeque provides the modern Deque API and efficient stack operations for ordinary non-concurrent usage."
        },
        {
          question: "ArrayDeque vs LinkedList?",
          answer:
            "Both implement Deque. ArrayDeque uses an array-based structure and generally avoids per-element node overhead, while LinkedList uses linked nodes and also implements List."
        },
        {
          question: "ArrayDeque vs PriorityQueue?",
          answer:
            "ArrayDeque provides efficient operations at both ends and can act as a Queue or Stack. PriorityQueue processes elements according to a priority ordering."
        },
        {
          question: "Why is ArrayDeque not synchronized?",
          answer:
            "ArrayDeque is designed as a general-purpose non-thread-safe collection. If multiple threads need coordinated concurrent access, an appropriate concurrent collection or synchronization strategy should be used."
        }
      ]
    }
  ]
};