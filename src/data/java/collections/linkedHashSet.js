export const linkedHashSet = {
  id: "linkedhashset",
  slug: "linkedhashset",
  title: "LinkedHashSet in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn LinkedHashSet in Java from Set fundamentals to insertion order, hashing, internal working, equals() and hashCode(), custom objects, performance, comparisons, best practices, common mistakes, and interview questions.",
  estimatedTime: "70 min",

  sections: [
    {
      id: "what-is-linkedhashset",
      title: "1. What is LinkedHashSet?",
      paragraphs: [
        "LinkedHashSet is a Set implementation in Java that stores unique elements while maintaining insertion order.",
        "It combines hash-based Set behavior with a linked structure that maintains the order in which elements were inserted.",
        "Like HashSet, LinkedHashSet does not allow duplicate elements.",
        "Unlike HashSet, LinkedHashSet provides predictable iteration order based on insertion order."
      ],
      bullets: [
        "LinkedHashSet implements Set.",
        "Duplicate elements are not allowed.",
        "Insertion order is preserved.",
        "One null element is allowed.",
        "Hashing is used internally.",
        "LinkedHashSet is not synchronized by default."
      ],
      code: {
        language: "java",
        code: `import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {

        Set<String> languages = new LinkedHashSet<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Spring");
        languages.add("Java");

        System.out.println(languages);
    }
}`
      },
      output: "[Java, Python, Spring]"
    },

    {
      id: "linkedhashset-hierarchy",
      title: "2. LinkedHashSet Hierarchy",
      paragraphs: [
        "LinkedHashSet belongs to the Set hierarchy of the Java Collections Framework.",
        "It extends HashSet and provides predictable insertion-order iteration."
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
HashSet
   |
LinkedHashSet`
      },
      bullets: [
        "LinkedHashSet extends HashSet.",
        "HashSet implements Set.",
        "Therefore LinkedHashSet is a Set implementation."
      ]
    },

    {
      id: "creating-linkedhashset",
      title: "3. Creating LinkedHashSet",
      paragraphs: [
        "LinkedHashSet can be created using its default constructor or by specifying an initial capacity and load factor."
      ],
      code: {
        language: "java",
        code: `import java.util.LinkedHashSet;
import java.util.Set;

Set<String> names = new LinkedHashSet<>();

Set<Integer> numbers = new LinkedHashSet<>(20);

Set<String> skills =
        new LinkedHashSet<>(20, 0.75f);`
      },
      bullets: [
        "Use generics for type safety.",
        "The Set interface is normally preferred as the reference type.",
        "Initial capacity can be specified when the expected size is known."
      ]
    },

    {
      id: "linkedhashset-add",
      title: "4. Adding Elements",
      paragraphs: [
        "The add() method adds an element to the LinkedHashSet.",
        "If an equivalent element already exists, add() returns false."
      ],
      code: {
        language: "java",
        code: `Set<String> languages = new LinkedHashSet<>();

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

    {
      id: "linkedhashset-duplicates",
      title: "5. Duplicate Elements",
      paragraphs: [
        "LinkedHashSet does not allow duplicate elements.",
        "If an equivalent element already exists, the new element is ignored."
      ],
      code: {
        language: "java",
        code: `Set<Integer> numbers = new LinkedHashSet<>();

numbers.add(10);
numbers.add(20);
numbers.add(10);
numbers.add(30);
numbers.add(20);

System.out.println(numbers);`
      },
      output: "[10, 20, 30]"
    },

    {
      id: "linkedhashset-insertion-order",
      title: "6. Insertion Order",
      paragraphs: [
        "The main feature of LinkedHashSet is that iteration follows insertion order.",
        "The elements are returned in the order in which they were successfully inserted."
      ],
      code: {
        language: "java",
        code: `Set<String> languages = new LinkedHashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("Spring");
languages.add("React");

System.out.println(languages);`
      },
      output: "[Java, Python, Spring, React]",
      bullets: [
        "Insertion order is preserved.",
        "Duplicate insertion does not change the existing position.",
        "Removing and adding an element again gives it a new position."
      ]
    },

    {
      id: "linkedhashset-remove-readd",
      title: "7. Remove and Re-add",
      paragraphs: [
        "If an element is removed and later added again, it is inserted at the end of the insertion order."
      ],
      code: {
        language: "java",
        code: `Set<String> languages = new LinkedHashSet<>();

languages.add("Java");
languages.add("Python");
languages.add("Spring");

languages.remove("Python");
languages.add("Python");

System.out.println(languages);`
      },
      output: "[Java, Spring, Python]"
    },

    {
      id: "linkedhashset-null",
      title: "8. null Element",
      paragraphs: [
        "LinkedHashSet allows one null element.",
        "Adding null again does not create another element."
      ],
      code: {
        language: "java",
        code: `Set<String> values = new LinkedHashSet<>();

values.add("Java");
values.add(null);
values.add("Python");
values.add(null);

System.out.println(values);`
      },
      output: "[Java, null, Python]"
    },

    {
      id: "linkedhashset-contains",
      title: "9. contains()",
      paragraphs: [
        "The contains() method checks whether an equivalent element exists in the LinkedHashSet."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring Boot");
skills.add("MySQL");

System.out.println(skills.contains("Java"));
System.out.println(skills.contains("React"));`
      },
      output: `true
false`
    },

    {
      id: "linkedhashset-remove",
      title: "10. remove()",
      paragraphs: [
        "The remove() method removes an element from the LinkedHashSet."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring");
skills.add("MySQL");

System.out.println(skills.remove("Spring"));
System.out.println(skills.remove("Python"));

System.out.println(skills);`
      },
      output: `true
false
[Java, MySQL]`
    },

    {
      id: "linkedhashset-size",
      title: "11. size()",
      paragraphs: [
        "The size() method returns the number of unique elements in the LinkedHashSet."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Java");
skills.add("SQL");

System.out.println(skills.size());`
      },
      output: "2"
    },

    {
      id: "linkedhashset-is-empty",
      title: "12. isEmpty()",
      paragraphs: [
        "The isEmpty() method checks whether the LinkedHashSet contains no elements."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

System.out.println(skills.isEmpty());

skills.add("Java");

System.out.println(skills.isEmpty());`
      },
      output: `true
false`
    },

    {
      id: "linkedhashset-clear",
      title: "13. clear()",
      paragraphs: [
        "The clear() method removes all elements from the LinkedHashSet."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring");
skills.add("MySQL");

System.out.println(skills);

skills.clear();

System.out.println(skills);`
      },
      output: `"[Java, Spring, MySQL]"
[]`
    },

    {
      id: "linkedhashset-iteration",
      title: "14. Iterating LinkedHashSet",
      paragraphs: [
        "LinkedHashSet can be iterated using an enhanced for loop.",
        "Unlike HashSet, the iteration follows insertion order."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring");
skills.add("MySQL");

for (String skill : skills) {
    System.out.println(skill);
}`
      },
      output: `Java
Spring
MySQL`
    },

    {
      id: "linkedhashset-iterator",
      title: "15. Iterator",
      paragraphs: [
        "Iterator provides a standard way to traverse a LinkedHashSet.",
        "The iterator can also safely remove the current element."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring");
skills.add("MySQL");

Iterator<String> iterator = skills.iterator();

while (iterator.hasNext()) {

    String skill = iterator.next();

    if (skill.equals("Spring")) {
        iterator.remove();
    }
}

System.out.println(skills);`
      },
      output: "[Java, MySQL]"
    },

    {
      id: "linkedhashset-foreach",
      title: "16. forEach()",
      paragraphs: [
        "The forEach() method can be used for simple traversal."
      ],
      code: {
        language: "java",
        code: `Set<String> skills = new LinkedHashSet<>();

skills.add("Java");
skills.add("Spring");
skills.add("MySQL");

skills.forEach(skill ->
    System.out.println(skill)
);`
      },
      output: `Java
Spring
MySQL`
    },

    {
      id: "linkedhashset-vs-hashset-concept",
      title: "17. HashSet vs LinkedHashSet Concept",
      paragraphs: [
        "Both HashSet and LinkedHashSet prevent duplicates and use hash-based storage.",
        "The major difference is that LinkedHashSet additionally maintains insertion order."
      ],
      code: {
        language: "text",
        code: `HashSet

Hashing
   |
Unique elements
   |
No guaranteed order


LinkedHashSet

Hashing
   +
Linked ordering
   |
Unique elements
   |
Insertion order`
      }
    },

    {
      id: "linkedhashset-internal-working",
      title: "18. Internal Working",
      paragraphs: [
        "LinkedHashSet extends HashSet and uses hash-based storage together with linked ordering information.",
        "Hashing helps locate elements efficiently, while the linked structure maintains the order used during iteration."
      ],
      code: {
        language: "text",
        code: `LinkedHashSet
      |
      +----------------+
      |                |
      v                v
 Hash-based       Linked-order
 storage          structure
      |                |
      v                v
 Buckets          A -> B -> C -> D
      |
      v
Unique elements`
      },
      bullets: [
        "Hashing supports efficient lookup.",
        "Linked ordering supports predictable iteration.",
        "The exact implementation is a JDK implementation detail."
      ]
    },

    {
      id: "linkedhashset-hashing",
      title: "19. Hashing",
      paragraphs: [
        "LinkedHashSet uses hashing to determine where elements belong in the underlying hash structure.",
        "The hash code is used to find a candidate location, and equals() is used when necessary to determine logical equality."
      ],
      code: {
        language: "text",
        code: `Element
   |
hashCode()
   |
Hash processing
   |
Candidate bucket
   |
equals()
   |
Existing element?
   |
   +-- Yes -> duplicate
   |
   +-- No  -> add`
      }
    },

    {
      id: "linkedhashset-linked-order",
      title: "20. Linked Ordering",
      paragraphs: [
        "LinkedHashSet maintains a linked ordering between entries so that iteration can follow insertion order."
      ],
      code: {
        language: "text",
        code: `add(A)
add(B)
add(C)
add(D)

Insertion order:

A -> B -> C -> D

Iteration:

A
B
C
D`
      },
      bullets: [
        "The linked order is used for predictable iteration.",
        "Hash-table position and insertion order are separate concepts."
      ]
    },

    {
      id: "linkedhashset-buckets-links",
      title: "21. Buckets and Linked Structure",
      paragraphs: [
        "An element's bucket location is determined by hashing, while its position in iteration is determined by the linked ordering."
      ],
      code: {
        language: "text",
        code: `Hash table:

Bucket 0 -> A
Bucket 1 -> C
Bucket 2 -> B
Bucket 3 -> D

Insertion order:

A -> B -> C -> D

Important:

Bucket position != iteration order`
      }
    },

    {
      id: "linkedhashset-equals-hashcode",
      title: "22. equals() and hashCode()",
      paragraphs: [
        "The equals() and hashCode() contract is important when custom objects are stored in LinkedHashSet.",
        "If two objects are equal according to equals(), they must return the same hash code."
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
        "Equal objects must have equal hash codes.",
        "Same hash code does not mean objects are equal.",
        "Override equals() and hashCode() consistently."
      ]
    },

    {
      id: "linkedhashset-custom-objects",
      title: "23. Custom Objects",
      paragraphs: [
        "LinkedHashSet can store custom objects while maintaining their insertion order.",
        "If equality is based on specific fields, those fields should be used consistently in equals() and hashCode()."
      ],
      code: {
        language: "java",
        code: `import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

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

        Employee other = (Employee) obj;

        return id == other.id &&
               Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return id + "-" + name;
    }
}

public class Main {

    public static void main(String[] args) {

        Set<Employee> employees =
                new LinkedHashSet<>();

        employees.add(
            new Employee(1, "Alice")
        );

        employees.add(
            new Employee(2, "Bob")
        );

        employees.add(
            new Employee(1, "Alice")
        );

        System.out.println(employees);
    }
}`
      },
      output: "[1-Alice, 2-Bob]"
    },

    {
      id: "linkedhashset-mutable-objects",
      title: "24. Mutable Objects",
      paragraphs: [
        "Changing fields used by equals() and hashCode() after an object has been inserted can cause unexpected behavior in hash-based collections.",
        "The same rule applies to LinkedHashSet."
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

        Employee other = (Employee) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

// Avoid:
//
// set.add(employee);
// employee.id = 20;
//
// If id participates in hashCode(),
// lookup behavior may become unexpected.`
      },
      bullets: [
        "Prefer immutable objects as Set elements.",
        "Avoid changing equality-related state after insertion.",
        "If modification is necessary, remove the object first, modify it, then add it again."
      ]
    },

    {
      id: "linkedhashset-complexity",
      title: "25. Time Complexity",
      paragraphs: [
        "LinkedHashSet has hash-based average performance similar to HashSet for basic operations.",
        "It uses additional memory to maintain insertion order."
      ],
      code: {
        language: "text",
        code: `Operation       Average Complexity

add()            O(1)

remove()         O(1)

contains()       O(1)

size()           O(1)

isEmpty()        O(1)

clear()          O(n)

iteration        O(n)`
      },
      bullets: [
        "add() is O(1) on average.",
        "remove() is O(1) on average.",
        "contains() is O(1) on average.",
        "Iteration is O(n).",
        "Hash collisions can affect actual performance."
      ]
    },

    {
      id: "linkedhashset-vs-hashset",
      title: "26. LinkedHashSet vs HashSet",
      paragraphs: [
        "Both classes store unique elements using hash-based mechanisms.",
        "The major difference is ordering."
      ],
      code: {
        language: "text",
        code: `HashSet
  |
  +-- Unique
  +-- Hashing
  +-- No guaranteed order


LinkedHashSet
  |
  +-- Unique
  +-- Hashing
  +-- Insertion order`
      },
      bullets: [
        "HashSet does not guarantee iteration order.",
        "LinkedHashSet preserves insertion order.",
        "LinkedHashSet has additional memory overhead.",
        "Both provide average O(1) basic operations."
      ]
    },

    {
      id: "linkedhashset-vs-treeset",
      title: "27. LinkedHashSet vs TreeSet",
      paragraphs: [
        "LinkedHashSet maintains insertion order, while TreeSet maintains sorted order."
      ],
      code: {
        language: "java",
        code: `Set<String> linkedSet =
        new LinkedHashSet<>();

linkedSet.add("B");
linkedSet.add("A");
linkedSet.add("C");

System.out.println(linkedSet);

// [B, A, C]


Set<String> treeSet =
        new TreeSet<>();

treeSet.add("B");
treeSet.add("A");
treeSet.add("C");

System.out.println(treeSet);

// [A, B, C]`
      },
      output: `[B, A, C]
[A, B, C]`,
      bullets: [
        "LinkedHashSet preserves insertion order.",
        "TreeSet maintains sorted order.",
        "LinkedHashSet uses hashing.",
        "TreeSet uses tree-based ordering."
      ]
    },

    {
      id: "linkedhashset-vs-arraylist",
      title: "28. LinkedHashSet vs ArrayList",
      paragraphs: [
        "Both can preserve insertion order, but they have different purposes.",
        "ArrayList allows duplicates and provides index-based access. LinkedHashSet guarantees uniqueness."
      ],
      code: {
        language: "text",
        code: `ArrayList

[Java, Java, Spring]

Duplicates allowed
Index based


LinkedHashSet

[Java, Spring]

Duplicates removed
Insertion order
No index based access`
      },
      bullets: [
        "Use ArrayList when duplicates are allowed or index access is needed.",
        "Use LinkedHashSet when uniqueness and insertion order are required."
      ]
    },

    {
      id: "linkedhashset-common-mistakes",
      title: "29. Common Mistakes and Best Practices",
      paragraphs: [
        "LinkedHashSet is useful when an application needs unique values while retaining insertion order."
      ],
      bullets: [
        "Do not confuse insertion order with sorted order.",
        "Do not expect index-based access.",
        "Do not override equals() without hashCode().",
        "Do not modify hash-related fields after insertion.",
        "Do not assume LinkedHashSet is synchronized.",
        "Use HashSet when ordering is not required.",
        "Use LinkedHashSet when insertion order is required.",
        "Use TreeSet when sorted order is required.",
        "Use generics.",
        "Prefer the Set interface for declarations.",
        "Do not rely on implementation-specific internals."
      ],
      code: {
        language: "java",
        code: `Set<String> uniqueSkills =
        new LinkedHashSet<>();

uniqueSkills.add("Java");
uniqueSkills.add("Spring Boot");
uniqueSkills.add("MySQL");
uniqueSkills.add("Java");

for (String skill : uniqueSkills) {
    System.out.println(skill);
}`
      },
      output: `Java
Spring Boot
MySQL`
    },

    {
      id: "linkedhashset-interview",
      title: "30. Key Points + Interview Questions",
      paragraphs: [
        "LinkedHashSet combines Set uniqueness, hash-based lookup, and predictable insertion-order iteration."
      ],
      bullets: [
        "LinkedHashSet implements Set.",
        "LinkedHashSet extends HashSet.",
        "Duplicate elements are not allowed.",
        "One null element is allowed.",
        "Insertion order is preserved.",
        "Hashing is used for lookup.",
        "Additional linked ordering information is maintained.",
        "It is not synchronized by default.",
        "add(), remove(), and contains() are O(1) on average.",
        "Iteration is O(n).",
        "equals() and hashCode() must be consistent.",
        "Avoid mutable equality-related fields.",
        "HashSet is used when order does not matter.",
        "LinkedHashSet is used when insertion order matters.",
        "TreeSet is used when sorted order matters."
      ],

      interviewQuestions: [
        {
          question: "What is LinkedHashSet?",
          answer:
            "LinkedHashSet is a Set implementation that prevents duplicate elements and maintains insertion order during iteration."
        },
        {
          question: "What is the main difference between HashSet and LinkedHashSet?",
          answer:
            "HashSet does not guarantee iteration order, while LinkedHashSet maintains insertion order."
        },
        {
          question: "Does LinkedHashSet allow duplicates?",
          answer:
            "No. Duplicate elements are not stored."
        },
        {
          question: "Does LinkedHashSet allow null?",
          answer:
            "Yes. It allows one null element."
        },
        {
          question: "Does LinkedHashSet maintain insertion order?",
          answer:
            "Yes. Iteration follows insertion order."
        },
        {
          question: "What happens when a duplicate is added?",
          answer:
            "The duplicate is not added and add() returns false. The existing element keeps its original position."
        },
        {
          question: "What happens when an element is removed and added again?",
          answer:
            "It is inserted again at the end of the insertion order."
        },
        {
          question: "How does LinkedHashSet maintain insertion order?",
          answer:
            "It maintains linked ordering information in addition to its hash-based storage."
        },
        {
          question: "What is the internal working of LinkedHashSet?",
          answer:
            "LinkedHashSet uses hash-based storage for efficient lookup and linked ordering information for predictable iteration."
        },
        {
          question: "Does LinkedHashSet use hashing?",
          answer:
            "Yes. Hashing is used to efficiently locate elements."
        },
        {
          question: "Why are equals() and hashCode() important?",
          answer:
            "They determine logical equality and support correct hash-based lookup. Equal objects must have the same hash code."
        },
        {
          question: "Can two unequal objects have the same hash code?",
          answer:
            "Yes. This is called a hash collision."
        },
        {
          question: "What is the average time complexity of add()?",
          answer:
            "O(1) on average."
        },
        {
          question: "What is the average time complexity of contains()?",
          answer:
            "O(1) on average."
        },
        {
          question: "What is the average time complexity of remove()?",
          answer:
            "O(1) on average."
        },
        {
          question: "What is the time complexity of iteration?",
          answer:
            "O(n)."
        },
        {
          question: "Is LinkedHashSet synchronized?",
          answer:
            "No. LinkedHashSet is not synchronized by default."
        },
        {
          question: "Can LinkedHashSet store custom objects?",
          answer:
            "Yes. Custom objects can be stored, and equals() and hashCode() should be implemented consistently when logical uniqueness depends on object fields."
        },
        {
          question: "What happens if a hash-related field is changed after insertion?",
          answer:
            "Hash-based lookup or removal may behave unexpectedly because the object's current hash state may no longer correspond to its original location."
        },
        {
          question: "What is the difference between LinkedHashSet and TreeSet?",
          answer:
            "LinkedHashSet maintains insertion order, while TreeSet maintains sorted order."
        },
        {
          question: "What is the difference between LinkedHashSet and ArrayList?",
          answer:
            "ArrayList allows duplicates and supports index-based access. LinkedHashSet prevents duplicates and maintains insertion order but does not provide index-based access."
        },
        {
          question: "When should LinkedHashSet be used?",
          answer:
            "Use LinkedHashSet when you need unique elements and predictable insertion-order iteration."
        },
        {
          question: "When should HashSet be used?",
          answer:
            "Use HashSet when uniqueness matters but insertion order does not."
        },
        {
          question: "When should TreeSet be used?",
          answer:
            "Use TreeSet when unique elements need to remain sorted."
        },
        {
          question: "Does LinkedHashSet sort elements?",
          answer:
            "No. It maintains insertion order; it does not sort elements."
        },
        {
          question: "Does LinkedHashSet support get(index)?",
          answer:
            "No. Set is not an index-based collection."
        },
        {
          question: "Why does LinkedHashSet use more memory than HashSet?",
          answer:
            "It maintains additional linked-order information so that iteration can follow insertion order."
        },
        {
          question: "What is the most important concept in LinkedHashSet?",
          answer:
            "LinkedHashSet combines uniqueness and hash-based lookup with predictable insertion-order iteration."
        }
      ]
    }
  ]
};