
export const dependencyFlow = {
  id: "dependency-flow",

  title: "Dependency Flow",

  slug: "dependency-flow",

  topicTitle: "Spring Boot Layered Architecture",

  estimatedTime: "60 min",

  description:
    "Understand how dependencies flow between controller, service, repository, and persistence layers, how Spring builds the dependency graph, and why constructor injection is commonly preferred in Spring Boot applications.",

  sections: [
    {
      id: "dependency-definition",

      title: "What is Dependency Flow?",

      paragraphs: [
        "Dependency flow describes how application components depend on and communicate with one another.",
        "In a typical layered Spring Boot application, the controller depends on the service, and the service depends on the repository.",
        "The important idea is that a class should receive the objects it needs rather than creating those objects itself.",
        "Spring's IoC container is responsible for creating and connecting Spring-managed objects according to their dependencies."
      ],

      code: {
        language: "text",
        code: `Controller
    ↓ depends on
Service
    ↓ depends on
Repository
    ↓ depends on
Persistence Infrastructure`
      }
    },

    {
      id: "dependency-graph",

      title: "What is a Dependency Graph?",

      paragraphs: [
        "A dependency graph is a representation of which components require which other components.",
        "In a layered REST API, the graph can be visualized as Controller depending on Service and Service depending on Repository."
      ],

      code: {
        language: "text",
        code: `EmployeeController
        |
        | requires
        v
EmployeeService
        |
        | requires
        v
EmployeeRepository
        |
        | uses
        v
Spring Data JPA
        |
        v
Database`
      },

      bullets: [
        "Each arrow represents a dependency.",
        "The dependent object needs another object to perform its work.",
        "Spring resolves these dependencies when creating beans.",
        "The graph should have a clear and maintainable direction."
      ]
    },

    {
      id: "controller-dependency",

      title: "Controller Depends on Service",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(
            EmployeeService service) {

        this.service = service;
    }
}`
      },

      paragraphs: [
        "The controller does not create the EmployeeService itself. Spring provides the dependency through constructor injection.",
        "The controller can therefore focus on HTTP handling while the service handles the application operation."
      ]
    },

    {
      id: "service-dependency",

      title: "Service Depends on Repository",

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }
}`
      },

      paragraphs: [
        "EmployeeService requires EmployeeRepository to perform persistence operations.",
        "The service does not need to manually instantiate the repository. Spring Data creates the repository implementation and Spring injects it into the service."
      ]
    },

    {
      id: "repository-dependency",

      title: "Repository and Persistence Dependencies",

      paragraphs: [
        "A Spring Data repository is an interface. The application does not normally create its implementation with new EmployeeRepository(). Spring Data creates the required repository implementation and exposes it as a Spring bean.",
        "This is one reason dependency injection is powerful: application code can depend on an abstraction while the framework supplies the appropriate implementation."
      ],

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
            String email
    );
}`
      }
    },

    {
      id: "spring-container",

      title: "Spring Container Creates the Dependency Graph",

      paragraphs: [
        "Spring's IoC container creates and manages Spring beans.",
        "When Spring creates EmployeeController, it sees that the constructor requires EmployeeService.",
        "Spring resolves that dependency and supplies the appropriate bean.",
        "The same process happens when EmployeeService requires EmployeeRepository.",
        "This creates a connected object graph managed by the Spring container."
      ],

      code: {
        language: "text",
        code: `Spring Container

EmployeeRepository
       ↑
       |
EmployeeService
       ↑
       |
EmployeeController`
      }
    },

    {
      id: "bean-discovery",

      title: "How Does Spring Discover These Beans?",

      paragraphs: [
        "Spring Boot commonly discovers application components through component scanning.",
        "Annotations such as @RestController and @Service identify classes that Spring should manage as beans.",
        "Spring Data JPA also registers repository infrastructure so that repository interfaces can be injected into application components."
      ],

      code: {
        language: "text",
        code: `Application Startup
       |
       v
