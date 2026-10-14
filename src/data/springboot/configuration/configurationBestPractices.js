
export const configurationBestPractices = {
  id: "configuration-best-practices",
  title: "Configuration Best Practices",
  slug: "configuration-best-practices",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "45 min",

  description:
    "Learn industry-oriented Spring Boot configuration practices for building clean, maintainable, secure, testable, and environment-friendly applications using YAML, properties files, environment variables, profiles, and type-safe configuration.",

  sections: [
    {
      id: "keep-configuration-organized",
      title: "1. Keep Configuration Organized",

      paragraphs: [
        "Configuration should be organized so developers can quickly understand application settings, database connections, server settings, logging, and external service configuration.",
        "Keep environment-specific values outside business logic. A service should receive the configuration it needs rather than hardcoding database URLs, ports, service endpoints, or feature limits inside its methods.",
        "Use standard Spring Boot property prefixes for framework settings and a meaningful custom prefix for application-specific settings. For example, use spring.datasource for datasource settings and app for CodeForge-specific settings.",
        "Organized configuration becomes especially important when an application grows from a single Spring Boot service into several modules or independently deployed services."
      ],

      code: {
        language: "yaml",
        code: `spring:
  application:
    name: codeforge-api

  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

server:
  port: \${SERVER_PORT:8080}

app:
  version: "1.0"`
      },

      bullets: [
        "Keep related properties under meaningful parent keys.",
        "Use Spring Boot's standard property names where applicable.",
        "Use a custom prefix such as app for application-specific settings.",
        "Keep configuration separate from business logic.",
        "Use consistent naming and indentation.",
        "Document required and optional settings."
      ]
    },

    {
      id: "avoid-hardcoded-secrets",
      title: "2. Avoid Hardcoding Secrets",

      paragraphs: [
        "Secrets include database passwords, API keys, access tokens, private keys, and credentials used to access external services.",
        "Hardcoding secrets in Java source code or committed configuration files can expose them to anyone with repository access. Deleting a secret from the latest commit does not necessarily remove it from Git history.",
        "Use environment variables, a deployment platform's secret facility, or a dedicated secret manager to supply sensitive values. Access to those secrets should be limited to the applications and people that require them.",
        "If a real secret is accidentally committed or exposed, revoke or rotate it. Removing the visible value alone is not enough to make the old credential safe again."
      ],

      code: {
        language: "properties",
        code: `# Avoid committing a real production password
spring.datasource.password=myProductionPassword

# Prefer an externally supplied value
spring.datasource.password=\${DB_PASSWORD}`
      },

      bullets: [
        "Never commit production passwords or API keys.",
        "Restrict access to secret stores and deployment variables.",
        "Rotate credentials that may have been exposed.",
        "Do not print secrets in application logs or error messages.",
        "Avoid using real production credentials in local development.",
        "Remember that environment variables still require appropriate access controls."
      ]
    },

    {
      id: "use-environment-variables",
      title: "3. Use Environment Variables",

      paragraphs: [
        "Environment variables allow the same application artifact to run in different environments without rebuilding it for every configuration change.",
        "Spring Boot can map environment variable names such as SERVER_PORT to properties such as server.port. Custom placeholders can also reference variables such as DB_URL and DB_PASSWORD.",
        "The syntax ${SERVER_PORT:8080} means to resolve SERVER_PORT and use 8080 as a fallback if no value is supplied by another applicable property source.",
        "The syntax ${DB_PASSWORD} has no fallback. If the required property cannot be resolved, application startup may fail. This is useful when silently using an empty or incorrect secret would be unsafe.",
        "Environment variables are not the only external configuration option. Spring Boot also supports command-line arguments, system properties, configuration files, and other property sources."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: \${SERVER_PORT:8080}

spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}`
      },

      bullets: [
        "Use SERVER_PORT for the server port in this example.",
        "Use DB_URL, DB_USERNAME, and DB_PASSWORD for custom datasource placeholders.",
        "Provide required values in your local environment and deployment platform.",
        "Use defaults only when they are appropriate and safe.",
        "Do not assume that a value in application.yml always wins over external configuration."
      ]
    },

    {
      id: "use-profiles",
      title: "4. Use Spring Profiles",

      paragraphs: [
        "Spring Profiles help separate environment-specific configuration and bean definitions. Common environments include development, testing, staging, and production.",
        "A shared application.yml can contain common settings. Files such as application-dev.yml and application-prod.yml can override settings for the corresponding environment.",
        "When the dev profile is active, Spring Boot loads the common configuration and applies relevant development-specific configuration. Profile-specific values can override matching values from the base configuration.",
        "Profiles are useful for more than database URLs. They can control logging levels, integration endpoints, and which environment-specific beans are registered.",
        "A profile is not a security boundary. Production credentials must still be protected, and production-only behavior should not rely solely on developers remembering to select the correct profile."
      ],

      code: {
        language: "text",
        code: `src/main/resources/
├── application.yml
├── application-dev.yml
├── application-test.yml
└── application-prod.yml`
      },

      bullets: [
        "Keep shared settings in application.yml.",
        "Keep development overrides in application-dev.yml.",
        "Keep test overrides in application-test.yml.",
        "Keep production overrides in application-prod.yml.",
        "Activate a profile through an appropriate configuration source.",
        "Do not commit real production secrets into profile-specific files.",
        "Test important behavior under the profiles used for deployment."
      ]
    },

    {
      id: "configuration-properties",
      title: "5. Use @ConfigurationProperties for Related Settings",

      paragraphs: [
        "When multiple configuration values belong to the same feature, @ConfigurationProperties binds them to a structured Java object.",
        "This approach provides a clear boundary between configuration and business logic. Instead of scattering many individual property injections throughout the application, a class can represent the complete settings for a feature.",
        "Spring Boot supports binding nested objects, lists, numeric values, Booleans, and other supported types. It also supports relaxed binding, allowing YAML names such as max-users to bind to a Java property named maxUsers.",
        "The configuration-properties class must be registered through @ConfigurationPropertiesScan or @EnableConfigurationProperties. Validation can also be applied to reject invalid settings during startup."
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
        "Use a meaningful configuration prefix.",
        "Group related settings in one class.",
        "Prefer suitable Java types instead of keeping every value as a String.",
        "Use nested classes or records where appropriate.",
        "Enable configuration-properties registration.",
        "Validate required settings and important numeric limits."
      ]
    },

    {
      id: "avoid-too-many-value",
      title: "6. Avoid Excessive @Value Usage",

      paragraphs: [
        "@Value is useful when a class needs a small number of individual configuration values.",
        "However, using many separate @Value injections for a large configuration structure can spread configuration knowledge across multiple classes and make refactoring more difficult.",
        "For groups of related settings, @ConfigurationProperties is often cleaner because the configuration structure can be represented, validated, tested, and injected as one dependency.",
        "Constructor injection also makes dependencies easier to identify. The example below shows individual property injection as a pattern that may become difficult to maintain when the number of settings grows."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppSettings {

    private final String appName;
    private final String version;
    private final String environment;

    public AppSettings(
            @Value("\${app.name}") String appName,
            @Value("\${app.version}") String version,
            @Value("\${app.environment}") String environment) {
        this.appName = appName;
        this.version = version;
        this.environment = environment;
    }
}`
      },

      bullets: [
        "Use @Value for a few independent settings.",
        "Prefer @ConfigurationProperties for a large related group.",
        "Avoid scattering the same property across unrelated components.",
        "Use constructor injection for explicit dependencies.",
        "Add validation when configuration must satisfy specific requirements."
      ]
    },

    {
      id: "meaningful-property-names",
      title: "7. Use Meaningful Property Names",

      paragraphs: [
        "Configuration names should communicate what a value represents without requiring developers to inspect the implementation.",
        "Names such as app.limits.max-users and app.limits.max-projects describe the purpose of each value. Names such as app.x and app.y do not communicate their meaning.",
        "Consistent naming reduces mistakes during maintenance and makes it easier to find configuration references across Java code, YAML files, tests, and deployment manifests.",
        "For custom configuration, choose one meaningful prefix and follow a consistent naming convention. Spring Boot's relaxed binding supports common equivalent naming styles, but consistency still improves readability."
      ],

      code: {
        language: "yaml",
        code: `# Good
app:
  limits:
    max-users: 1000
    max-projects: 100

# Avoid unclear names
app:
  x: 1000
  y: 100`
      },

      bullets: [
        "Use names that explain the purpose of a setting.",
        "Group related settings under a common prefix.",
        "Use consistent naming across the application.",
        "Avoid unexplained abbreviations.",
        "Keep property names stable unless a deliberate change is required."
      ]
    },

    {
      id: "validate-configuration",
      title: "8. Validate Important Configuration",

      paragraphs: [
        "Configuration errors are easier to diagnose when the application detects them during startup rather than later during a user request.",
        "Important values may require checks for presence, valid formats, allowed ranges, or relationships with other settings. Examples include application URLs, connection limits, timeouts, and resource limits.",
        "Spring Boot supports configuration binding and can integrate with Jakarta Bean Validation for configuration-properties classes. Common constraints include @NotBlank, @Min, @Max, and @NotNull.",
        "For validation to run on a configuration-properties class, register the class appropriately, enable validation with @Validated, and include the relevant validation implementation dependency when required by the project."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.limits")
public class LimitsProperties {

    @Min(1)
    @Max(100000)
    private int maxUsers;

    @NotBlank
    private String supportEmail;

    public int getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(int maxUsers) {
        this.maxUsers = maxUsers;
    }

    public String getSupportEmail() {
        return supportEmail;
    }

    public void setSupportEmail(String supportEmail) {
        this.supportEmail = supportEmail;
    }
}`
      },

      bullets: [
        "Validate required configuration values.",
        "Check important numeric ranges.",
        "Validate URLs and email addresses when needed.",
        "Fail early when required configuration is missing or invalid.",
        "Register the configuration-properties class.",
        "Include the appropriate validation dependency and configure nested validation when required."
      ]
    },

    {
      id: "avoid-duplicate-configuration",
      title: "9. Avoid Duplicate Configuration",

      paragraphs: [
        "The same property can sometimes be defined in a base configuration file, a profile-specific file, an environment variable, a Java system property, or a command-line argument.",
        "Having multiple sources is normal when external configuration intentionally overrides defaults. The problem is uncontrolled duplication, where developers cannot easily identify the effective value or understand why it differs from the expected value.",
        "Define sensible defaults where appropriate and document which settings must be supplied externally. Use profile-specific overrides deliberately rather than copying every setting into every profile.",
        "When a property has an unexpected value, inspect the active profile, external property sources, and command-line arguments instead of assuming the YAML file is the only source."
      ],

      code: {
        language: "text",
        code: `Avoid:
- Unexplained duplicate values
- Conflicting profile settings
- Hidden deployment overrides

Prefer:
Shared defaults
        |
        v
Intentional environment-specific overrides
        |
        v
Verified effective configuration`
      },

      bullets: [
        "Maintain a clear source of truth for each setting.",
        "Use overrides intentionally when environment differences require them.",
        "Avoid unnecessary duplication across profile files.",
        "Understand Spring Boot's property-source precedence.",
        "Document externally required values.",
        "Test the effective configuration in the target environment."
      ]
    },

    {
      id: "protect-sensitive-logs",
      title: "10. Do Not Log Sensitive Configuration",

      paragraphs: [
        "Application logs are frequently collected by monitoring systems, stored for troubleshooting, or shared with operational teams. Logging secrets can expose credentials beyond the intended audience.",
        "Passwords, API keys, authorization headers, refresh tokens, and private keys should not be included in application logs.",
        "Debug logging can be useful while investigating configuration problems, but enabling verbose logging in production should be a deliberate decision. Review the behavior of libraries and integrations before enabling detailed diagnostic output.",
        "Use safe diagnostic messages that identify the property or subsystem involved without printing the sensitive value itself."
      ],

      bullets: [
        "Do not log database passwords.",
        "Do not log API keys or authentication tokens.",
        "Avoid printing complete configuration objects when they may contain secrets.",
        "Be careful when enabling DEBUG or TRACE logging in production.",
        "Review log access controls and retention policies.",
        "Sanitize sensitive values from error reports and diagnostic output."
      ]
    },

    {
      id: "configuration-documentation",
      title: "11. Document Important Configuration",

      paragraphs: [
        "Developers and deployment teams need to know which configuration values are required, which have defaults, and what each value controls.",
        "Document required environment variables, accepted formats, safe defaults, and environment-specific considerations in the project README or deployment documentation.",
        "A useful configuration reference explains the property name, whether it is required, an example that contains no real secrets, and where the value should be supplied.",
        "Documentation should match the actual application behavior. If a variable is required by the code, do not describe it as optional simply because a local developer happens to have it set."
      ],

      code: {
        language: "text",
        code: `Required configuration:
- DB_URL
- DB_USERNAME
- DB_PASSWORD

Optional configuration:
- SERVER_PORT (default: 8080)
- APP_ENV (default: development)

Never put real production credentials
in documentation or example files.`
      },

      bullets: [
        "Document all required variables.",
        "Explain defaults for optional settings.",
        "Describe valid values and formats.",
        "Provide safe example configuration.",
        "Update documentation whenever a required property changes.",
        "Avoid including actual credentials in README files."
      ]
    },

    {
      id: "real-world-example",
      title: "12. Real-World Spring Boot Configuration Example",

      paragraphs: [
        "The following example combines several practices: a meaningful application name, external datasource configuration, an explicit server port default, and a custom environment property.",
        "The example expects DB_URL, DB_USERNAME, and DB_PASSWORD to be supplied externally. APP_NAME, SERVER_PORT, and APP_ENV have defaults in the placeholders shown.",
        "A placeholder default is not a replacement for proper deployment configuration. In particular, use a safe, deliberate environment default and ensure that production settings are supplied by the deployment environment.",
        "For this example, APP_ENV is a custom property used by the application. It does not itself activate a Spring profile. Use spring.profiles.active or SPRING_PROFILES_ACTIVE when profile activation is required."
      ],

      code: {
        language: "yaml",
        code: `spring:
  application:
    name: \${APP_NAME:codeforge-api}

  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

server:
  port: \${SERVER_PORT:8080}

app:
  environment: \${APP_ENV:development}
  version: "1.0"`
      },

      bullets: [
        "Keep database credentials outside the committed file.",
        "Provide the required database variables in each environment.",
        "Use a consistent naming convention for custom properties.",
        "Document defaults and required settings.",
        "Use a Spring profile separately when environment-specific profile behavior is needed.",
        "Verify configuration during application startup and deployment testing."
      ]
    },

    {
      id: "configuration-checklist",
      title: "13. Configuration Checklist",

      bullets: [
        "Keep configuration separate from business logic.",
        "Use meaningful property names and consistent prefixes.",
        "Choose a clear configuration-file strategy.",
        "Use Spring Profiles for environment-specific configuration.",
        "Externalize sensitive values.",
        "Use environment variables or secret-management facilities where appropriate.",
        "Use @ConfigurationProperties for related settings.",
        "Avoid excessive @Value usage.",
        "Avoid unnecessary duplicate configuration.",
        "Do not log sensitive values.",
        "Validate important configuration.",
        "Document required configuration.",
        "Review the effective property values when troubleshooting.",
        "Use controlled database migrations for production schema changes.",
        "Test the application's configuration for each supported environment."
      ]
    },

    {
      id: "important-points",
      title: "14. Important Points",

      bullets: [
        "Configuration should be easy to understand and maintain.",
        "Secrets should not normally be hardcoded in source code or committed configuration files.",
        "Environment variables and secret managers can provide external configuration.",
        "Profiles help separate environment-specific settings.",
        "@ConfigurationProperties is useful for structured configuration.",
        "Important configuration should be validated.",
        "Sensitive values should not be written to logs.",
        "Spring Boot can resolve configuration from multiple property sources.",
        "A property defined in YAML may be overridden by a higher-precedence source.",
        "Documentation and automated tests help prevent configuration mistakes."
      ]
    },

    {
      id: "interview",
      title: "15. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What are some Spring Boot configuration best practices?",
          answer: "Keep configuration organized, externalize sensitive values, use profiles for environment differences, choose meaningful property names, validate important settings, document required values, and avoid unexplained duplication."
        },
        {
          question: "Should passwords be hardcoded in application.properties or application.yml?",
          answer: "Real production passwords should generally be externalized rather than committed to source control. Use an appropriate secret-management mechanism or protected deployment configuration."
        },
        {
          question: "When should you use @ConfigurationProperties?",
          answer: "Use it when multiple related configuration values should be bound to a structured Java object. It supports type-safe binding, nested properties, and configuration validation."
        },
        {
          question: "When is @Value useful?",
          answer: "@Value is useful when a class needs a small number of individual configuration values. For a large group of related settings, @ConfigurationProperties is often easier to maintain."
        },
        {
          question: "Why should configuration values not be logged?",
          answer: "Sensitive values such as passwords, API keys, and tokens could be exposed through application logs and monitoring systems."
        },
        {
          question: "Why are Spring Profiles useful?",
          answer: "Profiles allow applications to use different configuration values and bean definitions for environments such as development, testing, and production."
        },
        {
          question: "Why should configuration be validated?",
          answer: "Validation helps detect missing or invalid configuration during startup rather than allowing errors to occur later when a request or background task uses the value."
        },
        {
          question: "What is externalized configuration?",
          answer: "Externalized configuration means keeping settings outside the application business logic so they can be supplied or changed through supported configuration sources without changing the application code."
        },
        {
          question: "What is the difference between a default property value and a required property?",
          answer: "A default value is used when no applicable value is supplied. A required property has no fallback and may cause startup to fail if Spring cannot resolve it."
        },
        {
          question: "How do you provide a default value for a Spring placeholder?",
          answer: "Use syntax such as ${SERVER_PORT:8080}. The value before the colon is the property name, and the value after the colon is the fallback."
        },
        {
          question: "Are environment variables always secure?",
          answer: "No. They are one way to externalize configuration, but their exposure depends on operating-system permissions, process access, deployment practices, and logging. Sensitive values still need access controls."
        },
        {
          question: "What is the purpose of configuration validation?",
          answer: "It checks that required properties are present and that values meet defined constraints, such as valid ranges or nonblank text."
        },
        {
          question: "How can @ConfigurationProperties validation be enabled?",
          answer: "Register the configuration-properties class, use @Validated with suitable Jakarta Bean Validation constraints, and include the required validation implementation dependency."
        },
        {
          question: "What can happen if the same property is defined in several sources?",
          answer: "Spring Boot resolves the effective value according to configuration property-source precedence. A higher-precedence source can override a value defined in a configuration file."
        },
        {
          question: "What is the purpose of application-dev.yml?",
          answer: "It provides configuration overrides for the dev profile, allowing development-specific settings to remain separate from common configuration."
        },
        {
          question: "Should every profile repeat all application properties?",
          answer: "No. Shared values can remain in application.yml, and profile-specific files can contain only the settings that differ. Required secrets should still be supplied securely."
        },
        {
          question: "How should database schema changes be managed in production?",
          answer: "Use a controlled migration strategy, commonly with Flyway or Liquibase, rather than relying on Hibernate's update mode as the primary production schema-management process."
        },
        {
          question: "How can you investigate a property that is not taking effect?",
          answer: "Check the property name and hierarchy, active profiles, external configuration, environment variables, command-line arguments, and Spring Boot's configuration diagnostics."
        },
        {
          question: "What should a configuration README contain?",
          answer: "It should document required and optional variables, defaults, accepted formats, setup instructions, and safe example values without exposing real secrets."
        },
        {
          question: "What is the difference between APP_ENV and SPRING_PROFILES_ACTIVE?",
          answer: "APP_ENV is a custom property unless application code gives it a specific meaning. SPRING_PROFILES_ACTIVE is a Spring Boot property used to activate Spring profiles."
        },
        {
          question: "Why should production DEBUG logging be reviewed carefully?",
          answer: "Verbose logging can increase log volume and may expose sensitive information depending on the application and libraries. Production logging should be deliberately configured."
        },
        {
          question: "What does configuration ownership mean?",
          answer: "It means establishing a clear source and responsibility for each setting so developers can determine where a value is defined, who maintains it, and how environment-specific overrides are applied."
        },
        {
          question: "How can configuration practices improve deployment reliability?",
          answer: "Consistent naming, externalized settings, validation, profile-aware testing, secret management, and clear documentation reduce configuration errors between environments."
        }
      ]
    }
  ]
};
