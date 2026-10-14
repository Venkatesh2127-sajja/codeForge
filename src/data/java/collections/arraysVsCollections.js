export const arraysVsCollections = {
  id: "arrays-vs-collections",
  slug: "arrays-vs-collections",

  title: "Arrays vs Collections in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the differences between Java arrays and collections, including size, type safety, performance, primitive support, flexibility, and when to use each.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-array",
      title: "1. What is an Array?",

      paragraphs: [
        "An array is a fixed-size data structure used to store multiple values of the same type.",
        "The size of an array is determined when the array is created and cannot be changed afterward.",
        "Arrays can store primitive values as well as object references."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int[] numbers = new int[3];

        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;

        System.out.println(numbers[0]);
        System.out.println(numbers[1]);
        System.out.println(numbers[2]);
    }
}`
      },

      output: `10
20
30`
    },

    {
      id: "what-is-collection",
      title: "2. What are Collections?",

      paragraphs: [
        "Collections are objects provided by the Java Collections Framework that are designed to store and manipulate groups of objects.",
        "Common collection interfaces include List, Set, Queue, and Map.",
        "Unlike arrays, many collection implementations can grow or shrink dynamically."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30, 40]`
    },

    {
      id: "size-difference",
      title: "3. Fixed Size vs Dynamic Size",

      paragraphs: [
        "The biggest basic difference is that arrays have a fixed length, while collection implementations such as ArrayList can dynamically grow as elements are added.",
        "An array's length is available through the length field.",
        "A collection such as ArrayList provides size() to determine the number of elements currently stored."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int[] array = new int[3];

        List<Integer> list =
                new ArrayList<>();

        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);

        System.out.println(array.length);
        System.out.println(list.size());
    }
}`
      },

      output: `3
4`
    },

    {
      id: "add-remove",
      title: "4. Adding and Removing Elements",

      paragraphs: [
        "Arrays do not provide add() and remove() methods because their size is fixed.",
        "Collections such as ArrayList provide methods such as add() and remove() for modifying their contents."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Arun");

        names.remove("Kiran");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Arun]`
    },

    {
      id: "primitive-support",
      title: "5. Primitive Types and Collections",

      paragraphs: [
        "Arrays can directly store primitive values such as int, double, char, and boolean.",
        "Collections store objects rather than primitive types.",
        "Wrapper classes such as Integer, Double, Character, and Boolean are used when primitive values need to be stored in collections.",
        "Java's autoboxing and unboxing make conversions between primitives and their wrapper types convenient."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int[] numbers = {
                10, 20, 30
        };

        List<Integer> values =
                new ArrayList<>();

        values.add(10);
        values.add(20);
        values.add(30);

        System.out.println(numbers[0]);
        System.out.println(values.get(0));
    }
}`
      },

      output: `10
