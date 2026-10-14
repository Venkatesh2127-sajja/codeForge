
export const whatIsSpring = {
  id: "what-is-spring",
  title: "What is Spring?",
  slug: "what-is-spring",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "20 min",

  description:
    "Understand what the Spring Framework is, why it was introduced, and the core problems it solves in Java application development.",

  sections: [
    {
      id: "spring-introduction",
      title: "What is Spring?",

      paragraphs: [
        "Spring is an open-source Java framework used to build enterprise applications.",
        "It provides infrastructure and features that make Java application development easier, more modular, testable, and maintainable.",
        "Spring provides several modules for different application requirements, including dependency injection, web development, data access, security, and transaction management.",
        "The central idea behind Spring is to provide infrastructure so that developers can focus more on application and business logic instead of repeatedly writing infrastructure code."
      ],

      bullets: [
        "Spring is a Java-based application framework.",
        "It supports loosely coupled application design.",
        "It provides Dependency Injection and Inversion of Control.",
        "It supports web application development.",
        "It integrates with databases and persistence technologies.",
        "It provides transaction management.",
        "It provides integration with many other technologies.",
        "It provides infrastructure for building modular applications."
      ]
    },

    {
      id: "spring-problem",
      title: "What Problem Does Spring Solve?",

      paragraphs: [
        "A major problem in traditional Java applications is tight coupling between classes.",
        "If one class directly creates all of its dependencies, changing or testing those dependencies becomes more difficult.",
        "Spring addresses this problem by allowing dependencies to be supplied by the Spring container rather than requiring every class to create its own dependencies.",
        "This makes applications easier to change, test, maintain, and extend."
      ],

      code: {
        language: "java",
        code: `// Tightly coupled

class Car {

    private Engine engine = new Engine();

    public void drive() {
        engine.start();
    }
}`
      },

      bullets: [
        "Car directly creates Engine.",
        "Car is strongly dependent on a concrete Engine implementation.",
        "Replacing Engine becomes harder.",
        "Unit testing can become more difficult.",
        "Object creation is mixed with business behavior."
      ]
    },

    {
      id: "dependency-injection-problem",
      title: "Dependency Injection as the Solution",

      paragraphs: [
        "Instead of creating its dependency internally, a class can receive the dependency from outside.",
        "This approach is called Dependency Injection.",
        "Spring provides a container that can create objects, manage them as beans, and inject their dependencies."
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
        System.out.println("Car is running");
    }
}`
      },

      paragraphs: [
        "Here, Car does not create Engine using new Engine(). The Engine object is provided to Car through the constructor.",
        "This reduces the responsibility of Car and makes the class easier to test and change."
      ]
    },

    {
      id: "why-spring",
      title: "Why was Spring introduced?",

      paragraphs: [
        "Traditional Java enterprise applications often required significant configuration and tightly coupled components.",
        "Spring was introduced to simplify enterprise application development by providing mechanisms such as Dependency Injection, modular configuration, transaction management, and reusable infrastructure."
      ],

      code: {
        language: "java",
        code: `class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}

class Car {

    private Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        engine.start();
        System.out.println("Car is running");
    }
}`
      },

      paragraphs: [
        "In this example, Car receives Engine through its constructor instead of creating the Engine itself. This is an example of dependency injection."
      ]
    },

    {
      id: "spring-history",
      title: "Why Spring Became Popular",

      paragraphs: [
        "Spring became popular because it provided a simpler programming model for many enterprise Java applications.",
        "Instead of making application classes responsible for infrastructure concerns, Spring provides reusable infrastructure through its container and other modules.",
        "The framework also promotes separation of concerns and loosely coupled design."
      ],

      bullets: [
        "Reduced object-creation responsibilities.",
        "Dependency Injection.",
        "Reusable infrastructure.",
        "Modular architecture.",
        "Better testability.",
        "Transaction management.",
        "Web development support.",
        "Integration with databases and other technologies."
      ]
    },

    {
      id: "spring-core-features",
      title: "Core Features of Spring",

      bullets: [
        "Inversion of Control (IoC)",
        "Dependency Injection (DI)",
        "Aspect-Oriented Programming (AOP)",
        "Transaction Management",
        "Spring MVC",
        "Data Access Support",
        "Spring Security integration",
        "Application configuration and integration support"
      ]
    },

    {
      id: "ioc",
      title: "Inversion of Control (IoC)",

      paragraphs: [
        "Inversion of Control means that responsibility for creating and managing application objects is transferred from application code to a framework or container.",
        "In Spring, the IoC container manages Spring beans and their dependencies.",
        "Instead of a class deciding how and when every dependency should be created, the Spring container manages object creation and wiring."
      ],

      code: {
        language: "text",
        code: `Without IoC

