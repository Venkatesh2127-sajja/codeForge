export const java8Fundamentals = {
  id: "java-8-fundamentals",
  title: "Java 8 Fundamentals",
  slug: "java-8-fundamentals",
  topicTitle: "Java 8",
  estimatedTime: "20 min",

  description:
    "Learn what Java 8 is, why it was introduced, its major features, and how Java 8 differs from Java 7.",

  sections: [
    {
      id: "what-is-java-8",
      title: "What is Java 8?",

      paragraphs: [
        "Java 8 is a major version of the Java programming language released in 2014.",
        "It introduced several important language and library features that changed the way Java applications can be written.",
        "The most important change was the introduction of functional programming features such as lambda expressions and functional interfaces.",
        "Java 8 also introduced the Stream API, Optional, the new Date-Time API, method references, and default and static methods in interfaces."
      ]
    },

    {
      id: "why-java-8-introduced",
      title: "Why Java 8 was introduced?",

      paragraphs: [
        "Before Java 8, Java applications commonly used traditional object-oriented programming techniques such as classes, objects, loops, anonymous classes, and explicit collection processing.",
        "As applications became larger, developers needed a more concise way to express operations on collections and data.",
        "Java 8 introduced functional programming features that allow developers to pass behavior as data and write more expressive code.",
        "The Stream API also made it easier to perform operations such as filtering, mapping, sorting, grouping, and reducing collections of data."
      ],

      bullets: [
        "Reduce unnecessary boilerplate code.",
        "Support functional programming in Java.",
        "Make collection processing easier.",
        "Provide a modern API for date and time handling.",
        "Improve the expressiveness of Java code.",
        "Allow interfaces to evolve through default and static methods."
      ]
    },

    {
      id: "major-features",
      title: "Java 8 Major Features",

      paragraphs: [
        "Java 8 introduced several important features. These features are widely used in modern Java applications and are especially important for backend development."
      ],

      bullets: [
        "Lambda Expressions — allow behavior to be represented as a concise block of code.",
        "Functional Interfaces — interfaces containing a single abstract method that can be implemented using lambda expressions.",
        "Stream API — provides a declarative way to process collections and other data sources.",
        "Method References — provide a shorter syntax for referring to existing methods.",
        "Optional — provides a container that can represent the presence or absence of a value.",
        "New Date-Time API — provides modern classes such as LocalDate, LocalTime, LocalDateTime, Instant, Duration, and Period.",
        "Default Methods — allow interfaces to provide method implementations.",
        "Static Methods in Interfaces — allow static utility methods to be defined inside interfaces.",
        "Collectors — provide ways to collect and summarize stream results.",
        "Parallel Streams — allow stream processing to be performed in parallel when appropriate."
      ]
    },

    {
      id: "simple-java-8-example",
      title: "Simple Java 8 Example",

      paragraphs: [
        "Lambda expressions are one of the most visible Java 8 features. Before Java 8, developers often used anonymous classes for simple behavior. Java 8 allows the same behavior to be expressed more concisely."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList("Java", "Spring", "React");

        names.forEach(name -> System.out.println(name));
    }
}`
      },

      output: `Java
Spring
React`
    },

    {
      id: "java-7-vs-java-8",
      title: "Java 7 vs Java 8",

      paragraphs: [
        "Java 7 and Java 8 both support object-oriented programming, but Java 8 introduced several features that enabled a more functional programming style.",
        "The difference can be seen clearly when processing collections."
      ],

      code: {
        language: "java",
        code: `// Traditional style

for (String name : names) {
    System.out.println(name);
}


// Java 8 lambda style

names.forEach(name -> System.out.println(name));`
      },

      bullets: [
        "Java 7 mainly used traditional object-oriented programming constructs.",
        "Java 8 introduced lambda expressions.",
        "Java 8 introduced functional interfaces.",
        "Java 8 introduced the Stream API.",
        "Java 8 introduced method references.",
        "Java 8 introduced Optional.",
        "Java 8 introduced the new Date-Time API.",
        "Java 8 introduced default and static methods in interfaces."
      ]
    },

    {
      id: "java-8-learning-flow",
      title: "Java 8 Learning Flow",

      paragraphs: [
        "The Java 8 concepts are closely connected. Functional interfaces provide the foundation for lambda expressions. Lambda expressions are heavily used with the Stream API. Method references provide a concise way to express some lambda operations. Optional and the Date-Time API provide additional Java 8 library features."
      ],

      bullets: [
        "Functional Programming → understand the programming model.",
        "Functional Interfaces → understand the target types for lambdas.",
        "Lambda Expressions → write behavior concisely.",
        "Method References → simplify certain lambda expressions.",
        "Stream API → process collections and data.",
        "Optional → handle potentially absent values.",
        "Date-Time API → work with dates and times.",
        "Advanced Java 8 → understand parallel streams and advanced processing."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Java 8 was released in 2014.",
        "Lambda expressions are a core Java 8 feature.",
        "Functional interfaces provide the target type for lambda expressions.",
        "Stream API is used for processing data in a declarative style.",
        "Method references provide a concise alternative to some lambda expressions.",
        "Optional represents a value that may or may not be present.",
        "Java 8 introduced the java.time API.",
        "Interfaces can contain default and static methods in Java 8."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is Java 8?",
          answer:
            "Java 8 is a major Java release that introduced features such as lambda expressions, functional interfaces, Stream API, method references, Optional, the new Date-Time API, and default and static methods in interfaces."
        },
        {
          question: "Why was Java 8 introduced?",
          answer:
            "Java 8 introduced functional programming capabilities, more expressive collection processing, a modern Date-Time API, and other language improvements that reduced boilerplate and improved code readability."
        },
        {
          question: "What are the major features of Java 8?",
          answer:
            "Major features include lambda expressions, functional interfaces, Stream API, method references, Optional, the Date-Time API, default methods, static interface methods, Collectors, and parallel streams."
        },
        {
          question: "What is the difference between Java 7 and Java 8?",
          answer:
            "Java 8 introduced major functional programming features such as lambda expressions, functional interfaces, Stream API, method references, and Optional, which were not available in Java 7."
        },
        {
          question: "Why are lambda expressions important in Java 8?",
          answer:
            "Lambda expressions allow behavior to be represented more concisely and are commonly used with functional interfaces, collections, and the Stream API."
        }
      ]
    }
  ]
};