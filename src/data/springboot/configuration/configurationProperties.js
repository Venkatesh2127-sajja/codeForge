
export const configurationProperties = {
  id: "configuration-properties",
  title: "@ConfigurationProperties",
  slug: "configuration-properties",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "50 min",

  description:
    "Learn how Spring Boot @ConfigurationProperties binds external configuration to structured Java objects, including nested properties, registration, type conversion, validation, immutable configuration, best practices, and interview questions.",

  sections: [
    {
      id: "what-is-configuration-properties",
      title: "1. What is @ConfigurationProperties?",

      paragraphs: [
        "@ConfigurationProperties is a Spring Boot annotation that binds related external configuration properties to a structured Java object.",
        "Applications often have multiple settings related to a single feature. For example, CodeForge may have an application name, version, user limits, project limits, and security settings. Instead of injecting every value separately, these settings can be grouped into a configuration class.",
        "Configuration values can come from application.yml, application.properties, environment variables, command-line arguments, and other supported Spring property sources.",
        "This approach separates configuration from business logic and makes related settings easier to organize, validate, test, and maintain.",
        "@ConfigurationProperties does not automatically register every class that uses it. The configuration class must be registered with Spring using configuration-properties scanning or explicit registration."
      ],

      bullets: [
        "Used for structured external configuration.",
        "Binds properties that share a common prefix.",
        "Supports nested configuration objects.",
        "Supports conversion to suitable Java types.",
        "Can be combined with validation.",
        "Useful when an application has multiple related configuration values."
      ]
    },

    {
      id: "configuration-properties",
      title: "2. Defining Configuration Properties",

      paragraphs: [
        "Suppose CodeForge needs an application name, version, and maximum user limit. These values can be placed under a common app prefix in application.yml.",
        "The app prefix groups custom CodeForge settings. These are application-specific properties rather than built-in Spring Boot settings.",
        "The version is quoted to make its intended string representation explicit. The max-users value is numeric, so it can be bound to a Java int."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge
  version: "1.0"
  max-users: 1000`
      },

      bullets: [
        "app.name represents the application name.",
        "app.version represents the configured version.",
        "app.max-users represents the maximum user limit.",
        "Keep related settings under the same prefix.",
        "Use property names that describe their purpose."
      ]
    },

    {
      id: "configuration-class",
      title: "3. Creating the Configuration Properties Class",

      paragraphs: [
        "The Java class represents the structure of the configuration. The annotation @ConfigurationProperties(prefix = \"app\") tells Spring Boot to bind properties under the app prefix to this class.",
        "Spring Boot's relaxed binding maps the YAML property max-users to the Java property maxUsers. This allows conventional kebab-case configuration names to bind to camelCase Java fields.",
        "The following example uses JavaBean-style getters and setters. Spring Boot can use these accessors to bind values to the class when it is registered correctly."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private int maxUsers;

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

    public int getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(int maxUsers) {
        this.maxUsers = maxUsers;
    }
}`
      },

      bullets: [
        "@ConfigurationProperties identifies the class as a configuration binding target.",
        "The prefix app groups the properties being bound.",
        "Getters allow application code to read the values.",
        "Setters support JavaBean-style binding.",
        "The class must be registered with Spring before it can be injected."
      ]
    },

    {
      id: "understanding-prefix",
      title: "4. Understanding the Prefix",

      paragraphs: [
        "The prefix determines which configuration group is mapped to the Java object. With prefix app, Spring Boot binds app.name, app.version, and app.max-users to the corresponding fields.",
        "The prefix does not mean that every property beginning with app is automatically meaningful to the application. The Java class must define the properties it intends to bind.",
        "Choosing a specific prefix helps avoid mixing unrelated configuration settings in a single class."
      ],

      code: {
        language: "text",
        code: `application.yml
      |
      +-- app
           |
           +-- name
           |
           +-- version
           |
           +-- max-users
                    |
                    v
       AppProperties(prefix = "app")
                    |
                    +-- name
                    +-- version
                    +-- maxUsers`
      },

      bullets: [
        "Use a clear prefix for each configuration group.",
        "Avoid placing unrelated application features under one oversized configuration class.",
        "Use the same prefix in YAML and the Java annotation.",
        "Remember that the prefix describes the binding path, not a Java package name."
      ]
    },

    {
      id: "register-properties",
      title: "5. Registering Configuration Properties",

      paragraphs: [
        "Spring must know that AppProperties is a configuration-properties bean before another component can inject it.",
        "One option is @EnableConfigurationProperties(AppProperties.class) on a configuration class or the Spring Boot application class.",
        "Another option is @ConfigurationPropertiesScan, which discovers configuration-properties classes under the configured scanning packages. Use one clear registration approach for the class.",
        "The following example uses explicit registration. It assumes AppProperties is imported from com.codeforge.config."
      ],

      code: {
        language: "java",
        code: `package com.codeforge;

import com.codeforge.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class CodeForgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            CodeForgeApplication.class,
            args
        );
    }
}`
      },

      bullets: [
        "Use @EnableConfigurationProperties to register specified classes.",
        "Use @ConfigurationPropertiesScan to discover configuration-properties classes.",
        "Do not assume that @ConfigurationProperties alone always registers the class.",
        "Keep configuration classes in a clearly organized package.",
        "Avoid registering the same class through unnecessary overlapping mechanisms."
      ]
    },

    {
      id: "using-properties",
      title: "6. Injecting and Using the Configuration Object",

      paragraphs: [
        "After registration, AppProperties can be injected into a Spring-managed service through constructor injection.",
        "The service reads the configured values through getters. It does not need to know whether those values came from YAML, a properties file, or an environment variable.",
        "This keeps configuration loading separate from business logic and makes the service easier to test."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.service;

import com.codeforge.config.AppProperties;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    private final AppProperties properties;

    public AppInfoService(AppProperties properties) {
        this.properties = properties;
    }

    public String getName() {
        return properties.getName();
    }

    public String getVersion() {
        return properties.getVersion();
    }

    public int getMaxUsers() {
        return properties.getMaxUsers();
    }
}`
      },

      bullets: [
        "Use constructor injection for required configuration dependencies.",
        "Read settings through the configuration object's accessors.",
        "Avoid repeating property names throughout business logic.",
        "Use the same configuration object wherever the same settings are needed.",
        "Ensure that AppProperties is registered and its prefix matches the YAML."
      ]
    },

    {
      id: "binding-process",
      title: "7. How Property Binding Works",

      paragraphs: [
        "During application startup, Spring Boot loads configuration property sources and prepares the application context.",
        "When the registered configuration-properties bean is created, Spring Boot binds matching properties to its fields or constructor parameters, depending on the binding style.",
        "The resulting object can then be injected into services and other Spring-managed components.",
        "If a property is absent, its resulting value depends on the Java type, the binding approach, defaults, and whether validation or required-value checks are configured. For example, an uninitialized primitive int defaults to zero, which may not be appropriate for a required positive limit."
      ],

      code: {
        language: "text",
        code: `application.yml
      |
      v
Spring Boot property sources
      |
      v
@ConfigurationProperties(prefix = "app")
      |
      v
AppProperties
      |
      +-- name = "CodeForge"
      +-- version = "1.0"
      +-- maxUsers = 1000
      |
      v
Injected into AppInfoService`
      }
    },

    {
      id: "nested-properties",
      title: "8. Nested Configuration Properties",

      paragraphs: [
        "Configuration often contains groups of related settings. For example, CodeForge can have an app.limits group containing maximum users and maximum projects.",
        "Nested YAML structure can be represented using nested Java objects. This keeps the configuration model aligned with the hierarchy in the YAML file.",
        "Nested configuration is especially useful when an application has several settings for a single feature, such as security, rate limits, email, storage, or external API clients."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge
  version: "1.0"

  limits:
    max-users: 1000
    max-projects: 100`
      },

      bullets: [
        "app.name maps to the name property.",
        "app.version maps to the version property.",
        "app.limits.max-users maps to limits.maxUsers.",
        "app.limits.max-projects maps to limits.maxProjects.",
        "Nested configuration reduces the need for long, unrelated flat property lists."
      ]
    },

    {
      id: "nested-java",
      title: "9. Implementing Nested Configuration Classes",

      paragraphs: [
        "The AppProperties class can contain a nested Limits class to represent the limits section.",
        "In this JavaBean-style example, initialize the nested object so that it is available for binding. Getters and setters expose the nested object and its properties.",
        "The complete class below includes the top-level properties as well as the nested limits object. It can replace the simpler AppProperties class from the earlier section rather than being declared alongside another class with the same fully qualified name."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private Limits limits = new Limits();

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

    public Limits getLimits() {
        return limits;
    }

    public void setLimits(Limits limits) {
        this.limits = limits;
    }

    public static class Limits {

        private int maxUsers;
        private int maxProjects;

        public int getMaxUsers() {
            return maxUsers;
        }

        public void setMaxUsers(int maxUsers) {
            this.maxUsers = maxUsers;
        }

        public int getMaxProjects() {
            return maxProjects;
        }

        public void setMaxProjects(int maxProjects) {
            this.maxProjects = maxProjects;
        }
    }
}`
      },

      bullets: [
        "Use nested Java objects to represent nested YAML groups.",
        "Initialize nested objects when using mutable JavaBean binding.",
        "Use getters and setters for the properties in this example.",
        "For stricter configuration requirements, validate nested objects as well.",
        "Keep only one AppProperties class with a given package and class name."
      ]
    },

    {
      id: "type-conversion",
      title: "10. Type Conversion and Relaxed Binding",

      paragraphs: [
        "Spring Boot configuration binding supports conversion from textual configuration values to suitable Java types.",
        "A YAML number such as max-users: 1000 can be bound to an int, while a Boolean such as enabled: true can be bound to a boolean field.",
        "Relaxed binding allows conventional configuration names such as max-users to map to Java properties such as maxUsers. This makes YAML readable while preserving Java naming conventions.",
        "Use suitable types for your configuration. For example, represent a timeout using Duration when appropriate, a collection using List, and a URL using a suitable URL or URI type when the application's design requires it."
      ],

      code: {
        language: "yaml",
        code: `app:
  enabled: true
  max-users: 1000
  timeout: 5s
  supported-languages:
    - Java
    - SQL`
      },

      bullets: [
        "Boolean values can bind to boolean or Boolean.",
        "Numeric values can bind to int, long, or other compatible numeric types.",
        "Lists can bind to collection types such as List<String>.",
        "Spring Boot supports conversion for common types, including Duration.",
        "Invalid values may cause a binding error during startup."
      ]
    },

    {
      id: "value-vs-configuration-properties",
      title: "11. @Value vs @ConfigurationProperties",

      paragraphs: [
        "@Value is convenient when a class needs one or two individual configuration values.",
        "@ConfigurationProperties is usually more suitable when multiple related properties form a configuration group.",
        "@ConfigurationProperties supports structured binding, nested objects, type conversion, and integration with configuration validation. It can also reduce the number of individual property injections in application classes.",
        "Both approaches have valid uses. Choose based on the number of settings, their relationships, and the need for validation rather than assuming one annotation should replace the other everywhere."
      ],

      code: {
        language: "text",
        code: `Using @Value:

@Value("\${app.name}")
private String appName;


Using @ConfigurationProperties:

app.name
app.version
app.limits.max-users

        |
        v
One structured Java configuration object`
      },

      bullets: [
        "@Value: suitable for a small number of individual values.",
        "@ConfigurationProperties: suitable for related configuration groups.",
        "@ConfigurationProperties: supports nested object binding.",
        "Both require the relevant property values to be resolvable.",
        "Choose the simplest approach that remains easy to maintain."
      ]
    },

    {
      id: "advantages",
      title: "12. Advantages of @ConfigurationProperties",

      paragraphs: [
        "@ConfigurationProperties provides a structured way to represent external configuration. It can make larger applications easier to maintain because related settings are grouped into explicit Java types.",
        "It also creates a useful boundary between configuration and business logic. Services can depend on a configuration object without reading YAML files directly."
      ],

      bullets: [
        "Groups related configuration together.",
        "Provides a structured configuration object.",
        "Reduces the need for numerous individual @Value injections.",
        "Supports nested configuration.",
        "Supports type conversion and relaxed binding.",
        "Can integrate with validation.",
        "Makes configuration easier to test.",
        "Improves maintainability as application settings grow."
      ]
    },

    {
      id: "validation",
      title: "13. Validating Configuration Properties",

      paragraphs: [
        "A configuration value can be present but still be invalid. For example, a maximum user limit of zero or a blank application name may not be acceptable.",
        "Spring Boot supports Jakarta Bean Validation for configuration-properties classes. Use @Validated and appropriate constraints to detect invalid values during startup.",
        "The class must be registered correctly, and the project must include the required validation implementation, commonly through the Spring Boot validation starter. Nested objects require appropriate cascading validation when their fields also need to be checked."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    @NotBlank
    private String name;

    @Min(1)
    @Max(100000)
    private int maxUsers;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(int maxUsers) {
        this.maxUsers = maxUsers;
    }
}`
      },

      bullets: [
        "@NotBlank rejects null, empty, or whitespace-only strings.",
        "@Min and @Max constrain numeric values.",
        "@Validated enables validation for the configuration-properties class.",
        "Use constraints that match actual business requirements.",
        "Ensure the validation dependency and class registration are configured.",
        "Validate nested configuration where required."
      ]
    },

    {
      id: "immutable-properties",
      title: "14. Immutable Configuration Properties",

      paragraphs: [
        "For applications that prefer immutable configuration objects, constructor binding can be used with supported Spring Boot versions.",
        "In Spring Boot 3, a configuration-properties class can use a Java record to represent immutable values. Records provide constructor-based data representation and accessor methods.",
        "A record can be useful for small configuration groups because its components are final and the object cannot be modified through setters. Ensure that the record is registered through configuration-properties scanning or explicit registration.",
        "Use either the mutable JavaBean-style example or the record-based example as the implementation of a particular configuration class, not both under the same fully qualified class name."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
    String name,
    String version,
    int maxUsers
) {
}`
      },

      bullets: [
        "Records provide concise immutable data structures.",
        "Record components are accessed using methods such as name() and maxUsers().",
        "Use constructor-based binding for immutable configuration.",
        "For nested immutable configuration, define suitable nested record types.",
        "Use a style supported by your project's Spring Boot and Java versions."
      ]
    },

    {
      id: "common-mistakes",
      title: "15. Common Mistakes and Troubleshooting",

      paragraphs: [
        "A common mistake is adding @ConfigurationProperties without registering the class. The class then may not be available for injection.",
        "Another common problem is using the wrong prefix. If the YAML contains app.name but the class uses prefix codeforge, the property does not belong to that configuration group.",
        "Incorrect property names, incompatible types, missing environment variables, and invalid nested configuration can also cause binding problems.",
        "If a property has an unexpected value, inspect the active profiles and other property sources. A correct YAML value can be overridden by external configuration."
      ],

      bullets: [
        "Check that the configuration class is registered.",
        "Check the prefix and property names.",
        "Confirm that the YAML structure matches the Java object.",
        "Check for conversion and binding exceptions in startup logs.",
        "Verify environment variables and placeholder defaults.",
        "Check whether another configuration source overrides the expected value.",
        "Avoid declaring duplicate classes with the same package and name.",
        "Ensure the Java accessors or constructor match the selected binding style."
      ]
    },

    {
      id: "testing-configuration",
      title: "16. Testing Configuration Properties",

      paragraphs: [
        "Configuration binding should be tested when incorrect values could cause application failures or violate important limits.",
        "A Spring Boot integration test can load the application context with test-specific properties and verify that the configuration object receives the expected values.",
        "The following example uses @SpringBootTest and test property overrides. It assumes the application's AppProperties class is registered and that the test class is in a package where Spring Boot can locate the application configuration."
      ],

      code: {
        language: "java",
        code: `import com.codeforge.config.AppProperties;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(properties = {
    "app.name=CodeForgeTest",
    "app.version=2.0",
    "app.max-users=250"
})
class AppPropertiesTest {

    @Autowired
    private AppProperties properties;

    @Test
    void bindsConfigurationProperties() {
        assertEquals("CodeForgeTest", properties.getName());
        assertEquals("2.0", properties.getVersion());
        assertEquals(250, properties.getMaxUsers());
    }
}`
      },

      bullets: [
        "Test that the expected properties are bound.",
        "Test validation for invalid values where applicable.",
        "Use test-specific values rather than production credentials.",
        "Keep the test aligned with the actual AppProperties implementation.",
        "For record-based configuration, use record accessors instead of JavaBean getters."
      ]
    },

    {
      id: "when-to-use",
      title: "17. When Should You Use @ConfigurationProperties?",

      paragraphs: [
        "Use @ConfigurationProperties when a feature or module has multiple related configuration values, especially when those values are hierarchical or need validation.",
        "Examples include database client options, file-storage settings, email configuration, application limits, external API clients, and feature-specific settings.",
        "For one or two independent values, @Value may be sufficient. The goal is to keep configuration clear and maintainable without introducing unnecessary abstractions."
      ],

      code: {
        language: "text",
        code: `One or two individual settings
             |
             v
           @Value

Related settings with a shared prefix
             |
             v
    @ConfigurationProperties

Required values with constraints
             |
             v
@ConfigurationProperties + validation`
      }
    },

    {
      id: "important-points",
      title: "18. Important Points",

      bullets: [
        "@ConfigurationProperties binds external configuration to a Java object.",
        "The prefix identifies the configuration group.",
        "The configuration class must be registered with Spring.",
        "Nested configuration can be represented using nested Java objects.",
        "Relaxed binding maps names such as max-users to maxUsers.",
        "Suitable Java types improve configuration clarity.",
        "@Value is useful for individual values.",
        "@ConfigurationProperties is useful for structured configuration.",
        "Validation can reject invalid configuration during startup.",
        "Immutable configuration can use constructor binding or records.",
        "Configuration can come from multiple supported property sources.",
        "Tests can verify that configuration binds as expected."
      ]
    },

    {
      id: "interview",
      title: "19. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is @ConfigurationProperties?",
          answer: "@ConfigurationProperties is a Spring Boot annotation that binds external configuration properties sharing a common prefix to a structured Java object."
        },
        {
          question: "What does the prefix attribute do?",
          answer: "The prefix identifies the group of properties to bind. For example, prefix app maps properties such as app.name and app.max-users."
        },
        {
          question: "Why use @ConfigurationProperties instead of multiple @Value annotations?",
          answer: "It groups related settings into one structured object and supports nested binding, type conversion, and configuration validation. This can improve maintainability as the configuration grows."
        },
        {
          question: "Does @ConfigurationProperties automatically register a bean?",
          answer: "The annotation describes the binding target, but the class must also be registered, for example through @ConfigurationPropertiesScan or @EnableConfigurationProperties."
        },
        {
          question: "What is relaxed binding?",
          answer: "Relaxed binding allows common naming variations to map to Java properties. For example, the YAML property max-users can bind to a Java property named maxUsers."
        },
        {
          question: "Can @ConfigurationProperties handle nested properties?",
          answer: "Yes. Nested YAML structures can be represented using nested Java objects or records."
        },
        {
          question: "When is @Value preferable?",
          answer: "@Value is convenient when a class needs a small number of individual configuration values rather than a larger structured group."
        },
        {
          question: "Can @ConfigurationProperties bind numeric and Boolean values?",
          answer: "Yes. Spring Boot supports conversion to suitable types, including numeric and Boolean fields, when the configuration value is compatible."
        },
        {
          question: "How do you validate configuration properties?",
          answer: "Use @Validated with Jakarta Bean Validation constraints such as @NotBlank, @Min, and @Max, and ensure the validation implementation and configuration-properties registration are in place."
        },
        {
          question: "What is the purpose of @EnableConfigurationProperties?",
          answer: "It explicitly registers one or more configuration-properties classes so Spring Boot can create and bind their configuration objects."
        },
        {
          question: "What is the purpose of @ConfigurationPropertiesScan?",
          answer: "It discovers configuration-properties classes under the configured scanning packages and registers them for binding."
        },
        {
          question: "Can environment variables supply @ConfigurationProperties values?",
          answer: "Yes. Spring Boot resolves supported configuration property sources, including environment variables, and binds the effective values to the configuration object."
        },
        {
          question: "What happens when a property is missing?",
          answer: "The outcome depends on the Java type, binding style, defaults, and validation rules. Primitive fields may have default values such as zero, so required values should be validated when necessary."
        },
        {
          question: "Can @ConfigurationProperties be immutable?",
          answer: "Yes. Constructor-based binding supports immutable configuration. In Spring Boot 3, Java records are one concise option for representing configuration values."
        },
        {
          question: "How do you test a configuration-properties class?",
          answer: "Use a Spring Boot test with test-specific properties, inject the registered configuration object, and assert that the expected values were bound."
        },
        {
          question: "Why should configuration properties be grouped by feature?",
          answer: "Grouping by feature makes ownership clear, reduces unrelated dependencies, and makes the configuration easier to understand and validate."
        },
        {
          question: "What can cause a configuration binding error?",
          answer: "Possible causes include incorrect property names, an incorrect prefix, invalid value types, missing required values, malformed YAML, or incompatible constructor and property definitions."
        },
        {
          question: "Does @ConfigurationProperties read application.yml directly from a Java class?",
          answer: "No. Spring Boot loads configuration property sources and binds their effective values to the registered configuration-properties class."
        },
        {
          question: "Can configuration properties contain lists?",
          answer: "Yes. YAML lists can bind to suitable Java collection types such as List<String>, provided the property structure and target type are compatible."
        },
        {
          question: "What is the difference between mutable and immutable configuration properties?",
          answer: "Mutable JavaBean-style configuration commonly uses setters, while immutable configuration uses constructor-based binding or records. Immutable objects prevent their fields from being changed through setters after construction."
        }
      ]
    }
  ]
};
