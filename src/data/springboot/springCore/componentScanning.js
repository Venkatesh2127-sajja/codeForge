
export const componentScanning = {
  id: "component-scanning",
  title: "Component Scanning",
  slug: "component-scanning",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "40 min",

  description:
    "Understand how Spring discovers components, registers bean definitions, configures @ComponentScan, uses default Spring Boot scanning, handles filters and package boundaries, and troubleshoots missing beans.",

  sections: [
    {
      id: "what-is-component-scanning",
      title: "1. What Is Component Scanning?",

      paragraphs: [
        "Component scanning is the process through which Spring searches configured packages for eligible classes annotated with stereotype annotations and registers their bean definitions in the Spring container.",
        "Common annotations discovered through component scanning include @Component, @Service, @Repository, and @Controller. @RestController is also discovered because it is a specialization of @Controller.",
        "Without component scanning or another registration mechanism, Spring does not automatically manage every ordinary Java class in the application. A class must be discovered or explicitly registered as a bean.",
        "After Spring discovers a component, it registers a bean definition. The container uses that definition to create the object when required, resolve its dependencies, and manage its lifecycle according to the bean's configuration.",
        "Component scanning is different from dependency injection. Scanning discovers and registers components; dependency injection supplies the dependencies those components require."
      ],

      bullets: [
        "Component scanning discovers eligible annotated classes.",
        "Bean registration makes those classes available to the Spring container.",
        "Dependency injection connects registered beans.",
        "Component scanning can be configured explicitly or enabled through Spring Boot.",
        "Classes can also become beans through @Bean methods and other registration mechanisms."
      ]
    },

    {
      id: "how-component-scanning-works",
      title: "2. How Component Scanning Works Internally",

      paragraphs: [
        "In a typical annotation-based Spring application, component scanning is configured through @ComponentScan or through an annotation such as @SpringBootApplication that includes component-scanning behavior.",
        "Spring processes the scan configuration and searches the selected packages for eligible component classes. It evaluates applicable scan filters and registers bean definitions for matching classes.",
        "The application context subsequently uses these bean definitions during initialization. Spring creates required objects, resolves constructor or other configured dependencies, and applies relevant bean lifecycle processing.",
        "The exact timing of bean instantiation depends on factors such as scope, lazy initialization, and whether a bean is required during startup. Discovering a component does not necessarily mean that its object is instantiated immediately."
      ],

      code: {
        language: "text",
        code: `@ComponentScan configuration
          |
          v
Determine packages to scan
          |
          v
Discover eligible component classes
          |
          v
Evaluate scan filters
          |
          v
Register bean definitions
          |
          v
Create beans when required
          |
          v
Resolve dependencies and manage lifecycle`
      },

      bullets: [
        "Scanning identifies candidates; bean definitions describe how Spring manages them.",
        "A bean can be discovered but instantiated later, depending on its configuration.",
        "Dependency injection requires the relevant dependency to be available as a bean or through another supported resolution mechanism.",
        "Component scanning is not the same as scanning database tables, REST endpoints, or every Java class."
      ]
    },

    {
      id: "component-scan",
      title: "3. @ComponentScan",

      paragraphs: [
        "@ComponentScan configures the packages Spring should search for component classes. It is commonly placed on a configuration class.",
        "The basePackages attribute accepts one or more package names. The shorter value attribute is an alias, so @ComponentScan(\"com.example.app\") is valid.",
        "If no package is specified, Spring normally uses the package of the class declaring @ComponentScan as the base package. Choose the scan location carefully because package boundaries determine which components are discovered.",
        "For larger applications, prefer scanning a well-defined root package rather than scanning the entire classpath unnecessarily."
      ],

      code: {
        language: "java",
        code: `package com.example.app.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.example.app")
public class AppConfig {
}`
      },

      bullets: [
        "basePackages accepts package names as strings.",
        "basePackageClasses accepts marker classes and is safer against package-name refactoring.",
        "The package must be spelled correctly and must contain the relevant classes or their subpackages.",
        "Avoid overly broad scans that discover unrelated components or create bean-name conflicts."
      ]
    },

    {
      id: "multiple-packages",
      title: "4. Scanning Multiple Packages",

      paragraphs: [
        "An application can scan multiple package roots when its components are intentionally distributed across separate package hierarchies.",
        "You can supply several package names using basePackages. For compile-time refactoring safety, basePackageClasses is often preferable because it refers to actual classes rather than string literals."
      ],

      code: {
        language: "java",
        code: `package com.example.app.config;

import com.example.app.service.ServicePackageMarker;
import com.example.shared.SharedPackageMarker;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = {
    ServicePackageMarker.class,
    SharedPackageMarker.class
})
public class AppConfig {
}`
      },

      bullets: [
        "ServicePackageMarker and SharedPackageMarker are ordinary marker classes or interfaces placed in the desired packages.",
        "Spring scans the packages containing the marker classes and their subpackages.",
        "Use this approach when components are intentionally spread across multiple roots.",
        "Do not add marker classes unless the package organization benefits from the explicit boundaries."
      ]
    },

    {
      id: "spring-boot-scanning",
      title: "5. Component Scanning in Spring Boot",

      paragraphs: [
        "@SpringBootApplication combines three important annotations: @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan.",
        "@ComponentScan enables component scanning. By default, its scan base package is the package containing the application class, including that package and its subpackages.",
        "For this reason, Spring Boot applications commonly place the main application class in a root package such as com.example.app. Controllers, services, and repositories are then organized into subpackages.",
        "A common mistake is placing the main application class inside com.example.app.config while application services live in com.example.app.service. The default scan may not include sibling packages outside com.example.app.config."
      ],

      code: {
        language: "java",
        code: `package com.example.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`
      },

      bullets: [
        "The default scan root is the package of Application.",
        "Subpackages such as com.example.app.controller and com.example.app.service are included.",
        "Sibling packages outside that root are not automatically included.",
        "Use scanBasePackages or explicit component-scan configuration only when the package design requires it.",
        "Component scanning and auto-configuration are related parts of Spring Boot setup, but they perform different jobs."
      ]
    },

    {
      id: "package-structure",
      title: "6. Recommended Package Structure",

      paragraphs: [
        "A clear package hierarchy makes component scanning predictable and helps separate application responsibilities. For a typical Spring Boot application, place the main application class at the root of the application's package.",
        "Organize controllers, services, repositories, entities, DTOs, and configuration classes under that root. This allows the default scan to discover application components without a long list of custom scan packages."
      ],

      code: {
        language: "text",
        code: `com.example.app
|
|-- Application.java
|
|-- controller
|   |-- ProductController.java
|
|-- service
|   |-- ProductService.java
|
|-- repository
|   |-- ProductRepository.java
|
|-- entity
|   |-- Product.java
|
|-- dto
|   |-- ProductResponse.java
|
|-- config
    |-- AppConfig.java`
      },

      bullets: [
        "Application.java belongs at the root package.",
        "Controller classes handle HTTP requests and responses.",
        "Service classes coordinate business or application logic.",
        "Repository interfaces and classes handle data access.",
        "Entity classes represent persistence models; they are not automatically Spring components merely because they are entities.",
        "DTOs are data-transfer objects and do not normally need component annotations unless they provide a Spring-managed service."
      ]
    },

    {
      id: "component-not-found",
      title: "7. What Happens When a Component Is Outside the Scan Package?",

      paragraphs: [
        "Suppose the application class is in com.example.app, but a required service is in org.example.payment. The default scan rooted at com.example.app does not include org.example.payment.",
        "If a controller requires that service through constructor injection, Spring may fail during context initialization because no matching bean is available.",
        "The preferred fix is often to reorganize application packages under a shared root. If that is not practical, explicitly configure scanning for the additional package or register the required object through a suitable configuration mechanism."
      ],

      code: {
        language: "java",
        code: `// This package is outside com.example.app.
package org.example.payment;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public String status() {
        return "Payment service ready";
    }
}`
      },

      bullets: [
        "The annotation is present, but the package is outside the default scan root.",
        "A stereotype annotation does not override component-scan boundaries.",
        "Check the package declaration at the top of the class, not just the folder name.",
        "Use explicit scanning only when the package structure requires it."
      ]
    },

    {
      id: "scan-base-packages",
      title: "8. Configuring Spring Boot Scan Packages",

      paragraphs: [
        "Spring Boot allows you to customize the component-scan roots through scanBasePackages on @SpringBootApplication. This is useful when the application intentionally includes components from multiple package roots.",
        "scanBasePackages is an alias for the base-package configuration of component scanning. It controls component discovery; it does not automatically configure every other framework's scanning mechanism."
      ],

      code: {
        language: "java",
        code: `package com.example.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
    scanBasePackages = {
        "com.example.app",
        "org.example.payment"
    }
)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`
      },

      bullets: [
        "Use valid package names rather than class names in scanBasePackages.",
        "Multiple package roots can be specified as an array.",
        "Customizing component scanning does not automatically configure entity scanning or Spring Data repository scanning for unrelated packages.",
        "When working with JPA entities or repository interfaces outside the default application package, review @EntityScan and @EnableJpaRepositories as appropriate."
      ]
    },

    {
      id: "component-scan-filters",
      title: "9. Component Scan Filters",

      paragraphs: [
        "Component scanning supports include and exclude filters. Filters let you control which classes are considered during scanning instead of relying only on package boundaries.",
        "For example, an application can exclude a particular class or package from scanning, or include components that match a custom rule. Filters should be used carefully because excluding a required bean can cause startup failures.",
        "Common filter types include annotation, assignable type, aspect-oriented expression, regular expression, and custom filter implementations."
      ],

      code: {
        language: "java",
        code: `package com.example.app.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Controller;

@Configuration
@ComponentScan(
    basePackages = "com.example.app",
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ANNOTATION,
        classes = Controller.class
    )
)
public class ServiceOnlyConfiguration {
}`
      },

      bullets: [
        "The example excludes classes annotated with @Controller from this scan.",
        "Because @RestController is also a specialization of @Controller, it is excluded by this annotation filter too.",
        "FilterType.ANNOTATION matches annotations.",
        "FilterType.ASSIGNABLE_TYPE matches a specified type or its assignable types.",
        "Use exclusions only when the application configuration intentionally requires them."
      ]
    },

    {
      id: "bean-naming-and-conflicts",
      title: "10. Bean Naming and Component Scan Conflicts",

      paragraphs: [
        "Spring normally derives a bean name from the component class name. For example, ProductService commonly becomes productService.",
        "If two scanned components produce the same bean name, Spring can report a bean-definition conflict. The exact behavior depends on the registration setup and bean-definition overriding configuration.",
        "When two different beans implement the same interface, their names may differ but dependency injection can still be ambiguous by type. Use @Qualifier or @Primary where appropriate rather than relying on accidental naming behavior."
      ],

      code: {
        language: "java",
        code: `package com.example.app.notification;

import org.springframework.stereotype.Component;

@Component("emailNotificationSender")
public class EmailNotificationSender {
}

// Another component can have a distinct explicit name.
@Component("smsNotificationSender")
class SmsNotificationSender {
}`
      },

      bullets: [
        "Explicit component names can make bean selection more understandable.",
        "Duplicate names and ambiguous candidates are different problems.",
        "Use @Qualifier to select a bean when several candidates match the required type.",
        "Do not solve every bean conflict by enabling overriding; first understand why the duplicate registration exists."
      ]
    },

    {
      id: "component-scanning-vs-bean",
      title: "11. Component Scanning vs. @Bean",

      paragraphs: [
        "Component scanning is one way to register Spring beans. Another common approach is to define a @Bean method inside a configuration class.",
        "Use component scanning when you want Spring to discover your annotated classes. Use @Bean when you need explicit construction or want to register a class from a third-party library that you cannot annotate.",
        "Both mechanisms can be used in the same application. However, avoid registering the same logical component twice unless the design intentionally requires separate beans."
      ],

      code: {
        language: "java",
        code: `package com.example.app.config;

import com.example.app.service.ReportFormatter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FormatterConfiguration {

    @Bean
    public ReportFormatter reportFormatter() {
        return new ReportFormatter("PDF");
    }
}`
      },

      bullets: [
        "The example assumes ReportFormatter has a constructor that accepts a format string.",
        "ReportFormatter does not need @Component when it is registered through this @Bean method.",
        "Use @Bean when construction requires explicit arguments or configuration.",
        "Use component scanning for ordinary application classes that can be discovered and instantiated by Spring."
      ]
    },

    {
      id: "testing-component-scanning",
      title: "12. Testing Component Scanning",

      paragraphs: [
        "A Spring context test can verify that a required component is registered and that its dependencies can be resolved.",
        "For a Spring Boot application, @SpringBootTest loads the application context using the application's configuration. The test can then assert that the expected bean exists.",
        "Use the same package layout and scanning configuration as the real application whenever possible. A test that creates a different context configuration may not reveal a production scanning problem."
      ],

      code: {
        language: "java",
        code: `package com.example.app;

import com.example.app.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ComponentScanningTest {

    @Autowired
    private ProductService productService;

    @Test
    void productServiceShouldBeRegistered() {
        assertNotNull(productService);
    }
}`
      },

      bullets: [
        "The example assumes ProductService is a real component in the application's scan hierarchy.",
        "The test requires the usual Spring Boot test dependencies, commonly supplied by spring-boot-starter-test.",
        "A context-load failure can reveal missing beans, ambiguous dependencies, or invalid configuration.",
        "For a focused unit test that does not need Spring, instantiate the class directly and supply its dependencies."
      ]
    },

    {
      id: "common-errors",
      title: "13. Common Errors and Fixes",

      paragraphs: [
        "Component-scanning problems usually arise from incorrect package boundaries, missing stereotype annotations, excluded scan filters, or conflicting bean registrations.",
        "When Spring reports that a required bean cannot be found, first confirm that the class is registered through component scanning, @Bean, Spring Data infrastructure, or another supported mechanism. Then check whether the registration is active in the current environment."
      ],

      bullets: [
        "No qualifying bean: verify component registration, package boundaries, profiles, and conditional configuration.",
        "BeanDefinitionOverrideException or duplicate bean name: inspect duplicate scanning, explicit @Bean methods, and component names.",
        "NoUniqueBeanDefinitionException: multiple beans match by type; use @Qualifier or @Primary when appropriate.",
        "Component annotation appears ineffective: verify the actual Java package declaration and scan root.",
        "Repository bean missing: confirm Spring Data repository scanning and the repository interface configuration.",
        "Entity not discovered: check JPA entity scanning separately; component scanning does not register every entity automatically.",
        "Unexpected bean count: inspect component-scan filters, imported configuration, and explicit bean methods."
      ]
    },

    {
      id: "best-practices",
      title: "14. Component Scanning Best Practices",

      paragraphs: [
        "Keep the main Spring Boot application class in a root package that contains the application's main modules. This is usually the simplest and most maintainable way to configure scanning.",
        "Avoid scanning the entire classpath without a clear reason. Broad scanning can discover unintended components, increase configuration complexity, and cause naming conflicts.",
        "Use basePackageClasses for refactoring-safe package configuration when explicit scan roots are necessary. Use scan filters sparingly and document exclusions that could otherwise be surprising.",
        "Remember that component scanning is only one part of Spring configuration. Entity discovery, Spring Data repository discovery, and auto-configuration may have their own configuration mechanisms."
      ],

      bullets: [
        "Prefer a single clear application root package.",
        "Use stereotype annotations according to class responsibility.",
        "Prefer constructor injection for required dependencies.",
        "Avoid duplicate bean registration.",
        "Keep scanning configuration close to the application configuration.",
        "Check entity and repository scanning independently when working with JPA.",
        "Write a context test for important application wiring."
      ]
    },

    {
      id: "interview",
      title: "15. Component Scanning Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is component scanning in Spring?",
          answer:
            "Component scanning is the process of searching configured packages for eligible annotated classes and registering their bean definitions in the Spring container."
        },
        {
          question: "2. What does @ComponentScan do?",
          answer:
            "@ComponentScan configures which packages Spring should search for eligible components. It also supports include and exclude filters."
        },
        {
          question: "3. Where does Spring Boot scan by default?",
          answer:
            "By default, component scanning starts from the package containing the class annotated with @SpringBootApplication and includes its subpackages."
        },
        {
          question: "4. What annotations are commonly discovered by component scanning?",
          answer:
            "Common examples include @Component, @Service, @Repository, @Controller, and @RestController."
        },
        {
          question: "5. What is the difference between component scanning and dependency injection?",
          answer:
            "Component scanning discovers and registers components. Dependency injection supplies a bean's required dependencies."
        },
        {
          question: "6. Does component scanning instantiate every discovered bean immediately?",
          answer:
            "Not necessarily. Bean instantiation depends on factors such as scope, lazy initialization, and whether the bean is required during context initialization."
        },
        {
          question: "7. What happens if a service is outside the default scan package?",
          answer:
            "Spring may not discover it, so an injection point that requires the service can fail. Reorganize the packages or configure an additional scan root or another registration mechanism."
        },
        {
          question: "8. How can we scan multiple packages?",
          answer:
            "Use @ComponentScan with basePackages or basePackageClasses, or configure scanBasePackages on @SpringBootApplication."
        },
        {
          question: "9. What is the advantage of basePackageClasses?",
          answer:
            "It uses class references instead of package-name strings, making the configuration safer when packages are renamed during refactoring."
        },
        {
          question: "10. What is the relationship between @SpringBootApplication and @ComponentScan?",
          answer:
            "@SpringBootApplication includes @ComponentScan along with Spring Boot configuration and auto-configuration capabilities."
        },
        {
          question: "11. Does @ComponentScan discover JPA entities automatically?",
          answer:
            "Component scanning does not register entities simply because they exist. JPA entity discovery uses entity scanning configuration, which Spring Boot commonly derives from the application package but can be configured separately."
        },
        {
          question: "12. Does @ComponentScan discover Spring Data repositories?",
          answer:
            "Spring Data repository interfaces are registered by Spring Data repository infrastructure. This is related to application package configuration but is not the same as ordinary component scanning."
        },
        {
          question: "13. What are component scan filters?",
          answer:
            "Filters control which classes are included or excluded during scanning. They can match annotations, types, regular expressions, aspect-oriented expressions, or custom conditions."
        },
        {
          question: "14. What is a bean-name conflict?",
          answer:
            "A bean-name conflict can occur when separate registrations use the same name. Inspect component names, configuration methods, and scan boundaries to find the duplicate."
        },
        {
          question: "15. What is the difference between @ComponentScan and @Bean?",
          answer:
            "@ComponentScan discovers eligible annotated classes. @Bean explicitly registers the object returned by a configuration method."
        },
        {
          question: "16. How can we troubleshoot NoSuchBeanDefinitionException?",
          answer:
            "Check the required type, package boundaries, stereotype annotation, active profiles, scan filters, conditional configuration, and other bean-registration mechanisms."
        },
        {
          question: "17. What is NoUniqueBeanDefinitionException?",
          answer:
            "It indicates that multiple beans match a required type and Spring cannot choose an unambiguous candidate. Use @Qualifier, @Primary, or a more explicit dependency design."
        },
        {
          question: "18. Can we exclude @Controller classes from component scanning?",
          answer:
            "Yes. An annotation-based exclude filter can exclude @Controller classes. Because @RestController specializes @Controller, it also matches that filter."
        },
        {
          question: "19. Why should the main Spring Boot class be placed in a root package?",
          answer:
            "It gives default component scanning a common root from which application subpackages can be discovered, reducing the need for custom scan configuration."
        },
        {
          question: "20. How can we verify that component scanning works?",
          answer:
            "A Spring context test, such as a suitable @SpringBootTest, can load the application configuration and verify that required beans are available."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "16. Quick Revision Notes",

      paragraphs: [
        "Component scanning discovers eligible annotated classes in configured packages and registers their bean definitions. Spring then manages those beans and resolves their dependencies according to the application configuration."
      ],

      bullets: [
        "@ComponentScan — configures package scanning.",
        "@SpringBootApplication — includes component scanning by default.",
        "Default scan root — the package containing the application class and its subpackages.",
        "basePackages — explicitly names package roots.",
        "basePackageClasses — uses marker-class references to identify package roots.",
        "Scan filters — include or exclude classes during discovery.",
        "@Bean — explicitly registers an object returned by a configuration method.",
        "Component scanning does not automatically register every Java class.",
        "JPA entity scanning and Spring Data repository scanning may require separate consideration.",
        "Missing bean — inspect registration and scan boundaries.",
        "Multiple matching beans — use @Qualifier or @Primary when appropriate.",
        "Best practice — keep the main application class in a clear root package."
      ]
    }
  ]
};
