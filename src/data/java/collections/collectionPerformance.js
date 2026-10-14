export const collectionPerformance = {
  id: "collection-performance",
  slug: "collection-performance",

  title: "Collection Performance in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the performance characteristics of common Java collections, Big-O complexity, lookup, insertion, deletion, sorting, memory considerations, and how collection choice affects application performance.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-performance",
      title: "1. What Does Collection Performance Mean?",

      paragraphs: [
        "Collection performance describes how efficiently a collection performs operations such as adding, searching, removing, and accessing elements.",
        "The performance of a collection depends on its internal data structure and the operation being performed.",
        "Big-O notation is commonly used to describe how the running time of an operation grows as the number of elements increases."
      ],

      bullets: [
        "Access performance",
        "Search performance",
        "Insertion performance",
        "Deletion performance",
        "Sorting performance",
        "Memory usage",
        "Iteration performance"
      ]
    },

    {
      id: "big-o-basics",
      title: "2. Big-O Notation Basics",

      paragraphs: [
        "Big-O notation describes the growth rate of an algorithm or operation as the input size increases.",
        "For collections, common complexities include O(1), O(log n), O(n), and O(n log n)."
      ],

      bullets: [
        "O(1) → Constant time.",
        "O(log n) → Logarithmic time.",
        "O(n) → Linear time.",
        "O(n log n) → Common for efficient comparison-based sorting.",
        "O(n²) → Quadratic time."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int[] numbers = {
                10, 20, 30, 40, 50
        };

        // Direct index access
        // is approximately O(1)

        System.out.println(
                numbers[3]
        );
    }
}`
      },

      output: `40`
    },

    {
      id: "arraylist-access",
      title: "3. ArrayList Performance",

      paragraphs: [
        "ArrayList is backed by a resizable array.",
        "Because elements are stored using indexes, retrieving an element by index is efficient.",
        "Adding an element at the end is amortized O(1), although resizing can occasionally require copying elements.",
        "Adding or removing elements near the beginning or middle can require shifting elements."
      ],

      bullets: [
        "get(index) → O(1)",
        "set(index, value) → O(1)",
        "add(element) at end → amortized O(1)",
        "add(index, element) → O(n)",
        "remove(index) → O(n)",
        "contains(element) → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        System.out.println(
                names.get(1)
        );
    }
}`
      },

      output: `Kiran`
    },

    {
      id: "arraylist-shifting",
      title: "4. Why ArrayList Insertion Can Be O(n)",

      paragraphs: [
        "When an element is inserted into the middle of an ArrayList, elements after the insertion position may need to be shifted to make space.",
        "Therefore, insertion at an arbitrary index is generally O(n)."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("A");
        names.add("B");
        names.add("C");

        names.add(1, "X");

        System.out.println(names);
    }
}`
      },

      output: `[A, X, B, C]`
    },

    {
      id: "linkedlist-performance",
      title: "5. LinkedList Performance",

      paragraphs: [
        "LinkedList is implemented as a doubly linked list and also implements the Deque interface.",
        "Accessing an element by index requires traversal, so random index-based access is O(n).",
        "Operations at the ends can be efficient because the list maintains references to its first and last nodes."
      ],

      bullets: [
        "get(index) → O(n)",
        "addFirst() → O(1)",
        "addLast() → O(1)",
        "removeFirst() → O(1)",
        "removeLast() → O(1)",
        "contains(element) → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.LinkedList;

public class Main {

    public static void main(String[] args) {

        LinkedList<String> names =
                new LinkedList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        names.addFirst("Java");

        System.out.println(names);
    }
}`
      },

      output: `[Java, Ravi, Kiran, Arun]`
    },

    {
      id: "arraylist-vs-linkedlist",
      title: "6. ArrayList vs LinkedList Performance",

      paragraphs: [
        "ArrayList provides efficient random access because elements are stored in an array-like structure.",
        "LinkedList provides efficient operations at the ends but requires traversal for index-based access.",
        "Therefore, the choice should depend on the operations the application performs most frequently."
      ],

      bullets: [
        "Frequent get(index) → ArrayList is generally suitable.",
        "Frequent operations at both ends → Deque or ArrayDeque is often preferable.",
        "LinkedList should not automatically be chosen simply because insertion or deletion is required.",
        "Always consider the actual access pattern."
      ]
    },

    {
      id: "hashset-performance",
      title: "7. HashSet Performance",

      paragraphs: [
        "HashSet is backed by a hash table through its internal HashMap implementation.",
        "Hash-based lookup, insertion, and removal are generally O(1) on average when hashing distributes elements effectively.",
        "In unfavorable collision scenarios, performance can degrade, although modern Java implementations use additional mechanisms to improve collision handling."
      ],

      bullets: [
        "add(element) → O(1) average",
        "contains(element) → O(1) average",
        "remove(element) → O(1) average",
        "Iteration → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers =
                new HashSet<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        System.out.println(
                numbers.contains(20)
        );
    }
}`
      },

      output: `true`
    },

    {
      id: "linkedhashset-performance",
      title: "8. LinkedHashSet Performance",

      paragraphs: [
        "LinkedHashSet combines hash-based set behavior with a linked structure that maintains insertion order.",
        "Its basic add, remove, and contains operations are generally O(1) on average.",
        "It uses more memory than HashSet because it maintains additional links for ordering."
      ],

      bullets: [
        "add() → O(1) average",
        "contains() → O(1) average",
        "remove() → O(1) average",
        "Maintains insertion order",
        "More memory overhead than HashSet"
      ]
    },

    {
      id: "treeset-performance",
      title: "9. TreeSet Performance",

      paragraphs: [
        "TreeSet is based on a balanced tree structure.",
        "Basic search, insertion, and removal operations are O(log n).",
        "TreeSet maintains elements according to their natural ordering or a supplied Comparator."
      ],

      bullets: [
        "add(element) → O(log n)",
        "contains(element) → O(log n)",
        "remove(element) → O(log n)",
        "Sorted iteration → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.Set;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers =
                new TreeSet<>();

        numbers.add(40);
        numbers.add(10);
        numbers.add(30);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30, 40]`
    },

    {
      id: "hashmap-performance",
      title: "10. HashMap Performance",

      paragraphs: [
        "HashMap stores key-value pairs using hashing.",
        "Basic get(), put(), and remove() operations are generally O(1) on average when keys are well distributed.",
        "Performance depends on the quality of hashing and the number of collisions."
      ],

      bullets: [
        "put() → O(1) average",
        "get() → O(1) average",
        "remove() → O(1) average",
        "containsKey() → O(1) average",
        "containsValue() → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map<Integer, String> students =
                new HashMap<>();

        students.put(101, "Ravi");
        students.put(102, "Kiran");

        System.out.println(
                students.get(102)
        );
    }
}`
      },

      output: `Kiran`
    },

    {
      id: "linkedhashmap-performance",
      title: "11. LinkedHashMap Performance",

      paragraphs: [
        "LinkedHashMap combines HashMap-style key-value storage with linked ordering information.",
        "Basic lookup, insertion, and removal are generally O(1) on average.",
        "The additional links require more memory than HashMap."
      ],

      bullets: [
        "put() → O(1) average",
        "get() → O(1) average",
        "remove() → O(1) average",
        "Predictable insertion-order iteration",
        "Higher memory overhead than HashMap"
      ]
    },

    {
      id: "treemap-performance",
      title: "12. TreeMap Performance",

      paragraphs: [
        "TreeMap stores entries according to sorted key order using a balanced tree structure.",
        "Basic get, put, and remove operations are O(log n).",
        "TreeMap is useful when sorted keys and navigational operations are required."
      ],

      bullets: [
        "put() → O(log n)",
        "get() → O(log n)",
        "remove() → O(log n)",
        "containsKey() → O(log n)",
        "Sorted iteration → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.Map;
import java.util.TreeMap;

public class Main {

    public static void main(String[] args) {

        Map<Integer, String> students =
                new TreeMap<>();

        students.put(103, "Arun");
        students.put(101, "Ravi");
        students.put(102, "Kiran");

        System.out.println(students);
    }
}`
      },

      output: `{101=Ravi, 102=Kiran, 103=Arun}`
    },

    {
      id: "arraydeque-performance",
      title: "13. ArrayDeque Performance",

      paragraphs: [
        "ArrayDeque is a resizable-array implementation of the Deque interface.",
        "It provides efficient operations at both ends and is commonly used for queue and stack behavior."
      ],

      bullets: [
        "addFirst() → O(1) amortized",
        "addLast() → O(1) amortized",
        "removeFirst() → O(1) amortized",
        "removeLast() → O(1) amortized",
        "peekFirst() → O(1)",
        "peekLast() → O(1)"
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {

    public static void main(String[] args) {

        Deque<Integer> numbers =
                new ArrayDeque<>();

        numbers.addLast(10);
        numbers.addLast(20);
        numbers.addFirst(5);

        System.out.println(numbers);

        System.out.println(
                numbers.removeFirst()
        );
    }
}`
      },

      output: `[5, 10, 20]
5`
    },

    {
      id: "priorityqueue-performance",
      title: "14. PriorityQueue Performance",

      paragraphs: [
        "PriorityQueue is implemented using a priority heap.",
        "Adding and removing the head generally take O(log n), while inspecting the head takes O(1).",
        "The queue does not guarantee that iterating over all elements will produce sorted order."
      ],

      bullets: [
        "offer() → O(log n)",
        "poll() → O(log n)",
        "peek() → O(1)",
        "contains() → O(n)",
        "remove(Object) → O(n)"
      ],

      code: {
        language: "java",
        code: `import java.util.PriorityQueue;
import java.util.Queue;

public class Main {

    public static void main(String[] args) {

        Queue<Integer> queue =
                new PriorityQueue<>();

        queue.offer(30);
        queue.offer(10);
        queue.offer(20);

        System.out.println(
                queue.peek()
        );

        System.out.println(
                queue.poll()
        );
    }
}`
      },

      output: `10
10`
    },

    {
      id: "contains-comparison",
      title: "15. Search Performance Comparison",

      paragraphs: [
        "Search performance is one of the most important factors when choosing a collection.",
        "For example, searching for an element in an ArrayList generally requires a linear scan, while HashSet provides average constant-time membership checks."
      ],

      bullets: [
        "ArrayList.contains() → O(n)",
        "LinkedList.contains() → O(n)",
        "HashSet.contains() → O(1) average",
        "TreeSet.contains() → O(log n)",
        "HashMap.containsKey() → O(1) average",
        "TreeMap.containsKey() → O(log n)"
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        List<Integer> list =
                new ArrayList<>();

        Set<Integer> set =
                new HashSet<>();

        list.add(100);
        set.add(100);

        System.out.println(
                list.contains(100)
        );

        System.out.println(
                set.contains(100)
        );
    }
}`
      },

      output: `true
true`
    },

    {
      id: "sorting-performance",
      title: "16. Sorting Performance",

      paragraphs: [
        "Sorting a collection requires additional processing compared with simply storing or retrieving elements.",
        "List.sort() and Collections.sort() use Java's sorting implementation for object lists, with O(n log n) expected time for typical sorting behavior.",
        "TreeSet and TreeMap maintain sorted order continuously rather than sorting the entire collection only when requested."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        Collections.sort(numbers);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "memory-overhead",
      title: "17. Memory and Collection Choice",

      paragraphs: [
        "Performance is not only about execution time. Memory usage is also important.",
        "Different collection implementations maintain different internal structures.",
        "For example, LinkedHashMap stores additional linking information to preserve order, while TreeMap maintains tree nodes for sorted navigation."
      ],

      bullets: [
        "ArrayList stores elements in an array-backed structure.",
        "LinkedList stores linked nodes.",
        "HashMap stores hash table structures and entries.",
        "LinkedHashMap maintains additional links for ordering.",
        "TreeMap maintains tree nodes for sorted keys.",
        "TreeSet maintains tree-based structures for sorted elements."
      ]
    },

    {
      id: "capacity-and-resizing",
      title: "18. Capacity and Resizing",

      paragraphs: [
        "Array-based collections may need to resize their internal storage when capacity is exceeded.",
        "Resizing can require allocating a larger internal array and copying existing elements.",
        "This is why some append operations are described as amortized O(1) rather than guaranteed O(1)."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>(1000);

        numbers.add(10);
        numbers.add(20);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20]`
    },

    {
      id: "capacity-optimization",
      title: "19. Why Initial Capacity Can Matter",

      paragraphs: [
        "If an application knows approximately how many elements will be stored, providing an initial capacity can reduce unnecessary resizing.",
        "This can be useful for performance-sensitive code, although the capacity should be chosen based on realistic requirements rather than arbitrary large values."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> users =
                new ArrayList<>(1000);

        for (int i = 1; i <= 5; i++) {
            users.add("User " + i);
        }

        System.out.println(users.size());
    }
}`
      },

      output: `5`
    },

    {
      id: "performance-summary",
      title: "20. Common Collection Performance Summary",

      paragraphs: [
        "The following complexity guide is useful for interviews and everyday collection selection. These are typical or average characteristics and should not be treated as guarantees for every operation or implementation detail."
      ],

      bullets: [
        "ArrayList get(index) → O(1)",
        "ArrayList add(end) → amortized O(1)",
        "ArrayList contains() → O(n)",
        "LinkedList get(index) → O(n)",
        "LinkedList add/remove at ends → O(1)",
        "HashSet add/contains/remove → O(1) average",
        "LinkedHashSet add/contains/remove → O(1) average",
        "TreeSet add/contains/remove → O(log n)",
        "HashMap put/get/remove → O(1) average",
        "LinkedHashMap put/get/remove → O(1) average",
        "TreeMap put/get/remove → O(log n)",
        "ArrayDeque operations at ends → O(1) amortized",
        "PriorityQueue offer/poll → O(log n)",
        "PriorityQueue peek → O(1)"
      ]
    },

    {
      id: "important-points",
      title: "21. Important Points",

      bullets: [
        "Collection performance depends on the underlying data structure.",
        "ArrayList provides O(1) index access.",
        "ArrayList insertion or removal at an arbitrary position is generally O(n).",
        "ArrayList append is amortized O(1).",
        "LinkedList index-based access is O(n).",
        "HashSet basic operations are O(1) on average.",
        "LinkedHashSet provides HashSet-like average performance while maintaining insertion order.",
        "TreeSet basic operations are O(log n).",
        "HashMap basic key operations are O(1) on average.",
        "LinkedHashMap provides predictable iteration order with additional memory overhead.",
        "TreeMap basic key operations are O(log n).",
        "ArrayDeque provides efficient operations at both ends.",
        "PriorityQueue insertion and head removal are generally O(log n).",
        "PriorityQueue peek is O(1).",
        "containsValue() in HashMap is O(n).",
        "Sorting a List is generally O(n log n).",
        "Array-based collections may resize as they grow.",
        "Initial capacity can reduce resizing when the approximate size is known.",
        "Memory usage is also an important part of collection performance.",
        "Always choose a collection based on the application's access pattern."
      ]
    },

    {
      id: "interview-questions",
      title: "22. Interview Questions",

      interviewQuestions: [
        {
          question: "What is the time complexity of ArrayList get(index)?",
          answer:
            "O(1), because ArrayList provides direct index-based access."
        },
        {
          question: "What is the average time complexity of ArrayList add(element) at the end?",
          answer:
            "Amortized O(1). Occasionally resizing may require copying elements."
        },
        {
          question: "What is the time complexity of inserting into the middle of an ArrayList?",
          answer:
            "Generally O(n), because existing elements may need to be shifted."
        },
        {
          question: "What is the time complexity of LinkedList get(index)?",
          answer:
            "O(n), because the list may need to traverse nodes to reach the requested index."
        },
        {
          question: "What is the average complexity of HashSet contains()?",
          answer:
            "O(1) average, assuming effective hash distribution."
        },
        {
          question: "What is the complexity of TreeSet contains()?",
          answer:
            "O(log n)."
        },
        {
          question: "What is the average complexity of HashMap get()?",
          answer:
            "O(1) average, assuming effective hash distribution."
        },
        {
          question: "What is the complexity of TreeMap get()?",
          answer:
            "O(log n)."
        },
        {
          question: "Why is HashMap generally faster than TreeMap for basic lookup?",
          answer:
            "HashMap provides average O(1) lookup, while TreeMap provides O(log n) lookup because it maintains sorted keys."
        },
        {
          question: "Why does LinkedHashMap use more memory than HashMap?",
          answer:
            "LinkedHashMap maintains additional links between entries to preserve predictable iteration order."
        },
        {
          question: "What is the complexity of PriorityQueue offer()?",
          answer:
            "Generally O(log n)."
        },
        {
          question: "What is the complexity of PriorityQueue peek()?",
          answer:
            "O(1), because the head element is directly accessible."
        },
        {
          question: "What is the complexity of PriorityQueue contains()?",
          answer:
            "O(n), because an arbitrary element may need to be searched for."
        },
        {
          question: "Why is ArrayList add() at the end called amortized O(1)?",
          answer:
            "Most additions are constant time, but occasional resizing requires copying elements into a larger internal array."
        },
        {
          question: "Why can LinkedList be slower than ArrayList even for some insertion operations?",
          answer:
            "Finding a position in LinkedList can require traversal, and linked nodes have additional memory and pointer overhead."
        },
        {
          question: "What is the complexity of HashMap containsValue()?",
          answer:
            "O(n), because values are not indexed by hash in the same way keys are."
        },
        {
          question: "What is the typical complexity of sorting a List?",
          answer:
            "O(n log n) for Java's standard object-list sorting behavior."
        },
        {
          question: "Why can initial ArrayList capacity improve performance?",
          answer:
            "Providing a reasonable initial capacity can reduce the number of internal resizing operations when the approximate size is known."
        },
        {
          question: "Which is better for lookup: ArrayList or HashSet?",
          answer:
            "For membership lookup, HashSet is generally faster on average at O(1), while ArrayList.contains() is O(n)."
        },
        {
          question: "Which is better when sorted elements are required: HashSet or TreeSet?",
          answer:
            "TreeSet, because it maintains sorted order and provides O(log n) basic operations."
        },
        {
          question: "What should you consider besides time complexity when choosing a collection?",
          answer:
            "Consider memory usage, ordering requirements, duplicates, access patterns, concurrency, sorting requirements, and the actual operations performed by the application."
        }
      ]
    }
  ]
};