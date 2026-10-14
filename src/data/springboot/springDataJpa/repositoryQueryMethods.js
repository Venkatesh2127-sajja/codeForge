
export const repositoryQueryMethods = {
  id: 806,

  title: "Repository Query Methods",

  slug: "repository-query-methods",

  topicTitle: "Spring Data JPA",

  description:
    "Learn how Spring Data JPA derives database queries from repository method names using property names, operators, conditions, sorting, limiting, and nested properties.",

  estimatedTime: "50 min",

  sections: [
    {
      id: "query-methods",

      title: "What are Query Methods?",

      paragraphs: [
        "Spring Data JPA can derive queries from repository method names. Instead of writing the query manually, developers can follow Spring Data's method naming conventions.",
        "The method name is parsed by Spring Data and converted into a query based on the entity properties and supported query keywords.",
        "This feature is commonly called query derivation or derived query methods."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartment(
        String department
);`
      },

      bullets: [
        "find is the query operation.",
        "By separates the operation from the query condition.",
        "Department identifies the entity property.",
        "The method parameter provides the value used for the condition."
      ]
    },

    {
      id: "query-derivation-flow",

      title: "How Query Derivation Works",

      paragraphs: [
        "Spring Data examines the repository method name when the repository is created. It identifies the query subject, property names, operators, and sorting instructions and creates the appropriate query behavior."
      ],

      code: {
        language: "text",
        code: `Repository Method
        |
        v
findByDepartmentAndName
        |
        v
Spring Data parses method name
        |
        +-- find
        +-- Department
        +-- And
        +-- Name
        |
        v
Derived query
        |
        v
JPA / Hibernate
        |
        v
SQL
        |
        v
Database`
      }
    },

    {
      id: "find-by-email",

      title: "findByEmail",

      code: {
        language: "java",
        code: `Optional<Employee> findByEmail(
        String email
);`
      },

      paragraphs: [
        "Spring Data interprets findByEmail as a query based on the email property.",
        "The return type Optional<Employee> is useful when the application expects zero or one matching employee."
      ]
    },

    {
      id: "find-vs-read",

      title: "find, read, get, and query Prefixes",

      paragraphs: [
        "Spring Data supports several query-method subject keywords. Common read-oriented forms include find, read, get, query, search, and stream depending on the repository operation and supported return type.",
        "The important part is the By clause and everything that follows it, because that portion describes the filtering conditions."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartment(
    String department
);

List<Employee> readByDepartment(
    String department
);

List<Employee> getByDepartment(
    String department
);`
      }
    },

    {
      id: "multiple-fields",

      title: "Multiple Conditions",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentAndName(
        String department,
        String name
);`
      },

      paragraphs: [
        "And can be used to combine multiple property conditions.",
        "Both conditions must match for an employee to be included in the result."
      ],

      code: {
        language: "text",
        code: `findByDepartmentAndName

department = ?
AND
name = ?`
      }
    },

    {
      id: "and-flow",

      title: "Understanding And",

      paragraphs: [
        "When And appears between two property expressions, Spring Data treats the expressions as a logical AND condition."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentAndAgeGreaterThan(
        String department,
        Integer age
);`
      },

      bullets: [
        "Employee department must match the supplied department.",
        "Employee age must be greater than the supplied age.",
        "Both conditions must be satisfied."
      ]
    },

    {
      id: "or",

      title: "Using Or",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentOrName(
        String department,
        String name
);`
      },

      paragraphs: [
        "Or can be used when either of the specified conditions should match.",
        "The result contains employees whose department matches the supplied department or whose name matches the supplied name."
      ]
    },

    {
      id: "and-or",

      title: "Combining And and Or",

      paragraphs: [
        "Spring Data supports combining query keywords such as And and Or. However, complex combinations can become difficult to read because the final derived-query method name becomes long.",
        "When the logical expression becomes difficult to understand, an explicit @Query or another query mechanism may be clearer."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentAndActiveOrName(
        String department,
        boolean active,
        String name
);`
      }
    },

    {
      id: "contains",

      title: "Using Contains",

      code: {
        language: "java",
        code: `List<Employee> findByNameContaining(
        String keyword
);`
      },

      paragraphs: [
        "Contains can be used for string matching where the property contains the supplied value.",
        "For example, searching with ven can match a name containing that sequence."
      ]
    },

    {
      id: "starts-with",

      title: "StartsWith and EndsWith",

      code: {
        language: "java",
        code: `List<Employee> findByNameStartingWith(
        String prefix
);

List<Employee> findByEmailEndingWith(
        String suffix
);`
      },

      paragraphs: [
        "StartingWith searches for values beginning with the supplied text.",
        "EndingWith searches for values ending with the supplied text."
      ]
    },

    {
      id: "contains-case",

      title: "IgnoreCase",

      paragraphs: [
        "IgnoreCase can be used when a derived string comparison should ignore case, subject to the capabilities and behavior of the underlying database."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByNameIgnoreCase(
        String name
);`
      }
    },

    {
      id: "greater-than",

      title: "Comparison Keywords",

      code: {
        language: "java",
        code: `List<Employee> findBySalaryGreaterThan(
        BigDecimal salary
);

List<Employee> findByAgeLessThan(
        Integer age
);`
      },

      paragraphs: [
        "Spring Data provides comparison keywords such as GreaterThan and LessThan for numeric, date, and other comparable properties."
      ]
    },

    {
      id: "comparison-keywords",

      title: "Common Comparison Keywords",

      code: {
        language: "text",
        code: `GreaterThan
GreaterThanEqual

LessThan
LessThanEqual

Between

After
Before

Equals
Is
IsNot`
      },

      paragraphs: [
        "The exact usefulness of a comparison keyword depends on the property's type. For example, After and Before are commonly useful with date and time properties."
      ]
    },

    {
      id: "greater-equal",

      title: "GreaterThanEqual and LessThanEqual",

      code: {
        language: "java",
        code: `List<Employee> findBySalaryGreaterThanEqual(
        BigDecimal salary
);

List<Employee> findByAgeLessThanEqual(
        Integer age
);`
      },

      paragraphs: [
        "GreaterThanEqual includes the boundary value, while LessThanEqual also includes the boundary value."
      ]
    },

    {
      id: "between",

      title: "Between",

      paragraphs: [
        "Between is useful when a value must fall within a specified range."
      ],

      code: {
        language: "java",
        code: `List<Employee> findBySalaryBetween(
        BigDecimal minimum,
        BigDecimal maximum
);`
      }
    },

    {
      id: "in",

      title: "Using In",

      paragraphs: [
        "In is useful when a property should match one value from a collection."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentIn(
        Collection<String> departments
);`
      },

      code: {
        language: "text",
        code: `departments = ["IT", "HR", "Finance"]

Conceptually:

WHERE department IN (
    'IT',
    'HR',
    'Finance'
)`
      }
    },

    {
      id: "not-in",

      title: "Using NotIn",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentNotIn(
        Collection<String> departments
);`
      },

      paragraphs: [
        "NotIn finds records whose property does not match any of the supplied values."
      ]
    },

    {
      id: "null-check",

      title: "Checking NULL Values",

      paragraphs: [
        "Spring Data supports IsNull and IsNotNull for checking whether a property contains a null value."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByManagerIsNull();

List<Employee> findByEmailIsNotNull();`
      }
    },

    {
      id: "boolean",

      title: "Boolean Properties",

      paragraphs: [
        "Boolean properties can be queried using keywords such as True and False."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByActiveTrue();

List<Employee> findByActiveFalse();`
      }
    },

    {
      id: "order-by",

      title: "OrderBy",

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentOrderByNameAsc(
        String department
);`
      },

      paragraphs: [
        "OrderBy allows sorting to be expressed as part of a derived query method name.",
        "The example first filters employees by department and then sorts the matching employees by name in ascending order."
      ]
    },

    {
      id: "multiple-order-by",

      title: "Sorting by Multiple Properties",

      code: {
        language: "java",
        code: `List<Employee>
findByDepartmentOrderBySalaryDescNameAsc(
        String department
);`
      },

      paragraphs: [
        "Multiple properties can be included after OrderBy. In this example, salary has the first sorting priority and name is used to break ties."
      ]
    },

    {
      id: "distinct",

      title: "Using Distinct",

      paragraphs: [
        "Distinct can be used when the derived query should return distinct results."
      ],

      code: {
        language: "java",
        code: `List<Employee> findDistinctByDepartment(
        String department
);`
      }
    },

    {
      id: "count",

      title: "Counting Results",

      paragraphs: [
        "Derived query methods can also return counts when the repository method uses an appropriate count subject."
      ],

      code: {
        language: "java",
        code: `long countByDepartment(
        String department
);`
      },

      paragraphs: [
        "This returns the number of employees belonging to the specified department."
      ]
    },

    {
      id: "exists",

      title: "Checking Whether a Record Exists",

      code: {
        language: "java",
        code: `boolean existsByEmail(
        String email
);`
      },

      paragraphs: [
        "existsBy is useful when the application only needs to know whether a matching record exists rather than retrieving the complete entity."
      ]
    },

    {
      id: "delete",

      title: "Derived Delete Methods",

      paragraphs: [
        "Spring Data also supports derived delete methods. These methods should be used carefully because they modify database state."
      ],

      code: {
        language: "java",
        code: `long deleteByDepartment(
        String department
);`
      },

      bullets: [
        "Delete methods modify data.",
        "Use an appropriate transaction boundary.",
        "Consider entity lifecycle and persistence-context behavior.",
        "For large bulk operations, evaluate the generated operation and its performance."
      ]
    },

    {
      id: "limit",

      title: "Limiting Results",

      paragraphs: [
        "First and Top can be used to limit the number of returned results."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> findFirstByOrderBySalaryDesc();

List<Employee> findTop5ByOrderBySalaryDesc();`
      },

      paragraphs: [
        "The first method can be used to retrieve the highest-paid employee, while the second retrieves the top five employees by salary."
      ]
    },

    {
      id: "top-vs-first",

      title: "Top and First",

      paragraphs: [
        "Top and First are commonly used as result-limiting keywords in derived queries. They can be combined with a number, such as Top5, and with ordering."
      ],

      code: {
        language: "java",
        code: `List<Employee> findTop10ByDepartmentOrderBySalaryDesc(
        String department
);`
      }
    },

    {
      id: "nested-properties",

      title: "Querying Nested Properties",

      paragraphs: [
        "Derived queries can navigate nested properties when entity relationships or embedded properties are mapped appropriately.",
        "For example, if Employee has a Department relationship and Department has a name property, a method can query using the nested property."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartmentName(
        String departmentName
);`
      },

      paragraphs: [
        "Here Spring Data interprets DepartmentName as navigation from the Employee property department to its name property."
      ]
    },

    {
      id: "nested-underscore",

      title: "Using Underscore for Property Traversal",

      paragraphs: [
        "An underscore can be used to make nested property traversal explicit when necessary, especially when property names could otherwise be ambiguous."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByDepartment_Name(
        String departmentName
);`
      },

      paragraphs: [
        "The underscore visually separates the department property from its nested name property."
      ]
    },

    {
      id: "date-query",

      title: "Querying Date and Time Properties",

      paragraphs: [
        "Derived query methods can use date-related comparison keywords such as Before and After."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByJoiningDateAfter(
        LocalDate date
);

List<Employee> findByJoiningDateBefore(
        LocalDate date
);`
      }
    },

    {
      id: "collection-property",

      title: "Collection Relationships",

      paragraphs: [
        "Derived queries can navigate relationships, but collection relationships can make method names difficult to understand. For complex relationship queries, JPQL or another explicit query mechanism may be more appropriate."
      ],

      code: {
        language: "java",
        code: `List<Employee> findByProjectsName(
        String projectName
);`
      },

      paragraphs: [
        "The exact query generated depends on the entity relationship mappings and property names."
      ]
    },

    {
      id: "return-types",

      title: "Common Return Types",

      paragraphs: [
        "The repository method return type should match the expected cardinality and purpose of the query."
      ],

      code: {
        language: "java",
        code: `Employee findByEmployeeCode(
        String employeeCode
);

Optional<Employee> findByEmail(
        String email
);

List<Employee> findByDepartment(
        String department
);

Page<Employee> findByDepartment(
        String department,
        Pageable pageable
);

long countByDepartment(
        String department
);

boolean existsByEmail(
        String email
);`
      },

      bullets: [
        "Optional is useful when zero or one result is expected.",
        "List is useful when multiple results are expected.",
        "Page is useful when pagination metadata is required.",
        "Count types are useful when only the number of matches is required.",
        "boolean is useful for existence checks."
      ]
    },

    {
      id: "optional-result",

      title: "Why Optional is Useful",

      paragraphs: [
        "When a query is expected to return at most one result, Optional can explicitly represent the possibility that no record exists.",
        "The repository method should only use a single-result return type when the query is expected to be unique."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> employee =
    employeeRepository.findByEmail(
        "arun@example.com"
    );

employee.ifPresent(
    value -> System.out.println(value.getName())
);`
      }
    },

    {
      id: "unique-result",

      title: "Single Result and Uniqueness",

      paragraphs: [
        "If a repository method returns a single entity or Optional but multiple database rows match, the query can fail because the result is not unique.",
        "Therefore, methods such as findByEmail should normally be backed by a unique business rule or database constraint when email is expected to identify one employee."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> findByEmail(
    String email
);`
      }
    },

    {
      id: "pagination",

      title: "Derived Query with Pagination",

      paragraphs: [
        "Derived query methods can accept Pageable to combine filtering with pagination."
      ],

      code: {
        language: "java",
        code: `Page<Employee> findByDepartment(
        String department,
        Pageable pageable
);`
      },

      paragraphs: [
        "Spring Data derives the department filter and applies the Pageable information for pagination and optional sorting."
      ]
    },

    {
      id: "sorting-with-pageable",

      title: "Sorting with Pageable",

      paragraphs: [
        "Instead of placing sorting directly in the method name, Pageable can be used when sorting needs to be supplied dynamically."
      ],

      code: {
        language: "java",
        code: `Pageable pageable =
    PageRequest.of(
        0,
        20,
        Sort.by("name").ascending()
    );

Page<Employee> employees =
    employeeRepository.findByDepartment(
        "IT",
        pageable
    );`
      }
    },

    {
      id: "query-keywords",

      title: "Important Derived Query Keywords",

      code: {
        language: "text",
        code: `Equality
findByName
findByNameIs
findByNameEquals

Logical
findByNameAndDepartment
findByNameOrDepartment

String matching
findByNameContaining
findByNameStartingWith
findByNameEndingWith
findByNameIgnoreCase

Comparison
findBySalaryGreaterThan
findBySalaryGreaterThanEqual
findBySalaryLessThan
findBySalaryLessThanEqual
findBySalaryBetween

Collection
findByDepartmentIn
findByDepartmentNotIn

Null
findByManagerIsNull
findByManagerIsNotNull

Boolean
findByActiveTrue
findByActiveFalse

Sorting
findByDepartmentOrderByNameAsc
findByDepartmentOrderBySalaryDesc

Limiting
findFirstByOrderBySalaryDesc
findTop5ByOrderBySalaryDesc

Other
countByDepartment
existsByEmail
deleteByDepartment
distinct`
      }
    },

    {
      id: "common-patterns",

      title: "Common Query Method Patterns",

      code: {
        language: "text",
        code: `findByName(...)
findByEmail(...)
findByDepartment(...)

findByDepartmentAndName(...)
findByDepartmentOrName(...)

findByNameContaining(...)
findByNameStartingWith(...)
findByNameEndingWith(...)

findBySalaryGreaterThan(...)
findBySalaryLessThan(...)
findBySalaryBetween(...)

findByDepartmentIn(...)
findByManagerIsNull(...)

findByActiveTrue(...)
findByActiveFalse(...)

findByDepartmentOrderByNameAsc(...)

findTop5ByOrderBySalaryDesc(...)
findFirstByOrderBySalaryDesc(...)

countByDepartment(...)
existsByEmail(...)
deleteByDepartment(...)`
      }
    },

    {
      id: "method-name-anatomy",

      title: "Anatomy of a Derived Query Method",

      code: {
        language: "text",
        code: `findByDepartmentAndSalaryGreaterThanOrderByNameAsc

 |       |             |                    |
 |       |             |                    +-- Sorting
 |       |             +-- Comparison
 |       +-- Property
 +-- Query operation

Conceptually:

WHERE department = ?
AND salary > ?
ORDER BY name ASC`
      }
    },

    {
      id: "long-method-warning",

      title: "When a Method Name Becomes Too Long",

      paragraphs: [
        "Derived queries are convenient, but extremely long method names can reduce readability and make maintenance difficult.",
        "If a method contains many conditions, joins, aggregations, projections, or complex logic, consider using @Query, Specifications, Query by Example, or another suitable query mechanism."
      ],

      code: {
        language: "java",
        code: `// Difficult to maintain

findByDepartmentAndNameContainingAndSalaryGreaterThanAndAgeLessThanAndActiveTrueOrderByNameAsc(
    String department,
    String name,
    BigDecimal salary,
    Integer age
);`
      }
    },

    {
      id: "derived-vs-query",

      title: "Derived Query vs @Query",

      code: {
        language: "text",
        code: `Simple query
     |
     v
Derived Query Method

Complex explicit query
     |
     v
@Query

Very dynamic filtering
     |
     v
Specification / Criteria / Query DSL`
      },

      paragraphs: [
        "The goal is not to avoid @Query completely. The goal is to choose the query mechanism that produces the clearest and most maintainable repository code."
      ]
    },

    {
      id: "when-to-use",

      title: "When Should You Use Query Methods?",

      paragraphs: [
        "Derived query methods are useful for simple and readable queries. When a query becomes complicated or requires joins, aggregations, projections, or more advanced logic, an explicit query may be easier to understand."
      ],

      bullets: [
        "Use derived methods for simple equality checks.",
        "Use derived methods for common comparisons.",
        "Use derived methods for simple string searches.",
        "Use derived methods for straightforward sorting.",
        "Use @Query when the method name becomes difficult to read.",
        "Use explicit query mechanisms for complex joins and aggregations.",
        "Use specifications or other dynamic query mechanisms when filtering rules are highly dynamic."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Using a property name that does not exist in the entity.",
        "Using database column names instead of entity property names.",
        "Returning Optional or a single entity when multiple records can match.",
        "Creating extremely long repository method names.",
        "Forgetting that page numbers are zero-based when Pageable is used.",
        "Using OrderBy incorrectly when multiple sort fields are required.",
        "Using Contains when a different search behavior is required.",
        "Assuming IgnoreCase has identical behavior across every database and collation.",
        "Ignoring database indexes for frequently searched columns.",
        "Using a derived delete method without considering its transaction and data-modification behavior.",
        "Assuming every complex query should be expressed as a method name.",
        "Using nested property traversal without understanding the entity relationship.",
        "Returning a full entity when only a small projection is required."
      ]
    },

    {
      id: "performance",

      title: "Query Method Performance Considerations",

      paragraphs: [
        "A derived query method does not automatically mean the query will be fast. Spring Data generates the query, but database performance still depends on indexes, joins, filtering conditions, result size, sorting, and the database execution plan.",
        "Frequently searched properties such as email, employee code, department, or status may need appropriate database indexes depending on the application's workload."
      ],

      code: {
        language: "text",
        code: `Application
    |
    v
Derived Query
    |
    v
Generated SQL
    |
    +-- WHERE conditions
    +-- JOINs
    +-- ORDER BY
    |
    v
Database
    |
    +-- Indexes
    +-- Execution plan
    +-- Data volume
    |
    v
Query performance`
      }
    },

    {
      id: "testing",

      title: "Testing Derived Query Methods",

      paragraphs: [
        "Important derived queries should be tested against realistic entity data, especially when they involve multiple conditions, relationships, sorting, or date ranges.",
        "A repository-focused test can verify that the derived method returns the expected records."
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

        assertFalse(employees.isEmpty());

        assertTrue(
            employees.stream()
                .allMatch(
                    employee ->
                        "IT".equals(
                            employee.getDepartment()
                        )
                )
        );
    }
}`
      }
    },

    {
      id: "complete-repository",

      title: "Complete Repository Example",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(
        String email
    );

    List<Employee> findByDepartment(
        String department
    );

    List<Employee> findByDepartmentAndName(
        String department,
        String name
    );

    List<Employee> findByNameContainingIgnoreCase(
        String keyword
    );

    List<Employee> findBySalaryGreaterThan(
        BigDecimal salary
    );

    List<Employee> findBySalaryBetween(
        BigDecimal minimum,
        BigDecimal maximum
    );

    List<Employee> findByDepartmentOrderByNameAsc(
        String department
    );

    List<Employee> findTop5ByOrderBySalaryDesc();

    boolean existsByEmail(
        String email
    );

    long countByDepartment(
        String department
    );

    Page<Employee> findByDepartment(
        String department,
        Pageable pageable
    );
}`
      }
    },

    {
      id: "request-flow",

      title: "Complete Request Flow",

      code: {
        language: "text",
        code: `React / Client
      |
      | GET /api/employees?department=IT
      v
Controller
      |
      v
Service
      |
      v
EmployeeRepository
      |
      | findByDepartment("IT")
      v
Spring Data JPA
      |
      | derives query
      v
Hibernate
      |
      | generates SQL
      v
MySQL
      |
      | matching rows
      v
Hibernate
      |
      | Employee objects
      v
Service
      |
      v
Controller
      |
      | JSON response
      v
Client`
      }
    },

    {
      id: "best-practices",

      title: "Repository Query Method Best Practices",

      bullets: [
        "Use meaningful entity property names.",
        "Keep derived method names readable.",
        "Use Optional when zero or one result is expected.",
        "Use List when multiple results are expected.",
        "Use Page when pagination metadata is needed.",
        "Use Pageable when sorting or pagination needs to be dynamic.",
        "Use explicit @Query when a derived method becomes too complex.",
        "Use DTOs or projections when returning only selected fields.",
        "Add database indexes based on actual query patterns.",
        "Test important repository methods.",
        "Be careful with derived delete and modifying methods.",
        "Do not expose repository methods directly as an API contract.",
        "Keep HTTP/API concerns in controllers and persistence concerns in repositories."
      ]
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What are Spring Data derived query methods?",
          answer:
            "They are repository methods whose names describe the query conditions, allowing Spring Data JPA to derive the query automatically."
        },

        {
          question: "What does findByDepartmentAndName mean?",
          answer:
            "It represents a query where both the department and name properties must satisfy the supplied values."
        },

        {
          question: "How does Spring Data know what query to execute?",
          answer:
            "Spring Data parses the repository method name, identifies supported keywords and entity properties, and derives the corresponding query."
        },

        {
          question: "What does findByEmail mean?",
          answer:
            "It means Spring Data should find an Employee using the email property as the query condition."
        },

        {
          question: "What does And mean in a derived query?",
          answer:
            "And combines multiple conditions so that all specified conditions must match."
        },

        {
          question: "What does Or mean in a derived query?",
          answer:
            "Or combines conditions so that a record can match either of the specified conditions."
        },

        {
          question: "What is Containing?",
          answer:
            "Containing creates a string-matching condition where the property contains the supplied value."
        },

        {
          question: "What is the difference between Containing, StartingWith, and EndingWith?",
          answer:
            "Containing searches for the value anywhere in the string, StartingWith searches from the beginning, and EndingWith searches from the end."
        },

        {
          question: "What is IgnoreCase?",
          answer:
            "IgnoreCase indicates that a supported string comparison should ignore letter case."
        },

        {
          question: "What is GreaterThan?",
          answer:
            "GreaterThan creates a condition where the entity property must be greater than the supplied value."
        },

        {
          question: "What is Between?",
          answer:
            "Between creates a range condition using two supplied boundary values."
        },

        {
          question: "How do you query using a collection of values?",
          answer:
            "Use the In keyword, such as findByDepartmentIn(Collection<String> departments)."
        },

        {
          question: "How do you check for null using a derived query?",
          answer:
            "Use IsNull or IsNotNull, such as findByManagerIsNull()."
        },

        {
          question: "How do you query boolean properties?",
          answer:
            "Keywords such as True and False can be used, for example findByActiveTrue()."
        },

        {
          question: "How do you sort a derived query?",
          answer:
            "Use OrderBy followed by the property and direction, such as findByDepartmentOrderByNameAsc()."
        },

        {
          question: "Can you sort by multiple properties?",
          answer:
            "Yes. Multiple properties and directions can be included after OrderBy, such as OrderBySalaryDescNameAsc."
        },

        {
          question: "What are Top and First used for?",
          answer:
            "They can limit the number of results returned by a derived query, for example findTop5ByOrderBySalaryDesc()."
        },

        {
          question: "How do you count records using a derived query?",
          answer:
            "Use a count method such as countByDepartment(String department)."
        },

        {
          question: "How do you check whether a record exists?",
          answer:
            "Use an exists method such as existsByEmail(String email)."
        },

        {
          question: "Can derived query methods support pagination?",
          answer:
            "Yes. A derived query can accept Pageable and return Page or another supported paginated result type."
        },

        {
          question: "What is the difference between a derived query and @Query?",
          answer:
            "A derived query gets its query definition from the repository method name, while @Query lets the developer explicitly define the query."
        },

        {
          question: "When should you use @Query instead of a derived query?",
          answer:
            "Use @Query when the derived method name becomes too long or when the query requires explicit joins, aggregations, projections, or other logic that is clearer as an explicit query."
        },

        {
          question: "Can derived queries navigate relationships?",
          answer:
            "Yes. Spring Data can derive queries using nested properties when the entity relationships and property paths are valid."
        },

        {
          question: "Does using a derived query guarantee good performance?",
          answer:
            "No. Database performance still depends on indexes, joins, filtering, sorting, data volume, and the database execution plan."
        },

        {
          question: "What happens if a single-result query matches multiple records?",
          answer:
            "If the return type expects a single result but multiple records match, Spring Data can fail because the result is not unique. The query should match the intended cardinality."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "You need to find employees whose salary is greater than 50,000. How would you write the repository method?",
          answer:
            "I would use List<Employee> findBySalaryGreaterThan(BigDecimal salary). Spring Data derives the comparison query from the method name."
        },

        {
          question: "You need employees from IT whose names contain 'ven'. What derived method would you use?",
          answer:
            "I could use findByDepartmentAndNameContaining(String department, String keyword). The And keyword combines the department condition with the name search."
        },

        {
          question: "The interviewer asks for the five highest-paid employees. How would you implement it?",
          answer:
            "I would use a limiting and sorting method such as findTop5ByOrderBySalaryDesc()."
        },

        {
          question: "You need to find employees whose department is either IT or HR. What would you use?",
          answer:
            "For a collection of allowed departments, I would use findByDepartmentIn(Collection<String> departments). This is more scalable than creating a long chain of OR conditions."
        },

        {
          question: "Your repository method name has become 150 characters long. What would you do?",
          answer:
            "I would reconsider using a derived query. If the conditions are complex, I would use @Query or another appropriate dynamic-query mechanism to improve readability and maintainability."
        },

        {
          question: "The application needs dynamic sorting from the frontend. Would you put every possible sort field into the method name?",
          answer:
            "No. I would usually use Pageable or Sort and validate the requested sort properties against an allowed list."
        },

        {
          question: "An email lookup returns multiple employees even though the repository method returns Optional<Employee>. What should you investigate?",
          answer:
            "I would check whether email is actually unique in the database and whether the application has the appropriate unique constraint. A single-result repository method should match the expected data cardinality."
        },

        {
          question: "A derived query works but is very slow. What would you check?",
          answer:
            "I would inspect the generated SQL, execution plan, indexes, filtering and sorting columns, joins, and data volume. The fact that Spring Data derived the query does not guarantee that the database execution will be efficient."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Derived query methods allow Spring Data JPA to generate queries from method names.",
        "findBy is the common starting pattern for simple read queries.",
        "And combines conditions.",
        "Or allows alternative conditions.",
        "Containing performs a contains-style string search.",
        "StartingWith and EndingWith perform prefix and suffix searches.",
        "IgnoreCase supports case-insensitive string matching.",
        "GreaterThan and LessThan perform comparisons.",
        "Between performs range queries.",
        "In checks membership in a collection of values.",
        "IsNull and IsNotNull check null values.",
        "True and False can query boolean properties.",
        "OrderBy adds sorting to a derived method.",
        "Top and First can limit results.",
        "countBy returns a count.",
        "existsBy checks whether a matching record exists.",
        "Pageable can add pagination and dynamic sorting.",
        "Nested properties can be queried through valid entity property paths.",
        "Use @Query when derived method names become too complex."
      ],

      code: {
        language: "text",
        code: `Common Patterns

findByName(...)
findByEmail(...)
findByDepartment(...)

findByDepartmentAndName(...)
findByDepartmentOrName(...)

findByNameContaining(...)
findByNameStartingWith(...)
findByNameEndingWith(...)
findByNameIgnoreCase(...)

findBySalaryGreaterThan(...)
findBySalaryLessThan(...)
findBySalaryBetween(...)

findByDepartmentIn(...)
findByManagerIsNull(...)

findByActiveTrue(...)

findByDepartmentOrderByNameAsc(...)

findTop5ByOrderBySalaryDesc(...)

countByDepartment(...)
existsByEmail(...)`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "Spring Data derives repository queries from supported method-name keywords.",
        "Property names in derived queries refer to entity properties, not necessarily database column names.",
        "The method return type should match the expected number of results.",
        "Optional is useful when zero or one result is expected.",
        "Use List when multiple results are expected.",
        "Use Page when pagination metadata is needed.",
        "Use Pageable for dynamic pagination and sorting.",
        "Use OrderBy when sorting is fixed as part of the method definition.",
        "Use In for collection-based filtering.",
        "Use IsNull and IsNotNull for null checks.",
        "Use Top or First when only a limited number of results is required.",
        "Very long derived query names are a maintainability warning.",
        "Use @Query when explicit query logic is clearer.",
        "Use another dynamic query mechanism when filtering rules change significantly at runtime.",
        "For interviews, remember the main idea: Spring Data reads the repository method name, identifies properties and keywords, derives the query, and lets the JPA provider execute it against the database."
      ]
    }
  ]
};
