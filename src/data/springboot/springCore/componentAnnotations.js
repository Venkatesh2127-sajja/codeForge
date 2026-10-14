
export const componentAnnotations = {
  id: "component-annotations",
  title: "Component Annotations",
  slug: "component-annotations",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "40 min",

  description:
    "Understand Spring stereotype annotations including @Component, @Service, @Repository, @Controller, and @RestController, with component scanning, dependency injection, practical Spring Boot examples, common mistakes, and interview questions.",

  sections: [
    {
      id: "what-are-component-annotations",
      title: "1. What Are Component Annotations?",

      paragraphs: [
        "In a Spring application, a bean is an object whose creation, configuration, and lifecycle are managed by the Spring IoC container. Component annotations help Spring identify classes that should become beans.",
        "The most common stereotype annotations are @Component, @Service, @Repository, @Controller, and @RestController. They communicate the intended responsibility of a class and help organize an application into logical layers.",
        "For example, an online shopping application might have a ProductController to receive HTTP requests, a ProductService to implement business rules, and a ProductRepository to access the database. Spring can create these objects and inject their dependencies when the classes are configured correctly.",
        "Adding an annotation alone does not guarantee that a class becomes a bean. Spring must discover the class through component scanning or register it through another mechanism."
      ],

      bullets: [
        "Bean: an object managed by the Spring container.",
        "Stereotype annotation: an annotation that identifies a class's role in an application.",
        "Component scanning: the process Spring uses to discover annotated classes in configured packages.",
        "Dependency injection: the process of supplying an object's required dependencies."
      ]
    },

    {
      id: "component-scanning",
      title: "2. How Component Scanning Works",

      paragraphs: [
        "Spring component scanning searches configured packages for eligible classes annotated with stereotypes such as @Component, @Service, @Repository, and @Controller. Spring Boot applications commonly enable component scanning through @SpringBootApplication.",
        "@SpringBootApplication combines configuration, auto-configuration, and component-scanning capabilities. By default, component scanning starts from the package containing the application class and includes its subpackages.",
        "When Spring discovers a component, it registers a bean definition. During application context initialization, Spring uses bean definitions to create and configure the required objects, resolve dependencies, and manage their lifecycle.",
        "If a component is located outside the scanned package hierarchy, Spring might not discover it. You can reorganize packages or configure scanning explicitly with @ComponentScan."
      ],

      code: {
        language: "java",
        code: `package com.example.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
}`
      },

      bullets: [
        "Place the main application class in a root package such as com.example.shop.",
        "Place controllers, services, and repositories in subpackages such as com.example.shop.controller, com.example.shop.service, and com.example.shop.repository.",
        "Use @ComponentScan only when the default package arrangement does not meet your needs.",
        "Do not put the application class in a narrow subpackage if it must scan sibling packages."
      ]
    },

    {
      id: "component",
      title: "3. @Component — General-Purpose Component",

      paragraphs: [
        "@Component is the general-purpose Spring stereotype annotation. It marks a class as a candidate for Spring bean registration through component scanning.",
        "Use it for application components that do not fit a more specific stereotype, such as a formatter, helper, mapper, or utility service that needs Spring-managed dependencies.",
        "Spring does not automatically make a class a bean merely because the class exists. Annotating it with @Component and ensuring that it is discovered by scanning allows Spring to manage it.",
        "The @Service, @Repository, and @Controller annotations are specializations of @Component. They express more specific roles while retaining component-registration behavior."
      ],

      code: {
        language: "java",
        code: `package com.example.shop.util;

import org.springframework.stereotype.Component;

@Component
public class EmailFormatter {

    public String formatWelcomeMessage(String name) {
        return "Welcome, " + name + "!";
    }
}`
      },

      bullets: [
        "Use @Component for general-purpose Spring-managed classes.",
        "The default bean name is usually the class name with its first character converted to lowercase, such as emailFormatter.",
        "A component can receive dependencies through constructor injection.",
        "The class must be in a package included in component scanning, unless registered another way."
      ]
    },

    {
      id: "service",
      title: "4. @Service — Business Logic Layer",

      paragraphs: [
        "@Service is a specialization of @Component that identifies a class as a service-layer component. It is commonly used for business rules, application workflows, and coordination between repositories or external services.",
        "For example, an OrderService might validate an order, calculate its total, check business conditions, and coordinate saving the order. Keeping these responsibilities in a service prevents controllers from becoming overloaded with business logic.",
        "@Service does not automatically make every method transactional, asynchronous, or secured. Those behaviors require their own configuration or annotations, such as @Transactional or @Async, when appropriate.",
        "Using @Service improves readability because another developer can understand the class's intended role from its annotation."
      ],

      code: {
        language: "java",
        code: `package com.example.shop.service;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

    public String placeOrder(String productName) {
        if (productName == null || productName.isBlank()) {
            throw new IllegalArgumentException(
                "Product name is required"
            );
        }

        return "Order placed for " + productName;
    }
}`
      },

      bullets: [
        "Business rules belong in the service layer.",
        "Services commonly coordinate repositories and other application services.",
        "Controllers should delegate business operations to services.",
        "Use constructor injection when a service depends on other beans."
      ]
    },

    {
      id: "repository",
      title: "5. @Repository — Data Access Layer",

      paragraphs: [
        "@Repository is a specialization of @Component that identifies a persistence or data-access component. It is commonly used for classes that interact with databases or perform other persistence operations.",
        "The annotation communicates that the class belongs to the data-access layer. In Spring's persistence exception-translation infrastructure, eligible repository beans can have certain persistence-specific exceptions translated into Spring's DataAccessException hierarchy.",
        "Spring Data JPA repository interfaces are usually discovered and implemented by Spring Data infrastructure. You normally declare an interface extending JpaRepository rather than writing an implementation class and annotating it with @Repository yourself.",
        "A repository should focus on data access rather than HTTP request handling or unrelated business workflows."
      ],

      code: {
        language: "java",
        code: `package com.example.shop.repository;

import com.example.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    // Spring Data derives the query from the method name.
    java.util.List<Product> findByNameContainingIgnoreCase(
        String name
    );
}`
      },

      bullets: [
        "Use @Repository for custom data-access classes when component scanning is appropriate.",
        "Spring Data repository interfaces are normally registered by Spring Data repository scanning.",
        "Persistence exceptions may be translated when the required exception-translation infrastructure applies.",
        "Keep SQL, persistence operations, and data-access queries out of controllers."
      ]
    },

    {
      id: "controller",
      title: "6. @Controller — Spring MVC Controller",

      paragraphs: [
        "@Controller identifies a class that handles web requests in Spring MVC. Its methods commonly receive HTTP requests and return view names or model-and-view information.",
        "In a traditional server-rendered application, a controller might return the name of a Thymeleaf template. Spring MVC uses the configured view-resolution mechanism to locate and render that view.",
        "@Controller does not automatically mean that every returned string is an HTTP response body. Without @ResponseBody, a returned string is generally interpreted as a view name for a typical MVC handler method.",
        "Use @Controller when the primary responsibility is handling web requests and returning rendered views."
      ],

      code: {
        language: "java",
        code: `package com.example.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to the shop");
        return "home";
    }
}`
      },

      bullets: [
        "The example assumes a configured view technology such as Thymeleaf.",
        "The returned value home is a logical view name, not automatically the text displayed to the browser.",
        "Use Model to supply data to a view.",
        "Use @ResponseBody on an individual method when its return value should be written to the HTTP response body."
      ]
    },

    {
      id: "rest-controller",
      title: "7. @RestController — REST API Controller",

      paragraphs: [
        "@RestController is used for controllers whose handler methods typically return response data such as JSON. It combines @Controller semantics with @ResponseBody behavior.",
        "With @RestController, Spring MVC writes the handler method's return value to the HTTP response body through an appropriate message converter. For example, a Java object can be serialized as JSON when the relevant converter is configured.",
        "A REST controller should generally receive and validate requests, delegate business operations to a service, and return an appropriate response. It should not contain all business logic or database code.",
        "A class-level @RestController makes response-body behavior the default for its handler methods. You do not normally need to add @ResponseBody to every method."
      ],

      code: {
        language: "java",
        code: `package com.example.shop.controller;

import com.example.shop.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/api/orders/message")
    public String getOrderMessage() {
        return orderService.placeOrder("Keyboard");
    }
}`
      },

      bullets: [
        "A request to GET /api/orders/message returns response-body data.",
        "In a typical Spring Boot REST setup, strings and Java objects are written using suitable HTTP message converters.",
        "A Java object returned from a REST controller is commonly serialized as JSON.",
        "Use @RequestBody for request payloads and @PathVariable or @RequestParam for URL values when appropriate."
      ]
    },

    {
      id: "complete-layered-example",
      title: "8. Complete Example — Controller, Service, and Repository",

      paragraphs: [
        "The following example demonstrates how stereotype annotations work together in a layered Spring Boot application. The controller receives an HTTP request, the service handles the application operation, and the repository provides database access.",
        "Spring creates the required beans and injects ProductService into ProductController. Spring Data JPA supplies an implementation of ProductRepository at runtime.",
        "For this example, assume that a Product entity is already defined and mapped with a primary key. The code focuses on the relationship between the layers rather than the entity definition."
      ],

      code: {
        language: "java",
        code: `// ProductRepository.java
package com.example.shop.repository;

import com.example.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {
}

// ProductService.java
package com.example.shop.service;

import com.example.shop.entity.Product;
import com.example.shop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

// ProductController.java
package com.example.shop.controller;

import com.example.shop.entity.Product;
import com.example.shop.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}`
      },

      bullets: [
        "GET /api/products invokes ProductController.getAllProducts().",
        "The controller delegates the operation to ProductService.",
        "ProductService calls ProductRepository.findAll().",
        "Spring Data JPA executes the database operation and returns the results.",
        "Spring MVC serializes the returned list as JSON when the entity and response configuration support it."
      ]
    },

    {
      id: "annotation-comparison",
      title: "9. Comparison of Common Stereotype Annotations",

      paragraphs: [
        "All five annotations help identify Spring-managed components, but their intended responsibilities differ. Choosing the most specific annotation makes the application's architecture easier to understand.",
        "@Component is the general-purpose option. Use @Service, @Repository, and the controller annotations to express a class's role more precisely."
      ],

      code: {
        language: "text",
        code: `@Component
    General-purpose Spring component

@Service
    Business and application logic

@Repository
    Persistence and data access

@Controller
    Spring MVC controller, commonly returning views

@RestController
    Spring MVC controller with response-body behavior`
      },

      bullets: [
        "@Service, @Repository, and @Controller are specialized forms of @Component.",
        "@RestController combines @Controller and @ResponseBody semantics.",
        "These annotations do not replace dependency injection; Spring still needs to discover or register the beans.",
        "The annotations express architectural intent, but they do not automatically enforce strict layer boundaries."
      ]
    },

    {
      id: "component-vs-bean",
      title: "10. @Component vs. @Bean",

      paragraphs: [
        "@Component is placed on a class so that component scanning can discover it. @Bean is placed on a method, usually inside a @Configuration class, to explicitly declare the object that method returns as a Spring bean.",
        "Use @Component when you own the class and want it discovered through component scanning. Use @Bean when you need explicit construction logic or want to register an object from a third-party library that you cannot annotate.",
        "Both approaches can register objects in the Spring container. Choose the one that best fits the construction requirements and configuration style."
      ],

      code: {
        language: "java",
        code: `// Component-based registration
import org.springframework.stereotype.Component;

@Component
public class WelcomeMessage {

    public String getMessage() {
        return "Welcome";
    }
}

// Explicit bean registration
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class MessageConfiguration {

    @Bean
    WelcomeMessage welcomeMessage() {
        return new WelcomeMessage();
    }
}`
      },

      bullets: [
        "The two snippets are alternative registration examples; do not register the same class twice without a reason.",
        "@Component works with component scanning.",
        "@Bean explicitly registers the object returned by a configuration method.",
        "@Bean is especially useful for configuring third-party classes."
      ]
    },

    {
      id: "bean-names-and-duplicates",
      title: "11. Bean Names and Duplicate Registration",

      paragraphs: [
        "Spring normally derives a bean name from the class name by lowercasing its first character. For example, ProductService commonly becomes productService.",
        "You can specify a bean name using the value attribute of a stereotype annotation. This can be useful when multiple beans implement the same interface and you need to identify them by name.",
        "Accidentally registering the same class through component scanning and an explicit @Bean method can create ambiguity or bean-definition conflicts, depending on the names and configuration. Keep bean registration intentional."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;

@Component("primaryEmailFormatter")
public class EmailFormatter {

    public String format(String message) {
        return "[EMAIL] " + message;
    }
}`
      },

      bullets: [
        "The explicit bean name in this example is primaryEmailFormatter.",
        "Use @Qualifier when a dependency must select a particular bean.",
        "Do not rely on parameter names as the only way to resolve important bean-selection decisions.",
        "If startup reports an ambiguous dependency, inspect the candidate bean definitions and their qualifiers."
      ]
    },

    {
      id: "dependency-injection",
      title: "12. Constructor Injection with Stereotype Annotations",

      paragraphs: [
        "Stereotype annotations register components, while dependency injection connects those components. Constructor injection is generally preferred for required dependencies because it makes the dependencies explicit and allows fields to be final.",
        "If a class has one constructor, Spring can use it for dependency injection without requiring @Autowired on that constructor in modern Spring applications.",
        "When multiple beans implement the same dependency type, Spring may need additional information, such as @Qualifier or @Primary, to decide which bean to inject."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
class NotificationSender {

    public void send(String message) {
        System.out.println("Sending: " + message);
    }
}

@Service
class AccountService {

    private final NotificationSender notificationSender;

    public AccountService(NotificationSender notificationSender) {
        this.notificationSender = notificationSender;
    }

    public void registerAccount() {
        notificationSender.send("Account created");
    }
}`
      },

      bullets: [
        "Spring manages NotificationSender because it is a discovered component.",
        "Spring injects NotificationSender into AccountService through its constructor.",
        "The final field cannot be reassigned after construction.",
        "Constructor injection makes unit testing easier because dependencies can be supplied directly."
      ]
    },

    {
      id: "common-mistakes",
      title: "13. Common Mistakes and Troubleshooting",

      paragraphs: [
        "A frequent mistake is adding @Service or @Repository but placing the class outside the configured component-scan packages. In this situation, Spring cannot inject the missing bean because it was never discovered through that scan.",
        "Another common mistake is confusing @Controller and @RestController. A normal MVC controller often returns a view name, whereas a REST controller normally writes return values into the response body.",
        "Putting business rules and database access directly inside a controller can make the application harder to test and maintain. Delegate these responsibilities to the appropriate layer.",
        "A class can also be registered through explicit configuration rather than component scanning. Therefore, when a bean is missing, inspect both scanning configuration and other bean-registration mechanisms."
      ],

      bullets: [
        "No qualifying bean: check the annotation, package scanning, active profiles, and configuration conditions.",
        "Multiple matching beans: consider @Qualifier, @Primary, or a more explicit injection design.",
        "Unexpected view name: check whether you intended @RestController or @ResponseBody.",
        "Bean-definition conflict: check for duplicate component scanning and @Bean registration.",
        "Circular dependency: review the dependency design instead of immediately adding setters or enabling circular references.",
        "Do not annotate every class indiscriminately; only register classes that need to be Spring-managed."
      ]
    },

    {
      id: "best-practices",
      title: "14. Best Practices",

      paragraphs: [
        "Use stereotype annotations to communicate the responsibility of each class. This makes the codebase easier for developers to navigate and helps keep the application organized.",
        "Prefer constructor injection for required dependencies. Keep controllers focused on HTTP concerns, services focused on application or business logic, and repositories focused on persistence.",
        "Keep component packages under a clear root package when using Spring Boot's default component scanning. Add explicit scanning configuration only when it is necessary.",
        "Use DTOs for API request and response contracts when exposing data externally. Returning JPA entities directly can expose internal persistence structure or cause serialization and lazy-loading problems.",
        "Remember that annotations express intent and enable framework behavior; they do not automatically guarantee good architecture, correct validation, secure endpoints, or transaction boundaries."
      ],

      bullets: [
        "Choose the most specific stereotype that matches the class's responsibility.",
        "Prefer constructor injection over field injection.",
        "Avoid putting business logic in controllers.",
        "Use appropriate validation, transaction management, and security separately.",
        "Test service logic with unit tests and test web endpoints with Spring MVC test support where appropriate."
      ]
    },

    {
      id: "interview",
      title: "15. Component Annotation Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is @Component in Spring?",
          answer:
            "@Component is a general-purpose stereotype annotation that marks a class as a candidate for Spring bean registration through component scanning."
        },
        {
          question: "2. What is a Spring bean?",
          answer:
            "A Spring bean is an object managed by the Spring IoC container. Spring can create it, inject its dependencies, apply lifecycle callbacks, and manage its configured scope."
        },
        {
          question: "3. What is component scanning?",
          answer:
            "Component scanning is the process of searching configured packages for eligible annotated classes and registering their bean definitions. Spring Boot commonly enables it through @SpringBootApplication."
        },
        {
          question: "4. What is the difference between @Component and @Service?",
          answer:
            "@Component is a general-purpose stereotype. @Service is a specialization of @Component that communicates that the class belongs to the service or business-logic layer."
        },
        {
          question: "5. What is the difference between @Service and @Repository?",
          answer:
            "@Service identifies business or application logic, while @Repository identifies persistence and data-access components. Eligible repository beans can also participate in persistence exception translation."
        },
        {
          question: "6. What is @Controller?",
          answer:
            "@Controller identifies a Spring MVC controller. Its handler methods commonly return view names or model-and-view information in server-rendered applications."
        },
        {
          question: "7. What is @RestController?",
          answer:
            "@RestController combines @Controller semantics with @ResponseBody behavior. Its handler return values are written to the HTTP response body through suitable message converters."
        },
        {
          question: "8. What is the difference between @Controller and @RestController?",
          answer:
            "@Controller is commonly used for MVC handlers that return views. @RestController makes response-body behavior the default, which is useful for REST APIs."
        },
        {
          question: "9. Are @Service and @Repository specializations of @Component?",
          answer:
            "Yes. Both are specialized stereotype annotations built on @Component. @Controller is also a specialization of @Component."
        },
        {
          question: "10. Does adding @Component always create a bean?",
          answer:
            "No. The class must be discovered by component scanning or registered through another bean-registration mechanism. Package boundaries, filters, profiles, and conditions can affect registration."
        },
        {
          question: "11. What is the default bean name for ProductService?",
          answer:
            "The default name is usually productService, following the conventional rule of lowercasing the first character of the class name."
        },
        {
          question: "12. How can we specify a custom bean name?",
          answer:
            "A stereotype annotation can specify a name, for example @Component(\"customFormatter\"). An @Bean method can also use an explicit bean name."
        },
        {
          question: "13. What is the difference between @Component and @Bean?",
          answer:
            "@Component is placed on a class for component scanning. @Bean is placed on a configuration method that explicitly registers the object returned by that method."
        },
        {
          question: "14. Can a Spring service inject a repository?",
          answer:
            "Yes. If the repository is registered as a Spring bean, Spring can inject it into the service, preferably through constructor injection."
        },
        {
          question: "15. Why is constructor injection recommended?",
          answer:
            "It makes required dependencies explicit, supports final fields, simplifies unit testing, and helps reveal dependency-design problems."
        },
        {
          question: "16. Why might Spring report that no qualifying bean exists?",
          answer:
            "The class may lack the appropriate registration, fall outside component scanning, be excluded by a condition or profile, or not be registered by the relevant framework infrastructure."
        },
        {
          question: "17. What happens if two beans match the same dependency type?",
          answer:
            "Spring may report an ambiguous dependency. Use @Qualifier to select a specific bean or @Primary to designate a preferred candidate when that matches the design."
        },
        {
          question: "18. Does @Service automatically enable @Transactional?",
          answer:
            "No. @Service identifies the component's role. Transaction behavior must be configured separately, commonly with @Transactional and transaction-management infrastructure."
        },
        {
          question: "19. Does @Repository automatically execute SQL?",
          answer:
            "No. The annotation identifies a data-access component. SQL execution depends on the code or persistence framework used, such as Spring Data JPA."
        },
        {
          question: "20. Where should business logic be written?",
          answer:
            "Business and application logic generally belongs in the service layer. Controllers should handle HTTP concerns, and repositories should focus on data access."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "16. Quick Revision Notes",

      paragraphs: [
        "Remember the main purpose of each stereotype annotation and how component scanning makes annotated classes available for dependency injection."
      ],

      bullets: [
        "@Component — general-purpose Spring-managed component.",
        "@Service — business or application logic.",
        "@Repository — data-access or persistence component.",
        "@Controller — Spring MVC controller, commonly used for view-based responses.",
        "@RestController — controller with response-body behavior by default.",
        "@SpringBootApplication — includes component-scanning capability starting from the application's package by default.",
        "@Component and @Bean — two different ways to register beans.",
        "Constructor injection — preferred approach for required dependencies.",
        "Missing bean — check scanning packages and bean-registration configuration.",
        "Multiple matching beans — consider @Qualifier or @Primary.",
        "Stereotype annotations express architectural roles; they do not automatically implement every concern associated with those layers."
      ]
    }
  ]
};
