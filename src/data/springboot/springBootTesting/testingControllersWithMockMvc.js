
export const testingControllersWithMockMvc = {
  id: 1307,
  title: "Testing Controllers with MockMvc",
  slug: "testing-controllers-with-mockmvc",
  topicTitle: "Spring Boot Testing",
  description:
    "Test Spring MVC endpoints, HTTP status codes, JSON responses, request handling, validation, exceptions, and controller-service interactions using MockMvc.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "mockmvc",
      title: "What Is MockMvc?",
      paragraphs: [
        "MockMvc lets tests exercise Spring MVC request handling without launching a real HTTP server. It can send simulated HTTP requests through the configured MVC infrastructure and inspect status codes, headers, and response bodies.",
        "MockMvc is useful for verifying controller mappings, request parameter handling, JSON serialization, validation, and exception-handling behavior. Depending on the test configuration, the service layer can be mocked or real application components can be loaded.",
        "MockMvc is especially useful for controller-focused tests because it allows the test to work with the HTTP contract of the application while avoiding the overhead of starting a real web server."
      ],
      bullets: [
        "Perform simulated HTTP requests.",
        "Verify HTTP status codes.",
        "Inspect response headers.",
        "Inspect JSON response fields.",
        "Test request validation.",
        "Test controller mappings.",
        "Test request parameters and path variables.",
        "Test exception responses.",
        "Test JSON request bodies."
      ]
    },
    {
      id: "mockmvc-flow",
      title: "How MockMvc Works",
      paragraphs: [
        "MockMvc does not normally send a network request to a real running server. Instead, it exercises Spring MVC's request-processing infrastructure in the test context.",
        "The request is matched against controller mappings, parameters and bodies are resolved, the controller method executes, and MockMvc captures the resulting HTTP response so the test can make assertions."
      ],
      code: {
        language: "text",
        code: `MockMvc Test
     |
     v
mockMvc.perform(...)
     |
     v
Spring MVC
     |
     v
Request Mapping
     |
     v
Controller
     |
     v
Controller Result
     |
     v
HTTP Response
     |
     +--> Status
     +--> Headers
     +--> JSON Body
     +--> Content
     |
     v
andExpect(...)`
      },
      bullets: [
        "MockMvc simulates MVC request processing.",
        "A real network port is not required for the normal MockMvc approach.",
        "The controller mapping is exercised.",
        "The resulting HTTP response can be asserted."
      ]
    },
    {
      id: "webmvctest",
      title: "What Is @WebMvcTest?",
      paragraphs: [
        "@WebMvcTest is a Spring Boot test-slice annotation focused on Spring MVC components. It is commonly used when the goal is to test controllers and their HTTP behavior without loading the complete application context.",
        "When a controller depends on a service, the service is commonly mocked or supplied as a test dependency because the test is focused on the controller layer.",
        "This makes @WebMvcTest different from @SpringBootTest. The latter can load the complete application context and is therefore broader and usually more expensive."
      ],
      code: {
        language: "text",
        code: `@WebMvcTest

Test
 |
 v
MVC Test Context
 |
 +--> Controller
 +--> MVC infrastructure
 +--> JSON conversion
 +--> Validation
 |
 +--> Mock Service
 |
 v
MockMvc


@SpringBootTest

Test
 |
 v
Complete Application Context
 |
 +--> Controller
 +--> Service
 +--> Repository
 +--> Configuration
 +--> Security
 +--> Other beans`
      },
      bullets: [
        "@WebMvcTest is focused on MVC testing.",
        "MockMvc is commonly injected into the test.",
        "Controller dependencies can be mocked.",
        "@SpringBootTest is broader than @WebMvcTest."
      ]
    },
    {
      id: "controller",
      title: "Example Controller",
      paragraphs: [
        "Consider a REST controller that returns a greeting. The controller can be tested using the MVC test support and a request to its mapped URL."
      ],
      code: {
        language: "java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class GreetingController {

    @GetMapping("/api/v1/greeting")
    GreetingResponse greeting() {
        return new GreetingResponse(
            "Hello, CodeForge!"
        );
    }

    record GreetingResponse(String message) {}
}`
      },
      bullets: [
        "@RestController exposes HTTP endpoints.",
        "@GetMapping maps the GET request.",
        "The returned object is serialized into JSON by Spring MVC."
      ]
    },
    {
      id: "controller-test",
      title: "Write a MockMvc Test",
      paragraphs: [
        "The @WebMvcTest annotation loads a focused MVC test configuration. The test below checks that the endpoint returns HTTP 200 and the expected JSON message."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GreetingController.class)
class GreetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnGreeting() throws Exception {
        mockMvc.perform(
                get("/api/v1/greeting")
        )
        .andExpect(status().isOk())
        .andExpect(
            jsonPath("$.message")
                .value("Hello, CodeForge!")
        );
    }
}`
      },
      bullets: [
        "MockMvc performs the request.",
        "status().isOk() checks for HTTP 200.",
        "jsonPath() checks a field in the JSON response.",
        "The URL must match the controller mapping.",
        "If Spring Security applies to the test, authentication and CSRF configuration may also need to be accounted for."
      ]
    },
    {
      id: "get-request",
      title: "Testing GET Requests",
      paragraphs: [
        "GET requests are commonly used to retrieve resources. MockMvc can verify the URL, status code, response body, and important headers."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees/1")
    )
    .andExpect(status().isOk())
    .andExpect(
        jsonPath("$.id")
            .value(1)
    )
    .andExpect(
        jsonPath("$.name")
            .value("Ravi")
    );`
      },
      bullets: [
        "Use get() for a GET request.",
        "Verify the expected success status.",
        "Verify important response fields.",
        "Test missing resources separately."
      ]
    },
    {
      id: "path-variable",
      title: "Testing Path Variables",
      paragraphs: [
        "Path variables are values embedded in the URL, such as /employees/10. MockMvc can pass these values directly through the request URL."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees/{id}", 10L)
    )
    .andExpect(status().isOk())
    .andExpect(
        jsonPath("$.id")
            .value(10)
    );`
      },
      bullets: [
        "Use path variables for resource identity.",
        "Pass the variable as an argument to get(), post(), put(), or delete().",
        "Test invalid identifiers when the controller validates them."
      ]
    },
    {
      id: "request-param",
      title: "Testing Query Parameters",
      paragraphs: [
        "Query parameters are commonly used for filtering, searching, sorting, and pagination. MockMvc provides param() for adding query parameters."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees")
            .param("name", "Ravi")
            .param("page", "0")
            .param("size", "10")
    )
    .andExpect(status().isOk());`
      },
      bullets: [
        "Use param() to add query parameters.",
        "Test required parameters.",
        "Test optional parameters.",
        "Test invalid parameter values."
      ]
    },
    {
      id: "request-body",
      title: "Testing POST Requests",
      paragraphs: [
        "MockMvc can also send JSON request bodies to POST endpoints. Tests can verify successful creation, validation errors, and the response returned by the controller.",
        "Use appropriate Content-Type headers for JSON requests and assert the actual HTTP contract rather than only checking that the request completed."
      ],
      code: {
        language: "java",
        code: `import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import org.springframework.http.MediaType;

mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi"
                }
                """)
    )
    .andExpect(status().isCreated())
    .andExpect(
        jsonPath("$.name")
            .value("Ravi")
    );`
      },
      bullets: [
        "Use post() for POST requests.",
        "Use contentType() for the request media type.",
        "Use content() for the JSON request body.",
        "The endpoint must actually be configured to return HTTP 201.",
        "The request fields and response assertions must match your application's DTOs."
      ]
    },
    {
      id: "content-type",
      title: "Content-Type and Accept Headers",
      paragraphs: [
        "Content-Type describes the format of the request body. For JSON requests, use application/json.",
        "Accept describes the response media types the client can accept. MockMvc can set both headers so that controller behavior involving content negotiation can be tested."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi"
                }
                """)
    )
    .andExpect(status().isCreated());`
      },
      bullets: [
        "Content-Type describes the request body.",
        "Accept describes the expected response representation.",
        "JSON requests normally use application/json.",
        "Test content negotiation when it is part of the API contract."
      ]
    },
    {
      id: "put-request",
      title: "Testing PUT Requests",
      paragraphs: [
        "PUT is commonly used to update or replace a resource. MockMvc can send the resource identifier as a path variable and the updated representation as JSON."
      ],
      code: {
        language: "java",
        code: `import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

