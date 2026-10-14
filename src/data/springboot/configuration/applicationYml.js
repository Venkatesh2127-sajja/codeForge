
export const applicationYml = {
  id: "application-yml",
  title: "application.yml",
  slug: "application-yml",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "45 min",

  description:
    "Learn Spring Boot YAML configuration from basics to advanced usage, including server settings, database configuration, nested properties, lists, profiles, environment variables, type-safe configuration, security practices, troubleshooting, and interview questions.",

  sections: [
    {
      id: "what-is-yaml",
      title: "1. What is application.yml?",

      paragraphs: [
        "application.yml is a standard configuration file supported by Spring Boot. It allows developers to configure application behavior without hardcoding environment-specific values in Java classes.",
        "The file is normally placed inside src/main/resources. During application startup, Spring Boot loads configuration values and makes them available to the application through its Environment and configuration binding mechanisms.",
        "YAML stands for YAML Ain't Markup Language. It represents structured data using indentation, key-value pairs, nested objects, and lists.",
        "For example, instead of writing spring.application.name=codeforge-api, YAML represents the same setting using nested indentation. This can make large groups of related configuration properties easier to read.",
        "The file extension is .yml or .yaml. Spring Boot supports both YAML and Java properties configuration formats."
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
        └── application.yml`
      }
    },

    {
      id: "why-configuration-files",
      title: "2. Why Do We Need Configuration Files?",

      paragraphs: [
        "Configuration files separate application settings from business logic. Instead of modifying Java code whenever the server port, database URL, or logging level changes, developers can update configuration.",
        "The same application may run on a developer's computer, a testing server, and a production server. Each environment can use different configuration values while sharing the same application code.",
        "Spring Boot configuration can control server behavior, database connections, JPA and Hibernate settings, logging, application-specific values, active profiles, and integrations with external services."
      ],

      code: {
        language: "java",
        code: `// Avoid hardcoding environment-specific settings in Java.
public class ApplicationSettings {
    private String databaseUrl =
        "jdbc:mysql://localhost:3306/codeforge";
}`
      },

      bullets: [
        "Centralizes application settings.",
        "Makes environment-specific configuration easier.",
        "Reduces hardcoded values in business logic.",
        "Supports externalized configuration.",
        "Makes applications easier to deploy and maintain.",
        "Helps separate development, testing, and production settings."
      ]
    },

    {
      id: "basic-configuration",
      title: "3. Basic YAML Configuration",

      paragraphs: [
        "YAML stores values as key-value pairs. A colon separates a key from its value, and indentation indicates a nested relationship.",
        "In the following example, server is the parent key and port is its child property. Similarly, spring contains application, which contains name.",
        "Spring Boot uses server.port to determine the embedded web server's listening port. The application name can be used by logs, monitoring tools, and other infrastructure that reads the configured application name."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: 8081

spring:
  application:
    name: codeforge-api`
      },

      bullets: [
        "server.port: configures the embedded server port.",
        "spring.application.name: configures the application's name.",
        "Indentation represents the hierarchy.",
        "Use spaces rather than tabs for indentation.",
        "Keep related settings grouped under their parent keys."
      ]
    },

    {
      id: "server-configuration",
      title: "4. Configuring the Spring Boot Server",

      paragraphs: [
        "Spring Boot web applications commonly use an embedded server such as Tomcat. The server.port property configures the HTTP port on which the application listens.",
        "If server.port is set to 8081, a local application is normally accessed through http://localhost:8081, assuming the server starts successfully and no other network restrictions apply.",
        "Port 8080 is a common default for Spring Boot web applications. Changing server.port is useful when running multiple local services or avoiding a port conflict.",
        "Setting server.port to 0 asks the server to choose an available port. This is useful in some automated integration tests, where the actual port can be discovered after startup."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: 8081`
      },

      bullets: [
        "Use server.port for the HTTP listening port.",
        "A port conflict can prevent the application from starting.",
        "Changing the port does not automatically configure a reverse proxy or firewall.",
        "For a web application, verify the configured port in the startup logs."
      ]
    },

    {
      id: "database-configuration",
      title: "5. Database Configuration with YAML",

      paragraphs: [
        "Spring Boot uses spring.datasource properties to configure a JDBC DataSource. These properties commonly include the JDBC URL, database username, and database password.",
        "For a Spring Data JPA application, spring.jpa properties configure JPA and Hibernate behavior. The database must exist, the appropriate JDBC driver must be available, and the supplied credentials must have the required permissions.",
        "The following example assumes a MySQL database named codeforge already exists. The environment variables DB_USERNAME and DB_PASSWORD supply the credentials, so secrets do not need to be written directly into the YAML file.",
        "The syntax ${DB_USERNAME:root} means Spring resolves DB_USERNAME from the available configuration sources and uses root as a fallback if that variable is not set. The ${DB_PASSWORD} expression has no fallback, so the password must be supplied through configuration.",
        "The setting spring.jpa.hibernate.ddl-auto: update asks Hibernate to update database schema structures based on entity mappings. It can be convenient for local development, but production schema changes should normally be managed with migration tools such as Flyway or Liquibase."
      ],

      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true`
      },

      bullets: [
        "spring.datasource.url: database connection URL.",
        "spring.datasource.username: database login username.",
        "spring.datasource.password: database login password.",
        "spring.jpa.hibernate.ddl-auto: Hibernate schema-management behavior.",
        "spring.jpa.show-sql: enables SQL statement logging through Hibernate.",
        "Add the MySQL JDBC driver dependency to the project.",
        "Do not commit real database passwords to source control."
      ]
    },

    {
      id: "database-property-explanation",
      title: "6. Understanding Database Properties",

      paragraphs: [
        "The datasource URL identifies the database server, port, and database name. In jdbc:mysql://localhost:3306/codeforge, localhost is the database host, 3306 is the usual MySQL port, and codeforge is the database name.",
        "The username and password are used to authenticate with the database. Authentication can succeed while authorization still fails if the account lacks permission to access the required schema or tables.",
        "The driver-class-name identifies the JDBC driver. Spring Boot can often infer it from the JDBC URL and the driver dependency, so this property is frequently optional.",
        "The show-sql property is useful while learning or debugging but can produce large amounts of output. Production logging should be configured deliberately to avoid unnecessary noise or accidental exposure of sensitive data."
      ],

      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false`
      },

      bullets: [
        "Use validate when Hibernate should validate the schema without changing it.",
        "Use none when Hibernate schema management is not required.",
        "Use a migration tool to apply controlled schema changes in production.",
        "Ensure the database is reachable before troubleshooting JPA mappings.",
        "Never assume that a successful application build proves the database connection works."
      ]
    },

    {
      id: "nested-properties",
      title: "7. Nested Configuration Properties",

      paragraphs: [
        "Nested configuration groups related values under a common parent. This is especially useful when an application has its own settings that do not belong to standard Spring Boot properties.",
        "For example, CodeForge can define its product name, version, security flag, and user limits under an app configuration prefix.",
        "These are custom properties. Spring Boot does not automatically implement business behavior merely because a custom key exists. Your application must read the values and use them appropriately."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge
  version: "1.0"
  security:
    enabled: true
  limits:
    max-users: 1000`
      },

      bullets: [
        "app is the top-level configuration prefix.",
        "app.security.enabled represents a nested Boolean property.",
        "app.limits.max-users represents a nested numeric property.",
        "Quote version values when they should be treated explicitly as strings.",
        "Choose clear and consistent names for custom configuration."
      ]
    },

    {
      id: "lists",
      title: "8. Lists and Collections in YAML",

      paragraphs: [
        "YAML represents a list using a hyphen followed by a space for each item. Lists are useful for supported languages, allowed origins, service endpoints, and other collections of values.",
        "A list is different from a nested object. A list contains multiple items, while a nested object groups values under named keys.",
        "When binding a YAML list into Java, the Java field should use a suitable collection type such as List<String> or List<URI>, depending on the data."
      ],

      code: {
        language: "yaml",
        code: `app:
  supported-languages:
    - Java
    - JavaScript
    - Python
    - SQL`
      },

      bullets: [
        "Each hyphen introduces a list item.",
        "Keep all list items aligned at the same indentation level.",
        "Use a Java collection when binding multiple values.",
        "Do not confuse a YAML list with an object containing named properties."
      ]
    },

    {
      id: "yaml-rules",
      title: "9. Important YAML Syntax Rules",

      paragraphs: [
        "YAML indentation is structural, not merely decorative. A property indented under another key becomes its child, while a property aligned with it becomes a sibling.",
        "A misplaced space can change the configuration hierarchy or make the file invalid. Use a consistent indentation style, commonly two spaces per level, and never use tabs for indentation.",
        "YAML values can represent strings, numbers, Booleans, lists, and nested objects. Quote values when necessary to avoid ambiguity, especially when the value is intended to be a string.",
        "A colon followed by a space separates a mapping key from its value. A colon inside a string, such as a URL, is usually fine when the value is written as a scalar after the key separator."
      ],

      code: {
        language: "yaml",
        code: `# Correct indentation
server:
  port: 8081

# Nested custom configuration
app:
  security:
    enabled: true

# List
app-languages:
  - Java
  - SQL`
      },

      bullets: [
        "Use spaces, not tabs, for indentation.",
        "Align sibling keys at the same level.",
        "Use key: value syntax for mappings.",
        "Use hyphens for list items.",
        "Quote strings when their meaning could be ambiguous.",
        "Avoid duplicating the same key within a mapping.",
        "Check indentation carefully when a configuration value is not being applied.",
        "Comments begin with # when the character is used as a comment marker outside a quoted value."
      ]
    },

    {
      id: "properties-equivalent",
      title: "10. application.yml vs application.properties",

      paragraphs: [
        "Spring Boot supports both application.yml and application.properties. Both formats can configure the same Spring Boot property names, so choosing YAML does not change the underlying meaning of a property.",
        "The main difference is representation. Properties files commonly use dotted keys, while YAML expresses the hierarchy through indentation.",
        "YAML can be convenient for nested objects and lists. Properties files can be convenient for flat configuration and simple key-value settings.",
        "Avoid defining the same setting in multiple files without understanding configuration precedence. Keeping one clear source for each setting makes troubleshooting easier."
      ],

      code: {
        language: "text",
        code: `application.properties:

server.port=8081
spring.application.name=codeforge-api


application.yml:

server:
  port: 8081

spring:
  application:
    name: codeforge-api`
      },

      bullets: [
        "Both formats are supported by Spring Boot.",
        "YAML uses indentation to express nesting.",
        "Properties files commonly use dotted keys.",
        "Choose a consistent format for your project.",
        "Configuration precedence determines the effective value when multiple sources define a property."
      ]
    },

    {
      id: "reading-yaml-with-value",
      title: "11. Reading YAML Values with @Value",

      paragraphs: [
        "Spring's @Value annotation injects a configured value into a Spring-managed bean. It can read standard Spring Boot properties as well as custom properties.",
        "The example below reads app.name from application.yml. The class must be registered as a Spring bean, for example by placing @Component on it within the component-scanning package.",
        "For a small number of independent settings, @Value is straightforward. For a group of related properties, @ConfigurationProperties is usually easier to maintain and test."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge`
      }
    },

    {
      id: "value-java-example",
      title: "12. Java Example Using @Value",

      paragraphs: [
        "Spring resolves the placeholder ${app.name} using the Environment and injects the value when it creates the bean.",
        "The following class demonstrates a single custom configuration value. It assumes the class is located within the package scanned by the Spring Boot application."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppNameProvider {

    private final String appName;

    public AppNameProvider(
            @Value("\${app.name}") String appName) {
        this.appName = appName;
    }

    public String getAppName() {
        return appName;
    }
}`
      },

      bullets: [
        "@Value reads one configured property at a time.",
        "Constructor injection makes the required value explicit.",
        "If a required property is missing, the application can fail during startup.",
        "A default can be supplied with placeholder syntax such as ${app.name:CodeForge}."
      ]
    },

    {
      id: "configuration-properties",
      title: "13. Using @ConfigurationProperties",

      paragraphs: [
        "@ConfigurationProperties binds a group of configuration properties to a Java class. It is useful when an application has multiple related settings with the same prefix.",
        "For example, properties under app can be bound to an AppProperties class. The class can contain fields for the application name, version, security settings, and user limits.",
        "This approach is more structured than adding many @Value annotations throughout the application. It also supports type conversion and can work with Spring Boot's configuration metadata and validation features.",
        "The following example uses mutable JavaBean-style properties for clarity. The class has getters and setters so Spring Boot can bind the values. The application must enable configuration-properties scanning or register the class using @EnableConfigurationProperties."
      ],

      code: {
        language: "yaml",
        code: `app:
  name: CodeForge
  version: "1.0"
  security:
    enabled: true
  limits:
    max-users: 1000`
      }
    },

    {
      id: "configuration-properties-java",
      title: "14. Complete @ConfigurationProperties Example",

      paragraphs: [
        "The Java class below maps the YAML hierarchy to typed fields. Spring Boot's relaxed binding can map names such as max-users to a Java property named maxUsers.",
        "The example assumes a Spring Boot application class in package com.codeforge and an AppProperties class in com.codeforge.config. The application class enables configuration-properties scanning, so the properties class is registered."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private Security security = new Security();
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

    public Security getSecurity() {
        return security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public Limits getLimits() {
        return limits;
    }

    public void setLimits(Limits limits) {
        this.limits = limits;
    }

    public static class Security {
        private boolean enabled;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }
    }

    public static class Limits {
        private int maxUsers;

        public int getMaxUsers() {
            return maxUsers;
        }

        public void setMaxUsers(int maxUsers) {
            this.maxUsers = maxUsers;
        }
    }
}`
      },

      bullets: [
        "Use @ConfigurationProperties(prefix = \"app\") to define the binding prefix.",
        "Nested Java objects represent nested YAML properties.",
        "String, int, and boolean fields provide type-safe access.",
        "Use @ConfigurationPropertiesScan on the application class or register the class with @EnableConfigurationProperties.",
        "For stronger validation, add Jakarta Bean Validation constraints and enable validation for the configuration-properties class."
      ]
    },

    {
      id: "configuration-properties-usage",
      title: "15. Using Configuration Properties in a Service",

      paragraphs: [
        "Once registered, AppProperties can be injected into another Spring-managed bean using constructor injection.",
        "This example shows how a service reads the configured application name and user limit. The service can then use those values in application logic rather than hardcoding them."
      ],

      code: {
        language: "java",
        code: `package com.codeforge;

import com.codeforge.config.AppProperties;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    private final AppProperties properties;

    public AppInfoService(AppProperties properties) {
        this.properties = properties;
    }

    public String getApplicationName() {
        return properties.getName();
    }

    public int getMaximumUsers() {
        return properties.getLimits().getMaxUsers();
    }
}`
      },

      bullets: [
        "Configuration classes centralize related settings.",
        "Constructor injection makes the dependency explicit.",
        "The values come from configuration rather than hardcoded service constants.",
        "The AppProperties class must be registered with Spring for injection to work."
      ]
    },

    {
      id: "profiles",
      title: "16. Environment-Specific YAML Profiles",

      paragraphs: [
        "Spring profiles allow an application to use different settings for different environments, such as development, testing, and production.",
        "A common approach is to keep shared defaults in application.yml and environment-specific overrides in application-dev.yml or application-prod.yml.",
        "When the dev profile is active, Spring Boot loads the base configuration and applies the relevant profile-specific configuration. If the same property appears in both, the profile-specific value normally overrides the base-file value.",
        "Activate a profile using the spring.profiles.active property or an external configuration source such as an environment variable or command-line argument. Avoid hardcoding production profile activation in a configuration file intended to be shared by every environment."
      ],

      code: {
        language: "yaml",
        code: `# application.yml
spring:
  application:
    name: codeforge-api

server:
  port: 8080

---
# application-dev.yml
server:
  port: 8081

logging:
  level:
    com.codeforge: DEBUG`
      },

      bullets: [
        "application.yml stores shared configuration.",
        "application-dev.yml contains development-specific settings.",
        "application-prod.yml can contain production-specific settings.",
        "Activate a profile with spring.profiles.active=dev or an equivalent external setting.",
        "Use YAML document separators only when intentionally placing multiple documents in one YAML file.",
        "Profile-specific files are often easier to manage when each environment has its own file."
      ]
    },

    {
      id: "environment-variables",
      title: "17. Using Environment Variables",

      paragraphs: [
        "Environment variables allow deployment environments to provide settings without putting machine-specific values or secrets directly in the source code.",
        "Spring Boot supports environment variables as a configuration source. For example, SERVER_PORT can configure server.port, and SPRING_PROFILES_ACTIVE can configure the active profile.",
        "Custom placeholders can also refer to environment variables. The syntax ${DB_PASSWORD} asks Spring to resolve DB_PASSWORD from the available property sources. A default can be specified after a colon when a safe fallback is appropriate.",
        "For production deployments, supply secrets using an appropriate secret manager or deployment platform configuration. Do not print passwords or access tokens to logs."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: \${SERVER_PORT:8080}

spring:
  profiles:
    active: \${SPRING_PROFILES_ACTIVE:dev}

  datasource:
    url: \${DB_URL:jdbc:mysql://localhost:3306/codeforge}
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD}`
      },

      bullets: [
        "SERVER_PORT can configure server.port.",
        "SPRING_PROFILES_ACTIVE can select the active profile.",
        "DB_URL, DB_USERNAME, and DB_PASSWORD are application-specific environment variable names in this example.",
        "A missing required placeholder can prevent startup.",
        "Never assume that a default development database password is appropriate for production."
      ]
    },

    {
      id: "configuration-precedence",
      title: "18. Configuration Property Precedence",

      paragraphs: [
        "Spring Boot can load the same property from several sources. When multiple sources define the same property, the effective value depends on Spring Boot's configuration precedence rules.",
        "Common sources include packaged configuration files, profile-specific configuration, operating-system environment variables, Java system properties, and command-line arguments. Command-line arguments generally override many common configuration sources.",
        "For example, application.yml may set server.port to 8080, while an environment variable sets SERVER_PORT to 9090. The environment-provided value can take precedence, so the application may listen on port 9090.",
        "The complete precedence order contains additional sources and details, so consult the documentation for the Spring Boot version used by the project when resolving complicated conflicts."
      ],

      code: {
        language: "text",
        code: `application.yml:
server:
  port: 8080

Environment variable:
SERVER_PORT=9090

Result:
server.port resolves to 9090
when the environment variable takes precedence.`
      },

      bullets: [
        "Check the active profile when a property has an unexpected value.",
        "Check environment variables and command-line arguments.",
        "Check profile-specific files and external configuration locations.",
        "Use Spring Boot's configuration diagnostics when available.",
        "Avoid defining the same setting in many places without a clear reason."
      ]
    },

    {
      id: "logging-configuration",
      title: "19. Configuring Logging with YAML",

      paragraphs: [
        "Spring Boot supports logging configuration through properties such as logging.level.root and logging.level for specific packages.",
        "DEBUG produces more diagnostic output than INFO. TRACE is generally even more detailed, while WARN and ERROR restrict output to more serious conditions.",
        "During development, enabling DEBUG for an application package can help investigate request handling, service logic, and configuration. In production, select logging levels carefully to balance observability, performance, and data protection."
      ],

      code: {
        language: "yaml",
        code: `logging:
  level:
    root: INFO
    com.codeforge: DEBUG
    org.springframework.web: INFO`
      },

      bullets: [
        "root configures the default logging level.",
        "Package-specific levels allow more focused debugging.",
        "Avoid leaving excessive DEBUG or TRACE logging enabled in production.",
        "Never log database passwords, tokens, or other secrets."
      ]
    },

    {
      id: "security-best-practices",
      title: "20. YAML Security and Best Practices",

      paragraphs: [
        "Configuration files often contain database connection details, external service endpoints, and security-related settings. These values should be managed carefully because configuration files are frequently stored in source control.",
        "Do not commit real passwords, API keys, private keys, or access tokens into a repository. Use environment variables, secret-management systems, or your deployment platform's secure configuration facilities.",
        "Use a clear naming convention for custom properties. Group related values under a meaningful prefix, and prefer typed configuration classes when several properties belong together.",
        "Keep production schema management controlled, review configuration changes during code review, and avoid maintaining conflicting values across multiple configuration files."
      ],

      bullets: [
        "Keep secrets outside committed configuration files.",
        "Use profiles to organize environment-specific settings.",
        "Prefer @ConfigurationProperties for related custom values.",
        "Validate important configuration values at startup.",
        "Use consistent indentation and meaningful property names.",
        "Avoid duplicate keys and conflicting configuration sources.",
        "Use database migrations for controlled production schema changes.",
        "Review logging settings to prevent sensitive information from being exposed."
      ]
    },

    {
      id: "common-yaml-errors",
      title: "21. Common YAML Errors and Troubleshooting",

      paragraphs: [
        "A YAML indentation error can make the configuration invalid or change which parent key owns a setting. Carefully compare the indentation of sibling and nested keys.",
        "A property can be syntactically valid but ineffective if it is placed under the wrong prefix. For example, the server port belongs under server.port, not app.server.port.",
        "A missing environment variable, invalid database URL, incorrect credentials, unavailable database server, or missing JDBC driver can also prevent the application from starting.",
        "When troubleshooting, identify whether the problem is a YAML parsing error, a property binding issue, a configuration precedence issue, or a failure in the configured service itself."
      ],

      code: {
        language: "yaml",
        code: `# Incorrect: port is nested under the wrong key
app:
  server:
    port: 8081

# Correct: configure the Spring Boot server port
server:
  port: 8081`
      },

      bullets: [
        "Read the first meaningful exception in the startup logs.",
        "Check indentation and spelling of property names.",
        "Confirm the expected profile is active.",
        "Verify environment variables and placeholder values.",
        "Confirm the database exists and is reachable.",
        "Check JDBC driver dependencies and database credentials.",
        "Check whether another configuration source overrides the value.",
        "Restart the application after changing configuration when required."
      ]
    },

    {
      id: "practical-exercise",
      title: "22. Practical Exercise: Configure CodeForge API",

      paragraphs: [
        "Create an application.yml file inside src/main/resources for a local CodeForge Spring Boot API. Configure the server port, application name, MySQL datasource, JPA behavior, and logging.",
        "Before running the application, create the codeforge database in MySQL and provide the database credentials through environment variables. Ensure that the project includes Spring Web, Spring Data JPA, and the MySQL JDBC driver dependencies if those features are required.",
        "Start the application and check the startup logs. Confirm that the server listens on the configured port and that the datasource can connect. If the application fails, use the error message to identify whether the issue is configuration, database connectivity, or dependency setup."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: 8081

spring:
  application:
    name: codeforge-api

  datasource:
    url: jdbc:mysql://localhost:3306/codeforge
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

logging:
  level:
    root: INFO
    com.codeforge: DEBUG`
      },

      bullets: [
        "Create the codeforge database before starting the application.",
        "Set DB_PASSWORD and, if needed, DB_USERNAME.",
        "Run the Spring Boot application.",
        "Check the startup logs for the configured port and database errors.",
        "Use a browser or Postman to test an existing API endpoint.",
        "After the exercise works locally, review which settings should change for a production environment."
      ]
    },

    {
      id: "important-points",
      title: "23. Quick Revision Notes",

      bullets: [
        "application.yml is a YAML-based Spring Boot configuration file.",
        "The standard location is src/main/resources/application.yml.",
        "YAML uses indentation to represent nested configuration.",
        "Use spaces instead of tabs.",
        "server.port configures the embedded server's HTTP port.",
        "spring.application.name configures the application name.",
        "spring.datasource configures the database connection.",
        "spring.jpa configures JPA-related behavior.",
        "@Value is useful for reading individual property values.",
        "@ConfigurationProperties binds groups of settings into typed Java objects.",
        "Spring profiles support environment-specific configuration.",
        "Environment variables can override values from configuration files.",
        "Never commit production secrets into source control.",
        "Use database migrations rather than relying on Hibernate schema updates for production changes."
      ]
    },

    {
      id: "interview",
      title: "24. Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is application.yml in Spring Boot?",
          answer: "application.yml is a YAML-based configuration file used to configure Spring Boot settings such as the server port, datasource, logging, profiles, and custom application properties."
        },
        {
          question: "Where is application.yml normally located?",
          answer: "It is normally located in src/main/resources, which is included in the application's runtime classpath."
        },
        {
          question: "What does YAML stand for?",
          answer: "YAML stands for YAML Ain't Markup Language. It is a human-readable format for representing structured data."
        },
        {
          question: "What is the main difference between application.yml and application.properties?",
          answer: "Both configure Spring Boot properties. YAML represents nested structures using indentation, while properties files commonly represent them using dotted keys."
        },
        {
          question: "How do you configure the Spring Boot server port in YAML?",
          answer: "Use server: followed by an indented port property, such as server: newline two spaces port: 8081."
        },
        {
          question: "Why is indentation important in YAML?",
          answer: "Indentation defines the relationship between keys. Incorrect indentation can produce a parsing error or place a property under the wrong parent."
        },
        {
          question: "Can we use tabs for YAML indentation?",
          answer: "No. Use spaces consistently for indentation because tabs are not valid YAML indentation."
        },
        {
          question: "How do you configure a MySQL database in application.yml?",
          answer: "Configure spring.datasource.url, spring.datasource.username, and spring.datasource.password. Include the MySQL JDBC driver and provide valid database credentials."
        },
        {
          question: "What is spring.jpa.hibernate.ddl-auto?",
          answer: "It controls Hibernate's schema-management behavior. Options include none, validate, update, create, and create-drop. The appropriate value depends on the environment and development workflow."
        },
        {
          question: "Is ddl-auto=update recommended for production?",
          answer: "Generally, production schema changes should be managed through controlled database migrations such as Flyway or Liquibase. Hibernate update can be convenient during development but should not replace a production migration strategy."
        },
        {
          question: "How can we read a custom YAML property in Java?",
          answer: "Use @Value for an individual property or @ConfigurationProperties to bind a group of related properties into a Java class."
        },
        {
          question: "What is the purpose of @ConfigurationProperties?",
          answer: "@ConfigurationProperties binds properties with a common prefix to typed Java fields. It is useful for structured, maintainable configuration."
        },
        {
          question: "What is the difference between @Value and @ConfigurationProperties?",
          answer: "@Value is convenient for individual values, while @ConfigurationProperties is better for groups of related settings, nested structures, type-safe binding, and configuration validation."
        },
        {
          question: "What are Spring profiles?",
          answer: "Profiles allow environment-specific beans and configuration. For example, the dev profile can use local database settings while the prod profile uses production settings."
        },
        {
          question: "How do you activate a Spring Boot profile?",
          answer: "You can use spring.profiles.active=dev, the SPRING_PROFILES_ACTIVE environment variable, or a command-line argument such as --spring.profiles.active=dev."
        },
        {
          question: "Can application.yml and application-dev.yml both be used?",
          answer: "Yes. application.yml provides common configuration, while application-dev.yml supplies development-specific values when the dev profile is active. Profile-specific values can override matching base-file values."
        },
        {
          question: "How do environment variables work with Spring Boot configuration?",
          answer: "Spring Boot can resolve environment variables as configuration properties. For example, SERVER_PORT can configure server.port, and placeholders such as ${DB_PASSWORD} can reference an environment variable."
        },
        {
          question: "How can you provide a default value for a YAML placeholder?",
          answer: "Use placeholder syntax with a colon, such as ${SERVER_PORT:8080}. Spring uses the supplied value when available and the default when the property is otherwise unresolved."
        },
        {
          question: "What happens when a required configuration placeholder is missing?",
          answer: "If a placeholder cannot be resolved and no default or other property source provides it, application startup can fail with a configuration resolution error."
        },
        {
          question: "How can you configure logging using YAML?",
          answer: "Use properties such as logging.level.root and logging.level.com.codeforge to configure the root and package-specific logging levels."
        },
        {
          question: "How do you represent a list in YAML?",
          answer: "Use a hyphen followed by a space for each item, with all list items aligned at the same indentation level."
        },
        {
          question: "Can YAML contain custom application properties?",
          answer: "Yes. You can define a custom prefix such as app and bind those values using @Value or @ConfigurationProperties. Your Java code must use the properties for them to affect application behavior."
        },
        {
          question: "What happens if the same property is defined in multiple configuration sources?",
          answer: "Spring Boot resolves the effective value according to configuration property precedence. Environment variables and command-line arguments can override values from configuration files, depending on the sources involved."
        },
        {
          question: "How should database passwords be stored?",
          answer: "Do not commit real passwords into source control. Supply them through environment variables, a secret manager, or secure deployment configuration."
        },
        {
          question: "Why is my configured server port not taking effect?",
          answer: "Check YAML indentation and spelling, active profiles, environment variables, command-line arguments, external configuration, and the application startup logs."
        },
        {
          question: "Can we use both application.yml and application.properties?",
          answer: "Spring Boot supports both formats, but maintaining the same settings in both can make configuration harder to understand. Prefer a clear strategy and verify precedence when values overlap."
        }
      ]
    }
  ]
};
