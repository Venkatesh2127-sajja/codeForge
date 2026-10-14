
export const idAndPrimaryKeys = {
  id: 804,

  title: "@Id and Primary Keys",

  slug: "id-and-primary-keys",

  topicTitle: "Spring Data JPA",

  description:
    "Understand primary keys in JPA and learn how @Id, @GeneratedValue, identifier generation strategies, and composite keys are used to identify entities uniquely.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "primary-key",

      title: "What is a Primary Key?",

      paragraphs: [
        "A primary key uniquely identifies a row in a database table. Every persistent JPA entity must have an identifier that allows the persistence provider to distinguish one entity instance from another.",
        "For example, if the employees table contains 10,000 employees, the primary key allows the database to uniquely identify each employee record.",
        "In JPA, the entity identifier is represented using the @Id annotation or, for composite identifiers, an appropriate composite-key mapping."
      ],

      bullets: [
        "A primary key uniquely identifies a database row.",
        "A primary key should uniquely identify an entity.",
        "Primary-key values should not normally be duplicated.",
        "The identifier is used by JPA to track entity identity.",
        "Repositories such as JpaRepository use the identifier type for methods such as findById()."
      ]
    },

    {
      id: "primary-key-properties",

      title: "Properties of a Good Primary Key",

      paragraphs: [
        "A primary key should provide stable identity for a record. In application design, generated numeric identifiers are commonly used because they are simple and efficient.",
        "The exact identifier strategy depends on the database, application requirements, scalability needs, and whether the identifier needs to be meaningful to users."
      ],

      bullets: [
        "Unique: two rows should not have the same primary-key value.",
        "Stable: the identifier should normally not change during the entity's lifetime.",
        "Not null: a primary key identifies an existing row and therefore cannot be null in the database.",
        "Efficient: the identifier should work well with indexes and relationships.",
        "Predictable for the persistence model: JPA needs to determine entity identity reliably."
      ]
    },

    {
      id: "id",

      title: "@Id",

      paragraphs: [
        "The @Id annotation identifies the primary-key field or property of a JPA entity.",
        "JPA uses the identifier to distinguish one entity instance from another and to determine which database row an entity represents."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private Long id;

    private String name;
}`
      }
    },

    {
      id: "id-types",

      title: "Common Identifier Types",

      paragraphs: [
        "JPA supports several Java types for entity identifiers. Numeric types such as Long are common for database-generated identifiers.",
        "String or UUID-based identifiers can also be used when the application requires globally unique identifiers or wants to avoid exposing sequential numeric IDs."
      ],

      code: {
        language: "java",
        code: `// Numeric identifier
@Id
private Long id;

// UUID identifier
@Id
private UUID id;

// String identifier
@Id
private String id;`
      },

      bullets: [
        "Long is commonly used with database-generated numeric IDs.",
        "Integer can be used for smaller identifier ranges.",
        "UUID is useful when globally unique identifiers are desirable.",
        "String identifiers are possible but should be chosen for a clear design reason."
      ]
    },

    {
      id: "generated",

      title: "@GeneratedValue",

      paragraphs: [
        "@GeneratedValue can be used when the database or persistence provider should generate identifier values.",
        "Instead of manually assigning the ID for every new entity, the application delegates identifier generation to the configured strategy."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(
    strategy = GenerationType.IDENTITY
)
private Long id;`
      }
    },

    {
      id: "generation-types",

      title: "GenerationType Strategies",

      paragraphs: [
        "JPA defines several identifier generation strategies. The appropriate strategy depends on the database and the application's requirements.",
        "The commonly discussed strategies are AUTO, IDENTITY, SEQUENCE, and TABLE."
      ],

      bullets: [
        "AUTO: lets the persistence provider choose an appropriate strategy.",
        "IDENTITY: relies on database identity or auto-increment style generation.",
        "SEQUENCE: uses a database sequence where supported.",
        "TABLE: uses a database table as a source for identifier values."
      ],

      code: {
        language: "text",
        code: `GenerationType.AUTO
        |
        | Provider chooses
        v
Appropriate generation strategy


GenerationType.IDENTITY
        |
        v
Database identity / auto-increment


GenerationType.SEQUENCE
        |
        v
Database sequence


GenerationType.TABLE
        |
        v
Identifier table`
      }
    },

    {
      id: "identity",

      title: "IDENTITY Strategy",

      paragraphs: [
        "GenerationType.IDENTITY is commonly used with databases that generate numeric identifiers using an identity or auto-increment mechanism.",
        "For example, a MySQL table can use AUTO_INCREMENT for the primary-key column, while the JPA entity uses GenerationType.IDENTITY."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;`
      }
    },

    {
      id: "identity-database",

      title: "IDENTITY and Database Auto-Increment",

      paragraphs: [
        "With an identity-based strategy, the database generates the identifier when the row is inserted. The generated value is then made available to the entity through the persistence provider.",
        "This means the application normally creates the entity without manually assigning the generated ID."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150)
);`
      }
    },

    {
      id: "sequence",

      title: "SEQUENCE Strategy",

      paragraphs: [
        "GenerationType.SEQUENCE uses a database sequence to generate identifier values. Sequence-based generation is especially common with databases such as PostgreSQL and Oracle.",
        "A sequence can provide identifier values before the INSERT is executed, allowing the persistence provider to obtain identifiers from the sequence."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
private Long id;`
      }
    },

    {
      id: "sequence-generator",

      title: "Using @SequenceGenerator",

      paragraphs: [
        "When sequence-based generation needs explicit configuration, @SequenceGenerator can define the sequence name and allocation behavior."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "employee_seq"
)
@SequenceGenerator(
    name = "employee_seq",
    sequenceName = "employee_sequence",
    allocationSize = 50
)
private Long id;`
      },

      paragraphs: [
        "The exact allocation strategy should be chosen according to the database and application's identifier-generation requirements."
      ]
    },

    {
      id: "auto",

      title: "AUTO Strategy",

      paragraphs: [
        "GenerationType.AUTO allows the persistence provider to select an appropriate identifier generation mechanism.",
        "This can make entity mappings more portable across databases, although the exact behavior is provider and database dependent."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;`
      }
    },

    {
      id: "table-strategy",

      title: "TABLE Strategy",

      paragraphs: [
        "GenerationType.TABLE uses a database table to maintain identifier values.",
        "It is a JPA-supported strategy, but it is less commonly selected in modern applications than identity, sequence, or other database-specific efficient strategies."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(strategy = GenerationType.TABLE)
private Long id;`
      }
    },

    {
      id: "strategy-comparison",

      title: "IDENTITY vs SEQUENCE vs AUTO",

      bullets: [
        "IDENTITY is convenient when the database provides auto-increment or identity columns.",
        "SEQUENCE is efficient and flexible on databases with native sequence support.",
        "AUTO allows the provider to select a suitable strategy.",
        "The best strategy depends on the target database and application requirements.",
        "Do not choose a strategy only because it works in one database if the application is intended to support multiple database systems."
      ],

      code: {
        language: "text",
        code: `MySQL
  |
  +-- Common choice --> IDENTITY
  |
  +-- AUTO can also be considered


PostgreSQL / Oracle
  |
  +-- SEQUENCE is commonly useful
  |
  +-- AUTO may select an appropriate strategy`
      }
    },

    {
      id: "complete",

      title: "Complete Entity Example",

      code: {
        language: "java",
        code: `import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}`
      }
    },

    {
      id: "why-id",

      title: "Why Does JPA Need an Identifier?",

      bullets: [
        "Identifies an entity uniquely.",
        "Allows JPA to track entity identity.",
        "Allows JPA to distinguish existing entities from new entities.",
        "Supports updates to existing records.",
        "Supports relationships between entities.",
        "Allows repository methods such as findById().",
        "Helps Hibernate maintain entity identity inside the persistence context."
      ]
    },

    {
      id: "entity-identity",

      title: "Entity Identity and Database Identity",

      paragraphs: [
        "JPA needs to know which database row an entity represents. The identifier provides this identity.",
        "For example, if Employee with ID 10 is loaded into the persistence context and its name is changed, Hibernate knows that the change belongs to the employee row whose primary key is 10."
      ],

      code: {
        language: "text",
        code: `Database

employees
--------------------------------
id    name
--------------------------------
10    Venkatesh
11    Ravi
12    Arun
--------------------------------

JPA loads:

Employee{id=10, name="Venkatesh"}

The ID tells JPA:
"This object represents row 10."`
      }
    },

    {
      id: "repository",

      title: "Using the Identifier with JpaRepository",

      code: {
        language: "java",
        code: `public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}`
      },

      paragraphs: [
        "The second generic parameter, Long, represents the type of the entity identifier.",
        "Because Employee uses Long as its @Id field, JpaRepository<Employee, Long> is the appropriate repository declaration."
      ]
    },

    {
      id: "repository-id-methods",

      title: "Repository Methods That Use the Identifier",

      paragraphs: [
        "Several Spring Data JPA repository methods depend directly on the entity identifier."
      ],

      code: {
        language: "java",
        code: `EmployeeRepository repository;

repository.findById(10L);

repository.existsById(10L);

repository.deleteById(10L);

repository.getReferenceById(10L);`
      },

      bullets: [
        "findById(id) searches using the entity identifier.",
        "existsById(id) checks whether an identifier exists.",
        "deleteById(id) requests deletion using the identifier.",
        "getReferenceById(id) obtains a reference to an entity by identifier and may defer database access until needed."
      ]
    },

    {
      id: "create-id-flow",

      title: "Generated ID During Create",

      paragraphs: [
        "When an entity uses a generated identifier, application code normally creates the object without assigning the ID.",
        "The persistence provider and database generate the identifier according to the configured strategy."
      ],

      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("Venkatesh");
employee.setEmail("venkat@example.com");

// ID is not manually assigned.
Employee saved = employeeRepository.save(employee);

System.out.println(saved.getId());`
      },

      output: `Example:

Before save:
id = null

After persistence:
id = 1

The exact generated value depends on the database state and generation strategy.`
    },

    {
      id: "generated-id-flow",

      title: "Generated Identifier Flow",

      code: {
        language: "text",
        code: `new Employee()
      |
      | id = null
      v
employeeRepository.save(employee)
      |
      v
Spring Data JPA
      |
      v
JPA Provider / Hibernate
      |
      v
Identifier Generation
      |
      v
INSERT into employees
      |
      v
Generated ID
      |
      v
Employee.id`
      }
    },

    {
      id: "manual-id",

      title: "Manually Assigned IDs",

      paragraphs: [
        "Not every application needs database-generated numeric IDs. An entity can use application-assigned identifiers when the business domain requires a stable external identifier.",
        "For example, an application might use a UUID generated by the application or another domain-specific identifier.",
        "When using manually assigned identifiers, the application becomes responsible for ensuring uniqueness and correctly communicating whether an entity is new or existing."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private UUID id;

    private String name;

    public Employee() {
    }

    public Employee(UUID id, String name) {
        this.id = id;
        this.name = name;
    }
}`
      }
    },

    {
      id: "uuid",

      title: "UUID as a Primary Key",

      paragraphs: [
        "UUID identifiers are useful when globally unique identifiers are desirable, especially in distributed systems where generating IDs independently on different application instances can be useful.",
        "UUIDs are larger than typical numeric identifiers, so their storage size, index characteristics, and database-specific support should be considered."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private UUID id;

    private String name;
}`
      }
    },

    {
      id: "composite-key",

      title: "Composite Primary Keys",

      paragraphs: [
        "A composite primary key uses multiple columns together to uniquely identify one database row.",
        "For example, an Enrollment table might use student_id and course_id together as its primary key.",
        "JPA supports composite identifiers using approaches such as @EmbeddedId and @IdClass."
      ],

      code: {
        language: "java",
        code: `@Embeddable
public class EnrollmentId implements Serializable {

    private Long studentId;

    private Long courseId;

    // constructors, getters, setters,
    // equals(), and hashCode()
}

@Entity
public class Enrollment {

    @EmbeddedId
    private EnrollmentId id;

    private String status;
}`
      }
    },

    {
      id: "id-class",

      title: "Composite Key with @IdClass",

      paragraphs: [
        "@IdClass is another JPA approach for composite identifiers. Multiple entity fields are marked with @Id, while a separate ID class represents the composite key."
      ],

      code: {
        language: "java",
        code: `@Entity
@IdClass(EmployeeProjectId.class)
public class EmployeeProject {

    @Id
    private Long employeeId;

    @Id
    private Long projectId;

    private String role;
}`
      }
    },

    {
      id: "embedded-id-vs-id-class",

      title: "@EmbeddedId vs @IdClass",

      bullets: [
        "@EmbeddedId represents the composite key as an embedded ID object.",
        "@IdClass keeps the individual ID fields directly on the entity.",
        "Both are standard JPA approaches for composite identifiers.",
        "Composite-key designs require careful equals() and hashCode() implementations.",
        "For new systems, a simple surrogate key can often be easier when the business domain does not require a composite primary key."
      ]
    },

    {
      id: "natural-vs-surrogate",

      title: "Natural Key vs Surrogate Key",

      paragraphs: [
        "A natural key is an identifier that has business meaning, such as an employee's government-issued number or a product's established business code.",
        "A surrogate key is an artificial identifier created specifically for database identity, such as a generated Long ID.",
        "Surrogate keys are commonly used because business attributes can change while the database identifier should remain stable."
      ],

      code: {
        language: "text",
        code: `Natural Key

employee_code = EMP-1001

The value has business meaning.


Surrogate Key

id = 101

The value exists primarily
to identify the database record.`
      }
    },

    {
      id: "primary-key-vs-unique",

      title: "Primary Key vs Unique Column",

      paragraphs: [
        "A primary key identifies the entity's primary database identity. A unique constraint prevents duplicate values in another column.",
        "For example, an Employee can have id as the primary key and email as a unique column."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(unique = true, nullable = false)
private String email;`
      }
    },

    {
      id: "id-changing",

      title: "Should a Primary Key Be Changed?",

      paragraphs: [
        "An entity identifier should normally be treated as stable identity. Changing a primary key can complicate relationships, references, caches, and persistence behavior.",
        "In most applications, generated IDs are assigned once and should not be changed during normal business updates."
      ],

      bullets: [
        "Do not use the primary key as an ordinary editable business field.",
        "Use another field when users need to change a business identifier.",
        "Keep foreign-key relationships consistent when identifiers are used by related entities.",
        "Treat entity identity as stable."
      ]
    },

    {
      id: "id-null-before-save",

      title: "Why Is a Generated ID Null Before Save?",

      paragraphs: [
        "When an entity uses database-generated identifiers, a newly created object normally has no identifier before it is persisted.",
        "After the persistence operation and identifier generation, the generated value becomes available according to the persistence provider and generation strategy."
      ],

      code: {
        language: "java",
        code: `Employee employee = new Employee();

System.out.println(employee.getId());
// null

employee.setName("Venkatesh");

Employee saved = employeeRepository.save(employee);

System.out.println(saved.getId());
// Generated identifier`
      }
    },

    {
      id: "flush-and-id",

      title: "Flush and Generated IDs",

      paragraphs: [
        "The exact timing at which a generated identifier becomes available depends on the generation strategy and persistence provider.",
        "Some database-generated strategies require an INSERT to obtain the generated key, while sequence-based strategies can obtain an identifier before the INSERT. This is one reason identifier-generation strategies can affect persistence behavior."
      ]
    },

    {
      id: "identifier-and-update",

      title: "How the ID Helps During Updates",

      paragraphs: [
        "When an existing entity is updated, the identifier tells JPA which database record represents that entity.",
        "For example, if Employee ID 10 is loaded and its salary changes, Hibernate can generate an UPDATE statement targeting the row with ID 10."
      ],

      code: {
        language: "sql",
        code: `UPDATE employees
SET salary = 65000
WHERE id = 10;`
      }
    },

    {
      id: "identifier-and-delete",

      title: "How the ID Helps During Delete",

      paragraphs: [
        "The identifier is also used to identify the record that should be deleted."
      ],

      code: {
        language: "java",
        code: `employeeRepository.deleteById(10L);`
      },

      output: `Conceptually:

DELETE FROM employees
WHERE id = 10;`
    },

    {
      id: "entity-identity-persistence-context",

      title: "Identifier and Persistence Context",

      paragraphs: [
        "Within a persistence context, entity identity is important because JPA tracks entity instances according to their identifiers.",
        "This allows the persistence provider to maintain a consistent representation of a database record during the lifetime of the persistence context."
      ],

      code: {
        language: "text",
        code: `Database row
     |
     | id = 10
     v
Employee entity
     |
     v
Persistence Context
     |
     +---- tracks Employee #10
     |
     v
Dirty Checking
     |
     v
UPDATE WHERE id = 10`
      }
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes",

      bullets: [
        "Forgetting to annotate the primary-key field with @Id.",
        "Using a generated ID but manually assigning values without understanding the generation strategy.",
        "Changing generated primary-key values during normal business updates.",
        "Assuming IDENTITY and SEQUENCE behave exactly the same internally.",
        "Using an unsuitable identifier type for the application's scale or database.",
        "Using a business field as a primary key when that field can change.",
        "Ignoring database-specific behavior when selecting an identifier generation strategy.",
        "Forgetting that composite keys require additional mapping and equality considerations.",
        "Assuming a generated ID must be available before persistence.",
        "Confusing a primary key with a unique constraint."
      ]
    },

    {
      id: "best-practices",

      title: "Primary Key Best Practices",

      bullets: [
        "Use a stable identifier for each entity.",
        "Use Long or another suitable numeric type for simple generated identifiers.",
        "Consider UUID when distributed ID generation or identifier exposure requirements justify it.",
        "Choose IDENTITY, SEQUENCE, AUTO, or another strategy based on the database and application requirements.",
        "Do not change generated identifiers during normal updates.",
        "Use composite keys only when they represent a genuine domain requirement.",
        "Understand the identifier strategy before optimizing persistence behavior.",
        "Keep business identifiers separate from technical database identifiers when appropriate.",
        "Add unique constraints to business fields that must be unique.",
        "Test identifier generation using repository or integration tests."
      ]
    },

    {
      id: "testing-id-generation",

      title: "Testing Identifier Generation",

      paragraphs: [
        "Repository tests can verify that an entity is persisted and receives an identifier as expected.",
        "The exact identifier value should generally not be hard-coded in a test because database state can change. It is usually better to verify that a generated ID is present and that the saved entity can be retrieved using it."
      ],

      code: {
        language: "java",
        code: `@Test
void shouldGenerateEmployeeId() {

    Employee employee = new Employee();

    employee.setName("Venkatesh");
    employee.setEmail("venkat@example.com");

    Employee saved =
        employeeRepository.save(employee);

    assertNotNull(saved.getId());

    Employee found =
        employeeRepository
            .findById(saved.getId())
            .orElseThrow();

    assertEquals(
        "Venkatesh",
        found.getName()
    );
}`
      }
    },

    {
      id: "complete-flow",

      title: "Complete Primary-Key Flow",

      paragraphs: [
        "The following flow summarizes what happens when a new Employee with a generated ID is created."
      ],

      code: {
        language: "text",
        code: `1. Create Employee object
        |
        | id = null
        v
2. employeeRepository.save(employee)
        |
        v
3. Spring Data JPA
        |
        v
4. JPA EntityManager
        |
        v
5. Hibernate
        |
        v
6. Identifier generation
        |
        v
7. INSERT into employees
        |
        v
8. Database stores row
        |
        v
9. Generated ID becomes available
        |
        v
10. Entity now has its identifier`
      }
    },

    {
      id: "interview",

      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What does @Id represent?",
          answer:
            "@Id identifies the primary-key field or property of a JPA entity. JPA uses it to uniquely identify and manage entity instances."
        },

        {
          question: "What does @GeneratedValue do?",
          answer:
            "@GeneratedValue configures how identifier values are generated for an entity. The selected strategy determines how the persistence provider obtains new IDs."
        },

        {
          question: "What does GenerationType.IDENTITY mean?",
          answer:
            "It is a generation strategy commonly used with databases that generate numeric identifiers through identity or auto-increment behavior."
        },

        {
          question: "Why does every JPA entity need an identifier?",
          answer:
            "JPA needs a stable identity to distinguish one entity instance from another, track entities in the persistence context, and identify the corresponding database row."
        },

        {
          question: "What is a primary key?",
          answer:
            "A primary key is a column or set of columns that uniquely identifies a row in a relational database table."
        },

        {
          question: "What is the difference between @Id and @GeneratedValue?",
          answer:
            "@Id identifies which field or property is the entity identifier. @GeneratedValue configures how values for that identifier are generated."
        },

        {
          question: "What is GenerationType.AUTO?",
          answer:
            "AUTO allows the persistence provider to choose an appropriate identifier generation strategy based on the provider and database configuration."
        },

        {
          question: "What is GenerationType.SEQUENCE?",
          answer:
            "SEQUENCE uses a database sequence to generate identifier values. It is commonly useful with databases that provide native sequence support."
        },

        {
          question: "What is GenerationType.TABLE?",
          answer:
            "TABLE is a JPA identifier generation strategy that uses a database table to maintain identifier values. It is less commonly used than other strategies in modern applications."
        },

        {
          question: "Which ID generation strategy is commonly used with MySQL?",
          answer:
            "GenerationType.IDENTITY is commonly used when the MySQL primary-key column uses AUTO_INCREMENT."
        },

        {
          question: "Which ID generation strategy is commonly used with PostgreSQL?",
          answer:
            "Sequence-based generation is commonly useful with PostgreSQL because PostgreSQL supports database sequences. The exact configuration should match the application's Hibernate and database setup."
        },

        {
          question: "Can an entity use a UUID as its primary key?",
          answer:
            "Yes. JPA entities can use UUID identifiers when that design is appropriate. UUIDs are useful when globally unique identifiers are desired, although their storage and indexing characteristics should be considered."
        },

        {
          question: "What is a composite primary key?",
          answer:
            "A composite primary key consists of multiple columns that together uniquely identify a database row. JPA supports composite keys using mappings such as @EmbeddedId and @IdClass."
        },

        {
          question: "What is the difference between @EmbeddedId and @IdClass?",
          answer:
            "@EmbeddedId represents the composite identifier as an embedded ID object, while @IdClass keeps the identifier fields directly on the entity and uses a separate ID class to represent the key."
        },

        {
          question: "Why should a primary key generally not be changed?",
          answer:
            "The primary key represents stable entity identity. Changing it can affect relationships, foreign keys, persistence-context identity, and references to the entity."
        },

        {
          question: "Can the primary key be null?",
          answer:
            "A persisted database row cannot have a null primary key. However, a new Java entity using a generated identifier can temporarily have a null ID before the persistence operation generates the value."
        },

        {
          question: "Why is the ID often null when creating a new entity?",
          answer:
            "When identifier generation is delegated to the database or persistence provider, the new Java object does not yet have an identifier. The ID becomes available after the relevant persistence operation generates it."
        },

        {
          question: "What is a surrogate key?",
          answer:
            "A surrogate key is an artificial identifier used primarily for database identity, such as an auto-generated Long ID."
        },

        {
          question: "What is a natural key?",
          answer:
            "A natural key is a business attribute that naturally identifies a record, such as a unique product code. Natural keys should only be used as primary keys when their stability and uniqueness are appropriate."
        },

        {
          question: "What is the difference between a primary key and a unique constraint?",
          answer:
            "A primary key defines the primary identity of the row, while a unique constraint prevents duplicate values in another column or combination of columns."
        },

        {
          question: "How does JpaRepository know the type of the primary key?",
          answer:
            "The second generic parameter of JpaRepository specifies the entity identifier type. For example, JpaRepository<Employee, Long> means Employee uses Long as its identifier type."
        },

        {
          question: "How does JPA use the ID during an update?",
          answer:
            "The identifier tells JPA which database record represents the entity. Hibernate can then generate an UPDATE statement targeting the corresponding primary-key value."
        },

        {
          question: "How does JPA use the ID during deleteById()?",
          answer:
            "The repository uses the supplied identifier to locate the entity or construct the persistence operation needed to remove the corresponding record."
        },

        {
          question: "Does @GeneratedValue generate the ID itself?",
          answer:
            "It configures the identifier generation strategy. The actual generation may involve the database, JPA provider, or another configured mechanism depending on the strategy."
        },

        {
          question: "What is @SequenceGenerator used for?",
          answer:
            "@SequenceGenerator provides explicit configuration for a sequence-based identifier generator, such as its generator name, database sequence name, and allocation behavior."
        },

        {
          question: "Why should identifier generation strategy be chosen based on the database?",
          answer:
            "Different databases provide different identifier-generation mechanisms and capabilities. Choosing a strategy that matches the database can improve correctness, portability, and persistence behavior."
        }
      ]
    },

    {
      id: "scenario-interview",

      title: "Scenario-Based Interview Questions",

      interviewQuestions: [
        {
          question: "An interviewer asks: Why is the Employee ID null before save() but populated after save()?",
          answer:
            "Because the entity uses a generated identifier. The application creates the entity without assigning the ID, and the configured JPA/database generation mechanism produces the identifier during persistence. After the relevant persistence operation, the generated ID is available on the entity."
        },

        {
          question: "Why would you choose a Long generated ID instead of an employee email as the primary key?",
          answer:
            "A generated Long provides stable technical identity and is efficient for relationships and indexing. Email is business data that may change, so using it as the primary key could make identity management and related foreign keys more complicated."
        },

        {
          question: "Your application uses MySQL with AUTO_INCREMENT. Which JPA strategy would you commonly consider?",
          answer:
            "GenerationType.IDENTITY is the common choice because it works with database-generated identity or auto-increment behavior. The final configuration should still match the actual database schema and Hibernate version."
        },

        {
          question: "Two columns together uniquely identify an Enrollment record. How would you model this in JPA?",
          answer:
            "I would use a composite-key mapping such as @EmbeddedId or @IdClass. The composite identifier should correctly implement equals() and hashCode() and represent the combination of columns that defines the record's identity."
        }
      ]
    },

    {
      id: "quick-reference",

      title: "Quick Revision",

      bullets: [
        "Primary key uniquely identifies a database row.",
        "@Id marks the entity identifier.",
        "@GeneratedValue configures identifier generation.",
        "IDENTITY commonly works with auto-increment or identity columns.",
        "SEQUENCE uses a database sequence.",
        "AUTO lets the provider choose a strategy.",
        "TABLE uses a table-based identifier mechanism.",
        "Long is a common type for generated numeric IDs.",
        "UUID can be used when globally unique identifiers are desirable.",
        "Composite keys can be mapped with @EmbeddedId or @IdClass.",
        "JpaRepository<Employee, Long> means Employee uses Long as its ID type.",
        "Generated IDs are commonly null before persistence.",
        "Primary keys should normally remain stable.",
        "Primary keys and unique constraints serve different purposes.",
        "The ID allows JPA to track entity identity."
      ],

      code: {
        language: "text",
        code: `Primary Key Cheat Sheet

@Entity
    |
    v
@Id
    |
    +---- Entity identifier
    |
    v
@GeneratedValue
    |
    +---- AUTO
    +---- IDENTITY
    +---- SEQUENCE
    +---- TABLE

Repository:

JpaRepository<Employee, Long>
                         |
                         +---- ID type`
      }
    },

    {
      id: "revision-notes",

      title: "Important Notes",

      bullets: [
        "@Id identifies the primary key; it does not itself generate values.",
        "@GeneratedValue configures how generated identifier values are obtained.",
        "IDENTITY is commonly associated with database auto-increment or identity columns.",
        "SEQUENCE uses database sequences and can have different persistence behavior from IDENTITY.",
        "AUTO delegates strategy selection to the persistence provider.",
        "A new generated-ID entity can have a null identifier before persistence.",
        "A persisted row cannot have a null primary key.",
        "Primary keys should normally be stable throughout an entity's lifetime.",
        "Composite keys are supported but add mapping and equality complexity.",
        "A primary key is different from a unique business field.",
        "Choose identifier strategies based on database capabilities and application requirements.",
        "For interviews, remember: @Id identifies the entity, @GeneratedValue configures ID generation, and JpaRepository's second generic parameter is the ID type."
      ]
    }
  ]
};
