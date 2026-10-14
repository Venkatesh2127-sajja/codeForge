
export const databaseFundamentals = {
  id: 1001,
  title: "Database Fundamentals in Spring Boot",
  slug: "database-fundamentals",
  topicTitle: "Database & Transactions",
  description:
    "Understand relational databases, Spring Boot database integration, JDBC, JPA, Hibernate, repositories, transactions, and the flow of data between application layers and a database.",
  estimatedTime: "30 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction",

      paragraphs: [
        "A database stores application data persistently. Unlike ordinary in-memory variables, database records can remain available after an application restarts, provided the database itself and its stored data remain intact.",
        "Spring Boot applications can work with relational databases such as MySQL, PostgreSQL, Oracle, and other supported database systems. A relational database organizes data into tables containing rows and columns.",
        "Spring Boot provides configuration and integration with database technologies. Spring Data JPA simplifies persistence operations through repository interfaces, while Hibernate is commonly used as the JPA provider that maps Java objects to relational data and generates SQL.",
        "JDBC stands for Java Database Connectivity. It is a Java API for communicating with databases. Database drivers implement JDBC for particular database systems, such as MySQL Connector/J for MySQL.",
        "A typical layered application sends a request from the controller to the service, then to a repository. The persistence provider and JDBC infrastructure communicate with the database. The result is returned through the application layers to the caller.",
        "Understanding the difference between a database, JDBC, JPA, Hibernate, and Spring Data JPA is important when designing applications and troubleshooting database errors."
      ],

      bullets: [
        "Database: stores persistent application data.",
        "JDBC: provides Java APIs for database connectivity.",
        "JPA: defines a standard for object-relational persistence.",
        "Hibernate: commonly implements the JPA specification.",
        "Spring Data JPA: simplifies repository development.",
        "DataSource: provides access to database connections.",
        "Repository: abstracts common persistence operations."
      ]
    },

    {
      id: "architecture",
      title: "Database Request Flow",

      paragraphs: [
        "A database request usually passes through several application layers. Each layer has a responsibility, helping developers separate HTTP handling, business rules, and persistence logic.",
        "The controller receives the HTTP request and invokes a service. The service applies business rules and calls a repository to read or modify data.",
        "A Spring Data JPA repository delegates persistence work to the JPA infrastructure. When needed, Hibernate translates entity operations into SQL. JDBC and the database driver provide the communication path to the database.",
        "For example, when an API creates an employee, the service can construct an Employee entity and call employeeRepository.save(employee). The persistence infrastructure executes the necessary SQL, and the saved entity can be returned to the service.",
        "The exact SQL execution timing depends on the operation, transaction boundaries, and JPA flush behavior. A call to save does not always mean that SQL has already been committed to the database."
      ],

      code: {
        language: "text",
        code: `Client
   |
   | HTTP request
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
JPA Provider (commonly Hibernate)
   |
   v
JDBC + Database Driver
   |
   v
Relational Database
   |
   | Query result / update result
   v
Application layers
   |
   v
Client receives HTTP response`
      },

      bullets: [
        "Controller: handles the HTTP request and response.",
        "Service: coordinates business operations.",
        "Repository: provides data-access methods.",
        "JPA provider: manages entity persistence and SQL generation.",
        "JDBC driver: communicates with the selected database.",
        "Database: executes SQL and stores or retrieves data.",
        "The result travels back through the relevant application layers."
      ]
    },

    {
      id: "repository",
      title: "Example Repository",

      paragraphs: [
        "A repository provides an abstraction for database operations. Instead of manually writing the implementation of common CRUD operations, developers can extend a Spring Data repository interface.",
        "CRUD stands for Create, Read, Update, and Delete. JpaRepository provides methods for common persistence tasks, including save, findById, findAll, and deleteById.",
        "The generic parameters specify the entity type and the entity's identifier type. In JpaRepository<Employee, Long>, Employee is the entity and Long is the primary-key type.",
        "Spring Data JPA generates the repository implementation at runtime. The repository must be discoverable by Spring, and the Employee entity must be mapped correctly for the persistence operation to work."
      ],

      code: {
        language: "java",
        code: `import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}`
      },

      bullets: [
        "save(employee): saves or updates an entity according to JPA persistence rules.",
        "findById(id): looks up an entity by its identifier and returns an Optional.",
        "findAll(): retrieves all matching entities, which may be expensive for large tables.",
        "deleteById(id): requests deletion by identifier.",
        "Derived query methods can be created using supported method names such as findByName(String name).",
        "The entity and repository must be configured within the application's Spring scanning setup."
      ]
    },

    {
      id: "why",
      title: "Why Use a Database?",

      paragraphs: [
        "Applications use databases when information must be stored, queried, shared, and maintained reliably. A database provides capabilities that ordinary application variables and simple in-memory collections do not provide on their own.",
        "Relational databases support constraints and relationships between tables. Transactions help coordinate related operations, while indexes can improve the performance of suitable queries.",
        "Databases also require operational practices such as backups, schema migrations, access controls, monitoring, and recovery planning."
      ],

      bullets: [
        "Persist information between application restarts.",
        "Query, sort, filter, and aggregate large collections of records.",
        "Enforce constraints such as primary keys, foreign keys, and uniqueness.",
        "Support transactions and concurrent operations.",
        "Represent relationships between entities and tables.",
        "Use indexes to improve suitable query patterns.",
        "Support backup, recovery, migration, and access-control processes."
      ]
    },

    {
      id: "relational-basics",
      title: "Relational Database Basics",

      paragraphs: [
        "A relational database organizes data into tables. Each table represents a particular type of information, such as employees, departments, products, or orders.",
        "A row represents one record, while a column represents an attribute of that record. A primary key uniquely identifies a row. A foreign key can reference a key in another table to represent a relationship.",
        "For example, an employees table might contain id, name, and department_id columns. The department_id column could reference the id column of a departments table.",
        "Relational databases use SQL, which stands for Structured Query Language, to define schemas, insert data, retrieve records, update records, and delete records."
      ],

      code: {
        language: "sql",
        code: `CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department_id BIGINT
);

INSERT INTO employees (name, department_id)
VALUES ('Ravi', 10);

SELECT id, name, department_id
FROM employees;

UPDATE employees
SET name = 'Ravi Kumar'
WHERE id = 1;

DELETE FROM employees
WHERE id = 1;`
      },

      bullets: [
        "Table: a collection of records of a particular structure.",
        "Row: one record in a table.",
        "Column: one attribute of a record.",
        "Primary key: uniquely identifies a row.",
        "Foreign key: enforces a reference to a key in another table.",
        "SQL: language used to work with relational database schemas and data."
      ]
    },

    {
      id: "jdbc-jpa-hibernate",
      title: "JDBC vs JPA vs Hibernate vs Spring Data JPA",

      paragraphs: [
        "These technologies work at different levels of the database access stack, so they should not be treated as interchangeable terms.",
        "JDBC is a lower-level Java API for executing SQL and processing database results. Developers using JDBC directly generally work with connections, statements, and result sets.",
        "JPA is a specification that defines object-relational persistence concepts and APIs. Hibernate is a common implementation of JPA that manages entity state and translates persistence operations into SQL.",
        "Spring Data JPA builds on JPA and provides repository abstractions, reducing the boilerplate required for common data-access operations.",
        "The right choice depends on the application's needs. Spring Data JPA is convenient for many CRUD applications, while direct JDBC or explicit SQL can be appropriate for specialized queries or performance-sensitive operations."
      ],

      code: {
        language: "text",
        code: `Spring Data JPA
   |
   v
JPA API
   |
   v
Hibernate (JPA implementation)
   |
   v
JDBC API
   |
   v
Database-specific JDBC driver
   |
   v
Database server`
      },

      bullets: [
        "JDBC: low-level database connectivity API.",
        "JPA: persistence specification.",
        "Hibernate: a JPA implementation and ORM framework.",
        "Spring Data JPA: repository abstraction built around JPA.",
        "DataSource: abstraction used to obtain JDBC connections."
      ]
    },

    {
      id: "entity-basics",
      title: "What Is an Entity?",

      paragraphs: [
        "An entity is a Java class mapped to persistent data in a relational database. In a typical JPA application, @Entity marks the class as a persistent entity, and @Id identifies its primary key.",
        "The entity's fields are mapped to database columns according to JPA mapping rules and any explicit annotations. @Table can specify a table name, while @Column can specify details about an individual column.",
        "A JPA entity needs an accessible no-argument constructor. A protected constructor is commonly used when application code should create instances through other constructors.",
        "Entity mappings and the actual database schema must remain compatible. Schema validation or integration tests can help detect mismatches."
      ],

      code: {
        language: "java",
        code: `import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(nullable = false)
    private String name;

    protected Employee() {
        // Required by JPA.
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

    public void setName(String name) {
        this.name = name;
    }
}`
      },

      bullets: [
        "@Entity marks a class as a JPA entity.",
        "@Id defines the entity identifier.",
        "@GeneratedValue configures identifier generation.",
        "@Table maps the entity to a specified table.",
        "@Column can define column mapping details.",
        "This example uses jakarta.persistence imports, as in modern Spring Boot 3 applications."
      ]
    },

    {
      id: "transactions",
      title: "Introduction to Database Transactions",

      paragraphs: [
        "A database transaction groups operations into a unit of work. A transaction can commit its changes when successful or roll them back when a failure requires the changes to be undone.",
        "Transactions are important when a business operation changes multiple pieces of related data. For example, transferring money between accounts requires the debit and credit operations to succeed or fail together.",
        "Spring provides declarative transaction management through @Transactional. It is commonly applied at a service-layer method when several persistence operations form one business operation.",
        "A transaction does not automatically make every query fast or prevent every concurrency issue. Isolation, locking, transaction boundaries, and database constraints still matter.",
        "Spring's default transaction behavior generally rolls back on unchecked exceptions and Errors, but not automatically on every checked exception. Explicit rollback rules can be configured when needed."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeManagementService {

    private final EmployeeRepository employeeRepository;

    public EmployeeManagementService(
            EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employee createEmployee(String name) {
        Employee employee = new Employee(name);
        return employeeRepository.save(employee);
    }
}`
      },

      bullets: [
        "A transaction defines a unit of database work.",
        "Commit makes successful transactional changes durable according to database guarantees.",
        "Rollback undoes transactional changes that have not been committed.",
        "@Transactional is commonly used around service-layer business operations.",
        "Transaction behavior depends on transaction boundaries, propagation, isolation, and rollback rules."
      ]
    },

    {
      id: "configuration-overview",
      title: "Database Configuration in Spring Boot",

      paragraphs: [
        "Spring Boot uses configuration properties to determine how the application connects to a database. For a typical JDBC datasource, important settings include the JDBC URL, username, and password.",
        "The database URL identifies the server, port, and database name. Credentials identify the database account used by the application.",
        "Configuration can be supplied through application.properties, application.yml, environment variables, command-line arguments, and other supported property sources.",
        "Keep credentials outside source control and use environment-specific configuration when the application runs in development, testing, and production.",
        "The database schema must also be managed deliberately. Hibernate can validate mappings, while migration tools such as Flyway or Liquibase can apply versioned schema changes."
      ],

      code: {
        language: "properties",
        code: `spring.datasource.url=jdbc:mysql://localhost:3306/company_db
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=validate`
      },

      bullets: [
        "spring.datasource.url specifies the JDBC URL.",
        "spring.datasource.username specifies the database account.",
        "spring.datasource.password supplies the password.",
        "Environment variables must be available when the application starts.",
        "ddl-auto=validate checks the existing schema without creating or updating it.",
        "The database and required tables must exist before validation succeeds."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Database Mistakes",

      paragraphs: [
        "Many database integration problems are caused by incorrect configuration, incompatible entity mappings, or assumptions about how Spring manages persistence.",
        "When troubleshooting, distinguish connectivity errors from authentication errors and schema errors. A successful network connection does not guarantee that Hibernate can validate the schema or that the database user has permission to perform every required operation.",
        "Large queries, missing indexes, and unbounded retrievals can also cause performance problems even when the connection is configured correctly."
      ],

      bullets: [
        "Incorrect JDBC URL, host, port, or database name.",
        "Missing JDBC driver dependency.",
        "Database credentials that are incorrect or unavailable.",
        "A database server that is stopped or unreachable.",
        "Entity mappings that do not match the database schema.",
        "Assuming ddl-auto=validate creates missing tables.",
        "Using findAll() on a very large table without considering pagination.",
        "Committing secrets to source control.",
        "Ignoring transaction boundaries and database constraints.",
        "Using automatic schema updates as the sole production migration strategy."
      ]
    },

    {
      id: "best-practices",
      title: "Database Best Practices",

      paragraphs: [
        "A reliable database layer requires more than a working connection. Applications should protect credentials, control schema changes, use transactions appropriately, and monitor query and connection behavior.",
        "Keep controller, service, and repository responsibilities separate. Put business rules in the service layer and use repositories or another data-access mechanism for persistence operations.",
        "Plan for operational concerns such as backup and restore, migration ordering, database permissions, connection-pool limits, and query performance."
      ],

      bullets: [
        "Use a least-privilege database account for the application.",
        "Store secrets using appropriate configuration and secret-management mechanisms.",
        "Use schema migrations for controlled database changes.",
        "Apply transactions around business operations that need atomicity.",
        "Use indexes based on query patterns and measured performance.",
        "Use pagination for large datasets.",
        "Avoid exposing database credentials and sensitive query parameters in logs.",
        "Test persistence behavior against an appropriate test database.",
        "Monitor database availability, connection-pool usage, and slow queries.",
        "Maintain and test database backups and recovery procedures."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",

      paragraphs: [
        "Prepare to explain how a Spring Boot application connects to a database and how the major persistence technologies relate to one another. Interviewers may also ask about transactions, schema validation, repository methods, and troubleshooting."
      ],

      interviewQuestions: [
        {
          question: "1. How does Spring Boot access a relational database?",
          answer:
            "Spring Boot configures database connectivity through a DataSource. The application can use JDBC directly or a persistence abstraction such as Spring Data JPA with a provider like Hibernate."
        },
        {
          question: "2. What is the purpose of a repository?",
          answer:
            "A repository provides an abstraction for persistence operations, separating data access from business logic and reducing repetitive database-access code."
        },
        {
          question: "3. What is a relational database?",
          answer:
            "A relational database organizes data into tables containing rows and columns and uses relationships, keys, constraints, and SQL to manage data."
        },
        {
          question: "4. What is JDBC?",
          answer:
            "JDBC stands for Java Database Connectivity. It is a Java API used to connect to databases, execute SQL, and process query results."
        },
        {
          question: "5. What is JPA?",
          answer:
            "JPA is a Java persistence specification that defines APIs and mapping concepts for storing and retrieving Java objects in relational databases."
        },
        {
          question: "6. What is Hibernate?",
          answer:
            "Hibernate is an ORM framework and a common implementation of the JPA specification. It maps Java entities to database tables and generates SQL for persistence operations."
        },
        {
          question: "7. What is Spring Data JPA?",
          answer:
            "Spring Data JPA builds on JPA and simplifies repository development by providing generated implementations and common data-access methods."
        },
        {
          question: "8. What is a DataSource?",
          answer:
            "A DataSource is a JDBC abstraction used to obtain database connections. A Spring Boot application commonly uses a connection pool behind it."
        },
        {
          question: "9. What is an entity?",
          answer:
            "An entity is a Java class mapped to persistent database data. In JPA, it is normally annotated with @Entity and has an identifier annotated with @Id."
        },
        {
          question: "10. What does JpaRepository provide?",
          answer:
            "JpaRepository provides common persistence operations, including saving entities, finding them by ID, retrieving records, and deleting records."
        },
        {
          question: "11. What is a primary key?",
          answer:
            "A primary key uniquely identifies each row in a table and cannot contain duplicate key values."
        },
        {
          question: "12. What is a foreign key?",
          answer:
            "A foreign key defines a reference to a key in another table or, where supported, the same table. It helps enforce referential integrity."
        },
        {
          question: "13. What is a database transaction?",
          answer:
            "A transaction groups database operations into a unit of work that can commit or roll back according to the database and transaction configuration."
        },
        {
          question: "14. What is @Transactional in Spring?",
          answer:
            "@Transactional declares a transaction boundary. It is commonly used on service methods that perform multiple related persistence operations."
        },
        {
          question: "15. What is the difference between commit and rollback?",
          answer:
            "Commit completes a successful transaction, while rollback undoes transactional changes that have not been committed."
        },
        {
          question: "16. What is an index?",
          answer:
            "An index is a database structure that can speed up suitable lookups and queries. Indexes consume storage and can add overhead to inserts, updates, and deletes."
        },
        {
          question: "17. Why use a database instead of an in-memory collection?",
          answer:
            "A database provides durable storage, query capabilities, concurrency controls, constraints, transactions, and operational features that ordinary in-memory collections do not provide by themselves."
        },
        {
          question: "18. What is the difference between ddl-auto=validate and update?",
          answer:
            "validate checks compatibility between the existing schema and entity mappings without changing the schema. update attempts to modify the schema to match mappings."
        },
        {
          question: "19. How do you troubleshoot a database connection failure?",
          answer:
            "Check the database server status, JDBC URL, host and port, credentials, driver dependency, network access, and database permissions. Then inspect the root exception in the logs."
        },
        {
          question: "20. Why should database passwords not be hardcoded?",
          answer:
            "Hardcoded credentials can leak through source control and shared code. External configuration and appropriate secret-management mechanisms make access control and credential rotation safer."
        }
      ]
    }
  ]
};
