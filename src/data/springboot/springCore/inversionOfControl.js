
export const inversionOfControl = {
  id: "inversion-of-control",
  title: "Inversion of Control",
  slug: "inversion-of-control",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "40 min",

  description:
    "Understand Inversion of Control, why it is important in Spring, how the Spring IoC container creates and manages beans, and how IoC works with Dependency Injection in real Spring Boot applications.",

  sections: [
    {
      id: "what-is-ioc",
      title: "1. What is Inversion of Control?",

      paragraphs: [
        "Inversion of Control, commonly called IoC, is a software design principle in which responsibility for creating objects and managing their dependencies is transferred from application code to an external container or framework.",
        "In a traditional Java application, developers often create objects directly using the new keyword and manually connect those objects. With IoC, the application declares what it needs, while a container takes responsibility for creating and connecting the managed objects.",
        "In Spring, the IoC container creates, configures, and manages objects called Spring beans. It can discover components, read configuration, resolve dependencies, and manage bean lifecycle callbacks.",
        "The word inversion describes the change in control: instead of your business code controlling every object creation step, the Spring container controls object creation and dependency wiring according to your configuration.",
        "IoC is a design principle, not a specific annotation. Spring supports IoC through its container and commonly implements dependency management through Dependency Injection."
      ],

      bullets: [
        "Traditional approach: application code creates and connects dependencies.",
        "IoC approach: a container takes responsibility for creating and managing configured objects.",
        "Spring-managed objects are commonly called beans.",
        "IoC helps separate business logic from object creation and configuration."
      ]
    },

    {
      id: "why-ioc-is-needed",
      title: "2. Why Do We Need IoC?",

      paragraphs: [
        "Consider an e-commerce application with an OrderService that needs a PaymentService. The payment implementation might change depending on whether the application supports card payments, UPI, or a mock payment service for testing.",
        "If OrderService creates a concrete payment implementation directly, it becomes responsible for both business operations and dependency creation. Changing the payment implementation may require modifying the service itself.",
        "IoC separates these responsibilities. OrderService focuses on order processing, while the Spring container determines which compatible PaymentService implementation should be provided.",
        "This separation makes applications easier to test, maintain, extend, and configure. IoC does not automatically make every design loosely coupled, but it gives developers a mechanism to manage dependencies more cleanly."
      ],

      bullets: [
        "Reduces unnecessary coupling between classes.",
        "Makes it easier to replace implementations.",
        "Supports unit testing with mock or fake dependencies.",
        "Centralizes object configuration and lifecycle management.",
        "Helps applications follow the Single Responsibility Principle."
      ]
    },

    {
      id: "without-ioc",
      title: "3. Java Example Without IoC",

      paragraphs: [
        "In this example, Car creates its own Engine using the new keyword. Car controls which Engine object is created and how that dependency is obtained.",
        "For a small program, this approach can be perfectly acceptable. The problem becomes more noticeable when classes have many dependencies or when implementations need to be changed for different environments and tests.",
        "Because Car creates Engine directly, replacing Engine with another implementation requires changing Car's code."
      ],

      code: {
        language: "java",
        code: `class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}

class Car {

    private final Engine engine;

    public Car() {
        this.engine = new Engine();
    }

    public void drive() {
        engine.start();
        System.out.println("Car is moving");
    }
}

class Main {

    public static void main(String[] args) {
        Car car = new Car();
        car.drive();
    }
}`
      },

      bullets: [
        "Car creates Engine directly.",
        "Car controls the construction of its dependency.",
        "The concrete Engine implementation is fixed inside Car.",
        "Testing Car with an alternative engine requires changing its design or introducing another construction mechanism."
      ]
    },

    {
      id: "with-ioc",
      title: "4. Java Example With IoC",

      paragraphs: [
        "To demonstrate the principle without Spring, we can create the Engine outside Car and pass it through the constructor. Car no longer controls the creation of Engine.",
        "This is an example of dependency injection, which is a common way to implement IoC. The Main class still creates the objects manually, so the example demonstrates external control of dependency creation rather than a full Spring-managed container.",
        "In a Spring application, the container can take over the object creation and dependency wiring instead of requiring Main to construct every object manually."
      ],

      code: {
        language: "java",
        code: `class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}

class Car {

    private final Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        engine.start();
        System.out.println("Car is moving");
    }
}

class Main {

    public static void main(String[] args) {
        Engine engine = new Engine();
        Car car = new Car(engine);

        car.drive();
    }
}`
      },

      bullets: [
        "Engine is created outside Car.",
        "Car receives its dependency through the constructor.",
        "Car depends on an Engine supplied to it instead of constructing one internally.",
        "Spring can automate this wiring when both objects are registered as beans."
      ]
    },

    {
      id: "ioc-with-interface",
      title: "5. IoC With Interfaces and Multiple Implementations",

      paragraphs: [
        "A stronger design uses an interface to describe a dependency rather than directly depending on one concrete class.",
        "For example, PaymentService can define the payment operation, while CardPaymentService and UpiPaymentService provide different implementations. OrderService depends on the interface, so its business logic does not need to know the concrete payment implementation.",
        "Spring can inject a suitable implementation when the configuration is unambiguous. If multiple beans implement the same interface, use @Primary, @Qualifier, or explicit configuration to tell Spring which one to select.",
        "An interface alone does not implement IoC. The key idea is that the dependency is supplied from outside rather than constructed directly inside the dependent class."
      ],

      code: {
        language: "java",
        code: `interface PaymentService {
    void pay(double amount);
}

class CardPaymentService implements PaymentService {

    @Override
    public void pay(double amount) {
        System.out.println("Card payment: " + amount);
    }
}

class UpiPaymentService implements PaymentService {

    @Override
    public void pay(double amount) {
        System.out.println("UPI payment: " + amount);
    }
}

class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder(double amount) {
        paymentService.pay(amount);
    }
}`
      },

      bullets: [
        "OrderService depends on the PaymentService abstraction.",
        "Payment implementations can be replaced without rewriting order-processing logic.",
        "Spring can create and inject the selected implementation.",
        "When several implementations are registered, the selection must be configured or otherwise made unambiguous."
      ]
    },

    {
      id: "spring-ioc-container",
      title: "6. What Is the Spring IoC Container?",

      paragraphs: [
        "The Spring IoC container is the part of the Spring Framework responsible for instantiating, configuring, assembling, and managing Spring beans.",
        "The container reads bean definitions from sources such as Java configuration classes, component scanning, and supported configuration metadata. It uses those definitions to determine which objects to create and how their dependencies should be connected.",
        "The ApplicationContext interface is the container API most Spring Boot applications use. It builds on BeanFactory and provides additional application features, including event publication, message resolution, and integration with application infrastructure.",
        "BeanFactory is the fundamental container interface. ApplicationContext is the more commonly used choice for full Spring applications because it provides a richer set of features.",
        "The container does not automatically manage every object created with new. Objects created manually inside application code are not automatically Spring beans unless they are registered or otherwise managed by the container."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
          |
          v
SpringApplication.run(...)
          |
          v
Spring IoC Container
          |
          v
Reads Bean Definitions
          |
          v
Creates and Configures Beans
          |
          v
Resolves and Injects Dependencies
          |
          v
Initializes Beans
          |
          v
Application Is Ready`
      },

      bullets: [
        "BeanFactory: fundamental bean container abstraction.",
        "ApplicationContext: richer container abstraction commonly used in Spring applications.",
        "Bean definition: configuration information describing how a bean should be created.",
        "Bean: an object created and managed by the Spring container."
      ]
    },

    {
      id: "registering-spring-beans",
      title: "7. How Does Spring Know Which Objects to Manage?",

      paragraphs: [
        "Spring needs bean definitions before it can manage application objects. In typical Spring Boot applications, beans are registered through component scanning, Java configuration with @Bean methods, or framework integrations such as Spring Data repositories.",
        "The @Component annotation marks a class as a candidate for component scanning. Specialized stereotypes include @Service for service-layer classes, @Repository for persistence-layer classes, and @Controller for Spring MVC controllers. @RestController is commonly used for REST APIs.",
        "The @Configuration annotation marks a configuration class, and @Bean marks a method whose returned object should be registered as a Spring bean.",
        "With @SpringBootApplication, Spring Boot enables component scanning from the package containing the application class and its subpackages by default. Components outside that scan scope may require explicit configuration.",
        "A class is not automatically a Spring bean simply because it exists in the project. It must be discovered or explicitly registered through an appropriate configuration mechanism."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;

@Component
class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}

import org.springframework.stereotype.Service;

@Service
class CarService {

    private final Engine engine;

    public CarService(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        engine.start();
    }
}`
      },

      bullets: [
        "@Component: general-purpose component stereotype.",
        "@Service: commonly used for service-layer components.",
        "@Repository: commonly used for persistence-layer components.",
        "@Controller and @RestController: web-layer components.",
        "@Bean: registers the object returned by a configuration method.",
        "For a real source file, put all import statements before the class declarations; the snippets above illustrate separate classes."
      ]
    },

    {
      id: "spring-ioc-practical-example",
      title: "8. Practical Spring Boot Example",

      paragraphs: [
        "The following example demonstrates the typical IoC flow. Spring discovers Engine and CarService as components, creates their beans, and supplies the Engine bean to CarService through constructor injection.",
        "Place the classes under the package scanned by your Spring Boot application. For example, if the main application class is in com.example.demo, place both components in com.example.demo or one of its subpackages.",
        "Because CarService has a single constructor, Spring can use that constructor for dependency injection without requiring @Autowired.",
        "The ApplicationRunner bean runs after the application context has been initialized, allowing us to demonstrate the injected service when the application starts."
      ],

      code: {
        language: "java",
        code: `package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}`
      },

      bullets: [
        "Save the Engine class in Engine.java.",
        "Create CarService in CarService.java in the same package.",
        "Create the application class in DemoApplication.java.",
        "Run the Spring Boot application and observe the startup output."
      ]
    },

    {
      id: "spring-ioc-practical-service",
      title: "9. Practical Example: Service and Application Classes",

      paragraphs: [
        "This is the CarService class for the preceding example. It receives Engine from Spring instead of creating Engine with new.",
        "The application class defines an ApplicationRunner that asks Spring for the registered CarService bean through method-parameter injection. Spring resolves the parameter and supplies the bean."
      ],

      code: {
        language: "java",
        code: `package com.example.demo;

import org.springframework.stereotype.Service;

@Service
public class CarService {

    private final Engine engine;

    public CarService(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        engine.start();
        System.out.println("Car is moving");
    }
}

// Save the following class in DemoApplication.java.

package com.example.demo;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    ApplicationRunner runCar(CarService carService) {
        return args -> carService.drive();
    }
}`
      },

      bullets: [
        "Engine and CarService are registered through component scanning.",
        "Spring creates and wires the dependencies.",
        "The ApplicationRunner method receives CarService from the container.",
        "The snippets show two separate Java files; each file has its own package and imports.",
        "Expected application output includes Engine started followed by Car is moving."
      ]
    },

    {
      id: "ioc-container-lifecycle",
      title: "10. Bean Creation and Lifecycle in Spring",

      paragraphs: [
        "IoC includes more than creating an object. The Spring container manages bean construction, dependency population, initialization callbacks, and destruction callbacks where applicable.",
        "During application startup, Spring prepares the application context and registers bean definitions. It creates singleton beans eagerly by default in common configurations, resolves their dependencies, and performs initialization before the application is fully ready.",
        "A simplified lifecycle is: instantiate the bean, populate dependencies, run applicable aware callbacks and BeanPostProcessor steps, execute initialization callbacks, and make the initialized bean available for use. The precise lifecycle includes additional extension points and ordering rules.",
        "Initialization mechanisms include @PostConstruct, InitializingBean, and custom init methods configured through @Bean. Destruction mechanisms include @PreDestroy, DisposableBean, and custom destroy methods. In Spring Boot 3, @PostConstruct and @PreDestroy come from jakarta.annotation.",
        "Prototype beans have different lifecycle handling: Spring creates and configures them, but it generally does not manage their complete destruction lifecycle after handing them to the caller. Container shutdown callbacks also do not mean every manually created object is cleaned up automatically."
      ],

      code: {
        language: "java",
        code: `import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

@Component
public class ReportService {

    @PostConstruct
    public void initialize() {
        System.out.println("ReportService initialized");
    }

    public void generateReport() {
        System.out.println("Generating report");
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("ReportService shutting down");
    }
}`
      },

      bullets: [
        "Instantiation: Spring creates the bean object.",
        "Dependency injection: Spring supplies required dependencies.",
        "Initialization: lifecycle callbacks run before the bean is ready for normal use.",
        "Usage: application components use the initialized bean.",
        "Destruction: supported cleanup callbacks run when the managed context shuts down or the bean is otherwise destroyed according to its scope and lifecycle."
      ]
    },

    {
      id: "ioc-vs-di",
      title: "11. IoC vs. Dependency Injection",

      paragraphs: [
        "IoC and Dependency Injection are closely related, but they are not identical terms.",
        "Inversion of Control is the broader principle of transferring control of some process, such as object creation and dependency management, to an external mechanism.",
        "Dependency Injection is a technique in which an object receives its dependencies from an external source rather than creating those dependencies itself. Spring commonly uses constructor injection to implement dependency injection.",
        "For example, IoC describes the shift from Car creating Engine to the Spring container managing that relationship. Constructor injection is the specific mechanism through which Engine is supplied to CarService.",
        "IoC can be implemented in different ways, and Dependency Injection is one common approach. Do not use the two terms as if they always mean exactly the same thing."
      ],

      bullets: [
        "IoC: the general design principle.",
        "Dependency Injection: a technique that supplies dependencies from outside a class.",
        "Spring IoC container: the Spring infrastructure that manages beans and their relationships.",
        "Constructor injection: a common and recommended way to supply required dependencies."
      ]
    },

    {
      id: "bean-scopes-and-ioc",
      title: "12. IoC and Bean Scopes",

      paragraphs: [
        "Bean scope determines how Spring creates and shares a bean instance. Scope is part of bean management, so it is closely related to the responsibilities of the IoC container.",
        "Singleton is the default scope in a typical Spring application context. Spring maintains one shared instance of that bean per bean definition within the relevant container.",
        "Prototype scope tells Spring to create a new instance whenever that bean is requested from the container. It does not mean that every injection into a singleton automatically gets a fresh prototype instance on every method call.",
        "Web-aware application contexts also support scopes such as request and session. These are useful when an object should be associated with an HTTP request or user session.",
        "Singleton scope does not automatically make a class thread-safe. If many requests use the same singleton service concurrently, shared mutable state must be designed carefully."
      ],

      bullets: [
        "Singleton: one shared instance per bean definition and container.",
        "Prototype: a new instance for each request to the container.",
        "Request: one instance per HTTP request in a web-aware context.",
        "Session: one instance per HTTP session in a web-aware context.",
        "Prefer stateless singleton services for ordinary application business logic."
      ]
    },

    {
      id: "ioc-testing",
      title: "13. How IoC Improves Testing",

      paragraphs: [
        "When a class receives its dependencies through a constructor, a unit test can create the class with a fake or mock dependency without starting the entire Spring container.",
        "This is useful because a unit test can focus on the class's own business logic rather than database connections, web servers, or other infrastructure.",
        "For example, a test can provide a fake Engine implementation to CarService or a mock PaymentService to OrderService. The production implementation can remain unchanged.",
        "IoC does not require every test to use Spring. Plain Java unit tests are often faster and simpler, while Spring integration tests are appropriate when the test needs to verify bean registration, dependency wiring, configuration, or framework integration."
      ],

      code: {
        language: "java",
        code: `interface Engine {
    void start();
}

class CarService {

    private final Engine engine;

    CarService(Engine engine) {
        this.engine = engine;
    }

    void drive() {
        engine.start();
    }
}

class FakeEngine implements Engine {

    @Override
    public void start() {
        System.out.println("Fake engine started");
    }
}

class Main {

    public static void main(String[] args) {
        Engine fakeEngine = new FakeEngine();
        CarService carService = new CarService(fakeEngine);

        carService.drive();
    }
}`
      },

      bullets: [
        "Constructor injection makes dependencies explicit.",
        "Tests can supply fake or mock implementations.",
        "Unit tests can run without starting Spring.",
        "Integration tests can verify that Spring actually wires the intended beans."
      ]
    },

    {
      id: "ioc-common-mistakes",
      title: "14. Common IoC Mistakes",

      paragraphs: [
        "A common mistake is assuming that every Java object is automatically managed by Spring. Objects created with new are ordinary Java objects unless they are separately registered with the container.",
        "Another mistake is placing a component outside the default component-scan scope. The class may compile successfully but still be unavailable for injection because Spring never registered it as a bean.",
        "If two beans implement the same interface, Spring may report that a single candidate cannot be selected. Resolve the ambiguity with @Qualifier, @Primary, or explicit configuration.",
        "Circular dependencies can occur when two beans require each other. Constructor-based circular dependencies generally prevent the application context from starting. Prefer redesigning the dependency relationship instead of immediately introducing lazy injection.",
        "IoC does not eliminate all coupling. A class can still be tightly coupled to a concrete type, use a service locator, or depend on too many collaborators. Good object design remains important.",
        "Finally, do not confuse bean scope with thread safety. A singleton bean may be accessed by many threads at the same time, so mutable shared state requires appropriate design."
      ],

      bullets: [
        "Expecting Spring to inject dependencies into every object created with new.",
        "Forgetting to register a required bean.",
        "Placing components outside the component-scan scope.",
        "Registering multiple candidates without resolving ambiguity.",
        "Creating circular dependencies between services.",
        "Assuming singleton beans are automatically thread-safe.",
        "Using dependency injection without considering class responsibilities."
      ]
    },

    {
      id: "ioc-best-practices",
      title: "15. IoC Best Practices",

      paragraphs: [
        "Use constructor injection for required dependencies. It makes dependencies visible, supports final fields, and allows the object to be created in a valid state.",
        "Prefer depending on meaningful abstractions when interchangeable implementations are genuinely useful. Do not introduce interfaces for every class without a design reason.",
        "Keep Spring-specific configuration near the application's composition and configuration layer. Business services should focus on business rules instead of manually looking up their dependencies from the application context.",
        "Use @Component, @Service, and related annotations consistently, or use @Bean methods when explicit construction and configuration are more appropriate.",
        "Keep singleton service beans stateless where practical, and avoid storing request-specific mutable data in shared instance fields.",
        "Write unit tests using constructor-supplied fakes or mocks, and write focused Spring tests for configuration and integration behavior.",
        "When startup fails because a bean cannot be found or selected, inspect the exception message, component-scan boundaries, bean definitions, qualifiers, and dependency graph."
      ],

      bullets: [
        "Prefer constructor injection for required dependencies.",
        "Avoid unnecessary direct object creation inside Spring-managed services.",
        "Keep component scanning and configuration predictable.",
        "Use @Qualifier or @Primary when multiple candidates exist.",
        "Avoid circular dependencies by improving class responsibilities.",
        "Do not use ApplicationContext lookups as the default replacement for normal dependency injection.",
        "Keep singleton beans safe for concurrent access.",
        "Test business logic independently from Spring where practical."
      ]
    },

    {
      id: "ioc-interview-questions",
      title: "16. Inversion of Control Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is Inversion of Control?",
          answer: "Inversion of Control is a design principle in which responsibility for creating and managing objects or their dependencies is transferred from application code to an external container or framework."
        },
        {
          question: "2. What is the Spring IoC container?",
          answer: "It is the Spring infrastructure that reads bean definitions, creates and configures beans, resolves their dependencies, and manages their lifecycle."
        },
        {
          question: "3. What is a Spring bean?",
          answer: "A Spring bean is an object that is instantiated, assembled, or otherwise managed by the Spring IoC container."
        },
        {
          question: "4. How does Spring implement IoC?",
          answer: "Spring provides an IoC container, commonly accessed through ApplicationContext, and uses mechanisms such as Dependency Injection to assemble objects and their dependencies."
        },
        {
          question: "5. What is the difference between IoC and Dependency Injection?",
          answer: "IoC is the broader design principle of transferring control to an external mechanism. Dependency Injection is a technique in which an object receives its dependencies from outside rather than constructing them itself."
        },
        {
          question: "6. What is the difference between BeanFactory and ApplicationContext?",
          answer: "BeanFactory is the fundamental container interface. ApplicationContext extends the bean factory capabilities with additional application features such as events and message resolution, and is the common choice in Spring Boot applications."
        },
        {
          question: "7. What is the responsibility of the IoC container?",
          answer: "It manages bean definitions, instantiates beans, resolves and injects dependencies, performs initialization, and manages applicable lifecycle callbacks."
        },
        {
          question: "8. What is a bean definition?",
          answer: "A bean definition is configuration metadata that tells Spring how a bean should be created and configured, including information such as its type, scope, and dependencies."
        },
        {
          question: "9. How can we register a bean in Spring?",
          answer: "Common approaches include component scanning with annotations such as @Component and @Service, and explicit registration using @Bean methods inside configuration classes."
        },
        {
          question: "10. What is the purpose of @Component?",
          answer: "@Component marks a class as a candidate for component scanning so Spring can register it as a bean when it is within the configured scan scope."
        },
        {
          question: "11. What is the difference between @Component and @Bean?",
          answer: "@Component is placed on a class for component scanning. @Bean is placed on a method, usually in a configuration class, and registers the object returned by that method."
        },
        {
          question: "12. Why is constructor injection commonly recommended?",
          answer: "It makes required dependencies explicit, supports final fields, enables object construction in a valid state, and simplifies unit testing."
        },
        {
          question: "13. Does Spring manage every object in a Java application?",
          answer: "No. Objects created manually with new are not automatically Spring beans. An object must be registered or otherwise managed by the container to receive normal container-managed behavior."
        },
        {
          question: "14. What happens if Spring cannot find a required dependency?",
          answer: "Application context creation usually fails with an exception indicating that a required bean could not be found or resolved. Check registration, scanning, configuration, and dependency types."
        },
        {
          question: "15. What happens if two beans implement the same interface?",
          answer: "Spring may report that the dependency is ambiguous. Use @Qualifier, @Primary, or explicit configuration to select the intended implementation."
        },
        {
          question: "16. What is a circular dependency?",
          answer: "A circular dependency occurs when beans depend on one another in a cycle. Constructor-based circular dependencies generally prevent Spring from creating the application context. Refactoring the dependency graph is usually the best solution."
        },
        {
          question: "17. How does IoC improve testability?",
          answer: "A class can receive a fake or mock dependency through its constructor, allowing its behavior to be tested without constructing real infrastructure or starting the Spring container."
        },
        {
          question: "18. What is the default bean scope in Spring?",
          answer: "Singleton is the default scope. Spring maintains one shared instance per bean definition in the relevant application context."
        },
        {
          question: "19. Are singleton Spring beans automatically thread-safe?",
          answer: "No. Singleton describes instance sharing, not thread safety. Developers must handle mutable shared state appropriately."
        },
        {
          question: "20. Explain IoC in Spring Boot with a real example.",
          answer: "Suppose CarService requires Engine. Spring discovers both components, creates their beans, and injects Engine into CarService through its constructor. CarService can then use Engine without creating it directly with new."
        },
        {
          question: "21. What is the Spring application context?",
          answer: "ApplicationContext is a central Spring container interface that manages beans and provides additional facilities such as event publication and message resolution."
        },
        {
          question: "22. Does using an interface automatically implement IoC?",
          answer: "No. An interface can reduce dependency on a concrete implementation, but IoC concerns who controls object creation and management. Dependency Injection is a common way to apply that principle."
        },
        {
          question: "23. What is the difference between a Spring-managed object and an object created using new?",
          answer: "A Spring-managed object participates in the container's dependency injection and lifecycle mechanisms. An object created directly using new does not automatically receive those container-managed services."
        },
        {
          question: "24. Why should services avoid manually looking up dependencies from ApplicationContext?",
          answer: "Direct container lookups can hide dependencies and couple business code to Spring infrastructure. Normal constructor injection makes dependencies explicit and simplifies testing."
        }
      ]
    },

    {
      id: "ioc-quick-revision",
      title: "17. Quick Revision Notes",

      paragraphs: [
        "Inversion of Control transfers responsibility for object creation and dependency management to an external container. In Spring, that container manages Spring beans and their relationships.",
        "Dependency Injection is a common way Spring implements IoC. With constructor injection, a class receives its dependencies from outside rather than creating them directly.",
        "ApplicationContext is the commonly used Spring container interface. Beans can be registered through component scanning or explicit configuration with @Bean methods.",
        "IoC improves separation of concerns and testability, but it does not automatically remove every dependency, solve poor class design, or make shared objects thread-safe."
      ],

      bullets: [
        "IoC = control of object creation and dependency management is transferred.",
        "Spring IoC container = infrastructure that manages Spring beans.",
        "Bean = an object managed by Spring.",
        "ApplicationContext = commonly used Spring container interface.",
        "Dependency Injection = supplying dependencies from outside an object.",
        "Constructor injection = recommended approach for required dependencies.",
        "@Component and @Service = common component-scanning annotations.",
        "@Bean = explicit bean registration through a configuration method.",
        "Default scope = singleton.",
        "Main benefits = maintainability, flexibility, separation of concerns, and testability."
      ]
    }
  ]
};
