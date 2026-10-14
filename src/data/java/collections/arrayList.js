export const arrayList = {
  id: "arraylist",
  slug:"arraylist",
  title: "ArrayList in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn ArrayList in Java from basic operations to internal working, dynamic resizing, iteration, sorting, custom objects, performance, comparisons, common mistakes, and interview questions.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "what-is-arraylist",
      title: "1. What is ArrayList?",
      paragraphs: [
        "ArrayList is a resizable-array implementation of the List interface in Java.",
        "Unlike a normal array, an ArrayList can dynamically grow and shrink as elements are added or removed.",
        "ArrayList maintains insertion order and allows duplicate elements."
      ],
      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("React");

System.out.println(names);`
      },
      output: `[Java, Spring, React]`,
      bullets: [
        "ArrayList implements List.",
        "It maintains insertion order.",
        "It allows duplicate elements.",
        "It allows null elements.",
        "It provides fast indexed access.",
        "It is not synchronized by default."
      ]
    },

    {
      id: "arraylist-hierarchy",
      title: "2. ArrayList Hierarchy",
      paragraphs: [
        "ArrayList is part of the Java Collections Framework and implements several interfaces through its inheritance hierarchy."
      ],
      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
List
   |
ArrayList`
      },
      bullets: [
        "Iterable provides iterator().",
        "Collection defines common collection operations.",
        "List defines ordered collection behavior.",
        "ArrayList provides the concrete implementation."
      ]
    },

    {
      id: "creating-arraylist",
      title: "3. Creating an ArrayList",
      paragraphs: [
        "The recommended approach is to declare the variable using the List interface and create an ArrayList implementation."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();`
      },
      bullets: [
        "List is the interface.",
        "ArrayList is the implementation.",
        "The diamond operator <> allows Java to infer the generic type."
      ]
    },

    {
      id: "arraylist-generic",
      title: "4. ArrayList with Generics",
      paragraphs: [
        "Generics specify the type of elements that the ArrayList can store."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");

// Compile-time error
// names.add(100);`
      },
      bullets: [
        "Generics provide compile-time type safety.",
        "List<String> stores String objects.",
        "List<Integer> stores Integer objects.",
        "Raw ArrayList types should generally be avoided."
      ]
    },

    {
      id: "add-elements",
      title: "5. Adding Elements",
      paragraphs: [
        "The add() method adds an element to the end of the ArrayList."
      ],
      code: {
        language: "java",
        code: `List<String> languages =
    new ArrayList<>();

languages.add("Java");
languages.add("Python");
languages.add("JavaScript");

System.out.println(languages);`
      },
      output: `[Java, Python, JavaScript]`,
      bullets: [
        "Elements are added in insertion order.",
        "add(element) appends the element to the end.",
        "Duplicate values are allowed."
      ]
    },

    {
      id: "add-index",
      title: "6. Adding an Element at a Specific Index",
      paragraphs: [
        "ArrayList also provides add(index, element) to insert an element at a specific position."
      ],
      code: {
        language: "java",
        code: `List<String> languages =
    new ArrayList<>(
        List.of("Java", "React")
    );

languages.add(1, "Spring");

System.out.println(languages);`
      },
      output: `[Java, Spring, React]`,
      bullets: [
        "The index must be valid.",
        "Existing elements from that position are shifted to the right.",
        "Insertion at a middle index is generally O(n)."
      ]
    },

    {
      id: "access-elements",
      title: "7. Accessing Elements with get()",
      paragraphs: [
        "The get() method retrieves an element using its zero-based index."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

String first = names.get(0);
String second = names.get(1);

System.out.println(first);
System.out.println(second);`
      },
      output: `Java
Spring`,
      bullets: [
        "ArrayList uses zero-based indexing.",
        "get(index) provides fast indexed access.",
        "An invalid index causes IndexOutOfBoundsException."
      ]
    },

    {
      id: "update-elements",
      title: "8. Updating Elements with set()",
      paragraphs: [
        "The set() method replaces the element at a specified index."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

names.set(1, "Spring Boot");

System.out.println(names);`
      },
      output: `[Java, Spring Boot, React]`,
      bullets: [
        "set() replaces an existing element.",
        "It does not increase the size.",
        "The specified index must already exist."
      ]
    },

    {
      id: "remove-element",
      title: "9. Removing Elements",
      paragraphs: [
        "ArrayList provides remove() methods for removing elements by index or by object."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

names.remove(1);

System.out.println(names);`
      },
      output: `[Java, React]`,
      bullets: [
        "remove(index) removes an element by position.",
        "Removing an element causes later elements to shift left.",
        "Removing from the middle is generally O(n)."
      ]
    },

    {
      id: "remove-object",
      title: "10. Removing an Object",
      paragraphs: [
        "The remove(Object) method removes the first matching element."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "Java")
    );

names.remove("Java");

System.out.println(names);`
      },
      output: `[Spring, Java]`,
      bullets: [
        "remove(Object) uses equality to find the element.",
        "Only the first matching occurrence is removed.",
        "If no matching element exists, the list remains unchanged."
      ]
    },

    {
      id: "integer-remove",
      title: "11. Important: remove() with Integer",
      paragraphs: [
        "When an ArrayList contains Integer objects, remove(int) and remove(Object) can sometimes cause confusion because of Java method overloading."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>(
        List.of(10, 20, 30)
    );

// Removes element at index 1
numbers.remove(1);

System.out.println(numbers);`
      },
      output: `[10, 30]`,
      bullets: [
        "remove(1) is interpreted as remove(index).",
        "To remove the Integer value 20, use Integer.valueOf(20)."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>(
        List.of(10, 20, 30)
    );

numbers.remove(Integer.valueOf(20));

System.out.println(numbers);`
      },
      output: `[10, 30]`
    },

    {
      id: "size",
      title: "12. size()",
      paragraphs: [
        "The size() method returns the number of elements currently stored in the ArrayList."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");

System.out.println(names.size());`
      },
      output: `2`,
      bullets: [
        "size() returns the number of stored elements.",
        "It is different from the internal capacity of the ArrayList."
      ]
    },

    {
      id: "contains",
      title: "13. contains()",
      paragraphs: [
        "The contains() method checks whether the ArrayList contains a specified element."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

System.out.println(
    names.contains("Java")
);

System.out.println(
    names.contains("Python")
);`
      },
      output: `true
false`,
      bullets: [
        "contains() returns true or false.",
        "It uses equals() to compare objects.",
        "Searching an ArrayList is generally O(n)."
      ]
    },

    {
      id: "indexof-lastindexof",
      title: "14. indexOf() and lastIndexOf()",
      paragraphs: [
        "indexOf() returns the first index of a matching element, while lastIndexOf() returns the last matching index."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "Java", "React")
    );

