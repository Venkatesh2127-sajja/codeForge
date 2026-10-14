export const java8AdvancedConcepts = {
  id: "java-8-advanced-concepts",
  title: "Java 8 Advanced Concepts",
  slug: "java-8-advanced-concepts",
  topicTitle: "Java 8",
  estimatedTime: "45 min",

  description:
    "Learn advanced Java 8 concepts including stream laziness, short-circuit operations, stateful and stateless stream operations, sequential and parallel streams, ForkJoinPool, Spliterator, and primitive streams.",

  sections: [
    {
      id: "stream-laziness",
      title: "Stream Laziness",

      paragraphs: [
        "Java Streams are lazy. Intermediate operations such as filter(), map(), sorted(), and distinct() do not execute immediately when they are declared.",
        "The operations are executed only when a terminal operation such as collect(), forEach(), count(), findFirst(), or reduce() is invoked.",
        "This lazy behavior allows Java to build and optimize a stream pipeline before processing the elements."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(1, 2, 3, 4, 5);

        numbers.stream()
                .filter(number -> {
                    System.out.println("Filtering: " + number);
                    return number > 2;
                })
                .map(number -> {
                    System.out.println("Mapping: " + number);
                    return number * 10;
                })
                .forEach(System.out::println);
    }
}`
      },

      output: `Filtering: 1
Filtering: 2
Filtering: 3
Mapping: 3
30
Filtering: 4
Mapping: 4
40
Filtering: 5
Mapping: 5
50`,

      bullets: [
        "Intermediate operations are lazy.",
        "Terminal operations trigger stream execution.",
        "A stream pipeline is evaluated only when required.",
        "Laziness can avoid unnecessary processing."
      ]
    },

    {
      id: "stream-pipeline-execution",
      title: "How a Stream Pipeline Executes",

      paragraphs: [
        "A stream pipeline normally contains a source, zero or more intermediate operations, and one terminal operation.",
        "Java generally processes elements through the pipeline rather than completing one intermediate operation for every element before moving to the next."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5);

numbers.stream()
        .filter(n -> n > 2)
        .map(n -> n * 10)
        .forEach(System.out::println);`
      },

      output: `30
40
50`,

      bullets: [
        "Source → numbers",
        "Intermediate operation → filter()",
        "Intermediate operation → map()",
        "Terminal operation → forEach()"
      ]
    },

    {
      id: "short-circuit-operations",
      title: "Short-Circuit Operations",

      paragraphs: [
        "A short-circuit operation can stop processing once the required result has been determined.",
        "Examples include anyMatch(), allMatch(), noneMatch(), findFirst(), and findAny().",
        "Short-circuiting can significantly reduce the amount of work performed by a stream pipeline."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 30, 40, 50);

boolean result =
        numbers.stream()
                .anyMatch(n -> n > 25);

System.out.println(result);`
      },

      output: `true`
    },

    {
      id: "find-first-short-circuit",
      title: "findFirst() and Short-Circuiting",

      paragraphs: [
        "findFirst() returns the first element that matches the preceding stream operations.",
        "Once the required result is found, the stream does not need to process the remaining elements."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(5, 10, 15, 20, 25);

int result =
        numbers.stream()
                .filter(n -> n > 12)
                .findFirst()
                .orElse(-1);

System.out.println(result);`
      },

      output: `15`
    },

    {
      id: "stateful-vs-stateless",
      title: "Stateful vs Stateless Operations",

      paragraphs: [
        "Stream intermediate operations can be broadly understood as stateless or stateful.",
        "A stateless operation can process an element without depending on information about other elements.",
        "A stateful operation may need to remember or inspect information from multiple elements before producing its result."
      ],

      code: {
        language: "text",
        code: `Stateless Operations

filter()
map()
flatMap()
peek()


Stateful Operations

sorted()
distinct()
limit()
skip()`
      },

      bullets: [
        "filter() is generally stateless.",
        "map() is generally stateless.",
        "sorted() requires ordering information.",
        "distinct() needs to track previously seen elements.",
        "Stateful operations can require additional memory or processing."
      ]
    },

    {
      id: "sequential-streams",
      title: "Sequential Streams",

      paragraphs: [
        "A sequential stream processes elements using a sequential execution model.",
        "By default, streams created using collection.stream() are sequential unless they are explicitly converted to parallel."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5);

numbers.stream()
        .forEach(System.out::println);`
      },

      output: `1
2
3
4
5`,

      bullets: [
        "Sequential streams are the default for normal stream creation.",
        "They are easier to reason about.",
        "Ordering behavior is generally straightforward.",
        "Sequential execution is often sufficient for normal-sized data."
      ]
    },

    {
      id: "parallel-streams",
      title: "Parallel Streams",

      paragraphs: [
        "A parallel stream allows stream processing to be divided across multiple threads.",
        "Parallel streams can be useful for suitable CPU-intensive operations over sufficiently large datasets.",
        "Parallel execution does not automatically make every stream operation faster."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5);

numbers.parallelStream()
        .forEach(number ->
                System.out.println(
                        Thread.currentThread().getName()
                        + " -> "
                        + number
                )
        );`
      },

      output: `Example output; thread names and order may vary.`,

      bullets: [
        "parallelStream() creates a parallel stream.",
        "Processing may occur on multiple threads.",
        "Output order with forEach() is not guaranteed.",
        "Parallel streams should be measured rather than assumed to be faster."
      ]
    },

    {
      id: "parallel-stream-order",
      title: "forEach() vs forEachOrdered()",

      paragraphs: [
        "When using a parallel stream, forEach() does not guarantee encounter order.",
        "forEachOrdered() preserves the encounter order when the stream has an encounter order, although maintaining order can reduce some benefits of parallel execution."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5);

numbers.parallelStream()
        .forEachOrdered(System.out::println);`
      },

      output: `1
2
3
4
5`
    },

    {
      id: "parallel-stream-internals",
      title: "Parallel Stream Internals",

      paragraphs: [
        "Parallel streams use Java's fork/join framework to divide work into smaller tasks and process those tasks concurrently.",
        "The stream implementation splits the source into portions, processes those portions, and combines the results when required.",
        "The exact execution strategy depends on the stream operation, source, and available resources."
      ],

      bullets: [
        "The source is divided into smaller portions.",
        "Tasks can be processed concurrently.",
        "Results may need to be combined.",
        "Ordering and stateful operations can affect parallel performance.",
        "Parallelism introduces coordination overhead."
      ]
    },

    {
      id: "forkjoin-pool",
      title: "ForkJoinPool",

      paragraphs: [
        "ForkJoinPool is a framework designed for parallel task execution using a work-stealing approach.",
        "Parallel streams use the common ForkJoinPool by default.",
        "Worker threads can steal available tasks from other workers when they become idle."
      ],

      code: {
        language: "java",
        code: `import java.util.concurrent.ForkJoinPool;

public class Main {

    public static void main(String[] args) {

        ForkJoinPool pool =
                ForkJoinPool.commonPool();

        System.out.println(
                pool.getParallelism()
        );
    }
}`
      },

      output: `Example output depends on the runtime environment.`
    },

    {
      id: "work-stealing",
      title: "Work Stealing",

      paragraphs: [
        "Work stealing is a technique used by ForkJoinPool where worker threads can take available tasks from other workers' task queues.",
        "This helps keep worker threads busy when the amount of work assigned to different tasks is uneven."
      ],

      bullets: [
        "ForkJoinPool maintains tasks for worker threads.",
        "An idle worker can steal work from another worker.",
        "Work stealing helps improve utilization.",
        "Parallel stream execution uses the common ForkJoinPool by default."
      ]
    },

    {
      id: "when-parallel-streams",
      title: "When Should You Use Parallel Streams?",

      paragraphs: [
        "Parallel streams should be considered when the workload is appropriate for parallel execution and measurements show a benefit.",
        "Large datasets, CPU-intensive independent operations, and operations with limited synchronization can be better candidates.",
        "Small datasets or I/O-heavy operations may not benefit and can sometimes perform worse because of parallel execution overhead."
      ],

      bullets: [
        "Consider the size of the dataset.",
        "Consider whether operations are CPU-intensive.",
        "Prefer independent operations.",
        "Avoid unnecessary shared mutable state.",
        "Benchmark before and after introducing parallelism.",
        "Consider application-wide thread-pool usage before relying heavily on parallel streams."
      ]
    },

    {
      id: "spliterator",
      title: "Spliterator",

      paragraphs: [
        "Spliterator stands for Splittable Iterator.",
        "It is an interface introduced in Java 8 for traversing and partitioning elements of a source.",
        "Spliterator is particularly useful for supporting parallel processing because it can split a source into smaller portions."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.Spliterator;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "A",
                        "B",
                        "C",
                        "D"
                );

        Spliterator<String> spliterator =
                names.spliterator();

        spliterator.forEachRemaining(
                System.out::println
        );
    }
}`
      },

      output: `A
B
C
D`
    },

    {
      id: "spliterator-try-split",
      title: "trySplit() in Spliterator",

      paragraphs: [
        "The trySplit() method attempts to split a Spliterator into two parts.",
        "One Spliterator continues processing one portion while the returned Spliterator represents another portion when splitting is possible."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5, 6);

Spliterator<Integer> first =
        numbers.spliterator();

Spliterator<Integer> second =
        first.trySplit();

if (second != null) {

    second.forEachRemaining(
            System.out::println
    );
}

first.forEachRemaining(
        System.out::println
);`
      },

      output: `Example partitioning may vary depending on the Spliterator implementation.`
    },

    {
      id: "spliterator-characteristics",
      title: "Spliterator Characteristics",

      paragraphs: [
        "A Spliterator can expose characteristics describing properties of the source.",
        "Examples include ORDERED, DISTINCT, SORTED, SIZED, NONNULL, IMMUTABLE, CONCURRENT, and SUBSIZED."
      ],

      bullets: [
        "ORDERED → elements have a defined encounter order.",
        "DISTINCT → elements are known to be distinct.",
        "SORTED → elements have a known sorting order.",
        "SIZED → exact size is known.",
        "NONNULL → source is known not to contain null elements.",
        "IMMUTABLE → source cannot be structurally modified.",
        "CONCURRENT → source can be safely modified concurrently.",
        "SUBSIZED → split portions are also sized."
      ]
    },

    {
      id: "primitive-streams",
      title: "Primitive Streams",

      paragraphs: [
        "Java 8 provides specialized streams for primitive values: IntStream, LongStream, and DoubleStream.",
        "These streams can avoid some boxing and unboxing overhead when processing primitive numeric data."
      ],

      code: {
        language: "java",
        code: `import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        int sum =
                IntStream.rangeClosed(1, 5)
                        .sum();

        System.out.println(sum);
    }
}`
      },

      output: `15`
    },

    {
      id: "intstream",
      title: "IntStream",

      paragraphs: [
        "IntStream is a specialized stream for int values.",
        "It provides operations such as range(), rangeClosed(), sum(), average(), min(), max(), and summaryStatistics()."
      ],

      code: {
        language: "java",
        code: `import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {

        IntStream.rangeClosed(1, 5)
                .forEach(System.out::println);

        int sum =
                IntStream.rangeClosed(1, 5)
                        .sum();

        System.out.println("Sum: " + sum);
    }
}`
      },

      output: `1
