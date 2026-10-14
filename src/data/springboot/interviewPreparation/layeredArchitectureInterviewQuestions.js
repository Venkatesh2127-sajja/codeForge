
export const layeredArchitectureInterviewQuestions = {
  id: 1604,
  title: "Layered Architecture Interview Questions",
  slug: "layered-architecture-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for layered architecture interviews with detailed explanations of controllers, services, repositories, entities, DTOs, dependency injection, transaction boundaries, testing, and maintainable Spring Boot application design.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "architecture",
      title: "Layered Architecture",
      paragraphs: [
        "Layered architecture is a software design approach that separates an application into layers according to their responsibilities. A typical Spring Boot REST application contains a controller layer, service layer, repository layer, and database. Model classes such as entities and DTOs support communication between these layers.",
        "The controller handles HTTP requests and responses. The service implements business rules and coordinates operations. The repository provides data-access functionality. The database stores persistent application data.",
        "This separation improves readability, testability, and maintainability. A change to an HTTP response should not normally require rewriting business rules, and a database query should not be duplicated across multiple controllers.",
        "Layered architecture is a design convention, not a requirement that every application must contain exactly three layers. Use abstractions that clarify responsibilities instead of adding unnecessary interfaces and classes."
      ],
      bullets: [
        "Controller: Handles HTTP request mapping, input binding, and response behavior.",
        "Service: Implements business rules and coordinates workflows.",
        "Repository: Reads and writes data through a persistence abstraction.",
        "Entity: Represents persisted domain data, commonly mapped to a database table through JPA.",
        "DTO: Defines the data transferred through an API or between application boundaries.",
        "Database: Persists application data.",
        "Dependency injection: Supplies required collaborators to application components."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public StudentDto getStudent(@PathVariable Long id) {
        return service.getStudent(id);
    }
}

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public StudentDto getStudent(Long id) {
        Student student = repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(id));

        return new StudentDto(student.getId(), student.getName());
    }
}

public record StudentDto(Long id, String name) {
}`
      },
      interviewQuestions: [
        {
          question: "What is layered architecture?",
          answer: "Layered architecture separates an application into layers with distinct responsibilities, such as controller, service, and repository. It reduces coupling and makes the code easier to test and maintain."
        },
        {
          question: "Why do we use layered architecture in Spring Boot?",
          answer: "It separates HTTP handling, business logic, and persistence. This improves code organization, makes testing easier, and allows changes in one responsibility to have less impact on others."
        },
        {
          question: "What belongs in the controller layer?",
          answer: "HTTP mapping, request binding, input-validation integration, and translating application results into HTTP responses. Business rules should generally remain in the service or domain layer."
        },
        {
          question: "What belongs in the service layer?",
          answer: "Business rules, workflow coordination, transaction boundaries where appropriate, and calls to repositories or external services."
        },
        {
          question: "What belongs in the repository layer?",
          answer: "Database access, entity persistence, and queries. In Spring Data JPA, repository interfaces provide common operations such as save, findById, and delete."
        },
        {
          question: "Why should a controller not contain all database logic?",
          answer: "Combining HTTP handling, business rules, and database access makes the controller difficult to test and reuse. It also causes business logic to become duplicated across endpoints."
        },
        {
          question: "Does layered architecture require exactly three layers?",
          answer: "No. Controller, service, and repository are common layers in a Spring Boot application, but larger systems may introduce domain, integration, messaging, or other layers when they provide a clear benefit."
        }
      ]
    },
    {
      id: "dependency-flow",
      title: "Dependency Flow and Dependency Injection",
      paragraphs: [
        "In a typical Spring Boot layered application, the controller depends on a service, and the service depends on a repository. This gives the controller a simple application-facing interface instead of requiring it to know database query details.",
        "Spring's dependency injection container creates and manages registered beans and supplies their dependencies. Constructor injection makes dependencies explicit and supports immutable fields and straightforward unit testing.",
        "A useful design principle is to keep dependencies directed toward the responsibility that provides the required capability. Avoid circular dependencies, where two services require each other to be constructed. Circular dependencies commonly indicate that responsibilities should be separated or coordinated through another component."
      ],
      code: {
        language: "text",
        code: `HTTP Client
    |
    v
