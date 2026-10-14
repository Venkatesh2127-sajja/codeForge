export const collectionsUtilityClass = {
  id: "collections-utility-class",
  slug: "collections-utility-class",

  title: "Collections Utility Class in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Learn how the java.util.Collections utility class provides ready-made methods for sorting, searching, reversing, shuffling, swapping, rotating, and working with collections.",

  estimatedTime: "35 min",

  sections: [
    {
      id: "what-is-collections-class",
      title: "1. What is the Collections Utility Class?",

      paragraphs: [
        "Collections is a utility class available in the java.util package.",
        "It provides static methods that operate on or return collections.",
        "The Collections class is different from the Collection interface. Collection represents a group of objects, while Collections provides utility operations for working with collections."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        Collections.sort(numbers);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "collections-vs-collection",
      title: "2. Collection vs Collections",

      paragraphs: [
        "Collection is an interface in the Java Collections Framework.",
        "Collections is a utility class containing static methods for performing common operations on collections."
      ],

      bullets: [
        "Collection is an interface.",
        "Collections is a utility class.",
        "Collection represents a group of objects.",
        "Collections provides helper methods for collection operations.",
        "Collection belongs to java.util.",
        "Collections also belongs to java.util."
      ],

      code: {
        language: "java",
        code: `import java.util.Collection;
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Collection<Integer> numbers =
                new ArrayList<>();

        List<Integer> list =
                new ArrayList<>();

        Collections.sort(list);
    }
}`
      }
    },

    {
      id: "sort",
      title: "3. Collections.sort()",

      paragraphs: [
        "Collections.sort() sorts the elements of a List in ascending order according to their natural ordering.",
        "For custom objects, a Comparator can be supplied to define the ordering."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(50);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        Collections.sort(numbers);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30, 50]`
    },

    {
      id: "sort-comparator",
      title: "4. Sorting Using Comparator",

      paragraphs: [
        "Collections.sort() can also receive a Comparator.",
        "This allows us to define custom ordering instead of relying on natural ordering."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(40);
        numbers.add(20);
        numbers.add(30);

        Collections.sort(
                numbers,
                Comparator.reverseOrder()
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[40, 30, 20, 10]`
    },

    {
      id: "reverse",
      title: "5. Collections.reverse()",

      paragraphs: [
        "Collections.reverse() reverses the order of elements in a List.",
        "It changes the existing list rather than creating a new list."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        Collections.reverse(names);

        System.out.println(names);
    }
}`
      },

      output: `[Arun, Kiran, Ravi]`
    },

    {
      id: "shuffle",
      title: "6. Collections.shuffle()",

      paragraphs: [
        "Collections.shuffle() randomly reorders the elements of a List.",
        "It is useful when a collection needs to be randomized, such as when creating randomized practice questions."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        numbers.add(4);
        numbers.add(5);

        Collections.shuffle(numbers);

        System.out.println(numbers);
    }
}`
      },

      output: `Example output:
[3, 1, 5, 2, 4]

Note: The order can be different each time.`
    },

    {
      id: "swap",
      title: "7. Collections.swap()",

      paragraphs: [
        "Collections.swap() exchanges two elements at specified indexes in a List.",
        "The first argument is the list, followed by the two indexes that should be swapped."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        Collections.swap(names, 0, 2);

        System.out.println(names);
    }
}`
      },

      output: `[Arun, Kiran, Ravi]`
    },

    {
      id: "rotate",
      title: "8. Collections.rotate()",

      paragraphs: [
        "Collections.rotate() shifts the elements of a List by a specified distance.",
        "A positive distance rotates elements toward the end of the list."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Collections.rotate(numbers, 1);

        System.out.println(numbers);
    }
}`
      },

      output: `[40, 10, 20, 30]`
    },

    {
      id: "min-max",
      title: "9. Collections.min() and Collections.max()",

      paragraphs: [
        "Collections.min() returns the minimum element according to natural ordering.",
        "Collections.max() returns the maximum element according to natural ordering."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(50);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        System.out.println(
                Collections.min(numbers)
        );

        System.out.println(
                Collections.max(numbers)
        );
    }
}`
      },

      output: `10
