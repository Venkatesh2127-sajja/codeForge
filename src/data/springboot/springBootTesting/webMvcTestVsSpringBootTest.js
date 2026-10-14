
export const webMvcTestVsSpringBootTest = {
  id: 1308,
  title: "@WebMvcTest vs @SpringBootTest",
  slug: "web-mvc-test-vs-spring-boot-test",
  topicTitle: "Spring Boot Testing",
  description:
    "Compare focused MVC tests with full application-context tests and understand when to use each approach.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "webmvctest",
      title: "What Is @WebMvcTest?",
      paragraphs: [
        "@WebMvcTest loads a focused Spring MVC test slice. It is designed to test web-layer behavior without loading the entire application.",
        "A controller test can verify request mappings, path variables, request parameters, request bodies, validation, JSON serialization, response status codes, and exception handling.",
        "When a controller depends on a service, the test commonly supplies a mock for that service using the Mockito integration supported by the project's Spring Boot version.",
        "The goal is to test the controller's HTTP contract while keeping unrelated application components outside the test."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @MockitoBean
    private EmployeeService employeeService;

    // Inject MockMvc and test HTTP requests.
}`
      },
      bullets: [
        "Focuses on the web layer.",
        "Useful for request mapping, validation, serialization, and status codes.",
        "Does not automatically load every service and repository from the application.",
        "Usually works with MockMvc to simulate HTTP requests.",
        "Dependencies outside the MVC slice commonly need to be mocked or otherwise supplied.",
        "It is generally faster than loading the full application context."
      ]
    },
    {
      id: "webmvc-slice",
      title: "What Does the @WebMvcTest Slice Load?",
      paragraphs: [
        "@WebMvcTest is a test slice. Instead of loading the entire application, Spring Boot configures components relevant to Spring MVC testing.",
        "This allows the test to concentrate on controller behavior without requiring the complete service, repository, database, messaging, and other infrastructure layers.",
        "Because the test is intentionally narrow, a controller's service dependency is normally supplied as a mock."
      ],
      code: {
        language: "text",
        code: `@WebMvcTest

Spring MVC test slice
        |
        +--> Controller
        +--> MVC infrastructure
        +--> JSON conversion
        +--> Validation
        +--> Exception handling
        +--> MockMvc support
        |
        +--> Service dependency
        |       |
        |       +--> MOCK
        |
        X--> Real Repository
        X--> Real Database
        X--> Complete Application`
      },
      bullets: [
        "The slice is intentionally focused.",
        "Controller behavior can be tested without real database access.",
        "Service behavior belongs in service-layer tests.",
        "Repository behavior belongs in repository-focused tests.",
        "Do not assume every application bean is available inside @WebMvcTest."
      ]
    },
    {
      id: "mockmvc-flow",
      title: "How MockMvc Works with @WebMvcTest",
      paragraphs: [
        "MockMvc provides a way to test Spring MVC request processing without requiring a real browser or network connection.",
        "The test creates a simulated HTTP request, passes it through Spring MVC infrastructure, invokes the controller, and allows the test to verify the response."
      ],
      code: {
        language: "text",
        code: `Test
  |
  | MockMvc.perform()
  v
HTTP Request
  |
  v
DispatcherServlet
  |
  v
Handler Mapping
  |
  v
Controller
  |
  +--> Mocked Service
  |
  v
HTTP Response
  |
  v
status / JSON / headers
  |
  v
Assertions`
      },
      bullets: [
        "MockMvc simulates HTTP request processing.",
        "The request can include path variables, parameters, headers, and JSON.",
        "The response can be checked for status, headers, and body.",
        "No real network connection is required for normal MockMvc testing."
      ]
    },
    {
      id: "webmvc-example",
      title: "Complete @WebMvcTest Example",
      paragraphs: [
        "The following example tests an EmployeeController. The EmployeeService is mocked because this test is focused on controller behavior rather than service business logic."
      ],
      code: {
        language: "java",
        code: `@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    @Test
    void shouldReturnEmployee() throws Exception {

        Employee employee =
            new Employee(1L, "Ravi");

        when(employeeService.findById(1L))
            .thenReturn(employee);

        mockMvc.perform(
                get("/api/employees/1")
            )
            .andExpect(status().isOk())
            .andExpect(
                jsonPath("$.id").value(1)
            )
            .andExpect(
                jsonPath("$.name").value("Ravi")
            );
    }
}`
      },
      bullets: [
        "MockMvc sends the simulated HTTP request.",
        "The service is mocked.",
        "The controller receives the mocked service result.",
        "The test verifies the HTTP status and JSON response.",
        "The database is not required for this controller test."
      ]
    },
    {
      id: "springboottest",
      title: "What Is @SpringBootTest?",
      paragraphs: [
        "@SpringBootTest creates an application context using Spring Boot's application configuration. It is useful when a test needs multiple real Spring-managed components to work together.",
        "It is commonly used for broader integration testing where controller, service, repository, configuration, and other Spring components may need to interact.",
        "It does not necessarily start an HTTP server. By default, it loads the application context without starting a real web environment; use an appropriate webEnvironment setting when server-level behavior is required."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ApplicationContextTest {

    @Test
    void shouldLoadApplicationContext() {

        // The test passes if the context
        // starts successfully.
        assertNotNull(this);
    }
}`
      },
      bullets: [
        "Loads the Spring Boot application context.",
        "Useful for testing integration between Spring-managed components.",
        "Can be slower than a focused slice test.",
        "Use webEnvironment settings when you need a running server.",
        "Real beans can be used when the integration itself is the subject of the test."
      ]
    },
    {
      id: "springboot-web-environment",
      title: "@SpringBootTest Web Environments",
      paragraphs: [
        "@SpringBootTest provides a webEnvironment option that controls how the application web environment is configured during the test.",
        "The default is usually MOCK, which creates a web application context when appropriate but does not start a real server. RANDOM_PORT and DEFINED_PORT can start an actual embedded server.",
        "Use RANDOM_PORT when you need real server-level behavior while avoiding conflicts with a fixed port."
      ],
      code: {
        language: "java",
        code: `// Default-style web environment
@SpringBootTest
class MockWebEnvironmentTest {
}


// Start an embedded server on a random port
@SpringBootTest(
    webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT
)
class RealServerTest {
}


// Start using the configured server port
@SpringBootTest(
    webEnvironment =
        SpringBootTest.WebEnvironment.DEFINED_PORT
)
class DefinedPortTest {
}`
      },
      bullets: [
        "MOCK = application context with a mock web environment when applicable.",
        "RANDOM_PORT = starts an embedded server on a random port.",
        "DEFINED_PORT = starts an embedded server using the configured port.",
        "NONE = does not create a web environment.",
        "Use the smallest environment needed by the test."
      ]
    },
    {
      id: "springboot-flow",
      title: "@SpringBootTest Execution Flow",
      paragraphs: [
        "@SpringBootTest typically starts by building the Spring application context. Spring discovers configuration and creates the required beans before the test executes.",
        "This makes the test useful for verifying application wiring and interactions between real Spring-managed components."
      ],
      code: {
        language: "text",
        code: `JUnit
  |
  v
@SpringBootTest
  |
  v
Spring Boot Configuration
  |
  v
Application Context
  |
  +--> Controller
  +--> Service
  +--> Repository
  +--> Configuration
  +--> Other Beans
  |
  v
Test Method
  |
  v
Assertions`
      },
      bullets: [
        "Spring creates the test application context.",
        "Required beans are discovered and initialized.",
        "Dependencies are injected.",
        "The test executes against the configured application context.",
        "Context startup makes these tests heavier than simple unit tests."
      ]
    },
    {
      id: "comparison",
      title: "When Should You Use Each?",
      paragraphs: [
        "Choose the smallest test configuration that proves the behavior you care about. Use @WebMvcTest for controller behavior and @SpringBootTest when broader application wiring or integration matters.",
        "Neither annotation is universally better. A balanced test suite often combines unit tests, focused Spring test slices, repository tests, and a smaller number of broader integration tests."
      ],
      bullets: [
        "@WebMvcTest: focused MVC tests.",
        "@SpringBootTest: broader application-context tests.",
        "Mock dependencies when isolating a specific layer.",
        "Use real dependencies when integration behavior is the subject of the test.",
        "Use @WebMvcTest when the question is 'Does my HTTP/controller layer behave correctly?'",
        "Use @SpringBootTest when the question is 'Do my Spring-managed application components work together correctly?'"
      ]
    },
    {
      id: "comparison-table",
      title: "Side-by-Side Comparison",
      paragraphs: [
        "The following comparison helps identify the main difference between the two annotations."
      ],
      code: {
        language: "text",
        code: `                    @WebMvcTest       @SpringBootTest
------------------------------------------------------------
Test scope          MVC slice          Broad application
Controller          Yes                Yes, when configured
Service              Usually mocked     Can be real
Repository           Usually excluded    Can be real
Database              No                 Can be used
Spring context       Focused slice       Broad context
HTTP simulation      MockMvc             MockMvc can be used
Real server          No                 Only with server environment
Startup time         Usually lower       Usually higher
Main purpose         Web/API testing     Integration testing`
      },
      bullets: [
        "@WebMvcTest is narrower.",
        "@SpringBootTest is broader.",
        "A broader test is not automatically a better test.",
        "The appropriate choice depends on what behavior you want to prove."
      ]
    },
    {
      id: "controller-validation",
      title: "Testing Validation with @WebMvcTest",
      paragraphs: [
        "Controller validation is a good example of behavior that fits naturally into @WebMvcTest. The test can send invalid JSON and verify that Spring MVC returns the expected client error response.",
        "This allows validation, request binding, and controller-level error handling to be tested without using the real service or database."
      ],
      code: {
        language: "java",
        code: `@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    @Test
    void shouldRejectInvalidEmployeeRequest()
            throws Exception {

        String requestBody = """
            {
                "name": ""
            }
            """;

        mockMvc.perform(
                post("/api/employees")
                    .contentType(
                        MediaType.APPLICATION_JSON
                    )
                    .content(requestBody)
            )
            .andExpect(
                status().isBadRequest()
            );
    }
}`
      },
      bullets: [
        "The test focuses on HTTP validation behavior.",
        "The service does not need to execute.",
        "The request body can contain invalid data.",
        "The response status can be verified."
      ]
    },
    {
      id: "controller-exception",
      title: "Testing Controller Exception Handling",
      paragraphs: [
        "@WebMvcTest can also verify how controller requests are translated into HTTP responses when application exceptions occur.",
        "For example, if a service throws EmployeeNotFoundException, the MVC test can verify that the configured exception handler produces the expected HTTP status and response body."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldReturn404WhenEmployeeDoesNotExist()
        throws Exception {

    when(employeeService.findById(99L))
        .thenThrow(
            new EmployeeNotFoundException(
                "Employee not found: 99"
            )
        );

    mockMvc.perform(
            get("/api/employees/99")
        )
        .andExpect(
            status().isNotFound()
        );
}`
      },
      bullets: [
        "Mock the service failure.",
        "Send the HTTP request using MockMvc.",
        "Verify the HTTP status.",
        "Verify the error JSON when it is part of the API contract."
      ]
    },
    {
      id: "when-not-to-use-webmvctest",
      title: "When @WebMvcTest Is Not Enough",
      paragraphs: [
        "@WebMvcTest is intentionally limited. If the behavior requires a real database, repository implementation, full application configuration, or interaction between several application layers, a broader test may be more appropriate.",
        "Do not force an integration test into a web slice when the actual purpose is to verify infrastructure or multi-layer integration."
      ],
      bullets: [
        "Testing actual database persistence.",
        "Testing repository queries.",
        "Testing service and repository integration together.",
        "Testing complete application configuration.",
        "Testing behavior that requires several real Spring components.",
        "Testing a real HTTP server when server-level behavior matters."
      ]
    },
    {
      id: "when-not-to-use-springboottest",
      title: "When @SpringBootTest Is Unnecessary",
      paragraphs: [
        "@SpringBootTest should not automatically be used for every test. A simple calculation or isolated service business rule does not need the entire Spring application context.",
        "Using the broadest test configuration everywhere can make the test suite slower and make failures harder to isolate."
      ],
      bullets: [
        "Do not use @SpringBootTest for a pure Java calculation.",
        "Do not use it just because the class belongs to a Spring Boot project.",
        "Do not use it when a focused @WebMvcTest can prove controller behavior.",
        "Do not use it when a pure JUnit + Mockito test can prove service behavior.",
        "Use broader integration tests intentionally."
      ]
    },
    {
      id: "mockmvc-vs-server",
      title: "MockMvc vs Real HTTP Server",
      paragraphs: [
        "MockMvc exercises Spring MVC request processing without requiring a real network server. This makes it convenient for controller-focused tests.",
        "A real server test starts the application on a port and sends requests through the actual embedded web server. This can verify more of the HTTP stack but is generally heavier."
      ],
      code: {
        language: "text",
        code: `MockMvc

Test
 |
 +--> MockMvc
       |
       +--> Spring MVC
       |
       +--> Controller


Real Server

Test Client
 |
 +--> HTTP
       |
       +--> Embedded Server
               |
               +--> Spring MVC
                       |
                       +--> Controller`
      },
      bullets: [
        "MockMvc is useful for focused controller testing.",
        "Real server tests are useful when server/network behavior matters.",
        "MockMvc does not mean the controller method is called directly without MVC processing.",
        "Choose the approach according to the behavior being verified."
      ]
    },
    {
      id: "test-strategy",
      title: "Recommended Spring Boot Testing Strategy",
      paragraphs: [
        "A practical Spring Boot test suite normally contains multiple test levels. Pure unit tests verify business logic quickly, focused slices verify framework-specific layers, and broader integration tests verify that important components work together.",
        "The goal is not to make every test a full integration test. The goal is to use the appropriate test level for each behavior."
      ],
      code: {
        language: "text",
        code: `Testing Strategy

                 Full Integration
                @SpringBootTest
                       |
          +------------+------------+
          |                         |
     MVC Slice                JPA Slice
   @WebMvcTest              @DataJpaTest
          |                         |
          +------------+------------+
                       |
                  Unit Tests
               JUnit + Mockito`
      },
      bullets: [
        "Unit tests = fast business-logic feedback.",
        "@WebMvcTest = focused controller/API feedback.",
        "@DataJpaTest = focused repository/database feedback.",
        "@SpringBootTest = broader integration feedback.",
        "Use more focused tests than broad tests in most suites."
      ]
    },
    {
      id: "context-performance",
      title: "Test Context and Performance",
      paragraphs: [
        "Spring context startup can make tests significantly more expensive than pure unit tests. Spring's test framework can cache application contexts between tests when their configurations are compatible, which helps avoid rebuilding the same context unnecessarily.",
        "Even with context caching, a large suite with many different application configurations can still become expensive. Keeping focused tests focused helps maintain fast feedback."
      ],
      bullets: [
        "Pure unit tests normally have very low startup cost.",
        "Slice tests load less application configuration.",
        "@SpringBootTest can require more startup work.",
        "Compatible Spring test contexts may be cached.",
        "Avoid creating unnecessary variations of test configuration.",
        "Keep broad integration tests targeted."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      paragraphs: [
        "The most common mistake is choosing a test annotation based on habit rather than the behavior being tested."
      ],
      bullets: [
        "Using @SpringBootTest for every controller test.",
        "Expecting @WebMvcTest to create real repositories automatically.",
        "Trying to access a real database from a focused MVC test.",
        "Forgetting to provide a controller's service dependency.",
        "Testing service business logic inside a controller test.",
        "Assuming @SpringBootTest always starts a real server.",
        "Using a real server when MockMvc is sufficient.",
        "Using MockMvc when actual server-level behavior is the subject.",
        "Loading unnecessary application components.",
        "Writing only integration tests and skipping fast unit tests."
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      paragraphs: [
        "Use test scope deliberately. A focused test should remain focused, while an integration test should contain enough real infrastructure to prove the integration behavior.",
        "Good Spring Boot testing is about balancing confidence, execution speed, isolation, and maintainability."
      ],
      bullets: [
        "Use JUnit + Mockito for isolated service business logic.",
        "Use @WebMvcTest for controller and MVC behavior.",
        "Use @DataJpaTest for repository behavior.",
        "Use @SpringBootTest for broader application integration.",
        "Mock dependencies in slice tests when appropriate.",
        "Avoid unnecessary real database access.",
        "Avoid unnecessary full-context startup.",
        "Keep tests deterministic.",
        "Keep each test focused on a clear behavior.",
        "Use real server tests only when server behavior matters.",
        "Run the appropriate test suite in CI."
      ]
    },
    {
      id: "complete-comparison-example",
      title: "Complete Example: Same Controller Tested Two Ways",
      paragraphs: [
        "The same EmployeeController can be tested with a focused MVC test or as part of a broader Spring Boot integration test. The correct choice depends on whether the goal is controller behavior or broader application integration."
      ],
      code: {
        language: "java",
        code: `// Focused MVC test

@WebMvcTest(EmployeeController.class)
class EmployeeControllerWebMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    @Test
    void shouldReturnEmployee() throws Exception {

        when(employeeService.findById(1L))
            .thenReturn(
                new Employee(1L, "Ravi")
            );

        mockMvc.perform(
                get("/api/employees/1")
            )
            .andExpect(status().isOk())
            .andExpect(
                jsonPath("$.name").value("Ravi")
            );
    }
}


// Broader Spring Boot test

@SpringBootTest
class EmployeeApplicationIntegrationTest {

    @Test
    void shouldLoadApplicationContext() {

        // Real Spring-managed components
        // can participate in this test.
    }
}`
      },
      bullets: [
        "The first test isolates the controller from the service implementation.",
        "The second test loads the broader application context.",
        "The tests answer different questions.",
        "Neither approach replaces the other."
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You need to test whether an endpoint returns HTTP 400 when validation fails. Which annotation would you choose?",
          answer:
            "I would normally use @WebMvcTest because validation and HTTP response behavior belong to the MVC layer."
        },
        {
          question:
            "You need to verify that Controller → Service → Repository works together. Which annotation is more appropriate?",
          answer:
            "I would use a broader integration test such as @SpringBootTest when the goal is to verify multiple real Spring-managed components working together."
        },
        {
          question:
            "Why would you mock EmployeeService in an @WebMvcTest?",
          answer:
            "Because @WebMvcTest focuses on the MVC layer. Mocking the service isolates controller behavior from service business logic."
        },
        {
          question:
            "Does @WebMvcTest connect to the database?",
          answer:
            "Not as part of its normal focused MVC slice. A controller's service and repository dependencies are not loaded as the full application would load them, so a controller test normally mocks the service."
        },
        {
          question:
            "Does @SpringBootTest always start an embedded Tomcat server?",
          answer:
            "No. By default it can load the application context with a mock web environment. A server environment such as RANDOM_PORT or DEFINED_PORT can be selected when an actual server is required."
        },
        {
          question:
            "Which is better: @WebMvcTest or @SpringBootTest?",
          answer:
            "Neither is universally better. @WebMvcTest is better for focused MVC behavior, while @SpringBootTest is appropriate for broader application integration."
        }
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is the difference between @WebMvcTest and @SpringBootTest?",
          answer:
            "@WebMvcTest loads a focused MVC test slice. @SpringBootTest loads the broader Spring Boot application context."
        },
        {
          question: "Which is generally faster?",
          answer:
            "A focused MVC slice is generally faster because it loads fewer application components, although actual execution time depends on the test configuration."
        },
        {
          question: "Does @SpringBootTest always start Tomcat?",
          answer:
            "No. By default it loads the application context without a real server. A webEnvironment option can be used to start an embedded server."
        },
        {
          question: "What is a test slice?",
          answer:
            "A test slice loads a focused subset of the Spring application for testing a particular layer or feature instead of loading the complete application."
        },
        {
          question: "Why use @WebMvcTest instead of @SpringBootTest for controller tests?",
          answer:
            "@WebMvcTest keeps the test focused on MVC behavior, usually making it faster and easier to isolate controller failures."
        },
        {
          question: "When would you use @SpringBootTest?",
          answer:
            "I would use @SpringBootTest when I need to verify broader Spring application integration, configuration, or multiple real Spring-managed components working together."
        },
        {
          question: "What is MockMvc?",
          answer:
            "MockMvc is a Spring testing utility that simulates MVC request processing so controller endpoints can be tested without requiring a real network server."
        },
        {
          question: "Can @WebMvcTest test validation?",
          answer:
            "Yes. It can test request binding and validation behavior and verify the resulting HTTP response."
        },
        {
          question: "Can @WebMvcTest test exception handling?",
          answer:
            "Yes. It can verify how MVC exception handlers translate controller or mocked-service exceptions into HTTP responses."
        },
        {
          question: "Can @SpringBootTest use MockMvc?",
          answer:
            "Yes. A Spring Boot test can be configured with MockMvc when the test needs a broader application context while still using MockMvc for request testing."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Quick Reference",
      bullets: [
        "@WebMvcTest = focused MVC test slice.",
        "@SpringBootTest = broader Spring Boot application-context test.",
        "MockMvc = simulated MVC request/response testing.",
        "@MockitoBean = provides a Mockito mock as a Spring bean in supported Spring Boot versions.",
        "Web MVC tests normally mock service dependencies.",
        "Repository tests can use @DataJpaTest.",
        "Pure business-logic tests can use JUnit + Mockito.",
        "@SpringBootTest does not automatically mean a real server is started.",
        "RANDOM_PORT = starts an embedded server on a random port.",
        "DEFINED_PORT = starts an embedded server using the configured port.",
        "MOCK = uses a mock web environment when applicable.",
        "NONE = no web environment.",
        "Use the smallest test scope that proves the behavior."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "@WebMvcTest and @SpringBootTest solve different testing problems. @WebMvcTest is designed for focused Spring MVC testing, while @SpringBootTest is designed for broader application-context testing.",
        "For controller tests, MockMvc can simulate HTTP requests without starting a real network server. Service dependencies are commonly mocked so that controller behavior can be tested independently.",
        "@SpringBootTest is appropriate when the interaction between multiple real Spring-managed components matters. It can also be configured with a real web environment when server-level behavior needs to be tested.",
        "The key interview rule is simple: use @WebMvcTest when you want to test the web layer in isolation, and use @SpringBootTest when you need broader Spring application integration."
      ],
      bullets: [
        "@WebMvcTest → MVC layer.",
        "@SpringBootTest → broader application context.",
        "MockMvc → simulated HTTP/MVC testing.",
        "Use mocks to isolate focused layers.",
        "Use real components when integration is the subject.",
        "Do not start a full context unnecessarily.",
        "Do not use a focused slice when the test requires real multi-layer integration."
      ]
    }
  ]
};
