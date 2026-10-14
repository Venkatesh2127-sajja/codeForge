
export const controllerLayer = {
  id: "controller-layer",
  title: "Controller Layer",
  slug: "controller-layer",
  topicTitle: "Spring Boot Layered Architecture",
  estimatedTime: "60 min",

  description:
    "Understand the responsibility of the controller layer in Spring Boot, how controllers receive HTTP requests, invoke services, validate input, and return HTTP responses.",

  sections: [
    {
      id: "controller-definition",
      title: "What is the Controller Layer?",

      paragraphs: [
        "The controller layer is responsible for handling incoming HTTP requests and producing HTTP responses.",
        "In a Spring Boot REST application, controllers are commonly created using @RestController.",
        "The controller acts as the boundary between the external client and the internal application logic.",
        "A controller should primarily deal with HTTP concerns. It should delegate application and business operations to the service layer."
      ],

      code: {
        language: "text",
        code: `Client
   ↓
HTTP Request
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database

Database
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
HTTP Response
   ↓
Client`
      }
    },

    {
      id: "controller-boundary",
      title: "Controller as the API Boundary",

      paragraphs: [
        "The controller represents the boundary between the outside world and the internal application.",
        "External clients communicate using HTTP, JSON, headers, URLs, and status codes. Internal application layers generally work with Java objects and application operations.",
        "The controller translates between these two worlds."
      ],

      code: {
        language: "text",
        code: `External World
-------------------------
HTTP
JSON
Headers
URLs
Status Codes
-------------------------
          |
          v
     Controller
          |
          v
Internal Application
-------------------------
DTOs
Services
Entities
Repositories
-------------------------`
      }
    },

    {
      id: "controller-responsibilities",
      title: "Controller Responsibilities",

      paragraphs: [
        "A controller can receive path variables, query parameters, request bodies, HTTP headers, and other HTTP-related information.",
        "It then delegates the actual application operation to the service layer.",
        "The controller should not normally contain the complete business process."
      ],

      bullets: [
        "Map URLs to Java methods.",
        "Receive HTTP requests.",
        "Extract request data.",
        "Bind JSON request bodies to DTOs.",
        "Read path variables.",
        "Read query parameters.",
        "Read relevant HTTP headers.",
        "Trigger request validation.",
        "Call service methods.",
        "Return response data.",
        "Choose or propagate appropriate HTTP status codes.",
        "Handle HTTP-specific concerns."
      ]
    },

    {
      id: "controller-not-responsible",

      title: "What Should the Controller Not Do?",

      paragraphs: [
        "The controller should not become responsible for every operation in the application.",
        "Database access, complex business rules, transaction workflows, and large calculations should normally be delegated to appropriate application layers."
      ],

      code: {
        language: "text",
        code: `Controller should NOT normally contain:

    SQL queries
       |
    Database access
       |
    Complex business rules
       |
    Large calculations
       |
    Multi-step transaction workflows
       |
    Persistence-specific logic`
      }
    },

    {
      id: "basic-controller",
      title: "Basic Controller",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public String getEmployees() {
        return "Employee list";
    }
}`
      },

      paragraphs: [
        "The @RestController annotation tells Spring that this class contains REST endpoints and that returned values are normally written to the HTTP response body.",
        "@RequestMapping defines a common URL prefix.",
        "@GetMapping maps a GET request to the getEmployees method."
      ]
    },

    {
      id: "restcontroller-meaning",

      title: "What Does @RestController Mean?",

      paragraphs: [
        "@RestController is a convenience annotation used for REST controllers. Conceptually, it combines @Controller with @ResponseBody.",
        "This means return values from handler methods are generally written directly to the HTTP response body rather than being interpreted as view names."
      ],

      code: {
        language: "java",
        code: `@RestController
public class EmployeeController {

    @GetMapping("/employees")
    public EmployeeResponse getEmployee() {
        return new EmployeeResponse(
            1L,
            "Rahul",
            "rahul@example.com",
            "Engineering"
        );
    }
}`
      }
    },

    {
      id: "request-mapping",

      title: "Mapping Requests to Controller Methods",

      paragraphs: [
        "Spring MVC uses mapping annotations to determine which controller method should handle an incoming request.",
        "The mapping can include the URL path and HTTP method."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public List<EmployeeResponse> getEmployees() {
    return service.getAll();
}

@PostMapping("/employees")
public EmployeeResponse createEmployee(
        @RequestBody EmployeeCreateRequest request) {
    return service.create(request);
}

@PutMapping("/employees/{id}")
public EmployeeResponse updateEmployee(
        @PathVariable Long id,
        @RequestBody EmployeeUpdateRequest request) {
    return service.update(id, request);
}

@DeleteMapping("/employees/{id}")
public void deleteEmployee(
        @PathVariable Long id) {
    service.delete(id);
}`
      }
    },

    {
      id: "controller-service",
      title: "Controller Calling a Service",

      paragraphs: [
        "In a layered application, the controller should delegate application operations to a service rather than implementing the complete business process itself.",
        "Constructor injection is commonly used so that the controller explicitly declares the service it requires."
      ],

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

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id) {

        return service.getEmployee(id);
    }
}`
      }
    },

    {
      id: "constructor-injection",
      title: "Constructor Injection in Controllers",

      paragraphs: [
        "Constructor injection makes required dependencies explicit and allows Spring to provide the service bean when creating the controller.",
        "It also makes the controller easier to unit test because a service can be supplied directly in a test."
      ],

      code: {
        language: "java",
        code: `@RestController
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(
            EmployeeService service) {

        this.service = service;
    }
}`
      }
    },

    {
      id: "request-body",
      title: "Receiving a Request Body",

      code: {
        language: "java",
        code: `@PostMapping
