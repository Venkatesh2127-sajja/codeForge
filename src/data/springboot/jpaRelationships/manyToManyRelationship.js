
export const manyToManyRelationship = {
  id: 905,
  title: "Many-to-Many Relationship",
  slug: "many-to-many-relationship",
  topicTitle: "JPA Relationships",
  description:
    "Map many-to-many associations using a join table.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "concept",
      title: "What Is Many-to-Many?",
      paragraphs: [
        "A many-to-many relationship allows multiple records on each side to be associated with multiple records on the other side. For example, a student can enroll in several courses, and each course can contain several students.",
        "Relational databases commonly represent this relationship using a separate join table. The join table stores a foreign key referencing each participating table, and each row represents one association.",
        "For example, student 1 can be enrolled in courses 101 and 102, while course 101 can contain students 1 and 2. These associations are stored as separate rows in student_courses.",
        "In JPA, @ManyToMany maps this association. A relationship can be unidirectional, where only one entity navigates to the other, or bidirectional, where both entities navigate to each other.",
        "A direct many-to-many mapping is most suitable when the association has no independent business attributes. If the association needs fields such as enrollment date, grade, or status, a separate association entity is usually a better design."
      ],
      code: {
        language: "text",
        code: `Student                         Course
-------                         ------
id                              id
name                            title

           student_courses
           ----------------
           student_id
           course_id

Student 1 ----< student_courses >---- Course 101
Student 1 ----< student_courses >---- Course 102
Student 2 ----< student_courses >---- Course 101`
      },
      bullets: [
        "One student can be associated with multiple courses.",
        "One course can be associated with multiple students.",
        "The join table represents the associations.",
        "The join table normally contains foreign keys to both entity tables.",
        "A direct @ManyToMany mapping is simple when the association has no independent attributes or lifecycle.",
        "Use an association entity when the relationship itself has business meaning."
      ]
    },
    {
      id: "student",
      title: "Student Entity",
      paragraphs: [
        "The Student entity represents a student in the application. Its courses collection stores the courses associated with that student.",
        "In this example, Student owns the relationship because it declares @JoinTable. The join table is named student_courses, and its two join columns reference the student and course records.",
        "joinColumns describes the foreign-key column associated with the owning entity. inverseJoinColumns describes the foreign-key column associated with the other entity.",
        "A Set is commonly used when duplicate associations should not be represented in the Java collection. The database should also enforce the required uniqueness rules, because a Java collection alone does not guarantee database integrity."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id"),
        uniqueConstraints = @UniqueConstraint(
            columnNames = {"student_id", "course_id"}
        )
    )
    private Set<Course> courses = new HashSet<>();

    protected Student() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setName(String name) {
        this.name = name;
    }
}`
      },
      paragraphs: [
        "The unique constraint expresses that the same student-course pair should not appear more than once. Confirm that the constraint exists in the actual database; adding an annotation does not necessarily migrate an existing production schema.",
        "The example omits a complete constructor and some convenience methods for clarity. A production entity should expose only the operations appropriate for its domain."
      ],
      bullets: [
        "@Entity makes Student a JPA entity.",
        "@Table(name = \"students\") specifies the database table name.",
        "@ManyToMany declares the association with Course.",
        "@JoinTable defines the join table and its join columns.",
        "joinColumns refers to the Student foreign key because Student owns the relationship.",
        "inverseJoinColumns refers to the Course foreign key.",
        "A composite uniqueness constraint helps prevent duplicate student-course pairs."
      ]
    },
    {
      id: "course",
      title: "Course Entity",
      paragraphs: [
        "The Course entity represents a course and declares the inverse side of the bidirectional association.",
        "The mappedBy attribute identifies the courses property on Student. It is a Java property name, not the name of a database column or join table.",
        "Course does not declare another @JoinTable because the association is already mapped by the owning Student entity. Both sides represent the same database relationship rather than two independent relationships."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    protected Course() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}`
      },
      bullets: [
        "Student is the owning side in this example.",
        "Course is the inverse side.",
        "mappedBy = \"courses\" refers to Student.courses.",
        "Only the owning side defines the join-table mapping.",
        "Changing only the inverse collection does not reliably persist a relationship change."
      ]
    },
    {
      id: "join-table",
      title: "Join Table Example",
      paragraphs: [
        "The join table stores one row for each student-course association. The following sample shows how several students can share courses without duplicating the course records."
      ],
      output: `student_courses
student_id | course_id
-----------|----------
1          | 101
1          | 102
2          | 101`,
      code: {
        language: "text",
        code: `students
id | name
---|----------
1  | Ananya
2  | Ravi

courses
id  | title
----|----------------
101 | Java
102 | Spring Boot

student_courses
student_id | course_id
-----------|----------
1          | 101
1          | 102
2          | 101`
      },
      paragraphs: [
        "Student 1 is associated with courses 101 and 102. Student 2 is associated with course 101. Course 101 is shared by both students.",
        "The join table prevents the application from needing separate columns such as course1, course2, and course3 in the students table. It also allows associations to grow without changing the table structure for every additional course."
      ],
      bullets: [
        "student_id references students.id.",
        "course_id references courses.id.",
        "Each row represents one association.",
        "Foreign-key constraints help prevent references to nonexistent students or courses.",
        "A composite uniqueness constraint can prevent duplicate pairs.",
        "Index design should reflect common lookup directions, such as finding courses for a student or students for a course."
      ]
    },
    {
      id: "ownership",
      title: "Owning Side and Relationship Synchronization",
      paragraphs: [
        "In a bidirectional many-to-many relationship, one side owns the association and the other side uses mappedBy. The owning side controls how association changes are mapped to the join table.",
        "In the Student and Course example, Student owns the relationship because it declares @JoinTable. Course.students is the inverse side.",
        "Although JPA uses the owning side to persist the association, the Java object graph should also be kept consistent. Helper methods can update both collections whenever an association is added or removed.",
        "A helper method should avoid adding duplicate references and should handle removal consistently. In real projects, consider entity equality carefully when using Set collections; generated database IDs can complicate equals and hashCode implementations."
      ],
      code: {
        language: "java",
        code: `// Add these methods to Student.

public void addCourse(Course course) {
    if (courses.add(course)) {
        course.getStudents().add(this);
    }
}

public void removeCourse(Course course) {
    if (courses.remove(course)) {
        course.getStudents().remove(this);
    }
}`
      },
      paragraphs: [
        "These helper methods update the owning collection and the inverse collection. They assume that the related collections are initialized and accessible and that the entities use compatible equality behavior.",
        "When an association is added, the owning side must be updated. When removing an association, remove the relationship from both collections to keep the in-memory model consistent."
      ],
      bullets: [
        "Do not define separate @JoinTable mappings on both sides of the same bidirectional association.",
        "Use mappedBy on the inverse side.",
        "Update the owning collection when adding or removing associations.",
        "Keep both collections synchronized if both are exposed in the domain model.",
        "Use database constraints to enforce important integrity rules."
      ]
    },
    {
      id: "repository",
      title: "Repository and Service Example",
      paragraphs: [
        "Spring Data JPA repositories provide persistence operations for Student and Course. The service layer should load referenced entities, validate business rules, update the relationship, and execute the operation within an appropriate transaction.",
        "When adding an existing course to an existing student, load both entities by their identifiers instead of accepting arbitrary nested entities directly from the request."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<Student, Long> {
}

public interface CourseRepository
        extends JpaRepository<Course, Long> {
}`
      },
      code: {
        language: "java",
        code: `@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public void enroll(Long studentId, Long courseId) {
        Student student = studentRepository
            .findById(studentId)
            .orElseThrow(() ->
                new StudentNotFoundException(studentId)
            );

        Course course = courseRepository
            .findById(courseId)
            .orElseThrow(() ->
                new CourseNotFoundException(courseId)
            );

        student.addCourse(course);
    }
}`
      },
      paragraphs: [
        "This example assumes Student.addCourse is implemented as shown earlier and that the custom exceptions exist. @RequiredArgsConstructor is provided by Lombok.",
        "The transaction allows JPA to track changes to the managed Student entity. Under normal managed-entity usage, an explicit save call is generally unnecessary for the relationship update, although a project may choose to call save for clarity or repository conventions.",
        "Production code should also consider authorization, enrollment rules, duplicate enrollment handling, and database constraints. For example, some courses may have capacity limits or prerequisites."
      ],
      bullets: [
        "Load existing entities using their IDs.",
        "Handle missing students and courses explicitly.",
        "Keep relationship changes inside a service transaction.",
        "Enforce business rules before updating the association.",
        "Use a database uniqueness constraint to protect against duplicate pairs.",
        "Consider concurrency when multiple requests can enroll students in the same course simultaneously."
      ]
    },
    {
      id: "design",
      title: "When to Use a Separate Entity",
      paragraphs: [
        "A direct many-to-many association works well when the relationship contains only the two foreign keys. However, many business relationships eventually need their own attributes, lifecycle, auditing, or rules.",
        "For example, a student-course association may need an enrollment date, grade, enrollment status, or completion date. These fields describe the enrollment itself rather than the student or course.",
        "In that case, model the join table as an Enrollment entity. Student and Course then each have a one-to-many relationship with Enrollment, while Enrollment has a many-to-one relationship to each parent.",
        "This design makes the association a first-class domain concept. It is also easier to query, validate, audit, and update enrollment-specific data."
      ],
      code: {
        language: "java",
        code: `@Entity
@Table(
    name = "enrollments",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"student_id", "course_id"}
    )
)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private LocalDate enrollmentDate;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    private String grade;
}`
      },
      paragraphs: [
        "This example assumes EnrollmentStatus is an enum and the required imports are present. The Enrollment table stores the two foreign keys alongside attributes that belong to the association.",
        "The unique constraint is appropriate if a student may have only one enrollment record per course. If the business permits re-enrollment with separate historical records, the uniqueness rule must be designed differently."
      ],
      bullets: [
        "Use a direct @ManyToMany mapping when the association has no independent attributes.",
        "Use an association entity when the relationship needs fields or its own lifecycle.",
        "Use CascadeType.REMOVE carefully because Student and Course are usually shared entities.",
        "Avoid automatically deleting courses when a student is removed.",
        "Use DTOs to prevent recursive serialization of bidirectional relationships.",
        "Define business rules for duplicate enrollment, withdrawal, and re-enrollment."
      ]
    },
    {
      id: "fetching",
      title: "Fetching and Performance Considerations",
      paragraphs: [
        "The default fetch type for @ManyToMany is LAZY. Accessing the collection may trigger SQL to load associated entities. Accessing the collections for many students in a loop can therefore cause an N+1 query problem.",
        "Do not switch the relationship to EAGER just to make related data available everywhere. Instead, load the required associations for the specific use case using a fetch join, entity graph, or DTO projection.",
        "Large many-to-many collections can consume substantial memory. Avoid returning every associated entity for a large dataset when the API needs only a count, a page, or a small summary."
      ],
      code: {
        language: "java",
        code: `@Query("""
    select distinct s
    from Student s
    left join fetch s.courses
    where s.id = :studentId
    """)
