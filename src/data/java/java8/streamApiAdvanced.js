export const streamApiAdvanced = {
  id: "stream-api-advanced",
  title: "Stream API Advanced",
  slug: "stream-api-advanced",
  topicTitle: "Java 8",
  estimatedTime: "60 min",

  description:
    "Learn advanced Java 8 Stream API operations including reduce(), collect(), Collectors, grouping, partitioning, mapping, summarizing, custom collectors, and parallel stream processing.",

  sections: [
    {
      id: "reduce",
      title: "reduce()",

      paragraphs: [
        "The reduce() operation combines the elements of a stream into a single result.",
        "It is commonly used for operations such as calculating a sum, product, maximum, minimum, or combining values into one result.",
        "reduce() is a terminal operation."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 20, 30, 40);

        int sum =
                numbers.stream()
                       .reduce(0, (a, b) -> a + b);

        System.out.println(sum);
    }
}`
      },

      output: `100`,

      bullets: [
        "reduce() combines stream elements into one result.",
        "It can receive an identity value.",
        "The accumulator defines how values are combined.",
        "reduce() is useful for aggregation."
      ]
    },

    {
      id: "reduce-product",
      title: "reduce() with Product",

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(2, 3, 4, 5);

int product =
        numbers.stream()
               .reduce(1, (a, b) -> a * b);

System.out.println(product);`
      },

      output: `120`,

      paragraphs: [
        "The identity value is 1 because multiplying by 1 does not change the result."
      ]
    },

    {
      id: "reduce-max-min",
      title: "reduce() for Maximum and Minimum",

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 50, 20, 80, 30);

int maximum =
        numbers.stream()
               .reduce(Integer.MIN_VALUE,
                       Integer::max);

int minimum =
        numbers.stream()
               .reduce(Integer.MAX_VALUE,
                       Integer::min);

System.out.println(maximum);
System.out.println(minimum);`
      },

      output: `80
