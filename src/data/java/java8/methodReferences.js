export const methodReferences = {
  id: "method-references",
  title: "Method References",
  slug: "method-references",
  topicTitle: "Java 8",
  estimatedTime: "30 min",

  description:
    "Learn Java 8 method references, including static methods, instance methods, constructor references, method references with collections, and the difference between lambda expressions and method references.",

  sections: [
    {
      id: "what-is-method-reference",
      title: "What is a Method Reference?",

      paragraphs: [
        "A method reference is a Java 8 feature that provides a shorter and more readable way to refer to an existing method.",
        "Instead of writing a lambda expression that only calls an existing method, we can directly reference that method using the :: operator.",
        "A method reference does not execute the method immediately. It provides a reference to the method that can be used where a functional interface is expected.",
        "Method references are closely related to lambda expressions and are commonly used with collections and the Stream API."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList("Java", "Spring", "React");

        // Lambda expression
        names.forEach(
                name -> System.out.println(name)
        );

        // Method reference
        names.forEach(
                System.out::println
        );
    }
}`
      },

      output: `Java
Spring
React
Java
Spring
React`
    },

    {
      id: "method-reference-operator",
      title: "Method Reference Operator",

      paragraphs: [
        "The :: operator is called the method reference operator.",
        "It separates the class or object from the method being referenced."
      ],

      code: {
        language: "text",
        code: `ClassName::staticMethod

object::instanceMethod

ClassName::instanceMethod

ClassName::new`
      },

      bullets: [
        "ClassName::staticMethod → reference to a static method.",
        "object::instanceMethod → reference to an instance method of a specific object.",
        "ClassName::instanceMethod → reference to an instance method where the target object is supplied by the functional interface.",
        "ClassName::new → reference to a constructor."
      ]
    },

    {
      id: "static-method-reference",
      title: "Static Method Reference",

      paragraphs: [
        "A static method can be referenced using the class name followed by :: and the static method name.",
        "The referenced method must match the parameter and return type expected by the target functional interface."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Function;

public class Main {

    public static int square(int number) {
        return number * number;
    }

    public static void main(String[] args) {

        Function<Integer, Integer> function =
                Main::square;

        System.out.println(
                function.apply(5)
        );
    }
}`
      },

      output: `25`,

      paragraphsAfter: [
        "The method reference Main::square is equivalent to the lambda expression number -> Main.square(number)."
      ]
    },

    {
      id: "static-method-reference-comparison",
      title: "Static Method Reference vs Lambda",

      code: {
        language: "java",
        code: `// Lambda
Function<Integer, Integer> square =
        number -> Main.square(number);


// Method reference
Function<Integer, Integer> square =
        Main::square;`
      },

      paragraphs: [
        "The method reference is useful when the lambda does nothing except call an existing method."
      ]
    },

    {
      id: "instance-method-reference",
      title: "Instance Method Reference",

      paragraphs: [
        "An instance method can be referenced using an object followed by :: and the instance method name.",
        "The method is associated with a particular object."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Consumer;

public class Main {

    public void printMessage(String message) {
        System.out.println(message);
    }

    public static void main(String[] args) {

        Main object = new Main();

        Consumer<String> printer =
                object::printMessage;

        printer.accept("Hello Java 8");
    }
}`
      },

      output: `Hello Java 8`
    },

    {
      id: "instance-method-reference-existing-object",
      title: "Instance Method Reference with an Existing Object",

      paragraphs: [
        "When an object already exists and its method matches the required functional-interface method, that object's method can be referenced directly."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Supplier;

public class Main {

    public String getMessage() {
        return "Welcome to CodeForge";
    }

    public static void main(String[] args) {

        Main object = new Main();

        Supplier<String> supplier =
                object::getMessage;

        System.out.println(
                supplier.get()
        );
    }
}`
      },

      output: `Welcome to CodeForge`
    },

    {
      id: "class-instance-method-reference",
      title: "Instance Method Reference Using a Class Name",

      paragraphs: [
        "Java also supports referencing an instance method using the class name. In this form, the first parameter of the functional interface becomes the object on which the method is invoked."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Function;

public class Main {

    public static void main(String[] args) {

        Function<String, String> upperCase =
                String::toUpperCase;

        System.out.println(
                upperCase.apply("java")
        );
    }
}`
      },

      output: `JAVA`,

      bullets: [
        "String::toUpperCase refers to an instance method.",
        "The String object is supplied through the Function input.",
        "This form is useful when the target object is provided as an argument."
      ]
    },

    {
      id: "constructor-reference",
      title: "Constructor Reference",

      paragraphs: [
        "A constructor reference allows a constructor to be referenced using the ::new syntax.",
        "It is commonly used with functional interfaces such as Supplier and Function."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Supplier;

class Employee {

    Employee() {
        System.out.println("Employee object created");
    }
}

public class Main {

    public static void main(String[] args) {

        Supplier<Employee> supplier =
                Employee::new;

        Employee employee =
                supplier.get();
    }
}`
      },

      output: `Employee object created`
    },

    {
      id: "constructor-reference-with-parameters",
      title: "Constructor Reference with Parameters",

      paragraphs: [
        "A constructor reference can also be used when the constructor accepts parameters."
      ],

      code: {
        language: "java",
        code: `import java.util.function.Function;

class Employee {

    private String name;

    Employee(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class Main {

    public static void main(String[] args) {

        Function<String, Employee> creator =
                Employee::new;

        Employee employee =
                creator.apply("Rahul");

        System.out.println(
                employee.getName()
        );
    }
}`
      },

      output: `Rahul`
    },

    {
      id: "method-reference-with-collections",
      title: "Method Reference with Collections",

      paragraphs: [
        "Method references are frequently used with collections because collection methods such as forEach() accept functional interfaces.",
        "They can make collection-processing code shorter when an existing method already performs the required operation."
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
                        "Python",
                        "JavaScript"
                );

        languages.forEach(
                System.out::println
        );
    }
}`
      },

      output: `Java