Component Scanning
       |
       +--> @RestController
       |
       +--> @Service
       |
       v
Spring Bean Definitions
       |
       v
Dependency Resolution
       |
       v
ApplicationContext`
      }
    },

    {
      id: "constructor-injection",

      title: "Constructor Injection",

      paragraphs: [
        "Constructor injection means dependencies are supplied through a class constructor.",
        "It makes required dependencies explicit and ensures the object receives them when it is created.",
        "In modern Spring applications, constructor injection is generally the preferred dependency injection style for required dependencies."
      ],

      code: {
        language: "java",
        code: `public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }
}`
      }
    },

    {
      id: "constructor-flow",

      title: "How Constructor Injection Works",

      code: {
        language: "text",
        code: `Spring wants to create EmployeeController
                 |
                 v
Constructor requires EmployeeService
                 |
                 v
Spring finds EmployeeService bean
                 |
                 v
EmployeeService requires EmployeeRepository
                 |
                 v
Spring finds repository bean
                 |
                 v
Repository dependency is resolved
                 |
                 v
EmployeeService is created
                 |
                 v
EmployeeController is created`
      },

      paragraphs: [
        "Spring resolves the required dependencies and constructs the objects needed to satisfy the dependency graph."
      ]
    },

    {
      id: "why-constructor",

      title: "Why Prefer Constructor Injection?",

      bullets: [
        "Dependencies are explicit.",
        "Required dependencies can be final.",
        "Objects are created in a valid dependency state.",
        "Classes are easier to unit test.",
        "Dependencies cannot be accidentally omitted during normal construction.",
        "The class does not need field-level dependency injection.",
        "The dependency graph is visible from the constructor."
      ]
    },

    {
      id: "field-injection",

      title: "Constructor Injection vs Field Injection",

      paragraphs: [
        "Spring can inject dependencies into fields using @Autowired, but constructor injection is generally preferred for required dependencies.",
        "Field injection hides dependencies inside the class and makes ordinary unit testing less convenient."
      ],

      code: {
        language: "java",
        code: `// Field injection

@Autowired
private EmployeeRepository repository;


// Constructor injection

private final EmployeeRepository repository;

public EmployeeService(
        EmployeeRepository repository) {

    this.repository = repository;
}`
      },

      bullets: [
        "Constructor injection exposes required dependencies.",
        "Constructor injection supports final fields.",
        "Constructor injection makes plain Java unit testing easier.",
        "Field injection hides the dependency list."
      ]
    },

    {
      id: "setter-injection",

      title: "What About Setter Injection?",

      paragraphs: [
        "Setter injection supplies dependencies through setter methods. It can be useful for optional dependencies or cases where a dependency genuinely needs to be changed after object construction.",
        "For required dependencies, constructor injection is usually clearer."
      ],

      code: {
        language: "java",
        code: `public class EmployeeService {

    private NotificationService notificationService;

    @Autowired
    public void setNotificationService(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }
}`
      },

      bullets: [
        "Constructor injection is generally preferred for required dependencies.",
        "Setter injection can be appropriate for optional dependencies in some designs.",
        "Choose the injection style based on the dependency's lifecycle and requirements."
      ]
    },

    {
      id: "interface-dependency",

      title: "Depending on an Interface",

      paragraphs: [
        "A service can depend on an interface instead of a concrete implementation. This reduces coupling and makes it easier to replace implementations or provide test doubles."
      ],

      code: {
        language: "java",
        code: `public interface NotificationService {

    void send(String message);
}


@Service
public class EmployeeService {

    private final NotificationService notificationService;

    public EmployeeService(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }
}`
      },

      paragraphs: [
        "If Spring has exactly one suitable implementation, it can inject that implementation. If multiple implementations exist, additional configuration such as @Qualifier or @Primary may be required."
      ]
    },

    {
      id: "qualifier",

      title: "Multiple Implementations and @Qualifier",

      paragraphs: [
        "If multiple Spring beans implement the same interface, Spring may not know which implementation should be injected. @Qualifier can identify the required bean."
      ],

      code: {
        language: "java",
        code: `@Service("emailNotification")
