export const java8InterviewPreparation = {
  id: "java-8-interview-preparation",
  title: "Java 8 Interview Preparation",
  slug: "java-8-interview-preparation",
  topicTitle: "Java 8",
  estimatedTime: "60 min",

  description:
    "Prepare for Java 8 interviews with focused questions and practical coding problems covering Lambda expressions, functional interfaces, Stream API, Optional, Date-Time API, parallel streams, CompletableFuture, collectors, and real-world backend scenarios.",

  sections: [
    {
      id: "java8-interview-overview",
      title: "Java 8 Interview Overview",

      paragraphs: [
        "Java 8 introduced several major language and library improvements, especially lambda expressions, functional interfaces, the Stream API, Optional, the new Date-Time API, default methods in interfaces, and CompletableFuture.",
        "For interviews, it is important to understand not only the syntax of these features but also when and why they should be used.",
        "Interviewers commonly combine conceptual questions with coding problems and real-world scenarios."
      ],

      bullets: [
        "Understand the reason behind each Java 8 feature.",
        "Know the difference between similar APIs.",
        "Practice Stream API coding problems.",
        "Understand Optional correctly.",
        "Know sequential versus parallel stream behavior.",
        "Understand CompletableFuture chaining.",
        "Be able to explain Java 8 features using backend examples."
      ]
    },

    {
      id: "lambda-interview-questions",
      title: "Lambda Expression Interview Questions",

      paragraphs: [
        "Lambda expressions are one of the most important Java 8 interview topics. Interviewers commonly ask about syntax, functional interfaces, variable capture, and practical usage."
      ],

      interviewQuestions: [
        {
          question: "What is a lambda expression?",
          answer:
            "A lambda expression is a concise way of representing an implementation of a functional interface."
        },
        {
          question: "Why were lambda expressions introduced?",
          answer:
            "They provide a concise way to represent behavior and support functional-style programming, especially when working with functional interfaces and streams."
        },
        {
          question: "What is the basic syntax of a lambda expression?",
          answer:
            "The general syntax is (parameters) -> expression or (parameters) -> { statements; }."
        },
        {
          question: "Can a lambda expression have multiple parameters?",
          answer:
            "Yes. Multiple parameters can be declared inside parentheses."
        },
        {
          question: "Can a lambda expression have a return value?",
          answer:
            "Yes. An expression lambda can return its expression result implicitly, while a block lambda can use an explicit return statement."
        },
        {
          question: "Can a lambda expression directly implement a class?",
          answer:
            "No. A lambda expression requires a target type that is a functional interface."
        },
        {
          question: "Can a lambda modify a local variable?",
          answer:
            "A local variable captured by a lambda must be final or effectively final."
        },
        {
          question: "Can a lambda access instance variables?",
          answer:
            "Yes. A lambda can access instance variables of the enclosing object."
        }
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                Arrays.asList(10, 20, 30);

        numbers.forEach(
                number -> System.out.println(number)
        );
    }
}`
      },

      output: `10
20
30`
    },

    {
      id: "functional-interface-interview",
      title: "Functional Interface Interview Questions",

      paragraphs: [
        "Functional interfaces are closely connected to lambda expressions. Understanding them is essential for Java 8 interviews."
      ],

      interviewQuestions: [
        {
          question: "What is a functional interface?",
          answer:
            "A functional interface is an interface containing exactly one abstract method."
        },
        {
          question: "Can a functional interface have default methods?",
          answer:
            "Yes. It can contain multiple default methods as long as it has exactly one abstract method."
        },
        {
          question: "Can a functional interface have static methods?",
          answer:
            "Yes. Static methods do not count as abstract methods."
        },
        {
          question: "What is @FunctionalInterface?",
          answer:
            "It is an annotation used to indicate that an interface is intended to be a functional interface. The compiler validates the single abstract-method requirement."
        },
        {
          question: "Name some built-in functional interfaces.",
          answer:
            "Common examples include Predicate, Consumer, Supplier, Function, BiFunction, UnaryOperator, and BinaryOperator."
        },
        {
          question: "What does Predicate represent?",
          answer:
            "Predicate represents a function that accepts one argument and returns a boolean result."
        },
        {
          question: "What does Consumer represent?",
          answer:
            "Consumer accepts an argument and performs an operation without returning a result."
        },
        {
          question: "What does Supplier represent?",
          answer:
            "Supplier provides a result without accepting an input."
        },
        {
          question: "What does Function represent?",
          answer:
            "Function accepts one argument and produces a result."
        }
      ],

      code: {
        language: "java",
        code: `import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        Predicate<Integer> positive =
                number -> number > 0;

        Function<String, Integer> length =
                String::length;

        Consumer<String> print =
                System.out::println;

        Supplier<String> message =
                () -> "Java 8";

        System.out.println(
                positive.test(10)
        );

        System.out.println(
                length.apply("Java")
        );

        print.accept("Hello");

        System.out.println(
                message.get()
        );
    }
}`
      },

      output: `true
