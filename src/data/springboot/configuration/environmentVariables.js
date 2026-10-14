
export const environmentVariables = {
  id: "environment-variables",
  title: "Environment Variables",
  slug: "environment-variables",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "50 min",

  description:
    "Learn how environment variables work in Spring Boot, how to configure database credentials and server ports, how placeholders and default values work, and how to manage configuration securely across development, testing, and production.",

  sections: [
    {
      id: "what-are-environment-variables",
      title: "What are Environment Variables?",

      paragraphs: [
        "Environment variables are named configuration values provided to a process by its operating system, shell, container, hosting platform, or deployment environment.",
        "They allow an application to receive configuration without hardcoding environment-specific values directly into its source code.",
        "Common examples include database URLs, database usernames, API endpoints, server ports, feature flags, and credentials.",
        "An environment variable consists of a name and a value. For example, DB_URL is the name and jdbc:mysql://localhost:3306/codeforge is its value.",
        "Environment variables are available to a process through its execution environment. A Spring Boot application can access them through Spring's Environment abstraction or through configuration property binding."
      ],

      code: {
        language: "text",
        code: `DB_URL=jdbc:mysql://localhost:3306/codeforge
DB_USERNAME=codeforge_user
SERVER_PORT=8080
APP_NAME=CodeForge`
      }
    },

    {
      id: "why-use-environment-variables",
      title: "Why Use Environment Variables?",

      paragraphs: [
        "The same application may run on a developer's computer, a testing server, a staging environment, and a production server. Each environment can require different configuration values.",
        "Without external configuration, developers might change source code or configuration files whenever the application moves to another environment. This makes deployments error-prone.",
        "With environment variables, the application artifact can remain the same while the deployment environment supplies the appropriate values.",
        "Environment variables also help keep sensitive configuration out of source code. However, they are not a complete secret-management solution because privileged users and processes may still be able to access them."
      ],

      code: {
        language: "text",
        code: `                 Same Spring Boot Application
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
         Development     Testing      Production
         Local DB        Test DB      Production DB
         Port 8080       Port 8081    Port 8080`
      },

      bullets: [
        "Avoid changing Java source code for environment-specific values.",
        "Keep configuration separate from application logic.",
        "Use different database settings in development and production.",
        "Support consistent deployments across machines and environments.",
        "Reduce the risk of committing credentials to source control."
      ]
    },

    {
      id: "basic-example",
      title: "Basic Environment Variable Example",

      paragraphs: [
        "Suppose CodeForge connects to a MySQL database. Instead of embedding the database URL directly in Java code, the deployment environment can supply a variable named DB_URL.",
        "The following assignment is shell-style syntax. Its exact behavior depends on the operating system and shell. A line in a text file does not automatically become an environment variable unless a tool or process loads it."
      ],

      code: {
        language: "text",
        code: `DB_URL=jdbc:mysql://localhost:3306/codeforge`
      },

      bullets: [
        "Variable name: DB_URL",
        "Variable value: jdbc:mysql://localhost:3306/codeforge",
        "Purpose: tells the application which database URL to use."
      ]
    },

    {
      id: "using-environment-variable",
      title: "Using an Environment Variable in Spring Boot",

      paragraphs: [
        "Spring Boot supports externalized configuration. In application.properties, a placeholder such as ${DB_URL} tells Spring to resolve the property using the available configuration sources.",
        "The placeholder is not Java syntax. It belongs to Spring's configuration system and can be used in application.properties or application.yml.",
        "If DB_URL is required and no matching property or environment variable is available, placeholder resolution can fail during application startup. This is useful when the application must not start with missing configuration."
      ],

      code: {
        language: "properties",
        code: `spring.datasource.url=\${DB_URL}`
      },

      bullets: [
        "application.properties contains the placeholder.",
        "The environment supplies DB_URL.",
        "Spring resolves the placeholder when loading configuration.",
        "The resolved value is used to configure the datasource."
      ]
    },

    {
      id: "database-configuration",
      title: "Database Configuration Example",

      paragraphs: [
        "A typical Spring Boot application needs a JDBC URL, database username, and password. These values can be provided through environment variables instead of storing actual credentials in the application's tracked configuration file.",
        "The following example requires DB_URL, DB_USERNAME, and DB_PASSWORD to be supplied by the deployment environment or another applicable Spring configuration source."
      ],

      code: {
        language: "properties",
        code: `spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`
      },

      bullets: [
        "DB_URL identifies the database connection endpoint.",
        "DB_USERNAME identifies the database account.",
        "DB_PASSWORD supplies the corresponding credential.",
        "The MySQL JDBC driver must be included as a project dependency.",
        "The database must exist and the account must have appropriate permissions."
      ]
    },

    {
      id: "server-port",
      title: "Using Environment Variables for Server Port",

      paragraphs: [
        "Spring Boot's server.port property controls the HTTP port used by the embedded web server.",
        "The placeholder ${SERVER_PORT:8080} means Spring should resolve SERVER_PORT and use 8080 as the fallback if that property cannot be resolved.",
        "If SERVER_PORT is set to 9090, the application normally listens on port 9090, provided the port is available and no higher-precedence configuration overrides the setting."
      ],

      code: {
        language: "properties",
        code: `server.port=\${SERVER_PORT:8080}`
      },

      bullets: [
        "SERVER_PORT=9090 results in port 9090 when this property is effective.",
        "If SERVER_PORT is absent, the fallback is 8080.",
        "If another higher-precedence configuration source supplies server.port, that source may override this value."
      ]
    },

    {
      id: "default-values",
      title: "Default Values",

      paragraphs: [
        "Spring configuration placeholders support a default value after a colon. The default is used when the referenced property cannot be resolved.",
        "Defaults are useful for non-sensitive settings that have a safe and meaningful fallback, such as a local server port or an application display name.",
        "Avoid providing unsafe defaults for mandatory production configuration. For example, silently falling back to a real or shared database password is not a good practice."
      ],

      code: {
        language: "properties",
        code: `server.port=\${SERVER_PORT:8080}

spring.application.name=\${APP_NAME:codeforge-api}

app.environment=\${APP_ENV:development}`
      },

      bullets: [
        "SERVER_PORT falls back to 8080.",
        "APP_NAME falls back to codeforge-api.",
        "APP_ENV falls back to development.",
        "A default value does not automatically activate a Spring profile.",
        "APP_ENV is an application-specific property unless your application explicitly gives it additional behavior."
      ]
    },

    {
      id: "multiple-environment-variables",
      title: "Using Multiple Environment Variables",

      paragraphs: [
        "A real application usually needs several configuration values. Spring Boot can resolve multiple placeholders from the environment and other supported configuration sources.",
        "This example externalizes the application name, server port, database URL, username, and password. It provides defaults only for the application name and port.",
        "The database variables are intentionally required. If they are missing, the application should not silently connect using unintended database credentials."
      ],

      code: {
        language: "properties",
        code: `spring.application.name=\${APP_NAME:codeforge-api}

server.port=\${SERVER_PORT:8080}

spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}`
      }
    },

    {
      id: "development-example",
      title: "Development Environment",

      paragraphs: [
        "During development, a developer may use a local MySQL instance and a dedicated development database.",
        "The values below illustrate the intended configuration. They are examples, not credentials that should be reused in production.",
        "Do not assume that writing these assignments into a file automatically exports them to the environment. The file must be loaded by an appropriate tool, shell, IDE configuration, or container setup."
      ],

      code: {
        language: "text",
        code: `DB_URL=jdbc:mysql://localhost:3306/codeforge_dev
DB_USERNAME=codeforge_dev_user
DB_PASSWORD=replace_with_local_dev_password
SERVER_PORT=8080
APP_NAME=codeforge-api`
      }
    },

    {
      id: "production-example",
      title: "Production Environment",

      paragraphs: [
        "In production, the same application can receive a different database URL, a restricted database account, and credentials supplied by the deployment platform.",
        "A production database hostname such as production-db is only an example. The actual hostname must be reachable from the application's runtime environment.",
        "Do not use the illustrative username or password below as real credentials. Production secrets should be provisioned through an approved secret-management mechanism and rotated when necessary."
      ],

      code: {
        language: "text",
        code: `DB_URL=jdbc:mysql://production-db:3306/codeforge
DB_USERNAME=codeforge_app_user
DB_PASSWORD=obtain_from_approved_secret_store
SERVER_PORT=8080
APP_NAME=codeforge-api`
      },

      bullets: [
        "Use a separate database account with only the permissions the application requires.",
        "Use TLS and database network restrictions where appropriate.",
        "Do not print passwords or access tokens in logs.",
        "Ensure the deployment platform injects the required variables into the application process.",
        "Use a dedicated secret-management service when the deployment environment requires one."
      ]
    },

    {
      id: "same-application",
      title: "Same Application, Different Configuration",

      paragraphs: [
        "External configuration separates the application artifact from the values used at runtime. The same built JAR can be deployed to different environments with different configuration.",
        "This does not mean that all environment variables automatically change application behavior. The application must read the relevant variables through Spring configuration or another supported mechanism."
      ],

      code: {
        language: "text",
        code: `Development Environment
DB_URL=jdbc:mysql://localhost:3306/codeforge_dev
                  |
                  v
        Same Spring Boot JAR
                  ^
                  |
Production Environment
DB_URL=jdbc:mysql://production-db:3306/codeforge`
      }
    },

    {
      id: "value-example",
      title: "Environment Variables with @Value",

      paragraphs: [
        "The @Value annotation can inject a value into a Spring-managed bean using a property placeholder.",
        "Spring resolves the placeholder from its Environment and configuration sources. The value may originate from an operating-system environment variable, application configuration, or another applicable property source.",
        "The following example assumes that the class is in a package scanned by Spring Boot and that DB_USERNAME is available through configuration."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DatabaseConfigService {

    private final String username;

    public DatabaseConfigService(
            @Value("\${DB_USERNAME}") String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}`
      },

      bullets: [
        "Use @Value for a small number of individual settings.",
        "Constructor injection makes the dependency explicit and the field can remain final.",
        "For a group of related settings, consider @ConfigurationProperties.",
        "A missing required placeholder can prevent application startup."
      ]
    },

    {
      id: "sensitive-values",
      title: "Sensitive Configuration",

      paragraphs: [
        "Environment variables are one way to keep sensitive values out of source code. They are commonly used for database passwords, API keys, and credentials.",
        "However, environment variables are not inherently encrypted. Depending on the operating system and deployment setup, privileged users, diagnostic tools, process inspection, crash reports, or misconfigured logs may expose them.",
        "For higher-risk production deployments, use a secret manager or platform-native secret facility, restrict access, and rotate credentials according to your security requirements."
      ],

      bullets: [
        "Do not commit production passwords or API keys to Git.",
        "Do not hardcode secrets in Java source code.",
        "Do not log environment variables or secret values.",
        "Restrict who can inspect deployment configuration and runtime processes.",
        "Use separate credentials for development, testing, and production.",
        "Grant database accounts only the permissions they need.",
        "Use a secret manager where appropriate and support secret rotation.",
        "Remove exposed credentials from active use and rotate them if they were accidentally committed."
      ]
    },

    {
      id: "environment-variable-flow",
      title: "Environment Variable Flow",

      paragraphs: [
        "At startup, the operating system or deployment platform starts the Java process with its environment. Spring Boot builds an Environment that combines supported property sources, including environment variables and application configuration.",
        "Spring resolves placeholders and binds configuration values to application components. The exact winning value depends on property-source precedence, so an environment variable is not guaranteed to override every other configuration source."
      ],

      code: {
        language: "text",
        code: `Operating System / Deployment Platform
                  |
                  v
           Java Process Environment
                  |
                  v
          Spring Environment
                  |
                  v
      Placeholder Resolution / Binding
                  |
                  v
         Spring-managed Components`
      }
    },

    {
      id: "setting-variables-windows",
      title: "How to Set Environment Variables on Windows",

      paragraphs: [
        "In Windows Command Prompt, use set to define a variable for the current command session. Child processes started from that session can inherit it.",
        "In PowerShell, use the $env:NAME syntax. These session-scoped variables do not automatically become permanent system-wide settings.",
        "If you start Spring Boot from an IDE, configure environment variables in the IDE's run configuration or start the IDE from a shell that has the required variables."
      ],

      code: {
        language: "text",
        code: `Windows Command Prompt:

set DB_URL=jdbc:mysql://localhost:3306/codeforge_dev
set DB_USERNAME=codeforge_dev_user
set DB_PASSWORD=replace_with_local_dev_password
set SERVER_PORT=8080

mvn spring-boot:run


PowerShell:

$env:DB_URL = "jdbc:mysql://localhost:3306/codeforge_dev"
$env:DB_USERNAME = "codeforge_dev_user"
$env:DB_PASSWORD = "replace_with_local_dev_password"
$env:SERVER_PORT = "8080"

mvn spring-boot:run`
      },

      bullets: [
        "Run the commands in the terminal from which you launch the application.",
        "Use local development credentials only.",
        "Avoid placing real secrets directly in shell history or shared scripts.",
        "After changing persistent environment settings, you may need to restart the terminal or IDE."
      ]
    },

    {
      id: "setting-variables-linux",
      title: "How to Set Environment Variables on Linux and macOS",

      paragraphs: [
        "In common Unix shells such as Bash and Zsh, export makes a shell variable available to child processes.",
        "The following commands configure variables for the current shell session. They are not automatically permanent after that session ends.",
        "For production services, configure variables through the service manager, container runtime, orchestrator, or hosting platform rather than relying on a developer's interactive shell."
      ],

      code: {
        language: "bash",
        code: `export DB_URL='jdbc:mysql://localhost:3306/codeforge_dev'
export DB_USERNAME='codeforge_dev_user'
export DB_PASSWORD='replace_with_local_dev_password'
export SERVER_PORT='8080'

mvn spring-boot:run`
      },

      bullets: [
        "export passes the variables to child processes.",
        "Quote values when necessary to prevent shell interpretation.",
        "Do not put real production secrets in shared shell configuration files.",
        "Use the appropriate service or deployment configuration for long-running applications."
      ]
    },

    {
      id: "environment-variables-docker",
      title: "Environment Variables in Docker",

      paragraphs: [
        "When running a Spring Boot application in Docker, the container process can receive configuration through the Docker runtime.",
        "The following example assumes that the image already contains the Spring Boot application and that the database hostname is reachable from the container. Inside a container, localhost normally refers to that container itself, not to the host computer or another database container.",
        "The -e option supplies variables to the container process. Be careful with command-line secrets because they may be exposed through shell history or deployment tooling."
      ],

      code: {
        language: "bash",
        code: `docker run --rm \\
  -e DB_URL='jdbc:mysql://db:3306/codeforge' \\
  -e DB_USERNAME='codeforge_app_user' \\
  -e SERVER_PORT='8080' \\
  -p 8080:8080 \\
  codeforge-api:latest`
      },

      bullets: [
        "The container must be able to resolve and reach the database hostname.",
        "The application must use the same environment variable names as its configuration.",
        "The -p option maps a host port to a container port; it does not configure the application's internal server port.",
        "For real secrets, prefer suitable Docker or orchestrator secret-management mechanisms.",
        "Do not bake environment-specific passwords into a Docker image."
      ]
    },

    {
      id: "environment-variable-naming",
      title: "Environment Variable Naming and Spring Boot Relaxed Binding",

      paragraphs: [
        "Spring Boot supports relaxed binding for configuration properties. A canonical property such as spring.datasource.url can be supplied through the corresponding environment variable SPRING_DATASOURCE_URL.",
        "For environment-variable binding, Spring Boot converts canonical property names by replacing dots with underscores, removing hyphens, and converting letters to uppercase.",
        "Custom properties follow the same general convention. For example, app.mail.from-address can be represented as APP_MAIL_FROMADDRESS for environment-variable binding under Spring Boot's relaxed-binding rules.",
        "When using a placeholder explicitly written as ${DB_URL}, provide a matching DB_URL property or environment variable. Do not assume that every arbitrary variable name will automatically map to an unrelated property name."
      ],

      code: {
        language: "text",
        code: `Canonical property             Environment variable
----------------------------------------------------
server.port                     SERVER_PORT
spring.datasource.url           SPRING_DATASOURCE_URL
spring.datasource.username      SPRING_DATASOURCE_USERNAME
app.name                        APP_NAME
app.mail.from-address           APP_MAIL_FROMADDRESS`
      }
    },

    {
      id: "environment-variables-vs-profiles",
      title: "Environment Variables vs Spring Profiles",

      paragraphs: [
        "Environment variables provide values to an application process. Spring profiles select environment-specific groups of configuration and beans.",
        "These features can be used together. For example, SPRING_PROFILES_ACTIVE=prod activates the prod profile, while DB_URL and DB_USERNAME supply database settings.",
        "A custom variable such as APP_ENV=production does not activate the production Spring profile automatically. It only does so if your application or deployment setup explicitly maps it to Spring's profile configuration."
      ],

      code: {
        language: "properties",
        code: `# Set through the deployment environment:
# SPRING_PROFILES_ACTIVE=prod
# DB_URL=jdbc:mysql://production-db:3306/codeforge

# application-prod.properties:
spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}`
      },

      bullets: [
        "Use profiles to organize environment-specific configuration and bean behavior.",
        "Use environment variables to supply values at runtime.",
        "Use SPRING_PROFILES_ACTIVE to activate a Spring profile externally.",
        "Do not assume a custom APP_ENV variable activates a profile automatically."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Environment Variable Mistakes",

      paragraphs: [
        "Configuration problems often appear as startup failures, unresolved placeholders, or database connection errors. Check the variable name, the process that receives it, the effective Spring property, and the actual connectivity of the target service."
      ],

      bullets: [
        "Misspelled variable names: DB_USERNAME and DB_USER are different names unless explicitly mapped.",
        "Variable not exported: a shell variable may not be inherited by the Java process.",
        "Wrong execution context: variables set in one terminal may not be available to an IDE or service started elsewhere.",
        "Missing required value: ${DB_URL} can fail to resolve when no applicable property exists.",
        "Incorrect default assumptions: a fallback is used only when the referenced property cannot be resolved.",
        "Incorrect database hostname: localhost inside a container refers to that container.",
        "Wrong port assumptions: Docker port publishing and Spring's server.port configure different sides of a connection.",
        "Conflicting configuration: another property source may override the expected value.",
        "Secrets in logs or Git: externalizing a secret does not make it safe if it is subsequently exposed.",
        "Treating APP_ENV as a profile selector: use Spring's profile configuration when profile activation is intended."
      ],

      code: {
        language: "properties",
        code: `# Required values: provide them through the environment
spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}

# Safe local default for a non-sensitive setting
server.port=\${SERVER_PORT:8080}`
      }
    },

    {
      id: "troubleshooting",
      title: "Troubleshooting Environment Variables",

      paragraphs: [
        "If Spring Boot cannot resolve a placeholder, first verify that the variable is available to the exact process that launches the application. Then check spelling, placeholder syntax, active profiles, and competing configuration sources.",
        "Do not print passwords or tokens while troubleshooting. Verify whether a non-sensitive setting is present, or inspect configuration through a controlled diagnostic method that does not reveal secret values."
      ],

      bullets: [
        "Confirm the variable name matches the placeholder exactly.",
        "Confirm the application process receives the variable.",
        "Check whether the IDE, terminal, container, or service manager uses a different environment.",
        "Inspect application.properties, application.yml, and profile-specific configuration for overrides.",
        "Check the startup exception to identify which placeholder is unresolved.",
        "For database failures, verify network access, hostname resolution, database availability, credentials, and driver dependencies.",
        "Never dump the complete environment into application logs because it may contain secrets."
      ],

      code: {
        language: "bash",
        code: `# Linux/macOS: inspect non-sensitive configuration
printf '%s\\n' "$SERVER_PORT"

# Windows Command Prompt
echo %SERVER_PORT%

# PowerShell
Write-Output $env:SERVER_PORT`
      }
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Environment variables provide runtime configuration to a process.",
        "Spring Boot supports environment variables as a configuration source.",
        "Use placeholders such as ${DB_URL} in application.properties.",
        "Use ${SERVER_PORT:8080} to supply a default value.",
        "Spring Boot relaxed binding maps many canonical property names to uppercase environment-variable names.",
        "Environment variables can be used for database URLs, usernames, passwords, and server ports.",
        "The process must actually receive the variables; defining them in an unrelated shell or file is not sufficient.",
        "Profiles and environment variables solve related but different configuration problems.",
        "Environment variables are not automatically encrypted or a complete secret-management solution.",
        "Do not commit production secrets or print them in logs.",
        "A higher-precedence configuration source may override an expected value.",
        "Use the same application artifact across environments and supply the appropriate runtime configuration."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is an environment variable?",
          answer:
            "An environment variable is a named value supplied to a process by its operating system or deployment environment. Applications use it for configuration such as database URLs, ports, and credentials."
        },
        {
          question: "2. Why are environment variables useful in Spring Boot?",
          answer:
            "They allow environment-specific values to be supplied at runtime without modifying the application source code or rebuilding the application for every environment."
        },
        {
          question: "3. How do you reference an environment variable in application.properties?",
          answer:
            "Use a Spring configuration placeholder, such as spring.datasource.url=${DB_URL}. Spring resolves the placeholder from the available configuration sources."
        },
        {
          question: "4. How do you provide a default value for a property?",
          answer:
            "Use colon syntax, such as server.port=${SERVER_PORT:8080}. Spring uses 8080 when the referenced property cannot be resolved."
        },
        {
          question: "5. How can database credentials be externalized?",
          answer:
            "Configure the datasource with placeholders such as ${DB_URL}, ${DB_USERNAME}, and ${DB_PASSWORD}, then supply the corresponding values through the deployment environment or an appropriate secret-management mechanism."
        },
        {
          question: "6. How do you configure the Spring Boot server port through an environment variable?",
          answer:
            "Set SERVER_PORT and configure server.port=${SERVER_PORT:8080}. The application uses the supplied value when this property is effective, or 8080 as its fallback."
        },
        {
          question: "7. How can you set an environment variable in Windows Command Prompt?",
          answer:
            "Use a command such as set SERVER_PORT=9090 in the same Command Prompt session from which the application is launched."
        },
        {
          question: "8. How can you set an environment variable in PowerShell?",
          answer:
            "Use $env:SERVER_PORT = '9090'. The variable is available to processes launched from that PowerShell session."
        },
        {
          question: "9. How do you set an environment variable in Linux or macOS?",
          answer:
            "In common shells such as Bash and Zsh, use export SERVER_PORT=9090 to pass the variable to child processes."
        },
        {
          question: "10. Can @Value access environment-based configuration?",
          answer:
            "Yes. A Spring-managed component can use @Value with a placeholder such as @Value(\"${DB_USERNAME}\"). Spring resolves the value from its configuration environment."
        },
        {
          question: "11. What happens when a required placeholder cannot be resolved?",
          answer:
            "Spring may fail to resolve the placeholder and stop application startup. Providing a suitable default or correctly configuring the missing property can resolve the problem."
        },
        {
          question: "12. What is the difference between an environment variable and a Spring profile?",
          answer:
            "An environment variable supplies a value to a process, while a Spring profile selects profile-specific configuration and beans. They can be used together."
        },
        {
          question: "13. Does APP_ENV=production automatically activate the prod profile?",
          answer:
            "No. APP_ENV is a custom variable unless the application or deployment setup explicitly maps it to profile activation. SPRING_PROFILES_ACTIVE=prod is the conventional way to activate the prod profile externally."
        },
        {
          question: "14. What is Spring Boot relaxed binding?",
          answer:
            "Relaxed binding allows configuration properties to be represented in different naming styles. For example, spring.datasource.url can be supplied through SPRING_DATASOURCE_URL."
        },
        {
          question: "15. Are environment variables encrypted?",
          answer:
            "No. Environment variables are not inherently encrypted. Their visibility depends on the operating system, permissions, process access, and deployment platform."
        },
        {
          question: "16. Are environment variables sufficient for every production secret?",
          answer:
            "Not necessarily. They are useful for external configuration, but sensitive deployments may require a secret manager, restricted access, audit controls, and credential rotation."
        },
        {
          question: "17. How do you use environment variables with Docker?",
          answer:
            "Docker can pass variables to a container using options such as -e NAME=value or an appropriate environment file. Sensitive values should be handled carefully and should not be baked into the image."
        },
        {
          question: "18. Why might an environment variable work in a terminal but not in an IDE?",
          answer:
            "The IDE may have been started from a different process environment or may use its own run configuration. Configure the variable in the IDE or launch it from a shell that already has the variable."
        },
        {
          question: "19. What is the difference between ${DB_URL} and ${DB_URL:defaultValue}?",
          answer:
            "${DB_URL} requires the property to be resolvable. ${DB_URL:defaultValue} provides a fallback when the referenced property cannot be resolved. Avoid unsafe defaults for required production configuration."
        },
        {
          question: "20. Can a higher-precedence property override an environment variable?",
          answer:
            "Yes. Spring Boot combines multiple configuration sources, and the effective value depends on property-source precedence. An environment variable does not override every possible source."
        },
        {
          question: "21. What is the best way to debug an unresolved placeholder?",
          answer:
            "Check the exact variable name, whether the launching process receives it, the placeholder syntax, active profiles, and other configuration sources. Avoid logging the full environment or secret values."
        },
        {
          question: "22. What is the main advantage of externalized configuration?",
          answer:
            "It separates application code from deployment-specific settings, allowing the same application artifact to run in different environments with different configuration."
        }
      ]
    }
  ]
};
