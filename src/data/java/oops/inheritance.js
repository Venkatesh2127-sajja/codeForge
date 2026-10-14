export const inheritance = {
  id: "inheritance",
  slug: "inheritance",
  title: "Inheritance in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn how inheritance works in Java using extends and super, including parent and child classes, method overriding, constructor behavior, and practical real-world examples.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction to Inheritance",
      paragraphs: [
        "Inheritance is one of the fundamental concepts of object-oriented programming.",
        "Inheritance allows one class to acquire fields and methods from another class.",
        "The class that provides the existing functionality is called the parent class or superclass, while the class that inherits it is called the child class or subclass.",
        "In Java, inheritance between classes is commonly achieved using the extends keyword."
      ],
      bullets: [
        "Parent class → Superclass",
        "Child class → Subclass",
        "extends → Used to inherit from another class",
        "super → Used to refer to the parent class"
      ]
    },

    {
      id: "why-inheritance",
      title: "Why Do We Need Inheritance?",
      paragraphs: [
        "Inheritance helps us reuse common functionality instead of writing the same code repeatedly.",
        "It also allows us to create a relationship between classes where a child class can extend or specialize the behavior of a parent class."
      ],
      bullets: [
        "Code reusability",
        "Reduced duplicate code",
        "Clear parent-child relationship",
        "Supports method overriding",
        "Provides a foundation for runtime polymorphism"
      ]
    },

    {
      id: "parent-child-example",
      title: "Parent and Child Class",
      paragraphs: [
        "Consider a general Animal class and a Dog class.",
        "A dog is an animal, so Dog can inherit common behavior from Animal."
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
}`
      }
    },

    {
      id: "extends-keyword",
      title: "extends Keyword",
      paragraphs: [
        "The extends keyword is used when one class inherits another class.",
        "The child class can use accessible fields and methods inherited from the parent class."
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
}`
      },
      bullets: [
        "Animal is the parent class.",
        "Dog is the child class.",
        "Dog extends Animal.",
        "Dog can use the inherited eat() method."
      ]
    },

    {
      id: "using-inherited-method",
      title: "Using an Inherited Method",
      paragraphs: [
        "A child class object can call an accessible method inherited from its parent class."
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

        Dog dog = new Dog();

        dog.eat();
        dog.bark();
    }
}`
      },
      output: `Animal is eating
Dog is barking`
    },

    {
      id: "inheriting-fields",
      title: "Inheriting Fields",
      paragraphs: [
        "A child class can access inherited fields when those fields are accessible to the child class."
      ],
      code: {
        language: "java",
        code: `class Vehicle {

    String brand = "Toyota";
}

class Car extends Vehicle {