Application class
      ↓
creates objects
      ↓
manages dependencies


With Spring IoC

Application class
      ↓
requests dependencies
      ↓
Spring Container
      ↓
creates and manages beans
      ↓
injects dependencies`
      },

      bullets: [
        "IoC is a principle.",
        "The Spring IoC container implements this principle.",
        "Application classes can depend on abstractions and injected objects.",
        "Object lifecycle and dependency management can be handled by Spring."
      ]
    },

    {
      id: "dependency-injection",
      title: "Dependency Injection (DI)",

      paragraphs: [
        "Dependency Injection is the mechanism through which an object's dependencies are supplied to it instead of being created directly inside the object.",
        "Constructor injection is generally preferred for required dependencies because it makes dependencies explicit and allows the object to be created in a valid state."
      ],

      code: {
        language: "java",
        code: `@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }
}`
      },

      bullets: [
        "PaymentService depends on PaymentRepository.",
        "PaymentService does not create PaymentRepository using new.",
        "Spring can provide the repository through dependency injection.",
        "Constructor injection makes the dependency explicit."
      ]
    },

    {
      id: "types-of-di",
      title: "Types of Dependency Injection",

      paragraphs: [
        "Spring applications can use different dependency injection styles.",
        "Constructor injection is generally preferred for mandatory dependencies."
      ],

      code: {
        language: "java",
        code: `// Constructor Injection

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }


// Setter Injection

@Service
public class EmployeeService {

    private EmployeeRepository repository;