System.out.println(
    names.indexOf("Java")
);

System.out.println(
    names.lastIndexOf("Java")
);`
      },
      output: `0
2`,
      bullets: [
        "indexOf() searches from the beginning.",
        "lastIndexOf() searches from the end.",
        "Both are generally O(n)."
      ]
    },

    {
      id: "isempty-clear",
      title: "15. isEmpty() and clear()",
      paragraphs: [
        "isEmpty() checks whether the list contains no elements. clear() removes all elements from the list."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");

System.out.println(names.isEmpty());

names.clear();

System.out.println(names.isEmpty());
System.out.println(names);`
      },
      output: `false
true
[]`,
      bullets: [
        "isEmpty() returns a boolean.",
        "clear() removes all elements.",
        "clear() does not make the ArrayList variable itself null."
      ]
    },

    {
      id: "iterate-for",
      title: "16. Iterating ArrayList with for Loop",
      paragraphs: [
        "Because ArrayList supports indexed access, a traditional for loop can be used to access elements by index."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

for (int i = 0; i < names.size(); i++) {
    System.out.println(names.get(i));
}`
      },
      output: `Java
Spring
React`
    },

    {
      id: "iterate-enhanced",
      title: "17. Iterating with Enhanced for Loop",
      paragraphs: [
        "The enhanced for loop provides a simpler way to traverse an ArrayList when the index is not required."
      ],
      code: {
        language: "java",
        code: `for (String name : names) {
    System.out.println(name);
}`
      },
      bullets: [
        "Simple and readable.",
        "Useful when the index is not needed.",
        "Uses the collection's iteration mechanism."
      ]
    },

    {
      id: "iterator-arraylist",
      title: "18. Iterating with Iterator",
      paragraphs: [
        "ArrayList supports Iterator through the Iterable and Collection hierarchy."
      ],
      code: {
        language: "java",
        code: `Iterator<String> iterator =
    names.iterator();

while (iterator.hasNext()) {

    String name = iterator.next();

    System.out.println(name);
}`
      },
      bullets: [
        "hasNext() checks for another element.",
        "next() retrieves the next element.",
        "Iterator can safely remove the current element using remove()."
      ]
    },

    {
      id: "listiterator",
      title: "19. ListIterator",
      paragraphs: [
        "ListIterator is a specialized iterator for List implementations. Unlike Iterator, it can move in both forward and backward directions."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

ListIterator<String> iterator =
    names.listIterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

while (iterator.hasPrevious()) {
    System.out.println(iterator.previous());
}`
      },
      bullets: [
        "Iterator → mainly forward traversal.",
        "ListIterator → forward and backward traversal.",
        "ListIterator can add and set elements during iteration.",
        "ListIterator is available for List implementations."
      ]
    },

    {
      id: "foreach",
      title: "20. forEach()",
      paragraphs: [
        "ArrayList can also be traversed using the forEach() method and a lambda expression."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(
        List.of("Java", "Spring", "React")
    );

names.forEach(
    name -> System.out.println(name)
);`
      },
      output: `Java
Spring
React`
    },

    {
      id: "sort-arraylist",
      title: "21. Sorting an ArrayList",
      paragraphs: [
        "ArrayList can be sorted using Collections.sort() or the List.sort() method."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>(
        List.of(40, 10, 30, 20)
    );

Collections.sort(numbers);

System.out.println(numbers);`
      },
      output: `[10, 20, 30, 40]`,
      bullets: [
        "Collections.sort() uses natural ordering.",
        "List.sort() can also be used.",
        "For custom objects, Comparable or Comparator can define ordering."
      ]
    },

    {
      id: "descending-sort",
      title: "22. Descending Order",
      paragraphs: [
        "Comparator.reverseOrder() can be used to sort elements in reverse natural order."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>(
        List.of(40, 10, 30, 20)
    );

numbers.sort(
    Comparator.reverseOrder()
);

System.out.println(numbers);`
      },
      output: `[40, 30, 20, 10]`
    },

    {
      id: "custom-object",
      title: "23. ArrayList with Custom Objects",
      paragraphs: [
        "ArrayList can store objects created from user-defined classes."
      ],
      code: {
        language: "java",
        code: `class Employee {

    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

List<Employee> employees =
    new ArrayList<>();

employees.add(
    new Employee(101, "Ravi")
);

employees.add(
    new Employee(102, "Anil")
);`
      },
      bullets: [
        "Generics provide type safety.",
        "ArrayList can store any object type.",
        "Custom objects can be sorted using Comparator."
      ]
    },

    {
      id: "custom-object-sorting",
      title: "24. Sorting Custom Objects",
      paragraphs: [
        "Comparator can be used to sort custom objects by a particular field."
      ],
      code: {
        language: "java",
        code: `employees.sort(
    Comparator.comparing(
        Employee::getName
    )
);`
      },
      bullets: [
        "The employees are sorted by name.",
        "Another Comparator can sort by ID.",
        "The same Employee class can support multiple sorting strategies."
      ]
    },

    {
      id: "equals-arraylist",
      title: "25. equals() and ArrayList",
      paragraphs: [
        "ArrayList uses equals() when methods such as contains(), indexOf(), and remove(Object) need to compare elements."
      ],
      code: {
        language: "java",
        code: `class Product {

    private int id;

    public Product(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Product)) {
            return false;
        }

        Product other =
            (Product) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

List<Product> products =
    new ArrayList<>();

products.add(new Product(101));

System.out.println(
    products.contains(new Product(101))
);`
      },
      output: `true`,
      bullets: [
        "contains() relies on equality comparison.",
        "Custom objects should implement equals() correctly when logical equality is required.",
        "Implement hashCode() consistently when equals() is overridden."
      ]
    },

    {
      id: "arraylist-capacity",
      title: "26. Size vs Capacity",
      paragraphs: [
        "ArrayList has a current size and an internal capacity. Size represents the number of elements currently stored. Capacity represents the amount of space currently available in the internal array before another resize may be required.",
        "Capacity is an implementation detail and should not be confused with size."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");

System.out.println(names.size());`
      },
      output: `2`,
      bullets: [
        "size() tells how many elements are stored.",
        "Capacity refers to internal storage.",
        "Capacity can be larger than size.",
        "ArrayList grows when its internal storage needs more space."
      ]
    },

    {
      id: "initial-capacity",
      title: "27. Initial Capacity",
      paragraphs: [
        "ArrayList provides a constructor that allows an initial capacity to be specified.",
        "This can be useful when the approximate number of elements is already known and can reduce repeated growth operations."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>(100);`
      },
      bullets: [
        "100 is the initial capacity, not the list size.",
        "The list is still empty after construction.",
        "Specifying capacity does not add elements."
      ]
    },

    {
      id: "dynamic-resizing",
      title: "28. Dynamic Resizing",
      paragraphs: [
        "When an ArrayList needs more space than its current internal array provides, it grows by allocating a larger internal array and copying existing elements into it.",
        "The exact growth policy is an implementation detail and should not be relied upon as a fixed percentage across Java versions."
      ],
      code: {
        language: "text",
        code: `ArrayList
    |
    v
Internal array
    |
    | capacity available?
    |
   YES ----------------> add element
    |
    NO
    |
    v
Create larger array
    |
    v
Copy existing elements
    |
    v
Add new element`
      },
      bullets: [
        "Growing requires allocating new storage.",
        "Existing elements are copied.",
        "A single resize can take O(n).",
        "Repeated appends are O(1) amortized."
      ]
    },

    {
      id: "arraylist-internal-working",
      title: "29. How Does ArrayList Work Internally?",
      paragraphs: [
        "ArrayList is backed by an array-like internal storage. The list uses this storage to provide indexed access.",
        "When an element is added at the end and capacity is available, the element can be placed directly into the next available position.",
        "When the internal storage is full, ArrayList grows its storage and copies the existing elements."
      ],
      code: {
        language: "text",
        code: `ArrayList

element 0
element 1
element 2
element 3
    |
    v
Internal array

get(2)
    |
    v
Direct index access
    |
    v
element 2`
      },
      bullets: [
        "Indexed access is fast.",
        "Middle insertion requires shifting elements.",
        "Middle removal requires shifting elements.",
        "Growing the internal array requires copying."
      ]
    },

    {
      id: "add-complexity",
      title: "30. ArrayList Time Complexity",
      paragraphs: [
        "Understanding the complexity of ArrayList operations is important for interviews and for choosing the correct data structure."
      ],
      code: {
        language: "text",
        code: `get(index)       → O(1)

set(index, value) → O(1)

add(element)      → O(1) amortized

add(index, value) → O(n)

remove(index)     → O(n)

contains(value)   → O(n)

indexOf(value)    → O(n)

clear()           → O(n)`
      },
      bullets: [
        "Indexed access is O(1).",
        "Appending is O(1) amortized.",
        "Insertion in the middle is O(n).",
        "Removal from the middle is O(n).",
        "Searching is O(n)."
      ]
    },

    {
      id: "arraylist-array",
      title: "31. ArrayList vs Array",
      paragraphs: [
        "Array and ArrayList both provide indexed access, but they have different characteristics."
      ],
      code: {
        language: "text",
        code: `Array
    |
    +-- Fixed length
    +-- Can store primitives directly
    +-- Low-level structure
    +-- .length


ArrayList
    |
    +-- Dynamic size
    +-- Stores objects
    +-- Rich collection API
    +-- .size()`
      },
      bullets: [
        "Array → fixed size.",
        "ArrayList → dynamically resizable.",
        "Array → can store primitive values directly.",
        "ArrayList → uses wrapper classes for primitive values.",
        "ArrayList provides collection methods such as add(), remove(), contains(), and sort()."
      ]
    },

    {
      id: "arraylist-linkedlist",
      title: "32. ArrayList vs LinkedList",
      paragraphs: [
        "ArrayList and LinkedList both implement List, but their underlying structures and performance characteristics differ."
      ],
      code: {
        language: "text",
        code: `ArrayList
    |
    +-- Array-backed
    +-- Fast get(index)
    +-- Middle insertion/removal requires shifting
    +-- Usually preferred for general-purpose list usage


LinkedList
    |
    +-- Node-based
    +-- Indexed access requires traversal
    +-- Supports efficient operations at known ends
    +-- Can also act as a Deque`
      },
      bullets: [
        "ArrayList → O(1) indexed access.",
        "LinkedList → O(n) indexed access.",
        "ArrayList is often a good default List implementation.",
        "Choose based on actual access and modification patterns."
      ]
    },

    {
      id: "arraylist-null",
      title: "33. Can ArrayList Store null?",
      paragraphs: [
        "Yes. ArrayList permits null elements."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add(null);
names.add("Spring");

System.out.println(names);`
      },
      output: `[Java, null, Spring]`,
      bullets: [
        "ArrayList permits null values.",
        "Multiple null values can be stored.",
        "Whether null is appropriate depends on application requirements."
      ]
    },

    {
      id: "arraylist-duplicates",
      title: "34. Can ArrayList Contain Duplicates?",
      paragraphs: [
        "Yes. ArrayList allows duplicate elements because List represents an ordered sequence rather than a collection of unique values."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("Java");

System.out.println(names);`
      },
      output: `[Java, Spring, Java]`
    },

    {
      id: "arraylist-thread-safety",
      title: "35. Is ArrayList Thread-Safe?",
      paragraphs: [
        "ArrayList is not synchronized and is not thread-safe for concurrent structural modification by multiple threads.",
        "If multiple threads need coordinated access, an appropriate concurrent or synchronized collection strategy should be chosen."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();`
      },
      bullets: [
        "ArrayList is not synchronized by default.",
        "Do not assume ArrayList is safe for concurrent modification.",
        "The correct solution depends on the concurrency requirements."
      ]
    },

    {
      id: "common-mistakes",
      title: "36. Common ArrayList Mistakes",
      paragraphs: [
        "Several ArrayList mistakes commonly appear in beginner code and interviews."
      ],
      bullets: [
        "Using an invalid index with get(), set(), add(), or remove().",
        "Confusing size() with capacity.",
        "Calling remove(1) when intending to remove the Integer value 1.",
        "Modifying the list directly while iterating with an enhanced for loop.",
        "Using ArrayList when a different data structure better matches the access pattern.",
        "Assuming ArrayList is thread-safe.",
        "Using raw ArrayList instead of generics.",
        "Forgetting that contains() relies on equals().",
        "Assuming add(index, value) is O(1).",
        "Assuming ArrayList always has constant-time insertion anywhere."
      ]
    },

    {
      id: "best-practices",
      title: "37. ArrayList Best Practices",
      paragraphs: [
        "Good ArrayList usage means selecting it for the right access pattern and using the List interface where possible."
      ],
      bullets: [
        "Prefer List<T> on the left side of declarations.",
        "Use generics.",
        "Use an appropriate initial capacity when the expected size is known.",
        "Use get() for indexed access.",
        "Use Iterator when safe removal during iteration is required.",
        "Use Comparator for custom sorting.",
        "Override equals() and hashCode() correctly for custom value objects.",
        "Consider Big-O before choosing ArrayList for heavy insertion or removal workloads.",
        "Do not rely on implementation-specific capacity growth details."
      ],
      code: {
        language: "java",
        code: `List<Employee> employees =
    new ArrayList<>(100);

employees.add(
    new Employee(101, "Ravi")
);`
      }
    },

    {
      id: "key-points-interview",
      title: "38. Key Points and Interview Questions",
      paragraphs: [
        "ArrayList is one of the most commonly used List implementations in Java. Understanding its API, internal array-based structure, resizing behavior, iteration, and complexity is essential for Java interviews."
      ],
      bullets: [
        "ArrayList implements List.",
        "It maintains insertion order.",
        "It allows duplicate elements.",
        "It permits null elements.",
        "It provides O(1) indexed access.",
        "Appending is O(1) amortized.",
        "Middle insertion and removal are generally O(n).",
        "Searching is generally O(n).",
        "ArrayList is backed by resizable internal storage.",
        "ArrayList is not synchronized by default.",
        "ListIterator supports bidirectional traversal.",
        "ArrayList works with Comparable and Comparator for sorting.",
        "contains(), indexOf(), and remove(Object) rely on equality comparison."
      ],
      interviewQuestions: [
        {
          question: "What is ArrayList?",
          answer:
            "ArrayList is a resizable-array implementation of the List interface. It maintains insertion order, allows duplicates, and provides fast indexed access."
        },
        {
          question: "What is the underlying data structure of ArrayList?",
          answer:
            "ArrayList uses an internal array-like structure to store its elements."
        },
        {
          question: "Why is ArrayList dynamically resizable?",
          answer:
            "When its internal storage becomes insufficient, ArrayList allocates larger storage and copies the existing elements into it."
        },
        {
          question: "What is the time complexity of get(index) in ArrayList?",
          answer:
            "O(1), because ArrayList provides direct indexed access to its array-backed storage."
        },
        {
          question: "What is the complexity of add(element)?",
          answer:
            "It is O(1) amortized. Individual resizing operations can take O(n), but across many additions the average cost is constant."
        },
        {
          question: "What is the complexity of add(index, element)?",
          answer:
            "Generally O(n), because elements after the insertion position may need to be shifted."
        },
        {
          question: "What is the complexity of remove(index)?",
          answer:
            "Generally O(n), because elements after the removed position may need to be shifted."
        },
        {
          question: "What is the difference between size and capacity?",
          answer:
            "Size is the number of elements currently stored. Capacity refers to the internal storage available before another growth operation may be required."
        },
        {
          question: "Can ArrayList contain duplicate elements?",
          answer:
            "Yes. ArrayList implements List, which permits duplicate elements."
        },
        {
          question: "Can ArrayList contain null?",
          answer:
            "Yes. ArrayList permits null elements."
        },
        {
          question: "Is ArrayList thread-safe?",
          answer:
            "No. ArrayList is not synchronized by default and should not be assumed to be safe for concurrent structural modification."
        },
        {
          question: "What is the difference between Array and ArrayList?",
          answer:
            "An array generally has a fixed length and can store primitives directly. ArrayList is dynamically resizable, stores objects, and provides collection operations."
        },
        {
          question: "What is the difference between ArrayList and LinkedList?",
          answer:
            "ArrayList is array-backed and provides fast indexed access, while LinkedList is node-based and generally provides slower indexed access."
        },
        {
          question: "Why is ArrayList preferred in many cases over LinkedList?",
          answer:
            "ArrayList provides fast indexed access and good cache locality and is often a practical default when frequent indexed access or iteration is required."
        },
        {
          question: "What happens internally when ArrayList becomes full?",
          answer:
            "It allocates larger internal storage and copies the existing elements into the new storage before adding the new element."
        },
        {
          question: "Why is ArrayList add() called O(1) amortized?",
          answer:
            "Most append operations are constant time, while occasional resize operations take O(n). Averaged across many additions, the cost is O(1) amortized."
        },
        {
          question: "What is the difference between remove(1) and remove(Integer.valueOf(1))?",
          answer:
            "For List<Integer>, remove(1) selects the remove(int index) overload, while remove(Integer.valueOf(1)) selects remove(Object) and removes the value 1."
        },
        {
          question: "What is ListIterator?",
          answer:
            "ListIterator is a specialized iterator for lists that supports traversal in both forward and backward directions and also supports operations such as add, set, and remove."
        },
        {
          question: "Does ArrayList use equals()?",
          answer:
            "Yes. Operations such as contains(), indexOf(), lastIndexOf(), and remove(Object) use equality comparisons involving equals()."
        },
        {
          question: "Can ArrayList be sorted?",
          answer:
            "Yes. It can be sorted using Collections.sort(), List.sort(), Comparable, or Comparator depending on the required ordering."
        },
        {
          question: "Why should we use List<Employee> instead of ArrayList<Employee> as the variable type?",
          answer:
            "Programming to the List interface reduces coupling and makes it easier to change the implementation later if requirements change."
        },
        {
          question: "When should you avoid ArrayList?",
          answer:
            "Consider another collection when the application's dominant operations are better served by a different data structure, such as key-based lookup, uniqueness, sorted keys, or specialized queue/deque operations."
        }
      ]
    }
  ]
};