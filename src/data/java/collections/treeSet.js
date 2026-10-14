export const treeSet = {
  id: "treeset",
  slug: "treeset",
  title: "TreeSet in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn TreeSet in Java from sorted Set fundamentals to Red-Black Tree concepts, Comparable, Comparator, NavigableSet operations, range queries, first and last elements, custom objects, performance, comparisons, common mistakes, best practices, and interview questions.",
  estimatedTime: "75 min",

  sections: [
    // =========================================================
    // 1. WHAT IS TREESET?
    // =========================================================
    {
      id: "what-is-treeset",
      title: "1. What is TreeSet?",
      paragraphs: [
        "TreeSet is a Set implementation in Java that stores unique elements in sorted order.",
        "Unlike HashSet, which does not guarantee iteration order, TreeSet maintains elements according to their natural ordering or according to a Comparator supplied when the TreeSet is created.",
        "TreeSet implements NavigableSet, which provides additional navigation operations such as lower(), floor(), ceiling(), and higher()."
      ],

      bullets: [
        "TreeSet does not allow duplicate elements.",
        "TreeSet maintains sorted order.",
        "TreeSet implements NavigableSet.",
        "TreeSet is based on a tree structure.",
        "Elements use natural ordering or a Comparator.",
        "Basic add(), remove(), and contains() operations are generally O(log n).",
        "TreeSet does not allow null elements in normal natural-order usage."
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
        numbers.add(20);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30, 40]`
    },

    // =========================================================
    // 2. TREESET HIERARCHY
    // =========================================================
    {
      id: "treeset-hierarchy",
      title: "2. TreeSet Hierarchy",
      paragraphs: [
        "TreeSet implements NavigableSet and SortedSet, which provide sorted-set and navigation capabilities."
      ],

      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
   Set
   |
SortedSet
   |
NavigableSet
   |
TreeSet`
      },

      bullets: [
        "TreeSet implements NavigableSet.",
        "NavigableSet extends SortedSet.",
        "SortedSet extends Set.",
        "TreeSet provides sorted and navigation operations."
      ]
    },

    // =========================================================
    // 3. CREATING TREESET
    // =========================================================
    {
      id: "creating-treeset",
      title: "3. Creating a TreeSet",
      paragraphs: [
        "TreeSet can be created using its default constructor for natural ordering or by supplying a Comparator for custom ordering."
      ],

      code: {
        language: "java",
        code: `import java.util.TreeSet;

TreeSet<Integer> numbers =
        new TreeSet<>();

TreeSet<String> names =
        new TreeSet<>();

TreeSet<Integer> descending =
        new TreeSet<>(
            Comparator.reverseOrder()
        );`
      },

      bullets: [
        "The no-argument constructor uses natural ordering.",
        "A Comparator can define custom ordering.",
        "Generic types should be used.",
        "The Set or NavigableSet interface can be used as the reference type."
      ]
    },

    // =========================================================
    // 4. ADDING ELEMENTS
    // =========================================================
    {
      id: "treeset-add",
      title: "4. Adding Elements",
      paragraphs: [
        "The add() method inserts an element into the TreeSet while maintaining sorted order.",
        "If an equivalent element already exists according to the Set's ordering rules, the element is not added."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

System.out.println(numbers.add(30));
System.out.println(numbers.add(10));
System.out.println(numbers.add(20));
System.out.println(numbers.add(10));

System.out.println(numbers);`
      },

      output: `true
true
true
false
[10, 20, 30]`
    },

    // =========================================================
    // 5. DUPLICATE ELEMENTS
    // =========================================================
    {
      id: "treeset-duplicates",
      title: "5. Duplicate Elements",
      paragraphs: [
        "TreeSet does not allow duplicate elements.",
        "For TreeSet, ordering comparisons determine where an element belongs and whether it is considered equivalent to an existing element."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(10);

System.out.println(numbers);`
      },

      output: `[10, 20]`,

      bullets: [
        "Duplicates are not stored.",
        "add() returns false when the new element is considered equivalent to an existing element.",
        "With a Comparator, compare() returning 0 means the elements are considered equivalent for Set purposes."
      ]
    },

    // =========================================================
    // 6. SORTED ORDER
    // =========================================================
    {
      id: "treeset-sorted-order",
      title: "6. Sorted Order",
      paragraphs: [
        "TreeSet automatically maintains sorted order.",
        "For numbers, natural ordering produces ascending order.",
        "For strings, natural ordering follows their Comparable implementation."
      ],

      code: {
        language: "java",
        code: `TreeSet<String> languages =
        new TreeSet<>();

languages.add("Spring");
languages.add("Java");
languages.add("Python");
languages.add("C++");

System.out.println(languages);`
      },

      output: `[C++, Java, Python, Spring]`
    },

    // =========================================================
    // 7. NULL
    // =========================================================
    {
      id: "treeset-null",
      title: "7. null Elements",
      paragraphs: [
        "TreeSet generally does not permit null when using natural ordering because the tree needs to compare elements.",
        "Calling add(null) on a naturally ordered TreeSet results in NullPointerException."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);

// This causes NullPointerException:
//
// numbers.add(null);`
      },

      bullets: [
        "Do not use null as a TreeSet element when natural ordering is used.",
        "TreeSet needs ordering comparisons.",
        "The exact behavior of null with a custom Comparator depends on whether that Comparator explicitly supports null."
      ]
    },

    // =========================================================
    // 8. CONTAINS
    // =========================================================
    {
      id: "treeset-contains",
      title: "8. contains()",
      paragraphs: [
        "The contains() method checks whether an element exists in the TreeSet.",
        "TreeSet generally performs this operation in O(log n) time."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

System.out.println(
    numbers.contains(20)
);

System.out.println(
    numbers.contains(50)
);`
      },

      output: `true
false`
    },

    // =========================================================
    // 9. REMOVE
    // =========================================================
    {
      id: "treeset-remove",
      title: "9. remove()",
      paragraphs: [
        "The remove() method removes an element from the TreeSet while maintaining the tree's ordering properties."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

System.out.println(
    numbers.remove(20)
);

System.out.println(numbers);`
      },

      output: `true
[10, 30]`
    },

    // =========================================================
    // 10. SIZE
    // =========================================================
    {
      id: "treeset-size",
      title: "10. size()",
      paragraphs: [
        "The size() method returns the number of unique elements currently stored in the TreeSet."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(10);

System.out.println(numbers.size());`
      },

      output: `2`
    },

    // =========================================================
    // 11. ISEMPTY
    // =========================================================
    {
      id: "treeset-is-empty",
      title: "11. isEmpty()",
      paragraphs: [
        "The isEmpty() method checks whether the TreeSet contains no elements."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

System.out.println(numbers.isEmpty());

numbers.add(10);

System.out.println(numbers.isEmpty());`
      },

      output: `true
false`
    },

    // =========================================================
    // 12. CLEAR
    // =========================================================
    {
      id: "treeset-clear",
      title: "12. clear()",
      paragraphs: [
        "The clear() method removes all elements from the TreeSet."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

numbers.clear();

System.out.println(numbers);`
      },

      output: `[]`
    },

    // =========================================================
    // 13. FIRST AND LAST
    // =========================================================
    {
      id: "treeset-first-last",
      title: "13. first() and last()",
      paragraphs: [
        "TreeSet provides first() and last() to retrieve the smallest and largest elements according to the Set's ordering."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(40);
numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(numbers.first());
System.out.println(numbers.last());`
      },

      output: `10
40`
    },

    // =========================================================
    // 14. LOWER AND HIGHER
    // =========================================================
    {
      id: "treeset-lower-higher",
      title: "14. lower() and higher()",
      paragraphs: [
        "lower(value) returns the greatest element strictly less than the given value.",
        "higher(value) returns the smallest element strictly greater than the given value."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);

System.out.println(
    numbers.lower(30)
);

System.out.println(
    numbers.higher(30)
);`
      },

      output: `20
40`
    },

    // =========================================================
    // 15. FLOOR AND CEILING
    // =========================================================
    {
      id: "treeset-floor-ceiling",
      title: "15. floor() and ceiling()",
      paragraphs: [
        "floor(value) returns the greatest element less than or equal to the given value.",
        "ceiling(value) returns the smallest element greater than or equal to the given value."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

System.out.println(
    numbers.floor(25)
);

System.out.println(
    numbers.ceiling(25)
);`
      },

      output: `20
30`
    },

    // =========================================================
    // 16. POLL FIRST / POLL LAST
    // =========================================================
    {
      id: "treeset-poll",
      title: "16. pollFirst() and pollLast()",
      paragraphs: [
        "pollFirst() removes and returns the first element.",
        "pollLast() removes and returns the last element.",
        "Unlike first() and last(), these methods modify the TreeSet."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

System.out.println(
    numbers.pollFirst()
);

System.out.println(
    numbers.pollLast()
);

System.out.println(numbers);`
      },

      output: `10
30
[20]`
    },

    // =========================================================
    // 17. DESCENDING SET
    // =========================================================
    {
      id: "treeset-descending-set",
      title: "17. descendingSet()",
      paragraphs: [
        "The descendingSet() method returns a reverse-order view of the TreeSet.",
        "The returned view is backed by the original Set, so changes made through the view affect the original collection."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

NavigableSet<Integer> descending =
        numbers.descendingSet();

System.out.println(descending);`
      },

      output: `[30, 20, 10]`
    },

    // =========================================================
    // 18. HEADSET
    // =========================================================
    {
      id: "treeset-headset",
      title: "18. headSet()",
      paragraphs: [
        "headSet() returns a view containing elements less than a specified boundary.",
        "NavigableSet also provides an overload that allows the boundary element to be included."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);

System.out.println(
    numbers.headSet(30)
);

System.out.println(
    numbers.headSet(30, true)
);`
      },

      output: `[10, 20]
[10, 20, 30]`
    },

    // =========================================================
    // 19. TAILSET
    // =========================================================
    {
      id: "treeset-tailset",
      title: "19. tailSet()",
      paragraphs: [
        "tailSet() returns a view containing elements greater than or equal to a specified boundary.",
        "NavigableSet provides an overload that controls whether the boundary element is included."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);

System.out.println(
    numbers.tailSet(30)
);

System.out.println(
    numbers.tailSet(30, false)
);`
      },

      output: `[30, 40]
[40]`
    },

    // =========================================================
    // 20. SUBSET
    // =========================================================
    {
      id: "treeset-subset",
      title: "20. subSet()",
      paragraphs: [
        "subSet() provides a view over a range of elements.",
        "The NavigableSet overload allows explicit control over whether the lower and upper boundaries are inclusive."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);
numbers.add(50);

System.out.println(
    numbers.subSet(
        20,
        true,
        40,
        false
    )
);`
      },

      output: `[20, 30]`,

      bullets: [
        "The range is based on the TreeSet's ordering.",
        "subSet() returns a view rather than an independent copy.",
        "Changes to the view can affect the original TreeSet."
      ]
    },

    // =========================================================
    // 21. COMPARABLE
    // =========================================================
    {
      id: "treeset-comparable",
      title: "21. Comparable and Natural Ordering",
      paragraphs: [
        "When a TreeSet is created without a Comparator, elements are ordered according to their natural ordering.",
        "The element type normally implements Comparable."
      ],

      code: {
        language: "java",
        code: `TreeSet<String> names =
        new TreeSet<>();

names.add("Charlie");
names.add("Alice");
names.add("Bob");

System.out.println(names);`
      },

      output: `[Alice, Bob, Charlie]`,

      bullets: [
        "Comparable defines natural ordering.",
        "compareTo() is used for ordering.",
        "Integer, String, and many standard Java types implement Comparable."
      ]
    },

    // =========================================================
    // 22. COMPARATOR
    // =========================================================
    {
      id: "treeset-comparator",
      title: "22. Comparator and Custom Ordering",
      paragraphs: [
        "A Comparator allows a TreeSet to use an ordering different from the element's natural ordering.",
        "This is useful when you need descending order or domain-specific sorting."
      ],

      code: {
        language: "java",
        code: `TreeSet<Integer> numbers =
        new TreeSet<>(
            Comparator.reverseOrder()
        );

numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(numbers);`
      },

      output: `[30, 20, 10]`,

      bullets: [
        "Comparable defines natural ordering.",
        "Comparator defines external/custom ordering.",
        "TreeSet can be constructed with a Comparator.",
        "The Comparator determines the TreeSet's ordering behavior."
      ]
    },

    // =========================================================
    // 23. CUSTOM OBJECTS
    // =========================================================
    {
      id: "treeset-custom-objects",
      title: "23. TreeSet with Custom Objects",
      paragraphs: [
        "Custom objects can be stored in a TreeSet when the TreeSet knows how to order them.",
        "The objects can implement Comparable or a Comparator can be supplied to the TreeSet."
      ],

      code: {
        language: "java",
        code: `import java.util.TreeSet;

class Employee
        implements Comparable<Employee> {

    private int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(
            this.id,
            other.id
        );
    }

    @Override
    public String toString() {
        return id + "-" + name;
    }
}

