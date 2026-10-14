
export const requestMapping = {
  id: "request-mapping",
  title: "@RequestMapping",
  slug: "request-mapping",
  topicTitle: "REST API Fundamentals",
  estimatedTime: "30 min",

  description:
    "Learn how @RequestMapping maps HTTP requests to Spring controller classes and methods, including class-level and method-level mappings, HTTP methods, shorthand annotations, path variables, query parameters, headers, consumes, produces, and request-mapping flow.",

  sections: [
    {
      id: "what-is-request-mapping",
      title: "What is @RequestMapping?",

      paragraphs: [
        "@RequestMapping is a Spring MVC annotation used to map HTTP requests to controller classes or methods.",
        "It can specify a URL path and can also restrict the mapping by HTTP method.",
        "@RequestMapping can be placed at the class level, method level, or both.",
        "When both class-level and method-level mappings are used, Spring combines them to create the final endpoint path.",
        "The annotation can also match requests based on HTTP methods, request parameters, headers, consumes media types, and produces media types."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @RequestMapping("/active")
    public String getActiveEmployees() {
        return "Active employees";
    }
}`
      },

      output: `GET /api/employees/active

Response:

Active employees`,

      bullets: [
        "@RequestMapping maps HTTP requests to controller classes or methods.",
        "It can define a URL path.",
        "It can restrict requests by HTTP method.",
        "It can be used at class level.",
        "It can be used at method level.",
        "It supports additional request-matching conditions."
      ]
    },

    {
      id: "request-mapping-flow",
      title: "How @RequestMapping Works",

      paragraphs: [
        "When a request reaches Spring MVC, Spring checks the registered controller mappings to determine which controller method should handle the request.",
        "Spring considers information such as the URL path and HTTP method while selecting a matching handler method."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | GET /api/employees/active
   v
DispatcherServlet
   |
   v
Handler Mapping
   |
   | Finds matching mapping
   v
EmployeeController
   |
   | @RequestMapping("/active")
   v
getActiveEmployees()
   |
   v
HTTP Response`
      },

      bullets: [
        "The client sends an HTTP request.",
        "Spring MVC receives the request through the DispatcherServlet.",
        "Spring checks registered request mappings.",
        "A matching controller method is selected.",
        "The controller method processes the request.",
        "The result becomes an HTTP response."
      ]
    },

    {
      id: "class-level",
      title: "Class-Level Mapping",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

}`
      },

      paragraphs: [
        "The mapping creates a common URL prefix for the controller.",
        "All compatible method-level mappings inside this controller are combined with the class-level path.",
        "Class-level mapping is useful for keeping related endpoints under a common resource path."
      ],

      code: {
        language: "text",
        code: `Class-level mapping:

@RequestMapping("/api/employees")


Method-level mappings:

@GetMapping
@PostMapping
@GetMapping("/{id}")


Final endpoints:

GET  /api/employees
POST /api/employees
GET  /api/employees/{id}`
      },

      bullets: [
        "Class-level mapping provides a common URL prefix.",
        "It reduces repetition.",
        "It groups related endpoints under a resource.",
        "It is commonly used with @RestController."
      ]
    },

    {
      id: "method-level",
      title: "Method-Level Mapping",

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @RequestMapping("/active")
    public String getActiveEmployees() {
        return "Active employees";
    }
}`
      },

      output: `GET /api/employees/active

Response:

Active employees`,

      paragraphs: [
        "A method-level @RequestMapping defines an additional path for a specific controller method.",
        "When a class-level mapping exists, Spring combines the class-level and method-level paths."
      ],

      bullets: [
        "Class path: /api/employees.",
        "Method path: /active.",
        "Combined path: /api/employees/active.",
        "The method handles requests matching its complete mapping."
      ]
    },

    {
      id: "class-and-method-combination",
      title: "Combining Class-Level and Method-Level Mappings",

      paragraphs: [
        "The most common use of @RequestMapping is to define a common class-level resource path and more specific method-level paths."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @RequestMapping("/active")
    public String activeEmployees() {
        return "Active employees";
    }

    @RequestMapping("/inactive")
    public String inactiveEmployees() {
        return "Inactive employees";
    }
}`
      },

      output: `GET /api/employees/active
GET /api/employees/inactive`,

      bullets: [
        "Class-level path is shared.",
        "Method-level paths identify individual operations.",
        "The final mapping is formed from the class and method mappings."
      ]
    },

    {
      id: "http-method",
      title: "Specifying an HTTP Method",

      paragraphs: [
        "@RequestMapping can restrict a mapping to a specific HTTP method.",
        "This is done using the method attribute and RequestMethod enum."
      ],

      code: {
        language: "java",
        code: `@RequestMapping(
        value = "/employees",
        method = RequestMethod.GET
)
public String getEmployees() {
    return "Employee list";
}`
      },

      bullets: [
        "RequestMethod.GET maps GET.",
        "RequestMethod.POST maps POST.",
        "RequestMethod.PUT maps PUT.",
        "RequestMethod.PATCH maps PATCH.",
        "RequestMethod.DELETE maps DELETE."
      ]
    },

    {
      id: "multiple-http-methods",
      title: "Mapping Multiple HTTP Methods",

      paragraphs: [
        "@RequestMapping can specify multiple HTTP methods when the same controller method should handle more than one method."
      ],

      code: {
        language: "java",
        code: `@RequestMapping(
        value = "/employees",
        method = {
            RequestMethod.GET,
            RequestMethod.POST
        }
)
public String handleEmployeeRequest() {
    return "Employee request handled";
}`
      },

      bullets: [
        "A mapping can support multiple HTTP methods.",
        "Use this only when the same behavior is appropriate for each method.",
        "Separate methods are often clearer when GET and POST have different behavior."
      ]
    },

    {
      id: "shorthand",
      title: "HTTP Method Shortcut Annotations",

      paragraphs: [
        "Spring provides specialized annotations that make common HTTP method mappings easier to read.",
        "@GetMapping, @PostMapping, @PutMapping, @PatchMapping, and @DeleteMapping are composed annotations based on request mapping semantics."
      ],

      code: {
        language: "java",
        code: `@GetMapping("/employees")
public String getEmployees() {
    return "Employee list";
}

@PostMapping("/employees")
public String createEmployee() {
    return "Employee created";
}

@PutMapping("/employees/{id}")
public String updateEmployee(
        @PathVariable Long id
) {
    return "Employee updated";
}

@PatchMapping("/employees/{id}")
public String patchEmployee(
        @PathVariable Long id
) {
    return "Employee partially updated";
}

@DeleteMapping("/employees/{id}")
public String deleteEmployee(
        @PathVariable Long id
) {
    return "Employee deleted";
}`
      },

      bullets: [
        "@GetMapping → GET.",
        "@PostMapping → POST.",
        "@PutMapping → PUT.",
        "@PatchMapping → PATCH.",
        "@DeleteMapping → DELETE.",
        "Shortcut annotations improve readability.",
        "Use @RequestMapping when you need its broader mapping options."
      ]
    },

    {
      id: "path-variable-mapping",
      title: "Path Variables with @RequestMapping",

      paragraphs: [
        "@RequestMapping can define URL patterns containing path variables.",
        "The controller method can then extract the variable using @PathVariable."
      ],

      code: {
        language: "java",
        code: `@RequestMapping(
        value = "/employees/{id}",
        method = RequestMethod.GET
)
public String getEmployee(
        @PathVariable Long id
) {
    return "Employee ID: " + id;
}`
      },

      output: `GET /api/employees/101

Employee ID: 101`,

      bullets: [
        "The URL contains {id}.",
        "@PathVariable reads the value.",
        "Spring converts the value to Long.",
        "The controller receives id = 101."
      ]
    },

    {
      id: "request-parameters",
      title: "Mapping Based on Request Parameters",

      paragraphs: [
        "@RequestMapping can also restrict a mapping based on query parameters.",
        "This can be useful when different controller methods should handle requests depending on whether a particular query parameter is present."
      ],

      code: {
        language: "java",
        code: `@RequestMapping(
        value = "/employees",
        params = "department"
)
public String searchByDepartment(
        @RequestParam String department
) {
    return "Department: " + department;
}`
      },

      output: `GET /api/employees?department=IT

Department: IT`,

      bullets: [
        "The params attribute can restrict a mapping.",
        "The request must contain the specified parameter for the mapping to match.",
        "@RequestParam can then read the parameter value."
      ]
    },

    {
      id: "headers",
      title: "Mapping Based on HTTP Headers",

      paragraphs: [
        "@RequestMapping can restrict a mapping based on HTTP headers.",
        "This is useful when different request-processing methods should be selected based on a header value."
      ],

      code: {
        language: "java",
        code: `@RequestMapping(
        value = "/employees",
        headers = "X-Client-Type=mobile"
)
public String mobileRequest() {
    return "Mobile client";
}`
      },

      output: `GET /api/employees

X-Client-Type: mobile

Response:

Mobile client`,

      bullets: [
        "The headers attribute can restrict a mapping.",
        "The request must contain a matching header condition.",
        "Header-based mapping should be used only when it provides a clear API design benefit."
      ]
    },

    {
      id: "produces-consumes",
      title: "Consumes and Produces",

      code: {
        language: "java",
        code: `@PostMapping(
        value = "/employees",
        consumes = "application/json",
        produces = "application/json"
)
public Employee createEmployee(
        @RequestBody Employee employee
) {
    return employee;
}`
      },

      paragraphs: [
        "The consumes attribute describes the media type accepted in the request body, while produces describes the media type generated in the response.",
        "For example, consumes = application/json means the endpoint expects a JSON request body.",
        "produces = application/json indicates that the endpoint can produce a JSON response."
      ],

      bullets: [
        "consumes → request media type.",
        "produces → response media type.",
        "application/json is commonly used for REST APIs.",
        "Incorrect media types can cause request-matching or content-negotiation problems."
      ]
    },

    {
      id: "consumes-example",
      title: "Consumes Example",

      paragraphs: [
        "The consumes condition can be used when an endpoint should accept only a specific request representation."
      ],

      code: {
        language: "java",
        code: `@PostMapping(
        value = "/employees",
        consumes = "application/json"
)
public Employee createEmployee(
        @RequestBody Employee employee
) {
    return employee;
}`
      },

      output: `Request:

POST /api/employees

Content-Type: application/json

{
  "name": "Rahul"
}

Accepted because the request uses JSON.`
      ,
      
      bullets: [
        "Content-Type describes the request body format.",
        "The consumes condition checks the request media type.",
        "application/json is common for JSON REST APIs."
      ]
    },

    {
      id: "produces-example",
      title: "Produces Example",

      paragraphs: [
        "The produces condition can be used to indicate the media type generated by the endpoint."
      ],

      code: {
        language: "java",
        code: `@GetMapping(
        value = "/employees",
        produces = "application/json"
)
public List<Employee> getEmployees() {
    return employeeService.getAllEmployees();
}`
      },

      bullets: [
        "produces describes the response media type.",
        "application/json indicates JSON output.",
        "Spring uses content negotiation to select a suitable representation when multiple representations are supported."
      ]
    },

    {
      id: "path-patterns",
      title: "Path Patterns",

      paragraphs: [
        "@RequestMapping can define fixed paths and variable paths.",
        "Path patterns allow a controller to map both collection endpoints and individual resource endpoints."
      ],

      code: {
        language: "java",
        code: `@RequestMapping("/employees")
public class EmployeeController {

    @RequestMapping("/active")
    public String active() {
        return "Active";
    }

    @RequestMapping("/{id}")
    public String employee(
            @PathVariable Long id
    ) {
        return "Employee: " + id;
    }
}`
      },

      output: `GET /api/employees/active
GET /api/employees/101`
      ,
      
      bullets: [
        "Fixed path: /active.",
        "Variable path: /{id}.",
        "Path variables are useful for resource identifiers.",
        "Avoid ambiguous mappings that can match the same request."
      ]
    },

    {
      id: "request-mapping-vs-shortcuts",
      title: "@RequestMapping vs Shortcut Annotations",

      paragraphs: [
        "@RequestMapping is more general, while the HTTP-specific annotations communicate the intended method directly.",
        "For normal REST controllers, shortcut annotations are usually easier to read."
      ],

      code: {
        language: "java",
        code: `// General form

@RequestMapping(
        value = "/employees",
        method = RequestMethod.GET
)
public List<Employee> getEmployees() {
    return employeeService.getAllEmployees();
}


// Shortcut form

@GetMapping("/employees")
public List<Employee> getEmployees() {
    return employeeService.getAllEmployees();
}`
      },

      bullets: [
        "@RequestMapping is flexible.",
        "@GetMapping clearly communicates GET semantics.",
        "Shortcut annotations reduce boilerplate.",
        "Use @RequestMapping when its additional mapping options are useful."
      ]
    },

    {
      id: "complete-controller",
      title: "Complete @RequestMapping Controller",

      paragraphs: [
        "The following example demonstrates class-level mapping, method-level mapping, path variables, request parameters, request bodies, and HTTP methods in one controller."
      ],

      code: {
        language: "java",
        code: `@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @RequestMapping(
            method = RequestMethod.GET
    )
    public List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET
    )
    public Employee getEmployee(
            @PathVariable Long id
    ) {
        return employeeService.getEmployee(id);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<Employee> createEmployee(
            @RequestBody Employee employee
    ) {
        Employee saved =
                employeeService.createEmployee(employee);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @RequestMapping(
            value = "/search",
            method = RequestMethod.GET
    )
    public List<Employee> searchEmployees(
            @RequestParam String department
    ) {
        return employeeService
                .searchByDepartment(department);
    }
}`
      },

      bullets: [
        "Class-level @RequestMapping provides /api/employees.",
        "Method-level mappings add operation-specific paths.",
        "RequestMethod restricts the HTTP method.",
        "@PathVariable reads the resource ID.",
        "@RequestParam reads query parameters.",
        "@RequestBody reads JSON request data.",
        "consumes restricts request media types.",
        "produces specifies response media types."
      ]
    },

    {
      id: "mapping-conflicts",
      title: "Mapping Conflicts and Ambiguous Endpoints",

      paragraphs: [
        "Spring needs to determine a unique handler method for an incoming request.",
        "If two controller methods have mappings that are indistinguishable for the same request, Spring can report an ambiguous mapping during application startup.",
        "Clear URL patterns and HTTP method conditions help prevent mapping conflicts."
      ],

      code: {
        language: "java",
        code: `// Avoid ambiguous mappings such as:

@GetMapping("/employees/{value}")
public String methodOne(
        @PathVariable String value
) {
    return "One";
}

@GetMapping("/employees/{name}")
public String methodTwo(
        @PathVariable String name
) {
    return "Two";
}`
      },

      bullets: [
        "Changing only the path-variable name does not create a different path pattern.",
        "/employees/{value} and /employees/{name} can match the same requests.",
        "Use distinct paths or additional mapping conditions.",
        "Check startup errors when Spring reports ambiguous mappings."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common @RequestMapping Mistakes",

      paragraphs: [
        "Understanding request mapping helps avoid controller routing problems that can otherwise be confusing during development."
      ],

      bullets: [
        "Mistake 1: Forgetting the class-level URL prefix when testing an endpoint.",
        "Mistake 2: Using the wrong HTTP method.",
        "Mistake 3: Creating two mappings that can match the same request.",
        "Mistake 4: Forgetting that class-level and method-level paths are combined.",
        "Mistake 5: Using consumes incorrectly when the client sends a different Content-Type.",
        "Mistake 6: Using produces incorrectly when the requested response representation is not supported.",
        "Mistake 7: Using @RequestMapping everywhere when @GetMapping or @PostMapping would make the API clearer.",
        "Mistake 8: Forgetting @PathVariable when the method expects a value from the URL.",
        "Mistake 9: Confusing query parameters with path variables.",
        "Mistake 10: Creating ambiguous mappings."
      ]
    },

    {
      id: "testing-postman",
      title: "Testing @RequestMapping with Postman",

      paragraphs: [
        "Postman can be used to verify whether Spring correctly maps requests to the intended controller methods."
      ],

      code: {
        language: "text",
        code: `Class mapping:

@RequestMapping("/api/employees")


Test 1:

GET http://localhost:8080/api/employees


Test 2:

GET http://localhost:8080/api/employees/101


Test 3:

POST http://localhost:8080/api/employees

Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@example.com"
}


