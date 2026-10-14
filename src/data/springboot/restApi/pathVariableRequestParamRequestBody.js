
export const pathVariableRequestParamRequestBody = {
  id: "path-variable-request-param-request-body",
  title:
    "@PathVariable, @RequestParam, @RequestBody",

  slug:
    "path-variable-request-param-request-body",

  topicTitle: "REST API Fundamentals",
  estimatedTime: "40 min",

  description:
    "Learn how Spring Boot extracts data from URL paths, query parameters, and HTTP request bodies using @PathVariable, @RequestParam, and @RequestBody, including practical REST API examples, validation, optional parameters, DTOs, and request processing flow.",

  sections: [
    {
      id: "path-variable",
      title: "@PathVariable",

      paragraphs: [
        "@PathVariable is used to extract a value from a variable part of the URL path.",
        "A path variable is normally used when the value identifies a specific resource.",
        "For example, in /api/employees/101, the value 101 can represent the ID of employee 101.",
        "The variable name inside the URL template normally matches the parameter name, although Spring also allows the name to be specified explicitly."
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
        "@PathVariable reads values from the URL path.",
        "It is commonly used for resource identifiers.",
        "The value can be converted to types such as Long, Integer, UUID, or String.",
        "The URL template contains the variable inside { }.",
        "Example: /employees/{id}."
      ]
    },

    {
      id: "path-variable-flow",
      title: "How @PathVariable Works",

      paragraphs: [
        "When a request reaches Spring MVC, Spring matches the URL against the controller mapping.",
        "If the URL contains a value where the mapping contains a path variable, Spring extracts that value and supplies it to the controller parameter."
      ],

      code: {
        language: "text",
        code: `Client

GET /api/employees/101
        |
        v
Controller mapping

@GetMapping("/employees/{id}")
        |
        v
Spring extracts:

id = "101"
        |
        v
Type conversion:

"101" -> Long 101
        |
        v
Controller method

getEmployee(101)`
      },

      bullets: [
        "Spring first matches the URL pattern.",
        "The path value is extracted.",
        "Spring converts the value to the target Java type.",
        "The converted value is passed to the controller method."
      ]
    },

    {
      id: "multiple-path-variables",
      title: "Multiple Path Variables",

      paragraphs: [
        "A URL can contain more than one path variable.",
        "This is useful when the URL represents a nested resource relationship."
      ],

      code: {
        language: "java",
        code: `@GetMapping(
        "/departments/{departmentId}/employees/{employeeId}"
)
public String getEmployee(
        @PathVariable Long departmentId,
        @PathVariable Long employeeId
) {
    return "Department: "
            + departmentId
            + ", Employee: "
            + employeeId;
}`
      },

      output: `GET /api/departments/10/employees/101

Department: 10, Employee: 101`,

      bullets: [
        "Multiple path variables can be used in one mapping.",
        "Each variable should have a corresponding controller parameter.",
        "Nested URLs can represent relationships between resources.",
        "Example: /departments/10/employees/101."
      ]
    },

    {
      id: "named-path-variable",
      title: "Explicit Path Variable Names",

      paragraphs: [
        "You can explicitly specify the path-variable name using the value or name attribute.",
        "This is useful when the Java parameter name is different from the URL variable name."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees/{employeeId}")
public String getEmployee(
        @PathVariable("employeeId") Long id
) {
    return "Employee ID: " + id;
}`
      },

      output: `GET /api/employees/101

Employee ID: 101`,

      bullets: [
        "The URL variable is employeeId.",
        "The Java parameter is named id.",
        "The explicit annotation connects the two names.",
        "This can make the mapping clear when parameter names differ."
      ]
    },

    {
      id: "request-param",
      title: "@RequestParam",

      paragraphs: [
        "@RequestParam is used to extract values from query parameters.",
        "Query parameters appear after the ? symbol in a URL.",
        "They are commonly used for filtering, searching, sorting, pagination, and optional request settings.",
        "Unlike a path variable, a query parameter does not normally identify the resource itself."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String getEmployees(
        @RequestParam String department
) {
    return "Department: " + department;
}`
      },

      output: `GET /api/employees?department=IT

Department: IT`,

      bullets: [
        "@RequestParam reads values from the query string.",
        "Query parameters are commonly used for filtering.",
        "Query parameters can be required or optional.",
        "Multiple query parameters can be used in the same request."
      ]
    },

    {
      id: "request-param-multiple",
      title: "Multiple Request Parameters",

      paragraphs: [
        "A controller can receive multiple query parameters.",
        "This is useful for APIs that support filtering, sorting, and pagination."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String searchEmployees(
        @RequestParam String department,
        @RequestParam String city
) {
    return "Department: "
            + department
            + ", City: "
            + city;
}`
      },

      output: `GET /api/employees?department=IT&city=Hyderabad

Department: IT, City: Hyderabad`,

      bullets: [
        "Multiple @RequestParam parameters can be used.",
        "Each parameter maps to a query-string value.",
        "Query parameters are separated using &."
      ]
    },

    {
      id: "optional-request-param",
      title: "Optional Request Parameter",

      paragraphs: [
        "A request parameter is required by default.",
        "If the parameter is not supplied, Spring can reject the request unless the parameter is marked as optional or given a default value.",
        "The required attribute can be set to false when the parameter is optional."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String getEmployees(
        @RequestParam(
                required = false,
                defaultValue = "all"
        )
        String department
) {
    return "Department: " + department;
}`
      },

      output: `Request:

GET /api/employees

Result:

Department: all


Request:

GET /api/employees?department=IT

Result:

Department: IT`,

      bullets: [
        "required = false makes the parameter optional.",
        "defaultValue provides a value when the parameter is missing.",
        "An optional parameter is useful for filters and search options.",
        "Default values should have clear application meaning."
      ]
    },

    {
      id: "request-param-types",
      title: "Request Parameters with Different Data Types",

      paragraphs: [
        "Spring can convert query-parameter strings into compatible Java types when the conversion is supported."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String getEmployees(
        @RequestParam String department,
        @RequestParam int page,
        @RequestParam int size,
        @RequestParam boolean active
) {
    return "Department: " + department
            + ", Page: " + page
            + ", Size: " + size
            + ", Active: " + active;
}`
      },

      output: `GET /api/employees
    ?department=IT
    &page=0
    &size=10
    &active=true

Department: IT
Page: 0
Size: 10
Active: true`,

      bullets: [
        "String values can be converted to supported Java types.",
        "Common examples include int, long, boolean, enum, and other convertible types.",
        "Invalid values can cause request-binding or conversion errors."
      ]
    },

    {
      id: "request-body",
      title: "@RequestBody",

      paragraphs: [
        "@RequestBody is used to read data from the HTTP request body and convert it into a Java object.",
        "It is commonly used with POST, PUT, and PATCH requests.",
        "For JSON requests, Spring MVC commonly uses Jackson through an HTTP message converter to deserialize the JSON into the target Java type."
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
        "JSON is commonly converted into a Java object.",
        "It is frequently used with POST, PUT, and PATCH.",
        "The request normally includes Content-Type: application/json."
      ]
    },

    {
      id: "request-body-json",
      title: "JSON Request Body",

      paragraphs: [
        "A client can send JSON in the request body when creating or updating a resource.",
        "The JSON property names are mapped to the corresponding Java object properties."
      ],

      code: {
        language: "json",
        code: `{
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "IT"
}`
      },

      bullets: [
        "The JSON is sent in the HTTP request body.",
        "Content-Type should normally be application/json.",
        "Jackson commonly performs the JSON-to-Java conversion.",
        "The target Java class should have compatible properties."
      ]
    },

    {
      id: "request-body-flow",
      title: "How @RequestBody Works",

      paragraphs: [
        "When Spring receives a request containing a JSON body, an HTTP message converter reads the body and converts it into the Java type declared by the controller parameter."
      ],

      code: {
        language: "text",
        code: `Client

POST /api/employees

Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}
        |
        v
Spring MVC
        |
        v
HTTP Message Converter
        |
        v
Jackson
        |
        v
Employee Java object
        |
        v
Controller method

createEmployee(employee)`
      },

      bullets: [
        "Client sends JSON.",
        "Content-Type tells the server the representation format.",
        "Spring selects an appropriate HTTP message converter.",
        "Jackson commonly deserializes JSON.",
        "The resulting Java object is passed to the controller."
      ]
    },

    {
      id: "path-vs-query",
      title: "Path Variable vs Query Parameter",

      paragraphs: [
        "Both path variables and query parameters are values supplied through the URL, but they have different purposes.",
        "A path variable commonly identifies the resource being addressed, while a query parameter commonly modifies how the resource collection is searched, filtered, sorted, or paginated."
      ],

      code: {
        language: "text",
        code: `Path Variable

GET /api/employees/101

101 identifies the employee.

@PathVariable Long id


Query Parameter

GET /api/employees?department=IT

IT filters the employee collection.

@RequestParam String department`
      },

      bullets: [
        "Path variable → identifies a specific resource.",
        "Query parameter → commonly filters or modifies a request.",
        "Path variable is part of the resource path.",
        "Query parameter appears after ?.",
        "Query parameters can be optional.",
        "Path variables are commonly required for the route to match."
      ]
    },

    {
      id: "comparison",
      title: "PathVariable vs RequestParam vs RequestBody",

      paragraphs: [
        "These three annotations solve different request-data extraction problems.",
        "The easiest way to remember them is: path identifies, query filters, and body carries data."
      ],

      code: {
        language: "text",
        code: `URL:

/employees/101
         ↑
@PathVariable


Query:

/employees?department=IT
            ↑
@RequestParam


Body:

{
  "name": "Rahul"
}
        ↑
@RequestBody`
      },

      bullets: [
        "@PathVariable → value from URL path.",
        "@RequestParam → value from URL query string.",
        "@RequestBody → value from HTTP request body.",
        "@PathVariable is commonly used for resource identification.",
        "@RequestParam is commonly used for filtering, searching, sorting, and pagination.",
        "@RequestBody is commonly used for structured input such as JSON."
      ]
    },

    {
      id: "same-endpoint-combination",
      title: "Using All Three Together",

      paragraphs: [
        "A single endpoint can use path variables, query parameters, and a request body when the API design requires all three.",
        "For example, a resource ID can come from the path, an operation option can come from a query parameter, and the update data can come from the request body."
      ],

      code: {
        language: "java",
        code: `@PatchMapping("/employees/{id}")
public Employee updateEmployee(
        @PathVariable Long id,
        @RequestParam(
                defaultValue = "false"
        )
        boolean notify,
        @RequestBody EmployeePatchRequest request
) {

    return employeeService.updateEmployee(
            id,
            request,
            notify
    );
}`
      },

      output: `PATCH /api/employees/101?notify=true

Body:

{
  "email": "new@example.com"
}

@PathVariable
    id = 101

@RequestParam
    notify = true

@RequestBody
    request.email = "new@example.com"`,

      bullets: [
        "The path identifies the employee.",
        "The query parameter controls an optional operation setting.",
        "The body contains the actual update data.",
        "Use this combination only when each value has a clear purpose."
      ]
    },

    {
      id: "dto-usage",
      title: "Using DTOs with @RequestBody",

      paragraphs: [
        "In production REST APIs, it is often better to receive a request DTO instead of directly accepting a JPA entity.",
        "A DTO allows the API contract to be separated from the database entity and helps control which fields the client is allowed to submit."
      ],

      code: {
        language: "java",
        code: `public class EmployeeCreateRequest {

    private String name;
    private String email;
    private String department;

    // getters and setters
}


@PostMapping("/employees")
public EmployeeResponse createEmployee(
        @RequestBody EmployeeCreateRequest request
) {
    return employeeService.createEmployee(request);
}`
      },

      bullets: [
        "Request DTOs define the input contract.",
        "They prevent clients from directly controlling fields that should be server-managed.",
        "DTOs are useful for validation.",
        "DTOs help separate API models from database entities."
      ]
    },

    {
      id: "validation",
      title: "Validation with @RequestBody",

      paragraphs: [
        "Request-body data should normally be validated before business logic is executed.",
        "Spring Boot can use Jakarta Bean Validation annotations together with @Valid."
      ],

      code: {
        language: "java",
        code: `public class EmployeeCreateRequest {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String department;

    // getters and setters
}


@PostMapping("/employees")
public EmployeeResponse createEmployee(
        @Valid
        @RequestBody EmployeeCreateRequest request
) {
    return employeeService.createEmployee(request);
}`
      },

      bullets: [
        "@Valid triggers Bean Validation for the request object.",
        "@NotBlank can validate required text fields.",
        "@Email can validate email format.",
        "Validation failures should be converted into a consistent API error response."
      ]
    },

    {
      id: "path-variable-type-conversion",
      title: "Path Variable Type Conversion",

      paragraphs: [
        "Spring attempts to convert path-variable values to the declared Java type.",
        "If the URL contains a value that cannot be converted to the required type, request processing can fail before the controller method executes."
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

      output: `Valid:

GET /api/employees/101

id = 101


Invalid:

GET /api/employees/abc

"abc" cannot be converted to Long`
      ,

      bullets: [
        "101 can be converted to Long.",
        "abc cannot be converted to Long.",
        "Type conversion errors should be handled with a consistent API error response.",
        "Use String when the identifier is intentionally non-numeric."
      ]
    },

    {
      id: "request-param-defaults",
      title: "Default Values and Optional Parameters",

      paragraphs: [
        "Optional query parameters are very common in search and listing APIs.",
        "For example, pagination can provide defaults for page and size when the client does not specify them."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public List<Employee> getEmployees(
        @RequestParam(
                defaultValue = "0"
        )
        int page,

        @RequestParam(
                defaultValue = "10"
        )
        int size
) {
    return employeeService
            .getEmployees(page, size);
}`
      },

      output: `GET /api/employees

page = 0
size = 10


GET /api/employees?page=2&size=20

page = 2
size = 20`
      ,
      
      bullets: [
        "defaultValue provides a fallback value.",
        "Default values are useful for pagination.",
        "Defaults should be sensible and documented.",
        "Applications should also validate limits such as maximum page size."
      ]
    },

    {
      id: "query-parameter-filtering",
      title: "Filtering with @RequestParam",

      paragraphs: [
        "Query parameters are commonly used to filter a collection without changing the resource path."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public List<Employee> searchEmployees(
        @RequestParam(required = false)
        String department,

        @RequestParam(required = false)
        String city
) {
    return employeeService
            .searchEmployees(department, city);
}`
      },

      output: `GET /api/employees?department=IT

Filter:
department = IT


GET /api/employees?department=IT&city=Hyderabad

Filters:
department = IT
city = Hyderabad`
      ,

      bullets: [
        "Filtering commonly uses query parameters.",
        "Optional filters allow flexible search.",
        "Multiple filters can be combined.",
        "The service layer should apply the actual business/search logic."
      ]
    },

    {
      id: "complete-example",
      title: "Complete Example",

      paragraphs: [
        "The following controller demonstrates the three annotations in a simple employee API."
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
        return employeeService.getEmployee(id);
    }

    @GetMapping
    public List<Employee> searchEmployees(
            @RequestParam(
                    required = false
            )
            String department
    ) {
        return employeeService
                .searchEmployees(department);
    }

    @PostMapping
    public Employee createEmployee(
            @RequestBody EmployeeCreateRequest request
    ) {
        return employeeService
                .createEmployee(request);
    }
}`
      },

      bullets: [
        "GET /api/employees/101 → @PathVariable.",
        "GET /api/employees?department=IT → @RequestParam.",
        "POST /api/employees with JSON → @RequestBody.",
        "Each annotation extracts data from a different part of the HTTP request."
      ]
    },

    {
      id: "complete-request-flow",
      title: "Complete Request Processing Flow",

      paragraphs: [
        "Understanding where these annotations fit in the Spring MVC request flow is important for interviews.",
        "Spring receives the HTTP request, finds the matching controller method, resolves the method parameters, and then invokes the controller."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP Request
   |
   +-----------------------------+
   |                             |
   | GET /employees/101           |
   |                             |
   v                             |
DispatcherServlet                |
   |                             |
   v                             |
Handler Mapping                  |
   |                             |
   v                             |
Controller Method                |
   |                             |
   +--> @PathVariable             |
   |        id = 101              |
   |                             |
   +--> @RequestParam             |
   |        department = IT       |
   |                             |
   +--> @RequestBody              |
   |        EmployeeRequest       |
   |                             |
   v                             |
Service                          |
   |
   v
Repository
   |
   v
Database`
      },

      bullets: [
        "@PathVariable resolves data from the path.",
        "@RequestParam resolves data from query parameters.",
        "@RequestBody resolves data from the request body.",
        "Spring performs parameter resolution before invoking the controller method.",
        "The controller normally delegates business logic to the service layer."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Understanding the differences between these annotations prevents many common Spring Boot REST API mistakes."
      ],

      bullets: [
        "Mistake 1: Using @RequestParam when the value is actually part of the resource path.",
        "Mistake 2: Using @PathVariable without including the matching variable in the URL mapping.",
        "Mistake 3: Forgetting @RequestBody when receiving JSON input.",
        "Mistake 4: Sending JSON without Content-Type: application/json.",
        "Mistake 5: Using a required query parameter when it should be optional.",
        "Mistake 6: Forgetting default values for pagination parameters.",
        "Mistake 7: Accepting a JPA entity directly when a request DTO would provide a safer API contract.",
        "Mistake 8: Ignoring validation for request-body data.",
        "Mistake 9: Using String for numeric IDs without a reason.",
        "Mistake 10: Putting database or business logic directly inside the controller."
      ]
    },

    {
      id: "postman-testing",
      title: "Testing These Annotations with Postman",

      paragraphs: [
        "Postman makes it easy to verify exactly which part of the request Spring is reading."
      ],

      code: {
        language: "text",
        code: `1. Path Variable

GET http://localhost:8080/api/employees/101

Expected:
id = 101


2. Request Parameter

GET http://localhost:8080/api/employees?department=IT

Expected:
department = IT


3. Request Body

POST http://localhost:8080/api/employees

Headers:
Content-Type: application/json

Body:
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "department": "IT"
}

Expected:
EmployeeCreateRequest is populated.`
      },

      bullets: [
        "Use path variables in the URL path.",
        "Use query parameters after ?.",
        "Use JSON in the body for structured request data.",
        "Set Content-Type when sending JSON.",
        "Verify the server receives the expected values."
      ]
    },

    {
      id: "interview",
      title: "Request Data Interview Questions",

      interviewQuestions: [
        {
          question: "What is @PathVariable?",
          answer:
            "@PathVariable extracts a value from a variable part of the URL path."
        },
        {
          question: "What is @RequestParam?",
          answer:
            "@RequestParam extracts values from URL query parameters."
        },
        {
          question: "What is @RequestBody?",
          answer:
            "@RequestBody reads the HTTP request body and converts it into a Java object."
        },
        {
          question:
            "What is the difference between @PathVariable and @RequestParam?",
          answer:
            "@PathVariable reads a value embedded in the URL path, while @RequestParam reads a value from the query string."
        },
        {
          question:
            "What is the difference between @RequestParam and @RequestBody?",
          answer:
            "@RequestParam reads values from the query string, while @RequestBody reads structured data from the HTTP request body."
        },
        {
          question:
            "When should you use @PathVariable?",
          answer:
            "Use @PathVariable when a value is part of the resource path, commonly when identifying a specific resource such as /employees/101."
        },
        {
          question:
            "When should you use @RequestParam?",
          answer:
            "Use @RequestParam for query parameters such as filtering, searching, sorting, pagination, and optional request settings."
        },
        {
          question:
            "When should you use @RequestBody?",
          answer:
            "Use @RequestBody when the client sends structured data in the HTTP request body, commonly JSON for POST, PUT, and PATCH requests."
        },
        {
          question:
            "How does Spring convert JSON into a Java object?",
          answer:
            "Spring MVC uses HTTP message converters, commonly Jackson for JSON, to deserialize the request body into the target Java type."
        },
        {
          question:
            "What happens if a required @RequestParam is missing?",
          answer:
            "Spring can reject the request because the required query parameter was not provided. An optional parameter can be configured using required = false or a defaultValue."
        },
        {
          question:
            "How do you make a @RequestParam optional?",
          answer:
            "Use required = false, optionally together with defaultValue when a fallback value is needed."
        },
        {
          question:
            "Can @RequestParam have a default value?",
          answer:
            "Yes. You can use the defaultValue attribute, for example @RequestParam(defaultValue = \"0\") int page."
        },
        {
          question:
            "Can a controller have multiple @PathVariable values?",
          answer:
            "Yes. A URL mapping can contain multiple path variables and the controller can receive each one using @PathVariable."
        },
        {
          question:
            "Can a controller have multiple @RequestParam values?",
          answer:
            "Yes. A controller method can receive multiple query parameters using multiple @RequestParam annotations."
        },
        {
          question:
            "What happens if a path variable cannot be converted to the target Java type?",
          answer:
            "Spring can fail during argument conversion before the controller method executes, resulting in an HTTP client error response."
        },
        {
          question:
            "Why is Content-Type important with @RequestBody?",
          answer:
            "Content-Type tells the server what media type the request body contains. For JSON requests, application/json allows Spring to select the appropriate JSON message converter."
        },
        {
          question:
            "Should you directly use an entity class with @RequestBody?",
          answer:
            "It can work, but request DTOs are often preferred because they provide a controlled API contract, support validation, and prevent clients from directly controlling persistence-specific fields."
        },
        {
          question:
            "Can @RequestBody be used with GET?",
          answer:
            "HTTP does not generally define useful semantics for GET request content, so standard REST APIs normally use path variables and query parameters for GET requests instead of relying on a request body."
        },
        {
          question:
            "Where does @PathVariable data come from?",
          answer:
            "It comes from a variable segment defined in the URL mapping, such as the 101 in /api/employees/101."
        },
        {
          question:
            "Where does @RequestParam data come from?",
          answer:
            "It comes from the query string, such as department=IT in /api/employees?department=IT."
        },
        {
          question:
            "Where does @RequestBody data come from?",
          answer:
            "It comes from the HTTP request body, commonly as JSON for REST APIs."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You have GET /api/employees/101. Which annotation should read 101?",
          answer:
            "@PathVariable because 101 is part of the URL path and identifies the employee."
        },
        {
          question:
            "You have GET /api/employees?department=IT. Which annotation should read IT?",
          answer:
            "@RequestParam because department=IT is a query parameter."
        },
        {
          question:
            "A client sends employee details as JSON while creating an employee. Which annotation should you use?",
          answer:
            "@RequestBody because the employee data is contained in the HTTP request body."
        },
        {
          question:
            "You need pagination using page=0 and size=10. Which annotation would you use?",
          answer:
            "@RequestParam because page and size are query parameters."
        },
        {
          question:
            "You need GET /api/departments/10/employees/101. How would you extract both IDs?",
          answer:
            "Use two @PathVariable parameters, one for departmentId and one for employeeId."
        },
        {
          question:
            "The client should optionally filter employees by department. Which annotation is appropriate?",
          answer:
            "@RequestParam with required = false is appropriate because the filter is optional."
        },
        {
          question:
            "You need to update only an employee's email. Where would you normally place the new email value?",
          answer:
            "A PATCH request body is commonly used, so @RequestBody can receive a partial-update DTO containing the email."
        },
        {
          question:
            "The API receives JSON but Spring cannot deserialize it into the DTO. What should you check?",
          answer:
            "Check Content-Type, JSON syntax, DTO property names/types, Jackson configuration, constructors/accessors where applicable, and any custom serialization configuration."
        },
        {
          question:
            "Why would you use a DTO instead of accepting the Employee entity directly?",
          answer:
            "A DTO gives the API a controlled request contract, allows validation, and prevents clients from directly submitting persistence-specific fields."
        }
      ]
    },

    {
      id: "quick-comparison",
      title: "Quick Comparison for Interviews",

      code: {
        language: "text",
        code: `@PathVariable

Source:
URL path

Example:
GET /api/employees/101

Java:
@PathVariable Long id


@RequestParam

Source:
Query string

Example:
GET /api/employees?department=IT

Java:
@RequestParam String department


@RequestBody

Source:
HTTP request body

Example:
POST /api/employees

{
  "name": "Rahul"
}

Java:
@RequestBody EmployeeRequest request`
      },

      bullets: [
        "@PathVariable → path.",
        "@RequestParam → query parameter.",
        "@RequestBody → request body.",
        "Path → identify resource.",
        "Query → filter/configure request.",
        "Body → send structured data."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "The easiest way to remember these annotations is: @PathVariable gets data from the path, @RequestParam gets data from the query string, and @RequestBody gets structured data from the request body."
      ],

      bullets: [
        "@PathVariable → /employees/{id}.",
        "@RequestParam → /employees?department=IT.",
        "@RequestBody → JSON/XML or another request representation in the body.",
        "Path variables commonly identify resources.",
        "Query parameters commonly filter, search, sort, and paginate.",
        "Request bodies commonly carry create/update data.",
        "@RequestParam is required by default.",
        "Use required = false for optional query parameters.",
        "Use defaultValue when a fallback value is needed.",
        "Spring can convert request values into compatible Java types.",
        "Jackson commonly handles JSON deserialization.",
        "Content-Type describes the request body's media type.",
        "Use @Valid for request DTO validation.",
        "Request DTOs are commonly preferred over exposing persistence entities directly.",
        "Use @PathVariable for resource identity.",
        "Use @RequestParam for query options.",
        "Use @RequestBody for structured request data."
      ]
    }
  ]
};
