export const exceptionHierarchy = {
  id: "exception-hierarchy",
  slug: "xception-hierarchy",
  
  title: "Exception Hierarchy in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Understand the complete Java exception hierarchy from Object and Throwable to Error, Exception, RuntimeException, checked exceptions, and common built-in exceptions.",
  estimatedTime: "40 min",

  sections: [
    // =========================================================
    // 1. INTRODUCTION
    // =========================================================

    {
      id: "introduction",
      title: "Introduction to the Exception Hierarchy",

      paragraphs: [
        "Java uses a class hierarchy to represent exceptions and errors.",
        "Understanding this hierarchy is important because the inheritance relationship between exception classes determines how exceptions can be caught and handled.",
        "All throwable objects ultimately derive from the Throwable class."
      ],

      bullets: [
        "Object is the root class of all Java classes.",
        "Throwable is the root of Java's throwable hierarchy.",
        "Throwable has two major branches: Error and Exception.",
        "RuntimeException is a subclass of Exception.",
        "Many checked exceptions directly or indirectly extend Exception but do not extend RuntimeException."
      ]
    },

    // =========================================================
    // 2. COMPLETE HIERARCHY
    // =========================================================

    {
      id: "complete-hierarchy",
      title: "Complete Java Exception Hierarchy",

      paragraphs: [
        "The simplified hierarchy below shows the most important classes you should understand for Java development and interviews."
      ],

      code: {
        language: "text",
        code: `Object
   |
   +-- Throwable
         |
         +-- Error
         |     |
         |     +-- OutOfMemoryError
         |     +-- StackOverflowError
         |     +-- VirtualMachineError
         |
         +-- Exception
               |
               +-- RuntimeException
               |     |
               |     +-- NullPointerException
               |     +-- ArithmeticException
               |     +-- ClassCastException
               |     +-- NumberFormatException
               |     +-- IllegalArgumentException
               |     +-- IllegalStateException
               |     +-- IndexOutOfBoundsException
               |
               +-- IOException
               +-- SQLException
               +-- ClassNotFoundException
               +-- InterruptedException
               +-- FileNotFoundException`
      }
    },

    // =========================================================
    // 3. OBJECT
    // =========================================================

    {
      id: "object",
      title: "Object: The Root of the Java Class Hierarchy",

      paragraphs: [
        "Object is the root class of the Java class hierarchy.",
        "Every Java class directly or indirectly inherits from Object.",
        "Throwable is also a class and therefore ultimately inherits from Object."
      ],

      code: {
        language: "java",
        code: `class Student {
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        System.out.println(
            student.toString()
        );
    }
}`
      },

      bullets: [
        "Object is the root class.",
        "Every class ultimately inherits from Object.",
        "Throwable also inherits from Object.",
        "Methods such as toString(), equals(), and hashCode() come from Object."
      ]
    },

    // =========================================================
    // 4. THROWABLE
    // =========================================================

    {
      id: "throwable",
      title: "Throwable",

      paragraphs: [
        "Throwable is the superclass of all classes whose instances can be thrown by the Java throw mechanism.",
        "Throwable provides important methods used when working with exceptions, such as getMessage(), getCause(), and printStackTrace()."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Throwable throwable =
            new Exception("Something went wrong");

        System.out.println(
            throwable.getMessage()
        );
    }
}`
      },

      output: "Something went wrong",

      bullets: [
        "Throwable extends Object.",
        "Error extends Throwable.",
        "Exception extends Throwable.",
        "Throwable provides common exception-related methods."
      ]
    },

    // =========================================================
    // 5. ERROR
    // =========================================================

    {
      id: "error",
      title: "Error",

      paragraphs: [
        "Error is a subclass of Throwable.",
        "Errors generally represent serious problems associated with the JVM or runtime environment.",
        "Application code normally should not attempt to recover from every Error."
      ],

      bullets: [
        "Error extends Throwable.",
        "Errors are generally unchecked.",
        "The compiler does not force Error handling.",
        "Common examples include OutOfMemoryError and StackOverflowError."
      ]
    },

    // =========================================================
    // 6. OUT OF MEMORY ERROR
    // =========================================================

    {
      id: "out-of-memory-error",
      title: "OutOfMemoryError",

      paragraphs: [
        "OutOfMemoryError can occur when the JVM cannot allocate enough memory for an operation.",
        "This is a serious runtime problem and is generally not treated like an ordinary application exception."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        // Conceptual example only.
        // Repeatedly allocating huge objects
        // can eventually exhaust heap memory.
    }
}`
      },

      bullets: [
        "OutOfMemoryError extends VirtualMachineError.",
        "It is an Error, not an Exception.",
        "It indicates a serious memory problem.",
        "The exact behavior depends on the JVM and runtime environment."
      ]
    },

    // =========================================================
    // 7. STACK OVERFLOW ERROR
    // =========================================================

    {
      id: "stack-overflow-error",
      title: "StackOverflowError",

      paragraphs: [
        "StackOverflowError can occur when the thread stack is exhausted.",
        "A common programming cause is uncontrolled recursion."
      ],

      code: {
        language: "java",
        code: `public class Main {

    static void recursiveMethod() {

        recursiveMethod();
    }

    public static void main(String[] args) {

        recursiveMethod();
    }
}`
      },

      output: "java.lang.StackOverflowError"
    },

    // =========================================================
    // 8. EXCEPTION
    // =========================================================

    {
      id: "exception",
      title: "Exception",

      paragraphs: [
        "Exception is the superclass of conditions that application code can commonly handle.",
        "Exception has two important categories for practical Java programming: checked exceptions and unchecked exceptions."
      ],

      code: {
        language: "text",
        code: `Throwable
    |
    +-- Exception
          |
          +-- RuntimeException
          |
          +-- Other checked exceptions`
      },

      bullets: [
        "Exception extends Throwable.",
        "RuntimeException extends Exception.",
        "Many checked exceptions also extend Exception.",
        "Exception is commonly used with try-catch and throws."
      ]
    },

    // =========================================================
    // 9. RUNTIME EXCEPTION
    // =========================================================

    {
      id: "runtime-exception",
      title: "RuntimeException",

      paragraphs: [
        "RuntimeException is a subclass of Exception.",
        "RuntimeException and its subclasses are unchecked exceptions.",
        "The compiler does not force developers to catch or declare RuntimeException subclasses."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String value = null;

        System.out.println(
            value.length()
        );
    }
}`
      },

      output: "java.lang.NullPointerException"
    },

    // =========================================================
    // 10. NULL POINTER EXCEPTION
    // =========================================================

    {
      id: "null-pointer-exception",
      title: "NullPointerException",

      paragraphs: [
        "NullPointerException is a RuntimeException that occurs when code attempts to use a null reference in an operation that requires an object."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String name = null;

        System.out.println(
            name.length()
        );
    }
}`
      },

      output: "java.lang.NullPointerException",

      bullets: [
        "NullPointerException extends RuntimeException.",
        "It is unchecked.",
        "It commonly occurs when a null reference is dereferenced."
      ]
    },

    // =========================================================
    // 11. ARITHMETIC EXCEPTION
    // =========================================================

    {
      id: "arithmetic-exception",
      title: "ArithmeticException",

      paragraphs: [
        "ArithmeticException is a RuntimeException that occurs when an invalid arithmetic operation is performed."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 0;

        System.out.println(a / b);
    }
}`
      },

      output: "java.lang.ArithmeticException: / by zero"
    },

    // =========================================================
    // 12. NUMBER FORMAT EXCEPTION
    // =========================================================

    {
      id: "number-format-exception",
      title: "NumberFormatException",

      paragraphs: [
        "NumberFormatException occurs when a String cannot be converted into the required numeric type."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        String value = "Java";

        int number =
            Integer.parseInt(value);

        System.out.println(number);
    }
}`
      },

      output: "java.lang.NumberFormatException"
    },

    // =========================================================
    // 13. CLASS CAST EXCEPTION
    // =========================================================

    {
      id: "class-cast-exception",
      title: "ClassCastException",

      paragraphs: [
        "ClassCastException occurs when an object is cast to an incompatible type at runtime."
      ],

      code: {
        language: "java",
        code: `class Animal {
}

class Dog extends Animal {
}

class Cat extends Animal {
}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Dog();

        Cat cat = (Cat) animal;

        System.out.println(cat);
    }
}`
      },

      output: "java.lang.ClassCastException"
    },

    // =========================================================
    // 14. ILLEGAL ARGUMENT EXCEPTION
    // =========================================================

    {
      id: "illegal-argument-exception",
      title: "IllegalArgumentException",

      paragraphs: [
        "IllegalArgumentException is a RuntimeException used when a method receives an argument that is inappropriate or invalid."
      ],

      code: {
        language: "java",
        code: `public class UserService {

    static void setAge(int age) {

        if (age < 0) {

            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }

        System.out.println(
            "Age: " + age
        );
    }

    public static void main(String[] args) {

        setAge(-10);
    }
}`
      },

      output: "java.lang.IllegalArgumentException: Age cannot be negative"
    },

    // =========================================================
    // 15. ILLEGAL STATE EXCEPTION
    // =========================================================

    {
      id: "illegal-state-exception",
      title: "IllegalStateException",

      paragraphs: [
        "IllegalStateException occurs when a method is called at an inappropriate time because the object's current state does not allow that operation."
      ],

      code: {
        language: "java",
        code: `class Order {

    private boolean delivered;

    void deliver() {

        if (delivered) {

            throw new IllegalStateException(
                "Order is already delivered"
            );
        }

        delivered = true;

        System.out.println(
            "Order delivered"
        );
    }
}

public class Main {

    public static void main(String[] args) {

        Order order = new Order();

        order.deliver();
        order.deliver();
    }
}`
      },

      output: "java.lang.IllegalStateException: Order is already delivered"
    },

    // =========================================================
    // 16. INDEX OUT OF BOUNDS
    // =========================================================

    {
      id: "index-out-of-bounds",
      title: "IndexOutOfBoundsException",

      paragraphs: [
        "IndexOutOfBoundsException is a RuntimeException used when an index is outside the valid range.",
        "ArrayIndexOutOfBoundsException and StringIndexOutOfBoundsException are specialized subclasses."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
            new ArrayList<>();

        names.add("Java");

        System.out.println(
            names.get(5)
        );
    }
}`
      },

      output: "java.lang.IndexOutOfBoundsException"
    },

    // =========================================================
    // 17. CHECKED EXCEPTIONS
    // =========================================================

    {
      id: "checked-exceptions",
      title: "Checked Exceptions",

      paragraphs: [
        "Checked exceptions are exceptions other than RuntimeException and its subclasses that the Java compiler requires the programmer to handle or declare.",
        "They are commonly associated with operations such as file access, database access, and other external resources."
      ],

      bullets: [
        "Checked exceptions are checked by the compiler.",
        "They must generally be handled using catch or declared using throws.",
        "IOException is a common checked exception.",
        "SQLException is a common checked exception.",
        "ClassNotFoundException is a checked exception.",
        "InterruptedException is a checked exception."
      ]
    },

    // =========================================================
    // 18. IO EXCEPTION
    // =========================================================

    {
      id: "io-exception",
      title: "IOException",

      paragraphs: [
        "IOException represents input/output related problems.",
        "It is a checked exception and commonly appears when working with files, streams, sockets, and other I/O operations."
      ],

      code: {
        language: "java",
        code: `import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args)
            throws IOException {

        FileReader reader =
            new FileReader("data.txt");

        reader.close();
    }
}`
      },

      bullets: [
        "IOException extends Exception.",
        "It is checked.",
        "The compiler requires it to be handled or declared."
      ]
    },

    // =========================================================
    // 19. FILE NOT FOUND EXCEPTION
    // =========================================================

    {
      id: "file-not-found-exception",
      title: "FileNotFoundException",

      paragraphs: [
        "FileNotFoundException is a subclass of IOException.",
        "It can occur when an application tries to open a file that cannot be found or cannot be opened as required."
      ],

      code: {
        language: "java",
        code: `import java.io.FileReader;