4
Hello
Java 8`
    },

    {
      id: "stream-interview-questions",
      title: "Stream API Interview Questions",

      interviewQuestions: [
        {
          question: "What is a Stream?",
          answer:
            "A Stream is a sequence of elements that supports functional-style operations for processing data."
        },
        {
          question: "Is a Stream a data structure?",
          answer:
            "No. A Stream does not store data. It processes data from a source such as a Collection, array, or generated sequence."
        },
        {
          question: "What are intermediate operations?",
          answer:
            "Operations such as filter(), map(), sorted(), distinct(), limit(), and skip() that create another stream and are generally lazy."
        },
        {
          question: "What are terminal operations?",
          answer:
            "Operations that produce a final result or side effect and trigger stream processing, such as collect(), forEach(), reduce(), count(), findFirst(), and anyMatch()."
        },
        {
          question: "Why are streams lazy?",
          answer:
            "Lazy evaluation allows intermediate operations to be evaluated only when a terminal result is required and can avoid unnecessary processing."
        },
        {
          question: "Can a Stream be reused?",
          answer:
            "No. Once a terminal operation has consumed a stream, that stream cannot normally be reused."
        },
        {
          question: "What is the difference between map() and flatMap()?",
          answer:
            "map() transforms each element into one result, while flatMap() transforms elements into streams and then flattens those streams into a single stream."
        },
        {
          question: "What does reduce() do?",
          answer:
            "reduce() combines stream elements into a single result using an accumulation operation."
        },
        {
          question: "What is a short-circuit operation?",
          answer:
            "A short-circuit operation can stop processing once the required result is known, such as anyMatch(), allMatch(), noneMatch(), findFirst(), and findAny()."
        },
        {
          question: "What is the difference between findFirst() and findAny()?",
          answer:
            "findFirst() returns the first element according to encounter order when applicable. findAny() can return any matching element and can be useful with parallel processing."
        }
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(10, 20, 30, 40, 50);

List<Integer> result =
        numbers.stream()
                .filter(number -> number > 20)
                .map(number -> number * 2)
                .collect(Collectors.toList());

System.out.println(result);`
      },

      output: `[60, 80, 100]`
    },

    {
      id: "stream-coding-problems",
      title: "Stream API Coding Problems",

      paragraphs: [
        "These are common Java 8 Stream API coding problems that are useful for interview preparation."
      ],

      code: {
        language: "java",
        code: `// 1. Find even numbers

List<Integer> numbers =
        Arrays.asList(1, 2, 3, 4, 5, 6);

List<Integer> evenNumbers =
        numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());


// 2. Convert names to uppercase

List<String> names =
        Arrays.asList(
                "java",
                "spring",
                "mysql"
        );

List<String> upperCase =
        names.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());


// 3. Find maximum number

Optional<Integer> max =
        numbers.stream()
                .max(Integer::compareTo);


// 4. Find sum

int sum =
        numbers.stream()
                .mapToInt(Integer::intValue)
                .sum();

System.out.println(evenNumbers);
System.out.println(upperCase);
System.out.println(max.orElse(0));
System.out.println(sum);`
      },

      output: `[2, 4, 6]
[JAVA, SPRING, MYSQL]
6
21`
    },

    {
      id: "stream-practical-problems",
      title: "More Stream Coding Problems",

      code: {
        language: "java",
        code: `// Find duplicate elements

List<Integer> numbers =
        Arrays.asList(
                10, 20, 30, 20, 40, 10
        );

Set<Integer> seen =
        new HashSet<>();

Set<Integer> duplicates =
        numbers.stream()
                .filter(n -> !seen.add(n))
                .collect(Collectors.toSet());


// Find first element greater than 25

Optional<Integer> first =
        numbers.stream()
                .filter(n -> n > 25)
                .findFirst();


// Count elements

long count =
        numbers.stream()
                .count();


// Sort descending

List<Integer> sorted =
        numbers.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

System.out.println(duplicates);
System.out.println(first.orElse(-1));
System.out.println(count);
System.out.println(sorted);`
      },

      output: `[10, 20]
30
6
[40, 30, 20, 20, 10, 10]`
    },

    {
      id: "grouping-interview-problems",
      title: "Collectors Coding Problems",

      paragraphs: [
        "Collectors are frequently used in Java 8 coding interviews, especially groupingBy(), counting(), mapping(), maxBy(), minBy(), and toMap()."
      ],

      code: {
        language: "java",
        code: `// Count employees by department

Map<String, Long> countByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.counting()
                        )
                );


// Group employee names by department

Map<String, List<String>> namesByDepartment =
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


// Highest salary by department

Map<String, Optional<Employee>> highestPaid =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.maxBy(
                                        Comparator.comparingDouble(
                                                Employee::getSalary
                                        )
                                )
                        )
                );`
      }
    },

    {
      id: "optional-interview-questions",
      title: "Optional Interview Questions",

      interviewQuestions: [
        {
          question: "What is Optional?",
          answer:
            "Optional is a container introduced in Java 8 that can represent either a value or the absence of a value."
        },
        {
          question: "Why was Optional introduced?",
          answer:
            "It provides an explicit way to represent potentially absent values and can reduce some common null-handling problems."
        },
        {
          question: "What is the difference between of() and ofNullable()?",
          answer:
            "of() expects a non-null value and throws an exception when passed null. ofNullable() accepts null and produces an empty Optional in that case."
        },
        {
          question: "What happens when get() is called on an empty Optional?",
          answer:
            "It throws NoSuchElementException."
        },
        {
          question: "What is the difference between orElse() and orElseGet()?",
          answer:
            "orElse() evaluates its fallback expression immediately, while orElseGet() obtains the fallback value from a Supplier when the Optional is empty."
        },
        {
          question: "What is orElseThrow()?",
          answer:
            "It returns the value when present and throws an exception when the Optional is empty."
        },
        {
          question: "What is the difference between map() and flatMap() in Optional?",
          answer:
            "map() transforms the contained value into another value, while flatMap() is used when the mapping function itself returns an Optional."
        },
        {
          question: "Should Optional normally be used as an entity field?",
          answer:
            "Optional is primarily designed for expressing potentially absent return values. Using it indiscriminately as a persistent entity field is generally discouraged."
        }
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.ofNullable(
                findUserName()
        );

String result =
        name.orElse("Unknown");

System.out.println(result);`
      }
    },

    {
      id: "date-time-interview",
      title: "Date-Time API Interview Questions",

      interviewQuestions: [
        {
          question: "Why was the new Date-Time API introduced?",
          answer:
            "The java.time API provides a more consistent and immutable model for working with dates, times, durations, periods, formatting, and time zones."
        },
        {
          question: "What is LocalDate?",
          answer:
            "LocalDate represents a date without a time or time zone."
        },
        {
          question: "What is LocalTime?",
          answer:
            "LocalTime represents a time without a date or time zone."
        },
        {
          question: "What is LocalDateTime?",
          answer:
            "LocalDateTime represents both date and time without a time zone."
        },
        {
          question: "What is ZonedDateTime?",
          answer:
            "ZonedDateTime represents date and time together with a time zone."
        },
        {
          question: "What is Instant?",
          answer:
            "Instant represents a point on the UTC-based timeline and is useful for machine timestamps."
        },
        {
          question: "What is the difference between Period and Duration?",
          answer:
            "Period is date-based and works with units such as years, months, and days. Duration is time-based and represents an amount of time using seconds and smaller units."
        },
        {
          question: "What is DateTimeFormatter?",
          answer:
            "DateTimeFormatter is used to format and parse date and time values."
        }
      ],

      code: {
        language: "java",
        code: `LocalDate date =
        LocalDate.of(2026, 9, 25);

DateTimeFormatter formatter =
        DateTimeFormatter.ofPattern(
                "dd-MM-yyyy"
        );

System.out.println(
        date.format(formatter)
);`
      },

      output: `25-09-2026`
    },

    {
      id: "parallel-stream-interview",
      title: "Parallel Stream Interview Questions",

      interviewQuestions: [
        {
          question: "What is a parallel stream?",
          answer:
            "A parallel stream can divide stream processing into tasks that execute concurrently."
        },
        {
          question: "Are parallel streams always faster?",
          answer:
            "No. Parallel execution introduces overhead and may be slower for small datasets, simple operations, or workloads involving synchronization or blocking."
        },
        {
          question: "Which pool does a parallel stream use by default?",
          answer:
            "The common ForkJoinPool is used by default."
        },
        {
          question: "What is the difference between forEach() and forEachOrdered() in a parallel stream?",
          answer:
            "forEach() does not guarantee encounter order, while forEachOrdered() preserves encounter order when the stream has an encounter order."
        },
        {
          question: "When should you consider a parallel stream?",
          answer:
            "Consider it for suitable workloads with enough data, independent CPU-oriented operations, and measurable benefits from parallel processing."
        },
        {
          question: "What should you avoid in parallel streams?",
          answer:
            "Avoid unsafe shared mutable state, unnecessary synchronization, blocking operations, and assuming that parallel execution automatically improves performance."
        }
      ]
    },

    {
      id: "completable-future-interview",
      title: "CompletableFuture Interview Questions",

      interviewQuestions: [
        {
          question: "What is CompletableFuture?",
          answer:
            "CompletableFuture represents an asynchronous computation and provides APIs for transforming, combining, and handling asynchronous results."
        },
        {
          question: "What is supplyAsync()?",
          answer:
            "supplyAsync() executes a Supplier asynchronously and produces a CompletableFuture containing its result."
        },
        {
          question: "What is thenApply()?",
          answer:
            "thenApply() transforms the result of a previous asynchronous stage."
        },
        {
          question: "What is thenCompose()?",
          answer:
            "thenCompose() is used to chain dependent asynchronous operations when the next operation returns another CompletableFuture."
        },
        {
          question: "What is thenCombine()?",
          answer:
            "thenCombine() combines the results of two independent CompletableFuture operations."
        },
        {
          question: "What is exceptionally()?",
          answer:
            "exceptionally() provides a fallback result when an asynchronous stage completes exceptionally."
        },
        {
          question: "What is the difference between handle() and exceptionally()?",
          answer:
            "exceptionally() is primarily used for failure recovery, while handle() receives both the result and exception and can transform either outcome."
        },
        {
          question: "Does Java 8 support orTimeout()?",
          answer:
            "No. CompletableFuture.orTimeout() was introduced in Java 9."
        }
      ]
    },

    {
      id: "scenario-based-questions",
      title: "Scenario-Based Java 8 Questions",

      interviewQuestions: [
        {
          question:
            "You have a list of employees and need the highest-paid employee in each department. How would you solve it?",
          answer:
            "Use groupingBy() with maxBy() and a salary comparator as the downstream collector."
        },
        {
          question:
            "You need to call two independent backend services and combine their responses. Which CompletableFuture method would you consider?",
          answer:
            "Start both operations asynchronously and use thenCombine() to combine their results."
        },
        {
          question:
            "You need to call service B only after service A returns a customer ID. Which CompletableFuture method would you use?",
          answer:
            "Use thenCompose() because service B depends on the result of service A."
        },
        {
          question:
            "You need to convert a list of employees into a Map keyed by employee ID. What collector would you use?",
          answer:
            "Use Collectors.toMap() with the employee ID as the key mapper."
        },
        {
          question:
            "Multiple employees can have the same department. How do you avoid a duplicate-key exception with toMap()?",
          answer:
            "Provide a merge function to define how duplicate department values should be handled."
        },
        {
          question:
            "You need only the employees whose salary is greater than 50000. Which Stream operation would you use?",
          answer:
            "Use filter() with a salary predicate."
        },
        {
          question:
            "You need employee names instead of Employee objects. Which Stream operation would you use?",
          answer:
            "Use map() to transform Employee objects into employee names."
        },
        {
          question:
            "You have List<List<Integer>> and need one List<Integer>. Which Stream operation is appropriate?",
          answer:
            "Use flatMap() to flatten the nested streams."
        },
        {
          question:
            "A database lookup may return no result. How can the service API explicitly represent that possibility?",
          answer:
            "Optional can be used as a return type when representing an optional result is appropriate."
        }
      ]
    },

    {
      id: "coding-problem-one",
      title: "Coding Problem 1 — Find Duplicate Numbers",

      paragraphs: [
        "Given a list of integers, find all duplicate values using Java 8 streams."
      ],

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(
                10, 20, 30, 20, 40, 10, 50
        );

Set<Integer> seen =
        new HashSet<>();

Set<Integer> duplicates =
        numbers.stream()
                .filter(n -> !seen.add(n))
                .collect(Collectors.toSet());

System.out.println(duplicates);`
      },

      output: `Example output:
[10, 20]`
    },

    {
      id: "coding-problem-two",
      title: "Coding Problem 2 — Frequency of Elements",

      code: {
        language: "java",
        code: `List<String> names =
        Arrays.asList(
                "Java",
                "Spring",
                "Java",
                "Spring",
                "Java"
        );

Map<String, Long> frequency =
        names.stream()
                .collect(
                        Collectors.groupingBy(
                                name -> name,
                                Collectors.counting()
                        )
                );

System.out.println(frequency);`
      },

      output: `Example output:
{Java=3, Spring=2}`
    },

    {
      id: "coding-problem-three",
      title: "Coding Problem 3 — Partition Numbers",

      code: {
        language: "java",
        code: `List<Integer> numbers =
        Arrays.asList(
                1, 2, 3, 4, 5, 6
        );

Map<Boolean, List<Integer>> result =
        numbers.stream()
                .collect(
                        Collectors.partitioningBy(
                                n -> n % 2 == 0
                        )
                );

System.out.println(result);`
      },

      output: `{false=[1, 3, 5], true=[2, 4, 6]}`
    },

    {
      id: "coding-problem-four",
      title: "Coding Problem 4 — Highest Salary",

      paragraphs: [
        "Find the employee with the highest salary."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> highestPaid =
        employees.stream()
                .max(
                        Comparator.comparingDouble(
                                Employee::getSalary
                        )
                );

highestPaid.ifPresent(
        employee ->
                System.out.println(
                        employee.getName()
                )
);`
      }
    },

    {
      id: "coding-problem-five",
      title: "Coding Problem 5 — Second Highest Salary",

      code: {
        language: "java",
        code: `Optional<Integer> secondHighest =
        numbers.stream()
                .distinct()
                .sorted(
                        Comparator.reverseOrder()
                )
                .skip(1)
                .findFirst();

secondHighest.ifPresent(
        System.out::println
);`
      }
    },

    {
      id: "coding-problem-six",
      title: "Coding Problem 6 — Group Employees by Department",

      code: {
        language: "java",
        code: `Map<String, List<Employee>> result =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment
                        )
                );`
      }
    },

    {
      id: "coding-problem-seven",
      title: "Coding Problem 7 — Convert List to Map with Duplicate Keys",

      code: {
        language: "java",
        code: `Map<String, Employee> employeeMap =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getDepartment,
                                employee -> employee,
                                (existing, replacement) ->
                                        existing
                        )
                );`
      },

      bullets: [
        "The key is the department.",
        "The value is the Employee.",
        "The merge function keeps the existing employee when duplicate departments occur."
      ]
    },

    {
      id: "coding-problem-eight",
      title: "Coding Problem 8 — CompletableFuture Pipeline",

      code: {
        language: "java",
        code: `CompletableFuture<String> result =
        CompletableFuture.supplyAsync(
                () -> "java"
        )
        .thenApply(
                String::toUpperCase
        )
        .thenApply(
                value -> value + " 8"
        )
        .exceptionally(
                error -> "Fallback"
        );