mockMvc.perform(
        put("/api/v1/employees/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi Kumar"
                }
                """)
    )
    .andExpect(status().isOk())
    .andExpect(
        jsonPath("$.name")
            .value("Ravi Kumar")
    );`
      },
      bullets: [
        "Test the correct resource identifier.",
        "Test the request body.",
        "Verify the expected success status.",
        "Test the missing-resource case separately."
      ]
    },
    {
      id: "patch-request",
      title: "Testing PATCH Requests",
      paragraphs: [
        "PATCH is commonly used for partial updates. The exact request structure depends on the API design, so tests should follow the application's defined contract."
      ],
      code: {
        language: "java",
        code: `import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;

mockMvc.perform(
        patch("/api/v1/employees/{id}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi Kumar"
                }
                """)
    )
    .andExpect(status().isOk());`
      },
      bullets: [
        "Test only the fields that the PATCH contract allows to change.",
        "Test invalid partial updates.",
        "Test missing resources.",
        "Do not assume PATCH semantics are identical to PUT."
      ]
    },
    {
      id: "delete-request",
      title: "Testing DELETE Requests",
      paragraphs: [
        "DELETE endpoints should be tested for successful deletion and for important failure cases such as a resource that does not exist."
      ],
      code: {
        language: "java",
        code: `import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

