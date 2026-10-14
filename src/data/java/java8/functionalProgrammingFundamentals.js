export const functionalProgrammingFundamentals = {
  id: "functional-programming-fundamentals",
  title: "Functional Programming Fundamentals",
  slug: "functional-programming-fundamentals",
  topicTitle: "Java 8",
  estimatedTime: "30 min",

  description:
    "Understand the fundamentals of functional programming in Java 8, functional interfaces, the @FunctionalInterface annotation, and the commonly used Predicate, Consumer, Supplier, and Function interfaces.",

  sections: [
    {
      id: "functional-programming",
      title: "What is Functional Programming?",

      paragraphs: [
        "Functional programming is a programming style where functions or behavior are treated as values that can be passed to other methods and used as part of data processing.",
        "Java was traditionally designed around object-oriented programming. Starting with Java 8, Java also introduced functional programming features such as lambda expressions and functional interfaces.",
        "Functional programming in Java is commonly used with lambda expressions, method references, and the Stream API."
      ],

      bullets: [
        "Behavior can be passed as an argument.",
        "Lambda expressions can represent behavior concisely.",
        "Functional interfaces provide a target type for lambda expressions.",
        "The Stream API heavily uses functional programming concepts.",
        "Java supports functional programming while remaining primarily an object-oriented language."
      ]
    },

    {
      id: "functional-interface",
      title: "Functional Interfaces",

      paragraphs: [
        "A functional interface is an interface that contains exactly one abstract method.",
        "The interface can contain any number of default and static methods because those methods already have implementations.",
        "Functional interfaces are important in Java 8 because lambda expressions can be assigned to functional interface types."
      ],

      code: {
        language: "java",
        code: `@FunctionalInterface
interface Greeting {

    void sayHello();
}

public class Main {

    public static void main(String[] args) {

        Greeting greeting =
                () -> System.out.println("Hello Java 8");

        greeting.sayHello();
    }
}`
      },

      output: `Hello Java 8`
    },

    {
      id: "functional-interface-structure",
      title: "How a Functional Interface Works",

      paragraphs: [
        "The functional interface defines the method that represents the required behavior. The lambda expression provides the implementation of that method.",
        "In the previous example, Greeting has one abstract method called sayHello(). The lambda expression supplies the implementation."
      ],

      code: {
        language: "java",
        code: `interface Calculator {

    int add(int a, int b);
}

public class Main {

    public static void main(String[] args) {

        Calculator calculator =
                (a, b) -> a + b;

        System.out.println(calculator.add(10, 20));
    }
}`
      },

      output: `30`
    },

    {
      id: "functional-interface-annotation",
      title: "@FunctionalInterface Annotation",

      paragraphs: [
        "The @FunctionalInterface annotation is used to indicate that an interface is intended to be a functional interface.",
        "It is not mandatory, but it provides compile-time checking. If another abstract method is added to the interface, the compiler reports an error."
      ],

      code: {
        language: "java",
        code: `@FunctionalInterface
interface Calculator {

    int add(int a, int b);
}`
      },

      bullets: [
        "@FunctionalInterface is an annotation introduced in Java 8.",
        "It documents the intention that the interface should contain one abstract method.",
        "The compiler verifies the functional-interface rule.",
        "Default and static methods do not count as additional abstract methods."
      ]
    },

    {
      id: "built-in-functional-interfaces",
      title: "Built-in Functional Interfaces",

      paragraphs: [
        "Java 8 provides several functional interfaces in the java.util.function package.",
        "The most commonly used interfaces are Predicate, Consumer, Supplier, and Function."
      ],

      code: {
        language: "java",
        code: `import java.util.function.*;

public class Main {

    public static void main(String[] args) {

        Predicate<Integer> isEven =
                number -> number % 2 == 0;

        Consumer<String> printer =
                value -> System.out.println(value);

        Supplier<String> message =
                () -> "Hello Java 8";

        Function<Integer, Integer> square =
                number -> number * number;

        System.out.println(isEven.test(10));

        printer.accept("Java");

        System.out.println(message.get());

        System.out.println(square.apply(5));
    }
}`
      },

      output: `true
Java
Hello Java 8
25`
    },

    {
      id: "predicate",
      title: "Predicate",

      paragraphs: [
        "Predicate is a functional interface used when we want to test a condition.",
        "It takes one input and returns a boolean value.",
        "The main method of Predicate is test()."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Predicate;

public class Main {

    public static void main(String[] args) {

        Predicate<Integer> isAdult =
                age -> age >= 18;

        System.out.println(isAdult.test(20));
        System.out.println(isAdult.test(15));
    }
}`
      },

      output: `true
false`,

      bullets: [
        "Input: one value.",
        "Output: boolean.",
        "Main method: test().",
        "Common use: filtering and condition checking."
      ]
    },

    {
      id: "consumer",
      title: "Consumer",

      paragraphs: [
        "Consumer is a functional interface used when we want to perform an operation on a value without returning a result.",
        "It accepts one input and returns void.",
        "The main method of Consumer is accept()."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Consumer;

public class Main {

    public static void main(String[] args) {

        Consumer<String> printer =
                name -> System.out.println("Hello " + name);

        printer.accept("Venkatesh");
    }
}`
      },

      output: `Hello Venkatesh`,

      bullets: [
        "Input: one value.",
        "Output: no return value.",
        "Main method: accept().",
        "Common use: printing, logging, and performing an action."
      ]
    },

    {
      id: "supplier",
      title: "Supplier",

      paragraphs: [
        "Supplier is a functional interface that supplies or produces a value without accepting an input.",
        "It does not take any argument and returns a value.",
        "The main method of Supplier is get()."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        Supplier<String> message =
                () -> "Welcome to CodeForge";

        System.out.println(message.get());
    }
}`
      },

      output: `Welcome to CodeForge`,

      bullets: [
        "Input: no input.",
        "Output: one value.",
        "Main method: get().",
        "Common use: generating or supplying values."
      ]
    },

    {
      id: "function",
      title: "Function",

      paragraphs: [
        "Function is a functional interface used when an input value needs to be transformed into another value.",
        "It accepts one input and returns one result.",
        "The main method of Function is apply()."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        Function<String, Integer> length =
                text -> text.length();

        System.out.println(length.apply("Java"));
    }
}`
      },

      output: `4`,

      bullets: [
        "Input: one value.",
        "Output: one value.",
        "Main method: apply().",
        "Common use: transforming one value into another."
      ]
    },

    {
      id: "predicate-consumer-supplier-function-comparison",
      title: "Predicate vs Consumer vs Supplier vs Function",

      paragraphs: [
        "These four functional interfaces are frequently used in Java 8 applications. The easiest way to remember them is to focus on whether they receive input and whether they return a result."
      ],

      code: {
        language: "text",
        code: `Predicate<T>
Input  -> T
Output -> boolean
Method -> test()

Consumer<T>
Input  -> T
Output -> void
Method -> accept()

Supplier<T>
Input  -> none
Output -> T
Method -> get()

Function<T, R>
Input  -> T
Output -> R
Method -> apply()`
      },

      bullets: [
        "Predicate → condition checking.",
        "Consumer → performing an action.",
        "Supplier → supplying a value.",
        "Function → transforming a value."
      ]
    },

    {
      id: "real-world-example",
      title: "Real-World Example",

      paragraphs: [
        "Consider an application that processes a list of employees.",
        "A Predicate can check whether an employee is active. A Consumer can print employee information. A Supplier can provide a default employee name. A Function can convert an employee object into an employee name."
      ],

      code: {
        language: "java",
        code: `import java.util.function.*;

public class Main {

    public static void main(String[] args) {

        Predicate<Integer> isExperienced =
                years -> years >= 2;

        Consumer<String> printName =
                name -> System.out.println(name);

        Supplier<String> defaultName =
                () -> "Unknown Employee";

        Function<String, Integer> nameLength =
                name -> name.length();

        System.out.println(
                isExperienced.test(3)
        );

        printName.accept("Rahul");

        System.out.println(
                defaultName.get()
        );

        System.out.println(
                nameLength.apply("Rahul")
        );
    }
}`
      },

      output: `true
Rahul
Unknown Employee
5`
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "A functional interface contains exactly one abstract method.",
        "A functional interface can have multiple default and static methods.",
        "@FunctionalInterface provides compile-time validation.",
        "Lambda expressions can be assigned to functional interface types.",
        "Predicate returns boolean.",
        "Consumer performs an operation and returns nothing.",
        "Supplier produces a value without receiving input.",
        "Function transforms an input into an output.",
        "Predicate uses test().",
        "Consumer uses accept().",
        "Supplier uses get().",
        "Function uses apply().",
        "The functional interfaces are available in java.util.function."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is a functional interface?",
          answer:
            "A functional interface is an interface that contains exactly one abstract method. It can be used as the target type of a lambda expression."
        },
        {
          question: "Is @FunctionalInterface mandatory?",
          answer:
            "No. It is optional, but it allows the compiler to verify that the interface satisfies the functional-interface rules."
        },
        {
          question: "Can a functional interface have default methods?",
          answer:
            "Yes. A functional interface can contain multiple default and static methods as long as it has exactly one abstract method."
        },
        {
          question: "What is Predicate?",
          answer:
            "Predicate is a functional interface that accepts one input and returns a boolean result. Its main method is test()."
        },
        {
          question: "What is Consumer?",
          answer:
            "Consumer accepts one input and performs an operation without returning a result. Its main method is accept()."
        },
        {
          question: "What is Supplier?",
          answer:
            "Supplier does not accept an input and produces a value. Its main method is get()."
        },
        {
          question: "What is Function?",
          answer:
            "Function accepts one input and returns a result. Its main method is apply(). It is commonly used for data transformation."
        },
        {
          question: "What is the difference between Predicate and Function?",
          answer:
            "Predicate accepts an input and returns boolean, while Function accepts an input and returns a result that can be of another type."
        },
        {
          question: "Where are Predicate, Consumer, Supplier, and Function defined?",
          answer:
            "They are provided by the java.util.function package."
        }
      ]
    }
  ]
};