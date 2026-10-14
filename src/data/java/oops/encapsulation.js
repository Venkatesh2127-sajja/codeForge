export const encapsulation = {
  id: "encapsulation",
  slug: "encapsulation",
  title: "Encapsulation in Java",
  topicTitle: "Object-Oriented Programming",
  topicSlug: "oops",
  description:
    "Learn encapsulation in Java using private fields, getters, setters, access control, validation, and practical real-world examples.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction to Encapsulation",
      paragraphs: [
        "Encapsulation is one of the fundamental principles of object-oriented programming.",
        "Encapsulation means bundling data and the methods that operate on that data inside a class while controlling how the data can be accessed.",
        "In Java, encapsulation is commonly implemented by declaring fields as private and providing public getter and setter methods when controlled access is required."
      ],
      bullets: [
        "Keep fields private.",
        "Provide public methods for controlled access.",
        "Protect the internal state of an object.",
        "Validate data before changing an object's state."
      ]
    },

    {
      id: "why-encapsulation",
      title: "Why Do We Need Encapsulation?",
      paragraphs: [
        "Without encapsulation, other classes can directly modify an object's data.",
        "Direct access can allow invalid values to enter an object.",
        "Encapsulation allows a class to control how its internal data is read or modified."
      ]
    },

    {
      id: "without-encapsulation",
      title: "Example Without Encapsulation",
      paragraphs: [
        "Consider a bank account where the balance is publicly accessible."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    public double balance;
}

public class Main {

    public static void main(String[] args) {

        BankAccount account = new BankAccount();

        account.balance = 5000;

        // Invalid modification
        account.balance = -10000;

        System.out.println(account.balance);
    }
}`
      },
      output: "-10000.0",
      paragraphsAfter: [
        "The problem is that any code with access to the object can directly assign an invalid balance."
      ]
    },

    {
      id: "private-fields",
      title: "Using Private Fields",
      paragraphs: [
        "To protect the internal state of an object, we can declare its fields as private.",
        "A private field can only be accessed directly from within the same class."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance;
}`
      },
      bullets: [
        "private prevents direct access from other classes.",
        "The class itself can still access its private fields.",
        "Other classes must use methods provided by the class."
      ]
    },

    {
      id: "access-control",
      title: "Access Control in Java",
      paragraphs: [
        "Java provides access modifiers that control where classes, fields, constructors, and methods can be accessed."
      ],
      bullets: [
        "private → accessible only within the same class.",
        "default → accessible within the same package when no access modifier is specified.",
        "protected → accessible within the same package and in subclasses under Java's access rules.",
        "public → accessible from anywhere the class or member is accessible."
      ]
    },

    {
      id: "private-example",
      title: "Private Field Example",
      paragraphs: [
        "The following example shows that a private field cannot be directly accessed from another class."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        // This will cause a compilation error:
        // student.name = "Rahul";
    }
}`
      }
    },

    {
      id: "getters",
      title: "Getters in Java",
      paragraphs: [
        "A getter is a method used to read or retrieve the value of a private field.",
        "Getter methods are commonly named using the get prefix followed by the field name."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;

    public String getName() {

        return name;
    }
}`
      }
    },

    {
      id: "using-getter",
      title: "Using a Getter",
      paragraphs: [
        "Once a getter is provided, other classes can retrieve the private field through the getter method."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;

    Student(String name) {

        this.name = name;
    }

    public String getName() {

        return name;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student("Rahul");

        System.out.println(student.getName());
    }
}`
      },
      output: "Rahul"
    },

    {
      id: "setters",
      title: "Setters in Java",
      paragraphs: [
        "A setter is a method used to modify the value of a private field.",
        "Setter methods are commonly named using the set prefix followed by the field name."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;

    public void setName(String name) {

        this.name = name;
    }
}`
      }
    },

    {
      id: "using-setter",
      title: "Using a Setter",
      paragraphs: [
        "A setter allows another class to change a private field through a controlled method."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.setName("Rahul");

        System.out.println(student.getName());
    }
}`
      },
      output: "Rahul"
    },

    {
      id: "getter-setter",
      title: "Getter and Setter Together",
      paragraphs: [
        "A private field can have both a getter and setter when the application needs both read and write access."
      ],
      code: {
        language: "java",
        code: `class Student {

    private String name;
    private int age;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public int getAge() {

        return age;
    }

    public void setAge(int age) {

        this.age = age;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.setName("Rahul");
        student.setAge(20);

        System.out.println(student.getName());
        System.out.println(student.getAge());
    }
}`
      },
      output: `Rahul
