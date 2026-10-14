
export const externalizedConfiguration = {
  id: "externalized-configuration",
  title: "Externalized Configuration",
  slug: "externalized-configuration",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "55 min",

  description:
    "Understand externalized configuration in Spring Boot, including configuration sources, property precedence, environment variables, command-line arguments, Spring Profiles, database configuration, secret management, and practical deployment examples.",

  sections: [
    {
      id: "what-is-externalized-configuration",
      title: "What is Externalized Configuration?",

      paragraphs: [
        "Externalized configuration means keeping application configuration separate from application business logic and supplying the values through configuration sources outside the code that implements the business behavior.",
        "Applications commonly need configuration such as server ports, database URLs, database usernames, logging levels, API endpoints, and feature settings. These values may differ between development, testing, staging, and production.",
        "Instead of writing environment-specific values directly into Java classes, Spring Boot can load them from application.properties, application.yml, environment variables, Java system properties, command-line arguments, and other supported sources.",
        "For example, CodeForge can connect to a local MySQL database during development and a managed database in production while using the same application JAR.",
        "Externalized configuration does not mean that all configuration must live outside the project. A project can keep safe defaults in its configuration files while allowing deployment-specific values to override them."
      ],

      code: {
        language: "java",
        code: `// Avoid embedding environment-specific configuration in Java.

public class DatabaseSettings {

    // Hardcoded configuration makes deployment less flexible.
    private String url =
        "jdbc:mysql://localhost:3306/codeforge_dev";
}`
      }
    },

    {
      id: "why-externalized-configuration",
      title: "Why Do We Need Externalized Configuration?",

      paragraphs: [
        "Different environments usually require different configuration values. A developer might use a local database, automated tests might use a test database, and production might connect to a managed database.",
        "Without externalized configuration, developers may need to modify source code or rebuild an artifact whenever a configuration value changes. This introduces unnecessary deployment risk.",
        "With externalized configuration, the application artifact can remain unchanged while the deployment environment supplies the appropriate settings.",
        "Externalization also makes configuration management easier. Teams can control who supplies credentials, change logging levels for an environment, and configure network endpoints without changing business logic."
      ],

      code: {
        language: "text",
        code: `                 Same Application JAR
                          |
             +------------+------------+
             |            |            |
             v            v            v
        Development    Testing     Production
        Local DB       Test DB     Managed DB
        Port 8080      Port 8081   Port 8080`
      },

      bullets: [
        "Avoid hardcoding environment-specific settings.",
        "Reuse the same built application across environments.",
        "Change configuration without changing business logic.",
        "Keep sensitive credentials out of source code.",
        "Make deployments easier to automate and maintain."
      ]
    },

    {
      id: "configuration-sources",
      title: "Common Configuration Sources",

      paragraphs: [
        "Spring Boot builds an Environment that exposes properties from multiple configuration sources. The same property may be available from more than one source, and the effective value depends on the applicable property-source precedence.",
        "The following are common configuration sources. Their exact precedence and loading behavior depend on the Spring Boot version and how the application is launched."
      ],

      bullets: [
        "application.properties: key-value configuration.",
        "application.yml or application.yaml: hierarchical YAML configuration.",
        "Profile-specific files such as application-dev.properties and application-prod.yml.",
        "Operating-system environment variables.",
        "Java system properties supplied using -Dproperty=value.",
        "Command-line arguments such as --server.port=8085.",
        "External configuration files loaded through supported configuration locations.",
        "Configuration supplied by containers, service managers, orchestrators, or hosting platforms.",
        "Programmatically added property sources, where applicable."
      ],

      code: {
        language: "text",
        code: `Configuration Sources
        |
        +-- application.properties
        +-- application.yml
        +-- Profile-specific files
        +-- Environment variables
        +-- Java system properties
        +-- Command-line arguments
        +-- External configuration
                    |
                    v
             Spring Environment
                    |
                    v
          Effective Configuration Values`
      }
    },

    {
      id: "application-properties",
      title: "Configuration Using application.properties",

      paragraphs: [
        "application.properties is a standard Spring Boot configuration file. It uses key=value or key:value syntax, with each property normally written on a separate line.",
        "Properties can configure Spring Boot itself or define custom settings that your application reads. The app.name and app.environment properties below are custom properties; Spring Boot does not automatically assign them application-specific behavior.",
        "The file is commonly placed in src/main/resources so it is included on the application classpath. External configuration can override values in the packaged file."
      ],

      code: {
        language: "properties",
        code: `server.port=8080
spring.application.name=codeforge-api

app.name=CodeForge
app.environment=development`
      },

      bullets: [
        "server.port configures the embedded web server port.",
        "spring.application.name defines the application's configured name.",
        "app.name is a custom property.",
        "app.environment is a custom property.",
        "Use external overrides when different environments require different values."
      ]
    },

    {
      id: "environment-variables",
      title: "Configuration Using Environment Variables",

      paragraphs: [
        "Environment variables are values provided to a process by its operating system or deployment environment. They are useful for settings that differ between machines or deployment environments.",
        "Spring Boot supports environment variables both through its property binding conventions and through placeholders in configuration files.",
        "In the following example, DB_URL, DB_USERNAME, and DB_PASSWORD must be supplied by an applicable configuration source. SERVER_PORT has a fallback value of 8080.",
        "Environment variables are not inherently encrypted. Sensitive values still require suitable access restrictions and secret-management practices."
      ],

      code: {
        language: "properties",
        code: `server.port=\${SERVER_PORT:8080}

spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}`
      },

      bullets: [
        "SERVER_PORT supplies the server port when this property is effective.",
        "DB_URL identifies the database connection URL.",
        "DB_USERNAME supplies the database account name.",
        "DB_PASSWORD supplies the database credential.",
        "Missing required placeholders may prevent successful startup."
      ]
    },

    {
      id: "default-values",
      title: "Using Default Values",

      paragraphs: [
        "Spring configuration placeholders support a default value after a colon. For example, ${SERVER_PORT:8080} uses the configured SERVER_PORT value when it can be resolved; otherwise, it falls back to 8080.",
        "Defaults are useful for non-sensitive settings such as a local server port or an application name.",
        "For mandatory production settings, it is often better to fail startup when a value is missing than to silently use an unintended value. Do not provide insecure fallback credentials."
      ],

      code: {
        language: "properties",
        code: `server.port=\${SERVER_PORT:8080}

spring.application.name=\${APP_NAME:codeforge-api}

app.environment=\${APP_ENV:development}`
      },

      bullets: [
        "If SERVER_PORT is unavailable, the configured fallback is 8080.",
        "If APP_NAME is unavailable, the configured fallback is codeforge-api.",
        "If APP_ENV is unavailable, the configured fallback is development.",
        "A default does not automatically activate a Spring profile.",
        "The final value can still be affected by other configuration sources and precedence."
      ]
    },

    {
      id: "command-line",
      title: "Command-Line Arguments",

      paragraphs: [
        "Spring Boot applications can receive configuration through command-line arguments when launched with Spring Boot's standard application startup mechanism.",
        "An argument beginning with two hyphens and a property name can supply a property value. This is useful for changing a setting for one application launch without editing the configuration file.",
        "Command-line arguments commonly have higher precedence than configuration files, environment variables, and Java system properties in standard Spring Boot external configuration. Always consult the documentation for your Spring Boot version and startup arrangement when precedence matters."
      ],

      code: {
        language: "bash",
        code: `java -jar codeforge-api.jar --server.port=8085`
      },

      bullets: [
        "The command-line argument supplies server.port=8085.",
        "The application normally listens on port 8085 if no higher-precedence custom source overrides it.",
        "The packaged JAR does not need to be rebuilt just to change this value.",
        "Avoid passing passwords as command-line arguments because they may be exposed through shell history or process inspection."
      ]
    },

    {
      id: "profile-configuration",
      title: "Profile-Specific Configuration",

      paragraphs: [
        "Spring Profiles let you group configuration and bean definitions for particular environments or runtime modes.",
        "A common naming convention is application-dev.yml for development, application-test.yml for testing, and application-prod.yml for production. These files complement the base application.yml file.",
        "To activate a profile, use a supported mechanism such as SPRING_PROFILES_ACTIVE=prod or the command-line argument --spring.profiles.active=prod.",
        "A custom variable such as APP_ENV=production does not activate the prod profile automatically. Your application or deployment setup must explicitly connect that variable to profile activation if that is the intended behavior.",
        "Profile-specific configuration values generally override corresponding values from the base configuration. Other higher-precedence property sources may still override them."
      ],

      code: {
        language: "text",
        code: `src/main/resources/
    application.yml
    application-dev.yml
    application-test.yml
    application-prod.yml

Activate production profile:
SPRING_PROFILES_ACTIVE=prod`
      }
    },

    {
      id: "database-example",
      title: "Real-World Database Example",

      paragraphs: [
        "Consider a Spring Boot application that uses Spring Data JPA and MySQL. The database connection URL, username, and password can be externalized so that each environment supplies the appropriate values.",
        "The following configuration uses required placeholders for database settings. It assumes that the application includes the MySQL JDBC driver and the necessary Spring Boot database dependencies.",
        "Externalizing the connection details does not create the database, grant database permissions, or establish network connectivity. Those requirements must be handled separately."
      ],

      code: {
        language: "properties",
        code: `spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`
      },

      bullets: [
        "Development can use a local development database.",
        "Testing can use an isolated test database.",
        "Production can use a managed database endpoint.",
        "Use a database account with only the required permissions.",
        "Never log the actual password or commit production credentials."
      ]
    },

    {
      id: "same-application-different-environments",
      title: "Same Application, Different Environments",

      paragraphs: [
        "The application artifact contains the application code and packaged resources. At runtime, the deployment environment provides the values required for that environment.",
        "This approach reduces differences between what was tested and what was deployed. It does not eliminate the need for environment-specific testing, compatible database schemas, correct network access, or secure deployment settings."
      ],

      code: {
        language: "text",
        code: `Development:
DB_URL=jdbc:mysql://localhost:3306/codeforge_dev

Testing:
DB_URL=jdbc:mysql://localhost:3306/codeforge_test

Production:
DB_URL=jdbc:mysql://production-db:3306/codeforge

                  |
                  v
           Same Application JAR
                  |
                  v
       Different Runtime Configuration`
      }
    },

    {
      id: "externalize-secrets",
      title: "Externalizing Sensitive Configuration",

      paragraphs: [
        "Sensitive values such as database passwords, API keys, access tokens, and service credentials should not normally be hardcoded in application source code or committed to source control.",
        "Environment variables can keep secrets out of source files, but they are not a complete secret-management solution. Depending on the platform and permissions, privileged users or diagnostic tools may be able to access them.",
        "For production workloads, consider a secret manager or platform-native secret facility that supports appropriate access control, auditing, and rotation."
      ],

      bullets: [
        "Do not commit production passwords or API keys to Git.",
        "Do not hardcode credentials in Java source code.",
        "Restrict access to deployment configuration and runtime processes.",
        "Avoid logging complete configuration objects if they may contain secrets.",
        "Use separate credentials for development, testing, and production.",
        "Use least-privilege database accounts.",
        "Rotate credentials if they are exposed.",
        "Use an approved secret-management mechanism where appropriate."
      ]
    },

    {
      id: "configuration-flow",
      title: "Externalized Configuration Flow",

      paragraphs: [
        "Spring Boot loads configuration from its supported property sources and exposes the resulting environment through Spring's Environment abstraction.",
        "Components can consume properties through mechanisms such as @Value or @ConfigurationProperties. Spring Boot auto-configuration also reads properties to configure infrastructure such as the embedded web server and datasource.",
        "This is a conceptual overview rather than a complete list of every property source or every stage of configuration processing."
      ],

      code: {
        language: "text",
        code: `Configuration Sources
        |
        +-- application.properties
        +-- application.yml
        +-- Environment Variables
        +-- Java System Properties
        +-- Command-Line Arguments
        +-- Profile-Specific Configuration
                    |
                    v
             Spring Environment
                    |
          +---------+----------+
          |                    |
          v                    v
       @Value          @ConfigurationProperties
          |                    |
          +---------+----------+
                    |
                    v
          Spring-Managed Components
                    |
                    v
             Application Behavior`
      }
    },

    {
      id: "real-world-example",
      title: "Complete Example",

      paragraphs: [
        "The following application.yml combines ordinary application settings with external placeholders. It gives safe defaults for the server port, application name, and custom environment label, while requiring the database connection values.",
        "The placeholders are resolved by Spring's configuration system. The actual values must be supplied through the environment or another applicable configuration source.",
        "This file belongs in src/main/resources/application.yml unless you intentionally configure another location."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: \${SERVER_PORT:8080}

spring:
  application:
    name: \${APP_NAME:codeforge-api}

  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

app:
  environment: \${APP_ENV:development}`
      }
    },

    {
      id: "configuration-precedence",
      title: "Configuration Property Precedence",

      paragraphs: [
        "A Spring Boot application can receive the same property from several sources. If multiple sources define a property, the source with higher precedence determines the effective value.",
        "For example, application.properties may define server.port=8080, while a launch command supplies --server.port=8085. Under standard Spring Boot external configuration, the command-line value normally takes precedence.",
        "The full ordering is more detailed than a simple universal list because Spring Boot supports several configuration sources and special testing or programmatic property sources. The following is a simplified guide to common sources, not an exhaustive precedence specification."
      ],

      code: {
        language: "text",
        code: `Example property: server.port

Packaged application.properties: 8080
Environment variable:            SERVER_PORT=8082
Command-line argument:            --server.port=8085

Effective value in a standard launch:
server.port=8085`
      },

      bullets: [
        "Do not assume that a value in application.properties is always the final value.",
        "Check environment variables and command-line arguments when a setting appears unexpected.",
        "Profile-specific configuration can override corresponding base-file values.",
        "Testing frameworks and programmatically added property sources can introduce additional precedence rules.",
        "Consult the documentation for your exact Spring Boot version when implementing precedence-dependent behavior."
      ]
    },

    {
      id: "advantages",
      title: "Advantages of Externalized Configuration",

      bullets: [
        "The same application artifact can run in different environments.",
        "Configuration can change without modifying business logic.",
        "Environment-specific settings are easier to manage.",
        "Deployment automation becomes more flexible.",
        "Configuration can be supplied by environment variables, command-line arguments, or files.",
        "Profiles help organize environment-specific configuration.",
        "Sensitive values can be kept out of source code when handled appropriately.",
        "Configuration changes can often be made without rebuilding the application."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Externalized configuration separates configuration values from business logic.",
        "Spring Boot supports multiple configuration sources.",
        "application.properties and application.yml are common configuration files.",
        "Environment variables provide runtime values to a process.",
        "Command-line arguments can override many ordinary configuration values.",
        "Spring Profiles organize environment-specific configuration and beans.",
        "A custom APP_ENV variable does not activate a Spring profile automatically.",
        "Placeholder defaults use colon syntax, such as ${SERVER_PORT:8080}.",
        "Required placeholders should be supplied explicitly when no safe default exists.",
        "Environment variables are not inherently encrypted.",
        "The effective value depends on property-source precedence.",
        "Externalized configuration does not replace secure credential management or deployment validation."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is externalized configuration?",
          answer:
            "Externalized configuration means separating application configuration from business logic and supplying values through configuration sources such as property files, environment variables, and command-line arguments."
        },
        {
          question: "2. Why is externalized configuration important?",
          answer:
            "It allows the same application artifact to run with different settings in development, testing, and production without changing the application source code for each environment."
        },
        {
          question: "3. What are common Spring Boot configuration sources?",
          answer:
            "Common sources include application.properties, application.yml, profile-specific files, environment variables, Java system properties, command-line arguments, and supported external configuration files."
        },
        {
          question: "4. What is the difference between application.properties and application.yml?",
          answer:
            "Both provide configuration. application.properties uses key-value entries, while application.yml uses YAML's indentation-based hierarchical structure."
        },
        {
          question: "5. How can environment variables be referenced in Spring Boot configuration?",
          answer:
            "Use placeholders such as spring.datasource.url=${DB_URL}. Spring resolves the placeholder using its available configuration sources."
        },
        {
          question: "6. How do you provide a default configuration value?",
          answer:
            "Use placeholder syntax such as ${SERVER_PORT:8080}. The fallback value is used when the referenced property cannot be resolved."
        },
        {
          question: "7. How do you change the server port through a command-line argument?",
          answer:
            "Start the application with java -jar codeforge-api.jar --server.port=8085. The command-line value normally takes precedence over the ordinary file and environment settings."
        },
        {
          question: "8. What is a Spring Profile?",
          answer:
            "A Spring Profile provides a way to group configuration and beans for a particular runtime environment or mode, such as dev, test, or prod."
        },
        {
          question: "9. How do you activate the prod profile?",
          answer:
            "You can set SPRING_PROFILES_ACTIVE=prod in the process environment or use the command-line argument --spring.profiles.active=prod."
        },
        {
          question: "10. Does APP_ENV=production automatically activate the prod profile?",
          answer:
            "No. APP_ENV is a custom variable unless the application or deployment setup explicitly maps it to profile activation. SPRING_PROFILES_ACTIVE is the conventional Spring Boot property for selecting active profiles."
        },
        {
          question: "11. What is configuration property precedence?",
          answer:
            "It is the ordering used when multiple property sources define the same property. The source with higher precedence supplies the effective value."
        },
        {
          question: "12. Why should database passwords be externalized?",
          answer:
            "Externalizing passwords helps prevent credentials from being hardcoded in source code and committed to version control. Sensitive values must still be protected through suitable access controls and secret-management practices."
        },
        {
          question: "13. Are environment variables completely secure?",
          answer:
            "No. They are not inherently encrypted and may be visible to privileged users or diagnostic tools. A production system may need a secret manager and stricter access controls."
        },
        {
          question: "14. What is the difference between externalized configuration and Spring Profiles?",
          answer:
            "Externalized configuration is the broader approach of supplying settings outside application logic. Spring Profiles are one feature for selecting profile-specific configuration and beans."
        },
        {
          question: "15. Can configuration be changed without rebuilding the application?",
          answer:
            "Yes. Many configuration values can be supplied or overridden when the application starts, so the same JAR can be used with different runtime settings."
        },
        {
          question: "16. What happens if a required placeholder is missing?",
          answer:
            "If Spring cannot resolve a required placeholder, configuration processing may fail and prevent the application from starting. Supply the missing value or provide a suitable default where that is safe."
        },
        {
          question: "17. What is the difference between Java system properties and environment variables?",
          answer:
            "Environment variables are supplied through the process environment. Java system properties are JVM properties commonly passed using options such as -Dserver.port=8085. Spring Boot can use both as configuration sources."
        },
        {
          question: "18. How can you externalize MySQL configuration?",
          answer:
            "Use properties such as spring.datasource.url=${DB_URL}, spring.datasource.username=${DB_USERNAME}, and spring.datasource.password=${DB_PASSWORD}, then supply the corresponding values through the deployment environment or an appropriate secret-management mechanism."
        },
        {
          question: "19. Why might the application use a different value than the one in application.properties?",
          answer:
            "Another property source, such as an environment variable, command-line argument, profile-specific file, test configuration, or programmatically added source, may have higher precedence."
        },
        {
          question: "20. What is the main advantage of externalized configuration in deployment?",
          answer:
            "It separates environment-specific settings from the application artifact, allowing the same built application to be deployed with different configuration values."
        }
      ]
    }
  ]
};
