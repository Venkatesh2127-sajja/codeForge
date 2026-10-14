export const streamApiFundamentals = {
  id: "stream-api-fundamentals",
  title: "Stream API Fundamentals",
  slug: "stream-api-fundamentals",
  topicTitle: "Java 8",
  estimatedTime: "45 min",

  description:
    "Learn the fundamentals of the Java 8 Stream API, including stream creation, stream pipelines, intermediate and terminal operations, filtering, mapping, flattening, sorting, limiting, skipping, debugging, and iteration.",

  sections: [
    {
      id: "what-is-stream-api",
      title: "What is Stream API?",

      paragraphs: [
        "The Stream API was introduced in Java 8 to provide a declarative way to process collections and other data sources.",
        "A stream represents a sequence of elements that can be processed through a pipeline of operations.",
        "Streams allow developers to express operations such as filtering, transformation, sorting, and aggregation without manually managing the iteration logic.",
        "A stream does not store data. It processes data from a source such as a Collection, array, or generated sequence."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 15, 20, 25, 30);

        numbers.stream()
                .filter(number -> number > 20)
                .forEach(System.out::println);
    }
}`
      },

      output: `25
30`,

      bullets: [
        "Streams were introduced in Java 8.",
        "Streams are used to process data.",
        "A stream does not store elements.",
        "Streams do not normally modify the original source.",
        "Stream operations can be combined into a pipeline."
      ]
    },

    {
      id: "collection-vs-stream",
      title: "Collection vs Stream",

      paragraphs: [
        "A Collection is used to store and manage data, while a Stream is used to process data.",
        "A collection can be traversed multiple times. A stream is generally consumed after a terminal operation and cannot be reused."
      ],

      code: {
        language: "text",
        code: `Collection
    ↓
Stores data
    ↓
Can be traversed multiple times


Stream
    ↓
Processes data
    ↓
Does not store data
    ↓
Usually consumed after terminal operation`
      },

      bullets: [
        "Collection → data storage.",
        "Stream → data processing.",
        "Collection can be reused for multiple traversals.",
        "A consumed stream cannot normally be reused.",
        "Stream operations can be chained together."
      ]
    },

    {
      id: "creating-streams",
      title: "Creating Streams",

      paragraphs: [
        "Streams can be created from collections, arrays, individual values, and generated sequences."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {

        // From a collection
        List<String> names =
                Arrays.asList("Java", "Spring", "React");

        Stream<String> stream1 =
                names.stream();


        // From values
        Stream<String> stream2 =
                Stream.of("Java", "Spring");


        // From an array
        String[] languages =
                {"Java", "Python", "Go"};

        Stream<String> stream3 =
                Arrays.stream(languages);


        stream1.forEach(System.out::println);
    }
}`
      },

      output: `Java
Spring
React`,

      bullets: [
        "collection.stream() creates a sequential stream.",
        "collection.parallelStream() creates a parallel stream.",
        "Stream.of() creates a stream from specified values.",
        "Arrays.stream() creates a stream from an array."
      ]
    },

    {
      id: "stream-pipeline",
      title: "Stream Pipeline",

      paragraphs: [
        "A stream pipeline consists of a source, zero or more intermediate operations, and one terminal operation.",
        "The source provides the data. Intermediate operations transform or filter the stream. The terminal operation produces the final result or performs an action."
      ],

      code: {
        language: "text",
        code: `Source
   ↓
Intermediate Operation
   ↓
Intermediate Operation
   ↓
Terminal Operation`
      },

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 15, 20, 25, 30);

