
export const mockAndInjectMocks = {
  id: 1305,
  title: "@Mock and @InjectMocks",
  slug: "mock-and-inject-mocks",
  topicTitle: "Spring Boot Testing",
  description:
    "Understand Mockito annotations, mock dependencies, injection behavior, stubbing, verification, and isolated unit testing of Spring services.",
  estimatedTime: "25 min",

  sections: [
    {
      id: "annotations",
      title: "Understanding Mockito Annotations",
      paragraphs: [
        "@Mock creates a mock object for a dependency. @InjectMocks creates the object under test and asks Mockito to inject the declared mocks into it where possible.",
        "Mockito annotations must be initialized. A common JUnit 5 approach is to annotate the test class with @ExtendWith(MockitoExtension.class). This runs the Mockito extension without starting a Spring application context.",
        "This testing style is useful when you want to test a service's behavior without loading the full Spring application."
      ],
      bullets: [
        "@Mock: creates a mock dependency.",
        "@InjectMocks: creates and injects mocks into the test subject.",
        "@ExtendWith(MockitoExtension.class): integrates Mockito with JUnit Jupiter.",
        "Mockito tests normally do not start the Spring application context.",
        "The goal is usually fast, isolated unit testing."
      ]
    },

    {
      id: "what-is-mockito",
      title: "What is Mockito?",

      paragraphs: [
        "Mockito is a mocking framework commonly used in Java unit testing.",
        "It allows developers to create test doubles called mocks so that a class can be tested without depending on real implementations of its external collaborators.",
        "For example, when testing EmployeeService, you may not want to access a real database. Instead, EmployeeRepository can be mocked."
      ],

      code: {
        language: "text",
        code: `EmployeeService
      |
      | depends on
      ↓
EmployeeRepository
      |
      ↓
Real Database


Unit Test

EmployeeService
      |
      | depends on
      ↓
Mock EmployeeRepository
      |
      ↓
No real database`
      },

      bullets: [
        "Mockito creates mock objects.",
        "Mocks simulate dependencies.",
        "Mocks allow controlled test behavior.",
        "Mocks can verify interactions.",
        "Mockito is useful for isolated unit tests."
      ]
    },

    {
      id: "why-mocking",
      title: "Why Do We Need Mocking?",

      paragraphs: [
        "Suppose a service depends on a repository. If the unit test uses the real repository, the test may require a database and additional configuration.",
        "For a unit test, the goal is usually to test the service logic independently. Mockito allows the repository to be replaced with a mock."
      ],

      code: {
        language: "text",
        code: `Without Mocking

Test
 ↓
Service
 ↓
Repository
 ↓
Database
 ↓
Database configuration
 ↓
Test


With Mocking

Test
 ↓
Service
 ↓
Mock Repository
 ↓
Configured test response
 ↓
Test`
      },

      bullets: [
        "Avoids unnecessary database access.",
        "Makes tests faster.",
        "Allows controlled dependency behavior.",
        "Helps isolate the class under test."
      ]
    },

    {
      id: "mock",
      title: "What Does @Mock Do?",

      paragraphs: [
        "@Mock tells Mockito to create a mock object of the declared type.",
        "The mock does not execute the real implementation unless specifically configured to do so.",
        "For unstubbed methods, Mockito provides default return behavior according to the method's return type."
      ],

      code: {
        language: "java",
        code: `@Mock
private EmployeeRepository repository;`
      },

      bullets: [
        "repository is a Mockito mock.",
        "It is not a real repository implementation.",
        "It does not automatically connect to a database.",
        "Its behavior can be configured using Mockito methods such as when(...).thenReturn(...).",
        "Interactions can be checked using verify(...)."
      ]
    },

    {
      id: "inject-mocks",
      title: "What Does @InjectMocks Do?",

      paragraphs: [
        "@InjectMocks tells Mockito to create the object under test and inject available Mockito mocks into it where possible.",
        "It is commonly used for service classes that have dependencies such as repositories or other services.",
        "@InjectMocks does not turn the object into a Spring bean and does not start the Spring container."
      ],

      code: {
        language: "java",
        code: `@Mock
private EmployeeRepository repository;

@InjectMocks
private EmployeeService service;`
      },

      code: {
        language: "text",
        code: `Mockito

Mock Repository
      ↓
@InjectMocks
      ↓
EmployeeService
      ↓
repository field/dependency`
      }
    },

    {
      id: "mock-injection-strategy",
      title: "How Mockito Injects Mocks",

      paragraphs: [
        "Mockito attempts to inject available mocks into the object annotated with @InjectMocks.",
        "Constructor injection is generally the first and preferred injection strategy when a suitable constructor is available. Mockito can also use setter or field injection in appropriate situations.",
        "This is one reason constructor injection is a strong production design: the required dependency is explicit."
      ],

      code: {
        language: "text",
        code: `EmployeeService

constructor(
    EmployeeRepository repository
)

        ↑
        |
Mockito injects
        |
        ↓
@Mock EmployeeRepository`
      },

      bullets: [
        "Constructor injection is preferred when a suitable constructor is available.",
        "Mockito can also use setter or field injection where applicable.",
        "@InjectMocks is Mockito behavior, not Spring dependency injection.",
        "If injection cannot be performed as expected, the test setup should be reviewed."
      ]
    },

    {
      id: "mockito-extension",
      title: "Why Use MockitoExtension?",

      paragraphs: [
        "JUnit Jupiter does not automatically initialize Mockito annotations such as @Mock and @InjectMocks.",
        "MockitoExtension integrates Mockito with JUnit 5 and initializes the Mockito test infrastructure."
      ],

      code: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository repository;

    @InjectMocks
    private EmployeeService service;
}`
      },

      bullets: [
        "Integrates Mockito with JUnit Jupiter.",
        "Initializes Mockito annotations.",
        "Does not start the Spring application context.",
        "Keeps the test focused on Mockito-based unit testing."
      ]
    },

    {
      id: "example",
      title: "Complete Service Unit Test",
      paragraphs: [
        "Suppose EmployeeService uses EmployeeRepository to find an employee. The test mocks the repository, configures its return value, calls the service, and checks the result."
      ],
      code: {
        language: "java",
        code: `import java.util.Optional;

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
    void shouldFindEmployee() {
        Employee employee =
                new Employee(1L, "Venkatesh");

        when(repository.findById(1L))
                .thenReturn(Optional.of(employee));

        Employee result = service.findById(1L);

        assertEquals("Venkatesh", result.getName());
        verify(repository).findById(1L);
    }

    interface EmployeeRepository {
        Optional<Employee> findById(Long id);
    }

    static class Employee {
        private final Long id;
        private final String name;

        Employee(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        Long getId() {
            return id;
        }

        String getName() {
            return name;
        }
    }

    static class EmployeeService {
        private final EmployeeRepository repository;

        EmployeeService(EmployeeRepository repository) {
            this.repository = repository;
        }

        Employee findById(Long id) {
            return repository.findById(id)
                    .orElseThrow(
                        () -> new IllegalArgumentException(
                            "Employee not found"
                        )
                    );
        }
    }
}`
      },
      output: "Employee name: Venkatesh\nRepository lookup: verified\nTest status: PASSED"
    },

    {
      id: "test-flow",
      title: "Understand the Complete Test Flow",

      paragraphs: [
        "The important idea is that the test controls the repository behavior instead of allowing the service to access a real database."
      ],

      code: {
        language: "text",
        code: `1. MockitoExtension starts
        ↓
2. @Mock creates repository mock
        ↓
3. @InjectMocks creates EmployeeService
        ↓
4. Mock repository is injected
        ↓
5. when(...).thenReturn(...) configures behavior
        ↓
6. service.findById(1L) is called
        ↓
7. Service calls mock repository
        ↓
8. Mock returns configured Employee
        ↓
9. assertEquals verifies result
        ↓
10. verify checks repository interaction`
      },

      bullets: [
        "No real database is required.",
        "The repository response is controlled by the test.",
        "The service logic is the main behavior being tested.",
        "The test verifies both the returned result and repository interaction."
      ]
    },

    {
      id: "stubbing",
      title: "What is Stubbing?",

      paragraphs: [
        "Stubbing means configuring a mock to return a specific value or perform a specific behavior when a method is called.",
        "Mockito commonly uses when(...).thenReturn(...) for stubbing."
      ],

      code: {
        language: "java",
        code: `Employee employee =
        new Employee(1L, "Venkatesh");

when(repository.findById(1L))
        .thenReturn(Optional.of(employee));`
      },

      bullets: [
        "when(...) specifies the method call.",
        "thenReturn(...) specifies the mock result.",
        "Stubbing controls the dependency's behavior during the test.",
        "The service can then be tested against predictable dependency responses."
      ]
    },

    {
      id: "then-throw",
      title: "Stubbing Exceptions",

      paragraphs: [
        "Mocks can also be configured to throw exceptions.",
        "This is useful when testing how the class under test handles dependency failures."
      ],

      code: {
        language: "java",
        code: `when(repository.findById(1L))
        .thenThrow(
            new RuntimeException("Database unavailable")
        );

assertThrows(
    RuntimeException.class,
    () -> service.findById(1L)
);`
      },

      bullets: [
        "Use thenThrow when a dependency should simulate a failure.",
        "Useful for testing error-handling behavior.",
        "Avoid using exceptions in mocks unless the scenario is relevant to the behavior being tested."
      ]
    },

    {
      id: "verify",
      title: "What Does verify Do?",

      paragraphs: [
        "verify checks whether a method on a mock was called as expected.",
        "This is useful when interaction with a dependency is part of the behavior being tested."
      ],

      code: {
        language: "java",
        code: `service.findById(1L);

verify(repository)
        .findById(1L);`
      },

      bullets: [
        "verify(repository) checks an interaction with the repository mock.",
        "verify(repository).findById(1L) verifies that the method was called with 1L.",
        "Verification checks interaction rather than return-value correctness.",
        "Do not verify every internal call unnecessarily."
      ]
    },

    {
      id: "verify-times",
      title: "Verifying Invocation Count",

      paragraphs: [
        "Mockito can verify how many times a mock method was invoked.",
        "This can be useful when calling a dependency multiple times would be incorrect or inefficient."
      ],

      code: {
        language: "java",
        code: `verify(repository, times(1))
        .findById(1L);`
      },

      bullets: [
        "times(1) → exactly one invocation.",
        "times(2) → exactly two invocations.",
        "never() → method should not be called.",
        "Use invocation-count verification only when the count is part of the expected behavior."
      ]
    },

    {
      id: "verify-never",
      title: "Verifying That a Dependency Was Not Called",

      paragraphs: [
        "Sometimes the correct behavior is that a dependency should not be called.",
        "Mockito's never() can verify that a specific method was not invoked."
      ],

      code: {
        language: "java",
        code: `service.validateCachedEmployee();

verify(repository, never())
        .findById(anyLong());`
      },

      bullets: [
        "Useful for cache-hit scenarios.",
        "Useful when validation should reject input before repository access.",
        "Use only when the absence of the interaction is meaningful."
      ]
    },

    {
      id: "argument-matchers",
      title: "Mockito Argument Matchers",

      paragraphs: [
        "Argument matchers allow tests to verify or stub calls without specifying one exact argument value.",
        "Common matchers include anyLong(), anyString(), any(), eq(), and others."
      ],

      code: {
        language: "java",
        code: `when(repository.findById(anyLong()))
        .thenReturn(
            Optional.of(
                new Employee(1L, "Venkatesh")
            )
        );

verify(repository)
        .findById(eq(1L));`
      },

      bullets: [
        "anyLong() matches a long or Long argument.",
        "anyString() matches a String argument.",
        "any() matches an argument of the appropriate type.",
        "eq(value) matches a specific value.",
        "Use matchers carefully so the test remains readable."
      ]
    },

    {
      id: "mock-vs-real",
      title: "Mock Dependency vs Real Dependency",

      paragraphs: [
        "A mock is controlled by the test and does not represent the actual external dependency implementation.",
        "A real repository may access a database, while a mocked repository simply returns values configured by Mockito."
      ],

      code: {
        language: "text",
        code: `REAL DEPENDENCY

Service
   ↓
Real Repository
   ↓
Database
   ↓
Actual Data


MOCK DEPENDENCY

Service
   ↓
Mockito Mock
   ↓
Configured Response
   ↓
Test`
      },

      bullets: [
        "Mock → isolated unit test.",
        "Real dependency → broader integration behavior.",
        "Mocks are usually faster.",
        "Real dependencies provide stronger integration coverage."
      ]
    },

    {
      id: "difference",
      title: "Important Differences",
      paragraphs: [
        "@Mock creates a mock dependency; it does not create a real Spring bean. @InjectMocks creates a regular Java object and injects mocks using Mockito's injection behavior. It does not load Spring configuration or validate the complete dependency-injection setup of your application.",
        "Use constructor injection in production services. It makes required dependencies explicit and usually makes unit tests easier to construct.",
        "Mockito injection and Spring dependency injection are different mechanisms. Mockito is configuring objects for the test, while Spring manages application beans inside the Spring application context."
      ],
      bullets: [
        "Use MockitoExtension for a plain Mockito unit test.",
        "Use Spring testing annotations when the Spring context itself is part of the test.",
        "Do not combine annotations unnecessarily; choose the test style that matches the goal.",
        "@Mock does not create a Spring bean.",
        "@InjectMocks does not start Spring.",
        "Mockito does not validate the complete Spring application configuration."
      ]
    },

    {
      id: "constructor-injection",
      title: "Why Constructor Injection Helps Testing",

      paragraphs: [
        "Constructor injection makes a class's required dependencies explicit.",
        "This works particularly well with unit testing because the test can directly construct the class and provide a mock dependency."
      ],

      code: {
        language: "java",
        code: `class EmployeeService {

    private final EmployeeRepository repository;

    EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }
}


// Manual unit-test construction

EmployeeRepository repository =
        mock(EmployeeRepository.class);

EmployeeService service =
        new EmployeeService(repository);`
      },

      bullets: [
        "Required dependencies are visible in the constructor.",
        "The class can be instantiated without reflection-based field injection.",
        "Mocks can be supplied directly.",
        "The design is easier to test outside Spring."
      ]
    },

    {
      id: "manual-vs-inject-mocks",
      title: "Manual Construction vs @InjectMocks",

      paragraphs: [
        "You do not have to use @InjectMocks. A test can manually construct the class under test and pass mocks through its constructor.",
        "Manual construction is often explicit and can be useful when you want complete control over the test setup."
      ],

      code: {
        language: "java",
        code: `@Mock
private EmployeeRepository repository;

private EmployeeService service;

@BeforeEach
void setUp() {
    service =
        new EmployeeService(repository);
}`
      },

      bullets: [
        "@InjectMocks → convenient Mockito-managed injection.",
        "Manual construction → explicit dependency wiring in the test.",
        "Both approaches can be useful.",
        "Constructor injection makes either approach straightforward."
      ]
    },

    {
      id: "mockito-vs-spring",
      title: "Mockito Test vs Spring Boot Test",

      paragraphs: [
        "A Mockito unit test focuses on a class and mocks its collaborators.",
        "A Spring Boot test can load the Spring application context and verify how multiple Spring-managed components work together.",
        "The correct choice depends on what you want to test."
      ],

      code: {
        language: "text",
        code: `Mockito Unit Test

JUnit
  ↓
MockitoExtension
  ↓
Service
  ↓
Mock Repository


Spring Integration Test

JUnit
  ↓
Spring Test
  ↓
ApplicationContext
  ↓
Real Spring Beans
  ↓
Application Components`
      },

      bullets: [
        "Mockito unit test → fast and isolated.",
        "Spring Boot integration test → validates Spring integration.",
        "Use unit tests for business logic where possible.",
        "Use integration tests when Spring configuration or component integration is part of the behavior being tested."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mockito Mistakes",

      bullets: [
        "Forgetting @ExtendWith(MockitoExtension.class) when using Mockito annotations in a plain JUnit 5 test.",
        "Expecting @Mock to create a real Spring bean.",
        "Expecting @InjectMocks to start the Spring application context.",
        "Using @InjectMocks without understanding how the dependencies are injected.",
        "Forgetting to stub a mock method when the test depends on a specific return value.",
        "Verifying every internal method call even when the interaction is not part of the behavior.",
        "Using mocks for simple objects that could be created directly.",
        "Using too many mocks and making the test mirror implementation details.",
        "Using Mockito to test Mockito configuration instead of application behavior.",
        "Using @SpringBootTest for every service unit test unnecessarily.",
        "Mixing Mockito and Spring annotations without understanding which framework owns the test setup."
      ]
    },

    {
      id: "best-practices",
      title: "Mockito Best Practices",

      bullets: [
        "Mock external collaborators rather than the class under test.",
        "Keep the class under test real.",
        "Use constructor injection in production code.",
        "Use MockitoExtension for plain Mockito tests.",
        "Stub only the behavior required by the test.",
        "Verify interactions only when they are behaviorally important.",
        "Prefer clear test names that describe expected behavior.",
        "Keep tests isolated from databases and external services when testing business logic.",
        "Use integration tests separately to verify actual Spring and database integration.",
        "Avoid excessive mocking because heavily mocked tests can become coupled to implementation details."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is the difference between @Mock and @InjectMocks?",
          answer:
            "@Mock creates a mock dependency. @InjectMocks creates the object under test and attempts to inject the declared mocks into it."
        },
        {
          question: "Does @InjectMocks start the Spring container?",
          answer:
            "No. Mockito creates the test subject without starting a Spring application context."
        },
        {
          question: "Why use MockitoExtension?",
          answer:
            "It initializes Mockito annotations and integrates Mockito's test lifecycle with JUnit Jupiter."
        },
        {
          question: "What is Mockito?",
          answer:
            "Mockito is a Java mocking framework used to create test doubles, configure dependency behavior, and verify interactions during unit tests."
        },
        {
          question: "What is stubbing?",
          answer:
            "Stubbing means configuring a mock to return a specific value or throw a specific exception when a method is called."
        },
        {
          question: "What does verify() do?",
          answer:
            "verify() checks whether a method on a mock was called as expected."
        },
        {
          question: "What is the difference between mocking and stubbing?",
          answer:
            "Mocking creates a test double for a dependency, while stubbing configures that mock's behavior for particular method calls."
        },
        {
          question: "Why should repositories often be mocked in service unit tests?",
          answer:
            "Mocking the repository keeps the service unit test isolated from the database and allows repository behavior to be controlled by the test."
        },
        {
          question: "Can @InjectMocks inject real objects?",
          answer:
            "Mockito primarily uses available mocks, spies, and other configured test objects for injection. It does not behave like the Spring application context and should not be treated as a replacement for Spring dependency injection."
        },
        {
          question: "What is constructor injection?",
          answer:
            "Constructor injection provides required dependencies through a class constructor. It makes dependencies explicit and is generally well suited for testable service design."
        },
        {
          question: "What is the difference between Mockito and Spring dependency injection?",
          answer:
            "Mockito injects test doubles into the object under test for a unit test, while Spring manages application beans and their dependencies inside the Spring application context."
        },
        {
          question: "When should you use @SpringBootTest instead of MockitoExtension?",
          answer:
            "Use @SpringBootTest when the Spring application context and integration between Spring-managed components are part of what you need to test. Use MockitoExtension for isolated unit tests that do not require Spring."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question:
            "EmployeeService depends on EmployeeRepository. You want to test only EmployeeService without MySQL. What would you use?",
          answer:
            "Use a Mockito unit test, create a mock EmployeeRepository with @Mock, and inject it into EmployeeService using @InjectMocks or manually through the constructor."
        },
        {
          question:
            "Your @Mock repository is null when the test executes. What would you check?",
          answer:
            "Check that Mockito is initialized, for example by using @ExtendWith(MockitoExtension.class) with JUnit 5. Also verify that the test is being executed with JUnit Jupiter."
        },
        {
          question:
            "You want repository.findById(1L) to return an Employee. How do you configure that?",
          answer:
            "Use stubbing such as when(repository.findById(1L)).thenReturn(Optional.of(employee))."
        },
        {
          question:
            "You want to verify that findById(1L) was called. What do you use?",
          answer:
            "Use verify(repository).findById(1L)."
        },
        {
          question:
            "The service should not call the repository when the input is invalid. How can you test this?",
          answer:
            "Test the invalid-input behavior and use verify(repository, never()).findById(...) or the appropriate repository method to confirm that the dependency was not called."
        },
        {
          question:
            "The interviewer asks whether @InjectMocks is the same as Spring's dependency injection. What should you say?",
          answer:
            "No. @InjectMocks is Mockito functionality used to create and inject test doubles into the object under test. Spring dependency injection is performed by the Spring IoC container for Spring-managed beans."
        },
        {
          question:
            "Why is constructor injection recommended for service classes?",
          answer:
            "It makes required dependencies explicit, prevents creating an incompletely initialized object, and makes the service easy to instantiate directly in unit tests."
        },
        {
          question:
            "Your unit test uses five mocks for a very small service. Is that always a good design?",
          answer:
            "Not necessarily. Excessive mocking can make tests difficult to understand and tightly coupled to implementation details. Review whether the class has too many responsibilities or whether some collaborators should be tested differently."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Mockito Quick Reference",

      code: {
        language: "text",
        code: `@ExtendWith(MockitoExtension.class)
        ↓
Initialize Mockito

@Mock
        ↓
Create mock dependency

@InjectMocks
        ↓
Create object under test
and inject available mocks

when(...)
        ↓
Configure mock behavior

thenReturn(...)
        ↓
Return configured value

thenThrow(...)
        ↓
Simulate dependency failure

verify(...)
        ↓
Verify interaction

times(1)
        ↓
Verify invocation count

never()
        ↓
Verify no invocation


TYPICAL FLOW

JUnit
  ↓
MockitoExtension
  ↓
Create Mocks
  ↓
Inject Mocks
  ↓
Stub Dependency
  ↓
Call Service
  ↓
Assert Result
  ↓
Verify Important Interaction`
      }
    },

    {
      id: "revision-notes",
      title: "Quick Revision Notes",

      paragraphs: [
        "Mockito allows Java developers to isolate a class under test by replacing its collaborators with controlled mock objects. @Mock creates a mock dependency, while @InjectMocks creates the test subject and attempts to inject the available mocks."
      ],
      bullets: [
        "@Mock → creates a Mockito mock.",
        "@InjectMocks → creates the object under test and injects available Mockito mocks.",
        "@ExtendWith(MockitoExtension.class) → initializes Mockito with JUnit 5.",
        "Mockito unit tests normally do not load the Spring application context.",
        "when(...).thenReturn(...) → stubs a return value.",
        "thenThrow(...) → stubs an exception.",
        "verify(...) → verifies an interaction.",
        "times(...) → verifies invocation count.",
        "never() → verifies that an interaction did not occur.",
        "Constructor injection makes production services easier to test.",
        "Mockito dependency injection is not the same as Spring dependency injection.",
        "Use Mockito for isolated unit tests.",
        "Use Spring Boot tests when Spring integration itself needs to be tested.",
        "Mock external collaborators, not the class under test.",
        "Avoid excessive mocking and implementation-detail verification."
      ]
    }
  ]
};
