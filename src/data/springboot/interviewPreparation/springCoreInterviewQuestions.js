
export const springCoreInterviewQuestions = {
  id: 1602,
  title: "Spring Core Interview Questions",
  slug: "spring-core-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Revise IoC, dependency injection, bean scopes, bean lifecycle, and Spring-managed components.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "ioc-and-di",
      title: "1. IoC and Dependency Injection",
      paragraphs: [
        "In a typical Spring application, the container creates and manages configured objects called beans. Dependency injection allows the container to supply the collaborators a component needs instead of making that component construct them itself.",
        "Inversion of Control (IoC) is the broader principle in which control over responsibilities such as object creation and dependency wiring is transferred to a framework or container. Dependency injection is one way Spring implements this principle.",
        "Constructor injection is generally preferred for required dependencies because it makes dependencies explicit, supports final fields, and allows an object to be created in a valid state. Setter injection can be appropriate for optional dependencies, while field injection makes dependencies less visible and is harder to test without Spring.",
        "The Spring IoC container reads configuration, registers bean definitions, creates bean instances when needed, resolves dependencies, and manages their lifecycle. ApplicationContext is the commonly used container interface in Spring applications."
      ],
      code: {
        language: "java",
        code: "public interface PaymentService {\n    void pay();\n}\n\n@Service\npublic class CardPaymentService implements PaymentService {\n    @Override\n    public void pay() {\n        System.out.println(\"Payment processed\");\n    }\n}\n\n@Service\npublic class CheckoutService {\n    private final PaymentService paymentService;\n\n    public CheckoutService(PaymentService paymentService) {\n        this.paymentService = paymentService;\n    }\n\n    public void checkout() {\n        paymentService.pay();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "1. What is Inversion of Control?",
          answer: "Inversion of Control means that the framework or container manages responsibilities such as object creation and dependency wiring instead of application code controlling everything directly. Spring implements IoC through its container, which creates and configures beans."
        },
        {
          question: "2. What is dependency injection?",
          answer: "Dependency injection is a technique in which an object's dependencies are supplied from outside, commonly by the Spring container. For example, Spring injects a PaymentService into CheckoutService rather than requiring CheckoutService to construct a CardPaymentService itself."
        },
        {
          question: "3. Why prefer constructor injection?",
          answer: "Constructor injection makes required dependencies explicit, supports immutable fields, simplifies unit testing, and helps identify invalid dependency configurations during application startup. It also makes it possible to create the object directly in a unit test without starting Spring."
        },
        {
          question: "4. What is a Spring bean?",
          answer: "A Spring bean is an object instantiated, configured, or otherwise managed by the Spring IoC container. Spring can inject dependencies into beans and apply lifecycle callbacks, scopes, and proxy-based behavior where configured."
        },
        {
          question: "5. What is the difference between IoC and dependency injection?",
          answer: "IoC is the general principle of transferring control to a framework or container. Dependency injection is a specific technique for supplying an object's dependencies. Spring's container applies dependency injection as part of its IoC model."
        },
        {
          question: "6. What is the difference between @Component, @Service, and @Repository?",
          answer: "@Component is a general-purpose component stereotype. @Service communicates service-layer intent, while @Repository communicates persistence-layer intent and participates in persistence exception translation where applicable. All three can register classes as beans through component scanning."
        },
        {
          question: "7. What is the difference between constructor, setter, and field injection?",
          answer: "Constructor injection supplies required dependencies when an object is created. Setter injection supplies dependencies through a method and can suit optional dependencies. Field injection places dependencies directly on fields, but hides constructor requirements and makes isolated unit testing more difficult."
        },
        {
          question: "8. What happens if Spring cannot resolve a required dependency?",
          answer: "Application context creation normally fails with a bean creation or dependency resolution exception. Common causes include a missing bean, multiple candidates without a clear selection, a circular dependency, or incorrect component scanning."
        }
      ]
    },
    {
      id: "container-and-beans",
      title: "2. Spring Container and Bean Registration",
      paragraphs: [
        "ApplicationContext is a central Spring container that manages beans and provides features such as dependency injection, application events, resource access, and integration with the environment. BeanFactory is the underlying container abstraction, while ApplicationContext provides additional application-oriented functionality.",
        "Spring beans can be registered using component scanning, @Bean methods inside configuration classes, or programmatic bean registration. Component scanning is commonly used for application classes, while @Bean methods are useful for configuring third-party classes that cannot be annotated directly.",
        "By default, @SpringBootApplication includes component scanning starting from the package containing the application class. Placing the main class in a suitable root package helps Spring discover controllers, services, repositories, and configuration classes in its subpackages.",
        "When several beans implement the same interface, Spring needs to determine which candidate to inject. @Primary marks a preferred candidate, while @Qualifier selects a specific candidate. Bean names can also be used as qualifiers."
      ],
      code: {
        language: "java",
        code: "@Configuration\npublic class PaymentConfiguration {\n\n    @Bean\n    PaymentGateway paymentGateway() {\n        return new ExternalPaymentGateway();\n    }\n}\n\n@Service\npublic class CheckoutService {\n    private final PaymentGateway paymentGateway;\n\n    public CheckoutService(PaymentGateway paymentGateway) {\n        this.paymentGateway = paymentGateway;\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "9. What is ApplicationContext?",
          answer: "ApplicationContext is a Spring container that manages bean definitions, bean creation, dependency injection, and lifecycle processing. It also supports application events, internationalization, and resource access. It is commonly used by Spring Boot applications."
        },
        {
          question: "10. What is the difference between BeanFactory and ApplicationContext?",
          answer: "BeanFactory provides fundamental IoC container functionality. ApplicationContext builds on that functionality and adds application-oriented features such as event publication, message resolution, and integration with Spring infrastructure. ApplicationContext is the normal choice for modern Spring applications."
        },
        {
          question: "11. How can you register a Spring bean?",
          answer: "A bean can be registered through component scanning using annotations such as @Component, @Service, or @Repository, through a method annotated with @Bean in a configuration class, or through programmatic registration mechanisms."
        },
        {
          question: "12. What is the difference between @Bean and @Component?",
          answer: "@Component is applied to a class that can be discovered through component scanning. @Bean is applied to a method whose returned object should be registered as a bean. @Bean is particularly useful for configuring third-party classes."
        },
        {
          question: "13. What happens when two beans implement the same interface?",
          answer: "If Spring cannot identify a unique candidate for an injection point, it can fail with a NoUniqueBeanDefinitionException. Use @Qualifier to choose a particular bean or @Primary to identify the preferred candidate."
        },
        {
          question: "14. What is @Primary?",
          answer: "@Primary marks a bean as the preferred candidate when multiple beans match a single-valued injection point. An explicit @Qualifier can still select a particular bean instead."
        },
        {
          question: "15. What is @Qualifier?",
          answer: "@Qualifier narrows dependency resolution to a particular candidate, commonly by a qualifier value or bean name. It is useful when several implementations of the same interface exist, such as CardPaymentService and UpiPaymentService."
        }
      ]
    },
    {
      id: "lifecycle-scopes",
      title: "3. Bean Lifecycle and Scope",
      paragraphs: [
        "The Spring bean lifecycle describes how a bean definition becomes a usable object and how the container processes it. A simplified lifecycle includes instantiation, dependency population, awareness callbacks where applicable, BeanPostProcessor callbacks, initialization callbacks, and eventual destruction callbacks.",
        "For initialization, Spring supports mechanisms such as @PostConstruct, InitializingBean.afterPropertiesSet(), and a configured init method. For destruction, it supports @PreDestroy, DisposableBean.destroy(), and a configured destroy method for beans whose lifecycle Spring manages.",
        "The default bean scope is singleton. A singleton means one managed instance per bean definition per Spring container, not one instance across the entire JVM. Spring beans are not automatically thread-safe merely because they use singleton scope.",
        "Prototype scope requests a new instance whenever the container resolves the bean through that scope. Spring does not manage the full destruction lifecycle of prototype objects after handing them to callers.",
        "Web-aware application contexts also support scopes such as request and session. Request scope creates an instance for an HTTP request, while session scope associates an instance with an HTTP session.",
        "Injecting a shorter-lived bean directly into a longer-lived singleton requires care. For example, injecting a request-scoped dependency into a singleton often uses a scoped proxy or ObjectProvider so that the correct request-specific instance can be resolved."
      ],
      code: {
        language: "java",
        code: "@Component\n@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)\npublic class ApplicationCounter {\n    private final AtomicInteger counter = new AtomicInteger();\n\n    public int nextValue() {\n        return counter.incrementAndGet();\n    }\n}\n\n@Component\n@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)\npublic class ReportBuilder {\n    public ReportBuilder() {\n        System.out.println(\"New ReportBuilder instance created\");\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "16. What is the default Spring bean scope?",
          answer: "The default scope is singleton, meaning one instance per bean definition per Spring container. It does not mean one instance for the entire JVM, and singleton scope does not automatically make mutable state thread-safe."
        },
        {
          question: "17. What is prototype scope?",
          answer: "Prototype scope requests a new bean instance each time the container resolves that bean. Spring performs the normal creation and initialization work but does not manage the complete destruction lifecycle of the prototype object after returning it to the caller."
        },
        {
          question: "18. What are the common Spring bean scopes?",
          answer: "Common scopes include singleton and prototype. In web-aware application contexts, request, session, application, and WebSocket scopes may also be available. The appropriate scope depends on the lifetime and ownership of the state."
        },
        {
          question: "19. What are @PostConstruct and @PreDestroy?",
          answer: "@PostConstruct marks an initialization callback invoked after dependency injection and before the bean is used normally. @PreDestroy marks a destruction callback during managed bean shutdown. They are commonly used for resource initialization and cleanup."
        },
        {
          question: "20. What are the main stages of the Spring bean lifecycle?",
          answer: "A simplified lifecycle includes instantiation, dependency population, awareness callbacks, BeanPostProcessor processing before initialization, initialization callbacks, post-initialization processing, normal use, and destruction callbacks when the container manages destruction. The exact sequence depends on the bean and configured infrastructure."
        },
        {
          question: "21. What is BeanPostProcessor?",
          answer: "BeanPostProcessor allows Spring infrastructure to inspect or modify bean instances before and after initialization callbacks. Framework features such as proxy creation use bean post-processing infrastructure. A post-processor can return a wrapper instead of the original instance."
        },
        {
          question: "22. Is a singleton Spring bean thread-safe?",
          answer: "Not automatically. Singleton describes object scope, not synchronization. Stateless singleton services are usually easier to use safely across concurrent requests. Mutable shared state requires appropriate concurrency control or a different state-management design."
        },
        {
          question: "23. What happens to prototype beans during container shutdown?",
          answer: "Spring does not automatically manage the complete destruction lifecycle of prototype instances after handing them to the caller. If a prototype owns resources that require cleanup, the application should define a clear ownership and cleanup strategy."
        },
        {
          question: "24. What is the problem with injecting a prototype bean into a singleton?",
          answer: "The prototype dependency is normally resolved when the singleton is created, so the singleton may keep using that same injected prototype instance. To obtain a fresh instance when needed, use a mechanism such as ObjectProvider or an appropriate scoped proxy."
        }
      ]
    },
    {
      id: "circular-dependencies",
      title: "4. Circular Dependencies",
      paragraphs: [
        "A circular dependency occurs when one bean depends on another bean that eventually depends back on the first. For example, OrderService requires PaymentService while PaymentService also requires OrderService.",
        "Constructor-based circular dependencies generally cannot be resolved automatically because each object requires the other before either constructor can complete. Spring typically reports a circular dependency or bean creation error during startup.",
        "The preferred solution is usually to refactor responsibilities. Extract shared behavior into a third service, introduce a suitable event-based boundary, or reverse the dependency through an interface where appropriate.",
        "Do not treat lazy injection as the default fix for every cycle. It can defer resolution, but it may conceal a design problem and make the runtime dependency graph harder to understand."
      ],
      code: {
        language: "java",
        code: "@Service\npublic class OrderService {\n    private final PaymentService paymentService;\n\n    public OrderService(PaymentService paymentService) {\n        this.paymentService = paymentService;\n    }\n}\n\n@Service\npublic class PaymentService {\n    private final OrderService orderService;\n\n    public PaymentService(OrderService orderService) {\n        this.orderService = orderService;\n    }\n}\n\n// This constructor-based cycle normally prevents startup."
      },
      interviewQuestions: [
        {
          question: "25. What is circular dependency injection?",
          answer: "It occurs when two or more beans depend on each other in a cycle. Constructor-based cycles generally cannot be resolved because each bean requires the other before construction can finish. The design should usually be refactored."
        },
        {
          question: "26. How can you resolve a circular dependency?",
          answer: "Identify the responsibilities causing the cycle and redesign the dependencies. Common solutions include extracting shared logic into a third service, using an appropriate event boundary, or restructuring the dependency direction. Lazy resolution can sometimes defer creation, but it should not be the first choice for a design problem."
        },
        {
          question: "27. Why is a circular dependency often considered a design problem?",
          answer: "It can indicate that responsibilities are too tightly coupled or that components have unclear ownership. Breaking the cycle often improves modularity, testability, and the ability to change one component without affecting another."
        }
      ]
    },
    {
      id: "profiles-and-configuration",
      title: "5. Profiles, Configuration, and Bean Selection",
      paragraphs: [
        "Spring supports environment-specific configuration through property sources and profiles. Profiles can conditionally register beans for development, testing, or production, while externalized properties configure values without changing business code.",
        "@Profile limits a bean or configuration class to selected active profiles. Profiles are useful for selecting environment-specific implementations, but secrets should still be supplied through secure configuration or a secret-management system.",
        "@ConditionalOnProperty and related conditional annotations are frequently used in Spring Boot configuration. They allow configuration to depend on explicit properties, the classpath, or existing beans.",
        "Keep configuration classes focused. Prefer constructor injection for configuration dependencies, validate configuration values at startup where possible, and avoid scattering environment checks throughout business logic."
      ],
      code: {
        language: "java",
        code: "@Configuration\npublic class NotificationConfiguration {\n\n    @Bean\n    @Profile(\"development\")\n    NotificationService consoleNotificationService() {\n        return message -> System.out.println(message);\n    }\n\n    @Bean\n    @Profile(\"production\")\n    NotificationService productionNotificationService(\n            EmailGateway emailGateway) {\n        return emailGateway::send;\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "28. What is @Profile?",
          answer: "@Profile conditionally registers beans or configuration when one or more specified profiles are active. It can select environment-specific implementations, but sensitive configuration should still be managed securely."
        },
        {
          question: "29. What is the difference between @Profile and @ConditionalOnProperty?",
          answer: "@Profile selects configuration based on active environment profiles. @ConditionalOnProperty selects configuration based on the presence or value of a property. They address different configuration needs and can be combined where appropriate."
        },
        {
          question: "30. How do you manage environment-specific values?",
          answer: "Use externalized configuration through properties or YAML, environment variables, command-line arguments, deployment configuration, and protected secret stores. Keep business logic independent of environment-specific values."
        },
        {
          question: "31. Why should configuration be validated?",
          answer: "Invalid URLs, missing credentials, negative timeouts, and inconsistent settings can otherwise cause failures only when the affected operation runs. Validating configuration at startup allows many errors to be discovered before the application serves traffic."
        }
      ]
    },
    {
      id: "testing-and-best-practices",
      title: "6. Testing Spring Core Behavior and Best Practices",
      paragraphs: [
        "Spring-managed components can be unit-tested by constructing them directly and supplying test doubles through their constructors. This is one of the practical advantages of constructor injection.",
        "Use Spring context tests when the behavior under test depends on component scanning, bean registration, profiles, qualifiers, scopes, proxies, or configuration. Avoid starting the full application context for every simple business rule.",
        "When testing scopes or lifecycle callbacks, verify observable behavior rather than relying on assumptions about instance identity or callback timing. Prototype cleanup and scoped proxy behavior deserve particular attention when resources are involved.",
        "Keep singleton services stateless where practical. Avoid circular dependencies, use clear component boundaries, and make dependencies explicit. These practices improve readability, concurrency safety, and testability."
      ],
      code: {
        language: "java",
        code: "class CheckoutServiceTest {\n\n    @Test\n    void checkoutInvokesPaymentService() {\n        PaymentService paymentService = mock(PaymentService.class);\n        CheckoutService checkoutService =\n                new CheckoutService(paymentService);\n\n        checkoutService.checkout();\n\n        verify(paymentService).pay();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "32. How do you unit-test a service that uses dependency injection?",
          answer: "Instantiate the service directly and provide its dependencies as mocks or test doubles. This verifies business behavior without starting the Spring container and is especially straightforward when the class uses constructor injection."
        },
        {
          question: "33. When should you use a Spring context test?",
          answer: "Use a context test when the behavior depends on Spring itself, such as bean registration, qualifiers, profiles, scopes, proxy behavior, configuration properties, or lifecycle processing. For isolated business logic, a plain unit test is usually faster and simpler."
        },
        {
          question: "34. Why should singleton services generally avoid mutable shared state?",
          answer: "A singleton instance may be accessed concurrently by multiple request threads. Mutable shared state can introduce race conditions and data leakage between requests. Stateless services or explicitly thread-safe state management are generally safer."
        },
        {
          question: "35. What are common Spring Core mistakes?",
          answer: "Common mistakes include using field injection without considering testability, creating circular dependencies, assuming singleton beans are automatically thread-safe, misunderstanding prototype destruction, placing the main application class in an unsuitable package, and using profiles as a substitute for secure secret management."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "7. Quick Revision Notes",
      paragraphs: [
        "IoC is the principle of handing object management to a container. Dependency injection is a technique Spring uses to supply an object's dependencies. ApplicationContext manages beans and provides application-oriented container features.",
        "Constructor injection is generally preferred for required dependencies. @Component is a general stereotype, @Service communicates service intent, and @Repository communicates persistence intent. @Bean is useful for registering objects through configuration methods.",
        "Singleton is the default scope and means one instance per bean definition per container. Prototype requests a new instance when resolved, while web scopes can associate objects with a request or session. Scope does not guarantee thread safety.",
        "Bean lifecycle processing includes instantiation, dependency injection, post-processing, initialization callbacks, normal use, and managed destruction. Constructor-based circular dependencies normally indicate a cycle that should be refactored.",
        "Profiles and conditional configuration help select beans based on the environment or properties. Test plain business logic without Spring where possible, and use context tests when container behavior is part of the requirement."
      ],
      bullets: [
        "IoC: the container controls object creation and wiring.",
        "DI: dependencies are supplied from outside an object.",
        "ApplicationContext: the commonly used Spring application container.",
        "Constructor injection: explicit dependencies and easy unit testing.",
        "@Bean: registers the object returned by a configuration method.",
        "@Qualifier: selects a particular matching bean.",
        "@Primary: marks a preferred candidate.",
        "Singleton: one instance per bean definition per container.",
        "Prototype: a new instance when the container resolves the bean.",
        "@PostConstruct: initialization callback.",
        "@PreDestroy: managed destruction callback.",
        "Circular dependency: a dependency cycle that often needs refactoring.",
        "@Profile: selects beans based on active profiles.",
        "Thread safety: singleton scope does not guarantee it."
      ]
    }
  ]
};
