
export const httpMethods = {
  id: "http-methods",
  title: "HTTP Methods",
  slug: "http-methods",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Learn GET, POST, PUT, PATCH, and DELETE HTTP methods and understand how they are commonly used in REST APIs, including request flow, CRUD mapping, status codes, safety, idempotency, and Spring Boot usage.",

  sections: [
    {
      id: "http-method-overview",
      title: "What are HTTP Methods?",

      paragraphs: [
        "HTTP methods describe the intended action of an HTTP request.",
        "A client uses an HTTP method to tell the server what it wants to do with a resource.",
        "REST APIs commonly use GET, POST, PUT, PATCH, and DELETE.",
        "Choosing the correct HTTP method makes an API predictable and allows clients, developers, proxies, caches, and infrastructure to understand the intended operation.",
        "The HTTP method is different from the URL. The URL identifies the target resource or route, while the method describes the intended operation."
      ],

      code: {
        language: "text",
        code: `Resource:

/api/employees


GET
    Retrieve employees

POST
    Create an employee


Resource:

/api/employees/101


GET
    Retrieve employee 101

PUT
    Replace/update employee 101

PATCH
    Partially modify employee 101

DELETE
    Delete employee 101`
      },

      bullets: [
        "GET → retrieve.",
        "POST → create or submit.",
        "PUT → replace a resource representation.",
        "PATCH → partially modify a resource.",
        "DELETE → remove a resource.",
        "HTTP methods provide standardized semantics.",
        "The same URL can be used with different HTTP methods for different operations."
      ]
    },

    {
      id: "crud-mapping",
      title: "HTTP Methods and CRUD",

      paragraphs: [
        "HTTP methods map naturally to common CRUD operations in REST APIs.",
        "CRUD stands for Create, Read, Update, and Delete.",
        "This mapping is a useful starting point when designing a basic REST API."
      ],

      code: {
        language: "text",
        code: `CRUD Operation       HTTP Method       Example

Create               POST              /api/employees

Read all             GET               /api/employees

Read one             GET               /api/employees/101

Update/replace       PUT               /api/employees/101

Partial update       PATCH             /api/employees/101

Delete               DELETE            /api/employees/101`
      },

      bullets: [
        "Create commonly uses POST.",
        "Read commonly uses GET.",
        "Full replacement commonly uses PUT.",
        "Partial modification commonly uses PATCH.",
        "Delete commonly uses DELETE."
      ]
    },

    {
      id: "get",
      title: "GET",

      paragraphs: [
        "GET is commonly used to retrieve a resource or collection of resources.",
        "A GET request should be safe, meaning its intended semantics do not modify application state.",
        "GET is also idempotent according to HTTP semantics, meaning repeating the same request has the same intended effect on server state.",
        "GET requests commonly use path variables and query parameters to specify which data should be retrieved or how the collection should be filtered."
      ],

      code: {
        language: "http",
        code: `GET /api/employees

GET /api/employees/101

GET /api/employees?department=Engineering

GET /api/employees?page=0&size=10`
      },

      bullets: [
        "GET is primarily used for retrieval.",
        "GET should not be used to create, update, or delete resources.",
        "GET is safe.",
        "GET is idempotent.",
        "GET commonly uses path variables and query parameters.",
        "GET responses commonly use 200 OK when successful."
      ]
    },

    {
      id: "get-spring-boot",
      title: "GET in Spring Boot",

      paragraphs: [
        "In Spring Boot, @GetMapping maps an HTTP GET request to a controller method.",
        "The controller can return a Java object or collection, which Spring can serialize into JSON."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.getEmployee(id);
    }
}`
      },

      bullets: [
        "@GetMapping handles GET requests.",
        "@PathVariable reads values from the URL path.",
        "The service layer should normally contain business logic.",
        "The returned Java object can be serialized to JSON."
      ]
    },

    {
      id: "post",
      title: "POST",

      paragraphs: [
        "POST is commonly used to submit data to create a new resource or trigger a server-side operation.",
        "A POST request commonly contains data in the request body.",
        "POST is generally not idempotent. Sending the same creation request multiple times may create multiple resources.",
        "When a POST request successfully creates a resource, 201 Created is commonly used."
      ],

      code: {
        language: "http",
        code: `POST /api/employees

Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}`
      },

      bullets: [
        "POST commonly creates resources.",
        "POST commonly sends data in the request body.",
        "POST is not safe.",
        "POST is generally not idempotent.",
        "201 Created is commonly used after successful creation."
      ]
    },

    {
      id: "post-spring-boot",
      title: "POST in Spring Boot",

      paragraphs: [
        "In Spring Boot, @PostMapping maps an HTTP POST request to a controller method.",
        "@RequestBody can be used to deserialize JSON from the request body into a Java object."
      ],

      code: {
        language: "java",
        code: `@PostMapping
public ResponseEntity<Employee> createEmployee(
        @RequestBody Employee employee
) {

    Employee savedEmployee =
            employeeService.createEmployee(employee);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedEmployee);
}`
      },

      bullets: [
        "@PostMapping handles POST requests.",
        "@RequestBody reads the request body.",
        "The service performs the application operation.",
        "ResponseEntity can return 201 Created.",
        "Request validation should normally be added."
      ]
    },

    {
      id: "put",
      title: "PUT",

      paragraphs: [
        "PUT is commonly used to replace the representation of an existing resource.",
        "The client normally identifies the target resource through the URL and sends the desired representation in the request body.",
        "PUT is idempotent according to HTTP semantics. Repeating the same PUT request should have the same intended effect on the target resource."
      ],

      code: {
        language: "http",
        code: `PUT /api/employees/101