2
3
4
5
Sum: 15`
    },

    {
      id: "longstream",
      title: "LongStream",

      paragraphs: [
        "LongStream is a specialized stream for long values.",
        "It is useful when processing numeric values that require the long primitive type."
      ],

      code: {
        language: "java",
        code: `import java.util.stream.LongStream;

public class Main {

    public static void main(String[] args) {

        long sum =
                LongStream.rangeClosed(1, 5)
                        .sum();

        System.out.println(sum);
    }
}`
      },

      output: `15`
    },

    {
      id: "doublestream",
      title: "DoubleStream",

      paragraphs: [
        "DoubleStream is a specialized stream for double values.",
        "It provides numeric operations such as sum(), average(), min(), max(), and summaryStatistics()."
      ],

      code: {
        language: "java",
        code: `import java.util.stream.DoubleStream;

public class Main {

    public static void main(String[] args) {

        double average =
                DoubleStream.of(
                        10.0,
                        20.0,
                        30.0
                ).average()
                 .orElse(0.0);

        System.out.println(average);
    }
}`
      },

      output: `20.0`
    },

    {
      id: "boxed-and-maptoobj",
      title: "Boxing and Mapping Primitive Streams",

      paragraphs: [
        "Primitive streams can be converted into object streams when object-based operations are required.",
        "The boxed() method converts primitive elements into their wrapper types.",
        "Methods such as mapToInt(), mapToLong(), and mapToDouble() convert object streams into primitive streams."
      ],

      code: {
        language: "java",
        code: `List<String> numbers =
        Arrays.asList("10", "20", "30");

