export const vector = {
  id: "vector",
  slug: "vector",
  title: "Vector in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Vector in Java from basic operations to internal working, synchronization, capacity management, iteration, performance, comparisons with ArrayList and LinkedList, common mistakes, best practices, and interview questions.",
  estimatedTime: "60 min",

  sections: [
    // =========================================================
    // 1. WHAT IS VECTOR?
    // =========================================================
    {
      id: "what-is-vector",
      title: "1. What is Vector?",
      paragraphs: [
        "Vector is a legacy class in Java that implements the List interface and stores elements in a dynamically growing array.",
        "Like ArrayList, Vector maintains elements in insertion order, allows duplicate elements, and provides index-based access.",
        "The major difference is that Vector's legacy methods are synchronized by default, whereas ArrayList is not synchronized.",
        "Vector has existed since early versions of Java, while the Java Collections Framework was introduced later."
      ],

      bullets: [
        "Vector implements the List interface.",
        "Vector uses a dynamically growing array internally.",
        "Vector maintains insertion order.",
        "Vector allows duplicate elements.",
        "Vector allows null values.",
        "Vector is synchronized by default.",
        "Vector is generally considered a legacy collection.",
        "ArrayList is normally preferred for non-concurrent list usage."
      ],

      code: {
        language: "java",
        code: `import java.util.Vector;

public class Main {
    public static void main(String[] args) {

        Vector<String> names = new Vector<>();

        names.add("John");
        names.add("Alice");
        names.add("Bob");

        System.out.println(names);
    }
}`
      },

      output: `[John, Alice, Bob]`
    },

    // =========================================================
    // 2. VECTOR HIERARCHY
    // =========================================================
    {
      id: "vector-hierarchy",
      title: "2. Vector Hierarchy",
      paragraphs: [
        "Vector is part of the List hierarchy. It extends AbstractList and implements the List, RandomAccess, Cloneable, and Serializable interfaces.",
        "RandomAccess indicates that indexed access is expected to be efficient."
      ],

      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
  List
   |
AbstractList
   |
 Vector`
      },

      bullets: [
        "Vector extends AbstractList.",
        "Vector implements List.",
        "Vector implements RandomAccess.",
        "Vector implements Cloneable.",
        "Vector implements Serializable."
      ]
    },

    // =========================================================
    // 3. CREATING VECTOR
    // =========================================================
    {
      id: "creating-vector",
      title: "3. Creating a Vector",
      paragraphs: [
        "A Vector can be created using its no-argument constructor or by specifying an initial capacity.",
        "You can also specify both an initial capacity and a capacity increment."
      ],

      code: {
        language: "java",
        code: `import java.util.Vector;

public class Main {
    public static void main(String[] args) {

        Vector<String> vector1 = new Vector<>();

        Vector<String> vector2 =
                new Vector<>(10);

        Vector<String> vector3 =
                new Vector<>(10, 5);

        System.out.println(vector1);
        System.out.println(vector2);
        System.out.println(vector3);
    }
}`
      },

      bullets: [
        "`new Vector<>()` creates a Vector using the default initial capacity.",
        "`new Vector<>(10)` creates a Vector with an initial capacity of 10.",
        "`new Vector<>(10, 5)` specifies an initial capacity of 10 and a capacity increment of 5."
      ]
    },

    // =========================================================
    // 4. GENERICS
    // =========================================================
    {
      id: "vector-generics",
      title: "4. Generics with Vector",
      paragraphs: [
        "Generics allow us to specify the type of elements that a Vector can store.",
        "Using generics provides compile-time type safety and avoids unnecessary casting when retrieving elements."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Java");
names.add("Spring Boot");

// names.add(100); // Compile-time error

String name = names.get(0);

System.out.println(name);`
      },

      output: `Java`
    },

    // =========================================================
    // 5. ADDING ELEMENTS
    // =========================================================
    {
      id: "vector-add",
      title: "5. Adding Elements",
      paragraphs: [
        "The add() method adds an element to the end of the Vector.",
        "Vector also provides the legacy addElement() method, which performs a similar operation."
      ],

      code: {
        language: "java",
        code: `Vector<String> languages = new Vector<>();

languages.add("Java");
languages.add("Python");
languages.add("JavaScript");

languages.addElement("Spring");

System.out.println(languages);`
      },

      output: `[Java, Python, JavaScript, Spring]`,

      bullets: [
        "`add()` is the modern Collection API method.",
        "`addElement()` is a legacy Vector method.",
        "Prefer `add()` when writing new code."
      ]
    },

    // =========================================================
    // 6. ADDING AT INDEX
    // =========================================================
    {
      id: "vector-add-index",
      title: "6. Adding an Element at a Specific Index",
      paragraphs: [
        "The add(index, element) method inserts an element at a specified position.",
        "Existing elements from that position onward are shifted to the right."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

names.add(1, "David");

System.out.println(names);`
      },

      output: `[Alice, David, Bob, Charlie]`
    },

    // =========================================================
    // 7. ACCESSING ELEMENTS
    // =========================================================
    {
      id: "vector-get",
      title: "7. Accessing Elements",
      paragraphs: [
        "The get(index) method retrieves an element using its index.",
        "Since Vector is backed by an array, indexed access is generally O(1)."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

String name = names.get(1);

System.out.println(name);`
      },

      output: `Bob`
    },

    // =========================================================
    // 8. UPDATING ELEMENTS
    // =========================================================
    {
      id: "vector-set",
      title: "8. Updating Elements",
      paragraphs: [
        "The set(index, element) method replaces the element at the specified index."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

names.set(1, "David");

System.out.println(names);`
      },

      output: `[Alice, David, Charlie]`
    },

    // =========================================================
    // 9. REMOVING ELEMENTS
    // =========================================================
    {
      id: "vector-remove",
      title: "9. Removing Elements",
      paragraphs: [
        "Vector supports removing elements using index or object value.",
        "The remove(index) method removes the element at a particular index, while remove(object) removes the first matching element."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

names.remove(1);

System.out.println(names);

names.remove("Charlie");

System.out.println(names);`
      },

      output: `[Alice, Charlie]
[Alice]`
    },

    // =========================================================
    // 10. FIRST AND LAST ELEMENT
    // =========================================================
    {
      id: "vector-first-last",
      title: "10. First and Last Element",
      paragraphs: [
        "Vector provides firstElement() and lastElement() methods as legacy APIs.",
        "It also inherits get(0) and get(size() - 1) through List."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

System.out.println(names.firstElement());
System.out.println(names.lastElement());`
      },

      output: `Alice
Charlie`
    },

    // =========================================================
    // 11. SIZE
    // =========================================================
    {
      id: "vector-size",
      title: "11. size()",
      paragraphs: [
        "The size() method returns the number of elements currently stored in the Vector.",
        "Size represents the number of actual elements, not the internal capacity."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");

System.out.println(names.size());`
      },

      output: `2`
    },

    // =========================================================
    // 12. CAPACITY
    // =========================================================
    {
      id: "vector-capacity",
      title: "12. capacity()",
      paragraphs: [
        "Vector provides a capacity() method that returns the amount of storage currently available for elements before the Vector needs to grow.",
        "Capacity and size are different concepts."
      ],

      code: {
        language: "java",
        code: `Vector<Integer> numbers = new Vector<>(10);

numbers.add(10);
numbers.add(20);

System.out.println("Size: " + numbers.size());
System.out.println("Capacity: " + numbers.capacity());`
      },

      output: `Size: 2
Capacity: 10`
    },

    // =========================================================
    // 13. isEmpty
    // =========================================================
    {
      id: "vector-is-empty",
      title: "13. isEmpty()",
      paragraphs: [
        "The isEmpty() method checks whether the Vector contains zero elements."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

System.out.println(names.isEmpty());

names.add("Java");

System.out.println(names.isEmpty());`
      },

      output: `true
false`
    },

    // =========================================================
    // 14. CONTAINS
    // =========================================================
    {
      id: "vector-contains",
      title: "14. contains()",
      paragraphs: [
        "The contains() method checks whether an element exists in the Vector.",
        "It uses equality comparison to determine whether a matching element exists."
      ],

      code: {
        language: "java",
        code: `Vector<String> languages = new Vector<>();

languages.add("Java");
languages.add("Python");

System.out.println(languages.contains("Java"));
System.out.println(languages.contains("C++"));`
      },

      output: `true
false`
    },

    // =========================================================
    // 15. INDEXOF
    // =========================================================
    {
      id: "vector-index-of",
      title: "15. indexOf()",
      paragraphs: [
        "indexOf() returns the index of the first matching element.",
        "lastIndexOf() returns the index of the last matching element."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Alice");

System.out.println(names.indexOf("Alice"));
System.out.println(names.lastIndexOf("Alice"));`
      },

      output: `0
2`
    },

    // =========================================================
    // 16. ITERATING VECTOR
    // =========================================================
    {
      id: "vector-iteration",
      title: "16. Iterating a Vector",
      paragraphs: [
        "Vector can be traversed using a traditional for loop, enhanced for loop, Iterator, ListIterator, Enumeration, or forEach()."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

for (String name : names) {
    System.out.println(name);
}`
      },

      output: `Alice
Bob
Charlie`
    },

    // =========================================================
    // 17. ITERATOR
    // =========================================================
    {
      id: "vector-iterator",
      title: "17. Iterator",
      paragraphs: [
        "Iterator provides a standard way to traverse a Vector.",
        "It also supports safe removal of the current element using iterator.remove()."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

Iterator<String> iterator =
        names.iterator();

while (iterator.hasNext()) {

    String name = iterator.next();

    if (name.equals("Bob")) {
        iterator.remove();
    }
}

System.out.println(names);`
      },

      output: `[Alice, Charlie]`
    },

    // =========================================================
    // 18. ENUMERATION
    // =========================================================
    {
      id: "vector-enumeration",
      title: "18. Enumeration",
      paragraphs: [
        "Enumeration is a legacy interface traditionally associated with Vector and other older Java APIs.",
        "It provides hasMoreElements() and nextElement() for traversal.",
        "For modern code, Iterator and the enhanced for loop are usually preferred."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

Enumeration<String> enumeration =
        names.elements();

while (enumeration.hasMoreElements()) {
    System.out.println(
        enumeration.nextElement()
    );
}`
      },

      output: `Alice
Bob
Charlie`
    },

    // =========================================================
    // 19. FOREACH
    // =========================================================
    {
      id: "vector-foreach",
      title: "19. forEach()",
      paragraphs: [
        "Vector supports the forEach() method inherited through the Collection API.",
        "It is useful for simple read-only traversal or performing an action on each element."
      ],

      code: {
        language: "java",
        code: `Vector<String> names = new Vector<>();

names.add("Alice");
names.add("Bob");
names.add("Charlie");

names.forEach(name ->
    System.out.println(name)
);`
      },

      output: `Alice
Bob
Charlie`
    },

    // =========================================================
    // 20. SYNCHRONIZATION
    // =========================================================
    {
      id: "vector-synchronization",
      title: "20. Vector Synchronization",
      paragraphs: [
        "One of the major historical characteristics of Vector is that many of its legacy methods are synchronized.",
        "This means individual method calls are synchronized on the Vector object.",
        "Synchronization can provide thread-safety for individual operations, but it does not automatically make every multi-step operation atomic."
      ],

      code: {
        language: "java",
        code: `Vector<Integer> numbers =
        new Vector<>();

numbers.add(10);
numbers.add(20);

System.out.println(numbers);`
      },

      bullets: [
        "Vector's legacy methods are synchronized.",
        "Synchronization introduces locking overhead.",
        "Individual synchronized method calls are protected from concurrent access by the Vector's intrinsic lock.",
        "Compound operations involving multiple calls may still require external synchronization.",
        "For modern concurrent designs, choose a collection based on the actual concurrency requirement."
      ]
    },

    // =========================================================
    // 21. INTERNAL WORKING
    // =========================================================
    {
      id: "vector-internal-working",
      title: "21. Internal Working of Vector",
      paragraphs: [
        "Vector internally stores elements in an array.",
        "When elements are added and the current internal array becomes full, Vector grows its internal storage.",
        "Unlike LinkedList, Vector does not create a separate node object for every element."
      ],

      code: {
        language: "text",
        code: `Vector
   |
   v
Internal Array
   |
   +--- [A]
   +--- [B]
   +--- [C]
   +--- [D]
   |
   v
When capacity is full
   |
   v
Create larger array
   |
   v
Copy existing elements
   |
   v
Continue adding`
      },

      bullets: [
        "Elements are stored in an internal array.",
        "Index-based access is efficient.",
        "Insertion in the middle requires shifting elements.",
        "Growth requires allocation of a larger array and copying elements.",
        "Vector also exposes capacity-related legacy methods."
      ]
    },

    // =========================================================
    // 22. CAPACITY AND GROWTH
    // =========================================================
    {
      id: "vector-capacity-growth",
      title: "22. Capacity and Growth",
      paragraphs: [
        "Vector separates logical size from internal capacity.",
        "When the Vector needs more space, it grows according to its capacity-growth rules.",
        "If a positive capacity increment was supplied to the constructor, that increment can be used when growing the Vector. Otherwise, Vector uses its default growth behavior.",
        "The exact implementation details can vary by Java version, so application code should not depend on a particular growth ratio."
      ],

      code: {
        language: "java",
        code: `Vector<Integer> numbers =
        new Vector<>(3, 2);

numbers.add(10);
numbers.add(20);
numbers.add(30);

System.out.println(
    "Capacity: " + numbers.capacity()
);

numbers.add(40);

System.out.println(
    "Capacity: " + numbers.capacity()
);`
      },

      bullets: [
        "Initial capacity controls the starting internal storage.",
        "Capacity increment can control growth when the Vector expands.",
        "capacity() reports internal capacity.",
        "size() reports the number of stored elements.",
        "Avoid depending on implementation-specific growth behavior."
      ]
    },

    // =========================================================
    // 23. VECTOR VS ARRAYLIST
    // =========================================================
    {
      id: "vector-vs-arraylist",
      title: "23. Vector vs ArrayList",
      paragraphs: [
        "Vector and ArrayList are both array-backed List implementations.",
        "The major historical difference is synchronization: Vector's legacy methods are synchronized, while ArrayList is not synchronized by default.",
        "For ordinary single-threaded list usage, ArrayList is generally the standard choice."
      ],

      code: {
        language: "text",
        code: `ArrayList
    |
    +-- Dynamic array
    +-- Not synchronized by default
    +-- Modern general-purpose List

Vector
    |
    +-- Dynamic array
    +-- Legacy synchronized methods
    +-- Legacy collection class`
      },

      bullets: [
        "Both provide index-based access.",
        "Both allow duplicates.",
        "Both preserve insertion order.",
        "Both allow null values.",
        "ArrayList is not synchronized by default.",
        "Vector has synchronized legacy methods.",
        "ArrayList is generally preferred for normal List usage.",
        "Vector may appear in legacy codebases."
      ]
    },

    // =========================================================
    // 24. VECTOR VS LINKEDLIST
    // =========================================================
    {
      id: "vector-vs-linkedlist",
      title: "24. Vector vs LinkedList",
      paragraphs: [
        "Vector and LinkedList use fundamentally different internal data structures.",
        "Vector is backed by an array, while LinkedList is based on linked nodes.",
        "This results in different performance characteristics."
      ],

      code: {
        language: "text",
        code: `Vector
  |
  v
Array
[A][B][C][D]

LinkedList
  |
  v
Node -> Node -> Node -> Node`
      },

      bullets: [
        "Vector provides fast indexed access.",
        "LinkedList provides efficient insertion/removal at known node positions.",
        "Vector requires contiguous array storage.",
        "LinkedList uses additional memory for node references.",
        "LinkedList is also a Queue and Deque implementation.",
        "Vector is primarily an indexed List implementation."
      ]
    },

    // =========================================================
    // 25. THREAD SAFETY
    // =========================================================
    {
      id: "vector-thread-safety",
      title: "25. Thread-Safety Implications",
      paragraphs: [
        "Vector's synchronization is one reason it historically appeared in multi-threaded programs.",
        "However, synchronized individual methods should not be confused with making a complete business operation thread-safe.",
        "For example, checking a condition and then modifying the Vector can require coordination across multiple operations."
      ],

      code: {
        language: "java",
        code: `Vector<Integer> numbers =
        new Vector<>();

numbers.add(10);

synchronized (numbers) {

    if (!numbers.contains(20)) {
        numbers.add(20);
    }
}

System.out.println(numbers);`
      },

      bullets: [
        "Individual synchronized operations do not automatically make compound operations atomic.",
        "External synchronization may be required for compound actions.",
        "Choose concurrency collections according to the application's actual requirements.",
        "Do not use Vector simply because an application has multiple threads."
      ]
    },

    // =========================================================
    // 26. PERFORMANCE
    // =========================================================
    {
      id: "vector-performance",
      title: "26. Vector Performance",
      paragraphs: [
        "Vector is array-backed, so its basic performance characteristics are similar to ArrayList.",
        "Synchronization adds overhead compared with an unsynchronized ArrayList in many ordinary use cases."
      ],

      code: {
        language: "text",
        code: `Operation                  Average Complexity

get(index)                 O(1)

set(index, value)          O(1)

add(value)                 O(1) amortized

add(index, value)          O(n)

remove(index)              O(n)

remove(object)             O(n)

contains(value)            O(n)

indexOf(value)             O(n)

iteration                  O(n)`
      },

      bullets: [
        "get(index) is generally O(1).",
        "set(index, value) is generally O(1).",
        "Adding at the end is O(1) amortized.",
        "Insertion at an arbitrary index is O(n).",
        "Removal by index is O(n) because elements may need to shift.",
        "contains() is O(n).",
        "indexOf() is O(n).",
        "Resizing can temporarily require O(n) work."
      ]
    },

    // =========================================================
    // 27. LEGACY NATURE
    // =========================================================
    {
      id: "vector-legacy",
      title: "27. Why is Vector Considered Legacy?",
      paragraphs: [
        "Vector is considered a legacy collection because it predates the modern Java Collections Framework.",
        "It was retrofitted to implement the List interface when the Collections Framework was introduced.",
        "It remains part of Java and is still encountered in existing applications, but new code commonly uses ArrayList when synchronization is not required."
      ],

      bullets: [
        "Vector existed before the Collections Framework.",
        "It was adapted to work with modern collection interfaces.",
        "Its synchronized methods are a historical design characteristic.",
        "ArrayList is commonly preferred for ordinary list usage.",
        "You should still understand Vector for interviews and legacy code maintenance."
      ]
    },

    // =========================================================
    // 28. COMMON MISTAKES
    // =========================================================
    {
      id: "vector-common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "Vector is easy to use, but several interview and real-world mistakes are common."
      ],

      bullets: [
        "Confusing size with capacity.",
        "Assuming synchronization makes every sequence of operations atomic.",
        "Using Vector automatically whenever multiple threads exist.",
        "Using legacy Enumeration when Iterator or enhanced for is more appropriate.",
        "Depending on undocumented capacity-growth behavior.",
        "Forgetting that insertion/removal in the middle requires shifting elements.",
        "Using raw Vector instead of Vector<T>.",
        "Assuming Vector is faster than ArrayList because it is synchronized.",
        "Assuming synchronized collection methods eliminate all concurrency problems."
      ],

      code: {
        language: "java",
        code: `// Avoid raw types

Vector vector = new Vector();

vector.add("Java");
vector.add(100);

// Prefer

Vector<String> languages =
        new Vector<>();

languages.add("Java");`
      }
    },

    // =========================================================
    // 29. BEST PRACTICES
    // =========================================================
    {
      id: "vector-best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "Vector is mainly useful when working with legacy code or when its specific synchronized behavior is intentionally required.",
        "For new applications, select the collection implementation based on the required access pattern and concurrency model."
      ],

      bullets: [
        "Prefer the List interface for variable declarations.",
        "Use generics such as Vector<String>.",
        "Prefer add() over the legacy addElement() API.",
        "Prefer Iterator or enhanced for over Enumeration in modern code.",
        "Do not rely on a particular internal growth ratio.",
        "Use ArrayList for ordinary non-concurrent list usage.",
        "Use an appropriate concurrent collection when the application has real concurrent-access requirements.",
        "Consider ArrayDeque for stack/queue workloads instead of legacy Stack/Vector-based designs.",
        "Understand the difference between size and capacity.",
        "Use initial capacity when a reliable approximate size is known and resizing cost matters."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        new Vector<>();

names.add("Alice");
names.add("Bob");

for (String name : names) {
    System.out.println(name);
}`
      }
    },

    // =========================================================
    // 30. KEY POINTS + INTERVIEW QUESTIONS
    // =========================================================
    {
      id: "vector-key-points-interview",
      title: "30. Key Points + Interview Questions",
      paragraphs: [
        "Vector is a synchronized, dynamically growing, array-backed List implementation from Java's legacy collection APIs.",
        "For interviews, focus on Vector's hierarchy, synchronization, internal array, capacity, performance, and differences from ArrayList."
      ],

      bullets: [
        "Vector implements List.",
        "Vector extends AbstractList.",
        "Vector is array-backed.",
        "Vector maintains insertion order.",
        "Vector allows duplicate elements.",
        "Vector allows null values.",
        "Vector supports indexed access.",
        "Vector provides capacity().",
        "Vector's legacy methods are synchronized.",
        "Vector is generally considered a legacy collection.",
        "ArrayList is usually preferred for ordinary List usage.",
        "Vector growth can be controlled using capacity increment.",
        "Vector supports Iterator, ListIterator, Enumeration, and forEach()."
      ],

      interviewQuestions: [
        {
          question: "What is Vector in Java?",
          answer:
            "Vector is a legacy, dynamically growing, array-backed implementation of the List interface. Its legacy methods are synchronized."
        },
        {
          question: "Is Vector synchronized?",
          answer:
            "Yes. Vector's legacy methods are synchronized. However, this does not mean that arbitrary sequences of multiple operations are automatically atomic."
        },
        {
          question: "What is the difference between Vector and ArrayList?",
          answer:
            "Both are dynamically growing array-backed Lists. Vector's legacy methods are synchronized, while ArrayList is not synchronized by default. ArrayList is generally preferred for ordinary non-concurrent list usage."
        },
        {
          question: "Is Vector thread-safe?",
          answer:
            "Individual synchronized Vector method calls are protected by synchronization, but compound operations may still require external coordination. Thread safety should be considered at the operation or workflow level."
        },
        {
          question: "Does Vector allow duplicate elements?",
          answer:
            "Yes. Vector implements List, so duplicate elements are allowed."
        },
        {
          question: "Does Vector allow null values?",
          answer:
            "Yes. Vector can store null values."
        },
        {
          question: "What is the difference between size and capacity in Vector?",
          answer:
            "Size is the number of elements currently stored. Capacity is the amount of internal array storage currently available before the Vector needs to grow."
        },
        {
          question: "What is the default capacity of Vector?",
          answer:
            "A no-argument Vector constructor historically starts with a capacity of 10. Code should generally use the public API rather than depend on implementation-specific capacity behavior."
        },
        {
          question: "What happens when Vector becomes full?",
          answer:
            "Vector grows its internal array to accommodate additional elements. The exact growth behavior depends on the constructor's capacity-increment configuration and implementation."
        },
        {
          question: "What is capacityIncrement in Vector?",
          answer:
            "capacityIncrement specifies how much the Vector should grow when it needs additional capacity. If it is zero or not specified, Vector uses its default growth strategy."
        },
        {
          question: "What is the time complexity of get() in Vector?",
          answer:
            "get(index) is generally O(1) because Vector uses an array internally."
        },
        {
          question: "What is the time complexity of add(index, element)?",
          answer:
            "Generally O(n), because elements after the insertion point may need to be shifted."
        },
        {
          question: "What is the time complexity of remove(index)?",
          answer:
            "Generally O(n), because elements after the removed element may need to be shifted."
        },
        {
          question: "What is Enumeration?",
          answer:
            "Enumeration is a legacy Java interface traditionally used with Vector for traversing elements. Modern code generally prefers Iterator or the enhanced for loop."
        },
        {
          question: "Can Vector be used with the List interface?",
          answer:
            "Yes. Vector implements List, so it can be referenced using List<T>."
        },
        {
          question: "Is Vector faster than ArrayList?",
          answer:
            "Not generally. Both are array-backed Lists, but Vector's synchronization can add overhead. ArrayList is normally preferred when synchronization is not required."
        },
        {
          question: "Why is Vector called a legacy collection?",
          answer:
            "Vector existed before the Java Collections Framework. It was later integrated with the framework by implementing List and related interfaces."
        },
        {
          question: "Can Vector be synchronized further?",
          answer:
            "Yes, external synchronization can be used when a compound operation must be protected as a single atomic action."
        },
        {
          question: "What should be used instead of Vector in modern Java?",
          answer:
            "For ordinary non-concurrent List usage, ArrayList is generally preferred. For specialized concurrent requirements, choose an appropriate concurrent collection rather than automatically using Vector."
        },
        {
          question: "Why shouldn't we depend on Vector's internal growth ratio?",
          answer:
            "Growth behavior is an implementation detail and can vary between Java versions or implementations. Application code should rely on the documented API rather than a particular growth factor."
        }
      ]
    }
  ]
};