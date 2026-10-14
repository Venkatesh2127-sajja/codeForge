export const collectionInterface = {
  id: "collection-interface",
  slug: "collection-interface",

  title: "Collection Interface in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the Collection interface in Java, its hierarchy, commonly used methods, and how List, Set, and Queue are related to it.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-collection-interface",

      title: "1. What is Collection Interface?",

      paragraphs: [
        "Collection is one of the fundamental interfaces in the Java Collections Framework.",

        "It represents a group of objects, also called elements, that can be stored and manipulated together.",

        "The Collection interface is the parent interface for major collection types such as List, Set, and Queue."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> languages = new ArrayList<>();

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
      id: "collection-hierarchy",

      title: "2. Collection Interface Hierarchy",

      paragraphs: [
        "The Collection interface is part of the java.util package.",

        "The major interfaces that extend Collection are List, Set, and Queue.",

        "Different implementations provide different behaviors. For example, ArrayList allows duplicate elements, while Set implementations generally do not allow duplicates."
      ],

      bullets: [
        "Collection is a root interface for the main collection types.",
        "List extends Collection.",
        "Set extends Collection.",
        "Queue extends Collection.",
        "Deque extends Queue.",
        "Map is not a child of Collection."
      ]
    },

    {
      id: "list-set-queue",

      title: "3. List, Set and Queue",

      paragraphs: [
        "List, Set, and Queue are important interfaces that extend Collection.",

        "List represents an ordered collection that can contain duplicate elements.",

        "Set represents a collection that does not allow duplicate elements.",

        "Queue represents a collection designed primarily for holding elements before processing."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.Queue;

public class Main {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();

        list.add("Java");
        list.add("Java");
        list.add("Spring");

        Set<String> set = new HashSet<>();

        set.add("Java");
        set.add("Java");
        set.add("Spring");

        Queue<String> queue = new LinkedList<>();

        queue.add("Task 1");
        queue.add("Task 2");

        System.out.println("List: " + list);
        System.out.println("Set: " + set);
        System.out.println("Queue: " + queue);
    }
}`
      },

      output: `List: [Java, Java, Spring]
Set: [Java, Spring]
Queue: [Task 1, Task 2]`
    },

    {
      id: "collection-methods",

      title: "4. Common Collection Methods",

      paragraphs: [
        "The Collection interface provides several commonly used methods for adding, removing, searching, and checking elements."
      ],

      bullets: [
        "add() - adds an element to the collection.",
        "addAll() - adds all elements from another collection.",
        "remove() - removes an element.",
        "removeAll() - removes elements that are also present in another collection.",
        "contains() - checks whether an element exists.",
        "containsAll() - checks whether all elements of another collection exist.",
        "size() - returns the number of elements.",
        "isEmpty() - checks whether the collection contains no elements.",
        "clear() - removes all elements.",
        "toArray() - converts the collection into an array."
      ]
    },

    {
      id: "add-method",

      title: "5. add() Method",

      paragraphs: [
        "The add() method is used to add an element to a collection.",

        "The exact behavior can depend on the collection implementation. For example, a Set may reject a duplicate element."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Kiran, Venkatesh]`
    },

    {
      id: "remove-method",

      title: "6. remove() Method",

      paragraphs: [
        "The remove() method removes a matching element from the collection.",

        "If the specified element is not present, the collection remains unchanged."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        languages.remove("Python");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, JavaScript]`
    },

    {
      id: "contains-method",

      title: "7. contains() Method",

      paragraphs: [
        "The contains() method checks whether a specified element exists in the collection.",

        "It returns true when the element is found and false when it is not found."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> languages = new ArrayList<>();

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
      id: "size-empty",

      title: "8. size() and isEmpty()",

      paragraphs: [
        "The size() method returns the number of elements currently stored in the collection.",

        "The isEmpty() method returns true when the collection contains no elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<Integer> numbers = new ArrayList<>();

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
      id: "clear-method",

      title: "9. clear() Method",

      paragraphs: [
        "The clear() method removes all elements from the collection.",

        "After calling clear(), the collection becomes empty."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        System.out.println(names);

        names.clear();

        System.out.println(names);
        System.out.println(names.isEmpty());
    }
}`
      },

      output: `[Ravi, Kiran, Venkatesh]
[]
true`
    },

    {
      id: "add-all",

      title: "10. addAll() Method",

      paragraphs: [
        "The addAll() method adds all elements from one collection into another collection."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> first = new ArrayList<>();

        first.add("Java");
        first.add("Spring");

        Collection<String> second = new ArrayList<>();

        second.add("MySQL");
        second.add("Docker");

        first.addAll(second);

        System.out.println(first);
    }
}`
      },

      output: `[Java, Spring, MySQL, Docker]`
    },

    {
      id: "remove-all",

      title: "11. removeAll() Method",

      paragraphs: [
        "The removeAll() method removes elements from one collection that are also present in another collection."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Collection<Integer> removeNumbers = new ArrayList<>();

        removeNumbers.add(20);
        removeNumbers.add(40);

        numbers.removeAll(removeNumbers);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "collection-reference",

      title: "12. Programming to the Collection Interface",

      paragraphs: [
        "A common Java programming practice is to declare a variable using an interface type and create an object using a concrete implementation.",

        "For example, we can declare an ArrayList using the Collection or List interface.",

        "This makes the code more flexible because the implementation can be changed without changing the rest of the code."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collection;

public class Main {

    public static void main(String[] args) {

        Collection<String> names = new ArrayList<>();

        names.add("Java");
        names.add("Spring Boot");

        System.out.println(names);
    }
}`
      },

      output: `[Java, Spring Boot]`
    },

    {
      id: "collection-vs-map",

      title: "13. Collection vs Map",

      paragraphs: [
        "Collection and Map are both important parts of the Java Collections Framework, but they have different purposes.",

        "A Collection stores individual elements, while a Map stores key-value pairs.",

        "Map does not extend the Collection interface."
      ],

      bullets: [
        "Collection stores individual elements.",
        "Map stores key-value pairs.",
        "List, Set, and Queue extend Collection.",
        "HashMap, LinkedHashMap, and TreeMap implement Map.",
        "Collection uses methods such as add() and remove().",
        "Map uses methods such as put() and get()."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        Map<Integer, String> users = new HashMap<>();

        users.put(101, "Ravi");
        users.put(102, "Kiran");

        System.out.println(names);
        System.out.println(users);
    }
}`
      },

      output: `[Ravi, Kiran]
{101=Ravi, 102=Kiran}`
    },

    {
      id: "important-points",

      title: "14. Important Points",

      bullets: [
        "Collection is an interface in java.util.",
        "Collection represents a group of elements.",
        "List, Set, and Queue extend Collection.",
        "Deque extends Queue.",
        "Collection does not store key-value pairs.",
        "Map is separate from the Collection hierarchy.",
        "Collection provides common operations such as add(), remove(), contains(), size(), and clear().",
        "Different collection implementations can provide different ordering and duplicate-handling behavior."
      ]
    },

    {
      id: "interview-questions",

      title: "15. Interview Questions",

      interviewQuestions: [
        {
          question: "What is the Collection interface in Java?",
          answer:
            "Collection is a root interface in the Java Collections Framework that represents a group of objects. List, Set, and Queue are major interfaces that extend it."
        },
        {
          question: "Which interfaces extend Collection?",
          answer:
            "The major interfaces that extend Collection are List, Set, and Queue. Deque extends Queue."
        },
        {
          question: "Does Map extend Collection?",
          answer:
            "No. Map is a separate interface in the Java Collections Framework and stores key-value pairs."
        },
        {
          question: "What is the difference between Collection and Collections?",
          answer:
            "Collection is an interface representing a group of elements. Collections is a utility class that provides static methods for operations such as sorting and searching collections."
        },
        {
          question: "What are some common methods of Collection?",
          answer:
            "Common methods include add(), addAll(), remove(), removeAll(), contains(), containsAll(), size(), isEmpty(), clear(), and toArray()."
        },
        {
          question: "Can a Collection contain duplicate elements?",
          answer:
            "It depends on the implementation. List implementations generally allow duplicates, while Set implementations are designed to prevent duplicate elements."
        },
        {
          question: "Why do we use Collection as a reference type?",
          answer:
            "Using the Collection interface as a reference provides abstraction and allows the implementation to be changed more easily."
        }
      ]
    }
  ]
};