numbers.stream()                 // Source
       .filter(n -> n > 15)      // Intermediate
       .map(n -> n * 2)          // Intermediate
       .forEach(System.out::println); // Terminal`
      },

      output: `40
50
60`
    },

    {
      id: "intermediate-operations",
      title: "Intermediate Operations",

      paragraphs: [
        "Intermediate operations transform a stream into another stream.",
        "They are lazy, meaning they generally do not execute immediately when they are declared. Processing happens when a terminal operation is invoked."
      ],

      bullets: [
        "filter()",
        "map()",
        "flatMap()",
        "distinct()",
        "sorted()",
        "limit()",
        "skip()",
        "peek()"
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 30, 40);

numbers.stream()
       .filter(n -> n > 10)
       .map(n -> n * 2)
       .forEach(System.out::println);`
      },

      output: `40
60
80`
    },

    {
      id: "terminal-operations",
      title: "Terminal Operations",

      paragraphs: [
        "A terminal operation produces a final result or performs a final action on the stream.",
        "Once a terminal operation has been executed, the stream is considered consumed."
      ],

      bullets: [
        "forEach()",
        "collect()",
        "reduce()",
        "count()",
        "min()",
        "max()",
        "anyMatch()",
        "allMatch()",
        "noneMatch()"
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 30);

long count =
        numbers.stream()
               .count();

System.out.println(count);`
      },

      output: `3`
    },

    {
      id: "filter",
      title: "filter()",

      paragraphs: [
        "The filter() operation is used to select elements that satisfy a condition.",
        "It accepts a Predicate and returns a new stream containing only the elements for which the condition is true."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 15, 20, 25, 30);

        numbers.stream()
                .filter(number -> number % 2 == 0)
                .forEach(System.out::println);
    }
}`
      },

      output: `10
20
30`,

      bullets: [
        "filter() is an intermediate operation.",
        "It accepts a Predicate.",
        "It keeps elements that satisfy the condition.",
        "It does not normally modify the original collection."
      ]
    },

    {
      id: "map",
      title: "map()",

      paragraphs: [
        "The map() operation transforms each element of a stream into another value.",
        "It is commonly used when every input element needs to be converted or transformed."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "java",
                        "spring",
                        "react"
                );

        names.stream()
                .map(String::toUpperCase)
                .forEach(System.out::println);
    }
}`
      },

      output: `JAVA
SPRING
REACT`,

      bullets: [
        "map() is an intermediate operation.",
        "It transforms each element.",
        "The number of elements normally remains the same.",
        "map() can change the element type."
      ]
    },

    {
      id: "flat-map",
      title: "flatMap()",

      paragraphs: [
        "The flatMap() operation is used when each element produces another stream or collection and those nested results need to be flattened into a single stream.",
        "It is particularly useful when processing nested collections."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<List<String>> languages =
                Arrays.asList(
                        Arrays.asList("Java", "Spring"),
                        Arrays.asList("React", "JavaScript")
                );

        languages.stream()
                .flatMap(List::stream)
                .forEach(System.out::println);
    }
}`
      },

      output: `Java
Spring
React
JavaScript`,

      bullets: [
        "map() transforms elements.",
        "flatMap() transforms and flattens nested results.",
        "flatMap() is commonly used with nested collections.",
        "The final result is a single stream."
      ]
    },

    {
      id: "distinct",
      title: "distinct()",

      paragraphs: [
        "The distinct() operation removes duplicate elements from a stream.",
        "It uses the equality characteristics of the stream elements to determine duplicates."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(
                        10, 20, 10, 30, 20, 40
                );

        numbers.stream()
                .distinct()
                .forEach(System.out::println);
    }
}`
      },

      output: `10
20
30
40`
    },

    {
      id: "sorted",
      title: "sorted()",

      paragraphs: [
        "The sorted() operation sorts stream elements according to their natural ordering or according to a provided Comparator."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(40, 10, 30, 20);

        numbers.stream()
                .sorted()
                .forEach(System.out::println);
    }
}`
      },

      output: `10
