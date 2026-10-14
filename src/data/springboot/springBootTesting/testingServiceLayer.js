
export const testingServiceLayer = {
  id: 1306,
  title: "Testing Service Layer",
  slug: "testing-service-layer",
  topicTitle: "Spring Boot Testing",
  description:
    "Test service business logic, successful outcomes, missing records, validation, exceptions, repository interactions, and multi-dependency workflows using JUnit and Mockito.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "purpose",
      title: "Why Test the Service Layer?",
      paragraphs: [
        "The service layer contains business rules and coordinates repository operations. Service unit tests check these rules without needing to start Spring Boot or connect to a database.",
        "For example, an employee service may retrieve an employee, calculate a bonus, or reject an operation when a record does not exist. Each behavior can be tested using controlled repository responses.",
        "A service unit test should primarily verify business behavior. Database query correctness belongs to repository tests, while HTTP behavior belongs to controller tests.",
        "The service layer is often the most important place for unit testing because it contains application-specific decisions that should remain correct even when implementation details change."
      ],
      bullets: [
        "Test successful business operations.",
        "Test missing-record and invalid-input scenarios.",
        "Verify repository interactions when they matter.",
        "Keep the service unit test independent of the database.",
        "Test business rules and state transitions.",
        "Test important dependency failures.",
        "Keep HTTP concerns outside service unit tests."
      ]
    },
    {
      id: "service-responsibility",
      title: "What Should a Service Test Verify?",
      paragraphs: [
        "A service test should verify what the service is responsible for. If a service decides that an employee must exist before an update, the test should verify that missing employees are rejected.",
        "If a service calculates a price, the test should verify the calculation. If it coordinates a repository and notification service, the test should verify the important business outcome and meaningful interactions.",
        "Do not simply test that every method can be executed. The test should prove that the application's business behavior is correct."
      ],
      bullets: [
        "Business rules.",
        "Successful outcomes.",
        "Failure outcomes.",
        "Validation decisions.",
        "Exception behavior.",
        "Important repository interactions.",
        "Important external-service interactions.",
        "State changes controlled by the service."
      ]
    },
    {
      id: "service-example",
      title: "Example Service and Unit Test",
      paragraphs: [
        "The service below retrieves an employee using a repository. It throws an exception when the requested employee does not exist. Mockito provides the repository responses for each test."
      ],
      code: {
        language: "java",
        code: `// EmployeeService.java

package com.codeforge.service;

import java.util.Optional;

public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
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


// EmployeeServiceTest.java

package com.codeforge.service;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
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

    @Test
    void shouldThrowWhenEmployeeDoesNotExist() {

        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        EmployeeNotFoundException exception =
                assertThrows(
                    EmployeeNotFoundException.class,
                    () -> service.findById(99L)
                );

        assertEquals(
            "Employee not found: 99",
            exception.getMessage()
        );
    }
}`
      },
      bullets: [
        "The first test verifies the successful path.",
        "The second test verifies the missing-record path.",
        "The repository is mocked, so these tests do not verify database queries.",
        "The referenced Employee, EmployeeRepository, and EmployeeNotFoundException are production types that must exist in the project.",
        "MockitoExtension initializes the Mockito annotations."
      ]
    },
    {
      id: "arrange-act-assert",
      title: "Use Arrange, Act, Assert",
      paragraphs: [
        "Service tests are easier to understand when they follow the Arrange, Act, Assert pattern. Arrange prepares mocks and test data, Act executes the service method, and Assert checks the expected result.",
        "This structure also makes it easier to identify whether a failure occurred during setup, execution, or verification."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldReturnEmployeeWhenFound() {

    // Arrange
    Employee employee =
            new Employee(1L, "Ravi");

    when(repository.findById(1L))
            .thenReturn(Optional.of(employee));

    // Act
    Employee result =
            service.findById(1L);

    // Assert
    assertEquals(
        "Ravi",
        result.getName()
    );
}`
      },
      bullets: [
        "Arrange = prepare data and mocks.",
        "Act = call the service method.",
        "Assert = verify the result.",
        "Keep the Act section small.",
        "Avoid mixing unrelated scenarios in one test."
      ]
    },
    {
      id: "business-rules",
      title: "Testing Business Rules",
      paragraphs: [
        "Tests should verify business outcomes, not simply execute methods. For a salary service, test boundary values and expected calculations. For an order service, test whether invalid transitions are rejected and whether required repository operations occur.",
        "For code that changes state or coordinates multiple dependencies, test both the returned result and the relevant side effects."
      ],
      code: {
        language: "java",
        code: `class SalaryService {

    double calculateBonus(double salary) {

        if (salary < 30000) {
            return salary * 0.05;
        }

        return salary * 0.10;
    }
}


@Test
void shouldCalculateFivePercentBonusForLowerSalary() {

    double result =
            service.calculateBonus(20000);

    assertEquals(
        1000,
        result
    );
}

@Test
void shouldCalculateTenPercentBonusForHigherSalary() {

    double result =
            service.calculateBonus(50000);

    assertEquals(
        5000,
        result
    );
}`
      },
      bullets: [
        "Test normal inputs.",
        "Test boundary values.",
        "Test invalid or missing data.",
        "Test exceptions that are part of the service contract.",
        "Avoid asserting private implementation details.",
        "Focus on business outcomes."
      ]
    },
    {
      id: "repository-stubbing",
      title: "Stub Repository Responses",
      paragraphs: [
        "Mockito allows the repository response to be controlled. This is important because a service test should not require a real database.",
        "For example, findById() can be configured to return an employee, Optional.empty(), or throw an exception depending on the scenario."
      ],
      code: {
        language: "java",
        code: `when(repository.findById(1L))
        .thenReturn(
            Optional.of(
                new Employee(1L, "Ravi")
            )
        );

when(repository.findById(99L))
        .thenReturn(Optional.empty());

when(repository.findById(500L))
        .thenThrow(
            new RuntimeException(
                "Database unavailable"
            )
        );`
      },
      bullets: [
        "thenReturn() provides controlled responses.",
        "Optional.empty() simulates a missing record.",
        "thenThrow() simulates dependency failure.",
        "Stub only the behavior required by the test."
      ]
    },
    {
      id: "verify-repository",
      title: "Verify Repository Interactions",
      paragraphs: [
        "Sometimes the business behavior includes an important repository interaction. Mockito's verify() can confirm that the expected method was called.",
        "Do not verify every repository call automatically. Verify interactions when the interaction itself is meaningful to the behavior being tested."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldFindEmployeeById() {

    Employee employee =
            new Employee(1L, "Ravi");

    when(repository.findById(1L))
            .thenReturn(
                Optional.of(employee)
            );

    service.findById(1L);

    verify(repository)
            .findById(1L);
}`
      },
      bullets: [
        "verify(repository) checks an interaction.",
        "verify(repository, times(2)) checks an exact count.",
        "never() checks that an interaction did not occur.",
        "Verify meaningful side effects rather than implementation noise."
      ]
    },
    {
      id: "verify-save",
      title: "Testing Save Operations",
      paragraphs: [
        "For create or update operations, the service may be responsible for saving an entity. The test can mock save() and verify that the repository received the expected object."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldSaveNewEmployee() {

    Employee employee =
            new Employee(null, "Ravi");

    when(repository.save(employee))
            .thenReturn(
                new Employee(1L, "Ravi")
            );

    Employee result =
            service.create(employee);

    assertEquals(
        "Ravi",
        result.getName()
    );

    verify(repository)
            .save(employee);
}`
      },
      bullets: [
        "Stub save() when the returned entity matters.",
        "Verify save() when persistence is part of the business operation.",
        "Do not use a service test to prove that SQL INSERT works."
      ]
    },
    {
      id: "missing-record",
      title: "Testing Missing Records",
      paragraphs: [
        "A common service-layer scenario is a requested record that does not exist. The repository can return Optional.empty(), and the service should translate that condition into the appropriate application exception or result."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldThrowWhenEmployeeDoesNotExist() {

    when(repository.findById(99L))
            .thenReturn(Optional.empty());

    assertThrows(
        EmployeeNotFoundException.class,
        () -> service.findById(99L)
    );

    verify(repository)
            .findById(99L);
}`
      },
      bullets: [
        "Test the missing-record condition.",
        "Verify the expected exception type.",
        "Verify the exception message when it is part of the contract.",
        "Verify the repository lookup when that interaction matters."
      ]
    },
    {
      id: "exception-testing",
      title: "Testing Service Exceptions",
      paragraphs: [
        "Service methods often translate low-level failures into application-specific exceptions. Tests should verify this behavior when it is part of the service contract.",
        "For example, a repository failure might be converted into a service-level exception or propagated according to the application's design."
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
}`
      },
      bullets: [
        "Use thenThrow() to simulate dependency failures.",
        "Use assertThrows() to verify expected exceptions.",
        "Test recovery or translation behavior when the service provides it.",
        "Do not test exceptions that are not part of the service's intended contract without a reason."
      ]
    },
    {
      id: "validation",
      title: "Testing Service-Level Validation",
      paragraphs: [
        "Business validation can belong in the service layer even when request validation also exists at the controller layer. Service tests should cover rules that must remain true regardless of which client calls the service.",
        "For example, a service may reject a blank employee name, duplicate business identifier, or invalid state transition."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldRejectBlankEmployeeName() {

    assertThrows(
        IllegalArgumentException.class,
        () -> service.createEmployee("")
    );

    verifyNoInteractions(repository);
}`
      },
      bullets: [
        "Validate important business rules in service tests.",
        "Verify that invalid input does not trigger persistence when that is the intended behavior.",
        "Use verifyNoInteractions() when no dependency interaction should occur."
      ]
    },
    {
      id: "multiple-dependencies",
      title: "Testing a Service with Multiple Dependencies",
      paragraphs: [
        "Real services often depend on more than one component. For example, OrderService may use OrderRepository, PaymentService, and NotificationService.",
        "The test can mock each dependency and control the scenario independently."
      ],
      code: {
        language: "java",
        code: `@Mock
private OrderRepository orderRepository;

@Mock
private PaymentService paymentService;

@Mock
private NotificationService notificationService;

@InjectMocks
private OrderService service;

@Test
void shouldCreateOrderAfterSuccessfulPayment() {

    when(paymentService.process(500.0))
            .thenReturn(true);

    Order order =
            new Order(1L, 500.0);

    when(orderRepository.save(order))
            .thenReturn(order);

    service.createOrder(order);

    verify(paymentService)
            .process(500.0);

    verify(orderRepository)
            .save(order);

    verify(notificationService)
            .sendOrderConfirmation(order);
}`
      },
      bullets: [
        "Mock each external dependency.",
        "Control dependency responses.",
        "Verify only meaningful interactions.",
        "Test failure branches separately.",
        "Avoid making the test dependent on irrelevant internal calls."
      ]
    },
    {
      id: "multi-dependency-failure",
      title: "Testing Dependency Failure Paths",
      paragraphs: [
        "When a service coordinates multiple dependencies, each important failure path should be tested. For example, if payment fails, the order should not be saved.",
        "This type of test is valuable because it verifies business sequencing rather than simply checking a returned value."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldNotSaveOrderWhenPaymentFails() {

    Order order =
            new Order(1L, 500.0);

    when(paymentService.process(500.0))
            .thenReturn(false);

    assertThrows(
        PaymentFailedException.class,
        () -> service.createOrder(order)
    );

    verify(paymentService)
            .process(500.0);

    verify(orderRepository, never())
            .save(any(Order.class));

    verify(notificationService, never())
            .sendOrderConfirmation(any(Order.class));
}`
      },
      bullets: [
        "Test the failed dependency response.",
        "Verify that invalid downstream operations do not occur.",
        "Use never() when an interaction must not happen.",
        "Test each important business branch independently."
      ]
    },
    {
      id: "argument-matching",
      title: "Using Mockito Argument Matchers",
      paragraphs: [
        "Argument matchers are useful when the exact object instance is not important or when the service creates the object internally.",
        "Common matchers include any(), anyLong(), anyString(), and eq()."
      ],
      code: {
        language: "java",
        code: `verify(repository)
        .save(any(Employee.class));

verify(repository)
        .findById(eq(1L));

verify(notificationService)
        .send(
            any(Employee.class)
        );`
      },
      bullets: [
        "any() matches compatible arguments.",
        "eq(value) matches a specific value.",
        "Use matchers when exact object identity is not important.",
        "Avoid mixing raw arguments and matchers incorrectly in the same invocation."
      ]
    },
    {
      id: "return-values",
      title: "Testing Returned Results",
      paragraphs: [
        "A service test should assert the result returned by the service when the return value is part of its contract.",
        "Do not rely only on verify(). A test that verifies a repository call but never checks the service result may miss a defect in the service's result transformation."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldReturnEmployeeDto() {

    Employee employee =
            new Employee(
                1L,
                "Ravi"
            );

    when(repository.findById(1L))
            .thenReturn(
                Optional.of(employee)
            );

    EmployeeDto result =
            service.findEmployee(1L);

    assertEquals(
        1L,
        result.getId()
    );

    assertEquals(
        "Ravi",
        result.getName()
    );
}`
      },
      bullets: [
        "Assert important returned values.",
        "Verify transformations when the service maps entities to DTOs.",
        "Do not replace result assertions with interaction verification."
      ]
    },
    {
      id: "state-change",
      title: "Testing Update Business Logic",
      paragraphs: [
        "Update operations often contain business rules. For example, an employee's salary may be updated only when the employee exists and the new salary is valid.",
        "The test should verify both the business decision and the persistence interaction."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldUpdateEmployeeSalary() {

    Employee employee =
            new Employee(1L, "Ravi");

    when(repository.findById(1L))
            .thenReturn(
                Optional.of(employee)
            );

    when(repository.save(employee))
            .thenReturn(employee);

    service.updateSalary(
        1L,
        50000.0
    );

    assertEquals(
        50000.0,
        employee.getSalary()
    );

    verify(repository)
            .findById(1L);

    verify(repository)
            .save(employee);
}`
      },
      bullets: [
        "Verify the employee exists.",
        "Verify the new state is valid.",
        "Verify the state was updated.",
        "Verify save() when persistence is part of the operation."
      ]
    },
    {
      id: "delete-operation",
      title: "Testing Delete Business Logic",
      paragraphs: [
        "Delete operations can also contain business rules. For example, an employee can be deleted only if the employee exists and is not associated with another protected resource."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldDeleteExistingEmployee() {

    when(repository.existsById(1L))
            .thenReturn(true);

    service.deleteEmployee(1L);

    verify(repository)
            .existsById(1L);

    verify(repository)
            .deleteById(1L);
}

@Test
void shouldRejectDeleteWhenEmployeeDoesNotExist() {

    when(repository.existsById(99L))
            .thenReturn(false);

    assertThrows(
        EmployeeNotFoundException.class,
        () -> service.deleteEmployee(99L)
    );

    verify(repository)
            .existsById(99L);

    verify(repository, never())
            .deleteById(99L);
}`
      },
      bullets: [
        "Test successful deletion.",
        "Test missing-resource behavior.",
        "Verify delete() or deleteById() when persistence is part of the behavior.",
        "Verify that invalid deletion does not continue."
      ]
    },
    {
      id: "transactions",
      title: "Testing Service Transaction Boundaries",
      paragraphs: [
        "A service method may define a transaction boundary using @Transactional. A plain Mockito unit test does not execute the real Spring transaction infrastructure.",
        "Therefore, a unit test can verify business logic inside the method, but it does not prove that transaction configuration, propagation, rollback, or database transaction behavior works correctly. Those concerns require appropriate Spring integration testing."
      ],
      code: {
        language: "java",
        code: `@Transactional
public void transferMoney(
        Long fromId,
        Long toId,
        double amount
) {
    Account from =
            repository.findById(fromId)
                    .orElseThrow();

    Account to =
            repository.findById(toId)
                    .orElseThrow();

    from.withdraw(amount);
    to.deposit(amount);

    repository.save(from);
    repository.save(to);
}`
      },
      bullets: [
        "Mockito tests can test business decisions inside the method.",
        "Mockito tests do not prove Spring transaction infrastructure works.",
        "Use integration tests when transaction behavior itself must be verified.",
        "Test rollback scenarios at an appropriate integration level."
      ]
    },
    {
      id: "service-vs-controller",
      title: "Service Test vs Controller Test",
      paragraphs: [
        "Service tests focus on business logic. Controller tests focus on HTTP behavior. Keeping these responsibilities separate prevents duplicated tests and makes failures easier to diagnose."
      ],
      code: {
        language: "text",
        code: `Controller Test

HTTP Request
     |
     v
Controller
     |
     +--> Mock Service
     |
     v
HTTP Response


Service Test

Test
 |
 v
Service
 |
 +--> Mock Repository
 +--> Mock External Client
 |
 v
Business Result`
      },
      bullets: [
        "Controller test = HTTP contract.",
        "Service test = business logic.",
        "Repository test = persistence behavior.",
        "Each test level should have a clear responsibility."
      ]
    },
    {
      id: "service-vs-repository",
      title: "Service Test vs Repository Test",
      paragraphs: [
        "A service unit test mocks the repository because the service is the unit under test. A repository test uses the real repository infrastructure because the repository is the unit under test.",
        "This distinction is important in Spring Boot testing interviews."
      ],
      code: {
        language: "text",
        code: `Service Test

EmployeeService
      |
      +--> Mock EmployeeRepository


Repository Test

EmployeeRepository
      |
      v
Spring Data JPA
      |
      v
Test Database`
      },
      bullets: [
        "Service test verifies business behavior.",
        "Repository test verifies queries and persistence behavior.",
        "Mocking the repository does not verify SQL.",
        "@DataJpaTest is appropriate for focused repository testing."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Service Testing Mistakes",
      paragraphs: [
        "Service tests become less useful when they test implementation details, mock too much, or fail to assert meaningful business outcomes."
      ],
      bullets: [
        "Connecting to a real database in every service unit test.",
        "Testing repository SQL inside a service unit test.",
        "Verifying every repository call without business value.",
        "Forgetting to test failure paths.",
        "Testing only successful scenarios.",
        "Ignoring boundary values.",
        "Mocking the service itself instead of its dependencies.",
        "Creating huge test methods covering multiple unrelated scenarios.",
        "Depending on test execution order.",
        "Using random or unclear test data.",
        "Testing private implementation details.",
        "Assuming @Transactional behavior is proven by Mockito."
      ]
    },
    {
      id: "best-practices",
      title: "Service Testing Best Practices",
      paragraphs: [
        "A strong service test suite focuses on business behavior and remains independent from infrastructure. The tests should be fast enough to run frequently and specific enough to explain failures.",
        "Use Mockito to control external dependencies, but keep the service itself real. Assert the result and verify meaningful side effects."
      ],
      bullets: [
        "Use descriptive test names.",
        "Follow Arrange, Act, Assert.",
        "Mock repositories and external dependencies.",
        "Keep the service under test real.",
        "Test success and failure paths.",
        "Test important business boundaries.",
        "Assert meaningful returned results.",
        "Verify important interactions.",
        "Avoid excessive verification.",
        "Keep tests independent.",
        "Use deterministic test data.",
        "Use integration tests for transaction and infrastructure behavior."
      ]
    },
    {
      id: "complete-flow",
      title: "Complete Service Unit Testing Flow",
      paragraphs: [
        "The complete service unit-testing flow starts by creating a real service instance with mocked dependencies. Mockito controls dependency responses, the service executes its business logic, and JUnit assertions verify the outcome."
      ],
      code: {
        language: "text",
        code: `JUnit Test
    |
    v
Mockito Mocks
    |
    +--> Mock Repository
    +--> Mock External Service
    |
    v
Real Service
    |
    v
Business Logic
    |
    +--> Success
    +--> Exception
    +--> State Change
    |
    v
Assertions
    |
    +--> Result
    +--> Exception
    +--> State
    |
    v
Mockito Verification
    |
    +--> Important interactions`
      }
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "Why mock a repository in a service unit test?",
          answer:
            "Mocking isolates the business logic from database behavior and makes it possible to control repository responses."
        },
        {
          question: "What should service-layer tests cover?",
          answer:
            "They should cover business rules, successful outcomes, boundary cases, error scenarios, and important dependency interactions."
        },
        {
          question: "Does a service unit test verify SQL?",
          answer:
            "No. A mocked repository does not execute SQL. Repository tests or integration tests are needed to verify persistence behavior."
        },
        {
          question: "What is the main purpose of a service-layer unit test?",
          answer:
            "Its main purpose is to verify business logic and application behavior in isolation from external infrastructure such as databases and external services."
        },
        {
          question: "Should the service itself be mocked in a service unit test?",
          answer:
            "No. The service is the unit under test and should normally be a real object. Its dependencies such as repositories and external clients are mocked."
        },
        {
          question: "What is the difference between verify() and assertEquals()?",
          answer:
            "assertEquals() checks a result or value, while verify() checks whether a mock dependency received a specified interaction."
        },
        {
          question: "Why use @ExtendWith(MockitoExtension.class)?",
          answer:
            "It integrates Mockito with JUnit 5 and initializes Mockito annotations such as @Mock and @InjectMocks."
        },
        {
          question: "What is the difference between @Mock and @InjectMocks?",
          answer:
            "@Mock creates a mock dependency, while @InjectMocks creates the object under test and attempts to inject the declared mocks into it."
        },
        {
          question: "How do you test a missing employee?",
          answer:
            "Stub repository.findById() to return Optional.empty(), call the service method, and assert that the expected EmployeeNotFoundException or other defined behavior occurs."
        },
        {
          question: "How do you test repository failure?",
          answer:
            "Configure the mock repository with thenThrow(), execute the service method, and verify that the service produces the expected exception or recovery behavior."
        },
        {
          question: "Should every repository interaction be verified?",
          answer:
            "No. Verify interactions that are meaningful to the behavior being tested. Excessive verification couples tests to implementation details."
        },
        {
          question: "Can Mockito prove @Transactional works?",
          answer:
            "No. Mockito can test the method's business logic, but real Spring transaction behavior requires an appropriate Spring integration test."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "EmployeeService should not save an employee when the email is already registered. How would you test it?",
          answer:
            "Stub the repository to indicate that the email already exists, call the service, assert the expected exception or result, and verify that save() was never called."
        },
        {
          question:
            "An order service uses PaymentService and OrderRepository. Payment fails. What should the unit test verify?",
          answer:
            "The test should configure PaymentService to fail, assert the expected service behavior, verify that the payment operation occurred, and verify that OrderRepository.save() was not called."
        },
        {
          question:
            "A service test passes but the repository query is broken in production. Why?",
          answer:
            "The service test mocked the repository, so no real query was executed. The repository query needs a repository-level or integration test."
        },
        {
          question:
            "A developer verifies ten internal repository calls in every service test. Is that a good practice?",
          answer:
            "Not necessarily. Excessive verification can make tests brittle. Verify interactions that are meaningful to the business behavior rather than every implementation detail."
        },
        {
          question:
            "How would you test a service that transfers money between two accounts?",
          answer:
            "Mock the repository to return both accounts, execute the transfer, assert the resulting balances, and verify that the required account updates were performed. Transaction rollback behavior should be covered separately with an appropriate integration test."
        },
        {
          question:
            "Why is a service unit test usually faster than an integration test?",
          answer:
            "It does not normally start the full Spring application context, connect to a database, or communicate with external infrastructure. Dependencies are replaced with mocks."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Service Testing Quick Reference",
      bullets: [
        "@ExtendWith(MockitoExtension.class) -> integrates Mockito with JUnit 5.",
        "@Mock -> creates a mock dependency.",
        "@InjectMocks -> creates the service under test and attempts mock injection.",
        "when(...).thenReturn(...) -> controls a dependency response.",
        "thenThrow(...) -> simulates dependency failure.",
        "verify(...) -> checks a dependency interaction.",
        "times(n) -> checks exact interaction count.",
        "never() -> checks that an interaction did not occur.",
        "verifyNoInteractions(...) -> verifies no calls occurred on a mock.",
        "assertEquals(...) -> verifies a returned value.",
        "assertThrows(...) -> verifies exception behavior.",
        "any(...) -> matches compatible arguments.",
        "eq(...) -> matches a specific argument.",
        "Service unit test -> business logic in isolation.",
        "Repository test -> persistence behavior.",
        "Controller test -> HTTP behavior.",
        "Integration test -> real component interaction and infrastructure behavior."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "The service layer is where application business rules commonly live, so service unit tests should focus on those rules rather than database or HTTP details.",
        "The key pattern is simple: create the real service, mock its dependencies, stub the responses required for the scenario, execute the service method, assert the result, and verify important interactions.",
        "Remember that Mockito does not execute SQL and does not prove Spring transaction behavior. Repository tests and integration tests cover those concerns."
      ],
      bullets: [
        "Service = business logic.",
        "Repository = persistence.",
        "Controller = HTTP/API behavior.",
        "Mock repository dependencies in isolated service tests.",
        "Test success and failure paths.",
        "Test important business rules and boundaries.",
        "Assert results, not only interactions.",
        "Verify meaningful side effects.",
        "Avoid excessive mocking and verification.",
        "Use integration tests for real infrastructure behavior."
      ]
    }
  ]
};
