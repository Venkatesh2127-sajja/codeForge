
export const securityFilterChain = {
  id: 1104,
  title: "The Security Filter Chain",
  slug: "security-filter-chain",
  topicTitle: "Spring Security",
  description:
    "Understand servlet filters and how Spring Security processes incoming HTTP requests.",
  estimatedTime: "35 min",

  sections: [
    {
      id: "filter",
      title: "What Is a Servlet Filter?",
      paragraphs: [
        "A servlet filter is a component that can inspect or modify an HTTP request or response before or after the servlet processes it.",
        "Filters are commonly used for cross-cutting concerns such as logging, authentication, authorization, CORS, security headers, request tracing, and other request-processing tasks.",
        "A filter can allow a request to continue to the next component or stop the request when a condition is not satisfied."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
+------------------+
| Servlet Filter   |
+------------------+
     |
     | chain.doFilter()
     v
+------------------+
| Next Filter      |
+------------------+
     |
     v
+------------------+
| DispatcherServlet|
+------------------+
     |
     v
+------------------+
| Controller       |
+------------------+`
      },
      bullets: [
        "A servlet filter executes around servlet processing.",
        "A filter can inspect request information.",
        "A filter can modify request or response information.",
        "A filter can reject a request.",
        "A filter can perform processing before and after downstream processing."
      ]
    },

    {
      id: "filter-lifecycle",
      title: "How a Servlet Filter Works",
      paragraphs: [
        "The central operation in a filter is calling chain.doFilter(). This passes the request to the next filter in the chain or eventually to the target servlet.",
        "A filter can execute logic before chain.doFilter() and additional logic after chain.doFilter() returns.",
        "If a filter does not call chain.doFilter(), downstream processing does not continue through that chain.",
        "Security filters can therefore reject a request before the request reaches the controller."
      ],
      code: {
        language: "java",
        code: `public void doFilter(
        ServletRequest request,
        ServletResponse response,
        FilterChain chain)
        throws IOException, ServletException {

    // Before downstream processing

    chain.doFilter(request, response);

    // After downstream processing
}`
      }
    },

    {
      id: "spring-security-filter-overview",
      title: "Why Does Spring Security Use Filters?",
      paragraphs: [
        "Spring Security needs to inspect incoming HTTP requests before protected application code executes. The servlet filter architecture provides a centralized place for this security processing.",
        "Instead of writing authentication and authorization logic manually inside every controller, Spring Security can process security concerns before the request reaches DispatcherServlet."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | HTTP Request
  v
Servlet Container
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
  +---- CSRF / Headers / Other Security
  |
  v
DispatcherServlet
  |
  v
Controller`
      },
      bullets: [
        "Security processing happens before controller execution.",
        "Authentication can be established by security filters.",
        "Authorization can reject requests before controller execution.",
        "Security behavior can be centralized.",
        "Controllers do not need to duplicate authentication logic."
      ]
    },

    {
      id: "security-chain",
      title: "What Is SecurityFilterChain?",
      paragraphs: [
        "SecurityFilterChain describes the security filters that apply to matching requests.",
        "In modern Spring Security configuration, developers commonly declare a SecurityFilterChain bean using HttpSecurity.",
        "The HttpSecurity configuration is used to build the security filter chain.",
        "Different chains can be configured for different request patterns. When multiple chains exist, their ordering and matching rules matter."
      ],
      code: {
        language: "java",
        code: `@Bean
SecurityFilterChain apiSecurity(HttpSecurity http)
        throws Exception {

    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .anyRequest().authenticated()
    );

    return http.build();
}`
      },
      bullets: [
        "SecurityFilterChain defines security processing for matching requests.",
        "HttpSecurity is used to configure the chain.",
        "http.build() creates the configured chain.",
        "An application can define more than one SecurityFilterChain.",
        "Multiple chains require deliberate matching and ordering."
      ]
    },

    {
      id: "delegating-filter-proxy",
      title: "DelegatingFilterProxy",
      paragraphs: [
        "Spring integrates servlet filters with Spring-managed beans through DelegatingFilterProxy.",
        "The servlet container invokes the filter integration point, and DelegatingFilterProxy delegates processing to a Spring-managed filter bean.",
        "This allows Spring Security's filter infrastructure to participate in the servlet request lifecycle while remaining managed by the Spring application context."
      ],
      code: {
        language: "text",
        code: `Servlet Container
       |
       v
DelegatingFilterProxy
       |
       v
Spring Security Infrastructure
       |
       v
FilterChainProxy
       |
       v
SecurityFilterChain
       |
       v
Security Filters`
      }
    },

    {
      id: "filter-chain-proxy",
      title: "What Is FilterChainProxy?",
      paragraphs: [
        "FilterChainProxy is a central component in Spring Security's servlet filter infrastructure.",
        "It examines the incoming request and determines which configured SecurityFilterChain should handle it.",
        "The selected SecurityFilterChain then performs the configured security processing."
      ],
      code: {
        language: "text",
        code: `Incoming Request
       |
       v
FilterChainProxy
       |
       +----------------------+
       |                      |
       v                      v
API Security Chain      Web Security Chain
/api/**                 /web/**
       |                      |
       v                      v
Security Filters        Security Filters`
      },
      bullets: [
        "FilterChainProxy manages security filter-chain selection.",
        "The request is matched against configured security chains.",
        "The selected chain contains the filters that process the request.",
        "Multiple chains should have clear and understandable matching rules."
      ]
    },

    {
      id: "request-processing-flow",
      title: "Complete Spring Security Request Flow",
      paragraphs: [
        "A typical Spring Boot request passes through the servlet container and Spring Security filter infrastructure before reaching DispatcherServlet and the controller.",
        "The exact filters in the chain depend on the application's configuration and the Spring Security features that are enabled."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | GET /api/orders
  v
Embedded Tomcat
  |
  v
Servlet Filter Infrastructure
  |
  v
DelegatingFilterProxy
  |
  v
FilterChainProxy
  |
  v
Selected SecurityFilterChain
  |
  +---- Security Filters
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
      }
    },

    {
      id: "security-filter-before-controller",
      title: "Security Filters Run Before the Controller",
      paragraphs: [
        "One of the most important concepts is that Spring Security normally processes security before the controller is invoked.",
        "If authentication fails or the authenticated user does not have sufficient permission, Spring Security can reject the request before protected controller logic executes."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Security Filter Chain
     |
     +---- Authentication Failure
     |             |
     |             v
     |            401
     |
     +---- Authorization Failure
     |             |
     |             v
     |            403
     |
     +---- Security Checks Pass
                   |
                   v
             DispatcherServlet
                   |
                   v
               Controller`
      }
    },

    {
      id: "authentication-filter-example",
      title: "Example: JWT Authentication Processing",
      paragraphs: [
        "In a JWT-based application, bearer-token processing can inspect the Authorization header, validate the token, create an authenticated representation, and establish the security context.",
        "Modern Spring Security Resource Server support can provide standard bearer-token JWT processing, so a custom JWT filter is not automatically required."
      ],
      code: {
        language: "text",
        code: `Request
  |
  | Authorization: Bearer <JWT>
  v
Bearer Token Processing
  |
  +---- Invalid token
  |          |
  |          v
  |     Authentication Failure
  |
  +---- Valid token
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
      id: "security-context",
      title: "SecurityContext in the Filter Chain",
      paragraphs: [
        "Spring Security uses a SecurityContext to hold security information associated with the current request or execution.",
        "When authentication succeeds, the Authentication object represents the authenticated principal and its authorities."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
    SecurityContextHolder
        .getContext()
        .getAuthentication();

String username =
    authentication.getName();`
      },
      bullets: [
        "SecurityContext contains security information for the current execution.",
        "Authentication represents the authenticated principal.",
        "Authentication can contain authorities.",
        "SecurityContextHolder provides access to the current security context."
      ]
    },

    {
      id: "authentication-vs-authorization",
      title: "Authentication and Authorization in the Filter Chain",
      paragraphs: [
        "Authentication answers the question: 'Who is the caller?' Authorization answers: 'Is this authenticated caller allowed to perform this operation?'",
        "Security filters participate in establishing authentication and enforcing authorization policies."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Authentication
     |
     | Who is the user?
     v
Authentication Object
     |
     v
Authorization
     |
     | Is access allowed?
     |
     +---- No ----> 403 Forbidden
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
        "A SecurityFilterChain can be limited to a subset of requests using securityMatcher.",
        "Authorization requestMatchers, by contrast, define access rules inside the selected chain.",
        "Confusing these two levels can cause requests to match an unexpected chain or authorization rule."
      ],
      bullets: [
        "securityMatcher selects which requests a filter chain handles.",
        "requestMatchers inside authorizeHttpRequests select authorization rules.",
        "When several chains exist, order and matching behavior must be deliberate.",
        "A request must first be handled by the appropriate chain before its authorization rules are evaluated."
      ]
    },

    {
      id: "security-matcher-example",
      title: "Using securityMatcher",
      paragraphs: [
        "securityMatcher defines the request space handled by a particular SecurityFilterChain.",
        "Here securityMatcher(\"/api/**\") selects requests for this chain.",
        "The requestMatchers inside authorizeHttpRequests then define authorization rules within that selected chain."
      ],
      code: {
        language: "java",
        code: `@Bean
SecurityFilterChain apiSecurity(HttpSecurity http)
        throws Exception {

    http
        .securityMatcher("/api/**")
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**")
            .permitAll()
            .anyRequest()
            .authenticated()
        );

    return http.build();
}`
      }
    },

    {
      id: "request-matcher-example",
      title: "Using requestMatchers",
      paragraphs: [
        "requestMatchers are commonly used to define authorization rules within authorizeHttpRequests."
      ],
      code: {
        language: "java",
        code: `@Bean
SecurityFilterChain security(HttpSecurity http)
        throws Exception {

    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**")
        .permitAll()

        .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")

        .anyRequest()
        .authenticated()
    );

    return http.build();
}`
      },
      bullets: [
        "permitAll() allows matching requests without authentication.",
        "authenticated() requires authentication.",
        "hasRole() requires a specific role.",
        "Rules should be ordered from specific to broad."
      ]
    },

    {
      id: "security-matcher-vs-request-matcher",
      title: "securityMatcher vs requestMatchers",
      paragraphs: [
        "The easiest interview explanation is: securityMatcher chooses the chain; requestMatchers inside authorization choose the access rule.",
        "They operate at different levels and should not be treated as interchangeable."
      ],
      code: {
        language: "text",
        code: `securityMatcher
       |
       | Which SecurityFilterChain
       | handles this request?
       v
Selected SecurityFilterChain
       |
       v
authorizeHttpRequests
       |
       +--> requestMatchers("/public/**")
       |          |
       |          +--> permitAll()
       |
       +--> requestMatchers("/admin/**")
       |          |
       |          +--> hasRole("ADMIN")
       |
       +--> anyRequest()
                  |
                  +--> authenticated()`
      }
    },

    {
      id: "multiple-security-chains",
      title: "Multiple SecurityFilterChain Beans",
      paragraphs: [
        "An application can define multiple SecurityFilterChain beans when different groups of requests require different security configurations.",
        "For example, an API area and a separate web area might need different security behavior.",
        "When multiple chains exist, the matching rules and ordering must be carefully designed."
      ],
      code: {
        language: "java",
        code: `@Bean
@Order(1)
SecurityFilterChain apiSecurity(HttpSecurity http)
        throws Exception {

    http
        .securityMatcher("/api/**")
        .authorizeHttpRequests(auth -> auth
            .anyRequest()
            .authenticated()
        );

    return http.build();
}

@Bean
@Order(2)
SecurityFilterChain webSecurity(HttpSecurity http)
        throws Exception {

    http.authorizeHttpRequests(auth -> auth
        .anyRequest()
        .permitAll()
    );

    return http.build();
}`
      },
      bullets: [
        "Use multiple chains only when different security configurations are genuinely required.",
        "Make chain matchers specific.",
        "Use explicit ordering when necessary.",
        "Avoid unnecessary overlap between chain matchers."
      ]
    },

    {
      id: "chain-ordering",
      title: "Security Filter Chain Ordering",
      paragraphs: [
        "When multiple SecurityFilterChain beans can potentially match a request, their ordering matters.",
        "A common design is to place specific API or administrative chains before a broad fallback chain."
      ],
      code: {
        language: "text",
        code: `Request
  |
  +--> Chain 1: /api/admin/**
  |        |
  |        +--> Specific
  |
  +--> Chain 2: /api/**
  |        |
  |        +--> Less specific
  |
  +--> Chain 3: broad fallback
           |
           +--> Least specific

Specific
   |
   v
Broad`
      },
      bullets: [
        "Specific chain matching should take precedence over broad matching.",
        "Avoid overlapping chains unless the behavior is intentional.",
        "Use ordering to make chain selection predictable."
      ]
    },

    {
      id: "authorization-rule-order",
      title: "Authorization Rule Ordering",
      paragraphs: [
        "Authorization rules should also be written deliberately. A broad rule can otherwise make a later, more specific rule ineffective or produce unexpected behavior."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/admin/**")
    .hasRole("ADMIN")

    .requestMatchers("/api/**")
    .authenticated()

    .anyRequest()
    .denyAll()
);`
      },
      bullets: [
        "Put specific authorization rules before broad rules.",
        "authenticated() means the caller is authenticated, not that they have a particular role.",
        "hasRole() and hasAuthority() have different authority-name semantics.",
        "A restrictive final rule such as denyAll() can be useful when appropriate."
      ]
    },

    {
      id: "common-security-filters",
      title: "Common Spring Security Filters",
      paragraphs: [
        "Spring Security can configure many filters depending on the authentication mechanisms and security features enabled by the application.",
        "There is not one universal filter list that appears identically in every Spring Security application."
      ],
      bullets: [
        "Security-context-related filters manage security context behavior.",
        "Authentication filters process supported authentication mechanisms.",
        "Bearer-token processing can authenticate JWT or opaque tokens.",
        "CSRF processing protects against cross-site request forgery when enabled.",
        "Exception translation handles certain authentication and authorization failures.",
        "Authorization processing evaluates whether access should be allowed.",
        "Security-header processing can add appropriate HTTP response headers."
      ]
    },

    {
      id: "filter-order",
      title: "Why Filter Order Matters",
      paragraphs: [
        "Security filters are executed in an ordered chain. One filter may establish information that another filter needs later.",
        "For example, authorization needs appropriate authentication information before it can make an access decision.",
        "Spring Security manages the ordering of its built-in filters. Custom filters should be positioned deliberately relative to the built-in security infrastructure."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Security Context Processing
     |
     v
Authentication Processing
     |
     v
Authentication Available
     |
     v
Authorization Processing
     |
     v
DispatcherServlet
     |
     v
Controller`
      }
    },

    {
      id: "adding-custom-filter",
      title: "Adding a Custom Filter",
      paragraphs: [
        "Custom filters can be added when the application has a genuine requirement that is not already handled by Spring Security.",
        "The position of a custom filter is important because it determines what security information is already available and which filters will execute before or after it."
      ],
      code: {
        language: "java",
        code: `http.addFilterBefore(
    myCustomFilter,
    SomeExistingSecurityFilter.class
);`
      },
      bullets: [
        "Add custom filters only when necessary.",
        "Understand the filter's responsibility before adding it.",
        "Choose the filter position deliberately.",
        "Avoid duplicating functionality already provided by Spring Security."
      ]
    },

    {
      id: "jwt-custom-filter",
      title: "Do You Need a Custom JWT Filter?",
      paragraphs: [
        "A common beginner approach is to create a custom OncePerRequestFilter for every JWT application.",
        "That is not always necessary. Spring Security Resource Server provides standard bearer-token authentication support for JWT-based APIs.",
        "A custom filter can still be appropriate for application-specific processing, but authentication should not be reimplemented unnecessarily."
      ],
      code: {
        language: "text",
        code: `HTTP Request
    |
    v
Spring Security Resource Server
    |
    v
Bearer Token Authentication
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
      id: "filter-vs-interceptor",
      title: "Filter vs Spring MVC Interceptor",
      paragraphs: [
        "A servlet filter operates at the servlet-container level and can execute before DispatcherServlet.",
        "A Spring MVC HandlerInterceptor operates within the Spring MVC request-processing lifecycle around controller handling."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
Servlet Filter
     |
     v
DispatcherServlet
     |
     v
HandlerInterceptor
     |
     v
Controller`
      },
      bullets: [
        "Filter belongs to servlet-level processing.",
        "Interceptor belongs to Spring MVC processing.",
        "SecurityFilterChain uses servlet-filter infrastructure.",
        "Use the appropriate layer for the problem being solved."
      ]
    },

    {
      id: "filter-vs-controller",
      title: "Why Not Put Security Checks in Controllers?",
      paragraphs: [
        "Putting authentication logic manually inside every controller creates duplication and increases the possibility that a developer will forget to secure a new endpoint.",
        "Centralized security processing provides a consistent security boundary before controller execution."
      ],
      code: {
        language: "text",
        code: `Bad:

Controller A -> security check
Controller B -> security check
Controller C -> security check
Controller D -> forgot security check


Better:

Request
   |
   v
Spring Security
   |
   v
Authentication
   |
   v
Authorization
   |
   v
Controller`
      }
    },

    {
      id: "complete-security-config",
      title: "Complete Modern Security Configuration",
      paragraphs: [
        "A typical modern Spring Security application declares a SecurityFilterChain bean and configures authorization using HttpSecurity."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**")
            .permitAll()

            .requestMatchers("/api/admin/**")
            .hasRole("ADMIN")

            .anyRequest()
            .authenticated()
        );

        return http.build();
    }
}`
      },
      bullets: [
        "SecurityFilterChain is registered as a Spring bean.",
        "HttpSecurity configures security behavior.",
        "Authorization rules are defined with authorizeHttpRequests.",
        "The chain is created using http.build().",
        "Modern Spring Security uses component-based SecurityFilterChain configuration."
      ]
    },

    {
      id: "csrf-in-filter-chain",
      title: "CSRF and the Security Filter Chain",
      paragraphs: [
        "CSRF protection is integrated into Spring Security's request-processing architecture.",
        "Whether CSRF should be enabled or disabled depends on the application's authentication model and threat model.",
        "The following configuration disables CSRF protection, but the correct production choice depends on how authentication credentials are transported. Cookie-based browser authentication has different CSRF considerations from bearer tokens explicitly sent in an Authorization header."
      ],
      code: {
        language: "java",
        code: `http.csrf(csrf -> csrf.disable());`
      },
      bullets: [
        "Do not disable CSRF blindly.",
        "Cookie-based authentication requires careful CSRF consideration.",
        "Bearer-token APIs can have a different CSRF threat model.",
        "Review the authentication architecture before disabling CSRF."
      ]
    },

    {
      id: "exception-flow",
      title: "Authentication and Authorization Failure Flow",
      paragraphs: [
        "Authentication and authorization failures have different meanings and normally result in different HTTP responses for REST APIs."
      ],
      code: {
        language: "text",
        code: `Request
   |
   v
Security Filter Chain
   |
   +---- Authentication missing/invalid
   |              |
   |              v
   |             401
   |
   +---- Authentication valid
                  |
                  v
             Authorization
                  |
                  +---- Insufficient permission
                  |            |
                  |            v
                  |           403
                  |
                  +---- Allowed
                         |
                         v
                     Controller`
      },
      bullets: [
        "401 generally means authentication is required or failed.",
        "403 generally means the caller is authenticated but lacks sufficient permission.",
        "AuthenticationEntryPoint is commonly used for authentication failures.",
        "AccessDeniedHandler is commonly used for access-denied situations."
      ]
    },

    {
      id: "filter-testing",
      title: "Testing SecurityFilterChain",
      paragraphs: [
        "Security configuration should be tested for public endpoints, protected endpoints, authentication failures, and authorization failures.",
        "Spring Security integrates with MockMvc so controller and security behavior can be tested without requiring a real network server."
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
        "Test unauthenticated access to protected endpoints.",
        "Test authenticated users with insufficient roles.",
        "Test authenticated users with the required role.",
        "Verify both 401 and 403 behavior."
      ]
    },

    {
      id: "postman-testing",
      title: "Testing the Security Filter Chain with Postman",
      paragraphs: [
        "Postman can be used to verify the actual HTTP behavior of the configured security chain."
      ],
      code: {
        language: "text",
        code: `Test 1
GET /api/public/hello
No Authorization header
Expected: 200


Test 2
GET /api/orders
No Authorization header
Expected: 401


Test 3
GET /api/admin/users
Authenticated USER
Expected: 403


Test 4
GET /api/admin/users
Authenticated ADMIN
Expected: 200`
      },
      bullets: [
        "Test public endpoints without credentials.",
        "Test protected endpoints without credentials.",
        "Test authenticated users with insufficient permissions.",
        "Test users with the required authority.",
        "Verify that the backend enforces the security rules."
      ]
    },

    {
      id: "debugging",
      title: "Debugging the Filter Chain",
      bullets: [
        "Check which SecurityFilterChain matches the request.",
        "Review the configured securityMatcher values.",
        "Review authorization requestMatchers and their ordering.",
        "Check whether the request is authenticated.",
        "Check authentication and access-denied logs.",
        "Check whether a custom filter is executing.",
        "Check whether a broad rule is matching before a specific rule.",
        "Check the request URL and HTTP method.",
        "Do not disable security filters just to make an endpoint work."
      ]
    },

    {
      id: "debug-logging",
      title: "Debugging Spring Security Logs",
      paragraphs: [
        "Spring Security logging can provide valuable information when an endpoint is unexpectedly returning 401, 403, or another security-related response.",
        "Detailed debugging should generally be used during development and troubleshooting rather than casually enabled in production."
      ],
      code: {
        language: "yaml",
        code: `logging:
  level:
    org.springframework.security: DEBUG`
      },
      bullets: [
        "Use security logs to understand authentication and authorization behavior.",
        "Avoid exposing sensitive security information in production logs.",
        "Disable overly verbose debugging after troubleshooting is complete."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common SecurityFilterChain Mistakes",
      bullets: [
        "Putting a broad permitAll() rule before a more specific protected rule.",
        "Confusing securityMatcher with requestMatchers.",
        "Creating overlapping SecurityFilterChain configurations without understanding chain selection.",
        "Forgetting that authenticated() does not require a particular role.",
        "Using hasRole() and hasAuthority() without understanding their authority naming behavior.",
        "Adding a custom JWT filter when standard Resource Server support would be sufficient.",
        "Placing a custom filter at an inappropriate position.",
        "Disabling CSRF without understanding the authentication model.",
        "Assuming CORS provides authentication or authorization.",
        "Putting backend security checks only in the React frontend.",
        "Disabling security filters instead of diagnosing the actual configuration.",
        "Exposing detailed security debug logs in production.",
        "Creating too many security chains when one clear chain would be sufficient."
      ]
    },

    {
      id: "security-filter-best-practices",
      title: "Security Filter Chain Best Practices",
      bullets: [
        "Keep SecurityFilterChain configuration simple and auditable.",
        "Put specific authorization rules before broad rules.",
        "Use specific securityMatcher patterns when multiple chains are required.",
        "Use multiple chains only when they solve a genuine configuration need.",
        "Prefer Spring Security's built-in mechanisms when they satisfy the requirement.",
        "Add custom filters only when necessary.",
        "Understand custom-filter ordering before adding one.",
        "Test public, unauthenticated, unauthorized, and authorized scenarios.",
        "Use backend authorization as the real security boundary.",
        "Keep authentication and authorization centralized.",
        "Use restrictive fallback rules when appropriate.",
        "Avoid exposing sensitive security information through logs."
      ]
    },

    {
      id: "complete-architecture",
      title: "Complete SecurityFilterChain Architecture",
      code: {
        language: "text",
        code: `HTTP REQUEST
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
     +----------------------+
     |                      |
     v                      v
API Security Chain    Web Security Chain
/api/**               /web/**
     |
     v
Security Filters
     |
     +----------------+
     |                |
     v                v
Authentication   SecurityContext
     |                |
     +--------+-------+
              |
              v
        Authorization
              |
       +------+------+
       |             |
      401           403
       |             |
       +------+------+
              |
              v
        Access Allowed
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
      }
    },

    {
      id: "debugging-scenario",
      title: "Real-World Debugging Scenario",
      paragraphs: [
        "Suppose GET /api/admin/users unexpectedly returns 200 for a normal authenticated user. Do not immediately change the controller.",
        "First determine which SecurityFilterChain handles the request. Then inspect the authorization rules, rule ordering, user authorities, and whether an earlier permitAll rule is allowing the request."
      ],
      code: {
        language: "text",
        code: `Unexpected 200
     |
     v
Which SecurityFilterChain?
     |
     v
Check securityMatcher
     |
     v
Which authorization rule?
     |
     v
Check requestMatchers order
     |
     v
Check user authorities
     |
     v
Check hasRole / hasAuthority
     |
     v
Check earlier permitAll()
     |
     v
Fix the security configuration`
      }
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is SecurityFilterChain?",
          answer:
            "SecurityFilterChain defines the security filters that apply to requests matching that chain. In modern Spring Security, it is commonly configured as a SecurityFilterChain bean using HttpSecurity."
        },
        {
          question: "What is a servlet filter?",
          answer:
            "A servlet filter is a component that can inspect, modify, allow, or reject an HTTP request or response before or after the target servlet processes it."
        },
        {
          question: "Why does Spring Security use filters?",
          answer:
            "Filters allow Spring Security to process HTTP requests before they reach controllers. This enables centralized authentication, authorization, security-context management, CSRF protection, headers, and other security processing."
        },
        {
          question: "What is FilterChainProxy?",
          answer:
            "FilterChainProxy is a central Spring Security filter component that selects the appropriate SecurityFilterChain for the incoming request and delegates processing to that chain."
        },
        {
          question: "What is DelegatingFilterProxy?",
          answer:
            "DelegatingFilterProxy integrates the servlet container's filter mechanism with Spring-managed beans. It allows servlet filter processing to delegate into Spring-managed infrastructure."
        },
        {
          question: "What is the difference between securityMatcher and requestMatchers?",
          answer:
            "securityMatcher determines which requests a particular SecurityFilterChain handles. requestMatchers inside authorization configuration define authorization rules for requests within the selected chain."
        },
        {
          question: "Can an application have multiple SecurityFilterChain beans?",
          answer:
            "Yes. Multiple chains can be used when different groups of requests need different security configurations. Their matchers and ordering must be designed carefully."
        },
        {
          question: "Why is filter ordering important?",
          answer:
            "Filters can depend on information established by earlier filters. Authentication information may need to exist before authorization processing can make an access decision."
        },
        {
          question: "What happens when authentication fails?",
          answer:
            "The request is normally treated as unauthenticated and, for a REST API, commonly results in a 401 response depending on the configured authentication entry point."
        },
        {
          question: "What happens when authorization fails?",
          answer:
            "If the caller is authenticated but does not have sufficient permission, the request is normally rejected with a 403 Forbidden response."
        },
        {
          question: "Why should security checks not be duplicated in every controller?",
          answer:
            "Duplicating security logic creates maintenance problems and increases the chance of missing a security check on a new endpoint. Centralized Spring Security configuration provides a consistent security boundary."
        },
        {
          question: "Does every JWT application require a custom JWT filter?",
          answer:
            "No. Spring Security Resource Server provides standard bearer-token JWT authentication for many applications. A custom filter should be added only when there is a genuine application-specific requirement."
        },
        {
          question: "What is the purpose of SecurityContext?",
          answer:
            "SecurityContext holds security information associated with the current execution, including the Authentication when authentication has succeeded."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer:
            "Authentication determines who the caller is. Authorization determines whether the authenticated caller has permission to access the requested resource or perform the requested operation."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "You have /api/admin/** and /api/** authorization rules. Which should be configured first?",
          answer:
            "The more specific /api/admin/** rule should be placed before the broader /api/** rule so that the admin-specific authorization requirement is applied."
        },
        {
          question:
            "Your /api/admin/users endpoint returns 200 even though it should be ADMIN-only. What would you check?",
          answer:
            "Check which SecurityFilterChain handles the request, inspect securityMatcher configuration, review requestMatcher ordering, verify the user's authorities, and check whether an earlier permitAll rule is allowing the request."
        },
        {
          question:
            "Two SecurityFilterChain beans exist and an API request uses the wrong configuration. What could be wrong?",
          answer:
            "The chain matchers may overlap, the intended chain may not have the correct order, or the request may not match the expected securityMatcher. Review chain selection and ordering."
        },
        {
          question:
            "A custom authentication filter executes, but authorization still sees the request as anonymous. What should you investigate?",
          answer:
            "Check whether the filter successfully creates an Authentication object, places it into the SecurityContext, executes at the correct position, and allows the request to continue through the expected security infrastructure."
        },
        {
          question:
            "A developer adds permitAll() for /api/** to expose one public endpoint, but every API endpoint becomes public. Why?",
          answer:
            "The /api/** pattern is broad enough to match all API endpoints. The rule should be narrowed to the intended public path, such as /api/public/**."
        },
        {
          question:
            "Why would you use one SecurityFilterChain instead of multiple chains?",
          answer:
            "If all application requests can use the same security model, one clear chain is generally simpler and easier to maintain. Multiple chains are useful when different request groups genuinely need different security behavior."
        },
        {
          question:
            "An endpoint works from the React application but can also be called without authentication from Postman. Is the endpoint secure?",
          answer:
            "No. Frontend behavior does not enforce backend security. The Spring Security configuration must reject unauthenticated requests at the backend."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "A servlet filter processes requests and responses around servlet execution.",
        "Spring Security uses a filter-based architecture.",
        "SecurityFilterChain defines security filters for matching requests.",
        "FilterChainProxy helps select the applicable SecurityFilterChain.",
        "DelegatingFilterProxy connects servlet filtering with Spring-managed infrastructure.",
        "securityMatcher selects which requests a chain handles.",
        "requestMatchers inside authorization configuration define access rules.",
        "Multiple SecurityFilterChain beans are possible.",
        "Multiple chains require deliberate matching and ordering.",
        "Authentication answers who the user is.",
        "Authorization answers whether the user is allowed.",
        "SecurityContext contains authentication information for the current security context.",
        "401 commonly represents an authentication problem.",
        "403 commonly represents insufficient authorization.",
        "Specific rules should be placed before broad rules.",
        "Custom filters should be added only when necessary.",
        "Backend authorization is the real security boundary."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Interview Notes",
      paragraphs: [
        "The easiest architecture to remember is: HTTP Request -> Servlet Container -> DelegatingFilterProxy -> FilterChainProxy -> selected SecurityFilterChain -> security filters -> DispatcherServlet -> Controller.",
        "For securityMatcher versus requestMatchers, remember: securityMatcher selects the SecurityFilterChain; requestMatchers inside authorizeHttpRequests select the authorization rule within that chain.",
        "If asked why Spring Security uses filters, answer: 'Spring Security uses filters so security processing can happen before the request reaches the controller. Filters can establish authentication, manage security context, enforce authorization, and reject unauthorized requests centrally.'",
        "If asked about multiple SecurityFilterChain beans, explain that an application can define multiple chains when different request groups require different security configurations. The chains need clear matchers and deliberate ordering.",
        "If asked why a request returns 401 versus 403, remember: 401 generally means the request is unauthenticated, while 403 generally means the caller is authenticated but does not have sufficient permission.",
        "Do not claim that every Spring Security application has exactly the same filter list. The actual filters depend on the configured authentication mechanisms and enabled security features.",
        "For JWT applications, do not automatically say that a custom JWT filter is required. Modern Spring Security Resource Server support can provide standard bearer-token authentication for many JWT-based APIs.",
        "The strongest interview answer connects the concepts together: the servlet container receives the request, Spring Security selects the appropriate SecurityFilterChain, authentication establishes the security identity, authorization determines access, and only an allowed request continues to the controller."
      ]
    }
  ]
};
