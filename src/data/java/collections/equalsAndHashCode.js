export const equalsAndHashCode = {
  id: "equals-and-hashcode",
  slug: "equals-and-hashcode",

  title: "equals() and hashCode() in Java Collections",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand equals() and hashCode() in Java, why they are important for HashSet and HashMap, how to override them correctly, and the relationship between object equality and hash-based collections.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-equals",
      title: "1. What is equals()?",

      paragraphs: [
        "equals() is a method defined in the Object class and is used to determine whether two objects are logically equal.",
        "The default implementation in Object compares object identity, while classes can override equals() to define their own logical equality.",
        "For collection classes such as HashSet and HashMap, a correctly implemented equals() method is important when objects are used as elements or keys."
      ],

      code: {
        language: "java",
        code: `class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }
}

public class Main {

    public static void main(String[] args) {

        Student first = new Student(101);
        Student second = new Student(101);

        System.out.println(
                first.equals(second)
        );
    }
}`
      },

      output: `false`
    },

    {
      id: "reference-vs-logical-equality",
      title: "2. Reference Equality vs Logical Equality",

      paragraphs: [
        "The == operator compares references when it is used with objects. It checks whether two references refer to the same object.",
        "The equals() method is intended to compare logical equality when a class overrides it appropriately."
      ],

      code: {
        language: "java",
        code: `class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return this.id == other.id;
    }
}

public class Main {

    public static void main(String[] args) {

        Student first = new Student(101);
        Student second = new Student(101);

        System.out.println(first == second);
        System.out.println(first.equals(second));
    }
}`
      },

      output: `false
true`
    },

    {
      id: "equals-contract",
      title: "3. equals() Contract",

      paragraphs: [
        "When overriding equals(), the implementation should follow the equality contract defined by Object.",
        "These properties help ensure that equality behaves consistently."
      ],

      bullets: [
        "Reflexive: x.equals(x) should be true.",
        "Symmetric: if x.equals(y) is true, y.equals(x) should also be true.",
        "Transitive: if x.equals(y) and y.equals(z) are true, x.equals(z) should also be true.",
        "Consistent: repeated calls should produce the same result when relevant state has not changed.",
        "Non-null: x.equals(null) should be false."
      ]
    },

    {
      id: "default-hashcode",
      title: "4. What is hashCode()?",

      paragraphs: [
        "hashCode() is another method defined in Object.",
        "It returns an integer hash value for an object.",
        "Hash-based collections use hash codes as part of their process for locating elements or keys."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String name = "Java";

        System.out.println(
                name.hashCode()
        );
    }
}`
      },

      output: `2301506`
    },

    {
      id: "hashcode-rule",
      title: "5. The equals() and hashCode() Relationship",

      paragraphs: [
        "The most important rule is: if two objects are equal according to equals(), they must return the same hash code.",
        "The reverse is not required: two unequal objects can have the same hash code. This situation is called a hash collision."
      ],

      bullets: [
        "If a.equals(b) is true, a.hashCode() must equal b.hashCode().",
        "If two objects have different hash codes, they cannot be equal according to equals().",
        "If two objects have the same hash code, they may or may not be equal.",
        "Equal objects must have equal hash codes."
      ],

      code: {
        language: "java",
        code: `class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

public class Main {

    public static void main(String[] args) {

        Student first = new Student(101);
        Student second = new Student(101);

        System.out.println(
                first.equals(second)
        );

        System.out.println(
                first.hashCode()
                == second.hashCode()
        );
    }
}`
      },

      output: `true
