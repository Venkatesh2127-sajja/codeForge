
export const serviceLayer = {
  id: "service-layer",
  title: "Service Layer",
  slug: "service-layer",
  topicTitle: "Spring Boot Layered Architecture",
  estimatedTime: "35 min",

  description:
    "Learn why the service layer exists, where business logic belongs, how services coordinate repositories and external dependencies, how transactions work at the service boundary, and how service classes improve application design and testability.",

  sections: [
    {
      id: "service-definition",
      title: "What is the Service Layer?",

      paragraphs: [
        "The service layer contains application logic and business operations.",
        "It sits between the controller and data-access layer in a common Spring Boot architecture.",
        "The service receives an operation from the controller, applies the required rules, coordinates data access, and returns the result.",
        "A service normally represents meaningful application operations rather than simply exposing every database method."
      ],

      code: {
        language: "text",
        code: `Controller
    ↓
Service
    ↓
Repository
    ↓
Database`
      },

      bullets: [
        "Controller → handles HTTP/API concerns.",
        "Service → coordinates application and business operations.",
        "Repository → handles persistence.",
        "DTO → represents API input/output.",
        "Entity → represents persistent/domain state."
      ]
    },

    {
      id: "why-service",
      title: "Why Do We Need a Service Layer?",

      paragraphs: [
        "Without a service layer, controllers can become responsible for business rules, database operations, transformations, transactions, and external service calls.",
        "As the application grows, this creates large controllers and duplicated logic.",
        "The service layer gives the application a dedicated place for use-case and business logic.",
        "It also provides a useful boundary for transactions and unit testing."
      ],

      code: {
        language: "text",
        code: `Without Service

Controller
 ├── Validation
 ├── Business rules
 ├── Database calls
 ├── Mapping
 └── External API calls


With Service

Controller
    ↓
Service
    ↓
Repository / External Services`
      }
    },

    {
      id: "basic-service",
      title: "Basic Service",

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    public String getEmployee() {
        return "Employee";
    }
}`
      },

      paragraphs: [
        "@Service is a specialization of Spring's component model and allows Spring to discover the class as a bean during component scanning.",
        "Once registered as a bean, the service can be injected into controllers or other application components."
      ],

      bullets: [
        "@Service is a Spring stereotype annotation.",
        "Spring creates and manages the service bean.",
        "The service can receive dependencies through dependency injection.",
        "A service should have a clear application responsibility."
      ]
    },

    {
      id: "service-bean",
      title: "Service as a Spring Bean",

      paragraphs: [
        "When component scanning discovers a class annotated with @Service, Spring registers it as a bean in the ApplicationContext.",
        "Other Spring-managed components can then receive that service through dependency injection."
      ],

      code: {
        language: "text",
        code: `Spring ApplicationContext
          |
          +---- EmployeeController
          |
          +---- EmployeeService
          |
          +---- EmployeeRepository`
      }
    },

    {
      id: "repository-dependency",
      title: "Service Using a Repository",

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }

    public Employee getEmployee(Long id) {

        return repository.findById(id)
                .orElseThrow();
    }
}`
      },

      paragraphs: [
        "The service does not need to know the SQL implementation details. It asks the repository for the employee.",
        "The repository handles persistence while the service decides what the retrieved data means for the application."
      ]
    },

    {
      id: "constructor-injection",
      title: "Constructor Injection in Services",

      paragraphs: [
        "Constructor injection makes required service dependencies explicit.",
        "It also makes service classes easier to unit test because mocked dependencies can be passed directly to the constructor."
      ],

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

      bullets: [
        "Dependencies are visible in the constructor.",
        "Dependencies can be final.",
        "The service cannot be created without required dependencies.",
        "Unit tests can provide mocks directly."
      ]
    },

    {
      id: "business-rule",
      title: "Business Logic in the Service",

      paragraphs: [
        "Suppose the application does not allow two employees to use the same email address.",
        "The rule is a business/application rule, so the service is an appropriate place to coordinate that check.",
        "The database should still enforce uniqueness because application checks alone are not sufficient to guarantee database integrity under concurrent requests."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse create(
        EmployeeCreateRequest request) {

    if (repository.existsByEmail(
            request.email())) {

        throw new IllegalArgumentException(
                "Email already exists"
        );
    }

    Employee employee = new Employee();

    employee.setName(request.name());
    employee.setEmail(request.email());

    Employee saved =
            repository.save(employee);

    return mapToResponse(saved);
}`
      }
    },

    {
      id: "business-vs-validation",
      title: "Validation vs Business Rules",

      paragraphs: [
        "Not every rule belongs to the same place.",
        "Bean Validation is useful for input constraints such as required fields and email format.",
        "Business rules describe what the application allows and are commonly coordinated by the service or domain layer.",
        "Database constraints protect data integrity at the persistence boundary."
      ],

      code: {
        language: "text",
        code: `Request DTO
   ↓
@NotBlank
@Email
@Size
   ↓
Input validation

Service / Domain
   ↓
Business rules

Database
   ↓
Unique
Not Null
Foreign Key
Check constraints`
      }
    },

    {
      id: "service-method",
      title: "Think in Terms of Use Cases",

      paragraphs: [
        "A useful way to design services is around application operations or use cases rather than simply creating methods for every database operation.",
        "For an employee system, examples might include creating an employee, updating an employee, finding an employee, and changing an employee's department.",
        "A service method should represent a meaningful operation from the application's perspective."
      ],

      code: {
        language: "java",
        code: `createEmployee()
getEmployee()
getAllEmployees()
updateEmployee()
deleteEmployee()
changeDepartment()
assignEmployeeToProject()`
      }
    },

    {
      id: "use-case-example",
      title: "Service Method as a Use Case",

      paragraphs: [
        "Consider a changeDepartment operation. The service may need to load an employee, verify that the employee exists, verify that the target department exists, apply the business rule, and persist the change.",
        "The controller should not coordinate all of these steps itself."
      ],

      code: {
        language: "java",
        code: `@Transactional
public EmployeeResponse changeDepartment(
        Long employeeId,
        Long departmentId) {

    Employee employee =
            employeeRepository.findById(employeeId)
                    .orElseThrow(
                        () -> new EmployeeNotFoundException(
                            "Employee not found"
                        )
                    );

    Department department =
            departmentRepository.findById(departmentId)
                    .orElseThrow(
                        () -> new DepartmentNotFoundException(
                            "Department not found"
                        )
                    );

    employee.changeDepartment(
            department.getName()
    );

    return mapToResponse(employee);
}`
      }
    },

    {
      id: "multiple-repositories",
      title: "Service Using Multiple Repositories",

      paragraphs: [
        "A business operation may require data from multiple repositories.",
        "This is one reason the service layer is useful: it can coordinate several persistence operations as one application use case."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
}`
      },

      bullets: [
        "One service can depend on multiple repositories.",
        "Use multiple repositories when a use case genuinely requires them.",
        "Too many dependencies may indicate that the service contains too many responsibilities."
      ]
    },

    {
      id: "service-mapping",
      title: "DTO Mapping in the Service",

      paragraphs: [
        "Services commonly coordinate conversion between request DTOs, entities, and response DTOs.",
        "For larger applications, this mapping can be delegated to a dedicated mapper."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse create(
        EmployeeCreateRequest request) {

    Employee employee = new Employee();

    employee.setName(request.name());
    employee.setEmail(request.email());
    employee.setDepartment(
            request.department()
    );

    Employee saved =
            repository.save(employee);

    return new EmployeeResponse(
            saved.getId(),
            saved.getName(),
            saved.getEmail(),
            saved.getDepartment()
    );
}`
      }
    },

    {
      id: "service-transaction",
      title: "Service and Transactions",

      paragraphs: [
        "Transactions are commonly placed at the service or application-operation boundary because a business operation may involve multiple database actions that should succeed or fail together.",
        "For example, a transfer operation may update two accounts. If the second update fails, the first update should normally also be rolled back."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transferEmployee(
        Long employeeId,
        Long departmentId) {

    // multiple related operations
}`
      }
    },

    {
      id: "transaction-example",
      title: "Complete Transaction Example",

      paragraphs: [
        "The service can define a transaction around a complete business operation.",
        "The repository methods called inside the operation participate in the transaction."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void transfer(
        Long sourceId,
        Long targetId,
        BigDecimal amount) {

    Account source =
            accountRepository.findById(sourceId)
                    .orElseThrow();

    Account target =
            accountRepository.findById(targetId)
                    .orElseThrow();

    source.debit(amount);
    target.credit(amount);
}`
      },

      bullets: [
        "The service represents the application operation.",
        "The transaction covers the complete operation.",
        "Repositories perform the persistence operations.",
        "If a runtime failure causes rollback, the transaction can undo the database changes."
      ]
    },

    {
      id: "read-only-service",
      title: "Read-Only Service Operations",

      paragraphs: [
        "Read operations can be marked read-only when appropriate.",
        "readOnly = true communicates the intent of the transaction and may allow provider/database optimizations, but exact behavior depends on the environment."
      ],

      code: {
        language: "java",
        code: `@Transactional(readOnly = true)
public EmployeeResponse getEmployee(
        Long id) {

    Employee employee =
            repository.findById(id)
                    .orElseThrow();

    return mapToResponse(employee);
}`
      }
    },

    {
      id: "service-exception",
      title: "Exception Handling in the Service",

      paragraphs: [
        "The service should communicate meaningful application failures through appropriate exceptions.",
        "For example, if an employee does not exist, the service can throw an EmployeeNotFoundException.",
        "A global exception handler can later translate that exception into a consistent HTTP response."
      ],

      code: {
        language: "java",
        code: `public Employee getEmployee(Long id) {

    return repository.findById(id)
            .orElseThrow(
                () -> new EmployeeNotFoundException(
                    "Employee not found: " + id
                )
            );
}`
      },

      code: {
        language: "text",
        code: `Service
   ↓
EmployeeNotFoundException
   ↓
@RestControllerAdvice
   ↓
HTTP 404`
      }
    },

    {
      id: "service-external",
      title: "Service and External Services",

      paragraphs: [
        "A service can coordinate external dependencies such as email providers, payment systems, notification services, or third-party APIs.",
        "The controller should not normally contain the implementation details of those integrations."
      ],

      code: {
        language: "text",
        code: `Controller
     ↓
EmployeeService
     ├── EmployeeRepository
     └── EmailService
              ↓
         Email Provider`
      }
    },

    {
      id: "service-security",
      title: "Service and Authorization",

      paragraphs: [
        "Authentication and general authorization can be handled by Spring Security, while business-specific authorization may need to be checked in the service or domain layer.",
        "For example, a user may be authenticated but still not be allowed to modify another user's resource."
      ],

      code: {
        language: "java",
        code: `public void updateEmployee(
        Long employeeId,
        Long currentUserId) {

    Employee employee =
            repository.findById(employeeId)
                    .orElseThrow();

    if (!employee.belongsTo(currentUserId)) {
        throw new AccessDeniedException(
                "Not allowed"
        );
    }

    // continue update
}`
      },

      bullets: [
        "Authentication answers who the user is.",
        "Authorization answers what the user can do.",
        "Resource ownership rules may belong in the service/domain layer.",
        "Do not rely only on frontend checks."
      ]
    },

    {
      id: "service-testing",
      title: "Why Services Are Easy to Unit Test",

      paragraphs: [
        "A service can often be tested independently by mocking its repository dependency.",
        "This allows developers to test business behavior without requiring a real database for every unit test."
      ],

      code: {
        language: "java",
        code: `@Mock
private EmployeeRepository repository;

@InjectMocks
private EmployeeService service;`
      },

      bullets: [
        "Mock repositories and external dependencies.",
        "Focus on business behavior.",
        "Test successful operations.",
        "Test missing data.",
        "Test business rule failures.",
        "Verify important repository interactions."
      ]
    },

    {
      id: "service-unit-test",
      title: "Service Unit Test Example",

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
                .thenReturn(
                    Optional.of(employee)
                );

        Employee result =
                service.getEmployee(1L);

        assertEquals(
                "Rahul",
                result.getName()
        );

        verify(repository)
                .findById(1L);
    }
}`
      }
    },

    {
      id: "service-business-test",
      title: "Testing Business Rules",

      paragraphs: [
        "The most valuable service unit tests usually focus on application behavior rather than simply verifying that every repository method was called.",
        "For example, a duplicate-email rule should be tested by simulating an existing email and verifying that the service rejects the operation."
      ],

      code: {
        language: "java",
        code: `when(repository.existsByEmail(
        "rahul@example.com"))
    .thenReturn(true);

assertThrows(
    EmailAlreadyExistsException.class,
    () -> service.create(request)
);`
      }
    },

    {
      id: "service-vs-controller",
      title: "Service vs Controller",

      code: {
        language: "text",
        code: `Controller

Receives HTTP request
Reads request data
Calls service
Returns HTTP response


Service

Runs application operation
Applies business rules
Coordinates repositories
Coordinates external services
Defines transaction boundary`
      },

      paragraphs: [
        "The controller is concerned with the HTTP boundary, while the service is concerned with what the application should do."
      ]
    },

    {
      id: "service-vs-repository",
      title: "Service vs Repository",

      code: {
        language: "text",
        code: `Service

"What should the application do?"


Repository

"How should persistent data be accessed?"


Example

Service
  ↓
Check employee exists
  ↓
Check business rule
  ↓
Repository
  ↓
Load employee
  ↓
Service
  ↓
Change employee
  ↓
Repository
  ↓
Database`
      }
    },

    {
      id: "service-interface",
      title: "Should Every Service Have an Interface?",

      paragraphs: [
        "No. Creating an interface for every service is not mandatory.",
        "An interface can be useful when there are multiple implementations, a meaningful abstraction boundary, or a requirement to substitute implementations.",
        "For a simple application with one straightforward implementation, a concrete @Service class may be sufficient."
      ],

      code: {
        language: "java",
        code: `// Simple application

@Service
public class EmployeeService {
    // implementation
}


// Multiple implementations

public interface NotificationService {

    void send(String message);
}


@Service
public class EmailNotificationService
        implements NotificationService {

    @Override
    public void send(String message) {
        // send email
    }
}`
      }
    },

    {
      id: "service-too-large",
      title: "Avoid Huge Service Classes",

      paragraphs: [
        "A service class can also become a God class if it handles unrelated business areas.",
        "For example, EmployeeService should not necessarily contain employee operations, payment processing, email delivery, report generation, and authentication workflows."
      ],

      code: {
        language: "text",
        code: `Avoid

EmployeeService
 ├── Employee management
 ├── Payment processing
 ├── Email delivery
 ├── PDF generation
 ├── Authentication
 └── Reporting


Prefer

EmployeeService
PaymentService
EmailService
ReportService
AuthenticationService`
      }
    },

    {
      id: "service-dependency-count",
      title: "Too Many Dependencies Can Be a Warning",

      paragraphs: [
        "A service depending on many unrelated components can indicate that it has accumulated too many responsibilities.",
        "A high dependency count is not automatically wrong, but it should trigger a design review."
      ],

      code: {
        language: "text",
        code: `EmployeeService
 ├── EmployeeRepository
 ├── DepartmentRepository
 ├── ProjectRepository
 ├── EmailService
 ├── PaymentService
 ├── PdfService
 ├── NotificationService
 └── ExternalApiClient

Possible warning:
Too many responsibilities`
      }
    },

    {
      id: "service-boundary",
      title: "Define a Clear Service Boundary",

      paragraphs: [
        "A good service boundary represents a meaningful application capability.",
        "The service should expose operations that make sense from the application's perspective rather than simply mirroring every repository method."
      ],

      code: {
        language: "java",
        code: `public class EmployeeService {

    public EmployeeResponse createEmployee(
            EmployeeCreateRequest request) {
        // use case
    }

    public EmployeeResponse changeDepartment(
            Long employeeId,
            Long departmentId) {
        // use case
    }

    public void deactivateEmployee(
            Long employeeId) {
        // use case
    }
}`
      }
    },

    {
      id: "complete-service-flow",
      title: "Complete Service Layer Flow",

      code: {
        language: "text",
        code: `Client
   ↓
Controller
   ↓
Request DTO
   ↓
Validation
   ↓
Service
   |
   +── Business Rules
   |
   +── Repository
   |
   +── External Service
   |
   +── Transaction
   ↓
Entity / Result
   ↓
Response DTO
   ↓
Controller
   ↓
Client`
      }
    },

    {
      id: "complete-example",
      title: "Complete Employee Service Example",

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }

    @Transactional
    public EmployeeResponse create(
            EmployeeCreateRequest request) {

        if (repository.existsByEmail(
                request.email())) {

            throw new EmailAlreadyExistsException(
                    "Email already exists"
            );
        }

        Employee employee = new Employee();

        employee.setName(request.name());
        employee.setEmail(request.email());
        employee.setDepartment(
                request.department()
        );

        Employee saved =
                repository.save(employee);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getById(
            Long id) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow(
                            () -> new EmployeeNotFoundException(
                                "Employee not found: " + id
                            )
                        );

        return toResponse(employee);
    }

    @Transactional
    public EmployeeResponse update(
            Long id,
            EmployeeUpdateRequest request) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow(
                            () -> new EmployeeNotFoundException(
                                "Employee not found: " + id
                            )
                        );

        employee.setName(request.name());
        employee.setDepartment(
                request.department()
        );

        return toResponse(employee);
    }

    @Transactional
    public void delete(Long id) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow(
                            () -> new EmployeeNotFoundException(
                                "Employee not found: " + id
                            )
                        );

        repository.delete(employee);
    }

    private EmployeeResponse toResponse(
            Employee employee) {

        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment()
        );
    }
}`
      }
    },

    {
      id: "common-mistakes",
      title: "Common Service Layer Mistakes",

      bullets: [
        "Putting business logic in controllers.",
        "Putting SQL or JDBC logic directly inside services.",
        "Making services simply duplicate every repository method without adding application value.",
        "Creating interfaces for every service without a meaningful reason.",
        "Creating one huge service for unrelated business domains.",
        "Duplicating the same business rules across multiple services.",
        "Ignoring transaction boundaries for multi-step operations.",
        "Calling external APIs directly from controllers.",
        "Returning database entities without considering API boundaries.",
        "Catching every exception inside the service and hiding the original problem.",
        "Putting HTTP-specific ResponseEntity logic throughout the service layer.",
        "Making services depend on too many unrelated components.",
        "Writing unit tests that verify only mock interactions instead of business behavior."
      ]
    },

    {
      id: "best-practices",
      title: "Service Layer Best Practices",

      bullets: [
        "Design service methods around meaningful application use cases.",
        "Keep controllers thin.",
        "Keep repositories focused on persistence.",
        "Use constructor injection.",
        "Keep business rules in the appropriate service or domain layer.",
        "Use transactions around meaningful application operations.",
        "Use DTOs at API boundaries.",
        "Keep HTTP-specific concerns out of services.",
        "Use meaningful custom exceptions for application failures.",
        "Centralize API error translation using exception handling.",
        "Keep external integrations behind dedicated components.",
        "Unit test service business behavior with mocked dependencies.",
        "Avoid unnecessary service interfaces.",
        "Split services that accumulate unrelated responsibilities.",
        "Review services with excessive dependency counts.",
        "Keep service methods readable and intention-revealing."
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Service Layer Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your controller contains employee creation logic, duplicate-email checking, and repository calls. Where should this logic go?",
          answer:
            "The application and business logic should move to the service layer. The controller should receive the request DTO, call the service, and return the HTTP response."
        },
        {
          question:
            "Why is the service layer a common place for @Transactional?",
          answer:
            "A service method often represents a complete application operation that may involve multiple persistence operations. Placing the transaction around that operation allows those changes to succeed or fail together."
        },
        {
          question:
            "Can one service depend on multiple repositories?",
          answer:
            "Yes. A business operation may require data from multiple repositories. However, an excessive number of unrelated dependencies can indicate that the service has too many responsibilities."
        },
        {
          question:
            "Should every service have an interface?",
          answer:
            "No. Interfaces should be introduced when they provide a meaningful abstraction, such as multiple implementations or a useful architectural boundary."
        },
        {
          question:
            "Why should a service not return ResponseEntity?",
          answer:
            "ResponseEntity is an HTTP concern. Keeping it in the controller maintains separation between the application/service layer and the web layer."
        },
        {
          question:
            "How would you test a service that uses a repository?",
          answer:
            "I would use JUnit and Mockito, mock the repository, define its expected behavior, call the service method, assert the result or exception, and verify important interactions."
        },
        {
          question:
            "What is a sign that a service has become too large?",
          answer:
            "Many unrelated responsibilities, a very high dependency count, large methods, and logic covering several business domains can indicate that the service should be split."
        },
        {
          question:
            "Where should business validation happen?",
          answer:
            "Input constraints can be handled through Bean Validation on request DTOs, while business rules should be enforced in the service or domain layer as appropriate."
        },
        {
          question:
            "Can a service call another service?",
          answer:
            "Yes. Services can coordinate other application services when there is a clear reason, but excessive service-to-service coupling should be avoided."
        },
        {
          question:
            "What is the main purpose of the service layer?",
          answer:
            "Its main purpose is to provide a clear application-operation boundary where business logic, orchestration, transaction management, and coordination of dependencies can be implemented."
        }
      ]
    },

    {
      id: "interview",
      title: "Service Layer Interview Questions",

      interviewQuestions: [
        {
          question: "What is the responsibility of the service layer?",
          answer:
            "The service layer contains application and business logic and coordinates operations between controllers and data-access components."
        },
        {
          question: "Why not put business logic in the controller?",
          answer:
            "Keeping business logic in services prevents controllers from becoming tightly coupled to application rules and makes the logic easier to reuse and test."
        },
        {
          question: "What does @Service do?",
          answer:
            "@Service marks a class as a Spring-managed component intended to represent service or business logic."
        },
        {
          question: "Can a service use multiple repositories?",
          answer:
            "Yes. A business operation may require data from multiple repositories."
        },
        {
          question: "What is constructor injection?",
          answer:
            "Constructor injection supplies required dependencies through the constructor and makes dependencies explicit and easy to provide in unit tests."
        },
        {
          question: "What is business logic?",
          answer:
            "Business logic represents the rules and decisions that determine how the application should behave for a particular business operation."
        },
        {
          question: "What is a use case?",
          answer:
            "A use case is a meaningful application operation, such as creating an employee, transferring an account, or changing an employee's department."
        },
        {
          question: "Why are transactions commonly defined at the service layer?",
          answer:
            "The service layer often represents a complete application operation, making it a natural boundary for coordinating multiple persistence operations within one transaction."
        },
        {
          question: "Should services contain HTTP logic?",
          answer:
            "Generally no. HTTP-specific concerns such as ResponseEntity, HTTP headers, and request mapping should remain in the controller layer."
        },
        {
          question: "Should services contain SQL?",
          answer:
            "Application services should generally use repositories or other persistence abstractions rather than directly embedding database access logic."
        },
        {
          question: "How do you unit test a service?",
          answer:
            "Mock its dependencies, define their behavior, execute the service method, assert the result or exception, and verify important interactions."
        },
        {
          question: "What is the difference between service and repository?",
          answer:
            "The service decides what the application should do, while the repository focuses on how persistent data is accessed."
        },
        {
          question: "What is the difference between service and controller?",
          answer:
            "The controller handles HTTP concerns, while the service handles application and business operations."
        },
        {
          question: "Can a service call external APIs?",
          answer:
            "Yes. A service can coordinate external integrations, preferably through dedicated client or service abstractions."
        },
        {
          question: "What is service-layer overengineering?",
          answer:
            "It includes unnecessary interfaces, wrappers, abstractions, or service-to-service layers that do not provide meaningful architectural value."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",

      bullets: [
        "Service → application/business logic.",
        "Controller → HTTP concerns.",
        "Repository → data access.",
        "@Service → Spring-managed service bean.",
        "Constructor injection → preferred dependency injection style.",
        "Design methods around use cases.",
        "Business rules belong in the appropriate service/domain layer.",
        "Use repositories for persistence.",
        "Use DTOs at API boundaries.",
        "Transactions commonly surround service operations.",
        "Keep ResponseEntity and HTTP details in controllers.",
        "Use custom exceptions for meaningful application failures.",
        "Use global exception handling for HTTP error translation.",
        "A service can use multiple repositories.",
        "A service can coordinate external services.",
        "Mock dependencies when unit testing services.",
        "Avoid unnecessary service interfaces.",
        "Avoid huge services with unrelated responsibilities."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",

      paragraphs: [
        "The service layer contains application and business logic in a typical Spring Boot layered architecture. The controller handles HTTP concerns and delegates the operation to the service. The service applies business rules, coordinates repositories and external dependencies, maps DTOs when appropriate, and commonly defines transaction boundaries. Repositories remain focused on persistence. Constructor injection is preferred because it makes dependencies explicit and improves testability. A good service is organized around meaningful use cases rather than simply duplicating repository methods."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes",

      paragraphs: [
        "Remember the basic responsibility flow: Controller → Service → Repository.",
        "The controller answers: 'What HTTP request did I receive?'",
        "The service answers: 'What should the application do?'",
        "The repository answers: 'How should persistent data be accessed?'",
        "Business rules should normally be enforced in the service or appropriate domain layer.",
        "Bean Validation is useful for input constraints, while business rules belong at the application/domain boundary.",
        "Transactions commonly belong around meaningful service operations.",
        "Services should not become dependent on HTTP-specific classes such as ResponseEntity.",
        "For interviews, remember: Controller = HTTP, Service = business/application logic, Repository = persistence."
      ]
    }
  ]
};
