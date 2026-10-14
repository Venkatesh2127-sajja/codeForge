
export const whatIsSpringSecurity = {
  id: 1101,
  title: "What Is Spring Security?",
  slug: "what-is-spring-security",
  topicTitle: "Spring Security",
  description:
    "Understand how Spring Security protects Spring Boot applications and REST APIs.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "Spring Security is a framework that provides authentication, authorization, and protection against common application security attacks for Java applications.",
        "It integrates deeply with Spring applications and provides security infrastructure that can process HTTP requests before they reach application controllers.",
        "In a Spring Boot REST API, Spring Security can determine whether a request is permitted, whether the user must authenticate, and which operations an authenticated user can perform.",
        "Spring Security can also integrate with password authentication, sessions, bearer tokens, OAuth 2.0, OpenID Connect, method security, CSRF protection, CORS configuration, security headers, and other security mechanisms.",
        "Security should be enforced on the server. Hiding a button in React is useful for user experience, but it does not prevent a client from directly calling the API."
      ],
      code: {
        language: "text",
        code: `React Frontend
      |
      | HTTP Request
      v
Spring Boot REST API
      |
      v
Spring Security
      |
      +---- Authentication
      |
      +---- Authorization
      |
      +---- Security Protection
      |
      v
Controller
      |
      v
Service
      |
      v
Database`
      },
      bullets: [
        "Spring Security is primarily a server-side security framework.",
        "Authentication determines identity.",
        "Authorization determines permissions.",
        "Security filters can process requests before controllers.",
        "Security rules should be enforced by the backend.",
        "Frontend permission checks are useful for UX but are not a security boundary."
      ]
    },

    {
      id: "security-problem",
      title: "What Problem Does Spring Security Solve?",
      paragraphs: [
        "Without a security framework, developers might have to manually check credentials, validate sessions or tokens, verify permissions, protect passwords, handle security exceptions, and repeat these checks across many controllers.",
        "This approach can lead to duplicated code and inconsistent security behavior.",
        "Spring Security centralizes many of these concerns and provides reusable infrastructure for authentication and authorization."
      ],
      code: {
        language: "text",
        code: `Without Security Framework

Controller A -> check login
Controller B -> check login
Controller C -> check role
Controller D -> forgot security check

Problems:
- Duplicate code
- Inconsistent rules
- Easy to miss an endpoint
- Difficult maintenance


With Spring Security

Request
   |
   v
Security Layer
   |
   +---- Authentication
   |
   +---- Authorization
   |
   v
Controller`
      }
    },

    {
      id: "authentication",
      title: "Authentication",
      paragraphs: [
        "Authentication verifies who a user or client is.",
        "For example, an application may validate a username and password, a session, or a bearer token.",
        "Successful authentication produces an authenticated security identity that can later be used during authorization."
      ],
      code: {
        language: "text",
        code: `User submits credentials
        |
        v
Authentication processing
        |
        +---- Invalid
        |       |
        |       v
        |    Authentication Failure
        |
        +---- Valid
                |
                v
          Authenticated Identity`
      },
      bullets: [
        "Username and password authentication is one possible mechanism.",
        "Session-based authentication is another mechanism.",
        "Bearer-token authentication is commonly used for REST APIs.",
        "OAuth 2.0 and OpenID Connect can be used in appropriate architectures.",
        "Authentication does not automatically mean the user is authorized for every operation."
      ]
    },

    {
      id: "authentication-example",
      title: "Authentication Example",
      paragraphs: [
        "Suppose a user sends a login request containing a username and password.",
        "The application verifies the credentials. If the credentials are valid, Spring Security establishes an authenticated identity."
      ],
      code: {
        language: "text",
        code: `POST /api/login

{
  "username": "venkat",
  "password": "********"
}

        |
        v

Validate Credentials

        |
        v

Authentication Success

        |
        v

Authenticated User`
      }
    },

    {
      id: "authorization",
      title: "Authorization",
      paragraphs: [
        "Authorization determines what an authenticated user is allowed to do.",
        "For example, an administrator may access an administrative endpoint while a regular user cannot.",
        "Authorization can be based on roles, authorities, permissions, ownership, request attributes, or other application rules."
      ],
      code: {
        language: "text",
        code: `Authenticated User
        |
        v
Authorization Check
        |
        +---- Allowed
        |       |
        |       v
        |   Controller
        |
        +---- Denied
                |
                v
              403`
      },
      bullets: [
        "Authentication answers: Who are you?",
        "Authorization answers: What are you allowed to do?",
        "A user can be authenticated but still unauthorized.",
        "Authorization must be enforced on the backend."
      ]
    },

    {
      id: "authentication-vs-authorization",
      title: "Authentication vs Authorization",
      paragraphs: [
        "Authentication and authorization are related but different concepts.",
        "Authentication happens when the system establishes the caller's identity. Authorization happens when the system decides whether that identity has permission to perform a requested operation."
      ],
      code: {
        language: "text",
        code: `Request
   |
   v
Authentication
   |
   | Who is the caller?
   v
Authenticated Identity
   |
   v
Authorization
   |
   | Is access allowed?
   |
   +---- Yes ----> Resource
   |
   +---- No -----> 403`
      },
      bullets: [
        "Authentication = identity.",
        "Authorization = permission.",
        "Authentication normally happens before authorization.",
        "A valid login does not give unlimited access."
      ]
    },

    {
      id: "security-filter-architecture",
      title: "Spring Security Filter Architecture",
      paragraphs: [
        "Spring Security commonly processes servlet-based HTTP requests through a security filter chain.",
        "The filters can perform authentication, security-context handling, authorization, CSRF processing, security headers, and other security-related work before the request reaches the controller."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Servlet Container
     |
     v
DelegatingFilterProxy
     |
     v
FilterChainProxy
     |
     v
SecurityFilterChain
     |
     v
Security Filters
     |
     v
DispatcherServlet
     |
     v
Controller`
      }
    },

    {
      id: "request-flow",
      title: "Complete Spring Security Request Flow",
      paragraphs: [
        "Understanding the request flow is one of the most important Spring Security concepts for interviews.",
        "The security layer normally processes the request before DispatcherServlet invokes the controller."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | HTTP Request
  v
Embedded Tomcat
  |
  v
Spring Security Filters
  |
  +---- Authentication
  |
  +---- SecurityContext
  |
  +---- Authorization
  |
  v
DispatcherServlet
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
      },
      bullets: [
        "The request first reaches the servlet container.",
        "Spring Security processes security concerns through its filter infrastructure.",
        "An authenticated identity can be established.",
        "Authorization is evaluated.",
        "Only an allowed request continues to the controller."
      ]
    },

    {
      id: "security-context",
      title: "SecurityContext",
      paragraphs: [
        "Spring Security uses a SecurityContext to hold security information associated with the current execution.",
        "The SecurityContext can contain an Authentication object representing the current authenticated principal and authorities.",
        "Application code can access the established authentication when it needs the current security identity."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
    SecurityContextHolder
        .getContext()
        .getAuthentication();

if (authentication != null) {
    String username =
        authentication.getName();
}`
      },
      bullets: [
        "SecurityContext represents the current security state.",
        "Authentication represents the authenticated identity.",
        "Authorities can be obtained from Authentication.",
        "Do not trust a client-supplied username as proof of identity."
      ]
    },

    {
      id: "principal",
      title: "Principal and Authorities",
      paragraphs: [
        "An authenticated Authentication contains information about the principal and granted authorities.",
        "The principal represents the authenticated identity, while authorities represent permissions or roles that can participate in authorization decisions."
      ],
      code: {
        language: "text",
        code: `Authentication
      |
      +---- Principal
      |       |
      |       +---- Username
      |       +---- Identity
      |
      +---- Authorities
              |
              +---- ROLE_USER
              +---- ROLE_ADMIN
              +---- EMPLOYEE_READ
              +---- REPORT_EXPORT`
      }
    },

    {
      id: "roles-and-authorities",
      title: "Roles and Authorities",
      paragraphs: [
        "Spring Security uses GrantedAuthority to represent permissions and roles.",
        "Roles are commonly represented using the ROLE_ prefix, while authorities can represent more granular permissions."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/admin/**")
    .hasRole("ADMIN")

    .requestMatchers("/api/reports/**")
    .hasAuthority("REPORT_READ")

    .anyRequest()
    .authenticated()
);`
      },
      bullets: [
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"REPORT_READ\") checks that exact authority.",
        "Use consistent authority naming.",
        "Roles and permissions should reflect the application's actual authorization requirements."
      ]
    },

    {
      id: "security-mechanisms",
      title: "Authentication Mechanisms Supported by Spring Security",
      paragraphs: [
        "Spring Security supports multiple authentication architectures. The correct mechanism depends on the application and deployment model.",
        "A browser application with server-side sessions may use session-based authentication, while a REST API may use bearer tokens. Applications can also integrate with OAuth 2.0 and OpenID Connect."
      ],
      bullets: [
        "Username and password authentication.",
        "Session-based authentication.",
        "HTTP Basic authentication.",
        "Bearer token authentication.",
        "OAuth 2.0 resource-server authentication.",
        "OpenID Connect integrations.",
        "Custom authentication mechanisms when genuinely required."
      ]
    },

    {
      id: "basic-configuration",
      title: "A Basic Security Configuration",
      paragraphs: [
        "This example permits requests under /api/public/** and requires authentication for other requests.",
        "HTTP Basic is used here to demonstrate the configuration. Production APIs should use an authentication mechanism appropriate to their clients and deployment."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**")
                .permitAll()

                .anyRequest()
                .authenticated()
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}`
      }
    },

    {
      id: "security-filter-chain",
      title: "SecurityFilterChain",
      paragraphs: [
        "SecurityFilterChain defines the security filters that apply to matching requests.",
        "In modern Spring Security configuration, it is commonly declared as a bean using HttpSecurity."
      ],
      code: {
        language: "java",
        code: `@Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**")
        .permitAll()
        .anyRequest()
        .authenticated()
    );

    return http.build();
}`
      },
      bullets: [
        "SecurityFilterChain defines request security behavior.",
        "HttpSecurity is used to configure the chain.",
        "http.build() creates the configured chain.",
        "Multiple SecurityFilterChain beans can be used when different request groups require different security configurations."
      ]
    },

    {
      id: "authentication-manager",
      title: "AuthenticationManager",
      paragraphs: [
        "AuthenticationManager is an abstraction responsible for processing authentication requests.",
        "A common implementation is ProviderManager, which delegates authentication to one or more AuthenticationProvider instances."
      ],
      code: {
        language: "text",
        code: `Authentication Request
        |
        v
AuthenticationManager
        |
        v
ProviderManager
        |
        +---- AuthenticationProvider
        |
        v
Authentication Result`
      }
    },

    {
      id: "authentication-provider",
      title: "AuthenticationProvider",
      paragraphs: [
        "AuthenticationProvider performs authentication for a particular type of authentication request.",
        "For username-password authentication, a common provider is DaoAuthenticationProvider, which can use UserDetailsService and PasswordEncoder."
      ],
      code: {
        language: "text",
        code: `Username + Password
        |
        v
AuthenticationProvider
        |
        +---- UserDetailsService
        |
        +---- PasswordEncoder
        |
        v
Authentication Result`
      }
    },

    {
      id: "user-details",
      title: "UserDetails and UserDetailsService",
      paragraphs: [
        "UserDetails represents user information needed by Spring Security, such as username, encoded password, authorities, and account status.",
        "UserDetailsService is commonly used to load that information from a database or another user store."
      ],
      code: {
        language: "text",
        code: `Login Identifier
      |
      v
UserDetailsService
      |
      v
UserDetails
      |
      +---- Username
      +---- Encoded Password
      +---- Authorities
      +---- Account Status`
      }
    },

    {
      id: "password-security",
      title: "Password Security",
      paragraphs: [
        "Passwords should never be stored as plain text.",
        "Spring Security integrates with PasswordEncoder implementations so applications can store password hashes and verify submitted passwords securely.",
        "Password hashing and password encryption are different concepts. Password hashes are designed to be one-way."
      ],
      code: {
        language: "java",
        code: `@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`
      },
      bullets: [
        "Never store raw passwords.",
        "Never log raw passwords.",
        "Do not return passwords from REST responses.",
        "Use a suitable PasswordEncoder.",
        "Use HTTPS when credentials are transmitted."
      ]
    },

    {
      id: "authorization-config",
      title: "Configuring Authorization",
      paragraphs: [
        "Authorization rules can be configured at the HTTP request level.",
        "A common pattern is to expose public endpoints explicitly and require authentication for everything else."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**")
    .permitAll()

    .requestMatchers("/api/admin/**")
    .hasRole("ADMIN")

    .requestMatchers("/api/reports/**")
    .hasAuthority("REPORT_READ")

    .anyRequest()
    .authenticated()
);`
      },
      bullets: [
        "permitAll() allows access without authentication.",
        "authenticated() requires authentication.",
        "hasRole() checks a role.",
        "hasAuthority() checks an exact authority.",
        "Specific rules should be placed before broad rules."
      ]
    },

    {
      id: "method-security",
      title: "Method-Level Security",
      paragraphs: [
        "Spring Security can also protect application methods.",
        "Method security is useful when authorization depends on business operations, method arguments, or resource ownership."
      ],
      code: {
        language: "java",
        code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long userId) {
    // Protected business operation
}`
      },
      bullets: [
        "Enable method security when using method-security annotations.",
        "Method security can complement URL-level security.",
        "Business ownership checks can be enforced at the service layer.",
        "Frontend permission checks should not replace method or endpoint authorization."
      ]
    },

    {
      id: "jwt",
      title: "Spring Security with JWT",
      paragraphs: [
        "JWT bearer authentication is commonly used in stateless REST APIs.",
        "The client sends an access token in the Authorization header. Spring Security validates the token and establishes an authenticated identity for the request.",
        "Spring Security Resource Server can provide standard bearer-token JWT processing, so a custom JWT filter is not automatically required."
      ],
      code: {
        language: "text",
        code: `React Frontend
      |
      | Authorization: Bearer <JWT>
      v
Spring Security
      |
      v
Bearer Token Authentication
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
      }
    },

    {
      id: "stateless-api",
      title: "Stateless REST APIs",
      paragraphs: [
        "Many REST APIs use bearer tokens and configure the application to avoid relying on an HTTP session for authentication state.",
        "In a stateless design, each request carries the credentials needed to authenticate that request."
      ],
      code: {
        language: "java",
        code: `http.sessionManagement(session ->
    session.sessionCreationPolicy(
        SessionCreationPolicy.STATELESS
    )
);`
      },
      bullets: [
        "Statelessness is an authentication/session design choice.",
        "The client commonly sends an access token with each request.",
        "Statelessness does not automatically solve authorization or token-revocation concerns.",
        "HTTPS is still required for protecting credentials and tokens in transit."
      ]
    },

    {
      id: "csrf",
      title: "CSRF Protection",
      paragraphs: [
        "Cross-Site Request Forgery is a different security concern from authentication and authorization.",
        "CSRF is particularly important to consider when browsers automatically attach authentication credentials such as cookies.",
        "Whether CSRF should be enabled or disabled depends on the authentication architecture."
      ],
      code: {
        language: "text",
        code: `Browser
   |
   | Request with browser credentials
   v
Spring Security
   |
   v
CSRF Protection
   |
   v
Authentication
   |
   v
Authorization
   |
   v
Controller`
      },
      bullets: [
        "Do not disable CSRF blindly.",
        "Cookie-based authentication requires careful CSRF consideration.",
        "Bearer tokens sent explicitly in Authorization headers have a different CSRF threat model.",
        "CSRF is not the same as CORS."
      ]
    },

    {
      id: "cors",
      title: "CORS and Spring Security",
      paragraphs: [
        "CORS controls whether browser-based JavaScript is allowed to make cross-origin requests.",
        "CORS does not authenticate a user and does not authorize access to an API.",
        "For example, a React application running on localhost:5173 and a Spring Boot API running on localhost:8080 have different origins because their ports differ."
      ],
      code: {
        language: "text",
        code: `React
http://localhost:5173
       |
       | Cross-Origin Request
       v
Spring Boot
http://localhost:8080
       |
       v
CORS Processing
       |
       v
Spring Security
       |
       v
Authentication / Authorization`
      },
      bullets: [
        "CORS is primarily enforced by browsers.",
        "CORS does not replace authentication.",
        "CORS does not replace authorization.",
        "Postman and curl are not subject to browser CORS enforcement."
      ]
    },

    {
      id: "security-status-codes",
      title: "Important Security HTTP Status Codes",
      paragraphs: [
        "Security failures commonly result in different HTTP status codes depending on the reason for rejection."
      ],
      code: {
        language: "text",
        code: `401 Unauthorized
    |
    +---- Authentication is missing or failed


403 Forbidden
    |
    +---- Authentication exists
          but access is not permitted`
      },
      bullets: [
        "401 commonly indicates an authentication problem.",
        "403 commonly indicates insufficient authorization.",
        "A successful authentication does not guarantee access to every endpoint."
      ]
    },

    {
      id: "frontend-vs-backend",
      title: "Why Frontend Security Is Not Enough",
      paragraphs: [
        "A React frontend can hide buttons, routes, or menu items based on the user's role. This improves user experience but does not secure the API.",
        "An attacker can ignore the React application and send HTTP requests directly to the backend using Postman, curl, a custom script, or another client.",
        "Therefore, the backend must independently authenticate and authorize every protected operation."
      ],
      code: {
        language: "text",
        code: `React UI
   |
   | Hide Admin Button
   v
Looks Protected

BUT

Attacker
   |
   | Direct HTTP Request
   v
Spring Boot API
   |
   v
Backend Authorization
   |
   +---- Must reject unauthorized request`
      },
      bullets: [
        "Frontend checks are for user experience.",
        "Backend checks enforce actual security.",
        "Never trust a role value sent by the frontend.",
        "Never assume hiding a route prevents API access."
      ]
    },

    {
      id: "common-attacks",
      title: "Security Threats Spring Applications Need to Consider",
      paragraphs: [
        "Spring Security provides infrastructure and configuration options for many common security concerns, but secure application development still requires correct configuration and secure coding practices."
      ],
      bullets: [
        "Broken authentication.",
        "Broken authorization.",
        "Cross-Site Request Forgery (CSRF).",
        "Cross-Origin Resource Sharing (CORS) misconfiguration.",
        "Cross-Site Scripting (XSS).",
        "Password storage problems.",
        "Session or token handling problems.",
        "Excessive permissions.",
        "Sensitive information exposure.",
        "Missing backend authorization."
      ]
    },

    {
      id: "security-architecture-example",
      title: "Real-World REST API Security Architecture",
      paragraphs: [
        "A typical Spring Boot application with a React frontend can combine authentication, authorization, service-layer business rules, and database persistence."
      ],
      code: {
        language: "text",
        code: `React Frontend
      |
      | HTTPS
      v
Spring Boot API
      |
      v
Spring Security
      |
      +---- Authentication
      |
      +---- SecurityContext
      |
      +---- Authorization
      |
      v
Controller
      |
      v
Service
      |
      +---- Business Authorization
      |
      v
Repository
      |
      v
MySQL`
      }
    },

    {
      id: "security-boundary",
      title: "Security Boundary",
      paragraphs: [
        "The backend is the authoritative security boundary for an API.",
        "Even if the frontend displays different screens to different users, the backend must independently verify authentication and authorization.",
        "This principle is especially important for operations such as deleting users, changing roles, viewing private information, exporting reports, and modifying financial or business data."
      ],
      code: {
        language: "text",
        code: `Client Says:
"I am ADMIN"

        |
        v

Backend Does NOT Trust It

        |
        v

Spring Security
        |
        v
Authenticated Identity
        |
        v
Granted Authorities
        |
        v
Authorization Decision`
      }
    },

    {
      id: "security-configuration-best-practices",
      title: "Spring Security Configuration Best Practices",
      bullets: [
        "Use modern SecurityFilterChain-based configuration.",
        "Keep authorization rules explicit and readable.",
        "Put specific request rules before broad rules.",
        "Use least privilege.",
        "Do not expose sensitive endpoints unnecessarily.",
        "Use strong password hashing.",
        "Use HTTPS in production.",
        "Protect authentication credentials and tokens.",
        "Use backend authorization as the real security boundary.",
        "Test both successful and rejected security scenarios.",
        "Avoid unnecessary custom filters.",
        "Do not log passwords or access tokens.",
        "Review CSRF and CORS according to the application's authentication architecture."
      ]
    },

    {
      id: "testing-security",
      title: "Testing Spring Security",
      paragraphs: [
        "Security should be tested just like other application behavior.",
        "Tests should verify public endpoints, protected endpoints, authentication failures, authorization failures, and successful access for users with the required permissions."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
    get("/api/public/hello")
)
.andExpect(status().isOk());

mockMvc.perform(
    get("/api/orders")
)
.andExpect(status().isUnauthorized());`
      },
      bullets: [
        "Test public endpoints.",
        "Test unauthenticated requests.",
        "Test authenticated users with insufficient roles.",
        "Test authenticated users with correct roles.",
        "Test method-security rules when used.",
        "Test security behavior after configuration changes."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Spring Security Mistakes",
      bullets: [
        "Confusing authentication with authorization.",
        "Relying only on React route protection.",
        "Trusting a role or username supplied by the frontend.",
        "Storing plain-text passwords.",
        "Logging passwords or access tokens.",
        "Using a broad permitAll() rule unintentionally.",
        "Putting broad authorization rules before specific rules.",
        "Assuming authenticated() means ADMIN access.",
        "Confusing hasRole() with hasAuthority().",
        "Disabling CSRF without understanding the authentication architecture.",
        "Confusing CORS with authentication.",
        "Creating a custom JWT filter unnecessarily.",
        "Ignoring backend authorization at the service or endpoint boundary.",
        "Not testing rejected requests.",
        "Exposing sensitive endpoints without authorization."
      ]
    },

    {
      id: "when-to-use",
      title: "When Should You Use Spring Security?",
      paragraphs: [
        "Spring Security is appropriate whenever a Spring application needs authentication, authorization, or common web-security infrastructure.",
        "It is especially useful for applications containing user accounts, protected REST APIs, administrative operations, private resources, role-based access, or integrations with identity providers."
      ],
      bullets: [
        "REST APIs requiring authentication.",
        "Applications with user accounts.",
        "Administrative dashboards.",
        "Role-based access control.",
        "Permission-based APIs.",
        "Applications using OAuth 2.0 or OpenID Connect.",
        "Applications requiring secure password authentication.",
        "Applications that need centralized security configuration."
      ]
    },

    {
      id: "architecture-summary",
      title: "Complete Spring Security Architecture",
      code: {
        language: "text",
        code: `                         CLIENT
                           |
                           | HTTP Request
                           v
                  Servlet Container
                           |
                           v
                 Spring Security
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
   Authentication   SecurityContext   Authorization
          |                |                |
          +----------------+----------------+
                           |
                    Access Decision
                           |
                +----------+----------+
                |                     |
              Denied                Allowed
                |                     |
                v                     v
             401/403             DispatcherServlet
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
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is Spring Security?",
          answer:
            "Spring Security is a framework that provides authentication, authorization, and security infrastructure for Spring applications, including protection against common web security concerns."
        },
        {
          question: "What is authentication?",
          answer:
            "Authentication verifies the identity of a user or client. Examples include username-password authentication, session authentication, and bearer-token authentication."
        },
        {
          question: "What is authorization?",
          answer:
            "Authorization determines whether an authenticated user or client has permission to access a resource or perform an operation."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer:
            "Authentication determines who the caller is, while authorization determines what that authenticated caller is allowed to do."
        },
        {
          question: "Why is Spring Security commonly implemented using filters?",
          answer:
            "Filters allow security processing to happen before the request reaches the controller. They can process authentication, security context, authorization, CSRF, and other security concerns centrally."
        },
        {
          question: "What is SecurityFilterChain?",
          answer:
            "SecurityFilterChain defines the security filters that process matching HTTP requests and is commonly configured using HttpSecurity."
        },
        {
          question: "What is SecurityContext?",
          answer:
            "SecurityContext holds security information associated with the current execution, including the Authentication when authentication has been established."
        },
        {
          question: "What is AuthenticationManager?",
          answer:
            "AuthenticationManager is an abstraction responsible for processing authentication requests. ProviderManager is a common implementation."
        },
        {
          question: "What is AuthenticationProvider?",
          answer:
            "AuthenticationProvider performs authentication for a particular authentication mechanism. For username-password authentication, DaoAuthenticationProvider can work with UserDetailsService and PasswordEncoder."
        },
        {
          question: "What is UserDetailsService?",
          answer:
            "UserDetailsService is used to load user-specific authentication information, commonly from a database."
        },
        {
          question: "What is the difference between roles and authorities?",
          answer:
            "Authorities are permission strings used during authorization. Roles are commonly represented as authorities with the ROLE_ prefix. For example, hasRole(\"ADMIN\") normally checks ROLE_ADMIN."
        },
        {
          question: "Why is frontend authorization not enough?",
          answer:
            "A client can bypass the frontend and call the backend API directly. Therefore, authorization must be enforced by the backend."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer:
            "401 generally indicates that authentication is missing or unsuccessful, while 403 generally indicates that the caller is authenticated but does not have sufficient permission."
        },
        {
          question: "Does Spring Security support JWT?",
          answer:
            "Yes. Spring Security supports bearer-token authentication and can integrate with JWT-based resource-server architectures."
        },
        {
          question: "Does every JWT application need a custom JWT filter?",
          answer:
            "No. Spring Security Resource Server provides standard bearer-token JWT processing for many applications. A custom filter should be added only when there is a genuine application-specific requirement."
        },
        {
          question: "What is CSRF?",
          answer:
            "CSRF is an attack in which a victim's browser is tricked into sending an unwanted state-changing request using automatically attached credentials. Its relevance depends on the application's authentication mechanism."
        },
        {
          question: "What is CORS?",
          answer:
            "CORS is a browser-enforced mechanism that controls whether frontend JavaScript can make requests across origins. It is not an authentication or authorization mechanism."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A React application hides the Delete button for normal users. Is the delete API secure?",
          answer:
            "Not necessarily. The backend must independently enforce authorization. A user can bypass the React UI and call the delete endpoint directly."
        },
        {
          question:
            "A logged-in USER calls an ADMIN endpoint and receives 403. Is that expected?",
          answer:
            "Yes, if the user is authenticated but does not have the required ADMIN authority. Authentication succeeded, but authorization failed."
        },
        {
          question:
            "An endpoint unexpectedly returns 200 without authentication. What would you check?",
          answer:
            "Check whether the endpoint is covered by permitAll(), whether a broad authorization rule is matching it, and which SecurityFilterChain handles the request."
        },
        {
          question:
            "A user sends username=admin in the request body. Can the backend trust that as the authenticated identity?",
          answer:
            "No. The backend should use the authenticated identity established by Spring Security rather than trusting an arbitrary request parameter."
        },
        {
          question:
            "Why would you choose JWT authentication for a REST API?",
          answer:
            "JWT bearer authentication can support stateless API authentication where the client sends an access token with requests. The exact architecture should still consider token lifetime, validation, storage, transport security, and authorization."
        },
        {
          question:
            "Why should you not disable CSRF automatically for every REST API?",
          answer:
            "CSRF relevance depends on how authentication credentials are transported. Cookie-based browser authentication has different CSRF considerations from bearer tokens explicitly supplied in Authorization headers."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "Spring Security provides authentication and authorization infrastructure.",
        "Authentication = who are you?",
        "Authorization = what are you allowed to do?",
        "Security is enforced on the backend.",
        "Spring Security commonly uses servlet filters.",
        "SecurityFilterChain defines security filters for matching requests.",
        "SecurityContext contains security information for the current execution.",
        "Authentication contains the principal and authorities.",
        "UserDetails represents security-related user information.",
        "UserDetailsService loads user information.",
        "PasswordEncoder handles password hashing and verification.",
        "Roles are commonly represented with ROLE_.",
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority() checks an exact authority string.",
        "401 commonly indicates an authentication problem.",
        "403 commonly indicates insufficient authorization.",
        "CORS is not authentication.",
        "CSRF is not CORS.",
        "Frontend security checks do not replace backend authorization.",
        "Custom security filters should be used only when necessary."
      ]
    },

    {
      id: "one-minute-answer",
      title: "One-Minute Interview Answer",
      paragraphs: [
        "Spring Security is a framework used to secure Spring applications by providing authentication, authorization, and security infrastructure. In a Spring Boot REST API, incoming requests commonly pass through Spring Security's filter chain before reaching the controller. Authentication establishes who the caller is, and the resulting Authentication is represented through the SecurityContext. Authorization then checks whether that authenticated user has the required role or authority. Spring Security also provides support for password encoding, method-level security, CSRF protection, CORS integration, session management, and bearer-token authentication. Most importantly, security must be enforced on the backend because frontend checks can be bypassed by directly calling the API."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Interview Notes",
      paragraphs: [
        "The easiest definition to remember is: Spring Security is a framework for authentication, authorization, and application security in Spring applications.",
        "Remember the main distinction: authentication identifies the caller; authorization decides whether that caller can perform an operation.",
        "Remember the request flow: Client -> Servlet Container -> Spring Security Filters -> Authentication/SecurityContext -> Authorization -> DispatcherServlet -> Controller.",
        "Remember that the frontend is not the security boundary. React can hide buttons and routes, but the backend must independently enforce permissions.",
        "For a REST API, do not automatically assume JWT is the only option. The appropriate authentication mechanism depends on the application's requirements.",
        "Do not claim that every JWT application requires a custom JWT filter. Spring Security Resource Server can provide standard bearer-token JWT authentication.",
        "Do not treat CORS as authentication or authorization. CORS is primarily a browser cross-origin mechanism.",
        "Do not disable CSRF blindly. Its relevance depends on how authentication credentials are transported.",
        "For interviews, explain Spring Security as a set of cooperating components rather than as a single class."
      ]
    }
  ]
};
