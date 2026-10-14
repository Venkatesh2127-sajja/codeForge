
export const getAndPostMapping = {
  id: "get-and-post-mapping",
  title: "@GetMapping and @PostMapping",
  slug: "get-and-post-mapping",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "35 min",

  description:
    "Learn how to create GET and POST REST endpoints in Spring Boot and understand how request and response data flow through a controller.",

  sections: [
    {
      id: "get-mapping",
      title: "@GetMapping",

      paragraphs: [
        "@GetMapping maps an HTTP GET request to a controller method.",
        "GET is commonly used to retrieve resources or information from the server.",
        "A GET request should normally not change the application's state. For example, retrieving an employee should not create, update, or delete that employee.",
        "@GetMapping is a composed Spring MVC annotation. It is a convenient alternative to using @RequestMapping(method = RequestMethod.GET).",
        "A GET endpoint can return a String, Java object, collection, ResponseEntity, or another supported response type."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String getEmployees() {
    return "Employee list";
}`
      },

      bullets: [
        "@GetMapping handles HTTP GET requests.",
        "GET is commonly used for retrieving data.",
        "GET should normally not modify server state.",
        "The URL identifies the resource being requested.",
        "A GET endpoint can return JSON, text, or another representation.",
        "@GetMapping can be combined with class-level @RequestMapping."
      ]
    },

    {
      id: "get-url-mapping",
      title: "How @GetMapping Maps a URL",

      paragraphs: [
        "When @RequestMapping is placed at the class level, it provides a common URL prefix. @GetMapping can then define the method-specific portion of the URL.",
        "This makes controllers easier to organize because all employee-related endpoints can share the /api/employees prefix."
      ],

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

      bullets: [
        "Class-level mapping: /api/employees",
        "Method-level mapping: no additional path",
        "Complete endpoint: GET /api/employees",
        "Spring combines the class-level and method-level mappings."
      ]
    },

    {
      id: "get-response",
      title: "GET Response",

      paragraphs: [
        "When the client sends a GET request, Spring invokes the matching controller method.",
        "In this example, the method returns a String, so the response body contains plain text.",
        "In a typical REST API, the controller would usually return an object or collection that Spring serializes into JSON."
      ],

      code: {
        language: "http",
        code: `GET /api/employees

HTTP/1.1 200 OK
Content-Type: text/plain

Employee list`
      },

      bullets: [
        "200 OK indicates that the request was successfully processed.",
        "Content-Type describes the response representation.",
        "The response body contains the returned data.",
        "A REST endpoint can return JSON instead of plain text."
      ]
    },

    {
      id: "get-json-response",
      title: "GET Returning JSON",

      paragraphs: [
        "A REST API commonly returns JSON instead of a simple String.",
        "If a controller returns a Java object, Spring's HTTP message conversion infrastructure can serialize the object into JSON.",
        "In a standard Spring Boot application, Jackson commonly performs the JSON serialization."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/101")
public Employee getEmployee() {

    Employee employee = new Employee();

    employee.setId(101L);
    employee.setName("Rahul");
    employee.setEmail("rahul@example.com");

    return employee;
}`
      },

      output: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com"
}`,

      bullets: [
        "Java object is returned by the controller.",
        "Spring serializes the object into JSON.",
        "Content-Type becomes application/json.",
        "The client receives the JSON representation."
      ]
    },

    {
      id: "get-path-variable",
      title: "GET with @PathVariable",

      paragraphs: [
        "GET endpoints frequently retrieve a specific resource by ID.",
        "@PathVariable reads a value from the URL path and provides it to the controller method."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/{id}")
public String getEmployee(
        @PathVariable Long id
) {
    return "Employee ID: " + id;
}`
      },

      output: `GET /api/employees/101

Employee ID: 101`,

      bullets: [
        "The {id} placeholder is part of the URL mapping.",
        "@PathVariable extracts the value.",
        "For /employees/101, id receives 101.",
        "Path variables are commonly used for resource identifiers."
      ]
    },

    {
      id: "get-request-param",
      title: "GET with @RequestParam",

      paragraphs: [
        "GET endpoints can also accept query parameters.",
        "@RequestParam reads values from the query string and is commonly used for filtering, searching, sorting, and pagination."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/search")
public String searchEmployees(
        @RequestParam String department
) {
    return "Searching department: " + department;
}`
      },

      output: `GET /api/employees/search?department=Engineering

Searching department: Engineering`,

      bullets: [
        "Query parameters appear after ? in the URL.",
        "@RequestParam reads the query parameter.",
        "Query parameters are useful for filtering and searching.",
        "Multiple query parameters can be supplied using &."
      ]
    },

    {
      id: "post-mapping",
      title: "@PostMapping",

      paragraphs: [
        "@PostMapping maps an HTTP POST request to a controller method.",
        "POST is commonly used when creating a new resource or submitting data to the server for processing.",
        "Unlike a simple GET request, POST commonly contains information in the HTTP request body.",
        "POST is generally not idempotent. Sending the same creation request multiple times can result in multiple resources being created."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/employees")
public String createEmployee() {
    return "Employee created";
}`
      },

      bullets: [
        "@PostMapping handles HTTP POST requests.",
        "POST is commonly used to create resources.",
        "POST can contain a request body.",
        "POST can also be used for operations that submit data for processing.",
        "POST is generally not idempotent."
      ]
    },

    {
      id: "request-body",
      title: "POST with @RequestBody",

      paragraphs: [
        "@RequestBody tells Spring to read the HTTP request body and convert it into the Java type declared by the controller method.",
        "When the client sends JSON, Spring uses an HTTP message converter to deserialize that JSON into the target Java object.",
        "This is one of the most important concepts when building POST APIs in Spring Boot."
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

      bullets: [
        "@RequestBody reads data from the request body.",
        "JSON can be converted into a Java object.",
        "The request Content-Type should normally be application/json for JSON.",
        "The Java class must be compatible with the incoming JSON structure.",
        "Validation can be added using Bean Validation and @Valid."
      ]
    },

    {
      id: "post-json-flow",
      title: "How POST JSON Reaches the Controller",

      paragraphs: [
        "Understanding the complete POST flow is important for interviews and debugging.",
        "The client sends JSON in the HTTP request body. Spring receives the request and uses an HTTP message converter to deserialize the JSON into the Employee object. The controller method then receives the populated object."
      ],

      code: {
        language: "text",
        code: `Client

    |
    | POST /api/employees
    | Content-Type: application/json
    |
    | JSON body
    v

Spring Boot

    |
    v

HTTP Message Converter

    |
    | JSON deserialization
    v

Employee Java Object

    |
    v

Controller Method

    |
    v

Business Logic`
      },

      bullets: [
        "Client creates the JSON request.",
        "HTTP Content-Type identifies the representation.",
        "Spring receives the request.",
        "HTTP message conversion deserializes JSON.",
        "The Employee object is passed to the controller method."
      ]
    },

    {
      id: "post-request",
      title: "Testing POST with JSON",

      paragraphs: [
        "A POST request can be tested using Postman, curl, or another HTTP client.",
        "When sending JSON from Postman, choose Body → raw → JSON and make sure the Content-Type is application/json."
      ],

      code: {
        language: "http",
        code: `POST /api/employees HTTP/1.1
Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}`
      },

      output: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}`,

      bullets: [
        "POST sends data to the server.",
        "The request body contains JSON.",
        "Content-Type identifies the request body format.",
        "@RequestBody converts the JSON into a Java object.",
        "A production create endpoint would commonly return 201 Created."
      ]
    },

    {
      id: "post-created-response",
      title: "Returning 201 Created",

      paragraphs: [
        "When a POST request successfully creates a new resource, 201 Created is commonly more appropriate than 200 OK.",
        "ResponseEntity can be used when the controller needs explicit control over the status code."
      ],

      code: {
        language: "java",
        code: `@PostMapping("/employees")
public ResponseEntity<Employee> createEmployee(
        @RequestBody Employee employee
) {

    // Save employee

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employee);
}`
      },

      output: `HTTP/1.1 201 Created

