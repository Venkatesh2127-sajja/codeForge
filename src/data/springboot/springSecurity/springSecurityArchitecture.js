
export const springSecurityArchitecture = {
  id: 1103,
  title: "Spring Security Architecture",
  slug: "spring-security-architecture",
  topicTitle: "Spring Security",
  description:
    "Learn how Spring Security processes requests and represents authenticated users.",
  estimatedTime: "40 min",

  sections: [
    {
      id: "request-flow",
      title: "Security Request Flow",
      paragraphs: [
        "For servlet-based Spring Boot applications, security is commonly applied through a servlet filter chain.",
        "The incoming HTTP request first reaches the servlet container. Spring Security then processes the request through its security filter infrastructure before the request reaches the controller.",
        "The security filters can process credentials, establish authentication, apply security context handling, and enforce authorization.",
        "If the request satisfies the configured security rules, it can continue to DispatcherServlet and eventually reach the controller."
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
Repository`
      },
      bullets: [
        "Security processing happens before normal controller execution.",
        "Authentication determines who the caller is.",
        "Authorization determines whether the authenticated caller can access a resource.",
        "The SecurityContext represents security information associated with the current execution.",
        "A rejected request may never reach the controller."
      ]
    },

    {
      id: "architecture-overview",
      title: "Spring Security Architecture at a Glance",
      paragraphs: [
        "Spring Security is not one single class that performs all security operations. It is a collection of components working together.",
        "The servlet filter infrastructure receives the request, authentication components validate credentials, the SecurityContext represents the authenticated identity, and authorization components decide whether access is permitted."
      ],
      code: {
        language: "text",
        code: `                     Spring Security
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
       Filters       Authentication    Authorization
          |                |                |
          v                v                v
   Request Processing  Identity      Access Decision
                           |
                           v
                    SecurityContext
                           |
                           v
                       Controller`
      }
    },

    {
      id: "filterchainproxy",
      title: "FilterChainProxy",
      paragraphs: [
        "FilterChainProxy is a central Spring Security component that selects and delegates to the applicable security filter chain.",
        "The selected chain applies the security behavior configured for the request.",
        "When an application has multiple SecurityFilterChain beans, the matching and ordering of those chains determine which chain handles the request."
      ],
      code: {
        language: "text",
        code: `HTTP Request
      |
      v
FilterChainProxy
      |
      +----------------------+
      |                      |
      v                      v
SecurityFilterChain 1   SecurityFilterChain 2
/api/**                 /web/**
      |                      |
      v                      v
Security Filters       Security Filters`
      },
      bullets: [
        "FilterChainProxy is part of Spring Security's servlet filter infrastructure.",
        "It determines which configured security chain applies.",
        "Different request patterns can use different security chains.",
        "Multiple chains should have clear matchers and deliberate ordering."
      ]
    },

    {
      id: "delegating-filter-proxy",
      title: "DelegatingFilterProxy",
      paragraphs: [
        "DelegatingFilterProxy connects the servlet container's filter mechanism with Spring-managed components.",
        "The servlet container invokes the filter integration point, which delegates into the Spring Security infrastructure managed by the application context.",
        "This allows Spring Security to participate in the standard servlet filter lifecycle."
      ],
      code: {
        language: "text",
        code: `Servlet Container
       |
       v
DelegatingFilterProxy
       |
       v
Spring Security
       |
       v
FilterChainProxy
       |
       v
SecurityFilterChain`
      }
    },

    {
      id: "security-filter-chain",
      title: "SecurityFilterChain",
      paragraphs: [
        "SecurityFilterChain represents the security filters that should process a matching request.",
        "In modern Spring Security configuration, applications commonly declare a SecurityFilterChain bean using HttpSecurity.",
        "The final filter chain is created by calling http.build()."
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
        "SecurityFilterChain is normally registered as a Spring bean.",
        "HttpSecurity is used to configure security behavior.",
        "http.build() creates the configured chain.",
        "An application can define multiple security chains."
      ]
    },

    {
      id: "authenticationmanager",
      title: "AuthenticationManager",
      paragraphs: [
        "AuthenticationManager is an abstraction responsible for authentication.",
        "Its main responsibility is to process an Authentication request and either return an authenticated Authentication or indicate that authentication failed.",
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
     +----+----+----+
     |         |    |
     v         v    v
Provider  Provider Provider
    1         2       3
     |
     v
Authentication Result`
      },
      bullets: [
        "AuthenticationManager is an abstraction.",
        "ProviderManager is a common implementation.",
        "AuthenticationProvider performs authentication for a particular authentication mechanism.",
        "Different providers can support different credential types."
      ]
    },

    {
      id: "provider-manager",
      title: "ProviderManager",
      paragraphs: [
        "ProviderManager is a common AuthenticationManager implementation.",
        "It delegates an authentication request to configured AuthenticationProvider instances.",
        "A provider examines whether it supports the authentication type and, when applicable, attempts to authenticate it."
      ],
      code: {
        language: "text",
        code: `Authentication
     |
     v
ProviderManager
     |
     +----> DaoAuthenticationProvider
     |
     +----> Other AuthenticationProvider
     |
     +----> Other AuthenticationProvider
     |
     v
Authenticated Authentication`
      }
    },

    {
      id: "authentication-provider",
      title: "AuthenticationProvider",
      paragraphs: [
        "AuthenticationProvider performs authentication for a particular type of Authentication request.",
        "For username-password authentication, a common provider is DaoAuthenticationProvider, which works with a UserDetailsService and PasswordEncoder.",
        "The provider validates the supplied credentials and returns an authenticated Authentication when successful."
      ],
      code: {
        language: "text",
        code: `Username + Password
        |
        v
AuthenticationProvider
        |
        +----> UserDetailsService
        |
        +----> PasswordEncoder
        |
        v
Credentials Valid?
     |             |
    Yes            No
     |             |
     v             v
Authenticated    Failure`
      }
    },

    {
      id: "authentication-flow",
      title: "Username and Password Authentication Flow",
      paragraphs: [
        "In a traditional username-password authentication flow, the credentials are converted into an Authentication request.",
        "The authentication infrastructure delegates the request to an appropriate AuthenticationProvider.",
        "The provider loads user information and verifies the password. If successful, an authenticated Authentication is returned and the security context can represent that authentication."
      ],
      code: {
        language: "text",
        code: `POST /login
username = venkat
password = ******

        |
        v
Authentication Request
        |
        v
AuthenticationManager
        |
        v
AuthenticationProvider
        |
        +----> UserDetailsService
        |
        +----> PasswordEncoder
        |
        v
Authentication Success
        |
        v
SecurityContext
        |
        v
Authenticated Request`
      }
    },

    {
      id: "userdetailsservice",
      title: "UserDetailsService",
      paragraphs: [
        "UserDetailsService is commonly used to load user-specific data during username-password authentication.",
        "A typical implementation loads a user from a database using a username or another identifier.",
        "The UserDetails object can contain the username, encoded password, and granted authorities."
      ],
      code: {
        language: "java",
        code: `@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(
            String username) {

        return userRepository
            .findByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException(
                    "User not found"
                )
            );
    }
}`
      },
      bullets: [
        "UserDetailsService loads user information.",
        "It does not itself decide whether a password is correct.",
        "Password verification is handled by the authentication provider and PasswordEncoder.",
        "The returned authorities can later participate in authorization."
      ]
    },

    {
      id: "password-encoder",
      title: "PasswordEncoder in the Architecture",
      paragraphs: [
        "Passwords should not be stored as plain text.",
        "During registration, the password should be encoded before it is stored.",
        "During authentication, Spring Security can use PasswordEncoder to compare the supplied raw password with the stored encoded password."
      ],
      code: {
        language: "java",
        code: `@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`
      },
      bullets: [
        "Store password hashes, not plain-text passwords.",
        "Use a password hashing mechanism designed for passwords.",
        "Do not decrypt password hashes because secure password hashing is not intended to be reversible."
      ]
    },

    {
      id: "security-context",
      title: "SecurityContext and Authentication",
      paragraphs: [
        "The SecurityContext holds the current Authentication.",
        "The Authentication can represent the principal, granted authorities, and authentication state.",
        "Spring Security manages security-context handling according to the configured authentication mechanism and context strategy.",
        "Application code can access the current Authentication when it needs server-established identity information."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
    SecurityContextHolder
        .getContext()
        .getAuthentication();

if (authentication != null) {
    String username = authentication.getName();
}`
      },
      bullets: [
        "Avoid treating an untrusted request parameter as the authenticated identity.",
        "Use the server-established security context.",
        "Do not log credentials or sensitive authentication material.",
        "Authentication can contain granted authorities."
      ]
    },

    {
      id: "security-context-flow",
      title: "SecurityContext Flow",
      paragraphs: [
        "Once authentication has been successfully established, the resulting Authentication becomes available through the security context according to the configured context handling.",
        "Later security components and application code can use that authentication information to make authorization decisions or determine the authenticated principal."
      ],
      code: {
        language: "text",
        code: `Credentials
    |
    v
Authentication
    |
    v
SecurityContext
    |
    +----> Authorization
    |
    +----> Controller / Service
    |
    +----> Current User Information`
      }
    },

    {
      id: "principal-and-authorities",
      title: "Principal and Granted Authorities",
      paragraphs: [
        "The principal represents the authenticated identity.",
        "Granted authorities represent permissions or roles associated with that identity.",
        "Authorization rules can use these authorities to decide whether access should be allowed."
      ],
      code: {
        language: "text",
        code: `Authentication
      |
      +---- Principal
      |       |
      |       +---- username
      |       +---- user identity
      |
      +---- Authorities
              |
              +---- ROLE_USER
              +---- ROLE_ADMIN
              +---- READ_REPORTS`
      },
      bullets: [
        "Principal answers who the authenticated user is.",
        "Authorities describe what the user is allowed to do.",
        "Roles are commonly represented as authorities with a ROLE_ prefix.",
        "Authorities should be assigned according to the application's authorization model."
      ]
    },

    {
      id: "authorization",
      title: "Authorization Components",
      paragraphs: [
        "Request authorization rules determine whether a request may proceed.",
        "Modern Spring Security applications commonly configure URL authorization using authorizeHttpRequests.",
        "Method security can add checks at service or other method boundaries when enabled."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**")
    .permitAll()

    .requestMatchers("/api/admin/**")
    .hasRole("ADMIN")

    .anyRequest()
    .authenticated()
);`
      },
      bullets: [
        "permitAll() allows access without requiring authentication.",
        "authenticated() requires an authenticated caller.",
        "hasRole() checks for a role.",
        "hasAuthority() checks for a specific authority string.",
        "Authorization rules should be ordered carefully."
      ]
    },

    {
      id: "authentication-vs-authorization",
      title: "Authentication vs Authorization",
      paragraphs: [
        "Authentication answers 'Who are you?' Authorization answers 'Are you allowed to do this?'",
        "Authentication normally happens before authorization because the authorization decision needs an identity and its authorities."
      ],
      code: {
        language: "text",
        code: `Request
  |
  v
Authentication
  |
  | Who is the user?
  v
Authenticated Identity
  |
  v
Authorization
  |
  | Is access allowed?
  |
  +---- No ----> 403
  |
  +---- Yes
          |
          v
      Controller`
      }
    },

    {
      id: "request-matching",
      title: "Request Matching",
      paragraphs: [
        "Spring Security can use request matchers to determine which authorization rule applies to an incoming request.",
        "When multiple SecurityFilterChain beans exist, securityMatcher is used to determine which chain handles the request.",
        "The distinction is important: securityMatcher selects the chain, while requestMatchers commonly select authorization rules within that chain."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
securityMatcher
     |
     v
Selected SecurityFilterChain
     |
     v
requestMatchers
     |
     +---- permitAll()
     |
     +---- authenticated()
     |
     +---- hasRole()
     |
     v
Authorization Decision`
      }
    },

    {
      id: "method-security",
      title: "Method Security",
      paragraphs: [
        "URL authorization protects requests at the HTTP boundary. Method security can provide another authorization boundary around application methods.",
        "Method security is useful when authorization depends on the method being called, the current user, method arguments, or business ownership rules."
      ],
      code: {
        language: "java",
        code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long userId) {
    // Business operation
}`
      },
      bullets: [
        "Enable method security when using annotations such as @PreAuthorize.",
        "Method security can complement URL-level authorization.",
        "Ownership checks are often better implemented at a service/business boundary.",
        "Do not rely only on frontend permission checks."
      ]
    },

    {
      id: "url-vs-method-security",
      title: "URL Security vs Method Security",
      paragraphs: [
        "URL authorization is useful for protecting HTTP endpoints. Method security can protect business operations regardless of which controller calls them.",
        "Using both can provide defense in depth when the application's security requirements justify it."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
URL Authorization
     |
     v
Controller
     |
     v
Service Method
     |
     v
Method Authorization
     |
     v
Business Logic`
      }
    },

    {
      id: "jwt-architecture",
      title: "JWT Authentication Architecture",
      paragraphs: [
        "In a stateless bearer-token API, the client sends a JWT access token with requests.",
        "Spring Security can validate the bearer token and establish the authenticated identity for the request.",
        "After authentication, authorization rules use the resulting Authentication and authorities."
      ],
      code: {
        language: "text",
        code: `React Frontend
     |
     | Authorization: Bearer <JWT>
     v
Spring Boot
     |
     v
Security Filters
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
      },
      bullets: [
        "A JWT is a representation of claims, normally signed in common access-token scenarios.",
        "Validation should verify the token signature and relevant claims.",
        "The authenticated identity should come from validated security information.",
        "Do not trust a username supplied independently by the client when authenticated identity is already established by Spring Security."
      ]
    },

    {
      id: "stateless-security",
      title: "Stateless Security",
      paragraphs: [
        "Many REST APIs use bearer tokens and configure the application to avoid server-side HTTP session state for authentication.",
        "In a stateless design, each request carries the credentials needed to authenticate that request, commonly through an Authorization header."
      ],
      code: {
        language: "java",
        code: `http
    .sessionManagement(session ->
        session.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS
        )
    );`
      },
      bullets: [
        "Statelessness means the server does not rely on an HTTP session to remember authentication between requests.",
        "The client normally sends the access token with each request.",
        "Statelessness does not automatically solve every security problem.",
        "Token expiration, revocation strategy, transport security, and authorization still matter."
      ]
    },

    {
      id: "exception-handling",
      title: "Security Exception Handling",
      paragraphs: [
        "Spring Security handles security-related failures before normal controller exception handling in many cases.",
        "Authentication failures and authorization failures have different semantics and are commonly handled using an AuthenticationEntryPoint and AccessDeniedHandler."
      ],
      code: {
        language: "text",
        code: `Unauthenticated
      |
      v
AuthenticationEntryPoint
      |
      v
401 Unauthorized


Authenticated but Forbidden
      |
      v
AccessDeniedHandler
      |
      v
403 Forbidden`
      },
      bullets: [
        "AuthenticationEntryPoint commonly handles authentication failures.",
        "AccessDeniedHandler commonly handles authorization failures.",
        "Controller-level @ExceptionHandler is not a replacement for security exception handling."
      ]
    },

    {
      id: "cors-and-security",
      title: "Where CORS Fits",
      paragraphs: [
        "CORS is a browser security mechanism that controls whether browser-based JavaScript can make cross-origin requests.",
        "CORS is related to HTTP request processing but should not be confused with authentication or authorization.",
        "A correct CORS configuration does not make an endpoint authenticated."
      ],
      code: {
        language: "text",
        code: `React
  |
  | Cross-Origin Request
  v
Browser CORS Rules
  |
  v
Spring Boot
  |
  v
Spring Security
  |
  +---- Authentication
  |
  +---- Authorization
  |
  v
Controller`
      },
      bullets: [
        "CORS controls browser cross-origin behavior.",
        "Authentication determines identity.",
        "Authorization determines permissions.",
        "CORS does not replace Spring Security authentication."
      ]
    },

    {
      id: "csrf-and-security",
      title: "Where CSRF Fits",
      paragraphs: [
        "CSRF protection addresses a different threat from authentication and authorization.",
        "Whether CSRF protection should be enabled depends on the authentication mechanism and application architecture.",
        "Cookie-based browser authentication requires particular attention to CSRF because browsers automatically attach cookies to matching requests."
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
        "Do not confuse CSRF with CORS.",
        "Do not disable CSRF blindly.",
        "Bearer tokens in Authorization headers have a different CSRF threat model from cookie authentication."
      ]
    },

    {
      id: "security-configuration",
      title: "Complete Security Configuration Example",
      paragraphs: [
        "The following example combines several architectural concepts into one modern configuration."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**")
                .permitAll()

                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

                .anyRequest()
                .authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            );

        return http.build();
    }
}`
      }
    },

    {
      id: "complete-request-architecture",
      title: "Complete Spring Security Architecture",
      code: {
        language: "text",
        code: `                         CLIENT
                           |
                           | HTTP Request
                           v
                 +--------------------+
                 | Servlet Container  |
                 +--------------------+
                           |
                           v
                 +--------------------+
                 | DelegatingFilter   |
                 | Proxy              |
                 +--------------------+
                           |
                           v
                 +--------------------+
                 | FilterChainProxy   |
                 +--------------------+
                           |
                           v
                 +--------------------+
                 | SecurityFilterChain|
                 +--------------------+
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
       Authentication  SecurityContext Authorization
             |             |             |
             +-------------+-------------+
                           |
                           v
                  Access Decision
                           |
                    +------+------+
                    |             |
                   401           403
                    |             |
                    +------+------+
                           |
                           v
                 +--------------------+
                 | DispatcherServlet  |
                 +--------------------+
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
      id: "architecture-responsibilities",
      title: "Responsibilities of Major Components",
      bullets: [
        "DelegatingFilterProxy: connects servlet filtering with Spring-managed infrastructure.",
        "FilterChainProxy: selects and delegates to the appropriate SecurityFilterChain.",
        "SecurityFilterChain: defines the security filters applied to matching requests.",
        "AuthenticationManager: coordinates authentication.",
        "ProviderManager: commonly delegates authentication to AuthenticationProvider instances.",
        "AuthenticationProvider: validates a particular authentication mechanism.",
        "UserDetailsService: commonly loads user information for username-password authentication.",
        "PasswordEncoder: verifies passwords against stored password hashes.",
        "SecurityContext: holds the current security information.",
        "Authentication: represents the authenticated principal and authorities.",
        "Authorization configuration: determines whether the caller can access a protected resource.",
        "Method security: can protect application methods and business operations."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Spring Security Architecture Mistakes",
      bullets: [
        "Thinking Spring Security is implemented only inside controllers.",
        "Confusing authentication with authorization.",
        "Confusing SecurityFilterChain with FilterChainProxy.",
        "Confusing securityMatcher with requestMatchers.",
        "Assuming every application has exactly the same list of security filters.",
        "Putting authentication logic directly inside every controller.",
        "Trusting a username from a request parameter instead of the server-established Authentication.",
        "Storing plain-text passwords.",
        "Assuming authenticated() means the user has an ADMIN role.",
        "Using hasRole() and hasAuthority() without understanding their naming semantics.",
        "Creating a custom JWT filter unnecessarily.",
        "Ignoring the order of multiple SecurityFilterChain beans.",
        "Disabling CSRF without understanding the authentication model.",
        "Treating CORS as an authentication mechanism.",
        "Performing authorization only in the React frontend.",
        "Logging passwords, access tokens, or other sensitive security information."
      ]
    },

    {
      id: "debugging",
      title: "Debugging Spring Security Architecture",
      paragraphs: [
        "When a secured endpoint unexpectedly returns 401, 403, or 200, debug the request through the security architecture instead of immediately changing controller code.",
        "First identify the selected SecurityFilterChain, then inspect authentication, the SecurityContext, authorities, and authorization rules."
      ],
      code: {
        language: "text",
        code: `Unexpected Response
       |
       v
Which SecurityFilterChain?
       |
       v
Which Security Filters?
       |
       v
Was Authentication created?
       |
       v
What is in SecurityContext?
       |
       v
What authorities exist?
       |
       v
Which authorization rule matched?
       |
       v
401 / 403 / Allowed
       |
       v
Controller`
      },
      bullets: [
        "For 401, investigate whether authentication was missing or invalid.",
        "For 403, investigate the authenticated user's authorities and authorization rules.",
        "For an unexpected 200, inspect permitAll rules and matcher ordering.",
        "For multiple chains, verify securityMatcher patterns and chain ordering.",
        "For custom filters, verify execution order and SecurityContext handling."
      ]
    },

    {
      id: "testing",
      title: "Testing Security Architecture",
      paragraphs: [
        "Security architecture should be tested at the HTTP boundary and, where applicable, at the method-security boundary.",
        "Tests should verify both successful and rejected access."
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
        "Test protected endpoints without authentication.",
        "Test authenticated users with insufficient authorities.",
        "Test users with sufficient authorities.",
        "Test method-security restrictions where used.",
        "Test both positive and negative security scenarios."
      ]
    },

    {
      id: "best-practices",
      title: "Spring Security Architecture Best Practices",
      bullets: [
        "Keep authentication and authorization centralized.",
        "Use SecurityFilterChain beans with modern Spring Security configuration.",
        "Keep security rules readable and specific.",
        "Put specific rules before broad rules.",
        "Use method security when business-level authorization requires it.",
        "Use server-established Authentication instead of trusting client-supplied identity fields.",
        "Use secure password hashing for stored passwords.",
        "Prefer built-in Spring Security mechanisms when they satisfy the requirement.",
        "Avoid unnecessary custom security filters.",
        "Use HTTPS for credentials and tokens in production.",
        "Keep sensitive credentials and tokens out of logs.",
        "Test security rules as part of the application test suite.",
        "Treat frontend security checks as UX assistance, not backend authorization.",
        "Review authentication, authorization, CSRF, CORS, and session/token behavior as separate concerns."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is Spring Security architecture?",
          answer:
            "Spring Security uses a filter-based architecture in which incoming requests pass through security infrastructure before reaching application controllers. Authentication establishes the user's identity, the SecurityContext represents that authentication, and authorization determines whether access is allowed."
        },
        {
          question: "What is FilterChainProxy?",
          answer:
            "FilterChainProxy is a central Spring Security component that selects the applicable security filter chain and delegates request processing to it."
        },
        {
          question: "What is DelegatingFilterProxy?",
          answer:
            "DelegatingFilterProxy connects the servlet container's filter mechanism with Spring-managed security infrastructure."
        },
        {
          question: "What is SecurityFilterChain?",
          answer:
            "SecurityFilterChain defines the security filters that process requests matching that chain. It is commonly configured as a Spring bean using HttpSecurity."
        },
        {
          question: "What is AuthenticationManager?",
          answer:
            "AuthenticationManager is an abstraction responsible for processing authentication requests. ProviderManager is a common implementation."
        },
        {
          question: "What is ProviderManager?",
          answer:
            "ProviderManager is a common AuthenticationManager implementation that delegates authentication to one or more AuthenticationProvider instances."
        },
        {
          question: "What is AuthenticationProvider?",
          answer:
            "AuthenticationProvider performs authentication for a particular type of authentication request. For example, DaoAuthenticationProvider commonly works with UserDetailsService and PasswordEncoder for username-password authentication."
        },
        {
          question: "What is UserDetailsService?",
          answer:
            "UserDetailsService is commonly used to load user information during username-password authentication. A typical implementation retrieves the user from a database."
        },
        {
          question: "What is SecurityContext?",
          answer:
            "SecurityContext holds the current Authentication according to the configured security-context strategy."
        },
        {
          question: "What is SecurityContextHolder?",
          answer:
            "SecurityContextHolder provides access to the SecurityContext for the current execution."
        },
        {
          question: "What is the difference between Authentication and Authorization?",
          answer:
            "Authentication determines who the caller is. Authorization determines whether that authenticated caller is allowed to perform a requested operation."
        },
        {
          question: "What is stored inside Authentication?",
          answer:
            "Authentication can represent the principal, authentication state, and granted authorities."
        },
        {
          question: "What is the difference between securityMatcher and requestMatchers?",
          answer:
            "securityMatcher selects which SecurityFilterChain handles a request. requestMatchers inside authorization configuration commonly select the authorization rule applied within that chain."
        },
        {
          question: "Why does Spring Security use filters?",
          answer:
            "Filters allow Spring Security to process requests before they reach controllers. This provides centralized authentication, authorization, security-context handling, CSRF protection, and other security processing."
        },
        {
          question: "Can Spring Security have multiple SecurityFilterChain beans?",
          answer:
            "Yes. Multiple chains can be configured when different groups of requests require different security configurations. Their matchers and ordering must be designed carefully."
        },
        {
          question: "What is the purpose of method security?",
          answer:
            "Method security provides authorization checks around application methods. It is useful when authorization depends on business operations, method arguments, roles, or resource ownership."
        },
        {
          question: "Why should authorization not be implemented only in React?",
          answer:
            "Frontend checks can improve the user experience but cannot enforce backend security because a client can bypass the UI and directly call the API. Authorization must be enforced on the server."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A request is returning 401 even though the user sends a JWT. What would you check?",
          answer:
            "Check whether the Authorization header is correctly formatted, whether the bearer token is being processed, whether the token signature and claims are valid, whether the authentication provider is configured correctly, and whether authentication is being established in the SecurityContext."
        },
        {
          question:
            "A user is authenticated but receives 403 when accessing /api/admin/users. What would you check?",
          answer:
            "Check the user's granted authorities, the hasRole or hasAuthority configuration, the exact authority names, and which authorization rule matched the request."
        },
        {
          question:
            "An endpoint unexpectedly returns 200 without authentication. What would you investigate?",
          answer:
            "Check whether the endpoint matches permitAll(), whether a broad permitAll rule appears before a more specific rule, and which SecurityFilterChain handles the request."
        },
        {
          question:
            "Two SecurityFilterChain beans are configured and the wrong chain handles an API request. What could be the problem?",
          answer:
            "The securityMatcher patterns may overlap or the chains may have an unintended order. Review the chain matchers and their ordering."
        },
        {
          question:
            "Why might a custom JWT filter fail to make the request authenticated?",
          answer:
            "The filter may not execute, may be positioned incorrectly, may fail to validate the token, may fail to create an Authentication object, or may fail to establish the expected security context."
        },
        {
          question:
            "A developer wants to get the logged-in username using /users/{username}. Is that always safe?",
          answer:
            "No. The path variable is client-controlled input. For authenticated identity, application code should normally use the server-established Authentication rather than trusting a username supplied by the client."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "Spring Security commonly uses servlet filters.",
        "DelegatingFilterProxy connects servlet filtering with Spring-managed security infrastructure.",
        "FilterChainProxy selects the applicable SecurityFilterChain.",
        "SecurityFilterChain contains the security filters for matching requests.",
        "AuthenticationManager coordinates authentication.",
        "ProviderManager is a common AuthenticationManager implementation.",
        "AuthenticationProvider performs a specific authentication mechanism.",
        "UserDetailsService commonly loads user information.",
        "PasswordEncoder verifies password hashes.",
        "SecurityContext holds the current Authentication.",
        "Authentication represents the principal and authorities.",
        "Authentication answers who the user is.",
        "Authorization answers whether the user is allowed.",
        "securityMatcher selects the security chain.",
        "requestMatchers commonly select authorization rules.",
        "Method security can protect business methods.",
        "401 generally indicates an authentication problem.",
        "403 generally indicates insufficient authorization.",
        "Frontend checks do not replace backend authorization."
      ]
    },

    {
      id: "architecture-summary",
      title: "One-Minute Architecture Explanation",
      paragraphs: [
        "In an interview, you can explain Spring Security architecture like this:",
        "When a request reaches a Spring Boot servlet application, it enters the servlet filter infrastructure. DelegatingFilterProxy connects the servlet container to Spring Security, and FilterChainProxy selects the appropriate SecurityFilterChain. The security filters process authentication and other security concerns. AuthenticationManager and AuthenticationProvider components can establish the authenticated identity. The resulting Authentication is represented through the SecurityContext. Authorization rules then determine whether the request is allowed. If access is allowed, the request continues through DispatcherServlet to the controller. If authentication or authorization fails, Spring Security can reject the request before the controller executes."
      ],
      code: {
        language: "text",
        code: `Request
  -> Servlet Container
  -> DelegatingFilterProxy
  -> FilterChainProxy
  -> SecurityFilterChain
  -> Authentication
  -> SecurityContext
  -> Authorization
  -> DispatcherServlet
  -> Controller`
      }
    },

    {
      id: "revision-notes",
      title: "Important Interview Notes",
      paragraphs: [
        "Remember the main architecture as: Request -> Servlet Container -> DelegatingFilterProxy -> FilterChainProxy -> SecurityFilterChain -> Security Filters -> DispatcherServlet -> Controller.",
        "Remember the authentication architecture as: AuthenticationManager -> ProviderManager -> AuthenticationProvider -> user information and credential validation -> authenticated Authentication.",
        "Remember the identity architecture as: Authentication -> Principal + Authorities -> SecurityContext.",
        "Remember the authorization concept as: Authentication answers 'Who are you?' while Authorization answers 'Are you allowed to do this?'",
        "For securityMatcher versus requestMatchers, remember: securityMatcher selects the filter chain; requestMatchers commonly define authorization rules within that chain.",
        "Do not say that every Spring Security application contains exactly the same filters. The actual filter set depends on the application's configuration and enabled security mechanisms.",
        "Do not say that every JWT application requires a custom JWT filter. Standard Spring Security Resource Server support can handle common bearer-token JWT authentication.",
        "The strongest interview answer connects the components rather than explaining them as isolated classes."
      ]
    }
  ]
};
