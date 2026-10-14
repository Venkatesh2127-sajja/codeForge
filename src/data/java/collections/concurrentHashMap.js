export const concurrentHashMap = {
  id: "concurrent-hash-map",
  slug: "concurrent-hash-map",
  title: "ConcurrentHashMap in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn ConcurrentHashMap in Java from concurrent Map fundamentals to thread safety, atomic operations, computeIfAbsent(), compute(), merge(), concurrent iteration, weakly consistent iterators, null restrictions, performance, common mistakes, best practices, and interview questions.",
  estimatedTime: "90 min",

  sections: [

    // =========================================================
    // 1. What is ConcurrentHashMap?
    // =========================================================
    {
      id: "what-is-concurrenthashmap",
      title: "1. What is ConcurrentHashMap?",
      paragraphs: [
        "ConcurrentHashMap is a Map implementation designed for use by multiple threads concurrently.",
        "It provides thread-safe access to map entries while allowing a high degree of concurrency.",
        "Unlike Hashtable, which synchronizes its legacy Map methods, ConcurrentHashMap is designed specifically for modern concurrent applications.",
        "It is part of the java.util.concurrent package."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args) {

        ConcurrentHashMap<Integer, String> map =
            new ConcurrentHashMap<>();

        map.put(101, "Java");
        map.put(102, "Spring Boot");

        System.out.println(map);
    }
}`
      },

      output: `{
  101=Java,
  102=Spring Boot
}`,

      bullets: [
        "ConcurrentHashMap implements ConcurrentMap.",
        "ConcurrentMap extends Map.",
        "It is designed for concurrent access.",
        "It does not allow null keys.",
        "It does not allow null values.",
        "It provides atomic compound Map operations."
      ]
    },

    // =========================================================
    // 2. Package and Hierarchy
    // =========================================================
    {
      id: "concurrenthashmap-hierarchy",
      title: "2. ConcurrentHashMap Hierarchy",
      paragraphs: [
        "ConcurrentHashMap belongs to the java.util.concurrent package.",
        "It implements ConcurrentMap, which extends Map."
      ],

      code: {
        language: "text",
        code: `Map
 │
 └── ConcurrentMap
        │
        └── ConcurrentHashMap

Package:
java.util.concurrent`
      },

      bullets: [
        "Map → basic key-value abstraction.",
        "ConcurrentMap → concurrent Map operations.",
        "ConcurrentHashMap → concrete implementation."
      ]
    },

    // =========================================================
    // 3. Why Do We Need ConcurrentHashMap?
    // =========================================================
    {
      id: "why-concurrenthashmap",
      title: "3. Why Do We Need ConcurrentHashMap?",
      paragraphs: [
        "A normal HashMap is not designed for concurrent modification by multiple threads.",
        "Synchronizing an entire Map can reduce concurrency because one thread may block other threads even when they are working with unrelated keys.",
        "ConcurrentHashMap provides a design intended to allow multiple threads to work with the map concurrently while maintaining thread-safety guarantees."
      ],

      code: {
        language: "text",
        code: `Multiple Threads
      │
      ├── Thread 1 ──> put()
      │
      ├── Thread 2 ──> get()
      │
      ├── Thread 3 ──> compute()
      │
      └── Thread 4 ──> remove()

              ↓

       ConcurrentHashMap`
      },

      bullets: [
        "HashMap → not thread-safe.",
        "Hashtable → synchronized legacy Map.",
        "ConcurrentHashMap → modern concurrent Map."
      ]
    },

    // =========================================================
    // 4. Creating ConcurrentHashMap
    // =========================================================
    {
      id: "creating-concurrenthashmap",
      title: "4. Creating ConcurrentHashMap",
      paragraphs: [
        "ConcurrentHashMap can be created using its default constructor or constructors that allow initial sizing and concurrency-related configuration."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");
map.put(3, "SQL");

System.out.println(map);`
      },

      bullets: [
        "Use generics.",
        "Declare the variable using ConcurrentHashMap when its specific API is needed.",
        "Otherwise, Map or ConcurrentMap can be used as the abstraction."
      ]
    },

    // =========================================================
    // 5. put() and get()
    // =========================================================
    {
      id: "concurrenthashmap-put-get",
      title: "5. put() and get()",
      paragraphs: [
        "ConcurrentHashMap supports normal Map operations such as put() and get().",
        "These operations are designed to work safely when multiple threads access the map concurrently."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

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
      id: "concurrenthashmap-duplicate-keys",
      title: "6. Duplicate Keys",
      paragraphs: [
        "ConcurrentHashMap follows the Map rule that keys are unique.",
        "Putting an existing key replaces its previous value."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(101, "Java");
map.put(101, "Spring Boot");

System.out.println(map);`
      },

      output: `{101=Spring Boot}`
    },

    // =========================================================
    // 7. Null Restrictions
    // =========================================================
    {
      id: "concurrenthashmap-null",
      title: "7. Null Keys and Null Values",
      paragraphs: [
        "ConcurrentHashMap does not allow null keys or null values.",
        "Attempting to insert null results in a NullPointerException."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

// map.put(null, "Java");
// NullPointerException

// map.put(1, null);
// NullPointerException`
      },

      bullets: [
        "Null key → not allowed.",
        "Null value → not allowed.",
        "This differs from HashMap.",
        "It is also consistent with ConcurrentHashMap's concurrent lookup semantics."
      ]
    },

    // =========================================================
    // 8. Thread Safety
    // =========================================================
    {
      id: "concurrenthashmap-thread-safety",
      title: "8. Thread Safety",
      paragraphs: [
        "ConcurrentHashMap is designed to provide thread-safe access to its contents without requiring callers to synchronize every individual operation.",
        "Multiple threads can perform supported operations concurrently."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> counts =
    new ConcurrentHashMap<>();

Runnable task = () -> {
    counts.merge("Java", 1, Integer::sum);
};

new Thread(task).start();
new Thread(task).start();`
      },

      bullets: [
        "Multiple threads can access the same map.",
        "Map operations have concurrency guarantees defined by the API.",
        "Atomic Map methods are especially useful for concurrent applications."
      ]
    },

    // =========================================================
    // 9. Atomic Operations
    // =========================================================
    {
      id: "concurrenthashmap-atomic-operations",
      title: "9. Atomic Map Operations",
      paragraphs: [
        "ConcurrentHashMap provides compound operations that are performed atomically.",
        "Methods such as putIfAbsent(), computeIfAbsent(), compute(), and merge() are especially important for concurrent programming.",
        "These methods prevent common race conditions that can occur when a developer performs a check followed by a separate update."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.putIfAbsent("Java", 1);

map.computeIfAbsent(
    "Spring",
    key -> 1
);

map.merge(
    "Java",
    1,
    Integer::sum
);`
      },

      bullets: [
        "putIfAbsent() → insert only when absent.",
        "computeIfAbsent() → calculate a value only when absent.",
        "compute() → atomically compute a mapping.",
        "merge() → combine an existing value with a new value."
      ]
    },

    // =========================================================
    // 10. putIfAbsent()
    // =========================================================
    {
      id: "concurrenthashmap-putifabsent",
      title: "10. putIfAbsent()",
      paragraphs: [
        "putIfAbsent() inserts a key-value pair only when the key is not already present.",
        "This is safer for concurrent use than separately calling containsKey() followed by put()."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 10);

map.putIfAbsent("Java", 20);
map.putIfAbsent("Spring", 30);

System.out.println(map);`
      },

      output: `{Java=10, Spring=30}`,

      bullets: [
        "Existing value is not replaced.",
        "Missing key receives the supplied value.",
        "The operation is atomic."
      ]
    },

    // =========================================================
    // 11. Why containsKey() + put() Can Be Unsafe
    // =========================================================
    {
      id: "containskey-put-race",
      title: "11. Why containsKey() + put() Can Cause a Race",
      paragraphs: [
        "A common concurrency mistake is checking whether a key exists and then inserting it using two separate operations.",
        "Another thread can change the map between those operations.",
        "ConcurrentHashMap provides atomic alternatives such as putIfAbsent()."
      ],

      code: {
        language: "java",
        code: `// Avoid relying on this as one atomic operation:

if (!map.containsKey("Java")) {
    map.put("Java", 1);
}

// Prefer:

map.putIfAbsent("Java", 1);`
      },

      bullets: [
        "containsKey() and put() are separate operations.",
        "Another thread may modify the map between them.",
        "putIfAbsent() expresses the intended atomic operation."
      ]
    },

    // =========================================================
    // 12. computeIfAbsent()
    // =========================================================
    {
      id: "concurrenthashmap-computeifabsent",
      title: "12. computeIfAbsent()",
      paragraphs: [
        "computeIfAbsent() calculates a value only when the specified key is not already associated with a value.",
        "It is extremely useful for building thread-safe caches and grouping structures."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

Integer value = map.computeIfAbsent(
    "Java",
    key -> key.length()
);

System.out.println(value);
System.out.println(map);`
      },

      output: `4
{Java=4}`,

      bullets: [
        "The mapping function runs when the key is absent.",
        "If the key already has a value, the existing value is returned.",
        "The operation is atomic for the specified key according to the ConcurrentMap contract."
      ]
    },

    // =========================================================
    // 13. Practical computeIfAbsent()
    // =========================================================
    {
      id: "computeifabsent-cache",
      title: "13. Practical Example of computeIfAbsent()",
      paragraphs: [
        "A common backend use case is caching an expensive calculation.",
        "computeIfAbsent() allows the calculation to be associated with a key when the key is missing."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> cache =
    new ConcurrentHashMap<>();

String result = cache.computeIfAbsent(
    101,
    id -> loadEmployeeFromDatabase(id)
);

private static String loadEmployeeFromDatabase(
        Integer id) {

    return "Employee-" + id;
}`
      },

      output: `Employee-101`,

      bullets: [
        "If employee 101 is already cached, the existing value is used.",
        "If it is absent, the mapping function calculates the value.",
        "This pattern is common in backend caching."
      ]
    },

    // =========================================================
    // 14. compute()
    // =========================================================
    {
      id: "concurrenthashmap-compute",
      title: "14. compute()",
      paragraphs: [
        "compute() atomically computes a new value for a key using the existing value and key.",
        "The remapping function can return a replacement value or null to remove the mapping."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 10);

map.compute(
    "Java",
    (key, value) -> value + 5
);

System.out.println(map);`
      },

      output: `{Java=15}`,

      bullets: [
        "compute() receives the key and current value.",
        "The returned value becomes the new mapping.",
        "Returning null removes the mapping."
      ]
    },

    // =========================================================
    // 15. merge()
    // =========================================================
    {
      id: "concurrenthashmap-merge",
      title: "15. merge()",
      paragraphs: [
        "merge() is useful when a value should be inserted when absent and combined with the existing value when present.",
        "It is commonly used for counters and frequency maps."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> counts =
    new ConcurrentHashMap<>();

counts.merge("Java", 1, Integer::sum);
counts.merge("Java", 1, Integer::sum);
counts.merge("Java", 1, Integer::sum);

System.out.println(counts);`
      },

      output: `{Java=3}`,

      bullets: [
        "First call inserts 1.",
        "Later calls combine the existing value with 1.",
        "merge() is atomic for the key."
      ]
    },

    // =========================================================
    // 16. Concurrent Counter
    // =========================================================
    {
      id: "concurrent-counter",
      title: "16. Concurrent Frequency Counter",
      paragraphs: [
        "A practical example of ConcurrentHashMap is counting occurrences of values from multiple threads.",
        "merge() can update the count without requiring the developer to manually synchronize the read-modify-write sequence."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> frequency =
    new ConcurrentHashMap<>();

String word = "Java";

frequency.merge(
    word,
    1,
    Integer::sum
);`
      },

      output: `Java=1`,

      bullets: [
        "Useful for counters.",
        "Useful for event frequencies.",
        "Useful for request statistics.",
        "Useful for concurrent aggregation."
      ]
    },

    // =========================================================
    // 17. Concurrent Iteration
    // =========================================================
    {
      id: "concurrenthashmap-iteration",
      title: "17. Concurrent Iteration",
      paragraphs: [
        "ConcurrentHashMap iterators are designed for concurrent use.",
        "Its iterators are weakly consistent rather than fail-fast.",
        "They do not throw ConcurrentModificationException merely because another thread modifies the map during iteration."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");

for (Map.Entry<Integer, String> entry
        : map.entrySet()) {

    System.out.println(
        entry.getKey() + " -> " + entry.getValue()
    );
}`
      },

      bullets: [
        "Iterators are weakly consistent.",
        "They may reflect some modifications made during iteration.",
        "They do not provide a snapshot of the map at one exact instant.",
        "They do not throw ConcurrentModificationException because of concurrent modifications."
      ]
    },

    // =========================================================
    // 18. Weakly Consistent Iterator
    // =========================================================
    {
      id: "weakly-consistent-iterator",
      title: "18. What Does Weakly Consistent Mean?",
      paragraphs: [
        "A weakly consistent iterator can safely operate while other threads modify the map.",
        "It reflects elements present at some point since the iterator was created and may reflect modifications made during traversal.",
        "It does not guarantee that every modification made during iteration will be observed."
      ],

      code: {
        language: "text",
        code: `Thread 1
   |
   | iterate
   v
ConcurrentHashMap
   ^
   |
   | modify
   |
Thread 2`
      },

      bullets: [
        "No fail-fast ConcurrentModificationException for concurrent map updates.",
        "No immutable snapshot guarantee.",
        "Useful for concurrent applications where a stable snapshot is unnecessary."
      ]
    },

    // =========================================================
    // 19. forEach()
    // =========================================================
    {
      id: "concurrenthashmap-foreach",
      title: "19. forEach()",
      paragraphs: [
        "ConcurrentHashMap supports Map's forEach() operation and additional bulk traversal capabilities.",
        "forEach() can be used to process entries without manually creating an iterator."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");
map.put(3, "SQL");

map.forEach((key, value) ->
    System.out.println(key + " -> " + value)
);`
      },

      output: `1 -> Java
2 -> Spring
3 -> SQL`
    },

    // =========================================================
    // 20. Bulk Operations
    // =========================================================
    {
      id: "concurrenthashmap-bulk-operations",
      title: "20. Bulk Operations",
      paragraphs: [
        "ConcurrentHashMap provides bulk operations such as forEach, search, and reduce methods that can work with parallelism thresholds.",
        "These methods are useful when processing large concurrent maps and when parallel processing is appropriate."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");
map.put(3, "SQL");

map.forEach(
    1,
    (key, value) ->
        System.out.println(key + " -> " + value)
);`
      },

      bullets: [
        "Bulk operations are designed for concurrent collections.",
        "A parallelism threshold can influence whether processing is performed sequentially or in parallel.",
        "Parallel processing should be used when it provides a practical benefit."
      ]
    },

    // =========================================================
    // 21. Size and Mapping Count
    // =========================================================
    {
      id: "concurrenthashmap-size",
      title: "21. size() and mappingCount()",
      paragraphs: [
        "ConcurrentHashMap provides size() as required by Map and also provides mappingCount().",
        "mappingCount() returns a long and is useful when the number of mappings may exceed the range of int."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<Integer, String> map =
    new ConcurrentHashMap<>();

map.put(1, "Java");
map.put(2, "Spring");

System.out.println(map.size());
System.out.println(map.mappingCount());`
      },

      output: `2
2`
    },

    // =========================================================
    // 22. Performance
    // =========================================================
    {
      id: "concurrenthashmap-performance",
      title: "22. ConcurrentHashMap Performance",
      paragraphs: [
        "ConcurrentHashMap is designed to provide efficient concurrent access without serializing every operation behind one global lock.",
        "Modern Java implementations use sophisticated synchronization and non-blocking techniques internally.",
        "The exact internal implementation has changed across Java versions, so application code should depend on the concurrency contract rather than historical implementation descriptions."
      ],

      code: {
        language: "text",
        code: `Concurrent access

Thread 1 ──┐
Thread 2 ──┼──> ConcurrentHashMap
Thread 3 ──┤
Thread 4 ──┘

Goal:
Safe concurrent access
+
High concurrency`
      },

      bullets: [
        "Basic lookup operations are typically O(1) average under normal hashing behavior.",
        "Concurrent updates may involve synchronization or atomic mechanisms internally.",
        "Performance depends on contention, workload, key distribution, and JVM implementation."
      ]
    },

    // =========================================================
    // 23. ConcurrentHashMap vs HashMap
    // =========================================================
    {
      id: "concurrenthashmap-vs-hashmap",
      title: "23. ConcurrentHashMap vs HashMap",
      paragraphs: [
        "HashMap is a general-purpose Map but is not designed for concurrent modification by multiple threads.",
        "ConcurrentHashMap is specifically designed for concurrent access."
      ],

      code: {
        language: "text",
        code: `HashMap
- Not thread-safe
- Allows null key/value
- General-purpose Map

ConcurrentHashMap
- Thread-safe concurrent Map
- No null key/value
- Atomic concurrent operations`
      },

      bullets: [
        "Single-threaded normal map → HashMap is often sufficient.",
        "Concurrent shared map → ConcurrentHashMap may be appropriate.",
        "Do not use ConcurrentHashMap merely because it sounds faster or safer; choose based on actual concurrency requirements."
      ]
    },

    // =========================================================
    // 24. ConcurrentHashMap vs Hashtable
    // =========================================================
    {
      id: "concurrenthashmap-vs-hashtable",
      title: "24. ConcurrentHashMap vs Hashtable",
      paragraphs: [
        "Both Hashtable and ConcurrentHashMap provide thread-safe Map behavior, but they use different concurrency designs.",
        "Hashtable is a legacy synchronized collection, whereas ConcurrentHashMap is specifically designed for modern concurrent access."
      ],

      code: {
        language: "text",
        code: `Hashtable
- Legacy
- Synchronized methods
- No null key/value
- Lower concurrency design

ConcurrentHashMap
- Modern concurrent Map
- Fine-grained concurrency mechanisms
- No null key/value
- Designed for concurrent applications`
      },

      bullets: [
        "Hashtable synchronizes its legacy methods.",
        "ConcurrentHashMap is designed for higher concurrency.",
        "ConcurrentHashMap is generally the modern choice for a shared concurrent Map."
      ]
    },

    // =========================================================
    // 25. ConcurrentHashMap vs Collections.synchronizedMap()
    // =========================================================
    {
      id: "concurrenthashmap-vs-synchronizedmap",
      title: "25. ConcurrentHashMap vs synchronizedMap()",
      paragraphs: [
        "Collections.synchronizedMap() creates a synchronized wrapper around another Map.",
        "This is different from ConcurrentHashMap, which is designed as a concurrent Map implementation.",
        "A synchronized wrapper typically serializes access through a common lock, while ConcurrentHashMap is designed to allow greater concurrency."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> synchronizedMap =
    Collections.synchronizedMap(
        new HashMap<>()
    );

ConcurrentMap<Integer, String> concurrentMap =
    new ConcurrentHashMap<>();`
      },

      bullets: [
        "synchronizedMap() → synchronized wrapper.",
        "ConcurrentHashMap → dedicated concurrent Map implementation.",
        "ConcurrentHashMap provides specialized atomic methods such as computeIfAbsent() and merge().",
        "Iteration requirements differ and must be understood for synchronized wrappers."
      ]
    },

    // =========================================================
    // 26. Common Mistakes
    // =========================================================
    {
      id: "concurrenthashmap-common-mistakes",
      title: "26. Common Mistakes",
      paragraphs: [
        "ConcurrentHashMap solves many concurrency problems, but it does not make every piece of application logic automatically thread-safe."
      ],

      bullets: [
        "Mistake 1: Trying to insert null keys or null values.",
        "Mistake 2: Assuming every sequence of separate operations is automatically atomic.",
        "Mistake 3: Using containsKey() + put() instead of putIfAbsent() when atomic insertion is required.",
        "Mistake 4: Ignoring computeIfAbsent(), compute(), and merge().",
        "Mistake 5: Assuming iteration gives a consistent snapshot.",
        "Mistake 6: Assuming all compound business operations become thread-safe automatically.",
        "Mistake 7: Using it without actually needing concurrent access.",
        "Mistake 8: Depending on historical internal implementation details."
      ]
    },

    // =========================================================
    // 27. Best Practices
    // =========================================================
    {
      id: "concurrenthashmap-best-practices",
      title: "27. Best Practices",
      paragraphs: [
        "ConcurrentHashMap is most useful when multiple threads share and update a Map."
      ],

      bullets: [
        "Use ConcurrentHashMap when concurrent Map access is actually required.",
        "Use putIfAbsent() for atomic insertion-if-missing.",
        "Use computeIfAbsent() for lazy value creation.",
        "Use compute() for atomic recalculation.",
        "Use merge() for counters and aggregation.",
        "Do not store null keys or values.",
        "Use immutable or stable keys.",
        "Do not assume iteration provides a snapshot.",
        "Keep business-level multi-step operations carefully designed for concurrency.",
        "Use AtomicInteger, LongAdder, or other specialized concurrency utilities when they better represent the problem."
      ]
    },

    // =========================================================
    // 28. Practical Example
    // =========================================================
    {
      id: "concurrenthashmap-practical-example",
      title: "28. Practical Example — Request Counter",
      paragraphs: [
        "A backend service may need to count requests for different API endpoints while multiple request-processing threads update the counters.",
        "ConcurrentHashMap combined with merge() provides a simple thread-safe approach."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.ConcurrentHashMap;

public class RequestCounter {

    private final ConcurrentHashMap<String, Integer>
        counters = new ConcurrentHashMap<>();

    public void record(String endpoint) {

        counters.merge(
            endpoint,
            1,
            Integer::sum
        );
    }

    public int getCount(String endpoint) {
        return counters.getOrDefault(endpoint, 0);
    }
}`
      },

      output: `record("/api/users")
record("/api/users")
record("/api/orders")

Counts:
 /api/users  -> 2
 /api/orders -> 1`,

      bullets: [
        "Multiple threads can call record().",
        "merge() performs the update atomically for the key.",
        "This is useful for lightweight in-memory counters."
      ]
    },

    // =========================================================
    // 29. Key Points
    // =========================================================
    {
      id: "concurrenthashmap-key-points",
      title: "29. Key Points to Remember",
      paragraphs: [
        "ConcurrentHashMap is one of the most important Java collection classes for concurrent backend applications."
      ],

      bullets: [
        "ConcurrentHashMap is in java.util.concurrent.",
        "It implements ConcurrentMap.",
        "ConcurrentMap extends Map.",
        "It is designed for concurrent access.",
        "It is thread-safe for its supported operations.",
        "It does not allow null keys.",
        "It does not allow null values.",
        "Keys must be unique.",
        "Values can be duplicated.",
        "putIfAbsent() provides atomic insertion-if-absent behavior.",
        "computeIfAbsent() supports atomic lazy computation.",
        "compute() supports atomic recalculation.",
        "merge() is useful for counters and aggregation.",
        "Iterators are weakly consistent.",
        "Iterators do not throw ConcurrentModificationException due to concurrent updates.",
        "It is different from Hashtable.",
        "It is different from Collections.synchronizedMap().",
        "It is designed for concurrent workloads."
      ]
    },

    // =========================================================
    // 30. Interview Questions
    // =========================================================
    {
      id: "concurrenthashmap-interview-questions",
      title: "30. ConcurrentHashMap Interview Questions",
      paragraphs: [
        "These questions cover the most important ConcurrentHashMap concepts for Java backend interviews."
      ],

      interviewQuestions: [
        {
          question: "What is ConcurrentHashMap?",
          answer:
            "ConcurrentHashMap is a Map implementation from java.util.concurrent designed for thread-safe concurrent access."
        },
        {
          question: "Why use ConcurrentHashMap instead of HashMap?",
          answer:
            "HashMap is not designed for concurrent modification by multiple threads. ConcurrentHashMap provides concurrency guarantees and atomic Map operations."
        },
        {
          question: "Why use ConcurrentHashMap instead of Hashtable?",
          answer:
            "Hashtable is a legacy synchronized Map. ConcurrentHashMap is designed specifically for modern concurrent applications and provides greater concurrency."
        },
        {
          question: "Does ConcurrentHashMap allow null keys?",
          answer:
            "No. ConcurrentHashMap does not allow null keys."
        },
        {
          question: "Does ConcurrentHashMap allow null values?",
          answer:
            "No. ConcurrentHashMap does not allow null values."
        },
        {
          question: "What is putIfAbsent()?",
          answer:
            "putIfAbsent() inserts a value only when the key is not already present, and the operation is atomic."
        },
        {
          question: "What is computeIfAbsent()?",
          answer:
            "computeIfAbsent() atomically computes and inserts a value when the key is not already associated with a value."
        },
        {
          question: "What is merge() used for?",
          answer:
            "merge() is useful when a value should be inserted when absent and combined with an existing value when present. It is commonly used for counters."
        },
        {
          question: "What is a weakly consistent iterator?",
          answer:
            "It is an iterator that can safely operate while the collection is concurrently modified. It does not provide a fixed snapshot and does not fail fast because of concurrent modifications."
        },
        {
          question: "Does ConcurrentHashMap throw ConcurrentModificationException?",
          answer:
            "Its iterators do not throw ConcurrentModificationException merely because another thread modifies the map during iteration."
        },
        {
          question: "Is every compound operation automatically atomic?",
          answer:
            "No. Separate method calls form separate operations. Use atomic methods such as putIfAbsent(), compute(), computeIfAbsent(), and merge() when appropriate."
        },
        {
          question: "What is the difference between containsKey() + put() and putIfAbsent()?",
          answer:
            "containsKey() followed by put() consists of two separate operations and can have a race between them. putIfAbsent() expresses the atomic insert-if-absent operation."
        },
        {
          question: "What is the difference between ConcurrentHashMap and Collections.synchronizedMap()?",
          answer:
            "synchronizedMap() creates a synchronized wrapper around a Map, while ConcurrentHashMap is specifically designed as a concurrent Map implementation with specialized atomic operations and greater concurrency."
        },
        {
          question: "Can multiple threads read from ConcurrentHashMap?",
          answer:
            "Yes. ConcurrentHashMap is designed to support concurrent reads and updates."
        },
        {
          question: "Can multiple threads update ConcurrentHashMap?",
          answer:
            "Yes. It supports concurrent updates while maintaining its thread-safety guarantees."
        },
        {
          question: "What happens if computeIfAbsent() returns null?",
          answer:
            "The mapping is not established for that key. ConcurrentHashMap does not permit null values."
        },
        {
          question: "Can compute() remove a mapping?",
          answer:
            "Yes. If the remapping function returns null, the mapping can be removed."
        },
        {
          question: "Which method is useful for a frequency counter?",
          answer:
            "merge() is commonly used because it can atomically combine an existing count with a new increment."
        },
        {
          question: "What is the main difference between HashMap, Hashtable, and ConcurrentHashMap?",
          answer:
            "HashMap is a general-purpose non-concurrent Map, Hashtable is a legacy synchronized Map, and ConcurrentHashMap is a modern concurrent Map designed for shared access by multiple threads."
        },
        {
          question: "Does ConcurrentHashMap make the entire application thread-safe?",
          answer:
            "No. It makes operations on the map conform to its concurrency guarantees, but application-level state involving multiple objects or multiple operations still requires appropriate concurrency design."
        }
      ]
    }
  ]
};