export const listIterator = {
  id: "list-iterator",
  slug: "list-iterator",

  title: "ListIterator in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Learn how ListIterator works in Java, including forward and backward traversal, adding, replacing, and removing elements from a List.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-listiterator",

      title: "1. What is ListIterator?",

      paragraphs: [
        "ListIterator is an interface in the java.util package used to traverse elements of a List in both forward and backward directions.",

        "It extends the Iterator interface and provides additional operations specifically for List implementations.",

        "Unlike Iterator, ListIterator allows bidirectional traversal and supports adding and replacing elements during iteration."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring");
        languages.add("Hibernate");

        ListIterator<String> iterator =
                languages.listIterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}`
      },

      output: `Java
Spring
Hibernate`
    },

    {
      id: "creating-listiterator",

      title: "2. Creating a ListIterator",

      paragraphs: [
        "A ListIterator is obtained from a List using the listIterator() method.",

        "Because ListIterator is specifically designed for Lists, it is available through the List interface."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        ListIterator<Integer> iterator =
                numbers.listIterator();

        System.out.println(iterator.next());
    }
}`
      },

      output: `10`
    },

    {
      id: "has-next-next",

      title: "3. hasNext() and next()",

      paragraphs: [
        "ListIterator inherits hasNext() and next() from Iterator.",

        "hasNext() checks whether another element exists in the forward direction.",

        "next() returns the next element and moves the iterator cursor forward."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        ListIterator<String> iterator =
                names.listIterator();

        while (iterator.hasNext()) {

            String name = iterator.next();

            System.out.println(name);
        }
    }
}`
      },

      output: `Ravi
Kiran
Venkatesh`
    },

    {
      id: "backward-traversal",

      title: "4. Backward Traversal",

      paragraphs: [
        "One of the main advantages of ListIterator is that it can traverse a List in the reverse direction.",

        "hasPrevious() checks whether an element exists before the current cursor position.",

        "previous() returns the previous element and moves the cursor backward."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring");
        languages.add("Hibernate");

        ListIterator<String> iterator =
                languages.listIterator();

        while (iterator.hasNext()) {
            iterator.next();
        }

        while (iterator.hasPrevious()) {

            String language = iterator.previous();

            System.out.println(language);
        }
    }
}`
      },

      output: `Hibernate
Spring
Java`
    },

    {
      id: "has-previous",

      title: "5. hasPrevious() Method",

      paragraphs: [
        "The hasPrevious() method checks whether an element exists before the current cursor position.",

        "It returns true when backward traversal is possible and false when the iterator is at the beginning of the List."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("A");
        names.add("B");
        names.add("C");

        ListIterator<String> iterator =
                names.listIterator();

        iterator.next();
        iterator.next();

        System.out.println(iterator.hasPrevious());
        System.out.println(iterator.previous());
    }
}`
      },

      output: `true
B`
    },

    {
      id: "previous",

      title: "6. previous() Method",

      paragraphs: [
        "The previous() method returns the previous element and moves the cursor one position backward.",

        "If there is no previous element, previous() throws NoSuchElementException."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        ListIterator<Integer> iterator =
                numbers.listIterator();

        iterator.next();
        iterator.next();

        System.out.println(iterator.previous());
    }
}`
      },

      output: `20`
    },

    {
      id: "next-index",

      title: "7. nextIndex() Method",

      paragraphs: [
        "The nextIndex() method returns the index of the element that would be returned by the next() method.",

        "If the cursor is at the end of the List, nextIndex() returns the List size."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");
        names.add("Venkatesh");

        ListIterator<String> iterator =
                names.listIterator();

        System.out.println(iterator.nextIndex());

        iterator.next();

        System.out.println(iterator.nextIndex());
    }
}`
      },

      output: `0
