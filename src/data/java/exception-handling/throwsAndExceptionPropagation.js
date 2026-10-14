export const throwsAndExceptionPropagation = {
  id: "throws-and-exception-propagation",
  slug: "throws-and-exception-propagation",
  title: "throws and Exception Propagation in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Understand the throws keyword and exception propagation in Java, including checked exceptions, multiple exceptions, method-to-method propagation, rethrowing, exception translation, exception chaining, method overriding rules, and practical service-layer examples.",
  estimatedTime: "50 min",

  sections: [
    {
      id: "what-is-throws",
      title: "1. What is throws?",
      paragraphs: [
        "The throws keyword is used in a method declaration to indicate that the method may throw one or more exceptions.",
        "It is mainly used with checked exceptions. Instead of handling a checked exception inside the current method, the method can declare the exception and allow the caller to handle it."
      ],
      code: {
        language: "java",
        code: `public void readFile() throws IOException {
    FileReader reader = new FileReader("data.txt");
}`
      },
      bullets: [
        "throws is written in the method signature.",
        "It declares possible exceptions that can leave the method.",
        "It does not actually throw an exception.",
        "The caller becomes responsible for handling or further propagating the exception."
      ]
    },

    {
      id: "throws-syntax",
      title: "2. throws Syntax",
      paragraphs: [
        "The general syntax places throws after the method parameter list and before the method body."
      ],
      code: {
        language: "java",
        code: `returnType methodName(parameters) throws ExceptionType {
    // method body
}`
      },
      bullets: [
        "A method can declare one exception.",
        "A method can declare multiple exceptions separated by commas.",
        "throws is part of the method declaration."
      ],
      code: {
        language: "java",
        code: `public void processFile() throws IOException {
    // file processing
}

public void processData()
        throws IOException, SQLException {
    // file and database processing
}`
      }
    },

    {
      id: "throw-vs-throws",
      title: "3. throw vs throws",
      paragraphs: [
        "throw and throws are related to exception handling, but they have completely different purposes.",
        "throw is used to explicitly throw a specific exception object. throws is used to declare that a method may propagate one or more exceptions."
      ],
      code: {
        language: "java",
        code: `// throw
public void validateAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be 18 or above");
    }
}

// throws
public void readFile() throws IOException {
    FileReader reader = new FileReader("data.txt");
}`
      },
      bullets: [
        "throw → actually throws an exception.",
        "throws → declares possible exceptions.",
        "throw is used inside a method body.",
        "throws is used in the method signature.",
        "throw is followed by an exception object.",
        "throws is followed by one or more exception types."
      ]
    },

    {
      id: "declaring-checked-exceptions",
      title: "4. Declaring Checked Exceptions",
      paragraphs: [
        "Java requires checked exceptions to be either handled with try-catch or declared using throws.",
        "If a method calls another method that throws a checked exception and does not handle it, the current method must declare that exception."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;

public void loadFile() throws IOException {
    FileReader reader = new FileReader("data.txt");
}`
      },
      bullets: [
        "IOException is a checked exception.",
        "The compiler requires the exception to be handled or declared.",
        "throws transfers the handling responsibility to the caller."
      ]
    },

    {
      id: "multiple-exceptions",
      title: "5. Multiple Exceptions with throws",
      paragraphs: [
        "A method can declare multiple exceptions in its throws clause.",
        "Each exception type is separated by a comma."
      ],
      code: {
        language: "java",
        code: `public void processData()
        throws IOException, SQLException {

    // file operation

    // database operation
}`
      },
      bullets: [
        "Multiple exceptions are separated using commas.",
        "The exceptions can be from different branches of the exception hierarchy.",
        "The caller must handle each checked exception or declare them further."
      ]
    },

    {
      id: "caller-callee-responsibility",
      title: "6. Caller and Callee Responsibility",
      paragraphs: [
        "When a method declares a checked exception using throws, the method itself is not handling that exception.",
        "The caller that invokes the method must either handle the exception or declare it again."
      ],
      code: {
        language: "java",
        code: `public void readFile() throws IOException {
    FileReader reader = new FileReader("data.txt");
}

public void process() throws IOException {
    readFile();
}

public void start() {
    try {
        process();
    } catch (IOException e) {
        System.out.println("Unable to read file");
    }
}`
      },
      bullets: [
        "readFile() declares IOException.",
        "process() does not handle it, so it declares IOException.",
        "start() finally handles the exception.",
        "This is an example of exception propagation."
      ]
    },

    {
      id: "exception-propagation",
      title: "7. What is Exception Propagation?",
      paragraphs: [
        "Exception propagation means an exception moves from the current method to its caller when the current method does not handle it.",
        "The exception continues moving up the call stack until a matching catch block handles it or the exception reaches the JVM."
      ],
      code: {
        language: "java",
        code: `public void methodC() {
    int result = 10 / 0;
}

public void methodB() {
    methodC();
}

public void methodA() {
    methodB();
}

public static void main(String[] args) {
    methodA();
}`
      },
      bullets: [
        "methodC() creates ArithmeticException.",
        "methodC() does not handle it.",
        "The exception propagates to methodB().",
        "It then propagates to methodA().",
        "Finally, it reaches main().",
        "If nobody handles it, the JVM terminates the current execution path and prints the stack trace."
      ]
    },

    {
      id: "propagation-multiple-methods",
      title: "8. Propagation Across Multiple Methods",
      paragraphs: [
        "Exception propagation can pass through several methods.",
        "This is common in real applications where a controller calls a service, the service calls a repository, and a lower-level operation fails."
      ],
      code: {
        language: "java",
        code: `public void repository() throws IOException {
    throw new IOException("File unavailable");
}

public void service() throws IOException {
    repository();
}

public void controller() {
    try {
        service();
    } catch (IOException e) {
        System.out.println("Request could not be processed");
    }
}`
      },
      bullets: [
        "repository() produces the checked exception.",
        "service() propagates it.",
        "controller() handles it.",
        "The same principle applies to layered applications."
      ]
    },

    {
      id: "checked-propagation",
      title: "9. Checked Exception Propagation",
      paragraphs: [
        "Checked exceptions are verified by the compiler.",
        "If a checked exception is not handled inside a method, that method must declare it using throws."
      ],
      code: {
        language: "java",
        code: `public void methodC() throws IOException {
    throw new IOException("File error");
}

public void methodB() throws IOException {
    methodC();
}

public void methodA() {
    try {
        methodB();
    } catch (IOException e) {
        System.out.println("Handled in methodA");
    }
}`
      },
      bullets: [
        "methodC() declares IOException.",
        "methodB() also declares IOException because it does not handle it.",
        "methodA() handles the exception.",
        "The compiler enforces this for checked exceptions."
      ]
    },

    {
      id: "unchecked-propagation",
      title: "10. Unchecked Exception Propagation",
      paragraphs: [
        "Unchecked exceptions are RuntimeException subclasses. They can propagate through methods without being declared using throws.",
        "Although declaring an unchecked exception with throws is legal, the compiler does not require it."
      ],
      code: {
        language: "java",
        code: `public void calculate() {
    int result = 10 / 0;
}

public void process() {
    calculate();
}

public void start() {
    process();
}`
      },
      bullets: [
        "ArithmeticException is unchecked.",
        "No throws declaration is required.",
        "The exception can still propagate through the call stack.",
        "The application can catch it when appropriate."
      ]
    },

    {
      id: "handle-correct-layer",
      title: "11. Handling Exceptions at the Correct Layer",
      paragraphs: [
        "An exception should generally be handled at the layer that has enough information to make a meaningful decision.",
        "A low-level method may not know how to respond to a business or user-facing failure, so it can propagate the exception to a higher layer."
      ],
      code: {
        language: "java",
        code: `public void repository() throws SQLException {
    // database operation
}

public void service() throws SQLException {
    repository();
}

public void controller() {
    try {
        service();
    } catch (SQLException e) {
        System.out.println("Database operation failed");
    }
}`
      },
      bullets: [
        "Repository performs low-level database work.",
        "Service contains business logic.",
        "Controller or global exception handling can convert the failure into an appropriate response.",
        "Avoid catching an exception only to ignore it."
      ]
    },

    {
      id: "rethrowing-exception",
      title: "12. Rethrowing Exceptions",
      paragraphs: [
        "Rethrowing means catching an exception and throwing it again so that a higher layer can handle it.",
        "Rethrowing is useful when the current method needs to perform limited processing such as logging or cleanup but cannot fully handle the problem."
      ],
      code: {
        language: "java",
        code: `public void process() throws IOException {
    try {
        readFile();
    } catch (IOException e) {
        System.out.println("Logging file failure");
        throw e;
    }
}`
      },
      bullets: [
        "The original exception is caught.",
        "Some local processing can be performed.",
        "throw e sends the same exception to the caller.",
        "The original exception information is preserved."
      ]
    },

    {
      id: "exception-translation",
      title: "13. Exception Translation",
      paragraphs: [
        "Exception translation means catching a low-level technical exception and converting it into a higher-level exception that better represents the application's context.",
        "This is useful when application layers should not expose implementation-specific exceptions."
      ],
      code: {
        language: "java",
        code: `public void createOrder() {
    try {
        saveOrder();
    } catch (SQLException e) {
        throw new OrderProcessingException(
            "Unable to create order",
            e
        );
    }
}`
      },
      bullets: [
        "SQLException is a low-level database exception.",
        "OrderProcessingException represents the application-level problem.",
        "The original exception is preserved as the cause.",
        "Exception translation creates cleaner application boundaries."
      ]
    },

    {
      id: "exception-chaining",
      title: "14. Exception Chaining",
      paragraphs: [
        "Exception chaining means preserving the original exception as the cause of a new exception.",
        "This allows higher layers to provide meaningful messages while retaining the original technical failure for debugging."
      ],
      code: {
        language: "java",
        code: `try {
    readFile();
} catch (IOException e) {
    throw new RuntimeException(
        "Unable to load configuration",
        e
    );
}`
      },
      paragraphs: [
        "The second argument of the RuntimeException constructor is the original cause.",
        "The cause can later be inspected using getCause()."
      ],
      bullets: [
        "New exception → meaningful application context.",
        "Original exception → technical root cause.",
        "Together they provide better debugging information."
      ]
    },

    {
      id: "overriding-throws",
      title: "15. throws with Overridden Methods",
      paragraphs: [
        "When a subclass overrides a method, Java places restrictions on checked exceptions declared by the child method.",
        "The child method cannot introduce a broader checked exception than the parent method declares."
      ],
      code: {
        language: "java",
        code: `class Parent {
    public void process() throws IOException {
    }
}

class Child extends Parent {
    @Override
    public void process() throws FileNotFoundException {
    }
}`
      },
      bullets: [
        "FileNotFoundException is a subclass of IOException.",
        "Therefore, the child method can declare FileNotFoundException.",
        "The child can also declare no checked exception.",
        "The child cannot declare an unrelated broader checked exception such as Exception."
      ]
    },

    {
      id: "overriding-checked-rules",
      title: "16. Rules for Checked Exceptions During Overriding",
      paragraphs: [
        "The exception rules for method overriding are important in interviews because Java must preserve substitutability between parent and child references."
      ],
      code: {
        language: "java",
        code: `class Parent {
    public void process() throws IOException {
    }
}

class Child extends Parent {

    // Valid
    @Override
    public void process() throws FileNotFoundException {
    }

    // Also valid
    // public void process() {
    // }

    // Invalid
    // public void process() throws Exception {
    // }
}`
      },
      bullets: [
        "Same checked exception → allowed.",
        "Narrower checked exception → allowed.",
        "No checked exception → allowed.",
        "Broader checked exception → not allowed.",
        "Unrelated checked exception → not allowed.",
        "Unchecked exceptions can be declared by the child without these checked-exception restrictions."
      ]
    },

    {
      id: "file-service-example",
      title: "17. Practical Example: File Service",
      paragraphs: [
        "Consider a simple file service. The low-level method performs the file operation and declares IOException. The higher-level method decides how to handle the failure."
      ],
      code: {
        language: "java",
        code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

class FileService {

    public String readConfig() throws IOException {
        return Files.readString(Path.of("config.txt"));
    }
}

class Application {

    public void start() {
        FileService service = new FileService();

        try {
            String config = service.readConfig();
            System.out.println(config);
        } catch (IOException e) {
            System.out.println("Configuration could not be loaded");
        }
    }
}`
      },
      bullets: [
        "FileService does not decide how the application should respond.",
        "It declares IOException.",
        "Application handles the exception.",
        "This keeps responsibilities separated."
      ]
    },

    {
      id: "database-service-example",
      title: "18. Practical Example: Database and Service Layer",
      paragraphs: [
        "In a layered application, a lower layer may encounter a database exception while a higher layer decides how to present the failure."
      ],
      code: {
        language: "java",
        code: `class UserRepository {

    public void saveUser() throws SQLException {
        // Database operation
    }
}

class UserService {

    private UserRepository repository =
        new UserRepository();

    public void registerUser() throws SQLException {
        repository.saveUser();
    }
}

class UserController {

    private UserService service =
        new UserService();

    public void register() {
        try {
            service.registerUser();
        } catch (SQLException e) {
            System.out.println(
                "Unable to register user"
            );
        }
    }
}`
      },
      bullets: [
        "Repository declares the database exception.",
        "Service propagates it.",
        "Controller handles it.",
        "In Spring Boot, this idea maps naturally to repository, service, and controller layers."
      ]
    },

    {
      id: "common-mistakes",
      title: "19. Common Mistakes",
      paragraphs: [
        "Several mistakes commonly occur when using throws and exception propagation."
      ],
      bullets: [
        "Confusing throw with throws.",
        "Assuming throws handles an exception.",
        "Using throws without understanding caller responsibility.",
        "Catching an exception and silently ignoring it.",
        "Losing the original cause when translating an exception.",
        "Using catch(Exception) everywhere without considering specific exception types.",
        "Declaring unnecessary checked exceptions.",
        "Using checked exceptions for situations that are normally programming errors.",
        "Adding broader checked exceptions while overriding a parent method.",
        "Logging the same exception repeatedly at every layer."
      ],
      code: {
        language: "java",
        code: `// Bad: original cause is lost
catch (SQLException e) {
    throw new RuntimeException("Database error");
}

// Better: preserve the cause
catch (SQLException e) {
    throw new RuntimeException(
        "Database error",
        e
    );
}`
      }
    },

    {
      id: "key-points",
      title: "20. Key Points and Interview Questions",
      paragraphs: [
        "The throws keyword declares exceptions that a method may propagate. Exception propagation allows an exception to move up the call stack until an appropriate layer handles it."
      ],
      bullets: [
        "throws is used in the method declaration.",
        "throw is used to actually throw an exception.",
        "Checked exceptions must be caught or declared.",
        "Unchecked exceptions do not require catch-or-declare.",
        "A caller can handle a propagated exception.",
        "A caller can also propagate the exception further.",
        "Rethrowing preserves the existing exception.",
        "Exception translation converts a low-level exception into a higher-level exception.",
        "Exception chaining preserves the original cause.",
        "Overriding methods cannot declare broader checked exceptions than the parent method.",
        "A child method may declare the same or narrower checked exceptions, or no checked exception.",
        "Unchecked exceptions are not restricted by the checked-exception overriding rules."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the throws keyword?",
          answer:
            "throws declares that a method may propagate one or more exceptions to its caller. It is commonly used with checked exceptions."
        },
        {
          question: "Does throws throw an exception?",
          answer:
            "No. throws only declares possible exceptions in the method signature. The throw keyword is used to actually throw an exception."
        },
        {
          question: "What is the difference between throw and throws?",
          answer:
            "throw explicitly throws an exception object inside a method, while throws declares exception types that a method may propagate."
        },
        {
          question: "Can we use throws with multiple exceptions?",
          answer:
            "Yes. Multiple exception types can be declared using commas, such as throws IOException, SQLException."
        },
        {
          question: "What happens when a checked exception is not handled?",
          answer:
            "The method must declare it using throws, otherwise the compiler reports an error."
        },
        {
          question: "What is exception propagation?",
          answer:
            "Exception propagation is the process by which an unhandled exception moves from the current method to its caller and potentially further up the call stack."
        },
        {
          question: "Do unchecked exceptions need to be declared using throws?",
          answer:
            "No. RuntimeException subclasses do not require a throws declaration, although declaring them is legal."
        },
        {
          question: "Can a method declare RuntimeException using throws?",
          answer:
            "Yes. For example, public void process() throws RuntimeException is legal, but the compiler does not require callers to handle it."
        },
        {
          question: "Can a child method throw a broader checked exception than its parent?",
          answer:
            "No. An overriding method cannot declare a broader checked exception than the overridden method."
        },
        {
          question: "Can an overriding method throw a narrower checked exception?",
          answer:
            "Yes. For example, if the parent declares IOException, the child can declare FileNotFoundException because it is a subclass of IOException."
        },
        {
          question: "Can an overriding method remove the throws declaration?",
          answer:
            "Yes. A child method can choose not to declare a checked exception even when the parent method declares one."
        },
        {
          question: "What is rethrowing?",
          answer:
            "Rethrowing means catching an exception and throwing the same exception again so that a higher layer can handle it."
        },
        {
          question: "What is exception translation?",
          answer:
            "Exception translation converts a low-level technical exception into a higher-level application-specific exception."
        },
        {
          question: "What is exception chaining?",
          answer:
            "Exception chaining preserves the original exception as the cause of a new exception, usually by passing the original exception to the new exception's constructor."
        },
        {
          question: "Why should the original cause be preserved?",
          answer:
            "It provides the root technical failure during debugging while allowing the application to expose a more meaningful higher-level exception."
        },
        {
          question: "Where should an exception be handled?",
          answer:
            "It should generally be handled at the layer that has enough context to make a meaningful decision. Lower layers can propagate exceptions when they cannot handle them appropriately."
        },
        {
          question: "What happens if an exception reaches the JVM without being handled?",
          answer:
            "The JVM's default exception handler prints the exception information and stack trace, and the affected thread terminates."
        },
        {
          question: "Can throws be used with unchecked exceptions?",
          answer:
            "Yes. It is legal, but unchecked exceptions do not require a throws declaration."
        },
        {
          question: "Can a parent method declare no checked exception while a child declares one?",
          answer:
            "No. An overriding child method cannot introduce a new checked exception that the parent method does not declare."
        },
        {
          question: "Why is exception propagation useful in layered applications?",
          answer:
            "It allows low-level components to report failures without deciding how the entire application should respond. Higher layers can handle or translate the exception using broader application context."
        }
      ]
    }
  ]
};