10`
    },

    {
      id: "type-safety",
      title: "6. Type Safety",

      paragraphs: [
        "Both arrays and generic collections can provide compile-time type checking.",
        "An array declared as String[] accepts only String references.",
        "A List<String> similarly restricts the list to String elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        String[] names = {
                "Ravi",
                "Kiran"
        };

        List<String> students =
                new ArrayList<>();

        students.add("Arun");
        students.add("Venkatesh");

        System.out.println(names[0]);
        System.out.println(students.get(0));
    }
}`
      },

      output: `Ravi
Arun`
    },

    {
      id: "array-methods",
      title: "7. Array Operations",

      paragraphs: [
        "Arrays provide direct index-based access using the [] operator.",
        "The java.util.Arrays utility class provides additional operations such as sorting, searching, copying, and converting arrays to strings."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        int[] numbers = {
                30, 10, 20
        };

        Arrays.sort(numbers);

        System.out.println(
                Arrays.toString(numbers)
        );
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "collection-methods",
      title: "8. Collection Operations",

      paragraphs: [
        "Collections provide methods for adding, removing, searching, and manipulating elements.",
        "The exact operations available depend on the collection interface and implementation being used."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        System.out.println(
                numbers.contains(20)
        );

        numbers.remove(Integer.valueOf(20));

        System.out.println(numbers);
    }
}`
      },

      output: `true
[10, 30]`
    },

    {
      id: "performance",
      title: "9. Basic Performance Considerations",

      paragraphs: [
        "Array access by index is direct and generally has constant-time access.",
        "ArrayList also provides constant-time positional access in typical implementations because it is backed by an array.",
        "Performance depends on the operation and the specific collection implementation being used.",
        "For example, inserting or removing elements from the middle of an ArrayList can require shifting elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int[] array = {
                10, 20, 30
        };

        List<Integer> list =
                new ArrayList<>();

        list.add(10);
        list.add(20);
        list.add(30);

        System.out.println(array[1]);
        System.out.println(list.get(1));
    }
}`
      },

      output: `20
20`
    },

    {
      id: "array-vs-list",
      title: "10. Array vs ArrayList",

      paragraphs: [
        "Array and ArrayList are both commonly used when indexed access is required, but they have different characteristics.",
        "Arrays have a fixed length and can store primitive values directly.",
        "ArrayList can grow dynamically and provides collection-oriented methods."
      ],

      bullets: [
        "Array has a fixed length.",
        "ArrayList has a dynamic size.",
        "Array supports primitive values directly.",
        "ArrayList stores objects and uses wrapper types for primitives.",
        "Array uses [] for index access.",
        "ArrayList uses get() and set().",
        "Array has the length field.",
        "ArrayList has size().",
        "ArrayList provides add() and remove()."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int[] array = {
                10, 20, 30
        };

        List<Integer> list =
                new ArrayList<>();

        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);

        System.out.println(array[1]);
        System.out.println(list.get(1));
    }
}`
      },

      output: `20
20`
    },

    {
      id: "array-when-to-use",
      title: "11. When Should You Use an Array?",

      paragraphs: [
        "Arrays are useful when the number of elements is known and a fixed-size structure is appropriate.",
        "They are also useful when working directly with primitive values or APIs that require arrays."
      ],

      bullets: [
        "The size is known and fixed.",
        "Direct indexed access is required.",
        "Primitive storage is useful.",
        "Low-level or API interoperability requires an array.",
        "A simple fixed-size data structure is sufficient."
      ]
    },

    {
      id: "collection-when-to-use",
      title: "12. When Should You Use Collections?",

      paragraphs: [
        "Collections are generally useful when the size or structure of the data may change or when collection-specific operations are needed.",
        "Different collection implementations can be selected based on requirements such as ordering, uniqueness, queue behavior, or key-value storage."
      ],

      bullets: [
        "The number of elements changes dynamically.",
        "Elements need to be added or removed frequently.",
        "You need List, Set, Queue, or Map behavior.",
        "You need collection utility methods.",
        "You need different data-structure implementations."
      ]
    },

    {
      id: "arrays-collections-conversion",
      title: "13. Converting Between Arrays and Collections",

      paragraphs: [
        "Java applications sometimes need to convert between arrays and collections.",
        "Arrays.asList() can create a fixed-size List backed by an array for reference-type arrays.",
        "List.toArray() can convert a collection into an array."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        String[] names = {
                "Ravi",
                "Kiran",
                "Arun"
        };

        List<String> list =
                new ArrayList<>(
                        Arrays.asList(names)
                );

        list.add("Venkatesh");

        String[] result =
                list.toArray(new String[0]);

        System.out.println(list);
        System.out.println(
                Arrays.toString(result)
        );
    }
}`
      },

      output: `[Ravi, Kiran, Arun, Venkatesh]
[Ravi, Kiran, Arun, Venkatesh]`
    },

    {
      id: "important-difference-table",
      title: "14. Arrays vs Collections - Quick Comparison",

      bullets: [
        "Size: Array is fixed; collections can generally grow or shrink depending on implementation.",
        "Primitive values: Arrays can store primitives directly; collections store objects.",
        "Access: Arrays use [] indexing; List implementations provide methods such as get().",
        "Modification: Arrays do not provide add/remove operations; many collections do.",
        "Data structures: Arrays represent a fixed indexed sequence; the Collections Framework provides multiple data structures.",
        "Utilities: Arrays can be manipulated with java.util.Arrays; collections can be manipulated with java.util.Collections and collection-specific methods.",
        "Memory and performance: The appropriate choice depends on the data type, operation, implementation, and application requirements.",
        "Flexibility: Collections generally provide more built-in functionality for dynamic data management."
      ]
    },

    {
      id: "practical-example",
      title: "15. Practical Example - Student Marks",

      paragraphs: [
        "Suppose an application always stores marks for exactly five subjects. An array can represent this fixed-size data naturally.",
        "If the application instead needs to add or remove students dynamically, a collection such as ArrayList is more suitable for the student list."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int[] marks = {
                80, 75, 90, 85, 88
        };

        List<String> students =
                new ArrayList<>();

        students.add("Ravi");
        students.add("Kiran");
        students.add("Arun");

        students.add("Venkatesh");

        System.out.println(marks.length);
        System.out.println(students);
    }
}`
      },

      output: `5
