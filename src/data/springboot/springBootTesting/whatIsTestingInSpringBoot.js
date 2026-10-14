
export const whatIsTestingInSpringBoot = {
  id: 1301,
  title: "What Is Testing in Spring Boot?",
  slug: "what-is-testing-in-spring-boot",
  topicTitle: "Spring Boot Testing",
  description:
    "Understand software testing, automated tests, the testing pyramid, Spring Boot testing levels, test types, test execution flow, and how to choose the right testing approach.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "definition",
      title: "What Is Software Testing?",
      paragraphs: [
        "Software testing is the process of checking whether an application behaves according to its requirements. Testing helps detect defects before they reach users and provides confidence when developers modify existing code.",
        "In a Spring Boot application, testing can cover individual Java methods, interactions between Spring components, HTTP endpoints, repository queries, validation rules, security behavior, and the complete application configuration.",
        "Automated tests are executable checks. Developers can run them during development and as part of a continuous integration pipeline whenever code changes.",
        "Testing is not only about finding bugs. Tests also document expected behavior and provide a safety net when code is refactored or new features are added."
      ],
      bullets: [
        "Unit tests verify small units of logic in isolation.",
        "Integration tests verify interactions between components.",
        "Web-layer tests verify controller and HTTP behavior.",
        "Repository tests verify persistence behavior.",
        "End-to-end tests exercise a complete user workflow.",
        "Automated tests can run repeatedly and consistently.",
        "Tests provide executable documentation of expected behavior."
      ]
    },
    {
      id: "why-testing",
      title: "Why Do Spring Boot Applications Need Tests?",
      paragraphs: [
        "Spring Boot applications commonly contain controllers, services, repositories, validation rules, security configuration, external integrations, and database interactions. A change in one layer can accidentally break behavior in another layer.",
        "For example, an employee service might calculate a salary incorrectly, a controller might return the wrong HTTP status, or a repository query might return unexpected records. Appropriate tests help detect these failures early.",
        "Without automated tests, developers may need to repeatedly start the application, send requests manually, inspect database records, and repeat the same checks after every code change.",
        "Automated tests make these checks repeatable and allow developers to detect regressions quickly."
      ],
      bullets: [
        "Detect defects earlier.",
        "Protect existing behavior during refactoring.",
        "Verify business rules.",
        "Document expected behavior through executable examples.",
        "Reduce repeated manual testing.",
        "Increase confidence when releasing changes.",
        "Support continuous integration and continuous delivery."
      ]
    },
    {
      id: "testing-types",
      title: "Types of Testing in Spring Boot",
      paragraphs: [
        "Spring Boot applications can be tested at different levels. Each level answers a different question.",
        "A unit test asks whether a small piece of logic works correctly. An integration test asks whether multiple components work together. A web-layer test asks whether HTTP behavior is correct. A repository test asks whether persistence behavior is correct. An end-to-end test asks whether a complete user workflow works across the system."
      ],
      bullets: [
        "Unit testing: tests individual classes or methods in isolation.",
        "Service testing: verifies business rules and service behavior.",
        "Controller testing: verifies HTTP requests and responses.",
        "Repository testing: verifies database and persistence behavior.",
        "Integration testing: verifies collaboration between multiple application components.",
        "End-to-end testing: verifies complete workflows across system boundaries."
      ],
      code: {
        language: "text",
        code: `Spring Boot Application

             Application
                  |
       +----------+----------+
       |          |          |
   Controller   Service   Repository
       |          |          |
       v          v          v
    Web Test   Unit Test   JPA Test
       |          |          |
       +----------+----------+
                  |
          Integration Test
                  |
                  v
          Complete Workflow
                  |
                  v
             E2E Test`
      }
    },
    {
      id: "testing-pyramid",
      title: "The Testing Pyramid",
      paragraphs: [
        "The testing pyramid is a useful guideline for balancing different test types. Many fast unit tests sit at the base, a smaller number of integration tests sit in the middle, and fewer end-to-end tests sit at the top.",
        "Unit tests are normally fast because they avoid expensive infrastructure. Integration tests are usually slower because they involve multiple components. End-to-end tests can be even more expensive because they exercise complete workflows and external boundaries.",
        "This is a guideline, not a strict rule. The right mix depends on application complexity, risk, architecture, and the behavior being tested."
      ],
      bullets: [
        "Unit tests: fast and focused on isolated logic.",
        "Integration tests: verify collaboration between components.",
        "End-to-end tests: verify complete workflows across system boundaries.",
        "The pyramid encourages fast feedback at the lower levels.",
        "Higher-level tests are still important for critical workflows."
      ],
      code: {
        language: "text",
        code: `             /\\
            /  \\
           / E2E\\
          /------\\
         /Integration\\
        /------------\\
       /  Unit Tests  \\
      /________________\\

More tests
    at lower levels

Fewer tests
    at higher levels`
      }
    },
    {
      id: "test-tools",
      title: "Common Spring Boot Testing Tools",
      paragraphs: [
        "Spring Boot provides a testing ecosystem that works with JUnit and other testing libraries. Different tools are useful for different testing levels.",
        "JUnit is commonly used as the test framework. Mockito is commonly used to create test doubles and isolate dependencies. MockMvc is useful for testing Spring MVC behavior. @DataJpaTest provides a focused JPA test slice, while @WebMvcTest provides a focused MVC test slice. @SpringBootTest is used for broader application-context testing."
      ],
      bullets: [
        "JUnit 5: test framework and assertions.",
        "Mockito: mocks and test doubles.",
        "MockMvc: Spring MVC request testing.",
        "@WebMvcTest: focused MVC testing.",
        "@DataJpaTest: focused JPA/repository testing.",
        "@SpringBootTest: broader Spring application testing.",
        "Testcontainers can be useful when realistic external infrastructure is required."
      ]
    },
    {
      id: "first-test",
      title: "A Simple JUnit Test",
      paragraphs: [
        "JUnit 5 is a popular testing framework for Java. A test method uses the @Test annotation, and assertions verify whether the actual result matches the expected result.",
        "This example does not start Spring Boot. The calculation is plain Java, so a simple JUnit test is enough."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @Test
    void shouldAddTwoNumbers() {

        int result = 10 + 20;

        assertEquals(30, result);
    }
}`
      },
      output: "Expected result: 30\nTest status: PASSED"
    },
    {
      id: "unit-testing-flow",
      title: "How a Unit Test Works",
      paragraphs: [
        "A unit test prepares the object and input, executes the method, and checks the result. Dependencies that are not part of the unit can be replaced with mocks or other test doubles.",
        "The important idea is isolation. If an EmployeeService depends on EmployeeRepository, a service unit test can mock the repository and focus on the service's business rules."
      ],
      code: {
        language: "text",
        code: `JUnit Test
    |
    v
Arrange
    |
    +--> Create test data
    +--> Create object
    +--> Mock dependencies
    |
    v
Act
    |
    +--> Call method
    |
    v
Assert
    |
    +--> Compare expected result
    |
    v
PASSED / FAILED`
      },
      bullets: [
        "Arrange = prepare test conditions.",
        "Act = execute the behavior.",
        "Assert = verify the outcome.",
        "Mocks can isolate dependencies.",
        "A unit test should normally avoid external infrastructure."
      ]
    },
    {
      id: "spring-test-flow",
      title: "How Testing Works in a Spring Boot Application",
      paragraphs: [
        "Spring Boot tests can operate at different levels. A pure unit test may not start Spring at all. A slice test starts a focused part of the Spring testing infrastructure. A broader integration test can start the application context.",
        "The test level should match the behavior being verified."
      ],
      code: {
        language: "text",
        code: `                 Test
                  |
        +---------+---------+
        |                   |
   Pure Unit             Spring Test
        |                   |
        |          +--------+--------+
        |          |                 |
        |      Test Slice       Full Context
        |          |                 |
        |     @WebMvcTest      @SpringBootTest
        |     @DataJpaTest
        |
        v
   JUnit + Mockito`
      },
      bullets: [
        "Pure unit test = no Spring context required.",
        "Slice test = focused Spring functionality.",
        "Full context test = broader application integration.",
        "Choose the test level based on the behavior under test."
      ]
    },
    {
      id: "unit-test-example",
      title: "Testing a Service Without Spring",
      paragraphs: [
        "A service containing business logic can often be tested without starting Spring. If the service has a repository dependency, Mockito can provide a controlled repository response.",
        "This keeps the test focused on business behavior rather than database behavior."
      ],
      code: {
        language: "java",
        code: `class EmployeeService {

    private final EmployeeRepository repository;

    EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Employee findById(Long id) {

        return repository.findById(id)
            .orElseThrow(
                () -> new EmployeeNotFoundException(
                    "Employee not found: " + id
                )
            );
    }
}


class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @InjectMocks
    private EmployeeService service;

    @Test
    void shouldReturnEmployeeWhenFound() {

        Employee employee =
            new Employee(1L, "Ravi");

        when(repository.findById(1L))
            .thenReturn(Optional.of(employee));

        Employee result =
            service.findById(1L);

        assertEquals(
            "Ravi",
            result.getName()
        );
    }
}`
      },
      bullets: [
        "The repository is mocked.",
        "No database is required.",
        "The test focuses on service behavior.",
        "This is a unit test rather than a repository integration test."
      ]
    },
    {
      id: "controller-testing",
      title: "Testing the Controller Layer",
      paragraphs: [
        "Controller tests verify the HTTP contract exposed by the application. This can include request mappings, request bodies, validation, status codes, headers, JSON responses, and exception handling.",
        "@WebMvcTest is commonly used when the goal is to test the MVC layer without loading the entire application."
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
}`
      },
      bullets: [
        "Controller tests focus on HTTP behavior.",
        "MockMvc can simulate requests.",
        "Service dependencies are commonly mocked.",
        "Database access is normally outside the scope of the test."
      ]
    },
    {
      id: "repository-testing",
      title: "Testing the Repository Layer",
      paragraphs: [
        "Repository tests verify persistence behavior such as saving entities, finding records, derived queries, custom queries, relationships, and constraints.",
        "@DataJpaTest is designed as a focused JPA test slice. It configures the JPA-related infrastructure needed for repository testing without loading the entire application."
      ],
      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void shouldFindEmployeeByEmail() {

        Employee employee =
            new Employee(
                null,
                "Ravi",
                "ravi@example.com"
            );

        repository.save(employee);

        Optional<Employee> result =
            repository.findByEmail(
                "ravi@example.com"
            );

        assertTrue(result.isPresent());
        assertEquals(
            "Ravi",
            result.get().getName()
        );
    }
}`
      },
      bullets: [
        "Repository tests verify persistence behavior.",
        "They can execute real repository methods.",
        "@DataJpaTest focuses on JPA components.",
        "Repository tests are different from service unit tests."
      ]
    },
    {
      id: "integration-testing",
      title: "What Is Integration Testing?",
      paragraphs: [
        "Integration testing verifies that multiple components work together correctly. Instead of replacing every dependency with a mock, an integration test may use real Spring-managed components.",
        "For example, a test may verify that a controller calls a service, the service calls a repository, and the repository successfully interacts with the configured database."
      ],
      code: {
        language: "text",
        code: `Integration Test

