
export const springBean = {
  id: "spring-bean",
  title: "Spring Bean",
  slug: "spring-bean",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "45 min",

  description:
    "Understand Spring beans, how to register and name them, how the IoC container injects dependencies, and how bean scopes and lifecycle management work in real Spring Boot applications.",

  sections: [
    {
      id: "what-is-bean",
      title: "1. What Is a Spring Bean?",

      paragraphs: [
        "A Spring bean is an object that is instantiated, assembled, or otherwise managed by the Spring IoC container. Beans are the building blocks of a Spring application.",
        "In a traditional Java application, developers often create and connect objects manually using the new keyword. In a Spring application, the container can create registered objects, resolve their dependencies, and manage supported lifecycle callbacks.",
        "For example, an application may contain EmailService, UserService, UserRepository, and PaymentService beans. Spring can connect these components so that UserService receives EmailService or UserRepository through dependency injection.",
        "Not every Java object is a Spring bean. An object created using new inside ordinary application code is not automatically managed by Spring. To receive normal container-managed behavior, an object must be registered or otherwise managed by the container.",
        "A Spring bean can be a class written by your team or an object created by a third-party library. The @Component annotation is useful for application classes, while @Bean methods are especially useful when explicitly configuring objects."
      ],

      bullets: [
        "Bean: an object managed by the Spring container.",
        "IoC container: creates, configures, and manages registered beans.",
        "Dependency Injection: supplies a bean's required dependencies.",
        "Bean definition: configuration metadata that describes how Spring should create and configure a bean.",
        "Common examples: services, repositories, controllers, configuration objects, and third-party library objects."
      ]
    },

    {
      id: "why-spring-beans",
      title: "2. Why Do We Need Spring Beans?",

      paragraphs: [
        "A Spring application usually contains many collaborating objects. Without a container, each class may need to construct its own dependencies and coordinate their creation. This makes object creation harder to change and test as the application grows.",
        "Registering objects as Spring beans allows the container to assemble the application according to configuration. A service can declare that it needs a repository, and Spring can provide the registered repository implementation.",
        "For example, UserService can receive UserRepository through its constructor. The service focuses on business operations while Spring manages the dependency relationship.",
        "Spring beans also support common framework features such as lifecycle callbacks, configuration, proxy-based behavior for features such as transactions, and integration with application infrastructure where applicable."
      ],

      bullets: [
        "Centralizes object creation and dependency wiring.",
        "Reduces unnecessary coupling between object creation and business logic.",
        "Makes dependencies easier to replace in tests.",
        "Supports lifecycle callbacks and framework integrations.",
        "Helps organize an application into reusable components."
      ]
    },

    {
      id: "component-bean",
      title: "3. Creating a Bean with @Component",

      paragraphs: [
        "The @Component annotation marks a class as a candidate for component scanning. When Spring scans the configured packages and discovers the class, it can register the class as a bean.",
        "In Spring Boot, @SpringBootApplication includes component-scanning behavior. By default, scanning starts from the package containing the application class and includes its subpackages.",
        "The EmailService class below can be registered as a bean if it is inside the component-scan scope and no configuration prevents its registration.",
        "A class annotated with @Component is not necessarily registered if component scanning is not configured to discover it. Package placement and scan configuration therefore matter."
      ],

      code: {
        language: "java",
        code: `package com.example.demo.service;

import org.springframework.stereotype.Component;

@Component
public class EmailService {

    public void sendEmail() {
        System.out.println("Email sent");
    }
}`
      },

      bullets: [
        "@Component is a class-level annotation.",
        "Spring discovers eligible components through component scanning.",
        "The default bean name is commonly emailService for EmailService.",
        "Use @Service for service-layer classes when you want to communicate their role clearly."
      ]
    },

    {
      id: "stereotype-annotations",
      title: "4. Common Spring Bean Annotations",

      paragraphs: [
        "Spring provides several stereotype annotations to communicate the responsibility of a class. @Component is the general-purpose stereotype, while @Service, @Repository, and @Controller express common architectural roles.",
        "@Service is commonly used for business logic, such as calculating an order total or processing a payment.",
        "@Repository is commonly used for persistence-related components. It also participates in Spring's repository exception-translation support when applicable. Spring Data repository interfaces are registered through Spring Data infrastructure rather than by adding @Component to every interface.",
        "@Controller is used for Spring MVC controllers, while @RestController is commonly used for REST APIs and combines controller semantics with response-body behavior.",
        "These annotations help communicate design intent, but they do not automatically implement business logic or make a poorly designed class well structured."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

// General component
@Component
class ApplicationHelper {
}

// Business logic
@Service
class UserService {
}

// Persistence-related component
@Repository
class CustomUserRepository {
}

// REST API controller
@RestController
class UserController {
}`
      },

      bullets: [
        "@Component: general-purpose Spring component.",
        "@Service: service or business-logic component.",
        "@Repository: persistence-related component.",
        "@Controller: Spring MVC controller.",
        "@RestController: REST controller with response-body semantics."
      ]
    },

    {
      id: "configuration-bean",
      title: "5. Creating a Bean with @Bean",

      paragraphs: [
        "The @Bean annotation is placed on a method, usually inside a @Configuration class. Spring invokes the method through its configuration processing and registers the returned object as a bean.",
        "This approach is useful when you need to create an object from a third-party library that you cannot annotate with @Component. It is also useful when object creation requires custom constructor arguments or configuration.",
        "The method name becomes the default bean name unless an explicit name is provided through the annotation's name or value attribute.",
        "Use @Component when you own a class that should be discovered through component scanning. Use @Bean when you want to define explicitly how an object is constructed and registered."
      ],

      code: {
        language: "java",
        code: `package com.example.demo.config;

import com.example.demo.service.EmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public EmailService emailService() {
        return new EmailService();
    }
}`
      },

      bullets: [
        "@Bean is applied to a method.",
        "The returned object is registered with the Spring container.",
        "The method name is the default bean name.",
        "A @Configuration class is commonly used to declare bean methods.",
        "Avoid registering the same logical component through both scanning and a separate @Bean method unless that duplication is intentional."
      ]
    },

    {
      id: "component-vs-bean",
      title: "6. @Component vs. @Bean",

      paragraphs: [
        "Both @Component and @Bean can result in an object being registered as a Spring bean, but they work at different levels.",
        "@Component is applied to a class and relies on component scanning to discover it. @Bean is applied to a method, allowing you to explicitly create or configure the object returned by that method.",
        "For an application-owned EmailService class with a simple construction process, @Service or @Component is usually straightforward. For a third-party client that requires a URL and timeout, a @Bean method is often more suitable.",
        "In a full @Configuration class, Spring can enhance configuration processing so that calls between @Bean methods respect container-managed singleton semantics. Do not assume every plain Java method call in every configuration style has the same behavior."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
class NotificationService {

    public void notifyUser() {
        System.out.println("Notification sent");
    }
}

class ExternalClient {

    private final String baseUrl;

    ExternalClient(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void connect() {
        System.out.println("Connecting to " + baseUrl);
    }
}

@Configuration
class ClientConfig {

    @Bean
    ExternalClient externalClient() {
        return new ExternalClient("https://api.example.com");
    }
}`
      },

      bullets: [
        "@Component: class-level registration through component scanning.",
        "@Bean: method-level registration with explicit object construction.",
        "Use @Component or a specialized stereotype for application-owned components.",
        "Use @Bean when explicit construction or third-party configuration is useful.",
        "Both approaches can register singleton beans by default."
      ]
    },

    {
      id: "bean-name",
      title: "7. Spring Bean Names",

      paragraphs: [
        "Every bean registered under a name has a name that can be used for container lookup and dependency qualification. The default name for a class discovered through a stereotype annotation is commonly the class name with its first character converted to lowercase.",
        "For example, EmailService is commonly registered as emailService. A class named PDFGeneratorService would commonly receive the default name PDFGeneratorService under the standard decapitalization rules, because the first two characters are uppercase.",
        "For @Bean methods, the method name is the default bean name. You can provide an explicit name using @Component(\"customName\") or @Bean(name = \"customName\").",
        "Bean names are case-sensitive. Avoid defining conflicting bean names unless you deliberately intend to configure aliases or replacements and understand the application configuration."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component("primaryEmailService")
class EmailService {
}

class SmsService {
}

@Configuration
class NotificationConfig {

    @Bean(name = "smsNotificationService")
    SmsService smsService() {
        return new SmsService();
    }
}

// Example names:
// primaryEmailService
// smsNotificationService`
      },

      bullets: [
        "Stereotype annotations commonly derive the default name from the class name.",
        "@Bean methods use the method name by default.",
        "Custom names can be declared explicitly.",
        "Bean names can be used with @Qualifier or container lookup APIs.",
        "Use clear, consistent names to make configuration easier to understand."
      ]
    },

    {
      id: "bean-dependency-injection",
      title: "8. Injecting One Bean into Another",

      paragraphs: [
        "Spring beans often depend on other beans. Dependency Injection allows the container to provide those dependencies instead of requiring the dependent class to create them directly.",
        "In the example below, UserService requires EmailService. Both classes are registered as components, and Spring supplies EmailService to UserService through its constructor.",
        "Constructor injection makes required dependencies explicit and allows the field to be final. A single constructor does not need @Autowired in modern Spring versions.",
        "The two classes must be registered as beans, and Spring must be able to resolve exactly one suitable EmailService candidate for the constructor parameter."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
class EmailService {

    public void sendWelcomeEmail(String email) {
        System.out.println("Welcome email sent to " + email);
    }
}

@Service
class UserService {

    private final EmailService emailService;

    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void registerUser(String email) {
        System.out.println("User registered: " + email);
        emailService.sendWelcomeEmail(email);
    }
}`
      },

      bullets: [
        "Both classes must be available as Spring beans.",
        "Spring resolves the constructor dependency.",
        "UserService does not create EmailService using new.",
        "Constructor injection makes the dependency visible and testable."
      ]
    },

    {
      id: "multiple-beans",
      title: "9. What Happens When Multiple Beans Have the Same Type?",

      paragraphs: [
        "Sometimes an application has multiple implementations of the same interface. For example, EmailNotificationService and SmsNotificationService may both implement NotificationService.",
        "If a constructor requires NotificationService and multiple candidates are eligible, Spring may be unable to decide which one to inject. This commonly produces a NoUniqueBeanDefinitionException during application-context creation.",
        "Use @Qualifier to select a particular bean by name, or use @Primary to designate a preferred candidate when a dependency does not specify a qualifier.",
        "Choose the selection strategy deliberately. If the application must choose a provider dynamically at runtime, injecting a collection or a strategy registry may be more appropriate than hardcoding a single provider."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

interface NotificationService {
    void send(String message);
}

@Component("emailNotificationService")
class EmailNotificationService implements NotificationService {

    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

@Component("smsNotificationService")
class SmsNotificationService implements NotificationService {

    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

@Service
class AlertService {

    private final NotificationService notificationService;

    AlertService(
            @Qualifier("emailNotificationService")
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void sendAlert(String message) {
        notificationService.send(message);
    }
}`
      },

      bullets: [
        "@Qualifier selects a specific candidate.",
        "@Primary marks a preferred candidate for unqualified injection.",
        "Multiple eligible beans of the same type can make dependency resolution ambiguous.",
        "Bean names and qualifier values must match the actual configuration."
      ]
    },

    {
      id: "bean-scope",
      title: "10. Spring Bean Scopes",

      paragraphs: [
        "Bean scope defines how Spring manages the identity and lifetime of a bean instance. Scope is independent of the bean's class-level responsibility.",
        "Singleton is the default scope in a typical Spring application context. Spring maintains one shared instance per bean definition in that container.",
        "Prototype scope asks Spring to create a new instance each time the bean is requested from the container. Spring does not generally manage the complete destruction lifecycle of prototype instances after returning them to the caller.",
        "Web-aware contexts also support request and session scopes. Request scope associates an instance with an HTTP request, while session scope associates it with an HTTP session.",
        "Singleton scope does not guarantee thread safety. A singleton service may be called concurrently by many requests, so avoid unsafe mutable shared state."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
class SingletonReportService {
    // Singleton is the default scope.
}

@Component
@Scope("prototype")
class ReportJob {
    // Spring creates a new instance for each
    // request to the container for this bean.
}`
      },

      bullets: [
        "Singleton: one shared instance per bean definition and container.",
        "Prototype: a new instance for each request to the container.",
        "Request: one instance per HTTP request in a web-aware context.",
        "Session: one instance per HTTP session in a web-aware context.",
        "Choose scope based on lifecycle needs, not merely on the class name."
      ]
    },

    {
      id: "bean-lifecycle",
      title: "11. Spring Bean Lifecycle",

      paragraphs: [
        "A Spring bean's lifecycle includes more than object construction. The container creates the object, populates its dependencies, invokes applicable lifecycle extension points, and makes the initialized bean available for use.",
        "A simplified lifecycle is: instantiate the bean, inject dependencies, run applicable aware callbacks and BeanPostProcessor steps, execute initialization callbacks, and use the initialized bean. Spring's actual lifecycle contains additional extension points and ordering details.",
        "The @PostConstruct annotation marks a method that should run during bean initialization after dependency injection and before the bean is ready for normal use. In Spring Boot 3, import it from jakarta.annotation.PostConstruct.",
        "@PreDestroy marks a cleanup method for a managed bean when the container destroys it, such as during a graceful application-context shutdown. Cleanup behavior depends on the bean's scope and lifecycle management.",
        "Other lifecycle options include InitializingBean, DisposableBean, and custom initialization or destruction methods declared through @Bean configuration. For ordinary application code, annotation-based callbacks are often sufficient."
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
        "Instantiation: the bean object is created.",
        "Dependency injection: required dependencies are supplied.",
        "Initialization: lifecycle callbacks and applicable processors run.",
        "Usage: the initialized bean is available to the application.",
        "Destruction: supported cleanup callbacks run when the managed bean is destroyed."
      ]
    },

    {
      id: "bean-lookup",
      title: "12. Getting a Bean from ApplicationContext",

      paragraphs: [
        "ApplicationContext is the common Spring interface used to access the application container. It supports retrieving registered beans by type or by name and type.",
        "In ordinary business services, constructor injection is generally preferable to repeatedly looking up dependencies from ApplicationContext because it makes dependencies explicit.",
        "Container lookup can be useful in demonstrations, diagnostics, framework-level infrastructure, or situations where a bean genuinely needs to be resolved dynamically. It should not become the default way to connect ordinary application components."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.ApplicationContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner inspectBeans(ApplicationContext context) {
        return args -> {
            EmailService emailService =
                    context.getBean(EmailService.class);

            emailService.sendEmail();
        };
    }
}`
      },

      bullets: [
        "getBean(EmailService.class) looks up a bean by type.",
        "getBean(\"emailService\", EmailService.class) looks up a bean by name and type.",
        "Lookup can fail if no matching bean exists or if the type is ambiguous.",
        "Prefer constructor injection for normal service dependencies."
      ]
    },

    {
      id: "bean-common-errors",
      title: "13. Common Spring Bean Errors",

      paragraphs: [
        "NoSuchBeanDefinitionException commonly indicates that Spring cannot find a bean matching the requested type or name. Check whether the class was registered, whether component scanning includes its package, and whether the requested name is correct.",
        "NoUniqueBeanDefinitionException commonly indicates that multiple beans match a dependency and Spring cannot select a unique candidate. Use @Qualifier, @Primary, or a suitable configuration strategy.",
        "BeanCurrentlyInCreationException can appear in some circular-dependency scenarios or during problematic bean creation. Constructor-based dependency cycles generally prevent successful context creation.",
        "BeanDefinitionOverrideException can occur when the application attempts to register conflicting bean definitions and overriding is not allowed. Review duplicate component registrations, bean names, and configuration methods rather than enabling overriding without understanding the conflict.",
        "A bean may also fail during construction or initialization because a constructor throws an exception, required configuration is missing, or an external resource is unavailable. Read the full exception chain to identify the original cause."
      ],

      bullets: [
        "NoSuchBeanDefinitionException: no matching bean was found.",
        "NoUniqueBeanDefinitionException: multiple candidates match the dependency.",
        "BeanCurrentlyInCreationException: often related to circular or problematic bean creation.",
        "BeanDefinitionOverrideException: conflicting bean definitions.",
        "Startup failure during initialization: inspect the root cause and required configuration."
      ]
    },

    {
      id: "bean-testing",
      title: "14. Testing Classes That Use Spring Beans",

      paragraphs: [
        "Constructor injection makes a bean's dependencies explicit, which allows a class to be tested without starting the Spring container.",
        "For example, a unit test can create UserService with a fake EmailService or a mock dependency. This test focuses on the service's own behavior instead of testing Spring's dependency-injection infrastructure.",
        "Spring integration tests serve a different purpose: they verify that beans are registered, dependencies are resolved, configuration is applied, and framework integrations work together.",
        "Do not start a full application context for every small unit test. Choose the smallest test setup that verifies the behavior you want to test."
      ],

      code: {
        language: "java",
        code: `interface EmailSender {
    void send(String email);
}

class UserService {

    private final EmailSender emailSender;

    UserService(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void register(String email) {
        emailSender.send(email);
    }
}

class FakeEmailSender implements EmailSender {

    @Override
    public void send(String email) {
        System.out.println("Fake email sent to " + email);
    }
}

class Main {

    public static void main(String[] args) {
        EmailSender fakeSender = new FakeEmailSender();
        UserService userService = new UserService(fakeSender);

        userService.register("user@example.com");
    }
}`
      },

      bullets: [
        "Unit testing: create the class with fake or mock dependencies.",
        "Integration testing: start Spring when container behavior needs verification.",
        "Constructor injection makes test dependencies explicit.",
        "Keep business-logic tests independent of external infrastructure when possible."
      ]
    },

    {
      id: "bean-best-practices",
      title: "15. Spring Bean Best Practices",

      paragraphs: [
        "Use constructor injection for required dependencies so a class cannot be constructed without the objects it needs. Keep dependencies in final fields where practical.",
        "Use stereotype annotations consistently for application components, and use @Bean methods when explicit object construction or third-party configuration is appropriate.",
        "Keep bean registration predictable. Avoid registering the same component through multiple mechanisms unless the duplicate registrations are intentional and correctly named.",
        "Prefer stateless singleton services for common business logic. If a bean must hold mutable state, design its scope and concurrency behavior deliberately.",
        "Avoid circular dependencies by assigning clear responsibilities and depending on suitable abstractions. If two services require each other, consider extracting shared behavior into another component or changing the workflow.",
        "Use meaningful bean names when explicit naming is necessary, and use @Qualifier or @Primary to resolve legitimate multiple-implementation cases.",
        "Do not use ApplicationContext as a global service locator when normal dependency injection would work. Explicit dependencies improve readability and testability."
      ],

      bullets: [
        "Use constructor injection for required dependencies.",
        "Keep singleton services stateless where practical.",
        "Use @Component, @Service, and related annotations consistently.",
        "Use @Bean for explicit construction and third-party configuration.",
        "Resolve multiple candidates with @Qualifier or @Primary.",
        "Avoid circular dependencies and duplicate bean registrations.",
        "Test business logic independently from the Spring container when possible."
      ]
    },

    {
      id: "bean-interview",
      title: "16. Spring Bean Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is a Spring bean?",
          answer: "A Spring bean is an object instantiated, assembled, or otherwise managed by the Spring IoC container."
        },
        {
          question: "2. How can you create a Spring bean?",
          answer: "Common methods include component scanning with annotations such as @Component and @Service, or explicit registration using @Bean methods inside configuration classes."
        },
        {
          question: "3. What is @Component?",
          answer: "@Component marks a class as a candidate for component scanning so Spring can register it as a bean when it falls within the configured scan scope."
        },
        {
          question: "4. What is @Bean?",
          answer: "@Bean is a method-level annotation that tells Spring to register the object returned by the annotated method as a bean."
        },
        {
          question: "5. What is the difference between @Component and @Bean?",
          answer: "@Component is placed on a class and relies on component scanning. @Bean is placed on a method, allowing explicit creation and registration of the returned object."
        },
        {
          question: "6. What is the default bean name for a class annotated with @Component?",
          answer: "It is commonly the class name with the first character converted to lowercase, such as EmailService becoming emailService, following Spring's standard bean-name generation rules."
        },
        {
          question: "7. What is the default bean name for a @Bean method?",
          answer: "The method name is the default bean name unless a name or alias is explicitly configured."
        },
        {
          question: "8. What is a bean scope?",
          answer: "Bean scope determines how Spring creates and shares a bean instance. Common scopes include singleton, prototype, request, and session."
        },
        {
          question: "9. What is the default Spring bean scope?",
          answer: "Singleton is the default scope. Spring maintains one shared instance per bean definition in the relevant application context."
        },
        {
          question: "10. Does singleton scope mean a bean is thread-safe?",
          answer: "No. Singleton scope describes instance sharing, not thread safety. Shared mutable state must be handled carefully."
        },
        {
          question: "11. What is the difference between singleton and prototype scope?",
          answer: "Singleton normally uses one shared instance per bean definition and container. Prototype asks Spring to create a new instance each time the bean is requested from the container."
        },
        {
          question: "12. What is the Spring bean lifecycle?",
          answer: "A simplified lifecycle includes instantiation, dependency population, applicable initialization callbacks and processors, normal use, and supported destruction callbacks."
        },
        {
          question: "13. What is @PostConstruct?",
          answer: "@PostConstruct marks a method to run during bean initialization after dependency injection and before normal use. In Spring Boot 3, it is imported from jakarta.annotation.PostConstruct."
        },
        {
          question: "14. What is @PreDestroy?",
          answer: "@PreDestroy marks a cleanup method for a managed bean when it is destroyed, such as during a graceful application-context shutdown."
        },
        {
          question: "15. How does Spring inject dependencies between beans?",
          answer: "Spring resolves registered bean dependencies and supplies them through supported injection mechanisms, commonly constructor injection."
        },
        {
          question: "16. Why is constructor injection recommended?",
          answer: "It makes required dependencies explicit, supports final fields, helps maintain valid object state, and makes unit testing easier."
        },
        {
          question: "17. What happens if Spring cannot find a required bean?",
          answer: "Application-context creation or dependency resolution fails, commonly with a NoSuchBeanDefinitionException or a related bean-creation exception."
        },
        {
          question: "18. What happens if multiple beans match one dependency?",
          answer: "Spring may throw NoUniqueBeanDefinitionException. Use @Qualifier, @Primary, or explicit configuration to select the intended candidate."
        },
        {
          question: "19. Can a third-party library object be a Spring bean?",
          answer: "Yes. A @Bean method can construct and register an object from a third-party library even when its class cannot be annotated with @Component."
        },
        {
          question: "20. Does Spring manage every object created with new?",
          answer: "No. An object created directly with new is not automatically a Spring bean and does not automatically receive normal container-managed dependency injection or lifecycle callbacks."
        },
        {
          question: "21. What is the purpose of @Primary?",
          answer: "@Primary marks a preferred bean candidate when multiple beans of a compatible type exist and no more specific qualifier selects another candidate."
        },
        {
          question: "22. What is the purpose of @Qualifier?",
          answer: "@Qualifier narrows dependency resolution to a specific bean candidate, commonly by using a qualifier value that matches the configured bean."
        },
        {
          question: "23. What is ApplicationContext?",
          answer: "ApplicationContext is a central Spring container interface that manages beans and provides additional application features such as event publication and message resolution."
        },
        {
          question: "24. How can you test a class that depends on a Spring bean?",
          answer: "Use constructor injection to supply a fake or mock dependency in a unit test. Use a Spring integration test when you need to verify actual container wiring or framework behavior."
        }
      ]
    },

    {
      id: "bean-quick-revision",
      title: "17. Quick Revision Notes",

      paragraphs: [
        "A Spring bean is an object managed by the Spring IoC container. Beans can be registered through component scanning or explicit configuration with @Bean methods.",
        "The default scope is singleton. Bean names are commonly derived from component class names or @Bean method names, and custom names can be configured explicitly.",
        "Spring injects dependencies between registered beans, commonly through constructor injection. Bean lifecycle management includes initialization and destruction callbacks where supported.",
        "Use @Qualifier or @Primary to resolve multiple matching candidates. Remember that objects created manually with new are not automatically Spring-managed beans."
      ],

      bullets: [
        "Spring bean = object managed by the Spring container.",
        "@Component = register a class through component scanning.",
        "@Service = stereotype commonly used for business logic.",
        "@Repository = stereotype commonly used for persistence components.",
        "@Bean = register an object returned by a configuration method.",
        "Default scope = singleton.",
        "@PostConstruct = initialization callback.",
        "@PreDestroy = destruction callback.",
        "@Qualifier = select a specific dependency candidate.",
        "@Primary = mark a preferred candidate.",
        "Constructor injection = recommended for required dependencies.",
        "ApplicationContext = commonly used Spring container interface."
      ]
    }
  ]
};
