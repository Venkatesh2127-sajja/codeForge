export const hashtable = {
  id: "hashtable",
  slug: "hashtable",
  title: "Hashtable in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Hashtable in Java from key-value fundamentals to synchronization, hashing, collision handling, null restrictions, Enumeration, performance, legacy usage, comparisons with modern Map implementations, common mistakes, best practices, and interview questions.",
  estimatedTime: "75 min",

  sections: [

    // =========================================================
    // 1. What is Hashtable?
    // =========================================================
    {
      id: "what-is-hashtable",
      title: "1. What is Hashtable?",
      paragraphs: [
        "Hashtable is a legacy Map implementation in Java that stores data as key-value pairs.",
        "It is synchronized, meaning its legacy Map operations are designed for thread-safe access through the Hashtable object's synchronization mechanism.",
        "Hashtable is older than the modern Collections Framework and has several restrictions that distinguish it from HashMap.",
        "In particular, Hashtable does not permit null keys or null values."
      ],

      code: {
        language: "java",
        code: `import java.util.Hashtable;

public class Main {
    public static void main(String[] args) {

        Hashtable<Integer, String> table =
            new Hashtable<>();

        table.put(101, "Java");
        table.put(102, "Spring Boot");
        table.put(103, "SQL");

        System.out.println(table);
    }
}`
      },

      output: `{103=SQL, 102=Spring Boot, 101=Java}`,

      bullets: [
        "Hashtable implements Map.",
        "It is a legacy collection class.",
        "Its operations are synchronized.",
        "It does not allow null keys.",
        "It does not allow null values.",
        "It does not guarantee sorted or insertion order."
      ]
    },

    // =========================================================
    // 2. Hashtable Hierarchy
    // =========================================================
    {
      id: "hashtable-hierarchy",
      title: "2. Hashtable Hierarchy",
      paragraphs: [
        "Hashtable extends Dictionary and implements Map.",
        "Dictionary is an older abstract class that predates the modern Java Collections Framework."
      ],

      code: {
        language: "text",
        code: `Object
   │
   └── Dictionary
          │
          └── Hashtable
                  │
                  └── Map`
      },

      bullets: [
        "Hashtable extends Dictionary.",
        "Hashtable implements Map.",
        "Dictionary is a legacy abstraction.",
        "Hashtable predates HashMap."
      ]
    },

    // =========================================================
    // 3. Creating a Hashtable
    // =========================================================
    {
      id: "creating-hashtable",
      title: "3. Creating a Hashtable",
      paragraphs: [
        "A Hashtable can be created using its no-argument constructor or constructors that accept capacity and load factor."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> employees =
    new Hashtable<>();

employees.put(101, "Rahul");
employees.put(102, "Priya");

System.out.println(employees);`
      },

      output: `{102=Priya, 101=Rahul}`,

      bullets: [
        "Use generics for type safety.",
        "Hashtable does not maintain insertion order.",
        "Do not use Hashtable simply when a normal Map is required; modern alternatives often fit better."
      ]
    },

    // =========================================================
    // 4. Generics
    // =========================================================
    {
      id: "hashtable-generics",
      title: "4. Generics with Hashtable",
      paragraphs: [
        "Generics specify the key and value types stored in the Hashtable.",
        "They provide compile-time type safety."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

map.put(1, "Java");
map.put(2, "Spring");

// map.put("3", "SQL");
// Compile-time error`
      },

      bullets: [
        "Integer → key type.",
        "String → value type.",
        "Generics reduce casting errors.",
        "Raw Hashtable should generally be avoided."
      ]
    },

    // =========================================================
    // 5. put() and get()
    // =========================================================
    {
      id: "hashtable-put-get",
      title: "5. put() and get()",
      paragraphs: [
        "put() inserts a key-value pair and get() retrieves the value associated with a key.",
        "If a key already exists, put() replaces its value."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

map.put(101, "Java");
map.put(102, "Spring");

System.out.println(map.get(101));
System.out.println(map.get(102));`
      },

      output: `Java
Spring`
    },

    // =========================================================
    // 6. Duplicate Keys
    // =========================================================
    {
      id: "hashtable-duplicate-keys",
      title: "6. Duplicate Keys",
      paragraphs: [
        "Hashtable follows the Map rule that keys must be unique.",
        "Putting the same key again replaces the previous value."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

map.put(101, "Java");
map.put(101, "Spring Boot");

System.out.println(map);`
      },

      output: `{101=Spring Boot}`,

      bullets: [
        "Duplicate keys are not stored as separate entries.",
        "The latest value replaces the old value.",
        "Values can be duplicated."
      ]
    },

    // =========================================================
    // 7. Duplicate Values
    // =========================================================
    {
      id: "hashtable-duplicate-values",
      title: "7. Duplicate Values",
      paragraphs: [
        "Hashtable allows multiple keys to have the same value."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

map.put(101, "Java");
map.put(102, "Java");
map.put(103, "Spring");

System.out.println(map);`
      },

      output: `{103=Spring, 102=Java, 101=Java}`
    },

    // =========================================================
    // 8. Null Key and Null Value
    // =========================================================
    {
      id: "hashtable-null",
      title: "8. Null Keys and Null Values",
      paragraphs: [
        "One of the most important differences between Hashtable and HashMap is null handling.",
        "Hashtable does not permit null keys or null values.",
        "Attempting to insert either results in a NullPointerException."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

// map.put(null, "Java");
// NullPointerException

// map.put(1, null);
// NullPointerException`
      },

      bullets: [
        "Null key → not allowed.",
        "Null value → not allowed.",
        "HashMap has different null behavior.",
        "Always consider the chosen Map implementation's null contract."
      ]
    },

    // =========================================================
    // 9. Hashing
    // =========================================================
    {
      id: "hashtable-hashing",
      title: "9. What is Hashing?",
      paragraphs: [
        "Hashing is a technique for converting a key into information that helps determine where an entry should be stored.",
        "Hashtable uses hash-based lookup to locate keys efficiently.",
        "The hash code of a key participates in determining the appropriate location."
      ],

      code: {
        language: "text",
        code: `Key
 ↓
hashCode()
 ↓
hash processing
 ↓
bucket/location
 ↓
candidate entry`
      },

      bullets: [
        "Hashing helps locate entries.",
        "The quality of hashCode() affects distribution.",
        "Collisions can occur when different keys map to the same location."
      ]
    },

    // =========================================================
    // 10. hashCode()
    // =========================================================
    {
      id: "hashtable-hashcode",
      title: "10. hashCode()",
      paragraphs: [
        "Every Java object inherits hashCode() from Object unless the method is overridden.",
        "Hash-based collections use hash codes as part of their lookup process.",
        "For custom key classes, hashCode() must follow the equals() and hashCode() contract."
      ],

      code: {
        language: "java",
        code: `String key = "Java";

System.out.println(key.hashCode());`
      },

      bullets: [
        "Equal objects must have the same hash code.",
        "Different objects can have the same hash code.",
        "A hash collision does not mean the keys are equal."
      ]
    },

    // =========================================================
    // 11. equals()
    // =========================================================
    {
      id: "hashtable-equals",
      title: "11. equals()",
      paragraphs: [
        "equals() determines logical equality between objects.",
        "Hash-based Map implementations use equality checks when determining whether a candidate key matches the requested key."
      ],

      code: {
        language: "java",
        code: `String first = new String("Java");
String second = new String("Java");

System.out.println(first.equals(second));`
      },

      output: `true`
    },

    // =========================================================
    // 12. equals() and hashCode() Contract
    // =========================================================
    {
      id: "hashtable-equals-hashcode-contract",
      title: "12. equals() and hashCode() Contract",
      paragraphs: [
        "The equals() and hashCode() contract is essential when custom objects are used as Hashtable keys.",
        "If two objects are equal according to equals(), they must return the same hash code."
      ],

      code: {
        language: "java",
        code: `class Employee {

    private final int id;

    Employee(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (!(obj instanceof Employee)) {
            return false;
        }

        Employee other = (Employee) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}`
      },

      bullets: [
        "equals() defines logical equality.",
        "hashCode() supports hash-based lookup.",
        "Equal objects must have equal hash codes.",
        "Incorrect implementations can cause lookup problems."
      ]
    },

    // =========================================================
    // 13. Buckets
    // =========================================================
    {
      id: "hashtable-buckets",
      title: "13. What is a Bucket?",
      paragraphs: [
        "A bucket is a conceptual location used by a hash-based collection to organize entries.",
        "The hash of a key helps determine the location where its entry belongs.",
        "Multiple keys can end up in the same bucket, producing a collision."
      ],

      code: {
        language: "text",
        code: `Bucket 0
Bucket 1 -> Entry A
Bucket 2
Bucket 3 -> Entry B
Bucket 4 -> Entry C`
      }
    },

    // =========================================================
    // 14. Collision
    // =========================================================
    {
      id: "hashtable-collision",
      title: "14. Hash Collision",
      paragraphs: [
        "A hash collision occurs when different keys are mapped to the same hash-table location.",
        "A hash-based Map must handle collisions while still being able to distinguish logically different keys."
      ],

      code: {
        language: "text",
        code: `Key A ──> Bucket 5
Key B ──> Bucket 5

Collision`
      },

      bullets: [
        "Different keys can have the same hash code.",
        "Hash collisions are normal in hash tables.",
        "equals() is important when distinguishing candidate keys."
      ]
    },

    // =========================================================
    // 15. Internal Working
    // =========================================================
    {
      id: "hashtable-internal-working",
      title: "15. Internal Working of Hashtable",
      paragraphs: [
        "Conceptually, Hashtable maintains an array-like table of buckets.",
        "When a key is inserted, its hash code is processed to determine a bucket.",
        "The entry is stored in that bucket, with collision handling used when multiple entries map to the same location.",
        "The exact internal implementation details are Java-version and implementation dependent, so application code should rely on the public API rather than internal representation."
      ],

      code: {
        language: "text",
        code: `put(key, value)
      |
      v
  hashCode()
      |
      v
 bucket calculation
      |
      v
 find matching key
      |
   +--+--+
   |     |
 found  not found
   |     |
replace  insert`
      }
    },

    // =========================================================
    // 16. Synchronization
    // =========================================================
    {
      id: "hashtable-synchronization",
      title: "16. Synchronization in Hashtable",
      paragraphs: [
        "Hashtable is synchronized, meaning its legacy methods are synchronized on the Hashtable instance.",
        "This provides a basic form of thread-safe access for individual operations.",
        "However, synchronization of individual methods does not automatically make every multi-step sequence of operations atomic."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> map =
    new Hashtable<>();

map.put(1, "Java");
map.put(2, "Spring");

String value = map.get(1);`
      },

      bullets: [
        "Hashtable's legacy operations are synchronized.",
        "Individual operations have synchronization guarantees.",
        "Compound operations may require additional coordination.",
        "Modern concurrent applications often use ConcurrentHashMap instead."
      ]
    },

    // =========================================================
    // 17. Thread Safety
    // =========================================================
    {
      id: "hashtable-thread-safety",
      title: "17. Hashtable and Thread Safety",
      paragraphs: [
        "Hashtable's synchronized methods make it different from HashMap, which is not synchronized by default.",
        "However, thread safety should be evaluated at the level of the complete operation performed by an application.",
        "For example, checking whether a key exists and then inserting it as two separate operations is not automatically one atomic operation merely because both methods are synchronized."
      ],

      code: {
        language: "java",
        code: `if (!table.containsKey(key)) {
    table.put(key, value);
}

// These are two separate operations.`
      },

      bullets: [
        "Thread safety of individual methods does not automatically make compound logic atomic.",
        "ConcurrentHashMap provides modern concurrent Map capabilities.",
        "Choose the collection based on the application's concurrency requirements."
      ]
    },

    // =========================================================
    // 18. Enumeration
    // =========================================================
    {
      id: "hashtable-enumeration",
      title: "18. Enumeration",
      paragraphs: [
        "Hashtable provides the legacy Enumeration API for traversing keys and values.",
        "Enumeration predates Iterator and the modern Collections Framework.",
        "Modern code generally prefers Iterator, entrySet(), or forEach() where appropriate."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> table =
    new Hashtable<>();

table.put(1, "Java");
table.put(2, "Spring");

Enumeration<Integer> keys =
    table.keys();

while (keys.hasMoreElements()) {
    Integer key = keys.nextElement();

    System.out.println(key);
}`
      },

      bullets: [
        "Enumeration is a legacy traversal API.",
        "keys() returns an Enumeration of keys.",
        "elements() returns an Enumeration of values.",
        "Iterator and Map views are generally preferred in modern code."
      ]
    },

    // =========================================================
    // 19. Iteration with entrySet()
    // =========================================================
    {
      id: "hashtable-entryset",
      title: "19. Iterating with entrySet()",
      paragraphs: [
        "Hashtable implements Map, so modern Map views such as entrySet(), keySet(), and values() can be used.",
        "When both the key and value are required, entrySet() is usually the most direct approach."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> table =
    new Hashtable<>();

table.put(101, "Java");
table.put(102, "Spring");
table.put(103, "SQL");

for (Map.Entry<Integer, String> entry
        : table.entrySet()) {

    System.out.println(
        entry.getKey() + " -> " + entry.getValue()
    );
}`
      },

      output: `103 -> SQL
102 -> Spring
101 -> Java`
    },

    // =========================================================
    // 20. Ordering
    // =========================================================
    {
      id: "hashtable-ordering",
      title: "20. Hashtable Ordering",
      paragraphs: [
        "Hashtable does not guarantee insertion order or sorted order.",
        "The iteration sequence should therefore not be used as an ordering contract."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> table =
    new Hashtable<>();

table.put(30, "C");
table.put(10, "A");
table.put(20, "B");

System.out.println(table);`
      },

      output: "The exact iteration order should not be relied upon.",

      bullets: [
        "HashMap → no guaranteed order.",
        "Hashtable → no guaranteed order.",
        "LinkedHashMap → predictable insertion/access order.",
        "TreeMap → sorted key order."
      ]
    },

    // =========================================================
    // 21. Capacity and Load Factor
    // =========================================================
    {
      id: "hashtable-capacity-load-factor",
      title: "21. Capacity and Load Factor",
      paragraphs: [
        "Hashtable uses an internal capacity and load factor to control when its internal table needs to grow.",
        "The load factor represents how full the table can become before resizing is triggered.",
        "The exact resizing behavior is an implementation detail, so application code should normally focus on choosing sensible initial sizing when large data sets are known."
      ],

      code: {
        language: "java",
        code: `Hashtable<Integer, String> table =
    new Hashtable<>(32);`
      },

      bullets: [
        "Initial capacity can be supplied.",
        "Load factor influences resizing.",
        "Resizing helps maintain efficient lookup behavior.",
        "Do not rely on implementation-specific resizing formulas in application logic."
      ]
    },

    // =========================================================
    // 22. Performance
    // =========================================================
    {
      id: "hashtable-performance",
      title: "22. Hashtable Performance",
      paragraphs: [
        "Hashtable provides hash-based operations that are typically O(1) on average under normal hashing behavior.",
        "Because Hashtable synchronizes its legacy operations, synchronization can add overhead compared with an unsynchronized HashMap in a single-threaded workload."
      ],

      code: {
        language: "text",
        code: `Operation                  Typical average

put()                      O(1)
get()                      O(1)
remove()                   O(1)
containsKey()              O(1)
containsValue()            O(n)
Iteration                  O(n)`
      },

      bullets: [
        "These are average-case expectations.",
        "Poor hash distribution can affect performance.",
        "Synchronization introduces additional coordination overhead.",
        "Actual performance depends on workload and JVM implementation."
      ]
    },

    // =========================================================
    // 23. Hashtable vs HashMap
    // =========================================================
    {
      id: "hashtable-vs-hashmap",
      title: "23. Hashtable vs HashMap",
      paragraphs: [
        "Hashtable and HashMap are both Map implementations, but they differ significantly in synchronization and null handling.",
        "HashMap is the modern general-purpose hash-based Map, while Hashtable is a legacy synchronized implementation."
      ],

      code: {
        language: "text",
        code: `HashMap
- Not synchronized by default
- Allows one null key
- Allows null values
- Modern general-purpose Map

Hashtable
- Synchronized legacy operations
- Does not allow null key
- Does not allow null values
- Legacy Map implementation`
      },

      bullets: [
        "HashMap is generally preferred for ordinary non-concurrent map usage.",
        "Hashtable is mainly encountered in legacy code.",
        "Do not choose Hashtable solely because synchronization is required; modern concurrent collections may be more appropriate."
      ]
    },

    // =========================================================
    // 24. Hashtable vs LinkedHashMap
    // =========================================================
    {
      id: "hashtable-vs-linkedhashmap",
      title: "24. Hashtable vs LinkedHashMap",
      paragraphs: [
        "LinkedHashMap maintains predictable iteration order, while Hashtable does not provide such an ordering guarantee.",
        "LinkedHashMap also permits null keys and values, unlike Hashtable."
      ],

      code: {
        language: "text",
        code: `Hashtable
- Legacy
- Synchronized
- No null key/value
- No guaranteed iteration order

LinkedHashMap
- Predictable insertion/access order
- Not synchronized by default
- Allows null key/value
- Modern Collections Framework`
      }
    },

    // =========================================================
    // 25. Hashtable vs ConcurrentHashMap
    // =========================================================
    {
      id: "hashtable-vs-concurrenthashmap",
      title: "25. Hashtable vs ConcurrentHashMap",
      paragraphs: [
        "ConcurrentHashMap is a modern concurrent Map implementation designed for concurrent applications.",
        "It provides thread-safe Map operations with a concurrency design that differs substantially from Hashtable's synchronized-method approach.",
        "ConcurrentHashMap also does not permit null keys or null values."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(101, "Java");
map.put(102, "Spring");`
      },

      bullets: [
        "Hashtable → legacy synchronized Map.",
        "ConcurrentHashMap → modern concurrent Map.",
        "Both reject null keys and null values.",
        "ConcurrentHashMap is designed specifically for concurrent access patterns."
      ]
    },

    // =========================================================
    // 26. Common Mistakes
    // =========================================================
    {
      id: "hashtable-common-mistakes",
      title: "26. Common Mistakes",
      paragraphs: [
        "Hashtable is easy to use but several assumptions commonly cause interview and production mistakes."
      ],

      bullets: [
        "Mistake 1: Assuming Hashtable preserves insertion order.",
        "Mistake 2: Trying to insert a null key.",
        "Mistake 3: Trying to insert a null value.",
        "Mistake 4: Assuming synchronized methods make compound operations atomic.",
        "Mistake 5: Using Hashtable in new code without considering modern alternatives.",
        "Mistake 6: Forgetting equals() and hashCode() for custom keys.",
        "Mistake 7: Depending on internal bucket or resizing details.",
        "Mistake 8: Assuming Hashtable is automatically the best choice for every multithreaded application."
      ]
    },

    // =========================================================
    // 27. Best Practices
    // =========================================================
    {
      id: "hashtable-best-practices",
      title: "27. Best Practices",
      paragraphs: [
        "Because Hashtable is a legacy collection, it is important to understand it for existing systems and interviews while selecting modern alternatives carefully for new applications."
      ],

      bullets: [
        "Understand Hashtable because it appears in legacy Java applications.",
        "Prefer HashMap for normal non-concurrent Map requirements.",
        "Consider ConcurrentHashMap for concurrent Map requirements.",
        "Use LinkedHashMap when predictable insertion/access order is required.",
        "Use TreeMap when sorted key order is required.",
        "Avoid null keys and values with Hashtable because they are unsupported.",
        "Use generics.",
        "Use entrySet() when both key and value are needed.",
        "Implement equals() and hashCode() correctly for custom key classes.",
        "Do not rely on iteration order."
      ]
    },

    // =========================================================
    // 28. Practical Example
    // =========================================================
    {
      id: "hashtable-practical-example",
      title: "28. Practical Example — Legacy Configuration Lookup",
      paragraphs: [
        "Imagine a legacy application that stores configuration values in a Hashtable.",
        "The application can retrieve values using keys while the Hashtable provides synchronized legacy operations."
      ],

      code: {
        language: "java",
        code: `import java.util.Hashtable;

public class Configuration {

    public static void main(String[] args) {

        Hashtable<String, String> config =
            new Hashtable<>();

        config.put("server", "localhost");
        config.put("port", "8080");
        config.put("environment", "development");

        String server = config.get("server");
        String port = config.get("port");

        System.out.println(
            "Server: " + server
        );

        System.out.println(
            "Port: " + port
        );
    }
}`
      },

      output: `Server: localhost
Port: 8080`,

      bullets: [
        "Hashtable can still be found in older Java systems.",
        "For new applications, choose the Map implementation based on ordering, concurrency, and null-handling requirements."
      ]
    },

    // =========================================================
    // 29. Key Points
    // =========================================================
    {
      id: "hashtable-key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "Hashtable is an important legacy Java Map implementation that frequently appears in interviews and older enterprise applications."
      ],

      bullets: [
        "Hashtable implements Map.",
        "Hashtable extends Dictionary.",
        "It is a legacy collection.",
        "Its legacy operations are synchronized.",
        "It does not allow null keys.",
        "It does not allow null values.",
        "Keys must be unique.",
        "Values can be duplicated.",
        "It does not guarantee insertion order.",
        "It does not maintain sorted order.",
        "Hashing is used for key lookup.",
        "Custom keys should correctly implement equals() and hashCode().",
        "Basic operations are typically O(1) average.",
        "containsValue() is typically O(n).",
        "ConcurrentHashMap is a modern concurrent alternative.",
        "HashMap is the normal general-purpose hash-based Map.",
        "LinkedHashMap is used when predictable insertion/access order is required.",
        "TreeMap is used when sorted key order is required."
      ]
    },

    // =========================================================
    // 30. Interview Questions
    // =========================================================
    {
      id: "hashtable-interview-questions",
      title: "30. Hashtable Interview Questions",
      paragraphs: [
        "These questions cover the most important Hashtable concepts for Java interviews."
      ],

      interviewQuestions: [
        {
          question: "What is Hashtable?",
          answer:
            "Hashtable is a legacy Map implementation that stores key-value pairs and provides synchronized legacy Map operations."
        },
        {
          question: "Is Hashtable synchronized?",
          answer:
            "Yes. Hashtable's legacy Map methods are synchronized on the Hashtable instance."
        },
        {
          question: "Does Hashtable allow null keys?",
          answer:
            "No. Hashtable does not allow null keys."
        },
        {
          question: "Does Hashtable allow null values?",
          answer:
            "No. Hashtable does not allow null values."
        },
        {
          question: "Can Hashtable contain duplicate keys?",
          answer:
            "No. Keys in a Map must be unique. Inserting an existing key replaces its value."
        },
        {
          question: "Can Hashtable contain duplicate values?",
          answer:
            "Yes. Multiple keys can map to the same value."
        },
        {
          question: "Does Hashtable maintain insertion order?",
          answer:
            "No. Hashtable does not guarantee insertion order."
        },
        {
          question: "What is the difference between Hashtable and HashMap?",
          answer:
            "Hashtable is a legacy synchronized Map that does not allow null keys or values. HashMap is not synchronized by default and permits one null key and multiple null values."
        },
        {
          question: "What is the difference between Hashtable and ConcurrentHashMap?",
          answer:
            "Hashtable uses synchronized legacy methods, while ConcurrentHashMap is a modern concurrent Map designed for concurrent access and scalable concurrency. Both reject null keys and values."
        },
        {
          question: "Why is Hashtable considered legacy?",
          answer:
            "Hashtable predates the modern Collections Framework and uses the older Dictionary abstraction. Modern Map implementations generally provide more suitable choices for new code."
        },
        {
          question: "What is the time complexity of Hashtable get()?",
          answer:
            "Under normal hashing behavior, get() is typically O(1) on average."
        },
        {
          question: "What happens if we insert null into Hashtable?",
          answer:
            "Attempting to insert a null key or null value results in a NullPointerException."
        },
        {
          question: "What is Enumeration?",
          answer:
            "Enumeration is a legacy traversal interface that predates Iterator. Hashtable provides methods such as keys() and elements() that return Enumeration objects."
        },
        {
          question: "What is a hash collision?",
          answer:
            "A hash collision occurs when different keys map to the same hash-table location."
        },
        {
          question: "Why are equals() and hashCode() important?",
          answer:
            "hashCode() helps locate candidate entries, while equals() determines logical key equality. Equal objects must have equal hash codes."
        },
        {
          question: "Does synchronized Hashtable make every compound operation atomic?",
          answer:
            "No. Individual synchronized method calls are protected, but a sequence involving multiple method calls may still require additional synchronization or an atomic concurrent operation."
        },
        {
          question: "Which is preferred for a normal Map: Hashtable or HashMap?",
          answer:
            "HashMap is generally the modern general-purpose choice when synchronization is not required."
        },
        {
          question: "Which should be considered for concurrent Map usage?",
          answer:
            "ConcurrentHashMap is a modern option designed specifically for concurrent Map access."
        },
        {
          question: "Which Map should be used when insertion order matters?",
          answer:
            "LinkedHashMap maintains predictable insertion order by default."
        },
        {
          question: "Which Map should be used when sorted keys are required?",
          answer:
            "TreeMap maintains keys according to natural ordering or a supplied Comparator."
        }
      ]
    }
  ]
};