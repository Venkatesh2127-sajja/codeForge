
export const dependencyInjection = {
  id: "dependency-injection",
  title: "Dependency Injection",
  slug: "dependency-injection",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "45 min",

  description:
    "Master Dependency Injection in Spring, including IoC, constructor/setter/field injection, bean resolution, @Autowired, @Qualifier, @Primary, testing, circular dependencies, best practices, and interview questions.",

  sections: [
    {
      id: "what-is-di",
      title: "1. What Is Dependency Injection?",

      paragraphs: [
        "Dependency Injection (DI) is a design technique in which an object receives the objects it depends on from an external source instead of creating those objects itself.",
        "A dependency is another object that a class needs to perform its work. For example, an OrderService may depend on a PaymentService to process payments. Rather than creating PaymentService inside OrderService, the service receives it through dependency injection.",
        "Spring provides an IoC container that creates and manages configured beans and supplies their dependencies. This separates object construction from application business logic.",
        "Dependency Injection reduces tight coupling, improves testability, and makes it easier to replace one implementation with another when the design supports that replacement."
      ],

      bullets: [
        "Dependency: an object required by another object.",
        "Injection: supplying the required object from outside the dependent class.",
        "IoC container: the Spring container that manages configured beans and their relationships.",
        "DI: a technique Spring uses to supply dependencies.",
        "DI is useful in unit testing because dependencies can be replaced with mocks or fake implementations."
      ]
    },

    {
      id: "problem-without-di",
      title: "2. Why Do We Need Dependency Injection?",

      paragraphs: [
        "Without DI, a class may create its own dependencies using the new keyword. This couples the class to a specific implementation and makes it responsible for constructing that dependency.",
        "If the implementation changes, the dependent class may also need to change. Testing can become harder because the class creates a real dependency instead of allowing a test to supply a mock.",
        "With DI, the class declares what it needs and receives the dependency from the outside. Spring can supply the appropriate bean in the application, while a unit test can provide a mock."
      ],

      code: {
        language: "java",
        code: `// Tightly coupled design
class OrderService {

    private final PaymentService paymentService =
            new PaymentService();

    public void placeOrder() {
        paymentService.processPayment();
    }
}

// Dependency injection design
class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "The first example directly creates a concrete dependency.",
        "The second example receives the dependency from its caller.",
        "DI makes replacing a dependency easier when the design permits different implementations.",
        "In a Spring application, the container can create and inject the configured PaymentService bean."
      ]
    },

    {
      id: "ioc-vs-di",
      title: "3. IoC vs. Dependency Injection",

      paragraphs: [
        "Inversion of Control (IoC) is the broader principle of transferring control of object creation or other responsibilities from application code to a framework or container.",
        "Dependency Injection is one way to implement IoC. Instead of a class controlling the creation of its dependencies, an external mechanism supplies them.",
        "In Spring, the IoC container manages configured beans, while DI connects those beans according to their dependencies and configuration."
      ],

      code: {
        language: "text",
        code: `Without DI:
OrderService creates PaymentService
          |
          v
OrderService controls dependency creation

With Spring DI:
Spring container creates/resolves beans
          |
          v
Spring supplies PaymentService
          |
          v
OrderService uses its dependency`
      },

      bullets: [
        "IoC is the broader principle.",
        "DI is a technique for supplying dependencies.",
        "Spring's ApplicationContext is a commonly used IoC container.",
        "IoC and DI are related concepts, but they are not identical terms."
      ]
    },

    {
      id: "spring-di-flow",
      title: "4. How Dependency Injection Works in Spring",

      paragraphs: [
        "Spring first needs to know which objects should be managed as beans. These objects can be registered through component scanning, @Bean methods, Spring Data infrastructure, or other supported mechanisms.",
        "When Spring creates a bean, it examines its injection requirements and resolves the dependencies from the available bean definitions. For constructor injection, Spring supplies the resolved dependencies as constructor arguments.",
        "If a required dependency cannot be found, or multiple beans match without a clear selection rule, bean creation may fail during application context initialization.",
        "Once the dependencies are resolved, Spring constructs and configures the object and continues its bean lifecycle processing."
      ],

      code: {
        language: "text",
        code: `1. Spring application context starts
              |
              v
2. Bean definitions are registered
              |
              v
3. Spring resolves required dependencies
              |
              v
4. Spring creates and wires beans
              |
              v
5. Application components use injected beans`
      },

      bullets: [
        "Dependency registration must be configured correctly.",
        "Spring resolves dependencies according to their types and applicable selection rules.",
        "The application context manages configured beans and their relationships.",
        "Dependency Injection does not mean that every Java object is automatically managed by Spring."
      ]
    },

    {
      id: "constructor-injection",
      title: "5. Constructor Injection",

      paragraphs: [
        "Constructor injection provides dependencies through a class constructor. It is generally preferred for required dependencies because the class declares what it needs to be created successfully.",
        "The constructor assigns each dependency to a field. Declaring required dependency fields as final prevents their references from being reassigned after construction.",
        "In modern Spring applications, if a class has one constructor, @Autowired is normally unnecessary on that constructor."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "Required dependencies are explicit.",
        "Fields can be final.",
        "The object receives required dependencies during construction.",
        "Unit tests can instantiate the class directly.",
        "A missing required dependency normally causes Spring bean creation to fail."
      ]
    },

    {
      id: "setter-injection",
      title: "6. Setter Injection",

      paragraphs: [
        "Setter injection supplies a dependency through a setter method after the object has been instantiated. Spring invokes the configured setter and supplies the dependency.",
        "Setter injection can be useful when a dependency is genuinely optional or intentionally configurable after construction.",
        "For mandatory dependencies, setter injection allows an object to exist before the dependency is supplied. Constructor injection is usually a better fit when the object cannot function without the dependency."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(
            PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        if (paymentService == null) {
            throw new IllegalStateException(
                "PaymentService has not been configured"
            );
        }

        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "Dependencies are supplied through setter methods.",
        "The dependency is not necessarily available immediately after the object is instantiated.",
        "Setter injection can suit optional or reconfigurable dependencies.",
        "Required dependencies are generally better expressed through constructor injection."
      ]
    },

    {
      id: "field-injection",
      title: "7. Field Injection",

      paragraphs: [
        "Field injection places @Autowired directly on a field. Spring injects the dependency into that field through its bean-processing infrastructure.",
        "Field injection is supported, but the dependency is not visible in the constructor. The class is also harder to instantiate with all required dependencies using ordinary Java code.",
        "Field injection usually prevents the injected field from being final. For these reasons, constructor injection is generally preferred for required dependencies."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private PaymentService paymentService;

    public void placeOrder() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "Field injection can be concise.",
        "Dependencies are less explicit to readers of the constructor.",
        "Direct unit testing is less convenient because the dependency must be supplied another way.",
        "Prefer constructor injection for required dependencies in ordinary application services."
      ]
    },

    {
      id: "compare-injection-types",
      title: "8. Constructor vs. Setter vs. Field Injection",

      paragraphs: [
        "Spring supports several dependency injection styles. The right choice depends on whether a dependency is mandatory, optional, or deliberately configurable after construction.",
        "Constructor injection is generally preferred for mandatory dependencies. Setter injection can suit optional dependencies. Field injection is supported but is usually less convenient for direct unit testing and explicit object construction."
      ],

      code: {
        language: "text",
        code: `Constructor Injection
    Dependency supplied through constructor
    Best default for required dependencies

Setter Injection
    Dependency supplied through setter method
    Useful for optional/configurable dependencies

Field Injection
    Dependency injected into a field
    Supported, but usually less test-friendly`
      },

      bullets: [
        "Constructor: explicit dependencies, final fields, straightforward unit testing.",
        "Setter: useful for optional or reconfigurable dependencies.",
        "Field: concise syntax but less explicit construction requirements.",
        "Avoid mixing injection styles without a clear reason."
      ]
    },

    {
      id: "autowired",
      title: "9. Understanding @Autowired",

      paragraphs: [
        "@Autowired tells Spring to resolve and inject a suitable dependency at a supported injection point, such as a constructor, setter method, or field.",
        "A single constructor does not normally require @Autowired. It is more relevant when you have multiple constructors and want to identify the injection constructor, or when using field or setter injection.",
        "@Autowired does not create an arbitrary missing bean. Spring must be able to resolve the dependency through the configured application context and supported resolution rules."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Autowired
    public InvoiceService(
            InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
}`
      },

      bullets: [
        "@Autowired supports constructor, field, and method injection.",
        "It is usually unnecessary on a single constructor.",
        "Spring must be able to resolve the requested dependency.",
        "Use @Qualifier when multiple beans of the required type need explicit selection."
      ]
    },

    {
      id: "multiple-implementations",
      title: "10. Dependency Injection with Multiple Implementations",

      paragraphs: [
        "Suppose an application has EmailPaymentService and CardPaymentService, both implementing PaymentService. If a constructor requests only PaymentService, Spring may find multiple matching beans.",
        "When Spring cannot determine the intended bean, it can report NoUniqueBeanDefinitionException. Use @Qualifier to select a specific bean or @Primary to mark a preferred candidate.",
        "The correct choice should reflect the application's design rather than simply suppressing an error."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

interface PaymentService {
    void processPayment();
}

@Component("cardPaymentService")
class CardPaymentService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing card payment");
    }
}

@Component("walletPaymentService")
class WalletPaymentService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing wallet payment");
    }
}