Optional<Student> findByIdWithCourses(
    @Param("studentId") Long studentId
);`
      },
      paragraphs: [
        "The fetch join loads the student's courses as part of the query. The distinct keyword helps express that the result should contain distinct Student entities even when multiple joined rows represent one student.",
        "This query is useful for loading one student and the associated courses. Be careful when combining collection fetch joins with pagination because joined rows can complicate result counts and page boundaries.",
        "For large course listings, consider a dedicated query or DTO projection that returns only the fields needed by the endpoint."
      ],
      bullets: [
        "Inspect generated SQL for N+1 queries.",
        "Fetch collections only when the operation needs them.",
        "Use DTO projections for lightweight read-only endpoints.",
        "Avoid loading very large collections just to return a count.",
        "Consider indexes on both foreign-key columns in the join table.",
        "Test with realistic numbers of students, courses, and associations."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Using mappedBy with the database column name instead of the owning-side Java property name.",
        "Defining @JoinTable independently on both sides of one bidirectional relationship.",
        "Updating only the inverse collection and expecting the association to be persisted.",
        "Returning bidirectional entities directly from a REST controller and causing recursive JSON serialization.",
        "Adding CascadeType.REMOVE to shared Student or Course entities without a lifecycle justification.",
        "Assuming a Java Set replaces a database uniqueness constraint.",
        "Fetching every association eagerly and creating unnecessary database work.",
        "Ignoring N+1 queries when iterating through many students and their courses.",
        "Using @ManyToMany even when the association needs fields such as status, grade, or enrollment date.",
        "Assuming annotations automatically update an existing production database schema."
      ]
    },
    {
      id: "testing",
      title: "Testing a Many-to-Many Relationship",
      paragraphs: [
        "A relationship test should verify that the join-table association is actually persisted and can be loaded again. Persist a student and course, update the owning collection, flush the persistence context, clear it, and reload the student.",
        "Clearing the persistence context helps ensure the test verifies database state rather than simply reading the same in-memory objects. Integration tests should also check duplicate-association rules and removal behavior."
      ],
      code: {
        language: "java",
        code: `@DataJpaTest
