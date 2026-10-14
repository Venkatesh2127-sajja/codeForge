
export const repositoryTestingWithDataJpaTest = {
  id: 1309,
  title: "Repository Testing with @DataJpaTest",
  slug: "repository-testing-with-data-jpa-test",
  topicTitle: "Spring Boot Testing",
  description:
    "Test JPA entities, repository operations, derived queries, custom queries, constraints, transactions, and database behavior using Spring Boot's JPA test slice.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "definition",
      title: "What Is @DataJpaTest?",
      paragraphs: [
        "@DataJpaTest loads a focused test configuration for JPA components. It is designed to test entity mappings and repository behavior without loading the full application.",
        "By default, Spring Boot configures an embedded database if one is available and the test setup permits it. These tests are transactional and normally roll back their changes after each test. If you need to test against MySQL, configure a suitable test datasource explicitly.",
        "The important idea is that @DataJpaTest is a test slice. Instead of starting every component of the application, Spring Boot focuses on the persistence layer required for JPA testing.",
        "This makes repository tests more focused than a full @SpringBootTest. The repository is real, JPA is real, entity mappings are real, and database operations are actually executed against the configured test database."
      ],
      bullets: [
        "Tests JPA repositories and entity mappings.",
        "Can use an embedded database.",
        "Usually runs each test inside a transaction.",
        "Normally rolls back test data after each test.",
        "Does not load the entire application context like a general @SpringBootTest.",
        "Useful for testing repository queries.",
        "Useful for detecting entity mapping problems."
      ]
    },
    {
      id: "test-slice",
      title: "What Does the JPA Test Slice Load?",
      paragraphs: [
        "A test slice loads the infrastructure needed for the particular testing concern. @DataJpaTest focuses on JPA-related components rather than the complete application.",
        "This means the test is different from a full application integration test. You should choose the test annotation based on what you want to verify."
      ],
      code: {
        language: "text",
        code: `@DataJpaTest

Test
 |
 v
Spring Test Context
 |
 +--> JPA configuration
 |
 +--> Entity mappings
 |
 +--> EntityManager
 |
 +--> Spring Data repositories
 |
 +--> Test database
 |
 v
Repository test


@SpringBootTest

Test
 |
 v
Complete Spring Application Context
 |
 +--> Controllers
 +--> Services
 +--> Repositories
 +--> Security
 +--> Configuration
 +--> Other application beans
 +--> Database
 |
 v
Full application test`
      },
      bullets: [
        "@DataJpaTest focuses on persistence.",
        "@SpringBootTest loads the broader application context.",
        "Choose the smallest test scope that verifies the behavior you need.",
        "Repository tests should normally test repository behavior rather than controller behavior."
      ]
    },
    {
      id: "entity",
      title: "Example Entity and Repository",
      paragraphs: [
        "Consider an Employee entity with a generated identifier and a name. Spring Data JPA can generate common CRUD operations and derive queries from repository method names.",
        "The entity is the object that JPA maps to a database table. The repository provides the persistence operations used by the test."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    protected Employee() {}

    public Employee(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

// EmployeeRepository.java

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByName(String name);
}`
      },
      bullets: [
        "Use jakarta.persistence imports with modern Spring Boot versions.",
        "A protected no-argument constructor supports JPA entity instantiation.",
        "The repository inherits common persistence operations from JpaRepository.",
        "findByName() is a derived query method.",
        "The test can use the real repository implementation created by Spring Data JPA."
      ]
    },
    {
      id: "repository-test",
      title: "Write a Repository Test",
      paragraphs: [
        "The repository test can save an employee and query it by name. The test uses the real JPA repository infrastructure rather than mocking the repository.",
        "This is an important difference from Mockito service tests. With Mockito, the repository is replaced with a mock. With @DataJpaTest, the repository itself is being tested."
      ],
      code: {
        language: "java",
        code: `import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void shouldFindEmployeeByName() {
        repository.save(new Employee("Ravi"));

        List<Employee> employees =
                repository.findByName("Ravi");

        assertEquals(1, employees.size());
        assertEquals("Ravi", employees.get(0).getName());
    }
}`
      },
      output: "Saved employee: Ravi\nMatching employees: 1\nTest status: PASSED"
    },
    {
      id: "save-test",
      title: "Testing save()",
      paragraphs: [
        "The save() method is inherited from JpaRepository. A repository test can verify that an entity is persisted and receives an identifier when the persistence strategy generates the ID.",
        "Calling save() does not always mean that SQL is immediately executed at that exact line. JPA may delay SQL execution until flush or transaction synchronization. This is why flush can be useful when you specifically want database constraints or SQL behavior to be checked during a test."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldSaveEmployee() {

    Employee employee =
            new Employee("Ravi");

    Employee saved =
            repository.save(employee);

    assertNotNull(saved.getId());
    assertEquals("Ravi", saved.getName());
}`
      },
      bullets: [
        "save() persists or merges an entity depending on its state.",
        "Generated identifiers may be assigned during persistence.",
        "flush() can force pending persistence operations to be synchronized with the database.",
        "Use assertions that verify the behavior important to the repository contract."
      ]
    },
    {
      id: "find-test",
      title: "Testing findById()",
      paragraphs: [
        "findById() is inherited from JpaRepository and returns an Optional. Repository tests should verify both successful lookup and the case where the requested record does not exist."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldFindEmployeeById() {

    Employee saved =
            repository.save(
                new Employee("Ravi")
            );

    Optional<Employee> result =
            repository.findById(saved.getId());

    assertTrue(result.isPresent());
    assertEquals(
        "Ravi",
        result.get().getName()
    );
}

@Test
void shouldReturnEmptyWhenEmployeeDoesNotExist() {

    Optional<Employee> result =
            repository.findById(999L);

    assertTrue(result.isEmpty());
}`
      },
      bullets: [
        "Test the successful lookup case.",
        "Test the missing-record case.",
        "Prefer Optional assertions that clearly express the expected state."
      ]
    },
    {
      id: "derived-query",
      title: "Testing Derived Query Methods",
      paragraphs: [
        "Spring Data JPA can create queries from repository method names. Repository tests are a good place to verify that the derived query returns the expected records.",
        "Examples include findByName, findByEmail, findBySalaryGreaterThan, findByDepartmentName, and many other supported naming patterns."
      ],
      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByName(String name);

    List<Employee> findByNameContaining(String name);

    List<Employee> findByIdGreaterThan(Long id);
}

@Test
void shouldFindEmployeesContainingName() {

    repository.save(new Employee("Ravi Kumar"));
    repository.save(new Employee("Ravi Sharma"));
    repository.save(new Employee("Arun"));

    List<Employee> result =
            repository.findByNameContaining("Ravi");

    assertEquals(2, result.size());
}`
      },
      bullets: [
        "Derived queries are generated from method names.",
        "Repository tests should verify the query behavior.",
        "Use realistic test data.",
        "Test edge cases such as no matching records."
      ]
    },
    {
      id: "custom-query",
      title: "Testing Custom @Query Methods",
      paragraphs: [
        "Repositories can define custom JPQL queries using @Query. These queries should also be tested because an application can compile successfully while a query still contains incorrect conditions, joins, or parameter usage."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    @Query("""
        select e
        from Employee e
        where e.name = :name
        """)
    List<Employee> searchByName(
            @Param("name") String name
    );
}

@Test
void shouldSearchUsingCustomQuery() {

    repository.save(
        new Employee("Ravi")
    );

    List<Employee> result =
            repository.searchByName("Ravi");

    assertEquals(1, result.size());
}`
      },
      bullets: [
        "Test custom JPQL queries with representative data.",
        "Verify parameters are bound correctly.",
        "Test both matching and non-matching cases.",
        "For native SQL, test behavior against the database engine that actually supports the SQL."
      ]
    },
    {
      id: "update-delete",
      title: "Testing Update and Delete Operations",
      paragraphs: [
        "Repository tests should also cover update and delete behavior when those operations are important to the application's persistence logic.",
        "JpaRepository provides methods such as save(), delete(), deleteById(), existsById(), count(), and findAll()."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldUpdateEmployee() {

    Employee employee =
            repository.save(
                new Employee("Ravi")
            );

    employee.setName("Ravi Kumar");

    repository.save(employee);

    Employee updated =
            repository.findById(employee.getId())
                    .orElseThrow();

    assertEquals(
        "Ravi Kumar",
        updated.getName()
    );
}

@Test
void shouldDeleteEmployee() {

    Employee employee =
            repository.save(
                new Employee("Ravi")
            );

    Long id = employee.getId();

    repository.deleteById(id);

    assertTrue(
        repository.findById(id).isEmpty()
    );
}`
      },
      bullets: [
        "Test updates when repository behavior depends on persistence.",
        "Test deletion using findById() or existsById().",
        "Keep tests independent from each other."
      ]
    },
    {
      id: "flush",
      title: "Why flush() Matters in Repository Tests",
      paragraphs: [
        "JPA uses a persistence context and may delay SQL execution until the persistence context is flushed. A repository test that needs database constraints or SQL behavior to be evaluated immediately can explicitly call flush().",
        "flush() synchronizes pending persistence operations with the database. It does not commit the surrounding transaction."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldFlushChanges() {

    Employee employee =
            repository.save(
                new Employee("Ravi")
            );

    repository.flush();

    assertNotNull(employee.getId());
}`
      },
      bullets: [
        "flush() synchronizes pending changes with the database.",
        "flush() is different from commit.",
        "A test transaction can still roll back after flush().",
        "Use flush when the test specifically needs database-level behavior to occur."
      ]
    },
    {
      id: "transaction",
      title: "Transactions and Automatic Rollback",
      paragraphs: [
        "@DataJpaTest tests are normally transactional. Changes made during a test are normally rolled back after the test completes.",
        "This is useful because one test does not normally leave persistent data that can affect another test.",
        "Rollback provides isolation, but the test should still be written so that it does not depend on execution order."
      ],
      code: {
        language: "text",
        code: `Test starts
    |
    v
Transaction begins
    |
    v
repository.save(...)
    |
    v
repository.find(...)
    |
    v
Assertions
    |
    v
Test finishes
    |
    v
Transaction rolls back
    |
    v
Test database returns to test state`
      },
      bullets: [
        "Repository changes normally occur inside a test transaction.",
        "The transaction is normally rolled back after the test.",
        "Rollback helps isolate test data.",
        "Do not depend on one test's inserted records in another test."
      ]
    },
    {
      id: "rollback",
      title: "Understanding @Rollback",
      paragraphs: [
        "Spring's testing support provides transaction-related annotations that can influence rollback behavior. By default, transactional test execution is commonly rolled back.",
        "A test can explicitly control rollback behavior when there is a specific reason, but persistent state between tests should generally be avoided because it can make tests order-dependent."
      ],
      code: {
        language: "java",
        code: `import org.springframework.test.annotation.Rollback;

@Test
@Rollback(true)
void shouldRollbackTestData() {

    repository.save(
        new Employee("Temporary")
    );

    assertEquals(
        1,
        repository.count()
    );
}`
      },
      bullets: [
        "Rollback keeps tests isolated.",
        "Avoid disabling rollback unless the test has a specific requirement.",
        "A test should normally be repeatable independently."
      ]
    },
    {
      id: "test-data",
      title: "Preparing Test Data",
      paragraphs: [
        "Repository tests need predictable test data. Create only the records required for the scenario being tested.",
        "Avoid relying on data left behind by another test. Each test should arrange its own state or use a well-defined test setup strategy."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldFindEmployeesByName() {

    Employee first =
            new Employee("Ravi");

    Employee second =
            new Employee("Ravi");

    Employee third =
            new Employee("Arun");

    repository.save(first);
    repository.save(second);
    repository.save(third);

    List<Employee> result =
            repository.findByName("Ravi");

    assertEquals(2, result.size());
}`
      },
      bullets: [
        "Use meaningful test data.",
        "Create only the data needed for the scenario.",
        "Avoid random values unless randomness is part of the test.",
        "Do not depend on records created by another test."
      ]
    },
    {
      id: "before-each",
      title: "Using @BeforeEach for Test Setup",
      paragraphs: [
        "@BeforeEach can be used when multiple repository tests require common setup. However, avoid creating large amounts of shared data that every test does not actually need.",
        "A small amount of shared setup can improve readability, while excessive shared setup can hide what a test actually depends on."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @BeforeEach
    void setup() {
        repository.save(
            new Employee("Ravi")
        );
    }

    @Test
    void shouldFindRavi() {
        assertEquals(
            1,
            repository.findByName("Ravi").size()
        );
    }
}`
      },
      bullets: [
        "@BeforeEach runs before every test method.",
        "Use it for genuinely common setup.",
        "Keep important test-specific data visible inside the test when possible."
      ]
    },
    {
      id: "constraints",
      title: "Testing Database Constraints",
      paragraphs: [
        "Repository tests can help verify constraints such as unique values, not-null requirements, and relationships. When testing database constraints, flushing may be necessary because JPA can delay SQL execution."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldRejectDuplicateEmail() {

    repository.save(
        new Employee("ravi@example.com")
    );

    repository.save(
        new Employee("ravi@example.com")
    );

    assertThrows(
        Exception.class,
        () -> repository.flush()
    );
}`
      },
      bullets: [
        "Database constraints should be tested when they are important to correctness.",
        "flush() can force pending SQL to execute.",
        "Prefer asserting the most specific expected exception when the persistence provider and constraint are known."
      ]
    },
    {
      id: "relationships",
      title: "Testing Entity Relationships",
      paragraphs: [
        "Repository tests are useful for verifying relationships such as @OneToMany, @ManyToOne, and @OneToOne. They can reveal incorrect mappings, missing join columns, cascade configuration problems, and unexpected persistence behavior.",
        "Relationship tests should create the required entities, persist them according to the intended ownership model, retrieve them, and verify the relationship."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldPersistEmployeeDepartmentRelationship() {

    Department department =
            new Department("Engineering");

    Employee employee =
            new Employee("Ravi");

    employee.setDepartment(department);

    repository.save(employee);

    Employee saved =
            repository.findById(employee.getId())
                    .orElseThrow();

    assertEquals(
        "Engineering",
        saved.getDepartment().getName()
    );
}`
      },
      bullets: [
        "Test relationship mappings with realistic data.",
        "Verify the owning side and foreign-key behavior.",
        "Test cascade behavior separately when it matters.",
        "Test lazy relationships carefully because repository tests execute within a transaction."
      ]
    },
    {
      id: "pagination",
      title: "Testing Pagination and Sorting",
      paragraphs: [
        "Spring Data repositories support Pageable and Sort. Repository tests should verify page size, total elements, returned content, and ordering when these behaviors are part of the application."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Test
void shouldReturnEmployeesInSortedOrder() {

    repository.save(new Employee("Zack"));
    repository.save(new Employee("Arun"));
    repository.save(new Employee("Ravi"));

    PageRequest pageRequest =
            PageRequest.of(
                0,
                2,
                Sort.by("name").ascending()
            );

    Page<Employee> page =
            repository.findAll(pageRequest);

    assertEquals(2, page.getContent().size());
    assertEquals("Arun",
            page.getContent().get(0).getName());
}`
      },
      bullets: [
        "Verify page size.",
        "Verify total element count when important.",
        "Verify sorting direction.",
        "Test boundary pages when pagination logic is important."
      ]
    },
    {
      id: "test-database",
      title: "Choose the Appropriate Test Database",
      paragraphs: [
        "An embedded database is convenient for fast tests, but it may behave differently from MySQL in SQL dialect, constraints, data types, indexes, and transaction behavior.",
        "If production uses MySQL, consider integration tests against a dedicated test instance or a disposable database environment that matches the production engine. Never point destructive tests at a production database.",
        "A repository test using H2 can confirm many JPA behaviors, but it does not automatically prove that MySQL-specific SQL behaves identically."
      ],
      bullets: [
        "Use embedded databases for fast repository tests when suitable.",
        "Use a dedicated test database when MySQL-specific behavior matters.",
        "Use a disposable database environment when realistic database behavior is required.",
        "Keep test data isolated and predictable.",
        "Never run destructive tests against production.",
        "Do not assume H2 and MySQL behave identically in every database feature."
      ]
    },
    {
      id: "mysql-testing",
      title: "Testing Against MySQL",
      paragraphs: [
        "If the application uses MySQL in production, some repository behavior should eventually be verified against MySQL itself. This is particularly important when queries depend on MySQL-specific SQL syntax, collations, indexes, data types, or database behavior.",
        "A dedicated test MySQL instance should be isolated from production data. The test configuration should use a separate datasource and credentials."
      ],
      code: {
        language: "yaml",
        code: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codeforge_test
    username: test_user
    password: test_password

  jpa:
    hibernate:
      ddl-auto: create-drop`
      },
      bullets: [
        "Use a separate test database.",
        "Never reuse production credentials.",
        "Do not commit real passwords to source control.",
        "Prefer environment variables or secure configuration for credentials.",
        "Use a schema strategy appropriate for the test environment."
      ]
    },
    {
      id: "repository-vs-mock",
      title: "Repository Test vs Mockito Repository Mock",
      paragraphs: [
        "A common interview question is the difference between mocking a repository and testing the repository itself. In a service unit test, the repository is usually mocked because the service is the unit under test.",
        "In a repository test, the repository should be real because the purpose is to test JPA mappings and database queries."
      ],
      code: {
        language: "text",
        code: `Service Unit Test

EmployeeService
      |
      v
Mock EmployeeRepository
      |
      +--> controlled response


Repository Test

EmployeeRepository
      |
      v
Spring Data JPA
      |
      v
EntityManager
      |
      v
Test Database`
      },
      bullets: [
        "Mockito repository mock -> tests service behavior.",
        "@DataJpaTest -> tests repository and JPA persistence behavior.",
        "Do not mock the repository when the repository itself is the unit being tested.",
        "Use the appropriate test level for the behavior you want to verify."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes in @DataJpaTest",
      paragraphs: [
        "Repository tests can fail for reasons unrelated to the repository query itself. Understanding the common mistakes makes debugging much easier."
      ],
      bullets: [
        "Using @SpringBootTest when a focused repository test is enough.",
        "Expecting @DataJpaTest to load all application services and controllers.",
        "Using an embedded database while assuming all MySQL behavior is identical.",
        "Forgetting that test transactions normally roll back.",
        "Depending on data created by another test.",
        "Forgetting to flush when testing database constraints.",
        "Using production database credentials.",
        "Testing too many unrelated behaviors in one test.",
        "Ignoring entity mapping problems.",
        "Writing tests that depend on test execution order.",
        "Using random test data that makes failures difficult to reproduce.",
        "Assuming a repository mock tests the real database query."
      ]
    },
    {
      id: "debugging",
      title: "Debugging Repository Test Failures",
      paragraphs: [
        "When a @DataJpaTest fails, first identify whether the problem is with the test setup, entity mapping, repository query, database schema, transaction behavior, or test data.",
        "A useful debugging process is to inspect the exception message, enable SQL logging when necessary, verify the entity mapping, and reproduce the query with a small focused test."
      ],
      code: {
        language: "yaml",
        code: `spring:
  jpa:
    show-sql: true

logging:
  level:
    org.hibernate.SQL: DEBUG`
      },
      bullets: [
        "Check the full exception cause rather than only the top-level message.",
        "Check entity annotations and column mappings.",
        "Check repository method names.",
        "Check custom JPQL parameters.",
        "Check the test database schema.",
        "Use SQL logging when debugging generated SQL.",
        "Reduce the failing test to the smallest reproducible scenario."
      ]
    },
    {
      id: "repository-test-flow",
      title: "Complete Repository Testing Flow",
      paragraphs: [
        "The complete repository testing flow starts with the test slice creating the required persistence infrastructure. The test then creates entities, uses the real repository, executes a query, and asserts the result.",
        "After the test completes, the transaction is normally rolled back so that the test does not leave persistent changes behind."
      ],
      code: {
        language: "text",
        code: `JUnit 5
   |
   v
@DataJpaTest
   |
   v
Spring JPA Test Context
   |
   +--> Entity Mapping
   |
   +--> EntityManager
   |
   +--> Repository
   |
   +--> Test Database
   |
   v
Save Entity
   |
   v
Execute Repository Query
   |
   v
Database
   |
   v
Query Result
   |
   v
Assertions
   |
   v
Transaction Rollback`
      }
    },
    {
      id: "best-practices",
      title: "Repository Testing Best Practices",
      paragraphs: [
        "Repository tests should focus on persistence behavior that can fail independently of service logic. Keep them small and make each test explain what repository behavior it protects.",
        "A good repository test uses meaningful data, verifies both successful and edge cases, and avoids unnecessary application-level setup."
      ],
      bullets: [
        "Use @DataJpaTest for focused JPA repository tests.",
        "Use realistic test data.",
        "Test custom repository queries explicitly.",
        "Test both matching and non-matching cases.",
        "Test important constraints and relationships.",
        "Use flush() when database-level behavior must occur immediately.",
        "Keep each test independent.",
        "Do not rely on test execution order.",
        "Use an appropriate database for the behavior being tested.",
        "Never use production data for destructive tests.",
        "Keep credentials outside source code.",
        "Use @SpringBootTest when broader application integration is actually required."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What does @DataJpaTest do?",
          answer:
            "It loads a focused JPA test slice for testing repositories and entity mappings rather than loading the entire application."
        },
        {
          question: "Why are @DataJpaTest methods commonly transactional?",
          answer:
            "They normally run in a transaction that is rolled back after each test, helping isolate test data."
        },
        {
          question: "Should repository tests always use H2?",
          answer:
            "No. H2 is convenient, but tests against the production database engine may be needed to verify database-specific behavior."
        },
        {
          question: "Does @DataJpaTest test a real repository?",
          answer:
            "Yes. The repository is normally provided by Spring Data JPA, so repository operations and queries are actually executed against the configured test database."
        },
        {
          question: "What is the difference between @DataJpaTest and @SpringBootTest?",
          answer:
            "@DataJpaTest focuses on JPA-related components and persistence behavior, while @SpringBootTest can load the complete Spring Boot application context."
        },
        {
          question: "Why use @DataJpaTest instead of mocking the repository?",
          answer:
            "Mocking a repository tests how another class interacts with the repository, but @DataJpaTest verifies the repository's actual query, entity mapping, and persistence behavior."
        },
        {
          question: "Why does a @DataJpaTest normally roll back data?",
          answer:
            "Rollback prevents test data from remaining after the test and helps keep tests isolated from one another."
        },
        {
          question: "What is the purpose of flush() in a JPA repository test?",
          answer:
            "flush() synchronizes pending persistence operations with the database. It is useful when the test needs database-level constraints or SQL behavior to be evaluated immediately."
        },
        {
          question: "Does flush() commit the transaction?",
          answer:
            "No. flush() synchronizes persistence changes with the database, but it does not commit the surrounding transaction."
        },
        {
          question: "Why might H2 tests pass while MySQL behaves differently?",
          answer:
            "H2 and MySQL can differ in SQL dialect, data types, constraints, indexes, collations, and database-specific behavior. Production-database integration testing may therefore still be necessary."
        },
        {
          question: "Can @DataJpaTest test custom @Query methods?",
          answer:
            "Yes. It is well suited for testing derived queries and custom JPQL repository queries."
        },
        {
          question: "Should repository tests depend on data created by another test?",
          answer:
            "No. Tests should be independent and should arrange the data they need themselves."
        },
        {
          question: "What should you test in a repository?",
          answer:
            "Test custom queries, important derived queries, entity mappings, relationships, constraints, pagination, sorting, and persistence behavior that is important to the application."
        },
        {
          question: "Does @DataJpaTest load controllers and services?",
          answer:
            "It is a JPA-focused test slice and does not load the complete application context like @SpringBootTest. It should not be treated as a full application test."
        },
        {
          question: "How would you test a unique database constraint?",
          answer:
            "Insert the first record, insert a duplicate value, and flush the persistence context so the database constraint is evaluated. Then assert the appropriate persistence exception."
        }
      ]
    },
    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "Your EmployeeRepository.findByName() returns incorrect results. How would you test it?",
          answer:
            "Use @DataJpaTest, insert representative Employee records into the test database, call findByName(), and assert both the number and contents of the returned records."
        },
        {
          question:
            "Your repository test passes with H2 but fails with MySQL. What could be the reason?",
          answer:
            "The query or mapping may depend on database-specific SQL behavior, data types, collations, constraints, indexes, or transaction semantics. Test important production-specific behavior against MySQL as well."
        },
        {
          question:
            "Why would you use flush() when testing a unique constraint?",
          answer:
            "JPA may delay SQL execution. flush() forces pending changes to be synchronized with the database so the database constraint can be evaluated during the test."
        },
        {
          question:
            "Why should you not use Mockito for testing EmployeeRepository itself?",
          answer:
            "A Mockito mock does not execute the real JPA query or interact with the database. If the repository is the unit under test, use @DataJpaTest so the actual repository infrastructure is exercised."
        },
        {
          question:
            "A repository test depends on data created by another test and sometimes fails. What is the problem?",
          answer:
            "The tests are not independent. Each test should create the data it requires rather than depending on execution order or persistent state from another test."
        },
        {
          question:
            "When would you choose @SpringBootTest instead of @DataJpaTest?",
          answer:
            "Choose @SpringBootTest when the behavior requires the complete Spring application context, such as testing interactions across controllers, services, repositories, security, configuration, and other application components."
        }
      ]
    },
    {
      id: "quick-reference",
      title: "Repository Testing Quick Reference",
      bullets: [
        "@DataJpaTest -> focused JPA repository and entity test slice.",
        "@SpringBootTest -> broader Spring Boot application context test.",
        "@Autowired repository -> use the real Spring Data repository in the test.",
        "repository.save() -> persist or merge an entity.",
        "repository.findById() -> retrieve an entity by identifier.",
        "repository.findAll() -> retrieve entities.",
        "repository.deleteById() -> delete by identifier.",
        "repository.existsById() -> check whether an entity exists.",
        "repository.count() -> count records.",
        "repository.flush() -> synchronize pending persistence operations with the database.",
        "Derived query -> query generated from repository method name.",
        "@Query -> define a custom JPQL or SQL query.",
        "Rollback -> normally removes test transaction changes after the test.",
        "H2 -> convenient embedded test database when its behavior is sufficient.",
        "MySQL test database -> useful when production-specific MySQL behavior matters."
      ]
    },
    {
      id: "revision-notes",
      title: "Revision Notes",
      paragraphs: [
        "@DataJpaTest is one of the most important Spring Boot testing annotations for repository-level testing. Remember that its purpose is not to test the complete application. Its purpose is to focus on JPA persistence behavior.",
        "The most important distinction is between Mockito repository tests and @DataJpaTest. Mockito replaces the repository with a fake dependency so that a service can be tested in isolation. @DataJpaTest uses the real repository infrastructure so that repository queries and entity mappings can be tested.",
        "For interviews, remember three key points: @DataJpaTest is a JPA test slice, tests are normally transactional with rollback, and an embedded database such as H2 may not behave exactly like production MySQL."
      ],
      bullets: [
        "@DataJpaTest = repository/JPA-focused test.",
        "Real repository infrastructure is used.",
        "Tests are normally transactional.",
        "Test changes normally roll back.",
        "Derived queries should be tested.",
        "Custom @Query methods should be tested.",
        "flush() can force pending changes to reach the database.",
        "H2 is convenient but not identical to MySQL.",
        "Use production-like database testing when database-specific behavior matters.",
        "Do not mock the repository when the repository itself is under test.",
        "Keep repository tests independent and deterministic."
      ]
    }
  ]
};
