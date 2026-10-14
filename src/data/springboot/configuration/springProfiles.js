
export const springProfiles = {
  id: "spring-profiles",
  title: "Spring Profiles",
  slug: "spring-profiles",
  topicTitle: "Spring Boot Configuration",
  estimatedTime: "35 min",

  description:
    "Learn how Spring Profiles separate environment-specific configuration and beans for development, testing, staging, and production environments.",

  sections: [
    {
      id: "what-is-profile",
      title: "1. What Is a Spring Profile?",

      paragraphs: [
        "A Spring Profile provides a way to group configuration and Spring beans that should be active only in specific environments or application modes.",
        "Real-world applications commonly run in development, testing, staging, and production environments. Each environment may require different database connections, logging levels, external service URLs, or implementations of certain services.",
        "Without profiles, developers may need to repeatedly edit configuration files or application code when switching environments. Spring Profiles help keep these differences organized and allow the appropriate configuration or beans to be selected.",
        "For example, CodeForge can use a local MySQL database during development and a managed database in production. It can also use a development email service locally and a real email provider in production.",
        "Spring Profiles do not automatically create databases, secure passwords, or deploy the application. They select applicable configuration and profile-specific beans based on the active profiles."
      ],

      code: {
        language: "text",
        code: `One Spring Boot Application
          |
          +---- dev
          |      Local database
          |      Development logging
          |      Test email service
          |
          +---- test
          |      Test database
          |      Test-specific beans
          |
          +---- staging
          |      Pre-production settings
          |
          +---- prod
                 Production database
                 Production integrations`
      },

      bullets: [
        "A profile identifies a configuration or bean group.",
        "Profiles can control which beans are registered.",
        "Profiles can load environment-specific configuration files.",
        "More than one profile can be active at the same time.",
        "Common configuration can remain in application.yml or application.properties.",
        "Use profiles to manage meaningful differences between environments."
      ]
    },

    {
      id: "profile-files",
      title: "2. Profile-Specific Configuration Files",

      paragraphs: [
        "Spring Boot supports profile-specific configuration files. The common naming convention is application-{profile}.yml or application-{profile}.properties.",
        "For example, application-dev.yml contains configuration associated with the dev profile, while application-prod.yml contains configuration associated with prod.",
        "The base application.yml file can hold settings shared across environments. Profile-specific files can override those values when the corresponding profile is active.",
        "For the same property, profile-specific configuration can override the base configuration value. However, environment variables, command-line arguments, and other higher-precedence property sources can still override file values.",
        "Profile-specific files are commonly stored in src/main/resources. External configuration locations are also possible when supported by the application's deployment setup."
      ],

      code: {
        language: "text",
        code: `src/main/resources/
|
+-- application.yml
+-- application-dev.yml
+-- application-test.yml
+-- application-staging.yml
+-- application-prod.yml`
      },

      code: {
        language: "yaml",
        code: `# application.yml
spring:
  application:
    name: codeforge-api

server:
  port: 8080

app:
  name: CodeForge`
      },

      paragraphs: [
        "The base file contains the application's name, a default server port, and a custom application name. Profile-specific files can provide different values where required."
      ],

      bullets: [
        "Use application.yml for shared configuration.",
        "Use application-dev.yml for development-specific settings.",
        "Use application-test.yml for testing-specific settings.",
        "Use application-prod.yml for production-specific settings.",
        "Do not create a separate profile file unless it provides useful environment-specific configuration."
      ]
    },

    {
      id: "dev-profile",
      title: "3. Development Profile",

      paragraphs: [
        "The development profile is intended for local development and debugging. It may use a locally running database, more detailed logging, test email integrations, and developer-specific settings.",
        "The example below configures a development database. The database must already exist, the account must have suitable permissions, and the application must include the required MySQL JDBC driver.",
        "For a real project, avoid putting actual passwords in source-controlled files. Use a local environment variable or an ignored local configuration file for credentials."
      ],

      code: {
        language: "yaml",
        code: `# application-dev.yml
server:
  port: 8081

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge_dev
    username: \${DB_USERNAME:codeforge_dev_user}
    password: \${DB_PASSWORD}`
      },

      paragraphs: [
        "Here, the development profile changes the server port to 8081 and selects the codeforge_dev database.",
        "The DB_USERNAME placeholder provides a fallback username. The DB_PASSWORD placeholder requires the password to be available from an applicable configuration source; without a resolvable value, property resolution can fail.",
        "The server port is illustrative. You can use a different port if another process already occupies 8081."
      ],

      bullets: [
        "Use development data rather than production data when possible.",
        "Enable detailed logging only when it is useful.",
        "Never use production credentials as convenient local defaults.",
        "Confirm that the dev profile is active before assuming its settings are loaded."
      ]
    },

    {
      id: "prod-profile",
      title: "4. Production Profile",

      paragraphs: [
        "The production profile contains settings appropriate for the deployed application. It may use a managed database, restricted logging, production integrations, and deployment-specific service endpoints.",
        "Production credentials should be supplied securely by the deployment environment or an appropriate secret-management service. Do not commit real production passwords to Git.",
        "The example uses a placeholder for the database username and password. The DB_URL property is also externalized so the deployment can supply the actual database endpoint."
      ],

      code: {
        language: "yaml",
        code: `# application-prod.yml
server:
  port: 8080

spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}`
      },

      paragraphs: [
        "The production database URL, username, and password must be supplied by the deployment environment or another applicable configuration source.",
        "A production profile does not automatically make an application production-ready. You must also configure access control, network security, database permissions, monitoring, backups, and an appropriate schema migration strategy."
      ],

      bullets: [
        "Use the intended production database endpoint.",
        "Keep production credentials outside source-controlled configuration.",
        "Avoid logging sensitive configuration values.",
        "Use restricted database permissions.",
        "Use a controlled migration strategy for production database schema changes.",
        "Test the production configuration in a suitable staging environment."
      ]
    },

    {
      id: "activate-profile",
      title: "5. Activating a Spring Profile",

      paragraphs: [
        "Creating a profile-specific configuration file does not mean that profile is automatically active. Spring Boot needs to know which profile or profiles to activate.",
        "The spring.profiles.active property selects the active profiles. It can be provided through configuration, an environment variable, a Java system property, or a command-line argument.",
        "For example, activating dev causes Spring Boot to load the applicable application-dev.yml or application-dev.properties configuration, along with the normal configuration sources.",
        "In deployment, supplying the active profile externally is often convenient because the same packaged application can be launched in different environments."
      ],

      code: {
        language: "properties",
        code: `# application.properties
spring.profiles.active=dev`
      },

      paragraphs: [
        "The previous example activates dev from a configuration file. If this setting is packaged as a default, a deployment can override it through an appropriate higher-precedence property source.",
        "For shared applications, it is often preferable to leave environment selection to the deployment environment rather than hardcoding a production or development profile into a universally distributed artifact."
      ],

      code: {
        language: "text",
        code: `# Command-line argument
java -jar codeforge-api.jar --spring.profiles.active=dev

# Environment variable: Linux/macOS shell
SPRING_PROFILES_ACTIVE=prod java -jar codeforge-api.jar

# Java system property
java -Dspring.profiles.active=test -jar codeforge-api.jar`
      },

      bullets: [
        "Use dev for development settings.",
        "Use test for testing settings when that profile is appropriate.",
        "Use prod for production settings.",
        "More than one profile can be activated, for example dev,local.",
        "When multiple profiles are active, overlapping settings and beans must be considered carefully.",
        "Do not confuse a custom property such as app.environment with spring.profiles.active."
      ]
    },

    {
      id: "profile-annotation",
      title: "6. Using @Profile on Spring Beans",

      paragraphs: [
        "@Profile is an annotation that controls whether a Spring bean definition is eligible for registration based on the active profile.",
        "This is useful when an application needs different implementations of the same interface. For example, the development environment might use a fake email sender, while production uses an actual email provider.",
        "The bean annotated with @Profile(\"dev\") is eligible when the dev profile is active. When that profile is not active, that bean is not registered through this profile-specific definition.",
        "Place @Profile on supported component classes or configuration methods such as @Bean methods. Make sure the class is registered through component scanning or configuration."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class DevelopmentEmailService {

    public void send() {
        System.out.println("Development email");
    }
}`
      },

      paragraphs: [
        "For a real application, define a common interface and provide separate implementations. The application can inject the interface without needing to know which environment-specific implementation was selected.",
        "The following examples are separate Java files. They assume the project uses Spring component scanning and that the dev or prod profile is activated as intended."
      ],

      code: {
        language: "java",
        code: `// EmailService.java
public interface EmailService {
    void send(String message);
}`
      },

      code: {
        language: "java",
        code: `// DevelopmentEmailService.java
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class DevelopmentEmailService implements EmailService {

    @Override
    public void send(String message) {
        System.out.println("DEV EMAIL: " + message);
    }
}`
      },

      code: {
        language: "java",
        code: `// ProductionEmailService.java
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("prod")
public class ProductionEmailService implements EmailService {

    @Override
    public void send(String message) {
        // Integrate with the approved production email provider.
        System.out.println("Sending production email");
    }
}`
      },

      bullets: [
        "EmailService defines the common contract.",
        "The dev profile registers DevelopmentEmailService.",
        "The prod profile registers ProductionEmailService.",
        "A consumer can inject EmailService rather than checking the active profile itself.",
        "If no active profile matches either implementation, an injection point requiring EmailService may fail because no matching bean is available.",
        "If several active profiles register competing implementations, ensure that bean selection is unambiguous."
      ]
    },

    {
      id: "profile-flow",
      title: "7. How Spring Profile Selection Works",

      paragraphs: [
        "When a Spring Boot application starts, configuration sources are processed and the active profiles are determined. Profile-specific configuration is then applied as part of the application's configuration setup.",
        "Spring evaluates profile conditions on bean definitions. Beans whose profile conditions match can be registered in the application context, while definitions with unmatched profile conditions are not registered through those definitions.",
        "Application components can then use the selected configuration and registered beans. A service can depend on an interface and receive the implementation that matches the active environment."
      ],

      code: {
        language: "text",
        code: `Start Spring Boot Application
             |
             v
Resolve Configuration
             |
             v
Determine Active Profiles
             |
             +---- dev
             +---- test
             +---- staging
             +---- prod
             |
             v
Load Applicable Profile Configuration
             |
             v
Evaluate @Profile Conditions
             |
             v
Create Eligible Spring Beans
             |
             v
Run Application`
      },

      bullets: [
        "The active profile influences configuration selection and profile-conditional beans.",
        "A profile does not change Java source code.",
        "Profile-specific beans must still be discoverable through component scanning or configuration.",
        "Configuration errors can prevent the application from starting.",
        "Verify the active profile in startup logs when troubleshooting."
      ]
    },

    {
      id: "best-practices",
      title: "8. Spring Profile Best Practices",

      paragraphs: [
        "Profiles are most useful when they represent meaningful environment differences. They should not become a replacement for clean application architecture or ordinary feature configuration.",
        "Keep shared values in the base configuration file and move only environment-specific overrides into profile-specific files. Externalize sensitive values and validate required configuration before the application begins normal processing.",
        "Be careful when activating multiple profiles. Two active profiles can both contribute configuration or beans, so overlapping property values and duplicate bean definitions need to be understood.",
        "For tests, use the profile that matches the purpose of the test. Spring Boot tests can activate profiles with @ActiveProfiles, and test-specific properties can be supplied using the supported testing mechanisms."
      ],

      bullets: [
        "Keep common settings in application.yml or application.properties.",
        "Use application-dev.yml, application-test.yml, and application-prod.yml for meaningful differences.",
        "Supply production secrets through an appropriate secure mechanism.",
        "Do not hardcode production credentials in configuration files committed to Git.",
        "Do not assume APP_ENV activates a Spring Profile automatically.",
        "Prefer interface-based dependency injection for environment-specific service implementations.",
        "Avoid excessive profiles that represent unrelated feature flags.",
        "Ensure a required interface has exactly the intended injectable implementation.",
        "Test profile-specific behavior rather than assuming that configuration is loaded correctly.",
        "Review configuration precedence when an external value overrides a profile-specific value."
      ],

      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@ActiveProfiles("test")
class CodeForgeApplicationTest {

    @Test
    void applicationContextLoads() {
        // Verify that the test-profile context starts successfully.
    }
}`
      },

      bullets: [
        "The test requires the project's Spring Boot test dependencies.",
        "The example checks that the Spring application context can start with the test profile.",
        "Add assertions or integration tests to verify actual profile-specific behavior.",
        "Keep tests isolated from production databases and real production services."
      ]
    },

    {
      id: "interview",
      title: "9. Spring Profile Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a Spring Profile?",
          answer: "A Spring Profile groups configuration and beans that should be active for particular environments or application modes."
        },
        {
          question: "Why are Spring Profiles useful?",
          answer: "They allow one application to use different settings and bean implementations for development, testing, staging, and production."
        },
        {
          question: "What is a profile-specific configuration file?",
          answer: "It is a configuration file associated with a profile, such as application-dev.yml or application-prod.properties."
        },
        {
          question: "What is the naming convention for profile-specific YAML files?",
          answer: "The common naming convention is application-{profile}.yml, such as application-dev.yml."
        },
        {
          question: "How do you activate the dev profile?",
          answer: "You can set spring.profiles.active=dev, use SPRING_PROFILES_ACTIVE=dev, pass --spring.profiles.active=dev, or supply the corresponding Java system property."
        },
        {
          question: "What is the purpose of @Profile?",
          answer: "@Profile controls whether a bean definition is eligible for registration when its specified profile condition matches the active profiles."
        },
        {
          question: "Can @Profile be used on a service class?",
          answer: "Yes. A component-scanned service class can use @Profile to restrict its bean definition to selected profiles."
        },
        {
          question: "Can @Profile be used with @Bean methods?",
          answer: "Yes. It can be applied to supported configuration methods, allowing a bean to be created only for matching profiles."
        },
        {
          question: "What is the difference between application.yml and application-dev.yml?",
          answer: "application.yml provides general configuration, while application-dev.yml provides settings associated with the dev profile."
        },
        {
          question: "Does creating application-prod.yml automatically activate prod?",
          answer: "No. The prod profile must be activated through a supported configuration mechanism."
        },
        {
          question: "Can multiple Spring Profiles be active simultaneously?",
          answer: "Yes. Multiple profiles can be active, and their configuration and bean definitions must be considered together."
        },
        {
          question: "What happens if no profile is explicitly activated?",
          answer: "Spring Boot uses its default-profile behavior and ordinary configuration sources. The default profile name is normally default unless it has been changed. Profile-specific behavior depends on which profiles are active."
        },
        {
          question: "How do you activate a profile from the command line?",
          answer: "Run the JAR with an argument such as java -jar codeforge-api.jar --spring.profiles.active=dev."
        },
        {
          question: "How do you activate a profile using an environment variable?",
          answer: "Set SPRING_PROFILES_ACTIVE to the desired profile name in the environment where the application is launched."
        },
        {
          question: "Does setting APP_ENV=prod activate the prod profile?",
          answer: "No. APP_ENV is a custom property unless the application explicitly maps it to profile activation. Use SPRING_PROFILES_ACTIVE or spring.profiles.active."
        },
        {
          question: "How can a service use different implementations in development and production?",
          answer: "Define a common interface, create separate implementations, and use @Profile(\"dev\") and @Profile(\"prod\") to select the appropriate bean."
        },
        {
          question: "What if no active profile provides a required service bean?",
          answer: "Dependency injection can fail because Spring cannot find a matching bean. Provide an appropriate implementation for the active profile or define a deliberate fallback."
        },
        {
          question: "Can an environment variable override a profile-specific setting?",
          answer: "Yes. An environment variable can override a configuration-file value when its property name and source precedence apply. Profile-specific files do not override every other property source."
        },
        {
          question: "How do you activate a profile in a Spring Boot test?",
          answer: "Use @ActiveProfiles(\"test\") on a suitable test class, along with the required Spring test dependencies."
        },
        {
          question: "Should database passwords be stored directly in application-prod.yml?",
          answer: "Real production passwords should generally not be committed to source control. Supply them through an appropriate secret-management mechanism or secure deployment configuration."
        },
        {
          question: "Explain Spring Profiles in an interview.",
          answer: "Spring Profiles let us separate environment-specific configuration and beans. We can use application-dev.yml and application-prod.yml for different settings and activate a profile using spring.profiles.active or SPRING_PROFILES_ACTIVE. We can also use @Profile to register different service implementations for different environments. This helps the same application run in multiple environments without changing its business logic."
        }
      ]
    }
  ]
};
