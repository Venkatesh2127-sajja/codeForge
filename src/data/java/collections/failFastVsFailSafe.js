export const failFastVsFailSafe = {
  id: "fail-fast-vs-fail-safe",
  slug: "fail-fast-vs-fail-safe",

  title: "Fail-Fast vs Fail-Safe in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand fail-fast and weakly consistent or snapshot-style collection traversal, ConcurrentModificationException, safe modification techniques, and concurrent collection examples in Java.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-fail-fast",
      title: "1. What is Fail-Fast?",

      paragraphs: [
        "A fail-fast iterator detects certain structural modifications to a collection while the iterator is being used and may throw ConcurrentModificationException.",
        "This behavior helps expose unsafe concurrent modification during iteration.",
        "Fail-fast behavior is generally provided by ordinary collection implementations such as ArrayList and HashMap."
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

            Integer number = iterator.next();

            if (number == 20) {
                numbers.add(40);
            }
        }
    }
}`
      },

      output: `Exception in thread "main"
java.util.ConcurrentModificationException`
    },

    {
      id: "concurrent-modification",
      title: "2. What is ConcurrentModificationException?",

      paragraphs: [
        "ConcurrentModificationException is a runtime exception in java.util.",
        "It can occur when a collection is structurally modified while an iterator is traversing it, except when the modification is performed through the iterator's supported modification operation.",
        "The exception is not limited to multiple threads; it can also happen when a single thread directly modifies a collection during iteration."
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

        for (String name : names) {

            if (name.equals("Kiran")) {
                names.remove(name);
            }
        }
    }
}`
      },

      output: `java.util.ConcurrentModificationException`
    },

    {
      id: "why-fail-fast",
      title: "3. Why Does Fail-Fast Happen?",

      paragraphs: [
        "Many collection implementations maintain internal modification information to detect structural changes during iteration.",
        "If an iterator detects that the collection has changed unexpectedly, it may throw ConcurrentModificationException."
      ],

      bullets: [
        "An iterator is created.",
        "The iterator starts traversing the collection.",
        "The collection is structurally modified outside the iterator.",
        "The iterator detects the unexpected modification.",
        "ConcurrentModificationException may be thrown."
      ]
    },

    {
      id: "iterator-safe-remove",
      title: "4. Safely Removing Elements Using Iterator",

      paragraphs: [
        "When an element must be removed during iterator traversal, Iterator.remove() can be used.",
        "This allows the iterator to remain aware of the modification."
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

            Integer number = iterator.next();

            if (number == 20) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "remove-if",
      title: "5. Using removeIf()",

      paragraphs: [
        "For many filtering operations, removeIf() is simpler than manually using an Iterator.",
        "removeIf() removes elements that match the supplied Predicate."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        numbers.removeIf(
                number -> number % 20 == 0
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "fail-safe-term",
      title: "6. What Does Fail-Safe Mean?",

      paragraphs: [
        "The term fail-safe is commonly used in interview discussions for collection traversal approaches that allow traversal to continue without throwing ConcurrentModificationException when the underlying data changes.",
        "In modern Java documentation, different concurrent collections have different traversal semantics. For example, CopyOnWriteArrayList uses a snapshot-style iterator, while ConcurrentHashMap iterators are weakly consistent.",
        "Therefore, fail-safe should be treated as an interview shorthand rather than a single formal behavior shared by every concurrent collection."
      ]
    },

    {
      id: "copy-on-write",
      title: "7. CopyOnWriteArrayList",

      paragraphs: [
        "CopyOnWriteArrayList is a thread-safe List implementation in java.util.concurrent.",
        "Its iterator operates over a snapshot of the array at the time the iterator was created.",
        "Changes made to the list after iterator creation are not reflected in that iterator."
      ],

      code: {
        language: "java",
        code: `import java.util.Iterator;
import java.util.concurrent.CopyOnWriteArrayList;

public class Main {

    public static void main(String[] args) {

        CopyOnWriteArrayList<Integer> numbers =
                new CopyOnWriteArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        Iterator<Integer> iterator =
                numbers.iterator();

        numbers.add(40);

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        System.out.println(numbers);
    }
}`
      },

      output: `10
20
30
[10, 20, 30, 40]`
    },

    {
      id: "copy-on-write-modification",
      title: "8. Modifying CopyOnWriteArrayList During Iteration",

      paragraphs: [
        "CopyOnWriteArrayList allows the list to be modified while an existing iterator is being traversed.",
        "The iterator continues over its snapshot and does not see modifications made after the iterator was created."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.CopyOnWriteArrayList;

public class Main {

    public static void main(String[] args) {

        CopyOnWriteArrayList<String> names =
                new CopyOnWriteArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        for (String name : names) {

            if (name.equals("Kiran")) {
                names.add("Venkatesh");
            }

            System.out.println(name);
        }

        System.out.println(names);
    }
}`
      },

      output: `Ravi
Kiran
Arun
[Ravi, Kiran, Arun, Venkatesh]`
    },

    {
      id: "concurrent-hashmap",
      title: "9. ConcurrentHashMap Traversal",

      paragraphs: [
        "ConcurrentHashMap is designed for concurrent access to a map.",
        "Its iterators do not throw ConcurrentModificationException due to concurrent updates and are weakly consistent.",
        "An iterator may reflect some modifications made after iteration begins, but it is not a snapshot of the map."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.ConcurrentHashMap;

public class Main {

    public static void main(String[] args) {

        ConcurrentHashMap<Integer, String> map =
                new ConcurrentHashMap<>();

        map.put(1, "Java");
        map.put(2, "Spring");
        map.put(3, "React");

        for (Integer key : map.keySet()) {

            if (key == 2) {
                map.put(4, "Docker");
            }

            System.out.println(
                    key + " = " + map.get(key)
            );
        }

        System.out.println(map);
    }
}`
      },

      output: `Example output:
1 = Java
2 = Spring
3 = React
{1=Java, 2=Spring, 3=React, 4=Docker}

Note: The exact traversal order and whether a concurrent modification is observed are not guaranteed.`
    },

    {
      id: "fail-fast-vs-concurrent",
      title: "10. Fail-Fast vs Concurrent Collection Traversal",

      paragraphs: [
        "It is important not to treat all concurrent collections as having identical behavior.",
        "Ordinary collections commonly provide fail-fast iterators on structural modification, while concurrent collections are designed with different traversal guarantees."
      ],

      bullets: [
        "ArrayList iterator: commonly fail-fast.",
        "HashMap iterator: commonly fail-fast.",
        "CopyOnWriteArrayList iterator: snapshot-style traversal.",
        "ConcurrentHashMap iterator: weakly consistent traversal.",
        "Fail-fast is generally a best-effort bug-detection mechanism.",
        "Concurrent collections provide defined concurrency-oriented behavior rather than simply disabling exceptions."
      ]
    },

    {
      id: "single-thread-example",
      title: "11. Fail-Fast Can Happen in a Single Thread",

      paragraphs: [
        "A common misconception is that ConcurrentModificationException only occurs when multiple threads modify a collection.",
        "That is not true. Direct structural modification during iteration can trigger it even when only one thread is involved."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages =
                new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("C++");

        for (String language : languages) {

            if (language.equals("Python")) {
                languages.add("JavaScript");
            }
        }
    }
}`
      },

      output: `java.util.ConcurrentModificationException`
    },

    {
      id: "multi-thread",
      title: "12. Collection Modification by Multiple Threads",

      paragraphs: [
        "When multiple threads access a mutable collection, additional thread-safety concerns arise.",
        "A normal ArrayList is not a general-purpose thread-safe collection.",
        "For concurrent applications, appropriate synchronization or concurrent collection implementations should be considered."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.ConcurrentHashMap;

public class Main {

    public static void main(String[] args) {

        ConcurrentHashMap<Integer, String> users =
                new ConcurrentHashMap<>();

        users.put(101, "Ravi");
        users.put(102, "Kiran");

        System.out.println(users);
    }
}`
      },

      output: `{101=Ravi, 102=Kiran}`
    },

    {
      id: "synchronized-collection",
      title: "13. Synchronized Collections vs Concurrent Collections",

      paragraphs: [
        "Collections.synchronizedList() can wrap a List with synchronized access.",
        "However, iteration over a synchronized collection requires external synchronization according to its API contract.",
        "Concurrent collection implementations such as CopyOnWriteArrayList and ConcurrentHashMap are designed specifically for concurrent access patterns."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Collections.synchronizedList(
                        new ArrayList<>()
                );

        numbers.add(10);
        numbers.add(20);

        synchronized (numbers) {

            for (Integer number : numbers) {
                System.out.println(number);
            }
        }
    }
}`
      },

      output: `10
20`
    },

    {
      id: "when-to-use-copy-on-write",
      title: "14. When Should You Use CopyOnWriteArrayList?",

      paragraphs: [
        "CopyOnWriteArrayList is useful when reads and iterations are much more frequent than modifications.",
        "Each structural modification creates a new copy of the underlying array, so frequent writes can be expensive."
      ],

      bullets: [
        "Many reads.",
        "Relatively few writes.",
        "Safe iteration is important.",
        "A snapshot-style iterator is acceptable.",
        "Examples can include listener lists or configuration-style data that changes infrequently."
      ]
    },

    {
      id: "when-use-concurrent-hashmap",
      title: "15. When Should You Use ConcurrentHashMap?",

      paragraphs: [
        "ConcurrentHashMap is useful when multiple threads need to access and update a map concurrently.",
        "It provides concurrency-oriented operations without requiring the entire map to be externally synchronized for ordinary access."
      ],

      bullets: [
        "Multiple threads access a map.",
        "Concurrent updates are required.",
        "High concurrency is expected.",
        "Weakly consistent iteration is acceptable."
      ]
    },

    {
      id: "safe-modification-techniques",
      title: "16. Safe Ways to Modify Collections",

      paragraphs: [
        "The appropriate technique depends on whether the collection is being modified during iteration and whether multiple threads are involved."
      ],

      bullets: [
        "Use Iterator.remove() when removing through an Iterator.",
        "Use removeIf() for predicate-based removal.",
        "Use a separate collection to hold changes when appropriate.",
        "Use CopyOnWriteArrayList when snapshot-style traversal fits the workload.",
        "Use ConcurrentHashMap for appropriate concurrent map workloads.",
        "Use synchronization when required by the collection's API contract."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        numbers.removeIf(
                number -> number > 20
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20]`
    },

    {
      id: "important-points",
      title: "17. Important Points",

      bullets: [
        "Fail-fast iterators may throw ConcurrentModificationException when a collection is structurally modified unexpectedly during iteration.",
        "ConcurrentModificationException can occur even in a single thread.",
        "Iterator.remove() is a supported way to remove the current element during iterator traversal.",
        "removeIf() is useful for predicate-based removal.",
        "CopyOnWriteArrayList uses snapshot-style iterators.",
        "CopyOnWriteArrayList iterators do not see modifications made after iterator creation.",
        "ConcurrentHashMap provides weakly consistent iterators.",
        "Weakly consistent iteration is not the same as snapshot iteration.",
        "Fail-fast behavior is generally best effort and should not be used as a synchronization mechanism.",
        "Normal ArrayList is not a general-purpose thread-safe collection.",
        "Concurrent collections should be selected according to the application's concurrency and read/write requirements."
      ]
    },

    {
      id: "interview-questions",
      title: "18. Interview Questions",

      interviewQuestions: [
        {
          question: "What is fail-fast behavior in Java collections?",
          answer:
            "Fail-fast behavior means an iterator may detect an unexpected structural modification to a collection during iteration and throw ConcurrentModificationException."
        },
        {
          question: "What is ConcurrentModificationException?",
          answer:
            "It is a runtime exception that can occur when a collection is structurally modified while an iterator is traversing it, except through supported iterator modification operations."
        },
        {
          question: "Does ConcurrentModificationException only occur with multiple threads?",
          answer:
            "No. It can occur in a single thread when code directly modifies a collection while iterating over it."
        },
        {
          question: "How can you safely remove an element while using an Iterator?",
          answer:
            "Use Iterator.remove() after next() has returned the element to be removed."
        },
        {
          question: "What is CopyOnWriteArrayList?",
          answer:
            "CopyOnWriteArrayList is a thread-safe List implementation whose iterators operate over a snapshot of the array at iterator creation time."
        },
        {
          question: "Does CopyOnWriteArrayList throw ConcurrentModificationException during iteration when the list is modified?",
          answer:
            "Its snapshot-style iterator does not throw ConcurrentModificationException because it iterates over the snapshot that existed when the iterator was created."
        },
        {
          question: "Will a CopyOnWriteArrayList iterator see elements added after iterator creation?",
          answer:
            "No. Its iterator operates over the snapshot captured when the iterator was created."
        },
        {
          question: "What is ConcurrentHashMap?",
          answer:
            "ConcurrentHashMap is a thread-safe map implementation designed for concurrent access and updates."
        },
        {
          question: "What type of iterator does ConcurrentHashMap provide?",
          answer:
            "Its iterators are weakly consistent. They do not throw ConcurrentModificationException because of concurrent updates and may reflect some changes made during iteration."
        },
        {
          question: "What is the difference between snapshot iteration and weakly consistent iteration?",
          answer:
            "Snapshot iteration traverses a fixed snapshot, while weakly consistent iteration can reflect some modifications occurring during traversal without providing a fixed snapshot."
        },
        {
          question: "Is ArrayList thread-safe?",
          answer:
            "No. ArrayList is not a general-purpose thread-safe collection."
        },
        {
          question: "How can an ArrayList be synchronized?",
          answer:
            "Collections.synchronizedList() can wrap an ArrayList, but iteration over the synchronized collection requires following the synchronization requirements in its API contract."
        },
        {
          question: "When should CopyOnWriteArrayList be used?",
          answer:
            "It is appropriate when reads and iterations are frequent and modifications are relatively infrequent."
        },
        {
          question: "When should ConcurrentHashMap be used?",
          answer:
            "It is useful when multiple threads need to access and update a map concurrently."
        },
        {
          question: "Is fail-fast behavior a thread-safety mechanism?",
          answer:
            "No. Fail-fast behavior is primarily a best-effort mechanism for detecting unexpected modification during iteration and should not be relied on for synchronization."
        }
      ]
    }
  ]
};