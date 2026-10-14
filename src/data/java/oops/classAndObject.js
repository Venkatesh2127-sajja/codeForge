export const classAndObject = {
  id: "class-and-object",
  slug: "class-and-object",
  title: "Class and Object in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn the fundamentals of classes and objects in Java, including class definitions, fields, methods, object creation, constructors, and practical real-world examples.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction to Class and Object",
      paragraphs: [
        "Java is an object-oriented programming language. In Java, we commonly design programs using classes and objects.",
        "A class is a blueprint or template that defines the properties and behaviors of an object.",
        "An object is a real instance of a class. It contains its own data and can use the methods defined by the class."
      ],
      bullets: [
        "Class → Blueprint or template",
        "Object → Real instance of a class",
        "Fields → Represent the state or data",
        "Methods → Represent the behavior or actions"
      ]
    },

    {
      id: "real-world-example",
      title: "Real-World Example",
      paragraphs: [
        "Consider a bank account. A bank account can have properties such as account number, account holder name, and balance.",
        "It can also perform actions such as deposit money, withdraw money, and display the balance.",
        "We can represent these properties and actions using a Java class."
      ],
      bullets: [
        "Class → BankAccount",
        "Fields → accountNumber, accountHolderName, balance",
        "Methods → deposit(), withdraw(), displayBalance()",
        "Objects → Individual bank accounts"
      ]
    },

    {
      id: "what-is-class",
      title: "What is a Class?",
      paragraphs: [
        "A class is a user-defined data type that acts as a blueprint for creating objects.",
        "A class can contain fields, methods, constructors, and other members.",
        "The class itself describes what an object should contain and what it can do."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    void study() {
        System.out.println("Student is studying");
    }
}`
      }
    },

    {
      id: "class-structure",
      title: "Basic Structure of a Class",
      paragraphs: [
        "A Java class is defined using the class keyword followed by the class name.",
        "Inside the class, we can define fields and methods."
      ],
      code: {
        language: "java",
        code: `class Student {

    // Fields
    String name;
    int age;

    // Method
    void study() {
        System.out.println("Student is studying");
    }
}`
      },
      bullets: [
        "class is the keyword used to define a class.",
        "Student is the class name.",
        "name and age are fields.",
        "study() is a method."
      ]
    },

    {
      id: "what-is-object",
      title: "What is an Object?",
      paragraphs: [
        "An object is an instance of a class.",
        "When an object is created, memory is allocated for the fields of that object.",
        "Multiple objects can be created from the same class, and each object can have different values."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;
}

public class Main {

    public static void main(String[] args) {

        Student student1 = new Student();

        student1.name = "Rahul";
        student1.age = 20;

        System.out.println(student1.name);
        System.out.println(student1.age);
    }
}`
      },
      output: `Rahul
20`
    },

    {
      id: "object-creation",
      title: "Creating an Object",
      paragraphs: [
        "Objects are commonly created using the new keyword.",
        "The new keyword creates an object and allocates memory for it."
      ],
      code: {
        language: "java",
        code: `Student student1 = new Student();`
      },
      bullets: [
        "Student → Class type",
        "student1 → Reference variable",
        "new → Creates a new object",
        "Student() → Calls the constructor"
      ]
    },

    {
      id: "multiple-objects",
      title: "Creating Multiple Objects",
      paragraphs: [
        "We can create multiple objects from the same class.",
        "Each object maintains its own copy of instance fields."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;
}

public class Main {

    public static void main(String[] args) {

        Student student1 = new Student();
        student1.name = "Rahul";
        student1.age = 20;

        Student student2 = new Student();
        student2.name = "Priya";
        student2.age = 22;

        System.out.println(student1.name);
        System.out.println(student1.age);

        System.out.println(student2.name);
        System.out.println(student2.age);
    }
}`
      },
      output: `Rahul
20
Priya
22`
    },

    {
      id: "fields",
      title: "Fields in a Class",
      paragraphs: [
        "Fields are variables declared inside a class but outside methods and constructors.",
        "They represent the state or properties of an object.",
        "Each object normally has its own copy of instance fields."
      ],
      code: {
        language: "java",
        code: `class Car {

    String brand;
    String color;
    int speed;
}`
      },
      bullets: [
        "brand represents the car brand.",
        "color represents the car color.",
        "speed represents the current speed."
      ]
    },

    {
      id: "accessing-fields",
      title: "Accessing Object Fields",
      paragraphs: [
        "We can access an object's fields using the dot operator.",
        "The syntax is objectName.fieldName."
      ],
      code: {
        language: "java",
        code: `class Car {

    String brand;
    String color;
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.brand = "Toyota";
        car.color = "White";

        System.out.println(car.brand);
        System.out.println(car.color);
    }
}`
      },
      output: `Toyota
