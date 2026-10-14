export const hashMap = {
  id: "hashmap",
  slug: "hashmap",
  title: "HashMap in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn HashMap in Java from key-value fundamentals to hashing, hashCode(), equals(), buckets, collisions, internal working, load factor, resizing, treeification, custom objects, mutable keys, performance, comparisons, common mistakes, best practices, and interview questions.",
  estimatedTime: "90 min",

  sections: [
    {
      id: "what-is-hashmap",
      title: "1. What is HashMap?",
      paragraphs: [
        "HashMap is a hash-based implementation of the Map interface in Java.",
        "It stores data as key-value pairs.",
        "HashMap uses the key to determine where a mapping should be stored and retrieved.",
        "It provides efficient average-time lookup, insertion, and removal under normal hashing conditions."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> employees =
        new HashMap<>();

employees.put(101, "Rahul");
employees.put(102, "Priya");
employees.put(103, "Arun");

System.out.println(employees.get(102));`
      },
      output: "Priya"
    },

    {
      id: "hashmap-hierarchy",
      title: "2. HashMap Hierarchy",
      paragraphs: [
        "HashMap implements the Map interface.",
        "Map is separate from the Collection hierarchy."
      ],
      code: {
        language: "text",
        code: `Map
  ↓
HashMap`
      },
      bullets: [
        "HashMap is not a subtype of Collection.",
        "HashMap stores mappings rather than individual elements."
      ]
    },

    {
      id: "creating-hashmap",
      title: "3. Creating a HashMap",
      paragraphs: [
        "HashMap can be created using its no-argument constructor.",
        "You can also provide an initial capacity and load factor when appropriate."
      ],
      code: {
        language: "java",
        code: `HashMap<String, Integer> scores =
        new HashMap<>();

scores.put("Java", 90);
scores.put("Spring", 85);

System.out.println(scores);`
      },
      output: "{Java=90, Spring=85}"
    },

    {
      id: "generics",
      title: "4. Generics with HashMap",
      paragraphs: [
        "Generics specify the key and value types.",
        "This provides compile-time type safety and avoids unnecessary casts when retrieving values."
      ],
      code: {
        language: "java",
        code: `HashMap<Integer, String> map =
        new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

// map.put("103", "Arun");
// Compile-time error`
      }
    },

    {
      id: "put-get",
      title: "5. put() and get()",
      paragraphs: [
        "put() inserts or updates a mapping.",
        "get() retrieves the value associated with a key."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

System.out.println(map.get(101));`
      },
      output: "Rahul"
    },

    {
      id: "duplicate-key",
      title: "6. Duplicate Keys",
      paragraphs: [
        "HashMap does not allow multiple mappings for the same logical key.",
        "When put() is called with an existing key, the old value is replaced."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new HashMap<>();

map.put(101, "Rahul");
map.put(101, "Arun");

System.out.println(map.get(101));`
      },
      output: "Arun"
    },

    {
      id: "duplicate-values",
      title: "7. Duplicate Values",
      paragraphs: [
        "HashMap allows duplicate values.",
        "Different keys can point to the same value."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new HashMap<>();

map.put(101, "Java");
map.put(102, "Java");

System.out.println(map);`
      },
      output: "{101=Java, 102=Java}"
    },

    {
      id: "null-support",
      title: "8. Null Key and Null Values",
      paragraphs: [
        "HashMap permits one null key and multiple null values.",
        "This is a characteristic of HashMap and should not be assumed for every Map implementation."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new HashMap<>();

map.put(null, "Unknown");
map.put(101, null);
map.put(102, null);

System.out.println(map);`
      },
      output: "{null=Unknown, 101=null, 102=null}"
    },

    {
      id: "hashing",
      title: "9. What is Hashing?",
      paragraphs: [
        "Hashing is a technique used to convert data into a hash value.",
        "HashMap uses hashing to help determine where a key-value mapping should be stored.",
        "The goal is to efficiently locate a candidate storage position for a key."
      ],
      code: {
        language: "text",
        code: `Key
 ↓
hashCode()
 ↓
hash value
 ↓
bucket location
 ↓
stored/retrieved mapping`
      }
    },

    {
      id: "hashcode",
      title: "10. What is hashCode()?",
      paragraphs: [
        "hashCode() is a method defined by Object and inherited by Java objects.",
        "HashMap uses the key's hash code as part of its hashing process.",
        "The hash code helps identify a candidate bucket."
      ],
      code: {
        language: "java",
        code: `String key = "Java";

int hash = key.hashCode();

System.out.println(hash);`
      },
      bullets: [
        "hashCode() returns an int.",
        "Equal objects must have the same hash code.",
        "Different objects can have the same hash code."
      ]
    },

    {
      id: "equals",
      title: "11. What is equals()?",
      paragraphs: [
        "equals() determines logical equality between objects.",
        "HashMap uses equals() when multiple keys are candidates within the same hash location.",
        "This allows HashMap to distinguish keys that have the same hash code."
      ],
      code: {
        language: "java",
        code: `String a = new String("Java");
String b = new String("Java");

System.out.println(a.equals(b));
System.out.println(a.hashCode() == b.hashCode());`
      },
      output: `true
true`
    },

    {
      id: "equals-hashcode-contract",
      title: "12. equals() and hashCode() Contract",
      paragraphs: [
        "The most important rule is that if two objects are equal according to equals(), they must return the same hash code.",
        "The reverse is not required: two objects with the same hash code do not have to be equal."
      ],
      code: {
        language: "text",
        code: `If:

a.equals(b) == true

Then:

a.hashCode() == b.hashCode()

But:

a.hashCode() == b.hashCode()

does NOT guarantee:

a.equals(b) == true`
      }
    },

    {
      id: "bucket",
      title: "13. What is a Bucket?",
      paragraphs: [
        "Conceptually, a bucket is a storage location associated with a hash-based Map.",
        "HashMap uses a table of buckets internally.",
        "The hashing process determines which bucket is considered for a key."
      ],
      code: {
        language: "text",
        code: `HashMap table

Bucket 0 → ...
Bucket 1 → ...
Bucket 2 → ...
Bucket 3 → ...
Bucket 4 → ...
Bucket 5 → ...`
      }
    },

    {
      id: "hashmap-flow",
      title: "14. How HashMap Finds a Bucket",
      paragraphs: [
        "HashMap processes a key's hash code and uses the resulting hash information to determine a bucket position.",
        "The exact hash spreading and index calculation are implementation details of the Java version.",
        "Conceptually, the process is hash information followed by bucket selection."
      ],
      code: {
        language: "text",
        code: `Key
 ↓
hashCode()
 ↓
hash processing
 ↓
bucket index
 ↓
candidate entries`
      }
    },

    {
      id: "put-internal",
      title: "15. Internal Working of put()",
      paragraphs: [
        "When put() is called, HashMap calculates hash information for the key and identifies a candidate bucket.",
        "If no matching key exists in that bucket, the mapping can be inserted.",
        "If an equivalent key already exists, its value is replaced."
      ],
      code: {
        language: "text",
        code: `put(key, value)
      ↓
calculate hash
      ↓
find bucket
      ↓
is matching key present?
   ┌──┴───┐
  No     Yes
  ↓       ↓
insert   replace value`
      }
    },

    {
      id: "get-internal",
      title: "16. Internal Working of get()",
      paragraphs: [
        "When get(key) is called, HashMap calculates the hash information for the key and locates the candidate bucket.",
        "It then checks candidate entries using key equality to find the matching mapping."
      ],
      code: {
        language: "text",
        code: `get(key)
   ↓
hash
   ↓
bucket
   ↓
compare candidate key
   ↓
equals()
   ↓
return value`
      }
    },

    {
      id: "collision",
      title: "17. What is a Hash Collision?",
      paragraphs: [
        "A hash collision occurs when different keys produce the same bucket location.",
        "Different keys can have the same hash code, and even different hash codes can ultimately map to the same bucket.",
        "HashMap must therefore handle multiple entries associated with a bucket."
      ],
      code: {
        language: "text",
        code: `Key A ──┐
         ├──→ Bucket 5
Key B ──┘

Different keys
same bucket`
      }
    },

    {
      id: "collision-handling",
      title: "18. How HashMap Handles Collisions",
      paragraphs: [
        "HashMap can store multiple mappings associated with the same bucket.",
        "Historically and conceptually, collisions can be represented through linked structures.",
        "Modern Java implementations can transform heavily populated buckets into tree-based structures under specific conditions."
      ],
      code: {
        language: "text",
        code: `Bucket
  ↓
Entry → Entry → Entry

Heavy collision scenario
  ↓
Tree-based structure
  ↓
faster lookup than a long linear chain`
      }
    },

    {
      id: "treeification",
      title: "19. Treeification",
      paragraphs: [
        "Modern Java HashMap implementations can treeify a heavily populated bucket under specific conditions.",
        "The tree structure used by HashMap is based on tree nodes associated with a Red-Black Tree.",
        "Treeification is an implementation optimization for collision-heavy buckets.",
        "The exact thresholds and capacity conditions are implementation details and should not be treated as universal API guarantees."
      ],
      code: {
        language: "text",
        code: `Heavy collision bucket
        ↓
meets implementation conditions
        ↓
tree-based bucket structure
        ↓
better worst-case behavior`
      }
    },

    {
      id: "load-factor",
      title: "20. Load Factor",
      paragraphs: [
        "Load factor is a threshold-related concept used by HashMap to determine when the table should be resized.",
        "The commonly used default load factor is 0.75.",
        "Conceptually, when the number of stored mappings crosses the resize threshold derived from capacity and load factor, the table grows."
      ],
      code: {
        language: "text",
        code: `Resize threshold

≈ capacity × load factor

Example:

capacity = 16
load factor = 0.75

threshold ≈ 12`
      },
      bullets: [
        "Higher load factor can reduce memory usage but may increase collision pressure.",
        "Lower load factor can reduce collision pressure but may use more memory.",
        "The default load factor is commonly 0.75."
      ]
    },

    {
      id: "capacity",
      title: "21. Initial Capacity",
      paragraphs: [
        "Initial capacity represents the initial size-related configuration of the internal hash table.",
        "Choosing a suitable initial capacity can reduce unnecessary resizing when the approximate number of entries is known.",
        "The constructor's capacity is not necessarily the same thing as an immediately allocated internal table in every implementation/version."
      ],
      code: {
        language: "java",
        code: `HashMap<Integer, String> map =
        new HashMap<>(100);

map.put(1, "Java");
map.put(2, "Spring");`
      },
      bullets: [
        "Initial capacity is a performance tuning option.",
        "Do not confuse initial capacity with the number of mappings currently stored."
      ]
    },

    {
      id: "resizing",
      title: "22. HashMap Resizing",
      paragraphs: [
        "When the number of mappings crosses the resize threshold, HashMap expands its internal table.",
        "During resizing, entries are redistributed according to the new table structure.",
        "Resizing can be expensive, which is one reason appropriate initial capacity can matter for large maps."
      ],
      code: {
        language: "text",
        code: `Entries grow
    ↓
threshold reached
    ↓
table resized
    ↓
entries redistributed
    ↓
HashMap continues`
      }
    },

    {
      id: "complexity",
      title: "23. HashMap Time Complexity",
      paragraphs: [
        "Under normal hashing conditions, basic HashMap operations are typically O(1) on average.",
        "Poor hashing or collision-heavy situations can increase lookup cost.",
        "Modern implementations use tree-based collision handling under specific conditions to improve worst-case behavior."
      ],
      code: {
        language: "text",
        code: `Operation       Average

put()           O(1)
get()           O(1)
remove()        O(1)
containsKey()   O(1)
containsValue() O(n)

Note:
Actual performance depends on hashing,
collisions, implementation, and data distribution.`
      }
    },

    {
      id: "custom-key",
      title: "24. HashMap with Custom Objects as Keys",
      paragraphs: [
        "Custom objects can be used as HashMap keys.",
        "For hash-based lookup to work correctly, the key's equals() and hashCode() implementations must follow their contract.",
        "The fields used for equality should normally be stable while the object is being used as a key."
      ],
      code: {
        language: "java",
        code: `class Employee {
    private final int id;
    private final String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Employee)) return false;

        Employee other = (Employee) obj;

        return id == other.id
            && Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`
      }
    },

    {
      id: "mutable-key",
      title: "25. Mutable Keys Problem",
      paragraphs: [
        "Using a mutable object as a HashMap key can cause difficult bugs.",
        "If a field used by equals() or hashCode() changes after insertion, the key may no longer be found using its new state.",
        "The mapping can remain inside the Map while normal lookup fails."
      ],
      code: {
        language: "text",
        code: `Map<Employee, String> map =
    new HashMap<>();

Employee employee = ...;

map.put(employee, "Developer");

employee's equality/hashCode field changes
        ↓
lookup behavior can become incorrect`
      },
      bullets: [
        "Prefer immutable keys.",
        "Do not mutate fields involved in equals() and hashCode() while the key is stored in HashMap.",
        "String and wrapper classes are commonly safe key choices because they are immutable."
      ]
    },

    {
      id: "hashmap-order",
      title: "26. HashMap Ordering",
      paragraphs: [
        "HashMap does not guarantee a particular iteration order.",
        "The order may appear stable in a particular run or implementation, but application code should not depend on it.",
        "If insertion order is required, use LinkedHashMap."
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
      id: "hashmap-iteration",
      title: "27. Iterating HashMap",
      paragraphs: [
        "HashMap can be iterated using keySet(), values(), or entrySet().",
        "When both keys and values are required, entrySet() is usually the most direct approach."
      ],
      code: {
        language: "java",
        code: `Map<Integer, String> map =
        new HashMap<>();

map.put(101, "Rahul");
map.put(102, "Priya");

for (Map.Entry<Integer, String> entry
        : map.entrySet()) {

    System.out.println(
        entry.getKey() + " -> " +
        entry.getValue()
    );
}`
      },
      output: `101 -> Rahul
102 -> Priya`
    },

    {
      id: "common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "HashMap is easy to use but its internal behavior creates several common interview and production mistakes."
      ],
      bullets: [
        "Do not rely on HashMap iteration order.",
        "Do not assume hashCode() values are unique.",
        "Do not assume the same hash code means objects are equal.",
        "Remember that equal objects must have the same hash code.",
        "Do not mutate equality/hashCode fields of a key after insertion.",
        "Do not confuse capacity with current size.",
        "Do not assume resizing never happens.",
        "Do not claim that every Java version uses exactly the same internal thresholds.",
        "Do not assume HashMap is thread-safe.",
        "Do not use HashMap when sorted or insertion-order behavior is required."
      ]
    },

    {
      id: "best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "HashMap is the standard general-purpose choice for many key-value storage problems."
      ],
      bullets: [
        "Declare variables using the Map interface when implementation details are not required.",
        "Use immutable objects as keys whenever possible.",
        "Implement equals() and hashCode() correctly for custom keys.",
        "Choose an appropriate initial capacity for very large maps when the expected size is known.",
        "Use getOrDefault() when a fallback value is appropriate.",
        "Use containsKey() when you need to distinguish a missing key from a key mapped to null.",
        "Use entrySet() when both key and value are required during iteration.",
        "Use LinkedHashMap when insertion order matters.",
        "Use TreeMap when sorted key order matters.",
        "Use a concurrent Map implementation when multiple threads require concurrent updates."
      ]
    },

    {
      id: "key-points-interview",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "HashMap is one of the most frequently asked Java Collections interview topics.",
        "The most important concepts are hashing, buckets, hashCode(), equals(), collisions, load factor, resizing, treeification, and immutable keys."
      ],
      bullets: [
        "HashMap implements Map.",
        "HashMap stores key-value pairs.",
        "Keys are unique.",
        "Values can be duplicated.",
        "HashMap allows one null key and multiple null values.",
        "HashMap does not guarantee iteration order.",
        "Hashing helps locate candidate buckets.",
        "equals() determines logical key equality.",
        "Equal objects must have the same hash code.",
        "Hash collisions can occur.",
        "Modern implementations can treeify heavily populated buckets under specific conditions.",
        "Default load factor is commonly 0.75.",
        "Resizing occurs when the resize threshold is reached.",
        "Basic operations are typically O(1) on average under normal hashing conditions.",
        "Immutable keys are generally safer."
      ],
      interviewQuestions: [
        {
          question: "What is HashMap in Java?",
          answer:
            "HashMap is a hash-based implementation of the Map interface that stores key-value pairs and provides typically constant-time average lookup, insertion, and removal under normal hashing conditions."
        },
        {
          question: "How does HashMap work internally?",
          answer:
            "HashMap processes the key's hash information to determine a candidate bucket. It then searches entries in that bucket using key equality and returns, inserts, or updates the appropriate mapping."
        },
        {
          question: "What is the role of hashCode() in HashMap?",
          answer:
            "hashCode() provides hash information that HashMap uses to help determine the candidate bucket for a key."
        },
        {
          question: "What is the role of equals() in HashMap?",
          answer:
            "equals() is used to determine whether a candidate key is logically equal to the key being searched or inserted."
        },
        {
          question: "What is the equals() and hashCode() contract?",
          answer:
            "If two objects are equal according to equals(), they must return the same hash code. The reverse is not required."
        },
        {
          question: "What is a hash collision?",
          answer:
            "A hash collision occurs when different keys end up associated with the same bucket location."
        },
        {
          question: "How does HashMap handle collisions?",
          answer:
            "HashMap can store multiple entries in a bucket. In modern Java implementations, heavily populated buckets can be transformed into tree-based structures under specific conditions."
        },
        {
          question: "What is treeification in HashMap?",
          answer:
            "Treeification is the transformation of a heavily populated collision bucket into a tree-based structure in implementations that support it, under specific capacity and threshold conditions."
        },
        {
          question: "What is the default load factor of HashMap?",
          answer:
            "The commonly used default load factor is 0.75."
        },
        {
          question: "What is the purpose of load factor?",
          answer:
            "Load factor helps determine when the hash table should be resized as the number of mappings grows."
        },
        {
          question: "What happens when HashMap is resized?",
          answer:
            "The internal table grows and existing mappings are redistributed according to the new table structure."
        },
        {
          question: "Can HashMap have duplicate keys?",
          answer:
            "No. A key identifies a mapping. Inserting an existing key replaces its previous value."
        },
        {
          question: "Can HashMap have duplicate values?",
          answer:
            "Yes. Multiple keys can map to the same value."
        },
        {
          question: "Can HashMap contain null?",
          answer:
            "Yes. HashMap permits one null key and multiple null values."
        },
        {
          question: "Is HashMap synchronized?",
          answer:
            "No. HashMap is not synchronized by default. For concurrent access, use an appropriate concurrent Map implementation or synchronization strategy."
        },
        {
          question: "Why should HashMap keys preferably be immutable?",
          answer:
            "If fields involved in equals() or hashCode() change after insertion, the key may no longer be found correctly because its hash-based location can no longer match its current state."
        },
        {
          question: "What is the average time complexity of HashMap get()?",
          answer:
            "Under normal hashing conditions, get() is typically O(1) on average."
        },
        {
          question: "What is the time complexity of containsValue()?",
          answer:
            "containsValue() is typically O(n) because values are not used as hash keys for direct bucket lookup."
        },
        {
          question: "Does HashMap maintain insertion order?",
          answer:
            "No. HashMap does not guarantee insertion order. Use LinkedHashMap when insertion order is required."
        },
        {
          question: "HashMap vs TreeMap?",
          answer:
            "HashMap provides hash-based storage without guaranteed iteration order, while TreeMap maintains keys according to their ordering and provides logarithmic basic operations."
        }
      ]
    }
  ]
};