HTTP Request
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

Multiple real components
work together.`
      },
      bullets: [
        "Tests multiple components together.",
        "Provides stronger integration confidence.",
        "Usually slower than pure unit tests.",
        "Useful for important application boundaries."
      ]
    },
    {
      id: "springboottest-overview",
      title: "Testing with @SpringBootTest",
      paragraphs: [
        "@SpringBootTest creates a Spring Boot application context for testing. It is useful when multiple Spring-managed components need to work together or when application configuration itself needs verification.",
        "@SpringBootTest does not automatically mean a real HTTP server is started. The web environment can be configured depending on the test requirement."
      ],
      code: {
        language: "java",
        code: `@SpringBootTest
class ApplicationIntegrationTest {

    @Test
    void shouldLoadApplicationContext() {

        // The test succeeds if the
        // application context starts.
    }
}`
      },
      bullets: [
        "Loads a broad Spring Boot application context.",
        "Useful for integration testing.",
        "Usually heavier than a pure unit test.",
        "Can be configured with different web environments.",
        "Should be used intentionally rather than for every test."
      ]
    },
    {
      id: "test-environments",
      title: "Different Test Environments",
      paragraphs: [
        "Spring Boot tests can use different environments depending on whether the test needs only application context behavior, simulated MVC behavior, or an actual embedded server."
      ],
      code: {
        language: "java",
        code: `// Context with mock web environment
