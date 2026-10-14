
export const httpFundamentals = {
  id: "http-fundamentals",
  title: "HTTP Fundamentals",
  slug: "http-fundamentals",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Understand HTTP requests, responses, methods, URLs, headers, bodies, status codes, JSON, and how HTTP forms the foundation of Spring Boot REST APIs.",

  sections: [
    {
      id: "what-is-http",
      title: "What is HTTP?",

      paragraphs: [
        "HTTP stands for Hypertext Transfer Protocol.",
        "It is an application-layer protocol used for communication between clients and servers.",
        "A client sends an HTTP request to a server, and the server sends an HTTP response back to the client.",
        "REST APIs commonly use HTTP because HTTP already provides standardized concepts such as methods, URLs, headers, status codes, and request and response bodies.",
        "For a Spring Boot REST API, HTTP is the communication layer through which clients such as browsers, mobile applications, Postman, frontend applications, and other backend services communicate with the application."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   | GET /api/employees
   v
Spring Boot Server
   |
   | HTTP Response
   | 200 OK
   v
Client`
      },

      bullets: [
        "HTTP is an application-layer communication protocol.",
        "HTTP follows a request-response model.",
        "REST APIs commonly use HTTP.",
        "HTTP itself does not define your application's business rules.",
        "Spring Boot uses HTTP as the transport layer for REST endpoints."
      ]
    },

    {
      id: "http-client-server",
      title: "Client and Server",

      paragraphs: [
        "The client is the system that initiates an HTTP request. The server receives the request, processes it, and returns a response.",
        "A client can be a web browser, React application, mobile application, Postman, curl, another backend service, or any HTTP-capable application.",
        "A Spring Boot application commonly acts as the HTTP server for REST APIs."
      ],

      code: {
        language: "text",
        code: `React Frontend
      |
      | HTTP Request
      v
Spring Boot Backend
      |
      | HTTP Response
      v
React Frontend


Other possible clients:

Postman
Mobile App
Browser
Another Backend
Command-line client`
      },

      bullets: [
        "The client initiates communication.",
        "The server processes the request.",
        "The server sends a response.",
        "A system can act as both client and server in different communication flows."
      ]
    },

    {
      id: "request-response",
      title: "HTTP Request and Response",

      paragraphs: [
        "HTTP communication is based on requests and responses.",
        "The client sends a request containing information such as the HTTP method, target URL, headers, and optionally a body.",
        "The server processes the request and returns a response containing a status code, headers, and optionally a response body."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   |---------------------------->
   |
   |                             Server
   |                               |
   |                         Process request
   |                               |
   | HTTP Response                 |
   |<----------------------------|
   |
Client`
      },

      bullets: [
        "Request goes from client to server.",
        "Response goes from server to client.",
        "A request can contain a body.",
        "A response can contain a body.",
        "Headers can exist on both requests and responses."
      ]
    },

    {
      id: "request-structure",
      title: "HTTP Request Structure",

      paragraphs: [
        "An HTTP request contains several important parts. The request line identifies the HTTP method, target path, and HTTP version.",
        "Headers provide additional metadata. A request body can contain data sent to the server when the operation requires it."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/101 HTTP/1.1
Host: localhost:8080
Accept: application/json

`
      },

      bullets: [
        "HTTP method identifies the intended operation.",
        "URL or request target identifies where the request is sent.",
        "HTTP version identifies the HTTP protocol version.",
        "Headers provide additional request information.",
        "A request body can contain data sent to the server.",
        "GET requests normally do not use a body for their primary semantics."
      ]
    },

    {
      id: "request-parts",
      title: "Main Parts of an HTTP Request",

      paragraphs: [
        "For interview purposes, remember that an HTTP request can be understood as a request line, headers, and an optional body."
      ],

      code: {
        language: "text",
        code: `HTTP Request

1. Request line
   |
   +-- Method
   +-- Request target
   +-- HTTP version

2. Headers
   |
   +-- Host
   +-- Accept
   +-- Authorization
   +-- Content-Type
   +-- Other metadata

3. Blank line

4. Optional request body
   |
   +-- JSON
   +-- Form data
   +-- Other supported data`
      },

      bullets: [
        "The request line identifies the operation and target.",
        "Headers provide metadata.",
        "The body carries request data when required.",
        "GET commonly uses URL path and query parameters rather than a request body."
      ]
    },

    {
      id: "response-structure",
      title: "HTTP Response Structure",

      paragraphs: [
        "An HTTP response contains a status line, response headers, and optionally a response body.",
        "The status code is one of the most important parts because it tells the client whether the request succeeded or failed and provides a standardized category for the result."
      ],

      code: {
        language: "http",
        code: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul"
}`
      },

      bullets: [
        "Status code indicates the result of the request.",
        "Reason phrase such as OK is associated with the status.",
        "Response headers provide metadata.",
        "Response body contains the returned representation when applicable."
      ]
    },

    {
      id: "status-code-categories",
      title: "HTTP Status Code Categories",

      paragraphs: [
        "HTTP status codes are grouped into five categories. The first digit tells you the general meaning of the response."
      ],

      code: {
        language: "text",
        code: `1xx
Informational

2xx
Successful

3xx
Redirection

4xx
Client Error

5xx
Server Error`
      },

      bullets: [
        "1xx responses are informational.",
        "2xx responses indicate successful processing.",
        "3xx responses indicate redirection.",
        "4xx responses generally indicate a client-side request problem.",
        "5xx responses generally indicate a server-side failure."
      ]
    },

    {
      id: "important-status-codes",
      title: "Important HTTP Status Codes",

      paragraphs: [
        "Spring Boot REST APIs commonly use a subset of HTTP status codes. You should understand these well for backend interviews."
      ],

      code: {
        language: "text",
        code: `200 OK
Request successfully processed.

201 Created
A new resource was successfully created.

204 No Content
Request succeeded but there is no response body.

400 Bad Request
The request is invalid or malformed.

401 Unauthorized
Authentication is required or failed.

403 Forbidden
The client is not allowed to perform the operation.

404 Not Found
The requested resource does not exist.

409 Conflict
The request conflicts with the current resource state.

500 Internal Server Error
Unexpected server-side failure.`
      },

      bullets: [
        "200 is commonly used for successful retrieval.",
        "201 is commonly used after successful creation.",
        "204 is commonly used when a successful response has no body.",
        "400 is used for invalid client requests.",
        "401 is related to authentication.",
        "403 is related to authorization.",
        "404 indicates that a resource was not found.",
        "409 can indicate a resource state conflict.",
        "500 indicates an unexpected server-side problem."
      ]
    },

    {
      id: "url",
      title: "Understanding a URL",

      paragraphs: [
        "A URL identifies where a resource or HTTP service can be accessed.",
        "A URL can contain a scheme, host, port, path, query parameters, and sometimes a fragment. HTTP API requests commonly use the scheme, host, optional port, path, and query string."
      ],

      code: {
        language: "text",
        code: `https://example.com:8080/api/employees/101?department=IT

https
 ↓
Scheme / Protocol

example.com
 ↓
Host

:8080
 ↓
Port

/api/employees/101
 ↓
Path

?department=IT
 ↓
Query parameter`
      },

      bullets: [
        "The scheme identifies the protocol, such as http or https.",
        "The host identifies the server.",
        "The port identifies the network port when explicitly specified.",
        "The path identifies the requested resource or route.",
        "The query string provides additional parameters.",
        "HTTPS is HTTP carried over TLS."
      ]
    },

    {
      id: "url-path",
      title: "URL Path",

      paragraphs: [
        "The path identifies the route or resource being requested.",
        "In a REST API, the path is normally designed around resources rather than controller method names."
      ],

      code: {
        language: "text",
        code: `/api/employees

Collection resource


/api/employees/101

Specific employee resource


/api/departments/5/employees

Employees associated with department 5`
      },

      bullets: [
        "Paths should be meaningful.",
        "Resource identifiers can appear in the path.",
        "REST APIs commonly use nouns for resource paths.",
        "Avoid unnecessary action-style URLs when a resource-oriented design is clearer."
      ]
    },

    {
      id: "query-parameters",
      title: "Query Parameters",

      paragraphs: [
        "Query parameters provide additional information to the server without changing the main resource path.",
        "They are commonly used for filtering, searching, sorting, pagination, and optional parameters."
      ],

      code: {
        language: "text",
        code: `GET /api/employees?department=IT

GET /api/employees?page=0&size=10

GET /api/employees?sort=name

GET /api/employees?department=IT&sort=name`
      },

      bullets: [
        "Query parameters begin after ?.",
        "Multiple parameters are separated by &.",
        "Filtering commonly uses query parameters.",
        "Pagination commonly uses query parameters.",
        "Query parameters are different from path variables."
      ]
    },

    {
      id: "headers",
      title: "HTTP Headers",

      paragraphs: [
        "HTTP headers provide additional information about a request or response.",
        "Headers are metadata. They do not normally represent the main resource data itself.",
        "Some headers describe the data format, while others provide authentication, caching, client information, correlation information, or other protocol metadata."
      ],

      code: {
        language: "http",
        code: `Accept: application/json
Content-Type: application/json
Authorization: Bearer token
User-Agent: ExampleClient`
      },

      bullets: [
        "Accept describes response formats the client can process.",
        "Content-Type describes the format of the request or response body.",
        "Authorization can carry authentication credentials.",
        "User-Agent identifies information about the client.",
        "Headers can be present on both requests and responses."
      ]
    },

    {
      id: "accept-content-type",
      title: "Accept vs Content-Type",

      paragraphs: [
        "Accept and Content-Type are commonly confused in REST API interviews.",
        "Accept describes the representation the client wants to receive. Content-Type describes the media type of the body that is being sent or returned."
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
      },

      bullets: [
        "Content-Type answers: What format is the body?",
        "Accept answers: What response format can the client accept?",
        "For a JSON request, Content-Type is commonly application/json.",
        "For a JSON response, Content-Type is commonly application/json."
      ]
    },

    {
      id: "authorization-header",
      title: "Authorization Header",

      paragraphs: [
        "The Authorization header is commonly used to send authentication credentials with an HTTP request.",
        "In bearer-token authentication, the token is commonly sent using the Bearer authentication scheme.",
        "The server must validate the credential before trusting the identity or permissions associated with it."
      ],

      code: {
        language: "http",
        code: `GET /api/employees
Authorization: Bearer eyJ...`
      },

      bullets: [
        "Authorization carries authentication credentials.",
        "Bearer tokens are commonly used with JWT-based APIs.",
        "The server must validate the token.",
        "Never log access tokens or credentials unnecessarily.",
        "Authentication and authorization are different concepts."
      ]
    },

    {
      id: "json",
      title: "JSON in REST APIs",

      paragraphs: [
        "JSON stands for JavaScript Object Notation. It is a text-based data format commonly used to represent structured data.",
        "REST APIs frequently use JSON because it is compact, readable, widely supported, and easy for frontend and backend applications to process.",
        "Spring Boot commonly uses Jackson to serialize Java objects into JSON responses and deserialize JSON request bodies into Java objects."
      ],

      code: {
        language: "json",
        code: `{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
      },

      bullets: [
        "JSON represents structured data.",
        "JSON objects use key-value pairs.",
        "JSON arrays contain multiple values or objects.",
        "JSON strings use double quotes.",
        "REST APIs commonly use application/json as the media type."
      ]
    },

    {
      id: "json-java-flow",
      title: "JSON and Java Object Conversion",

      paragraphs: [
        "When a client sends JSON to a Spring Boot POST endpoint, Spring can deserialize the JSON into a Java object.",
        "When a controller returns a Java object, Spring can serialize the object into JSON for the HTTP response."
      ],

      code: {
        language: "text",
        code: `Request:

JSON
  |
  | Deserialization
  v
Java Object
  |
  v
Controller


Response:

Java Object
  |
  | Serialization
  v
JSON
  |
  v
HTTP Response`
      },

      bullets: [
        "Deserialization converts JSON into a Java object.",
        "Serialization converts a Java object into JSON.",
        "Spring HTTP message converters handle this process.",
        "Jackson commonly provides JSON support in Spring Boot."
      ]
    },

    {
      id: "request-body",
      title: "HTTP Request Body",

      paragraphs: [
        "The request body contains data sent from the client to the server.",
        "POST and PUT requests commonly use request bodies to send structured data.",
        "The body format is described by the Content-Type header."
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

      bullets: [
        "Request bodies carry data to the server.",
        "JSON is commonly used for REST request bodies.",
        "Content-Type describes the body format.",
        "Spring's @RequestBody can map JSON to a Java object."
      ]
    },

    {
      id: "response-body",
      title: "HTTP Response Body",

      paragraphs: [
        "The response body contains data returned by the server when a response representation is applicable.",
        "For a REST API, the response body commonly contains JSON representing a resource or an error response."
      ],

      code: {
        language: "http",
        code: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul"
}`
      },

      bullets: [
        "The response body contains returned data when applicable.",
        "Content-Type describes the response representation.",
        "A 204 No Content response should not contain a response body.",
        "Error responses can also have structured JSON bodies."
      ]
    },

    {
      id: "http-methods",
      title: "Important HTTP Methods",

      paragraphs: [
        "HTTP defines methods that communicate the intended action for a request.",
        "REST APIs commonly use GET, POST, PUT, PATCH, and DELETE."
      ],

      code: {
        language: "text",
        code: `GET
    Retrieve a representation.

POST
    Submit data for processing or create a resource.

PUT
    Create or replace a resource at a known target URI.

PATCH
    Apply a partial modification.

DELETE
    Remove a resource.`
      },

      bullets: [
        "GET is used for retrieval.",
        "POST is commonly used for creation or submission.",
        "PUT is commonly used for replacement or idempotent update semantics.",
        "PATCH is commonly used for partial modification.",
        "DELETE is used for removal."
      ]
    },

    {
      id: "safe-idempotent",
      title: "Safe and Idempotent HTTP Methods",

      paragraphs: [
        "Safe and idempotent are important HTTP concepts that are frequently asked in backend interviews.",
        "A safe method is intended not to modify application state. An idempotent method has the same intended effect on the server when the same request is made multiple times, although the response itself can differ.",
        "GET is safe and idempotent. PUT and DELETE are idempotent by HTTP semantics but are not safe because they can change server state. POST is generally neither safe nor idempotent."
      ],

      code: {
        language: "text",
        code: `Method       Safe       Idempotent

GET          Yes        Yes

POST         No         No*

PUT          No         Yes

PATCH        No         Not guaranteed

DELETE       No         Yes

* POST is generally not idempotent.`
      },

      bullets: [
        "Safe means the method is intended for retrieval without changing application state.",
        "Idempotent means repeated identical requests have the same intended effect.",
        "GET is safe and idempotent.",
        "PUT is idempotent but not safe.",
        "DELETE is idempotent but not safe.",
        "POST is generally not idempotent."
      ]
    },

    {
      id: "http-stateless",
      title: "HTTP and Stateless Communication",

      paragraphs: [
        "HTTP itself is stateless at the protocol level. This means a request does not inherently depend on the server remembering the previous HTTP request.",
        "Applications can still implement state using cookies, sessions, databases, caches, tokens, or other mechanisms.",
        "Understanding this distinction is important when discussing REST API scalability."
      ],

      code: {
        language: "text",
        code: `Request 1
Client ----------------> Server


Request 2
Client ----------------> Server


Request 3
Client ----------------> Server

Each request contains the information
needed for the server to process it,
unless the application deliberately
uses additional state mechanisms.`
      },

      bullets: [
        "HTTP is stateless by protocol design.",
        "Applications can build stateful behavior using additional mechanisms.",
        "REST APIs commonly aim for stateless request processing.",
        "Stateless design can simplify horizontal scaling."
      ]
    },

    {
      id: "http-vs-https",
      title: "HTTP vs HTTPS",

      paragraphs: [
        "HTTP sends application data using the HTTP protocol. HTTPS means HTTP carried over a TLS-protected connection.",
        "HTTPS provides encryption in transit and helps protect data from being read or modified by attackers on the network.",
        "Production APIs should normally use HTTPS rather than plain HTTP."
      ],

      code: {
        language: "text",
        code: `HTTP

Client
  |
  | HTTP
  v
Server


HTTPS

Client
  |
  | HTTP over TLS
  | Encrypted connection
  v
Server`
      },

      bullets: [
        "HTTPS protects data in transit.",
        "TLS provides encryption and server authentication.",
        "HTTPS does not replace application authentication.",
        "HTTPS should be used for production APIs."
      ]
    },

    {
      id: "spring-http-flow",
      title: "HTTP Request Flow in Spring Boot",

      paragraphs: [
        "When an HTTP request reaches a Spring Boot application using Spring MVC, the embedded web server receives the request and passes it into Spring's web infrastructure.",
        "DispatcherServlet coordinates the request processing and finds the appropriate controller handler method."
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
DispatcherServlet
  |
  v
Handler Mapping
  |
  v
Controller Method
  |
  v
Service
  |
  v
Repository
  |
  v
Database
  |
  v
Controller Response
  |
  v
HTTP Response
  |
  v
Client`
      },

      bullets: [
        "Tomcat receives the network request.",
        "DispatcherServlet coordinates Spring MVC processing.",
        "Handler mapping identifies the appropriate controller method.",
        "Controller methods process the HTTP request.",
        "The service layer handles business logic.",
        "The repository handles persistence.",
        "The result is converted into an HTTP response."
      ]
    },

    {
      id: "http-example",
      title: "Complete HTTP Example",

      paragraphs: [
        "The following example combines the major HTTP concepts into one request and response."
      ],

      code: {
        language: "http",
        code: `POST /api/employees?notify=true HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json
Authorization: Bearer token

{
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}


HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}`
      },

      bullets: [
        "POST is the HTTP method.",
        "/api/employees is the path.",
        "notify=true is a query parameter.",
        "Host identifies the target host.",
        "Content-Type describes the request body.",
        "Accept describes the desired response representation.",
        "Authorization carries authentication credentials.",
        "The JSON object is the request body.",
        "201 Created indicates successful creation.",
        "The response JSON is the response body."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common HTTP Mistakes",

      paragraphs: [
        "Many REST API bugs are caused by misunderstanding basic HTTP concepts. Learning these mistakes early makes Spring Boot debugging much easier."
      ],

      bullets: [
        "Mistake 1: Confusing Content-Type with Accept.",
        "Mistake 2: Using GET for operations that modify data.",
        "Mistake 3: Sending JSON without the correct Content-Type.",
        "Mistake 4: Treating query parameters as part of the resource identity when they are actually filters.",
        "Mistake 5: Returning incorrect HTTP status codes.",
        "Mistake 6: Confusing 401 Unauthorized with 403 Forbidden.",
        "Mistake 7: Assuming HTTPS automatically authenticates users.",
        "Mistake 8: Logging Authorization headers or access tokens.",
        "Mistake 9: Assuming every HTTP request must contain a body.",
        "Mistake 10: Assuming every successful request must return 200.",
        "Mistake 11: Forgetting that a 204 response has no response body.",
        "Mistake 12: Treating HTTP as a database or business-logic layer."
      ]
    },

    {
      id: "debugging-http",
      title: "How to Debug an HTTP Request",

      paragraphs: [
        "When a Spring Boot REST API is not behaving as expected, inspect the HTTP request and response systematically instead of immediately changing controller code."
      ],

      code: {
        language: "text",
        code: `Step 1
Check HTTP method

Step 2
Check URL and port

Step 3
Check path variables

Step 4
Check query parameters

Step 5
Check request headers

Step 6
Check Content-Type

Step 7
Check request JSON

Step 8
Check response status code

Step 9
Check response body

Step 10
Check Spring Boot logs`
      },

      bullets: [
        "Verify the HTTP method.",
        "Verify the URL and port.",
        "Verify the request path.",
        "Verify query parameters.",
        "Verify Content-Type.",
        "Verify Authorization when security is enabled.",
        "Verify JSON syntax.",
        "Inspect the returned status code.",
        "Inspect the response body.",
        "Check server logs for exceptions."
      ]
    },

    {
      id: "interview",
      title: "HTTP Interview Questions",

      interviewQuestions: [
        {
          question: "What is HTTP?",
          answer:
            "HTTP is an application-layer protocol used for communication between clients and servers."
        },
        {
          question: "What is the HTTP request-response model?",
          answer:
            "The client sends an HTTP request to the server, and the server processes it and returns an HTTP response."
        },
        {
          question: "What are the main parts of an HTTP request?",
          answer:
            "An HTTP request contains a request line with the method and target, request headers, and an optional request body."
        },
        {
          question: "What are the main parts of an HTTP response?",
          answer:
            "An HTTP response contains a status line, response headers, and an optional response body."
        },
        {
          question: "What is an HTTP method?",
          answer:
            "An HTTP method indicates the intended operation or semantics of a request, such as retrieving, creating, updating, or deleting a resource."
        },
        {
          question: "What is the difference between GET and POST?",
          answer:
            "GET is primarily used to retrieve data and is safe and idempotent. POST is commonly used to submit data or create resources and is generally not idempotent."
        },
        {
          question: "What is a URL?",
          answer:
            "A URL identifies the location or target of a resource or service and can contain a scheme, host, port, path, and query parameters."
        },
        {
          question: "What is the difference between a path and a query parameter?",
          answer:
            "The path identifies the resource or route, while query parameters provide additional information such as filtering, searching, sorting, or pagination."
        },
        {
          question: "What are HTTP headers?",
          answer:
            "HTTP headers provide metadata about a request or response, such as content type, accepted representations, authorization information, caching information, and client information."
        },
        {
          question: "What is Content-Type?",
          answer:
            "Content-Type specifies the media type of the HTTP message body, such as application/json."
        },
        {
          question: "What is Accept?",
          answer:
            "Accept indicates which response media types the client can process or prefers."
        },
        {
          question: "What is the difference between Content-Type and Accept?",
          answer:
            "Content-Type describes the body being sent or returned, while Accept describes the response representation the client wants to receive."
        },
        {
          question: "What is an HTTP request body?",
          answer:
            "The request body contains data sent from the client to the server. POST and PUT requests commonly use request bodies."
        },
        {
          question: "What is an HTTP response body?",
          answer:
            "The response body contains data returned by the server when a response representation is applicable."
        },
        {
          question: "What does 200 OK mean?",
          answer:
            "200 OK indicates that the request was successfully processed."
        },
        {
          question: "What does 201 Created mean?",
          answer:
            "201 Created indicates that a new resource was successfully created."
        },
        {
          question: "What does 204 No Content mean?",
          answer:
            "204 No Content indicates that the request succeeded and there is no response body."
        },
        {
          question: "What does 400 Bad Request mean?",
          answer:
            "400 Bad Request indicates that the server could not process the request because the client request was invalid or malformed."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer:
            "401 indicates that authentication is required or failed, while 403 indicates that the request is understood but the authenticated client is not permitted to perform the operation."
        },
        {
          question: "What does 404 Not Found mean?",
          answer:
            "404 Not Found means that the requested resource could not be found."
        },
        {
          question: "What does 500 Internal Server Error mean?",
          answer:
            "500 Internal Server Error indicates an unexpected server-side failure."
        },
        {
          question: "What is JSON?",
          answer:
            "JSON is a text-based structured data format commonly used by REST APIs to represent request and response data."
        },
        {
          question: "What is serialization?",
          answer:
            "Serialization converts an in-memory Java object into a representation such as JSON for transmission."
        },
        {
          question: "What is deserialization?",
          answer:
            "Deserialization converts a representation such as JSON into a Java object."
        },
        {
          question: "How does Spring Boot handle JSON?",
          answer:
            "Spring Boot commonly uses Jackson through HTTP message converters to serialize Java objects into JSON and deserialize JSON request bodies into Java objects."
        },
        {
          question: "What is HTTPS?",
          answer:
            "HTTPS is HTTP carried over TLS, providing encryption and protection for data in transit."
        },
        {
          question: "Does HTTPS replace authentication?",
          answer:
            "No. HTTPS protects communication in transit, while application authentication determines who the caller is."
        },
        {
          question: "What does idempotent mean?",
          answer:
            "An idempotent HTTP method has the same intended effect on the server when the same request is made multiple times."
        },
        {
          question: "Which common HTTP methods are idempotent?",
          answer:
            "GET, PUT, and DELETE are generally idempotent according to HTTP semantics. POST is generally not idempotent, and PATCH is not guaranteed to be idempotent."
        },
        {
          question: "Which HTTP method is safe?",
          answer:
            "GET is a safe method. Safe methods are intended not to modify application state."
        },
        {
          question: "Can an HTTP response have no body?",
          answer:
            "Yes. For example, a 204 No Content response intentionally has no response body."
        },
        {
          question: "Can a GET request have a body?",
          answer:
            "HTTP does not universally prohibit a body on GET, but GET request bodies have no generally defined semantics and are not normally used for standard REST retrieval. Path and query parameters are preferred."
        },
        {
          question: "What is the role of HTTP in Spring Boot REST APIs?",
          answer:
            "HTTP provides the communication protocol through which clients call Spring Boot endpoints using methods, URLs, headers, bodies, and status codes."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based HTTP Questions",

      interviewQuestions: [
        {
          question:
            "A React frontend sends a POST request containing JSON to Spring Boot. What happens?",
          answer:
            "The HTTP request reaches the Spring Boot server, Spring MVC routes it to the matching controller method, @RequestBody reads the request body, an HTTP message converter such as Jackson deserializes the JSON into a Java object, the application processes the request, and Spring serializes the response into the configured representation."
        },
        {
          question:
            "A GET endpoint returns 404. What would you check?",
          answer:
            "I would verify the HTTP method, URL, port, class-level @RequestMapping, method-level mapping, path variables, custom context path, and whether the request is reaching the expected application instance."
        },
        {
          question:
            "A POST endpoint returns 415 Unsupported Media Type. What would you check?",
          answer:
            "I would check the Content-Type header, request body format, available HTTP message converters, and whether the controller expects a representation that matches the request content type."
        },
        {
          question:
            "A client sends JSON but Spring cannot convert it to the Java object. What would you check?",
          answer:
            "I would check JSON syntax, property names and Java fields, getters and setters or the configured object mapping strategy, Content-Type, Java data types, Jackson configuration, and the exception in the application logs."
        },
        {
          question:
            "Why should an API return 201 instead of 200 after creating a resource?",
          answer:
            "201 Created specifically communicates that the request resulted in the creation of a new resource. Although 200 can represent a successful response, 201 is more precise for successful creation."
        }
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "HTTP is the foundation of Spring Boot REST communication. Remember the request structure, response structure, URL components, headers, body, methods, and status codes."
      ],

      bullets: [
        "HTTP = Hypertext Transfer Protocol.",
        "HTTP uses a request-response model.",
        "Client sends request.",
        "Server sends response.",
        "Request contains method, target, headers, and optionally a body.",
        "Response contains status, headers, and optionally a body.",
        "URL can contain scheme, host, port, path, and query parameters.",
        "Path commonly identifies the resource or route.",
        "Query parameters commonly support filtering, sorting, searching, and pagination.",
        "Headers provide metadata.",
        "Content-Type describes the message body format.",
        "Accept describes the response representation the client can accept.",
        "Authorization commonly carries authentication credentials.",
        "JSON is widely used by REST APIs.",
        "Serialization converts Java objects to JSON.",
        "Deserialization converts JSON to Java objects.",
        "GET is safe and idempotent.",
        "POST is generally not idempotent.",
        "PUT is generally idempotent.",
        "DELETE is generally idempotent.",
        "200 = OK.",
        "201 = Created.",
        "204 = No Content.",
        "400 = Bad Request.",
        "401 = Unauthorized.",
        "403 = Forbidden.",
        "404 = Not Found.",
        "409 = Conflict.",
        "500 = Internal Server Error.",
        "HTTPS is HTTP over TLS.",
        "Spring Boot commonly uses Jackson for JSON conversion.",
        "Spring MVC uses DispatcherServlet to coordinate request processing."
      ]
    }
  ]
};
