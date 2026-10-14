export const abstraction = {
  id: "abstraction",
  slug: "abstraction",
  title: "Abstraction in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn abstraction in Java using abstract classes, abstract methods, concrete methods, constructors, parent references, and practical real-world examples.",
  estimatedTime: "40 min",

  sections: [
    // =========================================================
    // 1. INTRODUCTION TO ABSTRACTION
    // =========================================================

    {
      id: "introduction",
      title: "What is Abstraction?",

      paragraphs: [
        "Abstraction is one of the four fundamental principles of object-oriented programming.",
        "Abstraction means hiding unnecessary implementation details and exposing only the essential functionality to the user.",
        "In Java, abstraction can be achieved mainly using abstract classes and interfaces.",
        "For example, when we use an ATM, we know how to withdraw money, deposit money, or check our balance, but we do not need to know the internal implementation of the banking system."
      ],

      bullets: [
        "Abstraction focuses on what an object does rather than how it does it.",
        "It hides implementation details.",
        "It exposes essential operations.",
        "Abstract classes and interfaces are the main tools for abstraction in Java."
      ]
    },

    // =========================================================
    // 2. WHY ABSTRACTION
    // =========================================================

    {
      id: "why-abstraction",
      title: "Why Do We Need Abstraction?",

      paragraphs: [
        "Without abstraction, users or other parts of the application may need to understand unnecessary implementation details.",
        "Abstraction provides a clean contract between a class and its users.",
        "It also makes large applications easier to maintain because implementation details can change without changing the code that uses the abstraction."
      ],

      bullets: [
        "Reduces unnecessary complexity.",
        "Hides implementation details.",
        "Provides a clear contract.",
        "Improves maintainability.",
        "Makes code easier to extend.",
        "Supports loose coupling when used with interfaces.",
        "Allows different implementations behind the same abstraction."
      ]
    },

    // =========================================================
    // 3. REAL WORLD EXAMPLE
    // =========================================================

    {
      id: "real-world-example",
      title: "Real-World Example of Abstraction",

      paragraphs: [
        "Consider a car. A driver uses operations such as start(), accelerate(), brake(), and stop().",
        "The driver does not need to understand every internal operation of the engine, fuel system, transmission, or electronic control unit.",
        "The car provides the required operations while hiding the internal implementation."
      ],

      code: {
        language: "java",
        code: `class Car {

    void start() {

        System.out.println("Car started");
    }

    void stop() {

        System.out.println("Car stopped");
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
Car stopped`
    },

    // =========================================================
    // 4. ABSTRACT CLASS
    // =========================================================

    {
      id: "abstract-class",
      title: "What is an Abstract Class?",

      paragraphs: [
        "An abstract class is a class declared using the abstract keyword.",
        "An abstract class can contain abstract methods as well as concrete methods.",
        "An abstract class is commonly used when multiple child classes share some common behavior but must provide their own implementation for certain operations."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();

    void eat() {

        System.out.println("Animal is eating");
    }
}`
      },

      bullets: [
        "An abstract class can contain abstract methods.",
        "An abstract class can contain concrete methods.",
        "An abstract class can contain fields.",
        "An abstract class can have constructors.",
        "An abstract class cannot be directly instantiated."
      ]
    },

    // =========================================================
    // 5. ABSTRACT KEYWORD
    // =========================================================

    {
      id: "abstract-keyword",
      title: "The abstract Keyword",

      paragraphs: [
        "The abstract keyword is used to declare abstract classes and abstract methods.",
        "An abstract method contains only a method declaration and does not contain an implementation in the abstract class."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();
}`
      },

      bullets: [
        "abstract class → declares an abstract class.",
        "abstract method → declares a method that must be implemented by an appropriate concrete child class.",
        "An abstract method does not have a method body in the abstract class."
      ]
    },

    // =========================================================
    // 6. ABSTRACT METHOD
    // =========================================================

    {
      id: "abstract-method",
      title: "What is an Abstract Method?",

      paragraphs: [
        "An abstract method is a method declared without an implementation body.",
        "A concrete child class must provide an implementation for inherited abstract methods unless the child class is also abstract."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {

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
    // 7. CONCRETE METHOD IN ABSTRACT CLASS
    // =========================================================

    {
      id: "concrete-method",
      title: "Concrete Methods in an Abstract Class",

      paragraphs: [
        "An abstract class can contain normal concrete methods with complete implementations.",
        "This allows an abstract class to provide common behavior while leaving specialized behavior to child classes."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();

    void eat() {

        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.sound();
        dog.eat();
    }
}`
      },

      output: `Dog barks
Animal is eating`
    },

    // =========================================================
    // 8. CANNOT INSTANTIATE ABSTRACT CLASS
    // =========================================================

    {
      id: "cannot-instantiate",
      title: "Why Can't We Create an Object of an Abstract Class?",

      paragraphs: [
        "An abstract class may contain incomplete behavior through abstract methods.",
        "Therefore, Java does not allow direct instantiation of an abstract class."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();
}

public class Main {

    public static void main(String[] args) {

        // Animal animal = new Animal();

        // Compilation error
    }
}`
      },

      bullets: [
        "An abstract class is incomplete by design.",
        "It may contain abstract methods without implementations.",
        "Java prevents direct object creation using new.",
        "A concrete child class can be instantiated after implementing the required abstract methods."
      ]
    },

    // =========================================================
    // 9. CHILD CLASS IMPLEMENTATION
    // =========================================================

    {
      id: "child-class-implementation",
      title: "Implementing an Abstract Method in a Child Class",

      paragraphs: [
        "When a concrete class extends an abstract class, it must implement all inherited abstract methods."
      ],

      code: {
        language: "java",
        code: `abstract class Shape {

    abstract void draw();
}

class Circle extends Shape {

    @Override
    void draw() {

        System.out.println("Drawing Circle");
    }
}

class Rectangle extends Shape {

    @Override
    void draw() {

        System.out.println("Drawing Rectangle");
    }
}

public class Main {

    public static void main(String[] args) {

        Circle circle = new Circle();
        Rectangle rectangle = new Rectangle();

        circle.draw();
        rectangle.draw();
    }
}`
      },

      output: `Drawing Circle
Drawing Rectangle`
    },

    // =========================================================
    // 10. ABSTRACT CLASS REFERENCE
    // =========================================================

    {
      id: "abstract-reference",
      title: "Abstract Class Reference and Upcasting",

      paragraphs: [
        "Although we cannot create an object directly from an abstract class, we can create a reference of the abstract class type.",
        "That reference can point to an object of a concrete child class.",
        "This is a common use of abstraction together with runtime polymorphism."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    abstract void sound();
}

class Dog extends Animal {

    @Override
    void sound() {

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
    // 11. CONSTRUCTOR IN ABSTRACT CLASS
    // =========================================================

    {
      id: "constructor-in-abstract-class",
      title: "Constructors in Abstract Classes",

      paragraphs: [
        "An abstract class can have a constructor.",
        "The constructor of the abstract parent class executes when a child class object is created.",
        "We cannot create an abstract class object directly, but its constructor can still initialize common state for child objects."
      ],

      code: {
        language: "java",
        code: `abstract class Animal {

    Animal() {

        System.out.println("Animal constructor");
    }

    abstract void sound();
}

class Dog extends Animal {

    Dog() {

        System.out.println("Dog constructor");
    }

    @Override
    void sound() {

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

      output: `Animal constructor
Dog constructor
Dog barks`
    },

    // =========================================================
    // 12. MULTIPLE ABSTRACT METHODS
    // =========================================================

    {
      id: "multiple-abstract-methods",
      title: "Multiple Abstract Methods",

      paragraphs: [
        "An abstract class can contain multiple abstract methods.",
        "A concrete child class must provide implementations for all inherited abstract methods."
      ],

      code: {
        language: "java",
        code: `abstract class Vehicle {

    abstract void start();

    abstract void stop();
}

class Car extends Vehicle {

    @Override
    void start() {

        System.out.println("Car started");
    }

    @Override
    void stop() {

        System.out.println("Car stopped");
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
Car stopped`
    },

    // =========================================================
    // 13. BANK ACCOUNT EXAMPLE
    // =========================================================

    {
      id: "bank-account-example",
      title: "Practical Example: Bank Account",

      paragraphs: [
        "A banking application can use an abstract Account class to define common operations while allowing different account types to implement specialized behavior.",
        "For example, savings and current accounts may have different withdrawal rules."
      ],

      code: {
        language: "java",
        code: `abstract class Account {

    protected double balance;

    Account(double balance) {

        this.balance = balance;
    }

    void deposit(double amount) {

        balance += amount;

        System.out.println(
            "Deposited: " + amount
        );
    }

    abstract void withdraw(double amount);

    void showBalance() {

        System.out.println(
            "Balance: " + balance
        );
    }
}

class SavingsAccount extends Account {

    SavingsAccount(double balance) {

        super(balance);
    }

    @Override
    void withdraw(double amount) {

        if (amount <= balance) {

            balance -= amount;

            System.out.println(
                "Savings withdrawal successful"
            );

        } else {

            System.out.println(
                "Insufficient balance"
            );
        }
    }
}

public class Main {

    public static void main(String[] args) {

        Account account =
            new SavingsAccount(10000);

        account.deposit(2000);

        account.withdraw(3000);

        account.showBalance();
    }
}`
      },

      output: `Deposited: 2000.0
Savings withdrawal successful
Balance: 9000.0`
    },

    // =========================================================
    // 14. VEHICLE EXAMPLE
    // =========================================================

    {
      id: "vehicle-example",
      title: "Practical Example: Vehicle System",

      paragraphs: [
        "A vehicle system can define common operations such as start() and stop() while allowing different vehicle types to implement how they start."
      ],

      code: {
        language: "java",
        code: `abstract class Vehicle {

    abstract void start();

    void stop() {

        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {

    @Override
    void start() {

        System.out.println(
            "Car starts using engine"
        );
    }
}

class ElectricCar extends Vehicle {

    @Override
    void start() {

        System.out.println(
            "Electric car starts using battery"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Vehicle vehicle1 = new Car();
        Vehicle vehicle2 = new ElectricCar();

        vehicle1.start();
        vehicle1.stop();

        vehicle2.start();
        vehicle2.stop();
    }
}`
      },

      output: `Car starts using engine
Vehicle stopped
Electric car starts using battery
Vehicle stopped`
    },

    // =========================================================
    // 15. ABSTRACT CLASS VS NORMAL CLASS
    // =========================================================

    {
      id: "abstract-vs-normal-class",
      title: "Abstract Class vs Normal Class",

      paragraphs: [
        "An abstract class and a normal class can both contain fields, constructors, and concrete methods.",
        "The major difference is that an abstract class can contain abstract methods and cannot be directly instantiated."
      ],

      bullets: [
        "Abstract class → declared using abstract.",
        "Normal class → does not require the abstract keyword.",
        "Abstract class → may contain abstract methods.",
        "Normal class → cannot contain abstract methods unless the class itself is abstract.",
        "Abstract class → cannot be directly instantiated.",
        "Normal class → can normally be instantiated.",
        "Both can contain constructors.",
        "Both can contain fields and concrete methods."
      ]
    },

    // =========================================================
    // 16. ABSTRACT CLASS VS INTERFACE
    // =========================================================

    {
      id: "abstract-class-vs-interface",
      title: "Abstract Class vs Interface",

      paragraphs: [
        "Both abstract classes and interfaces are used to achieve abstraction in Java.",
        "An abstract class is useful when related classes need to share state and common implementation.",
        "An interface is useful when we want to define a contract that can be implemented by different classes, even when those classes do not share a direct class hierarchy.",
        "Interfaces are covered in more detail separately."
      ],

      bullets: [
        "Abstract class → can have instance fields.",
        "Abstract class → can have constructors.",
        "Abstract class → can contain abstract and concrete methods.",
        "Interface → primarily defines a contract.",
        "A class can extend only one class.",
        "A class can implement multiple interfaces.",
        "Both can be used as reference types for polymorphism."
      ]
    },

    // =========================================================
    // 17. PRACTICAL PAYMENT EXAMPLE
    // =========================================================

    {
      id: "payment-example",
      title: "Practical Example: Payment Abstraction",

      paragraphs: [
        "A payment application can define a common payment operation while allowing each payment method to provide its own implementation."
      ],

      code: {
        language: "java",
        code: `abstract class Payment {

    abstract void pay(double amount);

    void paymentStarted() {

        System.out.println(
            "Payment started"
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using UPI"
        );
    }
}

class CardPayment extends Payment {

    @Override
    void pay(double amount) {

        System.out.println(
            "Paid " + amount + " using Card"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment payment =
            new UpiPayment();

        payment.paymentStarted();
        payment.pay(1000);

        payment =
            new CardPayment();

        payment.paymentStarted();
        payment.pay(2000);
    }
}`
      },

      output: `Payment started
Paid 1000.0 using UPI
Payment started
Paid 2000.0 using Card`
    },

    // =========================================================
    // 18. COMMON MISTAKES
    // =========================================================

    {
      id: "common-mistakes",
      title: "Common Mistakes in Abstraction",

      paragraphs: [
        "Beginners often make a few common mistakes when working with abstract classes."
      ],

      bullets: [
        "Trying to create an object directly from an abstract class.",
        "Forgetting to implement all inherited abstract methods in a concrete child class.",
        "Trying to give an implementation body to an abstract method in the usual abstract-method form.",
        "Confusing abstraction with encapsulation.",
        "Assuming an abstract class can contain only abstract methods.",
        "Forgetting that an abstract class can have constructors.",
        "Assuming abstract classes cannot contain fields.",
        "Trying to use abstract as a variable modifier."
      ]
    },

    // =========================================================
    // 19. KEY POINTS
    // =========================================================

    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Abstraction means hiding implementation details and exposing essential functionality.",
        "Java supports abstraction mainly through abstract classes and interfaces.",
        "An abstract class is declared using the abstract keyword.",
        "An abstract class can contain abstract methods.",
        "An abstract class can also contain concrete methods.",
        "An abstract class can contain fields.",
        "An abstract class can have constructors.",
        "An abstract class cannot be directly instantiated.",
        "A concrete child class must implement inherited abstract methods.",
        "An abstract class can be used as a reference type.",
        "Abstract class references can participate in runtime polymorphism.",
        "An abstract class is useful when related classes share common state or behavior.",
        "Interfaces provide another important way to achieve abstraction.",
        "Abstraction focuses on what an object does rather than how it does it."
      ]
    },

    // =========================================================
    // 20. INTERVIEW QUESTIONS
    // =========================================================

    {
      id: "interview-questions",
      title: "Abstraction: Interview Questions",

      interviewQuestions: [
        {
          question: "What is abstraction in Java?",
          answer:
            "Abstraction is the process of hiding unnecessary implementation details and exposing only the essential functionality. Java mainly achieves abstraction using abstract classes and interfaces."
        },

        {
          question: "How can we achieve abstraction in Java?",
          answer:
            "Abstraction can mainly be achieved using abstract classes and interfaces."
        },

        {
          question: "What is an abstract class?",
          answer:
            "An abstract class is a class declared using the abstract keyword. It can contain abstract methods, concrete methods, fields, and constructors."
        },

        {
          question: "Can we create an object of an abstract class?",
          answer:
            "No. Java does not allow direct instantiation of an abstract class."
        },

        {
          question: "Can an abstract class have a constructor?",
          answer:
            "Yes. An abstract class can have constructors, and the abstract class constructor executes as part of constructing a concrete child object."
        },

        {
          question: "Can an abstract class contain concrete methods?",
          answer:
            "Yes. An abstract class can contain both abstract methods and concrete methods."
        },

        {
          question: "Can an abstract class contain fields?",
          answer:
            "Yes. An abstract class can contain instance fields and static fields just like other classes."
        },

        {
          question: "What is an abstract method?",
          answer:
            "An abstract method is a method declared without an implementation body. A concrete child class must implement it unless that child class is also abstract."
        },

        {
          question: "Can an abstract class contain only abstract methods?",
          answer:
            "No. It can contain abstract methods as well as concrete methods, constructors, fields, and other members."
        },

        {
          question: "What happens if a child class does not implement an abstract method?",
          answer:
            "If the child class is concrete, it must implement all inherited abstract methods. Otherwise, the child class must also be declared abstract."
        },

        {
          question: "What is the difference between abstraction and encapsulation?",
          answer:
            "Abstraction focuses on hiding implementation complexity and exposing essential behavior. Encapsulation focuses on bundling data and methods together and controlling access to the object's internal state."
        },

        {
          question: "Can we use an abstract class as a reference type?",
          answer:
            "Yes. An abstract class can be used as a reference type and can refer to an object of a concrete child class."
        },

        {
          question: "Can an abstract class have both abstract and non-abstract methods?",
          answer:
            "Yes. An abstract class can contain both abstract methods and concrete methods."
        },

        {
          question: "What is the difference between an abstract class and an interface?",
          answer:
            "An abstract class can contain state, constructors, abstract methods, and concrete methods. An interface primarily defines a contract and allows a class to implement multiple interfaces."
        },

        {
          question: "Why is abstraction useful in real applications?",
          answer:
            "Abstraction reduces complexity, hides implementation details, provides clear contracts, and allows different implementations to be used through a common type."
        }
      ]
    }
  ]
};