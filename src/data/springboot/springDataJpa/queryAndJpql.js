
export const queryAndJpql = {
  id: 807,

  title: "@Query and JPQL",

  slug: "query-and-jpql",

  topicTitle: "Spring Data JPA",

  description:
    "Learn how to define explicit repository queries using @Query and JPQL when derived query methods are not sufficient.",

  estimatedTime: "55 min",

  sections: [
    {
      id: "query",

      title: "What is @Query?",

      paragraphs: [
        "The @Query annotation allows a repository method to define an explicit query instead of relying on Spring Data's method-name query derivation.",
        "@Query is useful when a query is too complex, too long, or needs explicit control over joins, conditions, projections, aggregation, or ordering.",
        "By default, @Query is commonly used with JPQL. A query can also be a native SQL query when nativeQuery = true is specified."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
List<Employee> findEmployeesByDepartment(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "why-query",

      title: "Why Do We Need @Query?",

      paragraphs: [
        "Spring Data JPA can derive many queries automatically from repository method names. However, method names can become difficult to read when the query contains many conditions or relationships.",
        "@Query allows the developer to express the query directly."
      ],

      code: {
        language: "java",
        code: `// Simple derived query

List<Employee> findByDepartment(String department);


// Explicit query

@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       AND e.salary > :salary
       """)
List<Employee> findEmployees(
        @Param("department") String department,
        @Param("salary") double salary
);`
      }
    },

    {
      id: "jpql",

      title: "What is JPQL?",

      paragraphs: [
        "JPQL stands for Java Persistence Query Language. It is an object-oriented query language defined by JPA.",
        "JPQL operates on entity classes and their persistent properties rather than directly using database table and column names.",
        "JPQL is designed around the application's entity model. Hibernate or another JPA provider translates the JPQL query into database-specific SQL."
      ],

      code: {
        language: "text",
        code: `Application
    |
    | JPQL
    v
Spring Data JPA
    |
    v
JPA Provider
    |
    | generated SQL
    v
Database`
      }
    },

    {
      id: "entity-query",

      title: "JPQL Uses Entity Names",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
List<Employee> findByDepartment(
        @Param("department")
        String department
);`
      },

      paragraphs: [
        "Notice that the query uses Employee, which is the entity name, and e.department, which is an entity property.",
        "JPQL normally does not use the physical database table name in the FROM clause.",
        "Likewise, the WHERE clause normally refers to the Java entity property rather than the database column name."
      ]
    },

    {
      id: "entity-vs-table",

      title: "Entity Name vs Table Name",

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    private Long id;

    @Column(name = "employee_name")
    private String name;

    private String department;
}`
      },

      paragraphs: [
        "The database table is employees, but the JPQL query uses Employee because Employee is the entity.",
        "Similarly, if the Java property is name and it maps to the employee_name column, JPQL uses e.name rather than e.employee_name."
      ],

      code: {
        language: "text",
        code: `JPQL

FROM Employee e
WHERE e.name = :name


Database SQL

FROM employees
WHERE employee_name = ?`
      }
    },

    {
      id: "parameter",

      title: "Named Parameters",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.email = :email
       """)
Optional<Employee> findByEmail(
        @Param("email")
        String email
);`
      },

      paragraphs: [
        "Named parameters make JPQL queries easier to read because the parameter name describes its purpose.",
        "The :email placeholder in the query is connected to the method parameter using @Param(\"email\")."
      ]
    },

    {
      id: "positional-parameters",

      title: "Positional Parameters",

      paragraphs: [
        "JPQL can also use positional parameters such as ?1 and ?2. Named parameters are often preferred because they are easier to understand when a query contains multiple parameters."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = ?1
       AND e.salary > ?2
       """)
List<Employee> findEmployees(
        String department,
        double salary
);`
      }
    },

    {
      id: "select",

      title: "Basic SELECT Query",

      paragraphs: [
        "The SELECT clause specifies what the query should return. When selecting an entity, the result is normally a collection of entity objects."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       """)
List<Employee> findAllEmployees();`
      }
    },

    {
      id: "where",

      title: "WHERE Clause",

      paragraphs: [
        "The WHERE clause filters the records returned by the query."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
List<Employee> findByDepartment(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "multiple-conditions",

      title: "Multiple Conditions",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       AND e.salary >= :salary
       """)
List<Employee> findEmployees(
        @Param("department") String department,
        @Param("salary") double salary
);`
      },

      paragraphs: [
        "JPQL supports logical operators such as AND and OR. Parentheses can be used when the intended logical grouping needs to be made explicit."
      ]
    },

    {
      id: "operators",

      title: "Common JPQL Operators",

      code: {
        language: "text",
        code: `=
<>
>
>=
<
<=
AND
OR
NOT
BETWEEN
IN
LIKE
IS NULL
IS NOT NULL`
      }
    },

    {
      id: "like",

      title: "LIKE Queries",

      paragraphs: [
        "LIKE is commonly used when searching text using a pattern."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.name LIKE :name
       """)
List<Employee> searchByName(
        @Param("name")
        String name
);`
      },

      bullets: [
        "Use % for any sequence of characters.",
        "Use _ for a single character.",
        "The exact case-sensitivity behavior can depend on the database and collation."
      ]
    },

    {
      id: "like-example",

      title: "LIKE Search Example",

      code: {
        language: "java",
        code: `String pattern = "%ven%";

List<Employee> employees =
    employeeRepository.searchByName(pattern);`
      },

      paragraphs: [
        "A pattern such as %ven% can match names containing the text ven."
      ]
    },

    {
      id: "between",

      title: "BETWEEN Operator",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.salary BETWEEN :minSalary AND :maxSalary
       """)
List<Employee> findBySalaryRange(
        @Param("minSalary") double minSalary,
        @Param("maxSalary") double maxSalary
);`
      }
    },

    {
      id: "in",

      title: "IN Operator",

      paragraphs: [
        "The IN operator is useful when a property can match one value from a collection of values."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department IN :departments
       """)
List<Employee> findByDepartments(
        @Param("departments")
        List<String> departments
);`
      }
    },

    {
      id: "null",

      title: "Checking NULL Values",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.manager IS NULL
       """)
List<Employee> findEmployeesWithoutManager();`
      },

      paragraphs: [
        "JPQL uses IS NULL and IS NOT NULL rather than comparing a property to NULL with the = operator."
      ]
    },

    {
      id: "order-by",

      title: "ORDER BY",

      paragraphs: [
        "ORDER BY controls the ordering of query results."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       ORDER BY e.name ASC
       """)
List<Employee> findEmployeesSortedByName();`
      }
    },

    {
      id: "multiple-order",

      title: "Multiple ORDER BY Fields",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       ORDER BY e.department ASC,
                e.salary DESC
       """)
List<Employee> findEmployeesSorted();`
      },

      paragraphs: [
        "The first ordering expression has higher priority. If two employees have the same department, salary determines their relative order."
      ]
    },

    {
      id: "update",

      title: "Update Queries",

      paragraphs: [
        "Repository queries that modify data require appropriate transaction and modifying semantics. Spring Data JPA provides @Modifying for modifying queries.",
        "The method returns the number of affected rows in this example."
      ],

      code: {
        language: "java",
        code: `@Modifying
@Query("""
       UPDATE Employee e
       SET e.department = :department
       WHERE e.id = :id
       """)
int updateDepartment(
        @Param("id") Long id,
        @Param("department") String department
);`
      }
    },

    {
      id: "modifying-transaction",

      title: "@Modifying and Transactions",

      paragraphs: [
        "A modifying query normally needs to execute inside an appropriate transaction. The transaction boundary is commonly placed on the service method that invokes the repository operation.",
        "@Modifying tells Spring Data that the query changes data instead of being a normal select query."
      ],

      code: {
        language: "java",
        code: `@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(
            EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public int changeDepartment(
            Long id,
            String department) {

        return repository.updateDepartment(
            id,
            department
        );
    }
}`
      }
    },

    {
      id: "delete-query",

      title: "DELETE Queries",

      paragraphs: [
        "The same @Modifying concept applies to JPQL DELETE queries."
      ],

      code: {
        language: "java",
        code: `@Modifying
@Query("""
       DELETE FROM Employee e
       WHERE e.department = :department
       """)
int deleteByDepartment(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "bulk-update-warning",

      title: "Bulk Update and Persistence Context",

      paragraphs: [
        "Bulk UPDATE and DELETE queries operate directly at the database level and can leave already-managed entity objects in the persistence context with stale state.",
        "For operations where this matters, consider the persistence-context synchronization behavior and whether the context should be cleared after the modifying query."
      ],

      code: {
        language: "java",
        code: `@Modifying(clearAutomatically = true)
@Query("""
       UPDATE Employee e
       SET e.department = :department
       WHERE e.id = :id
       """)
int updateDepartment(
        @Param("id") Long id,
        @Param("department") String department
);`
      }
    },

    {
      id: "derived-vs-query",

      title: "Derived Query vs @Query",

      code: {
        language: "text",
        code: `Simple condition
     |
     v
Derived Query Method

Complex or explicit query
     |
     v
@Query + JPQL`
      },

      paragraphs: [
        "The goal is readability. A short derived query is often easier to understand than an unnecessarily verbose explicit query, while complex queries may be clearer when written using @Query."
      ]
    },

    {
      id: "derived-example",

      title: "Derived Query Example",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentAndSalaryGreaterThan(
    String department,
    double salary
);`
      },

      paragraphs: [
        "This method name is still reasonably readable, so query derivation may be appropriate."
      ]
    },

    {
      id: "explicit-example",

      title: "When @Query Becomes Clearer",

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       AND e.salary BETWEEN :minSalary AND :maxSalary
       AND e.active = true
       ORDER BY e.salary DESC
       """)
