
export const restController = {
  id: "rest-controller",
  title: "@RestController",
  slug: "rest-controller",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Learn how @RestController is used in Spring Boot to create REST endpoints, receive HTTP requests, and return Java data directly as HTTP response representations.",

  sections: [
    {
      id: "what-is-rest-controller",
      title: "What is @RestController?",

      paragraphs: [
        "@RestController is a Spring MVC annotation used to define a controller whose methods typically return data directly in the HTTP response body.",
        "It is commonly used when building REST APIs with Spring Boot.",
        "@RestController is a specialized form of @Controller that includes @ResponseBody semantics for its handler methods.",
        "This means that when a controller method returns a Java object, Spring treats the returned value as response data rather than as a view name.",
        "For JSON REST APIs, Spring commonly uses Jackson through HTTP message converters to serialize Java objects into JSON."
      ],

      code: {
        language: "java",
        code: `@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, CodeForge!";
    }
}`
      },

      bullets: [
        "@RestController is used to create REST API controllers.",
        "It combines @Controller and @ResponseBody behavior.",
        "Controller methods typically return response data.",
        "Returned Java objects can be serialized into JSON.",
        "It is commonly used with @GetMapping, @PostMapping, @PutMapping, @PatchMapping, and @DeleteMapping."
      ]
    },

    {
      id: "rest-controller-flow",
      title: "How @RestController Works",

      paragraphs: [
        "When a client sends an HTTP request, Spring MVC finds the controller method whose mapping matches the request.",
        "The controller method executes and returns a value.",
        "Because the class is annotated with @RestController, Spring writes the returned value to the HTTP response body using an appropriate HTTP message converter."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | GET /hello
   v
Embedded Tomcat
   |
   v
DispatcherServlet
   |
   v
Controller Mapping
   |
   v
@RestController
   |
   v
hello()
   |
   | "Hello, CodeForge!"
   v
HTTP Message Converter
   |
   v
HTTP Response
   |
   v
Client`
      },

      bullets: [
        "Client sends an HTTP request.",
        "Spring MVC finds the matching controller method.",
        "The controller method executes.",
        "The return value becomes response data.",
        "An HTTP message converter writes the response.",
        "The client receives the HTTP response."
      ]
    },

    {
      id: "basic-example",
      title: "Basic @RestController Example",

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, CodeForge!";
    }
}`
      },

      output: `GET /hello

HTTP/1.1 200 OK

Hello, CodeForge!`,

      paragraphs: [
        "The @RestController annotation makes HelloController a REST controller.",
        "@GetMapping maps the GET /hello request to the hello() method.",
        "The returned String is written directly to the response body."
      ],

      bullets: [
        "@RestController creates the controller.",
        "@GetMapping maps the GET request.",
        "The String becomes the response body.",
        "Spring commonly returns 200 OK when the request succeeds."
      ]
    },

    {
      id: "class-level",
      title: "Class-Level Request Mapping",

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

      output: `GET /api/employees

Response:

Employee list`,

      paragraphs: [
        "The class-level mapping provides a common path prefix for the controller methods.",
        "The method-level @GetMapping contributes the remaining path and HTTP method."
      ],

      bullets: [
        "Class-level path: /api/employees.",
        "Method-level path: empty path in this example.",
        "Final endpoint: GET /api/employees.",
        "Class-level mappings help organize resource-oriented endpoints."
      ]
    },

    {
      id: "json-response",
      title: "Returning an Object",

      paragraphs: [
        "A REST controller can return a Java object instead of manually constructing JSON.",
        "Spring uses HTTP message converters to convert the returned object into the response representation.",
        "For JSON responses, Jackson is commonly used."
      ],

      code: {
        language: "java",
        code: `public class Employee {

    private Long id;
    private String name;

    public Employee(
            Long id,
            String name
    ) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}`
      },

      bullets: [
        "The Java object represents application data.",
        "Spring does not require you to manually create JSON for normal object responses.",
        "Jackson commonly serializes the Java object.",
        "Getters or another supported property-access strategy expose the properties for serialization."
      ]
    },

    {
      id: "serialization-flow",
      title: "Java Object to JSON Flow",

      paragraphs: [
        "Serialization means converting an in-memory Java object into a representation such as JSON that can be sent over HTTP."
      ],

      code: {
        language: "text",
        code: `Java Object

Employee
    |
    | id = 101
    | name = Rahul
    v
Jackson
    |
    | Serialization
    v
JSON

{
  "id": 101,
  "name": "Rahul"
}`
      },

      bullets: [
        "Java object → source data.",
        "Jackson → JSON serialization.",
        "JSON → HTTP response representation.",
        "The client can deserialize the JSON into its own data structure."
      ]
    },

    {
      id: "object-controller",
      title: "Returning an Object from Controller",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/101")
    public Employee getEmployee() {

        return new Employee(
                101L,
                "Rahul"
        );
    }
}`
      },

      output: `GET /api/employees/101

HTTP/1.1 200 OK

Content-Type: application/json

{
  "id": 101,
  "name": "Rahul"
}`,

      paragraphs: [
        "The controller returns an Employee object.",
        "Spring serializes the returned object into JSON when JSON is the negotiated response representation."
      ],

      bullets: [
        "The controller does not manually construct the JSON string.",
        "Spring uses an HTTP message converter.",
        "Jackson commonly performs Java-object-to-JSON serialization.",
        "The response Content-Type can be application/json."
      ]
    },

    {
      id: "list-response",
      title: "Returning a List of Objects",

      paragraphs: [
        "A REST controller can also return a collection of Java objects.",
        "Spring can serialize the collection into a JSON array."
      ],

      code: {
        language: "java",
        code: `@GetMapping
public List<Employee> getEmployees() {

    return List.of(
        new Employee(101L, "Rahul"),
        new Employee(102L, "Priya")
    );
}`
      },

      output: `GET /api/employees

[
  {
    "id": 101,
    "name": "Rahul"
  },
  {
    "id": 102,
    "name": "Priya"
  }
]`,

      bullets: [
        "Java List becomes a JSON array.",
        "Each Employee becomes a JSON object.",
        "This is common for collection endpoints."
      ]
    },

    {
      id: "request-body",
      title: "Receiving Data with @RequestBody",

      paragraphs: [
        "@RestController methods can receive request data using Spring MVC annotations such as @RequestBody.",
        "This is commonly used for POST, PUT, and PATCH requests."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/employees")
public Employee createEmployee(
        @RequestBody Employee employee
) {
    return employee;
}`
      },

      output: `POST /api/employees

Content-Type: application/json

{
  "id": 101,
  "name": "Rahul"
}

Response:

{
  "id": 101,
  "name": "Rahul"
}`,

      bullets: [
        "@RequestBody reads data from the request body.",
        "JSON is commonly converted into a Java object.",
        "The controller can then pass the object to the service layer."
      ]
    },

    {
      id: "path-variable",
      title: "Using @PathVariable",

      paragraphs: [
        "@RestController methods can receive values from the URL using @PathVariable.",
        "This is commonly used when retrieving or modifying a specific resource."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/{id}")
public Employee getEmployee(
        @PathVariable Long id
) {
    return employeeService.getEmployee(id);
}`
      },

      output: `GET /api/employees/101

id = 101`,

      bullets: [
        "@PathVariable reads a value from the URL path.",
        "It is commonly used for resource identifiers.",
        "The value can be converted to a suitable Java type."
      ]
    },

    {
      id: "request-param",
      title: "Using @RequestParam",

      paragraphs: [
        "@RestController methods can receive query parameters using @RequestParam.",
        "Query parameters are commonly used for filtering, searching, sorting, and pagination."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public List<Employee> searchEmployees(
        @RequestParam String department
) {
    return employeeService
            .searchByDepartment(department);
}`
      },

      output: `GET /api/employees?department=IT

department = IT`,

      bullets: [
        "@RequestParam reads query parameters.",
        "Query parameters are commonly used for optional filtering.",
        "Multiple query parameters can be used."
      ]
    },

    {
      id: "rest-controller-vs-controller",
      title: "@RestController vs @Controller",

      paragraphs: [
        "@Controller is a general Spring MVC controller annotation.",
        "@RestController is designed for controllers whose methods typically return response data directly.",
        "@RestController effectively combines @Controller with @ResponseBody.",
        "With @Controller, a method returning a String can be interpreted as a view name unless @ResponseBody is used.",
        "With @RestController, response-body semantics apply to the handler methods by default."
      ],

      code: {
        language: "java",
        code: `// Traditional MVC controller

@Controller
public class PageController {

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}


// REST controller

@RestController
public class EmployeeController {

    @GetMapping("/employees")
    public Employee getEmployee() {
        return new Employee(
                101L,
                "Rahul"
        );
    }
}`
      },

      bullets: [
        "@Controller → commonly used for MVC view-based applications.",
        "@RestController → commonly used for REST APIs.",
        "@RestController = @Controller + @ResponseBody semantics.",
        "A REST controller normally returns response data rather than a view name."
      ]
    },

    {
      id: "response-body",
      title: "@ResponseBody and @RestController",

      paragraphs: [
        "@ResponseBody tells Spring to write a controller method's return value directly to the HTTP response body.",
        "@RestController provides this behavior for its handler methods without requiring @ResponseBody on every method."
      ],

      code: {
        language: "java",
        code: `@Controller
public class EmployeeController {

    @GetMapping("/employee")
    @ResponseBody
    public Employee getEmployee() {
        return new Employee(
                101L,
                "Rahul"
        );
    }
}


// Equivalent REST-style controller:

@RestController
public class EmployeeController {

    @GetMapping("/employee")
    public Employee getEmployee() {
        return new Employee(
                101L,
                "Rahul"
        );
    }
}`
      },

      bullets: [
        "@ResponseBody writes the return value to the HTTP response body.",
        "@RestController provides response-body semantics at the controller level.",
        "This is why REST controllers do not normally need @ResponseBody on every method."
      ]
    },

    {
      id: "response-entity",
      title: "Using ResponseEntity",

      paragraphs: [
        "A REST controller can return ResponseEntity when it needs explicit control over the HTTP status, headers, and response body.",
        "This is useful when different outcomes require different HTTP status codes."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/{id}")
public ResponseEntity<Employee> getEmployee(
        @PathVariable Long id
) {

    Employee employee =
            employeeService.getEmployee(id);

    return ResponseEntity.ok(employee);
}`
      },

      bullets: [
        "ResponseEntity provides control over the HTTP response.",
        "It can contain a response body.",
        "It can specify an HTTP status.",
        "It can specify response headers.",
        "It is useful for APIs with different success and failure outcomes."
      ]
    },

    {
      id: "status-code-example",
      title: "Returning HTTP Status Codes",

      paragraphs: [
        "REST controllers can return appropriate HTTP status codes based on the operation result."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/employees")
public ResponseEntity<Employee> createEmployee(
        @RequestBody Employee employee
) {

    Employee saved =
            employeeService.createEmployee(employee);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(saved);
}


@DeleteMapping("/employees/{id}")
public ResponseEntity<Void> deleteEmployee(
        @PathVariable Long id
) {

    employeeService.deleteEmployee(id);

    return ResponseEntity
            .noContent()
            .build();
}`
      },

      bullets: [
        "POST creation commonly returns 201 Created.",
        "Successful deletion commonly returns 204 No Content.",
        "GET commonly returns 200 OK.",
        "The status should represent the result of the operation."
      ]
    },

    {
      id: "dto",
      title: "Using DTOs with @RestController",

      paragraphs: [
        "REST controllers commonly use DTOs instead of exposing JPA entities directly.",
        "A request DTO defines what the client can submit, while a response DTO defines what the API returns."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(
        String name,
        String email,
        String department
) {
}


public record EmployeeResponse(
        Long id,
        String name,
        String email,
        String department
) {
}


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(
            @RequestBody EmployeeCreateRequest request
    ) {

        EmployeeResponse response =
                employeeService.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}`
      },

      bullets: [
        "Request DTO controls input.",
        "Response DTO controls output.",
        "DTOs prevent accidental exposure of internal entity fields.",
        "DTOs provide a clear API contract.",
        "DTOs can be combined with validation."
      ]
    },

    {
      id: "validation",
      title: "Validation in a REST Controller",

      paragraphs: [
        "Request data should normally be validated before it reaches business logic.",
        "Spring Boot can use Jakarta Bean Validation annotations together with @Valid."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(

        @NotBlank
        String name,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String department

) {
}


@PostMapping
public ResponseEntity<EmployeeResponse> createEmployee(
        @Valid
        @RequestBody EmployeeCreateRequest request
) {

    EmployeeResponse response =
            employeeService.createEmployee(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
}`
      },

      bullets: [
        "@Valid triggers Bean Validation.",
        "@NotBlank validates required text.",
        "@Email validates email format.",
        "Validation failures can be converted into a structured 400 response.",
        "Business validation should still happen in the appropriate application/service layer."
      ]
    },

    {
      id: "crud-controller",
      title: "Complete CRUD REST Controller",

      paragraphs: [
        "The following example demonstrates how @RestController is commonly used for a complete CRUD API."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public List<EmployeeResponse> getEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.getEmployee(id);
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(
            @RequestBody EmployeeCreateRequest request
    ) {

        EmployeeResponse response =
                employeeService.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeUpdateRequest request
    ) {
        return employeeService
                .updateEmployee(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id
    ) {

        employeeService.deleteEmployee(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}`
      },

      bullets: [
        "GET → retrieve employees.",
        "GET /{id} → retrieve one employee.",
        "POST → create employee.",
        "PUT /{id} → update employee.",
        "DELETE /{id} → delete employee.",
        "The controller delegates business logic to EmployeeService."
      ]
    },

    {
      id: "architecture-flow",
      title: "@RestController in Layered Architecture",

      paragraphs: [
        "@RestController is normally the HTTP boundary of a layered Spring Boot application.",
        "It should delegate application operations to the service layer rather than directly implementing complex business and persistence logic."
      ],

      code: {
        language: "text",
        code: `React / Postman / Mobile App
             |
             | HTTP
             v
      @RestController
             |
             | method call
             v
        @Service
             |
             | data access
             v
       Repository
             |
             | SQL / JPA
             v
          MySQL`
      },

      bullets: [
        "REST controller handles HTTP.",
        "Service handles business/application logic.",
        "Repository handles persistence.",
        "Database stores persistent data.",
        "This separation keeps the application maintainable."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common @RestController Mistakes",

      paragraphs: [
        "Most @RestController problems come from misunderstanding response-body behavior, request mapping, serialization, or layer responsibilities."
      ],

      bullets: [
        "Mistake 1: Using @Controller and expecting a Java object to automatically behave like a REST response without @ResponseBody.",
        "Mistake 2: Forgetting @RequestBody when accepting JSON request data.",
        "Mistake 3: Forgetting the correct @GetMapping, @PostMapping, or other HTTP method mapping.",
        "Mistake 4: Returning JPA entities directly without considering DTOs and sensitive fields.",
        "Mistake 5: Putting business logic directly into controller methods.",
        "Mistake 6: Returning 200 OK for every operation without considering more appropriate status codes.",
        "Mistake 7: Returning a raw JSON string when a Java DTO/object would be easier to maintain.",
        "Mistake 8: Ignoring validation on incoming request data.",
        "Mistake 9: Creating ambiguous endpoint mappings.",
        "Mistake 10: Exposing internal exception details in REST responses."
      ]
    },

    {
      id: "testing",
      title: "Testing @RestController with Postman",

      paragraphs: [
        "Postman can be used to test REST controller endpoints before connecting a frontend application."
      ],

      code: {
        language: "text",
        code: `GET

GET http://localhost:8080/api/employees


GET BY ID

GET http://localhost:8080/api/employees/101


CREATE

POST http://localhost:8080/api/employees

Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "IT"
}


UPDATE

PUT http://localhost:8080/api/employees/101

Content-Type: application/json

{
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "department": "Platform"
}


DELETE

DELETE http://localhost:8080/api/employees/101`
      },

      bullets: [
        "Verify the HTTP method.",
        "Verify the URL.",
        "Verify request headers.",
        "Verify request JSON.",
        "Verify response status.",
        "Verify response body."
      ]
    },

    {
      id: "interview",
      title: "@RestController Interview Questions",

      interviewQuestions: [
        {
          question: "What is @RestController?",
          answer:
            "@RestController is a Spring MVC annotation used to create controllers whose methods typically return data directly in the HTTP response body."
        },
        {
          question: "What is the difference between @Controller and @RestController?",
          answer:
            "@Controller is commonly used with Spring MVC views, while @RestController is designed for REST endpoints and effectively includes @ResponseBody behavior."
        },
        {
          question: "Can @RestController return an object?",
          answer:
            "Yes. Spring can serialize the returned object into a response representation such as JSON when the appropriate HTTP message converter is available."
        },
        {
          question: "What is the purpose of @ResponseBody?",
          answer:
            "@ResponseBody tells Spring to write the return value of a controller method directly to the HTTP response body."
        },
        {
          question: "Why does @RestController not require @ResponseBody on every method?",
          answer:
            "@RestController provides @ResponseBody semantics at the controller level, so its handler methods normally write return values directly to the response body."
        },
        {
          question: "How does a Java object become JSON?",
          answer:
            "Spring uses an HTTP message converter, commonly Jackson for JSON, to serialize the Java object into JSON."
        },
        {
          question: "What is serialization?",
          answer:
            "Serialization is the process of converting an in-memory object into a representation such as JSON that can be transmitted to another system."
        },
        {
          question: "What is deserialization?",
          answer:
            "Deserialization is the process of converting an external representation such as JSON into a Java object."
        },
        {
          question: "Can @RestController return a List?",
          answer:
            "Yes. Spring can serialize a Java collection such as List<Employee> into a JSON array."
        },
        {
          question: "What is ResponseEntity?",
          answer:
            "ResponseEntity represents an HTTP response and allows a controller to explicitly control the status, headers, and response body."
        },
        {
          question: "Why use DTOs in a REST controller?",
          answer:
            "DTOs provide a controlled API contract, prevent accidental exposure of internal entity fields, and allow request and response models to differ from persistence entities."
        },
        {
          question: "Where should business logic be placed?",
          answer:
            "Business logic should generally be placed in the service or appropriate application/domain layer rather than directly in the controller."
        },
        {
          question: "Can @RestController use @PathVariable?",
          answer:
            "Yes. REST controller methods can use @PathVariable to read values from URL paths."
        },
        {
          question: "Can @RestController use @RequestParam?",
          answer:
            "Yes. REST controller methods can use @RequestParam to read query parameters."
        },
        {
          question: "Can @RestController use @RequestBody?",
          answer:
            "Yes. REST controller methods commonly use @RequestBody to receive JSON request data."
        },
        {
          question: "What status code is commonly returned after creating a resource?",
          answer:
            "201 Created is commonly returned after successful resource creation."
        },
        {
          question: "What status code is commonly returned for a successful GET?",
          answer:
            "200 OK is commonly returned when the requested resource is successfully retrieved."
        },
        {
          question: "What status code is commonly returned after successful deletion with no body?",
          answer:
            "204 No Content is commonly used."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A React frontend calls GET /api/employees/101. What happens inside Spring Boot?",
          answer:
            "Spring MVC matches the request to the appropriate controller method, the @RestController method executes, the service can retrieve the employee, and the returned object is serialized into the HTTP response."
        },
        {
          question:
            "Why would you return EmployeeResponse instead of Employee from a controller?",
          answer:
            "A response DTO provides control over the fields exposed by the API and prevents persistence-specific or sensitive fields from being returned accidentally."
        },
        {
          question:
            "A POST request contains employee JSON. Which annotation receives the data?",
          answer:
            "@RequestBody receives the JSON and Spring commonly uses Jackson to deserialize it into the target Java type."
        },
        {
          question:
            "The employee was created successfully. Which response status would you normally return?",
          answer:
            "201 Created is commonly appropriate for a successful resource-creation operation."
        },
        {
          question:
            "The controller contains 100 lines of business logic. Is that a good design?",
          answer:
            "Usually no. The controller should primarily handle HTTP concerns and delegate application and business logic to the service layer."
        },
        {
          question:
            "Why can returning a JPA entity directly from a REST controller be risky?",
          answer:
            "It can expose internal fields, couple the API contract to the persistence model, and create issues with relationships or serialization. DTOs often provide better control."
        },
        {
          question:
            "What happens if Jackson cannot serialize the returned object?",
          answer:
            "The request can fail during response conversion. The server should log the underlying problem and return a safe, appropriate error response."
        },
        {
          question:
            "Why is @RestController commonly used instead of @Controller for REST APIs?",
          answer:
            "@RestController provides response-body semantics by default, making it convenient for endpoints that return JSON or other response data rather than MVC view names."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Reference",

      code: {
        language: "text",
        code: `@RestController

Creates a REST API controller.


@RequestMapping

Defines a common URL prefix.


@GetMapping

Handles GET requests.


@PostMapping

Handles POST requests.


@PutMapping

Handles PUT requests.


@PatchMapping

Handles PATCH requests.


@DeleteMapping

Handles DELETE requests.


@PathVariable

Reads values from URL paths.


@RequestParam

Reads values from query parameters.


@RequestBody

Reads data from the HTTP request body.


ResponseEntity

Controls status, headers, and response body.`
      },

      bullets: [
        "@RestController → REST API controller.",
        "@RequestMapping → request mapping.",
        "@RequestBody → request body.",
        "@PathVariable → URL path.",
        "@RequestParam → query parameter.",
        "ResponseEntity → explicit HTTP response control."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "@RestController is one of the most important Spring Boot annotations for REST API development. It creates a controller whose handler methods normally return data directly in the HTTP response body."
      ],

      bullets: [
        "@RestController is used for REST APIs.",
        "@RestController effectively combines @Controller and @ResponseBody semantics.",
        "Use @GetMapping for GET.",
        "Use @PostMapping for POST.",
        "Use @PutMapping for PUT.",
        "Use @PatchMapping for PATCH.",
        "Use @DeleteMapping for DELETE.",
        "@PathVariable reads path values.",
        "@RequestParam reads query parameters.",
        "@RequestBody reads request-body data.",
        "Jackson commonly serializes Java objects into JSON.",
        "Jackson commonly deserializes JSON into Java objects.",
        "ResponseEntity provides explicit response control.",
        "201 Created is commonly used after resource creation.",
        "200 OK is commonly used for successful retrieval.",
        "204 No Content is commonly used for successful deletion without a response body.",
        "Use DTOs when you need a controlled API contract.",
        "Keep business logic in the service layer.",
        "Keep persistence operations in the repository layer.",
        "Keep controllers focused on HTTP concerns."
      ]
    }
  ]
};