White`
    },

    {
      id: "methods",
      title: "Methods in a Class",
      paragraphs: [
        "A method defines an action or behavior that an object can perform.",
        "Methods allow us to place related operations inside a class.",
        "A method can accept parameters and can return a value."
      ],
      code: {
        language: "java",
        code: `class Calculator {

    void add() {

        int a = 10;
        int b = 20;

        System.out.println(a + b);
    }
}`
      }
    },

    {
      id: "calling-method",
      title: "Calling an Object Method",
      paragraphs: [
        "We can call a method using the object name followed by the dot operator and method name."
      ],
      code: {
        language: "java",
        code: `class Student {

    void study() {

        System.out.println("Student is studying");
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.study();
    }
}`
      },
      output: "Student is studying"
    },

    {
      id: "method-with-parameters",
      title: "Methods with Parameters",
      paragraphs: [
        "A method can accept values through parameters.",
        "Parameters allow the same method to perform an operation using different input values."
      ],
      code: {
        language: "java",
        code: `class Calculator {

    void add(int a, int b) {

        System.out.println(a + b);
    }
}

public class Main {

    public static void main(String[] args) {

        Calculator calculator = new Calculator();

        calculator.add(10, 20);
        calculator.add(50, 30);
    }
}`
      },
      output: `30
80`
    },

    {
      id: "method-with-return",
      title: "Methods with Return Values",
      paragraphs: [
        "A method can return a value to the caller using the return keyword.",
        "The return type of the method must match the value being returned."
      ],
      code: {
        language: "java",
        code: `class Calculator {

    int add(int a, int b) {

        return a + b;
    }
}

public class Main {