@Service
class CheckoutService {

    private final PaymentService paymentService;

    CheckoutService(
            @Qualifier("cardPaymentService")
            PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void checkout() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "Both implementations implement the same interface.",
        "@Qualifier selects cardPaymentService for CheckoutService.",
        "@Primary can mark a preferred bean when that behavior is appropriate.",
        "For payment selection based on each order, an explicit strategy or factory design may be more suitable than one fixed qualifier."
      ]
    },

    {
      id: "di-and-testing",
      title: "11. Dependency Injection and Unit Testing",

      paragraphs: [
        "Dependency Injection helps isolate a class from the implementation details of its dependencies. During a unit test, a real repository or external-service client can be replaced with a mock or fake.",
        "With constructor injection, the test can create the class directly and supply the test dependency. This avoids starting the entire Spring application context when the test only needs to verify business logic.",
        "A unit test should verify observable behavior, such as a repository being called with the expected data or a service returning the correct result."
      ],

      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class OrderServiceTest {

    @Test
    void placeOrderShouldProcessPayment() {
        PaymentService paymentService =
                mock(PaymentService.class);

        OrderService orderService =
                new OrderService(paymentService);

        orderService.placeOrder();

        verify(paymentService).processPayment();
    }
}`
      },

      bullets: [
        "This example assumes PaymentService is an interface or mockable type with processPayment().",
        "The test creates OrderService directly instead of using Spring.",
        "Mockito supplies the mock dependency.",
        "Use integration or context tests separately when you need to verify Spring bean wiring."
      ]
    },

    {
      id: "circular-dependency",
      title: "12. Circular Dependencies",

      paragraphs: [
        "A circular dependency occurs when two or more components depend on one another in a cycle. For example, OrderService depends on PaymentService, while PaymentService also depends on OrderService.",
        "With constructor injection, Spring generally cannot complete bean creation for a constructor dependency cycle and reports an error during application context initialization.",
        "The preferred solution is to review the design. Move shared responsibilities to a third service, reverse an unnecessary dependency, or use a suitable event-driven design where that fits the business requirements.",
        "Avoid adding lazy injection or setter injection as the first response. These approaches can change resolution timing but do not automatically fix an underlying design problem."
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

This dependency cycle should be reviewed
and removed where possible.`
      },

      bullets: [
        "Constructor cycles commonly cause startup failures.",
        "A dependency graph should be understandable and intentional.",
        "Refactor responsibilities before using a workaround.",
        "Events can decouple components, but delivery, transaction, and failure behavior must still be designed."
      ]
    },

    {
      id: "common-errors",
      title: "13. Common Dependency Injection Errors",

      paragraphs: [
        "Dependency injection failures commonly arise when a required bean is missing, multiple candidates match a dependency, a circular dependency exists, or a component is outside the configured scan packages.",
        "The exception message and nested cause usually help identify which dependency Spring could not resolve. Start by checking the constructor parameter type and whether the intended bean is registered.",
        "If the bean is present, inspect package scanning, active profiles, conditional configuration, qualifiers, and bean definitions."
      ],

      bullets: [
        "NoSuchBeanDefinitionException: no matching bean definition was found for the requested dependency.",
        "NoUniqueBeanDefinitionException: multiple candidates match and Spring cannot choose unambiguously.",
        "UnsatisfiedDependencyException: Spring could not satisfy a bean's dependency; inspect the nested cause.",
        "Circular dependency error: review the dependency graph and constructor relationships.",
        "Null dependency in manually created objects: verify that the caller supplied the dependency.",
        "Missing bean due to package boundaries: check component scanning and registration configuration."
      ]
    },

    {
      id: "best-practices",
      title: "14. Dependency Injection Best Practices",

      paragraphs: [
        "Prefer constructor injection for required dependencies. This makes a class's requirements explicit and helps ensure that the object cannot be constructed without the collaborators it needs.",
        "Use interfaces when they represent meaningful contracts, such as a payment provider with multiple implementations. Do not create unnecessary interfaces solely to follow a pattern mechanically.",
        "Keep each class focused on a clear responsibility. If a constructor requires many unrelated services, consider whether the class is coordinating too much behavior.",
        "Use Spring for application-level object management and ordinary Java construction in focused unit tests. Choose the simplest testing approach that validates the behavior you care about."
      ],

      bullets: [
        "Use constructor injection for required dependencies.",
        "Declare required dependency references final where possible.",
        "Use setter injection only when optional or reconfigurable dependencies justify it.",
        "Avoid field injection as the default for application services.",
        "Use @Qualifier or @Primary to resolve ambiguous candidates.",
        "Refactor circular dependencies instead of masking them.",
        "Use mocks or fakes for isolated unit tests.",
        "Keep the dependency graph clear and avoid unnecessary coupling."
      ]
    },

    {
      id: "interview",
      title: "15. Dependency Injection Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is Dependency Injection?",
          answer:
            "Dependency Injection is a technique in which an object receives its dependencies from an external source instead of creating those dependencies itself."
        },
        {
          question: "2. What is the relationship between IoC and DI?",
          answer:
            "IoC is the broader principle of transferring control to a framework or container. DI is one technique for implementing IoC by supplying an object's dependencies externally."
        },
        {
          question: "3. What are the common types of dependency injection in Spring?",
          answer:
            "The commonly discussed types are constructor injection, setter injection, and field injection."
        },
        {
          question: "4. Which injection type is generally preferred?",
          answer:
            "Constructor injection is generally preferred for required dependencies because it makes them explicit, supports final fields, and improves testability."
        },
        {
          question: "5. What is constructor injection?",
          answer:
            "Constructor injection supplies dependencies through constructor parameters when an object is created."
        },
        {
          question: "6. What is setter injection?",
          answer:
            "Setter injection supplies dependencies through setter methods after object construction. It can be useful for optional or configurable dependencies."
        },
        {
          question: "7. What is field injection?",
          answer:
            "Field injection uses an annotation such as @Autowired on a field so Spring can inject a dependency into that field."
        },
        {
          question: "8. What does @Autowired do?",
          answer:
            "@Autowired asks Spring to resolve and inject a suitable dependency at a supported injection point."
        },
        {
          question: "9. Is @Autowired required on a single constructor?",
          answer:
            "No. Modern Spring can use the only constructor of a class for dependency injection without @Autowired."
        },
        {
          question: "10. Why are final fields useful with constructor injection?",
          answer:
            "A final field cannot be reassigned after initialization, making the required dependency reference stable and explicit."
        },
        {
          question: "11. How does Spring find a dependency?",
          answer:
            "Spring resolves dependencies from its available bean definitions and configuration, using the required type and applicable candidate-selection rules."
        },
        {
          question: "12. What happens if a required bean is missing?",
          answer:
            "Spring generally fails to create the dependent bean and reports a dependency-resolution error."
        },
        {
          question: "13. What is NoUniqueBeanDefinitionException?",
          answer:
            "It indicates that multiple beans match a requested type and Spring cannot determine a unique candidate."
        },
        {
          question: "14. How do @Qualifier and @Primary help?",
          answer:
            "@Qualifier identifies a specific bean for an injection point. @Primary marks a preferred candidate when Spring resolves an otherwise ambiguous dependency."
        },
        {
          question: "15. Why is constructor injection easier to test?",
          answer:
            "A unit test can instantiate the class directly and pass mock or fake dependencies without starting the Spring container."
        },
        {
          question: "16. Can dependency injection be used without Spring?",
          answer:
            "Yes. Dependency Injection is a design technique, not a Spring-only feature. Ordinary Java code can pass dependencies through constructors or setters."
        },
        {
          question: "17. What is a circular dependency?",
          answer:
            "It is a dependency cycle in which one component indirectly or directly depends on itself through other components."
        },
        {
          question: "18. How can a circular dependency be resolved?",
          answer:
            "Review the design, separate responsibilities, remove unnecessary dependencies, or use a suitable communication pattern where appropriate."
        },
        {
          question: "19. When is setter injection appropriate?",
          answer:
            "It can be appropriate when a dependency is genuinely optional or deliberately configurable after object construction."
        },
        {
          question: "20. What is the difference between creating a dependency and injecting it?",
          answer:
            "Creating a dependency constructs the object. Injecting a dependency supplies an already resolved object to the class that needs it. Spring can manage both creation and injection for configured beans."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "16. Quick Revision Notes",

      paragraphs: [
        "Dependency Injection separates object construction from the code that uses an object. Spring resolves dependencies and supplies them to configured beans through constructor, setter, or field injection."
      ],

      bullets: [
        "DI — supplies dependencies from outside the dependent object.",
        "IoC — broader principle of transferring control to a framework or container.",
        "Constructor injection — preferred for required dependencies.",
        "Setter injection — useful for optional or configurable dependencies.",
        "Field injection — supported but generally less convenient for direct unit testing.",
        "@Autowired — requests dependency resolution at a supported injection point.",
        "@Qualifier — selects a specific matching bean.",
        "@Primary — marks a preferred bean candidate.",
        "Unit testing — provide mocks or fakes directly.",
        "Circular dependency — review and simplify the dependency graph.",
        "Missing bean — inspect component scanning and bean registration.",
        "Best practice — keep dependencies explicit and classes focused."
      ]
    }
  ]
};