public class EmailNotificationService
        implements NotificationService {
}


@Service("smsNotification")
public class SmsNotificationService
        implements NotificationService {
}


@Service
public class EmployeeService {

    private final NotificationService notificationService;

    public EmployeeService(
            @Qualifier("emailNotification")
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }
}`
      }
    },

    {
      id: "primary",

      title: "Using @Primary",

      paragraphs: [
        "@Primary can mark one bean as the preferred candidate when multiple beans match a dependency."
      ],

      code: {
        language: "java",
        code: `@Primary
@Service
public class EmailNotificationService
        implements NotificationService {
}`
      },

      bullets: [
        "Use @Qualifier when a specific dependency should be selected explicitly.",
        "Use @Primary when one implementation should generally be the default.",
        "Both are useful when multiple beans implement the same interface."
      ]
    },

    {
      id: "bad-flow",

      title: "Avoid Unnecessary Reverse Dependencies",

      paragraphs: [
        "A clean layered design normally keeps the dependency direction consistent.",
        "For example, a repository should not depend on a controller because that would couple the persistence layer to the HTTP layer."
      ],

      code: {
        language: "text",
        code: `Preferred:

Controller
    ↓
Service
    ↓
Repository


Avoid:

Repository
    ↓
Controller


Also avoid:

Service
    ↓
Controller`
      }
    },

    {
      id: "dependency-direction",

      title: "Why Does Dependency Direction Matter?",

      paragraphs: [
        "Dependency direction affects coupling. If lower-level persistence components depend on HTTP controllers, a change in the web layer can force unrelated persistence code to change.",
        "Keeping dependencies moving in a clear direction makes the architecture easier to maintain."
      ],

      code: {
        language: "text",
        code: `HTTP Layer
    |
    v
Application Layer
    |
    v
Persistence Layer


Not:

Persistence Layer
    |
    v
HTTP Layer`
      }
    },

    {
      id: "dependency-inversion-preview",

      title: "Dependency Inversion Principle Preview",

      paragraphs: [
        "Dependency injection and the Dependency Inversion Principle are related concepts, but they are not identical.",
        "Dependency injection is a technique for supplying dependencies. Dependency inversion is a design principle about reducing high-level policy's direct dependency on low-level implementation details."
      ],

      code: {
        language: "text",
        code: `High-level application logic
            |
            v
       Abstraction
            |
            v
Low-level implementation`
      }
    },

    {
      id: "new-vs-injection",

      title: "Why Not Create Dependencies with new?",

      paragraphs: [
        "Manually creating dependencies with new tightly couples a class to a concrete implementation and prevents the Spring container from managing that dependency.",
        "When Spring manages a dependency, it can participate in dependency injection, configuration, lifecycle management, proxies, and other framework features."
      ],

      code: {
        language: "java",
        code: `// Tightly coupled

public class EmployeeService {

    private final EmailService emailService;

