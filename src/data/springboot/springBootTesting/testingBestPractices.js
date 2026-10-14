
export const testingBestPractices = {
  id: 1310,
  title: "Testing Best Practices",
  slug: "testing-best-practices",
  topicTitle: "Spring Boot Testing",
  description:
    "Learn how to organize maintainable tests, cover edge cases, isolate dependencies, prevent flaky tests, and run tests reliably in CI.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "test-names",
      title: "Write Readable Tests",
      paragraphs: [
        "A good test communicates the behavior it verifies. Use descriptive names and arrange, act, and assert sections so another developer can understand the setup, operation, and expected result.",
        "Test names such as shouldReturnEmployeeWhenIdExists are more useful than names such as test1 because they explain the intended behavior.",
        "A test should be easy to read without requiring the developer to understand the entire production implementation. The test should communicate what behavior is expected and under what conditions."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldReturnEmployeeWhenIdExists() {

    // Arrange
    Employee employee =
            new Employee(1L, "Ravi");

    when(repository.findById(1L))
            .thenReturn(Optional.of(employee));

    // Act
    Employee result =
            service.findEmployee(1L);

    // Assert
    assertEquals(
        "Ravi",
        result.getName()
    );
}`
      },
      bullets: [
        "Use descriptive test names.",
        "Keep each test focused on a behavior.",
        "Avoid unrelated assertions in one test.",
        "Use meaningful test data.",
        "Keep setup simple and explicit.",
        "Prefer Arrange, Act, Assert structure.",
        "Make failures easy to understand."
      ]
    },
    {
      id: "arrange-act-assert",
      title: "Follow Arrange, Act, Assert",
      paragraphs: [
        "Arrange, Act, Assert is a simple structure for organizing unit tests. Arrange prepares the test data and dependencies, Act executes the behavior being tested, and Assert verifies the expected result.",
        "Following this structure makes tests easier to read and prevents setup, execution, and verification logic from becoming mixed together."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCalculateFinalPrice() {

    // Arrange
    double price = 1000.0;
    double tax = 0.18;

    // Act
    double result =
            calculator.calculate(price, tax);

    // Assert
    assertEquals(
        1180.0,
        result
    );
}`
      },
      bullets: [
        "Arrange = prepare inputs and dependencies.",
        "Act = execute the method under test.",
        "Assert = verify the expected outcome.",
        "Keep the Act section small and obvious.",
        "Avoid performing multiple unrelated actions in one test."
      ]
    },
    {
      id: "single-responsibility",
      title: "Keep Tests Focused",
      paragraphs: [
        "A unit test should generally verify one meaningful behavior. A test that performs many unrelated operations can become difficult to diagnose when it fails.",
        "This does not mean every test can contain only one assertion. Multiple assertions can be appropriate when they describe different properties of the same expected result."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCreateEmployeeWithExpectedDetails() {

    Employee result =
            service.createEmployee(
                "Ravi",
                "ravi@example.com"
            );

    assertEquals(
        "Ravi",
        result.getName()
    );

    assertEquals(
        "ravi@example.com",
        result.getEmail()
    );

    assertNotNull(result.getId());
}`
      },
      bullets: [
        "Test one logical behavior at a time.",
        "Do not combine unrelated business scenarios.",
        "Multiple assertions are acceptable when they describe one result.",
        "Split tests when different failure conditions need independent diagnosis."
      ]
    },
    {
      id: "coverage",
      title: "Test Success and Failure Paths",
      paragraphs: [
        "Testing only the successful path leaves important behavior unverified. Include missing records, invalid input, boundary values, authorization failures, and relevant dependency errors.",
        "Code coverage measures which parts of code execute during tests. High coverage alone does not guarantee that assertions are meaningful or that business requirements are correct.",
        "A good test suite should focus on important behavior and risk rather than trying to increase a coverage percentage without improving confidence."
      ],
      bullets: [
        "Test valid requests.",
        "Test invalid and boundary inputs.",
        "Test missing resources.",
        "Test expected exceptions.",
        "Test security and authorization rules where relevant.",
        "Test dependency failures where the application handles them.",
        "Prioritize critical business rules."
      ]
    },
    {
      id: "edge-cases",
      title: "Test Boundary and Edge Cases",
      paragraphs: [
        "Edge cases are inputs or conditions near the limits of expected behavior. They are important because many defects occur at boundaries rather than in ordinary scenarios.",
        "For example, an employee search may need tests for an empty search string, one result, many results, no results, maximum page size, and invalid pagination values."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldRejectNegativeAge() {

    assertThrows(
        IllegalArgumentException.class,
        () -> service.validateAge(-1)
    );
}

@Test
void shouldAcceptMinimumValidAge() {

    assertDoesNotThrow(
        () -> service.validateAge(18)
    );
}

@Test
void shouldRejectAgeAboveAllowedLimit() {

    assertThrows(
        IllegalArgumentException.class,
        () -> service.validateAge(121)
    );
}`
      },
      bullets: [
        "Test minimum valid values.",
        "Test maximum valid values.",
        "Test values immediately outside valid boundaries.",
        "Test empty collections and empty strings when applicable.",
        "Test null values where null is a possible input.",
        "Test duplicate values where uniqueness matters."
      ]
    },
    {
      id: "isolation",
      title: "Keep Tests Isolated and Reliable",
      paragraphs: [
        "A test should not depend on the order in which other tests execute. Avoid shared mutable state, fixed external service dependencies, and assumptions about data left behind by earlier tests.",
        "Mock external dependencies for focused unit tests. For integration tests, provide controlled infrastructure and deterministic data. Clean up resources where the test framework does not already manage them.",
        "Tests should be independently runnable. If running one test passes but running the entire suite fails, shared state or environmental dependencies may be involved."
      ],
      bullets: [
        "Avoid test-order dependencies.",
        "Use predictable test data.",
        "Do not depend on public external APIs in ordinary unit tests.",
        "Avoid excessive mocking that makes tests reflect implementation details.",
        "Use test-specific configuration and secrets.",
        "Avoid shared mutable static state.",
        "Make each test responsible for its own required data."
      ]
    },
    {
      id: "test-doubles",
      title: "Use Test Doubles Appropriately",
      paragraphs: [
        "Test doubles replace real dependencies during tests. Common forms include mocks, stubs, spies, and fakes.",
        "Mockito is commonly used for mocks and stubbing in Spring Boot unit tests. The goal is not to mock everything, but to isolate the behavior that the test is responsible for verifying."
      ],
      code: {
        language: "text",
        code: `Unit Test

EmployeeService
      |
      +----> Mock EmployeeRepository
      |
      +----> Mock EmailService


Integration Test

EmployeeService
      |
      +----> Real EmployeeRepository
      |             |
      |             +----> Test Database
      |
      +----> Controlled Email Infrastructure`
      },
      bullets: [
        "Mock dependencies when interaction needs to be controlled or verified.",
        "Use stubs when a controlled return value is enough.",
        "Use real simple objects when mocking adds unnecessary complexity.",
        "Use integration tests when real component interaction matters.",
        "Do not mock the class whose behavior you are trying to test."
      ]
    },
    {
      id: "unit-vs-integration",
      title: "Choose the Correct Test Level",
      paragraphs: [
        "Not every behavior should be tested at the same level. Unit tests are useful for isolated business logic, repository tests verify persistence behavior, controller tests verify HTTP behavior, and integration tests verify important boundaries between real components.",
        "Using the correct test level prevents tests from becoming unnecessarily slow while still providing confidence where integration behavior matters."
      ],
      code: {
        language: "text",
        code: `Unit Test
   |
   +--> Service business logic
   +--> Mock dependencies

Repository Test
   |
   +--> JPA mappings
   +--> Repository queries
   +--> Test database

Controller Test
   |
   +--> HTTP request/response
   +--> Validation
   +--> Status codes

Integration Test
   |
   +--> Multiple real application components
   +--> Spring configuration
   +--> Component interaction`
      },
      bullets: [
        "Use unit tests for isolated business logic.",
        "Use @DataJpaTest for focused repository testing.",
        "Use HTTP-level controller tests for API behavior.",
        "Use broader integration tests for important component boundaries.",
        "Do not use the heaviest test type for every small behavior."
      ]
    },
    {
      id: "mocking-best-practice",
      title: "Avoid Over-Mocking",
      paragraphs: [
        "Mocking too many internal interactions can make tests tightly coupled to implementation details. A refactoring that preserves business behavior may then cause many tests to fail.",
        "Mock dependencies that are outside the unit's responsibility, such as repositories, external clients, or notification gateways, when isolation is useful."
      ],
      bullets: [
        "Mock external dependencies rather than every object.",
        "Do not mock simple value objects unnecessarily.",
        "Avoid verifying every internal method call.",
        "Verify meaningful interactions only.",
        "Prefer behavior-focused tests over implementation-focused tests."
      ]
    },
    {
      id: "test-data",
      title: "Use Meaningful and Deterministic Test Data",
      paragraphs: [
        "Test data should make the scenario obvious. Names such as Ravi, Arun, or Employee-101 can be easier to understand than unexplained random values.",
        "Deterministic data also makes failures reproducible. Random data can be useful for specialized property-based testing, but ordinary unit tests should normally use predictable inputs."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldFindEmployeeByEmail() {

    Employee employee =
            new Employee(
                1L,
                "Ravi",
                "ravi@example.com"
            );

    when(repository.findByEmail(
            "ravi@example.com"
    )).thenReturn(
        Optional.of(employee)
    );

    Employee result =
            service.findByEmail(
                "ravi@example.com"
            );

    assertEquals(
        "Ravi",
        result.getName()
    );
}`
      },
      bullets: [
        "Use data that explains the scenario.",
        "Avoid unexplained magic values.",
        "Keep data deterministic.",
        "Create only the records required for the test.",
        "Use builders or test fixtures when object construction becomes repetitive."
      ]
    },
    {
      id: "test-fixtures",
      title: "Manage Repeated Test Setup",
      paragraphs: [
        "When many tests repeatedly construct the same complex objects, test fixtures or factory methods can reduce duplication.",
        "However, avoid hiding too much setup inside a large helper. A test should still make its important assumptions visible."
      ],
      code: {
        language: "java",
        code: `private Employee createEmployee() {
    return new Employee(
        1L,
        "Ravi",
        "ravi@example.com"
    );
}

@Test
void shouldReturnEmployee() {

    Employee employee =
            createEmployee();

    when(repository.findById(1L))
            .thenReturn(
                Optional.of(employee)
            );

    Employee result =
            service.findEmployee(1L);

    assertEquals(
        "Ravi",
        result.getName()
    );
}`
      },
      bullets: [
        "Use factories for repetitive complex objects.",
        "Keep important scenario-specific values visible.",
        "Avoid giant setup methods used by unrelated tests.",
        "Keep test helpers simple and predictable."
      ]
    },
    {
      id: "exceptions",
      title: "Test Exception Behavior",
      paragraphs: [
        "Exception behavior is part of an application's contract. Tests should verify important exceptions such as resource-not-found, validation, conflict, and dependency failure scenarios.",
        "Use assertThrows when the purpose of the test is to verify that an exception is raised."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldThrowWhenEmployeeDoesNotExist() {

    when(repository.findById(99L))
            .thenReturn(Optional.empty());

    EmployeeNotFoundException exception =
            assertThrows(
                EmployeeNotFoundException.class,
                () -> service.findEmployee(99L)
            );

    assertEquals(
        "Employee not found",
        exception.getMessage()
    );
}`
      },
      bullets: [
        "Test important exception types.",
        "Verify meaningful exception messages when they are part of the contract.",
        "Test the failure path, not only the happy path.",
        "Avoid asserting implementation details that are not part of the behavior."
      ]
    },
    {
      id: "validation",
      title: "Test Validation Rules",
      paragraphs: [
        "Validation rules should be tested when they are important to the API contract or business behavior. Test valid input as well as invalid input.",
        "For controller-level validation, HTTP tests can verify the response status and validation error structure. For service-level validation, unit tests can verify the corresponding exception or result."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldRejectBlankEmployeeName() {

    assertThrows(
        IllegalArgumentException.class,
        () -> service.createEmployee("")
    );
}

@Test
void shouldAcceptValidEmployeeName() {

    assertDoesNotThrow(
        () -> service.createEmployee("Ravi")
    );
}`
      },
      bullets: [
        "Test valid input.",
        "Test blank and missing values.",
        "Test minimum and maximum lengths.",
        "Test invalid formats.",
        "Test business validation rules separately from persistence validation when appropriate."
      ]
    },
    {
      id: "security-testing",
      title: "Test Security and Authorization",
      paragraphs: [
        "Security behavior should be tested separately from ordinary business success cases. Important scenarios include unauthenticated requests, authenticated users, insufficient permissions, and access to protected resources.",
        "A successful authentication test does not automatically prove authorization rules are correct. Both authentication and authorization behavior should be covered where they matter."
      ],
      bullets: [
        "Test unauthenticated access.",
        "Test authenticated access.",
        "Test insufficient roles or permissions.",
        "Test access to resources owned by another user when applicable.",
        "Test security-related error responses."
      ]
    },
    {
      id: "controller-testing",
      title: "Test Controller/API Behavior",
      paragraphs: [
        "Controller tests should focus on HTTP behavior: URL mapping, HTTP method, request body, validation, status code, and response body.",
        "The controller test should not repeat every service implementation detail. The service can be mocked when the controller is the unit under test."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldReturnEmployee() throws Exception {

    when(service.findEmployee(1L))
            .thenReturn(
                new EmployeeDto(1L, "Ravi")
            );

    mockMvc.perform(
            get("/api/employees/1")
        )
        .andExpect(status().isOk())
        .andExpect(
            jsonPath("$.name")
                .value("Ravi")
        );
}`
      },
      bullets: [
        "Verify HTTP status codes.",
        "Verify response structure.",
        "Verify request validation where applicable.",
        "Verify important headers when applicable.",
        "Keep service implementation details out of controller tests."
      ]
    },
    {
      id: "repository-testing",
      title: "Test Repository Behavior Separately",
      paragraphs: [
        "Repository queries and entity mappings should be tested using an appropriate persistence test such as @DataJpaTest when repository behavior itself is important.",
        "Do not expect a Mockito service test to prove that a JPA query works. A mock repository returns whatever the test configures."
      ],
      bullets: [
        "Test derived queries.",
        "Test custom @Query methods.",
        "Test important entity mappings.",
        "Test relationships when needed.",
        "Test database constraints when important.",
        "Use a production-like database when database-specific behavior matters."
      ]
    },
    {
      id: "flaky-tests",
      title: "Prevent Flaky Tests",
      paragraphs: [
        "A flaky test sometimes passes and sometimes fails without a relevant code change. Flaky tests reduce trust in the test suite because developers start ignoring failures.",
        "Common causes include timing assumptions, real network dependencies, shared state, random data, thread scheduling, system time, and external services."
      ],
      code: {
        language: "text",
        code: `Common flaky-test causes

Test
 |
 +--> Thread timing
 |
 +--> System clock
 |
 +--> Random data
 |
 +--> Shared mutable state
 |
 +--> External API
 |
 +--> Database state
 |
 +--> Environment-specific behavior
 |
 v
Intermittent failure`
      },
      bullets: [
        "Avoid arbitrary Thread.sleep() where possible.",
        "Control time when time-dependent behavior is being tested.",
        "Mock external APIs in unit tests.",
        "Avoid shared mutable state.",
        "Use deterministic test data.",
        "Clean up resources.",
        "Investigate intermittent failures instead of repeatedly rerunning them."
      ]
    },
    {
      id: "time-testing",
      title: "Handle Time-Dependent Tests",
      paragraphs: [
        "Tests that depend directly on the current system time can become difficult to reproduce. A better approach is to inject a Clock or another controllable time source when application logic depends on time.",
        "This allows the test to control the current time instead of depending on the actual machine clock."
      ],
      code: {
        language: "java",
        code: `import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

Clock fixedClock =
        Clock.fixed(
            Instant.parse(
                "2026-01-01T00:00:00Z"
            ),
            ZoneOffset.UTC
        );

// Production code can receive Clock
// and use Instant.now(clock).`
      },
      bullets: [
        "Avoid directly depending on the real clock when deterministic testing matters.",
        "Inject Clock into time-dependent services.",
        "Use fixed time values in tests.",
        "Make time-related behavior reproducible."
      ]
    },
    {
      id: "external-services",
      title: "Avoid Real External Services in Unit Tests",
      paragraphs: [
        "Unit tests should normally not call real payment gateways, email servers, public APIs, or cloud services. External systems make tests slower and can make them fail because of network or service availability.",
        "Use mocks for isolated unit tests and dedicated integration environments when real integration behavior needs verification."
      ],
      bullets: [
        "Mock payment gateways in unit tests.",
        "Mock email clients in ordinary service tests.",
        "Mock external REST clients.",
        "Use integration environments for actual integration verification.",
        "Never depend on a public API being available for every local unit test."
      ]
    },
    {
      id: "test-configuration",
      title: "Use Test-Specific Configuration",
      paragraphs: [
        "Tests often need different configuration from production. Use dedicated test configuration, environment variables, or test property mechanisms instead of embedding production credentials.",
        "Database URLs, API keys, passwords, and other secrets should never be committed as real production values in test source code."
      ],
      code: {
        language: "properties",
        code: `# src/test/resources/application-test.properties

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=create-drop`
      },
      bullets: [
        "Keep test configuration separate from production configuration.",
        "Never commit real production secrets.",
        "Use environment variables or secret management where needed.",
        "Make test infrastructure reproducible."
      ]
    },
    {
      id: "test-organization",
      title: "Organize the Test Codebase",
      paragraphs: [
        "A predictable test structure makes large projects easier to maintain. Keep tests under src/test/java using package names that correspond to the production code where practical.",
        "Use clear naming conventions such as EmployeeServiceTest, EmployeeRepositoryTest, and EmployeeControllerTest."
      ],
      code: {
        language: "text",
        code: `src/
├── main/
│   └── java/
│       └── com/example/app/
│           ├── controller/
│           ├── service/
│           ├── repository/
│           └── entity/
│
└── test/
    ├── java/
    │   └── com/example/app/
    │       ├── controller/
    │       ├── service/
    │       └── repository/
    │
    └── resources/
        └── application-test.properties`
      },
      bullets: [
        "Keep tests under src/test/java.",
        "Use meaningful test class names.",
        "Keep test packages organized.",
        "Store test resources under src/test/resources.",
        "Avoid placing tests in production source directories."
      ]
    },
    {
      id: "coverage",
      title: "Understand Code Coverage",
      paragraphs: [
        "Code coverage indicates how much of the code was executed by the test suite. Common measurements include line coverage, branch coverage, and method coverage.",
        "Coverage is a useful signal, but it should not become the only definition of test quality. A test can execute a line without actually checking whether the behavior is correct."
      ],
      code: {
        language: "text",
        code: `Example

if (employee != null) {
    return employee.getName();
} else {
    return "Unknown";
}

Testing only the first path:

employee != null
      |
      v
return employee.getName()

Branch coverage is incomplete.

Good tests also cover:

employee == null
      |
      v
return "Unknown"`
      },
      bullets: [
        "Line coverage measures executed lines.",
        "Branch coverage considers decision paths.",
        "Method coverage measures executed methods.",
        "High coverage does not guarantee correct assertions.",
        "Use coverage to identify gaps, not as the only quality metric."
      ]
    },
    {
      id: "test-maintainability",
      title: "Make Tests Maintainable",
      paragraphs: [
        "Tests are production assets. They need readable code, useful abstractions, and regular maintenance.",
        "When production behavior intentionally changes, update the affected tests. Do not weaken tests simply to make a build pass."
      ],
      bullets: [
        "Remove obsolete tests.",
        "Refactor duplicated setup.",
        "Keep assertions meaningful.",
        "Use helper methods carefully.",
        "Keep test names synchronized with behavior.",
        "Treat test failures as useful feedback.",
        "Do not delete tests simply because they are inconvenient."
      ]
    },
    {
      id: "maven-ci",
      title: "Run Tests in Maven and CI",
      paragraphs: [
        "Run tests locally before committing changes and configure continuous integration to execute the test suite for each relevant change. A build should fail when required tests fail.",
        "Keep unit tests fast enough for frequent execution and reserve slower integration tests for checks that genuinely require Spring wiring, persistence, or external infrastructure."
      ],
      code: {
        language: "bash",
        code: `# Run tests
mvn test

# Clean and test
mvn clean test

# Package the application and run the configured tests
mvn package

# Skip tests - use only when there is a specific reason
mvn package -DskipTests`
      },
      bullets: [
        "Investigate failures instead of skipping tests to get a green build.",
        "Separate unit tests from slower integration tests when useful.",
        "Keep test reports available in CI.",
        "Use realistic test environments for important integration boundaries.",
        "Do not make skipping tests a normal development workflow."
      ]
    },
    {
      id: "ci-pipeline",
      title: "Testing in a CI Pipeline",
      paragraphs: [
        "Continuous integration should automatically build and test changes before they are merged or deployed. The exact pipeline depends on the project, but a typical Spring Boot pipeline compiles the application, runs tests, packages the application, and may perform additional quality checks.",
        "Fast unit tests can run on every change, while heavier integration tests can run in appropriate pipeline stages."
      ],
      code: {
        language: "text",
        code: `Developer Push
      |
      v
Checkout Code
      |
      v
Compile
      |
      v
Unit Tests
      |
      v
Integration Tests
      |
      v
Package
      |
      v
Quality Checks
      |
      v
Build Result
      |
   +--+--+
   |     |
 PASS   FAIL
   |     |
   v     v
Continue  Stop`
      },
      bullets: [
        "Run tests automatically.",
        "Fail the build when required tests fail.",
        "Keep CI output and test reports available.",
        "Separate fast and slow tests when useful.",
        "Use a reproducible test environment."
      ]
    },
    {
      id: "debug-failures",
      title: "Debug Test Failures Properly",
      paragraphs: [
        "When a test fails, first determine whether the failure is caused by production code, test code, configuration, test data, or the environment.",
        "Do not immediately modify the assertion just to make the test pass. Understand what behavior changed and whether the test or production code is actually incorrect."
      ],
      bullets: [
        "Read the complete failure message.",
        "Check the first meaningful cause in the exception chain.",
        "Reproduce the failure locally.",
        "Run the failing test independently.",
        "Check test data and mock configuration.",
        "Check database and external infrastructure for integration tests.",
        "Determine whether the expected behavior has intentionally changed.",
        "Update the test only when the expected behavior is genuinely different."
      ]
    },
    {
      id: "test-pyramid",
      title: "Understand the Testing Pyramid",
      paragraphs: [
        "The testing pyramid is a useful way to think about test distribution. Most tests should generally be fast and focused, while fewer tests should cover broader integration behavior.",
        "The exact ratio is not a strict rule. The important idea is to balance fast feedback with sufficient coverage of real integration boundaries."
      ],
      code: {
        language: "text",
        code: `             /\\
            /  \\
           / E2E\\
          /------\\
         /        \\
        /Integration\\
       /------------\\
      /              \\
     /   Unit Tests   \\
    /__________________\\

More unit tests:
- Fast
- Isolated
- Easy to run

Fewer broad tests:
- Slower
- More infrastructure
- More realistic integration`
      },
      bullets: [
        "Unit tests provide fast feedback.",
        "Integration tests verify real component boundaries.",
        "End-to-end tests verify broader user flows.",
        "The exact distribution depends on the application."
      ]
    },
    {
      id: "checklist",
      title: "Testing Checklist",
      bullets: [
        "Service business logic has unit tests.",
        "Controller endpoints have HTTP-level tests.",
        "Validation and exception responses are tested.",
        "Repository queries and entity mappings are tested.",
        "Security rules are tested.",
        "Integration tests cover important component boundaries.",
        "Success and failure paths are covered.",
        "Important edge cases are covered.",
        "Tests can run repeatedly without depending on execution order.",
        "Tests do not depend on public external services.",
        "Test data is deterministic.",
        "CI executes the required test suite.",
        "Production secrets are not stored in test source code.",
        "Test failures are investigated rather than simply skipped."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Testing Mistakes",
      paragraphs: [
        "Poor testing practices can create a test suite that is expensive to maintain without providing useful confidence. The goal is not simply to have many tests, but to have tests that reliably protect important behavior."
      ],
      bullets: [
        "Writing meaningless tests only to increase coverage.",
        "Using test names such as test1 or testMethod.",
        "Testing only happy paths.",
        "Depending on test execution order.",
        "Using real external services in unit tests.",
        "Over-mocking implementation details.",
        "Sharing mutable state between tests.",
        "Using random data without controlling the seed or scenario.",
        "Using Thread.sleep() as the primary synchronization strategy.",
        "Ignoring flaky tests.",
        "Skipping failing tests without understanding the reason.",
        "Using production credentials in test configuration.",
        "Using @SpringBootTest for every small unit test.",
        "Testing private implementation details instead of public behavior."
      ]
    },
    {
      id: "best-practices-summary",
      title: "Professional Testing Principles",
      paragraphs: [
        "Professional test suites prioritize confidence, speed, readability, and maintainability. A test should protect behavior that matters to the application and should fail for a meaningful reason when that behavior is broken.",
        "The best testing strategy combines different levels of tests. Unit tests provide fast feedback, repository tests validate persistence behavior, controller tests validate HTTP behavior, and integration tests validate important component boundaries."
      ],
      bullets: [
        "Test behavior, not implementation details.",
        "Keep tests deterministic.",
        "Keep tests independent.",
        "Use the smallest appropriate test scope.",
        "Mock dependencies only when isolation provides value.",
        "Test both success and failure paths.",
        "Cover important boundaries and edge cases.",
        "Keep test data understandable.",
        "Prevent flaky tests.",
        "Run tests automatically in CI.",
        "Treat test failures as feedback.",
        "Maintain tests as carefully as production code."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What makes a good unit test?",
          answer:
            "A good unit test is focused, deterministic, readable, independent, and verifies a meaningful behavior."
        },
        {
          question: "Does high code coverage guarantee good tests?",
          answer:
            "No. Coverage shows which code executed, but it does not prove that assertions are meaningful or requirements are correct."
        },
        {
          question: "What is regression testing?",
          answer:
            "Regression testing checks that existing behavior continues to work after code changes."
        },
        {
          question: "Why run tests in CI?",
          answer:
            "CI runs tests consistently on code changes and helps prevent defects from being merged or deployed unnoticed."
        },
        {
          question: "What is the Arrange-Act-Assert pattern?",
          answer:
            "Arrange prepares test data and dependencies, Act executes the behavior under test, and Assert verifies the expected result."
        },
        {
          question: "Why should tests be independent?",
          answer:
            "Independent tests can run in any order and produce consistent results. They are easier to debug and maintain."
        },
        {
          question: "What is a flaky test?",
          answer:
            "A flaky test is a test that intermittently passes or fails without a relevant code change, often because of timing, shared state, randomness, or external dependencies."
        },
        {
          question: "How can you prevent flaky tests?",
          answer:
            "Use deterministic test data, avoid unnecessary timing assumptions, isolate shared state, control time where needed, mock external services in unit tests, and provide controlled integration infrastructure."
        },
        {
          question: "Why should we avoid excessive mocking?",
          answer:
            "Excessive mocking couples tests to implementation details and can make tests brittle when the internal implementation changes."
        },
        {
          question: "What is the difference between unit testing and integration testing?",
          answer:
            "Unit testing isolates a small piece of behavior and usually replaces dependencies, while integration testing verifies that multiple real components work together correctly."
        },
        {
          question: "Should every test use @SpringBootTest?",
          answer:
            "No. @SpringBootTest loads a broad application context and can be slower. Use a smaller test scope such as Mockito, @WebMvcTest, or @DataJpaTest when appropriate."
        },
        {
          question: "Why should we test failure paths?",
          answer:
            "Failure paths contain important application behavior such as validation errors, missing resources, authorization failures, and dependency failures. Testing only success paths leaves these behaviors unverified."
        },
        {
          question: "Does one test need exactly one assertion?",
          answer:
            "No. Multiple assertions are acceptable when they verify different properties of the same logical behavior. Unrelated scenarios should generally be separated into different tests."
        },
        {
          question: "What is regression testing?",
          answer:
            "Regression testing verifies that existing functionality continues to behave correctly after new changes or bug fixes."
        },
        {
          question: "Why should tests avoid real external APIs?",
          answer:
            "Real external APIs introduce network dependency, latency, availability issues, credentials, and unpredictable responses. Unit tests should normally mock them, while dedicated integration tests can verify the actual integration."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "Your unit test passes individually but fails when the entire test suite runs. What would you investigate?",
          answer:
            "I would look for shared mutable state, static variables, database data left by another test, test-order dependency, incomplete cleanup, or another environmental dependency."
        },
        {
          question:
            "Your team has 95% code coverage but many production bugs. What could be wrong?",
          answer:
            "Coverage only measures executed code. The tests may have weak assertions, may not cover important business scenarios, or may execute code without verifying meaningful outcomes."
        },
        {
          question:
            "A test uses Thread.sleep(5000) and still occasionally fails. What would you do?",
          answer:
            "I would identify the actual synchronization condition and wait for that condition instead of relying on an arbitrary delay. For unit tests, I would also check whether the asynchronous dependency can be controlled or mocked."
        },
        {
          question:
            "A developer wants to mock every dependency in a service test. Is that always good?",
          answer:
            "No. Mock dependencies that need isolation, but avoid mocking simple objects or internal implementation details unnecessarily. Excessive mocking can make tests brittle."
        },
        {
          question:
            "A production bug occurred because a repository query was wrong, but the service unit test passed. Why?",
          answer:
            "The service test may have mocked the repository, so it tested service behavior against a configured response rather than executing the real repository query. A repository test such as @DataJpaTest can verify the actual query."
        },
        {
          question:
            "A test fails because it depends on the current system time. How can you improve it?",
          answer:
            "Inject a controllable Clock or another time source so the test can use a fixed instant instead of depending on the machine's current time."
        },
        {
          question:
            "Your CI build takes 30 minutes because every test starts the full Spring context. What would you improve?",
          answer:
            "I would identify tests that can use smaller scopes, such as plain Mockito unit tests, @WebMvcTest, or @DataJpaTest, and reserve broader @SpringBootTest tests for scenarios that actually require the full context."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Testing Best Practices Quick Reference",
      bullets: [
        "Use descriptive test names.",
        "Follow Arrange, Act, Assert.",
        "Test behavior rather than implementation details.",
        "Test both success and failure paths.",
        "Cover important edge cases and boundaries.",
        "Keep tests independent.",
        "Keep tests deterministic.",
        "Avoid unnecessary external dependencies.",
        "Avoid excessive mocking.",
        "Use Mockito for isolated unit testing.",
        "Use @DataJpaTest for focused repository testing.",
        "Use HTTP-level tests for controller/API behavior.",
        "Use broader integration tests for important component boundaries.",
        "Control time-dependent behavior.",
        "Use test-specific configuration.",
        "Never store production secrets in test source code.",
        "Do not ignore flaky tests.",
        "Run tests automatically in CI.",
        "Use code coverage as a signal, not the sole measure of quality.",
        "Treat tests as maintainable production code."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "The main goal of testing is confidence in application behavior, not simply achieving a high coverage percentage. Good tests are readable, deterministic, isolated, and focused on meaningful behavior.",
        "Remember the testing levels: unit tests isolate business logic, repository tests verify persistence behavior, controller tests verify HTTP behavior, and integration tests verify important interactions between real components.",
        "For interviews, be prepared to explain why excessive mocking, test-order dependencies, flaky tests, and meaningless coverage are harmful."
      ],
      bullets: [
        "Readable tests are easier to maintain.",
        "AAA = Arrange, Act, Assert.",
        "Test success and failure paths.",
        "Test important boundaries and edge cases.",
        "Keep tests independent.",
        "Avoid flaky tests.",
        "Do not rely on real external services in unit tests.",
        "Do not overuse mocks.",
        "Use the smallest appropriate test scope.",
        "High coverage does not automatically mean high-quality tests.",
        "CI should execute required tests automatically.",
        "Never skip a failing test just to obtain a green build.",
        "Treat test code as production-quality code."
      ]
    }
  ]
};
