export const setInterface = {
  id: "set-interface",
  slug: "set-interface",

  title: "Set Interface in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the Set interface in Java, its characteristics, duplicate handling, ordering behavior, common methods, and major Set implementations.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-set",

      title: "1. What is Set Interface?",

      paragraphs: [
        "Set is an interface in the Java Collections Framework that represents a collection of unique elements.",

        "Unlike List, a Set does not allow duplicate elements.",

        "Set extends the Collection interface and is commonly used when duplicate values should not be stored."
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

    {
      id: "set-characteristics",

      title: "2. Characteristics of Set",

      paragraphs: [
        "The Set interface has several important characteristics that distinguish it from List."
      ],

      bullets: [
        "Set does not allow duplicate elements.",
        "Set extends the Collection interface.",
        "Set does not provide index-based access.",
        "Ordering depends on the Set implementation.",
        "HashSet does not guarantee insertion order.",
        "LinkedHashSet maintains insertion order.",
        "TreeSet maintains elements according to their sorted ordering.",
        "Set can contain null depending on the implementation."
      ]
    },

    {
      id: "set-hierarchy",

      title: "3. Set Interface Hierarchy",

      paragraphs: [
        "Set is a child interface of Collection.",

        "Java provides several important implementations of Set, including HashSet, LinkedHashSet, and TreeSet.",

        "Each implementation provides different ordering and performance characteristics."
      ],

      bullets: [
        "Set extends Collection.",
        "HashSet implements Set.",
        "LinkedHashSet extends HashSet and maintains insertion order.",
        "TreeSet implements NavigableSet and maintains sorted order."
      ]
    },

    {
      id: "adding-elements",

      title: "4. Adding Elements to Set",

      paragraphs: [
        "The add() method is used to add elements to a Set.",

        "If an element already exists, adding the same element again does not create another copy."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> names = new HashSet<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Ravi");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Kiran]`
    },

    {
      id: "duplicate-elements",

      title: "5. How Set Handles Duplicate Elements",

      paragraphs: [
        "A Set uses its equality rules to determine whether an element is already present.",

        "For objects, equals() and hashCode() are important for hash-based Sets such as HashSet.",

        "When an equivalent element is already present, the Set does not add another duplicate."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers = new HashSet<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "contains",

      title: "6. contains() Method",

      paragraphs: [
        "The contains() method checks whether a particular element exists in the Set.",

        "It returns true when the element is present and false when it is not present."
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
        languages.add("Spring Boot");

        System.out.println(languages.contains("Java"));
        System.out.println(languages.contains("C++"));
    }
}`
      },

      output: `true
false`
    },

    {
      id: "remove",

      title: "7. remove() Method",

      paragraphs: [
        "The remove() method removes a specified element from the Set.",

        "If the element does not exist, the Set remains unchanged."
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
        languages.add("Spring");

        languages.remove("Python");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Spring]`
    },

    {
      id: "size-empty",

      title: "8. size() and isEmpty()",

      paragraphs: [
        "The size() method returns the number of unique elements stored in the Set.",

        "The isEmpty() method checks whether the Set contains no elements."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers = new HashSet<>();

        System.out.println(numbers.size());
        System.out.println(numbers.isEmpty());

        numbers.add(10);
        numbers.add(20);
        numbers.add(10);

        System.out.println(numbers.size());
        System.out.println(numbers.isEmpty());
    }
}`
      },

      output: `0
true
2
false`
    },

    {
      id: "clear",

      title: "9. clear() Method",

      paragraphs: [
        "The clear() method removes all elements from the Set."
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
        languages.add("Spring");

        System.out.println(languages);

        languages.clear();

        System.out.println(languages);
        System.out.println(languages.isEmpty());
    }
}`
      },

      output: `[Java, Spring, Python]
[]
true`
    },

    {
      id: "set-iteration",

      title: "10. Iterating Through a Set",

      paragraphs: [
        "A Set can be traversed using an enhanced for loop or an Iterator.",

        "Because Set does not provide index-based access, methods such as get(index) are not available."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> languages = new HashSet<>();

        languages.add("Java");
        languages.add("Spring");
        languages.add("Hibernate");

        for (String language : languages) {
            System.out.println(language);
        }
    }
}`
      },

      output: `Java
Spring
Hibernate`
    },

    {
      id: "set-no-index",

      title: "11. Why Set Does Not Have Index-Based Access",

      paragraphs: [
        "A Set is designed around uniqueness rather than positional access.",

        "Because the Set interface does not define a positional ordering contract, it does not provide methods such as get(index) or set(index, element).",

        "If an application requires index-based access, a List is usually more appropriate."
      ],

      code: {
        language: "java",
        code: `Set<String> languages = new HashSet<>();

languages.add("Java");
languages.add("Python");

// This is not valid:
// languages.get(0);`
      }
    },

    {
      id: "set-add-all",

      title: "12. addAll() Method",

      paragraphs: [
        "The addAll() method adds elements from another collection.",

        "Duplicate elements are still ignored because the target collection is a Set."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> first = new HashSet<>();

        first.add("Java");
        first.add("Spring");

        Set<String> second = new HashSet<>();

        second.add("Spring");
        second.add("Docker");

        first.addAll(second);

        System.out.println(first);
    }
}`
      },

      output: `[Java, Spring, Docker]`
    },

    {
      id: "set-operations",

      title: "13. Set Operations",

      paragraphs: [
        "Set collections can be used to perform common mathematical set operations such as union, intersection, and difference.",

        "These operations can be implemented using methods such as addAll(), retainAll(), and removeAll()."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> first = new HashSet<>();

        first.add(1);
        first.add(2);
        first.add(3);

        Set<Integer> second = new HashSet<>();

        second.add(2);
        second.add(3);
        second.add(4);

        Set<Integer> union = new HashSet<>(first);
        union.addAll(second);

        Set<Integer> intersection = new HashSet<>(first);
        intersection.retainAll(second);

        Set<Integer> difference = new HashSet<>(first);
        difference.removeAll(second);

        System.out.println("Union: " + union);
        System.out.println("Intersection: " + intersection);
        System.out.println("Difference: " + difference);
    }
}`
      },

      output: `Union: [1, 2, 3, 4]
Intersection: [2, 3]
Difference: [1]`
    },

    {
      id: "retain-all",

      title: "14. retainAll() Method",

      paragraphs: [
        "The retainAll() method keeps only the elements that are also present in another collection.",

        "It is useful for finding the intersection between two collections."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers = new HashSet<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Set<Integer> common = new HashSet<>();

        common.add(20);
        common.add(40);
        common.add(50);

        numbers.retainAll(common);

        System.out.println(numbers);
    }
}`
      },

      output: `[20, 40]`
    },

    {
      id: "remove-all",

      title: "15. removeAll() Method",

      paragraphs: [
        "The removeAll() method removes from the Set all elements that are also present in another collection.",

        "It can be used to calculate the difference between two Sets."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers = new HashSet<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Set<Integer> remove = new HashSet<>();

        remove.add(20);
        remove.add(40);

        numbers.removeAll(remove);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "set-implementations",

      title: "16. Major Set Implementations",

      paragraphs: [
        "Java provides several Set implementations. The most commonly used are HashSet, LinkedHashSet, and TreeSet."
      ],

      bullets: [
        "HashSet - stores unique elements and does not guarantee insertion order.",
        "LinkedHashSet - stores unique elements and maintains insertion order.",
        "TreeSet - stores unique elements and maintains sorted order."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        Set<Integer> hashSet = new HashSet<>();

        Set<Integer> linkedHashSet = new LinkedHashSet<>();

        Set<Integer> treeSet = new TreeSet<>();

        hashSet.add(30);
        hashSet.add(10);
        hashSet.add(20);

        linkedHashSet.add(30);
        linkedHashSet.add(10);
        linkedHashSet.add(20);

        treeSet.add(30);
        treeSet.add(10);
        treeSet.add(20);

        System.out.println("HashSet: " + hashSet);
        System.out.println("LinkedHashSet: " + linkedHashSet);
        System.out.println("TreeSet: " + treeSet);
    }
}`
      },

      output: `HashSet: [10, 20, 30]
LinkedHashSet: [30, 10, 20]
TreeSet: [10, 20, 30]`
    },

    {
      id: "hashset-vs-linkedhashset-vs-treeset",

      title: "17. HashSet vs LinkedHashSet vs TreeSet",

      paragraphs: [
        "The three commonly used Set implementations differ mainly in their ordering behavior and implementation characteristics."
      ],

      bullets: [
        "HashSet does not guarantee insertion order.",
        "LinkedHashSet maintains insertion order.",
        "TreeSet maintains sorted order.",
        "HashSet is commonly used when uniqueness is required without a need for ordering.",
        "LinkedHashSet is useful when uniqueness and insertion order are both required.",
        "TreeSet is useful when unique elements must be maintained in sorted order."
      ]
    },

    {
      id: "null-values",

      title: "18. Null Values in Set",

      paragraphs: [
        "The behavior of null elements depends on the Set implementation.",

        "HashSet allows a single null element.",

        "LinkedHashSet also allows a single null element.",

        "TreeSet generally does not support null when natural ordering is used because the elements need to be compared."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> values = new HashSet<>();

        values.add(null);
        values.add("Java");
        values.add(null);

        System.out.println(values);
    }
}`
      },

      output: `[null, Java]`
    },

    {
      id: "set-vs-list",

      title: "19. Set vs List",

      paragraphs: [
        "List and Set are both Collection interfaces, but they are designed for different use cases."
      ],

      bullets: [
        "List allows duplicate elements.",
        "Set does not allow duplicate elements.",
        "List supports index-based access.",
        "Set does not provide index-based access.",
        "List generally preserves insertion order.",
        "Set ordering depends on its implementation.",
        "Use List when positional access or duplicates are required.",
        "Use Set when uniqueness is the primary requirement."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();

        list.add("Java");
        list.add("Java");

        Set<String> set = new HashSet<>();

        set.add("Java");
        set.add("Java");

        System.out.println("List: " + list);
        System.out.println("Set: " + set);
    }
}`
      },

      output: `List: [Java, Java]
Set: [Java]`
    },

    {
      id: "important-points",

      title: "20. Important Points",

      bullets: [
        "Set is an interface in java.util.",
        "Set extends Collection.",
        "Set is designed to store unique elements.",
        "Set does not provide index-based access.",
        "HashSet does not guarantee insertion order.",
        "LinkedHashSet maintains insertion order.",
        "TreeSet maintains sorted order.",
        "HashSet and LinkedHashSet can contain a single null element.",
        "TreeSet generally does not support null with natural ordering.",
        "Set supports operations such as addAll(), retainAll(), and removeAll().",
        "equals() and hashCode() are important when storing objects in hash-based Sets."
      ]
    },

    {
      id: "interview-questions",

      title: "21. Interview Questions",

      interviewQuestions: [
        {
          question: "What is Set in Java?",
          answer:
            "Set is an interface in the Java Collections Framework that represents a collection of unique elements."
        },
        {
          question: "Does Set allow duplicate elements?",
          answer:
            "No. A Set is designed to prevent duplicate elements."
        },
        {
          question: "Does Set maintain insertion order?",
          answer:
            "It depends on the implementation. HashSet does not guarantee insertion order, LinkedHashSet maintains insertion order, and TreeSet maintains sorted order."
        },
        {
          question: "Why does Set not have get(index)?",
          answer:
            "Set is designed around uniqueness rather than positional access, so the Set interface does not define index-based methods."
        },
        {
          question: "What are the commonly used Set implementations?",
          answer:
            "HashSet, LinkedHashSet, and TreeSet are the commonly used implementations."
        },
        {
          question: "What is the difference between HashSet and LinkedHashSet?",
          answer:
            "Both store unique elements, but LinkedHashSet maintains insertion order while HashSet does not guarantee insertion order."
        },
        {
          question: "What is the difference between HashSet and TreeSet?",
          answer:
            "HashSet does not guarantee ordering, while TreeSet maintains elements according to sorted ordering."
        },
        {
          question: "What is the difference between LinkedHashSet and TreeSet?",
          answer:
            "LinkedHashSet maintains insertion order, while TreeSet maintains sorted order."
        },
        {
          question: "Can HashSet contain null?",
          answer:
            "Yes. HashSet permits a single null element."
        },
        {
          question: "How does HashSet identify duplicates?",
          answer:
            "HashSet uses hashing and equality checks. For objects, correctly implementing equals() and hashCode() is important."
        },
        {
          question: "What is retainAll() used for?",
          answer:
            "retainAll() keeps only the elements that are also present in another collection. It can be used to find the intersection of Sets."
        },
        {
          question: "What is removeAll() used for?",
          answer:
            "removeAll() removes elements that are also present in another collection and can be used to calculate a difference between Sets."
        },
        {
          question: "When should you use Set instead of List?",
          answer:
            "Use Set when uniqueness is the primary requirement and duplicate elements should not be stored."
        }
      ]
    }
  ]
};