Python
JavaScript`
    },

    {
      id: "method-reference-with-sorting",
      title: "Method Reference with Sorting",

      paragraphs: [
        "Method references can also be used when sorting collections if an existing method matches the Comparator requirement."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>(
                        Arrays.asList(
                                "Rahul",
                                "Amit",
                                "Priya"
                        )
                );

        names.sort(
                Comparator.comparingInt(
                        String::length
                )
        );

        System.out.println(names);
    }
}`
      },

      output: `[Amit, Rahul, Priya]`
    },

    {
      id: "method-reference-with-streams",
      title: "Method Reference with Stream API",

      paragraphs: [
        "Method references are also commonly used with Stream API operations such as map() and forEach()."
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
                        "java",
                        "spring",
                        "react"
                );

        List<String> result =
                names.stream()
                        .map(String::toUpperCase)
                        .collect(Collectors.toList());

        result.forEach(System.out::println);
    }
}`
      },

      output: `JAVA
SPRING
REACT`
    },

    {
      id: "lambda-vs-method-reference",
      title: "Lambda vs Method Reference",

      paragraphs: [
        "A method reference and a lambda expression can often represent the same behavior.",
        "A method reference is generally useful when the lambda only delegates to an existing method.",
        "A lambda expression is more appropriate when additional logic is required."
      ],

      code: {
        language: "java",
        code: `// Lambda

names.forEach(
        name -> System.out.println(name)
);


// Method reference

names.forEach(
        System.out::println
);`
      },

      bullets: [
        "Lambda expressions can contain custom logic.",
        "Method references point directly to an existing method.",
        "Method references can make simple delegation more readable.",
        "Not every lambda expression can be replaced with a method reference.",
        "Choose the form that makes the intent clearer."
      ]
    },

    {
      id: "when-not-to-use-method-reference",
      title: "When Not to Use a Method Reference",

      paragraphs: [
        "A method reference should not be used simply because it is shorter. If a lambda expression communicates the logic more clearly, the lambda may be preferable."
      ],

      code: {
        language: "java",
        code: `// Clear lambda when additional logic is required

names.forEach(name -> {
    String message = "Employee: " + name;
    System.out.println(message);
});`
      },

      bullets: [
        "Use a lambda when multiple statements are required.",
        "Use a lambda when additional transformation or conditions are involved.",
        "Use a method reference when it clearly represents an existing method call.",
        "Readability is more important than simply reducing characters."
      ]
    },

    {
      id: "method-reference-types-summary",
      title: "Types of Method References",

      code: {
        language: "text",
        code: `1. Static Method Reference

   ClassName::staticMethod


2. Instance Method Reference
   Specific Object

   object::instanceMethod


3. Instance Method Reference
   Arbitrary Object of a Type

   ClassName::instanceMethod


4. Constructor Reference

   ClassName::new`
      },

      paragraphs: [
        "These four forms cover the main method-reference patterns used in Java 8."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Method references were introduced in Java 8.",
        "The :: operator is used for method references.",
        "A method reference is a concise alternative to certain lambda expressions.",
        "A method reference does not execute the method immediately.",
        "The referenced method must be compatible with the target functional interface.",
        "Static methods can be referenced using ClassName::methodName.",
        "An instance method of a specific object can be referenced using object::methodName.",
        "An instance method can also be referenced using ClassName::methodName when the target object is supplied as an argument.",
        "Constructors can be referenced using ClassName::new.",
        "Method references are commonly used with collections and the Stream API.",
        "Method references should be used when they improve readability."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is a method reference in Java 8?",
          answer:
            "A method reference is a concise way to refer to an existing method using the :: operator. It can be used where a compatible functional interface is expected."
        },
        {
          question: "What operator is used for method references?",
          answer:
            "The double-colon :: operator is used for method references."
        },
        {
          question: "What are the types of method references?",
          answer:
            "The main types are static method references, instance method references for a specific object, instance method references using a class name, and constructor references."
        },
        {
          question: "How do you reference a static method?",
          answer:
            "Use ClassName::methodName. For example, Math::abs can be used as a reference to the static abs method."
        },
        {
          question: "How do you reference an instance method of a specific object?",
          answer:
            "Use object::methodName. For example, printer::print can reference the print method of an existing printer object."
        },
        {
          question: "Can an instance method be referenced using a class name?",
          answer:
            "Yes. For example, String::toUpperCase can reference an instance method where the String object is supplied as the functional-interface argument."
        },
        {
          question: "What is a constructor reference?",
          answer:
            "A constructor reference uses ClassName::new and provides a reference to a constructor that can be used through a compatible functional interface."
        },
        {
          question: "What is the difference between a lambda and a method reference?",
          answer:
            "A lambda can contain custom logic, while a method reference directly refers to an existing method. A method reference is especially useful when the lambda only calls an existing method."
        },
        {
          question: "Can every lambda expression be converted into a method reference?",
          answer:
            "No. A method reference is appropriate only when an existing method matches the required functional-interface operation."
        },
        {
          question: "Where are method references commonly used?",
          answer:
            "They are commonly used with collections, Comparator, functional interfaces, and Stream API operations such as map() and forEach()."
        }
      ]
    }
  ]
};