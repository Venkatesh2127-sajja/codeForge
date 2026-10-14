
export const applicationProperties = {
  id: "application-properties",
  title: "application.properties",
  slug: "application-properties",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "45 min",

  description:
    "Learn how application.properties configures Spring Boot applications, including server settings, MySQL and JPA, custom properties, logging, profiles, environment variables, configuration precedence, security, and troubleshooting.",

  sections: [
    {
      id: "what-is-application-properties",
      title: "1. What Is application.properties?",

      paragraphs: [
        "application.properties is a standard external configuration file used by Spring Boot applications. It allows developers to configure application behavior without hardcoding every setting inside Java classes.",
        "The file is normally placed inside src/main/resources. During startup, Spring Boot loads applicable configuration sources and uses their values to configure supported features such as the embedded web server, datasource, logging, and application-specific settings.",
        "Properties files use key=value syntax. Each property has a name and a value, such as server.port=8081. Property names commonly use dot-separated groups to organize related settings.",
        "Spring Boot supports both application.properties and application.yml. Both formats can express many of the same configuration values, but their syntax differs. Choose one format consistently for a given configuration area to avoid confusion.",
        "The file can contain framework properties and custom properties. Framework properties, such as server.port, are understood by Spring Boot or its integrations. Custom properties, such as app.name, must be read by your application code or a library that understands them."
      ],

      code: {
        language: "text",
        code: `src/
└── main/
    ├── java/
    │   └── com/
    │       └── codeforge/
    │           └── CodeForgeApplication.java
    └── resources/
        └── application.properties`
      },

      bullets: [
        "Location: src/main/resources/application.properties.",
        "Syntax: property.name=value.",
        "Spring Boot loads standard configuration sources during startup.",
        "Properties can configure Spring Boot features and custom application behavior.",
        "Use configuration instead of scattering environment-specific values throughout Java code."
      ]
    },

    {
      id: "properties-syntax",
      title: "2. Properties File Syntax",

      paragraphs: [
        "A properties file usually contains one key-value pair per line. The text before the equals sign is the property key, and the text after it is the value.",
        "Lines beginning with # are comments. Blank lines can be used to make the file easier to read.",
        "Property values are generally represented as text in the file. Spring Boot's configuration binding system can convert supported values into types such as integers, booleans, durations, and lists.",
        "Use consistent naming and grouping. For example, app.max-users is easier to understand than an unclear key such as value1.",
        "Avoid accidental duplicate keys. When the same key is defined multiple times in one properties source, the later definition generally takes precedence within that source, which can make debugging difficult."
      ],

      code: {
        language: "properties",
        code: `# Application information
spring.application.name=codeforge-api

# Server configuration
server.port=8081

# Custom settings
app.name=CodeForge
app.max-users=1000
app.feature-enabled=true`
      },

      bullets: [
        "Use key=value syntax.",
        "Use # for comments.",
        "Keep related properties together.",
        "Avoid duplicate property keys.",
        "Use clear, consistent property names."
      ]
    },

    {
      id: "server-port",
      title: "3. Configure the Server Port",

      paragraphs: [
        "The server.port property configures the HTTP port used by a Spring Boot web application with an embedded web server.",
        "For example, server.port=8081 configures the application to listen on port 8081 instead of the usual default port 8080.",
        "After the application starts successfully, an endpoint such as /api/users can be accessed at http://localhost:8081/api/users when that endpoint exists and no other network or security restriction prevents access.",
        "The configured port must be available. If another process already occupies the port, application startup may fail with a port-binding error.",
        "Setting server.port=0 asks the embedded server to use an available ephemeral port. This can be useful in tests, although the actual assigned port must then be discovered rather than assumed."
      ],

      code: {
        language: "properties",
        code: `server.port=8081`
      },

      bullets: [
        "Default embedded web server port: commonly 8080.",
        "server.port=8081 changes the port to 8081.",
        "The configured port must be available.",
        "Port configuration applies to web applications with a supported embedded server.",
        "server.port=0 requests an available ephemeral port."
      ]
    },

    {
      id: "application-name",
      title: "4. Configure the Application Name",

      paragraphs: [
        "The spring.application.name property assigns a logical name to the application. It can be useful for identifying the application in logs, monitoring systems, and distributed application infrastructure.",
        "The application name does not change the HTTP port, Java package name, or executable JAR filename by itself.",
        "Different services in a distributed system may use different logical names, such as user-service, order-service, and payment-service."
      ],

      code: {
        language: "properties",
        code: `spring.application.name=codeforge-api`
      },

      bullets: [
        "Use a meaningful, stable application name.",
        "Application names can help distinguish services in operational tools.",
        "Changing the logical application name does not automatically configure service discovery or monitoring."
      ]
    },

    {
      id: "database-properties",
      title: "5. Configure a MySQL Database",

      paragraphs: [
        "Spring Boot can configure a datasource from spring.datasource properties when the appropriate JDBC driver and datasource dependencies are available.",
        "The URL identifies the database server, port, and database name. The username and password provide credentials used to establish the connection.",
        "The following example assumes MySQL is running locally on port 3306 and a database named codeforge already exists. The database server must be reachable, and the configured account must have the required permissions.",
        "For Spring Data JPA applications, spring.jpa.hibernate.ddl-auto controls Hibernate schema-management behavior. Values include none, validate, update, create, and create-drop. Their effects differ, and create or create-drop can remove existing schema data.",
        "spring.jpa.show-sql=true makes Hibernate SQL statements visible through its SQL logging mechanism. For more controlled logging, configure the relevant Hibernate logger categories.",
        "For production environments, schema changes are commonly managed with migration tools such as Flyway or Liquibase instead of relying on automatic schema updates."
      ],

      code: {
        language: "properties",
        code: `spring.datasource.url=jdbc:mysql://localhost:3306/codeforge
spring.datasource.username=\${DB_USERNAME:root}
spring.datasource.password=\${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true`
      },

      bullets: [
        "Add the appropriate MySQL JDBC driver and Spring Data JPA dependencies.",
        "Create the codeforge database before connecting unless your database setup creates it separately.",
        "Use environment variables for credentials rather than committing real passwords.",
        "update is convenient during development but is not a complete database migration strategy.",
        "Use validate or none when schema changes are managed externally, according to the deployment strategy.",
        "Avoid create and create-drop in environments where existing data must be preserved."
      ]
    },

    {
      id: "database-property-explanation",
      title: "6. Understand the Database Properties",

      paragraphs: [
        "spring.datasource.url identifies the JDBC connection endpoint. For MySQL, the typical URL begins with jdbc:mysql:// followed by the host, port, and database name.",
        "spring.datasource.username and spring.datasource.password provide the credentials used by the datasource. These values should match an account configured on the database server.",
        "spring.jpa.hibernate.ddl-auto configures Hibernate's schema action when Hibernate is used as the JPA provider. It does not configure the database connection itself.",
        "spring.jpa.show-sql controls whether SQL statements are printed by Hibernate. Enabling SQL output can help during development but may produce a large amount of output.",
        "A connection failure may be caused by an incorrect URL, unavailable database, missing JDBC driver, invalid credentials, network restrictions, or insufficient database permissions. Changing JPA settings will not fix every connection problem."
      ],

      code: {
        language: "properties",
        code: `# JDBC connection
spring.datasource.url=jdbc:mysql://localhost:3306/codeforge

# Database credentials
spring.datasource.username=\${DB_USERNAME:root}
spring.datasource.password=\${DB_PASSWORD}

# Hibernate schema behavior
spring.jpa.hibernate.ddl-auto=validate

# SQL logging
spring.jpa.show-sql=false`
      },

      bullets: [
        "Connection settings identify and authenticate to the database.",
        "Hibernate schema settings control schema handling, not connectivity.",
        "Use validate when the schema should already match the entity mappings.",
        "Keep SQL logging appropriate for the environment.",
        "Never assume that ddl-auto=update replaces a proper database migration process."
      ]
    },

    {
      id: "custom-properties",
      title: "7. Define Custom Application Properties",

      paragraphs: [
        "You can define your own properties for settings that belong to your application rather than to a built-in Spring Boot feature.",
        "For example, CodeForge might need a display name, an application version, a maximum number of users for a feature, or a configurable external API URL.",
        "Spring Boot does not automatically know what app.max-users means. Your application must bind or read the value before it can influence application behavior.",
        "Group related custom settings under a clear prefix such as app, app.email, or app.payment. This keeps configuration organized as the project grows."
      ],

      code: {
        language: "properties",
        code: `app.name=CodeForge
app.version=1.0
app.max-users=1000
app.feature-enabled=true`
      },

      bullets: [
        "Custom property names are chosen by the application developer.",
        "Use meaningful prefixes to group related settings.",
        "Define values in configuration, then read them from Java code.",
        "A property has no business effect unless some component uses it."
      ]
    },

    {
      id: "value-annotation",
      title: "8. Read Properties Using @Value",

      paragraphs: [
        "The @Value annotation injects a property value into a Spring-managed bean. It is useful for reading a small number of individual settings.",
        "The expression \${app.name} refers to the app.name property. If the property cannot be resolved and no default is provided, application context creation can fail.",
        "A default value can be provided using the colon syntax inside the placeholder, such as \${app.version:1.0}. The default is used when the property is not otherwise resolved.",
        "@Value supports type conversion for common target types, including String, integer, and boolean values. Conversion errors can occur if the configured value is not compatible with the target type.",
        "The class using @Value must itself be managed by Spring for normal annotation-based injection to occur."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppInfo {

    @Value("\${app.name:CodeForge}")
    private String appName;

    @Value("\${app.max-users:1000}")
    private int maxUsers;

    public void printInfo() {
        System.out.println("App: " + appName);
        System.out.println("Maximum users: " + maxUsers);
    }
}`
      },

      bullets: [
        "@Value is useful for a small number of individual properties.",
        "Use \${property.name} to refer to a property.",
        "Use \${property.name:defaultValue} to provide a fallback.",
        "The target object must be Spring-managed for standard injection.",
        "Prefer type-safe grouped configuration when many related settings are needed."
      ]
    },

    {
      id: "configuration-properties",
      title: "9. Use @ConfigurationProperties",

      paragraphs: [
        "@ConfigurationProperties binds a group of external properties to a Java object. It is often a better choice than many separate @Value annotations when an application has several related settings.",
        "In the example, properties with the app prefix are bound to the fields of AppProperties. Spring Boot's configuration binder supports relaxed binding, so names such as app.max-users can bind to a Java field named maxUsers.",
        "The class must be registered for configuration-properties binding, for example through @ConfigurationPropertiesScan or @EnableConfigurationProperties.",
        "Configuration-properties classes can also use validation annotations when validation support is configured. This helps detect invalid configuration during startup rather than allowing incorrect values to cause unexpected behavior later.",
        "For more structured projects, use immutable configuration objects where practical and define sensible validation rules for required settings."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name = "CodeForge";
    private String version = "1.0";
    private int maxUsers = 1000;
    private boolean featureEnabled = true;

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

    public boolean isFeatureEnabled() {
        return featureEnabled;
    }

    public void setFeatureEnabled(boolean featureEnabled) {
        this.featureEnabled = featureEnabled;
    }
}`
      },

      bullets: [
        "Use @ConfigurationProperties for related groups of settings.",
        "Register the properties class using @ConfigurationPropertiesScan or @EnableConfigurationProperties.",
        "The prefix organizes and scopes the configuration.",
        "Relaxed binding maps names such as max-users to maxUsers.",
        "Validation can detect missing or invalid settings during startup."
      ]
    },

    {
      id: "configuration-properties-usage",
      title: "10. Register and Use Custom Configuration",

      paragraphs: [
        "For Spring Boot to bind the AppProperties class from the previous example, register configuration-properties scanning or explicitly enable that properties class.",
        "The following application class uses @ConfigurationPropertiesScan. By default, scanning starts from the package containing the application class and includes its subpackages.",
        "A service can then receive AppProperties through constructor injection. This keeps the configuration values centralized and makes the dependency explicit.",
        "The application class and AppProperties should be placed in packages covered by the configuration-properties scan, or the properties class should be registered explicitly."
      ],

      code: {
        language: "java",
        code: `package com.codeforge;

import com.codeforge.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ConfigurationPropertiesScan
public class CodeForgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeForgeApplication.class, args);
    }

    @Bean
    CommandLineRunner showConfiguration(AppProperties properties) {
        return args -> {
            System.out.println("App: " + properties.getName());
            System.out.println(
                "Maximum users: " + properties.getMaxUsers()
            );
        };
    }
}`
      },

      bullets: [
        "Use @ConfigurationPropertiesScan to discover configuration-properties classes.",
        "Alternatively, use @EnableConfigurationProperties(AppProperties.class).",
        "Inject the resulting properties bean through a constructor or a bean method parameter.",
        "Do not add both registration mechanisms unnecessarily for the same purpose.",
        "Keep configuration objects focused on settings rather than business operations."
      ]
    },

    {
      id: "logging-properties",
      title: "11. Configure Logging",

      paragraphs: [
        "Logging properties control which log messages are emitted at different severity levels. They help developers investigate errors and understand application behavior.",
        "logging.level.root sets the default logging level for the root logger. A package-specific setting such as logging.level.com.codeforge can override the root level for that package and its descendants.",
        "Common levels include TRACE, DEBUG, INFO, WARN, and ERROR. DEBUG is useful for detailed development diagnostics, while INFO is often a reasonable baseline for general application operation.",
        "Enabling DEBUG or TRACE across a large application can create substantial output. Avoid logging passwords, access tokens, or other sensitive information even when debugging.",
        "Spring Boot's logging configuration also supports options for log file names and rotation depending on the logging system and available properties."
      ],

      code: {
        language: "properties",
        code: `logging.level.root=INFO
logging.level.com.codeforge=DEBUG

# Optional file output
logging.file.name=logs/codeforge.log`
      },

      bullets: [
        "TRACE: very detailed diagnostic output.",
        "DEBUG: detailed information useful during development.",
        "INFO: general application events.",
        "WARN: potentially problematic conditions.",
        "ERROR: failures that need attention.",
        "Avoid logging secrets or sensitive personal data."
      ]
    },

    {
      id: "profiles",
      title: "12. Environment-Specific Configuration with Profiles",

      paragraphs: [
        "Different environments often require different configuration. Development may use a local database, testing may use a test database, and production may use a managed database with externally supplied credentials.",
        "Spring profiles let you activate environment-specific configuration. A profile-specific file commonly follows the name application-{profile}.properties.",
        "For example, application-dev.properties can contain development settings, while application-prod.properties can contain production-specific non-secret settings.",
        "A profile can be activated with spring.profiles.active=dev in a base configuration file, through an environment variable, or through a command-line argument. Do not put spring.profiles.active inside a profile-specific file to activate that same profile.",
        "Profile-specific files supplement the base configuration. Property values from higher-precedence sources can override values from lower-precedence sources, so the final effective configuration may differ from the value written in application.properties."
      ],

      code: {
        language: "properties",
        code: `# application.properties
spring.application.name=codeforge-api
server.port=8080

# Activate the development profile when desired
spring.profiles.active=dev

# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/codeforge_dev

# application-prod.properties
spring.datasource.url=\${DB_URL}`
      },

      bullets: [
        "application.properties: base configuration.",
        "application-dev.properties: development-specific configuration.",
        "application-test.properties: test-specific configuration.",
        "application-prod.properties: production-specific configuration.",
        "Activate profiles through supported configuration, environment variables, or command-line options.",
        "Do not commit production secrets to profile-specific files."
      ]
    },

    {
      id: "environment-variables",
      title: "13. Use Environment Variables",

      paragraphs: [
        "Environment variables allow deployment environments to supply configuration without embedding environment-specific values directly in the application artifact.",
        "Spring Boot supports environment-variable configuration for its properties. For example, SERVER_PORT can configure server.port, and SPRING_DATASOURCE_URL can configure spring.datasource.url.",
        "Custom configuration can also reference environment variables using placeholders. The syntax \${DB_PASSWORD} requires the variable to be available, while \${DB_USERNAME:root} provides root as a fallback when DB_USERNAME is not set.",
        "Fallbacks should be chosen carefully. A default username may be convenient locally, but a missing production secret should usually cause a clear failure rather than silently using an unsafe credential.",
        "Environment variables are not the only option for secrets. Managed secret stores and deployment-platform secret facilities can provide stronger operational controls."
      ],

      code: {
        language: "properties",
        code: `server.port=\${SERVER_PORT:8080}

spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}`
      },

      bullets: [
        "Environment variables help separate deployment configuration from application code.",
        "SERVER_PORT can map to server.port.",
        "DB_URL, DB_USERNAME, and DB_PASSWORD are custom variable names in this example.",
        "Required placeholders without defaults need to be supplied.",
        "Do not print secret values in logs or expose them through public endpoints."
      ]
    },

    {
      id: "configuration-precedence",
      title: "14. Configuration Property Precedence",

      paragraphs: [
        "A Spring Boot application can receive configuration from multiple sources, including packaged application.properties files, profile-specific files, environment variables, Java system properties, command-line arguments, and other supported property sources.",
        "When the same property is defined in more than one source, Spring Boot uses a defined precedence order to determine the effective value. Higher-precedence sources override lower-precedence sources.",
        "For example, application.properties may set server.port=8080, while an environment variable or command-line argument supplies another port. The higher-precedence value is used.",
        "The exact precedence depends on the property sources involved and the Spring Boot version and configuration mechanism. When debugging, inspect the active profiles and effective property sources rather than assuming the value in one file must win.",
        "External configuration is useful because the same application artifact can be deployed to different environments without rebuilding it for every environment."
      ],

      code: {
        language: "text",
        code: `application.properties
        |
        | default configuration
        v
Environment-specific configuration
        |
        | may override lower-precedence values
        v
Environment variables / system properties
        |
        | higher-precedence sources may override
        v
Command-line arguments
        |
        v
Effective configuration depends on
Spring Boot property-source precedence`
      },

      bullets: [
        "Configuration can come from multiple property sources.",
        "Higher-precedence property sources can override lower-precedence ones.",
        "Command-line arguments commonly have higher precedence than packaged application configuration.",
        "Environment variables are commonly used to configure deployed applications.",
        "Inspect active profiles and effective property sources when troubleshooting unexpected values."
      ]
    },

    {
      id: "security-best-practices",
      title: "15. Configuration Security Best Practices",

      paragraphs: [
        "Configuration files often contain operational details, including database URLs, usernames, service endpoints, and feature settings. Passwords, API keys, private keys, and access tokens are especially sensitive.",
        "Do not commit real production secrets to a public or shared Git repository. Once a secret has been committed, removing it from the latest file does not necessarily remove it from the repository history.",
        "Use environment variables, deployment-platform secrets, or a managed secret store to supply sensitive values. Restrict access to those secrets and rotate them when exposure is suspected.",
        "Avoid exposing configuration through an unauthenticated API or dumping the entire application environment into logs. Diagnostic endpoints should be secured and configured to avoid leaking sensitive values.",
        "Use least-privilege database accounts. An application account should have only the permissions needed for its responsibilities rather than broad administrative access.",
        "Separate safe defaults from security-critical configuration. If a production password or required URL is missing, failing clearly during startup is often safer than silently choosing an insecure fallback."
      ],

      bullets: [
        "Never commit real passwords, API keys, or tokens.",
        "Use deployment-managed secrets or a managed secret store.",
        "Restrict access to configuration and secret-management systems.",
        "Use least-privilege database credentials.",
        "Do not expose sensitive configuration in logs or public endpoints.",
        "Rotate exposed credentials and review repository history when a secret leaks."
      ]
    },

    {
      id: "troubleshooting-properties",
      title: "16. Common Configuration Problems",

      paragraphs: [
        "If server.port does not appear to take effect, check whether another property source overrides it, whether the application is using an embedded web server, and whether you are inspecting the correct running instance.",
        "If a custom property cannot be resolved, verify its spelling, active profile, source file, and whether the value is required. Check placeholder syntax and provide a default only when a safe default makes sense.",
        "If @ConfigurationProperties values are not being bound, verify that the class is registered through configuration-properties scanning or explicit enablement, that its prefix matches the file, and that its fields or constructor binding are configured correctly.",
        "If the datasource fails to connect, check the JDBC URL, database availability, driver dependency, credentials, permissions, and network access. The database must normally exist before the application connects unless it is created by another setup step.",
        "If a property seems to have the wrong value, inspect the active profiles and all relevant property sources. Environment variables, system properties, command-line arguments, and profile-specific files can override values that look correct in the base file.",
        "Be careful when using spring.jpa.hibernate.ddl-auto. A successful application startup does not prove that schema changes are safe, and schema-generation settings can have destructive consequences."
      ],

      bullets: [
        "Check property spelling and exact names.",
        "Check whether the expected configuration file is in the correct location.",
        "Check active profiles and property-source precedence.",
        "Check bean registration when using @Value or @ConfigurationProperties.",
        "Check database connectivity independently of JPA schema settings.",
        "Read the root cause in the startup exception rather than changing unrelated settings."
      ]
    },

    {
      id: "important-points",
      title: "17. Important Points and Quick Revision",

      paragraphs: [
        "application.properties is a standard Spring Boot configuration file normally stored in src/main/resources. It uses key=value syntax and can contain both framework settings and custom application properties.",
        "Use server.port to configure the embedded web server, spring.datasource properties for database connectivity, spring.jpa properties for JPA-related behavior, and logging.level properties to configure log verbosity.",
        "Use @Value for a small number of settings and @ConfigurationProperties for grouped, type-safe configuration. Use profiles to separate environment-specific settings and external configuration sources to avoid rebuilding the application for each environment.",
        "Keep secrets out of source control. Understand configuration precedence, validate important settings, and use a controlled database migration strategy in production."
      ],

      bullets: [
        "File location: src/main/resources/application.properties.",
        "Syntax: key=value.",
        "Server port: server.port=8081.",
        "Application name: spring.application.name=codeforge-api.",
        "Database URL: spring.datasource.url.",
        "Database schema behavior: spring.jpa.hibernate.ddl-auto.",
        "SQL logging: spring.jpa.show-sql.",
        "Logging level: logging.level.com.codeforge=DEBUG.",
        "Read one property: @Value.",
        "Bind a property group: @ConfigurationProperties.",
        "Profile file: application-dev.properties.",
        "External configuration: environment variables and other supported property sources.",
        "Security: externalize production secrets and never commit real credentials."
      ]
    },

    {
      id: "interview",
      title: "18. application.properties Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is application.properties?",
          answer: "It is a standard Spring Boot configuration file used to define application settings and configure supported framework features."
        },
        {
          question: "2. Where is application.properties normally located?",
          answer: "It is normally placed under src/main/resources so it is available on the application's runtime classpath."
        },
        {
          question: "3. What syntax does a properties file use?",
          answer: "It generally uses key=value syntax, with one property per line. Lines beginning with # can be used for comments."
        },
        {
          question: "4. How do you change the default HTTP port?",
          answer: "Set server.port to the required port, such as server.port=8081."
        },
        {
          question: "5. What is spring.application.name?",
          answer: "It assigns a logical name to the application, which can help identify it in logs and operational infrastructure."
        },
        {
          question: "6. How do you configure a MySQL datasource?",
          answer: "Configure properties such as spring.datasource.url, spring.datasource.username, and spring.datasource.password, and include the required JDBC driver and datasource dependencies."
        },
        {
          question: "7. What is spring.jpa.hibernate.ddl-auto?",
          answer: "It configures Hibernate's schema-management behavior. Common values include none, validate, update, create, and create-drop. Destructive options must be used carefully."
        },
        {
          question: "8. What is spring.jpa.show-sql?",
          answer: "It controls whether Hibernate SQL statements are printed through its SQL output mechanism. It is useful for development diagnostics but can produce noisy output."
        },
        {
          question: "9. Can we define custom properties?",
          answer: "Yes. You can define custom keys such as app.name and read them with @Value or bind a group using @ConfigurationProperties."
        },
        {
          question: "10. What is @Value?",
          answer: "@Value injects a property value or supported expression into a Spring-managed object. It is useful for reading a small number of individual settings."
        },
        {
          question: "11. What is @ConfigurationProperties?",
          answer: "It binds a group of related configuration properties to a Java object, providing a structured and type-safe way to manage configuration."
        },
        {
          question: "12. What is the difference between @Value and @ConfigurationProperties?",
          answer: "@Value is convenient for individual values. @ConfigurationProperties is usually better for grouped settings because it centralizes related fields and supports structured binding and validation."
        },
        {
          question: "13. How do you configure logging levels?",
          answer: "Use properties such as logging.level.root=INFO and logging.level.com.codeforge=DEBUG to set root and package-specific logging levels."
        },
        {
          question: "14. What are Spring profiles?",
          answer: "Profiles allow environment-specific configuration and bean registration. For example, application-dev.properties can provide development settings while application-prod.properties provides production-specific settings."
        },
        {
          question: "15. How do you activate a profile?",
          answer: "You can activate a profile using spring.profiles.active, an environment variable such as SPRING_PROFILES_ACTIVE, or a supported command-line option."
        },
        {
          question: "16. What is the purpose of environment variables in configuration?",
          answer: "They let a deployment environment provide settings such as ports, database URLs, and credentials without embedding environment-specific values directly in the application artifact."
        },
        {
          question: "17. What happens when the same property is defined in multiple sources?",
          answer: "Spring Boot applies its property-source precedence rules. A value from a higher-precedence source overrides a lower-precedence value for the same property."
        },
        {
          question: "18. Should database passwords be hardcoded in application.properties?",
          answer: "Real production passwords should generally be supplied through deployment-managed secrets, environment variables, or a secret-management system rather than committed to source control."
        },
        {
          question: "19. What is the difference between application.properties and application.yml?",
          answer: "Both can configure Spring Boot. Properties files use key=value syntax, while YAML uses indentation and nested mappings. Choose a consistent format and avoid ambiguous duplicate configuration."
        },
        {
          question: "20. Why might a custom property fail to resolve?",
          answer: "The key may be misspelled, the source file may not be loaded, the active profile may be different, the property may be missing, or a placeholder may be incorrectly written."
        },
        {
          question: "21. How can you troubleshoot a datasource connection failure?",
          answer: "Check the JDBC URL, database availability, driver dependency, credentials, database permissions, and network access. Also inspect the root cause in the startup exception."
        },
        {
          question: "22. Is ddl-auto=update recommended for every production application?",
          answer: "No. It can be convenient during development, but production schema changes are commonly controlled through migration tools such as Flyway or Liquibase and reviewed deployment procedures."
        },
        {
          question: "23. Does defining a custom property automatically change application behavior?",
          answer: "No. A custom property must be read or bound by application code or a library that understands the property before it affects behavior."
        },
        {
          question: "24. Why is external configuration useful?",
          answer: "It allows the same application artifact to run in different environments with different ports, database endpoints, feature settings, and credentials without rebuilding the application."
        }
      ]
    }
  ]
};