@SpringBootTest
class MockEnvironmentTest {
}


// Start embedded server on random port
@SpringBootTest(
    webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT
)
class RandomPortTest {
}


// Start embedded server using configured port
@SpringBootTest(
    webEnvironment =
        SpringBootTest.WebEnvironment.DEFINED_PORT
)
class DefinedPortTest {
}`
      },
      bullets: [
        "MOCK is useful when a real server is unnecessary.",
        "RANDOM_PORT starts an embedded server on a random port.",
        "DEFINED_PORT uses the configured server port.",
        "NONE disables the web environment."
      ]
    },
    {
      id: "test-data",
      title: "Test Data and Test Isolation",
      paragraphs: [
        "Good tests control their input data and do not depend on unpredictable external state. Test data should be easy to understand and should represent the scenario being tested.",
        "Tests should also be isolated. One test should not depend on data created by another test unless the testing framework explicitly manages the lifecycle."
      ],
      bullets: [
        "Use predictable test data.",
        "Avoid relying on production data.",
        "Avoid shared mutable state.",
        "Keep tests independent.",
        "Reset or isolate external state when necessary.",
        "Use builders or fixtures when object creation becomes repetitive."
      ]
    },
    {
      id: "test-lifecycle",
      title: "Basic JUnit Test Lifecycle",
      paragraphs: [
        "JUnit provides lifecycle annotations that allow preparation and cleanup around test methods.",
        "@BeforeEach runs before each test, while @AfterEach runs after each test. @BeforeAll and @AfterAll can be used for setup and cleanup that should happen once for the test class."
      ],
      code: {
        language: "java",
        code: `class EmployeeTest {

    @BeforeEach
    void setUp() {
        // Runs before every test
    }

    @Test
    void shouldCreateEmployee() {
        // Test
    }

    @AfterEach
    void tearDown() {
        // Runs after every test
    }
}`
      },
      bullets: [
        "@BeforeEach = before every test.",
        "@AfterEach = after every test.",
        "@BeforeAll = once before all tests.",
        "@AfterAll = once after all tests."
      ]
    },
    {
      id: "test-assertions",
      title: "Assertions in Testing",
      paragraphs: [
        "Assertions verify whether the actual result matches the expected behavior. JUnit 5 provides assertions for values, conditions, null checks, object identity, exceptions, and grouped assertions."
      ],
      code: {
        language: "java",
        code: `assertEquals(30, result);