List<Employee> findActiveEmployees(
        @Param("department") String department,
        @Param("minSalary") double minSalary,
        @Param("maxSalary") double maxSalary
);`
      },

      paragraphs: [
        "As the number of conditions and ordering rules increases, an explicit query can be easier to read than a very long repository method name."
      ]
    },

    {
      id: "jpql-vs-sql",

      title: "JPQL vs SQL",

      code: {
        language: "text",
        code: `JPQL

SELECT e
FROM Employee e
WHERE e.department = :department


SQL

SELECT *
FROM employees
WHERE department = ?`
      },

      paragraphs: [
        "JPQL works with entities and their properties, while SQL works directly with database tables and columns.",
        "The JPA provider translates JPQL into SQL appropriate for the configured database."
      ]
    },

    {
      id: "join",

      title: "JPQL JOIN",

      paragraphs: [
        "JPQL can navigate entity relationships and perform joins. This is especially useful when filtering or returning data based on related entities."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       JOIN e.department d
       WHERE d.name = :departmentName
       """)
List<Employee> findEmployeesByDepartmentName(
        @Param("departmentName")
        String departmentName
);`
      }
    },

    {
      id: "join-fetch",

      title: "JOIN FETCH",

      paragraphs: [
        "JOIN FETCH can be used when a query needs to retrieve an associated entity as part of the same query execution, helping address certain lazy-loading and N+1 query situations.",
        "It should be used carefully because fetching collection relationships can change the number of returned rows and may require DISTINCT."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT DISTINCT e
       FROM Employee e
       JOIN FETCH e.projects
       WHERE e.department = :department
       """)
List<Employee> findEmployeesWithProjects(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "projection",

      title: "Selecting Specific Fields",

      paragraphs: [
        "JPQL does not always need to return complete entities. A query can select specific fields when the application needs only a subset of data."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e.name, e.department
       FROM Employee e
       WHERE e.active = true
       """)
List<Object[]> findActiveEmployeeSummary();`
      },

      paragraphs: [
        "For production APIs, interface-based or DTO projections are often preferable to exposing raw Object arrays because they provide clearer types."
      ]
    },

    {
      id: "dto-projection",

      title: "DTO Projection with JPQL",

      paragraphs: [
        "JPQL supports constructor expressions for creating DTO results directly from selected entity properties."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT new com.example.employee.EmployeeSummary(
           e.id,
           e.name,
           e.department
       )
       FROM Employee e
       WHERE e.active = true
       """)
List<EmployeeSummary> findActiveEmployeeSummaries();`
      }
    },

    {
      id: "aggregate",

      title: "Aggregate Functions",

      paragraphs: [
        "JPQL supports aggregate operations such as COUNT, SUM, AVG, MIN, and MAX."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT COUNT(e)
       FROM Employee e
       WHERE e.department = :department
       """)
long countByDepartment(
        @Param("department")
        String department
);`
      }
    },

    {
      id: "group-by",

      title: "GROUP BY",

      paragraphs: [
        "GROUP BY can be used when the query needs aggregated information grouped by an entity property."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e.department, COUNT(e)
       FROM Employee e
       GROUP BY e.department
       """)
List<Object[]> countEmployeesByDepartment();`
      }
    },

    {
      id: "functions",

      title: "JPQL Functions",

      paragraphs: [
        "JPQL provides functions for common operations such as string manipulation, numeric operations, and date-related operations. Exact function support can depend on the JPA provider and database."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE LOWER(e.name) = LOWER(:name)
       """)
List<Employee> findByNameIgnoreCase(
        @Param("name")
        String name
);`
      }
    },

    {
      id: "pagination",

      title: "Using @Query with Pagination",

      paragraphs: [
        "An @Query method can accept Pageable. This allows explicit JPQL to be combined with pagination and sorting."
      ],

      code: {
        language: "java",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
Page<Employee> findByDepartment(
        @Param("department")
        String department,
        Pageable pageable
);`
      }
    },

    {
      id: "count-query",

      title: "Count Query for Paginated Custom Queries",

      paragraphs: [
        "When a custom query returns Page, Spring Data may need a count query to determine the total number of matching records. For complex queries, the count query can be specified explicitly."
      ],

      code: {
        language: "java",
        code: `@Query(
    value = """
        SELECT e
        FROM Employee e
        WHERE e.department = :department
        """,
    countQuery = """
        SELECT COUNT(e)
        FROM Employee e
        WHERE e.department = :department
        """
)
Page<Employee> findByDepartment(
    @Param("department")
    String department,
    Pageable pageable
);`
      }
    },

    {
      id: "native-query",

      title: "Native SQL Query",

      paragraphs: [
        "Spring Data JPA can also execute native SQL when nativeQuery = true is specified.",
        "Native queries are useful when database-specific SQL features are required or when a query cannot be expressed conveniently using JPQL."
      ],

      code: {
        language: "java",
        code: `@Query(
    value = """
        SELECT *
        FROM employees
        WHERE department = :department
        """,
    nativeQuery = true
)
List<Employee> findEmployeesNative(
    @Param("department")
    String department
);`
      }
    },

    {
      id: "jpql-vs-native",

      title: "JPQL vs Native SQL",

      code: {
        language: "text",
        code: `JPQL

SELECT e
FROM Employee e
WHERE e.department = :department

Advantages:
- Entity-oriented
- More database-independent
- Uses entity properties
- Works naturally with JPA


Native SQL

SELECT *
FROM employees
WHERE department = ?

Advantages:
- Database-specific features
- Direct SQL control
- Useful for vendor-specific queries`
      }
    },

    {
      id: "when-native",

      title: "When Should You Use Native SQL?",

      bullets: [
        "When a database-specific feature is required.",
        "When the query is difficult or impossible to express cleanly in JPQL.",
        "When existing SQL must be reused.",
        "When database-specific optimization is intentionally required.",
        "When working with database objects or features outside the normal entity model."
      ],

      paragraphs: [
        "Native SQL should not automatically replace JPQL. Prefer the most maintainable query style that satisfies the application's requirements."
      ]
    },

    {
      id: "query-flow",

      title: "Complete @Query Execution Flow",

      code: {
        language: "text",
        code: `React / Client
      |
      | HTTP request
      v
Controller
      |
      v
Service
      |
      v
EmployeeRepository
      |
      | @Query
      v
Spring Data JPA
      |
      | JPQL
      v
JPA Provider / Hibernate
      |
      | SQL
      v
Database
      |
      | rows
      v
Hibernate
      |
      | entities / DTOs
      v
Service
      |
      v
Controller
      |
      | JSON
      v
Client`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes with @Query and JPQL",

      bullets: [
        "Using the database table name instead of the entity name in JPQL.",
        "Using database column names instead of entity property names.",
        "Forgetting @Param when named parameter binding is not otherwise configured or explicit.",
        "Using @Query when a simple derived query would be clearer.",
        "Creating extremely long derived method names instead of using an explicit query.",
        "Forgetting @Modifying for UPDATE or DELETE repository queries.",
        "Executing modifying queries without an appropriate transaction.",
        "Not considering persistence-context synchronization after bulk UPDATE or DELETE operations.",
        "Using native SQL when JPQL would be sufficient and more portable.",
        "Returning Object[] when a clear DTO or projection would be easier to maintain.",
        "Ignoring count-query performance for complex paginated Page queries.",
        "Using JOIN FETCH on collections without considering duplicate rows and pagination implications.",
        "Writing provider-specific JPQL functions without considering portability.",
        "Assuming JPQL is the same language as SQL."
      ]
    },

    {
      id: "best-practices",

      title: "@Query and JPQL Best Practices",

      bullets: [
        "Prefer derived queries for simple conditions.",
        "Use @Query when explicit query logic improves readability.",
        "Use named parameters for readable parameter binding.",
        "Use entity names and entity properties in JPQL.",
        "Keep queries formatted across multiple lines when they are complex.",
        "Use DTO or interface projections when only selected fields are required.",
        "Use @Modifying for repository UPDATE and DELETE queries.",
        "Keep transaction boundaries in the service layer in most application designs.",
        "Review persistence-context effects of bulk modifying queries.",
        "Use pagination for large result sets.",
        "Provide an appropriate count query when a complex paginated query requires one.",
        "Prefer JPQL when database portability is important.",
        "Use native SQL deliberately when database-specific behavior is actually needed.",
        "Test important repository queries against realistic data."
      ]
    },

    {
      id: "testing",

      title: "Testing @Query Methods",

      paragraphs: [
        "Repository queries should be tested when their correctness is important, especially for joins, filtering, aggregation, custom updates, and complex JPQL.",
        "A repository-focused test using @DataJpaTest can execute the real query against a test database."
      ],

      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void shouldFindEmployeesByDepartment() {

        List<Employee> employees =
            repository.findByDepartment("IT");

        assertEquals(2, employees.size());
    }
}`
      }
    },

    {
      id: "debugging",

      title: "How to Debug a JPQL Query",

      bullets: [
        "Check whether the entity name is correct.",
        "Check whether every property name matches the entity.",
        "Check named parameters and @Param values.",
        "Check relationships used in JOIN expressions.",
        "Check whether the repository return type matches the SELECT clause.",
        "For modifying queries, verify @Modifying and transaction configuration.",
        "Enable SQL logging when appropriate to inspect generated SQL.",
        "Test the repository query with realistic test data."
      ]
    },

    {
      id: "complete-repository",

      title: "Complete Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(
        String department
    );

    @Query("""
           SELECT e
           FROM Employee e
           WHERE e.department = :department
           AND e.salary > :salary
           ORDER BY e.salary DESC
           """)
    List<Employee> findHighPaidEmployees(
        @Param("department")
        String department,

        @Param("salary")
        double salary
    );

    @Query("""
           SELECT COUNT(e)
           FROM Employee e
           WHERE e.department = :department
           """)
    long countEmployees(
        @Param("department")
        String department
    );

    @Modifying
    @Query("""
           UPDATE Employee e
           SET e.department = :department
           WHERE e.id = :id
           """)
    int updateDepartment(
        @Param("id")
        Long id,

        @Param("department")
        String department
    );
}`
      }
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is @Query in Spring Data JPA?",
          answer:
            "@Query allows a repository method to define an explicit JPQL or native SQL query instead of relying only on method-name query derivation."
        },

        {
          question: "What is JPQL?",
          answer:
            "JPQL is the object-oriented query language defined by JPA for querying entities and their persistent properties."
        },

        {
          question: "What is the difference between JPQL and SQL?",
          answer:
            "JPQL queries entities and entity properties, while SQL directly queries database tables and columns."
        },

        {
          question: "Why does JPQL use Employee instead of employees?",
          answer:
            "JPQL operates on the JPA entity model. Employee is the entity name, while employees is typically the physical database table name."
        },

        {
          question: "Why does JPQL use e.department instead of department?",
          answer:
            "e.department refers to the persistent property department of the Employee entity. JPQL works with entity properties rather than physical database column names."
        },

        {
          question: "What is @Param used for?",
          answer:
            "@Param connects a repository method parameter with a named parameter such as :department in a JPQL query."
        },

        {
          question: "What is the difference between named and positional parameters?",
          answer:
            "Named parameters use names such as :department, while positional parameters use positions such as ?1 and ?2. Named parameters are often easier to read and maintain."
        },

        {
          question: "What is @Modifying used for?",
          answer:
            "@Modifying tells Spring Data that an @Query performs a modifying operation such as UPDATE or DELETE rather than a normal select operation."
        },

        {
          question: "Can @Modifying be used without a transaction?",
          answer:
            "A modifying query normally needs an appropriate transaction to execute successfully. In typical applications, the transaction boundary is placed on the service method that performs the operation."
        },

        {
          question: "Can @Query be used for UPDATE queries?",
          answer:
            "Yes. An UPDATE query can be defined with @Query and should use @Modifying."
        },

        {
          question: "Can @Query be used for DELETE queries?",
          answer:
            "Yes. A JPQL DELETE query can be defined with @Query and @Modifying."
        },

        {
          question: "Why can bulk UPDATE cause stale entity data?",
          answer:
            "Bulk JPQL UPDATE and DELETE operations act directly on the database and do not synchronize already-managed entity instances in the persistence context automatically."
        },

        {
          question: "When should you use a derived query instead of @Query?",
          answer:
            "Use a derived query when the method name remains simple and readable. Use @Query when the query becomes complex or explicit query logic is clearer."
        },

        {
          question: "Can @Query return DTOs?",
          answer:
            "Yes. JPQL supports constructor expressions, and Spring Data JPA also supports projection mechanisms for returning selected data."
        },

        {
          question: "Can @Query support pagination?",
          answer:
            "Yes. A repository method can accept Pageable and return Page or Slice, allowing pagination and sorting to be applied to the query."
        },

        {
          question: "Why might a countQuery be needed?",
          answer:
            "When a custom query returns Page, Spring Data may need a count query to determine total matching records. For complex queries, specifying countQuery explicitly can be useful."
        },

        {
          question: "What is nativeQuery = true?",
          answer:
            "nativeQuery = true tells Spring Data JPA that the query string should be treated as native SQL rather than JPQL."
        },

        {
          question: "When would you choose native SQL over JPQL?",
          answer:
            "Use native SQL when database-specific functionality or SQL that is difficult to express cleanly in JPQL is required."
        },

        {
          question: "What is the difference between JOIN and JOIN FETCH?",
          answer:
            "JOIN is used for joining entities in a query, while JOIN FETCH additionally requests that the associated entity or relationship be fetched as part of the query result."
        },

        {
          question: "What is the purpose of DISTINCT with JOIN FETCH?",
          answer:
            "When fetching a collection relationship, the SQL result can contain multiple rows for the same root entity. DISTINCT can be used at the JPQL level to eliminate duplicate root entities in the returned result."
        },

        {
          question: "Does JPQL execute directly against the database?",
          answer:
            "No. The JPA provider processes JPQL and translates it into SQL appropriate for the configured database."
        },

        {
          question: "Can JPQL use aggregate functions?",
          answer:
            "Yes. JPQL supports aggregate functions such as COUNT, SUM, AVG, MIN, and MAX."
        },

        {
          question: "Can JPQL use GROUP BY?",
          answer:
            "Yes. JPQL supports GROUP BY for grouping query results, commonly together with aggregate functions."
        },

        {
          question: "How do you search using LIKE in JPQL?",
          answer:
            "Use the LIKE operator, for example WHERE e.name LIKE :name, and provide a pattern such as %ven% as the parameter value."
        },

        {
          question: "How do you pass a collection to an IN query?",
          answer:
            "Use an IN expression with a collection-valued parameter, such as WHERE e.department IN :departments, and pass a collection containing the allowed values."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "A repository method name has become extremely long because it contains many conditions. What would you do?",
          answer:
            "I would consider replacing the very long derived method with an explicit @Query. If the query is complex, JPQL can make the conditions and ordering easier to understand and maintain."
        },

        {
          question: "The interviewer gives you a table named employees and asks you to write JPQL. What do you use in the FROM clause?",
          answer:
            "I would use the JPA entity name, for example FROM Employee e, rather than FROM employees. JPQL works with entities rather than physical table names."
        },

        {
          question: "Your Employee entity has a Java field named name mapped to database column employee_name. What does JPQL use?",
          answer:
            "JPQL uses e.name because it operates on the entity property. The database column employee_name is handled by the JPA provider when it generates SQL."
        },

        {
          question: "You wrote an UPDATE query with @Query but it fails at runtime. What would you check?",
          answer:
            "I would check that @Modifying is present, that the query uses entity properties correctly, and that the operation executes within an appropriate transaction."
        },

        {
          question: "You run a bulk update and then read an already-loaded Employee object, but it contains the old department. Why?",
          answer:
            "The bulk update changed the database directly while the existing Employee instance remained managed with its previous state in the persistence context. I would consider the persistence-context synchronization strategy, such as clearing it after the bulk operation when appropriate."
        },

        {
          question: "You need to return only employee ID, name, and department instead of the complete entity. What would you choose?",
          answer:
            "I would consider a DTO or projection instead of loading and returning the complete entity. JPQL constructor expressions can directly create DTO results."
        },

        {
          question: "A paginated @Query is slow because calculating total records is expensive. What would you investigate?",
          answer:
            "I would inspect the generated count query and database execution plan. If total counts are not required by the client, I would consider Slice. I would also optimize filters and indexes and review whether the query design is appropriate."
        },

        {
          question: "The application must use a database-specific SQL feature that JPQL does not support. What would you do?",
          answer:
            "I would consider a native SQL query using @Query with nativeQuery = true, while documenting the database-specific dependency and testing it against the target database."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "@Query defines an explicit repository query.",
        "JPQL is an entity-oriented query language defined by JPA.",
        "JPQL uses entity names and entity properties.",
        "Named parameters use :parameterName.",
        "@Param binds method parameters to named JPQL parameters.",
        "Positional parameters use ?1, ?2, and so on.",
        "@Modifying is used for UPDATE and DELETE repository queries.",
        "Modifying queries need an appropriate transaction.",
        "Bulk updates can leave managed entities stale.",
        "JPQL supports WHERE, ORDER BY, JOIN, GROUP BY, aggregate functions, LIKE, IN, and BETWEEN.",
        "JPQL can return entities, selected fields, DTOs, or projections.",
        "Pageable can be combined with @Query.",
        "Page queries may require count-query processing.",
        "nativeQuery = true enables native SQL.",
        "Prefer derived queries for simple queries and @Query for complex or explicit queries."
      ],

      code: {
        language: "text",
        code: `@Query("""
       SELECT e
       FROM Employee e
       WHERE e.department = :department
       """)
List<Employee> findByDepartment(
    @Param("department")
    String department
);


@Modifying
@Query("""
       UPDATE Employee e
       SET e.department = :department
       WHERE e.id = :id
       """)
int updateDepartment(
    @Param("id") Long id,
    @Param("department") String department
);`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "JPQL is not SQL.",
        "JPQL queries the entity model, while SQL queries database structures.",
        "Use entity names in JPQL FROM clauses.",
        "Use entity properties in WHERE and ORDER BY expressions.",
        "Use @Param with named parameters for clear parameter binding.",
        "Use @Modifying for repository UPDATE and DELETE queries.",
        "Use transactions for modifying operations.",
        "Bulk modifying queries can bypass normal entity-state synchronization behavior.",
        "Use Page and Pageable when explicit JPQL needs pagination.",
        "Use Slice when total-result metadata is unnecessary.",
        "Use DTOs or projections when the API needs only selected fields.",
        "Use native SQL only when its database-level capabilities are actually needed.",
        "For interviews, remember the core distinction: @Query defines the explicit repository query, JPQL works with entities, and Hibernate/JPA converts JPQL into SQL."
      ]
    }
  ]
};
