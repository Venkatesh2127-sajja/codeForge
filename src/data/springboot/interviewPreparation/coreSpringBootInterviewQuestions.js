
export const coreSpringBootInterviewQuestions = {
  id: 1601,
  title: "Core Spring Boot Interview Questions",
  slug: "core-spring-boot-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Revise Spring, Spring Boot, auto-configuration, embedded servers, starters, and application startup.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "fundamentals",
      title: "1. Fundamental Spring Boot Interview Questions",
      paragraphs: [
        "Interviewers commonly begin by asking why Spring Boot is used, how it differs from the Spring Framework, and how a Spring Boot application starts. A strong answer should define the concept, explain the problem it solves, and provide a practical example.",
        "Spring Boot is built on the Spring Framework. It reduces repetitive configuration and makes it easier to create standalone, production-oriented applications. It does not replace Spring's dependency injection, Spring MVC, transaction management, or data-access capabilities.",
        "For example, a developer building a REST API can add the Spring Boot web starter, create a controller, and run the application through its main method. In a typical Spring MVC application, the embedded servlet container starts as part of the application."
      ],
      interviewQuestions: [
        {
          question: "1. What is Spring Boot?",
          answer: "Spring Boot is a framework built on the Spring Framework that simplifies application development through auto-configuration, starter dependencies, externalized configuration, and convenient application packaging. It helps developers build standalone, production-oriented applications with less manual setup. For example, we can create a REST API using Spring MVC and run it with an embedded Tomcat server."
        },
        {
          question: "2. What is the difference between Spring and Spring Boot?",
          answer: "Spring provides core features such as dependency injection, Spring MVC, transaction management, and data access. Spring Boot builds on Spring and reduces configuration work through conventions, starter dependencies, and conditional auto-configuration. Spring applications can be configured manually, whereas Spring Boot provides sensible defaults that can be customized when required."
        },
        {
          question: "3. What are the main advantages of Spring Boot?",
          answer: "Its main advantages are reduced configuration, starter dependencies, auto-configuration, embedded servers, externalized configuration, executable JAR packaging, and operational features through Actuator. These capabilities improve development productivity. They do not eliminate the need for good application design, testing, security, or performance tuning."
        },
        {
          question: "4. What is auto-configuration?",
          answer: "Auto-configuration conditionally configures Spring beans based on available classes, existing beans, application properties, and other conditions. For example, when the appropriate web dependencies are present, Spring Boot can configure infrastructure for a web application. Developers can override many defaults by defining their own beans or changing configuration properties."
        },
        {
          question: "5. What is a Spring Boot starter?",
          answer: "A starter is a convenient dependency descriptor that brings together libraries commonly needed for a feature. For example, spring-boot-starter-web brings together dependencies commonly used to build Spring MVC applications. Starters simplify dependency management, while Spring Boot's dependency management helps align compatible library versions."
        },
        {
          question: "6. What is an embedded server?",
          answer: "An embedded server runs inside the application process. A typical Spring MVC application using the web starter uses embedded Tomcat by default, unless the server dependency is changed. The application can be packaged as an executable JAR and started using java -jar instead of being deployed to a separately managed servlet container."
        },
        {
          question: "7. What is the difference between an executable JAR and a WAR?",
          answer: "An executable Spring Boot JAR commonly includes application classes, dependencies, and the loader needed to start the application with an embedded server. A WAR is a web application archive that can be deployed to a compatible servlet container; Spring Boot also supports executable WAR deployments. The appropriate packaging depends on the deployment environment."
        },
        {
          question: "8. Does Spring Boot eliminate XML configuration?",
          answer: "No. Spring Boot supports Java-based configuration, annotations, properties, YAML, and XML where appropriate. Modern Spring Boot applications commonly prefer Java configuration and externalized properties because they are easier to maintain and integrate with automated deployments."
        },
        {
          question: "9. Is Spring Boot only used for microservices?",
          answer: "No. Spring Boot is used for monolithic applications, REST APIs, scheduled jobs, batch applications, and microservices. It is a development framework and does not force a particular deployment architecture."
        },
        {
          question: "10. What is convention over configuration?",
          answer: "Convention over configuration means the framework supplies sensible defaults for common situations, so developers only configure behavior that differs from those defaults. Spring Boot follows this principle through auto-configuration and default settings, while still allowing customization."
        }
      ]
    },
    {
      id: "spring-core",
      title: "2. Spring Core Concepts Used by Spring Boot",
      paragraphs: [
        "Spring Boot relies on the Spring container to create objects, inject dependencies, and manage bean lifecycles. Understanding these fundamentals is important because many Spring Boot features are built on them.",
        "A bean is an object managed by the Spring container. Dependency injection means that the container supplies the dependencies required by an object rather than requiring the object to create all dependencies itself.",
        "Component scanning discovers eligible classes annotated with stereotypes such as @Component, @Service, @Repository, and @Controller. Explicit configuration can also register beans through @Bean methods."
      ],
      code: {
        language: "java",
        code: "public interface NotificationService {\n    void send(String message);\n}\n\n@Service\npublic class EmailNotificationService implements NotificationService {\n    @Override\n    public void send(String message) {\n        System.out.println(\"Email notification: \" + message);\n    }\n}\n\n@Service\npublic class OrderService {\n    private final NotificationService notificationService;\n\n    public OrderService(NotificationService notificationService) {\n        this.notificationService = notificationService;\n    }\n\n    public void placeOrder() {\n        // Perform order business logic here.\n        notificationService.send(\"Order placed successfully\");\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "11. What is dependency injection?",
          answer: "Dependency injection is a design technique in which an object's dependencies are provided from outside instead of being constructed directly by that object. Spring manages this process through its application context. Constructor injection is generally preferred for required dependencies because it makes them explicit and simplifies testing."
        },
        {
          question: "12. What is a Spring bean?",
          answer: "A Spring bean is an object instantiated, configured, and managed by the Spring container. Beans can be registered through component scanning, @Bean methods, or other configuration mechanisms. The container can manage their dependencies and lifecycle."
        },
        {
          question: "13. What is the difference between @Component, @Service, @Repository, and @Controller?",
          answer: "@Component is a general-purpose stereotype. @Service expresses a service-layer role, @Repository expresses a persistence-layer role and participates in persistence exception translation, and @Controller identifies a Spring MVC controller. These specialized annotations communicate intent and integrate with framework behavior where applicable."
        },
        {
          question: "14. What is the difference between @Bean and @Component?",
          answer: "@Component is placed on a class that should be discovered through component scanning. @Bean is placed on a method in a configuration class, and the returned object becomes a Spring-managed bean. @Bean is particularly useful for registering third-party classes that cannot be annotated directly."
        },
        {
          question: "15. Why is constructor injection preferred?",
          answer: "Constructor injection makes required dependencies explicit, supports final fields, and allows a class to be instantiated easily in unit tests. It also makes missing dependencies apparent during application startup. It is usually preferable to field injection for required dependencies."
        },
        {
          question: "16. What is the Spring IoC container?",
          answer: "IoC means Inversion of Control. The Spring container manages object creation, dependency wiring, and bean lifecycle rather than leaving every class responsible for creating all its collaborators. ApplicationContext is the commonly used container interface in Spring Boot applications."
        },
        {
          question: "17. What is component scanning?",
          answer: "Component scanning searches configured packages for eligible component classes and registers them as beans. By default, @SpringBootApplication uses the package of the main application class as the base package for scanning. Placing the main class in a suitable root package helps ensure application components are discovered."
        },
        {
          question: "18. What happens if two beans implement the same interface?",
          answer: "If Spring cannot determine a unique candidate for an injection point, application startup may fail with a NoUniqueBeanDefinitionException. You can use @Qualifier to select a named candidate or @Primary to define a preferred candidate."
        }
      ]
    },
    {
      id: "startup",
      title: "3. Application Startup and Configuration",
      paragraphs: [
        "The @SpringBootApplication annotation combines @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan. The main method calls SpringApplication.run to bootstrap the application.",
        "During startup, Spring Boot prepares the environment, loads configuration properties, determines the application context type, registers configuration classes, processes auto-configuration, creates and initializes beans, and refreshes the application context. For a web application, the embedded server is initialized as part of the web application context lifecycle.",
        "The exact startup sequence contains additional framework-specific steps and can vary with the application type and Spring Boot version. For interview answers, explain the major stages instead of claiming that every bean is fully initialized before any web infrastructure is created.",
        "Configuration values can come from application.properties, application.yml, environment variables, command-line arguments, and other supported property sources. Higher-precedence property sources can override lower-precedence defaults."
      ],
      code: {
        language: "java",
        code: "@SpringBootApplication\npublic class CodeForgeApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(CodeForgeApplication.class, args);\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "19. What does @SpringBootApplication combine?",
          answer: "It combines @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan. @SpringBootConfiguration identifies the primary configuration class, @EnableAutoConfiguration enables conditional Boot configuration, and @ComponentScan discovers application components."
        },
        {
          question: "20. What happens when SpringApplication.run executes?",
          answer: "Spring Boot prepares the application environment, creates the appropriate application context, loads configuration and bean definitions, processes auto-configuration, refreshes the context, initializes required beans, and starts the necessary infrastructure such as the embedded web server. It also publishes lifecycle events during startup."
        },
        {
          question: "21. What is the role of the main application class?",
          answer: "The main application class provides the entry point for the Java process and usually serves as the primary Spring Boot configuration class. Keeping it in a root package helps component scanning discover application components in subpackages."
        },
        {
          question: "22. How do you change the server port?",
          answer: "Set server.port in application.properties or application.yml, or provide the SERVER_PORT environment variable. For example, server.port: 8081 in YAML configures the application to use port 8081, provided that the port is available."
        },
        {
          question: "23. What is externalized configuration?",
          answer: "Externalized configuration keeps environment-specific settings outside the compiled application code. The same artifact can then run in development, testing, and production with different database URLs, server ports, or feature settings. Sensitive values should come from a protected secret-management mechanism."
        },
        {
          question: "24. What is the difference between application.properties and application.yml?",
          answer: "Both formats configure Spring Boot properties. Properties files use key-value entries, while YAML supports a nested structure that can be easier to read for grouped configuration. They serve the same general purpose, and teams can choose a consistent format."
        },
        {
          question: "25. How do you activate a Spring profile?",
          answer: "You can configure spring.profiles.active in an appropriate property source or set the SPRING_PROFILES_ACTIVE environment variable. Profiles allow environment-specific beans and configuration, but they should not be used as a substitute for proper secret management."
        },
        {
          question: "26. What is a CommandLineRunner?",
          answer: "CommandLineRunner is an interface for code that should run after the application context has been created and the application has started. Its run method receives command-line arguments. It is useful for startup initialization but should not perform lengthy blocking work without considering startup readiness and failure behavior."
        }
      ]
    },
    {
      id: "auto-configuration",
      title: "4. Auto-Configuration Internals",
      paragraphs: [
        "Spring Boot auto-configuration uses conditional configuration classes to provide beans when the application has the appropriate dependencies and has not already supplied an overriding bean. It reduces repetitive setup while allowing customization.",
        "Conditions can check whether a class is available, whether a bean exists, whether a property has a particular value, or whether the application has a specific type of environment. Common annotations include @ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnBean, and @ConditionalOnProperty.",
        "For example, a web starter makes Spring MVC classes available. Auto-configuration can then configure relevant web infrastructure. Adding a dependency does not mean that every possible feature is activated; individual configurations still depend on their conditions.",
        "In Spring Boot 3, auto-configuration classes are commonly registered through META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Auto-configuration should use appropriate conditions and should back off when an application provides its own implementation."
      ],
      code: {
        language: "java",
        code: "@AutoConfiguration\n@ConditionalOnClass(NotificationClient.class)\npublic class NotificationAutoConfiguration {\n\n    @Bean\n    @ConditionalOnMissingBean\n    NotificationService notificationService(NotificationClient client) {\n        return new DefaultNotificationService(client);\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "27. How does auto-configuration work internally?",
          answer: "Spring Boot discovers registered auto-configuration classes and evaluates their conditions against the application environment, classpath, and existing bean definitions. Matching configurations contribute bean definitions to the application context. Conditions such as @ConditionalOnMissingBean allow user-defined beans to take precedence."
        },
        {
          question: "28. What is @ConditionalOnMissingBean?",
          answer: "It allows a bean definition to be applied only when a matching bean has not already been registered. This supports sensible defaults that can be replaced by application-specific implementations. The condition depends on the matching type or name and the bean definitions visible when it is evaluated."
        },
        {
          question: "29. What is @ConditionalOnClass?",
          answer: "It makes configuration conditional on the presence of a specified class on the classpath. It is useful when an optional library enables a feature. Auto-configuration can therefore remain inactive when the corresponding dependency is absent."
        },
        {
          question: "30. How can you debug auto-configuration?",
          answer: "Inspect the condition evaluation report, enable debug startup output when appropriate, and review the relevant auto-configuration classes and configuration properties. Actuator's conditions endpoint can also help when it is available and appropriately secured."
        },
        {
          question: "31. Can you override Spring Boot's auto-configured bean?",
          answer: "Often, yes. If the auto-configuration uses a condition such as @ConditionalOnMissingBean, defining a suitable application bean causes the default bean configuration to back off. Whether overriding is supported depends on the particular configuration and its conditions."
        },
        {
          question: "32. Where are auto-configuration classes registered in Spring Boot 3?",
          answer: "A library can list auto-configuration class names in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports, with one fully qualified class name per line. Spring Boot discovers these registered classes and evaluates their conditions."
        }
      ]
    },
    {
      id: "starters-and-server",
      title: "5. Starters and Embedded Servers",
      paragraphs: [
        "Starters simplify dependency selection. The web starter commonly brings Spring MVC and an embedded servlet container. Data-access starters bring the libraries and integrations needed for persistence, while the exact dependency set depends on the chosen starter and Spring Boot version.",
        "Spring Boot's dependency management helps align compatible versions. A starter is not itself the embedded server and does not start an application independently; it declares dependencies that the application uses.",
        "For traditional Spring MVC applications, Tomcat is the default embedded servlet container when supplied by the usual web starter. Jetty or Undertow may be selected through supported dependency changes. Reactive WebFlux applications have a different web stack and commonly use Reactor Netty by default."
      ],
      interviewQuestions: [
        {
          question: "33. What is the difference between a starter and auto-configuration?",
          answer: "A starter is a dependency descriptor that brings together libraries for a feature. Auto-configuration is runtime configuration logic that conditionally registers beans based on the available dependencies, properties, and existing beans. Starters often make the classes needed by auto-configuration available."
        },
        {
          question: "34. Which embedded server does Spring Boot use by default?",
          answer: "A typical Spring MVC application using spring-boot-starter-web uses embedded Tomcat by default. The server can be changed through dependency configuration. WebFlux applications commonly use Reactor Netty by default, so the answer depends on the application stack."
        },
        {
          question: "35. Can an embedded server be replaced?",
          answer: "Yes. For a servlet application, you can exclude the default server dependency and include a supported alternative such as Jetty, while ensuring the dependency versions remain compatible. Reactive and servlet servers are not interchangeable without considering the web application type."
        },
        {
          question: "36. How does an embedded Tomcat server receive a REST request?",
          answer: "Tomcat accepts the HTTP connection and processes the servlet request. The request reaches Spring MVC's DispatcherServlet, which uses handler mappings to find the appropriate controller method. Spring resolves request parameters and the body, invokes the handler, and writes the response through the servlet infrastructure."
        }
      ]
    },
    {
      id: "actuator-and-production",
      title: "6. Actuator and Production Readiness",
      paragraphs: [
        "Spring Boot Actuator provides operational features such as health information, metrics integration, and application information. The available endpoints depend on dependencies, configuration, and application setup.",
        "Production readiness also includes structured logging, resource limits, database pool configuration, HTTP timeouts, security, graceful shutdown, and deployment monitoring. Actuator alone does not make an application production-ready.",
        "Management endpoints must be exposed deliberately. Do not expose sensitive endpoints publicly simply because they are available. Restrict network access and apply authentication and authorization appropriate to the deployment."
      ],
      code: {
        language: "yaml",
        code: "management:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,metrics\n  endpoint:\n    health:\n      show-details: when-authorized"
      },
      interviewQuestions: [
        {
          question: "37. What is Spring Boot Actuator?",
          answer: "Actuator provides application management and monitoring capabilities, including health and metrics endpoints. It integrates with Micrometer and supported monitoring systems. Endpoints should be selected and secured according to operational requirements."
        },
        {
          question: "38. What is the difference between liveness and readiness?",
          answer: "Liveness indicates whether a process should continue running or be restarted. Readiness indicates whether an instance should receive traffic. They serve different purposes and should be configured to avoid unnecessary restarts during dependency outages."
        },
        {
          question: "39. How do you secure Actuator endpoints?",
          answer: "Expose only the required endpoints, restrict management access through network controls, and apply authentication and authorization. Avoid publishing sensitive health details, environment information, or operational endpoints to unauthenticated users."
        },
        {
          question: "40. What should you configure before deploying a Spring Boot application?",
          answer: "Configure externalized settings, secret management, security, database connection pools, HTTP timeouts, logging, health checks, monitoring, graceful shutdown, resource limits, and automated tests. Also establish rollback, backup, and recovery procedures appropriate to the application."
        }
      ]
    },
    {
      id: "common-mistakes",
      title: "7. Common Interview Mistakes",
      bullets: [
        "Saying Spring Boot replaces the Spring Framework instead of explaining that it builds on Spring.",
        "Claiming auto-configuration creates every possible bean regardless of dependencies or conditions.",
        "Confusing a starter dependency with a running server or a runtime configuration class.",
        "Claiming all Spring Boot applications use Tomcat, ignoring reactive applications and dependency changes.",
        "Saying Spring Boot removes the need for configuration, testing, or security.",
        "Assuming that adding Actuator automatically secures management endpoints.",
        "Placing the main application class in a package that prevents component scanning from discovering intended components.",
        "Using field injection without considering constructor injection and testability.",
        "Exposing JPA entities directly without considering API contracts and lazy-loading behavior.",
        "Giving only definitions without a practical example or explaining the problem each feature solves."
      ]
    },
    {
      id: "interview-answer-framework",
      title: "8. How to Structure an Interview Answer",
      paragraphs: [
        "For a technical interview, organize most answers into four parts: definition, purpose, internal working, and practical example. Add a limitation or best practice when it helps demonstrate deeper understanding.",
        "For example, when asked about auto-configuration, define it as conditional bean configuration, explain that it reduces manual setup, describe how conditions inspect the classpath, properties, and existing beans, and then give a practical web-starter example.",
        "Avoid memorizing long paragraphs word for word. Understand the concept well enough to explain it naturally, draw a simple flow, and answer follow-up questions."
      ],
      bullets: [
        "Definition: What is the concept?",
        "Purpose: What problem does it solve?",
        "Working: How does it operate internally?",
        "Example: Where have you used it or how would you use it?",
        "Best practice: What limitation or production concern should you know?"
      ]
    },
    {
      id: "quick-revision",
      title: "9. Quick Revision Notes",
      paragraphs: [
        "Spring Boot builds on Spring and simplifies application setup through auto-configuration, starter dependencies, externalized configuration, and convenient packaging.",
        "@SpringBootApplication combines @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan. SpringApplication.run bootstraps the application context and starts required infrastructure.",
        "Dependency injection is managed by the Spring container. Constructor injection is generally preferred for required dependencies. Auto-configuration is conditional and can often back off when application-provided beans exist.",
        "Starters simplify dependency selection. Embedded servers allow standalone execution. Actuator supports health and metrics, but production readiness also requires security, testing, monitoring, and operational planning."
      ],
      bullets: [
        "Spring Framework: core infrastructure and programming model.",
        "Spring Boot: conventions, auto-configuration, starters, and packaging.",
        "IoC container: creates and manages Spring beans.",
        "Dependency injection: supplies required dependencies.",
        "@SpringBootApplication: configuration + auto-configuration + component scanning.",
        "Auto-configuration: conditional bean registration.",
        "Starter: convenient dependency descriptor.",
        "Embedded server: runs inside the application process.",
        "Actuator: operational endpoints and monitoring integration.",
        "Production readiness: security, tests, monitoring, resource limits, and recovery."
      ]
    }
  ]
};
