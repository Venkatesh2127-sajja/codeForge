export const listInterface = {
  id: "list-interface",
  slug: "list-interface",

  title: "List Interface in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the List interface in Java, its characteristics, commonly used methods, indexing, duplicates, and the major List implementations.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-list",

      title: "1. What is List Interface?",

      paragraphs: [
        "List is an interface in the Java Collections Framework that represents an ordered collection of elements.",

        "Unlike Set, a List can contain duplicate elements.",

        "List elements can be accessed using their index, which starts from 0.",

        "Common implementations of List include ArrayList, LinkedList, Vector, and Stack."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Python, JavaScript]`
    },

    {
      id: "list-characteristics",

      title: "2. Characteristics of List",

      paragraphs: [
        "The List interface provides several important characteristics that make it different from other collection types."
      ],

      bullets: [
        "List maintains the order in which elements are inserted.",
        "List allows duplicate elements.",
        "List allows null elements, depending on the implementation.",
        "List provides index-based access.",
        "The first element has index 0.",
        "List supports adding elements at a specific position.",
        "List supports removing elements using an index.",
        "List supports searching for elements."
      ]
    },

    {
      id: "list-index",

      title: "3. Index-Based Access",

      paragraphs: [
        "One of the important features of List is index-based access.",

        "Each element in a List has a position called an index.",

        "The index starts at 0, so the first element is at index 0, the second element is at index 1, and so on."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        System.out.println(languages.get(0));
        System.out.println(languages.get(1));
        System.out.println(languages.get(2));
    }
}`
      },

      output: `Java
Python
JavaScript`
    },

    {
      id: "add-elements",

      title: "4. Adding Elements to a List",

      paragraphs: [
        "The add() method is used to add an element to a List.",

        "We can also use the overloaded add(index, element) method to insert an element at a specific position."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        names.add(1, "Venkatesh");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Venkatesh, Kiran]`
    },

    {
      id: "get-method",

      title: "5. get() Method",

      paragraphs: [
        "The get() method is used to retrieve an element from a specific index.",

        "The index must be within the valid range of the List."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        String name = names.get(1);

        System.out.println(name);
    }
}`
      },

      output: `Kiran`
    },

    {
      id: "set-method",

      title: "6. set() Method",

      paragraphs: [
        "The set() method is used to replace an existing element at a specific index.",

        "It does not increase the size of the List because it replaces an existing element."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        languages.set(1, "Spring Boot");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Spring Boot, JavaScript]`
    },

    {
      id: "remove-method",

      title: "7. Removing Elements from List",

      paragraphs: [
        "List provides overloaded remove() methods.",

        "We can remove an element using its index or remove a matching object."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        languages.remove(1);

        System.out.println(languages);
    }
}`
      },

      output: `[Java, JavaScript]`
    },

    {
      id: "duplicates",

      title: "8. List Allows Duplicate Elements",

      paragraphs: [
        "Unlike Set, List allows duplicate elements.",

        "The same value can appear multiple times in a List, and each occurrence has its own index."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Java");
        languages.add("Spring");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Python, Java, Spring]`
    },

    {
      id: "search-list",

      title: "9. Searching in a List",

      paragraphs: [
        "List provides methods such as contains(), indexOf(), and lastIndexOf() for searching elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Java");
        languages.add("Spring");

        System.out.println(languages.contains("Java"));
        System.out.println(languages.indexOf("Java"));
        System.out.println(languages.lastIndexOf("Java"));
    }
}`
      },

      output: `true
0
2`
    },

    {
      id: "list-size",

      title: "10. size() and isEmpty()",

      paragraphs: [
        "The size() method returns the number of elements in the List.",

        "The isEmpty() method checks whether the List contains any elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        System.out.println(numbers.size());
        System.out.println(numbers.isEmpty());

        numbers.add(10);
        numbers.add(20);

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
      id: "list-sublist",

      title: "11. subList() Method",

      paragraphs: [
        "The subList() method returns a view of a portion of the original List.",

        "The first index is inclusive and the second index is exclusive."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");
        languages.add("C++");

        List<String> result = languages.subList(1, 3);

        System.out.println(result);
    }
}`
      },

      output: `[Python, JavaScript]`
    },

    {
      id: "list-iteration",

      title: "12. Iterating Through a List",

      paragraphs: [
        "A List can be traversed using an enhanced for loop, Iterator, ListIterator, or stream operations."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

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
      id: "list-implementations",

      title: "13. List Implementations",

      paragraphs: [
        "The List interface has several commonly used implementations.",

        "Each implementation has different internal characteristics and is suitable for different situations."
      ],

      bullets: [
        "ArrayList - backed by a dynamically resizable array.",
        "LinkedList - based on linked nodes and also implements Deque.",
        "Vector - a legacy synchronized List implementation.",
        "Stack - a legacy class that extends Vector and represents a stack."
      ]
    },

    {
      id: "arraylist-vs-linkedlist",

      title: "14. ArrayList vs LinkedList",

      paragraphs: [
        "ArrayList and LinkedList are two commonly used implementations of List.",

        "ArrayList is generally preferred when frequent indexed access is required.",

        "LinkedList can be useful when operations involve insertion or removal through its linked structure, particularly at the ends or when an appropriate position is already known through traversal."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> arrayList = new ArrayList<>();

        List<String> linkedList = new LinkedList<>();

        arrayList.add("Java");
        linkedList.add("Java");

        System.out.println(arrayList);
        System.out.println(linkedList);
    }
}`
      },

      output: `[Java]
[Java]`
    },

    {
      id: "programming-interface",

      title: "15. Programming to the List Interface",

      paragraphs: [
        "A common Java practice is to declare variables using the List interface instead of directly using a concrete implementation.",

        "This provides abstraction and makes it easier to change the implementation later."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Kiran]`
    },

    {
      id: "important-points",

      title: "16. Important Points",

      bullets: [
        "List is an interface in java.util.",
        "List extends the Collection interface.",
        "List maintains insertion order.",
        "List allows duplicate elements.",
        "List supports index-based access.",
        "The first index is 0.",
        "List provides get(), set(), add(), and remove() methods.",
        "Common implementations include ArrayList, LinkedList, Vector, and Stack.",
        "ArrayList is commonly used for general-purpose List operations.",
        "List can be traversed using enhanced for loop, Iterator, and ListIterator."
      ]
    },

    {
      id: "interview-questions",

      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is List in Java?",
          answer:
            "List is an interface in the Java Collections Framework that represents an ordered collection and allows duplicate elements."
        },
        {
          question: "Does List allow duplicate elements?",
          answer:
            "Yes. List allows duplicate elements."
        },
        {
          question: "Does List maintain insertion order?",
          answer:
            "Yes. List implementations generally maintain the order in which elements are inserted."
        },
        {
          question: "What is the starting index of a List?",
          answer:
            "The starting index is 0."
        },
        {
          question: "What are the common implementations of List?",
          answer:
            "Common implementations include ArrayList, LinkedList, Vector, and Stack."
        },
        {
          question: "What is the difference between get() and set()?",
          answer:
            "get() retrieves an element at an index, while set() replaces the element at an existing index."
        },
        {
          question: "What is the difference between add() and set()?",
          answer:
            "add() inserts an element and can increase the List size, while set() replaces an existing element at a specified index."
        },
        {
          question: "What is the difference between List and Set?",
          answer:
            "List maintains order and allows duplicates, while Set is designed to prevent duplicate elements."
        },
        {
          question: "Why should we use List as a reference type?",
          answer:
            "Using the List interface provides abstraction and allows the underlying implementation to be changed more easily."
        }
      ]
    }
  ]
};