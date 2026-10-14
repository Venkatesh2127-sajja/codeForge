
export const mockitoFundamentals = {
  id: 1304,
  title: "Mockito Fundamentals",
  slug: "mockito-fundamentals",
  topicTitle: "Spring Boot Testing",
  description:
    "Learn Mockito fundamentals including mocks, stubbing, verification, argument matching, exceptions, call counts, and isolated unit testing.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "definition",
      title: "What Is Mockito?",
      paragraphs: [
        "Mockito is a Java mocking framework used to create test doubles for dependencies. A mock can return configured values and record interactions so that tests can verify how a class collaborates with another class.",
        "Consider an EmployeeService that depends on EmployeeRepository. A service unit test can mock the repository instead of connecting to a real database. This keeps the test focused on service behavior.",
        "Mockito is commonly used with JUnit 5 in Spring Boot projects for unit testing service classes. The goal is to test one unit of behavior while replacing external dependencies with controlled test doubles.",
        "A mock is not the same as a real implementation. Mockito creates an object whose behavior is controlled by the test. If a method has not been stubbed, Mockito normally returns a default value such as null, 0, false, or an empty collection depending on the method and Mockito configuration."
      ],
      bullets: [
        "A mock replaces a dependency during a test.",
        "Stubbing defines the result of a mock invocation.",
        "Verification checks whether an interaction occurred.",
        "Mocks help isolate a unit from external dependencies.",
        "Mockito works especially well with dependency injection.",
        "Mockito does not start the Spring application context by itself."
      ]
    },
    {
      id: "mockito-purpose",
      title: "Why Do We Need Mockito?",
      paragraphs: [
        "Suppose EmployeeService depends on EmployeeRepository, EmailService, PaymentService, and an external API client. If we use all real dependencies during a service unit test, the test may require a database, network connection, SMTP server, or other infrastructure.",
        "Mockito allows those dependencies to be replaced with mocks. The test can control exactly what each dependency returns and can verify whether important interactions occurred.",
        "This makes unit tests faster, deterministic, and focused on the behavior of the class being tested."
      ],
      code: {
        language: "text",
        code: `Without Mockito:

Test
  |
  v
EmployeeService
  |
  +----> Real EmployeeRepository ----> MySQL
  |
  +----> Real EmailService ----------> SMTP Server
  |
  +----> Real External API ----------> Internet


With Mockito:

Test
  |
  v
EmployeeService
  |
  +----> Mock EmployeeRepository
  |
  +----> Mock EmailService
  |
  +----> Mock ExternalApiClient

The test controls the dependencies.`
      },
      bullets: [
        "Avoid unnecessary database access in service unit tests.",
        "Avoid real network calls.",
        "Control dependency responses.",
        "Verify important interactions.",
        "Keep unit tests fast and predictable."
      ]
    },
    {
      id: "mock",
      title: "Creating a Mock with mock()",
      paragraphs: [
        "Mockito provides the mock() method for creating a mock object. The class or interface passed to mock() becomes the type of the generated mock.",
        "A mock can then be stubbed using when(...).thenReturn(...) or verified using verify(...)."
      ],
      code: {
        language: "java",
        code: `import static org.mockito.Mockito.*;

interface PaymentGateway {
    boolean processPayment(double amount);
}

class PaymentTest {

    void example() {
        PaymentGateway gateway =
                mock(PaymentGateway.class);

        when(gateway.processPayment(500.0))
                .thenReturn(true);

        boolean result =
                gateway.processPayment(500.0);

        System.out.println(result);
    }
}`
      },
      output: "true"
    },
    {
      id: "stubbing",
      title: "Stub a Method with when and thenReturn",
      paragraphs: [
        "Mockito's when(...).thenReturn(...) syntax configures the value returned when a mock method is called with matching arguments.",
        "Stubbing is useful when the class under test depends on a specific response from another component. Instead of executing the real dependency, the test provides a controlled response.",
        "The arguments used during the actual method call must match the stubbed invocation unless argument matchers such as any(), eq(), or anyLong() are used."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CalculatorServiceTest {

    @Test
    void shouldUseMockedDependency() {
        PriceProvider provider = mock(PriceProvider.class);

        when(provider.getPrice("BOOK"))
                .thenReturn(250.0);

        double price = provider.getPrice("BOOK");

        assertEquals(250.0, price);
    }

    interface PriceProvider {
        double getPrice(String productCode);
    }
}`
      },
      output: "Expected price: 250.0\nTest status: PASSED"
    },
    {
      id: "multiple-stubs",
      title: "Stubbing Multiple Values",
      paragraphs: [
        "A mock can have different configured responses for different arguments. This is useful when the behavior of the class under test depends on different input values.",
        "For example, a PriceProvider can return one price for BOOK and another price for LAPTOP."
      ],
      code: {
        language: "java",
        code: `PriceProvider provider = mock(PriceProvider.class);

when(provider.getPrice("BOOK"))
        .thenReturn(250.0);

when(provider.getPrice("LAPTOP"))
        .thenReturn(50000.0);

System.out.println(
        provider.getPrice("BOOK")
);

System.out.println(
        provider.getPrice("LAPTOP")
);`
      },
      output: "250.0\n50000.0"
    },
    {
      id: "then-throw",
      title: "Stubbing Exceptions with thenThrow",
      paragraphs: [
        "Mockito can simulate dependency failures using thenThrow(...). This allows the test to verify how the class under test behaves when a dependency throws an exception.",
        "This is especially useful for testing error handling without requiring the real dependency to fail."
      ],
      code: {
        language: "java",
        code: `import static org.mockito.Mockito.*;

UserRepository repository =
        mock(UserRepository.class);

when(repository.findById(99L))
        .thenThrow(
            new RuntimeException("Database unavailable")
        );

try {
    repository.findById(99L);
} catch (RuntimeException ex) {
    System.out.println(ex.getMessage());
}

interface UserRepository {
    Object findById(Long id);
}`
      },
      output: "Database unavailable"
    },
    {
      id: "then-answer",
      title: "Dynamic Stubbing with thenAnswer",
      paragraphs: [
        "thenReturn is useful when the return value is fixed. When the returned value needs to depend on the invocation arguments, Mockito provides thenAnswer.",
        "The answer callback receives information about the current invocation and can calculate a response dynamically."
      ],
      code: {
        language: "java",
        code: `import static org.mockito.Mockito.*;

PriceCalculator calculator =
        mock(PriceCalculator.class);

when(calculator.calculate(anyDouble()))
        .thenAnswer(invocation -> {
            double amount =
                    invocation.getArgument(0);

            return amount * 1.18;
        });

System.out.println(
        calculator.calculate(100.0)
);

interface PriceCalculator {
    double calculate(double amount);
}`
      },
      output: "118.0"
    },
    {
      id: "verify",
      title: "Verify Interactions",
      paragraphs: [
        "Mockito can verify that a dependency was called with expected arguments. This is useful when the interaction itself is part of the behavior being tested, such as ensuring an order is saved after it is created.",
        "Avoid verifying every internal method call. Tests that overuse interaction verification can become brittle when implementation details change.",
        "Verification is different from stubbing. Stubbing controls what a mock returns, while verification checks what happened during the test."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

class NotificationServiceTest {

    @Test
    void shouldSendNotification() {
        EmailSender sender = mock(EmailSender.class);
        NotificationService service =
                new NotificationService(sender);

        service.notifyUser("user@example.com");

        verify(sender).send("user@example.com");
    }

    interface EmailSender {
        void send(String email);
    }

    static class NotificationService {
        private final EmailSender sender;

        NotificationService(EmailSender sender) {
            this.sender = sender;
        }

        void notifyUser(String email) {
            sender.send(email);
        }
    }
}`
      },
      bullets: [
        "verify(mock): checks that a matching call occurred.",
        "verify(mock, times(n)): checks a specific call count.",
        "verifyNoInteractions(mock): checks that no interactions occurred.",
        "Use interaction verification when it matters to the behavior."
      ]
    },
    {
      id: "verify-times",
      title: "Verify Call Count with times()",
      paragraphs: [
        "Mockito can verify how many times a method was called. This is useful when repeated interactions are part of the expected behavior.",
        "times(1) is equivalent to the default verify(mock)."
      ],
      code: {
        language: "java",
        code: `EmailSender sender =
        mock(EmailSender.class);

sender.send("a@example.com");
sender.send("a@example.com");
sender.send("b@example.com");

verify(sender, times(2))
        .send("a@example.com");

verify(sender, times(1))
        .send("b@example.com");`
      },
      bullets: [
        "times(0) means the method must not be called.",
        "times(1) means exactly one invocation.",
        "times(n) checks an exact invocation count.",
        "never() is another readable way to express zero calls."
      ]
    },
    {
      id: "verify-never",
      title: "Verify That an Interaction Did Not Happen",
      paragraphs: [
        "Negative verification is useful when a particular condition should prevent an interaction. For example, an invalid order should not be saved.",
        "Mockito provides never() for this purpose."
      ],
      code: {
        language: "java",
        code: `OrderRepository repository =
        mock(OrderRepository.class);

OrderService service =
        new OrderService(repository);

service.createOrder(false);

verify(repository, never())
        .save();

interface OrderRepository {
    void save();
}

class OrderService {
    private final OrderRepository repository;

    OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    void createOrder(boolean valid) {
        if (valid) {
            repository.save();
        }
    }
}`
      },
      output: "Repository save() was never called."
    },
    {
      id: "argument-matchers",
      title: "Argument Matchers",
      paragraphs: [
        "Argument matchers allow a test to stub or verify calls without specifying one exact argument value.",
        "Common Mockito matchers include any(), anyString(), anyLong(), anyInt(), and eq().",
        "Matchers are especially useful when the exact value is generated inside the class under test."
      ],
      code: {
        language: "java",
        code: `import static org.mockito.Mockito.*;

EmailSender sender =
        mock(EmailSender.class);

sender.send("venkatesh@example.com");

verify(sender)
        .send(anyString());

verify(sender)
        .send(eq("venkatesh@example.com"));

interface EmailSender {
    void send(String email);
}`
      },
      bullets: [
        "anyString() matches any String value.",
        "anyLong() matches any long or Long-compatible value.",
        "anyInt() matches integer arguments.",
        "eq(value) matches the specified value.",
        "Use matchers consistently within a method invocation."
      ]
    },
    {
      id: "matcher-rule",
      title: "Important Matcher Rule",
      paragraphs: [
        "When Mockito argument matchers are used in a method call, avoid mixing raw values and matchers incorrectly. If one argument uses a matcher, other arguments generally need matchers as well.",
        "eq() can be used when one specific argument must be matched while other arguments use generic matchers."
      ],
      code: {
        language: "java",
        code: `// Good

verify(service)
        .send(
            eq("Venkatesh"),
            anyString()
        );

// Good

verify(service)
        .send(
            eq("Venkatesh"),
            eq("Welcome")
        );

// Avoid mixing a raw value with a matcher
// in the same invocation:

// verify(service).send(
//     "Venkatesh",
//     anyString()
// );`
      }
    },
    {
      id: "mock-vs-real",
      title: "Mocks Versus Real Dependencies",
      paragraphs: [
        "A mocked repository does not prove that a database query works. It only proves how the service behaves given the mock's configured responses. Database behavior should be covered by repository or integration tests.",
        "Use real objects for simple logic when possible, and mock dependencies that would otherwise make a unit test slow, nondeterministic, or difficult to isolate.",
        "For example, a service unit test can mock EmployeeRepository, while a repository integration test can use a real database or an appropriate test database."
      ],
      bullets: [
        "Unit test: isolate the class and mock external dependencies.",
        "Repository test: verify persistence behavior separately.",
        "Integration test: verify multiple real components working together.",
        "Do not expect Mockito to prove that SQL, database mappings, or network integrations work."
      ]
    },
    {
      id: "mock-lifecycle",
      title: "Mockito Mock Lifecycle",
      paragraphs: [
        "A Mockito mock exists for the lifetime of the test object that owns it. Mockito initializes annotations before the test runs when the appropriate Mockito integration is configured.",
        "When using JUnit 5, MockitoExtension is commonly used to initialize @Mock, @Spy, and @InjectMocks fields."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @Test
    void shouldTestEmployeeService() {
        // repository is initialized by Mockito
    }
}

interface EmployeeRepository {
}`
      },
      bullets: [
        "@ExtendWith(MockitoExtension.class) integrates Mockito with JUnit 5.",
        "Mockito annotations are initialized automatically by the extension.",
        "No Spring application context is required for a plain Mockito unit test."
      ]
    },
    {
      id: "mock-default-values",
      title: "Default Values from Mocks",
      paragraphs: [
        "If a mock method has not been stubbed, Mockito returns a default value for many common return types.",
        "For object references this is normally null. Primitive values receive their corresponding default such as 0 or false.",
        "This behavior can surprise beginners because an unstubbed repository method may return null rather than behaving like a real repository."
      ],
      code: {
        language: "java",
        code: `UserRepository repository =
        mock(UserRepository.class);

User user =
        repository.findById(1L);

int count =
        repository.count();

boolean exists =
        repository.existsById(1L);

System.out.println(user);
System.out.println(count);
System.out.println(exists);

interface UserRepository {
    User findById(Long id);
    int count();
    boolean existsById(Long id);
}

class User {}`
      },
      output: "null\n0\nfalse"
    },
    {
      id: "reset-clear",
      title: "Resetting and Clearing Mocks",
      paragraphs: [
        "Mockito provides reset() and clearInvocations(), but they should be used carefully. reset() removes stubbing and recorded interactions, while clearInvocations() removes recorded interactions but keeps existing stubbing.",
        "In most unit tests, it is cleaner to create a fresh mock for each test rather than manually resetting mocks."
      ],
      code: {
        language: "java",
        code: `EmailSender sender =
        mock(EmailSender.class);

when(sender.sendAndReturn())
        .thenReturn(true);

sender.sendAndReturn();

clearInvocations(sender);

// Stubbing still exists
boolean result =
        sender.sendAndReturn();

System.out.println(result);

interface EmailSender {
    boolean sendAndReturn();
}`
      },
      output: "true"
    },
    {
      id: "bdd-mockito",
      title: "BDDMockito Style",
      paragraphs: [
        "Mockito also provides BDD-style APIs through BDDMockito. The style uses given(...).willReturn(...) instead of when(...).thenReturn(...).",
        "The behavior is similar. The difference is mainly the style used to express test setup in a Given-When-Then structure."
      ],
      code: {
        language: "java",
        code: `import static org.mockito.BDDMockito.*;

PriceProvider provider =
        mock(PriceProvider.class);

given(provider.getPrice("BOOK"))
        .willReturn(250.0);

double price =
        provider.getPrice("BOOK");

then(provider)
        .should()
        .getPrice("BOOK");`
      },
      bullets: [
        "given(): describes the test setup.",
        "when the application action runs, the class under test executes.",
        "then(): verifies expected behavior.",
        "BDDMockito is optional; standard Mockito syntax is also widely used."
      ]
    },
    {
      id: "unit-test-flow",
      title: "Complete Mockito Unit Test Flow",
      paragraphs: [
        "A typical Mockito unit test follows a simple sequence: create or inject mocks, configure dependency behavior, execute the method under test, assert the result, and verify important interactions.",
        "This structure keeps the test easy to read and makes failures easier to diagnose."
      ],
      code: {
        language: "text",
        code: `1. Arrange
   |
   +--> Create mocks
   +--> Configure stubbing
   |
2. Act
   |
   +--> Call method under test
   |
3. Assert
   |
   +--> Check returned result/state
   |
4. Verify
   |
   +--> Check important dependency interactions`
      }
    },
    {
      id: "spring-boot-unit-test",
      title: "Mockito in a Spring Boot Service Test",
      paragraphs: [
        "In a typical Spring Boot application, the service may depend on a Spring Data JPA repository. A plain Mockito test can instantiate the service and mock the repository without starting Spring.",
        "This makes the test faster than a full application-context test and is appropriate when the goal is to test service logic rather than Spring configuration."
      ],
      code: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @InjectMocks
    private EmployeeService service;

    @Test
    void shouldReturnEmployee() {
        Employee employee =
                new Employee(1L, "Venkatesh");

        when(repository.findById(1L))
                .thenReturn(Optional.of(employee));

        Employee result =
                service.findById(1L);

        assertEquals(
                "Venkatesh",
                result.getName()
        );

        verify(repository)
                .findById(1L);
    }
}`
      },
      bullets: [
        "Mockito tests normally do not require @SpringBootTest.",
        "Use @SpringBootTest when the Spring application context is part of what you need to test.",
        "Use Mockito for isolated unit tests.",
        "Use constructor injection in services to make dependencies explicit."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mockito Mistakes",
      paragraphs: [
        "Mockito tests are easy to write but can become misleading if mocks are used incorrectly. The most common problem is testing the mock instead of testing the real class under test.",
        "Another common mistake is excessive verification. A test should verify meaningful behavior rather than every internal implementation detail."
      ],
      bullets: [
        "Forgetting to initialize Mockito annotations.",
        "Using @Mock without MockitoExtension or another initialization mechanism.",
        "Expecting a mock to execute the real database query.",
        "Forgetting to stub a dependency method.",
        "Verifying every internal method call.",
        "Using incorrect argument matchers.",
        "Using Mockito where a simple real object would be easier.",
        "Starting the complete Spring context for every simple service unit test.",
        "Testing implementation details instead of observable behavior.",
        "Creating complicated mock setups that are harder to understand than the production code."
      ]
    },
    {
      id: "mockito-best-practices",
      title: "Mockito Best Practices",
      paragraphs: [
        "Good Mockito tests should be small, readable, deterministic, and focused on one behavior. Mock only dependencies that need to be isolated.",
        "Constructor injection is particularly useful because the class under test clearly exposes its required dependencies. This also makes manual construction straightforward."
      ],
      bullets: [
        "Follow Arrange, Act, Assert structure.",
        "Mock external or expensive dependencies.",
        "Keep the number of mocks reasonable.",
        "Prefer constructor injection.",
        "Stub only behavior required by the test.",
        "Verify important interactions rather than every call.",
        "Use descriptive test names.",
        "Keep each test focused on one behavior.",
        "Do not use Mockito to test Mockito.",
        "Separate unit tests from integration tests.",
        "Avoid unnecessary reset() calls.",
        "Do not expose sensitive information in test output."
      ]
    },
    {
      id: "mockito-vs-springboot-test",
      title: "Mockito Test vs Spring Boot Test",
      paragraphs: [
        "A Mockito unit test focuses on one Java class and replaces its dependencies with mocks. It normally does not start the Spring application context.",
        "A Spring Boot integration-style test can start the application context and verify how Spring components work together. It is more expensive but can detect configuration and wiring problems that a plain Mockito test cannot."
      ],
      code: {
        language: "text",
        code: `Mockito Unit Test

JUnit
  |
  v
EmployeeService
  |
  +--> Mock EmployeeRepository

Spring Boot Test

JUnit
  |
  v
Spring ApplicationContext
  |
  +--> EmployeeService
  |
  +--> EmployeeRepository
  |
  +--> Database/Test Infrastructure`
      },
      bullets: [
        "Mockito unit test: fast and isolated.",
        "Spring Boot test: broader and closer to application runtime.",
        "Mockito cannot prove Spring bean configuration is correct.",
        "Spring tests can verify dependency wiring and configuration."
      ]
    },
    {
      id: "scenario",
      title: "Real-World Testing Scenario",
      paragraphs: [
        "Suppose an OrderService creates an order. It depends on OrderRepository and PaymentService. The unit test can mock both dependencies.",
        "The test can configure PaymentService to return successful payment processing, call OrderService, verify that the order repository saves the order, and assert the returned result.",
        "A second test can configure PaymentService to fail and verify that the order is not saved. This tests business behavior without connecting to a real payment provider or database."
      ],
      code: {
        language: "text",
        code: `Successful payment

OrderService
     |
     +----> PaymentService mock
     |          |
     |          +--> SUCCESS
     |
     +----> OrderRepository mock
                |
                +--> save() verified


Failed payment

OrderService
     |
     +----> PaymentService mock
                |
                +--> FAILURE
                       |
                       v
                Order is NOT saved`
      }
    },
    {
      id: "testing-exceptions",
      title: "Testing Exception Handling with Mockito",
      paragraphs: [
        "Mockito is useful for testing exception paths because a dependency can be configured to throw an exception.",
        "For example, if a repository throws a RuntimeException, the service can be tested to confirm that the expected application exception is produced or that the correct recovery behavior occurs."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldHandleRepositoryFailure() {

    when(repository.findById(1L))
            .thenThrow(
                new RuntimeException(
                    "Database unavailable"
                )
            );

    assertThrows(
        EmployeeServiceException.class,
        () -> service.findById(1L)
    );

    verify(repository)
            .findById(1L);
}`
      },
      bullets: [
        "thenThrow() simulates dependency failure.",
        "assertThrows() checks expected exceptions.",
        "verify() can confirm the dependency was actually called.",
        "Test both successful and failure paths."
      ]
    },
    {
      id: "assertion-vs-verification",
      title: "Assertion vs Verification",
      paragraphs: [
        "Assertions and verifications answer different questions. An assertion checks the result or state produced by the operation. Verification checks an interaction with a mock dependency.",
        "A strong unit test may use both when both the result and the interaction are important."
      ],
      code: {
        language: "text",
        code: `Assertion

"What result did my method produce?"

assertEquals(
    "Venkatesh",
    result.getName()
);


Verification

"What interaction happened with the dependency?"

verify(repository)
    .findById(1L);`
      },
      bullets: [
        "assertEquals() checks a value.",
        "assertTrue()/assertFalse() check boolean conditions.",
        "assertThrows() checks exception behavior.",
        "verify() checks mock interaction.",
        "Do not replace meaningful assertions with verification alone."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is Mockito?",
          answer:
            "Mockito is a mocking framework that creates test doubles and supports stubbing and verification of interactions."
        },
        {
          question: "What is stubbing?",
          answer:
            "Stubbing configures a mock to return a specified value or perform a specified action when invoked."
        },
        {
          question: "What is the purpose of verify()?",
          answer:
            "verify() checks whether a mock received a specified interaction."
        },
        {
          question: "What is the difference between mocking and stubbing?",
          answer:
            "Mocking creates a replacement dependency, while stubbing configures the behavior of that mock for specific method calls."
        },
        {
          question: "What is the difference between an assertion and verification?",
          answer:
            "An assertion checks the result or state of the operation, while verification checks whether a mock dependency was interacted with as expected."
        },
        {
          question: "Why use Mockito in Spring Boot applications?",
          answer:
            "Mockito allows service-layer dependencies such as repositories and external clients to be replaced with controlled mocks, making unit tests fast and isolated."
        },
        {
          question: "Does Mockito start the Spring container?",
          answer:
            "No. A plain Mockito test does not start the Spring application context. Mockito creates and manages mocks independently of Spring."
        },
        {
          question: "What does when().thenReturn() do?",
          answer:
            "It stubs a mock method so that when the specified invocation occurs, Mockito returns the configured value."
        },
        {
          question: "What does thenThrow() do?",
          answer:
            "thenThrow() configures a mock method to throw a specified exception when it is invoked."
        },
        {
          question: "What is verify(mock).method() used for?",
          answer:
            "It verifies that the specified method was called on the mock with matching arguments."
        },
        {
          question: "What does times(2) mean in Mockito?",
          answer:
            "times(2) verifies that the specified interaction occurred exactly two times."
        },
        {
          question: "What is never() in Mockito?",
          answer:
            "never() verifies that a specified interaction did not occur."
        },
        {
          question: "What are Mockito argument matchers?",
          answer:
            "Argument matchers such as any(), anyString(), anyLong(), and eq() allow tests to match method arguments without requiring exact values for every parameter."
        },
        {
          question: "Why should we avoid excessive mocking?",
          answer:
            "Excessive mocking makes tests complicated and tightly coupled to implementation details. It is better to mock only meaningful external dependencies."
        },
        {
          question: "Can Mockito test a real database query?",
          answer:
            "No. A mock repository does not execute a real database query. Database behavior should be tested separately using repository or integration tests."
        },
        {
          question: "Why is constructor injection useful with Mockito?",
          answer:
            "Constructor injection makes required dependencies explicit and allows the class under test to be constructed easily with mocked dependencies."
        },
        {
          question: "When should you use @SpringBootTest instead of plain Mockito?",
          answer:
            "Use @SpringBootTest when you need to test Spring application configuration, bean wiring, or interactions involving the application context rather than only isolated class behavior."
        },
        {
          question: "What is the Arrange-Act-Assert pattern?",
          answer:
            "Arrange prepares mocks and test data, Act executes the method under test, and Assert checks the expected result. Verification can also be performed after the action."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "Your EmployeeService calls EmployeeRepository.findById(). How would you test it without connecting to MySQL?",
          answer:
            "Create a mock EmployeeRepository, stub findById() with when(...).thenReturn(...), call EmployeeService, assert the returned employee, and verify that findById() was called with the expected ID."
        },
        {
          question:
            "Your service should not save an order when payment fails. How would you test this?",
          answer:
            "Mock PaymentService to return failure or throw the expected exception, execute the order service method, and use verify(repository, never()).save(...) to confirm that the order was not persisted."
        },
        {
          question:
            "A Mockito test passes, but the application fails because Spring cannot create a repository bean. Why?",
          answer:
            "A Mockito unit test does not validate the complete Spring application context. The mock replaces the repository, so Spring bean configuration problems may only be detected by an appropriate Spring integration or context test."
        },
        {
          question:
            "Your mock unexpectedly returns null. What should you check?",
          answer:
            "Check whether the method was stubbed, whether the arguments match the stubbing, whether the mock was initialized, and whether the correct mock instance is being used."
        },
        {
          question:
            "A test breaks every time you refactor private implementation details. What may be wrong?",
          answer:
            "The test may be overusing interaction verification and testing implementation details instead of externally observable behavior. Verify only interactions that are meaningful to the contract being tested."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Mockito Quick Reference",
      bullets: [
        "mock(Type.class) -> creates a mock.",
        "when(mock.method()).thenReturn(value) -> stubs a return value.",
        "when(mock.method()).thenThrow(exception) -> stubs an exception.",
        "thenAnswer(...) -> calculates a dynamic response.",
        "verify(mock).method() -> verifies one interaction.",
        "verify(mock, times(n)).method() -> verifies an exact call count.",
        "verify(mock, never()).method() -> verifies that a call never occurred.",
        "anyString(), anyLong(), anyInt() -> common argument matchers.",
        "eq(value) -> matches a specific argument.",
        "clearInvocations(mock) -> clears recorded interactions while retaining stubbing.",
        "reset(mock) -> clears stubbing and interactions; use sparingly.",
        "@Mock -> creates an annotation-based mock.",
        "@InjectMocks -> creates the test subject and attempts mock injection.",
        "@ExtendWith(MockitoExtension.class) -> integrates Mockito with JUnit 5."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "Mockito is mainly used to isolate a unit under test from its dependencies. The three most important concepts are mocking, stubbing, and verification.",
        "Remember the difference: stubbing controls what the mock does, while verification checks what the mock received.",
        "For Spring Boot interviews, understand when to use a plain Mockito unit test and when a Spring Boot context test is more appropriate."
      ],
      bullets: [
        "Mock = replacement dependency.",
        "Stub = configured dependency behavior.",
        "Verify = check dependency interaction.",
        "Assertion = check result or state.",
        "Mockito unit test = isolated and usually fast.",
        "@SpringBootTest = broader test involving Spring context.",
        "Do not assume a passing Mockito test proves database or Spring configuration correctness.",
        "Avoid unnecessary mocks and excessive verification."
      ]
    }
  ]
};
