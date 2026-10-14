
export const applicationContext = {
  id: "application-context",
  title: "ApplicationContext",
  slug: "application-context",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "40 min",

  description:
    "Understand ApplicationContext, Spring's central IoC container interface, including bean registration, dependency injection, lifecycle management, events, resource handling, Spring Boot startup, and interview questions.",

  sections: [
    {
      id: "what-is-application-context",
      title: "1. What is ApplicationContext?",

      paragraphs: [
        "ApplicationContext is a central interface in the Spring Framework. It represents the Spring IoC container, which creates, configures, wires, and manages application objects called beans.",
        "Instead of creating every dependency manually with the new keyword, we can ask Spring to manage objects and inject their dependencies. This is called Inversion of Control (IoC), and Dependency Injection (DI) is one of the main ways Spring implements it.",
        "ApplicationContext builds on the basic bean-management capabilities of BeanFactory and provides additional application-level features such as event publication, message resolution, resource loading, and integration with Spring infrastructure.",
        "In a typical Spring Boot application, the framework creates and configures the ApplicationContext during startup. Developers usually declare components and inject dependencies instead of constructing the context themselves."
      ],

      bullets: [
        "Creates and manages Spring beans.",
        "Resolves dependencies between beans.",
        "Supports bean scopes and lifecycle callbacks.",
        "Publishes and delivers application events.",
        "Supports internationalized messages through message resolution.",
        "Provides resource-loading capabilities.",
        "Integrates with Spring configuration and other framework facilities."
      ],

      code: {
        language: "java",
        code: `@Component
public class EmailService {

    public void sendEmail() {
        System.out.println("Email sent");
    }
}

@Configuration
@ComponentScan("com.example")
public class AppConfig {
}

// The Spring container creates and manages EmailService.
try (AnnotationConfigApplicationContext context =
         new AnnotationConfigApplicationContext(AppConfig.class)) {

    EmailService emailService =
        context.getBean(EmailService.class);

    emailService.sendEmail();
}`
      },

      interviewQuestions: [
        {
          question: "What is ApplicationContext?",
          answer:
            "ApplicationContext is a Spring container interface that manages beans and their dependencies. It also provides features such as application events, resource handling, and message resolution."
        },
        {
          question: "What is the Spring IoC container?",
          answer:
            "The IoC container creates and manages objects, configures their dependencies, and controls their lifecycle. ApplicationContext is one of the main interfaces used to access this container."
        },
        {
          question: "What is the difference between IoC and Dependency Injection?",
          answer:
            "Inversion of Control is the broader principle of transferring control over object creation or behavior to a framework. Dependency Injection is a technique in which an object receives the dependencies it needs from an external container."
        },
        {
          question: "What is a Spring bean?",
          answer:
            "A Spring bean is an object instantiated, configured, or otherwise managed by the Spring IoC container. Beans can be registered using annotations such as @Component or through @Bean methods in configuration classes."
        },
        {
          question: "Why is ApplicationContext important in Spring Boot?",
          answer:
            "It is the container that brings together application components, dependency injection, configuration, and framework infrastructure. Spring Boot prepares and refreshes the context as part of application startup."
        }
      ]
    },

    {
      id: "application-context-internals",
      title: "2. How ApplicationContext Works Internally",

      paragraphs: [
        "At a high level, Spring reads configuration metadata, registers bean definitions, creates required bean instances, resolves dependencies, and initializes the beans. ApplicationContext coordinates these operations with the underlying bean factory and other framework infrastructure.",
        "A BeanDefinition describes how Spring should create and configure a bean. It can include information such as the bean class, scope, constructor arguments, property values, and lifecycle methods.",
        "During context refresh, Spring prepares its internal infrastructure and creates non-lazy singleton beans in a typical application context. Dependencies are resolved while beans are created. Bean post-processors and initialization callbacks can participate in the lifecycle.",
        "The exact startup sequence contains additional framework steps, and not every bean must be created immediately. Lazy initialization, prototype scope, factory beans, and other configuration choices can change when particular objects are created."
      ],

      code: {
        language: "text",
        code: `Simplified ApplicationContext startup

1. Read configuration metadata
          |
          v
2. Register BeanDefinitions
          |
          v
3. Prepare container infrastructure
          |
          v
4. Create non-lazy singleton beans
          |
          v
5. Resolve constructor and other dependencies
          |
          v
6. Apply BeanPostProcessors and initialization callbacks
          |
          v
7. Context finishes refreshing
          |
          v
8. Application uses the managed beans

Note: This is a simplified conceptual flow.
The actual framework lifecycle contains additional steps.`
      },

      bullets: [
        "BeanDefinition: metadata describing a bean.",
        "BeanFactory: underlying bean-management infrastructure.",
        "Dependency resolution: supplies required beans to other beans.",
        "BeanPostProcessor: can customize beans before and after initialization.",
        "Initialization callbacks: allow a bean to perform setup.",
        "Context refresh: establishes the usable application context."
      ],

      interviewQuestions: [
        {
          question: "What happens when an ApplicationContext is refreshed?",
          answer:
            "Spring prepares the context infrastructure, initializes bean-factory post-processors and bean post-processors, creates eligible non-lazy singleton beans, and completes the refresh process. The exact sequence includes additional framework steps and depends on the context implementation."
        },
        {
          question: "What is a BeanDefinition?",
          answer:
            "A BeanDefinition contains metadata Spring uses to create and configure a bean, including its class, scope, constructor arguments, property values, and initialization configuration."
        },
        {
          question: "Does ApplicationContext create every bean immediately?",
          answer:
            "No. A typical context eagerly creates non-lazy singleton beans during refresh, but lazy beans and prototype beans may be created later when requested. Some framework-managed objects also follow specialized creation rules."
        },
        {
          question: "What is a BeanPostProcessor?",
          answer:
            "A BeanPostProcessor can inspect or modify bean instances before and after initialization callbacks. Spring uses post-processing infrastructure for features such as aspects and proxy creation."
        }
      ]
    },

    {
      id: "bean-registration",
      title: "3. How Beans Are Registered in ApplicationContext",

      paragraphs: [
        "ApplicationContext can discover beans through component scanning, register beans through Java configuration, or load definitions through other supported configuration mechanisms.",
        "Annotations such as @Component, @Service, @Repository, and @Controller identify classes that can be discovered through component scanning. These stereotype annotations communicate a component's intended role, while the underlying component-scanning mechanism registers eligible classes.",
        "The @Bean annotation registers an object returned by a method in a configuration class. It is especially useful for third-party classes that cannot be annotated directly or when object construction requires custom configuration.",
        "Registration does not mean that every bean is instantiated at the same moment. Actual creation depends on scope, laziness, dependencies, and context lifecycle."
      ],

      code: {
        language: "java",
        code: `@Service
public class NotificationService {

    public String send() {
        return "Notification sent";
    }
}

@Configuration
public class AppConfig {

    @Bean
    public Clock applicationClock() {
        return Clock.systemUTC();
    }
}

@Service
public class ReportService {

    private final NotificationService notificationService;
    private final Clock clock;

    public ReportService(
            NotificationService notificationService,
            Clock clock) {
        this.notificationService = notificationService;
        this.clock = clock;
    }

    public String generateReport() {
        return notificationService.send()
            + " at "
            + clock.instant();
    }
}`,
      },

      bullets: [
        "@Component: general-purpose Spring component.",
        "@Service: component commonly used for business logic.",
        "@Repository: persistence-oriented component stereotype.",
        "@Controller: Spring MVC controller.",
        "@Configuration and @Bean: explicitly declare beans through Java configuration.",
        "@ComponentScan: controls where component discovery occurs."
      ],

      interviewQuestions: [
        {
          question: "How can we register beans in Spring?",
          answer:
            "Common approaches include component scanning with annotations such as @Component and @Service, explicit registration through @Bean methods in configuration classes, and supported programmatic or imported configuration mechanisms."
        },
        {
          question: "What is the difference between @Component and @Bean?",
          answer:
            "@Component marks a class for component scanning. @Bean marks a method whose returned object should be registered in the Spring container. @Bean is useful when the object is created through custom construction logic or belongs to a third-party library."
        },
        {
          question: "Why use @Configuration?",
          answer:
            "@Configuration identifies a class that declares bean definitions and other configuration. Spring processes its @Bean methods as part of application configuration."
        },
        {
          question: "What happens if a required dependency cannot be found?",
          answer:
            "If Spring cannot resolve a required dependency while creating a bean, context initialization will generally fail with a bean-creation or dependency-resolution exception. The error details help identify missing beans, ambiguous candidates, or configuration problems."
        }
      ]
    },

    {
      id: "getting-bean",
      title: "4. Getting a Bean from ApplicationContext",

      paragraphs: [
        "ApplicationContext exposes getBean methods that allow callers to retrieve managed objects by name, type, or both. This is useful in framework integrations, infrastructure code, and some specialized scenarios.",
        "For ordinary application components, constructor injection is generally preferred over calling getBean throughout the application. Constructor injection makes dependencies explicit and keeps business classes less coupled to the Spring container.",
        "When multiple beans match a requested type, Spring may need additional information to choose a candidate. Depending on the registration and injection point, annotations such as @Primary and @Qualifier can help resolve ambiguity."
      ],

      code: {
        language: "java",
        code: `ApplicationContext context =
    new AnnotationConfigApplicationContext(AppConfig.class);

EmailService service =
    context.getBean(EmailService.class);

service.sendEmail();`,
      },

      bullets: [
        "getBean(EmailService.class): retrieve a bean by type.",
        "getBean(\"emailService\"): retrieve a bean by name.",
        "getBean(\"emailService\", EmailService.class): retrieve by name and type.",
        "Prefer constructor injection for normal service dependencies.",
        "Use qualifiers or primary-bean selection when multiple candidates exist."
      ],

      interviewQuestions: [
        {
          question: "How do you get a bean from ApplicationContext?",
          answer:
            "Use a getBean overload, such as context.getBean(EmailService.class) or context.getBean(\"emailService\"). In ordinary application code, dependency injection is generally preferable."
        },
        {
          question: "Should we normally call getBean() everywhere?",
          answer:
            "No. Repeated manual lookup couples application code to the Spring container and hides dependencies. Constructor injection is usually clearer and easier to unit-test."
        },
        {
          question: "What happens if getBean() cannot find the requested bean?",
          answer:
            "Spring throws a lookup-related exception, typically NoSuchBeanDefinitionException, if no matching bean exists. If a type-based lookup has multiple candidates and no unique selection can be made, a NoUniqueBeanDefinitionException may occur."
        },
        {
          question: "What is the difference between getBean() and dependency injection?",
          answer:
            "getBean() performs an explicit lookup at runtime. Dependency injection allows Spring to supply required dependencies when it constructs or configures a component, making dependencies more visible in the class design."
        }
      ]
    },

    {
      id: "dependency-injection",
      title: "5. ApplicationContext and Dependency Injection",

      paragraphs: [
        "ApplicationContext coordinates dependency injection by resolving the dependencies declared by a bean. For example, if OrderService requires OrderRepository, Spring finds an appropriate repository bean and supplies it when creating OrderService.",
        "Constructor injection is generally recommended for mandatory dependencies. It makes the class's requirements explicit and allows fields to remain final. Setter injection may be suitable for optional dependencies or cases where mutability is intentional.",
        "Spring can also resolve collections of beans, configuration properties, and qualified candidates. If several beans have the same type, use an intentional selection strategy rather than relying on accidental registration order."
      ],

      code: {
        language: "java",
        code: `@Repository
public class OrderRepository {

    public String findStatus(Long id) {
        return "CONFIRMED";
    }
}

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public String getStatus(Long id) {
        return orderRepository.findStatus(id);
    }
}

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}/status")
    public String getStatus(@PathVariable Long id) {
        return orderService.getStatus(id);
    }
}`,
      },

      bullets: [
        "Spring creates or obtains the required dependencies.",
        "Constructor injection expresses required dependencies clearly.",
        "Final fields help prevent accidental reassignment.",
        "@Qualifier selects a specific candidate when multiple beans match.",
        "@Primary identifies a preferred candidate for single-bean injection.",
        "Avoid circular dependencies by improving component responsibilities and dependency direction."
      ],

      interviewQuestions: [
        {
          question: "How does ApplicationContext support dependency injection?",
          answer:
            "It uses registered bean definitions and dependency-resolution rules to identify the required objects, create or obtain them, and supply them to the dependent bean through constructors, setters, or other supported injection points."
        },
        {
          question: "Why is constructor injection recommended?",
          answer:
            "It makes required dependencies explicit, supports immutable fields, and allows classes to be instantiated in unit tests without starting Spring. It also helps expose circular dependencies."
        },
        {
          question: "What are @Primary and @Qualifier used for?",
          answer:
            "@Primary marks a preferred bean when Spring needs one candidate among several. @Qualifier narrows the candidate selection at a particular injection point."
        },
        {
          question: "What is a circular dependency?",
          answer:
            "A circular dependency occurs when components depend on each other, directly or indirectly. Constructor-based cycles cannot be resolved through ordinary constructor instantiation and generally cause context startup failure. The preferred fix is usually to redesign the dependency relationship."
        }
      ]
    },

    {
      id: "bean-lifecycle",
      title: "6. Bean Lifecycle and ApplicationContext",

      paragraphs: [
        "ApplicationContext manages more than object creation. It participates in bean initialization and shutdown, allowing application components to prepare resources and release them when the context closes.",
        "A simplified lifecycle is instantiation, dependency population, awareness callbacks where applicable, pre-initialization processing, initialization callbacks, post-initialization processing, use, and destruction. The exact sequence depends on bean configuration and Spring infrastructure.",
        "Common initialization mechanisms include @PostConstruct and InitializingBean. For shutdown, @PreDestroy and DisposableBean are available, along with configured destruction methods. Prefer straightforward lifecycle callbacks and ensure that resource ownership is clear.",
        "Prototype-scoped beans are treated differently: Spring creates them on request but generally does not manage their complete destruction lifecycle after handing them to the caller."
      ],

      code: {
        language: "java",
        code: `@Component
public class CacheWarmupService {

    @PostConstruct
    public void initialize() {
        System.out.println("Preparing initial cache state");
    }

    @PreDestroy
    public void shutdown() {
        System.out.println("Releasing owned resources");
    }
}`,
      },

      bullets: [
        "@PostConstruct: initialization callback after dependency injection.",
        "@PreDestroy: destruction callback when the managed bean is being destroyed.",
        "BeanPostProcessor: customizes bean instances around initialization.",
        "ApplicationContext close: initiates destruction of managed singleton beans.",
        "Prototype beans: Spring does not generally manage their complete destruction after creation.",
        "Keep initialization work bounded and avoid unnecessarily slowing application startup."
      ],

      interviewQuestions: [
        {
          question: "Does ApplicationContext manage the bean lifecycle?",
          answer:
            "Yes. It coordinates bean creation, dependency injection, initialization, and destruction for managed beans according to their scopes and configuration."
        },
        {
          question: "What is the difference between @PostConstruct and @PreDestroy?",
          answer:
            "@PostConstruct runs after the bean's dependencies have been injected and before normal use. @PreDestroy runs during managed bean destruction, allowing the bean to release resources."
        },
        {
          question: "Does Spring call destruction callbacks for prototype beans?",
          answer:
            "Spring creates prototype beans and hands them to the caller, but it does not generally manage their full destruction lifecycle. The application is responsible for cleaning up resources owned by such instances."
        },
        {
          question: "What happens when an ApplicationContext is closed?",
          answer:
            "A closable context initiates shutdown processing and invokes applicable destruction callbacks for managed singleton beans. This gives components an opportunity to release resources they own."
        }
      ]
    },

    {
      id: "bean-scopes",
      title: "7. Bean Scopes and ApplicationContext",

      paragraphs: [
        "Bean scope determines how Spring creates and shares a bean. The default scope is singleton, which means one managed instance per bean definition in a given container, rather than one instance for the entire JVM.",
        "Prototype scope creates a new instance whenever the bean is requested from the container. Web-aware application contexts also support scopes such as request and session, which are tied to the lifecycle of a web request or session.",
        "A singleton bean may be used by multiple request-handling threads. Singleton scope does not make its fields thread-safe. Avoid storing mutable request-specific state in shared singleton service fields."
      ],

      bullets: [
        "Singleton: one managed instance per bean definition per container.",
        "Prototype: a new instance for each container lookup or injection resolution.",
        "Request: one instance per HTTP request in a compatible web context.",
        "Session: one instance per HTTP session in a compatible web context.",
        "Application: one instance per ServletContext in a compatible web application.",
        "Web scopes require a compatible web-aware environment."
      ],

      code: {
        language: "java",
        code: `@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SharedReportService {
    // Default scope is already singleton.
}

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ReportTask {
    // Spring creates a new instance for each lookup.
}`,
      },

      interviewQuestions: [
        {
          question: "What is the default Spring bean scope?",
          answer:
            "Singleton. Spring maintains one managed instance per bean definition within the relevant container."
        },
        {
          question: "Does singleton mean one object for the entire JVM?",
          answer:
            "No. Singleton scope is associated with a bean definition in a Spring container. Multiple containers can each manage their own instance."
        },
        {
          question: "Is a singleton bean automatically thread-safe?",
          answer:
            "No. Multiple threads may call the same singleton instance concurrently. Thread safety depends on its implementation and how mutable state is managed."
        },
        {
          question: "What is the difference between singleton and prototype scope?",
          answer:
            "Singleton scope reuses one managed instance per bean definition in a container. Prototype scope creates a new instance whenever Spring resolves that bean from the container."
        }
      ]
    },

    {
      id: "bean-factory-vs-application-context",
      title: "8. BeanFactory vs ApplicationContext",

      paragraphs: [
        "BeanFactory is the basic Spring IoC container interface. It provides bean registration and retrieval capabilities through the underlying container implementation.",
        "ApplicationContext extends BeanFactory and adds application-level capabilities such as event publication, message resolution, and resource loading. It also integrates with the broader Spring application infrastructure.",
        "A common difference discussed in interviews is singleton initialization. A typical BeanFactory implementation can create singleton beans lazily when requested, while a standard ApplicationContext generally pre-instantiates non-lazy singleton beans during refresh. Configuration and implementation details can affect exact behavior."
      ],

      code: {
        language: "text",
        code: `BeanFactory
    |
    | Basic container capabilities
    | - Bean lookup
    | - Dependency management
    v

ApplicationContext
    |
    | Builds on BeanFactory
    | - Application events
    | - Message resolution
    | - Resource loading
    | - Broader framework integration`,
      },

      interviewQuestions: [
        {
          question: "What is the difference between BeanFactory and ApplicationContext?",
          answer:
            "BeanFactory provides core bean-management capabilities. ApplicationContext extends those capabilities with features such as event publication, resource handling, and message resolution, and integrates with the broader Spring application infrastructure."
        },
        {
          question: "Which container is normally used in Spring Boot applications?",
          answer:
            "Spring Boot normally creates an ApplicationContext implementation suited to the application type, such as a servlet web application or a non-web application."
        },
        {
          question: "Does BeanFactory always initialize every singleton lazily?",
          answer:
            "No. Lazy creation is common behavior for basic BeanFactory usage, but the exact behavior depends on the implementation and configuration. In a typical ApplicationContext, non-lazy singleton beans are eagerly created during refresh."
        },
        {
          question: "Why does ApplicationContext extend BeanFactory?",
          answer:
            "It reuses the fundamental bean-management contract while adding higher-level application features needed by many Spring applications."
        }
      ]
    },

    {
      id: "spring-boot-context",
      title: "9. ApplicationContext in Spring Boot",

      paragraphs: [
        "In Spring Boot, the application context is created and initialized as part of the application startup process. Developers normally call SpringApplication.run() rather than manually constructing an ApplicationContext.",
        "Spring Boot prepares the environment, processes application configuration, registers bean definitions, applies auto-configuration, creates the application context, and refreshes it. It also integrates the lifecycle with application startup and shutdown.",
        "Auto-configuration uses classpath information, configuration properties, and conditional rules to configure suitable beans. User-defined beans can cause some auto-configurations to back off when their conditions are no longer satisfied.",
        "For a web application, the context also works with the web infrastructure, such as the embedded servlet container and Spring MVC. The exact context type and startup details depend on the application type and configuration."
      ],

      code: {
        language: "java",
        code: `@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(Application.class, args);

        System.out.println(
            "Application started: " + context.isActive()
        );
    }
}`,
      },

      bullets: [
        "SpringApplication.run() starts the Spring Boot application.",
        "The environment supplies configuration properties.",
        "Component scanning discovers eligible application components.",
        "Auto-configuration registers conditional infrastructure beans.",
        "The context refresh initializes eligible beans.",
        "For web applications, Spring Boot also initializes the web server infrastructure.",
        "Spring Boot integrates context startup and shutdown with application lifecycle events."
      ],

      interviewQuestions: [
        {
          question: "How is ApplicationContext created in Spring Boot?",
          answer:
            "Spring Boot's SpringApplication prepares the application environment and configuration, creates an appropriate context implementation, loads bean definitions, applies configuration and auto-configuration, and refreshes the context as part of startup."
        },
        {
          question: "What does SpringApplication.run() return?",
          answer:
            "It returns a ConfigurableApplicationContext, which represents the initialized application context and exposes lifecycle and configuration-related capabilities."
        },
        {
          question: "What is Spring Boot auto-configuration?",
          answer:
            "Auto-configuration conditionally registers beans and configuration based on factors such as the classpath, existing beans, and configuration properties. It reduces manual setup while allowing applications to customize the configuration."
        },
        {
          question: "Can we get ApplicationContext from Spring Boot?",
          answer:
            "Yes. SpringApplication.run() returns a ConfigurableApplicationContext. In normal application code, however, injecting the dependencies a component needs is usually preferable to passing the context around for manual lookup."
        }
      ]
    },

    {
      id: "application-events",
      title: "10. Application Events and Message Resolution",

      paragraphs: [
        "ApplicationContext supports publishing and listening to application events. This allows components to react to events without the publisher needing direct knowledge of every listener.",
        "Spring's event mechanism is generally in-process and synchronous by default. A publisher typically invokes registered listeners as part of event publication unless asynchronous handling is configured.",
        "ApplicationContext also supports message resolution through MessageSource integration, which is commonly used for localized messages. Resource-loading facilities allow components to access resources through Spring's resource abstraction."
      ],

      code: {
        language: "java",
        code: `public record OrderCreatedEvent(Long orderId) {}

@Service
public class OrderService {

    private final ApplicationEventPublisher eventPublisher;

    public OrderService(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void createOrder(Long orderId) {
        // Persist the order here.
        eventPublisher.publishEvent(
            new OrderCreatedEvent(orderId)
        );
    }
}

@Component
public class OrderEventListener {

    @EventListener
    public void onOrderCreated(OrderCreatedEvent event) {
        System.out.println(
            "Order created: " + event.orderId()
        );
    }
}`,
      },

      interviewQuestions: [
        {
          question: "How does ApplicationContext support application events?",
          answer:
            "It exposes event-publication capabilities and coordinates delivery to registered listeners. Components can publish events without directly invoking every interested listener."
        },
        {
          question: "Are Spring application events asynchronous by default?",
          answer:
            "No. Event listeners are generally invoked synchronously by default. Asynchronous handling requires appropriate configuration, such as an async listener and executor."
        },
        {
          question: "What is MessageSource used for?",
          answer:
            "MessageSource resolves messages, often from resource bundles, and supports localized text based on locale. It is commonly used for internationalized validation and application messages."
        },
        {
          question: "Are in-process Spring events a durable message queue?",
          answer:
            "No. They are an in-process event mechanism and do not automatically provide durable delivery across application restarts. Reliable cross-service delivery requires an appropriate messaging or outbox-based design."
        }
      ]
    },

    {
      id: "application-context-testing",
      title: "11. Testing ApplicationContext",

      paragraphs: [
        "ApplicationContext is involved in Spring integration tests because it creates the beans and configuration required by the test. Spring's testing support can cache compatible application contexts between tests to reduce repeated startup cost.",
        "A focused unit test does not always need a Spring context. Plain JUnit and Mockito tests are often faster for isolated business logic, while context-based tests are useful for checking bean wiring, configuration, and integration between Spring components.",
        "When a context fails to start, inspect the first meaningful cause in the exception chain. Common causes include missing beans, ambiguous dependencies, invalid configuration, circular dependencies, and unavailable infrastructure."
      ],

      code: {
        language: "java",
        code: `@SpringBootTest
class ApplicationContextTest {

    @Autowired
    private ApplicationContext context;

    @Test
    void requiredBeansAreRegistered() {
        assertTrue(context.containsBean("application"));

        assertNotNull(
            context.getBean(EmailService.class)
        );
    }
}`,
      },

      bullets: [
        "Use plain unit tests for isolated business logic.",
        "Use @SpringBootTest when a full application context is needed.",
        "Use narrower Spring test slices when only one layer is under test.",
        "Inspect the root cause of context startup failures.",
        "Avoid unnecessary context creation because it increases test time.",
        "Ensure tests do not depend on uncontrolled external services."
      ],

      interviewQuestions: [
        {
          question: "How do you test whether a Spring bean is registered?",
          answer:
            "In a context-based test, inject ApplicationContext and check the bean by type or name. A successful context startup also verifies that the required configuration and dependencies could be resolved."
        },
        {
          question: "Does every unit test need ApplicationContext?",
          answer:
            "No. Unit tests should usually instantiate the class directly or use mocks when that is sufficient. ApplicationContext is valuable for testing Spring wiring and integration behavior, but it introduces additional startup cost."
        },
        {
          question: "Why can a Spring application context fail to start in tests?",
          answer:
            "Possible causes include missing or ambiguous beans, invalid properties, circular dependencies, incompatible configurations, database connectivity, or test-specific configuration errors. The deepest meaningful cause in the exception chain is a good starting point."
        }
      ]
    },

    {
      id: "common-mistakes",
      title: "12. Common ApplicationContext Mistakes",

      paragraphs: [
        "Understanding the container means knowing when to use it directly and when to let dependency injection handle object relationships. Most application components should depend on their collaborators, not on ApplicationContext itself.",
        "Avoid creating multiple contexts unnecessarily, because each context can manage its own bean instances and resources. Also avoid storing request-specific mutable data in singleton beans, assuming that singleton means globally unique, or assuming that all beans are eagerly created."
      ],

      bullets: [
        "Calling getBean() throughout business code instead of using dependency injection.",
        "Creating multiple ApplicationContext instances without a clear reason.",
        "Assuming singleton beans are automatically thread-safe.",
        "Assuming every bean is instantiated during startup.",
        "Ignoring context startup errors and focusing only on the final exception message.",
        "Using application events when durable cross-service messaging is required.",
        "Assuming prototype beans receive automatic destruction callbacks.",
        "Passing ApplicationContext into every class and hiding dependencies."
      ],

      interviewQuestions: [
        {
          question: "Why is injecting ApplicationContext into every service a poor design?",
          answer:
            "It turns ordinary components into service-locator users, hides their actual dependencies, and makes testing harder. Injecting the specific dependencies a component needs is generally clearer."
        },
        {
          question: "Can two ApplicationContext instances manage different instances of the same bean class?",
          answer:
            "Yes. Each context manages its own bean definitions and instances. A singleton is scoped to a bean definition within a container, not universally shared across every Spring context."
        },
        {
          question: "How would you debug a NoSuchBeanDefinitionException?",
          answer:
            "Check whether the bean is registered, whether component scanning covers its package, whether configuration conditions match, whether the correct profile is active, and whether the requested type or qualifier matches the actual bean."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "13. Quick Revision Notes",

      paragraphs: [
        "ApplicationContext is the central application-level Spring container interface. It builds on BeanFactory and coordinates bean management, dependency injection, lifecycle handling, events, message resolution, and resource loading.",
        "In Spring Boot, SpringApplication creates and refreshes the context during startup. For normal application development, use constructor injection for required dependencies and access the container directly only when there is a clear framework or infrastructure need."
      ],

      bullets: [
        "ApplicationContext: application-level Spring IoC container interface.",
        "BeanFactory: core bean-management contract.",
        "BeanDefinition: metadata describing how a bean is configured.",
        "Dependency Injection: Spring supplies required dependencies.",
        "getBean(): explicit lookup of a managed bean.",
        "@Component: registers eligible classes through component scanning.",
        "@Bean: registers an object returned by a configuration method.",
        "@PostConstruct: initialization callback.",
        "@PreDestroy: destruction callback.",
        "Singleton scope: one managed instance per bean definition per container.",
        "ApplicationContext refresh: prepares infrastructure and initializes eligible beans.",
        "SpringApplication.run(): starts Spring Boot and returns ConfigurableApplicationContext.",
        "Constructor injection: preferred for required dependencies.",
        "Application events: in-process communication between components, synchronous by default."
      ],

      interviewQuestions: [
        {
          question: "Explain ApplicationContext in one interview answer.",
          answer:
            "ApplicationContext is Spring's central application-level IoC container interface. It manages beans and dependency injection, coordinates lifecycle callbacks, and provides additional features such as application events, resource loading, and message resolution. In Spring Boot, it is created and refreshed during application startup."
        },
        {
          question: "What are the three most important things to remember about ApplicationContext?",
          answer:
            "First, it manages Spring beans and their dependencies. Second, it provides application-level capabilities beyond basic BeanFactory functionality. Third, in ordinary Spring Boot code, dependencies should generally be injected rather than retrieved manually through getBean()."
        }
      ]
    }
  ]
};
