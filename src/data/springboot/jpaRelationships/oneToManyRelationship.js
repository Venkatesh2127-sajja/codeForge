
export const oneToManyRelationship = {
  id: 903,
  title: "One-to-Many Relationship",
  slug: "one-to-many-relationship",
  topicTitle: "JPA Relationships",
  description:
    "Learn how to map one-to-many relationships using Spring Data JPA, understand foreign keys, owning and inverse sides, cascade operations, bidirectional synchronization, and practical database persistence.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "concept",
      title: "1. What Is One-to-Many?",
      paragraphs: [
        "A one-to-many relationship means one entity can be associated with multiple entities of another type. For example, one department can contain many employees, one customer can have multiple orders, and one category can contain multiple products.",
        "In a typical relational database, the many-side table stores a foreign key referencing the one-side table. For a Department–Employee relationship, employees.department_id references departments.id.",
        "In Java, Department can contain a collection of Employee objects, while each Employee can reference its Department. This is a bidirectional relationship because both entities can navigate to the other.",
        "JPA supports both unidirectional and bidirectional one-to-many relationships. A bidirectional mapping uses @OneToMany on one side and @ManyToOne on the other. In this common mapping, the @ManyToOne side owns the association."
      ],
      code: {
        language: "text",
        code: `Department
    |
    | 1
    |
    |------ Employee A
    |------ Employee B
    |------ Employee C
           *
One department -> many employees

departments table:
id | name
1  | Engineering

employees table:
id | name  | department_id
10 | Ravi  | 1
11 | Priya | 1
12 | Arun  | 1

employees.department_id -> departments.id`
      },
      bullets: [
        "One-to-many represents one parent associated with multiple child entities.",
        "The Java collection is commonly List<Employee> or Set<Employee>.",
        "The database normally uses a foreign key on the many side.",
        "The relationship can be unidirectional or bidirectional.",
        "The Java relationship and the database foreign-key relationship must be mapped consistently."
      ]
    },
    {
      id: "mapping",
      title: "2. Mapping Department to Employees",
      paragraphs: [
        "The Department entity uses @OneToMany to represent its collection of employees. The mappedBy attribute points to the department field in Employee, which owns the relationship.",
        "CascadeType.PERSIST means that when a new Department is persisted, the persist operation propagates to employees associated with it. The owning-side reference must still be set correctly so the relationship is represented in the database.",
        "The collection is initialized with ArrayList so newly created Department instances have a usable collection instead of a null reference.",
        "The following example shows a complete Department entity, including its identifier, name, collection, and helper methods."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(
        mappedBy = "department",
        cascade = CascadeType.PERSIST
    )
    private List<Employee> employees = new ArrayList<>();

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

    public List<Employee> getEmployees() {
        return employees;
    }

    public void addEmployee(Employee employee) {
        if (employee == null) {
            throw new IllegalArgumentException(
                "Employee must not be null"
            );
        }

        if (!employees.contains(employee)) {
            employees.add(employee);
        }

        employee.setDepartment(this);
    }

    public void removeEmployee(Employee employee) {
        if (employee == null) {
            return;
        }

        employees.remove(employee);

        if (employee.getDepartment() == this) {
            employee.setDepartment(null);
        }
    }
}`
      },
      bullets: [
        "@Entity marks Department as a JPA entity.",
        "@Table(name = \"departments\") specifies the table name.",
        "@Id identifies the primary key.",
        "@OneToMany maps the collection of employees.",
        "mappedBy = \"department\" refers to Employee.department, not a database column.",
        "CascadeType.PERSIST propagates persist operations; it does not automatically propagate every possible operation.",
        "The removal helper assumes an employee is allowed to have no department."
      ]
    },
    {
      id: "owning-side",
      title: "3. The Employee Side: Owning the Relationship",
      paragraphs: [
        "Employee uses @ManyToOne to reference its Department. The @JoinColumn annotation maps the department_id foreign-key column in the employees table.",
        "This is the owning side because Employee.department defines the association mapping. The Department collection is the inverse side because it declares mappedBy = \"department\".",
        "Updating only Department.employees is not enough to guarantee that the foreign-key relationship will be updated. The owning attribute employee.department must point to the correct Department.",
        "FetchType.LAZY requests lazy fetching for the department association. The actual SQL and loading behavior depend on the JPA provider and the way the association is accessed."
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

    public Employee(String name) {
        this.name = name;
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
      bullets: [
        "@ManyToOne represents many employees belonging to one department.",
        "@JoinColumn(name = \"department_id\") maps the foreign key.",
        "Employee.department owns the association in this bidirectional mapping.",
        "The foreign key normally resides in employees, not departments.",
        "A nullable foreign key permits an employee without a department; a non-null foreign key requires a valid department assignment."
      ]
    },
    {
      id: "keeping-both-sides",
      title: "4. Keep Both Sides in Sync",
      paragraphs: [
        "In a bidirectional relationship, two Java references describe the same association: Department.employees and Employee.department. JPA does not automatically synchronize these two in-memory references when application code changes one of them.",
        "A helper method such as addEmployee should update both references. This keeps the object graph consistent and ensures that the owning-side attribute is set.",
        "The following example demonstrates the problem caused by updating only the inverse collection."
      ],
      code: {
        language: "java",
        code: `Department department = new Department("Engineering");
Employee employee = new Employee("Ravi");

// Incorrect: only updates the inverse collection.
department.getEmployees().add(employee);

// employee.getDepartment() is still null.`
      },
      paragraphs: [
        "Use the entity's helper method instead of modifying the collection directly. The helper method shown in the Department entity updates both sides."
      ],
      code: {
        language: "java",
        code: `Department department = new Department("Engineering");
Employee employee = new Employee("Ravi");

// Correct: updates both sides.
department.addEmployee(employee);

// The employee now references the department.
System.out.println(
    employee.getDepartment().getName()
);`
      },
      bullets: [
        "Always set the owning-side reference.",
        "Synchronize the inverse collection when maintaining a bidirectional association.",
        "Avoid exposing collection mutations that bypass helper methods.",
        "Ensure removal behavior matches the business rules and database constraints."
      ]
    },
    {
      id: "cascade-types",
      title: "5. Understanding Cascade Types",
      paragraphs: [
        "Cascade determines whether a persistence operation applied to one entity propagates to associated entities. It does not decide which side owns the relationship.",
        "CascadeType.PERSIST is useful when creating a new Department together with new Employee entities. CascadeType.MERGE propagates merge operations, while CascadeType.REMOVE propagates removal operations. CascadeType.ALL includes all standard JPA cascade operations.",
        "CascadeType.REMOVE must be used carefully. Employees may have independent lifecycles, so deleting a department should not automatically delete employees unless that behavior is intended by the domain.",
        "Orphan removal is a separate setting. With orphanRemoval = true on an appropriate one-to-many relationship, removing a managed child from the relationship can cause the child entity to be deleted when changes are synchronized. This is different from simply clearing a foreign key."
      ],
      code: {
        language: "java",
        code: `// Persist new employees when the department is persisted.
@OneToMany(
    mappedBy = "department",
    cascade = CascadeType.PERSIST
)
private List<Employee> employees = new ArrayList<>();`
      },
      bullets: [
        "PERSIST: propagates persist.",
        "MERGE: propagates merge.",
        "REMOVE: propagates remove.",
        "REFRESH: propagates refresh.",
        "DETACH: propagates detach.",
        "ALL: includes all five standard cascade types above.",
        "Cascade settings do not automatically synchronize both sides of the association.",
        "Use orphanRemoval only when the child lifecycle belongs to the parent relationship."
      ]
    },
    {
      id: "persisting-entities",
      title: "6. Persisting a Department with Employees",
      paragraphs: [
        "With CascadeType.PERSIST configured on Department.employees, new employees can be persisted through the department when the department is persisted. Each employee must still reference the department through Employee.department.",
        "The example uses a service-layer transaction to create a department and two employees. The helper method sets the owning association for each employee before persistence.",
        "The example assumes DepartmentRepository and EmployeeRepository are Spring Data JPA repositories and that the entity mappings shown earlier are in place."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Transactional
    public Department createDepartment() {
        Department department =
            new Department("Engineering");

        Employee first = new Employee("Ravi");
        Employee second = new Employee("Priya");

        department.addEmployee(first);
        department.addEmployee(second);

        // CascadeType.PERSIST propagates persistence
        // to the new employees.
        return departmentRepository.save(department);
    }
}`
      },
      paragraphs: [
        "Spring Data JPA's save method chooses persist or merge based on its entity-state detection strategy. In this example, the department is new, so the expected operation is persistence of the new department and, through the configured cascade, its new employees.",
        "The database writes are generally synchronized at flush or transaction commit, not necessarily at the exact line where save is called. Generated SQL order and identifier behavior depend on the provider and database."
      ],
      bullets: [
        "Use @Transactional when related writes must succeed or fail together.",
        "Set the owning-side relationship before persistence.",
        "Configure cascade only when the lifecycle semantics justify it.",
        "Use repository methods to retrieve and update existing entities in normal application workflows.",
        "Avoid assuming that save always executes SQL immediately."
      ]
    },
    {
      id: "unidirectional-vs-bidirectional",
      title: "7. Unidirectional vs Bidirectional One-to-Many",
      paragraphs: [
        "A unidirectional relationship lets the application navigate from Department to Employee only if the mapping is defined that way. A bidirectional relationship allows navigation from Department to its employees and from Employee to its department.",
        "The common bidirectional mapping uses Department.employees with mappedBy and Employee.department with @ManyToOne and @JoinColumn. This naturally represents the foreign key on the many side.",
        "A unidirectional @OneToMany mapping can also be used. Depending on the mapping, it may use a join table or an explicitly configured join column. The schema and SQL behavior differ from the common bidirectional foreign-key mapping.",
        "Prefer the simplest relationship that supports the application's navigation requirements. Bidirectional associations require more care when keeping the object graph synchronized."
      ],
      code: {
        language: "java",
        code: `// Bidirectional mapping

// Department.java
@OneToMany(mappedBy = "department")
private List<Employee> employees = new ArrayList<>();

// Employee.java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;`
      },
      bullets: [
        "Unidirectional: one navigation path is mapped.",
        "Bidirectional: both entities expose the association.",
        "mappedBy is used on the inverse side of a bidirectional association.",
        "A unidirectional @OneToMany does not automatically have the same schema mapping as this bidirectional example.",
        "Do not introduce a bidirectional relationship solely because a foreign key exists."
      ]
    },
    {
      id: "repository-and-retrieval",
      title: "8. Retrieving Employees Through a Department",
      paragraphs: [
        "Once the relationship is persisted, application code can retrieve a Department and navigate its employees. The collection's loading behavior depends on its fetch strategy and the persistence context.",
        "By default, @OneToMany is lazy. Accessing the collection while the entity is managed may trigger another SQL query. Accessing an uninitialized lazy collection after the persistence context has closed can result in LazyInitializationException.",
        "For REST APIs, consider fetching the required data within a transaction and mapping it to a DTO rather than exposing entity associations directly."
      ],
      code: {
        language: "java",
        code: `public interface DepartmentRepository
        extends JpaRepository<Department, Long> {
}`
      },
      paragraphs: [
        "A service method can retrieve a department and map the required fields while the persistence context is available."
      ],
      code: {
        language: "java",
        code: `@Transactional(readOnly = true)
public DepartmentSummary getDepartmentSummary(Long id) {
    Department department = departmentRepository.findById(id)
        .orElseThrow(() ->
            new IllegalArgumentException(
                "Department not found"
            )
        );

    List<String> employeeNames = department.getEmployees()
        .stream()
        .map(Employee::getName)
        .toList();

    return new DepartmentSummary(
        department.getId(),
        department.getName(),
        employeeNames
    );
}`
      },
      paragraphs: [
        "DepartmentSummary is an application DTO that contains only the information the API needs. Define it as a record or class in your project. For example, a record can contain Long id, String name, and List<String> employeeNames.",
        "For paginated or high-volume use cases, avoid blindly loading a large collection. A DTO projection, dedicated repository query, or carefully selected fetch plan may be more efficient."
      ],
      bullets: [
        "Load required relationships intentionally.",
        "Use DTOs to avoid accidental lazy loading and recursive JSON serialization.",
        "Watch for N+1 queries when accessing collections across many parent entities.",
        "Use pagination or targeted queries when a department may contain many employees."
      ]
    },
    {
      id: "common-mistakes",
      title: "9. Common Mistakes",
      paragraphs: [
        "One-to-many bugs often come from confusing the Java association with the database foreign key, forgetting the owning side, or choosing cascade settings without considering entity lifecycles."
      ],
      bullets: [
        "Using the wrong property name in mappedBy.",
        "Forgetting to set Employee.department.",
        "Assuming that updating Department.employees alone guarantees a foreign-key update.",
        "Using CascadeType.ALL without considering what happens when a parent is removed.",
        "Assuming cascade automatically synchronizes both sides.",
        "Clearing a non-nullable department association without assigning a replacement.",
        "Returning bidirectional entities directly from REST controllers and causing recursive serialization.",
        "Accessing lazy collections outside the persistence context.",
        "Loading a large collection when only a small subset of employee data is needed.",
        "Assuming the database schema has the desired constraints without checking migrations or the actual schema."
      ]
    },
    {
      id: "best-practices",
      title: "10. One-to-Many Best Practices",
      bullets: [
        "Prefer a conventional bidirectional mapping with @ManyToOne on the many side when it fits the domain.",
        "Use mappedBy to identify the owning attribute in a bidirectional mapping.",
        "Keep both Java references synchronized using helper methods.",
        "Choose cascade types based on entity lifecycle requirements.",
        "Use orphanRemoval only when removing a child from the relationship should delete that child.",
        "Use @Transactional to coordinate related persistence operations.",
        "Use DTOs for API responses rather than exposing entity graphs directly.",
        "Plan fetching carefully to prevent N+1 queries and oversized collections.",
        "Validate business rules before adding, removing, or reassigning employees.",
        "Enforce foreign-key and nullability rules in the database where appropriate."
      ]
    },
    {
      id: "interview",
      title: "11. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does @OneToMany represent?",
          answer: "It represents an association where one entity is related to multiple entities of another type. For example, one Department can have many Employee entities."
        },
        {
          question: "Where is the foreign key normally stored?",
          answer: "In a conventional one-to-many/many-to-one mapping, the foreign key is stored on the many side, such as employees.department_id referencing departments.id."
        },
        {
          question: "What is mappedBy in a one-to-many relationship?",
          answer: "mappedBy identifies the owning Java attribute on the other entity. In Department, mappedBy = \"department\" refers to Employee.department."
        },
        {
          question: "Which side owns a bidirectional one-to-many relationship?",
          answer: "In the conventional mapping, the @ManyToOne side owns the relationship because it maps the foreign key using @JoinColumn."
        },
        {
          question: "Why should both sides be synchronized?",
          answer: "The two Java references are separate fields. Updating both keeps the in-memory object graph consistent, while updating the owning side ensures the relationship is represented correctly for persistence."
        },
        {
          question: "What does CascadeType.PERSIST do?",
          answer: "It propagates a persist operation from the parent entity to associated entities. For example, persisting a new Department can persist its new employees when the cascade is configured."
        },
        {
          question: "Does cascade persist set the employee's department automatically?",
          answer: "No. Cascade propagates a persistence operation; it does not automatically synchronize Employee.department with Department.employees."
        },
        {
          question: "What is the difference between CascadeType.REMOVE and orphanRemoval?",
          answer: "CascadeType.REMOVE propagates removal of the parent to associated entities. orphanRemoval can delete a child when it is removed from the parent's relationship, subject to the mapping and persistence semantics."
        },
        {
          question: "What is the default fetch type for @OneToMany?",
          answer: "The default fetch type for @OneToMany is LAZY. The collection is generally loaded when accessed, although exact SQL behavior depends on the provider and query."
        },
        {
          question: "What is the default fetch type for @ManyToOne?",
          answer: "The JPA default for @ManyToOne is EAGER. Applications often explicitly configure LAZY to avoid unnecessarily loading related entities."
        },
        {
          question: "What is the difference between unidirectional and bidirectional mapping?",
          answer: "A unidirectional mapping provides navigation from one side, while a bidirectional mapping provides navigation from both sides. Bidirectional mappings require the application to maintain both references consistently."
        },
        {
          question: "Why can LazyInitializationException occur?",
          answer: "It can occur when code accesses an uninitialized lazy association after the persistence context has closed. Fetch or map the required data within an appropriate transaction."
        },
        {
          question: "Why should entities not always be returned directly from REST controllers?",
          answer: "Bidirectional relationships can cause recursive JSON serialization, and lazy associations can trigger unexpected queries or exceptions. DTOs provide a controlled API representation."
        },
        {
          question: "Can one department have many employees if the foreign key is in employees?",
          answer: "Yes. Multiple employee rows can reference the same department ID. That repeated foreign-key value represents the one-to-many relationship."
        },
        {
          question: "How would you explain @OneToMany in an interview?",
          answer: "A one-to-many association allows one entity to reference multiple entities of another type. For example, a Department has many Employees. In a typical bidirectional JPA mapping, Department uses @OneToMany(mappedBy = \"department\"), while Employee uses @ManyToOne and @JoinColumn(name = \"department_id\"). The employee side owns the foreign-key mapping, and helper methods keep both Java references synchronized."
        }
      ]
    },
    {
      id: "summary",
      title: "12. Quick Revision Notes",
      bullets: [
        "One-to-many means one parent can be associated with multiple child entities.",
        "The foreign key is normally stored on the many side.",
        "Department uses @OneToMany for its employee collection.",
        "Employee uses @ManyToOne and @JoinColumn for the foreign-key mapping.",
        "mappedBy points to the owning Java attribute, not the database column.",
        "The @ManyToOne side owns the conventional bidirectional mapping.",
        "Keep both Java references synchronized.",
        "Cascade controls persistence-operation propagation, not relationship ownership.",
        "Use DTOs and intentional fetching for REST APIs.",
        "Choose cascade and orphan-removal settings according to the domain lifecycle."
      ],
      paragraphs: [
        "Interview-ready answer: A one-to-many relationship means one entity can be associated with multiple entities of another type. For example, a Department can have many Employees. In a typical bidirectional JPA mapping, Department uses @OneToMany(mappedBy = \"department\") and Employee uses @ManyToOne with @JoinColumn(name = \"department_id\"). The Employee side owns the relationship because it maps the foreign key. Both Java references should be synchronized, and cascade operations should be configured according to the application's lifecycle requirements."
      ]
    }
  ]
};
