export const interfaceEnhancements = {
  id: "interface-enhancements",
  title: "Interface Enhancements",
  slug: "interface-enhancements",
  topicTitle: "Java 8",
  estimatedTime: "40 min",

  description:
    "Learn the interface enhancements introduced around Java 8, including default methods, static interface methods, functional interfaces, interface method conflicts, and best practices. Private interface methods are also introduced as a post-Java 8 enhancement.",

  sections: [
    {
      id: "interface-enhancements-overview",
      title: "Interface Enhancements in Java 8",

      paragraphs: [
        "Before Java 8, an interface could declare abstract methods and constants, but it could not provide normal method implementations.",
        "This created a problem when an existing interface needed a new method because all existing implementing classes would have to provide an implementation.",
        "Java 8 introduced default methods and static methods in interfaces. These features allowed interfaces to evolve without immediately breaking existing implementations.",
        "Java 8 also made functional interfaces especially important because lambda expressions require a compatible functional interface."
      ],

      bullets: [
        "Default methods provide implementations inside interfaces.",
        "Static methods allow utility behavior inside interfaces.",
        "Functional interfaces provide the target type for lambda expressions.",
        "Existing interfaces can evolve more easily using default methods."
      ]
    },

    {
      id: "default-methods",
      title: "Default Methods",

      paragraphs: [
        "A default method is a method inside an interface that provides a concrete implementation.",
        "The default keyword is used before the method declaration.",
        "A class implementing the interface can use the default implementation or override it."
      ],

      code: {
        language: "java",
        code: `interface Vehicle {

    default void start() {
        System.out.println("Vehicle is starting");
    }
}

class Car implements Vehicle {
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.start();
    }
}`
      },

      output: `Vehicle is starting`
    },

    {
      id: "override-default-method",
      title: "Overriding a Default Method",

      paragraphs: [
        "An implementing class can override a default method when it needs behavior specific to that implementation."
      ],

      code: {
        language: "java",
        code: `interface Vehicle {

    default void start() {
        System.out.println("Vehicle is starting");
    }
}

class Car implements Vehicle {

    @Override
    public void start() {
        System.out.println("Car is starting");
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.start();
    }
}`
      },

      output: `Car is starting`
    },

    {
      id: "why-default-methods",
      title: "Why Were Default Methods Introduced?",

      paragraphs: [
        "Suppose an interface is already implemented by many classes. Adding a new abstract method would force every implementing class to implement that method.",
        "A default method can provide a standard implementation, allowing existing implementations to continue working."
      ],

      code: {
        language: "java",
        code: `interface Payment {

    void pay();

    default void printReceipt() {
        System.out.println("Printing receipt");
    }
}

class CreditCardPayment implements Payment {

    @Override
    public void pay() {
        System.out.println("Paid by credit card");
    }
}

public class Main {

    public static void main(String[] args) {

        Payment payment =
                new CreditCardPayment();

        payment.pay();
        payment.printReceipt();
    }
}`
      },

      output: `Paid by credit card
Printing receipt`
    },

    {
      id: "default-method-inheritance",
      title: "Default Method Inheritance",

      paragraphs: [
        "When a class implements an interface containing a default method, the class inherits that implementation unless it overrides the method."
      ],

      code: {
        language: "java",
        code: `interface A {

    default void show() {
        System.out.println("A");
    }
}

class B implements A {
}

public class Main {

    public static void main(String[] args) {

        B object = new B();

        object.show();
    }
}`
      },

      output: `A`
    },

    {
      id: "multiple-default-method-conflict",
      title: "Multiple Default Method Conflict",

      paragraphs: [
        "If a class implements two interfaces that provide default methods with the same signature, Java cannot automatically choose which implementation to use.",
        "The implementing class must resolve the conflict by overriding the method."
      ],

      code: {
        language: "java",
        code: `interface A {

    default void show() {
        System.out.println("A");
    }
}

interface B {

    default void show() {
        System.out.println("B");
    }
}

class C implements A, B {

    @Override
    public void show() {
        System.out.println("C");
    }
}

public class Main {

    public static void main(String[] args) {

        C object = new C();

        object.show();
    }
}`
      },

      output: `C`
    },

    {
      id: "calling-specific-default",
      title: "Calling a Specific Interface Default Method",

      paragraphs: [
        "When resolving a default-method conflict, an implementing class can explicitly call a particular interface's default implementation using InterfaceName.super.methodName()."
      ],

      code: {
        language: "java",
        code: `interface A {

    default void show() {
        System.out.println("A");
    }
}

interface B {

    default void show() {
        System.out.println("B");
    }
}

class C implements A, B {

    @Override
    public void show() {

        A.super.show();

        B.super.show();
    }
}

public class Main {

    public static void main(String[] args) {

        new C().show();
    }
}`
      },

      output: `A
B`
    },

    {
      id: "static-interface-methods",
      title: "Static Methods in Interfaces",

      paragraphs: [
        "Java 8 allows interfaces to contain static methods with implementations.",
        "Static interface methods belong to the interface itself and are not inherited by implementing classes."
      ],

      code: {
        language: "java",
        code: `interface MathUtils {

    static int square(int number) {
        return number * number;
    }
}

public class Main {

    public static void main(String[] args) {

        int result =
                MathUtils.square(5);

        System.out.println(result);
    }
}`
      },

      output: `25`
    },

    {
      id: "static-interface-method-access",
      title: "How to Access Static Interface Methods",

      paragraphs: [
        "A static interface method should be called using the interface name."
      ],

      code: {
        language: "java",
        code: `interface Calculator {

    static int add(int a, int b) {
        return a + b;
    }
}

public class Main {

    public static void main(String[] args) {

        System.out.println(
                Calculator.add(10, 20)
        );
    }
}`
      },

      output: `30`,

      bullets: [
        "Use InterfaceName.methodName().",
        "Static interface methods are not inherited by implementing classes.",
        "They are useful for utility operations related to the interface."
      ]
    },

    {
      id: "default-vs-static",
      title: "Default Method vs Static Interface Method",

      code: {
        language: "text",
        code: `Default Method

interface Vehicle {

    default void start() {
        ...
    }
}

Access through an object:

vehicle.start();


Static Interface Method

interface MathUtils {

    static int square(int n) {
        ...
    }
}

Access through the interface:

MathUtils.square(5);`
      },

      bullets: [
        "Default method → associated with an implementing object.",
        "Static interface method → associated with the interface.",
        "Default method can be overridden by an implementing class.",
        "Static interface method is not inherited by implementing classes."
      ]
    },

    {
      id: "functional-interfaces",
      title: "Functional Interfaces",

      paragraphs: [
        "A functional interface is an interface containing exactly one abstract method.",
        "Functional interfaces are important in Java 8 because lambda expressions can be used as implementations of functional interfaces.",
        "A functional interface can still contain default and static methods because those methods already have implementations."
      ],

      code: {
        language: "java",
        code: `@FunctionalInterface
interface Calculator {

    int calculate(int a, int b);

    default void printMessage() {
        System.out.println("Calculator");
    }

    static void info() {
        System.out.println("Functional interface");
    }
}

public class Main {

    public static void main(String[] args) {

        Calculator addition =
                (a, b) -> a + b;

        System.out.println(
                addition.calculate(10, 20)
        );

        addition.printMessage();

        Calculator.info();
    }
}`
      },

      output: `30
Calculator
Functional interface`
    },

    {
      id: "functional-interface-annotation",
      title: "@FunctionalInterface",

      paragraphs: [
        "The @FunctionalInterface annotation tells the compiler and other developers that an interface is intended to contain exactly one abstract method.",
        "The annotation is optional, but it provides compile-time validation."
      ],

      code: {
        language: "java",
        code: `@FunctionalInterface
interface Greeting {

    void sayHello();
}`
      },

      bullets: [
        "@FunctionalInterface was introduced with Java 8.",
        "It documents the intended design of the interface.",
        "The compiler reports an error if multiple abstract methods are declared.",
        "Default and static methods do not count as abstract methods."
      ]
    },

    {
      id: "private-interface-methods",
      title: "Private Interface Methods — Java 9+",

      paragraphs: [
        "Private methods in interfaces were introduced in Java 9, not Java 8.",
        "They allow an interface to share implementation logic between its default and static methods without exposing that helper method as part of the public interface API.",
        "Because this feature is not part of Java 8, it should be treated as a post-Java-8 enhancement."
      ],

      code: {
        language: "java",
        code: `interface Logger {

    default void logInfo(String message) {
        log("INFO", message);
    }

    default void logError(String message) {
        log("ERROR", message);
    }

    private void log(
            String level,
            String message
    ) {
        System.out.println(
                level + ": " + message
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Logger logger =
                new Logger() {
                };

        logger.logInfo("Application started");
        logger.logError("Something went wrong");
    }
}`
      },

      output: `INFO: Application started
ERROR: Something went wrong`,

      bullets: [
        "Private interface methods require Java 9 or later.",
        "They cannot be called by implementing classes.",
        "They can be used by default and static methods within the interface.",
        "They help remove duplicated implementation logic."
      ]
    },

    {
      id: "interface-private-static",
      title: "Private Static Interface Methods",

      paragraphs: [
        "Private interface methods can also be static. They can be used internally by other static methods in the interface.",
        "This is also a Java 9+ feature."
      ],

      code: {
        language: "java",
        code: `interface Validator {

    static boolean isValid(String value) {
        return hasText(value);
    }

    private static boolean hasText(
            String value
    ) {
        return value != null
                && !value.isEmpty();
    }
}

public class Main {

    public static void main(String[] args) {

        System.out.println(
                Validator.isValid("Java")
        );

        System.out.println(
                Validator.isValid("")
        );
    }
}`
      },

      output: `true
false`
    },

    {
      id: "interface-method-rules",
      title: "Important Interface Method Rules",

      bullets: [
        "An abstract method has no implementation.",
        "A default method has an implementation and can be inherited by implementing classes.",
        "A static interface method belongs to the interface.",
        "A default method can be overridden by an implementing class.",
        "Static interface methods are called using the interface name.",
        "A functional interface contains exactly one abstract method.",
        "Default and static methods do not count toward the single abstract-method requirement.",
        "Private interface methods are available from Java 9 onward."
      ]
    },

    {
      id: "best-practices",
      title: "Interface Best Practices",

      bullets: [
        "Use interfaces to define contracts and capabilities.",
        "Use default methods when a meaningful common implementation can be provided.",
        "Keep default methods small and focused.",
        "Avoid putting large business logic inside interfaces.",
        "Use static interface methods for utility behavior closely related to the interface.",
        "Use @FunctionalInterface when an interface is intentionally designed for lambda expressions.",
        "Resolve multiple default-method conflicts explicitly.",
        "Prefer composition when an interface starts accumulating too much implementation logic.",
        "Use private interface methods only when targeting Java 9 or later.",
        "Do not incorrectly assume that private interface methods are available in Java 8."
      ]
    },

    {
      id: "real-world-example",
      title: "Real-World Example",

      paragraphs: [
        "Consider a payment system with multiple payment implementations. A default method can provide common receipt behavior, while each implementation can provide its own payment logic."
      ],

      code: {
        language: "java",
        code: `interface Payment {

    void pay(double amount);

    default void printReceipt(double amount) {
        System.out.println(
                "Receipt generated for: " + amount
        );
    }
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
                "Paid using UPI: " + amount
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment payment =
                new UpiPayment();

        payment.pay(1500);

        payment.printReceipt(1500);
    }
}`
      },

      output: `Paid using UPI: 1500.0
Receipt generated for: 1500.0`
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Java 8 introduced default methods in interfaces.",
        "Default methods contain an implementation.",
        "An implementing class can override a default method.",
        "Default methods helped Java evolve existing interfaces without forcing every implementation to immediately implement new methods.",
        "Java 8 introduced static methods in interfaces.",
        "Static interface methods are called using the interface name.",
        "Static interface methods are not inherited by implementing classes.",
        "A functional interface contains exactly one abstract method.",
        "@FunctionalInterface provides compile-time validation.",
        "A functional interface can contain default and static methods.",
        "Multiple inherited default methods with the same signature require conflict resolution.",
        "Private interface methods were introduced in Java 9, not Java 8.",
        "Private interface methods can be used internally by interface methods.",
        "Use interface implementations carefully to keep interfaces focused and maintainable."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is a default method in Java 8?",
          answer:
            "A default method is an interface method with a concrete implementation. It allows interfaces to provide behavior that implementing classes can inherit or override."
        },
        {
          question: "Why were default methods introduced?",
          answer:
            "They allow existing interfaces to evolve by adding behavior without requiring every existing implementation to immediately provide an implementation for the new method."
        },
        {
          question: "Can a class override a default method?",
          answer:
            "Yes. An implementing class can override a default method and provide its own implementation."
        },
        {
          question: "What happens if two interfaces provide the same default method?",
          answer:
            "If a class implements both interfaces and they provide conflicting default methods with the same signature, the class must resolve the conflict by overriding the method."
        },
        {
          question: "How can you call a specific interface default method?",
          answer:
            "Inside the implementing class, a specific default method can be called using InterfaceName.super.methodName()."
        },
        {
          question: "Can an interface have static methods in Java 8?",
          answer:
            "Yes. Java 8 allows interfaces to define static methods with implementations."
        },
        {
          question: "Can a class inherit a static method from an interface?",
          answer:
            "No. Static interface methods belong to the interface and should be called using the interface name."
        },
        {
          question: "What is a functional interface?",
          answer:
            "A functional interface is an interface containing exactly one abstract method. It can be used as the target type for a lambda expression."
        },
        {
          question: "Can a functional interface contain default methods?",
          answer:
            "Yes. It can contain multiple default and static methods as long as it has exactly one abstract method."
        },
        {
          question: "What is @FunctionalInterface?",
          answer:
            "It is an annotation that tells the compiler that an interface is intended to be a functional interface and enables compile-time validation of that requirement."
        },
        {
          question: "Can Java 8 interfaces have private methods?",
          answer:
            "No. Private interface methods were introduced in Java 9. Java 8 supports default and static interface methods."
        },
        {
          question: "Why were private interface methods introduced?",
          answer:
            "They allow common implementation logic to be shared internally between interface methods without exposing that helper logic as part of the public interface."
        },
        {
          question: "What is the difference between a default method and a static interface method?",
          answer:
            "A default method is instance behavior that can be inherited and overridden by an implementing class. A static interface method belongs to the interface itself and is not inherited."
        },
        {
          question: "Can an interface have both abstract and default methods?",
          answer:
            "Yes. An interface can contain abstract methods, default methods, and static methods."
        }
      ]
    }
  ]
};