1`
    },

    {
      id: "previous-index",

      title: "8. previousIndex() Method",

      paragraphs: [
        "The previousIndex() method returns the index of the element that would be returned by previous().",

        "When the cursor is at the beginning of the List, previousIndex() returns -1."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Java");
        names.add("Spring");
        names.add("Hibernate");

        ListIterator<String> iterator =
                names.listIterator();

        System.out.println(iterator.previousIndex());

        iterator.next();

        System.out.println(iterator.previousIndex());
    }
}`
      },

      output: `-1
0`
    },

    {
      id: "set-method",

      title: "9. set() Method",

      paragraphs: [
        "The set() method replaces the last element returned by next() or previous().",

        "It does not change the size of the List."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");

        ListIterator<String> iterator =
                languages.listIterator();

        while (iterator.hasNext()) {

            String language = iterator.next();

            if (language.equals("Python")) {
                iterator.set("Spring Boot");
            }
        }

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Spring Boot, JavaScript]`
    },

    {
      id: "add-method",

      title: "10. add() Method",

      paragraphs: [
        "The ListIterator add() method inserts an element into the List at the iterator's current position.",

        "The newly added element is inserted before the element that would be returned by a subsequent next() call."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring");

        ListIterator<String> iterator =
                languages.listIterator();

        iterator.next();

        iterator.add("Hibernate");

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Hibernate, Spring]`
    },

    {
      id: "remove-method",

      title: "11. remove() Method",

      paragraphs: [
        "ListIterator inherits the remove() method from Iterator.",

        "It removes the last element returned by next() or previous()."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Spring");

        ListIterator<String> iterator =
                languages.listIterator();

        while (iterator.hasNext()) {

            String language = iterator.next();

            if (language.equals("Python")) {
                iterator.remove();
            }
        }

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Spring]`
    },

    {
      id: "modify-list",

      title: "12. Adding, Removing and Replacing Elements",

      paragraphs: [
        "ListIterator provides three important modification operations: add(), remove(), and set().",

        "These operations allow us to modify a List while controlling the iterator cursor."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Spring");

        ListIterator<String> iterator =
                languages.listIterator();

        while (iterator.hasNext()) {

            String language = iterator.next();

            if (language.equals("Python")) {
                iterator.set("Spring Boot");
            }

            if (language.equals("Spring")) {
                iterator.remove();
            }
        }

        System.out.println(languages);
    }
}`
      },

      output: `[Java, Spring Boot]`
    },

    {
      id: "starting-position",

      title: "13. Starting ListIterator at a Specific Position",

      paragraphs: [
        "The listIterator(index) method creates a ListIterator whose cursor is positioned before the element at the specified index.",

        "This allows traversal to begin from a specific position instead of always starting at index 0."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring");
        languages.add("Hibernate");
        languages.add("Docker");

        ListIterator<String> iterator =
                languages.listIterator(2);

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}`
      },

      output: `Hibernate
Docker`
    },

    {
      id: "forward-backward",

      title: "14. Forward and Backward Traversal Together",

      paragraphs: [
        "ListIterator can move in both directions using next() and previous().",

        "The cursor position changes whenever either method is called."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> languages = new ArrayList<>();

        languages.add("Java");
        languages.add("Spring");
        languages.add("Hibernate");

        ListIterator<String> iterator =
                languages.listIterator();

        System.out.println(iterator.next());
        System.out.println(iterator.next());

        System.out.println(iterator.previous());

        System.out.println(iterator.next());
    }
}`
      },

      output: `Java
Spring
Spring`
    },

    {
      id: "iterator-vs-listiterator",

      title: "15. Iterator vs ListIterator",

      paragraphs: [
        "Iterator and ListIterator are both used to traverse collections, but ListIterator provides additional capabilities for List implementations."
      ],

      bullets: [
        "Iterator can be used with Collection types.",
        "ListIterator is specifically designed for List implementations.",
        "Iterator supports forward traversal.",
        "ListIterator supports forward and backward traversal.",
        "Iterator provides hasNext(), next(), and remove().",
        "ListIterator additionally provides hasPrevious(), previous(), nextIndex(), previousIndex(), add(), and set()."
      ],

      code: {
        language: "java",
        code: `ListIterator<String> iterator =
        languages.listIterator();

while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

while (iterator.hasPrevious()) {
    System.out.println(iterator.previous());
}`
      }
    },

    {
      id: "practical-example",

      title: "16. Practical Example - Updating List Elements",

      paragraphs: [
        "Suppose an application stores a list of technology names and we want to replace one technology while traversing the List.",

        "ListIterator.set() allows us to replace the current element during iteration."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Main {

    public static void main(String[] args) {

        List<String> technologies = new ArrayList<>();

        technologies.add("Java");
        technologies.add("Spring");
        technologies.add("MySQL");

        ListIterator<String> iterator =
                technologies.listIterator();

        while (iterator.hasNext()) {

            String technology = iterator.next();

            if (technology.equals("Spring")) {
                iterator.set("Spring Boot");
            }
        }

        System.out.println(technologies);
    }
}`
      },

      output: `[Java, Spring Boot, MySQL]`
    },

    {
      id: "important-points",

      title: "17. Important Points",

      bullets: [
        "ListIterator belongs to the java.util package.",
        "ListIterator is specifically designed for List implementations.",
        "ListIterator extends Iterator.",
        "It supports forward traversal using hasNext() and next().",
        "It supports backward traversal using hasPrevious() and previous().",
        "nextIndex() returns the index of the next element.",
        "previousIndex() returns the index of the previous element.",
        "add() inserts an element.",
        "set() replaces the last element returned by next() or previous().",
        "remove() removes the last element returned by next() or previous().",
        "listIterator(index) can start traversal at a specific position."
      ]
    },

    {
      id: "interview-questions",

      title: "18. Interview Questions",

      interviewQuestions: [
        {
          question: "What is ListIterator in Java?",
          answer:
            "ListIterator is an interface in java.util used to traverse List elements in both forward and backward directions."
        },
        {
          question: "Does ListIterator extend Iterator?",
          answer:
            "Yes. ListIterator extends the Iterator interface."
        },
        {
          question: "What is the main difference between Iterator and ListIterator?",
          answer:
            "Iterator supports forward traversal, while ListIterator supports both forward and backward traversal and provides additional List-specific modification operations."
        },
        {
          question: "Can ListIterator be used with Set?",
          answer:
            "No. ListIterator is specifically designed for List implementations."
        },
        {
          question: "What does hasPrevious() do?",
          answer:
            "hasPrevious() returns true if an element exists before the current cursor position."
        },
        {
          question: "What does previous() do?",
          answer:
            "previous() returns the previous element and moves the cursor one position backward."
        },
        {
          question: "What is nextIndex()?",
          answer:
            "nextIndex() returns the index of the element that would be returned by the next() method."
        },
        {
          question: "What is previousIndex()?",
          answer:
            "previousIndex() returns the index of the element that would be returned by previous()."
        },
        {
          question: "What is the use of ListIterator.set()?",
          answer:
            "set() replaces the last element returned by next() or previous()."
        },
        {
          question: "What is the use of ListIterator.add()?",
          answer:
            "add() inserts an element into the List at the current iterator position."
        },
        {
          question: "Can we remove an element using ListIterator?",
          answer:
            "Yes. ListIterator inherits remove() from Iterator."
        },
        {
          question: "How can you start a ListIterator from a particular index?",
          answer:
            "Use the listIterator(index) method of the List."
        },
        {
          question: "Can ListIterator traverse in both directions?",
          answer:
            "Yes. It supports forward traversal with next() and backward traversal with previous()."
        }
      ]
    }
  ]
};