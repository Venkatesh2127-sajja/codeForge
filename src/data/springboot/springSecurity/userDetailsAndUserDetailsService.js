
export const userDetailsAndUserDetailsService = {
  id: 1107,
  title: "UserDetails and UserDetailsService",
  slug: "user-details-and-user-details-service",
  topicTitle: "Spring Security",
  description:
    "Understand how Spring Security loads users and their authorities for authentication.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "user-details",
      title: "What Is UserDetails?",
      paragraphs: [
        "UserDetails represents user information used by Spring Security during authentication.",
        "It provides information such as the username, encoded password, granted authorities, and account status.",
        "UserDetails is a Spring Security abstraction. Your application's User or AppUser entity does not have to implement UserDetails directly. A common design is to keep the application entity separate and convert it into UserDetails inside UserDetailsService."
      ],
      code: {
        language: "java",
        code: `public interface UserDetails extends Serializable {

    Collection<? extends GrantedAuthority> getAuthorities();

    String getPassword();

    String getUsername();

    boolean isAccountNonExpired();

    boolean isAccountNonLocked();

    boolean isCredentialsNonExpired();

    boolean isEnabled();
}`
      },
      bullets: [
        "getUsername() returns the identity used by the authentication mechanism.",
        "getPassword() returns the stored encoded password when password authentication is being used.",
        "getAuthorities() returns roles or permissions.",
        "isAccountNonExpired() represents account-expiration status.",
        "isAccountNonLocked() represents account-lock status.",
        "isCredentialsNonExpired() represents credential-expiration status.",
        "isEnabled() indicates whether the account is enabled."
      ]
    },

    {
      id: "user-details-purpose",
      title: "Why Does Spring Security Use UserDetails?",
      paragraphs: [
        "Application user entities can contain many fields such as id, email, phone number, address, createdAt, updatedAt, profile information, and other business data.",
        "Spring Security does not need all of those fields for authentication. UserDetails provides a security-oriented representation containing the information required by the authentication system.",
        "This creates a useful separation between the application's persistence model and Spring Security's authentication model."
      ],
      code: {
        language: "text",
        code: `Database User Entity
        |
        | id
        | username
        | password
        | email
        | phone
        | address
        | createdAt
        |
        v
UserDetailsService
        |
        | Convert / Map
        v
UserDetails
        |
        | username
        | encoded password
        | authorities
        | account status
        v
Spring Security`
      }
    },

    {
      id: "user-details-service",
      title: "What Is UserDetailsService?",
      paragraphs: [
        "UserDetailsService is a Spring Security interface used to load user-specific authentication data by username.",
        "A custom implementation commonly retrieves the user from a database and converts the application's user model into a Spring Security UserDetails representation.",
        "The method loadUserByUsername() either returns UserDetails or throws UsernameNotFoundException when the user cannot be found."
      ],
      code: {
        language: "java",
        code: `import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public AppUserDetailsService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        AppUser user = userRepository
            .findByUsername(username)
            .orElseThrow(() ->
                new UsernameNotFoundException(
                    "User not found"
                )
            );

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .authorities(user.getAuthorities())
            .build();
    }
}`
      },
      paragraphs: [
        "This example assumes AppUser has a username, an encoded password, and a collection of authority strings. Adapt the mapping to your own user entity and repository."
      ]
    },

    {
      id: "load-user-by-username",
      title: "How loadUserByUsername() Works",
      paragraphs: [
        "loadUserByUsername() is called by authentication infrastructure when Spring Security needs to load user information for username-based authentication.",
        "The name of the method can be slightly misleading because the application may use an email address, employee code, phone number, or another unique identifier as the login value. The method parameter is simply the identifier supplied to the authentication mechanism."
      ],
      code: {
        language: "java",
        code: `@Override
public UserDetails loadUserByUsername(String username) {

    AppUser user = userRepository
        .findByUsername(username)
        .orElseThrow(() ->
            new UsernameNotFoundException(
                "User not found"
            )
        );

    return User.withUsername(user.getUsername())
        .password(user.getPassword())
        .authorities(user.getAuthorities())
        .build();
}`
      },
      bullets: [
        "Receive the login identifier.",
        "Query the user repository.",
        "Handle the user-not-found case.",
        "Map the application user to UserDetails.",
        "Return UserDetails to the authentication provider."
      ]
    },

    {
      id: "authentication-flow",
      title: "Username and Password Authentication Flow",
      bullets: [
        "The authentication mechanism receives the submitted username and password.",
        "An Authentication request represents the submitted credentials.",
        "The AuthenticationManager processes the authentication request.",
        "A suitable AuthenticationProvider handles the authentication.",
        "UserDetailsService loads the stored user information.",
        "The authentication provider uses PasswordEncoder to verify the submitted password against the stored encoded password.",
        "The provider checks relevant account-status information.",
        "On success, Spring Security establishes the authenticated identity and authorities.",
        "The resulting Authentication can be stored in the SecurityContext.",
        "Authorization rules use the resulting authorities to decide access."
      ],
      code: {
        language: "text",
        code: `Login Request
     |
     | username + password
     v
Authentication
     |
     v
AuthenticationManager
     |
     v
AuthenticationProvider
     |
     v
UserDetailsService
     |
     v
UserDetails
     |
     v
PasswordEncoder
     |
     +---- Invalid ----> Authentication Failure
     |
     +---- Valid
             |
             v
       Authenticated
       Authentication
             |
             v
       SecurityContext
             |
             v
        Authorization`
      }
    },

    {
      id: "user-details-mapping",
      title: "Mapping AppUser to UserDetails",
      paragraphs: [
        "A common architecture keeps the application's AppUser entity separate from Spring Security's UserDetails representation.",
        "The UserDetailsService becomes the mapping boundary between persistence data and authentication data."
      ],
      code: {
        language: "java",
        code: `AppUser user = userRepository
    .findByUsername(username)
    .orElseThrow(
        () -> new UsernameNotFoundException(
            "User not found"
        )
    );

UserDetails userDetails =
    User.withUsername(user.getUsername())
        .password(user.getPassword())
        .authorities(user.getAuthorities())
        .build();

return userDetails;`
      },
      bullets: [
        "The database entity belongs to the application domain.",
        "UserDetails belongs to Spring Security's authentication abstraction.",
        "Mapping allows the two models to evolve independently.",
        "Only security-relevant information needs to be exposed through UserDetails."
      ]
    },

    {
      id: "database-user-model",
      title: "Typical Database User Model",
      paragraphs: [
        "A typical application may store authentication-related information in a users table.",
        "The exact schema depends on the application's requirements."
      ],
      code: {
        language: "text",
        code: `users
--------------------------------
id
username
password
email
enabled
account_non_locked
account_non_expired
credentials_non_expired
--------------------------------

user_authorities
--------------------------------
user_id
authority
--------------------------------`
      },
      bullets: [
        "username should normally be unique when it is the login identifier.",
        "password should contain an encoded password, not plain text.",
        "enabled can represent whether the account is active.",
        "Account-status fields can be mapped to UserDetails when the application uses them.",
        "Authorities can be stored in the same table or a separate relationship depending on the design."
      ]
    },

    {
      id: "repository",
      title: "UserRepository",
      paragraphs: [
        "UserDetailsService normally delegates database access to a repository rather than directly writing persistence logic inside the authentication service."
      ],
      code: {
        language: "java",
        code: `public interface UserRepository
        extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByUsername(String username);
}`
      },
      bullets: [
        "The repository handles database access.",
        "UserDetailsService handles security-oriented user loading.",
        "Keeping these responsibilities separate improves maintainability.",
        "The repository should use a unique lookup field for authentication."
      ]
    },

    {
      id: "username-vs-email",
      title: "Using Email as the Login Identifier",
      paragraphs: [
        "Many applications allow users to log in using an email address instead of a username.",
        "UserDetailsService can still be used. The method parameter can represent the email supplied by the authentication mechanism."
      ],
      code: {
        language: "java",
        code: `@Override
public UserDetails loadUserByUsername(String email) {

    AppUser user = userRepository
        .findByEmail(email)
        .orElseThrow(() ->
            new UsernameNotFoundException(
                "User not found"
            )
        );

    return User.withUsername(user.getEmail())
        .password(user.getPassword())
        .authorities(user.getAuthorities())
        .build();
}`
      },
      bullets: [
        "The method is still called loadUserByUsername().",
        "The application can use email as the unique login identifier.",
        "The repository query should match the chosen identifier.",
        "The identifier should be unique and consistently handled."
      ]
    },

    {
      id: "password",
      title: "Password Handling",
      paragraphs: [
        "UserDetails can expose the encoded password to the authentication provider when password authentication is used.",
        "The stored value must be a password hash generated by a suitable PasswordEncoder.",
        "The raw password submitted during login should never be stored in the database."
      ],
      code: {
        language: "java",
        code: `@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`
      },
      bullets: [
        "Never store plain-text passwords.",
        "Do not log raw passwords.",
        "Do not return passwords from REST API responses.",
        "Use PasswordEncoder for password hashing and verification.",
        "Keep password-handling logic within the authentication boundary."
      ]
    },

    {
      id: "password-registration-flow",
      title: "Password During Registration vs Login",
      paragraphs: [
        "Registration and authentication use the password in different ways.",
        "During registration, the raw password is encoded before persistence. During login, the submitted raw password is compared with the stored encoded password by the authentication provider."
      ],
      code: {
        language: "text",
        code: `REGISTRATION

Raw Password
     |
     v
PasswordEncoder
     |
     v
Encoded Password
     |
     v
Database


LOGIN

Raw Password
     |
     v
AuthenticationProvider
     |
     v
Stored Encoded Password
     |
     v
PasswordEncoder Verification
     |
     v
Success / Failure`
      }
    },

    {
      id: "roles",
      title: "Roles and Authorities",
      paragraphs: [
        "GrantedAuthority represents a permission or role granted to a user.",
        "Roles are commonly represented using the ROLE_ prefix, while authorities can represent more granular permissions such as EMPLOYEE_READ or REPORT_EXPORT."
      ],
      bullets: [
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"EMPLOYEE_READ\") checks that exact authority.",
        "Use consistent role and authority naming across persistence and security configuration.",
        "Authorities are used during authorization decisions."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/admin/**")
    .hasRole("ADMIN")

    .requestMatchers("/api/employees/**")
    .hasAuthority("EMPLOYEE_READ")

    .anyRequest()
    .authenticated()
);`
      }
    },

    {
      id: "authority-mapping",
      title: "Mapping Authorities from the Database",
      paragraphs: [
        "The application may store authority strings in a separate table or another persistence structure.",
        "UserDetailsService converts those stored values into the authorities expected by Spring Security."
      ],
      code: {
        language: "java",
        code: `List<GrantedAuthority> authorities =
    user.getAuthorities()
        .stream()
        .map(SimpleGrantedAuthority::new)
        .toList();

return User.withUsername(user.getUsername())
    .password(user.getPassword())
    .authorities(authorities)
    .build();`
      },
      bullets: [
        "SimpleGrantedAuthority is commonly used for string-based authorities.",
        "The authority string must match the authorization configuration.",
        "For hasRole(\"ADMIN\"), the resulting authority is commonly ROLE_ADMIN.",
        "For hasAuthority(\"EMPLOYEE_READ\"), the authority must be EMPLOYEE_READ."
      ]
    },

    {
      id: "account-status",
      title: "Account Status Checks",
      paragraphs: [
        "UserDetails exposes account-status methods that allow Spring Security to represent whether an account is usable for authentication.",
        "These methods can be mapped from application-specific account fields."
      ],
      code: {
        language: "java",
        code: `return User.withUsername(user.getUsername())
    .password(user.getPassword())
    .authorities(user.getAuthorities())
    .accountExpired(!user.isAccountNonExpired())
    .accountLocked(!user.isAccountNonLocked())
    .credentialsExpired(!user.isCredentialsNonExpired())
    .disabled(!user.isEnabled())
    .build();`
      },
      bullets: [
        "Account expired represents account lifetime expiration.",
        "Account locked represents a locked account.",
        "Credentials expired represents expired credentials.",
        "Disabled represents an account that is not enabled."
      ]
    },

    {
      id: "spring-security-user",
      title: "Spring Security's User Implementation",
      paragraphs: [
        "Spring Security provides a User implementation of UserDetails that can be convenient when the application does not need a custom UserDetails implementation.",
        "The builder API can be used to create a UserDetails object from the application's data."
      ],
      code: {
        language: "java",
        code: `UserDetails userDetails =
    User.withUsername("venkat")
        .password(encodedPassword)
        .roles("USER")
        .build();`
      },
      bullets: [
        "roles(\"USER\") is convenient for role-based authorities.",
        "The resulting role is normally represented as ROLE_USER.",
        "authorities(...) can be used when exact authority strings are needed."
      ]
    },

    {
      id: "custom-user-details",
      title: "When Should You Create Custom UserDetails?",
      paragraphs: [
        "A custom UserDetails implementation can be useful when the application needs to expose additional authentication-related information or custom account-status behavior.",
        "For many applications, however, using Spring Security's built-in User implementation and mapping the application entity in UserDetailsService is sufficient."
      ],
      code: {
        language: "java",
        code: `public class CustomUserDetails
        implements UserDetails {

    private final AppUser user;

    public CustomUserDetails(AppUser user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority>
            getAuthorities() {

        return user.getAuthorities()
            .stream()
            .map(SimpleGrantedAuthority::new)
            .toList();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}`
      },
      bullets: [
        "Use custom UserDetails when the built-in User representation is insufficient.",
        "Do not create custom security abstractions without a real requirement.",
        "Keep the custom implementation focused on authentication-related information."
      ]
    },

    {
      id: "user-details-manager",
      title: "UserDetailsManager",
      paragraphs: [
        "UserDetailsManager extends UserDetailsService and adds operations for creating, updating, deleting, and checking users.",
        "It can be useful for applications that want a standard user-management abstraction, although many production applications use their own repository and service layer."
      ],
      code: {
        language: "java",
        code: `public interface UserDetailsManager
        extends UserDetailsService {

    void createUser(UserDetails user);

    void updateUser(UserDetails user);

    void deleteUser(String username);

    void changePassword(
        String oldPassword,
        String newPassword
    );

    boolean userExists(String username);
}`
      },
      bullets: [
        "UserDetailsService focuses on loading users.",
        "UserDetailsManager adds user-management operations.",
        "A custom application service may still be preferable for complex business rules."
      ]
    },

    {
      id: "database-authentication-flow",
      title: "Complete Database Authentication Flow",
      paragraphs: [
        "The following flow shows how a database-backed username-password authentication system connects the application user entity, repository, UserDetailsService, authentication provider, and security context."
      ],
      code: {
        language: "text",
        code: `React / Client
      |
      | username + password
      v
Spring Security
      |
      v
AuthenticationManager
      |
      v
AuthenticationProvider
      |
      v
UserDetailsService
      |
      v
UserRepository
      |
      v
MySQL
      |
      | AppUser
      v
UserDetailsService
      |
      | UserDetails
      v
AuthenticationProvider
      |
      | PasswordEncoder verification
      v
Authenticated Authentication
      |
      v
SecurityContext
      |
      v
Authorization
      |
      v
Controller`
      }
    },

    {
      id: "jwt-user-details",
      title: "UserDetails in JWT-Based Applications",
      paragraphs: [
        "UserDetailsService is especially common during username-password login when the application needs to load the user and authenticate credentials.",
        "In a JWT-based architecture, the exact flow depends on how tokens are issued and validated. During login, UserDetailsService may load the user for credential verification and token creation.",
        "For subsequent bearer-token requests, a resource server can validate the JWT and establish Authentication from the validated token without necessarily calling UserDetailsService on every request."
      ],
      code: {
        language: "text",
        code: `LOGIN

Username + Password
       |
       v
UserDetailsService
       |
       v
UserDetails
       |
       v
Password Verification
       |
       v
JWT Issued


SUBSEQUENT API REQUEST

Authorization: Bearer <JWT>
       |
       v
JWT Validation
       |
       v
Authentication
       |
       v
SecurityContext
       |
       v
Authorization
       |
       v
Controller`
      },
      bullets: [
        "Do not assume UserDetailsService must query the database on every JWT request.",
        "JWT resource-server validation can establish authentication from a validated token.",
        "The architecture depends on whether the application uses JWT, session authentication, or another mechanism."
      ]
    },

    {
      id: "transaction-boundary",
      title: "Database Access and Transactions",
      paragraphs: [
        "UserDetailsService may read user data from a database through a repository.",
        "If the UserDetails mapping accesses lazy relationships, transaction and persistence-context boundaries need to be considered carefully.",
        "A simple username lookup with all required authentication data available is easier to reason about than returning an object that requires additional lazy database access after the persistence context is closed."
      ],
      bullets: [
        "Load the authentication data needed by the provider.",
        "Be careful when authorities are stored in lazy relationships.",
        "Avoid unnecessary database queries during authentication.",
        "Do not expose persistence entities directly as API responses."
      ]
    },

    {
      id: "authentication-failure",
      title: "What Happens When User Is Not Found?",
      paragraphs: [
        "When the requested user cannot be found, UserDetailsService commonly throws UsernameNotFoundException.",
        "The authentication infrastructure then treats the authentication attempt as unsuccessful."
      ],
      code: {
        language: "java",
        code: `@Override
public UserDetails loadUserByUsername(String username) {

    return userRepository
        .findByUsername(username)
        .map(this::toUserDetails)
        .orElseThrow(() ->
            new UsernameNotFoundException(
                "User not found"
            )
        );
}`
      },
      bullets: [
        "Do not return null when the user does not exist.",
        "Throw UsernameNotFoundException.",
        "Let the authentication infrastructure handle the authentication failure."
      ]
    },

    {
      id: "null-user",
      title: "Why Should loadUserByUsername() Not Return null?",
      paragraphs: [
        "UserDetailsService is expected to return a UserDetails object when the user exists.",
        "If the user cannot be found, the implementation should throw UsernameNotFoundException rather than returning null."
      ],
      code: {
        language: "java",
        code: `// Good

throw new UsernameNotFoundException(
    "User not found"
);


// Avoid

return null;`
      }
    },

    {
      id: "case-sensitivity",
      title: "Username and Email Consistency",
      paragraphs: [
        "Authentication identifiers should have a clearly defined normalization and uniqueness policy.",
        "For example, if email addresses are used for login, the application should decide how case normalization and uniqueness are handled rather than allowing inconsistent behavior between registration and login."
      ],
      bullets: [
        "Define whether usernames are case-sensitive.",
        "Define how email addresses are normalized.",
        "Enforce uniqueness at the database level.",
        "Use the same normalization rules during registration and authentication."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common UserDetails and UserDetailsService Mistakes",
      bullets: [
        "Storing plain-text passwords.",
        "Returning null instead of throwing UsernameNotFoundException.",
        "Returning an incorrect password value.",
        "Forgetting to map authorities.",
        "Using ROLE_ADMIN in one place and ADMIN in another without understanding the role convention.",
        "Using hasRole(\"ROLE_ADMIN\") when the configuration expects hasRole(\"ADMIN\").",
        "Using hasAuthority(\"ADMIN\") when the actual authority is ROLE_ADMIN.",
        "Querying the wrong user field.",
        "Allowing duplicate usernames or login identifiers.",
        "Returning database entities directly from REST APIs.",
        "Putting too much business logic inside UserDetailsService.",
        "Performing unnecessary database queries during authentication.",
        "Ignoring lazy-loading problems for authorities.",
        "Logging passwords or authentication credentials.",
        "Assuming UserDetailsService must run for every JWT request."
      ]
    },

    {
      id: "best-practices",
      title: "UserDetailsService Best Practices",
      bullets: [
        "Keep UserDetailsService focused on loading authentication data.",
        "Use a repository for database access.",
        "Use a unique login identifier.",
        "Store only encoded password values.",
        "Use PasswordEncoder for password verification.",
        "Map only required security information into UserDetails.",
        "Keep authorities consistent across database and security configuration.",
        "Throw UsernameNotFoundException when a user cannot be found.",
        "Avoid unnecessary database calls.",
        "Be careful with lazy-loaded authority relationships.",
        "Do not log credentials or sensitive tokens.",
        "Keep API DTOs separate from UserDetails and persistence entities.",
        "Use custom UserDetails only when the built-in representation is insufficient."
      ]
    },

    {
      id: "testing",
      title: "Testing UserDetailsService",
      paragraphs: [
        "UserDetailsService can be unit tested independently by mocking the repository and verifying the mapping and failure behavior."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldLoadUser() {

    AppUser user = new AppUser();
    user.setUsername("venkat");
    user.setPassword("$2a$...");

    when(userRepository.findByUsername("venkat"))
        .thenReturn(Optional.of(user));

    UserDetails result =
        service.loadUserByUsername("venkat");

    assertEquals(
        "venkat",
        result.getUsername()
    );

    assertEquals(
        "$2a$...",
        result.getPassword()
    );
}`
      },
      bullets: [
        "Test successful user loading.",
        "Test user-not-found behavior.",
        "Test authority mapping.",
        "Test account-status mapping when used.",
        "Verify the repository is called with the expected identifier."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is UserDetails?",
          answer:
            "UserDetails is a Spring Security interface that represents user information required during authentication, including username, encoded password, authorities, and account-status information."
        },
        {
          question: "What is UserDetailsService?",
          answer:
            "UserDetailsService is a Spring Security interface used to load user-specific authentication data by username."
        },
        {
          question: "What is the difference between UserDetails and UserDetailsService?",
          answer:
            "UserDetails represents the loaded user's authentication information, while UserDetailsService is responsible for loading that information."
        },
        {
          question: "What method does UserDetailsService provide?",
          answer:
            "It provides loadUserByUsername(String username), which returns UserDetails or throws UsernameNotFoundException when the user cannot be found."
        },
        {
          question: "Where is UserDetailsService commonly used?",
          answer:
            "It is commonly used with username-password authentication when Spring Security needs to load a user from a database or another user store."
        },
        {
          question: "Does UserDetailsService validate the password?",
          answer:
            "No. It primarily loads user information. The authentication provider typically uses PasswordEncoder to verify the submitted password against the stored encoded password."
        },
        {
          question: "What is UserDetailsManager?",
          answer:
            "UserDetailsManager extends UserDetailsService and adds operations such as creating, updating, deleting, and checking users."
        },
        {
          question: "What happens if loadUserByUsername() cannot find the user?",
          answer:
            "The implementation should normally throw UsernameNotFoundException."
        },
        {
          question: "What is GrantedAuthority?",
          answer:
            "GrantedAuthority represents a permission or role that can be used during authorization decisions."
        },
        {
          question: "What is the difference between roles and authorities?",
          answer:
            "A role is commonly represented as an authority with the ROLE_ prefix, while authorities can also represent granular permissions such as EMPLOYEE_READ or REPORT_EXPORT."
        },
        {
          question: "What does hasRole(\"ADMIN\") normally check?",
          answer:
            "It normally checks for the authority ROLE_ADMIN."
        },
        {
          question: "What does hasAuthority(\"ADMIN\") check?",
          answer:
            "It checks for the exact authority string ADMIN."
        },
        {
          question: "Why should UserDetailsService not return null?",
          answer:
            "When the user cannot be found, it should throw UsernameNotFoundException so that the authentication infrastructure can treat the authentication attempt as unsuccessful."
        },
        {
          question: "Should UserDetails be used as a REST API response?",
          answer:
            "Generally no. UserDetails is a security abstraction, not an API response DTO. API responses should use dedicated DTOs and should never expose passwords."
        },
        {
          question: "Does UserDetailsService execute on every JWT request?",
          answer:
            "Not necessarily. With JWT resource-server authentication, subsequent requests can be authenticated from a validated bearer token without loading the user through UserDetailsService on every request."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A user can log in successfully, but /api/admin/** returns 403. What would you check?",
          answer:
            "Check whether the user's authorities contain the expected role or permission, verify the hasRole or hasAuthority configuration, and confirm that the authority names match."
        },
        {
          question:
            "Your database contains ROLE_ADMIN, but hasAuthority(\"ADMIN\") fails. Why?",
          answer:
            "hasAuthority checks the exact authority string. The stored authority is ROLE_ADMIN, so hasAuthority(\"ROLE_ADMIN\") would match it. Alternatively, hasRole(\"ADMIN\") normally checks ROLE_ADMIN."
        },
        {
          question:
            "UserDetailsService returns a user but authentication still fails. What would you investigate?",
          answer:
            "Check whether the stored password is correctly encoded, whether the configured PasswordEncoder matches the stored hash format, whether the account is enabled and not locked or expired, and whether the authentication provider is configured correctly."
        },
        {
          question:
            "Why would you keep AppUser separate from UserDetails?",
          answer:
            "AppUser represents the application's persistence/domain model, while UserDetails represents authentication-specific information. Separating them reduces coupling and prevents persistence details from becoming the security model."
        },
        {
          question:
            "Why is a database-level unique constraint important for username or email login?",
          answer:
            "Authentication depends on identifying one user reliably. A database uniqueness constraint prevents multiple records from sharing the same login identifier."
        },
        {
          question:
            "A JWT API works without calling UserDetailsService for every request. Is that necessarily a problem?",
          answer:
            "No. A resource-server JWT configuration can validate the bearer token and construct the authenticated identity directly from the validated token. UserDetailsService may still be used during login or in other application flows."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "UserDetails represents security-related user information.",
        "UserDetailsService loads UserDetails.",
        "loadUserByUsername() is the main UserDetailsService method.",
        "UserDetails can contain username, encoded password, authorities, and account status.",
        "UserDetailsService commonly loads users from a database.",
        "UserDetailsService does not normally perform password verification itself.",
        "AuthenticationProvider commonly verifies the password.",
        "PasswordEncoder is used for password hashing and verification.",
        "GrantedAuthority represents a role or permission.",
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"EMPLOYEE_READ\") checks the exact authority.",
        "Throw UsernameNotFoundException when the user does not exist.",
        "Do not store plain-text passwords.",
        "Do not expose UserDetails or passwords through API responses.",
        "UserDetailsService does not necessarily run on every JWT request.",
        "Keep application user entities separate from security representations when practical."
      ]
    },

    {
      id: "architecture-summary",
      title: "One-Minute Interview Explanation",
      paragraphs: [
        "UserDetails is a Spring Security abstraction that represents the authentication information of a user, such as username, encoded password, authorities, and account status.",
        "UserDetailsService is responsible for loading that information, commonly from a database. During username-password authentication, an AuthenticationProvider calls UserDetailsService, receives UserDetails, and uses PasswordEncoder to verify the submitted password. If authentication succeeds, Spring Security creates an authenticated Authentication and makes it available through the SecurityContext. Later authorization rules use the authorities contained in that authentication to determine whether the user can access protected resources."
      ],
      code: {
        language: "text",
        code: `User Login
   |
   v
AuthenticationManager
   |
   v
AuthenticationProvider
   |
   v
UserDetailsService
   |
   v
UserDetails
   |
   v
PasswordEncoder
   |
   v
Authenticated Authentication
   |
   v
SecurityContext
   |
   v
Authorization`
      }
    },

    {
      id: "revision-notes",
      title: "Important Interview Notes",
      paragraphs: [
        "Remember the simplest distinction: UserDetails is the user information; UserDetailsService loads that information.",
        "Remember the authentication flow: AuthenticationManager -> AuthenticationProvider -> UserDetailsService -> UserDetails -> PasswordEncoder verification -> authenticated Authentication -> SecurityContext.",
        "Do not say that UserDetailsService validates passwords. Its main job is to load user information. Password verification is normally performed by the authentication provider using PasswordEncoder.",
        "Do not say that UserDetailsService must run on every JWT request. In a JWT resource-server architecture, a validated bearer token can establish Authentication without loading the user from the database on every request.",
        "For roles, remember that hasRole(\"ADMIN\") normally checks ROLE_ADMIN, while hasAuthority(\"ADMIN\") checks the exact string ADMIN.",
        "A strong production design normally keeps the application's AppUser entity separate from Spring Security's UserDetails representation and performs the mapping in the authentication layer."
      ]
    }
  ]
};
