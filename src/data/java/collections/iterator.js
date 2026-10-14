export const iterator = {
  id: "iterator",
  slug: "iterator",

  title: "Iterator in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Learn how Iterator works in Java, how to traverse collections, use hasNext(), next(), and remove(), and safely modify collections during iteration.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-iterator",

      title: "1. What is Iterator?",

      paragraphs: [
        "Iterator is an interface in the java.util package used to traverse elements of a collection one by one.",

        "It provides a common way to access elements of different collection implementations without depending on their internal structure.",

        "Iterator is especially useful when we need to remove elements safely while iterating through a collection."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        Iterator<String> iterator = languages.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}`
      },

      output: `Java
Python
JavaScript`
    },

    {
      id: "creating-iterator",

      title: "2. Creating an Iterator",

      paragraphs: [
        "The iterator() method is used to obtain an Iterator from a collection.",

        "The Iterator uses the generic type of the collection so that the returned elements have the appropriate type."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        Iterator<Integer> iterator = numbers.iterator();

        System.out.println(iterator.next());
    }
}`
      },

      output: `10`
    },

    {
      id: "has-next",

      title: "3. hasNext() Method",

      paragraphs: [
        "The hasNext() method checks whether another element is available in the collection.",

        "It returns true when another element is available and false when the iterator has reached the end."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        Iterator<String> iterator = names.iterator();

        while (iterator.hasNext()) {
            System.out.println("Element available");
            iterator.next();
        }

        System.out.println("No more elements");
    }
}`
      },

      output: `Element available
Element available
No more elements`
    },

    {
      id: "next",

      title: "4. next() Method",

      paragraphs: [
        "The next() method returns the next element from the collection.",

        "It advances the iterator position after returning the current element.",

        "Calling next() when no element remains results in NoSuchElementException."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        Iterator<String> iterator = names.iterator();

        System.out.println(iterator.next());
        System.out.println(iterator.next());
        System.out.println(iterator.next());
    }
}`
      },

      output: `Ravi
Kiran
Venkatesh`
    },

    {
      id: "iterator-loop",

      title: "5. Traversing Using Iterator",

      paragraphs: [
        "The most common way to use Iterator is with a while loop.",

        "The loop continues while hasNext() returns true and next() retrieves each element."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Iterator<Integer> iterator = numbers.iterator();

        while (iterator.hasNext()) {

            Integer number = iterator.next();

            System.out.println(number);
        }
    }
}`
      },

      output: `10
20
30
40`
    },

    {
      id: "remove",

      title: "6. remove() Method",

      paragraphs: [
        "The remove() method removes from the underlying collection the last element returned by the iterator.",

        "The remove() method can be called after next().",

        "It is important not to call remove() before next() or call it twice for the same returned element."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        Iterator<Integer> iterator = numbers.iterator();

        while (iterator.hasNext()) {

            Integer number = iterator.next();

            if (number == 20) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30, 40]`
    },

    {
      id: "remove-vs-collection-remove",

      title: "7. Iterator.remove() vs Collection.remove()",

      paragraphs: [
        "When modifying a collection during iteration, Iterator.remove() is the appropriate removal operation.",

        "Directly modifying many fail-fast collections through the collection itself while an iterator is active can result in ConcurrentModificationException."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        Iterator<Integer> iterator = numbers.iterator();

        while (iterator.hasNext()) {

            Integer number = iterator.next();

            if (number == 20) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "iterator-list",

      title: "8. Iterator with List",

      paragraphs: [
        "Iterator can be used with List implementations such as ArrayList and LinkedList."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring Boot");
        languages.add("Hibernate");

        Iterator<String> iterator = languages.iterator();

        while (iterator.hasNext()) {

            String language = iterator.next();

            System.out.println(language);
        }
    }
}`
      },

      output: `Java
Spring Boot
Hibernate`
    },

    {
      id: "iterator-set",

      title: "9. Iterator with Set",

      paragraphs: [
        "Iterator is also useful for traversing Set implementations.",

        "Since Set does not provide index-based access, Iterator is a convenient way to traverse its elements."
      ],

      code: {
        language: "java",
        code: `import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> languages = new HashSet<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Spring");

        Iterator<String> iterator = languages.iterator();

        while (iterator.hasNext()) {

            String language = iterator.next();

            System.out.println(language);
        }
    }
}`
      },

      output: `Java
Spring
Python`
    },

    {
      id: "iterator-map",

      title: "10. Iterator with Map",

      paragraphs: [
        "Map does not directly implement Collection, so we cannot obtain an Iterator directly from a Map.",

        "However, we can obtain an Iterator from the Map's keySet(), values(), or entrySet()."
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map<Integer, String> users = new HashMap<>();

        users.put(101, "Ravi");
        users.put(102, "Kiran");
        users.put(103, "Venkatesh");

        Iterator<Map.Entry<Integer, String>> iterator =
                users.entrySet().iterator();

        while (iterator.hasNext()) {

            Map.Entry<Integer, String> entry = iterator.next();

            System.out.println(
                    entry.getKey() + " = " + entry.getValue()
            );
        }
    }
}`
      },

      output: `101 = Ravi
102 = Kiran
103 = Venkatesh`
    },

    {
      id: "iterator-generic",

      title: "11. Iterator with Generics",

      paragraphs: [
        "Iterator supports generics, which allows the compiler to enforce the type of elements returned by next().",

        "Using generics avoids unnecessary casting and improves type safety."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        Iterator<String> iterator = names.iterator();

        while (iterator.hasNext()) {

            String name = iterator.next();

            System.out.println(name.toUpperCase());
        }
    }
}`
      },

      output: `RAVI
