export const checkedVsUnchecked = {
  id: "checked-vs-unchecked-exceptions",
  slug: "checked-vs-unchecked-exception",
  title: "Checked vs Unchecked Exceptions",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Understand checked and unchecked exceptions in Java, compiler checking, common examples, important rules, custom exceptions, and practical interview scenarios.",
  estimatedTime: "45 min",

  sections: [
    {
      id: "introduction",
      title: "1. Introduction to Checked and Unchecked Exceptions",
      paragraphs: [
        "Java exceptions are broadly classified into checked exceptions and unchecked exceptions. The main difference is whether the Java compiler requires the programmer to handle or declare the exception.",
        "Checked exceptions are checked by the compiler at compile time. Unchecked exceptions are not required to be caught or declared by the compiler."
      ],
      bullets: [
        "Checked exceptions generally represent conditions that a program can reasonably recover from.",
        "Unchecked exceptions commonly represent programming errors or invalid state.",
        "The distinction is based mainly on the exception's position in the Java exception hierarchy."
      ]
    },

    {
      id: "exception-hierarchy",
      title: "2. Where Checked and Unchecked Exceptions Fit",
      paragraphs: [
        "Both checked and unchecked exceptions are part of the Throwable hierarchy.",
        "RuntimeException and its subclasses are unchecked. Most other subclasses of Exception are checked."
      ],
      code: {
        language: "text",
        code: `Object
   |
   +-- Throwable
         |
         +-- Error
         |
         +-- Exception
               |
               +-- RuntimeException
               |     |
               |     +-- NullPointerException
               |     +-- ArithmeticException
               |     +-- NumberFormatException
               |     +-- ClassCastException
               |     +-- IllegalArgumentException
               |
               +-- IOException
               +-- SQLException
               +-- FileNotFoundException
               +-- InterruptedException
               +-- ClassNotFoundException`
      },
      bullets: [
        "Checked exceptions are subclasses of Exception other than RuntimeException and its subclasses.",
        "RuntimeException and its subclasses are unchecked.",
        "Error is a separate branch under Throwable. Errors are also not subject to catch-or-declare checking, but they should not normally be described as unchecked exceptions because they are not Exception subclasses."
      ]
    },

    {
      id: "checked-exceptions",
      title: "3. What is a Checked Exception?",
      paragraphs: [
        "A checked exception is an exception that the Java compiler checks during compilation.",
        "If a method can throw a checked exception, the exception must generally be handled using try-catch or declared using the throws keyword."
      ],
      code: {
        language: "java",
        code: `import java.io.FileReader;
import java.io.IOException;

public class CheckedExample {

    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("data.txt");
            reader.close();
        } catch (IOException e) {
            System.out.println("File operation failed.");
        }
    }
}`
      },
      output: `File operation failed.`
    },

    {
      id: "why-compiler-checks",
      title: "4. Why Does the Compiler Check Them?",
      paragraphs: [
        "Checked exceptions often represent external conditions such as file access, database communication, network operations, or thread interruption.",
        "The compiler forces the developer to make an explicit decision: handle the exception or pass responsibility to the caller."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class FileService {

    public void readFile() throws IOException {
        // File operation
    }
}`
      },
      bullets: [
        "The method declares that it may throw IOException.",
        "The caller must handle IOException or declare it further.",
        "This makes the exceptional behavior visible in the method contract."
      ]
    },

    {
      id: "catch-or-declare",
      title: "5. Catch or Declare Rule",
      paragraphs: [
        "For a checked exception, Java generally requires one of two actions: catch the exception or declare it using throws."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class FileService {

    public void readFile() throws IOException {
        // Operation that may throw IOException
    }
}`
      },
      bullets: [
        "Option 1: handle the exception using try-catch.",
        "Option 2: declare the exception using throws.",
        "A checked exception cannot simply be ignored by the compiler."
      ]
    },

    {
      id: "handling-checked",
      title: "6. Handling a Checked Exception with try-catch",
      paragraphs: [
        "The first approach is to handle the checked exception directly inside the method."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class FileService {

    public void readFile() {

        try {
            performFileOperation();
        } catch (IOException e) {
            System.out.println("Unable to read file.");
        }
    }

    private void performFileOperation() throws IOException {
        throw new IOException("File not available");
    }
}`
      },
      output: `Unable to read file.`
    },

    {
      id: "declaring-checked",
      title: "7. Declaring a Checked Exception with throws",
      paragraphs: [
        "Instead of handling the exception immediately, a method can declare the checked exception using throws."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class FileService {

    public void readFile() throws IOException {
        throw new IOException("File not available");
    }

    public static void main(String[] args) {

        FileService service = new FileService();

        try {
            service.readFile();
        } catch (IOException e) {
            System.out.println("Handled in main.");
        }
    }
}`
      },
      output: `Handled in main.`
    },

    {
      id: "common-checked",
      title: "8. Common Checked Exceptions",
      paragraphs: [
        "Java provides many checked exceptions for operations involving external resources and application environments."
      ],
      bullets: [
        "IOException",
        "FileNotFoundException",
        "SQLException",
        "ClassNotFoundException",
        "InterruptedException"
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;
import java.sql.SQLException;

public class CheckedExceptions {

    void fileOperation() throws IOException {
    }

    void databaseOperation() throws SQLException {
    } 
}`
      }
    },

    {
      id: "ioexception",
      title: "9. IOException",
      paragraphs: [
        "IOException represents failures related to input and output operations."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class IoExample {

    public static void read() throws IOException {
        throw new IOException("Input/output operation failed");
    }
}`
      },
      bullets: [
        "File operations can throw IOException.",
        "Network operations can also involve IOException.",
        "IOException is a checked exception."
      ]
    },

    {
      id: "filenotfound",
      title: "10. FileNotFoundException",
      paragraphs: [
        "FileNotFoundException is a subclass of IOException. It can occur when a requested file cannot be opened."
      ],
      code: {
        language: "java",
        code: `import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class FileExample {

    public void openFile() throws FileNotFoundException {
        FileInputStream input =
                new FileInputStream("missing.txt");
    }
}`
      },
      bullets: [
        "FileNotFoundException is checked.",
        "It inherits from IOException.",
        "Because it is checked, the caller must handle or declare it."
      ]
    },

    {
      id: "sqlexception",
      title: "11. SQLException",
      paragraphs: [
        "SQLException is a checked exception commonly associated with JDBC database operations."
      ],
      code: {
        language: "java",
        code: `import java.sql.SQLException;

public class DatabaseService {

    public void connect() throws SQLException {
        // Database operation
    }
}`
      },
      bullets: [
        "SQLException extends Exception.",
        "It is a checked exception.",
        "Database code using JDBC commonly declares or handles it."
      ]
    },

    {
      id: "interrupted",
      title: "12. InterruptedException",
      paragraphs: [
        "InterruptedException is thrown when a thread is interrupted while it is waiting, sleeping, or otherwise performing an interruptible operation."
      ],
      code: {
        language: "java",
        code: `public class ThreadExample {

    public static void main(String[] args) {

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Thread was interrupted.");
        }
    }
}`
      },
      output: `Thread was interrupted.`
    },

    {
      id: "unchecked-exceptions",
      title: "13. What is an Unchecked Exception?",
      paragraphs: [
        "An unchecked exception is an exception that the Java compiler does not require the programmer to catch or declare.",
        "Unchecked exceptions are generally RuntimeException subclasses."
      ],
      code: {
        language: "java",
        code: `public class UncheckedExample {

    public static void main(String[] args) {

        int result = 10 / 0;

        System.out.println(result);
    }
}`
      },
      output: `Exception in thread "main" java.lang.ArithmeticException`
    },

    {
      id: "runtimeexception",
      title: "14. RuntimeException",
      paragraphs: [
        "RuntimeException is the parent class of many common unchecked exceptions.",
        "The compiler does not force methods to catch or declare RuntimeException."
      ],
      code: {
        language: "java",
        code: `public class RuntimeExample {

    public static void validateAge(int age) {

        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }
    }
}`
      },
      bullets: [
        "RuntimeException is unchecked.",
        "Its subclasses are also unchecked.",
        "A method can declare a RuntimeException using throws, but the compiler does not require it."
      ]
    },

    {
      id: "nullpointer",
      title: "15. NullPointerException",
      paragraphs: [
        "NullPointerException occurs when code attempts to use a null reference in an operation that requires an actual object."
      ],
      code: {
        language: "java",
        code: `public class NullExample {

    public static void main(String[] args) {

        String name = null;

        System.out.println(name.length());
    }
}`
      },
      output: `Exception in thread "main" java.lang.NullPointerException`
    },

    {
      id: "arithmetic",
      title: "16. ArithmeticException",
      paragraphs: [
        "ArithmeticException is an unchecked exception commonly associated with invalid arithmetic operations such as integer division by zero."
      ],
      code: {
        language: "java",
        code: `public class ArithmeticExample {

    public static void main(String[] args) {

        int number = 10;
        int result = number / 0;

        System.out.println(result);
    }
}`
      },
      output: `Exception in thread "main" java.lang.ArithmeticException`
    },

    {
      id: "number-format",
      title: "17. NumberFormatException",
      paragraphs: [
        "NumberFormatException occurs when a String cannot be converted into a valid numeric value."
      ],
      code: {
        language: "java",
        code: `public class NumberExample {

    public static void main(String[] args) {

        String value = "abc";

        int number = Integer.parseInt(value);

        System.out.println(number);
    }
}`
      },
      output: `Exception in thread "main" java.lang.NumberFormatException`
    },

    {
      id: "class-cast",
      title: "18. ClassCastException",
      paragraphs: [
        "ClassCastException occurs when an object is cast to an incompatible type at runtime."
      ],
      code: {
        language: "java",
        code: `public class CastExample {

    public static void main(String[] args) {

        Object value = "Java";

        Integer number = (Integer) value;

        System.out.println(number);
    }
}`
      },
      output: `Exception in thread "main" java.lang.ClassCastException`
    },

    {
      id: "illegal-argument",
      title: "19. IllegalArgumentException",
      paragraphs: [
        "IllegalArgumentException is an unchecked exception used when a method receives an inappropriate argument."
      ],
      code: {
        language: "java",
        code: `public class ValidationService {

    public static void setAge(int age) {

        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }
    }

    public static void main(String[] args) {
        setAge(-10);
    }
}`
      },
      output: `Exception in thread "main" java.lang.IllegalArgumentException`
    },

    {
      id: "checked-vs-unchecked-table",
      title: "20. Checked vs Unchecked Exceptions",
      paragraphs: [
        "The following comparison summarizes the major differences between checked and unchecked exceptions."
      ],
      bullets: [
        "Checked exceptions are checked by the compiler.",
        "Unchecked exceptions are not required to be caught or declared.",
        "Checked exceptions generally extend Exception directly or indirectly, excluding RuntimeException.",
        "Unchecked exceptions generally extend RuntimeException.",
        "Checked exceptions require catch-or-declare handling.",
        "Unchecked exceptions can propagate without being explicitly declared.",
        "IOException and SQLException are common checked exceptions.",
        "NullPointerException and ArithmeticException are common unchecked exceptions."
      ]
    },

    {
      id: "why-checked",
      title: "21. Why Do Checked Exceptions Exist?",
      paragraphs: [
        "Checked exceptions encourage developers to explicitly consider recoverable external failures.",
        "For example, a file may not exist, a database connection may fail, or a thread may be interrupted."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class FileReaderService {

    public void read() throws IOException {
        // Caller must decide how to handle the failure.
    }
}`
      },
      bullets: [
        "They make certain exceptional conditions part of the method contract.",
        "They can encourage explicit recovery or propagation decisions.",
        "They are especially common around I/O and other external resources."
      ]
    },

    {
      id: "why-unchecked",
      title: "22. Why Do Unchecked Exceptions Exist?",
      paragraphs: [
        "Unchecked exceptions are useful for programming errors and invalid operations where forcing every caller to handle the exception would often make the code unnecessarily complicated.",
        "For example, passing null where an object is required or using an invalid argument can result in an unchecked exception."
      ],
      code: {
        language: "java",
        code: `public class UserService {

    public void findUser(String username) {

        if (username == null) {
            throw new IllegalArgumentException(
                "Username cannot be null"
            );
        }
    }
}`
      }
    },

    {
      id: "throws-runtime",
      title: "23. Can We Use throws with RuntimeException?",
      paragraphs: [
        "Yes. Java allows a method to declare unchecked exceptions using throws. However, the compiler does not require callers to catch or declare them."
      ],
      code: {
        language: "java",
        code: `public class ValidationService {

    public void validate(int age)
            throws IllegalArgumentException {

        if (age < 0) {
            throw new IllegalArgumentException(
                "Invalid age"
            );
        }
    }
}`
      },
      bullets: [
        "throws is legal with RuntimeException.",
        "The declaration is optional from the compiler's perspective.",
        "Some APIs use such declarations to document possible failures."
      ]
    },

    {
      id: "can-checked-ignore",
      title: "24. Can a Checked Exception Be Ignored?",
      paragraphs: [
        "A checked exception cannot simply be ignored by the compiler when it is thrown by a method in a context that requires handling.",
        "The caller must generally catch it or declare it."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class Example {

    public void process() {

        // Compilation error if a method that declares
        // IOException is called without handling it.

        // readFile();
    }

    private void readFile() throws IOException {
        // File operation
    }
}`
      },
      bullets: [
        "Ignoring a checked exception can result in a compilation error.",
        "Catching it and doing nothing is technically possible, but usually poor practice.",
        "If the caller cannot handle it meaningfully, propagation may be more appropriate."
      ]
    },

    {
      id: "exception-propagation",
      title: "25. Exception Propagation",
      paragraphs: [
        "Exception propagation means an exception moves from the method where it occurs toward the calling methods until a matching handler is found."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public class Service {

    void methodC() throws IOException {
        throw new IOException("File error");
    }

    void methodB() throws IOException {
        methodC();
    }

    void methodA() throws IOException {
        methodB();
    }

    public static void main(String[] args) {

        Service service = new Service();

        try {
            service.methodA();
        } catch (IOException e) {
            System.out.println("Exception handled in main.");
        }
    }
}`
      },
      output: `Exception handled in main.`
    },

    {
      id: "custom-checked",
      title: "26. Creating a Custom Checked Exception",
      paragraphs: [
        "A custom checked exception is created by extending Exception."
      ],
      code: {
        language: "java",
        code: `class InsufficientBalanceException
        extends Exception {

    public InsufficientBalanceException(String message) {
        super(message);
    }
}

class BankAccount {

    public void withdraw(double amount)
            throws InsufficientBalanceException {

        double balance = 5000;

        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Insufficient balance"
            );
        }

        System.out.println("Withdrawal successful.");
    }
}

public class CustomCheckedExample {

    public static void main(String[] args) {

        BankAccount account = new BankAccount();

        try {
            account.withdraw(7000);
        } catch (InsufficientBalanceException e) {
            System.out.println(e.getMessage());
        }
    }
}`
      },
      output: `Insufficient balance`,
      bullets: [
        "The custom exception extends Exception.",
        "Because it is checked, withdraw() declares it using throws.",
        "The caller handles it using catch."
      ]
    },

    {
      id: "custom-unchecked",
      title: "27. Creating a Custom Unchecked Exception",
      paragraphs: [
        "A custom unchecked exception is created by extending RuntimeException."
      ],
      code: {
        language: "java",
        code: `class InvalidAgeException
        extends RuntimeException {

    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomUncheckedExample {

    public static void validateAge(int age) {

        if (age < 18) {
            throw new InvalidAgeException(
                "Age must be at least 18"
            );
        }
    }

    public static void main(String[] args) {

        validateAge(15);
    }
}`
      },
      output: `Exception in thread "main" InvalidAgeException: Age must be at least 18`,
      bullets: [
        "The custom exception extends RuntimeException.",
        "The compiler does not require validateAge() to declare it.",
        "The caller can still catch it if recovery is appropriate."
      ]
    },

    {
      id: "custom-choice",
      title: "28. Checked or Unchecked for Custom Exceptions?",
      paragraphs: [
        "The choice depends on the type of failure and how the application expects callers to respond.",
        "There is no universal rule that every custom exception should be checked or every custom exception should be unchecked."
      ],
      bullets: [
        "Use a checked exception when callers are reasonably expected to recover or explicitly deal with an external condition.",
        "Use an unchecked exception when the failure represents invalid input, programming misuse, or an invalid application state.",
        "Consider the API design and how callers should reasonably respond.",
        "Keep exception types meaningful and specific."
      ]
    },

    {
      id: "overriding-rules",
      title: "29. Checked Exceptions and Method Overriding",
      paragraphs: [
        "When a child class overrides a method, it cannot declare a broader checked exception than the parent method allows.",
        "The overriding method may declare the same checked exception, a narrower checked exception, or no checked exception."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

class Parent {

    void read() throws IOException {
    }
}

class Child extends Parent {

    @Override
    void read() throws IOException {
    }
}`
      },
      bullets: [
        "The child can declare the same checked exception.",
        "The child can declare a subclass of the parent's checked exception.",
        "The child can declare no checked exception.",
        "The child cannot introduce a broader checked exception such as Exception."
      ]
    },

    {
      id: "catch-exception",
      title: "30. Does catch(Exception) Catch Both Types?",
      paragraphs: [
        "Yes. Since both checked exceptions and RuntimeException are subclasses of Exception, catch(Exception e) can catch both."
      ],
      code: {
        language: "java",
        code: `public class CatchExample {

    public static void main(String[] args) {

        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (Exception e) {
            System.out.println("Exception handled.");
        }
    }
}`
      },
      output: `Exception handled.`
    },

    {
      id: "catch-throwable",
      title: "31. What About catch(Throwable)?",
      paragraphs: [
        "Throwable is the parent of both Exception and Error. Therefore, catch(Throwable t) can catch both exceptions and errors."
      ],
      code: {
        language: "java",
        code: `public class ThrowableExample {

    public static void main(String[] args) {

        try {
            throw new RuntimeException("Problem");
        } catch (Throwable t) {
            System.out.println("Throwable caught.");
        }
    }
}`
      },
      output: `Throwable caught.`,
      bullets: [
        "Throwable catches Exception subclasses.",
        "Throwable can also catch Error subclasses.",
        "Catching Throwable broadly is generally discouraged because it can intercept serious Errors."
      ]
    },

    {
      id: "errors-vs-unchecked",
      title: "32. Are Errors Unchecked Exceptions?",
      paragraphs: [
        "This is an important terminology point. Error is not an unchecked exception in the strict Java hierarchy because Error does not extend Exception.",
        "Errors are Throwable subclasses that usually represent serious JVM or system-level problems."
      ],
      bullets: [
        "RuntimeException and its subclasses are unchecked exceptions.",
        "Error and its subclasses are not checked by the compiler.",
        "OutOfMemoryError and StackOverflowError are examples of Error.",
        "Applications generally should not try to recover from most Error conditions."
      ]
    },

    {
      id: "when-to-use-checked",
      title: "33. When Should You Use a Checked Exception?",
      paragraphs: [
        "Checked exceptions can be appropriate when the caller can reasonably take a meaningful recovery action."
      ],
      bullets: [
        "Recoverable file or I/O failures.",
        "External resource failures where the caller can retry or choose another action.",
        "Situations where handling the exceptional condition is an important part of the API contract.",
        "Cases where forcing callers to make an explicit handling or propagation decision is useful."
      ]
    },

    {
      id: "when-to-use-unchecked",
      title: "34. When Should You Use an Unchecked Exception?",
      paragraphs: [
        "Unchecked exceptions are often appropriate for invalid arguments, programming misuse, and invalid application state."
      ],
      bullets: [
        "Invalid method arguments.",
        "Invalid object state.",
        "Programming errors.",
        "Precondition violations.",
        "Cases where callers are not reasonably expected to recover locally."
      ],
      code: {
        language: "java",
        code: `public void withdraw(double amount) {

    if (amount <= 0) {
        throw new IllegalArgumentException(
            "Amount must be positive"
        );
    }
}`
      }
    },

    {
      id: "common-mistakes",
      title: "35. Common Mistakes",
      paragraphs: [
        "Understanding a few common mistakes makes the checked versus unchecked distinction much easier."
      ],
      bullets: [
        "Mistake: Thinking every Exception is checked. RuntimeException and its subclasses are unchecked.",
        "Mistake: Thinking Error is the same as RuntimeException. They are separate branches under Throwable.",
        "Mistake: Thinking throws catches an exception. throws only declares that a method may propagate an exception.",
        "Mistake: Thinking throw and throws are the same. throw actually throws an exception object; throws declares possible exceptions.",
        "Mistake: Catching Exception everywhere instead of handling specific failures appropriately.",
        "Mistake: Creating custom exceptions without meaningful names or useful messages.",
        "Mistake: Catching InterruptedException and silently ignoring the interruption."
      ]
    },

    {
      id: "important-rules",
      title: "36. Important Rules to Remember",
      paragraphs: [
        "These rules are especially important for Java interviews and day-to-day development."
      ],
      bullets: [
        "Checked exceptions are compiler-checked.",
        "Checked exceptions must generally be caught or declared.",
        "RuntimeException and its subclasses are unchecked.",
        "Unchecked exceptions do not require catch-or-declare handling.",
        "throws declares possible exceptions; it does not handle them.",
        "throw actually creates or propagates an exception object.",
        "A custom checked exception extends Exception.",
        "A custom unchecked exception extends RuntimeException.",
        "FileNotFoundException is a subclass of IOException.",
        "NullPointerException is a subclass of RuntimeException.",
        "catch(Exception e) can catch both checked exceptions and RuntimeException subclasses.",
        "catch(Throwable t) can also catch Error, but broad Throwable catching is generally discouraged.",
        "Errors are separate from the Exception hierarchy.",
        "An overriding method cannot declare broader checked exceptions than the overridden method."
      ]
    },

    {
      id: "summary",
      title: "37. Key Points",
      paragraphs: [
        "Checked and unchecked exceptions are two important categories in Java exception handling.",
        "Checked exceptions are verified by the compiler and generally require catch-or-declare handling. Unchecked exceptions are RuntimeException subclasses and do not have that compiler requirement.",
        "The correct choice for a custom exception depends on whether callers should be required to explicitly handle or propagate the exceptional condition."
      ],
      bullets: [
        "Checked → compiler checks it.",
        "Unchecked → compiler does not require handling.",
        "Checked example → IOException.",
        "Unchecked example → NullPointerException.",
        "Custom checked → extends Exception.",
        "Custom unchecked → extends RuntimeException.",
        "throws → declares.",
        "throw → throws an exception.",
        "RuntimeException → unchecked.",
        "Error → separate Throwable branch."
      ]
    },

    {
      id: "interview-questions",
      title: "38. Interview Questions",
      interviewQuestions: [
        {
          question: "What is a checked exception?",
          answer:
            "A checked exception is an exception that the Java compiler checks. The caller generally must catch it or declare it using throws."
        },
        {
          question: "What is an unchecked exception?",
          answer:
            "An unchecked exception is generally a RuntimeException or one of its subclasses. The compiler does not require the caller to catch or declare it."
        },
        {
          question: "Give examples of checked exceptions.",
          answer:
            "IOException, SQLException, FileNotFoundException, ClassNotFoundException, and InterruptedException are common checked exceptions."
        },
        {
          question: "Give examples of unchecked exceptions.",
          answer:
            "NullPointerException, ArithmeticException, NumberFormatException, ClassCastException, IllegalArgumentException, and IllegalStateException are common unchecked exceptions."
        },
        {
          question: "Why are checked exceptions checked by the compiler?",
          answer:
            "They commonly represent conditions where the caller may reasonably need to recover or explicitly decide how the failure should propagate."
        },
        {
          question: "Why are RuntimeExceptions unchecked?",
          answer:
            "RuntimeExceptions commonly represent programming errors, invalid arguments, or invalid application state, so Java does not require every caller to explicitly catch or declare them."
        },
        {
          question: "Can we use throws with RuntimeException?",
          answer:
            "Yes. It is legal to declare a RuntimeException using throws, but the compiler does not require callers to handle or declare it."
        },
        {
          question: "Can a checked exception be ignored?",
          answer:
            "It cannot be ignored by the compiler when the code must handle or declare it. The method must generally catch it or declare it."
        },
        {
          question: "What is the difference between throw and throws?",
          answer:
            "throw is used to actually throw an exception object. throws is used in a method declaration to indicate that the method may propagate one or more exceptions."
        },
        {
          question: "How do you create a custom checked exception?",
          answer:
            "Create a class that extends Exception and provide suitable constructors."
        },
        {
          question: "How do you create a custom unchecked exception?",
          answer:
            "Create a class that extends RuntimeException."
        },
        {
          question: "Is Error a checked exception?",
          answer:
            "No. Error is a separate branch under Throwable. It is not an Exception subclass and is not subject to compiler catch-or-declare checking."
        },
        {
          question: "Can catch(Exception e) catch RuntimeException?",
          answer:
            "Yes. RuntimeException extends Exception, so catch(Exception e) can catch RuntimeException and its subclasses."
        },
        {
          question: "Can catch(Exception e) catch Error?",
          answer:
            "No. Error does not extend Exception. A catch(Throwable t) block can catch both Exception and Error."
        },
        {
          question: "What happens if a child method declares a broader checked exception than the parent?",
          answer:
            "The code will not compile. An overriding method cannot declare a broader checked exception than the overridden method."
        },
        {
          question: "Is FileNotFoundException checked or unchecked?",
          answer:
            "FileNotFoundException is checked because it extends IOException, which is a checked exception."
        },
        {
          question: "Is NullPointerException checked or unchecked?",
          answer:
            "NullPointerException is unchecked because it extends RuntimeException."
        },
        {
          question: "Which is better: checked or unchecked exceptions?",
          answer:
            "Neither is universally better. The appropriate choice depends on whether callers should reasonably be required to handle or propagate the exceptional condition."
        }
      ]
    }
  ]
};