    void displayBrand() {

        System.out.println(brand);
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.displayBrand();
    }
}`
      },
      output: "Toyota"
    },

    {
      id: "adding-new-behavior",
      title: "Adding New Behavior in the Child Class",
      paragraphs: [
        "A child class can inherit existing functionality and also define its own additional fields and methods."
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

    void run() {

        System.out.println("Dog is running");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.eat();
        dog.bark();
        dog.run();
    }
}`
      },
      output: `Animal is eating
Dog is barking
Dog is running`
    },

    {
      id: "super-keyword",
      title: "super Keyword",
      paragraphs: [
        "The super keyword is used to refer to the immediate parent class.",
        "It can be used to access an inherited parent field, call a parent method, or call a parent constructor."
      ],
      bullets: [
        "super.field → accesses a parent field.",
        "super.method() → calls a parent method.",
        "super() → calls a parent constructor."
      ]
    },

    {
      id: "super-field",
      title: "Using super to Access a Parent Field",
      paragraphs: [
        "If a child class has a field with the same name as a parent field, super can be used to explicitly refer to the parent field."
      ],
      code: {
        language: "java",
        code: `class Person {

    String name = "Parent";
}

class Student extends Person {

    String name = "Child";

    void displayNames() {

        System.out.println("Child name: " + name);
        System.out.println("Parent name: " + super.name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.displayNames();
    }
}`
      },
      output: `Child name: Child
Parent name: Parent`
    },

    {
      id: "super-method",
      title: "Using super to Call a Parent Method",
      paragraphs: [
        "A child class can override a parent method and still call the original parent implementation using super.method()."
      ],
      code: {
        language: "java",
        code: `class Animal {

    void sound() {

        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {

    void sound() {

        super.sound();

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
      output: `Animal makes a sound
Dog barks`
    },

    {
      id: "method-overriding",
      title: "Method Overriding",
      paragraphs: [
        "Method overriding occurs when a child class provides its own implementation of a method that is already defined in the parent class.",
        "The overriding method should have a compatible signature with the inherited method."
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

        Dog dog = new Dog();

        dog.sound();
    }
}`
      },
      output: "Dog barks"
    },

    {
      id: "override-annotation",
      title: "@Override Annotation",
      paragraphs: [
        "The @Override annotation tells the compiler that a method is intended to override a method from a parent class.",
        "Using @Override is recommended because the compiler can detect certain mistakes in the method signature."
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
}`
      }
    },

    {
      id: "overriding-example",
      title: "Practical Example of Method Overriding",
      paragraphs: [
        "Different types of vehicles may have different ways of starting. A child class can override the parent implementation to provide its specific behavior."
      ],
      code: {
        language: "java",
        code: `class Vehicle {

    void start() {

        System.out.println("Vehicle is starting");
    }
}

class Car extends Vehicle {

    @Override
    void start() {

        System.out.println("Car starts with a key");
    }
}

class Bike extends Vehicle {

    @Override
    void start() {

        System.out.println("Bike starts with a button");
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();
        Bike bike = new Bike();

        car.start();
        bike.start();
    }
}`
      },
      output: `Car starts with a key
Bike starts with a button`
    },

    {
      id: "parent-constructor",
      title: "Parent Constructor",
      paragraphs: [
        "When a child object is created, the parent class constructor is also involved in initializing the inherited part of the object.",
        "If the parent has a no-argument constructor, Java can invoke it automatically when the child constructor runs."
      ],
      code: {
        language: "java",
        code: `class Animal {

    Animal() {

        System.out.println("Animal constructor");
    }
}

class Dog extends Animal {

    Dog() {

        System.out.println("Dog constructor");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();
    }
}`
      },
      output: `Animal constructor
Dog constructor`
    },

    {
      id: "super-constructor",
      title: "Calling Parent Constructor Using super()",
      paragraphs: [
        "The super() call is used to explicitly invoke a constructor of the immediate parent class.",
        "When used inside a constructor, super() must be the first statement."
      ],
      code: {
        language: "java",
        code: `class Animal {

    Animal(String name) {

        System.out.println(
            "Animal: " + name
        );
    }
}

class Dog extends Animal {

    Dog(String name) {

        super(name);

        System.out.println(
            "Dog created"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog("Bruno");
    }
}`
      },
      output: `Animal: Bruno
Dog created`
    },

    {
      id: "super-constructor-why",
      title: "Why Use super()?",
      paragraphs: [
        "A child class may need to initialize information that belongs to the parent class.",
        "Calling the appropriate parent constructor allows the parent class to initialize its own state."
      ],
      code: {
        language: "java",
        code: `class Person {

    String name;

    Person(String name) {

        this.name = name;
    }
}

class Student extends Person {

    int age;

    Student(String name, int age) {

        super(name);

        this.age = age;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
            new Student("Rahul", 20);

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
      },
      output: `Rahul
20`
    },

    {
      id: "inheritance-and-encapsulation",
      title: "Inheritance and Encapsulation",
      paragraphs: [
        "Inheritance and encapsulation work together, but inheritance does not bypass access control.",
        "A private field of a parent class is not directly accessible from the child class.",
        "The parent can expose protected or public methods when controlled access is required."
      ],
      code: {
        language: "java",
        code: `class Person {

    private String name;

    Person(String name) {

        this.name = name;
    }

    public String getName() {

        return name;
    }
}

class Student extends Person {

    Student(String name) {

        super(name);
    }

    void display() {

        System.out.println(getName());
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
            new Student("Rahul");

        student.display();
    }
}`
      },
      output: "Rahul"
    },

    {
      id: "single-inheritance",
      title: "Single Inheritance",
      paragraphs: [
        "Single inheritance means one child class directly inherits from one parent class."
      ],
      code: {
        language: "java",
        code: `class Animal {
}

class Dog extends Animal {
}`
      }
    },

    {
      id: "multilevel-inheritance",
      title: "Multilevel Inheritance",
      paragraphs: [
        "Multilevel inheritance occurs when a class inherits from another child class, creating a chain of inheritance."
      ],
      code: {
        language: "java",
        code: `class Animal {

    void eat() {

        System.out.println("Eating");
    }
}

class Dog extends Animal {

    void bark() {

        System.out.println("Barking");
    }
}

class Puppy extends Dog {

    void play() {

        System.out.println("Playing");
    }
}

public class Main {

    public static void main(String[] args) {

        Puppy puppy = new Puppy();

        puppy.eat();
        puppy.bark();
        puppy.play();
    }
}`
      },
      output: `Eating
Barking
Playing`
    },

    {
      id: "hierarchical-inheritance",
      title: "Hierarchical Inheritance",
      paragraphs: [
        "Hierarchical inheritance occurs when multiple child classes inherit from the same parent class."
      ],
      code: {
        language: "java",
        code: `class Animal {

    void eat() {

        System.out.println("Eating");
    }
}

class Dog extends Animal {

    void bark() {

        System.out.println("Barking");
    }
}

class Cat extends Animal {

    void meow() {

        System.out.println("Meowing");
    }
}

public class Main {

    public static void main(String[] args) {

        Dog dog = new Dog();
        Cat cat = new Cat();

        dog.eat();
        dog.bark();

        cat.eat();
        cat.meow();
    }
}`
      },
      output: `Eating
Barking
Eating
Meowing`
    },

    {
      id: "multiple-inheritance",
      title: "Does Java Support Multiple Inheritance with Classes?",
      paragraphs: [
        "Java does not allow a class to extend multiple classes.",
        "This avoids ambiguity that can occur when multiple parent classes provide conflicting implementations.",
        "Java can achieve multiple-type behavior through interfaces, which will be covered separately."
      ],
      code: {
        language: "java",
        code: `class A {
}

class B {
}

// Not allowed in Java:
// class C extends A, B {
// }`
      }
    },

    {
      id: "vehicle-example",
      title: "Practical Example: Vehicle Hierarchy",
      paragraphs: [
        "Inheritance can represent relationships between general and specialized entities."
      ],
      code: {
        language: "java",
        code: `class Vehicle {

    String brand;

    Vehicle(String brand) {

        this.brand = brand;
    }

    void start() {

        System.out.println("Vehicle started");
    }
}

class Car extends Vehicle {

    Car(String brand) {

        super(brand);
    }

    @Override
    void start() {

        System.out.println(
            brand + " car started"
        );
    }

    void drive() {

        System.out.println(
            brand + " car is driving"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car("Toyota");

        car.start();
        car.drive();
    }
}`
      },
      output: `Toyota car started
Toyota car is driving`
    },

    {
      id: "employee-example",
      title: "Practical Example: Employee",
      paragraphs: [
        "A company can have a general Employee class and specialized classes such as Developer and Manager."
      ],
      code: {
        language: "java",
        code: `class Employee {

    String name;
    double salary;

    Employee(String name, double salary) {

        this.name = name;
        this.salary = salary;
    }

    void displayDetails() {

        System.out.println(
            "Name: " + name
        );

        System.out.println(
            "Salary: " + salary
        );
    }
}

class Developer extends Employee {

    String programmingLanguage;

    Developer(
        String name,
        double salary,
        String programmingLanguage
    ) {

        super(name, salary);

        this.programmingLanguage =
            programmingLanguage;
    }

    void writeCode() {

        System.out.println(
            name + " is writing " +
            programmingLanguage + " code"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Developer developer =
            new Developer(
                "Rahul",
                60000,
                "Java"
            );

        developer.displayDetails();
        developer.writeCode();
    }
}`
      },
      output: `Name: Rahul
Salary: 60000.0
Rahul is writing Java code`
    },

    {
      id: "is-a-relationship",
      title: "IS-A Relationship",
      paragraphs: [
        "Inheritance represents an IS-A relationship between classes.",
        "For example, a Dog IS-A Animal and a Car IS-A Vehicle."
      ],
      bullets: [
        "Dog IS-A Animal.",
        "Car IS-A Vehicle.",
        "Developer IS-A Employee.",
        "Student IS-A Person."
      ]
    },

    {
      id: "inheritance-vs-composition",
      title: "Inheritance vs Composition",
      paragraphs: [
        "Inheritance represents an IS-A relationship, while composition commonly represents a HAS-A relationship.",
        "For example, a Car IS-A Vehicle, while a Car HAS-A Engine."
      ],
      code: {
        language: "java",
        code: `class Engine {
}

class Car {

    private Engine engine;
}`
      },
      bullets: [
        "Inheritance → IS-A relationship.",
        "Composition → HAS-A relationship.",
        "Use inheritance when there is a genuine parent-child relationship.",
        "Use composition when one object contains or uses another object."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Inheritance Mistakes",
      paragraphs: [
        "There are several common mistakes beginners make when using inheritance."
      ],
      bullets: [
        "Using inheritance when there is no genuine IS-A relationship.",
        "Trying to access private parent fields directly from the child class.",
        "Forgetting that constructors are not inherited.",
        "Using super() somewhere other than the first statement of a constructor.",
        "Overriding a method with an incompatible signature.",
        "Forgetting @Override when it would help detect an accidental signature mismatch.",
        "Trying to extend multiple classes."
      ]
    },

    {
      id: "constructor-not-inherited",
      title: "Important: Constructors Are Not Inherited",
      paragraphs: [
        "Constructors belong to the class that declares them. A child class does not inherit the constructors of its parent.",
        "However, a child constructor can invoke a parent constructor using super()."
      ],
      code: {
        language: "java",
        code: `class Person {

    Person(String name) {

        System.out.println(name);
    }
}

class Student extends Person {

    Student(String name) {

        super(name);
    }
}`
      }
    },

    {
      id: "key-points",
      title: "Key Points",
      bullets: [
        "Inheritance allows a child class to acquire accessible functionality from a parent class.",
        "The extends keyword creates class inheritance.",
        "The parent class is also called the superclass.",
        "The child class is also called the subclass.",
        "The super keyword refers to the immediate parent class.",
        "super.field accesses a parent field.",
        "super.method() calls a parent method.",
        "super() calls a parent constructor.",
        "Method overriding allows a child class to provide its own implementation of an inherited method.",
        "@Override helps the compiler verify that a method is intended to override a parent method.",
        "Constructors are not inherited.",
        "Java does not support multiple inheritance through classes.",
        "Inheritance represents an IS-A relationship.",
        "Inheritance is one of the foundations of runtime polymorphism."
      ]
    },

    {
      id: "interview-questions",
      title: "Inheritance: Interview Questions",
      interviewQuestions: [
        {
          question: "What is inheritance in Java?",
          answer:
            "Inheritance is an OOP mechanism where a child class acquires accessible fields and methods from a parent class."
        },
        {
          question: "Which keyword is used for inheritance in Java?",
          answer:
            "The extends keyword is used when one class inherits another class."
        },
        {
          question: "What is a superclass?",
          answer:
            "A superclass is the parent class whose accessible members can be inherited by a subclass."
        },
        {
          question: "What is a subclass?",
          answer:
            "A subclass is a child class that extends another class and can add or override functionality."
        },
        {
          question: "What is the super keyword?",
          answer:
            "The super keyword refers to the immediate parent class and can be used to access parent fields, call parent methods, and invoke parent constructors."
        },
        {
          question: "What is method overriding?",
          answer:
            "Method overriding occurs when a child class provides its own implementation of a method inherited from the parent class."
        },
        {
          question: "Why is @Override used?",
          answer:
            "The @Override annotation tells the compiler that a method is intended to override a parent method and helps detect certain signature mistakes."
        },
        {
          question: "Are constructors inherited in Java?",
          answer:
            "No. Constructors are not inherited, but a child constructor can call a parent constructor using super()."
        },
        {
          question: "Does Java support multiple inheritance using classes?",
          answer:
            "No. A Java class cannot extend multiple classes. Multiple-type behavior can be achieved through interfaces."
        },
        {
          question: "What is single inheritance?",
          answer:
            "Single inheritance occurs when one child class directly extends one parent class."
        },
        {
          question: "What is multilevel inheritance?",
          answer:
            "Multilevel inheritance occurs when a class inherits from another child class, creating an inheritance chain."
        },
        {
          question: "What relationship does inheritance represent?",
          answer:
            "Inheritance generally represents an IS-A relationship, such as Dog IS-A Animal."
        },
        {
          question: "Can a child class access a private field of its parent directly?",
          answer:
            "No. A private parent field cannot be accessed directly by the child class. The parent can provide protected or public methods when access is required."
        },
        {
          question: "What happens when a child object is created?",
          answer:
            "The parent portion of the object is initialized through the parent constructor, followed by the child constructor."
        }
      ]
    }
  ]
};