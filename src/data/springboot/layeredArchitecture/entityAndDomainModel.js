
export const entityAndDomainModel = {
  id: "entity-and-domain-model",
  title: "Entity and Domain Model",
  slug: "entity-and-domain-model",
  topicTitle: "Spring Boot Layered Architecture",
  estimatedTime: "35 min",

  description:
    "Understand JPA entities, domain models, primary keys, persistence mapping, entity lifecycle states, persistence context, dirty checking, relationships, and the role of entities in a Spring Boot application.",

  sections: [
    {
      id: "what-is-entity",
      title: "What is an Entity?",

      paragraphs: [
        "In a JPA-based application, an entity is a Java class mapped to persistent data.",
        "An entity normally represents a concept that needs to be stored and retrieved from a database.",
        "For example, an Employee entity can represent a row in an employees table.",
        "The JPA provider, commonly Hibernate in Spring Boot applications, manages the relationship between entity objects and database records."
      ],

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    private Long id;

    private String name;

    private String email;
}`
      },

      bullets: [
        "@Entity marks the class as a persistent JPA entity.",
        "Each entity instance normally represents a database row.",
        "The entity contains persistent state that JPA can map to database columns.",
        "The entity is managed through the persistence context."
      ]
    },

    {
      id: "entity-table",
      title: "Entity to Table Mapping",

      code: {
        language: "text",
        code: `Java

Employee
----------------
id
name
email
department


        ↕


Database

employees
----------------
id
name
email
department`
      },

      paragraphs: [
        "JPA annotations provide mapping information that allows the persistence provider to associate Java objects with database structures.",
        "The class represents the Java-side model, while the database table represents the relational storage model.",
        "JPA handles much of the conversion between these two representations."
      ]
    },

    {
      id: "object-row-mapping",
      title: "Entity Object and Database Row",

      paragraphs: [
        "A useful way to understand JPA is to think of an entity object as the object representation of database data.",
        "For example, one Employee object can represent one employee row.",
        "When JPA loads the row, Hibernate creates or populates an Employee object. When the entity is persisted, JPA can generate SQL to store its state."
      ],

      code: {
        language: "text",
        code: `Database Row

id = 101
name = "Rahul"
email = "rahul@example.com"


        ↓ JPA


Java Object

Employee employee = ...

employee.getId()      → 101
employee.getName()    → Rahul
employee.getEmail()   → rahul@example.com`
      }
    },

    {
      id: "entity-annotations",
      title: "Important Entity Annotations",

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")

public class Employee {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String name;
}`
      },

      bullets: [
        "@Entity marks the class as a JPA entity.",
        "@Table can specify the database table.",
        "@Id identifies the primary key.",
        "@GeneratedValue configures identifier generation.",
        "@Column can configure column mapping and constraints.",
        "@Transient can exclude a field from persistence.",
        "@Enumerated can map enum values.",
        "@Version can be used for optimistic locking."
      ]
    },

    {
      id: "entity-state",
      title: "Entity Lifecycle States",

      paragraphs: [
        "JPA entities can move through different lifecycle states while they are managed by the persistence context.",
        "Understanding these states is important because JPA behaves differently depending on whether an entity is transient, managed, detached, or removed."
      ],

      code: {
        language: "text",
        code: `New Java Object
      |
      v
   Transient
      |
      | persist()
      v
    Managed
      |
      | detach / clear / close
      v
   Detached

Managed
   |
   | remove()
   v
  Removed`
      },

      bullets: [
        "Transient means the object has not yet been associated with a persistence context.",
        "Managed means the persistence context is currently tracking the entity.",
        "Detached means the entity was previously managed but is no longer associated with the current persistence context.",
        "Removed means a managed entity has been marked for deletion."
      ]
    },

    {
      id: "transient-state",
      title: "Transient State",

      paragraphs: [
        "An entity object is transient when it has been created using new but has not yet been associated with a persistence context.",
        "At this point JPA is not tracking changes to the object."
      ],

      code: {
        language: "java",
        code: `Employee employee = new Employee();

employee.setName("Rahul");
employee.setEmail("rahul@example.com");

// At this point the object is transient.`
      },

      bullets: [
        "The object exists only in application memory.",
        "JPA is not tracking it.",
        "Changes are not automatically persisted.",
        "Calling repository.save() can make it persistent through JPA operations."
      ]
    },

    {
      id: "managed-state",
      title: "Managed State",

      paragraphs: [
        "A managed entity belongs to the current persistence context.",
        "JPA tracks changes to managed entities.",
        "This tracking is one of the reasons developers can modify an entity and allow JPA to generate an UPDATE during flush."
      ],

      code: {
        language: "java",
        code: `Employee employee =
        entityManager.find(Employee.class, 1L);

employee.setDepartment("Engineering");

// employee is managed.
// JPA can detect the change during flush.`
      }
    },

    {
      id: "detached-state",
      title: "Detached State",

      paragraphs: [
        "An entity becomes detached when it is no longer associated with the current persistence context.",
        "For example, an entity can become detached after EntityManager.clear(), detach(), or when the persistence context is closed.",
        "Changes made to a detached object are not automatically tracked by that persistence context."
      ],

      code: {
        language: "java",
        code: `Employee employee =
        entityManager.find(Employee.class, 1L);

entityManager.detach(employee);

employee.setDepartment("Finance");

// employee is now detached.
// This change is not automatically tracked
// by the old persistence context.`
      }
    },

    {
      id: "removed-state",
      title: "Removed State",

      paragraphs: [
        "A managed entity enters the removed state when it is marked for deletion using the persistence context.",
        "The actual SQL DELETE is synchronized with the database during flush according to the transaction and persistence provider behavior."
      ],

      code: {
        language: "java",
        code: `Employee employee =
        entityManager.find(Employee.class, 1L);

entityManager.remove(employee);

// employee is marked for removal.`
      }
    },

    {
      id: "persistence-context",
      title: "Persistence Context",

      paragraphs: [
        "The persistence context is a managed collection of entity instances associated with an EntityManager.",
        "It acts as the first-level cache and tracks managed entities.",
        "Within a persistence context, JPA can maintain entity identity and detect changes."
      ],

      code: {
        language: "text",
        code: `EntityManager
      |
      v
Persistence Context
      |
      +---- Employee #1
      |
      +---- Employee #2
      |
      +---- Department #5`
      },

      bullets: [
        "It tracks managed entities.",
        "It provides first-level caching.",
        "It supports dirty checking.",
        "It helps maintain one managed object identity for an entity identity within the context.",
        "It is normally associated with a transaction or persistence operation in Spring applications."
      ]
    },

    {
      id: "entity-identity",
      title: "Entity Identity",

      paragraphs: [
        "Every JPA entity must have an identifier that uniquely identifies its persistent identity.",
        "The field annotated with @Id normally represents this identifier.",
        "The identifier is important for loading, updating, deleting, and tracking entities."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String name;
}`
      },

      bullets: [
        "@Id identifies the entity identifier.",
        "The identifier normally corresponds to the database primary key.",
        "Generated identifiers are commonly assigned when the entity is persisted.",
        "Do not casually change an entity identifier after it has been persisted."
      ]
    },

    {
      id: "generated-id",
      title: "Generated Primary Key",

      paragraphs: [
        "Many applications allow the database or JPA provider to generate entity identifiers.",
        "With GenerationType.IDENTITY, the database typically generates the numeric identifier when the row is inserted."
      ],

      code: {
        language: "java",
        code: `@Id
@GeneratedValue(
    strategy = GenerationType.IDENTITY
)
private Long id;`
      },

      code: {
        language: "text",
        code: `Before save

Employee
id = null


After database insert

Employee
id = 101`
      }
    },

    {
      id: "entity-fields",
      title: "Persistent Fields",

      paragraphs: [
        "JPA maps persistent entity state to database columns.",
        "When field access is used, JPA reads and writes the fields directly according to the entity mapping."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private Long id;

    private String name;

    private String email;

    private String department;
}`
      },

      bullets: [
        "Fields are persistent by default when using field access.",
        "Static fields are not persistent entity state.",
        "Fields marked @Transient are not persisted.",
        "Mapping annotations can customize how fields are stored."
      ]
    },

    {
      id: "field-access",
      title: "Field Access vs Property Access",

      paragraphs: [
        "JPA can use field access or property access.",
        "When @Id is placed on a field, field access is normally used for the entity.",
        "When @Id is placed on a getter, property access is normally used."
      ],

      code: {
        language: "java",
        code: `// Field access

@Entity
public class Employee {

    @Id
    private Long id;
}`
      },

      bullets: [
        "Field access reads entity fields directly.",
        "Property access uses JavaBean getter and setter methods.",
        "Do not casually mix access strategies within one entity.",
        "Keep the chosen access strategy consistent."
      ]
    },

    {
      id: "entity-column-mapping",
      title: "Custom Column Mapping",

      paragraphs: [
        "By default, JPA derives a column name from the persistent field or property.",
        "The @Column annotation can explicitly define the column name and other mapping metadata."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    private Long id;

    @Column(name = "employee_name")
    private String name;

    @Column(
        name = "employee_email",
        nullable = false,
        unique = true
    )
    private String email;
}`
      }
    },

    {
      id: "entity-constraints",
      title: "Entity Mapping Constraints",

      paragraphs: [
        "JPA mapping annotations can describe database-related constraints, but application validation and database constraints serve different purposes.",
        "For example, @Column(nullable = false) describes a database column constraint, while @NotBlank validates incoming application data."
      ],

      code: {
        language: "java",
        code: `@Column(nullable = false)
private String name;

@NotBlank
private String name;`
      },

      bullets: [
        "@NotBlank is application-level input validation.",
        "nullable = false is a persistence/database mapping constraint.",
        "Database constraints remain important even when application validation exists.",
        "Validation and persistence constraints complement each other."
      ]
    },

    {
      id: "entity-validation",
      title: "Entity Validation vs DTO Validation",

      paragraphs: [
        "Validation can be placed on DTOs, entities, or both depending on the application design.",
        "For REST APIs, request DTO validation is often preferable because the DTO represents the external input contract.",
        "Entity constraints can still be useful for domain or persistence invariants."
      ],

      code: {
        language: "java",
        code: `public record EmployeeCreateRequest(
        @NotBlank String name,
        @Email @NotBlank String email
) {
}


@Entity
public class Employee {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;
}`
      }
    },

    {
      id: "default-constructor",
      title: "Default Constructor",

      paragraphs: [
        "JPA requires an entity to have a no-argument constructor with appropriate visibility.",
        "Developers often keep it protected or public depending on the application and framework requirements.",
        "A protected constructor is commonly used because application code can use meaningful constructors while JPA can still instantiate the entity."
      ],

      code: {
        language: "java",
        code: `protected Employee() {
    // Required by JPA
}`
      }
    },

    {
      id: "entity-constructor",
      title: "Entity Constructors",

      paragraphs: [
        "Entities can have constructors used by application code in addition to the required no-argument constructor.",
        "A domain-oriented constructor can ensure that a newly created object starts with required values."
      ],

      code: {
        language: "java",
        code: `protected Employee() {
    // Required by JPA
}

public Employee(
        String name,
        String email,
        String department) {

    this.name = name;
    this.email = email;
    this.department = department;
}`
      }
    },

    {
      id: "entity-methods",
      title: "Behavior Inside an Entity",

      paragraphs: [
        "An entity does not have to be a collection of getters and setters only.",
        "When the domain requires it, an entity can contain behavior that protects its own state.",
        "For example, an Employee could have a method that changes its department instead of allowing arbitrary state manipulation everywhere."
      ],

      code: {
        language: "java",
        code: `public void changeDepartment(
        String department) {

    if (department == null ||
        department.isBlank()) {

        throw new IllegalArgumentException(
            "Department is required"
        );
    }

    this.department = department;
}`
      },

      bullets: [
        "Keep domain behavior close to the state it protects when appropriate.",
        "Do not place HTTP handling inside entities.",
        "Do not place repository calls inside entities.",
        "Do not turn entities into service-layer replacements."
      ]
    },

    {
      id: "entity-vs-business",
      title: "Entity and Business Logic",

      paragraphs: [
        "An entity can contain domain-related behavior when the application's domain model requires it.",
        "However, developers should avoid turning entities into containers for unrelated application orchestration, HTTP handling, or infrastructure concerns.",
        "A useful distinction is that domain behavior can belong in an entity, while application orchestration normally belongs in the service layer."
      ],

      code: {
        language: "text",
        code: `Good entity responsibility

Employee
  → changeDepartment()
  → changeEmail()
  → activate()


Service responsibility

EmployeeService
  → coordinate repositories
  → call external systems
  → manage application workflow
  → enforce application-level orchestration`
      }
    },

    {
      id: "domain-model",
      title: "What is a Domain Model?",

      paragraphs: [
        "A domain model represents important concepts, state, relationships, and behavior in a particular business domain.",
        "For an employee management system, Employee, Department, Project, and Manager could be domain concepts.",
        "A JPA entity can be part of the domain model, but the terms entity and domain model are not always identical."
      ],

      bullets: [
        "Domain model represents business concepts.",
        "Entity represents persistent identity and state.",
        "A domain model can contain entities, value objects, domain services, and relationships.",
        "Not every domain concept must necessarily be a database table."
      ]
    },

    {
      id: "entity-vs-domain-model",
      title: "Entity vs Domain Model",

      code: {
        language: "text",
        code: `Entity

Focus:
Persistence identity
Database mapping
Persistent state


Domain Model

Focus:
Business concepts
Business rules
State
Relationships
Domain behavior`
      },

      paragraphs: [
        "In a simple Spring Boot application, a JPA entity may represent both persistence data and an important domain concept.",
        "In more complex architectures, the domain model can be designed more independently from persistence."
      ]
    },

    {
      id: "dirty-checking",
      title: "Dirty Checking",

      paragraphs: [
        "Dirty checking is a JPA mechanism where the persistence provider detects changes made to managed entities.",
        "When a managed entity is modified inside a transaction, Hibernate can compare its state and generate the required SQL during flush."
      ],

      code: {
        language: "java",
        code: `@Transactional
public void changeDepartment(
        Long employeeId) {

    Employee employee =
            repository.findById(employeeId)
                      .orElseThrow();

    employee.setDepartment("Engineering");

    // No explicit repository.save() is
    // necessarily required for this managed
    // entity change to be detected.

    // Flush can result in:
    //
    // UPDATE employees
    // SET department = 'Engineering'
    // WHERE id = ?
}`
      },

      bullets: [
        "Dirty checking applies to managed entities.",
        "The persistence provider detects changes.",
        "SQL is normally synchronized during flush.",
        "Flush and transaction commit are related but not identical concepts."
      ]
    },

    {
      id: "flush-vs-commit",
      title: "Flush vs Commit",

      paragraphs: [
        "Flush means synchronizing pending persistence changes with the database.",
        "Commit completes the database transaction.",
        "A flush can occur before the transaction commits."
      ],

      code: {
        language: "text",
        code: `Application code
      ↓
Entity changed
      ↓
Persistence Context
      ↓
Flush
      ↓
SQL sent to database
      ↓
Transaction Commit
      ↓
Changes become committed`
      }
    },

    {
      id: "entity-manager",
      title: "EntityManager and Entities",

      paragraphs: [
        "EntityManager is the JPA API used to interact with the persistence context and perform operations on entities.",
        "Spring Data JPA repositories usually hide direct EntityManager usage for common CRUD operations."
      ],

      code: {
        language: "java",
        code: `Employee employee =
        entityManager.find(
            Employee.class,
            1L
        );

employee.setDepartment("Engineering");`
      },

      bullets: [
        "EntityManager is part of the JPA API.",
        "It works with the persistence context.",
        "Repositories provide a higher-level abstraction for common operations.",
        "Hibernate is commonly the JPA provider underneath Spring Boot."
      ]
    },

    {
      id: "entity-relationships",
      title: "Entities and Relationships",

      paragraphs: [
        "Entities can have relationships with other entities.",
        "Common JPA relationship types include one-to-one, one-to-many, many-to-one, and many-to-many.",
        "These relationships represent associations between domain concepts and are mapped to relational database structures."
      ],

      code: {
        language: "java",
        code: `@Entity
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    private Department department;
}`
      },

      bullets: [
        "@OneToOne represents one-to-one relationships.",
        "@OneToMany represents one-to-many relationships.",
        "@ManyToOne represents many-to-one relationships.",
        "@ManyToMany represents many-to-many relationships.",
        "Relationship mapping should be designed carefully to avoid unnecessary queries and serialization problems."
      ]
    },

    {
      id: "lazy-loading-preview",
      title: "Entities and Lazy Loading",

      paragraphs: [
        "Some JPA relationships can be loaded lazily, meaning related data is loaded when it is accessed rather than immediately.",
        "Lazy loading can improve performance, but accessing a lazy relationship after the persistence context is closed can cause LazyInitializationException."
      ],

      code: {
        language: "text",
        code: `Employee
   |
   +---- Department

