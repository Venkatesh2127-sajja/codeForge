
export const springBootProjectStructure = {
  id: "spring-boot-project-structure",
  title: "Spring Boot Project Structure",
  slug: "spring-boot-project-structure",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "20 min",

  description:
    "Understand the standard structure of a Spring Boot project, the purpose of the main directories and files, and how controllers, services, repositories, entities, DTOs, configuration, and tests are organized.",

  sections: [
    {
      id: "project-structure",
      title: "Typical Project Structure",

      paragraphs: [
        "A Spring Boot project normally follows the standard Maven or Gradle project layout.",
        "The Java source code is placed under src/main/java, application resources are placed under src/main/resources, and test code is normally placed under src/test.",
        "The exact package structure can vary depending on the project's architecture, but the standard layout provides a predictable starting point."
      ],

      code: {
        language: "text",
        code: `my-spring-app/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/app/
│   │   │       ├── Application.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── exception/
│   │   │       └── config/
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application.yml
│   │       ├── static/
│   │       └── templates/
│   │
│   └── test/
│       ├── java/
│       │   └── com/example/app/
│       └── resources/
│
├── pom.xml
└── README.md`
      },

      bullets: [
        "src/main/java → application Java source code.",
        "src/main/resources → configuration and other runtime resources.",
        "src/test/java → Java test source code.",
        "src/test/resources → resources used by tests.",
        "pom.xml → Maven project configuration.",
        "README.md → project documentation."
      ]
    },

    {
      id: "main-java",
      title: "src/main/java",

      paragraphs: [
        "The src/main/java directory normally contains the application's Java source code.",
        "This is where the main Spring Boot application class and application components are placed.",
        "Packages are normally organized according to the responsibilities of the application."
      ],

      bullets: [
        "Main application class",
        "Controllers",
        "Services",
        "Repositories",
        "Entities",
        "DTOs",
        "Configuration classes",
        "Exception handlers",
        "Other application components"
      ],

      code: {
        language: "text",
        code: `src/main/java/
└── com/example/app/
    ├── Application.java
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── dto/
    ├── exception/
    └── config/`
      }
    },

    {
      id: "main-class",
      title: "Main Application Class",

      paragraphs: [
        "The main application class is normally located near the root of the application's package hierarchy.",
        "It contains the main() method and is commonly annotated with @SpringBootApplication.",
        "Placing it in the root package is useful because Spring Boot's default component scanning can discover components in its subpackages."
      ],

      code: {
        language: "java",
        code: `package com.example.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(
                Application.class,
                args
        );
    }
}`
      },

      bullets: [
        "Application.java → application entry point.",
        "@SpringBootApplication → Spring Boot application configuration.",
        "main() → Java entry point.",
        "SpringApplication.run() → bootstraps the application."
      ]
    },

    {
      id: "controller-package",
      title: "controller Package",

      paragraphs: [
        "The controller package normally contains classes responsible for handling HTTP requests and returning HTTP responses.",
        "REST controllers commonly use @RestController together with mapping annotations such as @GetMapping and @PostMapping."
      ],

      code: {
        language: "java",
        code: `package com.example.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @GetMapping("/api/employees")
    public String getEmployees() {
        return "Employee list";
    }
}`
      },

      bullets: [
        "Handles HTTP requests.",
        "Defines API endpoints.",
        "Reads request data.",
        "Returns response data.",
        "Delegates business operations to the service layer."
      ]
    },

    {
      id: "service-package",
      title: "service Package",

      paragraphs: [
        "The service package normally contains application or business logic.",
        "Services can coordinate repositories and other components to perform a complete business operation."
      ],

      code: {
        language: "java",
        code: `package com.example.app.service;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    public String getEmployees() {
        return "Employee data";
    }
}`
      },

      bullets: [
        "Contains application/business logic.",
        "Coordinates application operations.",
        "Can call repositories.",
        "Can apply business rules.",
        "Can define transaction boundaries when appropriate."
      ]
    },

    {
      id: "repository-package",
      title: "repository Package",

      paragraphs: [
        "The repository package normally contains persistence components.",
        "When using Spring Data JPA, repository interfaces can extend JpaRepository or another appropriate Spring Data repository interface."
      ],

      code: {
        language: "java",
        code: `package com.example.app.repository;

import com.example.app.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      bullets: [
        "Handles persistence operations.",
        "Provides database access through the selected data-access technology.",
        "Spring Data repositories can provide common CRUD operations.",
        "Custom queries can also be defined when required."
      ]
    },

    {
      id: "entity-package",
      title: "entity Package",

      paragraphs: [
        "The entity package commonly contains JPA entity classes that represent persistent application data.",
        "An entity is part of the persistence model and is commonly mapped to a database table."
      ],

      code: {
        language: "java",
        code: `package com.example.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String department;
}`
      },

      bullets: [
        "@Entity identifies a JPA entity.",
        "@Id identifies the primary key.",
        "Entity fields can map to database columns.",
        "Entities primarily represent persistence data."
      ]
    },

    {
      id: "dto-package",
      title: "dto Package",

      paragraphs: [
        "The DTO package can contain Data Transfer Objects used to define API request and response models.",
        "DTOs help keep the external API contract separate from the internal persistence model."
      ],

      code: {
        language: "java",
        code: `package com.example.app.dto;

public record EmployeeResponse(
        Long id,
        String name,
        String department
) {
}`
      },

      bullets: [
        "DTO → Data Transfer Object.",
        "Request DTO → represents incoming API data.",
        "Response DTO → represents outgoing API data.",
        "DTOs can prevent accidental exposure of internal entity fields."
      ]
    },

    {
      id: "exception-package",
      title: "exception Package",

      paragraphs: [
        "The exception package can contain custom application exceptions and global exception-handling components.",
        "This helps the application return consistent and meaningful error responses."
      ],

      code: {
        language: "java",
        code: `package com.example.app.exception;

public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(Long id) {
        super("Employee not found: " + id);
    }
}`
      },

      bullets: [
        "Custom exceptions represent application-specific failures.",
        "Global exception handlers can convert exceptions into HTTP responses.",
        "Error handling should avoid exposing sensitive internal details."
      ]
    },

    {
      id: "config-package",
      title: "config Package",

      paragraphs: [
        "The config package can contain application configuration classes.",
        "Examples include security configuration, custom bean configuration, Web MVC configuration, and other application-specific configuration."
      ],

      code: {
        language: "java",
        code: `package com.example.app.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    // Application-specific configuration
}`
      },

      bullets: [
        "Contains configuration classes.",
        "Can define custom Spring beans.",
        "Can customize framework behavior.",
        "The exact configuration depends on the application."
      ]
    },

    {
      id: "resources",
      title: "src/main/resources",

      paragraphs: [
        "The src/main/resources directory contains application resources and configuration files that are included in the application's runtime classpath.",
        "This directory is commonly used for Spring Boot configuration files and other resources required by the application."
      ],

      bullets: [
        "application.properties",
        "application.yml",
        "Static resources",
        "Templates",
        "SQL or other application resources when required",
        "Other classpath resources"
      ],

      code: {
        language: "text",
        code: `src/main/resources/
│
├── application.properties
├── application.yml
├── static/
└── templates/`
      }
    },

    {
      id: "application-properties",
      title: "application.properties",

      paragraphs: [
        "application.properties is a common Spring Boot configuration file.",
        "It can contain application settings such as the server port, database configuration, logging settings, and other Spring properties."
      ],

      code: {
        language: "properties",
        code: `server.port=8080

spring.application.name=employee-service

spring.datasource.url=jdbc:mysql://localhost:3306/companydb
spring.datasource.username=root
spring.datasource.password=\${DB_PASSWORD}`
      },

      bullets: [
        "server.port → configures the HTTP server port.",
        "spring.application.name → sets the application name.",
        "spring.datasource.* → can configure database connectivity.",
        "Sensitive values should normally be supplied securely rather than hard-coded."
      ]
    },

    {
      id: "application-yaml",
      title: "application.yml",

      paragraphs: [
        "Spring Boot also supports YAML configuration through application.yml.",
        "YAML can represent hierarchical configuration in a visually structured way."
      ],

      code: {
        language: "yaml",
        code: `server:
  port: 8080

spring:
  application:
    name: employee-service

  datasource:
    url: jdbc:mysql://localhost:3306/companydb
    username: root
    password: \${DB_PASSWORD}`
      },

      bullets: [
        "application.properties and application.yml are common configuration formats.",
        "Choose the format that best fits the project's conventions.",
        "Do not normally store production secrets directly in source control."
      ]
    },

    {
      id: "static",
      title: "static Directory",

      paragraphs: [
        "The static directory is used for static web resources such as CSS, JavaScript, images, and other files when the application serves them as static content.",
        "In a backend REST API, this directory may not be needed if a separate frontend application handles the user interface."
      ],

      code: {
        language: "text",
        code: `src/main/resources/static/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── images/
    └── logo.png`
      }
    },

    {
      id: "templates",
      title: "templates Directory",

      paragraphs: [
        "The templates directory is commonly used for server-side template files when using a template engine such as Thymeleaf.",
        "A pure REST API may not need this directory."
      ],

      code: {
        language: "text",
        code: `src/main/resources/templates/
│
├── home.html
├── employee.html
└── dashboard.html`
      },

      bullets: [
        "Used for server-side rendered templates.",
        "Commonly associated with template engines.",
        "Not required for a typical JSON-only REST API."
      ]
    },

    {
      id: "test-directory",
      title: "src/test",

      paragraphs: [
        "The src/test directory contains test source code and test resources.",
        "Tests are kept separate from production application code so they can be executed during development and builds without becoming part of the production application's main source structure."
      ],

      code: {
        language: "text",
        code: `src/test/
│
├── java/
│   └── com/example/app/
│       ├── EmployeeControllerTest.java
│       ├── EmployeeServiceTest.java
│       └── EmployeeRepositoryTest.java
│
└── resources/
    └── application-test.yml`
      },

      bullets: [
        "src/test/java → Java test classes.",
        "src/test/resources → test-specific resources.",
        "Tests can be organized to match production package structure.",
        "Different test types can test different application layers."
      ]
    },

    {
      id: "test-structure",
      title: "Organizing Tests",

      paragraphs: [
        "A project can organize tests according to the layer or behavior being tested."
      ],

      code: {
        language: "text",
        code: `Controller
    ↓
Controller Tests
    ↓
Verify HTTP behavior


Service
    ↓
Service Tests
    ↓
Verify business logic


Repository
    ↓
Repository Tests
    ↓
Verify persistence behavior


Integration
    ↓
Integration Tests
    ↓
Verify multiple components together`
      },

      bullets: [
        "Controller tests → request/response behavior.",
        "Service tests → business/application logic.",
        "Repository tests → persistence behavior.",
        "Integration tests → multiple components working together."
      ]
    },

    {
      id: "pom",
      title: "pom.xml",

      paragraphs: [
        "For a Maven project, pom.xml is the main project configuration file.",
        "It defines project metadata, dependencies, plugins, build configuration, and other Maven settings."
      ],

      code: {
        language: "xml",
        code: `<project>

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>employee-service</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

    </dependencies>

</project>`
      },

      bullets: [
        "groupId → identifies the project group.",
        "artifactId → identifies the project artifact.",
        "version → project version.",
        "dependencies → libraries required by the application.",
        "plugins → tools used during the Maven build lifecycle."
      ]
    },

    {
      id: "maven-vs-gradle",
      title: "Maven vs Gradle Project Structure",

      paragraphs: [
        "Spring Boot supports both Maven and Gradle as common build tools.",
        "The standard src/main and src/test layout is commonly used with both."
      ],

      code: {
        language: "text",
        code: `Maven

pom.xml


Gradle

build.gradle
or
build.gradle.kts


Both commonly use:

src/main/java
src/main/resources
src/test/java
src/test/resources`
      },

      bullets: [
        "Maven → commonly uses pom.xml.",
        "Gradle → commonly uses build.gradle or build.gradle.kts.",
        "The source/resource directory structure is largely familiar across both.",
        "The build tool controls dependency resolution and build tasks."
      ]
    },

    {
      id: "readme",
      title: "README.md",

      paragraphs: [
        "README.md provides documentation about the project.",
        "A good README can explain what the application does, how to configure it, how to run it, how to test it, and which technologies it uses."
      ],

      code: {
        language: "markdown",
        code: `# Employee Service

Spring Boot REST API for employee management.

## Technologies

- Java
- Spring Boot
- Spring Data JPA
- MySQL

## Run

mvn spring-boot:run

## API

GET /api/employees`
      },

      bullets: [
        "Project overview.",
        "Technology stack.",
        "Setup instructions.",
        "Configuration instructions.",
        "Build and run commands.",
        "API documentation or examples."
      ]
    },

    {
      id: "complete-structure",
      title: "Complete Recommended Structure",

      paragraphs: [
        "The following is a practical structure for a typical Spring Boot REST API project."
      ],

      code: {
        language: "text",
        code: `employee-service/
│
├── src/
│   │
│   ├── main/
│   │   │
│   │   ├── java/
│   │   │   └── com/example/employee/
│   │   │       │
│   │   │       ├── EmployeeApplication.java
│   │   │       │
│   │   │       ├── controller/
│   │   │       │   └── EmployeeController.java
│   │   │       │
│   │   │       ├── service/
│   │   │       │   └── EmployeeService.java
│   │   │       │
│   │   │       ├── repository/
│   │   │       │   └── EmployeeRepository.java
│   │   │       │
│   │   │       ├── entity/
│   │   │       │   └── Employee.java
│   │   │       │
│   │   │       ├── dto/
│   │   │       │   ├── EmployeeRequest.java
│   │   │       │   └── EmployeeResponse.java
│   │   │       │
│   │   │       ├── exception/
│   │   │       │   ├── EmployeeNotFoundException.java
│   │   │       │   └── GlobalExceptionHandler.java
│   │   │       │
│   │   │       └── config/
│   │   │           └── ApplicationConfig.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   │
│   └── test/
│       ├── java/
│       │   └── com/example/employee/
│       │       ├── EmployeeControllerTest.java
│       │       └── EmployeeServiceTest.java
│       │
│       └── resources/
│
├── pom.xml
└── README.md`
      },

      bullets: [
        "This structure is a common starting point, not a mandatory Spring Boot rule.",
        "Small applications can use fewer packages.",
        "Large applications may organize packages by feature instead of technical layer.",
        "The best structure depends on application size and architectural requirements."
      ]
    },

    {
      id: "layer-vs-feature",
      title: "Layered vs Feature-Based Package Structure",

      paragraphs: [
        "There is more than one valid way to organize a Spring Boot application.",
        "A traditional layered structure groups classes by technical responsibility, while a feature-based structure groups related classes around a business feature."
      ],

      code: {
        language: "text",
        code: `Layered Structure

controller/
service/
repository/
entity/
dto/


Feature-Based Structure

employee/
    EmployeeController
    EmployeeService
    EmployeeRepository
    Employee
    EmployeeRequest
    EmployeeResponse

order/
    OrderController
    OrderService
    OrderRepository
    Order
    OrderRequest
    OrderResponse`
      },

      bullets: [
        "Layered packaging is easy for beginners to understand.",
        "Feature-based packaging can keep related business functionality together.",
        "Neither structure is universally correct.",
        "Choose a structure appropriate for the application's size and team."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Project Structure Mistakes",

      bullets: [
        "Putting every class into one package.",
        "Putting business logic directly into controllers.",
        "Putting SQL or persistence logic directly into controllers.",
        "Keeping configuration values hard-coded in Java classes.",
        "Placing the main application class in a package that does not cover required components through component scanning.",
        "Mixing test code with production source code.",
        "Creating unnecessary packages for very small applications.",
        "Creating one enormous service class containing unrelated business areas.",
        "Exposing persistence entities directly when DTOs are needed for a stable API contract.",
        "Storing production secrets directly in application.properties committed to source control."
      ]
    },

    {
      id: "important-files-summary",
      title: "Main Files and Directories at a Glance",

      code: {
        language: "text",
        code: `src/main/java
→ Production Java code

src/main/resources
→ Runtime configuration/resources

src/test/java
→ Java tests

src/test/resources
→ Test resources

Application.java
→ Application entry point

controller/
→ HTTP layer

service/
→ Business/application layer

repository/
→ Persistence layer

entity/
→ Persistence model

dto/
→ API data-transfer model

exception/
→ Exception handling

config/
→ Application configuration

application.properties
→ Configuration

pom.xml
→ Maven build/dependency configuration

README.md
→ Project documentation`
      }
    },

    {
      id: "interview",
      title: "Project Structure Interview Questions",

      interviewQuestions: [
        {
          question: "Where is the main Java source code located?",
          answer:
            "Normally under src/main/java."
        },
        {
          question: "Where is application configuration usually stored?",
          answer:
            "Commonly under src/main/resources using application.properties or application.yml."
        },
        {
          question: "What is pom.xml?",
          answer:
            "It is the Maven project configuration file containing project metadata, dependencies, plugins, and build configuration."
        },
        {
          question: "Where are test classes normally placed?",
          answer:
            "Under src/test/java."
        },
        {
          question: "What is the purpose of src/main/resources?",
          answer:
            "It contains configuration files and other resources that are available on the application's runtime classpath."
        },
        {
          question: "What is the purpose of the controller package?",
          answer:
            "It normally contains classes responsible for handling HTTP requests and returning HTTP responses."
        },
        {
          question: "What is the purpose of the service package?",
          answer:
            "It normally contains application or business logic and coordinates operations between controllers, repositories, and other components."
        },
        {
          question: "What is the purpose of the repository package?",
          answer:
            "It normally contains persistence components responsible for communicating with the database."
        },
        {
          question: "What is the purpose of the entity package?",
          answer:
            "It commonly contains JPA entities that represent persistent application data."
        },
        {
          question: "What is a DTO package?",
          answer:
            "It contains Data Transfer Objects used to define data transferred across boundaries such as REST API requests and responses."
        },
        {
          question: "Why is the main application class usually placed in the root package?",
          answer:
            "Spring Boot's default component scanning starts from the package of the main application class and scans its subpackages, making application components easier to discover."
        },
        {
          question: "What is application.properties?",
          answer:
            "It is a common Spring Boot configuration file used to define application settings such as server, database, logging, and other supported configuration properties."
        },
        {
          question: "Can application.yml be used instead of application.properties?",
          answer:
            "Yes. Spring Boot supports YAML configuration through application.yml as well as properties-based configuration."
        },
        {
          question: "What is the difference between src/main/java and src/test/java?",
          answer:
            "src/main/java contains production application code, while src/test/java contains test source code."
        },
        {
          question: "What is the difference between entity and DTO?",
          answer:
            "An entity primarily represents persistent data, while a DTO represents data transferred across an application boundary such as an API request or response."
        },
        {
          question: "Is the controller-service-repository structure mandatory?",
          answer:
            "No. It is a common architectural structure, but Spring Boot does not require every application to use exactly these packages."
        },
        {
          question: "What is the difference between Maven and Gradle?",
          answer:
            "Both are build and dependency-management tools. Maven commonly uses pom.xml, while Gradle commonly uses build.gradle or build.gradle.kts."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Project Structure Questions",

      interviewQuestions: [
        {
          question:
            "Your controller contains database queries. Where should you move them?",
          answer:
            "Database access should normally be moved into a repository or appropriate persistence component, while application/business logic should be placed in the service or domain/application layer."
        },
        {
          question:
            "Your controller returns a JPA entity containing sensitive fields. What would you change?",
          answer:
            "I would consider using a response DTO so the API explicitly controls which fields are exposed."
        },
        {
          question:
            "Spring cannot find your controller bean. What package-related issue would you check?",
          answer:
            "I would check whether the controller is under the package hierarchy scanned by the main application class and whether it has the appropriate Spring stereotype annotation such as @RestController."
        },
        {
          question:
            "Where would you store the database URL for different environments?",
          answer:
            "I would use externalized Spring Boot configuration such as application properties/YAML, environment-specific configuration, or environment variables rather than hard-coding environment-specific values in Java."
        },
        {
          question:
            "Should a small Spring Boot application always have controller, service, repository, entity, DTO, config, and exception packages?",
          answer:
            "No. The structure should match the application's complexity. Adding unnecessary layers or packages can create complexity without providing value."
        },
        {
          question:
            "Your team has 50 features and hundreds of classes. Would you always keep one global controller, service, and repository package?",
          answer:
            "Not necessarily. A feature-based package structure can group related classes together and may improve maintainability for larger applications."
        },
        {
          question:
            "Where should test-specific configuration be stored?",
          answer:
            "Test-specific resources can be placed under src/test/resources, while Java test classes normally belong under src/test/java."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Reference",

      code: {
        language: "text",
        code: `PROJECT STRUCTURE

src/main/java
    ↓
Java application code

src/main/resources
    ↓
Configuration/resources

src/test/java
    ↓
Test Java code

src/test/resources
    ↓
Test resources

pom.xml
    ↓
Maven configuration


COMMON PACKAGES

controller
    ↓
HTTP

service
    ↓
Business/Application Logic

repository
    ↓
Persistence

entity
    ↓
Database/Persistence Model

dto
    ↓
API Data Transfer

exception
    ↓
Error Handling

config
    ↓
Application Configuration`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "A Spring Boot project normally follows the standard Java project layout. Production code belongs under src/main/java, application resources and configuration belong under src/main/resources, and test code belongs under src/test. Maven projects use pom.xml for dependency and build configuration."
      ],

      bullets: [
        "src/main/java → production Java code.",
        "src/main/resources → configuration and runtime resources.",
        "src/test/java → test Java code.",
        "src/test/resources → test resources.",
        "Application.java → main Spring Boot entry point.",
        "controller → HTTP request/response layer.",
        "service → application/business logic.",
        "repository → persistence layer.",
        "entity → persistence model.",
        "dto → API data-transfer model.",
        "exception → custom exceptions and exception handling.",
        "config → application configuration.",
        "application.properties/application.yml → Spring Boot configuration.",
        "pom.xml → Maven project configuration.",
        "README.md → project documentation.",
        "Layered and feature-based structures are both possible.",
        "Project structure should match application complexity.",
        "The main application class is commonly placed in the root package for component scanning."
      ]
    }
  ]
};