KIRAN`
    },

    {
      id: "concurrent-modification",

      title: "12. Iterator and ConcurrentModificationException",

      paragraphs: [
        "Many standard collection iterators are fail-fast. If the collection is structurally modified outside the iterator while iteration is in progress, the iterator may throw ConcurrentModificationException.",

        "The safe removal mechanism provided by Iterator is Iterator.remove()."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        Iterator<Integer> iterator = numbers.iterator();

        while (iterator.hasNext()) {

            Integer number = iterator.next();

            if (number == 20) {
                iterator.remove();
            }
        }

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 30]`
    },

    {
      id: "iterator-vs-enhanced-for",

      title: "13. Iterator vs Enhanced for Loop",

      paragraphs: [
        "Both Iterator and the enhanced for loop can be used to traverse collections.",

        "The enhanced for loop is usually simpler when only reading elements.",

        "Iterator provides explicit control over traversal and provides remove() for removing the current element."
      ],

      bullets: [
        "Enhanced for loop is concise and easy to read.",
        "Iterator provides explicit traversal control.",
        "Iterator can remove the current element using remove().",
        "Iterator is useful when traversal logic needs direct access to the iterator."
      ],

      code: {
        language: "java",
        code: `List<String> names = new ArrayList<>();

names.add("Ravi");
names.add("Kiran");

// Enhanced for loop
for (String name : names) {
    System.out.println(name);
}

// Iterator
Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}`
      }
    },

    {
      id: "iterator-vs-listiterator",

      title: "14. Iterator vs ListIterator",

      paragraphs: [
        "Iterator provides forward traversal of a collection.",

        "ListIterator is a specialized iterator for List implementations and supports both forward and backward traversal.",

        "ListIterator also provides additional methods for adding and replacing elements."
      ],

      bullets: [
        "Iterator can be used with Collection types.",
        "ListIterator is specifically for List implementations.",
        "Iterator supports forward traversal.",
        "ListIterator supports forward and backward traversal.",
        "ListIterator provides previous().",
        "ListIterator provides add() and set()."
      ]
    },

    {
      id: "practical-example",

      title: "15. Practical Example - Remove Inactive Users",

      paragraphs: [
        "A common backend use case is removing inactive users from an in-memory collection while iterating through it.",

        "Iterator.remove() allows the current element to be removed safely during iteration."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> users = new ArrayList<>();

        users.add("Active");
        users.add("Inactive");
        users.add("Active");
        users.add("Inactive");

        Iterator<String> iterator = users.iterator();

        while (iterator.hasNext()) {

            String status = iterator.next();

            if (status.equals("Inactive")) {
                iterator.remove();
            }
        }

        System.out.println(users);
    }
}`
      },

      output: `[Active, Active]`
    },

    {
      id: "important-points",

      title: "16. Important Points",

      bullets: [
        "Iterator belongs to the java.util package.",
        "Iterator is used to traverse collection elements.",
        "iterator() is used to obtain an Iterator.",
        "hasNext() checks whether another element is available.",
        "next() returns the next element.",
        "remove() removes the last element returned by next().",
        "Iterator provides forward traversal.",
        "ListIterator provides additional functionality for List implementations.",
        "Many standard collection iterators are fail-fast.",
        "Iterator.remove() is the appropriate way to remove the current element during iteration."
      ]
    },

    {
      id: "interview-questions",

      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is Iterator in Java?",
          answer:
            "Iterator is an interface from java.util used to traverse elements of a collection sequentially."
        },
        {
          question: "How do you obtain an Iterator?",
          answer:
            "An Iterator is obtained by calling the iterator() method on a collection."
        },
        {
          question: "What are the main methods of Iterator?",
          answer:
            "The main methods are hasNext(), next(), and remove()."
        },
        {
          question: "What does hasNext() do?",
          answer:
            "hasNext() returns true if another element is available in the iteration."
        },
        {
          question: "What happens when next() is called when no element remains?",
          answer:
            "next() throws NoSuchElementException when there is no next element."
        },
        {
          question: "How do you remove an element while using Iterator?",
          answer:
            "Call next() to obtain the element and then call Iterator.remove() to remove that element from the underlying collection."
        },
        {
          question: "Why should Iterator.remove() be used during iteration?",
          answer:
            "It allows the iterator to coordinate the removal with its traversal state. Direct structural modification of many fail-fast collections during iteration can cause ConcurrentModificationException."
        },
        {
          question: "Can Iterator traverse a Map directly?",
          answer:
            "No. Map does not implement Collection. You can obtain an Iterator from entrySet(), keySet(), or values()."
        },
        {
          question: "What is the difference between Iterator and ListIterator?",
          answer:
            "Iterator supports forward traversal and can be used with collections. ListIterator is specifically for List implementations and supports both forward and backward traversal plus additional modification operations."
        },
        {
          question: "What is a fail-fast iterator?",
          answer:
            "A fail-fast iterator may throw ConcurrentModificationException when it detects an unsupported structural modification of the underlying collection during iteration."
        }
      ]
    }
  ]
};