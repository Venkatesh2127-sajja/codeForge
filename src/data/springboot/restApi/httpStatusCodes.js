export const httpStatusCodes = {
  id: "http-status-codes",
  title: "HTTP Status Codes",
  slug: "http-status-codes",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Learn HTTP status code categories, important 2xx, 3xx, 4xx, and 5xx status codes, REST API usage, Spring Boot ResponseEntity examples, error handling, and interview questions.",

  sections: [
    {
      id: "what-are-status-codes",
      title: "What are HTTP Status Codes?",

      paragraphs: [
        "An HTTP status code tells the client the result of processing an HTTP request.",
        "The server includes the status code in the HTTP response so that the client can understand whether the request succeeded, failed, was redirected, or requires another action.",
        "Status codes are grouped into five categories based on their first digit.",
        "For example, 200 means successful processing, 404 means the requested resource was not found, and 500 indicates an unexpected server-side failure.",
        "The status code is different from the response body. The status code communicates the general result, while the response body can contain additional information such as data or an error message."
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
        "HTTP status codes are part of the HTTP response.",
        "The first digit identifies the status-code category.",
        "2xx generally means success.",
        "3xx generally means redirection.",
        "4xx generally means a client-side request problem.",
        "5xx generally means a server-side failure.",
        "The status code and response body serve different purposes."
      ]
    },

    {
      id: "categories",
      title: "HTTP Status Code Categories",

      paragraphs: [
        "HTTP status codes are divided into five major categories.",
        "You can understand the general meaning of a status code by looking at its first digit."
      ],

      code: {
        language: "text",
        code: `1xx → Informational

2xx → Success

3xx → Redirection

4xx → Client Error

5xx → Server Error`
      },

      bullets: [
        "1xx → informational responses.",
        "2xx → successful responses.",
        "3xx → redirection responses.",
        "4xx → client error responses.",
        "5xx → server error responses."
      ]
    },

    {
      id: "informational",
      title: "1xx Informational Codes",

      paragraphs: [
        "1xx status codes are informational responses. They indicate that the request has been received and the server is continuing to process it.",
        "Application developers encounter 1xx responses less frequently than 2xx, 4xx, and 5xx responses."
      ],

      code: {
        language: "text",
        code: `100 Continue
101 Switching Protocols
102 Processing`
      },

      bullets: [
        "100 Continue indicates that the initial part of a request has been received and the client can continue.",
        "101 Switching Protocols indicates that the server agrees to switch protocols as requested.",
        "1xx responses are generally intermediate rather than final application results."
      ]
    },

    {
      id: "success",
      title: "2xx Success Codes",

      paragraphs: [
        "2xx status codes indicate that the request was successfully received, understood, and processed.",
        "REST APIs commonly use 200 OK, 201 Created, and 204 No Content."
      ],

      code: {
        language: "text",
        code: `200 OK
201 Created
202 Accepted
204 No Content`
      },

      bullets: [
        "200 indicates successful processing.",
        "201 indicates that a resource was created.",
        "202 indicates that the request has been accepted for processing but processing may not be complete.",
        "204 indicates successful processing with no response content."
      ]
    },

    {
      id: "200-ok",
      title: "200 OK",

      paragraphs: [
        "200 OK indicates that the request was successfully processed.",
        "It is commonly used for successful GET requests and can also be used for successful updates or operations that return a response body."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/101

HTTP/1.1 200 OK

Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com"
}`
      },

      bullets: [
        "GET requests commonly return 200 when the resource is found.",
        "PUT or PATCH can also return 200 when a response body is returned.",
        "200 means successful processing, not specifically resource creation."
      ]
    },

    {
      id: "201-created",
      title: "201 Created",

      paragraphs: [
        "201 Created is commonly returned when a request successfully creates a new resource.",
        "The response can contain the created resource, and the Location header can be used to identify the newly created resource."
      ],

      code: {
        language: "http",
        code: `POST /api/employees

HTTP/1.1 201 Created

Location: /api/employees/101

Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com"
}`
      },

      bullets: [
        "201 is commonly used after successful resource creation.",
        "The Location header can identify the created resource.",
        "The response body may contain the created resource."
      ]
    },

    {
      id: "204-no-content",
      title: "204 No Content",

      paragraphs: [
        "204 No Content indicates that the request was successfully processed but the server has no response content to return.",
        "It is commonly used for successful DELETE operations and can also be used for updates when the API does not need to return a response body."
      ],

      code: {
        language: "http",
        code: `DELETE /api/employees/101

HTTP/1.1 204 No Content`
      },

      bullets: [
        "204 means successful processing without response content.",
        "DELETE commonly uses 204.",
        "PUT and PATCH can also use 204 when no response body is required."
      ]
    },

    {
      id: "client-errors",
      title: "4xx Client Error Codes",

      paragraphs: [
        "4xx status codes indicate that the request cannot be successfully processed because of something related to the request or the client's authorization.",
        "The exact cause should normally be communicated through a consistent error response body."
      ],

      code: {
        language: "text",
        code: `400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
409 Conflict
422 Unprocessable Content`
      },

      bullets: [
        "400 → request is invalid or cannot be processed as sent.",
        "401 → authentication is required or has failed.",
        "403 → the server understood the request but refuses access.",
        "404 → requested resource was not found.",
        "405 → the HTTP method is not allowed for the target resource.",
        "409 → request conflicts with the current state of the resource.",
        "422 → request is syntactically valid but cannot be processed because of semantic validation or business rules."
      ]
    },

    {
      id: "400-bad-request",
      title: "400 Bad Request",

      paragraphs: [
        "400 Bad Request indicates that the server cannot process the request as sent.",
        "It is commonly used when the request is malformed, contains invalid parameters, or violates the API's expected request format."
      ],

      code: {
        language: "http",
        code: `POST /api/employees

Content-Type: application/json

{
  "name": "Rahul"
}`
      },

      bullets: [
        "Malformed JSON can result in 400.",
        "Invalid request parameters can result in 400.",
        "The exact validation behavior depends on the API implementation.",
        "The response should provide a useful error message without exposing sensitive information."
      ]
    },

    {
      id: "401-unauthorized",
      title: "401 Unauthorized",

      paragraphs: [
        "401 Unauthorized indicates that authentication is required or that the authentication credentials supplied with the request are invalid.",
        "Despite the name, 401 is primarily an authentication-related response.",
        "For a bearer-token API, an invalid or missing access token can result in 401."
      ],

      code: {
        language: "http",
        code: `GET /api/profile

Authorization: Bearer invalid-token

HTTP/1.1 401 Unauthorized`
      },

      bullets: [
        "401 is commonly associated with missing or invalid authentication.",
        "A valid authentication mechanism should be used to access protected endpoints.",
        "Do not expose sensitive authentication details in the error response."
      ]
    },

    {
      id: "403-forbidden",
      title: "403 Forbidden",

      paragraphs: [
        "403 Forbidden indicates that the server understood the request but refuses to authorize the requested action.",
        "A typical example is an authenticated user attempting to access an administrator-only endpoint."
      ],

      code: {
        language: "http",
        code: `DELETE /api/admin/users/101

Authorization: Bearer valid-user-token

HTTP/1.1 403 Forbidden`
      },

      bullets: [
        "403 is primarily an authorization-related response.",
        "The request may be authenticated but the user may not have sufficient permissions.",
        "For example, a normal user may be prevented from accessing an admin-only operation."
      ]
    },

    {
      id: "401-vs-403",
      title: "401 vs 403",

      paragraphs: [
        "The difference between 401 and 403 is one of the most common REST API interview questions.",
        "401 is related to authentication, while 403 indicates that access is forbidden."
      ],

      code: {
        language: "text",
        code: `401 Unauthorized

Question:
"Who are you?"

Typical situation:
No valid authentication credentials.


403 Forbidden

Question:
"You are authenticated, but are you allowed to do this?"

Typical situation:
User is authenticated but lacks permission.`
      },

      bullets: [
        "401 → authentication is missing or invalid.",
        "403 → access is forbidden.",
        "Authentication answers who the caller is.",
        "Authorization answers what the caller is allowed to do."
      ]
    },

    {
      id: "404-not-found",
      title: "404 Not Found",

      paragraphs: [
        "404 Not Found indicates that the requested resource could not be found.",
        "For example, if the client requests employee 999 and no employee with that ID exists, the API can return 404."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/999

HTTP/1.1 404 Not Found

Content-Type: application/json

{
  "status": 404,
  "message": "Employee not found"
}`
      },

      bullets: [
        "404 is commonly returned when a requested resource does not exist.",
        "It can be used for resource lookup failures.",
        "The error response should be consistent across the API."
      ]
    },

    {
      id: "409-conflict",
      title: "409 Conflict",

      paragraphs: [
        "409 Conflict indicates that the request conflicts with the current state of the target resource.",
        "A common example is trying to create a user with an email address that must be unique but is already registered."
      ],

      code: {
        language: "http",
        code: `POST /api/users

{
  "name": "Rahul",
  "email": "existing@example.com"
}

HTTP/1.1 409 Conflict

{
  "message": "Email already exists"
}`
      },

      bullets: [
        "409 is useful for state conflicts.",
        "Duplicate unique business data can result in 409.",
        "Concurrency or resource-state conflicts can also result in 409."
      ]
    },

    {
      id: "422-unprocessable-content",
      title: "422 Unprocessable Content",

      paragraphs: [
        "422 Unprocessable Content is commonly used when the request is syntactically valid but the submitted data cannot be processed because of semantic validation or business rules.",
        "For example, the JSON may be valid, but a field may contain a value that violates a domain rule."
      ],

      code: {
        language: "http",
        code: `POST /api/orders

{
  "quantity": -5
}

HTTP/1.1 422 Unprocessable Content

{
  "message": "Quantity must be greater than zero"
}`
      },

      bullets: [
        "The request can be syntactically valid.",
        "The data may still violate application or domain rules.",
        "APIs may use 400 instead depending on their error-handling convention.",
        "Consistency within the API is important."
      ]
    },

    {
      id: "redirection",
      title: "3xx Redirection Codes",

      paragraphs: [
        "3xx status codes indicate that the client needs to take additional action to complete the request, commonly by following a redirect or using a cached representation.",
        "Redirection is especially common in browser-based applications and web infrastructure."
      ],

      code: {
        language: "text",
        code: `301 Moved Permanently
302 Found
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect`
      },

      bullets: [
        "301 indicates a permanent redirect.",
        "302 indicates a temporary redirect.",
        "304 indicates that a cached representation can be used because the resource has not been modified.",
        "307 indicates a temporary redirect while preserving the request method.",
        "308 indicates a permanent redirect while preserving the request method."
      ]
    },

    {
      id: "server-errors",
      title: "5xx Server Error Codes",

      paragraphs: [
        "5xx status codes indicate that the server or an upstream component failed to successfully process a valid request.",
        "These errors generally require investigation on the server or infrastructure side rather than asking the client to correct the request."
      ],

      code: {
        language: "text",
        code: `500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout`
      },

      bullets: [
        "500 indicates an unexpected server-side failure.",
        "502 commonly indicates an invalid response from an upstream server or gateway.",
        "503 indicates that the service is temporarily unavailable.",
        "504 indicates that a gateway or proxy did not receive a timely response from an upstream server."
      ]
    },

    {
      id: "500-internal-server-error",
      title: "500 Internal Server Error",

      paragraphs: [
        "500 Internal Server Error is a generic server-side failure response.",
        "It can occur because of an unexpected exception, database failure, configuration problem, or another unhandled server-side condition.",
        "Production APIs should avoid exposing stack traces, database details, or internal implementation information to clients."
      ],

      code: {
        language: "http",
        code: `GET /api/employees/101

HTTP/1.1 500 Internal Server Error

{
  "status": 500,
  "message": "Internal server error"
}`
      },

      bullets: [
        "500 should represent an unexpected server-side failure.",
        "Log the actual exception on the server.",
        "Return a safe error message to the client.",
        "Do not expose stack traces or secrets in API responses."
      ]
    },

    {
      id: "502-503-504",
      title: "502, 503, and 504",

      paragraphs: [
        "These status codes are particularly important in applications deployed behind gateways, reverse proxies, load balancers, or other upstream services."
      ],

      code: {
        language: "text",
        code: `502 Bad Gateway

Gateway received an invalid response
from an upstream server.


503 Service Unavailable

Service is temporarily unable to handle
the request.


504 Gateway Timeout

Gateway did not receive a timely response
from an upstream server.`
      },

      bullets: [
        "502 often points to an upstream communication problem.",
        "503 commonly represents temporary unavailability.",
        "504 commonly represents an upstream timeout.",
        "These errors may involve infrastructure rather than application code alone."
      ]
    },

    {
      id: "spring-example",
      title: "Status Codes in Spring Boot",

      paragraphs: [
        "Spring Boot controllers can use ResponseEntity to explicitly control the HTTP status and response body.",
        "This is useful when an endpoint needs to return different status codes depending on the result of an operation."
      ],

      code: {
        language: "java",
        code: `return ResponseEntity
    .status(HttpStatus.CREATED)
    .body(employee);`
      },

      bullets: [
        "ResponseEntity allows explicit control over the response.",
        "HttpStatus.CREATED represents 201 Created.",
        "The response body can contain the created resource.",
        "Different outcomes can return different HTTP statuses."
      ]
    },

    {
      id: "spring-status-examples",
      title: "Common Spring Boot Status Code Examples",

      code: {
        language: "java",
        code: `// 200 OK
return ResponseEntity.ok(employee);


// 201 Created
return ResponseEntity
    .status(HttpStatus.CREATED)
    .body(employee);


// 204 No Content
return ResponseEntity
    .noContent()
    .build();


// 404 Not Found
return ResponseEntity
    .notFound()
    .build();


// 409 Conflict
return ResponseEntity
    .status(HttpStatus.CONFLICT)
    .build();`
      },

      paragraphs: [
        "These are common ResponseEntity patterns. In a production application, error responses should usually contain a consistent error structure rather than an empty response."
      ]
    },

    {
      id: "api-flow",
      title: "Example API Flow",

      paragraphs: [
        "The status code is selected based on the result of the operation."
      ],

      code: {
        language: "text",
        code: `POST /api/employees
        ↓
Validate request
        ↓
Employee created
        ↓
201 Created


GET /api/employees/101
        ↓
Search database
        ↓
Employee found
        ↓
200 OK


GET /api/employees/999
        ↓
Search database
        ↓
Employee not found
        ↓
404 Not Found


POST /api/employees
        ↓
Email already exists
        ↓
409 Conflict


GET /api/admin/report
        ↓
Authentication valid
        ↓
User lacks permission
        ↓
403 Forbidden


GET /api/employees
        ↓
Unexpected database/server failure
        ↓
500 Internal Server Error`
      },

      bullets: [
        "The status code should represent the actual result.",
        "Successful operations use 2xx codes.",
        "Missing resources commonly use 404.",
        "Authentication problems commonly use 401.",
        "Authorization problems commonly use 403.",
        "State conflicts commonly use 409.",
        "Unexpected server failures commonly use 500."
      ]
    },

    {
      id: "error-response",
      title: "Designing a Consistent Error Response",

      paragraphs: [
        "A REST API should return a consistent structure for errors so that frontend applications and other clients can process failures predictably.",
        "The exact structure is an API design decision, but common fields include status, message, timestamp, path, and validation details."
      ],

      code: {
        language: "json",
        code: `{
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found",
  "path": "/api/employees/999"
}`
      },

      bullets: [
        "Keep error responses consistent.",
        "Provide a useful client-facing message.",
        "Do not expose stack traces.",
        "Do not expose database credentials or internal infrastructure details.",
        "Validation errors can include field-level details."
      ]
    },

    {
      id: "validation-status",
      title: "Validation Errors and Status Codes",

      paragraphs: [
        "When an API receives invalid input, the API should return a status code that communicates that the request cannot be processed.",
        "Many APIs use 400 Bad Request for validation failures, while some use 422 Unprocessable Content for semantically invalid data.",
        "The most important rule is to define and consistently apply the API's chosen convention."
      ],

      code: {
        language: "json",
        code: `{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email must be valid",
    "name": "Name is required"
  }
}`
      },

      bullets: [
        "Validation errors should be understandable to API clients.",
        "Field-level validation details are useful for frontend applications.",
        "Use one consistent convention for validation status codes.",
        "Never return a successful 2xx status for a failed validation request."
      ]
    },

    {
      id: "choosing-status-code",
      title: "How to Choose the Correct Status Code",

      paragraphs: [
        "Choosing a status code becomes easier when you first identify the outcome of the request."
      ],

      code: {
        language: "text",
        code: `Was the request successful?

Yes
 |
 +-- Resource created?
 |       |
 |       +-- Yes -> 201 Created
 |
 +-- No response body needed?
 |       |
 |       +-- Yes -> 204 No Content
 |
 +-- Otherwise -> 200 OK


Was there a request/client problem?

 |
 +-- Invalid request -> 400
 |
 +-- Authentication missing/invalid -> 401
 |
 +-- Access forbidden -> 403
 |
 +-- Resource missing -> 404
 |
 +-- State conflict -> 409
 |
 +-- Semantic validation failure -> 422


Was there a server/upstream problem?

 |
 +-- Unexpected server failure -> 500
 |
 +-- Upstream invalid response -> 502
 |
 +-- Service unavailable -> 503
 |
 +-- Upstream timeout -> 504`
      },

      bullets: [
        "Start by determining whether the operation succeeded.",
        "For successful operations, choose the most appropriate 2xx response.",
        "For request or authorization problems, consider the appropriate 4xx status.",
        "For server or upstream failures, consider the appropriate 5xx status.",
        "Do not select status codes randomly."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common HTTP Status Code Mistakes",

      paragraphs: [
        "Using the wrong status code makes an API harder to understand and can cause clients to handle failures incorrectly."
      ],

      bullets: [
        "Mistake 1: Returning 200 OK for every possible result.",
        "Mistake 2: Returning 500 when the client simply requested a resource that does not exist.",
        "Mistake 3: Confusing 401 authentication failure with 403 authorization failure.",
        "Mistake 4: Returning 404 when the actual problem is a server exception.",
        "Mistake 5: Returning 201 for an operation that did not create a resource.",
        "Mistake 6: Returning a response body with 204 No Content.",
        "Mistake 7: Exposing Java stack traces in a 500 response.",
        "Mistake 8: Returning database exception messages directly to clients.",
        "Mistake 9: Using different error formats in different controllers.",
        "Mistake 10: Ignoring 409 for business-state conflicts."
      ]
    },

    {
      id: "testing",
      title: "Testing Status Codes with Postman",

      paragraphs: [
        "When testing an API in Postman, do not check only the response body. Always check the HTTP status code as well.",
        "A successful response body does not necessarily mean the API is following good REST semantics."
      ],

      code: {
        language: "text",
        code: `Test 1

POST /api/employees

Expected:
201 Created


Test 2

GET /api/employees/101

Expected:
200 OK


Test 3

GET /api/employees/999

Expected:
404 Not Found


Test 4

DELETE /api/employees/101

Expected:
204 No Content


Test 5

Create employee with duplicate email

Expected:
409 Conflict


Test 6

Access protected endpoint without valid authentication

Expected:
401 Unauthorized`
      },

      bullets: [
        "Check the status code.",
        "Check the response body.",
        "Check response headers when relevant.",
        "Test successful cases.",
        "Test invalid input.",
        "Test missing resources.",
        "Test authentication and authorization failures.",
        "Test duplicate or conflicting data."
      ]
    },

    {
      id: "interview",
      title: "Status Code Interview Questions",

      interviewQuestions: [
        {
          question: "What does 200 mean?",
          answer:
            "200 OK indicates that the request was successfully processed."
        },
        {
          question: "When should 201 be used?",
          answer:
            "201 Created is commonly returned after successfully creating a new resource."
        },
        {
          question: "When should 204 be used?",
          answer:
            "204 No Content is used when the request succeeds but the server has no response content to return. It is commonly used for DELETE operations."
        },
        {
          question: "What is the difference between 200 and 201?",
          answer:
            "200 indicates successful processing, while 201 specifically indicates that a resource was created."
        },
        {
          question: "What is the difference between 200 and 204?",
          answer:
            "Both indicate successful processing, but 204 indicates that the response has no content."
        },
        {
          question: "What does 400 mean?",
          answer:
            "400 Bad Request indicates that the server cannot process the request as sent, such as when the request is malformed or invalid."
        },
        {
          question: "What does 401 mean?",
          answer:
            "401 Unauthorized indicates that authentication is required or the supplied authentication credentials are invalid."
        },
        {
          question: "What does 403 mean?",
          answer:
            "403 Forbidden indicates that the server understood the request but refuses to authorize the requested action."
        },
        {
          question: "401 vs 403?",
          answer:
            "401 is primarily related to authentication, while 403 indicates that access is forbidden."
        },
        {
          question: "When do you return 404?",
          answer:
            "404 is commonly used when the requested resource cannot be found."
        },
        {
          question: "What does 409 mean?",
          answer:
            "409 Conflict indicates that the request conflicts with the current state of the target resource, such as a duplicate unique value."
        },
        {
          question: "What does 422 mean?",
          answer:
            "422 Unprocessable Content can be used when the request is syntactically valid but cannot be processed because of semantic validation or business rules."
        },
        {
          question: "What does 500 mean?",
          answer:
            "500 Internal Server Error indicates an unexpected server-side failure."
        },
        {
          question: "What is 502 Bad Gateway?",
          answer:
            "502 commonly indicates that a gateway or proxy received an invalid response from an upstream server."
        },
        {
          question: "What is 503 Service Unavailable?",
          answer:
            "503 indicates that the service is temporarily unable to handle the request."
        },
        {
          question: "What is 504 Gateway Timeout?",
          answer:
            "504 indicates that a gateway or proxy did not receive a timely response from an upstream server."
        },
        {
          question: "What are the five HTTP status-code categories?",
          answer:
            "1xx is informational, 2xx is success, 3xx is redirection, 4xx is client error, and 5xx is server error."
        },
        {
          question: "Which status code is commonly used after creating a resource?",
          answer: "201 Created."
        },
        {
          question:
            "Which status code is commonly used when a resource is not found?",
          answer: "404 Not Found."
        },
        {
          question:
            "Which status code is commonly used for a successful DELETE with no response body?",
          answer: "204 No Content."
        },
        {
          question:
            "Can Spring Boot return different status codes from the same endpoint?",
          answer:
            "Yes. A controller can inspect the operation result and use ResponseEntity or exception handling to return an appropriate HTTP status."
        },
        {
          question: "How do you return 201 Created in Spring Boot?",
          answer:
            "You can use ResponseEntity.status(HttpStatus.CREATED).body(resource) or another appropriate Spring MVC response mechanism."
        },
        {
          question: "Why should an API not return 500 for validation errors?",
          answer:
            "Validation errors are generally caused by the request rather than an unexpected server failure, so a suitable 4xx response is more appropriate."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "A client requests GET /api/employees/101 and employee 101 exists. Which status code should you normally return?",
          answer:
            "200 OK, usually with the employee representation in the response body."
        },
        {
          question:
            "A client requests GET /api/employees/999 and the employee does not exist. What should you return?",
          answer:
            "404 Not Found is commonly appropriate because the requested resource does not exist."
        },
        {
          question:
            "A POST request successfully creates an employee. Which status code should you normally use?",
          answer: "201 Created is commonly appropriate."
        },
        {
          question:
            "A DELETE request successfully removes an employee and there is no response body. Which status code is appropriate?",
          answer: "204 No Content is commonly appropriate."
        },
        {
          question:
            "A user is authenticated but tries to access an administrator-only endpoint. Which status code should you consider?",
          answer:
            "403 Forbidden is commonly appropriate because the user is authenticated but is not authorized for that operation."
        },
        {
          question:
            "A request contains an invalid or missing authentication token. Which status code should you consider?",
          answer: "401 Unauthorized is commonly appropriate."
        },
        {
          question:
            "A user tries to register with an email that already exists and the email must be unique. Which status code could you use?",
          answer:
            "409 Conflict is commonly appropriate because the request conflicts with the current state of the resource."
        },
        {
          question:
            "The application throws an unexpected NullPointerException. Which status code should normally reach the client?",
          answer:
            "500 Internal Server Error, while the actual exception should be logged securely on the server."
        },
        {
          question:
            "An API gateway cannot get a valid response from the backend service. Which status code might the gateway return?",
          answer:
            "502 Bad Gateway may be appropriate when the gateway receives an invalid response from the upstream service."
        },
        {
          question:
            "A backend service is temporarily unavailable because it is overloaded or undergoing maintenance. Which status code could be used?",
          answer:
            "503 Service Unavailable can indicate temporary service unavailability."
        }
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "For interviews, remember the status-code categories first, then the most common REST API codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, and 500."
      ],

      bullets: [
        "1xx → informational.",
        "2xx → success.",
        "3xx → redirection.",
        "4xx → client/request/authentication/authorization problems.",
        "5xx → server or upstream problems.",
        "200 → OK.",
        "201 → Created.",
        "202 → Accepted.",
        "204 → No Content.",
        "301 → Moved Permanently.",
        "302 → Found.",
        "304 → Not Modified.",
        "400 → Bad Request.",
        "401 → Authentication required or failed.",
        "403 → Forbidden.",
        "404 → Not Found.",
        "405 → Method Not Allowed.",
        "409 → Conflict.",
        "422 → Unprocessable Content.",
        "500 → Internal Server Error.",
        "502 → Bad Gateway.",
        "503 → Service Unavailable.",
        "504 → Gateway Timeout.",
        "Use ResponseEntity when you need explicit control over the HTTP response.",
        "Do not expose stack traces or internal server details to API clients.",
        "Keep error response structures consistent.",
        "Use status codes to communicate the result clearly."
      ]
    }
  ]
};