    public EmployeeService() {
        this.emailService = new EmailService();
    }
}`
      }
    },

    {
      id: "new-problem",

      title: "Problem with Manual Dependency Creation",

      code: {
        language: "text",
        code: `EmployeeService
    |
    +--> creates EmailService
             |
             +--> tightly coupled
             +--> harder to replace
             +--> harder to mock
             +--> bypasses Spring's container`
      },

      paragraphs: [
        "With dependency injection, EmployeeService declares what it needs and the container decides which managed object to provide."
      ]
    },

    {
      id: "spring-managed",

      title: "Spring-Managed Dependencies",

      paragraphs: [
        "When a dependency is managed by Spring, Spring controls its creation and lifecycle according to the bean definition and application context.",
        "This allows configuration, dependency resolution, scopes, proxies, and other framework features to participate in object creation."
      ],

      code: {
        language: "text",
        code: `ApplicationContext
       |
       +--> EmployeeController
       |
       +--> EmployeeService
       |
       +--> EmployeeRepository
       |
       +--> Other Beans`
      }
    },

    {
      id: "bean-creation-order",

      title: "Dependency Resolution During Startup",

      paragraphs: [
        "Spring does not simply create classes in arbitrary order. It resolves the dependency relationships required to create the application context.",
        "A simplified conceptual flow is to satisfy lower-level dependencies and then inject them into objects that require them.",
        "The exact startup process is more sophisticated because Spring also handles bean definitions, post-processors, proxies, lifecycle callbacks, and other infrastructure."
      ],

      code: {
        language: "text",
        code: `Repository Bean
      |
      v
Service Bean
      |
      v
Controller Bean
      |
      v
Application Ready`
      }
    },

    {
      id: "bean-scope-preview",

      title: "Dependency Flow and Bean Scope",

      paragraphs: [
        "Dependency flow is also influenced by bean scopes. By default, Spring beans are singleton-scoped, meaning the container normally maintains one shared bean instance per application context.",
        "Other scopes can be used when an application requires different lifecycle behavior."
      ],

      code: {
        language: "text",
        code: `ApplicationContext
      |
      +--> Singleton EmployeeService
      |
      +--> Singleton EmployeeRepository
      |
      +--> Singleton EmployeeController`
      }
    },

    {
      id: "circular-dependency",

      title: "What is a Circular Dependency?",

      paragraphs: [
        "A circular dependency occurs when components directly or indirectly depend on each other in a cycle.",
        "For example, if EmployeeService requires EmployeeRepository and EmployeeRepository somehow requires EmployeeService, the dependency graph contains a cycle."
      ],

      code: {
        language: "text",
        code: `EmployeeService
      |
      v
EmployeeRepository
      |
      v
EmployeeService

       ↑
       |
      Cycle`
      }
    },

    {
      id: "avoid-circular",

      title: "Why Avoid Circular Dependencies?",

      paragraphs: [
        "Circular dependencies make the architecture harder to understand and can prevent Spring from creating the application context cleanly, especially with constructor injection.",
        "The better solution is normally to redesign the responsibilities and remove the cycle rather than trying to hide the problem."
      ],

      bullets: [
        "Check whether responsibilities are placed in the wrong layer.",
        "Extract shared behavior into an appropriate component.",
        "Depend on abstractions where appropriate.",
        "Avoid making repositories depend on services.",
        "Keep the dependency direction clear."
      ]
    },

    {
      id: "complete-flow",

      title: "Complete Dependency Flow",

      code: {
        language: "text",
        code: `HTTP Client
    ↓
EmployeeController
    ↓
EmployeeService
    ↓
EmployeeRepository
    ↓
Spring Data JPA
    ↓
Hibernate
    ↓
JDBC
    ↓
MySQL`
      }
    },

    {
      id: "runtime-flow",

      title: "Dependency Flow vs Request Flow",

      paragraphs: [
        "Dependency flow and request flow are related but different concepts.",
        "Dependency flow explains which object depends on which other object. Request flow explains how an actual HTTP operation travels through those objects at runtime."
      ],

      code: {
        language: "text",
        code: `Dependency Flow

Controller
    ↓
Service
    ↓
Repository


Request Flow

Client
    ↓
HTTP
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Database`
      }
    },

    {
      id: "testing-injection",

      title: "Dependency Injection Makes Testing Easier",

      paragraphs: [
        "Because dependencies are supplied from outside the class, a unit test can provide a mock or fake dependency instead of using the real implementation."
      ],

      code: {
        language: "java",
        code: `class EmployeeServiceTest {

    private final EmployeeRepository repository =
            mock(EmployeeRepository.class);

    private final EmployeeService service =
            new EmployeeService(repository);
}`
      },

      paragraphs: [
        "This is a major practical advantage of constructor injection: the service can be tested as an ordinary Java object without requiring the complete Spring application context."
      ]
    },

    {
      id: "mocking-flow",

      title: "Testing Dependency Flow with Mockito",

      code: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @InjectMocks
    private EmployeeService service;

    @Test
    void shouldFindEmployee() {

        Employee employee =
                new Employee(
                    "Rahul",
                    "rahul@example.com",
                    "Engineering"
                );

        when(repository.findById(1L))
                .thenReturn(Optional.of(employee));

        EmployeeResponse result =
                service.getById(1L);

        assertEquals(
                "Rahul",
                result.name()
        );
    }
}`
      }
    },

    {
      id: "dependency-over-injection",

      title: "Dependency Injection vs Dependency Lookup",

      paragraphs: [
        "With dependency injection, the object receives its dependency from an external container or caller.",
        "With dependency lookup, the object actively asks a container or registry for the dependency.",
        "Spring applications commonly favor dependency injection because it keeps the consuming class focused on its own responsibilities."
      ],

      code: {
        language: "text",
        code: `Dependency Injection