public class Main {

    public static void main(String[] args) {

        TreeSet<Employee> employees =
                new TreeSet<>();

        employees.add(
            new Employee(3, "Charlie")
        );

        employees.add(
            new Employee(1, "Alice")
        );

        employees.add(
            new Employee(2, "Bob")
        );

        System.out.println(employees);
    }
}`
      },

      output: `[1-Alice, 2-Bob, 3-Charlie]`
    },

    // =========================================================
    // 24. COMPARATOR CUSTOM OBJECT
    // =========================================================
    {
      id: "treeset-custom-comparator",
      title: "24. TreeSet with Comparator and Custom Objects",
      paragraphs: [
        "A Comparator can be used when the desired ordering should be external to the class or when multiple ordering strategies are required."
      ],

      code: {
        language: "java",
        code: `TreeSet<Employee> employees =
        new TreeSet<>(
            Comparator.comparing(
                Employee::getName
            )
        );`
      },

      bullets: [
        "Comparator can define ordering by name, salary, age, or another field.",
        "Multiple TreeSets can use different ordering rules for the same object type.",
        "When using a Comparator, compare() returning 0 means the elements are considered equivalent for Set membership."
      ]
    },

    // =========================================================
    // 25. COMPARATOR ZERO AND UNIQUENESS
    // =========================================================
    {
      id: "treeset-comparator-zero",
      title: "25. Comparator Returning 0",
      paragraphs: [
        "A very important TreeSet concept is that the comparison result controls Set uniqueness.",
        "If compare(a, b) returns 0, TreeSet treats the two elements as equivalent for its ordering and Set operations."
      ],

      code: {
        language: "java",
        code: `TreeSet<String> names =
        new TreeSet<>(
            Comparator.comparingInt(
                String::length
            )
        );