mockMvc.perform(
        delete("/api/v1/employees/{id}", 1L)
    )
    .andExpect(status().isNoContent());`
      },
      bullets: [
        "Use delete() for DELETE requests.",
        "Verify the expected status code.",
        "Verify response content when the API returns a body.",
        "Test not-found behavior when applicable."
      ]
    },
    {
      id: "status-codes",
      title: "Testing HTTP Status Codes",
      paragraphs: [
        "Controller tests should verify status codes because the HTTP status is part of the API contract. Do not test only the JSON body.",
        "Common statuses include 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, and 404 Not Found."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees/1")
    )
    .andExpect(status().isOk());

mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi"
                }
                """)
    )
    .andExpect(status().isCreated());

mockMvc.perform(
        delete("/api/v1/employees/1")
    )
    .andExpect(status().isNoContent());`
      },
      bullets: [
        "200 = successful request with a response.",
        "201 = resource successfully created.",
        "204 = successful operation with no response body.",
        "400 = invalid client request.",
        "401 = authentication is missing or invalid.",
        "403 = request is understood but access is not allowed.",
        "404 = requested resource was not found."
      ]
    },
    {
      id: "json-response",
      title: "Testing JSON Responses with jsonPath",
      paragraphs: [
        "jsonPath allows a test to inspect specific fields in a JSON response without manually parsing the entire response string.",
        "This is especially useful for REST APIs because controller responses are commonly serialized as JSON."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees/1")
    )
    .andExpect(status().isOk())
    .andExpect(
        jsonPath("$.id")
            .value(1)
    )
    .andExpect(
        jsonPath("$.name")
            .value("Ravi")
    )
    .andExpect(
        jsonPath("$.email")
            .value("ravi@example.com")
    );`
      },
      bullets: [
        "$.name accesses a top-level JSON field.",
        "$.employee.name can access a nested field.",
        "$[0] can access the first array element.",
        "Use jsonPath for important response fields.",
        "Avoid asserting every insignificant field."
      ]
    },
    {
      id: "json-array",
      title: "Testing JSON Arrays",
      paragraphs: [
        "List endpoints commonly return JSON arrays. MockMvc can verify the number of returned elements and important values inside the array."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees")
    )
    .andExpect(status().isOk())
    .andExpect(
        jsonPath("$.length()")
            .value(2)
    )
    .andExpect(
        jsonPath("$[0].name")
            .value("Ravi")
    )
    .andExpect(
        jsonPath("$[1].name")
            .value("Arun")
    );`
      },
      bullets: [
        "Use $.length() to verify array size.",
        "Use $[0] for the first element.",
        "Use $[1] for the second element.",
        "Verify ordering only when ordering is part of the API contract."
      ]
    },
    {
      id: "headers",
      title: "Testing Response Headers",
      paragraphs: [
        "MockMvc can also verify HTTP response headers. This is useful when an endpoint returns Location, Content-Type, caching, or custom headers that are part of the API contract."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": "Ravi"
                }
                """)
    )
    .andExpect(status().isCreated())
    .andExpect(
        header().string(
            "Content-Type",
            org.hamcrest.Matchers.containsString(
                "application/json"
            )
        )
    );`
      },
      bullets: [
        "Verify important headers when they are part of the contract.",
        "Location is commonly relevant for 201 Created responses.",
        "Content-Type can be verified for JSON APIs."
      ]
    },
    {
      id: "service-mock",
      title: "Mocking the Service Layer",
      paragraphs: [
        "When the controller is the unit under test, the service layer is commonly mocked. This allows the test to focus on HTTP mapping, request handling, response conversion, and controller behavior.",
        "The service mock should return controlled data for the scenario being tested."
      ],
      code: {
        language: "java",
        code: `@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService service;

    @Test
    void shouldReturnEmployee() throws Exception {

        when(service.findById(1L))
                .thenReturn(
                    new EmployeeDto(
                        1L,
                        "Ravi"
                    )
                );

        mockMvc.perform(
                get("/api/v1/employees/1")
            )
            .andExpect(status().isOk())
            .andExpect(
                jsonPath("$.name")
                    .value("Ravi")
            );
    }
}`
      },
      bullets: [
        "The service is replaced with a controlled test dependency.",
        "The controller remains the primary component under test.",
        "Use the Mockito integration appropriate for your Spring Boot version.",
        "Do not use the controller test to verify service business logic."
      ]
    },
    {
      id: "validation",
      title: "Testing Request Validation",
      paragraphs: [
        "Controller tests can verify Bean Validation behavior for request DTOs. For example, a create-employee request may require a non-blank name.",
        "The test should send invalid JSON and verify that the controller returns the expected validation status and error response."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name": ""
                }
                """)
    )
    .andExpect(
        status().isBadRequest()
    );`
      },
      bullets: [
        "Test missing required fields.",
        "Test blank strings.",
        "Test invalid formats.",
        "Test minimum and maximum length constraints.",
        "Verify the API's standard validation error structure when one exists."
      ]
    },
    {
      id: "exception-handling",
      title: "Testing Exception Handling",
      paragraphs: [
        "Controller tests can verify how exceptions are converted into HTTP responses. If a service throws EmployeeNotFoundException and a global exception handler converts it to 404, the controller-level HTTP test can verify that contract.",
        "This allows the test to focus on the observable API behavior rather than the internal exception-handling implementation."
      ],
      code: {
        language: "java",
        code: `when(service.findById(99L))
        .thenThrow(
            new EmployeeNotFoundException(
                "Employee not found"
            )
        );