EmployeeService
      |
      | receives
      v
EmployeeRepository


Dependency Lookup

EmployeeService
      |
      | asks container
      v
Find EmployeeRepository`
      }
    },

    {
      id: "dependency-principles",

      title: "Dependency Flow Principles",

      bullets: [
        "Depend on what the class needs; do not create required dependencies internally.",
        "Keep dependency direction consistent.",
        "Prefer constructor injection for required dependencies.",
        "Use interfaces when abstraction provides a real benefit.",
        "Avoid unnecessary circular dependencies.",
        "Keep controllers independent of persistence details.",
        "Keep repositories independent of HTTP concerns.",
        "Use dependency injection to improve testability.",
        "Let Spring manage Spring beans."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Dependency Injection Mistakes",

      bullets: [
        "Creating Spring-managed dependencies using new inside another Spring bean.",
        "Using field injection everywhere without considering constructor injection.",
        "Creating circular dependencies between services and repositories.",
        "Making repositories depend on controllers.",
        "Injecting the wrong implementation when multiple beans exist.",
        "Forgetting @Service or another bean-defining annotation.",
        "Putting classes outside component-scan boundaries.",
        "Creating unnecessary interfaces with no architectural benefit.",
        "Assuming dependency injection and dependency inversion are exactly the same concept.",
        "Trying to solve circular dependencies with framework workarounds instead of fixing the design."
      ]
    },

    {
      id: "missing-bean",

      title: "What Happens When a Bean Is Missing?",

      paragraphs: [
        "If Spring cannot find a suitable bean for a required constructor dependency, application startup can fail because the dependency graph cannot be completed."
      ],

      code: {
        language: "text",
        code: `EmployeeController
      |
      v
EmployeeService
      |
      v
SomeDependency
      |
      X
No suitable Spring bean

Result:
Application context cannot
create the required bean graph.`
      },

      bullets: [
        "Check whether the dependency is a Spring bean.",
        "Check component scanning.",
        "Check whether the required implementation exists.",
        "Check whether multiple candidates require @Qualifier or @Primary.",
        "Read the startup error to identify the missing dependency."
      ]
    },

    {
      id: "multiple-beans",

      title: "What Happens When Multiple Beans Match?",

      paragraphs: [
        "If a constructor dependency is an interface and multiple beans implement that interface, Spring may have more than one candidate.",
        "In that situation, the application may need @Primary or @Qualifier to identify which bean should be injected."
      ],

      code: {
        language: "text",
        code: `NotificationService
        |
        +--> EmailNotificationService
        |
        +--> SmsNotificationService

EmployeeService
        |
        +--> Which one?

Use:
@Primary

or:

@Qualifier`
      }
    },

    {
      id: "dependency-debugging",

      title: "Debugging Dependency Injection Problems",

      paragraphs: [
        "When dependency injection fails, start from the constructor mentioned in the startup error and follow the dependency chain.",
        "Do not immediately modify the code without understanding which bean Spring could not create."
      ],

      code: {
        language: "text",
        code: `Application fails
      |
      v
