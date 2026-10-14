
export const authenticationVsAuthorization = {
  id: 1102,
  title: "Authentication vs Authorization",
  slug: "authentication-vs-authorization",
  topicTitle: "Spring Security",
  description:
    "Understand the difference between identifying a user and checking their permissions.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "authentication",
      title: "What Is Authentication?",
      paragraphs: [
        "Authentication is the process of verifying the identity of a user, application, or client. In simple terms, authentication answers the question: Who are you?",
        "A common example is a login operation where a user provides a username and password. The application verifies those credentials before considering the user authenticated.",
        "In Spring Security, successful authentication results in an Authentication object representing the current authenticated identity.",
        "Authentication can be performed using different mechanisms such as username and password, HTTP Basic, bearer tokens such as JWTs, certificates, OAuth2, or other authentication providers."
      ],
      bullets: [
        "Authentication verifies identity.",
        "Username and password are common authentication credentials.",
        "JWT bearer tokens are commonly used for REST APIs.",
        "Spring Security represents the authenticated identity using Authentication.",
        "Authentication normally occurs before authorization decisions."
      ]
    },

    {
      id: "authentication-flow",
      title: "Authentication Flow",
      paragraphs: [
        "In a Spring Security application, a protected HTTP request normally passes through the Spring Security filter chain before reaching the controller.",
        "The configured authentication mechanism examines the request. If valid credentials or a valid bearer token are available, Spring Security establishes an authenticated identity.",
        "If authentication fails, the request normally does not continue to the protected controller endpoint."
      ],
      code: {
        language: "text",
        code: `Client
   |
   | Login credentials / Bearer Token
   v
Spring Security Filter Chain
   |
   v
Authentication Mechanism
   |
   +---- Authentication successful
   |             |
   |             v
   |      Authentication object
   |             |
   |             v
   |       SecurityContext
   |             |
   |             v
   |       Authorization
   |
   +---- Authentication failed
                 |
                 v
              401`
      },
      bullets: [
        "The request first enters the security layer.",
        "Authentication establishes the caller's identity.",
        "The SecurityContext represents the security context for the current request.",
        "Authorization can use the authenticated identity and its authorities."
      ]
    },

    {
      id: "authentication-object",
      title: "Authentication Object",
      paragraphs: [
        "Authentication is a Spring Security interface used to represent the current authentication information.",
        "It can contain the principal, credentials, granted authorities, and authentication state.",
        "Application code can access the current Authentication when it needs information about the authenticated user."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
        SecurityContextHolder
            .getContext()
            .getAuthentication();

String username = authentication.getName();

Collection<? extends GrantedAuthority> authorities =
        authentication.getAuthorities();`
      },
      bullets: [
        "getName() commonly returns the authenticated username or principal name.",
        "getAuthorities() returns the authorities granted to the authenticated identity.",
        "SecurityContextHolder provides access to the current security context.",
        "The exact Authentication implementation depends on the authentication mechanism."
      ]
    },

    {
      id: "authentication-example",
      title: "Example: Username and Password Authentication",
      paragraphs: [
        "One common authentication flow uses a username and password.",
        "Spring Security can use a UserDetailsService to load user information and a PasswordEncoder to verify the supplied password against the stored password hash.",
        "If the credentials are valid, authentication succeeds. If the credentials are invalid, authentication fails."
      ],
      code: {
        language: "java",
        code: `@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        return User.withUsername(username)
                .password("$2a$10$encodedPassword")
                .roles("USER")
                .build();
    }
}`
      },
      bullets: [
        "UserDetailsService loads user information.",
        "PasswordEncoder is used for password verification.",
        "AuthenticationProvider performs authentication using the configured authentication mechanism.",
        "A production application should never store plaintext passwords."
      ]
    },

    {
      id: "authorization",
      title: "What Is Authorization?",
      paragraphs: [
        "Authorization is the process of determining whether an authenticated identity is allowed to access a resource or perform an operation.",
        "In simple terms, authorization answers the question: What are you allowed to do?",
        "For example, both USER and ADMIN accounts may successfully log in, but only ADMIN users may delete another user's account.",
        "Authorization can be based on roles, authorities, scopes, resource ownership, or application-specific business rules."
      ],
      bullets: [
        "Authorization checks permissions.",
        "Authorization commonly uses the authenticated identity.",
        "Roles are commonly used for broad access control.",
        "Authorities can represent more specific permissions.",
        "Authorization can be applied at URL or method level."
      ]
    },

    {
      id: "authorization-flow",
      title: "Authorization Flow",
      paragraphs: [
        "Once Spring Security has established an authenticated identity, it can evaluate whether the identity has the permission required by the requested resource.",
        "For example, an endpoint may require ROLE_ADMIN. A USER can be authenticated successfully but still be denied access because the USER does not have the required authority."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Authentication
     |
     | Identity established
     v
Authorization Check
     |
     +---- Required authority exists
     |              |
     |              v
     |          Controller
     |
     +---- Required authority missing
                    |
                    v
                 403`
      }
    },

    {
      id: "comparison",
      title: "Key Differences",
      bullets: [
        "Authentication asks: Who are you?",
        "Authorization asks: What are you allowed to do?",
        "Authentication verifies identity.",
        "Authorization verifies permissions.",
        "Authentication commonly happens before authorization decisions.",
        "Authentication can use passwords, tokens, certificates, or external identity providers.",
        "Authorization can use roles, authorities, scopes, ownership, or business rules.",
        "A user can be authenticated and still be forbidden from accessing a resource."
      ]
    },

    {
      id: "roles-vs-authorities",
      title: "Roles vs Authorities",
      paragraphs: [
        "Spring Security supports both roles and authorities. A role is commonly used as a broad category of access, while an authority can represent a more specific permission.",
        "For example, an application might assign ROLE_ADMIN to an administrator and USER_DELETE as a fine-grained permission.",
        "The authorization model should match the application's security requirements."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")
    .requestMatchers(HttpMethod.DELETE, "/api/users/**")
        .hasAuthority("USER_DELETE")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "hasRole(\"ADMIN\") normally checks for ROLE_ADMIN.",
        "hasAuthority(\"USER_DELETE\") checks the exact authority.",
        "Roles are useful for broad access categories.",
        "Authorities are useful for fine-grained permissions."
      ]
    },

    {
      id: "endpoint-example",
      title: "Example: Role-Based Access",
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/user/**").authenticated()
    .anyRequest().denyAll()
);`
      },
      paragraphs: [
        "The example permits public requests, restricts administrative paths to users with the ADMIN role, and requires authentication for user paths.",
        "The final denyAll rule rejects unmatched requests instead of accidentally allowing them.",
        "In Spring Security, hasRole(\"ADMIN\") normally checks for the authority ROLE_ADMIN."
      ]
    },

    {
      id: "method-authorization",
      title: "Method-Level Authorization",
      paragraphs: [
        "Authorization can also be applied directly to methods instead of only URL patterns.",
        "Method-level authorization is useful when a particular service operation should only be executed by users with a specific role or authority.",
        "This can be especially useful when authorization depends on business operations rather than simply the URL."
      ],
      code: {
        language: "java",
        code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long userId) {
    userRepository.deleteById(userId);
}`
      },
      bullets: [
        "@PreAuthorize evaluates an authorization expression before method execution.",
        "Method security can protect service-layer operations.",
        "Method-level authorization can provide finer-grained control.",
        "Method security must be enabled in the application's configuration."
      ]
    },

    {
      id: "jwt-authentication",
      title: "Authentication Using JWT",
      paragraphs: [
        "In a JWT-based REST API, the client commonly sends a bearer token with each protected request.",
        "Spring Security validates the token according to the configured JWT or resource-server setup. If authentication succeeds, the request receives an authenticated security context.",
        "The token can contain claims related to identity and authorities or scopes, but possessing a valid token does not automatically grant permission to every endpoint."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | Authorization: Bearer <JWT>
  v
Spring Security
  |
  | Validate token
  | Check signature
  | Check expiration
  | Build authenticated principal
  v
Authentication
  |
  v
Authorization
  |
  +---- allowed ----> Controller
  |
  +---- denied ------> 403`
      },
      bullets: [
        "A valid JWT can establish authentication.",
        "JWT validation and authorization are separate concepts.",
        "Authorities or scopes can participate in authorization decisions.",
        "A valid token does not mean every operation is allowed."
      ]
    },

    {
      id: "authentication-authorization-flow",
      title: "Complete Authentication and Authorization Flow",
      paragraphs: [
        "Consider a request to GET /api/admin/users containing a bearer token.",
        "Spring Security first processes the token and establishes the authenticated identity. It then checks whether the identity has the authority required by the endpoint.",
        "If the token is invalid, authentication fails. If authentication succeeds but the user lacks the required ADMIN authority, authorization fails."
      ],
      code: {
        language: "text",
        code: `GET /api/admin/users
Authorization: Bearer <token>
        |
        v
Security Filter Chain
        |
        v
Authenticate Request
        |
        +---- Invalid / missing ----> 401
        |
        v
Authenticated Identity
        |
        v
Check ROLE_ADMIN
        |
        +---- Missing authority --> 403
        |
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
Database`
      }
    },

    {
      id: "http-status",
      title: "401 vs 403",
      paragraphs: [
        "HTTP 401 and 403 are commonly discussed when explaining authentication and authorization failures.",
        "401 generally indicates that authentication is missing or unsuccessful. 403 generally indicates that access is forbidden because the authenticated identity does not have sufficient permission.",
        "The exact response behavior can depend on the configured AuthenticationEntryPoint and AccessDeniedHandler."
      ],
      bullets: [
        "401 generally means authentication is missing or has failed.",
        "403 generally means authentication may have succeeded but access is not permitted.",
        "An invalid or expired bearer token can result in authentication failure.",
        "An authenticated USER accessing an ADMIN-only endpoint commonly results in 403."
      ]
    },

    {
      id: "ownership-authorization",
      title: "Authorization Based on Resource Ownership",
      paragraphs: [
        "Not every authorization decision can be solved using roles alone.",
        "For example, a USER may be allowed to view their own profile but not another user's private profile.",
        "The application may therefore need to compare the authenticated identity with the owner of the requested resource."
      ],
      code: {
        language: "java",
        code: `@GetMapping("/users/{id}")
public UserResponse getUser(
        @PathVariable Long id,
        Authentication authentication) {

    String currentUsername = authentication.getName();

    return userService.getUserForOwner(id, currentUsername);
}`
      },
      bullets: [
        "Role checks provide broad authorization.",
        "Ownership checks provide resource-specific authorization.",
        "Complex applications often combine roles with ownership rules.",
        "Authorization should be enforced on the backend."
      ]
    },

    {
      id: "frontend-vs-backend",
      title: "Why Frontend Authorization Is Not Enough",
      paragraphs: [
        "A React application may hide an ADMIN button from a normal user. This improves the user experience, but it is not a security boundary.",
        "A malicious client can bypass the frontend and directly call the REST API.",
        "Therefore, the Spring Boot backend must independently authenticate every protected request and enforce authorization."
      ],
      code: {
        language: "text",
        code: `React Frontend
     |
     | Hide admin button
     |       (UX only)
     v
Spring Boot Backend
     |
     | Authentication
     v
Authorization
     |
     +---- ADMIN --> Allow
     |
     +---- USER ---> Deny
                  |
                  v
                 403`
      },
      bullets: [
        "Frontend checks are useful for user experience.",
        "Backend checks are required for actual security.",
        "Never trust a client to enforce authorization by itself."
      ]
    },

    {
      id: "security-context",
      title: "SecurityContext and Current User",
      paragraphs: [
        "Spring Security maintains security information for the current request through the SecurityContext.",
        "The SecurityContext can contain the current Authentication object.",
        "Application code can use this information when it needs to determine which identity is making the request."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
    SecurityContextHolder
        .getContext()
        .getAuthentication();

if (authentication != null &&
    authentication.isAuthenticated()) {

    String username = authentication.getName();
}`
      },
      bullets: [
        "SecurityContext contains the security context for the current execution.",
        "Authentication represents the current authenticated identity.",
        "isAuthenticated() indicates the authentication state according to the Authentication implementation.",
        "Security-aware application code should use Spring Security's authenticated identity rather than trusting client-supplied identity fields."
      ]
    },

    {
      id: "real-world-example",
      title: "Real-World Example",
      paragraphs: [
        "Consider an e-commerce application with CUSTOMER and ADMIN users.",
        "A customer enters valid credentials. Authentication confirms the customer's identity.",
        "The customer can then access their orders because the application authorizes the CUSTOMER role for that operation.",
        "If the same customer attempts to delete another customer's account, authentication has already succeeded, but authorization should reject the operation because the customer does not have the required administrative authority."
      ],
      code: {
        language: "text",
        code: `Login
  |
  v
Authentication
  |
  | customer123
  v
Authenticated User
  |
  +--> GET /api/orders
  |       |
  |       +--> CUSTOMER allowed --> 200
  |
  +--> DELETE /api/admin/users/10
          |
          +--> ADMIN required
          |
          +--> CUSTOMER lacks permission --> 403`
      }
    },

    {
      id: "testing-security",
      title: "Testing Authentication and Authorization",
      paragraphs: [
        "Security rules should be tested for both allowed and denied scenarios.",
        "For a protected endpoint, useful tests include unauthenticated requests, authenticated users without sufficient authority, and authenticated users with the required authority.",
        "Security tests should verify the application's actual authorization policy rather than only checking that a login operation works."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(get("/api/admin/users"))
       .andExpect(status().isUnauthorized());

mockMvc.perform(
        get("/api/admin/users")
            .with(jwt().authorities(
                new SimpleGrantedAuthority("ROLE_USER")
            ))
    )
    .andExpect(status().isForbidden());`
      },
      bullets: [
        "Test unauthenticated access.",
        "Test authenticated users without sufficient authority.",
        "Test authorized users.",
        "Test invalid or expired authentication where applicable.",
        "Test resource ownership rules when they exist."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Confusing authentication with authorization.",
        "Assuming that every authenticated user can access every endpoint.",
        "Forgetting that hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "Using only frontend checks to protect backend resources.",
        "Trusting a username supplied in a request parameter as proof of identity.",
        "Assuming a valid JWT automatically gives access to every endpoint.",
        "Returning or treating 401 and 403 as the same security condition.",
        "Leaving sensitive endpoints without explicit authorization rules.",
        "Giving users more permissions than they actually need.",
        "Putting authorization logic only in the UI instead of enforcing it on the backend."
      ]
    },

    {
      id: "best-practices",
      title: "Authentication and Authorization Best Practices",
      bullets: [
        "Use strong password hashing such as BCrypt or Argon2 rather than storing plaintext passwords.",
        "Use the principle of least privilege.",
        "Protect every sensitive backend endpoint.",
        "Use explicit authorization rules for administrative operations.",
        "Use method-level authorization when business operations need fine-grained protection.",
        "Keep frontend authorization checks as a user-experience feature, not the security boundary.",
        "Use short-lived access tokens when appropriate for token-based systems.",
        "Protect refresh-token mechanisms carefully when they are used.",
        "Do not expose passwords, access tokens, or other secrets in logs.",
        "Test both successful and rejected authorization scenarios.",
        "Prefer a deny-by-default approach where appropriate for sensitive APIs."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is the difference between authentication and authorization?",
          answer:
            "Authentication verifies identity, while authorization determines whether the authenticated identity has permission to access a resource or perform an operation."
        },
        {
          question: "What question does authentication answer?",
          answer:
            "Authentication answers 'Who are you?' It verifies the identity of the user or client."
        },
        {
          question: "What question does authorization answer?",
          answer:
            "Authorization answers 'What are you allowed to do?' It checks whether the authenticated identity has the required permission."
        },
        {
          question: "Can a user be authenticated but not authorized?",
          answer:
            "Yes. A user can successfully authenticate but still lack the role or authority required to access a particular resource."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer:
            "401 generally indicates missing or failed authentication, while 403 generally indicates that the authenticated identity is not permitted to access the requested resource."
        },
        {
          question: "What is an Authentication object?",
          answer:
            "Authentication is a Spring Security interface that represents the current authentication information, including the principal and granted authorities."
        },
        {
          question: "What is the difference between hasRole and hasAuthority?",
          answer:
            "hasRole checks a role using Spring Security's role convention, so hasRole(\"ADMIN\") normally checks ROLE_ADMIN. hasAuthority checks the exact authority string."
        },
        {
          question: "Where does authentication happen in Spring Security?",
          answer:
            "Authentication is commonly performed by Spring Security filters and authentication components before a protected request reaches the controller."
        },
        {
          question: "Where does authorization happen?",
          answer:
            "Authorization is performed after the security identity and its authorities are available. It can be applied to HTTP requests and method invocations."
        },
        {
          question: "Why is frontend authorization not enough?",
          answer:
            "A client can bypass the frontend and call the backend directly, so the backend must independently enforce authentication and authorization."
        },
        {
          question: "What is role-based authorization?",
          answer:
            "Role-based authorization grants users roles such as USER or ADMIN and controls access based on those roles."
        },
        {
          question: "Can authorization depend on more than roles?",
          answer:
            "Yes. Authorization can depend on authorities, scopes, resource ownership, attributes, and application-specific business rules."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A USER logs in successfully but tries to access an ADMIN endpoint. What happens?",
          answer:
            "Authentication succeeds because the user's identity is valid. Authorization then checks the required ADMIN authority. Because the USER lacks that authority, access is normally denied with 403 Forbidden."
        },
        {
          question:
            "A request to a protected API contains no authentication credentials. What happens?",
          answer:
            "If authentication is required and no valid authentication is available, the request normally fails during authentication and results in a 401 response according to the configured security handlers."
        },
        {
          question:
            "A user changes the frontend URL from /user/profile to /admin/users. Is the frontend change itself a security boundary?",
          answer:
            "No. The backend must independently check whether the authenticated user has permission to access /admin/users."
        },
        {
          question:
            "Why can a valid JWT still result in 403?",
          answer:
            "A valid JWT can authenticate the user successfully, but the authorities or scopes associated with that identity may not satisfy the authorization rule for the requested resource."
        },
        {
          question:
            "A USER can view their own profile but should not view another user's profile. Is role checking alone sufficient?",
          answer:
            "Not necessarily. The application may need a resource-ownership check that compares the authenticated user's identity with the owner of the requested profile."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "Authentication = Who are you?",
        "Authorization = What are you allowed to do?",
        "Authentication establishes identity.",
        "Authorization evaluates permissions.",
        "Authentication commonly happens before authorization.",
        "401 generally indicates missing or failed authentication.",
        "403 generally indicates insufficient permission.",
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"USER_DELETE\") checks the exact authority.",
        "Frontend checks improve UX but are not the backend security boundary.",
        "Backend authorization must protect sensitive resources.",
        "Authorization can use roles, authorities, scopes, ownership, or business rules."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes for Interview",
      paragraphs: [
        "The easiest way to remember the difference is: Authentication identifies the caller, while Authorization decides what that caller is allowed to access.",
        "In Spring Security, authentication establishes the authenticated identity, commonly represented by an Authentication object. Authorization then uses that identity and its authorities to make access decisions.",
        "A common interview scenario is: 'The user logged in successfully but cannot access the admin API.' The successful login proves authentication succeeded. The denied admin API demonstrates that authorization failed.",
        "For REST APIs, remember the common distinction: 401 is generally related to missing or failed authentication, while 403 is generally related to insufficient permission.",
        "For production applications, authorization should be enforced on the backend, permissions should follow least privilege, sensitive endpoints should be explicitly protected, and both successful and denied scenarios should be tested."
      ]
    }
  ]
};
