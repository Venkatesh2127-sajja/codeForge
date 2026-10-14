export const iterableAndIterator = {
  id: "iterable-and-iterator",
  slug: "iterable-and-iterator",

  title: "Iterable and Iterator in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the Iterable and Iterator interfaces in Java, how they are used to traverse collections, and the difference between Iterable and Iterator.",

  estimatedTime: "25 min",

  sections: [
    {
      id: "what-is-iterable",

      title: "1. What is Iterable?",

      paragraphs: [
        "Iterable is an interface in Java that represents an object whose elements can be traversed one by one.",

        "The Iterable interface is part of the java.lang package and provides the iterator() method.",

        "Many collection classes implement Iterable, which allows us to use the enhanced for loop to traverse their elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Venkatesh");
        names.add("Ravi");
        names.add("Kiran");

        for (String name : names) {
            System.out.println(name);
        }
    }
}`
      },

      output: `Venkatesh
Ravi
Kiran`
    },

    {
      id: "iterable-method",

      title: "2. iterator() Method",

      paragraphs: [
        "The main method provided by the Iterable interface is iterator().",

        "It returns an Iterator object that can be used to traverse the elements of the collection.",

        "The Iterator provides methods such as hasNext() and next() for traversing elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Java");
        names.add("Spring Boot");
        names.add("MySQL");

        Iterator<String> iterator = names.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}`
      },

      output: `Java
Spring Boot
MySQL`
    },

    {
      id: "what-is-iterator",

      title: "3. What is Iterator?",

      paragraphs: [
        "Iterator is an interface in the java.util package used to traverse elements of a collection sequentially.",

        "It provides a standard way to access elements without exposing the internal implementation of the collection.",

        "Iterator is commonly used when we need more control over collection traversal."
      ],

      bullets: [
        "Iterator belongs to the java.util package.",
        "Iterator is used to traverse collection elements.",
        "Iterator provides hasNext() to check whether another element exists.",
        "Iterator provides next() to retrieve the next element.",
        "Iterator provides remove() to remove the current element when supported."
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

            System.out.println(number);
        }
    }
}`
      },

      output: `10
20
30`
    },

    {
      id: "has-next-next",

      title: "4. hasNext() and next()",

      paragraphs: [
        "The hasNext() method checks whether another element is available in the collection.",

        "The next() method returns the next element from the collection.",

        "A common pattern is to call hasNext() before calling next(). This prevents trying to read beyond the available elements."
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

            String language = iterator.next();

            System.out.println(language);
        }
    }
}`
      },

      output: `Java
Python
JavaScript`
    },

    {
      id: "remove-iterator",

      title: "5. Removing Elements Using Iterator",

      paragraphs: [
        "Iterator provides a remove() method that can be used to remove the element returned by the most recent next() call.",

        "Using Iterator.remove() is safer than directly modifying the collection while it is being traversed."
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
      id: "iterator-vs-for-loop",

      title: "6. Iterator vs Enhanced for Loop",

      paragraphs: [
        "Both Iterator and the enhanced for loop can be used to traverse collections.",

        "The enhanced for loop is simpler and easier to read when we only need to access elements.",

        "Iterator is useful when we need explicit control over traversal or need to remove elements during iteration."
      ],

      code: {
        language: "java",
        code: `List<String> names = new ArrayList<>();

names.add("Java");
names.add("Spring");
names.add("Hibernate");

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
      id: "iterable-vs-iterator",

      title: "7. Iterable vs Iterator",

      paragraphs: [
        "Iterable and Iterator are related but they have different responsibilities.",

        "Iterable represents an object that can provide an Iterator.",

        "Iterator represents the actual mechanism used to traverse the elements."
      ],

      bullets: [
        "Iterable is used to obtain an Iterator.",
        "Iterator is used to traverse elements.",
        "Iterable provides the iterator() method.",
        "Iterator provides hasNext() and next().",
        "Iterable is commonly associated with the enhanced for loop.",
        "Iterator provides more direct control over traversal."
      ]
    },

    {
      id: "practical-example",

      title: "8. Practical Example",

      paragraphs: [
        "Consider a backend application that stores a list of users.",

        "We can use Iterable and Iterator to traverse the users and perform operations on individual elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> users = new ArrayList<>();

        users.add("Admin");
        users.add("Developer");
        users.add("Tester");

        Iterator<String> iterator = users.iterator();

        while (iterator.hasNext()) {

            String user = iterator.next();

            System.out.println("User: " + user);
        }
    }
}`
      },

      output: `User: Admin
User: Developer
User: Tester`
    },

    {
      id: "important-points",

      title: "9. Important Points",

      bullets: [
        "Iterable is available in the java.lang package.",
        "Iterator is available in the java.util package.",
        "Iterable provides the iterator() method.",
        "Iterator provides hasNext() and next().",
        "Iterator can be used to remove elements using remove().",
        "Most Java collections implement Iterable either directly or through the Collection interface.",
        "The enhanced for loop internally uses an Iterator for Iterable objects.",
        "Iterator is useful when explicit traversal control is required."
      ]
    },

    {
      id: "interview-questions",

      title: "10. Interview Questions",

      interviewQuestions: [
        {
          question: "What is Iterable in Java?",
          answer:
            "Iterable is an interface that represents an object whose elements can be traversed. It provides the iterator() method."
        },
        {
          question: "What is Iterator in Java?",
          answer:
            "Iterator is an interface from java.util used to traverse elements of a collection sequentially."
        },
        {
          question: "What is the difference between Iterable and Iterator?",
          answer:
            "Iterable represents an object that can provide an iterator, while Iterator is used to actually traverse the elements."
        },
        {
          question: "What are the commonly used methods of Iterator?",
          answer:
            "The commonly used methods are hasNext(), next(), and remove()."
        },
        {
          question: "Why should Iterator.remove() be used instead of collection.remove() during iteration?",
          answer:
            "Iterator.remove() removes the current element safely during iteration. Directly modifying many collections while iterating can cause ConcurrentModificationException."
        },
        {
          question: "Which package contains Iterator?",
          answer:
            "Iterator is available in the java.util package."
        },
        {
          question: "Which method does Iterable provide?",
          answer:
            "Iterable provides the iterator() method."
        }
      ]
    }
  ]
};