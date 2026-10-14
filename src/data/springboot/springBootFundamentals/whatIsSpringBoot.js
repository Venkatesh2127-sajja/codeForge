
export const whatIsSpringBoot = {
  id: "what-is-spring-boot",
  title: "What is Spring Boot?",
  slug: "what-is-spring-boot",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "20 min",

  description:
    "Understand Spring Boot, why it was created, how it simplifies Spring application development, and what happens when a Spring Boot application starts.",

  sections: [
    {
      id: "spring-boot-introduction",
      title: "What is Spring Boot?",

      paragraphs: [
        "Spring Boot is a project built on top of the Spring Framework that simplifies the development and deployment of Spring applications.",
        "It provides conventions, auto-configuration, starter dependencies, an embedded web server, and production-oriented features that reduce the amount of manual configuration required.",
        "Spring Boot is not a replacement for the Spring Framework. It uses Spring's core capabilities and provides a more convenient way to configure and run applications.",
        "The main goal is to let developers create production-oriented Spring applications with less repetitive setup."
      ],

      bullets: [
        "Spring Boot simplifies Spring application development.",
        "It provides auto-configuration.",
        "It provides starter dependencies.",
        "It supports embedded servers.",
        "It provides production-ready features.",
        "It makes Spring applications easier to run as standalone applications.",
        "It supports externalized configuration.",
        "It integrates with the wider Spring ecosystem."
      ]
    },

    {
      id: "spring-boot-problem",
      title: "What problem does Spring Boot solve?",

      paragraphs: [
        "Traditional Spring applications could require substantial configuration for dependencies, web infrastructure, database configuration, and application setup.",
        "Spring Boot reduces this configuration by applying sensible defaults and automatically configuring components based on the dependencies present in the application.",
        "This does not mean that Spring Boot removes configuration completely. Instead, it handles many common setup tasks automatically while still allowing developers to customize the application."
      ],

      code: {
        language: "text",
        code: `Traditional Spring Application

Choose dependencies
        ↓
Configure infrastructure
        ↓
Configure beans
        ↓
Configure web application
        ↓
Configure deployment
        ↓
Run application


Spring Boot

Choose starters
        ↓
Spring Boot evaluates configuration
        ↓
Auto-configuration
        ↓
Embedded server
        ↓
Run application`
      }
    },

    {
      id: "spring-boot-before-after",
      title: "Spring Before and Spring Boot",

      paragraphs: [
        "Spring Boot does not change the fundamental Spring programming model. It mainly improves the setup and developer experience.",
        "You still use Spring concepts such as dependency injection, beans, controllers, services, repositories, transactions, and application contexts."
      ],

      code: {
        language: "text",
        code: `Spring Framework
        ↓
IoC Container
Dependency Injection
Spring MVC
Transactions
Data Access
        ↓
Developer configures application


Spring Boot
        ↓
Spring Framework
        +
Starter Dependencies
        +
Auto-Configuration
        +
Embedded Server
        +
Externalized Configuration
        ↓
Simplified Spring Application`
      }
    },

    {
      id: "spring-boot-features",
      title: "Major Spring Boot Features",

      bullets: [
        "Auto-configuration",
        "Starter dependencies",
        "Embedded Tomcat, Jetty, or Undertow support",
        "Standalone application execution",
        "Externalized configuration",
        "Spring Boot Actuator",
        "Production-ready monitoring features",
        "Convention over configuration"
      ],

      paragraphs: [
        "These features work together to reduce repetitive configuration and make common Spring application development tasks easier."
      ]
    },

    {
      id: "auto-configuration",
      title: "Spring Boot Auto-Configuration",

      paragraphs: [
        "Auto-configuration is one of the most important Spring Boot features.",
        "Spring Boot examines the application's classpath, configuration, and available beans and conditionally configures common application infrastructure.",
        "For example, when appropriate web dependencies are present, Spring Boot can configure the infrastructure required for a web application.",
        "Auto-configuration is condition-based. It does not blindly configure every possible feature."
      ],

      code: {
        language: "text",
        code: `Add Spring Web
      ↓
Spring Web dependencies available
      ↓
Spring Boot evaluates conditions
      ↓
Relevant web auto-configuration
      ↓
Spring MVC infrastructure
      ↓
Web application starts`
      },

      bullets: [
        "Auto-configuration is condition-based.",
        "Classpath dependencies influence which auto-configurations are considered.",
        "Application configuration can influence auto-configuration.",
        "Existing user-defined beans can affect or override default configuration.",
        "Developers can customize Boot's defaults when required."
      ]
    },

    {
      id: "starter-dependencies",
      title: "Starter Dependencies",

      paragraphs: [
        "Spring Boot starters are convenient dependency descriptors that group commonly required libraries for a particular application capability.",
        "Instead of manually searching for every library required for a typical web application, developers can use a starter."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>`
      },

      bullets: [
        "Simplify dependency selection.",
        "Provide a consistent set of commonly required libraries.",
        "Reduce repetitive Maven or Gradle configuration.",
        "Work with Spring Boot's dependency management."
      ]
    },

    {
      id: "starter-example",
      title: "Example: Spring Web Starter",

      paragraphs: [
        "Suppose you want to build a REST API. Spring Boot's web starter provides the common web dependencies needed for a Spring MVC application."
      ],

      code: {
        language: "text",
        code: `spring-boot-starter-web
        ↓
Spring MVC
        +
JSON support
        +
Embedded servlet web server support
        +
Other common web dependencies
        ↓
REST API Application`
      },

      bullets: [
        "Used commonly for REST APIs.",
        "Provides Spring MVC web functionality.",
        "Works with Spring Boot's auto-configuration.",
        "Makes the web dependency setup simpler."
      ]
    },

    {
      id: "embedded-server",
      title: "Embedded Server",

      paragraphs: [
        "Spring Boot supports embedded web servers for web applications.",
        "This means the application can commonly be packaged as an executable JAR containing the application and the required server runtime instead of requiring deployment as a WAR file to a separately installed application server.",
        "Tomcat is a common embedded servlet container used by Spring Boot web applications. Other supported server choices can also be used depending on the application configuration."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        +
Embedded Server
        ↓
Executable JAR
        ↓
java -jar application.jar
        ↓
Web Application Running`
      },

      bullets: [
        "Simplifies application execution.",
        "Useful for standalone deployments.",
        "Reduces manual server setup for common applications.",
        "Tomcat is a common default choice for servlet-based Spring Boot web applications."
      ]
    },

    {
      id: "standalone-application",
      title: "Standalone Spring Boot Application",

      paragraphs: [
        "A Spring Boot application can commonly be packaged as an executable JAR and started directly using the Java command.",
        "This is one of the major reasons Spring Boot applications are convenient to develop and deploy."
      ],

      code: {
        language: "bash",
        code: `mvn clean package

java -jar target/my-application.jar`
      },

      output: `Maven builds the project
        ↓
Executable JAR is created
        ↓
java -jar starts the application
        ↓
Spring Boot starts
        ↓
Application becomes ready`
    },

    {
      id: "spring-boot-example",
      title: "Simple Spring Boot Application",

      code: {
        language: "java",
        code: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(
                Application.class,
                args
        );
    }
}`
      },

      paragraphs: [
        "SpringApplication.run() starts the Spring application and creates the Spring ApplicationContext.",
        "@SpringBootApplication enables important Spring Boot configuration for the application.",
        "For a web application, the startup process also initializes the web infrastructure and embedded server when the required web dependencies are present."
      ]
    },

    {
      id: "spring-boot-application-annotation",
      title: "What does @SpringBootApplication do?",

      paragraphs: [
        "@SpringBootApplication is a convenience annotation that combines three important Spring annotations conceptually."
      ],

      code: {
        language: "text",
        code: `@SpringBootApplication

Conceptually represents:

@SpringBootConfiguration
        +
@EnableAutoConfiguration
        +
@ComponentScan`
      },

      bullets: [
        "@SpringBootConfiguration → identifies the primary Spring Boot configuration class.",
        "@EnableAutoConfiguration → enables Spring Boot auto-configuration.",
        "@ComponentScan → enables component scanning from the application's package hierarchy."
      ]
    },

    {
      id: "spring-boot-startup",
      title: "Spring Boot Application Startup Flow",

      paragraphs: [
        "When SpringApplication.run() is called, Spring Boot bootstraps the application context and initializes the application's infrastructure.",
        "For a web application, the process also includes starting the embedded web server."
      ],

      code: {
        language: "text",
        code: `main()
  ↓
SpringApplication.run()
  ↓
Create ApplicationContext
  ↓
Read configuration
  ↓
Perform component scanning
  ↓
Apply auto-configuration
  ↓
Create and configure beans
  ↓
Resolve dependencies
  ↓
Start embedded web server
  ↓
Application ready`
      },

      bullets: [
        "The main method starts the application.",
        "SpringApplication bootstraps Spring.",
        "The application context is created and refreshed.",
        "Beans are discovered and configured.",
        "Dependencies are resolved.",
        "Auto-configuration is applied where conditions match.",
        "The web server starts for web applications."
      ]
    },

    {
      id: "application-context",
      title: "ApplicationContext in Spring Boot",

      paragraphs: [
        "The ApplicationContext is the Spring container that manages application beans and their dependencies.",
        "Spring Boot creates and configures the appropriate application context during startup.",
        "Developers normally do not need to manually create the ApplicationContext in a standard Spring Boot application."
      ],

      code: {
        language: "text",
        code: `Spring Boot
    ↓
ApplicationContext
    ↓
+----------------------+
| Controllers           |
| Services              |
| Repositories          |
| Configuration Beans   |
| Other Components     |
+----------------------+
    ↓
Dependency Injection`
      }
    },

    {
      id: "component-scanning",
      title: "Component Scanning",

      paragraphs: [
        "Spring Boot applications commonly use component scanning to discover classes annotated with Spring stereotypes such as @Component, @Service, @Repository, @Controller, and @RestController.",
        "The package location of the main application class matters because the default component scan commonly starts from that package and searches its subpackages."
      ],

      code: {
        language: "text",
        code: `com.example.employee
        |
        +-- EmployeeApplication
        |
        +-- controller
        |      +-- EmployeeController
        |
        +-- service
        |      +-- EmployeeService
        |
        +-- repository
               +-- EmployeeRepository

@ComponentScan
        ↓
Discovers components
        ↓
Registers Spring Beans`
      }
    },

    {
      id: "externalized-configuration",
      title: "Externalized Configuration",

      paragraphs: [
        "Spring Boot supports externalized configuration so application settings do not have to be hard-coded into Java classes.",
        "Common configuration files include application.properties and application.yml."
      ],

      code: {
        language: "properties",
        code: `server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root`
      },

      bullets: [
        "Server port can be configured externally.",
        "Database connection properties can be configured externally.",
        "Different environments can use different configuration values.",
        "Production secrets should be managed securely rather than committed to source control."
      ]
    },

    {
      id: "convention-over-configuration",
      title: "Convention Over Configuration",

      paragraphs: [
        "Convention over configuration means the framework provides sensible defaults so developers do not need to explicitly configure every common behavior.",
        "Spring Boot follows this approach extensively while still allowing developers to override the defaults."
      ],

      code: {
        language: "text",
        code: `Developer
    ↓
Provides application requirements
    ↓
Spring Boot
    ↓
Applies sensible defaults
    ↓
Developer customizes only when needed`
      },

      bullets: [
        "Reduces repetitive configuration.",
        "Makes project setup faster.",
        "Provides predictable defaults.",
        "Still allows customization."
      ]
    },

    {
      id: "production-ready",
      title: "Production-Ready Features",

      paragraphs: [
        "Spring Boot integrates with production-oriented capabilities that help developers monitor and operate applications.",
        "Spring Boot Actuator is commonly used to expose health, metrics, and other operational information."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        ↓
Spring Boot Actuator
        ↓
Health
Metrics
Monitoring
Operational Information`
      },

      bullets: [
        "Health checks.",
        "Application metrics.",
        "Operational endpoints.",
        "Monitoring integration.",
        "Application information."
      ]
    },

    {
      id: "actuator",
      title: "Spring Boot Actuator",

      paragraphs: [
        "Spring Boot Actuator provides production-oriented endpoints and features for monitoring and managing a Spring Boot application.",
        "Actuator endpoints must be exposed and secured according to the application's operational and security requirements."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>`
      },

      bullets: [
        "Health information.",
        "Metrics.",
        "Application information.",
        "Operational monitoring.",
        "Integration with external monitoring systems."
      ]
    },

    {
      id: "spring-boot-rest-api",
      title: "Spring Boot for REST APIs",

      paragraphs: [
        "One of the most common uses of Spring Boot is building REST APIs.",
        "Spring Boot combines Spring MVC, dependency injection, validation, data access, security, and other Spring capabilities into a convenient application development model."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @GetMapping("/{id}")
    public String getEmployee(
            @PathVariable Long id) {

        return "Employee " + id;
    }
}`
      },

      bullets: [
        "@RestController handles REST requests.",
        "@GetMapping maps GET requests.",
        "@PathVariable reads values from the URL.",
        "A service layer can contain application or business logic.",
        "A repository can handle database persistence."
      ]
    },

    {
      id: "spring-boot-architecture",
      title: "Typical Spring Boot Application Architecture",

      code: {
        language: "text",
        code: `Client
  ↓
HTTP Request
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database

Spring Boot provides the
application infrastructure around these layers.

Spring Container
    ↓
Creates and manages beans
    ↓
Injects dependencies`
      },

      paragraphs: [
        "This layered architecture is a common approach for Spring Boot applications, although Spring Boot does not require every project to use exactly these layers."
      ]
    },

    {
      id: "spring-boot-benefits",
      title: "Benefits of Spring Boot",

      bullets: [
        "Faster project setup.",
        "Less repetitive configuration.",
        "Convenient dependency management.",
        "Auto-configuration.",
        "Embedded server support.",
        "Standalone executable applications.",
        "Externalized configuration.",
        "Easy integration with Spring projects.",
        "Testing support.",
        "Production monitoring support.",
        "Large ecosystem and community."
      ]
    },

    {
      id: "spring-boot-limitations",
      title: "Does Spring Boot Remove All Configuration?",

      paragraphs: [
        "No. Spring Boot reduces configuration but does not eliminate it.",
        "Real applications still require configuration for databases, security, external services, application-specific behavior, deployment environments, and other requirements.",
        "The advantage is that developers generally configure only what needs to differ from the framework's defaults."
      ],

      code: {
        language: "text",
        code: `Spring Boot

Default Configuration
        +
Application Configuration
        +
Developer Customization
        ↓
Final Application Configuration`
      }
    },

    {
      id: "common-mistakes",
      title: "Common Spring Boot Mistakes",

      bullets: [
        "Thinking Spring Boot is a replacement for Spring.",
        "Thinking auto-configuration means no configuration is ever required.",
        "Selecting every available dependency without understanding its purpose.",
        "Assuming Spring Security automatically implements JWT authentication.",
        "Putting production passwords directly in application.properties committed to source control.",
        "Putting the main application class in a package that does not properly cover application components.",
        "Changing framework defaults without understanding their effect.",
        "Using outdated dependencies without checking compatibility.",
        "Assuming the embedded server is the only possible deployment model.",
        "Ignoring Actuator endpoint security when exposing operational information."
      ]
    },

    {
      id: "important-concepts",
      title: "Important Concepts to Remember",

      bullets: [
        "Spring Boot is built on the Spring Framework.",
        "Spring Boot simplifies application setup.",
        "Auto-configuration is condition-based.",
        "Starter dependencies simplify dependency management.",
        "Embedded servers make standalone web applications convenient.",
        "@SpringBootApplication is a central Spring Boot annotation.",
        "SpringApplication.run() bootstraps the application.",
        "ApplicationContext manages Spring beans.",
        "Component scanning discovers eligible Spring components.",
        "Externalized configuration keeps application settings outside Java source code.",
        "Actuator provides production-oriented monitoring and management features."
      ]
    },

    {
      id: "spring-boot-interview",
      title: "Spring Boot Interview Questions",

      interviewQuestions: [
        {
          question: "What is Spring Boot?",
          answer:
            "Spring Boot is a Spring-based framework that simplifies application development through auto-configuration, starter dependencies, embedded servers, and production-oriented features."
        },
        {
          question: "What is the main advantage of Spring Boot?",
          answer:
            "It reduces boilerplate configuration and allows developers to create and run Spring applications quickly."
        },
        {
          question: "What is auto-configuration?",
          answer:
            "Auto-configuration automatically configures Spring application infrastructure based on conditions such as the application's dependencies, configuration, and existing beans."
        },
        {
          question: "Does Spring Boot replace Spring?",
          answer:
            "No. Spring Boot builds on top of the Spring Framework and simplifies its configuration and application setup."
        },
        {
          question: "What is an embedded server?",
          answer:
            "An embedded server is a web server packaged with the application so the application can commonly run as a standalone executable JAR without requiring deployment to a separately installed external server."
        },
        {
          question: "What are Spring Boot starters?",
          answer:
            "Spring Boot starters are convenient dependency descriptors that group commonly required libraries for a particular application capability."
        },
        {
          question: "What is @SpringBootApplication?",
          answer:
            "It is a convenience annotation that conceptually combines @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan."
        },
        {
          question: "What does SpringApplication.run() do?",
          answer:
            "It bootstraps the Spring Boot application, creates and refreshes the application context, initializes application infrastructure, and starts the web server for a web application."
        },
        {
          question: "What is the role of ApplicationContext?",
          answer:
            "ApplicationContext is a Spring IoC container that manages beans, dependencies, configuration, and other application infrastructure."
        },
        {
          question: "What is convention over configuration?",
          answer:
            "It means Spring Boot provides sensible defaults for common application behavior so developers do not need to explicitly configure every detail."
        },
        {
          question: "What is Spring Boot Actuator?",
          answer:
            "Actuator provides production-oriented endpoints and features for monitoring and managing Spring Boot applications, such as health and metrics."
        },
        {
          question: "Can Spring Boot applications be run without an external Tomcat installation?",
          answer:
            "Yes. For typical servlet-based web applications using the appropriate dependencies, Spring Boot can package an embedded servlet container inside an executable JAR."
        },
        {
          question: "Does Spring Boot automatically create business logic?",
          answer:
            "No. Spring Boot provides application infrastructure and configuration conveniences. Developers still implement controllers, services, business rules, repositories, and other application-specific functionality."
        },
        {
          question: "Why is Spring Boot popular for REST API development?",
          answer:
            "It combines Spring MVC, dependency injection, auto-configuration, starter dependencies, embedded server support, configuration management, testing support, and integration with other Spring projects."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You add spring-boot-starter-web to a Maven project. Why can the application become a web application without manually configuring every web library?",
          answer:
            "The starter provides the common web dependencies, and Spring Boot's condition-based auto-configuration can configure the relevant web infrastructure based on the application's classpath and configuration."
        },
        {
          question:
            "Your Spring Boot application starts but your controller is not discovered. What would you check first?",
          answer:
            "Check the package structure and component scanning. The main application class is commonly placed in a root package above the controller package so default component scanning can discover it."
        },
        {
          question:
            "An interviewer asks why Spring Boot applications can run using java -jar. What is the answer?",
          answer:
            "Spring Boot commonly packages applications as executable JARs and, for web applications, can include an embedded server, allowing the application to start directly using java -jar."
        },
        {
          question:
            "You selected Spring Data JPA and a MySQL Driver. Is the database automatically configured for your exact environment?",
          answer:
            "No. The dependencies provide the required libraries, but application-specific datasource configuration and database setup are still required."
        },
        {
          question:
            "Does adding Spring Security automatically give you JWT authentication?",
          answer:
            "No. Spring Security provides the security framework, but the authentication mechanism and security configuration must be implemented according to the application's requirements."
        },
        {
          question:
            "Why is Spring Boot called convention over configuration?",
          answer:
            "Because it provides sensible defaults and automatic configuration for common application scenarios, reducing the amount of explicit configuration developers need to write."
        },
        {
          question:
            "What happens if you want to change a Spring Boot default?",
          answer:
            "Spring Boot allows developers to customize or override many defaults through application configuration, custom beans, or other supported configuration mechanisms."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Spring Boot Quick Reference",

      code: {
        language: "text",
        code: `SPRING BOOT

Built on Spring Framework
        ↓
SpringApplication.run()
        ↓
ApplicationContext
        ↓
Component Scanning
        +
Auto-Configuration
        +
Dependency Injection
        ↓
Beans Created and Managed
        ↓
Embedded Server
        ↓
Application Ready


KEY FEATURES

1. Auto-Configuration
2. Starter Dependencies
3. Embedded Servers
4. Standalone Execution
5. Externalized Configuration
6. Actuator
7. Convention Over Configuration


KEY ANNOTATION

@SpringBootApplication

Conceptually:
@SpringBootConfiguration
+
@EnableAutoConfiguration
+
@ComponentScan`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "Spring Boot is built on the Spring Framework and simplifies the development and deployment of Spring applications. Its major advantages are auto-configuration, starter dependencies, embedded server support, externalized configuration, and production-oriented features."
      ],

      bullets: [
        "Spring Boot simplifies Spring application development.",
        "It does not replace the Spring Framework.",
        "Auto-configuration is condition-based.",
        "Starter dependencies simplify dependency management.",
        "Embedded servers support convenient standalone execution.",
        "@SpringBootApplication is the common main application annotation.",
        "SpringApplication.run() bootstraps the application.",
        "ApplicationContext manages Spring beans.",
        "Component scanning discovers Spring components.",
        "Externalized configuration uses properties, YAML, environment variables, and other supported sources.",
        "Actuator provides production-oriented monitoring and management features.",
        "Spring Boot follows convention over configuration.",
        "Developers still implement application-specific business logic.",
        "Spring Boot is commonly used for REST APIs, web applications, services, and other Java backend applications."
      ]
    }
  ]
};