Read startup exception
      |
      v
Find failing bean
      |
      v
Check constructor dependency
      |
      v
Check candidate beans
      |
      +--> Missing?
      |
      +--> Multiple?
      |
      +--> Circular?
      |
      +--> Outside component scan?
      |
      v
Fix dependency graph`
      }
    },

    {
      id: "architecture-summary",

      title: "Dependency Flow in Layered Architecture",

      code: {
        language: "text",
        code: `Spring IoC Container
          |
          +-----------------------------+
          |              |              |
          v              v              v
EmployeeRepository EmployeeService EmployeeController
                         |              |
                         |              |
                         +--------------+
                                |
                           Dependencies


Normal Layer Direction:

Controller
    ↓
Service
    ↓
Repository
    ↓
Persistence`
      }
    },

    {
      id: "interview",

      title: "Dependency Flow Interview Questions",

      interviewQuestions: [
        {
          question: "What is dependency injection?",
          answer:
            "Dependency injection is a technique where an object's dependencies are supplied by an external component, such as the Spring IoC container, instead of the object creating them itself."
        },
        {
          question: "Why use constructor injection?",
          answer:
            "Constructor injection makes dependencies explicit, supports immutable dependency references, ensures required dependencies are available when the object is created, and makes unit testing easier."
        },
        {
          question: "Who creates Spring beans?",
          answer:
            "The Spring IoC container creates and manages Spring-managed beans."
        },
        {
          question: "What is the typical dependency direction?",
          answer:
            "A common layered direction is Controller → Service → Repository."
        },
        {
          question: "Why should a controller not create the service using new?",
          answer:
            "Manually creating the service tightly couples the controller to a concrete implementation and bypasses Spring's dependency management. Constructor injection allows Spring to provide the managed service bean."
        },
        {
          question:
            "What is the difference between dependency injection and dependency inversion?",
          answer:
            "Dependency injection is a technique for supplying dependencies. Dependency inversion is a design principle that encourages high-level policies to avoid being tightly coupled to low-level implementation details."
        },
        {
          question: "Why is constructor injection good for testing?",
          answer:
            "A test can directly construct the class and pass a mock or fake dependency into its constructor without starting the complete Spring application context."
        },
        {
          question: "What happens if Spring cannot find a required bean?",
          answer:
            "Application context creation can fail because Spring cannot satisfy the dependency required by the bean's constructor."
        },
        {
          question:
            "What happens if multiple beans match the same dependency?",
          answer:
            "Spring may report an ambiguity. @Primary or @Qualifier can be used to identify the desired bean."
        },
        {
          question: "What is a circular dependency?",
          answer:
            "A circular dependency occurs when two or more components depend on each other directly or indirectly, creating a cycle in the dependency graph."
        },
        {
          question: "How should circular dependencies normally be fixed?",
          answer:
            "The preferred solution is usually to redesign responsibilities and remove the dependency cycle rather than relying on framework workarounds."
        },
        {
          question: "Why should repositories not depend on controllers?",
          answer:
            "Repositories belong to the persistence layer. Depending on controllers would couple persistence to the HTTP layer and violate the intended layered dependency direction."
        },
        {
          question: "What is @Qualifier used for?",
          answer:
            "@Qualifier identifies a specific bean when multiple beans are candidates for the same dependency."
        },
        {
          question: "What is @Primary used for?",
          answer:
            "@Primary marks one bean as the preferred candidate when multiple beans match a dependency."
        },
        {
          question: "Does Spring Data create repository implementations automatically?",
          answer:
            "Spring Data provides runtime infrastructure that creates implementations for repository interfaces and registers them as beans."
        },
        {
          question: "Why should required dependencies be final with constructor injection?",
          answer:
            "A final dependency can be assigned during construction and cannot be reassigned afterward, making the object's dependency state more stable."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Dependency Questions",

      interviewQuestions: [
        {
          question:
            "Your EmployeeController creates EmployeeService using new. What is wrong with this design?",

          answer:
            "It bypasses Spring's IoC container, tightly couples the controller to a concrete implementation, and makes dependency management and testing less flexible. Constructor injection is preferred."
        },
        {
          question:
            "Your application fails at startup saying that two NotificationService beans were found. How would you fix it?",

          answer:
            "If one implementation should be the default, use @Primary. If a particular dependency needs a specific implementation, use @Qualifier."
        },
        {
          question:
            "EmployeeService depends on EmployeeRepository, but Spring says no qualifying bean is available. What would you check?",

          answer:
            "Check that the repository is correctly declared, Spring Data JPA is configured, the repository package is discovered, the entity and repository configuration is valid, and there is no component-scan or application configuration problem."
        },
        {
          question:
            "EmployeeService depends on EmployeeRepository and EmployeeRepository depends on EmployeeService. What problem exists?",

          answer:
            "There is a circular dependency. The preferred solution is to redesign the responsibilities and remove the cycle."
        },
        {
          question:
            "Why is Controller → Service → Repository preferred over Controller → Repository?",

          answer:
            "The service layer provides a dedicated place for business and application logic and keeps HTTP handling separate from persistence access."
        },
        {
          question:
            "How would you unit test EmployeeService without starting Spring?",

          answer:
            "Create a mock EmployeeRepository using Mockito and pass it through the EmployeeService constructor, or use @Mock and @InjectMocks with Mockito."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Dependency flow describes how components depend on one another.",
        "A common layered direction is Controller → Service → Repository.",
        "Spring IoC manages Spring beans.",
        "Constructor injection supplies dependencies through constructors.",
        "Constructor injection is generally preferred for required dependencies.",
        "Required constructor dependencies can be final.",
        "Field injection hides required dependencies.",
        "Setter injection can be useful for optional dependencies in some designs.",
        "@Qualifier selects a specific bean.",
        "@Primary identifies a preferred bean.",
        "Avoid unnecessary reverse dependencies.",
        "Avoid circular dependencies.",
        "Do not manually create Spring-managed dependencies with new.",
        "Dependency injection improves testability.",
        "Dependency injection is a technique; dependency inversion is a design principle.",
        "A missing bean can prevent application context creation.",
        "Multiple matching beans can cause ambiguity.",
        "Repositories should not depend on controllers.",
        "The dependency graph is created and managed by the Spring container."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "Dependency flow describes how components depend on one another in an application. In a typical Spring Boot layered architecture, the controller depends on the service and the service depends on the repository. Spring's IoC container creates and manages these beans and supplies their dependencies, commonly through constructor injection. Constructor injection makes dependencies explicit, supports final dependency fields, and improves unit testability. A clean dependency direction is Controller → Service → Repository, while reverse dependencies and circular dependencies should generally be avoided."
      ]
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      paragraphs: [
        "Remember the difference between dependency flow and request flow. Dependency flow describes the object graph: Controller depends on Service, and Service depends on Repository. Request flow describes what happens when an actual HTTP request travels through those objects.",
        "Constructor injection is one of the most important Spring interview topics. The class declares its required dependencies in its constructor, and Spring supplies the required beans when creating the object.",
        "Do not confuse dependency injection with dependency inversion. Dependency injection is the mechanism or technique used to supply dependencies. Dependency inversion is a broader software design principle.",
        "If multiple beans match one dependency, Spring may require @Primary or @Qualifier. If no suitable bean exists, the application context may fail to start.",
        "Circular dependencies are usually a design warning. Instead of trying to hide the cycle, reconsider the responsibilities of the participating components.",
        "For interviews, remember: 'Spring creates and manages beans, resolves their dependencies, and injects them into constructors. In a layered application, the usual dependency direction is Controller → Service → Repository.'"
      ]
    }
  ]
};
