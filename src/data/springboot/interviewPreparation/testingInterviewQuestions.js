
export const testingInterviewQuestions = {
  id: 1608,
  title: "Spring Boot Testing Interview Questions",
  slug: "spring-boot-testing-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for JUnit 5, Mockito, unit testing, service and controller tests, MockMvc, Spring Boot test slices, repository testing, integration testing, and test best practices.",
  estimatedTime: "50 min",
  sections: [
    {
      id: "testing-fundamentals",
      title: "1. Testing Fundamentals and the Testing Pyramid",
      paragraphs: [
        "Software testing verifies that an application behaves as expected. Tests help detect defects, protect existing functionality during refactoring, and provide confidence when code changes.",
        "A unit test verifies a small unit of behavior in isolation, usually without starting the full Spring application or connecting to a real database. An integration test checks whether multiple components or infrastructure elements work together correctly.",
        "In Spring Boot applications, a useful testing strategy combines fast unit tests, focused Spring test slices, and a smaller number of full integration tests. The correct test type depends on the behavior being verified.",
        "Tests should verify observable behavior rather than implementation details wherever possible. A test that only repeats the implementation's internal steps can become fragile when the code is refactored."
      ],
      bullets: [
        "Unit test: tests a class or small unit in isolation.",
        "Integration test: verifies that components or infrastructure work together.",
        "Web layer test: checks controller behavior, request mapping, validation, and HTTP responses.",
        "Repository test: checks persistence behavior, mappings, and queries.",
        "End-to-end test: verifies a complete user or system workflow across multiple layers.",
        "Regression test: protects against previously fixed defects returning."
      ],
      interviewQuestions: [
        {
          question: "What is unit testing?",
          answer: "Unit testing verifies a small unit of behavior in isolation, typically without starting the full application or contacting real external systems."
        },
        {
          question: "What is the difference between unit testing and integration testing?",
          answer: "A unit test isolates a small component and usually replaces its collaborators with mocks or stubs. An integration test checks whether multiple components or infrastructure elements work together."
        },
        {
          question: "Why is testing important in Spring Boot applications?",
          answer: "Testing detects defects early, documents expected behavior, supports safe refactoring, and verifies that application components and infrastructure behave correctly."
        },
        {
          question: "What is the testing pyramid?",
          answer: "It is a strategy that generally favors many fast unit tests, a smaller number of integration tests, and fewer broad end-to-end tests. The goal is to balance speed, confidence, and maintenance cost."
        },
        {
          question: "Should every test use a real database?",
          answer: "No. Unit tests can use mocks, while repository and integration tests should use an appropriate database environment when persistence behavior matters."
        }
      ]
    },
    {
      id: "junit-5",
      title: "2. JUnit 5 Fundamentals",
      paragraphs: [
        "JUnit 5 is a Java testing framework. Its architecture includes the JUnit Platform for launching tests, the Jupiter programming and extension model for writing JUnit 5 tests, and Vintage support for running older JUnit 3 and JUnit 4 tests on the platform when configured.",
        "JUnit 5 provides annotations such as @Test, @BeforeEach, @AfterEach, @BeforeAll, and @AfterAll. Assertions verify expected outcomes, while assertThrows checks exception behavior.",
        "By default, JUnit Jupiter creates a new test class instance for each test method. Setup and cleanup methods help initialize and release test resources. Static methods are normally required for @BeforeAll and @AfterAll unless the test instance lifecycle is configured differently.",
        "Good tests should be deterministic, focused, and independent of execution order. Avoid relying on shared mutable test data or unpredictable external services."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.junit.jupiter.api.Assertions.assertThrows;\n\nimport org.junit.jupiter.api.BeforeEach;\nimport org.junit.jupiter.api.Test;\n\nclass CalculatorTest {\n\n    private Calculator calculator;\n\n    @BeforeEach\n    void setUp() {\n        calculator = new Calculator();\n    }\n\n    @Test\n    void addsTwoNumbers() {\n        assertEquals(10, calculator.add(4, 6));\n    }\n\n    @Test\n    void rejectsDivisionByZero() {\n        assertThrows(IllegalArgumentException.class,\n            () -> calculator.divide(10, 0));\n    }\n}"
      },
      bullets: [
        "@Test: identifies a test method.",
        "@BeforeEach: runs before each test method.",
        "@AfterEach: runs after each test method.",
        "@BeforeAll: runs once before all tests in the class.",
        "@AfterAll: runs once after all tests in the class.",
        "@ParameterizedTest: executes a test with multiple argument sets.",
        "@DisplayName: provides a readable test name.",
        "@Disabled: disables a test temporarily; use it deliberately."
      ],
      interviewQuestions: [
        {
          question: "What is JUnit 5?",
          answer: "JUnit 5 is a Java testing framework composed of the JUnit Platform, Jupiter programming and extension model, and Vintage support for older JUnit tests."
        },
        {
          question: "What is the difference between @BeforeEach and @BeforeAll?",
          answer: "@BeforeEach runs before every test method. @BeforeAll runs once before all test methods in the class, and is normally static unless a per-class test instance lifecycle is configured."
        },
        {
          question: "What is assertThrows?",
          answer: "assertThrows verifies that executing a piece of code throws an exception of the expected type. It can also return the exception so the test can inspect its message or other properties."
        },
        {
          question: "What is a parameterized test?",
          answer: "It runs the same test logic with multiple sets of inputs, reducing duplicated test code and making boundary cases easier to verify."
        },
        {
          question: "What is the difference between an assertion and an assumption?",
          answer: "An assertion verifies expected behavior and fails the test if the expectation is not met. An assumption can abort or skip the remaining test when a prerequisite for that test is not satisfied."
        }
      ]
    },
    {
      id: "mockito-fundamentals",
      title: "3. Mockito, Mocks, and Stubs",
      paragraphs: [
        "Mockito is a Java mocking framework used to isolate a class from its dependencies. It allows a test to control dependency responses and verify important interactions.",
        "A mock is a test double whose behavior can be configured. A stub is commonly used to provide a predetermined response to a call. Mockito mocks can be used both for stubbing and interaction verification.",
        "@Mock creates a mock object. @InjectMocks asks Mockito to create the object under test and inject suitable mocks into it where possible. Mockito injection is not the same as Spring dependency injection, and it does not load the Spring application context.",
        "Use mocks when dependency behavior needs to be controlled or an external interaction needs to be verified. Avoid mocking every object indiscriminately, because excessive mocking can make tests brittle and disconnected from real behavior."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.mockito.Mockito.verify;\nimport static org.mockito.Mockito.when;\n\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\n\n@ExtendWith(MockitoExtension.class)\nclass StudentServiceTest {\n\n    @Mock\n    private StudentRepository repository;\n\n    @InjectMocks\n    private StudentService service;\n\n    @Test\n    void returnsStudentWhenFound() {\n        Student student = new Student(1L, \"Ravi\");\n        when(repository.findById(1L))\n            .thenReturn(java.util.Optional.of(student));\n\n        StudentDto result = service.getStudent(1L);\n\n        assertEquals(1L, result.id());\n        assertEquals(\"Ravi\", result.name());\n        verify(repository).findById(1L);\n    }\n}"
      },
      bullets: [
        "@Mock: creates a Mockito mock.",
        "@InjectMocks: creates the target object and attempts to inject its mocks.",
        "@ExtendWith(MockitoExtension.class): initializes Mockito annotations and integrates Mockito with JUnit Jupiter.",
        "when(...).thenReturn(...): configures a mock's response.",
        "verify(...): verifies that a mock interaction occurred.",
        "never(): verifies that an interaction did not occur.",
        "ArgumentCaptor: captures arguments passed to a mock for later assertions."
      ],
      interviewQuestions: [
        {
          question: "What is Mockito?",
          answer: "Mockito creates mocks and stubs so tests can isolate a component from its collaborators and verify important interactions."
        },
        {
          question: "What is the difference between @Mock and @InjectMocks?",
          answer: "@Mock creates a mock object. @InjectMocks asks Mockito to create the target object and inject suitable mocks into it where possible."
        },
        {
          question: "What is the difference between when().thenReturn() and verify()?",
          answer: "when().thenReturn() configures what a mock should return when called. verify() checks whether a particular interaction occurred."
        },
        {
          question: "What is MockitoExtension?",
          answer: "It integrates Mockito with JUnit Jupiter, initializes Mockito annotations, and manages Mockito's test lifecycle."
        },
        {
          question: "Should every method call be verified?",
          answer: "No. Verify interactions that are important to the behavior or contract under test. Excessive verification of implementation details makes tests fragile."
        }
      ]
    },
    {
      id: "service-unit-testing",
      title: "4. Writing a Service Unit Test",
      paragraphs: [
        "Service unit tests verify business logic independently of the Spring container. Dependencies such as repositories, external API clients, or notification services can be mocked so the test focuses on the service's behavior.",
        "A common test structure is Arrange, Act, Assert. Arrange prepares inputs and mock responses. Act invokes the method being tested. Assert checks the returned value, exception, or relevant interactions.",
        "A good service test covers successful behavior, missing data, invalid input, and dependency failures where those cases are part of the method's contract. It should not require a real database unless persistence integration is the behavior being tested."
      ],
      "code": {
        "language": "java",
        "code": "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.junit.jupiter.api.Assertions.assertThrows;\nimport static org.mockito.Mockito.verify;\nimport static org.mockito.Mockito.when;\n\nimport java.util.Optional;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\n\n@ExtendWith(MockitoExtension.class)\nclass StudentServiceTest {\n\n    @Mock\n    private StudentRepository repository;\n\n    @InjectMocks\n    private StudentService service;\n\n    @Test\n    void returnsStudentWhenFound() {\n        when(repository.findById(1L))\n            .thenReturn(Optional.of(new Student(1L, \"Ravi\")));\n\n        StudentDto result = service.getStudent(1L);\n\n        assertEquals(1L, result.id());\n        assertEquals(\"Ravi\", result.name());\n        verify(repository).findById(1L);\n    }\n\n    @Test\n    void throwsWhenStudentDoesNotExist() {\n        when(repository.findById(99L)).thenReturn(Optional.empty());\n\n        assertThrows(StudentNotFoundException.class,\n            () -> service.getStudent(99L));\n    }\n}"
      },
      bullets: [
        "Assumed example types: Student, StudentDto, StudentRepository, StudentService, and StudentNotFoundException.",
        "The StudentService constructor should accept StudentRepository.",
        "The service should return a StudentDto when a student exists.",
        "The service should throw StudentNotFoundException when the student is missing.",
        "Test both success and failure paths where appropriate."
      ],
      interviewQuestions: [
        {
          question: "How do you write a unit test for a service class?",
          answer: "Create the service with its dependencies mocked, configure the expected dependency responses, invoke the service method, and assert the result, exception, or important interactions."
        },
        {
          question: "Why mock the repository in a service unit test?",
          answer: "Mocking the repository isolates business logic from database behavior and makes the test fast and deterministic."
        },
        {
          question: "How do you test a service method when a record is missing?",
          answer: "Configure the repository mock to return Optional.empty(), call the service method, and use assertThrows to verify the expected exception."
        },
        {
          question: "What is Arrange-Act-Assert?",
          answer: "Arrange prepares test data and dependencies, Act executes the behavior, and Assert verifies the expected result."
        }
      ]
    },
    {
      id: "mockito-advanced",
      title: "5. Mockito Argument Matchers and Exception Testing",
      paragraphs: [
        "Mockito supports argument matchers when a method should respond to a range of input values rather than one exact value. Common matchers include any(), anyLong(), eq(), and argThat().",
        "When using Mockito argument matchers for a method call, all arguments in that call generally need to be supplied using matchers if any argument uses a matcher. Use eq(value) when one argument must match an exact value.",
        "ArgumentCaptor can capture an object passed to a mocked dependency. This is useful when the test needs to inspect a saved entity or an outgoing request without relying on a particular object instance.",
        "Exception tests should verify the public behavior expected by callers. Do not make a test depend on internal exception handling details unless those details are part of the contract."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.mockito.ArgumentMatchers.any;\nimport static org.mockito.Mockito.verify;\n\nimport org.junit.jupiter.api.Test;\nimport org.mockito.ArgumentCaptor;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\nimport org.junit.jupiter.api.extension.ExtendWith;\n\n@ExtendWith(MockitoExtension.class)\nclass StudentCreationServiceTest {\n\n    @Mock\n    private StudentRepository repository;\n\n    @InjectMocks\n    private StudentService service;\n\n    @Test\n    void savesStudentWithExpectedName() {\n        ArgumentCaptor<Student> captor = ArgumentCaptor.forClass(Student.class);\n\n        service.createStudent(\"Ravi\");\n\n        verify(repository).save(captor.capture());\n        assertEquals(\"Ravi\", captor.getValue().getName());\n    }\n}"
      },
      "bullets": [
        "any(): matches an argument of a compatible type, subject to Mockito's matcher rules.",
        "eq(value): matches an argument equal to the specified value.",
        "ArgumentCaptor: captures a passed argument for assertions.",
        "assertThrows: checks exception type.",
        "assertAll: groups related assertions.",
        "Use strict stubbing and remove unused mock setups."
      ],
      interviewQuestions: [
        {
          question: "What is ArgumentCaptor?",
          answer: "ArgumentCaptor captures an argument passed to a mocked method so the test can inspect its properties."
        },
        {
          question: "What is the difference between any() and eq()?",
          answer: "any() matches a compatible argument, while eq() matches an argument equal to a specific expected value."
        },
        {
          question: "Can you mix raw values and matchers in one Mockito invocation?",
          answer: "When using argument matchers in a method invocation, use matchers for all arguments in that invocation. For example, use eq(\"Ravi\") rather than a raw string beside any() when required."
        },
        {
          question: "How do you test that a method throws an exception?",
          answer: "Use JUnit's assertThrows with the expected exception class and a lambda that invokes the method."
        }
      ]
    },
    {
      id: "spring-boot-test",
      title: "6. @SpringBootTest and Application Context Testing",
      paragraphs: [
        "@SpringBootTest loads a Spring application test context and is useful when a test needs broad application configuration, dependency injection, or interactions across multiple layers.",
        "The default web environment does not start a live server. You can configure webEnvironment to use a mock web environment or a real embedded server on a random port when the test needs to exercise HTTP over a socket.",
        "Full application-context tests are useful for checking configuration and component integration, but they are usually slower than unit tests and focused test slices. Use them where broad integration adds value rather than applying them to every test.",
        "A Spring test context may be cached and reused between compatible test classes. Avoid unnecessary context configuration differences because they can reduce test speed."
      ],
      "code": {
        "language": "java",
        "code": "import static org.junit.jupiter.api.Assertions.assertNotNull;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.context.SpringBootTest;\n\n@SpringBootTest\nclass ApplicationContextTest {\n\n    @Autowired\n    private StudentService studentService;\n\n    @Test\n    void loadsStudentServiceBean() {\n        assertNotNull(studentService);\n    }\n}"
      },
      "interviewQuestions": [
        {
          question: "What does @SpringBootTest do?",
          answer: "It loads a Spring application test context and is useful for integration tests that need broader application configuration."
        },
        {
          question: "Does @SpringBootTest always start a real HTTP server?",
          answer: "No. By default it does not start a live server. Configure a suitable webEnvironment, such as RANDOM_PORT, when a real embedded server is required."
        },
        {
          question: "When should you use @SpringBootTest?",
          answer: "Use it when the behavior depends on broad Spring configuration or integration across multiple application components. Prefer smaller tests when a full context is unnecessary."
        },
        {
          question: "What is the benefit of Spring's test context caching?",
          answer: "Compatible test classes can reuse an application context, reducing the cost of repeatedly starting the Spring container."
        },
        {
          question: "What is a limitation of @SpringBootTest?",
          answer: "It generally takes more time and resources than an isolated unit test or focused test slice, so it should be used for integration needs rather than every method."
        }
      ]
    },
    {
      id: "web-mvc-test",
      title: "7. @WebMvcTest and MockMvc",
      paragraphs: [
        "@WebMvcTest loads a focused Spring MVC test slice, usually targeting controller-related behavior rather than the entire application. It is suitable for testing request mappings, JSON serialization, validation, response statuses, and MVC exception handling.",
        "MockMvc exercises Spring MVC request handling without requiring a live HTTP server. Tests can submit mock HTTP requests and assert status codes, response content, headers, and JSON fields.",
        "In a web slice, service dependencies commonly need to be mocked because the complete service and persistence layers are not loaded automatically. Spring Security may also be active, so configure the test authentication or security setup intentionally.",
        "Use @WebMvcTest when the main purpose is to verify HTTP behavior. Use a service unit test for business logic and an integration test when the controller must work with real application components."
      ],
      "code": {
        "language": "java",
        "code": "import static org.mockito.Mockito.when;\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;\nimport org.springframework.boot.test.mock.mockito.MockBean;\nimport org.springframework.test.web.servlet.MockMvc;\n\n@WebMvcTest(StudentController.class)\nclass StudentControllerTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @MockBean\n    private StudentService studentService;\n\n    @Test\n    void returnsStudentAsJson() throws Exception {\n        when(studentService.getStudent(1L))\n            .thenReturn(new StudentDto(1L, \"Ravi\"));\n\n        mockMvc.perform(get(\"/api/students/1\"))\n            .andExpect(status().isOk())\n            .andExpect(jsonPath(\"$.id\").value(1))\n            .andExpect(jsonPath(\"$.name\").value(\"Ravi\"));\n    }\n}"
      },
      "bullets": [
        "Assumed example: GET /api/students/{id} returns StudentDto.",
        "The controller should delegate to StudentService.getStudent(id).",
        "@MockBean is available in many Spring Boot 3 versions; in newer Spring Framework versions, @MockitoBean is also available.",
        "If Spring Security protects the endpoint, provide the expected authentication or configure the test security behavior deliberately.",
        "Use jsonPath to assert individual JSON fields instead of comparing the entire response string unnecessarily."
      ],
      "interviewQuestions": [
        {
          question: "What is @WebMvcTest?",
          answer: "It loads a focused Spring MVC test slice for controller-related behavior rather than the entire application context."
        },
        {
          question: "What is MockMvc?",
          answer: "MockMvc exercises Spring MVC request handling in tests without requiring a live HTTP server."
        },
        {
          question: "Why mock the service in a controller test?",
          answer: "It isolates the web layer so the test can focus on request mapping, serialization, validation, response status, and controller behavior."
        },
        {
          question: "Can MockMvc test JSON responses?",
          answer: "Yes. It can assert response status, headers, content, and individual JSON properties using matchers such as jsonPath."
        },
        {
          question: "Does MockMvc require a running server?",
          answer: "No. MockMvc exercises the Spring MVC infrastructure in-process. A random-port integration test is more appropriate when the test must use a real embedded HTTP server."
        }
      ]
    },
    {
      id: "data-jpa-test",
      title: "8. @DataJpaTest and Repository Testing",
      paragraphs: [
        "@DataJpaTest configures a focused test slice for JPA components. It is commonly used to test entity mappings, repository methods, query behavior, and persistence constraints.",
        "The slice typically configures JPA-related components and a test database when available. Tests are transactional by default and normally roll back after each test, helping keep test data isolated.",
        "An embedded database can be useful for fast repository tests, but database-specific SQL, locking, collation, isolation, and vendor-specific queries should also be tested against the database engine used in production when those differences matter.",
        "Repository tests should verify query results and persistence behavior, not merely confirm that a repository interface can be instantiated."
      ],
      "code": {
        "language": "java",
        "code": "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.junit.jupiter.api.Assertions.assertTrue;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;\n\n@DataJpaTest\nclass StudentRepositoryTest {\n\n    @Autowired\n    private StudentRepository repository;\n\n    @Test\n    void findsStudentByName() {\n        repository.save(new Student(null, \"Ravi\"));\n\n        var result = repository.findByName(\"Ravi\");\n\n        assertTrue(result.isPresent());\n        assertEquals(\"Ravi\", result.get().getName());\n    }\n}"
      },
      "bullets": [
        "Assumed example: StudentRepository defines Optional<Student> findByName(String name).",
        "The Student entity uses a generated ID or accepts a null ID before persistence.",
        "Tests usually roll back their transaction after completion.",
        "Use flush when you need pending SQL to reach the database before making an assertion about database constraints.",
        "Use a production-compatible database test setup when query behavior depends on a specific database engine."
      ],
      "interviewQuestions": [
        {
          question: "What does @DataJpaTest do?",
          answer: "It configures a focused test slice for JPA components, commonly including entity mappings and repository behavior."
        },
        {
          question: "Why are @DataJpaTest tests usually transactional?",
          answer: "The default transaction allows test operations to be isolated and normally rolled back after each test, reducing persistent test-data leakage."
        },
        {
          question: "Does @DataJpaTest always use the production database?",
          answer: "No. It may configure an embedded test database. Configure the test environment explicitly when production database behavior must be verified."
        },
        {
          question: "When should you flush in a repository test?",
          answer: "Flush when the test needs pending persistence changes to reach the database, for example to surface a constraint violation before the test ends."
        },
        {
          question: "Can an H2 test guarantee that a native query works in MySQL?",
          answer: "No. Different database engines can implement SQL features, types, constraints, and locking differently. Test database-specific behavior against a compatible engine."
        }
      ]
    },
    {
      id: "integration-testing",
      title: "9. Integration Tests and Real HTTP Requests",
      paragraphs: [
        "Integration tests verify that multiple application components work together. A Spring Boot integration test might exercise a controller, service, repository, transaction manager, and database in one workflow.",
        "@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) starts an embedded server on an available port. A test can send real HTTP requests to this server and inspect the responses.",
        "Use integration tests for critical application flows, serialization across the real HTTP stack, database interactions, configuration, and infrastructure integration. Keep the test environment controlled so results remain repeatable.",
        "External services such as payment providers, email servers, and third-party APIs should generally be replaced with test doubles or controlled test environments unless the purpose is explicitly to test the external integration."
      ],
      "code": {
        "language": "java",
        "code": "import static org.junit.jupiter.api.Assertions.assertEquals;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.context.SpringBootTest;\nimport org.springframework.boot.test.web.client.TestRestTemplate;\nimport org.springframework.boot.test.web.server.LocalServerPort;\nimport org.springframework.http.ResponseEntity;\n\n@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)\nclass StudentApiIntegrationTest {\n\n    @LocalServerPort\n    private int port;\n\n    @Autowired\n    private TestRestTemplate restTemplate;\n\n    @Test\n    void publicEndpointReturnsExpectedResponse() {\n        ResponseEntity<String> response = restTemplate.getForEntity(\n            \"http://localhost:\" + port + \"/api/health\",\n            String.class);\n\n        assertEquals(200, response.getStatusCode().value());\n    }\n}"
      },
      "bullets": [
        "The example assumes /api/health is an accessible endpoint that returns HTTP 200.",
        "RANDOM_PORT avoids hard-coding a port and starts a real embedded server.",
        "Use deterministic test data and clean up persistent resources appropriately.",
        "Do not rely on a test method's transaction to roll back database work performed by a separate server thread.",
        "Use test profiles and explicit test configuration for infrastructure dependencies."
      ],
      "interviewQuestions": [
        {
          question: "What is an integration test in Spring Boot?",
          answer: "It verifies that multiple application components or infrastructure elements work together, such as a controller, service, repository, transaction manager, and database."
        },
        {
          question: "What is the difference between MockMvc and RANDOM_PORT?",
          answer: "MockMvc exercises Spring MVC in-process without a live HTTP server. RANDOM_PORT starts an embedded server and allows tests to send real HTTP requests to it."
        },
        {
          question: "Why use a test profile?",
          answer: "A test profile can supply test-specific configuration, such as database URLs and external-service endpoints, without changing production settings."
        },
        {
          question: "Should integration tests call real third-party services?",
          answer: "Usually not in routine automated tests. Use controlled test environments or test doubles unless the test specifically verifies the real external integration."
        }
      ]
    },
    {
      id: "validation-and-exception-testing",
      title: "10. Testing Validation and Exception Handling",
      paragraphs: [
        "Controller tests should verify how the API responds to invalid input, missing resources, and business exceptions. For request-body validation, use Bean Validation annotations such as @NotBlank and @Valid, then verify the resulting HTTP response.",
        "A centralized exception handler using @ControllerAdvice can translate application exceptions into consistent API error responses. Tests should assert the agreed status code and error structure rather than depending on internal stack traces.",
        "For service unit tests, verify that business exceptions are raised under the expected conditions. For web tests, verify that those exceptions are translated into the intended HTTP response."
      ],
      "code": {
        "language": "java",
        "code": "import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;\nimport org.springframework.test.web.servlet.MockMvc;\nimport org.springframework.http.MediaType;\n\n@WebMvcTest(StudentController.class)\nclass StudentValidationTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @Test\n    void rejectsBlankStudentName() throws Exception {\n        mockMvc.perform(post(\"/api/students\")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(\"{\\\"name\\\":\\\"\\\"}\"))\n            .andExpect(status().isBadRequest());\n    }\n}"
      },
      "bullets": [
        "Assumes the controller accepts a request DTO with @NotBlank on the name field and uses @Valid.",
        "The test assumes invalid input is mapped to HTTP 400.",
        "If the controller depends on services, provide mocks for those dependencies in the web slice.",
        "Test malformed JSON separately from valid JSON containing invalid field values.",
        "Avoid asserting sensitive exception details in public API responses."
      ],
      "interviewQuestions": [
        {
          question: "How do you test request validation in Spring Boot?",
          answer: "Send invalid input using MockMvc and assert the expected HTTP status and error response. Ensure the request DTO has validation constraints and the controller triggers validation."
        },
        {
          question: "How do you test global exception handling?",
          answer: "Trigger the relevant exception through the controller or mocked service, then assert that the configured exception handler returns the expected status and error body."
        },
        {
          question: "Why separate service exception tests from controller tests?",
          answer: "Service tests verify business behavior, while controller tests verify how that behavior is exposed over HTTP. Separating them makes failures easier to diagnose."
        }
      ]
    },
    {
      id: "test-data-and-mocking-practices",
      title: "11. Test Data, Setup, and Mocking Best Practices",
      paragraphs: [
        "Test data should be easy to understand and relevant to the behavior under test. Prefer small, explicit fixtures over large shared objects containing fields that the test never uses.",
        "Use mocks at boundaries where dependency behavior needs to be controlled, such as repository calls in service unit tests. Use real objects for simple value objects and domain logic when doing so keeps the test clear.",
        "Avoid shared mutable state between tests. Each test should be independently understandable and should not depend on another test having executed first.",
        "When a test fails, its assertion should help explain what behavior was unexpected. Prefer meaningful method names and assertions that communicate the expected outcome."
      ],
      "bullets": [
        "Name tests after the behavior being verified.",
        "Keep each test focused on one behavior or closely related assertions.",
        "Use meaningful test values rather than unexplained constants.",
        "Avoid unnecessary sleeps and timing-dependent assertions.",
        "Do not mock the class under test.",
        "Avoid mocking simple DTOs and value objects without a clear reason.",
        "Remove unused stubbing and unnecessary interaction verification.",
        "Use deterministic clocks or controlled time where time-dependent behavior is tested."
      ],
      "interviewQuestions": [
        {
          question: "What makes a good unit test?",
          answer: "A good unit test is focused, deterministic, readable, independent, and verifies observable behavior with useful assertions."
        },
        {
          question: "Why should tests not depend on execution order?",
          answer: "Order dependencies make tests fragile and can cause failures when the suite runs in parallel or when unrelated tests are added or changed."
        },
        {
          question: "Should you mock the class being tested?",
          answer: "Usually no. The class under test should execute its real logic; mocks should normally replace its collaborators."
        },
        {
          question: "Why should unnecessary stubbing be avoided?",
          answer: "Unused stubbing makes tests harder to understand and can conceal changes in the actual dependency interactions. Keep mock setup limited to what the test needs."
        }
      ]
    },
    {
      id: "test-coverage-and-ci",
      title: "12. Code Coverage and Continuous Integration",
      paragraphs: [
        "Code coverage measures which parts of the code are executed by tests. Common measurements include line coverage, branch coverage, and method coverage.",
        "High coverage does not automatically mean high test quality. A test suite can execute every line without verifying meaningful outcomes. Prioritize important business behavior, failure scenarios, boundaries, and security-sensitive logic.",
        "Tools such as JaCoCo can measure Java code coverage and integrate with Maven or Gradle builds. Coverage thresholds can be useful, but they should encourage valuable tests rather than superficial assertions.",
        "Run automated tests in continuous integration so changes are checked consistently. A useful pipeline typically compiles the application, runs unit tests, runs selected integration tests, and publishes test and coverage reports."
      ],
      "bullets": [
        "Line coverage: measures executed lines.",
        "Branch coverage: measures exercised decision outcomes.",
        "JaCoCo: a commonly used Java code coverage tool.",
        "CI: runs tests automatically when code changes are submitted.",
        "Coverage complements test quality; it does not replace meaningful assertions.",
        "Prioritize critical business rules, error paths, and security checks."
      ],
      "interviewQuestions": [
        {
          question: "What is code coverage?",
          answer: "Code coverage measures how much of the source code is exercised during test execution, using metrics such as line, branch, and method coverage."
        },
        {
          question: "Does 100% code coverage guarantee bug-free software?",
          answer: "No. Coverage shows execution, not whether assertions are meaningful or all relevant behaviors and edge cases are correct."
        },
        {
          question: "What is JaCoCo?",
          answer: "JaCoCo is a Java code coverage library that measures which parts of the code are executed during tests and can generate coverage reports."
        },
        {
          question: "What is the purpose of running tests in CI?",
          answer: "Continuous integration runs automated checks consistently for code changes, helping teams detect regressions before merging or deploying."
        }
      ]
    },
    {
      id: "common-testing-mistakes",
      title: "13. Common Spring Boot Testing Mistakes",
      paragraphs: [
        "Testing mistakes often come from choosing a test setup that is too broad or too narrow for the behavior being verified. Mocking a repository does not verify SQL, and a repository test does not prove that the entire HTTP workflow is configured correctly.",
        "Another common problem is using @SpringBootTest for every test. Full context tests are valuable, but excessive use can slow the suite and make simple business logic tests unnecessarily complicated.",
        "Tests can also give false confidence when they mock authentication rather than testing JWT validation, rely on H2 for database-specific production behavior, or fail to verify persisted state after a transaction completes.",
        "Keep test scope aligned with the requirement. Verify business logic in unit tests, MVC behavior in web slices, persistence behavior in repository tests, and cross-layer behavior in integration tests."
      ],
      "bullets": [
        "Using @SpringBootTest for every unit test.",
        "Mocking the repository and assuming the database query has been tested.",
        "Using @WithMockUser and assuming JWT signature validation has been verified.",
        "Checking only that no exception occurred without asserting the result.",
        "Sharing mutable test data between tests.",
        "Relying on production external services in ordinary automated tests.",
        "Ignoring invalid inputs and failure scenarios.",
        "Assuming an integration test's transaction rolls back work performed on a separate server thread.",
        "Measuring coverage without evaluating assertion quality."
      ],
      "interviewQuestions": [
        {
          question: "Why should every test not use @SpringBootTest?",
          answer: "It loads a broader application context and is usually slower than unit tests or test slices. Use the narrowest setup that verifies the required behavior."
        },
        {
          question: "Why can H2-based tests miss production database bugs?",
          answer: "H2 and production databases may differ in SQL behavior, types, constraints, locking, and isolation. Database-specific behavior should be tested with a compatible engine."
        },
        {
          question: "Why is a test that only checks for no exception weak?",
          answer: "The method may return incorrect data or produce the wrong side effect without throwing. Assert the expected result and relevant behavior."
        },
        {
          question: "How do you decide which test annotation to use?",
          answer: "Choose based on the layer and behavior: plain JUnit and Mockito for isolated logic, @WebMvcTest for MVC behavior, @DataJpaTest for JPA behavior, and @SpringBootTest for broader integration."
        }
      ]
    },
    {
      id: "testing-quick-revision",
      title: "14. Quick Revision Notes",
      paragraphs: [
        "JUnit 5 provides the testing framework, while Mockito isolates components by controlling and verifying dependency interactions. A service unit test normally mocks the repository and verifies business logic without starting Spring.",
        "@SpringBootTest loads a broader application context. @WebMvcTest focuses on Spring MVC behavior, MockMvc exercises HTTP request handling without a live server, and @DataJpaTest focuses on persistence and repository behavior.",
        "Use integration tests to verify that multiple components work together. Use meaningful assertions, test error cases, keep test data isolated, and do not confuse mocked behavior with real infrastructure validation."
      ],
      bullets: [
        "JUnit 5: test framework.",
        "Mockito: mocks, stubs, and interaction verification.",
        "@Mock: creates a mock.",
        "@InjectMocks: creates the object under test and attempts mock injection.",
        "@SpringBootTest: broad application integration.",
        "@WebMvcTest: MVC test slice.",
        "MockMvc: in-process Spring MVC testing.",
        "@DataJpaTest: JPA and repository test slice.",
        "RANDOM_PORT: starts a real embedded server for HTTP integration tests.",
        "JaCoCo: measures Java code coverage.",
        "Arrange-Act-Assert: a common test structure.",
        "Choose the narrowest test setup that verifies the intended behavior."
      ]
    }
  ]
};
