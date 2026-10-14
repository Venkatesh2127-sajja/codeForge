
export const whatAreJpaRelationships = {
  id: 901,
  title: "What Are JPA Relationships?",
  slug: "what-are-jpa-relationships",
  topicTitle: "JPA Relationships",
  description:
    "Understand how JPA maps relationships between Java entity classes and relational database tables, including relationship types, foreign keys, owning sides, cascade operations, fetching strategies, and practical Spring Boot examples.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction to JPA Relationships",
      paragraphs: [
        "In a relational database, tables are connected using primary keys and foreign keys. In a Spring Boot application, JPA allows us to represent these connections using relationships between Java entity classes.",
        "For example, a company may have many employees, and each employee may belong to one department. Instead of manually managing every foreign-key value, we can use annotations such as @ManyToOne and @OneToMany to describe the relationship in Java.",
        "JPA stands for Java Persistence API, commonly referred to today as Jakarta Persistence. It defines a standard for mapping Java objects to relational database records. Hibernate is a popular JPA implementation that translates persistence operations into SQL.",
        "An entity is a Java class mapped to a database table. An entity relationship is an association between entity objects that JPA maps to a relational structure, such as a foreign key or join table.",
        "Relationship annotations describe how entities are associated, but they do not eliminate the need to understand database constraints, transaction boundaries, SQL queries, and object lifecycle management."
      ],
      code: {
        language: "text",
        code: `Spring Boot Application
        |
        v
   Service Layer
        |
        v
   Spring Data JPA
        |
        v
   JPA Specification
        |
        v
   Hibernate (JPA Provider)
        |
        v
   SQL Statements
        |
        v
   Relational Database
   +------------------+
   | departments      |
   | employees        |
   | users            |
   | user_profiles    |
   +------------------+`
      },
      bullets: [
        "Entity: a Java class managed by the persistence provider.",
        "Primary key: uniquely identifies a database row.",
        "Foreign key: references a key in another table.",
        "Relationship annotation: describes an association between entity types.",
        "JPA: defines persistence and object-relational mapping standards.",
        "Hibernate: implements JPA and generates SQL for mapped operations.",
        "Spring Data JPA: simplifies repository-based persistence access."
      ]
    },
    {
      id: "relationship-types",
      title: "2. Types of JPA Relationships",
      paragraphs: [
        "JPA provides four main relationship annotations: @OneToOne, @OneToMany, @ManyToOne, and @ManyToMany. Each describes the cardinality of an association between entity types.",
        "Choose the annotation according to the domain relationship. For example, many employees belonging to one department is many-to-one from the Employee perspective and one-to-many from the Department perspective.",
        "The same database relationship can be represented from different directions. In a bidirectional association, both entities contain relationship attributes. In a unidirectional association, only one entity exposes the navigation path."
      ],
      code: {
        language: "text",
        code: `1. One-to-One
   User -------- UserProfile
     1                1

2. One-to-Many
   Department -------- Employee
       1                  *

3. Many-to-One
   Employee -------- Department
       *                  1

4. Many-to-Many
   Student -------- Course
       *                *`
      },
      bullets: [
        "One-to-One: one user is associated with at most one profile, and one profile with at most one user.",
        "One-to-Many: one department can have many employees.",
        "Many-to-One: many employees can reference one department.",
        "Many-to-Many: many students can enroll in many courses.",
        "One-to-many and many-to-one can describe opposite directions of the same association.",
        "The database schema and domain rules determine the constraints required to enforce each relationship."
      ]
    },
    {
      id: "department-example",
      title: "3. Example: Department Entity",
      paragraphs: [
        "Suppose an organization has departments such as Engineering, HR, and Finance. Each department has a unique identifier and a name.",
        "The Department entity maps to the departments table. In a typical relational schema, its primary key is referenced by the department_id foreign key in the employees table.",
        "The following class defines the Department entity. It intentionally contains only the basic fields so the relationship can be introduced step by step."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    protected Department() {
    }

    public Department(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}`
      },
      bullets: [
        "@Entity tells JPA to manage the class as an entity.",
        "@Table specifies the database table name.",
        "@Id marks the primary-key field.",
        "@GeneratedValue configures identifier generation.",
        "@Column(nullable = false) expresses a non-null column requirement for schema generation.",
        "A protected no-argument constructor supports JPA entity instantiation."
      ]
    },
    {
      id: "employee-example",
      title: "4. Mapping the Employee–Department Relationship",
      paragraphs: [
        "The Employee entity contains a Department reference. The @ManyToOne annotation indicates that multiple employees can reference the same department.",
        "The @JoinColumn annotation identifies the foreign-key column in the employees table. In this example, department_id references departments.id.",
        "The @ManyToOne side normally owns this association because it declares the foreign-key mapping. If the relationship is later made bidirectional by adding Department.employees, that collection would commonly use @OneToMany(mappedBy = \"department\").",
        "FetchType.LAZY requests deferred loading of the department association. Actual loading behavior depends on the provider, query, and persistence context."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    protected Employee() {
    }

    public Employee(String name, Department department) {
        this.name = name;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}`
      },
      code: {
        language: "text",
        code: `departments
+----+-------------+
| id | name        |
+----+-------------+
| 1  | Engineering |
| 2  | HR          |
+----+-------------+

employees
+----+-------+---------------+
| id | name  | department_id |
+----+-------+---------------+
| 10 | Ravi  | 1             |
| 11 | Priya | 1             |
| 12 | Arun  | 2             |
+----+-------+---------------+

Ravi and Priya -> Engineering
Arun           -> HR`
      },
      bullets: [
        "@ManyToOne describes many employees referencing one department.",
        "@JoinColumn(name = \"department_id\") maps the foreign key.",
        "Employee.department owns this association mapping.",
        "Multiple employee rows can reference the same department ID.",
        "A database foreign-key constraint can ensure that a non-null department_id references an existing department."
      ]
    },
    {
      id: "unidirectional-bidirectional",
      title: "5. Unidirectional vs Bidirectional Relationships",
      paragraphs: [
        "A unidirectional relationship exposes the association from one entity. For example, Employee may contain a Department reference without Department having a collection of employees.",
        "A bidirectional relationship exposes navigation from both entities. Department can contain a collection of Employee objects, and each Employee can reference its Department.",
        "In a bidirectional relationship, one side owns the association mapping and the other side refers to it through mappedBy. Application code should keep both Java references consistent when changing the relationship.",
        "Bidirectional mapping is not always necessary. If the application never needs to navigate from Department to its employees, the additional collection may add complexity without providing useful functionality."
      ],
      code: {
        language: "java",
        code: `// Unidirectional: Employee -> Department

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;

// Bidirectional: add this to Department

@OneToMany(mappedBy = "department")
private List<Employee> employees = new ArrayList<>();`
      },
      bullets: [
        "Unidirectional means only one entity exposes the association.",
        "Bidirectional means both entities expose the association.",
        "mappedBy identifies the owning Java attribute.",
        "In a conventional Department–Employee mapping, Employee.department owns the relationship.",
        "Keep both Java references synchronized when maintaining a bidirectional association."
      ]
    },
    {
      id: "owning-side",
      title: "6. What Is the Owning Side?",
      paragraphs: [
        "The owning side defines the database mapping for an association. In a conventional bidirectional Department–Employee relationship, Employee.department is the owning side because it maps department_id using @JoinColumn.",
        "Department.employees is the inverse side when it uses @OneToMany(mappedBy = \"department\"). The mappedBy value is the Java field or property name in Employee, not the database column name.",
        "Updating only the inverse collection is not enough to guarantee that the foreign-key relationship is persisted. The owning-side attribute should point to the intended department.",
        "Helper methods can update both sides of a bidirectional relationship so the in-memory object graph stays consistent."
      ],
      code: {
        language: "java",
        code: `// Owning side: Employee.java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;

// Inverse side: Department.java
@OneToMany(mappedBy = "department")
private List<Employee> employees = new ArrayList<>();`
      },
      bullets: [
        "Owning side: controls the association's database mapping.",
        "Inverse side: refers to the owning attribute using mappedBy.",
        "mappedBy = \"department\" refers to Employee.department.",
        "mappedBy = \"department_id\" would be incorrect for this mapping.",
        "Cascade settings and ownership are separate concepts."
      ]
    },
    {
      id: "cascade-and-fetch",
      title: "7. Cascade Operations and Fetching Strategies",
      paragraphs: [
        "Cascade operations determine whether persistence operations applied to one entity propagate to associated entities. For example, CascadeType.PERSIST can persist new associated entities when the parent is persisted.",
        "CascadeType.ALL includes the standard JPA cascade operations: PERSIST, MERGE, REMOVE, REFRESH, and DETACH. It should be used only when the associated entity's lifecycle justifies those operations.",
        "Fetch strategies control when associations are loaded. EAGER means the association must be fetched as part of the entity-loading operation, but it does not guarantee a single SQL JOIN. LAZY permits deferred loading, though provider behavior depends on the mapping and query.",
        "The JPA defaults differ by annotation: @ManyToOne and @OneToOne default to EAGER, while @OneToMany and @ManyToMany default to LAZY. Applications should choose fetching deliberately and inspect generated SQL."
      ],
      code: {
        language: "java",
        code: `// Example cascade configuration
@OneToMany(
    mappedBy = "department",
    cascade = CascadeType.PERSIST
)
private List<Employee> employees = new ArrayList<>();

// Example fetch configuration
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;`
      },
      bullets: [
        "PERSIST: propagates persist operations.",
        "MERGE: propagates merge operations.",
        "REMOVE: propagates remove operations.",
        "REFRESH: propagates refresh operations.",
        "DETACH: propagates detach operations.",
        "ALL: includes all five standard cascade operations.",
        "Cascade is not a substitute for setting the owning-side reference.",
        "Use lazy loading and targeted fetch plans to avoid unnecessary data retrieval."
      ]
    },
    {
      id: "many-to-many-join-table",
      title: "8. Many-to-Many and Join Tables",
      paragraphs: [
        "A many-to-many relationship means multiple records on each side can be associated with multiple records on the other side. For example, a student can enroll in several courses, and each course can have several students.",
        "Relational databases commonly represent this relationship using a join table. The join table contains foreign keys referencing both participating tables.",
        "JPA uses @ManyToMany to represent the association and @JoinTable to configure the join table. If the association itself needs additional attributes, such as enrollment date or grade, a separate enrollment entity is often more suitable than a direct many-to-many mapping."
      ],
      code: {
        language: "text",
        code: `students
+----+-------+
| id | name  |
+----+-------+
| 1  | Ravi  |
| 2  | Priya |
+----+-------+

courses
+----+--------+
| id | title  |
+----+--------+
| 10 | Java   |
| 11 | SQL    |
+----+--------+

student_courses
+------------+-----------+
| student_id | course_id |
+------------+-----------+
| 1          | 10        |
| 1          | 11        |
| 2          | 10        |
+------------+-----------+`
      },
      code: {
        language: "java",
        code: `@ManyToMany
@JoinTable(
    name = "student_courses",
    joinColumns = @JoinColumn(name = "student_id"),
    inverseJoinColumns = @JoinColumn(name = "course_id")
)
private Set<Course> courses = new HashSet<>();`
      },
      bullets: [
        "@ManyToMany represents the many-to-many association.",
        "@JoinTable configures the intermediate table.",
        "joinColumns refers to the current entity's join column.",
        "inverseJoinColumns refers to the other entity's join column.",
        "Use an association entity when the relationship has its own attributes or lifecycle."
      ]
    },
    {
      id: "database-relationships",
      title: "9. How Relationships Are Stored in the Database",
      paragraphs: [
        "JPA relationships are object-level mappings, but relational databases store the underlying data using rows, columns, keys, and constraints.",
        "One-to-one relationships often use a foreign key with a UNIQUE constraint. One-to-many and many-to-one relationships commonly use a foreign key on the many side. Many-to-many relationships commonly use a join table.",
        "The annotations describe the intended mapping, but the actual database schema depends on schema-generation settings or database migration scripts. Verify the real schema when constraints are important."
      ],
      code: {
        language: "text",
        code: `One-to-One:
user_profiles.user_id -> users.id
UNIQUE(user_id)

One-to-Many / Many-to-One:
employees.department_id -> departments.id

Many-to-Many:
student_courses.student_id -> students.id
student_courses.course_id  -> courses.id`
      },
      bullets: [
        "Primary keys identify records.",
        "Foreign keys represent references between tables.",
        "Unique constraints enforce uniqueness requirements.",
        "NOT NULL constraints enforce required values.",
        "Join tables represent associations that cannot be stored conveniently as one foreign-key column.",
        "Use database migrations when schema changes must be controlled and repeatable."
      ]
    },
    {
      id: "transaction-and-persistence",
      title: "10. Persisting Related Entities in Spring Boot",
      paragraphs: [
        "A Spring Data JPA repository provides operations such as save, findById, findAll, and delete. A service commonly coordinates these repository operations and applies business rules.",
        "When creating related entities, set the owning-side association correctly. If cascade persistence is configured, persisting the parent may also persist new associated entities. Otherwise, save the related entities explicitly.",
        "Use @Transactional when multiple database operations must be treated as one unit. If an operation fails and the transaction rolls back, the related writes are rolled back together when they participate in the same transaction."
      ],
      code: {
        language: "java",
        code: `public interface DepartmentRepository
        extends JpaRepository<Department, Long> {
}

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}`
      },
      code: {
        language: "java",
        code: `@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository,
            EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employee createEmployee(
            String employeeName,
            Long departmentId) {

        Department department = departmentRepository
            .findById(departmentId)
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Department not found"
                )
            );

        Employee employee =
            new Employee(employeeName, department);

        return employeeRepository.save(employee);
    }
}`
      },
      bullets: [
        "Repositories handle common persistence operations.",
        "Services coordinate related operations and business rules.",
        "Set the owning association before persisting the relationship.",
        "Use transactions for related database changes that must succeed or fail together.",
        "Prefer application-specific exceptions and suitable API error responses in production.",
        "Do not assume repository save always executes SQL immediately; synchronization can occur at flush or commit."
      ]
    },
    {
      id: "common-mistakes",
      title: "11. Common Mistakes",
      paragraphs: [
        "JPA relationship problems often come from incorrect ownership, missing database constraints, unsuitable cascade settings, or unplanned fetching behavior."
      ],
      bullets: [
        "Confusing JPA with Hibernate: JPA is the specification, while Hibernate is one implementation.",
        "Using the database column name instead of the Java attribute name in mappedBy.",
        "Updating only the inverse side of a bidirectional association.",
        "Using cascade operations without considering the related entity's lifecycle.",
        "Assuming EAGER always produces a JOIN or LAZY always prevents immediate loading.",
        "Returning bidirectional entities directly from REST controllers and causing recursive serialization.",
        "Accessing lazy associations after the persistence context has closed.",
        "Ignoring N+1 query problems when loading collections.",
        "Assuming entity annotations automatically modify an existing database schema.",
        "Creating bidirectional relationships that the application does not actually need."
      ]
    },
    {
      id: "best-practices",
      title: "12. JPA Relationship Best Practices",
      bullets: [
        "Choose relationships based on actual domain requirements.",
        "Understand where the database foreign key or join table belongs.",
        "Know which side owns the association before modifying it.",
        "Keep both sides synchronized in bidirectional relationships.",
        "Use cascade settings according to lifecycle requirements.",
        "Use orphanRemoval only when removing a child from the association should delete it.",
        "Choose fetching strategies intentionally and verify generated SQL.",
        "Use DTOs to control API responses and avoid recursive entity serialization.",
        "Use transactions to coordinate related database operations.",
        "Use database constraints to enforce important integrity rules.",
        "Use migrations to manage schema changes in controlled environments.",
        "Test relationships by persisting and reloading entities, not only by checking in-memory references."
      ]
    },
    {
      id: "interview",
      title: "13. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What are JPA relationships?",
          answer: "JPA relationships map associations between entity classes to relational database relationships. The four main types are one-to-one, one-to-many, many-to-one, and many-to-many."
        },
        {
          question: "What is the difference between JPA and Hibernate?",
          answer: "JPA is a persistence specification that defines standard APIs and mapping behavior. Hibernate is a popular implementation of that specification."
        },
        {
          question: "What is an entity in JPA?",
          answer: "An entity is a Java class managed by a persistence provider and mapped to a relational database table or another supported persistent mapping."
        },
        {
          question: "What is a foreign key?",
          answer: "A foreign key is a database constraint that references a key in another table and helps maintain referential integrity."
        },
        {
          question: "What are the four main JPA relationship annotations?",
          answer: "@OneToOne, @OneToMany, @ManyToOne, and @ManyToMany."
        },
        {
          question: "What is the difference between @OneToMany and @ManyToOne?",
          answer: "@OneToMany represents one entity associated with multiple entities. @ManyToOne represents multiple entities associated with one entity. They can describe opposite directions of the same association."
        },
        {
          question: "What is the owning side of a JPA relationship?",
          answer: "The owning side defines the association's database mapping. In a conventional Department–Employee mapping, Employee.department owns the association because it maps the department_id foreign key."
        },
        {
          question: "What does mappedBy do?",
          answer: "mappedBy marks the inverse side of a bidirectional association and names the owning Java attribute on the other entity."
        },
        {
          question: "What is the difference between unidirectional and bidirectional relationships?",
          answer: "A unidirectional relationship exposes navigation from one side, while a bidirectional relationship exposes navigation from both sides. Bidirectional relationships require both Java references to be maintained consistently."
        },
        {
          question: "What is cascade in JPA?",
          answer: "Cascade propagates selected persistence operations from one entity to associated entities. The supported operations include persist, merge, remove, refresh, and detach."
        },
        {
          question: "What is the difference between EAGER and LAZY?",
          answer: "EAGER requires an association to be fetched as part of entity loading, while LAZY permits deferred loading. Neither setting guarantees a particular SQL query shape."
        },
        {
          question: "What is the default fetch type for @ManyToOne?",
          answer: "The JPA default is EAGER. Applications can explicitly request LAZY to reduce unnecessary association loading."
        },
        {
          question: "What is the default fetch type for @OneToMany?",
          answer: "The JPA default is LAZY."
        },
        {
          question: "Why should bidirectional entity graphs be handled carefully in REST APIs?",
          answer: "They can cause recursive JSON serialization, unexpected lazy-loading queries, or LazyInitializationException. DTOs help control the response and the data being fetched."
        },
        {
          question: "How does a many-to-many relationship work in a relational database?",
          answer: "It commonly uses a join table containing foreign keys to both related tables. Each row represents one association between the two entities."
        },
        {
          question: "How would you explain JPA relationships in an interview?",
          answer: "JPA relationships map associations between Java entity classes and relational database structures. The four main types are one-to-one, one-to-many, many-to-one, and many-to-many. JPA annotations describe the mapping, Hibernate can implement that mapping and generate SQL, and foreign keys or join tables represent the associations in the database. Developers must also understand ownership, cascade operations, fetching, and transaction boundaries."
        }
      ]
    },
    {
      id: "summary",
      title: "14. Quick Revision Notes",
      bullets: [
        "JPA maps Java entity relationships to relational database structures.",
        "Hibernate is a popular implementation of the JPA specification.",
        "@OneToOne represents a one-to-one association.",
        "@OneToMany represents one entity associated with multiple entities.",
        "@ManyToOne represents multiple entities associated with one entity.",
        "@ManyToMany commonly uses a join table.",
        "The owning side controls the association mapping.",
        "mappedBy identifies the owning Java attribute.",
        "Cascade propagates persistence operations.",
        "Fetch strategies control association-loading requirements.",
        "Transactions coordinate related database operations.",
        "Database constraints protect data integrity."
      ],
      paragraphs: [
        "Interview-ready answer: JPA relationships allow Java entity classes to represent associations between relational database tables. The four main types are one-to-one, one-to-many, many-to-one, and many-to-many. For example, multiple Employee entities can reference one Department using @ManyToOne and a department_id foreign key. Hibernate can implement the JPA mapping and generate SQL. Correct relationship design also requires understanding the owning side, mappedBy, cascade operations, fetching strategies, and transaction management."
      ]
    }
  ]
};
