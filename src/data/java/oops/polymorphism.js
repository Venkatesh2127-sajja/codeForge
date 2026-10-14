export const polymorphism = {
  id: "polymorphism",
  slug: "polymorphism",
  title: "Polymorphism in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn polymorphism in Java using method overriding, upcasting, parent references, runtime method dispatch, and practical real-world examples.",
  estimatedTime: "40 min",

  sections: [
    // =========================================================
    // 1. INTRODUCTION
    // =========================================================

    {
      id: "introduction",
      title: "Introduction to Polymorphism",

      paragraphs: [
        "Polymorphism is one of the fundamental principles of object-oriented programming.",
        "The word polymorphism means many forms.",
        "In Java, polymorphism allows the same reference, method call, or interface to represent different implementations depending on the situation.",
        "A common example is a parent class reference referring to different child class objects."
      ],

      bullets: [
        "Poly → Many",
        "Morphism → Forms",
        "Polymorphism → One concept with multiple forms",
        "Method overriding is the main mechanism used for runtime polymorphism."
      ]
    },

    // =========================================================
    // 2. TYPES OF POLYMORPHISM
    // =========================================================

    {
      id: "types-of-polymorphism",
      title: "Types of Polymorphism in Java",

      paragraphs: [
        "Polymorphism in Java is commonly discussed in two forms: compile-time polymorphism and runtime polymorphism."
      ],

      bullets: [
        "Compile-time polymorphism → commonly achieved through method overloading.",
        "Runtime polymorphism → commonly achieved through method overriding and dynamic method dispatch."
      ]
    },

    // =========================================================
    // 3. COMPILE TIME POLYMORPHISM
    // =========================================================

    {
      id: "compile-time-polymorphism",
      title: "Compile-Time Polymorphism",

      paragraphs: [
        "Compile-time polymorphism occurs when the compiler determines which overloaded method should be called based on the method signature and arguments."
      ],

      code: {
        language: "java",
        code: `class Calculator {

    int add(int a, int b) {

        return a + b;
    }

    int add(int a, int b, int c) {

        return a + b + c;
    }
}

public class Main {

    public static void main(String[] args) {

        Calculator calculator = new Calculator();

        System.out.println(
            calculator.add(10, 20)
        );

        System.out.println(
            calculator.add(10, 20, 30)
        );
    }
}`
      },

      output: `30
60`
    },

    // =========================================================
    // 4. RUNTIME POLYMORPHISM
    // =========================================================

    {
      id: "runtime-polymorphism",
      title: "Runtime Polymorphism",

      paragraphs: [
        "Runtime polymorphism occurs when a parent class reference refers to a child class object and an overridden method is selected at runtime.",
        "The actual object created determines which overridden method implementation executes."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal makes a sound");
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

        Animal animal = new Dog();

        animal.sound();
    }
}`
      },

      output: "Dog barks"
    },

    // =========================================================
    // 5. UPCASTING
    // =========================================================

    {
      id: "upcasting",
      title: "What is Upcasting?",

      paragraphs: [
        "Upcasting means assigning a child class object to a parent class reference.",
        "It is called upcasting because the reference is moved up the inheritance hierarchy."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void eat() {

        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {

    void bark() {

        System.out.println("Dog is barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.eat();
    }
}`
      },

      output: "Animal is eating"
    },

    // =========================================================
    // 6. UPCASTING SYNTAX
    // =========================================================

    {
      id: "upcasting-syntax",
      title: "Upcasting Syntax",

      paragraphs: [
        "The general form of upcasting is to use a parent class reference and assign a child class object to it."
      ],

      code: {
        language: "java",
        code: `Parent reference = new Child();`
      },

      bullets: [
        "Parent → Parent class type",
        "reference → Reference variable",
        "new Child() → Child class object",
        "The object is created as the child type, but the reference type is the parent."
      ]
    },

    // =========================================================
    // 7. PRACTICAL UPCASTING
    // =========================================================

    {
      id: "upcasting-example",
      title: "Practical Upcasting Example",

      paragraphs: [
        "Suppose Car and Bike both extend Vehicle. A Vehicle reference can point to either a Car or Bike object."
      ],

      code: {
        language: "java",
        code: `class Vehicle {

    void start() {

        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {

    @Override
    void start() {

        System.out.println("Car starts");
    }
}

class Bike extends Vehicle {

    @Override
    void start() {

        System.out.println("Bike starts");
    }
}

public class Main {

    public static void main(String[] args) {

        Vehicle vehicle1 = new Car();
        Vehicle vehicle2 = new Bike();

        vehicle1.start();
        vehicle2.start();
    }
}`
      },

      output: `Car starts
Bike starts`
    },

    // =========================================================
    // 8. METHOD OVERRIDING
    // =========================================================

    {
      id: "method-overriding",
      title: "Method Overriding and Polymorphism",

      paragraphs: [
        "Method overriding is the foundation of runtime polymorphism in Java.",
        "A child class provides its own implementation of a method already defined in the parent class.",
        "When a parent reference points to a child object, the overridden child method can execute at runtime."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}

class Cat extends Animal {

    @Override
    void sound() {

        System.out.println("Cat meows");
    }
}`
      }
    },

    // =========================================================
    // 9. RUNTIME METHOD DISPATCH
    // =========================================================

    {
      id: "runtime-method-dispatch",
      title: "Runtime Method Dispatch",

      paragraphs: [
        "Runtime method dispatch is the process by which Java determines at runtime which overridden method implementation should execute.",
        "The reference type determines which members are available through the reference, while the actual object type determines which overridden instance method implementation runs."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}

class Cat extends Animal {

    @Override
    void sound() {

        System.out.println("Cat meows");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal;

        animal = new Dog();
        animal.sound();

        animal = new Cat();
        animal.sound();
    }
}`
      },

      output: `Dog barks
Cat meows`
    },

    // =========================================================
    // 10. SAME REFERENCE DIFFERENT OBJECTS
    // =========================================================

    {
      id: "same-reference-different-objects",
      title: "Same Reference, Different Objects",

      paragraphs: [
        "The same parent reference can point to different child objects at different times.",
        "The method call can therefore execute different implementations depending on the actual object."
      ],

      code: {
        language: "java",
        code: `Animal animal;

animal = new Dog();
animal.sound();

animal = new Cat();
animal.sound();`
      },

      output: `Dog barks
Cat meows`
    },

    // =========================================================
    // 11. REFERENCE TYPE VS OBJECT TYPE
    // =========================================================

    {
      id: "reference-vs-object",
      title: "Reference Type vs Object Type",

      paragraphs: [
        "Understanding the difference between reference type and object type is very important for runtime polymorphism.",
        "The reference type determines what members can be accessed through the reference at compile time.",
        "The actual object type determines which overridden instance method implementation executes at runtime."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void eat() {

        System.out.println("Animal eating");
    }
}

class Dog extends Animal {

    @Override
    void eat() {

        System.out.println("Dog eating");
    }

    void bark() {

        System.out.println("Dog barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.eat();

        // animal.bark();
        // Not directly accessible through Animal reference
    }
}`
      },

      output: "Dog eating"
    },

    // =========================================================
    // 12. IMPORTANT UPCASTING RULE
    // =========================================================

    {
      id: "important-upcasting-rule",
      title: "Important Rule of Upcasting",

      paragraphs: [
        "When a child object is assigned to a parent reference, the reference can directly access only the members available through the parent type.",
        "However, if an accessible instance method is overridden in the child class, the child's implementation can execute at runtime."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void eat() {

        System.out.println("Animal eating");
    }
}

class Dog extends Animal {

    @Override
    void eat() {

        System.out.println("Dog eating");
    }

    void bark() {

        System.out.println("Dog barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        animal.eat();

        // animal.bark();
        // Not accessible through Animal reference
    }
}`
      }
    },

    // =========================================================
    // 13. POLYMORPHISM WITH ARRAY
    // =========================================================

    {
      id: "polymorphism-with-array",
      title: "Polymorphism with Arrays",

      paragraphs: [
        "Polymorphism becomes especially useful when we store different child objects in an array of parent references."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}

class Cat extends Animal {

    @Override
    void sound() {

        System.out.println("Cat meows");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Dog()
        };

        for (Animal animal : animals) {

            animal.sound();
        }
    }
}`
      },

      output: `Dog barks