20`
    },

    {
      id: "validation",
      title: "Validation Using Setters",
      paragraphs: [
        "One of the biggest benefits of encapsulation is that we can validate data before storing it.",
        "The setter can reject invalid values instead of allowing them to directly modify the object's state."
      ],
      code: {
        language: "java",
        code: `class Student {

    private int age;

    public int getAge() {

        return age;
    }

    public void setAge(int age) {

        if (age >= 0 && age <= 100) {

            this.age = age;

        } else {

            System.out.println("Invalid age");
        }
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.setAge(20);
        System.out.println(student.getAge());

        student.setAge(150);
    }
}`
      },
      output: `20
Invalid age`
    },

    {
      id: "bank-account-encapsulation",
      title: "Practical Example: Bank Account",
      paragraphs: [
        "A bank account is a good example of encapsulation because the balance should not be freely modified by external code.",
        "The class can expose methods such as deposit() and withdraw() while keeping the balance private."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance;

    public double getBalance() {

        return balance;
    }

    public void deposit(double amount) {

        if (amount > 0) {

            balance = balance + amount;

        } else {

            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance) {

            balance = balance - amount;

        } else {

            System.out.println("Invalid withdrawal");
        }
    }
}

public class Main {

    public static void main(String[] args) {

        BankAccount account = new BankAccount();

        account.deposit(5000);

        account.withdraw(1000);

        System.out.println("Balance: " + account.getBalance());
    }
}`
      },
      output: "Balance: 4000.0"
    },

    {
      id: "why-direct-balance-dangerous",
      title: "Why Direct Access to Balance Is Dangerous",
      paragraphs: [
        "If balance were public, any code could assign an invalid value without following the bank account's business rules.",
        "By keeping balance private, the BankAccount class controls how the balance changes."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance;

    public void deposit(double amount) {

        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {

        return balance;
    }
}`
      },
      bullets: [
        "External code cannot directly modify balance.",
        "Deposits can be validated.",
        "Withdrawals can be validated.",
        "The class maintains control over its internal state."
      ]
    },

    {
      id: "read-only-property",
      title: "Read-Only Data",
      paragraphs: [
        "Sometimes an application should allow a field to be read but not directly changed after initialization.",
        "In that case, we can provide a getter without providing a setter."
      ],
      code: {
        language: "java",
        code: `class Employee {

    private final int employeeId;

    Employee(int employeeId) {

        this.employeeId = employeeId;
    }

    public int getEmployeeId() {

        return employeeId;
    }
}

public class Main {

    public static void main(String[] args) {

        Employee employee = new Employee(101);

        System.out.println(employee.getEmployeeId());
    }
}`
      },
      output: "101",
      bullets: [
        "The field is private.",
        "A getter provides read access.",
        "There is no setter.",
        "The final field cannot be reassigned after initialization."
      ]
    },

    {
      id: "write-only-concept",
      title: "Write-Only Access",
      paragraphs: [
        "A field can also be exposed through a setter without providing a getter when the application should accept a value but should not expose that value directly.",
        "This pattern is less common and should be used only when it makes sense for the application's requirements."
      ],
      code: {
        language: "java",
        code: `class Configuration {

    private String secret;

    public void setSecret(String secret) {

        this.secret = secret;
    }
}`
      }
    },

    {
      id: "employee-example",
      title: "Practical Example: Employee",
      paragraphs: [
        "Encapsulation can be used to protect employee information and validate values before updating the object."
      ],
      code: {
        language: "java",
        code: `class Employee {

    private String name;
    private double salary;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public double getSalary() {

        return salary;
    }

    public void setSalary(double salary) {

        if (salary >= 0) {

            this.salary = salary;

        } else {

            System.out.println("Salary cannot be negative");
        }
    }
}

public class Main {

    public static void main(String[] args) {

        Employee employee = new Employee();

        employee.setName("Rahul");
        employee.setSalary(50000);

        System.out.println("Name: " + employee.getName());
        System.out.println("Salary: " + employee.getSalary());
    }
}`
      },
      output: `Name: Rahul
Salary: 50000.0`
    },

    {
      id: "car-example",
      title: "Practical Example: Car",
      paragraphs: [
        "A car's speed can also be controlled using encapsulation. Instead of allowing external code to assign any value, the class can validate the speed."
      ],
      code: {
        language: "java",
        code: `class Car {

    private int speed;

    public int getSpeed() {

        return speed;
    }

    public void setSpeed(int speed) {

        if (speed >= 0 && speed <= 200) {

            this.speed = speed;

        } else {

            System.out.println("Invalid speed");
        }
    }
}

public class Main {

    public static void main(String[] args) {

        Car car = new Car();

        car.setSpeed(100);

        System.out.println("Speed: " + car.getSpeed());

        car.setSpeed(300);
    }
}`
      },
      output: `Speed: 100
Invalid speed`
    },

    {
      id: "encapsulation-vs-data-hiding",
      title: "Encapsulation and Data Hiding",
      paragraphs: [
        "Encapsulation and data hiding are closely related concepts but they are not exactly the same.",
        "Encapsulation focuses on bundling data and behavior together and controlling access to the object's state.",
        "Data hiding focuses specifically on restricting direct access to internal implementation details."
      ],
      bullets: [
        "private fields are commonly used for data hiding.",
        "Getters and setters provide controlled access.",
        "Methods can expose behavior without exposing internal implementation.",
        "Encapsulation helps protect the object's state."
      ]
    },

    {
      id: "access-control-example",
      title: "Access Control Example",
      paragraphs: [
        "Different access modifiers provide different levels of visibility."
      ],
      code: {
        language: "java",
        code: `class Example {

    private int privateValue;
    int defaultValue;
    protected int protectedValue;
    public int publicValue;
}`
      },
      bullets: [
        "privateValue → accessible only inside Example.",
        "defaultValue → accessible within the same package.",
        "protectedValue → accessible within the same package and through inheritance according to Java's protected access rules.",
        "publicValue → accessible wherever the class/member is accessible."
      ]
    },

    {
      id: "encapsulation-complete-example",
      title: "Complete Encapsulation Example",
      paragraphs: [
        "The following example combines private fields, getters, setters, validation, and object behavior."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double balance) {

        this.accountHolder = accountHolder;

        if (balance >= 0) {
            this.balance = balance;
        }
    }

    public String getAccountHolder() {

        return accountHolder;
    }

    public void setAccountHolder(String accountHolder) {

        if (accountHolder != null && !accountHolder.isBlank()) {

            this.accountHolder = accountHolder;
        }
    }

    public double getBalance() {

        return balance;
    }

    public void deposit(double amount) {

        if (amount > 0) {

            balance += amount;
        }
    }

    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance) {

            balance -= amount;
        }
    }
}

public class Main {

    public static void main(String[] args) {

        BankAccount account =
            new BankAccount("Rahul", 5000);

        account.deposit(2000);
        account.withdraw(1500);

        System.out.println(
            "Account Holder: " +
            account.getAccountHolder()
        );

        System.out.println(
            "Balance: " +
            account.getBalance()
        );
    }
}`
      },
      output: `Account Holder: Rahul
Balance: 5500.0`
    },

    {
      id: "common-mistakes",
      title: "Common Encapsulation Mistakes",
      paragraphs: [
        "There are several common mistakes beginners make when implementing encapsulation."
      ],
      bullets: [
        "Making every field public.",
        "Providing setters without validation when validation is required.",
        "Creating getters and setters without understanding why the field should be exposed.",
        "Exposing internal mutable objects directly when a defensive design is required.",
        "Assuming getters and setters automatically make a class fully encapsulated.",
        "Putting business rules outside the class when the class should protect its own state."
      ]
    },

    {
      id: "getter-setter-not-enough",
      title: "Are Getters and Setters Always Required?",
      paragraphs: [
        "No. Encapsulation does not mean that every private field must have both a getter and a setter.",
        "A class should expose only the operations that are actually required.",
        "For example, a field may be read-only, completely internal, or modified only through a business operation such as deposit() or withdraw()."
      ],
      code: {
        language: "java",
        code: `class BankAccount {

    private double balance;

    public double getBalance() {

        return balance;
    }

    public void deposit(double amount) {

        if (amount > 0) {
            balance += amount;
        }
    }
}`
      },
      bullets: [
        "balance has a getter.",
        "balance does not have a public setter.",
        "deposit() controls how the balance increases.",
        "This prevents arbitrary balance assignment."
      ]
    },

    {
      id: "key-points",
      title: "Key Points",
      bullets: [
        "Encapsulation is a core principle of object-oriented programming.",
        "It bundles data and behavior inside a class.",
        "Private fields prevent direct external access.",
        "Getters are commonly used to read private fields.",
        "Setters are commonly used to modify private fields.",
        "Setters can perform validation before changing object state.",
        "Not every field needs both a getter and setter.",
        "A class can expose business methods instead of direct setters.",
        "Access modifiers control visibility.",
        "Encapsulation helps protect an object's internal state.",
        "Data hiding is closely related to encapsulation.",
        "Good encapsulation exposes only the operations that are required."
      ]
    },

    {
      id: "interview-questions",
      title: "Encapsulation: Interview Questions",
      interviewQuestions: [
        {
          question: "What is encapsulation in Java?",
          answer:
            "Encapsulation is the practice of bundling data and behavior inside a class while controlling access to the object's internal state."
        },
        {
          question: "How do you achieve encapsulation in Java?",
          answer:
            "Encapsulation is commonly achieved by declaring fields private and providing controlled access through methods such as getters, setters, and business operations."
        },
        {
          question: "Why are fields usually declared private?",
          answer:
            "Private fields prevent direct access from outside the class and allow the class to control how its state is read or modified."
        },
        {
          question: "What is a getter?",
          answer:
            "A getter is a method used to retrieve the value of a private field."
        },
        {
          question: "What is a setter?",
          answer:
            "A setter is a method used to modify the value of a private field, often with validation logic."
        },
        {
          question: "Why is direct access to a field dangerous?",
          answer:
            "Direct access can allow invalid or inconsistent values to be assigned without following the object's business rules."
        },
        {
          question: "Does every private field need a getter and setter?",
          answer:
            "No. A class should expose only the access and operations required by its design."
        },
        {
          question: "What is data hiding?",
          answer:
            "Data hiding means restricting direct access to internal implementation details. Private fields are a common mechanism for achieving data hiding."
        },
        {
          question: "What is the difference between encapsulation and data hiding?",
          answer:
            "Encapsulation focuses on bundling data and behavior and controlling access, while data hiding specifically focuses on restricting access to internal details."
        },
        {
          question: "Can a private field be accessed outside the class?",
          answer:
            "It cannot be accessed directly from outside the class. It can be accessed indirectly through methods provided by the class."
        },
        {
          question: "Can a setter contain validation logic?",
          answer:
            "Yes. A setter can validate the incoming value before assigning it to the private field."
        },
        {
          question: "Why might a class provide a method like deposit() instead of setBalance()?",
          answer:
            "A business method such as deposit() can enforce domain rules and prevent arbitrary changes to the object's internal state."
        }
      ]
    }
  ]
};