export const hashSet = {
  id: "hashset",
  slug: "hashset",
  title: "HashSet in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn HashSet in Java from Set fundamentals to hashing, hashCode(), equals(), buckets, collisions, internal working, custom objects, mutable objects, performance, comparisons, best practices, common mistakes, and interview questions.",
  estimatedTime: "70 min",

  sections: [
    // =========================================================
    // 1. WHAT IS HASHSET?
    // =========================================================
    {
      id: "what-is-hashset",
      title: "1. What is HashSet?",
      paragraphs: [
        "HashSet is a class in Java that implements the Set interface.",
        "A Set is a collection that does not allow duplicate elements.",
        "HashSet uses hashing internally to store and locate elements efficiently.",
        "HashSet does not guarantee any particular iteration order."
      ],

      bullets: [
        "HashSet implements Set.",
        "HashSet does not allow duplicate elements.",
        "HashSet allows one null element.",
        "HashSet does not guarantee insertion order.",
        "HashSet uses hashing internally.",
        "HashSet is not synchronized by default.",
        "HashSet provides average O(1) time for add(), remove(), and contains()."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {

        Set<String> languages = new HashSet<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Java");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Python]`
    },

    // =========================================================
    // 2. HASHSET HIERARCHY
    // =========================================================
    {
      id: "hashset-hierarchy",
      title: "2. HashSet Hierarchy",
      paragraphs: [
        "HashSet is part of the Set hierarchy in the Java Collections Framework.",
        "It extends AbstractSet and implements Set, Cloneable, and Serializable."
      ],

      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
   Set
   |
AbstractSet
   |
HashSet`
      },

      bullets: [
        "HashSet extends AbstractSet.",
        "HashSet implements Set.",
        "HashSet implements Cloneable.",
        "HashSet implements Serializable."
      ]
    },

    // =========================================================
    // 3. CREATING HASHSET
    // =========================================================
    {
      id: "creating-hashset",
      title: "3. Creating a HashSet",
      paragraphs: [
        "HashSet can be created using its default constructor or by specifying an initial capacity and load factor.",
        "Using the Set interface as the reference type is generally preferred."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

Set<String> names = new HashSet<>();

Set<Integer> numbers =
        new HashSet<>(20);

Set<String> languages =
        new HashSet<>(20, 0.75f);`
      },

      bullets: [
        "`new HashSet<>()` uses default configuration.",
        "Initial capacity can be provided when the expected number of elements is known.",
        "Load factor controls when the backing hash table should grow.",
        "The Set interface is usually preferred for declarations."
      ]
    },

    // =========================================================
    // 4. ADDING ELEMENTS
    // =========================================================
    {
      id: "hashset-add",
      title: "4. Adding Elements",
      paragraphs: [
        "The add() method inserts an element into the HashSet.",
        "The method returns true when the Set changes and false when the element was already present."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

System.out.println(languages.add("Java"));
System.out.println(languages.add("Python"));
System.out.println(languages.add("Java"));

System.out.println(languages);`
      },

      output: `true
true
false
[Java, Python]`
    },

    // =========================================================
    // 5. DUPLICATE ELEMENTS
    // =========================================================
    {
      id: "hashset-duplicates",
      title: "5. Duplicate Elements",
      paragraphs: [
        "The defining characteristic of a Set is that it does not contain duplicate elements.",
        "When HashSet receives an element that is considered equal to an existing element, the new element is not added."
      ],

      code: {
        language: "java",
        code: `Set<Integer> numbers = new HashSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(numbers);`
      },

      output: `[10, 20, 30]`,

      bullets: [
        "Duplicate values are not stored.",
        "add() returns false when an equivalent element already exists.",
        "The exact iteration order of HashSet should not be relied upon."
      ]
    },

    // =========================================================
    // 6. NULL ELEMENT
    // =========================================================
    {
      id: "hashset-null",
      title: "6. null Elements",
      paragraphs: [
        "HashSet permits one null element.",
        "Adding null multiple times does not create multiple null entries."
      ],

      code: {
        language: "java",
        code: `Set<String> names = new HashSet<>();

names.add("Java");
names.add(null);
names.add(null);

System.out.println(names);
System.out.println(names.size());`
      },

      output: `[null, Java]
2`,

      bullets: [
        "HashSet allows one null.",
        "A second null is treated as a duplicate.",
        "Do not rely on the printed order."
      ]
    },

    // =========================================================
    // 7. CONTAINS
    // =========================================================
    {
      id: "hashset-contains",
      title: "7. contains()",
      paragraphs: [
        "The contains() method checks whether an equivalent element exists in the HashSet.",
        "Hashing allows HashSet to perform this lookup efficiently on average."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");

System.out.println(
    languages.contains("Java")
);

System.out.println(
    languages.contains("C++")
);`
      },

      output: `true
false`
    },

    // =========================================================
    // 8. REMOVE
    // =========================================================
    {
      id: "hashset-remove",
      title: "8. remove()",
      paragraphs: [
        "The remove() method removes an element from the HashSet if an equivalent element exists.",
        "It returns true when an element was actually removed."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("Spring");

System.out.println(
    languages.remove("Python")
);

System.out.println(
    languages.remove("C++")
);

System.out.println(languages);`
      },

      output: `true
false
[Java, Spring]`
    },

    // =========================================================
    // 9. SIZE
    // =========================================================
    {
      id: "hashset-size",
      title: "9. size()",
      paragraphs: [
        "The size() method returns the number of unique elements currently stored in the HashSet."
      ],

      code: {
        language: "java",
        code: `Set<Integer> numbers = new HashSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(10);

System.out.println(numbers.size());`
      },

      output: `2`
    },

    // =========================================================
    // 10. ISEMPTY
    // =========================================================
    {
      id: "hashset-is-empty",
      title: "10. isEmpty()",
      paragraphs: [
        "The isEmpty() method checks whether the HashSet contains zero elements."
      ],

      code: {
        language: "java",
        code: `Set<String> names = new HashSet<>();

System.out.println(names.isEmpty());

names.add("Java");

System.out.println(names.isEmpty());`
      },

      output: `true
false`
    },

    // =========================================================
    // 11. CLEAR
    // =========================================================
    {
      id: "hashset-clear",
      title: "11. clear()",
      paragraphs: [
        "The clear() method removes all elements from the HashSet."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("React");

System.out.println(languages);

languages.clear();

System.out.println(languages);
System.out.println(languages.isEmpty());`
      },

      output: `[Java, Python, React]
[]
true`
    },

    // =========================================================
    // 12. ITERATING HASHSET
    // =========================================================
    {
      id: "hashset-iteration",
      title: "12. Iterating a HashSet",
      paragraphs: [
        "HashSet can be traversed using an enhanced for loop, Iterator, or forEach().",
        "However, HashSet does not guarantee the order in which elements are returned."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("SQL");

for (String language : languages) {
    System.out.println(language);
}`
      },

      output: `Java
SQL
Python`,

      bullets: [
        "The output order is not guaranteed.",
        "Do not write application logic that depends on HashSet iteration order.",
        "Use LinkedHashSet when insertion order is required."
      ]
    },

    // =========================================================
    // 13. ITERATOR
    // =========================================================
    {
      id: "hashset-iterator",
      title: "13. Iterator",
      paragraphs: [
        "Iterator provides a standard way to traverse a HashSet.",
        "Iterator also allows the current element to be removed safely using iterator.remove()."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("React");

Iterator<String> iterator =
        languages.iterator();

while (iterator.hasNext()) {

    String language = iterator.next();

    if (language.equals("Python")) {
        iterator.remove();
    }
}

System.out.println(languages);`
      },

      output: `[Java, React]`
    },

    // =========================================================
    // 14. FOREACH
    // =========================================================
    {
      id: "hashset-foreach",
      title: "14. forEach()",
      paragraphs: [
        "HashSet supports the forEach() method inherited from the Collection interface."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("SQL");

languages.forEach(language ->
    System.out.println(language)
);`
      },

      output: `Java
SQL
Python`,

      bullets: [
        "The iteration order shown is only an example.",
        "HashSet does not promise that order."
      ]
    },

    // =========================================================
    // 15. HASHING CONCEPT
    // =========================================================
    {
      id: "hashing-concept",
      title: "15. Hashing Concept",
      paragraphs: [
        "Hashing is the fundamental concept behind HashSet.",
        "A hash function converts an object's state into an integer hash code.",
        "HashSet uses this information to determine where an element should be considered within its internal hash table."
      ],

      code: {
        language: "text",
        code: `Object
   |
   | hashCode()
   v
Hash Code
   |
   v
Hash Table
   |
   v
Bucket`
      },

      bullets: [
        "hashCode() returns an int.",
        "HashSet uses hashing to locate elements efficiently.",
        "The hash code helps identify a candidate bucket.",
        "equals() is then used to determine logical equality when needed."
      ]
    },

    // =========================================================
    // 16. HASHCODE
    // =========================================================
    {
      id: "hashset-hashcode",
      title: "16. hashCode()",
      paragraphs: [
        "hashCode() is defined in the Object class and can be overridden by custom classes.",
        "Hash-based collections use hashCode() as part of their lookup and storage process."
      ],

      code: {
        language: "java",
        code: `String a = "Java";
String b = "Java";

System.out.println(a.hashCode());
System.out.println(b.hashCode());

System.out.println(
    a.equals(b)
);`
      },

      output: `2301506
2301506
true`,

      bullets: [
        "Equal objects must return the same hash code.",
        "Different objects may have the same hash code.",
        "A hash collision does not necessarily mean two objects are equal."
      ]
    },

    // =========================================================
    // 17. EQUALS + HASHCODE
    // =========================================================
    {
      id: "hashset-equals-hashcode",
      title: "17. equals() + hashCode() Contract",
      paragraphs: [
        "The equals() and hashCode() contract is one of the most important concepts when using HashSet with custom objects.",
        "If two objects are equal according to equals(), they must return the same hash code.",
        "However, two objects can have the same hash code while not being equal."
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

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Employee)) {
            return false;
        }

        Employee other =
                (Employee) obj;

        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}`
      },

      bullets: [
        "equals() determines logical equality.",
        "hashCode() helps locate the candidate bucket.",
        "Equal objects must have equal hash codes.",
        "Same hash code does not guarantee equality.",
        "When overriding equals(), override hashCode() consistently."
      ]
    },

    // =========================================================
    // 18. BUCKET CONCEPT
    // =========================================================
    {
      id: "hashset-buckets",
      title: "18. Internal Bucket Concept",
      paragraphs: [
        "Conceptually, a HashSet uses a hash table containing buckets.",
        "The hash code is processed to determine a bucket location.",
        "Multiple elements can belong to the same bucket because different objects can produce the same bucket location."
      ],

      code: {
        language: "text",
        code: `HashSet

Bucket 0 → [A]

Bucket 1 → empty

Bucket 2 → [B → C]

Bucket 3 → [D]

Bucket 4 → empty`
      },

      bullets: [
        "A bucket is a conceptual location in the hash table.",
        "Multiple elements may map to the same bucket.",
        "Collisions must be handled correctly.",
        "HashSet does not expose buckets directly through its public API."
      ]
    },

    // =========================================================
    // 19. HASH COLLISIONS
    // =========================================================
    {
      id: "hashset-collisions",
      title: "19. Hash Collisions",
      paragraphs: [
        "A hash collision occurs when different objects produce the same hash value or are mapped to the same bucket.",
        "Collisions are normal in hash-based data structures and do not mean the collection is broken."
      ],

      code: {
        language: "text",
        code: `Object A
   |
hashCode()
   |
   v
Bucket 2

Object B
   |
hashCode()
   |
   v
Bucket 2

        ↓

Collision`
      },

      bullets: [
        "Different objects can have the same hash code.",
        "Different hash codes can also map to the same bucket.",
        "The collection must distinguish equal and unequal objects correctly.",
        "Good hash distribution generally improves performance."
      ]
    },

    // =========================================================
    // 20. COLLISION HANDLING
    // =========================================================
    {
      id: "hashset-collision-handling",
      title: "20. Collision Handling",
      paragraphs: [
        "Hash-based collections must handle situations where multiple entries map to the same bucket.",
        "Modern Java HashMap implementations can represent heavily populated collision buckets using tree-based structures under certain conditions, while smaller collision groups can be represented using linked nodes.",
        "HashSet is backed by a HashMap, so these HashMap implementation mechanisms are relevant to its internal storage."
      ],

      code: {
        language: "text",
        code: `Bucket

Normal collision:
[A] -> [B] -> [C]

Heavy collision:
[A] -> [B] -> [C]
              |
              v
        Tree-based structure
        under applicable conditions`
      },

      bullets: [
        "Hash collisions are expected.",
        "HashMap handles collisions internally.",
        "HashSet delegates storage to a backing HashMap.",
        "Exact thresholds and implementation details are JDK implementation details.",
        "Do not hard-code assumptions about internal bucket thresholds in application code."
      ]
    },

    // =========================================================
    // 21. INTERNAL WORKING
    // =========================================================
    {
      id: "hashset-internal-working",
      title: "21. Internal Working of HashSet",
      paragraphs: [
        "HashSet is backed by a HashMap internally.",
        "When an element is added to a HashSet, the HashSet uses the element as a key in its backing HashMap and associates it with an internal dummy value.",
        "Conceptually, the process involves calculating hash information, locating a bucket, and comparing keys when necessary."
      ],

      code: {
        language: "text",
        code: `hashSet.add(employee)
        |
        v
Calculate hash information
        |
        v
Find candidate bucket
        |
        v
Compare existing entries
        |
        +---- equal ----> Do not add
        |
        +---- not equal -> Store element
        |
        v
HashMap backing structure`
      },

      bullets: [
        "HashSet internally uses a HashMap.",
        "HashSet elements become keys in the backing HashMap.",
        "HashMap uses an internal dummy value for those keys.",
        "hashCode() participates in locating the candidate bucket.",
        "equals() participates in determining whether an equivalent key already exists."
      ]
    },

    // =========================================================
    // 22. CUSTOM OBJECTS
    // =========================================================
    {
      id: "hashset-custom-objects",
      title: "22. HashSet with Custom Objects",
      paragraphs: [
        "HashSet becomes especially important when storing custom objects.",
        "If logical uniqueness is based on specific fields, the class should implement equals() and hashCode() consistently."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

class Employee {

    private int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Employee)) {
            return false;
        }

        Employee other =
                (Employee) obj;

        return id == other.id &&
               Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}

public class Main {

    public static void main(String[] args) {

        Set<Employee> employees =
                new HashSet<>();

        employees.add(
            new Employee(1, "Alice")
        );

        employees.add(
            new Employee(1, "Alice")
        );

        System.out.println(employees.size());
    }
}`
      },

      output: `1`
    },

    // =========================================================
    // 23. MUTABLE OBJECTS
    // =========================================================
    {
      id: "hashset-mutable-objects",
      title: "23. Mutable Objects Warning",
      paragraphs: [
        "A dangerous situation occurs when an object stored in a HashSet is modified after insertion and the fields used by equals() and hashCode() change.",
        "The object may then effectively become difficult to find or remove because its hash-based location no longer corresponds to its current state."
      ],

      code: {
        language: "java",
        code: `class Employee {

    int id;

    Employee(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (!(obj instanceof Employee)) {
            return false;
        }

        Employee other =
                (Employee) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

// Conceptual problem:
//
// 1. Add employee with id = 10
// 2. Change id to 20
// 3. Hash-based lookup may no longer
//    behave as expected.`
      },

      bullets: [
        "Avoid changing fields that participate in equals() and hashCode() while the object is in a HashSet.",
        "Immutable objects are often safer as HashSet elements.",
        "If such an object must change, remove it first, modify it, and add it again."
      ]
    },

    // =========================================================
    // 24. TIME COMPLEXITY
    // =========================================================
    {
      id: "hashset-complexity",
      title: "24. Time Complexity",
      paragraphs: [
        "HashSet provides average constant-time performance for common operations when the hash distribution is good.",
        "Actual performance can degrade because of collisions or other factors."
      ],

      code: {
        language: "text",
        code: `Operation       Average        Worst/Degraded Case

add()            O(1)           depends on collisions

remove()         O(1)           depends on collisions

contains()       O(1)           depends on collisions

size()           O(1)

isEmpty()        O(1)

clear()          O(n)

iteration        O(n) generally`
      },

      bullets: [
        "add() is O(1) average.",
        "remove() is O(1) average.",
        "contains() is O(1) average.",
        "size() is O(1).",
        "isEmpty() is O(1).",
        "Iteration is generally O(n).",
        "Performance depends on hashing quality and implementation details."
      ]
    },

    // =========================================================
    // 25. HASHSET VS ARRAYLIST
    // =========================================================
    {
      id: "hashset-vs-arraylist",
      title: "25. HashSet vs ArrayList",
      paragraphs: [
        "HashSet and ArrayList solve different problems.",
        "ArrayList is designed for ordered, index-based storage and permits duplicates. HashSet is designed for uniqueness and efficient membership checks."
      ],

      code: {
        language: "text",
        code: `ArrayList
    |
    +-- Allows duplicates
    +-- Maintains insertion order
    +-- Index based
    +-- get(index)
    |
    v

HashSet
    |
    +-- No duplicates
    +-- No guaranteed order
    +-- No index based access
    +-- Hash-based lookup`
      },

      bullets: [
        "Use ArrayList when order and index access matter.",
        "Use HashSet when uniqueness matters.",
        "ArrayList supports get(index).",
        "HashSet does not provide index-based access.",
        "ArrayList allows duplicates.",
        "HashSet does not allow duplicates."
      ]
    },

    // =========================================================
    // 26. HASHSET VS LINKEDHASHSET
    // =========================================================
    {
      id: "hashset-vs-linkedhashset",
      title: "26. HashSet vs LinkedHashSet",
      paragraphs: [
        "Both HashSet and LinkedHashSet prevent duplicates and use hashing.",
        "The major behavioral difference is ordering."
      ],

      code: {
        language: "java",
        code: `Set<String> hashSet =
        new HashSet<>();

Set<String> linkedHashSet =
        new LinkedHashSet<>();

hashSet.add("B");
hashSet.add("A");
hashSet.add("C");

linkedHashSet.add("B");
linkedHashSet.add("A");
linkedHashSet.add("C");`
      },

      bullets: [
        "HashSet does not guarantee iteration order.",
        "LinkedHashSet maintains insertion order.",
        "Both prevent duplicates.",
        "LinkedHashSet generally requires additional linked-order bookkeeping.",
        "Choose LinkedHashSet when predictable insertion order is required."
      ]
    },

    // =========================================================
    // 27. HASHSET VS TREESET
    // =========================================================
    {
      id: "hashset-vs-treeset",
      title: "27. HashSet vs TreeSet",
      paragraphs: [
        "HashSet and TreeSet both implement Set, but they use different mechanisms and provide different ordering behavior.",
        "HashSet is hash-based, while TreeSet is a sorted navigable set."
      ],

      code: {
        language: "text",
        code: `HashSet
   |
   +-- Hashing
   +-- No guaranteed order
   +-- Average O(1) basic lookup

TreeSet
   |
   +-- Tree-based ordering
   +-- Sorted order
   +-- O(log n) basic operations`
      },

      bullets: [
        "HashSet focuses on efficient membership operations.",
        "TreeSet maintains sorted order.",
        "TreeSet requires elements to be comparable or a compatible Comparator.",
        "HashSet generally provides average O(1) add/remove/contains.",
        "TreeSet generally provides O(log n) add/remove/contains."
      ]
    },

    // =========================================================
    // 28. COMMON MISTAKES
    // =========================================================
    {
      id: "hashset-common-mistakes",
      title: "28. Common Mistakes",
      paragraphs: [
        "HashSet is simple at the API level but has several important rules that developers often overlook."
      ],

      bullets: [
        "Assuming HashSet maintains insertion order.",
        "Trying to access elements using an index.",
        "Overriding equals() without overriding hashCode().",
        "Assuming equal hash codes mean objects are equal.",
        "Changing hashCode-related fields after insertion.",
        "Assuming HashSet is synchronized.",
        "Relying on a specific iteration order observed during testing.",
        "Using HashSet when sorted order is required.",
        "Using HashSet when insertion order must be preserved.",
        "Creating a poor hashCode() implementation for custom objects.",
        "Forgetting that HashSet allows only one null."
      ],

      code: {
        language: "java",
        code: `// Wrong idea:
//
// equals() overridden,
// hashCode() not overridden.
//
// This can break the expected
// behavior of hash-based collections.

// Correct approach:
//
// Override both consistently.`
      }
    },

    // =========================================================
    // 29. BEST PRACTICES
    // =========================================================
    {
      id: "hashset-best-practices",
      title: "29. Best Practices",
      paragraphs: [
        "Use HashSet when the primary requirement is uniqueness and efficient membership testing."
      ],

      bullets: [
        "Declare using the Set interface when possible.",
        "Use generics.",
        "Override equals() and hashCode() consistently for custom objects.",
        "Prefer immutable objects as Set elements when practical.",
        "Do not depend on HashSet iteration order.",
        "Use LinkedHashSet when insertion order is required.",
        "Use TreeSet when sorted order is required.",
        "Choose a concurrent Set implementation when multiple threads require concurrent access.",
        "Provide a good hashCode() implementation for custom classes.",
        "Choose an appropriate initial capacity when the expected collection size is known.",
        "Avoid modifying equality-related state while an object is stored in the Set."
      ],

      code: {
        language: "java",
        code: `Set<String> uniqueSkills =
        new HashSet<>();

uniqueSkills.add("Java");
uniqueSkills.add("Spring Boot");
uniqueSkills.add("MySQL");

if (uniqueSkills.contains("Java")) {
    System.out.println(
        "Java is present"
    );
}`
      },

      output: `Java is present`
    },

    // =========================================================
    // 30. KEY POINTS + INTERVIEW QUESTIONS
    // =========================================================
    {
      id: "hashset-interview",
      title: "30. Key Points + Interview Questions",
      paragraphs: [
        "HashSet is one of the most important Java Collections Framework classes for interviews because it combines Set behavior with hashing.",
        "The most important topics are uniqueness, hashCode(), equals(), buckets, collisions, internal HashMap usage, complexity, and custom objects."
      ],

      bullets: [
        "HashSet implements Set.",
        "HashSet extends AbstractSet.",
        "HashSet does not allow duplicate elements.",
        "HashSet allows one null element.",
        "HashSet does not guarantee iteration order.",
        "HashSet is not synchronized by default.",
        "HashSet uses a backing HashMap.",
        "Elements are stored as keys in the backing HashMap.",
        "hashCode() helps locate a candidate bucket.",
        "equals() helps determine logical equality.",
        "Equal objects must have equal hash codes.",
        "Same hash code does not mean objects are equal.",
        "Avoid modifying equality-related fields after insertion.",
        "add(), remove(), and contains() are O(1) on average.",
        "Use LinkedHashSet when insertion order is required.",
        "Use TreeSet when sorted order is required."
      ],

      interviewQuestions: [
        {
          question: "What is HashSet in Java?",
          answer:
            "HashSet is a Set implementation that uses hashing internally to store unique elements. It does not guarantee iteration order and provides average O(1) performance for add(), remove(), and contains()."
        },
        {
          question: "Does HashSet allow duplicate elements?",
          answer:
            "No. HashSet does not allow duplicate elements. If an equivalent element already exists, add() returns false and the Set remains unchanged."
        },
        {
          question: "Does HashSet allow null?",
          answer:
            "Yes. HashSet allows one null element."
        },
        {
          question: "Does HashSet maintain insertion order?",
          answer:
            "No. HashSet does not guarantee insertion order. If insertion order is required, LinkedHashSet should be considered."
        },
        {
          question: "How does HashSet prevent duplicates?",
          answer:
            "HashSet uses hashing and equality checks. It uses the element's hash information to locate a candidate area and uses equals() when necessary to determine whether an equivalent element already exists."
        },
        {
          question: "How does HashSet work internally?",
          answer:
            "HashSet is backed by a HashMap. HashSet elements are stored as keys in the backing HashMap with an internal dummy value."
        },
        {
          question: "Why are both equals() and hashCode() important in HashSet?",
          answer:
            "hashCode() helps locate a candidate bucket, while equals() determines logical equality among candidates. If two objects are equal, they must return the same hash code."
        },
        {
          question: "What happens if equals() is overridden but hashCode() is not?",
          answer:
            "The class can violate the hashCode contract, causing incorrect behavior in hash-based collections such as HashSet and HashMap."
        },
        {
          question: "Can two different objects have the same hashCode()?",
          answer:
            "Yes. Different objects can have the same hash code. This is called a hash collision."
        },
        {
          question: "If two objects have the same hashCode(), are they equal?",
          answer:
            "No. The same hash code does not imply that two objects are equal."
        },
        {
          question: "If two objects are equal, must their hashCode() values be equal?",
          answer:
            "Yes. This is a required part of the equals() and hashCode() contract."
        },
        {
          question: "What is a hash collision?",
          answer:
            "A hash collision occurs when different objects produce the same hash value or map to the same bucket."
        },
        {
          question: "How does Java handle hash collisions?",
          answer:
            "The backing HashMap handles collisions internally. Depending on the implementation and collision conditions, entries can be represented using linked nodes or tree-based structures."
        },
        {
          question: "What is a bucket?",
          answer:
            "A bucket is a conceptual position in a hash table where entries whose hash information maps to that location are stored."
        },
        {
          question: "What is the average time complexity of HashSet.add()?",
          answer:
            "HashSet.add() is O(1) on average, assuming good hash distribution and normal conditions."
        },
        {
          question: "What is the average time complexity of HashSet.contains()?",
          answer:
            "HashSet.contains() is O(1) on average."
        },
        {
          question: "What is the average time complexity of HashSet.remove()?",
          answer:
            "HashSet.remove() is O(1) on average."
        },
        {
          question: "Is HashSet synchronized?",
          answer:
            "No. HashSet is not synchronized by default."
        },
        {
          question: "Can HashSet be used safely by multiple threads?",
          answer:
            "A regular HashSet should not be assumed to provide safe concurrent mutation. If multiple threads need concurrent access, choose an appropriate concurrency strategy or concurrent Set implementation."
        },
        {
          question: "What is the difference between HashSet and ArrayList?",
          answer:
            "ArrayList allows duplicates, maintains insertion order, and supports index-based access. HashSet prevents duplicates, does not guarantee order, and is optimized for membership operations."
        },
        {
          question: "What is the difference between HashSet and LinkedHashSet?",
          answer:
            "Both prevent duplicates and use hashing, but LinkedHashSet maintains insertion order while HashSet does not guarantee iteration order."
        },
        {
          question: "What is the difference between HashSet and TreeSet?",
          answer:
            "HashSet is hash-based and provides average O(1) basic operations without guaranteed ordering. TreeSet maintains sorted order and generally provides O(log n) basic operations."
        },
        {
          question: "Why should equals() and hashCode() use consistent fields?",
          answer:
            "Because HashSet relies on those methods to determine logical identity. Changing the fields involved after insertion can make the element difficult to locate or remove."
        },
        {
          question: "What happens if an object is modified after adding it to HashSet?",
          answer:
            "If fields used by equals() or hashCode() are changed, the object's effective hash location may no longer match its current state, causing lookup or removal operations to behave unexpectedly."
        },
        {
          question: "Why should immutable objects be preferred as HashSet elements?",
          answer:
            "Their equality and hash-code state does not change after insertion, which makes their behavior more predictable in hash-based collections."
        },
        {
          question: "What does HashSet.add() return?",
          answer:
            "It returns true if the Set changed because the element was added, and false if an equivalent element was already present."
        },
        {
          question: "Can HashSet store custom objects?",
          answer:
            "Yes. Custom objects can be stored in HashSet. If logical uniqueness depends on object fields, equals() and hashCode() should be implemented consistently."
        },
        {
          question: "Why doesn't HashSet have get(index)?",
          answer:
            "Set is not an index-based collection. Its primary purpose is uniqueness rather than positional access."
        },
        {
          question: "What should I use if I need unique elements in insertion order?",
          answer:
            "LinkedHashSet is designed for uniqueness while maintaining insertion order."
        },
        {
          question: "What should I use if I need unique elements in sorted order?",
          answer:
            "TreeSet is designed for sorted Set behavior."
        },
        {
          question: "What is the most important interview concept in HashSet?",
          answer:
            "Understanding the relationship between hashCode(), equals(), buckets, collisions, and how HashSet uses a backing HashMap to maintain uniqueness."
        }
      ]
    }
  ]
};