
export const oneToOneRelationship = {
  id: 902,
  title: "One-to-One Relationship",
  slug: "one-to-one-relationship",
  topicTitle: "JPA Relationships",
  description:
    "Learn how to map one-to-one associations using Spring Data JPA, understand owning and inverse sides, foreign keys, unique constraints, cascade operations, fetching behavior, and practical database persistence.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "concept",
      title: "1. What Is One-to-One?",
      paragraphs: [
        "A one-to-one relationship means one entity is associated with at most one related entity, and each related entity is associated with at most one entity on the other side. For example, a user may have one profile, and each profile belongs to one user.",
        "In a common relational database design, the user_profiles table contains a user_id foreign key referencing users.id. A UNIQUE constraint on user_id prevents multiple profile rows from referencing the same user.",
        "The relationship is represented in Java using @OneToOne. It can be unidirectional, where only one entity navigates to the other, or bidirectional, where both entities have association attributes.",
        "A one-to-one mapping does not necessarily mean both records must exist together. Whether a user must have a profile, whether a profile can exist without a user, and whether either association can be null depend on the domain rules and database constraints."
      ],
      code: {
        language: "text",
        code: `users
+----+---------+
| id | name    |
+----+---------+
| 1  | Venkatesh |
| 2  | Priya   |
+----+---------+

user_profiles
+----+----------------+---------+
| id | bio            | user_id |
+----+----------------+---------+
| 10 | Java Developer | 1       |
| 11 | Student        | 2       |
+----+----------------+---------+

user_profiles.user_id
    -> references users.id
    -> UNIQUE constraint prevents duplicate user IDs`
      },
      bullets: [
        "@OneToOne represents a one-to-one association between entity types.",
        "A foreign key commonly connects the two tables.",
        "A UNIQUE constraint on the foreign key enforces the one-to-one cardinality from the referencing table's perspective.",
        "A NOT NULL constraint can require every profile row to reference a user.",
        "A foreign key and unique constraint do not automatically require every user to have a profile.",
        "Choose the relationship according to the domain, not merely because two tables exist."
      ]
    },
    {
      id: "user-entity",
      title: "2. User Entity: The Inverse Side",
      paragraphs: [
        "The User entity represents the users table. Its profile field provides navigation from a user to the associated profile.",
        "The mappedBy attribute identifies the owning Java attribute in UserProfile. Here, mappedBy = \"user\" refers to UserProfile.user, not the user_id database column.",
        "Because UserProfile owns the association, User.profile is the inverse side. It does not independently define the foreign-key mapping.",
        "FetchType.LAZY expresses a request for lazy fetching. One-to-one lazy loading has provider-specific considerations, especially for inverse-side associations. Do not assume that writing LAZY guarantees the absence of additional SQL or immediate proxy-based loading in every case."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne(
        mappedBy = "user",
        fetch = FetchType.LAZY
    )
    private UserProfile profile;

    protected User() {
    }

    public User(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public UserProfile getProfile() {
        return profile;
    }
}`
      },
      bullets: [
        "@Entity maps the class as a JPA entity.",
        "@Table(name = \"users\") specifies the database table.",
        "@OneToOne declares the association.",
        "mappedBy = \"user\" points to UserProfile.user.",
        "The inverse side does not own the foreign-key mapping.",
        "Consider whether the application actually needs navigation from User to UserProfile."
      ]
    },
    {
      id: "profile-entity",
      title: "3. UserProfile Entity: The Owning Side",
      paragraphs: [
        "UserProfile owns the relationship because its user field declares @JoinColumn(name = \"user_id\"). This maps the foreign key in the user_profiles table.",
        "The unique = true setting requests a uniqueness constraint for user_id. This prevents two different profile rows from referencing the same user when the constraint exists in the actual database schema.",
        "The default optional behavior of @OneToOne permits a null association unless configured otherwise. If every profile must reference a user, consider optional = false and a database NOT NULL constraint. Verify that the schema actually enforces the intended rule.",
        "The entity below includes a constructor and accessors to make the mapping easier to understand. A production application may use a different constructor, Lombok, or domain-specific methods."
      ],
      code: {
        language: "java",
        code: `import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String bio;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        unique = true
    )
    private User user;

    protected UserProfile() {
    }

    public UserProfile(String bio) {
        this.bio = bio;
    }

    public Long getId() {
        return id;
    }

    public String getBio() {
        return bio;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}`
      },
      bullets: [
        "@JoinColumn maps the foreign-key column.",
        "The UserProfile.user attribute owns the association.",
        "unique = true requests uniqueness for the join column.",
        "optional = false expresses that the association must be present in the object model; database constraints should enforce the corresponding database rule.",
        "The actual schema should be verified when using migrations or an existing database."
      ]
    },
    {
      id: "database-view",
      title: "4. Database Representation",
      paragraphs: [
        "The users table stores user information, and user_profiles stores profile information. The profile table contains user_id, which references users.id.",
        "A foreign-key constraint ensures that a non-null user_id references an existing user. A unique constraint ensures that one user cannot be referenced by multiple profile rows.",
        "These constraints enforce important parts of the relationship at the database level. They do not, by themselves, ensure that every user has a profile."
      ],
      code: {
        language: "text",
        code: `CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bio VARCHAR(500),
    user_id BIGINT UNIQUE,
    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- user_id can be NULL in this example.
-- UNIQUE prevents duplicate non-null user references.
-- Add NOT NULL if every profile must reference a user.`
      },
      bullets: [
        "users.id is the primary key of users.",
        "user_profiles.user_id references users.id.",
        "UNIQUE on user_id prevents two profiles from referencing the same user.",
        "A foreign key prevents references to nonexistent users.",
        "NOT NULL on user_id can require every profile to reference a user.",
        "A profile table's foreign key does not force every user to have a profile."
      ]
    },
    {
      id: "owning-side-and-mappedby",
      title: "5. Owning Side vs Inverse Side",
      paragraphs: [
        "The owning side defines the database association mapping. The inverse side refers to that mapping through mappedBy.",
        "In this example, UserProfile.user is the owning side, while User.profile is the inverse side. The database relationship is mapped through user_profiles.user_id.",
        "When changing a bidirectional relationship, update both Java references to keep the object graph consistent. The owning reference is especially important for the relationship's persisted foreign-key value.",
        "A helper method can be placed on User or a dedicated domain service, depending on the design. The following example assumes the User class has a profile field and a setProfile method."
      ],
      code: {
        language: "java",
        code: `// Example helper method inside User.java

public void setProfile(UserProfile profile) {
    this.profile = profile;

    if (profile != null && profile.getUser() != this) {
        profile.setUser(this);
    }
}`
      },
      paragraphs: [
        "When detaching or replacing an existing profile, ensure that the old association is also handled consistently. Whether a profile can be reassigned or removed depends on the domain and database constraints.",
        "Setting both Java references does not replace foreign-key constraints, transaction boundaries, or explicit persistence operations when cascade is not configured."
      ],
      bullets: [
        "Owning side: UserProfile.user.",
        "Inverse side: User.profile.",
        "mappedBy names a Java attribute, not a database column.",
        "Keep both references consistent for bidirectional navigation.",
        "Cascade configuration is independent of relationship ownership."
      ]
    },
    {
      id: "persist-example",
      title: "6. Creating a User and Its Profile",
      paragraphs: [
        "A service can create a User and UserProfile in one transaction. In this example, both entities are explicitly saved, so the operation does not depend on cascade settings.",
        "The profile's owning association is set through profile.setUser(user). The user's inverse reference is also set so the Java object graph is consistent.",
        "The repository types below are Spring Data JPA repositories. The example assumes the entities and database schema are configured as shown in the earlier sections."
      ],
      code: {
        language: "java",
        code: `public interface UserRepository
        extends JpaRepository<User, Long> {
}

public interface UserProfileRepository
        extends JpaRepository<UserProfile, Long> {
}`
      },
      paragraphs: [
        "The service coordinates the two writes. Since the profile owns the association, it is important to set its user reference before saving the profile."
      ],
      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;

    public UserService(
            UserRepository userRepository,
            UserProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public User createUserWithProfile(
            String name,
            String bio) {

        User user = new User(name);
        userRepository.save(user);

        UserProfile profile = new UserProfile(bio);
        profile.setUser(user);
        user.setProfile(profile);

        profileRepository.save(profile);

        return user;
    }
}`
      },
      bullets: [
        "The transaction groups the related database writes.",
        "Both entities are saved explicitly in this example.",
        "The owning association is set before the profile is saved.",
        "The order shown ensures that the user is saved before the profile references it.",
        "A production service should validate inputs and enforce any required business rules."
      ]
    },
    {
      id: "cascade-types",
      title: "7. Cascade Types in One-to-One",
      paragraphs: [
        "Cascade settings control whether persistence operations propagate from one entity to its associated entity. They do not determine which side owns the relationship.",
        "CascadeType.PERSIST can be useful when a new profile should be persisted whenever its user is persisted. CascadeType.ALL includes all standard JPA cascade operations, but it should not be used automatically without considering the lifecycle of both entities.",
        "CascadeType.REMOVE may be appropriate if the associated profile cannot exist independently and deleting the user should delete the profile. It is not appropriate when the profile must be retained or has an independent lifecycle.",
        "Orphan removal is a separate option that can delete a child when the association is removed. Use it only when that lifecycle behavior matches the domain."
      ],
      code: {
        language: "java",
        code: `// Example: User owns the lifecycle of its profile.
// Use this only if the domain supports this design.

@OneToOne(
    mappedBy = "user",
    cascade = CascadeType.ALL,
    orphanRemoval = true
)
private UserProfile profile;`
      },
      bullets: [
        "PERSIST: propagates persist.",
        "MERGE: propagates merge.",
        "REMOVE: propagates remove.",
        "REFRESH: propagates refresh.",
        "DETACH: propagates detach.",
        "ALL: includes all five standard cascade operations.",
        "Cascade settings should reflect lifecycle ownership.",
        "Cascade operations do not automatically synchronize both Java references."
      ]
    },
    {
      id: "fetching",
      title: "8. Fetching and Performance Considerations",
      paragraphs: [
        "JPA defines EAGER and LAZY fetch strategies. EAGER means the association is required to be fetched as part of the entity loading operation, although it does not guarantee that the provider uses a single SQL JOIN. LAZY allows the provider to defer fetching the association.",
        "The JPA default for @OneToOne is EAGER. You can request LAZY, but the provider may need proxies or bytecode enhancement to implement it effectively. In particular, lazy loading on the inverse side can be more complicated because the provider may need to determine whether the associated row exists.",
        "Choose fetch behavior according to the application's query patterns. Use DTO projections or explicit fetch plans when a service needs specific related fields. Verify the generated SQL instead of assuming an annotation guarantees a particular number of queries."
      ],
      code: {
        language: "java",
        code: `// Request lazy loading of the owning association
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", unique = true)
private User user;`
      },
      bullets: [
        "JPA's default for @OneToOne is EAGER.",
        "LAZY requests deferred association loading.",
        "LAZY behavior can depend on the JPA provider and enhancement configuration.",
        "EAGER does not guarantee a single SQL JOIN.",
        "Use DTOs and targeted queries for API responses.",
        "Inspect SQL logs and query counts when investigating performance."
      ]
    },
    {
      id: "common-mistakes",
      title: "9. Common Mistakes",
      paragraphs: [
        "One-to-one mapping bugs often result from missing uniqueness constraints, incorrect mappedBy values, unsynchronized references, or cascade settings that do not match the intended lifecycle."
      ],
      bullets: [
        "Forgetting the UNIQUE constraint on the foreign-key column.",
        "Using a database column name in mappedBy instead of the owning Java attribute name.",
        "Updating only the inverse-side reference.",
        "Assuming every user must have a profile merely because the relationship is one-to-one.",
        "Assuming unique = true has modified an existing database when schema migrations manage the schema.",
        "Using CascadeType.ALL without considering delete and merge behavior.",
        "Assuming FetchType.LAZY guarantees that the association is never loaded eagerly.",
        "Returning bidirectional entities directly from REST APIs and causing recursive JSON serialization.",
        "Assuming @OneToOne alone prevents every possible invalid database state without the necessary constraints."
      ]
    },
    {
      id: "best-practices",
      title: "10. Practical Guidelines and Best Practices",
      bullets: [
        "Use @OneToOne only when the domain genuinely requires a one-to-one association.",
        "Consider whether the two entities should instead be represented by one table.",
        "Choose the owning side deliberately and map the foreign key there.",
        "Use mappedBy on the inverse side of a bidirectional association.",
        "Use a UNIQUE constraint on the foreign key to enforce one-to-one cardinality.",
        "Add NOT NULL when every referencing row must have an associated entity.",
        "Keep both Java references synchronized when using a bidirectional mapping.",
        "Use cascade settings only when the lifecycle of the associated entity justifies them.",
        "Review lazy-loading behavior and generated SQL with the actual JPA provider.",
        "Use DTOs to control API responses and avoid recursive entity serialization."
      ]
    },
    {
      id: "interview",
      title: "11. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a one-to-one relationship in JPA?",
          answer: "It is an association where an entity is related to at most one entity of another type, and each related entity is associated with at most one entity on the other side. It is represented using @OneToOne."
        },
        {
          question: "How do you define a one-to-one relationship?",
          answer: "Use @OneToOne on the relevant entity attributes. A common relational design uses a foreign key with a UNIQUE constraint to enforce one-to-one cardinality."
        },
        {
          question: "What is the purpose of unique = true in @JoinColumn?",
          answer: "It requests a uniqueness constraint for the join column. Verify the generated schema or define the constraint explicitly through database migrations."
        },
        {
          question: "What does mappedBy mean in a one-to-one relationship?",
          answer: "mappedBy marks the inverse side and names the owning Java attribute on the other entity. For example, mappedBy = \"user\" refers to UserProfile.user."
        },
        {
          question: "Which side owns the relationship in this User–UserProfile example?",
          answer: "UserProfile owns the relationship because its user field defines @JoinColumn(name = \"user_id\"). User.profile is the inverse side."
        },
        {
          question: "Where is the foreign key stored?",
          answer: "In this mapping, the foreign key is stored in user_profiles.user_id, which references users.id."
        },
        {
          question: "Why is a UNIQUE constraint needed?",
          answer: "A foreign key alone allows multiple profiles to reference the same user. A UNIQUE constraint prevents that and enforces the one-to-one cardinality from the profile table to the user table."
        },
        {
          question: "Does a one-to-one relationship mean every user must have a profile?",
          answer: "No. A unique foreign key prevents multiple profiles from referencing the same user, but it does not require every user row to have a profile. That requirement needs additional application or database design."
        },
        {
          question: "What is the default fetch type for @OneToOne?",
          answer: "The JPA default is EAGER. LAZY can be requested, but actual behavior depends on the provider and mapping, especially for inverse-side associations."
        },
        {
          question: "What is the difference between the owning and inverse sides?",
          answer: "The owning side defines the association's database mapping. The inverse side uses mappedBy to refer to the owning attribute."
        },
        {
          question: "What does CascadeType.ALL mean?",
          answer: "It includes PERSIST, MERGE, REMOVE, REFRESH, and DETACH. It should be selected only when propagating all these operations matches the intended entity lifecycle."
        },
        {
          question: "What is orphanRemoval?",
          answer: "It is a separate association setting that can delete a child entity when it is removed from the relationship. It is useful when the child is lifecycle-dependent on the parent."
        },
        {
          question: "What is the difference between a foreign key and a unique constraint?",
          answer: "A foreign key ensures that a referenced row exists. A unique constraint prevents duplicate values in the constrained column or column combination."
        },
        {
          question: "Can a one-to-one relationship be unidirectional?",
          answer: "Yes. Only one entity needs to expose the association. A bidirectional mapping is useful when both navigation paths are needed."
        },
        {
          question: "How would you explain one-to-one mapping in an interview?",
          answer: "A one-to-one association links one entity to at most one related entity. For example, User and UserProfile can be mapped using @OneToOne. In a common bidirectional design, UserProfile owns the relationship through @JoinColumn(name = \"user_id\", unique = true), while User uses mappedBy = \"user\". The unique constraint prevents multiple profiles from referencing the same user."
        }
      ]
    },
    {
      id: "summary",
      title: "12. Quick Revision Notes",
      bullets: [
        "@OneToOne maps a one-to-one entity association.",
        "The foreign key commonly resides in one of the two tables.",
        "A UNIQUE constraint enforces one-to-one cardinality for the referencing column.",
        "UserProfile.user owns the relationship in this example.",
        "User.profile is the inverse side and uses mappedBy = \"user\".",
        "mappedBy refers to a Java attribute, not a database column.",
        "JPA's default @OneToOne fetch type is EAGER.",
        "Cascade and orphan removal should reflect the entity lifecycle.",
        "Keep both references synchronized in a bidirectional mapping.",
        "A unique foreign key does not require every user to have a profile."
      ],
      paragraphs: [
        "Interview-ready answer: A one-to-one relationship in JPA associates one entity with at most one entity of another type. For example, a User can have a UserProfile. In a bidirectional mapping, UserProfile can own the association through @JoinColumn(name = \"user_id\", unique = true), while User uses @OneToOne(mappedBy = \"user\"). The unique constraint prevents multiple profiles from referencing the same user. Cascade settings, nullability, and fetch behavior should be chosen according to the application's requirements."
      ]
    }
  ]
};
