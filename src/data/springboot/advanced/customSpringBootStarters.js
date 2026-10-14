
export const customSpringBootStarters = {
  id: 1507,
  title: "Custom Spring Boot Starters",
  slug: "custom-spring-boot-starters",
  topicTitle: "Spring Boot Advanced",
  description:
    "Understand starter dependencies, reusable auto-configuration modules, conditional bean creation, configuration properties, and testing for internal Spring Boot libraries.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "starter-concept",
      title: "What Is a Custom Starter?",
      paragraphs: [
        "A Spring Boot starter is a convenient dependency descriptor that groups libraries commonly required for a particular capability. Instead of adding several related dependencies separately to every project, developers can add one starter dependency.",
        "For example, an organization may create a company-logging-starter, company-security-starter, or company-api-client-starter. Applications that include these starters can reuse approved libraries and consistent configuration.",
        "A starter usually works alongside an auto-configuration module. The starter brings the required dependencies into an application, while auto-configuration conditionally creates Spring beans when the necessary classes, properties, and application context are available.",
        "A custom starter is especially useful when several Spring Boot applications need the same technical capability. It reduces duplicated configuration and helps teams maintain consistent defaults across services.",
        "A good starter should be easy to adopt, safe by default, configurable through documented properties, and flexible enough for applications to override its default behavior."
      ],
      bullets: [
        "Starter: simplifies dependency management.",
        "Auto-configuration: creates beans and configuration conditionally.",
        "Configuration properties: let applications customize starter behavior.",
        "Conditional annotations: prevent unnecessary or conflicting bean creation.",
        "Starter libraries should avoid forcing unrelated dependencies onto consuming applications."
      ]
    },
    {
      id: "starter-vs-autoconfiguration",
      title: "Starter Dependency vs Auto-Configuration",
      paragraphs: [
        "A starter and an auto-configuration module are related, but they solve different problems. The starter primarily defines which dependencies an application receives. The auto-configuration module contains the Java configuration that creates beans and applies defaults.",
        "For a small internal library, these responsibilities can sometimes live in one module. For a reusable library, separating the modules makes the dependency model clearer and allows applications to use the auto-configuration independently when necessary.",
        "A common production design uses a starter artifact that depends on both the auto-configuration artifact and the third-party libraries required by the capability."
      ],
      bullets: [
        "company-tools-spring-boot-autoconfigure: contains configuration classes, properties, and bean definitions.",
        "company-tools-spring-boot-starter: brings together the auto-configuration module and required dependencies.",
        "Consuming application: adds the starter dependency and configures properties only when needed.",
        "For Spring Boot 3, use the AutoConfiguration.imports registration mechanism."
      ],
      code: {
        language: "text",
        code: `company-tools/
├── company-tools-spring-boot-autoconfigure/
│   ├── src/main/java/
│   │   └── com/example/tools/
│   │       ├── CompanyToolsAutoConfiguration.java
│   │       └── CompanyToolsProperties.java
│   └── src/main/resources/
│       └── META-INF/spring/
│           └── org.springframework.boot.autoconfigure.AutoConfiguration.imports
│
└── company-tools-spring-boot-starter/
    └── pom.xml`
      }
    },
    {
      id: "project-dependencies",
      title: "Set Up the Auto-Configuration Module",
      paragraphs: [
        "Create a Maven module for the auto-configuration implementation. It should use a Spring Boot version compatible with the applications that consume the library.",
        "For Spring Boot 3, the configuration annotations are available through Spring Boot's auto-configuration support. The module also needs Spring Context for bean-related APIs and Spring Boot's configuration-properties support.",
        "A common approach is to inherit from the Spring Boot parent POM or import the Spring Boot dependency-management BOM. Keep dependency versions consistent with the target Spring Boot release.",
        "The following is an illustrative Maven dependency setup. In a real multi-module build, use the same compatible Spring Boot version across the auto-configuration module and the consuming application."
      ],
      code: {
        language: "xml",
        code: `<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>`
      },
      bullets: [
        "The configuration processor helps IDEs provide metadata and autocomplete for custom properties.",
        "The configuration processor is primarily a development-time aid, not a runtime requirement.",
        "Use the Spring Boot parent or BOM to manage compatible dependency versions.",
        "Do not assume that every consuming application uses the same internal project structure."
      ]
    },
    {
      id: "auto-configuration",
      title: "Create an Auto-Configuration Class",
      paragraphs: [
        "An auto-configuration class defines beans that Spring Boot can import automatically when an application uses the library. In Spring Boot 3, @AutoConfiguration is the preferred annotation for identifying an auto-configuration class.",
        "@ConditionalOnClass checks whether a required class is available on the classpath. This is useful when a configuration depends on an optional library.",
        "@ConditionalOnMissingBean allows the application to provide its own bean instead of using the starter's default. This is one of the most important techniques for creating reusable and customizable libraries.",
        "The example creates a UTC Clock as a default bean. An application that defines its own Clock bean can replace the default without modifying the starter."
      ],
      code: {
        language: "java",
        code: `package com.example.tools;

import java.time.Clock;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@ConditionalOnClass(Clock.class)
public class CompanyToolsAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(Clock.class)
    public Clock applicationClock() {
        return Clock.systemUTC();
    }
}`
      },
      bullets: [
        "@AutoConfiguration identifies an auto-configuration class.",
        "@ConditionalOnClass enables configuration only when the required class is available.",
        "@ConditionalOnMissingBean(Clock.class) backs off when an application already supplies a Clock bean.",
        "Explicitly naming the bean type in conditional annotations makes the intended behavior easier to understand.",
        "For a library with optional dependencies, put classpath conditions on the relevant configuration or bean definitions."
      ]
    },
    {
      id: "registration-metadata",
      title: "Register Auto-Configuration in Spring Boot 3",
      paragraphs: [
        "Defining an auto-configuration class is not enough. Spring Boot must also discover it. In Spring Boot 3, register the fully qualified class name in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports.",
        "Create the file inside the auto-configuration module at src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Each line identifies one auto-configuration class.",
        "The file name and path must be exact. If the metadata file is missing, placed in the wrong module, or contains an incorrect class name, the configuration may not be discovered when the starter is consumed.",
        "This mechanism differs from component scanning. A library's auto-configuration should be registered explicitly rather than depending on the consuming application's component-scan package."
      ],
      code: {
        language: "text",
        code: `# File:
# src/main/resources/META-INF/spring/
# org.springframework.boot.autoconfigure.AutoConfiguration.imports

com.example.tools.CompanyToolsAutoConfiguration`
      },
      bullets: [
        "Use the fully qualified Java class name.",
        "Register each auto-configuration class on its own line.",
        "Ensure the file is packaged into the auto-configuration JAR.",
        "Do not use the legacy spring.factories EnableAutoConfiguration registration mechanism for new Spring Boot 3 auto-configurations.",
        "The imports file is registration metadata; it is not a Java source file."
      ]
    },
    {
      id: "configuration-properties",
      title: "Expose Custom Configuration Properties",
      paragraphs: [
        "A reusable starter should allow consuming applications to customize behavior without editing the library's source code. Spring Boot's @ConfigurationProperties annotation provides a structured way to bind external configuration into a Java object.",
        "For example, a company API client might expose a base URL and a connection timeout. Applications can configure these values in application.yml while the starter supplies sensible defaults.",
        "Use a unique property prefix to avoid conflicts with unrelated libraries. Keep property names stable because applications may depend on them across releases.",
        "In Spring Boot 3, @EnableConfigurationProperties can register a properties class explicitly from an auto-configuration class."
      ],
      code: {
        language: "java",
        code: `package com.example.tools;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "company.tools")
public class CompanyToolsProperties {

    private boolean enabled = true;
    private Duration timeout = Duration.ofSeconds(3);

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Duration getTimeout() {
        return timeout;
    }

    public void setTimeout(Duration timeout) {
        this.timeout = timeout;
    }
}`
      },
      bullets: [
        "Use a distinctive prefix such as company.tools.",
        "Prefer meaningful defaults that are safe for typical applications.",
        "Use Duration for timeout values instead of manually interpreting arbitrary numeric units.",
        "Document accepted values and defaults.",
        "For more complex configuration, use validation annotations and ensure the appropriate validation dependency is available."
      ]
    },
    {
      id: "properties-registration",
      title: "Connect Properties to Auto-Configuration",
      paragraphs: [
        "The auto-configuration class can enable the properties object and use it to decide whether to create a bean. This keeps configuration externalized instead of hardcoding operational settings throughout the library.",
        "The example below creates a Clock only when the starter is enabled. The @ConditionalOnMissingBean condition still allows an application to provide its own Clock.",
        "When the enabled property is false, the default Clock bean is not created by this configuration. Applications should understand that disabling a bean may also disable any functionality that depends on it."
      ],
      code: {
        language: "java",
        code: `package com.example.tools;

import java.time.Clock;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@ConditionalOnClass(Clock.class)
@EnableConfigurationProperties(CompanyToolsProperties.class)
@ConditionalOnProperty(
    prefix = "company.tools",
    name = "enabled",
    havingValue = "true",
    matchIfMissing = true
)
public class CompanyToolsAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(Clock.class)
    public Clock applicationClock() {
        return Clock.systemUTC();
    }
}`
      },
      bullets: [
        "@EnableConfigurationProperties registers the properties class for binding.",
        "@ConditionalOnProperty activates configuration based on an external property.",
        "havingValue = \"true\" requires the property to be true.",
        "matchIfMissing = true makes the configuration active when the property is absent.",
        "Do not use a property condition if the bean should always be available regardless of a feature flag."
      ]
    },
    {
      id: "conditional-annotations",
      title: "Important Conditional Annotations",
      paragraphs: [
        "Conditional annotations allow a starter to adapt to the application's classpath and configuration. They help auto-configuration remain optional and prevent the library from imposing one fixed setup on every application.",
        "Conditions can apply to an entire configuration class or to an individual bean method. Choose the narrowest scope that expresses the intended behavior clearly.",
        "A well-designed auto-configuration should account for both the presence and absence of optional dependencies, external properties, and user-defined beans."
      ],
      bullets: [
        "@ConditionalOnClass: activates configuration when specified classes are available.",
        "@ConditionalOnMissingClass: activates configuration when specified classes are absent.",
        "@ConditionalOnBean: activates configuration when a matching bean exists.",
        "@ConditionalOnMissingBean: creates a default only when a matching bean is absent.",
        "@ConditionalOnProperty: activates configuration based on a property value.",
        "@ConditionalOnResource: checks whether a resource is available.",
        "@ConditionalOnWebApplication: checks whether the application is a supported web application.",
        "@ConditionalOnExpression: evaluates a SpEL expression; use simpler condition annotations when possible."
      ]
    },
    {
      id: "starter-module-pom",
      title: "Create the Starter Dependency Module",
      paragraphs: [
        "The starter module is usually a small Maven artifact whose primary purpose is to aggregate dependencies. It depends on the auto-configuration module and any libraries that the capability needs.",
        "For example, an internal tools starter could depend on company-tools-spring-boot-autoconfigure. The consuming application then needs to declare the starter rather than separately declaring each implementation dependency.",
        "Use the same group ID and compatible release versions for related internal modules. Avoid adding large libraries that are unrelated to the starter's responsibility.",
        "The following POM shows the core dependency relationship. The actual group ID, artifact ID, and version should match the modules published by your organization."
      ],
      code: {
        language: "xml",
        code: `<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>company-tools-spring-boot-autoconfigure</artifactId>
        <version>\${project.version}</version>
    </dependency>
</dependencies>`
      },
      bullets: [
        "The starter should be simple and predictable.",
        "Keep dependency versions aligned across related artifacts.",
        "If the starter uses a third-party library directly, include the dependency when it is part of the starter's intended capability.",
        "Use optional dependencies carefully when the functionality can be enabled independently.",
        "Avoid circular Maven dependencies between the starter and auto-configuration modules."
      ]
    },
    {
      id: "consume-starter",
      title: "Use the Custom Starter in an Application",
      paragraphs: [
        "After the starter and auto-configuration modules are built and published to a Maven repository, a consuming application can add the starter as a dependency.",
        "For local development, you can also build the modules in the same multi-module Maven project or install them into your local Maven repository.",
        "Once the dependency is present, Spring Boot can discover the registered auto-configuration. The consuming application can customize the properties in application.yml or define its own bean to override a default.",
        "If the application cannot find the starter artifact, check the Maven coordinates, repository configuration, dependency version, and build output."
      ],
      code: {
        language: "xml",
        code: `<dependency>
    <groupId>com.example</groupId>
    <artifactId>company-tools-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>`
      }
    },
    {
      id: "application-configuration",
      title: "Configure the Starter in application.yml",
      paragraphs: [
        "A consuming application can customize the properties exposed by the starter through application.yml. Property names must match the prefix and field names defined by the @ConfigurationProperties class.",
        "In this example, the starter remains enabled and the timeout is configured to five seconds. The Clock example does not directly use the timeout, but a real API-client starter could use the same property-binding pattern when building its client.",
        "Providing sensible defaults means that a consuming application does not have to define every property just to use the starter."
      ],
      code: {
        language: "yaml",
        code: `company:
  tools:
    enabled: true
    timeout: 5s`
      },
      bullets: [
        "Use consistent property names across releases.",
        "Use a property prefix unique to your library.",
        "Do not hardcode environment-specific URLs, credentials, or secrets in a starter.",
        "Use environment variables or a secret-management solution for sensitive configuration."
      ]
    },
    {
      id: "override-default-bean",
      title: "Override a Default Bean",
      paragraphs: [
        "One of the main benefits of @ConditionalOnMissingBean is that it lets the consuming application customize the starter without changing its source code.",
        "If an application defines a Clock bean, the auto-configuration backs off and does not create the default Clock bean. The application's bean becomes the available Clock candidate, assuming there are no other conflicting beans or qualifiers.",
        "This approach is commonly used in reusable libraries for clients, serializers, converters, formatters, and other infrastructure components.",
        "When overriding defaults, ensure the custom bean has compatible behavior and lifecycle requirements. A replacement bean may affect every service that injects that type."
      ],
      code: {
        language: "java",
        code: `package com.example.application;

import java.time.Clock;
import java.time.ZoneId;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public Clock applicationClock() {
        return Clock.system(ZoneId.of("UTC"));
    }
}`
      },
      bullets: [
        "Prefer conditional defaults over unconditional beans in reusable auto-configuration.",
        "Use @Primary or @Qualifier only when multiple beans of the same type are intentionally present.",
        "Avoid relying on fragile bean-definition ordering to determine which implementation wins.",
        "Document how an application can replace or customize the starter's defaults."
      ]
    },
    {
      id: "testing-autoconfiguration",
      title: "Test Auto-Configuration with ApplicationContextRunner",
      paragraphs: [
        "Auto-configuration must be tested independently of a full application. Spring Boot's ApplicationContextRunner allows tests to create a small application context with selected auto-configurations and properties.",
        "A useful test suite should verify the default bean, property-based disabling, and back-off behavior when the application supplies its own bean.",
        "The following example assumes that the auto-configuration class and properties class have already been implemented. It uses JUnit 5 and Spring Boot's test support.",
        "Add the spring-boot-starter-test dependency in the test scope and ensure the test module uses a compatible Spring Boot version."
      ],
      code: {
        language: "java",
        code: `package com.example.tools;

import java.time.Clock;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

import static org.assertj.core.api.Assertions.assertThat;

class CompanyToolsAutoConfigurationTest {

    private final ApplicationContextRunner contextRunner =
        new ApplicationContextRunner()
            .withConfiguration(
                AutoConfigurations.of(
                    CompanyToolsAutoConfiguration.class
                )
            );

    @Test
    void createsDefaultClockWhenEnabled() {
        contextRunner.run(context -> {
            assertThat(context).hasSingleBean(Clock.class);
            assertThat(context.getBean(Clock.class))
                .isNotNull();
        });
    }

    @Test
    void backsOffWhenApplicationProvidesClock() {
        Clock customClock = Clock.systemUTC();

        contextRunner
            .withBean(Clock.class, () -> customClock)
            .run(context -> {
                assertThat(context).hasSingleBean(Clock.class);
                assertThat(context.getBean(Clock.class))
                    .isSameAs(customClock);
            });
    }

    @Test
    void disablesDefaultWhenPropertyIsFalse() {
        contextRunner
            .withPropertyValues("company.tools.enabled=false")
            .run(context ->
                assertThat(context).doesNotHaveBean(Clock.class)
            );
    }
}`
      },
      bullets: [
        "Test the default configuration path.",
        "Test that user-defined beans take precedence.",
        "Test important property values and missing-property behavior.",
        "Test optional-class conditions when the starter supports optional integrations.",
        "Test the published artifact in a small sample application to verify registration metadata and transitive dependencies."
      ]
    },
    {
      id: "testing-registration",
      title: "Verify the Packaged Starter",
      paragraphs: [
        "Unit tests can pass even when the auto-configuration metadata is missing from the packaged JAR. Test the library as a consumer would use it, not only as a Java class in the same module.",
        "Build the auto-configuration and starter modules, inspect the generated JAR, and verify that the AutoConfiguration.imports file is included at the correct path.",
        "A small sample Spring Boot application that depends only on the starter is a practical integration test. It confirms that dependency resolution, registration metadata, and conditional bean creation work together.",
        "When troubleshooting, inspect the runtime dependency tree and Spring Boot's condition evaluation report. These can reveal missing dependencies, failed conditions, or an auto-configuration class that was never discovered."
      ],
      code: {
        language: "bash",
        code: `# Build the multi-module project
mvn clean verify

# Inspect the auto-configuration JAR
jar tf company-tools-spring-boot-autoconfigure/target/company-tools-spring-boot-autoconfigure-1.0.0.jar

# Inspect the packaged registration file
unzip -p company-tools-spring-boot-autoconfigure/target/company-tools-spring-boot-autoconfigure-1.0.0.jar META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

# Inspect dependencies from the consuming application
mvn dependency:tree`
      },
      bullets: [
        "Adjust artifact paths and versions to match your Maven build.",
        "Use the Spring Boot condition evaluation report when a configuration does not activate.",
        "In a suitable development environment, enable the conditions report with debug logging or the supported debug option.",
        "Do not assume that a class is auto-configured simply because it exists in the JAR."
      ]
    },
    {
      id: "auto-configuration-order",
      title: "Auto-Configuration Ordering and Design",
      paragraphs: [
        "When multiple auto-configuration classes interact, their ordering may matter. Spring Boot provides @AutoConfigureBefore and @AutoConfigureAfter for declaring relationships between auto-configurations.",
        "Use ordering annotations only when there is a real dependency between configurations. Prefer independent conditions and clear bean contracts instead of relying on broad ordering rules.",
        "Auto-configuration is intended to supply defaults based on the application environment. It should not silently replace a bean that an application has explicitly configured.",
        "Keep configuration classes focused. Separate unrelated integrations so an optional feature does not accidentally activate or require every dependency in the library."
      ],
      bullets: [
        "@AutoConfigureBefore expresses that one auto-configuration should be processed before another.",
        "@AutoConfigureAfter expresses that one auto-configuration should be processed after another.",
        "@AutoConfigureOrder can express relative ordering where appropriate.",
        "Use conditions to express when configuration applies, not ordering as a substitute for conditions.",
        "Review startup condition reports when debugging unexpected auto-configuration behavior."
      ]
    },
    {
      id: "optional-integrations",
      title: "Support Optional Dependencies Safely",
      paragraphs: [
        "Some starters provide integrations with optional libraries. For example, an internal API starter may support both a default HTTP client and an optional metrics integration.",
        "Use classpath conditions to ensure that configuration requiring an optional library activates only when that library is available. Avoid directly referencing optional classes in places that can cause class-loading failures before the condition is evaluated.",
        "For larger integrations, isolate optional bean definitions in their own conditional configuration classes. This makes dependencies and activation rules easier to understand and test.",
        "Document which dependency enables each integration and what happens when the dependency is absent."
      ],
      bullets: [
        "Keep optional integrations separate from core configuration where practical.",
        "Use @ConditionalOnClass for optional library requirements.",
        "Test both the dependency-present and dependency-absent scenarios.",
        "Avoid forcing large optional dependencies onto every consumer.",
        "Make missing optional functionality explicit in documentation and diagnostics."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Custom Starter Mistakes",
      paragraphs: [
        "Most custom starter problems come from incorrect metadata, incompatible dependency versions, overly broad configuration, or beans that cannot be overridden.",
        "Treat the starter as a public library contract even when it is used only inside one organization. Application teams may depend on its properties, default beans, and transitive dependencies for a long time."
      ],
      bullets: [
        "Missing or incorrectly named AutoConfiguration.imports file: Spring Boot may not discover the configuration.",
        "Wrong fully qualified class name: the registration metadata points to a class that does not exist.",
        "Using @ComponentScan as the only discovery mechanism: the consuming application's package structure may not include the library's packages.",
        "Unconditional bean creation: an application-defined bean may conflict with the starter.",
        "Missing @EnableConfigurationProperties or another registration mechanism: custom properties may not bind as expected.",
        "Unmanaged dependency versions: consumers may experience classpath conflicts.",
        "Too many transitive dependencies: applications receive libraries they do not need.",
        "No integration tests: metadata and packaging defects remain undiscovered.",
        "Breaking property names without a migration plan: existing applications may change behavior after an upgrade.",
        "Hardcoded secrets or environment-specific values: the library becomes unsafe or difficult to reuse."
      ]
    },
    {
      id: "production-best-practices",
      title: "Production Best Practices",
      paragraphs: [
        "A production-quality starter should provide a narrow, documented capability and predictable defaults. Consumers should understand which beans it creates, which properties it exposes, and how to override the defaults.",
        "Keep the public API small. Avoid exposing implementation details unless consumers genuinely need them. Treat property names and bean contracts as compatibility commitments.",
        "Version the starter and auto-configuration modules consistently. Use automated tests and release notes to communicate changes that affect consumers.",
        "For internal starters, publish through a controlled artifact repository and provide a sample application that demonstrates the intended configuration.",
        "Review security and operational defaults carefully. Do not enable network listeners, scheduled jobs, or expensive background work unexpectedly just because an application adds a dependency."
      ],
      bullets: [
        "Choose safe defaults and make important behavior configurable.",
        "Use conditional bean definitions so applications can customize behavior.",
        "Keep optional dependencies optional where practical.",
        "Add tests for defaults, overrides, properties, and optional integrations.",
        "Document compatibility with Spring Boot and Java versions.",
        "Use semantic versioning or an equivalent release policy.",
        "Publish migration notes for breaking changes.",
        "Avoid unexpected startup work and hidden operational side effects."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a Spring Boot starter?",
          answer: "A starter is a dependency descriptor that groups libraries commonly required for a capability, making dependency management easier for consuming applications."
        },
        {
          question: "What is a custom Spring Boot starter?",
          answer: "It is an organization- or project-specific starter that packages dependencies and often reusable auto-configuration so multiple applications can adopt the same capability."
        },
        {
          question: "What is auto-configuration?",
          answer: "Auto-configuration conditionally registers configuration and beans based on available classes, properties, and existing beans in the application context."
        },
        {
          question: "What is the difference between a starter and auto-configuration?",
          answer: "A starter primarily aggregates dependencies, while an auto-configuration module contains the conditional configuration and bean definitions that provide defaults."
        },
        {
          question: "How do you register auto-configuration in Spring Boot 3?",
          answer: "Add the fully qualified auto-configuration class name to META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports in the auto-configuration JAR."
        },
        {
          question: "What does @AutoConfiguration do?",
          answer: "It identifies a Spring Boot auto-configuration class that can be discovered through Boot's auto-configuration registration mechanism."
        },
        {
          question: "What does @ConditionalOnClass do?",
          answer: "It enables configuration or bean definitions when the specified class is available on the classpath."
        },
        {
          question: "What does @ConditionalOnMissingBean do?",
          answer: "It allows a default bean to be registered only when a matching bean has not already been provided."
        },
        {
          question: "Why is @ConditionalOnMissingBean important in a starter?",
          answer: "It allows consuming applications to replace default implementations without modifying the starter's source code."
        },
        {
          question: "What is @ConditionalOnProperty used for?",
          answer: "It activates configuration based on an external property, such as enabling or disabling a starter feature."
        },
        {
          question: "What is @ConfigurationProperties?",
          answer: "It binds external configuration values with a common prefix to a structured Java object, making starter settings easier to maintain."
        },
        {
          question: "Why use a unique configuration prefix?",
          answer: "A unique prefix reduces naming conflicts with Spring Boot and other libraries and makes ownership of properties clear."
        },
        {
          question: "Why separate the starter and auto-configuration modules?",
          answer: "It separates dependency aggregation from configuration implementation, making the library easier to reuse, test, and maintain."
        },
        {
          question: "Why should a starter avoid unconditional bean creation?",
          answer: "Unconditional beans can conflict with application-defined implementations and make the starter difficult to customize."
        },
        {
          question: "What is AutoConfiguration.imports?",
          answer: "It is a Spring Boot 3 registration metadata file that lists fully qualified auto-configuration class names, one per line."
        },
        {
          question: "Can a consuming application override a starter's default bean?",
          answer: "Yes. If the starter uses @ConditionalOnMissingBean for that type, the application's matching bean normally causes the default bean definition to back off."
        },
        {
          question: "How do you test a custom auto-configuration?",
          answer: "Use ApplicationContextRunner to test default beans, custom-bean overrides, property conditions, and optional-class conditions in a small application context."
        },
        {
          question: "Why test the packaged starter instead of only testing the configuration class?",
          answer: "Packaging tests verify registration metadata, artifact contents, and dependency relationships that a direct unit test may not exercise."
        },
        {
          question: "How can you debug an auto-configuration that is not loading?",
          answer: "Check the imports metadata, dependency tree, classpath conditions, property values, and Spring Boot's condition evaluation report."
        },
        {
          question: "How do you support an optional third-party integration?",
          answer: "Isolate the integration and use classpath conditions so its configuration activates only when the required dependency is available."
        },
        {
          question: "What is auto-configuration ordering?",
          answer: "It is a way to express relationships between auto-configuration classes using annotations such as @AutoConfigureBefore and @AutoConfigureAfter when ordering genuinely matters."
        },
        {
          question: "What should you document when publishing a company starter?",
          answer: "Document its purpose, supported versions, dependencies, configuration properties, defaults, created beans, customization points, and migration guidance."
        },
        {
          question: "What is the main benefit of a custom starter in a microservices architecture?",
          answer: "It allows multiple services to reuse consistent infrastructure defaults, reducing duplicated configuration and making common behavior easier to maintain."
        },
        {
          question: "Should a starter perform expensive work as soon as it is added?",
          answer: "Generally no. Adding a dependency should not unexpectedly start expensive background work or expose network endpoints. Such behavior should be explicit, configurable, and documented."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "A custom Spring Boot starter makes a reusable capability easy to adopt across multiple applications. The starter aggregates dependencies, while auto-configuration conditionally creates beans and applies sensible defaults.",
        "For Spring Boot 3, register auto-configuration through META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. Use @ConditionalOnClass for classpath requirements, @ConditionalOnMissingBean for overridable defaults, and @ConfigurationProperties for external settings.",
        "Test the configuration with ApplicationContextRunner, verify the packaged JAR, and validate the starter from a consuming application's perspective. A good starter is configurable, well tested, versioned, and safe to add to an application."
      ],
      bullets: [
        "Starter = convenient dependency aggregation.",
        "Auto-configuration = conditional bean and configuration setup.",
        "@AutoConfiguration = identifies auto-configuration.",
        "@ConditionalOnClass = checks classpath availability.",
        "@ConditionalOnMissingBean = provides overridable defaults.",
        "@ConditionalOnProperty = controls activation through configuration.",
        "@ConfigurationProperties = binds external settings.",
        "AutoConfiguration.imports = Spring Boot 3 registration metadata.",
        "ApplicationContextRunner = focused auto-configuration testing.",
        "Packaged-JAR and sample-application tests catch integration problems."
      ]
    }
  ]
};