20
30
40`
    },

    {
      id: "sorted-with-comparator",
      title: "sorted() with Comparator",

      paragraphs: [
        "A Comparator can be supplied when custom sorting logic is required."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "Java",
                        "Spring",
                        "Go"
                );

        names.stream()
                .sorted((a, b) -> b.length() - a.length())
                .forEach(System.out::println);
    }
}`
      },

      output: `Spring
Java
Go`
    },

    {
      id: "limit",
      title: "limit()",

      paragraphs: [
        "The limit() operation restricts the stream to a maximum number of elements."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 20, 30, 40, 50);

        numbers.stream()
                .limit(3)
                .forEach(System.out::println);
    }
}`
      },

      output: `10
20
30`,

      bullets: [
        "limit() is an intermediate operation.",
        "It limits the number of elements passing through the pipeline.",
        "It is useful for top-N and pagination-style processing."
      ]
    },

    {
      id: "skip",
      title: "skip()",

      paragraphs: [
        "The skip() operation skips the specified number of elements from the beginning of the stream."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 20, 30, 40, 50);

        numbers.stream()
                .skip(2)
                .forEach(System.out::println);
    }
}`
      },

      output: `30
40
50`,

      bullets: [
        "skip() is an intermediate operation.",
        "It ignores the first specified number of elements.",
        "It is useful when processing data after an offset."
      ]
    },

    {
      id: "peek",
      title: "peek()",

      paragraphs: [
        "The peek() operation allows an action to be performed on each element as it passes through the stream pipeline.",
        "It is mainly useful for debugging and observing stream processing."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 20, 30);

        numbers.stream()
                .peek(n -> System.out.println("Before: " + n))
                .map(n -> n * 2)
                .peek(n -> System.out.println("After: " + n))
                .forEach(System.out::println);
    }
}`
      },

      output: `Before: 10
After: 20
20
Before: 20
After: 40
40
Before: 30
After: 60
60`,

      bullets: [
        "peek() is an intermediate operation.",
        "It is useful for debugging.",
        "It should not normally be used as the main way to perform business logic.",
        "Because streams are lazy, peek() executes only when a terminal operation triggers processing."
      ]
    },

    {
      id: "for-each",
      title: "forEach()",

      paragraphs: [
        "The forEach() operation is a terminal operation used to perform an action for each element in the stream.",
        "It is commonly used for displaying, logging, or performing another side effect on each processed element."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> languages =
                Arrays.asList(
                        "Java",
                        "Spring",
                        "React"
                );

        languages.stream()
                .forEach(
                        language ->
                                System.out.println(language)
                );
    }
}`
      },

      output: `Java
Spring
React`,

      bullets: [
        "forEach() is a terminal operation.",
        "It consumes the stream.",
        "It accepts a Consumer.",
        "It is commonly used when no result collection is required."
      ]
    },

    {
      id: "complete-stream-example",
      title: "Complete Stream Pipeline Example",

      paragraphs: [
        "The following example combines several Stream API operations into a single pipeline."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(
                        10, 15, 20, 25, 30, 30, 40
                );

        numbers.stream()
                .filter(n -> n >= 20)
                .distinct()
                .sorted()
                .map(n -> n * 2)
                .limit(3)
                .forEach(System.out::println);
    }
}`
      },

      output: `40
