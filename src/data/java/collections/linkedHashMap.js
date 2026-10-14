export const linkedHashMap = {
  id: "linkedhashmap",
  slug: "linkedhashmap",
  title: "LinkedHashMap in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn LinkedHashMap in Java from key-value fundamentals to insertion order, access order, internal working, LRU cache design, removeEldestEntry(), custom objects, performance, comparisons, common mistakes, best practices, and interview questions.",
  estimatedTime: "80 min",

  sections: [
    // =========================================================
    // 1. What is LinkedHashMap?
    // =========================================================
    {
      id: "what-is-linkedhashmap",
      title: "1. What is LinkedHashMap?",
      paragraphs: [
        "LinkedHashMap is a class in the Java Collections Framework that stores data as key-value pairs while maintaining a predictable iteration order.",
        "It combines the hashing-based lookup behavior of HashMap with a linked structure that maintains the order of entries.",
        "By default, LinkedHashMap maintains insertion order. This means entries are normally returned in the same order in which they were inserted.",
        "LinkedHashMap is useful when an application needs fast map operations together with predictable iteration order."
      ],

      code: {
        language: "java",
        code: `import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {

        Map<Integer, String> employees = new LinkedHashMap<>();

        employees.put(101, "Rahul");
        employees.put(102, "Priya");
        employees.put(103, "Arun");

        System.out.println(employees);
    }
}`
      },

      output: `{101=Rahul, 102=Priya, 103=Arun}`,

      bullets: [
        "LinkedHashMap stores key-value pairs.",
        "Keys are unique.",
        "Values can be duplicated.",
        "Default iteration order is insertion order.",
        "It is based on HashMap behavior plus linked ordering.",
        "It is not synchronized by default."
      ]
    },

    // =========================================================
    // 2. LinkedHashMap Hierarchy
    // =========================================================
    {
      id: "linkedhashmap-hierarchy",
      title: "2. LinkedHashMap Hierarchy",
      paragraphs: [
        "LinkedHashMap is part of the Map hierarchy.",
        "Unlike List and Set implementations, Map does not extend Collection because a map stores key-value associations rather than individual elements.",
        "LinkedHashMap extends HashMap and therefore inherits the core hash-based map behavior."
      ],

      code: {
        language: "text",
        code: `Map
 └── AbstractMap
      └── HashMap
           └── LinkedHashMap`
      },

      bullets: [
        "Map is the main interface.",
        "AbstractMap provides a partial Map implementation.",
        "HashMap provides hash-table-based map behavior.",
        "LinkedHashMap extends HashMap and adds predictable ordering."
      ]
    },

    // =========================================================
    // 3. Creating a LinkedHashMap
    // =========================================================
    {
      id: "creating-linkedhashmap",
      title: "3. Creating a LinkedHashMap",
      paragraphs: [
        "A LinkedHashMap can be created using its no-argument constructor or constructors that allow initial capacity, load factor, and access-order configuration.",
        "Using the Map interface on the left side is generally preferred because it keeps the code flexible."
      ],

      code: {
        language: "java",
        code: `import java.util.LinkedHashMap;
import java.util.Map;

Map<Integer, String> map = new LinkedHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");
map.put(3, "React");

System.out.println(map);`
      },

      output: `{1=Java, 2=Spring, 3=React}`,

      bullets: [
        "Prefer Map<K, V> when the LinkedHashMap-specific API is not required.",
        "Use LinkedHashMap when predictable iteration order matters.",
        "Generics should normally be used."
      ]
    },

    // =========================================================
    // 4. Generics with LinkedHashMap
    // =========================================================
    {
      id: "linkedhashmap-generics",
      title: "4. Generics with LinkedHashMap",
      paragraphs: [
        "Generics define the type of keys and values stored in the map.",
        "They provide compile-time type safety and reduce the need for explicit casting."
      ],

      code: {
        language: "java",
        code: `LinkedHashMap<Integer, String> students =
        new LinkedHashMap<>();

students.put(101, "Rahul");
students.put(102, "Priya");

// students.put("103", "Arun"); // Compile-time error`
      },

      bullets: [
        "Integer is the key type.",
        "String is the value type.",
        "Generics prevent incompatible values from being inserted.",
        "Avoid raw LinkedHashMap declarations."
      ]
    },

    // =========================================================
    // 5. put() and get()
    // =========================================================
    {
      id: "linkedhashmap-put-get",
      title: "5. put() and get()",
      paragraphs: [
        "The put() method adds a key-value pair to the map.",
        "The get() method retrieves the value associated with a key.",
        "If the key already exists, put() replaces the previous value."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(101, "Java");
map.put(102, "Spring Boot");

System.out.println(map.get(101));
System.out.println(map.get(102));`
      },

      output: `Java
Spring Boot`,

      bullets: [
        "put(key, value) inserts or updates an entry.",
        "get(key) retrieves the corresponding value.",
        "get() returns null when the key is not mapped to a value."
      ]
    },

    // =========================================================
    // 6. Duplicate Keys
    // =========================================================
    {
      id: "linkedhashmap-duplicate-keys",
      title: "6. Duplicate Keys",
      paragraphs: [
        "A Map cannot contain duplicate keys.",
        "When put() is called with a key that already exists, the old value is replaced with the new value.",
        "The key remains a single key in the map."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(101, "Java");
map.put(102, "Spring");

map.put(101, "Spring Boot");

System.out.println(map);`
      },

      output: `{101=Spring Boot, 102=Spring}`,

      bullets: [
        "Keys must be unique.",
        "Values may be duplicated.",
        "put() replaces the value associated with an existing key.",
        "In insertion-order mode, replacing an existing key does not move it to the end."
      ]
    },

    // =========================================================
    // 7. Duplicate Values
    // =========================================================
    {
      id: "linkedhashmap-duplicate-values",
      title: "7. Duplicate Values",
      paragraphs: [
        "LinkedHashMap allows multiple keys to map to the same value.",
        "The uniqueness rule applies to keys, not values."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(101, "Java");
map.put(102, "Java");
map.put(103, "Spring");

System.out.println(map);`
      },

      output: `{101=Java, 102=Java, 103=Spring}`,

      bullets: [
        "Keys are unique.",
        "Values can be duplicated.",
        "Different keys can reference equal values."
      ]
    },

    // =========================================================
    // 8. Insertion Order
    // =========================================================
    {
      id: "linkedhashmap-insertion-order",
      title: "8. Insertion Order",
      paragraphs: [
        "The main feature that distinguishes LinkedHashMap from HashMap is predictable iteration order.",
        "By default, LinkedHashMap maintains insertion order.",
        "When the map is iterated, entries appear in the order in which they were inserted."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(30, "C");
map.put(10, "A");
map.put(20, "B");

for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}`
      },

      output: `30 -> C
10 -> A
20 -> B`,

      bullets: [
        "LinkedHashMap does not sort keys.",
        "It preserves insertion order.",
        "Insertion order is different from natural sorting."
      ]
    },

    // =========================================================
    // 9. Iteration
    // =========================================================
    {
      id: "linkedhashmap-iteration",
      title: "9. Iterating LinkedHashMap",
      paragraphs: [
        "LinkedHashMap can be traversed using keySet(), values(), entrySet(), or forEach().",
        "When both the key and value are required, entrySet() is usually the most direct approach."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");
map.put(3, "React");

for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println(
        entry.getKey() + " -> " + entry.getValue()
    );
}`
      },

      output: `1 -> Java
2 -> Spring
3 -> React`
    },

    // =========================================================
    // 10. entrySet(), keySet(), values()
    // =========================================================
    {
      id: "linkedhashmap-views",
      title: "10. entrySet(), keySet(), and values()",
      paragraphs: [
        "LinkedHashMap provides different collection views of its contents.",
        "keySet() returns a Set view containing the keys.",
        "values() returns a Collection view containing the values.",
        "entrySet() returns a Set view containing key-value entries."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");

System.out.println(map.keySet());
System.out.println(map.values());
System.out.println(map.entrySet());`
      },

      output: `[1, 2]
[Java, Spring]
[1=Java, 2=Spring]`,

      bullets: [
        "keySet() → keys",
        "values() → values",
        "entrySet() → key-value pairs",
        "The views are backed by the map."
      ]
    },

    // =========================================================
    // 11. Linked Structure and Internal Working
    // =========================================================
    {
      id: "linkedhashmap-internal-working",
      title: "11. Linked Structure and Internal Working",
      paragraphs: [
        "LinkedHashMap extends HashMap and adds a linked structure across entries.",
        "The hash-table portion allows keys to be located efficiently, while the linked structure maintains the predictable iteration order.",
        "Conceptually, entries are connected so that the map can move from one entry to the next during iteration."
      ],

      code: {
        language: "text",
        code: `Hash-based lookup

Bucket 0
Bucket 1 -> Entry A
Bucket 2 -> Entry B
Bucket 3 -> Entry C

Linked iteration order:

Entry A <-> Entry B <-> Entry C`
      },

      bullets: [
        "Hashing helps locate entries.",
        "The linked structure maintains iteration order.",
        "The linked structure is separate from the concept of sorting.",
        "LinkedHashMap does not sort keys automatically."
      ]
    },

    // =========================================================
    // 12. LinkedHashMap and HashMap Relationship
    // =========================================================
    {
      id: "linkedhashmap-hashmap-relationship",
      title: "12. LinkedHashMap and HashMap Relationship",
      paragraphs: [
        "LinkedHashMap is a subclass of HashMap.",
        "It inherits the core hash-based Map behavior and adds ordering support.",
        "This is why many HashMap concepts such as hashCode(), equals(), buckets, collisions, load factor, and resizing are also relevant to LinkedHashMap."
      ],

      code: {
        language: "java",
        code: `HashMap<Integer, String> hashMap =
        new HashMap<>();

LinkedHashMap<Integer, String> linkedHashMap =
        new LinkedHashMap<>();`
      },

      bullets: [
        "HashMap focuses on hash-based map operations.",
        "LinkedHashMap adds predictable iteration order.",
        "LinkedHashMap inherits from HashMap.",
        "LinkedHashMap generally has additional memory overhead because of ordering information."
      ]
    },

    // =========================================================
    // 13. Access Order
    // =========================================================
    {
      id: "linkedhashmap-access-order",
      title: "13. Access Order",
      paragraphs: [
        "LinkedHashMap can be configured to maintain access order instead of insertion order.",
        "Access-order mode is useful when recently accessed entries should move toward the end of the iteration order.",
        "This behavior is commonly used as a building block for LRU-style caches."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new LinkedHashMap<>(16, 0.75f, true);

map.put(1, "A");
map.put(2, "B");
map.put(3, "C");

map.get(1);

System.out.println(map);`
      },

      output: `{2=B, 3=C, 1=A}`,

      bullets: [
        "The third constructor argument enables access-order mode.",
        "The accessed entry can move toward the end.",
        "Access-order is different from insertion-order.",
        "This feature is useful for cache implementations."
      ]
    },

    // =========================================================
    // 14. Insertion Order vs Access Order
    // =========================================================
    {
      id: "insertion-vs-access-order",
      title: "14. Insertion Order vs Access Order",
      paragraphs: [
        "LinkedHashMap supports two useful ordering modes.",
        "Insertion-order mode preserves the order in which entries were inserted.",
        "Access-order mode rearranges entries based on qualifying accesses, placing recently accessed entries toward the end."
      ],

      code: {
        language: "java",
        code: `// Insertion order
LinkedHashMap<Integer, String> insertionOrder =
    new LinkedHashMap<>();

// Access order
LinkedHashMap<Integer, String> accessOrder =
    new LinkedHashMap<>(16, 0.75f, true);`
      },

      bullets: [
        "Insertion order is the default.",
        "Access order is explicitly enabled.",
        "Use insertion order for predictable insertion-based output.",
        "Use access order when recent usage matters."
      ]
    },

    // =========================================================
    // 15. LRU Cache Concept
    // =========================================================
    {
      id: "lru-cache-concept",
      title: "15. LRU Cache Concept",
      paragraphs: [
        "LRU stands for Least Recently Used.",
        "An LRU cache removes the entry that has not been used for the longest period when the cache reaches its capacity.",
        "LinkedHashMap provides access-order mode and removeEldestEntry(), making it possible to implement a simple LRU cache without creating a separate linked-list and hash-map structure."
      ],

      code: {
        language: "java",
        code: `import java.util.LinkedHashMap;
import java.util.Map;

class LruCache<K, V> extends LinkedHashMap<K, V> {

    private final int capacity;

    public LruCache(int capacity) {
        super(16, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(
            Map.Entry<K, V> eldest) {

        return size() > capacity;
    }
}`
      },

      bullets: [
        "Access-order mode tracks recent usage.",
        "removeEldestEntry() can enforce a maximum size.",
        "The eldest entry becomes the removal candidate.",
        "This is a common LinkedHashMap interview example."
      ]
    },

    // =========================================================
    // 16. removeEldestEntry()
    // =========================================================
    {
      id: "remove-eldest-entry",
      title: "16. removeEldestEntry()",
      paragraphs: [
        "removeEldestEntry() is a protected method provided by LinkedHashMap.",
        "It can be overridden to automatically remove the eldest entry after a new mapping is inserted.",
        "The method is commonly used to implement bounded caches."
      ],

      code: {
        language: "java",
        code: `LinkedHashMap<Integer, String> cache =
    new LinkedHashMap<Integer, String>() {

        @Override
        protected boolean removeEldestEntry(
                Map.Entry<Integer, String> eldest) {

            return size() > 3;
        }
    };

cache.put(1, "A");
cache.put(2, "B");
cache.put(3, "C");
cache.put(4, "D");

System.out.println(cache);`
      },

      output: `{2=B, 3=C, 4=D}`,

      bullets: [
        "It is called after a new mapping is inserted.",
        "Returning true requests removal of the eldest entry.",
        "Returning false keeps the eldest entry.",
        "It is useful for bounded caches."
      ]
    },

    // =========================================================
    // 17. Custom Objects as Keys
    // =========================================================
    {
      id: "linkedhashmap-custom-objects",
      title: "17. Custom Objects as Keys",
      paragraphs: [
        "LinkedHashMap can use custom objects as keys.",
        "When custom objects are used as keys, equals() and hashCode() should be implemented consistently.",
        "The same key-equality rules that apply to HashMap also apply to LinkedHashMap."
      ],

      code: {
        language: "java",
        code: `import java.util.Objects;

class Employee {

    private final int id;
    private final String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (!(obj instanceof Employee)) {
            return false;
        }

        Employee other = (Employee) obj;

        return id == other.id
            && Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`
      },

      bullets: [
        "Equal keys must have the same hash code.",
        "hashCode() helps locate candidate entries.",
        "equals() determines logical equality.",
        "Prefer stable or immutable key state."
      ]
    },

    // =========================================================
    // 18. equals() and hashCode()
    // =========================================================
    {
      id: "linkedhashmap-equals-hashcode",
      title: "18. equals() and hashCode() in LinkedHashMap",
      paragraphs: [
        "LinkedHashMap inherits hash-based key lookup behavior from HashMap.",
        "For a custom key, hashCode() is used to identify a candidate location and equals() is used to determine whether the key is logically equal to an existing key.",
        "Breaking the equals() and hashCode() contract can cause unexpected map behavior."
      ],

      code: {
        language: "java",
        code: `Employee e1 = new Employee(101, "Rahul");
Employee e2 = new Employee(101, "Rahul");

System.out.println(e1.equals(e2));
System.out.println(e1.hashCode() == e2.hashCode());`
      },

      output: `true
true`,

      bullets: [
        "If a.equals(b) is true, both objects must have the same hash code.",
        "Same hash code does not guarantee equals() is true.",
        "Do not use mutable equality fields carelessly as map keys."
      ]
    },

    // =========================================================
    // 19. Mutable Keys Problem
    // =========================================================
    {
      id: "linkedhashmap-mutable-keys",
      title: "19. Mutable Keys Problem",
      paragraphs: [
        "A dangerous mistake is modifying fields that participate in equals() and hashCode() after an object has been inserted as a key.",
        "The map may no longer be able to locate the key using its new hash code.",
        "For this reason, immutable objects are usually safer as map keys."
      ],

      code: {
        language: "java",
        code: `// Conceptual example

Map<Employee, String> map =
    new LinkedHashMap<>();

Employee employee = new Employee(101, "Rahul");

map.put(employee, "Developer");

// If fields used by equals/hashCode are changed,
// future lookups may behave unexpectedly.`
      },

      bullets: [
        "Prefer immutable key objects.",
        "Do not modify equality/hashCode state after insertion.",
        "String, Integer, Long, and other immutable types are common safe key choices."
      ]
    },

    // =========================================================
    // 20. Null Keys and Null Values
    // =========================================================
    {
      id: "linkedhashmap-null-values",
      title: "20. Null Keys and Null Values",
      paragraphs: [
        "LinkedHashMap inherits the null-key and null-value behavior of HashMap.",
        "It permits one null key and multiple null values."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(null, "Unknown");
map.put(1, null);
map.put(2, null);

System.out.println(map);`
      },

      output: `{null=Unknown, 1=null, 2=null}`,

      bullets: [
        "One null key is allowed.",
        "Multiple null values are allowed.",
        "Null support can differ across other Map implementations.",
        "Do not assume every Map implementation has the same null behavior."
      ]
    },

    // =========================================================
    // 21. Performance
    // =========================================================
    {
      id: "linkedhashmap-performance",
      title: "21. LinkedHashMap Performance",
      paragraphs: [
        "LinkedHashMap generally provides constant-time average performance for basic hash-based operations under normal hashing behavior.",
        "It has additional work and memory overhead compared with HashMap because it maintains ordering information.",
        "Iteration is efficient because the linked structure directly represents the iteration sequence."
      ],

      code: {
        language: "text",
        code: `Operation                 Typical complexity

put()                     O(1) average
get()                     O(1) average
remove()                  O(1) average
containsKey()             O(1) average
containsValue()           O(n)
Iteration                 O(n)`
      },

      bullets: [
        "These are typical average-case expectations, not strict worst-case guarantees.",
        "Poor hashing can affect hash-based operations.",
        "LinkedHashMap generally uses more memory than HashMap.",
        "Iteration follows the maintained linked order."
      ]
    },

    // =========================================================
    // 22. Memory Overhead
    // =========================================================
    {
      id: "linkedhashmap-memory-overhead",
      title: "22. Memory Overhead",
      paragraphs: [
        "LinkedHashMap needs additional ordering information for its entries.",
        "Conceptually, entries are connected through links so that iteration order can be maintained.",
        "Therefore, LinkedHashMap generally consumes more memory than a comparable HashMap."
      ],

      code: {
        language: "text",
        code: `HashMap

Bucket -> Entry
          |
          v
        Entry


LinkedHashMap

Bucket -> Entry <-> Entry <-> Entry
                  linked iteration order`
      },

      bullets: [
        "HashMap is usually more memory-efficient when ordering is unnecessary.",
        "LinkedHashMap trades additional memory for predictable iteration order.",
        "The exact memory footprint depends on the JVM and implementation."
      ]
    },

    // =========================================================
    // 23. LinkedHashMap vs HashMap
    // =========================================================
    {
      id: "linkedhashmap-vs-hashmap",
      title: "23. LinkedHashMap vs HashMap",
      paragraphs: [
        "HashMap and LinkedHashMap both provide hash-based Map behavior, but their iteration-order guarantees differ.",
        "HashMap does not guarantee a predictable iteration order, while LinkedHashMap maintains a defined iteration order according to its configured mode."
      ],

      code: {
        language: "text",
        code: `HashMap
- Hash-based Map
- No guaranteed iteration order
- Generally lower memory overhead

LinkedHashMap
- Hash-based Map
- Predictable insertion/access iteration order
- Additional linked-order overhead`
      },

      bullets: [
        "Use HashMap when ordering is not required.",
        "Use LinkedHashMap when predictable iteration order is required.",
        "Both allow duplicate values.",
        "Both require unique keys."
      ]
    },

    // =========================================================
    // 24. LinkedHashMap vs TreeMap
    // =========================================================
    {
      id: "linkedhashmap-vs-treemap",
      title: "24. LinkedHashMap vs TreeMap",
      paragraphs: [
        "LinkedHashMap and TreeMap both provide predictable iteration behavior, but they solve different problems.",
        "LinkedHashMap maintains insertion or access order, while TreeMap maintains keys according to sorted ordering."
      ],

      code: {
        language: "text",
        code: `LinkedHashMap
30 -> C
10 -> A
20 -> B

Iteration:
30, 10, 20


TreeMap
30 -> C
10 -> A
20 -> B

Iteration:
10, 20, 30`
      },

      bullets: [
        "LinkedHashMap → insertion/access order.",
        "TreeMap → sorted key order.",
        "LinkedHashMap basic operations are typically O(1) average.",
        "TreeMap basic operations are typically O(log n).",
        "Choose based on the ordering requirement."
      ]
    },

    // =========================================================
    // 25. LinkedHashMap vs Hashtable
    // =========================================================
    {
      id: "linkedhashmap-vs-hashtable",
      title: "25. LinkedHashMap vs Hashtable",
      paragraphs: [
        "Hashtable is a legacy synchronized Map implementation.",
        "LinkedHashMap is a modern collection implementation that provides predictable iteration order and supports null keys and values.",
        "Neither should be selected simply because it is an old or familiar API; the choice should depend on the application's requirements."
      ],

      code: {
        language: "text",
        code: `LinkedHashMap
- Predictable iteration order
- Allows null key/value
- Not synchronized by default

Hashtable
- Legacy Map implementation
- Synchronized legacy operations
- Does not allow null keys or null values`
      },

      bullets: [
        "LinkedHashMap is commonly used when ordering matters.",
        "Hashtable is a legacy API.",
        "For concurrent maps, modern concurrent collection APIs should generally be considered instead of Hashtable."
      ]
    },

    // =========================================================
    // 26. Common Mistakes
    // =========================================================
    {
      id: "linkedhashmap-common-mistakes",
      title: "26. Common Mistakes",
      paragraphs: [
        "Understanding the ordering rules is important because LinkedHashMap is often confused with sorted maps.",
        "The most common mistakes involve assuming that LinkedHashMap sorts keys, misunderstanding access-order mode, or using mutable keys."
      ],

      bullets: [
        "Mistake 1: Assuming LinkedHashMap sorts keys.",
        "Mistake 2: Assuming access-order is enabled by default.",
        "Mistake 3: Forgetting that keys must be unique.",
        "Mistake 4: Using mutable objects as keys.",
        "Mistake 5: Assuming LinkedHashMap is thread-safe.",
        "Mistake 6: Using LinkedHashMap when sorted-key behavior is actually required.",
        "Mistake 7: Assuming all Map implementations support null keys and values.",
        "Mistake 8: Assuming replacing an existing key changes insertion order."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map = new LinkedHashMap<>();

map.put(30, "C");
map.put(10, "A");
map.put(20, "B");

System.out.println(map);

// This does NOT sort the keys.
// Output follows insertion order.`
      },

      output: `{30=C, 10=A, 20=B}`
    },

    // =========================================================
    // 27. Best Practices
    // =========================================================
    {
      id: "linkedhashmap-best-practices",
      title: "27. Best Practices",
      paragraphs: [
        "LinkedHashMap is most useful when predictable ordering is part of the application's requirement.",
        "Choose the ordering mode deliberately and use immutable keys whenever possible."
      ],

      bullets: [
        "Declare variables using the Map interface when possible.",
        "Use LinkedHashMap when predictable iteration order is required.",
        "Use insertion order when insertion sequence matters.",
        "Use access order for use cases such as LRU-style caching.",
        "Use immutable objects as keys whenever possible.",
        "Implement equals() and hashCode() correctly for custom keys.",
        "Use entrySet() when both keys and values are required.",
        "Do not rely on undocumented implementation details.",
        "Do not assume LinkedHashMap is thread-safe.",
        "For concurrent applications, choose an appropriate concurrency strategy."
      ],

      code: {
        language: "java",
        code: `Map<String, Integer> scores =
    new LinkedHashMap<>();

scores.put("Java", 90);
scores.put("Spring", 85);
scores.put("SQL", 88);

for (Map.Entry<String, Integer> entry
        : scores.entrySet()) {

    System.out.println(
        entry.getKey() + " = " + entry.getValue()
    );
}`
      },

      output: `Java = 90
Spring = 85
SQL = 88`
    },

    // =========================================================
    // 28. Practical Example
    // =========================================================
    {
      id: "linkedhashmap-practical-example",
      title: "28. Practical Example — Maintaining API Response Order",
      paragraphs: [
        "Suppose an application needs to create a predictable response containing sections in a specific insertion order.",
        "LinkedHashMap can preserve that order while still providing Map-style key-based access.",
        "This can be useful for reports, configuration output, ordered metadata, and other situations where predictable iteration is required."
      ],

      code: {
        language: "java",
        code: `import java.util.LinkedHashMap;
import java.util.Map;

public class ApiResponseExample {

    public static void main(String[] args) {

        Map<String, Object> response =
            new LinkedHashMap<>();

        response.put("status", "SUCCESS");
        response.put("message", "Employee created");
        response.put("employeeId", 101);
        response.put("department", "Engineering");

        response.forEach((key, value) ->
            System.out.println(key + " : " + value)
        );
    }
}`
      },

      output: `status : SUCCESS
message : Employee created
employeeId : 101
department : Engineering`,

      bullets: [
        "The keys remain in insertion order during iteration.",
        "Map access still uses keys.",
        "In real REST APIs, JSON object member ordering should not generally be treated as business logic unless the serialization contract explicitly requires it."
      ]
    },

    // =========================================================
    // 29. Key Points
    // =========================================================
    {
      id: "linkedhashmap-key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "LinkedHashMap is a hash-based Map implementation that adds predictable iteration ordering.",
        "Its default ordering is insertion order, while access-order mode can be enabled through the constructor.",
        "It is particularly useful when hash-based lookup and predictable iteration need to work together."
      ],

      bullets: [
        "LinkedHashMap extends HashMap.",
        "It implements Map.",
        "Keys are unique.",
        "Values can be duplicated.",
        "Default order is insertion order.",
        "Access-order mode can be enabled.",
        "It allows one null key and multiple null values.",
        "Basic operations are typically O(1) average.",
        "Iteration is O(n).",
        "It generally consumes more memory than HashMap.",
        "It is not synchronized by default.",
        "It can be used to build simple LRU-style caches.",
        "removeEldestEntry() is useful for bounded caches.",
        "Custom keys should correctly implement equals() and hashCode().",
        "Immutable keys are generally safer."
      ]
    },

    // =========================================================
    // 30. Interview Questions
    // =========================================================
    {
      id: "linkedhashmap-interview-questions",
      title: "30. LinkedHashMap Interview Questions",
      paragraphs: [
        "These are common interview questions that test whether you understand LinkedHashMap beyond basic syntax."
      ],

      interviewQuestions: [
        {
          question: "What is LinkedHashMap?",
          answer:
            "LinkedHashMap is a Map implementation that combines hash-based map behavior with predictable iteration order. By default, it maintains insertion order."
        },
        {
          question: "What is the difference between HashMap and LinkedHashMap?",
          answer:
            "HashMap does not guarantee a predictable iteration order, while LinkedHashMap maintains insertion order by default and can also be configured for access order."
        },
        {
          question: "Does LinkedHashMap sort its keys?",
          answer:
            "No. LinkedHashMap maintains insertion order by default. It does not sort keys. TreeMap is used when sorted key order is required."
        },
        {
          question: "How does LinkedHashMap maintain order?",
          answer:
            "LinkedHashMap extends HashMap and maintains additional linked ordering information between entries, allowing iteration to follow the configured order."
        },
        {
          question: "What is access-order mode?",
          answer:
            "Access-order mode makes iteration reflect recent accesses to entries rather than simply their insertion sequence. It is enabled through the LinkedHashMap constructor."
        },
        {
          question: "How can LinkedHashMap be used to implement an LRU cache?",
          answer:
            "Create LinkedHashMap with access-order enabled and override removeEldestEntry() to remove the eldest entry when the cache exceeds its capacity."
        },
        {
          question: "Does LinkedHashMap allow null keys?",
          answer:
            "Yes. LinkedHashMap permits one null key and multiple null values."
        },
        {
          question: "Can LinkedHashMap contain duplicate keys?",
          answer:
            "No. Keys are unique. Calling put() with an existing key replaces its associated value."
        },
        {
          question: "Can LinkedHashMap contain duplicate values?",
          answer:
            "Yes. Multiple different keys can map to equal values."
        },
        {
          question: "What is the average time complexity of get() in LinkedHashMap?",
          answer:
            "Under normal hashing behavior, get() is typically O(1) on average."
        },
        {
          question: "Is LinkedHashMap synchronized?",
          answer:
            "No. LinkedHashMap is not synchronized by default. Appropriate synchronization or concurrent collection strategies are needed when required by the application."
        },
        {
          question: "Why does LinkedHashMap use more memory than HashMap?",
          answer:
            "LinkedHashMap maintains additional links between entries to preserve predictable iteration order."
        },
        {
          question: "What happens when an existing key is inserted again?",
          answer:
            "The existing value is replaced. In insertion-order mode, replacing the value does not move the entry to the end."
        },
        {
          question: "What is removeEldestEntry() used for?",
          answer:
            "It can be overridden to automatically remove the eldest entry after a new mapping is inserted, making it useful for bounded cache implementations."
        },
        {
          question: "What is the difference between insertion order and access order?",
          answer:
            "Insertion order follows the order in which entries were inserted. Access order changes the iteration sequence based on qualifying accesses, making recently accessed entries move toward the end."
        },
        {
          question: "When would you choose LinkedHashMap instead of TreeMap?",
          answer:
            "Choose LinkedHashMap when insertion or access order is required. Choose TreeMap when keys need to be maintained in sorted order."
        },
        {
          question: "Why should custom key classes implement equals() and hashCode()?",
          answer:
            "Hash-based lookup depends on hashCode() to locate candidate entries and equals() to determine logical key equality. The two methods must follow their contract."
        },
        {
          question: "Why are immutable keys preferred?",
          answer:
            "If fields involved in equals() and hashCode() change after insertion, the map may no longer locate the key correctly. Immutable keys avoid this problem."
        }
      ]
    }
  ]
};