10`
    },

    {
      id: "collect",
      title: "collect()",

      paragraphs: [
        "The collect() operation is a terminal operation used to accumulate stream elements into a result such as a List, Set, Map, String, or another data structure.",
        "The Collectors utility class provides many ready-made collectors for common operations."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "Java",
                        "Spring",
                        "React"
                );

        List<String> result =
                names.stream()
                     .collect(Collectors.toList());

        System.out.println(result);
    }
}`
      },

      output: `[Java, Spring, React]`
    },

    {
      id: "collectors",
      title: "Collectors",

      paragraphs: [
        "Collectors is a utility class in java.util.stream that provides implementations of Collector used by collect().",
        "It provides collectors for creating collections, joining strings, counting elements, calculating statistics, grouping elements, partitioning elements, and transforming collected results."
      ],

      bullets: [
        "Collectors.toList()",
        "Collectors.toSet()",
        "Collectors.joining()",
        "Collectors.counting()",
        "Collectors.summingInt()",
        "Collectors.averagingInt()",
        "Collectors.summarizingInt()",
        "Collectors.groupingBy()",
        "Collectors.partitioningBy()",
        "Collectors.mapping()",
        "Collectors.collectingAndThen()"
      ]
    },

    {
      id: "to-list",
      title: "toList()",

      paragraphs: [
        "Collectors.toList() collects stream elements into a List."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList("Java", "Spring", "React");

List<String> result =
        names.stream()
             .collect(Collectors.toList());

System.out.println(result);`
      },

      output: `[Java, Spring, React]`
    },

    {
      id: "to-set",
      title: "toSet()",

      paragraphs: [
        "Collectors.toSet() collects stream elements into a Set, which removes duplicate values according to Set semantics."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 10, 30, 20);

Set<Integer> result =
        numbers.stream()
               .collect(Collectors.toSet());

System.out.println(result);`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "joining",
      title: "joining()",

      paragraphs: [
        "Collectors.joining() combines String elements into a single String."
      ],

      code: {
        language: "java",
        code: `List<String> languages =
        Arrays.asList("Java", "Spring", "React");

String result =
        languages.stream()
                 .collect(Collectors.joining(", "));

System.out.println(result);`
      },

      output: `Java, Spring, React`
    },

    {
      id: "counting",
      title: "counting()",

      paragraphs: [
        "Collectors.counting() counts the number of elements in a stream."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList("Amit", "Rahul", "Priya");

long count =
        names.stream()
             .collect(Collectors.counting());

System.out.println(count);`
      },

      output: `3`
    },

    {
      id: "summing-int",
      title: "summingInt()",

      paragraphs: [
        "Collectors.summingInt() calculates the sum of integer values extracted from stream elements."
      ],

      code: {
        language: "java",
        code: `List<Integer> salaries =
        Arrays.asList(30000, 40000, 50000);

int total =
        salaries.stream()
                .collect(Collectors.summingInt(
                        Integer::intValue
                ));

System.out.println(total);`
      },

      output: `120000`
    },

    {
      id: "averaging-int",
      title: "averagingInt()",

      paragraphs: [
        "Collectors.averagingInt() calculates the average of integer values extracted from stream elements."
      ],

      code: {
        language: "java",
        code: `List<Integer> marks =
        Arrays.asList(70, 80, 90);

double average =
        marks.stream()
             .collect(Collectors.averagingInt(
                     Integer::intValue
             ));

System.out.println(average);`
      },

      output: `80.0`
    },

    {
      id: "summarizing-int",
      title: "summarizingInt()",

      paragraphs: [
        "Collectors.summarizingInt() produces an IntSummaryStatistics object containing count, sum, minimum, maximum, and average."
      ],

      code: {
        language: "java",
        code: `import java.util.IntSummaryStatistics;

List<Integer> marks =
        Arrays.asList(70, 80, 90);

IntSummaryStatistics statistics =
        marks.stream()
             .collect(Collectors.summarizingInt(
                     Integer::intValue
             ));

System.out.println(
        "Count: " + statistics.getCount()
);

System.out.println(
        "Sum: " + statistics.getSum()
);

System.out.println(
        "Min: " + statistics.getMin()
);

System.out.println(
        "Max: " + statistics.getMax()
);

System.out.println(
        "Average: " + statistics.getAverage()
);`
      },

      output: `Count: 3
Sum: 240
Min: 70
Max: 90
Average: 80.0`
    },

    {
      id: "grouping-by",
      title: "groupingBy()",

      paragraphs: [
        "Collectors.groupingBy() groups stream elements according to a classification function.",
        "It is one of the most important collectors for real-world backend data processing."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class Employee {

    private String name;
    private String department;

    Employee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    @Override
    public String toString() {
        return name;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Employee> employees =
                Arrays.asList(
                        new Employee("Amit", "IT"),
                        new Employee("Rahul", "HR"),
                        new Employee("Priya", "IT"),
                        new Employee("Neha", "HR")
                );

        Map<String, List<Employee>> result =
                employees.stream()
                         .collect(
                             Collectors.groupingBy(
                                 Employee::getDepartment
                             )
                         );

        System.out.println(result);
    }
}`
      },

      output: `{HR=[Rahul, Neha], IT=[Amit, Priya]}`,

      bullets: [
        "groupingBy() returns a Map.",
        "The key is generated by the classification function.",
        "The default downstream collector groups values into Lists.",
        "It is useful for categorizing objects."
      ]
    },

    {
      id: "grouping-by-counting",
      title: "groupingBy() with counting()",

      paragraphs: [
        "A downstream collector can be supplied to groupingBy().",
        "groupingBy() combined with counting() can be used to count how many elements belong to each group."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList(
                "Java",
                "Spring",
                "Java",
                "React",
                "Spring",
                "Java"
        );

Map<String, Long> result =
        names.stream()
             .collect(
                 Collectors.groupingBy(
                     name -> name,
                     Collectors.counting()
                 )
             );

System.out.println(result);`
      },

      output: `{Java=3, Spring=2, React=1}`
    },

    {
      id: "partitioning-by",
      title: "partitioningBy()",

      paragraphs: [
        "Collectors.partitioningBy() divides stream elements into exactly two groups based on a Predicate.",
        "The result is a Map<Boolean, List<T>> by default."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 15, 20, 25, 30);

Map<Boolean, List<Integer>> result =
        numbers.stream()
               .collect(
                   Collectors.partitioningBy(
                       number -> number % 2 == 0
                   )
               );

System.out.println(result);`
      },

      output: `{false=[15, 25], true=[10, 20, 30]}`,

      bullets: [
        "groupingBy() can create many groups.",
        "partitioningBy() creates two groups: true and false.",
        "partitioningBy() accepts a Predicate."
      ]
    },

    {
      id: "mapping",
      title: "mapping() Collector",

      paragraphs: [
        "Collectors.mapping() is a downstream collector used to transform elements before passing them to another collector.",
        "It is particularly useful with groupingBy()."
      ],

      code: {
        language: "java",
        code: `class Employee {

    private String name;
    private String department;

    Employee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }
}

List<Employee> employees =
        Arrays.asList(
                new Employee("Amit", "IT"),
                new Employee("Rahul", "HR"),
                new Employee("Priya", "IT")
        );

Map<String, List<String>> result =
        employees.stream()
                 .collect(
                     Collectors.groupingBy(
                         Employee::getDepartment,
                         Collectors.mapping(
                             Employee::getName,
                             Collectors.toList()
                         )
                     )
                 );

System.out.println(result);`
      },

      output: `{HR=[Rahul], IT=[Amit, Priya]}`
    },

    {
      id: "collecting-and-then",
      title: "collectingAndThen()",

      paragraphs: [
        "Collectors.collectingAndThen() allows an additional finishing transformation to be applied after another collector has completed its collection process."
      ],

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList(
                "Java",
                "Spring",
                "React"
        );

List<String> result =
        names.stream()
             .collect(
                 Collectors.collectingAndThen(
                     Collectors.toList(),
                     list -> {
                         List<String> copy =
                                 new java.util.ArrayList<>(list);

                         return java.util.Collections
                                 .unmodifiableList(copy);
                     }
                 )
             );

System.out.println(result);`
      },

      output: `[Java, Spring, React]`,

      paragraphs: [
        "The first collector creates the List. The finishing function then converts the result into an unmodifiable List."
      ]
    },

    {
      id: "custom-collector-basics",
      title: "Custom Collector Basics",

      paragraphs: [
        "Java provides many predefined collectors, but custom collectors can be created when the built-in collectors do not satisfy a specific requirement.",
        "A Collector describes how stream elements are accumulated into a result.",
        "The Collector interface defines the components needed to perform this process, including a supplier, accumulator, combiner, and finisher."
      ],

      code: {
        language: "java",
        code: `import java.util.stream.Collector;
import java.util.stream.Collectors;

Collector<String, ?, String> collector =
        Collectors.joining(" - ");

String result =
        java.util.Arrays
             .asList("Java", "Spring", "React")
             .stream()
             .collect(collector);

System.out.println(result);`
      },

      output: `Java - Spring - React`,

      bullets: [
        "Supplier creates the mutable result container.",
        "Accumulator adds an element to the result container.",
        "Combiner combines partial results, especially during parallel processing.",
        "Finisher converts the intermediate result into the final result when required.",
        "Characteristics describe properties of a collector."
      ]
    },

    {
      id: "parallel-streams",
      title: "Parallel Streams",

      paragraphs: [
        "A parallel stream divides stream processing into multiple tasks that can be executed concurrently.",
        "Parallel streams can be created using parallelStream() or by calling parallel() on an existing stream.",
        "Parallel processing can be useful for suitable CPU-intensive workloads, but it is not automatically faster than sequential processing."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(
                        10, 20, 30, 40, 50
                );

        numbers.parallelStream()
                .forEach(
                    number ->
                        System.out.println(
                            Thread.currentThread()
                                    .getName()
                            + " -> "
                            + number
                        )
                );
    }
}`
      },

      bullets: [
        "parallelStream() creates a parallel stream.",
        "parallel() converts a sequential stream into a parallel stream.",
        "Parallel execution may use multiple threads.",
        "Output order with forEach() is not guaranteed for parallel streams.",
        "Parallel streams should be used only when parallel processing is appropriate."
      ]
    },

    {
      id: "parallel-stream-reduction",
      title: "Reduction with Parallel Streams",

      paragraphs: [
        "Reduction operations can be executed in parallel when the operation is suitable for parallel processing.",
        "The reduction operation should be associative and compatible with the identity value."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5);

int sum =
        numbers.parallelStream()
               .reduce(
                   0,
                   Integer::sum
               );

System.out.println(sum);`
      },

      output: `15`
    },

    {
      id: "parallel-stream-caution",
      title: "Parallel Stream Cautions",

      paragraphs: [
        "Parallel streams should not be used blindly. Shared mutable state can introduce race conditions and incorrect results.",
        "Operations that have side effects are especially risky when executed in parallel."
      ],

      code: {
        language: "java",
        code: `// Avoid shared mutable state

List<Integer> result =
        new java.util.ArrayList<>();

numbers.parallelStream()
       .forEach(
           number -> result.add(number)
       );

// The result can be affected by
// concurrent modification and race conditions.`
      },

      bullets: [
        "Prefer stateless stream operations.",
        "Avoid modifying shared mutable collections.",
        "Consider the cost of splitting and combining work.",
        "Consider ordering requirements.",
        "Measure performance instead of assuming parallel processing is faster."
      ]
    },

    {
      id: "advanced-stream-combination",
      title: "Combining Advanced Stream Operations",

      paragraphs: [
        "Real applications often combine multiple stream operations and collectors in a single pipeline."
      ],

      code: {
        language: "java",
        code: `class Employee {

    private String name;
    private String department;
    private int salary;

    Employee(
            String name,
            String department,
            int salary
    ) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public int getSalary() {
        return salary;
    }
}

List<Employee> employees =
        Arrays.asList(
                new Employee("Amit", "IT", 50000),
                new Employee("Rahul", "HR", 40000),
                new Employee("Priya", "IT", 70000),
                new Employee("Neha", "HR", 45000)
        );

Map<String, Long> result =
        employees.stream()
                 .filter(e -> e.getSalary() >= 45000)
                 .collect(
                     Collectors.groupingBy(
                         Employee::getDepartment,
                         Collectors.counting()
                     )
                 );

System.out.println(result);`
      },

      output: `{HR=1, IT=2}`,

      paragraphs: [
        "This example first filters employees based on salary and then groups the remaining employees by department while counting them."
      ]
    },

    {
      id: "advanced-stream-mental-model",
      title: "Advanced Stream Mental Model",

      code: {
        language: "text",
        code: `Source
   ↓
Intermediate Operations
   ↓
Transformation / Filtering
   ↓
Terminal Operation
   ↓
Collector / Reduction
   ↓
Final Result

Examples:

filter()
map()
flatMap()
distinct()
sorted()
limit()
skip()
        ↓
collect()
reduce()
        ↓
List / Set / Map / String / Number`
      },

      paragraphs: [
        "A useful way to understand advanced streams is to separate transformation from result creation. Intermediate operations prepare the data, while terminal operations such as collect() and reduce() produce the final result."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "reduce() combines stream elements into a single result.",
        "collect() accumulates stream elements into a result container.",
        "Collectors provides reusable implementations for common collection operations.",
        "toList() collects elements into a List.",
        "toSet() collects elements into a Set.",
        "joining() combines String elements into one String.",
        "counting() counts elements.",
        "summingInt() calculates an integer sum.",
        "averagingInt() calculates an average.",
        "summarizingInt() provides count, sum, minimum, maximum, and average.",
        "groupingBy() creates groups using a classification function.",
        "partitioningBy() divides elements into true and false groups.",
        "mapping() transforms elements before passing them to a downstream collector.",
        "collectingAndThen() performs a finishing transformation after collection.",
        "Custom collectors can implement specialized accumulation logic.",
        "Parallel streams can process suitable workloads concurrently.",
        "Parallel streams do not automatically guarantee better performance.",
        "Avoid shared mutable state in parallel stream operations.",
        "Reduction operations used in parallel should be suitable for parallel combination."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is reduce() in Java Stream API?",
          answer:
            "reduce() is a terminal operation that combines stream elements into a single result, such as a sum, product, minimum, or maximum."
        },
        {
          question: "What is the difference between reduce() and collect()?",
          answer:
            "reduce() is generally used to combine elements into one result, while collect() is used to accumulate elements into a mutable result container such as a List, Set, Map, or String."
        },
        {
          question: "What is Collectors?",
          answer:
            "Collectors is a utility class in java.util.stream that provides implementations of Collector for common stream collection and aggregation operations."
        },
        {
          question: "What does groupingBy() do?",
          answer:
            "groupingBy() classifies stream elements using a function and produces groups represented by a Map."
        },
        {
          question: "What is the difference between groupingBy() and partitioningBy()?",
          answer:
            "groupingBy() can create multiple groups based on a classification key, while partitioningBy() divides elements into two groups based on a boolean Predicate."
        },
        {
          question: "What is downstream collection?",
          answer:
            "A downstream collector is a collector supplied to another collector, such as groupingBy() with counting(), mapping(), or toList()."
        },
        {
          question: "What is mapping() collector?",
          answer:
            "mapping() transforms elements before passing them to a downstream collector."
        },
        {
          question: "What is collectingAndThen()?",
          answer:
            "collectingAndThen() applies a finishing transformation to the result produced by another collector."
        },
        {
          question: "What is summarizingInt()?",
          answer:
            "summarizingInt() produces IntSummaryStatistics containing count, sum, minimum, maximum, and average."
        },
        {
          question: "What is a parallel stream?",
          answer:
            "A parallel stream divides stream processing into tasks that can execute concurrently using multiple threads."
        },
        {
          question: "Does a parallel stream always improve performance?",
          answer:
            "No. Performance depends on factors such as data size, operation cost, splitting overhead, available CPU resources, ordering requirements, and the cost of combining results."
        },
        {
          question: "What are the risks of using shared mutable state with parallel streams?",
          answer:
            "Concurrent modifications can introduce race conditions and produce incorrect or unpredictable results."
        },
        {
          question: "What is a custom Collector?",
          answer:
            "A custom Collector defines specialized logic for accumulating stream elements into a result when the built-in collectors do not satisfy the requirement."
        },
        {
          question: "What are the main components of a Collector?",
          answer:
            "The main components are a supplier, accumulator, combiner, and optional finisher, along with collector characteristics."
        },
        {
          question: "What is a downstream collector?",
          answer:
            "A downstream collector is applied inside another collector, commonly with groupingBy() or partitioningBy(), to process the elements belonging to each group."
        },
        {
          question: "Give a real-world use case for groupingBy().",
          answer:
            "An employee list can be grouped by department, a list of orders can be grouped by customer, or products can be grouped by category."
        }
      ]
    }
  ]
};