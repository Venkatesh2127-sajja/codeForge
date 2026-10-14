
export const unitTestingWithJUnit5 = {
  id: 1302,
  title: "Unit Testing with JUnit 5",
  slug: "unit-testing-with-junit-5",
  topicTitle: "Spring Boot Testing",
  description:
    "Learn JUnit 5 annotations, test classes, test methods, assertions, lifecycle methods, parameterized tests, exception testing, and how to write focused unit tests in Java.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "junit",
      title: "What Is JUnit 5?",
      paragraphs: [
        "JUnit 5 is a Java testing framework used to write and execute automated tests. Its programming model is called JUnit Jupiter, which provides annotations such as @Test, @BeforeEach, @AfterEach, and @ParameterizedTest.",
        "JUnit 5 helps developers verify that individual pieces of application behavior work as expected. Instead of manually running the application and checking results, automated tests execute the code and verify expected outcomes.",
        "A unit test should focus on one behavior and make its expected result clear. Tests usually follow an Arrange, Act, and Assert structure: prepare inputs, execute the behavior, and verify the result.",
        "A good unit test should be fast, isolated, deterministic, readable, and repeatable."
      ],
      bullets: [
        "@Test marks a test method.",
        "@BeforeEach runs before each test method.",
        "@AfterEach runs after each test method.",
        "@BeforeAll runs once before all test methods.",
        "@AfterAll runs once after all test methods.",
        "@DisplayName gives a test a readable description.",
        "@Disabled temporarily disables a test.",
        "@Nested groups related tests.",
        "@ParameterizedTest executes the same test with different input values."
      ]
    },
    {
      id: "junit-architecture",
      title: "JUnit 5 Architecture",
      paragraphs: [
        "JUnit 5 is built around the JUnit Platform. The platform provides the foundation for discovering and executing tests, while JUnit Jupiter provides the programming model used to write modern JUnit 5 tests.",
        "JUnit Vintage provides support for older JUnit 3 and JUnit 4 tests when the required engine is available."
      ],
      bullets: [
        "JUnit Platform provides the test execution foundation.",
        "JUnit Jupiter provides the JUnit 5 programming model.",
        "JUnit Vintage supports older JUnit versions.",
        "JUnit Jupiter provides modern annotations such as @Test and @ParameterizedTest."
      ],
      code: {
        language: "text",
        code: `JUnit 5
   |
   +-- JUnit Platform
   |      |
   |      +-- Discovers tests
   |      +-- Executes test engines
   |
   +-- JUnit Jupiter
   |      |
   |      +-- @Test
   |      +-- @BeforeEach
   |      +-- @AfterEach
   |      +-- @ParameterizedTest
   |
   +-- JUnit Vintage
          |
          +-- Older JUnit tests`
      }
    },
    {
      id: "dependency",
      title: "Testing Dependency",
      paragraphs: [
        "In a typical Spring Boot project, spring-boot-starter-test provides common testing libraries, including JUnit Jupiter, Spring Test, and Mockito. The exact dependency versions are managed by the Spring Boot dependency management configuration.",
        "For a Maven-based Spring Boot application, this starter is normally enough to begin writing unit tests."
      ],
      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>`
      },
      bullets: [
        "Add the dependency in pom.xml.",
        "Keep it in test scope.",
        "Use dependency versions managed by your Spring Boot version.",
        "Test classes normally go under src/test/java.",
        "Test resources normally go under src/test/resources."
      ]
    },
    {
      id: "test-class",
      title: "JUnit 5 Test Class Structure",
      paragraphs: [
        "A JUnit 5 test class is normally a regular Java class containing methods annotated with JUnit annotations. Unlike older testing styles, a JUnit 5 test class does not need to extend a special base class.",
        "A common naming convention is to append Test to the production class name. For example, CalculatorTest tests Calculator and EmployeeServiceTest tests EmployeeService."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @Test
    void shouldAddTwoNumbers() {

        Calculator calculator = new Calculator();

        int result = calculator.add(10, 20);

        assertEquals(30, result);
    }
}`
      },
      bullets: [
        "Use a meaningful test class name.",
        "Keep test classes under src/test/java.",
        "Test methods are usually package-private.",
        "Use descriptive test method names.",
        "Keep each test focused on one behavior."
      ]
    },
    {
      id: "calculator",
      title: "Create a Class and Test It",
      paragraphs: [
        "Suppose an application contains a Calculator class. Because the add method does not depend on Spring, a unit test can instantiate the class directly without starting the Spring application context.",
        "This is a pure unit test because only the Calculator behavior is being tested. There is no database, HTTP server, Spring context, or external service involved."
      ],
      code: {
        language: "java",
        code: `// Calculator.java
package com.codeforge.service;

public class Calculator {

    public int add(int first, int second) {
        return first + second;
    }
}

// CalculatorTest.java
package com.codeforge.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    private final Calculator calculator = new Calculator();

    @Test
    void shouldAddPositiveNumbers() {
        int result = calculator.add(10, 20);

        assertEquals(30, result);
    }

    @Test
    void shouldSupportNegativeNumbers() {
        int result = calculator.add(-5, 2);

        assertEquals(-3, result);
    }
}`
      },
      output:
        "shouldAddPositiveNumbers: PASSED\nshouldSupportNegativeNumbers: PASSED"
    },
    {
      id: "arrange-act-assert",
      title: "Arrange, Act, Assert Pattern",
      paragraphs: [
        "Arrange, Act, Assert, commonly called AAA, is a common structure for writing readable unit tests.",
        "Arrange prepares the test data and dependencies. Act executes the method being tested. Assert verifies that the actual result matches the expected result."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCalculateTotalPrice() {

    // Arrange
    PriceCalculator calculator = new PriceCalculator();
    double price = 100.0;
    int quantity = 3;

    // Act
    double result =
        calculator.calculateTotal(price, quantity);

    // Assert
    assertEquals(300.0, result);
}`
      },
      bullets: [
        "Arrange = prepare the test.",
        "Act = execute the behavior.",
        "Assert = verify the result.",
        "AAA improves test readability.",
        "AAA is a testing convention, not a JUnit requirement."
      ]
    },
    {
      id: "lifecycle",
      title: "JUnit 5 Test Lifecycle",
      paragraphs: [
        "JUnit 5 provides lifecycle annotations for executing setup and cleanup code around tests.",
        "@BeforeEach runs before every test method. @AfterEach runs after every test method. @BeforeAll runs once before all tests in the class, while @AfterAll runs once after all tests.",
        "Lifecycle methods are useful for preparing common test data, but shared mutable state should be avoided because it can make tests dependent on one another."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }

    @Test
    void shouldAddNumbers() {

        int result = calculator.add(10, 20);

        org.junit.jupiter.api.Assertions.assertEquals(
            30,
            result
        );
    }

    @Test
    void shouldAddNegativeNumbers() {

        int result = calculator.add(-10, -5);

        org.junit.jupiter.api.Assertions.assertEquals(
            -15,
            result
        );
    }
}`
      },
      bullets: [
        "@BeforeEach runs before every test.",
        "@AfterEach runs after every test.",
        "@BeforeAll runs once before all tests.",
        "@AfterAll runs once after all tests.",
        "Avoid unnecessary shared mutable state.",
        "Keep tests independent from one another."
      ]
    },
    {
      id: "assertions",
      title: "JUnit 5 Assertions",
      paragraphs: [
        "Assertions are used to verify whether the actual behavior matches the expected behavior. If an assertion fails, JUnit marks the test as failed.",
        "JUnit Jupiter provides many assertion methods, including assertEquals, assertNotEquals, assertTrue, assertFalse, assertNull, assertNotNull, assertSame, assertNotSame, assertThrows, and assertAll."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.*;

@Test
void shouldVerifyValues() {

    int result = 10 + 20;

    assertEquals(30, result);
    assertNotEquals(50, result);
    assertTrue(result > 0);
    assertFalse(result < 0);
    assertNotNull(result);

    String value = null;

    assertNull(value);
}`
      },
      bullets: [
        "assertEquals checks expected and actual values.",
        "assertNotEquals checks that values are different.",
        "assertTrue checks that a condition is true.",
        "assertFalse checks that a condition is false.",
        "assertNull checks for null.",
        "assertNotNull checks for a non-null value.",
        "assertSame checks object identity.",
        "assertNotSame checks that two references are different.",
        "assertThrows verifies an expected exception.",
        "assertAll groups related assertions."
      ]
    },
    {
      id: "assert-equals",
      title: "Using assertEquals",
      paragraphs: [
        "assertEquals is one of the most commonly used JUnit assertions. It compares an expected value with the actual value returned by the code under test.",
        "The expected value is normally written first and the actual value second."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCalculateSum() {

    Calculator calculator = new Calculator();

    int result = calculator.add(10, 15);

    assertEquals(25, result);
}`
      },
      bullets: [
        "Expected value comes first.",
        "Actual value comes second.",
        "Use meaningful expected values.",
        "Do not reproduce the exact production algorithm inside the test."
      ]
    },
    {
      id: "assert-all",
      title: "Using assertAll",
      paragraphs: [
        "assertAll allows several related assertions to be evaluated together. It is useful when testing multiple independent properties of the same object.",
        "Instead of stopping at the first failed assertion, JUnit can report failures from the grouped assertions."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldCreateEmployeeCorrectly() {

    Employee employee =
        new Employee(
            1L,
            "Ravi",
            "Developer"
        );

    assertAll(
        () -> assertEquals(1L, employee.getId()),
        () -> assertEquals("Ravi", employee.getName()),
        () -> assertEquals(
            "Developer",
            employee.getRole()
        )
    );
}`
      }
    },
    {
      id: "display-name",
      title: "Readable Test Names with @DisplayName",
      paragraphs: [
        "@DisplayName provides a readable name for a test method or test class. It is useful for test reports because the displayed name can describe the business behavior more clearly than a Java method name."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Calculator Tests")
class CalculatorTest {

    @Test
    @DisplayName("Should add two positive numbers")
    void shouldAddPositiveNumbers() {

        Calculator calculator =
            new Calculator();

        int result =
            calculator.add(10, 20);

        assertEquals(30, result);
    }
}`
      },
      bullets: [
        "@DisplayName improves test reports.",
        "It does not change test behavior.",
        "Use readable business-oriented descriptions."
      ]
    },
    {
      id: "exception-testing",
      title: "Testing Exceptions with assertThrows",
      paragraphs: [
        "Unit tests should verify important failure scenarios as well as successful scenarios.",
        "JUnit 5 provides assertThrows for verifying that a particular operation throws an expected exception.",
        "assertThrows returns the exception instance, allowing the test to inspect the message when the message is part of the expected contract."
      ],
      code: {
        language: "java",
        code: `class AgeValidator {

    public void validate(int age) {

        if (age < 18) {
            throw new IllegalArgumentException(
                "Age must be at least 18"
            );
        }
    }
}

@Test
void shouldRejectAgeBelow18() {

    AgeValidator validator =
        new AgeValidator();

    IllegalArgumentException exception =
        assertThrows(
            IllegalArgumentException.class,
            () -> validator.validate(15)
        );

    assertEquals(
        "Age must be at least 18",
        exception.getMessage()
    );
}`
      },
      bullets: [
        "assertThrows checks the expected exception type.",
        "The executable operation is commonly provided as a lambda.",
        "The returned exception can be inspected.",
        "Use exception assertions for meaningful failure behavior."
      ]
    },
    {
      id: "parameterized-tests",
      title: "Parameterized Tests",
      paragraphs: [
        "A parameterized test allows the same test logic to execute with different input values.",
        "This is useful when the behavior remains the same but the test data changes. It prevents developers from creating many nearly identical test methods."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertTrue;

class NumberTest {

    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void shouldRecognizeEvenNumbers(int number) {

        boolean result = number % 2 == 0;

        assertTrue(result);
    }
}`
      },
      bullets: [
        "@ParameterizedTest marks a parameterized test.",
        "@ValueSource provides simple input values.",
        "@CsvSource provides multiple values.",
        "@MethodSource can provide test data from a method.",
        "Parameterized tests reduce repetitive test code."
      ]
    },
    {
      id: "csv-source",
      title: "Parameterized Tests with @CsvSource",
      paragraphs: [
        "@CsvSource is useful when a test needs multiple related input values, such as an input value and its expected result."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @ParameterizedTest
    @CsvSource({
        "10, 20, 30",
        "5, 5, 10",
        "-5, 2, -3",
        "0, 10, 10"
    })
    void shouldAddNumbers(
            int first,
            int second,
            int expected) {

        Calculator calculator =
            new Calculator();

        int result =
            calculator.add(first, second);

        assertEquals(expected, result);
    }
}`
      }
    },
    {
      id: "disabled",
      title: "Temporarily Disabling a Test",
      paragraphs: [
        "@Disabled prevents JUnit from executing a test or test class. It can be useful temporarily when a test is incomplete or a known temporary issue prevents execution.",
        "Disabled tests should not be used to permanently hide failures. Important tests should be re-enabled after the underlying issue is resolved."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

class PaymentServiceTest {

    @Test
    @Disabled("Temporarily disabled")
    void shouldProcessPayment() {

        // Test implementation
    }
}`
      },
      bullets: [
        "@Disabled can be applied to a test method.",
        "@Disabled can be applied to a test class.",
        "Provide a reason when appropriate.",
        "Do not use @Disabled as a permanent solution for failing tests."
      ]
    },
    {
      id: "nested-tests",
      title: "Grouping Tests with @Nested",
      paragraphs: [
        "@Nested allows related tests to be grouped inside an inner test class. This can make large test classes easier to organize."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class EmployeeServiceTest {

    @Nested
    class FindEmployeeTests {

        @Test
        void shouldReturnEmployeeWhenFound() {
            // test
        }

        @Test
        void shouldThrowWhenEmployeeDoesNotExist() {
            // test
        }
    }

    @Nested
    class DeleteEmployeeTests {

        @Test
        void shouldDeleteExistingEmployee() {
            // test
        }
    }
}`
      }
    },
    {
      id: "test-isolation",
      title: "Test Isolation",
      paragraphs: [
        "Each unit test should be independent. One test should not depend on another test having run first.",
        "Shared mutable state can cause tests to behave differently depending on execution order. A good test should produce the same result whether it is executed alone or as part of the complete test suite."
      ],
      code: {
        language: "text",
        code: `Bad:

Test 1
  |
  +--> changes shared state
          |
          v
Test 2 depends on Test 1


Good:

Test 1
  |
  +--> creates its own data
  +--> verifies behavior

Test 2
  |
  +--> creates its own data
  +--> verifies behavior

Each test is independent.`
      },
      bullets: [
        "Avoid shared mutable static state.",
        "Create test data in a controlled setup.",
        "Do not depend on test execution order.",
        "Keep tests deterministic.",
        "A test should pass when executed individually."
      ]
    },
    {
      id: "unit-vs-spring",
      title: "Unit Test vs Spring Boot Test",
      paragraphs: [
        "A pure unit test normally creates the class under test directly and supplies its dependencies manually or through mocks. It does not start the Spring application context.",
        "A Spring Boot test can load Spring-managed beans and configuration. It is useful when testing application wiring, configuration, or integration between Spring components.",
        "Starting Spring is not necessary simply because the production class belongs to a Spring Boot project."
      ],
      code: {
        language: "text",
        code: `Pure Unit Test

JUnit
  |
  +--> Create object
  |
  +--> Mock dependencies if needed
  |
  +--> Call method
  |
  +--> Assert result


Spring Boot Test

JUnit
  |
  +--> Start Spring Context
  |
  +--> Create Spring Beans
  |
  +--> Inject dependencies
  |
  +--> Execute test
  |
  +--> Assert result`
      },
      bullets: [
        "Pure unit tests are usually faster.",
        "Unit tests provide strong isolation.",
        "Spring context tests provide broader integration coverage.",
        "Do not use @SpringBootTest for every simple class.",
        "Use the smallest test scope that proves the behavior."
      ]
    },
    {
      id: "run",
      title: "Run the Tests",
      paragraphs: [
        "Tests can be executed from the IDE or through Maven. Maven compiles the test sources and runs tests discovered by the configured test provider.",
        "When a test fails, inspect the assertion message, expected value, actual value, and stack trace."
      ],
      code: {
        language: "bash",
        code: `# Run all tests
mvn test

# Clean and run all tests
mvn clean test

# Run one test class
mvn -Dtest=CalculatorTest test

# Run one test method
mvn -Dtest=CalculatorTest#shouldAddPositiveNumbers test`
      },
      bullets: [
        "A passing test means its assertions completed successfully.",
        "A failing assertion indicates a mismatch between expected and actual behavior.",
        "A compilation error means the test or production code could not compile.",
        "A runtime test error can indicate unexpected exceptions or setup problems.",
        "IDEs can run individual tests, classes, or complete suites."
      ]
    },
    {
      id: "failure-analysis",
      title: "Understanding a Failed Test",
      paragraphs: [
        "A failed test is useful information. It tells you that the actual behavior did not match the expected behavior or that the test could not complete normally.",
        "When a test fails, first check the expected and actual values. Then inspect the test input and the production code involved."
      ],
      code: {
        language: "text",
        code: `Expected: 30
Actual:   25

assertEquals(30, result);

Flow:

Production code
      |
      v
returns 25
      |
      v
JUnit compares
25 != 30
      |
      v
TEST FAILED`
      },
      bullets: [
        "Read expected and actual values first.",
        "Check the failed assertion line.",
        "Check the input data.",
        "Determine whether production code or the test expectation is incorrect.",
        "Do not change the expected value just to make the test pass."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common JUnit 5 Mistakes",
      paragraphs: [
        "Beginners often write tests that are difficult to maintain because they test too much, depend on external systems, use unclear names, or verify the wrong behavior."
      ],
      bullets: [
        "Starting the entire Spring context for every simple unit test.",
        "Connecting to a real database from a pure unit test.",
        "Calling real external APIs from unit tests.",
        "Using vague names such as test1 or testMethod.",
        "Testing private implementation details instead of observable behavior.",
        "Making one test depend on another.",
        "Using shared mutable static state.",
        "Ignoring failing tests.",
        "Leaving important tests permanently disabled.",
        "Writing weak assertions that do not prove the expected behavior.",
        "Putting many unrelated behaviors into one test.",
        "Duplicating large amounts of setup code."
      ]
    },
    {
      id: "best-practices",
      title: "JUnit 5 Best Practices",
      paragraphs: [
        "Good unit tests should be easy to read, fast to execute, deterministic, isolated, and focused on meaningful application behavior."
      ],
      bullets: [
        "Use descriptive test names.",
        "Follow Arrange, Act, Assert.",
        "Test one meaningful behavior at a time.",
        "Test both successful and failure scenarios.",
        "Test important boundary conditions.",
        "Keep tests independent.",
        "Mock external dependencies when appropriate.",
        "Avoid unnecessary Spring context startup.",
        "Avoid real external network calls in unit tests.",
        "Keep test data simple.",
        "Use parameterized tests for repeated input combinations.",
        "Run tests automatically in CI.",
        "Fix failing tests instead of ignoring them.",
        "Use integration tests when infrastructure behavior must be verified."
      ]
    },
    {
      id: "complete-example",
      title: "Complete JUnit 5 Example",
      paragraphs: [
        "The following example demonstrates a simple business service with successful and failure scenarios. Because the service does not require Spring, it can be tested directly.",
        "The tests verify the normal business rule, a boundary condition, and invalid input."
      ],
      code: {
        language: "java",
        code: `// DiscountService.java
package com.codeforge.service;

public class DiscountService {

    public double calculateDiscount(double amount) {

        if (amount < 0) {
            throw new IllegalArgumentException(
                "Amount cannot be negative"
            );
        }

        if (amount >= 1000) {
            return amount * 0.10;
        }

        return 0;
    }
}

// DiscountServiceTest.java
package com.codeforge.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiscountServiceTest {

    private final DiscountService service =
        new DiscountService();

    @Test
    void shouldGiveDiscountForAmountAtLeast1000() {

        double discount =
            service.calculateDiscount(2000);

        assertEquals(200, discount);
    }

    @Test
    void shouldReturnZeroDiscountBelow1000() {

        double discount =
            service.calculateDiscount(500);

        assertEquals(0, discount);
    }

    @Test
    void shouldRejectNegativeAmount() {

        IllegalArgumentException exception =
            assertThrows(
                IllegalArgumentException.class,
                () -> service.calculateDiscount(-100)
            );

        assertEquals(
            "Amount cannot be negative",
            exception.getMessage()
        );
    }
}`
      },
      output:
        "shouldGiveDiscountForAmountAtLeast1000: PASSED\nshouldReturnZeroDiscountBelow1000: PASSED\nshouldRejectNegativeAmount: PASSED"
    },
    {
      id: "test-execution-flow",
      title: "JUnit 5 Test Execution Flow",
      paragraphs: [
        "Understanding the execution flow is useful for both development and interviews. JUnit discovers the test class and test methods, executes lifecycle callbacks, executes the test, evaluates assertions, and reports the result."
      ],
      code: {
        language: "text",
        code: `mvn test / IDE
       |
       v
JUnit Platform
       |
       v
Discover test
       |
       v
@BeforeEach
       |
       v
@Test
       |
       +--> Production code
       |
       +--> Assertions
       |
       v
@AfterEach
       |
       v
PASSED / FAILED`
      },
      bullets: [
        "JUnit discovers the test.",
        "Lifecycle methods execute at the appropriate time.",
        "The test method executes production behavior.",
        "Assertions verify expected behavior.",
        "JUnit reports the final result."
      ]
    },
    {
      id: "unit-vs-integration",
      title: "Unit Testing vs Integration Testing",
      paragraphs: [
        "Unit testing focuses on a small piece of behavior in isolation. Integration testing verifies that multiple components or infrastructure pieces work together.",
        "For example, a service unit test can mock a repository and verify business logic. A repository test can use @DataJpaTest to verify persistence behavior. A broader application test can use @SpringBootTest when multiple components need to work together."
      ],
      bullets: [
        "Unit test = isolated behavior.",
        "Repository test = persistence behavior.",
        "Controller test = HTTP behavior.",
        "@DataJpaTest = JPA-focused test slice.",
        "@WebMvcTest = MVC-focused test slice.",
        "@SpringBootTest = broader Spring application testing.",
        "Different test types provide different kinds of confidence."
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "Your Calculator class does not use Spring. Would you use @SpringBootTest to test it?",
          answer:
            "No. I would use a pure unit test, create the Calculator directly, call the method, and verify the result with JUnit assertions. Starting Spring would add unnecessary overhead."
        },
        {
          question: "How would you test a method that throws an exception?",
          answer:
            "I would use assertThrows to verify the expected exception type. If the exception message is part of the expected behavior, I can also assert the message."
        },
        {
          question: "How do you test the same method with many input values?",
          answer:
            "I would use @ParameterizedTest with a source such as @ValueSource, @CsvSource, or @MethodSource."
        },
        {
          question: "Why should unit tests be isolated?",
          answer:
            "Isolation prevents one test from affecting another and ensures that tests produce consistent results regardless of execution order."
        },
        {
          question: "What is AAA in unit testing?",
          answer:
            "AAA means Arrange, Act, Assert. Arrange prepares the test, Act executes the behavior, and Assert verifies the result."
        },
        {
          question: "What is the difference between a failed test and a compilation error?",
          answer:
            "A failed test means the code compiled but the test did not meet its expected behavior. A compilation error means the production or test code could not be compiled."
        }
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is JUnit 5?",
          answer:
            "JUnit 5 is a Java testing framework. JUnit Jupiter provides the programming model and annotations used to write tests."
        },
        {
          question: "Can we unit test a Java class without Spring Boot?",
          answer:
            "Yes. Plain Java classes can be instantiated and tested directly when they do not require Spring-managed dependencies."
        },
        {
          question: "What is the purpose of @Test?",
          answer:
            "It marks a method as a test method that the JUnit testing engine can discover and execute."
        },
        {
          question: "What does @BeforeEach do?",
          answer:
            "@BeforeEach runs before every test method and is commonly used to prepare fresh test objects or common test data."
        },
        {
          question: "What does @AfterEach do?",
          answer:
            "@AfterEach runs after every test method and can be used for cleanup."
        },
        {
          question: "What is @BeforeAll?",
          answer:
            "@BeforeAll runs once before all test methods in the test class."
        },
        {
          question: "What is assertEquals?",
          answer:
            "assertEquals compares an expected value with the actual value and fails the test when they are not equal."
        },
        {
          question: "What is assertThrows?",
          answer:
            "assertThrows verifies that executing an operation throws the expected exception type."
        },
        {
          question: "What is a parameterized test?",
          answer:
            "A parameterized test executes the same test logic multiple times with different input values."
        },
        {
          question: "What is @ValueSource?",
          answer:
            "@ValueSource provides simple argument values to a parameterized test."
        },
        {
          question: "What is @CsvSource?",
          answer:
            "@CsvSource provides multiple related arguments for each parameterized test invocation."
        },
        {
          question: "Should every unit test start the Spring context?",
          answer:
            "No. Pure unit tests should normally avoid starting the Spring context. Spring context tests are used when framework configuration or component integration needs to be verified."
        },
        {
          question: "What makes a good unit test?",
          answer:
            "A good unit test is focused, readable, deterministic, isolated, fast, and verifies meaningful behavior."
        },
        {
          question: "What is the difference between unit testing and integration testing?",
          answer:
            "Unit testing isolates a small piece of behavior, while integration testing verifies that multiple components or infrastructure pieces work together."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "JUnit 5 Quick Reference",
      bullets: [
        "@Test = defines a test method.",
        "@BeforeEach = runs before every test.",
        "@AfterEach = runs after every test.",
        "@BeforeAll = runs once before all tests.",
        "@AfterAll = runs once after all tests.",
        "@DisplayName = provides a readable test name.",
        "@Disabled = temporarily disables a test.",
        "@Nested = groups related tests.",
        "@ParameterizedTest = executes a test with different inputs.",
        "@ValueSource = supplies simple parameter values.",
        "@CsvSource = supplies multiple parameter values.",
        "assertEquals = compares expected and actual values.",
        "assertTrue = checks a true condition.",
        "assertFalse = checks a false condition.",
        "assertNull = checks for null.",
        "assertNotNull = checks for a non-null value.",
        "assertThrows = verifies an expected exception.",
        "assertAll = groups related assertions.",
        "AAA = Arrange, Act, Assert.",
        "Pure unit test = isolated test without Spring context.",
        "@SpringBootTest = broader Spring application testing."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "JUnit 5 is used to create and execute automated Java tests. JUnit Jupiter provides the programming model and annotations used in modern JUnit 5 tests.",
        "The basic unit-testing pattern is Arrange, Act, Assert. Prepare the input and object, execute the method, and verify the expected result.",
        "JUnit 5 provides lifecycle annotations, assertions, exception testing, parameterized tests, nested tests, readable display names, and test disabling.",
        "For Spring Boot applications, remember that a pure unit test does not need to start Spring. When dependencies such as repositories need to be controlled, Mockito can be introduced in the next stage."
      ],
      bullets: [
        "JUnit 5 = Java testing framework.",
        "JUnit Jupiter = JUnit 5 programming model.",
        "@Test = test method.",
        "@BeforeEach = setup before every test.",
        "@AfterEach = cleanup after every test.",
        "Assertions = verify expected behavior.",
        "assertThrows = test expected exceptions.",
        "@ParameterizedTest = test multiple inputs.",
        "AAA = Arrange, Act, Assert.",
        "Unit tests should be fast and isolated.",
        "Mockito can be used when service dependencies need to be mocked.",
        "@DataJpaTest is appropriate for repository-focused tests.",
        "@WebMvcTest is appropriate for controller-focused tests.",
        "@SpringBootTest is useful for broader integration testing."
      ]
    }
  ]
};
