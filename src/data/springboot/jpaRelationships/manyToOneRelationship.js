
export const manyToOneRelationship = {
  id: 904,
  title: "Many-to-One Relationship",
  slug: "many-to-one-relationship",
  topicTitle: "JPA Relationships",
  description:
    "Understand foreign-key ownership and many-to-one entity mapping.",
  estimatedTime: "22 min",
  sections: [
    {
      id: "concept",
      title: "What Is Many-to-One?",
      paragraphs: [
        "A many-to-one relationship means multiple records of one entity can reference the same record of another entity. For example, many employees can belong to one department.",
        "In a relational database, this relationship is commonly represented by a foreign-key column in the table on the many side. Each employee row stores the identifier of its department.",
        "In JPA, @ManyToOne maps this association. It is commonly the owning side of a one-to-many/many-to-one relationship because it maps the foreign key directly.",
        "For example, employees 1, 2, and 3 can reference departments 10, 10, and 20 respectively. The department table does not need a separate column for each employee.",
        "A many-to-one association can be unidirectional, where Employee references Department, or bidirectional, where Department also exposes a collection of employees. Add the inverse collection only when the application needs that navigation."
      ],
      code: {
        language: "text",
        code: `Employee (many)                    Department (one)
----------------                    ---------------
id                                  id
name                                name
department_id --------------------> id

Employee 1 ----\
Employee 2 -----+----> Department 10
Employee 3 ---------> Department 20`
      },
      bullets: [
        "Many employees can reference the same department.",
        "The employee table commonly contains department_id.",
        "The department table stores each department once.",
        "@ManyToOne maps the association from the many side.",
        "The association can be unidirectional or bidirectional.",
        "A foreign key protects referential integrity when the database constraint is configured."
      ]
    },
    {
      id: "mapping",
      title: "Employee Mapping",
      paragraphs: [
        "The Employee entity contains a Department reference. The @ManyToOne annotation defines the association, and @JoinColumn specifies the foreign-key column in the employees table.",
        "fetch = FetchType.LAZY requests deferred loading of the department association where supported by the provider. Accessing the association may execute another SQL query if the department has not already been loaded.",
        "optional = false expresses that the association is required in the object model. nullable = false declares that the join column should be non-null in the mapping and schema-generation metadata. Verify that the actual database schema enforces this requirement.",
        "These settings should match the business rules. If an employee is allowed to exist without a department, the mapping and database constraints should permit that state."
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

    @ManyToOne(
        fetch = FetchType.LAZY,
        optional = false
    )
    @JoinColumn(
        name = "department_id",
        nullable = false
    )
    private Department department;

    protected Employee() {
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

    public void setName(String name) {
        this.name = name;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}`
      },
      bullets: [
        "@Entity marks the class as a JPA entity.",
        "@Table specifies the employees table.",
        "@ManyToOne declares the association to Department.",
        "@JoinColumn(name = \"department_id\") maps the foreign-key column.",
        "optional = false expresses that the relationship is required.",
        "nullable = false describes the join-column nullability.",
        "The actual database schema must have the appropriate constraints."
      ]
    },
    {
      id: "database",
      title: "How the Foreign Key Works",
      paragraphs: [
        "The department_id column stores the primary-key value of the referenced department. It does not store the department name or a complete Department object.",
        "When JPA persists an employee, the association is represented in the database by the department identifier. The foreign key can ensure that the referenced department exists.",
        "The database relationship and Java relationship work together: the database stores the foreign-key value, while JPA exposes the association as a Department object."
      ],
      output: `employees
id | name  | department_id
---|-------|--------------
1  | Ravi  | 10
2  | Priya | 10
3  | Arun  | 20

departments
id | name
---|-------------
10 | Engineering
20 | Finance`,
      code: {
        language: "sql",
        code: `SELECT
    e.id,
    e.name,
    d.name AS department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.id;`
      },
      paragraphs: [
        "The SQL JOIN combines employee rows with their referenced department rows. Ravi and Priya both resolve to Engineering because both rows contain department_id = 10.",
        "A foreign key and a non-null constraint enforce different rules. A foreign key ensures that a non-null referenced identifier points to a valid row; a NOT NULL constraint prevents the relationship column from being null."
      ],
      bullets: [
        "department_id references departments.id.",
        "Several employees can reference the same department.",
        "A foreign key prevents references to nonexistent departments when enforced.",
        "NOT NULL is appropriate when every employee must have a department.",
        "An index on department_id may improve joins and department-based employee queries; verify using actual query patterns."
      ]
    },
    {
      id: "access",
      title: "Accessing the Related Entity",
      paragraphs: [
        "After retrieving an employee, application code can navigate to its Department through the getDepartment() method. With lazy loading, accessing the association may trigger another database query.",
        "The employee query and the department query are separate concepts. Hibernate might load the employee first and fetch the department only when its state is required. If the association was already initialized, another query may not be needed.",
        "Accessing an uninitialized lazy association after its persistence context has closed can result in LazyInitializationException. Load the required association inside an appropriate service operation rather than relying on later serialization to load it."
      ],
      code: {
        language: "java",
        code: `Employee employee = employeeRepository
    .findById(id)
    .orElseThrow(() ->
        new EmployeeNotFoundException(id)
    );

// Read an employee field.
System.out.println(employee.getName());

// Accessing the association may trigger SQL.
Department department = employee.getDepartment();

System.out.println(department.getName());`
      },
      paragraphs: [
        "The example assumes EmployeeNotFoundException is defined in the application. Whether the final department access triggers SQL depends on whether the association is initialized and whether the persistence context is available.",
        "For an API that always needs department information, consider a repository query that fetches the department explicitly and returns a DTO from the service."
      ],
      code: {
        language: "java",
        code: `@Query("""
    select e
    from Employee e
    join fetch e.department
    where e.id = :id
    """)
Optional<Employee> findByIdWithDepartment(
    @Param("id") Long id
);`
      },
      bullets: [
        "Use a fetch join when the operation needs the department.",
        "Use @EntityGraph when you want to specify an association fetch plan separately.",
        "Use DTO projections when only selected fields are needed.",
        "Keep required data loading inside an appropriate transaction.",
        "Monitor additional SQL queries to detect N+1 behavior."
      ]
    },
    {
      id: "bidirectional",
      title: "Unidirectional vs Bidirectional Mapping",
      paragraphs: [
        "A unidirectional mapping allows Employee to navigate to Department without Department maintaining an employee collection. This is often enough for employee-management operations.",
        "A bidirectional mapping also allows Department to navigate to its employees. In the usual foreign-key design, Employee remains the owning side, while Department uses mappedBy to identify the department property on Employee.",
        "The mappedBy value is the Java property name, not the database column name. Updating only the inverse collection is not enough to reliably persist an association change. Keep both sides synchronized in application code."
      ],
      code: {
        language: "java",
        code: `// Owning side: Employee

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;

// Inverse side: Department

@OneToMany(mappedBy = "department")
private List<Employee> employees = new ArrayList<>();`
      },
      code: {
        language: "java",
        code: `// Helper methods in Department

public void addEmployee(Employee employee) {
    employees.add(employee);
    employee.setDepartment(this);
}

public void removeEmployee(Employee employee) {
    employees.remove(employee);
    employee.setDepartment(null);
}`
      },
      paragraphs: [
        "These helper methods illustrate synchronizing both sides. The removal example assumes an employee is allowed to have no department; if the association is mandatory, removal must instead reassign the employee or reject the operation.",
        "Avoid creating bidirectional associations unless both navigation directions are useful. Additional collections can complicate JSON serialization, fetching, and entity lifecycle management."
      ]
    },
    {
      id: "service-layer",
      title: "Assigning a Department in Spring Boot",
      paragraphs: [
        "A common operation is creating an employee and assigning an existing department. The client should usually send the department ID instead of an entire nested Department entity. The service loads the department, checks that it exists, and assigns it to the employee.",
        "A service transaction groups the lookup and persistence operation into one unit of work. Database constraints remain important because concurrent requests or other application paths can still violate assumptions unless the database enforces them."
      ],
      code: {
        language: "java",
        code: `public record EmployeeRequest(
    String name,
    Long departmentId
) {}

public record EmployeeResponse(
    Long id,
    String name,
    Long departmentId,
    String departmentName
) {}`
      },
      code: {
        language: "java",
        code: `@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional
    public EmployeeResponse create(EmployeeRequest request) {
        Department department = departmentRepository
            .findById(request.departmentId())
            .orElseThrow(() ->
                new DepartmentNotFoundException(
                    request.departmentId()
                )
            );

        Employee employee = new Employee();
        employee.setName(request.name());
        employee.setDepartment(department);

        Employee saved = employeeRepository.save(employee);

        return new EmployeeResponse(
            saved.getId(),
            saved.getName(),
            department.getId(),
            department.getName()
        );
    }
}`
      },
      paragraphs: [
        "This example assumes the DTOs, entities, repositories, and custom exception are defined and that the entity provides the shown setters. @RequiredArgsConstructor is provided by Lombok.",
        "In production, validate the request with Bean Validation, such as @NotBlank on name and @NotNull on departmentId. Add authorization checks if users may assign employees only to particular departments.",
        "The response DTO controls which information the API returns and avoids exposing the complete JPA entity graph."
      ],
      bullets: [
        "Accept the referenced department ID in the request DTO.",
        "Load the department through the repository.",
        "Return an appropriate error when the department does not exist.",
        "Assign the managed department entity to the employee.",
        "Use a service transaction for the operation.",
        "Return a response DTO instead of the entity itself."
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      bullets: [
        "Use LAZY fetching when appropriate and load required data intentionally.",
        "Use DTOs to shape API requests and responses.",
        "Avoid unnecessary bidirectional associations.",
        "Ensure referenced departments exist before assigning them to employees.",
        "Use database foreign keys and nullability constraints that match business rules.",
        "Avoid cascading removal from Employee to a shared Department without a clear lifecycle reason.",
        "Inspect generated SQL and watch for N+1 query problems.",
        "Use a fetch join, entity graph, or DTO projection for operations that need related data.",
        "Add an index on the foreign-key column when justified by query patterns and database execution plans.",
        "Test creation, reassignment, deletion, and constraint behavior with realistic data."
      ],
      paragraphs: [
        "Remember that a many-to-one association is often the owning side because it maps the foreign key. That does not mean every mapping should be bidirectional or every association should be eagerly loaded.",
        "In production, annotation metadata, database constraints, transaction boundaries, fetch plans, and API DTOs should all support the same business rules."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Assuming @ManyToOne is LAZY by default: its Jakarta Persistence default is EAGER.",
        "Assuming nullable = false automatically migrates an existing database: verify the actual schema and apply a reviewed migration.",
        "Setting optional = false when the business permits an employee without a department.",
        "Assigning a nonexistent department ID without checking that the department exists.",
        "Returning entities directly from REST controllers and triggering lazy loading during serialization.",
        "Adding CascadeType.REMOVE to a relationship where the referenced department is shared.",
        "Creating a bidirectional relationship when only one-way navigation is required.",
        "Ignoring N+1 queries when iterating over employees and reading department fields.",
        "Updating only the inverse side of a bidirectional association.",
        "Assuming a foreign-key column stores a department name rather than its referenced identifier."
      ]
    },
    {
      id: "testing",
      title: "Testing a Many-to-One Relationship",
      paragraphs: [
        "A relationship integration test should verify that the foreign-key association is persisted and can be loaded again. Save a department, associate an employee with it, flush pending changes, clear the persistence context, and reload the employee.",
        "Flushing sends pending changes to the database. Clearing the persistence context helps the test verify persisted state instead of simply reusing the original in-memory entity instance."
      ],
      code: {
        language: "java",
        code: `@DataJpaTest
class EmployeeRelationshipTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldPersistDepartmentAssociation() {
        Department department = new Department();
        department.setName("Engineering");
        department = departmentRepository.save(department);

        Employee employee = new Employee();
        employee.setName("Ravi");
        employee.setDepartment(department);
        employee = employeeRepository.save(employee);

        Long employeeId = employee.getId();
        Long departmentId = department.getId();

        entityManager.flush();
        entityManager.clear();

        Employee reloaded = employeeRepository
            .findByIdWithDepartment(employeeId)
            .orElseThrow();

        assertEquals(
            departmentId,
            reloaded.getDepartment().getId()
        );
    }
}`
      },
      paragraphs: [
        "This test assumes the entity setters and repository query defined earlier. The required imports and test database configuration are omitted for brevity.",
        "Additional tests should verify that a required department cannot be omitted, nonexistent departments are rejected, reassignment updates the foreign key, and deleting a referenced department follows the intended business rules."
      ],
      bullets: [
        "Test that a saved employee references the correct department.",
        "Test reassignment from one department to another.",
        "Test nullability and foreign-key constraints.",
        "Test missing department handling in the service.",
        "Test query counts for endpoints that read department details.",
        "Verify behavior against the production database engine where database-specific constraints matter."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is a many-to-one relationship?",
          answer: "It means multiple records of one entity can reference the same record of another entity. For example, many employees can belong to one department."
        },
        {
          question: "Why is @ManyToOne commonly the owning side?",
          answer: "It normally maps the foreign-key column in the table on the many side. In an Employee-Department mapping, employees.department_id references departments.id."
        },
        {
          question: "What is the default fetch type of @ManyToOne?",
          answer: "The Jakarta Persistence default is EAGER. Applications can explicitly configure LAZY fetching when suitable."
        },
        {
          question: "What does @JoinColumn do?",
          answer: "It configures the database join column used by the association. In a typical many-to-one mapping, it specifies the foreign-key column in the many-side table."
        },
        {
          question: "What is the difference between optional = false and nullable = false?",
          answer: "optional = false expresses that the association is required in the object model. nullable = false describes join-column nullability in mapping and schema-generation metadata. The actual database constraint must be verified separately."
        },
        {
          question: "What happens when an employee references department ID 10?",
          answer: "The employee's department_id foreign key stores the identifier 10. If the foreign-key constraint is enforced, department 10 must exist when the relationship is stored."
        },
        {
          question: "Can a many-to-one relationship be unidirectional?",
          answer: "Yes. Employee can reference Department without Department exposing an employee collection. Add a bidirectional mapping only when navigation from Department to Employee is needed."
        },
        {
          question: "What does mappedBy mean on the inverse side?",
          answer: "It identifies the owning-side Java property. In this example, Department can use @OneToMany(mappedBy = \"department\") because Employee has a property named department."
        },
        {
          question: "How can a lazy many-to-one association cause LazyInitializationException?",
          answer: "If the association remains uninitialized and code accesses it after the persistence context closes, Hibernate may be unable to load it. Fetch the required data inside the appropriate service operation."
        },
        {
          question: "How can you avoid N+1 queries when reading department details?",
          answer: "Use a fetch join, entity graph, DTO projection, or suitable batching strategy. Inspect generated SQL and query counts to verify the result."
        },
        {
          question: "Should CascadeType.REMOVE normally be used from Employee to Department?",
          answer: "Usually not when departments are shared by multiple employees. Deleting one employee should not delete a department that other employees reference."
        },
        {
          question: "How should a REST API assign a department to an employee?",
          answer: "Accept the department ID in a request DTO, load and validate the department in the service layer, assign the managed entity, persist the employee, and return a response DTO."
        },
        {
          question: "How do you test a many-to-one association?",
          answer: "Persist the department and employee, flush changes, clear the persistence context, reload the employee, and verify that the expected department ID is associated with it."
        }
      ]
    },
    {
      id: "summary",
      title: "Quick Revision Notes",
      bullets: [
        "Many-to-one means many records reference one related record.",
        "The many-side table commonly stores the foreign key.",
        "@ManyToOne is commonly the owning side of a one-to-many/many-to-one association.",
        "@JoinColumn maps the foreign-key column.",
        "@ManyToOne defaults to EAGER fetching in Jakarta Persistence.",
        "LAZY fetching can reduce unnecessary loading but requires a deliberate fetch plan.",
        "optional = false and nullable = false describe related but distinct constraints.",
        "Use DTOs for REST APIs and avoid exposing complex entity graphs.",
        "Use foreign keys and database constraints to protect integrity.",
        "Test association persistence, reassignment, constraints, and query performance."
      ],
      paragraphs: [
        "Interview-ready answer: A many-to-one relationship allows multiple records to reference one related record, such as many employees belonging to one department. In JPA, I use @ManyToOne and @JoinColumn to map the foreign key on the employee table. I choose fetch behavior deliberately, validate the referenced department in the service layer, enforce database constraints, and use DTOs and explicit fetch plans to avoid unnecessary queries and lazy-loading problems."
      ]
    }
  ]
};
