
export const buildingLayeredRestApi = {
  id: "building-layered-rest-api",

  title: "Building a Layered REST API",

  slug: "building-layered-rest-api",

  topicTitle: "Spring Boot Layered Architecture",

  estimatedTime: "90 min",

  description:
    "Build a complete Employee REST API using Controller, Service, Repository, Entity, Request DTO, and Response DTO layers.",

  sections: [
    {
      id: "project-goal",

      title: "Project Goal",

      paragraphs: [
        "We will build an Employee REST API using the layered architecture learned in this topic.",
        "The API will support creating, retrieving, updating, and deleting employees.",
        "The example uses Spring Data JPA for persistence and DTOs for API communication.",
        "The main purpose of this project is not only to make CRUD operations work, but also to understand why each layer exists and how a request travels through the application.",
        "The API will separate HTTP handling, business logic, persistence logic, database mapping, and API data models."
      ],

      bullets: [
        "Controller handles HTTP requests and responses.",
        "Service handles application and business logic.",
        "Repository handles persistence operations.",
        "Entity represents persisted database data.",
        "Request DTO represents client input.",
        "Response DTO represents data returned to the client.",
        "JPA/Hibernate translates entity operations into SQL.",
        "MySQL stores the persistent data."
      ],

      code: {
        language: "text",
        code: `POST   /api/employees
GET    /api/employees
GET    /api/employees/{id}
PUT    /api/employees/{id}
DELETE /api/employees/{id}`
      }
    },

    {
      id: "architecture-overview",

      title: "Layered Architecture Overview",

      paragraphs: [
        "Layered architecture divides an application into logical responsibilities. Each layer has a focused job and communicates with the layer below it through well-defined interfaces.",
        "The controller should not contain database code, and the repository should not contain HTTP-specific logic. This separation makes the application easier to understand, test, maintain, and change."
      ],

      code: {
        language: "text",
        code: `                Client
                   |
                   v
             Controller Layer
                   |
                   v
              Service Layer
                   |
                   v
            Repository Layer
                   |
                   v
          JPA / Hibernate
                   |
                   v
               Database`
      }
    },

    {
      id: "layer-responsibilities",

      title: "Responsibility of Each Layer",

      code: {
        language: "text",
        code: `Controller
    |
    +--> HTTP method
    +--> URL mapping
    +--> Request/Response
    +--> Status codes

Service
    |
    +--> Business rules
    +--> Application workflow
    +--> Transaction boundary
    +--> Coordinates repositories

Repository
    |
    +--> Database access
    +--> Queries
    +--> Persistence operations

Entity
    |
    +--> Database mapping
    +--> Persistent state

DTO
    |
    +--> API contract
    +--> Request/response data`
      },

      bullets: [
        "Controller should be thin.",
        "Service should coordinate business operations.",
        "Repository should focus on persistence.",
        "Entity should represent persistence state.",
        "DTOs should represent API contracts."
      ]
    },

    {
      id: "package-structure",

      title: "Recommended Package Structure",

      code: {
        language: "text",
        code: `com.codeforge.employee
│
├── controller
│   └── EmployeeController.java
│
├── service
│   └── EmployeeService.java
│
├── repository
│   └── EmployeeRepository.java
│
├── entity
│   └── Employee.java
│
└── dto
    ├── EmployeeCreateRequest.java
    ├── EmployeeUpdateRequest.java
    └── EmployeeResponse.java`
      },

      paragraphs: [
        "The package structure reflects the responsibilities of the application layers.",
        "For a small project, this structure is easy to understand. As the application grows, teams may also organize packages by feature, with each feature containing its own controller, service, repository, entity, and DTO classes."
      ]
    },

    {
      id: "project-dependencies",

      title: "Project Dependencies",

      paragraphs: [
        "The example requires Spring Web for REST APIs, Spring Data JPA for persistence, and a MySQL JDBC driver for database connectivity."
      ],

      code: {
        language: "xml",
        code: `<dependencies>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

</dependencies>`
      }
    },

    {
      id: "entity",

      title: "Step 1 — Employee Entity",

      paragraphs: [
        "The Employee entity represents persistent employee data. JPA uses the entity mapping to understand how the Java object corresponds to the database table.",
        "@Entity tells JPA that the class is a persistent entity. @Table specifies the database table name. @Id identifies the primary key and @GeneratedValue configures automatic ID generation."
      ],

      code: {
        language: "java",
        code: `package com.codeforge.employee.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String department;

    protected Employee() {
    }

    public Employee(
            String name,
            String email,
            String department) {

        this.name = name;
        this.email = email;
        this.department = department;
    }

    // getters and setters
}`
      }
    },

    {
      id: "entity-responsibility",

      title: "What Is the Entity Responsible For?",

      paragraphs: [
        "The entity is responsible for representing persistent state. It should not become the place where HTTP request processing or controller-specific behavior is implemented.",
        "For example, Employee represents a database record, while EmployeeCreateRequest represents input received from an API client."
      ],

      bullets: [
        "Maps Java state to database columns.",
        "Contains the persistent identifier.",
        "Represents database-backed state.",
        "Can participate in JPA relationships.",
        "Should not be treated as the API contract by default."
      ]
    },

    {
      id: "create-request",

      title: "Step 2 — Create Request DTO",

      code: {
        language: "java",
        code: `package com.codeforge.employee.dto;

public record EmployeeCreateRequest(
    String name,
    String email,
    String department
) {
}`
      },

      paragraphs: [
        "This DTO represents the data required when creating an employee.",
        "The client does not need to provide the database-generated ID. That is why the create request is separated from the Employee entity."
      ]
    },

    {
      id: "update-request",

      title: "Step 3 — Update Request DTO",

      code: {
        language: "java",
        code: `package com.codeforge.employee.dto;

public record EmployeeUpdateRequest(
    String name,
    String email,
    String department
) {
}`
      },

      paragraphs: [
        "The update DTO represents the fields accepted when an existing employee is modified.",
        "Using a separate update DTO allows the API to define update-specific rules independently from creation rules."
      ]
    },

    {
      id: "response-dto",

      title: "Step 4 — Response DTO",

      code: {
        language: "java",
        code: `package com.codeforge.employee.dto;

public record EmployeeResponse(
    Long id,
    String name,
    String email,
    String department
) {
}`
      },

      paragraphs: [
        "EmployeeResponse represents the API response returned to the client.",
        "Returning a response DTO instead of exposing the entity directly gives the API control over which fields are exposed.",
        "This becomes especially important when entities contain passwords, internal flags, audit information, relationships, or other fields that should not be returned directly."
      ]
    },

    {
      id: "dto-vs-entity",

      title: "Why Separate DTOs from Entities?",

      code: {
        language: "text",
        code: `Client
  |
  v
EmployeeCreateRequest
  |
  v
Employee Entity
  |
  v
Database


Database
  |
  v
Employee Entity
  |
  v
EmployeeResponse
  |
  v
Client`
      },

      bullets: [
        "DTOs define the API contract.",
        "Entities define the persistence model.",
        "DTOs can hide internal database fields.",
        "Request and response models can evolve independently.",
        "DTOs reduce accidental exposure of persistence details.",
        "DTOs make validation rules specific to API operations."
      ]
    },

    {
      id: "repository",

      title: "Step 5 — Repository",

      code: {
        language: "java",
        code: `package com.codeforge.employee.repository;

import com.codeforge.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
            String email
    );

    boolean existsByEmail(
            String email
    );
}`
      },

      paragraphs: [
        "EmployeeRepository is responsible for persistence operations.",
        "By extending JpaRepository, the application receives common CRUD operations without manually implementing SQL for every operation.",
        "The custom methods findByEmail and existsByEmail use Spring Data query derivation."
      ]
    },

    {
      id: "repository-responsibility",

      title: "Repository Responsibility",

      bullets: [
        "Find entities.",
        "Save entities.",
        "Delete entities.",
        "Check whether records exist.",
        "Execute repository queries.",
        "Provide persistence operations to the service layer."
      ],

      paragraphs: [
        "The repository should not decide how an HTTP response is constructed. It should expose persistence operations that the service can use."
      ]
    },

    {
      id: "service",

      title: "Step 6 — Service",

      code: {
        language: "java",
        code: `package com.codeforge.employee.service;

import com.codeforge.employee.dto.*;
import com.codeforge.employee.entity.Employee;
import com.codeforge.employee.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {

        this.repository = repository;
    }

    public EmployeeResponse create(
            EmployeeCreateRequest request) {

        if (repository.existsByEmail(
                request.email())) {

            throw new IllegalArgumentException(
                    "Email already exists"
            );
        }

        Employee employee = new Employee(
                request.name(),
                request.email(),
                request.department()
        );

        Employee saved =
                repository.save(employee);

        return toResponse(saved);
    }

    public List<EmployeeResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EmployeeResponse getById(
            Long id) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow();

        return toResponse(employee);
    }

    public EmployeeResponse update(
            Long id,
            EmployeeUpdateRequest request) {

        Employee employee =
                repository.findById(id)
                        .orElseThrow();

        employee.setName(request.name());
        employee.setEmail(request.email());
        employee.setDepartment(
                request.department()
        );

        Employee updated =
                repository.save(employee);

        return toResponse(updated);
    }

    public void delete(Long id) {

        if (!repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Employee not found"
            );
        }

        repository.deleteById(id);
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
      id: "service-responsibility",

      title: "What Is the Service Layer Responsible For?",

      paragraphs: [
        "The service layer is the application layer between HTTP handling and persistence. It coordinates the operation and applies business or application rules.",
        "For example, the email uniqueness check belongs in the service workflow because it is part of the employee creation rule."
      ],

      bullets: [
        "Coordinates application operations.",
        "Applies business rules.",
        "Calls repositories.",
        "Converts between DTOs and entities.",
        "Coordinates multiple repositories when required.",
        "Defines appropriate transaction boundaries."
      ]
    },

    {
      id: "create-service-flow",

      title: "Create Employee Service Flow",

      code: {
        language: "text",
        code: `EmployeeCreateRequest
        |
        v
Check email uniqueness
        |
        v
Create Employee entity
        |
        v
repository.save(employee)
        |
        v
Saved Employee
        |
        v
EmployeeResponse`
      }
    },

    {
      id: "controller",

      title: "Step 7 — Controller",

      code: {
        language: "java",
        code: `package com.codeforge.employee.controller;

import com.codeforge.employee.dto.*;
import com.codeforge.employee.service.EmployeeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(
            EmployeeService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> create(
            @RequestBody EmployeeCreateRequest request) {

        EmployeeResponse response =
                service.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse>
    getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse>
    update(
            @PathVariable Long id,
            @RequestBody EmployeeUpdateRequest request) {

        return ResponseEntity.ok(
                service.update(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}`
      }
    },

    {
      id: "controller-responsibility",

      title: "What Is the Controller Responsible For?",

      paragraphs: [
        "The controller is responsible for the HTTP boundary of the application. It maps HTTP requests to Java methods, receives request data, calls the service, and produces an HTTP response.",
        "The controller should generally avoid implementing complex business rules or directly accessing the repository."
      ],

      bullets: [
        "Maps URLs.",
        "Maps HTTP methods.",
        "Reads request bodies.",
        "Reads path variables and query parameters.",
        "Delegates to the service.",
        "Returns HTTP status codes and response bodies."
      ]
    },

    {
      id: "crud-mapping",

      title: "Mapping CRUD Operations to HTTP Methods",

      code: {
        language: "text",
        code: `CREATE
POST   /api/employees
        |
        v
EmployeeService.create()


READ ALL
GET    /api/employees
        |
        v
EmployeeService.getAll()


READ ONE
GET    /api/employees/{id}
        |
        v
EmployeeService.getById(id)


UPDATE
PUT    /api/employees/{id}
        |
        v
EmployeeService.update(id, request)


DELETE
DELETE /api/employees/{id}
        |
        v
EmployeeService.delete(id)`
      }
    },

    {
      id: "validation",

      title: "Adding Validation to the Request DTO",

      paragraphs: [
        "In a production API, request DTOs should normally validate incoming data before the service performs the main operation.",
        "For example, the create request can require a non-blank name and a valid email."
      ],

      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmployeeCreateRequest(

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50)
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    String email,

    @NotBlank(message = "Department is required")
    String department

) {
}`
      }
    },

    {
      id: "validation-controller",

      title: "Triggering Validation in the Controller",

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> create(
        @Valid
        @RequestBody EmployeeCreateRequest request) {

    EmployeeResponse response =
            service.create(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      },

      paragraphs: [
        "@Valid tells Spring to validate the request DTO before normal controller processing continues.",
        "This prevents simple input violations from reaching the service layer."
      ]
    },

    {
      id: "exception-flow",

      title: "Exception Flow in a Layered API",

      code: {
        language: "text",
        code: `Client
  |
  v
Controller
  |
  v
Service
  |
  +---- Business rule fails
  |          |
  |          v
  |     Custom Exception
  |
  v
Repository
  |
  +---- Database error
             |
             v
        Data Exception

Exception
    |
    v
@RestControllerAdvice
    |
    v
Consistent JSON Error`
      },

      paragraphs: [
        "A layered API should centralize exception-to-HTTP-response conversion. The service can throw an application-specific exception, while a global exception handler can translate it into an appropriate HTTP status."
      ]
    },

    {
      id: "custom-exception-preview",

      title: "Using a Custom Exception",

      code: {
        language: "java",
        code: `public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(Long id) {
        super("Employee not found: " + id);
    }
}`
      },

      paragraphs: [
        "A custom exception communicates the business meaning of the failure more clearly than using a generic exception such as IllegalArgumentException."
      ]
    },

    {
      id: "transaction-boundary",

      title: "Where Does @Transactional Belong?",

      paragraphs: [
        "When an operation contains multiple database changes that must succeed or fail together, the service layer is commonly an appropriate place for the transaction boundary.",
        "The exact placement depends on the application's architecture, but the transaction should normally cover the complete business operation rather than only an individual repository call."
      ],

      code: {
        language: "java",
        code: `@Transactional
public EmployeeResponse transferEmployee(
        Long employeeId,
        Long departmentId) {

    // Load employee
    // Validate department
    // Update employee
    // Save related changes

    // Either the complete operation succeeds
    // or the transaction can roll back.
}`
      }
    },

    {
      id: "request-flow",

      title: "Step 8 — Understand the Request Flow",

      paragraphs: [
        "When the client creates an employee, the request does not directly reach the database.",
        "It travels through the layers. Each layer performs its own responsibility."
      ],

      code: {
        language: "text",
        code: `POST /api/employees

        ↓

EmployeeController

        ↓

EmployeeCreateRequest

        ↓

Validation

        ↓

EmployeeService

        ↓

Employee Entity

        ↓

EmployeeRepository

        ↓

JPA / Hibernate

        ↓

MySQL`
      }
    },

    {
      id: "request-flow-detailed",

      title: "Detailed Create Request Flow",

      paragraphs: [
        "The browser, Postman client, mobile application, or another service sends an HTTP POST request.",
        "Spring MVC routes the request to EmployeeController.",
        "The JSON body is deserialized into EmployeeCreateRequest.",
        "If @Valid is used, Bean Validation evaluates the DTO constraints.",
        "The controller delegates the valid request to EmployeeService.",
        "The service checks business rules and creates the Employee entity.",
        "EmployeeRepository.save() delegates persistence to Spring Data JPA.",
        "Hibernate generates the required SQL and sends it through JDBC to MySQL.",
        "The saved entity is converted into EmployeeResponse and returned to the client."
      ]
    },

    {
      id: "response-flow",

      title: "Step 9 — Understand the Response Flow",

      code: {
        language: "text",
        code: `MySQL

  ↓

JPA / Hibernate

  ↓

Employee Entity

  ↓

EmployeeRepository

  ↓

EmployeeService

  ↓

EmployeeResponse

  ↓

EmployeeController

  ↓

JSON Response

  ↓

Client`
      }
    },

    {
      id: "response-mapping",

      title: "Entity to Response DTO Mapping",

      paragraphs: [
        "The service converts the persistent entity into a response DTO before returning the result to the controller.",
        "This keeps the API contract independent from the persistence model."
      ],

      code: {
        language: "java",
        code: `private EmployeeResponse toResponse(
        Employee employee) {

    return new EmployeeResponse(
        employee.getId(),
        employee.getName(),
        employee.getEmail(),
        employee.getDepartment()
    );
}`
      }
    },

    {
      id: "postman-create",

      title: "Step 10 — Test Create API",

      code: {
        language: "http",
        code: `POST http://localhost:8080/api/employees

Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
      },

      output: `HTTP/1.1 201 Created

{
  "id": 1,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
    },

    {
      id: "postman-create-invalid",

      title: "Test Invalid Create Request",

      code: {
        language: "http",
        code: `POST http://localhost:8080/api/employees

Content-Type: application/json

{
  "name": "",
  "email": "invalid-email",
  "department": ""
}`
      },

      output: `HTTP/1.1 400 Bad Request

{
  "status": 400,
  "message": "Validation failed"
}`
    },

    {
      id: "postman-get",

      title: "Step 11 — Test Get API",

      code: {
        language: "http",
        code: `GET http://localhost:8080/api/employees/1`
      },

      output: `HTTP/1.1 200 OK

{
  "id": 1,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
    },

    {
      id: "postman-get-all",

      title: "Test Get All API",

      code: {
        language: "http",
        code: `GET http://localhost:8080/api/employees`
      },

      output: `HTTP/1.1 200 OK

[
  {
    "id": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "department": "Engineering"
  },
  {
    "id": 2,
    "name": "Priya",
    "email": "priya@example.com",
    "department": "HR"
  }
]`
    },

    {
      id: "postman-update",

      title: "Test Update API",

      code: {
        language: "http",
        code: `PUT http://localhost:8080/api/employees/1

Content-Type: application/json

{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "department": "Platform Engineering"
}`
      },

      output: `HTTP/1.1 200 OK

{
  "id": 1,
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "department": "Platform Engineering"
}`
    },

    {
      id: "postman-delete",

      title: "Test Delete API",

      code: {
        language: "http",
        code: `DELETE http://localhost:8080/api/employees/1`
      },

      output: `HTTP/1.1 204 No Content`
    },

    {
      id: "crud-summary",

      title: "Complete CRUD Summary",

      code: {
        language: "text",
        code: `CREATE
POST /api/employees
       |
       v
Controller -> Service -> Repository -> Database
       |
       v
201 Created


READ
GET /api/employees/{id}
       |
       v
Controller -> Service -> Repository -> Database
       |
       v
200 OK


UPDATE
PUT /api/employees/{id}
       |
       v
Controller -> Service -> Repository -> Database
       |
       v
200 OK


DELETE
DELETE /api/employees/{id}
       |
       v
Controller -> Service -> Repository -> Database
       |
       v
204 No Content`
      }
    },

    {
      id: "architecture",

      title: "Final Architecture",

      code: {
        language: "text",
        code: `                         Client
                            |
                            v
                    EmployeeController
                            |
                            v
                      EmployeeService
                            |
                            v
                    EmployeeRepository
                            |
                            v
                      JPA / Hibernate
                            |
                            v
                          MySQL


API Boundary:

EmployeeCreateRequest  -> Controller
EmployeeUpdateRequest  -> Controller
EmployeeResponse       <- Controller


Persistence:

Employee Entity       <-> Database`
      }
    },

    {
      id: "architecture-rules",

      title: "Rules for Maintaining the Architecture",

      bullets: [
        "Controller should not directly access the repository.",
        "Repository should not depend on the controller.",
        "Service should contain application and business coordination.",
        "DTOs should represent API contracts.",
        "Entities should represent persistence state.",
        "Avoid returning entities directly when doing so exposes persistence details.",
        "Keep HTTP-specific concepts in the controller layer.",
        "Keep database-specific operations in the repository layer.",
        "Use transactions around complete business operations when required."
      ]
    },

    {
      id: "bad-architecture",

      title: "Bad Architecture Example",

      code: {
        language: "java",
        code: `@RestController
public class EmployeeController {

    private final EmployeeRepository repository;

    @PostMapping("/employees")
    public Employee create(
            @RequestBody Employee employee) {

        if (repository.existsByEmail(
                employee.getEmail())) {

            throw new RuntimeException(
                    "Email already exists");
        }

        return repository.save(employee);
    }
}`
      },

      paragraphs: [
        "This can work technically, but it mixes HTTP handling, business rules, persistence access, and entity exposure inside the controller.",
        "As the application grows, this approach becomes harder to test and maintain."
      ]
    },

    {
      id: "good-architecture",

      title: "Good Architecture Example",

      code: {
        language: "text",
        code: `Controller
    |
    | HTTP concerns
    v
Service
    |
    | Business/application rules
    v
Repository
    |
    | Persistence
    v
Database`
      },

      paragraphs: [
        "The layered design keeps responsibilities separated. The controller does not need to know how an employee is stored, and the repository does not need to know how an HTTP response should be formatted."
      ]
    },

    {
      id: "testing-layers",

      title: "How to Test Each Layer",

      code: {
        language: "text",
        code: `Controller Test
    |
    +--> MockMvc
    +--> Request/Response
    +--> HTTP status
    +--> JSON


Service Test
    |
    +--> Mockito
    +--> Mock Repository
    +--> Business rules


Repository Test
    |
    +--> @DataJpaTest
    +--> Real JPA behavior
    +--> Database/Test DB`
      },

      bullets: [
        "Controller tests verify HTTP behavior.",
        "Service unit tests verify business rules.",
        "Repository tests verify persistence behavior.",
        "Integration tests verify multiple layers working together."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes in Layered REST APIs",

      bullets: [
        "Putting business logic directly in controllers.",
        "Calling repositories directly from controllers.",
        "Returning JPA entities everywhere.",
        "Using one DTO for every API operation without considering different requirements.",
        "Putting database queries in service classes.",
        "Using generic RuntimeException for every failure.",
        "Skipping validation on request DTOs.",
        "Forgetting to handle not-found cases.",
        "Ignoring unique database constraints.",
        "Creating unnecessary service classes that contain no meaningful responsibility.",
        "Putting unrelated business logic into entities without a clear domain model."
      ]
    },

    {
      id: "not-found-flow",

      title: "Handling Employee Not Found",

      paragraphs: [
        "The service should explicitly handle the case where the requested employee does not exist. A custom exception can then be translated into HTTP 404 by the global exception handler."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse getById(Long id) {

    Employee employee =
            repository.findById(id)
                    .orElseThrow(
                        () -> new EmployeeNotFoundException(id)
                    );

    return toResponse(employee);
}`
      },

      output: `GET /api/employees/99

HTTP/1.1 404 Not Found`
    },

    {
      id: "duplicate-email-flow",

      title: "Handling Duplicate Email",

      paragraphs: [
        "The application can check for an existing email before creating an employee. However, the database should also enforce uniqueness because an application-level check alone can still have race conditions when concurrent requests arrive."
      ],

      code: {
        language: "java",
        code: `if (repository.existsByEmail(request.email())) {
    throw new DuplicateEmailException(
        "Email already exists"
    );
}`
      },

      bullets: [
        "Service coordinates the business rule.",
        "Repository provides the existence query.",
        "Database UNIQUE constraint provides final persistence protection.",
        "Global exception handling converts the failure into a client-friendly response."
      ]
    },

    {
      id: "update-considerations",

      title: "Important Considerations for Update",

      paragraphs: [
        "An update operation needs to consider whether the employee exists, whether the new email conflicts with another employee, and whether the operation represents a full replacement or a partial update.",
        "The example uses PUT with all fields in the request. A PATCH endpoint would normally represent a partial modification."
      ],

      code: {
        language: "text",
        code: `PUT
/api/employees/1

Usually represents replacement/update
of the resource representation.


PATCH
/api/employees/1

Usually represents partial modification
of the resource.`
      }
    },

    {
      id: "service-vs-repository",

      title: "Service vs Repository — Interview Difference",

      code: {
        language: "text",
        code: `Service

"What should the application do?"

Examples:
- Check business rule
- Coordinate operations
- Decide workflow


Repository

"How do I access persistence?"

Examples:
- findById
- save
- delete
- custom query`
      }
    },

    {
      id: "controller-vs-service",

      title: "Controller vs Service — Interview Difference",

      code: {
        language: "text",
        code: `Controller

HTTP responsibility:
- URL
- HTTP method
- Request
- Response
- Status code


Service

Application responsibility:
- Business rules
- Workflow
- Transactions
- Coordination`
      }
    },

    {
      id: "entity-vs-dto",

      title: "Entity vs DTO — Interview Difference",

      code: {
        language: "text",
        code: `Entity

Represents persistence state.

Example:
Employee
    |
    +--> id
    +--> name
    +--> email


DTO

Represents API data.

Examples:
EmployeeCreateRequest
EmployeeUpdateRequest
EmployeeResponse`
      }
    },

    {
      id: "complete-project-flow",

      title: "Complete Project Flow",

      code: {
        language: "text",
        code: `                 POST /api/employees
                         |
                         v
                EmployeeController
                         |
                    @Valid DTO
                         |
                         v
                 EmployeeService
                         |
                Business Rules
                         |
                         v
                   Employee Entity
                         |
                         v
                EmployeeRepository
                         |
                         v
                  Spring Data JPA
                         |
                         v
                     Hibernate
                         |
                         v
                       JDBC
                         |
                         v
                       MySQL
                         |
                         v
                  Saved Employee
                         |
                         v
                 EmployeeResponse
                         |
                         v
                     Controller
                         |
                         v
                   JSON Response`
      }
    },

    {
      id: "interview",

      title: "Layered API Interview Questions",

      interviewQuestions: [
        {
          question:
            "Explain the complete request flow in a Spring Boot layered application.",

          answer:
            "The client sends an HTTP request to the controller. The controller receives the request and delegates the operation to the service. The service applies business or application logic and uses the repository for persistence. The repository communicates with the database through JPA and Hibernate. The result returns through the service and controller to the client."
        },

        {
          question:
            "Why use DTOs in this example?",

          answer:
            "DTOs define the API request and response models separately from the database entity, giving the API control over the data exposed to clients and allowing the API contract to evolve independently from the persistence model."
        },

        {
          question:
            "Where should the email uniqueness check be performed?",

          answer:
            "The service should coordinate the business rule, while the repository provides the data-access operation such as existsByEmail. The database should also enforce a UNIQUE constraint as the final persistence-level protection."
        },

        {
          question:
            "Why does the controller not call EmployeeRepository directly?",

          answer:
            "The service layer provides a separation between HTTP handling and business or application logic, making the architecture easier to maintain, test, and evolve."
        },

        {
          question:
            "What is the responsibility of the controller layer?",

          answer:
            "The controller handles the HTTP boundary by mapping URLs and HTTP methods, receiving request data, delegating to the service, and returning appropriate HTTP responses."
        },

        {
          question:
            "What is the responsibility of the service layer?",

          answer:
            "The service layer coordinates application operations and business rules. It commonly calls repositories, maps DTOs and entities, coordinates multiple operations, and defines transaction boundaries where appropriate."
        },

        {
          question:
            "What is the responsibility of the repository layer?",

          answer:
            "The repository layer handles persistence operations and database access. Spring Data JPA repositories provide common CRUD operations and can define query methods."
        },

        {
          question:
            "Why should we avoid exposing JPA entities directly from REST APIs?",

          answer:
            "Direct entity exposure couples the API contract to the persistence model and can accidentally expose internal fields or relationships. Response DTOs provide better control over the API contract."
        },

        {
          question:
            "Where should @Transactional normally be placed for a business operation?",

          answer:
            "The service layer is commonly an appropriate transaction boundary because it represents a complete application or business operation that may involve multiple persistence actions."
        },

        {
          question:
            "What happens when repository.findById(id) cannot find an employee?",

          answer:
            "findById returns an Optional that is empty when no entity is found. The service can convert that case into a domain-specific EmployeeNotFoundException, which a global exception handler can map to HTTP 404."
        },

        {
          question:
            "Why is validation normally placed on request DTOs?",

          answer:
            "Request DTOs represent the external API contract, so they are a natural place for input constraints such as required fields, lengths, formats, and ranges."
        },

        {
          question:
            "Can validation replace business logic?",

          answer:
            "No. Bean Validation is well suited to structural input rules, while state-dependent and application-specific business rules normally belong in the service or domain layer."
        },

        {
          question:
            "Why should the database still have a unique constraint if the service checks existsByEmail?",

          answer:
            "Because an application-level existence check can have a race condition when concurrent requests arrive. The database constraint provides final protection for the uniqueness invariant."
        },

        {
          question:
            "What is the difference between PUT and PATCH?",

          answer:
            "PUT is generally used to replace or fully update a resource representation, while PATCH is intended for partial modifications."
        },

        {
          question:
            "How would you test the service layer?",

          answer:
            "Use unit tests with mocked repository dependencies and verify business rules, returned values, exceptions, and repository interactions."
        },

        {
          question:
            "How would you test the controller layer?",

          answer:
            "Use MockMvc and focused MVC tests to verify URL mappings, request handling, validation, HTTP status codes, response JSON, and controller behavior."
        },

        {
          question:
            "How would you test the repository layer?",

          answer:
            "Use a JPA-focused test such as @DataJpaTest to verify entity persistence, query methods, constraints, and database behavior."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "Your controller contains 300 lines of business logic. How would you improve it?",

          answer:
            "Move business and application logic into a service layer. Keep the controller focused on HTTP concerns such as request mapping, input binding, validation triggering, delegation, and response creation."
        },

        {
          question:
            "An interviewer asks why you created EmployeeCreateRequest instead of accepting Employee directly. What do you say?",

          answer:
            "Employee is a persistence entity while EmployeeCreateRequest is an API request model. Separating them prevents the database model from becoming the API contract and allows the API to control which fields clients can submit."
        },

        {
          question:
            "Two users create employees with the same email at exactly the same time. The service uses existsByEmail. Can duplicates still occur?",

          answer:
            "Yes. The existence check can suffer from a race condition. The database should enforce a UNIQUE constraint on email, and the application should handle the resulting constraint violation appropriately."
        },

        {
          question:
            "The repository needs to execute a complex employee search. Should the controller implement the query?",

          answer:
            "No. The controller should delegate to the service. The repository or an appropriate persistence component should handle the database query."
        },

        {
          question:
            "An employee transfer updates both the employee's department and another table. Where should the transaction boundary be?",

          answer:
            "The service method representing the complete transfer operation is commonly the appropriate transaction boundary so the related database changes can succeed or roll back together."
        },

        {
          question:
            "The API returns passwordHash, createdBy, and internalFlags because it returns the entity directly. What is the architectural problem?",

          answer:
            "The persistence entity is being exposed as the API contract. A response DTO should be used to explicitly select the fields that the API is allowed to expose."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Controller handles HTTP.",
        "Service handles application and business logic.",
        "Repository handles persistence.",
        "Entity represents persistent state.",
        "Request DTO represents client input.",
        "Response DTO represents API output.",
        "Controller should normally delegate to the service.",
        "Service should normally coordinate repositories.",
        "Repository should not contain HTTP logic.",
        "DTOs decouple API contracts from persistence models.",
        "Validation should happen at the API boundary.",
        "Global exception handling should provide consistent error responses.",
        "Database constraints should protect important data invariants.",
        "Transactions commonly surround complete service-level business operations.",
        "Controller, service, and repository layers can be tested independently."
      ]
    },

    {
      id: "one-minute-answer",

      title: "One-Minute Interview Answer",

      paragraphs: [
        "A layered REST API separates responsibilities into multiple layers. The controller handles HTTP requests and responses, the service contains application and business logic, and the repository handles database access. JPA entities represent persistent data, while request and response DTOs define the API contract. A typical request flows from Client to Controller to Service to Repository to JPA/Hibernate and finally to the database. The result travels back in the opposite direction. This separation improves maintainability, testability, and control over the API contract."
      ]
    },

    {
      id: "final-notes",

      title: "Final Project Notes",

      paragraphs: [
        "The most important thing to remember is that layered architecture is about responsibility separation, not simply creating many packages.",
        "The controller should answer the question 'What HTTP operation is being requested?', the service should answer 'What should the application do?', and the repository should answer 'How should persistence be accessed?'.",
        "DTOs protect the API contract from the persistence model. Entities belong primarily to the persistence side, while request and response DTOs belong to the API boundary.",
        "In a production application, this basic example should be extended with validation, custom exceptions, global exception handling, transactions where needed, database constraints, pagination for large collections, logging, testing, and appropriate security.",
        "Once this layered CRUD API is understood, the same architecture can be applied to larger Spring Boot applications such as e-commerce systems, employee management systems, hotel management systems, and other business applications."
      ]
    }
  ]
};
