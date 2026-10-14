
export const assertionsAndTestLifecycle = {
  id: 1303,
  title: "Assertions and Test Lifecycle",
  slug: "assertions-and-test-lifecycle",
  topicTitle: "Spring Boot Testing",
  description:
    "Understand JUnit assertions, setup and teardown methods, exception testing, test lifecycle behavior, and practical patterns for writing reliable JUnit 5 tests.",
  estimatedTime: "25 min",

  sections: [
    {
      id: "assertions",
      title: "What Are Assertions?",
      paragraphs: [
        "Assertions compare actual results with expected results. If an assertion fails, JUnit reports the test as failed and displays information about the mismatch.",
        "Choose assertions that express the behavior being verified. Clear assertions make tests easier to understand and debug.",
        "Assertions are one of the most important parts of a unit test because they determine whether the behavior produced by the code matches the expected behavior.",
        "A test without a meaningful assertion may execute successfully without actually verifying the expected result."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AssertionTest {

    @Test
    void shouldCheckResults() {
        assertEquals(10, 5 + 5);
        assertTrue(10 > 5);
        assertFalse(3 > 10);
        assertNotNull("CodeForge");
    }
}`
      },
      bullets: [
        "assertEquals(expected, actual): compares values.",
        "assertTrue(condition): requires a true condition.",
        "assertFalse(condition): requires a false condition.",
        "assertNull(value): requires null.",
        "assertNotNull(value): requires a non-null value.",
        "assertThrows(type, executable): checks an expected exception.",
        "Assertions should verify meaningful behavior.",
        "A failing assertion causes the test to fail."
      ]
    },

    {
      id: "assert-equals",
      title: "assertEquals",

      paragraphs: [
        "assertEquals is used when you want to verify that the expected value and actual value are equal.",
        "It is commonly used for method return values, calculated results, entity properties, service responses, and other values produced by application code."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCalculateTotal() {

    int actual = 10 + 20;

    assertEquals(30, actual);
}`
      },
      bullets: [
        "First argument → expected value.",
        "Second argument → actual value.",
        "The test passes when the values are equal.",
        "Use a clear expected value so the test documents the intended behavior."
      ]
    },

    {
      id: "assert-true-false",
      title: "assertTrue and assertFalse",

      paragraphs: [
        "assertTrue verifies that a condition evaluates to true.",
        "assertFalse verifies that a condition evaluates to false.",
        "These assertions are useful when testing boolean results or business conditions."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCheckConditions() {

    int age = 25;

    assertTrue(age >= 18);
    assertFalse(age < 18);
}`
      },
      bullets: [
        "Use assertTrue when the expected condition must be true.",
        "Use assertFalse when the expected condition must be false.",
        "Prefer assertions that clearly describe the expected behavior."
      ]
    },

    {
      id: "assert-null",
      title: "assertNull and assertNotNull",

      paragraphs: [
        "assertNull verifies that a value is null.",
        "assertNotNull verifies that a value is not null.",
        "These assertions are useful when testing object creation, optional results, lookup operations, and returned values."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCheckNullValues() {

    String value = null;

    assertNull(value);

    String name = "CodeForge";

    assertNotNull(name);
}`
      }
    },

    {
      id: "assert-same-not-same",
      title: "assertSame and assertNotSame",

      paragraphs: [
        "assertSame verifies that two references point to the exact same object instance.",
        "assertNotSame verifies that two references do not refer to the same object instance.",
        "These assertions are different from assertEquals, which generally verifies value equality."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCheckObjectIdentity() {

    Object first = new Object();
    Object second = first;
    Object third = new Object();

    assertSame(first, second);
    assertNotSame(first, third);
}`
      },
      bullets: [
        "assertEquals → checks equality of values.",
        "assertSame → checks object identity.",
        "Use assertSame only when object identity is part of the behavior being tested."
      ]
    },

    {
      id: "assert-all",
      title: "assertAll",

      paragraphs: [
        "assertAll allows multiple assertions to be grouped together.",
        "JUnit can evaluate the grouped assertions and report failures from the group rather than stopping at the first assertion in the same way as a simple sequential assertion flow."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldValidateEmployee() {

    Employee employee =
            new Employee(1L, "Ravi", "ravi@example.com");

    assertAll(
        () -> assertEquals(1L, employee.getId()),
        () -> assertEquals("Ravi", employee.getName()),
        () -> assertEquals(
                "ravi@example.com",
                employee.getEmail()
        )
    );
}`
      },
      bullets: [
        "Useful when validating multiple related properties.",
        "Keeps related assertions together.",
        "Can provide more complete failure information for grouped checks."
      ]
    },

    {
      id: "assert-message",
      title: "Assertion Failure Messages",

      paragraphs: [
        "JUnit assertions can include a failure message that explains what the assertion was intended to verify.",
        "Useful messages can make failed tests easier to understand, especially in larger test suites."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCalculatePrice() {

    int actual = 100;

    assertEquals(
        120,
        actual,
        "Final price should include the expected amount"
    );
}`
      },
      bullets: [
        "Failure messages should explain the expected behavior.",
        "Avoid messages that simply repeat the assertion.",
        "Use messages when they add useful debugging context."
      ]
    },

    {
      id: "lifecycle",
      title: "JUnit Test Lifecycle",
      paragraphs: [
        "JUnit lifecycle annotations allow a test class to prepare resources and clean them up.",
        "With the default per-method test instance lifecycle, JUnit creates a new test instance for each test method.",
        "@BeforeEach executes before each test method, while @AfterEach executes after each test method.",
        "@BeforeAll and @AfterAll run once for the test class under the usual default lifecycle; their methods are typically static unless the test instance lifecycle is configured differently."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.*;

class LifecycleTest {

    @BeforeAll
    static void beforeAll() {
        System.out.println("Once before all tests");
    }

    @BeforeEach
    void beforeEach() {
        System.out.println("Before each test");
    }

    @Test
    void firstTest() {
        System.out.println("First test");
    }

    @Test
    void secondTest() {
        System.out.println("Second test");
    }

    @AfterEach
    void afterEach() {
        System.out.println("After each test");
    }

    @AfterAll
    static void afterAll() {
        System.out.println("Once after all tests");
    }
}`
      },
      bullets: [
        "@BeforeAll: one-time class setup.",
        "@BeforeEach: setup for each test.",
        "@AfterEach: cleanup after each test.",
        "@AfterAll: one-time class cleanup.",
        "The default JUnit Jupiter lifecycle uses a new test instance for each test method.",
        "Do not depend on one test changing state for another test."
      ]
    },

    {
      id: "lifecycle-order",
      title: "Test Lifecycle Execution Order",

      paragraphs: [
        "The lifecycle methods provide predictable setup and cleanup stages around test execution.",
        "For a test class containing multiple test methods, the one-time setup occurs before the test methods, per-test setup occurs before each test, and per-test cleanup occurs after each test."
      ],
      code: {
        language: "text",
        code: `BeforeAll
    ↓
BeforeEach
    ↓
Test 1
    ↓
AfterEach
    ↓
BeforeEach
    ↓
Test 2
    ↓
AfterEach
    ↓
AfterAll`
      },

      bullets: [
        "@BeforeAll runs before test methods.",
        "@BeforeEach runs before every test.",
        "The test method executes.",
        "@AfterEach runs after every test.",
        "@AfterAll runs after the test methods."
      ]
    },

    {
      id: "before-each",
      title: "@BeforeEach",

      paragraphs: [
        "@BeforeEach is used for setup that needs to happen before every test method.",
        "It is commonly used to create fresh objects, initialize test data, or reset mutable state."
      ],
      code: {
        language: "java",
        code: `class EmployeeServiceTest {

    private EmployeeService service;

    @BeforeEach
    void setUp() {
        service = new EmployeeService();
    }

    @Test
    void shouldCreateEmployee() {
        // test
    }

    @Test
    void shouldFindEmployee() {
        // test
    }
}`
      },
      bullets: [
        "Runs before each test method.",
        "Useful for per-test setup.",
        "Helps keep tests independent.",
        "Can create fresh test objects."
      ]
    },

    {
      id: "after-each",
      title: "@AfterEach",

      paragraphs: [
        "@AfterEach is used for cleanup that needs to happen after each test method.",
        "It can be useful when a test allocates resources or modifies state that must be cleaned up."
      ],
      code: {
        language: "java",
        code: `@AfterEach
void tearDown() {
    service = null;
}`
      },

      bullets: [
        "Runs after each test method.",
        "Useful for cleanup.",
        "Can release test resources.",
        "Should not be used to hide failures or application problems."
      ]
    },

    {
      id: "before-all",
      title: "@BeforeAll",

      paragraphs: [
        "@BeforeAll is used for setup that should happen once for the test class.",
        "Under the default JUnit Jupiter lifecycle, the method is typically static."
      ],
      code: {
        language: "java",
        code: `@BeforeAll
static void setupOnce() {
    System.out.println("Initialize shared test resource");
}`
      },

      bullets: [
        "Runs once before all tests in the class.",
        "Typically static under the default lifecycle.",
        "Useful for expensive shared setup when appropriate.",
        "Shared state should be handled carefully so tests remain independent."
      ]
    },

    {
      id: "after-all",
      title: "@AfterAll",

      paragraphs: [
        "@AfterAll is used for cleanup that should happen once after the test class has completed.",
        "Under the default lifecycle, the method is typically static."
      ],
      code: {
        language: "java",
        code: `@AfterAll
static void cleanupOnce() {
    System.out.println("Release shared test resource");
}`
      },

      bullets: [
        "Runs once after all tests in the class.",
        "Typically static under the default lifecycle.",
        "Useful for releasing shared resources.",
        "Avoid unnecessary shared state between tests."
      ]
    },

    {
      id: "exceptions",
      title: "Test Expected Exceptions",
      paragraphs: [
        "Some methods should reject invalid input. assertThrows verifies that an operation throws the expected exception type.",
        "The assertion fails if the operation does not throw the expected exception.",
        "assertThrows also returns the thrown exception, which allows the test to verify additional details such as the exception message."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AgeValidatorTest {

    @Test
    void shouldRejectNegativeAge() {
        IllegalArgumentException exception =
                assertThrows(
                    IllegalArgumentException.class,
                    () -> validateAge(-1)
                );

        assertEquals(
            "Age cannot be negative",
            exception.getMessage()
        );
    }

    private void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative"
            );
        }
    }
}`
      },
      output: "Expected exception: IllegalArgumentException\nTest status: PASSED"
    },

    {
      id: "assert-throws-flow",
      title: "How assertThrows Works",

      paragraphs: [
        "The executable passed to assertThrows is run by JUnit.",
        "If the expected exception type is thrown, the assertion passes and the exception is returned.",
        "If no exception is thrown, or an incompatible exception type is thrown, the assertion fails."
      ],
      code: {
        language: "text",
        code: `assertThrows(ExpectedException.class, () -> {

    executeOperation();

});

Expected exception thrown
        ↓
Assertion PASSED

No exception
        ↓
Assertion FAILED

Wrong exception type
        ↓
Assertion FAILED`
      }
    },

    {
      id: "exception-message",
      title: "Testing Exception Messages",

      paragraphs: [
        "Sometimes checking only the exception type is not enough. If the application contract requires a specific message, the returned exception can be inspected."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldRejectEmptyName() {

    IllegalArgumentException exception =
            assertThrows(
                IllegalArgumentException.class,
                () -> validateName("")
            );

    assertEquals(
        "Name is required",
        exception.getMessage()
    );
}`
      },

      bullets: [
        "First verify the exception type.",
        "Then inspect the exception when its details are part of the expected behavior.",
        "Do not over-specify messages if the exact text is not part of the application's contract."
      ]
    },

    {
      id: "testing-exception-service",
      title: "Testing a Service Exception",

      paragraphs: [
        "In Spring Boot applications, exception testing is often used to verify that a service rejects invalid business operations."
      ],
      code: {
        language: "java",
        code: `class EmployeeService {

    public Employee findEmployee(Long id) {

        if (id == null) {
            throw new IllegalArgumentException(
                "Employee ID is required"
            );
        }

        return new Employee(id, "Ravi");
    }
}


@Test
void shouldRejectNullEmployeeId() {

    EmployeeService service =
            new EmployeeService();

    IllegalArgumentException exception =
            assertThrows(
                IllegalArgumentException.class,
                () -> service.findEmployee(null)
            );

    assertEquals(
        "Employee ID is required",
        exception.getMessage()
    );
}`
      }
    },

    {
      id: "assertions-vs-verification",
      title: "Why Assertions Matter",

      paragraphs: [
        "Running a method successfully is not the same as proving that it behaved correctly.",
        "Assertions turn a test from simple code execution into an executable verification of expected behavior."
      ],
      code: {
        language: "text",
        code: `Without assertion

call method()
    ↓
method executes
    ↓
test may still pass


With assertion

call method()
    ↓
capture result
    ↓
compare with expectation
    ↓
PASS or FAIL`
      },

      bullets: [
        "Assertions define expected behavior.",
        "Assertions detect incorrect results.",
        "Assertions make failures visible.",
        "Tests should verify meaningful outcomes."
      ]
    },

    {
      id: "test-isolation",
      title: "Test Independence and Isolation",

      paragraphs: [
        "Each test should ideally be independent of other tests.",
        "A test should not rely on another test running before it or modifying shared state.",
        "The default JUnit Jupiter per-method lifecycle helps by creating a fresh test instance for each test method."
      ],
      bullets: [
        "Do not depend on test execution order.",
        "Avoid unnecessary mutable static state.",
        "Initialize required data in setup methods.",
        "Clean up resources after tests.",
        "A failing test should not cause another unrelated test to fail because of shared state."
      ]
    },

    {
      id: "spring-boot-lifecycle-example",
      title: "Assertions and Lifecycle in a Spring Boot Test",

      paragraphs: [
        "In Spring Boot testing, lifecycle methods can prepare test data or dependencies while assertions verify the resulting behavior.",
        "For unit tests, you may create the class under test directly. For Spring integration tests, the test can instead load the Spring application context depending on the test annotation and scope."
      ],
      code: {
        language: "java",
        code: `@SpringBootTest
class EmployeeServiceTest {

    private Employee employee;

    @BeforeEach
    void setUp() {
        employee =
                new Employee(1L, "Ravi");
    }

    @Test
    void shouldCreateEmployee() {

        assertNotNull(employee);
        assertEquals(1L, employee.getId());
        assertEquals("Ravi", employee.getName());
    }

    @AfterEach
    void tearDown() {
        employee = null;
    }
}`
      },

      bullets: [
        "@BeforeEach prepares test state.",
        "@Test performs the behavior verification.",
        "Assertions verify the expected result.",
        "@AfterEach performs cleanup.",
        "The appropriate Spring test annotation depends on whether a real Spring context is required."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",

      bullets: [
        "Using the wrong expected and actual values in assertEquals.",
        "Writing tests without meaningful assertions.",
        "Using assertTrue for a comparison that would be clearer with assertEquals.",
        "Testing implementation details instead of observable behavior.",
        "Depending on another test to prepare data.",
        "Using shared mutable state between tests.",
        "Forgetting cleanup for resources created by tests.",
        "Assuming @BeforeAll runs before every test.",
        "Assuming @BeforeEach runs only once.",
        "Forgetting that @AfterEach executes after each test.",
        "Assuming test methods always run in source-code order.",
        "Using assertThrows but not verifying the expected exception type correctly.",
        "Over-testing an exception message when the exact message is not part of the application contract.",
        "Putting expensive setup in @BeforeEach when it could safely be shared.",
        "Using @SpringBootTest for every test even when a simple unit test would be sufficient."
      ]
    },

    {
      id: "best-practices",
      title: "Assertions and Lifecycle Best Practices",

      bullets: [
        "Use assertions that clearly express the expected behavior.",
        "Prefer assertEquals for direct value comparisons.",
        "Use assertTrue and assertFalse for meaningful boolean conditions.",
        "Use assertThrows for expected exceptions.",
        "Check exception details only when those details matter to the contract.",
        "Keep tests independent.",
        "Use @BeforeEach for fresh per-test setup.",
        "Use @AfterEach for per-test cleanup.",
        "Use @BeforeAll and @AfterAll carefully for genuinely shared setup and cleanup.",
        "Avoid unnecessary shared mutable state.",
        "Keep test methods focused on one behavior.",
        "Use descriptive test method names.",
        "Prefer unit tests over full Spring context tests when Spring infrastructure is not required."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is the difference between @BeforeEach and @BeforeAll?",
          answer:
            "@BeforeEach runs before every test method. @BeforeAll runs once before all test methods in the class under the default lifecycle."
        },
        {
          question: "What does assertThrows do?",
          answer:
            "It verifies that executing an operation throws an exception of the expected type and returns that exception for further assertions."
        },
        {
          question: "What happens when an assertion fails?",
          answer:
            "JUnit marks the test as failed and reports the assertion mismatch."
        },
        {
          question: "What is assertEquals used for?",
          answer:
            "assertEquals compares an expected value with an actual value and fails the test when they are not equal."
        },
        {
          question: "What is the difference between assertEquals and assertSame?",
          answer:
            "assertEquals checks value equality, while assertSame checks whether two references point to the exact same object instance."
        },
        {
          question: "What is @AfterEach used for?",
          answer:
            "@AfterEach runs after every test method and is commonly used for per-test cleanup."
        },
        {
          question: "What is @AfterAll used for?",
          answer:
            "@AfterAll runs once after all test methods in the test class and is commonly used for one-time cleanup."
        },
        {
          question: "Why is test isolation important?",
          answer:
            "Tests should be independent so that the result of one test does not depend on another test's execution or shared mutable state."
        },
        {
          question: "What is the default JUnit Jupiter test instance lifecycle?",
          answer:
            "The default lifecycle is PER_METHOD, meaning JUnit normally creates a new test class instance for each test method."
        },
        {
          question: "Can @BeforeAll be non-static?",
          answer:
            "Under the default PER_METHOD lifecycle, @BeforeAll methods are typically static. A test class can be configured with a different test instance lifecycle, such as PER_CLASS, which allows a non-static @BeforeAll method."
        },
        {
          question: "Why would you verify an exception message?",
          answer:
            "You may verify the message when the exact message is part of the behavior or API contract. Otherwise, checking the exception type may be sufficient."
        },
        {
          question: "What is assertAll?",
          answer:
            "assertAll groups multiple assertions so related assertions can be evaluated together and their failures reported as a group."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "You have three tests and all of them need a new Employee object. Where would you initialize it?",
          answer:
            "If each test needs an independent Employee instance, initialize it in @BeforeEach so each test receives fresh setup state."
        },
        {
          question:
            "A test expects IllegalArgumentException but the method throws NullPointerException. What happens?",
          answer:
            "assertThrows fails because the thrown exception type does not match the expected IllegalArgumentException."
        },
        {
          question:
            "A test expects an exception but the method completes successfully. What happens?",
          answer:
            "assertThrows fails because the expected exception was not thrown."
        },
        {
          question:
            "You have expensive database test setup that should happen once. Which lifecycle method might be appropriate?",
          answer:
            "@BeforeAll may be appropriate for genuinely shared one-time setup, provided the shared state is safe and does not make tests dependent on one another."
        },
        {
          question:
            "Why should you avoid depending on the order of test methods?",
          answer:
            "Tests should be independent. Test execution order should not determine whether another test passes or fails."
        },
        {
          question:
            "Your test only calls a method but contains no assertion. Is it a good unit test?",
          answer:
            "Usually not. Without an assertion or another explicit verification mechanism, the test may only prove that the method executed without throwing rather than verifying the expected behavior."
        },
        {
          question:
            "When would you use assertAll?",
          answer:
            "Use assertAll when several related properties or conditions should be verified together, such as validating multiple fields of a returned object."
        },
        {
          question:
            "Should every Spring Boot test use @SpringBootTest?",
          answer:
            "No. @SpringBootTest loads a Spring application context and is appropriate when integration with Spring infrastructure needs to be tested. Simple business logic can often be tested more quickly as a unit test without loading the full context."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Assertions and Lifecycle Quick Reference",

      code: {
        language: "text",
        code: `ASSERTIONS

assertEquals(expected, actual)
        ↓
Compare values

assertTrue(condition)
        ↓
Condition must be true

assertFalse(condition)
        ↓
Condition must be false

assertNull(value)
        ↓
Value must be null

assertNotNull(value)
        ↓
Value must not be null

assertSame(first, second)
        ↓
Same object instance

assertNotSame(first, second)
        ↓
Different object instances

assertAll(...)
        ↓
Group related assertions

assertThrows(Exception.class, ...)
        ↓
Verify expected exception


JUNIT LIFECYCLE

@BeforeAll
    ↓
Once before test class

@BeforeEach
    ↓
Before every test

@Test
    ↓
Test behavior

@AfterEach
    ↓
After every test

@AfterAll
    ↓
Once after test class`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "JUnit assertions verify expected behavior, while lifecycle annotations control setup and cleanup around test execution. Together they provide the basic structure needed to write clear, independent, and reliable tests."
      ],
      bullets: [
        "assertEquals compares expected and actual values.",
        "assertTrue verifies a true condition.",
        "assertFalse verifies a false condition.",
        "assertNull verifies null.",
        "assertNotNull verifies a non-null value.",
        "assertSame checks object identity.",
        "assertAll groups related assertions.",
        "assertThrows verifies expected exceptions.",
        "@BeforeAll runs once before the test class under the usual default lifecycle.",
        "@BeforeEach runs before every test.",
        "@AfterEach runs after every test.",
        "@AfterAll runs once after the test class.",
        "The default JUnit Jupiter lifecycle creates a new test instance for each test method.",
        "Tests should be independent.",
        "Avoid unnecessary shared mutable state.",
        "Use assertions that clearly express expected behavior.",
        "Use the smallest appropriate test scope; do not load the full Spring context unless the test requires it."
      ]
    }
  ]
};