Load Employee
      ↓
Department not necessarily loaded

Access employee.getDepartment()
      ↓
JPA may load Department`
      },

      bullets: [
        "Do not assume every relationship should be eager.",
        "Design fetch behavior according to the use case.",
        "DTO queries, fetch joins, and entity graphs can help control data loading."
      ]
    },

    {
      id: "equals-hashcode",
      title: "equals() and hashCode() in Entities",

      paragraphs: [
        "Entity equality requires care because entity identifiers may not exist before persistence.",
        "Using automatically generated IDs in equals and hashCode without considering lifecycle behavior can cause surprising behavior in hash-based collections."
      ],

      bullets: [
        "Do not blindly generate equals and hashCode for every JPA entity.",
        "Be careful when entities transition from transient to persistent state.",
        "Follow a consistent entity identity strategy.",
        "Avoid including mutable associations in hashCode."
      ]
    },

    {
      id: "to-string",
      title: "toString() and Entity Relationships",

      paragraphs: [
        "Generating toString() for entities with bidirectional relationships can cause recursive output.",
        "It can also accidentally trigger lazy loading.",
        "Keep entity toString() implementations small and avoid blindly including relationships."
      ],

      code: {
        language: "java",
        code: `// Safer idea

@Override
public String toString() {
    return "Employee{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", email='" + email + '\'' +
            '}';
}`
      }
    },

    {
      id: "entity-complete-flow",
      title: "Entity Persistence Flow",

      code: {
        language: "text",
        code: `HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Request DTO
     ↓
