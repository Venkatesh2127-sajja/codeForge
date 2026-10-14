export const customExceptions = {
  id: "custom-exceptions",
  slug: "custom-exception",
  title: "Custom Exceptions in Java",
  topicTitle: "Exception Handling",
  topicSlug: "exception-handling",
  description:
    "Learn how to create and use custom exceptions in Java, understand checked and unchecked custom exceptions, constructors, throw and throws, exception chaining, validation and business-rule examples, Spring Boot service-layer usage, common mistakes, and interview questions.",
  estimatedTime: "50 min",

  sections: [
    {
      id: "what-are-custom-exceptions",
      title: "1. What are Custom Exceptions?",
      paragraphs: [
        "A custom exception is an exception class created by the developer to represent an application-specific error condition.",
        "Java provides many built-in exceptions such as IllegalArgumentException, IOException, and NullPointerException. However, real applications often have business-specific failures that are easier to understand when represented by their own exception types.",
        "For example, a banking application may need exceptions such as InsufficientBalanceException, AccountNotFoundException, or InvalidTransactionException."
      ],
      code: {
        language: "java",
        code: `public class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(String message) {
        super(message);
    }
}`
      },
      bullets: [
        "Custom exceptions represent application-specific failures.",
        "They are created by extending Exception or RuntimeException.",
        "They can contain constructors and additional fields if required.",
        "They make application errors more meaningful and easier to handle."
      ]
    },

    {
      id: "why-custom-exceptions",
      title: "2. Why Do We Need Custom Exceptions?",
      paragraphs: [
        "Built-in exceptions describe general programming or system failures, but they may not clearly describe a business rule violation.",
        "A custom exception gives the error a meaningful name that represents the actual problem in the application."
      ],
      code: {
        language: "java",
        code: `// Generic exception
throw new RuntimeException("Insufficient balance");

// Better
throw new InsufficientBalanceException(
    "Insufficient balance for withdrawal"
);`
      },
      bullets: [
        "Improves readability.",
        "Makes business errors easier to identify.",
        "Allows different errors to be handled differently.",
        "Makes service-layer code easier to understand.",
        "Helps REST APIs return meaningful error responses."
      ]
    },

    {
      id: "custom-checked-exception",
      title: "3. Creating a Custom Checked Exception",
      paragraphs: [
        "A custom checked exception is created by extending Exception.",
        "Because Exception is checked, callers must catch the exception or declare it using throws."
      ],
      code: {
        language: "java",
        code: `public class InvalidAccountException
        extends Exception {

    public InvalidAccountException(String message) {
        super(message);
    }
}`
      },
      bullets: [
        "The exception extends Exception.",
        "It becomes a checked exception.",
        "The compiler requires catch-or-declare handling.",
        "It is useful when callers are expected to explicitly deal with the failure."
      ]
    },

    {
      id: "using-custom-checked",
      title: "4. Using a Custom Checked Exception",
      paragraphs: [
        "A checked custom exception can be thrown using throw and declared using throws."
      ],
      code: {
        language: "java",
        code: `public void openAccount(String accountNumber)
        throws InvalidAccountException {

    if (accountNumber == null || accountNumber.isBlank()) {
        throw new InvalidAccountException(
            "Account number is required"
        );
    }

    System.out.println("Account created");
}`
      },
      bullets: [
        "throw creates and throws the exception object.",
        "throws declares the checked exception.",
        "The caller must handle or propagate InvalidAccountException."
      ]
    },

    {
      id: "custom-unchecked-exception",
      title: "5. Creating a Custom Unchecked Exception",
      paragraphs: [
        "A custom unchecked exception is created by extending RuntimeException.",
        "The compiler does not require callers to catch or declare RuntimeException subclasses."
      ],
      code: {
        language: "java",
        code: `public class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(String message) {
        super(message);
    }
}`
      },
      bullets: [
        "Extends RuntimeException.",
        "It is unchecked.",
        "No catch-or-declare requirement exists.",
        "It is commonly used for business-rule violations in Spring Boot applications."
      ]
    },

    {
      id: "checked-vs-unchecked-custom",
      title: "6. Custom Checked vs Custom Unchecked Exceptions",
      paragraphs: [
        "The most important decision when creating a custom exception is whether it should be checked or unchecked."
      ],
      code: {
        language: "java",
        code: `// Checked
public class FileProcessingException
        extends Exception {

    public FileProcessingException(String message) {
        super(message);
    }
}

// Unchecked
public class InvalidOrderException
        extends RuntimeException {

    public InvalidOrderException(String message) {
        super(message);
    }
}`
      },
      bullets: [
        "Extend Exception → checked custom exception.",
        "Extend RuntimeException → unchecked custom exception.",
        "Checked exceptions require catch-or-declare.",
        "Unchecked exceptions do not require catch-or-declare.",
        "Spring Boot business-rule exceptions are commonly modeled as RuntimeException subclasses."
      ]
    },

    {
      id: "custom-exception-constructors",
      title: "7. Constructors in Custom Exceptions",
      paragraphs: [
        "A custom exception can provide different constructors depending on the information the application needs to store.",
        "A useful custom exception normally supports at least a message constructor and often a message-plus-cause constructor."
      ],
      code: {
        language: "java",
        code: `public class OrderProcessingException
        extends RuntimeException {

    public OrderProcessingException(String message) {
        super(message);
    }

    public OrderProcessingException(
            String message,
            Throwable cause) {
        super(message, cause);
    }
}`
      },
      bullets: [
        "super(message) passes the message to the parent exception.",
        "super(message, cause) preserves the original cause.",
        "Cause preservation is important for debugging.",
        "Additional constructors can be added when required."
      ]
    },

    {
      id: "custom-exception-fields",
      title: "8. Adding Additional Information to Custom Exceptions",
      paragraphs: [
        "A custom exception can contain additional fields when the application needs structured information about the failure.",
        "For example, a resource-not-found exception may store the resource type and identifier."
      ],
      code: {
        language: "java",
        code: `public class ResourceNotFoundException
        extends RuntimeException {

    private final String resource;
    private final Long resourceId;

    public ResourceNotFoundException(
            String resource,
            Long resourceId) {

        super(resource + " not found: " + resourceId);

        this.resource = resource;
        this.resourceId = resourceId;
    }

    public String getResource() {
        return resource;
    }

    public Long getResourceId() {
        return resourceId;
    }
}`
      },
      bullets: [
        "Custom exceptions can carry structured information.",
        "Keep exception fields relevant to the error.",
        "Do not turn an exception into a large data object unnecessarily."
      ]
    },

    {
      id: "validation-example",
      title: "9. Custom Exception for Validation",
      paragraphs: [
        "Custom exceptions are useful when validation rules have application-specific meaning."
      ],
      code: {
        language: "java",
        code: `public class InvalidAgeException
        extends RuntimeException {

    public InvalidAgeException(String message) {
        super(message);
    }
}

public void registerUser(int age) {

    if (age < 18) {
        throw new InvalidAgeException(
            "User must be at least 18 years old"
        );
    }

    System.out.println("User registered");
}`
      },
      bullets: [
        "The validation rule is explicit.",
        "The exception name describes the problem.",
        "The calling layer can handle InvalidAgeException specifically."
      ]
    },

    {
      id: "business-rule-example",
      title: "10. Custom Exception for Business Rules",
      paragraphs: [
        "Business rules are one of the most common reasons for creating custom exceptions.",
        "For example, a banking system can reject a withdrawal when the requested amount is greater than the available balance."
      ],
      code: {
        language: "java",
        code: `public class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(String message) {
        super(message);
    }
}

public void withdraw(double balance, double amount) {

    if (amount > balance) {
        throw new InsufficientBalanceException(
            "Insufficient balance"
        );
    }

    System.out.println("Withdrawal successful");
}`
      },
      bullets: [
        "The condition represents a business rule.",
        "The exception communicates the exact business failure.",
        "The service layer can propagate the exception to a higher layer."
      ]
    },

    {
      id: "throw-custom-exception",
      title: "11. Throwing a Custom Exception",
      paragraphs: [
        "A custom exception is thrown in exactly the same way as a standard exception: using the throw keyword."
      ],
      code: {
        language: "java",
        code: `public void placeOrder(int quantity) {

    if (quantity <= 0) {
        throw new InvalidOrderException(
            "Quantity must be greater than zero"
        );
    }

    System.out.println("Order placed");
}`
      },
      bullets: [
        "Create the exception object with new.",
        "Use throw to actually throw it.",
        "Execution stops at the throw statement.",
        "The exception can then propagate to the caller."
      ]
    },

    {
      id: "custom-exception-propagation",
      title: "12. Custom Exception Propagation",
      paragraphs: [
        "Custom unchecked exceptions can propagate through multiple methods without being declared.",
        "Custom checked exceptions must be handled or declared as they propagate."
      ],
      code: {
        language: "java",
        code: `public void repository() {
    throw new ResourceNotFoundException(
        "User not found"
    );
}

public void service() {
    repository();
}

public void controller() {
    try {
        service();
    } catch (ResourceNotFoundException e) {
        System.out.println(e.getMessage());
    }
}`
      },
      bullets: [
        "repository() creates the exception.",
        "service() allows it to propagate.",
        "controller() handles it.",
        "This is common in layered applications."
      ]
    },

    {
      id: "exception-chaining-custom",
      title: "13. Custom Exceptions with Exception Chaining",
      paragraphs: [
        "When converting a low-level exception into a custom application exception, preserve the original exception as the cause."
      ],
      code: {
        language: "java",
        code: `public class UserCreationException
        extends RuntimeException {

    public UserCreationException(
            String message,
            Throwable cause) {

        super(message, cause);
    }
}

try {
    saveUser();
} catch (SQLException e) {

    throw new UserCreationException(
        "Unable to create user",
        e
    );
}`
      },
      bullets: [
        "UserCreationException provides application-level meaning.",
        "SQLException remains available as the cause.",
        "getCause() can be used to inspect the original exception.",
        "This prevents loss of useful debugging information."
      ]
    },

    {
      id: "spring-service-layer",
      title: "14. Custom Exceptions in a Spring Boot Service Layer",
      paragraphs: [
        "In Spring Boot applications, custom exceptions are commonly created in the exception package and thrown from the service layer when a business condition cannot be satisfied.",
        "For example, a UserService can throw UserNotFoundException when a requested user does not exist."
      ],
      code: {
        language: "java",
        code: `public class UserNotFoundException
        extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(Long id) {

        return userRepository.findById(id)
            .orElseThrow(() ->
                new UserNotFoundException(
                    "User not found with id: " + id
                )
            );
    }
}`
      },
      bullets: [
        "The repository searches for the user.",
        "The service decides that a missing user is an application-level condition.",
        "UserNotFoundException clearly represents that condition.",
        "The exception can then be handled by a global exception handler."
      ]
    },

    {
      id: "spring-service-business-rule",
      title: "15. Spring Boot Service Layer Business Exception",
      paragraphs: [
        "Custom exceptions are especially useful in service methods because business rules normally belong in the service layer."
      ],
      code: {
        language: "java",
        code: `public class InsufficientBalanceException
        extends RuntimeException {

    public InsufficientBalanceException(String message) {
        super(message);
    }
}

@Service
public class AccountService {

    public void withdraw(
            double balance,
            double amount) {

        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Insufficient balance for withdrawal"
            );
        }

        // Perform withdrawal
    }
}`
      },
      bullets: [
        "The service validates the business rule.",
        "The custom exception describes the business failure.",
        "The controller does not need to contain the business rule.",
        "A global exception handler can convert the exception into an HTTP response."
      ]
    },

    {
      id: "spring-global-handler",
      title: "16. Handling Custom Exceptions with @RestControllerAdvice",
      paragraphs: [
        "Spring Boot provides @RestControllerAdvice for centralized exception handling.",
        "Instead of writing try-catch blocks in every controller method, a global handler can convert custom exceptions into consistent API responses."
      ],
      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(
            UserNotFoundException ex) {

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<String> handleInsufficientBalance(
            InsufficientBalanceException ex) {

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ex.getMessage());
    }
}`
      },
      bullets: [
        "@RestControllerAdvice provides centralized REST exception handling.",
        "@ExceptionHandler maps an exception type to a handler method.",
        "UserNotFoundException can become HTTP 404.",
        "InsufficientBalanceException can become HTTP 400.",
        "The exact API response format can later be standardized using an ErrorResponse DTO."
      ]
    },

    {
      id: "spring-flow",
      title: "17. Complete Spring Boot Exception Flow",
      paragraphs: [
        "A common Spring Boot exception flow starts in the repository, moves through the service layer, reaches the controller, and is finally converted into an HTTP response by the global exception handler."
      ],
      code: {
        language: "text",
        code: `Client
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   | User not found
   v
UserNotFoundException
   |
   v
@RestControllerAdvice
   |
   v
HTTP 404 Response`
      },
      bullets: [
        "Controller receives the request.",
        "Service contains business logic.",
        "Repository accesses the database.",
        "Service throws a meaningful custom exception.",
        "Exception propagates back through the call stack.",
        "Global exception handler converts it into an HTTP response."
      ]
    },

    {
      id: "custom-exception-hierarchy",
      title: "18. Designing a Custom Exception Hierarchy",
      paragraphs: [
        "Large applications may have several related business exceptions. A common approach is to create a base application exception and then create more specific exceptions beneath it."
      ],
      code: {
        language: "java",
        code: `public class ApplicationException
        extends RuntimeException {

    public ApplicationException(String message) {
        super(message);
    }
}

public class UserNotFoundException
        extends ApplicationException {

    public UserNotFoundException(String message) {
        super(message);
    }
}

public class OrderNotFoundException
        extends ApplicationException {

    public OrderNotFoundException(String message) {
        super(message);
    }
}`
      },
      bullets: [
        "ApplicationException provides a common application-level parent.",
        "Specific exceptions describe individual business failures.",
        "A handler can handle a specific exception.",
        "A broader handler can handle the common parent when appropriate."
      ]
    },

    {
      id: "when-to-use-custom",
      title: "19. When Should You Create a Custom Exception?",
      paragraphs: [
        "A custom exception should be created when the application needs to represent a meaningful condition that is not adequately described by an existing exception."
      ],
      bullets: [
        "A business rule fails.",
        "A domain resource cannot be found.",
        "An operation is not allowed in the current business state.",
        "A domain-specific validation rule fails.",
        "A low-level technical failure needs to be translated into an application-level failure.",
        "Different application failures need different handling or HTTP responses."
      ],
      paragraphs: [
        "Do not create a custom exception merely to give every small programming error a unique class. Use standard Java exceptions when they already communicate the problem clearly."
      ]
    },

    {
      id: "common-mistakes",
      title: "20. Common Mistakes",
      paragraphs: [
        "Custom exceptions are powerful, but poor exception design can make an application difficult to maintain."
      ],
      bullets: [
        "Creating custom exceptions for every small error.",
        "Using RuntimeException without a meaningful exception type.",
        "Using Exception directly for all application errors.",
        "Losing the original cause while translating exceptions.",
        "Putting business rules inside controllers instead of the service layer.",
        "Catching custom exceptions and silently ignoring them.",
        "Returning different error formats from different controllers.",
        "Putting too much unrelated data inside exception classes.",
        "Creating checked exceptions when callers have no meaningful recovery strategy.",
        "Using custom exceptions as normal control flow.",
        "Logging the same exception repeatedly at every application layer."
      ],
      code: {
        language: "java",
        code: `// Bad
catch (SQLException e) {
    throw new UserCreationException(
        "User creation failed"
    );
}

// Better
catch (SQLException e) {
    throw new UserCreationException(
        "User creation failed",
        e
    );
}`
      }
    },

    {
      id: "key-points-interview",
      title: "21. Key Points and Interview Questions",
      paragraphs: [
        "Custom exceptions allow Java applications to represent domain-specific and business-specific failures clearly. In Spring Boot, they are commonly thrown from the service layer and handled centrally using @RestControllerAdvice."
      ],
      bullets: [
        "Custom exceptions are developer-defined exception classes.",
        "Extend Exception to create a checked custom exception.",
        "Extend RuntimeException to create an unchecked custom exception.",
        "Use throw to actually throw a custom exception.",
        "Use throws to declare a checked exception.",
        "Custom exceptions can have multiple constructors.",
        "Preserve the original cause when translating exceptions.",
        "Business-rule exceptions commonly belong in the service layer.",
        "Spring Boot can handle custom exceptions using @ExceptionHandler.",
        "@RestControllerAdvice is useful for centralized REST exception handling.",
        "A custom exception hierarchy can group related application failures.",
        "Do not create custom exceptions unnecessarily."
      ],
      interviewQuestions: [
        {
          question: "What is a custom exception in Java?",
          answer:
            "A custom exception is a developer-defined exception class created to represent an application-specific or domain-specific failure."
        },
        {
          question: "How do you create a custom checked exception?",
          answer:
            "Create a class that extends Exception. Because Exception is checked, callers must catch or declare the custom exception."
        },
        {
          question: "How do you create a custom unchecked exception?",
          answer:
            "Create a class that extends RuntimeException. Callers are not required by the compiler to catch or declare it."
        },
        {
          question: "Why would you create a custom exception instead of using RuntimeException?",
          answer:
            "A specific custom exception communicates the exact meaning of the failure and allows the application to handle that type differently."
        },
        {
          question: "What is the difference between a checked and unchecked custom exception?",
          answer:
            "A checked custom exception extends Exception and requires catch-or-declare handling. An unchecked custom exception extends RuntimeException and does not have that compiler requirement."
        },
        {
          question: "Can a custom exception have constructors?",
          answer:
            "Yes. It can have constructors for messages, causes, and additional application-specific information."
        },
        {
          question: "Why do custom exceptions call super(message)?",
          answer:
            "super(message) passes the error message to the parent exception class so it can be returned by getMessage()."
        },
        {
          question: "What is exception chaining?",
          answer:
            "Exception chaining means preserving an original exception as the cause of a new exception."
        },
        {
          question: "Why should the original cause be preserved?",
          answer:
            "It allows developers to understand the root technical failure while still exposing a meaningful application-level exception."
        },
        {
          question: "Where should business exceptions generally be thrown in Spring Boot?",
          answer:
            "Business-rule exceptions are generally thrown from the service layer because the service layer owns business logic."
        },
        {
          question: "How does Spring Boot handle custom exceptions globally?",
          answer:
            "A class annotated with @RestControllerAdvice can contain @ExceptionHandler methods that convert exceptions into consistent HTTP responses."
        },
        {
          question: "What is @ExceptionHandler?",
          answer:
            "@ExceptionHandler tells Spring which method should handle a particular exception type."
        },
        {
          question: "What is @RestControllerAdvice?",
          answer:
            "@RestControllerAdvice provides centralized exception handling for REST controllers and combines controller advice with response-body behavior."
        },
        {
          question: "Can a custom exception extend another custom exception?",
          answer:
            "Yes. Custom exception classes can form an inheritance hierarchy just like other Java classes."
        },
        {
          question: "When should you use a checked custom exception?",
          answer:
            "A checked custom exception can be appropriate when the caller is expected to take explicit recovery or handling action."
        },
        {
          question: "When should you use an unchecked custom exception?",
          answer:
            "Unchecked custom exceptions are commonly used for programming errors, invalid application state, and business-rule violations where callers are not required to handle the condition explicitly."
        },
        {
          question: "Can a custom exception contain additional fields?",
          answer:
            "Yes. A custom exception can contain fields such as resource type, resource ID, error code, or other relevant structured information."
        },
        {
          question: "Should every application error have a custom exception?",
          answer:
            "No. Custom exceptions should be created when they provide meaningful domain information or enable useful handling. Existing Java exceptions should be reused when they already represent the condition clearly."
        },
        {
          question: "What happens if a custom unchecked exception is not caught?",
          answer:
            "It propagates up the call stack. If no handler catches it, the thread's default exception handling mechanism processes it."
        },
        {
          question: "What is the difference between exception handling and exception translation?",
          answer:
            "Exception handling deals with an exception at an appropriate layer, while exception translation converts one exception type, often a low-level exception, into another exception that better represents the application's context."
        }
      ]
    }
  ]
};