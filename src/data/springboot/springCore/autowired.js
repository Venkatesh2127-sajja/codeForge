
export const autowired = {
  id: "autowired",
  title: "@Autowired",
  slug: "autowired",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "45 min",

  description:
    "Understand how @Autowired works, how Spring resolves dependencies, and how to use constructor injection, @Qualifier, @Primary, and optional dependencies in real Spring Boot applications.",

  sections: [
    {
      id: "what-is-autowired",
      title: "1. What is @Autowired?",

      paragraphs: [
        "@Autowired is a Spring annotation used for dependency injection. It tells Spring to find a suitable bean in the ApplicationContext and provide it to a constructor, field, or setter.",
        "Dependency injection means a class receives the objects it needs from Spring instead of creating those objects itself with the new keyword. This reduces tight coupling and makes applications easier to test and maintain.",
        "For example, an OrderService may depend on a PaymentService. Rather than creating PaymentService inside OrderService, Spring creates or obtains the appropriate bean and injects it.",
        "@Autowired is provided by Spring, not by the Java language. It is commonly used with classes registered through annotations such as @Component, @Service, and @Repository."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public void processPayment() {
        System.out.println("Payment processed");
    }
}

@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
        System.out.println("Order placed");
    }
}`
      },

      bullets: [
        "PaymentService is registered as a Spring bean through @Service.",
        "OrderService declares that it depends on PaymentService.",
        "Spring resolves PaymentService and supplies it to the OrderService constructor.",
        "The final field ensures the dependency cannot be reassigned after construction."
      ]
    },

    {
      id: "how-autowired-works",
      title: "2. How Does @Autowired Work Internally?",

      paragraphs: [
        "Spring first discovers bean definitions through component scanning, configuration classes, or explicit bean registration. It then creates and manages the corresponding objects in the ApplicationContext.",
        "When Spring creates a bean, it examines its injection points and resolves the dependencies required by its constructor, fields, or methods. For annotation-based injection, Spring uses bean factory infrastructure, including AutowiredAnnotationBeanPostProcessor.",
        "Spring primarily resolves a dependency by its type. If exactly one suitable bean exists, Spring can inject it. If multiple beans match, Spring applies additional resolution rules, such as @Qualifier, @Primary, and other candidate-selection rules.",
        "If Spring cannot find a required dependency or cannot choose between matching candidates, application startup may fail with an exception such as NoSuchBeanDefinitionException or NoUniqueBeanDefinitionException."
      ],

      bullets: [
        "Step 1: Spring discovers bean definitions.",
        "Step 2: Spring selects a constructor and resolves its required parameters.",
        "Step 3: Spring creates the bean and supplies the dependencies.",
        "Step 4: Spring completes the relevant bean initialization lifecycle.",
        "Step 5: The initialized bean becomes available for use by other beans."
      ]
    },

    {
      id: "constructor-injection",
      title: "3. @Autowired with Constructor Injection",

      paragraphs: [
        "Constructor injection supplies dependencies through a class constructor. It is generally the recommended approach for mandatory dependencies because the object cannot be constructed without receiving them.",
        "Since Spring Framework 4.3, a class with only one constructor does not need @Autowired on that constructor. Spring automatically uses the single constructor for dependency injection.",
        "Constructor injection works well with final fields, makes required dependencies explicit, and allows unit tests to create the service directly without starting the Spring container."
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
        "The constructor declares PaymentService as a required dependency.",
        "Spring injects the matching PaymentService bean.",
        "The dependency is stored in a final field.",
        "Explicit @Autowired is optional because this class has one constructor."
      ]
    },

    {
      id: "field-injection",
      title: "4. @Autowired with Field Injection",

      paragraphs: [
        "Field injection places @Autowired directly on a field. Spring assigns the dependency during bean initialization, after constructing the object.",
        "Although field injection is supported, it is usually less suitable for application services than constructor injection. The dependency is less visible in the public construction contract, the field cannot normally be initialized through an ordinary constructor, and unit testing often requires reflection or a Spring test context.",
        "Prefer constructor injection for required dependencies. Field injection may still appear in legacy applications and small demonstrations."
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
        "Spring injects the field rather than receiving the dependency through a constructor.",
        "The dependency is not explicit when someone creates OrderService using new.",
        "The field is difficult to replace in a plain unit test without additional setup.",
        "Recommended practice: use constructor injection for mandatory dependencies."
      ]
    },

    {
      id: "setter-injection",
      title: "5. @Autowired with Setter Injection",

      paragraphs: [
        "Setter injection supplies a dependency through a setter method. It can be useful when a dependency is optional or when a dependency needs to be reconfigured after construction.",
        "For mandatory dependencies, constructor injection is normally clearer. For optional dependencies, consider whether an Optional parameter, ObjectProvider, or a carefully designed configuration object would communicate the requirement more clearly."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private EmailService emailService;

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void sendNotification() {
        emailService.sendEmail();
    }
}`
      },

      bullets: [
        "Spring calls the annotated setter and passes the matching bean.",
        "The dependency is supplied after object construction.",
        "This example assumes EmailService is available and required.",
        "Use constructor injection instead when the dependency must always exist."
      ]
    },

    {
      id: "single-constructor",
      title: "6. Is @Autowired Required on a Single Constructor?",

      paragraphs: [
        "No. In modern Spring, a class with exactly one constructor can receive constructor injection without an explicit @Autowired annotation.",
        "This rule is specific to the single-constructor case. If a class declares multiple constructors, Spring needs a clear way to determine which constructor to use. An explicitly annotated constructor is a common solution."
      ],

      code: {
        language: "java",
        code: `@Service
public class ReportService {

    private final ReportRepository reportRepository;

    // @Autowired is not required on this single constructor.
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }
}`
      },

      bullets: [
        "One constructor: explicit @Autowired is generally unnecessary.",
        "Multiple constructors: select the intended injection constructor explicitly when needed.",
        "Constructor injection remains available even when the annotation is omitted."
      ]
    },

    {
      id: "multiple-constructors",
      title: "7. @Autowired with Multiple Constructors",

      paragraphs: [
        "A class may declare multiple constructors for different initialization paths. When Spring manages such a class, constructor selection must be unambiguous.",
        "For example, a service may have a constructor that accepts PaymentService and another that accepts PaymentService plus AuditService. Annotating the intended injection constructor with @Autowired tells Spring which constructor to use.",
        "Avoid adding unnecessary constructors just for testing. With constructor injection, tests can instantiate the class directly using the required dependencies."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final PaymentService paymentService;
    private final AuditService auditService;

    @Autowired
    public OrderService(
            PaymentService paymentService,
            AuditService auditService) {
        this.paymentService = paymentService;
        this.auditService = auditService;
    }

    public void placeOrder() {
        paymentService.processPayment();
        auditService.record("Order placed");
    }
}`
      },

      paragraphs: [
        "This example shows the intended constructor explicitly. Both PaymentService and AuditService must be resolvable Spring beans. If either required dependency is missing, the application will normally fail during startup."
      ]
    },

    {
      id: "multiple-beans",
      title: "8. Multiple Beans of the Same Type",

      paragraphs: [
        "Suppose an application has CardPaymentService and UpiPaymentService, both implementing PaymentService. If OrderService requests only PaymentService, Spring may find two matching candidates and cannot necessarily determine which one you intend.",
        "This ambiguity is commonly resolved using @Qualifier to select a bean by qualifier or bean name, or @Primary to declare a preferred candidate when no more specific selection is supplied."
      ],

      code: {
        language: "java",
        code: `public interface PaymentService {
    void processPayment();
}

import org.springframework.stereotype.Component;

@Component("cardPayment")
public class CardPaymentService implements PaymentService {

    @Override
    public void processPayment() {
        System.out.println("Card payment processed");
    }
}

@Component("upiPayment")
public class UpiPaymentService implements PaymentService {

    @Override
    public void processPayment() {
        System.out.println("UPI payment processed");
    }
}`
      },

      bullets: [
        "Both implementations are beans of type PaymentService.",
        "Injecting PaymentService without further selection may be ambiguous.",
        "Use @Qualifier when a specific implementation is required.",
        "Use @Primary when one implementation should be the default candidate."
      ]
    },

    {
      id: "qualifier",
      title: "9. Using @Qualifier",

      paragraphs: [
        "@Qualifier narrows the set of candidates for a dependency. It is especially useful when several beans implement the same interface and a particular service needs a specific implementation.",
        "In the example below, the qualifier value matches the name of the UPI bean. The service depends on the PaymentService interface rather than the concrete UpiPaymentService class, which helps keep the design loosely coupled."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(
            @Qualifier("upiPayment")
            PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "@Qualifier(\"upiPayment\") selects the intended candidate.",
        "The constructor still depends on the PaymentService interface.",
        "The qualifier must match an eligible bean qualifier or bean name.",
        "A qualifier is useful when different consumers need different implementations."
      ]
    },

    {
      id: "primary",
      title: "10. Using @Primary",

      paragraphs: [
        "@Primary marks a bean as the preferred candidate when Spring has multiple candidates for a single-valued dependency and no more specific qualifier selects another candidate.",
        "Use @Primary when one implementation should be the default throughout most of the application. Use @Qualifier when a particular injection point needs a specific implementation. A matching explicit qualifier can select a bean other than the primary bean."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class CardPaymentService implements PaymentService {

    @Override
    public void processPayment() {
        System.out.println("Card payment processed");
    }
}`
      },

      bullets: [
        "If both cardPayment and upiPayment are candidates, the primary bean is normally preferred when no more specific qualifier is supplied.",
        "@Primary does not remove the other bean from the application context.",
        "@Qualifier is better for selecting a particular implementation at a specific injection point."
      ]
    },

    {
      id: "bean-name-and-type",
      title: "11. How Does Spring Resolve a Dependency?",

      paragraphs: [
        "Spring primarily uses the declared dependency type to identify eligible beans. For example, a constructor parameter of type PaymentService can match any eligible bean implementing that interface.",
        "When multiple candidates exist, Spring considers qualification metadata, primary candidates, and other candidate-selection rules. Bean names can be relevant, including as a fallback when a parameter name matches a candidate name in supported injection scenarios.",
        "Do not rely on bean names alone when the application has important selection rules. Use @Qualifier or @Primary to make the intended behavior clear."
      ],

      code: {
        language: "java",
        code: `public interface MessageSender {
    void send(String message);
}

@Component("emailSender")
class EmailSender implements MessageSender {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

@Component("smsSender")
class SmsSender implements MessageSender {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

@Service
class AlertService {

    private final MessageSender sender;

    AlertService(@Qualifier("smsSender") MessageSender sender) {
        this.sender = sender;
    }

    public void alert() {
        sender.send("System alert");
    }
}`
      }
    },

    {
      id: "optional-dependencies",
      title: "12. Optional Dependencies",

      paragraphs: [
        "By default, an @Autowired dependency is required. If Spring cannot resolve it, bean creation normally fails.",
        "For a genuinely optional dependency, Spring supports approaches such as @Autowired(required = false) on supported injection points, java.util.Optional, and ObjectProvider. Choose the approach that clearly communicates what should happen when the dependency is absent.",
        "Optional dependencies should be used intentionally. If an application cannot perform its essential job without a dependency, treat that dependency as required instead of silently ignoring its absence."
      ],

      code: {
        language: "java",
        code: `import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class WelcomeService {

    private final Optional<PromotionService> promotionService;

    public WelcomeService(
            Optional<PromotionService> promotionService) {
        this.promotionService = promotionService;
    }

    public void welcome() {
        System.out.println("Welcome!");

        promotionService.ifPresent(
            PromotionService::showPromotion
        );
    }
}`
      },

      bullets: [
        "Optional<T> expresses that a dependency may not be present.",
        "ObjectProvider<T> is useful for deferred lookup and optional access to beans.",
        "@Autowired(required = false) can leave a field or setter uninjected when no matching bean exists.",
        "Use optional injection only when the application has a meaningful behavior without that dependency."
      ]
    },

    {
      id: "autowired-and-component",
      title: "13. Does @Autowired Create a Bean?",

      paragraphs: [
        "@Autowired does not itself register or create a dependency bean. It requests injection of an eligible bean that Spring manages or otherwise knows how to resolve.",
        "Annotations such as @Component, @Service, and @Repository can register classes through component scanning. A @Bean method in a @Configuration class can also register an object in the application context.",
        "The class must be registered or the dependency must otherwise be available to Spring. Adding @Autowired to a field does not automatically make the field's class a Spring bean."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public PaymentService paymentService() {
        return new DefaultPaymentService();
    }
}`
      },

      bullets: [
        "@Bean registers the object returned by the method.",
        "@Autowired requests injection of a suitable dependency.",
        "@Service and @Component are common component-scanning annotations.",
        "The configuration class must be discovered or imported by the application."
      ]
    },

    {
      id: "common-errors",
      title: "14. Common @Autowired Errors",

      paragraphs: [
        "NoSuchBeanDefinitionException: Spring cannot find an eligible bean for a required dependency. Check component scanning, configuration, active profiles, and whether the implementation is registered.",
        "NoUniqueBeanDefinitionException: multiple eligible beans match a dependency and Spring cannot select one. Consider @Qualifier or @Primary.",
        "BeanCurrentlyInCreationException: a circular dependency or another bean-creation problem may be involved. Constructor-based circular dependencies generally cannot be resolved automatically.",
        "NullPointerException in a class created using new: Spring did not perform dependency injection on that manually created object. Let Spring manage the object or pass its dependencies explicitly.",
        "UnsatisfiedDependencyException: Spring could not create a bean because one of its required dependencies failed to resolve or initialize. Read the deepest relevant cause in the stack trace."
      ],

      bullets: [
        "Check whether the implementation is annotated with @Component or registered using @Bean.",
        "Confirm that component scanning includes the package containing the implementation.",
        "If multiple implementations exist, choose the correct candidate explicitly.",
        "Avoid manually creating Spring-managed services with new in application code.",
        "Read the complete exception chain instead of fixing only the top-level error."
      ]
    },

    {
      id: "best-practices",
      title: "15. @Autowired Best Practices",

      bullets: [
        "Prefer constructor injection for required dependencies.",
        "Use final fields for dependencies assigned through the constructor.",
        "Omit @Autowired on a single constructor in modern Spring unless explicit annotation improves clarity for your team.",
        "Use @Qualifier for a specific implementation and @Primary for a default implementation.",
        "Keep services dependent on interfaces where that makes the design more flexible.",
        "Avoid field injection in application services when constructor injection is practical.",
        "Do not make required dependencies optional merely to suppress startup errors.",
        "Avoid circular dependencies by reviewing class responsibilities and dependency direction.",
        "Use direct constructor calls with mocks for simple unit tests.",
        "Use Spring context tests when you need to verify bean registration and dependency resolution."
      ]
    },

    {
      id: "interview",
      title: "16. @Autowired Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What does @Autowired do?",
          answer:
            "@Autowired asks Spring to resolve and inject a suitable dependency from the application context into a supported injection point."
        },
        {
          question: "Is @Autowired required on a single constructor?",
          answer:
            "No. Since Spring Framework 4.3, Spring automatically uses the only constructor of a class for constructor injection."
        },
        {
          question: "What are the types of dependency injection supported by Spring?",
          answer:
            "Spring supports constructor injection, setter or method injection, and field injection. Constructor injection is generally recommended for mandatory dependencies."
        },
        {
          question: "What happens when multiple beans match the same type?",
          answer:
            "Spring may report NoUniqueBeanDefinitionException if it cannot determine the candidate. @Qualifier and @Primary are common ways to resolve the ambiguity."
        },
        {
          question: "What is the difference between @Autowired and @Qualifier?",
          answer:
            "@Autowired requests dependency injection. @Qualifier narrows the candidate selection when multiple beans could satisfy a dependency."
        },
        {
          question: "What is the difference between @Primary and @Qualifier?",
          answer:
            "@Primary marks a preferred candidate by default. @Qualifier selects a specific qualified candidate at an injection point."
        },
        {
          question: "Why is constructor injection preferred?",
          answer:
            "It makes required dependencies explicit, supports final fields, helps prevent partially initialized objects, and makes unit testing easier."
        },
        {
          question: "Does @Autowired create a bean?",
          answer:
            "No. It requests injection of a suitable dependency. The dependency must be registered or otherwise available to Spring."
        },
        {
          question: "Can we use @Autowired on a field?",
          answer:
            "Yes. Spring supports field injection, but constructor injection is generally preferred for required dependencies and testability."
        },
        {
          question: "What happens if a required bean is missing?",
          answer:
            "Spring normally fails during application-context initialization with a dependency-resolution error, often reported through UnsatisfiedDependencyException or NoSuchBeanDefinitionException."
        },
        {
          question: "What is NoUniqueBeanDefinitionException?",
          answer:
            "It indicates that more than one eligible bean matches a single-valued dependency and Spring cannot select one unambiguously."
        },
        {
          question: "What is NoSuchBeanDefinitionException?",
          answer:
            "It indicates that Spring cannot find a suitable bean for the requested type or name."
        },
        {
          question: "Can we inject an interface using @Autowired?",
          answer:
            "Yes. Spring can inject an eligible implementation bean into a dependency declared using an interface type."
        },
        {
          question: "Can a dependency be optional?",
          answer:
            "Yes. Depending on the use case, Spring supports Optional<T>, ObjectProvider<T>, and @Autowired(required = false) on supported injection points."
        },
        {
          question: "Why can a field injected with @Autowired be null?",
          answer:
            "A common cause is that the object was created manually using new rather than managed by Spring. Other causes include incorrect configuration or accessing the field before injection has occurred."
        },
        {
          question: "Can @Autowired resolve circular dependencies?",
          answer:
            "Some setter or field injection cycles may be resolvable in certain Spring configurations, but constructor-based cycles generally fail. Refactoring the dependency design is usually preferable."
        },
        {
          question: "What is the difference between @Component and @Autowired?",
          answer:
            "@Component marks a class as a candidate for component scanning and bean registration. @Autowired requests injection of a suitable dependency."
        },
        {
          question: "How do you unit test a class that uses constructor injection?",
          answer:
            "Create the class directly in the test and pass mock dependencies through its constructor. Use a Spring test context only when container behavior also needs to be tested."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "17. Quick Revision Notes",

      bullets: [
        "@Autowired = request dependency injection from Spring.",
        "Constructor injection = recommended for mandatory dependencies.",
        "Single constructor = explicit @Autowired is generally unnecessary.",
        "@Qualifier = select a specific eligible bean.",
        "@Primary = prefer one bean when multiple candidates match.",
        "Optional<T> and ObjectProvider<T> = useful for optional or deferred access.",
        "NoSuchBeanDefinitionException = no suitable bean found.",
        "NoUniqueBeanDefinitionException = multiple matching candidates without a clear selection.",
        "@Autowired does not register a class as a bean.",
        "Objects created with new are not automatically dependency-injected by Spring."
      ],

      paragraphs: [
        "Interview-ready answer: @Autowired is a Spring annotation used for dependency injection. Spring resolves a suitable bean from the ApplicationContext and supplies it to a constructor, field, or method. Constructor injection is generally preferred because it makes required dependencies explicit and improves testability. If multiple beans match, @Qualifier or @Primary can help determine which bean should be injected."
      ]
    }
  ]
};
