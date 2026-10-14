export const constructors = {
  id: "constructors",
  slug: "constructors",
  title: "Constructors in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn how constructors work in Java, including default constructors, parameterized constructors, constructor overloading, and practical real-world examples.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction to Constructors",
      paragraphs: [
        "A constructor is a special member of a class that is used to initialize an object when it is created.",
        "A constructor has the same name as the class and does not have a return type.",
        "Constructors are automatically called when an object is created using the new keyword."
      ],
      bullets: [
        "A constructor has the same name as the class.",
        "A constructor does not have a return type.",
        "A constructor is called automatically when an object is created.",
        "Constructors are mainly used to initialize object data.",
        "A class can have multiple constructors."
      ]
    },

    {
      id: "constructor-syntax",
      title: "Constructor Syntax",
      paragraphs: [
        "A constructor is declared inside a class using the same name as the class."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {

        System.out.println("Constructor called");
    }
}`
      },
      bullets: [
        "Student() is the constructor.",
        "Student is the class name.",
        "The constructor does not have a return type.",
        "The constructor is called when a Student object is created."
      ]
    },

    {
      id: "constructor-call",
      title: "When is a Constructor Called?",
      paragraphs: [
        "A constructor is called automatically when an object is created using the new keyword."
      ],
      code: {
        language: "java",
        code: `class Student {

    Student() {

        System.out.println("Student object created");
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();
    }
}`
      },
      output: "Student object created"
    },

    {
      id: "default-constructor",
      title: "Default Constructor",
      paragraphs: [
        "If a class does not contain any constructor, the Java compiler provides a default constructor automatically.",
        "The compiler-provided default constructor does not accept parameters.",
        "It initializes instance fields with their default values."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
      },
      output: `null
0`
    },

    {
      id: "compiler-default-constructor",
      title: "Compiler-Provided Default Constructor",
      paragraphs: [
        "Conceptually, if you do not write any constructor, the compiler provides a no-argument constructor similar to the following."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {
    }
}`
      },
      bullets: [
        "This constructor is supplied by the compiler when no constructor is declared.",
        "It has no parameters.",
        "It does not contain custom initialization logic."
      ]
    },

    {
      id: "user-defined-no-arg",
      title: "User-Defined No-Argument Constructor",
      paragraphs: [
        "A programmer can also explicitly create a constructor that does not accept any parameters.",
        "This is often called a no-argument constructor."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {

        name = "Unknown";
        age = 18;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
      },
      output: `Unknown
18`
    },

    {
      id: "default-vs-no-arg",
      title: "Default Constructor vs No-Argument Constructor",
      paragraphs: [
        "The terms default constructor and no-argument constructor are often used interchangeably, but there is an important distinction.",
        "The compiler provides a default constructor only when the programmer does not declare any constructor.",
        "A no-argument constructor can also be explicitly written by the programmer."
      ],
      bullets: [
        "Compiler-provided default constructor → automatically generated when no constructor is declared.",
        "User-defined no-argument constructor → explicitly written by the programmer.",
        "A user-defined no-argument constructor can contain custom initialization logic."
      ]
    },

    {
      id: "parameterized-constructor",
      title: "Parameterized Constructor",
      paragraphs: [
        "A parameterized constructor is a constructor that accepts one or more parameters.",
        "It allows us to initialize an object with specific values at the time of object creation."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student(String name, int age) {

        this.name = name;
        this.age = age;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student("Rahul", 20);

        System.out.println(student.name);
        System.out.println(student.age);
    }
}`
      },
      output: `Rahul
20`
    },

    {
      id: "parameterized-constructor-benefit",
      title: "Why Use a Parameterized Constructor?",
      paragraphs: [
        "Parameterized constructors make object creation easier because the required values can be provided immediately.",
        "Instead of creating an object first and assigning every field separately, we can initialize the object in one statement."
      ],
      code: {
        language: "java",
        code: `Student student = new Student("Rahul", 20);`
      },
      bullets: [
        "Creates the object.",
        "Passes the required values.",
        "Initializes the fields through the constructor.",
        "Makes object creation cleaner and more readable."
      ]
    },

    {
      id: "this-keyword",
      title: "Using this with Constructors",
      paragraphs: [
        "The this keyword refers to the current object.",
        "It is commonly used inside constructors when constructor parameters have the same names as instance fields."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student(String name, int age) {

        this.name = name;
        this.age = age;
    }
}`
      },
      bullets: [
        "this.name refers to the object's instance field.",
        "name refers to the constructor parameter.",
        "this.age refers to the object's instance field.",
        "age refers to the constructor parameter."
      ]
    },

    {
      id: "constructor-overloading",
      title: "Constructor Overloading",
      paragraphs: [
        "Constructor overloading means defining multiple constructors in the same class with different parameter lists.",
        "The constructors must have different parameter lists so Java can determine which constructor should be called."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {

        name = "Unknown";
        age = 0;
    }

    Student(String name) {

        this.name = name;
        age = 0;
    }

    Student(String name, int age) {

        this.name = name;
        this.age = age;
    }
}`
      }
    },

    {
      id: "constructor-overloading-example",
      title: "Constructor Overloading Example",
      paragraphs: [
        "Different constructors can be used depending on the information available when creating an object."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {

        name = "Unknown";
        age = 0;
    }

    Student(String name) {

        this.name = name;
        age = 0;
    }

    Student(String name, int age) {

        this.name = name;
        this.age = age;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student1 = new Student();

        Student student2 = new Student("Rahul");

        Student student3 = new Student("Priya", 22);

        System.out.println(student1.name + " " + student1.age);
        System.out.println(student2.name + " " + student2.age);
        System.out.println(student3.name + " " + student3.age);
    }
}`
      },
      output: `Unknown 0
Rahul 0
Priya 22`
    },

    {
      id: "constructor-selection",
      title: "How Java Selects a Constructor",
      paragraphs: [
        "When an object is created, Java looks at the number and types of arguments passed to new and selects the matching constructor."
      ],
      code: {
        language: "java",
        code: `Student student1 = new Student();

Student student2 = new Student("Rahul");

Student student3 = new Student("Priya", 22);`
      },
      bullets: [
        "new Student() → calls the no-argument constructor.",
        "new Student(\"Rahul\") → calls the one-parameter constructor.",
        "new Student(\"Priya\", 22) → calls the two-parameter constructor."
      ]
    },

    {
      id: "constructor-overloading-rules",
      title: "Rules of Constructor Overloading",
      paragraphs: [
        "Constructor overloading follows the same basic principle as method overloading: the parameter list must be different."
      ],
      bullets: [
        "Constructors must have the same name as the class.",
        "Constructors cannot have a return type.",
        "Constructors can differ by number of parameters.",
        "Constructors can differ by parameter types.",
        "Constructors cannot differ only by return type because constructors do not have return types."
      ]
    },

    {
      id: "student-practical-example",
      title: "Practical Example: Student",
      paragraphs: [
        "A Student class can provide different constructors depending on how much information is available when creating the student."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;
    double marks;

    Student() {

        name = "Unknown";
        age = 0;
        marks = 0;
    }

    Student(String name, int age) {

        this.name = name;
        this.age = age;
        marks = 0;
    }

    Student(String name, int age, double marks) {

        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    void displayDetails() {

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student1 = new Student();

        Student student2 = new Student("Rahul", 20);

        Student student3 = new Student("Priya", 22, 85.5);

        student1.displayDetails();

        student2.displayDetails();

        student3.displayDetails();
    }
}`
      },
      output: `Name: Unknown
Age: 0
Marks: 0.0
Name: Rahul
Age: 20
Marks: 0.0
Name: Priya
Age: 22
Marks: 85.5`
    },

    {
      id: "bank-account-example",
      title: "Practical Example: Bank Account",
      paragraphs: [
        "Constructors are useful in real-world applications where an object needs important information when it is created."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    String accountNumber;
    String accountHolder;
    double balance;

    BankAccount() {

        accountNumber = "Not Assigned";
        accountHolder = "Unknown";
        balance = 0;
    }

    BankAccount(String accountNumber, String accountHolder) {

        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        balance = 0;
    }

    BankAccount(
        String accountNumber,
        String accountHolder,
        double balance
    ) {

        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    void displayAccount() {

        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: " + balance);
    }
}

public class Main {

    public static void main(String[] args) {

        BankAccount account1 = new BankAccount();

        BankAccount account2 =
            new BankAccount("ACC101", "Rahul");

        BankAccount account3 =
            new BankAccount("ACC102", "Priya", 5000);

        account1.displayAccount();

        account2.displayAccount();

        account3.displayAccount();
    }
}`
      },
      output: `Account Number: Not Assigned
Account Holder: Unknown
Balance: 0.0

Account Number: ACC101
Account Holder: Rahul
Balance: 0.0

Account Number: ACC102
Account Holder: Priya
Balance: 5000.0`
    },

    {
      id: "constructor-chaining",
      title: "Constructor Chaining Using this()",
      paragraphs: [
        "One constructor can call another constructor in the same class using this().",
        "This is called constructor chaining.",
        "It helps avoid duplicate initialization code."
      ],
      code: {
        language: "java",
        code: `class Student {

    String name;
    int age;

    Student() {

        this("Unknown", 0);
    }

    Student(String name) {

        this(name, 0);
    }

    Student(String name, int age) {

        this.name = name;
        this.age = age;
    }

    void display() {

        System.out.println(name + " " + age);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student1 = new Student();

        Student student2 = new Student("Rahul");

        Student student3 = new Student("Priya", 22);

        student1.display();
        student2.display();
        student3.display();
    }
}`
      },
      output: `Unknown 0
Rahul 0
Priya 22`
    },

    {
      id: "this-constructor-rule",
      title: "Important Rule of this()",
      paragraphs: [
        "When this() is used to call another constructor in the same class, it must be the first statement inside the constructor."
      ],
      code: {
        language: "java",
        code: `class Student {

    Student() {

        this("Unknown");

        // Other statements can come after this()
    }

    Student(String name) {

        System.out.println(name);
    }
}`
      },
      bullets: [
        "this() calls another constructor in the same class.",
        "this() must be the first statement.",
        "It is useful for constructor chaining.",
        "It helps reduce duplicate initialization logic."
      ]
    },

    {
      id: "constructor-vs-method",
      title: "Constructor vs Method",
      paragraphs: [
        "Constructors and methods are both members of a class, but they serve different purposes."
      ],
      bullets: [
        "Constructor → Initializes an object.",
        "Method → Performs an operation or behavior.",
        "Constructor → Same name as the class.",
        "Method → Can have any valid method name.",
        "Constructor → Does not have a return type.",
        "Method → Has a return type or void.",
        "Constructor → Called during object creation.",
        "Method → Called explicitly when needed."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Constructor Mistakes",
      paragraphs: [
        "There are several common mistakes beginners make when working with constructors."
      ],
      bullets: [
        "Giving a constructor a return type.",
        "Using a constructor name different from the class name.",
        "Assuming a compiler-provided default constructor exists after declaring another constructor.",
        "Trying to overload constructors using only a different return type.",
        "Forgetting to initialize required fields.",
        "Using this() somewhere other than the first statement."
      ]
    },

    {
      id: "return-type-mistake",
      title: "Common Mistake: Adding a Return Type",
      paragraphs: [
        "A constructor must not have a return type. If you add a return type, Java treats it as a method instead of a constructor."
      ],
      code: {
        language: "java",
        code: `class Student {

    // This is a constructor
    Student() {
    }

    // This is a method, not a constructor
    void Student() {
    }
}`
      }
    },

    {
      id: "default-constructor-mistake",
      title: "Important: Declaring Another Constructor",
      paragraphs: [
        "If you declare any constructor yourself, Java no longer provides the compiler-generated default constructor.",
        "If you still need a no-argument constructor, you must explicitly define it."
      ],
      code: {
        language: "java",
        code: `class Student {

    Student(String name) {
    }

    // Student() is NOT automatically created here.
}`
      },
      bullets: [
        "No constructor declared → compiler can provide a default constructor.",
        "A constructor is declared → compiler does not add the default constructor.",
        "Need a no-argument constructor? Define it explicitly."
      ]
    },

    {
      id: "key-points",
      title: "Key Points",
      bullets: [
        "A constructor initializes an object when it is created.",
        "A constructor has the same name as the class.",
        "A constructor does not have a return type.",
        "Constructors are automatically called during object creation.",
        "A class can have multiple constructors.",
        "A parameterized constructor accepts values during object creation.",
        "Constructor overloading means having multiple constructors with different parameter lists.",
        "this refers to the current object.",
        "this() is used to call another constructor in the same class.",
        "this() must be the first statement in a constructor.",
        "If no constructor is declared, Java can provide a compiler-generated default constructor.",
        "If a constructor is declared, the compiler does not automatically provide the default constructor."
      ]
    },

    {
      id: "interview-questions",
      title: "Constructors: Interview Questions",
      interviewQuestions: [
        {
          question: "What is a constructor in Java?",
          answer:
            "A constructor is a special member of a class used to initialize an object when it is created."
        },
        {
          question: "What are the rules of a constructor?",
          answer:
            "A constructor must have the same name as the class and cannot have a return type."
        },
        {
          question: "When is a constructor called?",
          answer:
            "A constructor is automatically called when an object is created using the new keyword."
        },
        {
          question: "What is a default constructor?",
          answer:
            "A compiler-provided default constructor is a no-argument constructor generated when a class does not declare any constructor."
        },
        {
          question: "What is a parameterized constructor?",
          answer:
            "A parameterized constructor accepts one or more parameters and is used to initialize an object with specific values."
        },
        {
          question: "What is constructor overloading?",
          answer:
            "Constructor overloading means defining multiple constructors in the same class with different parameter lists."
        },
        {
          question: "Can constructors be overloaded?",
          answer:
            "Yes. Constructors can be overloaded by changing the number or types of parameters."
        },
        {
          question: "Can a constructor have a return type?",
          answer:
            "No. Constructors do not have return types. If a return type is added, it becomes a method."
        },
        {
          question: "Can a constructor be private?",
          answer:
            "Yes. A constructor can be private. This is commonly used in patterns such as Singleton or utility-style object creation control."
        },
        {
          question: "What is this() in a constructor?",
          answer:
            "this() is used to call another constructor of the same class and must be the first statement in the constructor."
        },
        {
          question: "What happens if we define a parameterized constructor?",
          answer:
            "Java does not automatically provide the compiler-generated no-argument constructor. If one is needed, it must be explicitly defined."
        },
        {
          question: "What is the difference between a constructor and a method?",
          answer:
            "A constructor initializes an object and is called during object creation, while a method performs an operation and is called explicitly."
        }
      ]
    }
  ]
};