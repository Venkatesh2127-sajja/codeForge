export const collectionsFundamentals = {
  id: "collections-fundamentals",
  slug: "collections-fundamentals",
  title: "Collections Framework Fundamentals",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Understand why Java collections are needed, the Collections Framework hierarchy, Collection vs Collections, Iterable, Iterator, generics, wrapper classes, equals() and hashCode(), Comparable, Comparator, sorting, and Big-O basics.",
  estimatedTime: "60 min",

  sections: [
    {
      id: "why-collections",
      title: "1. Why Do We Need Collections?",
      paragraphs: [
        "A collection is used to store and manage a group of objects. Java arrays can store multiple values, but arrays have a fixed size and provide only limited built-in operations.",
        "The Java Collections Framework provides reusable data structures and algorithms for storing, searching, sorting, and manipulating groups of objects."
      ],
      code: {
        language: "java",
        code: `int[] numbers = new int[5];

numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;`
      },
      bullets: [
        "Arrays have a fixed length.",
        "Adding and removing elements is not convenient.",
        "Searching and sorting usually require additional code.",
        "Collections provide dynamic data structures.",
        "Collections provide useful methods for common operations."
      ]
    },

    {
      id: "array-vs-collection",
      title: "2. Array vs Collection",
      paragraphs: [
        "Arrays and collections both store multiple values, but they are designed for different requirements."
      ],
      code: {
        language: "java",
        code: `// Array

int[] numbers = new int[3];

numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;


// Collection

List<Integer> values = new ArrayList<>();

values.add(10);
values.add(20);
values.add(30);
values.add(40);`
      },
      bullets: [
        "Array → generally fixed size.",
        "Collection → dynamically grows or shrinks depending on implementation.",
        "Array can store primitives directly.",
        "Collections store objects, using wrapper classes for primitives.",
        "Collections provide many ready-made operations."
      ]
    },

    {
      id: "collections-framework",
      title: "3. What is the Java Collections Framework?",
      paragraphs: [
        "The Java Collections Framework is a unified architecture for representing and manipulating groups of objects.",
        "It contains interfaces, implementations, algorithms, and utility methods that allow developers to work with common data structures without implementing them from scratch."
      ],
      bullets: [
        "Interfaces define common behaviors.",
        "Implementations provide concrete data structures.",
        "Algorithms provide operations such as sorting and searching.",
        "Utility methods simplify common collection operations.",
        "The framework is primarily available through java.util."
      ],
      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("React");`
      }
    },

    {
      id: "collection-hierarchy",
      title: "4. Collections Framework Hierarchy",
      paragraphs: [
        "The Collections Framework contains several major interfaces. List, Set, and Queue extend the Collection interface.",
        "Map is also an important part of the Collections Framework, but Map does not extend Collection."
      ],
      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
   +-------------------+------------------+
   |                   |                  |
  List                Set               Queue
   |                   |                  |
   +-- ArrayList       +-- HashSet       +-- PriorityQueue
   +-- LinkedList      +-- LinkedHashSet +-- Deque
   +-- Vector          +-- TreeSet
   +-- Stack


Map
 |
 +-- HashMap
 +-- LinkedHashMap
 +-- TreeMap
 +-- Hashtable`
      },
      bullets: [
        "List allows ordered elements and generally permits duplicates.",
        "Set is used for unique elements.",
        "Queue represents elements waiting to be processed.",
        "Map stores key-value pairs.",
        "Map is not a subtype of Collection."
      ]
    },

    {
      id: "list-set-map-preview",
      title: "5. List, Set, Queue and Map — Basic Idea",
      paragraphs: [
        "Different collection interfaces solve different data-management problems."
      ],
      bullets: [
        "List → ordered collection where duplicates are normally allowed.",
        "Set → collection designed to contain unique elements.",
        "Queue → collection commonly used for processing elements in a particular order.",
        "Map → stores associations between keys and values."
      ],
      code: {
        language: "java",
        code: `List<String> list = new ArrayList<>();

Set<String> set = new HashSet<>();

Queue<String> queue = new LinkedList<>();

Map<Integer, String> map = new HashMap<>();`
      }
    },

    {
      id: "collection-vs-collections",
      title: "6. Collection vs Collections",
      paragraphs: [
        "Collection and Collections look similar but have completely different purposes.",
        "Collection is an interface. Collections is a utility class containing static methods for working with collections."
      ],
      code: {
        language: "java",
        code: `// Collection is an interface

Collection<String> names =
    new ArrayList<>();


// Collections is a utility class

Collections.sort(list);

Collections.reverse(list);

Collections.shuffle(list);`
      },
      bullets: [
        "Collection → interface.",
        "Collections → utility class.",
        "Collection defines collection behavior.",
        "Collections provides utility algorithms and helper methods.",
        "They should not be confused during interviews."
      ]
    },

    {
      id: "iterable",
      title: "7. Iterable Interface",
      paragraphs: [
        "Iterable is the root interface that allows an object to provide an Iterator.",
        "The enhanced for-loop works with objects that implement Iterable."
      ],
      code: {
        language: "java",
        code: `List<String> names = new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("React");

for (String name : names) {
    System.out.println(name);
}`
      },
      bullets: [
        "Iterable provides iterator().",
        "Collections such as List and Set implement Iterable through the Collection hierarchy.",
        "Iterable enables enhanced for-loop traversal."
      ]
    },

    {
      id: "iterator",
      title: "8. Iterator",
      paragraphs: [
        "Iterator provides a standard way to traverse elements in a collection.",
        "It is useful when you need explicit control over traversal or need to safely remove elements while iterating."
      ],
      code: {
        language: "java",
        code: `List<String> names = new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("React");

Iterator<String> iterator =
    names.iterator();

while (iterator.hasNext()) {

    String name = iterator.next();

    System.out.println(name);
}`
      },
      bullets: [
        "hasNext() checks whether another element exists.",
        "next() returns the next element.",
        "remove() can remove the last element returned by the iterator when supported.",
        "Iterator provides a common traversal mechanism."
      ]
    },

    {
      id: "iterator-removal",
      title: "9. Removing Elements Using Iterator",
      paragraphs: [
        "Removing elements directly from a collection while using an iterator can cause ConcurrentModificationException for many collection implementations.",
        "Iterator provides a remove() operation specifically designed for removing the last element returned by that iterator."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);

Iterator<Integer> iterator =
    numbers.iterator();

while (iterator.hasNext()) {

    Integer number = iterator.next();

    if (number == 20) {
        iterator.remove();
    }
}

System.out.println(numbers);`
      },
      output: `[10, 30]`,
      bullets: [
        "Iterator controls the traversal.",
        "iterator.remove() removes the current element safely.",
        "Avoid structurally modifying a collection directly during ordinary iteration."
      ]
    },

    {
      id: "generics",
      title: "10. Generics in Collections",
      paragraphs: [
        "Generics allow collections to specify the type of elements they are allowed to contain.",
        "They provide compile-time type safety and reduce the need for explicit type casting."
      ],
      code: {
        language: "java",
        code: `List<String> names =
    new ArrayList<>();

names.add("Java");
names.add("Spring");

// Compile-time error
// names.add(100);`
      },
      bullets: [
        "Generics provide type safety.",
        "The compiler detects invalid types.",
        "Explicit casting is often avoided.",
        "Generics make collection code easier to understand."
      ]
    },

    {
      id: "generic-without",
      title: "11. Generic vs Raw Collection",
      paragraphs: [
        "A raw collection does not specify its element type. Raw collections were common in older Java code but should generally be avoided in modern applications."
      ],
      code: {
        language: "java",
        code: `// Raw collection

List names = new ArrayList();

names.add("Java");
names.add(100);


// Generic collection

List<String> names2 =
    new ArrayList<>();

names2.add("Java");

// names2.add(100); // Compile error`
      },
      bullets: [
        "Raw collections reduce type safety.",
        "Generics catch many mistakes at compile time.",
        "Prefer parameterized collection types."
      ]
    },

    {
      id: "generic-type",
      title: "12. Generic Type Parameter",
      paragraphs: [
        "A generic type parameter such as T allows a class or method to work with different types while preserving type safety."
      ],
      code: {
        language: "java",
        code: `public class Box<T> {

    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

Box<String> box =
    new Box<>();

box.set("Java");

String value = box.get();`
      },
      bullets: [
        "T represents a type parameter.",
        "The actual type is supplied when the class is used.",
        "Generics are heavily used throughout the Collections Framework."
      ]
    },

    {
      id: "wrapper-classes",
      title: "13. Wrapper Classes",
      paragraphs: [
        "Java collections store objects rather than primitive values. Wrapper classes provide object representations of primitive types."
      ],
      code: {
        language: "java",
        code: `int number = 10;

Integer wrappedNumber = 10;

List<Integer> numbers =
    new ArrayList<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);`
      },
      bullets: [
        "int → Integer",
        "long → Long",
        "double → Double",
        "float → Float",
        "char → Character",
        "boolean → Boolean",
        "byte → Byte",
        "short → Short"
      ]
    },

    {
      id: "autoboxing-unboxing",
      title: "14. Autoboxing and Unboxing",
      paragraphs: [
        "Autoboxing automatically converts a primitive value into its corresponding wrapper object.",
        "Unboxing automatically converts a wrapper object back into a primitive value."
      ],
      code: {
        language: "java",
        code: `int number = 10;

// Autoboxing
Integer value = number;

// Unboxing
int result = value;`
      },
      bullets: [
        "Primitive → wrapper = autoboxing.",
        "Wrapper → primitive = unboxing.",
        "Collections make frequent use of autoboxing and unboxing."
      ]
    },

    {
      id: "equals",
      title: "15. equals() Method",
      paragraphs: [
        "The equals() method is used to determine logical equality between objects.",
        "The default implementation inherited from Object compares object identity, but classes can override equals() to define meaningful logical equality."
      ],
      code: {
        language: "java",
        code: `class Employee {

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

        Employee other =
            (Employee) obj;

        return id == other.id;
    }
}`
      },
      bullets: [
        "equals() should represent logical equality.",
        "It is important for collections that compare elements.",
        "Hash-based collections depend on equals() together with hashCode()."
      ]
    },

    {
      id: "hashcode",
      title: "16. hashCode() Method",
      paragraphs: [
        "hashCode() returns an integer hash value for an object.",
        "Hash-based collections such as HashMap and HashSet use hash codes to efficiently locate potential matching elements."
      ],
      code: {
        language: "java",
        code: `@Override
public int hashCode() {
    return Integer.hashCode(id);
}`
      },
      bullets: [
        "hashCode() is defined in Object.",
        "Classes overriding equals() should normally also override hashCode().",
        "Hash-based collections use hashCode() to determine where an object belongs.",
        "A hash collision can occur when different objects produce the same hash code."
      ]
    },

    {
      id: "equals-hashcode-contract",
      title: "17. equals() and hashCode() Contract",
      paragraphs: [
        "The equals() and hashCode() contract is extremely important for HashSet, HashMap, and other hash-based collections."
      ],
      code: {
        language: "text",
        code: `If:

a.equals(b) == true

Then:

a.hashCode() == b.hashCode()`
      },
      bullets: [
        "Equal objects must have the same hash code.",
        "Objects with the same hash code do not necessarily have to be equal.",
        "Overriding equals() without correctly overriding hashCode() can cause unexpected behavior in hash-based collections."
      ]
    },

    {
      id: "equals-hashcode-example",
      title: "18. equals() and hashCode() with HashSet",
      paragraphs: [
        "HashSet uses hashCode() and equals() to determine whether an element is already present."
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

        Student other =
            (Student) obj;

        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

Set<Student> students =
    new HashSet<>();

students.add(new Student(101));
students.add(new Student(101));

System.out.println(students.size());`
      },
      output: `1`,
      bullets: [
        "Both Student objects have the same logical ID.",
        "equals() considers them equal.",
        "hashCode() produces the same hash for both.",
        "HashSet therefore treats them as duplicates."
      ]
    },

    {
      id: "comparable",
      title: "19. Comparable Interface",
      paragraphs: [
        "Comparable is used to define the natural ordering of objects.",
        "A class implements Comparable when it has a natural way in which its objects should normally be ordered."
      ],
      code: {
        language: "java",
        code: `class Employee
        implements Comparable<Employee> {

    private int age;

    public Employee(int age) {
        this.age = age;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(
            this.age,
            other.age
        );
    }

    public int getAge() {
        return age;
    }
}`
      },
      bullets: [
        "Comparable is in java.lang.",
        "It defines compareTo().",
        "It represents natural ordering.",
        "A class generally defines one primary natural ordering."
      ]
    },

    {
      id: "compareto",
      title: "20. compareTo()",
      paragraphs: [
        "The compareTo() method returns a negative value, zero, or a positive value depending on the ordering relationship between two objects."
      ],
      code: {
        language: "java",
        code: `a.compareTo(b) < 0
// a comes before b

a.compareTo(b) == 0
// a and b have equal ordering

a.compareTo(b) > 0
// a comes after b`
      },
      bullets: [
        "Negative → current object comes before the other object.",
        "Zero → objects have equal ordering.",
        "Positive → current object comes after the other object.",
        "Prefer Integer.compare(), Double.compare(), etc. instead of subtraction to avoid overflow problems."
      ]
    },

    {
      id: "comparator",
      title: "21. Comparator Interface",
      paragraphs: [
        "Comparator is used when you want to define an ordering separately from the class itself.",
        "It is especially useful when objects need to be sorted in multiple different ways."
      ],
      code: {
        language: "java",
        code: `Comparator<Employee> byAge =
    Comparator.comparing(
        Employee::getAge
    );`
      },
      bullets: [
        "Comparator is in java.util.",
        "It defines external or custom ordering.",
        "Multiple comparators can be created for the same class.",
        "It is useful when a class needs multiple sorting strategies."
      ]
    },

    {
      id: "comparable-vs-comparator",
      title: "22. Comparable vs Comparator",
      paragraphs: [
        "Comparable and Comparator both define ordering, but they are used in different ways."
      ],
      code: {
        language: "text",
        code: `Comparable
    |
    +-- compareTo()
    +-- Natural ordering
    +-- Implemented by the class
    +-- Usually one primary ordering


Comparator
    |
    +-- compare()
    +-- Custom ordering
    +-- Separate from the class
    +-- Multiple ordering strategies`
      },
      bullets: [
        "Comparable → natural ordering.",
        "Comparator → custom ordering.",
        "Comparable modifies the class.",
        "Comparator can be created independently.",
        "Comparator is useful when multiple sorting strategies are required."
      ]
    },

    {
      id: "sorting",
      title: "23. Sorting Collections",
      paragraphs: [
        "Java provides several ways to sort collections. The approach depends on whether the elements have natural ordering or whether a custom ordering is required."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>();

numbers.add(30);
numbers.add(10);
numbers.add(20);

Collections.sort(numbers);

System.out.println(numbers);`
      },
      output: `[10, 20, 30]`,
      bullets: [
        "Collections.sort() sorts according to natural ordering.",
        "List.sort() can also be used.",
        "Comparator can provide custom ordering."
      ]
    },

    {
      id: "custom-sorting",
      title: "24. Custom Sorting with Comparator",
      paragraphs: [
        "Comparator allows the same collection to be sorted according to different properties."
      ],
      code: {
        language: "java",
        code: `List<Employee> employees =
    new ArrayList<>();

employees.sort(
    Comparator.comparing(
        Employee::getAge
    )
);`
      },
      bullets: [
        "Sort by age.",
        "A different Comparator can sort by name.",
        "Another Comparator can sort by salary.",
        "Multiple sorting strategies can coexist without changing the Employee class."
      ]
    },

    {
      id: "sorting-descending",
      title: "25. Ascending and Descending Sorting",
      paragraphs: [
        "Comparator utilities can easily create reverse or descending order."
      ],
      code: {
        language: "java",
        code: `List<Integer> numbers =
    new ArrayList<>(
        List.of(10, 30, 20)
    );

numbers.sort(
    Comparator.reverseOrder()
);

System.out.println(numbers);`
      },
      output: `[30, 20, 10]`,
      bullets: [
        "Natural order → ascending for numbers.",
        "Comparator.reverseOrder() → descending.",
        "Custom Comparator → application-specific ordering."
      ]
    },

    {
      id: "big-o",
      title: "26. Big-O Basics",
      paragraphs: [
        "Big-O notation describes how the time or space required by an operation grows as the input size increases.",
        "Understanding Big-O is important when selecting a collection because different data structures provide different performance characteristics."
      ],
      code: {
        language: "text",
        code: `O(1)
Constant time

O(log n)
Logarithmic time

O(n)
Linear time

O(n log n)
Linearithmic time

O(n²)
Quadratic time`
      },
      bullets: [
        "O(1) → operation takes approximately constant time.",
        "O(log n) → growth is logarithmic.",
        "O(n) → work grows linearly with input size.",
        "O(n log n) → common complexity for efficient comparison sorting.",
        "O(n²) → commonly appears in nested-loop algorithms."
      ]
    },

    {
      id: "collection-complexity-preview",
      title: "27. Big-O and Collections",
      paragraphs: [
        "Collection implementations have different performance characteristics. These values are general expectations and can depend on the exact operation and implementation."
      ],
      code: {
        language: "text",
        code: `ArrayList
get(index)       → O(1)
search            → O(n)
add(end)          → O(1) amortized

LinkedList
get(index)       → O(n)
search            → O(n)

HashMap
get(key)          → O(1) average
put(key, value)   → O(1) average

TreeMap
get(key)          → O(log n)
put(key, value)   → O(log n)`
      },
      bullets: [
        "Do not memorize complexities without understanding the underlying data structure.",
        "Hash-based structures generally provide average constant-time lookup.",
        "Tree-based structures generally provide logarithmic operations.",
        "ArrayList provides fast indexed access because it is backed by an array."
      ]
    },

    {
      id: "why-complexity-matters",
      title: "28. Why Big-O Matters When Choosing a Collection",
      paragraphs: [
        "The correct collection depends on what operations your application performs most frequently.",
        "For example, if frequent indexed access is required, ArrayList can be appropriate. If uniqueness is the primary requirement, a Set may be more suitable. If sorted key-value access is required, TreeMap may be appropriate."
      ],
      bullets: [
        "Choose based on access patterns.",
        "Consider insertion and deletion requirements.",
        "Consider ordering requirements.",
        "Consider uniqueness requirements.",
        "Consider lookup requirements.",
        "Consider memory and concurrency requirements."
      ]
    },

    {
      id: "common-mistakes",
      title: "29. Common Mistakes",
      paragraphs: [
        "Understanding the fundamentals prevents many common collection-related mistakes."
      ],
      bullets: [
        "Confusing Collection with Collections.",
        "Thinking Map extends Collection.",
        "Using raw collections instead of generics.",
        "Forgetting that collections store objects rather than primitives.",
        "Overriding equals() without hashCode().",
        "Assuming equal hash codes always mean objects are equal.",
        "Confusing Comparable with Comparator.",
        "Using subtraction directly inside compareTo() when it can overflow.",
        "Modifying a collection directly while iterating with an Iterator.",
        "Choosing a collection without considering Big-O and access patterns.",
        "Memorizing complexities without understanding the underlying structure."
      ]
    },

    {
      id: "key-points",
      title: "30. Key Points and Interview Questions",
      paragraphs: [
        "The Collections Framework provides standard data structures and algorithms for managing groups of objects. Before learning ArrayList, LinkedList, HashSet, and HashMap, you should understand interfaces, generics, object equality, ordering, iteration, and basic complexity."
      ],
      bullets: [
        "Collection is an interface.",
        "Collections is a utility class.",
        "List allows ordered elements and normally permits duplicates.",
        "Set is designed for unique elements.",
        "Queue is used for ordered processing of elements.",
        "Map stores key-value pairs and does not extend Collection.",
        "Iterable provides iterator().",
        "Iterator provides controlled traversal.",
        "Generics provide compile-time type safety.",
        "Collections store objects, so wrapper classes represent primitive values.",
        "equals() defines logical equality.",
        "hashCode() supports hash-based collections.",
        "Equal objects must have equal hash codes.",
        "Comparable defines natural ordering.",
        "Comparator defines custom ordering.",
        "Big-O helps compare the performance characteristics of operations."
      ],
      interviewQuestions: [
        {
          question: "What is the Java Collections Framework?",
          answer:
            "It is a unified set of interfaces, implementations, algorithms, and utility methods used to store and manipulate groups of objects."
        },
        {
          question: "Why are collections needed when arrays already exist?",
          answer:
            "Arrays have a fixed size and limited built-in operations. Collections provide dynamic data structures and reusable operations for common data-management requirements."
        },
        {
          question: "What is the difference between Collection and Collections?",
          answer:
            "Collection is an interface representing a group of objects. Collections is a utility class containing static methods for operations such as sorting, reversing, and searching."
        },
        {
          question: "Does Map extend Collection?",
          answer:
            "No. Map is part of the Collections Framework but has a separate hierarchy because it stores key-value mappings rather than individual elements."
        },
        {
          question: "What is Iterable?",
          answer:
            "Iterable is an interface that provides iterator() and allows an object to be traversed using an enhanced for-loop."
        },
        {
          question: "What is an Iterator?",
          answer:
            "Iterator is an interface used to traverse collection elements sequentially using methods such as hasNext() and next()."
        },
        {
          question: "Why are generics used in collections?",
          answer:
            "Generics provide compile-time type safety, reduce casting, and make collection code clearer."
        },
        {
          question: "Why can't List<int> be used?",
          answer:
            "Java generics work with reference types, not primitive types. Therefore List<Integer> is used instead of List<int>."
        },
        {
          question: "What is autoboxing?",
          answer:
            "Autoboxing is the automatic conversion of a primitive value into its corresponding wrapper object, such as int to Integer."
        },
        {
          question: "Why are equals() and hashCode() important?",
          answer:
            "They define object equality and hashing behavior. Hash-based collections use both methods to locate and compare elements."
        },
        {
          question: "What is the contract between equals() and hashCode()?",
          answer:
            "If two objects are equal according to equals(), they must return the same hash code."
        },
        {
          question: "Can two unequal objects have the same hash code?",
          answer:
            "Yes. This is called a hash collision."
        },
        {
          question: "What happens if equals() is overridden but hashCode() is not?",
          answer:
            "Hash-based collections can behave incorrectly because logically equal objects may produce different hash codes."
        },
        {
          question: "What is Comparable?",
          answer:
            "Comparable is an interface used by a class to define its natural ordering through the compareTo() method."
        },
        {
          question: "What is Comparator?",
          answer:
            "Comparator is an interface used to define external or custom ordering, allowing multiple sorting strategies for the same class."
        },
        {
          question: "What is the difference between Comparable and Comparator?",
          answer:
            "Comparable defines natural ordering inside the class using compareTo(), while Comparator defines custom ordering separately using compare()."
        },
        {
          question: "What does compareTo() return?",
          answer:
            "A negative value means the current object comes before the other object, zero means equal ordering, and a positive value means it comes after."
        },
        {
          question: "Why should Integer.compare() be preferred over subtraction in compareTo()?",
          answer:
            "Subtraction can overflow for extreme integer values. Integer.compare() avoids that problem and expresses the comparison more clearly."
        },
        {
          question: "What is Big-O notation?",
          answer:
            "Big-O describes how the time or space requirements of an operation grow as the input size increases."
        },
        {
          question: "What is the average lookup complexity of HashMap?",
          answer:
            "HashMap provides average O(1) lookup under normal hashing assumptions, although worst-case behavior can differ."
        },
        {
          question: "Why does ArrayList provide O(1) indexed access?",
          answer:
            "ArrayList is backed by an array, so an element at an index can be accessed directly."
        },
        {
          question: "Why is LinkedList indexed access O(n)?",
          answer:
            "A linked list generally has to traverse nodes from one end until it reaches the requested index."
        }
      ]
    }
  ]
};