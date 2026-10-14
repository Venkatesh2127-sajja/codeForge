
export const environmentProfilesAndSecrets = {
  id: 1406,
  title: "Environment Profiles and Secrets",
  slug: "environment-profiles-and-secrets",
  topicTitle: "Spring Boot Production Features",
  description:
    "Learn Spring profiles, environment-specific configuration, property precedence, externalized configuration, secret management, and secure production deployment practices.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "profiles",
      title: "What Are Spring Profiles?",
      paragraphs: [
        "Spring profiles allow different beans and configuration values to be activated for different environments. Common examples include dev for development, test for testing, staging for pre-production validation, and prod for production.",
        "A single Spring Boot application may run in several environments. Each environment can use a different database, logging level, external API endpoint, or integration implementation without requiring changes to the application's business logic.",
        "Spring Boot supports shared configuration in application.yml and profile-specific configuration in files such as application-dev.yml and application-prod.yml. Profile-specific properties can override shared values when the relevant profile is active.",
        "Profiles can also control which Spring beans are registered. For example, a local development environment might use a simulated payment gateway, while production uses a real payment provider integration.",
        "Profiles separate configuration and behavior, but they do not automatically secure an environment. Database credentials, signing keys, network access, permissions, and management endpoints must still be protected independently.",
        "A common mistake is putting real credentials directly in application-prod.yml and assuming the file is safe because it is intended only for production. If the file is committed to source control or copied into an exposed artifact, those credentials may be disclosed."
      ],
      code: {
        language: "yaml",
        code: `# application.yml
spring:
  application:
    name: codeforge-api

logging:
  level:
    root: INFO

---
# application-dev.yml
spring:
  config:
    activate:
      on-profile: dev

logging:
  level:
    com.codeforge: DEBUG

---
# application-prod.yml
spring:
  config:
    activate:
      on-profile: prod

logging:
  level:
    root: INFO
    com.codeforge: INFO`
      },
      bullets: [
        "Keep common defaults in application.yml.",
        "Put environment-specific overrides in profile-specific files.",
        "Avoid duplicating the entire configuration in every profile.",
        "Do not commit real secrets to profile-specific files.",
        "Use separate databases and appropriately scoped credentials for different environments.",
        "Use profiles to select behavior, not as an access-control or secret-storage mechanism.",
        "Validate that the required configuration exists before deploying an application."
      ]
    },
    {
      id: "activate",
      title: "Activate a Profile",
      paragraphs: [
        "A profile can be activated through supported configuration properties, environment variables, or command-line arguments. This lets deployment configuration choose the environment without requiring a source-code change.",
        "The SPRING_PROFILES_ACTIVE environment variable is a common deployment-friendly way to activate a profile. A command-line argument such as --spring.profiles.active=prod can also activate the production profile.",
        "Spring Boot also supports profile groups, which allow one logical profile to activate several related profiles. This can be useful when a deployment requires a predictable combination of configuration sets.",
        "Do not assume that a profile is active merely because a profile-specific file exists. The profile must be activated, or otherwise included through supported configuration, for the intended configuration to apply.",
        "Verify the active profile through startup information and deployment configuration. Avoid printing secrets while troubleshooting configuration problems."
      ],
      code: {
        language: "bash",
        code: `# Linux/macOS: activate the production profile
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar

# Activate a profile directly from the command line
java -jar app.jar --spring.profiles.active=prod

# Activate the development profile
java -jar app.jar --spring.profiles.active=dev`
      },
      bullets: [
        "Use deployment configuration to select the intended profile.",
        "Verify which profiles are active at startup.",
        "Never activate development-only settings in production accidentally.",
        "Avoid relying on a developer's local IDE settings for production deployment.",
        "Use a documented default profile only when that default is appropriate for the application.",
        "Treat command-line arguments and environment variables as configuration inputs that must be controlled by the deployment process."
      ],
      code: {
        language: "yaml",
        code: `# Example profile group in application.yml
spring:
  profiles:
    group:
      production:
        - prod
        - monitoring`
      },
      output:
        "Activating the production profile group activates the prod and monitoring profiles. Define profile groups in non-profile-specific configuration rather than placing their definitions inside a profile-specific document."
    },
    {
      id: "configuration-precedence",
      title: "Configuration Properties and Precedence",
      paragraphs: [
        "Spring Boot externalized configuration allows application settings to come from multiple sources, including configuration files, environment variables, Java system properties, and command-line arguments.",
        "When the same property is supplied by multiple sources, Spring Boot uses a defined precedence order to determine which value applies. Higher-precedence sources can override lower-precedence sources.",
        "For example, application.yml might define a default server port, while a deployment environment variable overrides it. This allows one packaged application to run with different settings in different environments.",
        "Property names often use relaxed binding. A configuration property such as spring.datasource.url can commonly be supplied through the SPRING_DATASOURCE_URL environment variable.",
        "Configuration precedence is useful, but it can also make deployments confusing when multiple sources define the same property. Document the intended source of important settings and inspect resolved configuration carefully without exposing secrets."
      ],
      code: {
        language: "yaml",
        code: `# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge`
      },
      bullets: [
        "Configuration files provide convenient shared defaults.",
        "Environment variables are useful for deployment-specific values.",
        "Command-line arguments can override many configuration properties.",
        "Avoid defining the same setting in many locations without a clear reason.",
        "Never print the resolved values of passwords or signing keys during troubleshooting.",
        "Use validated configuration properties for related settings that need consistent types and constraints."
      ],
      code: {
        language: "bash",
        code: `# Override configuration using environment variables
export SERVER_PORT=9090
export SPRING_DATASOURCE_URL=jdbc:mysql://db-host:3306/codeforge

java -jar app.jar`
      },
      output:
        "The application can use port 9090 and the specified database URL instead of the defaults in application.yml, provided no higher-precedence configuration source overrides them."
    },
    {
      id: "secrets",
      title: "Manage Secrets Safely",
      paragraphs: [
        "Secrets are sensitive values that must be protected from unauthorized access. Common examples include database passwords, API tokens, OAuth client secrets, JWT signing keys, private keys, and credentials used to access cloud resources.",
        "A secret is different from ordinary configuration. A database hostname or a feature flag may not be confidential, while a database password or signing key can grant access or allow an attacker to impersonate a trusted component.",
        "Use a dedicated secrets manager or a protected deployment secret mechanism when available. Examples include managed cloud secret services and orchestrator-managed secrets. Choose a mechanism that fits the deployment platform and its access-control model.",
        "Environment variables can be convenient for injecting secrets into an application, but they are not a complete secrets-management system by themselves. Their values may be exposed through process inspection, diagnostics, crash reports, or overly permissive operational access, depending on the environment.",
        "Apply least privilege so each service receives only the credentials and permissions it needs. Separate development and production credentials, rotate them when required, and revoke compromised credentials promptly.",
        "Do not commit secrets to Git, include them in Docker images, place them in public configuration files, or print them in application logs. If a secret is accidentally committed, deleting it from the latest file is not enough; the exposed credential should be rotated or revoked because it may remain in repository history or other copies."
      ],
      bullets: [
        "Do not commit passwords, tokens, or private keys to source control.",
        "Use a dedicated secrets manager or protected deployment mechanism.",
        "Use least-privilege credentials and restrict who can retrieve them.",
        "Separate development, testing, and production credentials.",
        "Rotate compromised, expired, or scheduled-for-rotation credentials.",
        "Avoid placing secrets in Docker build arguments, image layers, or source-controlled Dockerfiles.",
        "Do not include secrets in exception messages, HTTP responses, or logs.",
        "Restrict access to CI/CD variables and deployment configuration.",
        "Use encrypted transport and appropriate encryption at rest.",
        "Review backups, repository history, build artifacts, and logs when investigating a secret exposure."
      ],
      code: {
        language: "yaml",
        code: `# application-prod.yml
spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}`
      },
      output:
        "Spring Boot resolves the placeholders from the application's available property sources. Supply DB_URL, DB_USERNAME, and DB_PASSWORD through protected deployment configuration or a suitable secret-injection mechanism. Do not commit actual credentials to the file."
    },
    {
      id: "externalized-secrets",
      title: "Inject Secrets Through Environment Variables",
      paragraphs: [
        "Externalized configuration keeps environment-specific values out of the application source code. In a deployment pipeline, a platform can provide required variables or retrieve secrets from a secret manager before starting the application.",
        "Spring Boot supports placeholders such as ${DB_PASSWORD}. The placeholder refers to a property source, such as an environment variable, that supplies the value at runtime.",
        "Required configuration should fail clearly when missing rather than silently using a production-unsafe fallback. A default password such as root or password can accidentally allow an application to start with an insecure configuration.",
        "For more complex configuration, @ConfigurationProperties can bind related settings to a typed Java object and support validation. Secrets should remain protected when configuration objects are inspected, serialized, or logged."
      ],
      code: {
        language: "yaml",
        code: `# application.yml
spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}`
      },
      bullets: [
        "Provide required variables through the deployment platform.",
        "Do not place actual production credentials in the YAML file.",
        "Avoid insecure fallback values for required production secrets.",
        "Ensure the application process can access only the secrets it needs.",
        "Do not print configuration objects if they contain credentials.",
        "Use typed configuration and validation for important groups of properties."
      ],
      code: {
        language: "bash",
        code: `# Illustrative local setup with placeholder values.
# Do not use real production credentials in shell history.

export DB_URL='jdbc:mysql://localhost:3306/codeforge'
export DB_USERNAME='codeforge_app'
export DB_PASSWORD='replace-with-a-local-development-secret'

java -jar app.jar`
      },
      output:
        "The shell exports values into the environment of the application process. For production, use the deployment platform's protected secret mechanism instead of manually typing credentials into an interactive shell."
    },
    {
      id: "bean-profile",
      title: "Activate Profile-Specific Beans",
      paragraphs: [
        "The @Profile annotation controls whether a bean or configuration class is registered for the active environment. It is useful when development and production require different implementations of the same interface.",
        "For example, a development environment might use a fake payment gateway that simulates successful payments, while production uses a real gateway integration. Keeping these implementations separate reduces the risk of test behavior being used accidentally in production.",
        "When several implementations implement the same interface, ensure that the active profile produces the intended bean. If no matching implementation exists, dependency injection can fail. If multiple implementations are registered unexpectedly, Spring may report an ambiguous dependency unless the configuration resolves it.",
        "Profile-specific implementations should share the same contract where practical, so application services can use dependency injection without containing environment-specific branching logic."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.payment;

public interface PaymentGateway {
    String processPayment();
}`
      },
      bullets: [
        "Define an interface for the integration boundary.",
        "Use @Profile to control which implementation is registered.",
        "Keep development-only simulations separate from production integrations.",
        "Ensure each supported environment has a valid implementation.",
        "Avoid using a simulated payment implementation for real production transactions."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.payment;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DevelopmentPaymentGateway
        implements PaymentGateway {

    @Override
    public String processPayment() {
        return "Development payment simulation";
    }
}`
      },
      output:
        "DevelopmentPaymentGateway is registered when the dev profile is active. A corresponding production implementation must be supplied and configured for production."
    },
    {
      id: "profile-testing",
      title: "Testing Environment Configuration",
      paragraphs: [
        "Tests often need configuration that differs from both local development and production. For example, a test may use an isolated database, a test-specific endpoint, or a fake external service.",
        "Spring Boot tests can activate profiles with @ActiveProfiles. This makes the intended profile explicit in the test and helps prevent tests from accidentally depending on a developer's machine-specific configuration.",
        "A profile alone does not guarantee test isolation. Database state, shared external services, credentials, and concurrent test execution still need appropriate isolation and cleanup.",
        "Never run integration tests against production data or production services unless the test has been specifically designed, approved, and protected for that purpose."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class ApplicationConfigurationTest {

    @Test
    void applicationContextLoads() {
        // Spring should start using the test profile.
    }
}`
      },
      bullets: [
        "Use a dedicated test profile when test settings differ from development.",
        "Use isolated test databases or disposable test resources when practical.",
        "Keep test credentials separate from production credentials.",
        "Do not assume @ActiveProfiles automatically creates an isolated database.",
        "Include configuration validation in deployment and integration testing."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes and Best Practices",
      paragraphs: [
        "Configuration mistakes can cause an application to connect to the wrong database, activate unsafe development behavior, or fail to start because a required secret is missing. Production configuration should be reviewed and validated as part of deployment.",
        "A common mistake is treating application-dev.yml or application-prod.yml as secure merely because the filename identifies an environment. File names and active profiles do not provide encryption or access control.",
        "Another mistake is silently supplying insecure defaults for required production settings. Prefer explicit deployment configuration and fail-fast validation for values that must be present.",
        "Profile activation, secret injection, and access control solve different problems. Profiles select configuration and beans, externalized configuration supplies environment-specific values, and a secrets-management mechanism protects sensitive credentials."
      ],
      bullets: [
        "Do not commit real secrets to Git.",
        "Do not package production credentials into a JAR or container image.",
        "Do not use development database URLs in production.",
        "Do not depend on local IDE profile settings for production.",
        "Avoid unsafe fallback passwords or signing keys.",
        "Validate required configuration before serving requests.",
        "Keep the number of overlapping profiles manageable and documented.",
        "Use least-privilege database and service credentials.",
        "Restrict access to CI/CD secrets and production deployment controls.",
        "Rotate credentials after suspected exposure.",
        "Avoid logging resolved secret values.",
        "Test profile-specific bean selection and configuration in automated tests."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a Spring profile?",
          answer: "A Spring profile activates environment-specific configuration and beans, allowing an application to behave differently in development, testing, staging, and production."
        },
        {
          question: "Why do we use application-dev.yml and application-prod.yml?",
          answer: "They allow shared application code to use different configuration values for different environments, such as logging levels, database URLs, and integration settings."
        },
        {
          question: "How do you activate the prod profile?",
          answer: "One common approach is setting SPRING_PROFILES_ACTIVE=prod or passing --spring.profiles.active=prod when starting the application."
        },
        {
          question: "What is the purpose of @Profile?",
          answer: "@Profile conditionally registers a bean or configuration when the specified profile is active."
        },
        {
          question: "Does using application-prod.yml secure production settings?",
          answer: "No. A profile-specific file selects configuration but does not protect its contents. Secrets still require suitable storage, access controls, and deployment protection."
        },
        {
          question: "What is externalized configuration?",
          answer: "Externalized configuration allows application settings to be supplied through sources such as YAML or properties files, environment variables, system properties, and command-line arguments instead of hardcoding them in Java code."
        },
        {
          question: "How does Spring Boot resolve configuration values?",
          answer: "Spring Boot combines values from supported property sources according to its configuration precedence rules. A higher-precedence source can override a value from a lower-precedence source."
        },
        {
          question: "How should database passwords be managed?",
          answer: "Use a protected deployment secret mechanism or a secrets manager, apply least privilege, separate credentials by environment, and rotate credentials when required."
        },
        {
          question: "Are environment variables always secure for storing secrets?",
          answer: "No. They are a useful injection mechanism, but their security depends on the operating system, deployment platform, process access, diagnostics, and permissions. A suitable secrets-management system and access controls may be required."
        },
        {
          question: "What happens if a required configuration placeholder is missing?",
          answer: "If the property has no resolvable value or configured default, application startup or bean initialization will commonly fail with a configuration-resolution error. This can help prevent deployment with incomplete required settings."
        },
        {
          question: "What is the difference between a profile and a secret manager?",
          answer: "A profile selects environment-specific configuration and beans. A secret manager securely stores, controls access to, and may support rotation of sensitive credentials."
        },
        {
          question: "What is @ActiveProfiles used for in tests?",
          answer: "@ActiveProfiles specifies the profile that should be active for a Spring test context, allowing tests to load test-specific configuration and beans."
        },
        {
          question: "Why should secrets not be committed to Git?",
          answer: "Repository contents can be copied, shared, or retained in history. Exposed credentials can be recovered even after a later commit removes them, so compromised secrets must be rotated or revoked."
        },
        {
          question: "How can development-only beans be prevented from running in production?",
          answer: "Use profile-specific bean registration, such as @Profile(\"dev\"), and verify that production activates the intended profile and provides the required production implementation."
        },
        {
          question: "What is the principle of least privilege?",
          answer: "Each application or user should receive only the permissions needed to perform its required tasks. This limits the damage that can result from compromised credentials."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Spring profiles select environment-specific configuration and beans. Externalized configuration supplies values at deployment time, while a dedicated secrets-management mechanism protects sensitive credentials. Production safety depends on using these mechanisms together with validation, access control, and appropriate operational practices."
      ],
      bullets: [
        "Common profiles include dev, test, staging, and prod.",
        "Shared defaults belong in application.yml.",
        "Profile-specific overrides can be placed in application-dev.yml and application-prod.yml.",
        "Activate profiles with SPRING_PROFILES_ACTIVE or supported command-line configuration.",
        "@Profile controls profile-specific bean registration.",
        "Configuration property sources have defined precedence rules.",
        "Use placeholders such as ${DB_PASSWORD} to reference externally supplied configuration.",
        "Do not commit credentials to source control or bake them into container images.",
        "Use least privilege, protected secret injection, and credential rotation.",
        "@ActiveProfiles helps select a profile in Spring tests.",
        "Profiles do not replace authentication, authorization, network security, or secret management."
      ]
    }
  ]
};
