
export const conditionalBeansAndAutoConfiguration = {
  id: 1508,
  title: "Conditional Beans and Auto-Configuration",
  slug: "conditional-beans-and-auto-configuration",
  topicTitle: "Spring Boot Advanced",
  description:
    "Learn how Spring Boot chooses configuration using conditions, classpath detection, properties, profiles, existing beans, and auto-configuration.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "conditional-bean-concept",
      title: "What Are Conditional Beans?",
      paragraphs: [
        "A Spring bean is an object managed by the Spring IoC container. In a simple application, a bean may always be registered. In a more flexible application, bean registration can depend on the classpath, configuration properties, active profiles, or other beans.",
        "Conditional configuration lets an application register beans only when certain conditions are met. Spring Boot uses this technique extensively to provide sensible defaults without forcing every application to configure everything manually.",
        "For example, an application can provide a default notification sender unless a custom sender has already been registered. A feature can also be enabled only when a configuration property is set to true.",
        "Conditional beans are particularly useful in reusable libraries, custom starters, optional integrations, and applications that need different implementations for different environments.",
        "Conditions influence whether configuration or bean definitions are registered. They are not a substitute for business validation or runtime authorization checks."
      ],
      bullets: [
        "A bean is an object managed by the Spring container.",
        "A conditional bean is registered only when its associated condition matches.",
        "Spring Boot uses conditional configuration to provide sensible defaults.",
        "Applications can override many default beans with their own implementations.",
        "Conditions can depend on classes, properties, profiles, resources, or existing beans.",
        "Use conditions to control configuration, not to replace security checks or business rules."
      ]
    },
    {
      id: "how-autoconfiguration-works",
      title: "How Spring Boot Auto-Configuration Works",
      paragraphs: [
        "Spring Boot auto-configuration attempts to configure an application based on the dependencies available on the classpath and the application's existing configuration. For example, adding the appropriate web dependencies can cause Spring Boot to configure web-related infrastructure.",
        "Auto-configuration is not magic. Spring Boot discovers registered auto-configuration classes and evaluates their conditions. Matching configurations contribute bean definitions to the application context.",
        "An auto-configuration class can require a library to be present, a property to have a particular value, or another bean to exist. It can also back off when the application has already provided a matching bean.",
        "In Spring Boot 3, auto-configuration classes are commonly identified using @AutoConfiguration and registered through META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports.",
        "Component scanning and auto-configuration are related but different mechanisms. Component scanning discovers components in configured packages, while Boot auto-configuration uses its registration mechanism and conditional rules."
      ],
      bullets: [
        "@SpringBootApplication combines configuration, component scanning, and auto-configuration enablement.",
        "@EnableAutoConfiguration enables Spring Boot's auto-configuration mechanism.",
        "@AutoConfiguration identifies a Spring Boot auto-configuration class.",
        "Conditions determine whether a configuration or bean definition applies.",
        "User-defined configuration can customize or replace default behavior.",
        "Auto-configuration does not mean that every available bean is created unconditionally."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            DemoApplication.class,
            args
        );
    }
}`
      }
    },
    {
      id: "conditional-on-property",
      title: "Use @ConditionalOnProperty",
      paragraphs: [
        "@ConditionalOnProperty activates configuration based on the value of an application property. It is useful for optional features such as notifications, scheduled jobs, external integrations, and experimental functionality.",
        "The name attribute identifies the property to check. The havingValue attribute specifies the value that must match. The matchIfMissing attribute determines what happens when the property is absent.",
        "By default, a property condition generally matches when the property exists and is not equal to false, ignoring case. Specifying havingValue makes the expected value explicit.",
        "For predictable feature flags, use an explicit value such as true and choose a deliberate default for missing properties."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class NotificationConfiguration {

    @Bean
    @ConditionalOnProperty(
        prefix = "app.notifications",
        name = "enabled",
        havingValue = "true",
        matchIfMissing = false
    )
    public NotificationService notificationService() {
        return new NotificationService();
    }
}

public class NotificationService {

    public void send(String message) {
        // Add the real delivery implementation.
    }
}`
      },
      bullets: [
        "havingValue = \"true\" explicitly requires the property to be true.",
        "matchIfMissing = false means the condition does not match when the property is absent.",
        "matchIfMissing = true allows the condition to match when the property is absent.",
        "Use property prefixes that clearly identify the feature or library.",
        "A feature flag that controls bean creation is not automatically a runtime authorization mechanism."
      ]
    },
    {
      id: "configure-properties",
      title: "Configure Conditional Features in application.yml",
      paragraphs: [
        "The application can enable the notification feature through external configuration. This avoids recompiling the application just to change the feature setting.",
        "Keep configuration keys consistent across environments. For example, development and production can use different values when the operational requirements differ.",
        "The following YAML enables the notification bean. If the property is omitted and matchIfMissing is false, the bean is not registered by this configuration."
      ],
      code: {
        language: "yaml",
        code: `app:
  notifications:
    enabled: true`
      },
      bullets: [
        "Use application.yml or application.properties for ordinary application configuration.",
        "Use environment-specific configuration when behavior differs across deployments.",
        "Document whether a feature defaults to enabled or disabled.",
        "Do not put passwords, API tokens, or other secrets directly into source-controlled configuration."
      ]
    },
    {
      id: "conditional-on-missing-bean",
      title: "Use @ConditionalOnMissingBean",
      paragraphs: [
        "@ConditionalOnMissingBean allows reusable configuration to provide a default implementation only when a matching bean has not already been registered.",
        "This is important for custom starters and libraries. The library can provide a default service, while a consuming application can define its own implementation without editing the library.",
        "The condition is evaluated against bean definitions visible at the relevant point in configuration processing. For predictable auto-configuration behavior, place default bean definitions in auto-configuration and declare user overrides through ordinary application configuration.",
        "Use the intended bean type in the condition. This makes the customization contract explicit and helps avoid unexpected duplicate-bean situations."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class NotificationConfiguration {

    @Bean
    @ConditionalOnMissingBean(NotificationSender.class)
    public NotificationSender notificationSender() {
        return new DefaultNotificationSender();
    }
}

interface NotificationSender {
    void send(String message);
}

class DefaultNotificationSender implements NotificationSender {

    @Override
    public void send(String message) {
        // Default implementation.
    }
}`
      },
      bullets: [
        "The default sender is registered only when a matching NotificationSender bean is absent.",
        "An application can provide a custom NotificationSender implementation.",
        "This annotation is commonly used in auto-configuration and reusable libraries.",
        "Avoid using @Primary as a substitute for a missing-bean condition when the goal is to avoid creating the default bean.",
        "If multiple implementations are intentional, use @Qualifier or @Primary to resolve injection ambiguity."
      ]
    },
    {
      id: "custom-bean-override",
      title: "Override a Default Bean",
      paragraphs: [
        "Suppose the starter provides DefaultNotificationSender, but a production application wants to use EmailNotificationSender. The application can register its own NotificationSender bean.",
        "Because the default is protected by @ConditionalOnMissingBean(NotificationSender.class), the auto-configuration can back off when the custom bean is already available.",
        "This pattern separates reusable defaults from application-specific decisions. It is widely used for HTTP clients, serializers, cache managers, message converters, and notification implementations."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class ApplicationNotificationConfiguration {

    @Bean
    public NotificationSender notificationSender() {
        return new EmailNotificationSender();
    }
}

class EmailNotificationSender implements NotificationSender {

    @Override
    public void send(String message) {
        // Integrate with the chosen email delivery system.
    }
}`
      },
      bullets: [
        "The application defines its preferred implementation.",
        "The auto-configured default backs off when the matching bean is visible.",
        "Keep the interface stable so different implementations can be substituted.",
        "Use constructor injection to depend on the interface rather than a concrete implementation.",
        "Do not rely on accidental configuration ordering to resolve duplicate beans."
      ]
    },
    {
      id: "conditional-on-class",
      title: "Use @ConditionalOnClass",
      paragraphs: [
        "@ConditionalOnClass activates configuration when specified classes are available on the classpath. It is especially useful when a library provides optional integrations.",
        "For example, a metrics integration may require a particular third-party library. The configuration can be enabled only when that library is present, preventing unnecessary configuration in applications that do not use it.",
        "This condition is frequently used in Spring Boot auto-configuration. When designing optional integrations, isolate code that depends on optional types so class loading remains safe when the dependency is absent."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@ConditionalOnClass(name = "com.example.metrics.MetricsClient")
public class MetricsAutoConfiguration {

    @Bean
    public MetricsReporter metricsReporter() {
        return new MetricsReporter();
    }
}

class MetricsReporter {
    // Implement reporting behavior for the optional integration.
}`
      },
      bullets: [
        "@ConditionalOnClass checks classpath availability.",
        "@ConditionalOnMissingClass checks whether specified classes are absent.",
        "Class-name conditions can help avoid directly referencing an optional type in annotation metadata.",
        "Keep optional integration dependencies out of the core module when practical.",
        "Test the configuration with the optional dependency both present and absent."
      ]
    },
    {
      id: "conditional-on-bean",
      title: "Use @ConditionalOnBean",
      paragraphs: [
        "@ConditionalOnBean activates configuration when a matching bean already exists in the application context. It is useful when one component depends on infrastructure that another configuration provides.",
        "For example, a custom metrics reporter might only make sense when a MetricsClient bean exists. The condition prevents the reporter from being configured without its prerequisite.",
        "Auto-configuration ordering matters when one configuration expects another auto-configuration to contribute a bean. Prefer explicit configuration relationships where needed and avoid fragile assumptions about discovery order."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class MetricsReporterConfiguration {

    @Bean
    @ConditionalOnBean(MetricsClient.class)
    public MetricsReporter metricsReporter(
            MetricsClient metricsClient) {
        return new MetricsReporter(metricsClient);
    }
}

interface MetricsClient {
    void increment(String metricName);
}

class MetricsReporter {

    private final MetricsClient metricsClient;

    MetricsReporter(MetricsClient metricsClient) {
        this.metricsClient = metricsClient;
    }
}`
      },
      bullets: [
        "@ConditionalOnBean checks for a matching bean definition.",
        "The condition is useful when a feature requires another configured component.",
        "A missing prerequisite may cause the reporter bean not to be registered.",
        "Use conditions to express optional dependencies clearly.",
        "For related auto-configurations, account for processing order when required."
      ]
    },
    {
      id: "profiles",
      title: "Use @Profile for Environment-Specific Beans",
      paragraphs: [
        "@Profile controls whether a bean or configuration is eligible for registration based on active Spring profiles. Profiles are commonly used to select environment-specific implementations or configuration.",
        "For example, an application may use a development notification sender locally and a real email sender in production. The active profile determines which profile-specific configuration is eligible.",
        "@Profile and @ConditionalOnProperty solve related but different problems. Profiles select configuration based on an environment grouping, while property conditions check specific property values.",
        "Neither profiles nor ordinary feature flags should be treated as the application's security boundary. Authentication and authorization must still be enforced at the appropriate layer."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration(proxyBeanMethods = false)
public class NotificationProfileConfiguration {

    @Bean
    @Profile("dev")
    public NotificationSender developmentSender() {
        return new DevelopmentNotificationSender();
    }

    @Bean
    @Profile("prod")
    public NotificationSender productionSender() {
        return new EmailNotificationSender();
    }
}

class DevelopmentNotificationSender
        implements NotificationSender {

    @Override
    public void send(String message) {
        // Print or capture messages for local development.
    }
}`
      },
      bullets: [
        "@Profile(\"dev\") activates a bean when the dev profile is active.",
        "Profiles can be activated through configuration or deployment settings.",
        "Avoid activating incompatible implementations at the same time unless bean selection is explicit.",
        "Use @ConditionalOnProperty when a single feature needs an independent on/off switch.",
        "Keep environment-specific secrets outside source-controlled files."
      ]
    },
    {
      id: "other-conditions",
      title: "Other Useful Conditional Annotations",
      paragraphs: [
        "Spring Boot offers additional condition annotations that make auto-configuration more expressive. They help configuration respond to the application environment without requiring every application to maintain custom conditional logic.",
        "Choose the most specific condition that describes the requirement. Simple, explicit conditions are easier to test and debug than large SpEL expressions."
      ],
      bullets: [
        "@ConditionalOnResource: checks whether a specified resource is available.",
        "@ConditionalOnWebApplication: checks whether the application is a supported web application.",
        "@ConditionalOnNotWebApplication: matches when the application is not a supported web application.",
        "@ConditionalOnExpression: evaluates a SpEL expression; use simpler condition annotations when possible.",
        "@ConditionalOnJava: checks the Java version.",
        "@ConditionalOnSingleCandidate: matches when a single suitable bean candidate can be selected.",
        "@ConditionalOnMissingClass: matches when specified classes are absent.",
        "@ConditionalOnWarDeployment: supports conditions related to traditional WAR deployment where applicable."
      ]
    },
    {
      id: "auto-configuration-registration",
      title: "Register Custom Auto-Configuration",
      paragraphs: [
        "In Spring Boot 3, a reusable auto-configuration class should be registered through META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports.",
        "The metadata file contains fully qualified class names, one per line. It must be packaged into the auto-configuration JAR so applications using the library can discover the configuration.",
        "Registration and condition evaluation are separate steps. A registered configuration can still be skipped when its classpath, bean, or property conditions do not match.",
        "For a reusable starter, keep the configuration class focused and make default beans conditional so consuming applications can customize them."
      ],
      code: {
        language: "text",
        code: `# File:
# src/main/resources/META-INF/spring/
# org.springframework.boot.autoconfigure.AutoConfiguration.imports

com.example.tools.MetricsAutoConfiguration`
      },
      bullets: [
        "Use @AutoConfiguration for a Spring Boot 3 auto-configuration class.",
        "Register its fully qualified name in AutoConfiguration.imports.",
        "Ensure the metadata file is inside the auto-configuration module.",
        "Do not depend on the consuming application's component-scan packages to discover library auto-configuration.",
        "Test the packaged JAR, not only the Java configuration class."
      ]
    },
    {
      id: "condition-evaluation",
      title: "Understand Condition Evaluation",
      paragraphs: [
        "Spring Boot evaluates configuration conditions during application-context setup. Conditions can match or fail based on properties, classpath contents, existing beans, resources, and application type.",
        "If a condition does not match, the associated configuration or bean definition is not registered through that conditional path. This does not necessarily mean that the application has no bean of that type, because another configuration may provide one.",
        "Condition evaluation reports explain why auto-configurations matched or did not match. They are particularly useful when a bean is missing or when an unexpected default configuration is active.",
        "When debugging, distinguish between a configuration class that was never discovered and a discovered configuration whose condition failed."
      ],
      bullets: [
        "Discovery determines which auto-configuration classes Spring Boot considers.",
        "Conditions determine whether the associated configuration applies.",
        "Bean registration contributes definitions to the application context.",
        "Dependency injection resolves beans needed by other components.",
        "A missing bean can result from registration, condition, scanning, profile, or dependency problems."
      ]
    },
    {
      id: "debugging-conditions",
      title: "Debugging Missing Beans",
      paragraphs: [
        "If an expected bean is missing, first verify that the class is registered through the intended mechanism. For an ordinary component, check component scanning. For a custom auto-configuration, check the registration metadata.",
        "Next, inspect the condition requirements: confirm property names and values, active profiles, required classes, and any prerequisite beans. A typo in a property key can prevent a configuration from matching.",
        "Spring Boot's condition evaluation report can show which auto-configurations matched or did not match and often explains the failed condition.",
        "Avoid adding duplicate beans blindly. Identify the reason the expected configuration was not applied before changing bean definitions."
      ],
      code: {
        language: "yaml",
        code: `# application.yml
debug: true

app:
  notifications:
    enabled: true`
      },
      bullets: [
        "Check the exact property name and configured value.",
        "Check which Spring profiles are active.",
        "Verify the required library exists on the runtime classpath.",
        "Verify custom auto-configuration registration metadata.",
        "Inspect the condition evaluation report in startup output.",
        "Use Actuator's conditions endpoint only when Actuator is configured and access to the endpoint is properly secured.",
        "Check whether another configuration already provides the required bean."
      ]
    },
    {
      id: "testing-conditions",
      title: "Test Conditional Configuration",
      paragraphs: [
        "Conditional configuration should be tested for both matching and non-matching conditions. A test that covers only the enabled case may miss a feature that is accidentally active by default or a default bean that cannot be overridden.",
        "ApplicationContextRunner is useful for testing Spring Boot auto-configuration in a small application context without starting a full application. It allows tests to provide property values and user configuration and then inspect the resulting beans.",
        "The following example tests the notification property condition. It assumes NotificationConfiguration and NotificationService are defined as shown earlier in this lesson."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

import static org.assertj.core.api.Assertions.assertThat;

class NotificationConfigurationTest {

    private final ApplicationContextRunner contextRunner =
        new ApplicationContextRunner()
            .withUserConfiguration(
                NotificationConfiguration.class
            );

    @Test
    void createsBeanWhenFeatureIsEnabled() {
        contextRunner
            .withPropertyValues(
                "app.notifications.enabled=true"
            )
            .run(context ->
                assertThat(context)
                    .hasSingleBean(NotificationService.class)
            );
    }

    @Test
    void doesNotCreateBeanWhenFeatureIsDisabled() {
        contextRunner
            .withPropertyValues(
                "app.notifications.enabled=false"
            )
            .run(context ->
                assertThat(context)
                    .doesNotHaveBean(NotificationService.class)
            );
    }

    @Test
    void doesNotCreateBeanWhenPropertyIsMissing() {
        contextRunner.run(context ->
            assertThat(context)
                .doesNotHaveBean(NotificationService.class)
        );
    }
}`
      },
      bullets: [
        "Include Spring Boot test support and JUnit 5 in the test dependencies.",
        "Test property enabled, disabled, and missing cases.",
        "Test that user-defined beans override default auto-configured beans.",
        "Test optional classpath dependencies where the starter supports them.",
        "Test the published artifact to verify auto-configuration discovery."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes with Conditional Beans",
      paragraphs: [
        "Conditional configuration is powerful, but incorrect conditions can cause missing beans, duplicate implementations, or features that activate unexpectedly. Make the intended defaults and customization points explicit."
      ],
      bullets: [
        "Wrong property key: the condition never matches because the configured name does not match the annotation.",
        "Unclear default behavior: omitting matchIfMissing can produce behavior different from what the developer expects.",
        "Unconditional default beans: the starter conflicts with an application-provided implementation.",
        "Missing auto-configuration metadata: Spring Boot never discovers the custom configuration.",
        "Incorrect component scanning assumptions: a library component is outside the application's scanned packages.",
        "Optional dependency problems: configuration references a class that is unavailable at runtime.",
        "Unnecessary @Primary usage: ambiguity is hidden instead of designing the correct conditional bean behavior.",
        "Overly complicated SpEL expressions: configuration becomes difficult to test and understand.",
        "No negative tests: a bean is created even when a feature should be disabled.",
        "Using feature conditions as security: hiding a bean does not replace endpoint authorization or access control."
      ]
    },
    {
      id: "best-practices",
      title: "Production Best Practices",
      paragraphs: [
        "Design conditional configuration with predictable defaults, clear property names, and explicit customization points. Reusable libraries should back off when applications provide their own implementations wherever overriding is part of the intended contract.",
        "Keep auto-configuration modular. Optional integrations should activate only when their dependencies and conditions are satisfied. Avoid adding unrelated dependencies or creating expensive background activity simply because a starter is present.",
        "Use condition evaluation reports to diagnose startup behavior and tests to verify both matching and non-matching conditions. Document configuration defaults and compatibility expectations so applications can upgrade safely."
      ],
      bullets: [
        "Use @ConditionalOnMissingBean for overridable defaults.",
        "Use @ConditionalOnProperty for explicit feature switches.",
        "Use @ConditionalOnClass for optional classpath integrations.",
        "Use @Profile for environment-specific configuration.",
        "Keep conditions simple and narrowly scoped.",
        "Test enabled, disabled, missing-property, and override scenarios.",
        "Register Spring Boot 3 auto-configuration using AutoConfiguration.imports.",
        "Avoid hardcoded secrets and unexpected startup side effects.",
        "Document defaults and configuration properties."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Why does Spring Boot use conditional auto-configuration?",
          answer: "It provides sensible defaults based on the application's dependencies and configuration while allowing applications to customize behavior."
        },
        {
          question: "What is a conditional bean?",
          answer: "A conditional bean is registered only when a specified condition, such as a property value or missing bean, is satisfied."
        },
        {
          question: "What is auto-configuration?",
          answer: "Auto-configuration conditionally configures application infrastructure based on the classpath, properties, existing beans, and other environment details."
        },
        {
          question: "What does @ConditionalOnProperty do?",
          answer: "It activates configuration when a named property satisfies the specified condition."
        },
        {
          question: "What does matchIfMissing mean?",
          answer: "It determines whether a property condition can match when the property is not present."
        },
        {
          question: "What does @ConditionalOnMissingBean do?",
          answer: "It allows a default bean definition to be registered only when a matching bean has not already been provided."
        },
        {
          question: "How is @ConditionalOnMissingBean useful in a custom starter?",
          answer: "It lets the starter provide a default implementation that a consuming application can replace with its own bean."
        },
        {
          question: "What does @ConditionalOnClass do?",
          answer: "It enables configuration when the specified class is available on the classpath, which is useful for optional integrations."
        },
        {
          question: "What is the difference between @ConditionalOnBean and @ConditionalOnMissingBean?",
          answer: "@ConditionalOnBean requires a matching bean to exist, while @ConditionalOnMissingBean applies when a matching bean is absent."
        },
        {
          question: "What is the difference between @Profile and @ConditionalOnProperty?",
          answer: "@Profile selects configuration based on active environment profiles, while @ConditionalOnProperty checks specific configuration property values."
        },
        {
          question: "What does @ConditionalOnExpression do?",
          answer: "It evaluates a SpEL expression to determine whether a configuration condition matches. Simpler condition annotations are usually preferable when they express the requirement clearly."
        },
        {
          question: "What is the difference between component scanning and auto-configuration?",
          answer: "Component scanning discovers annotated components in configured packages, while auto-configuration uses Spring Boot's registration mechanism and conditional rules."
        },
        {
          question: "How are custom auto-configurations registered in Spring Boot 3?",
          answer: "They are listed by fully qualified class name in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports."
        },
        {
          question: "Can a user-defined bean override an auto-configured bean?",
          answer: "Yes, when the auto-configuration uses an appropriate condition such as @ConditionalOnMissingBean and the user-defined bean is visible during condition evaluation."
        },
        {
          question: "What is a condition evaluation report?",
          answer: "It explains which auto-configuration conditions matched or failed, helping developers investigate unexpected or missing configuration."
        },
        {
          question: "How do you debug a missing bean?",
          answer: "Check component scanning or auto-configuration registration, active profiles, required classes, property values, and the condition evaluation report."
        },
        {
          question: "Why should auto-configuration be tested with both positive and negative cases?",
          answer: "Positive tests verify that intended beans are created, while negative tests ensure they are not created when their conditions are false or missing."
        },
        {
          question: "What is ApplicationContextRunner?",
          answer: "It is a Spring Boot test utility for creating small application contexts with selected auto-configurations, properties, and user-defined beans."
        },
        {
          question: "Does @ConditionalOnProperty provide security?",
          answer: "No. It controls configuration and bean registration. Authentication, authorization, and access-control rules must still be enforced at the appropriate application boundaries."
        },
        {
          question: "What is the main advantage of conditional beans?",
          answer: "They make applications and libraries more flexible by enabling features only when appropriate and providing defaults that can be customized."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Conditional beans let Spring register configuration only when specified conditions match. Spring Boot uses this mechanism to create sensible defaults based on dependencies, properties, profiles, and existing beans.",
        "Use @ConditionalOnProperty for feature switches, @ConditionalOnClass for optional dependencies, @ConditionalOnBean when a prerequisite bean must exist, and @ConditionalOnMissingBean for overridable defaults. Use @Profile to select environment-specific configuration.",
        "In Spring Boot 3, register custom auto-configuration through META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. When debugging a missing bean, inspect registration, conditions, property values, active profiles, and the condition evaluation report."
      ],
      bullets: [
        "Conditional bean = bean registration depends on a condition.",
        "@ConditionalOnProperty = checks configuration values.",
        "@ConditionalOnMissingBean = backs off when a matching bean exists.",
        "@ConditionalOnBean = requires a matching bean.",
        "@ConditionalOnClass = checks classpath availability.",
        "@Profile = selects configuration based on active profiles.",
        "@AutoConfiguration = identifies Boot auto-configuration.",
        "AutoConfiguration.imports = Spring Boot 3 registration metadata.",
        "ApplicationContextRunner = tests conditional configuration.",
        "Condition evaluation report = helps explain matching and failed conditions."
      ]
    }
  ]
};