[Ravi, Kiran, Arun, Venkatesh]`
    },

    {
      id: "important-points",
      title: "16. Important Points",

      bullets: [
        "An array is a fixed-size data structure.",
        "Collections are part of the Java Collections Framework.",
        "Arrays can store primitive values directly.",
        "Collections store objects, so wrapper types are used for primitive values.",
        "Array uses length.",
        "Collection implementations such as ArrayList use size().",
        "Array uses [] for indexed access.",
        "List implementations provide methods such as get() and set().",
        "ArrayList can dynamically grow and shrink.",
        "Arrays are useful for fixed-size data.",
        "Collections are useful for dynamic and richer data structures.",
        "The correct choice depends on the application's requirements.",
        "Performance should be evaluated based on the specific operation and data structure."
      ]
    },

    {
      id: "interview-questions",
      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is the main difference between an array and a collection?",
          answer:
            "An array has a fixed length, while collection implementations such as ArrayList can dynamically change their size."
        },
        {
          question: "Can arrays store primitive data types?",
          answer:
            "Yes. Arrays can directly store primitive values such as int, double, char, and boolean."
        },
        {
          question: "Can collections store primitive data types directly?",
          answer:
            "No. Collections store objects. Wrapper classes such as Integer and Double are used, with autoboxing and unboxing making the conversion convenient."
        },
        {
          question: "What is the difference between array.length and collection.size()?",
          answer:
            "length is a field of an array representing its fixed length, while size() is a method that returns the current number of elements in a collection."
        },
        {
          question: "Why is ArrayList more flexible than an array?",
          answer:
            "ArrayList can dynamically grow and provides methods such as add(), remove(), contains(), and size()."
        },
        {
          question: "Which provides direct index access: Array or ArrayList?",
          answer:
            "Both support indexed access. Arrays use the [] operator, while ArrayList provides get(index)."
        },
        {
          question: "Can the size of an array be changed after creation?",
          answer:
            "No. An array's length is fixed after the array is created."
        },
        {
          question: "Can ArrayList store primitive int values?",
          answer:
            "ArrayList<Integer> can store integer values using Integer objects. Java autoboxing automatically converts int values to Integer objects when needed."
        },
        {
          question: "When would you choose an array?",
          answer:
            "An array is appropriate when the size is fixed, direct indexed access is required, or primitive storage is useful."
        },
        {
          question: "When would you choose a collection?",
          answer:
            "A collection is appropriate when data needs dynamic sizing, collection-specific operations, or a particular data structure such as List, Set, Queue, or Map."
        },
        {
          question: "What is the difference between Array and ArrayList?",
          answer:
            "Array has fixed size and can directly store primitives. ArrayList is a dynamic collection of objects and provides methods for adding, removing, and managing elements."
        },
        {
          question: "How can an array be converted to a List?",
          answer:
            "For reference-type arrays, Arrays.asList() can create a fixed-size List view. If a dynamically resizable List is required, it can be passed to an ArrayList constructor."
        },
        {
          question: "How can a List be converted to an array?",
          answer:
            "List.toArray() can be used to convert a List into an array."
        }
      ]
    }
  ]
};