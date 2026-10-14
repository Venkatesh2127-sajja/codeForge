
export const firstSpringBootApplication = {
  id: "first-spring-boot-application",
  title: "First Spring Boot Application",
  slug: "first-spring-boot-application",
  topicTitle: "Spring Boot Fundamentals",
  estimatedTime: "25 min",

  description:
    "Build your first Spring Boot application, understand the project structure and application startup process, create a REST endpoint, test it, and understand the important annotations involved.",

  sections: [
    {
      id: "project-overview",
      title: "What We Are Going to Build",

      paragraphs: [
        "In this lesson, we will create a very small Spring Boot application and expose our first REST endpoint.",
        "The application will start a Spring Boot context, start the embedded web server, listen on port 8080, and respond to a GET request.",
        "This is the basic foundation for larger Spring Boot REST API applications."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | GET /hello
   v
Spring Boot Application
   |
   v
HelloController
   |
   v
"Hello Spring Boot"`
      },

      bullets: [
        "Create a Spring Boot project.",
        "Create the main application class.",
        "Start the application.",
        "Create a REST controller.",
        "Create a GET endpoint.",
        "Test the endpoint.",
        "Understand the startup flow."
      ]
    },

    {
      id: "project-structure",
      title: "Basic Project Structure",

      paragraphs: [
        "A typical small Spring Boot application can be organized into packages for the main application class, controllers, services, repositories, entities, and DTOs.",
        "For this first application, we only need the main application class and one controller."
      ],

      code: {
        language: "text",
        code: `demo/
|
+-- src/
|   |
|   +-- main/
|       |
|       +-- java/
|       |   |
|       |   +-- com/example/demo/
|       |       |
|       |       +-- DemoApplication.java
|       |       |
|       |       +-- controller/
|       |           |
|       |           +-- HelloController.java
|       |
|       +-- resources/
|           |
|           +-- application.properties
|
+-- pom.xml`
      },

      bullets: [
        "DemoApplication.java → main Spring Boot application class.",
        "HelloController.java → REST controller.",
        "application.properties → application configuration.",
        "pom.xml → Maven project and dependency configuration."
      ]
    },

    {
      id: "dependencies",
      title: "Required Dependency",

      paragraphs: [
        "For this REST example, the application needs Spring Web support.",
        "When using Spring Initializr, select the Spring Web dependency.",
        "Spring Boot starters provide the dependencies commonly required for a particular application feature."
      ],

      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>`
      },

      bullets: [
        "spring-boot-starter-web provides common Spring web dependencies.",
        "It is commonly used for Spring MVC REST APIs.",
        "The application can use annotations such as @RestController and @GetMapping.",
        "For a Maven project, dependencies are declared in pom.xml."
      ]
    },

    {
      id: "main-class",
      title: "Create the Main Application Class",

      paragraphs: [
        "The main application class is the starting point of the Spring Boot application.",
        "It contains the main() method, which is the standard Java entry point.",
        "The @SpringBootApplication annotation tells Spring Boot that this class is the primary application configuration and startup class."
      ],

      code: {
        language: "java",
        code: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                DemoApplication.class,
                args
        );
    }
}`
      },

      bullets: [
        "main() is the Java application entry point.",
        "@SpringBootApplication identifies the Spring Boot application class.",
        "SpringApplication.run() starts the Spring Boot application.",
        "The package of the main class is important for component scanning."
      ]
    },

    {
      id: "spring-boot-application",
      title: "Understanding @SpringBootApplication",

      paragraphs: [
        "@SpringBootApplication is a convenience annotation used on the main Spring Boot application class.",
        "Conceptually, it combines @SpringBootConfiguration, @EnableAutoConfiguration, and @ComponentScan.",
        "This allows the application to use configuration, auto-configuration, and component scanning from a single annotation."
      ],

      code: {
        language: "java",
        code: `@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(
                DemoApplication.class,
                args
        );
    }
}`
      },

      bullets: [
        "@SpringBootConfiguration → identifies the application configuration class.",
        "@EnableAutoConfiguration → enables Spring Boot auto-configuration.",
        "@ComponentScan → scans for Spring-managed components.",
        "Using one annotation makes the main application class concise."
      ]
    },

    {
      id: "component-scanning",
      title: "How Component Scanning Finds the Controller",

      paragraphs: [
        "Spring needs to discover the HelloController so that it can create and manage it as a Spring bean.",
        "By default, component scanning starts from the package containing the main application class and scans its subpackages.",
        "This is why placing the main class in a suitable root package is important."
      ],

      code: {
        language: "text",
        code: `com.example.demo
       |
       +-- DemoApplication
       |
       +-- controller
       |     |
       |     +-- HelloController
       |
       +-- service
       |
       +-- repository
       |
       +-- entity

