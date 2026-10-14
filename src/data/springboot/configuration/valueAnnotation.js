
export const valueAnnotation = {
  id: "value-annotation",
  title: "@Value",
  slug: "value-annotation",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "35 min",

  description:
    "Learn how Spring's @Value annotation injects configuration properties, environment variables, default values, and expressions into Spring-managed components, including its limitations and comparison with @ConfigurationProperties.",

  sections: [
    {
      id: "what-is-value",
      title: "What is @Value?",

      paragraphs: [
        "@Value is an annotation provided by Spring Framework that injects a value into a field, constructor parameter, or method parameter of a Spring-managed object.",
        "Configuration values commonly come from application.properties, application.yml, environment variables, system properties, or other property sources available through Spring's Environment.",
        "Instead of hardcoding values directly into Java code, you can keep them in configuration and inject them where they are needed. This makes applications easier to configure for development, testing, and production.",
        "The annotation belongs to the org.springframework.beans.factory.annotation package. It is processed by Spring during bean creation, so it should normally be used in a class managed by the Spring container."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppInfo {

    @Value("\${app.name}")
    private String appName;

    public String getAppName() {
        return appName;
    }
}`
      },

      bullets: [
        "@Value is useful for injecting individual configuration values.",
        "It supports property placeholders, default values, and SpEL expressions.",
        "It can inject values into fields, constructors, and methods.",
        "The target object must be created and processed by Spring for annotation-based injection to work."
      ]
    },

    {
      id: "property-example",
      title: "Define a Configuration Property",

      paragraphs: [
        "In Spring Boot, application.properties is a common place to define application configuration.",
        "Each property uses a key=value format. The key identifies the setting, and the value is the configuration value that Spring resolves.",
        "The following example defines an application name. The key app.name is not a built-in Spring property; it is a custom property chosen by the application developer.",
        "By default, Spring Boot loads application.properties from supported configuration locations, including the classpath root. Additional locations and property sources can also be configured."
      ],

      code: {
        language: "properties",
        code: `app.name=CodeForge
app.version=1.0
app.environment=development`
      },

      bullets: [
        "Use meaningful property names such as app.name or payment.timeout.",
        "Keep environment-specific settings outside hardcoded Java logic.",
        "A custom property must be available through Spring's property sources when it is required.",
        "Do not store passwords, API keys, or other secrets in source-controlled configuration files."
      ]
    },

    {
      id: "basic-value",
      title: "Using @Value",

      paragraphs: [
        "A property placeholder uses the syntax \${property.name}. Spring resolves the placeholder and injects the resulting value into the target field.",
        "In the example, Spring resolves app.name to CodeForge and assigns that string to appName.",
        "Field injection is concise, but it hides the dependency in the class body and makes direct unit testing less convenient. Constructor injection is often preferable when the value is an essential dependency of the class.",
        "The following example demonstrates field injection to explain the basic annotation syntax."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    @Value("\${app.name}")
    private String appName;

    public String getAppName() {
        return appName;
    }
}`
      },

      bullets: [
        "@Value uses Spring's property-placeholder resolution.",
        "The property key must resolve to a value unless a default or another resolution mechanism is provided.",
        "A missing required placeholder can cause application startup to fail.",
        "Use constructor injection when you want configuration dependencies to be explicit and easier to test."
      ]
    },

    {
      id: "using-service",
      title: "Using the Injected Value",

      paragraphs: [
        "After Spring creates the service and processes its injection annotations, the service can use the injected value in its methods.",
        "For this example, app.name=CodeForge must be available in the application's configuration.",
        "This is an illustrative service method. To expose the result through HTTP, you would normally call the service from a controller or another application component.",
        "Do not manually instantiate this service with new AppInfoService() and expect Spring to inject its fields. Objects created outside Spring are not automatically processed by the container."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    @Value("\${app.name}")
    private String appName;

    public void printAppName() {
        System.out.println(appName);
    }
}`
      },

      bullets: [
        "Expected output when app.name=CodeForge: CodeForge.",
        "The method can use appName after Spring has completed bean initialization.",
        "Use logging instead of System.out.println for application diagnostics in production.",
        "A standalone main method that creates the service manually will not receive automatic field injection."
      ]
    },

    {
      id: "default-value",
      title: "Providing a Default Value",

      paragraphs: [
        "You can specify a default value in a property placeholder by placing a colon after the property name.",
        "For example, \${app.name:CodeForge} tells Spring to use the configured app.name value when one is available, or CodeForge when the property is unresolved.",
        "A default is useful for optional settings that have a safe and sensible fallback. It should not be used to silently hide a missing mandatory configuration value.",
        "Default values are resolved as strings initially, then converted to the target field's type when Spring supports the required conversion."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppSettings {

    @Value("\${app.name:CodeForge}")
    private String appName;

    @Value("\${app.max-users:100}")
    private int maxUsers;

    public String getAppName() {
        return appName;
    }

    public int getMaxUsers() {
        return maxUsers;
    }
}`
      },

      bullets: [
        "If app.name is not configured, appName receives CodeForge.",
        "If app.max-users is not configured, maxUsers receives 100.",
        "The default must be compatible with the target type.",
        "A default value is not a replacement for validating critical configuration."
      ]
    },

    {
      id: "multiple-properties",
      title: "Reading Multiple Properties",

      paragraphs: [
        "A class can inject several configuration values by using multiple @Value annotations.",
        "This approach is suitable when the class needs only a few unrelated settings. Each annotation refers to one property key.",
        "When many settings belong to the same logical group, such as application metadata or payment-provider configuration, managing them individually can become repetitive. In that situation, @ConfigurationProperties is often easier to maintain."
      ],

      code: {
        language: "properties",
        code: `app.name=CodeForge
app.version=1.0
app.environment=development`
      },

      bullets: [
        "app.name represents the application name.",
        "app.version represents an application version string.",
        "app.environment is a custom property in this example, not an automatic Spring profile activation setting.",
        "Keep the keys consistent across the base configuration and environment-specific configuration files."
      ]
    },

    {
      id: "multiple-properties-java",
      title: "Injecting Multiple Properties",

      paragraphs: [
        "The following service injects three separate properties and provides a method to display them.",
        "All three keys must be resolvable through the application's configuration. If one is missing and has no default, Spring may fail while creating the bean.",
        "This example uses field injection for clarity. In production code, consider constructor injection or a dedicated @ConfigurationProperties class when configuration grows."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    @Value("\${app.name}")
    private String name;

    @Value("\${app.version}")
    private String version;

    @Value("\${app.environment}")
    private String environment;

    public void printInfo() {
        System.out.println("Name: " + name);
        System.out.println("Version: " + version);
        System.out.println("Environment: " + environment);
    }
}`
      },

      bullets: [
        "With the properties shown in the previous section, the output is Name: CodeForge, Version: 1.0, and Environment: development.",
        "Each field is resolved independently from the available property sources.",
        "The order of printed lines comes from the order of the statements in printInfo().",
        "For application logging, prefer a configured logger rather than printing directly to standard output."
      ]
    },

    {
      id: "environment-variable",
      title: "Reading an Environment Variable",

      paragraphs: [
        "Spring Boot can resolve environment variables through its property-source and relaxed-binding mechanisms. A placeholder such as \${DB_USERNAME} can be used when that name is available in the environment or another property source.",
        "For example, the application may receive DB_USERNAME from its operating environment, container configuration, or deployment platform.",
        "Environment variables are not encrypted automatically. Avoid exposing credentials in shell history, logs, container inspection output, or source control, and use an appropriate secret-management mechanism for sensitive production values.",
        "Environment variables and application properties can participate in Spring's configuration resolution. If the same setting is defined in multiple sources, the effective value depends on Spring Boot's property-source precedence."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSettings {

    @Value("\${DB_USERNAME}")
    private String username;

    public String getUsername() {
        return username;
    }
}`
      },

      bullets: [
        "Supply DB_USERNAME through a supported environment or configuration source before starting the application.",
        "A missing required placeholder can prevent the application context from starting.",
        "Use a default only if the setting is genuinely optional and the fallback is safe.",
        "Do not assume that defining a custom environment variable automatically activates a Spring profile."
      ]
    },

    {
      id: "default-environment-variable",
      title: "Environment Variable with Default Value",

      paragraphs: [
        "You can combine a placeholder with a default value to make a setting optional.",
        "For example, \${SERVER_PORT:8080} resolves to the configured SERVER_PORT value when that placeholder is supplied; otherwise, it uses 8080.",
        "The int field receives a numeric value through Spring's type conversion. If a supplied value cannot be converted to an integer, bean creation may fail.",
        "Note that server.port is Spring Boot's standard application server port property. Injecting a field named serverPort does not configure the embedded server by itself; the example only reads the resolved value. To configure the server port, set server.port=8080 or supply the corresponding supported configuration source."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ServerSettings {

    @Value("\${SERVER_PORT:8080}")
    private int serverPort;

    public int getServerPort() {
        return serverPort;
    }
}`
      },

      bullets: [
        "If the placeholder cannot be resolved, the field receives 8080.",
        "If SERVER_PORT resolves to 9090, the field receives 9090.",
        "This field does not itself change the embedded server's listening port.",
        "To configure Spring Boot's server port, use server.port in configuration or a supported external override such as SERVER_PORT."
      ]
    },

    {
      id: "value-with-configuration",
      title: "How @Value Works",

      paragraphs: [
        "Spring Boot loads its configuration sources and exposes their values through Spring's Environment and related property-resolution infrastructure.",
        "When Spring creates a bean, its bean factory processes injection annotations and resolves the @Value placeholder. The resolved value is then converted to the required target type when necessary and injected into the bean.",
        "For a field annotated with @Value, the application should rely on Spring to create and initialize the object. Manually created objects do not automatically receive the same injection processing.",
        "This flow describes the basic property-placeholder case. SpEL expressions use a related expression-resolution mechanism and can evaluate expressions rather than simply looking up a property."
      ],

      code: {
        language: "text",
        code: `application.properties
        |
        | app.name=CodeForge
        v
Spring Boot property sources
        |
        v
Spring Environment and placeholder resolution
        |
        v
@Value("\${app.name}")
        |
        v
Spring bean field
        |
        v
appName = "CodeForge"`
      },

      bullets: [
        "Configuration source: where the value is defined.",
        "Property resolution: how Spring finds the effective value.",
        "Type conversion: how a string-like value becomes an int, boolean, or another supported type.",
        "Injection: how Spring supplies the resolved value to the managed object."
      ]
    },

    {
      id: "limitations",
      title: "Limitations of @Value",

      paragraphs: [
        "@Value is concise for individual settings, but a class containing dozens of configuration fields can become difficult to read, validate, and maintain.",
        "The annotation does not by itself provide the same structured configuration model that @ConfigurationProperties provides. With @ConfigurationProperties, related values can be grouped into a dedicated class and validated together.",
        "Field injection also makes dependencies less visible in the constructor and complicates ordinary unit tests that instantiate the class directly.",
        "SpEL support is powerful, but complex expressions inside annotations can make configuration logic difficult to understand. Keep expressions simple and move substantial logic into ordinary Java code."
      ],

      bullets: [
        "@Value is useful for a small number of individual values.",
        "A required unresolved placeholder can cause startup failure.",
        "Invalid values may cause type-conversion errors.",
        "Field injection makes isolated unit testing less straightforward.",
        "@ConfigurationProperties is generally better for related groups of settings.",
        "Neither annotation automatically makes sensitive values secure."
      ]
    },

    {
      id: "value-vs-configuration-properties",
      title: "@Value vs @ConfigurationProperties",

      paragraphs: [
        "Both mechanisms can supply configuration values to Spring-managed code, but they suit different needs.",
        "@Value is a good choice for a small number of individual values or when a simple SpEL expression is required. @ConfigurationProperties binds a group of related settings to a dedicated configuration object and supports structured binding and validation.",
        "For larger configuration groups, @ConfigurationProperties usually makes the application's configuration contract clearer and easier to test.",
        "The following examples are alternatives. The first uses @Value; the second uses a separate configuration-properties class."
      ],

      code: {
        language: "java",
        code: `// Option 1: individual property with @Value

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppNameProvider {

    private final String appName;

    public AppNameProvider(
            @Value("\${app.name:CodeForge}") String appName) {
        this.appName = appName;
    }

    public String getAppName() {
        return appName;
    }
}

// Option 2: grouped properties with @ConfigurationProperties
// Place this class in its own AppProperties.java file.

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name = "CodeForge";
    private String version = "1.0";
    private String environment = "development";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }
}`
      },

      bullets: [
        "The two Java classes are illustrative alternatives and should be placed in separate source files.",
        "The AppProperties class must be registered, for example with @ConfigurationPropertiesScan on an appropriate configuration class or @EnableConfigurationProperties(AppProperties.class).",
        "@ConfigurationProperties supports grouping related values under a prefix such as app.",
        "For validation, use the appropriate validation dependency, validation annotations, and configuration-properties registration.",
        "For a single property, @Value may be simpler; for many related settings, @ConfigurationProperties is often more maintainable."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      paragraphs: [
        "Remember that @Value is an injection mechanism, not a configuration file format. The property can come from several supported property sources, and Spring resolves the effective value when creating the bean.",
        "Use the colon syntax for an appropriate fallback, make required configuration explicit, and avoid putting secrets into source-controlled files.",
        "When configuration becomes larger or needs structured validation, consider a dedicated @ConfigurationProperties class."
      ],

      bullets: [
        "@Value injects resolved values into Spring-managed components.",
        "Use \${property.name} to reference a property placeholder.",
        "Use \${property.name:defaultValue} to provide a fallback.",
        "Spring can convert supported property values to target field or parameter types.",
        "Use constructor injection when you want dependencies to be explicit.",
        "A custom environment variable does not automatically activate a Spring profile.",
        "@ConfigurationProperties is often a better fit for related configuration groups.",
        "Use appropriate secret-management practices for passwords, tokens, and API keys."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",

      paragraphs: [
        "Review these questions to prepare for Spring Boot interviews. Focus on explaining what @Value does, how placeholders are resolved, how defaults work, and when to choose @ConfigurationProperties instead."
      ],

      interviewQuestions: [
        {
          question: "1. What is @Value in Spring?",
          answer:
            "@Value is an annotation from Spring Framework used to inject values into fields, constructor parameters, or method parameters of Spring-managed objects. It can resolve property placeholders and evaluate SpEL expressions."
        },
        {
          question: "2. Which package contains @Value?",
          answer:
            "It is available in org.springframework.beans.factory.annotation.Value."
        },
        {
          question: "3. How do you read a property using @Value?",
          answer:
            "Define a property such as app.name=CodeForge and use @Value(\"${app.name}\") on an injection point. Spring resolves the placeholder and injects the effective value."
        },
        {
          question: "4. Can @Value provide a default value?",
          answer:
            "Yes. Use @Value(\"${app.name:CodeForge}\"). CodeForge is used when the app.name placeholder cannot be resolved."
        },
        {
          question: "5. What happens when a required property is missing?",
          answer:
            "If a required placeholder cannot be resolved and no default or other resolution mechanism applies, bean creation can fail and prevent the application context from starting."
        },
        {
          question: "6. Can @Value inject an integer?",
          answer:
            "Yes. Spring can convert supported configuration values to target types. For example, @Value(\"${app.max-users:100}\") can inject an integer. An invalid value may cause a conversion error."
        },
        {
          question: "7. Can @Value read environment variables?",
          answer:
            "Yes. Spring can resolve environment variables through its property-source infrastructure. A placeholder such as ${DB_USERNAME} can resolve a value supplied through the environment when that name is available."
        },
        {
          question: "8. Does @Value work in a class created using new?",
          answer:
            "Not automatically. Spring processes injection annotations on Spring-managed beans. An object created directly with new is not automatically registered or processed by Spring."
        },
        {
          question: "9. Can @Value be used in a constructor?",
          answer:
            "Yes. It can annotate a constructor parameter, allowing the resolved configuration value to be assigned to a final field. Constructor injection makes the dependency explicit."
        },
        {
          question: "10. What is the difference between ${...} and #{...}?",
          answer:
            "${...} is commonly used for property placeholders, while #{...} denotes a Spring Expression Language (SpEL) expression. SpEL can evaluate expressions rather than simply resolve a property key."
        },
        {
          question: "11. What is SpEL?",
          answer:
            "SpEL stands for Spring Expression Language. It supports evaluating expressions, accessing properties and calling supported operations within Spring's expression infrastructure."
        },
        {
          question: "12. Can @Value be used on a static field?",
          answer:
            "Direct static-field injection is not supported as a normal @Value injection pattern. Prefer injecting the value into an instance field or constructor and designing the application so configuration is supplied through Spring-managed objects."
        },
        {
          question: "13. What are the limitations of field injection with @Value?",
          answer:
            "Field injection hides the dependency, makes direct unit testing more difficult, and can make configuration-heavy classes harder to maintain. Constructor injection or @ConfigurationProperties can improve clarity."
        },
        {
          question: "14. What is the difference between @Value and @ConfigurationProperties?",
          answer:
            "@Value is convenient for individual values and SpEL expressions. @ConfigurationProperties binds related properties into a structured object and is usually preferable for larger configuration groups."
        },
        {
          question: "15. Does @Value automatically validate business configuration?",
          answer:
            "No. Type conversion and placeholder resolution occur, but business constraints such as a timeout being positive or a URL being required need explicit validation or application-level checks."
        },
        {
          question: "16. Does an environment variable always override application.properties?",
          answer:
            "Spring Boot defines property-source precedence, and environment variables commonly have higher precedence than values from application.properties. The effective value depends on the sources involved and the specific configuration setup."
        },
        {
          question: "17. Does defining APP_ENV=production activate the production profile?",
          answer:
            "No. APP_ENV is a custom variable unless the application explicitly uses it. Spring Boot's standard profile activation setting is spring.profiles.active, which can also be supplied through SPRING_PROFILES_ACTIVE or a command-line argument."
        },
        {
          question: "18. Should passwords be injected using @Value?",
          answer:
            "Technically, a password can be injected from a supported property source, but the important concern is where the secret is stored and how it is delivered. Prefer a suitable secret manager or deployment secret mechanism and avoid committing credentials to source control."
        },
        {
          question: "19. When would you use @ConfigurationProperties instead of @Value?",
          answer:
            "Use @ConfigurationProperties when a class needs many related settings, hierarchical configuration, structured binding, or validation. It makes configuration easier to organize and test."
        },
        {
          question: "20. What is a common reason @Value injection fails?",
          answer:
            "Common causes include a missing property, an incorrect property key, a malformed placeholder, a value that cannot be converted to the target type, or a class that was not created and managed by Spring."
        }
      ]
    }
  ]
};
