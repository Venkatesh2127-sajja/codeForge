
export const corsAndSecurityBestPractices = {
  id: 1110,
  title: "CORS and Spring Security Best Practices",
  slug: "cors-and-security-best-practices",
  topicTitle: "Spring Security",
  description:
    "Configure cross-origin access correctly and review essential Spring Security practices.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "cors",
      title: "What Is CORS?",
      paragraphs: [
        "CORS stands for Cross-Origin Resource Sharing. It is a browser-enforced mechanism that allows a server to declare which origins may access its resources through cross-origin browser requests.",
        "An origin consists of a scheme, host, and port. For example, a React development server at http://localhost:5173 and a Spring Boot API at http://localhost:8080 have different origins because their ports are different.",
        "CORS becomes important when a frontend application and backend API are hosted on different origins.",
        "CORS is primarily a browser security mechanism. It does not replace authentication or authorization on the server."
      ],
      bullets: [
        "Origin = scheme + host + port.",
        "http://localhost:5173 and http://localhost:8080 are different origins.",
        "CORS controls whether browser JavaScript is allowed to read cross-origin responses.",
        "CORS is not an authentication mechanism.",
        "CORS is not an authorization mechanism."
      ]
    },

    {
      id: "same-origin-policy",
      title: "Same-Origin Policy",
      paragraphs: [
        "Browsers enforce the same-origin policy as an important security boundary. JavaScript running on one origin cannot freely read responses from another origin unless the target server allows the cross-origin interaction through mechanisms such as CORS.",
        "This is why a React application running on one origin can encounter a CORS error when calling a Spring Boot API running on another origin.",
        "The browser is enforcing the policy. The server must return appropriate CORS response headers when it wants to allow the browser request."
      ],
      code: {
        language: "text",
        code: `React Frontend
http://localhost:5173
        |
        | fetch("http://localhost:8080/api/users")
        v
Spring Boot API
http://localhost:8080
        |
        | Different origin
        v
Browser checks CORS response
        |
        +---- Allowed ----> JavaScript can read response
        |
        +---- Not allowed -> Browser blocks JS access`
      }
    },

    {
      id: "origin",
      title: "Understanding an Origin",
      paragraphs: [
        "An origin is composed of three parts: scheme, host, and port.",
        "Two URLs have the same origin only when all relevant origin components match."
      ],
      code: {
        language: "text",
        code: `Origin:
    scheme + host + port

Example:
    http://localhost:5173
     |        |       |
   scheme    host    port

Different from:
    http://localhost:8080

Different from:
    https://localhost:5173

Different from:
    http://127.0.0.1:5173`
      },
      bullets: [
        "http and https are different schemes.",
        "localhost and 127.0.0.1 are different hosts.",
        "Different ports represent different origins.",
        "CORS configuration should use the actual trusted frontend origin."
      ]
    },

    {
      id: "configure-cors",
      title: "Configure CORS in Spring Security",
      code: {
        language: "java",
        code: `import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Bean
CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(
        List.of("http://localhost:5173")
    );

    config.setAllowedMethods(
        List.of("GET", "POST", "PUT", "PATCH", "DELETE")
    );

    config.setAllowedHeaders(
        List.of("Authorization", "Content-Type")
    );

    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/api/**", config);

    return source;
}`
      },
      paragraphs: [
        "The configuration above allows requests to matching /api/** paths from the specified React development origin.",
        "The allowed origin should be changed to the actual trusted frontend origin in each environment.",
        "CORS must also be integrated with Spring Security using http.cors(Customizer.withDefaults()) when Spring Security is responsible for the request security chain."
      ]
    },

    {
      id: "security-cors-integration",
      title: "Enable CORS in SecurityFilterChain",
      paragraphs: [
        "Defining a CorsConfigurationSource is not the only step when Spring Security is protecting the application. The security filter chain should also enable CORS processing.",
        "Spring Security can use the configured CorsConfigurationSource when http.cors() is enabled."
      ],
      code: {
        language: "java",
        code: `import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**")
                .permitAll()
            .anyRequest()
                .authenticated()
        );

    return http.build();
}`
      },
      bullets: [
        "CorsConfigurationSource defines the CORS policy.",
        "http.cors() enables CORS support in the Spring Security chain.",
        "Authorization rules are separate from CORS configuration.",
        "CORS does not make a protected endpoint public."
      ]
    },

    {
      id: "cors-request-flow",
      title: "CORS Request Flow",
      paragraphs: [
        "A cross-origin browser request is sent to the backend. The backend can respond with CORS headers describing whether the requesting origin is allowed.",
        "The browser uses those headers to determine whether JavaScript is allowed to access the response."
      ],
      code: {
        language: "text",
        code: `React
http://localhost:5173
    |
    | Cross-origin request
    v
Browser
    |
    v
Spring Boot API
http://localhost:8080
    |
    | Access-Control-Allow-Origin:
    | http://localhost:5173
    v
Browser checks CORS policy
    |
    +---- Allowed ----> React receives response
    |
    +---- Not allowed -> Browser blocks JS access`
      }
    },

    {
      id: "simple-request",
      title: "Simple CORS Requests",
      paragraphs: [
        "Some cross-origin requests can be sent without a separate browser preflight request. The browser still evaluates the response according to CORS rules.",
        "Whether a request qualifies as a simple CORS request depends on the HTTP method and request headers and content types involved."
      ],
      bullets: [
        "The browser decides whether a request qualifies as simple.",
        "The server still needs to return appropriate CORS headers.",
        "CORS behavior is enforced by the browser."
      ]
    },

    {
      id: "preflight",
      title: "What Is a CORS Preflight Request?",
      paragraphs: [
        "A browser may send a preflight request before sending the actual cross-origin request.",
        "The preflight uses the HTTP OPTIONS method and asks the server whether the requested origin, method, and headers are allowed.",
        "Preflight requests are common when an API uses methods such as PUT, PATCH, or DELETE, or when requests include non-simple headers such as Authorization."
      ],
      code: {
        language: "text",
        code: `Browser
   |
   | OPTIONS /api/users
   | Origin: http://localhost:5173
   | Access-Control-Request-Method: POST
   | Access-Control-Request-Headers: Authorization
   v
Spring Boot
   |
   | Check CORS policy
   v
Response
   |
   | Access-Control-Allow-Origin
   | Access-Control-Allow-Methods
   | Access-Control-Allow-Headers
   v
Browser
   |
   | If allowed
   v
POST /api/users
   |
   v
Spring Boot API`
      }
    },

    {
      id: "preflight-headers",
      title: "Important CORS Headers",
      bullets: [
        "Origin: identifies the requesting origin.",
        "Access-Control-Allow-Origin: specifies which origin is allowed.",
        "Access-Control-Allow-Methods: specifies permitted HTTP methods.",
        "Access-Control-Allow-Headers: specifies permitted request headers.",
        "Access-Control-Allow-Credentials: indicates whether credentials may be included in a cross-origin request.",
        "Access-Control-Max-Age: allows the browser to cache applicable preflight information for a period of time."
      ]
    },

    {
      id: "allowed-methods",
      title: "Allow Only Required HTTP Methods",
      paragraphs: [
        "CORS configuration should expose only the HTTP methods required by the frontend application.",
        "If the application only needs GET and POST, there is usually no reason to allow every possible HTTP method."
      ],
      code: {
        language: "java",
        code: `config.setAllowedMethods(
    List.of(
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    )
);`
      },
      bullets: [
        "Allow only methods required by the application.",
        "Avoid overly broad CORS policies.",
        "Review methods whenever the API changes."
      ]
    },

    {
      id: "allowed-headers",
      title: "Allow Required Headers",
      paragraphs: [
        "If the frontend sends custom or non-simple headers, the server must allow those headers through the CORS policy.",
        "A common REST API example is the Authorization header used for bearer tokens."
      ],
      code: {
        language: "java",
        code: `config.setAllowedHeaders(
    List.of(
        "Authorization",
        "Content-Type"
    )
);`
      },
      bullets: [
        "Authorization is commonly needed for bearer-token APIs.",
        "Content-Type is commonly required for JSON requests.",
        "Do not allow arbitrary headers unless there is a clear reason."
      ]
    },

    {
      id: "cors-security",
      title: "CORS Is Not Authentication",
      paragraphs: [
        "CORS is not a replacement for authentication or authorization. It primarily controls whether browser JavaScript can read cross-origin responses.",
        "A non-browser client such as curl, Postman, or another backend service is not constrained by browser CORS enforcement in the same way.",
        "Therefore, even if CORS allows a frontend origin, the server must still require authentication and enforce authorization for protected resources."
      ],
      bullets: [
        "Allow only required origins.",
        "Allow only required methods and headers.",
        "Avoid permissive wildcard policies for credentialed browser requests.",
        "If cookies are used cross-origin, configure credentials and CSRF protection deliberately.",
        "Never treat CORS as an authentication mechanism.",
        "Never use CORS as the only authorization boundary."
      ]
    },

    {
      id: "cors-vs-authentication",
      title: "CORS vs Authentication vs Authorization",
      paragraphs: [
        "These three concepts solve different problems and should not be confused.",
        "CORS controls browser cross-origin access. Authentication establishes who the caller is. Authorization determines what the authenticated caller is allowed to do."
      ],
      code: {
        language: "text",
        code: `CORS
 |
 +--> Can this browser origin access/read the response?
 |
 v
Authentication
 |
 +--> Who is making the request?
 |
 v
Authorization
 |
 +--> What is this identity allowed to do?
 |
 v
Application Resource`
      },
      bullets: [
        "CORS = browser cross-origin policy.",
        "Authentication = identity verification.",
        "Authorization = permission checking."
      ]
    },

    {
      id: "credentials",
      title: "CORS and Credentials",
      paragraphs: [
        "Cross-origin requests may involve credentials such as cookies or HTTP authentication information. When browser credentials are involved, the CORS configuration must be designed deliberately.",
        "Credentialed cross-origin requests should not use an unrestricted wildcard origin. The server should identify trusted origins explicitly.",
        "If cookies are used for authentication, CSRF protection also needs to be considered because browsers automatically attach cookies according to their cookie rules."
      ],
      code: {
        language: "java",
        code: `config.setAllowedOrigins(
    List.of("https://app.example.com")
);

config.setAllowCredentials(true);`
      },
      bullets: [
        "Use an explicit trusted origin for credentialed cross-origin access.",
        "Do not combine credentialed browser requests with an unrestricted wildcard origin.",
        "Consider SameSite cookie behavior as part of the overall browser security design.",
        "Consider CSRF protection when cookies authenticate browser requests."
      ]
    },

    {
      id: "cors-wildcard",
      title: "Why Wildcard Origins Can Be Dangerous",
      paragraphs: [
        "A wildcard origin can be useful for genuinely public, non-credentialed resources, but it should not be treated as a universal solution.",
        "For sensitive applications, explicitly listing trusted frontend origins is usually safer and easier to reason about.",
        "Credentialed cross-origin requests require special handling and should not be configured with an unrestricted wildcard origin."
      ],
      code: {
        language: "java",
        code: `// Broad policy - use only when appropriate
config.setAllowedOrigins(List.of("*"));

// More restrictive policy
config.setAllowedOrigins(
    List.of("https://app.example.com")
);`
      },
      bullets: [
        "Do not use * simply to make a CORS error disappear.",
        "Use exact trusted origins for sensitive applications.",
        "Review whether the resource actually needs cross-origin access."
      ]
    },

    {
      id: "cors-development-production",
      title: "Development vs Production CORS",
      paragraphs: [
        "Local development commonly uses an origin such as http://localhost:5173, while production may use a domain such as https://app.example.com.",
        "CORS configuration should therefore be environment-specific rather than permanently hard-coded to a development URL."
      ],
      code: {
        language: "java",
        code: `// Development
config.setAllowedOrigins(
    List.of("http://localhost:5173")
);

// Production example
config.setAllowedOrigins(
    List.of("https://app.example.com")
);`
      },
      bullets: [
        "Do not leave localhost origins in production configuration.",
        "Use environment-specific configuration when multiple environments exist.",
        "Keep the production allowlist as small as practical."
      ]
    },

    {
      id: "cors-common-error",
      title: "Understanding Common CORS Errors",
      paragraphs: [
        "A browser CORS error does not always mean the backend business logic is broken.",
        "The browser may be rejecting the response because the server did not return the required CORS headers, the origin is not allowed, the requested method is not allowed, or the requested header is not allowed.",
        "Preflight requests can also fail before the actual API request is sent."
      ],
      bullets: [
        "Check the browser Network tab.",
        "Check whether an OPTIONS preflight request was sent.",
        "Check Access-Control-Allow-Origin.",
        "Check Access-Control-Allow-Methods.",
        "Check Access-Control-Allow-Headers.",
        "Check whether the actual frontend origin exactly matches the configured origin.",
        "Check whether Spring Security CORS integration is enabled."
      ]
    },

    {
      id: "security-checklist",
      title: "Spring Security Best Practices",
      bullets: [
        "Use HTTPS in deployed environments.",
        "Hash passwords using an appropriate PasswordEncoder.",
        "Apply least-privilege roles and authorities.",
        "Protect endpoints on the backend, not only in React.",
        "Keep CSRF protection when the authentication model requires it.",
        "Configure CORS for trusted origins only.",
        "Do not log passwords, access tokens, refresh tokens, or sensitive personal data.",
        "Keep Spring Security and related dependencies patched.",
        "Test authorization rules for both allowed and denied cases.",
        "Use secure cookie settings when cookies are used for authentication.",
        "Do not expose administrative endpoints unnecessarily.",
        "Use explicit authorization rules for sensitive operations.",
        "Validate input and enforce server-side business rules.",
        "Do not rely on frontend validation as a security boundary."
      ]
    },

    {
      id: "password-security",
      title: "Password Security",
      paragraphs: [
        "Passwords should never be stored as plaintext or using reversible encryption.",
        "Spring Security applications should use a suitable PasswordEncoder that performs password hashing with an appropriate adaptive password hashing algorithm.",
        "During login, the supplied password is checked against the stored password hash rather than being decrypted."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`
      },
      bullets: [
        "Never store plaintext passwords.",
        "Use a password hashing function designed for passwords.",
        "Do not log user passwords.",
        "Use the same PasswordEncoder strategy consistently for stored passwords and verification."
      ]
    },

    {
      id: "https",
      title: "Use HTTPS",
      paragraphs: [
        "HTTPS protects HTTP traffic using TLS. It helps protect credentials, access tokens, cookies, and API data while traveling between client and server.",
        "Authentication mechanisms such as HTTP Basic should not be used over an unencrypted production connection because credentials would otherwise be exposed to network observers."
      ],
      code: {
        language: "text",
        code: `React Browser
     |
     | HTTPS + TLS
     | encrypted transport
     v
Spring Boot API
     |
     v
Authentication
     |
     v
Authorization`
      },
      bullets: [
        "Use HTTPS for production applications.",
        "Protect authentication credentials in transit.",
        "Protect access tokens and sensitive API responses.",
        "Configure secure cookies appropriately when cookies are used."
      ]
    },

    {
      id: "least-privilege",
      title: "Principle of Least Privilege",
      paragraphs: [
        "Least privilege means giving a user, service, or application only the permissions it actually needs.",
        "For example, a reporting user may need REPORT_READ but should not automatically receive USER_DELETE or ADMIN privileges."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/reports/**")
        .hasAuthority("REPORT_READ")
    .requestMatchers("/api/admin/**")
        .hasRole("ADMIN")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "Give users only required permissions.",
        "Avoid giving ADMIN roles unnecessarily.",
        "Use fine-grained authorities when broad roles are insufficient.",
        "Review permissions periodically."
      ]
    },

    {
      id: "backend-security",
      title: "Backend Must Enforce Security",
      paragraphs: [
        "A React frontend can hide buttons, routes, and menus based on the user's role, but these checks can be bypassed.",
        "The Spring Boot backend must independently enforce authentication, authorization, input validation, and business rules.",
        "This is especially important for operations such as deleting users, changing account roles, downloading private files, or processing payments."
      ],
      code: {
        language: "text",
        code: `React
  |
  | Hide admin button
  |       (UX)
  v
Spring Boot API
  |
  +--> Authentication
  |
  +--> Authorization
  |
  +--> Validation
  |
  +--> Business Rules
  |
  v
Database`
      }
    },

    {
      id: "logging-secrets",
      title: "Do Not Log Security Secrets",
      paragraphs: [
        "Application logs are useful for debugging and monitoring, but sensitive authentication information should not be written to logs.",
        "Passwords, access tokens, refresh tokens, authorization headers, and sensitive personal information should be protected from accidental logging."
      ],
      code: {
        language: "text",
        code: `Bad:
Authorization: Bearer eyJhbGciOi...
password=MySecretPassword

Good:
Authentication failed for userId=123
reason=invalid_credentials`
      },
      bullets: [
        "Never log passwords.",
        "Do not log complete access tokens.",
        "Be careful when logging request headers.",
        "Avoid unnecessary sensitive personal information in logs.",
        "Use appropriate log levels in production."
      ]
    },

    {
      id: "dependency-security",
      title: "Keep Security Dependencies Updated",
      paragraphs: [
        "Security libraries can receive important vulnerability fixes and security improvements. Spring Security, Spring Boot, and related dependencies should be maintained according to the application's supported version strategy.",
        "Dependency updates should be tested because security libraries can also introduce behavior changes between versions."
      ],
      bullets: [
        "Keep supported Spring Boot versions updated.",
        "Keep Spring Security dependencies patched.",
        "Review dependency security advisories.",
        "Run automated tests after security dependency upgrades.",
        "Do not blindly upgrade production dependencies without validation."
      ]
    },

    {
      id: "testing",
      title: "Security Testing Checklist",
      paragraphs: [
        "Security testing should verify both positive and negative cases. A secure application is not one where only valid requests work; invalid and unauthorized requests must also be rejected correctly."
      ],
      bullets: [
        "Test public endpoints without authentication.",
        "Test protected endpoints without authentication.",
        "Test invalid credentials.",
        "Test authenticated users with insufficient authorities.",
        "Test users with the correct role.",
        "Test ownership-based access rules.",
        "Test CORS from allowed origins.",
        "Test CORS from disallowed origins.",
        "Test CORS preflight requests.",
        "Test required HTTP methods and headers.",
        "Test CSRF behavior when cookie-based authentication is used.",
        "Test that sensitive information is not exposed in error responses or logs."
      ]
    },

    {
      id: "complete-cors-config",
      title: "Complete CORS and Security Configuration",
      paragraphs: [
        "The following example combines a CORS configuration with a SecurityFilterChain. It allows a trusted frontend origin to access API resources while still requiring authentication for protected endpoints."
      ],
      code: {
        language: "java",
        code: `package com.example.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config =
                new CorsConfiguration();

        config.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE"
                )
        );

        config.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/api/**",
                config
        );

        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**")
                    .permitAll()
                .anyRequest()
                    .authenticated()
            );

        return http.build();
    }
}`
      }
    },

    {
      id: "security-architecture",
      title: "How CORS Fits Into Application Security",
      paragraphs: [
        "CORS is only one layer of a secure web application. A production Spring Boot application normally combines secure transport, authentication, authorization, input validation, safe data handling, logging, dependency maintenance, and appropriate browser protections.",
        "No single security mechanism should be treated as a complete security solution."
      ],
      code: {
        language: "text",
        code: `Browser / Client
      |
      | HTTPS
      v
Spring Boot
      |
      +--> CORS
      |
      +--> Authentication
      |
      +--> Authorization
      |
      +--> CSRF protection when applicable
      |
      +--> Input validation
      |
      +--> Business authorization
      |
      +--> Secure error handling
      |
      +--> Safe logging
      |
      v
Database / External Services`
      }
    },

    {
      id: "common-mistakes",
      title: "Common CORS and Security Mistakes",
      bullets: [
        "Using Access-Control-Allow-Origin: * simply to eliminate a browser error.",
        "Assuming CORS protects an API from curl, Postman, or server-to-server clients.",
        "Treating CORS as authentication.",
        "Treating CORS as authorization.",
        "Forgetting that port differences create different origins.",
        "Forgetting to configure OPTIONS/preflight behavior when the browser requires it.",
        "Allowing unnecessary HTTP methods.",
        "Allowing unnecessary request headers.",
        "Using credentialed cross-origin requests with an unrestricted wildcard origin.",
        "Disabling CSRF without understanding the authentication model.",
        "Relying on React route guards as the backend security mechanism.",
        "Logging passwords or bearer tokens.",
        "Using HTTP instead of HTTPS in production.",
        "Storing plaintext passwords.",
        "Giving every user administrative permissions.",
        "Failing to test denied and unauthorized requests."
      ]
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is CORS?",
          answer:
            "CORS is a browser-enforced mechanism through which servers specify which origins may access resources through cross-origin browser requests."
        },
        {
          question: "Does CORS protect an API from every unauthorized client?",
          answer:
            "No. CORS is not an authentication mechanism. The server must still enforce authentication and authorization for API requests."
        },
        {
          question: "What is an origin?",
          answer:
            "An origin consists of the scheme, host, and port. For example, http://localhost:5173 and http://localhost:8080 are different origins because their ports differ."
        },
        {
          question: "Why does a React application commonly face CORS errors with a Spring Boot API?",
          answer:
            "The React application and Spring Boot API may run on different origins. The browser then applies the same-origin policy and requires the API to provide appropriate CORS permission for the frontend origin."
        },
        {
          question: "What is a CORS preflight request?",
          answer:
            "A preflight is a browser-generated OPTIONS request used to ask the server whether a cross-origin request's origin, method, and requested headers are allowed."
        },
        {
          question: "When can a browser send a CORS preflight?",
          answer:
            "Preflight is commonly used for cross-origin requests that are not simple requests, such as requests using certain methods or non-simple request headers."
        },
        {
          question: "What does Access-Control-Allow-Origin do?",
          answer:
            "It tells the browser which origin is allowed to access the response through the CORS policy."
        },
        {
          question: "What does Access-Control-Allow-Methods do?",
          answer:
            "It specifies which HTTP methods are allowed for the cross-origin request."
        },
        {
          question: "What does Access-Control-Allow-Headers do?",
          answer:
            "It specifies which request headers the server permits for the cross-origin request."
        },
        {
          question: "Is CORS a security mechanism for authentication?",
          answer:
            "No. CORS controls browser cross-origin access. Authentication verifies identity and authorization determines permissions."
        },
        {
          question: "Can Postman call an API even if the browser reports a CORS error?",
          answer:
            "Yes, commonly. Postman is not subject to browser CORS enforcement in the same way a browser JavaScript application is. The API must still enforce its own authentication and authorization."
        },
        {
          question: "Why should wildcard CORS policies be used carefully?",
          answer:
            "A wildcard can allow broad cross-origin access. Sensitive applications should generally restrict access to explicitly trusted origins, especially when credentials are involved."
        },
        {
          question: "Can you use a wildcard origin with credentialed browser requests?",
          answer:
            "No. Credentialed CORS requests require a specific allowed origin rather than an unrestricted wildcard origin."
        },
        {
          question: "Is CSRF the same as CORS?",
          answer:
            "No. CORS controls browser cross-origin access, while CSRF is an attack where a user's browser is induced to send an unwanted state-changing request using credentials that the browser automatically supplies."
        },
        {
          question: "Why is HTTPS important for Spring Security?",
          answer:
            "HTTPS protects credentials, tokens, cookies, and application data in transit using TLS."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "React runs on http://localhost:5173 and Spring Boot runs on http://localhost:8080. Why can the browser report a CORS error?",
          answer:
            "They are different origins because the ports differ. The Spring Boot application must provide an appropriate CORS policy allowing the React origin if cross-origin browser access is intended."
        },
        {
          question:
            "The GET request works, but a POST request with an Authorization header fails with a CORS error. What would you check?",
          answer:
            "Check whether the browser is sending a preflight OPTIONS request, whether the server allows the frontend origin, POST method, and Authorization header, and whether Spring Security is correctly integrated with the CORS configuration."
        },
        {
          question:
            "Postman works but React fails with a CORS error. Is the API necessarily broken?",
          answer:
            "Not necessarily. Postman is not subject to browser CORS enforcement in the same way. The API may work correctly while its browser CORS policy is incomplete."
        },
        {
          question:
            "Why should you not solve every CORS issue by setting allowed origins to *?",
          answer:
            "It can make the policy much broader than intended and is inappropriate for credentialed cross-origin browser requests. A sensitive API should explicitly allow only trusted origins."
        },
        {
          question:
            "A React application hides the Delete User button for normal users. Is the API secure?",
          answer:
            "No. The backend must still authenticate the request and enforce an authorization rule such as hasRole(\"ADMIN\") or an appropriate authority."
        },
        {
          question:
            "The application uses cookies for authentication. What additional security concern should be considered with cross-origin requests?",
          answer:
            "CSRF protection should be considered because browsers can automatically attach cookies according to cookie rules. CORS configuration, cookie attributes, and CSRF protection should be designed together."
        },
        {
          question:
            "What should you check when the browser says a preflight request failed?",
          answer:
            "Check the OPTIONS request, allowed origin, allowed method, allowed headers, Spring Security CORS integration, and whether the server is returning the expected CORS response headers."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "CORS = Cross-Origin Resource Sharing.",
        "CORS is primarily enforced by browsers.",
        "Origin = scheme + host + port.",
        "Different ports mean different origins.",
        "CORS is not authentication.",
        "CORS is not authorization.",
        "Preflight requests commonly use OPTIONS.",
        "Authorization headers can cause a preflight request.",
        "Access-Control-Allow-Origin controls allowed origins.",
        "Access-Control-Allow-Methods controls allowed methods.",
        "Access-Control-Allow-Headers controls allowed request headers.",
        "Credentialed CORS requests require explicit trusted origins.",
        "Do not use an unrestricted wildcard origin for credentialed requests.",
        "Use HTTPS in production.",
        "Hash passwords using an appropriate PasswordEncoder.",
        "Use least privilege.",
        "Protect backend endpoints independently of React.",
        "Do not log passwords or access tokens.",
        "Test both allowed and denied security scenarios."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes for Interview",
      paragraphs: [
        "The easiest way to remember CORS is: CORS controls whether browser JavaScript from one origin is allowed to access a resource on another origin.",
        "An origin consists of scheme, host, and port. Therefore, http://localhost:5173 and http://localhost:8080 are different origins.",
        "Remember that CORS is not authentication and not authorization. A server must still authenticate users and enforce permissions even when CORS allows a frontend origin.",
        "For interview questions, remember the preflight flow: the browser can send an OPTIONS request asking whether the origin, HTTP method, and requested headers are allowed. If the preflight succeeds, the browser can proceed with the actual request.",
        "For Spring Security, remember that CORS configuration and SecurityFilterChain configuration work together. A CorsConfigurationSource defines the policy, while http.cors(Customizer.withDefaults()) enables CORS integration with the security chain.",
        "For credentialed browser requests, remember that an unrestricted wildcard origin should not be used. Explicit trusted origins are required.",
        "For overall Spring Security best practices, remember HTTPS, secure password hashing, least privilege, backend authorization, deliberate CSRF configuration, restricted CORS, safe logging, patched dependencies, and security testing.",
        "A strong interview answer is: 'CORS is a browser security mechanism that controls cross-origin access. In Spring Security, I configure trusted origins, methods, and headers through CorsConfigurationSource and enable CORS in SecurityFilterChain. CORS does not replace authentication or authorization, so protected APIs must still enforce identity and permissions on the backend.'"
      ]
    }
  ]
};
