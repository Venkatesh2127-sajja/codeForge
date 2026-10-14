export const interfaces = {
  id: "interfaces",
  slug: "interfaces",
  title: "Interfaces in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn Java interfaces, implementation, multiple interfaces, default and static methods, interface references, polymorphism, and practical real-world examples.",
  estimatedTime: "45 min",

  sections: [
    // =========================================================
    // 1. INTRODUCTION
    // =========================================================

    {
      id: "introduction",
      title: "What is an Interface?",

      paragraphs: [
        "An interface in Java is a contract that defines behavior that implementing classes must provide.",
        "Interfaces are one of the main mechanisms used to achieve abstraction in Java.",
        "An interface allows us to define what a class should do without forcing all implementing classes to use the same implementation.",
        "Different classes can implement the same interface and provide their own implementations."
      ],

      bullets: [
        "An interface defines a contract.",
        "A class implements an interface using the implements keyword.",
        "Interfaces are commonly used for abstraction and loose coupling.",
        "A class can implement multiple interfaces.",
        "Interfaces are heavily used in real-world Java and Spring applications."
      ]
    },

    // =========================================================
    // 2. WHY INTERFACES
    // =========================================================

    {
      id: "why-interfaces",
      title: "Why Do We Need Interfaces?",

      paragraphs: [
        "Interfaces help us design flexible applications by separating what an object should do from how it performs that operation.",
        "They are especially useful when different classes need to follow the same contract but have different implementations."
      ],

      bullets: [
        "Provides abstraction.",
        "Defines a common contract.",
        "Supports loose coupling.",
        "Allows multiple interface implementation.",
        "Supports runtime polymorphism.",
        "Makes code easier to extend.",
        "Improves testability and maintainability."
      ]
    },

    // =========================================================
    // 3. CREATING INTERFACE
    // =========================================================

    {
      id: "creating-interface",
      title: "Creating an Interface",

      paragraphs: [
        "An interface is declared using the interface keyword.",
        "Methods declared in a basic interface are implicitly public and abstract unless they are default, static, or private methods."
      ],

      code: {
        language: "java",
        code: `interface Animal {

    void sound();

    void eat();
}`
      },

      bullets: [
        "interface → keyword used to declare an interface.",
        "sound() → abstract method.",
        "eat() → abstract method.",
        "The implementing class must provide implementations for these methods."
      ]
    },

    // =========================================================
    // 4. IMPLEMENTING INTERFACE
    // =========================================================

    {
      id: "implementing-interface",
      title: "Implementing an Interface",

      paragraphs: [
        "A class uses the implements keyword to implement an interface.",
        "A concrete class must provide implementations for all inherited abstract interface methods."
      ],

      code: {
        language: "java",
        code: `interface Animal {

    void sound();
}

class Dog implements Animal {

    @Override
    public void sound() {

        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.sound();
    }
}`
      },

      output: "Dog barks"
    },

    // =========================================================
    // 5. INTERFACE REFERENCE
    // =========================================================

    {
      id: "interface-reference",
      title: "Interface Reference",

      paragraphs: [
        "An interface can be used as a reference type.",
        "An interface reference can point to an object of a class that implements that interface.",
        "This is one of the most important uses of interfaces because it enables polymorphism."
      ],

      code: {
        language: "java",
        code: `interface Animal {

    void sound();
}

class Dog implements Animal {

    @Override
    public void sound() {

        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.sound();
    }
}`
      },

      output: "Dog barks"
    },

    // =========================================================
    // 6. INTERFACE POLYMORPHISM
    // =========================================================

    {
      id: "interface-polymorphism",
      title: "Interfaces and Polymorphism",

      paragraphs: [
        "Interfaces work naturally with runtime polymorphism.",
        "The same interface reference can point to different implementing objects.",
        "The actual object's implementation is executed when an overridden interface method is called."
      ],

      code: {
        language: "java",
        code: `interface Payment {

    void pay(double amount);
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using UPI"
        );
    }
}

class CardPayment implements Payment {

    @Override
    public void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using Card"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment payment;

        payment = new UpiPayment();
        payment.pay(1000);

        payment = new CardPayment();
        payment.pay(2000);
    }
}`
      },

      output: `Paid 1000.0 using UPI
Paid 2000.0 using Card`
    },

    // =========================================================
    // 7. MULTIPLE INTERFACES
    // =========================================================

    {
      id: "multiple-interfaces",
      title: "Implementing Multiple Interfaces",

      paragraphs: [
        "One of the major advantages of interfaces is that a class can implement multiple interfaces.",
        "This allows a class to follow multiple contracts."
      ],

      code: {
        language: "java",
        code: `interface Printable {

    void print();
}

interface Scannable {

    void scan();
}

class Printer implements Printable, Scannable {

    @Override
    public void print() {

        System.out.println("Printing document");
    }

    @Override
    public void scan() {

        System.out.println("Scanning document");
    }
}

public class Main {

    public static void main(String[] args) {

        Printer printer = new Printer();

        printer.print();
        printer.scan();
    }
}`
      },

      output: `Printing document
Scanning document`
    },

    // =========================================================
    // 8. MULTIPLE INTERFACES PRACTICAL EXAMPLE
    // =========================================================

    {
      id: "multiple-interfaces-example",
      title: "Practical Example: Employee Roles",

      paragraphs: [
        "A class may need to perform multiple responsibilities. Interfaces allow those responsibilities to be represented as separate contracts."
      ],

      code: {
        language: "java",
        code: `interface Developer {

    void writeCode();
}

interface Tester {

    void testApplication();
}

class SoftwareEngineer
        implements Developer, Tester {

    @Override
    public void writeCode() {

        System.out.println(
            "Writing Java code"
        );
    }

    @Override
    public void testApplication() {

        System.out.println(
            "Testing application"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        SoftwareEngineer engineer =
            new SoftwareEngineer();

        engineer.writeCode();
        engineer.testApplication();
    }
}`
      },

      output: `Writing Java code
Testing application`
    },

    // =========================================================
    // 9. INTERFACE VARIABLES
    // =========================================================

    {
      id: "interface-variables",
      title: "Variables in Interfaces",

      paragraphs: [
        "Variables declared in an interface are implicitly public, static, and final.",
        "Therefore, interface variables behave like constants."
      ],

      code: {
        language: "java",
        code: `interface Payment {

    double TAX_RATE = 0.18;
}

public class Main {

    public static void main(String[] args) {

        System.out.println(
            Payment.TAX_RATE
        );
    }
}`
      },

      output: "0.18",

      bullets: [
        "public → accessible from anywhere where the interface is accessible.",
        "static → belongs to the interface rather than an object.",
        "final → value cannot be reassigned.",
        "Interface variables should normally represent constants."
      ]
    },

    // =========================================================
    // 10. DEFAULT METHODS
    // =========================================================

    {
      id: "default-method",
      title: "Default Methods in Interfaces",

      paragraphs: [
        "Java allows interfaces to contain default methods with implementations.",
        "Default methods were introduced in Java 8 and allow interfaces to provide behavior without forcing every existing implementation class to immediately implement the method."
      ],

      code: {
        language: "java",
        code: `interface Vehicle {

    void start();

    default void stop() {

        System.out.println(
            "Vehicle stopped"
        );
    }
}

class Car implements Vehicle {

    @Override
    public void start() {

        System.out.println(
            "Car started"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.start();
        car.stop();
    }
}`
      },

      output: `Car started
Vehicle stopped`
    },

    // =========================================================
    // 11. OVERRIDING DEFAULT METHOD
    // =========================================================

    {
      id: "override-default-method",
      title: "Overriding a Default Method",

      paragraphs: [
        "A class can override a default interface method if it needs different behavior."
      ],

      code: {
        language: "java",
        code: `interface Vehicle {

    default void stop() {

        System.out.println(
            "Vehicle stopped"
        );
    }
}

class Car implements Vehicle {

    @Override
    public void stop() {

        System.out.println(
            "Car stopped safely"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.stop();
    }
}`
      },

      output: "Car stopped safely"
    },

    // =========================================================
    // 12. STATIC METHODS
    // =========================================================

    {
      id: "static-method",
      title: "Static Methods in Interfaces",

      paragraphs: [
        "Interfaces can contain static methods.",
        "A static interface method belongs to the interface itself and is called using the interface name."
      ],

      code: {
        language: "java",
        code: `interface Utility {

    static void showMessage() {

        System.out.println(
            "Utility method"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Utility.showMessage();
    }
}`
      },

      output: "Utility method",

      bullets: [
        "Call interface static methods using the interface name.",
        "They are not inherited as instance methods by implementing classes.",
        "They cannot be called through an object reference."
      ]
    },

    // =========================================================
    // 13. PRIVATE METHODS
    // =========================================================

    {
      id: "private-method",
      title: "Private Methods in Interfaces",

      paragraphs: [
        "Modern Java interfaces can also contain private methods.",
        "Private interface methods are useful for sharing internal implementation logic between default or static methods without exposing that helper as part of the public interface contract."
      ],

      code: {
        language: "java",
        code: `interface Logger {

    default void logInfo(String message) {

        print("INFO", message);
    }

    default void logError(String message) {

        print("ERROR", message);
    }

    private void print(
        String level,
        String message
    ) {

        System.out.println(
            level + ": " + message
        );
    }
}

class Application implements Logger {
}

public class Main {

    public static void main(String[] args) {

        Application application =
            new Application();

        application.logInfo("Application started");
        application.logError("Something went wrong");
    }
}`
      },

      output: `INFO: Application started
ERROR: Something went wrong`
    },

    // =========================================================
    // 14. INTERFACE EXTENDING INTERFACE
    // =========================================================

    {
      id: "interface-inheritance",
      title: "Interface Extending Another Interface",

      paragraphs: [
        "An interface can extend another interface using the extends keyword.",
        "Unlike classes, an interface can extend multiple interfaces."
      ],

      code: {
        language: "java",
        code: `interface Animal {

    void eat();
}

interface Pet extends Animal {

    void play();
}

class Dog implements Pet {

    @Override
    public void eat() {

        System.out.println(
            "Dog is eating"
        );
    }

    @Override
    public void play() {

        System.out.println(
            "Dog is playing"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.eat();
        dog.play();
    }
}`
      },

      output: `Dog is eating
Dog is playing`
    },

    // =========================================================
    // 15. MULTIPLE INTERFACE INHERITANCE
    // =========================================================

    {
      id: "multiple-interface-inheritance",
      title: "An Interface Can Extend Multiple Interfaces",

      paragraphs: [
        "Java allows an interface to extend multiple interfaces.",
        "This provides a way to combine multiple contracts into a single interface."
      ],

      code: {
        language: "java",
        code: `interface Printable {

    void print();
}

interface Scannable {

    void scan();
}

interface Machine
        extends Printable, Scannable {

    void start();
}

class Printer
        implements Machine {

    @Override
    public void print() {

        System.out.println("Printing");
    }

    @Override
    public void scan() {

        System.out.println("Scanning");
    }

    @Override
    public void start() {

        System.out.println("Machine started");
    }
}

public class Main {

    public static void main(String[] args) {

        Printer printer = new Printer();

        printer.start();
        printer.print();
        printer.scan();
    }
}`
      },

      output: `Machine started
Printing
Scanning`
    },

    // =========================================================
    // 16. DEFAULT METHOD CONFLICT
    // =========================================================

    {
      id: "default-method-conflict",
      title: "Default Method Conflict",

      paragraphs: [
        "If a class implements two interfaces that contain default methods with the same signature, the class must resolve the conflict by overriding the method."
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

class Test implements A, B {

    @Override
    public void show() {

        System.out.println(
            "Test implementation"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Test test = new Test();

        test.show();
    }
}`
      },

      output: "Test implementation"
    },

    // =========================================================
    // 17. PRACTICAL PAYMENT SYSTEM
    // =========================================================

    {
      id: "payment-example",
      title: "Practical Example: Payment System",

      paragraphs: [
        "Payment processing is a common example of interface-based design.",
        "The application can depend on the Payment interface instead of depending directly on UPI, card, or other concrete implementations."
      ],

      code: {
        language: "java",
        code: `interface Payment {

    void pay(double amount);
}

class UpiPayment implements Payment {

    @Override
    public void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using UPI"
        );
    }
}

class CardPayment implements Payment {

    @Override
    public void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using Card"
        );
    }
}

class PaymentService {

    void processPayment(
        Payment payment,
        double amount
    ) {

        payment.pay(amount);
    }
}

public class Main {

    public static void main(String[] args) {

        PaymentService service =
            new PaymentService();

        service.processPayment(
            new UpiPayment(),
            1000
        );

        service.processPayment(
            new CardPayment(),
            2000
        );
    }
}`
      },

      output: `Paid 1000.0 using UPI
Paid 2000.0 using Card`
    },

    // =========================================================
    // 18. INTERFACE VS ABSTRACT CLASS
    // =========================================================

    {
      id: "interface-vs-abstract-class",
      title: "Interface vs Abstract Class",

      paragraphs: [
        "Both interfaces and abstract classes can be used for abstraction, but they serve different design purposes.",
        "An abstract class is useful when related classes need shared state or common implementation.",
        "An interface is useful when we want to define a contract that can be implemented by different classes."
      ],

      bullets: [
        "Interface → defines a contract.",
        "Abstract class → can define a contract and provide shared implementation.",
        "A class can implement multiple interfaces.",
        "A class can extend only one class.",
        "An abstract class can have constructors.",
        "Interfaces do not have constructors.",
        "Abstract classes can have instance fields.",
        "Interface fields are public, static, and final.",
        "Both can be used as reference types for polymorphism."
      ]
    },

    // =========================================================
    // 19. COMMON MISTAKES + KEY POINTS
    // =========================================================

    {
      id: "common-mistakes-and-key-points",
      title: "Common Mistakes and Key Points",

      paragraphs: [
        "Interfaces are simple to use once their contract-based design is understood. However, beginners often make mistakes around access modifiers, implementation, and default methods."
      ],

      bullets: [
        "Use implements when a class implements an interface.",
        "Use extends when an interface extends another interface.",
        "A concrete class must implement all inherited abstract interface methods.",
        "Interface methods that are abstract must be implemented with public visibility.",
        "Interface variables are public, static, and final.",
        "Do not try to create an object directly from an interface.",
        "An interface reference can point to an object of an implementing class.",
        "A class can implement multiple interfaces.",
        "An interface can extend multiple interfaces.",
        "Default methods can contain implementations.",
        "Static interface methods belong to the interface.",
        "Private interface methods are useful as internal helper methods.",
        "Interfaces are widely used for loose coupling and dependency injection."
      ]
    },

    // =========================================================
    // 20. INTERVIEW QUESTIONS
    // =========================================================

    {
      id: "interview-questions",
      title: "Interfaces: Interview Questions",

      interviewQuestions: [
        {
          question: "What is an interface in Java?",
          answer:
            "An interface is a contract that defines behavior that implementing classes must provide. It is also a major mechanism for achieving abstraction in Java."
        },

        {
          question: "How do you implement an interface?",
          answer:
            "A class implements an interface using the implements keyword. For example: class Dog implements Animal."
        },

        {
          question: "Can we create an object of an interface?",
          answer:
            "No. An interface cannot be directly instantiated. However, an interface reference can point to an object of a class that implements the interface."
        },

        {
          question: "Can a class implement multiple interfaces?",
          answer:
            "Yes. A Java class can implement multiple interfaces, for example: class Printer implements Printable, Scannable."
        },

        {
          question: "Can an interface extend another interface?",
          answer:
            "Yes. An interface can extend one or more interfaces using the extends keyword."
        },

        {
          question: "Can an interface extend multiple interfaces?",
          answer:
            "Yes. Java allows an interface to extend multiple interfaces."
        },

        {
          question: "What is the difference between extends and implements?",
          answer:
            "A class uses extends to inherit from another class. A class uses implements to implement an interface. An interface uses extends to inherit from another interface."
        },

        {
          question: "What is a default method in an interface?",
          answer:
            "A default method is an interface method with an implementation. Default methods were introduced in Java 8."
        },

        {
          question: "Can we override a default method?",
          answer:
            "Yes. An implementing class can override a default interface method to provide different behavior."
        },

        {
          question: "Can an interface have static methods?",
          answer:
            "Yes. Interfaces can contain static methods. They are called using the interface name, such as Utility.showMessage()."
        },

        {
          question: "Can an interface have private methods?",
          answer:
            "Yes. Modern Java interfaces can have private methods, which are useful for sharing internal implementation logic between default or static methods."
        },

        {
          question: "What are variables in an interface?",
          answer:
            "Variables declared in an interface are implicitly public, static, and final. They therefore behave as constants."
        },

        {
          question: "Why are interface methods implemented as public?",
          answer:
            "Interface methods form part of the public contract. A class implementing an interface cannot reduce the visibility of an inherited interface method."
        },

        {
          question: "What happens if two interfaces have the same default method?",
          answer:
            "If a class implements both interfaces and both provide the same default method, the class must override that method to resolve the conflict."
        },

        {
          question: "What is the difference between an interface and an abstract class?",
          answer:
            "An interface primarily defines a contract and supports multiple implementation inheritance. An abstract class can provide both abstract and concrete behavior, maintain instance state, and define constructors."
        },

        {
          question: "Why are interfaces useful in Spring applications?",
          answer:
            "Interfaces help separate contracts from implementations and support loose coupling. For example, a service can depend on an interface while Spring injects a concrete implementation."
        },

        {
          question: "What is interface-based polymorphism?",
          answer:
            "Interface-based polymorphism occurs when an interface reference refers to different implementing class objects and the appropriate implementation executes at runtime."
        },

        {
          question: "Can an interface contain constructors?",
          answer:
            "No. Interfaces do not have constructors because interfaces are not instantiated directly."
        }
      ]
    }
  ]
};