    @Autowired
    public void setRepository(EmployeeRepository repository) {
        this.repository = repository;
    }


// Field Injection

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;
}`
      },

      bullets: [
        "Constructor injection → preferred for required dependencies.",
        "Setter injection → useful when a dependency is optional or needs to be changed after construction in appropriate designs.",
        "Field injection → concise but less explicit and generally less preferred for maintainable application code."
      ]
    },

    {
      id: "beans",
      title: "What is a Spring Bean?",

      paragraphs: [
        "A Spring bean is an object that is instantiated, assembled, and managed by the Spring IoC container.",
        "Spring can discover beans through component scanning or create them through configuration methods such as @Bean."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    public String getEmployee() {
        return "Employee";
    }
}


// Configuration-based bean

@Configuration
public class AppConfig {

    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }
}`
      },

      bullets: [
        "@Component can register a class as a Spring component.",
        "@Service is commonly used for service-layer components.",
        "@Repository is commonly used for persistence components.",
        "@Controller and @RestController are used for web components.",
        "@Bean explicitly declares an object as a bean through configuration."
      ]
    },

    {
      id: "spring-container",
      title: "Spring IoC Container",

      paragraphs: [
        "The Spring IoC container is responsible for creating and managing beans and their dependencies.",
        "The container reads configuration and determines which objects should be created, how they depend on each other, and how they should be managed."
      ],

      code: {
        language: "text",
        code: `Application
      ↓
Spring Configuration
      ↓
Spring IoC Container
      ↓
Create Beans
      ↓
Resolve Dependencies
      ↓
Inject Dependencies
      ↓
Manage Bean Lifecycle`
      }
    },

    {
      id: "application-context",
      title: "ApplicationContext",

      paragraphs: [
        "ApplicationContext is a commonly used Spring IoC container interface.",
        "It provides dependency injection and bean management along with additional application infrastructure such as event publication, resource loading, and message resolution.",
        "In a typical Spring Boot application, the application context is created and managed during application startup."
      ],

      code: {
        language: "java",
        code: `ApplicationContext context =
        SpringApplication.run(
            MyApplication.class,
            args
        );

EmployeeService service =
        context.getBean(EmployeeService.class);`
      },

      bullets: [
        "Manages Spring beans.",
        "Resolves dependencies.",
        "Supports configuration.",
        "Supports application events.",
        "Provides access to managed beans."
      ]
    },

    {
      id: "loose-coupling",
      title: "Loose Coupling",

      paragraphs: [
        "Loose coupling means that classes have minimal direct dependency on concrete implementations.",
        "Spring encourages loose coupling through Dependency Injection and programming to interfaces.",
        "This makes implementations easier to replace and classes easier to test."
      ],

      code: {
        language: "java",
        code: `interface NotificationService {

    void send(String message);
}


@Service
class EmailNotificationService
        implements NotificationService {

    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}


class OrderService {

    private final NotificationService notificationService;

    public OrderService(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }
}`
      },

      bullets: [
        "OrderService depends on an interface.",
        "The implementation can be changed.",
        "Testing can use a mock or fake implementation.",
        "The business class does not need to construct the concrete implementation itself."
      ]
    },

    {
      id: "spring-architecture",
      title: "High-Level Spring Architecture",

      code: {
        language: "text",
        code: `Spring Application
        |
        +----------------------+
        |                      |
        ↓                      ↓
   Spring Core            Spring Context
        |                      |
        +----------+-----------+
                   |
                   ↓
             IoC Container
                   |
       +-----------+-----------+
       |           |           |
       ↓           ↓           ↓
     Beans    Dependency    Lifecycle
              Injection      Management

Other Spring Modules
       |
       +-- Spring MVC
       +-- Spring AOP
       +-- Spring Data
       +-- Transactions
       +-- Security Integration`
      }
    },

    {
      id: "spring-modules",
      title: "Major Spring Modules",

      bullets: [
        "Spring Core — IoC and Dependency Injection.",
        "Spring Context — ApplicationContext and bean management.",
        "Spring Beans — Bean creation and lifecycle.",
        "Spring AOP — Aspect-oriented programming.",
        "Spring Web MVC — Web and REST application development.",
        "Spring Data — Simplifies data-access development.",
        "Spring Security — Authentication and authorization.",
        "Spring Test — Testing support."
      ]
    },

    {
      id: "spring-mvc",
      title: "Spring MVC",

      paragraphs: [
        "Spring MVC is the Spring web framework used to build web applications and REST APIs.",
        "It follows the Model-View-Controller architectural pattern and provides components for handling HTTP requests."
      ],

      code: {
        language: "text",
        code: `Client
  ↓
HTTP Request
  ↓
DispatcherServlet
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
  ↓
HTTP Response`
      },

      bullets: [
        "Handles HTTP requests.",
        "Supports controllers.",
        "Supports request mapping.",
        "Supports request and response data binding.",
        "Can be used to build REST APIs."
      ]
    },

    {
      id: "spring-aop",
      title: "Spring AOP",

      paragraphs: [
        "Aspect-Oriented Programming helps separate cross-cutting concerns from core business logic.",
        "Cross-cutting concerns are behaviors that can affect multiple parts of an application, such as logging, security checks, and transaction-related behavior."
      ],

      code: {
        language: "text",
        code: `Business Method
      |
      +---- Logging
      |
      +---- Security
      |
      +---- Transaction
      |
      +---- Monitoring`
      },

      bullets: [
        "Separates cross-cutting concerns.",
        "Can reduce duplicated infrastructure logic.",
        "Commonly used with logging, transactions, and other infrastructure concerns."
      ]
    },

    {
      id: "spring-transactions",
      title: "Spring Transaction Management",

      paragraphs: [
        "Spring provides transaction management abstractions that allow application code to work with transactions without tightly coupling business logic to a specific transaction-management implementation.",
        "The @Transactional annotation is commonly used in Spring applications to define transaction boundaries."
      ],

      code: {
        language: "java",
        code: `@Service
public class TransferService {

    @Transactional
    public void transferMoney() {

        // debit account

        // credit account
    }
}`
      },

      bullets: [
        "Defines transaction boundaries.",
        "Helps maintain database consistency.",
        "Can coordinate transactional operations through Spring's transaction infrastructure."
      ]
    },

    {
      id: "spring-data",
      title: "Spring Data",

      paragraphs: [
        "Spring Data is a family of projects that simplifies data-access development.",
        "Spring Data JPA is commonly used with relational databases and JPA-based persistence."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      bullets: [
        "Simplifies repository development.",
        "Supports different data-access technologies through different Spring Data projects.",
        "Spring Data JPA is commonly used with relational databases."
      ]
    },

    {
      id: "spring-security",
      title: "Spring Security",

      paragraphs: [
        "Spring Security provides security infrastructure for authentication, authorization, and protection of application resources.",
        "It can be used with different authentication mechanisms depending on the application's requirements."
      ],

      bullets: [
        "Authentication.",
        "Authorization.",
        "Request security.",
        "Method-level security.",
        "Integration with different authentication mechanisms."
      ]
    },

    {
      id: "spring-test",
      title: "Spring Testing Support",

      paragraphs: [
        "Spring provides testing support for testing Spring-managed components and application contexts.",
        "Spring Boot builds on this ecosystem and provides convenient testing support for Boot applications."
      ],

      code: {
        language: "java",
        code: `@SpringBootTest
class EmployeeApplicationTests {

    @Test
    void contextLoads() {
    }
}`
      },

      bullets: [
        "Supports Spring application-context testing.",
        "Can be combined with JUnit.",
        "Supports testing Spring-managed components."
      ]
    },

    {
      id: "spring-request-flow",
      title: "Example: Request Flow in a Spring Application",

      paragraphs: [
        "Consider an Employee Management REST API. A client sends an HTTP request to retrieve an employee.",
        "Spring MVC handles the web request while dependency injection connects the controller, service, and repository components."
      ],

      code: {
        language: "text",
        code: `Client
  |
  | GET /employees/10
  ↓
DispatcherServlet
  ↓
EmployeeController
  ↓
EmployeeService
  ↓
EmployeeRepository
  ↓
Database
  ↓
EmployeeRepository
  ↓
EmployeeService
  ↓
EmployeeController
  ↓
JSON Response
  ↓
Client`
      }
    },

    {
      id: "spring-vs-java",
      title: "Spring vs Plain Java",

      paragraphs: [
        "Spring does not replace Java. Spring is a framework written for Java applications and provides infrastructure on top of the Java platform.",
        "A Java application can be built without Spring, but Spring provides abstractions and infrastructure that can simplify development of larger applications."
      ],

      bullets: [
        "Java → programming language and platform ecosystem.",
        "Spring → application framework for Java.",
        "Spring Boot → simplifies building and running Spring applications."
      ]
    },

    {
      id: "spring-vs-spring-boot-preview",
      title: "Spring and Spring Boot Relationship",

      paragraphs: [
        "Spring Framework provides the core application infrastructure, while Spring Boot simplifies the setup and execution of applications using Spring."
      ],

      code: {
        language: "text",
        code: `Java
  ↓
Spring Framework
  |
  +-- IoC / DI
  +-- MVC
  +-- AOP
  +-- Transactions
  +-- Data Access
  |
  ↓
Spring Boot
  |
  +-- Auto-Configuration
  +-- Starter Dependencies
  +-- Embedded Server
  +-- Externalized Configuration
  +-- Production Features`
      },

      bullets: [
        "Spring is the underlying framework.",
        "Spring Boot builds on the Spring ecosystem.",
        "Learning Spring fundamentals makes Spring Boot easier to understand."
      ]
    },

    {
      id: "common-misconceptions",
      title: "Common Misconceptions",

      bullets: [
        "Spring is not a programming language.",
        "Spring is not the same thing as Spring Boot.",
        "Dependency Injection is a concept, while Spring provides an implementation and infrastructure for it.",
        "IoC and Dependency Injection are related but not exactly identical terms.",
        "Spring does not automatically create business logic.",
        "Every object in a Java application is not automatically a Spring bean.",
        "Spring does not mean that every class must use annotations.",
        "Spring Boot does not replace the need to understand Spring fundamentals.",
        "Spring Security is not the same as authentication only; it also provides authorization and other security infrastructure."
      ]
    },

    {
      id: "important-concepts",
      title: "Important Concepts to Remember",

      bullets: [
        "Spring Container → manages Spring beans.",
        "Bean → object managed by the Spring container.",
        "IoC → transfers object-management responsibility to the container.",
        "DI → supplies dependencies to objects.",
        "ApplicationContext → commonly used Spring IoC container interface.",
        "Component Scanning → discovers eligible Spring components.",
        "Configuration → tells Spring how application components should be assembled.",
        "Loose Coupling → reduces direct dependency on concrete implementations."
      ]
    },

    {
      id: "spring-interview",
      title: "Spring Interview Questions",

      interviewQuestions: [
        {
          question: "What is Spring?",
          answer:
            "Spring is an open-source Java framework used to build modular, maintainable, and enterprise applications."
        },
        {
          question: "Why is Spring used?",
          answer:
            "Spring simplifies application development by providing features such as Dependency Injection, IoC, transaction management, web development, and integration support."
        },
        {
          question: "What is IoC?",
          answer:
            "Inversion of Control means that the responsibility for creating and managing application objects is transferred from application code to the Spring container."
        },
        {
          question: "What is Dependency Injection?",
          answer:
            "Dependency Injection is a technique where an object's dependencies are provided to it instead of the object creating those dependencies itself."
        },
        {
          question: "What is ApplicationContext?",
          answer:
            "ApplicationContext is a Spring container that manages beans and provides features such as dependency injection, configuration, events, and resource management."
        },
        {
          question: "What is a Spring bean?",
          answer:
            "A Spring bean is an object that is instantiated, assembled, and managed by the Spring IoC container."
        },
        {
          question: "What is the Spring IoC container?",
          answer:
            "The Spring IoC container is responsible for creating, configuring, assembling, and managing Spring beans and their dependencies."
        },
        {
          question: "What is loose coupling?",
          answer:
            "Loose coupling means reducing direct dependencies between components, often by depending on abstractions and injecting implementations."
        },
        {
          question: "What is the difference between IoC and DI?",
          answer:
            "IoC is the broader principle of transferring control of object creation or management away from application code. Dependency Injection is one important technique used to implement IoC."
        },
        {
          question: "What is Spring MVC?",
          answer:
            "Spring MVC is Spring's web framework for handling HTTP requests and building web applications and REST APIs."
        },
        {
          question: "What is Spring AOP?",
          answer:
            "Spring AOP provides support for separating cross-cutting concerns such as logging, security-related behavior, and transaction-related behavior from core business logic."
        },
        {
          question: "What is the purpose of Spring transaction management?",
          answer:
            "Spring transaction management provides abstractions for defining and managing transaction boundaries so that database operations can be handled consistently."
        },
        {
          question: "What is the role of Spring Data?",
          answer:
            "Spring Data simplifies data-access development by providing repository abstractions for different data technologies, including Spring Data JPA for relational persistence."
        },
        {
          question: "What is the difference between Spring and Spring Boot?",
          answer:
            "Spring provides the core application framework, while Spring Boot builds on Spring and simplifies project setup through features such as auto-configuration, starter dependencies, and embedded server support."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your interviewer asks why a service should not create its repository using new. What would you say?",
          answer:
            "Creating the repository directly tightly couples the service to object creation. With Dependency Injection, the repository can be provided by Spring, which improves separation of responsibilities, testability, and flexibility."
        },
        {
          question:
            "You have PaymentService that depends on PaymentRepository. How would Spring connect them?",
          answer:
            "If PaymentRepository is a Spring-managed bean, Spring discovers or registers it and injects it into PaymentService, commonly through constructor injection."
        },
        {
          question:
            "What happens when Spring Boot starts an application containing @Service and @Repository classes?",
          answer:
            "During application startup, Spring creates the application context, performs component scanning where configured, registers eligible components as beans, resolves their dependencies, and manages their lifecycle."
        },
        {
          question:
            "Why does constructor injection make testing easier?",
          answer:
            "The dependency is explicit in the constructor, so a test can directly provide a mock or fake implementation without requiring the Spring container."
        },
        {
          question:
            "Can a Spring application exist without Spring Boot?",
          answer:
            "Yes. Spring Boot is built on the Spring ecosystem and provides a simplified way to configure and run Spring applications, but the Spring Framework can be used independently."
        },
        {
          question:
            "Why is loose coupling important in enterprise applications?",
          answer:
            "Loose coupling makes components easier to change, replace, test, and maintain because classes are less dependent on specific implementations."
        },
        {
          question:
            "What would happen if Spring cannot find a required dependency?",
          answer:
            "Application startup can fail because Spring cannot create or wire the required bean dependency. The exact exception depends on the configuration and failure."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Spring Quick Reference",

      code: {
        language: "text",
        code: `SPRING FRAMEWORK

        ↓

IoC Container
        ↓
Creates and manages Beans
        ↓
Injects Dependencies
        ↓
Manages Bean Lifecycle


CORE CONCEPTS

IoC
↓
Control moves to container

DI
↓
Dependencies are provided to objects

Bean
↓
Object managed by Spring

ApplicationContext
↓
Spring IoC container interface


MAJOR FEATURES

Spring Core
Spring Context
Spring Beans
Spring AOP
Spring MVC
Spring Data
Spring Security
Spring Test
Transaction Management`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "Spring is an open-source Java application framework that provides infrastructure for building modular and maintainable applications. Its most important foundation is the IoC container and Dependency Injection."
      ],

      bullets: [
        "Spring is a Java application framework.",
        "Spring promotes loosely coupled design.",
        "IoC means control of object creation and management is transferred to the container.",
        "DI means dependencies are supplied to an object.",
        "Spring manages objects called beans.",
        "ApplicationContext is a commonly used Spring IoC container interface.",
        "Constructor injection is generally preferred for required dependencies.",
        "Spring MVC handles web and REST application development.",
        "Spring AOP addresses cross-cutting concerns.",
        "Spring provides transaction-management abstractions.",
        "Spring Data simplifies data-access development.",
        "Spring Security provides security infrastructure.",
        "Spring Test provides testing support.",
        "Spring Boot builds on Spring and simplifies its configuration and execution.",
        "Understanding Spring fundamentals is essential for understanding Spring Boot."
      ]
    }
  ]
};
