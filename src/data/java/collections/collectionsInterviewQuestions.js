export const collectionsInterviewQuestions = {
  id: "collections-interview-questions",
  slug: "collections-interview-questions",

  title: "Java Collections Interview Questions",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Revise the most important Java Collections interview questions covering List, Set, Map, Queue, Deque, iterators, hashing, sorting, immutability, performance, concurrency, and practical collection selection.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "collections-overview",
      title: "1. Collections Fundamentals",

      paragraphs: [
        "The Java Collections Framework provides interfaces and implementations for storing and manipulating groups of objects.",
        "The main interfaces include Collection, List, Set, Queue, Deque, and Map.",
        "Map is part of the Collections Framework but does not extend the Collection interface."
      ],

      bullets: [
        "List → ordered collection that allows duplicates.",
        "Set → collection that does not allow duplicate elements.",
        "Queue → collection designed for processing elements.",
        "Deque → double-ended queue.",
        "Map → key-value data structure with unique keys.",
        "Collection → root interface for List, Set, and Queue-based collections."
      ],

      interviewQuestions: [
        {
          question: "What is the Java Collections Framework?",
          answer:
            "It is a set of interfaces and classes that provides standard data structures and algorithms for storing and manipulating groups of objects."
        },
        {
          question: "What is the difference between Collection and Collections?",
          answer:
            "Collection is an interface that represents a group of objects. Collections is a utility class that provides static methods for operations such as sorting, reversing, searching, and creating unmodifiable views."
        },
        {
          question: "Does Map extend Collection?",
          answer:
            "No. Map is a separate interface designed for key-value mappings."
        },
        {
          question: "What are the major Collection interfaces?",
          answer:
            "List, Set, Queue, and Deque are major interfaces under the Collection hierarchy."
        }
      ]
    },

    {
      id: "list-questions",
      title: "2. List Interview Questions",

      paragraphs: [
        "List implementations are used when ordering and indexed access are important and duplicate elements are allowed."
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
        names.add("Ravi");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Kiran, Ravi]`,

      interviewQuestions: [
        {
          question: "What is a List?",
          answer:
            "List is an ordered Collection that allows duplicate elements and supports positional access."
        },
        {
          question: "What is ArrayList?",
          answer:
            "ArrayList is a resizable-array implementation of the List interface."
        },
        {
          question: "What is the time complexity of ArrayList get(index)?",
          answer:
            "O(1), because ArrayList provides direct index-based access."
        },
        {
          question: "What is the average complexity of adding an element at the end of ArrayList?",
          answer:
            "Amortized O(1). Occasional resizing can require copying elements."
        },
        {
          question: "Why is ArrayList insertion in the middle O(n)?",
          answer:
            "Elements after the insertion position may need to be shifted."
        },
        {
          question: "What is LinkedList?",
          answer:
            "LinkedList is a doubly linked list implementation that implements both List and Deque."
        },
        {
          question: "What is the complexity of LinkedList get(index)?",
          answer:
            "O(n), because the list may need to traverse nodes to reach the requested index."
        },
        {
          question: "ArrayList vs LinkedList?",
          answer:
            "ArrayList provides efficient random access, while LinkedList provides efficient operations at the ends but slower index-based access."
        },
        {
          question: "Does ArrayList allow duplicates?",
          answer:
            "Yes."
        },
        {
          question: "Does ArrayList maintain insertion order?",
          answer:
            "Yes."
        }
      ]
    },

    {
      id: "set-questions",
      title: "3. Set Interview Questions",

      paragraphs: [
        "Set implementations are used when duplicate elements should not be stored."
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
        numbers.add(10);

        System.out.println(numbers);
        System.out.println(numbers.size());
    }
}`
      },

      output: `Example output:
[20, 10]
2

Note: HashSet does not guarantee iteration order.`,

      interviewQuestions: [
        {
          question: "What is a Set?",
          answer:
            "Set is a Collection that does not allow duplicate elements."
        },
        {
          question: "What is HashSet?",
          answer:
            "HashSet is a hash-table-based Set implementation that provides average O(1) add, remove, and contains operations."
        },
        {
          question: "Does HashSet maintain insertion order?",
          answer:
            "No. HashSet does not guarantee iteration order."
        },
        {
          question: "What is LinkedHashSet?",
          answer:
            "LinkedHashSet is a Set implementation that maintains insertion order while providing hash-based average performance."
        },
        {
          question: "What is TreeSet?",
          answer:
            "TreeSet is a sorted Set implementation based on a balanced tree structure."
        },
        {
          question: "What is the complexity of TreeSet add(), remove(), and contains()?",
          answer:
            "Typically O(log n)."
        },
        {
          question: "HashSet vs LinkedHashSet?",
          answer:
            "Both provide hash-based average performance, but LinkedHashSet also maintains insertion order."
        },
        {
          question: "HashSet vs TreeSet?",
          answer:
            "HashSet is hash-based and does not guarantee sorted order, while TreeSet maintains sorted order with O(log n) basic operations."
        },
        {
          question: "Can a Set contain duplicates?",
          answer:
            "No. A Set does not permit duplicate elements according to its equality semantics."
        }
      ]
    },

    {
      id: "map-questions",
      title: "4. Map Interview Questions",

      paragraphs: [
        "Map stores data as key-value pairs. Keys are unique, while values may be duplicated."
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
                students.get(101)
        );
    }
}`
      },

      output: `Ravi`,

      interviewQuestions: [
        {
          question: "What is a Map?",
          answer:
            "Map is an interface that stores key-value mappings where each key can map to at most one value."
        },
        {
          question: "Can a Map contain duplicate keys?",
          answer:
            "No. A key identifies a mapping. Putting another value for the same key replaces the previous value in common Map implementations."
        },
        {
          question: "Can a Map contain duplicate values?",
          answer:
            "Yes."
        },
        {
          question: "What is HashMap?",
          answer:
            "HashMap is a hash-based Map implementation that provides average O(1) key lookup, insertion, and removal."
        },
        {
          question: "What is LinkedHashMap?",
          answer:
            "LinkedHashMap is a HashMap-based implementation that maintains predictable insertion-order iteration."
        },
        {
          question: "What is TreeMap?",
          answer:
            "TreeMap is a sorted Map implementation that maintains keys according to their natural ordering or a Comparator."
        },
        {
          question: "What is the complexity of TreeMap get()?",
          answer:
            "O(log n)."
        },
        {
          question: "HashMap vs TreeMap?",
          answer:
            "HashMap provides average O(1) basic key operations without sorted ordering, while TreeMap provides O(log n) basic operations and maintains sorted keys."
        },
        {
          question: "HashMap vs LinkedHashMap?",
          answer:
            "Both provide average O(1) basic key operations, but LinkedHashMap maintains predictable iteration order and has additional memory overhead."
        }
      ]
    },

    {
      id: "hashmap-internals",
      title: "5. HashMap and Hashing Questions",

      paragraphs: [
        "HashMap performance depends on hashing and equality.",
        "A key's hash code is used as part of locating the appropriate bucket, and equality checks are used when necessary to distinguish keys."
      ],

      code: {
        language: "java",
        code: `class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other =
                (Student) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}`
      },

      interviewQuestions: [
        {
          question: "Why are equals() and hashCode() important for HashMap?",
          answer:
            "HashMap uses hashing and equality to locate and distinguish keys. Equal keys must produce the same hash code."
        },
        {
          question: "What is the contract between equals() and hashCode()?",
          answer:
            "If two objects are equal according to equals(), they must return the same hash code."
        },
        {
          question: "Can two unequal objects have the same hash code?",
          answer:
            "Yes. This is called a hash collision."
        },
        {
          question: "What happens if equals() is overridden but hashCode() is not?",
          answer:
            "Logically equal objects may have different hash codes, which can cause incorrect behavior in hash-based collections."
        },
        {
          question: "Why should immutable objects be preferred as HashMap keys?",
          answer:
            "Changing fields that participate in equals() and hashCode() after insertion can make subsequent lookup fail."
        },
        {
          question: "What is a hash collision?",
          answer:
            "A hash collision occurs when two unequal objects produce the same hash code."
        }
      ]
    },

    {
      id: "iterator-questions",
      title: "6. Iterator and ListIterator Questions",

      paragraphs: [
        "Iterators provide a standard way to traverse collection elements.",
        "ListIterator provides additional functionality for List implementations, including bidirectional traversal and modification operations."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        Iterator<Integer> iterator =
                numbers.iterator();

        while (iterator.hasNext()) {

            Integer number =
                    iterator.next();

            if (number == 20) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`,

      interviewQuestions: [
        {
          question: "What is Iterator?",
          answer:
            "Iterator is an interface used to traverse elements of a collection sequentially."
        },
        {
          question: "What are the main Iterator methods?",
          answer:
            "hasNext(), next(), and remove() are the main methods commonly used."
        },
        {
          question: "What is ListIterator?",
          answer:
            "ListIterator is an Iterator specifically for List implementations that supports forward and backward traversal and additional modification operations."
        },
        {
          question: "Iterator vs ListIterator?",
          answer:
            "Iterator provides forward traversal for collections, while ListIterator provides bidirectional traversal and additional List-specific operations."
        },
        {
          question: "How can you safely remove an element during Iterator traversal?",
          answer:
            "Use Iterator.remove() after retrieving the element with next(), rather than directly modifying the collection during iteration."
        }
      ]
    },

    {
      id: "fail-fast-questions",
      title: "7. Fail-Fast and Concurrent Traversal Questions",

      paragraphs: [
        "Many collection iterators detect certain structural modifications made outside the iterator and may throw ConcurrentModificationException.",
        "The term fail-safe is often used informally in interviews, but Java's collection APIs use more specific concepts such as snapshot iterators and weakly consistent iterators."
      ],

      interviewQuestions: [
        {
          question: "What is a fail-fast iterator?",
          answer:
            "It is an iterator that may detect certain structural modifications to the collection outside the iterator and throw ConcurrentModificationException."
        },
        {
          question: "What is ConcurrentModificationException?",
          answer:
            "It is a runtime exception that can occur when a collection is structurally modified while it is being iterated in an unsupported way."
        },
        {
          question: "How can you remove an element safely while using an Iterator?",
          answer:
            "Use the Iterator.remove() method when supported."
        },
        {
          question: "What is CopyOnWriteArrayList?",
          answer:
            "It is a thread-safe List implementation that creates a new underlying array when the collection is modified, making it useful when reads greatly outnumber writes."
        },
        {
          question: "What is a weakly consistent iterator?",
          answer:
            "It is an iterator used by certain concurrent collections that can tolerate concurrent modifications and does not generally throw ConcurrentModificationException for those modifications."
        }
      ]
    },

    {
      id: "comparable-comparator",
      title: "8. Comparable and Comparator Questions",

      paragraphs: [
        "Comparable and Comparator are used to define ordering for objects."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;

class Employee {

    int salary;

    Employee(int salary) {
        this.salary = salary;
    }
}

public class Main {

    public static void main(String[] args) {

        Comparator<Employee> comparator =
                Comparator.comparingInt(
                        employee -> employee.salary
                );

        System.out.println(
                comparator.compare(
                        new Employee(30000),
                        new Employee(50000)
                )
        );
    }
}`
      },

      output: `A negative value`,

      interviewQuestions: [
        {
          question: "What is Comparable?",
          answer:
            "Comparable defines a class's natural ordering through the compareTo() method."
        },
        {
          question: "What is Comparator?",
          answer:
            "Comparator defines an external comparison strategy through the compare() method."
        },
        {
          question: "Comparable vs Comparator?",
          answer:
            "Comparable defines natural ordering inside the class, while Comparator allows separate or multiple ordering strategies outside the class."
        },
        {
          question: "Can a class have multiple Comparators?",
          answer:
            "Yes. Multiple Comparator implementations or expressions can define different sorting strategies."
        },
        {
          question: "Which method does Comparable use?",
          answer:
            "compareTo()."
        },
        {
          question: "Which method does Comparator use?",
          answer:
            "compare()."
        }
      ]
    },

    {
      id: "queue-questions",
      title: "9. Queue, Deque, and PriorityQueue Questions",

      paragraphs: [
        "Queue-based collections are designed around processing elements according to a particular order or priority."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {

    public static void main(String[] args) {

        Deque<String> stack =
                new ArrayDeque<>();

        stack.push("A");
        stack.push("B");
        stack.push("C");

        System.out.println(
                stack.pop()
        );
    }
}`
      },

      output: `C`,

      interviewQuestions: [
        {
          question: "What is Queue?",
          answer:
            "Queue is a Collection interface designed for holding elements prior to processing, commonly following FIFO behavior."
        },
        {
          question: "What is Deque?",
          answer:
            "Deque is a double-ended queue that supports insertion and removal from both ends."
        },
        {
          question: "What is PriorityQueue?",
          answer:
            "PriorityQueue is a heap-based Queue implementation where the head is determined by natural ordering or a supplied Comparator."
        },
        {
          question: "What is the complexity of PriorityQueue offer()?",
          answer:
            "Generally O(log n)."
        },
        {
          question: "What is the complexity of PriorityQueue peek()?",
          answer:
            "O(1)."
        },
        {
          question: "How can you implement stack behavior in modern Java?",
          answer:
            "Use Deque with an ArrayDeque implementation and push/pop operations."
        },
        {
          question: "Why is ArrayDeque commonly preferred for stack behavior?",
          answer:
            "It provides efficient operations at both ends and avoids the legacy design of Stack."
        }
      ]
    },

    {
      id: "immutable-questions",
      title: "10. Immutable and Unmodifiable Collection Questions",

      paragraphs: [
        "Immutable and unmodifiable collections help prevent unwanted modification of collection structure."
      ],

      interviewQuestions: [
        {
          question: "What is an immutable collection?",
          answer:
            "An immutable collection cannot be changed after it is created."
        },
        {
          question: "What is an unmodifiable collection?",
          answer:
            "An unmodifiable collection prevents modification through a particular reference or view."
        },
        {
          question: "What does List.of() provide?",
          answer:
            "It provides an unmodifiable List."
        },
        {
          question: "What does Collections.unmodifiableList() provide?",
          answer:
            "It provides an unmodifiable view backed by the original List."
        },
        {
          question: "What is the difference between List.copyOf() and unmodifiableList()?",
          answer:
            "List.copyOf() creates an unmodifiable copy, while unmodifiableList() creates an unmodifiable view of the original collection."
        },
        {
          question: "Can an immutable collection contain mutable objects?",
          answer:
            "Yes. The collection structure can be immutable while the objects stored inside remain mutable."
        }
      ]
    },

    {
      id: "performance-questions",
      title: "11. Collection Performance Questions",

      paragraphs: [
        "Knowing common time complexities helps you select an appropriate collection for a particular access pattern."
      ],

      bullets: [
        "ArrayList get(index) → O(1)",
        "ArrayList contains() → O(n)",
        "HashSet contains() → O(1) average",
        "TreeSet contains() → O(log n)",
        "HashMap get() → O(1) average",
        "TreeMap get() → O(log n)",
        "PriorityQueue peek() → O(1)",
        "PriorityQueue offer()/poll() → O(log n)"
      ],

      interviewQuestions: [
        {
          question: "Which is generally faster for membership lookup: ArrayList or HashSet?",
          answer:
            "HashSet generally provides O(1) average membership lookup, while ArrayList.contains() is O(n)."
        },
        {
          question: "Why is TreeMap slower for basic lookup than HashMap?",
          answer:
            "TreeMap provides O(log n) lookup because it maintains sorted keys, while HashMap provides O(1) average lookup."
        },
        {
          question: "Why is ArrayList get(index) O(1)?",
          answer:
            "ArrayList uses an array-backed structure, allowing direct index-based access."
        },
        {
          question: "Why is LinkedList get(index) O(n)?",
          answer:
            "The implementation may need to traverse nodes to reach the requested index."
        },
        {
          question: "What does amortized O(1) mean for ArrayList add()?",
          answer:
            "Most additions take constant time, but occasional resizing requires additional work. Averaged across many additions, the cost is O(1)."
        }
      ]
    },

    {
      id: "scenario-questions",
      title: "12. Scenario-Based Collection Questions",

      paragraphs: [
        "Interviewers often provide a requirement and ask you to choose the appropriate collection."
      ],

      interviewQuestions: [
        {
          question: "You need unique employee IDs and do not care about ordering. Which collection?",
          answer:
            "HashSet."
        },
        {
          question: "You need unique employee IDs in insertion order. Which collection?",
          answer:
            "LinkedHashSet."
        },
        {
          question: "You need unique employee IDs in sorted order. Which collection?",
          answer:
            "TreeSet."
        },
        {
          question: "You need employee ID to Employee mapping with fast average lookup. Which collection?",
          answer:
            "HashMap<Integer, Employee>."
        },
        {
          question: "You need employee ID to Employee mapping with insertion-order iteration. Which collection?",
          answer:
            "LinkedHashMap<Integer, Employee>."
        },
        {
          question: "You need employee ID to Employee mapping with sorted employee IDs. Which collection?",
          answer:
            "TreeMap<Integer, Employee>."
        },
        {
          question: "You need FIFO task processing. Which collection?",
          answer:
            "Queue, commonly implemented using ArrayDeque."
        },
        {
          question: "You need stack behavior. Which collection?",
          answer:
            "Deque with ArrayDeque."
        },
        {
          question: "You need to process tasks according to priority. Which collection?",
          answer:
            "PriorityQueue."
        },
        {
          question: "You need fast index-based access to a list of users. Which implementation?",
          answer:
            "ArrayList."
        },
        {
          question: "You need to expose a collection without allowing callers to modify it.",
          answer:
            "Use an unmodifiable view or an immutable copy depending on whether a live view or snapshot is required."
        }
      ]
    },

    {
      id: "common-mistakes",
      title: "13. Common Collection Interview Mistakes",

      bullets: [
        "Saying Map extends Collection.",
        "Assuming HashSet maintains insertion order.",
        "Assuming HashMap maintains sorted keys.",
        "Saying HashMap operations are always O(1).",
        "Forgetting that hash collisions can occur.",
        "Overriding equals() without a consistent hashCode().",
        "Using == instead of equals() for logical object equality.",
        "Using LinkedList automatically whenever insertion or deletion is mentioned.",
        "Assuming PriorityQueue iteration returns fully sorted order.",
        "Confusing an unmodifiable view with an immutable snapshot.",
        "Using mutable objects as hash-based keys without considering their equality fields.",
        "Ignoring memory overhead when comparing collection implementations."
      ]
    },

    {
      id: "final-revision",
      title: "14. Final Collections Revision",

      paragraphs: [
        "For interviews, focus on understanding why a collection is selected rather than memorizing class names alone.",
        "Start with the requirement, identify ordering and uniqueness rules, determine the main operations, and then select an implementation."
      ],

      bullets: [
        "List → ordered, duplicates allowed.",
        "Set → unique elements.",
        "Map → key-value pairs.",
        "Queue → processing order.",
        "Deque → both ends.",
        "Hash → average O(1) basic operations.",
        "Tree → sorted order and O(log n) basic operations.",
        "LinkedHash → predictable insertion order.",
        "ArrayList → fast index access.",
        "ArrayDeque → queue and stack behavior.",
        "PriorityQueue → priority-based processing.",
        "Immutable/unmodifiable → protect collection structure.",
        "equals() + hashCode() → critical for hash-based collections."
      ],

      interviewQuestions: [
        {
          question: "How would you explain Java Collections in an interview?",
          answer:
            "Java Collections Framework provides standard interfaces and implementations for storing and processing groups of objects. Common interfaces include List, Set, Queue, Deque, and Map, with implementations such as ArrayList, HashSet, HashMap, TreeSet, TreeMap, and ArrayDeque."
        },
        {
          question: "How do you choose the right collection?",
          answer:
            "I first identify whether I need duplicates, ordering, sorting, index access, key-value lookup, queue behavior, priority processing, or concurrency. Then I select the implementation whose performance and behavior match those requirements."
        },
        {
          question: "What are the most important collections to know for a Java interview?",
          answer:
            "ArrayList, LinkedList, HashSet, LinkedHashSet, TreeSet, HashMap, LinkedHashMap, TreeMap, Queue, Deque, ArrayDeque, and PriorityQueue are important, along with Iterator, Comparable, Comparator, equals(), and hashCode()."
        }
      ]
    }
  ]
};