export const lambdaExpressions = {
  id: "lambda-expressions",
  title: "Lambda Expressions",
  slug: "lambda-expressions",
  topicTitle: "Java 8",
  estimatedTime: "35 min",

  description:
    "Learn Java 8 lambda expressions, their syntax, parameters, return values, functional interfaces, collections, comparators, variable scope, and best practices.",

  sections: [
    {
      id: "what-is-lambda",
      title: "What is a Lambda Expression?",

      paragraphs: [
        "A lambda expression is a concise way of representing a block of behavior in Java.",
        "Lambda expressions were introduced in Java 8 and are mainly used with functional interfaces.",
        "They help reduce boilerplate code, especially when implementing simple behavior that would otherwise require an anonymous class."
      ],

      code: {
        language: "java",
        code: `// Traditional approach

Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running task");
    }
};


// Lambda expression

Runnable task =
        () -> System.out.println("Running task");`
      },

      bullets: [
        "Lambda expressions were introduced in Java 8.",
        "They represent behavior as an expression.",
        "They are commonly used with functional interfaces.",
        "They make simple implementations shorter and easier to read."
      ]
    },

    {
      id: "lambda-syntax",
      title: "Lambda Syntax",

      paragraphs: [
        "The basic syntax of a lambda expression consists of parameters, the arrow operator, and the body."
      ],

      code: {
        language: "java",
        code: `(parameters) -> expression

(parameters) -> {
    statements;
}`
      },

      bullets: [
        "() -> System.out.println(\"Hello\") — no parameters.",
        "name -> System.out.println(name) — one parameter.",
        "(a, b) -> a + b — multiple parameters.",
        "(a, b) -> { return a + b; } — block body with an explicit return."
      ]
    },

    {
      id: "lambda-no-parameters",
      title: "Lambda with No Parameters",

      paragraphs: [
        "When a lambda expression does not receive any parameters, empty parentheses are used."
      ],

      code: {
        language: "java",
        code: `Runnable task =
        () -> System.out.println("Task executed");

task.run();`
      },

      output: `Task executed`
    },

    {
      id: "lambda-with-parameters",
      title: "Lambda with Parameters",

      paragraphs: [
        "A lambda expression can receive one or more parameters.",
        "When there is only one parameter, parentheses can usually be omitted."
      ],

      code: {
        language: "java",
        code: `java.util.function.Consumer<String> printer =
        name -> System.out.println("Hello " + name);

printer.accept("Java");`
      },

      output: `Hello Java`
    },

    {
      id: "lambda-return-value",
      title: "Lambda with Return Value",

      paragraphs: [
        "A lambda expression can return a value. When the body contains a single expression, the result of that expression is returned automatically."
      ],

      code: {
        language: "java",
        code: `java.util.function.Function<Integer, Integer> square =
        number -> number * number;

System.out.println(square.apply(5));`
      },

      output: `25`
    },

    {
      id: "lambda-explicit-return",
      title: "Lambda with an Explicit Return",

      paragraphs: [
        "When a lambda contains multiple statements inside a block, the return statement must be written explicitly if the lambda returns a value."
      ],

      code: {
        language: "java",
        code: `java.util.function.Function<Integer, Integer> square =
        number -> {
            int result = number * number;
            return result;
        };

System.out.println(square.apply(6));`
      },

      output: `36`
    },

    {
      id: "lambda-multiple-parameters",
      title: "Lambda with Multiple Parameters",

      paragraphs: [
        "A lambda expression can accept multiple parameters. When there are multiple parameters, parentheses are required."
      ],

      code: {
        language: "java",
        code: `java.util.function.BiFunction<Integer, Integer, Integer> add =
        (a, b) -> a + b;

System.out.println(add.apply(10, 20));`
      },

      output: `30`
    },

    {
      id: "lambda-functional-interface",
      title: "Lambda with Functional Interface",

      paragraphs: [
        "A lambda expression does not have a standalone type by itself. It needs a target functional interface that defines the abstract method the lambda implements."
      ],

      code: {
        language: "java",
        code: `@FunctionalInterface
interface Calculator {

    int calculate(int a, int b);
}

public class Main {

    public static void main(String[] args) {

        Calculator addition =
                (a, b) -> a + b;

        Calculator multiplication =
                (a, b) -> a * b;

        System.out.println(
                addition.calculate(10, 5)
        );

        System.out.println(
                multiplication.calculate(10, 5)
        );
    }
}`
      },

      output: `15
50`
    },

    {
      id: "lambda-with-collections",
      title: "Lambda with Collections",

      paragraphs: [
        "Lambda expressions are frequently used with Java collections to perform operations such as iteration, filtering, sorting, and transformation.",
        "The forEach() method is a common example."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "Rahul",
                        "Amit",
                        "Priya"
                );

        names.forEach(
                name -> System.out.println(name)
        );
    }
}`
      },

      output: `Rahul
Amit
Priya`
    },

    {
      id: "lambda-filter-collection",
      title: "Lambda for Filtering Collections",

      paragraphs: [
        "Lambda expressions can also be used with collection operations such as removeIf() to express conditions concisely."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>(
                        Arrays.asList(10, 15, 20, 25, 30)
                );

        numbers.removeIf(
                number -> number % 2 != 0
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "lambda-with-comparator",
      title: "Lambda with Comparator",

      paragraphs: [
        "Lambda expressions make it easier to define sorting logic using Comparator.",
        "Instead of creating a separate Comparator implementation, the comparison logic can be written directly where it is needed."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers =
                new ArrayList<>(
                        Arrays.asList(40, 10, 30, 20)
                );

        numbers.sort(
                (a, b) -> a.compareTo(b)
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30, 40]`
    },

    {
      id: "lambda-variable-scope",
      title: "Lambda Variable Scope",

      paragraphs: [
        "A lambda expression can access local variables from its enclosing scope when those variables are final or effectively final.",
        "A variable is effectively final when its value is assigned once and is not changed afterward."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String message = "Hello";

        Runnable task =
                () -> System.out.println(message);

        task.run();
    }
}`
      },

      output: `Hello`
    },

    {
      id: "lambda-variable-modification",
      title: "Why Local Variables Cannot Be Modified",

      paragraphs: [
        "A local variable captured by a lambda cannot be reassigned after it has been captured because the variable must be final or effectively final."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int count = 10;

        Runnable task =
                () -> System.out.println(count);

        // count = 20; // Compile-time error

        task.run();
    }
}`
      },

      bullets: [
        "Captured local variables must be final or effectively final.",
        "Changing the variable after creating the lambda breaks the effectively-final requirement.",
        "Instance fields do not have the same effectively-final restriction."
      ]
    },

    {
      id: "lambda-best-practices",
      title: "Lambda Best Practices",

      bullets: [
        "Use lambdas when they make the code easier to understand.",
        "Keep lambda expressions short and focused.",
        "Avoid putting large amounts of business logic inside a lambda.",
        "Use meaningful parameter names.",
        "Use method references when they make the code clearer.",
        "Prefer standard functional interfaces when they match the requirement.",
        "Avoid deeply nested lambda expressions because they can reduce readability.",
        "Use braces and an explicit return when a multi-statement lambda improves readability."
      ]
    },

    {
      id: "lambda-summary",
      title: "Lambda Expression Summary",

      code: {
        language: "text",
        code: `Lambda Expression
        |
        +-- No parameters
        |      () -> action
        |
        +-- One parameter
        |      value -> action
        |
        +-- Multiple parameters
        |      (a, b) -> expression
        |
        +-- Returns value
        |      value -> value * value
        |
        +-- Multiple statements
               value -> {
                   // statements
                   return result;
               }`
      },

      paragraphs: [
        "The main idea is simple: a lambda expression provides an implementation of a functional interface in a concise form."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Lambda expressions were introduced in Java 8.",
        "Lambda expressions are mainly used with functional interfaces.",
        "A lambda expression does not have an independent type without a target functional interface.",
        "The arrow operator separates parameters from the lambda body.",
        "A single expression can return a value implicitly.",
        "A block lambda requires an explicit return when it returns a value.",
        "Parentheses can be omitted for a single parameter.",
        "Multiple parameters require parentheses.",
        "Captured local variables must be final or effectively final.",
        "Lambdas are commonly used with collections and the Stream API."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is a lambda expression in Java?",
          answer:
            "A lambda expression is a concise way to represent behavior and provide an implementation for a functional interface."
        },
        {
          question: "Why were lambda expressions introduced in Java 8?",
          answer:
            "They were introduced to support functional programming and reduce boilerplate code when representing simple behavior."
        },
        {
          question: "What is the basic syntax of a lambda expression?",
          answer:
            "The basic syntax is (parameters) -> expression or (parameters) -> { statements; }."
        },
        {
          question: "Can a lambda expression have multiple parameters?",
          answer:
            "Yes. Multiple parameters are written inside parentheses, for example (a, b) -> a + b."
        },
        {
          question: "Can a lambda expression return a value?",
          answer:
            "Yes. A single-expression lambda can return its expression result implicitly. A block lambda uses an explicit return statement."
        },
        {
          question: "Can we use a lambda expression without a functional interface?",
          answer:
            "A lambda expression requires a target functional interface type for its type information and invocation."
        },
        {
          question: "Can a lambda modify a local variable?",
          answer:
            "A lambda can access a local variable only when it is final or effectively final. The lambda cannot reassign that captured local variable."
        },
        {
          question: "Where are lambda expressions commonly used?",
          answer:
            "They are commonly used with functional interfaces, collections, Comparator, and the Stream API."
        },
        {
          question: "What is the advantage of lambda expressions?",
          answer:
            "They reduce boilerplate code and allow behavior to be expressed more concisely, especially for small operations."
        }
      ]
    }
  ]
};