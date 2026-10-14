
export const whatIsRest = {
  id: "what-is-rest",
  title: "What is REST?",
  slug: "what-is-rest",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "25 min",

  description:
    "Learn what REST is, how REST APIs work, the main REST architectural constraints, resources and representations, HTTP methods, statelessness, caching, layered systems, and how clients communicate with server resources.",

  sections: [
    {
      id: "rest-definition",
      title: "What is REST?",

      paragraphs: [
        "REST stands for Representational State Transfer.",
        "REST is an architectural style used to design network-based applications and APIs.",
        "REST was introduced by Roy Fielding in his doctoral dissertation as a set of architectural constraints for distributed systems.",
        "A REST API allows a client and server to communicate through HTTP requests and responses.",
        "REST APIs commonly represent application data as resources such as users, products, orders, courses, and employees.",
        "REST is not a programming language, framework, or protocol. It is an architectural style.",
        "HTTP is commonly used to implement REST APIs, but REST itself is the architectural style rather than HTTP itself."
      ],

      bullets: [
        "REST = Representational State Transfer.",
        "REST is an architectural style.",
        "REST APIs commonly use HTTP.",
        "REST APIs expose resources.",
        "HTTP methods describe the requested operation.",
        "The server returns a representation of a resource.",
        "JSON is commonly used as a representation format."
      ]
    },

    {
      id: "rest-api-vs-rest",
      title: "REST vs REST API",

      paragraphs: [
        "REST is the architectural style, while a REST API is an API designed using REST principles.",
        "In everyday development, developers often say REST API when referring to HTTP APIs that expose resources using URLs and HTTP methods.",
        "Not every HTTP API is automatically a perfectly RESTful API. An API can use HTTP while violating some REST architectural constraints."
      ],

      code: {
        language: "text",
        code: `REST
  ↓
Architectural style

REST API
  ↓
API designed using REST principles

HTTP
  ↓
Protocol commonly used to implement REST APIs

JSON
  ↓
Common representation format`
      },

      bullets: [
        "REST → architectural style.",
        "HTTP → communication protocol.",
        "JSON → representation format.",
        "REST API → API designed around REST principles."
      ]
    },

    {
      id: "resource",
      title: "What is a Resource?",

      paragraphs: [
        "A resource is an identifiable piece of data or functionality exposed by an API.",
        "For example, in an employee management application, employees can be treated as resources.",
        "Resources are commonly identified using URLs.",
        "A collection resource represents multiple resources, while an individual resource identifies one resource."
      ],

      code: {
        language: "text",
        code: `Employees
    ↓
/api/employees

Single employee
    ↓
/api/employees/101

Departments
    ↓
/api/departments

Single department
    ↓
/api/departments/10`
      },

      bullets: [
        "Collection resource → /api/employees",
        "Individual resource → /api/employees/101",
        "The identifier 101 identifies one employee.",
        "Resource URLs should normally use nouns rather than action names."
      ]
    },

    {
      id: "resource-naming",
      title: "Resource-Oriented URL Design",

      paragraphs: [
        "REST APIs commonly use nouns to identify resources instead of putting business actions directly into URLs.",
        "The HTTP method communicates the intended operation."
      ],

      code: {
        language: "text",
        code: `Good:

GET    /api/employees
GET    /api/employees/101
POST   /api/employees
PUT    /api/employees/101
DELETE /api/employees/101


Less REST-oriented:

GET  /api/getEmployees
POST /api/createEmployee
POST /api/deleteEmployee`
      },

      bullets: [
        "Use nouns for resources.",
        "Use HTTP methods to communicate operations.",
        "Use identifiers for individual resources.",
        "Keep resource URLs consistent."
      ]
    },

    {
      id: "client-server",
      title: "Client-Server Architecture",

      paragraphs: [
        "A REST API normally follows a client-server model.",
        "The client sends an HTTP request to the server.",
        "The server processes the request and sends an HTTP response back to the client.",
        "The client and server have separate responsibilities.",
        "The client is responsible for the user interface or client-side interaction, while the server is responsible for data, business logic, and server-side processing."
      ],

      code: {
        language: "text",
        code: `React / Browser / Mobile App / Postman
                  |
                  | HTTP Request
                  ↓
             REST API
                  |
                  | HTTP Response
                  ↓
React / Browser / Mobile App / Postman`
      },

      bullets: [
        "Client → sends requests.",
        "Server → processes requests.",
        "Server → returns responses.",
        "Client and server can evolve independently.",
        "The server does not need to know how the client renders the data."
      ]
    },

    {
      id: "client-server-separation",
      title: "Why Client and Server are Separated",

      paragraphs: [
        "Client-server separation reduces coupling between the user interface and the backend.",
        "For example, the same Spring Boot REST API can serve a React web application, a mobile application, and a Postman client.",
        "The clients can have different technologies while communicating with the same API contract."
      ],

      code: {
        language: "text",
        code: `                 Spring Boot REST API
                  /      |       \\
                 /       |        \\
                ↓        ↓         ↓
             React    Android    Postman`
      },

      bullets: [
        "Frontend can change without rewriting the backend.",
        "Backend can change internally without changing the client if the API contract remains compatible.",
        "Multiple clients can consume the same REST API."
      ]
    },

    {
      id: "example-request",
      title: "Simple REST Request",

      code: {
        language: "http",
        code: `GET /api/employees/101 HTTP/1.1
Host: localhost:8080
Accept: application/json`
      },

      paragraphs: [
        "The client requests employee 101 from the server.",
        "The server can return the employee representation, commonly as JSON.",
        "The Accept header tells the server which response media types the client can accept."
      ],

      output: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "department": "Engineering"
}`,

      bullets: [
        "GET → HTTP method.",
        "/api/employees/101 → resource URL.",
        "Accept → preferred response media type.",
        "200 OK → successful request.",
        "Content-Type → representation format of the response body."
      ]
    },

    {
      id: "request-response",
      title: "REST Request and Response",

      paragraphs: [
        "A REST interaction normally consists of a request from the client and a response from the server.",
        "The request can contain a method, URL, headers, and sometimes a body.",
        "The response contains a status code, headers, and sometimes a body."
      ],

      code: {
        language: "text",
        code: `REQUEST

Method
  +
URL
  +
Headers
  +
Optional Body


RESPONSE

Status Code
  +
Headers
  +
Optional Body`
      },

      bullets: [
        "GET commonly retrieves data.",
        "POST commonly creates data.",
        "PUT commonly replaces a resource.",
        "PATCH commonly partially updates a resource.",
        "DELETE commonly removes a resource."
      ]
    },

    {
      id: "rest-principles",
      title: "Important REST Principles",

      paragraphs: [
        "REST is based on a set of architectural constraints. These constraints help create scalable and loosely coupled distributed systems.",
        "The major REST constraints commonly discussed are client-server, statelessness, cacheability, uniform interface, layered system, and optional code-on-demand."
      ],

      bullets: [
        "Client and server have separate responsibilities.",
        "Requests should generally be stateless.",
        "Responses should indicate whether they are cacheable when appropriate.",
        "Resources should be identifiable.",
        "HTTP methods and representations provide a uniform interface.",
        "Responses should contain enough information for the client to process them.",
        "A REST system can contain multiple layers between client and server.",
        "Code-on-demand is an optional REST constraint."
      ]
    },

    {
      id: "statelessness",
      title: "Statelessness in REST",

      paragraphs: [
        "Statelessness means that each request should contain the information necessary for the server to understand and process that request.",
        "The server should not depend on conversational state stored from previous requests to understand the current request.",
        "Stateless does not mean that the application has no data or that the server cannot store database records.",
        "A server can store persistent business data in a database while still exposing a stateless HTTP API."
      ],

      code: {
        language: "text",
        code: `Request 1

GET /api/employees/101
Authorization: Bearer <token>


Request 2

GET /api/employees/102
Authorization: Bearer <token>


Each request contains what the server
needs to authenticate and process it.`
      },

      bullets: [
        "Each request should be independently understandable.",
        "Do not depend on hidden conversational server state.",
        "Database data is not the same thing as conversational session state.",
        "Statelessness helps horizontal scaling."
      ]
    },

    {
      id: "stateless-scaling",
      title: "Why Statelessness Helps Scaling",

      paragraphs: [
        "Stateless APIs make it easier for a load balancer to distribute requests across multiple application instances.",
        "If each request contains the required authentication and request information, the next request can be handled by another healthy instance."
      ],

      code: {
        language: "text",
        code: `                Load Balancer
                 /    |    \\
                /     |     \\
               ↓      ↓      ↓
           Server 1 Server 2 Server 3

Request 1 → Server 1
Request 2 → Server 3
Request 3 → Server 2`
      },

      bullets: [
        "Statelessness simplifies horizontal scaling.",
        "Requests can be distributed across instances.",
        "Session affinity is less necessary for application-level conversational state.",
        "Authentication tokens are commonly carried with each request in token-based APIs."
      ]
    },

    {
      id: "representation",
      title: "What is a Representation?",

      paragraphs: [
        "A resource is the conceptual data being exposed, while a representation is a form in which that resource is transferred to the client.",
        "JSON is one common representation format.",
        "The same conceptual resource can potentially have different representations, such as JSON or XML."
      ],

      code: {
        language: "text",
        code: `Resource:

Employee 101


JSON representation:

{
  "id": 101,
  "name": "Rahul"
}


XML representation:

<employee>
    <id>101</id>
    <name>Rahul</name>
</employee>`
      },

      bullets: [
        "Resource → conceptual entity.",
        "Representation → transferred form of that resource.",
        "JSON → common representation.",
        "XML → another possible representation."
      ]
    },

    {
      id: "http-methods",
      title: "HTTP Methods in REST",

      paragraphs: [
        "REST APIs commonly use HTTP methods to communicate the intended operation on a resource.",
        "The method and URL work together to describe the operation."
      ],

      code: {
        language: "text",
        code: `GET
Retrieve a resource

POST
Create a new resource

PUT
Replace a resource

PATCH
Partially update a resource

DELETE
Remove a resource`
      },

      bullets: [
        "GET /api/employees → retrieve employees.",
        "GET /api/employees/101 → retrieve employee 101.",
        "POST /api/employees → create an employee.",
        "PUT /api/employees/101 → replace employee 101.",
        "PATCH /api/employees/101 → partially update employee 101.",
        "DELETE /api/employees/101 → delete employee 101."
      ]
    },

    {
      id: "uniform-interface",
      title: "Uniform Interface",

      paragraphs: [
        "The uniform interface constraint is one of the most important REST concepts.",
        "It means that communication between clients and servers should follow consistent conventions.",
        "Resources should be identifiable, representations should be understandable, and standard HTTP semantics should be used consistently."
      ],

      code: {
        language: "text",
        code: `GET /api/products/101

means:

Retrieve product 101


POST /api/products

means:

Create a product


DELETE /api/products/101

means:

Delete product 101`
      },

      bullets: [
        "Use consistent resource URLs.",
        "Use standard HTTP methods.",
        "Use meaningful status codes.",
        "Use predictable request and response representations.",
        "Avoid inventing different conventions for every endpoint."
      ]
    },

    {
      id: "cacheability",
      title: "Cacheability",

      paragraphs: [
        "REST responses should define themselves as cacheable or non-cacheable according to the application's requirements.",
        "Caching can reduce repeated work and improve response performance.",
        "HTTP provides headers such as Cache-Control, ETag, and Last-Modified to support caching and conditional requests."
      ],

      code: {
        language: "http",
        code: `HTTP/1.1 200 OK
Cache-Control: max-age=60

{
  "id": 101,
  "name": "Rahul"
}`
      },

      bullets: [
        "Caching can reduce repeated server processing.",
        "Cache-Control controls caching behavior.",
        "ETag can identify a representation version.",
        "Conditional requests can avoid transferring unchanged representations."
      ]
    },

    {
      id: "layered-system",
      title: "Layered System",

      paragraphs: [
        "A REST architecture can contain multiple layers between the client and the final server.",
        "A client does not necessarily need to know whether it is communicating directly with the application server or through intermediate components."
      ],

      code: {
        language: "text",
        code: `Client
   |
   v
Load Balancer
   |
   v
API Gateway / Proxy
   |
   v
Spring Boot Application
   |
   v
Service Layer
   |
   v
Database`
      },

      bullets: [
        "Load balancers can distribute requests.",
        "Proxies can sit between clients and servers.",
        "Gateways can provide routing or cross-cutting capabilities.",
        "The layered architecture can improve scalability and separation of responsibilities."
      ]
    },

    {
      id: "code-on-demand",
      title: "Code-on-Demand",

      paragraphs: [
        "Code-on-demand is an optional REST architectural constraint.",
        "It allows a server to temporarily extend client functionality by transferring executable code.",
        "This constraint is optional, unlike the other commonly discussed REST constraints."
      ],

      bullets: [
        "Code-on-demand is optional.",
        "The server can transfer executable code to the client.",
        "It is less commonly emphasized in typical JSON REST API development."
      ]
    },

    {
      id: "crud-mapping",
      title: "REST and CRUD Mapping",

      paragraphs: [
        "REST resource operations are often mapped to CRUD operations in database-backed applications.",
        "CRUD stands for Create, Read, Update, and Delete."
      ],

      code: {
        language: "text",
        code: `CRUD       HTTP       Example

Create     POST       /api/employees
Read       GET        /api/employees/101
Update     PUT        /api/employees/101
Update     PATCH      /api/employees/101
Delete     DELETE     /api/employees/101`
      },

      bullets: [
        "Create → POST.",
        "Read → GET.",
        "Update → PUT or PATCH depending on semantics.",
        "Delete → DELETE."
      ]
    },

    {
      id: "spring-boot-rest",
      title: "REST in Spring Boot",

      paragraphs: [
        "Spring Boot provides Spring MVC features that make it straightforward to build REST APIs.",
        "@RestController defines the HTTP-facing controller.",
        "Mapping annotations such as @GetMapping and @PostMapping connect HTTP requests to Java methods.",
        "The service layer performs application logic and the repository layer commonly performs database access."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.getEmployee(id);
    }
}`
      },

      bullets: [
        "@RestController → REST controller.",
        "@RequestMapping → base URL.",
        "@GetMapping → GET endpoint.",
        "@PathVariable → reads the employee ID.",
        "Service → handles application logic.",
        "Repository → handles persistence."
      ]
    },

    {
      id: "spring-request-flow",
      title: "Complete REST Request Flow in Spring Boot",

      paragraphs: [
        "Understanding the complete request flow is important for interviews and real development.",
        "The embedded web server receives the HTTP request and Spring MVC routes it to the appropriate controller method."
      ],

      code: {
        language: "text",
        code: `React / Postman
      |
      | HTTP Request
      v
Embedded Tomcat
      |
      v
DispatcherServlet
      |
      v
Handler Mapping
      |
      v
@RestController
      |
      v
@Service
      |
      v
@Repository
      |
      v
Database
      |
      | Result
      v
Repository
      |
      v
Service
      |
      v
Controller
      |
      v
HTTP Response
      |
      v
React / Postman`
      },

      bullets: [
        "Tomcat receives the HTTP request.",
        "DispatcherServlet coordinates Spring MVC request processing.",
        "Spring finds the matching handler method.",
        "The controller handles the HTTP boundary.",
        "The service performs application logic.",
        "The repository accesses persistent data.",
        "The response travels back to the client."
      ]
    },

    {
      id: "rest-vs-soap",
      title: "REST vs SOAP",

      paragraphs: [
        "REST and SOAP are different approaches to building web services.",
        "REST is an architectural style, while SOAP is a protocol with defined messaging rules.",
        "REST commonly uses HTTP methods and resource-oriented URLs, while SOAP commonly uses XML-based messages and formal service contracts."
      ],

      bullets: [
        "REST is an architectural style.",
        "SOAP is a protocol.",
        "REST commonly uses HTTP methods directly.",
        "REST commonly uses JSON, although other representations are possible.",
        "SOAP commonly uses XML messages.",
        "REST is generally resource-oriented.",
        "SOAP provides a formal messaging protocol and specification.",
        "SOAP can define formal contracts using technologies such as WSDL."
      ]
    },

    {
      id: "real-world",
      title: "Real-World REST Example",

      code: {
        language: "text",
        code: `GET    /api/products
GET    /api/products/101
POST   /api/products
PUT    /api/products/101
PATCH  /api/products/101
DELETE /api/products/101`
      },

      paragraphs: [
        "The URL identifies the product resource, while the HTTP method communicates the requested operation.",
        "This resource-oriented design makes the API predictable for clients."
      ],

      bullets: [
        "GET /products → retrieve products.",
        "GET /products/101 → retrieve one product.",
        "POST /products → create a product.",
        "PUT /products/101 → replace product 101.",
        "PATCH /products/101 → partially update product 101.",
        "DELETE /products/101 → delete product 101."
      ]
    },

    {
      id: "rest-status-codes",
      title: "REST and HTTP Status Codes",

      paragraphs: [
        "REST APIs should use HTTP status codes to communicate the outcome of a request.",
        "The status code is part of the response contract and helps clients understand whether an operation succeeded or failed."
      ],

      code: {
        language: "text",
        code: `200 OK
Request succeeded

201 Created
Resource was successfully created

204 No Content
Request succeeded with no response body

400 Bad Request
Request is invalid

401 Unauthorized
Authentication is missing or invalid

403 Forbidden
Request is understood but not permitted

404 Not Found
Requested resource was not found

409 Conflict
Request conflicts with current resource state

500 Internal Server Error
Unexpected server-side failure`
      },

      bullets: [
        "Use status codes consistently.",
        "Do not return 200 OK for every possible outcome.",
        "Choose the status code based on the actual result."
      ]
    },

    {
      id: "rest-json",
      title: "Why JSON is Common in REST APIs",

      paragraphs: [
        "JSON is commonly used in REST APIs because it is lightweight, human-readable, and supported by most programming languages and frontend frameworks.",
        "Spring Boot commonly uses Jackson for JSON serialization and deserialization."
      ],

      code: {
        language: "json",
        code: `{
  "id": 101,
  "name": "Rahul",
  "department": "Engineering"
}`
      },

      bullets: [
        "JSON is easy for frontend applications to consume.",
        "JavaScript has native JSON support.",
        "Java applications can serialize and deserialize JSON using libraries such as Jackson.",
        "JSON is not a requirement of REST; it is simply a commonly used representation."
      ]
    },

    {
      id: "rest-misconceptions",
      title: "Common REST Misconceptions",

      bullets: [
        "REST is not a programming language.",
        "REST is not a Spring Boot annotation.",
        "REST is not the same thing as JSON.",
        "REST is not itself the HTTP protocol.",
        "Using HTTP does not automatically make an API fully RESTful.",
        "A REST API can have a database and still be stateless at the HTTP interaction level.",
        "Stateless does not mean the server cannot store persistent data.",
        "GET is normally used for retrieval; it should not be used simply because it is convenient for every operation."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common REST API Design Mistakes",

      paragraphs: [
        "Understanding REST concepts also means knowing what commonly makes an API difficult to use or maintain."
      ],

      bullets: [
        "Using verbs everywhere in resource URLs, such as /getEmployees or /createEmployee.",
        "Ignoring HTTP methods and using POST for every operation.",
        "Returning 200 OK for every response.",
        "Creating inconsistent URL naming conventions.",
        "Putting large amounts of business logic directly inside controllers.",
        "Exposing database entities without considering the API contract.",
        "Returning internal exception details to clients.",
        "Ignoring validation of request data.",
        "Ignoring caching when caching is appropriate.",
        "Treating REST and JSON as if they were the same concept.",
        "Assuming statelessness means the application cannot use a database."
      ]
    },

    {
      id: "rest-best-practices",
      title: "REST API Best Practices",

      bullets: [
        "Use resource-oriented URLs.",
        "Use standard HTTP methods correctly.",
        "Use meaningful HTTP status codes.",
        "Keep requests independently understandable.",
        "Use consistent JSON structures when JSON is the chosen representation.",
        "Use DTOs to define API contracts when appropriate.",
        "Validate incoming request data.",
        "Keep controllers focused on HTTP concerns.",
        "Keep business logic in the service/application layer.",
        "Use global exception handling for consistent error responses.",
        "Use pagination for large collections.",
        "Use filtering and sorting through query parameters.",
        "Document the API contract.",
        "Version APIs when breaking changes require versioning.",
        "Apply authentication and authorization where required."
      ]
    },

    {
      id: "interview",
      title: "REST Interview Questions",

      interviewQuestions: [
        {
          question: "What does REST stand for?",
          answer:
            "REST stands for Representational State Transfer. It is an architectural style for designing network-based applications and APIs."
        },
        {
          question: "What is a REST API?",
          answer:
            "A REST API is an API designed around REST principles, commonly using HTTP methods, resource-oriented URLs, representations, and standard HTTP semantics."
        },
        {
          question: "Is REST a protocol?",
          answer:
            "No. REST is an architectural style. HTTP is a protocol commonly used to implement REST APIs."
        },
        {
          question: "What is a resource in REST?",
          answer:
            "A resource is an identifiable piece of application data or functionality, such as a user, product, employee, or order."
        },
        {
          question: "What is a representation?",
          answer:
            "A representation is the transferable form of a resource. JSON is a common representation used by REST APIs."
        },
        {
          question: "What is statelessness in REST?",
          answer:
            "Statelessness means each request should contain the information necessary for the server to process it rather than depending on conversational state stored from previous requests."
        },
        {
          question: "Why is statelessness useful?",
          answer:
            "Statelessness simplifies scaling because requests can generally be routed to different healthy application instances without depending on server-side conversational state."
        },
        {
          question: "What are the main REST architectural constraints?",
          answer:
            "The commonly discussed constraints are client-server, statelessness, cacheability, uniform interface, layered system, and the optional code-on-demand constraint."
        },
        {
          question: "What is the client-server constraint?",
          answer:
            "It separates client responsibilities from server responsibilities, allowing the client and server to evolve independently."
        },
        {
          question: "What is the uniform interface in REST?",
          answer:
            "It is a consistent way of interacting with resources using identifiable resources, standard operations, representations, and predictable semantics."
        },
        {
          question: "What is cacheability?",
          answer:
            "Cacheability means responses should indicate whether they can be reused from a cache. HTTP headers such as Cache-Control and ETag support caching behavior."
        },
        {
          question: "What is a layered system?",
          answer:
            "A layered system allows intermediate components such as proxies, gateways, and load balancers to exist between the client and server."
        },
        {
          question: "Is JSON mandatory in REST?",
          answer:
            "No. JSON is commonly used, but REST does not require JSON. Other representations such as XML can also be used."
        },
        {
          question: "Is HTTP mandatory for REST?",
          answer:
            "REST is an architectural style rather than a protocol. HTTP is the most common protocol used to build REST APIs."
        },
        {
          question: "What is the difference between REST and SOAP?",
          answer:
            "REST is an architectural style, while SOAP is a protocol. REST commonly uses HTTP methods and resource-oriented URLs, whereas SOAP commonly uses XML-based messages and formal service specifications."
        },
        {
          question: "Why are nouns commonly used in REST URLs?",
          answer:
            "URLs identify resources, while HTTP methods describe the operation being performed on those resources. This creates a consistent resource-oriented API design."
        },
        {
          question: "What is the difference between /employees and /employees/101?",
          answer:
            "/employees commonly represents the employee collection, while /employees/101 identifies the employee whose identifier is 101."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based REST Interview Questions",

      interviewQuestions: [
        {
          question:
            "You need an API to retrieve employee 101. What endpoint would you design?",
          answer:
            "A common resource-oriented design is GET /api/employees/101."
        },
        {
          question:
            "You need to create a new employee. What method and endpoint would you use?",
          answer:
            "A common design is POST /api/employees with the new employee data in the request body."
        },
        {
          question:
            "Why should you avoid /api/getEmployee/101?",
          answer:
            "The URL contains an action. A more resource-oriented design is /api/employees/101, with GET communicating the retrieval operation."
        },
        {
          question:
            "Can a stateless REST API use MySQL?",
          answer:
            "Yes. Statelessness concerns the request interaction model, not whether the application has persistent data. The application can store users, employees, orders, and other data in MySQL."
        },
        {
          question:
            "A client sends GET /api/employees/101 twice. Can different servers handle the requests?",
          answer:
            "Yes, in a properly stateless design, either request can generally be routed to any healthy application instance because the request contains the information needed to process it."
        },
        {
          question:
            "Why would you use PATCH instead of PUT?",
          answer:
            "PATCH is commonly used for partial modification, while PUT generally represents replacement of the resource representation or a complete update according to the API's defined semantics."
        },
        {
          question:
            "Why should a REST API use HTTP status codes?",
          answer:
            "Status codes provide standardized information about the outcome of the request, allowing clients to handle success, validation errors, authorization failures, missing resources, and server failures appropriately."
        },
        {
          question:
            "Is an API RESTful just because it returns JSON?",
          answer:
            "No. JSON is only a representation format. REST is an architectural style with multiple constraints and principles."
        },
        {
          question:
            "Can React and a mobile application consume the same REST API?",
          answer:
            "Yes. A REST API can expose a stable HTTP contract that is consumed by different clients such as React web applications, mobile applications, and other backend services."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "REST Quick Reference",

      code: {
        language: "text",
        code: `REST
↓
Representational State Transfer
↓
Architectural Style

Resource
↓
Identifiable application data

Representation
↓
Transferred form of a resource

HTTP Methods
↓
GET
POST
PUT
PATCH
DELETE

Common REST Constraints
↓
Client-Server
Stateless
Cacheable
Uniform Interface
Layered System
Code-on-Demand (optional)

Example

GET /api/employees/101

Response

200 OK

{
  "id": 101,
  "name": "Rahul"
}`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "REST is an architectural style for designing distributed systems and APIs. REST APIs commonly use HTTP, resource-oriented URLs, standard HTTP methods, representations such as JSON, and HTTP status codes."
      ],

      bullets: [
        "REST = Representational State Transfer.",
        "REST is an architectural style, not a protocol.",
        "HTTP is commonly used to implement REST APIs.",
        "A resource is an identifiable piece of application data or functionality.",
        "A representation is the transferred form of a resource.",
        "Use nouns for resource-oriented URLs.",
        "GET commonly retrieves resources.",
        "POST commonly creates resources.",
        "PUT commonly replaces resources.",
        "PATCH commonly partially updates resources.",
        "DELETE commonly removes resources.",
        "REST commonly follows client-server separation.",
        "REST requests should be stateless.",
        "Cacheability allows appropriate responses to be reused.",
        "Uniform interface provides consistent interaction with resources.",
        "Layered systems can contain proxies, gateways, and load balancers.",
        "Code-on-demand is an optional REST constraint.",
        "JSON is common but not mandatory.",
        "Use meaningful HTTP status codes.",
        "REST and SOAP are different approaches.",
        "REST is not the same thing as JSON.",
        "Stateless does not mean the server cannot have a database.",
        "Spring Boot commonly implements REST APIs using @RestController and Spring MVC."
      ]
    }
  ]
};
