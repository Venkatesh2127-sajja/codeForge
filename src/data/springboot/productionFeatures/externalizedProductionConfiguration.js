
export const externalizedProductionConfiguration = {
  id: 1405,
  title: "Externalized Production Configuration",
  slug: "externalized-production-configuration",
  topicTitle: "Spring Boot Production Features",
  description:
    "Learn external configuration sources, environment variables, configuration precedence, typed configuration, startup validation, secrets management, and safe production deployment practices.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "concept",
      title: "What Is Externalized Configuration?",
      paragraphs: [
        "Externalized configuration means keeping environment-specific settings outside application code and packaging. The same application artifact can run in development, testing, staging, and production with different settings.",
        "For example, a development application might connect to a local MySQL database, while the production application connects to a managed database. Externalized configuration lets the deployment supply the appropriate database URL, username, and password without changing Java source code.",
        "Common configuration values include server ports, database URLs, connection pool sizes, logging levels, API endpoints, feature flags, timeout values, and message broker settings.",
        "Spring Boot supports multiple configuration sources, including application.properties, application.yml, profile-specific configuration files, environment variables, Java system properties, command-line arguments, and programmatically supplied property sources.",
        "Externalized configuration is useful for security, portability, deployment automation, and operational maintenance. However, externalizing a secret does not automatically secure it; the environment or secret-management system supplying the value must also be protected."
      ],
      bullets: [
        "Separate application behavior from deployment-specific settings.",
        "Build and test an application artifact, then configure it for each target environment.",
        "Keep passwords, API keys, and signing keys outside source control.",
        "Validate required settings before accepting application traffic.",
        "Use consistent property names and document required environment variables.",
        "Avoid logging configuration values that contain credentials or other secrets."
      ]
    },
    {
      id: "yaml",
      title: "Configure a Production Database",
      paragraphs: [
        "A Spring Boot datasource requires a JDBC URL and may require a username and password, depending on the database authentication setup. These values can be supplied through environment variables instead of being hardcoded in application.yml.",
        "Spring Boot property placeholders use the syntax ${PROPERTY_NAME}. A default value can be supplied after a colon, as in ${SERVER_PORT:8080}. The default is appropriate for non-sensitive settings such as a local server port, but required production credentials should not silently fall back to insecure defaults.",
        "The following configuration uses environment variables for database connectivity and disables Open EntityManager in View. Disabling it can make database access boundaries more explicit, but the application must load the required relationships within the appropriate service transaction."
      ],
      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    open-in-view: false

server:
  port: \${SERVER_PORT:8080}`
      },
      bullets: [
        "DB_URL contains the JDBC connection URL, such as a MySQL JDBC URL.",
        "DB_USERNAME contains the database username.",
        "DB_PASSWORD contains the database password.",
        "SERVER_PORT overrides the port; otherwise, Spring Boot uses 8080 in this example.",
        "The database environment variables must be supplied before startup.",
        "Database firewall rules, TLS settings, and least-privilege database permissions must also be configured appropriately."
      ]
    },
    {
      id: "precedence",
      title: "Understand Configuration Precedence",
      paragraphs: [
        "Spring Boot can obtain the same property from several sources. When multiple sources define the same property, the higher-precedence source determines the effective value.",
        "For example, application.yml might specify server.port as 8080, while an environment variable supplies 9090. The application normally uses 9090 because the environment variable takes precedence over configuration data loaded from application.yml.",
        "Command-line arguments can override many other configuration sources. This is useful for temporary operational overrides, but it also means that deployment scripts and startup commands should be reviewed carefully.",
        "The complete precedence order contains multiple property sources and can vary in relevant details across Spring Boot versions and application setups. Consult the documentation for the exact version used by your project instead of memorizing an incomplete list."
      ],
      code: {
        language: "bash",
        code: `# Set a deployment-specific port in the shell
export SERVER_PORT=9090

# Start the application
java -jar app.jar

# A command-line property can override the environment value
java -jar app.jar --server.port=9091`
      },
      bullets: [
        "Use application.yml for suitable shared defaults.",
        "Use environment variables or deployment configuration for environment-specific values.",
        "Use command-line overrides intentionally and document operational dependencies.",
        "Avoid defining the same property in many places without a clear reason.",
        "Never print secret values while troubleshooting configuration.",
        "Verify the effective non-sensitive configuration when diagnosing deployment issues."
      ]
    },
    {
      id: "validation",
      title: "Validate Required Configuration",
      paragraphs: [
        "A production application should fail clearly when a required setting is missing or invalid. For example, a payment integration should not start normally if its required gateway URL is blank or its timeout is zero.",
        "@ConfigurationProperties groups related properties into a typed Java object. This approach is usually easier to maintain than scattering many individual @Value annotations throughout a large application.",
        "Bean Validation constraints such as @NotBlank and @Min can validate configuration at startup when validation is enabled and the configuration properties bean is registered correctly.",
        "For a Spring Boot 3 application, use jakarta.validation imports. The validation starter is commonly added through spring-boot-starter-validation."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.payment")
public record PaymentProperties(
        @NotBlank String gatewayUrl,
        @Min(1) int timeoutSeconds
) {}`
      },
      bullets: [
        "Register the properties class using configuration-properties scanning or explicit enablement.",
        "Include the validation dependency when using Jakarta Bean Validation constraints.",
        "Use constraints that match the real requirements of each setting.",
        "Provide a meaningful startup failure when required configuration is invalid.",
        "Avoid placing passwords or tokens in validation messages.",
        "Remember that validation only works when the properties object is created and validated by the configured Spring infrastructure."
      ]
    },
    {
      id: "properties-registration",
      title: "Register Configuration Properties",
      paragraphs: [
        "Creating a class annotated with @ConfigurationProperties does not, by itself, guarantee that Spring will instantiate it. The application must register the class through configuration-properties scanning or explicit enablement.",
        "@ConfigurationPropertiesScan is convenient when configuration properties classes are located within the packages scanned by the application. @EnableConfigurationProperties is useful when you want to register particular properties classes explicitly.",
        "Choose one clear registration approach for each properties class. The following example uses explicit registration and can be placed on the application's configuration class."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(PaymentProperties.class)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`
      },
      bullets: [
        "Keep configuration properties classes focused on a single configuration area.",
        "Use immutable records when their binding and validation requirements are suitable.",
        "Use constructor binding conventions supported by your Spring Boot version.",
        "Do not register the same configuration bean unnecessarily through multiple mechanisms.",
        "Check startup logs and tests when a properties bean cannot be injected."
      ]
    },
    {
      id: "typed-configuration",
      title: "Bind Related Properties into a Typed Object",
      paragraphs: [
        "Typed configuration gives related settings a clear structure and makes them easier to inject into services. It also improves readability because the property names and Java types are declared in one place.",
        "For example, a payment service may need a gateway URL and a timeout. Instead of reading environment variables directly in business logic, inject PaymentProperties and use its accessors.",
        "The configuration values still originate from external property sources. The typed class provides a Java representation of those values; it does not itself provide secret storage or encryption."
      ],
      code: {
        language: "yaml",
        code: `app:
  payment:
    gateway-url: \${PAYMENT_GATEWAY_URL}
    timeout-seconds: \${PAYMENT_TIMEOUT_SECONDS:5}`
      },
      bullets: [
        "Use a prefix to group settings belonging to one subsystem.",
        "Use clear property names and appropriate Java types.",
        "Provide safe defaults only when the application can operate correctly with them.",
        "Keep configuration binding separate from business logic.",
        "Avoid creating one enormous properties class for unrelated subsystems."
      ]
    },
    {
      id: "profiles",
      title: "Use Profiles for Environment-Specific Configuration",
      paragraphs: [
        "Spring profiles allow an application to activate environment-specific beans and configuration. Common profile names include dev, test, staging, and prod.",
        "A project can keep shared settings in application.yml and place environment-specific overrides in application-dev.yml or application-prod.yml. The active profile determines which profile-specific configuration is loaded.",
        "Profiles are useful for selecting configuration and beans, but they are not a security boundary. A production profile does not automatically protect credentials or prevent someone from supplying a different profile at startup.",
        "Keep production credentials external even when application-prod.yml is used. The file should generally contain non-sensitive production-specific defaults or placeholders rather than committed passwords."
      ],
      code: {
        language: "yaml",
        code: `# application.yml
spring:
  application:
    name: codeforge-api

# application-prod.yml
server:
  port: \${SERVER_PORT:8080}

logging:
  level:
    root: INFO`
      },
      bullets: [
        "Keep shared configuration in application.yml.",
        "Use application-prod.yml for production-specific non-secret settings.",
        "Activate the profile through the deployment environment or startup configuration.",
        "Avoid hardcoding production credentials in profile-specific files.",
        "Test the application with the same profile and configuration patterns used in deployment.",
        "Do not assume that activating prod automatically enables every production security control."
      ]
    },
    {
      id: "environment-variables",
      title: "Set Environment Variables During Deployment",
      paragraphs: [
        "Environment variables allow deployment platforms, containers, and operating systems to supply configuration without changing the application JAR.",
        "The following shell example demonstrates setting values before starting a Spring Boot application. It is suitable as a learning example; production systems should use their approved deployment and secret-injection mechanisms.",
        "Environment variables may be visible to privileged operating-system users, diagnostic tools, or deployment logs depending on the platform. Use access controls and a secret manager where appropriate, and avoid printing secret values."
      ],
      code: {
        language: "bash",
        code: `export DB_URL='jdbc:mysql://db.example.internal:3306/codeforge'
export DB_USERNAME='codeforge_app'
export DB_PASSWORD='<injected-secret>'
export SERVER_PORT=8080

java -jar app.jar`
      },
      bullets: [
        "Use the deployment platform's supported mechanism to inject environment variables.",
        "Replace placeholder values with values supplied securely by the deployment environment.",
        "Restrict database network access to approved application hosts or networks.",
        "Use a dedicated database account with only the permissions the application requires.",
        "Do not commit shell scripts containing real passwords to Git.",
        "Rotate credentials through a controlled operational process."
      ]
    },
    {
      id: "secrets",
      title: "Manage Production Secrets Safely",
      paragraphs: [
        "Secrets include database passwords, API keys, OAuth client secrets, private signing keys, and credentials used to connect to external systems. If an attacker obtains these values, they may impersonate the application or gain access to protected resources.",
        "Do not store real secrets in source code, committed YAML files, container images, public repositories, or application logs. A private Git repository is not a secret manager.",
        "For production deployments, use an approved secret-management system or the deployment platform's protected secret-injection feature. Restrict access according to the principle of least privilege.",
        "Base64 encoding does not encrypt a secret. Anyone who can read the encoded value can decode it. Encryption, access control, key management, and secure delivery are separate concerns.",
        "If a secret is exposed, removing it from the latest commit is not sufficient. Treat it as compromised, rotate or revoke it, investigate its use, and remove exposed copies from relevant locations where practical."
      ],
      bullets: [
        "Never commit real credentials to source control.",
        "Use a secret manager or protected deployment secrets.",
        "Limit which users and services can retrieve each secret.",
        "Avoid exposing secrets in logs, exception messages, screenshots, and support tickets.",
        "Rotate credentials after suspected exposure and according to policy.",
        "Separate application permissions from human administrator permissions.",
        "Use encrypted connections to databases and external services when supported and required."
      ]
    },
    {
      id: "configuration-testing",
      title: "Test Configuration Before Production",
      paragraphs: [
        "Configuration should be tested just like application code. A valid Java build does not prove that the deployed application has the correct database URL, active profile, API endpoint, or timeout.",
        "A useful test strategy checks property binding, required-value validation, profile-specific behavior, and startup using representative deployment configuration.",
        "Do not place real production credentials in automated test fixtures. Use test credentials, isolated test services, or suitable test containers and inject values through the test environment.",
        "Operational smoke tests should confirm that the application starts, its health checks work, and its required dependencies are reachable. A health endpoint alone does not prove that every business integration is configured correctly."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "app.payment.gateway-url=https://payments.example.test",
        "app.payment.timeout-seconds=5"
})
class PaymentPropertiesTest {

    @Autowired
    private PaymentProperties paymentProperties;

    @Test
    void bindsPaymentConfiguration() {
        assertEquals(
                "https://payments.example.test",
                paymentProperties.gatewayUrl()
        );
        assertEquals(5, paymentProperties.timeoutSeconds());
    }
}`
      },
      bullets: [
        "Test that expected property values bind to the correct fields.",
        "Test missing and invalid values when startup validation is required.",
        "Test each supported profile in an appropriate environment.",
        "Keep test secrets separate from production secrets.",
        "Check deployment logs for configuration-resolution failures without printing secret values.",
        "Verify connectivity and health checks after deployment."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common External Configuration Mistakes",
      paragraphs: [
        "Many production incidents are caused by incorrect or missing configuration rather than defects in business logic. Examples include a database URL pointing to the wrong environment, a missing environment variable, a profile that was never activated, or an unexpected override.",
        "A missing placeholder can prevent startup when Spring attempts to resolve the required property. Other missing or invalid values may fail later when the affected component is created or used. Explicit validation makes failures earlier and easier to understand.",
        "A deployment can also start successfully with the wrong configuration. For this reason, startup success alone is not enough; validate important non-sensitive settings and run suitable smoke tests."
      ],
      bullets: [
        "Hardcoding production database credentials in application.yml.",
        "Assuming a private Git repository makes committed secrets safe.",
        "Providing insecure defaults for required credentials.",
        "Using inconsistent environment variable names between deployment environments.",
        "Forgetting to activate the intended Spring profile.",
        "Overriding a property through a command-line argument without realizing it.",
        "Printing the full configuration or connection URL when it contains credentials.",
        "Assuming that Base64-encoded values are encrypted.",
        "Assuming that a successful application startup proves every integration is working.",
        "Changing a secret in a deployment system without verifying whether the running application needs a restart or supported refresh mechanism."
      ]
    },
    {
      id: "best-practices",
      title: "Externalized Configuration Best Practices",
      paragraphs: [
        "A reliable configuration strategy makes deployments repeatable, keeps credentials protected, and makes configuration failures easy to diagnose. The application should clearly distinguish required settings from optional settings and defaults.",
        "Treat configuration as part of the deployment contract. Document the variables and properties an application needs, their formats, whether they are mandatory, and which team or system supplies them.",
        "Do not expose secret values while reporting configuration status. It is usually sufficient to report whether a required value is present, whether validation passed, and which subsystem could not initialize."
      ],
      bullets: [
        "Keep one tested application artifact across environments where practical.",
        "Use typed @ConfigurationProperties for related settings.",
        "Validate required properties and reasonable value ranges at startup.",
        "Use approved secret storage and restricted access.",
        "Keep production defaults safe and avoid silent credential fallbacks.",
        "Document property names, types, defaults, and required values.",
        "Review property precedence when diagnosing unexpected behavior.",
        "Avoid unnecessary duplication across application.yml and profile-specific files.",
        "Use least-privilege database and external-service credentials.",
        "Test configuration and dependency connectivity before and after deployment.",
        "Use controlled procedures for secret rotation and configuration changes.",
        "Never log passwords, API keys, tokens, or private signing keys."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is externalized configuration?",
          answer: "Externalized configuration keeps environment-specific settings outside application code so the same application artifact can run in different environments with different configuration values."
        },
        {
          question: "Why is externalized configuration important in production?",
          answer: "It allows deployment-specific values to change without modifying or rebuilding application code, improves deployment portability, and helps keep credentials out of source control."
        },
        {
          question: "How do you read an environment variable in Spring Boot YAML?",
          answer: "Use a property placeholder such as ${DB_URL}. A default can be specified using syntax such as ${SERVER_PORT:8080}."
        },
        {
          question: "What happens when a required property placeholder is missing?",
          answer: "Spring may fail while resolving the placeholder during startup. If the property is consumed later or has a fallback, the failure may occur at another point. Explicit validation helps ensure required configuration fails early."
        },
        {
          question: "What is configuration precedence?",
          answer: "Configuration precedence determines which value is used when multiple property sources define the same property. Higher-precedence sources override lower-precedence sources."
        },
        {
          question: "How can you override a Spring Boot server port?",
          answer: "You can set SERVER_PORT in the environment or supply a command-line property such as --server.port=9090. The effective value depends on the configured property sources and their precedence."
        },
        {
          question: "What is the purpose of @ConfigurationProperties?",
          answer: "@ConfigurationProperties binds related external settings into a typed Java object. It improves organization and works well with configuration validation."
        },
        {
          question: "What is the purpose of @Validated on configuration properties?",
          answer: "It enables validation of a configuration properties bean when the required validation infrastructure and constraints are present. Invalid values can then cause startup to fail."
        },
        {
          question: "How do you register a configuration properties class?",
          answer: "Use @ConfigurationPropertiesScan or register the class explicitly with @EnableConfigurationProperties. The chosen approach must ensure Spring creates the properties bean."
        },
        {
          question: "What is the difference between application.yml and application-prod.yml?",
          answer: "application.yml typically contains shared configuration. application-prod.yml contains configuration specific to the prod profile and is loaded when that profile is active."
        },
        {
          question: "Are Spring profiles a security mechanism?",
          answer: "No. Profiles select configuration and beans. They do not replace access controls, secure secret storage, authentication, or authorization."
        },
        {
          question: "Where should production database passwords be stored?",
          answer: "Use a suitable secret manager or protected deployment secret mechanism. Do not commit real passwords to source control or package them into the application artifact."
        },
        {
          question: "Is Base64 encoding enough to protect a password?",
          answer: "No. Base64 is an encoding scheme, not encryption. Anyone who obtains the encoded value can decode it."
        },
        {
          question: "Why should configuration be tested?",
          answer: "Testing catches missing properties, incorrect binding, invalid values, profile mistakes, and deployment-specific problems before they cause production failures."
        },
        {
          question: "What should you do if a production secret is exposed?",
          answer: "Treat the secret as compromised, revoke or rotate it, investigate possible misuse, and remove exposed copies where practical. Deleting it from the latest source commit alone is not enough."
        },
        {
          question: "Does changing an environment variable update a running Spring Boot application automatically?",
          answer: "Not necessarily. Environment variables are generally read by the process at startup. A restart or an explicitly configured refresh mechanism may be required, depending on how the application obtains its configuration."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Externalized configuration separates deployment-specific values from application code. Spring Boot can read configuration from YAML, properties files, environment variables, system properties, command-line arguments, and other property sources.",
        "Use @ConfigurationProperties to organize related settings, validation to reject invalid values, profiles to select environment-specific configuration, and a suitable secret-management system to protect credentials."
      ],
      bullets: [
        "Externalized configuration: configuration supplied separately from application code.",
        "Property placeholder: ${DB_URL}.",
        "Placeholder with default: ${SERVER_PORT:8080}.",
        "Typed binding: @ConfigurationProperties.",
        "Configuration validation: Bean Validation constraints with the required validation setup.",
        "Profile-specific configuration: application-prod.yml.",
        "Secret protection: use approved secret-management and deployment mechanisms.",
        "Configuration precedence: the highest-precedence source supplies the effective value.",
        "Production readiness: validate settings, restrict access, test deployment configuration, and verify dependency connectivity."
      ],
      code: {
        language: "text",
        code: `Deployment configuration flow

Deployment platform or secret manager
                |
                v
       Environment variables
                |
                v
     Spring Boot property sources
                |
                v
       Configuration binding
                |
                v
      Startup validation
                |
                v
  DataSource and application beans
                |
                v
      Application readiness`
      }
    }
  ]
};