StudentController
    |
    v
StudentService
    |
    v
StudentRepository
    |
    v
Database

Dependency injection supplies each component
with its required collaborator.`
      },
      bullets: [
        "The controller should call a service rather than construct it manually.",
        "The service should receive its repository through dependency injection.",
        "Use constructor injection for required dependencies.",
        "Keep dependencies explicit and avoid circular dependency graphs.",
        "Do not call new StudentRepositoryImpl() inside a service when Spring should manage that dependency.",
        "For complex workflows, introduce a coordinator or separate business responsibilities instead of creating mutual dependencies."
      ],
      interviewQuestions: [
        {
          question: "What is the dependency flow in a typical layered application?",
          answer: "The controller depends on the service, and the service depends on repositories or other collaborators. Spring supplies these dependencies through dependency injection."
        },
        {
          question: "What is dependency injection?",
          answer: "Dependency injection is a technique in which a component receives the objects it depends on instead of creating them itself. Spring manages this process through its application context."
        },
        {
          question: "Why is constructor injection preferred?",
          answer: "Constructor injection makes required dependencies explicit, allows fields to be final, simplifies unit testing, and helps identify missing dependencies during application startup."
        },
        {
          question: "What is a circular dependency?",
          answer: "A circular dependency occurs when components directly or indirectly depend on each other, making construction and responsibility boundaries difficult to manage. It is usually better to redesign the dependencies."
        },
        {
          question: "Can a service call another service?",
          answer: "Yes. One service can coordinate another service when that reflects the application's responsibilities. Avoid excessive service-to-service chains and circular dependencies."
        }
      ]
    },
    {
      id: "controller-layer",
      title: "Controller Layer",
      paragraphs: [
        "The controller is the entry point for HTTP requests handled by Spring MVC. It maps a URL and HTTP method to a Java handler method, binds path variables and request parameters, receives request bodies, and returns a response.",
        "A controller should remain thin. It can validate incoming request structures, invoke the appropriate service, and choose HTTP response behavior. It should not normally contain complex calculations, transaction workflows, or direct SQL queries.",
        "Spring MVC uses DispatcherServlet as its front controller. DispatcherServlet coordinates handler mapping and request processing, while argument resolvers and HTTP message converters help convert incoming data into Java values and outgoing values into response representations."
      ],
      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public StudentDto getById(@PathVariable Long id) {
        return studentService.getStudent(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentDto create(
            @RequestBody CreateStudentRequest request) {
        return studentService.createStudent(request);
    }
}`
      },
      bullets: [
        "@RestController declares a REST-oriented controller.",
        "@RequestMapping defines a base URL or request conditions.",
        "@GetMapping, @PostMapping, @PutMapping, and @DeleteMapping map HTTP methods.",
        "@PathVariable reads a value from the URI path.",
        "@RequestParam reads a query or supported request parameter.",
        "@RequestBody converts request content into a Java object.",
        "Use response DTOs rather than exposing internal entity details unnecessarily."
      ],
      interviewQuestions: [
        {
          question: "What is the role of a controller in Spring Boot?",
          answer: "The controller handles incoming HTTP requests, binds request data, invokes application services, and returns appropriate HTTP responses."
        },
        {
          question: "What is @RestController?",
          answer: "@RestController combines @Controller and @ResponseBody. Handler return values are written to the response body through configured HTTP message converters."
        },
        {
          question: "Should business logic be written in the controller?",
          answer: "Controllers may perform simple request coordination, but important business rules belong in the service or domain layer so they can be reused and tested independently of HTTP."
        },
        {
          question: "What happens when a REST request reaches Spring MVC?",
          answer: "The embedded server receives the request and passes it into Spring MVC. DispatcherServlet identifies a handler, Spring resolves its arguments, invokes the controller, and converts the result into an HTTP response."
        }
      ]
    },
    {
      id: "service-layer",
      title: "Service Layer and Business Logic",
      paragraphs: [
        "The service layer contains application workflows and business rules. For a student-management system, it might validate business requirements, check whether a student exists, prevent duplicate registrations, and coordinate persistence.",
        "A service is also a common location for transaction boundaries using @Transactional. When an operation must update multiple database records consistently, a transaction can ensure that the changes commit together or roll back when an applicable failure occurs.",
        "Not every service method needs a transaction annotation. Choose transaction boundaries based on the operation's consistency requirements. Be aware that Spring's usual proxy-based transaction mechanism has self-invocation limitations: calling another @Transactional method on the same instance does not normally trigger a new proxy interception."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public StudentDto getStudent(Long id) {
        Student student = repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(id));

        return new StudentDto(student.getId(), student.getName());
    }

    @Transactional
    public StudentDto createStudent(CreateStudentRequest request) {
        Student student = new Student();
        student.setName(request.name());

        Student saved = repository.save(student);

        return new StudentDto(saved.getId(), saved.getName());
    }
}`
      },
      bullets: [
        "@Service marks a component that holds application or business logic.",
        "@Transactional defines transaction behavior when applied through the configured transaction infrastructure.",
        "@Transactional(readOnly = true) communicates read-only intent and may allow optimizations; it is not a universal guarantee that writes are impossible.",
        "Keep business rules close to the service or domain object responsible for enforcing them.",
        "Avoid making the service a giant class that owns every business workflow.",
        "Use explicit application-level exceptions for meaningful business failures."
      ],
      interviewQuestions: [
        {
          question: "Why do we need a service layer?",
          answer: "The service layer centralizes business rules and coordinates workflows independently of HTTP handling and database implementation."
        },
        {
          question: "What is @Transactional?",
          answer: "@Transactional declares transaction semantics for a method or class. Under the configured transaction manager, it allows participating database operations to commit or roll back according to the transaction rules."
        },
        {
          question: "Where should @Transactional usually be placed?",
          answer: "A common practice is to place it on service methods representing a business operation, because the service coordinates the complete unit of work. Other placements can be appropriate when the transaction boundary is intentionally different."
        },
        {
          question: "What is the difference between @Service and @Repository?",
          answer: "@Service communicates application or business-layer intent. @Repository identifies a persistence component and participates in Spring's repository exception-translation support when applicable. Both are specialized component stereotypes."
        },
        {
          question: "Should every service method use @Transactional?",
          answer: "No. Apply transactions where atomicity and consistency requirements justify them. Read-only operations, external calls, and simple orchestration need deliberate transaction-boundary decisions."
        }
      ]
    },
    {
      id: "repository-layer",
      title: "Repository Layer and Spring Data JPA",
      paragraphs: [
        "The repository layer abstracts persistence operations. Instead of writing the same CRUD logic repeatedly, an application can extend Spring Data JPA repository interfaces and use generated implementations.",
        "JpaRepository provides common operations such as saving an entity, retrieving it by ID, deleting it, and paging through results. Spring Data can also derive queries from method names or execute explicit queries using @Query.",
        "Keep HTTP request and response formatting out of repositories. Repositories should focus on persistence concerns, while services decide how retrieved data participates in business operations."
      ],
      code: {
        language: "java",
        code: `import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    List<Student> findByNameContainingIgnoreCase(String name);
}`
      },
      bullets: [
        "JpaRepository<Student, Long> represents a repository for Student entities with Long identifiers.",
        "findById returns an Optional because a matching entity may not exist.",
        "save is commonly used for creating or updating managed entities, depending on the entity state and repository implementation.",
        "Derived query methods can express common filters without manually writing SQL.",
        "@Query supports custom JPQL or native queries when appropriate.",
        "Use pagination for large result sets instead of returning every row.",
        "Consider indexes and query plans for performance-sensitive repository methods."
      ],
      interviewQuestions: [
        {
          question: "What is the repository pattern?",
          answer: "The repository pattern abstracts data-access operations behind a defined interface, separating persistence concerns from business logic."
        },
        {
          question: "What is JpaRepository?",
          answer: "JpaRepository is a Spring Data JPA interface that provides CRUD operations and additional JPA-related features, including flushing and pagination and sorting through its inherited repository contracts."
        },
        {
          question: "What is the difference between CrudRepository and JpaRepository?",
          answer: "CrudRepository provides fundamental CRUD operations. JpaRepository extends repository capabilities with JPA-oriented functionality and inherits additional paging and sorting support through its repository hierarchy."
        },
        {
          question: "Why does findById return Optional?",
          answer: "The requested record may not exist. Optional makes the possibility of absence explicit so the caller can handle it instead of assuming a result is always present."
        },
        {
          question: "Should SQL queries be written in the controller?",
          answer: "No. Persistence logic belongs in repositories or a dedicated data-access component. Controllers should coordinate HTTP requests with application services."
        }
      ]
    },
    {
      id: "entity-vs-dto",
      title: "Entity vs DTO vs Model",
      paragraphs: [
        "An entity is a persistence-oriented object commonly mapped to a database table using JPA annotations such as @Entity and @Id. It participates in persistence operations and may contain relationships to other entities.",
        "A DTO is a data-transfer object that defines the fields exchanged across a boundary. A request DTO describes accepted input, and a response DTO describes output. DTOs help prevent internal database structure from becoming an accidental public API contract.",
        "The word model is broader and depends on context. It can refer to a domain model, a view model, an API model, or a persistence model. During interviews, explain which meaning is intended instead of treating every model as an entity."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    protected Student() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

public record StudentDto(Long id, String name) {
}

public record CreateStudentRequest(String name) {
}`
      },
      bullets: [
        "Entity: Represents persisted state and participates in ORM mapping.",
        "Request DTO: Defines input accepted from a client.",
        "Response DTO: Defines information returned to a client.",
        "Domain model: Represents business concepts and rules; it may or may not be the same class as a JPA entity.",
        "Mapping: Converts data between entities, DTOs, and domain objects.",
        "Do not expose passwords, internal flags, or persistence-only fields just because they exist on an entity."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between an entity and a DTO?",
          answer: "An entity represents persisted data and is managed through the persistence layer. A DTO defines data exchanged across an application boundary, such as an HTTP request or response."
        },
        {
          question: "Why should entities not always be returned directly from controllers?",
          answer: "Entities can expose internal fields, persistence relationships, and implementation details. Direct serialization can also trigger lazy-loading issues or recursive relationship serialization. DTOs give the API an explicit contract."
        },
        {
          question: "What is a domain model?",
          answer: "A domain model represents business concepts, their state, relationships, and rules. Depending on the design, domain objects may be separate from JPA entities or may share the same classes."
        },
        {
          question: "Do we need a separate DTO for every entity?",
          answer: "No. Create DTOs when they clarify an API contract, protect internal details, or support different input and output needs. Simple applications should avoid needless mapping layers."
        },
        {
          question: "How do you convert an entity into a DTO?",
          answer: "Use explicit mapping code, constructors, static factory methods, or a mapping library. Choose a consistent approach that makes exposed fields clear and easy to test."
        }
      ]
    },
    {
      id: "validation-and-exceptions",
      title: "Validation and Exception Handling Across Layers",
      paragraphs: [
        "Request validation and business validation solve related but different problems. Request validation checks the structure and basic constraints of incoming data, while business validation checks whether an operation is allowed under the application's rules.",
        "For example, @NotBlank can ensure a student name is not empty, while the service may check whether the student can be registered under a particular business rule. Both forms of validation are important.",
        "Exceptions should be handled at the boundary that can translate them meaningfully. Services can raise application exceptions such as StudentNotFoundException, while @RestControllerAdvice maps those exceptions to suitable HTTP responses."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.constraints.NotBlank;

public record CreateStudentRequest(
        @NotBlank(message = "Student name is required")
        String name
) {
}

// In a controller method:
// public StudentDto create(
//     @Valid @RequestBody CreateStudentRequest request) {
//     return studentService.createStudent(request);
// }

// In a service method:
// Student student = repository.findById(id)
//     .orElseThrow(() -> new StudentNotFoundException(id));`
      },
      bullets: [
        "Validate basic request shape at the API boundary.",
        "Enforce business invariants in the service or domain layer.",
        "Use meaningful exception types for expected application failures.",
        "Map exceptions into consistent API error responses.",
        "Do not leak SQL, stack traces, credentials, or internal implementation details.",
        "Keep validation and error responses consistent across endpoints."
      ],
      interviewQuestions: [
        {
          question: "Where should validation happen in a layered application?",
          answer: "Validate external request constraints at the API boundary using Bean Validation, and enforce business invariants in the service or domain layer. The exact placement depends on the rule's responsibility."
        },
        {
          question: "What is the difference between validation and business logic?",
          answer: "Validation often checks whether input has an acceptable shape or value, while business logic determines whether an operation is valid under domain rules. Some rules overlap, so choose the layer that owns the invariant."
        },
        {
          question: "Where should application exceptions be converted into HTTP status codes?",
          answer: "A centralized web exception handler, commonly implemented with @RestControllerAdvice and @ExceptionHandler, is a suitable place to translate application exceptions into HTTP responses."
        },
        {
          question: "How should a missing student be handled?",
          answer: "The service can raise a StudentNotFoundException when the repository returns an empty Optional. A centralized exception handler can map that exception to a 404 response."
        }
      ]
    },
    {
      id: "testing-layers",
      title: "Unit Testing and Integration Testing",
      paragraphs: [
        "Layered architecture helps testing because each component has a defined responsibility. A service unit test can mock its repository and focus on business behavior without requiring an actual database.",
        "Controller tests can verify request mappings, validation, status codes, and JSON responses. Integration tests exercise multiple components together and may include the actual persistence configuration or a test database.",
        "Tests should focus on observable behavior. Avoid testing private implementation details when a public method or HTTP request can verify the same requirement."
      ],
      code: {
        language: "java",
        code: `import java.util.Optional;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Test
    void returnsStudentDtoWhenStudentExists() {
        StudentRepository repository =
                mock(StudentRepository.class);

        Student student = new Student();
        student.setName("Ravi");

        when(repository.findById(1L))
                .thenReturn(Optional.of(student));

        StudentService service = new StudentService(repository);

        StudentDto result = service.getStudent(1L);

        assertEquals("Ravi", result.name());
        verify(repository).findById(1L);
    }
}`
      },
      bullets: [
        "Unit test: Tests one component in isolation, commonly with mocks.",
        "Controller test: Verifies HTTP mapping, validation, status codes, and response bodies.",
        "Integration test: Verifies collaboration between multiple real application components.",
        "Repository test: Verifies persistence queries and mapping against a suitable test database.",
        "Use test data that makes the expected behavior clear.",
        "Test success cases, missing records, invalid input, and relevant business-rule failures."
      ],
      interviewQuestions: [
        {
          question: "How do you unit-test a service?",
          answer: "Instantiate the service with mocked collaborators, invoke its public methods, and assert return values, exceptions, and important interactions."
        },
        {
          question: "Why mock a repository in a service unit test?",
          answer: "Mocking isolates the service's business behavior from database setup and query execution. Repository behavior can be tested separately through repository or integration tests."
        },
        {
          question: "What is the difference between unit and integration testing?",
          answer: "Unit tests focus on a component in isolation. Integration tests verify that multiple components or infrastructure elements work together."
        },
        {
          question: "Does layered architecture automatically make code testable?",
          answer: "No. It creates clearer boundaries that can improve testability, but components still need appropriate responsibilities, manageable dependencies, and testable design."
        }
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Layered Architecture Mistakes",
      paragraphs: [
        "Layered architecture is useful when the layers maintain clear responsibilities. Merely creating controller, service, and repository packages does not guarantee good design if all the business logic still lives in controllers or services simply forward calls without adding value.",
        "A maintainable design keeps responsibilities focused, avoids circular dependencies, handles transactions intentionally, and exposes stable API contracts. Introduce additional abstractions when they solve a real problem rather than following a class-count rule."
      ],
      bullets: [
        "Fat controller: A controller contains business rules, database calls, and complex workflows.",
        "Anemic forwarding service: A service only forwards every repository call without providing meaningful application behavior; this can be appropriate for simple CRUD, but should be evaluated rather than prohibited.",
        "God service: One service owns unrelated business responsibilities.",
        "Entity leakage: Persistence entities are exposed directly without considering the API contract.",
        "Circular dependency: Services depend on each other in a cycle.",
        "Unclear transaction boundary: Related database changes are not coordinated as one business operation when atomicity is required.",
        "Over-abstraction: Interfaces and mapping classes are added without a practical benefit.",
        "Repository misuse: HTTP concerns or business workflows are implemented in persistence classes.",
        "Uncontrolled API response: Internal fields or sensitive data are exposed unintentionally."
      ],
      interviewQuestions: [
        {
          question: "What is a fat controller?",
          answer: "A fat controller contains excessive business logic, persistence operations, and workflow coordination. Moving those responsibilities to appropriate services or domain components makes the application easier to test and maintain."
        },
        {
          question: "What is a God service?",
          answer: "A God service is a class that handles too many unrelated responsibilities. Splitting it along clear business boundaries can improve cohesion and reduce coupling."
        },
        {
          question: "Is it always wrong for a service to contain only one repository call?",
          answer: "No. Simple CRUD applications may legitimately have thin services. The goal is clear responsibilities and useful boundaries, not forcing unnecessary business logic into every service."
        },
        {
          question: "Can a service access two repositories?",
          answer: "Yes. A business operation may require data from multiple repositories. The service can coordinate them and use a transaction when related database updates need atomicity."
        },
        {
          question: "How can you improve an application with circular dependencies?",
          answer: "Identify the responsibilities causing the cycle, separate shared logic into an appropriate component, or introduce a coordinator that depends on both collaborators without making them depend on each other."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "Quick Revision Notes",
      paragraphs: [
        "For interviews, explain each layer by its responsibility and then describe the dependency flow. A typical request enters the controller, moves into a service, accesses a repository, and may read or write database records. The service returns a result, which the controller exposes through an API DTO and HTTP response."
      ],
      bullets: [
        "Controller: HTTP requests and responses.",
        "Service: Business logic and workflow coordination.",
        "Repository: Data access and persistence.",
        "Entity: Persistence-oriented representation.",
        "DTO: Request or response data contract.",
        "Dependency injection: Supplies collaborators to components.",
        "@RestController: REST controller behavior.",
        "@Service: Application or business component.",
        "@Repository: Persistence component.",
        "@Entity: JPA-persisted entity.",
        "@Transactional: Defines transaction behavior.",
        "@Valid: Triggers supported request validation.",
        "@RestControllerAdvice: Centralized web exception handling.",
        "Constructor injection: Explicit and test-friendly dependency wiring.",
        "Unit testing: Test one component in isolation.",
        "Integration testing: Test collaboration between components.",
        "Good design: High cohesion, manageable coupling, clear responsibilities."
      ],
      interviewQuestions: [
        {
          question: "Explain layered architecture in a Spring Boot project in 30 seconds.",
          answer: "I separate the application into controller, service, and repository layers. The controller handles HTTP requests, the service implements business logic and transaction boundaries, and the repository handles database access. DTOs define the API contract, while entities represent persisted data. This separation improves maintainability and testability."
        },
        {
          question: "Explain the flow when a React frontend requests a student.",
          answer: "React sends a GET request to the Spring Boot API. The controller receives the request and calls the service. The service retrieves the student through the repository, maps the result to a DTO, and returns it. Spring MVC serializes the DTO into JSON for the React frontend."
        },
        {
          question: "Why do you use DTOs and constructor injection?",
          answer: "DTOs control the data exchanged with clients and separate the API contract from persistence entities. Constructor injection makes dependencies explicit, supports immutable fields, and simplifies unit testing."
        },
        {
          question: "What are the most important principles of layered architecture?",
          answer: "Keep responsibilities focused, direct dependencies clearly, centralize business rules, define transaction boundaries intentionally, avoid exposing internal persistence details, and test each component at the appropriate level."
        }
      ]
    }
  ]
};