@ComponentScan
       |
       v
Find Spring components
       |
       v
Create Spring-managed beans`
      },

      bullets: [
        "The main class is commonly placed in the root package.",
        "Subpackages can be discovered automatically.",
        "@RestController is a Spring component.",
        "Spring creates and manages the controller bean."
      ]
    },

    {
      id: "controller",
      title: "Create a REST Controller",

      paragraphs: [
        "A REST controller receives HTTP requests and returns response data.",
        "The @RestController annotation identifies the class as a REST controller."
      ],

      code: {
        language: "java",
        code: `package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {

        return "Hello Spring Boot";
    }
}`
      },

      bullets: [
        "@RestController → identifies the REST controller.",
        "@GetMapping → maps an HTTP GET request.",
        "hello() → executes when GET /hello is requested.",
        "The returned String becomes the response body."
      ]
    },

    {
      id: "endpoint-mapping",
      title: "Understanding @GetMapping",

      paragraphs: [
        "@GetMapping maps an HTTP GET request to a controller method.",
        "In this example, /hello is the endpoint path."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/hello")
public String hello() {
    return "Hello Spring Boot";
}`
      },

      code: {
        language: "text",
        code: `HTTP Method
    |
    v
GET
    +
URL
    |
    v
/hello
    |
    v
hello()
    |
    v
"Hello Spring Boot"`
      },

      paragraphs: [
        "When a client sends GET /hello, Spring MVC finds the method mapped to that request and invokes it."
      ]
    },

    {
      id: "run-application",
      title: "Run the Application",

      paragraphs: [
        "Start the Spring Boot application from the main method or your IDE.",
        "By default, a Spring Boot web application commonly starts on port 8080 unless the port has been changed through configuration.",
        "When the application starts, Spring creates the application context and initializes the required infrastructure.",
        "For a web application using the usual Spring Boot servlet setup, the embedded servlet container starts as part of the application."
      ],

      code: {
        language: "text",
        code: `Application started
        ↓
SpringApplication.run()
        ↓
Spring ApplicationContext
        ↓
Component scanning
        ↓
Auto-configuration
        ↓
Embedded Server
        ↓
Port 8080
        ↓
Application ready`
      },

      bullets: [
        "The Java main() method executes.",
        "SpringApplication.run() starts Spring Boot.",
        "The application context is created.",
        "Spring discovers and creates required beans.",
        "Auto-configuration is applied where appropriate.",
        "The embedded web server starts.",
        "The application begins accepting requests."
      ]
    },

    {
      id: "spring-application-run",
      title: "What Does SpringApplication.run() Do?",

      paragraphs: [
        "SpringApplication.run() bootstraps the Spring Boot application.",
        "It creates and refreshes the application context, applies Spring Boot configuration, initializes beans, and starts the application infrastructure.",
        "For a web application, the process also results in the web server being started."
      ],

      code: {
        language: "java",
        code: `SpringApplication.run(
        DemoApplication.class,
        args
);`
      },

      code: {
        language: "text",
        code: `SpringApplication.run()
        |
        v
Create application context
        |
        v
Load configuration
        |
        v
Apply auto-configuration
        |
        v
Scan and create beans
        |
        v
Start web infrastructure
        |
        v
Application ready`
      },

      bullets: [
        "Starts the Spring Boot application.",
        "Creates the application context.",
        "Loads configuration.",
        "Initializes Spring beans.",
        "Starts required application infrastructure.",
        "Starts the web server for a web application."
      ]
    },

    {
      id: "endpoint",
      title: "First REST Endpoint",

      code: {
        language: "text",
        code: `GET /hello

Response:

Hello Spring Boot`
      },

      paragraphs: [
        "Open a browser, Postman, or another HTTP client and send a GET request to the endpoint."
      ],

      output: `GET http://localhost:8080/hello

HTTP/1.1 200 OK

Hello Spring Boot`,

      bullets: [
        "localhost → your local machine.",
        "8080 → default HTTP port for a typical Spring Boot web application.",
        "/hello → controller endpoint.",
        "200 OK → successful request."
      ]
    },

    {
      id: "request-flow",
      title: "Complete Request Flow",

      paragraphs: [
        "It is important to understand what happens after you enter the URL in a browser or send the request from Postman."
      ],

      code: {
        language: "text",
        code: `Browser / Postman
       |
       | GET /hello
       v
Embedded Tomcat
       |
       v
DispatcherServlet
       |
       v
Spring MVC Mapping
       |
       v
HelloController
       |
       v
hello()
       |
       v
"Hello Spring Boot"
       |
       v
HTTP Response
       |
       v
Browser / Postman`
      },

      bullets: [
        "The client sends GET /hello.",
        "The embedded server receives the request.",
        "Spring MVC processes the request.",
        "Spring finds the matching controller method.",
        "hello() executes.",
        "The returned String becomes the response body.",
        "The client receives the response."
      ]
    },

    {
      id: "annotations",
      title: "Important Annotations",

      bullets: [
        "@SpringBootApplication — identifies the main Spring Boot application class and enables important Boot configuration behavior.",
        "@RestController — identifies a controller whose handler methods commonly return response bodies.",
        "@GetMapping — maps HTTP GET requests to a controller method."
      ],

      code: {
        language: "text",
        code: `@SpringBootApplication
        ↓
Application startup/configuration

@RestController
        ↓
REST controller

@GetMapping("/hello")
        ↓
GET /hello endpoint`
      }
    },

    {
      id: "change-port",
      title: "Changing the Default Port",

      paragraphs: [
        "If port 8080 is already being used, the application can be configured to use another port.",
        "Spring Boot supports externalized configuration for server settings."
      ],

      code: {
        language: "properties",
        code: `server.port=9090`
      },

      output: `Application URL:

http://localhost:9090/hello`,

      bullets: [
        "The default port is commonly 8080.",
        "server.port changes the HTTP port.",
        "Changing the port does not change the controller mapping."
      ]
    },

    {
      id: "test-with-postman",
      title: "Test the Endpoint with Postman",

      paragraphs: [
        "Postman can be used to test the endpoint without building a frontend application."
      ],

      code: {
        language: "text",
        code: `Method:
GET

URL:
http://localhost:8080/hello

Body:
No body required

Expected status:
200 OK

Expected response:
Hello Spring Boot`
      },

      bullets: [
        "Select GET.",
        "Enter http://localhost:8080/hello.",
        "Send the request.",
        "Verify that the status is 200 OK.",
        "Verify that the response body is Hello Spring Boot."
      ]
    },

    {
      id: "test-with-browser",
      title: "Test the Endpoint in a Browser",

      paragraphs: [
        "Because this endpoint uses GET and returns simple text, you can also test it directly from a browser."
      ],

      code: {
        language: "text",
        code: `http://localhost:8080/hello`
      },

      output: `Hello Spring Boot`,

      bullets: [
        "Start the application first.",
        "Open the URL in a browser.",
        "The browser sends a GET request.",
        "Spring maps the request to hello().",
        "The response appears in the browser."
      ]
    },

    {
      id: "maven-run",
      title: "Run the Application with Maven",

      paragraphs: [
        "A Maven-based Spring Boot application can also be started from the command line."
      ],

      code: {
        language: "bash",
        code: `mvn spring-boot:run`
      },

      output: `Spring Boot application starts
Embedded web server starts
Application listens on port 8080`,

      bullets: [
        "Run the command from the project directory.",
        "Maven resolves the project dependencies.",
        "Spring Boot starts the application.",
        "Stop the application with Ctrl+C in the terminal."
      ]
    },

    {
      id: "package-and-run",
      title: "Build and Run the JAR",

      paragraphs: [
        "The application can be packaged into an executable JAR and then started using the Java runtime."
      ],

      code: {
        language: "bash",
        code: `mvn clean package

java -jar target/demo-0.0.1-SNAPSHOT.jar`
      },

      bullets: [
        "mvn clean package builds the application.",
        "The JAR is generated under the target directory.",
        "java -jar starts the packaged Spring Boot application.",
        "The embedded server starts for the web application."
      ]
    },

    {
      id: "common-errors",
      title: "Common Errors in the First Application",

      paragraphs: [
        "When building the first Spring Boot application, a few configuration and coding mistakes are especially common."
      ],

      bullets: [
        "Port 8080 is already in use → change server.port or stop the process using the port.",
        "404 Not Found → verify the URL and controller mapping.",
        "Controller not detected → verify that the controller package is under the component-scan base package.",
        "Application fails during startup → inspect the startup stack trace for the first meaningful configuration error.",
        "Missing @RestController → the class may not behave as the intended REST controller.",
        "Missing web dependency → annotations such as @GetMapping may not have the required web infrastructure available.",
        "Wrong HTTP method → GET /hello will not match a POST-only endpoint.",
        "Wrong package structure → the main application class should normally be placed in a root package above its components."
      ]
    },

    {
      id: "controller-package",
      title: "Why Package Structure Matters",

      paragraphs: [
        "Spring Boot's default component scanning behavior starts from the package of the main application class and scans subpackages.",
        "For this reason, placing DemoApplication in com.example.demo and HelloController in com.example.demo.controller is a common and convenient structure."
      ],

      code: {
        language: "text",
        code: `com.example.demo
        |
        +-- DemoApplication
        |
        +-- controller
              |
              +-- HelloController`
      },

      bullets: [
        "Main class package → com.example.demo.",
        "Controller package → com.example.demo.controller.",
        "controller is a subpackage of the main package.",
        "Spring can discover the controller through component scanning."
      ]
    },

    {
      id: "first-application-summary",
      title: "What We Built",

      code: {
        language: "text",
        code: `Spring Boot Project
        |
        +-- DemoApplication
        |       |
        |       +-- @SpringBootApplication
        |
        +-- HelloController
                |
                +-- @RestController
                |
                +-- @GetMapping("/hello")
                        |
                        v
                 "Hello Spring Boot"`
      },

      paragraphs: [
        "We created a Spring Boot application with one REST controller and one GET endpoint.",
        "This simple application demonstrates the core startup and request-processing concepts used in much larger Spring Boot applications."
      ],

      bullets: [
        "Application starts through main().",
        "SpringApplication.run() bootstraps Spring Boot.",
        "@SpringBootApplication configures the application.",
        "Spring discovers the controller.",
        "@RestController exposes REST response behavior.",
        "@GetMapping maps the GET request.",
        "The client receives the response."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What does @SpringBootApplication do?",
          answer:
            "It is a convenience annotation that combines important Spring Boot configuration annotations, including Spring Boot configuration, auto-configuration, and component scanning."
        },
        {
          question: "What does SpringApplication.run() do?",
          answer:
            "It bootstraps the Spring Boot application, creates and refreshes the application context, initializes required beans and infrastructure, and starts the application."
        },
        {
          question: "What does @RestController do?",
          answer:
            "It marks a class as a REST controller where handler methods typically return data directly as the HTTP response body."
        },
        {
          question: "What does @GetMapping do?",
          answer:
            "It maps an HTTP GET request to a controller method."
        },
        {
          question: "What is the default Spring Boot port?",
          answer:
            "For a typical Spring Boot web application, the default HTTP port is 8080 unless configured differently."
        },
        {
          question: "Why is the main application class usually placed in the root package?",
          answer:
            "Because Spring Boot's default component scanning starts from the package of the main application class and scans its subpackages, making components under that package discoverable."
        },
        {
          question: "What happens when you call GET /hello?",
          answer:
            "The request reaches the embedded web server, Spring MVC finds the controller method mapped to GET /hello, invokes hello(), and returns the method's result as the HTTP response body."
        },
        {
          question: "What is the role of the embedded server?",
          answer:
            "The embedded server accepts HTTP connections for the Spring Boot web application and passes requests into the Spring web infrastructure."
        },
        {
          question: "Can the default port be changed?",
          answer:
            "Yes. For example, server.port=9090 in application.properties changes the configured HTTP port to 9090."
        },
        {
          question: "What happens if the requested endpoint does not exist?",
          answer:
            "Spring MVC cannot find a matching handler for the request, and the application normally returns a 404 Not Found response."
        },
        {
          question: "What is component scanning?",
          answer:
            "Component scanning is the process by which Spring discovers classes registered as components, such as controllers and services, and creates Spring-managed beans for them."
        },
        {
          question: "Is @RestController required for every Spring Boot application?",
          answer:
            "No. It is required only when you want to define REST controller classes using that annotation. Spring Boot applications can perform many other types of work."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You started the application but GET /hello returns 404. What would you check?",
          answer:
            "Check that the application is running, the URL is correct, the controller contains @GetMapping(\"/hello\"), the HTTP method is GET, and the controller is discovered by component scanning."
        },
        {
          question:
            "The application fails because port 8080 is already in use. What can you do?",
          answer:
            "Stop the process using port 8080 or configure another port such as server.port=9090."
        },
        {
          question:
            "Why is HelloController not being detected by Spring?",
          answer:
            "One common reason is that the controller is outside the default component-scan package. Place it under the package of the main application class or explicitly configure component scanning when necessary."
        },
        {
          question:
            "A frontend sends POST /hello but the controller only has @GetMapping(\"/hello\"). What happens?",
          answer:
            "The GET mapping does not match the POST request, so the request will not be handled by that method. The client should use GET or the controller must define an appropriate POST mapping."
        },
        {
          question:
            "Why can you access the application using localhost:8080?",
          answer:
            "localhost refers to the local machine, and 8080 is the default HTTP port used by a typical Spring Boot web application unless the port has been changed."
        },
        {
          question:
            "What happens internally when the Spring Boot application starts?",
          answer:
            "The main method invokes SpringApplication.run(), Spring Boot creates the application context, loads configuration, applies applicable auto-configuration, discovers and initializes beans, and starts the web infrastructure for a web application."
        },
        {
          question:
            "Why should you not put the controller in an unrelated package outside the application package without configuration?",
          answer:
            "Because the default component scan may not discover it. Components are normally placed under the main application's package hierarchy."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Reference",

      code: {
        language: "text",
        code: `Main Class

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(
                DemoApplication.class,
                args
        );
    }
}


Controller

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot";
    }
}


Run

mvn spring-boot:run


Test

GET http://localhost:8080/hello


Response

200 OK

Hello Spring Boot`
      },

      bullets: [
        "@SpringBootApplication → application startup/configuration.",
        "SpringApplication.run() → bootstraps the application.",
        "@RestController → REST controller.",
        "@GetMapping → GET endpoint.",
        "8080 → default HTTP port for a typical Spring Boot web application.",
        "/hello → endpoint path."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "A Spring Boot application starts from a Java main() method that calls SpringApplication.run(). The @SpringBootApplication annotation enables important Spring Boot behavior, including configuration, auto-configuration, and component scanning. A class annotated with @RestController can expose REST endpoints, and @GetMapping can map a GET request to a Java method."
      ],

      bullets: [
        "Create a Spring Boot project with Spring Web for this REST example.",
        "Create the main application class.",
        "Add @SpringBootApplication.",
        "Call SpringApplication.run().",
        "Create a class annotated with @RestController.",
        "Use @GetMapping to create a GET endpoint.",
        "Run the application.",
        "The typical default HTTP port is 8080.",
        "Test GET http://localhost:8080/hello.",
        "The controller method returns the response body.",
        "Keep application components under the main application's package hierarchy for default component scanning.",
        "Use application.properties or application.yml to customize configuration.",
        "Use mvn spring-boot:run for convenient Maven-based startup.",
        "Package the application and use java -jar for executable-JAR deployment."
      ]
    }
  ]
};