assertTrue(result > 0);

assertFalse(result < 0);

assertNotNull(employee);

assertNull(value);

assertThrows(
    IllegalArgumentException.class,
    () -> service.validate(-1)
);`
      },
      bullets: [
        "Use assertions to verify observable behavior.",
        "Choose assertions that clearly communicate the expectation.",
        "Use assertThrows for expected exceptions.",
        "Avoid assertions that do not meaningfully verify the behavior."
      ]
    },
    {
      id: "automated-testing-ci",
      title: "Automated Testing in CI/CD",
      paragraphs: [
        "Automated tests become especially valuable when they run automatically whenever code changes. A continuous integration pipeline can compile the application, execute tests, and stop the build when important tests fail.",
        "This prevents known regressions from being silently introduced into shared branches or deployment pipelines."
      ],
      code: {
        language: "text",
        code: `Developer
    |
    v
Git Push
    |
    v
CI Pipeline
    |
    +--> Compile
    |
    +--> Unit Tests
    |
    +--> Integration Tests
    |
    +--> Build
    |
    v
PASS / FAIL`
      },
      bullets: [
        "Run automated tests after code changes.",
        "Fail the build when required tests fail.",
        "Keep fast tests early in the pipeline.",
        "Use integration tests for important boundaries.",
        "Do not rely only on manual testing before deployment."
      ]
    },
    {
      id: "test-coverage",
      title: "What Is Test Coverage?",
      paragraphs: [
        "Test coverage measures which parts of the code are executed by tests. Common metrics include line coverage, branch coverage, and method coverage.",
        "High coverage can be useful, but coverage percentage alone does not prove that tests are meaningful. A poorly designed test can execute code without verifying important behavior."
      ],
      bullets: [
        "Line coverage measures executed lines.",
        "Branch coverage considers conditional branches.",
        "Method coverage measures executed methods.",
        "Coverage is a useful signal, not a complete quality metric.",
        "Meaningful assertions matter more than simply increasing the percentage."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Testing Mistakes",
      paragraphs: [
        "Testing becomes less useful when developers choose the wrong test level, test implementation details, rely on shared state, or create tests that are difficult to maintain."
      ],
      bullets: [
        "Using @SpringBootTest for every test.",
        "Testing every method without considering behavior.",
        "Connecting to real external services in unit tests.",
        "Using production data for automated tests.",
        "Making tests depend on execution order.",
        "Writing unclear test names.",
        "Ignoring failed tests.",
        "Testing implementation details instead of observable behavior.",
        "Creating overly large end-to-end tests for simple business rules.",
        "Treating code coverage percentage as the only measure of test quality."
      ]
    },
    {
      id: "best-practices",
      title: "Spring Boot Testing Best Practices",
      paragraphs: [
        "A good Spring Boot testing strategy uses the smallest appropriate test scope for each behavior. Fast unit tests should provide quick feedback, focused slice tests should verify framework-specific layers, and broader integration tests should verify important component interactions."
      ],
      bullets: [
        "Write fast unit tests for business logic.",
        "Use Mockito to isolate service dependencies when appropriate.",
        "Use @WebMvcTest for focused controller testing.",
        "Use @DataJpaTest for repository testing.",
        "Use @SpringBootTest for broader integration behavior.",
        "Keep tests deterministic.",
        "Keep test data controlled.",
        "Use descriptive test names.",
        "Test success, failure, and important boundary cases.",
        "Run tests automatically in CI.",
        "Use coverage as a signal rather than the only quality metric.",
        "Avoid unnecessary full application-context startup."
      ]
    },
    {
      id: "testing-strategy-example",
      title: "Example Testing Strategy for an Employee API",
      paragraphs: [
        "Consider an Employee Management API with a controller, service, repository, and MySQL database. Each layer can have a different testing strategy.",
        "The controller should be tested for HTTP behavior, the service for business rules, the repository for persistence behavior, and the complete application through selected integration tests."
      ],
      code: {
        language: "text",
        code: `Employee API

