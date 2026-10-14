export const dequeFundamentals = {
  id: "deque-fundamentals",
  slug: "deque-fundamentals",
  title: "Deque Fundamentals in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Deque fundamentals in Java including double-ended queue behavior, Queue and Deque hierarchy, insertion and removal from both ends, addFirst, addLast, offerFirst, offerLast, removeFirst, removeLast, pollFirst, pollLast, peekFirst, peekLast, iteration, stack behavior, queue behavior, LinkedList, ArrayDeque, performance, common mistakes, best practices, and interview questions.",
  estimatedTime: "75 min",

  sections: [
    {
      id: "what-is-deque",
      title: "1. What is a Deque?",
      paragraphs: [
        "Deque stands for Double Ended Queue.",
        "A Deque allows elements to be inserted and removed from both the front and the rear.",
        "Because operations are supported at both ends, a Deque can be used as both a Queue and a Stack."
      ],
      code: {
        language: "text",
        code: `        Front                 Rear
          ↓                     ↓

        [10] → [20] → [30] → [40]

addFirst()                  addLast()
removeFirst()               removeLast()`
      }
    },

    {
      id: "deque-fifo",
      title: "2. Deque as a FIFO Queue",
      paragraphs: [
        "A Deque can behave like a normal FIFO Queue when elements are inserted at the rear and removed from the front.",
        "This gives First In, First Out behavior."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);
deque.addLast(20);
deque.addLast(30);

System.out.println(deque.removeFirst());`
      },
      output: "10"
    },

    {
      id: "deque-lifo",
      title: "3. Deque as a LIFO Stack",
      paragraphs: [
        "A Deque can also behave like a Stack by inserting and removing elements from the same end.",
        "This produces Last In, First Out behavior."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

System.out.println(stack.pop());`
      },
      output: "30"
    },

    {
      id: "deque-interface",
      title: "4. Deque Interface in Java",
      paragraphs: [
        "Deque is an interface in the Java Collections Framework.",
        "It extends Queue.",
        "Therefore, a Deque supports the operations of a Queue and adds operations for both ends."
      ],
      code: {
        language: "text",
        code: `Iterable
   ↓
Collection
   ↓
Queue
   ↓
Deque`
      }
    },

    {
      id: "deque-hierarchy",
      title: "5. Deque Hierarchy and Implementations",
      paragraphs: [
        "Common implementations of Deque include ArrayDeque and LinkedList.",
        "Both can be used when an application requires operations at both ends."
      ],
      code: {
        language: "text",
        code: `Deque
 ├── ArrayDeque
 └── LinkedList`
      },
      bullets: [
        "ArrayDeque uses an array-based deque structure.",
        "LinkedList uses a linked-node structure.",
        "Both implement the Deque interface."
      ]
    },

    {
      id: "creating-deque",
      title: "6. Creating a Deque",
      paragraphs: [
        "Deque is an interface, so we create an object using an implementation such as ArrayDeque or LinkedList.",
        "Using the interface as the reference type keeps the code flexible."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("Java");
deque.addLast("Spring");
deque.addLast("React");

System.out.println(deque);`
      },
      output: "[Java, Spring, React]"
    },

    {
      id: "addfirst",
      title: "7. addFirst()",
      paragraphs: [
        "addFirst() inserts an element at the front of the Deque.",
        "Existing elements are shifted logically toward the rear."
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
      title: "8. addLast()",
      paragraphs: [
        "addLast() inserts an element at the rear of the Deque.",
        "It is commonly used when treating the Deque as a FIFO Queue."
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
      id: "offerfirst",
      title: "9. offerFirst()",
      paragraphs: [
        "offerFirst() attempts to insert an element at the front.",
        "It returns true when the element is accepted and false when it cannot be inserted."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

boolean result = deque.offerFirst(10);

System.out.println(result);
System.out.println(deque);`
      },
      output: `true
[10]`
    },

    {
      id: "offerlast",
      title: "10. offerLast()",
      paragraphs: [
        "offerLast() attempts to insert an element at the rear.",
        "It returns true when the element is accepted and false when insertion cannot be performed."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.offerLast(10);
deque.offerLast(20);

System.out.println(deque);`
      },
      output: "[10, 20]"
    },

    {
      id: "removefirst",
      title: "11. removeFirst()",
      paragraphs: [
        "removeFirst() removes and returns the first element.",
        "If the Deque is empty, it throws NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("A");
deque.addLast("B");

System.out.println(deque.removeFirst());
System.out.println(deque);`
      },
      output: `A
[B]`
    },

    {
      id: "removelast",
      title: "12. removeLast()",
      paragraphs: [
        "removeLast() removes and returns the last element.",
        "If the Deque is empty, it throws NoSuchElementException."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("A");
deque.addLast("B");
deque.addLast("C");

System.out.println(deque.removeLast());
System.out.println(deque);`
      },
      output: `C
[A, B]`
    },

    {
      id: "pollfirst",
      title: "13. pollFirst()",
      paragraphs: [
        "pollFirst() removes and returns the first element.",
        "If the Deque is empty, it returns null instead of throwing an exception."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.offerLast(10);
deque.offerLast(20);

System.out.println(deque.pollFirst());
System.out.println(deque.pollFirst());
System.out.println(deque.pollFirst());`
      },
      output: `10
20
null`
    },

    {
      id: "polllast",
      title: "14. pollLast()",
      paragraphs: [
        "pollLast() removes and returns the last element.",
        "If the Deque is empty, it returns null."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.offerLast(10);
deque.offerLast(20);
deque.offerLast(30);

System.out.println(deque.pollLast());`
      },
      output: "30"
    },

    {
      id: "peekfirst",
      title: "15. peekFirst()",
      paragraphs: [
        "peekFirst() retrieves the first element without removing it.",
        "If the Deque is empty, it returns null."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("Java");
deque.addLast("Spring");

System.out.println(deque.peekFirst());
System.out.println(deque);`
      },
      output: `Java
[Java, Spring]`
    },

    {
      id: "peeklast",
      title: "16. peekLast()",
      paragraphs: [
        "peekLast() retrieves the last element without removing it.",
        "The element remains in the Deque."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

deque.addLast("Java");
deque.addLast("Spring");
deque.addLast("React");

System.out.println(deque.peekLast());
System.out.println(deque);`
      },
      output: `React
[Java, Spring, React]`
    },

    {
      id: "deque-method-pairs",
      title: "17. Deque Method Pairs",
      paragraphs: [
        "Deque provides paired methods for insertion, removal, and examination.",
        "The exception-oriented methods and special-value methods should be clearly understood for interviews."
      ],
      code: {
        language: "text",
        code: `Front insertion:
addFirst(e)       offerFirst(e)

Rear insertion:
addLast(e)        offerLast(e)

Front removal:
removeFirst()     pollFirst()

Rear removal:
removeLast()      pollLast()

Front examination:
getFirst()        peekFirst()

Rear examination:
getLast()         peekLast()`
      }
    },

    {
      id: "getfirst-getlast",
      title: "18. getFirst() and getLast()",
      paragraphs: [
        "getFirst() retrieves the first element without removing it.",
        "getLast() retrieves the last element without removing it.",
        "Both throw NoSuchElementException when the Deque is empty."
      ],
      code: {
        language: "java",
        code: `Deque<Integer> deque = new ArrayDeque<>();

deque.addLast(10);
deque.addLast(20);
deque.addLast(30);

System.out.println(deque.getFirst());
System.out.println(deque.getLast());`
      },
      output: `10
30`
    },

    {
      id: "push-pop",
      title: "19. push() and pop()",
      paragraphs: [
        "Deque provides push() and pop() methods for Stack-style behavior.",
        "push() inserts at the front, while pop() removes from the front.",
        "These methods allow a Deque to replace the legacy Stack class in many modern Java applications."
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
      id: "deque-as-queue",
      title: "20. Using Deque as a Queue",
      paragraphs: [
        "A Deque can provide FIFO behavior by inserting at the rear and removing from the front.",
        "This is one of the common ways to use ArrayDeque."
      ],
      code: {
        language: "java",
        code: `Deque<String> queue = new ArrayDeque<>();

queue.offerLast("A");
queue.offerLast("B");
queue.offerLast("C");

while (!queue.isEmpty()) {
    System.out.println(queue.pollFirst());
}`
      },
      output: `A
B
C`
    },

    {
      id: "deque-as-stack",
      title: "21. Using Deque as a Stack",
      paragraphs: [
        "A Deque can provide LIFO behavior by using the front as the stack top.",
        "push() adds to the front and pop() removes from the front."
      ],
      code: {
        language: "java",
        code: `Deque<String> stack = new ArrayDeque<>();

stack.push("A");
stack.push("B");
stack.push("C");

while (!stack.isEmpty()) {
    System.out.println(stack.pop());
}`
      },
      output: `C
B
A`
    },

    {
      id: "deque-iteration",
      title: "22. Iterating Through a Deque",
      paragraphs: [
        "A Deque can be traversed using an enhanced for loop.",
        "The normal iterator traverses from the first element toward the last element."
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
      title: "23. Descending Iterator",
      paragraphs: [
        "Deque also provides descendingIterator(), which traverses from the rear toward the front."
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
      id: "deque-null",
      title: "24. Null Elements in Deque",
      paragraphs: [
        "Null support depends on the implementation.",
        "ArrayDeque does not permit null elements.",
        "LinkedList permits null elements.",
        "Avoiding null is useful with APIs where null represents an empty result."
      ],
      code: {
        language: "java",
        code: `Deque<String> deque = new ArrayDeque<>();

// deque.add(null); // NullPointerException`
      },
      bullets: [
        "ArrayDeque rejects null.",
        "LinkedList permits null.",
        "Do not assume all Deque implementations have identical null behavior."
      ]
    },

    {
      id: "deque-duplicates",
      title: "25. Duplicate Elements in Deque",
      paragraphs: [
        "A Deque does not automatically enforce uniqueness.",
        "The same value can appear multiple times."
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
      id: "arraydeque-vs-linkedlist",
      title: "26. ArrayDeque vs LinkedList",
      paragraphs: [
        "Both ArrayDeque and LinkedList implement Deque.",
        "ArrayDeque uses an array-based deque structure, while LinkedList uses linked nodes.",
        "For many ordinary queue and stack workloads, ArrayDeque is generally preferred when its restrictions fit the use case."
      ],
      code: {
        language: "text",
        code: `ArrayDeque
→ array-based
→ efficient end operations
→ no null elements
→ no index-based List API

LinkedList
→ linked nodes
→ implements List and Deque
→ permits null
→ more node-related memory overhead`
      }
    },

    {
      id: "deque-complexity",
      title: "27. Deque Performance and Complexity",
      paragraphs: [
        "Deque implementations are optimized for operations at the ends.",
        "For ArrayDeque, insertion, removal, and examination at either end are typically constant-time operations.",
        "LinkedList also provides constant-time operations at its ends."
      ],
      code: {
        language: "text",
        code: `Common end operations:

addFirst()       → O(1) amortized
addLast()        → O(1) amortized
removeFirst()    → O(1)
removeLast()     → O(1)
peekFirst()      → O(1)
peekLast()       → O(1)

contains()       → O(n)

Exact behavior depends on implementation.`
      }
    },

    {
      id: "deque-use-cases",
      title: "28. Deque Use Cases",
      paragraphs: [
        "Deque is useful whenever an application needs efficient operations at both ends.",
        "It can also replace separate Queue and Stack structures in many algorithms."
      ],
      bullets: [
        "FIFO queue processing",
        "LIFO stack processing",
        "Sliding-window algorithms",
        "Palindrome checking",
        "Breadth-first search support",
        "Depth-first traversal support",
        "Undo/redo style structures",
        "Task processing from either end"
      ]
    },

    {
      id: "common-mistakes-best-practices",
      title: "29. Common Mistakes and Best Practices",
      paragraphs: [
        "Deque is flexible, but that flexibility can make code harder to understand if the chosen end semantics are not clear."
      ],
      bullets: [
        "Remember that Deque means Double Ended Queue.",
        "Use addLast() + removeFirst() for clear FIFO behavior.",
        "Use push() + pop() for clear Stack behavior.",
        "Understand the difference between add/remove methods and offer/poll methods.",
        "Do not assume ArrayDeque allows null.",
        "Do not confuse Deque with a sorted collection.",
        "Use the Deque interface as the declared type.",
        "Prefer ArrayDeque for many ordinary in-memory queue/stack workloads.",
        "Use LinkedList when its additional List/Deque behavior or null support is actually needed.",
        "Use concurrent deque implementations when multiple threads require safe concurrent access."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "Deque is an important Java Collections Framework interface because it supports insertion, removal, and examination from both ends.",
        "It can behave as either a FIFO Queue or a LIFO Stack."
      ],
      bullets: [
        "Deque means Double Ended Queue.",
        "Deque extends Queue.",
        "ArrayDeque and LinkedList implement Deque.",
        "addFirst() inserts at the front.",
        "addLast() inserts at the rear.",
        "removeFirst() removes from the front.",
        "removeLast() removes from the rear.",
        "pollFirst() and pollLast() return null when empty.",
        "getFirst() and getLast() throw when empty.",
        "peekFirst() and peekLast() return null when empty.",
        "push() and pop() provide Stack-style behavior.",
        "Deque can provide FIFO and LIFO behavior.",
        "ArrayDeque does not permit null.",
        "Deque allows duplicate elements.",
        "End operations are typically O(1) for common implementations."
      ],
      interviewQuestions: [
        {
          question: "What is a Deque in Java?",
          answer:
            "Deque stands for Double Ended Queue. It is an interface that allows insertion, removal, and examination of elements from both the front and rear."
        },
        {
          question: "Does Deque extend Queue?",
          answer:
            "Yes. Deque extends the Queue interface."
        },
        {
          question: "Which classes commonly implement Deque?",
          answer:
            "ArrayDeque and LinkedList are common implementations of Deque."
        },
        {
          question: "Can a Deque be used as a Queue?",
          answer:
            "Yes. Insert at the rear and remove from the front to obtain FIFO behavior."
        },
        {
          question: "Can a Deque be used as a Stack?",
          answer:
            "Yes. push() and pop() operate at the front and provide LIFO behavior."
        },
        {
          question: "What is the difference between addFirst() and addLast()?",
          answer:
            "addFirst() inserts an element at the front, while addLast() inserts it at the rear."
        },
        {
          question: "What is the difference between removeFirst() and removeLast()?",
          answer:
            "removeFirst() removes the front element, while removeLast() removes the rear element."
        },
        {
          question: "What is the difference between pollFirst() and removeFirst()?",
          answer:
            "Both remove the first element, but pollFirst() returns null when the Deque is empty, while removeFirst() throws NoSuchElementException."
        },
        {
          question: "What is the difference between peekFirst() and getFirst()?",
          answer:
            "Both examine the first element without removing it. peekFirst() returns null when empty, while getFirst() throws NoSuchElementException."
        },
        {
          question: "Does ArrayDeque allow null?",
          answer:
            "No. ArrayDeque does not permit null elements."
        },
        {
          question: "Does Deque allow duplicate elements?",
          answer:
            "Yes. Deque does not impose uniqueness, so duplicate elements are allowed."
        },
        {
          question: "What is the difference between ArrayDeque and LinkedList?",
          answer:
            "Both implement Deque, but ArrayDeque uses an array-based deque structure, while LinkedList uses linked nodes and also implements List."
        },
        {
          question: "Why is ArrayDeque commonly preferred over Stack?",
          answer:
            "Stack is a legacy class extending Vector. ArrayDeque provides modern Deque operations and is commonly used for stack behavior when synchronization is not required."
        },
        {
          question: "What is the time complexity of addFirst() and addLast()?",
          answer:
            "For ArrayDeque, these operations are typically O(1) amortized."
        },
        {
          question: "Give one real-world use case for Deque.",
          answer:
            "A Deque can be used for task processing where tasks may be added or removed from either end, or for algorithms such as sliding-window processing."
        }
      ]
    }
  ]
};