public EmployeeResponse createEmployee(
        @RequestBody EmployeeCreateRequest request) {

    return service.createEmployee(request);
}`
      },

      paragraphs: [
        "The request body is deserialized into EmployeeCreateRequest before the controller method is invoked.",
        "The controller then passes the request object to the service.",
        "For JSON requests, Spring MVC typically uses an HTTP message converter, commonly backed by Jackson, to convert JSON into the Java object."
      ]
    },

    {
      id: "path-variable",
      title: "Receiving a Path Variable",

      paragraphs: [
        "A path variable represents a value embedded inside the URL path. It is commonly used to identify a specific resource."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/{id}")
public EmployeeResponse getEmployee(
        @PathVariable Long id) {

    return service.getEmployee(id);
}`
      },

      output: `GET /api/employees/10

id = 10`
    },

    {
      id: "request-param",
      title: "Receiving a Query Parameter",

      paragraphs: [
        "Query parameters are values supplied after the question mark in a URL. They are commonly used for filtering, searching, sorting, and pagination."
      ],

      code: {
        language: "java",
        code: `@GetMapping
public List<EmployeeResponse> search(
        @RequestParam String department) {

    return service.findByDepartment(department);
}`
      },

      output: `GET /api/employees?department=Engineering

department = Engineering`
    },

    {
      id: "request-header",
      title: "Reading HTTP Headers",

      paragraphs: [
        "A controller can read specific HTTP headers when an endpoint needs information from the request metadata."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/profile")
public String profile(
        @RequestHeader("X-Client-Version")
        String clientVersion) {

    return "Client version: " + clientVersion;
}`
      }
    },

    {
      id: "validation",
      title: "Triggering Request Validation",

      paragraphs: [
        "Controllers are commonly the boundary where request DTO validation is triggered.",
        "When @Valid is placed on a request body parameter, Spring validates the DTO according to its Jakarta Bean Validation constraints."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> create(
        @Valid
        @RequestBody EmployeeCreateRequest request) {

    EmployeeResponse response =
            service.createEmployee(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      }
    },

    {
      id: "validation-flow",
      title: "Controller Validation Flow",

      code: {
        language: "text",
        code: `HTTP Request
     |
     v
@RequestBody
     |
     v
JSON -> DTO
     |
     v
@Valid
     |
     v
Bean Validation
     |
  +--+--+
  |     |
Valid  Invalid
  |     |
  v     v
Service Error Response`
      },

      paragraphs: [
        "For a standard @Valid @RequestBody scenario, invalid input is rejected before the controller method proceeds with its normal business operation."
      ]
    },

    {
      id: "response-entity",
      title: "Using ResponseEntity",

      paragraphs: [
        "ResponseEntity allows the controller to explicitly control the HTTP status, headers, and response body.",
        "It is particularly useful when different operations need different HTTP status codes."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<EmployeeResponse> create(
        @RequestBody EmployeeCreateRequest request) {

    EmployeeResponse response =
            service.createEmployee(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      }
    },

    {
      id: "status-codes",
      title: "Choosing HTTP Status Codes",

      paragraphs: [
        "The controller is responsible for representing the result of the application operation as an HTTP response.",
        "Common CRUD operations use different status codes depending on what happened."
      ],

      code: {
        language: "text",
        code: `POST create
    -> 201 Created

GET successful
    -> 200 OK

PUT successful
    -> 200 OK

DELETE successful
    -> 204 No Content

Invalid request
    -> 400 Bad Request

Unauthenticated
    -> 401 Unauthorized

Forbidden operation
    -> 403 Forbidden

Resource not found
    -> 404 Not Found

Conflict
    -> 409 Conflict

Unexpected server failure
    -> 500 Internal Server Error`
      }
    },

    {
      id: "response-dto",
      title: "Returning a Response DTO",

      paragraphs: [
        "The controller should normally return an API response model rather than exposing a persistence entity directly.",
        "This gives the API control over what information is returned."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/{id}")
public ResponseEntity<EmployeeResponse> getEmployee(
        @PathVariable Long id) {

    EmployeeResponse response =
            service.getEmployee(id);

    return ResponseEntity.ok(response);
}`
      }
    },

    {
      id: "thin-controller",
      title: "What is a Thin Controller?",

      paragraphs: [
        "A thin controller contains only the HTTP-related work required to receive a request, call the application layer, and produce the response.",
        "The controller should not become a large class containing database queries, complicated business rules, calculations, and unrelated processing."
      ],

      code: {
        language: "text",
        code: `Good:

Controller
   |
   +--> Bind request
   +--> Validate input
   +--> Call service
   +--> Build HTTP response


Avoid:

Controller
   |
   +--> SQL
   +--> Database access
   +--> Complex business rules
   +--> Large calculations
   +--> Transaction workflow
   +--> Persistence mapping
   +--> Everything else`
      }
    },

    {
      id: "controller-business-logic",
      title: "Why Should Business Logic Stay Out of the Controller?",

      paragraphs: [
        "Putting business logic inside controllers creates large, difficult-to-test classes and couples business behavior to HTTP.",
        "The same business operation may later be needed by another entry point such as a scheduled job, message consumer, or another service. If the logic lives inside the controller, it becomes harder to reuse."
      ],

      code: {
        language: "text",
        code: `Bad:

Controller
    |
    +--> Check rules
    +--> Calculate values
    +--> Update database
    +--> Send response


Better:

Controller
    |
    v
Service
    |
    +--> Business rules
    +--> Calculations
    +--> Repository calls
    |
    v
Repository`
      }
    },

    {
      id: "controller-repository",

      title: "Why Should Controller Not Call Repository Directly?",

      paragraphs: [
        "A controller can technically inject a repository, but doing so bypasses the service layer and mixes HTTP concerns with persistence concerns.",
        "For simple applications this may appear convenient, but as business rules grow the architecture becomes difficult to maintain."
      ],

      code: {
        language: "text",
        code: `Avoid:

Controller
    |
    v
Repository
    |
    v
Database


Preferred:

Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database`
      }
    },

    {
      id: "controller-dto-flow",
      title: "Controller DTO Flow",

      code: {
        language: "text",
        code: `Client JSON
    |
    v
Request DTO
    |
    v
Controller
    |
    v
Service
    |
    v
Entity
    |
    v
Repository


Database
    |
    v
Entity
    |
    v
Service
    |
    v
Response DTO
    |
    v
Controller
    |
    v
Client JSON`
      },

      paragraphs: [
        "Request DTOs and response DTOs allow the controller boundary to remain independent from the database entity model."
      ]
    },

    {
      id: "request-response-flow",
      title: "Complete Controller Request Flow",

      code: {
        language: "text",
        code: `1. Client sends HTTP request
              |
              v
2. DispatcherServlet receives request
              |
              v
3. Spring finds controller method
              |
              v
4. Request data is bound
              |
              v
5. Validation runs when configured
              |
              v
6. Controller calls service
              |
              v
7. Service performs application operation
              |
              v
8. Controller receives result
              |
              v
9. Result becomes HTTP response
              |
              v
10. Client receives response`
      }
    },

    {
      id: "dispatcher-servlet",
      title: "Where Does the Controller Fit in Spring MVC?",

      paragraphs: [
        "The controller is not normally the first Spring component to receive the raw network connection. In a typical Spring MVC application, the embedded web server receives the HTTP request and forwards it into the servlet-based web stack.",
        "DispatcherServlet acts as the central front controller. It helps locate the appropriate controller handler method and coordinates request processing."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
Embedded Server
  |
  v
DispatcherServlet
  |
  v
Handler Mapping
  |
  v
Controller Method
  |
  v
Service`
      }
    },

    {
      id: "controller-mapping-resolution",
      title: "How Does Spring Find the Controller Method?",

      paragraphs: [
        "Spring registers controller handler methods and their mappings when the application context starts.",
        "When a request arrives, Spring uses the request path and HTTP method to find the matching handler method."
      ],

      code: {
        language: "text",
        code: `Request:

GET /api/employees/10

        |
        v

Spring looks for a matching mapping

        |
        v

@GetMapping("/{id}")

        |
        v

EmployeeController.getEmployee(10)`
      }
    },

    {
      id: "path-vs-query",
      title: "Path Variable vs Query Parameter in Controller",

      code: {
        language: "text",
        code: `Path Variable

GET /api/employees/10

Meaning:
Identify employee 10


Query Parameter

GET /api/employees?department=IT

Meaning:
Filter/search employees by department`
      },

      paragraphs: [
        "Path variables are commonly used when the value identifies a resource. Query parameters are commonly used for filtering, searching, sorting, pagination, or optional parameters."
      ]
    },

    {
      id: "request-body-vs-path",
      title: "Request Body vs Path Variable vs Query Parameter",

      code: {
        language: "text",
        code: `Path Variable
/api/employees/{id}
        |
        +--> Resource identity


Query Parameter
/api/employees?department=IT
        |
        +--> Filtering/searching/options


Request Body
POST /api/employees
{
    "name": "Rahul",
    "email": "rahul@example.com"
}
        |
        +--> Resource data`
      }
    },

    {
      id: "headers",
      title: "Headers and Controller Responsibilities",

      paragraphs: [
        "Headers carry HTTP metadata such as content type, authorization information, correlation identifiers, and client information.",
        "The controller may read headers when they are relevant to the endpoint, although authentication headers are normally processed by the security layer rather than manually implemented in every controller."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/trace")
public String trace(
        @RequestHeader("X-Request-Id")
        String requestId) {

    return "Request ID: " + requestId;
}`
      }
    },

    {
      id: "content-type",
      title: "Content-Type and Accept",

      paragraphs: [
        "Content-Type describes the format of the request body. Accept indicates which response media types the client prefers.",
        "For JSON REST APIs, application/json is the most common media type."
      ],

      code: {
        language: "http",
        code: `POST /api/employees
Content-Type: application/json
Accept: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}`
      }
    },

    {
      id: "exception-flow",
      title: "Exception Handling from the Controller Boundary",

      paragraphs: [
        "Controllers should not normally contain large try-catch blocks for every possible application exception.",
        "A global exception handler using @RestControllerAdvice can translate application exceptions into consistent HTTP responses."
      ],

      code: {
        language: "text",
        code: `Controller
    |
    v
Service
    |
    +---- EmployeeNotFoundException
    |
    v
@RestControllerAdvice
    |
    v
404 Not Found`
      }
    },

    {
      id: "exception-example",
      title: "Controller with Global Exception Handling",

      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleNotFound(
            EmployeeNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}`
      },

      paragraphs: [
        "This keeps error-response creation separate from the normal controller methods."
      ]
    },

    {
      id: "controller-validation-error",
      title: "Validation Error at the Controller Boundary",

      paragraphs: [
        "When @Valid validates a request body and constraints fail, Spring MVC commonly raises MethodArgumentNotValidException for that request-body validation scenario.",
        "A global exception handler can extract field errors and return a consistent API response."
      ],

      code: {
        language: "text",
        code: `POST /api/employees

        |
        v
@RequestBody
        |
        v
@Valid
        |
        v
Validation Failure
        |
        v
MethodArgumentNotValidException
        |
        v
@RestControllerAdvice
        |
        v
400 Bad Request`
      }
    },

    {
      id: "complete-controller",
      title: "Complete Controller Example",

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

    @PostMapping
    public ResponseEntity<EmployeeResponse> create(
            @Valid
            @RequestBody EmployeeCreateRequest request) {

        EmployeeResponse response =
                service.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getEmployee(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> update(
            @PathVariable Long id,
            @Valid
            @RequestBody EmployeeUpdateRequest request) {

        return ResponseEntity.ok(
                service.update(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}`
      }
    },

    {
      id: "controller-interface",

      title: "Should Controllers Use Interfaces?",

      paragraphs: [
        "A controller does not need an interface simply because it is a controller. Interfaces can be useful in specific designs, such as defining a public contract or supporting a particular architectural approach, but creating interfaces for every controller is not a Spring requirement.",
        "The important principle is clear responsibility separation rather than creating abstractions without a purpose."
      ]
    },

    {
      id: "controller-size",

      title: "When Does a Controller Become Too Large?",

      paragraphs: [
        "There is no universal line-count rule for controller size. A controller becomes problematic when it contains responsibilities that belong to other layers or when individual methods become difficult to understand and test.",
        "If a controller contains database operations, complex calculations, repeated business rules, transaction workflows, or large transformations, those responsibilities should be reconsidered."
      ]
    },

    {
      id: "controller-testing",

      title: "Testing the Controller Layer",

      paragraphs: [
        "Controller tests should focus primarily on HTTP behavior rather than repeating all service-layer business tests.",
        "In Spring Boot, MockMvc is commonly used with @WebMvcTest for focused MVC/controller testing."
      ],

      code: {
        language: "java",
        code: `@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService service;

    @Test
    void shouldGetEmployee() throws Exception {

        given(service.getEmployee(1L))
                .willReturn(
                    new EmployeeResponse(
                        1L,
                        "Rahul",
                        "rahul@example.com",
                        "Engineering"
                    )
                );

        mockMvc.perform(
                get("/api/employees/1")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1));
    }
}`
      }
    },

    {
      id: "controller-test-responsibilities",
      title: "What Should Controller Tests Verify?",

      bullets: [
        "URL mapping.",
        "HTTP method mapping.",
        "Request body handling.",
        "Path variable handling.",
        "Query parameter handling.",
        "Validation behavior.",
        "HTTP status codes.",
        "Response JSON.",
        "Service interaction where appropriate.",
        "Controller-level exception behavior."
      ],

      paragraphs: [
        "The service's detailed business rules should normally be tested separately in service-layer unit tests."
      ]
    },

    {
      id: "mockmvc-vs-real-server",
      title: "MockMvc vs Running the Real Server",

      paragraphs: [
        "MockMvc can test Spring MVC request handling without requiring a real network connection to an externally running server.",
        "This makes focused controller tests fast and useful for verifying mappings, validation, serialization, status codes, and controller behavior."
      ],

      code: {
        language: "text",
        code: `MockMvc

Test
 |
 v
Spring MVC
 |
 v
Controller
 |
 v
Mocked Service


Real API Test

Client
 |
 v
HTTP
 |
 v
Server
 |
 v
Spring MVC
 |
 v
Controller`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Controller Mistakes",

      bullets: [
        "Putting business logic directly in controller methods.",
        "Calling repositories directly from controllers.",
        "Returning database entities without considering API exposure.",
        "Forgetting @RequestBody for JSON request bodies.",
        "Forgetting @PathVariable for URL variables.",
        "Using query parameters when a resource identifier should be part of the path.",
        "Forgetting @Valid when request validation is required.",
        "Returning 200 OK for every operation without considering the appropriate status.",
        "Writing large try-catch blocks in every controller.",
        "Putting database transaction logic directly into controllers.",
        "Creating very large controller methods.",
        "Duplicating the same business rules across multiple endpoints."
      ]
    },

    {
      id: "best-practices",

      title: "Controller Layer Best Practices",

      bullets: [
        "Keep controllers thin.",
        "Use constructor injection for required dependencies.",
        "Use request DTOs instead of binding API input directly to entities when appropriate.",
        "Use response DTOs to control the API contract.",
        "Use @Valid for request DTO validation.",
        "Delegate business operations to services.",
        "Do not access repositories directly from controllers in a layered design.",
        "Return meaningful HTTP status codes.",
        "Use global exception handling for consistent errors.",
        "Keep authentication and authorization concerns aligned with the security layer.",
        "Write focused controller tests.",
        "Avoid unnecessary abstractions and interfaces.",
        "Keep URL and HTTP semantics clear and consistent."
      ]
    },

    {
      id: "controller-security-preview",
      title: "Controller and Security",

      paragraphs: [
        "Controllers are protected by the application's security configuration, but authentication and authorization are not normally implemented manually inside every controller method.",
        "Spring Security can process authentication and authorization before the request reaches the controller.",
        "Method-level authorization can also be applied when required."
      ],

      code: {
        language: "text",
        code: `Client
  |
  v
Security Filters
  |
  +--> Authentication
  +--> Authorization
  |
  v
Controller
  |
  v
Service`
      }
    },

    {
      id: "controller-logging",
      title: "Logging in Controllers",

      paragraphs: [
        "Controllers may log useful request-level information, but sensitive data such as passwords, tokens, and confidential personal information should not be logged.",
        "In many applications, detailed operational logging belongs across several layers rather than being concentrated in the controller."
      ],

      bullets: [
        "Log useful request identifiers where appropriate.",
        "Avoid logging passwords.",
        "Avoid logging bearer tokens.",
        "Avoid unnecessarily logging sensitive request bodies.",
        "Use structured logging in production systems when appropriate."
      ]
    },

    {
      id: "controller-performance",
      title: "Controller Performance Considerations",

      paragraphs: [
        "Controllers should avoid performing expensive operations directly. Long-running work may belong in a service or asynchronous processing workflow depending on the application's requirements.",
        "The controller itself should remain focused on translating HTTP input into an application operation and translating the result back into an HTTP response."
      ]
    },

    {
      id: "architecture-summary",
      title: "Controller Layer in the Complete Architecture",

      code: {
        language: "text",
        code: `                         Client
                            |
                            | HTTP
                            v
                    +----------------+
                    |   Controller   |
                    +----------------+
                            |
                            | DTO
                            v
                    +----------------+
                    |    Service     |
                    +----------------+
                            |
                            v
                    +----------------+
                    |   Repository   |
                    +----------------+
                            |
                            v
                    +----------------+
                    | JPA / Hibernate|
                    +----------------+
                            |
                            v
                         MySQL`
      }
    },

    {
      id: "interview",
      title: "Controller Layer Interview Questions",

      interviewQuestions: [
        {
          question: "What is the responsibility of a controller?",
          answer:
            "A controller handles HTTP requests, extracts request information, delegates application operations, and returns HTTP responses."
        },
        {
          question: "Should a controller contain business logic?",
          answer:
            "Controllers should generally remain focused on HTTP concerns. Business logic should normally be placed in the service or appropriate domain layer."
        },
        {
          question: "Why use constructor injection in controllers?",
          answer:
            "Constructor injection makes required dependencies explicit and allows Spring to provide the required service bean. It also makes the controller easier to unit test."
        },
        {
          question: "What is ResponseEntity?",
          answer:
            "ResponseEntity represents an HTTP response and allows explicit control over the response body, status code, and headers."
        },
        {
          question: "What is @RestController?",
          answer:
            "@RestController is a convenience annotation for REST controllers. Conceptually, it combines @Controller with @ResponseBody."
        },
        {
          question: "What is the difference between @RequestBody and @PathVariable?",
          answer:
            "@RequestBody binds request body data, commonly JSON, to a Java object. @PathVariable extracts a value embedded in the URL path."
        },
        {
          question: "What is @RequestParam used for?",
          answer:
            "@RequestParam binds query parameters from the URL to controller method parameters."
        },
        {
          question: "Why should a controller call a service instead of a repository?",
          answer:
            "The service layer separates HTTP concerns from application and business logic and provides a place to coordinate persistence operations and business rules."
        },
        {
          question: "What is a thin controller?",
          answer:
            "A thin controller performs mainly HTTP-related work such as request binding, validation triggering, service delegation, and response creation while keeping business logic in the appropriate application layer."
        },
        {
          question: "Why use DTOs in controllers?",
          answer:
            "DTOs provide explicit API request and response contracts and prevent the persistence entity model from becoming tightly coupled to the API."
        },
        {
          question: "Where does validation usually happen for a request body?",
          answer:
            "Validation is commonly triggered at the controller boundary using @Valid on a request DTO, with the actual constraint evaluation performed by Bean Validation infrastructure."
        },
        {
          question: "What happens when @Valid request-body validation fails?",
          answer:
            "For the standard Spring MVC request-body scenario, validation failure commonly results in MethodArgumentNotValidException, which can be handled by a global exception handler."
        },
        {
          question: "Why should exception handling be centralized?",
          answer:
            "Centralized exception handling keeps controller methods clean and provides consistent HTTP error responses across the API."
        },
        {
          question: "What is the role of DispatcherServlet?",
          answer:
            "DispatcherServlet is Spring MVC's central front controller. It coordinates request processing and helps route requests to the appropriate controller handler method."
        },
        {
          question: "Should authentication logic be written inside every controller?",
          answer:
            "Normally no. Spring Security processes authentication and authorization through its security infrastructure. Controllers should receive requests after the relevant security checks have been applied."
        },
        {
          question: "How do you test a controller in Spring Boot?",
          answer:
            "A focused controller test commonly uses @WebMvcTest and MockMvc to test mappings, request handling, validation, status codes, and response JSON while mocking the service dependency."
        },
        {
          question: "Why should controllers not directly perform SQL operations?",
          answer:
            "Direct database operations mix HTTP concerns with persistence concerns and make the architecture harder to test, maintain, and evolve."
        },
        {
          question: "What HTTP status should normally be returned after successful resource creation?",
          answer:
            "HTTP 201 Created is commonly used when a POST operation successfully creates a new resource."
        },
        {
          question: "What HTTP status is commonly returned after a successful DELETE with no response body?",
          answer:
            "HTTP 204 No Content is commonly used when deletion succeeds and there is no response body to return."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Controller Questions",

      interviewQuestions: [
        {
          question:
            "Your controller has 500 lines of code and contains SQL queries. What would you do?",

          answer:
            "Move persistence operations into a repository and business/application logic into a service. Keep the controller focused on HTTP request handling, validation, delegation, and response creation."
        },

        {
          question:
            "A frontend sends POST /api/employees with invalid email data. Where should the request be rejected?",

          answer:
            "The request DTO should define the email constraint and @Valid should trigger validation at the controller boundary. The invalid request can then be converted into a 400 response."
        },

        {
          question:
            "The same business rule is required by a REST controller and a scheduled job. Where should the rule be implemented?",

          answer:
            "The reusable application or business logic should normally be placed in the service or domain layer rather than inside the REST controller."
        },

        {
          question:
            "A controller returns Employee entity objects directly and now a new internal field is appearing in the API response. How would you fix it?",

          answer:
            "Introduce or use a response DTO and map the entity to the DTO so that the API explicitly controls which fields are exposed."
        },

        {
          question:
            "An interviewer asks why you return ResponseEntity instead of simply returning an object. What would you say?",

          answer:
            "ResponseEntity provides explicit control over HTTP status, headers, and body. A plain object return is simpler when default response behavior is sufficient."
        },

        {
          question:
            "A controller method contains five database calls and several business rules. Is that good layered architecture?",

          answer:
            "No. The controller is doing responsibilities that belong in the service and repository layers. The controller should delegate the application operation instead."
        },

        {
          question:
            "How would you test that an invalid request returns HTTP 400?",

          answer:
            "Use a controller test with MockMvc, send an invalid request body, and assert that the response has the expected 400 status and validation error structure."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",

      bullets: [
        "Controller is the HTTP/API boundary.",
        "@RestController is commonly used for REST endpoints.",
        "@RequestMapping defines a common path.",
        "@GetMapping handles GET requests.",
        "@PostMapping handles POST requests.",
        "@PutMapping handles PUT requests.",
        "@PatchMapping handles PATCH requests.",
        "@DeleteMapping handles DELETE requests.",
        "@RequestBody binds request body data.",
        "@PathVariable reads URL path values.",
        "@RequestParam reads query parameters.",
        "@RequestHeader reads HTTP headers.",
        "@Valid triggers request DTO validation.",
        "ResponseEntity controls status, headers, and body.",
        "Controllers should generally remain thin.",
        "Business logic belongs in the service/domain layer.",
        "Persistence belongs in the repository layer.",
        "DTOs provide explicit API contracts.",
        "@RestControllerAdvice is useful for centralized exception handling.",
        "MockMvc is commonly used for controller testing.",
        "DispatcherServlet coordinates Spring MVC request processing."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",

      paragraphs: [
        "The controller layer is the HTTP boundary of a Spring Boot application. It receives HTTP requests, binds request data such as JSON bodies, path variables, and query parameters, triggers validation when required, delegates the application operation to the service layer, and returns an HTTP response with the appropriate status and response body. A good controller should be thin and should not contain database access or complex business logic. DTOs are commonly used to keep the API contract separate from persistence entities, while global exception handling provides consistent error responses."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes",

      paragraphs: [
        "The easiest way to remember the controller layer is: 'Controller handles HTTP; Service handles application logic; Repository handles persistence.'",
        "When an HTTP request arrives, Spring MVC uses DispatcherServlet and its request-mapping infrastructure to find the appropriate controller method.",
        "The controller receives external data and converts the HTTP-level request into an application-level method call. For example, @RequestBody converts JSON into a request DTO, while @PathVariable and @RequestParam extract values from the URL.",
        "Controllers should remain thin. If you see SQL queries, large business rules, complex transaction workflows, or substantial calculations inside a controller, those responsibilities should usually be moved to more appropriate layers.",
        "For interviews, remember that @RestController is used for REST endpoints, ResponseEntity gives explicit response control, @Valid triggers request-body validation, and @RestControllerAdvice is commonly used for centralized exception handling.",
        "The complete mental model is: Client -> HTTP -> DispatcherServlet -> Controller -> Service -> Repository -> Database, and then the result travels back toward the client."
      ]
    }
  ]
};