Entity creation
     ↓
Repository
     ↓
Persistence Context
     ↓
Hibernate
     ↓
SQL
     ↓
Database


Database
     ↓
Hibernate
     ↓
Persistence Context
     ↓
Entity
     ↓
Service
     ↓
Response DTO
     ↓
Controller
     ↓
HTTP Response`
      }
    },

    {
      id: "entity-project-structure",
      title: "Entity in Layered Architecture",

      code: {
        language: "text",
        code: `com.example.employee
│
├── controller
│     └── EmployeeController
│
├── service
│     └── EmployeeService
│
├── repository
│     └── EmployeeRepository
│
├── entity
│     └── Employee
│
├── dto
│     ├── EmployeeCreateRequest
│     └── EmployeeResponse
│
└── exception
      └── EmployeeNotFoundException`
      },

      paragraphs: [
        "The entity belongs to the persistence/domain side of the application.",
        "The controller should generally work with DTOs rather than exposing JPA entities directly.",
        "The service coordinates the application operation and interacts with repositories."
      ]
    },

    {
      id: "entity-best-practices",
      title: "Entity Best Practices",

      bullets: [
        "Give every JPA entity a clear identity.",
        "Use @Id correctly.",
        "Use generated identifiers when appropriate.",
        "Provide the required no-argument constructor.",
        "Prefer a protected no-argument constructor when it fits the design.",
        "Use meaningful constructors or factory methods for application creation.",
        "Keep entity responsibilities focused.",
        "Do not put controller or HTTP logic inside entities.",
        "Avoid repository calls inside entities.",
        "Be deliberate about entity relationships.",
        "Avoid unnecessary EAGER fetching.",
        "Be careful with equals(), hashCode(), and toString().",
        "Use DTOs at REST API boundaries.",
        "Use database constraints for database integrity.",
        "Use Bean Validation for application input validation.",
        "Understand persistence context and dirty checking.",
        "Do not assume repository.save() is required for every managed entity update.",
        "Keep transactions around appropriate service operations."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Entity Mistakes",

      bullets: [
        "Forgetting @Entity.",
        "Forgetting @Id.",
        "Not providing a no-argument constructor.",
        "Using mutable identifiers incorrectly.",
        "Returning entities directly from every REST endpoint.",
        "Exposing password hashes through entity serialization.",
        "Using EAGER relationships without understanding their performance impact.",
        "Using bidirectional relationships everywhere without a clear reason.",
        "Including relationships in toString() and causing recursion.",
        "Generating unsafe equals() and hashCode() implementations.",
        "Putting HTTP or repository logic inside entities.",
        "Assuming @Column(nullable = false) replaces request validation.",
        "Assuming flush is the same as commit.",
        "Ignoring LazyInitializationException causes.",
        "Loading large entity graphs when only a small DTO is required."
      ]
    },

    {
      id: "testing-entity",
      title: "Testing Entities",

      paragraphs: [
        "Entity testing can focus on domain behavior, constructors, validation-related behavior, and persistence mappings.",
        "Repository tests are useful when the goal is to verify actual JPA mappings and database interactions."
      ],

      bullets: [
        "Unit test meaningful domain behavior inside entities.",
        "Use repository tests to verify persistence mappings.",
        "Test unique and not-null database constraints where appropriate.",
        "Test relationships when their mapping is important.",
        "Test entity lifecycle behavior when the application depends on it."
      ]
    },

    {
      id: "entity-vs-dto-summary",
      title: "Entity vs DTO Quick Comparison",

      code: {
        language: "text",
        code: `Entity
