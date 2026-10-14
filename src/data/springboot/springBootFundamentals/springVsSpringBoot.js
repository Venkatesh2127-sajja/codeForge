
export const springVsSpringBoot = {
  id: "spring-vs-spring-boot",
  title: "Spring vs Spring Boot",
  slug: "spring-vs-spring-boot",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "20 min",

  description:
    "Understand the differences between the Spring Framework and Spring Boot and how Spring Boot simplifies Spring application development.",

  sections: [
    {
      id: "spring-vs-boot",
      title: "Spring vs Spring Boot",

      paragraphs: [
        "Spring is the underlying application framework that provides features such as IoC, Dependency Injection, MVC, transactions, and data access support.",
        "Spring Boot builds on Spring and provides conventions and automation that reduce configuration and simplify application startup.",
        "Spring Boot does not replace the Spring Framework. Instead, it provides a convenient way to configure and run applications that use Spring."
      ],

      code: {
        language: "text",
        code: `Spring Framework
        ↓
Core Spring Features
        ↓
IoC
Dependency Injection
MVC
Transactions
Data Access
        ↓
Application


Spring Boot
        ↓
Built on Spring
        ↓
Auto-Configuration
Starter Dependencies
Embedded Server
Externalized Configuration
Production Features
        ↓
Spring Application`
      }
    },

    {
      id: "spring-framework",
      title: "What is the Spring Framework?",

      paragraphs: [
        "The Spring Framework is a modular Java application framework that provides infrastructure for building enterprise applications.",
        "One of its most important concepts is Inversion of Control, where Spring manages application objects called beans and their dependencies.",
        "Spring also provides modules and projects for web development, transactions, data access, testing, security integration, and other application requirements."
      ],

      bullets: [
        "IoC container.",
        "Dependency Injection.",
        "Spring MVC.",
        "Transaction management.",
        "Data access support.",
        "Bean lifecycle management.",
        "Integration with other technologies.",
        "Support for modular application development."
      ]
    },

    {
      id: "spring-core-example",
      title: "Basic Spring Concept",

      paragraphs: [
        "In a Spring application, objects can be registered as beans and dependencies can be injected by the Spring container."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    public String getEmployee() {
        return "Employee data";
    }
}


@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public String getEmployees() {
        return employeeService.getEmployee();
    }
}`
      },

      paragraphs: [
        "The Spring container creates and manages the EmployeeService bean and provides it to EmployeeController through dependency injection."
      ]
    },

    {
      id: "spring-boot",
      title: "What is Spring Boot?",

      paragraphs: [
        "Spring Boot is a project built on top of the Spring ecosystem that simplifies the creation and configuration of Spring applications.",
        "It provides conventions, auto-configuration, starter dependencies, embedded server support, and other features that reduce the amount of setup required for common applications."
      ],

      bullets: [
        "Built on the Spring Framework.",
        "Provides auto-configuration.",
        "Provides starter dependencies.",
        "Supports embedded web servers.",
        "Makes standalone application execution convenient.",
        "Provides externalized configuration support.",
        "Integrates with production-oriented tools such as Actuator."
      ]
    },

    {
      id: "comparison",
      title: "Key Differences",

      bullets: [
        "Spring provides the core application framework; Spring Boot simplifies Spring application setup.",
        "Spring applications can require more explicit configuration; Spring Boot uses auto-configuration and conventions.",
        "Spring Boot commonly uses starter dependencies.",
        "Spring Boot supports embedded servers for web applications.",
        "Spring Boot makes standalone application execution convenient.",
        "Spring Boot provides production-oriented features through projects such as Actuator."
      ]
    },

    {
      id: "configuration-difference",
      title: "Configuration Difference",

      paragraphs: [
        "A major difference is how much configuration the developer commonly needs to provide for a typical application.",
        "Spring itself provides the underlying infrastructure, but applications can require explicit configuration depending on how the application is assembled.",
        "Spring Boot applies conventions and condition-based auto-configuration to reduce common setup work."
      ],

      code: {
        language: "text",
        code: `Traditional Spring

Application
    ↓
Configure infrastructure
    ↓
Configure beans
    ↓
Configure web environment
    ↓
Configure deployment
    ↓
Run application


Spring Boot

Application
    ↓
Select starters
    ↓
Boot auto-configuration
    ↓
Embedded server
    ↓
Run application`
      }
    },

    {
      id: "starter-dependencies",
      title: "Starter Dependencies",

      paragraphs: [
        "Spring Boot starters are convenient dependency descriptors that bring together commonly required libraries for a particular application capability.",
        "For example, spring-boot-starter-web is commonly used when building Spring MVC web applications and REST APIs."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>`
      },

      bullets: [
        "Reduce manual dependency selection.",
        "Provide a consistent set of libraries for common application types.",
        "Make Maven or Gradle configuration easier to understand.",
        "Work together with Spring Boot's dependency management."
      ]
    },

    {
      id: "auto-configuration",
      title: "Auto-Configuration",

      paragraphs: [
        "Spring Boot auto-configuration attempts to configure application infrastructure based on the libraries present in the classpath and the application's configuration.",
        "It is condition-based, meaning Boot applies configurations when appropriate conditions are satisfied.",
        "Auto-configuration does not mean that Spring Boot magically understands every application requirement. Developers can still override or customize the configuration."
      ],

      code: {
        language: "text",
        code: `Add Spring Web
      ↓
Relevant web libraries available
      ↓
Spring Boot evaluates conditions
      ↓
Web infrastructure is configured
      ↓
Application can start as a web application`
      },

      bullets: [
        "Auto-configuration is condition-based.",
        "Classpath dependencies influence which configurations are considered.",
        "Application properties can influence configuration.",
        "Developer-defined beans can override or customize many defaults."
      ]
    },

    {
      id: "embedded-server",
      title: "Embedded Server Support",

      paragraphs: [
        "For servlet-based web applications, Spring Boot commonly provides an embedded server through the selected web dependencies.",
        "This makes it convenient to run the application directly rather than requiring a separately installed application server for the common executable-JAR deployment model."
      ],

      code: {
        language: "text",
        code: `Spring Boot Application
        +
Embedded Servlet Server
        ↓
Executable JAR
        ↓
java -jar application.jar
        ↓
Application starts`
      },

      bullets: [
        "Simplifies local development.",
        "Supports standalone application execution.",
        "Makes deployment using executable JARs convenient.",
        "Tomcat is a common embedded servlet container choice for Spring Boot web applications."
      ]
    },

    {
      id: "standalone-application",
      title: "Standalone Application Execution",

      paragraphs: [
        "A Spring Boot application can commonly be packaged as an executable JAR and started using the Java command.",
        "This is one of the reasons Spring Boot applications are convenient to deploy."
      ],

      code: {
        language: "bash",
        code: `mvn clean package

java -jar target/employee-service.jar`
      },

      output: `Maven builds the application
        ↓
Executable JAR is created
        ↓
java -jar starts the application
        ↓
Spring Boot initializes the application
        ↓
Web server starts if it is a web application`
    },

    {
      id: "main-class-difference",
      title: "Spring Boot Main Application Class",

      paragraphs: [
        "Spring Boot applications commonly use a main class containing @SpringBootApplication.",
        "This annotation is a convenient combination of Spring configuration, auto-configuration enablement, and component scanning."
      ],

      code: {
        language: "java",
        code: `@SpringBootApplication
public class EmployeeApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            EmployeeApplication.class,
            args
        );
    }
}`
      },

      bullets: [
        "@SpringBootApplication is a common entry point for Spring Boot applications.",
        "SpringApplication.run() bootstraps the application.",
        "For typical applications, the main class is placed in an appropriate root package."
      ]
    },

    {
      id: "spring-boot-application-annotation",
      title: "What @SpringBootApplication Represents",

      paragraphs: [
        "@SpringBootApplication is a convenience annotation that combines three important Spring annotations conceptually."
      ],

      code: {
        language: "text",
        code: `@SpringBootApplication

Conceptually combines:

@SpringBootConfiguration
        +
@EnableAutoConfiguration
        +
@ComponentScan`
      },

      bullets: [
        "@SpringBootConfiguration → identifies the main Spring Boot configuration class.",
        "@EnableAutoConfiguration → enables Spring Boot auto-configuration.",
        "@ComponentScan → discovers Spring components in the appropriate package hierarchy."
      ]
    },

    {
      id: "configuration-properties",
      title: "Externalized Configuration",

      paragraphs: [
        "Spring Boot makes it convenient to configure application behavior outside Java source code using files such as application.properties or application.yml.",
        "This is useful for values such as server ports, database URLs, logging configuration, and environment-specific settings."
      ],

      code: {
        language: "properties",
        code: `server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root`
      },

      bullets: [
        "Configuration can be separated from application code.",
        "Different environments can use different configuration values.",
        "Sensitive production values should be managed securely rather than committed directly to source control."
      ]
    },

    {
      id: "production-features",
      title: "Production-Oriented Features",

      paragraphs: [
        "Spring Boot works well with production-oriented capabilities such as health checks, metrics, logging configuration, and application monitoring.",
        "Spring Boot Actuator is commonly used to expose operational information when configured appropriately."
      ],

      code: {
        language: "text",
        code: `Application
    ↓
Spring Boot
    ↓
Actuator
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
        "Integration with monitoring systems."
      ]
    },

    {
      id: "simple-comparison",
      title: "Simple Example",

      code: {
        language: "text",
        code: `Traditional Spring

Application
    ↓
Spring Configuration
    ↓
Beans
    ↓
Application Server
    ↓
Application


Spring Boot

Application
    ↓
Starter Dependencies
    ↓
Auto Configuration
    ↓
Embedded Server
    ↓
Application`
      }
    },

    {
      id: "development-experience",
      title: "Developer Experience",

      paragraphs: [
        "The biggest practical difference is often the developer experience.",
        "Spring provides the powerful application framework, while Spring Boot makes it easier to assemble common Spring applications with sensible defaults and less repetitive configuration."
      ],

      code: {
        language: "text",
        code: `Spring Framework
    ↓
Powerful building blocks
    ↓
Developer configures application


Spring Boot
    ↓
Spring Framework
    +
Conventions
    +
Starters
    +
Auto-configuration
    +
Embedded server
    ↓
Faster application setup`
      }
    },

    {
      id: "spring-vs-boot-table",
      title: "Spring vs Spring Boot Comparison",

      bullets: [
        "Purpose: Spring provides the application framework; Spring Boot simplifies Spring application development.",
        "Configuration: Spring can require more explicit setup; Spring Boot provides sensible defaults and auto-configuration.",
        "Dependencies: Spring projects can require explicit dependency selection; Spring Boot commonly uses starters.",
        "Server: Traditional Spring deployments can use external servers; Spring Boot commonly supports embedded servers.",
        "Execution: Spring Boot makes standalone executable applications convenient.",
        "Production: Spring Boot integrates easily with operational features such as Actuator.",
        "Relationship: Spring Boot is built on the Spring ecosystem rather than being a replacement for it."
      ]
    },

    {
      id: "spring-vs-boot-request-flow",
      title: "REST API Request Flow in Spring Boot",

      paragraphs: [
        "When Spring Boot is used to create a REST API, the request typically enters through the web server and is handled by Spring MVC."
      ],

      code: {
        language: "text",
        code: `Client
  ↓
HTTP Request
  ↓
Embedded Web Server
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
Response
  ↓
Client`
      },

      bullets: [
        "The embedded server accepts the HTTP connection.",
        "DispatcherServlet coordinates Spring MVC request handling.",
        "The controller handles HTTP-level application requests.",
        "The service layer commonly contains application or business logic.",
        "The repository commonly handles persistence.",
        "The response is returned to the client."
      ]
    },

    {
      id: "misconceptions",
      title: "Common Misconceptions",

      bullets: [
        "Spring Boot is not a replacement for Spring.",
        "Spring Boot does not remove the need to understand Spring fundamentals.",
        "Auto-configuration does not mean there is no configuration at all.",
        "Spring Boot does not automatically create business logic.",
        "Selecting a dependency does not automatically implement an entire feature.",
        "Spring Security does not automatically mean JWT authentication is configured.",
        "Embedded server support does not mean every application must use the same server.",
        "Spring Boot is not a separate alternative to the Spring ecosystem; it is built on it."
      ]
    },

    {
      id: "when-to-use-spring",
      title: "When Would You Work Directly With Spring Concepts?",

      paragraphs: [
        "Even when using Spring Boot, developers regularly work with core Spring concepts.",
        "Understanding IoC, Dependency Injection, beans, application contexts, MVC, transactions, and configuration is important because Spring Boot relies on these concepts underneath its convenience features."
      ],

      bullets: [
        "Debugging bean creation problems.",
        "Understanding dependency injection.",
        "Configuring transactions.",
        "Understanding Spring MVC request handling.",
        "Working with application contexts.",
        "Customizing auto-configuration.",
        "Troubleshooting startup failures."
      ]
    },

    {
      id: "when-spring-boot",
      title: "Why Spring Boot Is Commonly Used for Modern Applications",

      paragraphs: [
        "Spring Boot is commonly chosen for REST APIs, web applications, microservices, scheduled applications, and other Java backend systems because it provides a convenient application bootstrap model while retaining the capabilities of the Spring ecosystem."
      ],

      bullets: [
        "Fast project setup.",
        "Convenient dependency management.",
        "Auto-configuration.",
        "Embedded server support.",
        "Externalized configuration.",
        "Testing support.",
        "Production monitoring integration.",
        "Strong integration with the broader Spring ecosystem."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes When Explaining Spring vs Spring Boot",

      bullets: [
        "Saying Spring and Spring Boot are completely unrelated technologies.",
        "Saying Spring Boot replaces Spring.",
        "Saying Spring Boot requires no configuration.",
        "Saying auto-configuration configures everything automatically without conditions.",
        "Saying Spring Boot is only an embedded Tomcat framework.",
        "Saying Spring Boot is only used for REST APIs.",
        "Ignoring the role of starter dependencies.",
        "Ignoring the underlying Spring IoC container and dependency injection model.",
        "Saying Spring applications cannot be standalone.",
        "Saying Spring Boot removes the need to understand Spring."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Is Spring Boot a replacement for Spring?",
          answer:
            "No. Spring Boot is built on the Spring Framework and simplifies configuration and application setup."
        },
        {
          question: "Why is Spring Boot preferred for REST API development?",
          answer:
            "It provides convenient dependency management, auto-configuration, embedded servers, and easy integration with Spring MVC and other Spring projects."
        },
        {
          question: "What does Spring Boot add on top of Spring?",
          answer:
            "It adds conventions, auto-configuration, starter dependencies, embedded server support, and production-oriented features."
        },
        {
          question: "What is the main purpose of the Spring Framework?",
          answer:
            "The Spring Framework provides core application infrastructure such as IoC, Dependency Injection, web MVC, transaction management, and data access support."
        },
        {
          question: "What is the main purpose of Spring Boot?",
          answer:
            "Spring Boot simplifies the setup, configuration, execution, and deployment of applications built using the Spring ecosystem."
        },
        {
          question: "What is auto-configuration in Spring Boot?",
          answer:
            "Auto-configuration is Spring Boot's condition-based mechanism for configuring application infrastructure based on the classpath, configuration, and other conditions."
        },
        {
          question: "What are Spring Boot starters?",
          answer:
            "Starters are convenient dependency descriptors that group commonly required libraries for a particular application capability."
        },
        {
          question: "Why does Spring Boot use embedded servers?",
          answer:
            "Embedded servers make it convenient to package and run web applications as standalone applications, commonly as executable JARs."
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
          question: "Can Spring Boot applications use external configuration?",
          answer:
            "Yes. Spring Boot supports externalized configuration through mechanisms such as application.properties, application.yml, environment variables, and other supported configuration sources."
        },
        {
          question: "Can you use Spring without Spring Boot?",
          answer:
            "Yes. Spring Boot is built on the Spring ecosystem but is not the only way to build a Spring application."
        },
        {
          question: "Does Spring Boot eliminate configuration?",
          answer:
            "No. It reduces repetitive configuration by providing conventions and auto-configuration, but applications still require configuration and customization according to their requirements."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your interviewer asks: 'If Spring already provides Dependency Injection, why do we need Spring Boot?' How would you answer?",
          answer:
            "Spring provides the core features such as IoC and Dependency Injection. Spring Boot builds on those capabilities and simplifies application setup through starters, auto-configuration, embedded server support, and conventions. Therefore, Boot reduces setup work rather than replacing Spring."
        },
        {
          question:
            "A Spring Boot application starts with very little configuration. What is responsible for this?",
          answer:
            "Several Spring Boot features contribute, especially starter dependencies, auto-configuration, sensible defaults, and embedded server support for web applications."
        },
        {
          question:
            "You added spring-boot-starter-web. What happens conceptually?",
          answer:
            "The starter brings in the common web dependencies required for a Spring MVC web application. Spring Boot can then use the available classpath and configuration to apply relevant auto-configuration."
        },
        {
          question:
            "Why can a Spring Boot application run using java -jar?",
          answer:
            "Spring Boot commonly packages applications as executable JARs and, for web applications, can include an embedded server, allowing the application to start without requiring a separately deployed external servlet container in the common deployment model."
        },
        {
          question:
            "Is auto-configuration always applied regardless of the application?",
          answer:
            "No. Auto-configuration is condition-based. Spring Boot evaluates conditions such as available classes, beans, and configuration before applying particular auto-configurations."
        },
        {
          question:
            "An interviewer asks whether learning Spring is necessary if you know Spring Boot. What should you say?",
          answer:
            "Yes. Spring Boot simplifies Spring development, but understanding Spring fundamentals such as IoC, Dependency Injection, beans, application context, MVC, and transactions is important for development and troubleshooting."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Reference",

      code: {
        language: "text",
        code: `SPRING

Core application framework
        ↓
IoC
Dependency Injection
MVC
Transactions
Data Access
Bean Management


SPRING BOOT

Built on Spring
        ↓
Starters
Auto-Configuration
Embedded Server
Externalized Configuration
Production Features
        ↓
Simpler Spring Application Setup


KEY IDEA

Spring
    = Core Framework

Spring Boot
    = Spring
      +
      Conventions
      +
      Automation
      +
      Convenient Application Setup`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "The most important point to remember is that Spring Boot is built on top of the Spring Framework. Spring provides the core application infrastructure, while Spring Boot simplifies how that infrastructure is configured and used."
      ],

      bullets: [
        "Spring = underlying application framework.",
        "Spring Boot = simplified way to build and run Spring applications.",
        "Spring provides IoC and Dependency Injection.",
        "Spring provides MVC, transactions, and data-access support.",
        "Spring Boot provides auto-configuration.",
        "Spring Boot provides starter dependencies.",
        "Spring Boot commonly provides embedded server support for web applications.",
        "Spring Boot supports externalized configuration.",
        "Spring Boot integrates with production-oriented features such as Actuator.",
        "@SpringBootApplication combines important Spring Boot configuration capabilities.",
        "Spring Boot does not replace Spring.",
        "Auto-configuration is condition-based.",
        "Starters simplify dependency selection.",
        "Understanding Spring fundamentals is important even when developing with Spring Boot."
      ]
    }
  ]
};