true`
    },

    {
      id: "hashset-without-overrides",
      title: "6. HashSet Without equals() and hashCode()",

      paragraphs: [
        "HashSet uses hashing and equality to determine whether an element is already present.",
        "If a custom class does not correctly override equals() and hashCode(), two logically identical objects may be treated as different elements."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }
}

public class Main {

    public static void main(String[] args) {

        Set<Student> students =
                new HashSet<>();

        students.add(new Student(101));
        students.add(new Student(101));

        System.out.println(
                students.size()
        );
    }
}`
      },

      output: `2`
    },

    {
      id: "hashset-with-overrides",
      title: "7. HashSet With equals() and hashCode()",

      paragraphs: [
        "When equals() and hashCode() are implemented consistently, HashSet can recognize logically equal objects as duplicates."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

public class Main {

    public static void main(String[] args) {

        Set<Student> students =
                new HashSet<>();

        students.add(new Student(101));
        students.add(new Student(101));

        System.out.println(
                students.size()
        );
    }
}`
      },

      output: `1`
    },

    {
      id: "hashmap-key",
      title: "8. equals() and hashCode() with HashMap Keys",

      paragraphs: [
        "HashMap uses keys to locate values.",
        "When custom objects are used as keys, equals() and hashCode() must be implemented consistently if logically equal objects are expected to behave as the same key."
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

public class Main {

    public static void main(String[] args) {

        Map<Student, String> students =
                new HashMap<>();

        students.put(
                new Student(101),
                "Ravi"
        );

        System.out.println(
                students.get(
                        new Student(101)
                )
        );
    }
}`
      },

      output: `Ravi`
    },

    {
      id: "hashmap-without-hashcode",
      title: "9. What Happens if hashCode() Is Not Overridden?",

      paragraphs: [
        "If equals() is overridden but hashCode() is not overridden consistently, hash-based collections can behave incorrectly.",
        "Two logically equal objects may produce different hash codes and therefore be placed in different hash buckets."
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return this.id == other.id;
    }

    // hashCode() is intentionally not overridden.
}

public class Main {

    public static void main(String[] args) {

        Map<Student, String> students =
                new HashMap<>();

        students.put(
                new Student(101),
                "Ravi"
        );

        System.out.println(
                students.get(
                        new Student(101)
                )
        );
    }
}`
      },

      output: `null`
    },

    {
      id: "hashmap-process",
      title: "10. How HashMap Uses hashCode() and equals()",

      paragraphs: [
        "When a key is inserted into a HashMap, the map uses the key's hash code as part of locating the appropriate bucket.",
        "When searching for a key, the map uses hashing and then equality checks to identify the matching key.",
        "The exact internal implementation details depend on the Java version, but the key requirement for developers is that equals() and hashCode() remain consistent."
      ],

      bullets: [
        "Calculate the key's hash code.",
        "Use the hash information to locate a bucket.",
        "Compare keys when necessary using equality checks.",
        "Store or retrieve the associated value."
      ]
    },

    {
      id: "hash-collision",
      title: "11. What is a Hash Collision?",

      paragraphs: [
        "A hash collision occurs when two unequal objects produce the same hash code.",
        "Hash collisions are allowed and are handled by hash-based collections.",
        "Therefore, a matching hash code does not prove that two objects are equal."
      ],

      code: {
        language: "java",
        code: `class Product {

    private int id;

    public Product(int id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        return 1;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Product)) {
            return false;
        }

        Product other = (Product) obj;

        return this.id == other.id;
    }
}

public class Main {

    public static void main(String[] args) {

        Product first = new Product(101);
        Product second = new Product(102);

        System.out.println(
                first.hashCode()
                == second.hashCode()
        );

        System.out.println(
                first.equals(second)
        );
    }
}`
      },

      output: `true
false`
    },

    {
      id: "objects-hash",
      title: "12. Using Objects.hash()",

      paragraphs: [
        "The java.util.Objects class provides hash() to conveniently calculate a hash value using multiple fields.",
        "It is useful when equals() compares multiple fields."
      ],

      code: {
        language: "java",
        code: `import java.util.Objects;

class Employee {

    private int id;
    private String name;

    public Employee(int id, String name) {
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

        return id == other.id
                && Objects.equals(
                        name,
                        other.name
                );
    }

    @Override
    public int hashCode() {

        return Objects.hash(
                id,
                name
        );
    }
}`
      }
    },

    {
      id: "multiple-fields",
      title: "13. equals() and hashCode() with Multiple Fields",

      paragraphs: [
        "The fields used by equals() should be reflected consistently in hashCode().",
        "If equality depends on id and name, the hash code should also be calculated from id and name."
      ],

      code: {
        language: "java",
        code: `import java.util.Objects;

class Employee {

    private int id;
    private String name;

    public Employee(int id, String name) {
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

        return id == other.id
                && Objects.equals(
                        name,
                        other.name
                );
    }

