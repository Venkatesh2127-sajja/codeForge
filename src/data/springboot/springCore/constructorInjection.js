
export const constructorInjection = {
  id: "constructor-injection",
  title: "Constructor Injection",
  slug: "constructor-injection",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "40 min",

  description:
    "Master constructor-based dependency injection in Spring, including how Spring resolves dependencies, single and multiple constructors, final fields, testing, circular dependencies, best practices, common errors, and interview questions.",

  sections: [
    {
      id: "constructor-di",
      title: "1. What Is Constructor Injection?",

      paragraphs: [
        "Constructor injection is a dependency injection technique in which a class receives its required dependencies through its constructor. Instead of creating or searching for dependencies inside the class, the class declares what it needs and lets the caller or Spring provide those objects.",
        "In a Spring application, the IoC container creates and configures beans. When Spring needs to create a bean with constructor parameters, it resolves those parameters from the available beans and invokes the constructor with the resolved dependencies.",
        "For example, a UserService may need a UserRepository to save user information. With constructor injection, UserService declares UserRepository as a constructor parameter. Spring provides the repository when creating the service bean.",
        "Constructor injection is generally preferred for required dependencies because it makes dependencies explicit, supports immutable fields, simplifies unit testing, and helps prevent an object from being created without its required collaborators."
      ],

      bullets: [
        "Dependency: an object that another object needs to perform its work.",
        "Injection: supplying a dependency from outside the dependent class.",
        "Constructor injection: supplying dependencies through the constructor.",
        "Spring resolves dependencies using its application context and bean definitions.",
        "Constructor injection can be used with Spring-managed beans and with ordinary Java objects created manually."
      ]
    },

    {
      id: "why-dependency-injection",
      title: "2. Why Do We Need Dependency Injection?",

      paragraphs: [
        "Without dependency injection, a service might create its own repository using the new keyword. This tightly couples the service to a particular implementation and makes it harder to replace that implementation for testing or configuration.",
        "With dependency injection, the service receives the object it needs. Spring can manage the repository and provide the appropriate implementation, while tests can provide a mock or a simple fake.",
        "Dependency injection separates object construction from business logic. The service focuses on its responsibility rather than deciding how its dependencies are created."
      ],

      code: {
        language: "java",
        code: `// Tightly coupled approach
public class UserService {

    private final UserRepository userRepository =
            new UserRepository();

    public void createUser() {
        userRepository.save();
    }
}

// Constructor injection approach
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser() {
        userRepository.save();
    }
}`
      },

      bullets: [
        "The first example directly creates a concrete dependency.",
        "The second example accepts the dependency from the outside.",
        "The second example is easier to test with a mock or alternative implementation.",
        "The examples are illustrative; in a real Spring Data application, a repository may be an interface implemented by Spring Data infrastructure."
      ]
    },

    {
      id: "basic-example",
      title: "3. Basic Constructor Injection Example",

      paragraphs: [
        "Consider a UserService that needs a UserRepository. The service declares a constructor parameter of type UserRepository and assigns it to a private final field.",
        "When Spring creates the UserService bean, it looks for a suitable UserRepository bean and passes it to the constructor. The service can then use the repository to perform its work.",
        "In modern Spring applications, when a class has only one constructor, you do not need to annotate that constructor with @Autowired."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
class UserRepository {

    public void save() {
        System.out.println("User saved");
    }
}

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser() {
        userRepository.save();
    }
}`
      },

      bullets: [
        "UserRepository is registered as a component through @Repository.",
        "UserService is registered as a component through @Service.",
        "Spring injects UserRepository through the UserService constructor.",
        "The final field cannot be reassigned after the constructor finishes.",
        "In a real project, public top-level classes should normally be placed in separate Java source files."
      ]
    },

    {
      id: "how-spring-injects",
      title: "4. How Spring Performs Constructor Injection",

      paragraphs: [
        "Spring first needs bean definitions for the components involved. These definitions may come from component scanning, @Bean methods, Spring Data repository infrastructure, or other configuration mechanisms.",
        "When Spring creates a bean, it determines which constructor to use. For a class with one constructor, Spring can use that constructor without an explicit @Autowired annotation. It then resolves each constructor parameter from the application context.",
        "If a required dependency cannot be resolved, or multiple candidates exist without a clear selection, application context initialization may fail. Spring reports the underlying dependency-resolution problem rather than creating a correctly wired bean.",
        "Once the constructor completes successfully, the object has its required constructor dependencies. Spring then continues with the remaining bean lifecycle processing."
      ],

      code: {
        language: "text",
        code: `ApplicationContext starts
          |
          v
Discover or register bean definitions
          |
          v
Create UserRepository bean as required
          |
          v
Resolve UserService constructor parameters
          |
          v
Invoke UserService constructor
          |
          v
Continue bean lifecycle processing
          |
          v
UserService is ready for use`
      },

      bullets: [
        "Spring does not inject dependencies simply because a field has a matching name.",
        "Constructor parameters are resolved primarily using their types and applicable bean-selection rules.",
        "Use @Qualifier or @Primary when multiple beans match a dependency.",
        "A missing required dependency normally causes bean creation to fail."
      ]
    },

    {
      id: "final-fields",
      title: "5. Why Use final Fields?",

      paragraphs: [
        "A final field must be assigned during object construction and cannot later be reassigned. This makes constructor injection a natural fit for required dependencies.",
        "Using final fields communicates that the service expects the same dependency reference throughout its lifetime. It reduces accidental reassignment and makes the class easier to reason about.",
        "A final reference does not make the referenced object immutable. For example, a final repository field cannot point to a different repository, but the repository object can still perform database operations."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(
            PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public void processPayment() {
        paymentRepository.savePayment();
    }
}`
      },

      bullets: [
        "final prevents reassignment of the field reference.",
        "The constructor is responsible for initializing the required dependency.",
        "Required dependencies are visible in the class definition.",
        "The PaymentRepository type in this example must be defined and registered in the application."
      ]
    },

    {
      id: "single-constructor",
      title: "6. Do We Need @Autowired on a Constructor?",

      paragraphs: [
        "When a Spring-managed class declares exactly one constructor, Spring can use it for dependency injection without requiring @Autowired. This is the common approach for modern Spring applications.",
        "Adding @Autowired to the only constructor is usually unnecessary, although it is supported.",
        "When a class has multiple constructors, constructor selection needs more care. An explicitly annotated constructor can guide Spring's choice, or the class can be designed with a clear injection constructor."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    // @Autowired is not required for this single constructor.
    public ReportService(
            ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }
}`
      },

      bullets: [
        "One constructor: @Autowired is normally optional.",
        "Multiple constructors: make the intended injection constructor explicit.",
        "Constructor injection works for required dependencies.",
        "The ReportRepository type must be available to Spring."
      ]
    },

    {
      id: "multiple-dependencies",
      title: "7. Injecting Multiple Dependencies",

      paragraphs: [
        "A class can receive multiple dependencies through a single constructor. Spring resolves each constructor parameter and supplies the corresponding bean.",
        "However, a constructor with many dependencies can indicate that the class has too many responsibilities. If a service requires a large number of collaborators, review whether its responsibilities can be divided into cohesive components.",
        "Do not create artificial wrapper classes solely to reduce the constructor parameter count. Group dependencies only when the grouping represents a meaningful concept in the application."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final NotificationService notificationService;

    public OrderService(
            OrderRepository orderRepository,
            PaymentService paymentService,
            NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }

    public void placeOrder() {
        paymentService.processPayment();
        orderRepository.saveOrder();
        notificationService.sendConfirmation();
    }
}`
      },

      bullets: [
        "Each parameter represents a required dependency.",
        "All required dependencies are visible in one place.",
        "Spring resolves the dependencies when creating the OrderService bean.",
        "The example is simplified; a production order workflow needs appropriate transaction boundaries and payment-failure handling.",
        "Review classes with many dependencies for excessive responsibilities."
      ]
    },

    {
      id: "qualifier-primary",
      title: "8. Constructor Injection with @Qualifier and @Primary",

      paragraphs: [
        "Spring can encounter multiple beans that implement the same interface. If a constructor parameter requires that interface, Spring needs a way to select the correct candidate.",
        "@Qualifier identifies the intended bean using a qualifier value. @Primary marks a bean as the preferred candidate when no more specific selection is provided.",
        "These annotations do not replace constructor injection. They help Spring resolve a constructor dependency when more than one bean matches its type."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

interface MessageSender {
    void send(String message);
}

@Component("emailSender")
class EmailSender implements MessageSender {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

@Component("smsSender")
class SmsSender implements MessageSender {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

@Service
class AlertService {

    private final MessageSender messageSender;

    public AlertService(
            @Qualifier("emailSender")
            MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void alert() {
        messageSender.send("System alert");
    }
}`
      },

      bullets: [
        "Both implementations implement the same interface.",
        "@Qualifier(\"emailSender\") selects the emailSender bean.",
        "Without a suitable selection rule, multiple candidates can produce NoUniqueBeanDefinitionException.",
        "Use a meaningful qualifier rather than depending on incidental class names."
      ]
    },

    {
      id: "constructor-vs-field",
      title: "9. Constructor Injection vs. Field Injection",

      paragraphs: [
        "Field injection places @Autowired directly on a field. It can look concise, but the dependency is hidden in the class body and ordinary Java code cannot provide it through a constructor.",
        "Constructor injection exposes required dependencies in the constructor signature. This makes the class easier to instantiate in unit tests and allows required fields to be final.",
        "Spring supports field injection, but constructor injection is generally preferred for mandatory dependencies. Setter injection can be useful for optional or deliberately reconfigurable dependencies."
      ],

      code: {
        language: "java",
        code: `// Field injection
@Service
class UserServiceFieldInjection {

    @Autowired
    private UserRepository userRepository;
}

// Constructor injection
@Service
class UserServiceConstructorInjection {

    private final UserRepository userRepository;

    UserServiceConstructorInjection(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}`
      },

      bullets: [
        "Constructor injection: explicit dependencies and straightforward unit testing.",
        "Field injection: concise syntax but hidden construction requirements.",
        "Setter injection: useful when a dependency is intentionally optional or configurable after construction.",
        "Use one consistent injection approach for required dependencies rather than mixing styles without a reason."
      ]
    },

    {
      id: "unit-testing",
      title: "10. Constructor Injection and Unit Testing",

      paragraphs: [
        "One of the biggest advantages of constructor injection is that a class can be tested without starting the Spring application context.",
        "A unit test can create a mock repository, pass it to the service constructor, call a service method, and verify the repository interaction. This keeps the test fast and focused on the service's behavior.",
        "Mockito's mock method creates a test double for the dependency. The service itself is an ordinary Java object in this example, not a Spring-managed bean."
      ],

      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class UserServiceTest {

    @Test
    void createUserShouldSaveUser() {
        UserRepository repository =
                mock(UserRepository.class);

        UserService service =
                new UserService(repository);

        service.createUser();

        verify(repository).save();
    }
}`
      },

      bullets: [
        "This example assumes UserRepository has a save() method and UserService.createUser() calls it.",
        "The test does not need @SpringBootTest because it does not start Spring.",
        "For methods that return data, also assert the expected result.",
        "Use context-based tests when you need to verify Spring configuration or dependency wiring itself."
      ]
    },

    {
      id: "circular-dependencies",
      title: "11. Constructor Injection and Circular Dependencies",

      paragraphs: [
        "A circular dependency occurs when one bean requires another bean that eventually requires the first bean again. For example, OrderService depends on PaymentService while PaymentService depends on OrderService.",
        "Constructor injection makes this problem visible during bean creation because each object needs its dependencies before its constructor can complete. Spring typically reports a circular-reference error for such a constructor dependency cycle.",
        "The preferred solution is usually to redesign the responsibilities so that the dependency cycle disappears. A shared operation may belong in a third service, or one component may communicate through a suitable event or interface.",
        "Do not automatically introduce lazy injection or setters simply to hide a cycle. First decide whether the dependency graph reflects a design problem."
      ],

      code: {
        language: "text",
        code: `OrderService
      |
      v
PaymentService
      |
      v
OrderService

This forms a dependency cycle.
Review the design to remove the cycle.`
      },

      bullets: [
        "Constructor injection helps expose dependency cycles.",
        "A circular dependency can cause application context startup failure.",
        "Refactor responsibilities before introducing workarounds.",
        "Event-driven communication may help in appropriate cases, but it also introduces delivery and consistency considerations."
      ]
    },

    {
      id: "optional-dependencies",
      title: "12. Required vs. Optional Dependencies",

      paragraphs: [
        "Constructor injection is most suitable for required dependencies. If a service cannot function without a repository, requiring that repository in the constructor makes the contract explicit.",
        "If a dependency is genuinely optional, use a deliberate optional-dependency design. Depending on the use case, this might involve Optional, ObjectProvider, or a separate strategy implementation.",
        "Do not make an essential dependency optional merely to allow application startup to succeed. A missing required service should generally be detected early."
      ],

      code: {
        language: "java",
        code: `import java.util.Optional;

public class GreetingService {

    private final GreetingFormatter formatter;

    public GreetingService(
            Optional<GreetingFormatter> formatter) {
        this.formatter = formatter.orElse(null);
    }

    public String greet(String name) {
        if (formatter == null) {
            return "Hello, " + name;
        }

        return formatter.format(name);
    }
}`
      },

      bullets: [
        "This is an illustrative plain Java example of an optional dependency.",
        "For Spring-specific optional injection, ensure the chosen mechanism behaves as intended for your Spring version and configuration.",
        "Avoid storing null when a clearer design is available, such as a default implementation or an explicit optional value.",
        "Use optional dependencies only when the application can meaningfully operate without them."
      ]
    },

    {
      id: "common-mistakes",
      title: "13. Common Constructor Injection Mistakes",

      paragraphs: [
        "Constructor injection is straightforward, but common problems include missing beans, multiple matching beans, incorrectly assigned fields, and constructors that require too many collaborators.",
        "A constructor parameter does not automatically become a Spring bean. The dependency must be registered or provided through an applicable Spring mechanism.",
        "Another mistake is declaring a constructor but forgetting to assign a dependency to its field. Spring can successfully invoke the constructor while the class still behaves incorrectly if the assignment is missing."
      ],

      bullets: [
        "No qualifying bean: check whether the dependency is registered and included in scanning.",
        "Multiple matching beans: use @Qualifier or @Primary when appropriate.",
        "Uninitialized final field: ensure the constructor assigns every required final field.",
        "Too many constructor parameters: review whether the class has too many responsibilities.",
        "Circular dependency: redesign the dependency graph where possible.",
        "Manual instantiation in tests: provide all constructor arguments.",
        "Using new for a Spring-managed dependency: consider injecting the managed bean instead."
      ]
    },

    {
      id: "best-practices",
      title: "14. Constructor Injection Best Practices",

      paragraphs: [
        "Prefer constructor injection for required dependencies and declare those fields final whenever possible. This makes object construction predictable and documents the dependencies a class needs.",
        "Keep constructors focused on assigning dependencies. Put business operations in methods rather than performing complicated workflows during construction.",
        "Use interfaces where they provide a meaningful abstraction, particularly when multiple implementations or test doubles are useful. Do not introduce interfaces mechanically for every class.",
        "Keep the dependency graph understandable. A class with a very large constructor is a useful signal to review its responsibilities, although the number of parameters alone does not prove the design is wrong."
      ],

      bullets: [
        "Use constructor injection for mandatory dependencies.",
        "Prefer private final fields for required collaborators.",
        "Avoid field injection in ordinary application services.",
        "Use @Qualifier or @Primary for ambiguous candidates.",
        "Keep constructors free of business workflows and external side effects.",
        "Unit-test services by passing mocks or fakes directly.",
        "Refactor circular dependencies instead of masking them."
      ]
    },

    {
      id: "interview",
      title: "15. Constructor Injection Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is constructor injection?",
          answer:
            "Constructor injection is a dependency injection technique in which a class receives its dependencies through constructor parameters."
        },
        {
          question: "2. Why is constructor injection preferred in Spring?",
          answer:
            "It makes required dependencies explicit, supports final fields, improves testability, and helps ensure that an object is constructed with its required dependencies."
        },
        {
          question: "3. How does Spring perform constructor injection?",
          answer:
            "Spring resolves constructor parameters from available bean definitions and invokes the selected constructor with the resolved dependencies when creating the bean."
        },
        {
          question: "4. Is @Autowired required on a single constructor?",
          answer:
            "No. In modern Spring applications, Spring can use a class's single constructor for dependency injection without @Autowired."
        },
        {
          question: "5. Why are dependencies commonly declared final?",
          answer:
            "A final field cannot be reassigned after initialization, making the dependency reference stable and communicating that it is required by the object."
        },
        {
          question: "6. Can we inject multiple dependencies through a constructor?",
          answer:
            "Yes. A constructor can declare multiple dependencies. However, an excessive number of dependencies may indicate that the class has too many responsibilities."
        },
        {
          question: "7. What is the difference between constructor and field injection?",
          answer:
            "Constructor injection makes dependencies explicit and supports final fields and direct unit testing. Field injection hides dependencies inside the class and makes direct construction less convenient."
        },
        {
          question: "8. How does constructor injection improve unit testing?",
          answer:
            "Tests can instantiate the class directly and pass mocks or fake implementations without starting the Spring application context."
        },
        {
          question: "9. Can constructor injection cause circular dependencies?",
          answer:
            "Yes. If beans require each other through their constructors, Spring generally cannot complete their creation and reports a circular dependency problem."
        },
        {
          question: "10. How can we resolve a circular dependency?",
          answer:
            "Prefer redesigning the dependency graph by separating responsibilities, introducing an appropriate shared service, or using another suitable communication pattern."
        },
        {
          question: "11. What happens if a constructor dependency is missing?",
          answer:
            "Spring generally fails to create the bean and reports a dependency-resolution error because it cannot supply the required constructor argument."
        },
        {
          question: "12. What happens if multiple beans match one constructor parameter?",
          answer:
            "Spring may report NoUniqueBeanDefinitionException. Use @Qualifier to select a specific bean or @Primary to identify the preferred candidate."
        },
        {
          question: "13. What is the purpose of @Qualifier?",
          answer:
            "@Qualifier helps Spring choose a specific bean when multiple candidates match a dependency type."
        },
        {
          question: "14. What is the purpose of @Primary?",
          answer:
            "@Primary marks a bean as the preferred candidate when Spring resolves an otherwise ambiguous dependency."
        },
        {
          question: "15. Can a class be created without Spring if it uses constructor injection?",
          answer:
            "Yes. Constructor injection is a Java object-construction technique. The caller can instantiate the class directly and provide its dependencies."
        },
        {
          question: "16. Is constructor injection the same as dependency injection?",
          answer:
            "Constructor injection is one form of dependency injection. Setter injection and field injection are other approaches, although constructor injection is generally preferred for required dependencies."
        },
        {
          question: "17. Does constructor injection create the dependency bean automatically?",
          answer:
            "Not by itself. Spring must be able to resolve the dependency from a registered bean or another supported dependency-resolution mechanism."
        },
        {
          question: "18. What is the main design warning when a constructor has many parameters?",
          answer:
            "It may indicate that the class has too many responsibilities or depends on too many collaborators. Review the design and split responsibilities where appropriate."
        },
        {
          question: "19. When is setter injection useful?",
          answer:
            "Setter injection can be useful for dependencies that are genuinely optional or intentionally configurable after object construction."
        },
        {
          question: "20. Does a final dependency object become immutable?",
          answer:
            "No. A final field prevents reassignment of the reference, but it does not make the referenced object itself immutable."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "16. Quick Revision Notes",

      paragraphs: [
        "Constructor injection supplies required dependencies through a class constructor. Spring resolves those dependencies from its application context when it creates a managed bean."
      ],

      bullets: [
        "Constructor injection — dependencies are passed through constructor parameters.",
        "Required dependencies — declare them explicitly in the constructor.",
        "final fields — prevent reassignment of dependency references.",
        "Single constructor — @Autowired is normally unnecessary.",
        "Multiple candidates — use @Qualifier or @Primary when appropriate.",
        "Testing — instantiate the class directly with mocks or fakes.",
        "Circular dependency — review and redesign the dependency graph.",
        "Missing bean — check registration, scanning, and configuration.",
        "Large constructor — consider whether the class has too many responsibilities.",
        "Best practice — prefer constructor injection for required dependencies."
      ]
    }
  ]
};