System.out.println(
        result.join()
);`
      },

      output: `JAVA 8`
    },

    {
      id: "java8-interview-scenarios",
      title: "Java 8 Interview Scenarios",

      paragraphs: [
        "Interviewers may ask you to explain how Java 8 features would be used in a backend application rather than asking only syntax-based questions."
      ],

      bullets: [
        "Transform database entities into response DTOs using map().",
        "Filter records based on status using filter().",
        "Group records by department, category, or status using groupingBy().",
        "Calculate counts using counting().",
        "Find maximum or minimum values using maxBy() and minBy().",
        "Represent optional service results using Optional.",
        "Format API dates using DateTimeFormatter.",
        "Run independent asynchronous operations using CompletableFuture.",
        "Combine dependent asynchronous operations using thenCompose().",
        "Combine independent asynchronous operations using thenCombine().",
        "Use parallel streams only when workload characteristics justify them.",
        "Use functional interfaces to pass behavior into reusable methods."
      ]
    },

    {
      id: "common-java8-mistakes",
      title: "Common Java 8 Interview Mistakes",

      bullets: [
        "Confusing Collection with Stream.",
        "Thinking intermediate stream operations execute immediately.",
        "Trying to reuse an already consumed Stream.",
        "Using map() where flatMap() is required.",
        "Calling Optional.get() without considering the empty case.",
        "Confusing orElse() with orElseGet().",
        "Assuming parallel streams are always faster.",
        "Using parallel streams with unsafe shared mutable state.",
        "Forgetting duplicate-key handling with toMap().",
        "Confusing thenApply() with thenCompose().",
        "Using thenCombine() when one asynchronous operation actually depends on another.",
        "Presenting Java 9 APIs such as CompletableFuture.orTimeout() as Java 8 features.",
        "Using overly complicated Stream pipelines when a simple loop or helper method would be clearer."
      ]
    },

    {
      id: "rapid-fire",
      title: "Java 8 Rapid-Fire Questions",

      interviewQuestions: [
        {
          question: "Which Java version introduced lambda expressions?",
          answer: "Java 8."
        },
        {
          question: "Which interface is used for a condition returning boolean?",
          answer: "Predicate."
        },
        {
          question: "Which interface accepts a value and returns no result?",
          answer: "Consumer."
        },
        {
          question: "Which interface supplies a value without input?",
          answer: "Supplier."
        },
        {
          question: "Which interface transforms one value into another?",
          answer: "Function."
        },
        {
          question: "Which Stream operation filters elements?",
          answer: "filter()."
        },
        {
          question: "Which Stream operation transforms elements?",
          answer: "map()."
        },
        {
          question: "Which Stream operation flattens nested streams?",
          answer: "flatMap()."
        },
        {
          question: "Which collector groups elements?",
          answer: "groupingBy()."
        },
        {
          question: "Which collector creates true/false partitions?",
          answer: "partitioningBy()."
        },
        {
          question: "Which collector converts elements into a Map?",
          answer: "toMap()."
        },
        {
          question: "Which class represents an optional value?",
          answer: "Optional."
        },
        {
          question: "Which API handles modern date and time?",
          answer: "java.time."
        },
        {
          question: "Which class represents a date without time?",
          answer: "LocalDate."
        },
        {
          question: "Which class represents date and time without a zone?",
          answer: "LocalDateTime."
        },
        {
          question: "Which class represents a date-time with a time zone?",
          answer: "ZonedDateTime."
        },
        {
          question: "Which class represents a point on the UTC timeline?",
          answer: "Instant."
        },
        {
          question: "Which class represents asynchronous computation?",
          answer: "CompletableFuture."
        },
        {
          question: "Which method transforms a CompletableFuture result?",
          answer: "thenApply()."
        },
        {
          question: "Which method chains dependent CompletableFuture operations?",
          answer: "thenCompose()."
        },
        {
          question: "Which method combines independent CompletableFuture results?",
          answer: "thenCombine()."
        }
      ]
    },

    {
      id: "final-revision",
      title: "Final Java 8 Revision",

      paragraphs: [
        "The following mental model connects the major Java 8 features covered throughout this course."
      ],

      code: {
        language: "text",
        code: `JAVA 8 INTERVIEW MENTAL MODEL