---------------------------
Purpose: Persistence/domain state
Managed by: JPA persistence context
Has: Persistent identity
Mapped to: Database
Example: Employee


DTO
---------------------------
Purpose: Data transfer/API contract
Managed by: Application code
Has: API-specific shape
Mapped to: Request/response data
Example: EmployeeResponse`
      }
    },

    {
      id: "entity-interview-scenarios",
      title: "Scenario-Based Entity Interview Questions",

      interviewQuestions: [
        {
          question:
            "What happens when you modify a managed JPA entity inside a transaction?",
          answer:
            "JPA tracks the managed entity through the persistence context. During flush, dirty checking can detect the change and Hibernate can generate the required SQL."
        },
        {
          question:
            "Do you always need to call repository.save() after modifying an entity returned by findById()?",
          answer:
            "Not necessarily. If the entity is managed within the transaction, dirty checking can detect the modification and synchronize it during flush. Calling save may still be used depending on the application's repository/service design, but it is not inherently required for every managed update."
        },
        {
          question:
            "Why should you avoid returning JPA entities directly from REST controllers?",
          answer:
            "It can expose internal fields, couple the API contract to the persistence model, trigger unwanted relationship loading, and create serialization problems. DTOs provide a controlled API representation."
        },
        {
          question:
            "What is the difference between an entity and a domain model?",
          answer:
            "An entity primarily represents an object with persistent identity and state, while a domain model represents the business concepts, rules, relationships, and behavior of the problem domain. A JPA entity can be an important part of a domain model, but the concepts are not identical."
        },
        {
          question:
            "Why does JPA require a no-argument constructor?",
          answer:
            "The JPA specification requires an entity to have a no-argument constructor so the persistence provider can instantiate the entity."
        },
        {
          question:
            "What is the persistence context?",
          answer:
            "The persistence context is the set of entity instances currently managed by an EntityManager. It tracks managed entities, provides first-level caching, and enables features such as dirty checking."
        },
        {
          question:
            "What is dirty checking?",
          answer:
            "Dirty checking is the process by which the JPA provider detects changes made to managed entities and synchronizes those changes with the database during flush."
        },
        {
          question:
            "What is the difference between transient and detached?",
          answer:
            "A transient object has not yet been associated with a persistence context. A detached entity was previously managed but is no longer associated with the current persistence context."
        },
        {
          question:
            "Can an entity contain business logic?",
          answer:
            "Yes. Entities can contain domain-related behavior when appropriate. However, HTTP handling, infrastructure operations, and application orchestration normally belong outside the entity."
        },
        {
          question:
            "Why should equals() and hashCode() be handled carefully in JPA entities?",
          answer:
            "Entity identifiers can change from null to a generated value during persistence, and careless equality implementations can produce inconsistent behavior in hash-based collections."
        }
      ]
    },

    {
      id: "interview",
      title: "Entity Interview Questions",

      interviewQuestions: [
        {
          question: "What is a JPA entity?",
          answer:
            "A JPA entity is a Java class mapped to persistent data and managed by the JPA persistence provider."
        },
        {
          question: "What does @Entity do?",
          answer:
            "@Entity tells JPA that the class should be treated as a persistent entity."
        },
        {
          question: "What is @Id?",
          answer:
            "@Id identifies the primary key of the entity."
        },
        {
          question: "Why does a JPA entity need a no-argument constructor?",
          answer:
            "The JPA specification requires an entity to have a no-argument constructor so the persistence provider can instantiate it."
        },
        {
          question: "What is the persistence context?",
          answer:
            "The persistence context is the set of entities currently managed by JPA. It tracks changes and provides features such as first-level caching and dirty checking."
        },
        {
          question: "What is dirty checking?",
          answer:
            "Dirty checking is JPA's mechanism for detecting changes to managed entities and synchronizing those changes with the database during flush."
        },
        {
          question: "What are the main JPA entity lifecycle states?",
          answer:
            "The main states are transient, managed, detached, and removed."
        },
        {
          question: "What is the difference between an entity and a DTO?",
          answer:
            "An entity represents persistent application state and is managed by JPA, while a DTO represents data transferred across an application boundary such as a REST API."
        },
        {
          question: "What is the role of Hibernate in a Spring Boot JPA application?",
          answer:
            "Hibernate is commonly used as the JPA provider. It implements the JPA persistence behavior and translates entity operations into database interactions."
        },
        {
          question: "What is the purpose of @GeneratedValue?",
          answer:
            "@GeneratedValue configures how JPA obtains generated values for an entity identifier."
        },
        {
          question: "What is @Table used for?",
          answer:
            "@Table can specify the database table and customize table-level mapping information for an entity."
        },
        {
          question: "What is @Column used for?",
          answer:
            "@Column can customize how a persistent field maps to a database column and can define mapping metadata such as name, nullable, and unique."
        },
        {
          question: "Should every entity have setters for every field?",
          answer:
            "No. Setters are not mandatory for every field. The entity can expose controlled methods or constructors when that better protects its invariants."
        },
        {
          question: "Can an entity have methods?",
          answer:
            "Yes. Entities can contain domain behavior when that behavior belongs naturally to the entity."
        },
        {
          question: "Why are DTOs often preferred over entities in REST controllers?",
          answer:
            "DTOs provide a controlled API contract, prevent accidental field exposure, reduce coupling to persistence, and allow request and response models to evolve independently."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",

      bullets: [
        "@Entity marks a persistent JPA entity.",
        "@Id identifies the entity primary key.",
        "@GeneratedValue configures generated identifiers.",
        "@Table customizes table mapping.",
        "@Column customizes column mapping.",
        "A transient entity is not managed by a persistence context.",
        "A managed entity is tracked by the persistence context.",
        "A detached entity is no longer associated with the current persistence context.",
        "A removed entity is marked for deletion.",
        "Persistence context enables dirty checking.",
        "Dirty checking detects changes to managed entities.",
        "Flush synchronizes pending changes with the database.",
        "Commit completes the database transaction.",
        "Entities can contain domain behavior.",
        "Avoid putting HTTP and infrastructure logic inside entities.",
        "Use DTOs for controlled REST API boundaries.",
        "Be careful with relationships, lazy loading, equals(), hashCode(), and toString()."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",

      paragraphs: [
        "A JPA entity is a Java class mapped to persistent database data. It normally has an @Entity annotation and an @Id field representing its identity. Hibernate, which is commonly the JPA provider in Spring Boot, manages entity persistence through the persistence context. Entities can be transient, managed, detached, or removed. When an entity is managed, JPA can use dirty checking to detect changes and synchronize them with the database during flush. In a layered Spring Boot application, entities represent persistence or domain state, while DTOs are generally used at REST API boundaries to control the data exposed to clients."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes",

      paragraphs: [
        "Remember the core flow: Entity → Persistence Context → Hibernate → SQL → Database.",
        "The four important lifecycle states are transient, managed, detached, and removed.",
        "A managed entity is tracked by the persistence context.",
        "Dirty checking allows Hibernate to detect changes to managed entities.",
        "Flush synchronizes pending persistence changes; commit completes the transaction.",
        "A JPA entity requires a no-argument constructor according to the JPA specification.",
        "Entities can contain domain behavior, but HTTP and infrastructure concerns should remain outside the entity.",
        "For REST APIs, prefer DTOs when you need a controlled API contract rather than exposing entities directly.",
        "Be especially careful with entity relationships, lazy loading, serialization, equals(), hashCode(), and toString()."
      ]
    },

    {
      id: "complete-example",
      title: "Complete Employee Entity Example",

      code: {
        language: "java",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(
        nullable = false,
        unique = true
    )
    private String email;

    private String department;

    protected Employee() {
        // Required by JPA
    }

    public Employee(
            String name,
            String email,
            String department) {

        this.name = name;
        this.email = email;
        this.department = department;
    }

    public void changeDepartment(
            String department) {

        if (department == null ||
            department.isBlank()) {

            throw new IllegalArgumentException(
                "Department is required"
            );
        }

        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }
}`
      }
    }
  ]
};