50`
    },

    {
      id: "frequency",
      title: "10. Collections.frequency()",

      paragraphs: [
        "Collections.frequency() counts how many times a particular element occurs in a collection.",
        "It is useful when we need to determine the number of occurrences of a value."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Java");
        names.add("Spring");
        names.add("Java");
        names.add("React");
        names.add("Java");

        int count =
                Collections.frequency(
                        names,
                        "Java"
                );

        System.out.println(count);
    }
}`
      },

      output: `3`
    },

    {
      id: "binary-search",
      title: "11. Collections.binarySearch()",

      paragraphs: [
        "Collections.binarySearch() searches for an element in a sorted List.",
        "The list must be sorted according to the same ordering used by the search.",
        "If the element is found, the method returns its index. Otherwise, it returns a negative value."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        int index =
                Collections.binarySearch(
                        numbers,
                        30
                );

        System.out.println(index);
    }
}`
      },

      output: `2`
    },

    {
      id: "fill",
      title: "12. Collections.fill()",

      paragraphs: [
        "Collections.fill() replaces every element in a List with the specified value."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> values =
                new ArrayList<>();

        values.add("A");
        values.add("B");
        values.add("C");

        Collections.fill(values, "Java");

        System.out.println(values);
    }
}`
      },

      output: `[Java, Java, Java]`
    },

    {
      id: "copy",
      title: "13. Collections.copy()",

      paragraphs: [
        "Collections.copy() copies elements from a source List into a destination List.",
        "The destination list must have enough elements to contain all elements being copied."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> source =
                List.of("Java", "Spring", "React");

        List<String> destination =
                new ArrayList<>(
                        List.of("", "", "")
                );

        Collections.copy(
                destination,
                source
        );

        System.out.println(destination);
    }
}`
      },

      output: `[Java, Spring, React]`
    },

    {
      id: "replace-all",
      title: "14. Collections.replaceAll()",

      paragraphs: [
        "Collections.replaceAll() replaces every occurrence of one value with another value in a List."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> technologies =
                new ArrayList<>();

        technologies.add("Java");
        technologies.add("Python");
        technologies.add("Java");
        technologies.add("React");

        Collections.replaceAll(
                technologies,
                "Java",
                "Spring"
        );

        System.out.println(technologies);
    }
}`
      },

      output: `[Spring, Python, Spring, React]`
    },

    {
      id: "disjoint",
      title: "15. Collections.disjoint()",

      paragraphs: [
        "Collections.disjoint() checks whether two collections have no elements in common.",
        "It returns true when the collections have no common elements and false when at least one common element exists."
      ],

      code: {
        language: "java",
        code: `import java.util.List;
import java.util.Collections;

public class Main {

    public static void main(String[] args) {

        List<Integer> first =
                List.of(1, 2, 3);

        List<Integer> second =
                List.of(4, 5, 6);

        List<Integer> third =
                List.of(3, 4, 5);

        System.out.println(
                Collections.disjoint(first, second)
        );

        System.out.println(
                Collections.disjoint(first, third)
        );
    }
}`
      },

      output: `true
false`
    },

    {
      id: "frequency-practical",
      title: "16. Practical Example - Counting Duplicate Values",

      paragraphs: [
        "Collections.frequency() can be useful in simple data-processing tasks.",
        "For example, we can count how many times a particular status occurs in a list."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> statuses =
                new ArrayList<>();

        statuses.add("SUCCESS");
        statuses.add("FAILED");
        statuses.add("SUCCESS");
        statuses.add("SUCCESS");
        statuses.add("FAILED");

        int successCount =
                Collections.frequency(
                        statuses,
                        "SUCCESS"
                );

        int failedCount =
                Collections.frequency(
                        statuses,
                        "FAILED"
                );

        System.out.println(
                "SUCCESS = " + successCount
        );

        System.out.println(
                "FAILED = " + failedCount
        );
    }
}`
      },

      output: `SUCCESS = 3