names.add("Java");
names.add("Code");

System.out.println(names);`
      },

      output: `[Java]`,

      bullets: [
        "Both strings have length 4.",
        "The Comparator returns 0.",
        "TreeSet therefore treats them as equivalent for Set membership.",
        "This can surprise developers if the Comparator does not represent the desired notion of uniqueness."
      ]
    },

    // =========================================================
    // 26. TREESET VS HASHSET
    // =========================================================
    {
      id: "treeset-vs-hashset",
      title: "26. TreeSet vs HashSet",
      paragraphs: [
        "HashSet and TreeSet both store unique elements, but they provide different ordering and performance characteristics."
      ],

      code: {
        language: "text",
        code: `HashSet

Unique
  |
Hashing
  |
No guaranteed order
  |
Average O(1)


TreeSet

Unique
  |
Tree-based ordering
  |
Sorted order
  |
O(log n)`
      },

      bullets: [
        "HashSet does not guarantee sorted order.",
        "TreeSet maintains sorted order.",
        "HashSet basic operations are O(1) average.",
        "TreeSet basic operations are O(log n).",
        "TreeSet supports range and navigation operations.",
        "Choose TreeSet when ordering or navigation is required."
      ]
    },

    // =========================================================
    // 27. TREESET VS LINKEDHASHSET
    // =========================================================
    {
      id: "treeset-vs-linkedhashset",
      title: "27. TreeSet vs LinkedHashSet",
      paragraphs: [
        "LinkedHashSet preserves insertion order, while TreeSet maintains sorted order."
      ],

      code: {
        language: "text",
        code: `LinkedHashSet