Cat meows
Dog barks`
    },

    // =========================================================
    // 14. POLYMORPHISM WITH METHOD PARAMETERS
    // =========================================================

    {
      id: "polymorphism-with-method",
      title: "Polymorphism as a Method Parameter",

      paragraphs: [
        "A method can accept a parent type as a parameter and work with objects of different child classes."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}

class Cat extends Animal {

    @Override
    void sound() {

        System.out.println("Cat meows");
    }
}

public class Main {

    static void makeSound(Animal animal) {

        animal.sound();
    }

    public static void main(String[] args) {

        makeSound(new Dog());

        makeSound(new Cat());
    }
}`
      },

      output: `Dog barks
Cat meows`
    },

    // =========================================================
    // 15. PAYMENT SYSTEM
    // =========================================================

    {
      id: "practical-payment-example",
      title: "Practical Example: Payment System",

      paragraphs: [
        "A payment system is a good real-world example of polymorphism.",
        "Different payment methods can implement the same payment operation differently."
      ],

      code: {
        language: "java",
        code: `class Payment {

    void pay(double amount) {

        System.out.println(
            "Processing payment: " + amount
        );
    }
}

class CreditCardPayment extends Payment {

    @Override
    void pay(double amount) {

        System.out.println(
            "Paid " + amount +
            " using Credit Card"
        );
    }
}

class UpiPayment extends Payment {

    @Override
    void pay(double amount) {

        System.out.println(
            "Paid " + amount +
            " using UPI"
        );
    }
}

class CashPayment extends Payment {

    @Override
    void pay(double amount) {

        System.out.println(
            "Paid " + amount +
            " using Cash"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Payment payment;

        payment = new CreditCardPayment();
        payment.pay(1000);

        payment = new UpiPayment();
        payment.pay(500);

        payment = new CashPayment();
        payment.pay(200);
    }
}`
      },

      output: `Paid 1000.0 using Credit Card
Paid 500.0 using UPI
Paid 200.0 using Cash`
    },

    // =========================================================
    // 16. NOTIFICATION SYSTEM
    // =========================================================

    {
      id: "practical-notification-example",
      title: "Practical Example: Notification System",

      paragraphs: [
        "Different notification types can provide different implementations of the same send() operation."
      ],

      code: {
        language: "java",
        code: `class Notification {

    void send(String message) {

        System.out.println(
            "Sending notification"
        );
    }
}

class EmailNotification extends Notification {

    @Override
    void send(String message) {

        System.out.println(
            "Email: " + message
        );
    }
}

class SmsNotification extends Notification {

    @Override
    void send(String message) {

        System.out.println(
            "SMS: " + message
        );
    }
}

class PushNotification extends Notification {

    @Override
    void send(String message) {

        System.out.println(
            "Push: " + message
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Notification notification;

        notification =
            new EmailNotification();

        notification.send("Welcome");

        notification =
            new SmsNotification();

        notification.send("Your OTP is 1234");

        notification =
            new PushNotification();

        notification.send("New message");
    }
}`
      },

      output: `Email: Welcome
SMS: Your OTP is 1234
Push: New message`
    },

    // =========================================================
    // 17. EMPLOYEE EXAMPLE
    // =========================================================

    {
      id: "practical-employee-example",
      title: "Practical Example: Employee Roles",

      paragraphs: [
        "A company can have different employee types that implement their work differently."
      ],

      code: {
        language: "java",
        code: `class Employee {

    void work() {

        System.out.println(
            "Employee is working"
        );
    }
}

class Developer extends Employee {

    @Override
    void work() {

        System.out.println(
            "Developer is writing code"
        );
    }
}

class Tester extends Employee {

    @Override
    void work() {

        System.out.println(
            "Tester is testing software"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Employee employee1 =
            new Developer();

        Employee employee2 =
            new Tester();

        employee1.work();
        employee2.work();
    }
}`
      },

      output: `Developer is writing code
Tester is testing software`
    },

    // =========================================================
    // 18. POLYMORPHISM AND INHERITANCE
    // =========================================================

    {
      id: "polymorphism-with-inheritance",
      title: "Polymorphism Requires an Inheritance Relationship",

      paragraphs: [
        "Runtime polymorphism through method overriding requires a relationship such as class inheritance or interface implementation.",
        "The parent type provides a common contract, while child classes provide specialized implementations."
      ],

      code: {
        language: "java",
        code: `class Animal {

    void sound() {
    }
}

class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Dog barks");
    }
}`
      }
    },

    // =========================================================
    // 19. UPCASTING VS DOWNCASTING
    // =========================================================

    {
      id: "upcasting-vs-downcasting",
      title: "Upcasting vs Downcasting",

      paragraphs: [
        "Upcasting converts a child reference to a parent reference and is generally safe when the object actually belongs to the child type.",
        "Downcasting converts a parent reference back to a child reference and should be performed carefully because the actual object must be compatible with the target child type."
      ],

      code: {
        language: "java",
        code: `class Animal {
}

class Dog extends Animal {

    void bark() {

        System.out.println("Dog barking");
    }
}

public class Main {

    public static void main(String[] args) {

        // Upcasting
        Animal animal = new Dog();

        // Downcasting
        Dog dog = (Dog) animal;

        dog.bark();
    }
}`
      },

      output: "Dog barking"
    },

    // =========================================================
    // 20. SAFE DOWNCASTING
    // =========================================================

    {
      id: "safe-downcasting",
      title: "Safe Downcasting with instanceof",

      paragraphs: [
        "The instanceof operator can be used to check whether an object is compatible with a particular type before downcasting."
      ],

      code: {
        language: "java",
        code: `class Animal {
}

class Dog extends Animal {

    void bark() {

        System.out.println("Dog barking");
    }
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        if (animal instanceof Dog) {

            Dog dog = (Dog) animal;

            dog.bark();
        }
    }
}`
      },

      output: "Dog barking"
    },

    // =========================================================
    // 21. ABSTRACT CLASS PREVIEW
    // =========================================================

    {
      id: "abstract-class-preview",
      title: "Polymorphism with Abstract Classes",

      paragraphs: [
        "Abstract classes can also be used as parent types for polymorphism.",
        "The abstract parent defines common behavior or a contract, while child classes provide concrete implementations.",
        "Abstract classes will be covered in more detail in the Abstraction lesson."
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
    // 22. COMMON MISTAKES
    // =========================================================

    {
      id: "common-mistakes",
      title: "Common Polymorphism Mistakes",

      paragraphs: [
        "There are several common mistakes beginners make when learning polymorphism."
      ],

      bullets: [
        "Confusing method overloading with method overriding.",
        "Thinking the reference type determines which overridden method executes.",
        "Forgetting that the actual object determines the overridden instance method at runtime.",
        "Trying to access child-specific methods directly through a parent reference.",
        "Performing unsafe downcasting.",
        "Assuming fields behave exactly like overridden methods.",
        "Forgetting that constructors are not polymorphic."
      ]
    },

    // =========================================================
    // 23. OVERLOADING VS OVERRIDING
    // =========================================================

    {
      id: "overloading-vs-overriding",
      title: "Method Overloading vs Method Overriding",

      paragraphs: [
        "Method overloading and method overriding are both related to polymorphism, but they work differently."
      ],

      bullets: [
        "Overloading → Same method name with different parameter lists.",
        "Overloading → Commonly associated with compile-time polymorphism.",
        "Overriding → Child class provides a new implementation of an inherited method.",
        "Overriding → Commonly associated with runtime polymorphism.",
        "Overloading is resolved by the compiler.",
        "Overriding is dynamically dispatched for instance methods."
      ]
    },

    // =========================================================
    // 24. FIELDS AND POLYMORPHISM
    // =========================================================

    {
      id: "fields-and-polymorphism",
      title: "Important: Fields Are Not Overridden Like Methods",

      paragraphs: [
        "Fields do not participate in runtime method dispatch in the same way overridden instance methods do.",
        "If a parent and child declare fields with the same name, field access depends on the reference type."
      ],

      code: {
        language: "java",
        code: `class Parent {

    String value = "Parent";
}

class Child extends Parent {

    String value = "Child";
}

public class Main {

    public static void main(String[] args) {

        Parent object = new Child();

        System.out.println(object.value);
    }
}`
      },

      output: "Parent"
    },

    // =========================================================
    // 25. KEY POINTS
    // =========================================================

    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Polymorphism means one concept can have multiple forms.",
        "Compile-time polymorphism is commonly achieved through method overloading.",
        "Runtime polymorphism is commonly achieved through method overriding.",
        "Upcasting means assigning a child object to a parent reference.",
        "A parent reference can point to different child objects.",
        "Runtime method dispatch selects the overridden instance method based on the actual object.",
        "The reference type controls which members are accessible through the reference.",
        "The actual object type determines which overridden instance method implementation runs.",
        "The same parent reference can point to different child objects at different times.",
        "Polymorphism is useful for writing flexible and extensible code.",
        "Polymorphism works naturally with collections and method parameters using parent types.",
        "Downcasting should be performed carefully.",
        "instanceof can be used before downcasting when appropriate.",
        "Fields do not participate in runtime method dispatch like overridden methods."
      ]
    },

    // =========================================================
    // 26. INTERVIEW QUESTIONS
    // =========================================================

    {
      id: "interview-questions",
      title: "Polymorphism: Interview Questions",

      interviewQuestions: [
        {
          question: "What is polymorphism in Java?",
          answer:
            "Polymorphism means one interface or parent type can represent different implementations. In Java, runtime polymorphism commonly occurs through method overriding."
        },

        {
          question: "What are the types of polymorphism in Java?",
          answer:
            "Polymorphism is commonly discussed as compile-time polymorphism through method overloading and runtime polymorphism through method overriding."
        },

        {
          question: "What is runtime polymorphism?",
          answer:
            "Runtime polymorphism occurs when a parent reference refers to a child object and an overridden instance method is selected based on the actual object at runtime."
        },

        {
          question: "What is upcasting?",
          answer:
            "Upcasting means assigning a child class object to a parent class reference, such as Animal animal = new Dog();"
        },

        {
          question: "What is runtime method dispatch?",
          answer:
            "Runtime method dispatch is the mechanism by which Java selects the overridden instance method implementation based on the actual object at runtime."
        },

        {
          question: "What determines which overridden method executes?",
          answer:
            "The actual object type determines which overridden instance method implementation executes at runtime."
        },

        {
          question: "What does the reference type determine?",
          answer:
            "The reference type determines which members can be accessed through that reference at compile time."
        },

        {
          question: "Can a parent reference call a child-specific method?",
          answer:
            "Not directly. A parent reference can access members available through the parent type. A child-specific method generally requires a suitable child reference."
        },

        {
          question: "What is downcasting?",
          answer:
            "Downcasting converts a parent reference back to a child reference. It should be done only when the actual object is compatible with the child type."
        },

        {
          question: "Why is method overriding important for runtime polymorphism?",
          answer:
            "Overriding allows different child classes to provide different implementations of the same parent method, which Java can select at runtime."
        },

        {
          question: "What is the difference between overloading and overriding?",
          answer:
            "Overloading uses the same method name with different parameter lists and is commonly resolved at compile time. Overriding provides a child implementation of an inherited method and is dynamically dispatched at runtime."
        },

        {
          question: "Can fields be polymorphic like methods?",
          answer:
            "No. Fields are not dynamically dispatched like overridden instance methods. Field access depends on the reference type."
        },

        {
          question: "Can constructors be overridden?",
          answer:
            "No. Constructors are not inherited, so they cannot be overridden."
        },

        {
          question: "Why is polymorphism useful?",
          answer:
            "Polymorphism allows code to work with a common parent type while supporting multiple child implementations, making the design more flexible and extensible."
        }
      ]
    }
  ]
};