    public static void main(String[] args) {

        Calculator calculator = new Calculator();

        int result = calculator.add(10, 20);

        System.out.println(result);
    }
}`
      },
      output: "30"
    },

    {
      id: "state-and-behavior",
      title: "State and Behavior of an Object",
      paragraphs: [
        "An object generally contains state and behavior.",
        "State is represented by fields, while behavior is represented by methods."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    // State
    String accountHolder;
    double balance;

    // Behavior
    void deposit(double amount) {

        balance = balance + amount;
    }

    void displayBalance() {

        System.out.println(balance);
    }
}`
      },
      bullets: [
        "accountHolder → State",
        "balance → State",
        "deposit() → Behavior",
        "displayBalance() → Behavior"
      ]
    },

    {
      id: "complete-example",
      title: "Complete Class and Object Example",
      paragraphs: [
        "Let's combine fields, methods, object creation, and method calls into one practical example."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    String accountHolder;
    double balance;

    void deposit(double amount) {

        balance = balance + amount;
    }

    void withdraw(double amount) {

        balance = balance - amount;
    }

    void displayBalance() {

        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: " + balance);
    }
}

public class Main {

    public static void main(String[] args) {

        BankAccount account = new BankAccount();

        account.accountHolder = "Rahul";
        account.balance = 1000;

        account.deposit(500);
        account.withdraw(200);

        account.displayBalance();
    }
}`
      },
      output: `Account Holder: Rahul
Balance: 1300.0`
    },

    {
      id: "student-example",
      title: "Practical Student Example",
      paragraphs: [
        "We can use a class to represent a student and define both student data and student behavior."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;
    double marks;

    void displayDetails() {

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }

    void checkResult() {

        if (marks >= 40) {
            System.out.println("Result: Pass");
        } else {
            System.out.println("Result: Fail");
        }
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.name = "Anil";
        student.age = 21;
        student.marks = 78.5;

        student.displayDetails();
        student.checkResult();
    }
}`
      },
      output: `Name: Anil
Age: 21
Marks: 78.5
Result: Pass`
    },

    {
      id: "car-example",
      title: "Practical Car Example",
      paragraphs: [
        "Another common example is a Car class. The fields represent the car's state and the methods represent its behavior."
      ],
      code: {
        language: "java",
        code: `class Car {

    String brand;
    int speed;

    void accelerate() {

        speed = speed + 20;
    }

    void displaySpeed() {

        System.out.println("Current Speed: " + speed);
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.brand = "Toyota";
        car.speed = 40;

        car.accelerate();
        car.displaySpeed();
    }
}`
      },
      output: "Current Speed: 60"
    },

    {
      id: "class-vs-object",
      title: "Class vs Object",
      paragraphs: [
        "A class and an object are related, but they are not the same thing.",
        "The class defines the structure, while the object is an actual instance created from that structure."
      ],
      bullets: [
        "Class → Blueprint or template",
        "Object → Instance of a class",
        "Class defines fields and methods.",
        "Object contains actual values for instance fields.",
        "One class can be used to create multiple objects.",
        "Each object can have different field values."
      ]
    },

    {
      id: "object-memory",
      title: "Objects and Memory",
      paragraphs: [
        "When an object is created using new, memory is allocated for that object.",
        "The reference variable stores a reference to the object.",
        "Different objects created from the same class normally have separate instance field values."
      ],
      code: {
        language: "java",
        code: `Student student1 = new Student();
Student student2 = new Student();

student1.name = "Rahul";
student2.name = "Priya";`
      },
      bullets: [
        "student1 refers to one Student object.",
        "student2 refers to another Student object.",
        "Changing student1.name does not change student2.name."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",
      paragraphs: [
        "Beginners commonly confuse a class with an object or try to access instance members without creating an object."
      ],
      bullets: [
        "A class is not the same as an object.",
        "Instance fields belong to objects.",
        "Instance methods are normally called using an object.",
        "Use the new keyword to create an object.",
        "Use the dot operator to access fields and methods.",
        "Avoid giving the same name to a class and a variable when it makes the code confusing."
      ]
    },

    {
      id: "common-mistake-example",
      title: "Common Mistake: Using an Object Before Creating It",
      paragraphs: [
        "An instance reference must refer to an actual object before its instance members can be accessed."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
}

public class Main {

    public static void main(String[] args) {

        Student student;

        // student.name = "Rahul"; // Cannot access before object creation

        student = new Student();

        student.name = "Rahul";

        System.out.println(student.name);
    }
}`
      },
      output: "Rahul"
    },

    {
      id: "key-points",
      title: "Key Points",
      bullets: [
        "A class is a blueprint used to create objects.",
        "An object is an instance of a class.",
        "Fields represent the state of an object.",
        "Methods represent the behavior of an object.",
        "Objects are commonly created using the new keyword.",
        "The dot operator is used to access fields and methods.",
        "One class can create multiple objects.",
        "Each object can contain different instance field values.",
        "Methods can accept parameters.",
        "Methods can return values.",
        "Constructors are used during object creation and will be covered in the next lesson."
      ]
    },

    {
      id: "interview-questions",
      title: "Class and Object: Interview Questions",
      interviewQuestions: [
        {
          question: "What is a class in Java?",
          answer:
            "A class is a blueprint or user-defined data type that defines the fields and methods that objects created from it can have."
        },
        {
          question: "What is an object in Java?",
          answer:
            "An object is an instance of a class. It represents a real entity and contains its own instance field values."
        },
        {
          question: "What is the difference between a class and an object?",
          answer:
            "A class is a blueprint, while an object is an actual instance created from that class."
        },
        {
          question: "How do you create an object in Java?",
          answer:
            "An object is commonly created using the new keyword, for example: Student student = new Student();"
        },
        {
          question: "What are fields in Java?",
          answer:
            "Fields are variables declared inside a class and outside methods. They represent the state or properties of an object."
        },
        {
          question: "What are methods in Java?",
          answer:
            "Methods define the behavior or actions that an object can perform."
        },
        {
          question: "How do you access an object's fields?",
          answer:
            "Object fields can be accessed using the dot operator, such as student.name."
        },
        {
          question: "Can we create multiple objects from one class?",
          answer:
            "Yes. A single class can be used to create multiple objects, and each object can have different instance field values."
        },
        {
          question: "What does the new keyword do?",
          answer:
            "The new keyword creates an object and allocates memory for it."
        },
        {
          question: "What is the state and behavior of an object?",
          answer:
            "Fields represent the object's state, while methods represent its behavior."
        },
        {
          question: "Can a method accept parameters?",
          answer:
            "Yes. Methods can accept parameters that allow them to work with different input values."
        },
        {
          question: "Can a method return a value?",
          answer:
            "Yes. A method can return a value using the return keyword, and its return type must match the returned value."
        }
      ]
    }
  ]
};