Test 4:

GET http://localhost:8080/api/employees/search?department=IT`
      },

      bullets: [
        "Verify the HTTP method.",
        "Verify the complete URL.",
        "Verify request headers.",
        "Verify the request body for POST, PUT, and PATCH.",
        "Check the response status and body.",
        "Check Spring logs when debugging mapping problems."
      ]
    },

    {
      id: "request-mapping-debugging",
      title: "Debugging Mapping Problems",

      paragraphs: [
        "When Spring returns an unexpected 404 or method-not-supported response, first verify the controller mapping and the actual HTTP request."
      ],

      code: {
        language: "text",
        code: `Debug checklist:

1. Is the controller annotated with @RestController?

2. Is the class-level @RequestMapping correct?

3. Is the method-level mapping correct?

4. Is the HTTP method correct?

5. Does the URL contain the expected path variable?

6. Are consumes and Content-Type compatible?

7. Are produces and the requested response representation compatible?

8. Is another controller using an overlapping mapping?

9. Is the controller inside Spring's component scan?

10. Are you calling the correct application port?`
      },

      bullets: [
        "Check controller annotations.",
        "Check the complete combined URL.",
        "Check the HTTP method.",
        "Check Content-Type.",
        "Check Accept headers when content negotiation is involved.",
        "Check for overlapping mappings.",
        "Check application startup logs."
      ]
    },

    {
      id: "interview",
      title: "@RequestMapping Interview Questions",

      interviewQuestions: [
        {
          question: "What is @RequestMapping?",
          answer:
            "@RequestMapping maps HTTP requests to Spring controller classes or methods."
        },
        {
          question: "Can @RequestMapping be used at class level?",
          answer:
            "Yes. It is commonly used at class level to define a common URL prefix."
        },
        {
          question: "Can @RequestMapping be used at method level?",
          answer:
            "Yes. It can define the path and other request-matching conditions for a specific controller method."
        },
        {
          question: "What happens when class-level and method-level mappings are used together?",
          answer:
            "Spring combines the class-level and method-level mappings to form the endpoint path."
        },
        {
          question: "What is the difference between @RequestMapping and @GetMapping?",
          answer:
            "@GetMapping is a specialized shortcut for mapping GET requests, while @RequestMapping can map different HTTP methods and supports broader mapping conditions."
        },
        {
          question: "Which annotations are shortcuts for @RequestMapping?",
          answer:
            "@GetMapping, @PostMapping, @PutMapping, @PatchMapping, and @DeleteMapping are commonly used HTTP-method-specific mapping annotations."
        },
        {
          question: "How do you specify an HTTP method using @RequestMapping?",
          answer:
            "Use the method attribute with RequestMethod, such as @RequestMapping(value = \"/employees\", method = RequestMethod.GET)."
        },
        {
          question: "Can @RequestMapping support multiple HTTP methods?",
          answer:
            "Yes. The method attribute can contain multiple RequestMethod values."
        },
        {
          question: "What does consumes mean?",
          answer:
            "consumes specifies the media types that the endpoint accepts in the request body."
        },
        {
          question: "What does produces mean?",
          answer:
            "produces specifies the media types that the endpoint can produce in its response."
        },
        {
          question: "What is the difference between consumes and produces?",
          answer:
            "consumes applies to the request representation, while produces applies to the response representation."
        },
        {
          question: "What is a class-level @RequestMapping used for?",
          answer:
            "It is commonly used to define a shared URL prefix for all or many endpoints in a controller."
        },
        {
          question: "Can @RequestMapping use path variables?",
          answer:
            "Yes. A mapping can contain placeholders such as /employees/{id}, which can be read using @PathVariable."
        },
        {
          question: "Can @RequestMapping match query parameters?",
          answer:
            "Yes. The params attribute can be used to restrict a mapping based on query parameters."
        },
        {
          question: "Can @RequestMapping match HTTP headers?",
          answer:
            "Yes. The headers attribute can be used to restrict a mapping based on HTTP headers."
        },
        {
          question: "What happens if two mappings are ambiguous?",
          answer:
            "Spring may report an ambiguous mapping because it cannot determine a unique handler method for the request."
        },
        {
          question: "Why are shortcut annotations commonly preferred?",
          answer:
            "They make the intended HTTP method immediately visible and usually improve controller readability."
        },
        {
          question: "What is the role of DispatcherServlet in request mapping?",
          answer:
            "DispatcherServlet receives the request and coordinates Spring MVC processing, including selecting an appropriate handler through Spring's handler mapping infrastructure."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You want every endpoint in EmployeeController to start with /api/employees. What would you use?",
          answer:
            "Use class-level @RequestMapping(\"/api/employees\")."
        },
        {
          question:
            "You need GET /api/employees/101. How would you map it?",
          answer:
            "Use a mapping such as @GetMapping(\"/{id}\") with @PathVariable Long id, or use @RequestMapping with method = RequestMethod.GET."
        },
        {
          question:
            "You want one endpoint to accept only JSON request bodies. What would you use?",
          answer:
            "Use consumes = \"application/json\" in the mapping."
        },
        {
          question:
            "You want an endpoint to return JSON. What mapping option can communicate that?",
          answer:
            "Use produces = \"application/json\"."
        },
        {
          question:
            "Two methods use /employees/{id} and /employees/{name}. Why can this be a problem?",
          answer:
            "The variable names do not make the patterns different. Both mappings can match the same URL, which can cause an ambiguous mapping."
        },
        {
          question:
            "You have @RequestMapping(\"/api/employees\") at class level and @GetMapping(\"/{id}\") at method level. What is the final endpoint?",
          answer:
            "GET /api/employees/{id}."
        },
        {
          question:
            "A POST request contains Content-Type text/plain but the endpoint consumes application/json. What can happen?",
          answer:
            "The request may not match the endpoint because its Content-Type does not satisfy the consumes condition."
        },
        {
          question:
            "Why would you choose @GetMapping instead of @RequestMapping(method = RequestMethod.GET)?",
          answer:
            "Both can express GET mapping, but @GetMapping is shorter and communicates the HTTP method more clearly."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Reference",

      code: {
        language: "text",
        code: `Class-level:

@RequestMapping("/api/employees")


GET:

@GetMapping("/employees")


POST:

@PostMapping("/employees")


PUT:

@PutMapping("/employees/{id}")


PATCH:

@PatchMapping("/employees/{id}")


DELETE:

@DeleteMapping("/employees/{id}")


General GET mapping:

@RequestMapping(
    value = "/employees",
    method = RequestMethod.GET
)


Request media type:

consumes = "application/json"


Response media type:

produces = "application/json"


Query parameter condition:

params = "department"


Header condition:

headers = "X-Client-Type=mobile"`
      },

      bullets: [
        "@RequestMapping → general-purpose request mapping.",
        "@GetMapping → GET.",
        "@PostMapping → POST.",
        "@PutMapping → PUT.",
        "@PatchMapping → PATCH.",
        "@DeleteMapping → DELETE.",
        "consumes → accepted request media type.",
        "produces → response media type.",
        "params → query-parameter mapping condition.",
        "headers → header mapping condition."
      ]
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "@RequestMapping is a general Spring MVC request-mapping annotation. It can be used at class or method level and can match requests using paths, HTTP methods, parameters, headers, consumes, and produces."
      ],

      bullets: [
        "@RequestMapping maps HTTP requests to controller classes or methods.",
        "Class-level mapping commonly defines a common URL prefix.",
        "Method-level mapping defines a specific endpoint.",
        "Class-level and method-level paths are combined.",
        "method = RequestMethod.GET maps GET requests.",
        "@GetMapping is the shortcut for GET.",
        "@PostMapping is the shortcut for POST.",
        "@PutMapping is the shortcut for PUT.",
        "@PatchMapping is the shortcut for PATCH.",
        "@DeleteMapping is the shortcut for DELETE.",
        "consumes → request media type.",
        "produces → response media type.",
        "params → query-parameter mapping condition.",
        "headers → HTTP-header mapping condition.",
        "@PathVariable reads values from URL path variables.",
        "@RequestParam reads values from query parameters.",
        "@RequestBody reads structured request data.",
        "Avoid ambiguous mappings.",
        "Use HTTP-specific shortcut annotations when they improve readability.",
        "Always test the complete URL including the class-level prefix.",
        "Check Content-Type when consumes is configured.",
        "Check response content negotiation when produces is configured."
      ]
    }
  ]
};