add(30)
add(10)
add(20)

Iteration:
30
10
20


TreeSet

add(30)
add(10)
add(20)

Iteration:
10
20
30`
      },

      bullets: [
        "LinkedHashSet → insertion order.",
        "TreeSet → sorted order.",
        "LinkedHashSet uses hashing + linked ordering.",
        "TreeSet uses tree-based ordering.",
        "TreeSet provides navigation operations such as floor() and ceiling()."
      ]
    },

    // =========================================================
    // 28. PERFORMANCE
    // =========================================================
    {
      id: "treeset-performance",
      title: "28. Performance and Complexity",
      paragraphs: [
        "TreeSet is typically implemented using a balanced search tree. In Java's standard implementation, TreeMap uses a Red-Black Tree, and TreeSet is backed by a TreeMap.",
        "Because the tree remains balanced, basic operations generally take O(log n) time."
      ],

      code: {
        language: "text",
        code: `Operation          Complexity

add()               O(log n)

remove()            O(log n)

contains()          O(log n)

first()             O(log n)*
last()              O(log n)*

lower()             O(log n)

higher()            O(log n)

floor()             O(log n)

ceiling()           O(log n)

iteration           O(n)

* Practical tree traversal
  characteristics depend
  on the implementation.`
      },

      bullets: [
        "add() is generally O(log n).",
        "remove() is generally O(log n).",
        "contains() is generally O(log n).",
        "Navigation operations are generally O(log n).",
        "Iteration is O(n).",
        "TreeSet trades some lookup speed for ordering and navigation."
      ]
    },

    // =========================================================
    // 29. COMMON MISTAKES + BEST PRACTICES
    // =========================================================
    {
      id: "treeset-best-practices",
      title: "29. Common Mistakes and Best Practices",
      paragraphs: [
        "TreeSet is powerful when sorted unique data and navigation are required, but its ordering rules must be understood carefully."
      ],

      bullets: [
        "Do not expect TreeSet to preserve insertion order.",
        "Do not use TreeSet when you only need fast membership and ordering is irrelevant.",
        "Do not insert objects that cannot be compared when using natural ordering.",
        "Make sure custom Comparators represent the desired ordering and uniqueness semantics.",
        "Remember that compare(a, b) == 0 means TreeSet treats the elements as equivalent.",
        "Avoid comparators that are inconsistent with the intended equality semantics unless that behavior is intentional.",
        "Do not depend on null support with natural ordering.",
        "Use Comparable for a type's natural ordering.",
        "Use Comparator for external or alternative ordering.",
        "Use HashSet for uniqueness without ordering requirements.",
        "Use LinkedHashSet when insertion order is required.",
        "Use TreeSet when sorted order or navigation is required."
      ],

      code: {
        language: "java",
        code: `NavigableSet<Integer> numbers =
        new TreeSet<>();

numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(
    numbers.floor(25)
);

System.out.println(
    numbers.ceiling(25)
);`
      },

      output: `20
30`
    },

    // =========================================================
    // 30. KEY POINTS + INTERVIEW QUESTIONS
    // =========================================================
    {
      id: "treeset-interview",
      title: "30. Key Points + Interview Questions",
      paragraphs: [
        "TreeSet is the third major Set implementation in the CodeForge Collections curriculum.",
        "The most important concepts are sorted order, NavigableSet, Comparable, Comparator, tree-based storage, compare() returning zero, and O(log n) operations."
      ],

      bullets: [
        "TreeSet implements NavigableSet.",
        "TreeSet maintains sorted order.",
        "TreeSet does not allow duplicates.",
        "TreeSet generally does not allow null with natural ordering.",
        "TreeSet uses natural ordering or a Comparator.",
        "TreeSet is backed by a TreeMap.",
        "Java's TreeMap is based on a Red-Black Tree.",
        "add(), remove(), and contains() are generally O(log n).",
        "first() returns the smallest element.",
        "last() returns the largest element.",
        "lower() returns the greatest element strictly below a value.",
        "higher() returns the smallest element strictly above a value.",
        "floor() returns the greatest element less than or equal to a value.",
        "ceiling() returns the smallest element greater than or equal to a value.",
        "Comparable defines natural ordering.",
        "Comparator defines custom ordering.",
        "compare() returning 0 means elements are equivalent for TreeSet membership."
      ],

      interviewQuestions: [
        {
          question: "What is TreeSet in Java?",
          answer:
            "TreeSet is a Set implementation that stores unique elements in sorted order. It implements NavigableSet and generally provides O(log n) basic operations."
        },
        {
          question: "Does TreeSet allow duplicate elements?",
          answer:
            "No. TreeSet does not allow duplicate elements."
        },
        {
          question: "Does TreeSet maintain insertion order?",
          answer:
            "No. TreeSet maintains sorted order according to natural ordering or the supplied Comparator."
        },
        {
          question: "What is the internal data structure of TreeSet?",
          answer:
            "TreeSet is backed by a TreeMap. The standard Java TreeMap implementation uses a Red-Black Tree."
        },
        {
          question: "What is a Red-Black Tree?",
          answer:
            "A Red-Black Tree is a self-balancing binary search tree that maintains balance through coloring and rotations, allowing search, insertion, and deletion to remain O(log n)."
        },
        {
          question: "What is the time complexity of TreeSet.add()?",
          answer:
            "TreeSet.add() is generally O(log n)."
        },
        {
          question: "What is the time complexity of TreeSet.contains()?",
          answer:
            "TreeSet.contains() is generally O(log n)."
        },
        {
          question: "What is the difference between HashSet and TreeSet?",
          answer:
            "HashSet uses hashing and does not guarantee ordering, while TreeSet maintains sorted order using tree-based ordering. HashSet basic operations are O(1) average, while TreeSet basic operations are generally O(log n)."
        },
        {
          question: "What is the difference between LinkedHashSet and TreeSet?",
          answer:
            "LinkedHashSet maintains insertion order, while TreeSet maintains sorted order."
        },
        {
          question: "What is Comparable?",
          answer:
            "Comparable is an interface used to define a class's natural ordering through the compareTo() method."
        },
        {
          question: "What is Comparator?",
          answer:
            "Comparator is an interface used to define an external or custom ordering through the compare() method."
        },
        {
          question: "What happens if TreeSet elements do not implement Comparable?",
          answer:
            "If no Comparator is supplied and elements cannot be naturally compared, operations that require comparison can throw ClassCastException."
        },
        {
          question: "Can TreeSet store custom objects?",
          answer:
            "Yes. The objects must provide a compatible natural ordering through Comparable or the TreeSet must be created with a compatible Comparator."
        },
        {
          question: "What is the difference between Comparable and Comparator?",
          answer:
            "Comparable defines natural ordering inside the class using compareTo(), while Comparator defines external/custom ordering using compare()."
        },
        {
          question: "What does compareTo() return?",
          answer:
            "It returns a negative value when the current object is less than the other object, zero when they are equivalent for ordering, and a positive value when it is greater."
        },
        {
          question: "What does Comparator.compare() returning zero mean in TreeSet?",
          answer:
            "It means the two elements are considered equivalent for TreeSet ordering and Set membership, so the second element may not be added."
        },
        {
          question: "Can two objects be unequal according to equals() but compare() return zero?",
          answer:
            "Yes. However, such an ordering can make TreeSet treat them as equivalent and store only one. Therefore, comparator consistency with equals should be considered carefully."
        },
        {
          question: "What is first() in TreeSet?",
          answer:
            "first() returns the smallest element according to the TreeSet's ordering."
        },
        {
          question: "What is last() in TreeSet?",
          answer:
            "last() returns the largest element according to the TreeSet's ordering."
        },
        {
          question: "What is lower()?",
          answer:
            "lower(value) returns the greatest element strictly less than the specified value."
        },
        {
          question: "What is higher()?",
          answer:
            "higher(value) returns the smallest element strictly greater than the specified value."
        },
        {
          question: "What is floor()?",
          answer:
            "floor(value) returns the greatest element less than or equal to the specified value."
        },
        {
          question: "What is ceiling()?",
          answer:
            "ceiling(value) returns the smallest element greater than or equal to the specified value."
        },
        {
          question: "What is the difference between floor() and lower()?",
          answer:
            "floor() can return the given value if it exists, while lower() requires the returned element to be strictly less than the given value."
        },
        {
          question: "What is the difference between ceiling() and higher()?",
          answer:
            "ceiling() can return the given value if it exists, while higher() requires the returned element to be strictly greater than the given value."
        },
        {
          question: "What is headSet()?",
          answer:
            "headSet() returns a view of elements before a specified boundary according to the TreeSet's ordering."
        },
        {
          question: "What is tailSet()?",
          answer:
            "tailSet() returns a view of elements from a specified boundary onward according to the TreeSet's ordering."
        },
        {
          question: "What is subSet()?",
          answer:
            "subSet() returns a view representing a specified range of elements."
        },
        {
          question: "Does TreeSet allow null?",
          answer:
            "TreeSet generally does not allow null when natural ordering is used because null cannot be compared with normal values. A custom Comparator can explicitly define null handling."
        },
        {
          question: "When should I use TreeSet?",
          answer:
            "Use TreeSet when you need unique elements maintained in sorted order or when you need navigation and range operations such as floor(), ceiling(), lower(), higher(), and subSet()."
        },
        {
          question: "When should I use HashSet instead of TreeSet?",
          answer:
            "Use HashSet when you need unique elements and efficient average membership operations but do not require sorted order or TreeSet navigation features."
        }
      ]
    }
  ]
};