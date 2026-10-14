export const mapFundamentals = {
  id: "map-fundamentals",
  slug: "map-fundamentals",
  title: "Map Fundamentals in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Java Map fundamentals including key-value pairs, Map hierarchy, Map vs Collection, creating maps, put, get, remove, containsKey, containsValue, keySet, values, entrySet, iteration, duplicate keys, null handling, equals and hashCode, sorting concepts, performance, common mistakes, best practices, and interview questions.",
  estimatedTime: "80 min",

  sections: [
    {
      id: "what-is-map",
      title: "1. What is a Map?",
      paragraphs: [
        "A Map is a collection-like data structure that stores data as key-value pairs.",
        "Each key is associated with a value.",
        "Keys are used to identify and retrieve values efficiently.",
        "Unlike List and Set, Map does not extend the Collection interface."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> students = new HashMap<>();

students.put(101, "Rahul");
students.put(102, "Priya");
students.put(103, "Arun");

System.out.println(students.get(101));`
      },
      output: "Rahul"
    },

    {
      id: "key-value-pair",
      title: "2. Key-Value Pair",
      paragraphs: [
        "A Map stores information as a key and its corresponding value.",
        "The key acts as an identifier, while the value represents the associated data.",
        "For example, an employee ID can be used as a key and the employee name as the value."
      ],
      code: {
        language: "text",
        code: `Key       Value

101  →    Rahul
102  →    Priya
103  →    Arun`
      }
    },

    {
      id: "map-unique-keys",
      title: "3. Keys Must Be Unique",
      paragraphs: [
        "A Map cannot contain duplicate keys.",
        "If the same key is inserted again, the new value replaces the previous value associated with that key.",
        "Values, however, can be duplicated."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");
map.put(101, "Arun");

System.out.println(map);`
      },
      output: "{101=Arun, 102=Priya}"
    },

    {
      id: "duplicate-values",
      title: "4. Duplicate Values",
      paragraphs: [
        "Map keys must be unique, but multiple keys can have the same value."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Java");
map.put(102, "Java");
map.put(103, "Spring");

System.out.println(map);`
      },
      output: "{101=Java, 102=Java, 103=Spring}"
    },

    {
      id: "map-hierarchy",
      title: "5. Map Hierarchy",
      paragraphs: [
        "Map is an interface in the Java Collections Framework.",
        "Unlike List, Set, and Queue, Map does not extend Collection.",
        "Important Map implementations include HashMap, LinkedHashMap, TreeMap, Hashtable, and ConcurrentHashMap."
      ],
      code: {
        language: "text",
        code: `Map
├── HashMap
├── LinkedHashMap
├── TreeMap
├── Hashtable
└── ConcurrentHashMap`
      }
    },

    {
      id: "map-not-collection",
      title: "6. Why Map Does Not Extend Collection",
      paragraphs: [
        "Collection represents a group of individual elements.",
        "Map represents associations between keys and values.",
        "Because the data model is different, Map has its own interface hierarchy instead of extending Collection."
      ],
      code: {
        language: "text",
        code: `Collection:

A
B
C


Map:

A → 100
B → 200
C → 300`
      },
      bullets: [
        "Collection represents individual elements.",
        "Map represents key-value associations.",
        "Map and Collection are separate top-level interfaces in the Collections Framework."
      ]
    },

    {
      id: "creating-map",
      title: "7. Creating a Map",
      paragraphs: [
        "Map is an interface, so we create an object using a concrete implementation such as HashMap."
      ],
      code: {
        language: "java",
        code: `Map<String, Integer> scores =
        new HashMap<>();

scores.put("Java", 90);
scores.put("Spring", 85);

System.out.println(scores);`
      },
      output: "{Java=90, Spring=85}"
    },

    {
      id: "generics-map",
      title: "8. Generics with Map",
      paragraphs: [
        "Generics specify the type of keys and values stored in a Map.",
        "Using generics provides compile-time type safety."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> employees =
        new HashMap<>();

employees.put(101, "Rahul");
employees.put(102, "Priya");

// employees.put("103", "Arun");
// Compile-time error`
      }
    },

    {
      id: "put-method",
      title: "9. put() Method",
      paragraphs: [
        "The put() method adds a key-value pair to the Map.",
        "If the key already exists, its associated value is replaced."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

System.out.println(map);`
      },
      output: "{101=Rahul, 102=Priya}"
    },

    {
      id: "put-return-value",
      title: "10. What Does put() Return?",
      paragraphs: [
        "put() returns the previous value associated with the key.",
        "If there was no previous mapping, it returns null."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

System.out.println(map.put(101, "Rahul"));
System.out.println(map.put(101, "Arun"));`
      },
      output: `null
Rahul`
    },

    {
      id: "get-method",
      title: "11. get() Method",
      paragraphs: [
        "The get() method retrieves the value associated with a key.",
        "If the key is not present, get() returns null."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

System.out.println(map.get(101));
System.out.println(map.get(999));`
      },
      output: `Rahul
null`
    },

    {
      id: "get-default",
      title: "12. getOrDefault()",
      paragraphs: [
        "getOrDefault() returns the mapped value when the key exists.",
        "If the key does not exist, it returns a specified default value."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");

System.out.println(
    map.getOrDefault(101, "Unknown")
);

System.out.println(
    map.getOrDefault(999, "Unknown")
);`
      },
      output: `Rahul
Unknown`
    },

    {
      id: "contains-key",
      title: "13. containsKey()",
      paragraphs: [
        "containsKey() checks whether a specific key exists in the Map.",
        "It returns true if the key is present and false otherwise."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");

System.out.println(map.containsKey(101));
System.out.println(map.containsKey(999));`
      },
      output: `true
false`
    },

    {
      id: "contains-value",
      title: "14. containsValue()",
      paragraphs: [
        "containsValue() checks whether at least one mapping contains the specified value."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

System.out.println(map.containsValue("Priya"));
System.out.println(map.containsValue("Arun"));`
      },
      output: `true
false`
    },

    {
      id: "remove-method",
      title: "15. remove() Method",
      paragraphs: [
        "remove(key) removes the mapping associated with the specified key.",
        "It returns the value that was previously associated with the key, or null if no mapping existed."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

String removed = map.remove(101);

System.out.println(removed);
System.out.println(map);`
      },
      output: `Rahul
{102=Priya}`
    },

    {
      id: "remove-key-value",
      title: "16. remove(key, value)",
      paragraphs: [
        "Map also provides remove(key, value), which removes the mapping only when both the key and value match."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");

System.out.println(
    map.remove(101, "Priya")
);

System.out.println(
    map.remove(101, "Rahul")
);`
      },
      output: `false
true`
    },

    {
      id: "replace",
      title: "17. replace() Methods",
      paragraphs: [
        "replace() updates an existing mapping.",
        "The key must already exist for the replacement to occur."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");

System.out.println(
    map.replace(101, "Arun")
);

System.out.println(map);`
      },
      output: `Rahul
{101=Arun}`
    },

    {
      id: "put-if-absent",
      title: "18. putIfAbsent()",
      paragraphs: [
        "putIfAbsent() adds a mapping only when the key is not already associated with a value.",
        "It is useful when an existing mapping should not be overwritten."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");

map.putIfAbsent(101, "Arun");
map.putIfAbsent(102, "Priya");

System.out.println(map);`
      },
      output: "{101=Rahul, 102=Priya}"
    },

    {
      id: "keyset",
      title: "19. keySet()",
      paragraphs: [
        "keySet() returns a Set view containing the keys of the Map.",
        "Because keys are unique, the returned collection is a Set."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");
map.put(103, "Arun");

Set<Integer> keys = map.keySet();

System.out.println(keys);`
      },
      output: "[101, 102, 103]"
    },

    {
      id: "values",
      title: "20. values()",
      paragraphs: [
        "values() returns a Collection view containing the values stored in the Map.",
        "Values do not have to be unique."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Java");
map.put(102, "Java");
map.put(103, "Spring");

System.out.println(map.values());`
      },
      output: "[Java, Java, Spring]"
    },

    {
      id: "entryset",
      title: "21. entrySet()",
      paragraphs: [
        "entrySet() returns a Set view containing Map.Entry objects.",
        "Each Map.Entry represents one key-value mapping.",
        "entrySet() is commonly used when both key and value are required during iteration."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

for (Map.Entry<Integer, String> entry
        : map.entrySet()) {

    System.out.println(
        entry.getKey() + " -> " + entry.getValue()
    );
}`
      },
      output: `101 -> Rahul
102 -> Priya`
    },

    {
      id: "map-iteration",
      title: "22. Iterating Through a Map",
      paragraphs: [
        "A Map can be traversed using keySet(), values(), or entrySet().",
        "When both key and value are required, entrySet() is usually the clearest choice."
      ],
      code: {
        language: "java",
        code: `Map<String, Integer> scores =
        new HashMap<>();

scores.put("Java", 90);
scores.put("Spring", 85);

for (Map.Entry<String, Integer> entry
        : scores.entrySet()) {

    System.out.println(
        entry.getKey() + " = " + entry.getValue()
    );
}`
      },
      output: `Java = 90
Spring = 85`
    },

    {
      id: "foreach-map",
      title: "23. forEach() with Map",
      paragraphs: [
        "Map provides a forEach() method that accepts a BiConsumer.",
        "The lambda receives both the key and value."
      ],
      code: {
        language: "java",
        code: `Map<String, Integer> scores =
        new HashMap<>();

scores.put("Java", 90);
scores.put("Spring", 85);

scores.forEach(
    (subject, score) ->
        System.out.println(subject + " = " + score)
);`
      },
      output: `Java = 90
Spring = 85`
    },

    {
      id: "map-size-empty",
      title: "24. size(), isEmpty(), and clear()",
      paragraphs: [
        "size() returns the number of mappings.",
        "isEmpty() checks whether the Map contains no mappings.",
        "clear() removes all mappings."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

System.out.println(map.size());
System.out.println(map.isEmpty());

map.clear();

System.out.println(map.isEmpty());`
      },
      output: `2
false
true`
    },

    {
      id: "null-map",
      title: "25. Null Keys and Null Values",
      paragraphs: [
        "Null support depends on the Map implementation.",
        "For example, HashMap permits one null key and multiple null values.",
        "Other implementations such as Hashtable have different null restrictions.",
        "Therefore, null behavior should always be considered together with the chosen Map implementation."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map = new HashMap<>();

map.put(null, "Unknown");
map.put(101, null);
map.put(102, null);

System.out.println(map);`
      },
      output: "{null=Unknown, 101=null, 102=null}"
    },

    {
      id: "equals-hashcode",
      title: "26. equals() and hashCode() in Maps",
      paragraphs: [
        "Hash-based Maps use hashCode() to help locate a candidate bucket and equals() to determine logical key equality.",
        "Therefore, custom objects used as HashMap keys should implement equals() and hashCode() consistently.",
        "If two keys are equal according to equals(), they must return the same hash code."
      ],
      code: {
        language: "java",
        code: `class Employee {
    private int id;

    Employee(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Employee)) return false;

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
        "Equal keys must have equal hash codes.",
        "The same hash code does not mean objects are equal.",
        "Avoid changing fields that participate in equality/hashCode while the object is being used as a hash-based Map key."
      ]
    },

    {
      id: "map-ordering",
      title: "27. Map Ordering",
      paragraphs: [
        "Map ordering depends on the implementation.",
        "HashMap does not guarantee iteration order.",
        "LinkedHashMap maintains insertion order by default.",
        "TreeMap maintains keys according to their ordering."
      ],
      code: {
        language: "text",
        code: `HashMap
→ no guaranteed iteration order

LinkedHashMap
→ insertion order

TreeMap
→ sorted key order`
      }
    },

    {
      id: "map-performance",
      title: "28. Map Performance Basics",
      paragraphs: [
        "Performance depends on the Map implementation.",
        "For a HashMap, basic put(), get(), and remove() operations are typically O(1) on average under normal hashing conditions.",
        "TreeMap provides O(log n) basic lookup, insertion, and removal because it maintains sorted keys."
      ],
      code: {
        language: "text",
        code: `HashMap:
put()     → O(1) average
get()      → O(1) average
remove()   → O(1) average

TreeMap:
put()      → O(log n)
get()       → O(log n)
remove()    → O(log n)

Note:
Actual performance depends on implementation
and data distribution.`
      }
    },

    {
      id: "common-mistakes-best-practices",
      title: "29. Common Mistakes and Best Practices",
      paragraphs: [
        "Map fundamentals are simple, but several details frequently cause interview and production mistakes."
      ],
      bullets: [
        "Remember that Map does not extend Collection.",
        "Keys are unique; values can be duplicated.",
        "Inserting an existing key replaces its previous value when using put().",
        "Use containsKey() when you specifically need to know whether a key exists.",
        "Do not rely on HashMap iteration order.",
        "Use entrySet() when both key and value are needed during iteration.",
        "Understand the null policy of the selected Map implementation.",
        "Implement equals() and hashCode() correctly for custom hash-based Map keys.",
        "Do not mutate equality/hashCode fields of a key while it is stored in a hash-based Map.",
        "Choose LinkedHashMap when insertion order matters.",
        "Choose TreeMap when sorted-key behavior matters.",
        "Choose HashMap when general hash-based key-value storage is required."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "Map is one of the most important parts of the Java Collections Framework.",
        "The most important concepts are key uniqueness, value duplication, Map.Entry, Map views, implementation-specific ordering, and equals/hashCode behavior."
      ],
      bullets: [
        "Map stores key-value pairs.",
        "Keys are unique.",
        "Values can be duplicated.",
        "Map does not extend Collection.",
        "HashMap provides general-purpose hash-based Map behavior.",
        "LinkedHashMap maintains insertion order by default.",
        "TreeMap maintains sorted key order.",
        "keySet() returns a Set view of keys.",
        "values() returns a Collection view of values.",
        "entrySet() returns a Set view of Map.Entry objects.",
        "put() replaces the value for an existing key.",
        "get() retrieves a value by key.",
        "containsKey() checks key existence.",
        "containsValue() checks value existence.",
        "equals() and hashCode() are critical for custom hash-based keys."
      ],
      interviewQuestions: [
        {
          question: "What is a Map in Java?",
          answer:
            "Map is an interface that stores data as key-value pairs. Each key is unique and is associated with a value."
        },
        {
          question: "Does Map extend Collection?",
          answer:
            "No. Map is a separate interface because it represents key-value associations rather than a collection of individual elements."
        },
        {
          question: "Can a Map have duplicate keys?",
          answer:
            "No. Keys are unique. If an existing key is inserted again using put(), its value is replaced."
        },
        {
          question: "Can a Map have duplicate values?",
          answer:
            "Yes. Multiple keys can map to the same value."
        },
        {
          question: "What happens when put() is called with an existing key?",
          answer:
            "The existing value associated with that key is replaced, and put() returns the previous value."
        },
        {
          question: "What does get() return when a key does not exist?",
          answer:
            "get() returns null when the key is not mapped, although implementations and APIs such as getOrDefault() can be used when a different default behavior is needed."
        },
        {
          question: "What is the difference between containsKey() and containsValue()?",
          answer:
            "containsKey() checks whether a key exists, while containsValue() checks whether at least one mapping contains the specified value."
        },
        {
          question: "What is keySet()?",
          answer:
            "keySet() returns a Set view containing the keys of the Map."
        },
        {
          question: "What is values()?",
          answer:
            "values() returns a Collection view containing the values stored in the Map."
        },
        {
          question: "What is entrySet()?",
          answer:
            "entrySet() returns a Set view of Map.Entry objects, where each entry represents one key-value mapping."
        },
        {
          question: "Why is entrySet() commonly used for Map iteration?",
          answer:
            "It provides both the key and value together, avoiding the need to retrieve the value separately using get(key)."
        },
        {
          question: "What is the difference between HashMap, LinkedHashMap, and TreeMap?",
          answer:
            "HashMap provides general hash-based storage without a guaranteed iteration order, LinkedHashMap maintains insertion order by default, and TreeMap maintains keys according to their ordering."
        },
        {
          question: "What is the role of equals() and hashCode() in HashMap keys?",
          answer:
            "hashCode() helps locate a candidate bucket and equals() determines logical key equality. Equal keys must have the same hash code."
        },
        {
          question: "Can HashMap contain null?",
          answer:
            "Yes. HashMap permits one null key and multiple null values."
        },
        {
          question: "What is the average time complexity of HashMap get()?",
          answer:
            "Under normal hashing conditions, HashMap get() is typically O(1) on average."
        }
      ]
    }
  ]
};