Lambda
    ↓
Functional Interface
    ↓
Stream API
    ↓
map / filter / flatMap
    ↓
Collectors
    ↓
groupingBy / partitioningBy / toMap
    ↓
Optional
    ↓
Date-Time API
    ↓
Parallel Streams
    ↓
CompletableFuture
    ↓
Async Pipelines`
      },

      bullets: [
        "Lambda → represent behavior concisely.",
        "Functional Interface → target type for lambda behavior.",
        "Stream → process sequences of data.",
        "Collectors → aggregate stream results.",
        "Optional → explicitly represent potentially absent results.",
        "Date-Time API → work with dates, times, durations, and zones.",
        "Parallel Stream → process suitable workloads concurrently.",
        "CompletableFuture → compose asynchronous computations."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Java 8 introduced lambda expressions.",
        "Lambda expressions work with functional interfaces.",
        "A functional interface has exactly one abstract method.",
        "Streams support functional-style data processing.",
        "Intermediate Stream operations are generally lazy.",
        "Terminal operations trigger stream processing.",
        "Collectors aggregate stream results.",
        "groupingBy() is used for classification and grouping.",
        "partitioningBy() creates two groups based on a predicate.",
        "toMap() requires duplicate-key handling when duplicate keys are possible.",
        "Optional represents a value that may or may not be present.",
        "LocalDate represents a date without a time.",
        "LocalDateTime represents date and time without a zone.",
        "ZonedDateTime includes a time zone.",
        "Instant represents a point on the timeline.",
        "Parallel streams should be used based on workload characteristics rather than assumed performance benefits.",
        "CompletableFuture supports asynchronous pipelines.",
        "thenApply() transforms results.",
        "thenCompose() chains dependent asynchronous operations.",
        "thenCombine() combines independent asynchronous operations.",
        "Java 9+ APIs should not be incorrectly presented as Java 8 APIs."
      ]
    },

    {
      id: "final-interview-advice",
      title: "How to Answer Java 8 Questions in an Interview",

      paragraphs: [
        "When explaining a Java 8 feature, a useful interview structure is: definition, why it was introduced, syntax or API, a small example, and when you would use it in a real application.",
        "For coding questions, first explain the approach, then write the code, and finally mention important edge cases."
      ],

      code: {
        language: "text",
        code: `INTERVIEW ANSWER FORMAT

1. What is it?
2. Why was it introduced?
3. How does it work?
4. Small example
5. Real-world use case
6. Important limitation or difference
7. Complexity or performance consideration`
      },

      bullets: [
        "Keep the first explanation concise.",
        "Use a practical example.",
        "Explain important differences between similar APIs.",
        "Mention edge cases when solving coding problems.",
        "Do not use advanced syntax without being able to explain it."
      ]
    }
  ]
};