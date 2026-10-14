export const treeMap = {
  id: "treemap",
  slug: "treemap",
  title: "TreeMap in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn TreeMap in Java from sorted key-value fundamentals to SortedMap, NavigableMap, Red-Black Tree concepts, natural ordering, Comparator, navigation methods, range views, performance, custom objects, common mistakes, best practices, and interview questions.",
  estimatedTime: "90 min",

  sections: [

    // =========================================================
    // 1. What is TreeMap?
    // =========================================================
    {
      id: "what-is-treemap",
      title: "1. What is TreeMap?",
      paragraphs: [
        "TreeMap is a Map implementation in Java that stores key-value pairs while maintaining its keys in sorted order.",
        "Unlike HashMap, which does not guarantee iteration order, TreeMap organizes entries according to the natural ordering of its keys or according to a Comparator supplied when the map is created.",
        "TreeMap is useful when an application needs both key-value storage and sorted or navigable access to the keys."
      ],

      code: {
        language: "java",
        code: `import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {

        Map<Integer, String> map = new TreeMap<>();

        map.put(30, "C");
        map.put(10, "A");
        map.put(20, "B");

        System.out.println(map);
    }
}`
      },

      output: `{10=A, 20=B, 30=C}`,

      bullets: [
        "TreeMap stores key-value pairs.",
        "Keys are maintained in sorted order.",
        "Keys must be comparable or a compatible Comparator must be supplied.",
        "Basic TreeMap operations are typically O(log n).",
        "TreeMap does not allow a null key under natural ordering."
      ]
    },

    // =========================================================
    // 2. TreeMap Hierarchy
    // =========================================================
    {
      id: "treemap-hierarchy",
      title: "2. TreeMap Hierarchy",
      paragraphs: [
        "TreeMap implements NavigableMap, which extends SortedMap, and SortedMap extends Map.",
        "This hierarchy gives TreeMap both normal Map operations and additional sorted and navigation operations."
      ],

      code: {
        language: "text",
        code: `Map
 └── SortedMap
      └── NavigableMap
           └── TreeMap`
      },

      bullets: [
        "Map provides key-value operations.",
        "SortedMap provides sorted-map behavior.",
        "NavigableMap provides navigation methods.",
        "TreeMap is the standard implementation of these interfaces."
      ]
    },

    // =========================================================
    // 3. Creating a TreeMap
    // =========================================================
    {
      id: "creating-treemap",
      title: "3. Creating a TreeMap",
      paragraphs: [
        "A TreeMap can be created using its default constructor when the keys have a natural ordering.",
        "A Comparator can also be supplied when custom ordering is required."
      ],

      code: {
        language: "java",
        code: `import java.util.TreeMap;

TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(3, "C");
map.put(1, "A");
map.put(2, "B");

System.out.println(map);`
      },

      output: `{1=A, 2=B, 3=C}`,

      bullets: [
        "Default TreeMap uses natural key ordering.",
        "A Comparator can customize the ordering.",
        "Prefer Map or NavigableMap as the variable type when implementation-specific methods are not required."
      ]
    },

    // =========================================================
    // 4. Generics with TreeMap
    // =========================================================
    {
      id: "treemap-generics",
      title: "4. Generics with TreeMap",
      paragraphs: [
        "Generics specify the types of keys and values stored in the TreeMap.",
        "Using generics provides compile-time type safety and avoids unnecessary casting."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> employees =
    new TreeMap<>();

employees.put(101, "Rahul");
employees.put(102, "Priya");

// employees.put("103", "Arun");
// Compile-time error`
      },

      bullets: [
        "Integer is the key type.",
        "String is the value type.",
        "Keys must be mutually comparable when natural ordering is used."
      ]
    },

    // =========================================================
    // 5. Natural Ordering
    // =========================================================
    {
      id: "treemap-natural-ordering",
      title: "5. Natural Ordering",
      paragraphs: [
        "When no Comparator is provided, TreeMap uses the natural ordering of its keys.",
        "For Integer, natural ordering means ascending numerical order.",
        "For String, natural ordering is based on lexicographical ordering."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> numbers =
    new TreeMap<>();

numbers.put(50, "Fifty");
numbers.put(10, "Ten");
numbers.put(30, "Thirty");

System.out.println(numbers);`
      },

      output: `{10=Ten, 30=Thirty, 50=Fifty}`,

      bullets: [
        "Integer → ascending numerical order.",
        "String → natural lexicographical order.",
        "Custom classes can provide natural ordering through Comparable."
      ]
    },

    // =========================================================
    // 6. put() and get()
    // =========================================================
    {
      id: "treemap-put-get",
      title: "6. put() and get()",
      paragraphs: [
        "TreeMap supports the normal Map operations such as put() and get().",
        "The main difference is that entries remain organized according to the key ordering."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(101, "Java");
map.put(102, "Spring");

System.out.println(map.get(101));
System.out.println(map.get(102));`
      },

      output: `Java
Spring`
    },

    // =========================================================
    // 7. Duplicate Keys
    // =========================================================
    {
      id: "treemap-duplicate-keys",
      title: "7. Duplicate Keys",
      paragraphs: [
        "Like other Map implementations, TreeMap does not allow duplicate keys.",
        "If an existing key is inserted again, its value is replaced."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(101, "Java");
map.put(102, "Spring");

map.put(101, "Spring Boot");

System.out.println(map);`
      },

      output: `{101=Spring Boot, 102=Spring}`
    },

    // =========================================================
    // 8. Duplicate Values
    // =========================================================
    {
      id: "treemap-duplicate-values",
      title: "8. Duplicate Values",
      paragraphs: [
        "TreeMap allows duplicate values because uniqueness applies to keys rather than values."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(1, "Java");
map.put(2, "Java");
map.put(3, "Spring");

System.out.println(map);`
      },

      output: `{1=Java, 2=Java, 3=Spring}`
    },

    // =========================================================
    // 9. SortedMap
    // =========================================================
    {
      id: "sorted-map",
      title: "9. SortedMap",
      paragraphs: [
        "SortedMap is an interface that extends Map and represents a map whose keys are maintained according to a sorting order.",
        "TreeMap is a common implementation of SortedMap.",
        "SortedMap provides operations for accessing the first and last keys and creating range views."
      ],

      code: {
        language: "java",
        code: `import java.util.SortedMap;
import java.util.TreeMap;

SortedMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.firstKey());
System.out.println(map.lastKey());`
      },

      output: `10
30`,

      bullets: [
        "SortedMap maintains sorted key order.",
        "firstKey() returns the lowest key.",
        "lastKey() returns the highest key.",
        "TreeMap provides the concrete implementation."
      ]
    },

    // =========================================================
    // 10. NavigableMap
    // =========================================================
    {
      id: "navigable-map",
      title: "10. NavigableMap",
      paragraphs: [
        "NavigableMap extends SortedMap and adds methods for navigating around keys.",
        "TreeMap implements NavigableMap.",
        "These methods make TreeMap particularly useful for range and nearest-key queries."
      ],

      code: {
        language: "java",
        code: `NavigableMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.lowerKey(25));
System.out.println(map.higherKey(25));`
      },

      output: `20
30`,

      bullets: [
        "lowerKey() → strictly smaller key.",
        "higherKey() → strictly larger key.",
        "floorKey() → smaller than or equal to.",
        "ceilingKey() → larger than or equal to."
      ]
    },

    // =========================================================
    // 11. firstKey() and lastKey()
    // =========================================================
    {
      id: "first-last-key",
      title: "11. firstKey() and lastKey()",
      paragraphs: [
        "firstKey() returns the lowest key according to the TreeMap ordering.",
        "lastKey() returns the highest key."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(30, "C");
map.put(10, "A");
map.put(20, "B");

System.out.println(map.firstKey());
System.out.println(map.lastKey());`
      },

      output: `10
30`
    },

    // =========================================================
    // 12. lowerKey() and higherKey()
    // =========================================================
    {
      id: "lower-higher-key",
      title: "12. lowerKey() and higherKey()",
      paragraphs: [
        "lowerKey(key) returns the greatest key strictly less than the supplied key.",
        "higherKey(key) returns the smallest key strictly greater than the supplied key."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.lowerKey(20));
System.out.println(map.higherKey(20));`
      },

      output: `10
30`,

      bullets: [
        "lowerKey() excludes the supplied key.",
        "higherKey() excludes the supplied key."
      ]
    },

    // =========================================================
    // 13. floorKey() and ceilingKey()
    // =========================================================
    {
      id: "floor-ceiling-key",
      title: "13. floorKey() and ceilingKey()",
      paragraphs: [
        "floorKey(key) returns the greatest key less than or equal to the supplied key.",
        "ceilingKey(key) returns the smallest key greater than or equal to the supplied key."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.floorKey(25));
System.out.println(map.ceilingKey(25));`
      },

      output: `20
30`,

      bullets: [
        "floor → <= key",
        "ceiling → >= key",
        "lower → < key",
        "higher → > key"
      ]
    },

    // =========================================================
    // 14. pollFirstEntry() and pollLastEntry()
    // =========================================================
    {
      id: "poll-first-last-entry",
      title: "14. pollFirstEntry() and pollLastEntry()",
      paragraphs: [
        "NavigableMap provides methods for retrieving and removing the first or last entry.",
        "pollFirstEntry() removes and returns the lowest entry.",
        "pollLastEntry() removes and returns the highest entry."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

System.out.println(map.pollFirstEntry());
System.out.println(map.pollLastEntry());

System.out.println(map);`
      },

      output: `10=A
30=C
{20=B}`
    },

    // =========================================================
    // 15. headMap()
    // =========================================================
    {
      id: "treemap-headmap",
      title: "15. headMap()",
      paragraphs: [
        "headMap() creates a view containing keys below a specified boundary.",
        "The NavigableMap overload can specify whether the boundary key should be included."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
map.put(40, "D");

System.out.println(map.headMap(30));
System.out.println(map.headMap(30, true));`
      },

      output: `{10=A, 20=B}
{10=A, 20=B, 30=C}`,

      bullets: [
        "headMap(30) → keys less than 30.",
        "headMap(30, true) → keys less than or equal to 30.",
        "The returned map is a view of the original map."
      ]
    },

    // =========================================================
    // 16. tailMap()
    // =========================================================
    {
      id: "treemap-tailmap",
      title: "16. tailMap()",
      paragraphs: [
        "tailMap() creates a view containing entries from a specified key toward the end of the map.",
        "The NavigableMap overload allows the starting key to be included or excluded."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
map.put(40, "D");

System.out.println(map.tailMap(30));
System.out.println(map.tailMap(30, false));`
      },

      output: `{30=C, 40=D}
{40=D}`,

      bullets: [
        "tailMap(30) → 30 and greater.",
        "tailMap(30, false) → greater than 30.",
        "The returned map is a view of the original map."
      ]
    },

    // =========================================================
    // 17. subMap()
    // =========================================================
    {
      id: "treemap-submap",
      title: "17. subMap()",
      paragraphs: [
        "subMap() creates a range view between two keys.",
        "NavigableMap allows the caller to specify whether the lower and upper boundaries are inclusive."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
map.put(40, "D");

System.out.println(
    map.subMap(20, true, 40, false)
);`
      },

      output: `{20=B, 30=C}`,

      bullets: [
        "The first boundary can be inclusive or exclusive.",
        "The second boundary can be inclusive or exclusive.",
        "subMap() returns a view rather than an independent copy."
      ]
    },

    // =========================================================
    // 18. Views and Backed Collections
    // =========================================================
    {
      id: "treemap-views",
      title: "18. Range Views Are Backed by the Original Map",
      paragraphs: [
        "The range maps returned by headMap(), tailMap(), and subMap() are views backed by the original TreeMap.",
        "Changes made through a supported view operation are reflected in the original map."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

map.put(10, "A");
map.put(20, "B");
map.put(30, "C");

Map<Integer, String> view =
    map.headMap(30);

view.remove(20);

System.out.println(map);`
      },

      output: `{10=A, 30=C}`,

      bullets: [
        "Range views are not independent copies.",
        "Changes can affect the original map.",
        "This behavior is important when working with subMap(), headMap(), and tailMap()."
      ]
    },

    // =========================================================
    // 19. Comparator
    // =========================================================
    {
      id: "treemap-comparator",
      title: "19. TreeMap with Comparator",
      paragraphs: [
        "A Comparator can be supplied when a TreeMap is created to define a custom key ordering.",
        "This is useful when natural ordering does not match the application's requirement."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>(Comparator.reverseOrder());

map.put(10, "A");
map.put(30, "C");
map.put(20, "B");

System.out.println(map);`
      },

      output: `{30=C, 20=B, 10=A}`,

      bullets: [
        "Natural ordering → ascending for Integer.",
        "Comparator.reverseOrder() → descending.",
        "Custom Comparator → application-specific ordering."
      ]
    },

    // =========================================================
    // 20. Custom Objects with Comparable
    // =========================================================
    {
      id: "treemap-comparable",
      title: "20. Custom Objects with Comparable",
      paragraphs: [
        "When custom objects are used as TreeMap keys without a Comparator, the keys need a compatible natural ordering.",
        "A common approach is implementing Comparable<T>."
      ],

      code: {
        language: "java",
        code: `class Employee implements Comparable<Employee> {

    private int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }
}`
      },

      bullets: [
        "Comparable defines natural ordering.",
        "compareTo() should provide a consistent ordering.",
        "Integer.compare() is safer than subtracting integers because subtraction can overflow."
      ]
    },

    // =========================================================
    // 21. Custom Objects with Comparator
    // =========================================================
    {
      id: "treemap-custom-comparator",
      title: "21. Custom Objects with Comparator",
      paragraphs: [
        "A Comparator allows TreeMap keys to be ordered without changing the key class itself.",
        "This is particularly useful when the same object needs multiple possible orderings."
      ],

      code: {
        language: "java",
        code: `class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

TreeMap<Employee, String> map =
    new TreeMap<>(
        Comparator.comparingInt(e -> e.id)
    );`
      },

      bullets: [
        "Comparable → natural ordering belongs to the class.",
        "Comparator → ordering can be supplied externally.",
        "Comparator is useful when multiple sorting strategies are required."
      ]
    },

    // =========================================================
    // 22. Comparator compare() and Key Equality
    // =========================================================
    {
      id: "treemap-comparator-equality",
      title: "22. Comparator and Key Equality",
      paragraphs: [
        "TreeMap determines key equivalence using its ordering mechanism.",
        "If compareTo() or Comparator.compare() returns zero, TreeMap treats the keys as equivalent for map ordering purposes.",
        "This means two distinct objects can be treated as the same TreeMap key even when equals() returns false."
      ],

      code: {
        language: "java",
        code: `Comparator<String> byLength =
    Comparator.comparingInt(String::length);

TreeMap<String, Integer> map =
    new TreeMap<>(byLength);

map.put("Java", 1);
map.put("SQL", 2);

System.out.println(map);`
      },

      output: `{SQL=2, Java=1}`,

      bullets: [
        "TreeMap uses ordering comparisons to organize keys.",
        "A comparator returning zero can cause a new key to replace the value associated with an existing equivalent key.",
        "The ordering should be designed carefully."
      ]
    },

    // =========================================================
    // 23. Performance
    // =========================================================
    {
      id: "treemap-performance",
      title: "23. TreeMap Performance",
      paragraphs: [
        "TreeMap provides logarithmic-time performance for basic operations such as get(), put(), and remove() in the standard implementation.",
        "This is possible because TreeMap maintains its entries in a balanced search-tree structure."
      ],

      code: {
        language: "text",
        code: `Operation                  Typical complexity

put()                      O(log n)
get()                      O(log n)
remove()                   O(log n)
containsKey()              O(log n)
firstKey()                 O(log n)
lastKey()                  O(log n)
lowerKey()                 O(log n)
higherKey()                O(log n)`
      },

      bullets: [
        "TreeMap is slower asymptotically than average-case HashMap lookup.",
        "TreeMap provides sorted and navigable operations that HashMap does not.",
        "Iteration through the ordered entries is linear in the number of entries."
      ]
    },

    // =========================================================
    // 24. Red-Black Tree
    // =========================================================
    {
      id: "treemap-red-black-tree",
      title: "24. Red-Black Tree — Internal Working",
      paragraphs: [
        "TreeMap is implemented using a Red-Black Tree in standard Java implementations.",
        "A Red-Black Tree is a self-balancing binary search tree.",
        "Balancing prevents the tree from becoming excessively skewed, allowing TreeMap's core operations to remain logarithmic."
      ],

      code: {
        language: "text",
        code: `Conceptual structure:

          20
         /  \
       10    30
            /  \
           25   40

The tree maintains ordering while
balancing itself after updates.`
      },

      bullets: [
        "TreeMap maintains sorted keys.",
        "The tree is self-balancing.",
        "Rebalancing occurs after structural modifications.",
        "You normally use TreeMap through its public API rather than depending on internal implementation details."
      ]
    },

    // =========================================================
    // 25. Null Keys
    // =========================================================
    {
      id: "treemap-null-key",
      title: "25. Null Keys and Null Values",
      paragraphs: [
        "TreeMap with natural ordering does not permit a null key because the key must be compared with other keys.",
        "Null values are permitted."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> map =
    new TreeMap<>();

// map.put(null, "Unknown");
// Throws NullPointerException with natural ordering.

map.put(1, null);
map.put(2, "Java");

System.out.println(map);`
      },

      output: `{1=null, 2=Java}`,

      bullets: [
        "Natural-order TreeMap → null key is not allowed.",
        "Null values are allowed.",
        "A custom Comparator can define null-key handling if it explicitly supports nulls."
      ]
    },

    // =========================================================
    // 26. Common Mistakes
    // =========================================================
    {
      id: "treemap-common-mistakes",
      title: "26. Common Mistakes",
      paragraphs: [
        "TreeMap is often misunderstood because developers sometimes confuse sorted order with insertion order or hashing."
      ],

      bullets: [
        "Mistake 1: Assuming TreeMap preserves insertion order.",
        "Mistake 2: Assuming TreeMap uses hashing like HashMap.",
        "Mistake 3: Using incompatible key types with natural ordering.",
        "Mistake 4: Forgetting that null keys are not supported with natural ordering.",
        "Mistake 5: Assuming compareTo() returning zero is always identical to equals().",
        "Mistake 6: Modifying keys in ways that violate their ordering while they are stored in the map.",
        "Mistake 7: Using TreeMap when only simple hash-based lookup is needed.",
        "Mistake 8: Treating subMap(), headMap(), and tailMap() as independent copies."
      ]
    },

    // =========================================================
    // 27. Best Practices
    // =========================================================
    {
      id: "treemap-best-practices",
      title: "27. Best Practices",
      paragraphs: [
        "TreeMap should be selected when sorted keys or navigational operations are part of the requirement."
      ],

      bullets: [
        "Use TreeMap when sorted key order is required.",
        "Use HashMap when ordering is not required and hash-based lookup is sufficient.",
        "Use LinkedHashMap when insertion/access order is required.",
        "Use Comparator when custom ordering is required.",
        "Keep comparator behavior consistent and well-defined.",
        "Prefer immutable or stable keys.",
        "Use NavigableMap when navigation methods are part of the API requirement.",
        "Use range views carefully because they are backed by the original map.",
        "Do not depend unnecessarily on implementation-specific internals.",
        "Use entrySet() when both keys and values are required."
      ]
    },

    // =========================================================
    // 28. Practical Example
    // =========================================================
    {
      id: "treemap-practical-example",
      title: "28. Practical Example — Employee Salary Range",
      paragraphs: [
        "Suppose an application stores employee information using employee salary as the key.",
        "TreeMap can keep salaries sorted and allow the application to quickly find entries around a particular salary."
      ],

      code: {
        language: "java",
        code: `TreeMap<Integer, String> employees =
    new TreeMap<>();

employees.put(30000, "Rahul");
employees.put(45000, "Priya");
employees.put(60000, "Arun");
employees.put(75000, "Kiran");

System.out.println(
    "Employee at or above 50000: "
    + employees.ceilingEntry(50000)
);

System.out.println(
    "Employee below 50000: "
    + employees.lowerEntry(50000)
);

System.out.println(
    "Employees below 60000: "
    + employees.headMap(60000)
);`
      },

      output: `Employee at or above 50000: 60000=Arun
Employee below 50000: 45000=Priya
Employees below 60000: {30000=Rahul, 45000=Priya}`
    },

    // =========================================================
    // 29. Key Points
    // =========================================================
    {
      id: "treemap-key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "TreeMap is the Java Map implementation to remember when you need sorted and navigable keys."
      ],

      bullets: [
        "TreeMap implements NavigableMap.",
        "NavigableMap extends SortedMap.",
        "SortedMap extends Map.",
        "Keys are maintained in sorted order.",
        "Natural ordering is used when no Comparator is supplied.",
        "Comparator can provide custom ordering.",
        "TreeMap is based on a self-balancing tree.",
        "Standard Java TreeMap uses a Red-Black Tree.",
        "Basic operations are typically O(log n).",
        "lowerKey() means strictly less than.",
        "higherKey() means strictly greater than.",
        "floorKey() means less than or equal to.",
        "ceilingKey() means greater than or equal to.",
        "headMap(), tailMap(), and subMap() provide range views.",
        "Natural-order TreeMap does not allow null keys.",
        "Null values are allowed.",
        "Keys must have a compatible ordering.",
        "TreeMap does not preserve insertion order."
      ]
    },

    // =========================================================
    // 30. Interview Questions
    // =========================================================
    {
      id: "treemap-interview-questions",
      title: "30. TreeMap Interview Questions",
      paragraphs: [
        "These questions cover the concepts most commonly tested in Java interviews."
      ],

      interviewQuestions: [
        {
          question: "What is TreeMap?",
          answer:
            "TreeMap is a Map implementation that maintains its keys in sorted order according to natural ordering or a supplied Comparator."
        },
        {
          question: "What interfaces does TreeMap implement?",
          answer:
            "TreeMap implements NavigableMap. NavigableMap extends SortedMap, and SortedMap extends Map."
        },
        {
          question: "How is TreeMap different from HashMap?",
          answer:
            "HashMap is hash-based and does not guarantee iteration order, while TreeMap maintains keys in sorted order and provides navigation operations. TreeMap basic operations are typically O(log n)."
        },
        {
          question: "How is TreeMap different from LinkedHashMap?",
          answer:
            "LinkedHashMap maintains insertion order by default or access order when configured. TreeMap maintains sorted key order."
        },
        {
          question: "What data structure does TreeMap use internally?",
          answer:
            "The standard Java implementation uses a Red-Black Tree, which is a self-balancing binary search tree."
        },
        {
          question: "What is the time complexity of TreeMap put()?",
          answer:
            "TreeMap put() is typically O(log n)."
        },
        {
          question: "What does lowerKey() return?",
          answer:
            "It returns the greatest key strictly less than the specified key."
        },
        {
          question: "What does higherKey() return?",
          answer:
            "It returns the smallest key strictly greater than the specified key."
        },
        {
          question: "What does floorKey() return?",
          answer:
            "It returns the greatest key less than or equal to the specified key."
        },
        {
          question: "What does ceilingKey() return?",
          answer:
            "It returns the smallest key greater than or equal to the specified key."
        },
        {
          question: "Does TreeMap maintain insertion order?",
          answer:
            "No. TreeMap maintains sorted key order according to its ordering mechanism."
        },
        {
          question: "Can TreeMap have duplicate keys?",
          answer:
            "No. Map keys are unique. Inserting an existing key replaces its value."
        },
        {
          question: "Can TreeMap have duplicate values?",
          answer:
            "Yes. Multiple keys can map to the same value."
        },
        {
          question: "Can TreeMap contain null keys?",
          answer:
            "A TreeMap using natural ordering does not permit a null key because the key needs to be compared. A custom Comparator can explicitly support null keys."
        },
        {
          question: "Can TreeMap contain null values?",
          answer:
            "Yes, TreeMap allows null values."
        },
        {
          question: "What is the difference between Comparable and Comparator in TreeMap?",
          answer:
            "Comparable defines natural ordering inside the key class, while Comparator provides an external ordering strategy when constructing or using the TreeMap."
        },
        {
          question: "What happens if compareTo() returns zero for two different objects?",
          answer:
            "TreeMap treats them as equivalent keys for its ordering purposes, so the later insertion can replace the value associated with the existing equivalent key."
        },
        {
          question: "What is subMap()?",
          answer:
            "subMap() returns a view containing entries within a specified key range. The NavigableMap overload allows control over whether the boundaries are inclusive."
        },
        {
          question: "What is the difference between floorKey() and lowerKey()?",
          answer:
            "floorKey() allows equality, while lowerKey() requires the returned key to be strictly smaller."
        },
        {
          question: "What is the difference between ceilingKey() and higherKey()?",
          answer:
            "ceilingKey() allows equality, while higherKey() requires the returned key to be strictly larger."
        }
      ]
    }
  ]
};