    @Override
    public int hashCode() {

        return Objects.hash(
                id,
                name
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Employee first =
                new Employee(101, "Ravi");

        Employee second =
                new Employee(101, "Ravi");

        System.out.println(
                first.equals(second)
        );

        System.out.println(
                first.hashCode()
                == second.hashCode()
        );
    }
}`
      },

      output: `true
true`
    },

    {
      id: "mutable-key",
      title: "14. Mutable Objects as HashMap Keys",

      paragraphs: [
        "Using mutable objects as keys in hash-based collections can cause problems if fields used by equals() and hashCode() are changed after insertion.",
        "If the object's hash code changes after it has been stored, a subsequent lookup may fail because the object may no longer map to the expected bucket."
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Student {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Student)) {
            return false;
        }

        Student other = (Student) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

public class Main {

    public static void main(String[] args) {

        Map<Student, String> map =
                new HashMap<>();

        Student student =
                new Student(101);

        map.put(student, "Ravi");

        student.setId(102);

        System.out.println(
                map.get(student)
        );
    }
}`
      },

      output: `null`
    },

    {
      id: "best-practices",
      title: "15. Best Practices",

      bullets: [
        "Override equals() and hashCode() together.",
        "Use the same logical fields consistently in equals() and hashCode().",
        "Prefer immutable fields for objects used as HashMap keys or HashSet elements.",
        "Use Objects.equals() for null-safe object comparisons.",
        "Use Objects.hash() when it makes multi-field hash code generation clear.",
        "Do not assume equal hash codes mean objects are equal.",
        "Do not modify equality-relevant state while an object is being used as a hash-based collection key."
      ]
    },

    {
      id: "important-points",
      title: "16. Important Points",

      bullets: [
        "equals() is defined in Object.",
        "hashCode() is also defined in Object.",
        "equals() determines logical equality when overridden.",
        "== compares object references.",
        "Equal objects must have equal hash codes.",
        "Unequal objects can have the same hash code.",
        "HashSet uses hashing and equality to manage uniqueness.",
        "HashMap uses hashing and equality when working with keys.",
        "Overriding equals() without a consistent hashCode() can break hash-based collection behavior.",
        "Objects.hash() can help create hash codes from multiple fields.",
        "Objects.equals() provides null-safe equality comparison.",
        "Mutable equality fields can make hash-based keys unsafe."
      ]
    },

    {
      id: "interview-questions",
      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is equals() in Java?",
          answer:
            "equals() is a method from Object used to determine logical equality between objects when overridden by a class."
        },
        {
          question: "What is hashCode()?",
          answer:
            "hashCode() returns an integer hash value used by hash-based data structures as part of locating objects or keys."
        },
        {
          question: "What is the relationship between equals() and hashCode()?",
          answer:
            "If two objects are equal according to equals(), they must return the same hash code."
        },
        {
          question: "If two objects have the same hash code, are they necessarily equal?",
          answer:
            "No. Unequal objects can have the same hash code because hash collisions are possible."
        },
        {
          question: "Why should equals() and hashCode() be overridden together?",
          answer:
            "Hash-based collections depend on their consistency. If equal objects have different hash codes, collections such as HashSet and HashMap may behave incorrectly."
        },
        {
          question: "What is the difference between == and equals()?",
          answer:
            "For object references, == checks whether two references point to the same object, while equals() is used for logical equality when the class overrides it appropriately."
        },
        {
          question: "Why is equals() important in HashSet?",
          answer:
            "HashSet uses hashing and equality to determine whether an element is already present."
        },
        {
          question: "Why is hashCode() important in HashMap?",
          answer:
            "HashMap uses a key's hash code as part of locating the bucket where the key-value mapping is stored or searched."
        },
        {
          question: "What happens if equals() is overridden but hashCode() is not?",
          answer:
            "Logically equal objects can have different hash codes, which can cause incorrect behavior when those objects are used in hash-based collections."
        },
        {
          question: "What is a hash collision?",
          answer:
            "A hash collision occurs when two unequal objects produce the same hash code."
        },
        {
          question: "Can two unequal objects have the same hash code?",
          answer:
            "Yes. A hash code does not have to be unique."
        },
        {
          question: "What are the main properties of the equals() contract?",
          answer:
            "The important properties are reflexive, symmetric, transitive, consistent, and false when compared with null."
        },
        {
          question: "Why can mutable objects be dangerous as HashMap keys?",
          answer:
            "If fields used by equals() and hashCode() change after insertion, the object's hash code may change and subsequent lookup can fail."
        },
        {
          question: "What is Objects.equals()?",
          answer:
            "Objects.equals() performs a null-safe equality comparison between two objects."
        },
        {
          question: "What is Objects.hash()?",
          answer:
            "Objects.hash() is a utility method for calculating a hash value from multiple values."
        }
      ]
    }
  ]
};