Content-Type: application/json

{
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "department": "Platform"
}`
      },

      bullets: [
        "PUT commonly targets a known resource.",
        "The resource identifier is commonly part of the URL.",
        "The request body commonly contains the desired representation.",
        "PUT is idempotent.",
        "PUT is not safe because it can modify server state."
      ]
    },

    {
      id: "put-spring-boot",
      title: "PUT in Spring Boot",

      paragraphs: [
        "Spring Boot uses @PutMapping to map PUT requests.",
        "The ID can be read using @PathVariable and the updated representation can be read using @RequestBody."
      ],

      code: {
        language: "java",
        code: `@PutMapping("/{id}")
public ResponseEntity<Employee> updateEmployee(
        @PathVariable Long id,
        @RequestBody Employee employee
) {

    Employee updated =
            employeeService.updateEmployee(id, employee);

    return ResponseEntity.ok(updated);
}`
      },

      bullets: [
        "@PutMapping handles PUT requests.",
        "@PathVariable identifies the target resource.",
        "@RequestBody contains the new representation.",
        "The service should normally perform the update logic.",
        "A missing resource commonly results in 404 Not Found."
      ]
    },

    {
      id: "patch",
      title: "PATCH",

      paragraphs: [
        "PATCH is commonly used to partially modify an existing resource.",
        "Unlike PUT, a PATCH request can contain only the fields that need to change.",
        "PATCH is useful when sending the complete resource representation would be unnecessary."
      ],

      code: {
        language: "http",
        code: `PATCH /api/employees/101

Content-Type: application/json

{
  "email": "new@example.com"
}`
      },

      bullets: [
        "PATCH is commonly used for partial modification.",
        "Only fields that need to change may be supplied.",
        "PATCH is not guaranteed to be idempotent by HTTP semantics.",
        "The server must define how the partial update is interpreted.",
        "Validation rules still apply to PATCH requests."
      ]
    },

    {
      id: "patch-spring-boot",
      title: "PATCH in Spring Boot",

      paragraphs: [
        "Spring MVC does not require a separate annotation named @PatchMapping. Spring provides @PatchMapping specifically for PATCH requests.",
        "A PATCH endpoint can receive a partial update DTO and apply only the supplied fields."
      ],

      code: {
        language: "java",
        code: `@PatchMapping("/{id}")