50
60`,

      paragraphs: [
        "The pipeline first filters numbers greater than or equal to 20, removes duplicates, sorts the values, doubles each value, keeps the first three results, and finally prints them."
      ]
    },

    {
      id: "stream-laziness",
      title: "Stream Operations are Lazy",

      paragraphs: [
        "Intermediate operations are lazy. They do not normally process the source immediately.",
        "Processing begins when a terminal operation is invoked."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 30);

numbers.stream()
       .filter(n -> {
           System.out.println("Filtering " + n);
           return n > 10;
       });

System.out.println("No terminal operation yet");`
      },

      output: `No terminal operation yet`,

      paragraphs: [
        "The filter operation is not executed because the pipeline does not have a terminal operation."
      ]
    },

    {
      id: "stream-reuse",
      title: "A Stream Cannot Normally Be Reused",

      paragraphs: [
        "Once a terminal operation has consumed a stream, the same stream cannot normally be used again.",
        "If the data needs to be processed again, create a new stream from the original source."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList("Java", "Spring");

Stream<String> stream =
        names.stream();

stream.forEach(System.out::println);

// stream.forEach(System.out::println);
// IllegalStateException`
      },

      bullets: [
        "A stream is normally single-use.",
        "Create another stream when another processing pipeline is required."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Stream API was introduced in Java 8.",
        "A stream processes data but does not store the data itself.",
        "A stream can be created from collections, arrays, values, and other sources.",
        "A stream pipeline consists of a source, intermediate operations, and a terminal operation.",
        "Intermediate operations return another stream.",
        "Intermediate operations are lazy.",
        "Terminal operations trigger stream processing.",
        "filter() selects elements based on a condition.",
        "map() transforms each element.",
        "flatMap() transforms and flattens nested results.",
        "distinct() removes duplicate elements.",
        "sorted() sorts elements.",
        "limit() restricts the maximum number of elements.",
        "skip() ignores the first specified number of elements.",
        "peek() is mainly useful for debugging and observing processing.",
        "forEach() performs an action for each element and is a terminal operation.",
        "A consumed stream cannot normally be reused."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is Stream API in Java 8?",
          answer:
            "The Stream API is a Java 8 feature that provides a declarative way to process sequences of data using operations such as filter, map, sort, and collect."
        },
        {
          question: "Does a Stream store data?",
          answer:
            "No. A stream does not store data. It processes elements from a source such as a collection or array."
        },
        {
          question: "What is a stream pipeline?",
          answer:
            "A stream pipeline consists of a data source, zero or more intermediate operations, and a terminal operation."
        },
        {
          question: "What are intermediate operations?",
          answer:
            "Intermediate operations transform or filter a stream and return another stream. Examples include filter(), map(), flatMap(), distinct(), sorted(), limit(), skip(), and peek()."
        },
        {
          question: "What are terminal operations?",
          answer:
            "Terminal operations finish the stream pipeline and produce a result or side effect. Examples include forEach(), collect(), reduce(), and count()."
        },
        {
          question: "What is filter()?",
          answer:
            "filter() is an intermediate operation that selects elements based on a Predicate."
        },
        {
          question: "What is the difference between map() and flatMap()?",
          answer:
            "map() transforms each element into another value, while flatMap() transforms elements and flattens nested streams into a single stream."
        },
        {
          question: "What does distinct() do?",
          answer:
            "distinct() removes duplicate elements from a stream."
        },
        {
          question: "What does sorted() do?",
          answer:
            "sorted() orders stream elements according to their natural ordering or a supplied Comparator."
        },
        {
          question: "What is the purpose of limit()?",
          answer:
            "limit() restricts the stream to a maximum number of elements."
        },
        {
          question: "What is the purpose of skip()?",
          answer:
            "skip() ignores a specified number of elements from the beginning of the stream."
        },
        {
          question: "What is peek() used for?",
          answer:
            "peek() is mainly used to observe elements as they pass through a stream pipeline, especially for debugging."
        },
        {
          question: "Is peek() a terminal operation?",
          answer:
            "No. peek() is an intermediate operation and requires a terminal operation to trigger processing."
        },
        {
          question: "Why are intermediate operations called lazy?",
          answer:
            "Intermediate operations do not normally execute immediately. They are evaluated when a terminal operation triggers the stream pipeline."
        },
        {
          question: "Can a Stream be reused?",
          answer:
            "Normally no. After a terminal operation consumes a stream, attempting to use the same stream again can result in IllegalStateException."
        },
        {
          question: "Is forEach() an intermediate or terminal operation?",
          answer:
            "forEach() is a terminal operation because it consumes the stream and performs an action on its elements."
        }
      ]
    }
  ]
};