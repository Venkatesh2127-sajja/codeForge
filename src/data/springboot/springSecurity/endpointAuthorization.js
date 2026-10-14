
export const endpointAuthorization = {
  id: 1108,
  title: "Endpoint Authorization and Request Matchers",
  slug: "endpoint-authorization",
  topicTitle: "Spring Security",
  description:
    "Protect REST endpoints using request matchers, roles, authorities, ownership checks, and method-level security.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "endpoint-rules",
      title: "Define Endpoint Rules",
      paragraphs: [
        "Endpoint authorization controls which HTTP requests are allowed to reach protected application functionality.",
        "Spring Security uses request matchers to associate URL patterns and, when needed, HTTP methods with authorization requirements.",
        "The authorization policy should explicitly describe which endpoints are public, which require authentication, which require specific roles or authorities, and which should be rejected."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/reports/**")
        .hasAuthority("REPORT_READ")
    .requestMatchers("/api/profile/**").authenticated()
    .anyRequest().denyAll()
);`
      },
      paragraphs: [
        "This is an illustrative policy. Permit only the endpoints that truly need public access, and ensure that more specific rules appear before broader matching rules.",
        "The final denyAll() creates a restrictive fallback for requests that were not explicitly covered by earlier rules."
      ]
    },

    {
      id: "request-matcher",
      title: "What Is a Request Matcher?",
      paragraphs: [
        "A request matcher determines whether a particular incoming HTTP request matches a security rule.",
        "A matcher can inspect the request path and can also be combined with an HTTP method to create more precise authorization policies.",
        "For example, an application may allow authenticated users to read reports while requiring a REPORT_WRITE authority to create or update reports."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.GET, "/api/reports/**")
        .hasAuthority("REPORT_READ")
    .requestMatchers(HttpMethod.POST, "/api/reports/**")
        .hasAuthority("REPORT_WRITE")
    .requestMatchers(HttpMethod.DELETE, "/api/reports/**")
        .hasRole("ADMIN")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "A matcher selects requests for a security rule.",
        "URL patterns can be matched.",
        "HTTP methods can be included in the rule.",
        "Different operations on the same resource can have different permissions."
      ]
    },

    {
      id: "rule-order",
      title: "Request Matcher Order",
      paragraphs: [
        "The order of authorization rules is important. Specific rules should generally be declared before broader rules so that the intended policy is applied.",
        "For example, if a broad rule matches all /api/** requests before a more specific /api/admin/** rule, the broader rule can prevent the configuration from expressing the intended administrative restriction."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    // More specific rule first
    .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")

    // Broader rule later
    .requestMatchers("/api/**")
        .authenticated()

    .anyRequest()
        .denyAll()
);`
      },
      bullets: [
        "Review authorization rules from top to bottom.",
        "Put specific security requirements before broad catch-all rules.",
        "Keep the final fallback rule intentional.",
        "When debugging unexpected access, inspect matcher patterns and ordering."
      ]
    },

    {
      id: "public-endpoints",
      title: "Public Endpoints",
      paragraphs: [
        "Some endpoints intentionally need to be accessible without authentication. Examples include login, registration, public documentation, or genuinely public resources.",
        "Use permitAll() only when the endpoint is intentionally public."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/login")
        .permitAll()
    .requestMatchers("/api/auth/register")
        .permitAll()
    .requestMatchers("/api/docs/**")
        .permitAll()
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "Keep the public endpoint list small.",
        "Do not expose administrative resources through permitAll().",
        "Review public endpoints whenever new APIs are added."
      ]
    },

    {
      id: "authenticated",
      title: "Authenticated Endpoints",
      paragraphs: [
        "authenticated() requires the request to have an authenticated identity.",
        "It does not require a specific role or authority. If an endpoint requires a particular permission, use hasRole(), hasAnyRole(), hasAuthority(), or hasAnyAuthority() as appropriate."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/profile/**")
        .authenticated()
    .requestMatchers("/api/orders/**")
        .authenticated()
    .anyRequest()
        .denyAll()
);`
      },
      bullets: [
        "authenticated() means an authenticated identity is required.",
        "It does not mean the user is an ADMIN.",
        "Use role or authority checks when access is more restrictive."
      ]
    },

    {
      id: "roles-vs-authorities",
      title: "Roles vs Authorities",
      paragraphs: [
        "Roles are commonly used to represent broad categories such as USER, ADMIN, or MANAGER.",
        "Authorities can represent more specific permissions such as REPORT_READ, REPORT_WRITE, or USER_DELETE.",
        "Spring Security treats roles as authorities using a role prefix convention. By default, hasRole(\"ADMIN\") checks for ROLE_ADMIN."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")
    .requestMatchers("/api/reports/**")
        .hasAuthority("REPORT_READ")
    .requestMatchers("/api/users/**")
        .hasAuthority("USER_READ")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"REPORT_READ\") checks the exact authority.",
        "Roles are useful for broad access categories.",
        "Authorities are useful for fine-grained permissions."
      ]
    },

    {
      id: "has-any-role",
      title: "Multiple Roles",
      paragraphs: [
        "Sometimes an endpoint should be accessible to more than one role.",
        "hasAnyRole() allows access when the authenticated identity has at least one of the specified roles."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/reports/**")
        .hasAnyRole("ADMIN", "MANAGER")
    .requestMatchers("/api/user/**")
        .hasRole("USER")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "hasAnyRole() checks whether at least one specified role is present.",
        "It is useful when multiple user categories share access.",
        "For exact permissions, hasAuthority() may be clearer."
      ]
    },

    {
      id: "method-security",
      title: "Method-Level Authorization",
      paragraphs: [
        "Request-level rules can be complemented by method-level security.",
        "Method-level security is useful when access depends on a business operation rather than only the URL.",
        "For example, a report service can require REPORT_READ directly on its business method."
      ],
      code: {
        language: "java",
        code: `import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @PreAuthorize("hasAuthority('REPORT_READ')")
    public Report getReport(Long id) {
        return loadReport(id);
    }

    private Report loadReport(Long id) {
        // Illustrative placeholder
        throw new UnsupportedOperationException(
            "Implement persistence"
        );
    }
}`
      },
      paragraphs: [
        "Enable method security with @EnableMethodSecurity on a configuration class. This example illustrates authorization; replace the placeholder with your actual report-loading logic."
      ]
    },

    {
      id: "enable-method-security",
      title: "Enable Method Security",
      paragraphs: [
        "Method-level authorization must be enabled before annotations such as @PreAuthorize can be used for authorization decisions."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {
}`
      },
      bullets: [
        "@EnableMethodSecurity enables Spring Security method-level authorization support.",
        "@PreAuthorize can then be used for authorization expressions.",
        "Method security can protect service-layer operations."
      ]
    },

    {
      id: "preauthorize",
      title: "Using @PreAuthorize",
      paragraphs: [
        "@PreAuthorize evaluates an authorization expression before the protected method executes.",
        "It can check roles, authorities, authentication state, and more complex expressions supported by the method-security configuration."
      ],
      code: {
        language: "java",
        code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long userId) {
    userRepository.deleteById(userId);
}

@PreAuthorize("hasAuthority('REPORT_READ')")
public Report getReport(Long id) {
    return reportRepository.findById(id)
        .orElseThrow();
}`
      },
      bullets: [
        "Use @PreAuthorize for method-level authorization.",
        "It can protect service methods regardless of which controller calls them.",
        "Keep authorization expressions understandable and maintainable."
      ]
    },

    {
      id: "url-vs-method-security",
      title: "URL Authorization vs Method Authorization",
      paragraphs: [
        "URL authorization protects requests based on the HTTP request. Method security protects method execution based on the security expression.",
        "They can complement each other. URL rules provide an outer HTTP security boundary, while method security can protect important business operations more directly."
      ],
      code: {
        language: "text",
        code: `HTTP Request
     |
     v
URL Authorization
     |
     | Allowed
     v
Controller
     |
     v
Service Method
     |
     v
Method Authorization
     |
     | Allowed
     v
Business Logic
     |
     v
Repository`
      },
      bullets: [
        "URL authorization is useful for endpoint-level policies.",
        "Method security is useful for business-operation boundaries.",
        "Sensitive operations can benefit from defense in depth.",
        "Avoid duplicating complicated authorization rules unnecessarily."
      ]
    },

    {
      id: "ownership",
      title: "Check Resource Ownership",
      paragraphs: [
        "Authentication alone does not mean that a user may access every record.",
        "An API that returns a user's profile, invoice, document, or order must enforce the applicable ownership and permission rules.",
        "This is commonly called object-level authorization or resource-level authorization."
      ],
      bullets: [
        "Do not trust a user ID supplied by the client without authorization checks.",
        "Check whether the authenticated user may access the requested resource.",
        "Apply authorization consistently across alternate endpoints.",
        "Test horizontal privilege escalation scenarios.",
        "Do not assume that having ROLE_USER means a user can access every USER resource."
      ]
    },

    {
      id: "ownership-example",
      title: "Ownership Authorization Example",
      paragraphs: [
        "Suppose /api/orders/100 belongs to user alice. A request from alice may be allowed, while the same request from bob should be rejected even if both users have ROLE_USER."
      ],
      code: {
        language: "java",
        code: `@GetMapping("/orders/{id}")
public OrderResponse getOrder(
        @PathVariable Long id,
        Authentication authentication) {

    String username = authentication.getName();

    return orderService.getOrderForOwner(
        id,
        username
    );
}`
      },
      bullets: [
        "The authenticated identity comes from Spring Security.",
        "The requested resource ID comes from the URL.",
        "The service layer can verify whether the resource belongs to the authenticated user.",
        "The server should never trust the client to decide ownership."
      ]
    },

    {
      id: "horizontal-privilege-escalation",
      title: "Horizontal Privilege Escalation",
      paragraphs: [
        "Horizontal privilege escalation occurs when one user accesses another user's resources at the same privilege level.",
        "For example, USER A changes /api/orders/100 to /api/orders/101 and receives USER B's order.",
        "A role check such as hasRole(\"USER\") may not prevent this because both users have the same role. The application needs a resource ownership or permission check."
      ],
      code: {
        language: "text",
        code: `USER A
  |
  | GET /api/orders/101
  v
Spring Boot
  |
  | Is USER A authenticated?
  |        YES
  |
  | Does order 101 belong to USER A?
  |        NO
  |
  v
Reject request`
      },
      bullets: [
        "Authentication alone is insufficient.",
        "Role checking alone may be insufficient.",
        "Resource ownership must be checked when required.",
        "Test users accessing other users' resources."
      ]
    },

    {
      id: "vertical-privilege-escalation",
      title: "Vertical Privilege Escalation",
      paragraphs: [
        "Vertical privilege escalation occurs when a lower-privileged user accesses functionality intended for a higher-privileged user.",
        "For example, a normal USER attempts to call an ADMIN-only endpoint.",
        "Role or authority checks are commonly used to prevent this type of access."
      ],
      code: {
        language: "text",
        code: `USER
  |
  | DELETE /api/admin/users/10
  v
Authorization
  |
  | ROLE_ADMIN required
  |
  | USER does not have ROLE_ADMIN
  v
403 Forbidden`
      }
    },

    {
      id: "http-method-authorization",
      title: "Authorize Different HTTP Methods",
      paragraphs: [
        "A REST API can use different permissions for different operations on the same resource.",
        "For example, users may be allowed to read reports while only managers can create them and administrators can delete them."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers(
        HttpMethod.GET,
        "/api/reports/**"
    )
        .hasAuthority("REPORT_READ")

    .requestMatchers(
        HttpMethod.POST,
        "/api/reports/**"
    )
        .hasAuthority("REPORT_WRITE")

    .requestMatchers(
        HttpMethod.DELETE,
        "/api/reports/**"
    )
        .hasRole("ADMIN")

    .anyRequest()
        .denyAll()
);`
      },
      bullets: [
        "GET can have a different authorization policy from POST.",
        "DELETE operations commonly need stronger permissions.",
        "HTTP method authorization supports fine-grained REST API security."
      ]
    },

    {
      id: "default-deny",
      title: "Prefer Explicit Policies",
      paragraphs: [
        "A default-deny policy can help prevent newly added endpoints from accidentally becoming accessible.",
        "The application should explicitly identify public endpoints and protected endpoints instead of relying on accidental defaults.",
        "Remember that authorization is only one part of API security. Input validation, authentication, business rules, data protection, and secure deployment are also required."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**")
        .permitAll()

    .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")

    .requestMatchers("/api/**")
        .authenticated()

    .anyRequest()
        .denyAll()
);`
      },
      bullets: [
        "Explicitly identify public endpoints.",
        "Protect sensitive endpoint groups.",
        "Use a restrictive fallback when appropriate.",
        "Review the policy when new controllers and endpoints are added."
      ]
    },

    {
      id: "endpoint-security-flow",
      title: "Complete Endpoint Authorization Flow",
      paragraphs: [
        "Endpoint authorization occurs before the request reaches the protected business logic. The following flow shows the relationship between authentication, request matching, authorization, and application layers."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | HTTP Request
  v
Spring Security Filter Chain
  |
  v
Authentication
  |
  +---- Failed ------> 401
  |
  v
Request Matcher
  |
  v
Authorization Rule
  |
  +---- permitAll -----> Continue
  |
  +---- authenticated -> Check identity
  |
  +---- hasRole -------> Check role
  |
  +---- hasAuthority --> Check authority
  |
  +---- Denied --------> 403
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
Ownership / Business Authorization
  |
  v
Repository
  |
  v
Database`
      }
    },

    {
      id: "common-mistakes",
      title: "Common Mistakes",
      bullets: [
        "Using permitAll() for a sensitive endpoint.",
        "Putting a broad matcher before a more specific authorization rule.",
        "Confusing hasRole(\"ADMIN\") with hasAuthority(\"ADMIN\").",
        "Forgetting the ROLE_ prefix convention used by hasRole().",
        "Assuming authenticated() means the user has every required permission.",
        "Relying only on frontend route protection.",
        "Checking only roles when resource ownership also matters.",
        "Trusting a user ID supplied by the client without comparing it with the authenticated identity.",
        "Protecting one endpoint while leaving an alternate endpoint for the same operation unprotected.",
        "Using complicated authorization expressions that are difficult to maintain.",
        "Testing only successful authorization and not testing denied requests.",
        "Forgetting to enable method security when using @PreAuthorize."
      ]
    },

    {
      id: "testing",
      title: "Testing Endpoint Authorization",
      paragraphs: [
        "Authorization tests should verify both allowed and denied access.",
        "For each sensitive endpoint, test unauthenticated access, authenticated users with insufficient permissions, authorized users, and ownership violations where applicable."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(get("/api/admin/users"))
       .andExpect(status().isUnauthorized());

mockMvc.perform(
        get("/api/admin/users")
            .with(user("john")
                .roles("USER"))
    )
    .andExpect(status().isForbidden());

mockMvc.perform(
        get("/api/admin/users")
            .with(user("admin")
                .roles("ADMIN"))
    )
    .andExpect(status().isOk());`
      },
      bullets: [
        "Test unauthenticated requests.",
        "Test authenticated users without required roles.",
        "Test users with the required authority.",
        "Test ownership violations.",
        "Test different HTTP methods when permissions differ by method."
      ]
    },

    {
      id: "defense-in-depth",
      title: "Defense in Depth",
      paragraphs: [
        "Security should not depend on a single authorization check when the application contains sensitive business operations.",
        "For example, URL authorization can restrict an endpoint to authenticated users while method security protects a sensitive service operation. Resource ownership checks can then protect individual records.",
        "These controls should complement one another rather than becoming a collection of duplicated and conflicting rules."
      ],
      code: {
        language: "text",
        code: `HTTP Layer
   |
   | /api/orders/**
   v
Authentication
   |
   v
Endpoint Authorization
   |
   v
Controller
   |
   v
Service Method Authorization
   |
   v
Resource Ownership Check
   |
   v
Database`
      }
    },

    {
      id: "best-practices",
      title: "Endpoint Authorization Best Practices",
      bullets: [
        "Use explicit authorization policies for sensitive endpoints.",
        "Place specific request matchers before broader rules.",
        "Use least privilege when assigning roles and authorities.",
        "Use hasRole() for broad role-based policies.",
        "Use hasAuthority() for fine-grained permissions.",
        "Use method security for important business-operation boundaries.",
        "Check resource ownership when users access user-specific resources.",
        "Do not trust client-supplied user IDs as proof of ownership.",
        "Protect alternate API paths that expose the same sensitive operation.",
        "Use a default-deny strategy where appropriate.",
        "Test unauthorized, forbidden, authorized, and ownership-violation scenarios.",
        "Keep authorization expressions readable.",
        "Do not rely on frontend authorization as the backend security boundary."
      ]
    },

    {
      id: "complete-example",
      title: "Complete Authorization Configuration",
      paragraphs: [
        "The following example combines public endpoints, role-based authorization, authority-based authorization, authenticated access, HTTP-method-specific rules, and a restrictive fallback."
      ],
      code: {
        language: "java",
        code: `@Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http.authorizeHttpRequests(auth -> auth

        // Public endpoints
        .requestMatchers("/api/auth/**")
            .permitAll()

        // Admin endpoints
        .requestMatchers("/api/admin/**")
            .hasRole("ADMIN")

        // Read reports
        .requestMatchers(
            HttpMethod.GET,
            "/api/reports/**"
        )
            .hasAuthority("REPORT_READ")

        // Write reports
        .requestMatchers(
            HttpMethod.POST,
            "/api/reports/**"
        )
            .hasAuthority("REPORT_WRITE")

        // Authenticated profile
        .requestMatchers("/api/profile/**")
            .authenticated()

        // Everything else is denied
        .anyRequest()
            .denyAll()
    );

    return http.build();
}`
      }
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is endpoint authorization?",
          answer:
            "Endpoint authorization determines whether an authenticated identity is allowed to access a particular HTTP endpoint or perform a particular HTTP operation."
        },
        {
          question: "What is a request matcher?",
          answer:
            "A request matcher selects incoming HTTP requests based on properties such as the request path and HTTP method so that an authorization rule can be applied."
        },
        {
          question: "What is the difference between hasRole and hasAuthority?",
          answer:
            "hasRole normally applies the ROLE_ prefix, so hasRole(\"ADMIN\") checks ROLE_ADMIN. hasAuthority checks the specified authority string directly."
        },
        {
          question: "What does authenticated() mean?",
          answer:
            "It requires the request to have an authenticated identity but does not require a particular role or authority."
        },
        {
          question: "Why use method-level security?",
          answer:
            "Method-level security can enforce permissions at business-operation boundaries, including cases where authorization depends on the operation rather than only the request path."
        },
        {
          question: "What is @PreAuthorize?",
          answer:
            "@PreAuthorize is a method-security annotation that evaluates an authorization expression before the protected method executes."
        },
        {
          question: "How do you enable method-level security?",
          answer:
            "Use @EnableMethodSecurity on a Spring configuration class and then apply supported method-security annotations such as @PreAuthorize."
        },
        {
          question: "Why is resource ownership important?",
          answer:
            "Authentication proves who the caller is, but it does not prove that the caller owns the requested resource. Ownership checks prevent one user from accessing another user's data."
        },
        {
          question: "What is horizontal privilege escalation?",
          answer:
            "It occurs when one user accesses another user's resources at the same privilege level, such as USER A accessing USER B's order."
        },
        {
          question: "What is vertical privilege escalation?",
          answer:
            "It occurs when a lower-privileged user accesses functionality intended for a higher-privileged role, such as a USER accessing an ADMIN endpoint."
        },
        {
          question: "Why use anyRequest().denyAll()?",
          answer:
            "It provides a restrictive fallback so requests that are not explicitly covered by earlier rules are rejected."
        },
        {
          question: "Why does request matcher ordering matter?",
          answer:
            "More specific rules should be evaluated before broader rules so that the intended security policy is not overridden or made ineffective by a broad matcher."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A USER can access /api/admin/users even though the endpoint should be ADMIN-only. What would you check?",
          answer:
            "Check the actual granted authorities, verify that ROLE_ADMIN is required, inspect request matcher patterns and ordering, confirm that the expected SecurityFilterChain is active, and check for other security configuration that may affect the request."
        },
        {
          question:
            "USER A can access USER B's order by changing the order ID in the URL. What type of vulnerability is this?",
          answer:
            "This is a horizontal privilege escalation or broken object-level authorization problem. The backend needs to verify that the authenticated user is allowed to access the requested order."
        },
        {
          question:
            "Both USER and ADMIN should read reports, but only ADMIN should delete them. How would you design the authorization rules?",
          answer:
            "Use a read permission or role shared by both users for GET requests and require ADMIN or a specific delete authority for DELETE requests."
        },
        {
          question:
            "Why would you protect both the endpoint and the service method?",
          answer:
            "Endpoint authorization protects the HTTP boundary, while method security can protect the business operation even if it is reached through another controller or internal call path. This can provide defense in depth."
        },
        {
          question:
            "Why is frontend role checking not enough to protect an ADMIN API?",
          answer:
            "Frontend code can be bypassed. A client can directly call the backend API, so the server must independently authenticate the request and enforce authorization."
        },
        {
          question:
            "A newly created endpoint is accidentally accessible. How can a default-deny strategy help?",
          answer:
            "If unmatched requests end with denyAll(), an endpoint that has not been explicitly granted access is rejected until a developer intentionally adds an authorization rule."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "Request matchers select HTTP requests for security rules.",
        "permitAll() allows matching requests without authentication.",
        "authenticated() requires authentication.",
        "hasRole(\"ADMIN\") normally checks ROLE_ADMIN.",
        "hasAuthority(\"REPORT_READ\") checks the exact authority.",
        "hasAnyRole() allows any specified role.",
        "HTTP methods can be included in authorization rules.",
        "Specific matchers should come before broad matchers.",
        "Method security protects business-operation methods.",
        "@PreAuthorize checks authorization before method execution.",
        "@EnableMethodSecurity enables method-level security.",
        "Authentication does not prove resource ownership.",
        "Horizontal privilege escalation involves access to another user's resource.",
        "Vertical privilege escalation involves access to higher-privilege functionality.",
        "Frontend authorization is not a backend security boundary.",
        "anyRequest().denyAll() can provide a restrictive fallback.",
        "Authorization tests should include allowed and denied scenarios."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes for Interview",
      paragraphs: [
        "The easiest way to remember endpoint authorization is: authentication identifies the caller, while endpoint authorization decides whether that caller can access a particular HTTP resource or operation.",
        "Request matchers are used to select requests. Common rules are permitAll(), authenticated(), hasRole(), hasAnyRole(), hasAuthority(), hasAnyAuthority(), and denyAll().",
        "Remember that hasRole(\"ADMIN\") normally checks ROLE_ADMIN, while hasAuthority(\"ADMIN\") checks the exact ADMIN authority. This distinction is frequently asked in Spring Security interviews.",
        "Remember that authentication alone is not enough for user-specific resources. If USER A requests USER B's order, the backend must perform an ownership or object-level authorization check.",
        "A strong interview answer for method security is: 'I use endpoint authorization for HTTP-level access control and method-level security when authorization belongs at the business-operation boundary. @PreAuthorize can protect a service method based on roles, authorities, or other security expressions.'",
        "For production APIs, use least privilege, explicit policies, appropriate resource ownership checks, a restrictive fallback where suitable, and automated tests for unauthorized, forbidden, authorized, and cross-user access scenarios."
      ]
    }
  ]
};