public ResponseEntity<Employee> updateEmail(
        @PathVariable Long id,
        @RequestBody EmployeePatchRequest request
) {

    Employee employee =
            employeeService.updateEmail(
                    id,
                    request.getEmail()
            );

    return ResponseEntity.ok(employee);
}`
      },

      bullets: [
        "@PatchMapping handles PATCH requests.",
        "PATCH commonly uses a dedicated partial-update DTO.",
        "Only supplied fields should normally be changed.",
        "The service layer should apply the update rules."
      ]
    },

    {
      id: "put-vs-patch",
      title: "PUT vs PATCH",

      paragraphs: [
        "PUT and PATCH are both associated with updates, but they have different intended semantics.",
        "PUT is commonly used when the client sends the representation that should replace the current representation.",
        "PATCH is commonly used when the client wants to modify only selected parts of a resource."
      ],

      code: {
        language: "text",
        code: `Current employee:

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "Engineering"
}


PUT

PUT /api/employees/101

{
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com",
  "department": "Platform"
}

Meaning:
Replace/update the representation.


PATCH

PATCH /api/employees/101

{
  "email": "new@example.com"
}

Meaning:
Modify only the email field.`
      },

      bullets: [
        "PUT commonly represents replacement.",
        "PATCH commonly represents partial modification.",
        "PUT generally sends the desired complete representation.",
        "PATCH can send only fields that need to change.",
        "PATCH is useful when partial updates are common.",
        "The exact update semantics should be clearly documented by the API."
      ]
    },

    {
      id: "delete",
      title: "DELETE",

      paragraphs: [
        "DELETE is commonly used to remove a resource.",
        "The resource to delete is commonly identified by a path variable.",
        "A successful DELETE operation can return 204 No Content when there is no response body."
      ],

      code: {
        language: "http",
        code: `DELETE /api/employees/101`
      },

      output: `HTTP/1.1 204 No Content`,

      bullets: [
        "DELETE removes a resource.",
        "DELETE is not safe because it changes server state.",
        "DELETE is idempotent according to HTTP semantics.",
        "204 No Content is commonly used after successful deletion.",
        "404 Not Found may be returned when the target resource does not exist."
      ]
    },

    {
      id: "delete-spring-boot",
      title: "DELETE in Spring Boot",

      paragraphs: [
        "Spring Boot uses @DeleteMapping to map DELETE requests.",
        "The controller can delegate deletion to the service layer and return an appropriate HTTP status."
      ],

      code: {
        language: "java",
        code: `@DeleteMapping("/{id}")
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
        "@DeleteMapping handles DELETE requests.",
        "@PathVariable identifies the resource.",
        "The service should normally contain the deletion logic.",
        "204 No Content is useful when there is no response body."
      ]
    },

    {
      id: "comparison",
      title: "HTTP Method Summary",

      paragraphs: [
        "The five methods can be remembered by focusing on the intended resource operation."
      ],

      code: {
        language: "text",
        code: `GET
    Retrieve data

POST
    Create or submit data

PUT
    Replace a resource representation

PATCH
    Partially modify a resource

DELETE
    Remove a resource`
      },

      bullets: [
        "GET → retrieve data.",
        "POST → create or submit data.",
        "PUT → replace an existing resource representation.",
        "PATCH → partially update a resource.",
        "DELETE → remove a resource."
      ]
    },

    {
      id: "safe-idempotent",
      title: "Safe and Idempotent Methods",

      paragraphs: [
        "HTTP defines properties such as safety and idempotency for methods.",
        "A safe method is intended not to modify application state.",
        "An idempotent method has the same intended effect on server state when the same request is made multiple times.",
        "GET is safe and idempotent. PUT and DELETE are idempotent, although their server-side implementation should still respect the intended semantics.",
        "POST is generally not idempotent.",
        "PATCH is not guaranteed to be idempotent because the effect depends on how the patch operation is defined."
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
        "Safe does not mean secure.",
        "Safe means the method is intended not to modify application state.",
        "Idempotent does not mean the response must be identical.",
        "Idempotency concerns the intended effect on server state.",
        "GET is safe and idempotent.",
        "PUT is idempotent but not safe.",
        "DELETE is idempotent but not safe.",
        "POST is generally neither safe nor idempotent.",
        "PATCH is not guaranteed to be idempotent."
      ]
    },

    {
      id: "idempotency-example",
      title: "Understanding Idempotency with Examples",

      paragraphs: [
        "Suppose an employee has department = Engineering. Sending the same PUT request repeatedly to set the department to Platform should leave the employee in the same intended state.",
        "DELETE is also considered idempotent. The first DELETE may remove the resource. A subsequent identical DELETE may return 404 because the resource no longer exists, but the intended final state remains that the resource is absent.",
        "POST is generally not idempotent because repeating a create request can create multiple resources."
      ],

      code: {
        language: "text",
        code: `PUT /api/employees/101

{
  "department": "Platform"
}


Request 1
Employee department -> Platform

Request 2
Employee department -> Platform

Request 3
Employee department -> Platform


Final intended state:
department = Platform


POST /api/employees

Request 1 -> Employee created
Request 2 -> Another Employee may be created
Request 3 -> Another Employee may be created`
      },

      bullets: [
        "PUT can safely be retried when the same representation is intended.",
        "DELETE can be retried without making the resource exist again.",
        "POST retries can create duplicate resources.",
        "Distributed systems often need careful retry handling."
      ]
    },

    {
      id: "status-codes",
      title: "HTTP Methods and Status Codes",

      paragraphs: [
        "The HTTP method describes what the client wants to do, while the status code describes the result of processing the request.",
        "The two concepts work together to create a predictable REST API."
      ],

      code: {
        language: "text",
        code: `GET
    Success       -> 200 OK
    Not found     -> 404 Not Found


POST
    Created       -> 201 Created
    Invalid input -> 400 Bad Request
    Conflict      -> 409 Conflict


PUT
    Success       -> 200 OK
    No body       -> 204 No Content
    Not found     -> 404 Not Found


PATCH
    Success       -> 200 OK
    No body       -> 204 No Content
    Not found     -> 404 Not Found


DELETE
    Success       -> 204 No Content
    Not found     -> 404 Not Found`
      },

      bullets: [
        "The method describes the intended operation.",
        "The status code describes the result.",
        "There is no single status code that must be used for every implementation.",
        "API behavior should be consistent and documented."
      ]
    },

    {
      id: "resource-url-design",
      title: "Resource-Oriented URL Design",

      paragraphs: [
        "REST APIs generally use resource-oriented URLs rather than action-oriented URLs.",
        "The HTTP method describes the action, so the URL can remain focused on the resource."
      ],

      code: {
        language: "text",
        code: `Prefer:

GET    /api/employees
POST   /api/employees
GET    /api/employees/101
PUT    /api/employees/101
PATCH  /api/employees/101
DELETE /api/employees/101


Avoid unnecessary action-style URLs such as:

/getEmployees
/createEmployee
/updateEmployee
/deleteEmployee`
      },

      bullets: [
        "Use nouns for resource URLs.",
        "Use HTTP methods for operations.",
        "Use identifiers in paths when addressing a specific resource.",
        "Use query parameters for filtering and pagination."
      ]
    },

    {
      id: "method-selection",
      title: "How to Choose the Correct HTTP Method",

      paragraphs: [
        "When designing an endpoint, first identify what the client wants to do with the resource.",
        "If the operation only retrieves information, GET is usually appropriate. If it creates a new resource, POST is commonly appropriate. If it replaces an existing representation, PUT is commonly appropriate. If it modifies only part of a resource, PATCH is commonly appropriate. If it removes the resource, DELETE is commonly appropriate."
      ],

      code: {
        language: "text",
        code: `Question 1:
Am I only retrieving data?

Yes -> GET


Question 2:
Am I creating/submitting a new resource?

Yes -> POST


Question 3:
Am I replacing the resource representation?

Yes -> PUT


Question 4:
Am I changing only part of the resource?

Yes -> PATCH


Question 5:
Am I removing the resource?

Yes -> DELETE`
      },

      bullets: [
        "Choose the method based on the intended operation.",
        "Do not choose POST simply because it is convenient.",
        "Do not use GET for state-changing operations.",
        "Clearly document update semantics for PUT and PATCH."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common HTTP Method Mistakes",

      paragraphs: [
        "Incorrect method selection can make an API confusing, difficult to cache, difficult to retry safely, or inconsistent with HTTP semantics."
      ],

      bullets: [
        "Mistake 1: Using GET to delete a resource.",
        "Mistake 2: Using GET to create a database record.",
        "Mistake 3: Using POST for every operation.",
        "Mistake 4: Confusing PUT with PATCH.",
        "Mistake 5: Assuming PATCH is always idempotent.",
        "Mistake 6: Assuming safe means secure.",
        "Mistake 7: Returning 200 for every successful operation without considering more precise status codes.",
        "Mistake 8: Sending a full replacement with an API documented as a partial PATCH.",
        "Mistake 9: Ignoring duplicate creation when POST requests are retried.",
        "Mistake 10: Creating action-based URLs unnecessarily.",
        "Mistake 11: Forgetting to handle 404 when a target resource does not exist.",
        "Mistake 12: Putting business logic directly inside the controller."
      ]
    },

    {
      id: "testing",
      title: "Testing HTTP Methods with Postman",

      paragraphs: [
        "Postman is useful for testing each HTTP method manually.",
        "For each endpoint, verify the HTTP method, URL, request headers, request body, status code, and response body."
      ],

      code: {
        language: "text",
        code: `GET
GET http://localhost:8080/api/employees


POST
POST http://localhost:8080/api/employees

Body:
{
  "name": "Rahul",
  "email": "rahul@example.com"
}


PUT
PUT http://localhost:8080/api/employees/101

Body:
{
  "name": "Rahul Kumar",
  "email": "rahul.kumar@example.com"
}


PATCH
PATCH http://localhost:8080/api/employees/101

Body:
{
  "email": "new@example.com"
}


DELETE
DELETE http://localhost:8080/api/employees/101`
      },

      bullets: [
        "Select the correct HTTP method in Postman.",
        "Use the correct URL.",
        "Set Content-Type for JSON request bodies.",
        "Send valid JSON for POST, PUT, and PATCH.",
        "Check the response status code.",
        "Check the response body.",
        "Test missing-resource scenarios."
      ]
    },

    {
      id: "spring-controller-summary",
      title: "All Methods in One Spring Boot Controller",

      paragraphs: [
        "The following example shows how the common HTTP methods map to Spring Boot controller annotations."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @RequestBody EmployeeRequest request
    ) {
        Employee employee =
                employeeService.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> replaceEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeRequest request
    ) {
        Employee employee =
                employeeService.replaceEmployee(id, request);

        return ResponseEntity.ok(employee);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> patchEmployee(
            @PathVariable Long id,
            @RequestBody EmployeePatchRequest request
    ) {
        Employee employee =
                employeeService.patchEmployee(id, request);

        return ResponseEntity.ok(employee);
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
        "@GetMapping → GET.",
        "@PostMapping → POST.",
        "@PutMapping → PUT.",
        "@PatchMapping → PATCH.",
        "@DeleteMapping → DELETE.",
        "@RequestBody reads request payloads.",
        "@PathVariable reads resource identifiers.",
        "Service methods contain the application logic."
      ]
    },

    {
      id: "request-flow",
      title: "Complete HTTP Method Request Flow",

      paragraphs: [
        "Regardless of which HTTP method is used, the request follows the application's HTTP processing pipeline. The method determines which controller mapping can match the request."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   | Method + URL + Headers + Body
   v
Embedded Tomcat
   |
   v
DispatcherServlet
   |
   v
Handler Mapping
   |
   +---- GET    -> @GetMapping
   |
   +---- POST   -> @PostMapping
   |
   +---- PUT    -> @PutMapping
   |
   +---- PATCH  -> @PatchMapping
   |
   +---- DELETE -> @DeleteMapping
   |
   v
Controller
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
HTTP Response
   |
   v
Client`
      },

      bullets: [
        "The HTTP method participates in controller method matching.",
        "The URL and method together identify the intended endpoint.",
        "The controller delegates business logic to the service.",
        "The service can interact with the repository.",
        "The final result becomes an HTTP response."
      ]
    },

    {
      id: "interview",
      title: "HTTP Methods Interview Questions",

      interviewQuestions: [
        {
          question: "What are HTTP methods?",
          answer:
            "HTTP methods describe the intended operation of an HTTP request. Common REST API methods are GET, POST, PUT, PATCH, and DELETE."
        },
        {
          question: "What is GET used for?",
          answer:
            "GET is commonly used to retrieve resources or collections of resources."
        },
        {
          question: "What is POST used for?",
          answer:
            "POST is commonly used to create a resource or submit data for server-side processing."
        },
        {
          question: "What is PUT used for?",
          answer:
            "PUT is commonly used to replace the representation of a resource at a known target URI. It is idempotent according to HTTP semantics."
        },
        {
          question: "What is PATCH used for?",
          answer:
            "PATCH is commonly used to partially modify an existing resource."
        },
        {
          question: "What is DELETE used for?",
          answer:
            "DELETE is commonly used to remove a resource."
        },
        {
          question: "What is the difference between PUT and PATCH?",
          answer:
            "PUT is commonly used to replace a resource representation, while PATCH is commonly used to apply a partial modification."
        },
        {
          question: "Is GET idempotent?",
          answer:
            "Yes. GET is defined as an idempotent HTTP method."
        },
        {
          question: "Is GET safe?",
          answer:
            "Yes. GET is a safe HTTP method because its intended semantics do not modify application state."
        },
        {
          question: "Is POST idempotent?",
          answer:
            "POST is generally not idempotent because repeating the same request can create multiple resources or repeat an operation."
        },
        {
          question: "Is PUT idempotent?",
          answer:
            "Yes. PUT is defined as an idempotent HTTP method. Repeating the same PUT request should have the same intended effect on server state."
        },
        {
          question: "Is DELETE idempotent?",
          answer:
            "Yes. DELETE is defined as an idempotent HTTP method. Repeating a DELETE should leave the resource in the same intended final state of being absent, even though later responses may differ."
        },
        {
          question: "Is PATCH idempotent?",
          answer:
            "PATCH is not guaranteed to be idempotent. Its idempotency depends on the semantics of the particular patch operation."
        },
        {
          question: "What is the difference between safe and idempotent?",
          answer:
            "Safe means the method is intended not to modify application state. Idempotent means repeating the same request has the same intended effect on server state."
        },
        {
          question: "Can POST be made idempotent?",
          answer:
            "An application can design a POST operation to safely handle retries, for example by using an idempotency key, but POST itself is not defined as idempotent by HTTP."
        },
        {
          question: "Why should GET not be used for deletion?",
          answer:
            "GET is a safe method and is intended for retrieval. Using it for deletion violates HTTP semantics and can cause unexpected behavior with crawlers, caches, prefetching, or other clients."
        },
        {
          question: "Why is POST commonly used for creation?",
          answer:
            "POST is designed for submitting a representation or processing request to the target resource, and it commonly results in the creation of a new resource."
        },
        {
          question: "What is the CRUD mapping for HTTP methods?",
          answer:
            "Create commonly maps to POST, Read to GET, full replacement/update to PUT, partial update to PATCH, and Delete to DELETE."
        },
        {
          question: "Which Spring Boot annotations map these methods?",
          answer:
            "@GetMapping maps GET, @PostMapping maps POST, @PutMapping maps PUT, @PatchMapping maps PATCH, and @DeleteMapping maps DELETE."
        },
        {
          question: "Can the same URL use different HTTP methods?",
          answer:
            "Yes. For example, GET /api/employees can retrieve employees while POST /api/employees can create an employee."
        },
        {
          question: "Why is HTTP method selection important?",
          answer:
            "Correct method selection makes the API predictable, communicates intent, supports standard HTTP behavior, and helps clients and infrastructure handle requests correctly."
        },
        {
          question: "What status code is commonly returned after POST creates a resource?",
          answer:
            "201 Created is commonly used to indicate successful resource creation."
        },
        {
          question: "What status code is commonly returned after DELETE succeeds with no response body?",
          answer:
            "204 No Content is commonly used."
        },
        {
          question: "What status code can be returned when the resource does not exist?",
          answer:
            "404 Not Found is commonly used when the requested resource does not exist."
        },
        {
          question: "Can PUT create a resource?",
          answer:
            "Yes, PUT can create or replace a resource at a known target URI depending on the API semantics. In many application APIs, PUT is used primarily to replace an existing resource."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You need an API to retrieve all employees. Which method and endpoint would you use?",
          answer:
            "I would use GET /api/employees because GET is intended for resource retrieval."
        },
        {
          question:
            "You need to create a new employee. Which method would you use?",
          answer:
            "I would use POST /api/employees and send the employee data in the request body, normally returning 201 Created after successful creation."
        },
        {
          question:
            "The client only wants to change an employee's email. Would you use PUT or PATCH?",
          answer:
            "PATCH is generally appropriate because only one part of the employee resource needs to be modified."
        },
        {
          question:
            "The client sends the complete desired employee representation and wants the resource replaced. Which method would you use?",
          answer:
            "PUT is commonly appropriate because it is intended for replacement semantics at a known resource URI."
        },
        {
          question:
            "A DELETE request is sent twice. Is that automatically a violation of idempotency?",
          answer:
            "No. DELETE is idempotent. The first request can remove the resource and a later request may return 404, but the intended final state remains that the resource is absent."
        },
        {
          question:
            "Why should you avoid GET /deleteEmployee/101?",
          answer:
            "GET is a safe retrieval method and should not modify server state. Deletion should use DELETE /api/employees/101."
        },
        {
          question:
            "A payment API uses POST and clients may retry requests after network timeouts. What problem should you consider?",
          answer:
            "A retry can potentially process the payment more than once because POST is generally not idempotent. The API may need an idempotency-key mechanism or another retry-safe design."
        },
        {
          question:
            "Why might PATCH be preferable to PUT for a large resource?",
          answer:
            "If only a small part of the resource needs to change, PATCH can communicate a partial modification and avoid requiring the client to send the entire representation."
        }
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "Remember the five main HTTP methods by their intended operation: GET retrieves, POST creates or submits, PUT replaces, PATCH partially modifies, and DELETE removes."
      ],

      bullets: [
        "GET → retrieve.",
        "POST → create or submit.",
        "PUT → replace.",
        "PATCH → partial modification.",
        "DELETE → remove.",
        "GET is safe.",
        "GET is idempotent.",
        "POST is generally not idempotent.",
        "PUT is idempotent.",
        "DELETE is idempotent.",
        "PATCH is not guaranteed to be idempotent.",
        "Safe does not mean secure.",
        "Idempotent means repeated requests have the same intended effect on server state.",
        "GET commonly returns 200 OK.",
        "POST commonly returns 201 Created after creation.",
        "PUT commonly returns 200 OK or 204 No Content.",
        "PATCH commonly returns 200 OK or 204 No Content.",
        "DELETE commonly returns 204 No Content.",
        "404 Not Found is commonly used when a resource does not exist.",
        "@GetMapping → GET.",
        "@PostMapping → POST.",
        "@PutMapping → PUT.",
        "@PatchMapping → PATCH.",
        "@DeleteMapping → DELETE.",
        "Use resource-oriented URLs.",
        "Use query parameters for filtering, sorting, and pagination.",
        "Use @RequestBody for request payloads.",
        "Use @PathVariable for resource identifiers.",
        "Use DTOs and validation for production APIs.",
        "Consider idempotency when designing retryable operations."
      ]
    }
  ]
};
