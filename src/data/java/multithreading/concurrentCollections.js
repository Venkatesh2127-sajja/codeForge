export const concurrentCollections = {
  id: "concurrent-collections",

  slug: "concurrent-collections",

  title: "Concurrent Collections in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn Java concurrent collections including ConcurrentHashMap, CopyOnWriteArrayList, and ConcurrentLinkedQueue, along with atomic operations, iteration behavior, and practical backend use cases.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "why-concurrent-collections",
      title: "1. Why Concurrent Collections?",

      paragraphs: [
        "Normal collections such as HashMap, ArrayList, and LinkedList are not designed for arbitrary concurrent modification by multiple threads.",
        "Concurrent collections provide thread-safe operations designed for concurrent access."
      ],

      code: {
        language: "text",
        code: `Multiple Threads
      |
      +--------+
      |        |
      v        v
   Thread A  Thread B
      |        |
      +--------+
           |
           v
   Concurrent Collection`
      }
    },

    {
      id: "hashmap-problem",
      title: "2. HashMap vs ConcurrentHashMap",

      paragraphs: [
        "HashMap does not provide thread-safe concurrent access for modifications.",
        "ConcurrentHashMap is designed for concurrent access and provides thread-safe operations without requiring the entire map to be protected by one application-level synchronized block."
      ],

      code: {
        language: "java",
        code: `Map<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 1);
map.put("Spring", 2);`
      }
    },

    {
      id: "concurrent-hashmap",
      title: "3. ConcurrentHashMap",

      paragraphs: [
        "ConcurrentHashMap is a thread-safe implementation of ConcurrentMap.",
        "It supports concurrent reads and updates while coordinating access internally."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 10);
map.put("Spring", 20);

int value = map.get("Java");`
      },

      bullets: [
        "Thread-safe map operations",
        "High concurrency",
        "Does not allow null keys or null values",
        "Useful for shared in-memory maps"
      ]
    },

    {
      id: "concurrent-hashmap-null",
      title: "4. Why ConcurrentHashMap Does Not Allow null",

      paragraphs: [
        "ConcurrentHashMap does not permit null keys or null values.",
        "This avoids ambiguity when get() returns null: null can consistently mean that the key is absent rather than representing a stored null value."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.put("Java", 100);

// Not allowed:
// map.put("Spring", null);
// map.put(null, 200);`
      }
    },

    {
      id: "put-if-absent",
      title: "5. putIfAbsent()",

      paragraphs: [
        "putIfAbsent() inserts a value only when the key does not already have a mapping."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

map.putIfAbsent("Java", 100);

map.putIfAbsent("Java", 200);

System.out.println(
    map.get("Java")
);

// Output:
// 100`
      }
    },

    {
      id: "compute-if-absent",
      title: "6. computeIfAbsent()",

      paragraphs: [
        "computeIfAbsent() atomically computes and inserts a value when the key is absent."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> counts =
    new ConcurrentHashMap<>();

counts.computeIfAbsent(
    "Java",
    key -> 0
);

counts.computeIfAbsent(
    "Spring",
    key -> 10
);`
      },

      paragraphs: [
        "This is especially useful when lazily creating values such as lists, sets, or cached objects."
      ]
    },

    {
      id: "merge",
      title: "7. merge()",

      paragraphs: [
        "merge() is useful when a value needs to be inserted if absent or combined with the existing value."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> counts =
    new ConcurrentHashMap<>();

counts.merge(
    "Java",
    1,
    Integer::sum
);

counts.merge(
    "Java",
    1,
    Integer::sum
);

System.out.println(
    counts.get("Java")
);

// Output:
// 2`
      }
    },

    {
      id: "concurrent-operations",
      title: "8. Atomic Map Operations",

      paragraphs: [
        "Compound map operations such as putIfAbsent(), computeIfAbsent(), compute(), and merge() are designed to perform their respective map-level actions atomically."
      ],

      code: {
        language: "java",
        code: `map.putIfAbsent(key, value);

map.computeIfAbsent(
    key,
    k -> createValue()
);

map.merge(
    key,
    value,
    Integer::sum
);`
      },

      bullets: [
        "Prefer these operations when they directly express the required concurrent update.",
        "Do not assume that an arbitrary sequence of separate map calls is automatically one atomic business operation."
      ]
    },

    {
      id: "copy-on-write",
      title: "9. CopyOnWriteArrayList",

      paragraphs: [
        "CopyOnWriteArrayList is a thread-safe list designed for workloads where reads and iteration are frequent while modifications are relatively infrequent.",
        "When the list is modified, a new internal array is created."
      ],

      code: {
        language: "java",
        code: `CopyOnWriteArrayList<String> users =
    new CopyOnWriteArrayList<>();

users.add("Alice");
users.add("Bob");

for (String user : users) {
    System.out.println(user);
}`
      },

      bullets: [
        "Thread-safe",
        "Good for many readers and few writers",
        "Iteration does not require external synchronization",
        "Writes are more expensive because the underlying array is copied"
      ]
    },

    {
      id: "copy-on-write-example",
      title: "10. CopyOnWriteArrayList During Iteration",

      code: {
        language: "java",
        code: `CopyOnWriteArrayList<Integer> list =
    new CopyOnWriteArrayList<>();

list.add(1);
list.add(2);

for (Integer value : list) {

    list.add(3);

    System.out.println(value);
}`
      },

      paragraphs: [
        "The iterator works over a snapshot of the array that existed when the iterator was created.",
        "Therefore, modifications made after iterator creation are not reflected in that iterator's traversal."
      ]
    },

    {
      id: "concurrent-linked-queue",
      title: "11. ConcurrentLinkedQueue",

      paragraphs: [
        "ConcurrentLinkedQueue is a thread-safe, non-blocking queue suitable for concurrent producer-consumer style access when blocking behavior is not required."
      ],

      code: {
        language: "java",
        code: `ConcurrentLinkedQueue<String> queue =
    new ConcurrentLinkedQueue<>();

queue.offer("Task-1");
queue.offer("Task-2");

String task = queue.poll();`
      },

      bullets: [
        "Thread-safe",
        "Non-blocking",
        "FIFO queue",
        "Does not allow null elements"
      ]
    },

    {
      id: "non-blocking",
      title: "12. What Does Non-Blocking Mean Here?",

      paragraphs: [
        "A non-blocking concurrent collection generally uses atomic operations such as CAS rather than requiring threads to wait for a traditional mutual-exclusion lock for every operation.",
        "This does not mean the operation is guaranteed to finish instantly."
      ]
    },

    {
      id: "weakly-consistent",
      title: "13. Weakly Consistent Iterators",

      paragraphs: [
        "Some concurrent collections provide weakly consistent iterators.",
        "Such iterators do not generally throw ConcurrentModificationException merely because other threads modify the collection during iteration.",
        "The iterator does not provide a single immutable snapshot of all changes."
      ],

      code: {
        language: "java",
        code: `ConcurrentHashMap<String, Integer> map =
    new ConcurrentHashMap<>();

for (String key : map.keySet()) {

    // Another thread may update map
    // during this iteration.
}`
      }
    },

    {
      id: "concurrent-vs-synchronized",
      title: "14. Concurrent Collection vs synchronized Collection",

      bullets: [
        "Concurrent collections are designed specifically for concurrent access.",
        "Collections.synchronizedList() synchronizes individual list operations using a common monitor.",
        "Concurrent collections often provide better concurrency for appropriate workloads.",
        "A synchronized wrapper may still require external synchronization during iteration."
      ],

      code: {
        language: "java",
        code: `List<String> list =
    Collections.synchronizedList(
        new ArrayList<>()
    );

synchronized (list) {
    for (String value : list) {
        System.out.println(value);
    }
}`
      }
    },

    {
      id: "copy-on-write-vs-arraylist",
      title: "15. ArrayList vs CopyOnWriteArrayList",

      bullets: [
        "ArrayList → not thread-safe for concurrent modification",
        "CopyOnWriteArrayList → thread-safe",
        "ArrayList → efficient normal reads and writes",
        "CopyOnWriteArrayList → useful for many reads and few writes",
        "CopyOnWriteArrayList → writes involve copying the underlying array"
      ]
    },

    {
      id: "hashmap-vs-concurrent",
      title: "16. HashMap vs ConcurrentHashMap",

      bullets: [
        "HashMap → not designed for concurrent modification",
        "ConcurrentHashMap → designed for concurrent access",
        "HashMap → allows null key and null values",
        "ConcurrentHashMap → does not allow null keys or null values",
        "ConcurrentHashMap → supports atomic compound map operations"
      ]
    },

    {
      id: "queue-comparison",
      title: "17. ConcurrentLinkedQueue vs BlockingQueue",

      bullets: [
        "ConcurrentLinkedQueue → non-blocking queue",
        "BlockingQueue → supports blocking put() and take()",
        "ConcurrentLinkedQueue → useful when callers should not wait for capacity/data",
        "BlockingQueue → useful for classic Producer-Consumer coordination"
      ],

      code: {
        language: "java",
        code: `// Non-blocking
ConcurrentLinkedQueue<Integer> queue =
    new ConcurrentLinkedQueue<>();

queue.offer(10);
queue.poll();


// Blocking
BlockingQueue<Integer> blockingQueue =
    new ArrayBlockingQueue<>(10);

blockingQueue.put(10);
blockingQueue.take();`
      }
    },

    {
      id: "backend-cache",
      title: "18. Backend Example: Concurrent Cache",

      paragraphs: [
        "A backend application may maintain a small JVM-local cache shared by multiple request threads.",
        "ConcurrentHashMap can be useful when multiple requests need to read and update that cache concurrently."
      ],

      code: {
        language: "java",
        code: `@Service
public class UserCache {

    private final ConcurrentHashMap<Long, String> cache =
        new ConcurrentHashMap<>();

    public void put(Long id, String name) {
        cache.put(id, name);
    }

    public String get(Long id) {
        return cache.get(id);
    }

    public String loadIfMissing(
            Long id,
            Supplier<String> loader) {

        return cache.computeIfAbsent(
            id,
            key -> loader.get()
        );
    }
}`
      }
    },

    {
      id: "backend-listeners",
      title: "19. Backend Example: CopyOnWriteArrayList",

      paragraphs: [
        "CopyOnWriteArrayList can be appropriate for a collection such as registered listeners where reads and iteration happen frequently but registration or removal happens relatively rarely."
      ],

      code: {
        language: "java",
        code: `private final CopyOnWriteArrayList<Runnable>
    listeners = new CopyOnWriteArrayList<>();

public void register(Runnable listener) {
    listeners.add(listener);
}

public void notifyListeners() {

    for (Runnable listener : listeners) {
        listener.run();
    }
}`
      }
    },

    {
      id: "choosing",
      title: "20. Which Concurrent Collection Should You Use?",

      bullets: [
        "Shared key-value data → ConcurrentHashMap",
        "Many reads + few writes in a list → CopyOnWriteArrayList",
        "Non-blocking concurrent FIFO queue → ConcurrentLinkedQueue",
        "Producer-Consumer with waiting → BlockingQueue",
        "Normal single-threaded collection → use ordinary collections unless concurrency is actually required"
      ]
    },

    {
      id: "common-mistakes",
      title: "21. Common Mistakes",

      bullets: [
        "Assuming every method sequence on a concurrent collection is automatically atomic.",
        "Using CopyOnWriteArrayList for write-heavy workloads.",
        "Using ConcurrentLinkedQueue when blocking Producer-Consumer behavior is required.",
        "Using ConcurrentHashMap with null keys or values.",
        "Assuming concurrent collections eliminate all application-level race conditions.",
        "Using JVM-local concurrent collections when shared state must be coordinated across multiple application instances."
      ]
    },

    {
      id: "interview-questions",
      title: "22. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is ConcurrentHashMap?",
          answer:
            "ConcurrentHashMap is a thread-safe map designed for concurrent access and updates."
        },

        {
          question: "Does ConcurrentHashMap allow null?",
          answer:
            "No. It does not allow null keys or null values."
        },

        {
          question: "Why is ConcurrentHashMap preferred over Hashtable?",
          answer:
            "ConcurrentHashMap is designed for modern concurrent access and provides finer-grained concurrency than the broad synchronization approach historically used by Hashtable."
        },

        {
          question: "What is CopyOnWriteArrayList?",
          answer:
            "It is a thread-safe list optimized for workloads with frequent reads and relatively infrequent writes."
        },

        {
          question: "Why is CopyOnWriteArrayList expensive for writes?",
          answer:
            "A modification creates a new copy of the underlying array."
        },

        {
          question: "What is ConcurrentLinkedQueue?",
          answer:
            "It is a thread-safe non-blocking FIFO queue designed for concurrent access."
        },

        {
          question: "What is the difference between ConcurrentLinkedQueue and BlockingQueue?",
          answer:
            "ConcurrentLinkedQueue is non-blocking, while BlockingQueue provides blocking operations such as put() and take()."
        },

        {
          question: "What is a weakly consistent iterator?",
          answer:
            "It is an iterator that can safely operate while concurrent modifications occur and does not generally provide a fixed snapshot of all changes."
        },

        {
          question: "Is ConcurrentHashMap completely race-condition-proof?",
          answer:
            "No. Its individual and documented compound operations are designed for concurrency, but application-level sequences involving multiple independent operations may still require additional coordination."
        },

        {
          question: "Can concurrent collections be used to synchronize multiple JVM instances?",
          answer:
            "No. They provide coordination within a JVM. Distributed coordination requires mechanisms such as a database, distributed cache, or distributed locking system depending on the use case."
        }
      ]
    },

    {
      id: "interview-version",
      title: "23. Interview Version",

      paragraphs: [
        "Java provides concurrent collections such as ConcurrentHashMap, CopyOnWriteArrayList, and ConcurrentLinkedQueue for thread-safe access from multiple threads. ConcurrentHashMap is useful for shared key-value data, CopyOnWriteArrayList is suitable for read-heavy list workloads, and ConcurrentLinkedQueue provides a non-blocking FIFO queue. For blocking Producer-Consumer workflows, BlockingQueue is usually more appropriate."
      ]
    },

    {
      id: "final-note",
      title: "24. Final Note",

      bullets: [
        "ConcurrentHashMap → concurrent key-value data",
        "CopyOnWriteArrayList → many reads, few writes",
        "ConcurrentLinkedQueue → non-blocking FIFO queue",
        "BlockingQueue → blocking Producer-Consumer",
        "putIfAbsent / computeIfAbsent / merge → useful atomic map operations",
        "Concurrent collections → thread-safe collection operations",
        "Thread-safe collection ≠ automatically thread-safe business logic",
        "JVM-local concurrency ≠ distributed synchronization"
      ]
    }
  ]
};