int sum =
        numbers.stream()
                .mapToInt(Integer::parseInt)
                .sum();

System.out.println(sum);`
      },

      output: `60`
    },

    {
      id: "primitive-vs-object-streams",
      title: "Primitive Streams vs Object Streams",

      code: {
        language: "text",
        code: `Object Stream

Stream<Integer>


Primitive Streams

IntStream
LongStream
DoubleStream`
      },

      bullets: [
        "Stream<Integer> stores Integer objects.",
        "IntStream works directly with int values.",
        "LongStream works directly with long values.",
        "DoubleStream works directly with double values.",
        "Primitive streams provide specialized numeric operations.",
        "Use primitive streams when processing large amounts of primitive numeric data."
      ]
    },

    {
      id: "advanced-stream-example",
      title: "Complete Advanced Stream Example",

      paragraphs: [
        "The following example combines filtering, mapping, a primitive stream, and a terminal operation."
      ],

      code: {
        language: "java",
        code: `List<String> prices =
        Arrays.asList(
                "100",
                "250",
                "500",
                "50"
        );

int total =
        prices.stream()
                .mapToInt(Integer::parseInt)
                .filter(price -> price >= 100)
                .sum();

System.out.println(total);`
      },

      output: `850`
    },

    {
      id: "best-practices",
      title: "Java 8 Advanced Stream Best Practices",

      bullets: [
        "Understand stream laziness before debugging a stream pipeline.",
        "Use short-circuit operations when only part of the data is required.",
        "Avoid unnecessary stateful operations when a simpler pipeline is possible.",
        "Do not assume parallel streams are automatically faster.",
        "Benchmark parallel streams with realistic workloads.",
        "Avoid shared mutable state inside parallel stream operations.",
        "Be careful with ordering requirements in parallel streams.",
        "Use primitive streams for suitable numeric processing.",
        "Use Spliterator when implementing advanced source traversal or custom parallel processing.",
        "Keep stream pipelines readable instead of creating unnecessarily complex chains."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Intermediate stream operations are lazy.",
        "Terminal operations trigger stream processing.",
        "Short-circuit operations can stop processing early.",
        "filter() and map() are generally stateless operations.",
        "sorted() and distinct() are examples of stateful operations.",
        "Sequential streams execute using a sequential execution model.",
        "parallelStream() enables parallel stream processing.",
        "Parallel streams use the ForkJoin framework internally.",
        "The common ForkJoinPool is used by default for parallel streams.",
        "Work stealing helps ForkJoinPool distribute available tasks.",
        "Spliterator supports traversal and splitting of data sources.",
        "IntStream, LongStream, and DoubleStream are primitive specialized streams.",
        "Parallel processing introduces overhead and should be benchmarked.",
        "forEach() does not guarantee encounter order for parallel streams.",
        "forEachOrdered() can preserve encounter order when applicable."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What does lazy evaluation mean in Java Streams?",
          answer:
            "Intermediate stream operations are not executed immediately. They are evaluated when a terminal operation is invoked."
        },
        {
          question: "What is a short-circuit operation?",
          answer:
            "A short-circuit operation can stop stream processing once the required result is determined. Examples include anyMatch(), allMatch(), noneMatch(), findFirst(), and findAny()."
        },
        {
          question: "What is the difference between stateless and stateful stream operations?",
          answer:
            "Stateless operations such as filter() and map() can process elements without maintaining information about other elements. Stateful operations such as sorted() and distinct() may need information about multiple elements."
        },
        {
          question: "What is a parallel stream?",
          answer:
            "A parallel stream divides stream processing into tasks that can execute concurrently across multiple threads."
        },
        {
          question: "Are parallel streams always faster?",
          answer:
            "No. Parallel execution introduces overhead and may be slower for small datasets, simple operations, or workloads that require significant coordination."
        },
        {
          question: "Which thread pool is used by parallel streams?",
          answer:
            "Parallel streams use the common ForkJoinPool by default."
        },
        {
          question: "What is ForkJoinPool?",
          answer:
            "ForkJoinPool is a framework for parallel task execution based on dividing tasks into smaller tasks and using work stealing to keep worker threads productive."
        },
        {
          question: "What is work stealing?",
          answer:
            "Work stealing allows an idle worker thread to take available tasks from another worker's task queue."
        },
        {
          question: "What is Spliterator?",
          answer:
            "Spliterator is a Java 8 interface for traversing and partitioning elements of a data source. It is useful for supporting parallel processing."
        },
        {
          question: "What does trySplit() do?",
          answer:
            "trySplit() attempts to partition a Spliterator into two portions and returns a new Spliterator representing one portion when splitting is possible."
        },
        {
          question: "What are primitive streams?",
          answer:
            "Primitive streams are specialized streams for numeric primitive types: IntStream for int, LongStream for long, and DoubleStream for double."
        },
        {
          question: "Why use IntStream instead of Stream<Integer>?",
          answer:
            "IntStream is specialized for int values and can avoid some boxing and unboxing overhead while providing numeric operations such as sum(), average(), min(), and max()."
        },
        {
          question: "What is the difference between range() and rangeClosed() in IntStream?",
          answer:
            "range(start, end) excludes the end value, while rangeClosed(start, end) includes the end value."
        },
        {
          question: "What is the difference between forEach() and forEachOrdered()?",
          answer:
            "forEach() does not guarantee encounter order in parallel execution, while forEachOrdered() preserves encounter order when the stream has an encounter order."
        },
        {
          question: "When should you avoid parallel streams?",
          answer:
            "They may be inappropriate for small datasets, simple operations, blocking or I/O-heavy work, operations with shared mutable state, or workloads where parallelization overhead outweighs the benefit."
        }
      ]
    }
  ]
};