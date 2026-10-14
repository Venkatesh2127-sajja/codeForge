
export const buildingCompleteRestApi = {
  id: "building-complete-rest-api",
  title: "Building a Complete REST API",
  slug: "building-complete-rest-api",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "45 min",
  description:
    "Build a practical Spring Boot REST API using a controller, HTTP methods, path variables, request parameters, request bodies, ResponseEntity, HTTP status codes, and a complete CRUD request flow.",

  sections: [
    {
      id: "project",
      title: "Project Example",
      paragraphs: [
        "Let's build a simple Employee REST API using Spring Boot.",
        "For this lesson, the data will be kept in memory so that we can focus on REST API fundamentals before introducing Spring Data JPA and MySQL.",
        "The API will support the four fundamental CRUD operations: Create, Read, Update, and Delete.",
        "An employee will contain an id, name, email, and department.",
        "The purpose of this example is not to build a production-ready persistence layer. The goal is to understand how an HTTP request reaches a Spring Boot controller, how request data is extracted, how the application processes it, and how an HTTP response is returned."
      ],
      code: {
        language: "text",
        code: `Employee REST API

GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}


CRUD mapping:

Create -> POST
Read   -> GET
Update -> PUT
Delete -> DELETE`
      },
      bullets: [
        "GET is used to retrieve resources.",
        "POST is commonly used to create a new resource.",
        "PUT is commonly used to replace or update a resource.",
        "DELETE is used to remove a resource.",
        "The /api/employees path represents the employee resource.",
        "The {id} portion identifies one specific employee.",
        "The example uses in-memory storage instead of a database."
      ]
    },

    {
      id: "rest-concept",
      title: "What Is a REST API?",
      paragraphs: [
        "REST stands for Representational State Transfer. REST is an architectural style used for designing networked applications, especially HTTP-based APIs.",
        "A REST API exposes resources through URLs and uses HTTP methods to describe operations performed on those resources.",
        "For example, an employee is a resource. Instead of creating URLs such as /getAllEmployees or /deleteEmployee, a REST-style API generally uses a resource-oriented URL such as /api/employees and lets the HTTP method describe the operation.",
        "A REST API commonly exchanges data using JSON. Spring Boot automatically converts Java objects to JSON responses and JSON request bodies to Java objects when the appropriate HTTP message converters are available."
      ],
      code: {
        language: "text",
        code: `Resource-oriented design:

/api/employees

GET
    Read employees

POST
    Create employee

/api/employees/101

GET
    Read employee 101

PUT
    Update employee 101

DELETE
    Delete employee 101`
      },
      bullets: [
        "REST APIs are commonly built on HTTP.",
        "URLs identify resources.",
        "HTTP methods describe the intended operation.",
        "JSON is commonly used as the request and response representation.",
        "REST APIs should use meaningful resource-oriented URLs.",
        "HTTP status codes communicate the result of a request."
      ]
    },

    {
      id: "employee-model",
      title: "Employee Model",
      paragraphs: [
        "The Employee class represents the data that our REST API will expose.",
        "Because this lesson uses an in-memory list, the class does not need JPA annotations such as @Entity or @Id yet. Those concepts will be introduced when persistent database storage is added.",
        "The no-argument constructor is useful because Spring's JSON deserialization mechanism may need to create an object before setting its properties."
      ],
      code: {
        language: "java",
        code: `public class Employee {

    private Long id;
    private String name;
    private String email;
    private String department;

    public Employee() {
    }

    public Employee(
            Long id,
            String name,
            String email,
            String department
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}`
      },
      bullets: [
        "id uniquely identifies an employee in this example.",
        "name stores the employee's name.",
        "email stores the employee's email address.",
        "department stores the employee's department.",
        "The model is currently a normal Java class.",
        "Database annotations are intentionally not used in this lesson."
      ]
    },

    {
      id: "controller",
      title: "Employee REST Controller",
      paragraphs: [
        "The controller is the HTTP entry point for our REST API.",
        "The @RestController annotation tells Spring that the class contains REST endpoints and that return values should normally be written directly to the HTTP response body.",
        "The @RequestMapping annotation defines a common URL prefix for all methods in the controller.",
        "Each HTTP method is then mapped using @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping.",
        "The controller in this beginner example also contains the in-memory list. In a larger application, this responsibility should be moved into a service and repository layer."
      ],
      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final List<Employee> employees =
            new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(
            @PathVariable Long id
    ) {

        return employees.stream()
                .filter(employee ->
                        employee.getId().equals(id)
                )
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @RequestBody Employee employee
    ) {

        employees.add(employee);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee updatedEmployee
    ) {

        for (Employee employee : employees) {

            if (employee.getId().equals(id)) {

                employee.setName(
                        updatedEmployee.getName()
                );

                employee.setEmail(
                        updatedEmployee.getEmail()
                );

                employee.setDepartment(
                        updatedEmployee.getDepartment()
                );

                return ResponseEntity.ok(employee);
            }
        }

        return ResponseEntity
                .notFound()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id
    ) {

        boolean removed = employees.removeIf(
                employee ->
                        employee.getId().equals(id)
        );

        if (!removed) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity
                .noContent()
                .build();
    }
}`
      },
      bullets: [
        "@RestController makes the class a REST controller.",
        "@RequestMapping defines the common URL prefix.",
        "@GetMapping handles GET requests.",
        "@PostMapping handles POST requests.",
        "@PutMapping handles PUT requests.",
        "@DeleteMapping handles DELETE requests.",
        "@RequestBody reads JSON request data.",
        "@PathVariable reads values from the URL path.",
        "ResponseEntity provides explicit HTTP response control."
      ]
    },

    {
      id: "rest-controller",
      title: "Why Use @RestController?",
      paragraphs: [
        "@RestController is a specialized Spring MVC annotation used for REST APIs.",
        "It combines the behavior of @Controller and @ResponseBody. As a result, the return value from a controller method is normally written into the HTTP response body instead of being interpreted as a view name.",
        "This is why a Java Employee object returned from a REST endpoint can become JSON in the HTTP response."
      ],
      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/{id}")
    public Employee getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.findById(id);
    }
}`
      },
      bullets: [
        "@Controller is commonly used for MVC controllers.",
        "@ResponseBody tells Spring to write the returned value to the response body.",
        "@RestController combines @Controller and @ResponseBody behavior.",
        "REST controllers commonly return Java objects that Spring serializes as JSON."
      ]
    },

    {
      id: "http-methods",
      title: "HTTP Methods and CRUD",
      paragraphs: [
        "HTTP methods communicate the intended operation of a request.",
        "The most important methods for basic CRUD APIs are GET, POST, PUT, and DELETE.",
        "Choosing the correct HTTP method makes an API easier to understand and allows clients, tools, caches, and infrastructure to reason about requests correctly."
      ],
      code: {
        language: "text",
        code: `CRUD        HTTP Method       Example

Create      POST              /api/employees

Read all    GET               /api/employees

Read one    GET               /api/employees/101

Update      PUT               /api/employees/101

Delete      DELETE            /api/employees/101`
      },
      bullets: [
        "GET retrieves data.",
        "POST creates a resource or triggers a resource-oriented operation.",
        "PUT commonly replaces or updates a resource at a known URI.",
        "DELETE removes a resource.",
        "The HTTP method should match the intended operation."
      ]
    },

    {
      id: "create-request",
      title: "Create Employee",
      paragraphs: [
        "To create an employee, the client sends a POST request to /api/employees.",
        "The employee data is sent inside the HTTP request body as JSON.",
        "The @RequestBody annotation tells Spring to read the JSON body and convert it into an Employee object.",
        "A successful creation commonly returns HTTP 201 Created."
      ],
      code: {
        language: "http",
        code: `POST /api/employees
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
      },
      output: `HTTP/1.1 201 Created

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`,
      bullets: [
        "POST is used to create the employee.",
        "Content-Type tells the server that the request body contains JSON.",
        "@RequestBody maps JSON to the Employee object.",
        "201 Created indicates that creation was successful.",
        "A production API should normally validate the incoming data."
      ]
    },

    {
      id: "request-body",
      title: "Understanding @RequestBody",
      paragraphs: [
        "@RequestBody is used when information is sent inside the HTTP request body.",
        "Spring uses HTTP message converters to convert the JSON payload into the target Java type.",
        "For example, when the client sends a JSON object containing name, email, and department, Spring can create an Employee object and populate its fields."
      ],
      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<Employee> createEmployee(
        @RequestBody Employee employee
) {

    employees.add(employee);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employee);
}`
      },
      bullets: [
        "@RequestBody reads the request body.",
        "The request Content-Type should match the expected representation.",
        "Malformed JSON can result in a client error.",
        "Validation should normally be added for real applications.",
        "Do not trust request data simply because Spring successfully deserialized it."
      ]
    },

    {
      id: "get-all",
      title: "Get All Employees",
      paragraphs: [
        "The GET /api/employees endpoint returns the collection of employees.",
        "Because this is a read operation, the controller uses @GetMapping without an additional path."
      ],
      code: {
        language: "http",
        code: `GET /api/employees`
      },
      output: `HTTP/1.1 200 OK

[
  {
    "id": 101,
    "name": "Rahul",
    "email": "rahul@example.com",
    "department": "Engineering"
  }
]`,
      bullets: [
        "GET is used for reading resources.",
        "200 OK indicates successful retrieval.",
        "The response body contains an array because multiple employees are returned.",
        "In a production API, pagination is usually required for large collections."
      ]
    },

    {
      id: "get-one",
      title: "Get Employee by ID",
      paragraphs: [
        "To retrieve one employee, the ID is included in the URL path.",
        "The @PathVariable annotation extracts the value from the URL and passes it to the controller method."
      ],
      code: {
        language: "http",
        code: `GET /api/employees/101`
      },
      output: `HTTP/1.1 200 OK

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`,
      bullets: [
        "The URL identifies one employee.",
        "@PathVariable reads the 101 value.",
        "200 OK means the employee was found and returned.",
        "If the employee does not exist, 404 Not Found is appropriate."
      ]
    },

    {
      id: "path-variable",
      title: "Understanding @PathVariable",
      paragraphs: [
        "@PathVariable is used when a value is part of the URL path.",
        "Path variables are useful when the value identifies a specific resource."
      ],
      code: {
        language: "java",
        code: `@GetMapping("/{id}")
public ResponseEntity<Employee> getEmployee(
        @PathVariable Long id
) {

    // Find employee using id

    return ResponseEntity.ok(employee);
}`
      },
      bullets: [
        "URL: /api/employees/101",
        "Path variable: 101",
        "Java parameter: id",
        "The value is extracted from the URL.",
        "Path variables are commonly used for resource identifiers."
      ]
    },

    {
      id: "request-param",
      title: "Understanding @RequestParam",
      paragraphs: [
        "@RequestParam is used to read values from the query string.",
        "Query parameters are useful for filtering, searching, sorting, pagination, and optional request parameters."
      ],
      code: {
        language: "java",
        code: `@GetMapping("/search")
public ResponseEntity<List<Employee>> searchEmployees(
        @RequestParam String department
) {

    List<Employee> result = employees.stream()
            .filter(employee ->
                    employee.getDepartment()
                            .equalsIgnoreCase(department)
            )
            .toList();

    return ResponseEntity.ok(result);
}`
      },
      bullets: [
        "Example URL: /api/employees/search?department=Engineering",
        "@RequestParam reads department from the query string.",
        "Query parameters are different from path variables.",
        "Query parameters are commonly used for filtering and searching."
      ]
    },

    {
      id: "path-vs-query",
      title: "Path Variable vs Request Parameter",
      paragraphs: [
        "A common interview question is the difference between @PathVariable and @RequestParam.",
        "Use a path variable when the value identifies a specific resource. Use a request parameter when the value modifies how a collection or operation should be processed."
      ],
      code: {
        language: "text",
        code: `Path Variable

GET /api/employees/101

Meaning:
Get employee whose ID is 101.


Request Parameter

GET /api/employees?department=Engineering

Meaning:
Get employees filtered by department.


Another example:

GET /api/employees?page=0&size=10

Meaning:
Get a particular page of employees.`
      },
      bullets: [
        "@PathVariable values are part of the URL path.",
        "@RequestParam values appear after ? in the URL.",
        "IDs commonly belong in the path.",
        "Filtering and pagination commonly use query parameters."
      ]
    },

    {
      id: "update",
      title: "Update Employee",
      paragraphs: [
        "The PUT endpoint updates an existing employee.",
        "The employee ID is supplied through the URL, while the updated employee information is supplied in the request body.",
        "The controller first searches for the employee. If it exists, the fields are updated. If it does not exist, the API returns 404 Not Found."
      ],
      code: {
        language: "http",
        code: `PUT /api/employees/101
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "department": "Platform"
}`
      },
      output: `HTTP/1.1 200 OK

{
  "id": 101,
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "department": "Platform"
}`,
      bullets: [
        "The ID identifies the resource being updated.",
        "The request body contains the new values.",
        "200 OK can be returned when the update succeeds.",
        "404 Not Found can be returned when the employee does not exist.",
        "Validation should be added before updating real application data."
      ]
    },

    {
      id: "delete",
      title: "Delete Employee",
      paragraphs: [
        "The DELETE endpoint removes an employee identified by the path variable.",
        "When the employee is successfully deleted and there is no response body, HTTP 204 No Content is a suitable response."
      ],
      code: {
        language: "http",
        code: `DELETE /api/employees/101`
      },
      output: `HTTP/1.1 204 No Content`,
      bullets: [
        "DELETE is used to remove a resource.",
        "204 means the request succeeded but there is no response body.",
        "404 Not Found can be returned if the employee does not exist.",
        "Deletion rules become more complex when relationships and business constraints are introduced."
      ]
    },

    {
      id: "response-entity",
      title: "Why Use ResponseEntity?",
      paragraphs: [
        "ResponseEntity gives the controller explicit control over the HTTP response.",
        "It can control the response body, HTTP status code, and headers.",
        "Without ResponseEntity, Spring can still return objects from controller methods, but ResponseEntity becomes especially useful when different execution paths need different HTTP statuses."
      ],
      code: {
        language: "java",
        code: `return ResponseEntity.ok(employee);


return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(employee);


return ResponseEntity
        .notFound()
        .build();


return ResponseEntity
        .noContent()
        .build();`
      },
      bullets: [
        "ok() commonly returns 200 OK.",
        "status(HttpStatus.CREATED) returns 201 Created.",
        "notFound() returns 404 Not Found.",
        "noContent() returns 204 No Content.",
        "ResponseEntity can also be used to add response headers."
      ]
    },

    {
      id: "status-codes",
      title: "Important HTTP Status Codes",
      paragraphs: [
        "HTTP status codes tell the client what happened when the server processed the request.",
        "A good REST API uses status codes consistently so that clients can handle success and failure conditions correctly."
      ],
      code: {
        language: "text",
        code: `200 OK
    Request succeeded.

201 Created
    New resource was created.

204 No Content
    Request succeeded without a response body.

400 Bad Request
    Request is invalid or malformed.

401 Unauthorized
    Authentication is required or failed.

403 Forbidden
    Client is authenticated but not allowed.

404 Not Found
    Requested resource does not exist.

409 Conflict
    Request conflicts with current resource state.

500 Internal Server Error
    Unexpected server-side failure.`
      },
      bullets: [
        "Do not return 200 for every possible outcome.",
        "Use 201 for successful resource creation when appropriate.",
        "Use 404 when a requested resource does not exist.",
        "Use 400 for invalid client input.",
        "Use 401 and 403 correctly in secured APIs.",
        "Use 500 for unexpected server-side failures."
      ]
    },

    {
      id: "request-flow",
      title: "Complete REST Request Flow",
      paragraphs: [
        "Understanding the complete request flow is one of the most important concepts for a Spring Boot interview.",
        "A client sends an HTTP request. The embedded server receives it, Spring's web infrastructure finds the appropriate controller method, request parameters are resolved, the controller executes the application logic, and the returned result is converted into an HTTP response.",
        "In a larger application, the controller normally delegates business logic to a service and data access to a repository."
      ],
      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   v
Embedded Tomcat
   |
   v
Spring MVC
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
   +---- @PathVariable
   |
   +---- @RequestParam
   |
   +---- @RequestBody
   |
   v
Application Logic
   |
   v
ResponseEntity / Object
   |
   v
HTTP Message Conversion
   |
   v
HTTP Response
   |
   v
Client`
      },
      bullets: [
        "Tomcat receives the HTTP request.",
        "Spring MVC processes the request.",
        "DispatcherServlet coordinates request handling.",
        "Handler mapping identifies the appropriate controller method.",
        "Spring resolves method arguments.",
        "The controller or service processes the request.",
        "The response is converted into the HTTP response format.",
        "The client receives the status code, headers, and body."
      ]
    },

    {
      id: "json-conversion",
      title: "How Java Objects Become JSON",
      paragraphs: [
        "REST APIs commonly use JSON as the data representation.",
        "When a controller returns a Java object, Spring's HTTP message conversion infrastructure can serialize that object into JSON. In typical Spring Boot applications, Jackson provides the JSON serialization and deserialization support.",
        "The reverse happens with @RequestBody: JSON received from the client is deserialized into the requested Java object."
      ],
      code: {
        language: "text",
        code: `Java Object
    |
    | Serialization
    v
JSON Response


JSON Request
    |
    | Deserialization
    v
Java Object`
      },
      bullets: [
        "Serialization converts Java objects to JSON.",
        "Deserialization converts JSON to Java objects.",
        "@RequestBody commonly uses deserialization.",
        "Controller return values commonly use serialization.",
        "Content-Type and Accept headers help describe representations."
      ]
    },

    {
      id: "validation-preview",
      title: "Request Validation Preview",
      paragraphs: [
        "The current example accepts employee data directly. A real application should validate incoming data before processing it.",
        "For example, an employee name should not normally be blank, an email should have a valid format, and required fields should be present.",
        "Spring Boot applications commonly use Jakarta Bean Validation annotations such as @NotBlank and @Email together with @Valid."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmployeeRequest {

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String department;

    // getters and setters
}` 
      },
      bullets: [
        "Validate client input before business processing.",
        "DTOs are often preferable to exposing persistence entities directly.",
        "@Valid triggers validation on a request body when configured correctly.",
        "Validation failures should produce a consistent error response."
      ]
    },

    {
      id: "dto-preview",
      title: "Why DTOs Are Useful",
      paragraphs: [
        "The beginner example uses Employee directly as both the request and response model. In larger applications, it is usually better to introduce DTOs.",
        "A DTO, or Data Transfer Object, defines the data that should enter or leave the API. This prevents the API contract from being tightly coupled to the database entity."
      ],
      code: {
        language: "java",
        code: `public class EmployeeRequest {

    private String name;
    private String email;
    private String department;

    // getters and setters
}


public class EmployeeResponse {

    private Long id;
    private String name;
    private String email;
    private String department;

    // getters and setters
}`
      },
      bullets: [
        "Request DTOs define accepted input.",
        "Response DTOs define output.",
        "DTOs help prevent accidental exposure of internal fields.",
        "DTOs make API contracts easier to evolve.",
        "DTOs become especially useful when entities contain relationships or sensitive fields."
      ]
    },

    {
      id: "postman",
      title: "Testing the API with Postman",
      paragraphs: [
        "Postman can be used to manually test REST endpoints.",
        "Create requests for GET, POST, PUT, and DELETE and inspect the HTTP status code and response body.",
        "When testing POST and PUT requests, select Body, choose raw JSON, and set Content-Type to application/json."
      ],
      code: {
        language: "text",
        code: `GET

http://localhost:8080/api/employees


POST

http://localhost:8080/api/employees


PUT

http://localhost:8080/api/employees/101


DELETE

http://localhost:8080/api/employees/101`
      },
      bullets: [
        "Test successful requests.",
        "Test requests for nonexistent IDs.",
        "Test malformed JSON.",
        "Test missing fields once validation is added.",
        "Check status codes as well as response bodies.",
        "Check response headers when necessary."
      ]
    },

    {
      id: "postman-test-cases",
      title: "Recommended Postman Test Cases",
      paragraphs: [
        "A REST API should not be tested only with successful requests. Negative test cases are equally important because they verify how the API behaves when clients send invalid or unexpected input."
      ],
      code: {
        language: "text",
        code: `Test 1
POST valid employee
Expected: 201 Created


Test 2
GET all employees
Expected: 200 OK


Test 3
GET existing employee
Expected: 200 OK


Test 4
GET nonexistent employee
Expected: 404 Not Found


Test 5
PUT existing employee
Expected: 200 OK


Test 6
PUT nonexistent employee
Expected: 404 Not Found


Test 7
DELETE existing employee
Expected: 204 No Content


Test 8
DELETE nonexistent employee
Expected: 404 Not Found`
      },
      bullets: [
        "Always test both positive and negative scenarios.",
        "Verify status codes.",
        "Verify response body structure.",
        "Verify that update operations modify the expected resource.",
        "Verify that delete operations actually remove the resource."
      ]
    },

    {
      id: "architecture-preview",
      title: "What We Have Built",
      paragraphs: [
        "At this stage, the controller contains the API behavior directly. This is useful for learning REST fundamentals, but a production application should separate HTTP handling from business logic and persistence.",
        "As the project grows, the controller should primarily handle HTTP concerns. Business rules should move to a service layer, while database operations should move to a repository layer."
      ],
      code: {
        language: "text",
        code: `Current:

Client
  ↓
Controller
  ↓
In-Memory List


Next Topic:

Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database`
      },
      bullets: [
        "The current controller is intentionally simple.",
        "The service layer should contain business logic.",
        "The repository layer should handle persistence.",
        "The database should store data permanently.",
        "Layering improves maintainability and testability."
      ]
    },

    {
      id: "layer-responsibilities",
      title: "Responsibilities of Each Layer",
      paragraphs: [
        "A common Spring Boot architecture separates responsibilities into controller, service, repository, and database layers.",
        "This separation prevents controllers from becoming large classes containing HTTP handling, business rules, and database code at the same time."
      ],
      code: {
        language: "text",
        code: `Controller
    |
    | Handles HTTP
    | Reads request data
    | Returns HTTP response
    v
Service
    |
    | Business rules
    | Validation of business conditions
    | Transaction boundaries
    v
Repository
    |
    | Data access
    | Database queries
    v
Database`
      },
      bullets: [
        "Controller = HTTP/API layer.",
        "Service = business/application layer.",
        "Repository = persistence/data-access layer.",
        "Database = persistent storage.",
        "Each layer should have a clear responsibility."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common REST API Mistakes",
      paragraphs: [
        "Beginners often make REST APIs work technically but design them in ways that become difficult to maintain later. Understanding these mistakes early helps build better APIs."
      ],
      bullets: [
        "Using /getAllEmployees instead of the resource-oriented /employees.",
        "Using GET to perform an operation that changes server data.",
        "Returning HTTP 200 for every possible result.",
        "Putting all business logic directly into the controller.",
        "Returning database entities without considering API exposure.",
        "Not validating request bodies.",
        "Not handling nonexistent resource IDs.",
        "Ignoring Content-Type and Accept headers.",
        "Creating extremely large GET responses without pagination.",
        "Returning sensitive information in API responses.",
        "Using inconsistent response structures.",
        "Ignoring error handling.",
        "Mixing database access code directly into controllers.",
        "Using request parameters where a resource path would be clearer."
      ]
    },

    {
      id: "api-design-best-practices",
      title: "REST API Best Practices",
      paragraphs: [
        "A good REST API should be predictable. Clients should be able to understand the API by looking at resource URLs, HTTP methods, status codes, request bodies, and response bodies.",
        "The exact API design depends on the business requirements, but several practices are broadly useful."
      ],
      bullets: [
        "Use nouns for resource URLs.",
        "Use HTTP methods to describe operations.",
        "Use plural resource names such as /employees when appropriate.",
        "Use path variables for resource identifiers.",
        "Use query parameters for filtering, sorting, and pagination.",
        "Use appropriate HTTP status codes.",
        "Validate request input.",
        "Use DTOs for stable API contracts.",
        "Keep business logic in services.",
        "Keep database operations in repositories.",
        "Use consistent error responses.",
        "Document the API.",
        "Use pagination for large collections.",
        "Secure sensitive endpoints.",
        "Avoid exposing internal implementation details."
      ]
    },

    {
      id: "api-idempotency",
      title: "Idempotency of HTTP Methods",
      paragraphs: [
        "Idempotency describes whether making the same request multiple times has the same intended effect as making it once.",
        "GET, PUT, and DELETE are generally considered idempotent according to HTTP semantics, although the actual application implementation must still behave appropriately.",
        "POST is generally not idempotent because sending the same creation request multiple times can create multiple resources."
      ],
      code: {
        language: "text",
        code: `GET /api/employees/101

Repeated request:
Read employee 101

Expected effect:
No resource modification.


PUT /api/employees/101

Repeated request with the same representation:
Set employee 101 to the same state.


DELETE /api/employees/101

Repeated request:
The first request removes the resource.
A later request may return 404 because it no longer exists.


POST /api/employees

Repeated request:
May create multiple employees.`
      },
      bullets: [
        "GET should not modify application state.",
        "PUT is designed to be idempotent.",
        "DELETE is generally idempotent in its intended effect.",
        "POST is generally not idempotent.",
        "Idempotency matters when clients retry requests."
      ]
    },

    {
      id: "api-statelessness",
      title: "REST API Statelessness",
      paragraphs: [
        "A commonly discussed REST principle is statelessness. Each request should contain the information necessary for the server to process it rather than depending on hidden request-specific server state.",
        "Stateless API design makes horizontal scaling easier because a request can generally be handled by any suitable application instance."
      ],
      code: {
        language: "text",
        code: `Client
   |
   +---- Request 1 ----> Server A
   |
   +---- Request 2 ----> Server B
   |
   +---- Request 3 ----> Server A

The application should not require
request 2 to reach Server A just
because request 1 reached Server A.`
      },
      bullets: [
        "Each request should carry the information needed for processing.",
        "Stateless design helps horizontal scaling.",
        "Authentication tokens are commonly sent with requests in stateless APIs.",
        "Database or shared external storage may still be used for persistent application state."
      ]
    },

    {
      id: "error-preview",
      title: "Error Handling Preview",
      paragraphs: [
        "The current example returns 404 directly from the controller when an employee is not found.",
        "As an application grows, many controllers may need the same error-handling behavior. Spring's @ControllerAdvice and @RestControllerAdvice can centralize exception handling.",
        "This will be covered in detail in the Exception Handling section of the course."
      ],
      code: {
        language: "java",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFound(
            EmployeeNotFoundException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}`
      },
      bullets: [
        "Small examples can handle errors directly.",
        "Larger applications benefit from centralized exception handling.",
        "@RestControllerAdvice is useful for REST APIs.",
        "Consistent error responses make client development easier."
      ]
    },

    {
      id: "complete-crud-summary",
      title: "Complete CRUD Summary",
      paragraphs: [
        "The Employee API now demonstrates the complete basic CRUD lifecycle. This is the foundation for many Spring Boot backend applications."
      ],
      code: {
        language: "text",
        code: `CREATE

POST /api/employees
        |
        v
@RequestBody
        |
        v
Create Employee
        |
        v
201 Created


READ ALL

GET /api/employees
        |
        v
Return List<Employee>
        |
        v
200 OK


READ ONE

GET /api/employees/101
        |
        v
@PathVariable
        |
        v
Find employee
        |
        +---- Found ----> 200 OK
        |
        +---- Missing --> 404 Not Found


UPDATE

PUT /api/employees/101
        |
        +---- @PathVariable
        |
        +---- @RequestBody
        |
        v
Update employee
        |
        +---- Found ----> 200 OK
        |
        +---- Missing --> 404 Not Found


DELETE

DELETE /api/employees/101
        |
        v
Delete employee
        |
        +---- Deleted ---> 204 No Content
        |
        +---- Missing ---> 404 Not Found`
      },
      bullets: [
        "CRUD maps naturally to REST HTTP operations.",
        "Request data can come from path variables, query parameters, and request bodies.",
        "ResponseEntity provides explicit response control.",
        "HTTP status codes communicate the result.",
        "Production APIs should add validation, service layers, persistence, security, and centralized error handling."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",
      bullets: [
        "Use resource-oriented URLs.",
        "Use HTTP methods according to their intended semantics.",
        "Use appropriate HTTP status codes.",
        "Use @RestController for REST endpoints.",
        "Use @RequestMapping for common URL mappings.",
        "Use @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping for HTTP methods.",
        "Use @PathVariable for path values.",
        "Use @RequestParam for query parameters.",
        "Use @RequestBody for request payloads.",
        "Use ResponseEntity when explicit control over the HTTP response is needed.",
        "Keep business logic separate from controllers as the application grows.",
        "Validate incoming request data.",
        "Use DTOs when the API should be separated from persistence models.",
        "Return meaningful HTTP status codes.",
        "Handle missing resources consistently.",
        "Use pagination for large collections.",
        "Keep error responses consistent.",
        "Use service and repository layers in larger applications."
      ]
    },

    {
      id: "interview",
      title: "Complete REST API Interview Questions",
      interviewQuestions: [
        {
          question: "How do you create a REST API in Spring Boot?",
          answer:
            "Create a controller using @RestController, map endpoints using Spring MVC mapping annotations, process the request, and return an appropriate response."
        },
        {
          question: "Why use ResponseEntity?",
          answer:
            "ResponseEntity provides explicit control over the HTTP response, including status code, headers, and response body."
        },
        {
          question: "How do you return 201 Created?",
          answer:
            "For example, use ResponseEntity.status(HttpStatus.CREATED).body(resource)."
        },
        {
          question: "How do you return 404?",
          answer:
            "For example, ResponseEntity.notFound().build() can be used when the requested resource does not exist."
        },
        {
          question: "Where should business logic go?",
          answer:
            "In a layered application, business logic should generally be placed in the service layer rather than directly inside the controller."
        },
        {
          question: "What is the next step after creating basic REST endpoints?",
          answer:
            "A common next step is introducing a service layer, repository layer, validation, exception handling, and persistent database storage."
        },
        {
          question: "What is @RestController?",
          answer:
            "@RestController is a Spring annotation used for REST controllers. It combines @Controller and @ResponseBody behavior so returned values are normally written to the HTTP response body."
        },
        {
          question: "What is @RequestMapping?",
          answer:
            "@RequestMapping maps HTTP requests to controller classes or methods and is commonly used to define a common URL prefix."
        },
        {
          question: "What is @GetMapping?",
          answer:
            "@GetMapping is a composed Spring MVC annotation used to map HTTP GET requests to a controller method."
        },
        {
          question: "What is @PostMapping?",
          answer:
            "@PostMapping maps HTTP POST requests and is commonly used to create resources."
        },
        {
          question: "What is @PutMapping?",
          answer:
            "@PutMapping maps HTTP PUT requests and is commonly used to update or replace a resource."
        },
        {
          question: "What is @DeleteMapping?",
          answer:
            "@DeleteMapping maps HTTP DELETE requests and is commonly used to remove a resource."
        },
        {
          question: "What is @PathVariable?",
          answer:
            "@PathVariable extracts a value from the URL path. For example, in /api/employees/101, the value 101 can be mapped to a Long id parameter."
        },
        {
          question: "What is @RequestParam?",
          answer:
            "@RequestParam extracts a value from the query string, such as department from /api/employees?department=Engineering."
        },
        {
          question: "What is @RequestBody?",
          answer:
            "@RequestBody tells Spring to read the HTTP request body and deserialize it into the Java parameter type."
        },
        {
          question: "What is the difference between @PathVariable and @RequestParam?",
          answer:
            "@PathVariable reads values from the URL path and is commonly used for resource identifiers. @RequestParam reads query parameters and is commonly used for filtering, searching, sorting, and pagination."
        },
        {
          question: "What is the difference between @Controller and @RestController?",
          answer:
            "@RestController is effectively @Controller combined with @ResponseBody behavior, making it suitable for REST APIs where method results are written to the response body."
        },
        {
          question: "What is the difference between POST and PUT?",
          answer:
            "POST is commonly used to create a new resource, while PUT is commonly used to create or replace the representation of a resource at a known URI and is designed to be idempotent."
        },
        {
          question: "What does HTTP 200 mean?",
          answer:
            "200 OK indicates that the request was successfully processed."
        },
        {
          question: "What does HTTP 201 mean?",
          answer:
            "201 Created indicates that a new resource was successfully created."
        },
        {
          question: "What does HTTP 204 mean?",
          answer:
            "204 No Content indicates that the request succeeded and the response intentionally contains no response body."
        },
        {
          question: "What does HTTP 400 mean?",
          answer:
            "400 Bad Request indicates that the server could not process the request because the client request was invalid or malformed."
        },
        {
          question: "What does HTTP 401 mean?",
          answer:
            "401 Unauthorized indicates that authentication is required or the provided authentication credentials are invalid."
        },
        {
          question: "What does HTTP 403 mean?",
          answer:
            "403 Forbidden indicates that the request is understood but the authenticated client does not have sufficient permission."
        },
        {
          question: "What does HTTP 404 mean?",
          answer:
            "404 Not Found indicates that the requested resource could not be found."
        },
        {
          question: "What does HTTP 500 mean?",
          answer:
            "500 Internal Server Error indicates an unexpected error occurred on the server."
        },
        {
          question: "Why should business logic not be placed directly in the controller?",
          answer:
            "Keeping business logic in services makes controllers smaller and improves separation of concerns, testability, reuse, and maintainability."
        },
        {
          question: "Why use DTOs in REST APIs?",
          answer:
            "DTOs provide a dedicated API contract, reduce coupling between API models and persistence entities, and help prevent accidental exposure of internal fields."
        },
        {
          question: "How does Spring convert JSON into a Java object?",
          answer:
            "Spring uses HTTP message converters and, in typical Spring Boot applications, Jackson-based JSON support to deserialize the request body into the target Java type."
        },
        {
          question: "How does Spring convert a Java object into JSON?",
          answer:
            "Spring uses HTTP message converters to serialize the returned Java object into the representation requested by the client, commonly JSON."
        },
        {
          question: "What happens if the requested employee does not exist?",
          answer:
            "A REST API should normally return 404 Not Found for a request targeting a nonexistent employee."
        },
        {
          question: "What is idempotency?",
          answer:
            "Idempotency means that making the same request multiple times has the same intended effect as making it once. GET, PUT, and DELETE are generally idempotent by HTTP semantics, while POST is generally not."
        },
        {
          question: "Why is REST API statelessness useful?",
          answer:
            "Statelessness makes requests easier to distribute across multiple application instances and can simplify horizontal scaling because the server does not need request-specific session state to process each request."
        },
        {
          question: "What is the role of DispatcherServlet?",
          answer:
            "DispatcherServlet is Spring MVC's central request dispatcher. It receives web requests and coordinates finding the appropriate handler, resolving arguments, invoking the controller method, and processing the result."
        },
        {
          question: "What is the typical architecture of a Spring Boot REST API?",
          answer:
            "A common architecture is Client -> Controller -> Service -> Repository -> Database. The controller handles HTTP concerns, the service handles business logic, and the repository handles persistence."
        },
        {
          question: "Why should REST APIs use meaningful status codes?",
          answer:
            "Status codes provide standardized information about whether a request succeeded, failed because of client input, required authentication, was forbidden, or failed because of a server problem."
        }
      ]
    },

    {
      id: "interview-scenario",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "An interviewer asks: 'Design APIs for creating and retrieving employees. What endpoints would you create?'",
          answer:
            "I would use POST /api/employees to create an employee, GET /api/employees to retrieve all employees, and GET /api/employees/{id} to retrieve one employee. I would return appropriate status codes such as 201 for successful creation, 200 for successful retrieval, and 404 when the requested employee does not exist."
        },
        {
          question:
            "An interviewer asks: 'Why would you use /employees/101 instead of /getEmployee?id=101?'",
          answer:
            "When 101 identifies a specific employee resource, putting it in the resource path makes the API more resource-oriented and easier to understand. Query parameters are more suitable for operations such as filtering, searching, sorting, and pagination."
        },
        {
          question:
            "An interviewer asks: 'Your controller has 500 lines of business logic. What would you do?'",
          answer:
            "I would separate responsibilities. The controller should handle HTTP concerns, the service should contain business logic, and the repository should handle persistence. I would also introduce DTOs, validation, centralized exception handling, and appropriate tests."
        },
        {
          question:
            "An interviewer asks: 'What happens when a client sends invalid JSON to your POST endpoint?'",
          answer:
            "Spring's HTTP message conversion can fail while trying to deserialize the request body. The API should handle the resulting client error consistently, normally returning an appropriate 4xx response rather than treating the request as a successful creation."
        },
        {
          question:
            "An interviewer asks: 'How would you improve this in-memory Employee API for production?'",
          answer:
            "I would introduce request and response DTOs, validation, a service layer, a repository layer, persistent database storage, centralized exception handling, consistent error responses, pagination, logging, security, API documentation, automated tests, and appropriate monitoring."
        }
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "This lesson demonstrates the complete basic REST API lifecycle using an Employee example. Remember the request source, HTTP method, controller annotation, response status, and responsibility of each layer."
      ],
      bullets: [
        "REST APIs expose resources through URLs.",
        "GET = read.",
        "POST = create.",
        "PUT = update or replace.",
        "DELETE = remove.",
        "@RestController creates REST endpoints.",
        "@RequestMapping defines URL mappings.",
        "@GetMapping handles GET.",
        "@PostMapping handles POST.",
        "@PutMapping handles PUT.",
        "@DeleteMapping handles DELETE.",
        "@PathVariable reads values from the URL path.",
        "@RequestParam reads query parameters.",
        "@RequestBody reads the HTTP request body.",
        "ResponseEntity provides control over status, headers, and body.",
        "200 = successful request.",
        "201 = resource created.",
        "204 = successful request with no response body.",
        "400 = invalid request.",
        "401 = authentication required or failed.",
        "403 = access forbidden.",
        "404 = resource not found.",
        "500 = unexpected server error.",
        "Controllers should remain focused on HTTP concerns.",
        "Services should contain business logic.",
        "Repositories should handle persistence.",
        "DTOs help define stable API contracts.",
        "Validation protects the application from invalid input.",
        "Production APIs should use centralized error handling and appropriate security."
      ]
    }
  ]
};