import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args)
            throws FileNotFoundException {

        FileReader reader =
            new FileReader("missing.txt");

        reader.close();
    }
}`
      },

      bullets: [
        "FileNotFoundException extends IOException.",
        "IOException extends Exception.",
        "Therefore FileNotFoundException is a checked exception."
      ]
    },

    // =========================================================
    // 20. SQL EXCEPTION
    // =========================================================

    {
      id: "sql-exception",
      title: "SQLException",

      paragraphs: [
        "SQLException represents database access or database-related errors.",
        "It is a checked exception.",
        "In modern Spring applications, database exceptions are often translated into Spring's data-access exception hierarchy, but understanding SQLException is still important for Java fundamentals and JDBC."
      ],

      code: {
        language: "java",
        code: `import java.sql.SQLException;

public class DatabaseService {

    static void connect()
            throws SQLException {

        throw new SQLException(
            "Database connection failed"
        );
    }

    public static void main(String[] args)
            throws SQLException {

        connect();
    }
}`
      },

      output:
        "java.sql.SQLException: Database connection failed"
    },

    // =========================================================
    // 21. CLASS NOT FOUND EXCEPTION
    // =========================================================

    {
      id: "class-not-found-exception",
      title: "ClassNotFoundException",

      paragraphs: [
        "ClassNotFoundException is a checked exception that can occur when an application tries to load a class by name and the class cannot be found."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args)
            throws ClassNotFoundException {

        Class.forName(
            "com.example.MissingClass"
        );
    }
}`
      },

      output:
        "java.lang.ClassNotFoundException: com.example.MissingClass"
    },

    // =========================================================
    // 22. INTERRUPTED EXCEPTION
    // =========================================================

    {
      id: "interrupted-exception",
      title: "InterruptedException",

      paragraphs: [
        "InterruptedException is a checked exception commonly encountered when a thread is sleeping, waiting, or otherwise blocked and another thread interrupts it."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args)
            throws InterruptedException {

        Thread.sleep(1000);

        System.out.println(
            "Thread completed"
        );
    }
}`
      },

      bullets: [
        "InterruptedException extends Exception.",
        "It is checked.",
        "It is commonly associated with thread interruption."
      ]
    },

    // =========================================================
    // 23. CHECKED VS UNCHECKED
    // =========================================================

    {
      id: "checked-vs-unchecked",
      title: "Checked vs Unchecked Exceptions",

      paragraphs: [
        "The most important distinction in the exception hierarchy is between checked exceptions and unchecked exceptions."
      ],

      bullets: [
        "Checked exceptions → compiler requires handling or declaration.",
        "Unchecked exceptions → RuntimeException and its subclasses.",
        "Checked exceptions generally represent conditions that the application may reasonably need to handle.",
        "Unchecked exceptions often indicate programming errors or invalid runtime state.",
        "IOException is checked.",
        "SQLException is checked.",
        "NullPointerException is unchecked.",
        "ArithmeticException is unchecked.",
        "NumberFormatException is unchecked."
      ]
    },

    // =========================================================
    // 24. HIERARCHY AND CATCH
    // =========================================================

    {
      id: "hierarchy-and-catch",
      title: "How the Hierarchy Affects catch",

      paragraphs: [
        "Because exception classes use inheritance, a catch block for a parent exception can also catch exceptions of its child types.",
        "This is why catch block ordering matters."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

            System.out.println(result);

        } catch (ArithmeticException e) {

            System.out.println(
                "Arithmetic exception"
            );

        } catch (RuntimeException e) {

            System.out.println(
                "Runtime exception"
            );

        } catch (Exception e) {

            System.out.println(
                "General exception"
            );
        }
    }
}`
      },

      output: "Arithmetic exception",

      bullets: [
        "ArithmeticException is more specific.",
        "RuntimeException is more general than ArithmeticException.",
        "Exception is more general than RuntimeException.",
        "Specific catch blocks should appear before general catch blocks."
      ]
    },

    // =========================================================
    // 25. CUSTOM EXCEPTION HIERARCHY
    // =========================================================

    {
      id: "custom-hierarchy",
      title: "Custom Exception Hierarchy",

      paragraphs: [
        "Java allows developers to create their own exception classes by extending Exception or RuntimeException.",
        "Custom exception hierarchies are useful when an application has domain-specific failure conditions."
      ],

      code: {
        language: "java",
        code: `class ApplicationException
        extends RuntimeException {

    ApplicationException(String message) {

        super(message);
    }
}

class PaymentException
        extends ApplicationException {

    PaymentException(String message) {

        super(message);
    }
}

public class Main {

    public static void main(String[] args) {

        throw new PaymentException(
            "Payment failed"
        );
    }
}`
      },

      output:
        "PaymentException: Payment failed"
    },

    // =========================================================
    // 26. COMMON MISTAKES
    // =========================================================

    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Understanding inheritance in the exception hierarchy helps avoid several common mistakes."
      ],

      bullets: [
        "Confusing Throwable with Exception.",
        "Thinking Error is a subclass of Exception.",
        "Thinking RuntimeException is a separate branch directly under Throwable.",
        "Forgetting that RuntimeException extends Exception.",
        "Thinking all exceptions are checked.",
        "Thinking all Errors must be caught.",
        "Putting a parent catch block before a child catch block.",
        "Confusing IOException with RuntimeException.",
        "Assuming every database exception is a RuntimeException in plain JDBC.",
        "Catching Throwable without a specific reason."
      ]
    },

    // =========================================================
    // 27. KEY POINTS
    // =========================================================

    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "Object is the root of the Java class hierarchy.",
        "Throwable extends Object.",
        "Error and Exception extend Throwable.",
        "RuntimeException extends Exception.",
        "RuntimeException and its subclasses are unchecked exceptions.",
        "Many other subclasses of Exception are checked exceptions.",
        "OutOfMemoryError and StackOverflowError are Errors.",
        "NullPointerException, ArithmeticException, and NumberFormatException are RuntimeExceptions.",
        "IOException, SQLException, and ClassNotFoundException are checked exceptions.",
        "FileNotFoundException is a subclass of IOException.",
        "A parent exception catch block can catch child exception types.",
        "Specific catch blocks should be placed before general catch blocks.",
        "Custom exceptions can extend Exception or RuntimeException.",
        "Understanding the hierarchy is essential for correct catch-block design."
      ]
    },

    // =========================================================
    // 28. INTERVIEW QUESTIONS
    // =========================================================

    {
      id: "interview-questions",
      title: "Exception Hierarchy: Interview Questions",

      interviewQuestions: [
        {
          question: "What is the root of the Java exception hierarchy?",
          answer:
            "Throwable is the root of the throwable hierarchy. Throwable itself ultimately extends Object."
        },

        {
          question: "What are the two main subclasses of Throwable?",
          answer:
            "The two main direct subclasses of Throwable are Error and Exception."
        },

        {
          question: "Is RuntimeException directly under Throwable?",
          answer:
            "No. RuntimeException extends Exception, and Exception extends Throwable."
        },

        {
          question: "What is the difference between Error and Exception?",
          answer:
            "Error generally represents serious JVM or runtime problems, while Exception represents conditions that application code may commonly handle."
        },

        {
          question: "What is RuntimeException?",
          answer:
            "RuntimeException is a subclass of Exception and is the superclass of many unchecked exceptions."
        },

        {
          question: "Is RuntimeException checked or unchecked?",
          answer:
            "RuntimeException and all of its subclasses are unchecked exceptions."
        },

        {
          question: "Give examples of RuntimeException.",
          answer:
            "NullPointerException, ArithmeticException, NumberFormatException, ClassCastException, IllegalArgumentException, and IllegalStateException."
        },

        {
          question: "Give examples of checked exceptions.",
          answer:
            "IOException, SQLException, FileNotFoundException, ClassNotFoundException, and InterruptedException."
        },

        {
          question: "Is IOException a RuntimeException?",
          answer:
            "No. IOException extends Exception directly and is a checked exception."
        },

        {
          question: "Is FileNotFoundException checked?",
          answer:
            "Yes. FileNotFoundException extends IOException, which extends Exception, so it is checked."
        },

        {
          question: "What is the parent of NullPointerException?",
          answer:
            "NullPointerException extends RuntimeException."
        },

        {
          question: "What is the parent of RuntimeException?",
          answer:
            "RuntimeException extends Exception."
        },

        {
          question: "What is the parent of Exception?",
          answer:
            "Exception extends Throwable."
        },

        {
          question: "What is the parent of Throwable?",
          answer:
            "Throwable extends Object."
        },

        {
          question: "Why does catch block order matter?",
          answer:
            "Because a parent exception can catch its child exceptions. Therefore, a specific child exception should be caught before its more general parent exception."
        },

        {
          question: "What happens if Exception is caught before IOException?",
          answer:
            "The IOException catch block becomes unreachable because Exception can already catch IOException."
        },

        {
          question: "Can we catch Throwable?",
          answer:
            "Yes, because Throwable is the root type for throwable objects, but catching Throwable is generally too broad and should only be done for specific infrastructure-level reasons."
        },

        {
          question: "Can we create a custom exception?",
          answer:
            "Yes. A custom exception can extend Exception for a checked exception or RuntimeException for an unchecked exception."
        },

        {
          question: "What is the difference between checked and unchecked exceptions?",
          answer:
            "Checked exceptions are enforced by the compiler and must generally be handled or declared. Unchecked exceptions extend RuntimeException and do not have this compiler requirement."
        },

        {
          question: "Is Error a checked exception?",
          answer:
            "No. Error is not a checked exception. It belongs to the Error branch under Throwable."
        }
      ]
    }
  ]
};