mockMvc.perform(
        get("/api/v1/employees/99")
    )
    .andExpect(
        status().isNotFound()
    )
    .andExpect(
        jsonPath("$.message")
            .value("Employee not found")
    );`
      },
      bullets: [
        "Test important exception-to-status mappings.",
        "Verify the error response structure.",
        "Test resource-not-found scenarios.",
        "Test validation and conflict responses when applicable."
      ]
    },
    {
      id: "request-body-json",
      title: "Testing JSON Request Bodies",
      paragraphs: [
        "A controller test should verify that JSON sent by the client is correctly converted into the request DTO and passed into the application layer.",
        "The test can also verify the resulting response after the service is mocked."
      ],
      code: {
        language: "java",
        code: `String requestBody = """
    {
      "name": "Ravi",
      "email": "ravi@example.com"
    }
    """;

when(service.createEmployee(
        any(EmployeeRequest.class)
)).thenReturn(
    new EmployeeDto(
        1L,
        "Ravi"
    )
);

mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody)
    )
    .andExpect(status().isCreated())
    .andExpect(
        jsonPath("$.name")
            .value("Ravi")
    );`
      },
      bullets: [
        "Set Content-Type to application/json.",
        "Provide valid JSON syntax.",
        "Match JSON field names with the request DTO.",
        "Mock the service response when the service is outside the controller test scope."
      ]
    },
    {
      id: "security",
      title: "Testing Controllers with Spring Security",
      paragraphs: [
        "If Spring Security is part of the MVC test configuration, requests may require authentication or CSRF handling. The exact test setup depends on how security is configured.",
        "Security tests should distinguish authentication failures from authorization failures. A protected endpoint should not accidentally become accessible simply because a controller test bypassed security configuration."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/admin/employees")
    )
    .andExpect(
        status().isUnauthorized()
    );`
      },
      bullets: [
        "Test unauthenticated access where required.",
        "Test authenticated users.",
        "Test insufficient roles or permissions.",
        "Account for CSRF when testing state-changing requests with the relevant security setup.",
        "Do not accidentally disable security in tests when security behavior itself is what you are testing."
      ]
    },
    {
      id: "request-headers",
      title: "Testing Request Headers",
      paragraphs: [
        "MockMvc can send request headers using header(). This is useful when an endpoint requires correlation IDs, content negotiation, authorization information, or another request header."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        get("/api/v1/employees")
            .header(
                "X-Correlation-Id",
                "test-123"
            )
    )
    .andExpect(status().isOk());`
      },
      bullets: [
        "Use header() to add request headers.",
        "Test required custom headers when they are part of the API contract.",
        "Test missing required headers when validation is implemented."
      ]
    },
    {
      id: "bad-request",
      title: "Testing Bad Requests",
      paragraphs: [
        "A good controller test suite includes malformed or invalid requests. These tests verify that the API rejects invalid input using the expected status and error representation."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        post("/api/v1/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "name":
                }
                """)
    )
    .andExpect(
        status().isBadRequest()
    );`
      },
      bullets: [
        "Test malformed JSON.",
        "Test missing required fields.",
        "Test invalid field values.",
        "Verify the standard error response when applicable."
      ]
    },
    {
      id: "not-found",
      title: "Testing 404 Not Found",
      paragraphs: [
        "Controller tests should verify the not-found behavior when a requested resource does not exist. The service can be mocked to simulate the missing-resource condition."
      ],
      code: {
        language: "java",
        code: `when(service.findById(999L))
        .thenThrow(
            new EmployeeNotFoundException(
                "Employee not found"
            )
        );

mockMvc.perform(
        get("/api/v1/employees/999")
    )
    .andExpect(
        status().isNotFound()
    );`
      },
      bullets: [
        "Simulate the missing resource through the service mock.",
        "Verify the expected HTTP status.",
        "Verify the error body when it is part of the API contract."
      ]
    },
    {
      id: "full-crud-test",
      title: "Testing a Complete CRUD Controller",
      paragraphs: [
        "A realistic controller test class may contain tests for retrieving a single resource, retrieving a list, creating a resource, updating it, and deleting it.",
        "Each test should focus on one HTTP behavior and mock the service responses required for that scenario."
      ],
      code: {
        language: "text",
        code: `EmployeeControllerTest

GET /employees
    |
    +--> 200 + JSON list

GET /employees/{id}
    |
    +--> 200 + JSON employee
    |
    +--> 404 when missing

POST /employees
    |
    +--> 201 + created employee
    |
    +--> 400 when invalid

PUT /employees/{id}
    |
    +--> 200 + updated employee
    |
    +--> 404 when missing

DELETE /employees/{id}
    |
    +--> 204
    |
    +--> 404 when missing`
      },
      bullets: [
        "Cover the important CRUD operations.",
        "Cover both success and failure responses.",
        "Keep each test focused.",
        "Do not duplicate service-layer tests inside controller tests."
      ]
    },
    {
      id: "mockmvc-vs-real-server",
      title: "MockMvc vs Real HTTP Testing",
      paragraphs: [
        "MockMvc exercises Spring MVC without requiring a real network server. It is therefore fast and useful for controller-level tests.",
        "A real HTTP client against a running application tests more infrastructure, including actual server behavior, network-level configuration, and the deployed application boundary. Both approaches can be useful depending on the test goal."
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
Response


Real HTTP Test

Test Client
 |
 | HTTP
 v
Server
 |
 v
Spring MVC
 |
 v
Controller
 |
 v
Response`
      },
      bullets: [
        "MockMvc is usually faster.",
        "MockMvc does not require a real HTTP port for normal usage.",
        "Real HTTP tests exercise a broader runtime boundary.",
        "Use MockMvc for focused controller behavior.",
        "Use broader integration or end-to-end tests when real server behavior matters."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common MockMvc Testing Mistakes",
      paragraphs: [
        "Most MockMvc problems come from testing the wrong layer, forgetting required dependencies, asserting the wrong status code, or misunderstanding the test context."
      ],
      bullets: [
        "Using @SpringBootTest when a focused @WebMvcTest is sufficient.",
        "Forgetting to provide a controller dependency required by the MVC test context.",
        "Forgetting Content-Type for JSON request bodies.",
        "Using an incorrect URL.",
        "Expecting 200 when the controller returns 201 or 204.",
        "Testing service business logic in controller tests.",
        "Ignoring validation failures.",
        "Ignoring security configuration.",
        "Asserting every response field instead of important contract fields.",
        "Using invalid JSON in a test that is supposed to test successful processing.",
        "Mocking the controller itself instead of its dependencies."
      ]
    },
    {
      id: "best-practices",
      title: "MockMvc Best Practices",
      paragraphs: [
        "Good MockMvc tests focus on the HTTP contract of the controller. They verify what a client can observe rather than duplicating internal service implementation.",
        "Keep controller tests readable, deterministic, and focused on status codes, request handling, validation, response structure, and important headers."
      ],
      bullets: [
        "Use @WebMvcTest for focused MVC tests when appropriate.",
        "Mock service dependencies rather than the controller.",
        "Verify status codes.",
        "Verify important response fields.",
        "Test request validation.",
        "Test important exception responses.",
        "Test authentication and authorization behavior where relevant.",
        "Keep controller tests independent from database state.",
        "Avoid duplicating service business-logic tests.",
        "Use realistic request and response examples."
      ]
    },
    {
      id: "testing-flow",
      title: "Complete MockMvc Testing Flow",
      paragraphs: [
        "The complete flow begins with a test constructing a MockMvc request. Spring MVC resolves the route, converts request data, invokes the controller, and serializes the response. MockMvc then allows the test to assert the resulting HTTP contract."
      ],
      code: {
        language: "text",
        code: `JUnit Test
    |
    v
mockMvc.perform(...)
    |
    v
HTTP Request Simulation
    |
    v
Handler Mapping
    |
    v
Controller
    |
    +--> Service Mock
    |
    v
Controller Response
    |
    v
JSON Serialization
    |
    v
MockMvc Result
    |
    +--> Status assertion
    +--> Header assertion
    +--> JSON assertion
    +--> Content assertion`
      }
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is MockMvc?",
          answer:
            "MockMvc tests Spring MVC request handling without starting a real HTTP server. It can simulate requests and verify status codes, headers, and response content."
        },
        {
          question: "What does @WebMvcTest do?",
          answer:
            "It loads a focused Spring MVC test context, typically for selected controllers and related MVC components."
        },
        {
          question: "Can MockMvc test JSON responses?",
          answer:
            "Yes. It can assert HTTP status, headers, content, and JSON fields using matchers such as jsonPath."
        },
        {
          question: "Why use @WebMvcTest instead of @SpringBootTest?",
          answer:
            "@WebMvcTest provides a focused MVC test slice and is generally lighter when the goal is to test controller behavior. @SpringBootTest loads a broader application context."
        },
        {
          question: "How do you test a POST request with MockMvc?",
          answer:
            "Use post(), set Content-Type to application/json, provide the JSON request body with content(), and assert the expected status and response."
        },
        {
          question: "How do you test a path variable?",
          answer:
            "Pass the path variable as an argument to the MockMvc request builder, for example get(\"/employees/{id}\", 1L), and assert the resulting response."
        },
        {
          question: "What is jsonPath() used for?",
          answer:
            "jsonPath() is used to inspect specific values or structures inside a JSON response."
        },
        {
          question: "How do you test controller validation?",
          answer:
            "Send invalid request data and assert the expected validation status, commonly 400 Bad Request, along with the expected error structure when the API defines one."
        },
        {
          question: "Should controller tests use a real database?",
          answer:
            "Usually not when using a focused @WebMvcTest. The service can be mocked so that the controller test focuses on HTTP behavior. Database behavior should be tested separately."
        },
        {
          question: "How do you test a service exception in a controller test?",
          answer:
            "Configure the mocked service to throw the expected exception, perform the HTTP request, and assert that the controller or exception handler produces the expected HTTP status and error response."
        },
        {
          question: "Does MockMvc start Tomcat?",
          answer:
            "Normal MockMvc controller tests do not require a real HTTP server or network port. They exercise Spring MVC request handling within the test context."
        },
        {
          question: "What should controller tests verify?",
          answer:
            "They should verify the HTTP contract: request mapping, parameters, validation, status codes, response structure, important headers, and relevant security or exception behavior."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "Your controller returns 201 Created, but your MockMvc test expects 200 OK. What should you do?",
          answer:
            "Check the API contract and controller implementation. If resource creation correctly returns 201, the test should assert 201 rather than changing the controller merely to satisfy the test."
        },
        {
          question:
            "A @WebMvcTest fails because a service bean is missing. Why?",
          answer:
            "The controller depends on that service, but the focused MVC test context does not provide the required dependency automatically in the same way as a full application context. Mock or otherwise provide the dependency using the appropriate Spring test mechanism."
        },
        {
          question:
            "A controller test passes but the database query is broken. Why?",
          answer:
            "The controller test may mock the service, so the real service and repository were never executed. Repository and service behavior require their own appropriate tests."
        },
        {
          question:
            "How would you test an employee creation API?",
          answer:
            "Send a POST request with JSON using MockMvc, set Content-Type to application/json, mock the service response, assert 201 Created, and verify important response fields. Add separate tests for validation failures and conflicts."
        },
        {
          question:
            "How would you test an endpoint that requires authentication?",
          answer:
            "Configure the MVC test with the application's security setup as appropriate, provide the required authentication representation, and test both authorized and unauthorized scenarios. For state-changing requests, account for CSRF when applicable."
        },
        {
          question:
            "Why should you not test the entire service implementation in a controller test?",
          answer:
            "The controller test should focus on HTTP behavior. Service business logic belongs in service unit tests, while repository behavior belongs in repository tests. Keeping responsibilities separate makes failures easier to diagnose."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "MockMvc Quick Reference",
      bullets: [
        "@WebMvcTest -> focused Spring MVC test slice.",
        "MockMvc -> simulates MVC requests.",
        "mockMvc.perform(...) -> executes a request.",
        "get(...) -> GET request.",
        "post(...) -> POST request.",
        "put(...) -> PUT request.",
        "patch(...) -> PATCH request.",
        "delete(...) -> DELETE request.",
        "param(...) -> adds query parameters.",
        "header(...) -> adds request headers.",
        "contentType(...) -> sets request Content-Type.",
        "accept(...) -> sets the expected response media type.",
        "content(...) -> sets the request body.",
        "status().isOk() -> verifies HTTP 200.",
        "status().isCreated() -> verifies HTTP 201.",
        "status().isNoContent() -> verifies HTTP 204.",
        "status().isBadRequest() -> verifies HTTP 400.",
        "status().isUnauthorized() -> verifies HTTP 401.",
        "status().isForbidden() -> verifies HTTP 403.",
        "status().isNotFound() -> verifies HTTP 404.",
        "jsonPath(...) -> verifies JSON response fields.",
        "header() -> verifies response headers.",
        "andExpect(...) -> adds response assertions."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "MockMvc is primarily a tool for testing Spring MVC behavior without requiring a real HTTP server. The most important concepts are @WebMvcTest, MockMvc, request builders, result matchers, JSON assertions, validation, and controller dependency mocking.",
        "For interviews, remember that controller tests verify the HTTP contract, not the entire application. Service logic and repository behavior should have their own tests.",
        "The typical flow is: perform request, controller processes it, response is produced, then assert status, headers, and body."
      ],
      bullets: [
        "MockMvc tests Spring MVC request handling.",
        "@WebMvcTest provides a focused MVC test slice.",
        "Mock service dependencies when controller isolation is desired.",
        "Test GET, POST, PUT, PATCH, and DELETE behavior.",
        "Test path variables and query parameters.",
        "Use contentType() for JSON request bodies.",
        "Use jsonPath() for JSON response assertions.",
        "Test success and failure status codes.",
        "Test validation errors.",
        "Test important exception responses.",
        "Account for security when security is part of the controller contract.",
        "Do not use controller tests to replace service or repository tests."
      ]
    }
  ]
};