FAILED = 2`
    },

    {
      id: "unmodifiable",
      title: "17. Creating Unmodifiable Collections",

      paragraphs: [
        "The Collections utility class also provides methods such as unmodifiableList(), unmodifiableSet(), and unmodifiableMap().",
        "These methods create an unmodifiable view of an existing collection.",
        "Attempting to modify the returned collection through that view results in UnsupportedOperationException."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        List<String> readOnly =
                Collections.unmodifiableList(
                        names
                );

        System.out.println(readOnly);

        // readOnly.add("Arun");
        // Throws UnsupportedOperationException
    }
}`
      },

      output: `[Ravi, Kiran]`
    },

    {
      id: "important-points",
      title: "18. Important Points",

      bullets: [
        "Collections is a utility class in java.util.",
        "Its commonly used methods are static.",
        "Collections is different from the Collection interface.",
        "Collections.sort() sorts a List.",
        "Collections.reverse() reverses a List.",
        "Collections.shuffle() randomly reorders a List.",
        "Collections.swap() exchanges elements at two indexes.",
        "Collections.rotate() rotates elements in a List.",
        "Collections.min() finds the minimum element.",
        "Collections.max() finds the maximum element.",
        "Collections.frequency() counts occurrences of an element.",
        "Collections.binarySearch() searches a sorted List.",
        "Collections.fill() replaces every element with a specified value.",
        "Collections.copy() copies elements from one List to another.",
        "Collections.replaceAll() replaces matching elements.",
        "Collections.disjoint() checks whether two collections have no common elements.",
        "Collections.unmodifiableList() creates an unmodifiable view of a List."
      ]
    },

    {
      id: "interview-questions",
      title: "19. Interview Questions",

      interviewQuestions: [
        {
          question: "What is the Collections class in Java?",
          answer:
            "Collections is a utility class in java.util that provides static methods for performing common operations on collections."
        },
        {
          question: "What is the difference between Collection and Collections?",
          answer:
            "Collection is an interface representing a group of objects, while Collections is a utility class containing static helper methods for working with collections."
        },
        {
          question: "What does Collections.sort() do?",
          answer:
            "It sorts a List according to natural ordering or according to a supplied Comparator."
        },
        {
          question: "What is the difference between Collections.sort() and List.sort()?",
          answer:
            "Both can sort a List. List.sort() is an instance method introduced in Java 8, while Collections.sort() is a static utility method."
        },
        {
          question: "What does Collections.reverse() do?",
          answer:
            "It reverses the order of elements in a List."
        },
        {
          question: "What does Collections.shuffle() do?",
          answer:
            "It randomly reorders the elements of a List."
        },
        {
          question: "What does Collections.binarySearch() require?",
          answer:
            "The List should be sorted according to the same ordering used for the search."
        },
        {
          question: "What does Collections.frequency() return?",
          answer:
            "It returns the number of occurrences of a specified element in a collection."
        },
        {
          question: "What does Collections.min() return?",
          answer:
            "It returns the minimum element according to the collection's natural ordering or the supplied Comparator."
        },
        {
          question: "What does Collections.max() return?",
          answer:
            "It returns the maximum element according to the collection's natural ordering or the supplied Comparator."
        },
        {
          question: "What does Collections.copy() do?",
          answer:
            "It copies elements from a source List into a destination List. The destination must have sufficient size."
        },
        {
          question: "What does Collections.fill() do?",
          answer:
            "It replaces every element in a List with the specified value."
        },
        {
          question: "What does Collections.disjoint() check?",
          answer:
            "It checks whether two collections have no elements in common."
        },
        {
          question: "What is Collections.unmodifiableList()?",
          answer:
            "It returns an unmodifiable view of a List. Modification attempts through that view throw UnsupportedOperationException."
        },
        {
          question: "Are Collections utility methods static?",
          answer:
            "Yes. The commonly used utility methods of the Collections class are static and are called using the class name."
        }
      ]
    }
  ]
};