POST /api/employees
GET  /api/employees/{id}
PUT  /api/employees/{id}
DELETE /api/employees/{id}

Testing:

Controller
   |
   +--> @WebMvcTest
   +--> MockMvc
   +--> HTTP status / JSON / validation

Service
   |
   +--> JUnit 5
   +--> Mockito
   +--> Business rules

Repository
   |
   +--> @DataJpaTest
   +--> Database behavior

Application
   |
   +--> @SpringBootTest
   +--> Integration behavior`
      },
      bullets: [
        "Do not test the same concern at every level unnecessarily.",
        "Use controller tests for HTTP behavior.",
        "Use service tests for business rules.",
        "Use repository tests for database behavior.",
        "Use integration tests for important cross-layer behavior."
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You have a simple Java service method that calculates an employee bonus. How would you test it?",
          answer:
            "I would use a JUnit unit test and instantiate the service directly. If it has dependencies, I would mock those dependencies with Mockito."
        },
        {
          question:
            "You need to verify that an endpoint returns HTTP 400 for invalid input. What would you use?",
          answer:
            "I would normally use @WebMvcTest with MockMvc because validation and HTTP response behavior belong to the MVC layer."
        },
        {
          question:
            "You need to verify that a repository query works correctly. What would you use?",
          answer:
            "I would use a repository-focused test such as @DataJpaTest so that the actual JPA repository behavior can be verified."
        },
        {
          question:
            "You need to verify that controller, service, and repository work together. What would you use?",
          answer:
            "I would use an integration test, commonly with @SpringBootTest, because the purpose is to verify interaction between multiple Spring-managed components."
        },
        {
          question:
            "Why should we not use @SpringBootTest for every test?",
          answer:
            "It can load a much larger application context than necessary. Focused unit and slice tests are generally faster and make failures easier to isolate."
        },
        {
          question:
            "What is the main purpose of the testing pyramid?",
          answer:
            "It encourages a healthy balance of many fast lower-level tests and fewer expensive higher-level tests while still maintaining confidence in important workflows."
        }
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is software testing?",
          answer:
            "Software testing checks whether application behavior meets its requirements and helps identify defects."
        },
        {
          question: "What is the difference between unit and integration testing?",
          answer:
            "Unit tests verify a small component in isolation, while integration tests verify collaboration between multiple components."
        },
        {
          question: "Why automate tests?",
          answer:
            "Automated tests can be executed repeatedly and consistently, helping detect regressions during development and deployment."
        },
        {
          question: "What is the testing pyramid?",
          answer:
            "The testing pyramid is a guideline that encourages many fast unit tests, fewer integration tests, and a smaller number of expensive end-to-end tests."
        },
        {
          question: "What is a unit test?",
          answer:
            "A unit test verifies a small piece of application behavior in isolation from external dependencies and infrastructure."
        },
        {
          question: "What is an integration test?",
          answer:
            "An integration test verifies that multiple components or infrastructure pieces work together correctly."
        },
        {
          question: "What is @WebMvcTest?",
          answer:
            "@WebMvcTest loads a focused Spring MVC test slice and is commonly used to test controllers, validation, serialization, and HTTP behavior."
        },
        {
          question: "What is @DataJpaTest?",
          answer:
            "@DataJpaTest provides a focused JPA test slice for testing repository and persistence behavior."
        },
        {
          question: "What is @SpringBootTest?",
          answer:
            "@SpringBootTest creates a Spring Boot application context and is commonly used for broader integration testing."
        },
        {
          question: "What is MockMvc?",
          answer:
            "MockMvc is a Spring testing utility that simulates MVC request processing so controller endpoints can be tested without requiring a real network server."
        },
        {
          question: "Why use Mockito?",
          answer:
            "Mockito creates mocks and other test doubles so dependencies can be controlled and the class under test can be isolated."
        },
        {
          question: "What is test coverage?",
          answer:
            "Test coverage measures how much of the code is executed by tests. It is useful as a quality signal but does not by itself prove that tests are meaningful."
        },
        {
          question: "What should a good automated test be?",
          answer:
            "A good test should be focused, readable, deterministic, isolated, repeatable, and should verify meaningful behavior."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Spring Boot Testing Quick Reference",
      bullets: [
        "JUnit 5 = Java testing framework.",
        "Mockito = mocking and test doubles.",
        "MockMvc = MVC request testing.",
        "@WebMvcTest = focused MVC test slice.",
        "@DataJpaTest = focused JPA/repository test slice.",
        "@SpringBootTest = broader application-context testing.",
        "Unit test = isolated behavior.",
        "Integration test = multiple components working together.",
        "E2E test = complete user workflow.",
        "AAA = Arrange, Act, Assert.",
        "Test coverage = measurement of executed code.",
        "CI = automatically compile and test code after changes.",
        "Use the smallest test scope that proves the behavior."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "Spring Boot testing is not a single type of test. Applications are tested at multiple levels depending on what behavior needs to be verified.",
        "Use JUnit and Mockito for isolated business logic, @WebMvcTest and MockMvc for focused MVC behavior, @DataJpaTest for repository behavior, and @SpringBootTest for broader application integration.",
        "The testing pyramid encourages many fast tests at lower levels and fewer expensive tests at higher levels. The exact balance should depend on the application's architecture and risk.",
        "The most important principle is to choose the smallest test scope that can prove the behavior you care about."
      ],
      bullets: [
        "Unit tests provide fast feedback.",
        "Integration tests verify collaboration.",
        "Web tests verify HTTP behavior.",
        "Repository tests verify persistence.",
        "End-to-end tests verify complete workflows.",
        "JUnit provides the core Java testing model.",
        "Mockito helps isolate dependencies.",
        "Spring Boot provides focused test slices and full-context testing.",
        "Automated tests should run in CI.",
        "Coverage is useful but meaningful assertions are more important."
      ]
    }
  ]
};