{
  "name": "Rahul",
  "email": "rahul@example.com"
}`,

      bullets: [
        "201 Created communicates successful resource creation.",
        "ResponseEntity allows explicit status control.",
        "The response can contain the created resource.",
        "A Location header can also be used to identify the created resource."
      ]
    },

    {
      id: "complete-controller",
      title: "Complete GET and POST Controller",

      paragraphs: [
        "Now we can combine GET and POST mappings into one Employee REST controller.",
        "The class-level @RequestMapping provides the common /api/employees prefix.",
        "The GET method retrieves employees and the POST method accepts a new employee."
      ],

      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public String getEmployees() {
        return "Employee list";
    }

    @PostMapping
    public Employee createEmployee(
            @RequestBody Employee employee
    ) {
        return employee;
    }
}`
      },

      bullets: [
        "GET /api/employees calls getEmployees().",
        "POST /api/employees calls createEmployee().",
        "The same resource URL can use different HTTP methods.",
        "The HTTP method differentiates the intended operation."
      ]
    },

    {
      id: "same-url-different-method",
      title: "Same URL, Different HTTP Methods",

      paragraphs: [
        "One important REST concept is that the same URL can represent different operations depending on the HTTP method.",
        "For example, GET /api/employees retrieves employees, while POST /api/employees creates an employee."
      ],

      code: {
        language: "text",
        code: `GET /api/employees
        |
        +---- Retrieve employees


POST /api/employees
        |
        +---- Create employee


Same URL:
    /api/employees

Different HTTP method:
    GET vs POST

Different meaning:
    Read vs Create`
      },

      bullets: [
        "The URL identifies the resource.",
        "The HTTP method describes the intended operation.",
        "This is cleaner than creating separate URLs such as /getEmployees and /createEmployee."
      ]
    },

    {
      id: "headers",
      title: "Important GET and POST Headers",

      paragraphs: [
        "HTTP headers provide additional information about a request or response.",
        "Content-Type describes the format of the request or response body.",
        "Accept tells the server which response representations the client prefers."
      ],

      code: {
        language: "http",
        code: `POST /api/employees
Content-Type: application/json
Accept: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}


Response:

HTTP/1.1 201 Created
Content-Type: application/json`
      },

      bullets: [
        "Content-Type describes the body being sent.",
        "Accept describes the response representation preferred by the client.",
        "application/json is commonly used for REST APIs.",
        "Headers are different from request body data."
      ]
    },

    {
      id: "get-vs-post",
      title: "GET vs POST",

      paragraphs: [
        "GET and POST are both HTTP methods, but they have different semantics.",
        "GET is primarily used to retrieve a resource or representation. POST is commonly used to submit data for processing or create a resource.",
        "GET is safe and idempotent according to HTTP semantics. POST is generally not idempotent."
      ],

      code: {
        language: "text",
        code: `GET

GET /api/employees

Purpose:
Retrieve employees

Request body:
Not normally used for its primary semantics

Safe:
Yes

Idempotent:
Yes


POST

POST /api/employees

Purpose:
Create or submit data

Request body:
Commonly used

Safe:
No

Idempotent:
Generally no`
      },

      bullets: [
        "GET is commonly used to retrieve data.",
        "POST is commonly used to create or submit data.",
        "GET requests generally do not use a request body for their primary semantics.",
        "POST commonly carries data in the request body.",
        "GET is safe and idempotent according to HTTP semantics.",
        "POST is generally not idempotent.",
        "GET should not be used to perform destructive operations."
      ]
    },

    {
      id: "get-post-status-codes",
      title: "GET and POST Status Codes",

      paragraphs: [
        "Status codes communicate the result of an HTTP request.",
        "A common beginner mistake is returning 200 for every operation. REST APIs should use status codes that communicate the actual result."
      ],

      code: {
        language: "text",
        code: `GET

200 OK
    Resource successfully returned.

404 Not Found
    Requested resource does not exist.


POST

201 Created
    Resource successfully created.

400 Bad Request
    Request data is invalid.

409 Conflict
    Creation conflicts with existing state.

500 Internal Server Error
    Unexpected server-side failure.`
      },

      bullets: [
        "200 is common for successful GET operations.",
        "201 is common for successful resource creation.",
        "400 represents invalid client input.",
        "404 represents a missing resource.",
        "409 can represent a resource conflict.",
        "500 represents an unexpected server-side failure."
      ]
    },

    {
      id: "get-post-validation",
      title: "Validation in POST Requests",

      paragraphs: [
        "A POST request should not automatically be trusted simply because the JSON is syntactically correct.",
        "The API should validate whether the values are acceptable for the application's business requirements.",
        "Spring Boot commonly uses Jakarta Bean Validation for request validation."
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
}


@PostMapping("/employees")
public ResponseEntity<EmployeeRequest> createEmployee(
        @Valid @RequestBody EmployeeRequest request
) {

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(request);
}`
      },

      bullets: [
        "Syntax validation and business validation are different concerns.",
        "@NotBlank can reject empty required text.",
        "@Email can validate email format.",
        "@Valid triggers validation for the request object.",
        "Validation failures should return a consistent client error response."
      ]
    },

    {
      id: "get-post-flow",
      title: "Complete GET and POST Request Flow",

      paragraphs: [
        "The following flow is useful to remember for interviews. Both GET and POST requests enter the Spring MVC infrastructure, but the data extraction is different.",
        "GET commonly obtains information from the URL path or query parameters, while POST commonly obtains data from the request body."
      ],

      code: {
        language: "text",
        code: `GET

Client
  |
  | GET /api/employees/101
  v
Tomcat
  |
  v
DispatcherServlet
  |
  v
Controller
  |
  +---- @PathVariable
  |
  v
Service
  |
  v
Response
  |
  v
Client


POST

Client
  |
  | POST /api/employees
  | JSON body
  v
Tomcat
  |
  v
DispatcherServlet
  |
  v
Controller
  |
  +---- @RequestBody
  |
  v
Service
  |
  v
Database
  |
  v
201 Created
  |
  v
Client`
      },

      bullets: [
        "Tomcat receives the HTTP request.",
        "DispatcherServlet coordinates Spring MVC request processing.",
        "Spring identifies the appropriate controller method.",
        "GET commonly reads path variables or query parameters.",
        "POST commonly reads a request body.",
        "The controller usually delegates business logic to a service.",
        "The service can interact with a repository and database.",
        "The final result becomes an HTTP response."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Understanding common mistakes helps prevent confusing REST API behavior during development and interviews."
      ],

      bullets: [
        "Mistake 1: Using GET to create or delete data.",
        "Mistake 2: Using POST for every operation instead of choosing appropriate HTTP methods.",
        "Mistake 3: Forgetting Content-Type when sending JSON.",
        "Mistake 4: Forgetting @RequestBody for JSON request data.",
        "Mistake 5: Using @RequestParam when the value actually identifies a resource.",
        "Mistake 6: Returning 200 for successful creation instead of considering 201 Created.",
        "Mistake 7: Putting database code directly inside the controller.",
        "Mistake 8: Accepting invalid request data without validation.",
        "Mistake 9: Returning sensitive fields from the response.",
        "Mistake 10: Assuming that a successful JSON conversion means the request is business-valid.",
        "Mistake 11: Creating separate action-style URLs when a resource-oriented design would be clearer.",
        "Mistake 12: Ignoring error scenarios such as missing resources."
      ]
    },

    {
      id: "testing",
      title: "Testing GET and POST",

      paragraphs: [
        "GET and POST endpoints can be tested using Postman, curl, browser tools, or automated integration tests.",
        "When testing POST, always verify both the request body and the response status code."
      ],

      code: {
        language: "bash",
        code: `# GET
curl http://localhost:8080/api/employees


# POST
curl -X POST http://localhost:8080/api/employees \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Rahul","email":"rahul@example.com"}'`
      },

      bullets: [
        "Test GET with valid URLs.",
        "Test GET for existing and missing resources.",
        "Test POST with valid JSON.",
        "Test POST with malformed JSON.",
        "Test POST with missing required fields after validation is added.",
        "Verify status codes and response bodies.",
        "Verify that POST actually creates the expected resource."
      ]
    },

    {
      id: "next-architecture",
      title: "Where GET and POST Fit in a Real Application",

      paragraphs: [
        "The controller is responsible for HTTP concerns, but it should not become the entire application.",
        "In a real Spring Boot application, GET and POST controller methods normally delegate to a service layer. The service applies business rules and communicates with a repository. The repository communicates with the database."
      ],

      code: {
        language: "text",
        code: `Client
   |
   v
Controller
   |
   | GET / POST
   v
Service
   |
   | Business logic
   v
Repository
   |
   | Database access
   v
MySQL / PostgreSQL`
      },

      bullets: [
        "Controller handles HTTP.",
        "Service handles business logic.",
        "Repository handles persistence.",
        "Database stores persistent data.",
        "This separation makes applications easier to test and maintain."
      ]
    },

    {
      id: "interview",
      title: "GET and POST Interview Questions",

      interviewQuestions: [
        {
          question: "What is @GetMapping?",
          answer:
            "@GetMapping maps an HTTP GET request to a Spring controller method. It is commonly used to retrieve resources."
        },
        {
          question: "What is @PostMapping?",
          answer:
            "@PostMapping maps an HTTP POST request to a Spring controller method. It is commonly used to create resources or submit data for processing."
        },
        {
          question: "How do you receive JSON in a POST request?",
          answer:
            "Use @RequestBody on a controller method parameter so Spring can deserialize the request body into the target Java type."
        },
        {
          question: "Can GET return JSON?",
          answer:
            "Yes. A GET endpoint can return a Java object or collection, which Spring can serialize into JSON."
        },
        {
          question: "Can POST return JSON?",
          answer:
            "Yes. A POST endpoint can return a Java object, collection, DTO, or ResponseEntity, which Spring can serialize into JSON."
        },
        {
          question: "What is the difference between GET and POST?",
          answer:
            "GET is primarily used to retrieve resources and is safe and idempotent. POST is commonly used to create a resource or submit data and is generally not idempotent."
        },
        {
          question: "Why is POST generally not idempotent?",
          answer:
            "Because repeating the same POST request can create multiple resources or produce the operation's effect multiple times."
        },
        {
          question: "What is @RequestBody?",
          answer:
            "@RequestBody tells Spring to read the HTTP request body and deserialize it into the Java parameter type."
        },
        {
          question: "What is @RequestParam?",
          answer:
            "@RequestParam extracts a value from the query string, such as department from /api/employees?department=Engineering."
        },
        {
          question: "What is @PathVariable?",
          answer:
            "@PathVariable extracts a value from the URL path, such as 101 from /api/employees/101."
        },
        {
          question: "What is the difference between @RequestParam and @PathVariable?",
          answer:
            "@PathVariable is generally used for values that identify a resource, while @RequestParam is commonly used for filtering, searching, sorting, and pagination."
        },
        {
          question: "Why use 201 Created for POST?",
          answer:
            "201 Created communicates that the server successfully created a new resource as a result of the request."
        },
        {
          question: "Can a GET request have a request body?",
          answer:
            "HTTP does not universally prohibit a body on GET, but GET request bodies have no generally defined semantics and are not normally used for standard REST API retrieval. Query parameters and path variables are preferred."
        },
        {
          question: "What does Content-Type mean?",
          answer:
            "Content-Type describes the media type of the request or response body, such as application/json."
        },
        {
          question: "What does Accept mean?",
          answer:
            "Accept tells the server which response media types the client can accept or prefers."
        },
        {
          question: "How does Spring convert JSON into a Java object?",
          answer:
            "Spring uses HTTP message converters. In a typical Spring Boot application, Jackson provides JSON deserialization support."
        },
        {
          question: "How does Spring convert a Java object into JSON?",
          answer:
            "Spring uses HTTP message converters to serialize the returned Java object into JSON, typically using Jackson."
        },
        {
          question: "Why should GET normally not modify data?",
          answer:
            "GET is defined as a safe HTTP method. Its intended semantics are retrieval rather than changing application state."
        },
        {
          question: "What happens if POST receives malformed JSON?",
          answer:
            "JSON deserialization can fail before the controller method receives the object. The API should return an appropriate client error response."
        },
        {
          question: "Can @GetMapping return ResponseEntity?",
          answer:
            "Yes. ResponseEntity can be returned from GET methods when explicit control over status codes, headers, and the response body is needed."
        },
        {
          question: "Can @PostMapping return ResponseEntity?",
          answer:
            "Yes. ResponseEntity is commonly used with POST when the API needs to return 201 Created, headers, or different responses for different outcomes."
        },
        {
          question: "Why should a controller call a service instead of containing all business logic?",
          answer:
            "Separating business logic into a service improves separation of concerns, reusability, testability, and maintainability."
        },
        {
          question: "What is the typical flow of a POST request?",
          answer:
            "The client sends the HTTP request, Tomcat receives it, DispatcherServlet routes it through Spring MVC, the controller receives the request body, the service performs business logic, the repository persists data when required, and the controller returns the HTTP response."
        },
        {
          question: "What is the typical flow of a GET request?",
          answer:
            "The client sends a GET request, Spring MVC finds the controller method, path variables or query parameters are resolved, the service retrieves the required data, and the result is serialized into the HTTP response."
        },
        {
          question: "Why should request validation be added to POST endpoints?",
          answer:
            "Validation prevents invalid or incomplete input from reaching business logic and helps maintain the integrity of application data."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You need an endpoint to retrieve all employees. What would you create?",
          answer:
            "I would create GET /api/employees using @GetMapping. The controller would call the service, and the service would retrieve the employees from the repository. A successful request would normally return 200 OK."
        },
        {
          question:
            "You need an endpoint to create an employee. What would you create?",
          answer:
            "I would create POST /api/employees using @PostMapping. I would accept an EmployeeRequest or DTO using @RequestBody, validate it, call the service, save the employee through the repository, and return 201 Created with the created resource or an appropriate response."
        },
        {
          question:
            "The client sends POST /api/employees but forgets Content-Type: application/json. What can happen?",
          answer:
            "Spring may not select the expected JSON message converter, depending on the request and available converters. The client should correctly specify Content-Type when sending JSON."
        },
        {
          question:
            "The GET endpoint works but POST returns an error. What would you check?",
          answer:
            "I would check the HTTP method, URL, Content-Type, request JSON structure, @RequestBody annotation, DTO fields, validation errors, Spring Security rules, server logs, and whether the request is reaching the intended controller method."
        },
        {
          question:
            "Why would you not use GET /createEmployee to create an employee?",
          answer:
            "GET is intended for safe retrieval and should not be used to perform state-changing operations. POST is the appropriate HTTP method for a typical resource creation operation."
        }
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "Remember the basic difference: GET retrieves data, while POST commonly sends data to the server to create a resource or perform a submission operation."
      ],

      bullets: [
        "@GetMapping maps HTTP GET requests.",
        "@PostMapping maps HTTP POST requests.",
        "@RequestBody reads the HTTP request body.",
        "@PathVariable reads values from the URL path.",
        "@RequestParam reads query parameters.",
        "GET is safe and idempotent according to HTTP semantics.",
        "POST is generally not idempotent.",
        "GET commonly returns 200 OK for successful retrieval.",
        "POST commonly returns 201 Created after successful resource creation.",
        "Content-Type describes the request body representation.",
        "Accept describes the response representation preferred by the client.",
        "Spring commonly uses Jackson for JSON serialization and deserialization.",
        "Use validation for POST request data.",
        "Use DTOs for stable API contracts.",
        "Keep business logic in the service layer.",
        "Use ResponseEntity when explicit response control is required.",
        "Test both successful and failure scenarios.",
        "Do not use GET for destructive or state-changing operations."
      ]
    }
  ]
};