class StudentCourseRelationshipTest {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldPersistStudentCourseAssociation() {
        Student student = new Student();
        student.setName("Ananya");
        student = studentRepository.save(student);

        Course course = new Course();
        course.setTitle("Java");
        course = courseRepository.save(course);

        Long studentId = student.getId();
        Long courseId = course.getId();

        student.addCourse(course);

        entityManager.flush();
        entityManager.clear();

        Student reloaded = studentRepository
            .findByIdWithCourses(studentId)
            .orElseThrow();

        assertTrue(
            reloaded.getCourses().stream()
                .anyMatch(c -> c.getId().equals(courseId))
        );
    }
}`
      },
      paragraphs: [
        "This test assumes the helper method and repository query defined earlier. Required imports and the test database configuration are omitted for brevity.",
        "Also test that duplicate pairs are rejected or handled according to the application rules, that removing an association updates the join table, and that deleting a student does not unexpectedly delete shared courses."
      ],
      bullets: [
        "Test creation of an association.",
        "Test reloading the relationship from the database.",
        "Test removal of the association.",
        "Test duplicate enrollment handling.",
        "Test foreign-key and uniqueness constraints.",
        "Test that deleting one side does not accidentally delete shared entities.",
        "Check query counts for important collection-loading operations."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "How is a many-to-many relationship represented in a relational database?",
          answer: "It is commonly represented using a join table containing foreign keys to both associated tables. Each row represents one association between records."
        },
        {
          question: "What does @ManyToMany do in JPA?",
          answer: "@ManyToMany maps an association in which multiple instances of one entity can be associated with multiple instances of another entity. A join table commonly stores the association."
        },
        {
          question: "What is @JoinTable used for?",
          answer: "@JoinTable configures the association table, including its name, the owning entity's join columns, and the inverse join columns."
        },
        {
          question: "What is the difference between joinColumns and inverseJoinColumns?",
          answer: "joinColumns references the owning entity's foreign key in the join table. inverseJoinColumns references the other associated entity's foreign key."
        },
        {
          question: "What does mappedBy mean in a bidirectional many-to-many relationship?",
          answer: "mappedBy identifies the association property on the owning side. The inverse side uses it instead of defining a second independent join-table mapping."
        },
        {
          question: "Which side owns a many-to-many relationship?",
          answer: "The side that defines the join-table mapping is the owning side in a typical bidirectional mapping. The other side refers to it through mappedBy."
        },
        {
          question: "Why should both sides of a bidirectional relationship be synchronized?",
          answer: "Synchronizing both collections keeps the Java object graph consistent. The owning side must be updated for the relationship change to be persisted correctly."
        },
        {
          question: "Why is Set commonly used for many-to-many associations?",
          answer: "Set expresses that duplicate elements should not appear in the Java collection. Database constraints are still needed to enforce uniqueness of the associated key pair."
        },
        {
          question: "When should you replace @ManyToMany with an association entity?",
          answer: "When the association needs its own attributes, lifecycle, auditing, or business rules, such as enrollment date, grade, status, or quantity."
        },
        {
          question: "Why should CascadeType.REMOVE be used carefully?",
          answer: "The associated entities may be shared and have independent lifecycles. Removing one student should not automatically delete a course that other students use."
        },
        {
          question: "What is the default fetch type for @ManyToMany?",
          answer: "The default fetch type is LAZY. Accessing the collection may execute additional SQL, so queries should be designed to avoid N+1 problems."
        },
        {
          question: "How can you avoid N+1 queries when loading many-to-many data?",
          answer: "Use an appropriate fetch join, entity graph, DTO projection, or batching strategy, and inspect generated SQL and query counts."
        },
        {
          question: "Can a many-to-many relationship cause recursive JSON serialization?",
          answer: "Yes. If both entities serialize collections pointing back to each other, JSON serialization may recurse indefinitely. DTOs are generally a clearer way to control the API response."
        },
        {
          question: "How do you test whether a many-to-many association is persisted?",
          answer: "Persist both entities, update the owning collection, flush, clear the persistence context, reload the entity, and verify that the expected association exists."
        }
      ]
    },
    {
      id: "summary",
      title: "Quick Revision Notes",
      bullets: [
        "Many-to-many allows multiple records on both sides of a relationship.",
        "A join table stores the foreign keys for the association.",
        "@JoinTable defines the join table and its join columns.",
        "joinColumns references the owning entity; inverseJoinColumns references the other entity.",
        "mappedBy identifies the owning-side Java property.",
        "Synchronize both collections in a bidirectional relationship.",
        "The default fetch type is LAZY.",
        "Use an association entity when the relationship needs additional attributes.",
        "Avoid cascading removal to shared entities.",
        "Use DTOs and deliberate fetch plans for REST APIs.",
        "Test join-table persistence, constraints, removal behavior, and query performance."
      ],
      paragraphs: [
        "Interview-ready answer: A many-to-many relationship connects multiple records on both sides and is commonly represented in the database by a join table. In JPA, I configure the owning side with @ManyToMany and @JoinTable, and use mappedBy on the inverse side. I synchronize both sides, avoid cascading removal to shared entities, and use an association entity when the relationship needs additional fields. For performance and API design, I use deliberate fetch plans and DTOs."
      ]
    }
  ]
};
